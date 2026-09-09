---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.meteoswiss/README.md
title: ioBroker.meteoswiss
hash: +z81b9Hf+B348mrvnH91B9ZiyRLMhqbFRYVz0AddWKE=
---
![Логотип](../../../en/adapterref/iobroker.meteoswiss/admin/meteoswiss.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.meteoswiss.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.meteoswiss.svg)
![Количество установок (последние)](https://iobroker.live/badges/meteoswiss-installed.svg)
![Количество установок (стабильных)](https://iobroker.live/badges/meteoswiss-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.meteoswiss.png?downloads=true)
![Тестирование и выпуск](https://github.com/deMynchi/ioBroker.meteoswiss/workflows/Test%20and%20Release/badge.svg)

# ioBroker.meteoswiss

## адаптер meteoswiss для ioBroker

Предоставляет информацию о погоде от MeteoSwiss.

## Названия штатов

Чтобы идентификаторы штатов были короткими и понятными, во многих штатах для их различения используются только цифры. Все штаты имеют осмысленные названия, поэтому вам может потребоваться включить столбец «Название» в ioBroker.admin, чтобы понимать значение названий всех штатов.

## Обновления погоды

MeteoSwiss обновляет данные о погоде каждые 10 минут. Этот адаптер старается получать данные о погоде как можно быстрее после их изменения и соответствующим образом корректирует таймер обновления. Обычно данные о погоде обновляются не более чем за 11 минут.

## Неизвестные значения

Некоторые значения не всегда отображаются на всех метеостанциях или в местах прогнозирования погоды. Данные будут доступны только в тех штатах, где это необходимо.`null` чтобы четко различать неизвестные значения и известные значения «0».

## Совокупность значений

Некоторые измерения и прогнозы отображаются чаще, чем 3-часовой интервал, предусмотренный этим адаптером. Поэтому эти значения агрегируются логическим образом (минимум — это минимум всех значений в диапазоне, максимум — это максимум и т. д.).

## Предупреждения о погоде

Все`warning-xx` В состояниях отображается наиболее важное на данный момент активное предупреждение данной категории. Возможно, что одновременно существует несколько предупреждений одной и той же категории, но этот адаптер покажет только самое важное. Предупреждения более высокого уровня и предупреждения, не помеченные как «прогноз», считаются более важными, чем предупреждения более низкого уровня или помеченные как «прогноз».

Если предупреждение определенной категории отсутствует, то`warning-xx.level` государство будет иметь значение`0` (Ни одного) и все остальные штаты этой категории будут`null` .

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.0.2 (2026-01-21)

- (deMynchi) Fixes to satisfy code review

### 1.0.1 (2026-01-06)

- (deMynchi) Fixes to satisfy repochecker

### 1.0.0 (2026-01-06)

- (deMynchi) Update to API version 3
- (deMynchi) Remove subscription (no longer working)
- (deMynchi) Use latest create-adapter template
- (deMynchi) Switch to pure TypeScript adapter (no more build)

### 0.2.1 (2021-07-13)

- (deMynchi) Fixed issue where sometimes the wrong warning texts were shown when there are multiple warnings from different categories.

### 0.2.0 (2021-07-08)

- (deMynchi) Added warnings for PLZ entries.

### 0.1.2 (2021-03-22)

- (deMynchi) Fixed connection state always yellow.

### 0.1.1 (2021-03-22)

- (deMynchi) Fixed initial download of sqlite db that was broken

### 0.1.0 (2021-03-21)

- (deMynchi) initial release

## License

MIT License

Copyright (c) 2026 deMynchi

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