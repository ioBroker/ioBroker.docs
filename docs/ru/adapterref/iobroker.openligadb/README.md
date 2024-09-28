---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.openligadb/README.md
title: Адаптер ioBroker для получения результатов футбольных матчей из OpenLigaDB
hash: L8JqNHp9+kP3AV+a34oxU+7KfFAaJ1BsFpfNqgZSmpM=
---
![Логотип](../../../en/adapterref/iobroker.openligadb/admin/openligadb_n.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.openligadb.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.openligadb.svg)
![Количество установок](https://iobroker.live/badges/openligadb-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/openligadb-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.openligadb.png?downloads=true)

# Адаптер ioBroker для получения результатов футбольных матчей из OpenLigaDB
## Обзор
Адаптер для запроса данных об игре в футбол или других играх из `openligadb.de`

## Конфигурация
Добавьте экземпляр адаптера и щелкните по символу гаечного ключа. В форме вы можете добавить ярлык из лиги и сезона.
Пожалуйста, посетите `openligadb.de` для доступных лиг, сезонов и ярлыков. Если сезон распространяется на два года, пожалуйста, введите только год начала.

Пример данных для 1. Немецкая Бундлига — `shortcut = bl1 season = 2023`

Если вы сохранили и закрыли конфигурацию, через некоторое время после этого должны появиться новые точки данных для вашей лиги и сезона.

## Vis и виджеты
На самом деле доступно 5 виджетов. Введите openligadb в фильтр виджетов

### Таблица v4
Этот виджет отображает текущий рейтинг вашей лиги.

### Сводная версия v2
Этот виджет показывает все результаты в сводной таблице.

### Голеатры v2
Этот виджет показывает игроков, забивших голы в этом сезоне

### День игры
Все игры текущего или выбранного игрового дня. Существует множество виджет-атрибутов для настройки количества отображаемых данных

### Игры любимых клубов
Отображение всех текущих или будущих игр ваших любимых клубов

Документация по vis-widgets доступна внутри vis или [Виджет-Документация/немецкий](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.openligadb/blob/master/widgets/openligadb/doc.html)

## `sendTo` Команды
### `getMatchData`
Запросите данные из OpenLigaDB по лиге, сезону и временному диапазону.

#### Обязательные параметры
| `Parameter` | `Example` | `Type` | `Description` |
| `league` | `bl1` | `string` | `identifier of the league, see openlogadb` |
| `season` | `2024` | `string` | `name of the season, see openlogadb` |
| `datefrom` | `2024-09-01T00:00` | `string` | `date in ISO notation` |
| `datetill` | `2024-09-10T00:00` | `string` | `date in ISO notation` |
| `datetill` | `2024-09-10T00:00` | `string` | `дата в нотации ISO` |

#### Пример
```javascript
sendTo(
  "openligadb.0",
  "getMatchData",
  {
    league: "bl1",
    season: "2024",
    datefrom: "2024-09-01T00:00",
    datetill: "2024-09-10T00:00",
  },
  function (matches) {
    console.log(matches);
  }
);
```

## То, что нужно сделать
- проверка в виджете, если пользователь не выбрал правильную точку данных
- ~~перевод~~
- ~~документация для новых виджетов pivottable и goalgetters~~
- ~~расширенные режимы таблицы с 1-м раундом, 2-м раундом~~
- ~~новый виджет сводной таблицы сыгранных игр~~
- ~~новый виджет рейтинга добытчиков целей с функцией сортировки~~
- ~~расширить таблицу со знаком тренда (стрелка вверх/вниз, точка для отсутствия изменений)~~
- ~~расширить таблицу для расчета с x последними играми~~
- ~~расширить таблицу для расчета рейтинга за определенный игровой день~~
- ~~адаптер документации/виджет~~
- ~~исправить проблему с динамикой колонки клуба~~
- ~~новый виджет: следующие x игр клуба~~
- ~~настройка игрового дня виджета для начала игрового дня и его длины (-1,3 = показать предыдущий

игровой день и 3 игровых дня после него)~~

- ~~Заменяющее значение для режима редактирования, если showgameday установлен с привязкой~~
- ~~выделить любимый клуб~~
- ~~контролируемый игровой день в виджете игрового дня~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
   ### **WORK IN PROGRESS**
-->
### 1.7.0 (2024-09-16)

- fix quotes

### 1.6.0 (2024-09-16)

- reimplement checkTodayFavorite

### 1.5.0 (2024-09-15)

- Addition of a CSS example for the Pivot Table widget
- add `sendTo` command to getMatchData
- remove deprecated widgets
- addition widget option "only logo" to supress the teamname

### 1.4.11 (2024-08-09)

- fix issues from adapter checker

### 1.4.10 (2024-08-02)

- switch to eslint 9
- adjust markdownlint settings to be compatible with prettier

### 1.4.9 (2024-06-13)

- fix if no game exist for team1/team2
- somme prettier changes
- launch config for vscode

### 1.4.8 (2024-06-06)

- release

### 1.4.7 (2024-06-04)

- update dependencies

### 1.4.6 (2024-06-01)

- fix yml structure

### 1.4.5 (2024-06-01)

- fix yml structure

### 1.4.4 (2024-06-01)

- Enable NPM Publish
- Enable dependabot
- fix checks from adapter checker

### 1.4.3 (2024-06-01)

- remove files from eslint check

### 1.4.2 (2024-06-01)

- fix double qoutes
- remove files from eslint check

### 1.4.1 (2024-06-01)

- update package and io-broker files
- fix problems with vis2
- remove vis as a

### 1.2.4

- fix problems reported by adapter-checker

### 1.2.3

- add connectiontype and datasource to io-package.json

### 1.2.2

- fix result calculation

### 1.2.1

- fix object type

### 1.2.0

- fix display of goals if goals are without minutes and playername saved by openligadb

- fixed that sometimed request of states failed

### 1.1.0

- prepare v1.1.0

### 1.0.3

- change setstate/createobject logic

### 1.0.2

- remove deprecated widgets / change widget beta flag

- improve debug messages

### 1.0.1

- improve error message for requests

### 1.0.0

- prepare for stable repository

### 0.11.5

- pivottable: show only results for selected gameday
- table3: icon attributes, add image selection dialog
- table3: add an extra attribute for mode to use with binding
- all widgets: update documentation

### 0.11.4

- fixed build/test problem

### 0.11.3

- pivottable: fix problem with rank number

### 0.11.2

- pivottable: fix problem with sort and highlightontop
- fix problem with goalgetters

### 0.11.1

- change some template settings, goalgetter table get headers,
  add object change sensing
- widget goalgetters: add parameter highlight and showonlyhighlight
- widget pivottable: add sort option and choice to place favorite teams on top
- remove year from date for several widgets

### 0.11.0

- extend table to calculate with x last games and extend table to calculate
  ranking for a defined gameday, to ensure backward compatibility i have to
  create a new table v3 widget
- extend table with trend sign (arrow up/down, point for no change)
- new widget goal getter ranking with sort function
- new widget pivot table of played games
- extend table modes with 1st round,2nd round

### 0.10.3

- change computing and output logic of gameday widget to mark gameday
  header with favorite class
- improve documentation with css-klasses for table widget
- bugfix for calculate gameday.

### 0.10.2

- Add data column goaldiff to table widget, improve more documentation
  (systax highlighting,copy code function), add example to
  control gameday with buttons,

### 0.10.1

- Improve documentation with more recipes and syntax highlighting,
  improve code to get and subscribe states

### 0.10.0

- New widget Table 2 that includes the calculation of the total, home and
  away results. the previous widget is now deprecated, due to the
  different datapoint (allmatches) to be selected.

### 0.9.3

- Remove ES6 features due to compatibility with older browsers

### 0.9.2

- next try to fix the experimental javascript binding function

### 0.9.1

- fix bugs in calculation matchresults and highlight clubs in favgames

### 0.9.0

- new Function for vis Binding to search for games at the actual day for
  favorite clubs, css-classes für games at actual day, fix bug to show
  the right match results,

### 0.8.0

- push version for latest repository. fix some typos. fix a problem with
  date handling on different OS

### 0.0.11

- widget gameday: fix issue with not working gamedaycount

### 0.0.10

- widget gameday: optional you can show informations about the goalgetters

### 0.0.9

- optional weekday for widgets: gameday and gamesoffavclub,highlight the
  clubname in gamesoffavclub

### 0.0.8

- new widget games of favorite clubs with multi league support as
  replacement for the old one

### 0.0.7

- close connections and remove observers (timeouts/intervals)

### 0.0.6

- NPM deployment and preperation for the latest repository

### 0.0.5

- highlight favorite club,
- Replacement value for edit mode if showgameday is set with binding,
- widget gameday setting for start gameday an length (-1,3 = show previous
  gameday and 3 gamedays after that)
- some documentation
- remove unused code
- new widget: next x games of club
- fix issue for dynamic with of club column

### 0.0.4

- fixed more oids in vis runtime

### 0.0.3

- fixed getting oids in vis runtime

### 0.0.2

- add controlable gameday logic to gameday widget and adapter

### 0.0.1

- initial release

## License

MIT License

Copyright (c) 2024 oweitman

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