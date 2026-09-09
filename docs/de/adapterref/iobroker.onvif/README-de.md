---
chapters: {"pages":{"en/adapterref/iobroker.onvif/README.md":{"title":{"en":"ioBroker.onvif"},"content":"en/adapterref/iobroker.onvif/README.md"},"en/adapterref/iobroker.onvif/README-de.md":{"title":{"en":"ioBroker.onvif"},"content":"en/adapterref/iobroker.onvif/README-de.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.onvif/README-de.md
title: ioBroker.onvif
hash: v1KN29h+PcNGNw+3xNzN1u1LugBoq+wLrq4xiCSSCYM=
---
![Logo](../../../en/adapterref/iobroker.onvif/admin/onvif.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.onvif.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.onvif.svg)
![Anzahl der Installationen](https://iobroker.live/badges/onvif-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/onvif-stable.svg)
![NPM](https://nodei.co/npm/iobroker.onvif.png?downloads=true)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.onvif/workflows/Test%20and%20Release/badge.svg)

# ioBroker.onvif

## ONVIF-Adapter für ioBroker

**Adapter für ONVIF-Kameras**

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Kameras hinzufügen

### Entdeckung:

Bei jedem Adapterstart wird mit dem in den Einstellungen eingetragenen Benutzernamen und Passwort eine Discovery durchgeführt und versucht, sich in die Kamera einzuloggen. Falls die Kamera noch nicht unter Objekten hinzugefügt wurde.

In den Einstellungen kann man den Discovery manuell ausführen. Falls die Kameras unterschiedliche Zugangsdaten haben, müssen die jeweils eingegeben und eine Entdeckung durchgeführt werden. Im Log sieht man Details zu dem Prozess.

Damit eine Kamera neu erkannt wird, muss sie einfach unter Objekten gelöscht werden.

### Manuelle Suche

Es können Kameras manuell gesucht werden, falls Discovery nicht funktioniert. Dazu müssen ein IP-Bereich und Ports eingegeben und manuell ausgeführt werden. Im Log sieht man Details zu dem Prozess.

## Datenpunkte

onvif.0.IP\_PORT.events Events der Kamera wie zb Bewegungserkennung. Manchmal muss ein Ereignis ausgelöst werden, damit es angezeigt wird.

onvif.0.IP\_PORT.general Allgemeine Informationen über die Kameras

onvif.0.IP\_PORT.infos Informationen über die Kamera werden nur bei Adapterstart aktualisiert oder bei remote.refresh

Video- und Snapshot-URL:

onvif.0.IP\_PORT.infos.streamUris.MediaProfile\_Channel1\_MainStream.snapshotUrl.uri

onvif.0.IP\_PORT.remote Steuerung der Kamera

onvif.0.IP\_PORT.remote.refresh Aktualisierung der Infodaten

onvif.0.IP\_PORT.remote.gotoHomePosition PTZ Kamera in die HomePosition setzen

onvif.0.IP\_PORT.remote.gotoPreset PTZ Kamera Preset Nummer auswählen

onvif.0.IP\_PORT.remote.snapshot Speichert einen Snapshot unter onvif.0.IP\_PORT.snapshot

## Nachricht

Der Adapter nimmt die Nachricht „snapshot“ entgegen und gibt ein Bild zurück

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

Wenn Stream im Apple Homekit angezeigt wird, soll dann bitte direkt in yahka eine Kamera erzeugt werden. Wenn das nicht funktioniert oder hksv benötigt wird, dann scrypted in einem Docker installieren und die Kamera mit onvif und Homekit Plugin hinzufügen

## go2rtsp Docker

Ein Stream wird normalerweise per RTSP-Stream bereitgestellt. Eine Umwandlung via Motion Eye ist sehr ressourcenaufwändig und hat eine Verzögerung. Eine Umwandlung in webrtc ist schneller und ressourcenschonender. Meine Empfehlung ist ein [go2rtsp](https://github.com/AlexxIT/go2rtc) . Dazu muss ein Docker von alexxit/go2rtc erstellt werden. <https://hub.docker.com/r/alexxit/go2rtc>

Es gibt auch eine Version mit Hardware-Unterstützung: <https://github.com/AlexxIT/go2rtc/wiki/Hardware-acceleration>

Oder go2rtc lokal zu installieren: <https://forum.iobroker.net/post/1031526>

```
 image: alexxit/go2rtc
    network_mode: host       # important for WebRTC, HomeKit, UDP cameras
    privileged: true         # only for FFmpeg hardware transcoding
    restart: unless-stopped  # autorestart on fail or config change from WebUI
    environment:
      - TZ=Europe/Berlin  # timezone in logs
    volumes:
      - "~/go2rtc:/config"   # folder for go2rtc.yaml file (edit from WebUI)
```

Es muss ein Volume für den Pfad /config und das Netzwerk als Host eingestellt werden.

Dann ist go2rtsp erreichbar über

```
http://IP:1984
```

Dann kann man einen Stream hinzufügen. Die Stream-URL findet man zB unter`onvif.0.IP_PORT.infos.streamUris.ProfileName.live_stream_tcp.uri`

<img src="addgo.png" height="300">

### Stream als iFrame einfügen

Das Widget`iFrame` in der Vis hinzufügen und als Quelle den Stream-Link von go2rtsp verwenden

`http://192.168.178.1:1984/stream.html?src=camera&mode=webrtc`

Unter Links kann noch die Art des Players ausgewählt werden (Mikrofon)

## Rtsp2Web Docker

Eine Alternative ist ein [RTSPtoWeb](https://github.com/deepch/RTSPtoWeb) Docker. Dies ist aber von der Richtun komplizierter. Dazu muss ein Docker von ghcr.io/deepch/rtsptoweb:latest erstellt werden.

<details>

```
docker run --name rtsp-to-web -v /YOURPATHFORCONFIG:/config --network host ghcr.io/deepch/rtsptoweb:latest
```

Es muss ein Volume für den Pfad /config und das Netzwerk als Host eingestellt werden.

Dann ist rtsptoweb erreichbar über

```
http://IP:8083
```

Dann kann man einen Stream hinzufügen. Die Stream-URL findet man zB unter`onvif.0.IP_PORT.infos.streamUris.ProfileName.live_stream_tcp.uri`

<img src="addstream.png" height="600">

### Danach benötigen wir die Stream-ID. Dafür Stream Edit und in der URL die Id rauskopieren

`http://192.168.178.2:8083/pages/stream/edit/ddbdb583-9f80-4b61-bafa-613aa7a5daa5`

## Einzelnen Stream in das Vis einfügen

Wählen Sie dann in der Ansicht ein HTML-Objekt aus. Dann im Widget unter HTML den rtsp2web server mit stream id eintragen:

<img src="html.png" height="150">

## **Wenn mehrere Streams hinzugefügt werden müssen`webrtc-url` und`webrtc-video` in html und skript durch eine neue id ersetzt werden zB`webrtc-url2` und`webrtc-video2`**

```html
<input
  type="hidden"
  name="webrtc-url"
  id="webrtc-url"
  value="http://192.168.0.2:8083/stream/ddbdb583-9f80-4b61-bafa-613aa7a5daa5/channel/0/webrtc"
/>

<video id="webrtc-video" autoplay muted playsinline controls style="max-width: 100%; max-height: 100%;"></video>
```

In dem Widget unter Skripte dieses Skripts hinzufügen:

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

Alternativ könnte man auch den Kamera Overview als Iframe einfügen: Das Widget`iFrame` hinzufügen und als Quelle den rtsp2web Server eintragen:

`http://192.168.0.2:8083/pages/multiview/full?controls`

</details>

## FFMpeg Unterstützung

Wenn die Kamera keinen Snapshot unterstützt, wird mit ffmpeg ein Snapshot aus dem RTSP-Stream erzeugt.

## Snapshot-Server in vis einbinden

Der Adapter bietet einen Snapshot Server ohne Passwort an. Dazu Server aktivieren in den Instanzeinstellungen und dann kann der aktuelle Snapshot <http://iobrokerIp:8095/CAMERAIP_PORT> zB <http://192.168.0.1:8095/192_168_0_1_80> abgerufen werden.

In der Vis ein Image Widget einfügen und die URL als Quelle angeben und eine Updatezeit auswählen

## Snapshot in vis einbinden

Wenn möglich, verwenden Sie die snapshotUri zB onvif.0.IP\_PORT.infos.streamUris.MediaProfile\_Channel1\_MainStream.snapshotUrl.uri

### _Den Datenpunkt nicht als Stream verwenden, da sonst die Festplatte zu hoch ist._

#### Den Datenpunkt über onvif.0.IP\_PORT.remote.snapshot aktualisieren

Der Datenpunkt onvif.0.IP\_PORT.snapshot ein`String img src` element zu ordnen

Oder als Alternative fällt`String img src` funktioniert nicht

Den Datenpunkt onvif.0.IP\_PORT.snapshot auch`HTML` element in die vis einfügen mit folgendem Inhalt

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

## Diskussion und Fragen

<https://forum.iobroker.net/topic/63145/test-adapter-onvif-camera-v1-0-0>

## Changelog

Das Changelog findet sich in der englischen README.md.

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