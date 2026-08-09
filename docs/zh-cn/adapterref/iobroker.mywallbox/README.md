---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mywallbox/README.md
title: ioBroker.mywallbox
hash: wuUn8dFcVX0NIub+f2jgVe96fIrOUHzy9zV7weUvL5o=
---
![标识](../../../en/adapterref/iobroker.mywallbox/admin/wallbox.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.mywallbox?style=flat-square)
![下载](https://img.shields.io/npm/dm/iobroker.mywallbox.svg)
![安装数量](https://iobroker.live/badges/mywallbox-installed.svg)
![GitHub](https://img.shields.io/github/license/SKB-CGN/iobroker.mywallbox?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/SKB-CGN/iobroker.mywallbox?logo=github&style=flat-square)
![GitHub提交活动](https://img.shields.io/github/commit-activity/m/SKB-CGN/iobroker.mywallbox?logo=github&style=flat-square)
![GitHub 最新提交](https://img.shields.io/github/last-commit/SKB-CGN/iobroker.mywallbox?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/SKB-CGN/iobroker.mywallbox?logo=github&style=flat-square)
![NPM](https://nodei.co/npm/iobroker.mywallbox.png?downloads=true)
![捐](https://img.shields.io/badge/Donate-PayPal-blue.svg)

# IoBroker.mywallbox
**测试：** ![测试与发布](https://github.com/SKB-CGN/ioBroker.mywallbox/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的 My-Wallbox 适配器
通过 My Wallbox 的云服务将您的 My Wallbox（例如 Pulsar Plus）连接到 ioBroker。

＃＃ 控制
所有“wallbox.[instance].SerialNumber.control”下的状态都是可写的，可用于控制墙盒。

＃＃ 支持
如果您喜欢这款适配器并想支持我，可以点击这里：

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- Dependencies updated

### 1.3.0 (2024-12-10)
- Added: EsLint 9.x for better code optimization (#135)

### 1.2.0 (2024-11-12)
- Added: Migration to jsonConfig in Adapter-settings
- Added: New state "car_connected", which indicates, that a car is connected
- Added: Resume, Pause check - less error messages (e.g. if Wallbox is in Pause Mode and should be set to pause, don't throw any error)
- Added: Option, to unlock the wallbox first if it should enter the resume mode (Default: wallbox will not resume, if locked)
- Added: Some minor improvements, updates dependencies and smal cosmetics

### 1.1.1 (2024-09-18)
- updated dependencies

### 1.1.0 (2024-02-08)
- Prepared Adapter to be added to ioBroker repotories

### 1.0.0 (2023-01-17)
- Changed some Adapter settings to be published to public repository
- Attention: Password needs to be re-entered as encryption function changed

### 0.0.19 (2022-08-23)
- fixed small crash bug

### 0.0.18 (2022-08-17)
- renamed Adapter to MyWallbox to get adapter added to iobroker repo

### 0.0.17 (2022-08-15)
- crash handler extended
- After some time, the charge value disappears. The value is now kept as long as the wallbox is in charge mode

### 0.0.16 (2022-07-19)
- added error handling for cost-data, if server did not respond properly
- changed some error-handling to prevent crashing if JSON is empty

### 0.0.14 (2022-07-19)
- changed state 'added_energy' to Wh instead of W

### 0.0.13 (2022-07-12)
- fixed crash, if token has different format

### 0.0.8 (2022-07-06)
- redefined password store (now password is saved securely)

### 0.0.6 (2022-07-04)
- added new states including price-calculation

### 0.0.5 (2022-07-01)
- Added extended Wallbox informations (like lock-status, charging-power and charging-time)

### 0.0.4 (2022-06-29)
- Login corrected

### 0.0.3 (2022-06-29)
- added some files

### 0.0.2 (2022-06-29)
* initial release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2024-2026 SKB <info@skb-web.de>

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