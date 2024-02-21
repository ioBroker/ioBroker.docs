---
BADGE-GitHub license: https://img.shields.io/github/license/ciddi89/ioBroker.device-watcher
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.device-watcher.svg
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/ciddi89/ioBroker.device-watcher
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/ciddi89/ioBroker.device-watcher
BADGE-GitHub commits since latest release (by date): https://img.shields.io/github/commits-since/ciddi89/ioBroker.device-watcher/latest
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/ciddi89/ioBroker.device-watcher
BADGE-GitHub issues: https://img.shields.io/github/issues/ciddi89/ioBroker.device-watcher
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.device-watcher.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/device-watcher-stable.svg
BADGE-Number of Installations: https://iobroker.live/badges/device-watcher-installed.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/ciddi89/ioBroker.device-watcher/badge.svg
---
![Logo](../../admin/device-watcher.png)

# ioBroker.device-watcher

## Contents

-   [How to show JSON lists in Grafana with InfluxQL](grafana.md)
-   [How to show JSON lists in Grafana with Flux](grafana_flux.md)
-   [Lovelace-UI show HTML table](lovelace.md)
-   [Adapterlist - What is exactly supported](listSupportAdapter.md)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

-   (ciddi89) Added: Option to set language for messages and tables

### 2.10.3 (2024-01-27)

