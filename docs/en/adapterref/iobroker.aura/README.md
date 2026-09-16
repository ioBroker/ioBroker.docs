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
| **ioBroker socket port** | `8082` | Port of the `iobroker.web` instance that provides the socket.io connection |
| **Web adapter uses HTTPS** | off | Enable if that web instance runs HTTPS |

> **Requirement:** A running `iobroker.web` (or `iobroker.socketio`) instance must serve socket.io on
> the configured socket port. The stock `web.0` with **socket.io = integrated** provides this on
> port `8082` (the default). Aura auto-detects the matching instance and proxies the connection
> internally, so no `/aura/` path or web extension is needed anymore.

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

### 0.60.5 (2026-09-16)
- Gauge, Dial, Level and Slider - the scale now starts on the range the datapoint declares (common.min/max) instead of always 0...100; an existing widget gets a one-click hint in the editor ([#665](https://github.com/hdering/ioBroker.aura/issues/665))
- Diagnostics - the `?diag=1` report now names the elements a redraw loop mounts and discards, and counts state changes, reconnects and subscribed datapoints even when the report was opened on a page that was already running ([#636](https://github.com/hdering/ioBroker.aura/issues/636))

### 0.60.4 (2026-09-16)
- Safe area of the screen is now respected: on notched phones and installed web apps the content stays clear of the status bar and gesture bar, and the freed strip takes the colour of the adjacent bar - this also hides the blur iOS 26/27 paints over the top edge ([#662](https://github.com/hdering/ioBroker.aura/issues/662))
- iFrame widget - the embedded page now follows Aura's light/dark theme instead of the device setting; a new setting switches it back to the device or to a neutral transparent frame (Safari and Firefox only, Chrome always follows the device) ([#663](https://github.com/hdering/ioBroker.aura/issues/663))
- Diagnostics - the `?diag=1` report now names the widget a redraw loop happens in, splits the DOM changes by kind, and can be opened on a page that is already running (the socket counters say when they were switched on too late to count) ([#636](https://github.com/hdering/ioBroker.aura/issues/636))

### 0.60.3 (2026-09-16)
- Diagnostics - the `?diag=1` report now also measures what the page is doing: repaint rate, DOM changes, blocked main thread, socket messages and reconnects ([#636](https://github.com/hdering/ioBroker.aura/issues/636))

### 0.60.2 (2026-09-15)
- Custom CSS - the tab button in the tab bar is now `.aura-tab-btn`; `.aura-tab` again matches only a tab's content area ([#648](https://github.com/hdering/ioBroker.aura/issues/648))
- Documentation - new reference page listing every CSS class, data attribute and variable custom CSS can target ([#648](https://github.com/hdering/ioBroker.aura/issues/648))
- 🌟 **New feature:** Tab bar and section bar - new menu position "Even" spreads the entries over the full bar width, so the active marker runs wider than the label ([#661](https://github.com/hdering/ioBroker.aura/issues/661))

### 0.60.1 (2026-09-15)
- 🌟 **New feature:** Every widget can wrap long text over up to 4 lines instead of cutting it off (Design > Text wrap) ([#653](https://github.com/hdering/ioBroker.aura/issues/653))

### 0.60.0 (2026-09-15)
- 🌟 **New feature:** Keyboard shortcuts on Mac, iPad and iPhone now accept Cmd (and Option for copy-drag) and hint the matching key symbols ([#651](https://github.com/hdering/ioBroker.aura/issues/651))
- 🌟 **New feature:** Add widget - a search box filters the list as you type, and non-matching entries are hidden ([#652](https://github.com/hdering/ioBroker.aura/issues/652))
- Add widget - picking a type no longer adds it right away, so its hint stays readable and another type can be chosen ([#652](https://github.com/hdering/ioBroker.aura/issues/652))
- 🌟 **New feature:** Custom CSS - the tab bar carries .aura-tabs-top / .aura-tabs-bottom, so a rule can pad the footer bar only, and each tab carries .aura-tab / .aura-tab-active
- 🌟 **New feature:** AC control - Daikin air conditioners (daikin-cloud) can be picked as a manufacturer, filling every datapoint from one device ([#650](https://github.com/hdering/ioBroker.aura/issues/650))
- 🌟 **New feature:** AC control - setpoint, fan speed and vanes follow the operation mode where a device keeps one datapoint per mode, and take their limits from it ([#650](https://github.com/hdering/ioBroker.aura/issues/650))
- 🌟 **New feature:** AC control - vane positions are selectable, with a Powerful button and room humidity alongside them ([#650](https://github.com/hdering/ioBroker.aura/issues/650))
- 🌟 **New feature:** Widgets can show a fullscreen button, so a chart or list fills the screen on a phone ([#644](https://github.com/hdering/ioBroker.aura/issues/644))
- 🌟 **New feature:** Editor - a right-click opens the widget menu, where a single entry copies a widget's look and pastes it onto the next one: the full style within the same widget type, the card look (transparency, own CSS variables, title and icon) across types ([#654](https://github.com/hdering/ioBroker.aura/issues/654))
- Editor - widget controls are locked while designing, so a click picks up the card instead of switching the real device; the toolbar padlock unlocks them ([#655](https://github.com/hdering/ioBroker.aura/issues/655))
- 🌟 **New feature:** Tab bar - a footer bar marks the active tab with a line above the icon; the marker side is configurable ([#657](https://github.com/hdering/ioBroker.aura/issues/657))
- Theme - the navigation can cast a shadow: Design -> Theme -> Navigation has its own shadow field ([#640](https://github.com/hdering/ioBroker.aura/issues/640))
- Theme - switching light/dark in the header no longer keeps a colour from the other half, so the navigation background follows the design again ([#640](https://github.com/hdering/ioBroker.aura/issues/640))
- Theme - Navigation and Header moved to the top of the colour list, and the icon fields show the colour they really inherit instead of the accent ([#640](https://github.com/hdering/ioBroker.aura/issues/640))
- Theme - the Design page opens on the brightness that is on screen, so a colour set there is visible right away; pick "Shared" to set both ([#640](https://github.com/hdering/ioBroker.aura/issues/640))
- Theme - the header's light/dark button no longer switches the automatic one off: the next system switch, or a second press, hands the brightness back to it ([#640](https://github.com/hdering/ioBroker.aura/issues/640))

### 0.59.4 (2026-09-14)
- HTML widget - buttons and sliders in your own HTML can now write datapoints: aura.setState / toggle / getState / subscribe / sendTo, with ready-made examples in the editor ([#649](https://github.com/hdering/ioBroker.aura/issues/649))

### 0.59.3 (2026-09-13)
- AI assistant - the shipped widget schema, recipes and theme tokens are back in step with the app, so the newest options (slider scale, list timestamps, select cells, tab badges, own themes) are visible to a connected AI again, and the slider scale is now part of the measured minimum heights it plans with
- Theme - own colours for the navigation icons (tab bar, section bar/menu, menu widget) plus a colour for inactive labels; the section navigation now follows the navigation colours instead of the accent ([#640](https://github.com/hdering/ioBroker.aura/issues/640))
- Theme - the active chip colour is no longer overruled by the accent: the carousel honours it too and the tint behind an active chip is painted again ([#640](https://github.com/hdering/ioBroker.aura/issues/640))
- Theme - the light/dark choice above and below the theme editor is one choice now, and saving an own theme captures the half you are editing instead of the one your admin browser happens to show ([#640](https://github.com/hdering/ioBroker.aura/issues/640))

### 0.59.2 (2026-09-13)
- 🌟 **New feature:** Slider - optional scale showing the step values, min and max along the track; available in the Slider widget, list rows and the universal widget's slider cell ([#643](https://github.com/hdering/ioBroker.aura/issues/643))
- iFrame and HTML widgets - on phones the frame keeps its dashboard aspect ratio instead of the full row height, so the embedded page no longer sits in a tall empty box ([#645](https://github.com/hdering/ioBroker.aura/issues/645))
- 🌟 **New feature:** Static and dynamic list - a datapoint in the second line can show when it last changed (or was last written) instead of its value; relative by default, with time and date formats available, and an empty datapoint id means the row own datapoint ([#646](https://github.com/hdering/ioBroker.aura/issues/646))

### 0.59.1 (2026-09-13)
- Auto-return pause element - choose icon only, label only or both, with or without background

### 0.59.0 (2026-09-13)
- 🌟 **New feature:** Markers - the aggregate count of a tab or section can now count only conditional markers or sum the numbers of count markers, and a single marker can be excluded from it
- 🌟 **New feature:** Settings - with "theme follows browser" the light and the dark theme can now be picked and fine-tuned separately: the preset grid stays usable and CSS variables have a shared, a light and a dark tab ([#640](https://github.com/hdering/ioBroker.aura/issues/640))
- 🌟 **New feature:** Settings - own themes can be saved, renamed, duplicated, exported and imported, and are offered wherever a theme is picked - including as the light or dark half of the browser sync ([#640](https://github.com/hdering/ioBroker.aura/issues/640))

### 0.58.3 (2026-09-13)
- Diagnostics - add `?diag=1` to the dashboard URL to get an on-device report (icons, which bundle is running, what is on the wire, which background tabs still stream) for bug reports ([#636](https://github.com/hdering/ioBroker.aura/issues/636))
- Tab bar - hidden and disabled tabs no longer count towards the bar: a section left with a single visible tab shows no tab bar

### 0.58.2 (2026-09-12)
- Icons - icons that still have to be fetched on a cold device are now forced to repaint, so they no longer stay invisible on Android until you touch the screen ([#636](https://github.com/hdering/ioBroker.aura/issues/636))
- Menu elements - a widget added to the header, tab bar or section menu now starts at the size it would have on a dashboard and is resized by dragging the corner of its preview, pixel by pixel; the width/height fields and the per-element layout picker are gone, a new element opens itself and the whole row toggles it ([#634](https://github.com/hdering/ioBroker.aura/issues/634))

### 0.58.1 (2026-09-12)
- 🌟 **New feature:** Auto-return - new "Pause" element for the header, tab bar and section menu: one tap keeps the device on the page you are looking at, and the pause ends by itself ([#638](https://github.com/hdering/ioBroker.aura/issues/638))
- 🌟 **New feature:** Auto-return - controllable per device through `aura.0.clients.<id>.idleReturn.snoozeMinutes` and `.delay` (and for all devices through `aura.0.idleReturn.*`) ([#638](https://github.com/hdering/ioBroker.aura/issues/638))
- 🌟 **New feature:** Auto-return - can now be switched off per section and per tab; scrolling counts as activity and a fullscreen widget suspends it ([#638](https://github.com/hdering/ioBroker.aura/issues/638))
- Icons - every icon a device has already shown is kept on that device, so a reload paints them right away and asks for nothing: icons no longer stay invisible on Android browsers until you touch the screen ([#636](https://github.com/hdering/ioBroker.aura/issues/636))

### 0.58.0 (2026-09-11)
- 🌟 **New feature:** Lists, popups and messages - {{parent2}}, {{parent3}} ... address datapoints further up the tree, so a row can reach another channel of the same device (e.g. a HomeMatic maintenance channel); picking such a datapoint in the second-line template stores the pattern automatically ([#637](https://github.com/hdering/ioBroker.aura/issues/637))

### 0.57.0 (2026-09-11)
- 🌟 **New feature:** evcc - the widget is now called "Energiefluss (evcc)" and works far beyond evcc: the data source is a dropdown of the energy instances actually installed (evcc, SMA, Fronius, E3/DC, Kostal, SENEC, sonnen, Victron, Shelly and more) or "manual", picking a non-evcc one searches what that instance publishes and fills in the datapoints, and production and house consumption can now come from datapoints of your own just like grid and battery could, so with all five set the widget draws any PV system without an evcc instance; power datapoints in kW are converted automatically from the datapoint's own unit, a prefix can still be typed by hand and no longer snaps the old value back while you type, and a freshly added widget matches the text and icon size of every other widget and follows the global font scale instead of towering over them ([#629](https://github.com/hdering/ioBroker.aura/issues/629))
- Date/time fields - no more double picker icon: where a browser insists on drawing its own clock, Aura no longer puts a second one next to it ([#633](https://github.com/hdering/ioBroker.aura/issues/633))
- 🌟 **New feature:** Header, tab bar and section menu - the single clock and single datapoint slot became a list: add as many clocks, datapoints and texts as you like, left next to the title or on the right, with existing settings carried over automatically; a menu element can also be any widget, either a reference to one that already sits on a dashboard or an instance of its own, you pick which of the widget's layouts the menu draws (a fresh one starts on the densest, so a switch no longer towers over a 32px bar), and its conditions, badges and click actions work there just as they do on the dashboard ([#634](https://github.com/hdering/ioBroker.aura/issues/634))
- 🌟 **New feature:** Conditions - the AND/OR between two clauses can now be set per row instead of for the whole rule, and clauses can be bracketed; a preview line spells out what the rule reads as ([#635](https://github.com/hdering/ioBroker.aura/issues/635))
- Icons - widget, tab and list icons are now delivered by Aura itself instead of the public Iconify servers, so they also show up in Samsung Internet, Opera, Fully Kiosk and other browsers that block those hosts, and on a tablet with no internet; the icon search in the editor takes the same route ([#636](https://github.com/hdering/ioBroker.aura/issues/636))

### 0.56.4 (2026-09-09)
- General - verified on Node.js 26; the CI adapter tests now run on Node 22, 24 and 26 ([#631](https://github.com/hdering/ioBroker.aura/issues/631))
- Knob - only the dial reacts to touch now: a swipe on the free area next to it scrolls the page instead of turning the knob, and the value no longer skews on widgets that are not square ([#630](https://github.com/hdering/ioBroker.aura/issues/630))
- Settings - the admin PIN can be changed again: an expired admin session now says so and sends you to the login page instead of answering "Wrong PIN", and the password manager no longer prefills the new-PIN field ([#632](https://github.com/hdering/ioBroker.aura/issues/632))
- Admin login - every refusal now names its reason instead of "Wrong PIN": too many attempts (with the wait), an admin PIN that is already set, or no reachable Aura instance behind the page - which used to offer a first-run setup that could never succeed ([#632](https://github.com/hdering/ioBroker.aura/issues/632))

### 0.56.3 (2026-09-08)
- PIN protection - the "Editable via MCP" release now shows up as soon as a PIN is typed, instead of only after saving and reloading
- PIN protection - the PIN settings of a section or tab no longer vanish after saving
- PIN protection - sections and tabs got a "Remove PIN" button; a PIN kept server-side could not be taken back at all, because its input field is always empty. The adapter puts the protected content back into the configuration and forgets the vault entry in one step
- Section title - the MCP height check now treats the "framed" style as the card it is: it asks for the 3 rows the style needs to look right instead of the 2 it technically renders in, and follows the widget padding of the dashboard like every other card

### 0.56.2 (2026-09-08)
- MCP - a widget id that sits in a PIN-protected view is now refused with the release hint instead of "no widget with that id", and the structure note no longer lists aura_compact among the tools that work without a release
- Widget import - the datapoint is optional again: a widget that gets its values from a template or bindings can be imported without typing a dummy id ([#625](https://github.com/hdering/ioBroker.aura/issues/625))

### 0.56.1 (2026-09-08)
- MCP - PIN-protected sections and tabs are now reported as protected instead of empty; without a release the AI server only sees their structure (id, type, gridPos) and cannot write, and aura_review counts them as not checked
- MCP - new per-view switch "Editable via MCP" in the editor (section/tab gear, admin login required) releases a PIN-protected view for the AI server without ever revealing the PIN; aura_write_tab stays blocked there
- PIN protection - a section's own badges and badge aggregate no longer get lost when a PIN is set on it

## License

MIT License

Copyright (c) 2026 hdering <aura@dering-online.de>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.