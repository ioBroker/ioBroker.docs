---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.cameras/README.md
title: ioBroker.kameras
hash: md4NOTpy9bBQKDCixUgrVhRjR4M6ZCwAR29la883rHo=
---
![Logo](../../../en/adapterref/iobroker.cameras/admin/cameras.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.cameras.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.cameras.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/ioBroker/iobroker.cameras.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/ioBroker/ioBroker.cameras/badge.svg)
![NPM](https://nodei.co/npm/iobroker.cameras.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/ioBroker/ioBroker.cameras/master.svg)

# IoBroker.cameras
## IP-Kamera-Adapter für ioBroker
Sie können Ihre Web-/IP-Kameras in vis und andere Visualisierungen einbinden.
Wenn Sie eine Kamera mit dem Namen `cam1` konfigurieren, ist diese auf dem Webserver unter `http(s)://iobroker-IP:8082/cameras.0/cam1` verfügbar.

Zusätzlich können Sie das Bild per Nachricht anfordern:

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

Das Ergebnis liegt immer im Format `jpg` vor.

Unterstützte Kameras:

### URL-Bild Dies ist eine normale URL-Anfrage, bei der alle Parameter in der URL stehen. Gefällt mir `http://mycam/snapshot.jpg`
### URL-Bild mit Basisauthentifizierung
Dies ist eine URL-Anforderung für ein Bild, bei der alle Parameter in der URL enthalten sind, Sie jedoch die Anmeldeinformationen für die Standardauthentifizierung bereitstellen können. Gefällt mir `http://mycam/snapshot.jpg`

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### __ARBEITEN IN PROGRESS__ -->

## Changelog
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

Copyright (c) 2020-2021 bluefox <dogafox@gmail.com>

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