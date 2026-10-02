---
chapters: {"pages":{"en/adapterref/iobroker.frigate/README.md":{"title":{"en":"ioBroker.frigate"},"content":"en/adapterref/iobroker.frigate/README.md"},"en/adapterref/iobroker.frigate/docs/en/README.md":{"title":{"en":"ioBroker.frigate — Documentation"},"content":"en/adapterref/iobroker.frigate/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.frigate/README.md
title: ioBroker.frigate
hash: JKzFmLXBgRPhcmnQZNF8yjhw5+IJPYdrMgamvBwuTkw=
---
![Logo](../../../en/adapterref/iobroker.frigate/admin/frigate.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.frigate.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.frigate.svg)
![Anzahl der Installationen](https://iobroker.live/badges/frigate-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/frigate-stable.svg)
![NPM](https://nodei.co/npm/iobroker.frigate.png?downloads=true)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.frigate/workflows/Test%20and%20Release/badge.svg)

# ioBroker.frigate

> \[!IMPORTANT] Dieser Adapter kann nicht von GitHub installiert werden.

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) . Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Frigate-Adapter für ioBroker

Adapter für [Frigate NVR](https://frigate.video/) – ein Open-Source-Videoüberwachungssystem mit KI-gestützter Objekterkennung, das selbst gehostet wird.

## Dokumentation

[🇺🇸 Dokumentation](/#/docs/adapterref/iobroker.frigate/docs/en/README.md)

[🇩🇪 Dokumentation](https://github.com/iobroker-community-adapters/ioBroker.frigate/blob/main/docs/de/README.md)

## Diskussion und Fragen

<https://forum.iobroker.net/topic/64928/frigate-adapter-für-iobroker>

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.2.1 (2026-09-28)
- (@GermanBluefox) In broker mode the adapter reports the port of its built-in MQTT broker to js-controller 8, which keeps a per-host registry of the occupied ports (`system.host.<name>.usedResources`). The default 1883 is also the default of the MQTT adapter, so the log now names the instance that already declared the port instead of only reporting "port is already in use". The port is taken from the running server and given back when it closes. In client mode nothing is reported: the broker is on another machine. An older js-controller is unaffected
- (@GermanBluefox) The fullscreen dialog of the camera widgets for `ioBroker.devices` opened as a bare strip with some cameras: the dialog takes its height from the picture in it, and a picture that has not arrived yet is zero pixels high. The dialog now keeps a place for it and shows that it is on its way. The live widget also stops the stream of the tile for as long as the dialog is open - a browser grants about six connections per server, every camera tile holds one of them for as long as its stream runs, and the stream of the dialog was therefore the one that never got a turn. A stream that still brings no frame within ten seconds is given up on, and the pictures come over the socket instead, as they already did when a stream reported an error

### 3.2.0 (2026-09-22)
- (@GermanBluefox) The live widget for `ioBroker.devices` still tried the stream relative to admin (port 8081) when the adapter did not report the address of the web instance in time. Without an address the widget now takes single pictures over the socket and tells the reason in the browser console; an address that arrives late still switches to the stream
- (@GermanBluefox) Added the names Frigate recognizes (face recognition, known license plates): `<zone>.sub_labels` lists the names in a zone right now, and `sub_labels.<name>` is `true` as long as a running event carries that name. With face recognition enabled, the names of the face library are created on start, so automations can be set up before somebody is recognized for the first time (#277)
- (@GermanBluefox) Fixed repochecker warnings: literal placeholders of the settings dialog are in the translation files, and dependabot also watches `src-devices`

### 3.1.5 (2026-09-22)
- (@GermanBluefox) The live widget for `ioBroker.devices` did not show the stream in admin: before the adapter had reported the address of the web instance, the widget already loaded the stream relative to admin (port 8081), and the error of that attempt stayed on the tile even after the right address had arrived. The widget now waits for the address, and if the stream still cannot be loaded (web instance not reachable, http stream inside an https admin), it switches to single pictures over the socket

### 3.1.4 (2026-09-14)
- (@GermanBluefox) The live widget for `ioBroker.devices` switches to single pictures over the socket by itself when the page is opened through the ioBroker cloud (iobroker.pro / iobroker.net): the cloud cannot relay the MJPEG stream, and the address of the web instance is not reachable from outside anyway

### 3.1.3 (2026-09-09)
- (@GermanBluefox) The camera name in the device manager tile moved below the picture: at the top of the tile the drag handle and the favourite star of the widget manager were drawn over it
- (@GermanBluefox) The build helper is written in TypeScript itself now.

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