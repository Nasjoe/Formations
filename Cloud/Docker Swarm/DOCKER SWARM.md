# CLUSTER HAUTE DISPO VIA CLOUD DOCKER SWARM MODE & TRAEFIK

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

7.  Gérons les Sessions.

   Alors oui, c'est un peu le bordel la. Si un utilisateur unique surf sur notre site, c'est un conteneur différent qui gère chacune de ses requetes. ça risque d'etre le bordel si ya des données de séssions à garder non ?

   Et hop, le Stickyness de tout à l'heure va nous être utile !  Simulons un comportement normal de navigateur web qui enregistre les cookie avec curl. Puis utilisons ce cookie à nouveau :

   ```bash
   # Stockons le cookie dans un fichier :
   curl -c ./cookie.txt -H Host:whoami1.traefik http://$(docker-machine ip manager)
   # Requete avec le cookie crée :
   curl -b ./cookie.txt -H Host:whoami1.traefik http://$(docker-machine ip manager)
   ```

![MAGIC](https://i.giphy.com/ujUdrdpX7Ok5W.gif)

8. Nettoyage :

   ```bash
   #Suppression des machines virtuelles
   docker-machine rm manager worker1 worker2
   ```



## Et docker-compose dans tout ça ?


