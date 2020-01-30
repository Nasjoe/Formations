# Héritage Simple


L’héritage est un moyen de factoriser du code, c’est à dire que si on a le même code à deux endroits, l’héritage permet de centraliser ce code à un seul endroit. Ce n’est pas le seul moyen de faire ça. On peut très bien factoriser du code uniquement avec des fonctions. Néanmoins l’héritage a des caractéristiques qui rendent la factorisation très efficace.



```python
class RepetitionTexte1:


    texte = ("Alias earum atque repellat.",
            "Sit corrupti quo maxime non eum aut.",
            "Commodi est qui corrupti.",
            "Velit non quas natus ut ullam incidunt sed aliquid.",
            "Magnam non aut ut doloremque provident eligendi voluptatem.")


    def repeter(self, nombre_de_fois=1):

        for x in range(nombre_de_fois):
            for ligne in self.texte:
                print (ligne)


class RepetitionTexte2:


    texte = ("Libero perferendis est animi at aut.",
            "Eos quia eaque enim inventore magni sit cumque.",
            "Commodi est qui corrupti.",
            "Consequatur reprehenderit sunt nemo nisi et.",
            "Earum voluptas est qui nostrum ipsam rerum.")


    def repeter(self, nombre_de_fois=1):

        for x in range(nombre_de_fois):
            for ligne in self.texte:
                print (ligne)


```

Ici la méthode prier() est dupliquée. Or, c’est exactement la même. Il n’y a pas de raison de l’écrire deux fois. Nous allons utiliser l’héritage pour centraliser ce code 


```python
class Revision:
    def repeter(self, nombre_de_fois=1):

        for x in range(nombre_de_fois):
            for ligne in self.texte:
                print (ligne)


class Texte1(Revision):

    texte = ("Alias earum atque repellat.",
            "Sit corrupti quo maxime non eum aut.",
            "Commodi est qui corrupti.",
            "Velit non quas natus ut ullam incidunt sed aliquid.",
            "Magnam non aut ut doloremque provident eligendi voluptatem.")



class Texte2(Revision):

    texte = ("Libero perferendis est animi at aut.",
            "Eos quia eaque enim inventore magni sit cumque.",
            "Commodi est qui corrupti.",
            "Consequatur reprehenderit sunt nemo nisi et.",
            "Earum voluptas est qui nostrum ipsam rerum.")


```

Ici, les classes Texte héritent de la classe Revision. On dit qu’elles sont les enfants (ou filles) de Revision. Ou que Revision est la classe parente de Texte.

Cela marche pour toutes les méthodes, même celles appelées automatiquement. C’est particulièrement utile avec la méthode __init__:


```python
class Revision():

    def __init__(self, crier=False):
        self.crier = crier


    def repeter(self, nombre_de_fois=1):

        for x in range(nombre_de_fois):
            for ligne in self.texte:
                if self.crier:
                    print (ligne.upper())
                else :
                    print (ligne)
```

On rajoute ici un attribut, et il se retrouve dans la classe enfant (si vous êtes dans un shell, n’oubliez pas de réécrire aussi les classe Texte à chaque fois, même si elle ne change pas) :


```python
t = Texte1(crier=True)
t.repeter()
```


# OVERRIDING

```python
class Parent(object):

    def truc(self):
        print 'foo'

class Enfant1(Parent): 
    pass # pas d'overriding

class Enfant2(Parent):

    def truc(self):
        print 'bar' # overriding !


>>> Enfant1().truc()
foo
>>> Enfant2().truc()
bar
```

Enfant1 a tout le code du parent qui est copié. Enfant2 aussi, mais il réécrit la méthode, donc sa version de la méthode écrase celle du parent.

En pratique, avec notre exemple :

