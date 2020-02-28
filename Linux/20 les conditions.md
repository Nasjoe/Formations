## Les conditions

La prise de décision est un élément indispensable dans tout programme. Si 
on ne pouvait pas décider quoi faire, le programme ferait toujours la 
même chose… ce qui serait bien ennuyeux.

Les branchements conditionnels (que nous abrègerons « conditions ») constituent un moyen de dire dans notre script « SI cette variable vaut tant, ALORS fais ceci, SINON fais cela ». 


### if : la condition la plus simple

Le type de condition le plus courant est le`if`, qui signifie « si ».

```bash
#!/bin/bash

nom="Bruno"

if [ $nom = "Bruno" ]
then
        echo "Salut Bruno !"
else
        echo "J'te connais pas, ouste !"
fi
```

```bash
#!/bin/bash

if [ $1 = "Bruno" ]
then
        echo "Salut Bruno !"
elif [ $1 = "Michel" ]
then
        echo "Bien le bonjour Michel"
elif [ $1 = "Jean" ]
then
        echo "Hé Jean, ça va ?"
else
        echo "J'te connais pas, ouste !"
fi
```

exercice : Script qui demande un prenom, ou qui prend un argument et qui affiche un résultat en fonction.



### Les tests

Voyons maintenant un peu quels sont les tests que nous pouvons faire. Pour l'instant, on a juste vérifié si deux chaînes de caractères étaient identiques, mais on peut faire beaucoup plus de choses que cela !

#### Les différents types de tests

Il est possible d’effectuer trois types de tests différents en bash :

- des tests sur des chaînes de caractères ;

- des tests sur des nombres ;

- des tests sur des fichiers.



| Condition              | Signification                                                                                                                                                                                      |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$chaine1 = $chaine2`  | Vérifie si les deux chaînes sont identiques. Notez que bash est sensible à la casse : « b » est donc différent de « B ».<br> Il est aussi possible d'écrire « == » pour les habitués du langage C. |
| `$chaine1 != $chaine2` | Vérifie si les deux chaînes sont différentes.                                                                                                                                                      |
| `-z $chaine`           | Vérifie si la chaîne est vide.                                                                                                                                                                     |
| `-n $chaine`           | Vérifie si la chaîne est non vide.                                                                                                                                                                 |

On peut aussi vérifier si le paramètre existe avec`-z`(vérifie si la chaîne est vide). En effet, si une variable n'est pas définie, elle est considérée comme vide par bash. On peut donc par exemple s'assurer que`$1`existe en faisant comme suit :

```bash
#!/bin/bash

if [ -z $1 ]
then
        echo "Pas de paramètre"
else
        echo "Paramètre présent"
fi
```

##### Tests sur des nombres

Bien que bash gère les variables comme des chaînes de caractères pour son fonctionnement interne, rien ne nous empêche de faire des comparaisons de nombres si ces variables en contiennent. Vous trouverez les différents types de tests disponibles sur le tableau suivant.

| Condition         | Signification                                                                                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$num1 -eq $num2` | Vérifie si les nombres sont égaux (**eq***ual*). À ne pas confondre avec le « = » qui, lui, compare deux chaînes de caractères.                                             |
| `$num1 -ne $num2` | Vérifie si les nombres sont différents (**n***on***e***qual*). <br/>Encore une fois, ne confondez pas avec « != » qui est censé être utilisé sur des chaînes de caractères. |
| `$num1 -lt $num2` | Vérifie si`num1`est inférieur ( < ) à`num2`(**l***ower***t***han*).                                                                                                         |
| `$num1 -le $num2` | Vérifie si`num1`est inférieur ou égal ( <= ) à`num2`(**l***ower**or***e***qual*).                                                                                           |
| `$num1 -gt $num2` | Vérifie si`num1`est supérieur ( > ) à`num2`(**g***reater***t***han*).                                                                                                       |
| `$num1 -ge $num2` | Vérifie si`num1`est supérieur ou égal ( >= ) à`num2`(**g***reater**or***e***qual*).                                                                                         |

Vérifions par exemple si un nombre est supérieur ou égal à un autre nombre :

#!/bin/bash
if [ $1 -ge 20 ]
then
        echo "Vous avez envoyé 20 ou plus"
else
        echo "Vous avez envoyé moins de 20"
fi
