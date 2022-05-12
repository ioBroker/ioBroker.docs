---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wireless-mbus/README.md
title: ioBroker.wireless-mbus
hash: 8M9Mw77yq6xSvufvjRv6WSKDvk5tKHxsc/6NqtM9eKs=
---
![Logo](../../../en/adapterref/iobroker.wireless-mbus/admin/wireless-mbus.png)

# IoBroker.wireless-mbus
Dieser Adapter ermöglicht den Empfang von drahtlosen M-Bus-Daten von unterstützten Empfängern. Der Umfang der Geräteimplementierung variiert, aber wMBus-Modi können für alle aufgelisteten Geräte konfiguriert werden.

* Embit WMB-Module
* Amber Wireless AMB8465 (**Achtung:** Befehlsmodus (UART_CMD_Out_Enable) ist aktiviert!)
* IMST iM871A
* CUL

Der WMBUS-Stack wurde aus dem FHEM-Projekt "gemeldet" und umfassend repariert und umgestaltet. Die Tests wurden mit Rohdaten aus dem Internet, OMS-Beispieldaten und einigen Testdaten aus der jmbus-Bibliothek durchgeführt. Einige Grenzfälle sind noch ungetestet.

Die Geräteerstellung, -aktualisierung usw. basiert hauptsächlich auf dem M-Bus-Adapter von Apollon77 (siehe unten).

Wenn der Adapter verschlüsselte Telegramme empfängt, sollte die Registerkarte AES-Schlüsselkonfiguration die Geräte-ID automatisch auflisten.

Wenn der Parser fehlschlägt, werden die Rohdaten des Telegramms im Zustand info.rawdata gespeichert.

*Achtung:* Der Amber-Empfänger scheint nach einiger Zeit (oder Anzahl empfangener Nachrichten) im C-Modus abzustürzen? Hardwarefehler?

