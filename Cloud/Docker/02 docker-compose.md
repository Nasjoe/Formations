

# docker-compose

C'est bien pratique de lancer les conteneurs avec docker run, mais pour la résiliance, il est plus simple de créer un fichier de configuration que l'on pourra sauvegarder et réutiliser à l'envie.
Solution : docker-compose !

Format : YAML
C'est juste un format qui sépare les infos avec des espaces en début de ligne. Deux ici.

Le pratique, c'est qu'on peut lancer plusieurs conteneurs en même temps, et même en choisissant l'ordre de lancement via des priorités.
Compose créera alors un sous réseau dans lequel seront tout les conteneurs, et ou ils pourrons communiquer avec leur hostname.

## Installation :

Un simple script à télécharger et à copier dans le dossier des binaires.
https://docs.docker.com/compose/install/

## Composons :

LA doc de référcence :
https://docs.docker.com/compose/compose-file/


Exemple pour nginx :

```yaml
version: '3'
services:
  web:
    image: nginx
    volumes:
     - ./html:/usr/share/nginx/html
    ports :
      - 8080:80
    restart: always
```

Ou avec un fichier dockerfile :

```yaml
version: '3'
services:
  
  database :
  	image: postgres
    restart: always
  volumes:
    - ../Postgres/dbdata:/var/lib/postgresql/data
  expose:
    - 5432
  
  web:
    build: .
    depends_on:
      - database
    ports:
      - 8080:80
```

avec des variables d’environnements: 

```yaml
version: '3'
services:
  echo:
    image: ubuntu
    hostname: "ubuntu.test.com"
    environment:
      MESSAGE: hello world
      ZOUBIDA: ZOUBIDOU

    command: "env"
```
    
## Lançons et manipulons les conteneurs :

Pour lancer les conteneurs : ```docker-compose up```

- -d pour detached
- -f pour indiquer le fichier s'il ne se nomme pas docker-compose.yml
- --project-name NAME Pour définir un autre nom de projet que celui du dossier par default

- Pour lancer une commande dans un service : ```docker-compose run <service-name> <command>```
- Pour vérifier que le compose est valide : ```docker-compose config```
- Pour stopper les conteneurs : ```docker-compose stop```
- Pour supprimer les conteneurs : ```docker-compose down```
- Pour relancer un seul conteneur : ```docker-compose restart <service-name>```
- Pour lire les logs : ```docker-compose logs``` ( -f pour bloquer et mettre à jour )

Si le docker-compose change, un simple ```docker-compose up -d``` mettra à jour les services.


## Les variables.

Ce qui est super chouette, c'est de pouvoir utiliser les variables d'environnement du système hote pour composer.
exemple :

```yaml
version: '3.7'
services:

  postgres:
    image: postgres:11.5-alpine
    env_file: .secret
    restart: always
    volumes:
      - ./Postgres/dbdata:/var/lib/postgresql/data
    container_name: database_postgres
    hostname: database_postgres
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
```


Nous n'avons plus qu'a créer un fichier nommé ```.secret``` avec les variables et de ne mettre les droits de lecture qu'a root :

```text
POSTGRES_USER=admin
POSTGRES_PASSWORD=super_s3cret
POSTGRES_DB=database_name
```

## Résumé :

- Définissez l'environnement de votre application avec un Dockerfile afin qu'il puisse être reproduit n'importe où.
- Définissez les services qui composent votre application dans docker-compose.yml pour qu'ils puissent être exécutés ensemble dans un environnement isolé.
- Enfin, exécutez docker-compose up et Compose démarrera et exécutera l'intégralité de votre application. 


## Exercices :

- Pareil que dans le cours 01 mais avec docker-compose.
- Installer un gitea
- Installer un wordpress
- Installer un nextcloud
- Séparer les conteneurs dans plusieurs réseaux. Un front accessible depuis l'extérieur, et un back derrière un firewall.
- Installer un reverse-proxy avec Traefik et utiliser un dns pour tout les précédents conteneurs visible en front.