# ioBroker.zte-mc888

Reads LTE and 5G signal values from a ZTE MC888 router and exposes them as ioBroker states.

## Supported device

[ZTE MC888 5G FWA (indoor router)](https://www.ztedevices.com/de/products/mobile-internet/5g-fwa/MC888.html)
— product page at ZTE Devices.

The adapter talks to the router's local `goform` HTTP API, so no cloud account and no
internet connection are required.

## States

All states are read-only. `…Dec` states are the decimal representation of the raw
hexadecimal value next to them (that is what the router web interface shows).

### `general`

| State | Type | Unit | Description |
| --- | --- | --- | --- |
| `networkType` | string | | Current network type, e.g. `ENDC` or `LTE` |
| `cellId` | string | | Cell ID as delivered by the router (hex) |
| `cellIdDec` | number | | Cell ID as decimal number |

### `lte` — LTE primary cell

| State | Type | Unit | Description |
| --- | --- | --- | --- |
| `rsrp` | number | dBm | Reference signal received power |
| `rsrq` | number | dB | Reference signal received quality |
| `sinr` | number | dB | Signal to interference plus noise ratio |
| `rssi` | number | dBm | Received signal strength |
| `band` | string | | Band of the primary carrier, e.g. `3` |
| `bandName` | string | | Band as reported in the cell info, e.g. `LTE BAND 3` |
| `arfcn` | string | | Downlink EARFCN (channel number) |
| `bandwidth` | string | | Bandwidth of the primary carrier |
| `pci` | string | | Physical cell ID (hex) |
| `pciDec` | number | | Physical cell ID as decimal number |
| `carrierAggregation` | string | | Carrier aggregation state reported by the router |

### `lte.scc0` … `lte.scc3` — LTE secondary carriers

One channel per secondary carrier cell (up to four), each with the same states:

| State | Type | Unit | Description |
| --- | --- | --- | --- |
| `active` | boolean | | `true` while this secondary carrier is in use |
| `pci` | number | | Physical cell ID |
| `band` | number | | Band |
| `arfcn` | number | | Channel number |
| `bandwidth` | number | MHz | Bandwidth |
| `rsrp` | number | dBm | Reference signal received power |
| `rsrq` | number | dB | Reference signal received quality |
| `sinr` | number | dB | Signal to interference plus noise ratio |
| `rssi` | number | dBm | Received signal strength |

### `nr5g` — 5G NR primary cell

| State | Type | Unit | Description |
| --- | --- | --- | --- |
| `rsrp` | number | dBm | Reference signal received power |
| `rsrq` | number | dB | Reference signal received quality |
| `sinr` | number | dB | Signal to interference plus noise ratio |
| `rssi` | number | dBm | Received signal strength |
| `band` | string | | Band, e.g. `78` |
| `bandName` | string | | Band as reported in the cell info |
| `arfcn` | string | | NR-ARFCN (channel number) |
| `bandwidth` | string | | Bandwidth |
| `pci` | string | | Physical cell ID (hex) |
| `pciDec` | number | | Physical cell ID as decimal number |

### `info`

| State | Type | Unit | Description |
| --- | --- | --- | --- |
| `connection` | boolean | | `true` while the last poll succeeded |

Without a login the router only delivers the network type and the primary RSRP/RSSI
values; all other states stay empty. See
[Login, sessions and the web UI](#login-sessions-and-the-web-ui).

## Configuration

- **Router IP** — usually `192.168.0.1`, some firmwares use `192.168.254.1`.
- **Poll interval** — seconds between reads (5 to 86400).
- **Login required** — enable if the API only answers after authentication.
- **Username / Password** — the router admin credentials (username defaults to `admin`).
- **Web UI has priority** *(only with login)* — when the router web interface logs
  in with the same user, the adapter pauses instead of logging back in and kicking
  it out. See below.
- **Back-off after web UI login (minutes)** *(only with login)* — how long the
  adapter stays logged out (keeping the last values) after the web UI took over the
  session. Default 5. Set to `0` to re-login on the very next poll.

## Login, sessions and the web UI

The MC888 only serves a handful of fields (network type + primary RSRP/RSSI) without
authentication; RSRQ, SINR, bands, PCI, carrier aggregation and the secondary cells
require a login. The router also allows **only one session per user**, and a second
login silently kicks the first.

To avoid fighting the router web interface (same `admin` user), the adapter:

1. logs in once and **keeps** the session across polls (full field set),
2. detects when another login (the web UI) takes over its session,
3. then **backs off** for the configured time instead of immediately logging back
   in — during that window the last values are kept and only the public fields keep
   updating, so your web-UI session is not disturbed,
4. re-acquires the session once the back-off elapses.

If you would rather always have the full data and don't mind the web UI being logged
out, disable **Web UI has priority** (or set the back-off to `0`).

## Firmware differences

The router's raw field names vary between firmware versions, so on some firmwares
individual states can stay empty. If that happens, please
[open an issue](https://github.com/muraus/ioBroker.zte-mc888/issues) and attach a debug
log (instance log level `debug`, which logs the raw router response) plus your firmware
version — support for the differing field names can then be added to the adapter.

## Contributing

Notes on building, testing and extending the adapter are in
[DEVELOPMENT.md](https://github.com/muraus/ioBroker.zte-mc888/blob/main/DEVELOPMENT.md).

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.0.5 (2026-08-13)
* (Adapterman) Adapter requires admin >= 7.8.23 now.
* (Adapterman) The poll interval is now capped at 24 h so a huge value cannot overflow the timer
* (Adapterman) The web UI back-off is now capped at 24 h and both limits are enforced in the admin config
* (Adapterman) New adapter icon, delivered only in the admin directory as in the ioBroker template
* (Adapterman) Corrected and completed the list of adapter states in the README
* (Adapterman) Removed the install section from the README and moved the development notes to DEVELOPMENT.md

### 0.0.4 (2026-07-29)
* (Adapterman) Added the supported device section with a link to the ZTE MC888 product page
* (Adapterman) Corrected the required Node.js version in the development section
* (Adapterman) Added the readme link to io-package.json so Admin can link the documentation
* (Adapterman) Completed the author information in package.json, io-package.json and LICENSE

### 0.0.3 (2026-07-25)
* (Adapterman) Added ESLint (@iobroker/eslint-config) and prettier config plus a `lint` script
* (Adapterman) Added a tsconfig.json and a `check` script to type check the JavaScript sources via JSDoc
* (Adapterman) Fixed a crash in the poll loop when the router did not answer and no login is configured
* (Adapterman) Admin config is now translated into all 11 ioBroker languages (jsonConfig i18n)
* (Adapterman) Added dependabot configuration and VS Code JSON schema settings
* (Adapterman) Lint and type checking are now enforced in CI

### 0.0.2 (2026-07-25)
* (Adapterman) Normalized the repository URL in package.json
* (Adapterman) Release is published via npm trusted publishing and signed with provenance

### 0.0.1 (2026-07-25)
* (Adapterman) Initial release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Adapterman <adapterman@proton.me>

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
