![Logo](admin/philips-air.png)
# ioBroker.philips-air

![Number of Installations](http://iobroker.live/badges/philips-air-installed.svg)
![Number of Installations](http://iobroker.live/badges/philips-air-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.philips-air.svg)](https://www.npmjs.com/package/iobroker.philips-air)

![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.philips-air/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/philips-air/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.philips-air.svg)](https://www.npmjs.com/package/iobroker.philips-air)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Philips air purifier adapter for ioBroker
Connects Philips air purifiers and selected Philips/Versuni fans with ioBroker.
**Tested with AC2729 and the Philips/Versuni fans CX3550/01 and CX7550/01**, but should work with newer purifiers that communicate via local CoAP with encryption.
![AC2729](img/device.png)

[Link to philips website](https://www.philips.de/c-m-ho/luftreiniger-und-luftbefeuchter/kombi)

## Usage
Enter the IP address or the hostname of your device. You can find it in your router, where the device often shows up as `MiCO`.
Most devices are reached over CoAP, which is the default. Some older ones, such as the AC2729 and the AC3829, only answer over HTTP - if the connection does not come up, switch the protocol in the instance settings.
Then pick your device model, so that the adapter creates the controls that match your device. If your model is not in the list, choose `Generic`: you still get every read-only value, just no model-specific controls.
It can happen that a device does not report all variables; those stay unfilled in the object tree. Raw values the adapter does not recognise are collected under `unknownStates`.

### The two timing settings

Both are in milliseconds and rarely need changing.

| Setting | Default | What it does |
| --- | --- | --- |
| Alive timeout | 30000 | How long a single request to the device may take before it is given up. Over HTTP it is also the polling interval. |
| Reconnect interval | 30000 | How long to wait before the first retry after a failed connection. Further failures double the wait, up to five minutes, so an unreachable device is not hammered. It must not be shorter than the alive timeout. |

Over CoAP the device pushes its status on its own, so there is no polling. Some devices - the CX7550/01 for example - can stay silent for hours; the adapter then checks the connection by asking the device directly instead of rebuilding it.

### Which device model should I select?

| Your device | Model to select |
| --- | --- |
| AC2889 and the other classic purifiers, for example AC1214, AC2729, AC2939, AC3059 or AC3829 | `AC2889` |
| AC3221 | `AC3221` |
| CX3550/01 pedestal fan | `CX3550` |
| CX7550/01 tower fan | `CX7550` |
| Anything else, or if you are unsure | `Generic` |

The classic purifiers all report the same plain keys (`pwr`, `om`, `mode` and so on), which is why one entry covers the whole family. Confirmed on real hardware so far: AC2729, AC2889, AC3221, AC3829, CX3550/01 and CX7550/01.

If you are unsure, connect with `Generic` first and look at the raw keys under `unknownStates`: plain names such as `pwr` or `pm25` mean a classic device, keys such as `D03102` mean a next-generation device. If your device turns out to be a next-generation model that is not in the list, please open an issue with a debug log - that is how the CX7550/01 and the AC3221 were added.

![Objects](img/objects.png)

## Philips/Versuni CX3550/01 fan
The CX3550/01 is supported through the local encrypted CoAP connection. No Philips, Versuni or HomeID cloud API is used.

Tested CX3550/01 functions:

- Power on/off
- Fan speed 1, 2 and 3
- Sleep mode
- Natural breeze
- Oscillation on/off
- Beep on/off
- Status reading via local CoAP
- Timer status reading

Timer control is intentionally not supported for the CX3550/01. Local timer write payloads can make the firmware set `D03102` to `0`, which switches the fan off. The adapter therefore exposes CX3550/01 timer information only as read-only status.

More details are documented in [docs/CX3550.md](docs/CX3550.md).

## Philips/Versuni CX7550/01 tower fan
The CX7550/01 ("Smart Tower Fan 7000 series") uses the same local encrypted CoAP connection, but different raw values than the CX3550/01 - select `CX7550` as the device model.

Tested CX7550/01 functions:

- Power on/off
- Fan speeds 1 to 12 and AutoAdapt
- Sleep mode
- Natural breeze
- Oscillation on/off
- Timer (off, 1 to 12 hours) - writable on this model
- Beep on/off
- Display brightness, temperature colour display and what the display shows permanently
- Room temperature

More details are documented in [docs/CX7550.md](docs/CX7550.md).

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.1.0 (2026-08-29)

- (tt-tom17) Fixed error messages ("DB closed", "setTimeout called, but adapter is shutting down") that appeared in the log every time the adapter was stopped or restarted (MatthiasBosch)
- (tt-tom17) New setting "Log unknown device attributes as debug": moves the "Unknown raw device attribute" messages from the info log to the debug log (off by default)
- (tt-tom17) Fixed devices connected via CoAP reconnecting every few minutes, and the log filling with "connection lost / connected" pairs, although the connection was fine - this affected quiet devices such as the CX7550/01 (DrBakterius)
- (tt-tom17) A device that stays unreachable is now retried at growing intervals instead of every 30 seconds, and stops repeating the same error line in the log
- (tt-tom17) No longer suggests switching to CoAP when an HTTP device that was working loses its connection - the hint now only appears while HTTP has never worked (tukey42)

### 2.0.0 (2026-08-23)

- (tt-tom17) New "Device model" setting: pick your model so the adapter shows the correct controls for your device
- (tt-tom17) Added support for the AC3221 next-generation purifier (MatthiasBosch)
- (tt-tom17) Added support for the CX7550/01 tower fan (DrBakterius)
- (tt-tom17) The adapter now warns in the log when the selected model does not seem to match the connected device
- (tt-tom17) Values the adapter does not recognise are collected under "unknownStates"
- (tt-tom17) IMPORTANT: all state IDs starting with "cx" were renamed to generic names (for example "fanMode" instead of "cxFanMode"). Please select your device model once in the settings; the old "cx*" objects can be deleted manually
- (tt-tom17) Fixed switches that did nothing when a script or visualisation wrote them as the text "true"/"false" instead of a real on/off value
- (tt-tom17) Fixed devices connected via HTTP logging "Cannot parse: undefined" every time a command was sent; the device answer is now read correctly
- (tt-tom17) Fixed devices using the HTTP protocol (for example the AC3829 and AC2729) that stopped connecting in version 1.4.0 and only logged "fetch failed (UND_ERR_SOCKET)"; requests are sent the way these devices expect again

### 1.6.1 (2026-07-03)
- (Holly86) Added support for Philips/Versuni CX3550/01 pedestal fan.
- (Holly86) Added CX fan modes, oscillation, beep and read-only timer state.
- (Holly86) Timer control is intentionally not exposed because local timer writes can switch the fan off.

### 1.5.0 (2026-06-24)
- (tt-tom17) CoAP connection now stays stable instead of disconnecting every few minutes
- (tt-tom17) Fixed adapter checker warnings

### 1.4.0 (2026-06-17)
- (tt-tom17) Connection to CoAP and HTTP devices is much more reliable now: several cases that could crash the adapter, freeze the connection or stop it from reconnecting have been fixed
- (tt-tom17) Air quality, filter and on/off values are now shown with the correct type and update reliably
- (tt-tom17) Clearer log messages, including a hint to switch to CoAP when a device does not answer on HTTP
- (tt-tom17) HTTP mode no longer needs the extra "philips-air" package and its outdated dependencies
- (tt-tom17) The device address field now accepts an IP address or a hostname and warns about invalid input
- (tt-tom17) Dependencies updated

### 1.3.0 (2026-06-15)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Dependencies have been updated

  
[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2022 ioBroker <dogafox@gmail.com>

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
