# La vidéo et l'audio.


### les formats :

Les codecs pour l'audio :

- MP3 : C'est l'un des plus vieux, mais aussi l'un des plus compatibles. Format compresse.
- AAC : utilisé majoritairement par Apple sur iTunes, c'est un format de bonne qualité.
- OGG : le format Ogg Vorbis est très répandu dans le monde du logiciel libre, notamment sous Linux. 
- WAV / AIF : (format non compressé)

Les codecs pour la vidéo :

- H.264 : l'un des plus puissants et des plus utilisés aujourd'hui… mais il n'est pas 100% gratuit.
- HEVC ou H.265, ou x.265: Récent, tres compressé, mais demande beaucoup de ressource proc pour le decodage.
- Ogg Theora : un codec gratuit et libre de droits, mais moins puissant que H.264.
- WebM : un autre codec gratuit et libre de droits, plus récent. Proposé par Google.
- Dvix	: Format très très compressé, utilisé a l'époque pour faire rentrer un dvd (4GO) dans cd CD-Data (700mo)

Les conteneurs :

- AVI : Piste stéréo, vidéo souvent en Divx.
- MP4 : Format popularisé par Apple. Souvent en h.264 / AAC. Stéréo
- MKV : Un des plus rependu, libre, peut contenir des sous titres, multi-langue. Souvent en H264 ou HEVC.


### En pratique :

```HTML
<audio src="hype_home.mp3" controls>Veuillez mettre à jour votre navigateur !</audio>
```

ou 

```HTML
<audio controls>
    <source src="hype_home.mp3">
    <source src="hype_home.ogg">
</audio>
```

Nous pouvons utiliser les propriétés suivantes :

- controls: pour ajouter les boutons « Lecture », « Pause » et la barre de défilement.
- width: pour modifier la largeur de l'outil de lecture audio.
- loop: la musique sera jouée en boucle.
- autoplay: la musique sera jouée dès le chargement de la page.
- preload: indique si la musique peut être préchargée dès le chargement de la page ou non. Cet attribut peut prendre les valeurs :
    - auto(par défaut) : le navigateur décide s'il doit précharger toute la musique, uniquement les métadonnées ou rien du tout.
    - metadata: charge uniquement les métadonnées (durée, etc.).
    - none: pas de préchargement. Utile si vous ne voulez pas gaspiller de bande passante sur votre site.
    
Les navigateurs mobiles ne préchargent jamais la musique pour économiser la bande passante.


Pour la vidéo :

```HTML
<video controls poster="sintel.jpg" width="600">
    <source src="sintel.mp4">
    <source src="sintel.webm">
    <source src="sintel.ogv">
</video>
```

Même propriétés possible que l'audio, auquel on rajoute : 

- poster: image à afficher à la place de la vidéo tant que celle-ci n'est pas lancée. 

Les proportions de la vidéo sont toujours conservées. Si vous définissez une largeur et une hauteur, le navigateur fera en sorte de ne pas dépasser les dimensions indiquées mais il conservera les proportions.