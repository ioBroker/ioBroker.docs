---
chapters: {"pages":{"en/adapterref/iobroker.go-e-wallbox/README.md":{"title":{"en":"ioBroker.go-e-wallbox"},"content":"en/adapterref/iobroker.go-e-wallbox/README.md"},"en/adapterref/iobroker.go-e-wallbox/docs/DEVELOPMENT.md":{"title":{"en":"Development notes"},"content":"en/adapterref/iobroker.go-e-wallbox/docs/DEVELOPMENT.md"}}}
---
![Logo](admin/go-e-wallbox.png)

# ioBroker.go-e-wallbox

**English** · [Deutsch](https://github.com/BenZ-ITS/ioBroker.go-e-wallbox/blob/main/docs/de/README.md)

Lean device mirror for **go-e Charger** wallboxes ([manufacturer website](https://go-e.com/en/)).

The adapter exposes the values of the official local HTTP API v2 as ioBroker states – readable and, where the API
allows it, writable. It contains **no charging logic of its own**: no surplus control, no schedules. What the wallbox
does is decided by you, in your own scripts, or by the wallbox itself.

This is an independent project, written from scratch against the
[official go-e API documentation](https://github.com/goecharger/go-eCharger-API-v2). It is not affiliated with go-e GmbH.

## When to use it

Use this adapter if you want direct access to the wallbox – for example the force state (`frc`), the energy limit set
in the app (`dwo`) or the reason why the wallbox is charging or not (`modelStatus`) – and bring your own logic.
Any API key that has no state of its own can be added under "Additional API keys" and then appears below `raw`.

If you want a ready-made PV surplus controller, an adapter with built-in control is the better choice.

## Requirements

- go-e Charger with **local HTTP API v2** (enable it in the go-e app).
- Node.js 22 or newer, js-controller 6.0.11 or newer, admin 7.6.20 or newer.

> **Tested with:** go-eCharger **V4**, firmware **60.5** – reading, writing a changed value, rejecting invalid values
> and picking up changes made in the go-e app. **No other model or firmware version has been tested.** Other devices
> with the local HTTP API v2 will probably work, but states may be missing or behave differently. Reports are welcome.

Support for the legacy API v1 (older hardware) is planned; the state layout will stay the same.

## Installation

### 1. Prepare the wallbox

Enable the **local HTTP API v2** in the go-e app. Give the wallbox a fixed IP address in your router, or use its
host name.

### 2. Install the adapter

Open **Adapters** in the admin interface, search for **go-e-wallbox** and install it. Leave "Create instance" checked.

The adapter is not listed in the ioBroker adapter repository yet. Until it is, and for test versions, install it from
a package file as described in [docs/DEVELOPMENT.md](/#/docs/adapterref/iobroker.go-e-wallbox/docs/DEVELOPMENT.md#installing-a-package-file).

### 3. Configure the instance

1. Open **Instances** and the settings of `go-e-wallbox.0`.
2. Add one row per wallbox with its IP address or host name.
3. Recommended for the first start: check **Read-only mode**. The adapter then only reads.
4. Save. The log shows `connected` for every wallbox, and the states appear below
   `go-e-wallbox.0.<serial number>`.
5. To control the wallbox through the states, switch the read-only mode off again.

If a wallbox cannot be reached, the log names the reason. `HTTP 404` means that the local HTTP API v2 is not
enabled.

### Update

Update the adapter on the **Adapters** page. Instance and settings are kept.

### Uninstall

Delete the instance on the **Instances** page and then the adapter on the **Adapters** page, or run
`iobroker del go-e-wallbox` on the host.

## Configuration

| Setting             | Meaning                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| Wallboxes           | One row per wallbox: IP address or host name and an optional name                                    |
| Poll interval       | Seconds between two status requests (default 5). The wallbox evaluates its logic once per second     |
| Request timeout     | Seconds until a request counts as failed (default 4)                                                 |
| Read-only mode      | The adapter never sends anything to the wallboxes. Written states are reset to the reported value    |
| Additional API keys | Comma-separated keys from the API documentation; they appear unprocessed below `raw`                 |

## States

Each wallbox gets a device named after its serial number: `go-e-wallbox.0.<serial>.…`.
A state is only created if the firmware actually delivers the underlying key.

| State                        | API key       | Write | Meaning                                                                    |
| ---------------------------- | ------------- | :---: | -------------------------------------------------------------------------- |
| `info.online`                | –             |       | Wallbox answered the last request                                          |
| `info.serial` / `model` / `firmware` / `variant` | `sse` `typ` `fwv` `var` | | Device identification                             |
| `info.friendlyName`          | `fna`         |   ✔   | Device name                                                                |
| `info.rssi`                  | `rssi`        |       | WiFi signal strength in dBm                                                |
| `info.uptime`                | `rbt`         |       | Minutes since boot                                                         |
| `car.state`                  | `car`         |       | 1 = no car, 2 = charging, 3 = waiting for car, 4 = complete, 5 = error     |
| `car.connected`              | `car`         |       | `true` for car states 2, 3 and 4                                           |
| `car.chargedEnergy`          | `wh`          |       | Wh since the car was plugged in                                            |
| `car.cableCurrentLimit`      | `cbl`         |       | Current limit of the cable in A                                            |
| `car.cableLock`              | `cus`         |       | Cable lock state                                                           |
| `charging.allowed`           | `alw`         |       | The car may charge right now                                               |
| `charging.reason`            | `modelStatus` |       | Why charging is allowed or not (force state, energy limit, phase switch …) |
| `charging.forceState`        | `frc`         |   ✔   | 0 = neutral, 1 = off, 2 = on                                               |
| `charging.current`           | `amp`         |   ✔   | Requested charging current in A (6–32)                                     |
| `charging.currentLimit`      | `ama`         |   ✔   | Upper limit for the charging current in A                                  |
| `charging.allowedCurrent`    | `acu`         |       | Current the car may draw right now                                         |
| `charging.phaseSwitchMode`   | `psm`         |   ✔   | 0 = auto, 1 = force 1-phase, 2 = force 3-phase                             |
| `charging.energyLimit`       | `dwo`         |   ✔   | Energy limit per session in Wh; `0` = no limit                             |
| `charging.logicMode`         | `lmo`         |   ✔   | 3 = Default (Basic), 4 = Awattar (Eco), 5 = Automatic stop (Daily Trip)    |
| `charging.error`             | `err`         |       | Error code                                                                 |
| `energy.power`, `energy.powerL1…L3` | `nrg`  |       | Charging power in W, total and per phase                                   |
| `energy.voltageL1…L3`        | `nrg`         |       | Voltage in V                                                               |
| `energy.currentL1…L3`        | `nrg`         |       | Current in A                                                               |
| `energy.total`               | `eto`         |       | Total energy in Wh                                                         |
| `energy.frequency`           | `fhz`         |       | Grid frequency in Hz                                                       |
| `energy.phases`              | `pha`         |       | Number of phases switched to the car (0 = contactor open)                  |
| `temperature.sensor1/2`      | `tma`         |       | Temperatures in °C                                                         |
| `pv.useSurplus`              | `fup`         |   ✔   | PV surplus function of the wallbox on/off                                  |
| `pv.startingPower`           | `fst`         |   ✔   | Starting power for surplus charging in W                                   |
| `pv.gridPower` / `pvPower` / `batteryPower` | `pgrid` `ppv` `pakku` | | Power values the wallbox currently knows              |
| `settings.accessControl`     | `acs`         |   ✔   | 0 = open, 1 = wait                                                         |
| `settings.cableUnlock`       | `ust`         |   ✔   | 0 = normal, 1 = auto unlock, 2 = always lock                               |
| `settings.ledBrightness`     | `lbr`         |   ✔   | 0–255                                                                      |
| `settings.minChargingCurrent`| `mca`         |   ✔   | Minimum charging current in A                                              |
| `settings.awattarMaxPrice`   | `awp`         |   ✔   | Maximum price in Eco mode in ct                                            |
| `settings.automaticStopEnergy` / `automaticStopTime` | `ate` `att` | ✔ | Daily Trip: energy in Wh and time in seconds since midnight |
| `raw.<key>`                  | any           |       | Additional keys; objects and arrays as JSON text                           |

### Writing

Set a writable state with `ack = false`. The adapter validates the value, sends it to the wallbox and re-reads the
status one second later; the state is acknowledged with the value the wallbox reports. If the value is invalid, the
wallbox refuses it or cannot be reached, a warning is logged and the state returns to the last reported value.

Measurements are rounded (power and voltage to whole numbers, current to 0.1 A) and states are only updated when
their value changes, so a short poll interval does not flood the system.

## Development

```bash
npm install
npm run check   # type check
npm run lint
npm test        # unit and package tests
npm run test:integration   # starts the adapter in a real js-controller
```

Architecture, conventions and the release procedure are described in [docs/DEVELOPMENT.md](/#/docs/adapterref/iobroker.go-e-wallbox/docs/DEVELOPMENT.md).

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.4 (2026-11-17)

- State and channel names in all languages of ioBroker
- States are no longer set to `null` when the wallbox reports no value; they keep their last value and are only
  created once the wallbox delivers one
- `info.friendlyName` now has the role `text` (it is writable), `info.rssi` the role `value.rssi`
- Additional API keys that differ only in upper/lower case are used once
- Link to the manufacturer website in the readme

### 0.1.3 (2026-11-14)

- Settings page, title and description in all languages of ioBroker
- Requires admin 7.6.20 or newer
- Published with npm provenance

### 0.1.2 (2026-11-14)

- Renamed to `go-e-wallbox` (package `iobroker.go-e-wallbox`)
- Tested on Linux, Windows and macOS with Node.js 22, 24 and 26

### 0.1.1

- Fix: `energy.phases` showed 0 while charging; it now counts the phases switched to the car (`pha`)

### 0.1.0

- Initial release: local HTTP API v2, multiple wallboxes, read and write access, read-only mode

## License

MIT License

Copyright (c) 2026 ben <go-e-wallbox@e-bin.de>

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