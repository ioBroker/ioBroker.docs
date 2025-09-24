---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.discovergy/README.md
title: ioBroker.discovergy
hash: JrTgb6QHbY0ilsnijYvzoCe9QUeb4wCl0Zi3TKn78kc=
---
![Alternativtext](https://raw.githubusercontent.com/DrozmotiX/ioBroker.discovergy/master/admin/Discovergy_logo.png)

![Alternativtext](https://travis-ci.org/DrozmotiX/ioBroker.discovergy.svg?branch=master)
![Anzahl der Installationen](http://iobroker.live/badges/discovergy-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.discovergy.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.discovergy.svg)

# IoBroker.discovergy
Dies ist ein ioBroker-Adapter für Ihren Discovergy-Stromzähler.
Er nutzt die Discovergy-API, um die Daten Ihrer Zähler zu lesen und die aktuellen Werte mit ioBroker zu synchronisieren.

https://api.discovergy.com/docs/

Fügen Sie gerne ein Problem für die von Ihnen gewünschte Funktionalität oder die Probleme hinzu, die Sie sehen, damit ich es mir ansehen kann!

Hinweis: Ich verfüge nicht über alle möglichen Geräte und auch das Demo-Konto bietet nicht alle Werte, die vorhandene Geräte bereitstellen können.
Wenn Sie die folgende Fehlermeldung erhalten:

Von Discovergy erhaltene Informationen, die noch nicht Teil dieses Adapters sind" "Senden Sie diese Informationen an den Entwickler: xxxxx

Bitte gehen Sie zu Ihrer Protokolldatei und laden Sie sie herunter. Erstellen Sie hier auf GitHub ein Problem mit den angegebenen Werten.
Nicht aus der Admin-Weboberfläche kopieren und einfügen, hier fehlen die Informationen, die ich brauche!

Sie können diesen Adapter testen, indem Sie die Demo-Anmeldeinformationen von discovergy verwenden (oder mit Ihren eigenen :-)): Benutzername = demo@inexogy.com Passwort = Demo

## Unterstütze mich
Wenn Ihnen meine Arbeit gefällt, können Sie gerne eine persönliche Spende leisten (dies ist ein persönlicher Spendenlink für DutchmanNL, keine Verbindung zum ioBroker-Projekt!) [![Spenden](https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Mitwirkende
* AlCalzone
* zoernert

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (DutchmanNL) **ENHANCED**: Updated GitHub Copilot instructions to latest template version 0.4.0 with comprehensive testing framework patterns and enhanced development guidelines. Fixes #287
* (DutchmanNL) **FIXED**: Repository checker issues - deprecated methods replaced and VSCode configuration improved
* (DutchmanNL) **ENHANCED**: VSCode IntelliSense support for io-package.json and package.json validation
* (DutchmanNL) **NEW**: Added comprehensive API testing with demo credentials to ensure adapter reliability
* (DutchmanNL) **FIXED**: Critical bug where adapter would always show "credentials missing" even with valid credentials - now properly validates user login
* (DutchmanNL) **ENHANCED**: Demo testing now includes proper password encryption matching ioBroker admin interface behavior
* (DutchmanNL) **TESTING**: New `npm run test:integration-demo` command validates full API connectivity with working demo credentials (`demo@inexogy.com` / `demo`)
* (DutchmanNL) **CI/CD**: Automated testing ensures adapter connects properly to Discovergy/Inexogy API and initializes meters successfully

### 0.6.0 (2024-12-04) - API change to Inexogy
* (DutchmanNL) Bugfix: API change to Inexogy. Fixes #249
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

## License
MIT License

Copyright (c) 2025 DutchmanNL

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