---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.rfxcom/README.md
title: ioBroker.rfxcom
hash: sHn5GJunDJU2gCzbWU1P920vRVUfOaaV3gTF/zyrpN4=
---
![商标](../../../en/adapterref/iobroker.rfxcom/admin/rfxcom.png)

![安装数量](http://iobroker.live/badges/rfxcom-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.rfxcom.svg)
![下载](https://img.shields.io/npm/dm/iobroker.rfxcom.svg)

# IoBroker.rfxcom
![测试和发布](https://github.com/ioBroker/ioBroker.rfxcom/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/rfxcom/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

此适配器与 [rfxcom](http://www.rfxcom.com) 通信。
用于接收来自天气传感器和无线电源开关的数据。

阅读 RfxCom 的详细文档[这里](http://www.rfxcom.com/WebRoot/StoreNL2/Shops/78165469/MediaGallery/Downloads/RFXtrx_User_Guide.pdf)

＃＃ 用法
要启用传感器的学习，您必须激活“包含模式”。
默认情况下，包含模式将启用 5 分钟（300000 毫秒），5 分钟后将自动禁用。

要永久启用包含模式，只需将“包含超时”设置为 0。

＃＃ 一对
每次更换电池时，设备都会获得新地址。

所以更换电池后必须重新学习。

为此，请在插入电池之前按下配对按钮，设备将获知新地址。

＃＃ 去做
**目前仅支持尚飞、Curtain 和 Lighting3 设备。**

<!-- 下一个版本的占位符（在行首）：

### __工作进行中__ -->

## Changelog
### 2.0.1 (2021-06-29)
* (peterbaumert) update packages
* (bluefox) Breaking change: no linux with 32 bit support

### 1.0.1 (2020-08-05)
* (bluefox) Compact mode
* (bluefox) Support of node 10 added
* (bluefox) Refactoring

### 0.1.0 (2016-07-05)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017-2021, Bluefox<dogafox@gmail.com>

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