---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.teltonika/README.md
title: ioBroker Teltonika
hash: WNmiokj5Zo5awTiishj342u5m25x9l9t0jqwOclWWxs=
---
![Logo](../../../en/adapterref/iobroker.teltonika/admin/teltonika.png)

![Anzahl der Installationen](http://iobroker.live/badges/teltonika-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.teltonika.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.teltonika.svg)

# IoBroker Teltonika
![Test und Freigabe](https://github.com/ioBroker/ioBroker.teltonika/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/teltonika/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Dieser Adapter liest Daten von Teltonika-Routern über MQTT.
Er kann folgende Informationen auslesen:

- Temperatur ('RUT2', 'RUT9', 'RUTX', 'RUT3', 'RUT1', 'TRB2', 'TRB5', 'OTD', 'RUTM', 'RUTC')
- Signalstärke
- Mobilfunkanbieter
- Netzwerkstatus
- Verbindungstyp (2G/3G/4G)
- WAN-IP-Adresse
- Betriebszeit
- Name
- digitaler Eingang 1 ('RUT9')
- Digitaleingang 2 ('RUT9')
- analoger Eingang ('RUT9', 'TRB2', 'TRB141')
- Pin 2 Status ('TRB2')
- Pin 3 Status ('RUT1', 'RUT2', 'RUT9', 'RUTX', 'RUT3', 'TRB1', 'TRB2', 'TRB5', 'RUTM')
- Status von Pin 4 ('RUT1', 'RUT2', 'RUT9', 'RUTX', 'RUT3', 'TRB1', 'TRB2', 'TRB5', 'RUTM')

## Verwendung
Schritte:

- Starten Sie zuerst die Instanz.
- Gehen Sie zu Ihrem Router und öffnen Sie die MQTT-Einstellungen.

  ![Einstellungen](../../../en/adapterref/iobroker.teltonika/img/settings.png)

- MQTT-Publisher aktivieren
- Legen Sie die MQTT-Broker-Adresse auf die Adresse Ihrer ioBroker-Instanz fest.
- Stellen Sie den MQTT-Broker-Port ein. Wichtig: Der Standardport dieses Adapters ist 1885, um Konflikte mit anderen MQTT-Adaptern zu vermeiden.
- Einstellungen speichern
Bei einigen Routern ist ein Neustart erforderlich, damit die Einstellungen angewendet werden.
Nach einiger Zeit werden die Datenpunkte in der Adapterinstanz erstellt.

**Hinweis**: Getestet wurde nur mit dem Gerät `RUTC`.

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog
### 0.1.0 (2025-12-07)
* (bluefox) Changed roles of the states

### 0.0.2 (2025-12-03)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2025, bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.