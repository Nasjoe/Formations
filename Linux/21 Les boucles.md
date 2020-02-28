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
