---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ebus/README.md
title: ioBroker.ebus
hash: uC4wzjCD/fuILI8+DqR2WZ+BmA0FdS2hn6Sfym9kRYw=
---
![Logo](../../../en/adapterref/iobroker.ebus/admin/ebus.png)

![Anzahl der Installationen](http://iobroker.live/badges/ebus-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ebus.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.ebus.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/rg-engineering/ioBroker.ebus/badge.svg)
![NPM](https://nodei.co/npm/iobroker.ebus.png?downloads=true)

# IoBroker.ebus
![GitHub-Aktionen](https://github.com/rg-engineering/ioBroker.ebus/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

**Wenn es Ihnen gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

Dieser Adapter liest

- Daten von ebusd unter Verwendung von HTML

In diesem Fall muss ebusd laufen und in der Lage sein, Daten an z.B. Explorer über http://IP:port/data (http://192.168.0.123:8889/data) Aktuelle Version von ebusd inkl. Konfigurationsdateien können von https://github.com/john30/ebusd kopiert werden. Alle Felder mit Daten, Lastup und aus dem globalen Abschnitt werden analysiert. Alle anderen werden im Moment ignoriert.

Es besteht die Möglichkeit, Daten abzufragen, die nicht direkt von ebusd abgefragt werden. Der Befehl „read -f“ wird verwendet, um das Lesen über Ebus zu erzwingen.

Eine weitere Funktion besteht darin, einen beliebigen Befehl an ebusd zu senden und eine Antwort zu erhalten, um z. B. mit Skripte.

aktuell unterstützte ebusd-Version: 23.2

**Achtung** mit ebusd – der Konfigurationspfad der Version 22.1 wurde in http://cfg.ebusd.eu/ geändert. Stellen Sie sicher, dass Sie es in Ihrer ebusd-Installation ändern.
Details siehe [Änderungsprotokoll](https://github.com/john30/ebusd/blob/master/ChangeLog.md)

## Wie man Befehle an ebusd sendet
1. Schreiben Sie einen einzelnen Befehl oder eine Befehlsliste auf den Datenpunkt ebus.0.cmd

Wenn Sie mehr als einen Befehl verwenden möchten, verwenden Sie ,, um einzelne Befehle zu trennen.
Beispiel: read -f YieldTotal, read LegioProtectionEnabled, read -f -c Broadcast Outsidetemp

2. Wenn der Befehl ausgeführt wird, erhalten Sie Ergebnisse pro Befehl im Datenpunkt ebus.0.cmdResult

Das Ergebnis ist ebenfalls durch Kommas getrennt, Beispiel: 2000, ERR: Element nicht gefunden, 10.5

Achtung: Befehl im Datenpunkt ebus.0.cmd wird nach Ausführung des Befehls gelöscht!

## Bekannte Probleme
* Bitte erstellen Sie Probleme bei [github](https://github.com/rg-engineering/ioBroker.ebus/issues), wenn Sie Fehler finden oder neue Funktionen wünschen

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.2.4 (2023-11-19)
* (René) revert back to flat 5.x

### 3.2.3 (2023-11-18)
* (René) dependencies updated
* (René) fix sentry reported exceptions

### 3.2.2 (2023-07-30)
* (René) dependencies updated

### 3.2.1 (2023-04-07)
* (René) dependencies updated

### 3.2.0 (2023-02-11)
* (René) **Attention** polled variables must be set as active in admin now
* (René) search available variables per circuit added in admin
* (René) DP "find" added to force read of all existing datapoints (Attention: might take a while) and update name in data point tree

### 3.1.1 (2023-01-31)
* (René) support ebusd 23.1
* (René) see issue #77: make sure that only one data request is running at the same time

### 3.1.0 (2022-12-01)
* (René) support ebusd 22.4
* (René) see issue #77: Update data point when read-cmd is used
* (René) see issue #78: remove CR, LF in answer from ebusd for DP ebus.0.cmdResult

### 3.0.7 (2022-08-20)
* (René) support ebusd 22.3

### 3.0.6 (2022-08-19)
* (René) bug fix in tooltip in wizard

### 3.0.4 (2022-08-18)
* (René) tooltip in wizard added
* (René) flot and dependencies updated
* (René) errors from ebusd are shown as warning here in adapter, details schould be checked in logs of ebusd
* (René) bug fix in widget: if less data available x axes grid point were not shown
* (René) except null as valid value from ebusd (e.g. to reset CurrentError)

### 3.0.2 (2022-04-02)
* (René) message for installation added

### 3.0.1 (2022-04-02)
* (René) read interval in admin added

### 3.0.0 (2022-04-02)
* (René) **ATTENTION** change from scheduled to daemon adapter
* (René) bent by axios replaced

### 2.5.1 (2021-12-29)
* (René) adjustable retries to send data if arbitration error appeared

### 2.5.0 (2021-12-28)
* (René) see issue #62: support ebusd 21.3

### 2.4.5 (2021-11-07)
* (René) bug fix color of labels in widget

### 2.4.4 (2021-10-30)
* (René) see issue #59: avoid endless loop
* (René) update flot to 4.2.2
* (René) bug fix missing space in command when using circuit name

### 0.8.0 (2019-02-24)
* (René) hcmode2 value 5 = EVU Sperrzeit

### 0.7.0 (2019-01-28)
* (René) add adjustable timeout

### 0.6.0 (2019-01-06)
* (René) support of compact mode

### 0.5.5 (2018-11-04)
* (René) code clean up

### 0.5.4
* (René) arduino support removed

### 0.5.3
* (René) add error information

### 0.5.2
* (René) bug fix: in vis 1.x some values are not stored

### 0.5.1
* (René) bug fix: if nothing to poll then skip telnet connection

### 0.5.0
* (René) write date over TCP to ebusd

### 0.4.2
* (René) bug fix for admin V3

### 0.4.1 
* (René) logo changed

### 0.4.0 
* (René) reading data from ebusd

### 0.3.0 
* (René) support of ebusd 
* (René) admin3 support

### 0.2.0
* (René) add history as JSON for vis
* (René) add flot based widget to display temperatur, status and power graph

### 0.1.0
* (René) scheduled adapter instead of deamon

### 0.0.3
* (René) UTF8 coding

### 0.0.2
* (René) initial release

## License
MIT License

Copyright (c) 2017-2023 rg-engineering info@rg-engineering.eu

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