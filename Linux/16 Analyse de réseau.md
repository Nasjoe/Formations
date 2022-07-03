# Analyser le réseau

Savoir paramétrer un pare-feu est essentiel, que ce soit sur votre PC à la maison ou, à plus forte raison, sur un serveur. Cela vous protège de manière efficace contre les programmes qui voudraient échanger des informations sur le réseau sans votre accord. C'est une mesure de sécurité essentielle qu'il faut connaître et dont aucun administrateur système sérieux ne peut se passer.

### Convertir une IP en nom d'hôte et inversement : `host`

Gérer les noms d'hôte personnalisés : `/etc/hosts`

Sur un réseau local, il peut être pratique d'associer un nom d'hôte à chaque PC pour pouvoir vous y connecter sans avoir à retenir l'IP :

```
192.168.0.5      monpc
```

### `whois` : tout savoir sur un nom de domaine

### `ifconfig` : liste des interfaces réseau
peut être faut il install net-tools avant, sur ubuntu.

- eth0 : cela correspond à la connexion par câble réseau (ce qu'on appelle en général le câble RJ45 – figure suivante). Si votre PC est relié au réseau via un câble, c'est sûrement ce moyen de communication que vous utilisez actuellement. Notez que certains ordinateurs (et notamment les serveurs) ont plusieurs sorties réseau filaires. Dans ce cas, vous devriez voir aussi des interfaceseth1,eth2, etc.
- lo : c'est la boucle locale. Tout le monde devrait avoir cette interface. Elle correspond à une connexion à… vous-mêmes. C'est pour cela qu'on l'appelle la boucle locale : tout ce qui est envoyé par là vous revient automatiquement. Cela peut paraître inutile, mais on a parfois besoin de se connecter à soi-même pour des raisons pratiques.
- wlan0 : il s'agit d'une connexion sans-fil type Wi-Fi. Là encore, bien que ce soit plus rare, si vous avez plusieurs cartes réseau sans fil, vous aurez unwlan1,wlan2, etc.

Possible d'ouvrir ou de fermer une interface avec :
`ifconfig eth0 up/down`

### `netstat` : statistiques sur le réseau

peut afficher beaucoup d'informations. Pour sélectionner celles qui nous intéressent, on a recours à de nombreux paramètres.

``` bash
watch netstat -i # voir en temps réel les entrées sorties.
netstat -uta # Liste toutes les connexions ouvertes.
netstat -lt # liste des connexions en état d'écoute

```

- `-u` : afficher les connexions UDP ;
- `-t` : afficher les connexions TCP ;
- `-a` : afficher toutes les connexions quel que soit leur état.

- ESTABLISHED : la connexion a été établie avec l'ordinateur distant ;
- TIME_WAIT : la connexion attend le traitement de tous les paquets encore sur le réseau avant de commencer la fermeture ;
- CLOSE_WAIT : le serveur distant a arrêté la connexion de lui-même (peut-être parce que vous êtes restés inactifs trop longtemps ?) ;
- CLOSED : la connexion n'est pas utilisée ;
- CLOSING : la fermeture de la connexion est entamée mais toutes les données n'ont pas encore été envoyées ;
- LISTEN : à l'écoute des connexions entrantes.

- `-n` : afficher les ip et les ports plutot que les hostnames.

Très utile, l'option `-l` vous permet de filtrer les connexions à l'état LISTEN et donc de savoir quels ports de serveur sont susceptibles d'être utilisés en ce moment sur votre machine.
