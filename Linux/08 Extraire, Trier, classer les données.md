# Extraire, trier et filtrer des données



## grep : filtrer des données

Son rôle est de rechercher un mot dans un fichier et d'afficher les lignes dans lesquelles ce mot a été trouvé.

    grep alias .bashrc
    
    -i : ne pas tenir compte de la casse (majuscules / minuscules)
    -n : connaître les numéros des lignes
    -v : inverser la recherche : ignorer un mot
   
    -r : rechercher dans tous les fichiers et sous-dossiers 
    grep -r "alias" /home/user

### Regex :

| REGEX |   |  |                   |
|--------:|----------------------------|:--------------------:|:------------------|
| . | Caractère quelconque |
| ^ | Début de ligne |
| $ | Fin de ligne |
| [] | Un des caractères entre les crochets |
| ? | L'élément précédent est optionnel (peut être présent 0 ou 1 fois) |
| * | L'élément précédent peut être présent 0, 1 ou plusieurs fois |
| + | L'élément précédent doit être présent 1 ou plusieurs fois | 
| () | Groupement d'expressions |

    grep -E ^Alias .bashrc
    grep -E [Aa]lias .bashrc
    grep -E [0-4] .bashrc
    grep -E [a-zA-Z] .bashrc


## Sort 

Trier les lignes

Créon un fichier avec une liste :
```
François
Marcel
Albert
Jean
Stéphane
patrice
Vincent
jonathan
```

    sort noms.txt 

    --output=FICHIER : écrire le résultat dans un fichier
    -r : trier en ordre inverse
    -R : trier aléatoirement
    -n : trier des nombres


## wc : compter le nombre de lignes

La commandewc signifie word count. 
C'est donc a priori un compteur de mots mais en fait, on lui trouve plusieurs autres utilités : compter le nombre de lignes (très fréquent) et compter le nombre de caractères.

Comme les précédentes, la commande ```wc``` travaille sur un fichier.

```
wc noms.txt 

 8  8 64 noms.txt
```
Ces trois nombres signifient, dans l'ordre :

- le nombre de lignes.
- le nombre de mots.
- le nombre d'octets.


    -l : compter le nombre de lignes
    -w : compter le nombre de mots
    -c : compter le nombre d'octets
    -m : compter le nombre de caractères
    
## Gerer les doublons

    uniq doublons.txt sans_doublons.txt
    -c : compter le nombre d'occurrences
    
## cut : couper une partie du fichier


    cut -c -3 noms.txt # Pour conserver du 1er au 3ème caractère
    cut -c 3- noms.txt  # Pour conserver du 3ème au dernier caractère
    
    cut -d , -f 1 notes.csv
    -d : indique quel est le délimiteur dans le fichier ;
    -f : indique le numéro du ou des champs à couper.
    
    

 
Exercice :
Créer un fichier avec juste le nom des personnes du texte suivant : 
```text
Fabrice,18 / 20,Excellent travail
Mathieu,3 / 20,Nul comme d'hab
Sophie,14 / 20,En nette progression
Mélanie,9 / 20,Allez presque la moyenne !
Corentin,11 / 20,Pas mal mais peut mieux faire
Albert,20 / 20,Toujours parfait
Benoît,5 / 20,En grave chute
```

    
```
source :
https://openclassrooms.com/fr/courses/43538-reprenez-le-controle-a-laide-de-linux/40172-extraire-trier-et-filtrer-des-donnees
```
