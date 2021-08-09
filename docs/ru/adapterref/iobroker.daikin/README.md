---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.daikin/README.md
title: ioBroker.daikin
hash: 4PrusdRlwgE7SPSpTy4rMpdJOabjqia5G+WxaDJZYw4=
---
![Логотип](../../../en/adapterref/iobroker.daikin/admin/daikin.jpg)

![Количество установок](http://iobroker.live/badges/daikin-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.daikin.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.daikin.svg)

# IoBroker.daikin
![Тестирование и выпуск](https://github.com/Apollon77/iobroker.daikin/workflows/Test%20and%20Release/badge.svg) [![Статус перевода] (https://weblate.iobroker.net/widgets/adapters/-/daikin/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Этот адаптер подключается к устройству кондиционирования воздуха Daikin и позволяет управлять устройством и считывать с него значения.
Устройство Daikin должно быть оснащено контроллером Daikin Wifi. Обычно должны поддерживаться все контроллеры Wi-Fi, которые поддерживаются приложением Daikin.

Согласно документации поддержки Daikin следующие устройства должны быть совместимы (как минимум):

Совместимые блоки в сочетании с BRP069A41: FTXG20LV1BW, FTXG20LV1BS, FTXG25LV1BW, FTXG25LV1BS, FTXG35LV1BW, FTXG35LV1BS, FTXG50LV1BW, FTXG50LV1BS, FTXJ20LV1BW, FTXJ20LV1BS, FTXJ25LV1BW, FTXJ25LV1BS, FTXJ35LV1BW, FTXJ35LV1BS, FTXJ50LV1BW, FTXJ50LV1BS,

Совместимые блоки в сочетании с BRP069A42: FTXZ25NV1B, FTXZ35NV1B, FTXZ50NV1B, FTXS35K2V1B, FTXS35K3V1B, FTXS42K2V1B, FTXS42K3V1B, FTXS50K2V1B, FTXS50K3V1B, FTXLS25K2V1B, FTXLS35K2V1B, FTXM35K3V1B, FTXM42K3V1B, FTXM50K3V1B,, FTXS60GV1B, FTXS71GV1B, ATXS35K2V1B, ATXS35K3V1B, ATXS50K2V1B, ATXS50K3V1B,, FTX50GV1B , FTX60GV1B, FTX71GV1B,, FVXG25K2V1B, FVXG35K2V1B, FVXG50K2V1B,, FVXS25FV1B, FVXS35FV1B, FVXS50FV1B,, FLXS25BAVMB, FLXS25BVMA, FLXS25BVMB, FLXS35BAVMB, FLXS35BAVMB9, FLXS35BVMA, FLXS35BVMB, FLXS50BAVMB, FLXS50BVMA, FLXS50BVMB, FLXS60BAVMB, FLXS60BVMA, FLXS60BVMB,

Совместимые блоки в сочетании с BRP069A43 (?): CTXS15K2V1B, CTXS15K3V1B, FTXS20K2V1B, FTXS20K3V1B, FTXS25K2V1B, FTXS25K3V1B, CTXS35K2V1B, CTXS35K3V1B, FTXM20K3V1B, FTXM25K3V1B,, ATXS20K2V1B, ATXS20K3V1B, ATXS25K2V1B, ATXS25K3V1B,, FTX20J2V1B, FTX25J2V1B, FTX35J2V1B, FTX20J3V1B, FTX25J3V1B, FTX35J3V1B,, FTXL25J2V1B, FTXL35J2V1B,, FTX20KV1B, FTX25KV1B, FTX35KV1B, FTX20GV1B, FTX25GV1B, FTX35GV1B,, ATX20J2V1B, ATX20J3V1B, ATX25J2V1B, ATX25J3V1B, ATX35J2V1B, ATX35J3V1B, ATX20KV1B, ATX25KV1B, ATX35KV1B,, ATXL25J2V1B, ATXL35J2V1B,

Совместимые блоки в сочетании с BRP069A44 (?): FTX50KV1B, FTX60KV1B

## Описание параметров
### DaikinIp
IP-адрес контроллера Wi-Fi с устройства

### PollingInterval
Интервал в секундах для обновления данных с устройства. Дополнительно значения обновляются при каждом изменении

## Описание доступных экземпляров объектов / состояний
После подключения адаптера к устройству Daikin создается структура объектов:

* deviceInfo. *: Общая информация об устройстве Daikin, только для чтения.
* control. *: основные контролируемые значения с устройства, такие как целевая температура, режим и т. д., **чтение и запись**
* controlInfo. *: Дополнительная управляющая информация от Устройства, только для чтения
* modelInfo. *: информация о самом устройстве и поддерживаемых функциях, только для чтения
* sensorInfo. *: данные датчика от устройства, такие как измеренная температура в помещении и на улице.

## Делать
* улучшение тестирования: проверки состояния и setState's
* проверьте информацию о модели / поддерживаемые функции
* документы для веб-страницы
* Виджет VIS

## Changelog

### 1.3.1 (2021-05-14)
* (Apollon77) Prepare for js-controller 3.3

### 1.3.0 (2021-01-14)
* (Apollon77) Prevent warnings in js-controller 3.2
* (Apollon77) Allow overwriting the name in Daikin channel object
* (Apollon77) Require at least js-controller 2.0

### 1.2.0 (2020-12-27)
* add compact mode

### 1.1.3 (2020-11-19)
* add experimental support for lpw parameter
* crash cases prevented (Sentry IOBROKER-DAIKIN-7)

### 1.1.2 (2020-08-06)
* crash cases prevented (Sentry IOBROKER-DAIKIN-2, IOBROKER-DAIKIN-3, IOBROKER-DAIKIN-4)

### 1.1.1 (2020-08-02)
* better handle case where configuration is missing (Sentry IOBROKER-DAIKIN-1)

### 1.1.0 (2020-07-21)
* Adjust Texts and translate
* create daikin.X ads device object and add one role
* Update dependencies

### 1.0.4 (2019-06-25)
* Daikin library updated, communication error handling optimized

### 1.0.3 (2019-02-xx)
* Daikin library updated, communication errors optimized

### 1.0.2 (2018-04-29)
* Daikin library updated

### 1.0.1 (2018-04-13)
* Fix Admin

### 1.0.0 (2018-01-1x)
* Admin3 readieness
* Support older Daikin-WLAN-Firmwares with special config flag

### 0.2.3 (2017-04-01)
* Add control.lastResult to see if a change was successfull

### 0.2.2
* reduce debug logging

### 0.2.0
* first finalized version

### 0.1.x
* development and first tests

## License

The MIT License (MIT)

Copyright (c) 2017-2021 Apollon77 <ingo@fischer-ka.de>

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