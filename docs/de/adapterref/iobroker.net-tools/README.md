---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.net-tools/README.md
title: ioBroker.net-Tools
hash: PdF+efqVDFFjtfkSgCd1fGDLJ+tYzy/KEr85+dSNE9k=
---
![Logo](../../../en/adapterref/iobroker.net-tools/admin/net-tools.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.net-tools.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.net-tools.svg)
![Anzahl der Installationen](https://iobroker.live/badges/net-tools-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/net-tools-stable.svg)
![NPM](https://nodei.co/npm/iobroker.net-tools.png?downloads=true)

# IoBroker.net-tools
**Tests:** ![Test und Freigabe](https://github.com/jey-cee/ioBroker.net-tools/workflows/Test%20and%20Release/badge.svg)

## Net-Tools-Adapter für ioBroker
Dieser Adapter fragt zyklisch konfigurierte IPs ab, kann Wake-on-Lan-Pakete senden und nach offenen Ports suchen.

Diese Erkennungsfunktion wird vom Erkennungsadapter bereitgestellt. Dies bedeutet, dass die Erkennung installiert wird, wenn dies nicht der Fall ist, und dass sie ausgeführt werden muss.
Anmerkung: Diese Funktion ist auf das Subnetz des ioBroker-Hosts beschränkt.

### Wichtig: Sie müssen eine Lizenz erwerben, um diesen Adapter verwenden zu können. Sie können eine hier kaufen -> https://www.all-smart.net/produkt/iobroker-net-tools-v1-lizenz/
### Wichtig: Für die Nutzung dieses Adapters müssen Sie eine Lizenz erwerben. Sie können hier eine kaufen -> https://www.all-smart.net/produkt/iobroker-net-tools-v1-lizenz/
### Pingt konfigurierte IP-Adressen
Pingt bestimmte IP-Adressen in definierten Intervallen an und überwacht die Ergebnisse. (Alive, Rps, Zeit) Das Ping-Intervall kann auf Geräteebene angegeben werden.

### Wake on LAN
Setzen Sie das Wol-Objekt auf „true“ und 3 WOL-Pakete werden mit einer Pause von 750 ms an Ihr Gerät gesendet.

### Port-Scan
Sie können in der Konfiguration eine Liste von Ports oder einen Bereich eingeben, die standardmäßig gescannt werden sollen. Wenn dieses Feld leer ist, wird der Bereich 0-65535 als Standard verwendet.
Es ist auch möglich, für jedes Gerät eine Liste oder einen Bereich anzugeben, der für einen einzelnen Scan verwendet wird.

Geben Sie bei Bedarf eine Liste oder einen Bereich von Ports in das Objekt portList ein. Dadurch wird die Einstellung in der Konfiguration überschrieben.
Setzen Sie „scan“ auf „true“. Dadurch wird nach allen offenen Ports im Bereich von 0-65535 oder dem, was in portList definiert ist, gesucht. Dieser Vorgang dauert eine Weile.
Das Ergebnis wird auf Objektports geschrieben.

---

## Für Entwickler
#### Holen Sie sich einen Mac für ein bestimmtes Gerät
`sendToAsync('net-tools.X, 'getMac', 'IP ADDRESS')`

Anmerkung: Diese Funktion ist auf das Subnetz des ioBroker-Hosts beschränkt.

#### Ping-spezifische IP-Adresse
`sendToAsync('net-tools.X, 'ping', 'IP ADDRESS')`

#### Wake on LAN
`sendToAsync('net-tools.x', 'wake', 'MAC ADDRESS')`

---

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

### 1.0.2 20.01.2024
* (Jey Cee) bugfix require

### 1.0.1 19.01.2024
* (Jey Cee) add device manager to configuration
* (Jey Cee) add use of license

## License
Attribution-NonCommercial 4.0 (CC BY-NC 4.0)

Copyright (c) 2024 Jey Cee <iobroker@all-smart.net>

http://creativecommons.org/licenses/by-nc/4.0/

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).