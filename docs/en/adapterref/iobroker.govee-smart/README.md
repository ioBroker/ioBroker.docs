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

Everything is optional: with nothing entered, the lights on your network are found and switched
locally; a free Govee API key adds names, capabilities, scenes, snapshots and segments; your Govee
account adds real-time status — what each step brings in detail is on the wiki page
[Setup](https://github.com/krobipd/ioBroker.govee-smart/wiki/Setup).

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
4. Devices appear under `devices.<model>-<id>` — the model and the last four characters of the
   device's own ID, for example `devices.h61be-525f`. Should two devices of one model end in the same
   four characters, the second one gets its whole ID. Groups you created in the Govee app appear
   under `groups.`.

## Updating from 2.x

Version 3.0.0 gives every device a new object ID once: `devices.h61be_525f` becomes
`devices.h61be-525f`, with a hyphen like the other device adapters of this developer. The move
happens by itself at the first start: values, recording settings, rooms, functions and aliases move
along, and recorded history continues in its old series. Scripts and visualizations that use the old
IDs must be updated.

## Reporting a problem

Open the adapter's **Expert** tab, press **Diagnostics**, pick the device and press the button:
the adapter builds a report and your browser saves it as a file. Attach that file to a GitHub
issue — the device-support form asks for exactly this file.

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

### 3.1.1 (2026-10-01)

- Fixed: a cloud command that fails because the Govee server name cannot be resolved is sent again within 10 seconds instead of being lost after one try
- Fixed: after a failed command the light's real state is read back right away, so its datapoint no longer stays on the wrong value — also without a Govee account
- Fixed: calls that never reached Govee (DNS or connection errors) no longer use up the daily budget, so an appliance is not blocked for the rest of the day
- Fixed: a group command that only some of its lights took now names the lights that did not switch and why, so a dark light no longer goes unnoticed
- Improved: connection errors in the log are written in plain words, e.g. that the Govee server name could not be resolved and the DNS is the likely cause

### 3.1.0 (2026-10-01)

- Fixed: a rejected background token refresh of the Govee account now counts toward the login protection and asks to check email/password instead of retrying silently
- Fixed: "Test login" in the connection card counts toward the account's login limit (3 per hour) and says when the next test is possible
- Fixed: segment colours and brightness are confirmed only after the command went out — a refused Cloud command no longer leaves them acked
- Fixed: stopping the adapter while it is still starting really stops it — it no longer goes on to search the network or log in to your Govee account afterwards
- Fixed: a light found on the network before the saved data loads keeps its scene speed and remembered libraries after a restart
- Fixed: a group offers only the colour temperatures every member supports, so no member is sent a value outside its range
- Fixed: when Govee no longer accepts the account session, scene, music and DIY libraries, snapshots and groups ask for a fresh login instead of reading as empty
- Fixed: a Cloud rate limit or rejected API key is reported once, with the real waiting time — no longer three times or with a wrong retry hint
- Fixed: moving a 2.x device tree to its new id no longer loses recordings or room assignments when the move fails or is interrupted
- Fixed: a light whose scene library has not loaded yet keeps its `scenes.scene_speed` datapoint, value and recording — a start without saved data deleted and re-created it
- Improved: a restart leaves the object tree untouched when nothing changed, so scripts and history that watch object changes no longer see needless updates
- Fixed: a mode or level dropdown only takes a value the device declares — a fan speed no longer shows `50`, an air purifier's level no longer `0` in Auto mode
- Fixed: the manual device sync after a failed start shows the Cloud connected and stops the pending retry; a device it adds gets its first values without a log warning
- Fixed: a Govee e-mail or password of spaces only counts as not entered — at start, in the sensor hint and in the connection card's test
- Fixed: the refresh button of a light keeps its scene list across restarts and corrects a wrong segment count; devices that are not lights no longer use up Cloud calls
- Fixed: a temperature reading carries °C whichever way it arrives — a model that declares Fahrenheit no longer flips the unit to °F (the value is always °C)
- Fixed: a segment colour above 255 is sent as 255 — it wrapped to 0 before; a segment brightness is rounded like the light's brightness
- Improved: a lamp that is unplugged or unreachable on your network leaves one warning in the log instead of a new warning for every command you send to it
- Fixed: a group that is switched off or set to a colour clears its scene and music dropdowns the same way a single light already does
- Fixed: a heater that declares no temperature unit shows none instead of an invented °F; a command delivered after the device came back shows the value that was sent
- Fixed: an untested model without catalog corrections no longer warns to turn on the experimental switch — it works as it is; the log only asks for a diagnostics report
- Fixed: the settings describe the experimental switch for what it does — it turns on the catalog corrections of untested models; every device appears without it
- Improved: after you press the device sync or the refresh button, the log tells you what it found, for example which new devices were added to the object tree
- Fixed: the connection card words every answer in the admin's language — a full login window shows the time on your own clock, and a repeated login test no longer claims a code was just requested
- Fixed: the music mode read from Govee's state answer showed the mode at that position instead of the reported one; a mode the device never declared is no longer written
- Fixed: the segment detection wizard no longer counts a dark segment at the end when the measurement runs all the way to the longest strip Govee supports
- Improved: appliance modes and levels and the device type show readable names in your ioBroker language; scripts may still write the names Govee uses, such as Auto

### 3.0.1 (2026-09-27)

- Improved: the note the Admin shows before an update to 3.x is short now: the warning, one example old → new and a link to the details

### 3.0.0 (2026-09-26)

- Changed: every device gets a new object ID once — model and last four characters with a hyphen, e.g. `devices.h61be-525f`; scripts and visualizations need the new IDs
- Changed: the move carries values, recording settings, rooms, functions and aliases along, and recorded history continues in its old series
- Fixed: two devices of one model whose IDs end alike now get a tree each and each receives its own commands — until now they shared one
- New: the H1741 battery table lamp reports its charge level in `sensor.battery`; Govee reports a fully charged battery as about 80 percent
- Fixed: fans and heaters with a numeric level (H7102, H7130) store it as a number, and the H7121 no longer puts a warning in the log at every refresh

### 2.41.0 (2026-09-26)

- Changed: Discovery follows the selected network interface only — the additional scan addresses setting is gone, and the broadcast goes to the network of the chosen card
- Fixed: `info.cloudConnected` turns false while the Govee Cloud stays unreachable and true again with its next answer — until now only a rejected API key cleared it

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