# Première Partie : Comprendre le Web


## 1. Internet ?

- Toile d'araignée géante.
- Protocole TCP/IP (Transmission Control Protocol / Internet Protocol)
- Les liens hypertexte et le ""surf" : Le WEB
- Les e-mails
- Les newsgroups
- Le FTP/SFTP/SSH
- Le Cloud / SaaS ( Logiciel qu'on utilise à travers une interface web )
- Le W3C, organisme qui informe des bonnes pratiques et des normes ISO



## 2. Les différents langages du Web

- Différence entre Clients / Serveurs


#### a. Les langages clients : l'affichage


- HTML
- CSS
- Javascript
- Les Navigateurs, traducteurs de langages

##### Exemple HTML :

```HTML
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Ma page web</title>
    </head>

    <body>
        <p>Bienvenue sur mon site web !</p>
    </body>
</html>
```

##### TP : Créez votre première page HTML en utilisant ce modèle. Rajoutez une balise strong et un paragraphe supplémentaire. Testez votre code.

---

#### b. Les langages serveur : le comportement

- PHP
- Java
- Python
- Ruby
- C#

Aucun langage n'est meilleurs que les autres. Facebook est en PHP, Google est en Python/Java, etc etc... 
Inutile de tous les connaître. Un seul langage serveur suffit généralement. Le tout a l'aide de **Frameworks.**

- PHP : Symfony, Laravel,
- Java : Java EE (ou J2EE)
- Python : Django
- Ruby : Ruby on Rails
- C# : ASP.NET


Le rôle d'un langage serveur est de générer une page web grâce à des variables déterminée.

1. Le client demande la page au serveur
2. Le serveur traite les informations, le contexte et génère la page
3. Le serveur envoie la page sous forme de code HTML, CSS et Javascript
4. Le navigateur du client traite le HTML, le CSS et le JS et l'affiche pour l'utilisateur

**Exemple avec du PHP :**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Page protégée</title>
</head>
<body>

    <?php
    if (!isset($_POST['mot_de_passe']))
    {
    ?>
        <p>Veuillez entrer le mot de passe  :</p>
        <form action="index.php" method="post">
            <p>
                <input type="password" name="mot_de_passe" />
                <input type="submit" value="Valider" />
            </p>
        </form>
    <?php
    }
    else
    {
        if ($_POST['mot_de_passe'] ==  "maison")
        {
    ?>
            <h1>Bravo !</h1>
            <p>Vous avez réussi à afficher la page secrète !</p>
    <?php
        }
        else
        {
            echo '<p>Mot de passe incorrect.<br /><a href="index.php">Réessayer</a></p>';
        }
    }
    ?>  
</body>
</html>
```


**Avec du Python :**


```python
@app.route('/login', methods=['GET', 'POST'])
def check_si_bon_mot_de_passe():
    try:
        if request.method == 'POST':
            result = json.loads(request.data)
        	    
            if result['secret'] == 'motdepassesupersecret' :
                output = "Bienvenue"
                return output
    
            else :
                output = "Hahaha, you didn't say the magic word!"
                return output
                
        else :
            output = "Merci de rentrer votre mot de passe"
            return output
            
    except Exception as e:
        log.error(e)
```


#### c. Database : Les bases de données

Un nouveau langage : Le SQL

- MySQL
- PostgreSQL
- Oracle
- SQlite
- MariaDB

**Exemple SQL** :

```SQL
SELECT id, name, login FROM users ORDER BY id DESC
```

Pour résumer, nous pouvons rajouter une ligne aux étapes précédentes :


1. Le client demande la page au serveur
2. Le serveur traite les informations et le contexte
3. Le serveur va chercher les informations particulière a la demande dans une base de donnée
3. Le serveur envoie la page sous forme de code HTML, CSS et Javascript
4. Le navigateur du client traite le HTML, le CSS et le JS et l'affiche pour l'utilisateur


## 3. Les sites responsives et mobile

Les sites web sont consulté par presque la moitié via des smartphones. Or les écrans ne sont pas du tout de la même taille que celle des écrans d'ordinateur. Les solutions ? Le responsive ou les applications natives.

Exemple :
www.manapanyfestival.com

## 4. Les serveurs

Machines sans écrans, situés généralement dans des datacenter, ou chez des clients pour des applications locales.

Interconnectés entre eux via des cables sous marins, ou des fibres optiques.

Concepts à comprendre :

- Adresse IP
- DNS (Domain Name System)
- Protocoles bas niveau :
- - HTTP/S
- - FTP / SFTP
- - SMTP

Exemple : 
```bash
curl https://google.com --head
```

## 4. Les métiers de développeur-se

Il n'y a pas un seul type de dév', mais une multitude de spécialisation.

- Frontend ou Intégrateur web. HTML/CSS/Javascript
- Backend. PHP/Java/Python
- SysAdmin. Gestion hard et software des serveurs.
- Full-Stack. Un géographe plus qu'un géologue !
- Chef de projet technique, ou QA Manager. Celui qui supporte les demande du client :)

Les compétences de bases d'un dév' modernes :

1. Langage Client HTML5 / CSS3
2. Langage Serveur Python, PHP, Java
3. Apprendre Javascript pour des pages plus complexes
4. Apprendre les commandes et les outils Linux
5. Faire de la veille technologique
6. Pratiquer, pratiquer, pratiquer, pratiquer
7. Aimer ça