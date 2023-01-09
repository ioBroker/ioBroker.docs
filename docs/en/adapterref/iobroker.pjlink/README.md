![Logo](admin/pjlink.png)
# ioBroker.pjlink

[![NPM version](https://img.shields.io/npm/v/iobroker.pjlink.svg)](https://www.npmjs.com/package/iobroker.pjlink)
[![Downloads](https://img.shields.io/npm/dm/iobroker.pjlink.svg)](https://www.npmjs.com/package/iobroker.pjlink)
![Number of Installations](https://iobroker.live/badges/pjlink-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/pjlink-stable.svg)

![Test and Release](https://github.com/Bannsaenger/ioBroker.pjlink/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.pjlink.png?downloads=true)](https://nodei.co/npm/iobroker.pjlink/)

## pjlink adapter for ioBroker

PJLink Projector controll

**!! For now only class 1 protocol is supported**

## About PJLink

> PJLink is a unified standard for operating and controlling data projectors.
PJLink enables central control of projectors manufactured by different vendors and projectors can be operated by a controller.
PJLink compliant equipment can be managed and controlled at any time and in any place, regardless of manufacturer.
PJLink is a new standard designed to make communication interfaces and communication protocols that have been different from one projector manufacturer to another uniform and common.

> PJLink compliant equipment features a high interconnectivity across different models and manufacturers, enabling easy construction of environments that are mixed with different models and systems and easy replacement of systems that are already in place.

* [Taken from PJLink Homepage](https://pjlink.jbmia.or.jp/english/)

## Credits

The protocol is a trademark from: 
**Copyrights © Japan Business Machine and Information System Industries Association. All Rights Reserved,**
[PJLink Homepage](https://pjlink.jbmia.or.jp/english/)

This work is based on the nodejs module with pjlink implementation from **sy1vain**:
[https://github.com/sy1vain/node-pjlink](https://github.com/sy1vain/node-pjlink)

## ToDo
* support the node-pjlink project to implement class 2

## How the adapter works
For now only class 1 is supported. This means the adapter can only poll the status.
Active sending from status information from the device to the adapter can be
added as soon as class 2 is supported.

#### PJLink Class 1 inputs

* The inputs must be set as 2-digit numbers. The first digit describes the input type

| Type    | Number | possible Inputs |
| ------- | ------ | --------------- |
| RGB     | 1      | 1 - 9 |
| VIDEO   | 2      | 1 - 9 |
| DIGITAL | 3      | 1 - 9 |
| STORAGE | 4      | 1 - 9 |
| NETWORK | 5      | 1 - 9 |

The possible inputs can be found in the database after the adapter has been started under
> pjlink.\<instance\>.deviceInfo.availableInputs

You can edit the input object in the instance configuration. There you can edit the names of the inputs and
let the database object validate your inputs.

### Power Switch
With the state (set to **true**)

> pjlink.\<instance\>.power

the projector can be switched on **and** off depending on the current power state.

> pjlink.\<instance\>.powerStatus

The power switch will automatically return to **false**.

#### Lamp status
Only one lamp ist predefined in the database. If the lamp query returns more than one lamp,
the other lamps will be added dynamically.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (Bannsaenger) extended configuration to let you choose the frequency and time for information retrieval
* (Bannsaenger) added possibility to customize media.input by the **INST** query and edit the names in instance config

### 0.0.3 (2022-10-19)
* (Bannsaenger) updated react dependency

### 0.0.2 (2022-10-19)
* (Bannsaenger) changed some info logs to debug. Fixed one power state issue.
* (Bannsaenger) redesign of timer and error handling

### 0.0.1 (2022-10-13)
* (Bannsaenger) initial release

## License
MIT License

Copyright (c) 2022 Bannsaenger <bannsaenger@gmx.de>

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