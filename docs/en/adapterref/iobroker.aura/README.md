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

### 0.70.1 (2026-09-25)
- Click action icon on widgets is now off by default and has to be switched on per widget

### 0.70.0 (2026-09-25)
- 🌟 **New feature:** Widget fullscreen can fill the whole screen: the new "Fill the screen" option uses the browser's fullscreen mode, hiding the address bar and task bar ([#711](https://github.com/hdering/ioBroker.aura/issues/711))
- 🌟 **New feature:** Settings - new grid option "Fill window width": widgets stretch to the full screen width on any resolution, the arrangement stays; off by default ([#413](https://github.com/hdering/ioBroker.aura/issues/413))

### 0.69.0 (2026-09-24)
- Custom CSS applied in the dashboard editor now styles only the dashboard preview, not the admin menu around it ([#710](https://github.com/hdering/ioBroker.aura/issues/710))
- Admin overview - the AI access (MCP) card can be dismissed, like the getting-started card
- 🌟 **New feature:** JSON table: sort rules like the static list - several columns in a row, compare as number, text, on/off or date (also dd.MM.yyyy), empty cells first or last; a header click still takes over ([#706](https://github.com/hdering/ioBroker.aura/issues/706))
- 🌟 **New feature:** JSON table: per-column thousands separator next to the decimal places; the "Umrechnung" switch is now called "Zahlenformat" and shows conversion, decimals and separator in one row ([#707](https://github.com/hdering/ioBroker.aura/issues/707))
- Media player: the volume quick-select buttons (25/50/75/100 %) can be hidden to save a row of height ([#708](https://github.com/hdering/ioBroker.aura/issues/708))
- 🌟 **New feature:** Chart / Advanced chart: define your own time-range chips for the frontend selector, e.g. only months (1, 2, 3, 6, 12, 24 months, total); custom ranges now also support weeks, months and years ([#709](https://github.com/hdering/ioBroker.aura/issues/709))
- 🌟 **New feature:** Grid & Mobile - the mobile view can now use 2-4 columns like the tablet view (setting "Mobile columns"); the mobile order panel in the editor then arranges columns and full-width bands; in Frontend design the mobile and tablet settings are grouped side by side, and both order panels link straight to them ([#413](https://github.com/hdering/ioBroker.aura/issues/413))

### 0.68.2 (2026-09-23)
- Design - every overridden setting of a layout or section now gets the orange marking, including the section menu, tab bar, theme and header title/elements

### 0.68.1 (2026-09-23)
- Section menu - the widget preview of a menu element is now as wide as the menu itself (docked sidebar or drawer) instead of the whole editor, the preview window hugs it, and the element uses the bar slot when the menu sits at the top or bottom

### 0.68.0 (2026-09-23)
- 🌟 **New feature:** Room climate - add any number of extra readings (CO2, VOC, dew point, comfort, air quality, brightness, presence) with their own units, colour bands and value labels; dew point, absolute humidity and comfort are calculated from temperature and humidity ([#698](https://github.com/hdering/ioBroker.aura/issues/698))
- Room climate - the chart can now draw those readings as extra series, on a second y axis where the scale differs ([#698](https://github.com/hdering/ioBroker.aura/issues/698))
- Settings - the Layouts and Frontend design pages no longer overflow or squeeze their buttons on a phone; their layout/scope tree folds into a bar above the detail
- List - on a phone the "Manage datapoints" dialog folds the datapoint list into a bar above the editor, so the selected entry can be configured
- 🌟 **New feature:** Widgets with a click action now show a small icon that runs it, also in the folded header of a collapsed widget; it can be switched off (also right in the click-action dialog), moved to another corner or given its own symbol under Appearance ([#702](https://github.com/hdering/ioBroker.aura/issues/702))
- 🌟 **New feature:** Widgets can show extra values in their header, expanded and collapsed: a datapoint, a value the widget already has (main value, list sum, average, count, thermostat and room-climate readings, custom-layout cells …), a text with bindings or the click-action icon, beside the title or in a second row, optionally only while a condition holds; set up under Appearance → Header ([#676](https://github.com/hdering/ioBroker.aura/issues/676))
- Settings - a protected tab or section no longer shows up empty in the editor after an update, and "Remove PIN" works again: a login kept from an older version now asks for the admin password once ([#704](https://github.com/hdering/ioBroker.aura/issues/704))
- Chart (advanced) - the labels of the first and last point of a JSON chart are no longer cut off at the edge ([#703](https://github.com/hdering/ioBroker.aura/issues/703))
- Settings - the overview no longer lists the mode-dependent datapoints of an air-conditioner widget (Daikin `{mode}`) as missing; they are only reported when no operation mode has them ([#701](https://github.com/hdering/ioBroker.aura/issues/701))
- Energy flow (evcc) - supports the new charge modes of evcc 0.316: Off · Smart · Now plus an "always charge" toggle; older evcc versions keep PV and Min+PV ([#700](https://github.com/hdering/ioBroker.aura/issues/700))
- AI access (MCP) - no longer marked as beta
- Popups - charts in the popup view editor now show the real history of a widget that opens the view (or a datapoint of your choice) instead of a sample curve; the source is picked in the bar below the editor toolbar

### 0.67.4 (2026-09-22)
- 🌟 **New feature:** JSON table - a column can now format its value: show a timestamp as date/time, convert it by factor/offset, and set its decimal places ([#697](https://github.com/hdering/ioBroker.aura/issues/697))
- Date picker - clearing the field now clears the datapoint, in the widget, in a Universal cell and in a list row ([#695](https://github.com/hdering/ioBroker.aura/issues/695))
- 🌟 **New feature:** Date picker - the input fields now take a font size and a text colour; in a Universal cell the cell's colour and bold/italic reach them too ([#696](https://github.com/hdering/ioBroker.aura/issues/696))
- Settings - each auto-backup now shows the Aura version that wrote it, and carries that version in its file name ([#694](https://github.com/hdering/ioBroker.aura/issues/694))

### 0.67.3 (2026-09-21)
- Colors - a light/dark colour pair now survives the entry, cell and table colour fields, and setting only the dark half no longer paints both themes ([#689](https://github.com/hdering/ioBroker.aura/issues/689))

### 0.67.2 (2026-09-21)
- 🌟 **New feature:** PIN protection - the padlock on a locked section or tab can now be hidden ([#692](https://github.com/hdering/ioBroker.aura/issues/692))

### 0.67.1 (2026-09-21)
- Colors - switching a color field between "Uniform" and "Light / dark" now keeps the colors of the other mode, so picking one uniform color no longer discards the light/dark pair ([#689](https://github.com/hdering/ioBroker.aura/issues/689))

### 0.67.0 (2026-09-21)
- 🌟 **New feature:** Tablet mode - between the mobile and a new tablet breakpoint (measured on the window width), widgets flow into a configurable number of columns (default 2) that fill the width instead of scrolling or being cut off; the editor's tablet panel shows those columns and lets you drag each widget into a column or make it full width (unassigned widgets alternate in the mobile order), and the section menu gets its own tablet placement (automatic = the docked sidebar becomes a hamburger) ([#413](https://github.com/hdering/ioBroker.aura/issues/413))
- 🌟 **New feature:** Settings - Frontend design page rebuilt around the three scope chains: the tab rows are now "Global", "Global → Layout" and "Global → Layout → Section", every group stays visible at every scope (locked rows explain why and jump up), a scope bar says what is being edited, own values are orange in the tree, on the tabs and on the control itself, each setting shows where it is inherited from or overridden below, and a "Levels" dialog lists one setting across all layouts and sections; browser sync, my themes, behavior and the wizard limit became groups of their own
- 🌟 **New feature:** Getting started - a new documentation guide walks through the first setup in order (target device, global basics, guidelines, grid and breakpoints, layouts and sections, first widgets, mobile check, device assignment, backup), the admin overview opens with a dismissible card linking to it and to each step's admin page, and an empty dashboard tab now links to the admin area and to the guide

### 0.66.0 (2026-09-20)
- JSON table - HTML columns get a width mode: own width, fill the column, or proportional (the longest value fills the column, shorter ones keep their ratio); bars built with `cellspacing` keep their gaps again ([#677](https://github.com/hdering/ioBroker.aura/issues/677))
- Select field - in the editor the entry list's value column now grows with the longest value, so text values stay readable instead of being cut off; the same applies to the Universal widget's select cell ([#679](https://github.com/hdering/ioBroker.aura/issues/679))
- 🌟 **New feature:** Colors - every color field now offers the theme colors and can hold one color per brightness, so an icon tuned for the light design no longer disappears on the dark one ([#689](https://github.com/hdering/ioBroker.aura/issues/689))
- 🌟 **New feature:** Fill level - a second status datapoint for discharging, with its own condition, effect, icon and color (orange by default), so a signed battery power can show charging in green and discharging in orange from the same datapoint ([#691](https://github.com/hdering/ioBroker.aura/issues/691))

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

## License

MIT License

Copyright (c) 2026 hdering <aura@dering-online.de>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.