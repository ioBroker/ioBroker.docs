---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rfxcom/README.md
title: ioBroker.rfxcom
hash: 7nbcRLPBSS10VFNTYxZ596/gHlhYGkY1VLwYo0fOZNc=
---
![Логотип](../../../en/adapterref/iobroker.rfxcom/admin/rfxcom.png)

![Количество установок](http://iobroker.live/badges/rfxcom-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.rfxcom.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.rfxcom.svg)

# IoBroker.rfxcom
![Тестируйте и выпускайте](https://github.com/ioBroker/ioBroker.rfxcom/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/rfxcom/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Этот адаптер связывается с [rfxcom](http://www.rfxcom.com).
Используется для получения данных от датчиков погоды и беспроводных выключателей питания.

Прочтите подробную документацию для RfxCom [здесь](http://www.rfxcom.com/WebRoot/StoreNL2/Shops/78165469/MediaGallery/Downloads/RFXtrx_User_Guide.pdf)

## Применение
Для включения обучения датчиков необходимо активировать «Режим включения».
Режим включения по умолчанию будет включен на 5 минут (300000 мс) и через 5 минут автоматически отключится.

Чтобы включить режим включения навсегда, просто установите «Время ожидания включения» на 0.

## Пара
Устройства получают новый адрес каждый раз при замене батареи.

Так что после смены батарейки его надо узнавать заново.

Для этого нажмите кнопку сопряжения непосредственно перед установкой батареи, и устройство будет изучено с новым адресом.

## Сделать
**На данный момент поддерживаются только устройства Somfy, Curtain и Lighting3.**

<!-- Заполнитель для следующей версии (в начале строки):

### __РАБОТА ВЫПОЛНЯЕТСЯ__ -->

## Changelog

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

Copyright (c) 2017-2021, Bluefox<dogafox@gmail.com>

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
