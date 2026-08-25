# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.nut2@main/admin/nut2.svg" width="48" align="top" /> ioBroker.nut2

**Release:** [![npm version](https://img.shields.io/npm/v/iobroker.nut2)](https://www.npmjs.com/package/iobroker.nut2) ![stable](https://iobroker.live/badges/nut2-stable.svg) ![Installations](https://iobroker.live/badges/nut2-installed.svg) [![npm downloads](https://img.shields.io/npm/dt/iobroker.nut2)](https://www.npmjs.com/package/iobroker.nut2)

**Build:** [![Test and Release](https://github.com/krobipd/ioBroker.nut2/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/krobipd/ioBroker.nut2/actions/workflows/test-and-release.yml) ![Node](https://img.shields.io/badge/node-%3E%3D22-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue) [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

**Support:** [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?logo=ko-fi)](https://ko-fi.com/krobipd) [![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/krobipd)

Monitors uninterruptible power supplies via [Network UPS Tools (NUT)](https://networkupstools.org/). All UPS devices connected to a NUT server are automatically discovered and polled.

---

## Features

- Automatic discovery of all UPS devices on a NUT server via `LIST UPS`
- Dynamic state creation from `LIST VAR` — whatever your UPS reports appears as ioBroker states
- Proper data types: numeric values as numbers (not strings), with units (V, Hz, A, Ah, %, W, VA, s, °C)
- Parsed `ups.status` flags as individual booleans (online, onBattery, lowBattery, charging, ...) plus computed severity (0–4)
- Instant commands (INSTCMD) via button states — beeper control, load management, self-test
- Writable variables (SET VAR) — change UPS settings directly from ioBroker
- Persistent TCP connection with automatic reconnect and exponential backoff
- Network interface selector for multi-homed servers
- Connection test button in the admin UI

---

## Requirements

- **Node.js >= 22**
- **ioBroker js-controller >= 7.2.2**
- **ioBroker Admin >= 7.8.23**
- A running [NUT server](https://networkupstools.org/) (upsd) with at least one UPS configured

---

## Configuration

### Connection

| Option                | Description                                                            | Default |
| --------------------- | ---------------------------------------------------------------------- | ------- |
| **NUT Server Host**   | Hostname or IP address of the NUT server                               | —       |
| **Port**              | NUT server port                                                        | `3493`  |
| **Network Interface** | Bind outgoing connections to a specific local IP (optional)            | all     |
| **Poll Interval (s)** | How often to query the NUT server (2–300)                              | `15`    |
| **Username**          | NUT username (optional — required for commands and writable variables) | —       |
| **Password**          | NUT password                                                           | —       |
| **Use TLS (STARTTLS)** | Encrypt the connection via STARTTLS                                   | off     |
| **Require valid certificate** | Reject self-signed/invalid certificates (only shown when TLS is on) | off     |

Use the **Test Connection** button to verify the server is reachable and see discovered UPS devices.

**About TLS:** enabling STARTTLS encrypts the connection so your NUT username and password are no longer sent in clear text over the network. With the default settings it protects against passive eavesdropping, but **not** against an active man-in-the-middle, because most NUT servers use a self-signed certificate that cannot be verified. For full protection, configure a certificate the client can validate on the NUT server and enable **Require valid certificate**. The NUT server must be built with TLS support (`upsd` with `CERTFILE`/`CERTPATH`); otherwise the connection test reports a TLS error.

### Advanced

| Option                  | Description                                         | Default |
| ----------------------- | --------------------------------------------------- | ------- |
| **Command Timeout (s)** | Timeout for individual NUT protocol commands (1–30) | `5`     |
| **Enable Commands**     | Allow sending instant commands (INSTCMD) to the UPS | off     |
| **Enable SET VAR**      | Allow changing writable UPS variables               | off     |

Both command features require a NUT user with appropriate permissions configured on the NUT server.

---

## State Tree

States are organized by NUT domain. The exact set of states depends on what your UPS driver reports.

```
nut2.0.
├── info.connection                    — Connection to NUT server (bool)
└── {ups_name}/                        — Device (e.g. "ups0")
    ├── info/
    │   └── reachable                  — UPS responds / data is fresh (bool)
    ├── battery/
    │   ├── battery.charge             — Battery level (%, number)
    │   ├── battery.charge-low         — Low battery threshold (%)
    │   ├── battery.runtime            — Remaining runtime (s)
    │   ├── battery.type               — Battery chemistry (string)
    │   └── ...
    ├── device/
    │   ├── device.mfr                 — Manufacturer (string)
    │   ├── device.model               — Model name (string)
    │   ├── device.serial              — Serial number (string)
    │   └── ...
    ├── driver/
    │   ├── driver.name                — NUT driver name
    │   ├── driver.version             — Driver version
    │   └── ...
    ├── input/
    │   ├── input.voltage              — Input voltage (V, number)
    │   ├── input.frequency            — Input frequency (Hz, number)
    │   └── ...
    ├── output/
    │   ├── output.voltage             — Output voltage (V, number)
    │   ├── output.frequency           — Output frequency (Hz, number)
    │   └── ...
    ├── ups/
    │   ├── ups.load                   — UPS load (%, number)
    │   ├── ups.power                  — Apparent power (VA, number)
    │   ├── ups.realpower              — Real power (W, number)
    │   ├── ups.status                 — Raw status string (e.g. "OL CHRG")
    │   └── ...
    ├── status/                        — Parsed status flags
    │   ├── raw                        — Original status string
    │   ├── display                    — Human-readable status (e.g. "Online, Charging")
    │   ├── severity                   — 0=OK, 1=Info, 2=Warning, 3=Critical, 4=Emergency
    │   ├── online                     — On line power (bool)
    │   ├── onBattery                  — Running on battery (bool)
    │   ├── lowBattery                 — Battery is low (bool)
    │   ├── charging                   — Battery is charging (bool)
    │   ├── discharging                — Battery is discharging (bool)
    │   ├── replaceBattery             — Battery needs replacement (bool)
    │   ├── overloaded                 — UPS is overloaded (bool)
    │   ├── forcedShutdown             — Forced shutdown in progress (bool)
    │   ├── alarm                      — Alarm active (bool)
    │   ├── ecoMode                    — ECO / high efficiency mode (bool)
    │   ├── testing                    — Self-test in progress (bool)
    │   ├── overheat                   — UPS overheated (bool)
    │   └── ...                        — (19 flags total)
    └── commands/                      — Instant commands (if enabled)
        ├── beeper-enable              — Button: enable beeper
        ├── beeper-disable             — Button: disable beeper
        ├── test-battery-start         — Button: start battery test
        └── ...                        — (from LIST CMD)
```

> **State IDs:** the first dot in a NUT variable name is the channel separator; any further dots become dashes. So `battery.charge.low` is stored as `battery.charge-low`, and the instant command `test.battery.start` becomes `commands.test-battery-start`.

### Status Severity Levels

| Level | Meaning   | Typical Flags               |
| ----- | --------- | --------------------------- |
| 0     | OK        | OL, OL CHRG, OL HB          |
| 1     | Info      | TRIM, BOOST, CAL            |
| 2     | Warning   | OB (without LB), RB, BYPASS |
| 3     | Critical  | OB + LB                     |
| 4     | Emergency | FSD                         |

---

## Troubleshooting

### Connection failed

- Verify the NUT server is reachable from the ioBroker host: `nc -zv <host> 3493`
- Check firewall rules for TCP port 3493
- Use the Test Connection button in the admin UI

### Commands not working

- Ensure **Enable Commands** is checked in the Advanced tab
- A NUT username and password with `instcmds` permission must be configured
- Check the NUT server's `upsd.users` configuration

### Writable variables not working

- Ensure **Enable SET VAR** is checked in the Advanced tab
- The NUT user needs `actions = SET` permission on the NUT server

### States not updating

- Check `info.connection` — if `false`, the TCP connection is down
- Check the ioBroker log for NUT error codes (e.g. `DATA-STALE` means the UPS driver lost contact)
- Verify the poll interval is appropriate for your setup

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.7.0 (2026-08-12)

- Improved: more UPS values now carry their dedicated ioBroker role — mains frequency, status severity and humidity — so charts, visualisations and automatic device detection recognise them correctly.
- Fixed: a driver flag reporting an unusual value is now kept as a text state instead of being misread as a number, so its type no longer changes between updates.

### 0.6.0 (2026-08-11)

- UPS readings now carry their correct data type instead of plain text, so numeric values, yes/no fields and status values can be charted, compared and used directly in scripts.
- Security fix: the NUT username and password no longer appear in the ioBroker log, where they could previously show up in plain text while commands were exchanged.
- A UPS whose name contains a space, dot or other special character now appears correctly in the object tree instead of a broken or missing device entry.

### 0.5.3 (2026-07-26)

- The version history shown in the adapter manager now lists only versions that actually exist for this adapter.

### 0.5.2 (2026-07-26)

- The poll interval can now go down to 2 seconds — below that the NUT driver itself has no new readings to give.

### 0.5.1 (2026-07-13)

- Writable yes/no UPS settings (e.g. automatic restart after power returns) can now actually be changed from ioBroker — previously toggling them was silently rejected by the NUT server.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## Credits

NUT support in ioBroker goes back to [Apollon77](https://github.com/Apollon77) — his `iobroker.nut` adapter brought the Network UPS Tools protocol to the platform in 2016 and served it until 2025. This adapter is an independent rewrite and shares no code with it.

---

## Support

- [ioBroker Forum](https://forum.iobroker.net/)
- [GitHub Issues](https://github.com/krobipd/ioBroker.nut2/issues)

### Support Development

This adapter is free and open source. If you find it useful, consider buying me a coffee:

[![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)](https://ko-fi.com/krobipd)
[![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)](https://paypal.me/krobipd)

---

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

_Developed with assistance from Claude.ai_
