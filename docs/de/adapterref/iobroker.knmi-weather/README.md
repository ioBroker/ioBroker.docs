---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.knmi-weather/README.md
title: ioBroker.knmi-weather
hash: 0R/wNtjz4kkUJDsvC8B9fxp3+luHbvhkJfU5G80ALE4=
---
![Logo](../../../en/adapterref/iobroker.knmi-weather/admin/knmi-weather.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.knmi-weather.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.knmi-weather.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/knmi-weather-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/knmi-weather-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/DrozmotiX/ioBroker.knmi-weather.svg)
![NPM](https://nodei.co/npm/ioBroker.knmi-weather.png?downloads=true)

# IoBroker.knmi-weather
![Test und Freigabe](https://github.com/DrozmotiX/ioBroker.coronavirus-statistics/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## KNMI-Wetterdaten und -Alarme für ioBroker
KNMI stellt eine API bereit, deren Daten alle 10 Minuten auf Basis aller vom Institut erfassten Sensordaten aktualisiert werden.
Dieser Adapter ermöglicht das Auslesen dieser API (Registrierung erforderlich!) und speichert alle relevanten Werte in benutzerfreundlichen Formaten zur Weiterverarbeitung in Benachrichtigungen (z. B. Telegram/Pushover) oder Visualisierungen.

Die API kann bis zu 300 Mal pro Tag kostenlos genutzt werden, daher wird der Adapter alle 5 Minuten gestartet.

Folgende Daten stehen zur Verfügung:

* Wetteralarme
* Aktuelle Klimabedingungen
* Wettervorhersage für heute, morgen und übermorgen
* Aktuelle Regenradar-Karten bereitgestellt von "[Buienradar](https://www.buienradar.nl)"

Die Standortdaten beziehen sich auf GPS-Koordinaten, die in der Administratorkonfiguration gespeichert sind.

Weitere Informationen finden Sie unter: http://weerlive.nl/index.php Ihren kostenlosen API-Schlüssel erhalten Sie hier: http://weerlive.nl/delen.php

## Unterstützt mich
Wenn Ihnen meine Arbeit gefällt, freue ich mich über eine persönliche Spende (dies ist ein persönlicher Spendenlink für DutchmanNL, er steht in keiner Verbindung zum ioBroker-Projekt!). [![Spenden](https://raw.githubusercontent.com/DrozmotiX/ioBroker.knmi-weather/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (DutchmanNL) Maintenance: raise Node.js to 22, modernise CI and release tooling, update dependencies, resolve repository checker findings

### 1.0.2 (2021-08-30) - Optimize error message in case API limit is reached
* (DutchmanNL) Optimize error message in case API limit is reached

### 1.0.1 (2021-08-17)
* (DutchmanNL) Add support for windrgr
* (DutchmanNL) Minor fixes & dependency updates

### 1.0.0 (2020-09-15)
* (DutchmanNL) Final version release
* (DutchmanNL) Bugfixes

### 0.2.1
* (DutchmanNL) Updated dependency's
* (DutchmanNL) Release to stable repository
* (DutchmanNL) Bugfix : Solve incorrect Latitude/Longtitude configuration

### 0.2.0
* (DutchmanNL) improve propper adapter termination instead of guessing by timer
* (DutchmanNL) Release to stable repository

### 0.1.1
* (DutchmanNL) implement states for RainRadar

### 0.1.0
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2020-2026 DutchmanNL <rdrozda@hotmail.com>

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