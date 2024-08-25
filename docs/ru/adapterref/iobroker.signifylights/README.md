---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.signifylights/README.md
title: ioBroker.signifylights
hash: jpUQ+tfhgmQ6g52wkjjx1e1umiIRldRNMrcgAASm6Tc=
---
![Логотип](../../../en/adapterref/iobroker.signifylights/admin/signifylights.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.signifylights.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.signifylights.svg)
![Количество установок](https://iobroker.live/badges/signifylights-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/signifylights-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.signifylights.png?downloads=true)

# IoBroker.signifylights
**Тесты:** ![Тестирование и выпуск](https://github.com/disaster123/ioBroker.signifylights/workflows/Test%20and%20Release/badge.svg)

## Адаптер Signifylights для ioBroker
Адаптер Signify Lights для всех типов светильников Signify WLAN, таких как WIZ, Philips WLAN и многих других...

Вопросы и обсуждение здесь: https://forum.iobroker.net/topic/69656/test-adapter-signifylights

### ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ
Этот проект НЕ связан, не финансируется и не связан каким-либо образом с WIZ, Signify или Philips. Все названия брендов и продуктов являются товарными знаками или зарегистрированными товарными знаками соответствующих владельцев.
Упоминание компании или названия продукта не означает одобрения или рекомендации этой компании или продукта в ущерб другим.

## Changelog
### 0.3.0 (2023-10-27)
* several translation fixes
* replace logo
* use adapter interval instead of timeout
* new DEVICES: ESP24_SHRGBC_01 + ESP25_SHWRGB_01 + ESP15_SHRGB1S_01I
* config: allow to run without udp mac and ip set

### 0.2.0 (2023-05-02)
* more setTimeout fixes

### 0.1.1 (2023-05-01)
* fix setTimeout calls in async functions

### 0.1.0 (2023-05-01)
* various fixes and changes to become an official adapter

### 0.0.6 (2023-04-30)
* first release under new name

## License
MIT License

Copyright (c) 2023 disaster123 <stefan-iobroker@prie.be>

originally developed by Copyright (c) 2022 nxtstep <privat@konzeptplus.net>

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
