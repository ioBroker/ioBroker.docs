---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/protocol-coap.md
title: TR: ioBroker.shelly
hash: 4JbV6CdWbjaA6vp5oyOgb8Lcum1+pJOzrX/9qdgUe30=
---
![TR: Logo](../../../de/adapterref/iobroker.shelly/../../admin/shelly.png)

TR: # ioBroker.shelly
TR: ## CoAP
TR: Im Standard wird das CoAP-Protokoll verwendet.

TR: Falls Du einen Shelly mit einer Firmware kleiner oder gleich 1.9.4 verwendest, ist keine weitere Konfiguration notwendig. Deine Geräte werden automatisch vom Adapter gefunden.

TR: **Falls Du eine Version größer als 1.9.4 verwendest, musst Du einen CoIoT-Server für CoAP auf den Shelly-Geräten konfigurieren.** Trag als CoIoT-Server die IP-Adresse von deinem ioBroker Server ein - gefolgt von Port ```5683```. Wenn dein ioBroker beispielsweise unter der Adresse ```192.168.1.2``` erreichbar ist, trage dort ```192.168.1.2:5683``` ein und aktiviere CoIoT.

TR: **Wichtig: Da CoAP Multicast UDP Pakete verwendet, müssen deine Shelly-Geräte im gleichen Subnetz wie dein ioBroker Server sein.**

TR: Falls Du ioBroker in einem Docker-Container laufen hast, muss der Container im Netzwerkmodus ```host``` oder ```macvlan``` konfiguriert sein. Sollte der Docker-Container im Netzwerkmodus ```bridge``` laufen, werden keine Shelly-Geräte gefunden.

![TR: iobroker_restrict_login](../../../de/adapterref/iobroker.shelly/./img/iobroker_general_coap.png)

TR: CoAP fügt alle Geräte in deinem Netzwerk hinzu. Falls Du einzelne Geräte ausschließen möchtest, kannst Du diese in der Blacklist konfigurieren. Füge dafür die Seriennummern in die Tabelle ein:

![TR: iobroker_coap](../../../de/adapterref/iobroker.shelly/./img/iobroker_coap.png)

![TR: shelly_coap](../../../de/adapterref/iobroker.shelly/./img/shelly_coap.png)

TR: ### Wichtige Hinweise
TR: #### Shelly Firmware 1.8.0 (oder neuer)
TR: - Falls Du das CoAP-Protokoll nutzt, muss ab dieser Version der Adapter in Version 4.0.0 (oder neuer) genutzt werden.
TR: - Für Geräte mit älterer Firmware (außer Shelly 4 Pro) muss der Adapter in Version 3.3.6 (oder älter) genutzt werden. Die Adapter-Version 4.0.0 (oder neuer) ist nicht mit älteren Firmware-Versionen kompatibel!

TR: #### Shelly Firmware 1.9.4 (oder neuer)
TR: - Ab dieser Version muss ein CoIoT-Server auf jedem Shelly hinterlegt werden, falls das CoAP-Protokoll genutzt wird. Mehr Details im CoAP-Abschnitt in dieser Dokumentation.

TR: ### Fehlersuche
TR: In manchen Fällen kann es vorkommen, dass der Shelly-Adapter nicht alle Geräte im CoAP-Modus findet. Versuche dann folgendes:

TR: 1. Stoppe deine Instanz des Shelly-Adapters. **Es ist nicht nötig, den Adapter zu deinstallieren!**
TR: 2. Öffne ein Terminal-Fenster und führe die folgenden Befehle auf dem ioBroker-Server aus:

```
cd /opt/iobroker/node_modules/iobroker.shelly/
node coaptest.js
```

TR: Alternativ kann ```tcpdump``` verwendet werden:

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

TR: Nun solltest Du alle CoAP-Nachrichten von den Shelly-Geräten sehen. Solltest Du keine Nachrichten sehen, hast Du ein Netzwerkproblem mit UDP oder Multicast-Nachrichten.

TR: CoAP-Nachrichten sehen wie folgt aus:

``` 
UDP Server listening on 0.0.0.0:5683
2020-08-19T19:33:29.484Z - 192.168.20.233:5683 - P-B3citsml	SHBTN-1#AXXXXXXXXXX#2RC{"G":[[0,9103,0],[0,2102,"S"],[0,2103,1],[0,3115,0],[0,3112,0],[0,3111,100],[0,9102,["button"]]]}
2020-08-19T19:33:29.827Z - 192.168.20.233:5683 - P-C3citsml	SHBTN-1#AXXXXXXXXXX#2RC{"G":[[0,9103,0],[0,2102,"S"],[0,2103,1],[0,3115,0],[0,3112,0],[0,3111,100],[0,9102,["button"]]]}
2020-08-19T19:33:33.942Z - 192.168.20.233:5683 - P-D3citsml	SHBTN-1#AXXXXXXXXXX#2RC{"G":[[0,9103,0],[0,2102,"S"],[0,2103,1],[0,3115,0],[0,3112,0],[0,3111,100],[0,9102,["button"]]]}
```