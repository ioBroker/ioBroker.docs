---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wlanthermo-nano/README.md
title: ioBroker.wlanthermo-nano
hash: jWLdLB/tLzY994bhB0XsoX69BINKX6GfxcsXqGA0BIo=
---
![Logo](../../../en/adapterref/iobroker.wlanthermo-nano/admin/wlanthermo-nano.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.wlanthermo-nano.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.wlanthermo-nano.svg)
![Anzahl der Installationen](https://iobroker.live/badges/wlanthermo-nano-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/wlanthermo-nano-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/DrozmotiX/iobroker.wlanthermo-nano.svg)
![NPM](https://nodei.co/npm/iobroker.wlanthermo-nano.png?downloads=true)

# IoBroker.wlanthermo-nano
**Tests:** ![Testen und freigeben](https://github.com/DrozmotiX/iobroker.wlanthermo-nano/workflows/Test%20and%20Release/badge.svg)

## Wlanthermo-nano-Adapter für ioBroker
[WLANThermo Nano](https://github.com/WLANThermo-nano/WLANThermo_nano_Software/wiki "WLANThermo Nano"), der digitale Vorteil für deinen Grillsport

## Aufbau
Der Adapter kann innerhalb der Admin-Oberfläche installiert und konfiguriert werden.
Bitte geben Sie IP-Adresse, Benutzername und Passwort in der Instanzkonfiguration ein.

## Machen
* [ ] Automatische Geräteerkennung implementieren
* [ ] Pitmaster-Einstellungen optimieren, Zustände im zugehörigen Modus nur schreibbar machen, sonst nur lesbar

## Tritt dem Discord-Server bei, um alles über die ioBroker-WlanThermo-Integration zu diskutieren!
<a href="https://discord.gg/cNAeGjJ"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

## Unterstütze mich
Wenn Ihnen meine Arbeit gefällt, können Sie gerne eine persönliche Spende machen (dies ist ein persönlicher Spendenlink für DutchmanNL, keine Verbindung zum ioBroker-Projekt!) [![Spenden](https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog
### 0.2.1 (2022-06-08) - Initialization error for Nano V1 solved
* (DutchmanNL) Initialization error for Nano V1 solved
* (DutchmanNL) Error logging and reporting improved

### 0.2.0 (2022-06-04) - PitMaster Control & ESP32 support
* (DutchmanNL) Support multiple devices
* (DutchmanNL) Refactor code to TypeScript
* (DutchmanNL) Error/debug logging Improved
* (DutchmanNL) Added data points for features
* (DutchmanNL) Test & Release workflow updated
* (DutchmanNL) Added indicator for connection status
* (DutchmanNL) Reconnecting to offline devices improved
* (DutchmanNL) Allow alarm to be activated / disabled #6
* (DutchmanNL) Allow control of pitmaster & system settings
* (DutchmanNL) Ensure support of all WLANThermo-Nano Devices
* (DutchmanNL) Implemented dropdown menu for Pitmaster to select available profiles
* (DutchmanNL) Added data points for PID profiles including capability to change profile settings

### 0.1.2
* (DutchmanNL) Support multiple devices

### 0.1.1
* (DutchmanNL) Code optimisation
* (DutchmanNL) Implement state_attr.js to handle state options outside of source code
* (DutchmanNL) Optimised state creation in 1 function
* (DutchmanNL) Small cleanups

### 0.1.0
* (DutchmanNL) remove color settngs from pitmaster

### 0.0.9
* (DutchmanNL) optimize pid profile setting

### 0.0.8
* (DutchmanNL) fix post command for pitmaster

### 0.0.7
* (DutchmanNL) State unit fixes
* (DutchmanNL) start integration of pidmaster
* (DutchmanNL) rename  type  to modus for pitmaster

### 0.0.6
* (DutchmanNL) make type and alarm selectable with dropdown

### 0.0.5
* (DutchmanNL) add  capability to change sensors

### 0.0.4
* (DutchmanNL) Fix issue with password set
* (DutchmanNL) Implemented new states for config (reboot/update/checkupdate)
* (DutchmanNL) Change  configuration (way of ip-adress, also dyndns now supported)

### 0.0.3
* (DutchmanNL) implement secure storage of login credentials (required to enable setting changes later)

### 0.0.2
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2019 DutchmanNL <rdrozda86@gmail.com>

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