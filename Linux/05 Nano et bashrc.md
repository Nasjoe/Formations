# Premiers pas avec Nano

- `Ctrl + G` : afficher l'aide ;

- `Ctrl + K` : couper la ligne de texte (et la mettre dans le presse-papier) ;

- `Ctrl + U` : coller la ligne de texte que vous venez de couper ;

- `Ctrl + C` : afficher à quel endroit du fichier votre curseur est positionné (numéro de ligne…) ;

- `Ctrl + W` : rechercher dans le fichier ;

- `Ctrl + O` : enregistrer le fichier (écrire) ;

- `Ctrl + X` : quitter Nano.

- `Ctrl + V` : Avancer d'une page.

- `Ctrl + Y` : reculer d'une page.

nano -miA salut.txt

- **-m** :
   autorise l'utilisation de la souris sous Nano. En console, oui, oui. 
  Vous pouvez vous en servir pour cliquer avec votre souris sur la zone de
   texte où vous voulez placer votre curseur.

- **-i** :
   indentation automatique. L'alinéa (tabulations) de la ligne précédente 
  sera respecté lorsque vous irez à la ligne. Très utile lorsque vous 
  éditez un fichier de code source.

- **-A** : active le retour intelligent au début de la ligne. Normalement, lorsque vous appuyez sur la touche`Origine`(aussi connue sous le nom de`Home`) située à côté de la touche`Fin`, le curseur se repositionne au tout début de la ligne. Avec cette commande, il se positionnera après les alinéas. Comme`-i`, il s'agit d'une option utile avant tout pour les programmeurs.

# Configurer sa console avec .bashrc

nano .bashrc

alias

Édition du`bashrc`global. Si vous voulez définir des alias ou modifier l'invite de commandes pour tout les user : /etc/bash.bashrc

#### En résumé

- Un
   éditeur de texte est un programme qui ouvre des fichiers texte (un peu 
  comme Bloc-Notes sous Windows). On en a régulièrement besoin sous Linux 
  pour modifier des fichiers de configuration, par exemple.

- Il existe de nombreux éditeurs de texte en console qui peuvent être très complets, comme Vim et Emacs.

- L'éditeur Nano est un des éditeurs en console les plus simples à utiliser ; nous commençons donc par découvrir celui-ci.

- On utilise plusieurs raccourcis clavier dans un éditeur de texte comme Nano.`Ctrl + W`lance une recherche,`Ctrl + O`enregistre le fichier,`Ctrl + X`permet de quitter, etc.

- On peut utiliser Nano pour modifier son fichier de configuration`.bashrc`et personnaliser sa console. On peut notamment s'en servir pour colorer l'invite de commandes et créer des alias.
