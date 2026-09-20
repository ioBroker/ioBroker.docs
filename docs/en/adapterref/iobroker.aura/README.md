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

### 0.65.1 (2026-09-20)
- 🌟 **New feature:** List / Dynamic list - sort criteria can now compare a datapoint's last change or last update instead of its value, including the datapoint chosen for the second line; the "own value order" sort mode was dropped ([#687](https://github.com/hdering/ioBroker.aura/issues/687))

### 0.65.0 (2026-09-19)
- Datapoint picker - the tree lists sub-folders before the datapoints of a folder ([#686](https://github.com/hdering/ioBroker.aura/issues/686))
- Datapoint picker - the "With History" filter now covers every logging adapter (history, influxdb, sql, ...) and no longer marks datapoints that only carry an iot/Alexa custom entry ([#686](https://github.com/hdering/ioBroker.aura/issues/686))
- Group - a child widget is now at least as tall inside a group as the same widget on the tab, so its content is no longer cut off; existing groups grow by about one row per five child rows ([#680](https://github.com/hdering/ioBroker.aura/issues/680))
- Group - the editor lets a group be dragged taller than its children again; the extra room is shared evenly among them and the frontend shows the same height ([#680](https://github.com/hdering/ioBroker.aura/issues/680))
- 🌟 **New feature:** Layouts - new "Preload icons for offline devices" switch (global or per layout): the device loads every icon of the layout right after start, keeps it locally and no longer asks the public Iconify hosts; Frontend design → Icons shows which icons the adapter already holds and preloads the missing ones ([#290](https://github.com/hdering/ioBroker.aura/issues/290))
- Adapter - `info.iconCache` lists the icons the adapter serves from its own cache, and every newly cached icon is logged ([#290](https://github.com/hdering/ioBroker.aura/issues/290))
- Group - a child can be pulled back onto the tab with a click on its grip; dropping it anywhere in the free tab area works too, and dropping it back onto its own group no longer loses it

### 0.64.1 (2026-09-19)
- 🌟 **New feature:** Slider, dial, dimmer and number input can convert their datapoint's unit - the value is converted for display and converted back on write, so a seconds datapoint can be operated in minutes or a 0-255 dimmer in percent ([#682](https://github.com/hdering/ioBroker.aura/issues/682))

### 0.64.0 (2026-09-19)
- Collapsed widgets - the folded card keeps a fixed slim padding and no longer shrinks onto the bare title row on dashboards with little widget padding, so the corner buttons stay inside the card ([#676](https://github.com/hdering/ioBroker.aura/issues/676))
- 🌟 **New feature:** Switch, dimmer, list rows, custom-layout cells and the group master switch can show a checkbox instead of the slide toggle ([#683](https://github.com/hdering/ioBroker.aura/issues/683))
- 🌟 **New feature:** Datapoint picker - a new toggle shows the ioBroker object tree instead of the flat list, the browser remembers the chosen view, and Escape now closes the picker itself instead of the dialog behind it ([#686](https://github.com/hdering/ioBroker.aura/issues/686))
- Editor - expanding or folding a collapsible widget no longer marks the widgets below it as changed ([#676](https://github.com/hdering/ioBroker.aura/issues/676))
- Advanced chart - the curve no longer bends backwards at its end after the browser has been open for a while, and the history is re-read periodically so the chart keeps up with the datapoint
- Selection field - with entries from a JSON datapoint, the picker and JSON-path buttons next to that datapoint are no longer squashed and match the height of the main datapoint row

### 0.63.1 (2026-09-19)
- Editor - the import dialog now closes with ESC like every other dialog ([#684](https://github.com/hdering/ioBroker.aura/issues/684))
- Chart (advanced) - rolling charts no longer draw a duplicate first bar from the reading before the window ([#685](https://github.com/hdering/ioBroker.aura/issues/685))
- Group - the editor no longer lets a group whose height follows its children be dragged taller or shorter than the frontend renders it; the box could show a height that was never saved and snapped back on the next edit ([#680](https://github.com/hdering/ioBroker.aura/issues/680))

### 0.63.0 (2026-09-18)
- Image - adapter assets such as Pirate Weather icons are now read straight from the ioBroker file storage, so they no longer depend on the configured socket port serving them ([#519](https://github.com/hdering/ioBroker.aura/issues/519))
- Groups - the editor sizes a group exactly like the frontend again: children stored with a gap between them (or next to a shorter widget) no longer leave an empty strip under the last child, and the children keep the size the frontend gives them ([#680](https://github.com/hdering/ioBroker.aura/issues/680))
- 🌟 **New feature:** Countdown - new widget: remaining time as hh:mm:ss with Start/Pause/Stop, ± buttons and preset chips; runs in the adapter, switches a datapoint at start and end, scriptable through its cmd state, and can also display a foreign remaining-time datapoint such as mytime ([#675](https://github.com/hdering/ioBroker.aura/issues/675))
- Settings - the web instance can now be picked from a list instead of typing its port; its port, bind address and HTTPS setting are then used automatically
- Settings - new "Check backend" button that tests the web instance, the socket connection and the file delivery and reports what is wrong in plain words; the same check runs at every start and writes its result to the log and to info.backendCheck
- Select - with a fixed dropdown width, a value that is missing from the widget's own entry list is no longer printed in the closed control; it now shows a dash just like the automatic width, so several selectors can share one datapoint ([#679](https://github.com/hdering/ioBroker.aura/issues/679))
- Status overview - card layout now shows the state first and the affected device below it
- New widget dialog - the two shading entries are merged into one "Rollladen / Jalousie / Markise"; a slat datapoint is still detected automatically and switches the tilt regulator on
- New widget dialog - double-clicking an entry adds it and closes the dialog again

### 0.62.0 (2026-09-18)
- 🌟 **New feature:** Layouts - the admin page is now a master-detail view like Frontend Design: a tree of layouts and sections on the left, the selected one on the right with labelled actions, a section list with default section and menu visibility, and a searchable tab list with default tab, hidden state and drag ordering
- 🌟 **New feature:** Menu widget - new "Overview" mode lists every section of the layout with its tabs as clickable chips, generated from the layout itself, with optional search field, group titles, chip size and an "all layouts" source ([#669](https://github.com/hdering/ioBroker.aura/issues/669))
- 🌟 **New feature:** Chart (Advanced) - a legend that wraps onto several rows no longer covers the chart; the plot now starts below the last legend row ([#673](https://github.com/hdering/ioBroker.aura/issues/673))
- 🌟 **New feature:** Select field - optional confirmation prompt before the picked entry is written to the datapoint, with a custom prompt text, like the input field already offers ([#674](https://github.com/hdering/ioBroker.aura/issues/674))
- 🌟 **New feature:** Select field - the dropdown size (small / medium / large) and a fixed width are configurable, so a long entry no longer resizes the control and the touch target can be made bigger ([#679](https://github.com/hdering/ioBroker.aura/issues/679))
- JSON table - HTML columns can stretch their content to the column width, so a bar chart built from an HTML table fills the column like it does in vis instead of shrinking to a few pixels ([#677](https://github.com/hdering/ioBroker.aura/issues/677))
- 🌟 **New feature:** Widgets - every widget can start collapsed: "Collapsed by default" (now in the Appearance section, moved there for the group as well) folds the card to a single row with icon and title, a tap expands it and the widgets below move up; while expanded a fold button sits in a configurable corner; optionally the editor shows the widget collapsed as well ([#676](https://github.com/hdering/ioBroker.aura/issues/676))
- JSON table - a table row no longer reserves half a font size of unused height, so a one-line table fits a small card instead of having the bottom of its letters cut off ([#678](https://github.com/hdering/ioBroker.aura/issues/678))
- 🌟 **New feature:** Fill level - optional datapoints for charging and connection: a bolt shows while the device charges, with an optional blinking or Knight-Rider effect on the fill, and a lost connection greys the widget out and shows its own icon; each datapoint can be read as a flag, an inverted flag (UNREACH) or a charge power ([#671](https://github.com/hdering/ioBroker.aura/issues/671))

### 0.61.0 (2026-09-17)
- 🌟 **New feature:** Advanced chart - can start on the current calendar day (00:00-24:00) instead of the rolling range
- 🌟 **New feature:** Editor - undo/redo for every edit: step-wise via Ctrl+Z / Ctrl+Y or the arrows in the save bar, also after saving; "Discard" reverts all unsaved changes and is itself undoable; the history menu in the save bar lists every step of the session by name plus the saved states from the auto-backups, restoring one writes a safety backup first and is a single undo step; the history survives a reload of the admin as long as nothing else changed the configuration in between. Unsaved changes are no longer saved automatically when the admin is reloaded but stay unsaved and are flagged as carried over from the last session; toggling a timer or an auto-list picking up new datapoints no longer saves the whole dashboard on its own either. Dropping a widget no longer re-renders every other widget on the tab, so releasing it no longer stutters on busy tabs, and the preview renders with the font scale of the layout being edited, so the admin shows what the frontend shows ([#668](https://github.com/hdering/ioBroker.aura/issues/668))
- Messages - the presentation defaults take part in undo/redo; undoing them back to the saved values disarms the save bar again
- Settings - the first change to a setting that was never saved before (fresh installation, unused datapoint groups) now arms the save bar and can be discarded like any other
- Adapter - a config datapoint (aura.0.config.*) written by a script or another tool without ack is backed up first; the previous value appears in the backup list as an external write
- Popups - a fresh installation no longer receives every built-in popup view and type assignment on the second load, a discard or a restore; only the datapoint view is seeded until a popup is actually configured
- Frontend - opened in the same browser as an admin, the frontend no longer mirrors the admin's unsaved edits live (every widget drag used to show up there at once); it shows the saved configuration, leaves the admin's copy and flags alone, and takes a save over the moment it arrives
- Value widget - in the "minimal" layout value and title shrink to stay inside the card instead of the title being cut off at the bottom edge ([#668](https://github.com/hdering/ioBroker.aura/issues/668))
- Value widget - a double click in the HTML template field selects the clicked word again instead of the whole template ([#670](https://github.com/hdering/ioBroker.aura/issues/670))
- 🌟 **New feature:** iFrame widget - the embedded page can be zoomed: one level for all devices in the editor, plus optional controls on the widget whose level is remembered for that device alone; where the content is locked, two fingers zoom it directly ([#667](https://github.com/hdering/ioBroker.aura/issues/667))

### 0.60.8 (2026-09-16)
- feat(diagnostics): measure whether the width is what moves ([#636](https://github.com/hdering/ioBroker.aura/issues/636))

### 0.60.7 (2026-09-16)
- Gauge, Dial, Level and Slider - the line under Min/Max now also reports when the datapoint declares no range at all, so a scale left on 0...100 is not mistaken for a bug ([#665](https://github.com/hdering/ioBroker.aura/issues/665))
- Fixed a redraw loop that made a dashboard rebuild itself dozens of times a second on some phones: the layout is no longer switched by a momentary zero-width measurement, which also brings back icons that never got the chance to finish loading ([#636](https://github.com/hdering/ioBroker.aura/issues/636))

### 0.60.6 (2026-09-16)
- Diagnostics - the `?diag=1` report now names the element a redraw loop runs on and the class it toggles, and prints the configuration of the widget causing it so the loop can be rebuilt elsewhere ([#636](https://github.com/hdering/ioBroker.aura/issues/636))

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

## License

MIT License

Copyright (c) 2026 hdering <aura@dering-online.de>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.