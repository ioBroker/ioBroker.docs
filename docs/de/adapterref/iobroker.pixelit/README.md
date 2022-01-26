---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pixelit/README.md
title: ioBroker.pixelit
hash: m0sZpNPFijRIUS62MPeOk2ykpvSm5/5WphPyFWR41Nk=
---
![Logo](../../../en/adapterref/iobroker.pixelit/admin/pixelit.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.pixelit.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.pixelit.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/pixelit-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/pixelit-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/o0shojo0o/iobroker.pixelit.svg)
![NPM](https://nodei.co/npm/iobroker.pixelit.png?downloads=true)

# IoBroker.pixelit
## PixelIt-Adapter für ioBroker
Mit diesem Adapter können Sie von ioBroker Screen an [PixelIt](https://www.bastelbunker.de/pixel-it/) senden.
Es sind auch Datenpunkte für die optionalen Sensoren von [PixelIt](https://www.bastelbunker.de/pixel-it/), sowie die API der [Pixel Gallery](https://pixelit.bastelbunker.de/PixelGallery) im Adapter implementiert.
Weitere Informationen zu den Datenpunkten finden Sie in diesem [Dokumentation](https://docs.bastelbunker.de/ioBroker_pixelit/options.html).

## Aufbau
Erstellen Sie eine neue Instanz des Adapters Füllen Sie die IP aus und haben Sie Spaß :)

## Changelog

<!--
 https://github.com/AlCalzone/release-script#usage
    npm run release minor -- --all 0.9.8 -> 0.10.0
    npm run release patch -- --all 0.9.8 -> 0.9.9
    npm run release prerelease beta -- --all v0.2.1 -> v0.2.2-beta.0
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### **WORK IN PROGRESS**

-   (o0shojo0o) added datapoints info.hostname, info.note, sensor.pressure
-   (o0shojo0o) adjustments based on the adapter review

### 0.0.6 (2021-05-01)

-   (o0shojo0o) bugfix wrong value type

### 0.0.5 (2021-04-25)

-   (o0shojo0o) fix datapoints roles

### 0.0.4 (2021-04-25)

-   (o0shojo0o) code refactoring
-   (o0shojo0o) luminance remove decimals
-   (o0shojo0o) add 'Show Clock' button

### 0.0.3 (2021-02-11)

-   (o0shojo0o) add brightness and code refactoring

### 0.0.2 (2021-02-01)

-   (o0shojo0o) code refactoring and bugfixes

### 0.0.2-alpha.0 (2020-09-16)

-   (o0shojo0o) initial release

### 0.0.1

-   (o0shojo0o) initial push

## License

MIT License

Copyright (c) 2021 Dennis Rathjen <info@bastelbunker.de>

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