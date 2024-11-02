---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tado/README.md
title: ioBroker.tado
hash: JuvG0mDiM8nB+9E4FTL4MJgYdkQSlYOUQEYUWl4/VJQ=
---
# IoBroker.tado

![Количество установок](http://iobroker.live/badges/tado-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.tado.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tado.svg)
![Известные уязвимости](https://snyk.io/test/github/DrozmotiX/ioBroker.tado/badge.svg)
![Статус зависимости](https://img.shields.io/librariesio/release/npm/iobroker.tado)
![НПМ](https://nodei.co/npm/iobroker.tado.png?downloads=true)

<img src="./admin/tado.png" width="50" height="50">

[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/tado/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) ![Тест и выпуск](https://github.com/DrozmotiX/ioBroker.tado/workflows/Test%20and%20Release/badge.svg)

## Адаптер tado для ioBroker
Tado° (https://www.tado.com) — эксперт в области интеллектуального отопления и управления энергией для вашего дома, разработанный и созданный в Германии. Экономьте энергию и сокращайте расходы навсегда вместе с нами — наслаждайтесь уютным и устойчивым домом.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Тадо° X
Доступна базовая поддержка Tado° X.
Если ваша настройка не работает, пожалуйста, поднимите [билет](https://github.com/DrozmotiX/ioBroker.tado/issues/new?assignees=HGlab01&labels=enhancement&projects=&template=Enhancement.md&title=). Вам нужно будет поддержать сеанс отладки и взаимодействовать с разработчиком адаптера для улучшения функций Tado° X.

## Чем можно управлять на Tado° V3+, V3, V2
| Состояние | Описание |
| ----- | ----------- |
| tado.[x].[yyyyyy].Rooms.[z].setting.power | Включить/выключить устройство |
| tado.[x].[yyyyyy].Rooms.[z].setting.temperature.celsius | Определить температуру |
| tado.[x].[yyyyyy].Rooms.[z].overlayClearZone | Переключиться в автоматический режим |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.typeSkillBasedApp | Установить режим расписания |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.durationInSeconds | Установить, как долго будет применяться режим расписания |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].offset.offsetCelsius | Смещение температуры |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].childLockEnabled | Блокировка от детей вкл/выкл |
| tado.[x].[yyyyyy].Rooms.[z].timeTables.tt_id | Выбрать активное расписание |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.openWindowDetectionEnabled | Включить/выключить обнаружение открытого окна на термостате |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.timeoutInSeconds | Тайм-аут, через который термостаты будут выключены при обнаружении открытого окна |
| tado.[x].[yyyyyy].Rooms.[z].activateOpenWindow | Выключить термостаты при обнаружении открытого окна (работает только если термостат обнаруживает открытое окно) |
| tado.[x].[yyyyyy].Rooms.[z].setting.mode | Режим переменного тока (только устройства переменного тока) |
| tado.[x].[yyyyyy].Rooms.[z].setting.fanspeed | Скорость вентилятора (только устройства переменного тока с V3 и более ранними версиями) |
| tado.[x].[yyyyyy].Rooms.[z].setting.fanLebel | Fanlebel (только устройства AC с версией V3+) |
| tado.[x].[yyyyyy].Rooms.[z].setting.verticalSwing | Вертикальное качание (только устройства переменного тока с версией V3+) |
| tado.[x].[yyyyyy].Rooms.[z].setting.horizontalSwing | Горизонтальное качание (только устройства переменного тока с V3 и более старыми версиями) |
| tado.[x].[yyyyyy].Home.state.presence | Установить режим HOME, AWAY или AUTO |
| tado.[x].[yyyyyy].Home.masterswitch | Включить/выключить все устройства |
| tado.[x].[yyyyyy].meterReadings | JSON-объект с {"date":"YYYY-MM-DD","reading": 1234} можно использовать для загрузки показаний счетчиков в Energy IQ |

## Чем можно управлять на Tado° X
| Состояние | Описание |
| ----- | ----------- |
| tado.[x].[yyyyyy].Rooms.[z].setting.power | Включить/выключить устройство |
| tado.[x].[yyyyyy].Rooms.[z].setting.temperature.value | Определить температуру |
| tado.[x].[yyyyyy].Rooms.[z].manualControlTermination.controlType | Установить режим расписания |
| tado.[x].[yyyyyy].Rooms.[z].manualControlTermination.remainingTimeInSeconds | Продолжительность времени для режима таймера |
| tado.[x].[yyyyyy].Rooms.[z].resumeScheduleRoom | Вернуться в автоматический режим для этой комнаты |
| tado.[x].[yyyyyy].Rooms.resumeScheduleHome | Вернуться в автоматический режим для всех комнат |
| tado.[x].[yyyyyy].Rooms.allOff | Выключить все комнаты |
| tado.[x].[yyyyyy].Rooms.boost | Переключить все комнаты в режим усиления |
| tado.[x].[yyyyyy].Home.state.presence | Установить режим HOME, AWAY или AUTO |
| tado.[x].[yyyyyy].meterReadings | JSON-объект с {"date":"YYYY-MM-DD","reading": 1234} можно использовать для загрузки показаний счетчиков в Energy IQ |

## Требует
* Node.js 18 или выше
* ioBroker хост (js-контроллер) 5.0 или выше

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.6.0 (2024-10-23)
* (HGlab01) Start supporting Tado° X

### 0.5.9 (2024-10-16)
* (HGlab01) Improve axios promise handling

### 0.5.7 (2024-09-30)
* (HGlab01) Change of attribute "light" supported
* (HGlab01) Add attribute 'connection'
* (HGlab01) Add attribute 'supportsFlowTemperatureOptimization'
* (HGlab01) Bump axios to 1.7.7
* (HGlab01) EnergyIQ meter-readings can be uploaded

### 0.5.6 (2024-08-06)
* (HGlab01) Improve AccessToken Management
* (HGlab01) Bump axios to 1.7.3
* (HGlab01) Add attribute 'language'
* (HGlab01) Add attribute 'isHeatPumpInstalled'

### 0.5.5 (2024-06-25)
* (HGlab01) Bump axios to 1.7.2

## License
MIT License

Copyright (c) 2024 HGlab01 <myiobrokeradapters@gmail.com> & DutchmanNL <oss@drozmotix.eu>

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