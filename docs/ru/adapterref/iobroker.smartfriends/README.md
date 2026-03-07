---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.smartfriends/README.md
title: ioBroker.smartfriends
hash: zXyVIOOUaO1HwXYuWgq5NZyZIYBPOeTvisBibgXUFUA=
---
![Логотип](../../../en/adapterref/iobroker.smartfriends/admin/smartfriends.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.smartfriends.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.smartfriends.svg)
![Количество установок (последние)](http://iobroker.live/badges/smartfriends-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/smartfriends-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/Black-Thunder/ioBroker.smartfriends/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.smartfriends.png?downloads=true)

# IoBroker.smartfriends
[![Тестирование и релиз](https://github.com/Black-Thunder/ioBroker.smartfriends/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Black-Thunder/ioBroker.smartfriends/actions/workflows/test-and-release.yml) [![Reviewdog](https://github.com/Black-Thunder/ioBroker.smartfriends/actions/workflows/code-quality.yml/badge.svg)](https://github.com/Black-Thunder/ioBroker.smartfriends/actions/workflows/code-quality.yml)

##адаптер smartfriends для ioBroker
Этот адаптер обеспечивает прямую **локальную интеграцию** устройства **SmartFriends Box** (например, Smart Friends Box от Schellenberg, ABUS, Paulmann, STEINEL и др.) в ioBroker – **без использования официального облака**.

Адаптер устанавливает прямое соединение со шлюзом для локального управления устройствами и получения от них запросов.

## Документация:
- [Описание на английском языке](https://github.com/Black-Thunder/ioBroker.smartfriends/tree/master/docs/en/smartfriends.md)
- [Deutsche Beschreibung](https://github.com/Black-Thunder/ioBroker.smartfriends/tree/master/docs/de/smartfriends.md)

## Обсуждение:
- [Форум ioBroker](https://forum.iobroker.net/topic/83202)

## Благодарности
Особая благодарность и признание [ЛоПабло](https://github.com/LoPablo/SchellenbergApi) за обратное проектирование API!

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.3.6-alpha.1 (2026-03-02)

- (Black-Thunder) Connection and reconnection logic to the gateway was refactored
- (Black-Thunder) Adapter requires admin version >=7.6.20 now

### 1.3.5 (2026-02-24)

- (Black-Thunder) Additional logging when connection parameters are incorrect was added
- (Black-Thunder) Validation of the adapter configuration in the GUI was added

### 1.3.4 (2026-01-21)

- (Black-Thunder) Additional irrelevant gateway messages are now ignored
- (Black-Thunder) Unknown gateway messages are now logged as warning instead of error

### 1.3.3 (2026-01-18)

- (Black-Thunder) Special characters in device definitions (e.g. "<>") are now correctly handled
- (Black-Thunder) Boolean values in device definitions are now correctly handled
- (Black-Thunder) Numeric sensor values are no longer rounded

### 1.3.2 (2026-01-13)

- (Black-Thunder) Creation of adapter objects was fixed

### 1.3.1 (2026-01-12)

- (Black-Thunder) Dependencies were updated

### 1.3.0 (2026-01-11)

- (Black-Thunder) Support for further device types was added
- (Black-Thunder) Umlauts in device names are now correctly parsed

### 1.2.0 (2026-01-09)

- (Black-Thunder) Timeout for initial device request was increased
- (Black-Thunder) Devices without defined device type are ignored
- (Black-Thunder) Refactored device handling and added support for further device types

### 1.1.0 (2025-12-28)

- (Black-Thunder) Refactored device handling: dynamic states, removed type whitelist, grouped devices under master ID
- (Black-Thunder) Handle device value updates now correctly

### 1.0.1 (2025-12-20)

- (Black-Thunder) Increased robustness when communicating with the gateway
- (Black-Thunder) Added new option to ignore certificate errors

### 1.0.0 (2025-12-18)

- (Black-Thunder) initial release

## License

MIT License

Copyright (c) 2025-2026 Black-Thunder <glwars@aol.de>

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