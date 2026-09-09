---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.oxxify-fan-control/README.md
title: ioBroker.oxxify-fan-control
hash: Q4JDkJPjsHd7ISzDxIESCaE3riaj8ZXysX/ubjmMbCc=
---
![Версия NPM](https://img.shields.io/npm/v/iobroker.oxxify-fan-control.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.oxxify-fan-control.svg)
![node-lts](https://img.shields.io/node/v-lts/iobroker.oxxify-fan-control)
![Статус зависимостей Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.oxxify-fan-control?label=npm%20dependencies)
![Количество установок](https://iobroker.live/badges/oxxify-fan-control-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.oxxify-fan-control.png?downloads=true)
![Бета](https://img.shields.io/npm/v/iobroker.oxxify-fan-control.svg?color=red&label=beta)
![Стабильный](http://iobroker.live/badges/oxxify-fan-control-stable.svg)

<img src="admin/oxxify-fan-control.png" width="80">

# ioBroker.oxxify-fan-control

**Тесты:** ![Тестирование и выпуск](https://github.com/N-b-dy/ioBroker.oxxify-fan-control/workflows/Test%20and%20Release/badge.svg)

## oxxify-fan-control адаптер для ioBroker

Интегрируйте вентиляторы Oxxify в свою систему «умного дома». Все предоставленные данные ioBroker основаны на описанном протоколе связи. [здесь](./doc/BDA_Anschluss_SmartHome_RV_V2.pdf)Как и другие м\[...]

## Рабочие устройства

- Oxxify Smart 50 (проверено мной)
- Любое другое устройство Oxxify с Wi-Fi
- Blauberg Vents и другие устройства с аналогичным протоколом (следующие работают).
  - Блауберг Д180 С21
  - Vento Expert A50-1 S10 W V.2

### Описание дерева объектов

В дереве объектов находится папка с именем "devices", в которой создается запись для каждого настроенного вентилятора. Каналы ниже создаются с использованием уникального идентификатора вентилятора, предоставленного производителем. Я\[...]

#### Данные о болельщиках

Этот канал содержит любые данные, связанные с вентилятором, такие как таймеры, скорость вращения вентилятора, состояние включения/выключения и информацию об интервале очистки/замены фильтра. Режимы работы вентилятора содержат числовые значения \[...]

![изображение](../../../en/adapterref/iobroker.oxxify-fan-control/doc/screenshots/fan-data.png)

#### Сетевые данные

В настоящее время сетевые данные доступны только для чтения; запись/изменение значений здесь пока не реализовано и может быть выполнено с помощью приложения производителя. То же самое относится и к состоянию управления облачным сервером.

![изображение](../../../en/adapterref/iobroker.oxxify-fan-control/doc/screenshots/network-data.png)

#### Данные датчиков

Ввод данных с датчиков осуществляется в соответствии с протоколом. Значение аналогового напряжения указывается в процентах, как определено в протоколе. К аналоговому и релейному датчикам ничего не подключено, поэтому\[...]

![изображение](../../../en/adapterref/iobroker.oxxify-fan-control/doc/screenshots/sensors-data.png)

#### Системные данные

Этот канал содержит системные данные об аппаратном и программном обеспечении, а также время работы, напряжение батареи RTC и дату/время. Здесь можно сбросить будильники, а также установить время RTC на основе конфигурации\[...].

![изображение](../../../en/adapterref/iobroker.oxxify-fan-control/doc/screenshots/system-data.png)

## Задачи

- Внедрение дополнительных тестов
- Необходимо реализовать недостающие данные (например, расписание, запись сетевых данных и управление облаком).

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

## Changelog
### 0.0.17 (2026-08-25)

- Security vulnerabilities fixed
- Dependencies updated
- Adapter checker stuff fixed (https://github.com/N-b-dy/ioBroker.oxxify-fan-control/issues/158)

### 0.0.16 (2026-05-18)

- Security vulnerabilities fixed (#143)
- Dependencies updated

### 0.0.15 (2026-05-05)

- Security vulnerabilities fixed (#141)

### 0.0.14 (2026-05-05)

- Added missing JSDoc comments
- (copilot) Adapter requires node.js >= 22 now
- Warning [W5039] fixed

### 0.0.13 (2026-04-08)

- Auto PRs merged
- Fixing other deployment issues...

For older changelog entries see [CHANGELOG_OLD.md](./CHANGELOG_OLD.md)

## License

Copyright (c) 2025-2026 N-b-dy <daten4me@gmx.de>

                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

### Disclaimer of Warranty.

THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
APPLICABLE LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY
OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM
IS WITH YOU. SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF
ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

### Limitation of Liability.

IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS
THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY
GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE
USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF
DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD
PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),
EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF
SUCH DAMAGES.