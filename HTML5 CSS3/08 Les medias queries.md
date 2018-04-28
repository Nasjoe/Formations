# Le Responsive Design

exemple :
https://mediaqueri.es/

L'idée est de pouvoir changer des règles css en fonction de la taille de l'écran du navigateur.

2 Façons de faire :

- Écrire un fichier css séparé qui est appelé sous condition :
	- `<link rel="stylesheet" media="screen and (max-width: 1280px)" href="petite_resolution.css" />`
	
- Écrire directement dans le fichier css :
 
	```CSS
	@media screen and (max-width: 1280px)
	{
	    /* Rédigez vos propriétés CSS ici */
	}
	```
	
	
### Les règles disponibles :

- color: gestion de la couleur (en bits/pixel).
- height: hauteur de la zone d'affichage (fenêtre).
- width: largeur de la zone d'affichage (fenêtre).
- device-height: hauteur du périphérique.
- device-width: largeur du périphérique.
- orientation: orientation du périphérique (portrait ou paysage).
- media: type d'écran de sortie. Quelques-unes des valeurs possibles :
- screen: écran « classique » ;
	- handheld: périphérique mobile ;
	- print: impression ;
	- tv: télévision ;
	- projection: projecteur ;
	- all: tous les types d'écran.
	

On peut rajouter le préfixemin-oumax-devant la plupart de ces règles. Ainsi,min-widthsignifie « Largeur minimale »,max-height« Hauteur maximale », etc.

Les règles peuvent être combinées à l'aide des mots suivants :

- only: « uniquement » ;
- and: « et » ;
- not: « non ».


exemples :

```CSS
/* Sur les écrans, quand la largeur de la fenêtre fait au maximum 1280px */
@media screen and (max-width: 1280px)

/* Sur tous types d'écran, quand la largeur de la fenêtre est comprise entre 1024px et 1280px */
@media all and (min-width: 1024px) and (max-width: 1280px)

/* Sur les téléviseurs */
@media tv

/* Sur tous types d'écrans orientés verticalement */
@media all and (orientation: portrait)
```


### Le cas des mobiles.

Les navigateur mobiles trichent un peu. ils dézooment l'ensemble de la page pour avoir un aperçu global. Du coup, la largeur de l'écran ne correspond pas forcément a la largeur réelle d'affichage, comme sur un ordinateur standard.
On appelle ça le viewport :


Largeur du viewport par défaut

- Opera Mobile : 850 pixels
- iPhone Safari : 980 pixels
- Android : 800 pixels
- Windows Phone : 1024 pixels

Un iPhone se comporte comme si la fenêtre faisait 980 px de large, tandis qu'un Android se comporte comme si la fenêtre faisait 800 px.

En réalité, peu de téléphone dépassent 480px de large. Pour être sur du coup que notre affichage sera responsive, on peut utiliser `max-device-width: 480px`

Pour forcer le viewport, nous pouvons ajouter ceci sur l'html :
```HTML
<meta name="viewport" content="width=320" />
```

ou

```HTML
<meta name="viewport" content="width=device-width" />
```

La page ne sera pas dézoomée.

TP : Travailler avec les média query.
