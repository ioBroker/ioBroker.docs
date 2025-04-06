---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bmw/README.md
title: ioBroker.bmw
hash: dXHYdKotEnm8Agt87cZL2hBOssbujrK9A9/5O/Kn+Ck=
---
![NPM 版本](https://img.shields.io/npm/v/iobroker.bmw.svg)
![下载](https://img.shields.io/npm/dm/iobroker.bmw.svg)
![安装数量（最新）](https://iobroker.live/badges/bmw-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/bmw-stable.svg)
![依赖状态](https://img.shields.io/david/TA2k/iobroker.bmw.svg)
![新平台](https://nodei.co/npm/iobroker.bmw.png?downloads=true)

<img src="admin/bmw.png" alt="标识" width="200">

# IoBroker.bmw
**测试：**![测试与发布](https://github.com/TA2k/ioBroker.bmw/workflows/Test%20and%20Release/badge.svg)

# BMW ioBroker 适配器
该适配器将 BMW 车辆无缝集成到 ioBroker，让您能够直接在 ioBroker 平台内监控和控制您的 BMW。它通过官方 BMW 应用程序获取和更新与您的 BMW 帐户关联的所有 BMW 车型的数据，提供车辆属性并支持远程命令。

＃＃ 特征
- 从 BMW ConnectedDrive 服务检索并更新 BMW 车辆数据。
- 在“bmw.0.VIN.remotev2”下为您的宝马启用远程命令。

## 登录流程
1. 在实例选项中，输入您的 BMW 帐户登录凭据，并在提示时完成 CAPTCHA/reCAPTCHA 验证。
2.选择您的车辆类型。
3. 由于 API 配额有限，您可以禁用某些统计信息提取以优化使用。
4. 设置符合您的数据需求的更新间隔——可能需要进行一些反复试验才能保持在最大配额之内。
5. 为了增加配额，您可以选择添加第二个用户帐户。
6. 初始数据可能会在短暂延迟后或在车辆首次活动（例如驾驶）后出现。

数据结构
车辆特定数据可通过`bmw.0.VIN.properties`访问，其中`VIN`代表您的宝马的车辆识别号。

远程命令
您可以在 `bmw.0.VIN.remotev2` 下远程控制您的宝马。支持的操作可能包括锁定/解锁车门、启动空调控制或触发其他车辆功能，具体取决于您的宝马车型和 ConnectedDrive 功能。

*注意：可用字段和远程功能根据您的宝马车型和 ConnectedDrive API 而有所不同。*

＃＃ 来源
此适配器可从以下网址获取：[https://github.com/TA2k/ioBroker.bmw](https://github.com/TA2k/ioBroker.bmw)

## Changelog

### **WORK IN PROGRESS**

- (hombach) update axios
- (hombach) fixing issues detected by repository checker (#88)
- (hombach) some small code cleanups/modernisations
- (hombach) add/translate description
- (hombach) update logo

### 2.9.4 (2025-02-26)

- fix for Mitbenutzer Feature

### 2.9.3 (2025-01-29)

- fix Remote Controls
- add Mitbenutzer Login for remote controls

### 2.9.0 (2024-11-28)

- added new remotes as switch and updated values
- added retry logice for remotes

### 2.8.4 (2024-11-21)

- improved charging session parsing
- added remote to fetch charging session from a specific month
- added raw JSON of charging session for export

### 2.8.3 (2024-11-18)

- login fixed

### 2.8.2 (2024-10-05)

- fix error getvehicles v2 failed

### 2.8.1 (2024-09-30)

- fix remote commands

### 2.7.1

- Bugfixes

### 2.5.5

- Fix login

### 2.5.0

- Fix login

### 2.4.1

- Add support for MINI and force refresh remote

### 2.3.0

- Disable v1 Endpoints

### 2.1.1

- Upgrade to statusV2 and remoteV2

### 2.0.0

- (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2025 TA2k <tombox2020@gmail.com>

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