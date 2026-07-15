![Logo](admin/reolink.png)
# ioBroker.reolink

[![NPM version](https://img.shields.io/npm/v/iobroker.reolink.svg)](https://www.npmjs.com/package/iobroker.reolink)
[![Downloads](https://img.shields.io/npm/dm/iobroker.reolink.svg)](https://www.npmjs.com/package/iobroker.reolink)
![Number of Installations](https://iobroker.live/badges/reolink-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/reolink-stable.svg)
[![Dependency Status](https://img.shields.io/david/aendue/iobroker.reolink.svg)](https://david-dm.org/aendue/iobroker.reolink)

[![NPM](https://nodei.co/npm/iobroker.reolink.png?downloads=true)](https://nodei.co/npm/iobroker.reolink/)

**Tests:** ![Test and Release](https://github.com/aendue/ioBroker.reolink/workflows/Test%20and%20Release/badge.svg)

## reolink adapter for ioBroker

Adapter for ioBroker Plattform to get [Reolink camera](https://reolink.com/) information.

In general, all newer Reolink cameras support API commands. They just differ in their supported commands.

One reminder to the password. Try with or without URI encoding, when you have only one special char. Better use no special char and simply a longer password for the same security. Check with http://cam.ip.add.ress/api.cgi?cmd=GetDevInfo&channel=0&user=username&password=yoursecurity if your credentials are working.

If you wish to have any specific API command included...just let me know.

## Implemented functions

### SET
 - PTZ Control / PTZ Guard
 - Push Notification
 - Set Autofocus
        values: 0,1
 - Set IR light
        values: Auto, Off
 - Set LED light
 - Set Mail Notification
        values: 0, 1
 - Play Audio Alarm
 - Zoom Focus

 Functions can be triggert by changing reolink.<Instanze>.settings states.

 ### GET

 - Device Info
 - PTZ Info
 - Drive Info
 - Network Info
 - Motion Detection
 - Auto Focus
 - Snapshot
 - IR Light
 - LED Light
 - Mail Notification

### Push notification settings

Push notifications to a phone will only be provided if the following conditions are met:
 - The Push notifications switch in the adapter is ON.
 - For NVRs, both the global and channel switch are ON.
 - The Push-notification in the Reolink App of that phone is ON.

The Push-notification in the Reolink app is independent of the adapter setting. It is also independent of the settings on other phones connected to the same camera. Reolink does this so you have an independent way of turning off push notifications per phone. This means deactivating push at iobroker does not touch the toggle button in the app at all.

### Example Usage of get image:

```js
sendTo("reolink.0",{action: "snap"}, function(result){
    sendTo("matrix-org.0",{file:result});
});
```
// content from **result** is JSON :
```json
{ "type": "image/png","base64": "iVBORw....askldfj" }
```

for telegram this is working
```js
sendTo("reolink.0",{action: "snap"}, function(result){
    const buffer =Buffer.from(result.base64, "base64");
    sendTo('telegram.0', {
        text: buffer,
        type: "photo",
        caption: 'the image'
    });
});
```

## Battery-Powered Cameras

Battery cameras (Argus PT, Argus 3 Pro, ...) use a proprietary protocol and are supported via **[neolink](https://github.com/QuantumEntangledAndy/neolink)** — an open-source tool that is downloaded automatically on first use.

### Quick Setup

1. **Enable in Config:** ✅ "Battery-powered camera"
2. **Enter Camera UID:** Find in Reolink app → Device Info
3. **Install Dependency (Linux):**
   ```bash
   sudo apt install gstreamer1.0-rtsp
   ```
4. **Start Adapter** → RTSP streams available at `rtsp://<server-ip>:8554/<CameraName>/mainStream`

> The server IP is detected automatically. `<CameraName>` is the name set in the adapter config.

### Battery Saving

**Battery drains fast when active!** The adapter uses an auto-disable strategy:

- **`streams.enable`** (boolean) — Enable/disable RTSP streaming
  - Default: `false` (off = battery saving)
  - Auto-disables after 30 s (configurable)
  - Stream pauses automatically when no client is connected

- **`mqtt.enable`** (boolean) — Enable MQTT integration for motion/battery/floodlight/PIR
  - Required for status updates and floodlight/PIR control
  - Auto-disables after configurable timeout (battery protection)
  - Configure broker in adapter settings

### Battery Camera States

| State | Type | R/W | Description |
|---|---|---|---|
| `streams.enable` | boolean | R/W | Start/stop RTSP stream |
| `streams.mainStream` | string | R | RTSP URL for main stream |
| `streams.subStream` | string | R | RTSP URL for sub stream |
| `mqtt.enable` | boolean | R/W | Start/stop MQTT integration |
| `floodlight` | boolean | R/W | Floodlight on/off — status via MQTT, control via MQTT (auto-starts MQTT) |
| `pir` | boolean | R/W | PIR sensor on/off — status via MQTT, control via MQTT (auto-starts MQTT) |
| `snapshot` | button | W | Capture snapshot via RTSP |
| `query.battery` | button | W | Query battery level via neolink CLI |
| `query.preview` | button | W | Capture snapshot via RTSP |
| `ptz.preset` | number | R/W | Move camera to saved preset position (0–9) |
| `ptz.up/down/left/right` | boolean | R/W | Hold-to-move (`true`=start, `false`=stop) |
| `ptz.speed` | number | R/W | PTZ movement speed (1–100, default 32) |
| `status.motion` | boolean | R | Motion detected (via MQTT) |
| `status.battery_level` | number | R | Battery level in % (via neolink CLI, periodic) |

| `snapshotImage` | string | R | Last snapshot image (base64, data URI) |
| `snapshotStatus` | string | R | Snapshot status: `idle` / `capturing` / `success` / `error` |
| `info.neolink_status` | string | R | neolink process state: `stopped` / `running` |

### PTZ Control

PTZ works via neolink CLI — no MQTT needed.

**Directional movement** (`ptz.up/down/left/right`):
- Set to `true` → camera starts moving, auto-stops after 5 s
- Set to `false` → camera stops immediately
- In VIS: configure a button with `mousedown=true` / `mouseup=false` for hold-to-move
- Adjust speed with `ptz.speed` (1–100)

**Presets** (`ptz.preset`): Set to a preset number (0–9) to move to that saved position.

### Features

✅ RTSP streams (main + sub)  
✅ Snapshot capture (requires ffmpeg)  
✅ Floodlight control (status + control via MQTT)  
✅ PIR sensor control (status + control via MQTT)  
✅ Motion detection (via MQTT)  
✅ Battery level (periodic via neolink CLI)  
✅ Preview image (auto-updated via MQTT)  
✅ PTZ control — directional movement + presets (via neolink CLI)  
✅ Multi-platform — neolink binary downloaded automatically (Linux x64/ARM/ARM64, macOS)  


### MQTT Setup

Configure in adapter settings:
- **Broker Host** (default: `127.0.0.1`)
- **Broker Port** (default: `1883`)
- **Username / Password** (optional)
- **Auto-disable timeout** (default: `30` s, battery protection)

MQTT is used for camera status updates and control. The adapter subscribes automatically when `mqtt.enable` is set to `true`.

Status topics (published by camera via neolink):
- `neolink/<camera>/status/motion`
- `neolink/<camera>/status/battery_level`
- `neolink/<camera>/status/floodlight`
- `neolink/<camera>/status/pir`
- `neolink/<camera>/status/preview`

Control topics (published by adapter to camera):
- `neolink/<camera>/control/floodlight`
- `neolink/<camera>/control/pir`

### Troubleshooting

| Problem | Solution |
|---|---|
| "Camera UID required" | Enter UID from Reolink app → Device Info |
| "libgstrtspserver not found" | `sudo apt install gstreamer1.0-rtsp` |
| Stream won't connect | Enable `streams.enable`, wait ~5 s for neolink to start |
| Snapshot fails | Install ffmpeg: `sudo apt install ffmpeg` |
| Floodlight/PIR doesn't react | MQTT starts automatically — wait ~3 s after toggling |
| MQTT `NotAuthorized` | Check broker credentials; neolink uses `credentials = ["user", "pass"]` format |
| Battery drains fast | Disable streaming when not in use; use MQTT only for motion |
| PTZ unresponsive | Each PTZ command needs ~2 s (P2P camera login) — this is normal |

---

## Known Working Cameras

### HTTP API (Standard)
RLC-420-5MP, E1 Zoom, RLC-522, RLC-810A, RLC-823A, Duo 3 PoE

### Battery Cameras (via Neolink)

Reolink Argus PT, Reolink Argus 3 Pro  

---

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.4.2 (2026-03-16)
* (oelison) fast fix for issue #230

### 1.4.1 (2026-03-15)
* (oelison) fix issue #187

### 1.4.0 (2026-03-13)
* (bloop16) Battery camera support via neolink
* (oelison) Adapter requires node.js >= 20 now.

### 1.3.0 (2025-12-20)
* (agross) AiCfg config
* (oelison) bump some libs #202
* (bluefox) migration to ts
* (bot) revoking classic token #204
* (oelison) state changes from info log to debug #206

### 1.2.3 (2025-06-30)
* (oelison) settings email notification #170
* (oelison) testing node.js 24 #172

### 1.2.2 (2025-05-01)
* (oelison) update readme #141 #155
* (oelison) supress errors with axios timeout #154

### 1.2.1 (2025-02-09)
* (oelison) set some errors to debug logs

### 1.2.0 (2025-02-07)
* (oelison) update disk info
* (oelison) uri enconding is switchable (helps sometimes by one special char)
* (oelison) #28 PTZ check added

### 1.1.2 (2024-09-14)
* (oelison) [#22](https://github.com/aendue/ioBroker.reolink/issues/22) password with some more special chars works now
* (oelison) adapter warnings resolved

### 1.1.1 (2024-08-03)
* (oelison) removed warnings from adapter check
* (olli) added ftp support
* (oelison) channel now distinguishing most requests
* (oelison) [#79](https://github.com/aendue/ioBroker.reolink/issues/79) error messages with more info where

### 1.1.0 (2024-05-16)
* (Nibbels) [#56](https://github.com/aendue/ioBroker.reolink/issues/56) added function to switch scheduled recording on and off
* (Nibbels) [#25](https://github.com/aendue/ioBroker.reolink/issues/25) detach led light from led light mode
* (Nibbels) added setWhiteLedMode function
* (Nibbels) read zoom and focus with POST request (works on RLC-823A v3.1)
* (oelison) removed node 16

### 1.0.3 (2024-01-21)
* (oelison) [#49](https://github.com/aendue/ioBroker.reolink/issues/49)
* (oelison) [#47](https://github.com/aendue/ioBroker.reolink/issues/47)

### 1.0.2 (2023-12-19)
* (oelison) known working cameras added
* (oelison) setIrLights accept "On" now
* (oelison) [#40](https://github.com/aendue/ioBroker.reolink/issues/40)
* (oelison) [#42](https://github.com/aendue/ioBroker.reolink/issues/42)

### 1.0.1 (2023-11-11)
* (oelison) resolve review for latest adapter addition
* (oelison) maybe the last node 16 version
* (oelison) booleans are now false/true and not 0/1

## License
MIT License

Copyright (c) 2026 Andy Grundt <andygrundt@gmail.com>

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
