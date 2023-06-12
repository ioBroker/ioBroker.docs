---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.countdown/README.md
title: ioBroker.倒计时
hash: xHWJ07rn8dUEqgl2AAfmDDdyTyc480/5uVKlpqzD2to=
---
![标识](../../../en/adapterref/iobroker.countdown/admin/countdown.png)

![绿卫徽章](https://snyk.io/test/github/jack-blackson/ioBroker.countdown/badge.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.countdown.svg)
![下载](https://img.shields.io/npm/dm/iobroker.countdown.svg)
![安装数量](http://iobroker.live/badges/countdown-stable.svg)
![NPM](https://nodei.co/npm/iobroker.countdown.png?downloads=true)

# IoBroker.倒计时
[![Travis 构建状态](https://travis-ci.com/jack-blackson/ioBroker.countdown.svg?branch=master)](https://travis-ci.com/jack-blackson/ioBroker.countdown) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/countdown/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用哨兵库自动向开发人员报告异常和代码错误。**有关更多详细信息和如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

ioBroker 的倒计时适配器-------------------------------------------- ------------------------------

该适配器的目标是为您提供对未来事件进行倒计时的可能性，包括年、月、日、小时和分钟。它将分别为您提供这些值中的每一个，以及两个带有日期的短版本和长版本的字符串。

## 显示倒计时
适配器会自动为您提供一个 json 表和一个 HTML 表。对于 json，请选择小部件“basic-table”。对于 html，选择“基本 - 字符串（未转义）”之一。

可以显示短文本或长文本。
![标识](../../../en/adapterref/iobroker.countdown/admin/countdown_json.png)

## 如何创建倒计时
有两种设置倒计时的方法：

* 您可以在适配器设置中的“创建倒计时”选项卡中创建倒计时。
* 您可以在设备“设置”中创建手动状态。对象的名称是警报名称，值将是日期。日期需要采用“DD.MM.YYYY HH:mm:ss”格式。
* 您可以使用 sendto 创建闹钟。在那里，您可以发送组件（至少是年月日）或日期字符串。对于日期字符串，您可以在适配器的设置中调整格式。

![标识](../../../en/adapterref/iobroker.countdown/admin/countdown_blocky.png)

* 您可以使用 sendto 添加日期、月份和年份到今天的日期。因此，请发送组件“name”和“addminutes”、“addhours”、“adddays”、“addmonths”或“addyears”作为 int 值。

![标识](../../../en/adapterref/iobroker.countdown/admin/countdown_blocky_add.png)

## 如何删除倒计时
您可以使用 sendto 删除倒计时。因此，只需将带有 sendto 的名称发送到适配器，倒计时将自动删除。

## 重复倒计时
如果您希望在规定的时间段内重复倒计时（例如，您不能每年为您的婚礼倒计时），您也可以使用此适配器执行此操作。因此，要么在适配器的设置中填写“重复周期”字段，要么在创建类型为“日期”的倒计时时在日期之后添加周期。对于应该在 2020 年 4 月 1 日结束并每年重复的倒计时，sendTo 看起来像这样：

sendTo("countdown.0", "send", { "name": 'Wedding Day', "date": '01.04.2020 00:01+1Y' });

这里的参数是：

* Y：年
* M：月
* D：天数
* H：小时
* m：分钟

## 可用输出
|数据类型|描述|
|:---:|:---:|
|分钟|倒计时结束前的分钟数（不是总数！）|
|小时|倒计时结束前的小时数（不是总计！）|
|天|倒计时结束前的天数（不是总天数！）|
|月|倒计时结束前的月数（不是总数！）|
|years|倒计时结束前的年数（不是总数！）|
|名称|倒计时名称|
|endDate|倒计时的结束日期 - 格式与定义的设置相同|
|inWordsShort|分钟、小时...的组合值 - 例如1年5月4天|
|inWordsLong|分钟、小时...的组合值 - 例如1年5个月4天|
|totalHours|总人数到结束日期的小时数|
|totalDays|总人数到结束日期的天数|
|totalWeeks|总人数到结束日期的周数|
|totalMonths|总数到结束日期的月数|
|totalYears|总人数到结束日期的年数|

|reached|定义是否达到结束日期的布尔字段|
|repeatEvery|倒计时在到达结束日期后按此时间段重复|

## 要添加的功能
* 可以添加脚本作为参数并在倒计时结束时启动它
* 在 addminutes 和其他添加函数中使用加号和减号的可能性

## Changelog

### 2.0.1 (2023-05-24) 
* (jack-blackson) Added objects for total number of months and years

### 2.0.0 (2023-05-07) 
* (jack-blackson) Reworked adapter due to wrong process layout
* (jack-blackson) Added headers for HTML and JSON

### 1.3.1 (2023-05-01) 
* (jack-blackson) Bugfix date calculation (thanks to Lueghi for the hint)

### 1.3.0 (2023-02-22) 
* (jack-blackson) Updates for dependencies

### 1.2.5 (2021-06-16) 
* (jack-blackson) Bugfix to delete countdown with sendto

### 1.2.4 (2021-06-09) 
* (jack-blackson) Small bugfixes, translations

### 1.2.3 (2021-05-27) 
* (jack-blackson) Small bugfixes, translations

### 1.2.2 (2021-05-25) 
* (jack-blackson) Small bugfixes, added weblate for translations

### 1.2.1 (2021-05-09) 
* (jack-blackson) Small Bugfixes

### 1.2.0 (2021-05-09) 
* (jack-blackson) Updated packages, added Sentry
* (jack-blackson) Fixes for JS-controller 3.3
* (jack-blackson) Fix that countdowns are created immediatly


### 1.1.0 (2020-04-02) 
* (jack-blackson) bugfix Read-Me link
* (jack-blackson) bugfix repeatCycle

### 1.0.9 (2020-03-31)
* (jack-blackson) Bugfix log messages

### 1.0.8 (2020-03-31)
* (jack-blackson) Repeat countdown in defined period (e.g. every year)

### 1.0.7 (2020-03-30)
* (jack-blackson) Added new date-type for settings: YYYY-MM-DD
* (jack-blackson) Add countdown directly in adapter settings

### 1.0.6 (2020-03-20)
* (DutchmanNL) Fixed adapter type

### 1.0.5 (2020-02-05)
* (jack-blackson) Bugfix for alarm at midnight -> thanks to @Lueghi

### 1.0.4 (2019-08-25)
* (jack-blackson) Reordered release infos

### 1.0.3 (2019-08-10)
* (jack-blackson) Changes for Compact Mode
* (jack-blackson) Various bugfixes
* (jack-blackson) Having multiple instances of the adapater are now possible

### 1.0.2 (2019-07-22)
* (jack-blackson) Release version

### 0.7.0 (2019-07-07)
* (jack-blackson) Bugfixes
* (jack-blackson) addminutes and addhours are now also possible
* (jack-blackson) datapoint in setup is now editable
* (jack-blackson) added total no. of weeks

### 0.6.0 (2019-07-06)
* (jack-blackson) adjustable date format for input and output
* (jack-blackson) delete countdowns with sendto
* (jack-blackson) ability to add countdowns by "days/months/weeks from now)

### 0.5.0 (2019-07-04)
* (jack-blackson) adjust the data in the table
* (jack-blackson) bugfix date import 

### 0.4.0 (2019-06-04)
* (jack-blackson) restructuring - creation of alarms with sendto or manually with datapoint is now possible

### 0.3.0 (2019-05-24)
* (jack-blackson) added total No. of days and hours

### 0.2.0 (2019-05-21)
* (jack-blackson) adjusted packages

### 0.1.0 (2019-04-29)
* (jack-blackson) initial version

## License
The MIT License (MIT)

Copyright (c) 2019-2023 jack-blackson <blacksonj7@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.