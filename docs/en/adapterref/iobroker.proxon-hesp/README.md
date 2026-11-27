---
chapters: {"pages":{"en/adapterref/iobroker.proxon-hesp/README.md":{"title":{"en":"ioBroker.proxon-hesp"},"content":"en/adapterref/iobroker.proxon-hesp/README.md"},"en/adapterref/iobroker.proxon-hesp/README.de.md":{"title":{"en":"ioBroker.proxon-hesp"},"content":"en/adapterref/iobroker.proxon-hesp/README.de.md"},"en/adapterref/iobroker.proxon-hesp/NOTICE.md":{"title":{"en":"Sources and acknowledgements"},"content":"en/adapterref/iobroker.proxon-hesp/NOTICE.md"}}}
---
# ioBroker.proxon-hesp

*[Deutsche Version / German version](/#/docs/adapterref/iobroker.proxon-hesp/README.de.md)*

Listens **passively** to the internal HESP bus of Proxon ventilation/heat-pump units (e.g. FWT 2-R,
manufacturer: [Zimmermann Lüftungs- und Wärmesysteme](https://www.zimmermann-lueftung.de/))
and stores all values in ioBroker. The bus is reached through an RS485-to-TCP gateway or directly
through a serial RS485 interface (e.g. a USB-RS485 adapter).
By default the adapter sends nothing on the bus. Optionally it can write room setpoints
and read the parameters of all bus modules (read queries only).

> **Note:** Unofficial community project, not affiliated with the manufacturer. All mappings are based on bus observations,
> not on manufacturer documentation. Use at your own risk, especially the optional write functions:
> writing to the bus may affect the manufacturer's warranty of your unit.

## Requirements

- Access to the HESP bus (19200 baud, 8N1), one of:
  - **TCP client** (default): RS485-to-TCP gateway in transparent TCP server mode (e.g. port 502); the adapter connects to it.
    Several TCP clients at the same time are fine as long as they only listen.
  - **TCP server:** the gateway works as TCP client and connects to the adapter (port configurable).
  - **Serial interface:** an RS485 interface on the ioBroker host, e.g. a USB-RS485 adapter (`/dev/ttyUSB0`,
    better the stable name under `/dev/serial/by-id/`, or `COM3` on Windows).
    Without gateway buffering, sending into the short bus gaps is probably more reliable (not yet tested on a real bus).
- For *read parameters* and writing, preferably connect only the adapter to the gateway:
  the send gap on the bus is only about 70–80 ms, and every additional connection delays the gateway.
- js-controller ≥ 6, Admin ≥ 7.6.20, Node.js ≥ 22.

## Installation

1. **Bus access:** connect an RS485-to-TCP gateway (tested: USR-TCP232 series) or a USB-RS485 adapter to the HESP bus lines (A/B) of the unit.
   - Settings: 19200 baud, 8 data bits, no parity, 1 stop bit.
   - Gateway mode: TCP server (or TCP client, see above), transparent (no Modbus conversion).
2. **Adapter:** install it in Admin → *Adapters* and create an instance.
3. **Instance:**
   - **Connection:** data source (TCP client, TCP server or serial interface) and its settings.
   - **Modules:** map bus addresses to folder names.
     - `2` = ventilation unit (`unit`), `10`–`15` = room modules (`room10` … `room15`, rename them as you like), probably secondary control units (NBE, "Neben-Bedienelement"; they report the name "Nbe").
     - On the analysed installation, 10–15 followed the order of the central control unit (BDE): hall, bedroom, child 1–4.
   - **Mappings:** the defaults fit an FWT 2-R with BDE Comfort.
   - **Control** (optional): enable room setpoint writing and periodic parameter polling.

## States

| Path | Content |
|---|---|
| `info.connection` | Connected and receiving valid telegrams |
| `info.events`, `info.lastEvent` | Rare events: new registers, changed texts, meta replies |
| `info.capture` | Switch: writes all telegrams for *n* minutes to a file in the instance data folder |
| `info.framesPerHour`, `info.skippedBytesPerHour` | Statistics |
| `<module>.<name>` | Named values according to the **mappings** table (a leading `/` creates the state below the instance root) |
| `<module>.registers.<R/W>_<DP>` | Every register seen: `value` (auto-decoded), `raw` (hex), `lastSeen`, `count` |
| `<room>.heaterEnable` | Only if "enable/lock room heater" is enabled: writable (true/false), sent once as SET `0x0196` and acknowledged once the module reports the state in `0x0194` bit 3. The central control unit (BDE) is not informed. The key lock (`0x0199`) cannot be switched this way: the central control unit rewrites it about every 11 s |
| `unit.device.setClock` | Only if "allow setting the clock" is enabled: button; sets the clock of the ventilation unit (SET `1>2 0x032E`) to system time + offset (settings). The button "Set clock now" in the settings does the same. Only date, hour and minute are set – the unit keeps counting its own seconds; the minute is chosen so that the deviation is at most 30 s. The central control unit queries the time from the unit and then shows the new time |
| `<room>.setpoint` | Only if writing is enabled: writable setpoint, sent as SET `0x01FB` to the room module and acknowledged after the module reports it back. It is sent only 2 s after the last change (sliders deliver intermediate values while dragging). It is sent in the bus gaps after `2>1 0x02D9` and after `40>1 0x0194` (only ~70 ms each); frames there often collide with bus traffic, so up to 10 attempts are made. So far an active key lock does not appear to prevent the module from accepting it |
| `<module>.meta.*` | Self-description of a module (name, DP list, type codes, access, units, error text) |
| `<module>.parameters.*` | Values of all registers of a module, read with *read parameters* |
| `paramRead.*` | Button `start` and status (`running`, `progress`, `status`, `lastRun`) of *read parameters* |

`R` = reply of a module to a read query, `W` = value the master writes to the module. Register numbers in state IDs are decimal.

The writable states (`setpoint`, `heaterEnable`, `setClock`) only exist while the corresponding option is enabled.

## Upgrading from 0.5.x

Up to version 0.5.x the object IDs were German (e.g. `Zentrale.Temperaturen.T1_Zuluft`). Version 0.6.0 uses
English IDs (e.g. `unit.temperatures.t1SupplyAir`). On the first start the adapter migrates once:
- module and mapping names in the instance configuration, as far as they still have the former default names
  (own names, e.g. room names, are kept),
- all objects including their current value and their settings (e.g. history logging),
- enum memberships (rooms, functions) and alias targets,
- the learning log folder (`lernen` → `learn`).

The list of old and new IDs is written to `iobroker-data/proxon-hesp.N/migration-0.6.0.json`.
**Values recorded before the upgrade stay under the old IDs** in your history database; scripts, visualisations
and charts have to be switched to the new IDs.

## Learning log

Option *Learning log* (tab *Advanced*, off by default) writes daily files to `iobroker-data/proxon-hesp.N/learn/`:
- `changes_YYYY-MM-DD.log`: every value change of a register, one line `ms-timestamp R|W<module>:<dp hex>:<sub> <payload hex>`. Each file starts with the complete state.
- `unknown_YYYY-MM-DD.log`: bytes that could not be recognised as a telegram (CRC errors, garbage) and telegrams of unknown type.

Files older than the configured number of days (default 90, 0 = keep) are deleted. A day file is typically a few MB.

## Read parameters

The button `paramRead.start` queries every configured module, the ventilation unit first:
- its name (meta `0x0001`)
- its directory (meta `0x0033` DP list, `0x0034` type, `0x0038` access, `0x0039` unit)
- every parameter once

Only read queries are sent, one per bus gap (about every 12 s), so a full run takes more than an hour.
Periodic polling of the ventilation unit can be enabled under *Control* (off by default).

## Protocol (short)

```
h0 h1 h2 | id (uint32 LE) | len (nibbles) | payload | CRC16 LE
```

- Header: 24 bit LE.
  - Bits 0–3 type: 0 query, 1 set, 2 reply, 3 ack, 4 reject (e.g. meta page beyond the list).
  - Bits 4–13 source, bits 14–23 destination.
- ID: data point in the low 16 bits; the high 16 bits are the sub selector (element offset for meta lists).
- CRC: init `0xFFFF`, reflected polynomial `0x8048`, 16 shift steps per byte.
- The length field overflows for 128-byte replies (`0x00`).

Sources and acknowledgements: see [NOTICE.md](/#/docs/adapterref/iobroker.proxon-hesp/NOTICE.md).

## Changelog
### 0.6.2 (2026-11-23)

- Objects with custom settings (e.g. history logging) are no longer deleted when an option is disabled; they are kept read-only and a warning is logged
- Module names that are already used (case-insensitive) or reserved (`info`, `paramRead`) fall back to `module<address>` with a warning
- Name of the module folder of bus address 1 is translated (was still German from older versions)
- Errors of background tasks are logged instead of restarting the adapter
- Names for the heat pump parameters 0x0115 (switch-on threshold) and 0x011C (continuous operation temperature)

### 0.6.1 (2026-11-19)

- State and channel names in all 11 ioBroker languages (previously English and German only); existing objects are updated on the first start
- Hourly statistics states are created at start

### 0.6.0 (2026-11-18)

- (breaking) English object IDs; existing installations are migrated automatically on the first start (see "Upgrading from 0.5.x")
- State names in English and German; log messages, event texts and value texts in English
- Learning log files renamed (`learn/changes_*`, `learn/unknown_*`)
- Timer settings are limited to valid ranges in the code
- Writable states of disabled options are removed; missing parent channels are created
- README: installation only via the ioBroker repository; NOTICE.md in English

### 0.5.1 (2026-11-17)

- First release published automatically via npm trusted publishing (with provenance)
- README: link to the manufacturer; package metadata cleaned up

### 0.5.0 (2026-11-17)

- Data source selectable: TCP client (as before), TCP server (the gateway connects to the adapter) or a serial interface (e.g. USB-RS485)
- Admin UI translated (English, German and further languages); news and description in all languages
- Node.js ≥ 22 and Admin ≥ 7.6.20 required; standard ioBroker test and release workflow
- Address 30 identified as PTC module (name "PTC-Modul"); new states heat pump requested/active, room sensor correction
- Optional learning log: every value change and all unrecognised bytes in daily files
- Read parameters: up to 8 tries per query (the bus gap is only ~70–80 ms, only about 40 % of the queries get through), rejections (type 4) are recognised immediately; after 12 unanswered queries in a row the gateway connection is re-established
- Optional: enable/lock the room heater (SET `0x0196`, acknowledged via `0x0194` bit 3)
- Optional: set the clock of the ventilation unit (SET `0x032E`, system time + offset in minutes)
- Setpoints: sent in two bus gaps per cycle, up to 10 tries

### 0.4.0 (2026-11-09)

- Read parameters of all modules; button and status directly under the instance; meta lists merged

### 0.3.2 (2026-11-09)

- Read parameters: more robust against missing replies, abort is reported

### 0.3.1 (2026-11-09)

- Setpoint step configurable, default 1 °C (room modules ignored 20.5 °C in tests)

### 0.3.0 (2026-11-09)

- Button "read parameters" (read queries only), optional periodic polling (off by default)

### 0.2.1 (2026-11-09)

- Address 40 identified as air-quality sensor (humidity, CO2)

### 0.2.0 (2026-11-08)

- Optional writing of room setpoints

### 0.1.2 (2026-11-08)

- First versions: passive listening, CRC check with resync, mappings, register store, meta data points, events, capture

## License

MIT License, see [LICENSE](https://github.com/mkneppe/ioBroker.proxon-hesp/blob/main/LICENSE).

Copyright (c) 2026 Martin <mkspam@kneppe.org>