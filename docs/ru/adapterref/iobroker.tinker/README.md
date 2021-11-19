---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tinker/README.md
title: ioBroker.tinker
hash: keeAn15kWOL11iVfAuzbRm8qeiPupoUlwH36ne0B0oQ=
---
![Логотип](../../../en/adapterref/iobroker.tinker/admin/tinker.png)

![Количество установок](http://iobroker.live/badges/tinker-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.tinker.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tinker.svg)
![Известные уязвимости](https://snyk.io/test/github/simatec/ioBroker.tinker/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.tinker.png?downloads=true)

# IoBroker.tinker
===================

![Тестирование и выпуск](https://github.com/simatec/ioBroker.uv-protect/workflows/Test%20and%20Release/badge.svg)

Адаптер Tinker Board Monitor - это модифицированная версия адаптера Raspberry PI Monitor и адаптера OrangePi Monitor для ioBroker

** Если вам это нравится, рассмотрите возможность пожертвования: **

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Q4EEXQ6U96ZTQ&source=url)

### Важная информация
протестированное оборудование: Asus Tinker Board

### После выбора доступны следующие объекты:
## *ПРОЦЕССОР*
- cpu_frequency
- load1
- load5
- load15

## *Объем памяти*
- memory_available
- memory_free
- memory_total

## *Сеть (eth0)*
- net_received
- net_send

## *SD Card*
- sdcard_root_total
- sdcard_root_used

## *Поменять местами*
- swap_total
- swap_used

## *Температура*
- soc_temp

## *Время работы*
- время безотказной работы

## *WLAN*
- wifi_received
- wifi_send

## Конфигурация
На странице конфигурации вы можете выбрать следующие модули:

- ПРОЦЕССОР
- Объем памяти
- Сеть
- SD Card
- Поменять местами
- температура
- Время безотказной работы
- WLAN

## Changelog
<!-- ### __WORK IN PROGRESS__ -->
### 1.1.1 (2021-11-18)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 1.1.0 (2020-04-08)
* (simatec) delete sync-exec
* (simatec) Rewritten code on child_process
* (simatec) code cleaned

### 1.0.0 (2020-04-07)
* (simatec) Release 1.0.0

### 0.1.3 (2019-03-14)
* (simatec) Ready for latest

### 0.1.1 (2019-01-08)
* Fix for new iobroker Installer

### 0.1.0 (2018-07-03)
* First Beta

### 0.0.1 (2018-07-03)
* initial Version

## License

The MIT License (MIT)

Copyright (c) 2018 - 2021 simatec

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