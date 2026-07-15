![Logo](admin/midea.png)

# ioBroker.midea

[![NPM version](http://img.shields.io/npm/v/iobroker.midea.svg)](https://www.npmjs.com/package/iobroker.midea)
[![Downloads](https://img.shields.io/npm/dm/iobroker.midea.svg)](https://www.npmjs.com/package/iobroker.midea)
![Number of Installations (latest)](http://iobroker.live/badges/midea-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/midea-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.midea.png?downloads=true)](https://nodei.co/npm/iobroker.midea/)

ioBroker adapter for Midea, Dimstal and Royal Clima air conditioners. Talks the
**Midea LAN protocol** directly to your appliance — V3 (default), V2 and V1
firmware are all supported. The cloud account is only contacted to retrieve
encryption tokens for V3 appliances and to enrich device names; V1 and V2
appliances run cloudless.

## How it works

1. UDP broadcast on port 6445 to discover all Midea appliances on the LAN.
   V3 firmware replies with a 5a5a/8370 binary frame, V2 with a raw 5a5a frame
   and V1 with an `<?xml …>` response (the adapter then opens a short TCP
   round-trip to the appliance to learn its device id).
2. For V3 appliances the adapter authenticates against the configured cloud
   (MSmartHome by default; NetHome Plus, Midea Air or Ariston Clima are
   selectable in *Cloud app*) and asks for the per-device `{token, key}` pair
   needed for the LAN handshake. V1 and V2 appliances do not need a cloud
   token — discovery alone is enough to control them.
3. From then on, control runs over TCP/6444. V3 uses the 8370 transport
   (AES-256-CBC + HMAC-SHA-256 session) wrapping AES-128-ECB encrypted command
   bodies. V1 and V2 send the same AES-128-ECB command bodies inside raw 5a5a
   packets without the 8370 envelope and without a session key.

The cloud is only used to fetch V3 token/key pairs and to list appliances that
the broadcast did not reach. There is no live data in the cloud path.

## Requirements

- Node.js **20** or newer.
- The ioBroker host must share an L2 broadcast domain with the appliance — UDP
  6445 must reach it. Across VLANs you need a UDP broadcast relay (e.g.
  `udpbroadcastrelay`).
- For V3-firmware appliances (most of the current AC line-up): a cloud account
  in the matching app. *MSmartHome* (`com.midea.ai.overseas`,
  [Google Play](https://play.google.com/store/apps/details?id=com.midea.ai.overseas))
  is the default. *NetHome Plus*, *Midea Air* and *Ariston Clima* are also
  supported and can be picked in the *Cloud app* setting. V1- and V2-firmware
  appliances are controlled cloudless and ignore the credentials.

## Configuration

| Field      | Description                                                                   |
| ---------- | ----------------------------------------------------------------------------- |
| `user`     | E-mail of your MSmartHome account.                                            |
| `password` | Password of your MSmartHome account.                                          |
| `interval` | Poll interval in seconds (5–3600, default 30). Each device is polled locally. |

## Object tree

```text
midea.0
├── info.connection                 — boolean: cloud reachable
└── <deviceId>
    ├── info.*                      — id, name, host, mac, firmware, online…
    ├── capabilities.*              — flags reported by the appliance (B5)
    ├── status.*                    — current device state (read-only)
    └── control.*                   — writeable commands
```

### Controls (residential AC, 0xAC)

| Control               | Type    | Description                                    |
| --------------------- | ------- | ---------------------------------------------- |
| `powerOn`             | boolean | Turn the unit on/off                           |
| `mode`                | enum    | auto / cool / dry / heat / fanonly / customdry |
| `temperatureSetpoint` | number  | 16–31 °C (60–87 °F)                            |
| `temperatureUnit`     | enum    | celsius / fahrenheit                           |
| `fanSpeed`            | number  | 0–102 (102 = auto)                             |
| `fanSpeedName`        | enum    | silent / low / medium / high / full / auto     |
| `swing`               | enum    | off / vertical / horizontal / both             |
| `ecoMode`             | boolean | Eco mode                                       |
| `turboMode`           | boolean | Turbo mode                                     |
| `sleepMode`           | boolean | Sleep mode                                     |
| `purify`              | boolean | Ionizer / purify                               |
| `dryClean`            | boolean | Internal dryer                                 |
| `frostProtection`     | boolean | 8 °C frost-protection heating                  |
| `toggleDisplay`       | button  | Toggle the indoor display LED                  |

The `status.*` tree exposes everything the device reports (indoor / outdoor
temperature, swing axes, error codes, timer state, total `powerUsage` in kWh, …).
The `capabilities.*` tree mirrors the B5 capability response so you can branch
your scripts on what the appliance actually supports.

### Controls (dehumidifier, 0xA1)

| Control            | Type    | Description                                             |
| ------------------ | ------- | ------------------------------------------------------- |
| `powerOn`          | boolean | Turn the unit on/off                                    |
| `mode`             | enum    | set / continuity / auto / dry_clothes / dry_shoes / fan |
| `targetHumidity`   | number  | 0–100 % target humidity                                 |
| `fanSpeed`         | number  | 0–127 (40 silent, 60 low, 80 high, 102 auto)            |
| `fanSpeedName`     | enum    | silent / low / medium / high / auto                     |
| `ionMode`          | boolean | Ionizer / anion mode                                    |
| `sleepMode`        | boolean | Sleep mode                                              |
| `pumpSwitch`       | boolean | Drain pump on/off                                       |
| `verticalSwing`    | boolean | Vertical swing                                          |
| `tankWarningLevel` | number  | Tank warning threshold (0–100 %)                        |

The `status.*` tree exposes everything the device reports (indoor / outdoor
temperature, swing axes, error codes, timer state, total `powerUsage` in kWh, …).
The `capabilities.*` tree mirrors the B5 capability response so you can branch
your scripts on what the appliance actually supports.

## Supported appliance types

Coverage spans all 36 Midea V3 appliance types described in
[midea-local](https://github.com/midea-lan/midea-local).

Full control:

- `0xAC` residential AC, `0xCC` commercial AC, `0xA1` dehumidifier, `0xFA` fan,
  `0xFC` air purifier, `0xFD` humidifier.
- `0xCE` fresh-air, `0xCF` heat pump, `0xCD` heat-pump water heater,
  `0xC3` heat-pump controller (zones, DHW, silent/eco/disinfect).
- `0xDA` top-load washer, `0xDB` front-load washer, `0xDC` dryer.
- `0xE2` electric water heater, `0xE3` gas water heater, `0xE6` gas boiler,
  `0xFB` electric heater.
- `0xE1` dishwasher, `0xB0` microwave, `0xBF` integrated oven, `0xB6` range hood,
  `0xB8` vacuum, `0xC2` smart toilet, `0xED` water purifier.
- `0x13` light, `0x26` bathroom heater, `0x34` bathroom dishwasher,
  `0x40` bathroom fan.

Read-only metadata (no `MessageSet` defined upstream):

- `0xCA` refrigerator.
- `0xE8` pressure cooker, `0xEA`/`0xEC` rice cookers.
- `0xB1` oven, `0xB3` steamer, `0xB4` oven-steam combo.
- `0xAD` air-box (PM2.5 / VOC sensor).

For every controllable type, the writable fields are exposed under
`<deviceId>.control.*`; sensor values land under `<deviceId>.status.*`.

### Controls (fan, 0xFA)

| Control            | Type    | Description                                             |
| ------------------ | ------- | ------------------------------------------------------- |
| `powerOn`          | boolean | Turn the unit on/off                                    |
| `childLock`        | boolean | Child lock                                              |
| `mode`             | enum    | normal / natural / sleep / comfort / silent / baby / …  |
| `fanSpeed`         | number  | 1–26                                                    |
| `oscillate`        | boolean | Oscillation on/off                                      |
| `oscillationMode`  | enum    | off / oscillation / tilting / curve-w / curve-8 / both  |
| `oscillationAngle` | enum    | off / 30 / 60 / 90 / 120 / 180 / 360                    |
| `tiltingAngle`     | enum    | off / 30 / 60 / 90 / 120 / 180 / 360 / +60 / -60 / 40   |

### Controls (air purifier, 0xFC)

| Control             | Type    | Description                                       |
| ------------------- | ------- | ------------------------------------------------- |
| `powerOn`           | boolean | Turn the unit on/off                              |
| `mode`              | enum    | standby / auto / manual / sleep / fast / smoke    |
| `fanSpeedName`      | enum    | auto / standby / low / medium / high              |
| `anion`             | boolean | Anion / ionizer                                   |
| `childLock`         | boolean | Child lock                                        |
| `screenDisplayName` | enum    | bright / dim / off                                |
| `detectMode`        | enum    | off / pm25 / methanal                             |
| `standby`           | boolean | Auto-standby on clean air                         |

The status tree exposes pm25, tvoc, hcho, filter1Life and filter2Life as
read-only sensor values.

### Controls (humidifier, 0xFD)

| Control             | Type    | Description                                                          |
| ------------------- | ------- | -------------------------------------------------------------------- |
| `powerOn`           | boolean | Turn the unit on/off                                                 |
| `mode`              | enum    | manual / auto / continuous / living-room / bed-room / kitchen / sleep |
| `targetHumidity`    | number  | 0–100 % target humidity                                              |
| `fanSpeedName`      | enum    | lowest / low / medium / high / auto / off                            |
| `screenDisplayName` | enum    | bright / dim / off                                                   |
| `disinfect`         | boolean | Disinfect cycle                                                      |

The status tree exposes currentHumidity, currentTemperature and tank as
read-only sensor values.

## Troubleshooting

- **`LAN discovery found 0 appliance(s)`** — your ioBroker host is not on the
  same broadcast domain as the appliance, or UDP 6445 is firewalled.
- **`Could not fetch token/key for …`** — the device is offline in the cloud
  account, or the credentials in the adapter config are wrong.
- **`LanClient: timeout`** — the AC is reachable on UDP but TCP/6444 is being
  blocked, or another LAN client (the phone app) is currently connected.
  Only one TCP control session is allowed at a time.

Switch the adapter to debug logging — every protocol step (cloud calls, UDP
discovery, TCP handshake, encrypted frames) is logged with payload sizes and
device ids so the implementation can be diagnosed from logs alone.

## Changelog

<!-- 
  Placeholder for next versions. Do NOT remove. 
-->
### 1.8.6 (2026-06-29)
- Improved State parsing

### 1.8.5 (2026-06-13)
- Improve Device detection

### 1.8.4 (2026-06-01)
- Minor Bugfixes

### 1.8.3 (2026-05-25)

-   Adds a NetHome Plus Fallback for ot working devices

### 1.8.1 (2026-05-24)

-   Fixes MSmartHome `getToken` 3004 ("value is illegal") by aligning
    the V3 cloud request with the msmart-ng reference: drops the
    `uid:null` and `platformId` body fields, the `Authorization` header,
    switches the `random` header to crypto-random hex and the `stamp`
    to UTC.

### 1.8.0 (2026-05-24)

-   Fixes MSmartHome `getToken` 3004 on regional accounts: the V3
    client now follows the cloud's MAS re-route, sends the missing
    auth header, and falls back from LITTLE to BIG udpId.

### 1.7.1 (2026-05-20)

-   Adds a fixture-driven test suite for the unified `_processFrame`
    hook introduced in 1.7.0. Covers all 26 device classes and replays
    two real captures (A1 dehumidifier) so future parser changes break
    loudly. No runtime behaviour change.

### 1.5.0 (2026-05-19)

-   Adds LAN support for V1- and V2-firmware appliances. They are now
    discovered alongside V3 devices and controlled directly over TCP/6444 —
    no cloud token required (V1 only needs the cloud for the device list, V2
    works fully offline).
-   Tested only against V3 hardware; V1/V2 paths are ported from the
    `midea-local` reference implementation. Reports of mis-decoded frames are
    welcome.

### 1.4.0 (2026-05-19)

-   Adds NetHome Plus, Midea Air and Ariston Clima cloud accounts (V3 firmware
    appliances). Pick the cloud variant in the new "Cloud app" setting; the
    default stays MSmartHome.
-   Object tree simplified: devices now appear directly under the instance
    (no `devices.<id>` prefix) and the controls channel is now called
    `control`.
-   On first 1.4.0 start the old object tree is cleared automatically. If you
    want to start fresh later, set `info.migrationV1` to `false` and restart
    the adapter.
-   V1-firmware appliances on the LAN are not supported — they show up in
    the cloud list but never respond to local discovery.

### 1.3.1 (2026-05-19)

-   Controls now stay automatically in sync with the device status across all
    appliance types.
-   Internal refactor — no behavior changes for end users.

### 1.3.0

-   Coverage for all 36 Midea appliance types.
-   Full control for heat pumps, washers and dryer, water heaters, gas boiler,
    electric heater, dishwashers, microwave, oven, range hood, vacuum, smart
    toilet, water purifier, bathroom light/heater/fan and fresh-air.
-   Read-only data for refrigerator, pressure/rice cookers, oven/steamer and
    air-box.

### 1.2.0

-   Full control for fan, air purifier, and humidifier.

### 1.1.0

-   Full control for dehumidifier and commercial AC.
-   Poll interval is now in seconds (default 30 s).

### 1.0.0

-   Breaking change: rewritten on the LAN-first Midea V3 protocol. The cloud is
    only used to fetch each device's token/key.
-   Adds device discovery, local status polling, full AC controls and metadata
    for other appliances.

### 0.0.7

-   Last release of the legacy implementation.

## License

MIT License

Copyright (c) 2020-2026 TA2k <tombox2020@gmail.com>

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
