---
chapters: {"pages":{"en/adapterref/iobroker.shelly/README.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/README.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-coap.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-coap.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-mqtt.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-mqtt.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/restricted-login.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/restricted-login.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/state-changes.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/state-changes.md"}}}
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-mqtt.md
title: ioBroker.shelly
hash: wj5UcKMGrSCffh0URHHWrTS8q28l3IDd6gGlj7vbEI8=
---
![标识](../../../../../../../../../../en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/../../admin/shelly.png)

# IoBroker.shelly
## MQTT
1. 使用 ioBroker 的 Shelly-Adapter Konfiguration
2. Wähle ```MQTT und HTTP``` als *Protokoll* in den *Allgemeinen Einstellungen*
3. Öffne das Tab **MQTT Einstellungen**
4. Wähle einen Benutzernamen und ein sicheres Passwort (Du musst diese Informationen auf den Shelly-Geräten hinterlegen)

![iobroker_general](../../../../../../../../../../en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/./img/iobroker_general_mqtt.png)

![iobroker_mqtt](../../../../../../../../../../en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/./img/iobroker_mqtt.png)

Aktiviere MQTT auf deinen Shelly-Geräten：

1. 在 einem 浏览器中使用 Shelly-Webkonfiguration（在 der Shelly 应用程序中不存在！）
2. Gehe zu```Internet & Security settings -> Advanced - Developer settings```
3. Aktiviere MQTT und gib die gerade konfigurierten Benutzerdaten und die IP-Adresse deiner ioBroker-Installation ein - gefolgt von Port 1882 (beispielsweise ```192.168.20.242:1882```)
4. Speichere die Konfiguration - der Shelly startet automatisch neu

- Bei Gen1-Geräten: Ändere nicht den ```custom MQTT prefix``` (der Adapter wird nicht funktionieren, wenn Dudiesen Wert anpasst)

![贝壳第一代](../../../../../../../../../../en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/../shelly_mqtt-gen1.png)

![贝壳 gen2](../../../../../../../../../../en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/../shelly_mqtt-gen2.png)