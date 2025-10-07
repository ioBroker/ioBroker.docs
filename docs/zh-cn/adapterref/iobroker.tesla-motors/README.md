---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla-motors
hash: Fvr1aTw0IyZbJ+fLgciBIKNx+41ASXE7fi8j6dPSNfk=
---
![标识](../../../en/adapterref/iobroker.tesla-motors/admin/tesla-motors.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.tesla-motors.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)
![安装数量（最新）](https://iobroker.live/badges/tesla-motors-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/tesla-motors-stable.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.tesla-motors.svg)
![新公共管理](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)

# IoBroker.tesla-motors
**测试：**![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.tesla-motors/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的 Tesla 适配器
显示并更新特斯拉应用程序中的所有特斯拉车型和 Powerwall。

**Tesla 和 Powerwall 的远程命令可在 tesla-motors.0.id.remote 下使用**

**登录流程：**

- 单击实例选项中的“Auth Link”。
- 输入您的登录凭据，如有必要，完成 Captcha/reCaptcha 和 MFA。
- 在“页面未找到”页面上，从浏览器复制完整的 URL 并将其粘贴到实例选项中，然后单击“保存并关闭”。
- 初始数据可能仅在第一次驾驶后出现

**字段描述**

- df 驾驶员前部
- 司机后方
- pf 乘客前部
- pr 乘客后部
- 英尺前行李箱
- 右后备箱

[选项代码说明](https://tesla-api.timdorr.com/vehicle/optioncodes)

## 问题和讨论：
https://forum.iobroker.net/topic/47203/test-tesla-motors-v1-0-0

## Changelog

<!-- ### **WORK IN PROGRESS** -->
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

Copyright (c) 2021-2029 iobroker-community

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