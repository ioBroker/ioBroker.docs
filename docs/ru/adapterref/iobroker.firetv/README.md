---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.firetv/README.md
title: без заголовка
hash: nJW8Ivl7+3wVKYmhPNOD5TqxvroOmDX/LCe164N51sI=
---
![Логотип](../../../en/adapterref/iobroker.firetv/admin/firetv.png)

![Количество установок](http://iobroker.live/badges/firetv-community-installed.svg)
![Стабильная версия](http://iobroker.live/badges/firetv-community-stable.svg)
![НПМ-версия](https://img.shields.io/npm/v/iobroker.firetv.svg)
![Тесты](https://img.shields.io/travis/soef/iobroker.firetv/master.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Статус сборки](https://secure.travis-ci.org/soef/iobroker.firetv.svg?branch=master)

### IoBroker.firetv
<!--
[![Версия NPM](https://badge.fury.io/js/iobroker.firetv.svg)](https://www.npmjs.com/package/iobroker.firetv)
-->

С помощью этого адаптера вы можете управлять некоторыми функциями вашего Fire TV или Fire TV Stick.
Например.:

- Вкл выкл
- Отправка ключевых событий
- Отправка текстовых строк в поля ввода
- Запуск/остановка приложений
- перезагрузить
- выполнять команды оболочки

#### Немного информации
Этот адаптер использует функции «Android Debug Bridge», известного как «adb». Adb является частью SDK для разработчиков Android. Поскольку Fire TV имеет операционную систему Android, им можно управлять с помощью adb.

#### Требования
Чтобы использовать этот адаптер, вам необходимо установить как минимум пакет adb Android SDK. Чтобы не устанавливать полный Android SDK, вам следует установить *Minimal ADB и Fastboot*.

Найдите в Google (Minimal ADB и Fastboot) последнюю ссылку для скачивания.

Альтернативно вы можете использовать *adbLink*

## Changelog
<!-- 
    ### **WORK IN PROGRESS** 
-->
### 2.1.0 (2024-04-07) 
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.0.2 (2023-09-09) 
* (jonaskn) A crash has been fixed (#56)

### 2.0.1 (2023-09-07)
* (Grothesk242) make compatible with Node.js 18+
* (bluefox) a minimum node.js version is 16

### 1.0.0 (2020-04-09)
* (foxriver76) compatibility for js-c 3

## License
The MIT License (MIT)

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2016-2023 soef <soef@gmx.net> and Community developers

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.