---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.nut2
BADGE-stable: https://iobroker.live/badges/nut2-stable.svg
BADGE-Installations: https://iobroker.live/badges/nut2-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.nut2
BADGE-Test and Release: https://github.com/krobipd/ioBroker.nut2/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
chapters: {"pages":{"en/adapterref/iobroker.nut2/README.md":{"title":{"en":"ioBroker.nut2 — Setting it up"},"content":"en/adapterref/iobroker.nut2/README.md"},"en/adapterref/iobroker.nut2/datapoints.md":{"title":{"en":"Data points"},"content":"en/adapterref/iobroker.nut2/datapoints.md"},"en/adapterref/iobroker.nut2/faq.md":{"title":{"en":"Frequently asked questions"},"content":"en/adapterref/iobroker.nut2/faq.md"}}}
---
# ioBroker.nut2 — Setting it up

This adapter reads uninterruptible power supplies through a **NUT server** (Network UPS Tools). It never talks to the
UPS directly: the NUT server owns the USB or network connection to the hardware, and the adapter is one of its clients.
That is why every setup starts on the machine the UPS is plugged into.

The README gives the short version. This page walks through a complete setup.

## 1. Make sure a NUT server is running

You need a machine with `upsd` running and at least one UPS configured — a Linux host, a NAS (Synology, QNAP and
UGREEN all ship NUT), or a Raspberry Pi with the UPS on USB.

Check it from that machine:

```bash
upsc -l                 # lists the UPS names, e.g. "ups0"
upsc ups0               # shows all values of that UPS
```

If `upsc -l` prints nothing, the problem is on the NUT side and the adapter cannot help — fix the driver first
(`/etc/nut/ups.conf`, then `upsdrvctl start`).

## 2. Let the adapter reach the server

`upsd` only listens on localhost until you tell it otherwise. In `/etc/nut/upsd.conf`:

```
LISTEN 0.0.0.0 3493
```

Restart `upsd` afterwards. Port `3493/TCP` has to be open between your ioBroker host and the NUT server.

Many NAS systems run NUT in a "UPS server" mode that has its own allow-list in the web interface — the ioBroker host's
IP address has to be in it.

## 3. Create a user (optional, but recommended)

Reading values needs no login at all. You only need a user for two things: switching the UPS (instant commands) and
writing variables. Add it to `/etc/nut/upsd.users`:

```
[iobroker]
    password = choose-something-long
    upsmon secondary
    actions = SET
    instcmds = ALL
```

Two lines with different jobs:

- `upsmon secondary` is what makes a **login** possible. The adapter uses a login once at startup, on a short extra
  connection, purely to tell you whether the credentials work. Without this line the login is refused — see the FAQ,
  it is not an error.
- `actions` and `instcmds` decide what the user may actually **do**. `upsd` checks them per command, independently of
  the login.

Restart `upsd` after editing the file.

## 4. Add the instance in ioBroker

Install the adapter, create an instance, and fill in the **Connection** tab:

| Setting             | What to put in                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| NUT server host     | Hostname or IP of the machine running `upsd`                                                      |
| Port                | `3493` unless you changed it                                                                      |
| Network interface   | Leave on "all" unless your ioBroker host has several networks and only one reaches the NUT server |
| Poll interval       | `15` seconds is a good default — see below                                                        |
| Username / Password | The user from step 3, or leave empty for read-only monitoring                                     |

Press **Test connection**. The answer names what was actually checked: whether the connection is encrypted, how many
UPS devices the server offers, and — if you entered credentials — whether the login was accepted.

Then save. The adapter connects, discovers every UPS on the server and creates the states.

### How fast should it poll?

Faster than the NUT driver refreshes its data buys you nothing. In `/etc/nut/ups.conf` the driver has two settings:
`pollinterval` (how often the status is refreshed, default 2 s) and `pollfreq` (the full set of values, default 30 s
for USB drivers). Polling every 15 seconds is a sensible middle ground; below 2 seconds the adapter simply re-reads
values that have not changed.

If you want to know about a power failure _the instant it happens_ rather than at the next poll, do not lower the
interval — use the event trigger described in the FAQ.

## 5. Encrypting the connection (optional)

