# ioBroker.vis-homekittiles

<img src="doc/img/title-pic_hkt-on-ipad.png" />

[![NPM version](https://img.shields.io/npm/v/iobroker.vis-homekittiles.svg)](https://www.npmjs.com/package/iobroker.vis-homekittiles)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-homekittiles.svg)](https://www.npmjs.com/package/iobroker.vis-homekittiles)
![Number of Installations](https://iobroker.live/badges/vis-homekittiles-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/vis-homekittiles-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.vis-homekittiles.png?downloads=true)](https://nodei.co/npm/iobroker.vis-homekittiles/)

**Tests:** ![Test and Release](https://github.com/Standarduser/ioBroker.vis-homekittiles/workflows/Test%20and%20Release/badge.svg)

## HomeKit-Tiles for ioBroker-VIS

Homekit Tiles is a widget set based on the design of Apple HomeKit.
The special feature of the widgets is that they do not contain any fixed style elements, but everything is formatted using CSS. As a result, there are no separate settings in the VIS editor for the position and/or size of the icons, labels, etc. The design is adjusted by changing the CSS code. For this purpose, the CSS code from the file `/widgets/homekittiles/css/style.css` can be used as a template. The code is inserted into the CSS tab in the VIS editor and can be customized as desired. It is also possible to add your own CSS classes via the VIS editor in the "General" section of the widgets.

The widgets are designed for VIS 1.x.

**Note:** For licensing reasons, no icons are included with this adapter. Very good sources for icons are:

* [https://www.flaticon.com](https://www.flaticon.com)
* [https://icons8.com](https://icons8.com)

[🇩🇪 Dokumentation](doc/homekittiles-de.md)
[🇺🇸 Documentation](doc/homekittiles-en.md)

## Things to do

* Repair increment
* Own signal pcitures for tiles
* Dialog tile set active by state
* Mini-mediaplayer
* Thermostat
* Select
* Submenue-Button
* CSS: make colors of dialog window nice
* CSS: make colors of datepicker window nice

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

* (Standarduser) CSS adjustments

### 0.0.6 (2023-11-10)

* (Standarduser) just some cleanup

### 0.0.5 (2023-11-04)

* (Standarduser) fixed: adjustment of decimals in labelgroup 1 & 2
* (Standarduser) fixed: readme
* (Standarduser) not fixed: increment not working properbly

### 0.0.4 (2023-11-01)

* (Standarduser) fixed: some corrections on CSS code
* (Standarduser) fixed: widget description text
* (Standarduser) fixed: wrong placement if dialog-height had a unit (ViewInWidget-Dialog)
* (Standarduser) fixed: increment buttons on tiles were working insuficient
* (Standarduser) added: variable number of digits at value-tile
* (Standarduser) added: slider for ViewInWidget-Swipe
* (Standarduser) added: ability to manipulate values in label-groups

### 0.0.2 (2023-10-14)

* (Standarduser) initial release

## License

MIT License

Copyright (c) 2023 Standarduser

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
