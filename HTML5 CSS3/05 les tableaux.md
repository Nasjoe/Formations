# Les Tableaux

### Un tableau simple :

```HTML
<table>
   <tr>
       <td>Carmen</td>
       <td>33 ans</td>
       <td>Espagne</td>
   </tr>
   <tr>
       <td>Michelle</td>
       <td>26 ans</td>
       <td>États-Unis</td>
   </tr>
</table>
```

```CSS
table
{
    border-collapse: collapse; /* Les bordures du tableau seront collées */
}
td
{
    border: 1px solid black;
}
```


### Un tableau structuré :

Un peu de lecture de code :

```HTML
<table>
   <caption>Passagers du vol 377</caption>

   <thead> <!-- En-tête du tableau -->
       <tr>
           <th>Nom</th>
           <th>Âge</th>
           <th>Pays</th>
       </tr>
   </thead>

   <tfoot> <!-- Pied de tableau -->
       <tr>
           <th>Nom</th>
           <th>Âge</th>
           <th>Pays</th>
       </tr>
   </tfoot>

   <tbody> <!-- Corps du tableau -->
       <tr>
           <td>Carmen</td>
           <td>33 ans</td>
           <td>Espagne</td>
       </tr>
       <tr>
           <td>Michelle</td>
           <td>26 ans</td>
           <td>États-Unis</td>
       </tr>
       <tr>
           <td>François</td>
           <td>43 ans</td>
           <td rowspan="2">France</td>
       </tr>
       <tr>
           <td>Martine</td>
           <td>34 ans</td>
       </tr>
       <tr>
           <td>Jonathan</td>
           <td>13 ans</td>
           <td>Australie</td>
       </tr>
       <tr>
           <td>Xu</td>
           <td colspan="2">Inconnu !</td>
       </tr>
   </tbody>
</table>
```

En CSS, `caption-side` peut prendre deux valeurs :

- top: le titre sera placé au-dessus du tableau (par défaut) ;
- bottom: le titre sera placé en dessous du tableau.