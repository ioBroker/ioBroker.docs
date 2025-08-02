---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wireless-mbus/README.md
title: ioBroker.wireless-mbus
hash: aJWcyWPGZvst6S6R/ZIRSskOHipvPoYdZWa9fFWkaEg=
---
![Logo](../../../en/adapterref/iobroker.wireless-mbus/admin/wireless-mbus.png)

![Anzahl installierter Geräte](https://iobroker.live/badges/wireless-mbus-installed.svg)
![stabile-version](https://iobroker.live/badges/wireless-mbus-stable.svg)

# IoBroker.wireless-mbus
Dieser Adapter ermöglicht den Empfang von drahtlosen M-Bus-Daten von unterstützten Empfängern. Der Umfang der Geräteimplementierung variiert, aber für alle aufgeführten Geräte können wMBus-Modi konfiguriert werden.

* Embit WMB-Module
* Amber Wireless AMB8465 (**Achtung:** Befehlsmodus (UART_CMD_Out_Enable) ist aktiviert!)
* IMST iM871A
* IMST iU891A-XL
* KUL

Der WMBUS-Stack wurde vom FHEM-Projekt „neu portiert“ und umfassend repariert und überarbeitet. Die Tests wurden mit im Internet abgerufenen Rohdaten, OMS-Beispieldaten und einigen Testdaten aus der jmbus-Bibliothek durchgeführt. Einige Randfälle sind noch ungetestet.

Die Geräteerstellung, Aktualisierung usw. basiert größtenteils auf dem M-Bus-Adapter von Apollon77 (siehe unten).

Wenn der Adapter verschlüsselte Telegramme empfängt, sollte die Registerkarte „AES-Schlüsselkonfiguration“ die Geräte-ID automatisch auflisten.

Wenn der Parser fehlschlägt, werden die Rohtelegrammdaten im Status info.rawdata gespeichert.

*Achtung:* Der Amber-Receiver scheint nach einiger Zeit (oder nach der Anzahl empfangener Nachrichten) im C-Modus abzustürzen? Hardwarefehler?

*IMST iM871A-Variante:* Es gibt einen „RWE Smart Home“-USB-Empfänger, der im Prinzip ein IMST iM871A ist, aber der Kernel lädt den entsprechenden Treiber nicht automatisch. Dies ist eine Einzeiler-Anleitung zum Erstellen einer Udev-Regel, um das zu beheben:

```shell
sudo bash -c "echo \$'ACTION==\"add\", ATTRS{idVendor}==\"10c4\", ATTRS{idProduct}==\"87ed\", RUN+=\"/sbin/modprobe cp210x\" RUN+=\"/bin/sh -c \\'echo 10c4 87ed > /sys/bus/usb-serial/drivers/cp210x/new_id\\'\"' > /etc/udev/rules.d/99-imst.rules"
```

## Links:
* [WMBus-Stack-Modul](https://github.com/mhop/fhem-mirror/blob/master/fhem/FHEM/WMBus.pm)
* [ioBroker.mbus](https://github.com/Apollon77/ioBroker.mbus)
* [Ursprünglicher WMBUS-Stapel: wm-bus](https://github.com/soef/wm-bus)
* [M-Bus-Protokoll](http://www.m-bus.com/files/MBDOC48.PDF)
* [OMS-Spezifikationen](https://oms-group.org/en/download4all/oms-specification/)

## Ersteinrichtung
Die Ersteinrichtung erfordert die Konfiguration der Grundlagen (Hardwareverbindung zum WMBUS-Empfänger) und die Einrichtung von AES-Schlüsseln für alle zu erfassenden verschlüsselten WMBUS-Knoten. Der schwierigste Teil sind die AES-Schlüssel.

### Grundeinrichtung
Dazu muss das entsprechende USB-Gerät und die richtige Baudrate ausgewählt werden (**normalerweise** für IMST iM871A: 57600 Baud; IMST iU891A-XL: 115200 Baud; Amber: 9600 Baud; Embit: 9600 Baud, CUL: 38400 oder 9600 Baud). Die meisten **Messgeräte** senden im „T-Modus“.

Ab Version 0.9.0 unterstützt der Adapter auch die Verbindung zu seriellen Geräten, die über einen TCP-Socket erreichbar sind. Die Admin-Oberfläche spiegelt dies jedoch (noch) nicht wirklich wider und Sie müssen „benutzerdefinierter Port“ auswählen und den Host als `tcp://host:port` eingeben.

### Andere Optionen
* **Unveränderte Zustände aktualisieren**: Beim Eintreffen eines Telegramms werden alle Zustände aktualisiert, auch wenn sich ihr Wert nicht geändert hat. (Standard: ein)
* **Cache für Unterstützung kompakter Frames**: Zur Unterstützung kompakter Telegramme (von einigen (Kamstrup?) Geräten verwendet) wird die Struktur aller empfangenen Telegramme zwischengespeichert. Das bedeutet normalerweise nur einen Cacheeintrag pro Gerät. Wenn Sie kein Gerät haben, das kompakte Telegramme sendet, können Sie dies deaktivieren, um etwas Leistung und Speicher zu sparen. (Standard: aus)
* **Energieeinheiten auf kWh umrechnen**: Alle Energieeinheiten (Wh und J) werden in kWh umgerechnet. (Standard: aus)
* **Gerät nach aufeinanderfolgenden Fehlern vorübergehend blockieren**: Wenn 10 aufeinanderfolgende Telegramme desselben Geräts nicht erfolgreich analysiert werden, wird das Gerät ignoriert, bis der Adapter neu gestartet wird (Standard: ein)

### AES-Schlüssel
Die Gerätekennung ist eine Kombination aus Herstellercode und Geräte-ID (z.B. AAA-12345678). Der Schlüssel kann entweder als Klartextschlüssel mit 16 Zeichen oder als Hex-String mit 32 Zeichen (16 Bytes) eingegeben werden.

Die einfachste Möglichkeit, die Schlüssel einzurichten, besteht darin, den Adapter ohne Schlüsseleinrichtung zu starten und auf ein verschlüsseltes Telegramm zu warten, woraufhin vom Adapter ein Eintrag mit dem Schlüssel "UNKNOWN" generiert wird. Anschließend können Sie den entsprechenden Schlüssel eintragen und die Einstellungen speichern. Wenn Sie Geräte sehen, die Sie nicht kennen oder einfach loswerden möchten (z. B. Geräte von Nachbarn), können Sie diese im Reiter Blockierte Geräte eintragen (siehe unten).

### Blockieren unerwünschter Geräte
Über die Registerkarte „Blockierte Geräte“ können Sie die Verarbeitung von Telegrammen unerwünschter Geräte durch den Adapter vollständig unterbinden.

Zur Eingabe ist lediglich die Geräte-ID (z.B. AAA-12345678) notwendig, welche Sie nach Empfang und Auswertung eines Telegramms aus dem Objektbaum oder dem (Debug-)Log entnehmen können.

Wenn Sie das Gerät anschließend aus dem Objektbaum löschen, wird es vom Adapter nicht erneut erstellt.

## Aufgaben
* Senden von Telegrammen für S-Modus-Empfänger?
* Umgang mit Zählern mit „Mehrfachtelegrammen“

## Changelog

### 0.10.0
* (ChL) Add support for IMST iU891A-XL receiver

### 0.9.4
* (ChL) Upgrade dependencies and general package stuff

### 0.9.3
* (ChL) Fix handling of 64bit integer DIFs

### 0.9.2
* (ChL) Fix handling of frame type B without CRC

### 0.9.1
* (ChL) Fix custom port display in admin page if SerialPort returns no ports

### 0.9.0
* (ChL/kubax) Experimental! Enable serial over raw TCP socket for all devices - use `tcp://host:port` as custom serial port
* serialport is upgraded to v11 - this finally breaks node v12 support!

### 0.8.10
* (ChL) Use compact frame cache independently from manufacturer code

### 0.8.9
* (ChL) Fix display of non-default settings in admin page

### 0.8.8
* (ChL) Add datetime type I handling

### 0.8.7
* (ChL) Slightly improve handling of LVAR DIF values

### 0.8.3 / 0.8.4 / 0.8.5 / 0.8.6
* (ChL) Update dev dependencies - Attention CI test will no longer support <= NodeJS 12
* (ChL) Minor logging changes

### 0.8.2
* (ChL) C-mode support for CUL

### 0.8.1
* (ChL) Fix connection state
* (ChL) Re-add serial logging

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
Copyright (c) 2021 - 2025 Christian Landvogt

Licensed under GPLv2. See [LICENSE](LICENSE) and [NOTICE](NOTICE)