---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.jablotron/README.md
title: ioBroker.jablotron
hash: CMEXxYFY39TNcpk5hAf2rg27S6rLlofTltTIvwOPegs=
---
![Logo](../../../en/adapterref/iobroker.jablotron/admin/jablotron.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.jablotron.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.jablotron.svg)
![Anzahl der Installationen](https://iobroker.live/badges/jablotron-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/jablotron-stable.svg)
![NPM](https://nodei.co/npm/iobroker.jablotron.png?downloads=true)
![Test und Freigabe](https://github.com/DEV2DEV-DE/ioBroker.jablotron/workflows/Test%20and%20Release/badge.svg)

# ioBroker.jablotron

## Jablotron-Adapter für ioBroker

Stellt eine Verbindung zur Jablotron-Cloud her, um auf Ihr Sicherheitssystem zuzugreifen.

Derzeit ist der Adapter **schreibgeschützt** !

Es ist derzeit nur möglich, die Zustände auszulesen. Die Umschaltung wird später implementiert!

Der Adapter verbindet sich ausschließlich mit der Cloud des Herstellers. Eine Verbindung zur Zentraleinheit über das lokale Netzwerk ist derzeit nicht möglich, da der Hersteller die lokale API nicht bereitstellt.

### Forum

Diskutieren Sie Ihre Testerfahrungen hier: <https://forum.iobroker.net/topic/70798>

## Bekannte Probleme

- Nach aktuellem Kenntnisstand müssen Sensoren, Schalter und andere Geräte als „programmierbares Tor“ konfiguriert werden, um auslesbar zu sein.
- Es gibt Geräte, die als „thermoDevice“ aufgeführt werden sollen, aber die Liste ist bisher leer und konnte daher noch nicht getestet werden.

Melden Sie Fehler, Probleme oder Anfragen bitte als GitHub-Issue: <https://github.com/DEV2DEV-DE/ioBroker.jablotron/issues>

## Hersteller

<https://www.jablotron.com/de/katalog-produktu/alarme/jablotron-100/>

## Wichtiger Hinweis

### Version 0.0.5

Die Speicherung sensibler Daten in der Instanzkonfiguration wurde geändert. Wenn Sie zuvor eine ältere Version < 0.0.5 verwendet haben, müssen Sie Ihr Passwort in den Instanzeinstellungen erneut eingeben.

## Referenzen

- <https://github.com/ioBroker/AdapterRequests/issues/755>
- <https://github.com/hajekmi/myjablotron>
- <https://github.com/fdegier/homebridge-jablotron-alarm>
- <https://github.com/plaksnor/HASS-JablotronSystem>
- <https://github.com/kukulich/home-assistant-jablotron100>

## Changelog
### 0.1.8 (2026-01-20)
* New release including dependabot fixes

### 0.1.7 (2026-01-06)
* Fixed check & bot errors
* Dependencies updated
* Removed deprecated async functions

### 0.1.6 (2025-03-10)
* Dependencies updated

### 0.1.5 (2024-12-04)
* Update to ESlint 9

### 0.1.4 (2024-11-06)
* Updated dependencies

### 0.1.3 (2024-01-31)
* Catch EAI_AGAIN
* Automatic refresh of session-id
* Changed headers to prevent caching
* Catch other HTTP errors

### 0.1.0 (2023-12-10)
* Fixed issue with restarts due to timeouts

### 0.0.7 (2023-12-08)
* Fixed wrong structure in readme

### 0.0.5 (2023-12-06)
* Fixed typo
* Encrypt sensitive data in instance config
* Add min and max for poll interval
* Removed unused code
* Do not create static states in code

### 0.0.4 (2023-12-03)
* Fixed wrong state type for data type 'object'

### 0.0.3 (2023-12-03)
* Implemented improvements mentioned in review

### 0.0.2 (2023-11-30)
* Provide an appropriate role for any state
* Readme extended
* Output 'thermoDevices' in debug log

## License
MIT License

Copyright (c) 2025-2026 DEV2DEV-DE

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