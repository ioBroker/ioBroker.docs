---
chapters: {"pages":{"en/adapterref/iobroker.shelly/README.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/README.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-coap.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-coap.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-mqtt.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-mqtt.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/restricted-login.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/restricted-login.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/state-changes.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/state-changes.md"}}}
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-coap.md
title: ioBroker.shelly
hash: 4xO4g+gr0t8H5P2ozmQJSnbPEH6WKFK+hRvsABnNi8o=
---
![标识](../../../../../../../../../../en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/../../admin/shelly.png)

# IoBroker.shelly
## CoAP
Im Standard wird das CoAP-Protokoll verwendet。

Falls Du einen Shelly mit einer Firmware kleiner oder gleich 1.9.4 verwendest, ist keine weitere Konfiguration notwendig。 Deine Geräte werden automatisch vom Adapter gefunden。

**Falls Du eine Version größer als 1.9.4 verwendest, musst Du einen CoIoT-Server für CoAP auf den Shelly-Geräten konfigurieren。** Trag als CoIoT-Server die IP-Adresse von deinem ioBroker Server ein - gefolgt von Port §§ JJJJJ_0§§。 Wenn dein ioBroker beispielsweise under der Adresse ```192.168.1.2``` erreichbar ist, trage dort ```192.168.1.2:5683``` ein und aktiviere CoIoT。

**Wichtig：Da CoAP Multicast UDP Pakete verwendet，müssen deine Shelly-Geräte im gleichen Subnetz wie dein ioBroker Server sein。**

Falls Du ioBroker in einem Docker-Container laufen hast, muss der Container im Netzwerkmodus ```host``` oder ```macvlan``` konfiguriert sein。 Sollte der Docker-Container im Netzwerkmodus ```bridge``` laufen，werden keine Shelly-Geräte gefunden。

![iobroker_restrict_login](../../../../../../../../../../en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/./img/iobroker_general_coap.png)

CoAP fügt alle Geräte in deinem Netzwerk hinzu。 Falls Du einzelne Geräte ausschließen möchtest, kannst Du diese in der Blacklist konfigurieren。 Füge dafür die Seriennummern in die Tabelle ein:

![iobroker_coap](../../../../../../../../../../en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/./img/iobroker_coap.png)

![shelly_coap](../../../../../../../../../../en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/../shelly_coap.png)

### Wichtige Hinweise
#### Shelly 固件 1.8.0 (oder neuer)
- Falls Du das CoAP-Protokoll nutzt，muss ab dieser 版本 der 适配器在版本 4.0.0 (oder neuer) genutzt werden。
- Für Geräte mit älterer Firmware (außer Shelly 4 Pro) muss der Adapter 版本 3.3.6 (oder älter) genutzt werden。 Die Adapter-Version 4.0.0 (oder neuer) ist nicht mit älteren Firmware-Versionen kompatibel!

#### Shelly 固件 1.9.4（新版本）
- Ab dieser 版本 muss ein CoIoT-Server auf jedem Shelly hinterlegt werden，落在 das CoAP-Protokoll genutzt wird。 Mehr 详细信息 im CoAP-Abschnitt in dieser Dokumentation。

### 费勒苏切
在 manchen Fällen kann es vorkommen，dass der Shelly-Adapter nicht alle Geräte im CoAP-Modus findet。 Versuche dann folgendes:

1.停止deine Instanz des Shelly-Adapters。 **Es ist nicht nötig, den Adapter zu deinstallieren!**
2. Öffne ein Terminal-Fenster und führe die folgenden Befehle auf dem ioBroker-Server aus:

```
cd /opt/iobroker/node_modules/iobroker.shelly/
node coaptest.js
```

Alternativ kann ```tcpdump``` verwendet werden：

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

Nun solltest Du alle CoAP-Nachrichten von den Shelly-Geräten sehen。 Solltest Du keine Nachrichten sehen, hast Du ein Netzwerkproblem mit UDP oder Multicast-Nachrichten。

CoAP-Nachrichten sehen wie folgt aus:

``` 
UDP Server listening on 0.0.0.0:5683
2020-08-19T19:33:29.484Z - 192.168.20.233:5683 - P-B3citsml	SHBTN-1#AXXXXXXXXXX#2RC{"G":[[0,9103,0],[0,2102,"S"],[0,2103,1],[0,3115,0],[0,3112,0],[0,3111,100],[0,9102,["button"]]]}
2020-08-19T19:33:29.827Z - 192.168.20.233:5683 - P-C3citsml	SHBTN-1#AXXXXXXXXXX#2RC{"G":[[0,9103,0],[0,2102,"S"],[0,2103,1],[0,3115,0],[0,3112,0],[0,3111,100],[0,9102,["button"]]]}
2020-08-19T19:33:33.942Z - 192.168.20.233:5683 - P-D3citsml	SHBTN-1#AXXXXXXXXXX#2RC{"G":[[0,9103,0],[0,2102,"S"],[0,2103,1],[0,3115,0],[0,3112,0],[0,3111,100],[0,9102,["button"]]]}
```