```python
class Revision():

    def __init__(self, crier=False):
        self.crier = crier


    def repeter(self, nombre_de_fois=1):

        for x in range(nombre_de_fois):
            for ligne in self.texte:
                if self.crier:
                    print (ligne.upper())
                else :
                    print (ligne)

class Texte1(Revision):

    texte = ("Alias earum atque repellat.",
            "Sit corrupti quo maxime non eum aut.",
            "Commodi est qui corrupti.",
            "Velit non quas natus ut ullam incidunt sed aliquid.",
            "Magnam non aut ut doloremque provident eligendi voluptatem.")



class Texte2(Revision):

    vo = ("Libero perferendis est animi at aut.",
            "Eos quia eaque enim inventore magni sit cumque.",
            "Commodi est qui corrupti.",
            "Consequatur reprehenderit sunt nemo nisi et.",
            "Earum voluptas est qui nostrum ipsam rerum.")

    vf = ("On sait depuis longtemps que travailler avec du texte lisible",
            "et contenant du sens est source de distractions", 
            "et empêche de se concentrer sur la mise en page elle-même")

    def repeter(self, nombre_de_fois=1, version='vo'):

        for x in range(nombre_de_fois):
            for ligne in getattr(self, version, 'vo'):
                if self.crier:
                    print (ligne.upper())
                else :
                    print (ligne)
```

Ici la classe Texte2 hérite de la classe Revision. Deux méthodes sont copiées de Revision vers Texte2 : __init__ et repeter().

__init__ ne change pas. Donc Texte2 a toujours le __init__ de Revision. Par contre, on a overridé repeter() dans Texte2, qui est maintenant un code personnalisé.

Ceci nous permet donc de bénéficier d’une partie du code en commun (__init__), et de choisir un comportement différent pour d’autres bout du code (repeter()).


#SuperPython

Bon, et quoi qu'on fait si c'est une enoooooooooooorme méthode avec beaucoup trop de truc et qu'on veut pas la ré-écrire en entier ? 


```python
class Voiture(object):
 
    def calculer_location(self, heures, tarif):
 
        return heures * tarif
 
 
class VoitureDeLuxe(Voiture):
 
    def calculer_location(self, heures, tarif, supplement=0):
 
        tarif =  heures * tarif
 
        return tarif + (tarif * supplement / 100)

```

Bon, la c'est facile. Mais c'est pour l'exemple. Imaginez une methode de la mort. avec des propertry et tout plein de décorateur. Okay, vous l'avez ? ben on peut faire ça :

```python
class Voiture(object):
 
    def calculer_location(self, heures, tarif):
 
        return heures * tarif
 
 
class VoitureDeLuxe(Voiture):
 
    def calculer_location(self, heures, tarif, supplement=0):
    
        # ceci est une manière compliquée de faire Voiture.calculer_location
        # et de récupérer le résultat
        tarif =  super(VoitureeLuxe, self).calculer_location(heures, tarif)
    
        return tarif + (tarif * supplement / 100)

```

C’est exactement la même chose que plus haut. Sauf qu’au lieu de copier / coller le code du parent, on l’appelle directement.

Je résume :

* on hérite du parent, et de son code
* on override son code, car on veut un comportement différent
* mais on veut quand même une partie du comportement du parent
* donc dans la méthode de l’enfant, on appelle la méthode du parent

Je réformule : quand vous overridez la méthode du parent dans l’enfant, celle du parent ne disparait pas. Elle est remplacée uniquement dans l’enfant. Et vous pouvez toujours vous servir de la version du parent en utilisant super(ClassEncours, self).nom_de_method(arguments) si vous en avez besoin.



# MOULTI Heritage.

En dev', et plus particulièrement en Python, une classe fille peut avoir plusieurs classes mères sans que ça choque personne.

Faisons un jeux :

```python
class Arme(object):

    def __init__(self, nom, degat):

        self.nom = nom
        self.degat = degat

    def attaque(self, cible): # on retire les degâts de l'épee des points de vie
        cible.vie -= self.degat


class Protection(object):

    def __init__(self, nom, armure):

        self.nom = nom
        self.armure = armure

    def defend(self, degat): # on diminue les degâts, voire on les annule

        degat = degat - self.armure
        if degat < 0:
            return 0

        return degat
```

