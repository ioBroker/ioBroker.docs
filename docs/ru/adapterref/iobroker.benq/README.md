---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.benq/README.md
title: Адаптер проектора ioBroker BenQ
hash: YfmCWWyypsOuFfAS5vkeXbUOvtycDdAEiBM8nkinyGM=
---
![Логотип](../../../en/adapterref/iobroker.benq/admin/benq-logo.png)

![Количество установок](http://iobroker.live/badges/benq-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.benq.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.benq.svg)
![НПМ](https://nodei.co/npm/iobroker.benq.png?downloads=true)
![Пожертвовать](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker Адаптер проектора BenQ
[![Тесты] (https://github.com/instalator/iobroker.benq/workflows/Test%20and%20Release/badge.svg)](https://github.com/instalator/ioBroker.benq/actions/)

Адаптер проектора ioBroker BenQ используется для управления проектором BenQ через RS232 в сочетании со шлюзом Etnernet.
Список моделей и команд содержится в файле `admin/commands.json`.

## Аппаратное обеспечение
Драйвер позволяет подключаться к проекторам BenQ через [адаптер](http://blog.instalator.ru/archives/744) RS232 к Ethernet.

В качестве шлюза RS232 к Ethernet используется любая Arduino-совместимая карта, в которую необходимо загрузить [этот код](https://github.com/stepansnigirev/ArduinoSerialToEthernet).
Вам также понадобится Ethernet Shield W5100 или W5500 и преобразователь RS232 в TTL.

## Поддерживать
Поддерживаемые модели: W1200, W1070, W1080...

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.3.0 (2024-04-02)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) changed: Testing has been changed to support node 18 and 20
* (mcm1957) changed: Dependencies have been updated

### 0.2.7
 * (instalator) fix error

### 0.2.4
 * (instalator) change test

### 0.2.2
 * (instalator) fixed clearTimeout

### 0.2.1
 * (instalator) support compact mode
 * (instalator) support admin3
 * (instalator) refactoring

### 0.0.6
  (instalator) initial

## License
The MIT License (MIT)

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2021 instalator <vvvalt@mail.ru>

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
