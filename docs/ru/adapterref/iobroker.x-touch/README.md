---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.x-touch/README.md
title: ioBroker.x-прикосновение
hash: AAPixqUfKFCsjwx3NXQZvTocuy413K+pphI3PZIFRmw=
---
![Логотип](../../../en/adapterref/iobroker.x-touch/admin/x-touch.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.x-touch.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.x-touch.svg)
![Количество установок (последнее)](http://iobroker.live/badges/x-touch-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/x-touch-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/Bannsaenger/ioBroker.x-touch/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.x-touch.png?downloads=true)

# IoBroker.x-touch
![Тест и выпуск](https://github.com/bannsaenger/iobroker.x-touch/workflows/Test%20and%20Release/badge.svg)

## Адаптер x-touch для ioBroker
Общайтесь с помощью панели управления Behringer X-Touch (контроллер DAW)

## Задача
- Добавить функционал syncGlobal

## Окно сообщения
Принимаются две команды:

* `export` экспортирует фактические значения, хранящиеся в состояниях групп устройств, в папку пользовательских данных x-touch.0
* `import` импортирует самый молодой файл из папки userdata. Дополнительно можно указать `file` и/или номер `devicegroup` для восстановления. Если указан `path`, будет использована вся файловая система, а имя `file` обязательно.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.8.1 (2025-05-21)
* (Bannsaenger) node 22 in deploy script
* (Bannsaenger) do not send updates when lock feature is in blank mode

### 0.8.0 (2025-05-15)
* (Bannsaenger) updated dependencies, node 24 compatibility
* (Bannsaenger) refactored lock feature

### 0.7.1 (2025-02-25)
* (Bannsaenger) updated admin dependency

### 0.7.0 (2025-02-17)
* (Bannsaenger) fixed some minor typos
* (Bannsaenger) updated to node 18.x - 22.x
* (Bannsaenger) updated dependencies, node 22 compatibility, workflow
* (Bannsaenger) added possibility to lock the desk
* (Bannsaenger) resend data on group membership change
* (Bannsaenger) removed createBanks from config dialog (too dangerous, delete by hand if neccessary)

### 0.6.5 (2023-12-30)
* (Bannsaenger) add CHANGELOG_OLD.md

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