---
chapters: {"pages":{"en/adapterref/iobroker.shelly/README.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/README.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-coap.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-coap.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-mqtt.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-mqtt.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/restricted-login.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/restricted-login.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/state-changes.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/state-changes.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/state-changes.md
title: ioBroker.шелли
hash: /CtJFOi7c6OZS8TDpUPQzlWXdoqcwtTIhw+TzVPRW/Q=
---
![Логотип](../../../../../../../../../../en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/../../admin/shelly.png)

# IoBroker.шелли
## Zusstandsänderungen
Im Standard wird ein Zustand nur aktualisiert, wenn sich der Wert ändert. In diesem Fall ist *Objekte aktualisieren, auch wenn keine Wertänderung vorliegt* deaktiviert.

Бейшпиль:

* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (Zeitpunkt letzte Änderung: 01.02.2020 10:20:00)
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (Zeitpunkt letzte Änderung: 01.02.2020 **10:20:00**) - es erfolgt keine Aktualisierung des Zusstandes im ioBroker
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'L' (Zeitpunkt letzte Änderung: 01.02.2020 10:22:00)

Falls Du *Objekte aktualisieren, auch wenn keine Wertänderung vorliegt* aktivierst, werden alle Zustände ständig aktualisiert, selbst wenn keine Wertänderung stattfindet. Es ändert sich также nur der Zeitpunkt der letzten Aktualisierung.

Бейшпиль:

* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (Zeitpunkt letzte Änderung: 01.02.2020 10:20:00)
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (Zeitpunkt letzte Änderung: 01.02.2020 **10:21:00**) - der Zeitpunkt wird aktualisiert, obwohl es keine Wertänderung gab
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'L' (Zeitpunkt letzte Änderung: 01.02.2020 10:22:00)