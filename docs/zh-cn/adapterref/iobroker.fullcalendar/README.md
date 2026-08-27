---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fullcalendar/README.md
title: ioBroker.fullcalendar
hash: PipFNCmfF+NjqxglcGPuDRBSPI+4S6MBNoM0fQTqzqU=
---
![标识](../../../en/adapterref/iobroker.fullcalendar/admin/fullcalendar.png)

![安装数量](http://iobroker.live/badges/fullcalendar-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.fullcalendar.svg)
![下载](https://img.shields.io/npm/dm/iobroker.fullcalendar.svg)
![NPM](https://nodei.co/npm/iobroker.fullcalendar.png?downloads=true)

# IoBroker.fullcalendar
带有 [完整日历](https://fullcalendar.io) 的日程表。

## 计划活动（控制您的设备）
您不得使用任何外部资源，日程安排仅在 ioBroker 中处理，不会与任何外部服务（如“谷歌日历”或“iTunes”）结合使用。

![例子](../../../en/adapterref/iobroker.fullcalendar/img/example.png)

您可以使用日历来管理您的事件，并可以计划定期管理它们。

## 事件模拟
您可以录制自己的行为，并稍后回放。

例如，您可以分别录制工作日和周末的行为，并在相应日期回放。

或者你可以录制整周的内容，然后在你外出期间的接下来几周回放。

使用方法：

- 转到模拟选项卡
- 点击“+”按钮创建新的模拟，然后选择模拟类型：日或周。
- 点击录制按钮，等待 24 小时或 7 天，直到模拟停止，即可录制事件。
现在您可以点击播放按钮重播模拟过程。此外，您还可以设置模拟开始的时间。

## 待办事项
- 周和日期必须滚动到当前时间

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### **WORK IN PROGRESS**
* (bluefox) Migrated GUI to vite

### 2.4.5 (2024-09-09)
* (bluefox) Corrected SelectID Dialog

### 2.4.4 (2024-09-09)
* (bluefox) Removed withStyles package

### 2.3.17 (2024-05-26)
* (bluefox) Corrected the simulation

### 2.3.16 (2024-05-25)
* (bluefox) Small UI fixes on widget

### 2.3.10 (2024-05-22)
* (bluefox) Small UI fixes

### 2.3.9 (2024-05-20)
* (bluefox) Corrected vis-2 widget

### 2.3.4 (2023-11-28)
* (bluefox) Corrected monthly events

### 2.3.1 (2023-11-27)
* (bluefox) Packages were updated
* (bluefox) Corrected vis-2 widget

### 2.2.6 (2023-07-27)
* (bluefox) Compatibility with vis-2

### 2.2.2 (2023-06-19)
* (bluefox) Corrected stop of the recording

### 2.2.0 (2023-04-24)
* (bluefox) Added simulation of events

### 2.0.8 (2023-03-24)
* (bluefox) Corrected vis-2 widgets

### 2.0.5 (2023-03-07)
* (bluefox) New material design added
* (bluefox) License changed to MIT
* (bluefox) Allowed deletion of events

### 1.2.0 (2021-12-14)
* (bluefox) Updated to use with js-controller 3.3 and admin 5

### 1.1.0 (2020-01-12)
* (foxriver76) Updated to use with js-controller 2.x

### 1.0.0 (2019-11-17)
* (bluefox) Support for compact mode is added

### 0.2.4 (2017-11-23)
* Translations

### 0.2.3 (2017-11-22)
* (bluefox) Fixed interval settings
* (bluefox) Update fullcalendar library

### 0.2.1 (2017-09-25)
* (bluefox) Fixed error

### 0.2.0 (2017-08-06)
* (bluefox) Support for new admin

### 0.1.1 (2017-07-13)
* (bluefox) Fixed double event by creation

### 0.1.0 (2017-03-20)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017-2026 Bluefox <dogafox@gmail.com>

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