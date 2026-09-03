![Logo](admin/matter.svg)
# ioBroker Matter Adapter

![Number of Installations](http://iobroker.live/badges/matter-installed.svg)
![Number of Installations](http://iobroker.live/badges/matter-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.matter.svg)](https://www.npmjs.com/package/iobroker.matter)

![Test and Release](https://github.com/ioBroker/ioBroker.matter/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/matter/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.matter.svg)](https://www.npmjs.com/package/iobroker.matter)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting, see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!
Sentry reporting is used starting with js-controller 3.0.

## Introduction
> [!Important]
> The adapter CANNOT be installed via GitHub: The adapter must be installed via the ioBroker repository (stable or latest).
>
> A detailed description of the configuration and use of the ioBroker Matter adapter is described in the 🇩🇪 [german Wiki](https://github.com/ioBroker/ioBroker.matter/wiki) and 🇬🇧 [english Wiki](https://github.com/ioBroker/ioBroker.matter/wiki/Home-%E2%80%90-EN).
> 
> Please read the [Important notes](https://github.com/ioBroker/ioBroker.matter/wiki/Einleitung-und-wichtige-Hinweise#wichtige-hinweise-bitte-dringend-beachten) before using the adapter.

## Description
With the ioBroker Matter Adapter, it is possible to map the following use cases:
* Matter-based devices can be linked directly to ioBroker and thus read in / controlled
* The provision of multiple ioBroker devices as a Matter Bridge: Matter Bridges can contain multiple devices and are the easiest way to integrate ioBroker devices into a Matter-compatible ecosystem.
* ioBroker provides individual virtual Matter devices based on ioBroker devices / ioBroker states, which can be taught to a Matter-compatible ecosystem (currently only bridges are possible for Amazon Alexa)

## OTA Updates (Over-The-Air)

The Matter adapter supports firmware updates for devices connected via the Controller, allowing you to update Matter devices directly through ioBroker.

### Basic Usage

When an update is available, an **update icon** appears next to the device in the Controller panel. Updates are checked once a day and initially approx 10-15 minutes after the adapter start.

**To update a device:**
1. Open the **Controller panel** for the Matter adapter
2. Click the **update action** on the device with the update icon
3. Review the update information (if shown) and click **Update now**

**Update phases:**
- **Querying** → **Downloading** (shows %) → **Applying**

You can cancel during Querying/Downloading. Once Applying starts, the update cannot be cancelled. After completion, the device restarts automatically (may take several minutes).

> **Tip**: Updates can appear stuck during download – this is normal, especially for Thread devices. Be patient.

### Official Updates

The adapter automatically checks for certified firmware from the [Distributed Compliance Ledger (DCL)](https://webui.dcl.csa-iot.org/) - the official Matter certification database. No configuration required.

### Custom OTA Updates (Advanced)

For testing pre-release or community firmware:

> **Warning**: Custom updates bypass certification. Only use firmware from trusted sources.

**Setup:**
1. Go to **General** tab → **Custom OTA Updates** section
2. Enable **Allow custom/unofficial OTA updates**
3. Optionally set a custom path (default: `<instance data>/custom-ota`)
4. The path will be created on the next restart of the adapter if not already existing

**Adding files:**
- Place `.ota` files in the custom updates directory
- Click **Import updates now** to scan for new files (Files are imported on adapter start automatically once)
- The adapter extracts vendor/product IDs from file headers automatically and validates the files.

## ToDo
* Texts are partially in english
* Sync min/max from Matter into ioBroker objects
* Cleanup objects when devices/states are removed
* ioBroker device types
  * (6) vacuumCleaner
  * (7) fireAlarm
  * (5) mediaPlayer
  * warning - how?
  * gate - aka blinds because matter has no other device type?
  * windowTilt - as discussed as composed device with two contact sensors ... one for open close and one for tilt
  * levelSlider - ideally as non-lighting dimmed socket?
* Matter device types
  * (5+) Dishwasher-> ???
  * (4+) Basic Video Player -> mediaPlayer
  * (4+) Laundry Washer -> ???
  * (4) Refrigerator -> ???
  * (4) Temperature Controlled Cabinet -> ???
  * (2+) Water Freeze Detector -> warning?
  * (2+) Rain Sensor -> warning?
  * (2) Water Valve -> ???
  * (2) Laundry Dryer -> ???
  * (2) Oven -> ???
  * (2) Cooktop -> ???
  * (2) Cook Surface -> ???
  * (2) Extractor Hood -> ???
  * (2) Microwave Oven -> ???
  * (2) Electrical Vehicle Supply Equipment -> ???
  * (2) Water Heater -> ???
  * (1+) Solar Power -> ???
  * (1+) Battery Storage -> ???
  * (1+) Heat Pump -> ???

## Device Mapping Notes

### Air Conditioner (ioBroker `airCondition` ⇄ Matter Room Air Conditioner)

Some ioBroker air conditioner capabilities have no direct Matter equivalent. When exposing an ioBroker device to Matter these are mapped as follows:

* `MODE` `ECO` → Matter has no Eco system mode, controlled as `Auto`.
* `SPEED` `QUIET` → Matter has no Quiet fan mode, controlled as `Low`.
* `SPEED` `TURBO` → Matter has no Turbo fan mode, controlled as `High`.
* `SWING` `AUTO` → Matter has no Auto swing, mapped to rocking enabled.
* `BOOST` → Matter Room Air Conditioner has no boost cluster, exposed as an additional On/Off endpoint.

## Development

### Updating Dependencies

When updating project dependencies (in both the root `package.json` and `src-admin/package.json`), always use the following command:

```bash
npm run npm
```

This command updates dependencies in both the main project and the admin frontend, ensuring `package-lock.json` files are properly synchronized.

### Running Tests

All tests are written in TypeScript and executed directly without compilation:

```bash
npm test
```

Tests are located in the `test/` directory and use ts-node for direct TypeScript execution.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### **WORK IN PROGRESS**
* (@Apollon77) **IMPORTANT:** Node.js 22 is now the minimum required version
* (@Apollon77) Matter robotic vacuum cleaners are now mapped to the ioBroker vacuumCleaner device type in controller mode, including run mode, cleaning mode, operational state and phase, cleaning progress and the pause and go-home commands
* (@Apollon77) ioBroker vacuum cleaners can now be exposed to Matter as a robotic vacuum cleaner in bridge and device mode, with the run mode, cleaning mode, operational state and the pause and go-home commands. The cleaning phase and progress are not exposed in this direction, because Matter reports them per cleaning area and an ioBroker vacuum cleaner does not know its areas
* (@Apollon77) Fixed several ioBroker states of a controller device never updating after the first read, because two states reading one Matter attribute silently replaced each other. This affected the actual-value states of lights, plugs, dimmers, locks and speakers
* (@Apollon77) Fixed the Device Manager rendering every enum and text state of a device as a number field
* (@Apollon77) Sensors a Matter device exposes on child endpoints, such as the air quality, temperature and humidity of an air purifier, are now mapped as own ioBroker devices in controller mode
* (@Apollon77) The raw Matter cluster data of such a child endpoint is now created below its own object only; the second copy below its parent, which was never updated again, is removed on the next start
* (@Apollon77) Updated the type detector to v6, so the new device types it detects (air purifier, air quality, CO alarm, contact, electricity, fan, flow, pressure and pump) are recognized
* (@Apollon77) Fan, air purifier, air quality, contact, flow, pressure and pump devices can now be exposed to Matter in bridge and device mode
* (@Apollon77) Matter fan, air purifier, air quality, flow, pressure and pump devices are now mapped to their ioBroker device types in controller mode
* (@Apollon77) Fixed smoke alarms without their own power source failing to map in controller mode
* (@Apollon77) A smoke or CO alarm that reports its battery on the node's root endpoint now combines the alarm's own battery warning with the power source's charge level, instead of falling back to the charge level alone
* (@Apollon77) Air quality readings are now converted between the unit a device reports and the unit the state declares, in both directions, so a sensor reporting a concentration in milligrams per cubic metre or in parts per billion no longer lands a thousand times off
* (@Apollon77) Pressure and flow readings are converted from the unit the ioBroker state declares, so a sensor in Pa, kPa, bar, mmHg, inHg, psi or in litres per minute is no longer exposed to Matter at the wrong scale
* (@Apollon77) Fixed a written value being remembered in the unit of the ioBroker object rather than the unit the adapter works in, so a current written in amperes was read back a thousand times too high until the device reported again
* (@Apollon77) Fixed an error being logged for every Matter attribute that carries no value yet, such as the start-up level and colour temperature of a light; the state is now simply empty
* (@Apollon77) A Matter fan without an on/off cluster now gets a power state derived from its fan mode, so it can be switched from ioBroker
* (@Apollon77) Fixed adding one of the newly supported device types from a single state, which named that state wrongly and left the device without its required value
* (@Apollon77) The controller mapping is now covered by an integration test that commissions a real Matter bridge, and it runs in CI
* (@Apollon77) The bridge mapping is now covered by a test that replays an exported ioBroker object tree - aliases included - through the type detector and the to-matter converters, and pins the resulting Matter endpoints
* (@Apollon77) The bridge mapping test also covers the device types the type detector added, and logs one line per device so a CI run shows which of them were mapped and to which Matter device types
* (@Apollon77) The controller mapping test now also runs the ioBroker type detector over the states a Matter device creates, so every mapped device is pinned to the ioBroker device type those states describe, including the few where they describe none
* (@Apollon77) Fixed a single-state RGB or RGBW device disappearing from a bridge when its colour state holds a value that is not a hex colour, such as an empty string; an unreadable colour is now reported once per value instead of on every change
* (@Apollon77) **IMPORTANT:** Fixed the type detection never retrying without the configured type restriction. The retry handed the detector the options object the first attempt had already used, and the detector caches its pattern list and its checked patterns there, so the retry could only ever report nothing. A device whose states do not describe the type it is configured as is now detected as what those states do describe, which is reported as a type mismatch instead of passing silently. Such a device is still exposed as its single configured state, but check the log after updating: a bridge that mixes up a device type now says so
* (@Apollon77) Fixed a bridged device staying in the bridge when its initialization failed, where it answered controllers with cluster defaults and no ioBroker state behind them; it is now removed from the bridge, as it already was when adding its endpoints failed
* (@Apollon77) Fixed adding a single-state RGB or RGBW device, which named its state CIE or RGB instead of RGB or RGBW and so left the device without the state it needs
* (@Apollon77) A thermostat or air conditioner detected only through its heating or cooling setpoint now declares the matching Matter capability, so its setpoint works instead of sitting at the cluster default. Devices already commissioned before this change may need to be re-added in ecosystems that cache the capability set
* (@Apollon77) Fixed a rejected state write leaving the rejected value cached, and the Device Manager showing a value against the wrong unit
* (@Apollon77) A bridged thermostat whose ioBroker state declares no temperature range no longer reports a 7 to 30 degree limit to Matter, so setpoints the device itself accepts are no longer rejected
* (@Apollon77) Fixed the electrical frequency of bridged devices being reported ten times too low after its first change
* (@Apollon77) Fixed a boolean written to a numeric state becoming an invalid value instead of 1 or 0
* (@Apollon77) The ioBroker device model now covers the new states type detector v6 exposes on existing device types, such as signal strength, on-time countdown, separate heating and cooling setpoints, valve position, filter condition and alarm severity
* (@Apollon77) Fixed several memory leaks: ioBroker device instances that were built but not adopted stayed registered with the state subscription manager, and listeners, timers, pending locks and custom state bookkeeping were not always released on teardown
* (@Apollon77) Network visualization data is no longer assembled, and neither it nor Thread diagnostics data is serialized and sent, while no admin UI is listening
* (@Apollon77) Add support for the Room Air Conditioner device type (controller and bridge/device mode) mapped to the ioBroker airCondition type
* (@Apollon77) Fix Thermostat cooling setpoint changes from Matter being applied as heating setpoint
* (@Apollon77) Add a request timeout to the license verification API calls
* (@Apollon77) Ensure Matter hundredths values are integer-encoded and fix Boost on/off coercion and initial sync for Thermostat/Air Conditioner devices
* (@Apollon77) Added Battery Saver Mode (Matter LIT ICD) management for controller nodes: a status indicator on the device card and a dialog to switch modes, with a resync option for a device stuck offline
* (@Apollon77) Long Idle Time devices no longer delay periodic processing of the other nodes
* (@Apollon77) Thread topology data is refreshed periodically, so the network visualization no longer drifts on a long running adapter
* (@Apollon77) Added automatic time synchronization for controller nodes that support the Matter TimeSynchronization cluster (can be disabled in the settings)
* (@Apollon77) Added Enhanced Thread diagnostics (tries to get data from BRs when credentials are known or REST API is available)
* (@Apollon77) Added options to store multiple Thread and WiFi credentials to use in commissioning and Visualization
* (@Apollon77) Optimizations and Improvements for the Thread and WiFi visualizations
* (@Apollon77) Updated matter.js to 0.17.9 
* (@GermanBluefox) Updated GUI to React 19

### 1.3.1 (2026-07-23)
* (@Apollon77) Fix Attribute Polling
* (@Apollon77) Fix Commissioning of new nodes

### 1.3.0 (2026-07-19)
* (@Apollon77) Update to Matter 1.6.0 (matter.js 0.17.7-alpha)
* (@Apollon77) Optimized Matter data processing by caching repeated cluster/attribute lookups in hot paths
* (@Apollon77) Only register additional custom attributes when the node supports them
* (@Apollon77) Prevent errors when controlling paired devices that do not expose On/Off commands

### 1.2.1 (2026-06-29)
* (@Apollon77) Fix Thermostat and WindowCovering state update errors
* (@Apollon77) Update to the latest matter.js 0.17.4-alpha including MDNS/CPU usage fixes

### 1.2.0 (2026-06-27)
* (@Apollon77) Enhanced Thread/WiFi network visualization: OTBR mDNS discovery, device-type and Thread role icons, border-router details and markers, LQI link colors, hide/search options and localized labels
* (@Apollon77) Ignores invalid min/max/step settings in linked objects
* (@Apollon77) Improve state detection to respect the selected state id
* (@Apollon77) Update to matter.js 0.17.4-alpha including many optimizations and fixes

### 1.1.1 (2026-06-22)
* (@Apollon77) Fixes Update availability flag in UI

### 1.1.0 (2026-06-22)
* (@GermanBluefox) Update to Device management v3 and more dependencies
* (@Apollon77) Update to Matter 1.5.1 (matter.js 0.17.3) including many optimizations and fixes
* (@Apollon77) Parallelizing the  startup of controller and devices and optimize subscription resumptions
* (@Apollon77) Fixes detection of 0_userdata.0 objects again
* (@Apollon77) Fixes handling of special attributes (e.g. startupOnOff) when null and add relevant States lists
* (@Apollon77) Fixes handling if custom attribute states
* (@Apollon77) Fixes calculation of illuminance when measurements are <=0 (aka fully dark)
* (@Apollon77) Fixes initialization of HCI IDs when using BLE

### 1.0.0 (2026-02-25)
* IMPORTANT: The first start of the controller with this version takes a bit longer to connect all devices because internal data are migrated
* (@Apollon77) Updated to Matter 1.4.2 (matter.js to 0.16) including many optimizations and fixes
* (@Apollon77) Also convert values for unit "mired" for Color temperatures
  * (@Apollon77) Increases default color temperature range to 1.000-20.000 K
* (@Apollon77) Added support for OTA updates (checked roughly 15 mins after adapter start and then daily)
* (@Apollon77) Added Thread and Wifi topology overview with data from the devices. See Readme for details.
* (@Apollon77) Detect duplicate commands/writes and prevent them from being sent out again if the first command is still in progress
* (@GermanBluefox) Highlight the devices in GUI when hovering over the device in the device list
* (@tarikweiss) Added support for volume, volumeGroup ioBroker devices to matter
* (@Tyraenor/Apollon77) Add Off mode for Thermostats for Matter devices

### 0.5.6 (2025-10-21)
* (@Apollon77) Type detector update, should detect single states in non-device structures better

### 0.5.5 (2025-10-16)
* (@Apollon77) Optimizes Battery drain information
* (@Apollon77) Correctly shows "in progress changes" in UI when adjusting devices to ovoid overlapping actions
* (@Apollon77) Fix HSV to RGB calculation for some cases
* (@Apollon77) Updated matter.js to 0.15.6
* (@Apollon77) Optimizes the shutdown process to ensure everything is properly closed

### 0.5.4 (2025-10-07)
* (@Apollon77) Updated matter.js to 0.15.5

### 0.5.3 (2025-09-20)
* (@Apollon77) Updated matter.js to 0.15.4

### 0.5.2 (2025-08-03)
* (@Apollon77) Updated matter.js to 0.15.3 with many performance- and other improvements
* (@GermanBluefox) Corrected the checking of the licenses if they were stacked
* (Apollon77) Use attributes from cache instead of requesting them from the device
* (Apollon77) Ignoring invalid min/max for color temperature from objects
* (Apollon77) Prevents update loops for Thermostat on/off state changes
* (Apollon77) Fixes invalid color state updates when multiple attributes are adjusted together
* (Apollon77) Rounds RSSI values to prevent digits

### 0.5.1 (2025-06-06)
* (@Apollon77) Updated matter.js to 0.14 with many performance- and other improvements

### 0.5.0 (2025-05-03)
* IMPORTANT: Increase Node.js requirement to at least 20.x because else BLE currently does not work
* (@Apollon77) Added info log message when the device decided for a different subscription interval

### 0.4.16 (2025-05-01)
* (@GermanBluefox) Added expert mode to GUI
* (@GermanBluefox) GUI optimizations
* (@Apollon77) Upgrade Matter support to 1.4
* (@Apollon77) Upgrade type detector and usage for better automatic detection results
* (@Apollon77) Included Battery state in attribute polling and changed default interval to 24h if the device is battery powered
* (@Apollon77) Shows subscription maximum interval of the node in the connection-infos
* (@Apollon77) Allows to overwrite the default subscription maximum interval send to the device in Node settings
* (@Apollon77) Considers also the BatteryAlarm state of Smoke-CO sensors when determine LOWBAT state
* (@Apollon77) Updates the connection state of Controller devices as soon as alive triggers or data updates come in
* (@Apollon77) For Lock devices the SET state is synced with ACTUAL

### 0.4.15 (2025-02-25)
* (@GermanBluefox) Added Button display and control in the UI
* (@Apollon77) Updates matter.js to optimize and add persisted subscriptions
* (@Apollon77) Fixed states-list initializations for controller states
* (@Apollon77) Fixed initialization issue when the initial device connection for controller was not finished
* (@Apollon77) Adjusted connection display when reconnecting to a node to red in UI

### 0.4.14 (2025-02-08)
* (@Apollon77) Improved stability and connection reliability (matter.js updated)
* (@Apollon77) Sort enum entries to improve detection quality when adding new devices

### 0.4.13 (2025-02-01)
* (@Apollon77) Added support for Door state feature for Devices and Controllers
* (@Apollon77) Fixed Thermostat creation with Boost state

### 0.4.12 (2025-02-01)
* (@GermanBluefox) Added the "copy to clipboard" button in the debug dialog
* (@Apollon77) Updated matter.js with performance and Memory usage optimizations (and Tasmota pairing workaround)
* (@Apollon77) Reworked Type detection in Backend and for Channel/Device detection type in UI, now multiple device types are offered with the most complex one pre-selected
* (@Apollon77) Handle Matter ColorTemperature Lights as a Color capable light to also allow CT-Lights with Hue support
* (@Apollon77) Added BOOST endpoint as switch when exposing Thermostats with Boost state
* (@Apollon77) Optimized some dimmer/level management for light devices without a dimmer state

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
* (@Apollon77) Added debouncing when controllers change temperature value to make sure not to overload the device
* (@Apollon77) Added support for a step and use 0.5 for Setpoint temperatures
* (@Apollon77) Added support for fur Hue lights without saturation state

### 0.4.6 (2025-01-25)
* (@GermanBluefox) Optimized UI
* (@GermanBluefox) Added user feedback when device or bridged device is identified
* (@Apollon77) Fixes Thermostat logic for devices
* (@Apollon77) Ensures information is pushed to the UI when devices are in an error state

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
* (@Apollon77) Made sure to track state values also when disabled and update state to Matter when enabled again
* (@Apollon77) Made sure to also subscribe to write-only states for controller cases
* (@Apollon77) Only exposes the remaining battery percentage attribute when value is present
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
* (@GermanBluefox/@Apollon77) Added possibility to enable/disable the controlled nodes
* (@Apollon77) Added Information on battery and rssi for DM tile
* (@Apollon77) Added controller support for Color Lights, Speaker, Thermostats and Window coverings
* (@Apollon77) Optimized and fixed multiple things

### 0.3.5 (2025-01-09)
* (@GermanBluefox) Fixed GUI errors
* (@GermanBluefox) Added `Controller fabric label` to configuration
* (@GermanBluefox) Added solution for QR-Code scanning on non HTTPS pages
* (@Apollon77) Fixed the Generic Switch Device type for controller
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
* (@GermanBluefox) Made the Adapter UI also available as standalone tab
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
* (@GermanBluefox) Optimizes bridge's display for different color schemes
* (@GermanBluefox) Allows collapsing the information blocks at the top of the pages
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
* (@Apollon77) Made sure that controller configuration changes are executed sequentially
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
* (@Apollon77) Allows renaming controller nodes and devices

### 0.2.4 (2024-12-04)
* (@Apollon77) Shows a progress indicator when deleting controller nodes
* (@Apollon77) Cuts names and labels to 32 or 64 characters as needed by Matter
* (@Apollon77) Improves error handling on devices and bridges
* (@Apollon77) Clear storage when removing a bridged device
* (@Apollon77) Processes changed objects with a 5s delay to prevent too many changes at once
* (@Apollon77) Fixes version determination
* (@Apollon77) Initializes Device objects more lazily

### 0.2.3 (2024-11-30)
* (@Apollon77) Made sure to delete all objects and stop device when a device is deleted in UI
* (@Apollon77) When a device/bridge object is deleted and adapter runs we try to detect this and stop the device/bridge
* (@Apollon77) Optimizes close handling of adapter
* (@Apollon77) Uses an adapter version as Software and Hardware versions in the exposed Matter devices
* (@Apollon77) Fixes "auto" flags in backend when it makes no sense in objects
* (@Apollon77) Fixes "auto" flag in UI
* (@Apollon77) Prevents cyclic state updates when a state is updated by the adapter to matter
* (@Apollon77) Log warnings when the optional device states are not mapped
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
* (@Apollon77) Upgrades to a new Matter.js version and API (breaks storage structure)
* (@GermanBluefox) Moved a build process of GUI to vite
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

Copyright (c) 2023-2026 Denis Haev <dogafox@gmail.com>, Ingo Fischer <github@fischer-ka.de>
