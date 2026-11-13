![Logo](admin/solinteg.png)

# ioBroker.solinteg

[![NPM version](https://img.shields.io/npm/v/iobroker.solinteg.svg)](https://www.npmjs.com/package/iobroker.solinteg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.solinteg.svg)](https://www.npmjs.com/package/iobroker.solinteg)
![Test and Release](https://github.com/bueste/ioBroker.solinteg/actions/workflows/test-and-release.yml/badge.svg)

Reads PV, grid/meter and battery data from **Solinteg hybrid inverters** with any attached battery, over **local Modbus TCP**. No cloud account, no internet access required.

## Disclaimer

Solinteg, Dyness, Wattsonic and M-TEC are trademarks of their respective holders. This is an independent, community-maintained adapter, not developed, endorsed or supported by any of them. The Solinteg logo above is used with permission.

## Table of contents

- [Why this adapter?](#why-this-adapter)
- [Compatibility](#compatibility)
- [Register source and limitations (please read)](#register-source-and-limitations-please-read)
- [Installation](#installation)
- [Configuration](#configuration)
- [Object/state structure](#objectstate-structure)
- [EMS write access (controlling the inverter/battery)](#ems-write-access-controlling-the-inverterbattery)
- [Polling and efficient reads](#polling-and-efficient-reads)
- [Troubleshooting / FAQ](#troubleshooting--faq)
- [Security & privacy](#security--privacy)
- [Development](#development)
- [Changelog](#changelog)
- [License](#license)

## Why this adapter?

Manufacturer and device information: [Solinteg](https://www.solinteg.com) (hybrid inverters and battery energy storage systems).

There is no generic "Solinteg" support in ioBroker. The Solinteg WR speaks openly documented Modbus TCP, so it could in principle be read out with the generic `ioBroker.modbus` adapter and a manually entered register list - but that means re-entering 50+ registers by hand in the admin UI, with no code-level control over scaling, data types or object structure. This adapter instead talks Modbus TCP directly (via `modbus-serial`), the same way [ioBroker.zeptrion](https://github.com/bueste/ioBroker.zeptrion), [ioBroker.goodwe-sems](https://github.com/bueste/ioBroker.goodwe-sems) and [ioBroker.husqvarna-automower-connect](https://github.com/bueste/ioBroker.husqvarna-automower-connect) each talk directly to their respective device/cloud API, giving full control over register mapping, scaling and the resulting object tree - plus the option to actively control the inverter/battery (EMS write access, off by default).

## Compatibility

This adapter targets Solinteg's **INTEG-M Modbus register family**, shared across:

- Solinteg MHT series hybrid inverters (developed and tested against **MHT-25~50K-100**, 25-50 kW three-phase)
- Rebrands of the same hardware/register family: **Wattsonic** and **M-TEC Energy Butler** inverters (per the reference implementation below - not independently confirmed by this adapter's author)

Battery support is generic: the adapter reads whatever battery data the inverter itself reports over Modbus (SOC/SOH/voltage/current/power, min/max cell voltage), regardless of battery brand - it does not talk to the battery directly. Tested/developed against a **Dyness STACK100** (51.2 kWh, connected to the inverter via CAN/RS485), but any battery supported by the inverter should work the same way.

If your device uses the same register family but isn't listed here, please open an issue or PR - the goal is to cover the whole Solinteg/INTEG-M ecosystem, not just one specific inverter+battery combination.

## Register source and limitations (please read)

Register addresses in [`lib/registers.js`](https://github.com/bueste/ioBroker.solinteg/blob/main/lib/registers.js) are sourced from the official Solinteg Modbus TCP protocol documentation, cross-checked against [`wills106/homeassistant-solax-modbus`](https://github.com/wills106/homeassistant-solax-modbus) (`custom_components/solax_modbus/plugin_solinteg.py`), which documents the identical INTEG-M register family also used by Wattsonic and M-TEC Energy Butler rebrands.

**Verified on 2026-10-05 against a real MHT-25~50K-100 (unit ID 255, Dyness STACK100 battery):** every register of the map answers, the 32-bit word order (high word first) and all scales are confirmed by plausible values (e.g. AC power -3601 W against battery power -3600 W). The PV registers could not be checked with real production yet (no PV connected at the time). The EMS control registers (`50xxx`/`52xxx` block) read back correctly, but their effect when WRITING has not been tested - check it carefully before enabling [EMS write access](#ems-write-access-controlling-the-inverterbattery).

Dyness battery cell-level detail beyond min/max cell voltage (16 individual cell voltages per module) is **not** available over Modbus at the inverter - only min/max cell voltage and their cell IDs are exposed there. Full per-cell detail requires the separate Dyness Cloud API/MQTT (`ems.dyness.com` Developer Center), which this adapter does not implement.

## Installation

Once this adapter is listed in the official ioBroker adapter repository, install it the normal way: **Admin -> Adapters -> search for "solinteg" -> install**.

Until then, an ioBroker administrator can add it manually on the ioBroker host:

```
iobroker url iobroker.solinteg
```

## Configuration

| Tab | Setting | Description |
| --- | --- | --- |
| Connection | Host / IP address | IP or hostname of the inverter (or Modbus TCP/RTU gateway) |
| Connection | Port | Modbus TCP port, usually 502 |
| Connection | Unit ID | Modbus unit ID, default 255 (Solinteg MHT inverters over Modbus TCP); 0-255 are accepted |
| Connection | Request timeout | Timeout per Modbus request, in seconds |
| Polling | Fast poll interval | How often power/flow values (PV, grid, battery) are read (default 5s) |
| Polling | Slow poll interval | How often energy counters and diagnostics are read (default 30s) |
| EMS control | Enable EMS write access | Off by default - see [EMS write access](#ems-write-access-controlling-the-inverterbattery) |

## Object/state structure

```
solinteg.0.info.connection                 Inverter reachable (bool)
solinteg.0.info.lastSuccess                Timestamp of the last successful poll
solinteg.0.info.lastError                  Last error message

solinteg.0.info.serialNumber / .firmwareVersion (text, e.g. V10.6.4.4-3.10.13.0)
solinteg.0.diag.inverterStatus / .faultFlags1-3 / .operationFlags / .armFaultFlags1-2
solinteg.0.diag.radiatorTemperature / .temperatureR-T

solinteg.0.pv.string1-4.voltage / .current / .power
solinteg.0.pv.totalPower

solinteg.0.grid.acPower / .frequency
solinteg.0.grid.voltageL1-3 / .currentL1-3

solinteg.0.meter.power / .powerL1-3
solinteg.0.meter.gridImportTotal / .gridExportTotal / .gridImportToday / .gridExportToday
solinteg.0.grid.backupPower

solinteg.0.battery.voltage / .current / .power / .soc / .soh / .temperature
solinteg.0.battery.minCellVoltage / .maxCellVoltage (+ their cell IDs)
solinteg.0.battery.chargeLimit / .dischargeLimit
solinteg.0.battery.chargeToday / .chargeTotal / .dischargeToday / .dischargeTotal
solinteg.0.battery.manufacturer / .ratedCapacity

solinteg.0.energy.pvGenerationToday / .pvGenerationTotal
solinteg.0.energy.acGenerationToday / .acGenerationTotal
solinteg.0.energy.houseConsumptionToday / .houseConsumptionTotal

solinteg.0.ems.*                           EMS control registers, see below
```

All PV/grid/meter/battery power-flow states are polled at the fast interval; energy counters, diagnostics and EMS registers are polled at the slow interval.

## EMS write access (controlling the inverter/battery)

The `ems.*` states (working mode, charge/discharge power target, import/export limits, battery SOC protection limits, ...) are always **read**, so you can see the inverter's current EMS configuration regardless of this setting. **Writing** to them is disabled by default: any attempted write is logged and ignored until "Enable EMS write access" is turned on in the instance configuration.

Only enable this if you actively want to control the inverter/battery (e.g. schedule charge/discharge power, cap grid export). Getting a register or scaling wrong here can put the inverter into an unintended operating mode - see [Register source and limitations](#register-source-and-limitations-please-read).

## Polling and efficient reads

[`lib/blocks.js`](https://github.com/bueste/ioBroker.solinteg/blob/main/lib/blocks.js) merges adjacent (or near-adjacent, small-gap) registers into as few `readHoldingRegisters()` calls as possible per poll cycle, instead of one Modbus request per register. Fast-group and slow-group registers are blocked independently and polled on their own interval.

## Troubleshooting / FAQ

**`info.connection` stays `false` / no states update.**
Check host/port/unit ID in the instance configuration, and that nothing (firewall, VLAN separation) blocks TCP port 502 between the ioBroker host and the inverter. Check `info.lastError` for the actual error message and the adapter log (Instance -> Expert mode -> Log level `debug`) for the underlying Modbus error.

**How do I find my inverter's IP address?**
Check your router's/DHCP server's client list for the inverter (often shows up by MAC vendor prefix or a Solinteg-related hostname), or check the inverter's own display/WiFi setup app if it has one.

**Values look wildly wrong (huge numbers, negative where positive expected, etc.).**
Most likely a `u32`/`s32` byte-order or scaling mismatch for that specific register - see [Register source and limitations](#register-source-and-limitations-please-read). Please open a GitHub issue with the raw value from `info.rawResponse`-style debugging (enable debug logging) or the actual vs. expected value, so the register map can be corrected.

**Can I use this with a Wattsonic or M-TEC Energy Butler inverter?**
In theory yes, per [Compatibility](#compatibility) - these share the same INTEG-M register family. This hasn't been independently confirmed by the adapter author against that hardware; feedback (positive or negative) via a GitHub issue is very welcome.

**Nothing happens when I write to an `ems.*` state.**
EMS write access is disabled by default - see [EMS write access](#ems-write-access-controlling-the-inverterbattery). Check the log for a warning confirming the write was ignored.

## Security & privacy

- The adapter performs Modbus TCP against a device on your local network - no cloud account, no external API, no credentials to store.
- EMS write access (the only functionality that can change the inverter's behavior) is disabled by default and must be explicitly enabled.
- Written values are range-checked against each register's documented min/max before being sent.

## Development

```
npm install
npm run lint
npm test          # unit tests (lib/registers.js, lib/modbusClient.js, lib/blocks.js) + package consistency check
```

Recommended additionally before every release:

```
npx @iobroker/repochecker@latest .
```

Pull requests are welcome, especially to verify/correct register addresses against real hardware, or to improve translations (currently English/German are complete; the other 9 languages use English text as a placeholder).

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.1.10 (2026-11-02)

- Fix: the writable `ems.*` states were never subscribed, so every write to them was ignored. The adapter now subscribes to `ems.*` on start.
- Polling: each cycle is scheduled with `setTimeout` after the previous one has finished (was `setInterval`), so cycles cannot overlap or pile up when the inverter answers slowly. Reconnects after repeated errors now really wait for the backoff time.
- German label of the Unit ID field.

### 0.1.9 (2026-10-05)

- Type checking: `npm run check` (tsc with JSDoc types, `tsconfig.json`, `adapter-config.d.ts`) now runs in CI; the register map, the Modbus client and the adapter class are typed.
- Fix: a value that is neither a number nor a boolean written to a writable state is rejected with a warning (it would have been written to the register as 0).
- Older changelog entries moved to `CHANGELOG_OLD.md`.

### 0.1.8 (2026-10-05)

- Fix: the object tree now contains a channel object for every path segment (`pv.string1` to `pv.string4` were missing, reported by the ioBroker object structure check, E3009).

### 0.1.7 (2026-10-05)

- README: link to the manufacturer website (requirement of the ioBroker repository).

### 0.1.6 (2026-10-05)

- Preparation for the ioBroker repository: translations of the admin texts and of the metadata (title, description, news) in all languages, square 512x512 icon, `common.tier`, updated dependencies (`@iobroker/testing` 6, release-script 5, adapter-core 3.4.3), prettier configuration, Dependabot configuration.

### 0.1.5 (2026-10-05)

- Fix: a register that currently holds its "no value" marker (the off-grid command register reads 0xFFFF when no command is pending) now clears its state instead of keeping a stale value (`ems.offGridSwitch` kept showing `true`).

### 0.1.4 (2026-10-05)

- Fix: states created by an earlier version keep their old `common.min`/`common.max`, which still caused a warning at every start for values the inverter reports outside the write range. The adapter now removes these limits from existing states at startup.

## Older changes

See CHANGELOG_OLD.md for the changes of versions 0.1.3 and older.

## License

MIT License

Copyright (c) 2026 Stefan Bühler <iobroker@mailcarrier.ch>

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