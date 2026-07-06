<img src="admin/wattcycle.png" width="100" />

# ioBroker.wattcycle

Reads WattCycle / XDZN BLE batteries (TDT protocol, characteristics fff1/fff2/fffa, "HiLink" auth) into ioBroker.

## Features

- Continuously polls a configurable list of batteries via BLE.
- Per-battery states for SoC, voltage, current, power, capacity, cycles, MOSFET/PCB/cell temperatures, individual cell voltages.
- Built-in BLE scan from the admin UI to discover MAC addresses of nearby devices.
- Configurable poll interval, gap between batteries and Bluetooth (HCI) adapter.

## Configuration

Open the admin UI and on the **Main settings** tab choose:
- **Bluetooth adapter (hciX)** — the HCI device id (`0` = `hci0`).
- **Polling interval (ms)** — interval between full poll cycles.
- **Gap between batteries (ms)** — pause between consecutive battery reads in one cycle.
- **Scan duration (ms)** — how long the BLE scan runs.

On the **Batteries** tab press **Scan for BLE devices**, then copy MAC addresses of your batteries into the table below and assign each one a name.

## States

For every configured battery the following states are created under `wattcycle.<instance>.batteries.<name>`:

| State                  | Type    | Unit | Description                              |
|------------------------|---------|------|------------------------------------------|
| `soc`                  | number  | %    | State of charge                          |
| `voltage`              | number  | V    | Pack voltage                             |
| `current`              | number  | A    | Current (signed, charge positive)        |
| `power`                | number  | W    | Voltage × current                        |
| `remaining_ah`         | number  | Ah   | Remaining capacity                       |
| `total_ah`             | number  | Ah   | Total capacity                           |
| `design_ah`            | number  | Ah   | Design capacity                          |
| `cycles`               | number  |      | Cycle count                              |
| `cell_spread_mv`       | number  | mV   | Difference between highest/lowest cell   |
| `mos_temp`             | number  | °C   | MOSFET temperature                       |
| `pcb_temp`             | number  | °C   | PCB temperature                          |
| `cells_v`              | string  |      | JSON array of cell voltages (V)          |
| `cell_temps`           | string  |      | JSON array of cell temperatures (°C)     |
| `product.model_or_fw`  | string  |      | Model / firmware string                  |
| `product.manufacturer` | string  |      | Manufacturer string                      |
| `product.serial`       | string  |      | Serial number                            |
| `lastUpdate`           | number  |      | Timestamp of last successful read        |
| `reachable`            | boolean |      | True if last read succeeded              |
| `lastError`            | string  |      | Error from last failed read              |

In addition, an aggregate device `wattcycle.<instance>.total` is created (assumes parallel topology):

| State                       | Type   | Unit | Aggregation     |
|-----------------------------|--------|------|-----------------|
| `soc`                       | number | %    | average         |
| `soc_min`                   | number | %    | minimum         |
| `soc_max`                   | number | %    | maximum         |
| `voltage`                   | number | V    | average         |
| `voltage_min`               | number | V    | minimum         |
| `voltage_max`               | number | V    | maximum         |
| `current`                   | number | A    | sum             |
| `power`                     | number | W    | sum             |
| `remaining_ah`              | number | Ah   | sum             |
| `total_ah`                  | number | Ah   | sum             |
| `design_ah`                 | number | Ah   | sum             |
| `cycles_avg`                | number |      | average         |
| `cell_spread_mv_max`        | number | mV   | maximum         |
| `mos_temp_max`              | number | °C   | maximum         |
| `pcb_temp_max`              | number | °C   | maximum         |
| `count`                     | number |      | reachable count |
| `lastUpdate`                | number |      | aggregate ts    |

## Messages

```js
// Force an immediate poll cycle
sendTo('wattcycle.0', 'pollNow', null, res => console.log(res));

// Run a BLE scan
sendTo('wattcycle.0', 'scan', { duration: 8000 }, res => console.log(res.devices));
```

## Requirements

- Linux with BlueZ (`apt install bluez libbluetooth-dev`).
- Node.js ≥ 20.
- Adapter must be allowed to access the HCI socket (typically run as root or with `setcap`).
- Bluetooth adapter must support Bluetooth 5.0 (LE long range).

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

[Older changelogs can be found there](CHANGELOG_OLD.md)

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
