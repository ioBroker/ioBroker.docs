---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vivitek/README.md
title: ioBroker.vivitek
hash: XMhDgcHa2xqJZkUjWZ9usXlpe33EZqQIJz6Yg40Pdec=
---
![Логотип](../../../en/adapterref/iobroker.vivitek/admin/vivitek.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.vivitek.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vivitek.svg)
![Количество установок (последнее)](http://iobroker.live/badges/vivitek-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/vivitek-stable.svg)
![Статус зависимости](https://img.shields.io/david/Bannsaenger/iobroker.vivitek.svg)
![Известные уязвимости](https://snyk.io/test/github/Bannsaenger/ioBroker.vivitek/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.vivitek.png?downloads=true)

# IoBroker.vivitek
##адаптер vivitek для ioBroker
Управление проектором Vivitek через сеть (команды RS 232 через telnet)

Адаптер предназначен для связи с проектором vivitek через его интерфейс telnet. Он должен вести себя как последовательный порт.

К сожалению, в реализации telnet отсутствуют некоторые базовые команды.
На данный момент возможно только подключение по сети к RS232 Com-Server.
Я запускаю его с помощью Wieseman & Theis Com-Server.

## Задача
Когда реализация на стороне проектора заработает полностью, следует добавить больше команд для полного управления проектором.
Насколько мне известно на данный момент, протокол охватывает целое семейство проектов.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.1 (2025-02-25)
* (Bannsaenger) updated admin dependency

### 0.1.0 (2025-02-09)
* (Bannsaenger) updated dependencies and moved to release script
* (Bannsaenger) instance config and object database handling prepared for >= admin5
* (Bannsaenger) json Config
* (Bannsaenger) add errorHandler

### 0.0.2
* (Bannsaenger) prepared for checkin to iobroker.latest

### 0.0.1
* (Bannsaenger) initial release

### 0.0.2
* (Bannsaenger) added engine and prepared for review

## License
MIT License

Copyright (c) 2021-2025 Bannsaenger <bannsaenger@gmx.de>

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