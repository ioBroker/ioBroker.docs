---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wattcycle/README.md
title: ioBroker.wattcycle
hash: de2Urgk9fNWVRYzXCiaJndGbwMBecNvZWCSth6Vb5/I=
---
<img src="admin/wattcycle.png" width="100" />

# ioBroker.wattcycle

Liest WattCycle / XDZN BLE-Batterien (TDT-Protokoll, Merkmale fff1/fff2/fffa, "HiLink"-Authentifizierung) in ioBroker ein.

## Merkmale

- Fragt kontinuierlich eine konfigurierbare Liste von Batterien über BLE ab.
- Zustände pro Batterie für SoC, Spannung, Stromstärke, Leistung, Kapazität, Zyklen, MOSFET-/PCB-/Zelltemperaturen, Einzelzellspannungen.
- Integrierter BLE-Scan über die Admin-Benutzeroberfläche zum Ermitteln der MAC-Adressen von Geräten in der Nähe.
- Konfigurierbares Abfrageintervall, Abstand zwischen Batterien und Bluetooth-(HCI)-Adapter.
- Gerätemanager: Jede Batterie wird als Karte mit SOC, Verbindung, Lade-/Entladezustand, Spannung, Leistung und Temperatur dargestellt; Details zu allen Zellen; Batterien können gescannt, hinzugefügt, bearbeitet, aktiviert/deaktiviert und gelöscht werden.
- Fliesen für die `devices` App und ein Widget für `vis-2`, nach dem Vorbild der WattCycle-App (SOC-Bogen, Ladezustand, Spannung, Stromstärke, Leistung, Temperatur, Gesundheit und Zellen).

## Visualisierung

### Geräte-App

Fügen Sie ein benutzerdefiniertes Widget vom Typ **WattCycle-Batterie** hinzu und wählen Sie ein Batteriegerät aus (`wattcycle.0.batteries.<name>`) oder `wattcycle.0.total` für die Summe aller Batterien.

- `1x1` – SOC-Bogen und Ladezustand
- `2x½` – Batteriebalken mit Spannung, Stromstärke und Leistung
- `2x1` – SOC-Lichtbogen zusammen mit Spannung, Strom, Leistung und Temperatur

Ein Klick auf die Kachel öffnet einen Dialog mit allen Informationen: Gesundheitszustand, Zellen und Temperaturen.

### vis-2

Das Widget-Set **„WattCycle-Batterien“** enthält das Widget „ **Batterie“** . Wählen Sie das Batteriegerät in den Einstellungen aus. Das Layout passt sich der Größe des Widgets an (Leiste, kompakt, breit oder Vollbild) oder kann in den Einstellungen fixiert werden. Ein Klick auf die kleineren Layouts öffnet die Vollbildansicht.

### Webkomponenten

