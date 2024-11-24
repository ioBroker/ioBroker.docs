---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.semp/README.md
title: ioBroker.semp
hash: 3eKCgekKBWAZFRi0xTm5M+gZjWwArpIfn2sr5r8I5gY=
---
![Logo](../../../en/adapterref/iobroker.semp/admin/semp.png)

![Anzahl der Installationen](http://iobroker.live/badges/semp-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.semp.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.semp.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/rg-engineering/ioBroker.semp/badge.svg)
![NPM](https://nodei.co/npm/iobroker.semp.png?downloads=true)
![Knoten-lts](https://img.shields.io/node/v-lts/iobroker.semp?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.semp?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.semp?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.semp?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.semp?logo=github&style=flat-square)
![Letztes GitHub-Commit](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.semp?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/rg-engineering/ioBroker.semp?logo=github&style=flat-square)

# IoBroker.semp
![GitHub-Aktionen](https://github.com/rg-engineering/ioBroker.semp/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

**Wenn es Ihnen gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

## SMA SEMP-Adapter für ioBroker
Schnittstelle zum SMA SunnyPortal über SunnyHomeManager und SEMP

Fügen Sie Ihre Geräte aus dem ioBroker in SunnyPortal hinzu.
SunnyPortal kann dann Ihren Energieverbrauch besser einschätzen und so bessere Vorhersagen und Empfehlungen treffen. Sie können Ihre Geräte aber auch von SunnyPortal steuern lassen. Bei ausreichender Solarenergie kann das SunnyPortal Ihre Geräte einschalten oder bei zu geringer Solarenergie wieder ausschalten. So optimieren Sie Ihren Eigenverbrauch, sind aber nicht auf die wenigen im SunnyPortal unterstützten Geräte angewiesen. Mit dem Adapter lässt sich jedes beliebige Gerät aus dem ioBroker in das SunnyPortal integrieren.
Es ist nicht einmal notwendig, dass der Verbrauch eines einzelnen Gerätes gemessen wird. Schon geschätzte Werte reichen aus.

## Benutzerdokumentation
siehe [Doku](https://github.com/rg-engineering/ioBroker.semp/blob/master/docu/docu_en.md)

Einzelheiten zu Protokoll und Verwendung finden Sie unter [SMA Doku](https://github.com/rg-engineering/ioBroker.semp/blob/master/docu/SMA/SEMP-11ZE3315-Specification-1.0.6.pdf).

Eine Beschreibung zur generellen Verwendung von Energieanfragen finden Sie unter [SMA Doku](https://github.com/rg-engineering/ioBroker.semp/blob/master/docu/SMA/SSH_KANN-Zeitfenster-TI-de-10.pdf).

## Merkmale
* Geräte vom ioBroker über SMA SEMP in SunnyPortal hinzufügen
* informiert das SunnyPortal über den aktuellen Verbrauch
* diese Geräte über SunnyPortal steuern lassen (einschalten bei ausreichender PV-Leistung und ausschalten bei zu wenig Solarenergie)

## Anforderungen
## Bekannte Probleme
* Bitte erstellen Sie Probleme bei [github](https://github.com/rg-engineering/ioBroker.semp/issues), wenn Sie Fehler finden oder neue Funktionen wünschen

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.4.8 (2024-11-20)
* (René) update dependencies
* (René) issue #317: test with nodejs@22
* (René) issue #329: links to docu updated

### 1.4.7 (2024-09-13)
* (René) see issue #314: bug fix to use express@5.0.0

### 1.4.6 (2024-08-24)
* (René) update dependencies
* (René) bug fixes based on adapter checker recommendation

### 1.4.5 (2024-05-29)
* (René) see issue #250: no Power to be send for devices without measurement in off-status

### 1.4.4 (2024-05-28)
* (René) change of dependencies
* (René) wallbox: check and log wrong value for Wallbox3phaseSwitchDelay only if enabled

### 1.4.3 (2024-02-20)
* (René) wallbox: unnecessary warn messages deactivated
* (René) dependencies updated

### 1.4.2 (2024-02-16)
* (René) bug fix in create timeframes

### 1.4.1 (2024-02-12)
* (René) minor bug fix

### 1.4.0 (2024-02-12)
* (René) bug fix: see issue #206 - wallbox OID's selectable
* (René) bug fix: see issue #207 - wallbox maximum charge time adjustable 
* (René) see issue #208: timeframe can be disabled by user (optionally)

### 1.3.15 (2024-02-03)
* (René) bug fix: wallbox counter and status are not handled

### 1.3.14 (2024-01-12)
* (René) dependencies updated

### 1.3.13 (2023-11-19)
* (René) dependencies updated
* (René) fix exceptions reported by sentry

### 1.3.12 (2023-10-29)
* (René) some bug fixes based on changes in 1.3.11

### 1.3.11 (2023-10-28)
* (René) see issue #30: more OID's can be used with URL for wallbox
* (René) option to set recommnended current instead of power (useful for go-e)

### 1.3.10 (2023-10-03)
* (René) bug fix: removed missing Start() call in wallbox (avoid exception)
* (René) see issue #30: URL can be used to set recommended power to wallbox (attention: still only power, not current as needed for go-e)

### 1.3.9 (2023-09-24)
* (René) see issue #30: bug fix URL as string to be used

### 1.3.8 (2023-09-23)
* (René) see issue #30: URL can now be used directly to get status of wallbox (JSON only)

### 1.3.7 (2023-09-02)
* (René) see issue #30: bug fix for type based status check of wallboxes

### 1.3.6 (2023-08-28)
* (René) see issue #81: smaller bug fixes

### 1.3.5 (2023-08-26)
* (René) see issue #81: wallbox three phase enabler by URL
* (René) see issue #81: wallbox three phase switch time configurable (default 3 minutes)
* (René) see issue #74: check max power consumption added
* (René) dependencies updated

### 1.3.4 (2023-07-30)
* (René) dependencies updated

### 1.3.2 (2023-06-12)
* (René) bug fix: sentry reported exceptions fixed

### 1.3.1 (2023-06-11)
* (René) bug fix: exception in wallbox interface fixed

### 1.3.0 (2023-06-10)
* (René) see #17: additional checks for BaseID
* (René) check BaseId of every DeviceId when adapter starts
* (René) bug fix csv-logging: create file if not exist and complete filename is provided, was working with path name only before
* (René) additional debug: show last timeframe sent to SHM as datapoint for every timeframe

### 1.2.0 (2023-05-29)
* (René) device off at end of maximum running time and latest end overworked; option "Switch Off At End Of Timer" removed

### 1.1.0 (never released)
* (René) issue #30: URL as another option for configuring the wallboy interface

### 1.0.0 (2023-04-07)
* (René) dependencies updated

### 0.4.2 (2023-04-02)
* (René) fast charge is now a boolean and can be enabled/disabled
* (René) wallbox charge time can be defined as 12h, 24h, endles or userdefined

### 0.4.1 (2023-03-24)
* (René) bug fix: avoid exception when no switch is defined for wallbox
* (René) limit to switch between 1phase and 3phase charging of wallbox is adjustable now
* (René) allow one minute disconnected before state change. Sometimes when wallbox switches from 1phase to 3phase it sends "disconnected", but cable is still connected

### 0.4.0 (2023-03-15)
* (René) redesign wallbox feature
* (René) add status ExcessEnergy in timeframes to show when excess energy is used
* (René) bug fix for "cannot read data undefined" when new device was created

### 0.3.1 (2023-02-26)
* (René) issue #27: wallbox fast charging added
* (René) wallbox: some bug fixes

### 0.2.1 (2023-02-17)
* (René) wallboxes: bug fix MinEnergy set to 0

### 0.2.0 (2023-02-16)
* (René) wallboxes: add switch to enable 3phase charge

### 0.1.1 ()
* (René) wallboxes: some bug fixes

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

Copyright (c) 2022-2024 René G. <info@rg-engineering.eu>

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