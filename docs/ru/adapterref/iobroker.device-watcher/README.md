---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.device-watcher.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.device-watcher.svg
BADGE-Number of Installations: https://iobroker.live/badges/device-watcher-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/device-watcher-stable.svg
BADGE-GitHub license: https://img.shields.io/github/license/ciddi89/ioBroker.device-watcher
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/ciddi89/ioBroker.device-watcher
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/ciddi89/ioBroker.device-watcher
BADGE-GitHub commits since tagged version (branch): https://img.shields.io/github/commits-since/ciddi89/ioBroker.device-watcher/v2.0.0
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/ciddi89/ioBroker.device-watcher
BADGE-GitHub issues: https://img.shields.io/github/issues/ciddi89/ioBroker.device-watcher
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.device-watcher/README.md
title: ioBroker.device-наблюдатель
hash: XUOy6t57dhGhe41EsiaQGi1Ia3PZ7Fvw3vuQKpa9YLI=
---
![логотип](../../../de/adapterref/iobroker.device-watcher/../../admin/device-watcher.png)

# IoBroker.device-watcher
## Оглавление
- [Черный список](blacklist.md)
- [Как отобразить таблицу JSON в Grafana с помощью InfluxQL](grafana.md)
- [Как отобразить таблицу JSON в Grafana с помощью Flux](grafana_flux.md)
- [Lovelace-UI Показать таблицу HTML](lovelace.md)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.0 (2022-11-01)
- added Lupusec, HS100 adapter, Zigbee2MQTT and MaxCube
- changed name of Homematic to HM-RPC
- made a completly makeover of the blacklist
- clean up the code and shorten some

### 1.1.0 (2022-10-03)
- removed indicatoren for daily sent messages
- changed selector for shelly devices
- added Zigbee2MQTT adapter
- added cron function to use own time for daily overview messages

### 1.0.1 (2022-09-30)
- added WLED, Ikea Tradfri, Roomba, HmIp, Tado, Netatmo, Yeelight-2, Unifi, Nut and Meross adapter
- fixed battery message
- corrected and repaired some issues of last contact time 
- added support for old HM devices
- some small refactoring of code
- changed shelly selector from dp rssi to dp online

### 1.0.0 (2022-09-03)
 - ** BREAKING CHANGE ** If you update from version <= 0.3.0, remove the old instance first before you update to >= 1.0.0. After that you can create a new instance.
 - changed mode from shedule to daemon, please take aware from the advice above
 - added Logitech Harmony Hub
 - small bugfixes (own function for blacklist, fix for memory leak etc.)

### 0.3.0 (2022-08-10)
- removed channelnumber in Homematic devices name
- added function to create html list
- added german and english documentation

### 0.2.4 (2022-07-31)
- many changes of code, comments and error handling

### 0.2.2 (2022-07-28)
- fixed translations
- added sentry
- added nuki battery state

### 0.2.1 (2022-07-27)
- removed test states

### 0.2.0 (2022-07-24)
- added function to create data of each adapter

### 0.1.2 (2022-07-22)

- improved overview of admin ui
- added option in admin ui to create own folders for each adapter (!!not working yet!!)

### 0.1.1 (2022-07-22)

- changed wrong type of datapoint lastCheck
- added possibility to choose own offline time for each adapter
- added Whatsapp notification services
- improved sonoff devices
- added row with online and offline status in table allDevices
- added alexa2 and esphome devices
- Added priority for pushover notifications

### 0.0.8 (2022-07-05)

- added own notes field for blacklist
- added ping, switchbot ble, mihome, sonos, fritzdect, hue, hue extended and nuki extended
- some improvements of code

### 0.0.6 (2022-06-10)

- added Homematic, Deconz, Zwave
- added Email notification
- added count and list for low battery devices
- changes Log state dp to last notification state dp
- Using available state instead of link quality state for zigbee devices
- Show the correct time of last contact instead the minutes if the time is under 100minutes
- small bugfixes

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

Copyright (c) 2022 Christian Behrends <mail@christian-behrends.de>

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