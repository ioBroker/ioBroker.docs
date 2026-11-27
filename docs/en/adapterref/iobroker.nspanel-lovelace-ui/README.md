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

Documentation: https://ticaki.github.io/ioBroker.nspanel-lovelace-ui (German and English, icon overview under `/icons/`)  
Adapter Community (ioBroker Forum): [Forum](https://forum.iobroker.net/topic/80055/alphatest-nspanel-lovelace-ui-v0-1-1)

---

## The following HMI components are already integrated into the NSPanel adapter:

### HMI Cards

- [x] screensaver
- [x] screensaver2
- [x] screensaver3
- [x] cardChart
- [x] cardLChart
- [x] cardPChart
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
### **WORK IN PROGRESS**
- (ticaki) Media page (alexa2): option to not move the playing music to the new Echo when switching the speaker
- (ticaki) Media page (alexa2): optional toolbar item "Timer" for the Alexa timers of the currently selected Echo device - while a timer runs it shows the remaining time (as on the screensaver) instead of the icon
- (ticaki) Media page: the order of the toolbar items can be changed by drag and drop in the admin
- (ticaki) Timer page item: option "value instead of icon" shows the remaining time while a timer runs
- (ticaki) Selection popups: an empty value or list entry is no longer sent as "error"
- (ticaki) panel setup, berry/TFT install, restart and reset of tasmota: the log shows the cause of network errors (e.g. `ECONNREFUSED`, `EHOSTUNREACH`) instead of only "fetch failed"
- (ticaki) panel setup: clear hint in the admin if the panel does not answer (Tasmota HTTP API off since 15.4.0.2, enable with SetOption128 1)
- (ticaki) dependencies updated
- (ticaki) alarm/unlock page: the PIN lockout is now enforced in the adapter – every attempt during the lockout is rejected and extends the wait – a page with shared status shares the lockout across all panels
- (ticaki) Admin: screensaver indicators can be pinned to their slot - a hidden pinned item leaves its slot empty and the other indicators do not move up onto it
- (ticaki) Admin: playlist suggestions and format check for alexa2 media pages
- (ticaki) Admin: media page headline can show only the active device
- (ticaki) new alias channel `battery` (home battery / storage) with the states `ACTUAL` (charge level in %) and optional `POWER` (negative = charging, positive = discharging): the icon follows the charge level in steps of ten, with a flash while charging; green while charging, red while discharging, neutral color when neither. Usable as page item (also as navigation item) and on the screensaver with the new template `text.battery.channel`
- (ticaki) Media page (alexa2): the playlist selection now goes to the currently selected Echo device

### 2.6.0 (2026-11-22)
- (ticaki) web panel: cardPower moves the flow dots in the same direction as the NSPanel (positive speed = left / up, i.e. away from the house on the left / upper items)
- (tt-tom17) cardPower: the limits of the speed scale count with their amount, so a battery configured as -4000 … 4000 no longer shifts the zero point - zero power always stands still, the sign alone gives the direction and the speed is limited to the ±120 of the HMI
- (ticaki) alexa media page: choosing another Echo in the speaker popup switches the player again (also the first Echo of the list)
- (ticaki) Alexa timer: the screensaver can show the timers of an Echo device (alexa2) instead of the clock (new source "Alexa timer (alexa2)" in the time dialog), and page items get the kind "Alexa timer" - shows the running or ringing timer, starts a timer by text command and stops the shown one; needs the alexa2 option "Automatically query activity on device interaction"
- (ticaki) Alexa timer page item: can show an alarm of the Echo device instead ("Show: Alarm") - the next active alarm or a specific one as HH:MM with On/Off, the time of a specific alarm can be changed while it is off
- (ticaki) page item dialog: a channel without states whose role needs no data points (e.g. level.timer = internal timer) is no longer marked as faulty - "Apply" instead of "Details..." - and the adapter no longer logs "Dont finds states" warnings for it

### 2.5.1 (2026-11-21)
- (ticaki) the panel's own states `cmd.power1`, `cmd.power2` and the new button `cmd.TasmotaRestart` can be selected as data points (e.g. screensaver indicator) - they show and switch the relays / restart Tasmota
- (ticaki) fixed the wrong translations of the state name `safeboot` (fr, es, pt, ru, uk)

### 2.5.0 (2026-11-21)
- (ticaki) beta TFT 6.2.0, notification popup: new option `largeIcon` - big icon, one text line and up to two icon buttons (`buttonLeftIcon`/`buttonRightIcon`); older TFTs show the classic popup, without `largeIcon` nothing changes; the admin icon tab can filter these icons; `cmd.pagePopup.textSize` lists the available fonts and also accepts 0 and 8 (96 px clock font)
- (ticaki) screensaver: the long press of an indicator is sent when the finger is lifted (TFT 6.2.0 and web panel), after 500 ms the clock blinks yellow/green as a sign to let go; only indicators with a long press action detect it, new long press option "only trigger the state" - **note:** whoever used `buttons.indicatorLong-N` without a long press action must choose this option with TFT 6.2.0
- (ticaki) screensaver: new state `cmd.screenSaver.clockBlink` and sendTo `screensaverClockBlink` let the clock blink red/white until switched off (TFT 6.2.0 and web panel)
- (ticaki) screensaver: the info icon next to the clock can be tapped (TFT 6.2.0 and web panel) - timer and firmware icons explain themselves in a popup, the own info icon writes `buttons.infoIcon` and shows the new text `cmd.screenSaver.infoText` (font: `cmd.screenSaver.infoTextFont`); the own icon now takes precedence over the development firmware icon
- (ticaki) screensaver notifications: background area with three new colors in the color theme (headline, text, background) and new option "background blinks" with a second color (TFT 6.2.0 and web panel); a change of prefix, unit, suffix or icon states updates them, new content is sent at most every 30 s, a notification tapped away stays hidden until the screensaver shows again
- (ticaki) screensaver: with standby brightness 0 the first press on an indicator only wakes the display
- (ticaki) navigation: a locked (hidden) page shows a popup "page locked" instead of silently doing nothing, arrows and swipes go on from the page shown over the simple target; admin marks hidden pages with a closed eye
- (ticaki) navigation: reaching the long press of an arrow (0.5 s) lets heading and arrows blink yellow/green (TFT 6.2.0 and web panel, the web panel now knows the long press of the arrows too); cardThermo2 no longer repeats a held arrow, cardEntities and cardThermo2 no longer send an empty arrow press when the page loads
- (ticaki) hardware buttons: new mode "navigation" with target next/prev/home/parent - acts like the matching arrow of the page shown, an open popup is closed first, the screensaver is never left
- (ticaki) TFT 6.2.0: faster acknowledgement of large messages, no hanging display (0x24) after fast message sequences, more free page RAM for further features; messages bigger than the display can receive (1017 bytes) are dropped with an error log instead of hanging the display
- (ticaki) charts: a line chart with too many points (e.g. 24 h) is thinned out instead of staying black; the bar chart of the web panel follows the axis logic of the HMI #925
- (ticaki) web panel: shows only what the panel can by default (new option for web panel extensions), cuts long texts at the field border like the panel, a touch of the screensaver clears the notification like on the panel
- (ticaki) web panel clone: big icons no longer overwrite the info states of the hardware panel, the hardware buttons switch the target state only once
- (ticaki) states `cmd.pagePopup.activate`, `cmd.buttons.left`/`right` and `cmd.screenSaver.activate`: every write without ack triggers them, afterwards they are set back to `false`; `cmd.goToNavigationPoint` queues values written during a page change and executes only the newest
- (ticaki) adapter start no longer restarts a Tasmota that is flashing a TFT
- (tt-tom17) admin translations: 36 missing keys added to all nine translated languages (cardPower editor, navigation tabs, Tasmota tools, channel dialog), language files revised
- (ticaki) admin translations: remaining labels of the instance settings translated, outdated texts updated, own keys so that state values shown on the panel (e.g. `true`, `sunny`) are not translated by accident; vacuum status texts corrected - fixed #928
- (ticaki) admin: small fixes (frame of the color theme select, long press hint for TFT 6.2.0)

### 2.4.1 (2026-11-18)
- (ticaki) TFT 6.1.1: popups opened from the screensaver (Advanced and Tiles, long press of an indicator) show the full name as heading - the light popup with color showed "change model conf to us-l/p", other popups cut the name after 11 characters
- (ticaki) Web panel: a browser that kept the page open over an adapter update reloads itself once and gets the new frontend
- (ticaki) Web panel: the long press of a screensaver indicator no longer operates the popup it opens (releasing the finger moved the shutter or picked a color)
- (ticaki) admin developer: download the configuration of a single page with its page items (stored and runtime) for support
- (ticaki) web panel: colour temperature slider of the light popup was inverted
- (ticaki) colour temperature with min/max of the state was set mirrored
- (ticaki) colour temperature: fallback to the state's min/max or the defaults when the scale is missing, values outside are limited

### 2.4.0 (2026-11-17)
- (ticaki) screensaver: new long press action "Open popup" for indicators (Advanced and Tiles, TFT 6.0.9+) - opens the popup of the light, shutter, fan, selection or timer channel and returns to the screensaver afterwards (script: `ScreensaverEntityLongPressPopup: true`)
- (ticaki) screensaver notifications: tapping away a dismissible notification with a group ID writes that ID to `panels.<panel>.screensaverNotify.id` and `screensaverNotify.id`; sendTo `screensaverNotify` finds the panel given in `panel` (topic) again and answers with `result: 'ok'`
- (ticaki) panel setup: an existing panel is recognized by its MAC address - changing topic, name or IP updates it instead of creating a duplicate and moves its pages, screensaver and navigation assignments, its script configuration and its configuration script along (fixed #899)
- (ticaki) admin: panel names and topics must be unique, orphaned panel assignments of pages and screensavers are marked and can be removed, a duplicated panel entry can be deleted on its own and is skipped with a warning on start
- (ticaki) admin, screensaver items: new option to fill free slots even while hidden - by default a hidden item no longer fills a free slot
- (ticaki) admin, panel cards (Maintain, Panelinfo, panel overview): one "?" per card for its documentation, buttons and fields link their help in the tooltip; a long panel title no longer widens the Panelinfo card
- (ticaki) gate channel: a boolean status (`sensor.gate`) or a channel with only SET is shown, up/down work again; with a boolean status up is disabled when open and down when closed, stop no longer depends on the status
- (ticaki) fixes: a temperature offset set in Tasmota (`TempOffset`) is taken over instead of overwritten; the internal MQTT server matches topics exactly and no longer mistakes a panel whose name starts with the name of another one; a failed Berry driver download restores the previous driver
- (ticaki) log: no error without configured panels, no "Update detected" on every MQTT connect, panel name in the screensaver message, clearer script update errors, "setActivePage called but nothing changed" only as debug

## License

MIT License

Copyright (c) 2024-2026 ticaki <github@renopoint.de>  
Copyright (c) 2024-2026 tt-tom17 <tgb@kabelmail.de>

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