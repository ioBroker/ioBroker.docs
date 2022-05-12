---
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/lib/install-ha-rpi.md
title: пароль
hash: /vstRhgCT9bo7qG0EOjpSOU5Tqq3WZU5vac3deOOXtQ=
---
#
##
### Источник
https://www.raspberrypi.org/downloads/raspbian/ https://downloads.raspberrypi.org/raspbian_lite_latest Минимальный образ Raspbian Stretch Lite на основе Debian Stretch Версия: июнь 2018 г. Дата выпуска: 27 июня 2018 г. Версия ядра: 4.14

2018-06-27-raspbian-stretch-lite.img

### Офорт
https://etcher.io/

Создайте файл `ssh` в разделе `boot`.

### Замазка
https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html https://the.earth.li/~sgtatham/putty/latest/w64/putty-64bit-0.70-installer.msi

## Соединять
Вызов пользователя Putty: pi paswoort raspberry raspberrypi в замазке

sudo passwd root sudo nano /etc/ssh/sshd_config Найдите PermitRootLogin и измените его на yes, remove # Вы можете снова отменить вход в систему как root, используя эту команду sudo passwd -l root su

подходящее обновление подходящее обновление

raspi-config

2 Параметры сети: имя хоста, страна Wi-Fi, установленная на de Введите SSID Введите пароль

4 I1 Изменить языковой стандарт de_DE.UTF-8 UTF-8 Пустая полоса для выбора

7 Дополнительные параметры A1 Расширить файловую систему

reboot Добро пожаловать в fdisk (util-linux 2.29.2).
Изменения останутся только в памяти, пока вы не решите их записать.
Будьте осторожны перед использованием команды записи.

Команда (m для справки): Диск /dev/mmcblk0: 14,9 ГБ, 15931539456 байт, 31116288 секторов. Единицы: секторы по 1 * 512 = 512 байт. /optimal): 512 байт / 512 байт Тип метки диска: dos Идентификатор диска: 0x8e9e2675

Устройство Начальный конечный сектор загрузки Размер Идентификатор Тип /dev/mmcblk0p1 8192 96663 88472 43,2M c W95 FAT32 (LBA) /dev/mmcblk0p2 98304 31116287 31017984 14,8G 83 Linux

Команда (m для справки): Номер раздела (1,2, по умолчанию 2): Раздел 2 удален.

Команда (m для справки): Тип раздела p основной (1 основной, 0 расширенных, 3 свободных) e расширенный (контейнер для логических разделов) Выбор (по умолчанию p): Номер раздела (2-4, по умолчанию 2): Первый сектор (2048 -31116287, по умолчанию 2048): последний сектор, +sectors или +size{K,M,G,T,P} (98304-31116287, по умолчанию 31116287): создан новый раздел 2 типа «Linux» и размером 14,8 ГБ. .
Раздел №2 содержит подпись ext4.

Команда (m для справки): Диск /dev/mmcblk0: 14,9 ГБ, 15931539456 байт, 31116288 секторов. Единицы: секторы по 1 * 512 = 512 байт. /optimal): 512 байт / 512 байт Тип метки диска: dos Идентификатор диска: 0x8e9e2675

Устройство Начальный конечный сектор загрузки Размер Идентификатор Тип /dev/mmcblk0p1 8192 96663 88472 43,2M c W95 FAT32 (LBA) /dev/mmcblk0p2 98304 31116287 31017984 14,8G 83 Linux

Команда (m для справки): Таблица разделов была изменена.
Вызов ioctl() для повторного чтения таблицы разделов.
Ошибка повторного чтения таблицы разделов.: Устройство или ресурс занят

Ядро по-прежнему использует старую таблицу. Новая таблица будет использоваться при следующей перезагрузке или после запуска partprobe(8) или kpartx(8).

fdisk -l /dev/mmcblk0

нано /etc/dhcpcd.conf

интерфейс eth0 статический ip_address=10.10.1.1/24

interface wlan0 static ip_address=192.168.179.161/24 static routers=192.168.179.1 static domain_name_servers=192.168.179.10

интерфейс eth0 статический ip_address=10.10.1.2/24

interface wlan0 static ip_address=192.168.179.162/24 static routers=192.168.179.1 static domain_name_servers=192.168.179.10

nano /etc/hosts 192.168.179.161 iob1 192.168.179.162 iob2 10.10.1.1 iob1p 10.10.1.2 iob2p

apt установить policycoreutils-python-utils psmisc libssl-dev

https://www.server-world.info/en/note?os=Debian_9&p=ssh&f=4

https://www.debian.org/devel/passwordlessssh

#######################################
сентос

https://unix.stackexchange.com/questions/370318/how-to-connect-to-wifi-in-centos-7clino-gui yum установить NetworkManager-tui nmtui

localectl set-locale LANG=de_DE.utf8 yum update -y /usr/bin/rootfs-expand

