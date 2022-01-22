---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.extron/README.md
title: ioBroker.extron
hash: y3CHZrJfGFL72Q0HVncXL/XiIWpl6gmMMgKnAhUQenw=
---
![Logo](../../../en/adapterref/iobroker.extron/admin/extron.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.extron.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.extron.svg)
![Anzahl der Installationen (neueste)](http://iobroker.live/badges/extron-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/extron-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Bannsaenger/iobroker.extron.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Bannsaenger/ioBroker.extron/badge.svg)
![NPM](https://nodei.co/npm/iobroker.extron.png?downloads=true)

# IoBroker.extron
## Extron-Adapter für ioBroker
Extron SIS-Adapter

Steuergeräte von Extron.
Dieser Adapter dient zur Steuerung einiger Audio-Video-Produkte von Extron über das **S**imple **I**nstruction **S**et-Protokoll.
Der Funktionsumfang der Geräte ist enorm. Nicht alle Funktionen sind sinnvoll mit dem Adapter und der Interaktion mit iobroker zu unterstützen.

**Achtung:** Wenn der Gerätetyp in der Adapterkonfiguration ausgewählt ist, kann er in Zukunft nicht mehr geändert werden!

In einer iobroker-Installation können mehrere Instanzen unterschiedlicher oder gleicher Typen dieses Adapters vorhanden sein. Für zukünftige Versionen müssen Sie der Adapterkonfiguration für jede Instanz eine gültige Lizenz hinzufügen.
Wenn Sie eine nichtkommerzielle Organisation sind oder es für den privaten Gebrauch verwenden, können Sie eine kostenlose Lizenz erhalten. Bitte wenden Sie sich an den Autor.

### Unterstützte Geräte
- 8x2 Präsentationskreuzschiene (DTP2 CrossPoint 82)
- H.264 Streaming Media Player und Decoder (SMD 202)
- Streaming Media Encoder (SME 211)
- 12x8 ProDSP-Prozessor mit Dante (DMP 128 Plus AT)
- 12x8 ProDSP-Prozessor mit AEC, VoIP und Dante (DMP 128 Plus C V AT)

## Machen
- Der Gerätetyp wird zu Beginn des Gesprächs überprüft. Dies schlägt manchmal fehl. Muss auf einen zuverlässigeren Mechanismus umgestellt werden.
- Treffen Sie eine genauere Auswahl der verwendeten Ein- und Ausgänge, um die Datenbankgröße auf DSP-Geräten zu reduzieren
- Hinzufügen weiterer Befehle und deren Implementierung auf der Datenbankseite
- Fügen Sie dem SMD 202 eine Medienwiedergabeunterstützung hinzu

## Changelog

### 0.0.1
* (Bannsaenger) initial release

### 0.0.2
* (Bannsaenger) prepared for checkin to iobroker.latest

### 0.0.3
* (Bannsaenger) fix dependencies for integration test

### 0.1.0
* (mschlgl) extend device/database structure to cover all controllable elements

### 0.1.1
* (mschlgl) extend device/database structure to add devices CP82, SME211, SMD202

### 0.1.2
* (mschlgl) extend device/database structure to add user flash memory

### 0.1.3
* (mschlgl) fixes on device communication and user flash file management

### 0.1.4
* (mschlgl) fixes on device communication cp82 and smd202

### 0.1.5
* (mschlgl) fixes on device communication sme211

### 0.1.6
* (mschlgl) added limiter section for DMP128

### 0.1.7
* (mschlgl) added plaint Telnet communication for DMP128

### 0.1.9
* (Bannsaenger) fixed setting of info.connection in telnet mode

## License
Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

Copyright (c) 2021 Bannsaenger, https://github.com/bannsaenger <bannsaenger@gmx.de>

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