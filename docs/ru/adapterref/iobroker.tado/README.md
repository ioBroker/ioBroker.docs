---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tado/README.md
title: ioBroker.tado
hash: fxDUb+ewLgqw9B7cs1nMbtDhciGpVjNg8zxzfTyb2bY=
---
# IoBroker.tado

![Количество установок](http://iobroker.live/badges/tado-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.tado.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tado.svg)
![Известные уязвимости](https://snyk.io/test/github/DrozmotiX/ioBroker.tado/badge.svg)
![Статус зависимости](https://img.shields.io/librariesio/release/npm/iobroker.tado)
![НПМ](https://nodei.co/npm/iobroker.tado.png?downloads=true)

<img src="./admin/tado.png" width="50" height="50">

[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/tado/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) ![Тестирование и выпуск](https://github.com/DrozmotiX/ioBroker.tado/workflows/Test%20and%20Release/badge.svg)

## Адаптер tado для ioBroker
tado° обеспечивает комфортный и здоровый климат, экономя до 31% на счетах за отопление.

## Вещи, которыми можно управлять
| Государство | Описание |
| ----- | ----------- |
| tado.[x].[yyyyyy].Rooms.[z].setting.power | Включить/выключить устройство |
| тадо.[x].[yyyyyy].Комнаты.[z].setting.temperature.celsius | Определить температуру |
| tado.[x].[yyyyyy].Rooms.[z].overlayClearZone | Переключиться в автоматический режим |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.typeSkillBasedApp | Установить режим расписания |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.durationInSeconds | Установите, как долго будет действовать режим расписания |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].offset.offsetCelsius | Смещение температуры |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].childLockEnabled | Блокировка от детей вкл/выкл |
| tado.[x].[yyyyyy].Rooms.[z].timeTables.tt_id | Выбрать активное расписание |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.openWindowDetectionEnabled | Включить/выключить обнаружение открытого окна на термостате |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.timeoutInSeconds | Тайм-аут, в течение которого термостаты отключаются при обнаружении открытого окна |
| tado.[x].[yyyyyy].Rooms.[z].activateOpenWindow | Выключать термостаты при обнаружении открытого окна (работает только в том случае, если термостат обнаруживает открытое окно) |
| тадо.[x].[гггггг].Home.state.presence | Установите режим ДОМА, В гостях или АВТО |
| тадо.[x].[гггггг].Home.masterswitch | Включить/выключить все устройства |
| tado.[x].[yyyyyy].Rooms.[z].setting.mode | Режим переменного тока (только устройства переменного тока) |
| tado.[x].[yyyyyy].Rooms.[z].setting.fanspeed | Скорость вентилятора (только устройства переменного тока с V3 и более ранними версиями) |
| tado.[x].[yyyyyy].Rooms.[z].setting.fanLebel | Fanlebel (только устройства переменного тока версии V3+) |
| tado.[x].[yyyyyy].Rooms.[z].setting.verticalSwing | Вертикальное качание (только устройства переменного тока версии V3+) |
| tado.[x].[yyyyyy].Rooms.[z].setting.horizontalSwing | Горизонтальное качание (только устройства переменного тока с V3 и более ранними версиями) |

## Требует
* NodeJS 16 или выше
* Хост ioBroker (js-контроллер) 4.0 или выше

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__

-->
### 0.4.11 (2023-10-09)
* (HGlab01) Bump json-explorer to 0.1.14
* (Garfonso) add AUTO for *.Home.state.presence (in addtion to HOME and AWAY)

### 0.4.10 (2023-09-26)
* (HGlab01) Add attribute 'isBalanceHpEligible'
* (HGlab01) improve axios keep_a_live

### 0.4.9 (2023-07-05)
* (HGlab01) Add attribute 'zonesCount'
* (HGlab01) Bump ioBroker-jsonExplorer to 0.1.12

### 0.4.8 (2023-05-12)
* (HGlab01) Add attribute 'isHeatSourceInstalled'
* (HGlab01) Bump axios to 1.4.0

### 0.4.7 (2023-04-26)
* (HGlab01) Add attribute 'generation'
* (HGlab01) improve axios error handling
* (HGlab01) Bump axios to 1.3.6

## License
MIT License

Copyright (c) 2023 HGlab01 & DutchmanNL <rdrozda@hotmail.com>

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