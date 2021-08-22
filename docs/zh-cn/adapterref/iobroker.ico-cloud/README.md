---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ico-cloud/README.md
title: ioBroker.ico-cloud
hash: NkYJmpTc3rSnGTP4LVoZo3My0JYFBLhfVXPPJtTD6Z8=
---
![标识](../../../en/adapterref/iobroker.ico-cloud/admin.ico-cloud.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.ico-cloud.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ico-cloud.svg)
![安装数量（最新）](https://iobroker.live/badges.ico-cloud-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges.ico-cloud-stable.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.ico-cloud.svg)
![新产品管理](https://nodei.co/npm/iobroker.ico-cloud.png?downloads=true)

# IoBroker.ico-cloud
**测试：** ![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.ico-cloud/workflows/Test%20and%20Release/badge.svg)

## IoBroker ico 适配器
ICO 池传感器（由 ondilo 提供）允许监控池中水的状态和温度，并建议采取的措施。

适配器连接到 Ondilo 云服务并检索所有测量值。

＃＃＃ 配置
您可以在设置中定义轮询间隔（以分钟为单位）。
也有必要在设置中启动登录过程。

### 归因
该适配器**不是**由 Ondilo 开发或拥有，而是由 ioBroker 社区开发或拥有。

ICO 和 Ondilo 的图标和名称是 Ondilo 的财产。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.0.5 (2021-07-30)
* (Garfonso) add necessary admin dependency.
* (Garfonso) Do not use unknown roles.

### 0.0.4 (2021-07-22)
* (Garfonso) change default poll interval to one hour, because it seems no more measurements are done.
* (Garfonso) fixed issue in polling

### 0.0.3 (2021-07-20)
* (Garfonso) Rename to ico-cloud

### 0.0.2 (2021-07-20)
* (Garfonso) initial release

## License
MIT License

Copyright (c) 2021 Garfonso <garfonso@mobo.info>

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