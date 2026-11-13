![Logo](admin/dreo-cloud.png)

# ioBroker.dreo-cloud

[![NPM version](https://img.shields.io/npm/v/iobroker.dreo-cloud.svg)](https://www.npmjs.com/package/iobroker.dreo-cloud)
[![Downloads](https://img.shields.io/npm/dm/iobroker.dreo-cloud.svg)](https://www.npmjs.com/package/iobroker.dreo-cloud)
![Number of Installations](https://iobroker.live/badges/dreo-cloud-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/dreo-cloud-stable.svg)

**Tests:** ![Test and Release](https://github.com/mehrwiedu/ioBroker.dreo-cloud/workflows/Test%20and%20Release/badge.svg)

## DREO Cloud adapter for ioBroker

Unofficial ioBroker adapter for selected DREO cloud-connected devices.

DREO manufacturer website: https://www.dreo.com/

> This project is not affiliated with, endorsed by, or supported by DREO.

## Current status

The adapter is under active development.

Current release: `0.1.5`.

This release uses `@mehrwiedu/dreo-api` `0.1.5`.
It has been validated with eight real devices across six DREO models.

Implemented:

- FamilyTree-based device discovery
- runtime discovery of newly available devices
- initial state loading
- live WebSocket updates
- automatic raw and friendly object creation
- dynamic read-only creation of newly observed raw keys
- bidirectional control of confirmed functions
- automatic session renewal and WebSocket reconnect
- effective friendly states
- central write acknowledgement and failure reconciliation

The adapter uses:

```text
@mehrwiedu/dreo-api 0.1.5
```

DREO protocol details and native command logic remain inside the SDK.

## Tested devices

| Model | Type | Quantity | Validated areas |
|---|---|---:|---|
| `DR-HCF007S` | Ceiling fan | 3 | Fan, modes, main light, brightness, color temperature, atmosphere light, timers, child lock, power/component-mask semantics and live updates |
| `DR-HCF001S` | Ceiling fan | 1 | Components without `poweron`, modes, timers and live updates |
| `DR-HPF002S` | Stand fan | 1 | Fan, modes, display, directional oscillation, independent axis angles and live updates |
| `DR-HHM001S` | Humidifier | 1 | Power, modes, fog level, target humidity, indicators, filter state, operating information, timers and live updates |
| `DR-HHM003S` | Humidifier | 1 | Power, modes, fog level, target humidity, warm mist, indicator levels, humidity thresholds, filter state and live updates |
| `DR-HAP009S` | Air purifier | 1 | Power, modes, fan level, mood light, display, mute, child lock, power recovery, air quality, filter life and live updates |

Other devices may appear through raw states but are not automatically considered fully supported.

## Account setup

Use a DREO account that supports email/password login.

The adapter can use either the primary owner account or a separate secondary account with access to the DREO home.

Using a dedicated secondary account is recommended for adapter operation, but it is not required.

Apple and Google login are not supported.

## Configuration

- DREO email
- DREO password
- region: EU or US

The password is stored as an encrypted and protected ioBroker native setting.

## Object structure

```text
dreo-cloud.0.devices.<deviceId>
```

Possible branches:

```text
info
power
fan
humidifier
light.main
light.atmosphere
display
settings
timer
raw
```

The `raw` branch mirrors DREO values and is read-only.

## Supported controls

The exact set depends on the device.

Common controls include:

```text
power.on
fan.on
fan.speed
fan.mode
settings.mute
settings.childLock
light.main.on
light.main.brightness
light.main.colorTemperature
light.atmosphere.on
light.atmosphere.brightness
display.on
timer.*
```

Model-specific controls include:

```text
fan.oscillationMode
fan.oscillation.horizontalAngle
fan.oscillation.verticalAngle
humidifier.mode
humidifier.fogLevel
humidifier.autoTargetHumidity
humidifier.sleepTargetHumidity
humidifier.humidityIndicatorLowerThreshold
humidifier.humidityIndicatorUpperThreshold
humidifier.warmMist
light.mood.on
light.mood.level
display.level
airPurifier.mode
airPurifier.fanLevel
settings.powerRecovery
settings.filterInstalled
```

Read-only operating information includes filter life, operating hours, PM2.5 and air-quality level where reported.

## Write behavior

Writes are routed to public SDK methods.

- The adapter does not construct native DREO payloads.
- Identical successful writes are acknowledged immediately.
- Rejected writes are restored to the last confirmed value.
- Actual changes remain pending until confirmed by the device report where required.
- Failed DREO `control-reply` messages are surfaced as SDK errors.

## Deliberately unsupported

Ceiling-fan favorites based on raw `predefine` values are not writable.

Real-device testing showed that writing the slot did not execute the stored scene. Numeric writes were rejected by the cloud. `raw.predefine` therefore remains read-only.

Unverified fields such as `fixedconf` and additional RGB effects also remain raw-only.

## Cloud dependency

The adapter depends on private DREO cloud APIs and does not provide local-only control.

## Privacy and security

- Do not publish credentials, tokens, device serial numbers or unredacted logs.
- Prefer a dedicated secondary DREO account.
- Review logs before attaching them to issues.

## Known limitations

- Apple and Google login are not supported.
- Only EU and US regions are available.
- Not every raw state has a friendly mapping.
- Friendly structures are not yet generated when a known key first appears only after initialization.
- Partially shared homes/devices still require dedicated testing.
- DREO can change the private API without notice.

## Development

```bash
npm install
npm test
npm run check
npm run lint
npm run build
```

## Changelog
### 0.1.5 (2026-10-30)

- Updated `@mehrwiedu/dreo-api` to `0.1.5`, adding a 30-second HTTP timeout for cloud requests.
- Removed an unused admin translation key from all 11 language files.

### 0.1.4 (2026-10-03)

- Fixed the ioBroker object hierarchy by exposing the device container as a folder
- Updated Friendly-State and RAW-state roles to comply with current ioBroker object-structure requirements
- Prevented numeric constraints from being applied to non-numeric Friendly States
- Added startup migration for previously stored runtime-discovered RAW states so corrected type and role metadata is applied after upgrades
- Updated `@mehrwiedu/dreo-api` to `0.1.4`, including the validated `DR-HCF007S` power/component-mask behavior

### 0.1.3 - 2026-10-01

- Promoted the validated 0.1.3 beta feature set to a regular release
- Added current ioBroker repository-checker compatibility and complete admin translations
- Clarified that either the primary owner account or an authorized secondary email/password account can be used

### 0.1.3-beta.1 - 2026-09-27

- Added validated `DR-HHM003S` humidifier support
- Added validated `DR-HAP009S` air-purifier support
- Validated runtime hot-add without an adapter restart
- Added model-aware write routing for overlapping Friendly-State paths
- Added control-reply error propagation through the SDK
- Removed unverified ceiling-fan favorite control

### 0.1.2-beta.1

- Added support for older DREO devices without a `poweron` state

### 0.1.1 - 2026-07-17

- Added the official DREO Cloud adapter logo
- Moved full device serial numbers from info logs to debug logs
- Enabled GitHub Actions trusted publishing for future npm releases

### 0.1.0 - 2026-07-17

- Added the Creator-based ioBroker adapter structure
- Added DREO account configuration for EU and US regions
- Added FamilyTree-based device discovery
- Added runtime discovery of newly available devices
- Added automatic creation of device, information, raw, and friendly states
- Added live raw and friendly state updates through the DREO WebSocket connection
- Added bidirectional control of supported power, fan, speed, and light functions
- Added dynamic read-only creation of previously unknown raw states
- Added automatic re-login and WebSocket reconnect after renewed DREO sessions
- Added effective friendly on/off states while preserving original raw device values

## License

MIT License

Copyright (c) 2026 mehrwiedu <david@vonderhoeh.net>

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