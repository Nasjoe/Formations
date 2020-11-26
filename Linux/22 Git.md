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

L'initialiser depuis son ordi :

    git init
    git add README.md
    git commit -m "premier commit"
    bit branch -M main
    git remote add origin git@github.com:blogmotion/bm-backup-ssh.git
    git push -u origin master

## Ajouter un fichier

Git ne suit pas tout les fichier automatiquement. Il faut lui dire lesquel seront versionner :

    git add fichier
    git add *
    git add dossier/fichier
    git add dossier/*
    
## Commiter :

Commiter est pour sauvegarder à un point donné sa modification.
Chaque commit est comme un point de sauvegarde sur lequel on peut revenir à tout moment.
L'idée est de "commiter" à chaque étape du developpement. Presque à chaque modification !



