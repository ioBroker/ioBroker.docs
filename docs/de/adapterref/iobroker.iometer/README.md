---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.iometer/README.md
title: ioBroker.iometer
hash: P7+3dJhI8bQyzDi4lqLN66jJDgYiu7Ie4l4YeI0hiUs=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.iometer.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.iometer.svg)
![Anzahl der Installationen](https://iobroker.live/badges/iometer-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/iometer-stable.svg)
![NPM](https://nodei.co/npm/iobroker.iometer.png?downloads=true)
![Test und Freigabe](https://github.com/torben-iometer/ioBroker.iometer/workflows/Test%20and%20Release/badge.svg)

<img src="admin/iometer.png" width="128" alt="IOmeter Logo" />

# ioBroker.iometer

## iometer-Adapter für ioBroker

**_Dieser Adapter benötigt mindestens Node.js 22.x!_**

Verbindet ioBroker mit dem intelligenten Messgerät [IOmeter](https://www.iometer.de) und stellt Strommesswerte in Echtzeit über Server-Sent Events (SSE) bereit. Zählerstände und Gerätestatus werden live aktualisiert, sobald das Gerät sie meldet.

## Installieren

Installieren Sie diesen Adapter über ioBroker Admin:

1. Öffnen Sie die Adapterliste und suchen Sie nach **IOmeter.**
2. Klicken Sie auf **Installieren.**
3. Erstellen Sie eine Instanz des IOmeter-Adapters
4. Geben Sie die IP-Adresse Ihres IOmeter-Geräts ein und speichern Sie.
5. Die Verbindung zum Gerät wird automatisch hergestellt und die Daten werden in den entsprechenden Kanälen gespeichert.

## Konfiguration

### IOmeter-IP-Adresse

Die lokale IP-Adresse Ihres IOmeter-Geräts (z. B.`192.168.1.100` Diese Information finden Sie in den Geräteinformationen der IOmeter-App.

Der Adapter wird angeschlossen an`http://<ip>/v1/reading` Und`http://<ip>/v1/status` via SSE. Beide Datenströme werden automatisch wieder verbunden, falls die Verbindung abbricht.

## Staaten

Der Adapter erstellt Zustandsobjekte dynamisch beim ersten empfangenen Ereignis. Die vom Gerät gemeldete Zählernummer dient als Kanalpräfix, um bei mehreren Instanzen für verschiedene Zähler diese zu unterscheiden.

Staatliche Kennungen folgen folgendem Format:

```
iometer.<instance>.<channel>-<meterNumber>.<state>
```

- `<instance>` — ioBroker-Adapterinstanzindex (normalerweise`0` )
- `<channel>` - entweder`reading` (Zählerdaten),`device` (Hardwarestatus) oder`info` (Verbindungsstatus)
- `<meterNumber>` — die vom Gerät gemeldete Seriennummer des Zählers (z. B.`1ISK04051904` )
- `<state>` — der einzelne Datenpunkt (siehe unten)

### Lesekanal (`reading-<meterNumber>` )

Bevölkert aus dem`/v1/reading` SSE-Stream (Ereignistyp)`readingEvent` ).

| Zustand              | Typ    | Einheit | Rolle                   | Beschreibung                                                                                                                                         |
| -------------------- | ------ | ------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `power`              | Nummer | W       | `value.power.active`    | Aktuelle Gesamtwirkleistung. Verwendet, sofern verfügbar, den Summenwert des OBIS-Systems; bei einphasigen Zählern wird auf Phase 1 zurückgegriffen. |
| `power_phase1`       | Nummer | W       | `value.power.active`    | Wirkleistung auf Phase L1                                                                                                                            |
| `power_phase2`       | Nummer | W       | `value.power.active`    | Wirkleistung auf Phase L2                                                                                                                            |
| `power_phase3`       | Nummer | W       | `value.power.active`    | Wirkleistung auf Phase L3                                                                                                                            |
| `energy_imported`    | Nummer | kWh     | `value.energy.consumed` | Gesamte importierte Energie                                                                                                                          |
| `energy_exported`    | Nummer | kWh     | `value.energy.produced` | Gesamte exportierte Energie                                                                                                                          |
| `energy_imported_t1` | Nummer | kWh     | `value.energy.consumed` | Importierte Energie — Tarif 1                                                                                                                        |
| `energy_imported_t2` | Nummer | kWh     | `value.energy.consumed` | Importierte Energie – Tarif 2                                                                                                                        |

### Gerätekanal (`device-<meterNumber>` )

Bevölkert aus dem`/v1/status` SSE-Stream (Ereignistyp)`statusEvent` ).

| Zustand             | Typ          | Einheit | Rolle           | Beschreibung                                           |
| ------------------- | ------------ | ------- | --------------- | ------------------------------------------------------ |
| `id`                | Zeichenkette | —       | `info.serial`   | Eindeutige Geräte-ID                                   |
| `meter_number`      | Zeichenkette | —       | `info.serial`   | Seriennummer des Zählers                               |
| `bridge_rssi`       | Nummer       | dBm     | `value`         | WLAN-Signalstärke des Brückenmoduls                    |
| `bridge_firmware`   | Zeichenkette | —       | `info.firmware` | Firmware-Version des Brückenmoduls                     |
| `core_rssi`         | Nummer       | dBm     | `value`         | HF-Signalstärke zwischen Kern und Brücke               |
| `core_firmware`     | Zeichenkette | —       | `info.firmware` | Firmware-Version des Kernmoduls                        |
| `battery_level`     | Nummer       | %       | `value.battery` | Batteriestand des Kernmoduls                           |
| `power_status`      | Zeichenkette | —       | `info.status`   | Zustand der Stromversorgung (z. B.`wired` ,`battery` ) |
| `attachment_status` | Zeichenkette | —       | `info.status`   | Anbindungsstatus des Kernmoduls                        |

### Verbindungsstatus

| Zustand           | Beschreibung                                                |
| ----------------- | ----------------------------------------------------------- |
| `info.connection` | `true` wenn der Lesestream Daten empfängt,`false` ansonsten |

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.0.6 (2026-08-20)
- (torben-iometer) Fixed the adapter crashing on startup with `ERR_PACKAGE_PATH_NOT_EXPORTED` on installations where an older `@iobroker/adapter-core` version got hoisted into node_modules.

### 0.0.5 (2026-08-19)
- (torben-iometer) Sanitized meter numbers before using them in object IDs to prevent invalid states when the device reports characters that are not allowed in ioBroker IDs.
- (torben-iometer) Tightened the IP address validator in the adapter settings to reject invalid octets (e.g. `999.999.999.999`).
- (torben-iometer) Improved error logging for the reading/status streams to show the actual error message instead of an unhelpful JSON dump.
- (torben-iometer) Added missing translations for the adapter description.
- (torben-iometer) Removed the unused visualization widget stub.

### 0.0.4 (2026-08-10)
- (torben-iometer) Changed the state role for `bridge_rssi` and `core_rssi` from the non-existent `value.rssi` to the generic `value` role.

### 0.0.3 (2026-08-07)
- (torben-iometer) Fixed the release workflow (removed the broken Sentry release step, corrected the repository URL format) and the outdated Node.js version requirement in the README.

### 0.0.2 (2026-08-07)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

[Older changelogs can be found there](https://github.com/torben-iometer/ioBroker.iometer/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 torben-iometer <torben@iometer.de>

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