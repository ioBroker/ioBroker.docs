---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tado/README.md
title: ioBroker.tado
hash: FDeUA8Sz2ytPQVx+0HI4Ezf0Q0WHIYrxRFwe8K/Jr4A=
---
# ioBroker.tado

![Количество установок](http://iobroker.live/badges/tado-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.tado.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tado.svg)
![Известные уязвимости](https://snyk.io/test/github/DrozmotiX/ioBroker.tado/badge.svg)
![Статус зависимости](https://img.shields.io/librariesio/release/npm/iobroker.tado)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/tado/svg-badge.svg)
![Тестирование и выпуск](https://github.com/DrozmotiX/ioBroker.tado/workflows/Test%20and%20Release/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.tado.png?downloads=true)

<img src="./admin/tado.png" width="50" height="50">

## адаптер tado для ioBroker

Tado° ( <https://www.tado.com> ) — эксперт в области интеллектуального отопления и управления энергопотреблением для вашего дома, разработанный и созданный в Германии. Экономьте энергию и сокращайте расходы навсегда вместе с нами — наслаждайтесь уютным и экологичным домом.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## !ВАЖНО! Tado° ввела ограничения на количество вызовов API.

Компания Tado ввела ограничение на количество вызовов API. Пользователи без подписки на Auto-Assist ограничены 100 вызовами в день.\
&#x20;Для получения более подробной информации, пожалуйста, обратитесь к [этой](https://support.tado.com/en/articles/12165739-limitation-for-rest-api-usage) статье.\
&#x20;В адаптер Tado ioBroker добавлена новая функция, предоставляющая новые возможности настройки для управления использованием API. Тем не менее, дневной лимит в 100 вызовов означает, что адаптер не может использоваться без подписки Auto-Assist. Это означает всего около четырех запросов в час, что значительно ограничивает функциональность адаптера.\
&#x20;Если вас не устраивает решение Тадо, вы должны им об [этом сообщить](https://support.tado.com/de/articles/3590239-wie-kann-ich-den-kundensupport-von-tado-kontaktieren) !

## Тадо° X

Доступна базовая поддержка Tado° X. Если ваша конфигурация не работает, пожалуйста, создайте [заявку в службу поддержки](https://github.com/DrozmotiX/ioBroker.tado/issues/new?assignees=HGlab01\&labels=enhancement\&projects=\&template=Enhancement.md\&title=) . Вам потребуется провести отладку и взаимодействовать с разработчиком адаптера для улучшения функциональности Tado° X.

## Что можно контролировать на Tado° V3+, V3, V2

| Состояние                                                                            | Описание                                                                                                                        |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| tado.\[x].\[yyyyyy].Rooms.\[z].setting.power                                         | Включение/выключение устройства                                                                                                 |
| тадо.\[x].\[yyyyyy].Комнаты.\[z].настройка.температура.градусы Цельсия               | Определить температуру                                                                                                          |
| tado.\[x].\[yyyyyy].Rooms.\[z].overlayClearZone                                      | Переключиться в автоматический режим                                                                                            |
| tado.\[x].\[yyyyyy].Rooms.\[z].overlay.termination.typeSkillBasedApp                 | Установить режим расписания                                                                                                     |
| tado.\[x].\[yyyyyy].Rooms.\[z].overlay.termination.durationInSeconds                 | Укажите, как долго будет действовать режим расписания.                                                                          |
| тадо.\[x].\[yyyyyy].Комнаты.\[z].устройства.\[RUaaaaaaaaaa].смещение.смещениеЦельсия | Смещение температуры                                                                                                            |
| tado.\[x].\[yyyyyy].Rooms.\[z].devices.\[RUaaaaaaaaaa].childLockEnabled              | Включение/выключение блокировки от детей                                                                                        |
| tado.\[x].\[yyyyyy].Rooms.\[z].timeTables.tt\_id                                     | Выберите активное расписание                                                                                                    |
| tado.\[x].\[yyyyyy].Rooms.\[z].openWindowDetection.openWindowDetectionEnabled        | Включение/отключение функции обнаружения открытого окна на термостате                                                           |
| tado.\[x].\[yyyyyy].Rooms.\[z].openWindowDetection.timeoutInSeconds                  | Тайм-аут – время, в течение которого термостаты отключаются при обнаружении открытого окна.                                     |
| tado.\[x].\[yyyyyy].Rooms.\[z].activateOpenWindow                                    | Выключайте термостат при обнаружении открытого окна (работает только в том случае, если термостат обнаруживает открытое окно).  |
| tado.\[x].\[yyyyyy].Rooms.\[z].setting.mode                                          | Режим переменного тока (только для устройств переменного тока)                                                                  |
| tado.\[x].\[yyyyyy].Rooms.\[z].setting.fanspeed                                      | Fanspeed (только для устройств переменного тока с версиями V3 и выше)                                                           |
| tado.\[x].\[yyyyyy].Rooms.\[z].setting.fanLebel                                      | Fanlebel (только для устройств AC с версией V3+)                                                                                |
| tado.\[x].\[yyyyyy].Rooms.\[z].setting.verticalSwing                                 | Вертикальное качание (только для устройств переменного тока версии V3+)                                                         |
| tado.\[x].\[yyyyyy].Rooms.\[z].setting.horizontalSwing                               | Горизонтальное качание (только для устройств переменного тока с версией V3 и более старыми)                                     |
| тадо.\[х].\[гггггггг].Домашний.штат.присутствие                                      | Установите режим «Дома», «Вне дома» или «Авто».                                                                                 |
| tado.\[x].\[yyyyyy].Home.masterswitch                                                | Включите/выключите все устройства                                                                                               |
| tado.\[x].\[yyyyyy].meterReadings                                                    | Объект JSON с параметрами {"date":"YYYY-MM-DD","reading": 1234} можно использовать для загрузки показаний счетчика в Energy IQ. |

## На Tado° X можно управлять различными элементами конструкции.

| Состояние                                                                      | Описание                                                                                                                        |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| tado.\[x].\[yyyyyy].Rooms.\[z].setting.power                                   | Включение/выключение устройства                                                                                                 |
| tado.\[x].\[yyyyyy].Rooms.\[z].setting.temperature.value                       | Определить температуру                                                                                                          |
| tado.\[x].\[yyyyyy].Rooms.\[z].manualControlTermination.controlType            | Установить режим расписания                                                                                                     |
| tado.\[x].\[yyyyyy].Rooms.\[z].manualControlTermination.remainingTimeInSeconds | Продолжительность работы в режиме таймера                                                                                       |
| tado.\[x].\[yyyyyy].Rooms.\[z].resumeScheduleRoom                              | Для этой комнаты вернуться в автоматический режим.                                                                              |
| tado.\[x].\[yyyyyy].Rooms.\[z].devices.\[VAaaaaaaaaaa].temperatureOffset       | Изменить смещение устройства                                                                                                    |
| тадо.\[x].\[yyyyyy].Комнаты.резюмеРасписаниеГлавная                            | Возврат в автоматический режим для всех комнат.                                                                                 |
| тадо.\[x].\[гггггг].Rooms.allВыкл.                                             | Выключите все комнаты                                                                                                           |
| tado.\[x].\[yyyyyy].Rooms.boost                                                | Переведите все комнаты в режим повышения мощности.                                                                              |
| тадо.\[х].\[гггггггг].Домашний.штат.присутствие                                | Установите режим «Дома», «Вне дома» или «Авто».                                                                                 |
| tado.\[x].\[yyyyyy].meterReadings                                              | Объект JSON с параметрами {"date":"YYYY-MM-DD","reading": 1234} можно использовать для загрузки показаний счетчика в Energy IQ. |

## Требует

- Node.js 22 или выше
- ioBroker host (js-controller) 7.0.6 или выше
- iorBroker.admin 7.7.2 или выше

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (DutchmanNL) Maintenance: raise Node.js to 22, modernise CI and release tooling, update dependencies, resolve repository checker findings

### 0.8.5 (2026-06-19)
* (HGlab01) improve code quality
* (HGlab01) add attribute adminUserId
* (HGlab01) use automated translation into several languages
* (HGlab01) bump axios to 1.8.0

### 0.8.4 (2026-02-24)
* (HGlab01) checkExpire for termination-attributes
* (HGlab01) add attributes 'smartReminders' & 'smartRemindersInAppEnabled'
* (HGlab01) fix #1107 masterswitch turning OFF does not work any longer
* (HGlab01) fix #1117 Request failed with status code 400 with response "Unsupported content type"
* (HGlab01) bump axios to 1.13.5

### 0.8.3 (2025-11-13)
* (HGlab01) add capability to set OffSet [TadoX]
* (HGlab01) Implement deboucing also for TadoX
* (HGlab01) fix nextScheduleChange is missing the required property "common.type" [TadoX]

### 0.8.2 (2025-11-07)
* (HGlab01) add retry mechanism when it comes to timeouts
* (HGlab01) add attribute 'isRoomLinkRestricted'
* (HGlab01) finally fix definition missing for 'awayMode' with value 'null' [TadoX]
* (HGlab01) finally fix definition missing for 'holidayMode' with value 'null' [TadoX]
* (HGlab01) bump iobroker-jsonExplorer to 0.2.2
* (HGlab01) bump axios to 1.13.2

### 0.8.1 (2025-11-04)
* (HGlab01) code refactorings
* (HGlab01) fix issue 'definition missing for holidayMode' [TadoX]
* (HGlab01) fix issue 'cannot read properties of undefined (reading 'match')'
* (HGlab01) fix issue openWindow data not up to date #1086

[Older changelogs can be found there](https://github.com/DrozmotiX/ioBroker.tado/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2020-2026 HGlab01 <myiobrokeradapters@gmail.com>

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