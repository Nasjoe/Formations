# Docker - Introduction

Docker est un logiciel libre conçu pour lancer des applications dans des conteneurs logiciels.  
Ces conteneurs sont plus légers en ressources que les machines virtuelles car ils partagent leur noyau.
La para-virtualisation est une technique de virtualisation qui permet à une « machine virtuelle » d’utiliser un système sans à avoir virtualiser l’ensemble des composants de l’ordinateur (carte réseau, processeur, etc…), contrairement à la virtualisation classique qui va devoir émuler ces derniers. L’intérêt majeur est un gain important de performances, car la « machine virtuelle » utilise directement les ressources de la machine physique sans à avoir émuler un composant intermédiaire.


## Installation :
https://docs.docker.com/engine/install/ubuntu/

## Qu'esce qu'un conteneur
![conteneur](https://blog.webnet.fr/wp-content/uploads/2020/03/VM-vs-Docker.png)

Il existe deux sortes de conteneur :

- Celui issu d'une image téléchargée et utilisée telle qu'elle.
- Celui construit avec des instructions personnalisées.

Les bénéfices de la « containerisation » sont multiples :

- Lancement beaucoup plus rapide
- Facilité de migration d’une machine à une autre

## DockerFile

Par convention, les instructions pour construire un conteneur sont écrites dans un fichier appelé "Dockerfile".  
Il est recommandé de les placer dans un dépôt Git pour les versionner.

Pour voir les images déja présentes sur votre machine :

```docker images```

DOCKERFILE :
```
FROM ubuntu:latest
RUN apt install nano
```

Ou alors, nous pouvons récuperer l'image depuis le Docker HUB

```docker pull nginx:latest```

## docker-compose

Exemple pour nginx :

```yaml
version: '3'
services:
  web:
    image: nginx:alpine
    volumes:
     - ./Template:/usr/share/nginx/html
    ports :
      - 8080:80
    restart: always
```
