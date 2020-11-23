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


