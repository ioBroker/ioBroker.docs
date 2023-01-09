---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.cameras/README.md
title: ioBroker.Kameras
hash: 7dDTSTOHUkH6f4vfxV/NGQJ6JmTNR4/PpJeOlVSdk5k=
---
![Logo](../../../en/adapterref/iobroker.cameras/admin/cameras.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.cameras.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.cameras.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/ioBroker/iobroker.cameras.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/ioBroker/ioBroker.cameras/badge.svg)
![NPM](https://nodei.co/npm/iobroker.cameras.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/ioBroker/ioBroker.cameras/master.svg)

# IoBroker.Kameras
## IP-Kamera-Adapter für ioBroker
Sie können Ihre Web-/IP-Kameras in Vis- und andere Visualisierungen integrieren.
Wenn Sie eine Kamera mit dem Namen `cam1` konfigurieren, wird sie auf dem Webserver unter `http(s)://iobroker-IP:8082/cameras.0/cam1` verfügbar sein.

Zusätzlich kann das Bild per Nachricht angefordert werden:

```
sendTo('cameras.0', 'image', {
    name: 'cam1',
    width: 100, // optional
    height: 50, // optional
    angle: 90   // optional
}, result => {
    const img = 'data:' + result.contentType + ';base64,' + result.data;
    console.log('Show image: ' + img);
});
```

Das Ergebnis ist immer im Format `jpg`.

Unterstützte Kameras:

### URL-Bild Dies ist eine normale URL-Anforderung, bei der alle Parameter in URLs enthalten sind. Wie `http://mycam/snapshot.jpg`
### URL-Bild mit Basisauthentifizierung
Dies ist eine URL-Anforderung für ein Bild, bei der sich alle Parameter in der URL befinden, aber Sie können die Anmeldeinformationen für die grundlegende Authentifizierung angeben. Wie `http://mycam/snapshot.jpg`

### FFmpeg
Wenn Sie auf Schnappschüsse auf RTSP-Kameras zugreifen möchten, können Sie ffmpeg verwenden. Sie müssen ffmpeg auf Ihrem System installieren:

- Windows hat ffmpeg vorkompiliert und es muss nichts heruntergeladen werden. (Die Windows-Version stammt von hier: https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-essentials.7z)
- Linux: `sudo apt-get install ffmpeg -y`

Hier ist ein Beispiel, wie man Reolink E1 hinzufügt:

![rtsp](../../../en/adapterref/iobroker.cameras/img/rtsp.png)

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### **IN ARBEIT** -->

## Changelog
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
* (bluefox) Add role for states

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