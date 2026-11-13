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
### 2.2.0 (2026-11-12)
- (ticaki) web panel: smartphone models `web-p` and `web-l`, portrait layout for all cards, popups and screensavers on us-p/web-p, hardware buttons can be switched off, many layout fixes; no crash on the first connection, less log noise without browser
- (ticaki) admin: export and import the configuration of one panel (merge or overwrite completely, conflict review, secrets only on request)
- (ticaki) screensaver: long press action and own icon font for indicators (TFT 6.0.9), new indicator action "values to cycle through", trash date templates `text.trash.next` / `text.trash.afterNext`
- (ticaki) screensaver: an indicator only acts when an action is configured, the option "indicators act as buttons" is removed - **check your indicators**
- (ticaki) screensaver: only changed values are sent, a press shows its result at once; fixes for TFT 6.0.8/6.1.0 indicators, Bright Sky sunrise, battery icons and the color scale in the admin
- (ticaki) admin: colors follow the color theme of the instance, developer tab with "Create test states"
- (ticaki) navigation: a missing target opens the system page "Nav error"; the service page no longer mixes up the navigation of several panels
- (ticaki) panel: Tasmota safeboot is detected, messages longer than 1017 bytes are reported, long headlines are shortened with …
- (ticaki) fixes: status datapoint of new alarm/unlock pages, emulator detection, less info logging at startup
- (tt-tom17) admin: QR, chart, trash and menu page editors reworked (clearer labels, menu preview like the panel, trash "Apply selection" fills the page completely), remaining fixed texts translated
- (tt-tom17) pageQR: WPA2 is the default wifi encryption

### 2.1.0 (2026-11-05)
- (ticaki) screensaver: a timer can replace the clock - from an on/off and a data state, from patterns for timers in changing slots or from a page item with a timer popup; it shows the remaining minutes in the color of the timer, the first tap switches to the clock; all screensaver modes and the web panel
- (ticaki) popupTimer repaired: an internal timer shows its time in the list, stays at 00:00 with Finish until confirmed and can be controlled through SET and STATUS; external timers count in seconds (ms with unit ms), the alarm clock uses local time and On/Off; a `level.timer` item can use the timer of the screensaver of its panel
- (ticaki) screensaver: new mode tiles with 5 values, 7 indicators (portrait panel: 4 values, 8 indicators), a larger clock, the info icon and two status bars; needs a TFT with the page screensaver5; the web panel draws the mode as well
- (ticaki) screensaver: a blind can be used as element - it shows one of 5 position icons and its position in %; tapping it as indicator only runs the configured action, it never moves the blind
- (ticaki) screensaver: new target "Screensaver" for page items and for prev, next, parent and home of a page (`///screensaver` in the script), new state `panels.<panel>.cmd.screenSaver.activate` shows it at once
- (ticaki) screensaver: a mode this adapter version does not know (e.g. after a downgrade) falls back to `standard` with a warning instead of breaking the screensaver, the stored configuration stays unchanged
- (ticaki) cardPChart: new page type "Pie chart" in the page configuration (needs the beta TFT 6.0.5 or newer on the EU panel) - up to five slices from numeric states with name, unit and color, optionally the average over a time range from a history/sql/influxdb instance, alternatively a script data point with the finished text; the web panel renders the card as well
- (ticaki) admin screensaver: page item templates can be configured per place, with the instances of the adapter as suggestions and template options (e.g. SOC limits of `text.battery.bydhvs`); on an indicator a template can act on tap; a new screensaver starts with two status icons coupled to the relays of the panel
- (ticaki) admin screensaver: uniform paging arrows for all areas except favorit, the alternate area can hold several items the panel rotates through, the notifications and options buttons moved below the panel picture; items of areas the chosen version does not show are no longer reported as a problem
- (ticaki) admin navigation: a start page no longer has a prev/next/parent of its own, its neighbours follow from the pages pointing at it (stored values are kept and apply again without the flag); a page named `main` without the flag counts as start page and asks for the flag in the log; empty fields show the neighbours the adapter resolved, a click on the label opens the target page, conflicting links get a warning; an explicit `next` is no longer overwritten when other pages chain in behind it
- (tt-tom17) page configuration: the unique id of a page is fixed once it was created, because renaming left the navigation of other pages pointing at the old name; the delete confirmation names the pages pointing at the page and offers to connect its previous and next page
- (tt-tom17) cardQR: a page with "No Password" (or free text, url or telephone code) no longer sends the stored wifi password to the panel - it was shown in clear text and was part of the scanned code
- (tt-tom17) cardThermo: the set temperature reached the panel multiplied by the step width (19.0 °C became 79.0 °C with a step of 0.5 °C)
- (tt-tom17) cardThermo2: the humidity row uses its own unit, the unit of the first row also applies to the set temperature
- (tt-tom17) cardAlarm: the disarm buttons also work without an arm button in the same row; a new page starts with "Arm" and "Disarm" filled in, the top button of both columns is mandatory, because the card cannot be left without them (the type "unlock" still needs one button only)
- (ticaki) panel: fewer page updates (at most one list update per 2 s for running timers, at least 1 s between updates of a page)
- (ticaki) the beta option now also applies to Tasmota: update and update indicator use the `tasmota-beta` version
- (tt-tom17) admin: the two hardware button buttons of a panel tile sit one below the other and show the relay state in their color, with a tooltip
- (tt-tom17) documentation: rewritten for the admin, complete in English as well and published on GitHub Pages, the admin links point there; missing translations of the page configuration are filled in

