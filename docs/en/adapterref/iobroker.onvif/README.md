![Logo](admin/onvif.png)

# ioBroker.onvif

[![NPM version](https://img.shields.io/npm/v/iobroker.onvif.svg)](https://www.npmjs.com/package/iobroker.onvif)
[![Downloads](https://img.shields.io/npm/dm/iobroker.onvif.svg)](https://www.npmjs.com/package/iobroker.onvif)
![Number of Installations](https://iobroker.live/badges/onvif-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/onvif-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.onvif.png?downloads=true)](https://nodei.co/npm/iobroker.onvif/)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.onvif/workflows/Test%20and%20Release/badge.svg)

## ONVIF adapter for ioBroker

**Adapter for ONVIF cameras**

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

[zur deutschen Dokumentation](README-de.md)

## Add cameras

### Discovery:

Each time the adapter is started, a discovery is performed with the user name and password entered in the settings and an attempt is made to log in to the camera. If the camera has not yet been added under Objects.

You can perform the discovery manually in the settings. If the cameras have different credentials, you have to enter them and perform a discovery. In the log you can see the details of the process.

In order for a camera to be detected again, it must simply be deleted under Objects.

### Manual search

Cameras can be searched for manually if Discovery does not work. To do this, an IP range and ports must be entered and executed manually. In the log you can see details about the process.

## States

onvif.0.IP_PORT.events Events of the camera like e.g. motion detection. Sometimes you have to trigger the event to see it.

onvif.0.IP_PORT.general General information about the cameras

onvif.0.IP_PORT.infos Information about the camera is only updated at adapter start or at remote.refresh

Video and Snapshot URL:

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

onvif.0.IP_PORT.remote Control of the camera

onvif.0.IP_PORT.remote.refresh Updating the info data

onvif.0.IP_PORT.remote.gotoHomePosition Set PTZ camera to home position

onvif.0.IP_PORT.remote.gotoPreset Select PTZ camera preset number

onvif.0.IP_PORT.remote.snapshot Save snapshot to onvif.0.IP_PORT.snapshot

## Message

Adapter receives message "snapshot" and returns image

```javascript
sendTo("onvif.0", "snapshot", "192_168_178_100_80", (result) => {
  if (result) {
    sendTo("telegram.0", {
      text: result,

      type: "photo",

      caption: "camera2",
    });
  }
});
```

## Motion message to Telegram

```javascript
on("onvif.0.192_168_178_100_80.events.RuleEngine/CellMotionDetector/Motion", (obj) => {
  if (obj.state.val === true) {
    sendTo("onvif.0", "snapshot", "192_168_178_100_80", (result) => {
      if (result) {
        sendTo("telegram.0", {
          text: result,

          type: "photo",

          caption: "Camera 2",
        });
      }
    });
  }
});
```

# Include stream into vis

If stream should be displayed in Apple Homekit then please create a camera directly in yahka. If that doesn't work or hksv is needed then install scrypted in a docker and add the camera with onvif and homekit plugin

## go2rtsp Docker

A stream is normally provided via rtsp stream. A conversion via motion eye is very resource-intensive and has a delay. A conversion to webrtc is faster and saves resources. My recommendation is a [go2rtsp](https://github.com/AlexxIT/go2rtc). A docker from alexxit/go2rtc must be created for this.
https://hub.docker.com/r/alexxit/go2rtc

```
 image: alexxit/go2rtc
    network_mode: host # important for WebRTC, HomeKit, UDP cameras
    privileged: true # only for FFmpeg hardware transcoding
    restart: unless-stopped # autorestart on fail or config change from WebUI
    environment:
      - TZ=Europe/Berlin # timezone in logs
    volumes:
      - "~/go2rtc:/config" # folder for go2rtc.yaml file (edit from WebUI)
```

A volume must be set for the path /config and the network as host.

Then go2rtsp is accessible via

```
http://IP:1984
```

Then you can add a stream. The stream url can be found e.g. under
`onvif.0.IP_PORT.infos.streamUris.ProfileName.live_stream_tcp.uri`

<img src="addgo.png" height="300">

### Insert stream as iFrame

Add the `iFrame` widget in the Vis and use the stream link from go2rtsp as the source

`http://192.168.178.1:1984/stream.html?src=camera&mode=webrtc`

## Rtsp2Web Docker

An alternative is a [RTSPtoWeb](https://github.com/deepch/RTSPtoWeb) Docker. However, this is more complicated to set up.
A Docker must be created from ghcr.io/deepch/rtsptoweb:latest.

<details>

```
docker run --name rtsp-to-web -v /YOURPATHFORCONFIG:/config --network host ghcr.io/deepch/rtsptoweb:latest
```

A volume must be set for the path /config and the network must be set as host.

Then rtsptoweb can be reached via

```
http://IP:8083
```

Then you can add a stream. The stream url can be found e.g. under
`onvif.0.IP_PORT.infos.streamUris.ProfileName.live_stream_tcp.uri`

<img src="addstream.png" height="600">

### Then we need the Stream Id. To do this, stream edit and copy out the Id in the URL

`http://192.168.178.2:8083/pages/stream/edit/ddbdb583-9f80-4b61-bafa-613aa7a5daa5`

## Insert individual stream in the vis

Then select an HTML object in the vis. Then enter the rtsp2web server with stream id in the widget under HTML:

<img src="html.png" height="150">

## **If multiple streams are to be added, `webrtc-url` and `webrtc-video` in html and script must be replaced with a new id e.g. `webrtc-url2` and `webrtc-video2`**

```html
<input
  type="hidden"
  name="webrtc-url"
  id="webrtc-url"
  value="http://192.168.0.2:8083/stream/ddbdb583-9f80-4b61-bafa-613aa7a5daa5/channel/0/webrtc"
/>

<video id="webrtc-video" autoplay muted playsinline controls style="max-width: 100%; max-height: 100%;"></video>
```

Add this script in the widget under Scripts:

```javascript
setTimeout(function () {
  function startPlay(videoEl, url) {
    const webrtc = new RTCPeerConnection({
      iceServers: [
        {
          urls: ["stun:stun.l.google.com:19302"],
        },
      ],
      sdpSemantics: "unified-plan",
    });
    webrtc.ontrack = function (event) {
      console.log(event.streams.length + " track is delivered");
      videoEl.srcObject = event.streams[0];
      videoEl.play();
    };
    webrtc.addTransceiver("video", { direction: "sendrecv" });
    webrtc.onnegotiationneeded = async function handleNegotiationNeeded() {
      const offer = await webrtc.createOffer();

      await webrtc.setLocalDescription(offer);

      fetch(url, {
        method: "POST",
        body: new URLSearchParams({ data: btoa(webrtc.localDescription.sdp) }),
      })
        .then((response) => response.text())
        .then((data) => {
          try {
            webrtc.setRemoteDescription(new RTCSessionDescription({ type: "answer", sdp: atob(data) }));
          } catch (e) {
            console.warn(e);
          }
        });
    };

    const webrtcSendChannel = webrtc.createDataChannel("rtsptowebSendChannel");
    webrtcSendChannel.onopen = (event) => {
      console.log(`${webrtcSendChannel.label} has opened`);
      webrtcSendChannel.send("ping");
    };
    webrtcSendChannel.onclose = (_event) => {
      console.log(`${webrtcSendChannel.label} has closed`);
      startPlay(videoEl, url);
    };
    webrtcSendChannel.onmessage = (event) => console.log(event.data);
  }

  const videoEl = document.querySelector("#webrtc-video");
  const webrtcUrl = document.querySelector("#webrtc-url").value;

  startPlay(videoEl, webrtcUrl);
}, 1000);
```

<img src="widgetskript.png" height="200">

## All streams as iFrame

Alternatively, you could also insert the camera overview as an iframe:
Add the widget `iFrame` and enter the rtsp2web server as source:

`http://192.168.0.2:8083/pages/multiview/full?controls`

</details>

## FFMpeg support

If the camera does not have snapshot support, ffmpeg will create a snapshot from the rtsp stream.

## Include snapshot server in vis

The adapter offers a snapshot server without password. Activate the server in the instance settings and then you can get the current snapshot http://iobrokerIp:8095/CAMERAIP_PORT e.g. http://192.168.0.1:8095/192_168_0_1_80.

Insert an image widget in the vis and specify the url as source and select an update time

## Include snapshot in vis

If possible use the snapshotUri e.g.

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

### _Do not use the state as a stream, otherwise the disk load will be too high._

#### Update the state via onvif.0.IP_PORT.remote.snapshot

Assign a `String img src` element to the state onvif.0.IP_PORT.snapshot.

Or as an alternative if `String img src` does not work

Insert the state onvif.0.IP_PORT.snapshot as `HTML` element into the vis with the following content

```javascript
<img src="{onvif.0.IP_PORT.snapshot}" width="500px" />
```

Create new snapshot on event:

```javascript
on("onvif.0.192_168_178_100_80.events.RuleEngine/CellMotionDetector/Motion", (obj) => {
  if (obj.state.val === true) {
    setState("onvif.0.192_168_178_100_80.remote.snapshot", true, false);
  }
});
```

## Discussion (german)

<https://forum.iobroker.net/topic/63145/test-adapter-onvif-camera-v1-0-0>

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.4 (2024-05-27)

- update onvif lib to support newer TAPO cameras
- (mcm1957) Adapter requires nodejs >=18 now.

### 1.1.3 (2024-03-15)

- Allow non number PTZ presets

### 1.1.2 (2023-12-29)

- (TA2k) Catch callback error

### 1.1.1 (2023-10-18)

- (mcm1957) Standard iobroker release environment has been added.
- (mcm1957) Some dependencies have been updated.

### 1.1.0

- (TA2k) Bugfixes

### 1.0.5

- Improve event handling

### 1.0.4

- (TA2k) Minor bugfixes and readme update for livestream in vis

### 1.0.3

- (TA2k) Minor bugfixes

### 1.0.2

- (TA2k) Fixed a reonnect and empty event bug

### 1.0.1

- (TA2k) initial new release

## License

MIT License

Copyright (c) 2023-2024 TA2k <tombox2020@gmail.com>

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

```

```
