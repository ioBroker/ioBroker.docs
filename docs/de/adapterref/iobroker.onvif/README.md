---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.onvif/README.md
title: ioBroker.onvif
hash: 2k4Xao5mfl0FBgg5tIX2HIL+SO6SWLQkGKdqmPNSrnQ=
---
![Logo](../../../en/adapterref/iobroker.onvif/admin/onvif.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.onvif.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.onvif.svg)
![Anzahl der Installationen](https://iobroker.live/badges/onvif-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/onvif-stable.svg)
![NPM](https://nodei.co/npm/iobroker.onvif.png?downloads=true)

# IoBroker.onvif
**Tests:** ![Testen und Freigeben](https://github.com/iobroker-community-adapters/ioBroker.onvif/workflows/Test%20and%20Release/badge.svg)

## ONVIF-Adapter für ioBroker
**Adapter für ONVIF-Kameras**

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

[zur deutschen Dokumentation](README-de.md)

## Kameras hinzufügen
### Entdeckung:
Bei jedem Start des Adapters wird eine Erkennung mit dem in den Einstellungen eingetragenen Benutzernamen und Passwort durchgeführt und versucht, sich bei der Kamera anzumelden. Sofern die Kamera noch nicht unter Objekte hinzugefügt wurde.

Du kannst die Erkennung manuell in den Einstellungen durchführen. Wenn die Kameras unterschiedliche Anmeldeinformationen haben, musst du diese eingeben und eine Erkennung durchführen. Im Protokoll kannst du die Details des Vorgangs sehen.

Damit eine Kamera wieder erkannt wird, muss diese lediglich unter Objekte gelöscht werden.

### Manuelle Suche
Falls Discovery nicht funktioniert, kann manuell nach Kameras gesucht werden. Hierzu muss ein IP-Bereich und Ports eingetragen und manuell ausgeführt werden. Im Log sind Details zum Vorgang ersichtlich.

## Zustände
onvif.0.IP_PORT.events Ereignisse der Kamera wie z.B. Bewegungserkennung. Manchmal muss man das Ereignis auslösen, um es zu sehen.

onvif.0.IP_PORT.general Allgemeine Informationen zu den Kameras

onvif.0.IP_PORT.infos Informationen zur Kamera werden nur beim Adapterstart oder bei remote.refresh aktualisiert

Video- und Snapshot-URL:

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

onvif.0.IP_PORT.remote Steuerung der Kamera

onvif.0.IP_PORT.remote.refresh Aktualisierung der Infodaten

onvif.0.IP_PORT.remote.gotoHomePosition PTZ-Kamera auf Home-Position einstellen

onvif.0.IP_PORT.remote.gotoPreset PTZ-Kamera-Voreinstellungsnummer auswählen

onvif.0.IP_PORT.remote.snapshot Schnappschuss speichern in onvif.0.IP_PORT.snapshot

## Nachricht
Adapter empfängt Nachricht „Snapshot“ und gibt Bild zurück

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

## Bewegungsnachricht an Telegram
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
Wenn der Stream in Apple Homekit angezeigt werden soll, erstellen Sie bitte direkt in Yahka eine Kamera. Wenn das nicht funktioniert oder hksv benötigt wird, installieren Sie scrypted in einem Docker und fügen Sie die Kamera mit Onvif und Homekit-Plugin hinzu

## Go2rtsp Docker
Ein Stream wird im Normalfall per RTSP Stream bereitgestellt. Eine Konvertierung per Motion Eye ist sehr ressourcenintensiv und hat eine Verzögerung. Eine Konvertierung nach WebRTC ist schneller und ressourcensparender. Meine Empfehlung ist ein [go2rtsp](https://github.com/AlexxIT/go2rtc). Hierzu muss ein Docker von alexxit/go2rtc erstellt werden.
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

Als Pfad /config muss ein Volume und als Host das Netzwerk angegeben werden.

Dann ist go2rtsp erreichbar über

```
http://IP:1984
```

Anschließend kannst du einen Stream hinzufügen. Die Stream-URL findest du z.B. unter `onvif.0.IP_PORT.infos.streamUris.ProfileName.live_stream_tcp.uri`

<img src="addgo.png" height="300">

### Stream als iFrame einfügen
Füge das Widget `iFrame` im Vis hinzu und verwende den Stream-Link von go2rtsp als Quelle

`http://192.168.178.1:1984/stream.html?src=camera&mode=webrtc`

## Rtsp2Web Docker
Eine Alternative ist ein [RTSPtoWeb](https://github.com/deepch/RTSPtoWeb) Docker. Dieser ist allerdings aufwändiger einzurichten.

Ein Docker muss von ghcr.io/deepch/rtsptoweb:latest erstellt werden.

<details>

```
docker run --name rtsp-to-web -v /YOURPATHFORCONFIG:/config --network host ghcr.io/deepch/rtsptoweb:latest
```

Für den Pfad /config muss ein Volume angegeben werden und als Host muss das Netzwerk eingetragen sein.

Dann erreichen Sie rtsptoweb über

```
http://IP:8083
```

Anschließend kannst du einen Stream hinzufügen. Die Stream-URL findest du z.B. unter `onvif.0.IP_PORT.infos.streamUris.ProfileName.live_stream_tcp.uri`

<img src="addstream.png" height="600">

### Dann brauchen wir noch die Stream-ID. Dazu den Stream bearbeiten und die ID in der URL rauskopieren
`http://192.168.178.2:8083/pages/stream/edit/ddbdb583-9f80-4b61-bafa-613aa7a5daa5`

## Einzelnen Stream in das Vis einfügen
Anschließend wählt man im vis ein HTML Objekt aus. Anschließend trägt man im Widget unter HTML den rtsp2web Server mit Stream ID ein:

<img src="html.png" height="150">

## **Wenn mehrere Streams hinzugefügt werden sollen, müssen `webrtc-url` und `webrtc-video` in HTML und Skript durch eine neue ID ersetzt werden, z. B. `webrtc-url2` und `webrtc-video2`**
```html
<input
  type="hidden"
  name="webrtc-url"
  id="webrtc-url"
  value="http://192.168.0.2:8083/stream/ddbdb583-9f80-4b61-bafa-613aa7a5daa5/channel/0/webrtc"
/>

<video id="webrtc-video" autoplay muted playsinline controls style="max-width: 100%; max-height: 100%;"></video>
```

Fügen Sie dieses Skript im Widget unter „Skripte“ hinzu:

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
Alternativ könntest du die Kameraübersicht auch als iframe einfügen: Füge das Widget `iFrame` ein und trage als Quelle den rtsp2web-Server ein:

`http://192.168.0.2:8083/pages/multiview/full?controls`

</details>

## FFMpeg-Unterstützung
Wenn die Kamera keine Snapshot-Unterstützung hat, erstellt ffmpeg einen Snapshot aus dem RTSP-Stream.

## Snapshot-Server in Vis einbinden
Der Adapter bietet einen Snapshot-Server ohne Passwort. Aktiviere den Server in den Instanzeinstellungen und dann kannst du den aktuellen Snapshot abrufen http://iobrokerIp:8095/CAMERAIP_PORT z.B. http://192.168.0.1:8095/192_168_0_1_80.

Fügen Sie ein Bild-Widget in das Vis ein, geben Sie die URL als Quelle an und wählen Sie eine Aktualisierungszeit

## Schnappschuss in Vis einbinden
Verwenden Sie nach Möglichkeit z. B. den SnapshotUri.

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

### _Verwenden Sie den Status nicht als Stream, da sonst die Datenträgerlast zu hoch wird._
#### Aktualisieren Sie den Status über onvif.0.IP_PORT.remote.snapshot
Weisen Sie dem Status onvif.0.IP_PORT.snapshot ein Element `String img src` zu.

Oder als Alternative, wenn `String img src` nicht funktioniert

Fügen Sie den Status onvif.0.IP_PORT.snapshot als `HTML`-Element in das Vis mit folgendem Inhalt ein

```javascript
<img src="{onvif.0.IP_PORT.snapshot}" width="500px" />
```

Neuen Snapshot zum Ereignis erstellen:

```javascript
on("onvif.0.192_168_178_100_80.events.RuleEngine/CellMotionDetector/Motion", (obj) => {
  if (obj.state.val === true) {
    setState("onvif.0.192_168_178_100_80.remote.snapshot", true, false);
  }
});
```

## Diskussion
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