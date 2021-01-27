# Docker - Introduction

Docker est un logiciel libre conçu pour lancer des applications dans des conteneurs logiciels.  
Ces conteneurs sont plus légers en ressources que les machines virtuelles car ils partagent leur noyau.
La para-virtualisation est une technique de virtualisation qui permet à une « machine virtuelle » d’utiliser un système sans à avoir virtualiser l’ensemble des composants de l’ordinateur (carte réseau, processeur, etc…), contrairement à la virtualisation classique qui va devoir émuler ces derniers. L’intérêt majeur est un gain important de performances, car la « machine virtuelle » utilise directement les ressources de la machine physique sans à avoir émuler un composant intermédiaire.


## Installation :
https://docs.docker.com/engine/install/ubuntu/

## Qu’es-ce qu'un conteneur
![conteneur](https://blog.webnet.fr/wp-content/uploads/2020/03/VM-vs-Docker.png)

Il existe deux sortes de conteneurs :

- Celui issu d'une image téléchargée et utilisée telle qu'elle.
- Celui construit avec des instructions personnalisées.

Les bénéfices de la « containerisation » sont multiples :

- Lancement beaucoup plus rapide
- Facilité de migration d’une machine à une autre

Les désavantages :

- Interfaces réseau virtuelle supplémentaires
- Logiciel Docker un peu groumant en lui même


## DockerFile


Par convention, les instructions pour construire un conteneur sont écrites dans un fichier appelé "dockerfile".  
Il est recommandé de les placer dans un dépôt Git pour les versionner.

Pour voir les images déjà présentes sur votre machine :

```
docker images
```

La documentation :
https://docs.docker.com/engine/reference/builder/

pour créer une nouvelle image par nous même, de notre cru, il faut créer un dossier, puis créer a l'intérieur un fichier nommé ```dockerfile``` qui peut ressembler à ça :
```text
# DOCKERFILE
FROM ubuntu:latest
RUN apt update
RUN apt upgrade -y
COPY coucou.txt coucou.txt
CMD ["cat", "coucou.text"]
```


Il est alors possible de construire l'image du conteneur depuis ce fichier:

```shell
docker build -t <nom de l'image> <chemin du dockerfile>

# exemple :
docker build -t nginx .
```

Le ```.``` est la pour dire " ici ".

## Lancement d'un conteneur, docker run.

Documentation : https://docs.docker.com/engine/reference/run/

Une fois l'image créée, nous pouvons lancer autant de conteneur avec que l'on souhaite avec :

```shell
docker run hello-world
docker run ubuntu:latest bash
```

Si le nom de l'image n'existe pas en local, c'est a dire que vous ne l'avez pas construite (build), Docker tentera de la télécharger depuis ses dépôts (DockerHub) à lui.

Il est possible d'aller chercher l'image sans run :

```shell
docker pull nginx
```


- -d : detaché. Le conteneur tourne en tache de fond
- -t --tty : Crée un pseudo tty
- -i --interactive : Garde le STDIN ouvert, même si détaché. On utilise -ti souvent ensemble.
- -rm : remove. Supprime le conteneur une fois la tache effectuée.
- -v : Volume. Crée un volume partagé entre l'hote et le conteneur.  ```<chemin hote>:<chemin conteneur>```
- -p : Ports. Ouvre un NAT entre l’hôte et le conteneur. format ```<port conteneur>:<port conteneur>```
- -e : Variable d’environnement. Pour retrouver la même variable dans le shell du conteneur. 

![port](https://linuxhandbook.com/content/images/2020/11/ssh-into-container.png)


## Voir les conteneurs et les manipuler :

Pour voir la liste des conteneurs sur votre machine :
```shell
docker ps
docker ps -a ( affiche ceux arrétés )
```

Pour executer une action dans un conteneur :
```shell
docker exec <id ou name> <commande>
```

Du coup, pour "entrer" dans un conteneur, prévoir une sesssion TTY avec -ti et :
```shell
docker exec <id ou name> bash
```

Stopper ou supprimer un conteneur :
```shell
docker stop <id ou name>
docker rm <id ou name>
```

inspecter un conteneur :
```shell
docker inspect <id ou name>
```

### Exercice :

- Créer un conteneur qui affiche htop en mode "tree" une fois lancé.
- Créer un conteneur qui permet de partager un dossier entre l'hote et le conteneur, et qui affiche un fichier texte dans ce dossier partagé lors du lancement du conteneur.
- Installer openssh par default dans l'image et faire en sorte qu'il se lance automatiquement au démarrage du conteneur.

indice : pour lancer le service ssh et rester dessus, on peut utiliser : 
```
/usr/sbin/sshd -D
```

- Rajouter un user autre que root, sans mot de passe.
- Ouvrir un port extérieur vers le port ssh du conteneur pour que l'user créé puisse s'y connecter.
- Rajouter un fichier qui permet de se connecter avec des clef ssh publique connues.
- Puis vérifier les logs de connexion via le SDTOUT.