-   (ciddi89) Fixed [#299](https://github.com/ciddi89/ioBroker.device-watcher/issues/299): blacklisted devices was shown in html-list

### 2.10.2 (2024-01-20)

-   (ciddi89) Fixed: typeError for available adapter update messages
-   (ciddi89) Fixed: Lists for updatable adapter

### 2.10.1 (2024-01-15)

-   (ciddi89) Fixed: several bugs from last version
-   (ciddi89) Added: finished translations

### 2.10.0 (2024-01-13)

-   (ciddi89) Fixed: Batterie value for shelly plus Gen2 devices [#282](https://github.com/ciddi89/ioBroker.device-watcher/issues/282)
-   (ciddi89) Added: Option to display the last signal strength value when the device is offline [#282](https://github.com/ciddi89/ioBroker.device-watcher/issues/282)
-   (ciddi89) Added: Translation for JSON lists, HTML lists and notifications [#245](https://github.com/ciddi89/ioBroker.device-watcher/issues/245)
-   (ciddi89) Other: clean up code

### 2.9.14 (2024-01-04)

-   (ciddi89) Fixed: This schould fixed the bugs with high cpu and ram load, finally. Sorry about the last two buggy versions.

### 2.9.13 (2024-01-03)

-   (ciddi89) Fixed: Issues from v2.9.12 [#283](https://github.com/ciddi89/ioBroker.device-watcher/issues/283)
-   (ciddi89) Fixed: High CPU usage at object and state changes [#283](https://github.com/ciddi89/ioBroker.device-watcher/issues/283)

### 2.9.12 (2024-01-02)

-   (ciddi89) Fixed: Changed handling for state changes and subscriptions [#283](https://github.com/ciddi89/ioBroker.device-watcher/issues/283)

### 2.9.11 (2023-12-12)

-   (ciddi89) Fixed: Fullybroswer >v3 use id not common name

### 2.9.10 (2023-12-11)

-   (ciddi89) Fixed: Fullybroswer >v3 devicename
-   (ciddi89) Fixed: Fullybroswer >v3 wifi signal

### 2.9.9 (2023-12-07)

-   (ciddi89) Fixed: Write log message of selected adapters only on startup

### 2.9.8 (2023-11-26)

-   (ciddi89) Fixed: Added additional check for instance states [#262](https://github.com/ciddi89/ioBroker.device-watcher/issues/262)
-   (ciddi89) Fixed: Execute adapter even if no device adapter is selected

### 2.9.7 (2023-11-23)

-   (ciddi89) Added: Support for Wifilight
-   (ciddi89) Fixed: Multiple messages if Sonoff devices reachable [#244](https://github.com/ciddi89/ioBroker.device-watcher/issues/244)

### 2.9.6 (2023-11-12)

-   (ciddi89) Fixed: Admin jsonConfig schema
-   (ciddi89) Changed: Admin jsonConfig to json5
-   (ciddi89) Added: Support for Tuya devices with online state
-   (ciddi89) Other: cleaned up files

### 2.9.5 (2023-11-03)

-   (ciddi89) Added: if available use deviceName datapoint for sonoff devices
-   (arteck) Fixed: Changed zwave to zwave2
-   (ciddi89) Fixed: minor bugfixes
-   (ciddi89) Added: FullyBrowser > v3

### 2.9.4 (2023-10-16)

-   (ciddi89) Added: Fallback for HmIp-eTRV-2 batterie devices [#218](https://github.com/ciddi89/ioBroker.device-watcher/issues/218)
-   (@mango1402) Fixed: Proxmox VM/CT online status [#241](https://github.com/ciddi89/ioBroker.device-watcher/issues/241)
-   (ciddi89) Updated: Dependencies

### 2.9.3 (2023-07-21)

-   (ciddi89) Dropped: Node v14.x support and added: Node v20.x support
-   (ciddi89) Fixed: last seen of Ping devices
-   (ciddi89) Fixed: Connection messages of devices without instance connection datapoint
-   (ciddi89) Fixed: Data & Lists of instances wasn't refreshed correctly
-   (ciddi89) Fixed: Tradfri state alive must be false for device offline state

### 2.9.2 (2023-05-19)

-   (ciddi89) Fixed: Instance name in schedule notifications for faulty instances
-   (ciddi89) Fixed: Ignore null values in update datapoints of devices
-   (ciddi89) Updated: Dependencies

### 2.9.1 (2023-04-27)

-   (ciddi89) Removed: Function for error handling (not neccessary)

### 2.9.0 (2023-04-26)

-   (ciddi89) Fixed: Deactivated instances were not displayed in the daily message about deactivated instances
-   (ciddi89) Added: Viessmann devices, Homekit-Controller devices
-   (ciddi89) Improvements: Text of overview messages

### 2.8.5 (2023-04-20)

-   (ciddi89) Fixed: Error that instances can not be added to the blacklist because of the popup message [#172](https://github.com/ciddi89/ioBroker.device-watcher/issues/172)
-   (ciddi89) Fixed: That messages have been sent when the instance has briefly jumped from Enabled to Disabled and back to Enabled [#173](https://github.com/ciddi89/ioBroker.device-watcher/issues/173)

### 2.8.4 (2023-04-16)

-   (ciddi89) Fixed: Functions for instance status completely renewed ([#170](https://github.com/ciddi89/ioBroker.device-watcher/issues/170))
-   (ciddi89) Added: Popup message when the instance is not running and the user tries to select a device/instance in the settings tables ([#170](https://github.com/ciddi89/ioBroker.device-watcher/issues/170))

### 2.8.3 (2023-04-13)

-   (ciddi89) Fixed: Multiple push messages when restarting an instance ([#170](https://github.com/ciddi89/ioBroker.device-watcher/issues/170))

### 2.8.2 (2023-04-13)

-   (ciddi89) Fixed: Don't handle id's which ends with fullstop
-   (ciddi89) Added: Possibility for the user to select the global deactivation time for instances

### 2.8.1 (2023-04-09)

-   (ciddi89) Added: Possibility for the user to select the global error time for instances

### 2.8.0 (2023-04-04)

-   (ciddi89) Added: Support for LOQED Smart Lock
-   (ciddi89) Added: Option to add user/group api key for Pushover
-   (ciddi89) Added: Option to send notification if an instance was stopped
-   (ciddi89) Added: Option to send shedule notifications with overview of stopped instances
-   (ciddi89) Fixed: Issue if notifications was send of stopped instance but the option wasn't choosen
-   (ciddi89) Fixed: Ignore battery values 0% if they were not smaller than 5% before

### 2.7.1 (2023-03-26)

-   (ciddi89) Added: Support for Ecovacs-Deebot
-   (ciddi89) Updated: Dependencies
-   (ciddi89) Improvements: Small fixes

### 2.7.0 (2023-03-13)

-   (ciddi89) Added: Fully-MQTT
-   (ciddi89) Added: Notification Service Matrix
-   (ciddi89) Added: List and number of active instances
-   (ciddi89) Added: HTML lists for instances/adapters
-   (ciddi89) Added: HM-RPC device update pending datapoint
-   (ciddi89) Added: User can define reporting time for error instances
-   (ciddi89) Fixed: Send notification about adapter updates only if there are new ones
-   (ciddi89) Improvements: Hide notification services only if no instance is choosen
-   (ciddi89) Improvements: Some small code changes to avoid error messages

### 2.6.1 (2023-02-26)

-   (ciddi89) Added: Signal adapter for notifications
-   (ciddi89) Added: Raw-List with all data of devices
-   (ciddi89) Added: FHEM TFA sensors [#137](https://github.com/ciddi89/ioBroker.device-watcher/issues/137)
-   (ciddi89) Improvement: Objecthandling of devices/instances
-   (ciddi89) Improvement: Adapter update data
-   (ciddi89) Fixed: HM-CC-RT-DN battery [#128](https://github.com/ciddi89/ioBroker.device-watcher/issues/128)
-   (ciddi89) Added/Changed: some texts in instance config

### 2.6.0 (2023-02-06)

-   (ciddi89) Fixed: Instance error list and count was not reset
-   (ciddi89) Fixed: Made working notification for adapter update
-   (ciddi89) Added: Delete objects automatically if it is not selected in settings.
-   (ciddi89) Enhancement: Check if general device connected state is true for more then few seconds to prevent multiple device status messages
-   (ciddi89) Added: Proxmox Adapter ([#123](https://github.com/ciddi89/ioBroker.device-watcher/issues/123))
-   (ciddi89) Fixed: Delete/Add data of new or deleted instance without restart ([#125](https://github.com/ciddi89/ioBroker.device-watcher/issues/125))
-   (ciddi89) Fixed: Delete/Add data of new or deleted devices without restart ([#125](https://github.com/ciddi89/ioBroker.device-watcher/issues/125))
-   (ciddi89) Enhancement: Schedule and State notifications
-   (ciddi89) Enhancement: Some code improvements

### 2.5.0 (2023-01-27)

-   (ciddi89) Add Feature: Possibility to watch instances
-   (ciddi89) Change: Folder strukur. Instances and devices have got their own folders because of the overview. Please delete the instance folder and restart the instance.

### 2.4.1 (2023-01-14)

-   (ciddi89) send online and offline notifications only, if the connection to device (zigbee stick etc.) is longer then few seconds. Should prevent multiple messages at a stroke
-   (ciddi89) fixed issue that all devices was listed even though only batterie devices was selected

### 2.4.0 (2023-01-10)

-   (ciddi89) make onStateChanges only, when device instance is alive
-   (ciddi89) Homeconnect and Smartgarden Adapter added

### 2.3.1 (2023-01-05)

-   (ciddi89) changed HMRPC lowbat to lowbat_alarm
-   (ciddi89) changed HMRPC unreach to unreach_alarm
-   (ciddi89) fixed nuki mqtt selector
-   (ciddi89) added shelly charge datapoint to identify battery devices better
-   (ciddi89) fixed lowbat issues
-   (ciddi89) added lowbat support for HMRPC: HM-CC-RT-DN
-   (ciddi89) added additionally timeSelector for each adapter for better support

### 2.3.0 (2023-01-03)

-   (ciddi89) sorting for device selection in the blacklist added
-   (ciddi89) Devices can now also be blacklisted in adapter own list
-   (ciddi89) booleans for lowbat, offline and upgradable added ([#105](https://github.com/ciddi89/ioBroker.device-watcher/issues/105))
-   (ciddi89) euSec adapter added ([#73](https://github.com/ciddi89/ioBroker.device-watcher/issues/73))

### 2.2.2 (2022-12-29)

-   (ciddi89) some translation added
-   (ciddi89) datapoints will be written in intervall
-   (ciddi89) improvements of lists
-   (ciddi89) some other small improvements

### 2.2.1 (2022-12-28)

-   (ciddi89) Innogy Smarthome added
-   (ciddi89) Lists for each adapter are working again

### 2.2.0 (2022-12-27)

-   (Scrounger) Yamaha MusicCast adapter added
-   (ciddi89) send update message on state change
-   (Scrounger) datapoints and scheduled notification for updateable devices added
-   (ciddi89) reaction for state changes of battery datapoints added
-   (ciddi89) send message and write lists directly if one device has low battery
-   (ciddi89) send message and write lists directly if on device is going online or offline

### 2.1.0 (2022-12-19)

-   (Scrounger) optionally show adapter name in notification
-   (ciddi89) optionally receive a message when an update for an device is available [#87](https://github.com/ciddi89/ioBroker.device-watcher/issues/87)
-   (Scrounger) update message for shelly adapter added
-   (Scrounger) Yamaha MusicCast adapter added
-   (ciddi89) update message for unifi devices added
-   (ciddi89) fixed devices are not reported in case battery is 0% [#86](https://github.com/ciddi89/ioBroker.device-watcher/issues/86)
-   (ciddi89) SynoChat added [#85](https://github.com/ciddi89/ioBroker.device-watcher/issues/85)
-   (ciddi89) MQTT NukiHub, MQTT-Clien Zigbee2MQTT added ([#82](https://github.com/ciddi89/ioBroker.device-watcher/issues/82))

### 2.0.3 (2022-11-26)

-   fixed issue with localCompare
-   added tapo
-   (Scrounger) added fullyBrowser adapter
-   (Scrounger) added Sure Flap adapter
-   fixed low bat messages

### 2.0.2 (2022-11-12)

-   added status to battery list
-   batt devices which are offline are now still included in the battery list
-   small improvements of translations
-   offline time settings: you can use 0 instead of -1 (it will be the new standard)
-   improvements of adaptername
-   fixed issues [#66](https://github.com/ciddi89/ioBroker.device-watcher/issues/66) & [#67](https://github.com/ciddi89/ioBroker.device-watcher/issues/67)
-   repaired blacklist notifications
-   added handling for blacklist object

### 2.0.1 (2022-11-02)

-   If the device is offline, set signal strength to '0%'
-   If the device is offline, set battery to ' - '
-   repair some small issues in the lists

### 2.0.0 (2022-11-01)

-   added Lupusec, HS100 adapter, Zigbee2MQTT and MaxCube
-   changed name of Homematic to HM-RPC
-   made a completly makeover of the blacklist
-   clean up the code and shorten some

### 1.1.0 (2022-10-03)

-   removed indicatoren for daily sent messages
-   changed selector for shelly devices
-   added Zigbee2MQTT adapter
-   added cron function to use own time for daily overview messages

### 1.0.1 (2022-09-30)

-   added WLED, Ikea Tradfri, Roomba, HmIp, Tado, Netatmo, Yeelight-2, Unifi, Nut and Meross adapter
-   fixed battery message
-   corrected and repaired some issues of last contact time
-   added support for old HM devices
-   some small refactoring of code
-   changed shelly selector from dp rssi to dp online

### 1.0.0 (2022-09-03)

-   ** BREAKING CHANGE ** If you update from version <= 0.3.0, remove the old instance first before you update to >= 1.0.0. After that you can create a new instance.
-   changed mode from shedule to daemon, please take aware from the advice above
-   added Logitech Harmony Hub
-   small bugfixes (own function for blacklist, fix for memory leak etc.)

### 0.3.0 (2022-08-10)

-   removed channelnumber in Homematic devices name
-   added function to create html list
-   added german and english documentation

### 0.2.4 (2022-07-31)

-   many changes of code, comments and error handling

### 0.2.2 (2022-07-28)

-   fixed translations
-   added sentry
-   added nuki battery state

### 0.2.1 (2022-07-27)

-   removed test states

### 0.2.0 (2022-07-24)

-   added function to create data of each adapter

### 0.1.2 (2022-07-22)

-   improved overview of admin ui
-   added option in admin ui to create own folders for each adapter (!!not working yet!!)

### 0.1.1 (2022-07-22)

-   changed wrong type of datapoint lastCheck
-   added possibility to choose own offline time for each adapter
-   added Whatsapp notification services
-   improved sonoff devices
-   added row with online and offline status in table allDevices
-   added alexa2 and esphome devices
-   Added priority for pushover notifications

### 0.0.8 (2022-07-05)

-   added own notes field for blacklist
-   added ping, switchbot ble, mihome, sonos, fritzdect, hue, hue extended and nuki extended
-   some improvements of code

### 0.0.6 (2022-06-10)

-   added Homematic, Deconz, Zwave
-   added Email notification
-   added count and list for low battery devices
-   changes Log state dp to last notification state dp
-   Using available state instead of link quality state for zigbee devices
-   Show the correct time of last contact instead the minutes if the time is under 100minutes
-   small bugfixes

### 0.0.5 (2022-06-05)

-   added admin translations

### 0.0.3 (2022-06-05)

-   added Shelly and Sonoff Devices

### 0.0.2 (2022-06-05)

-   Release for testing

### 0.0.1 (2022-05-01)

-   initial release

## License

MIT License

Copyright (c) 2024 Christian Behrends <mail@christian-behrends.de>

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