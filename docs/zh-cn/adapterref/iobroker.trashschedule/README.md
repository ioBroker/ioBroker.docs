---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.trashschedule.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.trashschedule.svg
BADGE-Stable: http://iobroker.live/badges/trashschedule-stable.svg
BADGE-installed: http://iobroker.live/badges/trashschedule-installed.svg
BADGE-Dependency Status: https://img.shields.io/david/klein0r/iobroker.trashschedule.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/klein0r/ioBroker.trashschedule/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.trashschedule.png?downloads=true
chapters: {"pages":{"en/adapterref/iobroker.trashschedule/README.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/README.md"},"en/adapterref/iobroker.trashschedule/blockly.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/blockly.md"},"en/adapterref/iobroker.trashschedule/faq.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.trashschedule/faq.md"}}}
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.trashschedule/README.md
title: ioBroker.trashschedule
hash: OmCAF9tPfHiplklRPb7FKvn4Qz4gOvgnuqybiVaWIiE=
---
![商标](../../../en/adapterref/iobroker.trashschedule/../../admin/trashschedule.png)

# IoBroker.trashschedule
## 前提条件
1. 创建 **ical 适配器** 的新实例
2.配置你的日历的网址（例如谷歌日历）
3. 将“预览天数”设置为包含每种垃圾类型至少两次的范围（例如 30 天）
4. 如果您使用“事件”选项卡，请确保启用每个事件类型的“显示”复选框，这也应在您的垃圾计划中使用（否则该事件将被 ical 实例隐藏）

![标准的](../../../en/adapterref/iobroker.trashschedule/./img/ical.png)

＃＃ 配置
1.创建一个```trashschedule```实例并选择ical实例作为源
2. 转到垃圾类型选项卡并添加与垃圾类型一样多的类型
3. 为每个新的垃圾类型定义一个名称并配置匹配的事件
4.启动实例

**问题？**检查[常问问题](./faq.md)

![垃圾时间表](../../../en/adapterref/iobroker.trashschedule/./img/trashschedule.png)

![垃圾计划类型](../../../en/adapterref/iobroker.trashschedule/./img/trashschedule_types.png)

## 可见小部件
![可见小部件](../../../en/adapterref/iobroker.trashschedule/./img/vis.png)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.4.3 (2022-02-21)

* (klein0r) Updated state roles
* (klein0r) Added hint for Admin 4 configuration

### 1.4.2 (2022-02-07)

* (klein0r) Added check for ical configuration

### 1.4.1 (2021-12-23)

* (klein0r) Updated dependencies

### 1.4.0 (2021-12-10)

* (klein0r) Allow to hide "not found" warnings for single trash types (like christmas tree pickup)
* (klein0r) Added limit option for VIS widget
* (klein0r) Added option for VIS widget to hide the name

### 1.3.6 (2021-11-24)

* (klein0r) Require new version for translated instance objects
* (klein0r) Fixed timeout issues

### 1.3.5 (2021-11-15)

* (klein0r) Added checks for calendar description

### 1.3.4 (2021-11-14)

* (klein0r) Translated all objects

### 1.3.3 (2021-11-13)

* (klein0r) Translated admin table headers

### 1.3.2 (2021-11-07)

* (klein0r) Fixed missing VIS widget

### 1.3.1 (2021-11-06)

* (klein0r) Fixed missing translations

### 1.3.0 (2021-11-05)

* (klein0r) Admin 5 Support

### 1.2.0 (2021-07-16)

* (klein0r) Added compatibility with iCal 1.10.0
* (klein0r) Added color of type to channel object

### 1.1.3 (2021-05-02)

* (klein0r) Fixed weekday state type (string -> number)

### 1.1.2 (2021-03-15)

* (klein0r) Nodejs 12 required

### 1.1.1 (2021-02-24)

* (klein0r) Ignore trash types with empty match pattern
* (klein0r) Added log message if the match pattern contains leading or trailing whitespaces

### 1.1.0 (2021-01-25)

* (klein0r) Just allow clean trash type names **(BREAKING CHANGE - CHECK YOUR SCRIPTS AND VIS)**

### 1.0.6 (2021-01-24)

* (klein0r) Fixed async object creation

### 1.0.5 (2021-01-24)

* (klein0r) Added automatic refresh every full hour

### 1.0.4 (2021-01-22)

* (klein0r) Delete unsed states

### 1.0.3 (2020-11-10)

* (klein0r) Improved VIS widget options

### 1.0.2 (2020-11-10)

* (klein0r) Added color picker
* (klein0r) Fixed null reference exception

### 1.0.1 (2020-11-07)

* (klein0r) Fixed date calculation issue in VIS

### 1.0.0 (2020-11-06)

* (klein0r) Renamed data types **(BREAKING CHANGE - CHECK YOUR SCRIPTS AND VIS)**
* (klein0r) First **stable** release
* (klein0r) Added iobroker sentry

### 0.0.11 (2020-08-11)

* (klein0r) Better error reporting

### 0.0.10 (2020-07-22)

* (klein0r) Added CSS classes for easier customization
* (klein0r) Added optional glow on due date for vis widget

### 0.0.9 (2020-05-23)

* (klein0r) Fixed color correction calculation issue

### 0.0.8 (2020-05-15)

* (klein0r) Fixed missing VIS translations

### 0.0.7 (2020-05-13)

* (klein0r) Improved logging
* (klein0r) Several fixes, improved admin and vis (automatic color correction, resizeable widget)
* (ivosch68) Reset of states if no event matches

### 0.0.6 (2020-05-13)

* (klein0r) updated dependencies

### 0.0.5 (2020-03-07)

* (klein0r) added pickup dates after next date

### 0.0.4 (2020-03-07)

* (klein0r) added VIS templates

### 0.0.3 (2020-02-26)

* (klein0r) fixed issue with events after time change date

### 0.0.2 (2019-11-26)

* (klein0r) added global offset in days
* (klein0r) added exact match for types

### 0.0.1 (2019-11-24)

* (klein0r) initial release

## License

MIT License

Copyright (c) 2022 Matthias Kleine <info@haus-automatisierung.com>

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