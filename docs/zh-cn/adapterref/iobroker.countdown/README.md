---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.countdown/README.md
title: ioBroker.countdown
hash: dETjBmfzNc9wIRecCRd+xFOUle+ySHlM2PoOBFXnRJg=
---
![商标](../../../en/adapterref/iobroker.countdown/admin/countdown.png)

![绿色守护者徽章](https://snyk.io/test/github/jack-blackson/ioBroker.countdown/badge.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.countdown.svg)
![下载](https://img.shields.io/npm/dm/iobroker.countdown.svg)
![安装数量](http://iobroker.live/badges/countdown-stable.svg)
![新产品管理](https://nodei.co/npm/iobroker.countdown.png?downloads=true)

# IoBroker.countdown
[![构建状态 Travis](https://travis-ci.com/jack-blackson/ioBroker.countdown.svg?branch=master)](https://travis-ci.com/jack-blackson/ioBroker.countdown) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/countdown/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

ioBroker 倒计时适配器---------------------------------------------- --------------------------------

该适配器的目标是为您提供对未来事件进行倒计时的可能性，包括年、月、日、小时和分钟。它将分别为您提供这些 valies 中的每一个，以及带有日期的短版本和长版本的两个字符串。

## 显示倒计时
适配器自动为您提供一个 json 表。您只需要将它与 json 表一起使用即可。请在那里勾选“无标题”。可以显示短文本或长文本。
![商标](../../../en/adapterref/iobroker.countdown/admin/countdown_json.png)

## 如何创建倒计时
有两种设置倒计时的方法：

* 您可以在适配器设置中的“创建倒计时”选项卡中创建倒计时。
* 您可以在设备“设置”中创建手动状态。对象的名称是警报名称，值将是日期。日期必须采用“DD.MM.YYYY HH:mm:ss”格式。
*您可以使用sendto创建警报。在那里，您可以发送组件（最低为年月日）或日期字符串。对于日期字符串，您可以在适配器设置中调整格式。

![商标](../../../en/adapterref/iobroker.countdown/admin/countdown_blocky.png)

* 您可以使用 sendto 将日期、月份和年份添加到今天的日期。因此，请将组件“name”和“addminutes”、“addhours”、“adddays”、“addmonths”或“addyears”作为整数值发送。

![商标](../../../en/adapterref/iobroker.countdown/admin/countdown_blocky_add.png)

##如何删除倒计时
您可以使用 sendto 删除倒计时。因此，只需将带有 sendto 的名称发送到适配器，倒计时将被自动删除。

##重复倒计时
如果您希望在规定的时间段内重复倒计时（例如，您不能每年为您的婚礼日倒计时），您也可以使用此适配器执行此操作。因此，要么在适配器的设置中填写“重复周期”字段，要么在创建类型为“日期”的倒计时时在日期之后添加周期。一个 sendTo 看起来像倒计时，它应该在 2020 年 4 月 1 日结束并每年重复：

sendTo("countdown.0", "send", { "name": 'Wedding Day', "date": '01.04.2020 00:01+1Y' });

这里的参数是：

* Y：年
* M：月
* D：天
* H：小时
* m：分钟

## 可用输出
|数据类型|说明|
|:---:|:---:|
|分钟|倒计时结束前的分钟数（不是总数！）|
|小时|倒计时结束前的小时数（不是总数！）|
|天|距离倒计时结束的天数（不是总数！）|
|月|距倒计时结束的月数（不是总数！）|
|年|倒计时结束前的年数（不是总数！）|
|名称|倒计时名称|
|endDate|倒计时的结束日期 - 格式与定义的设置相同|
|inWordsShort|分钟、小时、...的组合值 - 例如1Y 5M 4D|
|inWordsLong|分钟、小时、...的组合值 - 例如1年5个月4天|
|totalHours|到结束日期的总小时数|
|totalDays|距结束日期的总天数|
|totalWeeks|到结束日期的总周数|
|reached|定义是否到达结束日期的布尔字段|
|repeatEvery|在到达结束日期后按此周期重复倒计时|

##要添加的功能
* 可以添加脚本作为参数并在倒计时结束时启动它
* 可以在 addminutes 和其他 add 函数中使用加号和减号

## 1.2.5 (2021-06-16)
* (jack-blackson) 修正使用 sendto 删除倒计时

## 1.2.4 (2021-06-09)
* (jack-blackson) 小错误修正、翻译

## 1.2.3 (2021-05-27)
* (jack-blackson) 小错误修正、翻译

## 1.2.2 (2021-05-25)
* (jack-blackson) 小错误修正，添加了用于翻译的 weblate

## 1.2.1 (2021-05-09)
* (jack-blackson) 小错误修正

## 1.2.0 (2021-05-09)
* (jack-blackson) 更新包，添加哨兵
* (jack-blackson) 修复了 JS 控制器 3.3
* (jack-blackson) 修复立即创建倒计时

## 1.1.0 (2020-04-02)
* (jack-blackson) 错误修正自述链接
* (jack-blackson) 错误修正 repeatCycle

## 1.0.9 (2020-03-31)
* (jack-blackson) 修正日志消息

## 1.0.8 (2020-03-31)
* (jack-blackson) 在定义的时间段内重复倒计时（例如每年）

## 1.0.7 (2020-03-30)
* (jack-blackson) 为设置添加了新的日期类型：YYYY-MM-DD
* (jack-blackson) 直接在适配器设置中添加倒计时

## 1.0.6 (2020-03-20)
* (DutchmanNL) 固定适配器类型

## 1.0.5 (2020-02-05)
* (jack-blackson) 午夜闹钟修正 -> 感谢@Lueghi

## 1.0.4 (2019-08-25)
* (jack-blackson) 重新排序的发布信息

## 1.0.3 (2019-08-10)
* (jack-blackson) 紧凑模式的变化
* (jack-blackson) 各种错误修正
* (jack-blackson) 现在可以拥有多个适配器实例

## 1.0.2 (2019-07-22)
* (jack-blackson) 发布版本

## 0.7.0 (2019-07-07)
*（杰克布莱克森）错误修正
* (jack-blackson) addminutes 和 addhours 现在也是可能的
* (jack-blackson) 设置中的数据点现在是可编辑的
* (jack-blackson) 添加总数。数周

## 0.6.0 (2019-07-06)
* (jack-blackson) 输入和输出的可调日期格式
* (jack-blackson) 使用 sendto 删除倒计时
*（杰克-布莱克森）能够按“从现在起的天/月/周”添加倒计时）

## 0.5.0 (2019-07-04)
* (jack-blackson) 调整表格中的数据
* (jack-blackson) 修正日期导入

### 0.4.0 (2019-06-04)
* (jack-blackson) 重组 - 现在可以使用 sendto 或手动使用数据点创建警报

### 0.3.0 (2019-05-24)
* (jack-blackson) 添加总天数和小时数

### 0.2.0 (2019-05-21)
* (jack-blackson) 调整包

### 0.1.0 (2019-04-29)
* (jack-blackson) 初始版本

## Changelog

## License
The MIT License (MIT)

Copyright (c) 2019-2021 jack-blackson <blacksonj7@gmail.com>

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