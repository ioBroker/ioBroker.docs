---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.semp/README.md
title: ioBroker.semp
hash: og+ZEsvwoq2JAsLHQe6y4FAdKoJw+cO7ITxLhtSi/VI=
---
![Logo](../../../en/adapterref/iobroker.semp/admin/semp.png)

![Anzahl der Installationen](http://iobroker.live/badges/semp-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.semp.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.semp.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/rg-engineering/ioBroker.semp/badge.svg)
![NPM](https://nodei.co/npm/iobroker.semp.png?downloads=true)

# IoBroker.semp
![GitHub-Aktionen](https://github.com/rg-engineering/ioBroker.semp/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

**Wenn es Ihnen gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

## SMA SEMP-Adapter für ioBroker
Schnittstelle zu SMA SunnyPortal über SunnyHomeManager und SEMP

Fügen Sie Ihre Geräte von ioBroker in SunnyPortal hinzu.
SunnyPortal kann dann Ihren Energieverbrauch besser einschätzen und somit bessere Vorhersagen und Empfehlungen treffen. Sie können Ihre Geräte aber auch über SunnyPortal steuern lassen. Bei ausreichender Sonnenenergie kann das SunnyPortal Ihre Geräte einschalten oder bei zu geringer Sonnenenergie wieder ausschalten. So optimieren Sie Ihren Eigenverbrauch, sind aber nicht auf die wenigen im SunnyPortal unterstützten Geräte angewiesen. Mit dem Adapter lassen sich beliebige Geräte aus dem ioBroker in das SunnyPortal einbinden.
Es muss nicht einmal der Verbrauch eines einzelnen Gerätes gemessen werden. Auch Schätzwerte sind ausreichend.

## Benutzerdokumentation
siehe [Doku](docu/docu_en.md)

Einzelheiten zu Protokoll und Verwendung finden Sie in [SMA Doku](docu/SMA/SEMP-11ZE3315-Specification-1.0.6.pdf).

Eine Beschreibung zur allgemeinen Verwendung von Energieanfragen siehe [SMA Doku](docu/SMA/SSH_KANN-Zeitfenster-TI-de-10.pdf). (nur deutsch)

## Merkmale
* Geräte von ioBroker in SunnyPortal über SMA SEMP hinzufügen
* informiert das SunnyPortal über den aktuellen Verbrauch
* SunnyPortal diese Geräte steuern lassen (einschalten bei genügend PV-Leistung und ausschalten bei zu geringer Solarenergie)

## Anforderungen
* Knoten v16 oder höher

## Bekannte Probleme
* Bitte erstellen Sie Probleme auf [github](https://github.com/rg-engineering/ioBroker.semp/issues), wenn Sie Fehler finden oder neue Funktionen wünschen

## Changelog

### 0.1.0 (2023-01-20)
* (René) wallboxes: see issue #23: wallbox OID can be configured (DP type and set or check value)
* (René) wallboxes: minimum and maximum energy for charging is adjustable by datapoint, default: battery capacity (10% and 100%)
* (René) see issue #24: delete csv logs if older then three days

### 0.0.5 (2022-12-27)
* (René) MinPowerConsumption added
* (René) see issue #20: support of wallboxes

### 0.0.4 (2022-11-07)
* (René) see issue #15: support of more then one time periods for energy requests
* (René) some bug fixes (0.0.3)

### 0.0.2 (2022-10-16)
* (René) threshold for status detection with timer
* (René) csv logger for data to be sent to SHM (for debugging)
* (René) see issue #14: cancel request if device does not turn on
* (René) bug fix issue #19: turn off device at the end of maximum operation time


### 0.0.1 (2022-10-01)
* (René) initial release

## License
MIT License

Copyright (c) 2022-2023 rg-engineering info@rg-engineering.eu

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