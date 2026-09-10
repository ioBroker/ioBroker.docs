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

### 0.56.0 (2026-09-08)
- Section title - the "Framed" style is now part of the AI widget schema, so the MCP accepts what the editor writes
- Layout styles come from one list for the editor, the AI schema and the documentation - styles no widget ever rendered are gone, and the light, camera and knob now show their real styles everywhere
- Editor - a stored layout the widget type does not know is now named instead of silently falling back to the default
- AI review - aura_review now checks the stored dashboard against the widget schema and reports values a write would refuse
- 🌟 **New feature:** PIN protection - section and tab PINs are now enforced server-side: the PIN and the protected widgets stay in the adapter and only reach the browser after the code is verified (scrypt hash + rate limit against guessing), so the gate holds up even against the dev tools
- 🌟 **New feature:** Admin login - now verified server-side instead of in the browser; please set the admin password once after this update (the previous one does not carry over)

### 0.55.4 (2026-09-08)
- List - a switch row with switchStyle "slide" plus on/off labels now keeps the slide toggle and puts the label next to it, instead of silently replacing the toggle with a text pill
- AI access - broad round of improvements for the MCP tools that let an AI read and build dashboards: more widget types report an honest height (weather and status overview are measured now, content from an instance or free HTML is flagged as "check it in the browser"), options that void a measurement say so instead of reporting "fits", aura_rendered can measure a tab nobody has open by rendering it off-screen at the real grid width, a section with a single tab is warned that its last grid row disappears once a second tab is added, aura_tab keeps embedded images readable via trimming plus images/groupDefs switches (and write tools refuse a trimmed payload), aura_validate hands back a token the write tools accept instead of sending a tab through the conversation twice, and theme colors are reported in the only form a configuration accepts, var(--light-on, var(--accent-yellow))

