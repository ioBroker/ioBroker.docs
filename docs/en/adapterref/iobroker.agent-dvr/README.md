![Logo](admin/agent-dvr.png)
# ioBroker.agent-dvr

[![NPM version](https://img.shields.io/npm/v/iobroker.agent-dvr.svg)](https://www.npmjs.com/package/iobroker.agent-dvr)
[![Downloads](https://img.shields.io/npm/dm/iobroker.agent-dvr.svg)](https://www.npmjs.com/package/iobroker.agent-dvr)
![Number of Installations](https://iobroker.live/badges/agent-dvr-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/agent-dvr-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.agent-dvr.png?downloads=true)](https://nodei.co/npm/iobroker.agent-dvr/)

**Tests:** ![Test and Release](https://github.com/ipod86/ioBroker.agent-dvr/workflows/Test%20and%20Release/badge.svg)

## agent-dvr adapter for ioBroker

Connects ioBroker to [AgentDVR](https://www.ispyconnect.com): auto-discovers all cameras, mirrors every device property as data points, provides buttons for all common commands (record, arm, PTZ, …), delivers push-triggered gallery updates on new recordings, generates a responsive HTML gallery widget per camera, and includes a built-in live dashboard with per-camera stream selection (MJPEG, MP4/FLV with audio, or go2rtc WebRTC).

## Requirements

- ioBroker with `iobroker.web` adapter
- **AgentDVR ≥ 7.8.0.0** — earlier versions have a regression in the `streamFile.cgi` endpoint (malformed chunked encoding, wrong MIME type) that prevents recording playback in the built-in dashboard. The developer has confirmed the fix is included in 7.8.0.0.

## Features

- Auto-discovery of all AgentDVR cameras on startup (microphones excluded)
- All device properties mirrored as data points (flattened from the API)
- Per-device control buttons: record, snapshot, detect, arm/disarm alerts, switch on/off, object detection, schedule on/off, detector on/off, sensitivity (min/max/gain), purge, …
- System-level buttons: arm, disarm, all on/off, reload, storage management, restart, …
- **Profile selector** — writable dropdown reflecting the current AgentDVR profile (Home / Away / Night / custom)
- **Snapshot as Base64** — `snapshot_b64` state per camera, writable via button or auto-updated every poll cycle
- PTZ control with hold-to-move switches
- Stream URLs per camera (snapshot, photo, MJPEG, MP4)
- Webhook endpoint for real-time updates — call it from an AgentDVR action to trigger an immediate full poll
- HTML recording gallery widget per camera (`widget_recordings`) and single-camera live tile (`widget_live`) — pure HTML/CSS or full JS mode with search and tag filter
- Overview widget combining all cameras in one HTML state
- **Built-in live dashboard** at `http://<iobroker>:<webport>/agent-dvr.0/` — no additional app needed:
  - Per-camera stream selection: MJPEG, MP4/FLV with audio, or go2rtc WebRTC/MSE
  - Camera filter button in the header (funnel icon) — opens a per-camera checkbox popover; badge shows how many cameras are hidden; state saved in localStorage
  - Real-time motion and alert indicators (yellow / orange tile border) via Socket.io
  - Fullscreen view with PTZ overlay, record, mute, and native browser fullscreen button; header auto-hides
  - Recordings tab with grid, timeline, and event log view, search, collapsible tag filter, and video player with prev/next navigation
  - Delete recording directly from the video player modal (requires AgentDVR v7.7.8.0+)
  - Recording display settings — ⚙ gear in the select/delete bar adjusts grid column width, max recordings shown and badge visibility (persisted in localStorage)
  - Camera colors are read from AgentDVR and applied to timeline bars and recording dots
  - PTZ presets — navigate to saved presets from the PTZ overlay (requires AgentDVR v7.7.8.0+)
  - Status bar shows camera count on the live view and recording/event count on the recordings view
  - Auto-reconnect for all stream types after network interruption or tab switch
  - Fully color-themeable via adapter config

## Configuration

### Tab: Connection

| Setting | Description | Default |
|---------|-------------|---------|
| AgentDVR IP | IP address of the AgentDVR server | — |
| Port | AgentDVR HTTP port | `8090` |
| Username | Optional HTTP basic auth username | — |
| Password | Optional HTTP basic auth password | — |
| Poll interval (s) | How often to fetch data from AgentDVR (5–3600) | `30` |
| HTTP timeout (ms) | Timeout per API request (1000–30000) | `8000` |

### Tab: Features

**Controls**

| Setting | Description | Default |
|---------|-------------|---------|
| System control buttons | Create arm/disarm/restart/… buttons and the profile selector | `true` |
| PTZ control buttons | Create per-camera PTZ hold-switches (left, right, up, down, diagonals, zoom, stop, center) | `true` |
| Generate stream URLs | Create URL states (snapshot, MJPEG, MP4) per camera | `true` |
| Snapshot as Base64 | Auto-fetch and store the current frame as Base64 on every poll | `false` |

**Events**

| Setting | Description | Default |
|---------|-------------|---------|
| Event data points | Mirror recording metadata (latest event, count, tags, …) per camera | `true` |

**Display**

| Setting | Description | Default |
|---------|-------------|---------|
| Overview widget | Single HTML state combining all camera live tiles | `true` |

**Proxy**

| Setting | Description | Default |
|---------|-------------|---------|
| Media proxy | Route MJPEG streams, snapshots, recording thumbnails and videos through ioBroker | `false` |

**Debug**

| Setting | Description | Default |
|---------|-------------|---------|
| Store raw API JSON | Write the full getObjects response to `system.raw_getObjects` | `false` |

### Tab: Dashboard

**Default view**

| Setting | Description | Default |
|---------|-------------|---------|
| Default view | Which tab opens when the dashboard loads: Live or Recordings | `Live` |
| Show offline cameras | Display camera tiles even when the camera is offline | `true` |
| Max. recordings total | Maximum number of recordings shown across all cameras in the dashboard (newest first). Independent of the widget limit. | `200` |

**Camera grid**

| Setting | Description | Default |
|---------|-------------|---------|
| Columns | Number of grid columns (0 = auto-fit based on tile width) | `0` |
| Buttons always visible | Show record/PTZ buttons permanently instead of on hover only | `false` |
| Tag-badge position | Corner where the camera name badge appears on each tile | `bottom-right` |

**Stream**

| Setting | Description | Default |
|---------|-------------|---------|
| Refresh interval (s) | How often the dashboard re-fetches camera data (10–600) | `60` |
| Auto-reconnect streams | Automatically reconnect MJPEG, MP4/FLV and go2rtc streams after an error or tab switch | `true` |

**Color theme** — 7 color pickers to match your UI:

| Setting | Description |
|---------|-------------|
| Background | Page/grid background color |
| Surface | Camera tile background |
| Accent | Highlight / active element color |
| Text | Primary text color |
| Border | Tile border color |
| Online indicator | Color of the online status dot |
| Offline indicator | Color of the offline status dot |

**Stream assignment**

Here you assign a stream source to each camera individually. The dropdown shows all cameras discovered from AgentDVR (microphones are excluded).

| Option | Description |
|--------|-------------|
| MJPEG *(AgentDVR)* | Classic MJPEG stream served by AgentDVR — lowest latency, no audio |
| MP4 / FLV with audio *(AgentDVR)* | FLV stream proxied through ioBroker using flv.js — includes audio, correct aspect ratio |
| *stream name* *(go2rtc)* | WebRTC/MSE stream from go2rtc — smooth, low latency, audio support |

The go2rtc stream names are fetched automatically from the go2rtc server when the admin UI is open. If the browser cannot reach go2rtc directly (e.g. mixed-content on HTTPS), the adapter fetches them on the server side as a fallback.

**go2rtc URL** *(only visible when at least one camera uses a go2rtc stream)*

| Setting | Description | Example |
|---------|-------------|---------|
| go2rtc URL | Base URL of your go2rtc instance | `http://192.168.1.10:1984` |

> **Note:** go2rtc must already have the streams configured. The adapter only reads the stream list and proxies the WebSocket — it does not configure go2rtc.

### Tab: Widget (gallery widget per camera)

**General**

| Setting | Description | Default |
|---------|-------------|---------|
| Enable widget | Generate an HTML gallery widget per camera | `true` |
| Widget mode | `No JS` — pure HTML/CSS, embed anywhere; `JS` — full interactivity with search and tag filter | `No JS` |

**Layout**

| Setting | Description | Default |
|---------|-------------|---------|
| Max. entries | Maximum number of recordings shown in the widget | `20` |
| Min. column width (px) | Minimum width of each thumbnail column | `150` |
| Max. modal width (px) | Maximum width of the video playback modal | `900` |

**Tags**

| Setting | Description | Default |
|---------|-------------|---------|
| Show tags | Display recording tags on each thumbnail | `true` |
| Tag-badge position | Corner where tags appear on the thumbnail | `bottom-left` |

**Filter**

| Setting | Description | Default |
|---------|-------------|---------|
| Newest first | Sort recordings with the latest at the top | `true` |
| Show search | Show a text search field in JS mode | `false` |
| Compact mode | Denser layout with smaller thumbnails | `false` |
| Default tag | Pre-select this tag filter when the widget loads | — |
| Thumbnail size | `Small` / `Medium` / `Large` | `Medium` |

**Player**

| Setting | Description | Default |
|---------|-------------|---------|
| Live aspect ratio | Aspect ratio for the live stream preview, e.g. `16/9` | — |
| Player URL | Custom URL for the video player used in the widget | — |

**Color theme** — 5 color pickers + border radius:

| Setting | Description |
|---------|-------------|
| Card background | Widget card background |
| Tag background | Tag chip background |
| Tag text | Tag chip text color |
| Accent | Highlight color |
| Modal background | Video modal background |
| Border radius (px) | Rounded corner radius for cards | `4` |

### Tab: Advanced

| Setting | Description | Default |
|---------|-------------|---------|
| Max. recursion depth | How many levels deep the API JSON is flattened into data points (1–10) | `6` |
| Max. array entries | Maximum number of array elements mirrored per property (1–500) | `30` |
| Dynamic tags | Automatically create a tag data point for every unique recording tag | `false` |
| Ignore tags (comma-separated) | Recording tags to exclude from event data points | — |
| Tag filter (comma-separated) | Only create event data points for recordings matching these tags | — |

## Live Dashboard

The adapter ships a built-in live dashboard at `http://<iobroker>:<webport>/agent-dvr.0/`.
A second instance is reachable at `/agent-dvr.1/`, a third at `/agent-dvr.2/`, and so on.

**Features:**
- Per-camera stream selection: MJPEG, MP4/FLV with audio (via flv.js), or go2rtc WebRTC/MSE
- Camera filter button (funnel icon, header top-right) — opens a per-camera checkbox popover with an "All" toggle; badge shows the number of hidden cameras; state persisted in localStorage
- Fullscreen view with PTZ overlay, record button, mute button, and native browser fullscreen (header auto-hides after 3 s of inactivity; reappears on mouse or touch)
- Real-time motion (yellow border) and alert (orange border) indicators via Socket.io
- Auto-reconnect: MJPEG and FLV reconnect after error; go2rtc reconnects after unexpected WebSocket close or 10 s stall
- Recordings tab with grid, timeline, and event log view, search, collapsible tag filter, and video player with prev/next navigation
- Tag filter splits AgentDVR's comma-separated tags into individual chips for per-tag filtering
- Delete recording from the video player modal or select multiple with a long-press and bulk-delete (requires AgentDVR v7.7.8.0+)
- Recording display settings — ⚙ gear button in the select/delete bar; slider for grid column width, max recordings override, and badge toggle — all saved in localStorage
- New-recordings badge on the Recordings tab — shows how many recordings arrived since you last visited that tab; the baseline is stored in the browser's localStorage and is per-browser/per-device (not shared across different browsers or devices)
- Camera colors are read from AgentDVR and applied to timeline bars and recording dots
- PTZ presets — navigate to saved presets from the PTZ overlay; single selector data point per camera (requires AgentDVR v7.7.8.0+)
- Status bar shows camera count, CPU/RAM usage and disk free space
- Color theming via adapter config

### go2rtc WebRTC Streams

[go2rtc](https://github.com/AlexxIT/go2rtc) provides smooth, low-latency WebRTC/MSE streams with audio.

**Setup:**
1. Install and run go2rtc, configure your camera streams in go2rtc's config.
2. In the adapter config → *Dashboard* tab, assign the desired go2rtc stream name to each camera from the dropdown.
3. Enter the **go2rtc URL** that appears below the table (e.g. `http://192.168.1.10:1984`).
4. Save and restart. The adapter proxies WebSocket traffic through ioBroker to avoid browser cross-origin restrictions.

## Media Proxy

The adapter can route all media through ioBroker so the browser never needs a direct connection to AgentDVR. Enable **Media proxy** on the Features tab.

| What is proxied | Proxy off | Proxy on |
|-----------------|-----------|----------|
| MJPEG live stream | direct AgentDVR URL | `/agent-dvr.0/api/mjpeg?oid=…` |
| Snapshot | direct AgentDVR URL | `/agent-dvr.0/api/snap?oid=…` |
| Recording thumbnails | direct AgentDVR URL | `/agent-dvr.0/api/thumb?oid=…` |
| Recording videos | direct AgentDVR URL | `/agent-dvr.0/api/media?oid=…` |
| FLV live stream | **always via ioBroker** | **always via ioBroker** |
| go2rtc WebSocket | **always via ioBroker** | **always via ioBroker** |

FLV and go2rtc always run through ioBroker regardless of the setting — the browser cannot make cross-origin requests to these endpoints directly.

### When to enable

- You access the dashboard from outside your home network where AgentDVR is not directly reachable from the browser
- Only ioBroker is exposed externally (e.g. via reverse proxy or VPN to ioBroker only)

### When to leave it off

- Browser and AgentDVR are on the same network (local access)
- Direct connection is faster — no extra hop, lower latency
- Less load on the ioBroker server — streams do not pass through Node.js

> The setting takes effect immediately after saving — no restart required.

## Data points

`<cam>` stands for `cam_<oid>_<name>`, e.g. `cam_8_Reolink`.

### System

| Data point | Type | R/W | Description |
|-----------|------|-----|-------------|
| `system.online` | boolean | R | Connection to AgentDVR established |
| `system.lastUpdate` | string | R | ISO timestamp of last successful poll |
| `system.lastPoll` | number | R | Unix timestamp of last poll |
| `system.cameraCount` | number | R | Number of cameras discovered |
| `system.disk_free_gb` | number | R | Free disk space in GB |
| `system.settings.*` | various | R | Flattened AgentDVR server settings |
| `system.stats.*` | various | R | CPU / RAM / disk stats |
| `system.status.*` | various | R | System status (armed, devices, version, …) |
| `system.raw_getObjects` | string | R | Raw getObjects JSON (if enabled) |

### System controls *(requires "System control buttons")*

| Data point | Type | R/W | Description |
|-----------|------|-----|-------------|
| `system.control.arm` | button | W | Arm the system |
| `system.control.disarm` | button | W | Disarm the system |
| `system.control.allOn` | button | W | Switch all devices on |
| `system.control.allOff` | button | W | Switch all devices off |
| `system.control.reloadConfig` | button | W | Reload AgentDVR configuration |
| `system.control.reloadObjects` | button | W | Reload objects |
| `system.control.runStorageMgmt` | button | W | Run storage management |
| `system.control.blockExternal` | button | W | Block external access |
| `system.control.unblockExternal` | button | W | Unblock external access |
| `system.control.restart` | button | W | Restart AgentDVR |
| `system.control.refresh` | button | W | Force immediate poll |
| `system.profile.selector` | number | R/W | Active profile index — dropdown (0 = Home, 1 = Away, …) |
| `system.profile.list` | string | R | Available profiles as JSON array |

### Per camera

| Data point | Type | R/W | Description |
|-----------|------|-----|-------------|
| `<cam>.name` | string | R | Camera name |
| `<cam>.data.online` | boolean | R | Camera is online |
| `<cam>.data.connected` | boolean | R | Stream is connected |
| `<cam>.data.recording` | boolean | R | Currently recording |
| `<cam>.data.detected` | boolean | R | Motion/object detected |
| `<cam>.data.detectorActive` | boolean | R | Motion detector enabled |
| `<cam>.data.alertsActive` | boolean | R | Alerts enabled |
| `<cam>.data.alerted` | boolean | R | Alert currently active |
| `<cam>.data.scheduleActive` | boolean | R | Schedule enabled |
| `<cam>.data.width` / `height` | number | R | Stream resolution |
| `<cam>.data.*` | various | R | All further device properties from AgentDVR |
| `<cam>.snapshot_b64` | string | R | Current frame as `data:image/jpeg;base64,…` (role `media.picture`) |
| `<cam>.control.record` | button | W | Start recording |
| `<cam>.control.recordStop` | button | W | Stop recording |
| `<cam>.control.recordRestart` | button | W | Restart recording |
| `<cam>.control.triggerRecord` | button | W | Trigger recording (runs until timeout) |
| `<cam>.control.snapshot` | button | W | Tell AgentDVR to save a snapshot to disk |
| `<cam>.control.refreshSnapshotB64` | button | W | Fetch current frame and write to `snapshot_b64` |
| `<cam>.control.detect` | button | W | Trigger motion detection |
| `<cam>.control.alertOn` | button | W | Arm alerts |
| `<cam>.control.alertOff` | button | W | Disarm alerts |
| `<cam>.control.switchOn` | button | W | Switch camera on |
| `<cam>.control.switchOff` | button | W | Switch camera off |
| `<cam>.control.objectDetectOn` | button | W | Enable object detection *(cameras only)* |
| `<cam>.control.objectDetectOff` | button | W | Disable object detection *(cameras only)* |
| `<cam>.control.scheduleOn` | button | W | Enable the device schedule |
| `<cam>.control.scheduleOff` | button | W | Disable the device schedule |
| `<cam>.control.detectorOn` | button | W | Enable the motion detector |
| `<cam>.control.detectorOff` | button | W | Disable the motion detector |
| `<cam>.control.sensitivityMin` | number 0–100 | R/W | Detector sensitivity — minimum threshold *(cameras only)* |
| `<cam>.control.sensitivityMax` | number 0–100 | R/W | Detector sensitivity — maximum threshold *(cameras only)* |
| `<cam>.control.sensitivityGain` | number 0–100 | R/W | Detector sensitivity — gain *(cameras only)* |
| `<cam>.control.recOnAlert` | button | W | Enable "record on alert" |
| `<cam>.control.recOnDetect` | button | W | Enable "record on detect" |
| `<cam>.control.purge` | button | W | Delete all recordings for this camera |

### PTZ *(requires "PTZ control buttons")*

| Data point | Type | R/W | Description |
|-----------|------|-----|-------------|
| `<cam>.control.ptz.left` | switch | R/W | Pan left (hold to keep moving) |
| `<cam>.control.ptz.right` | switch | R/W | Pan right |
| `<cam>.control.ptz.up` | switch | R/W | Tilt up |
| `<cam>.control.ptz.down` | switch | R/W | Tilt down |
| `<cam>.control.ptz.upLeft` | switch | R/W | Diagonal up-left |
| `<cam>.control.ptz.upRight` | switch | R/W | Diagonal up-right |
| `<cam>.control.ptz.downLeft` | switch | R/W | Diagonal down-left |
| `<cam>.control.ptz.downRight` | switch | R/W | Diagonal down-right |
| `<cam>.control.ptz.zoomIn` | switch | R/W | Zoom in |
| `<cam>.control.ptz.zoomOut` | switch | R/W | Zoom out |
| `<cam>.control.ptz.stop` | button | W | Stop PTZ movement |
| `<cam>.control.ptz.center` | button | W | Move to center/home position |
| `<cam>.control.ptz.preset` | number | R/W | Preset selector — write index to move to that preset; states enum lists preset names (requires AgentDVR v7.7.8.0+) |

### Stream URLs *(requires "Generate stream URLs")*

| Data point | Type | R/W | Description |
|-----------|------|-----|-------------|
| `<cam>.urls.snapshot` | string | R | URL to current JPEG snapshot *(cameras only)* |
| `<cam>.urls.photo` | string | R | URL to photo endpoint *(cameras only)* |
| `<cam>.urls.mjpeg` | string | R | URL to MJPEG live stream *(cameras only)* |
| `<cam>.urls.mp4` | string | R | URL to MP4 live stream *(cameras only)* |
| `<mic>.urls.audio_mp3` | string | R | URL to MP3 audio stream *(microphones only)* |
| `<mic>.urls.audio_ogg` | string | R | URL to OGG audio stream *(microphones only)* |

### Events / Gallery *(cameras only)*

| Data point | Type | R/W | Description |
|-----------|------|-----|-------------|
| `<cam>.events.*` | various | R | Latest recording metadata — requires "Event data points" |
| `<cam>.widget_recordings` | string | R | HTML recording gallery — requires "Gallery widget" |
| `<cam>.widget_live` | string | R | HTML single-camera live tile — requires "Gallery widget"; snapshot refreshes on each adapter poll |

## Webhook

The adapter exposes a webhook endpoint that triggers an immediate full poll of AgentDVR:

```
GET http://<iobroker>:<webport>/agent-dvr.0/webhook
```

Replace `agent-dvr.0` with the actual instance number (`agent-dvr.1`, etc.) if you run multiple instances.

Configure this URL as an **Action** in AgentDVR (Camera → Edit → Alerts → Actions → URL) to get real-time updates whenever a recording finishes or an alert fires. The adapter will immediately re-fetch all camera data, recordings, and system stats — no need to wait for the next poll cycle.

Returns `{"ok":true}` on success.

### Overview *(requires "Overview widget")*

| Data point | Type | R/W | Description |
|-----------|------|-----|-------------|
| `widget_live_overview` | string | R | HTML tile grid of all cameras — snapshot refreshes on each adapter poll |

## Changelog

### 0.5.2 (2026-08-05)
* (ipod86) feat: rename `overview` DP to `widget_live_overview` for consistent naming

### 0.5.1 (2026-08-05)
* (ipod86) feat: per-instance URL routing — each adapter instance uses its own URL namespace (`agent-dvr.0/`, `agent-dvr.1/`, …)
* (ipod86) feat: rename per-camera recording widget DP from `widget` to `widget_recordings`; add new `widget_live` DP with a single-camera live tile

### 0.5.0 (2026-08-03)
* (ipod86) feat: replace live-view camera chip-bar with compact header filter button — funnel icon opens a popover with per-camera checkboxes and drag-to-reorder; order persisted in localStorage
* (ipod86) feat: new-recordings badge on the Recordings tab — shows count of recordings since last visit; persisted per browser/device in localStorage
* (ipod86) feat: recording display settings panel — ⚙ gear button in the select/delete bar; grid column width slider, max-recordings override, badge toggle (all persisted in localStorage)
* (ipod86) feat: first-visit onboarding modals for live view (camera filter & sort) and recordings tab (gestures, gear panel, badge)
* (ipod86) feat: webhook endpoint `/agent-dvr.0/webhook` triggers immediate full poll — configure as AgentDVR action for real-time updates
* (ipod86) feat: PTZ presets — navigate to saved presets from PTZ overlay; single selector DP `<cam>.control.ptz.preset` per camera (requires AgentDVR v7.7.8.0+)
* (ipod86) feat: add event log view to recordings panel (clock icon toggle) alongside grid and timeline
* (ipod86) feat: delete recording from video modal (trash icon, two-click confirm, requires AgentDVR v7.7.8.0+)
* (ipod86) feat: bulk-delete recordings — long-press a tile to enter select mode, checkbox each recording, delete all at once
* (ipod86) feat: new `dashMaxRec` config setting — limits total recordings shown across all cameras in the dashboard (independent of widget limit, default 200)
* (ipod86) feat: tag filter splits AgentDVR's comma-separated tags into individual chips for per-tag filtering
* (ipod86) feat: read camera color from AgentDVR and use it for timeline bars and recording dots
* (ipod86) feat: status bar shows CPU usage, RAM % and free, disk usage % and free alongside camera/recording counts
* (ipod86) feat: reset colors to defaults button in Live Dashboard settings tab
* (ipod86) refactor: remove per-camera pushTrigger data points in favour of the global webhook
* (ipod86) fix: new-recordings badge now correctly visible (display:none CSS fallback fixed)
* (ipod86) fix: record button moved to rightmost position in grid tiles and fullscreen panel
* (ipod86) fix: camera filter button no longer changes appearance when cameras are hidden
* (ipod86) fix: header z-index lifted so the camera filter popover renders above the main content area
* (ipod86) fix: drive object pruning regex corrected; stale drive entries are now properly removed
* (ipod86) fix: deleted recordings no longer reappear after the next adapter poll
* (ipod86) fix: extend video format error message with AgentDVR auto-convert hint in all 11 languages
* (ipod86) fix: FLV stream and grid tile layout scaling corrections
* (ipod86) fix: Italian i18n string with apostrophe broke page JS (changed to escaped variant)
* (ipod86) fix: detect AgentDVR "Command not found" response on delete and show proper error message

### 0.4.3 (2026-07-19)
* (ipod86) fix: switch polling loop from setInterval to setTimeout to prevent concurrent poll runs
* (ipod86) fix: httpTimeoutMs=0 now correctly clamps to 1000ms instead of falling back to default
* (ipod86) fix: go2rtcEnabled config flag is now honored in fetchGo2rtcStreams
* (ipod86) fix: remove unused isSupportedLang export from widget-i18n

### 0.4.2 (2026-07-12)
* (ipod86) fix: FLV stream proxy now sends Authorization header (HTTP 401 with AgentDVR auth)
* (ipod86) fix: dashboard camera online status was read from wrong state path (data.online → status.online)
* (ipod86) fix: MP4/FLV stream label was hardcoded German — now translated in all 11 languages
* (ipod86) fix: admin UI default values now match io-package.json (dashTagPosition, widgetAnzahl, widgetBorderRadius)
* (ipod86) fix: go2rtcEnabled flag now respected when loading streams in admin UI
* (ipod86) fix: enableStreamProxy missing from native defaults in io-package.json

### 0.4.1 (2026-07-12)
* (ipod86) fix: overview tile links to ioBroker host; go2rtc URL shown only when enabled

### 0.4.0 (2026-07-12)
* (ipod86) feat: optional MJPEG and snapshot stream proxy through ioBroker (browser needs only one connection to ioBroker, not directly to AgentDVR)

### 0.3.0 (2026-07-06)
* (ipod86) feat: add scheduleOn/Off and detectorOn/Off control buttons for cameras and microphones
* (ipod86) feat: add sensitivityMin, sensitivityMax, sensitivityGain level states for cameras (0–100)
* (ipod86) feat: add audio_mp3 and audio_ogg URL states for microphones
* (ipod86) fix: restrict objectDetectOn/Off and snapshot buttons to cameras (ot=2) only
* (ipod86) feat: inline flv.js into dashboard HTML — no external file required
* (ipod86) fix: preserve FLV stream aspect ratio after tab visibility change (all three player call sites)
* (ipod86) feat: collapsible tag filter row on recordings and timeline pages
* (ipod86) feat: native browser fullscreen button in live view modal with correct aspect ratio
* (ipod86) feat: live view modal header auto-hides after 3 s of inactivity; reappears on mouse/touch
* (ipod86) fix: add fsEnter, fsExit, filterByLabel, timelineView, closePanel i18n keys in all 10 languages

[Older changelog entries in CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 ipod86 <david@graef.email>

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
