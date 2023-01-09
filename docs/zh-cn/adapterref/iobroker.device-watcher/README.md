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
BADGE-Snyk Vulnerabilities for GitHub Repo: https://img.shields.io/snyk/vulnerabilities/github/ciddi89/ioBroker.device-watcher
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.device-watcher/README.md
title: ioBroker.device-watcher
hash: BiX3QU/IP/67sV1esx0No3bPB7Cctkqzm52H4smZPmE=
---
![商标](../../../de/admin/device-watcher.png)

# IoBroker.device-watcher
＃＃ 目录
- [如何使用 InfluxQL 在 Grafana 中显示 JSON 表](grafana.md)
- [如何使用Flux在Grafana中显示JSON表](grafana_flux.md)
- [Lovelace-UI 显示 HTML 表格](lovelace.md)
- [适配器列表 - 究竟支持什么](listSupportAdapter.md)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

-   (ciddi89) make onStateChanges only, when device adapter is alive
-   (ciddi89) Homeconnect ans Smartgarden Adapter added

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

Copyright (c) 2023 Christian Behrends <mail@christian-behrends.de>

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