![Logo](admin/hue.jpeg)
# ioBroker Philips Hue Bridge Adapter

![Number of Installations](http://iobroker.live/badges/hue-installed.svg)
![Number of Installations](http://iobroker.live/badges/hue-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.hue.svg)](https://www.npmjs.com/package/iobroker.hue)

![Test and Release](https://github.com/iobroker-community-adapters/iobroker.hue/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/hue/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.hue.svg)](https://www.npmjs.com/package/iobroker.hue)

**This adapter uses the service [Sentry.io](https://sentry.io) to automatically report exceptions and code errors and new device schemas to me as the developer.** More details see below!

## What is Sentry.io and what is reported to the servers of that company?
Sentry.io is a service for developers to get an overview about errors from their applications. Exactly this is implemented in this adapter.

When the adapter crashes or another Code error happens, this error message that also appears in the ioBroker log is submitted to Sentry.
When you have allowed ioBroker GmbH to collect diagnostic data, then also your installation ID (this is just a unique ID **without** any additional infos about you, email, name or such) is included. This allows Sentry to group errors and show how many unique users are affected by such an error. All of these helps me to provide error-free adapters that basically never crash.

## English :gb:
This adapter connects your Philips Hue Bridges with ioBroker to control Philips Hue LED bulbs, Friends of Hue LED lamps, stripes, plugs like from Osram, and other SmartLink capable devices (like LivingWhites and some LivingColors).

### Setup
Once you have installed this adapter within ioBroker, create an adapter instance accordingly. Next, you need to connect your Hue bridge with ioBroker within the adapter settings:
1. If you are using another bridge than v2, configure port to 80 (non-https), else 443 (https) should be the way to go.
2. Click on "Find Bridge" button to get the IP address of your bridge. This will search for all bridges in your environment. Then select the bridge to which you want to connect. The field "Bridge Address" will be populated with the IP address of your chosen Hue bridge.
3. Next, click on "Create User" button in the settings and then walk to your Hue bridge device, so your hardware, to push its round button. You'll be going to have 30 seconds to proceed. Once you pushed the button, the field "Bridge User" should be populated with a generated string.
4. Modify any other options in the adapter settings and then select "save and close".
5. Finally, you should be all set: The adapter will generate all objects to control your Hue devices accordingly.

Please note: Adapter settings button "Find Bridge" will be inactive if field "Bridge Address" is populated, and button "Create User" will be inactive if field "Bridge User" is populated.

### Settings
| Name                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| __Bridge address__               | IP address of your Hue bridge, you can try to detect it by pressing `Find Bridge` button.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| __Port__                         | Port of your Hue bridge, normally 443 (SSL) and 80 (non-SSL).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| __SSL__                          | If checked, connection is secured via SSL, port will automatically change to 443 (it is strongly recommended to use SSL).                                                                                                                                                                                                                                                                                                                                                                                                                              |
| __User__                         | Username of your bridge user. You can create it, by pressing `Create User` button and following the screen instructions.                                                                                                                                                                                                                                                                                                                                                                                                                               |
| __Ignore scenes__                | If checked, scenes will not be shown/controlled by the adapter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| __Ignore groups__                | If checked, groups will not be shown/controlled by the adapter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| __"Legacy" structure__           | To support backwards compatibility, it is possible to hold an old object structure in ioBroker. This old structure is `hue.<instance_number>.<bridge_name_channel>.<light_or_group_channel>.<state>`. The new structure removes `<bridge_name_channel>` and thus makes it necessary to adapt old scripts, etc. If an existing old structure is detected by the adapter, the structure will be used without checking the checkbox. However, if migration from old to new structure is desired, delete the whole `hue.<instance_number>` namespace once. |
| __Native turn off/on behaviour__ | If checked, the adapter will turn on/off lights in the same fashion as the native Hue app does. Otherwise, lamps will be set to a level of 100 % when switched on. Additionally when a group is already turned on, setting the brightness level will affect only the already turned on lamps and will not turn the lamps on, which are currently turned off.                                                                                                                                                                                           |
| __Sync software sensors__        | Also sync software sensors. These are virtual sensors, e.g. created by Hue Labs scenes. By controlling the `status` datapoint of such a sensor you can start/stop scenes which follow this logic. In most cases `0` turns scene off and `1` turns it on.                                                                                                                                                                                                                                                                                               |
| __Turn on with others__          | Turn on lights also with ct state, color state, ... Set to `false` and turn on only with power and brightness state.                                                                                                                                                                                                                                                                                                                                                                                                                                   | 
| __Polling__                      | If checked, the adapter will poll state changes, otherwise it can only be used to control lamps, not to show their status.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| __Polling interval__             | Defines how often the states will be polled, and thus updated in ioBroker. Low polling intervals can cause performance issues in some settings. Hence, the minimum allowed polling interval is 2 seconds. If polling interval is set to less than 2 seconds it will be set to 2 seconds during runtime.                                                                                                                                                                                                                                                |

### Commands
Command states (e.g. `hue.0.All.command`) can be used to set multiple commands to the bridge. 
This allows setting a group or a light to a specific state using e.g. a transition time.

```javascript
setState('hue.0.All.command', { "bri": 50, "transitiontime": 30 }, false);
```

For groups which contain scenes, like `hue.0.Wohnzimmer.scene_hell` the scenes can also be activated with a transition time.
To do this, pass the scene argument to the corresponding command.

```javascript
setState('hue.0.All.Wohnzimmer', { "scene": "hell", "transitiontime": 30 }, false);
```

### Additional information
With version 3.3.0 the group states `anyOn` and `allOn` became controllable, note that they will just act like the `on` state,
when controlled. In some cases, it may be desirable to have a controllable `anyOn` state in your visualization.

## Deutsch :de:
Bindet Philips Hue / LivingColors / LivingWhites Lampen ein. 
In den Adapter-Settings muss die IP der Hue Bridge sowie ein Username konfiguriert werden. Um einen User zu aktivieren, einmal auf create user drücken und dann innerhalb von 30 Sekunden den Button an der Hue bridge drücken. Dann wird automatisch der User übergeben. 

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 3.17.4 (2026-09-15))
- (mcm1957) support to install from github has been dropped

### 3.17.2 (2026-09-15)
- (copilot) Fixed user creation not updating configuration field automatically- #776

### 3.17.1 (2026-09-15)
- (a-i-ks) fixed: ct object min/max being stricter than the adapter's supported color temperature range, causing "less than min"/"greater than max" warnings (closes #586)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now

### 3.16.2 (2025-04-12)
* (@foxriver76) do not try to use v2 functionality on legacy Hue bridges (closes #720)

### 3.16.1 (2025-03-07)
* (@foxriver76) fix if no tamper report is present on state creation

## Roadmap/Todo

* Automatic bridge discovery
* Automatic user setup via bridge link button

## License

Apache 2.0

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2017-2025 Bluefox <dogafox@gmail.com>  
Copyright (c) 2014-2016 hobbyquaker