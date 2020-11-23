# Système de Fichiers


Le terme système de fichiers (abrégé « FS » pour File System1, parfois filesystem en anglais) désigne de façon ambigüe :

- soit l'organisation hiérarchique des fichiers au sein d'un système d'exploitation 
(on parle par exemple du file system d'une machine unix organisé à partir de sa racine (/) )
- soit l'organisation des fichiers au sein d'un volume physique ou logique, qui peut être de différents types 
(par exemple NTFS, FAT, FAT32, ext2fs, ext3fs, ext4fs, zfs, btrfs, etc.), et qui a également une racine mais peut en avoir plusieurs.

## MBR

Le master boot record ou MBR (parfois aussi appelé zone amorce ou enregistrement d'amorçage maître1) est le nom donné au premier secteur adressable d'un disque dur (cylindre 0, tête 0 et secteur 1, ou secteur 0 en adressage logique) dans le cadre d'un partitionnement Intel. 

Sa taille est de 512 octets. Le MBR contient la table des partitions (les quatre partitions primaires) du disque dur. 
Il contient également une routine d'amorçage dont le but est de charger le système d'exploitation, ou le chargeur d'amorçage (boot loader) s'il existe, présent sur la partition active. 
Sous Linux, l'utilitaire Boot-Repair permet de restaurer le MBR.

Sous UNIX et Linux, la commande dd permet de copier n'importe quelle portion d'un fichier. On peut donc l'utiliser pour sauvegarder le MBR d'un disque, ou pour le restaurer. Celui-ci se trouve sur les 512 premiers octets du disque.

Cette opération est risquée, si l'utilisateur se trompe de disque à copier ou a restaurer. Par exemple, restaurer le MBR d'un disque dur sur un autre disque, remplacera la table des partitions du second disque par celle du premier. Il y a de fortes chances que votre second disque soit alors illisible. La seule exception à cette règle concerne le cas où les deux disques durs sont les mêmes ainsi que leur partitionnement (cas fréquent dans un parc de machines en entreprise).

Dans l'exemple qui suit, on sauve le MBR du disque sda dans un fichier nommé boot.mbr à l'aide de la commande dd :

    dd if=/dev/sda of=boot.mbr bs=512 count=1

On le restaure de cette manière (boot.mbr est le fichier qui a été sauvegardé ci-dessus) :

    dd if=boot.mbr of=/dev/sda bs=512 count=1 

### Avenir du MBR
Du fait de ses limitations — il ne gère pas les disques de plus de 2,199 To (en secteurs de 512 octets).
Le système de partitions MBR est remplacé la plupart du temps depuis 2013 par le système GPT.


## GUID Partition Table

Dans le domaine du matériel informatique, une table de partitionnement GUID, en anglais GUID Partition Table (GPT) 
est un standard pour décrire la table de partitionnement d'un disque dur. 

Bien qu'il fasse partie du standard EFI Extensible Firmware Interface (qu'Intel propose en remplacement du PC BIOS), 
il est aussi utilisé sur certains BIOS à cause des limitations de la table de partitionnement du MBR qui limite la taille des partitions à 2,2 To (2 41 octets)1. 

GPT gère les disques durs et partitions jusqu'à 9,4 Zo (9,4 × 1021 octets ou 9,4 trilliards d'octets soit 9,4 × 109 To ou 2 73 octets)1,2. 

## Les differents systèmes :

### Non journalisés :

- ext et ext2 : Extented FS version 2 (Linux, BSD, Windows via un pilote tiers)
- exFAT : Extended File Allocation Table (nouveau système de fichiers proposé par Microsoft pour remplacer la FAT sur les supports amovibles)
- FAT : File Allocation Table (DOS/Windows, Linux, BSD, OS/2, Mac OS X). Se décompose en plusieurs catégories :
    - FAT12 ;
    - FAT16 ;
    - FAT32 ;
    - VFAT ;
    - FATX : système de fichiers pour Xbox.
- HFS : Hierarchical File System (Mac OS, Mac OS X, Linux)

