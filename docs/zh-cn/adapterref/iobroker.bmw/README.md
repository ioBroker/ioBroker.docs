---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bmw/README.md
title: ioBroker.bmw
hash: Z+Gz0BFzpoYSG/LsgdOZ7/JEJkNp4KJJA4Jciqk4Te4=
---
![NPM 版本](https://img.shields.io/npm/v/iobroker.bmw.svg)
![下载](https://img.shields.io/npm/dm/iobroker.bmw.svg)
![节点](https://img.shields.io/node/v-lts/iobroker.bmw?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.bmw?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/TA2k/iobroker.bmw?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/TA2k/iobroker.bmw?logo=github&style=flat-square)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/TA2k/iobroker.bmw?logo=github&style=flat-square)
![GitHub 上次提交](https://img.shields.io/github/last-commit/TA2k/iobroker.bmw?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/TA2k/iobroker.bmw?logo=github&style=flat-square)
![GitHub 工作流程状态](https://img.shields.io/github/actions/workflow/status/TA2k/iobroker.bmw/test-and-release.yml?branch=master&logo=github&style=flat-square)
![SNYK 已知漏洞](https://snyk.io/test/github/TA2k/ioBroker.bmw/badge.svg)
![测试版](https://img.shields.io/npm/v/iobroker.bmw.svg?color=red&label=beta)
![稳定的](https://iobroker.live/badges/bmw-stable.svg)
![已安装](https://iobroker.live/badges/bmw-installed.svg)
![新公共管理](https://nodei.co/npm/iobroker.bmw.png?downloads=true)

<img src="admin/bmw.png" alt="标识" width="200">

# IoBroker.bmw
## 版本
# BMW ioBroker 适配器
该适配器将宝马车辆无缝集成到 ioBroker，让您能够直接在 ioBroker 平台内监控和控制您的宝马车辆。它通过官方宝马应用程序获取并更新与您的宝马账户关联的所有宝马车型的数据，提供车辆属性并支持远程命令。

＃＃ 特征
- 从 BMW ConnectedDrive 服务检索并更新 BMW 车辆数据。
- 在“bmw.0.VIN.remotev2”下为您的宝马启用远程命令。

## 登录流程
1. 在实例选项中，输入您的 BMW 帐户登录凭据，并在出现提示时完成 CAPTCHA/reCAPTCHA 验证。
2.选择您的车辆类型。
3. 由于 API 配额有限，您可以禁用某些统计信息提取以优化使用。
4. 设置符合您的数据需求的更新间隔——可能需要一些反复试验才能保持在最大配额内。
5. 要增加配额，您可以选择添加第二个用户帐户。
6. 初始数据可能会在短暂延迟后或车辆首次活动（例如驾驶）后出现。

数据结构
可通过`bmw.0.VIN.properties`访问车辆特定数据，其中`VIN`代表您的宝马车辆识别号码。

## 远程命令
您的宝马汽车可通过`bmw.0.VIN.remotev2`进行远程控制。支持的操作可能包括锁车/解锁车门、启动空调或触发其他车辆功能，具体取决于您的宝马车型和互联驾驶功能。

*注意：可用字段和远程功能根据您的宝马车型和 ConnectedDrive API 而有所不同。*

＃＃ 来源
此适配器可在以下位置获取：[https://github.com/TA2k/ioBroker.bmw](https://github.com/TA2k/ioBroker.bmw)

## Changelog

### **WORK IN PROGRESS**

- BREAKING: Dropped support for Node.js 18 (#88)
- (hombach) BREAKING: Dropped support for js-controller 5 (#111)
- (hombach) BREAKING: change to admin 7.4.10 as recommended by ioBroker (#111)
- (hombach) encrypt and protect second user password - has to be reentered (#111)
- (hombach) bump dependencies

### 2.9.5 (2025-05-18)

- (hombach) update axios
- (hombach) fixing issues detected by repository checker (#88)
- (hombach) some small code cleanups/modernisations
- (hombach) add/translate description
- (hombach) update logo

### 2.9.4 (2025-02-26)

- fix for Mitbenutzer Feature

### 2.9.3 (2025-01-29)

- fix remote controls
- add Mitbenutzer Login for remote controls

### 2.9.0 (2024-11-28)

- added new remotes as switch and updated values
- added retry logic for remotes

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