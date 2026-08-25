---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.opentherm/README.md
title: ioBroker.opentherm
hash: xyaAR0EcyhfwHF8DPjo7OLZrmtVmYd5wn1qiTCLt7vM=
---
![Logo](../../../en/adapterref/iobroker.opentherm/admin/opentherm.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.opentherm.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.opentherm.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/opentherm-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/opentherm-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/DrozmotiX/ioBroker.opentherm.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/DrozmotiX/ioBroker.opentherm/badge.svg)
![NPM](https://nodei.co/npm/ioBroker.opentherm.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/DrozmotiX/iobroker.opentherm/master.svg)

# IoBroker.opentherm
Dieser Adapter integriert alle Funktionen des OpenTherm-Gateways in ioBroker. OpenTherm ist ein Gateway-Protokoll, das von verschiedenen modernen Heizsystemen wie Remeha verwendet wird.

## Wächter
**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Weitere Informationen finden Sie unter http://otgw.tclcode.com/index.html#intro. Alle Rechte liegen bei den Entwicklern.

### Ausgewählte Funktionen im Endzustand:
* Bereitstellung eines TCP/IP-Relay-Servers, um anderen OpenTherm-Monitor-Software-Verbindungen über diese Instanz zu ermöglichen (bei Verwendung einer direkten USB-Verbindung)
* Passen Sie nach Möglichkeit die Werte in ioBroker an und senden Sie einen Befehl an Opentherm.
* Gerne können Sie Funktionswünsche hinzufügen.

### Aktuell implementiert
* Verbindung zum OpenTherm Gateway über TCP/IP
* Direkte Verbindung zum OpenTherm Gateway über USB-Anschluss

## Aufgaben
* Direkte Verbindung zum OpenTherm Gateway über USB
* Bereitstellung eines TCP/IP-Relay-Servers, um anderen OpenTherm-Monitor-Software-Verbindungen über diese Instanz zu ermöglichen (bei Verwendung einer direkten USB-Verbindung)
* Wo

## Unterstützt mich
Wenn Ihnen meine Arbeit gefällt, freue ich mich über eine persönliche Spende (dies ist ein persönlicher Spendenlink für DutchmanNL, er steht in keiner Verbindung zum ioBroker-Projekt!). [![Spenden](https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog

### __WORK IN PROGRESS__
* (DutchmanNL) Maintenance: raise Node.js to 22, modernise CI and release tooling, update dependencies, resolve repository checker findings

### 0.2.5 (2022-07-23) - Message library updated
* (DutchmanNL) Message library updated

### 0.2.4 (2022-07-23) - Installation issues solved
* (DutchmanNL) Update dependency's & SerialPort compatibility

### 0.2.3
* Adapter fully rebuild

### 0.2.2
* Fix read TCP/IP data (svenp)

### 0.2.1
* Fix translations

### 0.1.9
* Implemented direct connection by USB
* added configuration options to adapter settings
* Fixed issue for incorrect logging

### 0.1.8
* Fixed issue for incorrect object type (boolean/number/string)
* Implemented rounding states to 1 digit after comma

### 0.1.7
* implemented Developer mode (all states for all message types will be created in _Dev
* Implemented Developer Logging mode (if not activated no information is written to log !)
* Several small backend fixes

### 0.1.6
* Creation of logical channels
* creation of states
* reduced logging, all received messages still in log during beta for data gathering
* creation of definition file (please feel free to provide input)

### 0.1.0
* Data reading by TCP connection to logfile 

### 0.0.1
* (Dutchman) initial commit

## License
MIT License

Copyright (c) 2025 DutchmanNL <rdrozda86@gmail.com>

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