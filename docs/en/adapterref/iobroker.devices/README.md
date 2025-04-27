![Logo](admin/devices.svg)
# ioBroker.devices

![Number of Installations](http://iobroker.live/badges/devices-installed.svg)
![Number of Installations](http://iobroker.live/badges/devices-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.devices.svg)](https://www.npmjs.com/package/iobroker.devices)

![Test and Release](https://github.com/ioBroker/iobroker.devices/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/devices/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.devices.svg)](https://www.npmjs.com/package/iobroker.devices)

## devices adapter for ioBroker

Manage and create devices for using it in other adapters like material, iot, matter...

**Important: enable tab in admin, like log and scripts**

![Screen](img/screen.png)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting, see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## ioBroker.devices Adapter User Manual

### Overview

The `ioBroker.devices` adapter is a component of the ioBroker smart home platform designed to simplify device management by creating and managing virtual devices.

These virtual devices provide a standardized interface for physical devices, making it easier to integrate, script, visualize, and control devices across different manufacturers and protocols.

The adapter ensures consistency in data point naming and structure, reducing the need to modify scripts or visualizations when hardware changes.

It wraps any collection of states in ioBroker (physical **or** virtual) into well‑formed **devices** with rich information:
* `type`, `role`, `smartName`, `color`, `room`, `function`, `icon`, `unit` and more

The result is consumed by dashboards (Material UI, VIS‑2), voice assistants (Alexa/Google), matter adapter, the **iot/cloud** adapter and scripts, giving you a clean, future‑proof object tree.

**Note:** The adapter does **not** poll hardware. It runs as a tab‑only “web” instance → zero CPU/RAM footprint.

### Purpose

The `ioBroker.devices` adapter serves the following purposes:
- Standardization: Creates virtual devices with consistent data point structures, regardless of the underlying hardware or protocol from different data points.
- Simplified Maintenance: Allows users to swap physical devices without updating scripts or visualizations by remapping data points in the adapter. 
- Enhanced Compatibility: Integrates seamlessly with visualization adapters (e.g., Material UI, VIS), IoT adapters (e.g., Alexa, Google Home).
- User-Friendly: Simplifies device management for beginners while offering flexibility for advanced users.

#### Standardization
Many adapters like mqtt, knx or similarly deliver data points with different names and structures. This adapter creates a virtual device with a consistent structure, making it easier to manage and visualize devices.
It adds automatically roles, units and names to the states.

#### Simplified Maintenance
The `ioBroker.devices` adapter allows users to create virtual devices that can be easily remapped to different physical devices.
This means that if you change a physical device, you don't need to update your scripts, visualizations or history settings; you just need to remap the data points in the adapter.

#### Enhanced Compatibility
The adapter knows how the devices should look like and how to use them. It creates a virtual device with the same structure as the physical device, making it easier to integrate with other adapters.

#### User-Friendly
The `ioBroker.devices` adapter is designed to be user-friendly, making it accessible for beginners while still offering advanced features for experienced users. The intuitive interface allows users to create and manage virtual devices without needing extensive technical knowledge.

## Configuration

Once installed, configure the adapter via the Devices tab in the ioBroker admin interface.

### Creating a Virtual Device

Open Devices Tab in admin.

#### Add Device

- Click the "+" button to create a new virtual device.
- Enter a Name for the device (e.g., "LivingRoomLight").
- Select a Device Type (e.g., Light, Switch, Thermostat) from the predefined list.
- Optionally, assign a Category (e.g., Lighting, Heating) for organization.

Map Data Points:

For each function (e.g., on/off, brightness), map the virtual device’s data point to the corresponding state of the physical device (e.g., `hm-rpc.0.12345.1.STATE` for a Homematic switch).

Use the interface to browse and select states from other adapters.

Save: Click "Save" to create the virtual device. It will appear under alias.0.<DeviceName> in the Objects tab.

#### Types of Devices

The `ioBroker.devices` adapter supports three main approaches to device creation:

1. Automatically Detected Devices

Some adapters (e.g., ioBroker.zigbee, ioBroker.hm-rpc) already provide a valid structure for the devices, and they will be detected automatically **if some category (function or room) is assigned**.
Without the assigned category, the automatically detected device will not be processed.

2. Linked Devices

Linked devices are virtual devices manually created to mirror a specific physical device’s data points with `ioBroker.linkeddevices`.

It is suggested to use `ioBroker.devices` and `alias.0` branch instead of `linkeddevices`.

3. Aliases

Aliases are lightweight virtual devices that act as shortcuts or simplified references to existing states without creating a full device structure.

You can create a new virtual device in a `alias.0` branch. By selecting the device type, you should fill all required states (marked with *). Optionally, you can add not required states (e.g., humidity by temperature sensor).
For every required state and filled optional state, the adapter creates a structure of aliases.
If you created e.g. a temperature device named `Temperature` and provided both states (temperature and humidity) you will find the following states and channel in `alias.0` branch:
- `alias.0.Temperature` - channel
- `alias.0.Temperature.temperature` - state with unit '°C'. It should have a virtual link to some real state with temperature. If you remove the alias in `ioBroker.devices` adapter, this state will stay without a link.
- `alias.0.Temperature.humidity` - state with unit '%'. This will have a virtual link to real state (e.g., to `hm-rpc.0.JHAGHGJJJ.1.HUMIDITY`). If you remove alias in `ioBroker.devices` adapter, this state will be deleted.

Almost every device type could have additional states (indicators) for battery, connectivity, error and some more else. They are optional, but some adapters (e.g., `material` or `matter`) could interpret it.

For every state, you can provide all settings, that aliases support:
- Different states for read and write
- Convert formula for read and write

#### Managing Devices
Edit Device: In the Devices tab, click the pencil icon next to a device to modify its name, type, category, color, name, icon or data point mappings.

Delete Device: Click the trash can icon to remove a virtual device. This does not affect the physical device or its adapter.

Organize Devices: Use categories to group devices (e.g., "Lighting", "Heating") for easier management in visualizations.

## Type of devices
This adapter is built with the help of `type-detector`. All possible devices could be found [here](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md) 

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.2.2 (2025-04-26)
* (@GermanBluefox) Corrected many GUI issues

### 1.2.1 (2025-04-22)
* (@GermanBluefox) Updated logo
* (@GermanBluefox) Updated type-detector

### 1.2.0 (2025-04-20)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Used vite
* (@GermanBluefox) Used eslint-config of ioBroker
* (@GermanBluefox) Rewritten to TypeScript and corrected all known bugs (Except extension requests)

### 1.1.5 (2023-06-06)
* (Garfonso) fixed: problem with editing imported states
* (Garfonso) fixed: warning
* (Garfonso) fixed: enabling iot again (without setting a custom smartName)
* (Garfonso) fixed: possible crash / typo in 1.1.3.

### 1.1.4 (2023-06-06)
* (bluefox) Updated packages

### 1.1.3 (2023-05-16)
* (bluefox) Better behavior of category selection

### 1.1.2 (2022-11-09)
* (Garfonso) corrected the double states in light devices
* (Garfonso) added CIE color type as equivalent to `rgbSingle` type

### 1.1.1 (2022-11-03)
* (bluefox) Corrected delete dialog
* (bluefox) Added ukrainian translation

### 1.1.0 (2022-09-27)
* (bluefox) Migrated GUI to v5

### 1.0.12 (2022-06-09)
* (bluefox) Allowed to work with devices behind reverse proxy
* (bluefox) Replaced the function icon

### 1.0.11 (2022-06-08)
* (bluefox) Updated some libraries

### 1.0.10 (2022-02-13)
* (bluefox) Corrected edit of folders
* (bluefox) Updated some libraries

### 1.0.9 (2021-07-11)
* (bluefox) Implement the narrow rows

### 1.0.8 (2021-07-04)
* (bluefox) Corrected creation of the devices

### 1.0.7 (2021-06-30)
* (bluefox) Corrected creation the folders

### 1.0.6 (2021-06-27)
* (bluefox) Implemented the filters

### 1.0.5 (2021-06-26)
* (bluefox) Implemented the edit of `states` parameter

### 1.0.4 (2021-06-08)
* (bluefox) Fixed some GUI errors

### 1.0.1 (2021-06-07)
* (bluefox) Added sentry

### 1.0.0 (2021-06-07)
* (bluefox) Added new devices

### 0.3.16 (2021-03-11)
* (bluefox) Fixed the error for IDs with the strange characters

### 0.3.15 (2020-12-13)
* (bluefox) Updated the select ID dialog

### 0.3.13 (2020-08-17)
* (bluefox) Fixed errors by optional states

### 0.3.12 (2020-08-16)
* (bluefox) added the vacuum cleaner

### 0.3.10 (2020-08-12)
* (bluefox) added the air conditioner

### 0.3.6 (2020-04-17)
* (Apollon77) Added Sentry error reporting for Frontend/React

### 0.3.5 (2020-04-17)
* (Apollon77) Fixed typo

### 0.3.4 (2020-03-24)
* (bluefox) Fixed error by device creation

### 0.3.2 (2020-02-09)
* (Apollon77) usage with all kinds of admin ports and reverse proxies optimized

### 0.3.1 (2020-02-09)
* (Apollon77) compatibility with Admin >4.0.0 added

### 0.2.0 (2019-12-20)
* (bluefox) Backend was removed

### 0.1.8 (2019-11-13)
* (bluefox) Allowed the clone of devices

### 0.1.7 (2019-09-15)
* (bluefox) work in progress

### 0.1.2 (2019-09-04)
* (bluefox) work in progress

### 0.1.0 (2019-08-31)
* (bluefox) initial release

## License
MIT License

Copyright (c) 2019-2025 bluefox <dogafox@gmail.com>

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
