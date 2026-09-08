---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.govee-smart
BADGE-stable: https://iobroker.live/badges/govee-smart-stable.svg
BADGE-Installations: https://iobroker.live/badges/govee-smart-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.govee-smart
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

### 2.32.1 (2026-09-07)

- Fixed: Your devices and their recorded history no longer disappear from the object tree when the Govee cloud cannot be reached at startup

### 2.32.0 (2026-09-07)

- Fixed: In an account without a single light, every device stopped being switchable after a restart — appliances, plugs and sensors had no state and no reachability until you pressed sync devices
- Fixed: A device could stay green for up to 30 minutes after Govee had reported it offline; an arriving reading no longer overrides an explicit offline report
- Fixed: With only an API key configured, devices fell offline 30 minutes after the start although they were still controllable — the proof now renews itself without account credentials
- Fixed: Scene and snapshot commands that fell back to the cloud and failed there were still confirmed as carried out; a command that did not arrive now stays unconfirmed
- Fixed: A manually chosen segment list could only ever lengthen the learned strip and never shorten it again — the wizard's own measurement was overwritten by it
- Fixed: Under load the adapter stopped counting appliance commands against their daily limit, so a heater or humidifier could burn through its Govee quota and stop responding
- Fixed: On a device model the adapter does not know yet, the tier datapoint told the user to press a button that 2.31.0 had already removed from the admin page
- Fixed: Without account credentials, a group from the Govee app grew an empty entry in the object tree on every restart; it now appears only once its members are actually known
- New: Datapoints carry an explanation in all 11 languages wherever the name alone does not say enough — 99 of them instead of 26
- Changed: The adapter can no longer be installed directly from GitHub — install it from the ioBroker repository or from npm, as with every other adapter

### 2.31.1 (2026-09-04)

- Fixed: When the adapter met a device model it does not know yet, its log asked the user to press a button that 2.31.0 had removed — it now points at the Expert tab, where the report is actually made

### 2.31.0 (2026-09-03)

- Fixed: On instances upgraded from 2.27.0 or newer, every admin card was dead — diagnostics, segment wizard and connection test alike; affected installations repair themselves on the next start
- Fixed: A card that could not reach the adapter reported "no devices yet" instead of the real error
- Changed: Segment detection and diagnostics now share one **Expert** tab with a button each
- Changed: The per-device `diag.export` button is gone; the Expert tab builds the report and hands you the file in one press
- Changed: `diag.lastExport` now records WHEN the last report was taken, instead of naming the file
- Improved: Both cards say "Loading devices …" while they search, and explain the wait if it takes long
- Fixed: The diagnostics report still described the reachability rule as it was before 2.30.0

### 2.30.0 (2026-09-03)

- Fixed: Devices without a local API were shown as unreachable although they switched and reported normally; they now show as reachable for as long as they are
- Fixed: Sensors and buttons behind a Govee gateway were shown as unreachable although their readings kept arriving; their gateway now decides whether they are reachable
- Fixed: Appliances stayed marked as reachable for up to two minutes after they had actually gone offline
- Improved: A device that is unplugged and put away is reported as unreachable within half an hour, instead of staying green until the adapter is restarted
- New: 37 additional device models are recognised, including smart plugs, a button remote, an air quality monitor and an aroma diffuser
- New: Battery buttons and remotes are supported as their own device kind, with battery level and reachability

[Older changelogs can be found there](CHANGELOG_OLD.md)

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