Without TLS the username and password travel the network in clear text. If that matters in your setup, `upsd` can be
built with TLS support and offers **STARTTLS**:

1. Configure `CERTFILE` (or `CERTPATH`) in `upsd.conf` on the server.
2. Tick **Use TLS (STARTTLS)** in the adapter.

By default the adapter does not verify the certificate — that encrypts the traffic against passive eavesdropping, but
it cannot detect a man-in-the-middle, because almost every NUT server uses a self-signed certificate.

For real protection, tick **Require valid certificate** as well and point **CA certificate file** at a PEM file on the
ioBroker host that the certificate can be checked against — your own certificate authority, or the server's
self-signed certificate itself. The file is only read while the strict check is on; a path left behind from an earlier
attempt does no harm.

If the NUT server was built without TLS, the connection test says so instead of quietly falling back to plain text.

## 6. Switching the UPS from ioBroker (optional)

Two switches on the **Advanced** tab open the write direction, and both are off on purpose:

- **Enable commands** creates a button state per instant command the UPS offers (beeper, self-test, load off …).
  The `commands` channel only appears once this is on **and** credentials are configured — `upsd` checks command
  rights against a named user.
- **Enable SET VAR** makes the UPS variables that the server reports as writable writable in ioBroker too.

Both need the matching rights in `upsd.users` (step 3). Handle the load commands with care: `load.off` cuts the power
to everything plugged into the UPS.

## Where to go next

- [Data points](/#/docs/adapterref/iobroker.nut2/datapoints.md) — what the adapter creates and what each part means.
- [Frequently asked questions](/#/docs/adapterref/iobroker.nut2/faq.md) — including instant event updates via `upsmon`.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.15.1 (2026-09-07)

- New: ten more data points explain themselves — the battery date, the UPS's own clock, the three driver versions, the UPS identifier, the UPS type and the USB vendor and product IDs
- Fixed: the battery maintenance date is the date of the NEXT change or service, not of the last one — its name said the opposite in all eleven languages
- Improved: setting up the upsmon trigger is one line in upsmon.conf instead of a shell script, and points at the rest-api adapter; the older simple-api path stays documented

### 0.15.0 (2026-09-07)

- Fixed: a data point no longer holds a value of the wrong kind — a reading that stops matching the data point's type is discarded with one warning instead of being written into it
- Fixed: a NUT server that is switched off or restarting no longer makes the instance look broken — the adapter names the server it cannot reach and keeps retrying
- Fixed: value limits taken from the UPS disappear again when the UPS stops reporting them, instead of standing forever and causing warnings about every value outside them
- Fixed: credentials containing a space are now refused with an explanation instead of a bare protocol error nobody can act on
- Fixed: enabling instant commands now says why no command buttons appear when the UPS does not answer the command list
- Fixed: a UPS variable without a dot in its name is now writable, and can no longer take over one of the adapter's own channels
- Fixed: over a third of the data points carried an English label in every language — 157 more variable names are now translated into all eleven
- Fixed: the phases of a three-phase UPS, the sensors of a multi-sensor probe and the individual outlets no longer all share one name — each keeps the marker that says which one it is
- Fixed: the outlet buttons of a PDU are now named and explained like every other command instead of showing their raw NUT name
- New: explanations for the battery voltage, battery temperature, battery health and input current, which stood without one next to explained siblings

### 0.14.0 (2026-09-04)

- Fixed: a certificate file left over in the settings no longer stops the adapter — it is only read while strict certificate checking is actually switched on
- Fixed: value lists of writable data points stay in your language instead of falling back to the raw NUT wording after the first poll
- Fixed: the connection test no longer reports an error when only the credentials are refused — it says so and confirms that reading works, matching what the adapter does
- Fixed: the connection test now answers in your language when something goes wrong, not only when it succeeds
- Fixed: a UPS that disappears from the NUT server and comes back gets its manufacturer and model name again instead of keeping the bare UPS name
- Fixed: renamed data points of the adapter itself now reach existing installations instead of only new ones
- Fixed: enabling instant commands without credentials no longer fails silently — the adapter now explains why no command buttons are created
- New: detailed user documentation in English and German is now part of the repository and shown in the ioBroker documentation portal

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