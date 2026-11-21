![Logo](admin/mh-logo.png)

# ioBroker.alpha2

[![NPM version](https://img.shields.io/npm/v/iobroker.alpha2.svg)](https://www.npmjs.com/package/iobroker.alpha2)
[![Downloads](https://img.shields.io/npm/dm/iobroker.alpha2.svg)](https://www.npmjs.com/package/iobroker.alpha2)
![Number of Installations](https://iobroker.live/badges/alpha2-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/alpha2-stable.svg)
[![Test and Release](https://github.com/Eisbaeeer/ioBroker.alpha2/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Eisbaeeer/ioBroker.alpha2/actions/workflows/test-and-release.yml)

Local control of the **[Möhlenhoff](https://www.moehlenhoff.de) Alpha 2** underfloor heating control (base station EZR) in ioBroker.
The adapter talks to the XML API of the base station in your network. No cloud account is needed.

Version 2 is a rewrite. **It is a drop-in update for 1.x**: the adapter name, all state IDs and their
types stay the same, so aliases, scripts, visualisations and history (InfluxDB, SQL, History) keep working.

## What is new in 2.0

- **One request at a time.** The web server of the base station can handle only one connection; parallel
  requests are aborted (`Error: aborted`). The adapter now queues every request, like the web interface
  of the base station does, with a timeout per request and a longer pause while the base station does not answer.
- **Light polling.** Live values come from the small `cyclic.xml` (default every 10 s). The complete
  `static.xml` with actuators and settings is read every 30 s and after every change.
  Version 1.x read the complete file every 10 s.
- **`info.connection`** shows whether the base station answers; one warning in the log when it stops answering,
  one info when it is back.
- **More values:** party and presence mode, set point range, set point of the program, offset, heat area state,
  `HEATING` per heat area (an actuator of the area is open), `LOWBAT` and `UNREACH` per room unit, firmware
  versions, error counter, relay, cooling, ECO input, frost protection, cloud connection state.
- **Checked writing:** only the settings listed below can be written. Values are checked (range, quarter hours,
  dates) before they are sent, temperatures are limited to the range of the heat area. A rejected value is
  logged and the state shows the value of the base station again. A quick series of values (e.g. from a slider)
  sends only the last one.
- **Nothing secret in ioBroker:** cloud credentials, network settings, the expert code and the lock codes of
  the room units are never read into states.
- Writable temperatures get `min`/`max` of their heat area, so sliders in visualisations have the right range.
- No dependencies besides `@iobroker/adapter-core`; settings page as JSON config in all 11 ioBroker languages.

## Requirements

- Alpha 2 base station with network connection, reachable from ioBroker (the XML API needs no login)
- Node.js 22 or newer
- js-controller 6.0.11 or newer, Admin 7.6.20 or newer

## Installation

Install the adapter in the admin under _Adapters_. The discovery adapter (`iobroker.discovery` 5.4.1 or newer)
finds Alpha 2 base stations in the network and proposes this adapter. Otherwise create an instance and enter the
IP address of the base station in its settings.

## Settings

| Setting                          | Default | Meaning                                                       |
| -------------------------------- | ------- | ------------------------------------------------------------- |
| IP address of the base station   | –       | e.g. `192.168.1.100`, optionally with `:port`                 |
| Live values every (ms)           | 10000   | temperatures, set points, pump (`cyclic.xml`), at least 2000  |
| Actuators and settings every (s) | 30      | complete data (`static.xml`), additionally after every change |
| Timeout per request (ms)         | 5000    | a request without answer is cancelled after this time         |
| Set the clock automatically      | off     | see below                                                     |

If you use more than one base station, add one instance per base station.

### Only one program at a time

The base station answers only one request at a time. Other scripts, adapters or tools that query it at the same
time can make requests fail (`aborted`) on both sides. Let this adapter be the only one that polls the base station
and use its states in scripts. A separate script that sets the clock of the base station is not needed any more
(see below). Opening the web interface of the base station now and then is fine: a single failed request is only
logged at debug level and repeated with the next poll; a warning and `info.connection` = `false` follow only after
three failures in a row.

### Clock of the base station

The base station runs its switching times on its own clock. Its NTP sync is often switched off, then the clock
drifts. With _Set the clock automatically_ the adapter compares the clock of the base station with ioBroker once an
hour and sets it to the time of ioBroker when it differs by more than 30 s. Nothing is set while the base station
syncs via NTP itself (`DEVICE.NTPSYNC`) and in the hours around the change between summer and winter time.
ioBroker and the base station must use the same time zone. `DEVICE.DATETIME` shows the clock of the base station.

## States

`HEATAREA.<n>` (heat area / room), `HEATCTRL.<n>` (actuator output), `IODEVICE.<n>` (room unit / sensor),
`PROGRAM.<program>.<period>`, `VACATION`, `DEVICE` (base station) and `info.connection`.

### Writable

| State                                           | Values                                                         |
| ----------------------------------------------- | -------------------------------------------------------------- |
| `HEATAREA.<n>.T_TARGET`                         | set point in °C, rounded to 0.1, limited to `T_TARGET_MIN…MAX` |
| `HEATAREA.<n>.T_HEAT_DAY` / `T_HEAT_NIGHT`      | day / night temperature for heating in °C                      |
| `HEATAREA.<n>.T_COOL_DAY` / `T_COOL_NIGHT`      | day / night temperature for cooling in °C                      |
| `HEATAREA.<n>.HEATAREA_MODE`                    | `0` Auto, `1` Day, `2` Night                                   |
| `HEATAREA.<n>.PROGRAM_WEEK` / `PROGRAM_WEEKEND` | program `0`…`3`                                                |
| `HEATAREA.<n>.PARTY` / `PRESENCE`               | `true` / `false`                                               |
| `HEATAREA.<n>.ISLOCKED`                         | `0` unlocked, `1` locked (child lock of the room unit)         |
| `PROGRAM.<p>.<period>.START` / `END`            | `hh:mm` in quarter hours, `END` also `24:00`                   |
| `VACATION.START_DATE` / `END_DATE`              | `YYYY-MM-DD`                                                   |
| `VACATION.STATE`                                | `false` ends a vacation                                        |
| `DEVICE.T_HEAT_VACATION`                        | temperature during vacation in °C                              |
| `DEVICE.LOCK_MODE`                              | `0` / `1` (hotel mode)                                         |

The target temperature set with `T_TARGET` is valid until the next switching time of the program.

To set a vacation, first set `DEVICE.T_HEAT_VACATION`, then `VACATION.START_DATE` and `VACATION.END_DATE`.
`VACATION.STATE` shows whether the vacation is active.

System commands of the base station (factory reset, network or cloud settings, deleting data) can not be sent
by this adapter.

### Value formats

For compatibility with 1.x, a few values stay text: `HEATAREA_MODE`, `PROGRAM_WEEK`, `PROGRAM_WEEKEND`,
`ISLOCKED`, `HEATAREA_NR` and all `IODEVICE` values except `LOWBAT`/`UNREACH` (e.g. `BATTERY` = `"0"` red,
`"1"` yellow, `"2"` green). New values use numbers and booleans.

## Update from 1.x

Install the new version over the old one; the instance and its settings stay. Objects are extended, never
replaced, so custom settings such as history logging stay as they are. States of 1.x that the base station
does not deliver (e.g. unused program slots) are left untouched.

## Development

| Command                               | What it does                                                                              |
| ------------------------------------- | ----------------------------------------------------------------------------------------- |
| `npm test`                            | unit tests and package tests                                                              |
| `npm run test:integration`            | starts the adapter in a test ioBroker against a simulated base station                    |
| `npm run check`                       | type check of the JavaScript sources with their JSDoc types (`tsconfig.json`)             |
| `npm run lint`                        | ESLint and Prettier                                                                       |
| `npm run translate`                   | translates new texts of `io-package.json` and `admin/i18n/en.json` into all languages     |
| `node tools/read-device.js <address>` | reads a base station once and prints the states the adapter would create; sends nothing   |
| `npm run release`                     | new version with changelog and tag; GitHub Actions publish it to npm (trusted publishing) |

The integration tests need a path without spaces. The tests use an invented base station
(`test/fixtures`), no data of a real installation.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (djlex83) Settings page translated into all 11 ioBroker languages
- (djlex83) Requires admin 7.6.20 or newer
- (djlex83) Findings of the repository checker fixed (#80)
- (djlex83) Link to the manufacturer added to the README; a connection that breaks off during an answer is detected without the deprecated `aborted` event; contact address instead of the GitHub noreply address (#82)
- (djlex83) Type check of the sources (`npm run check`, also in CI), `@iobroker/adapter-dev` for translations (`npm run translate`), manual review step in the release script (#83)
- (djlex83) README: badges, requirements, installation with discovery (`iobroker.discovery` 5.4.1 or newer), note on other programs polling the base station, development

### 2.1.0 (2026-11-18)

- (djlex83) Optional: sets the clock of the base station when it is more than 30 s wrong (checked every hour)
- (djlex83) Requires Node.js 22 or newer
- (djlex83) Tested on Node.js 22, 24 and 26; release workflow with npm trusted publishing
- (djlex83) Roles of text, date and time states corrected (`text`, `date`); old 1.x changelog moved to `CHANGELOG_OLD.md`

### 2.0.0 (2026-11-17)

- (djlex83) Rewrite: one request at a time with timeout and back-off, `info.connection`
- (djlex83) Polls the small `cyclic.xml` for live values, `static.xml` only every 30 s and after changes
- (djlex83) New values: party, presence, set point range, program set point, offset, `HEATING`, `LOWBAT`, `UNREACH`,
  firmware, error counter, relay, cooling, ECO input, frost protection, cloud state
- (djlex83) Checked writing with whitelist, ranges and quarter hours; only the last value of a quick series is sent
- (djlex83) Cloud credentials, network settings and codes are no longer read
- (djlex83) Objects are extended instead of replaced (keeps history settings); state IDs and types unchanged
- (djlex83) JSON config, current adapter-core, tests with a simulated base station, no `request`/`xml2js`

### 1.0.4

- (bigluke26) Added PUMP status issue #26

### 1.0.3

- (Eisbaeeer) Fixed error messages in log

### 1.0.2

- (oHa510) Fixed an issue if you don't use all 4/8/12 heat areas, then heat areas could get assigned to the wrong
  heat area object in ioBroker
- (oHa510) Expanded heat areas and heat controls to the maximum of 12
- (oHa510) Changed heat area and heat control indexing to 1–12 (old 0–11 was very confusing)
- (oHa510) Added support for locking controllers (kids mode)
- (oHa510) Added support for locking set temperature (hotel mode)
- (oHa510) Added some new objects and infos like IODEVICEs etc.

### 1.0.1

- (Eisbaeeer) Fixed issues

### 1.0.0 (2019-06-24)

- (Eisbaeeer) Fixed issue #6 (HEATAREA_NAME)

## License

The MIT License (MIT)

Copyright (c) 2026 djlex83 <dj-lex@gmx.de>  
Copyright (c) 2018-2021 Eisbaeeer <eisbaeeer@gmail.com>

See [LICENSE](https://github.com/Eisbaeeer/ioBroker.alpha2/blob/master/LICENSE). Möhlenhoff and Alpha 2 are trademarks of their owners; this project is not
affiliated with Möhlenhoff GmbH.