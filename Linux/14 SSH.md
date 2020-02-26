#La connexion sécurisée à distance avec SSH

toutes les machines sous Linux peuvent être configurées pour que l'on s'y connecte à distance, pour peu qu'elles restent allumées.

Tout ce que vous avez appris à faire dans une console, vous pouvez le faire à distance depuis n'importe quelle machine dans le monde.

Avant : Telnet. Simple, mais non chiffré.

Comme on ne peut pas complètement empêcher quelqu'un d'intercepter les données qui transitent sur l'internet, il faut trouver un moyen pour que le client et le serveur communiquent de manière sécurisée. Le chiffrement sert précisément à ça : si le pirate récupère le mot de passe chiffré, il ne peut rien en faire.

deux catégories : les chiffrements symétriques et les chiffrements asymétriques.

![](https://user.oc-static.com/files/144001_145000/144717.png)
![](https://user.oc-static.com/files/144001_145000/144718.png)

il faut que le client et le serveur connaissent tous les deux la clé de chiffrement.
Il faut donc que le client envoie d'abord au serveur la clé pour que celui-ci puisse déchiffrer ses futurs messages…

Le chiffrement symétrique est donc puissant, mais il a un gros défaut : il faut communiquer « discrètement » la clé de chiffrement… mais c'est impossible : il faut bien envoyer la clé en clair au début !

Pour chiffrer la clé de chiffrement symétrique, on va utiliser une autre méthode : le chiffrement asymétrique. Avec cette autre méthode, on ne risque pas de connaître à nouveau le problème que l'on vient de rencontrer.

Le chiffrement symétrique utilise une seule clé pour chiffrer et déchiffrer.
Le chiffrement asymétrique, lui, utilise une clé pour chiffrer, et une autre pour déchiffrer.

Il y a donc deux clés :

- une clé dite « publique » qui sert à chiffrer ;
- une clé dite « privée » qui sert à déchiffrer.

La clé publique ne sert qu'à chiffrer. Avec ce type d'algorithme, on ne peut déchiffrer un message que si l'on connaît la clé privée.

On demande à l'ordinateur de générer une paire de clés : une privée et une publique. Elles vont ensemble.

SSH utilise les deux chiffrements : asymétrique et symétrique. Cela fonctionne dans cet ordre.

- On utilise d'abord le chiffrement asymétrique pour s'échanger discrètement une clé secrète de chiffrement symétrique.
- Ensuite, on utilise tout le temps la clé de chiffrement symétrique pour chiffrer les échanges.

le chiffrement asymétrique demande beaucoup trop de ressources au processeur. Le chiffrement asymétrique est 100 à 1 000 fois plus lent que le chiffrement symétrique !


## En pratique :

`sudo apt-get install openssh-server`
`sudo service sshd status`
`ssh user@ip_serveur`

Il y a plusieurs façons de s'authentifier sur le serveur, pour qu'il sache que c'est bien vous. Les deux plus utilisées sont :

    - l'authentification par mot de passe ;
    - l'authentification par clés publique et privée du client.

Dans son home :
`ssh-keygen`

puis, par exemple :

`ssh-copy-id -i id_rsa.pub "-p 14521 mateo21@88.92.107.7"`

La clé est ensuite automatiquement ajoutée à~/.ssh/authorized_keyssur le serveur. 
exercice : Entrez sur un serveur depuis windows avec putty. Et une clef SSH.

En résumé

    - On peut se connecter à distance à un ordinateur équipé de Linux et accéder à sa console. C'est comme cela que l'on administre les serveurs sous Linux.

    - Le PC qui se connecte au serveur équipé de Linux est appelé le client. On peut se connecter à une console Linux à distance depuis n'importe quel autre système d'exploitation (Windows, Mac OS ou Linux).

    - Sous Windows, il faut installer le programme PuTTY pour se connecter à distance à un PC équipé de Linux.

    - Sous Linux et Mac OS, on utilise la commandesshà laquelle on indique son login et l'adresse IP de la machine. Par exemple :ssh mateo21@74.141.18.33.

    - Les données qui sont échangées entre le client et le serveur sont chiffrées grâce au protocole SSH afin de garantir la confidentialité des échanges.

    - Pour éviter de devoir entrer son mot de passe à chaque fois que l'on se connecte au serveur, on peut se créer une paire de clés d'identification. La clé publique ainsi générée doit être envoyée sur le serveur, la clé privée restant sur le PC du client. La connexion se fait alors sans mot de passe et reste sécurisée.