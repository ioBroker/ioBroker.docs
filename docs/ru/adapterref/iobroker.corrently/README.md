---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.corrently/README.md
title: ioBroker.corrently
hash: h35TtgBmMnxiQNQuCE4ML+8Em7mKQjFwzak/WZQGtu4=
---
![Логотип](../../../en/adapterref/iobroker.corrently/admin/corrently.png)

![Количество установок](https://iobroker.live/badges/corrently-installed.svg)
![Стабильная версия](https://iobroker.live/badges/corrently-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.corrently.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.corrently.svg)
![НПМ](https://nodei.co/npm/iobroker.corrently.png?downloads=true)
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.corrently/workflows/Test%20and%20Release/badge.svg)

# ioBroker.corrently

## актуальный адаптер для ioBroker

Ознакомьтесь с индексом зеленой энергетики по ссылке [https://www.corrently.de/gsi/PLZ](https://www.corrently.de/gsi/80999) . Будут предоставлены следующие данные:

- `data.json` - JSON-таблица на следующие 36 часов с зеленым индексом
- `data.start` - начальная временная метка следующего или текущего периода с использованием экологически чистой энергии 0 - 24
- `data.duration` - продолжительность следующего или текущего периода использования экологически чистой энергии 0 - 24
- `data.green` — Является ли зеленая энергия сейчас или нет?
- `data.price` - зеленая цена на данный момент

## Конфигурация

Адаптер будет запускаться каждый час (это можно настроить, например, по расписанию), и пользователь должен указать индекс записи в конфигурации.

<!--
    ### **WORK IN PROGRESS**
-->

## Changelog
### 0.1.2 (2026-10-14)
- (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
- (@GermanBluefox) Adapter requires node.js >= 22 and admin >= 7.6.17 now
- (@GermanBluefox) Updated packages, migrated to ESLint 9 and removed the outdated admin files
- (@GermanBluefox) The tests run on Windows and macOS too

### 0.1.1 (2023-03-12)
* (Maverick78de) URL was corrected
* (bluefox) Randomize the minutes of the schedule
* (bluefox) Implemented solar chart for the next 5 days

### 0.0.2
* (bluefox) CRON schedule was changed to "1 * * * *"

### 0.0.1
* (bluefox) initial release

## License
MIT License

Copyright (c) 2019-2026 bluefox

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