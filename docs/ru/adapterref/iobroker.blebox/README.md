---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.blebox/README.md
title: ioBroker.blebox
hash: H5QE8rnAxkqTH+8M9rsElAFLi0W690GnR8KC86WzS3M=
---
![Логотип](../../../en/adapterref/iobroker.blebox/admin/blebox.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.blebox.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.blebox.svg)
![Известные уязвимости](https://snyk.io/test/github/ka-vaNu/ioBroker.blebox/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.blebox.png?downloads=true)

# IoBroker.blebox
## Адаптер blebox для ioBroker
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=8JKRSMB8LS76S)

Адаптер для управления устройствами Smarthome производителя [blebox](https://blebox.eu/). Описание API можно найти [здесь](https://technical.blebox.eu/). Реализация произошла без поддержки производителя.

Неполную и устаревшую симуляцию API можно загрузить [здесь](https://github.com/blebox/blebox-virtual-devices).

В настоящее время поддерживаются следующие устройства:

| Герэт | Тип API | Статус |
|----------------------|---------------------|-----------------------------------------|
| gatebox | gatebox | ✅ Протестировано |
| мультисенсор | мультисенсор | поддерживается до 8 датчиков на устройство |
| tempSensor PRO | multisensor | ❓ beta, не тестировалось на реальном оборудовании |
| tempSensorAC | multisensor | ❓ beta, не тестировалось с реальным оборудованием |
| Датчик влажности | мультисенсор | ❓ бета, не тестировалось с реальным оборудованием |
| windSensor PRO | мультисенсор | ❓ бета, не тестировалось на реальном оборудовании |
| floodSensor | multisensor | ❓ beta, не тестировалось на реальном оборудовании |
| rainSensor | multisensor | ❓ beta, не тестировалось на реальном оборудовании |
| saunabox | saunabox | ❓ beta, не тестировалось на реальном оборудовании |
| shutterbox | shutterbox | ✅ Протестировано |
| shutterBoxDC | shutterBox | ❓ beta, не тестировалось на реальном оборудовании |
| shutterBoxDIN | shutterBox | ❓ beta, не тестировалось на реальном оборудовании |
| распределительная коробка | распределительная коробка | ✅ Протестировано |
| switchBoxD | switchBox | ❓ beta, не тестировалось на реальном оборудовании |
| switchBoxDC | switchBox | ❓ beta, не тестировалось на реальном оборудовании |
| switchBox DIN | switchBox | ❓ beta, не тестировалось с реальным оборудованием |
| switchBoxD DIN | switchBox | ❓ beta, не тестировалось с реальным оборудованием |
| switchBoxT PRO | switchBox | ❓ beta, не тестировалось на реальном оборудовании |
| tempsensor | tempsensor | ❓ beta, не тестировалось на реальном оборудовании |
| tvlift | tvlift | ❓ beta, не тестировалось на реальном оборудовании |

## Changelog

<!--
    Placeholder for the next version:
    ### **WORK IN PROGRESS**
-->

### 2.2.0 (2023-10-13)

* (Kai van Nuis) Support for multi-device APIs

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

Copyright (c) 2024 Kai van Nuis <kai@vannuis.de>

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