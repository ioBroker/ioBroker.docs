---
chapters: {"pages":{"en/adapterref/iobroker.sunseeker/README.md":{"title":{"en":"ioBroker.sunseeker"},"content":"en/adapterref/iobroker.sunseeker/README.md"},"en/adapterref/iobroker.sunseeker/docs/en/README.md":{"title":{"en":"ioBroker.sunseeker"},"content":"en/adapterref/iobroker.sunseeker/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sunseeker/README.md
title: ioBroker.sunseeker
hash: 6SgHiy5QAqMpE209rTAaRmeKs96UB2M8Dw7W532o9SU=
---
![Логотип](../../../en/adapterref/iobroker.sunseeker/admin/sunseeker.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.sunseeker.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sunseeker.svg)
![Количество установок](https://iobroker.live/badges/sunseeker-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/sunseeker-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.sunseeker.png?downloads=true)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.sunseeker/workflows/Test%20and%20Release/badge.svg)

# ioBroker.sunseeker

## Адаптер для газонокосилки Sunseeker для ioBroker

Подключает роботизированные газонокосилки Sunseeker (также выпускавшиеся под брендами Adano, Brücke и др.) к ioBroker через официальное облако Sunseeker. Обе модели (`Old`) и текущий (`New` Поддерживаются API-интерфейсы Sunseeker, охватывающие классы моделей S, X, V и V1.

## Требования

- ioBroker js-controller `>= 6.0.11`
- Администратор `>= 7.8.23`
- Node.js `>= 22`
- Облачная учетная запись Sunseeker (электронная почта + пароль, такие же, как в мобильном приложении).

## Обзор API

| Область                      | Конечные точки                                                                                                                                                                                                                                                           | Использовал?                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| Авторизация                  | `POST /auth/oauth/token` (вход в систему + обновление страницы), `auth/mobile/token/social`                                                                                                                                                                               | Да                                     |
| Список устройств             | `GET /app_wireless_mower/device-user/getCustomDevice`, `…/list`, `…/{id}`, `…/remark`                                                                                                                                                                                    | Да (`getCustomDevice`)                |
| Статус                       | `GET /app_wireless_mower/device/getBysn`, `…/info/{id}`, `…/check`, `…/readWeakSignal`, `…/getSignalType`                                                                                                                                                                | Да (`getBysn`)                        |
| Настройки (читать)           | `GET /app_wireless_mower/device-setting/{sn}`, `…/getTime/{sn}`, `device/getDeviceSettingBySn`, `device-configuration/getBySn/{sn}`, `device-model/getByClientName`                                                                                                      | Да (`device-setting/{sn}`)            |
| Настройки (запись, новый)    | `POST /iot_mower/wireless/device/set_property` (S/X/V), `POST /app_wirelessv1_mower/wirelessv1/device/setProperty` (V1), `POST /app_wireless_mower/device/setRain/{sn}/{appId}`, `…/setWifi`, `…/appEditDevice`                                                            | Частичный (`set_property` (для лезвия) |
| Настройки (запись, старые)   | `POST /app_mower/device-setting/save`, `…/updateLocation`, `…/updateTimeZone`, `device/setLed`, `…/saveLed`, `…/setRain`, `…/saveRain`, `…/setUltra`, `…/saveUltra`, `…/setZones`, `…/setNickName`, `…/setGps`, `…/setCurrentTime`, `…/setWorkStatus`, `…/resetPassword` | Нет                                    |
| Расписание                   | `POST /app_mower/device-schedule/setScheduling` (Старый), `app_mower/device-schedule/save`, `app_mower/device/getScheduling`, `POST /app_wireless_mower/.../setProperty` с `setSchedule` (V1) и `set_property` с `setTimeTactics` (S/X/V)                                    | Да (все три пути)                      |
| MQTT-прокси через REST       | `POST /iot_mower/wireless/device/get_property`, `…/set_property`, `…/action`, `…/extra`, `…/otaUpgrade`, `…/bindBaseStation`                                                                                                                                             | Да (`get_property` (после подключения) |
| Карты                        | `GET /wireless_map/wireless_device/get`, `…/getHeatMap`, `…/get3D`, `wireless_map/backup_map/get`, `map/work-map/mobile/{sn}`, `…/newest/{online}/{sn}`, `…/all-info`, `app_wireless_mower/device/getMapRealPath`                                                        | Да (`get` +`getHeatMap`)              |
| Записи о работе              | `GET /app_wireless_mower/work_record/page`, `…/work_event_info/page`, `device_log/device-operation-records/esPage`, `app_mower/device-record/getRecord/{sn}`, `app_mower/device-cmd-logs/page`                                                                           | Да (`get` +`work_record/page`)        |
| Противоугонная система / GPS | `gps/mobile/anti-theft/by-sn/{sn}`, `…/device-position/{sn}`, `…/getAntiTheftStatusInfo`, `…/is-it-bound`, `…/set-fence`, `…/wireless/bind`, `gps/anti-theft/send-track`, `gps/fence-radius-setting/list`                                                                | Нет                                    |
| Базовая станция              | `station/base-station/bind`, `…/unBind`, `…/getByDeviceSn`, `…/getByStationSn/{sn}`                                                                                                                                                                                      | Нет                                    |
| ОТА                          | `ota/firmware-large/check/{sn}/{ver}`, `…/getDescription`, `…/otaUpdate`, `…/wireless/check`, `ota/firmware-small/list/{id}`                                                                                                                                             | Нет                                    |
| Совместное использование     | `app_wireless_mower/device-user-share`, `…/invite/detail`, `…/invite/reply`, `…/unbind`, `device-user/openShare`, `…/closeShare`                                                                                                                                         | Нет                                    |
| Кожа / косметика             | `app_wireless_mower/device-skin`, `…/list`, `…/bind/switch{userId}/{id}`                                                                                                                                                                                                 | Нет                                    |
| Оплата                       | `pay/v1/mobile/combo/*`, `pay/v1/mobile/order/*`, `pay/v1/paypal/*`, `pay/v1/user/card/holder*`                                                                                                                                                                          | Нет                                    |
| Разное                       | `app_wireless_mower/feedback-record`, `community_activities/*`, `message-send-logs/*`, `app-version/check`, `app-agreements/business-types/{type}/items`, `sale/manual/getManualBySn`, `link-address/list/{type}`                                                        | Нет                                    |

V1-специфический (`app_wirelessv1_mower/wirelessv1/`): `device-setting`, `device-setting/{sn}`, `device-schedule/{deviceId}`, `device/getProperty`, `device/setProperty`, `device/saveProperty`, `device/restoreFactory`.

## Ссылки

- В качестве примера использования API-интерфейса используется интеграция с Home Assistant: <https://github.com/Sdahl1234/Sunseeker-lawn-mower>
- json2iob: <https://github.com/TA2k/json2iob>
- Sunseeker (беспроводная связь): <https://sunseekertech.com>
- Шеппах (провод): <https://shop.scheppach.com/Produkte/Garten-Hof/Rasenmaeher/Rasenmaehroboter/>
- Техас (информационный канал): <https://texas-gartentechnik.eu/Sortiment/Maehroboter/>
- Адано (wire): <https://schou.com/en/pages/robotplaeneklippere>
- Brücke (wire): No HP
- Orbex (проводной): Нет HP
- Grouw (провод): <https://schou.com/en/pages/robotplaeneklippere>

## Описание

🇬🇧 [Описание](/#/docs/adapterref/iobroker.sunseeker/docs/en/README.md)</br> 🇩🇪 [Описание](https://github.com/iobroker-community-adapters/ioBroker.sunseeker/blob/main/docs/de/README.md)

## Вопросы

🇩🇪 [Вопросы](https://forum.iobroker.net/topic/84650/test-adapter-sunseeker?_=1781193847690)

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