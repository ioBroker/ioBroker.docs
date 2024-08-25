---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.philips-air/README.md
title: ioBroker.philips-air
hash: X+YdpIAw4RaMRUYwa08X+jRrEXHIlrD+88onxnxrIjA=
---
![Логотип](../../../en/adapterref/iobroker.philips-air/admin/philips-air.png)

![Количество установок](http://iobroker.live/badges/philips-air-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.philips-air.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.philips-air.svg)

# IoBroker.philips-air
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.philips-air/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/philips-air/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

## Адаптер очистителя воздуха Philips для ioBroker
Соединяет очиститель воздуха Philips с ioBroker.
**Проверено только с AC2729**, но должно работать с новым очистителем, который обменивается данными через COAP с шифрованием.
![AC2729](../../../en/adapterref/iobroker.philips-air/img/device.png)

[Ссылка на сайт филипс](https://www.philips.de/c-m-ho/luftreiniger-und-luftbefeuchter/kombi)

## Использование
Требуется только IP-адрес устройства. Найдите его в своем маршрутизаторе (например, `MiCO`).
Может случиться так, что у некоторых устройств есть не все переменные, и они останутся незаполненными в дереве объектов.

![Объекты](../../../en/adapterref/iobroker.philips-air/img/objects.png)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.0 (2024-04-25)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.0.3 (2022-12-23)
* (Apollon77) Finalized and optimized HTTP communication protocol
* (Apollon77) Fixed type issues with device.error

### 1.0.2 (2022-11-16)
* (bluefox) Small fixes done
* (bluefox) Added HTTP communication protocol (untested!)
* (mdax82) Added `gentle/GT` for AC2939

### 0.1.7 (2022-05-19)
* (Apollon77) Upgrade coap library

### 0.1.4 (2022-03-23)
* (Apollon77) Downgrade coap library to restore functionality for some devices
* (Apollon77) Prevent crash case and make control more flexible
* (Apollon77) correctly handle `control.function` state

### 0.1.3 (2022-03-12)
* (Apollon77) General updates and optimizations

### 0.1.1 (2020-10-14)
* (bluefox) initial release

## License
MIT License

Copyright (c) 2023-2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2022 ioBroker <dogafox@gmail.com>

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