### 0.55.3 (2026-09-07)
- Section title - new "framed" style that looks like a normal widget card, subtitle now shows in the compact and minimal styles too, the accent bar spans title and subtitle, and the title is no longer clipped at the top of the mobile view; the rule can now be hidden or given its own color, title and subtitle take their own color and text size, and the subtitle accepts the same value bindings as the HTML widget
- Settings - deleting a connected device now removes its whole datapoint tree instead of leaving parts of it behind, works from the aura.0.clients.deleteRequest datapoint regardless of the ack flag, and a renamed or speaking client id is no longer cut after 8 characters in the object tree ([#624](https://github.com/hdering/ioBroker.aura/issues/624))
- Settings - the frontend notice about a new adapter version now waits for a confirmation instead of fading away after a few seconds, and comes back after a reload until it is answered; the new "Update notice has to be confirmed" option turns that off ([#617](https://github.com/hdering/ioBroker.aura/issues/617))

### 0.55.2 (2026-09-07)
- Input field - optional unit next to the field, in the Eingabefeld widget, the static and dynamic list rows and the Universal Widget cell ([#622](https://github.com/hdering/ioBroker.aura/issues/622))

### 0.55.1 (2026-09-07)
- 🌟 **New feature:** Popups - the inner padding is now adjustable (globally, per popup view, per click action), and the scrollbar lane is only reserved while the popup really scrolls, so list rows in a popup get the full width ([#621](https://github.com/hdering/ioBroker.aura/issues/621))

### 0.55.0 (2026-09-06)
- 🌟 **New feature:** Universal Widget - the select cell can now take its entries from a JSON datapoint, and shows icons, images and HTML inside the dropdown, just like the standalone select widget ([#615](https://github.com/hdering/ioBroker.aura/issues/615))
- MCP server - aura_rendered now lists every widget of the tab, including the ones that draw nothing, and prints the content height next to the rendered one; a card that is simply larger than it needs to be is no longer reported as a deviation
- 🌟 **New feature:** Calendar - the calendar name, the event title, the date, the location and the coloured marker each carry their own CSS class now; the coloured dot/bar can be switched off, the calendar name aligned and the calendar icon resized in the editor ([#618](https://github.com/hdering/ioBroker.aura/issues/618))
- 🌟 **New feature:** General - Aura now points out a newer adapter version: the admin sidebar shows it next to the version number, and an optional instance setting announces it in the frontend as a message ([#617](https://github.com/hdering/ioBroker.aura/issues/617))
- 🌟 **New feature:** Dynamic list - a row can be given its own icon size even when the icon itself comes from the list-wide setting; the entry's icon button now shows that inherited icon faintly ([#616](https://github.com/hdering/ioBroker.aura/issues/616))
- Settings - a device keeps its client ID: it is stored in the browser instead of being derived from the browser version, so a browser update no longer turns a named device into a new, nameless duplicate. A fixed, speaking ID can now be assigned per device, either in Connected Devices or by opening Aura with ?client=living-room-tablet ([#620](https://github.com/hdering/ioBroker.aura/issues/620))
- 🌟 **New feature:** General - condition rules can be reordered afterwards: drag the new grip in the rule header or use the up/down arrows. Works everywhere rules are edited - widget and tab conditions, the list-wide and per-entry rules of the static and dynamic list, the datapoints of a second line, and the cells of the universal widget ([#623](https://github.com/hdering/ioBroker.aura/issues/623))

### 0.54.2 (2026-09-05)
- Fill - dragging an adjustable limit no longer triggers the click action of the surrounding group ([#619](https://github.com/hdering/ioBroker.aura/issues/619))
- AI access (MCP) - the dashboard now reports the heights it really renders; aura_rendered shows what scrolls and where the estimate is off
- AI access (MCP) - aura_update_widgets changes several widgets in one validated write, so rearranging a column no longer fails on intermediate overlaps
- AI access (MCP) - aura_measure says how each widget type reacts to height, and aura_dashboard says on which row every tab ends
- AI access (MCP) - tab paths and popup names are accepted exactly as the error messages print them
- AI access (MCP) - new multiroom recipe, and an option a widget only reads on another layout is now reported instead of silently ignored

### 0.54.1 (2026-09-05)
- List - the icon size of a row can be set for every display type again, and an icon switch now has a size of its own ([#616](https://github.com/hdering/ioBroker.aura/issues/616))

### 0.54.0 (2026-09-05)
- Mediaplayer - a stop datapoint now works: a stop button appears next to play/pause when one is configured
- Mediaplayer - players found by device detection (Alexa, Sonos, Spotify, Kodi) can be edited through AI access again; their next/previous/shuffle/repeat datapoints were declared as switches and every write was refused
- AI access - widgets can be edited far more reliably: a leftover option no longer blocks every change, a position can be changed one value at a time, every write is read back and reported honestly, the new tool aura_compact clears editor-only overlaps, and height measurement now uses real content (charts, chips, media players, energy balances, carousels) with a row factor measured per list layout
- 🌟 **New feature:** Fill level - adjustable limits: any number of lines on the scale, each from its own datapoint, draggable in the dashboard and written straight back - charge ceiling, discharge floor, priority thresholds ([#613](https://github.com/hdering/ioBroker.aura/issues/613))
- 🌟 **New feature:** Fill level - the sections between two limits carry their own colour and their own icon, and the fill can switch colour as soon as a limit is reached ([#613](https://github.com/hdering/ioBroker.aura/issues/613))
- 🌟 **New feature:** Fill level - new "Balken" layout: a flat bar with rounded ends for a limit that is not a tank ([#613](https://github.com/hdering/ioBroker.aura/issues/613))

### 0.53.5 (2026-09-04)
- AI access (MCP) - below the delete permission, a write that leaves existing widgets out is now refused instead of removing them ([#614](https://github.com/hdering/ioBroker.aura/issues/614))

### 0.53.4 (2026-09-04)
- 🌟 **New feature:** Popups - the background colour can now be set globally, per popup view and per click action; new theme tokens `--popup-bg` / `--popup-border` colour every popup of a layout ([#611](https://github.com/hdering/ioBroker.aura/issues/611))
- AI (MCP) - aura_measure now computes heights for the dashboard's own font scale and widget padding instead of the default ones, and counts a section separator with a heading as the taller row it is; list heights used to come out too small from about four rows on
- Overview - new card explaining that Aura can now be controlled by an AI assistant over MCP, with the setup steps and a link to the documentation; it now sits above the health cards instead of below them, and once MCP is switched on it shrinks to a status line naming the level the assistant runs at, unfoldable back into the full guide
- Overview - the orphaned-datapoint and broken-reference lists show five entries each and move the rest into a "show all" dialog, so a damaged installation no longer stretches the page and pushes everything below it out of sight
- General - the loading screen now reports an unreachable ioBroker server after 8 seconds instead of spinning forever without explanation, and offers a reload button
- AI (MCP) - the endpoint can now be reached through `mcp-remote`, which is what Claude Desktop needs: OAuth discovery probes are answered with a plain 404 instead of the dashboard page, so the bridge no longer dies with `Unexpected token '<'`; a wrong token now reports itself as one instead of failing somewhere inside an OAuth flow, and browser-hosted clients get the CORS preflight they need ([#612](https://github.com/hdering/ioBroker.aura/issues/612))
- Settings - the MCP section now offers two ready-made client blocks side by side: the short HTTP one for Claude Code, and one that runs the same server through mcp-remote for Claude Desktop, which cannot speak HTTP itself ([#612](https://github.com/hdering/ioBroker.aura/issues/612))

### 0.53.3 (2026-09-03)
- MCP server - aura_measure counts the last-change line under a list row (+13.7 px): per affected row for the static list, for every row where the dynamic list switches it on list-wide
- MCP server - the widget schema no longer advertises 45 options a widget never reads: the option reader followed an import into another widget and attributed its options to the wrong type (the static list alone carried 25 of them, among them maxRows, entryDisplay and groupByRoom — all measured as ineffective)

### 0.53.2 (2026-09-03)
- Extended chart - the whole chart follows the theme now: series colours, axis labels, axis and grid lines, the legend and the gauge track. A var(--token) is resolved before it reaches the canvas, so the same colour rule holds for charts as for every other widget (a token the theme does not define is reported by aura_validate). Light themes gain the most — the grid lines were a near-black fixed grey
- Documentation - step-by-step guide for connecting the AI assistant (MCP): enabling the endpoint, generating the token, pasting the client block, and setting up the ioBroker MCP server it needs
- MCP server - aura_validate and aura_measure answer more accurately: aura_validate takes every payload shape the write tools take, a bare widget array included, and no longer reports a write on a read-only row (a state or contact display writes nothing, and a row with writable false is taken at its word); aura_measure charges the second line under a list entry only to the rows that have one (a list of twelve with four second lines was reported 123 px too big) and counts a separator as the shorter row it is

### 0.53.1 (2026-09-02)
- Editor - the "+ Tab" wizard button is gone; tabs are built with the MCP server or from single widgets
- Import dialog - the AI prompt generator is gone; the MCP server produces better widget JSON
- List - editing a list with two rows on the same datapoint no longer leaves stale rows behind
- MCP server - aura_measure sizes a list row by its display, so a list of window contacts is no longer reported as fitting while it scrolls
- MCP server - aura_validate warns about row settings the chosen display never reads (on/off labels on a value row, a state mapping without displayType "states")
- MCP server - the widget schema now spells out inline option shapes, so a contact row can be relabelled through contactAppearance (e.g. "heizt"/"zu" for a heating valve) instead of falling back to a state mapping

### 0.53.0 (2026-09-02)
- General - widget titles keep their descenders (g, p, y) when the font scale is above 100 %
- AI assistant (MCP) - now reads the editor guidelines as the target screen and builds tabs that fit it, instead of guessing the width from existing widgets
- AI assistant (MCP) - list heights are now measured per layout and per option (second line, header), and the answer names what the number leaves out
- AI assistant (MCP) - validation now warns when any control sits on a read-only datapoint: a switch row of a list, the up/stop/down of a shutter, the channels of a lamp - not just the widget datapoint
- AI assistant (MCP) - click actions are documented at last: every kind and its fields, an error for an invented one, and a plain note that no click action writes a datapoint (use chips, a list row, enum or httpRequest for that)
- AI assistant (MCP) - hands over the dashboard theme palette (new aura_theme tool, and the base tokens in aura_dashboard), so generated widgets use var(--accent-green) instead of a hard-coded hex that only fits one theme
- 🌟 **New feature:** Calendar - custom layout now reaches every visible event, not just the next one: each field takes an event number in the cell config, so a whole agenda can be built as one grid row per event ([#608](https://github.com/hdering/ioBroker.aura/issues/608))
- 🌟 **New feature:** Calendar - custom layout gains the end time, the time span (09:00 - 10:30) and a calendar week that only prints where the week changes; the calendar icon is now per event too ([#608](https://github.com/hdering/ioBroker.aura/issues/608))
- Dynamic list and status overview - new "maximum rows" setting: the widget now fits a planned height and shows the rest as a "+N more" line instead of cutting rows off silently
- AI assistant (MCP) - new recipe for one row rule covering a whole list (rowConditions with {{parent}}), and the recipes now use theme colour tokens instead of fixed hex values
- 🌟 **New feature:** Calendar - new "show end time" option: the date of a timed appointment now reads 09:00 - 10:30 in every layout ([#608](https://github.com/hdering/ioBroker.aura/issues/608))
- Calendar - new "always show calendar name" option: the default layout can now name its source even when only one calendar is configured ([#608](https://github.com/hdering/ioBroker.aura/issues/608))
- Editor - the "New widget" dialog is one step now: pick a datapoint or a type and it is added right away; a double click on a tile adds it directly, title, unit and layout stay in the widget editor
- Markers - a marker with a long label no longer disappears under the widget next to it: it hangs over the edge by a few px only, is clamped to its own card with an ellipsis, and is painted above its neighbours

### 0.52.9 (2026-09-02)
- MCP - aura_review no longer suggests folding a KPI row into a list: tiles with their own thresholds, conditions or badges are left out of the tile-row finding
- Custom layout - a matching cell condition now colors the bar of a progress or bar-style slider cell, not just the text on it
- 🌟 **New feature:** Markers - the label text of a widget, section or tab marker now shows datapoint values, e.g. "{0_userdata.0.Pool.MaxRun} min", including operation chains and expressions like free HTML

## License

MIT License

Copyright (c) 2026 hdering <aura@dering-online.de>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.