---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.judoisoft/README.md
title: ioBroker.judoisoft
hash: 94PTq/GJP0CTD1to4XsTqDKMykjkTvCCcJijxUL63Zs=
---
![Логотип](../../../en/adapterref/iobroker.judoisoft/admin/judo.png)

![Количество установок](http://iobroker.live/badges/judoisoft-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.judoisoft.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.judoisoft.svg)
![НПМ](https://nodei.co/npm/iobroker.judoisoft.png?downloads=true)

# IoBroker.judoisoft
=================

Адаптер judoisoft для ioBroker -------------------------------------------------------------------------------

Небольшой фрагмент, содержащий только параметры команды:

![möglichkeiten](https://github.com/arteck/iobroker.judoisoft/blob/master/doku/datenpunkte.png)

Доступные настройки:

![möglichkeiten](https://github.com/arteck/iobroker.judoisoft/blob/master/doku/settings.png)

Для устройств с новым модулем подключения JUDO включите параметр `REST API (connectivity module)` в настройках экземпляра.
Это позволит использовать локальный интерфейс `http://<ip>/api/rest/...` (базовая аутентификация).

(имя пользователя/пароль по умолчанию — 'admin' / 'Connectivity')

## Changelog

### **WORK IN PROGRESS**
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (@SimonFischer04) support rest-api (#143). closes #32, closes #82
- (@arteck, @SimonFischer04) (dependency) bump / cleanups
- (@SimonFischer04) Migration to ESLint 9 and @iobroker/eslint-config. #114
- (@SimonFischer04) Migrate admin config to ioBroker jsonConfig. Closes #55

### 1.1.2 (2025-01-04)
* (arteck) corr some errors

### 1.1.1 (2024-09-26)
* (arteck) corr cloud connection

### 1.1.0 (2023-10-27)
* (arteck) switch to intervall

### 1.0.15 (2022-05-30) 
* (arteck) new error handling

### 1.0.11  (2021-11-07)
* (arteck) performance corr

### 1.0.7  (2021-04-14)
* (arteck) corr psw save method

### 1.0.6  (2021-04-08)
* (arteck) add battery 
           add installationdate
           add servicedays

### 1.0.5  (2021-03-24)
* (arteck) add new cloud access

### 1.0.4  (2021-03-18)
* (arteck) add timeout

### 1.0.3  (2021-02-06)
* (arteck) the cloud infos are not available for collection, sry 
*

### 1.0.2  (2021-01-26)
* (arteck) cloud login added

### 1.0.0  (2021-01-20)
* (arteck) new js-controller upd

### 0.0.1 (2020-12-26)
* (arteck) refactoring

## License
The MIT License (MIT)

Copyright (c) 2018-2026 Arthur Rupp arteck@outlook.com

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