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


| . | Caractère quelconque |
| ^ | Début de ligne |
| $ | Fin de ligne |
| [] | Un des caractères entre les crochets |
| ? | L'élément précédent est optionnel (peut être présent 0 ou 1 fois) |
| * | L'élément précédent peut être présent 0, 1 ou plusieurs fois |
| + | L'élément précédent doit être présent 1 ou plusieurs fois | 

|
	

Ou

()
	

Groupement d'expressions
```
source :
https://openclassrooms.com/fr/courses/43538-reprenez-le-controle-a-laide-de-linux/40172-extraire-trier-et-filtrer-des-donnees
```