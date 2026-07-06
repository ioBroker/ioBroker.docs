---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wireless-settings/README.md
title: ioBroker.wireless-settings
hash: zSAWcaG2UiXMtmzLDrhD8+mBgQxOlaYOW/2HfpXdz2E=
---
![Logo](../../../en/adapterref/iobroker.wireless-settings/admin/wireless-settings.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.telemetry.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.telemetry.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/wireless-settings-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/wireless-settings-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/ioBroker/iobroker.wireless-settings.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/ioBroker/ioBroker.wireless-settings/badge.svg)
![NPM](https://nodei.co/npm/iobroker.telemetry.png?downloads=true)

# IoBroker.wireless-settings
## Adapter für Wi-Fi- und Ethernet-Einstellungen auf Raspberry Pi / Linux
Dieser Fork kann Netzwerkschnittstellen konfigurieren, die vom NetworkManager verwaltet werden.

### Unterstützte Funktionen
- WLAN-Netzwerke verbinden und trennen
- Aktuelle Schnittstelleninformationen anzeigen (IPv4/IPv6, Gateway, DNS)
- Ethernet-IPv4-Einstellungen ändern
- Ändern der IPv4-Einstellungen aktiver WLAN-Profile
- Umschalten zwischen DHCP- und statischer IPv4-Konfiguration
- Subnetzmaske/Präfix, Gateway und DNS-Server konfigurieren

**Die getestete Logik basiert auf `nmcli` / NetworkManager.**

## Erforderliche Berechtigungen
Dieser Adapter setzt voraus, dass der Benutzer `iobroker` den folgenden Befehl ausführen kann:

- `/usr/bin/nmcli`

Sie können die Rechte hinzufügen, indem Sie Folgendes aufrufen:

```shell
sudo chmod +x /opt/iobroker/node_modules/iobroker.wireless-settings/wlan_rights.sh
sudo /opt/iobroker/node_modules/iobroker.wireless-settings/wlan_rights.sh
```

## Notizen
- Das Anwenden neuer Netzwerkeinstellungen kann die aktuelle Administratorverbindung kurzzeitig unterbrechen.
- Wenn sich die Geräte-IP-Adresse ändert, öffnen Sie ioBroker Admin mit der neuen Adresse erneut.
- Für Ethernet-Schnittstellen ohne vorhandenes Profil erstellt der Adapter automatisch ein dediziertes NetworkManager-Profil.

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog
### 1.2.2 (2026-04-19)

- Detect docker

### 1.2.1 (2026-04-19)

- Added editable Ethernet and IPv4 settings in the Admin UI
- Added DHCP/static IPv4 switching with subnet, gateway and DNS handling
- Improved command execution by using argument-based process calls instead of raw shell strings
- Migrated GUI to vite

### 1.0.2 (2024-10-04)

- (@GermanBluefox) Updated for raspberry 5
- (@GermanBluefox) Change name to "wireless-settings"

### 0.4.0 (2024-10-03)

- (@GermanBluefox) Change name to "network-settings"

### 0.3.0 (2023-06-27)

- (@GermanBluefox) Change name to "network-settings"

### 0.2.2 (2023-06-27)

- (@GermanBluefox) Updated the GUI to the latest version

### 0.1.0 (2021-01-18)

- (ioBroker) fixed build scripts

### 0.0.1 (2021-01-18)

- (ioBroker) initial release

## License

MIT License

Copyright (c) 2021-2026 @GermanBluefox <dogafox@gmail.com>

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