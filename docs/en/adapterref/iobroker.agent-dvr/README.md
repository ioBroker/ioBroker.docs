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

> This is a community-maintained integration, not affiliated with or supported by iSpyConnect. Please report issues via [this repository's GitHub tracker](https://github.com/ipod86/ioBroker.agent-dvr/issues), not iSpyConnect support channels.

## Requirements

- ioBroker with `iobroker.web` adapter
- **AgentDVR ≥ 7.8.0.0** — earlier versions have a regression in the `streamFile.cgi` endpoint (malformed chunked encoding, wrong MIME type) that prevents recording playback in the built-in dashboard. The developer has confirmed the fix is included in 7.8.0.0.

## Highlights

### Web components for AURA, vis-2 and devices
The recordings gallery, the live tile and the live overview are also available as web components (`@iobroker/web-components`). AURA (0.106.0+, 0.112.0+ recommended), vis-2 (2.20.7+) and the devices adapter (4.3.0+) list them in their widget palette — no HTML binding needed. They draw natively in the browser instead of showing the HTML data points, so a refresh never closes an open player.
- **Agent DVR recordings** — the recordings gallery of a camera, with search and tag filter, built-in player or external player URL
- **Agent DVR live camera** — the live tile of one camera; the snapshot refreshes in the browser, a click opens the live stream
- **Agent DVR live overview** — the live tiles of all cameras of an instance
- **Source**: either *Widget from the adapter settings* (all settings of the Widget tab of the instance) or *Own settings here* — every widget setting of the instance (mode, count, thumbnail size, tags, sort, search, default tag, compact layout, player, aspect ratio, refresh interval, colors, border radius) per widget
- optionally takes the colors of the visualization's theme
- needs no credentials: the images and videos use the same AgentDVR links as the HTML widgets; data comes from `widget_config` and `<cam>.widget_data`

### Recordings in the ioBroker file storage and as Telegram video
- **Provide the last recordings in the ioBroker file storage** (off by default): every new recording of a camera is downloaded from AgentDVR and kept as `rec1` … `rec3` per camera — with file path, `iobfile://` URI and http URL in `<cam>.recordings.*`, just like the alert photos
- optionally as **MP4** (lossless remux with ffmpeg, no re-encoding) — plays everywhere, also inline in Telegram
- **`sendRecording`** sends the last, a stored or any recording straight to Telegram (or another instance) as video; **`getRecording`** makes it available as a file for your own scripts
- details: [Recordings in the file storage](#recordings-in-the-file-storage)

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
| Save alert photos | Store the photo of every webhook alert in the file storage (see [Alert photos](#alert-photos)) | `true` |
| Web instance for photo links | Web instance used for the `url*` links of alert photos and recordings | automatic |

**Recordings in the file storage** — see [Recordings in the file storage](#recordings-in-the-file-storage)

| Setting | Description | Default |
|---------|-------------|---------|
| Provide the last recordings in the ioBroker file storage | Download every new recording and keep it per camera | `false` |
| Cameras | All cameras or a selection (the list needs a running instance) | all |
| Number of stored recordings per camera | 1, 2 or 3 (`rec1` = newest) | `1` |
| Maximum size (MB) | Larger recordings are skipped with an info log; also the limit for `sendRecording`/`getRecording` | `50` |
| Download timeout (s) | Download and conversion of one recording (10–900) | `120` |
| Provide as MP4 | Remux MKV to MP4 with ffmpeg (no re-encoding); without ffmpeg the MKV is kept | `true` |
| ffmpeg path | Empty = automatic search | — |

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

### Security

This adapter stores your AgentDVR admin credentials and exposes `system.control.purge`, `system.control.restart` and `system.control.unblockExternal` as one-click writable states — anyone who can reach the ioBroker web port can wipe recordings, restart AgentDVR or disable its external-access block. **Make sure `iobroker.web` has authentication enabled before exposing ioBroker outside your LAN** (directly or via a reverse proxy) — this is not the default in many ioBroker setups.

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
| `<cam>.recordings.*` | various | R | Stored recordings (`file1`, `uri1`, `url1`, `name1`, `ts1`, …) — requires "Provide the last recordings in the ioBroker file storage" |
| `<cam>.widget_recordings` | string | R | HTML recording gallery — requires "Gallery widget" |
| `<cam>.widget_live` | string | R | HTML single-camera live tile — requires "Gallery widget"; snapshot refreshes on each adapter poll |
| `<cam>.widget_data` | string | R | Recordings as JSON for the web components (latest 500) — requires "Gallery widget" or "Event data points" |

## Webhook

The adapter exposes a webhook endpoint that triggers an immediate full poll of AgentDVR:

```
GET http://<iobroker>:<webport>/agent-dvr.0/webhook
```

Replace `agent-dvr.0` with the actual instance number (`agent-dvr.1`, etc.) if you run multiple instances.

Configure this URL as an **Action** in AgentDVR (Camera → Edit → Alerts → Actions → URL) to get real-time updates whenever a recording finishes or an alert fires. The adapter will immediately re-fetch all camera data, recordings, and system stats — no need to wait for the next poll cycle.

Returns `{"ok":true}` on success.

### Fast alert per camera

Append the camera ID so the adapter knows which camera fired:

```
GET http://<iobroker>:<webport>/agent-dvr.0/webhook?oid={ID}&ot={OT}
```

`{ID}` and `{OT}` are AgentDVR tags and are filled in by AgentDVR. The adapter then pulses `<cam>.events.webhook` **immediately** — before any data is fetched — and polls afterwards. Use the action on *motion detected*. With alert photos enabled the photo is stored right away — see [Getting images for VIS and scripts](#getting-images-for-vis-and-scripts) for the right trigger. AgentDVR often calls the action several times per motion; further calls for the same camera within 20 s only refresh the data and do not pulse again. `<cam>.events.webhookParams` holds all parameters of the latest call as JSON (plus `ts`), written before the pulse and also during the cooldown — add any AgentDVR tags you need to the URL (e.g. `&ai={AI}&zone={ZONE}&name={NAME}`) and evaluate them in your own script.

Without `oid` the webhook only triggers a full poll. Query parameters are written to the web instance log at debug level.

Use plain `http` for the web instance the action calls — AgentDVR silently rejects self-signed certificates.

### Alert photos

With **Save alert photos** enabled (default), every webhook call with `?oid={ID}` also stores the current full-resolution photo (`photo.jpg`) in the ioBroker file storage. The last 3 photos per camera are kept:

| Data point | Content |
|---|---|
| `<cam>.alertPhotos.grab1` … `grab3` | Absolute file path of the photo (`grab1` = newest) |
| `<cam>.alertPhotos.url1` … `url3` | http(s) URL via the web instance, e.g. `http://192.168.1.10:8082/agent-dvr.0/photos/cam_8_Reolink/grab1.jpg` — for TV, kiosk or other apps that only accept web links |
| `<cam>.alertPhotos.uri1` … `uri3` | ioBroker file URI, e.g. `iobfile://agent-dvr.0/cam_8_Reolink/grab1.jpg` |
| `<cam>.alertPhotos.ts1` … `ts3` | Time of the photo |

Files: `<namespace>/<cam>/grab1.jpg` … `grab3.jpg` (e.g. `agent-dvr.0/cam_8_Reolink/grab1.jpg`). On each new photo they rotate (grab1 → grab2 → grab3). `ts1` is written **last**, after the file is complete — trigger on `ts1` and send the photo with Telegram, no HTTP request needed (see [Telegram](#telegram)). The file path in `grab1`–`grab3` is only valid when the file storage is on the local disk (default); `uri1`–`uri3` work with any storage.

### Overview *(requires "Overview widget")*

| Data point | Type | R/W | Description |
|-----------|------|-----|-------------|
| `widget_live_overview` | string | R | HTML tile grid of all cameras — snapshot refreshes on each adapter poll |
| `widget_config` | string | R | Widget settings, cameras and texts as JSON for the web components (always written, no credentials) |

## Recordings in the file storage

With **Provide the last recordings in the ioBroker file storage** (*Features* tab, off by default) the adapter downloads every new recording of a camera from AgentDVR as soon as it shows up in the recording list (the moment `<cam>.events.new` pulses — so *Event data points* must be on) and stores it in the ioBroker file storage. The download goes into memory, never into a temporary file. Like the alert photos, the last 1, 2 or 3 recordings per camera are kept (setting *Number of stored recordings per camera*, default 1):

| Data point | Content |
|---|---|
| `<cam>.recordings.file1` … `file3` | Absolute file path, e.g. `/opt/iobroker/iobroker-data/files/agent-dvr.0/cam_8_Reolink/rec1.mp4` (`1` = newest) |
| `<cam>.recordings.uri1` … `uri3` | ioBroker file URI, e.g. `iobfile://agent-dvr.0/cam_8_Reolink/rec1.mp4` |
| `<cam>.recordings.url1` … `url3` | http(s) URL via the web instance, e.g. `http://192.168.1.10:8082/agent-dvr.0/recordings/cam_8_Reolink/rec1.mp4` (supports seeking) |
| `<cam>.recordings.name1` … `name3` | Original AgentDVR file name, e.g. `8_2026-11-12_15-55-29_931.mkv` |
| `<cam>.recordings.ts1` … `ts3` | Time of the recording |

Files: `<namespace>/<cam>/rec1.mp4` (or `.mkv`) … `rec3`. On each new recording they rotate (rec1 → rec2 → rec3), the oldest one is deleted. When you lower the number, the surplus files and data points are removed at the next start. The disk space stays fixed: number × maximum size per camera. Recordings larger than *Maximum size* (default 50 MB) are skipped with an info log. `ts1` is written **last**, after the file is complete — use it as trigger.

**Storage limitation:** `file1`–`file3` only contain a path when the ioBroker file storage is on the local disk (default file/jsonl objects DB). With Redis or another non-file objects DB they stay empty — use `uri*` (Telegram 6+, scripts) or `url*` instead, which work with every storage.

### What happens when…

- **…the option is switched on:** at the next start (saving the settings restarts the instance) every selected camera gets its current last recording, if slot 1 is empty or holds an older one — one camera after the other, with the size limit. After that each new recording is stored as it appears.
- **…a camera is newly selected:** same as above, it gets its current last recording right away.
- **…a new camera is added in AgentDVR:** it shows up at the next poll (the camera list in the settings is read live from the running instance); with *All cameras* it is filled and stored like the others.
- **…a camera is deselected:** at the next start its `recordings` data points and its files `rec1`–`rec3` and `send.*` are deleted.
- **…the option is switched off:** at the next start the `recordings` data points and the `rec*`/`send.*` files of all cameras are deleted.
- **…a camera is removed from AgentDVR:** its data points are removed as before, and its whole folder in the file storage (`agent-dvr.0/<cam>/` — recordings, `send.*` and alert photos) is deleted. If AgentDVR suddenly reports no camera at all, nothing is deleted (assumed to be a hiccup).
- **…a selected camera no longer exists:** the settings list it as *"<cam> (no longer in AgentDVR)"* so you can uncheck it; the adapter simply ignores it.

`send.mp4|mkv` (used by `sendRecording`/`getRecording` for recordings that are not in a slot) stays until the camera's recordings are cleaned up — one file per camera, overwritten each time.

### MP4 and ffmpeg

AgentDVR records MKV. With **Provide as MP4** (default on) the adapter remuxes the MKV to MP4 with ffmpeg — only the container changes, video and audio are copied, so it takes well under a second. HEVC (H.265) videos get the `hvc1` tag so Apple devices and Telegram play them. If the audio codec does not fit into MP4, the video is remuxed without audio (logged once). Without ffmpeg the MKV is provided unchanged (one info log).

ffmpeg is **not** bundled. The adapter looks for it at start and on demand: the *ffmpeg path* setting → `ffmpeg` via `PATH` → `/usr/bin/ffmpeg`, `/usr/local/bin/ffmpeg`, `/opt/homebrew/bin/ffmpeg`, `C:\ffmpeg\bin\ffmpeg.exe`, `%ProgramFiles%\ffmpeg\bin\ffmpeg.exe`. The result is in `info.ffmpeg` (e.g. `6.1.1 (/usr/bin/ffmpeg)` or `not found`) and in the settings next to the MP4 option, with a **Search again** button. Install ffmpeg with the package manager of your system:

| System | Command |
|---|---|
| Debian, Ubuntu, Raspberry Pi OS | `apt install ffmpeg` |
| Alpine (Docker) | `apk add ffmpeg` |
| Fedora | `dnf install ffmpeg` |
| macOS (Homebrew) | `brew install ffmpeg` |
| Windows | `winget install ffmpeg` |

Run the command as administrator/root as usual on your system. Afterwards press *Search again* in the settings (or restart the instance).

### Sending recordings: `sendRecording` and `getRecording`

`sendRecording` makes a recording available in the adapter's file storage and sends it to a messenger instance as video. A recording that is already stored (`recordings.*`) is used directly; any other one is downloaded into memory, converted to MP4 if wanted and written to a fixed file per camera, `agent-dvr.0/<cam>/send.mp4` (or `.mkv`), which is overwritten each time — so the space stays fixed:

```js
sendTo('agent-dvr.0', 'sendRecording', {
    camera: 'cam_8_Reolink',      // folder id, AgentDVR oid (8) or camera name
    recording: 'last',            // 'last' (newest in AgentDVR), 1-3 (stored slot) or an AgentDVR file name
    target: 'telegram.0',         // instance that gets the video
    caption: 'Motion at the front door',
    // user: 'Max', chatId: 123, // optional, passed through to Telegram
    // mp4: true,                 // optional, overrides "Provide as MP4"
}, res => {
    if (!res.ok) log(res.error, 'warn'); // e.g. too large for Telegram
});
```

The message to the target is `{ text: 'iobfile://agent-dvr.0/<cam>/<file>', type: 'video', fileName: '<name>.mp4', width, height, duration, caption, user, chatId }` — Telegram 6 and newer reads the file itself from the file storage. `width`, `height` and `duration` are read from the video file: Telegram does not detect them itself for larger bot uploads and would otherwise show the video in the chat in a wrong aspect ratio until it is opened. Other targets get the absolute file path instead (or the URI if the file storage is not on the local disk). The answer is `{ ok, error?, fileName, format, mime, size, uri, url, file, width, height, duration }`. A recording AgentDVR is still writing is sent once it is finished. **Telegram bots can only send files up to 50 MB**; larger recordings are rejected with a clear error — before downloading when AgentDVR already lists the size.

> **No video data goes over the ioBroker message bus.** Large messages (tens of MB) can block the states DB and with it the whole ioBroker. That is why the adapter passes only the file reference and refuses to send or answer anything that contains binary data.

Send every new recording to Telegram (no Blockly needed):

```js
on({ id: 'agent-dvr.0.cam_8_Reolink.events.new', val: true }, () => {
    sendTo('agent-dvr.0', 'sendRecording', { camera: 'cam_8_Reolink', recording: 'last', target: 'telegram.0', caption: 'New recording' });
});
```

With the file storage feature enabled, trigger on `recordings.ts1` and send the stored copy instead (`recording: 1`):

```js
on({ id: 'agent-dvr.0.cam_8_Reolink.recordings.ts1', change: 'ne', ack: true }, () => {
    sendTo('agent-dvr.0', 'sendRecording', { camera: 'cam_8_Reolink', recording: 1, target: 'telegram.0', caption: 'New recording' });
});
```

> **Tip: the right aspect ratio in the chat.** If you send the video file to Telegram yourself (Telegram Blockly block, `recordings.file1`/`uri1`), Telegram often shows larger videos in the chat preview in a wrong format (e.g. 3:4) until you open them — Telegram does not read the picture size from larger bot uploads itself. `sendRecording` reads width, height and duration from the video file and passes them along, so the video plays in the chat right away in the camera's aspect ratio. Nothing to configure, it simply works when you use `sendRecording`.

`getRecording` takes the same `camera`, `recording` and `mp4`, makes the recording available the same way and returns only where it is: `{ ok, error?, fileName, mime, format, size, uri, url, file, width, height, duration }`. Read the file in your script yourself, e.g.:

```js
sendTo('agent-dvr.0', 'getRecording', { camera: 'cam_8_Reolink', recording: 'last' }, res => {
    if (!res.ok) return log(res.error, 'warn');
    // res.uri = 'iobfile://agent-dvr.0/cam_8_Reolink/send.mp4', res.url = http link, res.file = local path
    readFile('agent-dvr.0', res.uri.replace('iobfile://agent-dvr.0/', ''), (err, data) => { /* … */ });
});
```

## Getting images for VIS and scripts

### Which image from where

| Image | Data point / URL | Size | Time |
|---|---|---|---|
| Live image, small | `<cam>.urls.snapshot` (`grab.jpg`) | preview | now |
| Live image, full | `<cam>.urls.photo` (`photo.jpg`) | full resolution, ~1 s to load | now |
| Live stream | `<cam>.urls.mjpeg`, `<cam>.urls.mp4` | video | live |
| Last recording – thumbnail | `<cam>.events.last.thumb` | max. 320×180 (AgentDVR limit) | best moment of the recording, shows the detected object |
| Last recording – video | `<cam>.events.last.video` | video | after the recording |
| Alert photos | `<cam>.alertPhotos.grab1` … `grab3` | full resolution | moment of the alert (webhook with `oid`) |

The `urls.*` and `events.last.*` URLs point directly to AgentDVR. They work in the local network only — Telegram's servers cannot fetch them. Either load them with an HTTP request first (response type `arraybuffer`) or use the alert photos, which are already stored in ioBroker.

### Which trigger for what

| Trigger | Fires | Use for |
|---|---|---|
| `<cam>.alertPhotos.ts1` | photo stored, ~1–2 s after the alert | **send the alert photo** (recommended) |
| `<cam>.events.webhook` | immediately on the webhook call | fetching an image yourself |
| `<cam>.events.new` | new recording listed | thumbnail of the recording |
| `<cam>.events.detected_<tag>` | AI tag of a new recording, e.g. `detected_people` — also when AgentDVR adds the tag later | notify on persons only |

> **Do not use `events.webhook` for the stored alert photo.** The webhook pulse comes *before* the new photo is fetched and saved. At that moment `alertPhotos.grab1` / `uri1` / `url1` still point to the photo of the **previous** alert — a TV or Telegram message then shows an old image (possibly hours old). For anything that uses `alertPhotos.*` always trigger on `alertPhotos.ts1`. `events.webhook` is only meant for scripts that fetch an image themselves at that moment (e.g. `urls.photo` or their own camera snapshot).

Use **"greater than previous"** (Blockly) or `change: 'gt'` as condition. The adapter rewrites its states on every poll, so "was updated" fires every poll. `status.alerted` is usually too short to be seen by a poll and is not a reliable trigger.

### Telegram

Blockly: trigger on `<cam>.alertPhotos.ts1` with "greater than previous", Telegram block with *value of* `<cam>.alertPhotos.uri1` as text.

- **Telegram 6 or newer:** use `uri1` (`iobfile://…`). Telegram reads the photo directly from the ioBroker file storage and sends it as photo — works with every storage type.
- **Older Telegram versions:** use `grab1` (local file path). A text that is an existing local `.jpg` path is sent as photo.

Sending the file content itself (e.g. *read file* → Telegram) does **not** work from Blockly: raw data is only sent as photo with an explicit `type: 'photo'`.

JavaScript:

```js
on({ id: 'agent-dvr.0.cam_8_Reolink.alertPhotos.ts1', change: 'gt' }, () => {
    sendTo('telegram.0', { text: getState('agent-dvr.0.cam_8_Reolink.alertPhotos.uri1').val });
});
```

Reading the file itself in a script: `readFile('agent-dvr.0', 'cam_8_Reolink/grab1.jpg', (err, data) => { … })`.

### VIS / dashboards

The alert photos are served by the web instance — the ready-made link is in `<cam>.alertPhotos.url1` … `url3`. The adapter picks an enabled web instance (plain `http` preferred, since TV apps often reject self-signed certificates) and the host's IPv4 address. The web instance can also be chosen in the settings (*Features → Web instance for photo links*). When a web instance changes (port, https, bind address, enabled) or the host address changes, the links are rewritten automatically. The links stay the same for every new photo, so you can enter them once in an app:

```
http://<iobroker>:<webport>/agent-dvr.0/photos/<cam>/grab1.jpg
```

e.g. `http://192.168.1.10:8082/agent-dvr.0/photos/cam_8_Reolink/grab1.jpg` (also `grab2.jpg`, `grab3.jpg`). Use it in an image widget and refresh it on changes of `alertPhotos.ts1`. The same applies when you push the link to a TV or another app: send it on `alertPhotos.ts1`, not on `events.webhook` — otherwise the app loads the previous photo. For a live image use `urls.snapshot` or `urls.photo` with a refresh interval.

## Changelog
### 0.9.1 (2026-11-13)
* (ipod86) fix: recordings were stored while AgentDVR was still writing them (video cut off) — the adapter now waits until the recording is finished
* (ipod86) fix: `sendRecording` passes width, height and duration to Telegram — larger videos were shown in a wrong aspect ratio in the chat; `sendRecording`/`getRecording` also wait until a recording is finished
* (ipod86) feat: messages `getCameras` and `getWidgets` for the web components (prepares dropdowns instead of the object browser)

### 0.9.0 (2026-11-12)
* (ipod86) feat: keep the last 1–3 recordings per camera in the ioBroker file storage (`recordings.file/uri/url/name/ts`), optionally as MP4 via ffmpeg
* (ipod86) feat: `sendRecording` / `getRecording` send a recording to Telegram as video or provide it as a file for scripts
* (ipod86) feat: initial fill on enabling; recordings and files are cleaned up when switched off, deselected or the camera is removed
* (ipod86) feat: ffmpeg detection with status in the settings and `info.ffmpeg`
* (ipod86) fix: the settings page uses all 11 languages

### 0.8.1 (2026-11-12)
* (ipod86) fix: live overview web component fits its tiles to the widget size (no scrolling, no empty space); option "Fit to the widget size"
* (ipod86) chore: description and keywords mention the widgets for vis-2 and AURA

### 0.8.0 (2026-11-12)
* (ipod86) feat: web components for AURA (0.106.0+), vis-2 (2.20.7+) and devices (4.3.0+) – recordings gallery, live tile and live overview, with the adapter's widget settings or own ones

### 0.7.0 (2026-10-29)
* (ipod86) feat: `alertPhotos.url1–3` with a fixed http(s) link to each photo, for TV/kiosk apps that only accept web links; web instance selectable, links follow changes of the web instances
* (ipod86) feat: `<cam>.events.webhookParams` with all parameters of the latest webhook call as JSON

<!-- markdownlint-disable-next-line MD024 -->

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