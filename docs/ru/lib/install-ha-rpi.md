---
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/lib/install-ha-rpi.md
title: пароль хакластера
hash: MjjI23qSH6M8YRKL+JWxHZIbxco0oSiyyyai+mUP1wY=
---
#
##
### Источник
https://www.raspberrypi.org/downloads/raspbian/ https://downloads.raspberrypi.org/raspbian_lite_latest Raspbian Stretch Lite Минимальный образ на основе Debian Stretch Версия: июнь 2018 г. Дата выпуска: 27 июня 2018 г. Версия ядра: 4.14

2018-06-27-raspbian-stretch-lite.img

### Граватель
https://etcher.io/

Создайте файл `ssh` на разделе `boot`.

### Шпатлёвка
https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html https://the.earth.li/~sgtatham/putty/latest/w64/putty-64bit-0.70-installer.msi

##Соединять
Вызов пользователя Putty: pi paswoort raspberry raspberrypi в putty

sudo passwd root sudo nano /etc/ssh/sshd_config Найдите PermitRootLogin и измените его на Yes, Remove # Вы можете отменить вход в систему как root снова, используя эту команду sudo passwd -l root su

Подходящее обновление Подходящее обновление

конфигурация распи

2 Параметры сети. Имя хоста. Страна Wi-Fi установлена на de. Введите SSID. Введите пароль.

4 I1 Измените локаль de_DE.UTF-8 Пустой ключ UTF-8 для выбора

7 Дополнительные параметры A1 Развернуть файловую систему

перезагрузка Добро пожаловать на fdisk (util-linux 2.29.2).
Изменения останутся в памяти только до тех пор, пока вы не решите их записать.
Будьте осторожны перед использованием команды записи.

Команда (m для помощи): Диск /dev/mmcblk0: 14,9 ГиБ, 15931539456 байт, 31116288 секторов Единицы измерения: сектора 1 * 512 = 512 байт Размер сектора (логический/физический): 512 байт / 512 байт Размер ввода-вывода (минимум) /оптимальный): 512 байт / метка диска 512 байт. тип: dos Идентификатор диска: 0x8e9e2675

Загрузка устройства Начало Конечные секторы Размер Идентификатор Тип /dev/mmcblk0p1 8192 96663 88472 43.2M c W95 FAT32 (LBA) /dev/mmcblk0p2 98304 31116287 31017984 14.8G 83 Linux

Команда (m для справки): Номер раздела (1,2, по умолчанию 2): Раздел 2 удален.

Команда (m для справки): Тип раздела p основной (1 основной, 0 расширенных, 3 свободных) e расширенный (контейнер для логических разделов) Выберите (по умолчанию p): Номер раздела (2–4, по умолчанию 2): Первый сектор (2048) -31116287, по умолчанию 2048): последний сектор, +сектора или +размер{K,M,G,T,P} (98304-31116287, по умолчанию). 31116287): Создан новый раздел 2 типа «Linux» и размером 14,8 ГиБ.
Раздел №2 содержит подпись ext4.

Команда (m для помощи): Диск /dev/mmcblk0: 14,9 ГиБ, 15931539456 байт, 31116288 секторов Единицы измерения: сектора 1 * 512 = 512 байт Размер сектора (логический/физический): 512 байт / 512 байт Размер ввода-вывода (минимум) /оптимальный): 512 байт / метка диска 512 байт. тип: dos Идентификатор диска: 0x8e9e2675

Загрузка устройства Начало Конечные секторы Размер Идентификатор Тип /dev/mmcblk0p1 8192 96663 88472 43.2M c W95 FAT32 (LBA) /dev/mmcblk0p2 98304 31116287 31017984 14.8G 83 Linux

Команда (m для помощи): Таблица разделов была изменена.
Вызов ioctl() для повторного чтения таблицы разделов.
Не удалось перечитать таблицу разделов.: Устройство или ресурс заняты.

Ядро по-прежнему использует старую таблицу. Новая таблица будет использоваться при следующей перезагрузке или после запуска partprobe(8) или kpartx(8).

fdisk -l /dev/mmcblk0

нано /etc/dhcpcd.conf

статический ip_address=10.10.1.1/24 интерфейса eth0

интерфейс wlan0 статический ip_address=192.168.179.161/24 статические маршрутизаторы=192.168.179.1 статический имя_домена_серверы=192.168.179.10

статический ip_address=10.10.1.2/24 интерфейса eth0

интерфейс wlan0 статический ip_address=192.168.179.162/24 статические маршрутизаторы=192.168.179.1 статический имя_домена_серверы=192.168.179.10

nano /etc/hosts 192.168.179.161 iob1 192.168.179.162 iob2 10.10.1.1 iob1p 10.10.1.2 iob2p

apt install policycoreutils-python-utils psmisc libssl-dev

https://www.server-world.info/en/note?os=Debian_9&p=ssh&f=4

https://www.debian.org/devel/passwordlessssh

#######################################
центос

