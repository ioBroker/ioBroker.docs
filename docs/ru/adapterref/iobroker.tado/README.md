---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tado/README.md
title: ioBroker.tado
hash: KXxKax0NFNwCyfYeQhzwzMl39r3rJCPv2LdKDjNUqqs=
---
# IoBroker.tado

![Количество установок](http://iobroker.live/badges/tado-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.tado.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tado.svg)
![Известные уязвимости](https://snyk.io/test/github/DrozmotiX/ioBroker.tado/badge.svg)
![Статус зависимости](https://img.shields.io/librariesio/release/npm/iobroker.tado)
![НПМ](https://nodei.co/npm/iobroker.tado.png?downloads=true)

<img src="./admin/tado.png" width="50" height="50">

[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/tado/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) ![Тестируйте и выпускайте](https://github.com/DrozmotiX/ioBroker.tado/workflows/Test%20and%20Release/badge.svg)

## Адаптер tado для ioBroker
tado° обеспечивает комфортный и здоровый климат, экономя при этом до 31% на счетах за отопление.

## Вещи, которыми вы можете управлять
| состояние | Описание |
| ----- | ----------- |
| tado.[x].[yyyyyy].Rooms.[z].setting.power | Включить/выключить устройство |
| tado.[x].[yyyyyy].Rooms.[z].setting.temperature.celsius | Определить температуру |
| tado.[x].[yyyyyy].Rooms.[z].overlayClearZone | Переключиться в автоматический режим |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.typeSkillBasedApp | Установить режим расписания |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.durationInSeconds | Установите, как долго будет применяться режим расписания |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].offset.offsetCelsius | Смещение температуры |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].childLockEnabled | Блокировка от детей вкл/выкл |
| tado.[x].[yyyyyy].Rooms.[z].timeTables.tt_id | Выберите активное расписание |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.openWindowDetectionEnabled | Включить/выключить обнаружение открытого окна на термостате |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.timeoutInSeconds | Тайм-аут, как долго термостаты выключаются при обнаружении открытого окна |
| tado.[x].[yyyyyy].Rooms.[z].activateOpenWindow | Выключать термостаты при обнаружении открытого окна (работает, только если термостат обнаруживает открытое окно) |
| tado.[x].[yyyyyy].Home.state.presence | Установите режим ДОМА или ВНЕШНИЙ |
| tado.[x].[yyyyyy].Home.masterswitch | Включить/выключить все устройства |
| tado.[x].[yyyyyy].Rooms.[z].setting.mode | Режим переменного тока (только устройства переменного тока) |
| tado.[x].[yyyyyy].Rooms.[z].setting.fanspeed | Fanspeed (только устройства переменного тока с версией V3 и более ранними) |
| tado.[x].[yyyyyy].Rooms.[z].setting.fanLebel | Fanlebel (только устройства переменного тока версии V3+) |
| tado.[x].[yyyyyy].Rooms.[z].setting.verticalSwing | Вертикальное качание (только устройства переменного тока с версией V3+) |
| tado.[x].[yyyyyy].Rooms.[z].setting.horizontalSwing | Горизонтальное качание (только устройства переменного тока версии V3 и старше) |

## Требует
* NodeJS 14.16 или выше
* Хост ioBroker (js-контроллер) 4.0 или выше

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.4.4 (2023-02-03)
* (HGlab01) Add attribute 'energyIqReminder' and 'specialOffersEnabled'
* (HGlab01) Bump axios to 1.3.1
* (HGlab01) Fix 'Invalid value TADO_MODE' (#585)

### 0.4.3 (2022-12-06)
* (HGlab01) Bump ioBroker-jsonExplorer to 0.1.10 (#551)
* (HGlab01) Bump axios to 1.2.1 (final fix for #561)
* (HGlab01) Improve logs

### 0.4.2 (2022-11-27)
* (HGlab01) Downgrade axios to 1.1.3 (#561)

### 0.4.1 (2022-11-24)
* (HGlab01) Add attribute isBalanceAcEligible
* (HGlab01) Bump axios from 0.27.2 to 1.2.0
* (HGlab01) Bump simple-oauth2 from 4.3.0 to 5.0.0

### 0.4.0 (2022-09-05)
* (HGlab01) !Breaking change! NodeJS 14.16 or higher required
* (HGlab01) !Breaking change! ioBroker js-controller 4.0 or higher required
* (HGlab01) Bump is-online from 9.0.1 to 10.0.0

## License
MIT License

Copyright (c) 2022 DutchmanNL <rdrozda@hotmail.com> & HGlab01

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