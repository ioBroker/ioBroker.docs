---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla-motors
hash: qiJyGYl+iytQgjCKWTgus6qTMM6Fh7ONOiqQLYWwcsA=
---
![标识](../../../en/adapterref/iobroker.tesla-motors/admin/tesla-motors.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.tesla-motors.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)
![安装数量（最新）](https://iobroker.live/badges/tesla-motors-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/tesla-motors-stable.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.tesla-motors.svg)
![国家公共管理](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)

# IoBroker.tesla-motors
**测试：** ![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.tesla-motors/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 Tesla 适配器
所有 Tesla 模型和 Powerwall 均通过 Tesla 应用程序进行操作和操作。

**特斯拉和 Powerwall 的远程连接** tesla-motors.0.id.remote

**登录名：**

- 在“授权链接”选项中的“即时选项”中。
- 登录日期和验证码/验证码和 MFA 验证码。
- 在浏览器中找不到页面，并在即时选项中找到完整的 URL，并在 Speichen 和 Schließen klicken 中找到该页面。
- Die ersten Daten kommen unter Umständen erst nach der ersten Fahrt

**字段说明**

- df 驾驶员前部
- 驾驶员后方博士
- pf 乘客前排
- PR乘客后排
- 英尺前行李箱
- rt后备箱

[选项代码 Erklärung](https://tesla-api.timdorr.com/vehicle/optioncodes)

## 讨论和讨论：
https://forum.iobroker.net/topic/47203/test-tesla-motors-v1-0-0

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.5 (2023-10-24)

- fix vehicle update

### 1.3.4 (2023-10-24)

- add wall_connector devices

### 1.3.4-alpha.0 (2023-10-18)

- (mcm1957) Standard iobroker release environment has been added.
- (mcm1957) Some dependencies have been updated.

### 1.3.2

- Create history elements by index not by date

### 1.3.1

- login url and ordered car fix

### 1.0.2

- (iobroker-community-adapters) ALLE DATENPUNKTE SIND NEU, Vis muss angepasst werden. Neue Version mit neuen Zuständen für Tesla und Powerwalls.

## License

MIT License

Copyright (c) 2021-2023 iobroker-community

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