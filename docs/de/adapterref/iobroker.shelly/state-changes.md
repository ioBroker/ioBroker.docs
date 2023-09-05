---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
---
![Logo](../../admin/shelly.png)

# ioBroker.shelly

This is the German documentation - [🇺🇸 English version](../en/state-changes.md)

## Zustandsänderungen

Im Standard wird ein Zustand nur aktualisiert, wenn sich der Wert ändert. In diesem Fall ist *Objekte aktualisieren, auch wenn keine Wertänderung vorliegt* deaktiviert.

Beispiel:

* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (Zeitpunkt letzte Änderung: 01.02.2020 10:20:00)
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (Zeitpunkt letzte Änderung: 01.02.2020 **10:20:00**) - es erfolgt keine Aktualisierung des Zustandes im ioBroker
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'L' (Zeitpunkt letzte Änderung: 01.02.2020 10:22:00)

Falls *Objekte aktualisieren, auch wenn keine Wertänderung vorliegt* aktiviert wurde, werden alle Zustände ständig aktualisiert, selbst wenn keine Wertänderung stattfindet. Es ändert sich also nur der Zeitpunkt der letzten Aktualisierung.

Beispiel:

* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (Zeitpunkt letzte Änderung: 01.02.2020 10:20:00)
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (Zeitpunkt letzte Änderung: 01.02.2020 **10:21:00**) - der Zeitpunkt wird aktualisiert, obwohl es keine Wertänderung gab
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'L' (Zeitpunkt letzte Änderung: 01.02.2020 10:22:00)