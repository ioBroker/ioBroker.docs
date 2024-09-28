---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.openligadb/README.md
title: ioBroker 适配器从 OpenLigaDB 获取足球比赛结果
hash: L8JqNHp9+kP3AV+a34oxU+7KfFAaJ1BsFpfNqgZSmpM=
---
![标识](../../../en/adapterref/iobroker.openligadb/admin/openligadb_n.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.openligadb.svg)
![下载](https://img.shields.io/npm/dm/iobroker.openligadb.svg)
![安装数量](https://iobroker.live/badges/openligadb-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/openligadb-stable.svg)
![新平台](https://nodei.co/npm/iobroker.openligadb.png?downloads=true)

# IoBroker 适配器从 OpenLigaDB 获取足球比赛结果
＃＃ 概述
用于从 `openligadb.de` 请求足球或其他游戏比赛数据的适配器

＃＃ 配置
添加适配器的实例并单击扳手符号。在表单中，您可以添加来自联赛和赛季的快捷方式。
请访问`openligadb.de`了解可用的联赛、赛季和快捷方式。如果一个赛季跨越两年，请仅输入开始年份。

1. 德国联赛的示例数据为`shortcut = bl1 season = 2023`

如果您保存并关闭了配置，不久之后就一定会出现您的联赛和赛季的新数据点。

## Vis 和小部件
实际上有 5 个小部件可用。请在小部件过滤器中输入 openligadb

### 表 v4
这个小部件显示你的联赛的实际排名

### 可透视 v2
此小部件显示数据透视表中的所有结果

### 目标达成者 v2
这个小部件显示本赛季的进球者

### 比赛日
实际或选定比赛日的所有比赛。有许多小部件属性可以配置显示的数据量

### 最喜爱的俱乐部的比赛
显示您最喜爱的俱乐部的所有当前或未来比赛

vis-widgets 的文档可以在 vis 或[Widget 文档/德语](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.openligadb/blob/master/widgets/openligadb/doc.html) 中找到

## `sendTo` 命令
###`getMatchData`
按联盟、赛季和时间范围从 OpenLigaDB 请求数据。

#### 强制参数
| `Parameter` | `Example` | `Type` | `Description` |
| `league` | `bl1` | `string` | `identifier of the league, see openlogadb` |
| `season` | `2024` | `string` | `name of the season, see openlogadb` |
| `datefrom` | `2024-09-01T00:00` | `string` | `date in ISO notation` |
| `datetill` | `2024-09-10T00:00` | `string` | `date in ISO notation` |
| `datetill` | `2024-09-10T00:00` | `string` | `ISO 符号中的日期` |

＃＃＃＃ 例子
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

待办事项
- 如果用户没有选择正确的数据点，则在小部件中进行验证
- ~~翻译~~
- ~~新小部件数据透视表和 goalgetters 的文档~~
- ~~扩展桌面模式，增加第一轮、第二轮~~
- ~~已玩过的游戏的新小部件数据透视表~~
- ~~新的小部件目标获取器排名，具有排序功能~~
- ~~用趋势符号扩展表格（向上/向下箭头，指向无变化）~~
- ~~扩展表格以计算最后 x 场比赛~~
- ~~扩展表格以计算特定比赛日的排名~~
- ~~文档适配器/小部件~~
- ~~修复俱乐部栏目动态问题~~
- ~~新小部件：俱乐部的下 x 场比赛~~
- ~~widget gameday 设置开始比赛日的长度 (-1,3 = 显示上一个

比赛日和之后的 3 个比赛日）~~

- ~~如果 showgameday 设置了绑定，则替换编辑模式的值~~
- ~~突出显示最喜欢的俱乐部~~
- ~~在比赛日小部件中可控制比赛日~~

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