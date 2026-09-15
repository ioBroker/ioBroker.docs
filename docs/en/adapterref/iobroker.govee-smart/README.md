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

### 2.37.1 (2026-09-15)

- Fixed: The instance settings open on the Configuration tab again also when the admin keeps its settings on the server — 2.37.0 handled the browser storage only, so every open still landed on Expert

### 2.37.0 (2026-09-15)

- Changed: The two folders "snapshots" and "diagnostics" at the top of the object tree are gone — a saved local snapshot is kept with its device, and no diagnostics report is stored any more
- Changed: A diagnostics report is generated and downloaded from the Expert tab only — the adapter keeps no copy in the instance, and the copies left by earlier versions are removed at the first start
- Changed: Local snapshots saved by earlier versions are carried over into their device objects at the first start, so nothing you saved is lost when the folder disappears
- Fixed: The instance settings open on the Configuration tab again — the admin remembered the last tab you used, and once you had visited the Expert tab every later visit started there
- Fixed: The device icons in the object tree are visible on the dark themes again — they were drawn in plain black, invisible on a dark background, and now take the row's text colour
- Fixed: A group's "membersUnreachable" datapoint is created together with the group — it used to appear only with the first reachability check, up to 20 seconds after the rest of the group
- Changed: The admin warns when another adapter on the same host takes the LAN port 4002 — the port shows as a fixed field in the adapter settings next to the network interface

### 2.36.0 (2026-09-14)

- Fixed: A command the adapter could not send is no longer confirmed — no cloud connection, or a light reachable on neither channel — the datapoint used to claim the device had taken the value
- Fixed: Music sensitivity and auto-colour are no longer confirmed on a light or group that cannot apply them — the datapoint keeps the old value and the log says why, instead of claiming success
- Fixed: The segment wizard restores the brightness the strip had before it ran — it turns the strip to full while measuring, and a dimmed strip stayed bright afterwards
- Fixed: The segment wizard no longer stays locked for five minutes when the strip cannot be reached at start — it stops with the reason, and can be started again right away
- Fixed: Sensor values update again on an installation that removed its API key but kept the Govee account — they had frozen at the last reading, and the adapter took a minute to report ready
- Changed: A sensor reading that has not changed is no longer written again every two minutes — the datapoint keeps its timestamp until the value itself changes
- Changed: The three summary datapoints under `info` exist right after the start instead of appearing twenty seconds later
- New: Seven datapoints real devices report now carry a translated name — main light, background light, fan, fan speed, reverse airflow, pillar light and base light
- New: Explanations where the name alone does not say it — reverse airflow, pillar and base light, warm mist, the preset-scene dropdown and the unreachable members of a group

### 2.35.2 (2026-09-11)

- Fixed: A light that is unplugged no longer shows as switched on after a start — Govee's answer for a device it cannot reach carries the values of the last contact, and those are no longer written

### 2.35.1 (2026-09-11)

- Fixed: The values Govee reports for a device at start no longer wait behind the loading of the scene libraries — on an installation with a dozen lights they arrived seven minutes after the start

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