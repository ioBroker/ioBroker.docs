---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.oxxify-fan-control/README.md
title: ioBroker.oxxify-fan-control
hash: VknOEdw6EEXBDF8eU0ziSbKrp02cPIJP3E2G2IVt8XY=
---
![версия НПМ](https://img.shields.io/npm/v/iobroker.oxxify-fan-control.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.oxxify-fan-control.svg)
![node-lts](https://img.shields.io/node/v-lts/iobroker.oxxify-fan-control)
![Статус зависимости Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.oxxify-fan-control?label=npm%20dependencies)
![Количество установок](https://iobroker.live/badges/oxxify-fan-control-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.oxxify-fan-control.png?downloads=true)
![Бета](https://img.shields.io/npm/v/iobroker.oxxify-fan-control.svg?color=red&label=beta)
![Стабильный](http://iobroker.live/badges/oxxify-fan-control-stable.svg)

<img src="admin/oxxify-fan-control.png" width="80">

# IoBroker.oxxify-fan-control
**Тесты:** ![Тестирование и выпуск](https://github.com/N-b-dy/ioBroker.oxxify-fan-control/workflows/Test%20and%20Release/badge.svg)

## Oxxify-fan-control адаптер для ioBroker
Интегрируйте вентиляторы Oxxify в свой умный дом. Все предоставленные точки данных ioBroker основаны на протоколе связи, описанном в [здесь](./doc/BDA_Anschluss_SmartHome_RV_V2.pdf). Поскольку другие производители используют тот же протокол (например, вентиляторы Blauberg), вполне вероятно, что они тоже будут работать.

## Рабочие устройства
- Oxxify smart 50 (проверено мной)
- Любое другое устройство Oxxify с Wi-Fi
- Blauberg Vents и другие с таким же протоколом (следующие работают)
- Блауберг Д180 С21
- Vento Expert A50-1 S10 W V.2

### Описание дерева объектов
Дерево объектов содержит папку «Устройства», в которой создаётся запись для каждого настроенного вентилятора. Каналы ниже создаются с уникальным идентификатором вентилятора, предоставленным производителем. В столбце «Имя» используется запись из конфигурации для более точного различения вентиляторов. Под каждым вентилятором создаются четыре канала для группировки данных, предоставляемых по каждому вентилятору. Они описаны ниже:

#### Данные о вентиляторах
Этот канал содержит все данные, связанные с вентилятором, такие как таймеры, скорость вентилятора, состояние включения/выключения и информация об интервале очистки/замены фильтра. Режимы работы вентилятора содержат числовое значение из протокола связи, а также состояние голосовой строки. Значения могут быть записаны только числом (например, 1 для рекуперации тепла). То же самое относится к режиму таймера и режиму скорости вентилятора, который принимает значения 1, 2, 3 и 255 для ручной настройки скорости. Скорость вентилятора 2 недоступна на моих устройствах (Oxxify pro 50) и поддерживается либо на уровне 0 об/мин в выключенном состоянии, либо на уровне 1500 об/мин в любом рабочем состоянии. Другое значение изменяется в зависимости от скорости.

![изображение](../../../en/adapterref/iobroker.oxxify-fan-control/doc/screenshots/fan-data.png)

#### Сетевые данные
Сетевые данные в настоящее время доступны только для чтения, запись/изменение значений здесь пока не реализованы и могут быть выполнены с помощью приложения производителя. То же самое относится и к состоянию управления облачным сервером.

![изображение](../../../en/adapterref/iobroker.oxxify-fan-control/doc/screenshots/network-data.png)

#### Данные датчиков
Ввод данных для датчиков реализован в соответствии с протоколом. Значение аналогового напряжения указывается в процентах, как определено в протоколе. К аналоговому и релейному датчикам ничего не подключено, поэтому я не могу проверить, что произойдёт при их активации.

![изображение](../../../en/adapterref/iobroker.oxxify-fan-control/doc/screenshots/sensors-data.png)

#### Системные данные
Этот канал содержит системные данные об аппаратном обеспечении и прошивке, а также время работы, напряжение батареи RTC и дату/время. Здесь можно сбросить сигналы тревоги и установить время RTC на основе настроенного NTP-сервера. По моему опыту, иногда после синхронизации времени RTC новые (правильные) значения отображаются не сразу, и это происходит только после следующего опроса данных.

![изображение](../../../en/adapterref/iobroker.oxxify-fan-control/doc/screenshots/system-data.png)

## Задачи
- Реализация большего количества тестов
- Улучшить документацию
- Реализация недостающих точек данных (таких как расписание, запись сетевых данных и управление облаком)

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog

### **WORK IN PROGRESS**

- Some dependency work
- Avoid warning messages, if the received protocol does not contain values to update the ioBroker states (Issue #91)

### 0.0.8 (2025-10-16)

- Some dependency work
- Issues from adapter checker fixed

### 0.0.7 (2025-07-01)

- Some dependency work
- Code documentation extended
- Added Node.js 24 to test and release pipeline
- Resending interval of not overtaken values changed from 1,5 seconds to 2,5 seconds
- Changed writable mixed numerical/string values for enums into selectable values, to show available configurations (**breaking change** if already used to remote control fans)
- Rewrite mechanism allows now manual changes within the buttons of the fan, which were overridden by the internal stored value before

### 0.0.6 (2025-04-17)

- Vulnerable dependency updated

### 0.0.5 (2025-03-21)

- Added automatic write retry mechanism for writing values within the fan, as writing with UDP is not very reliable in connection with poor network conditions
- Adapter checker issues fixed

### 0.0.4 (2025-01-31)

- Updated ESLint to 9.x.x
- Fixed copyright issue from adapter checker
- Replaced deletion of all objects with deletion of missing devices from config only
- Avoided illegal characters from user input for fan id within code
- Changed state subscription to all states below the devices folder
- Added restart logic of UDP server in case of an error
- Added adapter terminiation if multiple udp server errors occured
- Replaced cyclic checking of the send quene with a timeout approach instead of interval
- Missing intermediate objects created
- Roles updated according to the read/write definitions
- Polling interval limited in JSON config and code
- ioBroker unit in object tree for RTC date & time removed

### 0.0.3 (2025-01-11)

- Added states for objects with high byte 0x03 with reading and writing
- Recreate device objects on adapter restart
- Simplified methods for writing fan data based on subscribed states
- Added a first unit test for the parsing of numbers.

### 0.0.2 (2025-01-06)

- (N-b-dy) initial release

## License

Copyright (c) 2025 N-b-dy <daten4me@gmx.de>

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