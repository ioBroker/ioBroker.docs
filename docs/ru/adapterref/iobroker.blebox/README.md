---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.blebox/README.md
title: ioBroker.blebox
hash: bKDXQL6LW99S799H2zL7OE52xepqYUczF+xpwn0Fcds=
---
![Логотип](../../../en/adapterref/iobroker.blebox/admin/blebox.png)

![НПМ-версия](http://img.shields.io/npm/v/iobroker.blebox.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.blebox.svg)
![Известные уязвимости](https://snyk.io/test/github/ka-vaNu/ioBroker.blebox/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.blebox.png?downloads=true)

# IoBroker.blebox
##адаптер blebox для ioBroker
Адаптер для управления устройствами Умного дома производителя [blebox](https://blebox.eu/). Описание API можно найти [здесь](https://technical.blebox.eu/). Внедрение произошло без поддержки производителя.

Неполную и устаревшую модель API можно загрузить [здесь](https://github.com/blebox/blebox-virtual-devices).

В настоящее время поддерживаются следующие устройства:

* ставень
* распределительная коробка
* саунабокс
* датчик температуры
* воротная коробка
* ТВлифт
* мультисенсор — не тестировался на реальном оборудовании, поддерживается до 4 датчиков

## Changelog

<!--
    Placeholder for the next version:
    ### **WORK IN PROGRESS**
-->

### 2.1.0 (2023-10-13)

* (Kai van Nuis) Support for multiSensor

### 2.0.1 (2023-03-12)

* (Kai van Nuis) Update dependecies

### 2.0.0 (2022-09-18)

* (Kai van Nuis) Change to Admin UI 5

### 1.1.0

* Support for gateBox implemented and eslint converted

### 0.1.2

* Fixes due to code review
### 0.1.1

* First stable release

## License
MIT License

Copyright (c) 2023 Kai van Nuis <kai@vannuis.de>

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