---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.cameras/README.md
title: ioBroker.cameras
hash: NPJWIxTiBGQ6PHXsp4RvPCmVXZFyLGCAGL6gB0i0zwo=
---
![Logo](../../../en/adapterref/iobroker.cameras/admin/cameras.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.cameras.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.cameras.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/ioBroker/iobroker.cameras.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/ioBroker/ioBroker.cameras/badge.svg)
![NPM](https://nodei.co/npm/iobroker.cameras.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/ioBroker/ioBroker.cameras/master.svg)

# IoBroker.cameras
## IP-Kameras-Adapter für ioBroker
Sie können Ihre Web-/IP-Kameras in VIS und andere Visualisierungen integrieren.
Wenn Sie eine Kamera mit dem Namen `cam1` konfigurieren, ist sie auf dem Webserver unter `http(s)://iobroker-IP:8082/cameras.0/cam1` verfügbar.

Zusätzlich kann das Bild per Nachricht angefordert werden:

```
sendTo('cameras.0', 'image', {
    name: 'cam1',
    width: 100, // optional
    height: 50, // optional
    angle: 90   // optional
    noCache: true // optional, if you want to get the image not from cache
}, result => {
    const img = 'data:' + result.contentType + ';base64,' + result.data;
    console.log('Show image: ' + img);
});
```

Das Ergebnis liegt immer im Format `jpg` vor.

Unterstützte Kameras:

- Reolink E1 Pro über RTSP (wichtig, ohne „Pro“ geht es nicht)
- Eufy über Eusec-Adapter
- [HiKam](https://support.hikam.de/support/solutions/articles/16000070656-zugriff-auf-kameras-der-2-generation-via-onvif-f%C3%BCr-s6-q8-a7 -2-Generation-) der zweiten und dritten Generation über ONVIF (für S6, Q8, A7 2. Generation), A7 Pro, A9
- [WIWICam M1 über HiKam-Adapter](https://www.wiwacam.com/de/mw1-minikamera-kurzanleitung-und-faq/)
- RTSP Native – wenn Ihre Kamera das RTSP-Protokoll unterstützt
- Screenshots über HTTP-URL – wenn Sie den Schnappschuss von Ihrer Kamera über die URL erhalten können

### URL-Bild
Dies ist eine normale URL-Anfrage, bei der alle Parameter in der URL enthalten sind. Gefällt mir `http://mycam/snapshot.jpg`

### URL-Bild mit Basisauthentifizierung
Dies ist eine URL-Anfrage für ein Bild, bei der alle Parameter in der URL enthalten sind, Sie jedoch die Anmeldeinformationen für die Basisauthentifizierung angeben können. Gefällt mir `http://mycam/snapshot.jpg`

### FFmpeg
Wenn Sie auf Schnappschüsse von RTSP-Kameras zugreifen möchten, können Sie ffmpeg verwenden. Sie müssen ffmpeg auf Ihrem System installieren:

- Windows hat ffmpeg vorkompiliert und es ist nicht erforderlich, etwas herunterzuladen. (Die Windows-Version stammt von hier: https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-essentials.7z)
- Linux: `sudo apt-get install ffmpeg -y`

Hier ist ein Beispiel für das Hinzufügen von Reolink E1:

![rtsp](../../../en/adapterref/iobroker.cameras/img/rtsp.png)

## So fügen Sie eine neue Kamera hinzu (Für Entwickler)
Um eine neue Kamera hinzuzufügen, müssen Sie einen Pull Request auf GitHub mit den folgenden Änderungen erstellen:

- Fügen Sie eine neue Datei zum Ordner „Kameras“ hinzu. Dies ist ein Backend zum Auslesen des einzelnen Bildes von der Kamera.
- Fügen Sie die GUI-Datei im Ordner „src/src/Types/“ hinzu. Dies ist der Konfigurationsdialog für die Kamera
- Fügen Sie diesen Dialog in der Datei „src/src/Tabs/Cameras.js“ hinzu, analog zum Hinzufügen anderer Kameras. Es sollten nur zwei Zeilen hinzugefügt werden:
  - Importieren Sie einen neuen Konfigurationsdialog wie „import RTSPMyCamConfig from '../Types/RTSPMyCam';“.
  - Erweitern Sie die `TYPES`-Struktur mit der neuen Kamera wie `mycam: { Config: RTSPMyCamConfig, name: 'MyCam' },`

    Der Attributname muss mit dem Namen der Datei im Ordner `cameras` übereinstimmen.

## Machen
- [ ] Senden Sie neue Abonnementanfragen für RTSP-Kameras, wenn der Dialog geöffnet oder geschlossen wird

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **ARBEIT IN ARBEIT** -->

## Changelog
### 1.4.0 (2023-12-04)
* (bluefox) Changed widget set name
* (bluefox) Added the caching of images with time, size and rotation
* (bluefox) Added timeout for RTSP cameras

### 1.3.0 (2023-09-28)
* (bluefox) Utilized the new js-controller feature: sendToUI. RTSP Streaming works only with js-controller 5.0.13 or higher
* (bluefox) Implemented a second widget for simple cameras

### 1.2.3 (2023-09-27)
* (bluefox) Added WiWiCam MW1 and HiKam cameras

### 1.2.2 (2023-07-07)
* (bluefox) Corrected passwords with exclamation mark

### 1.2.1 (2023-07-06)
* (bluefox) Added eufy camera

### 1.1.1 (2023-03-15)
* (bluefox) Added Reolink E1 camera

### 1.0.3 (2023-01-11)
* (bluefox) Corrected GUI config error

### 1.0.2 (2023-01-07)
* (bluefox) added RTSP camera
* (bluefox) added cache of snapshots

### 0.2.0 (2022-09-27)
* (bluefox) GUI updated to MUIv5

### 0.1.8 (2022-02-13)
* (bluefox) replaced the deprecated package `request` with `axios`

### 0.1.5 (2022-02-13)
* (bluefox) Preparations for js-controller@4.x are made

### 0.1.4 (2021-07-13)
* (bluefox) Add a role for states

### 0.1.3 (2020-08-08)
* (Hirsch-DE) Parameters were applied

### 0.1.2 (2020-06-03)
* (bluefox) implemented get image by message

### 0.1.0
* (bluefox) URL and URL with basic authentication were implemented

### 0.0.1
* (bluefox) initial release

## License
MIT License

Copyright (c) 2020-2023 bluefox <dogafox@gmail.com>

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