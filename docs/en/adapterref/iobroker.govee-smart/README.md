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

### 2.41.0 (2026-09-26)

- Changed: Discovery follows the selected network interface only — the additional scan addresses setting is gone, and the broadcast goes to the network of the chosen card
- Fixed: `info.cloudConnected` turns false while the Govee Cloud stays unreachable and true again with its next answer — until now only a rejected API key cleared it

### 2.40.0 (2026-09-25)

- New: Optional additional scan addresses — lights in another subnet or behind a router that blocks multicast are found by asking them directly
- New: Heaters with an auto-stop setting get `control.auto_stop` — stop heating at the target temperature or keep it
- New: Models that report the cloud temperature in °F are converted to °C — the H5179 by default, 14 further models with the experimental switch
- Fixed: Cloud events such as lack of water, presence or a full ice bucket now reach their datapoints — until now none did
- Fixed: The segment count of strips that report in groups of three is measured correctly — H61A8 and H7020 no longer grow phantom or lose real segments
- Fixed: A strip nothing had measured yet accepts segment commands, uses its scenes over LAN and works in the wizard and in snapshots
- Fixed: A device the account still lists is no longer deleted when the cached device list misses it
- Fixed: A fresh account login is kept for the next reconnect, and successful logins are capped per hour — repeated logins can make Govee lock the account for 24 hours
- Fixed: After an account change the saved login of the previous account is no longer reused
- Fixed: Dropdowns send the value Govee declared, and a LAN light's colour-temperature range follows what the device reports
- Fixed: Group music plays the same mode on every member, and a member without music or without the scene no longer counts as reached
- Fixed: A Govee snapshot is activated by its name — reordering snapshots in the app no longer triggers the wrong one
- Fixed: A command that could not be sent is no longer confirmed, and a day whose cloud budget is spent refuses commands instead of queueing them until midnight
- Fixed: With the account connected, lights are still asked for their status once a minute and after every LAN command, so a lost command is corrected
- Fixed: Port 4002 taken by another program is now reported instead of silently losing the lights' replies, and `info.connection` turns false when the last device goes quiet
- Improved: Leftovers of very old versions, including emptied login fields, no longer linger in the instance settings — expect one extra restart right after the update
- Fixed: Stopping the adapter during its start no longer leaves parts of it running, and a message sent during the start is answered
- Fixed: The segment wizard is cancelled when you leave the card, and the connection card shows Govee's reason instead of a raw text key
- Fixed: The diagnostics report hides Govee account topics and the device's LAN address in number form, and a device name only replaces whole words
- Improved: Temperature, humidity, battery, air quality and filter life carry translated names — the cloud path wrote Govee's English wording in every language
- Improved: Bluetooth-only models are no longer listed as supported, and the Wi-Fi meat thermometer H5610 was added

### 2.39.2 (2026-09-22)

- Fixed: App groups are no longer asked for a device state at every start — Govee answered each call with an error that only filled the diagnostics report
- Fixed: A scene request Govee refuses is no longer taken as "no scenes" — the cached scenes and snapshots stay, and the report names the reason once

### 2.39.1 (2026-09-22)

- Fixed: The diagnostics report no longer contains your Wi-Fi network name, the Govee app's device number or a group's id — they appeared in clear in every exported file
- Improved: The diagnostics report keeps Govee's complete account-list entry and shows commands waiting for an offline device and when the adapter started

### 2.39.0 (2026-09-22)

- New: A device that has gone quiet is asked for its status over the Govee account connection — a bulb or purifier that works but showed as unreachable now stays reachable
- Improved: The cloud budget follows Govee's per-device limits — a command for one light no longer waits for another light's calls or for library downloads
- New: A command Govee refused because the device was offline is delivered once the device reports back (within five minutes), instead of being lost
- Fixed: Scenes and libraries that arrived after a busy start now reach the scene dropdown and the cache — they used to stay at `---` and were fetched again on every start
- Fixed: A scene list that shrank no longer leaves withdrawn scenes in the dropdown
- Fixed: The diagnostics report no longer lists a reachability refresh for appliances, which never get one
- New: 28 more Govee models are recognised — meat thermometers, motion and pressure sensors, heaters, kettles, a composter and the gateways that carry battery sensors
- New: H1771 Table Lamp reported working by a user

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