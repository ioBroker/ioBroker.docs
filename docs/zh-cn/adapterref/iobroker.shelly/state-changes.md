---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/state-changes.md
title: TR: ioBroker.shelly
hash: /CtJFOi7c6OZS8TDpUPQzlWXdoqcwtTIhw+TzVPRW/Q=
---
![TR: Logo](../../../de/adapterref/iobroker.shelly/../../admin/shelly.png)

TR: # ioBroker.shelly
TR: ## Zustandsänderungen
TR: Im Standard wird ein Zustand nur aktualisiert, wenn sich der Wert ändert. In diesem Fall ist *Objekte aktualisieren, auch wenn keine Wertänderung vorliegt* deaktiviert.

TR: Beispiel:

TR: * shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (Zeitpunkt letzte Änderung: 01.02.2020 10:20:00)
TR: * shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (Zeitpunkt letzte Änderung: 01.02.2020 **10:20:00**) - es erfolgt keine Aktualisierung des Zustandes im ioBroker
TR: * shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'L' (Zeitpunkt letzte Änderung: 01.02.2020 10:22:00)

TR: Falls Du *Objekte aktualisieren, auch wenn keine Wertänderung vorliegt* aktivierst, werden alle Zustände ständig aktualisiert, selbst wenn keine Wertänderung stattfindet. Es ändert sich also nur der Zeitpunkt der letzten Aktualisierung.

TR: Beispiel:

TR: * shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (Zeitpunkt letzte Änderung: 01.02.2020 10:20:00)
TR: * shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (Zeitpunkt letzte Änderung: 01.02.2020 **10:21:00**) - der Zeitpunkt wird aktualisiert, obwohl es keine Wertänderung gab
TR: * shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'L' (Zeitpunkt letzte Änderung: 01.02.2020 10:22:00)