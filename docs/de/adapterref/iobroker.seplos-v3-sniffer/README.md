---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.seplos-v3-sniffer/README.md
title: ioBroker.seplos-v3-sniffer
hash: 8bSCVtLKER3vRTxSHeRJQXp3hvFSYf9PsPG5Y0oMWSE=
---
![Logo](../../../en/adapterref/iobroker.seplos-v3-sniffer/admin/seplos-v3-sniffer.jpg)

![NPM-Version](https://img.shields.io/npm/v/iobroker.seplos-v3-sniffer.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.seplos-v3-sniffer.svg)
![Anzahl der Installationen](https://iobroker.live/badges/seplos-v3-sniffer-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/seplos-v3-sniffer-stable.svg)
![NPM](https://nodei.co/npm/iobroker.seplos-v3-sniffer.png?downloads=true)

# IoBroker.seplos-v3-sniffer
**Tests:** ![Test und Freigabe](https://github.com/DpunktS/ioBroker.seplos-v3-sniffer/workflows/Test%20and%20Release/badge.svg)

## Seplos-v3-sniffer-Adapter für ioBroker
[www.seplos.com](https://www.seplos.com/)

Dieser Adapter wurde entwickelt, um das Seplos V3 BMS in einer Multipack-Konfiguration auszulesen. In der V3-Generation fungiert das erste BMS als Modbus-Master, alle weiteren BMS als Slaves. In dieser Konfiguration ist der Zugriff auf das BMS über Modbus von einem dritten Gerät aus nicht mehr möglich, da in einem RS-485-Modbus-System nicht zwei Master-Geräte gleichzeitig existieren können. Der Adapter erkennt die Kommunikation zwischen den Geräten passiv, sodass die Kommunikation der einzelnen BMS nicht beeinträchtigt wird. Die Kommunikation kann entweder über eine lokale Schnittstelle (z. B. /dec/ttyS0) oder über Ser2Net (tcp://ip:2001) erfolgen.

Der Adapter erkennt automatisch die Anzahl der verfügbaren Geräte und erstellt die entsprechenden Datenpunkte. Das Gebäudemanagementsystem (BMS) sendet alle 200 ms einen neuen Datensatz. Das Aktualisierungsintervall kann auf der Konfigurationsseite des Adapters angepasst werden (Standardwert: 5 Sekunden).

![Seplos 4x](https://github.com/user-attachments/assets/9d710287-069d-44b6-acda-e96764642a33)

Um eine Verbindung herzustellen, müssen die Pins 1/8 (B), 2/7 (A) und 5 (GND) mit dem RS485-Adapter verbunden werden. Es können verschiedene RS485-Adapter verwendet werden, z. B. RS485 zu USB oder RS485 zu TTL. Es ist wichtig zu prüfen, wie das System den jeweiligen Adapter erkannt hat, und die Schnittstelle entsprechend unter „Serieller Adapter“ einzutragen (z. B. /dev/ttyUSB0 oder /dev/ttyS0). Bei Verwendung von Ser2Net muss die Adresse tcp://ip:2001 eingetragen werden. Der Ser2Net-Server muss so konfiguriert sein, dass er die Daten im RAW-Format bereitstellt. Eine einfache Möglichkeit bietet die Verwendung eines ESP8266/ESP32 mit ESPHome (siehe mein Beispiel unten).

In meinen Tests stellte ich fest, dass der 120-Ohm-Abschlusswiderstand im Adapter nicht erforderlich ist. Auch im originalen Seplos V3 USB-Adapter ist kein Abschlusswiderstand vorhanden. Soll nur ein BMS ausgelesen werden, muss Pin 6 (B) mit Pin 5 (GND) verbunden werden, damit der Master unabhängig Daten senden kann.

![Pinbelegung](https://github.com/user-attachments/assets/1c8ec271-d20f-4a5d-baf4-87e5a98fc35a)

Die Ser2Net-Verbindung wurde mit ESPHome getestet.

```
external_components:
  - source: github://oxan/esphome-stream-server

uart:
- id: seplos
  tx_pin: GPIO17
  rx_pin: GPIO16
  baud_rate: 19200
  rx_buffer_size: 2048

stream_server:
   uart_id: seplos
   port: 2001
   buffer_size: 2048
```

Folgende Datenpunkte werden aktuell ausgelesen:

```
pack_voltage
current
remaining_capacity
total_capacity
total_discharge_capacity
soc
soh
cycle_count
average_cell_voltage
average_cell_temp
max_cell_voltage
min_cell_voltage
delta_cell_voltage
max_cell_temp
min_cell_temp
maxdiscurt
maxchgcurt
cell_1_voltage
cell_2_voltage
cell_3_voltage
cell_4_voltage
cell_5_voltage
cell_6_voltage
cell_7_voltage
cell_8_voltage
cell_9_voltage
cell_10_voltage
cell_11_voltage
cell_12_voltage
cell_13_voltage
cell_14_voltage
cell_15_voltage
cell_16_voltage
cell_temp_1
cell_temp_2
cell_temp_3
cell_temp_4
case_temp
power_temp
system_status
active_balancing_cells
cell_temperature_alarms
cell_voltage_alarms
FET_status
active_alarms
active_protections
```

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.0 (2026-04-08)
* (DpunktS) add delta_cell_voltage

### 0.1.1 (2025-02-28)
* (DpunktS) bugfix

### 0.1.0 (2025-02-25)
* (DpunktS) infos, alarms and protections messages added

### 0.0.8 (2025-02-22)
* (DpunktS) ioBroker repository checker bugfix

### 0.0.7 (2025-02-19)
* (DpunktS) ioBroker repository checker Issues #9 fix

### 0.0.6 (2025-02-13)
* (DpunktS) adapter-dev 1.0.1 > 1.3.0

### 0.0.5 (2025-02-12)
* (DpunktS) connections status added

### 0.0.4 (2025-02-12)
* (DpunktS) bugfix

### 0.0.3 (2025-02-12)
* (DpunktS) bugfix

### 0.0.2 (2025-02-12)
* (DpunktS) npm release

### 0.0.1 (2025-01-11)
* (DpunktS) initial release

## License
MIT License

Copyright (c) 2025-2026 DpunktS <dpunkts@online.de>

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