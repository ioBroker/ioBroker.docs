---
chapters: {"pages":{"en/adapterref/iobroker.sunseeker/README.md":{"title":{"en":"ioBroker.sunseeker"},"content":"en/adapterref/iobroker.sunseeker/README.md"},"en/adapterref/iobroker.sunseeker/docs/en/README.md":{"title":{"en":"ioBroker.sunseeker"},"content":"en/adapterref/iobroker.sunseeker/docs/en/README.md"}}}
---
![Logo](admin/sunseeker.png)

# ioBroker.sunseeker

[![NPM version](https://img.shields.io/npm/v/iobroker.sunseeker.svg)](https://www.npmjs.com/package/iobroker.sunseeker)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sunseeker.svg)](https://www.npmjs.com/package/iobroker.sunseeker)
![Number of Installations](https://iobroker.live/badges/sunseeker-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/sunseeker-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.sunseeker.png?downloads=true)](https://www.npmjs.com/package/iobroker.sunseeker)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.sunseeker/workflows/Test%20and%20Release/badge.svg)

## Sunseeker mower adapter for ioBroker

Connects Sunseeker robotic lawn mowers (also rebranded as Adano, Brücke, etc.) to ioBroker through the official Sunseeker cloud. Both the legacy (`Old`) and current (`New`) Sunseeker APIs are supported, covering the S, X, V and V1 model classes.

## Requirements

- ioBroker js-controller `>= 6.0.11`
- Admin `>= 7.8.23`
- Node.js `>= 22`
- Sunseeker cloud account (e-mail + password, same as in the mobile app)

## API overview

| Area                  | Endpoints                                                                                                                                                                                                                                                                | Used?                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| Auth                  | `POST /auth/oauth/token` (login + refresh), `auth/mobile/token/social`                                                                                                                                                                                                   | Yes                                |
| Device list           | `GET /app_wireless_mower/device-user/getCustomDevice`, `…/list`, `…/{id}`, `…/remark`                                                                                                                                                                                    | Yes (`getCustomDevice`)            |
| Status                | `GET /app_wireless_mower/device/getBysn`, `…/info/{id}`, `…/check`, `…/readWeakSignal`, `…/getSignalType`                                                                                                                                                                | Yes (`getBysn`)                    |
| Settings (read)       | `GET /app_wireless_mower/device-setting/{sn}`, `…/getTime/{sn}`, `device/getDeviceSettingBySn`, `device-configuration/getBySn/{sn}`, `device-model/getByClientName`                                                                                                      | Yes (`device-setting/{sn}`)        |
| Settings (write, New) | `POST /iot_mower/wireless/device/set_property` (S/X/V), `POST /app_wirelessv1_mower/wirelessv1/device/setProperty` (V1), `POST /app_wireless_mower/device/setRain/{sn}/{appId}`, `…/setWifi`, `…/appEditDevice`                                                          | Partial (`set_property` for blade) |
| Settings (write, Old) | `POST /app_mower/device-setting/save`, `…/updateLocation`, `…/updateTimeZone`, `device/setLed`, `…/saveLed`, `…/setRain`, `…/saveRain`, `…/setUltra`, `…/saveUltra`, `…/setZones`, `…/setNickName`, `…/setGps`, `…/setCurrentTime`, `…/setWorkStatus`, `…/resetPassword` | No                                 |
| Schedule              | `POST /app_mower/device-schedule/setScheduling` (Old), `app_mower/device-schedule/save`, `app_mower/device/getScheduling`, `POST /app_wireless_mower/.../setProperty` with `setSchedule` (V1) and `set_property` with `setTimeTactics` (S/X/V)                           | Yes (all three paths)              |
| MQTT proxy via REST   | `POST /iot_mower/wireless/device/get_property`, `…/set_property`, `…/action`, `…/extra`, `…/otaUpgrade`, `…/bindBaseStation`                                                                                                                                             | Yes (`get_property` after connect) |
| Maps                  | `GET /wireless_map/wireless_device/get`, `…/getHeatMap`, `…/get3D`, `wireless_map/backup_map/get`, `map/work-map/mobile/{sn}`, `…/newest/{online}/{sn}`, `…/all-info`, `app_wireless_mower/device/getMapRealPath`                                                        | Yes (`get` + `getHeatMap`)         |
| Work records          | `GET /app_wireless_mower/work_record/page`, `…/work_event_info/page`, `device_log/device-operation-records/esPage`, `app_mower/device-record/getRecord/{sn}`, `app_mower/device-cmd-logs/page`                                                                           | Yes (`get` + `work_record/page`)   |
| Anti-theft / GPS      | `gps/mobile/anti-theft/by-sn/{sn}`, `…/device-position/{sn}`, `…/getAntiTheftStatusInfo`, `…/is-it-bound`, `…/set-fence`, `…/wireless/bind`, `gps/anti-theft/send-track`, `gps/fence-radius-setting/list`                                                                | No                                 |
| Base station          | `station/base-station/bind`, `…/unBind`, `…/getByDeviceSn`, `…/getByStationSn/{sn}`                                                                                                                                                                                      | No                                 |
| OTA                   | `ota/firmware-large/check/{sn}/{ver}`, `…/getDescription`, `…/otaUpdate`, `…/wireless/check`, `ota/firmware-small/list/{id}`                                                                                                                                             | No                                 |
| Sharing               | `app_wireless_mower/device-user-share`, `…/invite/detail`, `…/invite/reply`, `…/unbind`, `device-user/openShare`, `…/closeShare`                                                                                                                                         | No                                 |
| Skins / cosmetics     | `app_wireless_mower/device-skin`, `…/list`, `…/bind/switch{userId}/{id}`                                                                                                                                                                                                 | No                                 |
| Payment               | `pay/v1/mobile/combo/*`, `pay/v1/mobile/order/*`, `pay/v1/paypal/*`, `pay/v1/user/card/holder*`                                                                                                                                                                          | No                                 |
| Misc                  | `app_wireless_mower/feedback-record`, `community_activities/*`, `message-send-logs/*`, `app-version/check`, `app-agreements/business-types/{type}/items`, `sale/manual/getManualBySn`, `link-address/list/{type}`                                                        | No                                 |

V1-specific (`app_wirelessv1_mower/wirelessv1/`): `device-setting`, `device-setting/{sn}`, `device-schedule/{deviceId}`, `device/getProperty`, `device/setProperty`, `device/saveProperty`, `device/restoreFactory`.

## References

- Home Assistant integration used as the API reference: <https://github.com/Sdahl1234/Sunseeker-lawn-mower>
- json2iob: <https://github.com/TA2k/json2iob>
- Sunseeker (wireless): <https://sunseekertech.com>
- Scheppach (wire): <https://shop.scheppach.com/Produkte/Garten-Hof/Rasenmaeher/Rasenmaehroboter/>
- Texas (wire): <https://texas-gartentechnik.eu/Sortiment/Maehroboter/>
- Adano (wire): <https://schou.com/en/pages/robotplaeneklippere>
- Brücke (wire): No HP
- Orbex (wire): No HP
- Grouw (wire): <https://schou.com/en/pages/robotplaeneklippere>

## Description

🇬🇧 [Description](/#/docs/adapterref/iobroker.sunseeker/docs/en/README.md)</br>
🇩🇪 [Beschreibung](https://github.com/iobroker-community-adapters/ioBroker.sunseeker/blob/main/docs/de/README.md)

## Questions

🇩🇪 [Fragen](https://forum.iobroker.net/topic/84650/test-adapter-sunseeker?_=1781193847690)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (Lucky-ESA) Settings added
- (Lucky-ESA) Refresh properties button added
- (Lucky-ESA) Multi-angle added
- (Lucky-ESA) Custom Multi-angle added
- (Lucky-ESA) Mirroring of App version 1.7.0 regarding login, header, and MQTT password.
- (Lucky-ESA) Pattern, anti-theft added

### 0.0.2 (2026-05-29)

- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.
- (Lucky-ESA) Added event log

### 0.0.1 (2026-05-15)

- (TA2k) initial release

## License

MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2026 TA2k <tombox2020@gmail.com>

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