# Afficher et manipuler des variables

Comme dans tous les langages de programmation, on trouve en bash ce que l'on appelle des variables. Elles nous permettent de stocker temporairement des informations en mémoire. C'est en fait la base de la programmation.

Créons un nouveau script :

`subl variable.sh`

```bash
message="Bonjour tout le monde,\nc\'est moi "
echo $message
```

le \ est un caractère d'échapement.

#### Les quotes

Il est possible d'utiliser des **quotes** pour délimiter un paramètre contenant des espaces. Il existe trois types de quotes :

- les apostrophes ' ' (simples quotes) ;

- les guillemets " " (doubles quotes) ;

- les accents graves (back quotes), qui s'insèrent avec `Alt Gr + 7` sur un clavier AZERTY français.

```bash
message='Bonjour tout le monde'
echo 'Le message est : $message'
echo "Le message est : $message"
```

```bash
cmd=`pwd`
echo "vous êtes dans le dossier $cmd"
```

### read : demander une saisie

Vous pouvez demander à l'utilisateur de saisir du texte avec la commande `read`. Ce texte sera immédiatement stocké dans une variable.

```bash
#!/bin/bash

read nom
echo "Bonjour $nom !"

read -p 'Entrez votre nom et prenom : ' nom prenom
echo "Bonjour $prenom $nom !"
```

###### `-n` : limiter le nombre de caractères

###### `-t` : limiter le temps autorisé pour saisir un message

###### `-s` : ne pas afficher le texte saisi

### Effectuer des opérations mathématiques

En bash, les variables sont toutes des chaînes de caractères. En soi, le bash n'est pas vraiment capable de manipuler des nombres ; il n'est donc pas capable d'effectuer des opérations.

```bash
#!/bin/bash

let "a = 5"
let "b = 2"
let "c = a + b"
echo $c
```

Les opérations utilisables sont :

- l'addition : + ;

- la soustraction : - ;

- la multiplication : * ;

- la division : / ;

- la puissance : ** ;

- le modulo (renvoie le reste de la division entière) : %.

Quelques exemples :

```bash
let "a = 5 * 3" # $a = 15
let "a = 4 ** 2" # $a = 16 (4 au carré)
let "a = 8 / 2" # $a = 4
let "a = 10 / 3" # $a = 3
let "a = 10 % 3" # $a = 1

let "a = a * 3"
let "a *= 3"
```

Une petite explication pour les deux dernières lignes :

- 10 / 3 = 3 car la division est entière (la commande ne renvoie pas de nombres décimaux) ;

- 10
   % 3 renvoie 1 car le reste de la division de 10 par 3 est 1. En effet, 3
   « rentre » 3 fois dans 10 (ça fait 9), et il reste 1 pour aller à 10.

### Les variables d'environnement

Actuellement, les variables que vous créez dans vos scripts bash n'existent que dans 
ces scripts. En clair, une variable définie dans un programme A ne sera pas utilisable dans un programme B.

Les variables d'environnement sont des variables que l'on peut utiliser dans n'importe quel programme. On parle aussi parfois de **variables globales**. Vous pouvez afficher toutes celles que vous avez actuellement en mémoire avec la commande `env`

Il y en a beaucoup. Certaines sont très utiles, d'autres moins. Parmi celles que je peux vous commenter et qui peuvent s'avérer utiles, on 
trouve :

- `SHELL` : indique quel type de shell est en cours d'utilisation (sh, bash, ksh…) ;

- `PATH` :
   une liste des répertoires qui contiennent des exécutables que vous 
  souhaitez pouvoir lancer sans indiquer leur répertoire. Nous en avons 
  parlé un peu plus tôt. Si un programme se trouve dans un de ces 
  dossiers, vous pourrez l'invoquer quel que soit le dossier dans lequel 
  vous vous trouvez ;

- `EDITOR` : l'éditeur de texte par défaut qui s'ouvre lorsque cela est nécessaire ;

- `HOME` : la position de votre dossier `home` ;

- `PWD` : le dossier dans lequel vous vous trouvez ;

- `OLDPWD` : le dossier dans lequel vous vous trouviez auparavant.

Vous pourriez avoir besoin de définir votre propre variable d'environnement. Pour cela, on utilise la commande `export` que vous avez pu voir dans votre `.bashrc`.

### Les variables des paramètres

Comme toutes les commandes, vos scripts bash peuvent eux aussi accepter des 
paramètres. Ainsi, on pourrait appeler notre script comme ceci :

`./variables.sh param1 param2 param3`

Le problème, c'est que nous n'avons toujours pas vu comment récupérer ces paramètres dans notre script. Pourtant, c'est très simple à réaliser !

En effet, des variables sont automatiquement créées :

- `$#` : contient le nombre de paramètres ;

- `$0` : contient le nom du script exécuté (ici `./variables.sh`) ;

- `$1` : contient le premier paramètre ;

- `$2` : contient le second paramètre ;

- … ;

- **$9** : contient le 9e paramètre.

```bash
#!/bin/bash

echo "Vous avez lancé $0, il y a $# paramètres"
echo "Le paramètre 1 est $1"
```

On peut « décaler » les paramètres dans les variables `$1`, `$2`, etc. à l’aide de la commande `shift`.

### Les tableaux

Le bash gère également les variables « tableaux ». Ce sont des variables qui contiennent plusieurs cases, comme un tableau.

En python, on parle de liste ou de dictionnaire. En php on parle d'Array. Parfois aussi on parle de json.#!/bin/bash

```bash

tableau=('valeur0' 'valeur1' 'valeur2')
tableau[5]='valeur5'
echo ${tableau[1]}
echo ${tableau[*]}
```

#### En résumé

- Comme dans la plupart des langages de programmation, on peut créer des 
  variables en shell qui stockent temporairement des valeurs en mémoire. 
  Une variable nommée `variable` est accessible en écrivant `$variable`.

- La commande `echo` affiche un texte ou le contenu d'une variable dans la console.

- `read` attend une saisie au clavier de la part de l'utilisateur et stocke le résultat dans une variable.

- On peut effectuer des opérations mathématiques sur des nombres à l’aide de la commande `let`.

- Certaines
   variables sont accessibles partout, dans tous les scripts : ce sont les
   variables d'environnement. On peut les lister avec la commande `env`.

- Les paramètres envoyés à notre script (comme `./script -p`) sont transmis dans des variables numérotées : `$1`, `$2`, `$3`… Le nombre de paramètres envoyés est indiqué dans la variable `$#`.
