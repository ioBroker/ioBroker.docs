---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.scheduler/README.md
title: ioBroker 调度适配器
hash: 32jCsXKqdnXNCB4EKsz3xjm452DBZjh48kYgvIr3Mgc=
---
![标识](../../../en/adapterref/iobroker.scheduler/admin/scheduler.png)

![安装数量](http://iobroker.live/badges/scheduler-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.scheduler.svg)
![下载](https://img.shields.io/npm/dm/iobroker.scheduler.svg)
![新平台](https://nodei.co/npm/iobroker.scheduler.png?downloads=true)

# IoBroker 调度适配器
该适配器旨在按计划控制设备。例如，加热或浇水控制。

您可以创建具有不同优先级的配置文件：普通（例如工作日）、高（例如周末）和最高（例如节假日）。
优先级较高的配置文件会超过其他配置文件。

对于每个配置文件，都会创建活动变量。
但用户可以选择自己的激活变量，例如，控制假期。

用户应该将设备添加到配置文件中，并且配置文件中的所有设备都将设置为相同的值。

该适配器有 vis2 小部件。

![截屏](../../../en/adapterref/iobroker.scheduler/img/scheduler.png)

<!-- 下一版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### 1.3.2 (2024-04-05)
* (bluefox) Corrected widget errors
* (bluefox) Implemented custom types
* (bluefox) Added possibility to control devices on holidays

### 1.2.1 (2024-04-03)
* (bluefox) Added two options: "Ignore values if same as previous" and "Do not control if device already in desired state"
* (bluefox) Corrected 15-minute intervals
* (bluefox) GUI improvements for mobile view

### 1.1.14 (2024-04-02)
* (bluefox) Corrected widget and profile

### 1.1.12 (2024-03-13)
* (bluefox) Packages updated

### 1.1.10 (2023-10-19)
* (bluefox) Packages updated

### 1.1.9 (2023-06-28)
* (bluefox) Packages updated

### 1.1.7 (2023-03-24)
* (bluefox) Worked on the build process

### 1.1.6 (2023-03-14)
* (bluefox) update packages

### 1.1.4 (2023-03-06)
* (bluefox) Tried to fix vis-2 widget

### 1.1.3 (2023-03-06)
* (bluefox) Added widget for vis-2

### 1.0.4 (2022-12-23)
* (bluefox) Updated GUI packages

### 1.0.3 (2022-06-22)
* (bluefox) Made it work with ioBroker cloud

### 1.0.2 (2022-06-20)
* (bluefox) Corrected the problem with `socket.io`

### 1.0.1 (2022-06-20)
* (bluefox) Allowed working behind reverse proxy

### 1.0.0 (2022-03-22)
* (bluefox) GUI migrated to material@5

### 0.1.3 (2022-03-22)
* (bluefox) Just the packages were updated

### 0.1.2 (2021-09-14)
* (bluefox) "Sentry" was added

### 0.1.1 (2021-09-13)
* (bluefox) Initial release

### 0.1.0 (2021-05-19)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2021-2024 bluefox <dogafox@gmail.com>

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