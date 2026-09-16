---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.janitza-gridvis/README.md
title: ioBroker.janitza-gridvis
hash: HN4UTo+sHVb5Kfzt8xgLhsLRXc1FTRK+JwHYYlKtMSU=
---
![Логотип](../../../en/adapterref/iobroker.janitza-gridvis/admin/janitza-gridvis.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.janitza-gridvis.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.janitza-gridvis.svg)
![Количество установок](https://iobroker.live/badges/janitza-gridvis-installed.svg)
![Тестирование и выпуск](https://github.com/BenAhrdt/ioBroker.janitza-gridvis/workflows/Test%20and%20Release/badge.svg)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![НПМ](https://nodei.co/npm/iobroker.janitza-gridvis.png?downloads=true)

# ioBroker.janitza-gridvis

## janitza-gridvis адаптер для ioBroker

Считывайте данные из системы управления энергопотреблением Janitza® GridVis®. Вы можете считывать все онлайн-значения текущих устройств. Кроме того, вы можете считывать исторические значения энергопотребления текущих устройств. Реализованы следующие временные интервалы: Сегодня Вчера Эта неделя Прошлая неделя Этот месяц Прошлый месяц Этот квартал Прошлый квартал Этот год Прошлый год Гибкие временные рамки

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 3.7.9 (2026-04-08)
* (BenAhrdt) remove wrong debug warn logging

### 3.7.8 (2026-04-08)
* (BenAhrdt) improve handling of http STatus 400 & 404

### 3.7.7 (2026-04-05)
* (BenAhrdt) show id of device

### 3.7.6 (2026-04-05)
* (BenAhrdt) sort entries

### 3.7.5 (2026-04-04)
* (BenAhrdt) test changed from 22.x to 24.x

### 3.7.4 (2026-04-04)
* (BenAhrdt) add deviceinfos und deviceObject to card

### 3.7.3 (2026-04-03)
* (BenAhrdt) use fetch instead of axios and set language to ioBroker language

### 3.7.2 (2026-04-02)
* (BenAhrdt) replacement of defined preLabels

### 3.7.1 (2026-04-02)
* (BenAhrdt) bugfixing model type === undefined

### 3.7.0 (2026-04-02)
* (BenAhrdt) display online Values in card

[Older changelogs can be found there](https://github.com/BenAhrdt/ioBroker.janitza-gridvis/blob/main/CHANGELOG_OLD.md)

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