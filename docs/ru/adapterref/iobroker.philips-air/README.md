---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.philips-air/README.md
title: ioBroker.philips-air
hash: 34JzWCjELcBrOYZD2Y0zXskj+9T+idFaG5wtP4ZfA7c=
---
![Логотип](../../../en/adapterref/iobroker.philips-air/admin/philips-air.png)

![Количество установок](http://iobroker.live/badges/philips-air-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.philips-air.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.philips-air.svg)

# IoBroker.philips-air
![Тестируйте и выпускайте](https://github.com/iobroker-community-adapters/ioBroker.philips-air/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/philips-air/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Адаптер очистителя воздуха Philips для ioBroker
Соединяет очиститель воздуха Philips с ioBroker.
**Проверено только с AC2729**, но должно работать с новым очистителем, который обменивается данными через COAP с шифрованием.
![AC2729](../../../en/adapterref/iobroker.philips-air/img/device.png)

[Ссылка на сайт филипса](https://www.philips.de/c-m-ho/luftreiniger-und-luftbefeuchter/kombi)

## Применение
Требуется только IP-адрес устройства. Найдите его в своем роутере (например, `MiCO`).
Может случиться так, что некоторые устройства имеют не все переменные, и они останутся незаполненными в дереве объектов.

![Объекты](../../../en/adapterref/iobroker.philips-air/img/objects.png)

<!--

### **В РАБОТЕ** -->

## Changelog
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