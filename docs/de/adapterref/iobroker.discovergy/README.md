---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.discovergy/README.md
title: ioBroker.discovergy
hash: 1Nr1cgwlVRa80FxerZJGSIxk11/GXMQFME3TV9m0Z0U=
---
![Alt-Text](https://raw.githubusercontent.com/DrozmotiX/ioBroker.discovergy/master/admin/Discovergy_logo.png)

![Alt-Text](https://travis-ci.org/DrozmotiX/ioBroker.discovergy.svg?branch=master)
![Anzahl der Installationen](http://iobroker.live/badges/discovergy-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.discovergy.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.discovergy.svg)

# IoBroker.discovergy
Dies ist ein ioBroker-Adapter für Ihr Discovergy-Leistungsmessgerät.
Es nutzt die Discovergy-API, um Daten Ihrer Zähler auszulesen und deren aktuelle Werte mit ioBroker zu synchronisieren.

https://api.discovergy.com/docs/

Bitte fügen Sie gerne ein Problem für Ihre gewünschte Funktionalität oder Probleme hinzu, die Sie sehen, damit ich es mir ansehen kann!

Anmerkung: Ich habe nicht alle möglichen Geräte und auch der Demo-Account stellt nicht alle vorhandenen Werte bereit, die Geräte bieten können.
Wenn Sie die folgende Fehlermeldung erhalten:

Von Discovergy erhaltene Informationen, die noch nicht Teil dieses Adapters sind.“ „Senden Sie diese Informationen an den Entwickler: xxxxx

Bitte gehen Sie zu Ihrer Protokolldatei und laden Sie sie herunter. Erstellen Sie hier auf Github ein Problem mit den bereitgestellten Werten.
Nicht vom Admin-Webinterface kopieren und einfügen, hier fehlen Informationen, die ich benötige!

Sie können diesen Adapter testen, indem Sie die Demo-Anmeldeinformationen von discovergy verwenden (oder mit Ihren eigenen :-)): Benutzername = demo@discovergy.com pass = demo

## Unterstütze mich
Wenn Ihnen meine Arbeit gefällt, können Sie gerne eine persönliche Spende leisten (dies ist ein persönlicher Spendenlink für DutchmanNL, kein Bezug zum ioBroker-Projekt!) [![Spenden](https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Mitwirkende
* AlCalzone
*zoernert

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### __WORK IN PROGRESS__
* (DutchmanNL) Migrate admin settings to JSON config. Fixes #211

### 0.5.13 (2023-10-31)
* (sbeh) Support more characters in login credentials fixes #117, #227

### 0.5.12 (2023-10-29)
* (DutchmanNL) Ignore meters not providing any data (like removed devices) fixes #84

### 0.5.11 (2023-10-27) - Bugfixes
* (DutchmanNL) Error handling improved in cases data processing fails
* (DutchmanNL) Fixes #214 #215 #200 #219 #220 #224 #229 #235 #236 #237 #238 #506 #507

### 0.5.8 (2021-08-17)
* (DutchmanNL) Minor dependency & configuration updates, stable release candidate

### 0.5.7 (2021-03-19)
* (DutchmanNL) Change why of password encryption, you my need to re-enter your credentials !
* (DutchmanNL) Bugfix : State "system.this.discovergy.0.alive" has no existing object, this might lead to an error in future versions

## License
MIT License

Copyright (c) 2023 DutchmanNL

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