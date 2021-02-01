# CLUSTER HAUTE DISPO VIA CLOUD DOCKER SWARM MODE & TRAEFIK

## Pourquoi un Cluster ?

Tout d’abord un cluster qu’est-ce que c’est ? Littéralement une grappe de serveurs, c’est l’association de plusieurs serveurs ou nœuds qui forment le cluster.

- **augmenter la disponibilité**: plus de serveurs, moins de chance qu’ils tombent tous en même temps.
- **faciliter la montée en charge**: il est plus facile d’augmenter la charge quand on peut la répartir sur plusieurs serveurs.
- **permettre la répartition de la charge:** la répartition des performances d’un serveur à l’autre en cas de surexploitation d’un serveur.
- **faciliter la gestion des ressources**.

## Docker Swarm :


### Notions :

Swarm est production-ready et, selon Docker inc, il a été testé pour scaler jusqu’à 1 000 nœuds et 50 000 conteneurs sans dégradation de performance.

Il existe deux types de rôles pour un noeud:

- **manager node**: réalise l’orchestration et les actions de management du cluster. Envoie également les tâches aux workers. C'est avec lui qu'on discute en cli.

- **worker node**: réalise les tâches assignées par le manager et lui envoie un feedback sur l’état des tâches.

Les managers sont les leaders du cluster et c’est eux qui sont responsables de l’exécution des algorithmes d’orchestration.

L’une des *best practices* à retenir est que le nombre de managers ne doit jamais être un nombre pair mais plutôt impair: 1, 3, 5 .. etc. Ceci garantira une bonne exécution de l’algorithme Raft qui est indispensable pour la disponibilité d’un cluster et qui utilise le vote.

Pour plus d'info sur l’élection : https://www.aneo.eu/2018/02/06/lorchestration-docker-swarm/

### Création du cluster :

#### Initialisation !

Il nous faudra donc trois machines minimum.
Allons-y, créons en avec Virtual-Box, ou même avec docker-machine directement.
   
docker-machine est un outil pratique qui permet de creer des machines virtuelles a la volée. Il supporte pas mal de *driver* VM, comme virtualbox, quemu, lxc, et sous windows : hyper-v.

Documentation ici :
https://docs.docker.com/machine/

   
```bash
docker-machine create --driver virtualbox --virtualbox-boot2docker-url ./ISO/boot2docker.iso manager
```

Ensuite, on peut aller en ssh avec simplement :
	
	docker-machine ssh


C'est pratique pour faire des test à la maison par exemple.

Mais bon, continuons comme si nous avions de vrais machines. Il nous faudra donc au minimum :

- Trois Linux hosts sur le même réseau, avec docker installé.
- L'IP du futur manager
- Les ports ouverts entre toutes ces machines. Autrement dit, pas de firewall installés.



1. Initialiser le cluster :
   
   ```bash
   docker-machine ssh manager "docker swarm init \
       --listen-addr $(docker-machine ip manager) \
       --advertise-addr $(docker-machine ip manager)"
   
   # Sous Windows, virer les \
   ```

6. Récuperer le token du cluster :
   
   ```bash
   export worker_token=$(docker-machine ssh manager "docker swarm \
   join-token worker -q")
   
   # Sous Windows :
   $worker_token=$(docker-machine ssh manager "docker swarm join-token worker -q")
   ```

7. Joindre les noeuds dans le cluster :
   
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
   
   # Merdows : Virer les \
   ```

8. Vérifier que tout s'est bien passé :
   
   ```bash
   docker-machine ssh manager "docker node ls"
   ```

9. Ajoutons quelques outils qui permettent de visualiser plus joliment notre cluster :
   
   ```bash
   docker-machine ssh manager "docker service create \
     --name=viz \
     --publish=5050:8080/tcp \
     --constraint=node.role==manager \
     --mount=type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
     dockersamples/visualizer"
   ```
   
   Récupérons l'adresse ip du manager et allons voir du coté du port 5050. Visualizer est un outils relativement simple.
   
   Pour une orchestration un peu plus poussée en GUI, nous pouvons utiliser Portainer :
   
   ```bash
   docker-machine ssh manager "docker service create \
    --name=portainer \
    --publish=5060:9000/tcp \
    --constraint=node.role==manager \
    --mount=type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
    portainer/portainer"
   ```

### Traefik :

Traefik est un reverse-proxy. Il administre les requetes en fonction du nom de domaine auquelles elles sont ratachées et gère les certificats SSL pour avoir du https facilement avec lets-encrypt. Pour ceux qui connaissent, c'est un peu le nginx-jwilder-letsencrypt boosté et moderne car il gère, , entre autre, le load-balancing. De plus, Il s'integre parfaitement à l'environnement docker et swarm. 

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
eval $(docker-machine env manager)
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

## HTTPS Avec Let's Encrypt

Quelques fichiers de config' pour Traefik a écrire. (https://docs.traefik.io/user-guide/docker-and-lets-encrypt/)

## DATA Persistante

A rédiger. D'ici la, bosser avec git :). Mais des solutions existent comme vieux/ssh, ou en nfs. Cf doc Docker.
