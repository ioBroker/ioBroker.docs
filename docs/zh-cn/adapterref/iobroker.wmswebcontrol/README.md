---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wmswebcontrol/README.md
title: ioBroker.wmswebcontrol
hash: 0XGWfUVPmus32BIIY+Km+opjwlEUef8l6E2v1S1O8do=
---
![标识](../../../en/adapterref/iobroker.wmswebcontrol/admin/wmswebcontrol.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.wmswebcontrol.svg)
![下载](https://img.shields.io/npm/dm/iobroker.wmswebcontrol.svg)
![安装数量（最新）](https://iobroker.live/badges/wmswebcontrol-installed.svg)
![安装数量（稳定版）](https://iobroker.live/badges/wmswebcontrol-stable.svg)
![依赖状态](https://img.shields.io/david/TA2k/iobroker.wmswebcontrol.svg)
![NPM](https://nodei.co/npm/iobroker.wmswebcontrol.png?downloads=true)

# IoBroker.wmswebcontrol
**测试：** ![测试与发布](https://github.com/TA2k/ioBroker.wmswebcontrol/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 wmswebcontrol 适配器
Warema WMS Webcontrol 适配器

＃＃ 用法
要控制您的设备，请更改 \*Convert 值。

`wmswebcontrol.0.Markise+XXXX.setting0Convert`

`wmswebcontrol.0.LED+XXXXXXX.setting1Convert`

`wmswebcontrol.0.Markise.setting2Convert`

提示：适配器设置中设置的密码不能包含特殊字符。

## Changelog
### 0.1.4 (2025-01-27)

- ignore certificate errors

### 0.1.3 (2024-10-26)

- fix login

### 0.1.2

- Bugfixes

### 0.0.3

- (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2030 TA2k <tombox2020@gmail.com>

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