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

### 0.80.1 (2026-10-08)
- Status overview - new layout "Recently changed" (history): lists every closed hint the adapter recorded in aura.0.status.<category>.history (survives restarts) with relative date, "by button" or "detected automatically", how long the battery was weak and how long the previous one lasted; "Reopen" takes back a change confirmed by mistake (reopen:<id>@<time> on .cmd); import:<JSON> on .cmd and a one-time takeover of 0_userdata.0.Batterien.Verlauf bring in an older record; retention is set in the instance settings (default 50 changes / 2 years)

### 0.80.0 (2026-10-08)
- Advanced chart - value labels at the chart edges no longer overlap the y-axis numbers or snap back over the edge after a redraw ([#703](https://github.com/hdering/ioBroker.aura/issues/703))
- 🌟 **New feature:** History table - new widget that lists the recorded values of a datapoint from a history adapter (history, sql, influxdb): the last N values or a time range, with date and time in one or two columns ([#760](https://github.com/hdering/ioBroker.aura/issues/760))
- Advanced chart - series aggregated as max, min or sum (and averages over 30 days and more) no longer end in a spike to the live value at the right edge; the current value above the chart still shows the live reading

### 0.79.0 (2026-10-08)
- 🌟 **New feature:** Status overview - new layout "Two lines": severity dot, bold device name, reading and facts on a second line, large touch buttons ("2 days later", "Replaced" with a second-tap confirmation)
- Auto height - widgets with "fit height to content" (also inside groups) no longer keep empty space below their content when the fluid grid stretches its rows ([#759](https://github.com/hdering/ioBroker.aura/issues/759))
- Timer - schedule entries added in the frontend are no longer lost when the widget is edited in the admin open in the same browser ([#758](https://github.com/hdering/ioBroker.aura/issues/758))
- Timer - optional fixed value for vacation and holiday days: written once when the exception starts, regular events pause meanwhile and the normal schedule is restored when it ends ([#757](https://github.com/hdering/ioBroker.aura/issues/757))
- Fill level - LED segments: configurable segment count and a "fill width" option that adds segments to span wide (or tall) tiles ([#756](https://github.com/hdering/ioBroker.aura/issues/756))

### 0.78.1 (2026-10-06)
- Timer - entries added in a timer that sits inside a popup view are now saved and survive a page reload ([#750](https://github.com/hdering/ioBroker.aura/issues/750))

### 0.78.0 (2026-10-05)
- iFrame - "Keep alive" now keeps the page across tab and section switches, also with "Fill tab"; without it, a hidden iFrame is unloaded and reloads fresh when shown again ([#65](https://github.com/hdering/ioBroker.aura/issues/65))
- 🌟 **New feature:** Widgets, popups and tabs can have a background image (fit, alignment, darken): per widget under Edit → Advanced, for popups globally, per popup view and per click action, behind a tab per tab, section or layout ([#442](https://github.com/hdering/ioBroker.aura/issues/442))
- Status overview - weak batteries and unreachable devices can be remembered until they are closed ("Changed"/"Acknowledge") or put back ("Later"); the adapter keeps the list for all browsers, rechecks after closing, can close on a voltage jump, and offers aura.0.status.<category>.cmd/.event for scripts
- Status overview - configurable row buttons that write a value with placeholders ({id}, {device}, {serial}, {name}, {room}), optionally after a second tap; "since …" can also be shown for batteries and reachability

### 0.77.4 (2026-10-05)
Release v0.77.4

### 0.77.3 (2026-10-05)
- Shutter - quick-select buttons can set only the slat angle, and skip the drive when the blind is already at the preset position ([#745](https://github.com/hdering/ioBroker.aura/issues/745))

### 0.77.2 (2026-10-04)
- Adapter log - startup and routine status messages moved from info to debug, so the log stays quiet unless something needs attention

### 0.77.1 (2026-10-04)
- 🌟 **New feature:** "Show last change" can now show the last update instead (datapoint written, even with the same value) — in the widget display settings, carousel items, list entries, dynamic lists and custom cells
- Opening Aura below a path other than its root (e.g. an old .../aura/ bookmark) loads the dashboard again instead of a blank page - it now redirects to the root (regression in 0.77.0)

### 0.77.0 (2026-10-04)
- 🌟 **New feature:** Settings - optional web adapter extension: Aura can additionally be opened as <web-port>/aura/, e.g. from the ioBroker Visu App or the cloud adapter; off by default, port 8095 keeps working
- Settings - the chosen socket backend instance is no longer cleared on every adapter start

### 0.76.0 (2026-10-03)
- Editor - saving no longer closes the "Edit widget" dialog on a tab in a PIN-protected section ([#740](https://github.com/hdering/ioBroker.aura/issues/740))
- 🌟 **New feature:** Groups - "Fit height to content" now works for widgets inside a group; the group grows and shrinks with the list ([#741](https://github.com/hdering/ioBroker.aura/issues/741))
- 🌟 **New feature:** Advanced chart - comparison mode can show a legend; clicking an entry hides that bar ([#742](https://github.com/hdering/ioBroker.aura/issues/742))
- Universal widget - a dropdown cell whose entries do not include the current value now shows a dash instead of the raw value ([#744](https://github.com/hdering/ioBroker.aura/issues/744))
- Shutter - quick-select buttons for fixed positions, optionally with a slat angle ([#745](https://github.com/hdering/ioBroker.aura/issues/745))
- 🌟 **New feature:** Datapoint picker - the setpoint, humidity and pressure fields of the climate widget (and the battery fill and panel fields) now open the picker on their own datapoint instead of the temperature ([#746](https://github.com/hdering/ioBroker.aura/issues/746))
- 🌟 **New feature:** Colors - every widget color can be taken from a datapoint: enter {id} or [[id]] in the color picker, also as the light or dark half of a pair (e.g. WLED colors for icons) ([#747](https://github.com/hdering/ioBroker.aura/issues/747))
- 🌟 **New feature:** New widget "Device card" - build a card once with {{dp}}/{{parent}} placeholders and reuse it for any number of identical devices; copies share the layout, so a change applies to all cards, and linked cards get the same colored frame in the editor ([#743](https://github.com/hdering/ioBroker.aura/issues/743))

### 0.75.0 (2026-10-02)
- Shutter - the up/stop/down buttons work again in the card itself; in a flat card the value and slider row covered them, so only the popup reacted ([#739](https://github.com/hdering/ioBroker.aura/issues/739))
- 🌟 **New feature:** Trash schedule - new option to limit the number of entries shown, e.g. only the next 3 pickups ([#736](https://github.com/hdering/ioBroker.aura/issues/736))
- 🌟 **New feature:** Universal widget - text cells can run vertically: turned 90° clockwise, 90° counter-clockwise or as upright stacked letters ([#734](https://github.com/hdering/ioBroker.aura/issues/734))
- 🌟 **New feature:** Timer - holiday and vacation lists accept date ranges ("2026-07-20/2026-08-07" or {"from","to"}) next to single days, and a plain true/false datapoint; examples in the settings are collapsed ([#738](https://github.com/hdering/ioBroker.aura/issues/738))
- 🌟 **New feature:** Advanced chart - series can be shifted back in time to compare periods, e.g. last year's monthly consumption next to this year's bars; "+ Add previous-year series" creates one in a click ([#730](https://github.com/hdering/ioBroker.aura/issues/730))
- Dynamic list - removed datapoints no longer come back with the next automatic sync: with a filter set they are added to the exclude list, and "Delete all" clears the stored filter

### 0.74.0 (2026-10-01)
- 🌟 **New feature:** Adapter logs - the search field can be preset in the widget settings; the frontend starts filtered and the text can still be changed; several terms separated by "|" match any of them ([#727](https://github.com/hdering/ioBroker.aura/issues/727))
- Camera - MJPEG stream URLs (e.g. `.../stream.mjpeg`) now always play live; the refresh interval no longer reloads them every few seconds
- 🌟 **New feature:** Universal widget - the grid is no longer capped at 20 rows and columns ([#735](https://github.com/hdering/ioBroker.aura/issues/735))
- Camera - a player page that reports its state (eusec `stream.html`) pauses the stream timeout while it waits for the HomeBase or plays, and names the camera the station is busy with; "start on tap" now also works without a wake-up datapoint
- Frontend - changes made in a widget on any tab other than the one last opened in the editor (timer events and master switch, auto-list sync, widgets shown in a popup) were silently dropped; they are saved again. Timers inside a group are saved too ([#731](https://github.com/hdering/ioBroker.aura/issues/731))
- 🌟 **New feature:** Custom layout - each cell can have a background colour (with transparency), filling the cell or only as a label behind its text; keeps values readable on a photo in the Image widget ([#732](https://github.com/hdering/ioBroker.aura/issues/732))
- 🌟 **New feature:** Universal widget - row heights can be set as a ratio per row, like the column widths (e.g. 1 / 0.25 / 1 for a thin separator row), or to auto ([#737](https://github.com/hdering/ioBroker.aura/issues/737))

### 0.73.0 (2026-09-30)
- 🌟 **New feature:** Universal widget - each display cell (text, value, image, icon, …) can have its own click action, e.g. a different popup view per cell ([#729](https://github.com/hdering/ioBroker.aura/issues/729))

### 0.72.4 (2026-09-30)
- Widget header items: each item now has its own icon size, icon colour, text size and text colour ([#725](https://github.com/hdering/ioBroker.aura/issues/725))
- Widget header: title and icon settings (show, icon, icon size) moved from Appearance into the header dialog, so everything about the header is set in one place ([#725](https://github.com/hdering/ioBroker.aura/issues/725))
- Widget header: the widget icon can now be placed on any header slot, including the middle of row 1 and all three places of row 2 ([#725](https://github.com/hdering/ioBroker.aura/issues/725))
- Widget header: the widget's own title and icon get their own colour and size, and all header settings line up in columns ([#725](https://github.com/hdering/ioBroker.aura/issues/725))
- Custom CSS - plain rules on `.aura-widget-title` and `.aura-widget-icon` now reach every widget type, and the six header slots have their own classes ([#726](https://github.com/hdering/ioBroker.aura/issues/726))
- Widget fullscreen - a chart opened in fullscreen no longer stays empty on a phone in landscape ([#728](https://github.com/hdering/ioBroker.aura/issues/728))

### 0.72.3 (2026-09-29)
- 🌟 **New feature:** Section menu - elements in the sidebar / overlay menu can be aligned left, centered or right

### 0.72.2 (2026-09-29)
- Room climate - humidity can be drawn in the history chart (own right axis, selectable colour), and the temperature series can be switched off ([#724](https://github.com/hdering/ioBroker.aura/issues/724))
- Room climate - settings regrouped per value (show switch, datapoint, icon and unit side by side) with one history section; the chart legend is now switchable ([#724](https://github.com/hdering/ioBroker.aura/issues/724))

### 0.72.1 (2026-09-29)
- Section title widget: the minimal style now shows the title as typed instead of forcing capitals; a new "Title in capitals" switch works in every style ([#723](https://github.com/hdering/ioBroker.aura/issues/723))

### 0.72.0 (2026-09-29)
- 🌟 **New feature:** "Fit height to content" is now one option in the Appearance block and also available for lists, dynamic lists, the JSON table, messages and adapter logs; resizing such a widget in the editor shows a hint why its height is fixed

### 0.71.1 (2026-09-28)
- Icon picker - picking a PNG/GIF adapter icon now asks right away whether it keeps its colours or is drawn in the icon colour, and the current icon's colour setting can be switched later at the bottom of the picker ([#716](https://github.com/hdering/ioBroker.aura/issues/716))
- 🌟 **New feature:** Universal widget / custom layout - the colour fields of a "State icon" and "Switch" cell now show the colour the cell really draws when none is set, instead of a green that was never applied ([#716](https://github.com/hdering/ioBroker.aura/issues/716))
- 🌟 **New feature:** Header items - a centred title now stays in the middle of the card when values or buttons sit on the right, and items on "Row 1 centre" sit beside the title instead of covering it - left, right or below, chosen per item; the header editor shows the row that way. Lists keep their header line and divider when only header items are shown, with title and icon off. New "Row 1 left" place. Title and icon are now tiles in the header editor: tap or drag them to move the title (left, centre, right) and the icon (far left, before or after the title, far right), and the title can move to the second row; Appearance only switches them on and off ([#676](https://github.com/hdering/ioBroker.aura/issues/676))
- Widget editor - Appearance groups icon, title, icon picker/size and the header in one compact block, and gets a reset button like Advanced ([#676](https://github.com/hdering/ioBroker.aura/issues/676))
- Fill level - the "Bar" layout can show the value inside the bar, which then uses the width the label gave up; orientation and bar size are now settable for this layout too ([#719](https://github.com/hdering/ioBroker.aura/issues/719))
- Fill level / Universal widget - the bar's fill colour, unfilled area and the value's text colour over each part can be set separately, the same settings in the fill level bar and the progress cell; the progress cell can also show its value beside the bar ([#720](https://github.com/hdering/ioBroker.aura/issues/720))

## License

MIT License

Copyright (c) 2026 hdering <aura@dering-online.de>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.