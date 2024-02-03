---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hdg-bavaria/README.md
title: ioBroker.hdg-bavaria
hash: mbnsvpEpxYiVe4/xyJFQjTrDt21Sf3WSJFwKsmMIPFw=
---
![Logo](../../../en/adapterref/iobroker.hdg-bavaria/admin/hdg-bavaria.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.hdg-bavaria.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.hdg-bavaria.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/hdg-bavaria-installed.svg)
![Anzahl Installationen (stabil)](https://iobroker.live/badges/hdg-bavaria-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/stemaker/iobroker.hdg-bavaria.svg)
![NPM](https://nodei.co/npm/iobroker.hdg-bavaria.png?downloads=true)

# IoBroker.hdg-bavaria
**Tests:** ![Test und Freigabe](https://github.com/stemaker/ioBroker.hdg-bavaria/workflows/Test%20and%20Release/badge.svg)

## Hdg-bavaria-Adapter für ioBroker
Zugriff auf Daten der HDG-Steuerung von HDG-Bavaria-Kesseln. Derzeit wird eine eingeschränkte Konfiguration unterstützt (K10-33, 850l-Tank mit 3 Temperatursensoren, konfigurierbare Anzahl Heizkreise). Weitere können auf Anfrage hinzugefügt werden.

Ich habe nur sehr wenig Zeit für dieses Projekt und bin inzwischen nach HA gezogen. Es gibt ein ähnlich interessantes Projekt https://github.com/srt/hdg-exporter.

## Changelog
<ul>
  <li>v0.4.0
    <ul>
      <li>Support for multiple heat circuits.</li>
    </ul>
  </li>
  <li>v0.3.1
    <ul>
      <li>Added integration test.</li>
    </ul>
  </li>
  <li>v0.3.0
    <ul>
      <li>Added tracking energy of the tank. Temperature sensor data is used to evaluate the current thermal energy of the tank.
      Tank content is currently equally distributed to temperature sensors which might not be accurate depending on sensor positions.</li>
    </ul>
  </li>
  <li>v0.2.1
    <ul>
      <li>First released version</li>
    </ul>
  </li>
</ul>

## License
MIT License

Copyright (c) 2021 stemaker <app.stemaker@gmail.com>

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