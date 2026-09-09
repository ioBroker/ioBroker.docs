---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.batrium-bms/README.md
title: ioBroker.batrium-bms
hash: BHG86kIxjbbf9+2Ce2Z9QXFfDRiJDQuUWu17OT+Q1bA=
---
![Логотип](../../../en/adapterref/iobroker.batrium-bms/admin/batrium-bms.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.batrium-bms.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.batrium-bms.svg)
![Тестирование и выпуск](https://github.com/bembelstemmer/ioBroker.batrium-bms/workflows/Test%20and%20Release/badge.svg)
![Количество установок](https://iobroker.live/badges/batrium-bms-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/batrium-bms-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.batrium-bms.png?downloads=true)

# ioBroker.batrium-bms

<!--
-->

## адаптер batrium-bms для ioBroker

Адаптер ioBroker для отслеживания метрик вашей системы управления батареей Batrium BMS, публикуемых по протоколу UDP.

!!! Данный адаптер официально не поддерживается компанией Batrium !!!

Этот адаптер основан на официальной реализации Batrium WatchMonUdpListener, доступной по адресу: <https://github.com/Batrium/WatchMonUdpListener>

Поддержка сообщений пока ограничена и будет расширена в последующих версиях.

## Changelog
### 0.8.1 (2026-06-12)
* Various Cleanups suggested by iobroker-bot

### 0.8.0 (2026-06-11)
* Adapter requires node.js >= 22 now
* Various Package Updates

### 0.7.0 (2025-11-15)
* Drop of Node18 and adding of Node24 support
* Various Package Updates
* Migration of eslint from 8 to 9

### 0.6.0 (2025-03-27)
* Drop Support for Node v16
* Various Package Upgrades
* Increased min js-controller version to 5.0.19
* Increased min Admin version to 7.4.10

### 0.5.0 (2023-09-10)
* Various Package Upgrades (inc. Update to ioBroker Adapter lib v3)
* Adding of Tests for Node Version 20.x
* Fixed marking of properties writeable even if they're not
* Fixed wrong Naming of Object 5732.ShuntStatus
* Reworked Object Roles to better match their meaning (where meaning was known)

[Older changelogs can be found there](https://github.com/bembelstemmer/ioBroker.batrium-bms/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 Bembelstemmer <kontakt[at]it-amm[dot]de>

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