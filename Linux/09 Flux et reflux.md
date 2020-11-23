# Les flux de redirection

Il est possible de rediriger tout résultat d'une commande. 
Au lieu que celui-ci s'affiche dans la console, vous allez pouvoir l'envoyer ailleurs : dans un fichier ou en entrée d'une autre commande pour effectuer des « chaînes de commandes ».

![pipe.png](https://user.oc-static.com/files/137001_138000/137848.png)


## > et >> : rediriger le résultat dans un fichier
ont dit simple ou double chevron

    cut -d , -f 1 notes.csv > eleves.txt
    
Si vous exécutez cette commande, rien ne s'affichera dans la console. 
Tout aura été redirigé dans un fichier appelé eleves.txt

    > : Créer ou écraser un fichier
    >> : rediriger à la fin d'un fichier
    
    
## 2>, 2>> et 2>&1 : rediriger les erreurs

Toutes les commandes produisent deux flux de données différents :

- la sortie standard : pour tous les messages (sauf les erreurs) ;
- la sortie d'erreurs : pour toutes les erreurs.

![erreur.png](https://user.oc-static.com/files/137001_138000/137857.png)

Par défaut, tout s'affiche dans la console : la sortie standard comme la sortie d'erreurs. 

    cut -d , -f 1 fichier_inexistant.csv > eleves.txt
    cut: fichier_inexistant.csv: Aucun fichier ou répertoire de ce type

    cut -d , -f 1 fichier_inexistant.csv > eleves.txt 2> erreurs.log
    
Notez qu'il est aussi possible d'utiliser 2>> pour ajouter les erreurs à la fin du fichier.

Parfois, on n'a pas envie de séparer les informations dans deux fichiers différents. H
eureusement, il est possible de fusionner les sorties dans un seul et même fichier.
Il faut utiliser le code suivant : 2>&1.

Cela a pour effet de rediriger toute la sortie d'erreurs dans la sortie standard. 
Traduction pour l'ordinateur : « envoie les erreurs au même endroit que le reste ».

    cut -d , -f 1 fichier_inexistant.csv > eleves.txt 2>&1

Tout ira désormais dans eleves.txt : le résultat (si cela a fonctionné), de même que les erreurs (s'il y a eu un problème).


## | : chaîner les commandes

Parfois, l'utilité de certaines commandes seules peut paraître limitée, mais celles-ci prennent en général tout leur sens lorsqu'on les combine à d'autres commandes.

![pipi2.png](https://user.oc-static.com/files/138001_139000/138426.png)

    cut -d , -f 1 notes.csv | sort

![pipi2.png](https://user.oc-static.com/files/138001_139000/138657.png)


EXO :
Trier les répertoires par la taille avec ```du```
Ne voir que les premiers ( les plus gros )
Ne voir que les derniers ( les plus petits )
Sortir son adresse ip locale d'un coup


En résumé
- Au lieu d'afficher le résultat d'une commande dans une console, il est possible de l'enregistrer dans un fichier. Il suffit d'ajouter le symbole > suivi du nom du fichier à la fin de la commande. Par exemple ls > liste_fichiers.txt enregistre la liste des fichiers dans un fichier plutôt que de l'afficher en console.
- Le symbole>> enregistre à la fin du fichier au lieu de l'écraser s'il existe déjà.
- Les symboles 2> et 2>> permettent de rediriger seulement les erreurs dans un fichier. Quant à 2>&1 il redirige les erreurs dans le même fichier que les messages normaux.
- < permet de lire des données depuis un fichier et de les envoyer à une commande, tandis que << lit les données depuis le clavier.
- Le symbole | combine des commandes : les données de la commande à sa gauche sont envoyées à la commande à sa droite. Ainsi, du | sort -nr récupère la liste des fichiers avec leur taille et l'envoie à sort pour qu'il la trie.

