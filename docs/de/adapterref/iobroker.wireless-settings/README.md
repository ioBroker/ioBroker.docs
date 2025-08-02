---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wireless-settings/README.md
title: ioBroker.wireless-Einstellungen
hash: euDLn4ru6fnpTRHbcoQY/Rf6AFzU4lqb6Kjx03Q3iG0=
---
![Logo](../../../en/adapterref/iobroker.wireless-settings/admin/wireless-settings.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.telemetry.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.telemetry.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/wireless-settings-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/wireless-settings-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/ioBroker/iobroker.wireless-settings.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/ioBroker/ioBroker.wireless-settings/badge.svg)
![NPM](https://nodei.co/npm/iobroker.telemetry.png?downloads=true)

# IoBroker.wireless-Einstellungen
## Adapter für WLAN und Wireless-Einstellungen auf Raspberry Pi
Mit diesem Adapter können Sie die WLAN-Verbindung auf Raspberry Pi einrichten. Er kann zum Verbinden oder Trennen von WLAN-Netzwerken verwendet werden.

**Nur auf Raspberry Pi 5 getestet**

## Erforderliche Berechtigungen
Dieser Adapter geht davon aus, dass der Benutzer `iobroker` die folgenden Befehle ausführen darf:

- `/usr/bin/nmcli`

Sie können die Rechte durch einen Aufruf von:

```shell
sudo chmod +x /opt/iobroker/node_modules/iobroker.wireless-settings/wlan_rights.sh
sudo /opt/iobroker/node_modules/iobroker.wireless-settings/wlan_rights.sh
```

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->

## Changelog
### **WORK IN PROGRESS**

-   (@GermanBluefox) Small layout changes

### 1.0.2 (2024-10-04)

-   (@GermanBluefox) Updated for raspberry 5
-   (@GermanBluefox) Change name to "wireless-settings"

### 0.4.0 (2024-10-03)

-   (@GermanBluefox) Change name to "network-settings"

### 0.3.0 (2023-06-27)

-   (@GermanBluefox) Change name to "network-settings"

### 0.2.2 (2023-06-27)

-   (@GermanBluefox) Updated the GUI to the latest version

### 0.1.0 (2021-01-18)

-   (ioBroker) fixed build scripts

### 0.0.1 (2021-01-18)

-   (ioBroker) initial release

## License

MIT License

Copyright (c) 2021-2024 @GermanBluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.