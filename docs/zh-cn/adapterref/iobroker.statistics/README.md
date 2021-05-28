---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.statistics/README.md
title: ioBroker.statistics
hash: AuaRcz6l0S7OYjP7Y0x2/PW7EwSI1OhFRue1IYG3Nj4=
---
![商标](../../../en/adapterref/iobroker.statistics/admin/statistics.png)

![安装数量](http://iobroker.live/badges/statistics-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.statistics.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.statistics.svg)
![建置状态](https://travis-ci.org/iobroker-community-adapters/ioBroker.statistics.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.statistics.png?downloads=true)

＃ioBroker.statistics
＃＃ 描述
该适配器将使统计信息的配置更加容易。

`The adapter only reacts on state changes (state.ack=true), not on commands!`

从以下设置中选择：

*计算脉冲或开/关变化（仅适用于二进制值和上升沿）
*根据计数值计算成本（仅适用于二进制值）
*状态为true / ON多长时间，为false / OFF多长时间（仅适用于二进制值）
*记录的模拟值之间的增量（仅适用于模拟值）
*每日最大，最小和平均值（不适用于增量计算）
*一年中的最小值/最大值
*在5分钟内以及每天的最大值，最小值和平均值之内计数（不适用于增量计算）
*分组值的总和

适配器订阅已配置的对象，并在统计树中创建自己的状态。

将创建2个单独的树：

*`statistics.0.save`->时间范围的最终值
*`statistics.0.temp`->临时值，直到传输保存为止，然后temp重新开始

状态的结构为：`statistics.0.{save|temp}.{kind of stat}.{original observed state}.{state of statistical value}`

此处提供德语HowTo文档：[howto_de](./doc/howto_de.md)

##设置
*在实例配置页面中指定相关组（管理员=>实例=>统计信息配置）
*在状态设置中指定配置（admin =>对象）

<！-下一个版本的占位符（在该行的开头）：

### __正在进行的工程__->

## Changelog
### __WORK IN PROGRESS__
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