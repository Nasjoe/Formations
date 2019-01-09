# CLUSTER HAUTE DISPO VIA CLOUD DOCKER SWARM MODE & TRAEFIK

## Pourquoi un Cluster ?

Tout d’abord un cluster qu’est-ce que c’est ? Littéralement une grappe de serveurs, c’est l’association de plusieurs serveurs ou nœuds qui forment le cluster.



- **augmenter la disponibilité**: plus de serveurs, moins de chance qu’il tombent tous en même temps.
- **faciliter la montée en charge**: il est plus facile d’augmenter la charge quand on peut la répartir sur plusieurs serveurs.
- **permettre la répartition de la charge:** la répartition des performances d’un serveur à l’autre en cas de surexploitation d’un serveur.
- **faciliter la gestion des ressources**.





## Docker Swarm :

### Prérequis :

1. docker-machine
2. Virtual-box, pour le TP
3. docker-compose
4. Avoir des notions de :
   1. Cluster
   2. Geo-Cluster
   3. Scaling
   4. Reverse-Proxy
   5. docker-compose



### Notions :

Swarm est production-ready et, selon Docker inc, il a été testé pour scaler jusqu’à 1 000 nœuds et cinquante mille 50 000 conteneurs sans dégradation de performance.

Il existe deux types de rôles pour un noeud:

- **manager node**: réalise l’orchestration et les actions de management du cluster. Envoie également les tâches aux workers. C'est avec lui qu'on discute en cli.

- **worker node**: réalise les tâches assignées par le manager et lui envoie un feedback sur l’état des tâches.

Les managers sont les leaders du cluster et c’est eux qui sont responsables de l’exécution des algorithmes d’orchestration.

L’une des best practices à retenir est que le nombre de managers ne doit jamais être un nombre pair mais plutôt impair: 1, 3, 5 .. etc. Ceci garantira une bonne exécution de l’algorithme Raft qui est indispensable pour la disponibilité d’un cluster et qui utilise le vote.

Pour plus d'info sur l'election : https://www.aneo.eu/2018/02/06/lorchestration-docker-swarm/

### Création du cluster :

1. Télécharger l'iso boot2docker pour virtualbox :

    https://github.com/boot2docker/boot2docker/releases/tag/v18.06.1-ce

    On utilise ici la version 18.06.1-ce car la *lattest* est buggé avec virtualbox. Elle n'ouvre pas les ports automatiquement (https://forums.docker.com/t/get-started-part-4-connection-refused-from-node-on-virtual-machine/62511/10)

2. Créer le manager :

   ```bash
    docker-machine create --driver virtualbox --virtualbox-boot2docker-url ./ISO/boot2docker.iso manager
   ```

3. Créer les noeuds :

   ```bash
    docker-machine create --driver virtualbox --virtualbox-boot2docker-url ./ISO/boot2docker.iso worker1
    docker-machine create --driver virtualbox --virtualbox-boot2docker-url ./ISO/boot2docker.iso worker2
   ```

4. Initialiser le cluster :

   ```bash
   docker-machine ssh manager "docker swarm init \
       --listen-addr $(docker-machine ip manager) \
       --advertise-addr $(docker-machine ip manager)"
   ```

5. Récuperer le token du cluster :

   ```bash
   export worker_token=$(docker-machine ssh manager "docker swarm \
   join-token worker -q")
   ```

6. Joindre les noeuds dans le cluster :

   ```bash
   docker-machine ssh worker1 "docker swarm join \
       --token=${worker_token} \
       --listen-addr $(docker-machine ip worker1) \
       --advertise-addr $(docker-machine ip worker1) \
       $(docker-machine ip manager)"
   
   docker-machine ssh worker2 "docker swarm join \
       --token=${worker_token} \
       --listen-addr $(docker-machine ip worker2) \
       --advertise-addr $(docker-machine ip worker2) \
       $(docker-machine ip manager)"
   ```

7. Vérifier que tout s'est bien passé :

   ```bash
   docker-machine ssh manager docker node ls
   ```

### Traefik :

Traefik est un reverse-proxy. Il administre les requetes en fonction du nom de domaine auquelles elles sont ratachées et gère les certificats SSL pour avoir du https facilement avec lets-encrypt. Pour ceux qui connaissent, c'est un peu le nginx-jwilder-letsencrypt boosté et moderne. Il s'intergre parfaitement à l'environnement docker et swarm. 

1. Créons un réseau qui ne sera utilisé que par Traefik et les application front qui utilisent le port HTTP.

   ```bash
   docker-machine ssh manager "docker network create --driver=overlay traefik-net"
   ```

2. Déploiement de Traefik :

   ```bash
   docker-machine ssh manager "docker service create \
       --name traefik \
       --constraint=node.role==manager \
       --publish 80:80 --publish 8080:8080 \
       --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
       --network traefik-net \
       traefik \
       --docker \
       --docker.swarmMode \
       --docker.domain=traefik \
       --docker.watch \
       --api"
   ```

3. Lançons quelques applications pour tester notre reverse-proxy. Ici, on va utiliser un simple serveur web écrit en Go : **whoami**.  Lançons deux instances pour voir comment se comporte le **swarm**.

   ```bash
   docker-machine ssh manager "docker service create \
       --name whoami0 \
       --label traefik.port=80 \
       --network traefik-net \
       containous/whoami"
   
   docker-machine ssh manager "docker service create \
       --name whoami1 \
       --label traefik.port=80 \
       --network traefik-net \
       --label traefik.backend.loadbalancer.sticky=true \
       containous/whoami"
   ```

        Notez le `--label traefik.backend.loadbalancer.stickiness=true` .

4. Vérifions que tout s'est bien déroulé :

   ```bash
   docker-machine ssh manager "docker service ls"
   ```

