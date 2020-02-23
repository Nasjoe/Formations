# Javascript & JQuery

JavaScript est un langage de programmation inventé par Brendan Eich en 1995, et jQuery est une bibliothèque JavaScript open-source inventée par John Resig en 2006. Insérer du JavaScript pur (le langage de programmation) dans vos projets web peut changer le comportement de vos pages. Ce langage vient compléter le HTML et le CSS de votre site, qui déterminent le contenu et l'apparence de votre page, en y ajoutant une couche d'interactivité.

- Ajouter, supprimer ou modifier des éléments HTML au sein de votre page.
- Changer les styles des éléments de la page en modifiant le CSS qui leur est associé.
- Animer des éléments de votre page.
- Envoyer et recevoir des données depuis un serveur grâce à AJAX (asynchronous JavaScript and XML, c'est-à-dire JavaScript et XML asynchrones) pour ne plus avoir besoin de recharger vos pages après validation d'un formulaire.
- etc etc...

## Javascript

Un peu de lecture de code :

Javascript :

```JS
var listItems = document.querySelectorAll('li');
var i;
for (i = 0; i < listItems.length; i++) {
    listItems[i].className = 'starred';
};
```

Javascript + JQuery :

```JS
$("li").addClass("starred");
```

Comment tester le javascript ? Avec la console Firefox.
Exemple avec SpaceBear :

```JS
$('body').css('background-color', 'orange');
```

Même si parfois, les navigateurs les rajoute automatiquement (et pas tous), rajoutez TOUJOURS un `;` a la fin de chaque action pour indiquer que Javascript doit passer a la suivante.

### Le DOM (Document Object Model).

Le DOM est le résultat transformé par le navigateur de votre code HTML/CSS. Le DOM ouvre un monde de méthodes qui ne sont pas disponibles dans du HTML brut.

Chaque objet est appelé un noeud, et des scripts comme JavaScript ou jQuery interagissent avec cet ensemble de noeuds -- pas avec le HTML brut lui-même.

Il est représenté par l'inspecteur de code de Firefox/Chrome.


### Les types de données.

- Les nombres ("numbers")
	- les entiers positif ou négatif : -1, 2, 10
	- les décimaux : 0.5 , -0.65, 10.154

- Les chaînes de caractères ("strings")
	- Toujours délimités par des guillemets, (quote "", single quote '', accent grave `` )
	- "Hello World !"
	

- Les booléns ("booleans").
	+ Uniquement deux valeurs possible. true ou false. Parfois 0 ou 1
	

- Les tableaux ("arrays")
	+ var Y = ['chien', 'chat', 0.1, true, 10]
	+ Pour accéder à un élément, on compte depuis 0
	+ Y[0] == 'chien'
	+ Y[3] == true
	

### Les opérateurs

- "="
	+ Permet d'affecter une valeur à un élément.
	+ y[0] = "lapin"
	

- "+"
	+ Permet de combiner plusieurs éléments de même type
	+ var x = "Hello" + " " + "World" + " " + "!"
	+ var n = 10 + 5
	

### Les conditions

- `if`, `else`

- `>` , `<`, `>=`, `<=`, `!=`, `==`

- `&&` , `||`, `!`

```JS
if (x < 10 && y > 1) is true {...}
```
https://www.w3schools.com/js/js_comparisons.asp

```JS
if (Y[0] == "ours") {
	console.log("la première valeur est bien ours")
} else {
	console.log("la première valeur n'est pas ours, c'est : "+Y[0]) 
}
	
```

### Les fonctions

On enregistre un bout de code dans une fonction pour pouvoir l'utiliser à volonté plus tard.

```JS
function saluer() {
    alert('Bonjour !');
}


saluer();
```

ou encore, avec un argument :

```JS
var prenom = "Hippolyte"
function saluer(arg) {
    alert('Bonjour ' + arg + " !");
}


saluer(prenom);
saluer('Diogène');
```


## JQuery

Comme n'importe quel script ou feuille de style, nous devons déclarer dans le fichier HTML afin que le navigateur puisse l’interpréter.

- Format dev
- Format minifié
- Avec un CDN (Content Delivery Network)
- Depuis le dossier local


### Le sélecteur JQuery

Pour travailler sur un élément du DOM, il faut d'abord le 'transformer' en objet JQuery.
Pour cela, on utilise le selecteur.

On peut sélectionner par :

- type d'élément : h1, h2, p, img, etc. -> entre guillemet `$('p')`
- classe : .inputDuo, .icone, etc. -> avec un point devant `$(.inputDuo)`
- ID : #menu_fixe, #nav, etc. -> sans guillemet `$(menu_fixe)`



On peut aussi appliquer les relations parent / enfant / jumeau :

Parent :

```JS
$("ol li")
```

```HTML
<ol>
    <li>Premier élément</li> <!-- sélectionné -->
    <li>Second élément</li> <!-- sélectionné -->
    <ul>
        <li>Élément sans ordre</li> <!-- sélectionné -->
    </ul>
</ol>
```

Parent strict :

```JS
$("ol > li")
```

```HTML
<ol>
    <li>Premier élément</li> <!-- sélectionné -->
    <li>Second élément</li> <!-- sélectionné -->
    <ul>
        <li>Élément sans ordre</li>
    </ul>
</ol>
```

Jumeaux :

```JS
$("li#premier ~ li")
```

```HTML
<ul>
    <li id="premier">Un</li>
    <li id="deuxième">Deux</li> <!-- sélectionné -->
    <li id="troisième">Trois</li> <!-- sélectionné -->
</ul>
```

Jumeaux strict :

```JS
$("li#premier + li")
```

```HTML
<ul>
    <li id="premier">Un</li>
    <li id="deuxième">Deux</li> <!-- sélectionné -->
    <li id="troisième">Trois</li>
</ul>
```

On peut aussi sélectionner avec des filtres :

Premier :

```JS
$("p:first")
```

```HTML
<p>Premier texte</p> <!-- sélectionné -->
<p>Deuxième texte</p>
<p>Troisième texte</p>
```

Dernier :

```JS
$("p:last")
```

```HTML
<p>Premier texte</p> 
<p>Deuxième texte</p>
<p>Troisième texte</p> <!-- sélectionné -->
```

Ordre :

```JS
$("li:eq(1)")
```

```HTML
<p>Premier texte</p> 
<p>Deuxième texte</p> <!-- sélectionné -->
<p>Troisième texte</p> 
```

plus grand que :

```JS
$("li:gt(0)")
```

```HTML
<p>Premier texte</p> 
<p>Deuxième texte</p> <!-- sélectionné -->
<p>Troisième texte</p> <!-- sélectionné -->
```

plus petit que :

```JS
$("li:lt(2)")
```

```HTML
<p>Premier texte</p> <!-- sélectionné -->
<p>Deuxième texte</p> <!-- sélectionné -->
<p>Troisième texte</p> 
```

différent que :

```JS
 $("li:not('.legume')")
```

```HTML
<ul id="courses">
    <li class="legume">Aubergine</li>
    <li class="legume">Carotte</li>
    <li class="fruit">Pomme</li> <!-- sélectionné -->
</ul>
```

Remarquons ici les guillemets différents pour '.legume'

et encore plein d'autre :

- `:hidden` : sélectionne les éléments cachés (les éléments dont la valeur CSS display est none, qui sont detype="hidden", ont une hauteur et une largeur nulles, ou ont un ancêtre lui-même invisible)
- `:visible` : sélectionne les éléments visibles
- `:contains("texte")` : éléments qui contiennent le texte spécifié
- `:has("élément")` : éléments qui contiennent l'élément spécifié
- `[attribut]` : éléments qui ont l'attribut spécifié, par exemple `$("[align]")`
- `[attribut="valeur"]` : éléments qui ont l'attribut et la valeur spécifiés, par exemple `$("[align=center]")`
- `[attribut!="valeur"]` : Les éléments qui n'ont pas l'attribut et la valeur spécifiés, par exemple `$("[align!=center]")`

Et aussi, pour les formulaires :

- `:input` : sélectionne les éléments input
- `:password` : sélectionne les zones de mot de passe
- `:text` : sélectionne les zones de texte
- `:checkbox` : sélectionne les cases à cocher
- `:radio` : sélectionne les boutons d'option
- `:submit` : sélectionne les boutons de validation

Par exemple, `$(":checkbox")` est la même chose que `$( "[type=checkbox]" )`

### naviguer dans les noeuds du DOM :

- .find() : trouve un/des élément(s) correspondant au paramètre dans la sélection actuelle
- .parent() : accède au parent direct d'un/des élément(s) ou à ses parents si on utilise .parents()
- .children() : accède aux enfants de(s) élément(s)

exemple :
`$('nav li').children('a').text()`


### Les méthodes JQuery

Après avoir sélectionné nos éléments, nous allons les modifier avec les méthodes JQuery.

La syntaxe est toujours la même :

1. Sélection d'un élément converti en un objet jQuery avec $()
2. Point
3. Nom de la méthode
4. Parenthèses, vides ou contenant des arguments et/ou paramètres

Les paramètres peuvent être un nom de couleur, une durée pour un effet, du texte, et bien d'autres choses encore. Cela dépend de la méthode. Si vous n'en avez pas besoin, laissez les parenthèses vides.

#### Les effets

- .show() : affiche le(s) élément(s) sélectionné(s).
- .hide() : masque le(s) élément(s) sélectionné(s).
- .toggle() : affiche ou masque le(s) élément(s) sélectionné(s) en fonction de son/leur état actuel.
- .fadeIn() : fait apparaître en fondu le(s) élément(s) sélectionné(s).
- .fadeOut() : fait disparaître en fondu le(s) élément(s) sélectionné(s).
- .fadeTo() : amène progressivement le(s) élément(s) sélectionné(s) à une opacité donnée.
- .slideUp() : masque le(s) élément(s) sélectionné(s) avec un défilement vers le haut.
- .slideDown() : masque le(s) élément(s) sélectionné(s) avec un défilement vers le bas.
- .slideToggle() : affiche ou masque le(s) élément(s)
sélectionné(s) avec un défilement en fonction de son/leur état
actuel.

Pour chaque élément ci-dessus, vous avez la possibilité de transmettre plusieurs paramètres optionnels. Très souvent, ce sera la durée de l'effet en millisecondes. Par exemple, .fadeIn(1000)  fera apparaître l'élément en fondu sur une durée de 1000 millisecondes (1 seconde). On peut aussi envoyer les chaînes 'fast'  ou  'slow' à la place d'un nombre.'slow' représente une durée de 600 millisecondes, et  'fast' représente une durée de 200 millisecondes.

Si vous n'envoyez aucun paramètre, la durée de l'effet sera de 400 millisecondes.

#### Manipulation du contenu

Grâce aux méthodes jQuery dédiées au contenu, il est possible de changer le texte, les éléments et les attributs d'une page. Cela peut être utile lorsqu'on souhaite que le contenu change au clic sur un bouton, quand l'utilisateur effectue une action donnée, si quelque chose se produit sur la page, etc.

- .html() : remplace le contenu HTML de la page
- .text() : remplace le texte de la page
- .replaceWith() : remplace le(s) élément(s) sélectionné(s) entièrement, pas juste le texte ou le HTML à l'intérieur
- .remove() : supprime les éléments de la page
- .before() : insère du contenu avant le(s) élément(s) sélectionné(s)
- .after() : insère du contenu après le(s) élément(s) sélectionné(s)
- .prepend() : insère du contenu à l'intérieur du/des élément(s) sélectionné(s) (après la balise HTML ouvrante)
- .append() : insère du contenu à l'intérieur du/des élément(s) sélectionné(s) (avant la balise HTML fermante)
- .attr() : définit un attribut et sa valeur ou simplement récupère sa valeur
- .removeAttr() : supprime un attribut
- .addClass() : ajoute une nouvelle classe à/aux élément(s) sélectionné(s) (sans remplacer sa classe actuelle)
- .removeClass() : supprime une classe du/des élément(s) sélectionné(s)
- .css() : Récupère ou définit les propriétés CSS d'un élément, même plusieurs propriétés à la fois.


#### Taille et position

- .height() : hauteur d'un cadre sans les marges intérieures, extérieurs ni les bords
- .width (): largeur d'un cadre sans les marges intérieures, extérieurs ni les bords

Si vous voulez vraiment pousser à fond votre utilisation des dimensions et du redimensionnement des éléments, il existe aussi des méthodes jQuery qui prennent en compte les bords, les marges intérieures et extérieures, ensemble ou séparément.

- .innerHeight() : hauteur en comptant les marges intérieures
- .innerWidth() : largeur en comptant les marges intérieures
- .outerHeight() : hauteur en comptant les marges intérieures et les bords
- .outerWidth() : largeur en comptant les marges intérieures et les bords
- .outerHeight(true) : même méthode que ci-dessus, mais en envoyant le paramètre true, vous incluez également les marges extérieures.
- .outerWidth(true) : même méthode que ci-dessus, mais en envoyant le paramètre true, vous incluez également les marges extérieures.

Le positionnement des éléments peut être géré grâce à deux méthodes :

- .offset() : définit les coordonnées d'un élément relativement au coin en haut à gauche de l'objet document
- .position() : définit les coordonnées d'un élément relativement à son parent direct, ce qui peut être utile pour positionner des éléments au sein du même élément DOM. Mais vous utiliserez probablement .offset  plus souvent.


### Les événements JQuery

Le vif du sujet : Faire bouger les choses en fonction des actions des utilisateurs. Un clic ? Un mouvement de la souris ? Une attente un peu longue ? hop, un truc va se passer.
en anglais : event listener (un écouteur d'événements)

#### la méthode `.on()`


- .on('click', function() { … }

```JS
$(miniMenu).on( 'click', function () {
	$(menuDeroulant).toggle(); 
});
```


- .on('scroll', function() { … }

- .on('mouseenter', function() { … }
- .on('mouseleave', function() { … }

```JS
$( selector ).mouseenter( handlerIn ).mouseleave( handlerOut );
```

- .on('hover', function() { … }

```JS
`$( selector ).hover( handlerIn, handlerOut )`
```

.on('keydown', function() { … }
.on('keyup', function() { … }
.on('keypress', function() { … }

.on('focus', function() { … }
.on('blur', function() { … } ( lors l'input perd le focus )

.on('resize', function() { … } ( lorsque la fenêtre change de taille )


### L'objet `event`

parfois, nous avons besoin de plus d'information sur l'action de l'utilisateur, comme par exemple le moment ou il a cliqué, l'élément parent, ou l'adresse en cours. On peut récupérer et jouer avec ces data en passant un argument event à la fonction :

exemple :

```JS
$('p').on('click', function(event) {
	
	var date = new Date(event.timeStamp);
  
    $p.text("Vous avez cliqué à : " + date)
    
    console.log(event)
});
```

### L'objet `this`

Très utilisé pour identifier l'objet en cours.

exemple : https://codepen.io/eclairereese/pen/qZxvPz



### TP : Ajoutez des effets JS sur SpaceBear !

- Faire en sorte que le menu pour les petites résolutions s'affiche lorsqu'on clique dessus.
- Et qu'il disparaisse lorsqu'on re-clique dessus ou qu'on clique sur un lien.
- Changer le fond du lien sur le menu lorsqu'on le survole avec la souris
- Changer le fond du lien sur le menu lorsque l'article correspondant est visible
	+ indice : 
		- `var positionUser = $(window).scrollTop();`

