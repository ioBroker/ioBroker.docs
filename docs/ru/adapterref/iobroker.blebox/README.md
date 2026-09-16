---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.blebox/README.md
title: ioBroker.blebox
hash: 2ek3db+iP9l2oYEhTZnLTM4RZBsLneX+FwlAywJer1w=
---
![Логотип](../../../en/adapterref/iobroker.blebox/admin/blebox.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.blebox.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.blebox.svg)
![Известные уязвимости](https://snyk.io/test/github/ka-vaNu/ioBroker.blebox/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.blebox.png?downloads=true)

# ioBroker.blebox

## адаптер blebox для ioBroker

[![PayPal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=8JKRSMB8LS76S)

Адаптер для управления устройствами умного дома от производителя [blebox](https://blebox.eu/) . Описание API можно найти [здесь](https://technical.blebox.eu/) . Реализация выполнена без поддержки производителя.

Неполную и устаревшую версию симуляции API можно скачать [здесь](https://github.com/blebox/blebox-virtual-devices) .

В настоящее время поддерживаются следующие устройства:

| Герат                         | API-тип                 | Статус                                                                                    |
| ----------------------------- | ----------------------- | ----------------------------------------------------------------------------------------- |
| датчик воздуха                | датчик воздуха          | ❓ Альфа-версия, не тестировалась ни на реальном оборудовании, ни с помощью симуляции API. |
| ящик для ворот                | ящик для ворот          | ✅ Протестировано                                                                          |
| мультисенсор                  | мультисенсор            | Поддерживается до 8 датчиков на одно устройство.                                          |
| датчик температуры PRO        | мультисенсор            | ❓ Бета-версия, не тестировалась на реальном оборудовании                                  |
| датчик температуры AC         | мультисенсор            | ❓ Бета-версия, не тестировалась на реальном оборудовании                                  |
| датчик влажности              | мультисенсор            | ❓ Бета-версия, не тестировалась на реальном оборудовании                                  |
| датчик ветра PRO              | мультисенсор            | ❓ Бета-версия, не тестировалась на реальном оборудовании                                  |
| датчик наводнения             | мультисенсор            | ❓ Бета-версия, не тестировалась на реальном оборудовании                                  |
| датчик дождя                  | мультисенсор            | ❓ Бета-версия, не тестировалась на реальном оборудовании                                  |
| саунобокс                     | саунобокс               | ❓ Бета-версия, не тестировалась на реальном оборудовании                                  |
| shutterbox                    | фотобокс                | ✅ Протестировано                                                                          |
| shutterBoxDC                  | shutterBox              | ❓ Бета-версия, не тестировалась на реальном оборудовании                                  |
| shutterBoxDIN                 | shutterBox              | ❓ Бета-версия, не тестировалась на реальном оборудовании                                  |
| коммутационный блок           | коммутационный блок     | ✅ Протестировано                                                                          |
| switchBoxD                    | switchBoxD              | ❓ Бета-версия, не тестировалась на реальном оборудовании                                  |
| switchBoxDC                   | switchBoxD              | ❓ Бета-версия, не тестировалась на реальном оборудовании                                  |
| распределительная коробка DIN | switchBox               | ❓ Бета-версия, не тестировалась на реальном оборудовании                                  |
| switchBoxD DIN                | switchBoxD              | ❓ Бета-версия, не тестировалась на реальном оборудовании                                  |
| switchBoxT PRO                | switchBoxD              | ❓ Бета-версия, не тестировалась на реальном оборудовании                                  |
| датчик температуры            | датчик температуры      | ❓ Бета-версия, не тестировалась на реальном оборудовании                                  |
| телевизионный подъемник       | телевизионный подъемник | ❓ Бета-версия, не тестировалась на реальном оборудовании                                  |

## Changelog

<!--
    Placeholder for the next version:
    ### **WORK IN PROGRESS**
-->

### 2.2.4 (2025-02-16)

* (Kai van Nuis) Improve logging and fixed minor issues

### 2.2.3 (2025-02-13)

* (Kai van Nuis) Support for airsensor, alpha, neither tested with real Hardware nor an API-Simulation
* (Kai van Nuis) Support both relay on switchBoxD

### 2.2.1 (2024-12-26)

* (Kai van Nuis) Support for multi-device APIs
  
* ### 2.2.0 (2024-12-21)

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

Copyright (c) 2025 Kai van Nuis <kai@vannuis.de>

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