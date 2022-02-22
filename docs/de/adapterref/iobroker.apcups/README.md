---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.apcups/README.md
title: ioBroker.apcups
hash: PsNp0J2WZMaXgUdZhR9Qe29ydrcYuGzOxMfZjSauqWY=
---
![Logo](../../../en/adapterref/iobroker.apcups/admin/ups.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.apcups.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.apcups.svg)
![Anzahl der Installationen (neueste)](https://iobroker.live/badges/apcups-installed.svg)
![NPM](https://nodei.co/npm/iobroker.apcups.png?downloads=true)

# IoBroker.apcups
**Tests:** [![Test und Freigabe](https://github.com/xhunter74/ioBroker.apcups/actions/workflows/main.yml/badge.svg)](https://github.com/xhunter74/ioBroker.apcups/actions/workflows/main.yml)

## APC USV-Adapter für ioBroker
Adapter für ioBroker, um Informationen von APS-USVs über apcupsd zu erhalten.

apcupsd-Homepage: http://www.apcupsd.org/

apcupsd ist ein Daemon zur Steuerung von APC-USVs. Mit diesem Adapter können Sie den USV-Status überwachen und einige Entscheidungen basierend auf den bereitgestellten Informationen treffen.

**apcupsd auf Ubuntu installieren:**

sudo apt-get -y install apcupsd

Weitere nützliche Informationen zur apcupsd-Konfiguration für Ubuntu finden Sie unter https://help.ubuntu.com/community/apcupsd

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Changelog

### 0.0.9 (2022-02-21)
 - Changed adapter type
### 0.0.8 (2022-02-18)
 - Fixed review issues
### 0.0.7 (2022-02-18)
 - Changed default log level to 'info'
### 0.0.6 (2022-02-17)
 - Cleanup code.
 - Sentry integration
### 0.0.5 (2022-02-16)
 - Fixed issues with uncaught exception.
### 0.0.4 (2022-01-12)
 - Fixed issue with polling interval greater than 15 sec.
### 0.0.3 (2021-10-18)
 - Fixed parse values bugs.
### 0.0.2 (2021-09-13)
 - Initial commit. Alpha Version. 

### **WORK IN PROGRESS**
* (Author) initial release

## License
MIT License

Copyright (c) 2022 Serhiy Krasovskyy xhunter74@gmail.com"

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