Die Batterie ist ebenfalls eine Webkomponente (`common.webComponents`,[`@iobroker/web-components`](https://github.com/ioBroker/web-components) ), sodass Aura, Admin und alle anderen Hosts von Webkomponenten es anzeigen können:

- `<iob-wattcycle-battery>` ( **WattCycle-Akku** ) – dieselben Ansichten wie im vis-2-Widget: der SOC-Bogen mit Ladezustand, ein Akkubalken, der SOC-Bogen mit Spannung, Stromstärke, Leistung und Temperatur oder alle Informationen zu Zustand, Zellen und Temperaturen. Ein Klick auf die kleineren Ansichten öffnet alles in einem Dialogfeld des Hosts.

Einstellungen:

- **Batterie** – ein batteriebetriebenes Gerät (`wattcycle.<n>.batteries.<name>`) oder `wattcycle.<n>.total` für die Summe aller Batterien
- **Name** – leer: der Name des Geräts
- **Layout** – automatisch (nach Größe), kompakt, Bar, breit oder voll
- **Details mit einem Klick öffnen**

Die Geräte-App bietet anstelle der gleichnamigen Webkomponente eine eigene Kachel **namens WattCycle-Batterie** an.

### Gerätemanager

Auf der Registerkarte **Geräte-Manager** in den Instanzeinstellungen (oder im Geräte-Manager des Administrators) werden alle konfigurierten Batterien und deren Gesamtanzahl angezeigt.

## Konfiguration

Öffnen Sie die Admin-Benutzeroberfläche und wählen Sie auf der Registerkarte **„Haupteinstellungen“ Folgendes** aus:

- **Bluetooth-Adapter (hciX)** — die HCI-Geräte-ID (`0` =`hci0`).
- **Abstimmungsintervall (ms)** — Intervall zwischen vollständigen Abstimmungszyklen.
- **Lücke zwischen den Batterieständen (ms)** — Pause zwischen aufeinanderfolgenden Batterieständen in einem Zyklus.
- **Scandauer (ms)** – wie lange der BLE-Scan läuft.

Klicken Sie auf der Registerkarte **„Batterien“** auf **„Nach BLE-Geräten suchen“** , kopieren Sie dann die MAC-Adressen Ihrer Batterien in die unten stehende Tabelle und geben Sie jeder einen Namen.

## Staaten

Für jede konfigurierte Batterie werden die folgenden Zustände erstellt unter `wattcycle.<instance>.batteries.<name>`:

| Zustand                | Typ             | Einheit | Beschreibung                                       |
| ---------------------- | --------------- | ------- | -------------------------------------------------- |
| `soc`                  | Nummer          | %       | Anklagepunkt                                       |
| `voltage`              | Nummer          | V       | Packspannung                                       |
| `current`              | Nummer          | A       | Stromstärke (vorzeichenbehaftet, Ladung positiv)   |
| `power`                | Nummer          | W       | Spannung × Stromstärke                             |
| `remaining_ah`         | Nummer          | Ah      | Restkapazität                                      |
| `total_ah`             | Nummer          | Ah      | Gesamtkapazität                                    |
| `design_ah`            | Nummer          | Ah      | Auslegungskapazität                                |
| `cycles`               | Nummer          |         | Zykluszählung                                      |
| `cell_spread_mv`       | Nummer          | mV      | Differenz zwischen höchster/niedrigster Zelle      |
| `mos_temp`             | Nummer          | °C      | MOSFET-Temperatur                                  |
| `pcb_temp`             | Nummer          | °C      | Leiterplattentemperatur                            |
| `cells_v`              | Zeichenkette    |         | JSON-Array von Zellspannungen (V)                  |
| `cell_temps`           | Zeichenkette    |         | JSON-Array mit Zelltemperaturen (°C)               |
| `product.model_or_fw`  | Zeichenkette    |         | Modell-/Firmware-Zeichenfolge                      |
| `product.manufacturer` | Zeichenkette    |         | Herstellerzeichen                                  |
| `product.serial`       | Zeichenkette    |         | Seriennummer                                       |
| `lastUpdate`           | Nummer          |         | Zeitstempel des letzten erfolgreichen Lesevorgangs |
| `reachable`            | boolescher Wert |         | Wahr, wenn der letzte Lesevorgang erfolgreich war. |
| `lastError`            | Zeichenkette    |         | Fehler beim letzten fehlgeschlagenen Lesevorgang   |

Darüber hinaus ein Aggregatgerät `wattcycle.<instance>.total` wird erstellt (setzt parallele Topologie voraus):

| Zustand              | Typ    | Einheit | Aggregation        |
| -------------------- | ------ | ------- | ------------------ |
| `soc`                | Nummer | %       | Durchschnitt       |
| `soc_min`            | Nummer | %       | Minimum            |
| `soc_max`            | Nummer | %       | maximal            |
| `voltage`            | Nummer | V       | Durchschnitt       |
| `voltage_min`        | Nummer | V       | Minimum            |
| `voltage_max`        | Nummer | V       | maximal            |
| `current`            | Nummer | A       | Summe              |
| `power`              | Nummer | W       | Summe              |
| `remaining_ah`       | Nummer | Ah      | Summe              |
| `total_ah`           | Nummer | Ah      | Summe              |
| `design_ah`          | Nummer | Ah      | Summe              |
| `cycles_avg`         | Nummer |         | Durchschnitt       |
| `cell_spread_mv_max` | Nummer | mV      | maximal            |
| `mos_temp_max`       | Nummer | °C      | maximal            |
| `pcb_temp_max`       | Nummer | °C      | maximal            |
| `count`              | Nummer |         | erreichbare Anzahl |
| `lastUpdate`         | Nummer |         | aggregierte ts     |

## Nachrichten

```js
// Force an immediate poll cycle
sendTo('wattcycle.0', 'pollNow', null, res => console.log(res));

// Run a BLE scan
sendTo('wattcycle.0', 'scan', { duration: 8000 }, res => console.log(res.devices));
```

## Anforderungen

- Linux mit BlueZ (`apt install bluez libbluetooth-dev`).
- Dem Adapter muss der Zugriff auf den HCI-Socket erlaubt werden (typischerweise als Root oder mit Administratorrechten ausgeführt). `setcap`).
- Der Bluetooth-Adapter muss Bluetooth 5.0 (LE Long Range) unterstützen.

## Changelog

<!--
   Placeholder for the next version (at the beginning of the line):
   ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (@GermanBluefox) Added the short form of the web component manifests (tag, name, icon, size) to `common.webComponents`, so that hosts like Aura can list the components before the adapter is installed; the build writes it with `iob-web-components sync-io-package`

### 2.1.0 (2026-11-08)
* (@GermanBluefox) Added the web component `<iob-wattcycle-battery>` for Aura and other hosts (`common.webComponents`)

### 2.0.4 (2026-11-03)
* (@GermanBluefox) Restored the restriction of the adapter to Linux and macOS

### 2.0.3 (2026-11-02)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Ignore in totals batteries that have not been read for more than an hour

### 2.0.2 (2026-10-28)
* (@GermanBluefox) Fixed the missing translations of the widget set, the widget name and the help in vis-2
* (@GermanBluefox) Replaced the wrong telegram context in the Copilot instructions and stopped the template check from creating duplicate issues (#70)
* (@GermanBluefox) Updated packages

### 2.0.1 (2026-10-14)
* (@GermanBluefox) Restored the supported platforms (Linux and macOS) in package.json
* (@GermanBluefox) Added dependabot updates for the GUI parts

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