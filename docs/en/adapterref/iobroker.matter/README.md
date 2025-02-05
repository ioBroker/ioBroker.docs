![Logo](admin/matter.svg)
# ioBroker Matter Adapter

![Number of Installations](http://iobroker.live/badges/matter-installed.svg)
![Number of Installations](http://iobroker.live/badges/matter-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.matter.svg)](https://www.npmjs.com/package/iobroker.matter)

![Test and Release](https://github.com/ioBroker/ioBroker.matter/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/matter/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.matter.svg)](https://www.npmjs.com/package/iobroker.matter)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!
Sentry reporting is used starting with js-controller 3.0.

## Introduction
> [!Important]
> The adapter can NOT be installed via GitHub: The adapter must be installed via the ioBroker repository (stable or latest).
> 
> Currently the adapter is in the BETA phase and only available in latest repository. Please check [iobroker documentation](https://www.iobroker.net/#de/documentation/basics/repositories.md) how to install an adapter from latest repository/npm.
>
> A detailed description of the configuration and use of the ioBroker Matter adapter is described in the 🇩🇪 [german Wiki](https://github.com/ioBroker/ioBroker.matter/wiki) and 🇬🇧 [english Wiki](https://github.com/ioBroker/ioBroker.matter/wiki/Home-%E2%80%90-EN).
> 
> Please read the [Important notes](https://github.com/ioBroker/ioBroker.matter/wiki/Einleitung-und-wichtige-Hinweise#wichtige-hinweise-bitte-dringend-beachten) before using the adapter.

## Description
With the ioBroker Matter Adapter, it is possible to map the following use cases:
* Matter-based devices can be linked directly to ioBroker and thus read in / controlled
* The provision of multiple ioBroker devices as a Matter Bridge: Matter Bridges can contain multiple devices and are the easiest way to integrate ioBroker devices into a Matter-compatible ecosystem.
* ioBroker provides individual virtual Matter devices based on ioBroker devices / ioBroker states, which can be taught to a Matter-compatible ecosystem (currently only bridges are possible for Amazon Alexa)

## ToDo
* Texts are partially in english
* Sync min/max from Matter into ioBroker objects
* Cleanup objects when devices/states are removed
* ioBroker device types
  * (3+) vacuumCleaner
  * (3) volume, volumeGroup
  * (-3) airCondition
  * (2+) fireAlarm
  * (-2) mediaPlayer
  * warning - how?
  * gate - aka blinds because matter has no other device type?
  * windowTilt - as discussed as composed device with two contact sensors ... one for open close and one for tilt
  * levelSlider - ideally as non-lighting dimmed socket?
* Matter device types
  * (7) Fan -> airCondition?
  * (4+) Air Quality Sensor -> ???
  * (4+) Air Purifier -> ???
  * (4) Pump -> ???
  * (4) Pressure Sensor -> ??? DEF
  * (3+) Robot Vacuum cleaner -> vacuumCleaner
  * (3) Flow Sensor -> ??? DEF
  * (3) Room Air Conditioner -> airCondition
  * (2+) Dishwasher-> ???
  * (2) Basic Video Player -> mediaPlayer
  * (2) Laundry Washer -> ???
  * (2) Refrigerator -> ???
  * (2) Temperature Controlled Cabinet -> ???
  * (2) Water Freeze Detector -> warning?
  * (2) Rain Sensor -> warning?
  * (2) Water Valve -> ???
  * (2) Laundry Dryer -> ???
  * (2) Oven -> ???
  * (2) Cooktop -> ???
  * (2) Cook Surface -> ???
  * (2) Extractor Hood -> ???
  * (2) Microwave Oven -> ???
  * (1+) Electrical Vehicle Supply Equipment -> ???
  * (0) Water Heater -> ???
  * (0) Solar Power -> ???
  * (0) Battery Storage -> ???
  * (0) Heat Pump -> ???

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 0.4.13 (2025-02-01)
* (@Apollon77) Added support for Door state feature for Devices and Controllers
* (@Apollon77) Fixed Thermostat creation with Boost state

### 0.4.12 (2025-02-01)
* (@GermanBluefox) Added the "copy to clipboard" button in the debug dialog
* (@Apollon77) Updated matter.js with performance and Memory usage optimizations (and Tasmota pairing workaround)
* (@Apollon77) Reworked Type detection in Backend and for Channel/Device detection type in UI, now multiple devicetypes are offered with most complex one pre-selected
* (@Apollon77) Handle Matter ColorTemperature Lights as a Color capable light to also allow CT-Lights with Hue support
* (@Apollon77) Added BOOST endpoint as switch when exposing Thermostats with Boost state
* (@Apollon77) Optimized some dimmer/level management for light devices without dimmer state

### 0.4.11 (2025-01-28)
* (@Apollon77) Fixed caching issues in device type detection in backend
* (@Apollon77) Added Debug info icon for Devices and Bridges

### 0.4.10 (2025-01-27)
* (@Apollon77) Fixed Thermostat limit initialization and Mode error
* (@Apollon77) Fixed Matter Event handling when mapped to an ioBroker state (e.g.GenericSwitch)
* (@Apollon77) Fixed Device type detection by really preferring the preferred type

### 0.4.9 (2025-01-26)
* (@Apollon77) Enhanced error and invalid devices display for UI
* (@Apollon77) Fixed Button Press Controller support
* (@Apollon77) Added support to also select folders when adding devices
* (@Apollon77) Fixed Illuminance State type min/max

### 0.4.8 (2025-01-26)
* (@Apollon77) Acknowledges Power states also on SET states
* (@Apollon77) Fixed Color Temperature handling for devices
* (@Apollon77) Fixed Thermostat setpoint logic

### 0.4.7 (2025-01-25)
* (@Apollon77) Added debouncing when controllers change temperature value to makle sure not to overload the device
* (@Apollon77) Added support for step and use 0.5 for Setpoint temperatures
* (@Apollon77) Added support fur Hue lights without saturation state

### 0.4.6 (2025-01-25)
* (@GermanBluefox) Optimized UI
* (@GermanBluefox) Added user feedback when device or bridged device is identified
* (@Apollon77) Fixes Thermostat logic for devices
* (@Apollon77) Ensures information are pushed to the UI when devices are in an error state

### 0.4.5 (2025-01-25)
* (@Apollon77) Fixed Thermostat initialization logic and added more logging
* (@Apollon77) Fixed WindowCovering level to match ioBroker definition
* (@Apollon77) Updated matter.js for further optimizations

### 0.4.4 (2025-01-24)
* (@Apollon77) Added OPEN state for all Door Locks to open door again
* (@Apollon77) Fixed Thermostat initialization when no AUTO mode is supported
* (@Apollon77) Enhanced Enum state display in UI

### 0.4.3 (2025-01-24)
* (@GermanBluefox) Optimized UI
* (@Apollon77) Allows turning light on/off via the dimming level as Zigbee adapter does
* (@Apollon77) Detects Switch changes via event which should be more reliable
* (@Apollon77) Optimizes some Node information

### 0.4.2 (2025-01-23)
* (@Apollon77) Added SmokeCO2Alarm -> FireAlarm to Controller device types
* (@Apollon77) Detects BLE only QR codes and responds with an error message
* (@Apollon77) For Dimming and Color changes direct the device to execute the changes also when a device is off

### 0.4.1 (2025-01-22)
* (@GermanBluefox) Optimized UI
* (@Apollon77) Improved handling for Power Source cluster on root endpoint
* (@Apollon77) Changed Identify handling - Light will be turned on/off, others just logged

### 0.4.0 (2025-01-20)
* (@Apollon77) "SET" states are no longer updated when Actual states are present and get updated!
* (@Apollon77) Initializes states also with "ack=false" states because better than no initial values
* (@Apollon77) Added Device support for Window Coverings (Blinds, Blindbuttons), Color Lights (Cie, Hie, Rgb, Rgbw, RgbSingle, RgbwSingle) and Thermostats
* (@Apollon77) Makes sure to track state values also when disabled and update state to Matter when enabled again
* (@Apollon77) Makes sure to also subscribe to write-only states for controller cases
* (@Apollon77) Only exposes remaining battery percentage attribute when value is present
* (@Apollon77) Corrected error display and pushing to UI in case of initialization errors of bridged devices
* (@Apollon77) Added RSSI value also for Thread devices
* (@Apollon77) Optimized and fixed multiple things

### 0.3.7 (2025-01-15)
* (@GermanBluefox) Showed the device name in paring dialog
* (@GermanBluefox/Apollon77) Adjusts connection type icons
* (@Apollon77) Optimized the discovery dialog handling
* (@Apollon77) Fixed Thermostat for Controller to update temperatures
* (@Apollon77) Gives Energy sensors a dedicated icon
* (@Apollon77) Optimized and fixed multiple things

### 0.3.6 (2025-01-13)
* (@GermanBluefox) Fixed GUI errors
* (@GermanBluefox/@Apollon77) Added possibility to enable/disable controlled nodes
* (@Apollon77) Added Information on battery and rssi for DM tile
* (@Apollon77) Added controller support for Color Lights, Speaker, Thermostats and Window coverings
* (@Apollon77) Optimized and fixed multiple things

### 0.3.5 (2025-01-09)
* (@GermanBluefox) Fixed GUI errors
* (@GermanBluefox) Added `Controller fabric label` to configuration
* (@GermanBluefox) Added solution for QR-Code scanning on non HTTPS pages
* (@Apollon77) Fixed Generic Switch Device type for controller
* (@Apollon77) Fixed Controller BLE initialization and activation
* (@Apollon77) Added serialNumber to all devices and bridges for better device re-detection by controllers

### 0.3.4 (2024-12-31)
* (@Apollon77) Updates matter.js to address several issues
* (@GermanBluefox) Optimized UI

### 0.3.3 (2024-12-28)
* (@Apollon77) Allows triggering commands via matter also when the state already matches the value
* (@Apollon77) Sets and updates the fabric label for paired devices (default is "ioBroker matter.X")
* (@Apollon77) Detects state deletion for ioBroker devices and updates a device in UI to show device state
* (@Apollon77) Several optimizations on commissioning
* (@Apollon77) Do not show commissioning QR codes in ioBroker log
* (@Apollon77) Use Fabric label to try to detect if ioBroker is the controller
* (@Apollon77) Fixes displaying error details for devices and bridges
* (@Apollon77) Fixes the device and type detection logic

### 0.3.2 (2024-12-21)
* (@Apollon77) Fixes several discovery issues

### 0.3.1 (2024-12-20)
* (@Apollon77) Fixes bridge/device icon display in UI
* (@Apollon77) Prevents displaying warning dialogs when nothing is wrong
* (@Apollon77) Adjusts some logs

### 0.3.0 (2024-12-20)
* BREAKING: Please re-enter your ioBroker Pro Cloud Password!
* (@Apollon77) Made sure the adapter is stopped before being updated
* (@Apollon77) Optimizes device discovery and allows to stop it again

### 0.2.10 (2024-12-19)
* (@GermanBluefox) Makes the Adapter UI also available as standalone tab
* (@GermanBluefox) Added error details when adding the same state twice to a bridge or device
* (@Apollon77) Fixes discovery start in UI

### 0.2.9 (2024-12-18)
* (@Apollon77) When Get and set states are separated then also update set state with new values
* (@Apollon77) Node details dialog in controller now exposes some more Battery information
* (@Apollon77) Also exposes the battery states when features are set wrong on the device
* (@Apollon77) Fixes LightSensor state mapping
* (@Apollon77) Prevents errors when only some energy states exist
* (@Apollon77) Uses the IP provided by Android when commissioning devices if possible
* (@Apollon77) Restructure discovery to run in the background and not block the UI
* (@Apollon77) Exposes States for Enums for Matter nodes
* (@Apollon77) Prevent storage to delete wrong data when a node gets removed

### 0.2.8 (2024-12-17)
* (@GermanBluefox) Fixes progress dialog for DM - used when deleting a node
* (@GermanBluefox) Synchronizes the "do not ask again on delete" time with admin and set to 5 minutes
* (@GermanBluefox) Optimizes bridges display for different color schemes
* (@GermanBluefox) Allows to collapse the information blocks at the top of the pages
* (@GermanBluefox) Adds an ioBroker Logo when display commissioned controllers
* (@GermanBluefox/@apollon77) Adds additional details and error state also for devices and bridged devices
* (@GermanBluefox/@apollon77) Always display QR code to allow additional pairing for device and bridges from adapter UI
* (@GermanBluefox) Optimizes several messages nd approval dialogs
* (@GermanBluefox) Adds a welcome dialog for new users
* (@GermanBluefox) Adds user guidance for big unpaired bridges
* (@Apollon77) Adds Illuminance and Button/ButtonSensor (Switch) device type
* (@Apollon77) Changes/Optimizes naming structure for paired devices and sub-endpoints
* (@Apollon77) Adds information when Matter device types are not yet supported to look into objects for details
* (@Apollon77) Resets connection status when a controller node is disconnected, also on adapter stop
* (@Apollon77) Cleans up internal data structures when a node gets deleted for controller
* (@Apollon77) Uses the configured device type when finding multiple types in the backend
* (@Apollon77) Adjusts UI device type detection to differentiate between supported and other types
* (@Apollon77) Makes sure that controller configuration changes are executed sequentially
* (@Apollon77) Added Transition Time handling for Dimmer and Ct device types in both directions
* (@Apollon77) Added Low-Battery and Battery-percent for all device types in both directions
* (@Apollon77) Added Ethernet Network Commissioning Cluster to prevent issues with Tuya

### 0.2.7 (2024-12-08)
* (@Apollon77) Cleans up objects when a controller node is deleted
* (@Apollon77) Prevents controller configuration changes to be executed in parallel

### 0.2.6 (2024-12-06)
* (@Apollon77) Fixes ColorTemperature light initialization because of matter.js update

### 0.2.5 (2024-12-06)
* (@Apollon77) Sets the "no-compose" flag correctly to normally use composed if needed and adds it to a missing dialog
* (@Apollon77) Allows using null values if needed
* (@Apollon77) Fixes UNREACH handling for devices
* (@Apollon77) Fixes object change handling for controller
* (@Apollon77) Allows Bridges to expose its name as a device name
* (@Apollon77) Allows to rename controller nodes and devices

### 0.2.4 (2024-12-04)
* (@Apollon77) Shows a progress indicator when deleting controller nodes
* (@Apollon77) Cuts names and labels to 32 or 64 characters as needed by Matter
* (@Apollon77) Improves error handling on devices and bridges
* (@Apollon77) Clear storage when removing a bridged device
* (@Apollon77) Processes changed objects with a 5s delay to prevent too many changes at once
* (@Apollon77) Fixes version determination
* (@Apollon77) Initializes Device objects more lazily

### 0.2.3 (2024-11-30)
* (@Apollon77) Makes sure to delete all objects and stop device when a device is deleted in UI
* (@Apollon77) When a devices/bridge object is deleted and adapter runs we try to detect this and stop the device/bridge
* (@Apollon77) Optimizes close handling of adapter
* (@Apollon77) Uses adapter version as Software and Hardware versions in the exposed Matter devices
* (@Apollon77) Fixes "auto" flags in backend when make no sense in objects
* (@Apollon77) Fixes "auto" flag in UI
* (@Apollon77) Prevents cyclic state updates when a state is updated by the adapter to matter
* (@Apollon77) Log warnings when device optional device states are not mapped
* (@Apollon77) Hides Product-ID and VendorId fields in UI when adding devices into a bridge

### 0.2.2 (2024-11-28)
* (@Apollon77) Uses plain matter.js logs for better readability
* (@Apollon77) Prevents ghost connection entries in the UI
* (@Apollon77) Adds some missing implementations for Controller of Door, Window, FloodAlarm and Motion

### 0.2.1 (2024-11-27)
* (@Apollon77) Adds Color Temperature conversion if unit is "mireds"
* (@Apollon77) Fixes Color Temperature cluster initialization
* (@Apollon77) Fixes Min/Max calculation when unit conversion is used

### 0.2.0 (2024-11-26)
* IMPORTANT: Breaking change!! Please decommission ALL devices and do a full factory reset of the adapter Matter storage before installing this version. Pair the devices new afterward. 
* (@Apollon77) Finalizes Devices, Bridges and Controller functionality with a first set of 11 device types
* (@Apollon77) Upgrades to new Matter.js version and API (breaks storage structure)
* (@GermanBluefox) Moved build process of GUI to vite
* (@GermanBluefox) Added possibility to group devices in the GUI

### 0.1.13 (2023-12-01)
* (@GermanBluefox) Working on the controller

### 0.1.10 (2023-11-13)
* (@GermanBluefox) Implemented the factory reset and re-announcing

### 0.1.2 (2023-10-25)
* (@GermanBluefox) Devices were implemented

### 0.0.5 (2023-10-24)
* (@GermanBluefox) Fixed names under linux

### 0.0.4 (2023-10-24)
* (@GermanBluefox) used library `@iobroker/type-detector`

### 0.0.2 (2023-10-23)
* (@GermanBluefox) Initial commit

## License
Apache-2.0

Copyright (c) 2023-2025 Denis Haev <dogafox@gmail.com>
