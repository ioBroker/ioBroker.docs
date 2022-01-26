---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla-motoren
hash: o04OO9LDv6ceGFyCmuMYEXkwyoaesyhuZY70xjz9wE4=
---
![Logo](../../../en/adapterref/iobroker.tesla-motors/admin/tesla-motors.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.tesla-motors.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)
![Anzahl der Installationen (spätestens)](https://iobroker.live/badges/tesla-motors-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/tesla-motors-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.tesla-motors.svg)
![NPM](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)

# IoBroker.tesla-motoren
**Tests:** ![Testen und freigeben](https://github.com/iobroker-community-adapters/ioBroker.tesla-motors/workflows/Test%20and%20Release/badge.svg)

## Tesla-Adapter für ioBroker
Es werden alle Tesla Modelle und Powerwalls aus der Tesla App angezeigt und aktualisiert.

**Remote Befehle für Tesla und Powerwall sind möglich unter** tesla-motors.0.id.remote

**Loginablauf:**

- In den Instanzoptionen den Auth Link klicken.
- Die Logindaten eingeben und gegebenenfalls Captcha/reCaptcha und MFA eingeben.
- Auf der Seite nicht gefunden Seite die komplette URL aus dem Browser kopieren und in die Instanzoptionen einfügen und auf Speichen und Schließen klicken.
- Die ersten Daten kommen unter Umständen erst nach der ersten Fahrt

**Feld Beschreibung**

- df Fahrer vorne
- dr Fahrer hinten
- pf Beifahrer vorne
- pr Beifahrer hinten
- ft vorderer Kofferraum
- rt Heckkofferraum

[Optionscodes Erklärung](https://tesla-api.timdorr.com/vehicle/optioncodes)

##Fragen und Diskussionen:
https://forum.iobroker.net/topic/47203/test-tesla-motors-v1-0-0

## Changelog

### 1.0.2
* (iobroker-community-adapters) ALLE DATENPUNKTE SIND NEU, Vis muss angepasst werden. Neue Version mit neuen Zuständen für Tesla und Powerwalls.

## License
MIT License

Copyright (c) 2021 iobroker-community

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