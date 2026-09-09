---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.smartmeter/README.md
title: ioBroker.smartmeter
hash: hdxd47p6kQRGA3KvXbIpGVgEuG3y8mNMpIlZQ4eyg3Q=
---
![Логотип](../../../en/adapterref/iobroker.smartmeter/admin/smartmeter.png)

![Количество установок](http://iobroker.live/badges/smartmeter-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.smartmeter.svg)
![Тестирование и выпуск](https://github.com/Apollon77/iobroker.smartmeter/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/smartmeter/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.smartmeter.svg)

# ioBroker.smartmeter

**Этот адаптер использует библиотеки Sentry для автоматического сообщения мне, как разработчику, об исключениях и ошибках в коде.** Подробнее см. ниже!

Этот адаптер для ioBroker позволяет считывать и анализировать протоколы интеллектуальных счетчиков, которые следуют логике номеров OBIS, чтобы сделать их данные доступными.

_**Для работы адаптера требуется Node.js версии 16.x и выше!**_

_**Для установки этого адаптера в настоящее время требуется установленный Git!**_

## Описание параметров

Тема на форуме ioBroker: <http://forum.iobroker.net/viewtopic.php?f=23&t=5047&p=54973>

### Протокол данных

Поддерживаемые протоколы:

- **Sml** : SML (Smart Message Language) в двоичном формате
- **D0** : D0 (на основе IEC 62056-21:2002/IEC 61107/EN 61107) в формате ASCII (двоичный протокол E в настоящее время не поддерживается)
- **Json-Efr** : Данные OBIS из EFR Smart Grid Hub (формат JSON)

### Передача данных

- **Приём данных через последовательный порт** : приём данных по принципу «передачи данных» через последовательный порт (умный счётчик отправляет данные без запроса через регулярные интервалы). В основном используется для SML.
- **Последовательная двунаправленная связь** : протокол D0 в режимах A, B, C и D (режим E в настоящее время НЕ поддерживается!) с сообщениями Wakeup, Signon, pot. ACK и Data для считывания данных (режим программирования/записи пока не реализован).
- **HTTP-запросы** : чтение данных по протоколу HTTP путем запроса к определенному URL-адресу.
- **Локальные файлы** : чтение данных из локального файла.

### Интервал запроса данных

Количество секунд ожидания следующего запроса или приостановки последовательного приема; значение 0 позволяет возобновить прием сразу после завершения приема одного сообщения.

Значение по умолчанию: 300 (=5 минут)

### Скорость передачи данных последовательного устройства

Скорость передачи данных для первоначального последовательного соединения; если не определена, используются значения по умолчанию для каждого типа транспорта (9600 для SerialResponseTransport и 300 для SerialRequestResponseTransport).

### D0: Команда SignOn-Message

Команда для сообщения входа (SignIn-Message), по умолчанию "?" для запроса обязательных полей, другие значения зависят от устройства. Пример: Тепломер 2WR5 использует "#" для запроса гораздо большего количества данных (как обязательных, так и необязательных полей).

### D0: Режим перезаписи

Адаптер пытается определить режим протокола D0 в соответствии со спецификацией. Некоторые устройства не соответствуют спецификации и, следовательно, создают проблемы. Используя эту опцию, вы можете переопределить определенный режим протокола.

- Режим A: без переключения скорости передачи данных, без подтверждающего сообщения.
- Режим B: переключение скорости передачи данных, без подтверждающего сообщения.
- Режим C: требуется переключение скорости передачи данных и подтверждающее сообщение (Ack-Message).
- Режим D: переключение скорости передачи данных отсутствует, скорость передачи данных всегда 2400.
- Режим E: требуется переключение скорости передачи данных и подтверждение получения сообщения (Ack-Message). Пользовательские протоколы в настоящее время не поддерживаются! Свяжитесь со мной, если у вас есть такой умный счетчик.

### D0: Переключение скорости передачи данных - Перезапись

Адаптер пытается определить скорость передачи данных для сообщений в соответствии со спецификацией протокола. Но, как и в случае с режимом, некоторые умные счетчики предоставляют здесь неверные данные. Поэтому вы можете использовать это для изменения скорости передачи данных по мере необходимости. Оставьте поле пустым, чтобы использовать изменение скорости передачи данных, определенное умным счетчиком.

## Адаптер протестирован с помощью...

... по меньшей мере:

- Счетчик энергии Hager eHz (несколько, например eHZ-IW8E2A5L0EK2P, EHZ363W5, )
- Измеритель энергии EMH
- EFR SmartGridHub
- Считыватель Siemens 2WR5 с тепловой станции
- Эльстер AS1440
- Искраемеко МТ174
- Искраемеко МТ175
- Itron EM214 Typ 720
- Ландис и Гир E220
- Голландский интеллектуальный счетчик, использующий протокол DSRM (используйте "Serial Device reading data only" и протокол "D0").
- DZG DWS7412.1T
  - _ВАЖНО_ : Похоже, обнаружена ошибка в прошивке, из-за которой иногда текущее потребление энергии становится отрицательным! Возможен ручной перерасчет с использованием формулы из <https://github.com/Apollon77/smartmeter-obis/issues/75#issuecomment-581650736> \* ... и многое другое

Пожалуйста, пришлите мне информацию об устройствах, на которых вы успешно использовали библиотеку, и я добавлю её сюда.

## Специальные интеллектуальные счетчики и проблемы.

### DZG DVS74

Похоже, иногда это ошибка в прошивке SML, и значения неправильно кодируются в сообщении SML, хотя само сообщение корректно. Решение заключается в постобработке значения с помощью JavaScript. См. <https://github.com/Apollon77/smartmeter-obis/issues/75#issuecomment-581650736>

## Как сообщать о проблемах и отправлять запросы на добавление новых функций

Пожалуйста, используйте для этого раздел "Проблемы" на GitHub.

Лучше всего установить для адаптера режим отладочного логирования (Экземпляры -> Экспертный режим -> Уровень логирования столбцов). Затем, пожалуйста, получите лог-файл с диска (подкаталог "log" в каталоге установки ioBroker, а не из административной панели, поскольку административная панель обрезает строки). Если вы не хотите предоставлять его в рамках задачи на GitHub, вы также можете отправить его мне по электронной почте ( <iobroker@fischer-ka.de> ). Пожалуйста, добавьте ссылку на соответствующую задачу на GitHub И опишите, что я вижу в логе и в какое время.

## Что такое Sentry и какая информация передается на серверы?

Sentry.io — это способ для разработчиков получить обзор ошибок в своих приложениях. И именно это реализовано в данном адаптере.

Когда адаптер выходит из строя или возникает другая ошибка в коде, это сообщение об ошибке, которое также отображается в журнале ioBroker, отправляется на наш собственный сервер Sentry, размещенный в Германии. Если вы разрешили iobroker GmbH собирать диагностические данные, то в них также включается ваш идентификатор установки (это просто уникальный идентификатор **без** какой-либо дополнительной информации о вас, электронной почте, имени и т. д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуто такой ошибкой. Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не выходят из строя.

## Changelog
### 3.4.0 (2023-11-25)
* IMPORTANT: This version requires at least Node.js 16+
* (Apollon77) Prevent some crash cases

### 3.3.4 (2022-03-11)
* (Apollon77) Restore functionality of Port list in Admin

### 3.3.3 (2022-02-21)
* IMPORTANT: This version requires at least Node.js 12.17+ (excluding non LTS like 13.x)
* (Apollon77) Prevent some crash cases

### 3.2.1 (2021-05-09)
* (Apollon77) Optimize for js-controller 3.3

### 3.2.0 (2021-01-24)
* (Apollon77) Add new protocolSmlInputEncoding option for SML protocol. With this also ascii or base64 based encodings (e.g. with TCP transports) are possible.

### 3.1.9 (2021-01-22)
* (Apollon77) optimize stop handling (Sentry IOBROKER-SMARTMETER-10)

### 3.1.8 (2021-01-14)
* (Apollon77) prevent last warnings with js-controller 3.2

### 3.1.7 (2021-01-13)
* (Apollon77) prevent warnings with js-controller 3.2
* (Apollon77) update js-controller dependency to at least require js-controller 2.0.0

### 3.1.6 (2020-11-15)
* (Apollon77) update OpenSML lib to support Holley DTZ541 wrongly implemented CRC Algorithm

### 3.1.5 (2020-09-21)
* (Apollon77) update dependencies to prevent some crash cases and optimize tcp mode

### 3.1.3 (2020-07-20)
* (Apollon77) update dependencies to prevent some crash cases

### 3.1.2 (2020-04-12)
* (Apollon77) catch errors when no memory is available anymore and stop processing

### 3.1.1 (2020-03-11)
* (Apollon77) fix admin when switching to TCPTransport
* (Apollon77) bugfixes and optimizations

### 3.1.0 (2020-03-08)
* (Apollon77) bugfixes and optimizations
* (Apollon77) experimental TCP support, please give feedback

### 3.0.10 (2020-02-05)
* (Apollon77) make sure HTTP based smartmeters are also polled frequently when responses are invalid
* (Apollon77) other optimizations
* (Apollon77) Switch Sentry to iobroker own instance hosted in germany

### 3.0.8 (2019-12-20)
* (Apollon77) errors prevented when stopping to process data

### 3.0.7 (2019-12-18)
* (Apollon77) errors prevented when stopping to process data

### 3.0.6 (2019-12-07)
* (Apollon77) serial port configuration further optimized
* (Apollon77) update smartmeter-obis lib to fix some edge case errors and serial close handling

### 3.0.3 (2019-11-30)
* (Apollon77) serial port configuration further optimized

### 3.0.2 (2019-11-29)
* (Apollon77) Fix use of "/dev/serial/by-id" paths on linux if available

### 3.0.1 (2019-11-27)
* (Apollon77) BREAKING CHANGE: Supports nodejs 8.x+ only, up to 12.x
* (Apollon77) support compact mode
* (Apollon77) update to latest library versions to fix problems and add special handling for some smart meters with broken firmware
* (Apollon77) Use "/dev/serial/by-id" paths on linux if available; add port selection to Admin
* (Apollon77) Add Sentry for error reporting

### 2.0.0 (2019-03-22)
* (Apollon77) BREAKING CHANGE: State names changed because * no longer supported. Is replaced by __ now because of possible collisions in state names with only one _

### 1.2.2 (2018-11-11)
* Update smartmeter library, fix HTTP-JSON-Transport

### 1.2.1 (2018-06-23)
* BREAKING CHANGE: State names changed because * no longer supported. Is replaced by _

### 1.1.3 (2018-04-13)
* Fix Admin

### 1.1.2 (26.03.2018)
* Add better support for devices with more then 16 values (OpenSML Library upgrade)

### 1.1.0 (31.01.2018)
* Allow multiple queries for D0 and Serial-Bidirectional communication
* a lot of bugfixing and Optimizations
* Switch to SerialPort 6.0.4 to hopefully get more stable (less/no SIGSEGV/SIGABRT ...)

### 1.0.0 (25.08.2017)
* Update smartmeter library and fix some timing issues

### 0.5.12 (23.07.2017)
* update SML library

### 0.5.11 (21.06.2017)
* optimize D0 handling and add support for Dutch smartmeter using DSRM protocol.

### 0.5.8 (06.04.2017)
* optimize Serial handling on Windows (because pause and resume are not supported there)

### 0.5.6 (02.04.2017)
* update library

### 0.5.5 (19.03.2017)
* improved baudrate-changeover logic for D0 protocol (now hopefully finally)
* enhanced D0 protocol support for multiple values

### 0.5.0 (26.02.2017)
* maintenance update

### 0.4.2 (27.02.2017)
* one last try to fix the crashes SIGABRT/SIGSEGV

### 0.4.1 (24.02.2017)
* Fix potential hanging communication with D0 Serial

### 0.4.0 (23.02.2017)
* Optimize for D0 Message handling and baudrate changeovers

### 0.3.2 (22.02.2017)
* Optimize D0 protocol handling for mode E

### 0.3.1 (12.02.2017)
* Finalize Adapter config and added some informations

### 0.3.0 (11.02.2017)
* We now should be quiet stable

### 0.1.1
* Update smartmeter-obis library to 0.2.5 to add Serial Timeout for Request/Response protocol

### 0.1.0
* Initial version for public testing

### 0.0.1
* Initial version for internal testing

## License

The MIT License (MIT)

Copyright (c) 2017-2023 Apollon77 <ingo@fischer-ka.de>

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