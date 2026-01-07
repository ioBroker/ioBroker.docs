# ioBroker.elero-usb-transmitter

![Logo](admin/elero-usb-transmitter.png)

[![NPM version](http://img.shields.io/npm/v/iobroker.elero-usb-transmitter.svg)](https://www.npmjs.com/package/iobroker.elero-usb-transmitter)
[![Downloads](https://img.shields.io/npm/dm/iobroker.elero-usb-transmitter.svg)](https://www.npmjs.com/package/iobroker.elero-usb-transmitter)
![Number of Installations (latest)](http://iobroker.live/badges/elero-usb-transmitter-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/elero-usb-transmitter-stable.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/marc2016/ioBroker.elero-usb-transmitter/badge.svg)](https://snyk.io/test/github/marc2016/ioBroker.elero-usb-transmitter)

[![NPM](https://nodei.co/npm/iobroker.elero-usb-transmitter.png?downloads=true)](https://nodei.co/npm/iobroker.elero-usb-transmitter/)

## elero-usb-transmitter adapter for ioBroker

Adapter to control Elero devices with the Elero USB Transmitter Stick.
You need the usb transmitter stick and have to connect the existing roller shutter motors to the stick. The adapter automatically detects the active channels and adds the devices. In the settings you can set the names for the devices and the interval for the update.

## Configuration

1.  **USB Stick Device Path**: Path to your USB transmitter stick (e.g., `/dev/ttyUSB0` or `COM3`).
2.  **Refresh Interval**: Time in minutes to refresh the device status.
3.  **Device Configs**: You can map channel numbers to custom names in the adapter settings.

## Usage

The adapter creates a device for each active channel found on the stick. Each device contains the following states:

| State | Role | Description |
| :--- | :--- | :--- |
| `channel` | text | The channel number of the device. |
| `info` | text | Current status information returned by the stick. |
| `open` | switch | Main control. Set to `true` to OPEN (UP), `false` to CLOSE (DOWN). |
| `controlCommand` | state | Send specific commands directly. |

### Control Commands

You can write the following values to the `controlCommand` state:

*   `16`: STOP
*   `32`: UP
*   `36`: Ventilation/Tilt
*   `64`: DOWN
*   `68`: Intermediate Position

### Easy Commands

*   `74`: EASY_CHECK
*   `75`: EASY_CONFIRM
*   `76`: EASY_SEND
*   `77`: EASY_ACK
*   `78`: EASY_INFO

### Status Values

The `info` state displays the current status of the device. Common values include:

| Value | Description |
| :--- | :--- |
| `INFO_UNKNOWN` | Unknown status (-1). |
| `INFO_NO_INFORMATION` | No information available (0). |
| `INFO_TOP_POSITION_STOP` | Stopped at top position (1). |
| `INFO_BOTTOM_POSITION_STOP` | Stopped at bottom position (2). |
| `INFO_INTERMEDIATE_POSITION_STOP` | Stopped at intermediate position (3). |
| `INFO_TILT_VENTILATION_POS_STOP` | Stopped at tilt/ventilation position (4). |
| `INFO_BLOCKING` | Blocking detected (5). |
| `INFO_OVERHEATED` | Motor overheaded (6). |
| `INFO_TIMEOUT` | Timeout (7). |
| `INFO_START_TO_MOVE_UP` | Starting to move up (8). |
| `INFO_START_TO_MOVE_DOWN` | Starting to move down (9). |
| `INFO_MOVING_UP` | Moving up (10). |
| `INFO_MOVING_DOWN` | Moving down (11). |
| `INFO_STOPPED_IN_UNDEFINED_POSITION` | Stopped in undefined position (13). |
| `INFO_TOP_POS_STOP_WICH_TILT_POS` | Top position stop with tilt position (14). |
| `INFO_BOTTOM_POS_STOP_WICH_INT_POS` | Bottom position stop with intermediate position (15). |
| `INFO_SWITCHING_DEVICE_SWITCHED_OFF` | Switching device off (16). |
| `INFO_SWITCHING_DEVICE_SWITCHED_ON` | Switching device on (17). |


## Examples

### Javascript / Blockly

To open a shutter (Channel 1):

```javascript
setState('elero-usb-transmitter.0.channel_1.open', true); // Moves UP
```

To stop a moving shutter:

```javascript
setState('elero-usb-transmitter.0.channel_1.controlCommand', 16); // STOP command
```

## Changelog
### 1.0.5 (2025-12-31)

-   Fixed reliability issue with fast polling (burst mode)

### 1.0.4 (2025-12-30)

-   Adjusted release configuration
-   Implemented fast polling after command execution

### 1.0.3 (2025-12-30)

- Release script configuration improved (added missing plugins)
- Bug fix: Status update handling (async + validation)
- Improvement: Connection retry logic implemented
- Improvement: All tests converted to TypeScript

### 1.0.2 (2025-12-24)

- Replaced deprecated createState/createDevice methods with setObjectNotExistsAsync

### 1.0.1 (2025-12-24)

- Dependencies updated

### 1.0.0 (2025-12-23)

- Refactor main.ts (split into smaller modules)
- Cleanup unused code (src/lib/tools.ts)
- Admin UI migrated to jsonConfig
- Dependencies updated
- ESLint migrated to v9
- Tests validation improved
- Bug fix: Async iteration in device refresh
- TypeScript configuration updated

### 0.5.2

- Missing translation for title and description added

### 0.5.1

- Translation added

### 0.5.0

- Translations added
- Ignore state changes with ack=true in onStateChanged handler
- messages handler removed
- node-scheduler package removed

### 0.4.0

- Added channel for connection info.

### 0.3.0

- Use only open state to controle devices.

### 0.1.0

- Transmission time removed and code clean up.

### 0.0.3"

- Log messages added.

### 0.0.2

- bug fixes

### 0.0.1

- initial release

## License

MIT License

Copyright (c) 2025-2026 marc <marc@lammers.dev>

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
