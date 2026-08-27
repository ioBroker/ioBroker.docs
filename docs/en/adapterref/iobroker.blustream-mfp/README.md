# ioBroker.blustream-mfp

[![NPM version](https://img.shields.io/npm/v/iobroker.blustream-mfp.svg)](https://www.npmjs.com/package/iobroker.blustream-mfp)
[![Downloads](https://img.shields.io/npm/dm/iobroker.blustream-mfp.svg)](https://www.npmjs.com/package/iobroker.blustream-mfp)
![Number of Installations](https://iobroker.live/badges/blustream-mfp-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/blustream-mfp-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.blustream-mfp.png?downloads=true)](https://nodei.co/npm/iobroker.blustream-mfp/)

**Tests:** ![Test and Release](https://github.com/AlanSRU/ioBroker.blustream-mfp/workflows/Test%20and%20Release/badge.svg)

## Blustream AV Switcher adapter for ioBroker

Control Blustream AMF/MFP/WMF series AV presentation switchers via RS232 serial or IP/Telnet connection.

### Supported Devices

| Model | Description | Connection |
|-------|-------------|------------|
| **AMF42AU** | 4x2 Advanced Multi-Format Switcher | IP (Telnet) |
| **MFP62** | 6x2 4K Multi-Format Presentation Switcher | IP (Telnet) |
| **MFP72** | 4x2 Multi-Format Presentation Switcher | RS232 / IP |
| **MFP112** | 5x2 Multi-Format Presentation Switcher with HDBaseT | IP (Telnet) |
| **WMF51** | Wireless Media Presenter | IP (Telnet) |
| **WMF72** | Wireless Media Presenter with Dual Display | IP (Telnet) |
| **C66 / C88** | 6x6 / 8x8 Contractor HDBaseT Matrix | RS232 / IP |

**Expanded range (v0.5.3) — routing, output enable, PoC and presets:**

| Family | Models | Type |
|--------|--------|------|
| Contractor C (CSC) | C44-KIT, C44CS-KIT, C66CS, C88CS | HDBaseT matrix |
| HMXL | HMXL42ARC, HMXL44CS, HMXL44ARC, HMXL66ARC, HMXL88ARC, HMXL88-V2 | HDBaseT matrix |
| HMX 18G | HMX44-18G-KIT, HMX88-18G | HDBaseT 3.0 matrix |
| Platinum (PLA) | PLA88CS, PLA88ARC-V2, PLA88L-V2 | HDBaseT matrix |
| Pro / Custom-Pro | PRO48HBT70(CS), PRO88HBT70CS, PRO88HDMI-V2, PRO16HBT70CS, CUSTOMPRO-HUB, CUSTOMPRO-HUB16 | HDBaseT matrix (up to 16x16 / modular) |
| CMX (HDMI) | CMX42CS, CMX44CS-V2, CMX44AB, CMX88CS, CMX88AB | HDMI matrix |
| MX (HDMI) | MX22AB-8K, MX44AB-V2 | HDMI matrix |
| SW switchers | SW41HDBT, SW41AB-V2, SW41AB-8K, SW42DA, SW21AB-V2, SW21AB-V3 | HDMI / HDBaseT switch |
| Video wall / Multi-view | MX44VW, MX44AVW, MV41 | mode/routing/bezel/MV-audio + HDMI/VGA input select |
| USB / KVM | MX44KVM | USB host↔device routing + presets |

These families also gain **EDID management** (all matrices), **CEC control** (HMX-18G, SW41HDBT) and **audio** (HMX-18G audio matrix; Pro-Matrix audio embed/mute). CMX/MX audio follows the video output (no separate control). **STATUS feedback (read-back) is parsed** for every fixed-width family — routing, output enable, PoC, CEC, EDID, audio matrix, network, video-wall mode and SW42DA Dante master audio — grounded against real device captures. The MX44KVM has its own reply format, of which host routing, GPIO modes and USB cascade are read back (its network table is not). The only exception is **MV41**, whose STATUS headers have no column separators. Not yet supported: **AMF41W** (distinct Linux-CLI API), **MFP31** and **SW12USB** (docs not sourced); MX44AVW advanced PIP/rotation and MV41 are provisional. See `MODEL-EXPANSION-PLAN.md`.

For more information about Blustream products, visit [Blustream](https://www.blustream.co.uk/).

## Installation

Install the adapter from the ioBroker admin interface (Adapters → search for "blustream").

## Configuration

### Connection Settings

The adapter supports two connection types:

#### IP Connection (Telnet)
- **IP Address**: The IP address of your Blustream device
- **Port**: TCP port (default: 23 for Telnet)
- **Telnet IAC Negotiation**: Enable if your device uses Telnet protocol negotiation

#### RS232 Serial Connection
- **Serial Port**: Path to serial device (e.g., `/dev/ttyUSB0` on Linux, `COM3` on Windows)
- **Baud Rate**: Serial communication speed (typically 57600 for MFP series)

### Device Model

Select your specific Blustream device model from the dropdown. The adapter will automatically configure the available states and controls based on the selected model's capabilities.

### Polling

- **Polling Interval**: How often to query the device for status updates (in milliseconds, default: 30000)
- **Reconnect Interval**: Time between reconnection attempts if connection is lost (in milliseconds, default: 10000)

## States and Controls

The adapter creates states dynamically based on the selected device model. Common states include:

### Information (`info.*`)
- `info.connection` - Device connection status
- `info.model` - Device model identifier

### Commands (`commands.*`)
- `commands.raw` - Send raw commands to the device
- `commands.getStatus` - Request current device status

### Output Control (`output.*`)
- `output.X.source` - Select input source for output X
- `output.X.enabled` - Enable/disable output X
- `output.X.videoMute` - Blank the video on output X

### Audio (`audio.*`)
- `audio.volume` - Master volume level
- `audio.mute` - Master mute

### System Control (`system.*`)
- `system.power` - Power on/off
- `system.beep` - Enable/disable button beep
- And more depending on device model...

### Network Settings (`network.*`)
- `network.dhcp` - DHCP enable/disable
- `network.ip` - Device IP address
- `network.gateway` - Gateway address
- `network.subnet` - Subnet mask

## Features by Model

| Feature | AMF42AU | MFP62 | MFP72 | MFP112 | WMF51 | WMF72 | C66 | C88 |
|---------|---------|-------|-------|--------|-------|-------|-----|-----|
| Network Control | Yes | Yes | - | Yes | Yes | Yes | Yes | Yes |
| RS232 Control | - | - | Yes | - | - | - | Yes | Yes |
| Matrix Routing | - | - | - | - | - | - | Yes | Yes |
| CEC Control | Yes | - | - | - | - | - | - | - |
| Microphone | Yes | Yes | - | - | - | - | - | - |
| Presets | Yes | - | - | - | - | - | Yes | Yes |
| Picture Control | Yes | - | - | - | - | - | - | - |
| WiFi Control | - | - | - | - | Yes | Yes | - | - |
| Multiview | - | - | - | - | Yes | Yes | - | - |
| HDBaseT | - | - | - | Yes | - | - | Yes | Yes |
| PoC (per output) | - | - | - | - | - | - | Yes | Yes |

## Troubleshooting

### Connection Issues

1. **IP Connection fails**: Verify the IP address and port. Ensure no firewall is blocking the connection. Try disabling Telnet IAC negotiation if your device doesn't support it.

2. **RS232 Connection fails**: Check the serial port path and baud rate. Ensure you have permissions to access the serial port (on Linux, add your user to the `dialout` group).

3. **Commands not working**: Some devices require a brief delay between commands. The adapter handles this automatically with a command queue.

### Debug Mode

Enable debug logging in the ioBroker admin to see detailed communication with the device:

1. Go to Instances
2. Click the adapter instance
3. Set log level to "debug"

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 0.5.3 (2026-08-03)
* (Alan Paris) Added support for 39 further Blustream models, taking the total to 47: the HDBaseT matrices (C-series and C-CS, HMXL, HMX-18G, PLA/Platinum, Pro and Custom-Pro, up to 16x16), the HDMI matrices (CMX/MX), the SW-series HDMI and HDBaseT switchers, the video-wall and multi-view processors (MX44VW, MX44AVW, MV41) and the MX44KVM USB/KVM matrix
* (Alan Paris) Routing, output enable, PoC and preset recall now follow each model's own command form, so the differing firmware families (spaced `OUT 01 FR 04` versus `OUT01FR04`, the three PoC verbs, single-output switches without an output index) are each addressed correctly
* (Alan Paris) Added per-input EDID management on all matrices, CEC actions on the HMX-18G and SW41HDBT, the HMX-18G audio matrix, Pro-Matrix audio embedding, video-wall mode and bezel compensation, and USB routing on the MX44KVM
* (Alan Paris) Device status read-back is now parsed per model family from the fixed-width STATUS/INSTA/OUTSTA/CTRLSTA/AUDSTA tables, matching columns by header name so power, routing, output enable, PoC, CEC, EDID, audio, network and video-wall values are reflected in the states. Unrecognised tables are ignored rather than guessed at
* (Alan Paris) Added the device command references and the captured status replies used to build the parser under `protocols/`, plus unit tests that replay every capture
* (Alan Paris) Pre-release review fixes: EDID commands now use each model's own spacing (the CMX/MX matrices document only the unspaced form); command confirmations naming an output the model does not have no longer create a stray state; status replies whose divider is prefixed by the device prompt (MX44VW/MX44AVW) no longer stall the command queue or grow the captured-response buffer without limit; a status column reported as `N/A` now leaves its state untouched instead of writing "off"; and stopping the instance no longer schedules a reconnect after shutdown

### 0.5.2 (2026-08-03)
* (Alan Paris) Fixed the state tree keeping the previous model's controls after the device model was changed: the internal model-change check compared the model against a value the adapter had just overwritten, so the cleanup never ran. An MFP112 configured after the default MFP72, for example, was left without the HDBaseT input on `output.N.source`
* (Alan Paris) Existing instances repair themselves on first start after the update: a new `info.stateSchema` state records the layout version of the state tree, and the tree is rebuilt once when it is out of date. State values are repopulated by the next device poll. Note that the rebuild recreates the objects, so any per-state history/logging settings on the adapter's states have to be reapplied
* (Alan Paris) The WiFi password is no longer stored in clear text in `info.lastSent` or written to the debug log when it is set
* (Alan Paris) Device responses reporting an output number the configured model does not have (including an echo of the route-all command) no longer create a stray output state
* (Alan Paris) Corrected the documented state list and the per-model feature table in the README, and added the missing `system` parent object

### 0.5.1 (2026-07-16)
* (Alan Paris) Every state object now defines a default (`def`) value, so states have a defined initial value before the first device poll
* (Alan Paris) Admin config: all device-model descriptions and option labels are now translatable and provided in all 11 ioBroker languages

### 0.5.0 (2026-07-16)
* (Alan Paris) Added support for the Blustream C66 (6x6) and C88 (8x8) Contractor HDBaseT matrices: crosspoint routing across up to 8 outputs, route-all (`output.allSource`), per-output enable, per-output PoC, and 9 presets
* (Alan Paris) Added a dedicated parser for the C66/C88 fixed-width STATUS/OUTSTA tables and the `[SUCCESS]`/`[FAIL]` command confirmations, so routing, enable, PoC and network states reflect the device
* (Alan Paris) Scaler, resolution and audio states are no longer created for the C66/C88 crosspoint matrices (they have no scaler/audio path), so the object tree only exposes controls the device actually implements
* (Alan Paris) Added `protocols/c66.txt` documenting the C66/C88 RS-232 / Telnet command set (verified against FW V1.0.1d)

### 0.4.2 (2026-07-04)
* (Alan Paris) WiFi password state is now write-only (`read: false`) so the value cannot be read back from the object tree once set
* (Alan Paris) Removed the accidentally committed npm pack artifact (`.tgz`) from the repository

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Alan Paris <alan.paris@scottish.rugby>

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
