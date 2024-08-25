---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.smartmeter/README.md
title: ioBroker.smartmeter
hash: 8Yd6UfoIilIObGmMEzabgUags+eOnsmGfViB5IVYWdw=
---
![Логотип](../../../en/adapterref/iobroker.smartmeter/admin/smartmeter.png)

![Количество установок](http://iobroker.live/badges/smartmeter-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.smartmeter.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.smartmeter.svg)

# IoBroker.smartmeter
![Тестирование и выпуск](https://github.com/Apollon77/iobroker.smartmeter/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/smartmeter/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода мне как разработчику.** Более подробную информацию см. ниже!

Этот адаптер для ioBroker позволяет считывать и анализировать протоколы интеллектуальных счетчиков, которые следуют логике номеров OBIS, чтобы сделать их данные доступными.

***Для работы адаптера требуется nodejs 16.x+!***

***Для установки этого адаптера должен быть установлен git!***

## Описание параметров
Тема форума ioBroker: http://forum.iobroker.net/viewtopic.php?f=23&t=5047&p=54973

### Протокол данных
Поддерживаемые протоколы:

* **Sml**: SML (язык интеллектуальных сообщений) в двоичном формате.
* **D0**: D0 (на основе IEC 62056-21:2002/IEC 61107/EN 61107) в формате ASCII (режим двоичного протокола E в настоящее время не поддерживается)
* **Json-Efr**: данные OBIS из EFR Smart Grid Hub (формат JSON).

### Обмен данными
* **Последовательный прием**: получение последовательных данных (смартметр отправляет данные без какого-либо запроса через регулярные промежутки времени). В основном используется для SML
* **Последовательная двунаправленная связь**: протокол D0 в режимах A, B, C и D (режим E в настоящее время НЕ поддерживается!) с Wakeup-, Signon-, Pot. Сообщения ACK и Data для считывания данных (режим программирования/записи пока не реализован)
* **Http-Requests**: чтение данных через HTTP путем запроса определенного URL-адреса.
* **Локальные файлы**: чтение данных из локального файла.

### Интервал запроса данных
Количество секунд ожидания следующего запроса или приостановки последовательного приема, значение 0, возможность перезапуска сразу после завершения одного сообщения,

По умолчанию: 300 (=5 минут).

### Скорость передачи данных последовательного устройства
скорость передачи данных для начального последовательного соединения, если не определены значения по умолчанию для каждого типа транспорта (9600 для SerialResponseTransprt и 300 для SerialRequestResponseTransport)

### D0: Команда SignOn-Message
Команда для SignIn-Message, по умолчанию "?" для запроса обязательных полей, другие значения зависят от устройства.
Пример: Теплосчетчик 2WR5 использует «#» для запроса большего количества данных (необязательные поля вместе со всеми обязательными).

### D0: Перезапись режима
Адаптер пытается определить режим протокола D0, как указано в спецификациях. Некоторые устройства не соответствуют спецификациям и поэтому создают проблемы. Используя эту опцию, вы можете перезаписать определенный режим протокола.

* Режим A: без переключения скорости передачи данных, без подтверждения сообщения
* Режим B: изменение скорости передачи данных, без подтверждения сообщения
* Режим C: требуется переключение скорости передачи данных и подтверждение сообщения.
* Режим D: без переключения скорости передачи данных, скорость передачи данных всегда 2400.
* Режим E: требуется переключение скорости передачи данных и подтверждение сообщения, пользовательские протоколы, в настоящее время не поддерживаются! Свяжитесь со мной, если у вас есть такой смартметр

### D0: Скорость передачи данных, изменение скорости передачи данных, перезапись
Адаптер пытается определить скорость передачи данных, как определено в спецификациях протокола. Но, как и в случае с режимом, некоторые умные счетчики предоставляют здесь неверные данные. ТАК, вы можете использовать это, чтобы перезаписать скорость передачи данных по мере необходимости. Оставьте пустым, чтобы использовать переключение скорости передачи данных, определенное интеллектуальным счетчиком.

## Адаптер протестирован с...
... по меньшей мере:

* Счетчик энергии Hager eHz (несколько, например eHZ-IW8E2A5L0EK2P, EHZ363W5, )
* Счетчик энергии ЭМГ
* EFR SmartGridHub
* Считыватель Siemens 2WR5 от ТЭЦ
* Эльстер AS1440
* Искраемеко MT174
* Искраемеко MT175
* Итрон EM214 Тип 720
* Лэндис и Гир E220
* Голландский интеллектуальный счетчик, использующий протокол DSRM (в качестве протокола используйте «Только данные чтения последовательного устройства» и «D0»)
* ДЗГ ДВС7412.1Т
    * *ВАЖНО*: Кажется, произошла ошибка прошивки, и иногда текущее энергопотребление становится отрицательным! Возможен ручной перерасчет с использованием формул из https://github.com/Apollon77/smartmeter-obis/issues/75#issuecomment-581650736* ... и многое-многое другое.

Пожалуйста, пришлите мне информацию об устройствах, на которых вы успешно использовали библиотеку, и я добавлю ее сюда.

## Специальные смартметры и проблемы
###ДЗГ ДВС74
Иногда кажется, что это ошибка в прошивке SML, и значения в сообщении SML неправильно закодированы, но само сообщение действительно. Решение состоит в том, чтобы опубликовать значение с помощью Javascript. См. https://github.com/Apollon77/smartmeter-obis/issues/75#issuecomment-581650736.

## Как сообщить о проблемах и запросах функций
Пожалуйста, используйте для этого выпуски GitHub.

Лучше всего установить адаптер в режим журнала отладки (Экземпляры -> Экспертный режим -> Уровень журнала столбцов). Затем получите файл журнала с диска (подкаталог «log» в каталоге установки ioBroker, а не из администратора, потому что администратор обрезает строки). Если вам не нравится предоставлять его в выпуске GitHub, вы также можете отправить его мне по электронной почте (iobroker@fischer-ka.de). Пожалуйста, добавьте ссылку на соответствующую проблему GitHub, А также опишите, что я вижу в журнале и в какое время.

## Что такое Sentry и что сообщается серверам?
Sentry.io — это способ для разработчиков получить обзор ошибок в их приложениях. И именно это реализовано в этом адаптере.

При сбое адаптера или возникновении другой ошибки кода это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется на наш собственный сервер Sentry, расположенный в Германии. Когда вы разрешаете iobroker GmbH собирать диагностические данные, тогда также включается ваш установочный идентификатор (это просто уникальный идентификатор **без** какой-либо дополнительной информации о вас, адресе электронной почты, имени и т. д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуло такая ошибка. Все это помогает мне создавать безошибочные адаптеры, которые практически никогда не выходят из строя.

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
