---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.net-tools/README.md
title: ioBroker.net-Tools
hash: 6R2tDpkRmj7rCzgPkl8R1XTZ+58uJYhwQ1t8e4L3MqE=
---
![Logo](../../../en/adapterref/iobroker.net-tools/admin/net-tools.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.net-tools.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.net-tools.svg)
![Anzahl der Installationen](https://iobroker.live/badges/net-tools-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/net-tools-stable.svg)
![NPM](https://nodei.co/npm/iobroker.net-tools.png?downloads=true)
![Test und Freigabe](https://github.com/jey-cee/ioBroker.net-tools/workflows/Test%20and%20Release/badge.svg)

# ioBroker.net-Tools

## net-tools-Adapter für ioBroker

Dieser Adapter fragt zyklisch konfigurierte IPs ab, kann Wake-on-LAN-Pakete senden und nach offenen Ports suchen.

Diese Erkennungsfunktion wird vom Erkennungsadapter bereitgestellt. Das bedeutet, dass die Erkennung installiert wird, falls sie noch nicht vorhanden ist, und ausgeführt werden muss. Hinweis: Diese Funktion ist auf das Subnetz des ioBroker-Hosts beschränkt.

### Wichtig: Sie benötigen eine Lizenz zur Nutzung dieses Adapters. Diese können Sie hier erwerben: <https://www.all-smart.net/produkt/iobroker-net-tools-v1-lizenz/>

### Wichtig: Für die Nutzung dieses Adapters müssen Sie eine Lizenz erwerben. Sie können hier eine kaufen -> <https://www.all-smart.net/produkt/iobroker-net-tools-v1-lizenz/>

### Automatische Erkennung

Es gibt eine automatische Suchfunktion zum Auffinden von Geräten. Diese kann auch zeitgesteuert ausgeführt werden. Hinweis: Wenn Sie ioBroker in einem Docker-Container verwenden, funktioniert diese Funktion je nach Netzwerkkonfiguration möglicherweise nicht.

### Pings konfigurierte IP-Adressen

Pings an festgelegte IP-Adressen in einem definierten Intervall werden durchgeführt und die Ergebnisse überwacht (Aktivität, Anfragen pro Sekunde, Zeit). Das Ping-Intervall kann auf Geräteebene festgelegt werden.

### Wake-on-LAN

Setzen Sie das wol-Objekt auf true. Daraufhin werden 3 WOL-Pakete mit einer Pause von 750 ms an Ihr Gerät gesendet.

### Port-Scan

Sie können in der Konfiguration eine Liste von Ports oder einen Bereich eingeben, die standardmäßig gescannt werden sollen. Wenn dieses Feld leer ist, wird standardmäßig der Bereich 0–65535 verwendet. Es ist auch möglich, für jedes Gerät eine Liste oder einen Bereich anzugeben, der für einen einzelnen Scan verwendet wird.

Geben Sie optional eine Liste oder einen Bereich von Ports im Objekt „portList“ ein. Dadurch wird die Einstellung in der Konfiguration überschrieben. Setzen Sie „scan“ auf „true“, um alle offenen Ports im Bereich von 0 bis 65535 oder den in „portList“ definierten Werten zu durchsuchen. Dieser Vorgang kann einige Zeit dauern. Das Ergebnis wird im Objekt „ports“ gespeichert.

---

### iPhone

iPhones versuchen, Nutzer vor Tracking zu schützen, indem sie die MAC-Adresse ändern. Weitere Informationen dazu und wie Sie diese Funktion in privaten Netzwerken deaktivieren können, finden Sie hier: <https://support.apple.com/en-us/102509>

---

## Für Entwickler

#### Mac für bestimmtes Gerät abrufen

`sendToAsync('net-tools.X, 'getMac', 'IP ADDRESS')`

Hinweis: Diese Funktion ist auf das Subnetz des ioBroker-Hosts beschränkt.

#### Pingen Sie eine bestimmte IP-Adresse

`sendToAsync('net-tools.X, 'ping', 'IP ADDRESS')`

#### Wake-on-LAN

`sendToAsync('net-tools.x', 'wake', 'MAC ADDRESS')`

---

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (iobroker-bot) Adapter requires node.js >= 20 now.
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.2.3 (2025-11-09)
* Change link to license

### 1.2.2 (2025-11-09)
* Fix ip and mac check while add manual new device

### 1.2.1 (2025-11-09)
* Refactor port scan

### 1.2.0 (2025-06-11)
* Added network interface information for localhost to device manager

### 1.1.3 (2025-06-05)
* Fix out of memory while scanning

### 1.1.2 (2025-04-21)
* (Jey Cee) Add meta object object for instance to store device pictures from device manager
* (Jey Cee) Fix repository checker errors

### 1.1.1 (2025-03-13)
* (Jey Cee) Fix "Cannot read properties of undefined (reading 'find')"

### 1.1.0 (2025-02-04)
* (Jey Cee) New feature ignore list for autodiscovery
* (Jey Cee) New feature Wake-on-LAN with IP for devices on other subnets
* (Jey Cee) Optimize config for better responsive behavior
* (Jey Cee) Sync license key on all instance configurations if a key was already entered in one instance configuration
* (Jey Cee) Moved translations from configuration interface to i18n files
* (Jey Cee) Update dependencies
* (Jey Cee) Fix some stuff that was mentoined by adapter checker

### 1.0.11 27.03.2024
* (Jey Cee) Fix high CPU load while running discovering devices

### 1.0.9 19.03.2024
* (Jey Cee) Fix unexpected stop of discovery

### 1.0.6 04.03.2024
* (Jey Cee) Reduce system load during discovery process to prevent adapter crash

### 1.0.5 04.02.2024
* (Jey Cee) remove discovery adapter as dependency
* (Jey Cee) add possibility to choose the interface which will be used for ping operations
* (Jey Cee) add possibility to enter IP range for device discovery
* (Jey Cee) add auto search by configurable schedule
* (Jey Cee) fix/catch crash if device was deleted in objects and not in device management
* (Jey Cee) fix ping rights on lxc containers which prevent to ping devices

### 1.0.2 20.01.2024
* (Jey Cee) bugfix require

### 1.0.1 19.01.2024
* (Jey Cee) add device manager to configuration
* (Jey Cee) add use of license

[Older changelogs can be found there](https://github.com/Jey-Cee/ioBroker.net-tools/blob/master/CHANGELOG_OLD.md)

## License
Attribution-NonCommercial 4.0 (CC BY-NC 4.0)

Copyright (c) 2025-2026 Jey Cee <iobroker@all-smart.net>

http://creativecommons.org/licenses/by-nc/4.0/

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).