ssh -l корень iob1

timedatectl set-timezone Европа/Берлин

setenforce 0 sed -i.bak "s/SELINUX=enforcing/SELINUX=permissive/g" /etc/selinux/config systemctl mask firewalld.service systemctl stop firewalld.service iptables --flush

# Пароль хакластер
Смена пароля пользователя hacluster.
Новый пароль: введите новый пароль еще раз: passwd: все токены аутентификации успешно обновлены.

[root@iob1 ~]# pcs cluster auth iob1 iob2 Имя пользователя: hacluster Пароль: iob2: Authorized iob1: Authorized [root@iob1 ~]# pcs cluster setup --name iobrokerc iob1 iob2 Уничтожение кластера на узлах: iob1, iob2...
iob2: остановка кластера (кардиостимулятор)...
iob1: Кластер остановки (кардиостимулятор)...
iob2: успешно уничтоженный кластер iob1: успешно уничтоженный кластер

Отправка «pacemaker_remote authkey» на «iob1», «iob2» iob1: успешное распространение файла «pacemaker_remote authkey» iob2: успешное распространение файла «pacemaker_remote authkey» Отправка файлов конфигурации кластера на узлы...
iob1: успешно iob2: успешно

Синхронизация сертификатов pcsd на узлах iob1, iob2...
iob2: успешно iob1: успешно Перезапуск pcsd на узлах для перезагрузки сертификатов...
iob2: успех iob1: успех

[root@iob1 ~]# запуск кластера ПК --all iob1: Запуск кластера...
iob2: запуск кластера...

[root@iob1 ~]# corosync-cfgtool -s Вывод состояния кольца.
ID локального узла 1 ID RING ID 0 id = 192.168.179.54 status = кольцо 0 активно без сбоев [root@iob1 ~]# corosync-cmapctl | члены grep runtime.totem.pg.mrp.srp.members.1.config_version (u64) = 0 runtime.totem.pg.mrp.srp.members.1.ip (str) = r(0) ip(192.168.179.54 ) runtime.totem.pg.mrp.srp.members.1.join_count (u32) = 1 runtime.totem.pg.mrp.srp.members.1.status (str) = присоединился runtime.totem.pg.mrp.srp .members.2.config_version (u64) = 0 время выполнения.totem.pg.mrp.srp.members.2.ip (str) = r(0) ip(192.168.179.63) время выполнения.totem.pg.mrp.srp. member.2.join_count (u32) = 1 runtime.totem.pg.mrp.srp.members.2.status (str) = присоединился [root@iob1 ~]# pcs статус corosync

Информация о членстве ---------------------- Nodeid Голоса Имя 1 1 iob1 (локальный) 2 1 iob2

[root@iob1 ~]# pcs status Имя кластера: iobrokerc ПРЕДУПРЕЖДЕНИЕ: нет устройств stonith и stonith-enabled не является ложным Стек: corosync Текущий контроллер домена: iob2 (версия 1.1.18-11.el7_5.3-2b07d5c5a9) — раздел с кворумом Последнее обновление: пт, 24 августа, 12:18:14 2018 Последнее изменение: пт, 24 августа, 12:15:30, 2018, автор: hacluster через crmd на iob2

настроено 2 узла, настроено 0 ресурсов

Онлайн: [ iob1 iob2 ]

Нет ресурсов

Статус демона: corosync: активен/отключен; кардиостимулятор: активен/отключен; pcsd: активен/отключен.

[root@iob1 ~]# crm_verify -L -V ошибка: unpack_resources: Запуск ресурсов отключен, так как ресурсы STONITH не определены ошибка: unpack_resources: Либо настройте некоторые, либо отключите STONITH с включенной опцией stonith ошибка: unpack_resources: ПРИМЕЧАНИЕ: Кластерам с общими данными требуется STONITH для обеспечения целостности данных Ошибки, обнаруженные при проверке: конфигурация недействительна

[root@iob1 ~]# набор свойств pcs stonith-enabled=false

[root@iob1 ~]# crm_verify -L -V

ням установить который

[root@iob1 ~]# ресурс pcs create ClusterIP ocf:heartbeat:IPaddr2 \ > ip=192.168.179.160 cidr_netmask=32 op monitor interval=30s

[root@iob1 ~]# pcs status Имя кластера: iobrokerc Стек: corosync Текущий контроллер домена: iob2 (версия 1.1.18-11.el7_5.3-2b07d5c5a9) — раздел с кворумом Последнее обновление: пт, 24 августа, 12:26:57 2018 Последнее изменение: Пт, 24 августа, 12:23:51 2018 от root через cibadmin на iob1

2 настроенных узла 1 настроенный ресурс

Онлайн: [ iob1 iob2 ]

Полный список ресурсов:

 ClusterIP (ocf::heartbeat:IPaddr2): остановлен

Неудачные действия:

