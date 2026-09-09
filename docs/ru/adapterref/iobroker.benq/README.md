---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.benq/README.md
title: ioBroker BenQ Projector adapter
hash: QzbcM7ReY+xfy43lUEdZL+32mh9ElJ1JfucZtF8bG+Q=
---
![Логотип](../../../en/adapterref/iobroker.benq/admin/benq-logo.png)

![Количество установок](http://iobroker.live/badges/benq-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.benq.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.benq.svg)
![Тесты](https://github.com/instalator/iobroker.benq/workflows/Test%20and%20Release/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.benq.png?downloads=true)
![Пожертвовать](https://img.shields.io/badge/Donate-PayPal-green.svg)

# ioBroker BenQ Projector adapter

Адаптер IoBroker BenQ Projector используется для управления проектором BenQ через интерфейс RS232 совместно с шлюзом Ethernet. Список моделей и команд содержится в \[ссылка на описание адаптера].`admin/commands.json` файл.

## Аппаратное обеспечение

Этот драйвер позволяет подключаться к проекторам BenQ через [адаптер](http://blog.instalator.ru/archives/744) RS232-Ethernet.

В качестве шлюза RS232 для Ethernet используется любая совместимая с Arduino плата, на которую необходимо загрузить [этот код](https://github.com/stepansnigirev/ArduinoSerialToEthernet) . Вам также понадобится Ethernet Shield W5100 или W5500 и преобразователь RS232 в TTL.

## Поддерживать

Поддерживаемые модели: W1200, W1070, W1080 и другие...

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now

### 0.3.1 (2026-02-12)
- (mcm1957) Adapter requires node.js >= 20  now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
- (mcm1957) changed: Dependencies have been updated

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

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/iobroker.benq/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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