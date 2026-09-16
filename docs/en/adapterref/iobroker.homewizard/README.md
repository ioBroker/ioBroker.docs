---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.homewizard
BADGE-stable: https://iobroker.live/badges/homewizard-stable.svg
BADGE-Installations: https://iobroker.live/badges/homewizard-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.homewizard
BADGE-Test and Release: https://github.com/krobipd/ioBroker.homewizard/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
---
# ioBroker.homewizard — User guide

Real-time energy data from HomeWizard Energy devices over the local **API v2**.

## Requirements

- A HomeWizard device that speaks API v2: **P1 Meter** (HWE-P1), **kWh Meter** 1-phase (HWE-KWH1 / SDM230) or 3-phase (HWE-KWH3 / SDM630), **Plug-In Battery** (HWE-BAT).
- Firmware new enough for the local API v2, and the local API switched on in the HomeWizard app.
- Node.js >= 22, js-controller >= 7.2.2, Admin >= 8.0.11.

Energy Socket, Watermeter and Energy Display speak only the deprecated v1 API. They are out of scope and will not be added.

## Adding a device

The adapter has no device table in its settings — devices live in the object tree and are added by pressing the button on the device itself.

**With automatic discovery (normal case)**

1. Open the **Objects** tab and set `homewizard.0.startPairing` to `true`.
2. Within 60 seconds, press the physical button on the HomeWizard device.
3. The device appears under the instance with its own folder.

The window stays open for the full 60 seconds, so several devices can be added in one go.

**With a fixed IP address** — for networks where mDNS does not get through (a separate VLAN, Docker without host networking):

1. Write the device's IP address into `homewizard.0.pairingIp`.
2. Then set `homewizard.0.startPairing` to `true` and press the button on the device.

## What you get

Each device gets a folder named `<product type>_<serial>` containing:

| Folder                 | Contents                                                                                      |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| `info`                 | Product name and type, firmware, WiFi network and signal strength, uptime, connection state   |
| `measurement`          | Power, voltage, current, frequency, energy totals per tariff, timestamps                      |
| `measurement.quality`  | Voltage sags and swells, power failure counters (P1 only)                                     |
| `measurement.external` | Gas, water and heat meters that report through the P1 meter                                   |
| `system`               | Cloud connection, status LED brightness, legacy v1 API, reboot and identify buttons           |
| `battery`              | Charge mode, permissions, target power and counters — on the meter the battery is paired with |

`remove` deletes a device including all of its data points.

## Connection states

- `<device>.info.connected` — true while the device answers the adapter. That includes the fallback polling, not just the real-time connection.
- `info.connection` — true while at least one device answers.
- `info.devicesTotal` / `info.devicesOnline` / `info.devicesAllOnline` — how many devices are set up and how many of them answer. `devicesTotal` keeps its value when the adapter is stopped.

Measurements normally arrive as a push about once per second. If that connection drops, the adapter polls over HTTPS instead (every 10 seconds, every 30 for a device with a weak signal) while it reconnects in the background, so the data keeps flowing.

## Controlling a Plug-In Battery

The battery is paired as its own device, but the controls sit on the **P1 or kWh meter** it works with — that is where HomeWizard exposes them:

- `battery.mode` — `zero`, `to_full`, `standby` or `predictive`.
- `battery.charge_to_full` — charge to 100 % once.
- `battery.permissions` — a JSON array, written as text.

`predictive` and `charge_to_full` need a recent battery firmware (API 2.3.0). Older firmware rejects them and the value is not applied.

## When something does not work

**Pairing does not find the device.** mDNS often does not cross VLANs or Docker bridges. Use the fixed-IP path above.

**Pairing fails right after the button press.** The adapter revokes the token it was issued and asks you to try again. Check that the local API is enabled in the HomeWizard app.

**A device shows as not connected.** The adapter never gives up: it retries the real-time connection with growing intervals (up to 5 minutes), searches for a changed IP address via mDNS about once an hour, and switches to a faster rhythm for devices it recognises as having a weak signal. A meter in a cellar hallway can be gone for hours; nothing needs to be done for it to come back.

