# Introduction aux scripts shell

Imaginez un minilangage de programmation intégré à Linux. Ce n'est pas un langage aussi complet que peuvent l'être le C, le C++ ou le Java par exemple, mais cela permet d'automatiser la plupart de vos tâches : sauvegarde des données, surveillance de la charge de votre machine, etc.

La blague, il existe plusieurs shell :

- sh : Bourne Shell. L'ancêtre de tous les shells.
- bash : Bourne Again Shell. Une amélioration du Bourne Shell, disponible par défaut sous Linux et Mac OS X.
- ksh : Korn Shell. Un shell puissant assez présent sur les Unix propriétaires, mais aussi disponible en version libre, compatible avec bash.
- csh : C Shell. Un shell utilisant une syntaxe proche du langage C.
- tcsh : Tenex C Shell. Amélioration du C Shell.
- zsh : Z Shell. Shell assez récent reprenant les meilleures idées de bash, ksh et tcsh.


## Notre premier script :

La première chose à faire dans un script shell est d'indiquer… quel shell est utilisé.

``` bash
#!/bin/bash
```

Le #! est appelé le sha-bang, ( on écrit aussi shebang ). 
/bin/bash peut être remplacé par /bin/sh si vous souhaitez coder pour sh, /bin/ksh pour ksh, etc.

Bien que non indispensable, cette ligne permet de s'assurer que le script est bien exécuté avec le bon shell.
En l'absence de cette ligne, c'est le shell de l'utilisateur qui sera chargé. Cela pose un problème : si votre script est écrit pour bash et que la personne qui l'exécute utilise ksh, il y a de fortes chances pour que le script ne fonctionne pas correctement !

 pour exécuter un script, il faut que le fichier ait le droit « exécutable ». Le plus simple pour donner ce droit est d'écrire 

``` bash
chmod +x script.sh
./script.sh
```


### Exécution de débogage

Plus tard, vous ferez probablement de gros scripts et risquerez de rencontrer des bugs. Il faut donc dès à présent que vous sachiez comment déboguer un script.

Il faut l'exécuter comme ceci :

`bash -x essai.sh`


### Créer sa propre commande

Actuellement, le script doit être lancé via `./essai.sh` et vous devez être dans le bon répertoire.
Ou alors vous devez taper le chemin en entier, comme `/home/mateo21/scripts/essai.sh`.

Comment font les autres programmes pour pouvoir être exécutés depuis n'importe quel répertoire sans « ./ » devant ?

Ils sont placés dans un des répertoires du PATH. Le PATH est une variable système qui indique où sont les programmes exécutables sur votre ordinateur. Si vous tapez `echo $PATH` vous aurez la liste de ces répertoires « spéciaux ».

Il vous suffit donc de déplacer ou copier votre script dans un de ces répertoires, comme /bin, /usr/bin ou /usr/local/bin (ou encore un autre répertoire du PATH). Notez qu'il faut être root pour pouvoir faire cela.

Une fois que c'est fait, vous pourrez alors taper simplement essai.sh pour exécuter votre programme et ce quel que soit le répertoire dans lequel vous vous trouverez !

En résumé

- Contrairement aux apparences, il existe plusieurs environnements console différents : ce sont les shells. Ce sont eux qui gèrent l'invite de commandes et ses fonctionnalités comme l'historique des commandes, la recherche Ctrl + R, l'autocomplétion des commandes…
- Le shell utilisé par défaut sous Ubuntu est bash, mais il existe aussi ksh, zsh, etc.
- Il est possible d'automatiser une série de commandes. On crée pour cela un fichier contenant la liste des commandes à exécuter, appelé script shell. On dit que l'on fait de la programmation shell.
- En fonction du shell utilisé, on dispose de différents outils pour créer son script shell. Nous utiliserons ici bash, donc notre fichier de script doit commencer par la ligne #!/bin/bash.
- Dans le fichier de script, il suffit d'écrire les commandes à exécuter les unes après les autres, chacune sur une ligne différente.
- Pour exécuter le script (et donc exécuter la liste des commandes qu'il contient) il faut donner les droits d'exécution au fichier (chmod +x script.sh) et lancer l'exécution du script avec la commande ./script.sh.