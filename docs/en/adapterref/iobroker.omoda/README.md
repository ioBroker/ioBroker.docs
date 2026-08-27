![Logo](admin/omoda.png)
# ioBroker.omoda

[![NPM version](https://img.shields.io/npm/v/iobroker.omoda.svg)](https://www.npmjs.com/package/iobroker.omoda)
[![Downloads](https://img.shields.io/npm/dm/iobroker.omoda.svg)](https://www.npmjs.com/package/iobroker.omoda)
![Number of Installations](https://iobroker.live/badges/omoda-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/omoda-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.omoda.png?downloads=true)](https://nodei.co/npm/iobroker.omoda/)

**Tests:** ![Test and Release](https://github.com/AlanSRU/ioBroker.omoda/workflows/Test%20and%20Release/badge.svg)

## omoda adapter for ioBroker

Brings your **Omoda / Jaecoo** car into ioBroker: vehicle status, GPS location,
battery/charging, and remote **lock** and **climate** — using the same cloud backend as
the official [Omoda / Jaecoo app](https://www.omoda.com/).

> ⚠️ **Unofficial, reverse-engineered software.** Not affiliated with, endorsed by, or
> connected to Omoda, Jaecoo or Chery. Provided "as is", use **at your own risk and only on
> your own vehicle**. Names and trademarks belong to their respective owners. See the
> [LICENSE](LICENSE).

### What it does

- **Status** — doors, windows, sunroof, lock, engine, climate running, tyre pressures/temperatures.
- **Location** — GPS latitude/longitude, speed, heading.
- **Battery & charging** — state of charge, electric/total range, charge state, charging power,
  charge plug connected, remaining charge time.
- **Commands** — lock/unlock, climate on/off with a settable target temperature, request GPS
  location, and "wake & refresh full status".

Additional functions from the vehicle app (individual seat heating/ventilation, defrosters,
EV charge start/stop and scheduled charging, windows/sunroof/trunk control, theft alarm) are
planned for a later version.

### Requirements

- An **Omoda / Jaecoo account** with the vehicle associated (owner or delegated access).
- The account **email** and **command PIN**.
- Region: defaults to **Europe** (also confirmed working in the UK). Other markets can be
  configured under **Region & polling** in the adapter settings.

> **Tip:** consider using a **delegated second account** for the adapter. Logging in with the
> same account here and in the official app makes the two repeatedly log each other out.

### Setup

1. Install the **Omoda / Jaecoo** adapter from the ioBroker admin **Adapters** tab and create
   an instance.
2. On the **Account** tab, enter your **email** and **command PIN** and save.
3. On the **Login (OTP)** tab, press **Request OTP code** — a one-time code is emailed to you.
4. Enter the code and press **Confirm OTP**. The adapter logs in and discovers your vehicle(s),
   creating a device per VIN under `omoda.0.<VIN>`.

A new OTP is only needed if the session later expires (typically because the official app was
opened); otherwise the session is refreshed automatically.

### Notes & safety

- The **command PIN** is your account PIN. Entering a **wrong PIN repeatedly can lock the
  account**, so the adapter stops after a couple of failed attempts — re-check the PIN in the
  settings before retrying.
- Many values read `null` while the car is in standby; battery, speed and mileage update while
  **driving or charging**, or after pressing **Refresh full status** (which briefly wakes the car).
- Waking the car is **rate-limited** by the backend, so the adapter enforces a cooldown.
- The MQTT telemetry connection uses **mutual TLS**. The client certificate/key material and the
  pinned CA ship with the adapter in `data/certs-store.json` (encrypted, as recovered by the
  upstream HA integration) so the adapter works offline without a provisioning round-trip. If
  Chery ever rotates the MQTT CA or client certs, that file has to be regenerated and a new
  adapter version released — telemetry will fail to connect until then.

## Credits

This adapter is a port of the excellent reverse-engineering work in the Home Assistant
integration **[omoda-jaecoo-ha](https://github.com/JackRonan/omoda-jaecoo-ha)** by
**Caslinovich** and **JackRonan**. The protocol constants, request-signing formulas, MQTT
credential derivation, and endpoint recipes were recovered by them and are used here under the
MIT License — this project would not exist without their effort. Please star and support the
upstream project. All bugs in this ioBroker port are mine, not theirs.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.0 (2026-08-10)
* (Alan Paris) **BREAKING:** `commands.lock` now follows the ioBroker `switch.lock` spec — **true UNLOCKS** the car, false locks it. Any script writing `true` to lock must be inverted. This is the polarity Alexa/Google (via ioBroker.iot), VIS lock widgets and type-detector already assume, so the old behaviour unlocked the car when the user asked to lock it
* (Alan Paris) Fixed telemetry fields the car reports as `null` being stored as real values: `doors.locked` no longer reads "locked" when nothing was reported, and GPS no longer jumps to latitude/longitude 0
* (Alan Paris) `info.connection` now returns to false when the session expires (e.g. the official app logs in on the same account) instead of staying true while every poll silently failed
* (Alan Paris) Corrected the "Dept ID" help text in all 11 languages — the default is 44 (UK), not 39
* (Alan Paris) The OTP code is now encrypted at rest, not only marked protected
* (Alan Paris) `location.heading` uses a plain `value` role (`value.direction` is an up/down/opening enum, not a compass bearing)
* (Alan Paris) Car MQTT reconnects back off from 10 s to 2 min and stop repeating the same warning, instead of retrying every 10 s forever when the broker keeps rejecting us
* (Alan Paris) The captcha solver yields to the event loop, so it can no longer stall other adapters sharing a compact host process
* (Alan Paris) Removed unused constants, token-store helpers and the placeholder test file
* (Alan Paris) Default "Dept ID" is now 44 (UK) instead of 39 (IT) — existing instances keep the value they already have (upstream 37f8f2b)
* (Alan Paris) Fixed a stale "charge remaining time": the field vanishes from the payload when charging ends, so the state now clears instead of showing the last value for hours (upstream a0f61ed)
* (Alan Paris) Command confirmations no longer cry "check failed" when the car reports only the climate module — the backend includes it on nearly every successful OFF command (upstream 2cc7d56)
* (Alan Paris) Backend rejections caused by vehicle permissions or a malformed request (A00374/A00554/A00567/A00604/A00643/A00757) no longer count towards the wrong-PIN anti-lockout (upstream 8aa4176)
* (Alan Paris) Correct state roles for info.model and info.brand; account email marked as protected
* (Alan Paris) The charging/driving fast-follow poll now self-schedules, so a slow probe can no longer overlap the next one

### 0.1.1 (2026-07-18)
* (Alan Paris) Security: never log the VIN or MQTT user id in cleartext (masked to a short suffix)
* (Alan Paris) Fixed a leak of the car MQTT client and polling timers when re-logging in after a session drop
* (Alan Paris) Added credit to the upstream Home Assistant integration (JackRonan/omoda-jaecoo-ha) in the README and LICENSE
* (Alan Paris) Added full admin UI translations for all 11 languages
* (Alan Paris) Config: clearer "Dept ID" help — it must match your account country's dialing code (UK=44, IT=39, …)
* (Alan Paris) Require Node.js >= 22 and admin >= 7.6.17; enabled automated npm publishing via trusted publishing (OIDC)
* (Alan Paris) Marked the OTP code as protected; various adapter-checker compliance fixes

### 0.1.0 (2026-07-18)
* (Alan Paris) initial release

## License
MIT License

Copyright (c) 2026 Alan Paris <alan.paris@scottish.rugby>

Portions Copyright (c) 2026 Caslinovich and the omoda-jaecoo-ha contributors (JackRonan),
ported from https://github.com/JackRonan/omoda-jaecoo-ha (MIT) and retained under its terms.

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