# Les Formulaires


Les deux méthodes principales pour envoyer des informations depuis le client vers le serveur :

- get : limité a 255 caractères, informations envoyées directement grâce à l'url. 
- post : permet d'envoyer un plus grand nombre d'information au serveur grâce à une enveloppe 'data' collé à la requête


exemple :

```HTLM

<form method="post" action="traitement.php">
    <p>
    
        <label for="pseudo">Votre pseudo :</label>
        
        <input type="text" name="pseudo" id="pseudo" placeholder="Ex : Jean" size="30" maxlength="10" />
        
       <br />
       
       <label for="pass">Votre mot de passe :</label>
       <input type="password" name="pass" id="pass" />
       
       <br />
       
       <label for="commentaire">Pensez-vous ?</label><br />
       <textarea name="commentaire" id="commentaire"></textarea>
       
    </p>
</form>


```

### Les types disponibles :

- `<input type="email" />`
- `<input type="url" />`
- `<input type="tel" />`
- `<input type="number" min="1" max="12" step="1" />`
- `<input type="range" />`(min max et step dispo aussi)
- `<input type="color" />`
- `<input type="search" />`(le navigateur mémorise les anciennes recherches)
- `<input type="checkbox" name="choix" />`

exemple :

```HTML
<form method="post" action="traitement.php">
   <p>
       Cochez les aliments que vous aimez manger :<br />
       <input type="checkbox" name="frites" id="frites" checked="1"/> <label for="frites">Frites</label><br />
       <input type="checkbox" name="steak" id="steak" /> <label for="steak">Steak haché</label><br />
       <input type="checkbox" name="epinards" id="epinards" /> <label for="epinards">Epinards</label><br />
       <input type="checkbox" name="huitres" id="huitres" /> <label for="huitres">Huitres</label>
   </p>
</form>
```

ou avec radio, un seul choix possible : 

```HTML
<form method="post" action="traitement.php">
   <p>
       Veuillez indiquer la tranche d'âge dans laquelle vous vous situez :<br />
       <input type="radio" name="age" value="moins15" id="moins15" /> <label for="moins15">Moins de 15 ans</label><br />
       <input type="radio" name="age" value="medium15-25" id="medium15-25" /> <label for="medium15-25">15-25 ans</label><br />
       <input type="radio" name="age" value="medium25-40" id="medium25-40"  checked="1"/> <label for="medium25-40">25-40 ans</label><br />
       <input type="radio" name="age" value="plus40" id="plus40" /> <label for="plus40">Encore plus vieux que ça ?!</label>
   </p>
</form>
```


Menu déroulant :

```HTML
<form method="post" action="traitement.php">
   <p>
       <label for="pays">Dans quel pays habitez-vous ?</label><br />
       <select name="pays" id="pays">
           <optgroup label="Europe">
               <option value="france">France</option>
               <option value="espagne">Espagne</option>
               <option value="italie">Italie</option>
               <option value="royaume-uni">Royaume-Uni</option>
           </optgroup>
           <optgroup label="Amérique">
               <option value="canada">Canada</option>
               <option value="etats-unis">Etats-Unis</option>
           </optgroup>
           <optgroup label="Asie">
               <option value="chine">Chine</option>
               <option value="japon">Japon</option>
           </optgroup>
       </select>
   </p>
</form>
```


Pour les dates :

- date: pour la date (05/08/1985 par exemple) ;
- time: pour l'heure (13:37 par exemple) ;
- week: pour la semaine ;
- month: pour le mois ;
- datetime: pour la date et l'heure (avec gestion du décalage horaire) ;
- datetime-localpour la date et l'heure (sans gestion du décalage horaire).


### Petits tips :

Vous pouvez placer automatiquement le curseur dans l'un des champs de votre formulaire avec l'attribut `autofocus`. Dès que le visiteur chargera la page, le curseur se placera dans ce champ.

On peut regrouper les champs avec la balise `<fieldset>`

Vous pouvez faire en sorte qu'un champ soit obligatoire en lui donnant l'attribut `required`.

```CSS
:required
{
    background-color: red;
}
```


### Envoyer :

Le bouton d'envoi :

`<input type="submit" value="Envoyer" />`

- type="submit": le principal bouton d'envoi de formulaire. C'est celui que vous utiliserez le plus souvent. Le visiteur sera conduit à la page indiquée dans l'attribut action du formulaire.
- type="reset": remise à zéro du formulaire.
- type="image": équivalent du bouton submit, présenté cette fois sous forme d'image. Rajoutez l'attribut src pour indiquer l'URL de l'image.
- type="button": bouton générique, qui n'aura (par défaut) aucun effet. En général, ce bouton est géré en JavaScript pour exécuter des actions sur la page.