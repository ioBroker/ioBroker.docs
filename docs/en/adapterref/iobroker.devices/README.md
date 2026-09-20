![Logo](admin/devices.svg)
# ioBroker.devices

![Number of Installations](http://iobroker.live/badges/devices-installed.svg)
![Number of Installations](http://iobroker.live/badges/devices-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.devices.svg)](https://www.npmjs.com/package/iobroker.devices)

![Test and Release](https://github.com/ioBroker/iobroker.devices/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/devices/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.devices.svg)](https://www.npmjs.com/package/iobroker.devices)

## Device adapter for ioBroker

Manage and create devices for using it in other adapters like material, iot, matter...

**Important: enable tab in admin, like log and scripts**

![Screen](img/screen.png)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information on how to disable the error reporting, see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

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
It adds automatic roles, units and names to the states.

#### Simplified Maintenance
The `ioBroker.devices` adapter allows users to create virtual devices that can be easily remapped to different physical devices.
This means that if you change a physical device, you don't need to update your scripts, visualizations or history settings; you just need to remap the data points in the adapter.

#### Enhanced Compatibility
The adapter knows what the devices should look like and how to use them. It creates a virtual device with the same structure as the physical device, making it easier to integrate with other adapters.

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
- Optionally, assign a Category (e.g., Lighting, Heating) for the organization.

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

For every state, you can provide all settings that aliases support:
- Different states for read and write
- Convert formula for read and write

#### Managing Devices
Edit Device: In the Devices tab, click the pencil icon next to a device to modify its name, type, category, color, name, icon or data point mappings.

Delete Device: Click the trash can icon to remove a virtual device. This does not affect the physical device or its adapter.

Organize Devices: Use categories to group devices (e.g., "Lighting", "Heating") for easier management in visualizations.

## Type of devices
This adapter is built with the help of `type-detector`. All possible devices could be found [here](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md) 

## Video
[![Video](https://img.youtube.com/vi/0Aecm5YAk7M/0.jpg)](https://www.youtube.com/watch?v=0Aecm5YAk7M)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 4.2.2 (2026-09-17)
* (@GermanBluefox) Sliders, dials and swipeable tiles in the widget GUI no longer change their value when a finger only scrolls the page across them. A touch becomes a drag when it starts sideways or after the finger has rested for a moment; a touch the browser takes over for scrolling changes nothing
* (@GermanBluefox) Tooltips no longer catch the mouse: they close as soon as the pointer leaves the control and do not block clicks on what lies underneath
* (@krobipd) Cancel in the editor that opens right after creating a device now removes the new device again, together with its states and its room and function assignments. Save is enabled right away, so a new device can be kept without changing anything
* (@krobipd) Fixed the devices tab staying on its loading spinner when a device without mandatory states (e.g. a chart of the echarts adapter) is assigned to a room or function
* (@krobipd) Fixed the import grouped by room or function stopping halfway when a room or function object is not found
* (@krobipd) Fixed the value list editor: "+" no longer adds a "NaN" row to a list of text values, dragging a row moves it instead of swapping two rows, and OK is only enabled after a change
* (@krobipd) The search now finds a device by its name regardless of upper and lower case
* (@krobipd) Fixed device icons that are stored as a bare file name not being shown in the device list
* (@krobipd) The folders are expanded when the device list is opened for the first time, instead of all being collapsed
* (@krobipd) The warning about the web instance configuration is no longer logged when no web instance is installed
* (@krobipd) The widget notification timer is cleared when the adapter stops, so it does not stay behind in compact mode
* (@GermanBluefox) The build takes the version of the GUI packages from the adapter's `package.json`, and `common.welcomeScreen` is written as the array the current io-package schema expects

### 4.2.1 (2026-09-09)
* (@GermanBluefox) Fixed layout

### 4.2.0 (2026-08-28)
* (@GermanBluefox) The devices of this adapter are now reachable in the ioBroker Device Manager: each one appears as a card with its name, icon, battery and reachability. Readings are shown on the card itself, and only states that can actually be operated become controls (switch, slider, select), so a read-only device has no control button at all. A control writes to the command state but reads from its feedback partner where the device has one, so a switch shows what the device reports rather than what it was last told. The instance already advertised Device Manager support, but answered none of its requests
* (@GermanBluefox) Added the "Clean Light" theme: white cards on a light grey page with coloured icons, where a tile stays white when its device is on and only the label and the toggle turn blue
* (@GermanBluefox) Added the "Tech Blue" theme: near-black tiles set apart by a lit blue outline, with monochrome blue icons and toggles
* (@krobipd) Fixed "Create new folder" only showing a white screen since 4.0.0 (#679)
* (@krobipd) Fixed the room column filter emptying the device list: it showed the function filter's value and wrote the picked room into the function filter (#680)
* (@krobipd) Fixed an added state being deleted when it was edited without renaming it (#360)
* (@krobipd) Moving, renaming or copying a device no longer deletes the original when the copy failed halfway through (#151, #513)
* (@GermanBluefox) A failed copy is only cleaned up when its target path was free beforehand, so renaming a device onto an existing name cannot delete that device's objects
* (@krobipd) Manually added states are now deleted together with their device, instead of staying behind as ghost objects after a move, rename or delete (#684)
* (@krobipd) Cancel in the device editor now really cancels: deleting a state and picking a device icon are applied on Save instead of the moment they are clicked
* (@krobipd) The read/write function preview shows boolean results and reports an invalid formula, instead of staying empty in both cases (#683)
* (@krobipd) A string-typed alias no longer inherits `min`/`max`/`step` from its source, which made js-controller warn about an invalid object on every check (#682)
* (@GermanBluefox) An alias or linked state now takes its type from the source wherever the device type allows more than one, so a thermostat or air conditioner that spells its modes out instead of numbering them is no longer written back as a number (#614). Needs the matching `@iobroker/type-detector` release
* (@krobipd) A linkeddevices state now inherits the real range of its source instead of a hard 0...100, so a linked thermostat no longer shows 0...100 instead of e.g. 5...35
* (@krobipd) `TreeView.getDerivedStateFromProps` returns its derived state instead of mutating the state it was handed, which React 19 does not guarantee to keep

### 4.1.1 (2026-08-17)
* (@GermanBluefox) Fixed states being written without `common.read` and `common.write`, which every state object must carry: the "add state" dialog left both out for the deprecated `file` type, and dropped them from any state it edited that did not have them yet (#535, #533, #463)
* (@GermanBluefox) States written by earlier versions have the two attributes added once when the device list is loaded. What is missing is taken from the device type and from the aliased source, so a state the device really can write does not turn read-only

### 4.1.0 (2026-08-16)
* (@Apollon77) Added support for new device types
* (@GermanBluefox) Datapoints added to an alias device by hand now reach the widget GUI, so a tank can show the litres it has left next to its fill level
* (@GermanBluefox) The tank tile shows that second reading where it used to print its fill level a second time
* (@GermanBluefox) Fixed the settings button of a 2x0.5 tank tile sitting in the middle of the tile instead of in its top-right corner

## License
MIT License

Copyright (c) 2019-2026 bluefox <dogafox@gmail.com>

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