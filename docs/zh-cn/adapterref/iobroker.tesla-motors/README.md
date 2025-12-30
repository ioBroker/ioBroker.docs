---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla-motors
hash: Pm6pIEKSi3uq6I+V/kzJU78bv12NP+NOVPE/M1q61rY=
---
![标识](../../../en/adapterref/iobroker.tesla-motors/admin/tesla-motors.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.tesla-motors.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)
![安装数量（最新）](https://iobroker.live/badges/tesla-motors-installed.svg)
![安装数量（稳定版）](https://iobroker.live/badges/tesla-motors-stable.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.tesla-motors.svg)
![NPM](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)

# IoBroker.tesla-motors
**测试：** ![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.tesla-motors/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的 Tesla 适配器
特斯拉应用程序中的所有特斯拉车型和 Powerwall 设备都会显示并更新。

**特斯拉和Powerwall的远程命令可通过以下方式获取：** tesla-motors.0.id.remote

登录流程：

- 点击实例选项中的身份验证链接。
- 输入您的登录凭据，如有必要，请完成验证码/reCaptcha 和 MFA。
- 在“页面未找到”页面上，从浏览器中复制完整的 URL 并将其粘贴到实例选项中，然后单击“保存并关闭”。
- 初始数据可能仅在首次驱动后才会出现

**字段描述**

- df 驾驶员前部
- 驾驶员后部
- 乘客前部
- 乘客后部
- 英尺前行李箱
- 右侧后备箱

[选项代码说明](https://tesla-api.timdorr.com/vehicle/optioncodes)

## 问题与讨论：
https://forum.iobroker.net/topic/47203/test-tesla-motors-v1-0-0

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires admin >= 7.6.17 now

### 1.5.0 (2025-12-28)
- (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 6.17.14 now.
- (TA2k) powerwall backup history has been fixed
- (TA2k) Dependencies have been updated.

### 1.4.5 (2024-04-19)

- cleaned up token folder to reduce state objects

### 1.4.4 (2024-04-10)

- improve energy history data

### 1.4.3 (2024-04-10)

- fix for too many state in the powerwall energy history

### 1.4.2 (2023-11-17)

- fix km states are not refreshed

### 1.4.1 (2023-11-17)

- fix \_km states are not refreshed

### 1.4.0 (2023-11-14)

- fix location fetching and add new option to change location fetching interval

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

- (iobroker-community-adapters) ALL DATA POINTS ARE NEW, Vis must be adapted. New version with new states for Tesla and Powerwalls.

## License

MIT License


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2021-2025 iobroker-community

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