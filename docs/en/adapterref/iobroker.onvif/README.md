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

## Kameras hinzufügen

### Discovery:

Bei jedem Adapterstart wird mit dem in der Einstellungen eingetragen Benutzername und Passwort eine Discovery durchgeführt und versuch sich in die Kamera einzuloggen. Falls die Kamera noch nicht unter Objekte hinzugefügt wurde.

In den Einstellungen kann man die Discovery manuell ausführen. Falls die Kameras unterschiedliche Zugangsdaten haben müssen die jeweils eingegeben werden und eine discovery durchgeführt werden. Im Log sieht man Details zu dem Prozess.

Damit eine Kamera neu erkannt wird muss sie einfach unter Objekte gelöscht werden.

### Manuelle Suche

Es können Kameras manuell gesucht werden, falls Discovery nicht funktioniert. Dazu muss eine IP Range und Ports eingegeben und manuell ausgeführt werden. Im Log sieht man Details zu dem Prozess.

## Datenpunkte

onvif.0.IP_PORT.events Events der Kamera wie z.b. Bewegungserkennung. Manchmal muss ein Event ausgelöst werden damit er angezeigt wird.

onvif.0.IP_PORT.general Generelle Information über die Kameras

onvif.0.IP_PORT.infos Informationen über die Kamera werden nur bei Adapterstart aktualisiert oder bei remote.refresh

Video und Snapshot URL:

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

onvif.0.IP_PORT.remote Steuerung der Kamera

onvif.0.IP_PORT.remote.refresh Aktualisierung der Infodaten

onvif.0.IP_PORT.remote.gotoHomePosition PTZ Kamera in die HomePosition setzen

onvif.0.IP_PORT.remote.gotoPreset PTZ Kamera Preset Nummer auswählen

onvif.0.IP_PORT.remote.snapshot Speichert ein snapshot unter onvif.0.IP_PORT.snapshot

## Message

Adapter nimmt Message "snapshot" entgegen und gibt ein Bild zurück

```javascript
sendTo("onvif.0", "snapshot", "192_168_178_100_80", (result) => {
  if (result) {
    sendTo("telegram.0", {
      text: result,
      type: "photo",
      caption: "Kamera 2",
    });
  }
});
```

## Bewegungsmeldung zu Telegram

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

# Stream in vis einbinden

Wenn Stream in Apple Homekit angezeigt werden soll dann bitte direkt in yahka eine camera erzeugen. Wenn das nicht funktioniert oder hksv benötigt wird, dann scrypted in einem docker installieren und die Kamera mit onvif und homekit plugin hinzufügen

## Rtsp2Web Docker

