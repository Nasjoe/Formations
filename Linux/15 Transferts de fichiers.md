# Transférer des fichiers

## wget : Télécharger sur le net 

`wget http://cdimage.debian.org/debian-cd/4.0_r5/i386/iso-cd/ debian-40r5-i386-businesscard.iso`

`-c` pour faire du resume.


## scp : copie des fichiers sur le réseau via ssh

scp source destination

``` bash
scp image.png mateo21@85.123.10.201:/home/mateo21/images/
scp image.png mateo21@lisa.simple-it.fr:~/images/
scp mateo21@85.123.10.201:image.png copie_image_sur_mon_pc.
scp mateo21@85.123.10.201:image.png .
scp -P 16296 mateo21@85.123.10.201:image.png .
```

## Plus simple : FileZilla

En interface graphique. Gère le sftp. C'est a dire le FTP via SSH.

## Encore plus simple : Croc : un outil méconnu mais surpuissant


Il fonctionne en ligne de commande mais est tout simple. Il suffit de faire croc send /votre/fichier /un/autre/fichier /et/pourquoi/pas/un/dossier/ . À ce moment-là, il vous apparaitra trois mots plus ou moins aléatoire qu'il faudra donner à votre destinataire.

Le destinataire n'aura plus qu'à faire croc right-bucket-orlando (enfin vos 3 mots à vous) et hop ça initiera l'échange et tout. Pas d'ouverture de port, c'est très rapide (à peu près la vitesse de la connexion), c'est chiffré de bout-en-bout.
https://lord.re/posts/196-croc-transfert-fichier-chiffre-rapide-simple/


## rsync : synchroniser des fichiers pour une sauvegarde

`rsync` est le plus souvent utilisé pour effectuer des sauvegardes incrémentielles. 
C'est une sorte descpintelligent : il compare et analyse les différences entre deux dossiers puis copie uniquement les changements.


`rsync -arv Images/ backups/`

- `-a` : conserve toutes les informations sur les fichiers, comme les droits (chmod), la date de modification, etc. ;
- `-r` : sauvegarde aussi tous les sous-dossiers qui se trouvent dans le dossier à sauvegarder ;
- `-v` : mode verbeux, affiche des informations détaillées sur la copie en cours.


En résumé

- `wget` permet de télécharger un fichier.
- Pour copier des fichiers d'un ordinateur à un autre, on utilisescp. Il fonctionne à l'aide de SSH, donc le transfert est sécurisé.
- On peut se connecter à un serveur FTP avec la commande `ftp` pour y télécharger et y envoyer des fichiers.
- Il existe une alternative sécurisée à FTP qui crypte les échanges grâce à SSH : `sftp`.
- `rsync` permet de synchroniser le contenu de deux dossiers sur un même ordinateur ou sur deux ordinateurs différents. Il est particulièrement utile pour effectuer des sauvegardes.