---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tado/README.md
title: ioBroker.tado
hash: geVZ7oXA8AL/ojS3YQGyqgz0/bMerKYEh5QjLFk6zy8=
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

## ТАДО° X
Tado X **в настоящее время не поддерживается** этим адаптером. Адаптер поддерживает Tado V3, V3+ и V2.
Если кто-то поддерживает добавление функциональности Tado X, создайте тикет или отправьте электронное письмо на адрес <myiobrokeradapters@gmail.com>. Вам нужно будет поддержать сеанс отладки и взаимодействовать с разработчиком адаптера.

## Вещи, которыми можно управлять
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
| tado.[x].[yyyyyy].Home.state.presence | Установить режим HOME, AWAY или AUTO |
| tado.[x].[yyyyyy].Home.masterswitch | Включить/выключить все устройства |
| tado.[x].[yyyyyy].Rooms.[z].setting.mode | Режим переменного тока (только устройства переменного тока) |
| tado.[x].[yyyyyy].Rooms.[z].setting.fanspeed | Скорость вентилятора (только устройства переменного тока с V3 и более ранними версиями) |
| tado.[x].[yyyyyy].Rooms.[z].setting.fanLebel | Fanlebel (только устройства AC с версией V3+) |
| tado.[x].[yyyyyy].Rooms.[z].setting.verticalSwing | Вертикальное качание (только устройства переменного тока с версией V3+) |
| tado.[x].[yyyyyy].Rooms.[z].setting.horizontalSwing | Горизонтальное качание (только устройства переменного тока с V3 и более старыми версиями) |

## Требует
* Node.js 18 или выше
* ioBroker хост (js-контроллер) 5.0 или выше

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.5.6 (2024-08-06)
* (HGlab01) Improve AccessToken Management
* (HGlab01) Bump axios to 1.7.3
* (HGlab01) Add attribute 'language'
* (HGlab01) Add attribute 'isHeatPumpInstalled'

### 0.5.5 (2024-06-25)
* (HGlab01) Bump axios to 1.7.2

### 0.5.4 (2024-04-18)
* (HGlab01) Add attribute 'runningOfflineSchedule'
* (HGlab01) Bump axios to 1.6.8

### 0.5.3 (2024-01-29)
* (HGlab01) Improve axios handling
* (HGlab01) Bump axios to 1.6.7

### 0.5.1 (2023-12-11)
* (HGlab01) Bump json-explorer to 0.1.15
* (HGlab01) Prepare (c) for 2024

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