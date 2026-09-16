---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.x-touch/README.md
title: ioBroker.x-touch
hash: UAWke9/1iMux4huwh0yyrC+VPCyEzdVYHqXTTn90q9Y=
---
![Логотип](../../../en/adapterref/iobroker.x-touch/admin/x-touch.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.x-touch.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.x-touch.svg)
![Количество установок (последние)](http://iobroker.live/badges/x-touch-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/x-touch-stable.svg)
![Тестирование и выпуск](https://github.com/bannsaenger/iobroker.x-touch/workflows/Test%20and%20Release/badge.svg)
![Известные уязвимости](https://snyk.io/test/github/Bannsaenger/ioBroker.x-touch/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.x-touch.png?downloads=true)

# ioBroker.x-touch

## Адаптер x-touch для ioBroker

Взаимодействие с панелью управления Behringer X-Touch (контроллер DAW)

## Список дел

- Добавить функциональность syncGlobal

## Ящик для сообщений

Принимаются две команды:

- `export` экспортирует фактические значения, хранящиеся в состояниях групп устройств, в папку пользовательских данных x-touch.0
- `import` Импортирует самый молодой файл из папки userdata. Дополнительно можно указать`file` и/или`devicegroup` номер для восстановления. Если`path` Если указано, что будет использоваться вся файловая система, то...`file` Указание имени обязательно.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.9.1 (2026-08-22)
* (Bannsaenger) updated dependencies and issues from repository checker

### 0.9.0 (2026-05-15)
* (Bannsaenger) added additional path checking on importing files
* (copilot) Adapter requires node.js >= 22 now
* (Bannsaenger) updated dependencies and issues from repository checker
* (Bannsaenger) preserve names while database creation
* (Bannsaenger) restructured main.js and completed JsDoc requirements
* (Bannsaenger) fixed update the buttons from the desk when blanked/unblanked or new connected

### 0.8.3 (2025-10-24)
* (Bannsaenger) updated dependencies and issues from repository checker
* (Bannsaenger) migrate to NPM Trusted Publishing

### 0.8.2 (2025-09-05)
* (Bannsaenger) updated dependencies and issues from repository checker

### 0.8.1 (2025-05-21)
* (Bannsaenger) node 22 in deploy script
* (Bannsaenger) do not send updates when lock feature is in blank mode

[Older changelogs can be found there](https://github.com/Bannsaenger/ioBroker.x-touch/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2021-2026 Bannsaenger <bannsaenger@gmx.de>

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