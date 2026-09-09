---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.cul/README.md
title: ioBroker.cul
hash: iuC5sWZgWcjohSQ+O7Jp2ALARtgxkY7u6qOQDzUxfMQ=
---
![Logo](../../../en/adapterref/iobroker.cul/admin/busware.jpg)

![Anzahl der Installationen](http://iobroker.live/badges/cul-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.cul.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.cul.svg)

# ioBroker.cul

![Test und Freigabe](https://github.com/ioBroker/ioBroker.cul/workflows/Test%20and%20Release/badge.svg)
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/cul/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Einzelheiten und Informationen zur Deaktivierung der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

ioBroker-Adapter zur Steuerung von FS20, Max!, HMS und anderen Geräten über [CUL](http://busware.de/tiki-index.php?page=CUL) /
[culfw](http://culfw.de)Hängt davon ab <https://github.com/hobbyquaker/cul>

## Unterstützte Geräte

- _EM_ - EM1000WZ, EMWZ
- _FS20_, inkl. ESA1000/2000
- _HMS_ - HMS100-TF, HMS100-T, HMS100-WD, RM100-2, HMS100-TFK, HMS100-MG, HMS100-CO, HMS100-FIT
- _MORITZ_ - MAX!
- _WS_ - KS300TH, S300TH, WS2000/WS7000

## Anleitung

### Senden Sie einen Befehl an ein FS20-Gerät, z. B. in JavaScript.

`sendTo("cul.0", "send", {"protocol":"FS20", "housecode":"A1B2", "address":"01", "command":"00"});`

### Senden Sie einen Rohbefehl (z. B. an ein InterTechno-Gerät) mithilfe von JavaScript.

`sendTo("cul.0", "sendraw", {"command": 'is0FFFFF0FFFFF'});`

Diese Befehle nutzen die CUL-Bibliothek dieses Adapters, um die Befehle an ein Gerät zu senden. Basierend auf JavaScript/Node.js. `Busware CUL USB / culfw` Adapter

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 3.0.2 (2026-09-02)

- (@GermanBluefox) Ein Vorbereitungsskript wurde entfernt.

### 3.0.1 (2026-08-25)

- (@GermanBluefox) Der serielle Port kann jetzt manuell eingegeben werden, daher ein symbolischer Link unten. `/dev/serial/by-id` kann verwendet werden (#150)
- (@GermanBluefox) Die Portliste bietet die `/dev/serial/by-id` zusätzlich zu den `/dev/ttyUSBx` Geräte unter Linux. Sie sind nicht länger hinter der experimentellen Option versteckt und ersetzen nicht mehr die Gerätepfade.

### 3.0.0 (2026-08-25)

- (bluefox) EILMELDUNG: Der Adapter benötigt jetzt node.js >= 22, js-controller >= 6.0.11 und admin >= 7.0.0.
- (bluefox) Der Adapter wurde in TypeScript neu geschrieben. Die Quelltexte befinden sich in `src/`, der veröffentlichte Code in `build/`
- (bluefox) Aktualisiert `cul` Das Paket wurde auf Version 1.0.0 aktualisiert. Es verwendet serielle Schnittstelle 13, daher sind für die Installation keine Build-Tools mehr erforderlich.
- (bluefox) EILMELDUNG: `cul` In Version 1.0.0 wurden einige Datenpunkte umbenannt: `battery` ist jetzt `batteryLow`/`batteryState`, `window`/`isopen` ist jetzt `open`, `valveposition` ist jetzt `valvePosition`Die alten Zustände werden nicht mehr gespeichert und können gelöscht werden.
- (bluefox) Problem mit vertauschten Daten behoben `Mode` Und `Type` Beschriftungen im Konfigurationsdialog
- (bluefox) Die Portliste im experimentellen Modus wurde korrigiert: die `/dev/serial/by-id` Die Einträge wurden aus einem undefinierten Wert erstellt.
- (bluefox) Der HTML-Konfigurationsdialog und die gulpfile wurden entfernt.
- (bluefox) Der Debug-Treiber, der die Wiedergabe wiederholte `lib/rawData.txt` wenn die Umgebungsvariable `DEBUG` wurde gesetzt, wurde entfernt

### 2.2.0 (2023-04-17)

- (jpk) Portauswahl anhand der ID statt des Namens als Option
- (bluefox) Aktualisierte Benutzeroberfläche für Administrator 6

### 2.0.2 (2022-05-11)

- WICHTIG: Mindestens Node.js 12.x wird jetzt benötigt!
- (Apollon77/achimmm) Unterstützung für Geräte mit Adresse 0 hinzugefügt
- (bluefox) Aktualisiertes Serialport-Paket

[Ältere Änderungsprotokolle finden Sie dort.](CHANGELOG_OLD.md)

## License

[Licensed under GPLv2](LICENSE) Copyright (c) 2014-2026 hobbyquaker