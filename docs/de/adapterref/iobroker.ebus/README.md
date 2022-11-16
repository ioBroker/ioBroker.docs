---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ebus/README.md
title: ioBroker.ebus
hash: 5JwxeHhAXaIpDmkqes8qvbpxd9+IpiVI8CrPE9sGl/E=
---
![Logo](../../../en/adapterref/iobroker.ebus/admin/ebus.png)

![Anzahl der Installationen](http://iobroker.live/badges/ebus-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ebus.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.ebus.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/rg-engineering/ioBroker.ebus/badge.svg)
![NPM](https://nodei.co/npm/iobroker.ebus.png?downloads=true)

# IoBroker.ebus
![GitHub-Aktionen](https://github.com/rg-engineering/ioBroker.ebus/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

**Wenn es Ihnen gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

Dieser Adapter liest

- Daten von ebusd mit html

In diesem Fall muss ebusd laufen und Daten an z.B. Explorer über http://IP:port/data (http://192.168.0.123:8889/data) Aktuelle Version von ebusd inkl. Konfigurationsdateien können von https://github.com/john30/ebusd kopiert werden. Alle Felder mit Daten, lastup und aus dem globalen Abschnitt werden geparst. Alle anderen werden im Moment ignoriert.

Es besteht die Möglichkeit, Daten abzufragen, die nicht direkt von ebusd abgefragt werden. Der Befehl 'read -f' wird verwendet, um das Lesen über ebus zu erzwingen.

Eine weitere Funktion besteht darin, einen beliebigen Befehl an ebusd zu senden und eine Antwort zu erhalten, um z. Skripte.

aktuell unterstützte ebusd-version: 22.3

**Achtung** mit ebusd - Version 22.1 Konfigurationspfad wurde auf http://cfg.ebusd.eu/ geändert. Stellen Sie sicher, dass Sie es in Ihrer Installation von ebusd ändern.
Details siehe [Änderungsprotokoll](https://github.com/john30/ebusd/blob/master/ChangeLog.md)

## Wie man Befehle an ebusd sendet
1. Schreiben Sie einen einzelnen Befehl oder eine Befehlsliste auf den Datenpunkt ebus.0.cmd

Wenn Sie mehr als einen Befehl verwenden möchten, verwenden Sie , um einzelne Befehle zu trennen.
Beispiel: read -f YieldTotal, read LegioProtectionEnabled, read -f -c broadcast outsidetemp

2. Wenn der Befehl ausgeführt wird, erhalten Sie die Ergebnisse pro Befehl im Datenpunkt ebus.0.cmdResult

Das Ergebnis ist ebenfalls kommasepariert. Beispiel: 2000, ERR: element not found, 10.5

Achtung: Befehl im Datenpunkt ebus.0.cmd wird nach Ausführung des Befehls gelöscht!

## Bekannte Probleme
* Bitte erstellen Sie Probleme auf [github](https://github.com/rg-engineering/ioBroker.ebus/issues), wenn Sie Fehler finden oder neue Funktionen wünschen

## 2.4.3 (2021-10-21)
* (René) siehe Issue #58: Bugfix für Warn: Ignoriere History-Wert 1 (ungültig)", wenn keine History-Werte gesetzt sind

## 2.4.2 (2021-10-19)
* (René) siehe Ausgabe Nr. 55: Fehlerbehebung

## 2.4.0 (2021-10-17)
* (René) überarbeitete Behandlung von gelesenen Datenpunkten und historischen Datenpunkten, Schaltung optional hinzugefügt
* (René)-Befehl kann jetzt mehr als einen Befehl enthalten, nur getrennte Befehle mit ','
* (René) siehe Issue #55: Warnungen in Debug-Meldungen geändert

## 2.3.2 (2021-09-02)
* (René) siehe Ausgabe Nr. 49: Unterstützung für ebusd 21.2
* (René) siehe Ausgabe Nr. 40: Option zur Verwendung von booleschen Werten anstelle von Zeichenfolgen für Werte mit Ein/Aus
* (René) Abhängigkeiten aktualisiert

## 2.2.7 (2021-07-03)
* (René) Abhängigkeiten aktualisiert
* (René) siehe Issue #48: Bugfix für Logs mit falschem Datentyp

## 2.2.5 (2021-03-21)
* (René) Abhängigkeiten aktualisiert

## 2.2.4 (2021-02-17)
* (René) siehe Issue #42: Uncaught ReferenceError: oView is not defined in widget behoben

## 2.2.3 (2020-10-24)
* (René) History DP erstellen falls nicht vorhanden

## 2.2.0 (2020-09-06)
* (René) DP nur bei Bedarf ändern, um Systemlast zu reduzieren
* (René) Abhängigkeiten aktualisieren

## 2.1.1 (2020-06-27)
* (René) Issue #26: Bugfix: "cmd not found" ist nur Debug-Meldung statt Fehler

## 2.1.0 (2020-06-17)
* (René) Refactoring: 'async/await' verwendet

## 2.0.0 (2020-04-26)
* (René) "Anfrage" ersetzt durch "gebogen"

## 1.0.0 (2019-12-15)
* (René) Update auf meine eigene Flotte 3.0

## 0.8.2 (2019-11-10)
* (René) weitere Fehlermeldungen im Datenpunkt "error"

## 0.8.1 (2019-10-31)
* (René) Flot auf Version 3.0 aktualisieren

### 0.8.0 (2019-02-24)
* (René) hcmode2 Wert 5 = EVU Sperrzeit

### 0.7.0 (2019-01-28)
* (René) einstellbares Timeout hinzufügen

### 0.6.0 (2019-01-06)
* (René) Unterstützung des Kompaktmodus

### 0.5.5 (2018-11-04)
* (René) Code aufräumen

### 0.5.4
* (René) Arduino-Unterstützung entfernt

### 0.5.3
* (René) Fehlerinformationen hinzufügen

### 0.5.2
* (René) Bugfix: in vis 1.x werden einige Werte nicht gespeichert

### 0.5.1
* (René) Fehlerbehebung: Wenn nichts abzufragen ist, dann Telnet-Verbindung überspringen

### 0.5.0
* (René) Daten über TCP nach ebusd schreiben

### 0.4.2
* (René) Bugfix für Admin V3

### 0.4.1
* (René)-Logo geändert

### 0.4.0
* (René) liest Daten von ebusd

### 0.3.0
* (René) Unterstützung von ebusd
* (René) admin3-Unterstützung

### 0.2.0
* (René) Geschichte als JSON für vis hinzufügen
* (René) Flot-basiertes Widget hinzugefügt, um Temperatur-, Status- und Leistungsdiagramm anzuzeigen

### 0.1.0
* (René) geplanter Adapter statt Deamon

### 0.0.3
* (René) UTF8-Codierung

### 0.0.2
* (René) Erstveröffentlichung

## Changelog

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

## License
Copyright (C) <2017 - 2022>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.