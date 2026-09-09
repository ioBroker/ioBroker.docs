---
chapters: {"pages":{"en/adapterref/iobroker.zigbee2mqtt/README.md":{"title":{"en":"ioBroker.zigbee2mqtt"},"content":"en/adapterref/iobroker.zigbee2mqtt/README.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md":{"title":{"en":"Wiki"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md":{"title":{"en":"Installation"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md":{"title":{"en":"Installation incl. moving from ioBroker/Zigbee adapter"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md":{"title":{"en":"FAQ"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md
title: без названия
hash: QTjPL1+42+VD2E1r+6Hecy7o5I1WbMsVNI7hpuEe5jQ=
---
Отзыв/руководство пользователя [Acgua](https://github.com/Acgua) :

Я перешёл с Zigbee-адаптера, на котором установлено более 30 устройств, на ConBee II Stick. Мой подход к контейнеру Proxmox примерно такой:

### Подготовьте контейнер Proxmox:

- Создан контейнер Debian 11: 512 МБ ОЗУ, 512 МБ файла подкачки, 4 ГБ оперативной памяти, 1 ядро.
- `apt update -y && apt upgrade -y` ,`apt install -y sudo usbutils curl git` (и, возможно, еще несколько необходимых пакетов)
- `adduser z2m` ,`adduser z2m sudo` ,`su z2m` (с этого момента только пользователь может брать)`z2m` (больше не корень)
- Передайте USB-накопитель (ConBee II) в соответствии с [ioBroker-Doku.](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/de/install/proxmox.md#proxmox---lxc-linux-containers---usb-ger%C3%A4te-durchreichen)

### Установите Mosquitto в контейнере:

(Адаптировано из [данного руководства](https://randomnerdtutorials.com/how-to-install-mosquitto-broker-on-raspberry-pi/) )

- `sudo apt install -y mosquitto mosquitto-clients`
- Настройка автозапуска:`sudo systemctl enable mosquitto.service`
- Включить удалённый доступ (без аутентификации):`sudo nano /etc/mosquitto/mosquitto.conf` и добавьте строки`listener 1883` и`allow_anonymous true` в конце файла. (Заметка для себя: изменить на auth!).
- Перезапустите Mosquitto:`sudo systemctl restart mosquitto`
- Проверить статус:`systemctl status mosquitto`
- `sudo reboot` затем уточните у`systemctl status mosquitto` Если Mosquitto запускается автоматически.

### Установите Zigbee2MQTT в контейнере:

- Действуйте приблизительно в соответствии с [официальными инструкциями для Linux](https://www.zigbee2mqtt.io/guide/installation/01_linux.html) . **Важно:** согласно инструкциям, должна быть установлена NodeJS 16 (`...setup_16.x` ), я изменил это на 18 (официально поддерживается)
- Настройка в`/opt/zigbee2mqtt/data/configuration.yaml` согласно инструкциям, входя`server: 'mqtt://localhost'` в качестве MQTT-сервера.
- Настройте автоматический запуск Zigbee2MQTT при загрузке системы [в соответствии с документацией](https://www.zigbee2mqtt.io/guide/installation/01_linux.html#optional-running-as-a-daemon-with-systemctl) .
- `sudo reboot` затем использовать`systemctl status zigbee2mqtt.service` проверить, запускается ли Zigbee2MQTT автоматически.

### ioBroker Zigbee2MQTT Adapter

- Процедура согласно документации - [Установка, включая перенос с адаптера ioBroker/Zigbee.](/#/docs/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md)
- **Важно, если используется ConBee II Stick** : отрегулируйте`configuration.yaml` снова:
  1. под`serial` входить:`adapter: deconz` .
  2. под`advanced` удалить строку`transmit_power: 20` Похоже, ConBee II не способен на это, и при запуске Zigbee2MQTT возникают ошибки.

### Скриншоты

Proxmox (последний перезапуск был всего 50 минут назад). Низкое потребление ресурсов.

![Производительность контейнеров Proxmox](../../../../../en/adapterref/iobroker.zigbee2mqtt/docs/img/ProxmoxContainerPerfomence.png)