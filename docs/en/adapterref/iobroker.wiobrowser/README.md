![Logo](admin/wiobrowser.png)
# ioBroker.wiobrowser

![Number of Installations](http://iobroker.live/badges/wiobrowser-installed.svg)
![Number of Installations](http://iobroker.live/badges/wiobrowser-stable.svg)
[![Build Status](https://travis-ci.org/Bettman66/ioBroker.wiobrowser.svg?branch=master)](https://travis-ci.org/Bettman66/ioBroker.wiobrowser)
[![NPM version](http://img.shields.io/npm/v/iobroker.wiobrowser.svg)](https://www.npmjs.com/package/iobroker.wiobrowser)
[![Downloads](https://img.shields.io/npm/dm/iobroker.wiobrowser.svg)](https://www.npmjs.com/package/iobroker.wiobrowser)
[![NPM](https://nodei.co/npm/iobroker.wiobrowser.png?downloads=true)](https://nodei.co/npm/iobroker.wiobrowser/)

## Info
control of a Windows full-screen browser
Adapter for ioBroker

This adapter connects to wioBrowser via tcp.socket to control it. There are 3 different wioBrowser apps:
+ wioBrowser WebView2 Framework
+ wio Browser Chromium Framework
+ wioNoweb

wioBrowser is a Windows fullscreen browser that can be controlled via ioBroker, it displays individual websites or a website slideshow that can be set in the adapter. Information is also transmitted to the adapter:
+ CPU load
+ free memory
+ current battery discharge on tablet or notebook
+ hostname
+ IP

He can also control:
+ Screen on/off
+ exit app
+ volume +/-
+ Mute on/off
+ brightness +/-
+ Run programs with switches e.g. C:\ClickMonitorDDC\ClickMonitorDDC_7_2.exe b 100

Text and voice messages can be sent to the device.

The wioNoweb app does the same except for the web functions.

***
Dieser Adapter verbindet sich über tcp.socket mit dem wioBrowser, um ihn zu steuern. Es gibt 3 unterschiedliche wioBrowser Apps:
+ wioBrowser WebView2 Framework
+ wioBrowser Chromium Framework
+ wioNoweb

wioBrowser ist ein Windows Fullscreen Browser der sich über ioBroker steuern lässt, er zeigt einzelne Webseiten an oder eine Webseiten Slideshow die man im Adapter einstellen kann. Es werden auch Infos an den Adapter übertragen:
+ CPU Last 
+ freier Speicher
+ aktuelle Batterieentladung bei Tablet oder Notebook
+ Hostname
+ IP

Er kann auch steuern:
+ Bildschirm an/aus
+ App beenden
+ Lautstärke +/-
+ Stumm an/aus
+ Helligkeit +/-
+ Programme mit Schaltern ausführen z.B C:\ClickMonitorDDC\ClickMonitorDDC_7_2.exe b 100

Es können Text und Sprach Nachrichten an das Gerät gesendet werden.

Die App wioNoweb kann das auch bis auf die Webfunktionen.


## Link
* [ioBroker Forum Adapter Thread](https://forum.iobroker.net/topic/50982/neuer-adapter-wiobrowser-f%C3%BCr-windows)
* [Tutorial über die Messages](https://forum.iobroker.net/topic/51534/tutorial-wiobrowser-windows-desktop-popup-messages) vom User @hydrotec

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
