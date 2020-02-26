# La Compression

![](https://camo.githubusercontent.com/38aef17a066c537ef54a629e770896f6a195f9aa/68747470733a2f2f696d67732e786b63642e636f6d2f636f6d6963732f7461722e706e67)

Vous avez sûrement déjà entendu parler du format zip. C'est le plus connu et le plus répandu… du moins sous Windows. On peut l'utiliser aussi sous Linux, de même que le format rar.

Cependant, on préfèrera utiliser des alternatives libres (et souvent plus puissantes) telles que le gzip et le bzip2. Toutefois, contrairement à zip et rar, le gzip et le bzip2 ne sont capables de compresser qu'un seul fichier à la fois et ne peuvent donc pas créer un « paquetage » de plusieurs fichiers.
Mais rassurez-vous, tout est prévu : on utilise pour cela un outil à part, appelé tar, qui permet d'assembler des fichiers avant de les compresser.

`tar -cvf nom_archive.tar nom_dossier/`

J'utilise trois options :

    -c : signifie créer une archive tar ;

    -v : signifie afficher le détail des opérations ;

    -f : signifie assembler l'archive dans un fichier.


-tf : afficher le contenu de l'archive sans l'extraire

-rvf : ajouter un fichier

-xvf : extraire les fichiers de l'archive


Une fois que l'on a notre fichier, on le compresse avec gzip.

`gzip tutoriels.tar`

Pour décompresser l'archive ensuite, il suffit d'utiliser gunzip :

`gunzip tutoriels.tar.gz`


Archiver et compresser en même temps avec tar

`tar -zcvf tutoriels.tar.gz tutoriels/`

Pour décompresser, c'est pareil, sauf que le -c est remplacé par un -x comme tout à l'heure :

`tar -zxvf tutoriels.tar.gz`


Sinon, il existe aussi 7z qui est tres puissant. Checkez la doc !