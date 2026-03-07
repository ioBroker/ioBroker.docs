![Logo](admin/wled_logo_akemi.png)
# ioBroker.wled

[![NPM version](https://img.shields.io/npm/v/iobroker.wled.svg)](https://www.npmjs.com/package/iobroker.wled)
[![Downloads](https://img.shields.io/npm/dm/iobroker.wled.svg)](https://www.npmjs.com/package/iobroker.wled)
![Number of Installations](https://iobroker.live/badges/wled-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/wled-stable.svg)
[![Dependency Status](https://img.shields.io/david/DrozmotiX/iobroker.wled.svg)](https://david-dm.org/DrozmotiX/iobroker.wled)

[![NPM](https://nodei.co/npm/iobroker.wled.png?downloads=true)](https://nodei.co/npm/iobroker.wled/)

**Tests:** ![Test and Release](https://github.com/DrozmotiX/iobroker.wled/workflows/Test%20and%20Release/badge.svg)

**This adapter uses the service [Sentry.io](https://sentry.io) to automatically report exceptions and code errors and new device schemas to me as the developer.** More details see below!

## wled adapter for ioBroker

A fast and feature-rich implementation of an ESP8266/ESP32 webserver to control NeoPixel (WS2812B, WS2811, SK6812, APA102)LEDs or also SPI based chipsets like the WS2801!

[WLED - Github Project](https://github.com/Aircoookie/WLED) by @Aircoookie

## Instructions

The adapter automatically try's to find WLED devices in your network using Bonjour services.  
Known issues : Networks with VLAN separation mostly don't route broadcast traffic, meaning autodetect will fail.  

Don't worry, in that case you can add the device manually by IP-Address.

1) Ensure your WLED device is running and reachable by network
2) Install the adapter
3) Configure interval times for data polling and auto-detect cycles  
4 - A) Start the adapter, devices should be detected automatically  
4 - B) If A fails, use the Add-Device button and provide the device IP-Address  
5) Adapter will send changes immediately and polls data every x seconds (configurable)

## Features

### Control Methods
The adapter provides multiple ways to control your WLED devices:

1. **Standard States** - Use individual states for brightness, color, effects, etc.
2. **JSON Commands** - Send complete JSON commands via the `action` state for advanced control
3. **Raw HTTP API Commands** - Send legacy HTTP API commands via the `rawCommand` state

### Using Raw HTTP API Commands
For advanced users who need to send raw HTTP API commands (legacy `/win` endpoint), you can use the `rawCommand` state:

```javascript
// Example: Set brightness to 255, effect to 0, and colors
setState('wled.0.XXXXXXXXXXXX.rawCommand', 'A=255&FX=0&R=255&G=0&B=0');

// Example: Complex command with multiple parameters
setState('wled.0.XXXXXXXXXXXX.rawCommand', 'SM=0&SS=0&SV=2&S=15&S2=299&GP=7&SP=30&RV=0&SB=255&A=255&W=255&R2=0&G2=0&B2=0&W2=&FX=0&T=1');
```

**Note:** The `rawCommand` state is intended for advanced use cases and compatibility with legacy WLED HTTP API. For most use cases, the standard states or JSON commands (via `action` state) are recommended.

Common raw command parameters:
- `A` - Master brightness (0-255)
- `R`, `G`, `B` - Primary color RGB values (0-255)
- `R2`, `G2`, `B2` - Secondary color RGB values (0-255)
- `W`, `W2` - White channel values (0-255)
- `FX` - Effect ID
- `SX` - Effect speed
- `IX` - Effect intensity
- `FP` - Palette ID
- `T` - Transition time

For a complete list of parameters, refer to the [WLED HTTP API documentation](https://kno.wled.ge/interfaces/http-api/).

### Segment Management via sendTo
The adapter provides powerful segment management capabilities through `sendTo` commands, allowing you to dynamically add and delete segments from your JavaScript code:

#### Adding Segments
```javascript
// Add a new segment to a WLED device
sendTo('wled.0', 'addSegment', {
    deviceId: 'AABBCCDDEEFF',  // Device MAC address
    segmentId: 1,              // Segment ID (0-based)
    start: 0,                  // Start LED
    stop: 10,                  // Stop LED (exclusive)
    on: true,                  // Optional: Turn segment on/off
    bri: 255,                  // Optional: Brightness (0-255)
    fx: 0,                     // Optional: Effect ID
    sx: 128,                   // Optional: Effect speed
    ix: 128,                   // Optional: Effect intensity
    pal: 0,                    // Optional: Color palette
    col: [[255,0,0],[0,255,0],[0,0,255]]  // Optional: Colors (RGB arrays)
}, (result) => {
    if (result.success) {
        console.log('Segment added successfully: ' + result.message);
    } else {
        console.error('Failed to add segment: ' + result.error);
    }
});
```

#### Deleting Segments
```javascript
// Delete a segment from a WLED device
sendTo('wled.0', 'deleteSegment', {
    deviceId: 'AABBCCDDEEFF',  // Device MAC address
    segmentId: 1               // Segment ID to delete
}, (result) => {
    if (result.success) {
        console.log('Segment deleted successfully: ' + result.message);
    } else {
        console.error('Failed to delete segment: ' + result.error);
    }
});
```

**Parameters:**
- `deviceId` (required): The MAC address of your WLED device (e.g., 'AABBCCDDEEFF')
- `segmentId` (required): The segment ID (0-based numbering)
- For `addSegment`:
  - `start` (optional): First LED in segment, defaults to 0
  - `stop` (optional): Last LED in segment (exclusive), defaults to 1
  - `on` (optional): Turn segment on/off
  - `bri` (optional): Brightness (0-255)
  - `fx` (optional): Effect ID
  - `sx` (optional): Effect speed (0-255)
  - `ix` (optional): Effect intensity (0-255)
  - `pal` (optional): Color palette ID
  - `col` (optional): Array of RGB color arrays

**Note:** The adapter automatically handles communication via WebSocket (if available) or HTTP API, and refreshes the device state after segment operations.

## Support me
If you like my work, please feel free to provide a personal donation  
(this is a personal Donate link for DutchmanNL, no relation to the ioBroker Project !)  
[![Donate](https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/main/admin/button.png)](http://paypal.me/DutchmanNL)

## What is Sentry.io and what is reported to the servers of that company?
Sentry.io is a service for developers to get an overview about errors from their applications. And exactly this is implemented in this adapter.

When the adapter crashes or another Code error happens, this error message that also appears in the ioBroker log is submitted to Sentry. When you allowed iobroker GmbH to collect diagnostic data then also your installation ID (this is just a unique ID **without** any additional infos about you, email, name or such) is included. This allows Sentry to group errors and show how many unique users are affected by such an error. All of this helps me to provide error free adapters that basically never crashs.  

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (DutchmanNL) **CI/CD**: Fixed deployment failure by adding missing sentry-version-prefix parameter to GitHub Actions workflow
* (DutchmanNL) **CI/CD**: Updated GitHub Copilot instructions template from v0.4.2 to v0.5.6 - adds ESLint configuration, translation management, lint-first CI/CD workflow guidance

### 0.9.2 (2026-02-16)
* (DutchmanNL) solve auto deployment issues

### 0.9.0 (2026-02-15)
* (DutchmanNL) **NEW**: Added segment management via sendTo commands - dynamically add and delete WLED segments
* (DutchmanNL) **NEW**: Added Hue Sync control - synchronize WLED colors with Philips Hue lights (hp state: 0-99, 0=off)
* (DutchmanNL) **NEW**: Added Reboot control - restart WLED device remotely (rb state: boolean button)
* (DutchmanNL) **NEW**: Added Realtime UDP control - toggle reception of realtime UDP data (rd state: boolean switch)
* (DutchmanNL) **NEW**: Added support for sending raw HTTP API commands via `rawCommand` state (fixes #677)
* (DutchmanNL) **FIXED**: Corrected online/offline state detection - `_online` state now properly contains boolean values resolves #654
* (DutchmanNL) **FIXED**: Ensure backend processes and stop when device is deleted in ioBroker object tree (fixes #615)
* (DutchmanNL) **ENHANCED**: Reduced code complexity by extracting validation helpers to separate module (lib/validation.js) #777
* (DutchmanNL) **TESTING**: Added comprehensive unit tests for validation helpers (49 test cases covering edge cases and error handling)
* (DutchmanNL) **CI/CD**: Fixed automated deployment failure by removing unused build step for JavaScript-only adapter

### 0.8.0 (2026-02-15)
* (ticaki) allow sending of raw json from state
* (DutchmanNL) **FIXED**: Implement proper Bonjour browser cleanup in onUnload() to prevent resource leaks
* (DutchmanNL) **CI/CD**: Migrated deployment workflow to NPM Trusted Publishing (OIDC) for enhanced security

### 0.7.3 (2024-10-26)
* (HaggardFFM) allow write on segments, solves #688 #706
* (DutchmanNL) Fixed error when a device is not available Solves #698

### 0.7.2 (2023-10-31) - Improve online visibility of devices
* (DutchmanNL) Show online state of device in object tree
* (DutchmanNL) Bugfix: Update online state correctly in situation connection is lost, fixes #611
* (DutchmanNL) Reset brightness to 0 and on to false during adapter start and if a device disconnects, fixes #565

## For Developers

### Automated Deployment

This adapter uses GitHub Actions with **NPM Trusted Publishing** for automated deployment.

For maintainers troubleshooting deployment issues, see [docs/DEPLOYMENT_SETUP.md](docs/DEPLOYMENT_SETUP.md) for:
- Verifying trusted publishing configuration on npmjs.com
- Required workflow and job name settings
- Troubleshooting authentication errors
- Testing deployment with pre-release versions

## License
MIT License

Copyright (c) 2024-2026 DutchmanNL <oss@drozmotix.eu>

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
