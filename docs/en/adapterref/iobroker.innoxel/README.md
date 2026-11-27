![Logo](admin/innoxel.png)

# ioBroker.innoxel

Adapter for Innoxel Master 3 (https://innoxel.ch)

![node](https://img.shields.io/node/v-lts/iobroker.innoxel)
[![NPM version](https://img.shields.io/npm/v/iobroker.innoxel.svg)](https://www.npmjs.com/package/iobroker.innoxel)
[![Downloads](https://img.shields.io/npm/dm/iobroker.innoxel.svg)](https://www.npmjs.com/package/iobroker.innoxel)
[![license](https://img.shields.io/npm/l/iobroker.innoxel)](LICENSE)

![Number of Installations](https://iobroker.live/badges/innoxel-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/innoxel-stable.svg)

![Test and Release](https://github.com/matthsc/ioBroker.innoxel/workflows/Test%20and%20Release/badge.svg)

## Requirements

- NodeJS >= 22.x
- js-controller >= 6.0.11, with admin >= 7.6.20
- Innoxel Master 3 Smart Home system

## Installation

The adapter can be installed straight from the stable/beta repositories. After installation, create a new instance and configure the settings:

- Connection Settings for accessing innoxel master
  - ip address
  - port
  - username
  - password
  - you can verify the credentials using the "Test Connection" button once the instance is running
- Polling intervals for different areas
  - state changes (i.e. switches, dimmer)
  - room climate / thermostats
  - weather
  - innoxel master device details (requires admin privileges for the user connecting to innoxel master)

Please note: Don't install the adapter directly from Github, this will lead to an error on adapter start ("cannot find start file").

## Supported Modules and Firmware

A pre-release version of this adapter has been working for more than 2 years with firmware 1.4.1.0 and then 1.5.1.0.

The initially released version has been tested with firmware 1.6.0.0.

The following modules have been tested/are supported:

- Innoxel Master 3
- Switch 8 G1
- Motor 4 x 230 VAC G1
- Dim 4 x 600 VA
- Taster RGB
- Thermo
- Wetterstation P03/3-RS485-CET

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

- `moduleId` is the id/address of the "Taster"
- `channelId` is the index of the button on the "Taster"
- `callback` (optional) callback function to call when action has been performed

### setDimValue

Set the brightness of a dimmer channel.

```ts
sendTo(
  "innoxel.0",
  "setDimValue",
  "<moduleId>:<channelId>:<dimValue>:<dimSpeed>",
  callback
);

// i.e. to set the value of channel 7 on dim module 1 to 80%
sendTo("innoxel.0", "setDimValue", "1:7:80");
sendTo("innoxel.0", "setDimValue", "1:7:80", () => {
  // do something after value has been set
});
```

- `moduleId` is the id/address of the dimmer module
- `channelId` is the channel of the dimmer on the module
- `dimValue` is the value in percent to set (0-100)
- `dimSpeed` (optional) is the dimming speed to use (0-15)
- `callback` (optional) callback function to call when action has been performed

### setTemperature

Set heating or cooling temperature.

```ts
sendTo(
  "innoxel.0",
  "setTemperature",
  "<moduleId>:<temperatureType>:<temperature>",
  callback
);

// i.e. to set setTemperatureHeating to 20° on room climate module 0
sendTo("innoxel.0", "setTemperature", "0:setTemperatureHeating:20");
sendTo("innoxel.0", "setTemperature", "0:setTemperatureHeating:20", () => {
  // do something after the temperature has been set
});
```

- `moduleId` is the id/address of the room climate module
- `temperatureType` is the temperature type to set (`absenceSetbackTemperatureCooling`, `absenceSetbackTemperatureHeating`, `nightSetbackTemperatureCooling`, `nightSetbackTemperatureHeating`, `setTemperatureCooling`, `setTemperatureHeating`)
- `temperature` temperature to set, in 0.5° steps. There's also a min/max value depending on type
- `callback` (optional) callback function to call when action has been performed

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.1.1 (2026-11-24)
- (matthsc) update column sizes for static text in admin

### 2.1.0 (2026-11-24)
- (matthsc) call callbacks in onMessage
- (matthsc) add connection test button to admin
- (matthsc) make transient connection errors more resilient
- (matthsc) fix precipitation state, add rain state
- (matthsc & dependabot & iobroker bot) dependency updates and cleanups

### 2.0.0 (2026-05-16)
- (matthsc) implement adapter checker feedback and create-adapter migrations
- (copilot) Adapter requires node.js >= 22 now
- (matthsc & dependabot) dependency updates

## License

MIT License

Copyright (c) 2024-2026 matthsc <matthsc@gmx.net>

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