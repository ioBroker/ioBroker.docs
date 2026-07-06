---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wattcycle/README.md
title: ioBroker.wattcycle
hash: FCcN7Xly6ogIdv+jxgtbe0vwSxoNOU6KjDNKpGx4Ipk=
---
<img src="admin/wattcycle.png" width="100" />

# IoBroker.wattcycle
Liest WattCycle / XDZN BLE-Batterien (TDT-Protokoll, Merkmale fff1/fff2/fffa, "HiLink"-Authentifizierung) in ioBroker ein.

## Merkmale
- Fragt kontinuierlich eine konfigurierbare Liste von Batterien über BLE ab.
- Zustände pro Batterie für SoC, Spannung, Stromstärke, Leistung, Kapazität, Zyklen, MOSFET-/PCB-/Zelltemperaturen, Einzelzellspannungen.
- Integrierter BLE-Scan über die Admin-Benutzeroberfläche zum Ermitteln der MAC-Adressen von Geräten in der Nähe.
- Konfigurierbares Abfrageintervall, Abstand zwischen Batterien und Bluetooth (HCI)-Adapter.

## Konfiguration
Öffnen Sie die Admin-Benutzeroberfläche und wählen Sie auf der Registerkarte **Haupteinstellungen** Folgendes aus:

- **Bluetooth-Adapter (hciX)** — die HCI-Geräte-ID (`0` = `hci0`).
- **Abfrageintervall (ms)** — Intervall zwischen vollständigen Abstimmungszyklen.
- **Lücke zwischen den Batteriemessungen (ms)** — Pause zwischen aufeinanderfolgenden Batteriemessungen in einem Zyklus.
- **Scandauer (ms)** — wie lange der BLE-Scan läuft.

Klicken Sie auf der Registerkarte **Batterien** auf **Nach BLE-Geräten suchen**, kopieren Sie dann die MAC-Adressen Ihrer Batterien in die unten stehende Tabelle und geben Sie jeder einen Namen.

## Staaten
Für jede konfigurierte Batterie werden unter `wattcycle.<instance>.batteries.<name>` die folgenden Zustände erstellt:

| Bundesland | Typ | Einheit | Beschreibung |
|------------------------|---------|------|------------------------------------------|
| `soc` | Nummer | % | Ladezustand |
| `current` | Nummer | A | Strom (vorzeichenbehaftet, Ladung positiv) |
| `power` | Zahl | W | Spannung × Stromstärke |
| `remaining_ah` | Anzahl | Ah | Verbleibende Kapazität |
| `total_ah` | Anzahl | Ah | Gesamtkapazität |
| `design_ah` | Anzahl | Ah | Auslegungskapazität |
| `cycles` | Nummer | | Zykluszähler |
| `cell_spread_mv` | Nummer | mV | Differenz zwischen höchster/niedrigster Zelle |
| `mos_temp` | Nummer | °C | MOSFET-Temperatur |
| `pcb_temp` | Nummer | °C | Leiterplattentemperatur |
| `cells_v` | Zeichenkette | | JSON-Array von Zellspannungen (V) |
| `cell_temps` | Zeichenkette | | JSON-Array mit Zelltemperaturen (°C) |
| `product.model_or_fw` | Zeichenkette | | Modell-/Firmware-Zeichenkette |
| `product.manufacturer` | Zeichenkette | | Herstellerzeichenkette |
| `product.serial` | Zeichenkette | | Seriennummer |
| `lastUpdate` | Nummer | | Zeitstempel des letzten erfolgreichen Lesevorgangs |
| `reachable` | boolescher Wert | | Wahr, wenn der letzte Lesevorgang erfolgreich war |
| `lastError` | Zeichenkette | | Fehler beim letzten fehlgeschlagenen Lesevorgang |
| `lastError` | Zeichenkette | | Fehler beim letzten fehlgeschlagenen Lesevorgang |

Zusätzlich wird ein aggregiertes Gerät `wattcycle.<instance>.total` erstellt (setzt parallele Topologie voraus):

| Status | Typ | Einheit | Aggregation |
|-----------------------------|--------|------|-----------------|
| `soc` | Anzahl | % | Durchschnitt |
| `soc_max` | Anzahl | % | Maximum |
| `voltage` | Zahl | V | Durchschnitt |
| `voltage_min` | Zahl | V | Minimum |
| `voltage_max` | Zahl | V | Maximum |
| `current` | Zahl | A | Summe |
| `power` | Zahl | W | Summe |
| `remaining_ah` | Zahl | Ah | Summe |
| `total_ah` | Zahl | Ah | Summe |
| `design_ah` | Zahl | Ah | Summe |
| `cycles_avg` | Zahl | | Durchschnitt |
| `cell_spread_mv_max` | Zahl | mV | Maximum |
| `mos_temp_max` | Zahl | °C | Maximum |
| `pcb_temp_max` | Zahl | °C | Maximum |
| `count` | Anzahl | | Erreichbarkeitsanzahl |
| `lastUpdate` | Zahl | | Aggregat ts |
| `lastUpdate` | Anzahl | | aggregierte Zeiteinheiten |

## Nachrichten
```js
// Force an immediate poll cycle
sendTo('wattcycle.0', 'pollNow', null, res => console.log(res));

// Run a BLE scan
sendTo('wattcycle.0', 'scan', { duration: 8000 }, res => console.log(res.devices));
```

## Anforderungen
- Linux mit BlueZ (`apt install bluez libbluetooth-dev`).
- Node.js ≥ 20.
- Dem Adapter muss der Zugriff auf den HCI-Socket erlaubt werden (typischerweise als Root ausgeführt oder mit `setcap`).
- Der Bluetooth-Adapter muss Bluetooth 5.0 (LE Long Range) unterstützen.

## Changelog
<!--
   Placeholder for the next version (at the beginning of the line):
   ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (@GermanBluefox) Improved total calculations

### 0.2.2 (2026-05-07)
* (@GermanBluefox) Managed timeouts and power off

### 0.2.1 (2026-05-06)
* (@GermanBluefox) Use MAC address as unique identifier bluetooth adapter

### 0.1.0 (2026-05-05)

* (@GermanBluefox) Initial version.

## License

MIT License

Copyright (c) 2026 bluefox <dogafox@gmail.com>

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