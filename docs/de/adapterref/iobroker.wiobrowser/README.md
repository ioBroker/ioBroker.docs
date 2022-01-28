---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wiobrowser/README.md
title: ioBroker.wiobrowser
hash: 99M0E7HtYbdh8wpgKiILcXsNP9IFwFIsBk3vRdAcMuY=
---
![Logo](../../../en/adapterref/iobroker.wiobrowser/admin/wiobrowser.png)

![Anzahl der Installationen](http://iobroker.live/badges/wiobrowser-stable.svg)
![Build-Status](https://travis-ci.org/Bettman66/ioBroker.wiobrowser.svg?branch=master)
![NPM-Version](http://img.shields.io/npm/v/iobroker.wiobrowser.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.wiobrowser.svg)
![NPM](https://nodei.co/npm/iobroker.wiobrowser.png?downloads=true)

# IoBroker.wiobrowser
## Die Info
Steuerung eines Windows-Vollbildbrowser-Adapters für ioBroker

Dieser Adapter verbindet sich über tcp.socket mit dem wioBrowser, um ihn zu steuern. Es gibt 3 verschiedene wioBrowser Apps: + wioBrowser WebView2 Framework + wio Browser Chromium Framework + wioNoweb

wioBrowser ist ein über ioBroker steuerbarer Windows-Vollbildbrowser, der einzelne Webseiten oder eine im Adapter einstellbare Webseiten-Slideshow anzeigt. Außerdem werden Informationen an den Adapter übermittelt: + CPU-Auslastung + freier Speicher + aktuelle Akkuentladung auf Tablet oder Notebook + Hostname + IP

Er kann auch steuern: + Bildschirm ein/aus + App beenden + Lautstärke +/- + Stumm ein/aus + Helligkeit +/- + Programme mit Schaltern ausführen, z. C:\ClickMonitorDDC\ClickMonitorDDC_7_2.exe b 100

Text- und Sprachnachrichten können an das Gerät gesendet werden.

Die wioNoweb-App tut das Gleiche mit Ausnahme der Webfunktionen.

*** Dieser Adapter verbindet sich über tcp.socket mit dem wioBrowser, um ihn zu steuern. Es gibt 3 unterschiedliche wioBrowser Apps: + wioBrowser WebView2 Framework + wioBrowser Chromium Framework + wioNoweb

wioBrowser ist ein Windows Fullscreen Browser der sich über ioBroker steuern lässt, er zeigt einzelne Webseiten an oder eine Webseiten Slideshow die man im Adapter einstellen kann. Es werden auch Infos an den Adapter übertragen: + CPU Last + freier Speicher + aktuelle Batterieentladung bei Tablet oder Notebook + Hostname + IP

Er kann auch steuern: + Bildschirm an/aus + App beenden + Lautstärke +/- + Stumm an/aus + Helligkeit +/- + Program mit Schaltern ausführen z.B C:\ClickMonitorDDC\ClickMonitorDDC_7_2.exe b 100

Es können Text- und Sprachnachrichten an das Gerät gesendet werden.

Die App wioNoweb kann das auch bis auf die Webfunktionen.

## Verknüpfung
* [Adapter-Thread im ioBroker-Forum](https://forum.iobroker.net/topic/50982/neuer-adapter-wiobrowser-f%C3%BCr-windows)
* [Tutorial über die Nachrichten](https://forum.iobroker.net/topic/51534/tutorial-wiobrowser-windows-desktop-popup-messages) vom User @hydrotec

## Changelog
### 0.3.0
* (bettman66) bugfix port

### 0.2.7
* (bettman66) add hostname

### 0.2.6
* (bettman66) add free memory

### 0.2.5
* (bettman66) add cpu info

### 0.2.4
* (bettman66) add speakmessage

### 0.2.3
* (bettman66) add volume

### 0.2.2
* (bettman66) add sapi

### 0.2.1
* (bettman66) repository

### 0.2.0
* (bettman66) add/remove messagesstyle

### 0.1.9
* (bettman66) add messages folder

### 0.1.8
* (bettman66) add commands

### 0.1.7
* (bettman66) add multiline messages

### 0.1.6
* (bettman66) add messages style

### 0.1.5
* (bettman66) add error object

### 0.1.4
* (bettman66) add popup message

### 0.1.3
* (bettman66) add screenoff

### 0.1.2
* (bettman66) add time,zoom by page

### 0.1.1
* (bettman66) add screenon

### 0.1.0
* (bettman66) disable slideshow by click

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