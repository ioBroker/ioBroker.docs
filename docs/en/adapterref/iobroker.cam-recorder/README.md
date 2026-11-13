![Logo](admin/cam-recorder.png)

# ioBroker.cam-recorder

[![NPM version](https://img.shields.io/npm/v/iobroker.cam-recorder.svg)](https://www.npmjs.com/package/iobroker.cam-recorder)
[![Downloads](https://img.shields.io/npm/dm/iobroker.cam-recorder.svg)](https://www.npmjs.com/package/iobroker.cam-recorder)
[![License](https://img.shields.io/github/license/sadam6752-tech/ioBroker.cam-recorder.svg)](LICENSE)

[![NPM](https://nodei.co/npm/iobroker.cam-recorder.png?downloads=true)](https://nodei.co/npm/iobroker.cam-recorder/)

![Test and Release](https://github.com/sadam6752-tech/ioBroker.cam-recorder/workflows/Test%20and%20Release/badge.svg)

## Camera recorder adapter for ioBroker

Records short video clips (MP4 or GIF) and snapshots (JPEG) from RTSP cameras, for example a
[DoorBird](https://www.doorbird.com/) door station, when the doorbell rings or motion is detected, and can send the
result to Telegram, MAX, email and other messengers.

- **ffmpeg is included.** The adapter brings its own ffmpeg binary (package
  [ffmpeg-static](https://github.com/eugeneware/ffmpeg-static)), nothing has to be installed on the system.
- **No passwords in scripts.** Camera logins live in the adapter settings and are stored encrypted. Scripts only name
  the camera.
- **Works without scripts.** A trigger table connects any state (doorbell, motion, a button) to a camera.
- **Kind to small systems.** ffmpeg only runs while a clip is recorded, the number of parallel ffmpeg processes is
  limited, and the camera stream can be copied instead of re-encoded.

## Settings

### Cameras

One row per camera: a name, the RTSP URL, user and password. Examples of RTSP URLs:

| Camera             | URL                                                   |
| ------------------ | ----------------------------------------------------- |
| DoorBird           | `rtsp://192.168.1.20:554/mpeg/media.amp`              |
| Hikvision          | `rtsp://192.168.1.40:554/Streaming/Channels/101`      |
| Reolink            | `rtsp://192.168.1.41:554/h264Preview_01_main`         |
| Most ONVIF cameras | see the manual of the camera or the ONVIF device tool |

A login typed into the URL (`rtsp://user:password@host/...`) is moved into the user and password fields at the next
start. Special characters in passwords are fine, the adapter encodes them for ffmpeg.

_Transport_ is TCP by default; it works reliably also from Docker containers. _Key frames only_ helps when snapshots
of an H.265 camera come out grey.

_Sound_ takes the sound of the camera into the mp4 clips, also into those from the pre-recording, so they play with
sound in Telegram and elsewhere. The camera must send the sound in its RTSP stream; many cameras have it off by default
or only in one of their streams (look for audio in the video or stream settings of the camera). Cameras send G.711 or
AAC; the adapter always writes AAC, which mp4 and the messengers need, also when the picture is copied. GIFs, snapshots
and timelapse videos stay silent. A camera without sound still records, only without sound.

With sound, picture and sound keep their times. A clip recorded live starts at the connection: a camera with a key
frame only every few seconds shows its first picture a moment after the sound starts. Clips from the pre-recording do
not have this gap.

The camera name becomes the object id: `Front Door` → `cam-recorder.0.cameras.front_door`. Letters with
diacritics are transliterated (`ü` → `ue`, `é` → `e`), other special characters become `_`.

### Triggers

| Column                     | Meaning                                                                                       |
| -------------------------- | --------------------------------------------------------------------------------------------- |
| State                      | Any state, e.g. `doorbird.0.Doorbell.1.trigger` or `doorbird.0.Motion.trigger`                |
| When                       | _Value is true_ (default) or _Every write_                                                    |
| Cooldown                   | Seconds in which further writes start no new clip (a doorbell pressed three times = one clip) |
| Only if, Comparison, Value | Optional condition, see below                                                                 |
| Camera                     | Name of a camera of the first tab                                                             |
| Action                     | Video clip, snapshot, or both (both run at the same time, the photo arrives first)            |
| Duration                   | Seconds, 0 = value of the _Recording_ tab                                                     |
| Format                     | MP4 video, GIF animation, or _Default_                                                        |
| Message                    | Profiles of the _Send_ tab that get the result, several comma separated; empty = no message   |

**Conditions.** A trigger with _Only if_ fires only while that state compares as set: `=`, `≠`, `>` or `<`
against _Value_. Examples: `0_userdata.0.away` `=` `true` (only when nobody is home), `javascript.0.isNight` `=`
`true`, `hm-rpc.0.ABC.LUX` `<` `50`. A boolean state also matches `1`/`0`, `on`/`off`, `yes`/`no`; texts are compared
without case. The state is read at the moment of the event; a skipped event is logged and starts no cooldown.

Every write of the state counts, also when the value does not change. With pre-recording, a write inside the cooldown
**extends** the clip that is still being cut instead of being ignored: the clip then ends the trigger's duration after
the last ring, up to _Maximum clip length_ on the _Recording_ tab (default 30 s). The log shows it as `extended 2x`.

### Recording

Clip length and format, and how MP4 files are made:

- **Re-encode** (default): the clip is scaled (default width 640 px) and encoded with H.264, small files that Telegram
  plays everywhere. This uses CPU for the length of the clip.
- **Copy the camera stream**: almost no CPU, original resolution. The camera has to send H.264.
  A copied stream can only start at a key frame, while the clip length counts from the connection: with a camera
  that sends a key frame every few seconds, a copied clip is shorter by up to that interval. Re-encoded clips start
  their length at the first picture and keep the full length.

GIF animations are always re-encoded (width and frame rate on the same tab).

### Pre-recording

A doorbell clip that starts when the button is pressed misses the person walking up to the door. With pre-recording
the clip also contains the seconds **before** the event.

- **Off by default.** Switch it on with _Pre-recording_ on the _Recording_ tab, then set _Pre-recording (s)_ (1 to 30)
  for each camera that should use it. Cameras with 0 are not affected.
- **What it costs.** For each such camera one ffmpeg process runs all the time. It copies the camera stream into
  2-second pieces without re-encoding (little CPU, a few MB of disk in the temp folder) and deletes old pieces. The
  camera keeps one stream open permanently — check that it allows a second stream for snapshots and live views.
- **How a clip is made.** At the event the adapter waits until the seconds after the event are on disk, joins the
  pieces and cuts the window _pre-recording + clip length_. A clip is therefore ready about 2 to 4 seconds later than
  without pre-recording. The duration in the trigger table and in `sendTo` is the time **after** the event.
- **Snapshots** come from the buffer while it runs: the newest picture on disk, at most about a second old, without a
  second connection to the camera — instant, and it shows the moment of the event. `sendTo` with `live: true` asks the
  camera instead.
- **When something fails** (camera offline, stream stalled for 20 s), the process is restarted after 5 s, 10 s, 30 s,
  60 s, then every 5 minutes, with a warning in the log. While the buffer is not running, clips are recorded from the
  event on as without pre-recording, with a warning in the log. After a start of the adapter the buffer needs about
  10 seconds (ffmpeg analyses the stream, then waits for key frames) until `prebuffer` shows `running`.
- **Reading the warning.** It tells how long the stream ran and the last warnings of ffmpeg, e.g.
  `received no data for 20 s after 37 s of stream: [rtsp] RTP: missed 12 packets (5×)`. _before any data came_ means
  the camera never sent (wrong URL, login, port); _after … s of stream_ with the same time again and again means the
  camera stops sending after a while, e.g. because another client (the app of the camera, a video recorder) takes the
  stream or a session ends. Try the other transport (TCP/UDP) or switch the sound of the camera off and on.
- The pieces go to the system temp folder (`/tmp/iobroker-cam-recorder.0-prebuffer` on Linux) unless you enter a
  folder. A RAM disk (tmpfs) is a good choice on systems with an SD card.

### Send

A **profile** says where a result goes and what is sent. Triggers and timelapses choose profiles by name in their
column _Message_ (pick one from the list, or type several names separated by commas; empty or `—` = no message; the start names such
triggers in the log, unless they feed the states of the AI check),
scripts with `profiles: 'Name'`. The list of the column shows the profiles of the saved settings, so save once after
adding a profile.

| Column     | Meaning                                                                                                  |
| ---------- | -------------------------------------------------------------------------------------------------------- |
| Name       | Unique name of the profile                                                                               |
| Instance   | Messaging instance, e.g. `telegram.0`, `max.0`, `email.0` (see the table below)                          |
| Recipient  | Optional, in the form the adapter expects; empty = the default of that adapter                           |
| Attachment | _Everything_ (snapshots, clips, timelapse videos), _Snapshot only_, _Clip only_, or _Text only_          |
| Text       | Caption: `{camera}`, `{date}` and `{time}` are replaced, the date in the format of the system settings   |
| Template   | Optional JSON message for adapters without a built-in format, or to replace the built-in one (see below) |

_Text only_ sends the text at once when the trigger fires, before the recording is finished, without a file — for
example a quick "Someone is at the door" while the clip with the file goes through a second profile. For a timelapse
or a script it is sent when the file is ready.

| Adapter        | What arrives                               | Recipient                                          |
| -------------- | ------------------------------------------ | -------------------------------------------------- |
| `telegram`     | the file (MP4 as video, GIF as animation)  | user, empty = all users of the bot                 |
| `max`          | the file (clip as video, picture as image) | user ID, negative group chat ID, empty = all users |
| `email`        | the file as attachment, caption as subject | address                                            |
| `pushover`     | pictures as attachment, a clip as text     | device                                             |
| `discord`      | the file                                   | `serverId/channelId`, a user id or a user tag      |
| `matrix-org`   | pictures, a clip as text                   | –                                                  |
| `signal-cmb`   | text with camera, kind and file name       | phone number                                       |
| `whatsapp-cmb` | text                                       | phone number                                       |
| `gotify`       | text                                       | –                                                  |
| `ntfy`         | text                                       | topic                                              |

All messaging adapters must run on the same host as this adapter, since they read the file from its path.

Example for a door station with two buttons for two flats:

| Name         | Instance   | Recipient | Attachment |
| ------------ | ---------- | --------- | ---------- |
| Me           | telegram.0 | Alex      | Everything |
| Father       | telegram.0 | Father    | Clip only  |
| Father (MAX) | max.0      | 123456    | Text only  |

Trigger `doorbird.0.Doorbell.1.trigger` → _Message_ `Me`; trigger `doorbird.0.Doorbell.2.trigger` → _Message_
`Father, Father (MAX)`. A name that matches no active profile is reported at the start.

**Update from 0.4.x.** The first start after the update turns the settings of the former _Notifications_ tab into
profiles, once: the Telegram instance becomes the profile `Telegram`, every further target a profile with its name
(identical targets only once, a target without a name is named after instance and recipient), all with the former
caption. Each trigger and timelapse gets the profiles it sent to before; an empty _Send to_ becomes the list of all
of them. The instance restarts once after this. Scripts with `telegram: true` keep working (see _Scripts_).

#### Template

The column _Template_ takes the JSON message that the adapter sends to the instance of the profile, as
`sendTo('<instance>', 'send', <template>)`. Leave it empty for the built-in format of the table above. Enter a
template for an adapter that is not in the table, or to replace the built-in format, e.g. to add options.

| Placeholder   | Replaced by                                                                   |
| ------------- | ----------------------------------------------------------------------------- |
| `{file}`      | full path of the file                                                         |
| `{fileName}`  | name of the file without folder                                               |
| `{fileUrl}`   | the path as `file:///…` URL                                                   |
| `{caption}`   | the _Text_ of the profile, with camera, date and time filled in               |
| `{camera}`    | name of the camera                                                            |
| `{format}`    | `mp4`, `gif` or `jpg`                                                         |
| `{duration}`  | length of the clip in seconds                                                 |
| `{recipient}` | the _Recipient_ of the profile                                                |
| `{text}`      | a ready text, e.g. `Door 09:00: mp4 clip 10 s (door_2026-11-11_09-00-00.mp4)` |

- Placeholders are replaced inside the strings of the JSON, so their values are always strings, also `{duration}`.
  Write numbers and `true`/`false` directly into the JSON.
- Quotes in the caption cannot break the template: it is parsed as JSON first, the values are filled in after.
- With _Text only_, `{file}`, `{fileName}`, `{fileUrl}`, `{format}` and `{duration}` are empty.
- A template that is no valid JSON is reported in the log at the start.

Telegram without notification sound:

```json
{ "text": "{file}", "caption": "{caption}", "user": "{recipient}", "disable_notification": true }
```

Pushover with high priority; Pushover attaches pictures only, so set the _Attachment_ of this profile to
_Snapshot only_:

```json
{ "message": "{text}", "file": "{file}", "priority": 1 }
```

Any other adapter:

```json
{ "to": "{recipient}", "title": "{camera}", "body": "{caption}", "attachment": "{file}" }
```

### AI check

With [ioBroker.pi-agent](https://github.com/sadam6752-tech/ioBroker.pi-agent) and a model that understands pictures,
a profile of the _Send_ tab gets an extra message when the picture of an event shows what matters to its recipient.
The files of the event go out as before, whatever the check says, so a failed recognition never costs a message.

Choose the pi-agent instance on the tab _AI check_ and add one row per criterion, in your own words and language,
with the profiles that get the extra message when the picture meets it:

| Active | Criterion                  | Profiles   |
| ------ | -------------------------- | ---------- |
| ✓      | a person                   | Me, Father |
| ✓      | an animal in the garden    | Garden     |
| ✓      | a car in front of the gate | Me         |

When a trigger fires, the clip and the snapshot are made and sent as before. At the same time the adapter takes a
snapshot (from the pre-recording when it runs) and asks pi-agent once, with every criterion of the profiles of this
trigger. A profile whose criteria the picture meets gets one more message through its own instance and recipient:

```
🔍 Front door: a person — A man with a parcel at the door.
```

- The description comes in the language of the system settings; the state `description` of the camera keeps the
  newest one.
- _Wait for the answer of pi-agent_ (5–120 s, default 30). Without a match, when pi-agent does not answer in time, or
  when the check fails (pi-agent stopped, a model without image input) there is no extra message, and the log says
  why.
- pi-agent keeps one conversation per camera (`cam-recorder-<camera>`). It sends the picture to its model only with
  this question; later questions see a text of it. One check costs one request with one picture, and the daily token
  limit of pi-agent counts it.
- Scripts get the same check for `record` and `snapshot` with `profiles`. Timelapse videos are not checked.

**States for scripts and scenes.** A row with _State_ gives each camera the state
`cam-recorder.0.cameras.<camera>.ai.<criterion>` (e.g. `…cameras.doorbird.ai.a_person`), so other adapters can act on
what the camera saw, without any message:

| Active | Criterion | Profiles | State | Hold (s) |
| ------ | --------- | -------- | ----- | -------- |
| ✓      | a person  |          | ✓     | 120      |

- The state turns `true` when pi-agent sees the criterion in the snapshot of a trigger and back to `false` after
  _Hold_ seconds (5–3600, default 60), like a motion sensor; a further match keeps it `true` and starts the time anew.
  At the start of the adapter all of them are `false`.
- A criterion with _State_ is checked at every trigger of every camera, also when the trigger has no profile. Scripts
  that ask for `record` or `snapshot` do not change the states.
- The id comes from the criterion: letters, digits and `_`; when nothing is left (e.g. Cyrillic text) it is
  `criterion_<row>`. Renaming a criterion makes a new state; the old one is removed at the next start.
- The answer comes some seconds after the trigger (snapshot plus model). For a light that must be on the moment someone
  walks up, a motion sensor is faster; the state is for decisions like "a person, not a cat".

Example with the javascript adapter:

```js
on({ id: 'cam-recorder.0.cameras.doorbird.ai.a_person', val: true }, () => {
    setState('hue.0.Entrance.on', true);
});
```

### Timelapse

One row per camera: a picture every _Interval_ minutes, and once a day at _Video at_ (HH:MM, default 23:55) the
pictures become an MP4 video (_Frames per second_, width of the _Recording_ tab), named
`<camera>_timelapse_<YYYY-MM-DD>.mp4` after the day of its first picture. The pictures are deleted after the video
is made. While the pre-recording runs, the pictures come from the buffer, without a second connection to the camera.

- The button `cameras.<camera>.timelapse` (or `sendTo(…, 'timelapse', 'Front Door')`) makes the video at once.
- If the adapter was stopped at the time of the video, the missed video is made at the next start.
- _Message_ sends the video through the named profiles of the _Send_ tab.
- Disk space: one picture per minute at 640 px is about 50 MB a day until the video is made; at most 10 000 pictures
  wait per camera. Old timelapse videos are deleted after the maximum age of the _Storage_ tab.

### NAS (SFTP)

Every new clip, snapshot and timelapse video is copied to an SFTP server (a NAS such as Synology or QNAP, or any Linux
server with SSH), into `<folder>/<camera>/`. The adapter opens the SSH connection itself — no mount, no shell
command.

1. Create a user on the NAS that may only write into the target folder, and enable SFTP.
2. Enter host, port, user, password and folder, then press _Test connection_. It writes and deletes a small test
   file and shows the fingerprint of the server.
3. Enter that fingerprint: from then on a different server is refused before the password is sent. Without a
   fingerprint every copy warns in the log.

How it behaves:

- The copy runs in the background, one file after the other; notifications do not wait for it.
- A file appears on the server under its final name only when it is complete (upload as `.part`, size check, rename).
- A failed copy is logged and shown in `info.remoteError`; it is not retried, the next file is copied again.
  `info.lastRemoteCopy` holds the time of the last good copy.
- _Days kept on the server_ deletes older files of this adapter on the server (0 = keep everything); other files in
  the folders are never touched.
- The password is stored encrypted. The files are not encrypted on the server, only the transfer is.

### Storage

Files are written to `iobroker-data/cam-recorder.<instance>/media/` (or the folder you enter), named
`<camera>_<YYYY-MM-DD_HH-MM-SS>.<mp4|gif|jpg>`. Old files are deleted per camera and kind: the newest _n_ files are
kept (default 20) and nothing older than the maximum age (default 7 days). Other files in the folder are never
touched.

The newest file of each camera and kind is also copied into the ioBroker file storage
(`cam-recorder.0.storage/<camera>.mp4`, `.gif`, `.jpg`), where it can be opened in the admin tab _Files_ or through a
`web` instance.

### Advanced

- **Path of ffmpeg**: empty uses the bundled binary. Enter a path to use an ffmpeg of the system instead.
- **ffmpeg processes at the same time** (default 2): further requests wait. Set 1 on weak systems or for cameras that
  allow only one stream at a time.
- **Camera timeout**: seconds until an unreachable camera counts as failed.

## Device Manager

With admin 7 or newer, the Device Manager shows one card per configured camera, in the tab _Devices_ of the
instance settings and under _Devices_ in the menu of the admin:

- **Status:** online or offline. The adapter opens a TCP connection to the host and port of the camera URL at the
  start and every minute (no login, no ffmpeg) and writes the result into `cameras.<camera>.reachable`. The last
  error appears as a warning on the card.
- **Recording now:** a red dot with _Recording_ or _Taking a snapshot_ while ffmpeg works for this camera.
- **Last clip** and **last snapshot** with date and time, and the pre-recording seconds if it is on.
- **Picture:** the last snapshot, when _Copy the newest file into the ioBroker file storage_ is on (tab _Storage_).
- **Record now** and **Snapshot:** the same as the buttons `cameras.<camera>.record` and `.snapshot` — a clip with
  the length and format of the _Recording_ tab, or a picture, without notifications. The dialog shows the file name
  or the error, then the card is updated.

The cameras, triggers and all other settings stay in the settings of the instance; the Device Manager only shows
them and starts recordings.

## States

Per camera below `cam-recorder.0.cameras.<camera>`:

| State                | Meaning                                         |
| -------------------- | ----------------------------------------------- |
| `record`             | Button: record a clip with the default settings |
| `snapshot`           | Button: take a snapshot                         |
| `lastVideo`          | Path of the newest clip                         |
| `lastVideoTime`      | Time of the newest clip                         |
| `lastSnapshot`       | Path of the newest snapshot                     |
| `lastSnapshotTime`   | Time of the newest snapshot                     |
| `status`             | `idle`, `recording`, `snapshot` or `error`      |
| `lastError`          | Text of the last error, empty after a success   |
| `description`        | What the AI check saw in the newest snapshot    |
| `reachable`          | Answers on the network (checked each minute)    |
| `prebuffer`          | `off`, `starting`, `running` or `restarting`    |
| `timelapse`          | Button: make the timelapse video now            |
| `lastTimelapse`      | Path of the newest timelapse video              |
| `lastTimelapseTime`  | Time of the newest timelapse video              |
| `timelapseFrames`    | Pictures waiting for the next timelapse video   |
| `timelapseNextVideo` | Time of the next timelapse video                |

`info.connection` is true when ffmpeg was found and works, `info.ffmpegVersion` shows its version.
`info.lastRemoteCopy` and `info.remoteError` report the copy to the SFTP server.

## Scripts

The answer comes when the file is complete, so there is no need to wait a fixed time:

```js
on({ id: 'doorbird.0.Doorbell.1.trigger', change: 'any' }, () => {
    sendTo('cam-recorder.0', 'record', { camera: 'Front Door', duration: 5, format: 'mp4' }, result => {
        if (result.error) {
            log(result.error, 'warn');
            return;
        }
        sendTo('telegram.0', 'send', { text: result.file, user: 'User1', caption: 'Doorbell' });
    });
});
```

| Command        | Message                                                                         | Answer                                                                                                   |
| -------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `record`       | `{ camera, duration?, pre?, format?: 'mp4' \| 'gif', width?, fps?, profiles? }` | `{ file, size, format, duration, pre, extended, fromBuffer, realDuration, camera, time }` or `{ error }` |
| `snapshot`     | `{ camera, width?, live?, profiles? }` or just the camera name                  | as above, `format: 'jpg'`                                                                                |
| `timelapse`    | `{ camera }` or just the camera name                                            | the video as above, or `{ error }` when fewer than two pictures wait                                     |
| `listCameras`  | –                                                                               | `[{ value, label }]`                                                                                     |
| `listProfiles` | –                                                                               | `[{ value, label }]`                                                                                     |
| `help`         | –                                                                               | `{ help }`: the commands, states and rules as text for an AI agent                                       |

`profiles: 'Me, Father'` (or a list) sends the result through those profiles of the _Send_ tab. The way of 0.4.x
still works: `telegram: true` sends through every active profile, with `recipients: 'Father'` only through those.
When a profile of the message has a criterion of the tab _AI check_, the snapshot is checked as well (see _AI
check_), and the answer has `description`.
`pre` limits the seconds before the event (at most the value set for the camera, `0` = no pre-recording for this
clip); `duration` is always the time after the event, and the answer's `duration` is the whole clip.

## Security notes

- Camera passwords are stored encrypted in the instance object, and the camera list is not readable for other
  adapters (`protectedNative`).
- ffmpeg is started without a shell. Logins are removed from every log line, state and answer.
- While ffmpeg runs, its command line (with the camera login) can be seen by other users **of the same machine** in
  the process list (`ps`). ffmpeg cannot take an RTSP login from anywhere else. On a dedicated ioBroker host or in a
  container this is usually acceptable; give the camera a user that may only view the stream.
- Recorded files are not encrypted. Files copied into the ioBroker file storage can be opened by every admin user and,
  depending on its settings, through a `web` instance.
- The SFTP password is stored encrypted (`encryptedNative`). A connection test with an empty password field uses the
  saved password only for the saved server, so no script can send it to another host.

## ffmpeg license

The adapter is MIT licensed. The bundled ffmpeg binary comes from [ffmpeg-static](https://github.com/eugeneware/ffmpeg-static)
and is licensed under the GPL (it contains libx264). It is started as a separate program and not linked into the
adapter.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.6.3 (2026-11-13)

- (sadam6752-tech) AI check: a criterion with the new column _State_ gives each camera the state
  `cameras.<camera>.ai.<criterion>`, true for _Hold_ seconds after a match, for scripts, Blockly and scenes; such a
  criterion is checked at every trigger, also without profiles
- (sadam6752-tech) The log names each trigger at the start whose result goes nowhere (no profile in its column
  _Message_ and no state of the AI check): its files are saved but not sent

### 0.6.2 (2026-11-12)

- (sadam6752-tech) Pre-recording: the warning of a stopped buffer tells how long the stream ran (or that no data came at
  all) and the last warnings of ffmpeg, repeated ones counted, to find why a camera stops sending

### 0.6.1 (2026-11-12)

- (sadam6752-tech) AI check: the question to pi-agent names the date and time of the snapshot instead of
  "just now", so the chat of pi-agent shows when each picture came

### 0.6.0 (2026-11-12)

- (sadam6752-tech) AI check: on the new tab _AI check_ criteria in your own words ("a person", "an animal in the
  garden") name profiles; with ioBroker.pi-agent the snapshot of an event is checked, and a profile whose criterion
  the picture meets gets an extra message with what was seen. The files go out as before; the new state
  `description` keeps the newest description
- (sadam6752-tech) The adapter answers the message `help` with a description of its commands for AI agents

### 0.5.2 (2026-11-11)

- (sadam6752-tech) Sound: a new column _Sound_ in the camera table takes the sound of the camera into mp4 clips
  (as AAC, also from the pre-recording and with a copied picture); GIFs and snapshots stay silent
- (sadam6752-tech) Device Manager: a camera that is off showed as online. The adapter now checks every camera on the
  network at the start and every minute (state `reachable`), and the card shows that

Older changes are in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 sadam6752-tech <sadam6752@gmail.com>

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