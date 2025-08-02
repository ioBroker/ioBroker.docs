---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.comfoair/README.md
title: ioBroker.comfoair
hash: 6p3kCLVVzilY/rhsudJNUVqqhuVsPsXcjbbzJWX0n+Q=
---
![Логотип](../../../en/adapterref/iobroker.comfoair/admin/comfoair.png)

![Количество установок](http://iobroker.live/badges/comfoair-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.comfoair.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.comfoair.svg)
![НПМ](https://nodei.co/npm/iobroker.comfoair.png?downloads=true)

# IoBroker.comfoair
## Часовой
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

##адаптер ioBroker для Zehnder Comfoair
Это адаптер ioBroker для систем вентиляции Zehnder Comfoair CA (т. е. ComfoAir CA350, НЕ ComfoAir Q350...).

## Связь
### По IP/LAN
Используйте преобразователь RS232 в LAN или WiFi для подключения ioBroker к вашему Zehnder Comfoair.
Установите оборудование для TCP – подключения к comfoair: т.е. адаптер RS232-LAN к последовательному интерфейсу comfoair. Подключите только контакты 2, 3 и 5 (должны работать также с TX, RX и GND – контакты подключения cc-Ease тоже).

### ПОСЛЕДОВАТЕЛЬНОЕ СОЕДИНЕНИЕ
Подключите последовательный интерфейс вашего comfoair к последовательному интерфейсу устройства, на котором работает ioBroker. То есть используйте кабель RS232toUSB или адаптер RS232toTTL для подключения к контактам UART Raspberry Pis.

## Конфигурация
Выберите предпочитаемый режим подключения (IP или последовательный), установите comfoair — IP-адрес и порт или укажите последовательное устройство, определите режим подключения comfoair (RS232) (см. «Адаптер и CC Ease») и определите опрос — интервальный.

## Адаптер и CC Ease
В общем, не рекомендуется отправлять данные с двух передатчиков на один приемник при последовательном соединении RS232. Параллельное использование CCEase и адаптера может привести к ошибкам или, в худшем случае, к повреждению вашего устройства управления comfoair! Поэтому при запуске адаптера ComfoAir ваш CC Ease должен отключиться или будет выключен.
Сам comfoair знает 4 различных rs232-режима: CCEaseonly, PConly, PCMaster, PCLogmode. В PConly и PCMaster CC-Ease отключен.
В конфигурации экземпляра вы можете выбрать один из следующих режимов подключения. Пожалуйста, отметьте только один из них! Как только адаптер работает только в адаптере или в параллельном режиме, вы можете переключить режим rs232 comfoair (что не рекомендуется, поскольку для определенного режима подключения требуется определенный режим rs232!).

### Только адаптер
CC Ease отключается (рекомендуется) или выключается при запуске адаптера. Управлять comfoair можно только с помощью ioBroker (режим rs232 — PCMaster). Этот режим является стандартным и рекомендуется.

### Только прослушивание
Адаптер перехватывает данные, отправленные с comfoair или CC Ease. CC Ease запущен, с адаптера не могут быть отправлены команды. В этом режиме вы получаете только базовый набор значений (температура, состояние вентиляции). В этом режиме также отсутствует риск ошибок/повреждений связи, поскольку отсутствует связь между адаптером и системой comfoair.

### Параллельный режим
CC Ease и адаптер работают. Для comfoiar rs232mode установлено значение «PCLogmode». Адаптер «прослушивает» основные значения (температуру, уровень вентиляции) и опрашивает другие (ошибки, таймер фильтра). Установите увеличенный интервал опроса, чтобы снизить риск ошибок связи. Вы можете управлять своим ComfoAir с помощью ioBroker и устройства CC Ease. Перед отправкой команды (включая опрос) режим rs232 переключается на PC Master. При каждой отправке команды также выполняется опрос. Тесты показали безошибочность — параллельная работа в течение более длительного периода времени. Но: Вы запускаете этот режим на свой страх и риск.

### Параллельный режим в режиме постоянного журнала ПК
Некоторые пользователи получили положительный опыт постоянной работы comfoair в режиме журнала ПК. Этот режим имеет те же функции, что и режим «Только адаптер», но с работающим CC Ease. Но: Вы запускаете этот режим на свой страх и риск.

## Использование адаптера
Значения вашего комфорта должны быть видны в каналах «статус» и «температура». Пожалуйста, обновите объекты - просмотр после изменения режима подключения.

Устанавливая/изменяя значения в канале «управление», вы управляете вентиляцией comfoair. Все значения в канале «control» должны быть установлены с ACK=false, чтобы они распознавались как команды для адаптера.

Boostmode: установите время повышения и запустите. Вентиляция вернется на предыдущий уровень после ускорения. Возврат отменяется, если уровень вентиляции изменяется во время режима ускорения.

Протестировано на comfoair CA350.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.2.0 (2024-04-14)

* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.1.9 (2024-03-08)

-   (mcm1957) German title of adapter has been corrected
-   (mcm1957) Dependencies have been updated

### 1.1.8

-   boost-error fixed (sentry)

### 1.1.7

-   dependencies updated, serialport 10.x - update

### 1.1.6

-   boostmode enhanced, dependencies updated

### 1.1.5

-   Bugfix (js-controller update)

### 1.1.3

-   boostmode added

### 1.1.2

-   adapter - internal filter-h counter added

### 1.1.1

-   Periodical self-test with restart in case of fail added

### 1.1.0

-   displays now working hours of different ventilation levels, preheating, bypass and frost-protection.

### 1.0.0

-   offers now the possibility of a direct serial connection besides the connection over IP/LAN.

### 0.3.2

-   Bypass - error bug fixed.

### 0.3.1

-   new connection mode: parallel in constant PC-Logmode.

### 0.3.0

-   new connection modes, i.e. 'listening only', selftest-function and setting filter-timer added.

### 0.2.1

-   smaller bugfixes.

### 0.2.0

-   New rs232 - Modes, reading enthalpie-values, handling connection-errors.

### 0.1.4

-   README-Update 'NO PARALLEL USE', discard 'Safe-Mode'.

### 0.1.3

-   RS - 232 interface: manual- or safe - mode possible.

### 0.1.2

-   ReadME updated, minor bugfixes.

### 0.1.1

-   bugfix ventlevels, reading errors

### 0.1.0

-   ReadME Update

### 0.0.7

-   Core Files/Testing Update and introduce adapter-core

### 0.0.6

-   Filter - change - indicator.

### 0.0.5

-   bugfix set vent levels.

### 0.0.4

-   gets & sets vent levels, gets filter-timer.

### 0.0.3

-   minor bugfixes, sets comfort-temperature and resets filter-hours.

### 0.0.2

-   First running Version. Gets temp, vent, bypass and filter states, sets fan level.

### 0.0.1

-   In development stage, contributions welcome

## License

The MIT License (MIT)

Copyright (c) 2023-2024 forelleblau marceladam@gmx.ch

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
