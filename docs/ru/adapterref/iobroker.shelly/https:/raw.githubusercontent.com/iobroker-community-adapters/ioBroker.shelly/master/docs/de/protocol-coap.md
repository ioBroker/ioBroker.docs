---
chapters: {"pages":{"en/adapterref/iobroker.shelly/README.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/README.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-coap.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-coap.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-mqtt.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-mqtt.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/restricted-login.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/restricted-login.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/state-changes.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/state-changes.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-coap.md
title: ioBroker.шелли
hash: 4xO4g+gr0t8H5P2ozmQJSnbPEH6WKFK+hRvsABnNi8o=
---
![Логотип](../../../../../../../../../../en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/../../admin/shelly.png)

# IoBroker.шелли
## КоАП
Im Standard Wird das CoAP-Protokoll verwendet.

Falls Du einen Shelly mit einer Firmware kleiner oder gleich 1.9.4 verwendest, ist keine weitere Konfiguration notwendig. Deine Geräte werden autotisch vom Adapter gefunden.

**Выше версии 1.9.4 verwendest, необходимо установить CoIoT-Server для CoAP в конфигурации Shelly-Geräten.** Отследить CoIoT-Server с IP-адресом определенного сервера ioBroker ein - gefolgt von Port §§ JJJJJ_0§§. Wenn dein ioBroker beispielsweise under der Adresse ```192.168.1.2``` erreichbar ist, trage dort ```192.168.1.2:5683``` ein und aktiviere CoIoT.

**Выбор: Пакет многоадресной рассылки UDP CoAP передается, если Shelly-Geräte в удаленной подсети с сервером ioBroker.**

Попадает Du ioBroker в Einem Docker-Container, имейте в виду, что Container im Netzwerkmodus ```host``` или ```macvlan``` configuriert sein. Sollte der Docker-Container im Netzwerkmodus ```bridge``` laufen, werden keine Shelly-Geräte gefunden.

![iobroker_restrict_login](../../../../../../../../../../en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/./img/iobroker_general_coap.png)

CoAP fügt alle Geräte in deinem Netzwerk hinzu. Falls Du einzelne Geräte ausschließen möchtest, kannst Du diese in der Blacklist konfigurieren. Füge dafür die Seriennummern in die Tabelle ein:

![iobroker_coap](../../../../../../../../../../en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/./img/iobroker_coap.png)

![shelly_coap](../../../../../../../../../../en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/../shelly_coap.png)

### Wichtige Hinweise
#### Прошивка Shelly 1.8.0 (более новая версия)
- Falls Du das CoAP-Protokoll nutzt, muss ab dieser Version der Adapter in Version 4.0.0 (или более новая) genutzt werden.
- Для получения обновленной прошивки (для Shelly 4 Pro) необходимо установить адаптер в версии 3.3.6 (или более старую). Адаптер версии 4.0.0 (или более поздней) является несовместимым с другими версиями встроенного ПО!

#### Прошивка Shelly 1.9.4 (более новая версия)
- Новая версия CoAP-Server должна быть подключена к Shelly, которая удалена, падает с CoAP-Protokoll genutzt wird. Больше деталей в CoAP-Abschnitt в dieser Dokumentation.

### Фелерзух
В manchen Fällen kann es vorkommen, dass der Shelly-Adapter nicht alle Geräte im CoAP-Modus findet. Versuche dann fogendes:

1. Stoppe deine Instanz des Shelly-Adapters. **Es ist nicht nötig, den Adapter zu deinstallieren!**
2. Совместное использование Terminal-Fenster и führe die folgenden Befehle auf dem ioBroker-Server как:

```
cd /opt/iobroker/node_modules/iobroker.shelly/
node coaptest.js
```

Альтернативный канал ```tcpdump``` verwendet werden:

```
# Install tcpdump if it is not installed
sudo apt-get update
sudo apt-get install tcpdump

# tcpdump with IP address of Shelly device on network device eth1
sudo tcpdump -i eth1 src <IP-OF-SHELLY> and port 5683 -A

# tcpdump with IP address of Shelly device
sudo tcpdump src <IP-OF-SHELLY> and port 5683 -A

# tcpdump of all Shelly devices on network device eth1
sudo tcpdump  -i eth1 port 5683 -A

 # tcpdump of all Shelly devices
sudo tcpdump port 5683 -A
```

Nun solltest Du alle CoAP-Nachrichten von den Shelly-Geräten sehen. Все тесты Du keine Nachrichten sehen, hast Du ein Netzwerkproblem mit UDP или Multicast-Nachrichten.

CoAP-Nachrichten sehen wie folgt aus:

``` 
UDP Server listening on 0.0.0.0:5683
2020-08-19T19:33:29.484Z - 192.168.20.233:5683 - P-B3citsml	SHBTN-1#AXXXXXXXXXX#2RC{"G":[[0,9103,0],[0,2102,"S"],[0,2103,1],[0,3115,0],[0,3112,0],[0,3111,100],[0,9102,["button"]]]}
2020-08-19T19:33:29.827Z - 192.168.20.233:5683 - P-C3citsml	SHBTN-1#AXXXXXXXXXX#2RC{"G":[[0,9103,0],[0,2102,"S"],[0,2103,1],[0,3115,0],[0,3112,0],[0,3111,100],[0,9102,["button"]]]}
2020-08-19T19:33:33.942Z - 192.168.20.233:5683 - P-D3citsml	SHBTN-1#AXXXXXXXXXX#2RC{"G":[[0,9103,0],[0,2102,"S"],[0,2103,1],[0,3115,0],[0,3112,0],[0,3111,100],[0,9102,["button"]]]}
```