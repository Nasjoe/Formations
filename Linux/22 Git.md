# GIT

Source et histoire :
http://blogmotion.fr/programmation/formation-git-sysadmin-18534
https://youtu.be/LDy6Rv0kU1Q


Git est un système de versionning. Créé par Linus Himself !

Créer un dépot. Deux solutions.

## Github, Gitea, GitLab

- Créer un compte sur Github ( ou autre service type Gitea, gitLab, etc )
- Rajouter sa clef SSH publique pour ne pas se soucier des login / password
- Créer le dépot. Avec si possible un README.md
- Le cloner sur son ordi :

```git clone git@github.com:Nasjoe/Formations.git```

## Git init

On peut créer un dépot directement depuis son Ordi. Perso, je préfère la solution plus haut. Mais c'est possible :

    git init
    git add README.md
    git commit -m "premier commit"
    bit branch -M main
    git remote add origin git@github.com:blogmotion/bm-backup-ssh.git
    git push -u origin master

## Ajouter un fichier

Git ne suit pas tout les fichiers automatiquement. Il faut lui dire lesquel seront versionner :

    git add fichier
    git add *
    git add dossier/fichier
    git add dossier/*
    
## Commiter :

Commiter est pour sauvegarder à un point donné sa modification.
Chaque commit est comme un point de sauvegarde sur lequel on peut revenir à tout moment.
L'idée est de "commiter" à chaque étape du developpement. Presque à chaque modification !
On pourra suivre à travers les commits de chacun l'évolution du projet

    git commit -a -m "commentaire sur mes modifications"
    -a pour dire all, tous les fichiers
    -m pour commenter la modif : OBLIGATOIRE
    

## Push

Une fois un ou plusieurs commit(s) fait. 
On pousse vers le serveur pour partager notre modification, ou simplement sauvegarder ailleurs que sur son ordi.

    git push

## Pull

Pour récuperer le travail des autres. Le travail distant, sur le serveur.
Attention !
Si vous avez fait des modifications entre temps, n'oubliez pas de faire un commit.
En effet, le pull va ecraser votre dépot !

    git pull
    
    
## La suite...
Pour aller plus loin :
https://blog.jetpulp.fr/bases-de-git-debutant/