https://unix.stackexchange.com/questions/370318/how-to-connect-to-wifi-in-centos-7clino-gui yum install NetworkManager-tui nmtui

localectl set-locale LANG=de_DE.utf8 yum update -y /usr/bin/rootfs-expand

ssh -l корень iob1

timedatectl set-timezone Европа/Берлин

setenforce 0 sed -i.bak "s/SELINUX=enforcing/SELINUX=permissive/g" /etc/selinux/config systemctl маска firewalld.service systemctl stop firewalld.service iptables --flush

# Пароль хакластера
Изменение пароля пользователя hacluster.
Новый пароль: введите новый пароль еще раз: passwd: все токены аутентификации успешно обновлены.

[root@iob1 ~]# аутентификация кластера pcs iob1 iob2 Имя пользователя: hacluster Пароль: iob2: Авторизованный iob1: Авторизованный [root@iob1 ~]# Настройка кластера pcs --name iobrokerc iob1 iob2 Уничтожение кластера на узлах: iob1, iob2...
iob2: Остановка кластера (кардиостимулятора)...
iob1: Остановка кластера (кардиостимулятора)...
iob2: Кластер успешно уничтожен. iob1: Кластер успешно уничтожен.

Отправка «pacemaker_remote authkey» на «iob1», «iob2» iob1: успешное распространение файла «pacemaker_remote authkey» iob2: успешное распространение файла «pacemaker_remote authkey» Отправка файлов конфигурации кластера на узлы...
iob1: успешно. iob2: успешно.

Синхронизация сертификатов pcsd на узлах iob1, iob2...
iob2: Успех iob1: Успех Перезапуск pcsd на узлах, чтобы перезагрузить сертификаты...
iob2: Успех iob1: Успех

[root@iob1 ~]# ПК запуска кластера --all iob1: Запуск кластера...
iob2: Запуск кластера...

[root@iob1 ~]# corosync-cfgtool -s Печать состояния кольца.
ID локального узла 1 RING ID 0 id = 192.168.179.54 статус = кольцо 0 активно без ошибок [root@iob1 ~]# corosync-cmapctl | члены grep runtime.totem.pg.mrp.srp.members.1.config_version (u64) = 0 runtime.totem.pg.mrp.srp.members.1.ip (str) = r(0) ip(192.168.179.54) ) runtime.totem.pg.mrp.srp.members.1.join_count (u32) = 1 runtime.totem.pg.mrp.srp.members.1.status (str) = присоединился runtime.totem.pg.mrp.srp.members.2.config_version (u64) = 0 runtime.totem.pg.mrp. srp.members.2.ip (str) = r(0) ip(192.168.179.63) runtime.totem.pg.mrp.srp.members.2.join_count (u32) = 1 runtime.totem.pg.mrp.srp.members.2.status (str) = присоединен [root@iob1 ~]# статус ПК corosync

Информация о членстве ---------------------- Nodeid Голосует Имя 1 1 iob1 (локальный) 2 1 iob2

[root@iob1 ~]# шт. Статус Имя кластера: iobrokerc ВНИМАНИЕ: нет устройств stonith и поддержка stonith не является ложной. Стек: corosync Текущий DC: iob2 (версия 1.1.18-11.el7_5.3-2b07d5c5a9) — раздел с кворумом Последнее обновление: пт, 24 августа 12:18:14 2018 г. Последнее изменение: пт, август 24 12:15:30 2018 от hacluster через crmd на iob2

настроено 2 узла; настроено 0 ресурсов.

Онлайн: [ iob1 iob2 ]

Нет ресурсов

Статус демона: corosync: активен/выключен кардиостимулятор: активен/выключен pcsd: активен/включен

[root@iob1 ~]# crm_verify -L -V ошибка: unpack_resources: запуск ресурса отключен, так как ресурсы STONITH не определены. ошибка: unpack_resources: либо настройте некоторые, либо отключите STONITH с помощью опции, поддерживающей stonith. ошибка: unpack_resources: ПРИМЕЧАНИЕ: Кластерам с общими данными требуется STONITH для обеспечения целостности данных. Во время проверки обнаружены ошибки: конфигурация недействительна.

[root@iob1 ~]# набор свойств ПК stonith-enabled=false

[root@iob1 ~]# crm_verify -L -V

ням, установи какой

[root@iob1 ~]# ресурс ПК создает ClusterIP ocf:heartbeat:IPaddr2 \ > ip=192.168.179.160 cidr_netmask=32 интервал монитора = 30 с

[root@iob1 ~]# состояние ПК Имя кластера: iobrokerc Стек: corosync Текущий DC: iob2 (версия 1.1.18-11.el7_5.3-2b07d5c5a9) — раздел с кворумом Последнее обновление: пятница, 24 августа, 12:26:57, 2018 г. Последнее изменение: Пт, 24 августа 12:23:51 2018 г., root через цибадмин на iob1

настроено 2 узла, настроен 1 ресурс

Онлайн: [ iob1 iob2 ]

Полный список ресурсов:

 ClusterIP (ocf::heartbeat:IPaddr2): остановлено.

