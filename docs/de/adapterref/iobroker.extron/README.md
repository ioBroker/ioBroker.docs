---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.extron/README.md
title: ioBroker.extron
hash: SQXOlon+kOOGN7ozw4xZBE5GNrFNrbyPi7D+kL5AACY=
---
![Logo](../../../en/adapterref/iobroker.extron/admin/extron.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.extron.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.extron.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/extron-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/extron-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Bannsaenger/iobroker.extron.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Bannsaenger/ioBroker.extron/badge.svg)
![NPM](https://nodei.co/npm/iobroker.extron.png?downloads=true)

# IoBroker.extron
## Extron-Adapter für ioBroker
Extron SIS-Adapter

Steuergeräte von Extron.
Dieser Adapter dient zur Steuerung einiger Audio-Video-Produkte von Extron über das S**et-Protokoll.
Der Funktionsumfang der Geräte ist enorm. Es ist sinnvoll, nicht alle Funktionen mit dem Adapter und der Interaktion mit iobroker zu unterstützen.

**Beachten Sie:** Wenn der Gerätetyp in der Adapterkonfiguration ausgewählt wird, kann er in Zukunft nicht mehr geändert werden!

In einer iobroker-Installation kann es mehrere Instanzen unterschiedlichen oder gleichen Typs dieses Adapters geben. Für zukünftige Versionen müssen Sie für jede Instanz eine gültige Lizenz zur Adapterkonfiguration hinzufügen.
Wenn Sie eine nichtkommerzielle Organisation sind oder es für den privaten Gebrauch nutzen, können Sie eine kostenlose Lizenz erhalten. Bitte wenden Sie sich an den Autor.

### Unterstützte Geräte
- 8x2-Präsentationsmatrix-Umschalter (DTP2 CrossPoint 82)
- H.264 Streaming Media Player und Decoder (SMD 202)
- Streaming Media Encoder (SME 211)
- 12x8 ProDSP-Prozessor mit Dante (DMP 128 Plus AT)
- 12x8 ProDSP-Prozessor mit AEC, VoIP und Dante (DMP 128 Plus C V AT)

## Machen
- Der Gerätetyp wird zu Beginn des Gesprächs überprüft. Dies schlägt manchmal fehl. Muss auf einen zuverlässigeren Mechanismus umgestellt werden.
- Treffen Sie eine detailliertere Auswahl der verwendeten Ein- und Ausgänge, um die Datenbankgröße bei DSP-Geräten zu reduzieren
- Weitere Befehle und deren Implementierung auf der Datenbankseite hinzufügen
- Verbesserung des Netzwerk-Wiederverbindungsmechanismus

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
    * (Bannsaenger) introducing admin 5 UI (jsonConfig)
-->
### **WORK IN PROGRESS**
* (Bannsaenger) updated to adapter-dev and release script
* (Bannsaenger) updated dependencies

### 0.2.1
* (mschlgl) updated log messages, improved group control

### 0.2.0
* (Bannsaenger) updated dependencies

### 0.1.16
* (mschlgl) fixed group command issues, added statedelay log message

### 0.1.15
* (mschlgl) added statedelay log message

### 0.1.14
* (mschlgl) fixed group command issues

### 0.1.13
* (mschlgl) fixed source code version issues

### 0.1.12
* (mschlgl) added support for channel preset selection in SMD202

### 0.1.11
* (Bannsaenger) fixed support for groups in DSP DMP128

### 0.1.10
* (mschlgl) added support for groups in DSP DMP128

### 0.1.9
* (Bannsaenger) fixed setting of info.connection in telnet mode

### 0.1.7
* (mschlgl) added plain Telnet communication

### 0.1.6
* (mschlgl) added limiter section for DMP128

### 0.1.5
* (mschlgl) fixes on device communication sme211

### 0.1.4
* (mschlgl) fixes on device communication cp82 and smd202

### 0.1.3
* (mschlgl) fixes on device communication and user flash file management

### 0.1.2
* (mschlgl) extend device/database structure to add user flash memory

### 0.1.1
* (mschlgl) extend device/database structure to add devices CP82, SME211, SMD202

### 0.1.0
* (mschlgl) extend device/database structure to cover all controllable elements

### 0.0.3
* (Bannsaenger) fix dependencies for integration test

### 0.0.2
* (Bannsaenger) prepared for checkin to iobroker.latest

### 0.0.1
* (Bannsaenger) initial release

## License
Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

Copyright (c) 2021-2023 Bannsaenger, https://github.com/bannsaenger <bannsaenger@gmx.de>

![CC BY-NC License](https://i.creativecommons.org/l/by-nc/4.0/88x31.png)

This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License
http://creativecommons.org/licenses/by-nc/4.0/

Short content:
This is a human-readable summary of (and not a substitute for) the license. Disclaimer.
You are free to:

Share — copy and redistribute the material in any medium or format
Adapt — remix, transform, and build upon the material

The licensor cannot revoke these freedoms as long as you follow the license terms.

Under the following terms:

Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

NonCommercial — You may not use the material for commercial purposes.

No additional restrictions — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.