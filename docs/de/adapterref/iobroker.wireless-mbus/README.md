---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wireless-mbus/README.md
title: ioBroker.wireless-mbus
hash: r24RXJvLfu8k0vOUNpFyk2vqhq2DF66EqmnatUmAKVE=
---
![Logo](../../../en/adapterref/iobroker.wireless-mbus/admin/wireless-mbus.png)

![Installierte Anzahl](https://iobroker.live/badges/wireless-mbus-installed.svg)
![stabile Version](https://iobroker.live/badges/wireless-mbus-stable.svg)

# IoBroker.wireless-mbus
Dieser Adapter ermöglicht den Empfang von drahtlosen M-Bus-Daten von unterstützten Empfängern. Der Umfang der Geräteimplementierung variiert, wMBus-Modi können jedoch für alle aufgelisteten Geräte konfiguriert werden.

* WMB-Module einbetten
* Amber Wireless AMB8465 (**Vorsicht:** Der Befehlsmodus (UART_CMD_Out_Enable) ist aktiviert!)
* IMST iM871A
* CUL

Der WMBUS-Stack wurde aus dem FHEM-Projekt „neu portiert“ und umfassend repariert und umgestaltet. Die Tests wurden mit Rohdaten aus dem Internet, OMS-Beispieldaten und einigen Testdaten aus der jmbus-Bibliothek durchgeführt. Einige Randfälle sind noch ungetestet.

Die Geräteerstellung, Aktualisierung usw. basiert größtenteils auf dem M-Bus-Adapter von Apollon77 (siehe unten).

Wenn der Adapter verschlüsselte Telegramme empfängt, sollte auf der Registerkarte „AES-Schlüsselkonfiguration“ automatisch die Geräte-ID aufgeführt werden.

Wenn der Parser fehlschlägt, werden die rohen Telegrammdaten im Status „info.rawdata“ gespeichert.

*Achtung:* Der Amber-Empfänger scheint im C-Modus nach einiger Zeit (oder nach der Anzahl der empfangenen Nachrichten) abzustürzen? Hardwarefehler?

*IMST iM871A-Variante:* Es gibt einen „RWE Smart Home“-USB-Empfänger, der im Prinzip ein IMST iM871A ist, der Kernel lädt den entsprechenden Treiber jedoch nicht automatisch. Dies ist ein Einzeiler zum Erstellen einer udev-Regel, um das Problem zu beheben:

```shell
sudo bash -c "echo \$'ACTION==\"add\", ATTRS{idVendor}==\"10c4\", ATTRS{idProduct}==\"87ed\", RUN+=\"/sbin/modprobe cp210x\" RUN+=\"/bin/sh -c \\'echo 10c4 87ed > /sys/bus/usb-serial/drivers/cp210x/new_id\\'\"' > /etc/udev/rules.d/99-imst.rules"
```

## Links:
* [WMBus-Stack-Modul](https://github.com/mhop/fhem-mirror/blob/master/fhem/FHEM/WMBus.pm)
* [ioBroker.mbus](https://github.com/Apollon77/ioBroker.mbus)
* [Original WMBUS Stack: wm-bus](https://github.com/soef/wm-bus)
* [M-Bus-Protokoll](http://www.m-bus.com/files/MBDOC48.PDF)
* [OMS-Spezifikationen](https://oms-group.org/en/download4all/oms-Spezifikation/)

## Ersteinrichtung
Bei der Ersteinrichtung müssen die Grundlagen konfiguriert werden (Hardwareverbindung zum WM-Bus-Empfänger) und AES-Schlüssel für alle zu erfassenden verschlüsselten WM-Bus-Knoten eingerichtet werden. Der kniffligste Teil sind die AES-Tasten.

### Grundeinstellung
Dazu müssen Sie das entsprechende USB-Gerät und die richtige Baudrate auswählen (**normalerweise** für IMST: 57600 Baud; Gelb: 9600 Baud; Embit: 9600 Baud, CUL: 38400 oder 9600 Baud). Die meisten Messgeräte senden im „T-Modus“.

Ab Version 0.9.0 unterstützt der Adapter auch die Verbindung zu seriellen Geräten, die über einen TCP-Socket erreichbar sind. Allerdings spiegelt die Admin-Oberfläche das (vorerst) nicht wirklich wider und Sie müssen „Benutzerdefinierter Port“ auswählen und den Host als `tcp://host:port` eingeben.

### Andere Optionen
* **Unveränderte Zustände aktualisieren**: Beim Eintreffen eines Telegramms werden alle Zustände aktualisiert, auch wenn sich ihr Wert nicht geändert hat. (Standard ein)
* **Cache für die Unterstützung kompakter Frames**: Zur Unterstützung kompakter Telegramme (die von einigen (Kamstrup?)-Geräten verwendet werden) wird die Struktur aller empfangenen Telegramme zwischengespeichert. Dies bedeutet in der Regel nur einen Cache-Eintrag pro Gerät. Wenn Sie kein Gerät haben, das kompakte Telegramme sendet, können Sie es deaktivieren, um etwas Leistung und Speicher zu sparen. (Standard: aus)
* **Energieeinheiten in kWh erzwingen**: Alle Energieeinheiten (Wh und J) werden in kWh umgerechnet. (Standard: aus)
* **Gerät nach aufeinanderfolgenden Fehlern vorübergehend blockieren**: Wenn 10 aufeinanderfolgende Telegramme desselben Geräts nicht erfolgreich analysiert werden, wird das Gerät bis zum Neustart des Adapters ignoriert (Standard: Ein).

### AES-Schlüssel
Die Gerätekennung ist eine Kombination aus Herstellercode und Geräte-ID (z. B. AAA-12345678). Der Schlüssel kann entweder als Klartextschlüssel mit 16 Zeichen oder als Hex-String mit 32 Zeichen (16 Bytes) eingegeben werden.

Der einfachste Weg, die Schlüssel einzurichten, besteht darin, den Adapter ohne Schlüsseleinrichtung zu starten und auf ein verschlüsseltes Telegramm zu warten, woraufhin vom Adapter ein Eintrag mit „UNBEKANNTER“ Schlüssel generiert wird. Anschließend können Sie den entsprechenden Schlüssel ausfüllen und die Einstellungen speichern. Wenn Sie Geräte sehen, die Sie nicht kennen oder einfach loswerden möchten (z. B. Geräte von Nachbarn), können Sie diese im Reiter „Gesperrte Geräte“ eintragen (siehe unten).

### Blockieren unerwünschter Geräte
Auf der Registerkarte „Blockierte Geräte“ können Sie den Adapter vollständig daran hindern, Telegramme von unerwünschten Geräten zu verarbeiten.

Sie müssen lediglich die Geräte-ID (z. B. AAA-12345678) eingeben, die Sie dem Objektbaum nach dem Empfang und Parsen eines Telegramms oder dem (Debug-)Protokoll entnehmen können.

Wenn Sie das Gerät anschließend aus dem Objektbaum löschen, wird es vom Adapter nicht erneut erstellt.

## Machen
* Telegramme für S-Mode-Empfänger senden?
* Umgang mit Zählern mit „Mehrfachtelegrammen“

## Changelog

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
Copyright (c) 2021 Christian Landvogt

Licensed under GPLv2. See [LICENSE](LICENSE) and [NOTICE](NOTICE)