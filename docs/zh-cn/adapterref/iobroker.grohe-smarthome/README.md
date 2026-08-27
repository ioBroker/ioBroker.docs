---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.grohe-smarthome/README.md
title: ioBroker.grohe-smarthome
hash: 0HlGhp5vKgDCgdFipMrJ6VvTbGRDn2/IYeZPP4+Hfyg=
---
# IoBroker.grohe-smarthome

![NPM 版本](https://img.shields.io/npm/v/iobroker.grohe-smarthome.svg)
![下载](https://img.shields.io/npm/dm/iobroker.grohe-smarthome.svg)
![安装数量](https://iobroker.live/badges/grohe-smarthome-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/grohe-smarthome-stable.svg)
![NPM](https://nodei.co/npm/iobroker.grohe-smarthome.png?downloads=true)
![ioBroker](https://img.shields.io/badge/ioBroker-Adapter-blue)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22-green)
![执照](https://img.shields.io/badge/License-MIT-lightgrey)

**测试：** ![测试与发布](https://github.com/patricknitsch/ioBroker.grohe-smarthome/workflows/Test%20and%20Release/badge.svg)

## IoBroker 高仪智能家居适配器
<img align="left" src="admin/grohe-smarthome.png" alt="图像" width="200"/>该适配器将 ioBroker 连接到<strong>Grohe Smarthome / Ondus</strong>云，并将 Grohe 设备作为 ioBroker 内部的状态（以及一些控件）公开。

它支持：

- **Grohe Sense**（型号“101”）
- **Grohe Sense Guard**（型号“103”）
- **高仪蓝色家居**（型号“104”）
- **高仪蓝色专业系列**（型号“105”）

该适配器通过 Grohe 的 OIDC/Keycloak 流程登录，将**加密的刷新令牌**存储在状态中，并按可配置的间隔轮询 Grohe 云 API。

创意和概念源自 Home Assistant 集成 **ha-grohe_smarthome**。特别感谢 **Flo-Schilli**。

---

## 文档
[🇺🇸 文档](./docs/en/README.md)

[🇩🇪 文献](./docs/de/README.md)

---

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.6.0 (2026-06-05)
* (copilot) Fixes Repo Checker
* (copilot) Change Raw-States to Bump Funktion for Debugging(see Doc.)
* (copilot) Fixes Problems Error 404
* (copilot) New functions for Grohe with Snooze, Withdrawal and Sprinkler
* (copilot) Extend Documentation

### 0.5.4 (2026-05-23)
* (copilot) Add latest Message for Notifications
* (copilot) Add Icons in Notifications

### 0.5.3 (2026-05-21)
* (copilot) Modify notification manager to work with instances
* (copilot) Update Dependencies

### 0.5.2 (2026-05-14)
* (patricknitsch) Fix Header when Device offline
* (patricknitsch) Add Icon and Online State on each Device
* (patricknitsch) Update Readme and Doc

### 0.5.1 (2026-05-09)
* (patricknitsch) Update Admin Dependency >= 7.6.23 for Device Manager
* Important Note: From 0.4.0 to 0.5.X the Sensor Overview is removed but visible. Thats a Bug from js-controller and should be fixed with 7.1.3

**Older entries can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).**

## License
MIT License

Copyright (c) 2026 patricknitsch <patricknitsch@web.de>

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