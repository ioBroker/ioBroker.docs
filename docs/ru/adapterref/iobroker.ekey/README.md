---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ekey/README.md
title: ioBroker.ekey
hash: pDp+XCtVymOpb+vidaIK19cT62rgXY/lZSFEEMYiONw=
---
![Логотип](../../../en/adapterref/iobroker.ekey/admin/ekey.png)

![Значок Гринкипера](https://badges.greenkeeper.io/ioBroker/ioBroker.ekey.svg)
![Количество установок](http://iobroker.live/badges/ekey-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.ekey.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ekey.svg)
![Трэвис-CI](http://img.shields.io/travis/ioBroker/ioBroker.ekey/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/ioBroker/ioBroker.ekey?branch=master&svg=true)
![НПМ](https://nodei.co/npm/iobroker.ekey.png?downloads=true)

# IoBroker.ekey
[![Статус зависимости] (https://gemnasium.com/badges/github.com/ioBroker/ioBroker.ekey.svg)](https://gemnasium.com/github.com/ioBroker/ioBroker.ekey) [![Код климата](https://codeclimate.com/github/ioBroker/ioBroker.ekey/badges/gpa.svg)](https://codeclimate.com/github/ioBroker/ioBroker.ekey)

Этот адаптер для ioBroker подключается к UDP-коннектору ekey.

Реализовано, как описано в:

- https://descargas.futurasmus-knxgroup.org/doc/en/ekey/13002/operating_instructions_ekey_converter_udp_rs485_id51.pdf
- Протокол NET: https://www.ekey.net/wp-content/dokumente/Operating_instructions_ekey_net_4.4_en_web_ID181_3006.pdf (стр. 189)

![изображение](../../../en/adapterref/iobroker.ekey/img/ekey.png)

## Серийный порт
Экспериментальная функция подключения к ekey через последовательный порт. Это еще не проверено.

Вы можете активировать последовательный порт для получения данных через преобразователь USB RS485 или RS 232.
На самом деле поддерживается только хеш пальца. Чтобы помочь расшифровать больше данных с устройства, пожалуйста, откройте вопрос с данными, которые вы получили.

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 1.2.3 (2022-11-22)
* (bluefox) Added `net` protocol support
* (bluefox) Added serial port support

### 1.1.0
* (bluefox) Added compact mode
* (bluefox) Own port is now configurable

### 1.0.0
* (bluefox) Configuration dialog under firefox was corrected

### 0.2.1
* (bluefox) tests were added

### 0.1.0
* (bluefox) initial release

## License

The MIT License (MIT)

Copyright (c) 2018-2022 ioBroker <dogafox@gmail.com>

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
