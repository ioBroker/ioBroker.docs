![Logo](admin/opendtu.png)
# ioBroker.opendtu

[![NPM version](https://img.shields.io/npm/v/iobroker.opendtu.svg)](https://www.npmjs.com/package/iobroker.opendtu)
[![Downloads](https://img.shields.io/npm/dm/iobroker.opendtu.svg)](https://www.npmjs.com/package/iobroker.opendtu)
![Number of Installations](https://iobroker.live/badges/opendtu-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/opendtu-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.opendtu.png?downloads=true)](https://nodei.co/npm/iobroker.opendtu/)

**Tests:** ![Test and Release](https://github.com/o0shojo0o/ioBroker.opendtu/workflows/Test%20and%20Release/badge.svg) [![CodeQL](https://github.com/o0shojo0o/ioBroker.opendtu/actions/workflows/codeql.yml/badge.svg)](https://github.com/o0shojo0o/ioBroker.opendtu/actions/workflows/codeql.yml)

## opendtu adapter for ioBroker

This adapter get the data points from the project [OpenDTU](https://github.com/tbnobody/OpenDTU) available in real time.  
In addition, the following data points can be used via the adapter to the power limitation of the OpenDTU can be controlled.

```
- opendtu.0.xxxxxx.power_control.limit_nonpersistent_absolute
- opendtu.0.xxxxxx.power_control.limit_nonpersistent_relative
- opendtu.0.xxxxxx.power_control.limit_persistent_absolute
- opendtu.0.xxxxxx.power_control.limit_persistent_relative  
```
For more information on the data points, see their description or click [here](https://github.com/tbnobody/OpenDTU/blob/master/docs/MQTT_Topics.md#inverter-limit-specific-topics).

## Credits

This adapter would not have been possible without the great work of @o0Shojo0o (https://github.com/o0Shojo0o), who developed former releases of this adapter.

## How to report issues and feature requests

Ideally, please use GitHub issues for this, with the best method achieved by setting the adapter to Debug log mode (Instances -> Expert mode -> Column Log level). Then retrieve the logfile from disk via the  'log' ioBroker subdirectory, **not** from Admin, which will cut lines. 

## Configuration

1. Create a new instance of the adapter
2. Fill in Security *(default http)*, IP-Address and port *(default 80)* of the [OpenDTU](https://github.com/tbnobody/OpenDTU) hardware 
3. Set the WebUI-Password **(this is mandatory, if it is incorrect no limit can be set!)**
4. Save the settings

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

### 3.1.0 (2024-12-02)
- (mattreim) Variable polling interval has been removed and polling intervals hev been increased.
- (mattreim) Description has been translated into supported languages.
- (mattreim) Admin-UI has been adapted for some display sizes.
- (mcm1957) Dependencies have been updated.

### 3.0.1 (2024-10-26)
- (simatec) Admin-UI has been adapted for small displays.
- (mcm1957) Dependencies have been updated.

### 3.0.0 (2024-10-19)
- (mcm1957) Adapter has been moved to iobroker-community-adapter organisation.
- (mcm1957) Adapter requires js-controller 5, admin 6 and node.js 20 now.
- (mcm1957) Dependencies have been updated.

### 2.1.0 (2024-10-11)

- (o0shojo0o) update dependencies
- (mattreim) support small screens
- (mattreim) update translations
- (mattreim) update object names
- (mattreim) add variable polling intervall [1-59s]

### 2.0.0 (2024-08-13)

- (o0shojo0o) changes for new websocket structure ([#129](https://github.com/o0shojo0o/ioBroker.opendtu/issues/129))
- (o0shojo0o) `Efficiency`, `YieldTotal`, `YieldDay` and `DC Power` moved from the AC section to the INV (old data points must be removed manually)
- (mattreim) update to current OpenDTU logo ([#156](https://github.com/o0shojo0o/ioBroker.opendtu/issues/156))
- (mattreim) update dependencies ([#162](https://github.com/o0shojo0o/ioBroker.opendtu/issues/162)), ([#179](https://github.com/o0shojo0o/ioBroker.opendtu/issues/179))
- (mattreim) fix GUI translation ([#163](https://github.com/o0shojo0o/ioBroker.opendtu/issues/163))

## License
MIT License


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
Copyright (c) 2024 Dennis Rathjen <dennis.rathjen@outlook.de>

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
