# Presentation

## GUI :

Connection login/user. Multi-user, pourquoi ?

Le dock

Les options

Les applications et le centre de logiciel Ubuntu

Nautilus

## La Console :

Je sais, c'est moche, mais elle est indispensable. Pourquoi ? Parce que on peut TOUT faire avec. Tout. et beaucoup plus vite qu'avec une interface graphique.

Exemple ? Compter le nombre de jpg dans un gros dossier bordelique.

```bash
ls -l | grep jpg | wc -l > nb_jpg.txt
```

L'avantage ? Les commandes n'ont pas bougé et ne bougent pas depuis 
l'époque d'Unix (soit depuis les années 60). Ce sont les mêmes. 
Quelqu'un qui utilisait Unix dans les années 60 est capable de se 
débrouiller avec un Linux d'aujourd'hui.

## ctrl + alt + F2

le TTY -> terminal de 1 à 7.

Console mode graphique : ctrl + alt + t ( t pour terminal )

login @ hostname : ~ $ 

On a l'habitude de donner des noms à nos serveur. Pour les reconnaitre et pour pouvoir en parler. le tilde ~ donne une info sur la ou nous nous trouvons. le $ sur les droits. les commandes simples :

```bash
date
ls
ls -l
ls -l -h
ls -lh
ls --help
ls Musique
```

Auto-completion, history, clear, ctrl + c, ctrl + d, ctrl + r 

https://korben.info/les-raccourcis-clavier-pour-bash-terminal-linux-et-macos.html