Ein Stream wird normalerweise via rtsp stream bereitgestellt. Eine Umwandlung via motion eye ist sehr resourcen aufwändig und hat ein Verzögerng. Ein Umwandlung in webrtc ist schneller und resourcenschonender. Meine Empfehlung ist ein [RTSPtoWeb](https://github.com/deepch/RTSPtoWeb). Dazu muss ein Docker von ghcr.io/deepch/rtsptoweb:latest erstellt werden.

```
docker run --name rtsp-to-web -v /YOURPATHFORCONFIG:/config --network host ghcr.io/deepch/rtsptoweb:latest
```

Es muss ein Volume für den Pfad /config und das network als host eingestellt werden.

Dann ist rtsptoweb erreichbar über

```
http://IP:8083
```

Dann kann man ein Stream hinzufügen. Die Stream url findet man z.B. unter
`onvif.0.IP_PORT.infos.streamUris.ProfileName.live_stream_tcp.uri`

<img src="addstream.png" height="600">

### Danach benötigen wir die Stream Id. Dafür Stream Edit und in der URL die Id rauskopieren

`http://192.168.178.2:8083/pages/stream/edit/ddbdb583-9f80-4b61-bafa-613aa7a5daa5`

## Einzelnen Stream in der Vis einfügen

Dann in der vis ein HTML Objekt auswählen. Dann im Widget unter HTML den rtsp2web server mit stream id eintragen:

<img src="html.png" height="150">

## **Wenn mehrere Stream hinzugefügt werden soll muss `webrtc-url` und `webrtc-video` in html und skript mit einer neuen id ersetzt werden z.B. `webrtc-url2` und `webrtc-video2`**

```html
<input
  type="hidden"
  name="webrtc-url"
  id="webrtc-url"
  value="http://192.168.0.2:8083/stream/ddbdb583-9f80-4b61-bafa-613aa7a5daa5/channel/0/webrtc"
/>

<video id="webrtc-video" autoplay muted playsinline controls style="max-width: 100%; max-height: 100%;"></video>
```

In dem Widget unter Skripte dieses Skript hinzufügen:

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

## Alle Streams als iFrame

Alternativ könnte man auch den Kamera Overview als Iframe einfügen:
Das Widget `iFrame` hinzufügen und als Quelle den rtsp2web Server eintragen:

`http://192.168.0.2:8083/pages/multiview/full?controls`

## FFMpeg Unterstützung

Wenn die Kamera keine Snapshot Unterstützng hat wird mit ffmpeg ein snapshot aus dem rtsp stream erzeugt.

## Snapshot Server in vis einbinden

Der Adapter bietet ein Snapshot Server ohne Passwort an. Dazu Server aktivieren in den Instanzeinstellungen und dann kann der aktuelle Snapshot http://iobrokerIp:8095/CAMERAIP_PORT z.B. http://192.168.0.1:8095/192_168_0_1_80 abgerufen werden.

In der Vis ein Image Widget einfügen und die Url als Quelle angeben und eine Updatezeit auswählen

## Snapshot in vis einbinden

Wenn möglich die snapshotUri verwenden z.B.
onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

### _Den Datenpunkt nicht als Stream verwenden, da sonst die Festplatte zu hohe Last hat._

#### Den Datenpunkt aktualisieren via onvif.0.IP_PORT.remote.snapshot

Den Datenpunkt onvif.0.IP_PORT.snapshot ein `String img src` element zuordnen

Oder als Alternative falls `String img src` nicht funktioniert

Den Datenpunkt onvif.0.IP_PORT.snapshot als `HTML` element in die vis einfügen mit folgendem Inhalt

```javascript
<img src="{onvif.0.IP_PORT.snapshot}" width="500px" />
```

Neuen Snapshot erzeugen bei Event:

```javascript
on("onvif.0.192_168_178_100_80.events.RuleEngine/CellMotionDetector/Motion", (obj) => {
  if (obj.state.val === true) {
    setState("onvif.0.192_168_178_100_80.remote.snapshot", true, false);
  }
});
```

# English

## Add cameras

### Discovery:

Each time the adapter is started, a discovery is performed with the user name and password entered in the settings and an attempt is made to log in to the camera. If the camera has not yet been added under Objects.

You can perform the discovery manually in the settings. If the cameras have different credentials, you have to enter them and perform a discovery. In the log you can see the details of the process.

In order for a camera to be detected again, it must simply be deleted under Objects.

### Manual search

Cameras can be searched for manually if Discovery does not work. To do this, an IP range and ports must be entered and executed manually. In the log you can see details about the process.

## Data points

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

# Include stream in vis

If stream should be displayed in Apple Homekit then please create a camera directly in yahka. If that doesn't work or hksv is needed then install scrypted in a docker and add the camera with onvif and homekit plugin

## Rtsp2Web Docker

A stream is normally provided via rtsp stream. This needs to be converted for vis. My recommendation is a [RTSPtoWeb](https://github.com/deepch/RTSPtoWeb). This requires creating a docker from ghcr.io/deepch/rtsptoweb:latest.

```

docker run --name rtsp-to-web -v /YOURPATHFORCONFIG:/config --network host ghcr.io/deepch/rtsptoweb:latest

```

You have to set a volume for the path /config and the network as host.

Then rtsptoweb is reachable via

```

http://IP:8083

```

Then you can add a stream. The stream url can be found e.g. under

`onvif.0.IP_PORT.infos.streamUris.ProfileName.live_stream_tcp.uri`

<img src="addstream.png" height="600">

### After that we need the stream id. For this we need Stream Edit and in the URL we copy out the Id

`http://192.168.178.2:8083/pages/stream/edit/ddbdb583-9f80-4b61-bafa-613aa7a5daa5`

## Paste the single stream in the vis

Then select an HTML object in the vis. Then in the widget under HTML enter the rtsp2web server with stream id:

<img src="html.png" height="150">

## **If more than one stream should be added `webrtc-url` and `webrtc-video` must be replaced in html and script with a new id e.g. `webrtc-url2` and `webrtc-video2`.**

```html
<input type="hidden name="webrtc-url" id="webrtc-url"
value="http://192.168.0.2:8083/stream/ddbdb583-9f80-4b61-bafa-613aa7a5daa5/channel/0/webrtc" />

<video id="webrtc-video" autoplay muted playsinline controls style="max-width: 100%; max-height: 100%;"></video>
```

In the widget under scripts add this script:

```javascript
setTimeout(function () {

  function startPlay(videoEl, url) {

    const webrtc = new RTCPeerConnection({

      iceServers: [

        {

          urls: ["stun:stun.l.google.com:19302"]

        },

      ],

      { "sdpSemantics": [ "unified-plan" ], [ "unified-plan"], [ "unified-plan"],

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

Alternatively, you could also add the Camera Overview as an iframe:

Add the widget `iFrame` and enter the rtsp2web server as source:

`http://192.168.0.2:8083/pages/multiview/full?controls`

## FFMpeg support

If the camera does not have snapshot support, ffmpeg will create a snapshot from the rtsp stream.

## Include snapshot server in vis

The adapter offers a snapshot server without password. Activate the server in the instance settings and then you can get the current snapshot http://iobrokerIp:8095/CAMERAIP_PORT e.g. http://192.168.0.1:8095/192_168_0_1_80.

Insert an image widget in the vis and specify the url as source and select an update time

## Include snapshot in vis

If possible use the snapshotUri e.g.

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

### _Do not use the datapoint as a stream, otherwise the disk load will be too high._

#### Update the datapoint via onvif.0.IP_PORT.remote.snapshot

Assign a `String img src` element to the datapoint onvif.0.IP_PORT.snapshot.

Or as an alternative if `String img src` does not work

Insert the datapoint onvif.0.IP_PORT.snapshot as `HTML` element into the vis with the following content

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

## Discussions / Diskussion und Fragen

<https://forum.iobroker.net/topic/63145/test-adapter-onvif-camera-v1-0-0>

## Changelog

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

Copyright (c) 2023 TA2k <tombox2020@gmail.com>

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