* ClusterIP_monitor_0 на iob2 'не установлен' (5): call=5, status=complete, exitreason='Проблема установки: не удалось найти команду: ip',

    last-rc-change='Пт, 24 августа, 12:23:52 2018', в очереди=0 мс, exec=192 мс

* ClusterIP_monitor_0 на iob1 'не установлен' (5): call=5, status=complete, exitreason='Проблема установки: не удалось найти команду: ip',

    last-rc-change='Пт, 24 августа, 12:23:52 2018', в очереди=0 мс, exec=194 мс

Статус демона: corosync: активен/отключен; кардиостимулятор: активен/отключен; pcsd: активен/отключен.

[root@iob1 ~]# pcs ресурсов по умолчанию resource-stickiness=100 Предупреждение: значения по умолчанию не применяются к ресурсам, которые переопределяют их собственными определенными значениями [root@iob1 ~]# pcs ресурсов по умолчанию resource-stickiness: 100

yum установить git python gcc-c++ сделать

https://stackoverflow.com/questions/48320850/installing-epel-repository-on-centos-7-breaks-yum-functionality cat > /etc/yum.repos.d/epel.repo << имя EOF [epel] =Перестроение Epel для armhfp baseurl=https://armv7.dev.centos.org/repodir/epel-pass-1/enabled=1 gpgcheck=0

EOF

[root@iob1 7]# yum install nodejs npm npm install -g npm@4

[root@iob1 npm]# node -v v6.14.3 [root@iob1 npm]# npm -v 3.10.10

https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux [root@iob1 dev]# yum install parted Загруженные плагины: fastmirror Загрузка зеркальных скоростей из кэша Пакет hostfile parted-3.1-29.el7.armv7hl уже установлен в последней версии.
Делать нечего [root@iob1 dev]# parted -l | Ошибка grep [root@iob1 dev]# parted /dev/sda mklabel gpt Предупреждение. Существующая таблица разделов и все данные в /dev/sda будут удалены. Желаете ли вы продолжить? Да/Нет/Нет? Да Информация: Возможно, вам потребуется изменить файл /etc/fstab.

[root@iob1 dev]# parted -a opt /dev/sda mkpart primary ext4 0% 100% Информация: возможно, вам потребуется изменить /etc/fstab.

[root@iob1 dev]# lsblk НАЗВАНИЕ MAJ:MIN RM SIZE RO ТИП МОНТАЖА sda 8:0 1 1,9G 0 disk └─sda1 8:1 1 1,9G 0 часть mmcblk0 179:0 0 14,8G 0 disk ├ ─mmcblk0p2 179:2 0 488M 0 часть [SWAP] ├─mmcblk0p3 179:3 0 13.7G 0 часть / └─mmcblk0p1 179:1 0 668M 0 часть /boot [root@iob1 dev]# mkfs.ext4 -L iob1d / dev/sda1 mke2fs 1.42.9 (28 декабря 2013 г.) Filesystem-Label=iob1d Тип ОС: Linux Blocksize=4096 (log=2) Fragmentsize=4096 (log=2) Stride=0 блоков, Stripewidth=0 блоков 122400 inodes, 488704 блоков 24435 блоков (5,00%) зарезервировано для суперпользователя Первый блок данных=0 Максимальное количество блоков файловой системы=501219328 15 групп блоков 32768 блоков на группу, 32768 фрагментов на группу 8160 inodes на группу Резервные копии суперблоков хранятся в блоках: 32768, 98304, 163840, 229376, 294912

Запрос места для групповых таблиц: выполнено Запись таблиц inode: выполнено Создание журнала (блоков 8192): выполнено Запись суперблоков и информации об учете файловой системы: выполнено

https://www.howtoforge.com/tutorial/how-to-install-and-setup-drbd-on-centos-6/ yum -y install gcc make automake autoconf libxslt libxslt-devel flex rpm-build kernel-devel

mkdir -p /root/rpmbuild/{СБОРКА,СТРОЙКА,RPMS,ИСТОЧНИКИ,СПЕЦИФИКАЦИИ,SRPMS}

ням установить -y wget

wget http://oss.linbit.com/drbd/utils/drbd-utils-9.5.0.tar.gz http://oss.linbit.com/drbd/9.0/drbd-9.0.15-1.tar. гз

wget http://www.linbit.com/downloads/drbd/8.4/drbd-8.4.11-1.tar.gz tar -zxvf drbd-8.4.11-1.tar.gz cd drbd-8.4.11-1 делать км-об/мин

tar -zxvf drbd-9.0.15-1.tar.gz tar -zxvf drbd-utils-9.5.0.tar.gz

компакт-диск drbd-9.0.15-1

компакт-диск /root/rpmbuild/RPMS/armv7h1

rpm -Uvh drbd-xen* drbd-udev* drbd-pacemaker* drbd-bash-completion* drbd-utils-*.rpm drbd-km-*.rpm drbd-8*