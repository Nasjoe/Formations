## Les boucles

Nous allons 
découvrir dans ce chapitre un autre élément de base de tous les 
langages : les boucles. Ces structures permettent de répéter autant de 
fois que nécessaire une partie du code. En bash, on n'y échappe pas !

Les
 consignes sont les mêmes que pour le chapitre sur les conditions : il 
faut être vigilant sur la syntaxe. Une espace de trop ou de moins, 
l'oubli d'un caractère spécial et plus rien ne fonctionne. Soyez donc 
très rigoureux lorsque vous codez !

Si vous suivez cette simple règle, vous n'aurez pas de problèmes.

## FOR

#### Parcourir une liste de valeurs

La boucle`for`permet de parcourir une liste de valeurs et de boucler autant de fois qu'il y a de valeurs.

Concrètement, la forme d'un`for`est la suivante :



```
POUR variable PRENANT valeur1 valeur2 valeur3
FAIRE
------> effectuer_une_action
VALEUR_SUIVANTE
```

```bash
#!/bin/bash

for animal in 'chien' 'souris' 'moineau'
do
        echo "Animal en cours d'analyse : $animal"
done
```

```bash
#!/bin/bash

liste_fichiers=`ls`

for fichier in $liste_fichiers
do
        echo "Fichier trouvé : $fichier"
done
```

##### **À vous de jouer !** Essayez de créer un script`multirenommage.sh`, reposant sur ce principe, qui va rajouter le suffixe`-old`… uniquement aux fichiers qui correspondent au paramètre envoyé par l'utilisateur !

./multirenommage.sh *.txt

Si aucun paramètre n'est envoyé, vous demanderez à l'utilisateur de saisir le nom des fichiers à renommer avec`read`.



#### Un`for`plus classique

Pour les habitués d'autres langages de programmation, le`for`est une boucle qui permet de faire prendre à une variable une suite de nombres.

En bash, comme on l'a vu, le`for`permet de parcourir une liste de valeurs. Toutefois, en trichant un peu à l'aide de la commande`seq`, il est possible de simuler un`for`classique :

```bash
#!/bin/bash
for i in `seq 1 10`;
do
        echo $i
done
```



### while : boucler « tant que »

Le type de boucle que l'on rencontre le plus couramment en bash est`while`.



```bash
while [ test ]
do
        echo 'Action en boucle'
done
```

ex :

```bash
#!/bin/bash

while [ -z $reponse ] || [ $reponse != 'oui' ]
do
        read -p 'Dites oui : ' reponse
done
```

Il existe aussi le mot clé`until`, qui est l'exact inverse de`while`. Il signifie « Jusqu'à ce que ».  

Remplacez juste`while`par`until`dans le code précédent pour l'essayer.



#### En résumé

- Pour exécuter une série de commandes plusieurs fois, on utilise des boucles.

- `while`permet
   de boucler tant qu'une condition est remplie. Le fonctionnement des 
  conditions dans les boucles est le même que celui des blocs`if`découverts dans le chapitre précédent.

- `for`permet
   de boucler sur une série de valeurs définies. À l'intérieur de la 
  boucle, une variable prend successivement les valeurs indiquées.