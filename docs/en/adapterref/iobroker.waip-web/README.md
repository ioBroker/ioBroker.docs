---
chapters: {"pages":{"en/adapterref/iobroker.waip-web/README.md":{"title":{"en":"ioBroker.waip-web"},"content":"en/adapterref/iobroker.waip-web/README.md"},"en/adapterref/iobroker.waip-web/README.de.md":{"title":{"en":"ioBroker.waip-web"},"content":"en/adapterref/iobroker.waip-web/README.de.md"},"en/adapterref/iobroker.waip-web/LOGGING.md":{"title":{"en":"Logging reference"},"content":"en/adapterref/iobroker.waip-web/LOGGING.md"}}}
---
![Logo](admin/waip-web-logo.png)

# ioBroker.waip-web

[![NPM version](https://img.shields.io/npm/v/iobroker.waip-web.svg)](https://www.npmjs.com/package/iobroker.waip-web)
[![Downloads](https://img.shields.io/npm/dm/iobroker.waip-web.svg)](https://www.npmjs.com/package/iobroker.waip-web)
![Number of Installations (latest)](https://iobroker.live/badges/waip-web-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/waip-web-stable.svg)
[![Test and Release](https://github.com/rnc11/ioBroker.waip-web/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/rnc11/ioBroker.waip-web/actions/workflows/test-and-release.yml)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/waip-web/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![License](https://img.shields.io/npm/l/iobroker.waip-web.svg)](LICENSE)

🇩🇪 [Deutsche Version dieser README](/#/docs/adapterref/iobroker.waip-web/README.de.md)

ioBroker adapter for **Wachalarm IP-Web (WAIP-Web)**

Connects via Socket.IO to a WAIP-Web dispatch monitor and mirrors incidents
("Einsatz"), responder feedback ("Rückmeldung"), routes and TTS
announcements into ioBroker states – without needing a browser tab to stay
open.

## Table of contents

- [About this adapter](#about-this-adapter)
- [About WAIP-Web](#about-waip-web)
- [Practical use cases](#practical-use-cases)
- [Features](#features)
- [Configuration](#configuration)
  - [Connection](#connection)
  - [Why a session cookie is needed](#why-a-session-cookie-is-needed)
  - [Rescue service](#rescue-service)
  - [Keyword descriptions](#keyword-descriptions)
  - [Incident map image](#incident-map-image)
  - [Dashboard](#dashboard)
- [States (under `waip-web.0.*`)](#states-under-waip-web0)
  - [info](#info) · [status](#status) · [einsatzAktuell](#einsatzaktuell) ·
    [einsatzAktuell.json](#einsatzaktuelljson) · [einsatzAktuell.tts](#einsatzaktuelltts) ·
    [dashboard](#dashboard-states) · [debug](#debug)
- [Logging](#logging)
- [Changelog](#changelog)
- [License](#license)

## About this adapter

This adapter is an **independent, community-built project** and has no connection
to the WAIP-Web project, to Robert-112, or to the operator of any specific
instance (e.g. the Integrated Regional Dispatch Center Lausitz /
Integrierte Regionalleitstelle Lausitz). It was built by analyzing the
behavior of the frontend (`client_waip.js`) that a WAIP-Web instance
publicly serves to any browser, in order to replicate the same Socket.IO
events and data fields a regular browser client receives.

The adapter connects **without logging in** and therefore only ever
receives WAIP-Web's public permission tier (keyword, location, approximate
position, alerted resources, feedback) – the same data any anonymous
browser visitor would see without signing in. No access restrictions are
bypassed.

> **Note:** An always-on automated client like this adapter is different
> from an occasionally opened browser tab. Before running it against a
> production instance, briefly check with the operator/your dispatch
> center whether a permanent automated connection is welcome.

## About WAIP-Web

[Wachalarm IP-Web](https://github.com/Robert-112/n112_waip-web) is an
open-source web application by **Robert-112** that displays dispatch/alert
information for fire departments and EMS device-independently in the
browser (Windows, Linux, Mac, smartphone – no installation needed). Among
other things it offers:

- **Alarm monitor** – incident type, keyword, special signal, location,
  map, alerted resources, app-based responder feedback including voice
  announcements
- **Dashboard** – overview of all ongoing incidents
- **Feedback function** – app-based responder feedback, grouped by role
  (EK/GF/ZF/VF) and additional qualification (AGT/FZF/MA/MED)
- **Administration** – user management, station data, monitor overview

WAIP-Web itself is licensed under
[**Creative Commons BY-SA 4.0**](https://creativecommons.org/licenses/by-sa/4.0/).
This adapter contains no code from the WAIP-Web project; it implements an
independent client for its Socket.IO interface.

## Practical use cases

This section is about what you can actually *build* with the states this
adapter provides – typical use in a fire station/EMS environment:

- **Wall-mounted alarm display.** Bind `einsatzAktuell.json.current` to a VIS
  table widget on a wall-mounted tablet or TV in the day room/vehicle
  hall – incident type, keyword, address and alerted resources appear
  automatically, without anyone having to keep a browser tab open on that
  screen (which is the whole reason this adapter exists in the first
  place).
- **Plain-language keyword on displays and notifications.**
  `einsatzAktuell.beschreibung` turns a cryptic dispatch code (`B:Wald groß/WSP`,
  `R1N0`) into a readable description ("Wald-/Getreidefeldbrand (groß)",
  "Rettungswagen: 1, Notfalleinsatzfahrzeug: 0") – bind it next to
  `einsatzAktuell.stichwort` on the wall display or include it in the push
  notification/TTS announcement, so members don't have to memorize every
  keyword.
- **Trigger automations the instant an alarm comes in.** Watch
  `einsatzAktuell.alarmAktiv` (or `info.connection` together with it) in a
  script/blockly rule to switch on lights in the vehicle hall, open a
  gate/door, send a push notification (e.g. via a Telegram/Pushover
  adapter) with `einsatzAktuell.stichwort`/`einsatzAktuell.beschreibung` +
  `einsatzAktuell.ort`, or flash a smart-light scene – all a few seconds
  after the actual pager alert, no polling required since ioBroker state
  changes fire instantly.
- **Announce the alarm out loud.** `einsatzAktuell.tts.last` is a
  ready-to-play absolute mp3 URL; point a
  `sonos`/`snapcast`/`text2speech`-style automation at it (or just play
  the URL directly) to have the incident announced over building
  speakers the moment `io.playtts` fires – useful where members aren't
  all looking at a screen.
- **Live headcount / feedback board.** The `einsatzAktuell.rueckmeldungen.*`
  counters (`rollen.ek`/`.gf`/`.zf`/`.vf` per role, `funktionen.agt`/`.fzf`/
  `.ma`/`.med` per qualification) update in real time as responders
  confirm via the app – bind them to gauge or number widgets for an
  at-a-glance "who's coming" overview
  during the response.
- **Post-incident review / statistics.** `einsatzAktuell.json.history` keeps
  the last N completed incidents (configurable, default 10) as a flat
  table – bind it to a second VIS view or export it periodically (e.g.
  via a script reading the state on `io.standby`) to keep a
  longer-running log or feed incident counts into a
  dashboard/statistics adapter.
- **Route/vehicle overview on a map.** `einsatzAktuell.json.routen` carries
  each responding station's `lat`/`lon` and `color` – bind it to a VIS
  map widget for a quick visual of who is en route, independent of the
  WAIP-Web map itself.
- **Bridge into other ioBroker automations.** Because every field is a
  plain ioBroker state, it composes with anything else already running
  in the instance – forward `einsatzAktuell.*` into a smart-home scene engine,
  a Grafana/InfluxDB history for response-time analysis, or a
  Node-RED-style flow via the ioBroker MQTT adapter, without writing a
  single line against the WAIP-Web API.

## Features

- Connects to the `/waip` namespace via `socket.io-client`, registers via
  `emit('WAIP', monitorId)` once (relies on `REGISTRATION_TIMEOUT_MS`
  as a fallback rather than repeated emits, since a redundant emit only
  makes the server reply again without improving delivery reliability)
- Manual reconnect handling (the library's own auto-reconnect is
  disabled) with a configurable delay
- Registration timeout with an audit log (`debug.monitorAudit`)
- Geodata normalization (wgs84 fields, `position`, or GeoJSON `geometry`
  → centroid)
- History of the last N completed incidents (configurable, default 10;
  `einsatzAktuell.json.history`)
- Separate handlers for alarm (`io.new_waip`), feedback (`io.new_rmld`),
  routes (`io.routes`), TTS (`io.playtts`) and standby (`io.standby`)
- Automatic session-cookie management (see below), so alarm delivery
  keeps working indefinitely without an open browser session
- Server-restart detection via `io.version`, with automatic session
  refresh + reconnect
- Incident, feedback, route and alerted-resource data available as
  separate, flat JSON arrays under `einsatzAktuell.json.*` – no nesting, so VIS
  table widgets can bind to them directly
- Aggregated feedback counters per role/capability, mirroring the live
  badges on the web UI
- Clean state on every restart: all states are actively reset to their
  empty value (`false`/`0`/`null`/`[]`) on adapter start, except
  `einsatzAktuell.json.history` and `debug.monitorAudit` (both kept across
  restarts). Note that if the adapter restarts while an incident is
  actively running, its live fields (`einsatzAktuell.*`) are cleared too and
  only repopulate once the server sends the next event for that
  incident.
- Stale-data protection: when a new incident starts before the previous
  one's routes/feedback events for the *new* incident have arrived,
  `einsatzAktuell.json.routen`/`.rueckmeldungen` and the feedback counters are
  cleared immediately rather than waiting for those events. And if
  `io.standby` is ever missed for an incident (e.g. due to a disconnect
  at the wrong moment), a watchdog automatically finalizes the incident
  once its `ablaufzeit` has passed by more than a grace period
  (60 seconds), instead of leaving stale "active" data indefinitely.
- Only ever shows the single most recently active incident; multiple
  concurrently active incidents can currently only be viewed via the
  WAIP-Web instance's own dashboard
- Optional plain-language description for `einsatzAktuell.stichwort`
  (`einsatzAktuell.beschreibung`), resolved locally from a user-maintained
  keyword table plus an optional decoder for the `R<RTW>N<NEF>`
  rescue-service keyword scheme used by several dispatch
  centers - see [Rescue service](#rescue-service)
- Rescue-service incidents can be ignored entirely (no states, no
  history, no TTS) - useful where WAIP only signals them unreliably in
  the first place, see [Rescue service](#rescue-service)
- Optional incident map image: a PNG centered on the incident's
  coordinates, composed locally from OpenStreetMap tiles, with the
  incident area WAIP-Web sends drawn as an outline in a configurable
  color/thickness (switchable to a plain marker dot instead), automatically
  zoomed out as needed to keep the whole area visible, file path
  exposed as a state - see [Incident map image](#incident-map-image)
- Optional dashboard: mirrors the last N incidents matching this
  instance's monitor as `dashboard.einsatz1` … `einsatzN`, polled
  periodically via short-lived connections (no permanent dashboard
  connection) - see [Dashboard](#dashboard)

## Configuration

In the admin UI of the adapter instance, settings are grouped across
four tabs: **Connection**, **Rescue service**, **Keyword descriptions**
and **Incident map image** – see below for all four.

### Connection

| Field | Description | Default |
| --- | --- | --- |
| WAIP server URL | Base URL of the WAIP-Web instance | `https://wachalarm.leitstelle-lausitz.de` |
| Monitor ID | Picked from a live dropdown, fetched from the configured server's `/waip/` overview page and grouped by Leitstelle/Kreis/Träger/Wache; manual entry stays possible if the server can't be reached. Empty/`0` = global monitor (all incidents) | *(empty)* |
| Registration timeout (s) | Time until a missing registration confirmation is logged | `10` |
| Reconnect delay (s) | Wait time before a manual reconnect after disconnect/error | `5` |
| Number of incidents in history | How many completed incidents to keep in `einsatzAktuell.json.history` (most recent first). Existing entries beyond a lowered limit are trimmed on the next adapter restart | `10` |

The session keepalive interval is **not configurable** – it's derived
fully automatically on every renewal from the cookie lifetime the server
reports (min. 55s, max. 5 min., matching `/js/session_keepalive.js` on
the site itself).

### Why a session cookie is needed

The WAIP-Web server ties alarm delivery to an Express session cookie,
which a browser renews automatically every few minutes via a bundled
script. A plain Socket.IO client never gets this cookie automatically –
the adapter therefore fetches it itself via `GET /session/keepalive` and
attaches it to the Socket.IO connection.

According to the WAIP-Web source code, the cookie's lifetime is
**configurable per instance via an environment variable** (server
default: 60 seconds; this instance apparently uses 10 minutes) – a fixed
renewal interval would therefore potentially be wrong for other WAIP-Web
instances. The adapter instead derives the actual interval **adaptively**
from the expiry time the server reports on every call (80% of the
observed lifetime, at least 55 seconds, at most a fixed 5-minute ceiling)
– the exact same clamping that `/js/session_keepalive.js` on the site
itself uses.

### Rescue service

**Process rescue-service incidents** (admin checkbox, **on** by
default): incidents whose `einsatzart` identifies them as a
rescue-service call (contains "Rettung" or "Krankentransport",
case-insensitive - see the `einsatzart` examples in
[einsatzAktuell](#einsatzaktuell)) are processed normally by default, matching every
prior version of the adapter. Unchecking this box makes the adapter
**completely ignore** such incidents instead: no `einsatzAktuell.*` states are
updated, no history entry is written, no TTS announcement is triggered
- as if the incident had never arrived. This exists because
rescue-service incidents reportedly only get alarmed/signaled via WAIP
in some regions/dispatch centers at all - where they don't, or aren't
wanted, this box turns the noise off. Everything below this box on
the tab (the decoding checkbox and its label fields) is only shown
while it's checked - if it's unchecked, rescue-service incidents are
ignored entirely anyway, so their keyword decoding is irrelevant.

`einsatzAktuell.stichwort` is passed through unchanged from the server as a
bare code (e.g. `B2`, `H:VU mit P`) – WAIP-Web itself doesn't explain
what it means, and there is no nationwide standard: every dispatch
center uses its own keyword catalog. `einsatzAktuell.beschreibung` fills that
gap **entirely locally**, no data is sent anywhere. This tab is the
first of two sources checked, in order (see
[Keyword descriptions](#keyword-descriptions) for the second):

**Rescue-service decoding** (admin checkbox, on by default): if the
keyword matches the pattern `R<RTW-count>N<NEF-count>[p][f][-NT]`
(e.g. `R1N0` → "Rettungswagen: 1, Notfalleinsatzfahrzeug: 0"), a
description is generated automatically. Two spellings of the `p`/`f`/`NT`
part are recognized: without a space and with a hyphen before `NT`
(e.g. `R1N1p`, `R1N0-NT`, see
[Leitstelle Lausitz's documented explanation](https://www.leitstelle-lausitz.de/anpassung-der-einsatzstichworte-rettungsdienst/)
of it), and with a space and without a hyphen (e.g. `R1N1 p`, `R1N0 nt`,
as used by the IRLS Brandenburg) – this scheme (in either spelling) is
used by several German dispatch centers, not just these two – has no
effect if your dispatch center doesn't use one of these patterns, since
the keyword just won't match. The text for each part is itself configurable (5 additional text
fields appear once the checkbox is enabled), since the adapter is
multi-language and these labels aren't translated automatically:

| Part | Meaning | Default label |
| --- | --- | --- |
| `R<n>` | Number of ambulances (Rettungswagen) | `Rettungswagen` |
| `N<n>` | Number of emergency vehicles (Notfalleinsatzfahrzeug) | `Notfalleinsatzfahrzeug` |
| `p` suffix | Polytrauma | `Polytrauma` |
| `f` suffix | First responder included | `First Responder` |
| `-NT`/` nt` suffix | Special ambulance transport | `Notfalltransport mit Notfallkrankenwagen` |

### Keyword descriptions

Checked only if the decoder on the [Rescue service](#rescue-service)
tab didn't match: a list of `{keyword pattern, description, match type}`
rows – match type is `starts with` or `contains`, comparison is
case-insensitive and treats spaces and hyphens as equivalent (any run
of either collapses to one before comparing), so e.g. `H:VU mit P`,
`H:VU-mit-P` and `H:VU - mit - P` all match the same row – no need to
add a separate row per spelling variant. If several rows match, the
**most specific (longest) pattern wins automatically** – row order has
no effect on matching, so the table can be freely sorted by any column
(click the column header) without changing behavior. The table is pre-filled
with an example fire/rescue keyword list (`B:...`/`H:...`) as a
starting point only – it is **not** confirmed to match any specific
dispatch center's real catalog, edit or fully replace it as needed.
To back up or transfer this table, use ioBroker's standard instance
configuration export/import (JSON). After using that import,
**reload the Admin page** before checking this table – the open
config dialog doesn't refresh it from an external import
automatically (a state-sync limitation of the Admin table component
itself, not something this adapter controls).

If neither this table nor the decoder above match, `einsatzAktuell.beschreibung`
is simply `null` - not an error.

### Incident map image

**Generate a map image for each incident** (admin checkbox, off by
default): when enabled and an incident carries valid coordinates, the
adapter downloads the tiles it needs from the public
`tile.openstreetmap.org` server, composites them into a single PNG
centered on the incident's location, and stamps the OpenStreetMap
attribution (required by its ODbL license) into the bottom-left corner.

By default, the incident area WAIP-Web sends in the `geometry` field of
the event (usually a circle-shaped polygon around the location, not
just its center) is drawn onto the image as an outline in a
configurable color and thickness - the original shape the server sent,
not a marker at its centroid. **Show incident-area polygon** (admin
checkbox, on by default) controls this: uncheck it to always show a
simple marker dot at the center instead, even when a polygon is
available. The dot is also used automatically whenever the event
carries no polygon at all (e.g. just a point) - it is then the only
option regardless of the checkbox. The incident area is
always kept fully visible when the polygon is drawn: if it wouldn't
fit into the image at the configured zoom level, the adapter
automatically zooms out (never in) just enough for the whole area to
fit, instead of clipping it at the edge.

**Zoom level**, **Marker & outline color** and **Image width/height**
all sit above that checkbox because they apply to *either* display
mode - the zoom level as described above for the polygon, or as a
fixed value for the marker dot; the color for the polygon outline, or
for the marker dot's core; width/height for the image itself either
way. Only **Outline thickness** is shown below the checkbox, since it
genuinely only affects the polygon outline - the marker dot's size is
fixed, not configurable.

The file path is written to `einsatzAktuell.kartenbildPfad` (see
[einsatzAktuell](#einsatzaktuell)) – typical use is attaching that file from a
Blockly/JavaScript script, e.g. as a Pushover notification attachment.
Only the 10 most recently generated images are kept on disk; older
ones are deleted automatically whenever a new one is written. Alarm
processing waits for the image to finish before continuing, so
`einsatzAktuell.kartenbildPfad` is guaranteed to already hold the correct
value by the time the rest of the incident's fields (e.g.
`einsatzAktuell.alarmAktiv`) become available – but only up to the
configurable **OSM timeout**: if the tile download/composition isn't
done within that time, a warning is logged and
`einsatzAktuell.kartenbildPfad` stays empty for that incident, without
blocking alarm processing indefinitely.

| Field | Description | Default |
| --- | --- | --- |
| OSM timeout (s) | Maximum time to wait for the image (tile download and composition) before continuing without it (1-60) | `10` |
| Zoom level | OpenStreetMap zoom level (1 = whole world, 19 = building level) - a maximum for the polygon (automatically reduced if needed to keep the incident area fully visible), a fixed value for the marker dot | `19` |
| Marker & outline color | Color of the centered marker dot, or of the incident-area outline when a polygon is drawn instead | `#DD2020` |
| Image width (px) | Width of the generated PNG | `600` |
| Image height (px) | Height of the generated PNG | `400` |
| Show incident-area polygon | Draw the original polygon WAIP-Web sends (on) vs. always show a centered marker dot instead (off) | *(on)* |
| Outline thickness (px) | Line thickness of the outline, in pixels (1-12) | `4` |

Images are stored under this adapter instance's own data directory
(`iobroker-data/<instance>/maps/`), not as ioBroker file objects –
`einsatzAktuell.kartenbildPfad` is therefore a real, absolute filesystem path
that a script running on the same host can read directly. This
directory is **not** deleted automatically when the adapter is
stopped or its instance configuration is reset; to remove it when
uninstalling, tick **"Also delete instance data"** in the confirmation
dialog when deleting the instance/adapter in Admin (available since
js-controller 4.0 / Admin 5 for any adapter's instance data directory
– unchecked by default).

> **Note:** This uses the official, free `tile.openstreetmap.org`
> server, which is intended for occasional/low-volume use (see the
> [OSM Tile Usage Policy](https://operations.osmfoundation.org/policies/tiles/)).
> One image per incident stays well within that – don't lower the zoom
> level to cover huge areas or otherwise turn this into bulk tile
> fetching.

### Dashboard

**Enable dashboard** (admin checkbox, off by default): mirrors the
last N incidents matching this instance's configured monitor as
`dashboard.einsatz1` … `dashboard.einsatzN`, in addition to the single
current incident already available under
[einsatzAktuell](#einsatzaktuell). This is useful with a monitor ID
scoped to "all dispatch monitors" (`0`) or to a wider district/carrier,
where several incidents can be active at once and `einsatzAktuell.*`
alone only ever shows the most recent one.

Unlike the always-on `/waip` connection this adapter otherwise keeps,
the dashboard is refreshed periodically: the adapter fetches the
public `/dbrd/` incident overview page, filters it down to incidents
matching this instance's monitor (same `l`/`a`/`b`/`c`
Leitstelle/Kreis/Träger/Wache correlation as the Monitor ID dropdown
itself - see [Connection](#connection)), and for each of up to N
matching incidents opens one **short-lived** Socket.IO connection in
turn (never in parallel) to collect its current state, then closes it
again. A full refresh therefore realistically takes a few seconds per
occupied `einsatzN`, not milliseconds - the minimum **Refresh interval**
below reflects that.

| Field | Description | Default |
| --- | --- | --- |
| Number of incidents to show | How many of the most recent matching incidents to show, `dashboard.einsatz1` … `einsatzN` (1-20) | `10` |
| Refresh interval (s) | How often the dashboard is refreshed (30-300) | `60` |

A refresh also runs once immediately after every adapter (re)start (so
the dashboard doesn't stay empty for up to the configured interval),
and once whenever a new alarm is received for this instance's own
monitor (`einsatzAktuell.*`) - in addition to the regular timer. A manual
refresh can be triggered any time via the `dashboard.refreshNow`
button state, e.g. from a VIS button or a script.

Map images shown as `dashboard.einsatzN.kartenbildPfad` are **not**
generated separately for the dashboard - they are looked up in the
same file history [Incident map image](#incident-map-image) already
produces for this instance's own monitor. `einsatzN` only has a map image
when this adapter has *already* generated one for that exact incident
via its own `einsatzAktuell.*` alarm handling - most complete when **Monitor
ID** is `0` (all dispatch monitors) and **Generate a map image for
each incident** is enabled, since then every incident that can appear
on the dashboard has also passed through `einsatzAktuell.*` at least once.
With a narrower Monitor ID, `einsatzN` entries for incidents outside that
monitor's own alarm history will have no map image - this is expected,
not a bug.

Disabling the feature removes the entire `dashboard.*` object tree
(channels and states, not just their values); reducing **Number of
incidents to show** removes only the now-unused `einsatzN` entries at the end
(e.g. going from 10 to 5 removes `dashboard.einsatz6` … `einsatz10`).
Both changes only take effect on the **next adapter restart** after
saving (ioBroker restarts the instance on any configuration change
anyway - the removal doesn't happen instantly while the admin dialog
is open).

## States (under `waip-web.0.*`)

Feedback and routes are 1:n lists per incident. They are stored as
**flat** JSON arrays under `einsatzAktuell.json.*` (no nested objects/arrays
inside a row) so they can be bound directly to VIS table widgets –
complemented by quick-to-bind counters so bindings and triggers don't
need JSON parsing at all.

### info

| State | Type | Description |
| --- | --- | --- |
| `connection` | boolean | Standard ioBroker indicator: connection to the WAIP server active |

### status

| State | Type | Description |
| --- | --- | --- |
| `connected` | boolean | Socket.IO connection technically established |
| `registeredMonitor` | string | Monitor ID last registered with the server |
| `registeredMonitorName` | string | Display name of that monitor, without the ID (e.g. "Leitstelle: Lausitz"); resolved once at startup from the same `/waip/` overview page as the admin dropdown, `null` if it couldn't be resolved |
| `registrationAccepted` | boolean | `true` once the first event was received, `false` right after connecting or once the registration timeout elapses |
| `registrationPending` | boolean | `true` right after connecting while a response from the server is still awaited, `false` once accepted or timed out |

### einsatzAktuell

Flat fields of the currently running incident. Cleared (`null`/`0`) on
`io.standby`, matching the official frontend – `alarmAktiv` is therefore
a reliable switch for whether these fields currently hold real live data.
The most recently finished incident remains available via
`einsatzAktuell.json.history`:

> **Note:** The adapter always reflects only the single most recently
> active incident (`einsatzAktuell.*` / `einsatzAktuell.json.current`) –
> matching the official WAIP-Web frontend's alarm monitor. WAIP-Web can,
> in principle, have several incidents active at the same time (e.g. two
> alerts coming in close together). These states are **not an array of
> concurrently running incidents** – they get overwritten by each new
> `io.new_waip` event, so a second incident running in parallel is
> currently not visible through this adapter. A complete overview of all
> currently active incidents is, for now, only available via the
> connected WAIP-Web instance's own dashboard.

> **Note:** WAIP-Web's server only fills `einsatznummer`, `objekt`/
> `objektteil`, `besonderheiten`, `strasse`/`hausnummer`,
> `einsatzdetails` and the permission flag for **logged-in** clients
> (`db_user_check_permission_for_waip()` in the server's own
> `server/waip.js`) - since this adapter connects without a login by
> design (see [About this adapter](#about-this-adapter)), the server
> always sends these blank/`false`. They are therefore not exposed as
> states at all rather than permanently carrying dead values.

| State | Type | Description |
| --- | --- | --- |
| `alarmAktiv` | boolean | `true` since the last `io.new_waip`, `false` since the last `io.standby` |
| `restzeit` | number (s) | Remaining seconds until `ablaufzeit`, updated every second |
| `id` | number | Internal incident ID |
| `uuid` | string | Unique incident UUID (also used to associate feedback) |
| `einsatzart` | string | e.g. "Brandeinsatz" (fire), "Hilfeleistungseinsatz" (technical assistance), "Rettungseinsatz" (rescue/EMS), "Krankentransport" (patient transport) |
| `stichwort` | string | Alarm keyword |
| `beschreibung` | string | Description for `stichwort`, resolved locally (not sent by the server) - see [Rescue service](#rescue-service)/[Keyword descriptions](#keyword-descriptions) below. `null` if nothing matched |
| `ort` | string | Location/town |
| `ortsteil` | string | District (if different from `ort`) |
| `alarmierungszeit` | string (date) | Alarm time |
| `ablaufzeit` | string (date) | End of the standby display duration, basis for `restzeit` |
| `sondersignal` | number | `1` = special signal (lights & siren), otherwise none |
| `latitude` / `longitude` | number | Incident location (normalized from wgs84 fields or GeoJSON centroid) |
| `kartenbildPfad` | string | Path to the most recently generated incident map image (PNG) - see [Incident map image](#incident-map-image). Empty until the first image for the current incident is ready; also cleared (stays empty) at the start of a new incident, if generation fails, or if it doesn't finish within the OSM timeout, and - like the other fields above - on `io.standby`. The underlying image file itself is not deleted when the state is cleared (only the 10-image retention limit removes files, see [Incident map image](#incident-map-image)) |
| `routenGesamt` | number | Number of routes in the current incident |
| `rueckmeldungenGesamt` | number | Total feedback count for the current incident |
| `rueckmeldungen.rollen.ek` | number | Feedback count as team member ("Einsatzkraft") |
| `rueckmeldungen.rollen.gf` | number | Feedback count as crew leader ("Gruppenführer") |
| `rueckmeldungen.rollen.zf` | number | Feedback count as division chief ("Zugführer") |
| `rueckmeldungen.rollen.vf` | number | Feedback count as group commander ("Verbandsführer") |
| `rueckmeldungen.funktionen.agt` | number | Feedback count with breathing-apparatus qualification ("Atemschutzgeräteträger") |
| `rueckmeldungen.funktionen.fzf` | number | Feedback count as vehicle commander ("Fahrzeugführer") |
| `rueckmeldungen.funktionen.ma` | number | Feedback count as driver/operator ("Maschinist") |
| `rueckmeldungen.funktionen.med` | number | Feedback count with a medical qualification |

### einsatzAktuell.json

Flat JSON objects/arrays, one level deep at most, meant to be bound
directly to VIS table widgets (nested structures like a plain
`{routen, rueckmeldungen, ...}` object generally aren't rendered by
those widgets). `routen`/`rueckmeldungen`/`emAlarmiert`/`emWeitere` only
ever hold the *current* incident's data – they are cleared (`[]`) on
`io.standby` and are **not** part of the history. As with
`einsatzAktuell.*` above, `current` only ever holds the single most
recently active incident – see the note in the
[`einsatzAktuell`](#einsatzaktuell) section.

| State | Type | Description |
| --- | --- | --- |
| `current` | string (JSON array) | Current incident's flat data: the same 12 fields as the individual `einsatzAktuell.*` states above (`id` … `sondersignal`, plus `beschreibung`, `alarmierungszeit`, `lat`/`lon`), plus `registeredMonitor`/`registeredMonitorName` (the monitor the adapter was registered to at the time), bundled as one object inside a single-element array (`[]` if no incident is active) – the array wrapper is needed because most table widgets require an array at the root, not a bare object |
| `history` | string (JSON array) | Last N completed incidents (`N` = the configured [Number of incidents in history](#connection), default 10), same shape as `current`, one array entry per incident, written on `io.standby` |
| `routen` | string (JSON array) | Routes of the current incident; each entry has `nr_wache`, `name_wache`, `color`, `lat`, `lon` (`position` resolved to flat `lat`/`lon` - see the note below on what `lat`/`lon` represents for a route) |
| `rueckmeldungen` | string (JSON array) | Feedback entries of the current incident, as received from the server |
| `emAlarmiert` | string (JSON array) | Alerted resources of the current incident; each entry has `name`, `zeit`, `wache`, `zeit_alarmierung_iso`, `zeit_ausgerueckt_iso` |
| `emWeitere` | string (JSON array) | Additional resources of the current incident, same shape as `emAlarmiert` |

> **Note:** `routen[].lat`/`.lon` is the **location of the alerted station**, not a
> point along the actual driving route and not the incident location. The server
> sends each route either as a full `LineString` (the calculated path from the
> station to the incident) or, when no path could be calculated, as a single
> coordinate pair for the station itself - in both cases the adapter resolves
> `lat`/`lon` to the station's location (the first point of the line in the
> `LineString` case) for a consistent meaning across all entries. The complete
> route geometry itself is not exposed as a state.

### einsatzAktuell.tts

Voice announcement (`io.playtts`) for the currently running incident –
lives under `einsatzAktuell` rather than its own top-level channel since
it has no meaning without an incident. No history: a TTS announcement
only matters in the moment, so only the most recent one is kept.

| State | Type | Description |
| --- | --- | --- |
| `last` | string (URL) | Full absolute URL of the most recent voice announcement's mp3 file. The server sends only a bare (often relative) path meant to be used as `audio.src` in a browser that shares its origin; the adapter resolves that against the configured WAIP server URL so the link also works outside the WAIP-Web page (e.g. in a VIS audio widget) |
| `lastTimestamp` | string (date) | Time of the last announcement |

<a id="dashboard-states"></a>

### dashboard

Only present when [Dashboard](#dashboard) is enabled - see there for
the object-tree lifecycle on enable/disable/resize. `dashboard.einsatzN`
(`N` = 1 … the configured number of incidents to show) mirrors the same
shape as `einsatzAktuell`/`einsatzAktuell.json` above, for the Nth most
recent incident matching this instance's monitor - **not** limited to
the single current incident. All fields of an occupied `einsatzN` are
always rewritten on every refresh (not just on change), so ongoing
feedback for an incident that stays at the same `einsatzN` across
refreshes keeps updating; an unoccupied `einsatzN` (fewer matching
incidents than configured) has all fields at their empty value, exactly
like `einsatzAktuell.*` when no incident is active.

Deliberately **without** `restzeit`/`ablaufzeit` (WAIP-Web's `/dbrd/`
incident-detail data has no equivalent field, unlike the live `/waip`
alarm stream) and without `einsatzAktuell.tts`'s equivalent (no TTS event
exists in the `/dbrd` namespace). `dashboard.einsatzN.json.wachen` has
no `einsatzAktuell.json.*` counterpart the other way around - it comes
from a field (`wachen[]`, the incident's participating stations) that
only the `/dbrd` payload includes.

| State | Type | Description |
| --- | --- | --- |
| `refreshNow` | boolean (button) | Write `true` to trigger an immediate dashboard refresh, e.g. from a VIS button or a script. Resets itself to `false` once the refresh completes |
| `einsatzN.alarmAktiv` | boolean | `true` while `einsatzN` is occupied by a matching incident |
| `einsatzN.id` | number | Internal incident ID |
| `einsatzN.uuid` | string | Unique incident UUID |
| `einsatzN.einsatzart` | string | Same meaning as [einsatzAktuell.einsatzart](#einsatzaktuell) |
| `einsatzN.stichwort` | string | Alarm keyword |
| `einsatzN.beschreibung` | string | Description for `stichwort`, resolved the same way as [einsatzAktuell.beschreibung](#einsatzaktuell) |
| `einsatzN.ort` | string | Location/town |
| `einsatzN.ortsteil` | string | District (if different from `ort`) |
| `einsatzN.alarmierungszeit` | string (date) | Alarm time |
| `einsatzN.sondersignal` | number | `1` = special signal (lights & siren), otherwise none |
| `einsatzN.latitude` / `einsatzN.longitude` | number | Incident location, same normalization as [einsatzAktuell](#einsatzaktuell) |
| `einsatzN.kartenbildPfad` | string | Path to a matching, previously generated incident map image - see [Dashboard](#dashboard) above. Empty if none was found |
| `einsatzN.routenGesamt` | number | Number of routes for `einsatzN`'s incident |
| `einsatzN.rueckmeldungenGesamt` | number | Total feedback count for `einsatzN`'s incident |
| `einsatzN.rueckmeldungen.rollen.*` / `.funktionen.*` | number | Same eight feedback counters as [einsatzAktuell.rueckmeldungen](#einsatzaktuell), per `einsatzN` |
| `einsatzN.json.current` | string (JSON array) | `einsatzN`'s flat incident data, same shape as `einsatzAktuell.json.current` (without `registeredMonitor`/`registeredMonitorName`) |
| `einsatzN.json.routen` | string (JSON array) | Routes of `einsatzN`'s incident, same shape as `einsatzAktuell.json.routen` |
| `einsatzN.json.rueckmeldungen` | string (JSON array) | Feedback entries of `einsatzN`'s incident |
| `einsatzN.json.emAlarmiert` | string (JSON array) | Alerted resources of `einsatzN`'s incident |
| `einsatzN.json.wachen` | string (JSON array) | Participating stations of `einsatzN`'s incident (`em_station_id`/`em_station_name`) - only available via `/dbrd`, no `einsatzAktuell.json.*` counterpart |

### debug

| State | Type | Description |
| --- | --- | --- |
| `lastEvent` | string (JSON array) | Last received socket event (name + timestamp), for connection diagnostics; single-element array (`[]` if none yet), for VIS table-widget compatibility |
| `normalizedPosition` | string (JSON array) | Result of the geodata normalization for the last `io.new_waip` event, as a flat single-element `[{lat, lon}]` array (both `null` if no valid position could be derived; `[]` if no event yet), for VIS table-widget compatibility |
| `rawPayloadShort` | string | Preview (500 characters) of the raw, unnormalized `io.new_waip` payload |
| `ignoredCount` | number | Count of discarded events (payload explicitly named a different monitor ID) |
| `monitorAudit` | string (JSON array) | Chronological log of connect/registration/reconnect events (200 entries) |
| `sessionExpires` | string (date) | Expiry time of the session cookie as of the last renewal |
| `lastError` | string | Last error message reported by the server (`io.error`); plain text, not JSON, as the server sends this as a bare string |
| `serverVersion` | string | Last reported server instance ID (`io.version`); a change suggests a server restart |

## Logging

All log text is in English. Repeatable failure conditions (session-cookie
renewal, WAIP registration, the Socket.IO connection, a wrong-monitor
event flood) are logged once at `warn` on first occurrence, then at
`debug` while they persist, and once at `info` on recovery – matching the
[official ioBroker logging guideline](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#logging).

See **[LOGGING.md](/#/docs/adapterref/iobroker.waip-web/LOGGING.md)** for the full reference of every log
message the adapter can produce, grouped by level, with its cause and an
example.

## Changelog

<!--
    Placeholder for the next version. Keep this line directly below the
    comment; `npm run release` replaces it with the new version heading.
    Re-add it afterwards (or use `npm run release -- --addPlaceholder`).
    Collect changes for the upcoming release underneath it.
-->
### **WORK IN PROGRESS**

- `registrationTimeoutSec` and `reconnectDelaySec` are now clamped in
  code to their admin UI range (1-120s), matching how every other
  numeric configuration value (e.g. `historySize`, `mapImageWidth`) was
  already handled - a direct instance config JSON edit/import can no
  longer set them outside that range.
- The `stateChange` listener (used only for `dashboard.refreshNow`) is
  now registered only while the Dashboard feature is enabled, matching
  its `subscribeStates()` call, instead of unconditionally in the
  constructor.

### 1.0.0 (2026-08-30)

- **Breaking change:** the `einsatz` channel is renamed to `einsatzAktuell`
  (to distinguish it from the `dashboard.einsatz1` … `einsatzN` dashboard
  channels), and `einsatzAktuell.json.history10` is renamed to
  `einsatzAktuell.json.history`, now holding a configurable number of
  entries (new "Number of incidents in history" setting on the
  [Connection](#connection) tab, 1-100, default 10). Update any VIS
  bindings/scripts referencing the old `einsatz.*`/`einsatz.json.history10`
  paths - they are removed automatically on upgrade, along with their
  values.
- Dashboard channel/state display names are now consistent: they use
  "Einsatz N" throughout, matching the `einsatzAktuell.*` naming, and
  the redundant "flat JSON array" phrase was removed from every state
  name. Object IDs are unaffected, only the display names shown in
  Admin/VIS.

### 0.12.1 (2026-08-30)

- Fixed the Dashboard admin config: the tab was mistranslated as "Armaturenbrett"
  (car dashboard) in German instead of "Dashboard", its help texts used
  wrong/mistranslated terms ("Versandzentrum"/"Vorfall" instead of
  "Leitstelle"/"Einsatz"), and the refresh interval label was missing its "(s)"
  unit suffix.
- Fixed `routen[].lat`/`.lon` (both `einsatz.json.routen` and
  `dashboard.einsatzN.json.routen`): previously resolved to the geometric
  bounding-box center of the entire route line - a point with no real meaning,
  since it lies "somewhere along the way" rather than at any actual location.
  Now resolves to the alerted station's own location instead (the first point of
  the route line, matching a separate coordinate-pair format the server sends
  when no route could be calculated for a station). Also fixed
  `dashboard.einsatzN.json.routen` specifically: it was missing the same geo
  normalization `einsatz.json.routen` already applied, so a route's raw,
  unresolved geometry (dozens of coordinate pairs) or the raw fallback
  coordinate field ended up in the written JSON instead of flat `lat`/`lon`.

### 0.12.0 (2026-08-28)

- New optional [Dashboard](#dashboard) feature: mirrors the last N
  incidents matching this instance's monitor as `dashboard.einsatz1`
  … `einsatzN` (off by default). Uses short-lived Socket.IO connections
  to WAIP-Web's `/dbrd` namespace polled on a configurable interval,
  not a permanent connection - see [Dashboard](#dashboard) and
  [dashboard states](#dashboard-states) for the full behavior,
  including the manual refresh button and the object-deletion behavior
  when disabling the feature or reducing the number of incidents to show.

### 0.7.38 (2026-08-27)

- Fixed a race condition where a routes update (`io.routes`) or TTS
  announcement (`io.playtts`) arriving while an incident was being
  finalized could still repopulate `einsatz.json.current`,
  `einsatz.json.routen` and `einsatz.routenGesamt` for the already
  finished incident. The 0.7.37 guard checked a flag that was only
  cleared at the very end of the finalization, leaving a window open
  across several `await` points.
- Fixed lost entries in `debug.monitorAudit`: the log was written with an
  unsynchronized read-modify-write, so two entries created within
  milliseconds of each other (e.g. `connect_called` followed by
  `emit_WAIP`) could overwrite one another. Writes are now serialized.
- Fixed configuration values falling back to the minimum instead of the
  default when a numeric admin field is left empty - an empty zoom field
  produced zoom 1 (the whole world map) instead of the configured
  default, and an empty width field produced 100px instead of 600px.
- Added a unit test suite (`npm run test:unit`, 75 tests) covering the
  geo normalization, the keyword decoder/table, the monitor matching and
  the state-definition consistency. `npm test` now runs it alongside the
  package tests.

### 0.7.37 (2026-08-26)

- Fixed a bug where a routes update (`io.routes`) or TTS announcement
  (`io.playtts`) arriving after an incident had already ended
  (`io.standby`) could revive `einsatz.json.current`/`.routen`/
  `einsatz.routenGesamt` or `einsatz.tts.last`/`.lastTimestamp` for the
  already-finished incident, while every other `einsatz.*` field
  correctly stayed cleared. Both handlers now ignore such events while
  no incident is active.

Older entries have been moved to CHANGELOG_OLD.md.

## License

MIT License (this adapter) – see [LICENSE](https://github.com/rnc11/ioBroker.waip-web/blob/main/LICENSE).

The adapter connects to instances of
[WAIP-Web](https://github.com/Robert-112/n112_waip-web), which is licensed
under CC BY-SA 4.0 by Robert-112. This adapter contains no code from that
project.

Copyright (c) 2026 rnc11

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