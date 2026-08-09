![Logo](admin/iiyama-prolite.png)
# ioBroker.iiyama-prolite

[![NPM version](https://img.shields.io/npm/v/iobroker.iiyama-prolite.svg)](https://www.npmjs.com/package/iobroker.iiyama-prolite)
[![Downloads](https://img.shields.io/npm/dm/iobroker.iiyama-prolite.svg)](https://www.npmjs.com/package/iobroker.iiyama-prolite)
![Number of Installations](https://iobroker.live/badges/iiyama-prolite-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/iiyama-prolite-stable.svg)

**Tests:** ![Test and Release](https://github.com/AlanSRU/ioBroker.iiyama-prolite/workflows/Test%20and%20Release/badge.svg)

## iiyama adapter for ioBroker

Control [iiyama ProLite](https://iiyama.com/gl_en/products/) professional displays via RS232 serial or TCP/IP (LAN) connection using the official iiyama communication protocol. iiyama is a display manufacturer — see [iiyama.com](https://iiyama.com/).

## Features

- **Dual Connection Support**: Control displays via RS232 serial port or TCP/IP network connection
- **Comprehensive Control**: Power, input source, volume, video and audio parameters
- **Real-time Monitoring**: Automatic polling of display status with configurable intervals
- **Multiple Display Models**: Supports ProLite LH series displays (see compatibility list)
- **Command Queuing**: Sequential command execution prevents communication errors

## Supported Display Models

- ProLite LH3252HS-B1
- ProLite LH4352UHS-B1
- ProLite LH5052UHS-B1
- ProLite LH5552UHS-B1
- ProLite LH6552UHS-B1
- ProLite LH9852UHS-B2
- ProLite LH4342UHS-B1/B3
- ProLite LH5042UHS-B1/B3
- ProLite LH5542UHS-B1/B3
- ProLite LH6542UHS-B1/B3
- ProLite LH7542UHS-B1/B3
- ProLite LH8642UHS-B1/B3

## Installation

1. Install the adapter from the ioBroker adapter repository
2. Configure the connection settings in the adapter configuration

## Configuration

### Connection Settings

**Connection Type**: Choose between TCP/IP (LAN) or Serial (RS232)

#### TCP/IP Connection
- **IP Address**: The IP address of the display
- **TCP Port**: Usually 5000 (default for iiyama displays)

#### Serial Connection
- **Serial Port**: Path to the serial device (e.g., `/dev/ttyUSB0` on Linux or `COM1` on Windows)
- **Baud Rate**:
  - 9600 for most models
  - 115200 for LHxx42UHS-B1 series only

### Display Settings

- **Monitor ID**: The ID configured on the display (1-255). Default is 1.
- **Poll Interval**: How often to update the display status (5-300 seconds). Default is 30 seconds.
- **Power Save Mode**: The power saving mode configured on your display (1-4). This affects how the display can be controlled when powered off:
  - **Mode 1**: WOL Off, source input wake off, backlight off
    - TCP connection drops when display is off
    - Cannot wake via network (WOL disabled)
    - Must use IR remote or front panel button to wake
  - **Mode 2**: WOL Off, source input wake on, backlight off
    - TCP connection drops when display is off
    - Cannot wake via network (WOL disabled)
    - Can wake automatically when HDMI source signal detected
  - **Mode 3**: WOL On, source input wake off
    - Can wake via Wake-on-LAN (requires MAC address configuration)
    - The adapter sends a WOL magic packet, then the power-on command
  - **Mode 4**: WOL On, source input wake on (**recommended for network control**)
    - Can wake via Wake-on-LAN (requires MAC address configuration)
    - The adapter sends a WOL magic packet, then the power-on command
    - Can also wake automatically when an HDMI source signal is detected
- **MAC Address** (required for Mode 3 and Mode 4): The MAC address of the display's network interface, used for Wake-on-LAN
- **WOL Broadcast Address** (optional): Subnet broadcast address for the WOL packet. If empty, it is derived from the host IP (e.g. `192.168.1.100` → `192.168.1.255`).

## Usage

### Available States

#### Power Control
- `power` - Turn display on/off (boolean)

#### Input Sources
- `inputSource` - Select input source:
  - HDMI, HDMI 2, HDMI 3, HDMI 4
  - DVI-D
  - DisplayPort, DisplayPort 2
  - VGA
  - USB, USB 2

#### Volume
- `volume.main` - Main speaker volume (0-100%)
- `volume.audioOut` - Audio output volume (0-100%)

#### Video Settings
- `video.brightness` - Brightness (0-100%)
- `video.contrast` - Contrast (0-100%)
- `video.color` - Color saturation (0-100%)
- `video.sharpness` - Sharpness (0-100%)
- `video.tint` - Tint/Hue (0-100%)
- `video.blackLevel` - Black level (0-100%)
- `video.gamma` - Gamma curve selection
- `video.colorTemperature` - Color temperature preset
- `video.pictureFormat` - Picture format/aspect ratio

#### Audio Settings
- `audio.treble` - Treble level (0-100)
- `audio.bass` - Bass level (0-100)

#### Information (Read-only)
- `info.connection` - Connection status
- `info.standby` - Display is in standby / unreachable while the adapter keeps running
- `info.operatingHours` - Total operating hours
- `info.serialCode` - Display serial number

#### Commands
- `commands.autoAdjust` - Trigger VGA auto-adjust (write `true`)

### Example Usage in Blockly/JavaScript

```javascript
// Turn display on
setState('iiyama-prolite.0.power', true);

// Switch to HDMI input
setState('iiyama-prolite.0.inputSource', 13); // 13 = HDMI

// Set volume to 50%
setState('iiyama-prolite.0.volume.main', 50);
setState('iiyama-prolite.0.volume.audioOut', 50);

// Adjust brightness
setState('iiyama-prolite.0.video.brightness', 75);
```

## Technical Details

### Protocol Implementation

This adapter implements the iiyama RS232 Serial Interface Communication Protocol as documented in the official Application Note. The protocol uses:

- **Packet Format**: Header (0xA6), Monitor ID, Category, Page, Function Code, Length, Data Control, Data, Checksum
- **Checksum**: XOR of all bytes except checksum
- **Response Timeout**: 5000ms
- **Command Delay**: 100ms between commands to prevent buffer overflow

### Connection Management

- **Automatic Reconnection**: Up to 10 attempts with 5-second delays
- **Command Queuing**: Ensures commands are sent sequentially
- **Status Polling**: Regular updates of all display parameters

## Troubleshooting

### Display Not Responding

1. **Check physical connection**: Ensure cable is properly connected
2. **Verify IP address/port** (TCP) or **serial port** (RS232)
3. **Check Monitor ID**: Must match the ID configured on the display
4. **Serial connection issues**:
   - Verify baud rate (9600 or 115200 for B1 series)
   - Check serial port permissions on Linux: `sudo usermod -a -G dialout iobroker`
5. **TCP connection issues**:
   - For network power control, configure display to Power Save Mode 3 or Mode 4
   - Mode 1 or 2: TCP connection drops when display is off - cannot wake via network
   - Mode 3: Requires Wake-on-LAN - configure MAC address in adapter settings
   - Mode 4: Recommended - TCP stays active, power commands work directly
   - Check firewall settings

### Commands Not Working

- **Wait for responses**: The protocol requires waiting for acknowledgment between commands
- **Check OSD menu**: Only commands available in the display's OSD menu are guaranteed to work
- **Polling too frequent**: Increase poll interval if experiencing communication errors

## Disclaimer

iiyama and ProLite are trademarks of their respective owners. This adapter is a
community project and is not affiliated with, endorsed by, or supported by iiyama.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 0.1.4 (2026-07-16)
* (Alan Paris) Removed the manufacturer protocol PDF from the repository and its git history
* (Alan Paris) Added a 10 s TCP connection timeout so an unreachable display no longer hangs the connect
* (Alan Paris) Redacted MAC addresses in log output (only the last three octets are shown)
* (Alan Paris) Changed the brightness state role to `level.dimmer`
* (Alan Paris) Poll cycles are now skipped while the previous cycle is still processing, preventing command-queue backlog
* (Alan Paris) Documented reserved protocol command/input-source codes that are not yet exposed as states

### 0.1.3 (2026-07-06)
* (Alan Paris) Updated serialport dependency to 13.0.0

### 0.1.2 (2026-07-06)
* (Alan Paris) Create channel objects for info/volume/video/audio/commands so every state has an intermediate parent object (fixes repochecker E3009)

### 0.1.1 (2026-07-05)
* (Alan Paris) Enabled automated npm publishing via GitHub Actions trusted publishing (OIDC)

### 0.1.0 (2026-07-05)
* (Alan Paris) Initial release: TCP/IP and serial (RS232) control of iiyama ProLite displays
* (Alan Paris) Power, input source, volume, video and audio control with status polling
* (Alan Paris) Wake-on-LAN support for Power Save Modes 3 and 4, with subnet-broadcast derivation
* (Alan Paris) Automatic reconnection with slow standby polling to recover when a display is powered on

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