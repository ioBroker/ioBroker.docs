![Logo](admin/pixelit.png)

# ioBroker.pixelit

[![NPM version](http://img.shields.io/npm/v/iobroker.pixelit.svg)](https://www.npmjs.com/package/iobroker.pixelit)
[![Downloads](https://img.shields.io/npm/dm/iobroker.pixelit.svg)](https://www.npmjs.com/package/iobroker.pixelit)
![Number of Installations (latest)](http://iobroker.live/badges/pixelit-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/pixelit-stable.svg)  
[![NPM](https://nodei.co/npm/iobroker.pixelit.png?downloads=true)](https://nodei.co/npm/iobroker.pixelit/)

## PixelIt adapter for ioBroker

This adapter allows you to send from ioBroker Screen to [PixelIt](https://github.com/pixelit-project/PixelIt).  
There are also data points for the optional sensors of [PixelIt](https://github.com/pixelit-project/PixelIt), as well as the API of the [Pixel Gallery](https://pixelit.bastelbunker.de/PixelGallery) is implemented in the adapter.  
More information about the data points can be found in this [documentation](https://pixelit-project.github.io/iobroker.html).

## Configuration

Create a new instance of the adapter
Fill the IP and have fun :)

## Changelog

<!--
 https://github.com/AlCalzone/release-script#usage
    npm run release major -- -p iobroker license --all 0.9.8 -> 1.0.0
    npm run release minor -- -p iobroker license --all 0.9.8 -> 0.10.0
    npm run release patch -- -p iobroker license --all 0.9.8 -> 0.9.9
    npm run release prerelease beta -- -p iobroker license --all v0.2.1 -> v0.2.2-beta.0
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.1.2 (2023-09-24)

-   (o0Shojo0o) fixed "Blocked" area for Icons when sending `pixelit.0.message`

### 1.1.1 (2023-07-28)

-   (o0Shojo0o) fix `brightness` and `brightness_255` handling

### 1.1.0 (2023-07-26)

-   (o0Shojo0o) added adminTab

### 1.0.0 (2023-07-25)
**!!! Breaking changes works only with PixelIt v2.1.3 and higher !!!**

-   (d4rkd3v1l) removed parameters from "show_clock" call
-   (o0Shojo0o) fix "iob Adapter Checker" issues

### 0.2.0 (2022-08-19)

-   (o0Shojo0o) added sleep_mode state

### 0.1.0 (2022-07-22)
**!!! Breaking changes works only with PixelIt v1.0.0 and higher !!!**

-   (o0Shojo0o) change conncetion to websocket
-   (o0Shojo0o) add buttons datapoints
-   (o0Shojo0o) add sensor gas datapoint

### 0.0.8 (2021-08-19)

-   (o0Shojo0o) fix translation

### 0.0.7 (2021-08-18)

-   (o0Shojo0o) change UI to JSONConfig
-   (o0shojo0o) added datapoints info->hostname, info->note, sensor->pressure
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

Copyright (c) 2023 Dennis Rathjen <dennis.rathjen@outlook.de>

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
