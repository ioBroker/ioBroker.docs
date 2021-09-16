---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.scheduler/README.md
title: ioBroker 调度器适配器
hash: QHoQGGa7+9V8FkiMRFpKl7sC/fM/puwAoX3uZcQmZ0s=
---
![标识](../../../en/adapterref/iobroker.scheduler/admin/scheduler.png)

![安装数量](http://iobroker.live/badges/scheduler-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.scheduler.svg)
![下载](https://img.shields.io/npm/dm/iobroker.scheduler.svg)
![新产品管理](https://nodei.co/npm/iobroker.scheduler.png?downloads=true)

# IoBroker 调度器适配器
此适配器旨在按计划控制设备。例如，加热或浇水控制。

您可以创建具有不同优先级的配置文件：正常（例如工作日）、高（例如周末）和最高（例如假期）。
具有较高优先级的配置文件会使其他配置文件过载。

将为每个配置文件创建活动变量。但是用户可以选择自己的激活变量，例如控制假期。

用户应将设备添加到配置文件中，配置文件中的所有设备都将设置为相同的值。

![截屏](../../../en/adapterref/iobroker.scheduler/img/scheduler.png)

<!-- 下一版本的占位符（在行首）：

### __工作进行中__ -->

## Changelog
### 0.1.2 (2021-09-14)
* (bluefox) "Sentry" was added
 
### 0.1.1 (2021-09-13)
* (bluefox) Initial release

### 0.1.0 (2021-05-19)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2021 bluefox <dogafox@gmail.com>

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