### Journalisés :

Les systèmes de fichiers journalisés enregistrent les modifications dans un journal avant de les effectuer sur les fichiers eux-mêmes. 
Ce mécanisme apporte une plus grande fiabilité, en permettant une récupération des modifications "en cours" en cas d'arrêt intempestif 
(coupure de courant, plantage système, débranchement de disque externe…).

- ext3 : Extented FS version 3 - notamment pour l'ajout de la journalisation (Linux, BSD)
- ext4 : Extented FS version 4 - notamment pour une capacité de 1 exaoctet et les Extents (Linux >=2.6.28)
- HFS+ (Mac OS X, Linux)
- NTFS : New Technology FileSystem (Windows NT/2000/XP/Vista/7/8/10, Linux et Mac OS X (écriture disponible grâce au pilote NTFS-3G))

### à Snapshot

Les systèmes de fichiers à snapshot, ou, en français, instantanés, offrent la possibilité d'enregistrer l'état du système de fichiers à un instant donné.

- APFS : Apple File System (macOS, iOS, tvOS)
- Btrfs : BetterFS (Linux)
- ZFS : Zettabyte FS (Solaris10, OpenSolaris, FreeBSD 7, Mac OS X en lecture seule, Linux via FUSE)

### Réseau (NAS : network-attached system en anglais)

- NFS (tous les UNIX, Linux, Mac OS X, IRIX) (Windows pour la 4)
- SSHFS (Linux via FUSE)
- SMB ou Server Message Block (Windows) (Linux, BSD et Mac OS X via Samba)
- CIFS (Évolution de SMB, géré par Samba ainsi que par Windows 2000 et XP)


# FORMATER 

## Créer les partitions :
    
gdisk - Interactive GUID partition table (GPT) manipulator 
    
    sudo gdisk /dev/sdX

on tape ? pour avoir la liste des commandes.
p : voir les partitions actuels.

Pour effacer et partitionner un disque complètement :
    
    o : Crée une nouvelle table de partition GPT ( attention, ça supprime tout ! )
    n : Crée un nouvelle partition. Par default, ça prend tout l'espace libre
    w : Applique les changement.
    q : quitte sans appliquer les changements.
        
Attention partitionnement ne veut pas dire formatage. On crée les partition, avec gdisk, mais on formate avec mkfs. (cf plus bas ) 

## Avec GParted, en GUI

    sudo apt install gparted
    sudo gparted
    sudo gparted /dev/sdX
    
tuto ici : https://doc.ubuntu-fr.org/gparted
    

## A la console :

Identifiez le nom de la partition à formater (ex. : sda1) grâce à cette commande avancée basée sur lsblk :

    lsblk -o model,name,type,fstype,size,label

Démontez la partition (remplacez XY par la lettre et le chiffre de la partition) :

    umount /dev/sdXY

Formatez la partition avec le système de fichiers désiré et une étiquette parlante (ici : SAMSUNG), exemple :

en FAT32 :

    sudo mkfs.vfat -n SAMSUNG /dev/sdXY

en NTFS :

    sudo mkfs.ntfs -n SAMSUNG /dev/sdXY
    -f, --fast  # Perform a quick format


en ext4 :
    
    attention, ext4 ne semble pas prendre le flag ( -n )
    sudo mkfs.ext4 /dev/sdXY
    
   
Montez la partition :

    sudo mount /dev/sdXY /chemin


## Le fichier fstab (montage automatique)
Source : https://doc.ubuntu-fr.org/mount_fstab

Le fichier /etc/fstab liste les partitions qui seront montées automatiquement au démarrage ou à la connexion du périphérique, avec toujours les mêmes options.
Il est composé de plusieurs lignes décrivant chacune les conditions de montage de chaque partition / système de fichier.

Le fichier /etc/fstab suivant résume une configuration classique : 


