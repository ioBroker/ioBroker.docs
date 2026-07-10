![Logo](admin/cisco-checkpresence.png)
# ioBroker.cisco-checkpresence

[![NPM version](https://img.shields.io/npm/v/iobroker.cisco-checkpresence.svg)](https://www.npmjs.com/package/iobroker.cisco-checkpresence)
[![Downloads](https://img.shields.io/npm/dm/iobroker.cisco-checkpresence.svg)](https://www.npmjs.com/package/iobroker.cisco-checkpresence)
![Number of Installations](https://iobroker.live/badges/cisco-checkpresence-installed.svg)

**Tests:** ![Test and Release](https://github.com/NurPech/ioBroker.cisco-checkpresence/workflows/Test%20and%20Release/badge.svg)

## Cisco Catalyst 9800 CheckPresence adapter for ioBroker

Detects the presence of family members by querying the Cisco Catalyst 9800 Wireless Controller via RESTCONF. Instead of unreliable ping checks, the adapter reads the authenticated client table directly from the WLC — if the controller says a device is associated, it is there.

## Requirements

- Cisco Catalyst 9800 Series Wireless Controller (9800-L, 9800-CL, 9800-40, 9800-80)
- **802.1X authentication** is required. The adapter identifies clients by their 802.1X username. No external RADIUS server is needed — Local EAP on the WLC is sufficient.
- A WLC user account with RESTCONF read access
- ioBroker with js-controller ≥ 6.0.11 and Admin ≥ 7.0.23

## Configuration

Open the adapter settings in ioBroker Admin.

### Connection tab

| Field | Description |
|-------|-------------|
| WLC Host / IP Address | IP address or hostname of the Catalyst 9800 WLC |
| Username | RESTCONF username (e.g. `iobroker_bot`) |
| Password | RESTCONF password (stored encrypted) |
| Interval (s) | Poll interval in seconds (10–300, default: 30) |
| Ignore self-signed certificate | Enable if your WLC uses a self-signed TLS certificate (recommended) |

### Users tab

Map 802.1X usernames to state names in ioBroker:

| Field | Description |
|-------|-------------|
| 802.1X Username | The username as seen in the WLC client table |
| State Name | Name used for the state under `presence.<name>` |

## States

For each configured user the adapter creates the following states:

| State | Type | Description |
|-------|------|-------------|
| `presence.<name>.present` | boolean | `true` if the client is currently associated |
| `presence.<name>.ap` | string | Name of the associated Access Point (e.g. `AP03n`) |
| `presence.<name>.band` | string | Radio band (`2.4 GHz`, `5 GHz`, or `6 GHz`) |
| `presence.<name>.rssi` | number (dBm) | Received signal strength |
| `presence.<name>.snr` | number (dB) | Signal-to-noise ratio |
| `info.connection` | boolean | `true` if the WLC is reachable |

## Integration with ioBroker Residents

The presence states can be linked to the [ioBroker Residents adapter](https://github.com/jpawlowski/ioBroker.residents) via the **Foreign Presence Data Points** field:

```
cisco-checkpresence.0.presence.leonie.present
```

## Known Limitations

- **Multiple devices per user:** If multiple devices are authenticated with the same 802.1X username, the first client returned by the WLC API is used. This is a use-case limitation, not a bug.
- **802.1X required:** Devices without 802.1X authentication (e.g. IoT devices using PSK) are not detected. Local EAP on the WLC is sufficient if no external RADIUS server is available.
- **Central switching only:** Tested with APs in Local Mode with central switching (CAPWAP). Flex/local switching may behave differently.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.0.7 (2026-06-11)
- Fixed: Sanitise user-supplied state names to remove characters forbidden in ioBroker object IDs
- Fixed: Clamp pollInterval and absentThreshold to sane upper bounds
- Fixed: Avoid overlapping polls by self-scheduling the poll loop instead of using setInterval
- Fixed: Use translations for the admin tab labels and poll interval field
- Fixed: Corrected admin page title

### 0.0.6 (2026-06-06)
- Fixed: Fixed object structure

### 0.0.5 (2026-06-06)
- Fixed: Fixed object structure

### 0.0.4 (2026-06-06)
- Chore: Update to node 22
- Chore: Update dependencies
- Fixed: Fixed object structure

### 0.0.3 (2026-04-27)
- (M1kad0) fix npm publishing

### 0.0.2 (2026-04-26)
- (M1kad0) added absent threshold to debounce presence detection

### 0.0.1 (2026-04-26)
- Initial release
- Presence detection via RESTCONF (`common-oper-data`)
- AP name, radio band, RSSI and SNR via `traffic-stats`
- Encrypted password storage
- Dark/light mode admin UI with MUI v6

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 M1kad0 <leonie+iobroker@sgessinger.de>

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
