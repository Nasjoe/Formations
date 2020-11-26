# Docker - Introduction

Docker est un logiciel libre conçu pour lancer des applications dans des conteneurs logiciels.  
Ces conteneurs sont plus légers en ressources que les machines virtuelles car ils partagent leur noyau.
La para-virtualisation est une technique de virtualisation qui permet à une « machine virtuelle » d’utiliser un système sans à avoir virtualiser l’ensemble des composants de l’ordinateur (carte réseau, processeur, etc…), contrairement à la virtualisation classique qui va devoir émuler ces derniers. L’intérêt majeur est un gain important de performances, car la « machine virtuelle » utilise directement les ressources de la machine physique sans à avoir émuler un composant intermédiaire.

![docker](https://upload.wikimedia.org/wikipedia/commons/c/c6/Containers.png)

## Installation :
https://docs.docker.com/engine/install/ubuntu/

## DockerFile

Il existe deux sortes de conteneur :

- Celui issu d'une image téléchargée et utilisée telle qu'elle.
- Celui construit avec des instructions personnalisées.

Par convention, les instructions pour construire un conteneur sont écrites dans un fichier appelé "Dockerfile".  
Il est recommandé de les placer dans un dépôt Git pour les versionner.
