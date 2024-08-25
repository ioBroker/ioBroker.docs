---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.homepilot/README.md
title: ioBroker.homepilot
hash: Qr538CSIqS4MSNYizNQlWNosoc7hZnbsf0aYbEnxf2g=
---
![Логотип](../../../en/adapterref/iobroker.homepilot/admin/homepilot.png)

![Количество установок](http://iobroker.live/badges/homepilot-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.homepilot.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.homepilot.svg)
![НПМ](https://nodei.co/npm/iobroker.homepilot.png?downloads=true)

# IoBroker.homepilot
## _Adapter требует, чтобы прошивка базовой станции Homepilot была ниже версии 5.0 (ранее, чем сентябрь 2019 г.)._<br> _Более новыми или обновленными станциями можно управлять с помощью [ioBroker.homepilot20](https://github.com/homecineplexx/ioBroker.homepilot20)_
Требуется NodeJS 10 или выше

:de: [Документация](/docs/de/doc_homepilot_de.md)

:uk: [Документация](/docs/en/doc_homepilot_en.md)

:ru: [Документация](/docs/en/doc_homepilot_en.md)

:португалия: [Документация](/docs/en/doc_homepilot_en.md)

:Нидерланды: [Документация](/docs/en/doc_homepilot_en.md)

:fr: [Документация](/docs/en/doc_homepilot_en.md)

:it: [Документация](/docs/en/doc_homepilot_en.md)

:es: [Документация](/docs/en/doc_homepilot_en.md)

:польша: [Документация](/docs/en/doc_homepilot_en.md)

## Дорожная карта
* 1.4.0 получить список всех установленных продуктов duofern в вашей сети в окне настроек
* 1.5.0 переупорядочить дерево объектов в "homepilot.0.device.channel.state"
* 2.0.0 получать данные в реальном времени со станции Homepilot (zwave)

Взносы приветствуются!

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
-   (mcm1957) changed: Testing has been changed to support node 16, 18 and 20
-   (mcm1957) changed: Dependencies have been updated

### 1.1.7a (2021-08-25)
* (pix) DeviceId should be string [#27](https://github.com/iobroker-community-adapters/ioBroker.homepilot/issues/27)

### 1.1.6 (2021-05-05)
* (pix) connectionType and dataSource added
* (pix) Travis updated
* (pix) minor fixes (logo size, update news)

### 1.1.4 (2020-04-21)
* (pix) xml2js-lib updated
* NodeJS 10 or higher required

### 1.1.3 (2019-09-23)
* (christofkac) Added support for Connect Actor

### 1.1.2 (2019-09-02)
* (Apollon77) Update testing for nodejs12

### 1.1.1 (2019-01-09)
* (homecineplexx) Added new device "Troll Comfort DuoFern"

### 1.1.0 (2018-11-18)
* (homecineplexx) Improved integration of thermostats

### 1.0.4 (2018-11-11)
* (pix) fixed typo in main.js

### 1.0.3 (2018-08-03)
* (pix) design improvements settings window

### 1.0.2 (2018-04-22)
* (pix) New design for settings window

### 1.0.1 (2018-04-20)
* (pix) Readme/Documentation structure

### 1.0.0 (2018-04-20)
* (pix) Admin 3 support, Translations to de, ru, pt, nl, fr, it, es and pl language

### 0.3.1 (2017-10-18)
* (pix) new documentation structure

### 0.3.0 (2017-10-16)
* (mikepa1) Support for more z-wave actuators
* (pix) iobroker.discovery integration

### 0.2.9 (2017-10-15)
* (pix) Minimum nodejs 4 is required

### 0.2.8 (2017-10-15)
* (mikepa1) Fixed issues with Heizkörperstellantrieb Z-Wave

### 0.2.7 (2017-08-26)
* (pix) Added support for Heizkörperstellantrieb Z-Wave

### 0.2.6 (2017-02-03)
* (pix) Product "Dimmer" integrated (duofern id 48)

### 0.2.5 (2017-02-03)
* (pix) CID datapoint now accepts input of 'true' or 'false' and translates it to command 10 or 11.

### 0.2.4 (2017-01-27)
* (pix) converted serial to duofern code

### 0.2.3 (2017-01-25)
* (pix) fixed regexp issue within level datapoints for input of value 0
* (pix) new datapoint serial number of duofern product

### 0.2.2 (2017-01-24)
* (pix) fixed state datapoint updates

### 0.2.1 (2017-01-23)
* (pix) Device recognition by serial number optimized

### 0.2.0 (2017-01-15)
* (pix) removed parent from setObjects

### 0.1.1 (2017-01-15)
* (pix) Roles added

### 0.1.0 (2017-01-05)
* (pix) Travis CI supported

### 0.0.7 (2016-06-21)
* (pix) fixed RegEx and log

### 0.0.6 (2016-06-20)
* (pix) fixed switch control "false" by command id (cid)
* (pix) names of datapoints

### 0.0.5 (2016-06-19)
* (pix) user can choose sync time in settings
* (pix) switch control by command id (cid)

### 0.0.4 (2016-06-18)
* (pix) datapoint "level_interted" added for Homematic like appearance
* (pix) productNumber 46 added to switches

### 0.0.3 (2016-06-18)
* (pix) datapoint "state" added for switches (incl. productNumber #43)

### 0.0.2 (2016-06-16)
* (pix) error fixed

### 0.0.1 (2016-06-15)
* (pix) adapter created

## License

The MIT License (MIT)

Copyright (c) 2016-2022 pix

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
