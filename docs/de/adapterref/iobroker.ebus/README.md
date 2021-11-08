---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ebus/README.md
title: ioBroker.ebus
hash: 1ahOGAFjQ9aWMdBggyYXYcPi2WGo/G0LX9Dkdl2fsfc=
---
![Logo](../../../en/adapterref/iobroker.ebus/admin/ebus.png)

![Anzahl der Installationen](http://iobroker.live/badges/ebus-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ebus.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.ebus.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/rg-engineering/ioBroker.ebus/badge.svg)
![NPM](https://nodei.co/npm/iobroker.ebus.png?downloads=true)

#ioBroker.ebus
![GitHub-Aktionen](https://github.com/rg-engineering/ioBroker.ebus/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Dokumentation zum Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

**Wenn es Ihnen gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

Dieser Adapter liest

- Daten von ebusd mit html

In diesem Fall muss ebusd laufen und Daten an z.B. explorer über http://IP:port/data (http://192.168.0.123:8889/data) Aktuelle Version von ebusd inkl. Konfigurationsdateien können von https://github.com/john30/ebusd kopiert werden Alle Felder mit Daten, Lastup und aus dem globalen Abschnitt werden geparst. Alle anderen werden im Moment ignoriert.

Es besteht die Möglichkeit Daten abzufragen, die nicht direkt von ebusd abgefragt werden. Der Befehl 'read -f' wird verwendet, um das Lesen über ebus zu erzwingen.

Eine weitere Funktion besteht darin, einen beliebigen Befehl an ebusd zu senden und eine Antwort zu erhalten, um z. Skripte.

aktuell unterstützte ebusd-Version: 21.2

## Wie man Befehle an ebusd sendet
1. Schreiben Sie einen einzelnen Befehl oder eine Befehlsliste auf den Datenpunkt ebus.0.cmd

Wenn Sie mehr als einen Befehl verwenden möchten, verwenden Sie , um einzelne Befehle zu trennen.
Beispiel: read -f YieldTotal,read LegioProtectionEnabled,read -f -c Broadcast außerhalbtemp

2. Wenn der Befehl ausgeführt wird, erhalten Sie Ergebnisse pro Befehl im Datenpunkt ebus.0.cmdResult

Das Ergebnis ist auch durch Kommas getrennt Beispiel: 2000, ERR: Element not found, 10.5

Achtung: Befehl im Datenpunkt ebus.0.cmd wird nach Ausführung des Befehls gelöscht!

## Bekannte Probleme
* Bitte erstellen Sie Probleme unter [github](https://github.com/rg-engineering/ioBroker.ebus/issues), wenn Sie Fehler finden oder neue Funktionen wünschen

## 2.4.3 (2021-10-21)
* (René) siehe Problem #58: Bugfix für Warn: Ignorieren des Verlaufswerts 1 (ungültig)", wenn keine Verlaufswerte gesetzt sind

## 2.4.2 (2021-10-19)
* (René) siehe Ausgabe #55: Fehlerkorrektur

## 2.4.0 (2021-10-17)
* (René) Überarbeitung von gelesenen Datenpunkten und historischen Datenpunkten, Schaltung optional hinzugefügt
* (René) Befehl kann jetzt mehr als einen Befehl enthalten, nur Befehle mit ',' trennen
* (René) siehe Ausgabe #55: Warnungen in Debug-Meldungen geändert

## 2.3.2 (2021-09-02)
* (René) siehe Ausgabe #49: Unterstützung für ebusd 21.2
* (René) siehe Problem #40: Option, Boolean statt String für Werte mit on/off zu verwenden
* (René) Abhängigkeiten aktualisiert

## 2.2.7 (2021-07-03)
* (René) Abhängigkeiten aktualisiert
* (René) siehe Issue #48: Bugfix für falsche Datentyp-Logs

## 2.2.5 (2021-03-21)
* (René) Abhängigkeiten aktualisiert

## 2.2.4 (2021-02-17)
* (René) siehe Issue #42: Uncaught ReferenceError: oView ist nicht im Widget definiert gelöst

## 2.2.3 (2020-10-24)
* (René) History DP erstellen falls nicht vorhanden

## 2.2.0 (2020-09-06)
* (René) DP nur bei Bedarf ändern, um die Systemlast zu reduzieren
* (René) Update-Abhängigkeiten

## 2.1.1 (2020-06-27)
* (René) Issue #26: Bugfix: "cmd not found" ist nur Debug-Meldung statt Fehler

## 2.1.0 (2020-06-17)
* (René) Refactoring: 'async/await' verwendet

## 2.0.0 (26.04.2020)
* (René) "Anfrage" ersetzt durch "gebogen"

## 1.0.0 (2019-12-15)
* (René) Update auf meinen eigenen Flot 3.0

## 0.8.2 (2019-11-10)
* (René) noch einige Fehlermeldungen im Datenpunkt "error"

## 0.8.1 (2019-10-31)
* (René) Flot auf Version 3.0 aktualisieren

### 0.8.0 (24.02.2019)
* (René) hcmode2 Wert 5 = EVU Sperrzeit

### 0.7.0 (2019-01-28)
* (René) einstellbares Timeout hinzufügen

### 0.6.0 (2019-01-06)
* (René) Unterstützung des Kompaktmodus

### 0.5.5 (2018-11-04)
* (René) Code-Bereinigung

### 0.5.4
* (René) Arduino-Unterstützung entfernt

### 0.5.3
* (René) Fehlerinformationen hinzufügen

### 0.5.2
* (René) Bugfix: in vis 1.x werden einige Werte nicht gespeichert

### 0.5.1
* (René) Bugfix: Wenn nichts abzufragen ist, dann überspringe die Telnet-Verbindung

### 0.5.0
* (René) Datum über TCP nach ebusd schreiben

### 0,4.2
* (René) Bugfix für Admin V3

### 0.4.1
* (René) Logo geändert

### 0.4.0
* (René) liest Daten von ebusd

### 0.3.0
* (René) Unterstützung von ebusd
* (René) admin3-Unterstützung

### 0.2.0
* (René) füge Verlauf als JSON für vis hinzu
* (René) Flot-basiertes Widget hinzufügen, um Temperatur-, Status- und Leistungsdiagramm anzuzeigen

### 0.1.0
* (René) geplanter Adapter statt Dämon

### 0.0.3
* (René) UTF8-Codierung

### 0.0.2
* (René) Erstveröffentlichung

## Changelog

## License
Copyright (C) <2017 - 2021>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.