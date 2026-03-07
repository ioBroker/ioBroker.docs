![Logo](admin/frigate.png)

# ioBroker.frigate

[![NPM version](https://img.shields.io/npm/v/iobroker.frigate.svg)](https://www.npmjs.com/package/iobroker.frigate)
[![Downloads](https://img.shields.io/npm/dm/iobroker.frigate.svg)](https://www.npmjs.com/package/iobroker.frigate)
![Number of Installations](https://iobroker.live/badges/frigate-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/frigate-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.frigate.png?downloads=true)](https://nodei.co/npm/iobroker.frigate/)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.frigate/workflows/Test%20and%20Release/badge.svg)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information on how to disable the error reporting, see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## frigate adapter for ioBroker

Adapter for Frigate Tool [Frigate Video](https://frigate.video/)

## Setup

- Enter Frigate url e.g. `localhost:5000` or `192.168.178.2:5000`
- Enter MQTT port: 1883 from the frigate config
- Enter host or ip of iobroker system in the frigate config under
```yaml
mqtt:
    host: ioBrokerIP
    port: ioBrokerPort
```

After Starting Frigate and the Adapter, you should see a new client connected in the log.

## Usage

### stats

General Information about the system and cameras.

### remotes

`frigate.0.remote.pauseNotifications` - Pause Notification for all Cameras.

### events

Last Event with before and after information.

`frigate.0.events.history` - History of the last X events.

History event has a thumbnail of the event and URL to the snapshot and clip.

### camera_name

Status and settings of the camera.

Change states to change the settings of the camera.

[Detailed Information about all states](https://docs.frigate.video/integrations/mqtt/)

* `frigate.0.camera_name.motion` - Whether camera_name is currently detecting motion. Expected values are ON and OFF. NOTE: After motion is initially detected, ON will be set until no motion has been detected for mqtt_off_delay seconds (30 by default).
* `frigate.0.camera_name.person_snapshot` - Publishes a jpeg encoded frame of the detected object type. When the object is no longer detected, the highest confidence image is published or the original image is published again.
   The height and crop of snapshots can be configured in the config.
* `frigate.0.camera_name.history` - Event history of the camera.
* `frigate.0.camera_name.remote.notificationText` - custom notification text for the camera.
* `frigate.0.camera_name.remote.notificationMinScore` - custom notification min score for the camera.
* `frigate.0.camera_name.remote.pauseNotifications` - pause notification for the camera.
* `frigate.0.camera_name.remote.ptz` - send ptz commands https://docs.frigate.video/integrations/mqtt/#frigatecamera_nameptz

## Notifications

The adapter can send snapshots and clips from events and object detection to instances like `telegram`, `pushover` and `signal-cbm`.

You can specify multiple instances or users to send snapshots or clips.

Activate notifications in the settings to receive snapshots or clips.

For Event can enter a minimum score before sending. 0 = Disabled.

Clips are sent 5 seconds (Instance settings) after the event ends.

You can enter custom notification text with placeholder `{{source}} {{type}} erkannt {{status}} {{score}} {{state}}`.

## Integrate in vis

You can integrate snapshots and clips in the vis:

Snapshot:
- Add a `String img src` and use as Object ID: `frigate.0.camera_name.person_snapshot`
- Add a `String img src` and use as Object ID: `frigate.0.events.history.01.thumbnail`

Clips:
- Add a `HTML` add as HTML:
```html
<video width="100%" height="auto" src="{frigate.0.events.history.01.webclip}" autoplay muted>
</video>
```

Number of persons: 
- `frigate.0.camera.person`

Event with Person: 
- `frigate.0.events.after.label` = person

## Running frigate docker on different host
If you want to send via telegram and co. the clips and snapshots to the iobroker host,
the frigate instance and telegram (or other) instance must run on the same host,
as frigate uses disk to store the clips and snapshots. 

## Discussion and questions

[https://forum.iobroker.net/topic/64928/frigate-adapter-für-iobroker](https://forum.iobroker.net/topic/64928/frigate-adapter-für-iobroker)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (@GermanBluefox) Code optimizations and refactoring

### 2.0.2 (2026-02-16)
- (@GermanBluefox) Removed gpu_usages

### 2.0.0 (2026-02-16)
- (@GermanBluefox) Adapter was migrated to TypeScript
- (@GermanBluefox) Breaking change: All states with value ON/OFF were changed to boolean true/false
- (@GermanBluefox) Better handling of complex objects and arrays
- (@GermanBluefox) `path_data` is not parsed anymore
- (@GermanBluefox) Added еру possibility to start and manage docker with frigate from the adapter

### 1.4.0 (2026-01-26)

- (mcm1957) Adapter requires node.js 20 as minimum now.
- (TA2k) Remove path_data objects to prevent too many objects generated by the adapter

### 1.3.3 (2026-01-26)

- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

- (mcm1957) Adapter requires admin 6.17.14 as minimum now.

### 1.3.2 (2025-05-06)

- (TA2k) remove path_data from v0.16
- (TA2k) move clip url from mp4 to m3u8
- (mcm1957) Adapter requires js-controller 5.0.19 as minimum now.
- (mcm1957) Several issues reported by the adapter checker have been fixed.

## License

MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2024-2025 TA2k <tombox2020@gmail.com>

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
