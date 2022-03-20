---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/protocol-mqtt.md
title: TR: ioBroker.shelly
hash: Bd+LVUP47yND7GlSfMKQwS9NFjqNftpSs/7lAVFW0Q0=
---
![TR: Logo](../../../de/adapterref/iobroker.shelly/../../admin/shelly.png)

TR: # ioBroker.shelly
TR: ## MQTT
TR: ### Wichtige Hinweise
TR: - Es ist nicht möglich, den Shelly-Adapter mit einem existierenden MQTT-Broker in deinem Netzwerk zu verbinden
TR: - Der Shelly-Adapter startet einen eigenen MQTT-Broker, welcher auf dem Port ``1882`` gestartet wird, um einen Konflikt mit anderen MQTT-Brokern auf dem gleichen System zu vermeiden
TR: - Der Standard-Port des MQTT-Brokers kann in der Konfiguration des Adapters angepasst werden
TR: - Es ist kein Wissen über das MQTT-Protokoll erforderlich - sämtliche Kommunikation wird intern behandelt

TR: ### Konfiguration
TR: 1. Öffne die Shelly-Adapter Konfiguration im ioBroker
TR: 2. Wähle ```MQTT und HTTP``` als *Protokoll* in den *Allgemeinen Einstellungen*
TR: 3. Öffne das Tab **MQTT Einstellungen**
TR: 4. Wähle einen Benutzernamen und ein sicheres Passwort (Du musst diese Informationen auf den Shelly-Geräten hinterlegen)

![TR: iobroker_general](../../../de/adapterref/iobroker.shelly/./img/iobroker_general_mqtt.png)

![TR: iobroker_mqtt](../../../de/adapterref/iobroker.shelly/./img/iobroker_mqtt.png)

TR: Aktiviere MQTT auf deinen Shelly-Geräten:

TR: 1. Öffne die Shelly-Webkonfiguration in einem Browser (nicht in der Shelly App!)
TR: 2. Gehe zu ```Internet & Security settings -> Advanced - Developer settings```
TR: 3. Aktiviere MQTT und gib die gerade konfigurierten Benutzerdaten und die IP-Adresse deiner ioBroker-Installation ein - gefolgt von Port 1882 (beispielsweise ```192.168.20.242:1882```)
TR: 4. Speichere die Konfiguration - der Shelly startet automatisch neu

TR: - Bei Gen1-Geräten: Ändere nicht den ```custom MQTT prefix``` (der Adapter wird nicht funktionieren, wenn Du diesen Wert anpasst)

![TR: shelly gen1](../../../de/adapterref/iobroker.shelly/./img/shelly_mqtt-gen1.png)

![TR: shelly gen2](../../../de/adapterref/iobroker.shelly/./img/shelly_mqtt-gen2.png)

TR: **Für Generation 2 Geräte müssen alle RPC-Optionen aktiviert werden (siehe Screenshot)!**