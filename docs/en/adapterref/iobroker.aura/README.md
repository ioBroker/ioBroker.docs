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

### 0.71.0 (2026-09-27)
- 🌟 **New feature:** Settings - "Fill window width" grid can now also stretch vertically: rows either scale with the width (widgets keep their aspect ratio) or fill the window height; off by default ([#413](https://github.com/hdering/ioBroker.aura/issues/413))
- 🌟 **New feature:** Widget fullscreen - browser fullscreen no longer drops back right after opening when entering it resizes the window across a layout breakpoint (Firefox on phones in landscape) ([#711](https://github.com/hdering/ioBroker.aura/issues/711))
- Chart - the tooltip now shows the year when the chart spans more than a month, crosses a year boundary or lies in an earlier year; daily values drop the meaningless 00:00 ([#712](https://github.com/hdering/ioBroker.aura/issues/712))
- 🌟 **New feature:** JSON table - columns can now have their own background and text colour ("Colours" switch in the column settings) ([#715](https://github.com/hdering/ioBroker.aura/issues/715))
- Chart - value labels on the highest bar or point no longer run into the legend or get cut off at the top edge ([#713](https://github.com/hdering/ioBroker.aura/issues/713))
- 🌟 **New feature:** Chart (advanced) - boolean datapoints plot as 0/1 on a clean 0…1 axis and draw as a step line by default; new "Step line" switch and "Texts instead of numbers" per series (e.g. 0=On; 1=Off), prefilled from the datapoint's own states ([#718](https://github.com/hdering/ioBroker.aura/issues/718))
- 🌟 **New feature:** Icon picker - icons of installed ioBroker icon adapters (e.g. icons-mfd-svg, icons-material-png, vis-icontwo) and vis-2 icon sets (e.g. Vis 2 inventwo Iconset) can now be picked, straight from the adapter; new "Source" filter for Aura's own icons, adapters and single Iconify sets, "Offline only" filter, optional tinting of single-coloured PNG sets, and the dialog can be moved ([#716](https://github.com/hdering/ioBroker.aura/issues/716))
- 🌟 **New feature:** Instance settings - new "Reset admin PIN on next start" checkbox for a forgotten admin PIN: the admin area asks for a new PIN afterwards, PINs of protected sections and tabs are kept
- 🌟 **New feature:** Custom layout - right-click a cell to insert a row above/below or a column left/right of it, or to delete its row/column, instead of only adding at the end; the cell context menu no longer closes the edit dialog ([#717](https://github.com/hdering/ioBroker.aura/issues/717))

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

## License

MIT License

Copyright (c) 2026 hdering <aura@dering-online.de>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.