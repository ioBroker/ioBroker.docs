---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.winsipbrowser/README.md
title: ioBroker.winsipbrowser
hash: gn5ynf5pXo2yihnyTWneeKz+P8/EkMtH+zFR6j5LvUw=
---
![Logo](../../../en/adapterref/iobroker.winsipbrowser/admin/winsipbrowser.png)

![Anzahl der Installationen](http://iobroker.live/badges/winsipbrowser-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.winsipbrowser.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.winsipbrowser.svg)
![NPM](https://nodei.co/npm/iobroker.winsipbrowser.png?downloads=true)

# IoBroker.winsipbrowser
## Die Info
Steuerung eines Windows-Vollbildbrowsers mit sipclient

Adapter für ioBroker

Dieser Adapter stellt über tcp.socket eine Verbindung zu winsipbrowser her, um ihn zu steuern.

winsipbrowser ist ein über ioBroker steuerbarer Windows-Vollbildbrowser mit sipclient, der einzelne Websites oder eine im Adapter einstellbare Website-Slideshow anzeigt. Außerdem werden Informationen an den Adapter übermittelt: + CPU-Auslastung + freier Speicher + aktuelle Akkuentladung auf Tablet oder Notebook + Hostname + IP

Er kann auch steuern: + Bildschirm ein/aus + App beenden + Lautstärke +/- + Stumm ein/aus + Helligkeit +/- + Programme mit Schaltern ausführen, z. C:\ClickMonitorDDC\ClickMonitorDDC_7_2.exe b 100 + Textnachrichten + Sprachnachrichten

## Verknüpfung
* [Adapter-Thread im ioBroker-Forum](https://forum.iobroker.net/topic/53162/neuer-adapter-winsipbrowser-f%C3%BCr-windows)
* [ioBroker Forum Programm Thread](https://forum.iobroker.net/topic/53032/sprechanlagen-innenstation-browser-mit-sip-client?_=1646732403727)

## Changelog
### 0.1.1
* (bettman66) stop slideshow by touchevent

### 0.1.0
* (bettman66) tcpclient2tcpserver

### 0.0.5
* (bettman66) add messages

### 0.0.4
* (bettman66) add siphungup

### 0.0.3
* (bettman66) add sipring

### 0.0.2
* (bettman66) add sipcall

### 0.0.1
* (bettman66) first commit

## License
The MIT License (MIT)

Copyright (c) 2022 Walter Zengel <w.zengel@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.