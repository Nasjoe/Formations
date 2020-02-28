## Les conditions

La prise de décision est un élément indispensable dans tout programme. Si 
on ne pouvait pas décider quoi faire, le programme ferait toujours la 
même chose… ce qui serait bien ennuyeux.

Les branchements conditionnels (que nous abrègerons « conditions ») constituent un moyen de dire dans notre script « SI cette variable vaut tant, ALORS fais ceci, SINON fais cela ». 


### if : la condition la plus simple

Le type de condition le plus courant est le`if`, qui signifie « si ».

```bash
#!/bin/bash

nom="Bruno"

if [ $nom = "Bruno" ]
then
        echo "Salut Bruno !"
else
        echo "J'te connais pas, ouste !"
fi
```

exercice : Script qui demande un prenom, ou qui prend un argument et qui affiche un résultat en fonction.
