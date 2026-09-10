![Logo](admin/navimow.png)

# ioBroker.navimow

[![NPM version](https://img.shields.io/npm/v/iobroker.navimow.svg)](https://www.npmjs.com/package/iobroker.navimow)
[![Downloads](https://img.shields.io/npm/dm/iobroker.navimow.svg)](https://www.npmjs.com/package/iobroker.navimow)
![Number of Installations](https://iobroker.live/badges/navimow-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/navimow-stable.svg)
[![GitHub license](https://img.shields.io/github/license/TA2k/ioBroker.navimow)](https://github.com/TA2k/ioBroker.navimow/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/TA2k/ioBroker.navimow)](https://github.com/TA2k/ioBroker.navimow/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/TA2k/ioBroker.navimow)](https://github.com/TA2k/ioBroker.navimow/commits/main)
[![node](https://img.shields.io/node/v/iobroker.navimow)](https://www.npmjs.com/package/iobroker.navimow)

[![NPM](https://nodei.co/npm/iobroker.navimow.png?downloads=true)](https://nodei.co/npm/iobroker.navimow/)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.navimow/workflows/Test%20and%20Release/badge.svg)

## Navimow Adapter for ioBroker

ioBroker adapter for [Segway Navimow](https://navimow.segway.com/) robotic mowers. Uses the official [Navimow SDK](https://github.com/segwaynavimow/navimow-sdk) REST API and MQTT for real-time updates.

The adapter itself runs on every platform ioBroker runs on. The optional mowing map needs [@napi-rs/canvas](https://github.com/Brooooooklyn/canvas), which ships prebuilt binaries for Linux (glibc and musl), Windows and macOS on x64 and arm64. Where no prebuild fits the host, the library is simply not loaded: the adapter logs one warning, the map stays empty and everything else keeps working.

## Features

- OAuth2 login via Navimow account
- Real-time status updates via MQTT (WebSocket Secure)
- Periodic HTTP status polling alongside MQTT
- MQTT location watchdog with controlled reconnect during active mowing
- Remote control: Start, Stop, Pause, Resume, Dock
- Automatic token refresh with MQTT reconnect

Periodic HTTP polling refreshes general status values (for example battery, status and vehicleState) to keep them up to date. Location data and mowing progress (`location.mowingPercentage`) are provided by MQTT. During active mowing, the adapter watches the MQTT location stream and performs a controlled MQTT reconnect if location updates stop arriving while HTTP still reports an active mower state.

## Sentry

This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers. For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Setup

1. Open the adapter settings in ioBroker Admin
2. Click **"Open Navimow Login"** to open the Navimow login page
3. Login with your Navimow account
4. After login the browser shows a "page cannot be reached" error - this is expected
5. Copy the complete URL from the browser address bar (contains `?code=XXXXX`)
6. Paste the URL into the **Authorization Code** field and save
7. The adapter exchanges the code for a token and starts automatically

The token is refreshed automatically. A re-login is only needed if the refresh token expires.

The **HTTP polling interval** setting defines the periodic HTTP status polling interval in minutes (0 disables it, one day is the maximum). MQTT stays active in parallel for real-time updates. A poll is only armed once the one before it has come back, so a slow cloud cannot make two polls run at the same time.

Setting the interval to `0` disables periodic polling and relies on MQTT alone. Because the broker only pushes the `state` channel while the mower is operating, the adapter still performs a single HTTP status poll whenever no MQTT status update has arrived for 15 minutes. Without that fallback, battery and `vehicleState` would keep their last values for hours while the mower is docked and charging.

## States

For each mower device the following channels are created:

| Channel                  | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| `{deviceId}.general`     | Device info (name, model, serial number, firmware)       |
| `{deviceId}.status`      | Current status (vehicleState, battery, position, signal) |
| `{deviceId}.status.json` | Raw JSON of the last status update                       |
| `{deviceId}.events`      | MQTT events                                              |
| `{deviceId}.attributes`  | MQTT device attributes                                   |
| `{deviceId}.remote`      | Remote control buttons                                   |
| `{deviceId}.location`    | Real-time mower position and mowing progress (via MQTT)  |
| `{deviceId}.diagnostics` | MQTT location watchdog diagnostics                       |
| `{deviceId}.dockPosition` | Charging station position, writable                     |

### vehicleState

The `status.vehicleState` state contains the current mower state.

It is fed from the MQTT `state` channel as soon as that reports a change. The channel calls the field `state` and the HTTP API calls it `vehicleState`, but both use the same values, and the HTTP one answers from a server-side cache that can be one to two minutes behind — it has been seen reporting `isDocked` for a mower that was out mowing. Where the state channel has spoken within the last three minutes, its value stands and a poll landing in between does not overwrite it. While the mower is docked the channel falls quiet and the poll takes over again.

**To check if the mower is currently mowing, check for `isRunning`:**

```javascript
on({ id: 'navimow.0.DEVICE_ID.status.vehicleState', change: 'any' }, (obj) => {
  if (obj.state.val === 'isRunning') {
    log('Mower is mowing!');
  }
});
```

| Value               | Description         |
| ------------------- | ------------------- |
| `isRunning`         | Mowing              |
| `isDocked`          | Docked              |
| `isIdle`            | Idle                |
| `isPaused`          | Paused              |
| `isDocking`         | Returning to Dock   |
| `isMapping`         | Mapping             |
| `isLifted`          | Lifted (Error)      |
| `Error`             | Error               |
| `inSoftwareUpdate`  | Software Update     |
| `Self-Checking`     | Self-Checking       |
| `Offline`           | Offline             |

### Remote Controls

| State             | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `remote.Refresh`  | Trigger a manual status refresh                      |
| `remote.start`    | Start mowing                                         |
| `remote.stop`     | Pause mowing (see below)                             |
| `remote.pause`    | Pause mowing                                         |
| `remote.resume`   | Resume mowing                                        |
| `remote.dock`     | Return to dock                                       |
| `remote.resetMap` | Clear the mowing map (only with the map switched on) |

These are buttons: they are written, not read. What the mower is doing is in `status.vehicleState`.

`remote.resetMap` throws away the track, the picture and the frame of that device and starts the map over. It is there for what the adapter cannot know by itself — a lawn re-mapped or split into zones — and it is the only reset that drops the frame as well: the frame describes the garden, and a garden that has just been re-drawn is exactly when it is worth measuring again.

`remote.stop` pauses the job, it does not end it — the public API has no "end task", and `start` resumes the task the app created rather than starting a new one. Resetting the mowing progress is an app-only feature.

### Location

The `location` channel receives real-time position data and mowing progress (`mowingPercentage`) via MQTT while the mower is active. Coordinates are relative to the mowing area (in meters), not GPS. These values are not derived from periodic HTTP status polling.

| State                  | Description            |
| ---------------------- | ---------------------- |
| `location.postureX`    | Position X (m)         |
| `location.postureY`    | Position Y (m)         |
| `location.postureTheta`| Rotation angle (rad)   |
| `location.vehicleState`| Vehicle state code     |
| `location.time`        | Timestamp              |

`location.vehicleState` is a number, and its meaning is not documented — neither the Navimow SDK nor the openHAB binding knows a mapping. The adapter therefore does not translate it and passes it on as it arrives. Use `status.vehicleState` for the documented state.

The position data can be visualized as a mowing map using Grafana (e.g. with the Plotly or Geomap panel) or ioBroker.vis.

### Diagnostics

The `diagnostics` channel contains read-only values for the MQTT location watchdog.

| State                                | Description                                      |
| ------------------------------------ | ------------------------------------------------ |
| `diagnostics.lastLocationMessage`    | Timestamp of the last received MQTT location message |
| `diagnostics.locationMqttStale`      | `true` if the location stream is stale while the mower is active |
| `diagnostics.lastMqttRecovery`       | Timestamp of the last controlled MQTT recovery   |
| `diagnostics.lastLocationAgeSeconds` | Age of the last MQTT location message in seconds |

If HTTP polling reports an active mowing state but no MQTT `location` message is received for at least three minutes, the adapter marks the location stream as stale and reconnects MQTT. Recoveries are rate-limited to at most once every five minutes per device. Battery, status and `vehicleState` continue to be updated by periodic HTTP polling independently from this watchdog.

### Mowing Map

The adapter renders a live mowing map as a PNG image (base64 data URI) in the state `{deviceId}.map`. The map is automatically updated during mowing and cleared when a new mowing session starts.

**The map is off unless `mapEnabled` is set.** It is the one expensive thing this adapter does, and an installation that never looks at a picture should not pay for one. While it is off nothing is collected, decided or drawn, the four states it needs are not created, and the only thing the location messages still do is fill `location.*` as before. Switching it on takes effect on the next start of the instance, which saving the settings does anyway. Switching it off again leaves the states where they are — they hold the last picture and the track behind it, and throwing that away over a checkbox is not the adapter's call.

Drawing it is not free: the whole track goes onto a canvas, becomes a PNG and a base64 state write of 43 to 65 KiB — about 80 ms of blocked event loop for a session-length track, on the same loop that takes the MQTT messages the map is made of. A position therefore waits at most `mapRenderInterval` seconds (1 – 30, default 3) for its render, and the positions arriving meanwhile all appear in the one render that follows. Two seconds is as smooth as the mower reports; a weak host or a large lawn is better off higher. The renders that must be right straight away — the mower reaching the dock, a reset map, a charging station moved by hand — go through without waiting whatever the setting says.

A new session is recognised by the mowing progress reported with each location message: it starts over at zero for a new session, and picks up where it left off when the mower carries on after a charging break. The mower state cannot tell the two apart — a mower that docks halfway through to charge and then drives back out looks exactly like one starting a fresh session — so the map is cleared when the progress falls below the value last seen, and not on a state change. Should a mower not report a progress at all, the map falls back to being cleared when it leaves the dock for a mowing state; that fallback is switched off for good as soon as a progress has been seen once.

The progress is right but late: it only moves once a whole percent is mowed, so for the first minutes after leaving the dock the mower still reports the one of the session before. The mowed area (`subtotalArea`) is the same thing in square metres, and it is the field the mower zeroes the moment it takes on a new task — the message announcing the start already carries `0.0` m² next to the stale 100 % of the session before. The adapter therefore clears the map on a fall in the area — a fall worth the name, since the area is a computed value and a single tick the wrong way must not wipe a track — and keeps the progress as the second witness, for mowers that report no area at all. A charging break makes neither of them fall: a mower that docked at 224.15 m² and 61 % came back out reporting 227.26 m² and 62 %. The area is an accumulator — over the same session it tracked the rise in `mowingWeekArea` to within 0.05 m² — and a week counter has no reason to reset for a charge.

Every reading of the location stream is believed only while it is the newest of its kind the mower has sent. The broker delivers late: a mowing progress sent at 11:48 has been seen arriving at 13:34, after the session it belonged to had finished at 100 %, and taken for current it read as a restart and cleared the map of a session that was over. Positions in the same stream are routinely reordered by a few seconds. A reading that has been overtaken is therefore dropped where the message is unpacked, so nothing acts on it afterwards — neither the session decision, nor the track, nor the `location` states. Each kind of reading carries its own mark, told apart by the `type` the mower puts on it: a single mark would let a position, one every two seconds, silence a mowing progress still on its way, and those come only once a percent.

Until one of the two answers, the adapter notes where the track stands when the mower leaves, so the positions driven in the meantime survive the reset instead of being cleared away with the session that ended. If nothing ever answers, the start counts as a continuation after five minutes and the track is kept.

A lawn split into zones reports neither. A partition task sends no progress message at all — measured over a zone run of an hour and a half, not one, where a whole-lawn session sends one about every two minutes — so the last progress on record can be days old while the mower mows a zone every day. Two things therefore stand in for it. The zones the mower names in `location.partitionIds` start a new session when they change, one zone giving way to another. And a progress older than six hours no longer counts as one: past that, the mower leaving the dock clears the map, exactly as it does for a mower that never reported a progress in the first place. Six hours is far past any charging break — a live session cannot fall that quiet — and far short of the day between two mowings. What it costs: a zone task that breaks off to charge for longer than that comes back reading as a new session and loses the track it had collected. `remote.resetMap` is there for whatever neither rule catches.

Every reset also puts `location.mowingPercentage`, `location.currentMowProgress` and `location.subtotalArea` back to zero, because the mower only ever raises them and a zone task stops reporting them at all: what stood there was the last word of a session days over, displayed as this session next to a map that had just been cleared. Zero is what a session that is only beginning has mowed. Where the reset came out of a message that does carry a progress, the real values are written over them a moment later, out of that same message. `location.mowingWeekArea` is left alone — it counts the week, not the session.

The track behind it is kept in `{deviceId}.mapTrack` as JSON, `{ "percentage": 42, "area": 176.5, "progressAt": 1787650712963, "points": [[x, y], …] }`, with the positions in mower coordinates rounded to centimetres. It is written at most every 30 seconds while positions are coming in, and once more when the adapter stops, and it is read back on start — so after a restart the map shows the session so far instead of staying frozen on its last image until the mower moves again. Progress, mowed area and the time the progress arrived are stored with it because otherwise a restart could not tell a new session from a resumed one, nor a progress that is current from one left over from a session long finished; a track written by an older version does not carry the progress and is therefore dropped once, on the first start after the update, so the map stays empty until the mower drives again. It is cleared together with the map when a new mowing session starts.

#### Track Style

Three adapter settings decide how the track is drawn, so it can be toned down to suit a picture of the garden underneath it:

| Setting          | Range      | Default | Description                                                                        |
| ---------------- | ---------- | ------- | ---------------------------------------------------------------------------------- |
| `mapEnabled`     | on, off    | off     | Nothing below applies while this is off, and nothing is collected or drawn            |
| `mapLineColor`   | any colour | empty   | Empty keeps the gradient from blue at the start to green at the current position     |
| `mapLineOpacity` | 0.05 – 1   | 1       | Below 1 a background image shows through the track                                   |
| `mapLineWidth`   | 0.5 – 10   | 1.5     | Line width in pixels                                                                 |
| `mapMarker`      | dot, mower | dot     | The current position as a red dot or as a mower seen from above, turned the way it faces |
| `mapMarkerSize`  | 4 – 60     | 10      | Marker size in pixels; the mower needs about 16 to 24 to be recognisable as one       |

The mower marker is turned by `location.postureTheta`, the heading the mower reports itself. It is right from the first position of a session and stays right while the mower stands still. Where a position carries no heading the marker follows the last stretch driven instead. The heading travels with the track in `mapTrack` as an optional third element of each position, so a restored track keeps it, and a track written without one still reads.

The start and current position markers keep their colours and stay opaque whatever the track does. The opacity applies to the track as a whole rather than to each segment, so a stretch the mower drove twice is no darker than one it drove once.

#### Charging Station

The map shows the charging station once it knows where it is. The API does not say — the Navimow SDK has no endpoint carrying a coordinate — but the position the mower reports as it arrives in the dock is the station's, give or take the mower's own length, so that is what is taken.

It is taken once and then left alone: `vehicleState` lags the location stream by up to a minute, so while the mower drives back out it still reads as docked, and a second opinion taken then would walk the station across the garden after it.

The position lives in `{deviceId}.dockPosition` as `{"x":…,"y":…}` and can be written by hand — to correct it, or to set it without waiting for a docking. Writing an empty value forgets it and has the next docking looked at again. The frame grows to include the station, so it cannot end up outside the picture.

#### Track Size

The mower reports its position every two seconds and drives long straight lanes, so most of what arrives lies on a line the map has already drawn. A position is therefore only kept once it sits at least two centimetres off the straight line between its neighbours — on a recorded session that halved the positions while moving the drawn track by at most about a pixel.

A track may hold 10000 positions. On a garden large enough to fill that, the track is not cut off at the front — that is the part of the session the map exists to show — but thinned again at a coarser tolerance, so the whole session stays visible and only its detail goes. The log says so when it happens.

#### Map Frame

The frame is the rectangle of the garden, in mower coordinates, that the map image covers, and it is published in `{deviceId}.mapFrame`:

```json
{ "minX": -18, "maxX": 14, "minY": -3, "maxY": 29, "width": 800, "height": 800, "scale": 25 }
```

The image covers **exactly** the frame — its left edge is `minX`, its right edge `maxX`, its top edge `maxY`, its bottom edge `minY`, with no border around it and one scale for both axes. A world position therefore lands at `(x - minX) * scale` pixels from the left and `(maxY - y) * scale` pixels from the top. The image is at most 800 px on its longer edge; the shorter edge follows the shape of the frame.

The bounds are **metres in the mower's own coordinate system** — the same numbers as `{deviceId}.location.postureX` and `postureY`, not pixels of an image. The adapter widens the frame by two metres, snapped to whole metres, whenever the mower drives outside it, and never shrinks it again. It survives a restart and a new mowing session, so a position keeps its pixel from one render and one session to the next, which is what makes it possible to lay the map over a photo of the garden at all.

Because the frame never shrinks, a stray position far outside the garden would widen it for good. A position more than ten metres from the one before it is therefore not taken at face value: it is held back until the next message either confirms it — the mower really is somewhere else, for instance after leaving the dock — or contradicts it, in which case it is dropped. Should a frame still come out wrong, delete the `mapFrame` **and** `mapTrack` states of the device and restart the adapter; the frame is only ever built from the track, so both have to go.

#### VIS Position Script

To put your own mower icon on top of the map in ioBroker VIS — for instance over a photo of the garden rather than over the rendered track — this script turns the mower's position into pixels of your VIS image. It reads the garden bounds out of `mapFrame` rather than asking you for them, so there is nothing to measure and nothing to keep in step when the frame grows:

```javascript
// === Configuration ===
const deviceId = 'NAVIMOW'; // Your device ID
const prefix = 'navimow.0.' + deviceId;

// Where the image sits in the VIS view and how big it is (px)
const bildX = 580;
const bildY = 573;
const bildPosX = 30;
const bildPosY = 30;

// Robot icon size (px)
const robX = 32;
const robY = 26;

// Datapoints for VIS widget position (create manually)
const dpPosX = '0_userdata.0.Navimow.Pos_X';
const dpPosY = '0_userdata.0.Navimow.Pos_Y';
const dpRotation = '0_userdata.0.Navimow.Rotation';

on({ id: [prefix + '.location.postureX', prefix + '.location.postureY'], change: 'any' }, () => {
  const posX = getState(prefix + '.location.postureX').val;
  const posY = getState(prefix + '.location.postureY').val;
  const frameRaw = getState(prefix + '.mapFrame').val;
  if (posX == null || posY == null || !frameRaw) return;
  const frame = JSON.parse(frameRaw);

  // The map image covers exactly the frame, no border: its corners are the frame's corners.
  const pctX = (posX - frame.minX) / (frame.maxX - frame.minX);
  const pctY = (frame.maxY - posY) / (frame.maxY - frame.minY);

  setState(dpPosX, Math.round(bildPosX + bildX * pctX - robX / 2), true);
  setState(dpPosY, Math.round(bildPosY + bildY * pctY - robY / 2), true);

  // Which way it faces, in degrees clockwise from pointing right - what CSS rotate() wants.
  const theta = getState(prefix + '.location.postureTheta').val;
  if (theta != null) {
    setState(dpRotation, Math.round((-theta * 180) / Math.PI), true);
  }
});
```

**Setup:**

1. Use the `{deviceId}.map` state as the background image of a VIS view — it already covers exactly the frame, so nothing has to be lined up. To use a photo of your garden instead, line the photo up with that image once; from then on the same maths holds, because the frame no longer moves.
2. Create the datapoints `Pos_X`, `Pos_Y` and `Rotation` under `0_userdata.0`
3. Set `bildX`/`bildY` to the size the image is displayed at and `bildPosX`/`bildPosY` to its position in the view
4. Add a VIS widget with a mower icon, bind its CSS `left`/`top` to the position datapoints and `transform: rotate(…deg)` to the rotation

If you only want to see the track, none of this is needed — the `map` state is a finished picture, and `mapMarker` already draws the mower on it.

## API

Based on the [Navimow SDK](https://github.com/segwaynavimow/navimow-sdk) and [Navimow HA Integration](https://github.com/segwaynavimow/NavimowHA).

| Endpoint                                   | Purpose                                    |
| ------------------------------------------ | ------------------------------------------ |
| `POST /openapi/oauth/getAccessToken`       | OAuth2 token exchange and refresh          |
| `GET /openapi/smarthome/authList`          | Discover devices                           |
| `POST /openapi/smarthome/getVehicleStatus` | Get device status                          |
| `POST /openapi/smarthome/sendCommands`     | Send commands (Google Smart Home protocol) |
| `GET /openapi/mqtt/userInfo/get/v2`        | Get MQTT connection credentials            |

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.1.2 (2026-08-31)

- (typhosj) Start a new mowing session when the mower moves on to another zone, which a lawn split into zones announces in `location.partitionIds`
- (typhosj) Stop letting a mowing progress from a session long over hold the map of that session on screen: past six hours it counts for as little as none at all, and the mower leaving the dock clears the map. A zone task reports no progress whatsoever, so without this the map of the last whole-lawn session stayed up while the mower mowed a zone of it every day
- (typhosj) Put the mowed area and the mowing progress back to zero when a session is reset, so a zone run no longer shows the area and the percentage of a session days over
- (typhosj) Add `remote.resetMap`, which clears the track, the picture and the frame — for a lawn re-mapped or split into zones, where the adapter cannot see that a session ended
- (typhosj) Write the position, the heading and the two areas as numbers: the mower sends them as strings, so `location.postureX`, `postureY`, `postureTheta`, `subtotalArea` and `mowingWeekArea` used to be `text`/`string` states that no chart could draw and no script could compare without parsing them again
- (typhosj) Give the measured states their unit — metres, radians, square metres, percent — instead of naming it in brackets in the state's name

### 1.1.1 (2026-08-18)

- (typhosj) Register a release in Sentry only where a token for it is configured: without one `sentry-cli` answers 401 and fails the whole deploy job, after npm has already published

### 1.1.0 (2026-08-18)

- (typhosj) The remote controls are buttons now: they are written, not read, and no longer carry the mower state, which `status.vehicleState` says anyway
- (typhosj) Put the keys of every cloud payload through `FORBIDDEN_CHARS` before `json2iob` makes object ids of them, so a key the API spells with a forbidden character cannot land as an id nobody can address
- (typhosj) Arm the next status poll only once the one before it has come back, instead of on a fixed interval
- (typhosj) Cap the polling interval at a day in the adapter too, not only in the settings dialog
- (typhosj) Keep the authorization code out of the debug log and store it encrypted and protected
- (typhosj) Say in the README that the mowing map needs a prebuild of `@napi-rs/canvas`, that `stop` pauses rather than ends the job, and drop the German quotes from the setup steps
- (typhosj) Translate the admin settings into all eleven languages ioBroker asks for, from an `admin/i18n` folder instead of labels written into `jsonConfig.json`
- (typhosj) Say the length of the access token in the debug log instead of the first twenty characters of it, and keep the body of a failed token refresh out of the log entirely
- (typhosj) Put the device id through `FORBIDDEN_CHARS` before it becomes an object id, whether it came from the cloud or from an MQTT topic
- (typhosj) Fix the type check and let CI run it, so it cannot go red again unnoticed
- (typhosj) Require node.js 22, publish through npm's trusted publishing, and let the tests wait for lint and the type check
- (typhosj) Move the oldest changelog entries to `CHANGELOG_OLD.md`, and add `@iobroker/adapter-dev` so the `translate` script has the tool it calls

### 1.1.0-rc.0 (2026-08-17)

- (typhosj) Report a cloud outage after three failed polls instead of the first one, and let a single 502 pass as a warning
- (typhosj) Warn on a dropped MQTT connection and only report an error once it persists, because the broker takes most of them back within seconds
- (typhosj) Do not clear the map when the mower reports no task, which emptied the track of the last session overnight
- (typhosj) Log a failed API call as one readable line instead of the HTML error page a gateway answers with
- (typhosj) Draw the mower in the dock while the track is still empty, so it does not go missing from the picture after a session reset
- (typhosj) Keep the charging station on the map through a session reset, so the map is not blank while the mower is still leaving the dock
- (typhosj) Stop collecting positions while the mower stands in the dock, so its pose drift no longer grows the track and widens the map overnight
- (typhosj) Keep the MQTT connection alive while the mower stands still, so the position stream no longer dies out silently after ten idle minutes
- (typhosj) Ignore the all-zero posture a standing mower sends, so the marker no longer jumps off the map
- (typhosj) Render a live mowing map as a PNG in `{deviceId}.map`, drawn in a fixed frame so the picture stays put while the mower is out (#7)
- (typhosj) Keep the mowing track in `{deviceId}.mapTrack`, so the map survives an adapter restart instead of freezing on its last image (#7)
- (typhosj) Decide a new mowing session by the mowing progress, so a charging break no longer throws away the track of a session that is still running (#23)
- (typhosj) Keep the first minute of a new session, which the mower still reports as the one before (#23)
- (typhosj) Clear the map on the mowed area falling back to zero, which the mower reports minutes before the mowing progress catches up (#23)
- (typhosj) Ignore a mowing progress the broker delivers late, which read as a new session and cleared the map of one that had just finished (#23)
- (typhosj) Ignore every late location reading, not only the mowing progress, so an overtaken position no longer reaches the track or the states either (#23)
- (typhosj) Subscribe every MQTT channel once instead of twice, so each message is parsed and stored once
- (typhosj) Keep the mower state value list off `location.vehicleState`, which is a number and can never take any of them
- (typhosj) Stop refreshing the OAuth token once per failed MQTT connect attempt, without giving up the refresh that recovers an expired one
- (typhosj) Look for devices again on every poll, so a discovery that failed at startup no longer leaves the adapter idle until it is restarted by hand
- (typhosj) Try a failed token refresh again instead of dropping the chain, so a network outage over a refresh window no longer takes the adapter offline until a restart
- (typhosj) Load the canvas library on first use, so a host without a prebuild for it runs the adapter without a map instead of not running it at all
- (typhosj) The mowing map is a setting now and off by default, so an installation that does not want it pays nothing for it (#7)
- (typhosj) Keep the whole session in the track rather than its last 5000 positions, so the beginning no longer disappears off the map while the mower is still out (#7)
- (typhosj) Track colour, opacity and width can be set, so the map can be laid over a picture of the garden (#7)
- (typhosj) Draw the map at most every `mapRenderInterval` seconds instead of on every position, so a session no longer spends minutes of event loop and state writes on pictures nobody sees (#7)
- (typhosj) Stop the disconnect watchdog from asking for a timer while the adapter is shutting down, which only earned a warning in the log
- (typhosj) Publish the mower state from the MQTT state channel instead of the lagging HTTP cache
- (typhosj) Refresh the status over HTTP when MQTT goes quiet in MQTT-only mode (#18)
- (TA2k) Retry the MQTT connection after a transient credential failure (#18)
- (TA2k) Keep the MQTT broker password and the refresh token out of the debug log
- (TA2k) Read the battery level from `capacityRemaining` again
- (typhosj) HTTP polling defaults to 5 minutes and can be switched off with 0; the admin UI checks the range
- (typhosj) Fix the findings of the ioBroker repository checker (#11)

### 1.0.2 (2026-04-04)

- (TA2k) Add MQTT location topic with real-time position tracking
- (TA2k) Generic MQTT topic handling via wildcard subscription

Older entries are in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 TA2k <tombox2020@gmail.com>

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