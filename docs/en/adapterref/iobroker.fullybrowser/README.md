![Logo](admin/fully.png)
# ioBroker.fullybrowser
=================

![Number of Installations](http://iobroker.live/badges/fullybrowser-installed.svg) ![Number of Installations](http://iobroker.live/badges/fullybrowser-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.fullybrowser.svg)](https://www.npmjs.com/package/iobroker.fullybrowser)
[![Downloads](https://img.shields.io/npm/dm/iobroker.fullybrowser.svg)](https://www.npmjs.com/package/iobroker.fullybrowser)


[![NPM](https://nodei.co/npm/iobroker.fullybrowser.png?downloads=true)](https://nodei.co/npm/iobroker.fullybrowser/)

 
fullyBrowser Adapter for ioBroker
------------------------------------------------------------------------------

This adapter manages your [Fully Kiosk Browser](https://www.fully-kiosk.com) (a Plus License is required). It provides you with a bunch of possibilites to control your tablet through ioBroker, like turning the display on/off, launch any tablet app, launch the screensaver etc. Also, it provides various information in states, like battery level of your tablet, etc. which you can use e.g. for Visualization.
A small excerpt just of the command options:

![möglichkeiten](https://github.com/arteck/iobroker.fullyBrowser/blob/master/doku/auszug.png)

<b>NodeJs >> 8.x.x </b>


<!--
    Placeholder for the next version (at the beginning of the line):
    
    https://github.com/AlCalzone/release-script#usage
    npm run release minor -- --all 0.9.8 -> 0.10.0
    npm run release patch -- --all 0.9.8 -> 0.9.9
    npm run release prerelease beta -- --all v0.2.1 -> v0.2.2-beta.0
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->



## Changelog


### 2.0.10 (2021-12-07)
* (xXBJXx)  Problem with special characters in psw

### 2.0.9 (2021-05-30)
* (arteck)  lastInfoUpdate is now correct

### 2.0.6 (2021-03-18)
* (arteck) timeout new defined

### 2.0.4 (2021-01-20)
* (arteck) new js-controller upd

### 2.0.2 (2020-12-28)
* (arteck) little update

### 2.0.1 (2020-08-19)
* (arteck) refactoring
* (arteck) settings update interval switch so sec

### 1.0.4 (2020-08-06)
* (arteck) volume set

### 1.0.3 (2020-02-16)
* (arteck) support compact mode

### 1.0.1 (2019-06-20)
* (arteck) encodeURL



## License
The MIT License (MIT)

Copyright (c) 2018-2021 Arthur Rupp <arteck@outlook.com>

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
