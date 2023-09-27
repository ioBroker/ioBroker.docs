---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.batrium-bms/README.md
title: ioBroker.batrium-bms
hash: ybmyiKEHBkbOECMU+l95wbCMjlTkebmpzD/P2E9XIXQ=
---
![Логотип](../../../en/adapterref/iobroker.batrium-bms/admin/batrium-bms.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.batrium-bms.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.batrium-bms.svg)
![Количество установок](https://iobroker.live/badges/batrium-bms-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/batrium-bms-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.batrium-bms.png?downloads=true)

# IoBroker.batrium-bms
![Тестирование и выпуск](https://github.com/bembelstemmer/ioBroker.batrium-bms/workflows/Test%20and%20Release/badge.svg)
<!--
-->

##адаптер batrium-bms для ioBroker
Адаптер ioBroker для отслеживания показателей вашей BMS Batrium, публикуемых через UDP.

!!! Этот адаптер официально не поддерживается Батриумом!!!

Этот адаптер основан на официальной реализации Batrium WatchMonUdpListener: https://github.com/Batrium/WatchMonUdpListener.

Поддержка сообщений по-прежнему ограничена и будет расширена в следующих версиях.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.5.0 (2023-09-10)
* Various Package Upgrades (inc. Update to ioBroker Adapter lib v3)
* Adding of Tests for Node Version 20.x
* Fixed marking of properties writeable even if they're not
* Fixed wrong Naming of Object 5732.ShuntStatus
* Reworked Object Roles to better match their meaning (where meaning was known)

### 0.4.0 (2023-03-22)
* Added Message Type 4232 (Cell Status Full)

### 0.3.0 (2023-03-05)
* Added Message Type 415a (Cell Status Small)
* Added Configuration per Message Type
* Added Rate Limit function per Message Type to reduce load on ioBroker DB

### 0.2.1 (2023-02-04)
* Readded build folder

### 0.2.0 (2023-02-04)
* Minor Type Fixes
* Added Message Type 6831

### 0.1.0 (2023-02-03)
* Optimized Parser Structure
* Finished up Message Type 5732
* Finished up Message Type 3233

### 0.0.2 (2023-01-31)
* Initial Test Release

## License
MIT License

Copyright (c) 2023 Bembelstemmer <kontakt[at]it-amm[dot]de>

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