# ioBroker.aura

**Aura** is a modern visualization dashboard for [ioBroker](https://www.iobroker.net/).

📖 **[Documentation](https://hdering.github.io/ioBroker.aura/)** – widgets, settings, screenshots

---

## Installation

### Step 1 – Install adapter

Install Aura via ioBroker Admin:

1. Open ioBroker Admin
2. Go to **Adapters**
3. Search for **Aura** and install it

### Step 2 – Create instance

After installation, create a new **Aura** instance (if not done automatically).

### Step 3 – Configure the instance

Aura runs its **own web server** (frontend + built-in iframe proxy) and connects to an existing
`iobroker.web` instance only for the socket.io data connection. Open the **Aura** instance settings:

| Setting | Default | Meaning |
|---------|---------|---------|
| **Port** | `8095` | Port of Aura's HTTP server (frontend + iframe proxy) |
| **web instance** | automatic | The `iobroker.web` instance to connect to. Pick one and its port, bind address and HTTPS setting are taken from it — the two fields below are then hidden |
| **ioBroker socket port** | `8082` | Only in automatic mode: port of the `iobroker.web` instance that provides the socket.io connection |
| **Web adapter uses HTTPS** | off | Only in automatic mode: enable if that web instance runs HTTPS |

> **Requirement:** A running `iobroker.web` (or `iobroker.socketio`) instance must serve socket.io on
> the configured socket port. The stock `web.0` with **socket.io = integrated** provides this on
> port `8082` (the default). Aura auto-detects the matching instance and proxies the connection
> internally, so no `/aura/` path or web extension is needed anymore.

**If anything does not work — a blank dashboard, widgets with a load error, images that stay
empty — press *Check backend* in the instance settings first.** It tests the instance, the
socket connection and the file delivery live and says in plain words what is wrong; the report
is meant to be pasted into a forum post or a GitHub issue. Aura runs the same check at every
start and writes the result to the log and to `aura.0.info.backendCheck`.

### Step 4 – Open dashboard

The dashboard is available at:

```
http://<iobroker-ip>:8095/
```

The admin interface at:

```
http://<iobroker-ip>:8095/#/admin
```

---

## HTTPS / Reverse Proxy

Aura can serve HTTPS in two ways.

### Option A – Built-in TLS

Enable **Use HTTPS** in the Aura instance settings and select the certificates (loaded from ioBroker
`system.certificates`). Aura's own server then serves `https://<iobroker-ip>:8095/`.

> The default self-signed certificate triggers a browser warning. For a clean setup use proper
> certificates (e.g. Let's Encrypt) or put Aura behind a reverse proxy (Option B).

### Option B – Reverse proxy

Point a reverse proxy (e.g. **nginx**, **Nginx Proxy Manager**, **Caddy**) with a valid TLS
certificate at Aura's port. Aura proxies the socket.io connection to the web instance internally, so
a single forwarded port is enough.

#### Nginx Proxy Manager – example configuration

| Field | Value |
|-------|-------|
| Forward Scheme | `http` |
| Forward Hostname / IP | `<iobroker-ip>` |
| Forward Port | `8095` |
| Websockets Support | enabled |

> **Alternative topology:** If you instead proxy `/socket.io/` and `/echarts/` directly to the web
> adapter port, set **ioBroker socket URL (override)** in the Aura settings to your public URL
> (e.g. `https://your-domain.com`) so the frontend connects socket.io to the right endpoint.

---

## Bugs & Feature Requests

Please report directly as a GitHub issue:

**[github.com/hdering/ioBroker.aura/issues](https://github.com/hdering/ioBroker.aura/issues)**

---

## Versioning

Aura uses a simple scheme so you can tell stable releases from test builds at a glance:

| Version | Meaning |
|---------|---------|
| `0.10.2-next1`, `0.10.2-next2`, … | **Test builds** for the upcoming `0.10.2` release. Pre-releases, published for testing only. |
| `0.10.1` in the **Latest** repo | A published release in ioBroker's *Latest* repository. Available to everyone, but still on probation — not yet promoted to *Stable*. |
| `0.10.1` in the **Stable** repo | The same version after it has proven itself error-free in the field. This is the truly stable build. |

- A **`-nextN` suffix** marks a pre-release. The number counts the test builds leading up to the next plain version (`next1`, `next2`, …). Pre-releases are **not** offered automatically in ioBroker; you only get them if you explicitly install that version.
- A **plain number** (`0.10.1`, `0.10.2`, …) is first published to ioBroker's **Latest** repository. This makes it generally available, but *Latest* is the proving ground — one step before truly stable.
- Once a *Latest* release has run long enough with no errors reported, the **same version** is promoted to the **Stable** repository. Only then is it considered fully stable.

So the path of any release is: `-nextN` test build → **Latest** (published, on probation) → **Stable** (promoted once confirmed error-free).

---

## Changelog

_Older releases: see CHANGELOG_OLD.md._

### 0.93.1 (2026-10-25)
- 🐛 **Bug fix:** Camera - .mp4/.webm clips (e.g. Ring Livestream.mp4) now play in a video player; new optional ready datapoint starts the stream when the recording is finished instead of after a fixed delay ([#843](https://github.com/hdering/ioBroker.aura/issues/843))

### 0.93.0 (2026-10-25)
- 🌟 **New feature:** Camera - intercom: an "Answer" button opens a two-way call through go2rtc (webrtc.html), with an optional call datapoint for the doorbell ([#836](https://github.com/hdering/ioBroker.aura/issues/836))
- 🐛 **Bug fix:** Universal - conditions on a switch cell in button mode now apply bold, italic, font size and text colour to the button caption; button, input and dropdown cells pick up the condition font size too ([#842](https://github.com/hdering/ioBroker.aura/issues/842))
- 🐛 **Bug fix:** Connected devices - two identical devices (e.g. two Fire tablets of the same model running Fully) no longer share one client ID; the second one moves to its own ID on its next connect ([#844](https://github.com/hdering/ioBroker.aura/issues/844))
- 🌟 New feature: Speech output - write a text, a sound file or "volume;text" to speech.say (all devices) or clients.<id>.speech.say and the dashboard speaks or plays it, queued one after another; JSON adds voice, language, rate, interrupt, "only with display on" and a target; per device: muted, volume, playing and lastResult; several tabs of one browser play an announcement once, and one older than 10 minutes (e.g. reaching a tab the browser had put to sleep) is skipped. If the browser blocks sound until a tap, an "Enable sound" button appears and the announcement plays on the next touch ([#834](https://github.com/hdering/ioBroker.aura/issues/834))
- 🌟 **New feature:** SayIt - announcements of a SayIt instance with output type "Browser" now also play on the Aura dashboards, the existing sayit.0.tts.text scripts stay unchanged ([#834](https://github.com/hdering/ioBroker.aura/issues/834))
- 🐛 **Bug fix:** Messages - new "speak" option reads title and text out on the device that shows the message; Admin → Messages → Defaults can switch it on per severity, e.g. for warnings and errors ([#834](https://github.com/hdering/ioBroker.aura/issues/834))
- 🌟 **New feature:** Room climate - new "Custom" layout: switching to it rebuilds the current layout as a custom grid, including the history chart, the value columns and the comfort badge ([#838](https://github.com/hdering/ioBroker.aura/issues/838))
- 🌟 **New feature:** Room climate - the target temperature can be set from the widget: "Target adjustable" adds -/+ beside the target and quick-select buttons, and the custom layout offers the circle menu as in the thermostat ([#838](https://github.com/hdering/ioBroker.aura/issues/838))
- 🐛 **Bug fix:** Thermostat, shutter, select - the circle menu is now also a component of the custom layout, and switching a circle layout to Custom keeps the round button ([#838](https://github.com/hdering/ioBroker.aura/issues/838))
- 🌟 **New feature:** Custom layout - the select cell can be shown as a circle menu: a round button with the current entry that fans all entries out, optionally with -/+ steps for numbers ([#838](https://github.com/hdering/ioBroker.aura/issues/838))
- 🌟 **New feature:** Custom layout - new cell type "Chart": mirrors an existing chart widget inside one cell, so a device and its history fit into one widget ([#838](https://github.com/hdering/ioBroker.aura/issues/838))
- 🐛 **Bug fix:** Device card - "Popup: widget content" on a child widget now shows the data of the card's own device instead of an empty chart or value ([#845](https://github.com/hdering/ioBroker.aura/issues/845))
- 🐛 **Bug fix:** Static list - the rule of a separator now also shows in borderless themes (Lovelace, Material 3, ...), where it stayed invisible ([#846](https://github.com/hdering/ioBroker.aura/issues/846))

### 0.92.0 (2026-10-24)
- 🌟 **New feature:** Background image - also accepts CSS colours and gradients (e.g. linear-gradient(#e66465, e5)), typed in or composed with the new gradient builder ([#9198](https://github.com/hdering/ioBroker.aura/issues/9198), [#830](https://github.com/hdering/ioBroker.aura/issues/830))
- Group - header items now sit in the group's own header bar (divider and spacing kept even with title and icon off, no more jumping row), and the title and icon colour can be set for the group header ([#832](https://github.com/hdering/ioBroker.aura/issues/832))
- 🌟 **New feature:** Alarm - with "Disarm only with PIN" the Off button now opens the PIN entry while the system is merely armed (it did nothing before); the PIN field has a cancel button and brings up the numeric keypad on phones and tablets
- Map - zoom in beyond level 19 (up to 22); past the tile server's last level the tiles are scaled up, handy for small plots like a mower's track ([#837](https://github.com/hdering/ioBroker.aura/issues/837))
- 🌟 **New feature:** Scenes - new widget for the ioBroker scenes adapter: trigger scenes with a tap and create them in Aura - pick any writable datapoint, set its value by hand or take the current one, and order the devices; scenes are managed in the widget settings and, optionally, right in the dashboard ([#825](https://github.com/hdering/ioBroker.aura/issues/825))
- 🌟 **New feature:** Mirror - can now show a whole tab: pick "Whole tab" as the source and the tab appears live inside the widget, scaled to its width, fitted entirely without scrolling, or at its original size; tabs behind a PIN and the mirror's own tab are not offered; the mirror editor is now translated
- Menu - entries de-selected in the menu widget stay hidden when a tab is renamed (renaming used to change the tab's URL slug and bring them back) ([#840](https://github.com/hdering/ioBroker.aura/issues/840))
- 🌟 **New feature:** Device card - new placeholders {{dpname}}, {{parentname}}, {{parent2name}} … show the object name (common.name) of the card's datapoint and of the channel/device above it, e.g. as card title; they work in popup views and popup titles as well ([#841](https://github.com/hdering/ioBroker.aura/issues/841))

### 0.91.0 (2026-10-22)
- Section menu - a popup opened by a widget inside the open section menu now appears on top of the menu instead of behind it
- Custom grid - clicking a cell in the edit dialog now highlights it in the preview even when an image or another spanning cell covers it
- 🌟 **New feature:** Thermostat and selection widgets - new circle menu layout: a round button fans out the preset temperatures with -/+ or all selection entries around it, like the shutter's circle menu ([#815](https://github.com/hdering/ioBroker.aura/issues/815))
- Universal widget: status icon and static icon cells now have an icon size slider in their content settings
- Connection lost banner - now has an opaque background in glass themes so the message stays readable over the dashboard ([#826](https://github.com/hdering/ioBroker.aura/issues/826))
- 🌟 **New feature:** List widgets - the -/+ stepper can show and read durations (mm:ss, hh:mm, hh:mm:ss) and write the value as number, text or time string, e.g. for Sprinkle Control running times ([#827](https://github.com/hdering/ioBroker.aura/issues/827))
- 🌟 **New feature:** Input, selection, dial, slider, dimmer and thermostat widgets - new optional status datapoint: the widget shows the confirmed value from there while still writing to the main datapoint, like the switch ([#828](https://github.com/hdering/ioBroker.aura/issues/828))
- Custom grid - cells placed on a spanning cell (e.g. lamps and values on a floor-plan image covering the whole grid) are now drawn on top of it, also as single cells
- Popups - click actions of widgets inside a popup view now work: a tab jump navigates and closes the popup, a popup action opens a further popup on top (up to three levels, Escape closes the topmost) ([#829](https://github.com/hdering/ioBroker.aura/issues/829))

### 0.90.0 (2026-10-21)
- Fill level - a narrow vertical battery now shows the limit value next to the battery instead of hiding it ([#819](https://github.com/hdering/ioBroker.aura/issues/819))
- 🌟 **New feature:** Screensaver - each device reports its idle state in clients.<id>.idle.active after a configurable time without input; a popup trigger on it (with {{clientId}} for every device) opens a screensaver popup that closes on the next touch ([#822](https://github.com/hdering/ioBroker.aura/issues/822))
- 🌟 **New feature:** Popups - new "Fullscreen" option makes a popup cover the whole screen without margin or frame; also available as "fullscreen": true in popup.open ([#822](https://github.com/hdering/ioBroker.aura/issues/822))
- Tab bar - a menu element set to "Center" now stands in the middle of the bar even when the tabs are aligned left or right; it used to appear on the right ([#820](https://github.com/hdering/ioBroker.aura/issues/820))
- Aura now ships a web app manifest with proper icons, so "Install" / "Add to Home Screen" in Chrome, Edge, Android and iOS creates an app named Aura with its own icon that opens without browser bars ([#823](https://github.com/hdering/ioBroker.aura/issues/823))
- 🌟 **New feature:** Shutter - new control mode "Move DP (up/down)" for actuators with a single up/down object such as KNX (DPT 1.008): one datapoint gets false for up and true for down, the values are configurable; the shutter popup now also uses the up/down datapoints of push-button and move mode
- Timer - astro events (sunrise/sunset) now reliably show their time in the frontend; on a slow connection the location was read before the connection was up, so only the sun symbol appeared until the next reload ([#498](https://github.com/hdering/ioBroker.aura/issues/498))

### 0.89.0 (2026-10-21)
- Settings - CSS/JS context chips mark the layouts where custom CSS or JS is switched on ([#818](https://github.com/hdering/ioBroker.aura/issues/818))
- 🌟 **New feature:** Shutter - new "Circle menu" layout: a round button that fans out open, quick-select positions, close and stop in a circle, in an adjustable order ([#815](https://github.com/hdering/ioBroker.aura/issues/815))

### 0.88.0 (2026-10-20)
- 🌟 **New feature:** Countdown - font size of the preset chips and the status text can now be set individually ([#812](https://github.com/hdering/ioBroker.aura/issues/812))
- 🌟 **New feature:** Switch - new control style "Button" with per-state caption and colours; the universal widget's switch cell gains the control style "Image"; both image modes take a URL, Base64, a file from the server or an upload from the PC
- iFrame - the fullscreen button now sits under Appearance like on every other widget, with corner choice, the "Fill screen" option and permanent visibility on touch devices; the embedded page stays operable in fullscreen ([#813](https://github.com/hdering/ioBroker.aura/issues/813))
- Theme editor - every field now shows the name of its CSS variable (e.g. `--app-surface`); a click copies it as `var(...)` ([#814](https://github.com/hdering/ioBroker.aura/issues/814))
- Section menu - the slide-in drawer is no longer see-through on the glass themes, and "Navigation → background" now colours the drawer and the docked sidebar like the section and tab bars ([#814](https://github.com/hdering/ioBroker.aura/issues/814))
- 🌟 **New feature:** Value conversion - new option "Adjust unit automatically": the value moves to the next unit prefix from 1000 up and below 1 down (850 Wh, 1.25 kWh, 3.4 MWh; also W, VA, V, A, Hz, g, m, l, bytes), with separate decimal places for the larger unit; works in the value widget, both lists including the second line and the universal widget's datapoint cell

### 0.87.1 (2026-10-20)
- iFrame - Energiefluss-erweitert pages now embed without the white box behind the diagram in dark themes ([#642](https://github.com/hdering/ioBroker.aura/issues/642))
- Energy flow (evcc) - new switch to invert the sign of a manual battery power datapoint that reports positive = charging ([#803](https://github.com/hdering/ioBroker.aura/issues/803))
- Chart (distribution) - font size of the group title, total, legend and percentage labels can now be set individually ([#804](https://github.com/hdering/ioBroker.aura/issues/804))

### 0.87.0 (2026-10-19)
- 🌟 **New feature:** Countdown - can start automatically when a watched datapoint switches on, e.g. turn a plug off 30 min after it was switched on elsewhere ([#796](https://github.com/hdering/ioBroker.aura/issues/796))
- 🌟 **New feature:** Lists and the status overview can publish their content to ioBroker (count, JSON list and ready-to-send text of the shown rows), computed by the adapter even without an open browser - e.g. for an evening report by mail or Telegram ([#798](https://github.com/hdering/ioBroker.aura/issues/798))
- Admin - the instance (e.g. aura.1) is shown next to the version in the sidebar, so several Aura instances can be told apart at a glance ([#801](https://github.com/hdering/ioBroker.aura/issues/801))

### 0.86.0 (2026-10-19)
- 🌟 **New feature:** List - value conversion can call your own functions from Custom JS: register them with aura.registerFn and use callback("name", dp) in the expression ([#794](https://github.com/hdering/ioBroker.aura/issues/794))
- Admin overview - "Getting started" and "AI access (MCP)" cards can be shown and hidden again via two switches in the page header ([#799](https://github.com/hdering/ioBroker.aura/issues/799))
- Groups - group contents could be wiped when the admin page was opened while the adapter was still restarting (e.g. right after an update); failed config reads are now retried instead of being taken as an empty config, and empty group contents are never saved over existing groups ([#800](https://github.com/hdering/ioBroker.aura/issues/800))

### 0.85.0 (2026-10-18)
- Map - all sections of the map settings now start folded when the settings open
- 🌟 **New feature:** Universal Widget / Custom layout - optional vertical and/or horizontal separator lines between the grid cells, with adjustable colour and thickness ([#793](https://github.com/hdering/ioBroker.aura/issues/793))
- 🌟 **New feature:** Device widgets - any number of own status symbols next to battery / reach / window (e.g. motion sensor locked), optionally toggled by a click, with a freely adjustable order; also placeable as single custom layout cells; the status row can sit in any corner or on the card edge so it no longer covers switches and sliders, and the fill level, air control, alarm, button, camera, gauge, evcc, calendar, trash, trash schedule, map, HTML and universal widgets show it too ([#792](https://github.com/hdering/ioBroker.aura/issues/792))
- AI assistant (MCP) - height check now computes the status overview card grid (columns, wrapped names, the +N more line) and warns when maxRows needs more rows than fit; the browser check reports the remaining space in px, treats a 1 px overflow as scrolling and can fill runtime lists to their worst case
- Settings - every widget dialog follows the same frame: "Visible fields" (show/hide toggles), "Datapoints", "Settings" (widget topics as sub-headings), "Look" and "Behavior", then the status datapoints; all sections start folded and look the same
- 🌟 **New feature:** Lists - the "+ datapoint of the device" picker for the second line now shows the object ID next to the name ([#795](https://github.com/hdering/ioBroker.aura/issues/795))
- 🌟 **New feature:** Static list - an entry can show one field of a JSON datapoint (JSON path button next to the datapoint), and the value conversion of both lists gains an "Expression" mode, e.g. `dp.objektName * 0.4 | fixed(2)` ([#794](https://github.com/hdering/ioBroker.aura/issues/794))
- Load times - the settings no longer show a datapoint field the widget does not use
- Settings - the layout row now shows for every widget, also where "Standard" is the only layout; the camera lists "Standard" first and calls its grid layout "Custom"; the section title picks its style under "Look"
- AI assistant (MCP) - device card and popup children with {{dp}} / {{parent}} placeholders are no longer rejected as missing datapoints when the shared layout is changed ([#789](https://github.com/hdering/ioBroker.aura/issues/789))
- Map - the satellite view now shows place names and borders on top of the imagery (switchable in the settings) ([#797](https://github.com/hdering/ioBroker.aura/issues/797))

### 0.84.0 (2026-10-17)
- Tab bar - a menu item next to left- or right-aligned tabs now only takes its own width instead of half the bar ([#791](https://github.com/hdering/ioBroker.aura/issues/791))
- 🌟 **New feature:** Map - show a route along the roads between two markers, with distance and travel time ([#790](https://github.com/hdering/ioBroker.aura/issues/790))
- 🌟 **New feature:** Map - draw recorded tracks from a JSON datapoint or from the history of a position datapoint, optionally with a dot per point showing time, speed and accuracy ([#410](https://github.com/hdering/ioBroker.aura/issues/410))
- 🌟 **New feature:** Map - day bar to browse recorded tracks day by day, chips to switch between lines, and a timeline of stays and trips with addresses under the map ([#410](https://github.com/hdering/ioBroker.aura/issues/410))
- 🌟 **New feature:** Map - the settings are grouped into collapsible sections, and each marker, line and quick-access chip folds down to its name
- 🌟 **New feature:** Map - a custom tile server can no longer be set up; maps that already use one keep it and can remove it in the settings

### 0.83.3 (2026-10-16)
- Overview - timers inside groups or device cards are no longer reported as orphaned datapoints on the first visit ([#788](https://github.com/hdering/ioBroker.aura/issues/788))
- 🌟 **New feature:** Group action - a click from the mixed state can now ask "all on or all off?" in a small popup (new option "Ask")

### 0.83.2 (2026-10-16)
- Popups - a web page (iFrame) popup now uses the configured width and height
- Frontend - tapping a widget on a touch tablet no longer selects the text on the whole page

### 0.83.1 (2026-10-16)
- Icons whose name contains a number (e.g. trash, table, layers, bar chart) were requested under a wrong name, so they never showed and logged "icon cache — fetch failed" without internet access ([#787](https://github.com/hdering/ioBroker.aura/issues/787))
- Messages - a message closed by a script (messages.dismiss) stayed open when another message was sent in the same moment, e.g. an error followed by its all-clear

### 0.83.0 (2026-10-15)
- Web adapter extension - with socket.io, the web adapter's WebSocket listeners are no longer re-wired; Aura only adds its own for /aura/ ([#784](https://github.com/hdering/ioBroker.aura/issues/784))
- 🌟 **New feature:** Timer - holiday and vacation days can be picked with a date picker in the frontend (special-days button next to the add-event button, labelled with the current or next special day) and are written to the holiday / vacation datapoint; flag datapoints are only shown ([#785](https://github.com/hdering/ioBroker.aura/issues/785))

### 0.82.10 (2026-10-14)
- 🌟 **New feature:** Popups - optional countdown in a corner of the popup (top/bottom, left/right) showing the seconds until it closes automatically

### 0.82.9 (2026-10-14)
- Advanced chart - the current-time line on a category axis now shows which label it hits, warns when none matches and offers the labels from the data to pick from
- MCP - the per-widget "last change" display options are now part of the widget schema; three false validator warnings are gone (frame options called ineffective, universal widget with a custom grid but no defId, JSON chart on a string datapoint)
- Timer - switches more reliably: an edited entry fires again on the same day when its time is moved later, an entry saved while the connection was briefly lost is sent again on reconnect, one broken entry no longer stops all other timers, and an event due in the split second between two checks is no longer skipped ([#778](https://github.com/hdering/ioBroker.aura/issues/778))
- Timer - inside a popup view or a device card, a timer whose target uses a placeholder like {{dp}} now keeps its own schedule and entries per device; before, all devices shared one schedule that only switched the device opened last ([#778](https://github.com/hdering/ioBroker.aura/issues/778))
- Countdown - inside a popup view or a device card, a countdown whose target uses a placeholder like {{dp}} now runs separately per device; before, starting it for one device ran it for the device shown last ([#778](https://github.com/hdering/ioBroker.aura/issues/778))
- Media player - shuffle and repeat now show their current state (accent color with a dot) and switch the mode back off on a second click (repeat steps through off / all / one); the cover no longer sticks to the previous track or freezes with Sonos ([#782](https://github.com/hdering/ioBroker.aura/issues/782))

### 0.82.8 (2026-10-13)
- Energy flow (evcc) - datapoint picker next to the production, consumption, grid and battery fields; with an evcc instance as source these fields now fill in automatically

### 0.82.7 (2026-10-13)
- Advanced chart - the current-time line also works on a JSON category axis, placed at the label containing a chosen text (e.g. "now")

## License

MIT License

Copyright (c) 2026 hdering <aura@dering-online.de>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.