---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.homee/README.md
title: ioBroker homee 适配器
hash: UebqvVp7K22VBsbePxsF3E6xIrE8m0q27YxLhfpZWn0=
---
![标识](../../../en/adapterref/iobroker.homee/admin/homee.png)

![安装数量](http://iobroker.live/badges/homee-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.homee.svg)
![下载](https://img.shields.io/npm/dm/iobroker.homee.svg)

# IoBroker homee 适配器
![测试和发布](https://github.com/Apollon77/iobroker.homee/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/homee/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

＃＃ 描述
该适配器将 ioBroker 连接到 homee 并提供以下功能：

* 允许通过 IP 或 homee-ID 和用户名/密码进行连接
* 读取所有设备（节点）和状态（属性）并显示它们的值，包括 ioBroker 中的更新
* 允许更改 ioBroker 中的值并将它们发送回 homee 以控制设备
* 充当所有在 homee 中启用历史记录的状态设备的 ioBroker 历史记录提供程序。这意味着您可以使用存储在 homee 中的历史记录值在 ioBroker 中使用 flot、Admin 或 JavaScript 显示，包括数据级别的所有聚合，例如从历史适配器

不（还）支持：

* 组，因为它们不提供任何功能，例如在 homee 中一次对所有设备进行组级状态或真实写入
* 加热计划

该适配器基于 [stfnhmplr](http://twitter.com/stfnhmplr) 和他的 [homee-api](https://github.com/stfnhmplr/homee-api) 的杰出工作。

＃＃ 已知的问题
* 在 js-controller <1.5.0 上，在某些角色上启用其他历史记录提供程序时可能会产生奇怪的效果（例如“切换”）

## 如何报告问题和功能请求
请为此使用 GitHub 问题。

最好是将适配器设置为调试日志模式（实例 -> 专家模式 -> 列日志级别）。然后请从磁盘获取日志文件（ioBroker 安装目录中的子目录“log”，而不是从 Admin 获取，因为 Admin 截断了行）。如果您不喜欢在 GitHub 问题中提供它，您也可以通过电子邮件 (iobroker@fischer-ka.de) 将其发送给我。请添加对相关 GitHub 问题的引用，并描述我当时在日志中看到的内容。

## Changelog
### 1.2.0 (2021-08-01)
* (bluefox) Added admin5 support
* (Apollon77) Update to homee 2.33

### 1.1.1 (2021-04-10)
* (Apollon77) Update to homee 2.32

### 1.1.0 (2020-11-30)
* (Apollon77) Update to homee 2.30

### 1.0.7 (2020-06-12)
* (Apollon77) Fix Admin finally

### 1.0.6 (2020-06-12)
* (Apollon77) Fix Admin

### 1.0.5 (2020.04.12)
* (Apollon77) update homee lib to prevent a crash case

### 1.0.4 (2020.04.12)
* (Apollon77) fixes and optimizations
* (Apollon77) use js-controller 3.0 features if available 

### 1.0.2 (2020.03.22)
* (Apollon77) fixes and optimizations 

### 1.0.1 (2020.03.18)
* (Apollon77) fixes and optimizations 

### 1.0.0 (2020.03.13)
* (Seraphis411) fixed writing of HomeeMode
* (Seraphis411) bumped version of homee-api to 0.12.0 (no new features adopted)
* (Seraphis411) now support for nodejs 10 thanks to newer ws-library (^7.1.2) in homee-api
* (Apollon77) add sentry for error reporting
* (Apollon77) update homee api to 0.15.0

### 0.3.2 (2018.08.07)
* (Apollon77) corrected automatic role determination and added playing state for homeegrams

### 0.3.1 (2018.07.27)
* (Apollon77) Special handling for RGB values (delete objects and restart adapter)
* (Apollon77) Also allow enabling/disabling of Homeegrams (best delete objects unter Homee-0.Homeegrams!)
* (Apollon77) Optimize some roles, more Role feedback via Github issues please!

### 0.2.0 (2018.07.04)
* (Apollon77) Fix History logic (try) and add Homeegram support

### 0.1.1 (2018.07.04)
* (Apollon77) initial version

## License
The MIT License (MIT)

Copyright (c) 2018-2021 Apollon77 <iobroker@fischer-ka.de>

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