5. Lançons nos requetes http pour tester Traefik :

   Ici, nous allons utiliser curl qui va nous permettre de simuler une requete lié à un nom de domaine. En production, il faudra configurer nos redirections DNS.

   ```bash
   curl -H Host:whoami0.traefik http://$(docker-machine ip manager)
   curl -H Host:whoami1.traefik http://$(docker-machine ip manager)
   ```

   Mais ne nons arretons pas la ! Traefik sait gerer toute les requetes, même celles qui sont adréssées directement aux noeuds ! 

   ```bash
   curl -H Host:whoami0.traefik http://$(docker-machine ip worker0)
   curl -H Host:whoami0.traefik http://$(docker-machine ip worker1)
   curl -H Host:whoami1.traefik http://$(docker-machine ip worker0)
   curl -H Host:whoami1.traefik http://$(docker-machine ip worker1)
   ```

6. Utilisons la puissance de Docker-Swarm : **Le Scalling** !

   ```bash
   docker-machine ssh manager "docker service scale whoami0=5"
   docker-machine ssh manager "docker service scale whoami1=5"
   
   docker-machine ssh manager "docker service ls"
   docker-machine ssh manager "docker ps"
   docker-machine ssh worker1 "docker ps"
   docker-machine ssh worker2 "docker ps"
   ```

   Et lançons dans tout les sens :

   ```bash
   curl -H Host:whoami0.traefik http://$(docker-machine ip manager)
   ```

7. Gérons les Sessions.

   Alors oui, c'est un peu le bordel la. Si un utilisateur unique surf sur notre site, c'est un conteneur différent qui gère chacune de ses requetes. ça risque d'etre le bordel si ya des données de séssions à garder non ?

   Et hop, le Stickyness de tout à l'heure va nous être utile !  Simulons un comportement normal de navigateur web qui enregistre les cookie avec curl. Puis utilisons ce cookie à nouveau :

   ```bash
   # Stockons le cookie dans un fichier :
   curl -c ./cookie.txt -H Host:whoami1.traefik http://$(docker-machine ip manager)
   # Requete avec le cookie crée :
   curl -b ./cookie.txt -H Host:whoami1.traefik http://$(docker-machine ip manager)
   ```

![MAGIC](https://i.giphy.com/ujUdrdpX7Ok5W.giff)

8. Nettoyage :

   ```bash
   #Suppression des machines virtuelles
   docker-machine rm manager worker1 worker2
   ```

## Et docker-compose dans tout ça ?

Référence : https://docs.docker.com/compose/compose-file/#deploy

Presque pareil, avec quelques différences légères. Tout d'abord, il convient d'utiliser les variables d'environement du noeud **Manager**. De cette façon, nous pouvons utiliser des commandes docker et compose directement depuis notre pc de dev' comme si c'etait le serveur de prod.

```bash
# Checker les variables d'environements :
docker-machine env manager
# Les utiliser :
eval $(docker-machine env maanger)
```

Une fois éxécuté, nous pouvons nous passer du *docker-machine ssh trucmuche* :

```bash
docker-machine ls
docker service ls
docker ps
docker node ls
docker service ls
# etc etc...
```

Pour deployer un fichier de config docker-compose en yml :

```bash
docker stack deploy -c docker-compose.yml NOM_DU_STACK
```

Nouveautée : Docker stack deploy demande de nommer le cluster.

A voir : Fichier d'exemple yml dans dossier du cours.

### Cleanup et reboot :

```bash
# Supprimer le stack :
docker stack rm NOM_DU_STACK
# Supprimer les variables copiés précédemment :
eval $(docker-machine env -u)
# sous windows :
& "C:\Program Files\Docker\Docker\Resources\bin\docker-machine.exe" env -u | Invoke-Expression
```

### Commandes utiles :

```bash
docker-machine create --driver virtualbox myvm1 # Create a VM (Mac, Win7, Linux)
docker-machine create -d hyperv --hyperv-virtual-switch "myswitch" myvm1 # Win10
docker-machine env myvm1                # View basic information about your node
docker-machine ssh myvm1 "docker node ls"         # List the nodes in your swarm
docker-machine ssh myvm1 "docker node inspect <node ID>"        # Inspect a node
docker-machine ssh myvm1 "docker swarm join-token -q worker"   # View join token
docker-machine ssh myvm1   # Open an SSH session with the VM; type "exit" to end
docker node ls                # View nodes in swarm (while logged on to manager)
docker-machine ssh myvm2 "docker swarm leave"  # Make the worker leave the swarm
docker-machine ssh myvm1 "docker swarm leave -f" # Make master leave, kill swarm
docker-machine ls # list VMs, asterisk shows which VM this shell is talking to
docker-machine start myvm1            # Start a VM that is currently not running
docker-machine env myvm1      # show environment variables and command for myvm1
eval $(docker-machine env myvm1)         # Mac command to connect shell to myvm1
& "C:\Program Files\Docker\Docker\Resources\bin\docker-machine.exe" env myvm1 | Invoke-Expression   # Windows command to connect shell to myvm1
docker stack deploy -c <file> <app>  # Deploy an app; command shell must be set to talk to manager (myvm1), uses local Compose file
docker-machine scp docker-compose.yml myvm1:~ # Copy file to node's home dir (only required if you use ssh to connect to manager and deploy the app)
docker-machine ssh myvm1 "docker stack deploy -c <file> <app>"   # Deploy an app using ssh (you must have first copied the Compose file to myvm1)
eval $(docker-machine env -u)     # Disconnect shell from VMs, use native docker
docker-machine stop $(docker-machine ls -q)               # Stop all running VMs
docker-machine rm $(docker-machine ls -q) # Delete all VMs and their disk images
```

## DATA Persistante
