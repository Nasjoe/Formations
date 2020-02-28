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

```bash
#!/bin/bash
if [ $1 -ge 20 ]
then
        echo "Vous avez envoyé 20 ou plus"
else
        echo "Vous avez envoyé moins de 20"
fi
```

##### Tests sur des fichiers

Un des avantages de bash sur d'autres langages est que l'on peut très facilement faire des tests sur des fichiers : savoir s'ils existent, si on peut écrire dedans, s'ils sont plus vieux, plus récents, etc. Le tableau suivant présente les différents types de tests disponibles.

| Condition                 | Signification                                                                                                                    |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `-e $nomfichier`          | Vérifie si le fichier existe.                                                                                                    |
| `-d $nomfichier`          | Vérifie si le fichier est un répertoire. N'oubliez pas que sous Linux, tout est considéré comme un fichier, même un répertoire ! |
| `-f $nomfichier`          | Vérifie si le fichier est un… fichier. Un vrai fichier cette fois, pas un dossier.                                               |
| `-L $nomfichier`          | Vérifie si le fichier est un lien symbolique (raccourci).                                                                        |
| `-r $nomfichier`          | Vérifie si le fichier est lisible (r).                                                                                           |
| `-w $nomfichier`          | Vérifie si le fichier est modifiable (w).                                                                                        |
| `-x $nomfichier`          | Vérifie si le fichier est exécutable (x).                                                                                        |
| `$fichier1 -nt $fichier2` | Vérifie si`fichier1`est plus récent que`fichier2`(**n***ewer***t***han*).                                                        |
| `$fichier1 -ot $fichier2` | Vérifie si`fichier1`est plus vieux que`fichier2`(**o***lder***t***han*).                                                         |

#### Effectuer plusieurs tests à la fois

Dans un`if`, il est possible de faire plusieurs tests à la fois. En général, on vérifie :

- si un test est vrai **ET** qu'un autre test est vrai ;

- si un test est vrai **OU** qu'un autre test est vrai.

Les deux symboles à connaître sont :

- **&&** : signifie « et » ;

- **||** : signifie « ou ».

Il faut encadrer chaque condition par des crochets. Prenons un exemple :

```bash
#!/bin/bash

if [ $# -ge 1 ] && [ $1 = 'koala' ]
then
        echo "Bravo !"
        echo "Vous connaissez le mot de passe"
else
        echo "Vous n'avez pas le bon mot de passe"
fi
```

Le test vérifie deux choses :

- qu'il y a au moins un paramètre (« si`$#`est supérieur ou égal à 1 ») ;

- que le premier paramètre est bien`koala`(« si`$1`est égal à`koala` »).

Si ces deux conditions sont remplies, alors le message indiquant que l'on a trouvé le bon mot de passe s'affichera.

```bash
$ ./conditions.sh koala
Bravo !
Vous connaissez le mot de passe
```



Notez que les tests sont effectués l'un après l'autre et seulement s'ils sont nécessaires. Bash vérifie d'abord s'il y a au moins un paramètre. Si ce n'est pas le cas, il ne fera pas le second test puisque la condition ne sera de toute façon pas vérifiée.

#### Inverser un test

Il est possible d'inverser un test en utilisant la négation. En bash, celle-ci est exprimée par le point d'exclamation « `!` ».

```bash
if [ ! -e fichier ]
then
        echo "Le fichier n'existe pas"
fi
```

### case : tester plusieurs conditions à la fois

On a vu tout à l'heure un`if`un peu complexe qui faisait appel à des`elif`et à un`else` :

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

Ce genre de « gros`if`qui teste toujours la même variable » ne pose pas de problème mais n'est pas forcément très facile à lire pour le programmeur. À la place, il est possible d’utiliser l'instruction`case`si nous voulons.

Le rôle de`case`est de tester la valeur d'une même variable, mais de manière plus concise et lisible.

Voyons comment on écrirait la condition précédente avec un`case` :

```bash
#!/bin/bash

case $1 in
        "Bruno")
                echo "Salut Bruno !"
                ;;
        "Michel")
                echo "Bien le bonjour Michel"
                ;;
        "Jean")
                echo "Hé Jean, ça va ?"
                ;;
        *)
                echo "J'te connais pas, ouste !"
                ;;
esac
```

#### En résumé

- On effectue des tests dans ses programmes grâce aux  `if`,  `then`,  `[[ elif, then, fi] else,] fi`.

- On peut comparer deux chaînes de caractères entre elles, mais aussi des 
  nombres. On peut également effectuer des tests sur des fichiers : est-ce
   que celui-ci exis‌te ? Est-il exécutable ? Etc.

- Au besoin, il est possible de combiner plusieurs tests à la fois avec les symboles`&&`(ET) et`||`(OU).

- Le symbole`!`(point d'exclamation) exprime la négation dans une condition.

- Lorsque l'on effectue beaucoup de tests sur une même variable, il est parfois plus pratique d'utiliser un bloc`case in… esac`plutôt qu'un bloc`if… fi`.



Exercices :

faire un script qui demande à l'utilisateur d'entrer le nom d'un répertoire et qui vérifie si c'en est bien un

Écrire un programme qui affiche les nombres de 1 à 199. Mais pour les multiples de 3, afficher “Fizz” au lieu du nombre et pour les multiples de 5 afficher “Buzz”. Pour les nombres multiples de 3 et 5, afficher 
“FizzBuzz”.





exercice : Script qui demande la marque d'une voiture ( Mercedes, BMW, Renault ), ou qui prend un argument et qui affiche un résultat en fonction.

exercice hard : Écrire un programme qui affiche les nombres de 1 à 199. Mais pour les 
multiples de 3, afficher “Fizz” au lieu du nombre et pour les multiples 
de 5 afficher “Buzz”. Pour les nombres multiples de 3 et 5, afficher 
“FizzBuzz” !
