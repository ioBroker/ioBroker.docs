---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.comfoair/README.md
title: ioBroker.comfoair
hash: emLTIXM6cI4M6yUZOJdK/gDE1605fka1uUkRiM0dmNk=
---
![Логотип](../../../en/adapterref/iobroker.comfoair/admin/comfoair.png)

![Количество установок](http://iobroker.live/badges/comfoair-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.comfoair.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.comfoair.svg)
![НПМ](https://nodei.co/npm/iobroker.comfoair.png?downloads=true)

# ioBroker.comfoair

## Sentry

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Адаптер ioBroker для Zehnder Comfoair

Это адаптер ioBroker для вентиляционных систем Zehnder Comfoair 'CA' (то есть ComfoAir CA350, а НЕ ComfoAir Q350...).

## Связь

### По IP/LAN

Используйте преобразователь RS232 в LAN или WiFi для подключения ioBroker к вашему Zehnder Comfoair. Установите оборудование для TCP-соединения с Comfoair: то есть адаптер RS232 в LAN к последовательному интерфейсу Comfoair. Подключите только контакты 2, 3 и 5 (должно работать также с контактами TX, RX и GND разъема cc-Ease).

### Последовательное соединение

Подключите последовательный интерфейс вашего Comfoair к последовательному интерфейсу устройства, на котором работает ioBroker. Например, используйте кабель RS232toUSB или адаптер RS232toTTL для подключения к контактам UART Raspberry Pi.

## Конфигурация

Выберите предпочтительный режим подключения (IP или последовательный), задайте IP-адрес и порт comfoair или укажите ваше последовательное устройство, определите режим подключения comfoair (RS232) (см. «Адаптер и CC Ease») и задайте интервал опроса.

## Адаптер и удобство использования CC

В целом, не рекомендуется передавать данные с двух передатчиков на один приемник по последовательному интерфейсу RS232. Параллельное использование CCEase и адаптера может привести к ошибкам или, в худшем случае, к повреждению вашего контроллера Comfoair! Поэтому при запуске адаптера ComfoAir ваш CC Ease должен быть отключен или выключен. Сам Comfoair поддерживает 4 различных режима RS232: CCEaseonly, PConly, PCMaster, PCLogmode. В режимах PConly и PCMaster CC-Ease отключен. В конфигурации экземпляра вы можете выбрать один из следующих режимов подключения. Пожалуйста, отметьте только один из них! После того, как адаптер будет работать только в режиме адаптера или в параллельном режиме, вы сможете переключать режим RS232 Comfoair (что не рекомендуется, поскольку для определенного режима подключения требуется определенный режим RS232!).

### Только адаптер

CC Ease отключен (рекомендуется) или будет выключен при запуске адаптера; вы можете управлять Comfoair только через ioBroker (режим RS232 — PCMaster). Этот режим является режимом по умолчанию и рекомендуется.

### Только прослушивание

Адаптер принимает данные, отправляемые с Comfoair или CC Ease. CC Ease работает, команды с адаптера отправляться не могут. В этом режиме вы получаете только базовый набор значений (температура, состояние вентиляции). В этом режиме также отсутствует риск ошибок связи/повреждений, поскольку связь между адаптером и Comfoair отсутствует.

### Параллельный режим

CC Ease и адаптер запущены. Для ComfoAir установлен режим rs232mode 'PCLogmode'. Адаптер «прослушивает» основные значения (температуру, уровень вентиляции) и опрашивает другие (ошибки, таймер фильтра). Установите увеличенный интервал опроса, чтобы снизить риск ошибок связи. Вы можете управлять ComfoAir с помощью ioBroker и блока CC Ease. Перед отправкой команды (включая опрос) режим rs232 переключается в режим PC Master. При каждой отправленной команде также выполняется опрос. Тесты показали отсутствие ошибок — параллельная работа в течение длительного периода времени. Но: вы используете этот режим на свой страх и риск.

### Параллельный режим в постоянном режиме PC-logmode

Некоторые пользователи положительно отзывались о постоянной работе Comfoair в режиме PC-Logmode. Этот режим имеет те же функции, что и режим «Только адаптер», но с работающей программой CC Ease. Однако: вы используете этот режим на свой страх и риск.

## Используя адаптер

Значения параметров вашего устройства Comfoair должны отображаться в каналах «Статус» и «Температуры». После изменения режима подключения обновите представление объектов.

Установив/изменяя значения в канале «управление», вы управляете вентиляцией Comfoair. Для того чтобы все значения в канале «управление» были распознаны как команды для адаптера, их необходимо установить со значением ACK=false.

Режим ускорения: установите время ускорения и запустите игру. После завершения ускорения уровень вентиляции вернется к предыдущему значению. Возврат к предыдущему уровню будет отменен, если уровень вентиляции изменится во время ускорения.

Протестировано на Comfoair CA350.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.3.0 (2026-02-23)
- (mcm1957) Adapter requires node.js >=20 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mcm1957) Dependencies have been updated
- (copilot) **CI/CD**: Migrated to ESLint 9 and @iobroker/eslint-config

### 1.2.2 (2024-04-24)

* (mcm1957) The dependency requirements have been corrected
* (mcm1957) Some dependencies have been updated

### 1.2.0 (2024-04-14)

* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.1.9 (2024-03-08)

-   (mcm1957) German title of adapter has been corrected
-   (mcm1957) Dependencies have been updated

### 1.1.8

-   boost-error fixed (sentry)

## License

The MIT License (MIT)

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023-2025 forelleblau marceladam@gmx.ch

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