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

Il existe deux types de rôles pour un noeud. On ne dit plus maître / esclave, mais :

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
# Pour une iso déjà téléchargée :
docker-machine create --driver virtualbox \
	--virtualbox-boot2docker-url \
	/home/slaan/ISO/boot2docker.iso \
	manager

# Ou pour la dl automatiquement. C'est quand même pratique :
docker-machine create -d virtualbox \
	--virtualbox-import-boot2docker-vm \
	boot2docker-vm \
	manager
```

Ensuite, on peut aller en ssh avec simplement :
	
	docker-machine ssh manager


C'est pratique pour faire des test à la maison par exemple.

Mais bon, continuons comme si nous avions de vrais machines. Il nous faudra donc au minimum :

- Trois Linux hosts sur le même réseau, avec docker installé.
- L'IP du futur manager
- Les ports ouverts entre toutes ces machines. Autrement dit, pas de firewall installés.

allez hop, un petit ```docker swarm``` pour voir ce qu'il a dans le ventre.

1. Initialiser le cluster :
Sur la première machine dites : manager
   
   ```bash
   docker swarm init
   ```

et hop, on note le token bien au chaud.

 ```--advertise-addr <IP>``` : Pour spécifier l'interface réseau qui servira à faire des échanges, utile dans les serveurs car de nombreuses interfaces peuvent co-exister.

2. Joindre les noeuds dans le cluster :
   
   ```bash
   docker swarm join \
       --token=${worker_token} \
       --listen-addr $(docker-machine ip worker1) \
       --advertise-addr $(docker-machine ip worker1)   
   ```
   
   Ou copier coller la ligne que nous a donné le manager à la création du swarm.

3. Vérifier que tout s'est bien passé :
   
   ```bash
   # Sur le manager :
   docker node ls
   ```

9. Ajoutons quelques outils qui permettent de visualiser plus joliment notre cluster :
   
   ```bash
   docker service create \
     --name=viz \
     --publish=5050:8080/tcp \
     --constraint=node.role==manager \
     --mount=type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
     dockersamples/visualizer
   ```
   
   Avez vous noté quelque chose de différent ? Nous n'utilisons pas ici docker run, mais docker server create.
   
#### Exercice :

Mettez moi ça sur un docker-compose.yml !

### Traefik :

Traefik est un reverse-proxy. Il administre les requêtes en fonction du nom de domaine auxquelles elles sont rattachées et gère les certificats SSL pour avoir du https facilement avec lets-encrypt. Il gère, entre autre, le load-balancing. De plus, Il s’intègre parfaitement à l'environnement docker et swarm. 

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
       traefik:1.7 \
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

Presque pareil, avec quelques différences légères. 
un champs "deploy" est à rajouter :


```bash
version: "3.9"
services:
  redis:
    image: redis:alpine
    deploy:
      replicas: 6
      placement:
        max_replicas_per_node: 1
      update_config:
        parallelism: 2
        delay: 10s
      restart_policy:
        condition: on-failure

ou :

    deploy:
      mode: global
      placement:
        constraints:
          - node.role == manager
      update_config:
        parallelism: 1
        delay: 10s
      restart_policy:
        condition: on-failure
        
```

Pour déployer un fichier de config docker-compose en yml :

```bash
docker stack deploy -c docker-compose.yml NOM_DU_STACK
```

Nouveautés : Docker stack deploy demande de nommer le cluster.



### Cleanup et reboot :

```bash
# Supprimer le stack :
docker stack rm NOM_DU_STACK
# Supprimer les variables copiés précédemment :
eval $(docker-machine env -u)
# sous windows :
& "C:\Program Files\Docker\Docker\Resources\bin\docker-machine.exe" env -u | Invoke-Expression
```


## HTTPS Avec Let's Encrypt

Quelques fichiers de config' pour Traefik a écrire. (https://docs.traefik.io/user-guide/docker-and-lets-encrypt/)

## DATA Persistante

A rédiger. D'ici la, bosser avec git :). Mais des solutions existent comme vieux/ssh, ou en nfs. Cf doc Docker.