### 2.0.2 (2026-11-01)
- (ticaki) admin: page item text size shows the pixel size of each font; icons only offer fonts 1, 3 and 4 (the others have no icons), font 5 is marked "ASCII only"
- (ticaki) admin: the "..." button next to the item name is now "Dynamic name" (used only while the name is empty) and no longer offers unit and date format, which were ignored
- (ticaki) admin: on cardThermo2 and cardMedia the name field notes that the name is only the popup title
- (ticaki) admin: screensaver item dialog: "icon per value range" and the visibility settings are available without expert mode
- (ticaki) web panel: the font `¬<n>` of page items works on every card; cardThermo2 uses the slot sizes and positions of the HMI

### 2.0.1 (2026-11-01)
- (ticaki) screensaver editor: areas with more items than places page with arrows instead of hiding the extra items, they are no longer reported as "no place in this version"; items with a condition (enabled / visible condition, also in raw data) are marked
- (ticaki) admin: the "..." button of the media page player opens a list of all players found (alexa2 Echo devices, sonos speakers, squeezebox players, spotify-premium/mpd instances) grouped by adapter with search instead of the object tree; the id can still be typed by hand
- (ticaki) admin: screensaver items show readable names (headline, object name or template name) instead of regex fragments; the full name is in the tooltip
- (ticaki) admin: a script weather instance with a trailing dot (`pirate-weather.0.`) is recognized as installed and saved without the dot

### 2.0.0 (2026-10-31)
- (ticaki) maintain: new button "Take script over into admin" on every panel tile - converts the pages, the screensaver and the hardware buttons of a panel script into the admin configuration (preview with all problems, backup of the script, pages of the global script per panel, items the editor cannot express are taken over as raw data)
- (ticaki) a configuration script is no longer required; new panel option "Panel uses no script" - the panel is configured in the admin only and a script sent for it is rejected
- (ticaki) page configuration: new page types "Media player" (cardMedia), "Thermostat (classic)" (cardThermo) and "Page link"; paging of menu, thermostat and media pages can be set
- (ticaki) page configuration: the old tabs "Page Power" and "Page Chart" are moved into the page configuration automatically at adapter start
- (ticaki) item dialog: raw data (JSON) for page and screensaver items, many more fields (value conditions, slider ranges, `secondRow`, `colormode`, target page for buttons); long press is offered on grid pages only, like on the HMI
- (tt-tom17) panel settings: the hardware buttons (relay decoupling and action) are configured in the panel tile
- (ticaki) navigation flow: edit mode for prev/next/home/parent links (also for script pages, stored as override), auto layout, collapsible sub trees
- (ticaki) icons: Material Design Icons 7.4.47 (546 new icons), own window and shutter icons, blinds show their position as icon - needs HMI/TFT 6.0.2 (beta TFT EU is 6.0.2)
- (ticaki) global script: an admin page assigned to a panel replaces the global page of the same name
- (ticaki, tt-tom17) web panel: tap and hold behave like on the HMI (grid tiles, cardMedia, cardThermo2, list rows), hardware buttons 20px higher
- (ticaki) error in the log when Tasmota runs but the display never answers (hint to the NSPanel template / GPIO4)
- (ticaki) fix: prefix and suffix of admin page item values were swapped - if you entered them the other way round, swap them back
- (ticaki) fixes: `colorScale.color_best` ignored, font size lost while an item is off, long press also triggered the short press, media item of an admin page without media sub page, screensaver clock stopped, "show system pages" in the navigation flow
- (tt-tom17) fixes: deactivated panels (`cmd.activated`) are left alone at adapter start and report `deactivated`, `cmd.hideCards` keeps its value at adapter start

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