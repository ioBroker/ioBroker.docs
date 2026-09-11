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

### 2.35.2 (2026-09-11)

- Fixed: A light that is unplugged no longer shows as switched on after a start — Govee's answer for a device it cannot reach carries the values of the last contact, and those are no longer written

### 2.35.1 (2026-09-11)

- Fixed: The values Govee reports for a device at start no longer wait behind the loading of the scene libraries — on an installation with a dozen lights they arrived seven minutes after the start

### 2.35.0 (2026-09-11)

- New: An air purifier's mode, level and filter life follow the device's own status report — a change made in the Govee app shows in ioBroker within a second, no cloud call (H7127, #47)
- Fixed: Filter life, air quality, mode and level of an appliance are read from Govee's device-state query at start — the adapter read that answer from the wrong field since its first version (#47)
- Fixed: A light without a local connection gets its power, brightness and colour from the same query at start; Govee's empty answers no longer turn into false or blank values
- Fixed: A light without a local connection on an installation with only an API key stays reachable — the 20-minute check meant to renew it never received an answer before
- Fixed: An installation using only an API key lost its appliance commands by mid-morning — a reachability poll that never got an answer used up the device's daily budget
- Changed: An appliance's reachability is no longer polled every 20 minutes; its own status push, a command and the start-up query count instead — polling would cost 72 of its 90 daily calls
- Fixed: The diagnostics report now records mode, level, temperature and music commands with their outcome — it only listed power, brightness and colour before
- Fixed: A datapoint Govee newly reports for a device is there from the first start on — it used to disappear again and only show up after the next restart
- Fixed: The filter life of an air purifier now carries its unit (%) — Govee declares none, and the datapoint had no unit since its first version
- Changed: The DreamView switch, the music auto-colour switch and the DIY-scene selector now carry an explanation in the object tree

### 2.34.0 (2026-09-10)

- Fixed: Air purifiers, heaters, humidifiers and fans — choosing a mode or a speed now reaches the device, where the adapter used to send a value Govee rejected as "Invalid parameter type" (#47)
- Fixed: The speed selector of an air purifier now offers the levels the device actually has, instead of the single unusable entry it showed before (#47)
- Fixed: On an appliance updating from an older version the level datapoint accepts values again — it kept the selection list of the previous version and refused every write against it
- Changed: On appliances whose modes share the same level numbers — kettles, some fans and humidifiers — the level is a plain number now; a selection list could only ever show one mode's levels
- Fixed: An installation with no light at all now reads its device states at start — filter life, air quality and every other reported value stayed empty forever (#47)
- Fixed: A heater's target temperature is sent in the shape the Govee API asks for, and the datapoint is labelled in the unit the heater itself reports — a 5–30 °C heater used to read °F
- Fixed: The current speed level now arrives from the cloud together with the mode — until now only the mode updated while the level datapoint kept showing its default
- Fixed: A command the Govee cloud rejects no longer counts as successful, so the datapoint stops showing a change the device never made, and the reason is named
- New: A device's night-light scene is selectable — the adapter received the scene list and the current scene from Govee and threw both away without creating a datapoint
- Fixed: The scene dropdown's "---" entry now carries the same value the adapter writes when it resets the dropdown, so the entry stopped being rewritten on every start
- New: The H7127 air purifier is confirmed by a user report — it is no longer listed as untested and no longer asks for the experimental switch at start
- Changed: The diagnostics report no longer repeats the privacy note the export button already shows, and says instead what only the file itself can say

### 2.33.0 (2026-09-08)

- Fixed: A light without a local API stays reachable while it reports its own state — Govee's device list lagged behind the bulb and overrode it every two minutes (reported for the H600D)
- Fixed: A status message the Govee cloud replays after a reconnect no longer counts as a fresh sign of life for the next half hour
- New: The H600D GU10 smart bulb is recognised from a user report
- New: 486 more Govee models start as experimental — every model the homebridge-govee project lists as of September 2026, from bulbs and strips to fans, heaters and ice makers
- New: An experimental model is tried by enabling "experimental device support"; a diagnostics report from the Expert tab confirms it for everyone
- Changed: The wiki's device list folds each device type into one block with its counts, so 602 entries stay readable

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