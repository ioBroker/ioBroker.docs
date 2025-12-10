![Logo](admin/nspanel-lovelace-ui.png)

# ioBroker.nspanel-lovelace-ui

[![NPM version](https://img.shields.io/npm/v/iobroker.nspanel-lovelace-ui.svg)](https://www.npmjs.com/package/iobroker.nspanel-lovelace-ui)
[![Downloads](https://img.shields.io/npm/dm/iobroker.nspanel-lovelace-ui.svg)](https://www.npmjs.com/package/iobroker.nspanel-lovelace-ui)
![Number of Installations](https://iobroker.live/badges/nspanel-lovelace-ui-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/nspanel-lovelace-ui-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.nspanel-lovelace-ui.png?downloads=true)](https://nodei.co/npm/iobroker.nspanel-lovelace-ui/)

**Tests:** ![Test and Release](https://github.com/ticaki/ioBroker.nspanel-lovelace-ui/actions/workflows/test-and-release.yml/badge.svg?branch=main)

[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/nspanel-lovelace-ui/287x66-grey.png)](https://weblate.iobroker.net/projects/adapters/nspanel-lovelace-ui/)

## nspanel-lovelace-ui adapter for ioBroker

NsPanel Lovelace UI is a Firmware for the nextion screen inside of NSPanel in the Design of Lovelace UI Design.

### Short Description

The NSPanel Lovelace UI is an alternative user interface for the Sonoff NSPanel, specifically designed for integration with iobroker. It typically relies on Tasmota (firmware) and MQTT (messaging protocol) to provide custom controls and displays directly on the NSPanel's small touchscreen.

### What is the NSPanel?

The Sonoff NSPanel is a smart wall switch with:

- two physical relay switches
- a 3.5-inch touchscreen
- temperature and brightness sensors

It was originally developed for the eWeLink app, but can be integrated much more powerfully with ioBroker using alternative firmware

### What does the "NSPanel Lovelace UI" do?

With this custom UI, you can:

- Display Lovelace-like Cards on the NSPanel
- Display sensor values ​​(e.g., temperature, humidity)
- Control scenes and automations
- Control lights, thermostats, and other devices directly on the screen

---

### Installation & Questions

Adapter Wiki: https://github.com/ticaki/ioBroker.nspanel-lovelace-ui/wiki  
Adapter Community (ioBroker Forum): [Forum](https://forum.iobroker.net/topic/80055/alphatest-nspanel-lovelace-ui-v0-1-1)

---

## The following HMI components are already integrated into the NSPanel adapter:

### HMI Cards

- [x] screensaver
- [x] screensaver2
- [x] screensaver3
- [x] cardChart
- [x] cardLChart
- [ ] cardLChart2 (new - in progress)
- [x] cardEntities
- [x] cardSchedule
- [x] cardGrid
- [x] cardGrid2
- [x] cardGrid3
- [x] cardThermo
- [ ] cardMedia
- [x] cardUnlock
- [x] cardQR
- [ ] cardAlarm
- [x] cardPower

### HMI Popups

- [x] popupInSel
- [x] popupFan
- [x] popupThermo
- [x] popupNotify
- [x] popupShutter
- [x] popupShutter2
- [x] popupLight
- [x] popupLight2
- [x] popupTimer
- [x] popupSlider
- [ ] popupColor (new - in progress)

---

## Buzzer Control

The adapter supports buzzer control for NSPanel devices using the Tasmota `Buzzer` command. This enables button sounds, urgent message notifications, and general buzzer control.

### Prerequisites

To use the buzzer functionality, ensure your NSPanel Tasmota firmware has `SetOption111 1` enabled. This uses BuzzerPwm for piezo buzzer frequency output instead of on/off signal.

### Usage Methods

#### 1. State-based Control

Each panel has a buzzer control state: `panels.{panelName}.cmd.buzzer`

```javascript
// Set buzzer command (tone, duration, count, frequency)
setState('nspanel-lovelace-ui.0.panels.Panel1.cmd.buzzer', '1,2,3,0xF54');

// Examples:
setState('nspanel-lovelace-ui.0.panels.Panel1.cmd.buzzer', '1'); // Single beep
setState('nspanel-lovelace-ui.0.panels.Panel1.cmd.buzzer', '1,5'); // Longer beep
setState('nspanel-lovelace-ui.0.panels.Panel1.cmd.buzzer', '2,3,5'); // 5 beeps
```

#### 2. SendTo Interface

```javascript
// Basic buzzer command
sendTo('nspanel-lovelace-ui.0', 'buzzer', {
    panel: 'panelTopic',
    command: '1,2,3,0xF54',
});

// Button feedback sound
sendTo('nspanel-lovelace-ui.0', 'buzzer', {
    panel: 'kitchen_panel',
    command: '1',
});

// Urgent notification
sendTo('nspanel-lovelace-ui.0', 'buzzer', {
    panel: 'living_room',
    command: '3,5,10,0x800', // High-pitched, multiple beeps
});
```

### Buzzer Command Format

The buzzer command follows Tasmota's format: `tone,duration,count,frequency`

- **tone**: 1-4 (tone type)
- **duration**: 1-10 (duration units, ~100ms each)
- **count**: 1-255 (number of beeps)
- **frequency**: 0x100-0xFFFF (piezo frequency in hex)

**Examples:**

- `1` - Single short beep
- `1,5` - Single longer beep
- `2,3,5` - 5 medium beeps with tone 2
- `1,2,3,0xF54` - 3 short beeps with custom frequency

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.9.1 (2025-11-29)
- (ticaki) Fixed: Under certain circumstances, the adapter crashes when a pop-up is called.

### 0.9.0 (2025-11-21)
- (armilar) HMI: long press added (v5.1.1)
- (ticaki) Replace double-click with long press 
- (ticaki) pageItem type=button long press added
- (ticaki) custom pageitem added
- (ticaki) script ID is found uniquely

### 0.8.1 (2025-11-15)
- (ticaki) first Version at latest
- (ticaki) New attempt to get MQTT TLS keys into the backup

### 0.8.0 (2025-11-13)
- (Armilar) IMPORTANT: update to TFT Version 5.1.0
- (ticaki) pagePopup added
- (ticaki) color for brightsky favorit/bottom day fixed
- (ticaki) unlock pin fail fixed

## License

MIT License

Copyright (c) 2024-2025 ticaki <github@renopoint.de>  
Copyright (c) 2024-2025 tt-tom17 <tgb@kabelmail.de>

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