Неудачные действия:

* ClusterIP_monitor_0 на iob2 «не установлен» (5): call=5, status=complete, exitreason='Проблема установки: не удалось найти команду: ip',

    Last-rc-change = 'Пятница, 24 августа, 12:23:52 2018', в очереди = 0 мс, exec = 192 мс

* ClusterIP_monitor_0 на iob1 «не установлен» (5): call=5, status=complete, exitreason='Проблема установки: не удалось найти команду: ip',

    Last-rc-change = 'Пт, 24 августа 12:23:52 2018', в очереди = 0 мс, exec = 194 мс

Статус демона: corosync: активен/выключен кардиостимулятор: активен/выключен pcsd: активен/включен

[root@iob1 ~]# значения ресурсов по умолчанию для ресурсов resources-stickiness=100 Внимание: значения по умолчанию не применяются к ресурсам, которые переопределяют их собственными определенными значениями [root@iob1 ~]# значения по умолчанию для ресурсов ресурсов: 100

ням, установи git python gcc-c++ make

https://stackoverflow.com/questions/48320850/installing-epel-repository-on-centos-7-breaks-yum-functionality cat > /etc/yum.repos.d/epel.repo << Имя EOF [epel] =Перестройка Epel для Armhfp baseurl=https://armv7.dev.centos.org/repodir/epel-pass-1/ Enabled=1 gpgcheck=0

ЭОФ

[root@iob1 7]# yum install nodejs npm npm install -g npm@4

[root@iob1 npm]# node -v v6.14.3 [root@iob1 npm]# npm -v 3.10.10

https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux [root@iob1 dev]# yum install parted Загруженные плагины: fastmirror Загрузка скорости зеркала из кэша Пакет хост-файла parted-3.1-29.el7.armv7hl уже установлен в последней версии.
Делать нечего [root@iob1 dev]# parted -l | Ошибка grep [root@iob1 dev]# parted /dev/sda mklabel gpt Предупреждение: существующая таблица разделов и все данные в /dev/sda будут удалены. Вы хотите продолжить? Да/Да/Нет/Нет? Да Информация: вам может потребоваться настроить /etc/fstab.

[root@iob1 dev]# parted -a opt /dev/sda mkpart Primary ext4 0% 100% Информация: возможно, вам потребуется изменить /etc/fstab.

[root@iob1 dev]# lsblk ИМЯ MAJ:MIN RM РАЗМЕР RO ТИП MOUNTPOINT sda 8:0 1 1.9G 0 диск └─sda1 8:1 1 1.9G 0 часть mmcblk0 179:0 0 14.8G 0 диск ├ ─mmcblk0p2 179 :2 0 488M 0 часть [SWAP] ├─mmcblk0p3 179:3 0 13.7G 0 часть / └─mmcblk0p1 179:1 0 668M 0 часть /boot [root@iob1 dev]# mkfs.ext4 -L iob1d /dev/sda1 mke2fs 1.42 . 9 (28 декабря 2013 г.) Метка файловой системы = iob1d Тип ОС: Linux Размер блока = 4096 (журнал = 2) Размер фрагмента = 4096 (журнал = 2) Шаг = 0 блоков, ширина полосы = 0 блоков 122 400 инодов, 488 704 блоков 24 435 блоков ( 5,00%) зарезервировано для суперпользователя. Первый блок данных = 0 Максимум. Блоки файловой системы=501219328 15 групп блоков 32768 блоков на группу, 32768 фрагментов на группу 8160 индексных дескрипторов на группу Резервные копии суперблоков хранятся в блоках: 32768, 98304, 163840, 229376, 294912

Запрошено место для групповых таблиц: выполнено Запись таблиц индексных дескрипторов: выполнено Создание журнала (8192 блоков): выполнено Запись суперблоков и учетной информации файловой системы: выполнено

https://www.howtoforge.com/tutorial/how-to-install-and-setup-drbd-on-centos-6/ yum -y install gcc make automake autoconf libxslt libxslt-devel flex rpm-build kernel-devel

mkdir -p /root/rpmbuild/{BUILD,BUILDROOT,RPMS,SOURCES,SPECS,SRPMS}

ням установить -y wget

wget http://oss.linbit.com/drbd/utils/drbd-utils-9.5.0.tar.gz http://oss.linbit.com/drbd/9.0/drbd-9.0.15-1.tar. гз

wget http://www.linbit.com/downloads/drbd/8.4/drbd-8.4.11-1.tar.gz tar -zxvf drbd-8.4.11-1.tar.gz cd drbd-8.4.11-1 сделать км об/мин

tar -zxvf drbd-9.0.15-1.tar.gz tar -zxvf drbd-utils-9.5.0.tar.gz

компакт-диск drbd-9.0.15-1

компакт-диск /root/rpmbuild/RPMS/armv7h1

rpm -Uvh drbd-xen* drbd-udev* drbd-pacemaker* drbd-bash-completion* drbd-utils-*.rpm drbd-km-*.rpm drbd-8*