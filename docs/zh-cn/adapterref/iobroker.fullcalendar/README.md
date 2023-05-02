---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fullcalendar/README.md
title: ioBroker.fullcalendar
hash: aK2B2glZDSol529TZiHY9yAAyRGwmFS9/XwsNgsuvEU=
---
![标识](../../../en/adapterref/iobroker.fullcalendar/admin/fullcalendar.png)

![安装数量](http://iobroker.live/badges/fullcalendar-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.fullcalendar.svg)
![下载](https://img.shields.io/npm/dm/iobroker.fullcalendar.svg)
![NPM](https://nodei.co/npm/iobroker.fullcalendar.png?downloads=true)

# IoBroker.fullcalendar
附有 [全日历](https://fullcalendar.io) 的时间表。

## 计划事件（控制您的设备）
您不得使用任何外部资源，日程安排仅在 ioBroker 中处理，不会与“谷歌日历”或“iTunes”等任何外部服务结合使用。

![例子](../../../en/adapterref/iobroker.fullcalendar/img/example.png)

您可以使用日历控制您的事件，并可以计划定期控制它们。

## 事件模拟
您可以记录您的行为并可以稍后回放。
例如，您可以为工作日和周末创建两个录音，并在相应的日期回放。

或者，您可以录制整个星期，并可以在接下来的几周外出时回放。

如何使用：

- 转到模拟选项卡
- 通过单击“+”按钮并选择模拟类型来创建新模拟：天或周
- 单击记录按钮并等待 24 小时或 7 天，直到模拟停止以记录事件
- 现在您可以通过单击播放按钮来重播模拟。此外，您可以定义模拟开始的时间。

＃＃ 去做
- 周和日必须滚动到当前时间

<!-- 下一个版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### 2.2.1 (2023-04-25)
* (bluefox) Corrected stop of the recording

### 2.2.0 (2023-04-24)
* (bluefox) Added simulation of events

### 2.0.8 (2023-03-24)
* (bluefox) Corrected vis-2 widgets

### 2.0.5 (2023-03-07)
* (bluefox) New material design
* (bluefox) License changed to MIT
* (bluefox) Allowed deletion of events

### 1.2.0 (2021-12-14)
* (bluefox) Updated to use with js-controller 3.3 and admin 5

### 1.1.0 (2020-01-12)
* (foxriver76) Updated to use with js-controller 2.x

### 1.0.0 (2019-11-17)
* (bluefox) Support of compact mode added

### 0.2.4 (2017-11-23)
* Translations

### 0.2.3 (2017-11-22)
* (bluefox) Fix interval settings
* (bluefox) Update fullcalendar library

### 0.2.1 (2017-09-25)
* (bluefox) Fixed error

### 0.2.0 (2017-08-06)
* (bluefox) Support of new admin

### 0.1.1 (2017-07-13)
* (bluefox) fix double event by creation

### 0.1.0 (2017-03-20)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017-2023 Bluefox <dogafox@gmail.com>

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