>>> epee = Arme('Epée Mana', degat=999)
>>> casque = Protection('Casque de Balduran', armure=1)

C’est simpliste, mais vous voyez le tableau. Maintenant un humhum de client arrive et vous sort une idée trop cool : il faudrait ajouter un barbare dans le jeu. Qui tape aussi avec son bouclier, parce que la concurrence le fait et qu’ils veulent pas se faire mettre un vent par Blizzard.

Enfer et Rutabaga ! Comment allons nous nous sortir de cette situation ?

Il y a moult manières de faire, mais l’une d’elle est d’utiliser l’héritage multiple, c’est-à-dire de créer une classe qui hérite des deux classes en même temps.

```python
class ProtectionOffensive(Arme, Protection):
 
    def __init__(self, nom, degat, armure):
 
        Arme.__init__(self, nom, degat) # appelle le __init__ de arme
        Protection.__init__(self, nom, armure) # appelle le __init de protection
 
        # comme on a appelé les deux __init__, on va avoir les attributs
        # settés dans les deux __init__ attachés à cette classe
```

Ne cherchez pas compliqué, ça fait exactement ce que ça à l’air de faire : “copier” (oui bon, entre guillemets) le code de chaque parent dans l’enfant.

Néanmoins vous avez vu qu’il y a quelques subtilités, notamment la partie __init__.

Posez-vous deux minutes. Respirez. Concentrez-vous. Prêt ?

Les deux classes parentes ont une méthode __init__, mais Python ne peut en “copier” qu’une seule dans l’enfant. Il copie donc la première qu’il trouve. Il va prendre la liste des parents (ici: Arme, Protection), et la lire de gauche à droite. Il va regarder chaque parent, et si la méthode existe, il va la “copier” dans l’enfant.

Si il retrouve une méthode de même nom dans un des parents suivants, il l’ignore. (Je dis un DES parents suivants car vous pouvez avoir 10 parents si vous voulez).

Donc dans notre exemple, si je fais :

```python
class ProtectionOffensive(Arme, Protection):
    pass
```

ProtectionOffensive n’aura que la méthode __init__ de Arme. Or ce n’est pas ce qu’on veut. On va donc overrider la méthode __init__, et dedans appeler la méthode __init__ de Arme ET celle de Protection.

Cette syntaxe : Classe.methode(self, args...) que l’on retrouve dans Arme.__init__(self, nom, degat) est juste un moyen d’appeler spécifiquement la méthode du parent.

Dans la partie précédente, je vous ai montré qu’on pouvait faire cela avec super(). Or super() vous retournera la première méthode du premier parent qu’elle trouve : c’est le but de super(), de faire ça automatiquement sans se soucier de savoir qui est le premier parent à avoir une méthode du bon nom.

C’est utile car parfois c’est le parent du parent du parent qui a la méthode qu’on veut appeler. On ne connaît pas forcément son nom, ou alors on ne veut pas l’écrire en dur. Mais dans notre cas, on veut spécifiquement une méthode d’un parent en particulier, il faut donc l’écrire à la main.

D’une manière générale :

    Utilisez super() quand vous faites de l’héritage simple où que vous voulez juste appeler la méthode du premier parent venu sans vous soucier de son nom (car il peut être très haut dans la chaîne d’héritage).
    Utilisez Classe.methode(self, args...) quand vous voulez spécifiquement appeler la méthode d’un parent en particulier.

Faites attention !

Le self n’est pas au même endroit dans super(ClassCourante, self).methode(args...) et ClasseParente.methode(self, args...). Et dans le premier cas, on passe la classe courante (que super() va analyser pour trouver les parents automatiquement), dans le cas suivant, on écrit le nom de la classe parente en dur.

Faites quelques tests avec des scripts bidons pour bien comprendre comment ça marche. Faites ça avec des classes toutes simples. Sinon le jour où vous aurez une classe compliquée, vous allez vous embrouiller.