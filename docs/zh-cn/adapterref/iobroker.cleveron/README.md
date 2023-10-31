---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.cleveron/README.md
title: ioBroker.cleveron
hash: ZdX4n+yZzwVaMBMK2iEtBI3LMOuDepoVMQfUVe5/uXU=
---
![标识](../../../en/adapterref/iobroker.cleveron/admin/cleveron.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.cleveron.svg)
![下载](https://img.shields.io/npm/dm/iobroker.cleveron.svg)
![安装数量](https://iobroker.live/badges/cleveron-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/cleveron-stable.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.cleveron.svg)
![国家公共管理](https://nodei.co/npm/iobroker.cleveron.png?downloads=true)

# IoBroker.cleveron
**测试：** ![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.cleveron/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 smarton 适配器
该适配器从 CLEVERON - API (<https://www.cleveron.ch>) 检索数据

＃＃ 用法
- 你只需要你的 smarton 登录数据。
- 适配器获取所有建筑物、房间和设备 - 由 smarton API 提供的数据。

- 添加所需的轮询 - 以分钟为单位的间隔。

- 如果您添加了新设备、房间或家庭，或者更改了任何设置，请重新启动适配器。

## Changelog

### v0.0.6

-   dependencies updated

### v0.0.5

-   introduced axios

### v0.0.4

-   changed ecrypting to 'encryptedNative'

### 0.0.3

-   added folders, devices, channels & fixed bugs

### 0.0.2

-   'request' replaced by 'got', secret encryption added, reviewed accordingly 'development and coding best practices'

### 0.0.1 First try

-   (forelleblau) initial release

## License

MIT License

Copyright (c) 2022 forelleblau <mailto:marceladam@gmx.ch>

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