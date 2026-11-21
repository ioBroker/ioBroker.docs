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

## Messages for scripts and AI agents

`sendTo('aura.0', 'help', {})` answers with a description of the messages (`notify`, scenes, `staggeredWrite`, …) and the command states of Aura for AI agents (e.g. pi-agent) and script authors; the answer lists all commands with `write` (whether a command changes something).

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

### 1.4.0-next.0 (2026-11-21) — next/test release
- 🌟 **New feature:** Add widget dialog - the "Web components" section shows how many components are available
- 🌟 **New feature:** Status overview - the many settings moved from the options panel into a tabbed dialog "Configure status overview" (categories with a list on the left and their settings on the right, datapoints, reminder list, rows, names, battery types); the panel keeps only the quick display options
- 🌟 **New feature:** Status overview - new setting "Additional battery datapoints" in the battery category: datapoints matching these patterns (text or /regex/) count as batteries even without a battery role, e.g. Shelly devices mirrored over MQTT; numbers or text are read as a level in %, booleans as a low-battery flag

### 1.3.0-next.0 (2026-11-20) — next/test release
- 🐛 **Bug fix:** Status overview - aliases filed as alias.0.<room>.<device>.<state> now count as one device each instead of the whole room folder, so a percent battery alias no longer hides the voltage and LOWBAT aliases of the other devices in that room; device names and the battery level lookup follow ([#1002](https://github.com/hdering/ioBroker.aura/issues/1002))
- 🌟 **New feature:** Status overview - new layout "Table": every part of a row is a column lined up across all rows, so values, battery types and rooms sit under each other, with a header row of column names; new "Row layout" setting to order, place (left / behind the name / right; two-line layout: line 1 / line 2 / right) and hide the parts of a row, e.g. the battery type before the value ([#1003](https://github.com/hdering/ioBroker.aura/issues/1003))
- 🌟 **New feature:** Adapter - new message "help": a description of all messages for AI agents (e.g. pi-agent) and script authors, and common.supportedMessages.help
- 🌟 **New feature:** Datapoint picker - new "Pin filters" button: the chosen filters (e.g. adapter "alias") are remembered and every picker opens with them; changes are kept while pinned, "Unpin" goes back to the default ([#1005](https://github.com/hdering/ioBroker.aura/issues/1005))
- 🌟 **New feature:** Click actions - the URL of "External link" and "iFrame popup" may contain datapoint placeholders: {dp} is the value of the clicked list row (or the widget's datapoint), {adapter.0.id} that of any datapoint; e.g. http://{dp}/ opens an IP stored in a datapoint, a missing http:// is added ([#1006](https://github.com/hdering/ioBroker.aura/issues/1006))

### 1.2.0-next.0 (2026-11-19) — next/test release
- 🌟 **New feature:** Web components - bind the value a component edits (e.g. a schedule or a list) to a datapoint (new widget option value datapoint); JSON text arrives as an object and changes are written back ([#958](https://github.com/hdering/ioBroker.aura/issues/958))
- 🐛 **Bug fix:** Status overview - mains-powered HomeMatic IP devices (plugs, switches, dimmers) whose OPERATING_VOLTAGE reads 0 V are no longer reported as weak batteries; entries already remembered for them disappear ([#1000](https://github.com/hdering/ioBroker.aura/issues/1000))
- 🌟 **New feature:** Status overview - new "Detected datapoints" list in the widget editor: every found datapoint has a checkbox to hide it (stored in the existing exclusion list), and an alias and the datapoint it reads from are marked as duplicates, with one click to hide all originals or all aliases ([#1002](https://github.com/hdering/ioBroker.aura/issues/1002))

### 1.1.0-next.3 (2026-11-18) — next/test release
- 🌟 **New feature:** Status overview - choose which battery datapoints count: boolean (LOWBAT), percent, volt and millivolt, with an own warning threshold in volts; a device shows one row (percent before voltage before LOWBAT), so battery voltages like OPERATING_VOLTAGE or a Zigbee "voltage" can be listed all the time ([#1000](https://github.com/hdering/ioBroker.aura/issues/1000))
- 🐛 **Bug fix:** Status overview - the adapter field under "Restriction" is now labelled as an include filter ("only these adapters, empty = all"), and the exclusion pattern shows how to hide a whole adapter ([#998](https://github.com/hdering/ioBroker.aura/issues/998))
- 🌟 **New feature:** Web components - when a component cannot be loaded, the widget now says why: its file is not served (upload the adapter again) or the shared React (/lib/esm/react-19.js) is missing, which behind the web extension needs web 9.2.0; the backend check ("Check backend") reports the same for the web extension's instance; behind the web extension (<web>/aura/) with web before 9.2.0, Aura now serves /lib/esm/react-19.js itself, so web components such as flow, TR-064 or Laundrylens load there too (after a restart of the web instance)
- 🐛 **Bug fix:** Universal widget (custom grid) - a cell without its own horizontal alignment is centred; the editor now marks "Centre" for it instead of "Left", so choosing "Left" takes effect right away ([#1001](https://github.com/hdering/ioBroker.aura/issues/1001))

### 1.1.0-next.2 (2026-11-17) — next/test release
- 🐛 **Bug fix:** Last change - the datapoint field for the timestamp is now also shown when the widget has its own datapoint; a fixed id left there (e.g. in a device card child) made every card show the same time and could not be seen or cleared ([#996](https://github.com/hdering/ioBroker.aura/issues/996))

### 1.1.0-next.1 (2026-11-17) — next/test release
- 🐛 **Bug fix:** Status overview - classic HomeMatic window/door contacts (role value.window, e.g. HM-Sec-SCo) are now found, one row per window; a heating group's window state no longer duplicates the contacts of its room
- 🌟 **New feature:** Status overview - better default names: generic channel names like "Channel sensor" give way to the device name, and a state name repeating its channel ("X:0.LOW_BAT") loses the prefix; new name filter preset to drop the HomeMatic channel number
- 🌟 **New feature:** Status overview - own display names per device ("Edit device names"), used for every row of the device, the remembered hints and the history

### 1.1.0-next.0 (2026-11-16) — next/test release
- 🐛 **Bug fix:** Adapter - no more "adapter is shutting down" warnings and "Connection is closed" rejection when the instance restarts itself right after an update
- 🌟 **New feature:** The loading bar along the top edge also runs while the connection to ioBroker is being established (start-up, reconnect) until the offline banner appears, so a page without any hint is always current

### 1.0.2 (2026-11-15)
- 🌟 **New feature:** Thin loading bar along the top edge while the values are refreshed after the app wakes up or reconnects ([#992](https://github.com/hdering/ioBroker.aura/issues/992))
- 🌟 **New feature:** Circle menu - hide single entries (e.g. Stop for shutters, −/+ for thermostats) with the eye in the order list; thermostat and room climate can drop the setpoint in the middle of the open menu ([#993](https://github.com/hdering/ioBroker.aura/issues/993))

### 1.0.1 (2026-11-15)
- 🐛 **Bug fix:** Clients - a client delete via clients.deleteRequest written with ack=true is now ignored and logged instead of executed; write it without ack
- 🐛 **Bug fix:** Network requests to the WebSocket proxy and through the web extension now time out instead of hanging
- 🐛 **Bug fix:** Device card - without frame, its widgets no longer end short on the right in the phone/tablet stack in browsers with classic scrollbars such as Fully Kiosk ([#989](https://github.com/hdering/ioBroker.aura/issues/989))
- 🌟 **New feature:** Section menu - new option to pin the hamburger in the tab bar, so it stays reachable when a tab further along is open (mainly on phones)
- 🐛 **Bug fix:** Tab bar - with centred or right-aligned tabs on phones, the section-menu hamburger was cut off and the first tabs could not be scrolled into view

### 1.0.0 (2026-11-14)
- 🐛 **Bug fix:** Device card - a frameless card no longer shows a phantom border (offset and wider gaps) on tablet and phone ([#989](https://github.com/hdering/ioBroker.aura/issues/989))
- 🐛 **Bug fix:** Device card - the last-change timestamp of a child whose datapoint uses {{parent}} is shown again ([#989](https://github.com/hdering/ioBroker.aura/issues/989))

### 0.115.1 (2026-11-14)
- 🐛 **Bug fix:** Group - a mirrored device card or group no longer scrolls inside a group on phones and tablets ([#988](https://github.com/hdering/ioBroker.aura/issues/988))

### 0.115.0 (2026-11-13)
- 🌟 **New feature:** Editor - arrange mode on touch devices: tap a widget, drag its grip to move it and its corner to resize it on tablets and phones ([#699](https://github.com/hdering/ioBroker.aura/issues/699))
- 🌟 **New feature:** Editor - a short note when "scale like the frontend" is switched on, explaining that the shown heights follow the preview while the design grid is saved

### 0.114.2 (2026-11-13)
- 🌟 **New feature:** Group / Device card - new "No frame" option: no background, border or inner spacing, the widgets inside sit on the tab grid with the same edges and height as outside ([#981](https://github.com/hdering/ioBroker.aura/issues/981))
- 🌟 **New feature:** Editor - resizing a widget shows its live size (grid cells and px) ([#981](https://github.com/hdering/ioBroker.aura/issues/981))
- 🌟 **New feature:** Editor - nested groups without a header (e.g. a device card in a group) no longer stack their toolbars: the innermost one is shown, a button switches to the parent, and each level has its own colour ([#981](https://github.com/hdering/ioBroker.aura/issues/981))
- 🐛 **Bug fix:** Editor - a widget menu opened inside a group or device card now closes on a click into an empty spot of the group ([#981](https://github.com/hdering/ioBroker.aura/issues/981))
- 🌟 **New feature:** Editor - new toolbar switch "Scale like the frontend": with the fluid grid the editor shows the widgets stretched exactly as the frontend does on the guidelines' target size; positions are still stored in grid cells ([#981](https://github.com/hdering/ioBroker.aura/issues/981))

### 0.114.1 (2026-11-13)
- 🐛 **Bug fix:** Editor - dragging a widget no longer stutters: the grid library is back on the smooth version (react-grid-layout 2.2.4), its text is not selected any more, picking a widget up no longer restyles the whole page, widgets making room jump to their place instead of gliding, dropping no longer re-renders every widget on the page, the admin editor no longer re-renders four times a second while idle, and returning to the browser window no longer re-reads every datapoint while the first drag runs ([#982](https://github.com/hdering/ioBroker.aura/issues/982))

### 0.114.0 (2026-11-13)
- 🐛 **Bug fix:** Datapoints - object names of timers, status overview and published lists are now English, and popup.close is a write-only button
- 🐛 **Bug fix:** Security - the built-in proxy (iframes, HTTP requests, feeds) no longer reaches services on the ioBroker host itself (localhost) or link-local addresses, and proxy and file routes refuse requests from foreign web pages; LAN devices stay reachable - use the LAN IP instead of localhost
- 🐛 **Bug fix:** Countdowns, announcements, status overview and published lists - a command to a device datapoint (not yet confirmed by its adapter) no longer counts as a value; script datapoints under 0_userdata and javascript still count right away
- 🐛 **Bug fix:** Client datapoints - reported values (lastSeen, screen resolution, idle.active, idle.enabled, speech.playing) are now read-only, and the auto-return and idle delays use the role level.timer
- 🌟 **New feature:** Instance settings - all texts of the adapter configuration are now available in all eleven admin languages
- 🐛 **Bug fix:** Speech output - SayIt's default browser instance FFFFFFFF now plays on every dashboard instead of on none
- 🐛 **Bug fix:** Widget editor - a right-click in a field of the edit dialog (e.g. the datapoint field) no longer closes the dialog; the browser's copy/paste menu opens instead
- 🌟 **New feature:** Tab bar / section bar - when the active tab or section changes (swipe, address, auto-return, click), a scrolling bar now centres it; on page load without animation, a bar moved by hand stays put until the active entry changes; the active entry carries aria-current ([#979](https://github.com/hdering/ioBroker.aura/issues/979))
- 🌟 **New feature:** Shutter and thermostat - optional security prompt (Behavior › Sicherheitsabfrage): every drive, slat change or setpoint change asks first and shows the target (e.g. "Close", "40% open", "21.5 °C"); Stop never asks, and the sliders then always send on release ([#977](https://github.com/hdering/ioBroker.aura/issues/977))
- 🌟 **New feature:** Web components - the "add widget" dialog also lists the components of adapters that are not installed yet, with name and picture from the repository (adapters with @iobroker/web-components 0.8 or newer)

### 0.113.3 (2026-11-12)
- 🐛 **Bug fix:** PIN protection - the "Editable via MCP" switch no longer turns itself off when the dashboard is saved, and a protected view no longer answers "wrong PIN" after a save that held it only as a locked placeholder
- 🐛 **Bug fix:** PIN protection - a tab the MCP added to a protected area no longer disappears when the admin editor saves before it has loaded that tab
- 🐛 **Bug fix:** Admin settings - the "Reachable on" option and its web-instance hint are now translated into all admin languages

### 0.113.2 (2026-11-12)
- 🐛 **Bug fix:** Web components - after an adapter update the browser loads the new files of its components instead of cached ones ([#954](https://github.com/hdering/ioBroker.aura/issues/954))
- 🐛 **Bug fix:** Thermostat - with a Homematic MANU_MODE datapoint the widget now shows the setpoint from SET_TEMPERATURE, so changes made on the device itself appear ([#973](https://github.com/hdering/ioBroker.aura/issues/973))
- 🌟 **New feature:** Timer and group actions - optional delay between target datapoints, so e.g. several shutters start one after another instead of all at once; the adapter runs the sequence and stop always acts on all at once ([#974](https://github.com/hdering/ioBroker.aura/issues/974))
- 🌟 **New feature:** Web components - settings of type selectSendTo and autocompleteSendTo (@iobroker/web-components 0.8) show the choices the adapter returns instead of a plain text field, e.g. the location of openmeteo-notify ([#975](https://github.com/hdering/ioBroker.aura/issues/975))

### 0.113.1 (2026-11-11)
- 🐛 **Bug fix:** PIN-protected sections - an unlocked view now picks up changes made via MCP (edited widgets, new tabs) without a page reload

### 0.113.0 (2026-11-11)
- 🌟 **New feature:** Adapter logs - all five ioBroker log levels (Silly, Debug, Info, Warn, Error) can be filtered separately; Silly entries no longer appear under Debug ([#969](https://github.com/hdering/ioBroker.aura/issues/969))
- 🌟 **New feature:** Adapter logs - adjustable font size for the log table ([#970](https://github.com/hdering/ioBroker.aura/issues/970))
- 🌟 **New feature:** Adapter status - adjustable font size and larger restart/update buttons with bigger touch targets ([#971](https://github.com/hdering/ioBroker.aura/issues/971))
- 🌟 **New feature:** Layouts - flow columns can be filled by height (masonry) or compactly with as few columns as needed, centred; columns are only re-dealt when a tab opens or the window width changes ([#939](https://github.com/hdering/ioBroker.aura/issues/939))

### 0.112.1 (2026-11-10)
- 🐛 **Bug fix:** MCP - a tab created in a PIN-protected section now goes into the PIN vault when the section is released for MCP editing, and is refused otherwise; the editor and "remove PIN" no longer drop tabs that exist only in the tab bar

## License

MIT License

Copyright (c) 2026 hdering <aura@dering-online.de>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.