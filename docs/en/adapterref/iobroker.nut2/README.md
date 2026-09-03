# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.nut2@main/admin/nut2.svg" width="48" align="top" /> ioBroker.nut2

**Release:** [![npm version](https://img.shields.io/npm/v/iobroker.nut2)](https://www.npmjs.com/package/iobroker.nut2) ![stable](https://iobroker.live/badges/nut2-stable.svg) ![Installations](https://iobroker.live/badges/nut2-installed.svg) [![npm downloads](https://img.shields.io/npm/dt/iobroker.nut2)](https://www.npmjs.com/package/iobroker.nut2)

**Build:** [![Test and Release](https://github.com/krobipd/ioBroker.nut2/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/krobipd/ioBroker.nut2/actions/workflows/test-and-release.yml) ![Node](https://img.shields.io/badge/node-%3E%3D22-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue) [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE) [![Sentry](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)](https://github.com/ioBroker/plugin-sentry#plugin-sentry)

**Support:** [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?logo=ko-fi)](https://ko-fi.com/krobipd) [![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/krobipd)

Monitors uninterruptible power supplies via [Network UPS Tools (NUT)](https://networkupstools.org/). All UPS devices connected to a NUT server are automatically discovered and polled.

---

## Features

- Automatic discovery of all UPS devices on a NUT server via `LIST UPS` — also while running: a UPS added to or removed from the server shows up (or disappears) at the next poll
- Dynamic state creation from `LIST VAR` — whatever your UPS reports appears as ioBroker states
- Proper data types: numeric values as numbers (not strings), with units (V, Hz, A, Ah, %, W, VA, s, °C)
- Parsed `ups.status` flags as individual booleans (online, onBattery, lowBattery, charging, ...) plus computed severity (0–4)
- Every data point comes with a short explanation, and status texts, severity levels and selection lists appear in your ioBroker language (11 languages)
- Instant commands (INSTCMD) via button states — beeper control, load management, self-test
- Writable variables (SET VAR) — change UPS settings directly from ioBroker
- Instant updates on UPS events — a writable `notify` trigger state lets upsmon push ONBATT/LOWBATT/SHUTDOWN the moment they happen
- Persistent TCP connection with automatic reconnect and exponential backoff
- Network interface selector for multi-homed servers
- Connection test button in the admin UI — it really logs in, and says what it checked

---

## Sentry / Error reporting

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** Reporting only happens if you have enabled error reporting in the ioBroker diagnostics (**System settings → Diagnostics and error reporting**). Only an anonymous installation ID is transmitted — no name, e-mail address or IP address.

For details and how to disable it, see the [Sentry plugin documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Error reporting requires js-controller 3.0 or newer.

---

## Requirements

- **Node.js >= 22**
- **ioBroker js-controller >= 7.2.2**
- **ioBroker Admin >= 8.0.11**
- A running [NUT server](https://networkupstools.org/) (upsd) with at least one UPS configured

---

## Configuration

### Connection

| Option                        | Description                                                                                                                                            | Default |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| **NUT Server Host**           | Hostname or IP address of the NUT server                                                                                                               | —       |
| **Port**                      | NUT server port                                                                                                                                        | `3493`  |
| **Network Interface**         | Bind outgoing connections to a specific local IP (optional)                                                                                            | all     |
| **Poll Interval (s)**         | How often to query the NUT server (2–300)                                                                                                              | `15`    |
| **Username**                  | NUT username (optional — needed for commands and writable variables; the adapter also verifies it once at startup)                                     | —       |
| **Password**                  | NUT password                                                                                                                                           | —       |
| **Use TLS (STARTTLS)**        | Encrypt the connection via STARTTLS                                                                                                                    | off     |
| **Require valid certificate** | Reject self-signed/invalid certificates (only shown when TLS is on)                                                                                    | off     |
| **CA certificate file**       | PEM file to trust for the strict check — your own certificate authority or the self-signed server certificate (only shown when the strict check is on) | —       |

Use the **Test Connection** button to verify the server is reachable and see discovered UPS devices. With a username
and password it also logs in and out again, so the result tells you whether the credentials really work — and whether
the connection is encrypted.

**About the credentials:** the NUT server only _stores_ a username and password when they are sent — it checks them
when a client logs in. The adapter therefore logs in once at startup, on a short extra connection that is closed again,
purely to tell you whether the credentials work; the connection test does the same on demand. A login needs an
`upsmon secondary` (or `upsmon primary`) line for that user in the server's `upsd.users`.

Reading UPS values needs no login at all, so **refused credentials never stop the monitoring**: the adapter logs a
warning, keeps polling, and only switching a UPS or writing a variable is refused. The instance stays green, because
the connection to the NUT server is up and the values are current — `info.connection` reports that connection, not the
credentials. That matches NUT's own tools: `upsc`, `upscmd` and `upsrw` never log in either. The reason the adapter does not simply stay logged in is that the
server counts logins: during a power failure a primary `upsmon` waits until every other login is gone before it shuts
its machine down, so a monitoring client sitting in that count would delay the shutdown while running on battery.

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
├── info/
│   ├── connection                     — Connection to NUT server (bool)
│   ├── upsTotal                       — UPS devices found (number)
│   ├── upsReachable                   — How many of them answer right now (number)
│   └── allUpsReachable                — All of them answering? (bool)
├── notify                             — Writable trigger: poll now / record an upsmon event
└── {ups_name}/                        — Device (e.g. "ups0")
    ├── info/
    │   ├── reachable                  — UPS responds / data is fresh (bool)
    │   └── notify                     — Last upsmon event routed to this UPS (string)
    ├── battery/
    │   ├── charge                     — Battery level (%, number)
    │   ├── charge-low                 — Low battery threshold (%)
    │   ├── runtime                    — Remaining runtime (s)
    │   ├── type                       — Battery chemistry (string)
    │   └── ...
    ├── device/
    │   ├── mfr                        — Manufacturer (string)
    │   ├── model                      — Model name (string)
    │   ├── serial                     — Serial number (string)
    │   └── ...
    ├── driver/
    │   ├── name                       — NUT driver name
    │   ├── version                    — Driver version
    │   └── ...
    ├── input/
    │   ├── voltage                    — Input voltage (V, number)
    │   ├── frequency                  — Input frequency (Hz, number)
    │   └── ...
    ├── output/
    │   ├── voltage                    — Output voltage (V, number)
    │   ├── frequency                  — Output frequency (Hz, number)
    │   └── ...
    ├── ups/
    │   ├── load                       — UPS load (%, number)
    │   ├── power                      — Apparent power (VA, number)
    │   ├── realpower                  — Real power (W, number)
    │   ├── status                     — Raw status string (e.g. "OL CHRG")
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

## Instant updates from upsmon (notify trigger)

The adapter polls the NUT server on a fixed interval. NUT itself has no server push — but `upsmon`, NUT's own monitoring client, detects events (power failure, low battery, forced shutdown) and can run a program via `NOTIFYCMD` the moment they happen. Point that program at the writable trigger state `nut2.0.notify` and the adapter refreshes immediately instead of waiting for the next poll:

- **Any write** to `nut2.0.notify` triggers an immediate poll of all UPS devices — writing an empty value is simply a manual refresh.
- The recommended value format is `$NOTIFYTYPE $UPSNAME` (both provided by upsmon). The event type stays in the trigger state; when the UPS name matches a discovered UPS it is also written to that device's `{ups_name}.info.notify`, so an automation can react per UPS (e.g. run a script on `SHUTDOWN`).
- The event is recorded and acknowledged **before** the poll starts, and the trigger works even while the NUT server is unreachable — a `SHUTDOWN` event still arrives in ioBroker when the NUT host dies moments later.
- The UPS may be referenced by its real NUT name or by the object ID shown in ioBroker; the `@host` part upsmon appends to `$UPSNAME` is stripped automatically.
- Several events in quick succession collapse into a single follow-up poll; an unknown UPS name is logged once and falls back to refreshing everything.

Example `upsmon.conf` on the NUT server (events only fire for `NOTIFYFLAG` lines carrying `EXEC`):

```
NOTIFYCMD /etc/nut/iobroker-notify.sh
NOTIFYFLAG ONLINE   SYSLOG+EXEC
NOTIFYFLAG ONBATT   SYSLOG+EXEC
NOTIFYFLAG LOWBATT  SYSLOG+EXEC
NOTIFYFLAG FSD      SYSLOG+EXEC
NOTIFYFLAG SHUTDOWN SYSLOG+EXEC
NOTIFYFLAG REPLBATT SYSLOG+EXEC
```

`/etc/nut/iobroker-notify.sh` (make it executable), using the ioBroker [simple-api](https://github.com/ioBroker/ioBroker.simple-api) adapter — this works from containers too, no ioBroker binaries needed on the NUT host:

```sh
#!/bin/sh
curl -sG "http://<iobroker-host>:8082/set/nut2.0.notify" --data-urlencode "value=$NOTIFYTYPE $UPSNAME"
```

If ioBroker runs on the same host as the NUT server, the ioBroker CLI works as well:

```sh
#!/bin/sh
iobroker state set nut2.0.notify "$NOTIFYTYPE $UPSNAME"
```

---

## Troubleshooting

### Connection failed

- Verify the NUT server is reachable from the ioBroker host: `nc -zv <host> 3493`
- Check firewall rules for TCP port 3493
- Use the Test Connection button in the admin UI

### Credentials rejected

- Reading the UPS data continues regardless — only commands and writable variables are affected
- The NUT server answers the same way for a wrong password and for a user that may not log in — check both
- The user needs an `upsmon secondary` (or `upsmon primary`) line in the server's `upsd.users` to be verifiable; a user with only `actions` or `instcmds` entries cannot log in, yet its commands still work
- Without a username and password the adapter reads the UPS data anonymously; commands and writable variables then stay unavailable

### Commands not working

- Ensure **Enable Commands** is checked in the Advanced tab
- A NUT username and password with `instcmds` permission must be configured
- Check the NUT server's `upsd.users` configuration

### Writable variables not working

- Ensure **Enable SET VAR** is checked in the Advanced tab
- The NUT user needs `actions = SET` permission on the NUT server

### States not updating

- Check `info.connection` — if `false`, the connection to the NUT server is down (rejected credentials do not affect it)
- Check the ioBroker log for NUT error codes (e.g. `DATA-STALE` means the UPS driver lost contact)
- Verify the poll interval is appropriate for your setup

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.13.0 (2026-09-02)

- New: every data point now carries a short explanation in your language — what it means, not just what it is called
- New: status text, severity levels and selection lists are shown in your language instead of English
- Changed: wrong credentials no longer stop the monitoring — the adapter warns, keeps reading the UPS values, and only refuses commands and writable variables
- Fixed: during a power failure, machines protected by the same UPS now shut down without waiting for this adapter
- Fixed: a countdown that is not running is now empty instead of showing "-1 seconds", on every UPS brand
- Fixed: model and other text values no longer carry the padding some UPS models send along
- Fixed: channel names from older adapter versions are corrected instead of staying as they were
- Fixed: the connection test answers in your language now, like the rest of the settings page

### 0.12.1 (2026-09-02)

- Fixed: the "Test connection" button in the settings stayed silent — clicking it produced no result at all. It answers again, on every instance updated from 0.9.0 or later

### 0.12.0 (2026-09-02)

- Fixed: the connection test now really verifies the username and password — it logs in to the NUT server and only then reports success, instead of accepting anything you type (#17)
- Fixed: the adapter logs in to the NUT server whenever credentials are configured, so wrong credentials show up right away instead of silently failing on the first command
- Fixed: a reply that is not a confirmation is no longer treated as success — a stray answer can no longer make a write, a login or an encrypted upgrade look like it worked
- New: the connection test and the start message state whether the connection is encrypted and which user is logged in, so you can see what is really in use
- New: a certificate file can be configured so strict certificate checking also works with your own certificate authority or a self-signed server certificate
- Fixed: a value list the UPS no longer offers is really gone from a data point now, instead of keeping the dropped entry selectable forever
- Fixed: renaming a data point during an update no longer costs the recording you attached to it — history and charts move over to the new name
- Changed: data point names and descriptions belong to the adapter again and are restored on the next sync; your own names belong in 0_userdata

### 0.11.0 (2026-09-02)

- New: a UPS added to or removed from the NUT server now appears or disappears at the next poll — no reconnect and no adapter restart needed for a changed server setup
- Fixed: a write to the adapter's own reachable, status or notify states (script, REST API) no longer ends as a SET VAR error in the log; null or object values are rejected before they reach the server
- Fixed: a failed TLS handshake no longer logs a misleading "Connection lost" warning next to the stop, and the notify trigger state echoes the cleaned event text instead of the raw write
- Changed: ioBroker Admin 8.0.11 or newer is required, in line with the current ioBroker stable repository — older Admin installations must be updated before installing this version

### 0.10.0 (2026-09-01)

- New: writable `notify` trigger state — upsmon (or any script) pushes events like ONBATT or SHUTDOWN for an instant refresh, and a matched event also lands on that UPS device (#14)
- Improved: a password accidentally saved with a stray line break is now rejected cleanly instead of silently breaking the connection to the NUT server

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
