# Surveiller l'activité du système

Linux est un système multi-tâches : il est capable de gérer plusieurs programmes tournant en même temps.
Linux est un système multi-utilisateurs : plusieurs personnes peuvent utiliser la même machine en même temps.
L'ordinateur peut se retrouver surchargé à cause d'un programme. Qui a lancé ce programme ? Depuis quand ? Comment arrêter un programme qui ne répond plus ?

## w
    
Est affiché :
- date
- Uptime : La durée de fonctionnement de l'ordinateur.
- load average: 

    La charge est un indice de l'activité de l'ordinateur. Il y a trois valeurs :
    la première correspond à la charge moyenne depuis 1 minute (0,08) ;
    la seconde à la charge moyenne depuis 5 minutes (0,34) ;
    la dernière à la charge moyenne depuis 15 minutes (0,31).
    
La doc nous dit qu'il s'agit du nombre moyen de processus (programmes) en train de tourner et qui réclament l'utilisation du processeur.
Cela veut dire que, depuis une minute, il y a en moyenne 0,33 processus qui réclament le processeur. Votre processeur est donc actif 33 % du temps.
Mais ce nombre dépend du nombre de processeurs de votre ordinateur. Un ordinateur dual core ne sera complètement chargé que lorsque la valeur aura atteint 2. Pour un quad core (4 coeurs de processeur), la valeur maximale avant surcharge sera de 4.

- La liste des connectés (aussi accessible viawho)


## ps & top : lister les processus


    kill : tuer un processus

```Ctrl + C``` ne fonctionne que sur un programme actuellement ouvert dans la console. 
De nombreux programmes tournent pourtant en arrière-plan, et ```Ctrl + C``` n'aura aucun effet sur eux.

C'est là que vous devez utiliser ```kill``` si vous voulez les arrêter 

Pour vous en servir, il faudra auparavant récupérer le ```PID``` du ou des processus que vous voulez tuer. 
Pour cela, deux solutions :

    ps -u $USER | grep firefox
    kill 32678 # Termine 'proprement'
    kill -9 # Termine 'sallement'

Contrairement à ```kill``` , ```killall``` attend le nom du processus à tuer et non sonPID.

    killall firefox
    
    xkill # selectioner la fenettre a kill. Marche que sous serveur X