```
# /etc/fstab: static file system information.
#
# Use 'blkid' to print the universally unique identifier for a
# device; this may be used with UUID= as a more robust way to name devices
# that works even if disks are added and removed. See fstab(5).
#
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
# / was on /dev/sda7 during installation
UUID=33b870b8-a81e-4203-a4fd-7affa9f412fb    /               ext4    errors=remount-ro 0       1
# /boot was on /dev/sda5 during installation
UUID=c3cc32c0-b4bd-49f6-b23c-35fed37adea5    /boot           ext2    defaults        0       2
# /home was on /dev/sda8 during installation
UUID=c2d386a1-c2f9-4d2f-957a-65a5d9b4c4d7    /home           ext4    defaults        0       2
# swap was on /dev/sda6 during installation
UUID=2c442228-1991-48c7-bad9-a80dfc8267cf    none            swap    sw              0       0
```

- La colonne <file system> indique la partition elle-même. Il y a plusieurs solutions, mais les 2 principales sont :
    - l'UUID (Universal Unique Identifier) de la partition. Celle-ci sera obtenue via un sudo blkid, via gnome-disk, ou via gparted. Un UUID ressemble à cela UUID=2c442228-1991-48c7-bad9-a80dfc8267cf
    - la référence directe à la partition sous la forme /dev/sda2 ou /dev/sdb2 (sd signifie disque dur, la lettre est l'ordre du disque dans le boot, et le N° est celui de la partition. /dev/sdb2 est donc la 2e partition du 2e disque dur). Inconvénient de cette méthode : si vous changez le 1er disque de démarrage dans le boot, la signification de sdb2 (par exemple) changera en même temps. l'UUID est donc un identifiant plus stable et plus sûr.
- La colonne <mount point> indique un répertoire quelconque sur la partition principale, et qui servira de point de montage. Pour la partition principale elle-même, c'est évidemment "/" (la racine). Pour une partition montée additionnelle, on choisit en général (ce n'est pas un emplacement obligatoire) un répertoire /media/xxx (où xxx est le nom que vous choisissez pour la partition de montage). Vous devez créer manuellement cette partition de montage une fois pour toutes par un sudo mkdir /media/xxx. Laissez-la vide, et n'y touchez plus jamais. Elle sert juste d'ancrage au fstab pour son montage.
- La colonne <type> donne le type de système de fichiers de la partition montée. Pour une partition linux, c'est souvent ext4.
- La colonne <option> permet de choisir des options au montage. Sauf si vous êtes un expert, laissez defaults pour une partition ajoutée par vous au montage.
- La colonne <dump> règle les sauvegardes; la valeur classique est 0.
- La colonne <pass> règle la vérification au démarrage. Laissez-y les valeurs par défaut de l'installation. Si vous ajoutez manuellement des partitions, les valeurs de <pass> doivent être:
    - 1 pour la racine (votre partition principale),
    - 2 pour les autres partitions Linux (les partitions "externes" que vous souhaitez monter),
    - 0 pour le swap et les partitions windows (cf. fstab) ⇒ pas de vérification.

exemple :
```
/dev/sdb2 /media/partition-plus ext4 defaults 0 2
```

Qui monte automatiquement la 2e partition du 2e disque dur.
Attention, Préférer les /dev/disk/by-id/

Il ne faut pas oublier de créer "l'ancrage" /media/[NOM DU DISK] par un sudo mkdir /media/[NOM DU DISK]


## TUTO :
Créer une table de partition, créer deux partitions, et les formater : (NTFS et ext4)
Faites des test de lecture écritures.
Montez les en ```sshfs``` sur vos machines.





```
Source & ressources : 
https://fr.wikipedia.org/wiki/Syst%C3%A8me_de_fichiers#Syst%C3%A8mes_de_fichiers_et_syst%C3%A8mes_d'exploitation_associ%C3%A9s_ou_compatibles
https://fr.wikipedia.org/wiki/GUID_Partition_Table#Compatibilit%C3%A9_des_OS_et_GPT
https://fr.wikipedia.org/wiki/Master_boot_record
https://www.malekal.com/ntfs-ext4-comprendre-systemes-de-fichiers/
```


