---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.govee-smart
BADGE-stable: https://iobroker.live/badges/govee-smart-stable.svg
BADGE-Installations: https://iobroker.live/badges/govee-smart-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.govee-smart
BADGE-Test and Release: https://github.com/krobipd/ioBroker.govee-smart/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
---
# Govee Smart

Controls Govee Wi-Fi devices from ioBroker: light strips, bulbs and panels, thermometers,
hygrometers and air quality monitors, smart plugs, battery buttons and remotes, and appliances such
as heaters, humidifiers, aroma diffusers, kettles, ice makers, fans and air purifiers.

The adapter talks to your devices **locally whenever it can**. A light with the local API enabled
answers on your own network in milliseconds, and the cloud is never allowed to overwrite what the
device just said locally. The cloud fills in what only it knows — device names, capabilities,
scenes and snapshots — and takes over control for devices that have no local API at all.

## What you get for what you enter

Everything is optional except the first line. Enter more and more becomes available; enter nothing
and local control still works.

| What you enter                        | What the adapter can do                                                                                 |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Nothing                               | Find lights on your network and switch them: power, brightness, colour, colour temperature, status      |
| + Govee API key                       | Device names, capabilities, scenes, snapshots and segments                                              |
| + Govee account (e-mail and password) | Real-time status updates pushed from Govee, so changes made in the app or on the device show up at once |

The API key is free and comes from the Govee Home app. The account login is what the app itself
uses; the adapter only listens on it and never sends commands through it.

**The local API has to be switched on per device, in the Govee Home app** (device settings → LAN
Control). Without it, that device is controlled through the cloud — which works, but takes a few
seconds per command and is rate-limited by Govee.

## Setting it up

1. Install the adapter and create an instance.
2. Open the instance settings. The **Connection** card walks you through the three tiers above and
   tells you what is working and what is not — including a login test that really logs in rather
   than just checking the form.
3. If Govee asks for a verification code (it does that for a new client), the card asks you for it.
   Nothing else is needed; the adapter remembers the login across restarts so no further codes are
   sent.
4. Devices appear under `devices.<model>_<id>`. Groups you created in the Govee app appear under
   `groups.`.

## Reporting a problem

Open the adapter's **Expert** tab, press **Diagnostics**, pick the device and press the button:
the adapter builds a report and your browser saves it as a file. Attach that file to a GitHub
issue — the issue forms ask for exactly this file.

The device list offers every device, reachable or not — a report is wanted precisely when
something misbehaves. Each device's `diag.lastExport` datapoint records when its last report was
taken.

The report is **pseudonymised**: IP addresses, mail addresses and device names are replaced by
stable markers, device ids are shortened, and credentials never appear at all. The same real value
always maps to the same marker inside one file, so the report stays followable without carrying
anything about your home. The file explains all of this in its own header.

A report is what lets a device be added or a bug found without anyone needing your hardware. If it
does not contain enough to do that, the report is at fault, not you — please say so in the issue.

## Where to read more

The wiki has the detail, in English and German:

- **Setup** — the three tiers, the local API, verification codes, what to do when a channel stays off
- **Behavior** — which channel handles what, how reachability is decided, what happens when the cloud is down
- **State tree** — every datapoint, what writes it and what you may write yourself
- **Scenes and snapshots** — scenes, DIY scenes, cloud snapshots and locally saved snapshots
- **Segments** — segment control, the detection wizard, cut strips and manual segment lists
- **Groups** — how Govee app groups behave here
- **Sensors and appliances** — readings, events and what the cloud limits mean
- **Devices** — every supported model, generated from the adapter's own catalogue

→ <https://github.com/krobipd/ioBroker.govee-smart/wiki>

## Device not listed?

Send a diagnostics report and the model gets added. That is what the report exists for — the
catalogue grows from user reports, and no hardware needs to change hands.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 2.38.3 (2026-09-17)

- Changed: Internal cleanup. No user-facing changes.

### 2.38.2 (2026-09-17)

- Changed: Internal refactoring. No user-facing changes.

### 2.38.1 (2026-09-16)

- Fixed: Repairing a dropdown is now a single write — until 2.38.0 it was emptied first, so a restart in that moment left the datapoint with nothing to pick from until the next start

### 2.38.0 (2026-09-16)

- Fixed: Repairing a dropdown no longer deletes and re-creates the datapoint — it used to throw away the datapoint's value and its room and function assignment
- Changed: A device renamed in the Govee app now gets the new name in an existing object tree too — a name you change in the tree itself is reset at the next start
- Fixed: An error the adapter reports as an object now reads properly in the log instead of "[object Object]", and a connection problem reported that way is recognised as one

### 2.37.1 (2026-09-15)

- Fixed: The instance settings open on the Configuration tab again also when the admin keeps its settings on the server — 2.37.0 handled the browser storage only, so every open still landed on Expert

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

---

_Developed with assistance from Claude.ai_