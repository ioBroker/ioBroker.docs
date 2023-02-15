---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.iceroad/README.md
title: ioBroker.iceroad
hash: GT3Yk8VYljDheJHLZ3CbH/9itm9a7YYSffuTbSfGcCs=
---
![Logo](../../../en/adapterref/iobroker.iceroad/docs/de/img/iceroad.png)

![Anzahl der Installationen](http://iobroker.live/badges/iceroad-installed.svg)
![Aktuelle Version im stabilen Repository](http://iobroker.live/badges/iceroad-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.iceroad.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.iceroad.svg)

# IoBroker.iceroad
![Testen und freigeben](https://github.com/iobroker-community-adapters/iobroker.iceroad/workflows/Test%20and%20Release/badge.svg) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.iceroad/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.iceroad/actions/workflows/codeql.yml)

## Dokumentation
Voraussichtlich zur vereisten Frontscheibe</br> Bitte die API hier beantragen: https://www.eiswarnung.de/rest-api/ </br>

Windschutzscheibenvorhersage</br> Bitte API hier anfordern: https://www.eiswarnung.de/rest-api/ </br> </br> 🇩🇪 [Dokumentation](docs/de/iceroad.md)</br> 🇬🇧 §§ LLLLL_1§§</br>

## Diskussion und Fragen
[ioBroker-Forum](https://forum.iobroker.net/topic/50041/test-adapter-ice-road)</br>

## Ice-Road-Adapter für ioBroker
Hierbei handelt es sich um einen Fahrplanadapter, der über https://eiswarnung.de die aktuelle Eissituation z.B. jede Stunde.
Anhand von Klima- und Wetterdaten für Ihren Standort berechnen sie am Vorabend, ob am nächsten Morgen in Ihrer Nähe vereiste Fenster zu erwarten sind. Der optimale Zeitpunkt für die Abfrage ist 8-10 Stunden im Voraus. Wenn Sie um 8 Uhr das Haus verlassen möchten, verwenden Sie am besten eine Vorhersage von 22-24 Uhr am Vorabend Benachrichtigung möglich. Derzeit gibt es mehrere integrierte Benachrichtigungsdienste (Telegram, Pushover, WhatsApp, E-Mail, Jarvis, Lovelace, SynoChat). Wenn der Status auf „Kein Eis“ geändert wird, erhalten Sie ebenfalls eine Benachrichtigung. Außerdem ist es möglich, sich erinnern zu lassen, wenn der Status „Eis“ und „Vielleicht Eis“ länger als X Stunden ansteht. (Kann in der Konfiguration eingestellt werden). Ansonsten stehen diverse Datenpunkte zur Weiterverarbeitung zur Verfügung.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.3 (2023-01-20)

-   (ciddi89) Bugfix: reminder doesn't work correctly
-   (ciddi89) Added: name and type for channel folders
-   (ciddi89) Other: Small code improvements

### 1.1.2 (2022-12-23)

-   (ciddi89) handling if no data was received added

### 1.1.1 (2022-12-18)

-   (ciddi89) changed order in table of longitude and latitude

### 1.1.0 (2022-12-18)

-   (ciddi89) added handling for wrong location data (comma to fullstop)
-   (ciddi89) added functionality for reminder notification
-   (ciddi89) updated readme

### 1.0.0 (2022-12-17)

-   (ciddi89) fixed issue messages wasn't sent
-   (ciddi89) increased timeout
-   (ciddi89) BREAKING CHANGE -> rebuild adapter complete. Please save your data and delete the instance before update
-   (ciddi89) drop support for admin 5

### 0.1.1 (2022-10-01)

-   (Apollon77) Make sure adapter stops when he is done

### 0.1.0

-   (Patrick Walther) add locations, add pushover/telegram/mail

### 0.0.1

-   (Patrick Walther) initial release

## License

The MIT License (MIT)

Copyright (c) 2023 Patrick Walther walther-patrick@gmx.net

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