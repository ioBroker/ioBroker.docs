---
chapters: {"pages":{"en/adapterref/iobroker.yeelight-2/README.md":{"title":{"en":"ioBroker.yeelight-2"},"content":"en/adapterref/iobroker.yeelight-2/README.md"},"en/adapterref/iobroker.yeelight-2/README_de.md":{"title":{"en":"ioBroker.yeelight-2"},"content":"en/adapterref/iobroker.yeelight-2/README_de.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.yeelight-2/README_de.md
title: ioBroker.yeelight-2
hash: OjcWtWtbhqSGdRkxZB/W4HovbYwhlDzDU91uZfR1dMo=
---
![Logo](../../../en/adapterref/iobroker.yeelight-2/admin/yeelight.png)

![Anzahl der Installationen](http://iobroker.live/badges/yeelight-2-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.yeelight-2.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.yeelight-2/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/yeelight-2/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.yeelight-2.svg)

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

# ioBroker.yeelight-2

Dieser Adapter steuert Yeelight Lampen. Statusänderungen durch die App werden direkt erkannt.

## Installation

Bei vielen Lampen muss über die Yeelight App die „LAN-Steuerung“ aktiviert werden, bevor sie gefunden und gesteuert werden kann.

![](../../../en/adapterref/iobroker.yeelight-2/admin/lan.jpg)

## Konfiguration

Lampen können manuell hinzugefügt oder gesucht werden. IP, Smartname, Port und Name können angepasst werden. Der Standard-Port ist 55443. Wenn ein Leerzeichen im Namen verwendet wird, wird es durch „\_“ ersetzt.

### smartname

Wird in der Konfiguration ein Smartname angegeben, wird diese Lampe automatisch zum Cloud Adapter hinzugefügt und kann über Alexa gesteuert werden.

### Geräte suchen

Mit dieser Funktion können Lampen automatisch gesucht und hinzugefügt werden. die Suche dauert ca. 20 Sekunden. Danach werden die gefundenen Geräte in der Tabelle aufgelistet.

## Änderungsprotokoll

Das Änderungsprotokoll ist in der Datei [README.md](https://github.com/iobroker-community-adapters/ioBroker.yeelight-2/tree/master?tab=readme-ov-file#changelog) zu finden.