---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rfxcom/README.md
title: ioBroker.rfxcom
hash: +GR89ECL8/X5QLBQ7uFPM12yLupVXCdWj53brSnqg0Q=
---
![Логотип](../../../en/adapterref/iobroker.rfxcom/admin/rfxcom.png)

![Количество установок](https://iobroker.live/badges/rfxcom-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.rfxcom.svg)
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.rfxcom/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/rfxcom/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.rfxcom.svg)

# ioBroker.rfxcom

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

Этот адаптер взаимодействует с [rfxcom](http://www.rfxcom.com) . Используется для приема данных от датчиков погоды и беспроводных выключателей питания.

Подробную документацию по RfxCom можно найти [здесь.](http://www.rfxcom.com/WebRoot/StoreNL2/Shops/78165469/MediaGallery/Downloads/RFXtrx_User_Guide.pdf)

## Использование

Для включения обучения датчиков необходимо активировать «Режим включения». По умолчанию режим включения будет включен на 5 минут (300000 мс), а через 5 минут автоматически отключится.

Чтобы включить режим включения навсегда, просто установите параметр "Время ожидания включения" равным 0.

## Пара

Устройства получают новый адрес каждый раз при замене батареи.

Поэтому после замены батареи его нужно будет обучать заново.

Для этого нажмите кнопку сопряжения непосредственно перед установкой батареи, и устройство будет распознано по новому адресу.

## Список дел

**В настоящий момент поддерживаются только устройства Somfy, Curtain и Lighting3.**

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22.19.0 now
### 3.0.1 (2026-10-14)
* (@GermanBluefox) Added the missing sizes to the settings for all screen widths

### 3.0.0 (2026-10-14)
* (bluefox) The adapter was refactored to TypeScript and JsonConfig
* (bluefox) Breaking change: Node.js >= 22, js-controller >= 6.0.11 and admin >= 7.6.17 are required
* (bluefox) Fixed: the subtype was sent as text to the RFXtrx, so all subtypes except the first one (e.g. RFYEXT, ARC) were controlled wrongly
* (bluefox) Fixed: Lighting1 and Curtain1 devices could not be controlled (wrong device ID format); Curtain1 objects were not created
* (bluefox) Fixed: received Lighting1/Lighting2/Weight devices crashed the adapter and were never learned; the inclusion mode can be switched on and off now
* (bluefox) Fixed: the `state` and `level` states of the devices and the venetian blind commands of RFY work now
* (bluefox) The used serial port is reported to js-controller 8 (`registerUsedResource`), with a warning if another instance already uses it
* (bluefox) Fixed: pairing of devices that were not saved yet, "All Off"/"All On" of Lighting1 were swapped, the Lighting2 dim level was scaled wrongly

### 2.0.2 (2021-11-10)
* (bluefox) Fixed error by deleting of object

### 2.0.1 (2021-06-29)
* (peterbaumert) update packages
* (bluefox) Breaking change: no linux with 32 bit support

### 1.0.1 (2020-08-05)
* (bluefox) Compact mode
* (bluefox) Support of node 10 added
* (bluefox) Refactoring

### 0.1.0 (2016-07-05)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017-2026, Bluefox <dogafox@gmail.com>

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