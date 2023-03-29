---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.onvif/README.md
title: ioBroker.onvif
hash: V9UpEozWodsw93FDw5msQDnX6MKPUdm5xP4jIMbUMuM=
---
![Logo](../../../en/adapterref/iobroker.onvif/admin/onvif.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.onvif.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.onvif.svg)
![Anzahl der Installationen](https://iobroker.live/badges/onvif-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/onvif-stable.svg)
![NPM](https://nodei.co/npm/iobroker.onvif.png?downloads=true)

# IoBroker.onvif
**Tests:** ![Testen und freigeben](https://github.com/iobroker-community-adapters/ioBroker.onvif/workflows/Test%20and%20Release/badge.svg)

## ONVIF-Adapter für ioBroker
**Adapter für ONVIF-Kameras**

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

## Kameras hinzufügen
### Entdeckung:
Bei jedem Adapterstart WIRD mit dem in der Einstellungen eingetragenen Benutzernamen und Passwort eine Discovery durchgeführt und versucht sich in die Kamera einzuloggen. Falls die Kamera noch nicht unter Objekte hinzugefügt wurde.

In den Einstellungen kann man die Discovery manuell ausführen. Falls die Kameras unterschiedliche Zugangsdaten haben & sterben jeweils eingegeben Werden und Eine Entdeckung durchgeführt Werden. Im Log sieht man Details zu dem Prozess.

Damit eine Kamera neu erkannt wird, müssen sie einfach unter Objekte gelöscht werden.

### Manuelle Suche
Es can Kameras manuell gesucht werden, falls Discovery nicht funktioniert. Dazu müssen eine IP-Range und Ports eingegeben und manuell ausgeführt werden. Im Log sieht man Details zu dem Prozess.

## Datenpunkte
onvif.0.IP_PORT.events Events der Kamera wie z.b. Bewegungserkennung. Manchmal muss ein Ereignis ausgelöst werden, damit er angezeigt wird.

onvif.0.IP_PORT.general Allgemeine Informationen über die Kameras

onvif.0.IP_PORT.infos Informationen über die Kamera werden nur bei Adapterstart aktualisiert oder bei remote.refresh

Video- und Snapshot-URL:

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

onvif.0.IP_PORT.remote Steuerung der Kamera

onvif.0.IP_PORT.remote.refresh Aktualisierung der Infodaten

onvif.0.IP_PORT.remote.gotoHomePosition PTZ Kamera in die HomePosition setzen

onvif.0.IP_PORT.remote.gotoPreset PTZ Kamera Preset Nummer auswählen

onvif.0.IP_PORT.remote.snapshot Speichert einen Snapshot unter onvif.0.IP_PORT.snapshot

## Nachricht
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
Wenn Stream in Apple Homekit angezeigt wird, soll dann bitte direkt in yahka eine Kamera erzeugen. Wenn das nicht funktioniert oder hksv benötigt WIRD, dann scrypted in einem Docker installieren und die Kamera mit onvif und homekit plugin hinzufügen

## Rtsp2Web-Docker
Ein Stream wird normalerweise per rtsp-Stream bereitgestellt. Eine Umwandlung via Bewegungsauge ist sehr aufwändig und hat ein Verzögerng. Eine Umwandlung in webrtc ist schneller und ressourcenschonender. Meine Empfehlung ist ein [RTSPtoWeb](https://github.com/deepch/RTSPtoWeb). Dazu muss ein Docker von ghcr.io/deepch/rtsptoweb:latest erstellt werden.

```
docker run --name rtsp-to-web -v /YOURPATHFORCONFIG:/config --network host ghcr.io/deepch/rtsptoweb:latest
```

Es muss ein Volume für den Pfad /config und das Netzwerk als Host eingestellt werden.

Dann ist rtsptoweb erreichbar über

```
http://IP:8083
```

Dann kann man einen Stream hinzufügen. Die Stream-URL findet man z.B. unter `onvif.0.IP_PORT.infos.streamUris.ProfileName.live_stream_tcp.uri`

<img src="addstream.png" height="600">

### Danach benötigen wir die Stream-ID. Dafür Stream Edit und in der URL die Id rauskopieren
`http://192.168.178.2:8083/pages/stream/edit/ddbdb583-9f80-4b61-bafa-613aa7a5daa5`

## Einzelnen Stream in der Vis einfügen
Dann in der vis ein HTML-Objekt auswählen. Dann im Widget unter HTML den rtsp2web server mit stream id eintragen:

<img src="html.png" height="150">

## **Wenn mehrere Streams hinzugefügt werden, müssen `webrtc-url` und `webrtc-video` in html und skript mit einer neuen id ersetzt werden z.B. `webrtc-url2` und `webrtc-video2`**
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
Alternativ könnte man auch den Kamera Overview als Iframe einfügen: Das Widget `iFrame` hinzufügen und als Quelle den rtsp2web Server eintragen:

`http://192.168.0.2:8083/pages/multiview/full?controls`

## FFMpeg-Unterstützung
Wenn die Kamera keine Snapshot-Unterstützung hat, wird mit ffmpeg ein Snapshot aus dem rtsp-Stream erzeugt.

##Snapshot-Server in vis einbinden
Der Adapter bietet einen Snapshot Server ohne Passwort an. Dazu Server aktivieren in den Instanzeinstellungen und dann kann der aktuelle Snapshot http://iobrokerIp:8095/CAMERAIP_PORT z.B. http://192.168.0.1:8095/192_168_0_1_80 abgerufen werden.

In der Vis ein Image Widget einfügen und die URL als Quelle angeben und eine Updatezeit auswählen

## Schnappschuss in vis einbinden
Wenn möglich sterben snapshotUri verwenden z.B.
onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

### _Den Datenpunkt nicht als Stream verwenden, da sonst die Festplatte zu hoher Last hat._
#### Den Datenpunkt aktualisieren via onvif.0.IP_PORT.remote.snapshot
Den Datenpunkt onvif.0.IP_PORT.snapshot ein `String img src` Element zuordnen

Oder als Alternative fällt `String img src` nicht funktioniert

Den Datenpunkt onvif.0.IP_PORT.snapshot als `HTML` Element in die vis einfügen mit folgendem Inhalt

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

# Englisch
## Kameras hinzufügen
### Entdeckung:
Bei jedem Start des Adapters wird mit dem in den Einstellungen eingetragenen Benutzernamen und Passwort eine Erkennung durchgeführt und versucht, sich an der Kamera anzumelden. Falls die Kamera noch nicht unter Objekte hinzugefügt wurde.

Sie können die Erkennung manuell in den Einstellungen durchführen. Wenn die Kameras unterschiedliche Anmeldeinformationen haben, müssen Sie diese eingeben und eine Erkennung durchführen. Im Protokoll können Sie die Details des Vorgangs einsehen.

Damit eine Kamera wieder erkannt wird, muss sie einfach unter Objekte gelöscht werden.

### Manuelle Suche
Kameras können manuell gesucht werden, wenn Discovery nicht funktioniert. Dazu müssen ein IP-Bereich und Ports eingetragen und manuell ausgeführt werden. Im Protokoll können Sie Details zum Vorgang sehen.

## Datenpunkte
onvif.0.IP_PORT.events Ereignisse der Kamera wie z.B. Bewegungserkennung. Manchmal müssen Sie das Ereignis auslösen, um es zu sehen.

onvif.0.IP_PORT.general Allgemeine Informationen zu den Kameras

onvif.0.IP_PORT.infos Informationen über die Kamera werden nur beim Adapterstart oder bei remote.refresh aktualisiert

Video- und Snapshot-URL:

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

onvif.0.IP_PORT.remote Steuerung der Kamera

onvif.0.IP_PORT.remote.refresh Aktualisierung der Infodaten

onvif.0.IP_PORT.remote.gotoHomePosition Stellt die PTZ-Kamera auf die Ausgangsposition ein

onvif.0.IP_PORT.remote.gotoPreset Wählen Sie die Voreinstellungsnummer der PTZ-Kamera aus

onvif.0.IP_PORT.remote.snapshot Snapshot in onvif.0.IP_PORT.snapshot speichern

## Nachricht
Der Adapter empfängt die Nachricht "Snapshot" und gibt ein Bild zurück

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

## Bewegungsnachricht an Telegramm
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

# Stream in Vis einbeziehen
Wenn der Stream in Apple Homekit angezeigt werden soll, erstellen Sie bitte eine Kamera direkt in yahka. Wenn das nicht funktioniert oder hksv benötigt wird, installieren Sie scrypted in einem Docker und fügen Sie die Kamera mit onvif und dem Homekit-Plugin hinzu

## Rtsp2Web-Docker
Ein Stream wird normalerweise über rtsp stream bereitgestellt. Dies muss für vis konvertiert werden. Meine Empfehlung ist ein [RTSPtoWeb](https://github.com/deepch/RTSPtoWeb). Dazu muss ein Docker von ghcr.io/deepch/rtsptoweb:latest erstellt werden.

```

docker run --name rtsp-to-web -v /YOURPATHFORCONFIG:/config --network host ghcr.io/deepch/rtsptoweb:latest

```

Sie müssen ein Volume für den Pfad /config und das Netzwerk als Host festlegen.

Dann ist rtsptoweb über erreichbar

```

http://IP:8083

```

Dann können Sie einen Stream hinzufügen. Die Stream-URL finden Sie z. unter

`onvif.0.IP_PORT.infos.streamUris.ProfileName.live_stream_tcp.uri`

<img src="addstream.png" height="600">

### Danach brauchen wir die Stream-ID. Dazu brauchen wir Stream Edit und in der URL kopieren wir die Id raus
`http://192.168.178.2:8083/pages/stream/edit/ddbdb583-9f80-4b61-bafa-613aa7a5daa5`

## Fügen Sie den einzelnen Stream in das Vis ein
Wählen Sie dann ein HTML-Objekt im Vis aus. Geben Sie dann im Widget unter HTML den rtsp2web-Server mit Stream-ID ein:

<img src="html.png" height="150">

## **Wenn mehr als ein Stream hinzugefügt werden soll, müssen `webrtc-url` und `webrtc-video` in HTML und Skript durch eine neue ID ersetzt werden, z. `webrtc-url2` und `webrtc-video2`.**
```html
<input type="hidden name="webrtc-url" id="webrtc-url"
value="http://192.168.0.2:8083/stream/ddbdb583-9f80-4b61-bafa-613aa7a5daa5/channel/0/webrtc" />

<video id="webrtc-video" autoplay muted playsinline controls style="max-width: 100%; max-height: 100%;"></video>
```

Fügen Sie im Widget unter Skripte dieses Skript hinzu:

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

## Alle Streams als iFrame
Alternativ können Sie die Kameraübersicht auch als iFrame hinzufügen:

Fügen Sie das Widget `iFrame` hinzu und tragen Sie als Quelle den rtsp2web-Server ein:

`http://192.168.0.2:8083/pages/multiview/full?controls`

## FFMpeg-Unterstützung
Wenn die Kamera keine Snapshot-Unterstützung hat, erstellt ffmpeg einen Snapshot aus dem rtsp-Stream.

## Snapshot-Server in vis aufnehmen
Der Adapter bietet einen Snapshot-Server ohne Passwort. Aktivieren Sie den Server in den Instanzeinstellungen und Sie erhalten dann den aktuellen Snapshot http://iobrokerIp:8095/CAMERAIP_PORT z.B. http://192.168.0.1:8095/192_168_0_1_80.

Fügen Sie ein Bild-Widget in das Vis ein und geben Sie die URL als Quelle an und wählen Sie eine Aktualisierungszeit aus

## Schnappschuss in vis einfügen
Verwenden Sie nach Möglichkeit den snapshotUri, z.

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

### _Datenpunkt nicht als Stream verwenden, sonst wird die Plattenlast zu hoch._
#### Aktualisieren Sie den Datenpunkt über onvif.0.IP_PORT.remote.snapshot
Weisen Sie dem Datenpunkt onvif.0.IP_PORT.snapshot ein Element `String img src` zu.

Oder alternativ, wenn `String img src` nicht funktioniert

Fügen Sie den Datenpunkt onvif.0.IP_PORT.snapshot als `HTML`-Element in das Vis mit folgendem Inhalt ein

```javascript
<img src="{onvif.0.IP_PORT.snapshot}" width="500px" />
```

Neuen Schnappschuss bei Ereignis erstellen:

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