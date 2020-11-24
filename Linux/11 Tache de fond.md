# Exécuter des programmes en arrière-plan

    & : lancer un processus en arrière-plan
    cp video.avi copie_video.avi &

    nohup : détacher le processus de la console
    nohup cp video.avi copie_video.avi
    
    Ctrl + Z : mettre en pause l'exécution du programme
    
    bg : passer le processus en arrière-plan (background)
    
    jobs : connaître les processus qui tournent en arrière-plan
    
    fg : reprendre un processus au premier plan (foreground)
    fg %2
    
    
## Byobu : Plusieurs ecrans en un !
    
https://www.byobu.org/

    
    
# Exécuter un programme à une heure différée

    at : exécuter une commande plus tard

    $ at 14:17
    warning: commands will be executed using /bin/sh
    at>

On vous demande de taper les commandes que vous voulez exécuter à cette heure-là. ```ctrl +D``` pour sortir.

    $ at 14:17 tomorrow
    $ at 14:17 11/15/10
    $ at now +5 minutes
    
    atq et atrm : lister et supprimer les jobs en attente
    
## crontab : exécuter une commande régulièrement

crontab.guru/

    crontabl -l # Pour lister les crons
    crontab -e # Editer la crontab
    
Pensez à rediriger la sortie vers un fichier de log. Vous savez faire ça, non ?