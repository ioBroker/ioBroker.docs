---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.operating-hours/README.md
title: ioBroker.operating-hours
hash: cc8anXfAZ1aHfwvBysUDilEefc418+zhOHz+NTIFVQ8=
---
![Логотип](../../../en/adapterref/iobroker.operating-hours/admin/operating-hours.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.operating-hours.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.operating-hours.svg)
![Количество установок](https://iobroker.live/badges/operating-hours-installed.svg)
![Тестирование и выпуск](https://github.com/BenAhrdt/ioBroker.operating-hours/workflows/Test%20and%20Release/badge.svg)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![НПМ](https://nodei.co/npm/iobroker.operating-hours.png?downloads=true)

# ioBroker.operating-hours

## адаптер часов работы для ioBroker

Подсчет часов работы созданных вами состояний. Чтобы сбросить подсчитанные часы работы, просто обнулите числовое значение состояния.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.5.1 (2026-04-06)
* (BenAhrdt) remove debug logging

### 1.5.0 (2026-04-06)
* (BenAhrdt) implement device Manager (Admin 7.8.20 required)

### 1.4.1 (2026-02-28)
* (BenAhrdt) update depedencies

### 1.4.0 (2025-10-19)
* (BenAhrdt) update Authentication NPM
* (BenAhrdt) update dependencie for eslint
* (BenAhrdt) update dependencie core
* (BenAhrdt) update dependencie to node >= 20
* (BenAhrdt) update testing to 24.x

### 1.3.0 (2025-02-22)
* (BenAhrdt) update copyright and dependencies

### 1.2.0 (2024-12-04)
* (BenAhrdt) update eslint

### 1.1.1 (2024-11-26)
* (BenAhrdt) Changed Schema and responsive tags

### 1.1.0 (2024-08-13)
* (BenAhrdt) Update Dependencies: "js-controller": ">=5.0.19"
  Check your System before installing new Version

### 1.0.8 (2024-08-09)
* (BenAhrdt) correct changes for issue from check and sevice bot

### 1.0.7 (2024-08-09)
* (BenAhrdt) do changes for issue from check and sevice bot

### 1.0.6 (2023-11-12)
* (BenAhrdt) insert check for node >= 16

### 1.0.5 (2023-11-02)
* (BenAhrdt) correction in jsonconfig schema

### 1.0.4 (2023-06-18)
* (BenAhrdt) insert state and oldState in message

### 1.0.3 (2023-06-17)
* (BenAhrdt) callback improoved for data and errormessage

### 1.0.2 (2023-06-16)
* (BenAhrdt) messagfunction added: now its possible to read the current operationhour out by sendTo

### 1.0.1 (2023-04-26)
* (BenAhrdt) unkrain language added

### 1.0.0 (2023-04-05)
* (BenAhrdt) dependencies updated for version 1.0.0

[Older changelogs can be found there](https://github.com/BenAhrdt/ioBroker.operating-hours/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 BenAhrdt <bsahrdt@gmail.com>

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