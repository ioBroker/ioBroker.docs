---
chapters: {"pages":{"en/adapterref/iobroker.sunseeker/README.md":{"title":{"en":"ioBroker.sunseeker"},"content":"en/adapterref/iobroker.sunseeker/README.md"},"en/adapterref/iobroker.sunseeker/docs/en/README.md":{"title":{"en":"ioBroker.sunseeker"},"content":"en/adapterref/iobroker.sunseeker/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sunseeker/README.md
title: ioBroker.sunseeker
hash: 6SgHiy5QAqMpE209rTAaRmeKs96UB2M8Dw7W532o9SU=
---
![Logo](../../../en/adapterref/iobroker.sunseeker/admin/sunseeker.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.sunseeker.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sunseeker.svg)
![Anzahl der Installationen](https://iobroker.live/badges/sunseeker-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/sunseeker-stable.svg)
![NPM](https://nodei.co/npm/iobroker.sunseeker.png?downloads=true)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.sunseeker/workflows/Test%20and%20Release/badge.svg)

# ioBroker.sunseeker

## Sunseeker Rasenmäheradapter für ioBroker

Verbindet Sunseeker-Mähroboter (auch unter den Markennamen Adano, Brücke usw. vertrieben) über die offizielle Sunseeker-Cloud mit ioBroker. Sowohl die ältere (`Old`) und Strom (`New`) Die Sunseeker-APIs werden unterstützt und decken die Modellklassen S, X, V und V1 ab.

## Anforderungen

- ioBroker js-Controller `>= 6.0.11`
- Administrator `>= 7.8.23`
- Node.js `>= 22`
- Sunseeker-Cloud-Konto (E-Mail-Adresse + Passwort, identisch mit der mobilen App)

## API-Übersicht

| Bereich                        | Endpunkte                                                                                                                                                                                                                                                                | Gebraucht?                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| Authentifizierung              | `POST /auth/oauth/token` (Anmeldung + Aktualisierung), `auth/mobile/token/social`                                                                                                                                                                                         | Ja                                      |
| Geräteliste                    | `GET /app_wireless_mower/device-user/getCustomDevice`, `…/list`, `…/{id}`, `…/remark`                                                                                                                                                                                    | Ja (`getCustomDevice`)                 |
| Status                         | `GET /app_wireless_mower/device/getBysn`, `…/info/{id}`, `…/check`, `…/readWeakSignal`, `…/getSignalType`                                                                                                                                                                | Ja (`getBysn`)                         |
| Einstellungen (gelesen)        | `GET /app_wireless_mower/device-setting/{sn}`, `…/getTime/{sn}`, `device/getDeviceSettingBySn`, `device-configuration/getBySn/{sn}`, `device-model/getByClientName`                                                                                                      | Ja (`device-setting/{sn}`)             |
| Einstellungen (Schreiben, Neu) | `POST /iot_mower/wireless/device/set_property` (S/X/V), `POST /app_wirelessv1_mower/wirelessv1/device/setProperty` (V1), `POST /app_wireless_mower/device/setRain/{sn}/{appId}`, `…/setWifi`, `…/appEditDevice`                                                            | Teilweise (`set_property` (für Klinge)  |
| Einstellungen (Schreiben, Alt) | `POST /app_mower/device-setting/save`, `…/updateLocation`, `…/updateTimeZone`, `device/setLed`, `…/saveLed`, `…/setRain`, `…/saveRain`, `…/setUltra`, `…/saveUltra`, `…/setZones`, `…/setNickName`, `…/setGps`, `…/setCurrentTime`, `…/setWorkStatus`, `…/resetPassword` | NEIN                                    |
| Zeitplan                       | `POST /app_mower/device-schedule/setScheduling` (Alt), `app_mower/device-schedule/save`, `app_mower/device/getScheduling`, `POST /app_wireless_mower/.../setProperty` mit `setSchedule` (V1) und `set_property` mit `setTimeTactics` (S/X/V)                                 | Ja (alle drei Wege)                     |
| MQTT-Proxy über REST           | `POST /iot_mower/wireless/device/get_property`, `…/set_property`, `…/action`, `…/extra`, `…/otaUpgrade`, `…/bindBaseStation`                                                                                                                                             | Ja (`get_property` (nach dem Verbinden) |
| Karten                         | `GET /wireless_map/wireless_device/get`, `…/getHeatMap`, `…/get3D`, `wireless_map/backup_map/get`, `map/work-map/mobile/{sn}`, `…/newest/{online}/{sn}`, `…/all-info`, `app_wireless_mower/device/getMapRealPath`                                                        | Ja (`get` +`getHeatMap`)               |
| Arbeitsaufzeichnungen          | `GET /app_wireless_mower/work_record/page`, `…/work_event_info/page`, `device_log/device-operation-records/esPage`, `app_mower/device-record/getRecord/{sn}`, `app_mower/device-cmd-logs/page`                                                                           | Ja (`get` +`work_record/page`)         |
| Diebstahlsicherung / GPS       | `gps/mobile/anti-theft/by-sn/{sn}`, `…/device-position/{sn}`, `…/getAntiTheftStatusInfo`, `…/is-it-bound`, `…/set-fence`, `…/wireless/bind`, `gps/anti-theft/send-track`, `gps/fence-radius-setting/list`                                                                | NEIN                                    |
| Basisstation                   | `station/base-station/bind`, `…/unBind`, `…/getByDeviceSn`, `…/getByStationSn/{sn}`                                                                                                                                                                                      | NEIN                                    |
| OTA                            | `ota/firmware-large/check/{sn}/{ver}`, `…/getDescription`, `…/otaUpdate`, `…/wireless/check`, `ota/firmware-small/list/{id}`                                                                                                                                             | NEIN                                    |
| Teilen                         | `app_wireless_mower/device-user-share`, `…/invite/detail`, `…/invite/reply`, `…/unbind`, `device-user/openShare`, `…/closeShare`                                                                                                                                         | NEIN                                    |
| Hautpflege / Kosmetik          | `app_wireless_mower/device-skin`, `…/list`, `…/bind/switch{userId}/{id}`                                                                                                                                                                                                 | NEIN                                    |
| Zahlung                        | `pay/v1/mobile/combo/*`, `pay/v1/mobile/order/*`, `pay/v1/paypal/*`, `pay/v1/user/card/holder*`                                                                                                                                                                          | NEIN                                    |
| Verschiedenes                  | `app_wireless_mower/feedback-record`, `community_activities/*`, `message-send-logs/*`, `app-version/check`, `app-agreements/business-types/{type}/items`, `sale/manual/getManualBySn`, `link-address/list/{type}`                                                        | NEIN                                    |

V1-spezifisch (`app_wirelessv1_mower/wirelessv1/`): `device-setting`, `device-setting/{sn}`, `device-schedule/{deviceId}`, `device/getProperty`, `device/setProperty`, `device/saveProperty`, `device/restoreFactory` Die

## Referenzen

- Die Home Assistant-Integration wurde als API-Referenz verwendet: <https://github.com/Sdahl1234/Sunseeker-lawn-mower>
- json2iob: <https://github.com/TA2k/json2iob>
- Sunseeker (drahtlos): <https://sunseekertech.com>
- Scheppach (Draht): <https://shop.scheppach.com/Produkte/Garten-Hof/Rasenmaeher/Rasenmaehroboter/>
- Texas (Wire): <https://texas-gartentechnik.eu/Sortiment/Maehroboter/>
- Adano (Wire): <https://schou.com/en/pages/robotplaeneklippere>
- Brücke (Draht): Kein HP
- Orbex (drahtgebunden): Kein HP
- Grouw (Draht): <https://schou.com/en/pages/robotplaeneklippere>

## Beschreibung

🇬🇧 [Beschreibung](/#/docs/adapterref/iobroker.sunseeker/docs/en/README.md)</br> 🇩🇪 [Beschreibung](https://github.com/iobroker-community-adapters/ioBroker.sunseeker/blob/main/docs/de/README.md)

## Fragen

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