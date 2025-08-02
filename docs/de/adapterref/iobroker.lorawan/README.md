---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lorawan/README.md
title: ioBroker.lorawan
hash: CpoUaq5S6DpO4iHrlOu1f494RO6p77BZnhfEKeWfZUA=
---
![Logo](../../../en/adapterref/iobroker.lorawan/admin/lorawan.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.lorawan.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lorawan.svg)
![Anzahl der Installationen](https://iobroker.live/badges/lorawan-installed.svg)
![Spenden](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![NPM](https://nodei.co/npm/iobroker.lorawan.png?downloads=true)

# IoBroker.lorawan
![Test und Freigabe](https://github.com/BenAhrdt/ioBroker.lorawan/workflows/Test%20and%20Release/badge.svg)

## Lorawan-Adapter für ioBroker
Der Adapter kommuniziert bidirektional mit LoraWan-Geräten über den LoRaWAN-Netzwerkserver über das MQTT-Protokoll.
„The Thinks Network“ und „Chirpstack“ werden jetzt unterstützt, weitere könnten später folgen.
Adapter entstand in Zusammenarbeit mit Jörg Froehner LoraWan@hafenmeister.com

Für die Dokumentation verwenden Sie den Doc-Ordner.
Eine Dokumentation in englischer Sprache gibt es vorerst hier: https://wiki.hafenmeister.de

## HAFTUNGSAUSSCHLUSS
Die Rechte an den Marken und Firmennamen verbleiben bei ihren Eigentümern und haben keinen Bezug zu diesem Adapter.
Die Fairuse-Richtlinie ist vom Betreiber des Adapters weiterhin einzuhalten.
Wenn dieses Repository geforkt ist, muss es als Quelle angegeben werden.

LoRa® ist eine eingetragene Marke oder Dienstleistungsmarke der Semtech Corporation oder ihrer verbundenen Unternehmen.

LoRaWAN® ist eine lizenzierte Marke.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.6.6 (2024-03-11)
* (BenAhrdt) update Vicki device-config

### 0.6.5 (2024-03-08)
* (BenAhrdt) setObject changed into setObjectAsync

### 0.6.4 (2024-03-07)
* (BenAhrdt) Change writing of deviceinformations at Ttn

### 0.6.3 (2024-03-05)
* (BenAhrdt) def of deviceinformations changed

### 0.6.2 (2024-03-05)
* (BenAhrdt) seperate dp for deviceinformations

### 0.6.1 (2024-03-02)
* (BenAhrdt) better concept to write values and change setObjectNotExists to extendObject

### 0.6.0 (2024-03-02)
* (BenAhrdt) change concept of assigning roles, values and writecommands

### 0.5.5 (2024-03-01)
* (BenAhrdt) first step of handling with date

### 0.5.4 (2024-03-01)
* (BenAhrdt) implement ther approvedFolder conzept for writecommands from message

### 0.5.3 (2024-02-29)
* (BenAhrdt) change folder for writetriggers

### 0.5.2 (2024-02-29)
* (BenAhrdt) make writetrigger more flexible

### 0.5.1 (2024-02-29)
* (BenAhrdt) detecting of triggerwords changed

### 0.5.0 (2024-02-28)
* (BenAhrdt) trigger for devicetype implemented

### 0.4.1 (2024-02-26)
* (BenAhrdt) implement new deviceprofiles

### 0.4.0 (2024-02-26)
* (BenAhrdt) searchallgorythm improoved, defaultvalues changed, remove query for "all"

### 0.3.10 (2024-02-25)
* (BenAhrdt) change logging again if a device joined the network

### 0.3.9 (2024-02-25)
* (BenAhrdt) change logging if a device joined the network

### 0.3.8 (2024-02-23)
* (BenAhrdt) write def into state in case of type changes

### 0.3.7 (2024-02-22)
* (BenAhrdt) improove forbidden chars and implements join raw

### 0.3.6 (2024-02-21)
* (BenAhrdt) set attributs if undefined

### 0.3.5 (2024-02-21)
* (BenAhrdt) set tier to 2 and improove standard devices

### 0.3.4 (2024-02-20)
* (BenAhrdt) put some debug and silly logging to code

### 0.3.3 (2024-02-19)
* (BenAhrdt) set infos into native

### 0.3.2 (2024-02-16)
* (BenAhrdt) wording recieved => received in messageing

### 0.3.1 (2024-02-15)
* (BenAhrdt) rebuild with better messageing

### 0.3.0 (2024-02-15)
* (BenAhrdt) define user friendly Blockly Blocks with result

### 0.2.1 (2024-02-13)
* (BenAhrdt) check types of messaging values and implements more blockly blocks

### 0.2.0 (2024-02-12)
* (BenAhrdt) more functionality in messageing

### 0.1.13 (2024-02-12)
* (BenAhrdt) building of directory changed and message implemented

### 0.1.12 (2024-02-09)
* (BenAhrdt) default value crc config bug fixed

### 0.1.11 (2024-02-09)
* (BenAhrdt) min / max values for downlink-configs (number)

### 0.1.10 (2024-02-08)
* (BenAhrdt) default of crc changed

### 0.1.9 (2024-02-07)
* (BenAhrdt) crc calculation improoved

### 0.1.8 (2024-02-07)
* (BenAhrdt) implement crc calculation

### 0.1.7 (2024-02-06)
* (BenAhrdt) change filter on statechange

### 0.1.6 (2024-02-05)
* (BenAhrdt) implments byte swap

### 0.1.5 (2024-02-02)
* (BenAhrdt) remove units and insert roles

### 0.1.4 (2024-02-01)
* (BenAhrdt) change input of length and validate hex inputs

### 0.1.3 (2024-02-01)
* (BenAhrdt) change internal Base devices

### 0.1.2 (2024-01-31)
* (BenAhrdt) concept of config changed

### 0.1.1 (2024-01-30)
* (BenAhrdt) reduceing calling changeInfo > create expersettings to send downlinks with uplink

### 0.1.0 (2024-01-26)
* (BenAhrdt) removing downlink/configuration path and first tests of send downlink with uplink

### 0.0.18 (2024-01-25)
* (BenAhrdt) remove wrong warn logging

### 0.0.17 (2024-01-25)
* (BenAhrdt) changed Handling of standard configurations

### 0.0.16 (2024-01-22)
* (BenAhrdt) romeve reacheble object directory / improoved object === NULL

### 0.0.15 (2024-01-21)
* (BenAhrdt) bugfix chirpstack directory at downlink queued

### 0.0.14 (2024-01-21)
* (BenAhrdt) bugfix chirpstack directory

### 0.0.13 (2024-01-21)
* (BenAhrdt) change device id selecting in chirpstack out of directory (for downlink queued)

### 0.0.12 (2024-01-21)
* (BenAhrdt) change flow of downlink

### 0.0.11 (2024-01-20)
* (BenAhrdt) toSend und lastSend added to folders

### 0.0.10 (2024-01-19)
* (BenAhrdt) changes in length calculation

### 0.0.9 (2024-01-19)
* (BenAhrdt) first version for beta

### 0.0.8 (2024-01-18)
* (BenAhrdt) first implementation of chirpstack

### 0.0.7 (2024-01-17)
* (BenAhrdt) hex to Upper case, more units for decoded payload values

### 0.0.6 (2024-01-16)
* (BenAhrdt) insert whole translation for config and move some functions

### 0.0.5 (2024-01-15)
* (BenAhrdt) delete not configed states at startup

### 0.0.4 (2024-01-15)
* (BenAhrdt) implements buttons and standard downlink control ind json (push / replace)

### 0.0.3 (2024-01-14)
* (BenAhrdt) first config for downlinks inputed

### 0.0.2 (2024-01-12)
* (BenAhrdt) initial release

## License
MIT License

Copyright (c) 2024 BenAhrdt <bsahrdt@gmail.com>
Copyright (c) 2024 Joerg Froehner <LoraWan@hafenmeister.com>

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