---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sbfspot/README.md
title: ioBroker.sbfspot
hash: Nu1nQOSXWDiKNtL/Z0rrhwfFTJzjxTb5rRgmBUpy9xk=
---
![Logo](../../../en/adapterref/iobroker.sbfspot/admin/sbfspot.png)

![Anzahl der Installationen](http://iobroker.live/badges/sbfspot-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sbfspot.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sbfspot.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/rg-engineering/ioBroker.sbfspot/badge.svg)
![NPM](https://nodei.co/npm/iobroker.sbfspot.png?downloads=true)

# IoBroker.sbfspot
![GitHub-Aktionen](https://github.com/rg-engineering/ioBroker.sbfspot/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

**Wenn es Ihnen gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

Dieser Adapter liest mit sbfspot Daten von SMA Wechselrichtern aus.
Jetzt werden beide Datenbanktypen (mySQL und sqlite) unterstützt.
Seit Version 0.2.3 steht ein eigenes vis-Widget basierend auf Flot zur Verfügung, um historische Daten anzuzeigen.

## Installation
Bitte folgen Sie den Installationsanweisungen für sbfspot unter https://github.com/SBFspot/SBFspot/wiki

[detaillierte Installation auf armbasierten Systemen](docs/en/install_arm.md)

## Hinweise
* Verwenden Sie die neueste Version von sbfspot von https://github.com/SBFspot/SBFspot
* Adapter, sbfspot und Datenbanken (mySQL oder sqlite) müssen auf demselben System laufen, z. Himbeer-PI
* Installationshandbuch für sbfspot auf Raspberry Pi (oder ähnlich) finden Sie unter https://github.com/SBFspot/SBFspot/wiki/Installation-Linux-SQLite oder https://www.rg-engineering.eu/index. php/produkte/software/plugin-fuer-iobroker-sbfspot
* Für Raspberry Pi gibt es ein halbautomatisches Konfigurationstool unter https://github.com/SBFspot/sbfspot-config

## Bekannte Probleme
* Manchmal schlägt die Installation des npm-Pakets sqlite3 fehl.

Installieren Sie in diesem Fall alle npm-Pakete neu

> cd /opt/iobroker/node_modules/iobroker.sbfspot > sudo npm install

Manchmal muss npm intall mehr als einmal aufgerufen werden, um alle erforderlichen Pakete erfolgreich zu installieren

* Bitte erstellen Sie Probleme auf [github](https://github.com/rg-engineering/ioBroker.sbfspot/issues), wenn Sie Fehler finden oder neue Funktionen wünschen

## 4.0.4 (2021-02-14)
* (René) Abhängigkeiten aktualisiert

## 4.0.3 (2021-01-15)
* (René) Fehlerbehebung basierend auf CI-Tests

## 4.0.2 (2020-10-09)
* (René) Fehlerbehebung basierend auf CI-Tests

## 4.0.0 (2020-07-28)
* (René) überarbeitet, um async/await zu verwenden
* (René) verwende mysql2

## 3.0.0 (2020-04-25)
* (René) sqlite3-Paket durch better-sqlite3 ersetzt
* (René) Rollen von DP überarbeitet
* (René) siehe Ausgabe Nr. 19: Daten nur erhalten, wenn Tageslicht als Option hinzugefügt wird
* (René) siehe Issue #29: Standardfarbe für Widget-Achsenbeschriftung geändert
* (René)-Widget: Log, wenn Widget zu klein ist hinzugefügt

## 2.4.3 (2020-04-02)
* (René) Bugfix in DB_CalcHistory_Today für Widget verwendet

## 2.4.2 (2020-02-01)
* (René) Bugfix-Widget

## 2.4.0 (2019-12-28)
* (René) Update auf meine eigene Flotte 3.0

## 2.3.4 (2019-10-31)
* (René) Flot auf Version 3.0 aktualisieren

### 2.3.3 (2019-02-03)
* (René) Downgrade des sqlite3-Pakets aufgrund von Installationsproblemen

### 2.3.1 (2019-02-02)
* (René) Bugfix: bei sqlite wurden "heute"-Daten nicht angezeigt

### 2.3.0 (2019-01-20)
* (René) Unterstützung des Kompaktmodus
* (René) zusätzliche Fehlerinformationen im Protokoll hinzufügen

### 2.2.5 (2018-11-26)
* (René) Upgrade-Pakete

### 2.2.5 (2018-11-04)
* (René) Rendite zurücksetzen, falls kein neuer Wert von heute

### 2.2.4 (2018-08-19)
* (René) Bugfix für Ticks auf X

### 2.2.3
* (René) wie 2.2.2

### 2.2.2
* (René) Zeitstempel der letzten Aktualisierung hinzugefügt

### 2.2.1
* (René) Schließung der Datenbankverbindung, nachdem das letzte Abfrageergebnis verfügbar ist (z. B. um mehr als einen Wechselrichter zu unterstützen)

### 2.2.0
* (Nis) Hintergrundfarbe und Rahmen
* (René) Fehlerbehebungen in admin3

### 2.1.0
* (René) MariaDB unterstützen

### 2.0.1
* (René) Unterstützung von admin3

### 2.0.0
* (René) da wir immer einen Graphen pro Widget verwenden, wird jetzt nur noch einer unterstützt

Achtung: Widget ist nicht kompatibel mit Version 1.x.x; Überprüfen Sie einfach die Einstellungen im Widget nach der Installation!

### 1.1.0
* (René) Autoskalierung der y-Achse
* (René) Farbe für y-Achse
* (René) einstellbares Datumsformat

### 1.0.1
* (René) Bugfix für sqlite

### 1.0.0
* (René) erste stabile Veröffentlichung

### 0.2.6
* (René) Bugfix für Android-App > 1.0.6

### 0.2.5
* (René) Verwenden Sie das Installationsdatum, um historische Werte zu berechnen

### 0.2.4
* (René)-Logo geändert

### 0.2.3
* (René) fügt historische Daten als Datenpunkt hinzu (JSON)
* (René) Neues Vis-Widget zur Anzeige historischer Daten

### 0.2.2
* (René) umbenannt in sbfspot

### 0.2.1
* (René) index.html aktualisiert

### 0.2.0
* (René) Unterstützung von sqlite und Lizenz auf MIT geändert

### 0.1.1
* (René) UTF8-Codierung

### 0.1.0
* (René) Erstveröffentlichung

### 0.0.1
* (René) Erstveröffentlichung

## Changelog

### 4.1.4 (2023-04-07)
* (René) dependencies updated

### 4.1.3 (2023-01-31)
* (René) dependencies updated

### 4.1.2 (2022-08-20)
* (René) bug fix in AddObject 

### 4.1.1 (2022-08-18)
* (René) tooltip in wizard added
* (René) flot and dependencies updated

### 4.0.8 (2021-07-11)
* (René) bug fix color of labels in widget

### 4.0.7 (2021-10-30)
* (René) see issue #62: avoid endless loop
* (René) update flot to 4.2.2

### 4.0.6 (2021-07-09)
* (René) bug fix data types

### 4.0.5 (2021-03-21)
* (René) dependencies updated

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