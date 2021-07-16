---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.statistics/README.md
title: ioBroker.statistics
hash: 50F3oa1dUN0ZXS5QMiPgTULKjXr2Y6gjxR/q4zvXj1k=
---
![商标](../../../en/adapterref/iobroker.statistics/admin/statistics.png)

![安装数量](http://iobroker.live/badges/statistics-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.statistics.svg)
![下载](https://img.shields.io/npm/dm/iobroker.statistics.svg)

# IoBroker.statistics
![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.statistics/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/statistics/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

＃＃ 描述
此适配器将使统计信息的配置更容易。

`The adapter only reacts on state changes (state.ack=true), not on commands!`

从以下设置中选择：

*计数脉冲或开/关变化（仅适用于二进制值和上升沿）
* 从计数值计算成本（仅适用于二进制值）
* 状态为真/开多长时间，假/关多长时间（仅适用于二进制值）
* 记录的模拟值之间的增量（仅适用于模拟值）
* 每日最大值、最小值和平均值（不适用于增量计算）
* 全年最小/最大
* 在 5 分钟内计数以及每天的最大值、最小值和平均值（不适用于增量计算）
* 分组值的总和

适配器订阅配置的对象并在统计树中创建自己的状态。

创建了 2 个独立的树：

* `statistics.0.save` -> 时间范围的最终值
* `statistics.0.temp` -> 传输到保存时的临时值，然后 temp 再次启动

状态结构为：`statistics.0.{save|temp}.{kind of stat}.{original observed state}.{state of statistical value}`

可在此处获得德语 HowTo 文档：[howto_de](./doc/howto_de.md)

##设置
* 在实例配置页面指定相关组（admin => instances => statistics config）
* 在状态设置中指定配置（admin => objects）

<!-- 下一版本的占位符（在行首）：

### __工作进行中__ -->

## Changelog
### __WORK IN PROGRESS__
* (Apollon77) prepare for js-controller 3.3
* (Apollon77) make sure all tasks are processed to prevent missing objects
* (bluefox) added the support of Admin5 

### 1.0.4
* (foxthefox) changed the state change to BOTH positive and negative edges, hence it causes a lot of log entries

### 1.0.3 (2021-02-08)
* (Apollon77) fix from sentry crash reports

### 1.0.2 (2021-01-06)
* (foxthefox) try catch around the cronjobs

### 1.0.1 (2020-12-22)
* (Black-Thunder) Precision in rounding set to 4

### 1.0.0 (2020-05-01)
* (bluefox) Caught error if structure is invalid
* (bluefox) Added sentry
* adapter.getObjectView -> controller > 2.0

### 0.2.3 (2020-01-02)
* (HIRSCH-DE) bugfix main.js
* (foxthefox) delete messagehandler

### 0.2.2 (2019-06-29)
* (foxthefox) adapter logs a warning when invalid values arrive and cancels further processing

### 0.2.1 (2019-06-15)
* (foxthefox) correction, timecount value was milliseconds instead seconds
* (foxthefox) other calculations with 2 decimal places after comma
* (foxthefox) min/max for day/week/month/quarter/year
* (foxthefox) set of daily min/max starting point from actual value
* (foxthefox) fixing the PR with dayMin 0 at 00:00
* (foxthefox) improvement for timecount when receiving status updates and no real status change

### 0.2.0 (2019-01-08)
* (foxthefox) compact mode

### 0.1.4 (2019-01-07)
* (foxthefox) license added in io-package.json
* (foxthefox) ReadMe updated
* (foxthefox) type = misc-data

### 0.1.3 (2019-01-06)
* first npm release
* (foxthefox) german doc added
* (foxthefox) error corrections
* (foxthefox) travis testing corrections

### 0.1.2 (2018-09-08)
* (bluefox) total refactoring

### 0.0.3
* admin3 implemented
* complete rewrite to have configuration through the settings of the individual states instead in admin page

### 0.0.2
* setup running

### 0.0.1
* initial release

## License

The MIT License (MIT)

Copyright (c) 2018-2021 foxthefox <foxthefox@wysiwis.net>,

Copyright (c) 2018-2021 bluefox <dogafox@gmail.com>