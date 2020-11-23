# Formater des disques

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

udisksctl mount -b /dev/sdXY
