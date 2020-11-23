# Système de Fichiers

Source : https://fr.wikipedia.org/wiki/Syst%C3%A8me_de_fichiers#Syst%C3%A8mes_de_fichiers_et_syst%C3%A8mes_d'exploitation_associ%C3%A9s_ou_compatibles

Le terme système de fichiers (abrégé « FS » pour File System1, parfois filesystem en anglais) désigne de façon ambigüe :

- soit l'organisation hiérarchique des fichiers au sein d'un système d'exploitation 
(on parle par exemple du file system d'une machine unix organisé à partir de sa racine (/) )
- soit l'organisation des fichiers au sein d'un volume physique ou logique, qui peut être de différents types 
(par exemple NTFS, FAT, FAT32, ext2fs, ext3fs, ext4fs, zfs, btrfs, etc.), et qui a également une racine mais peut en avoir plusieurs.

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

en ext4 :

    sudo mkfs.ext4 -n SAMSUNG /dev/sdXY

Montez la partition :

    sudo mount /dev/sdXY /chemin
