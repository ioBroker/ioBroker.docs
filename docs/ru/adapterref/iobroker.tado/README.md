---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tado/README.md
title: ioBroker.tado
hash: Z7CxzGNDPG5NM+CfvhcM9fc9SbEmmlJ2tK70SWV3ShM=
---
# IoBroker.tado

![Количество установок](http://iobroker.live/badges/tado-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.tado.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tado.svg)
![Статус зависимости](https://img.shields.io/david/DrozmotiX/iobroker.tado.svg)
![Известные уязвимости](https://snyk.io/test/github/DrozmotiX/ioBroker.tado/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.tado.png?downloads=true)

<img src="./admin/tado.png" width="50" height="50">

[![Статус перевода] (https://weblate.iobroker.net/widgets/adapters/-/tado/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

![Тестирование и выпуск](https://github.com/DrozmotiX/ioBroker.tado/workflows/Test%20and%20Release/badge.svg)

## Адаптер tado для ioBroker
tado ° обеспечивает комфортный и здоровый климат, экономя до 31% на счетах за отопление.

## Поддержите меня
Если вам нравятся мои работы, пожалуйста, сделайте личное пожертвование (это личная ссылка для пожертвования для DutchmanNL, не имеющая отношения к проекту ioBroker! [![Пожертвовать] (https://raw.githubusercontent.com/DrozmotiX/ioBroker.tado/main/admin/button.png)](http://paypal.me/DutchmanNL)

## Критические изменения в v0.3.x
Рекомендация: Если возможно, сначала удалите старую установку адаптера или удалите все состояния, чтобы в установке не осталось неподдерживаемых состояний.
Обновление с 0.2.x до v0.3.x включает техническое переоснащение с критическими изменениями. Некоторые состояния изменили там имя / путь, например.

| v0.2.x | v0.3.x |
| ------ | ------ |
| tado. [x]. [yyyyy] .Rooms. [z] .setting.temperature | tado. [x]. [yyyyy] .Rooms. [z] .setting.temperature.celsius |
| тадо. [x]. [yyyyy] .Rooms. [z] .overlay.clearZoneOverlay | тадо. [x]. [yyyyy] .Rooms. [z] .overlayClearZone |
| tado. [x]. [yyyyy] .Rooms. [z] .Actual_Temperature | tado. [x]. [yyyyy] .Rooms. [z] .sensorDataPoints.insideTemperature.celsius |
| тадо. [x]. [yyyyy] .Rooms. [z] .Actual_Humidity | tado. [x]. [yyyyy] .Rooms. [z] .sensorDataPoints.humidity.percentage |
| тадо. [x]. [yyyyy] .Rooms. [z] .heatingPower | tado. [x]. [yyyyy] .Rooms. [z] .. activityDataPoints.heatingPower.percentage |
| тадо. [x]. [yyyyy] .Weather.solarIntensity | тадо. [x]. [yyyyy] .Weather.solarIntensity.percentage |
| tado. [x]. [yyyyy] .Weather.outsideTemperature | tado. [x]. [yyyyy] .Weather.outsideTemperature.celsius |

В общем, vaules теперь NULL, если API отправляет NULL или просто ничего. В v0.2.x иногда сохранялось старое значение, иногда заменялось на 0, иногда использовалось NULL.
** Мы рады добавить дополнительные важные изменения на основе ваших отзывов! **

## Вещи, которыми можно управлять
| Государство | Описание |
| ----- | ----------- |
| тадо. [x]. [yyyyyy] .Rooms. [z] .setting.power | Включение / выключение устройства |
| tado. [x]. [yyyyyy] .Rooms. [z] .setting.temperature.celsius | Определите температуру |
| тадо. [x]. [yyyyyy] .Rooms. [z] .overlayClearZone | Перейти в автоматический режим |
| tado. [x]. [yyyyyy] .Rooms. [z] .overlay.termination.typeSkillBasedApp | Установить режим расписания |
| tado. [x]. [yyyyyy] .Rooms. [z] .overlay.termination.durationInSeconds | Установите, как долго будет действовать режим расписания |
| tado. [x]. [yyyyyy] .Rooms. [z] .devices. [RUaaaaaaaaaa] .offset.offsetCelsius | Температурное смещение |
| тадо. [x]. [yyyyyy] .Rooms. [z] .timeTables.tt_id | Выберите активное расписание |
| тадо. [x]. [yyyyyy] .Home.state.presence | Установите режим ДОМАШНИЙ или ВНЕЗАПНО |
| тадо. [x]. [yyyyyy] .Home.masterswitch | Включение / выключение всех устройств |
| fanpeed | Fanspeed (только для устройств переменного тока) |
| режим | Режим переменного тока (только устройства переменного тока) |

** Не стесняйтесь предоставить конкретные схемы устройств переменного тока для последних двух строк, если у вас есть устройство переменного тока! **

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.3.11-alpha.4 (2021-11-11)
* (HGlab01) support attributes 'showSwitchToAutoGeofencingButton', 'showHomePresenceSwitchButton' and 'additionalConsents'
* (HGlab01) enhance error messages if API-call fails
* (HGlab01) next time block fails (one reason for 422 error) if time blocks are not defined - fixed now
* (HGlab01) set HOME/AWAY is now suported by using state tado.x.yyyyyy.Home.state.presence
* (HGlab01) offset range -9.99/+10 validated
* (HGlab01) add masterswitch for power on/off

### 0.3.10 (2021-10-29)
* (HGlab01) API calls (except read) are queued and send one after the other
* (HGlab01) unhandled errors are now handled
* (HGlab01) Internet connection is checked before requests are placed
* (HGlab01) support attribute 'fanLevel' (Sentry: IOBROKER-TADO-35)
* (HGlab01) support structure element "folder", so now it is folder-->device-->channel
* (HGlab01) add home-states presence and presenceLock
* (HGlab01) Bump iobroker-jsonexplorer to 0.1.5

### 0.3.9 (2021-10-16)
* (DutchmanNL) force correct NodeJS dependency with error at install
* (HGlab01) implement queuing for API requests (avoids some status code 422 issues)

### 0.3.8 (2021-10-06)
* (HGlab01) support attributes 'orientfanLevelation', 'verticalSwing', 'horizontalSwing' (#352)
* (HGlab01) catch 422 issue in poolApiCall()

### 0.3.7 (2021-08-24)
* (HGlab01) ActiveTimeTable can be set (#337)
* (HGlab01) Improve logs and change code structure a little bit
* (HGlab01) manage min/max temperature for heating (5-25 celsius) and hotwater (30-80 celsius) to avoid API crashes (#341)

### 0.3.6 (2021-08-16)
* (HGlab01) support attribute 'orientation' (Sentry: IOBROKER-TADO-35)

### 0.3.5 (2021-08-05)
* (HGlab01) fix issue 'hot water cannot be switched on' (#309)
* (HGlab01) change to new sentry dsn
* (HGlab01) Bump iobroker-jsonexplorer to v0.1.2

### 0.3.4 (2021-07-24)
* (HGlab01) add attribute 'location' to blacklist (Sentry IOBROKER-TADO-2Y)
* (HGlab01) support attribute 'swing' (Sentry: IOBROKER-TADO-2G)
* (HGlab01) support attribute 'end' and 'commandTableUploadState' (Sentry: IOBROKER-TADO-1M)

### 0.3.3 (2021-07-19)
* (HGlab01) Add attributes title, ssid and code
* (HGlab01) Improve sentry handling by bumping iobroker-jsonexplorer to v0.1.1

### 0.3.2 (2021-07-15)
* (HGlab01) Use password handling from JS-Controller framework

### 0.3.1 (2021-07-15)
* (HGlab01) Works with Node 12.x or higher (simple-oauth2 update dependency)
* (HGlab01) Bump simple-oauth2 from 2.5.2 to 4.2.0
* (HGlab01) Prepare for first stable version

### 0.3.0 (2021-06-26)
* (HGlab01) Technical re-factoring of state management !BREAKING CHANGES! (see above)
* (HGlab01) implement offset functionality
* (HGlab01) Set minimum refresh time to 30 seconds
* (HGlab01) Bump iobroker-jsonexplorer to v0.1.0

### 0.2.7 (2021-05-11)
* (HGlab01) prepare for js-controller v3.3.x (has wrong type "xxxx" but has to be "yyyy") (#214)
* (HGlab01) improve state creation by using iobroker-jsonexplorer
* (HGlab01) improve CPU usage (#192)
* (HGlab01) add attribute enabledFeatures (#226)

### 0.2.6 (2021-03-20)
* (HGlab01) apply formatting for main.js
* (HGlab01) add quickActionsEnabled (#164)
* (HGlab01) support HOT_WATER devices (#138)
* (HGlab01) support AIR_CONDITIONING devices (#146)
* (HGlab01) Implement pool handling for setZoneOverlay
* (HGlab01) fix issue: state has no existing object (#184)
* (HGlab01) add cleaning function for existing timer 'polling'
* (HGlab01) state_attr.js: attribute 'support' was defined twice

### 0.2.5 (2020-12-16)
* (HGlab01) add childLockEnabled

### 0.2.4 (2020-11-19)
* (HGlab01) Improve overlay modes + solve merge issue of version 0.2.3

### 0.2.3 (2020-11-18)
* (HGlab01) add overlay methods 'timer'
* (HGlab01) deal with JSON object overlay or openWindow is null
* (HGlab01) Bugfix : Cannot read property 'percentage' of undefined

### 0.2.2 (2020-11-02)
* (HGlab01) add typeSkillBasedApp
* (HGlab01) add autoAssistFreeTrialEnabled
* (HGlab01) Add support for autoAssistFreeTrialEnabled
* (HGlab01) Overlay methods 'manual' and 'next time block'

### 0.2.1 (2020-10-22)
* (DutchmanNL) Update dependency's
* (DutchmanNL) Update testing, remove node 8 and add node 14
* (DutchmanNL) Implement automated deployment with githubActions
* (HGlab01) Support incident Detection
* (LutzHelling) Bugfix : Add orientation
* (LutzHelling) Bugfix : legacyHeatingInstallationsEnabled
* (HGlab01) Bugfix : Add legacyHeatingInstallationsEnabled to DoHome
* (HGlab01) Bugfix : Fix unhandled information found in DoReadDevices

## License
MIT License

Copyright (c) 2021 DutchmanNL <rdrozda@hotmail.com> & HGlab01

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