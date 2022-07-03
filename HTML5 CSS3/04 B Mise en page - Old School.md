# La mise en page, quelques techniques avancées et/ou old school.


### la classe **display**

Elle est capable de transformer n'importe quel élément de votre page d'un type vers un autre.
Nous pouvons par exemple imposer à mes liens (originellement de type inline) d'apparaître sous forme de blocs.

À ce moment-là, les liens vont se positionner les uns en-dessous des autres (comme des blocs normaux) et il devient possible de modifier leurs dimensions !

Voici quelques-unes des principales valeurs que peut prendre la propriété **display** en CSS (il y en a encore d'autres) :

- inline : `<a>,<em>,<span>…` : Éléments d'une ligne. Se placent les uns à côté des autres.
- block  : `<p>,<div>,<section>… ` : Éléments en forme de blocs. Se placent les uns en-dessous des autres et peuvent être redimensionnés.
- inline-block : `<select>,<input>` : Éléments positionnés les uns à côté des autres (comme les inlines) mais qui peuvent être redimensionnés (comme les blocs).
- none : `<head>` : Éléments non affichés.

```
a
{
    display: block;
}
```


### **inline-block** en pratique :

Un exemple :

```HTML
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="style.css" />
        <title>Inline-bloc, l'exemple</title>
    </head>

    <body>
        
        <nav>
            <ul>
                <li><a href="#">Accueil</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Photos</a></li>
            </ul>
        </nav>
        
        <section>
            <aside>
                <h1>Lorem Ipsum</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </aside>
            <article>                
                <h1>Donec quis sagittis tortor</h1>
                <p>Vivamus auctor venenatis vehicula. Etiam pellentesque elit ut orci finibus 					cursus.</p>
            </article>
        </section>
        

        
    </body>
</html>
```

```CSS
nav
{
    display: inline-block;
    width: 150px;
    border: 1px solid black;
}

section
{
    display: inline-block;    
    border: 1px solid blue;
}
```

On remarque maintenant que les balises block se sont mis sur la même ligne.
Pas très joli, mais efficace. Le inline-block nous permet du coup de rajouter des propriétés d'ordinaire réservé aux inline comme : `vertical-align: top;`


### Les positions absolues, fixes et relatives

- absolute : Le positionnement absolu : il nous permet de placer un élément n'importe où sur la page (en haut à gauche, en bas à droite, tout au centre, etc.).
- fixe : Le positionnement fixe : identique au positionnement absolu mais, cette fois, l'élément reste toujours visible, même si on descend plus bas dans la page. C'est un peu le même principe que **background-attachment: fixed;**.
- relative : Le positionnement relatif : permet de décaler l'élément par rapport à sa position normale.

##### absolute 

exemple :

```CSS
nav
{
    width: 150px;
    border: 1px solid black;
    position: absolute;
    right: 0px;
    bottom: 0px;
}

section
{
    border: 1px solid blue;
}
```

Attention, les éléments positionnés en absolus sont placés par dessus le reste des éléments de la page !
Si vous voulez supperposer plusieurs éléments, il peut etre utile de rajouter la propriété **z-index** pour indiquer quel élément doit apparaitre au dessus des autres.

```CSS
nav
{
	background: blue;
    width: 150px;
    border: 1px solid black;
    position: absolute;
    right: 0px;
    bottom: 0px;
    z-index: 10
}

section
{
	background: red;
    border: 1px solid blue;
    position: absolute;
    right: 0px;
    bottom: 0px;
    z-index: 1
}
```


##### relative
Déplace l'élément par rapport à sa position *normale*




exemple :
```CSS
strong
{
   background-color: red; /* Fond rouge */
   color: yellow; /* Texte de couleur jaune */

   position: relative;
   left: 55px;
   top: 10px;
}
```


les blocks peuvent être relatif les uns des autres. C'est a dire que je peux mettre un petit block en position absolu à un autre block, à condition que l’attribut position soit déclaré aussi.

```CSS
section
{
    position: absolute;
	background: red;
    border: 1px solid blue;
}

section nav
{
	background: blue;
    width: 150px;
    border: 1px solid black;
    position: absolute;
    right: 0px;
    bottom: 0px;
    z-index: 1

}
```