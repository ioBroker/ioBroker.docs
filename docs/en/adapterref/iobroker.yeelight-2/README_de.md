---
chapters: {"pages":{"en/adapterref/iobroker.yeelight-2/README.md":{"title":{"en":"ioBroker.yeelight-2"},"content":"en/adapterref/iobroker.yeelight-2/README.md"},"en/adapterref/iobroker.yeelight-2/README_de.md":{"title":{"en":"ioBroker.yeelight-2"},"content":"en/adapterref/iobroker.yeelight-2/README_de.md"}}}
---
![Logo](admin/yeelight.png)

![Number of Installations](http://iobroker.live/badges/yeelight-2-installed.svg)
![Number of Installations](http://iobroker.live/badges/yeelight-2-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.yeelight-2.svg)](https://www.npmjs.com/package/iobroker.yeelight-2)

![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.yeelight-2/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/yeelight-2/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.yeelight-2.svg)](https://www.npmjs.com/package/iobroker.yeelight-2)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

# ioBroker.yeelight-2

Dieser Adapter steuert Yeelight Lampen. Statusänderungen durch die App werden direkt erkannt.

## Installation

Bei vielen Lampen muss über die Yeelight App die "LAN-Steuerung" aktiviert werden, bevor sie gefunden und gesteuert werden können.

![](admin/lan.jpg)

## Konfiguration

Lampen können manuell hinzugefügt oder gesucht werden. IP, Smartname, Port und Name können angepasst werden. Der Standard-Port ist 55443. Wenn ein Leerzeichen im Namen verwendet wird, wird es durch "\_" ersetzt.

### smartname

Wird in der Konfiguration ein Smartname angegeben, wird diese Lampe automatisch zum Cloud Adapter hinzugefügt und kann über Alexa gesteuert werden.

### Geräte suchen

Mit dieser Funktion können Lampen automatisch gesucht und hinzugefügt werden. die Suche dauert ca. 20 Sekunden. Danach werden die gefundenen Geräte in der Tabelle aufgelistet.

## Änderungsprotokoll

Das Änderungsprotokoll ist in der Datei [README.md](https://github.com/iobroker-community-adapters/ioBroker.yeelight-2/tree/master?tab=readme-ov-file#changelog) zu finden.