**"token invalid — re-pair device to fix".** The device no longer accepts the adapter's token, usually after a factory reset. Pair it again — the existing data points are kept.

**Log lines about the bundled certificate expiring.** The adapter carries the HomeWizard CA certificate to verify device certificates. Well before it expires, an adapter update will ship a fresh one.

## Privacy and security

- Device tokens are stored encrypted in the device object, never in the adapter configuration.
- The adapter verifies each device's certificate against its known identity, so it will not talk to a different device that happens to hold a HomeWizard certificate.
- Removing a device also revokes the adapter's token on the device itself.
- Turning on `system.api_v1_enabled` re-enables the old v1 API on the device. That API has no encryption and no token — anyone on the network can then read and control the device. The adapter warns when you do it.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.18.2 (2026-09-06)

- Fixed: a device the adapter could not read the stored token for can be removed again — its `remove` data point did nothing at all, and the device stayed in the tree for good.
- Fixed: renaming a device in the HomeWizard app now updates its `info.productName` data point; until now the new name showed up nowhere until the adapter was restarted.
- Fixed: the firmware version keeps up with a device that updates itself, instead of showing the version from the last adapter start.
- Fixed: a button falls back to "not pressed" even when the device cannot be reached, so it stays clickable instead of staying stuck.
- Changed: a device entry that is damaged or unreadable is now reported in the log instead of disappearing without a word.

### 0.18.1 (2026-09-04)

- Fixed: corrected data point names now also reach devices that are currently offline — until now they waited for the device to answer again, which for a meter with a weak signal could mean never.
- Changed: the object tree no longer holds the `info.legacyMigrated` data point, which never carried any information about your devices or their readings.

### 0.18.0 (2026-09-04)

- Fixed: a device that keeps answering while its push connection is down is no longer shown as not connected — the status describes the device now, not one connection type.
- Fixed: WiFi signal strength and uptime keep updating for such a device instead of freezing at the values from before the drop.
- Fixed: corrected names and descriptions now reach installations that already exist — until now they only ever arrived on fresh ones.
- Fixed: sending a message to the adapter works again — a leftover setting from an earlier version blocked every message silently, with nothing about it in the log.
- Fixed: a device with no usable IP address is reported at start-up and searched for, instead of staying quietly dead until the next restart.
- Fixed: the reboot and identify buttons reset themselves even when the command fails, so they no longer stay pressed in Admin.
- Fixed: the battery data points are removed once the meter reports that no battery is connected any more, instead of showing its last values forever.
- New: the data points under `info` explain what they mean in all eleven languages, and a user guide is now part of the documentation portal.
- Changed: for security, an address announced over the network is only accepted when it belongs to a private range, so pairing can no longer be directed at a host outside your own network.

### 0.17.0 (2026-09-02)

- Fixed: the connection status is now reset on every stop, even when the adapter is stopped right after it started — before, such a stop could leave it showing as connected.
- Fixed: a device that repeats the same error after reconnecting is warned about again, instead of staying silent for the rest of the adapter's run.
- Fixed: switching cloud access, the legacy v1 API or charge-to-full from a script now confirms the actual on or off value, not the raw text that was written.
- Fixed: two rare cases where a log line could show undefined or an object instead of the error now show the real text, and a malformed device error keeps a readable code.
- Fixed: an external gas or water meter whose reported type contains unusual characters now gets a clean name in the object tree instead of a broken one.
- Changed: ioBroker Admin 8.0.11 or newer is now required — the same minimum version that the current ioBroker stable repository ships with.

### 0.16.0 (2026-08-27) — stable

- Fixed: stopping the adapter no longer leaves every device showing as connected — the device markers and the connection status are now reset before the adapter goes down.
- Fixed: after a crash, a power cut or a restart, a device that was reachable before no longer stays green until it reconnects — every device starts out as not connected.
- New: three data points show at a glance how many devices are set up, how many are answering right now, and whether all of them are.

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