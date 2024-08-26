---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.corrently/README.md
title: без заголовка
hash: /DW2QcECua6bcoPQg0f17in1PhDYhgEE7+Zj5dl7hSY=
---
![Количество установок](http://iobroker.live/badges/corrently-installed.svg)
![Стабильная версия](http://iobroker.live/badges/corrently-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.corrently.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.corrently.svg)
![Статус зависимости](https://img.shields.io/david/GermanBluefox/iobroker.corrently.svg)
![Известные уязвимости](https://snyk.io/test/github/GermanBluefox/ioBroker.corrently/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.corrently.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/GermanBluefox/ioBroker.corrently/master.svg)

<h1><img src="admin/corrently.png" width="64"/>ioBroker.правильно</h1>

## Правильный адаптер для ioBroker
Прочитайте индекс зеленой энергии из [https://www.corrently.de/gsi/PLZ](https://www.corrently.de/gsi/80999) .
Будут предоставлены следующие данные:

 - `data.json` - таблица JSON на следующие 36 часов с зеленым индексом
 - `data.start` - метка времени начала следующего или текущего периода с зеленой энергией 0 - 24
 - `data.duration` - продолжительность следующего или текущего периода с зеленой энергией 0 - 24
 - `data.green` - теперь зеленая энергия или нет
 - `data.price` - зеленая цена на текущий момент

## Конфигурация
Адаптер будет выполняться каждый час (например, может быть установлен как расписание), и пользователь должен ввести индекс сообщения в конфигурации.

## Правильно Адаптер для ioBroker
Lesen Sie den Index der grünen Energie von [https://www.corrently.de/gsi/PLZ] (https://www.corrently.de/gsi/80999).
Folgende Daten werden zur Verfügung gestellt:

- `data.json` - JSON-таблица для индекса 36 Stunden mit grünem
- `data.start` - Startzeitstempel der nächsten oder aktuellen Periode mit grüner Energie 0–24
- `data.duration` - Dauer der nächsten oder aktuellen Periode mit grüner Energie 0–24
- `data.green` - ist jetzt grüne Energie oder nicht
- `data.price` - grüner Preis für den aktuellen Moment

## Einstellungen
Der Adapter wird stündlich ausgeführt (kann beispielsweise als Zeitplan festgelegt werden), und der Benutzer muss den Post-Index in der Konfiguration eingeben.

<!--

### **В РАБОТЕ** -->

## Changelog
### 0.0.4 (2023-02-27)
* (Maverick78de) URL was corrected

### 0.0.2
* (bluefox) CRON schedule was changed to "1 * * * *"

### 0.0.1
* (bluefox) initial release

## License
MIT License

Copyright (c) 2019-2023 bluefox

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
