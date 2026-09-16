---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lorawan/README.md
title: ioBroker.lorawan
hash: rC09eu+the7HWqt78wTjUuglMxJ8t94X8vYq5PC13yM=
---
![Logo](../../../en/adapterref/iobroker.lorawan/admin/lorawan.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.lorawan.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lorawan.svg)
![Anzahl der Installationen](https://iobroker.live/badges/lorawan-stable.svg)
![Test und Freigabe](https://github.com/BenAhrdt/ioBroker.lorawan/workflows/Test%20and%20Release/badge.svg)
![Spenden](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![NPM](https://nodei.co/npm/iobroker.lorawan.png?downloads=true)

# ioBroker.lorawan

## LoRawan-Adapter für ioBroker

Der Adapter kommuniziert bidirektional mit LoRaWAN-Geräten über den LoRaWAN Network Server via MQTT-Protokoll. Aktuell werden „The Thinks Network“ und „Chirpstack“ unterstützt, weitere könnten später folgen. Der Adapter wurde in Zusammenarbeit mit Jörg Froehner [(LoraWan@hafenmeister.com](mailto:LoraWan@hafenmeister.com) ) entwickelt.

Die Dokumentation im Wiki finden Sie hier: <https://github.com/BenAhrdt/ioBroker.lorawan/wiki><br/> Aktuell gibt es hier eine Dokumentation auf Englisch: <https://wiki.hafenmeister.de>

### Home Assistant-Sensorerkennung

Für numerische Sensorentitäten weist die Bridge Home Assistant zu.`device_class` Und`state_class` Attribute gemäß der Zähler-zuerst-Konvention des Adapters. Aktuelle Messungen verwenden`measurement` Windrichtungszustände mit der ioBroker-Rolle`value.direction.wind` Verwenden Sie die Geräteklasse`wind_direction` und staatliche Klasse`measurement_angle` Eine bestehende Einheit bleibt erhalten, während`°` wird addiert, wenn keine Einheit definiert ist. Energiewerte in`Wh` ,`kWh` , oder`MWh` sowie Werte, die von einer ioBroker-Energie- oder Verbrauchsrolle identifiziert werden, werden als Verbrauchszähler behandelt und verwendet`total_increasing` für die Energiestatistik von Home Assistant. Lässt sich eine Größe nicht zuverlässig von einem Verbrauchswert unterscheiden, bevorzugt die Bridge eine gegenteilige Semantik:`m³` Und`ft³` werden veröffentlicht als`gas` mit`total_increasing` , Und`L` als`water` mit`total_increasing` Die`mL` Und`gal` bleiben generisch`volume` Werte. Mehrdeutige Konzentrationseinheiten wie z. B.`ppm` ,`ppb` , oder`µg/m³` implizieren keine bestimmte Substanz.`L/min` ,`L/s` , Und`m³/h` verwenden`volume_flow_rate` Die

## HAFTUNGSAUSSCHLUSS

Die Rechte an den Marken und Firmennamen verbleiben bei ihren jeweiligen Inhabern und stehen in keiner Verbindung zu diesem Adapter. Der Betreiber des Adapters muss die Fair-Use-Richtlinien weiterhin einhalten. Wird dieses Repository geforkt, muss es als Quelle angegeben werden.

LoRa® ist eine eingetragene Marke oder Dienstleistungsmarke der Semtech Corporation oder ihrer verbundenen Unternehmen.

LoRaWAN® ist eine eingetragene Marke.

Ich stehe in keiner Verbindung zu den genannten Marken oder deren Tochtergesellschaften, Logos oder Warenzeichen und werde auch nicht von ihnen unterstützt.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.22.33 (2026-08-19)
- (BenAhrdt) Add Home Assistant wind direction and angle measurement classification

### 1.22.32 (2026-08-19)
- (BenAhrdt) Align Home Assistant sensor device classes, state classes, and units with the current specification

### 1.22.31 (2026-07-09)
- (BenAhrdt) Add selection of ToIob source id

### 1.22.30 (2026-07-07)
- (BenAhrdt) Add PIR Mini device Profile
- (BenAhrdt) Add possibillity to ad states to downlink numbers

### 1.22.29 (2026-07-06)
- (BenAhrdt) Add some roles and units to assignhandler

[Older changes can be found there](https://github.com/BenAhrdt/ioBroker.lorawan/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 BenAhrdt <bsahrdt@gmail.com>  
Copyright (c) 2025-2026 Joerg Froehner <LoraWan@hafenmeister.com>

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