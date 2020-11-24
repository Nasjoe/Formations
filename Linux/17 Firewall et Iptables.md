# `iptables` : le pare-feu de référence

Le plus célèbre pare-feu utilisé sous Linux est `iptables`. Il permet d'établir un certain nombre de règles pour dire par quels ports on peut se connecter à votre ordinateur, mais aussi à quels ports vous avez le droit de vous connecter (figure suivante). On peut également filtrer par IP,

![](https://user.oc-static.com/files/148001_149000/148356.png)

Chaque ordinateur possède plusieurs portes d'entrée possibles.
Notre objectif est de bloquer par défaut toutes ces portes et d'autoriser seulement celles dont vous avez besoin, que vous considérez comme « sûres » et que vous utilisez. Par exemple, le port 80 utilisé pour le web est un port sûr que vous pouvez activer.

Pour manipuler `iptables`, vous devez impérativement être en « root ». Pour la suite des opérations, je vous recommande donc de passer en superutilisateur dès à présent.

### `iptables -L` : Afficher les règles.

- Chain INPUT : correspond aux règles manipulant le trafic entrant ;
- Chain FORWARD : correspond aux règles manipulant la redirection du trafic ;
- Chain OUTPUT : correspond aux règles manipulant le trafic sortant.

`(policy ACCEPT)`  signifie que, par défaut, tout le trafic est accepté. 

`iptables -F`   <-- Attention ! Réinitialise toutes les règles iptables !

L'ajout d'une règle se passe suivant ce schéma :

`iptables -A (chain) -p (protocole) --dport (port) -j (décision)`

ex : 

``` bash
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```


- `-A chain` : ajoute une règle en fin de liste pour la `chain` indiquée (INPUT ou OUTPUT, par exemple).
- `-D chain rulenum` : supprime la règle n° `rulenum` pour la `chain` indiquée.
- `-I chain rulenum` : insère une règle au milieu de la liste à la position indiquée par `rulenum`. Si vous n'indiquez pas de position `rulenum`, la règle sera insérée en premier, tout en haut dans la liste.
- `-R chain rulenum` : remplace la règle n° `rulenum` dans la `chain` indiquée.
- `-L` : liste les règles
- `-F chain` : vide toutes les règles de la `chain` indiquée.
- `-P chain regle` : modifie la règle par défaut pour la `chain`. Cela permet de dire, par exemple, que par défaut tous les ports sont fermés, sauf ceux que l'on a indiqués dans les règles.


Remplacez `chain` par la section qui vous intéresse (`INPUT` ou `OUTPUT`), `protocole` par le nom du protocole à filtrer (TCP, UDP, ICMP…) et enfin `décision` par la décision à prendre : `ACCEPT` pour accepter le paquet, `REJECT` pour le rejeter ou bien `DROP` pour l'ignorer complètement.

Si vous ne précisez pas de port (en omettant la sectiondport), tous les ports seront acceptés !


### Autoriser les connexions locales et déjà ouvertes

Pour l'instant, nos règles sont encore un peu trop restrictives et pas vraiment utilisables (vous risquez de ne plus pouvoir faire grand-chose).
Je vous propose d’ajouter deux règles pour « assouplir » un peu votre pare-feu et le rendre enfin utilisable.

``` bash
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
```

Ces deux règles utilisent des options un peu différentes de celles que nous avons vues jusqu'ici. Voici quelques explications.

- La première règle autorise tout le trafic sur l'interface de loopback locale grâce à-i lo. Il n'y a pas de risque à autoriser votre ordinateur à communiquer avec lui-même, d’autant plus qu’il en a parfois besoin !

- La seconde règle autorise toutes les connexions qui sont déjà à l'état `ESTABLISHED` ou `RELATED`. En clair, elle autorise toutes les connexions qui ont été demandées par votre PC. Là encore, cela permet d'assouplir le pare-feu et de le rendre fonctionnel pour une utilisation quotidienne.


### Refuser toutes les autres connexions par défaut

Il reste un point essentiel à traiter car, pour l'instant, ce filtrage ne sert à rien. En effet, nous avons indiqué quelles données nous autorisions, mais nous n'avons pas dit que toutes les autres devaient être refusées !

Changez donc la règle par défaut pourDROPpar exemple :

`iptables -P INPUT DROP`

`iptables` devrait maintenant indiquer que par défaut tout est refusé, sauf ce qui est indiqué par les lignes dans le tableau :

``` bash
iptables -L
# Chain INPUT (policy DROP)
# target     prot opt source               destination         
# ACCEPT     tcp  --  anywhere             anywhere            tcp dpt:www 
# ACCEPT     tcp  --  anywhere             anywhere            tcp dpt:ssh 
# ACCEPT     tcp  --  anywhere             anywhere            tcp dpt:imap2 
# ACCEPT     icmp --  anywhere             anywhere
```

Le filtrage est radical. Nous n'avons pas autorisé beaucoup de ports et il se pourrait que vous vous rendiez compte que certaines applications n'arrivent plus à accéder à l'internet (normal, leur port doit être filtré).

À vous de savoir quels ports ces applications utilisent pour modifier les règles en conséquence.
Au besoin, pensez à faire de même pour les règles de sortie (OUTPUT).


### Appliquer les règles au démarrage

Si vous redémarrez votre ordinateur, les règles `iptables` auront disparu !
Le seul moyen pour qu'elles soient chargées au démarrage consiste à créer un script qui sera exécuté au démarrage.

Sinon, plus simple : `ufw` est un programme qui permet d'automatiser quelques taches.
https://doc.ubuntu-fr.org/ufw

En résumé

- Sur l'internet, chaque ordinateur est identifié par une adresse IP. Par exemple : 86.172.120.28.
- On peut associer à chaque adresse IP un nom d'hôte, plus facile à retenir, commelisa.simple-it.fr. Écrire le nom d'hôte est équivalent à écrire l'adresse IP.
- La commande `host` permet de traduire une IP en nom d'hôte et inversement.
- `ifconfig` liste les interfaces réseau (cartes réseau) de votre machine et permet de les configurer ainsi que de les activer.
- `netstat` affiche la liste des connexions ouvertes sur votre machine. Elle indique notamment quel port est utilisé à chaque fois, le port représentant en quelque sorte la porte d'entrée à votre machine.
- Il est possible de bloquer l'accès à certains ports avec le programme `iptables`, un pare-feu (firewall) très puissant.
