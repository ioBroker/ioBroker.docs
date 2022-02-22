![Logo](admin/innoxel.png)

# ioBroker.innoxel

Adapter for Innoxel Master 3 (https://innoxel.ch)

![node](https://img.shields.io/node/v-lts/iobroker.innoxel)
[![NPM version](https://img.shields.io/npm/v/iobroker.innoxel.svg)](https://www.npmjs.com/package/iobroker.innoxel)
[![Downloads](https://img.shields.io/npm/dm/iobroker.innoxel.svg)](https://www.npmjs.com/package/iobroker.innoxel)
[![license](https://img.shields.io/npm/l/iobroker.innoxel)](LICENSE)

![Number of Installations](https://iobroker.live/badges/innoxel-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/innoxel-stable.svg)
[![Dependency Status](https://img.shields.io/david/matthsc/iobroker.innoxel.svg)](https://david-dm.org/matthsc/iobroker.innoxel)

![Test and Release](https://github.com/matthsc/ioBroker.innoxel/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.innoxel.png?downloads=true)](https://nodei.co/npm/iobroker.innoxel/)

## Requirements

-   NodeJS >= 12.x
-   ioBroker >= 3.x, with admin >= 5.x
-   Innoxel Master 3 Smart Home system

## Installation

Until the adapter is part of the latest or stable repository, you can install the latest version by enabling expert mode in ioBroker and install the adapter from npm or github.

After installation, create a new instance and configure the settings:

-   Connection Settings for accessing innoxel master
    -   ip address
    -   port
    -   username
    -   password
-   Polling intervals for different areas
    -   state changes (i.e. switches, dimmer)
    -   room climate / thermostats
    -   weather
    -   innoxel master device details

## Supported Modules and Firmware

A pre-release version of this adapter has been working for more than 2 years with firmware 1.4.1.0 and then 1.5.1.0.

This initially released version has been tested with firmware 1.6.0.0.

The following modules have been tested/are supported:

-   Innoxel Master 3
-   Switch 8 G1
-   Motor 4 x 230 VAC G1
-   Dim 4 x 600 VA
-   Taster RGB
-   Thermo
-   Wetterstation P03/3-RS485-CET

If it works for you with different modules, or you have other modules that don't work, please feel free to open an issue.

## Messages

The adapter supports the messages described in the following sections.

### triggerInModule

Simulate pressing of a button on a "Taster".

```ts
sendTo("innoxel.0", "triggerInModule", "<moduleId>:<channelId>", callback);

// i.e. to trigger button 1 on "Taster" with id/address 20
sendTo("innoxel.0", "triggerInModule", "20:1");
sendTo("innoxel.0", "triggerInModule", "20:1", () => {
    // do something after the button press has been executed
});
```

-   <code>moduleId</code> is the id/address of the "Taster"
-   <code>channelId</code> is the index of the button on the "Taster"
-   <code>callback</code> (optional) callback function to call when action has been performed

### setDimValue

Simulate pressing of a button on a "Taster".

```ts
sendTo("innoxel.0", "setDimValue", "<moduleId>:<channelId>:<dimValue>:<dimSpeed>", callback);

// i.e. to set the value of channel 7 on dim module 1 to 80%
sendTo("innoxel.0", "setDimValue", "1:7:80");
sendTo("innoxel.0", "setDimValue", "1:7:80", () => {
    // do something after value has been set
});
```

-   <code>moduleId</code> is the id/address of the dimmer module
-   <code>channelId</code> is channel of the dimmer on the module
-   <code>dimValue</code> is the value in percent to set (0-100)
-   <code>dimSpeed</code> (optional) is the dimming speed to use (0-15)
-   <code>callback</code> (optional) callback function to call when action has been performed

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.5 (2022-02-12)

-   (matthsc) don't always terminate adapter on errors while updating identities
-   (matthsc) improve error messages

### 0.1.4 (2022-01-25)

-   (matthsc) fix double decryption issues with password in adapter admin
-   (matthsc) change input field types in adapter admin

### 0.1.3 (2022-01-16)

-   (matthsc) improve error messages

### 0.1.2 (2022-01-07)

-   (matthsc) catch authentication errors
-   (matthsc) fix authentication
-   (matthsc) remove build folders from git

### 0.1.1 (2022-01-01)

-   (matthsc) implement adapter review feedback

### 0.1.0 (2021-12-30)

-   (matthsc) initial release

## License

MIT License

Copyright (c) 2022 matthsc <matthsc@gmx.net>

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