##Links:
* [WMBus Stack-Modul](https://github.com/mhop/fhem-mirror/blob/master/fhem/FHEM/WMBus.pm)
* [ioBroker.mbus](https://github.com/Apollon77/ioBroker.mbus)
* [Ursprünglicher WMBUS-Stack: wm-bus](https://github.com/soef/wm-bus)
* [M-Bus-Protokoll](http://www.m-bus.com/files/MBDOC48.PDF)
* [OMS-Spezifikationen](https://oms-group.org/en/download4all/oms-specification/)

## Ersteinrichtung
Die Ersteinrichtung erfordert die Konfiguration der Grundlagen (Hardwareverbindung zum wmbus) und die Einrichtung von AES-Schlüsseln für alle zu sammelnden verschlüsselten wmbus-Knoten. Der schwierigste Teil sind die AES-Schlüssel.

### Grundeinstellung
Dies erfordert die Auswahl des geeigneten USB-Geräts und der richtigen Baudrate (**normalerweise** für IMST: 57600 Baud; Amber: 9600 Baud; Embit: 9600 Baud). Die meisten Messgeräte senden im „T-Modus“.

### Andere Optionen
* **Ungeänderte Zustände aktualisieren**: Beim Eintreffen eines Telegramms werden alle Zustände aktualisiert, auch wenn sich ihr Wert nicht geändert hat. (Standard ein)
* **Cache für Compact-Frames-Unterstützung**: Zur Unterstützung von Compact-Telegrammen (wird von einigen (Kamstrup?) Geräten verwendet) wird die Struktur aller empfangenen Telegramme zwischengespeichert. Dies bedeutet in der Regel nur einen Cache-Eintrag pro Gerät. Wenn Sie kein Gerät haben, das kompakte Telegramme sendet, können Sie es deaktivieren, um etwas Leistung und Speicherplatz zu sparen. (Standard: aus)
* **Energieeinheiten in kWh umwandeln**: Alle Energieeinheiten (Wh und J) werden in kWh umgerechnet. (Standard: aus)
* **Gerät nach aufeinanderfolgenden Fehlern vorübergehend blockieren**: Wenn 10 aufeinanderfolgende Telegramme desselben Geräts nicht erfolgreich geparst werden, wird das Gerät bis zum Neustart des Adapters ignoriert (Standard: Ein)

### AES-Schlüssel
Die Gerätekennung ist eine Kombination aus dem Herstellercode und der Geräte-ID (z. B. AAA-12345678). Der Schlüssel kann entweder als Klartextschlüssel mit 16 Zeichen oder als Hex-String mit 32 Zeichen (16 Bytes) eingegeben werden.

Der einfachste Weg, die Schlüssel einzurichten, besteht darin, den Adapter ohne Schlüsseleinrichtung zu starten und auf ein verschlüsseltes Telegramm zu warten, wonach vom Adapter ein Eintrag mit "UNBEKANNTER" Schlüssel generiert wird. Anschließend können Sie den entsprechenden Schlüssel ausfüllen und die Einstellungen speichern. Wenn Sie Geräte sehen, die Sie nicht kennen oder die Sie einfach loswerden möchten (z. B. Geräte von Nachbarn), können Sie diese im Tab Gesperrte Geräte eintragen.

## Machen
* Senden von Telegrammen für S-Mode-Empfänger?

## Changelog

### 0.8.0
* (ChL) Complete rewrite of serial communication - now includes unit tested device classes
* (ChL) Upgrade to SerialPort 10.x and dependency clean up
* (ChL) Improve PRIOS decoder

### 0.7.9
* (ChL) Add debug logging to all serial devices

### 0.7.8
* (ChL) Improve logging from receiver modules
* (ChL) fix rawdata state

### 0.7.7
* (ChL) Add support for Diehl PRIOS encoded telegrams (ported from wmbusmeters)

### 0.7.5 / 0.7.6
* (ChL) Fix timeout handling - if no problems occur this will be republished as 1.0.0

### 0.7.3 / 0.7.4
* (ChL) Try to improve CUL support

### 0.7.1 / 0.7.2
* (ChL) Rename to ioBroker.wireless-mbus to be able to publish to npm
* (ChL) Fix block list, admin page logo and repo url in package.json

### 0.7.0
* (ChL) Change main adapter code to class
* (ChL) Include actual (machine) translations besides English and German
* (ChL) Upgrade denpendencies
* (ChL) Add test for wmbus decoder
* (ChL) Add integration tests
* (ChL) Add github workflow

### 0.6.2
* (ChL) Improve admin page to handle custom serialport path
* (ChL) Add option to turn automatic blocking of devices off
* (ChL) Add "Simple Hexstring" receiver for testing purposes
* (ChL) Internal refactoring

### 0.6.0 / 0.6.1
* (ChL) Upgrade of serialport library to 9.2.0
* (ChL) experimental CUL support

### 0.5.2
* (ChL) fix for connection indicator with js-controller 2.x

### 0.5.1
* (ChL) Small fixes
* (ChL) Internal telegram parser now supports wired M-Bus frames (not used - for testing / developing purpose)
* (D Glaser) Added timestamp of last update to device info
* (D Glaser/ChL) Added some setup documentation to README

### 0.5.0
* (ChL) Basic support for Techem devices
* (ChL) Option to force energy units (Wh and J) to kWh - BEWARE this is not really backwards compatible. Old states will keep their "old" unit, but display the adjusted value!

### 0.4.7
* (ChL) Block devices after 10 consecutive failed parse attempts until adapter restart
* (ChL) Assign roles derived from units (as does the mbus adapter)

### 0.4.6
* (ChL) Support for (Kamstrup?) compact frames through data record cache (pre-defined frames have been removed!)

### 0.4.5
* (ChL) Append device ids with key "UNKNOWN" at startup to needskey

### 0.4.2 / 0.4.3 / 0.4.4
* (ChL) Small fixes

### 0.4.1
* (ChL) basic IMST iM871A support

### 0.4.0
* (ChL) better Amber Stick support
* (ChL) Compact mode?
* (ChL) Nicer state names
* (ChL) wMBus mode partially selectable

### 0.3.0
* (ChL) Implemented all VIF types from MBus doc
* (ChL) VIF extensions are handled better (again)
* (ChL) reorganised VIF info
* (ChL) reorganised receiver handling
* (ChL) blocking of devices possible

### 0.2.0 (not tagged)
* (ChL) Dramatically improved parser: support for security mode 7, frame type B, many small fixes
* (ChL) VIF extensions are handled better, but correct handling is still not fully clear
* (ChL) CRCs are checked and removed if still present
* (ChL) raw data is saved if parser fails

### 0.1.0
* (ChL) initial release

## License

Copyright (c) 2019 ISFH - Institute for Solar Energy Research www.isfh.de
Copyright (c) 2021 Christian Landvogt

Licensed under GPLv2. See [LICENSE](LICENSE) and [NOTICE](NOTICE)