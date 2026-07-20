---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.parcel/README.md
title: ioBroker.parcel
hash: B5JuvLe0ZuWJA2tA5w6LYfLaK6giYB51FW7kHwJg0ck=
---
![标识](../../../en/adapterref/iobroker.parcel/admin/parcel.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.parcel.svg)
![下载](https://img.shields.io/npm/dm/iobroker.parcel.svg)
![安装数量](https://iobroker.live/badges/parcel-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/parcel-stable.svg)
![依赖状态](https://img.shields.io/david/TA2k/iobroker.parcel.svg)
![NPM](https://nodei.co/npm/iobroker.parcel.png?downloads=true)

# IoBroker.parcel
**测试：** ![测试与发布](https://github.com/TA2k/ioBroker.parcel/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的包裹跟踪适配器
使用 ioBroker 智能家居系统，即可追踪来自亚马逊、DHL、DPD、Hermes、UPS 和 GLS 的包裹。同时支持德国邮政的信件追踪。通知可直接通过 Telegram、Pushover 或 Signal 发送。

此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

## 登录流程
DHL：

- 输入DHL应用程序登录信息
- 接收短信/电子邮件验证码
- 在实例设置中输入代码并保存

**亚马逊：**

- 输入登录凭据
- 如有需要，请在首次登录前输入来自双重验证应用程序的一次性密码 (OTP) 令牌

**DPD、GLS、UPS、17Track 用户：**

请输入用户名和密码

**包裹和信件的 Telegram 通知**

在实例设置中启用，并输入例如 `telegram.0`

## 可见性
**在可视化表格中显示包裹信息**

所有地块的数据点：`parcel.0.allProviderJson`

包裹递送数据点：`parcel.0.inDelivery`

**组件：JSON 表格**

说明：https://www.smarthome-tricks.de/software-iobroker/iobroker-vis-json-table-widget-teil-1-basics/

在可视化界面中显示DHL信件追踪信息

将数据点 `parcel.0.dhl.briefe....image` 分配给“String img src”元素作为对象 ID。

## 讨论和提问
<https://forum.iobroker.net/topic/51795/test-adapter-parcel-paketverfolgung-dhl-v0-0-1>

## Changelog
### 0.3.2 (2026-07-08)
- Fix for DPD
- Fix for GLS

### 0.3.1 (2026-07-07)

- DHL: New login via browser code (dhllogin://)
- Amazon: Login fix and captcha detection with note

### 0.3.0 (2026-04-05)

- DHL: New login via browser code (dhllogin://)
- Amazon: Login fix and captcha detection with note

### 0.2.10 (2025-01-15)

- add alternative way for dhl login
- move dhl connections error to info level

### 0.2.8 (2024-10-18)

- fix amazon login

### 0.0.30

- Fix hermes login

### 0.0.25

- Fix amazon UI parsing

### 0.0.19

- Fix GLS Parcel

### 0.0.18

- Fix UPS/GLS Login

### 0.0.1

- (TA2k) initial release

## License

MIT License

Copyright (c) 2022-2026 TA2k <tombox2020@gmail.com>

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