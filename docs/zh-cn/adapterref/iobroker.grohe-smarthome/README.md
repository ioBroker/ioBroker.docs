---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.grohe-smarthome/README.md
title: ioBroker.grohe-smarthome
hash: 9e8bq0j+qbC3UA1PWUDMTcfa0t1/daxzQVyOtgUGqlE=
---
# IoBroker.grohe-smarthome

![NPM 版本](https://img.shields.io/npm/v/iobroker.grohe-smarthome.svg)
![下载](https://img.shields.io/npm/dm/iobroker.grohe-smarthome.svg)
![安装数量](https://iobroker.live/badges/grohe-smarthome-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/grohe-smarthome-stable.svg)
![NPM](https://nodei.co/npm/iobroker.grohe-smarthome.png?downloads=true)

**测试：** ![测试与发布](https://github.com/patricknitsch/ioBroker.grohe-smarthome/workflows/Test%20and%20Release/badge.svg)

# IoBroker 高仪智能家居适配器
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
### 0.3.3 (2026-03-25)

* (patricknitsch) Clamp tapAmount between 50 and 2000 ml.

### 0.3.2 (2026-03-21)

* (copilot) Update Admin Tap for Blue systems
* (patricknitsch) Fix Isues from RepoChecker

### 0.3.1 (2026-03-18)
* (claude/patricknitsch) Fix admin tab controls not triggered after confirmation – replace native `confirm()` with custom modal dialog (works inside ioBroker iframe)
* (claude/patricknitsch) Fix 4 wrong state IDs in admin tab (Close Valve, Pressure Measurement, Reset CO₂, Reset Filter)

### 0.3.0 (2026-03-18)

* (claude/patricknitsch) Add card-based device overview tab with controls
* (claude/patricknitsch) Add Valve, Pressure Measurement and Dispense controls in admin tab
* (claude/patricknitsch) Disable controls when device is offline
* (claude/patricknitsch) Adjust color scheme in admin tab (white/black based on light/dark mode)
* (patricknitsch) Update Packages

### 0.2.6 (2026-03-11)

* (claude/patricknitsch) Fix measurement "Filter" for Blue Systems
* (claude/patricknitsch) Fix permanent dispense without Trigger

### 0.2.5 (2026-02-26)

* (patricknitsch) Update Admin Package

### 0.2.4 (2026-02-25)

* (patricknitsch) Fix Points for Latest Repo
* (patricknitsch) Update Packages

### 0.2.3 (2026-02-15)

* (claude) Fix no correct messages

### 0.2.2 (2026-02-12)
 * (claude) Fix Problem with jsonConfig and Interval

### 0.2.1 (2026-02-11)
* (patricknitsch) Change Log for measurement

### 0.2.0 (2026-02-10)

* (claude) Extend Error Handling for noon and midnight

### 0.1.7 (2026-02-09)

* (patricknitsch) Update Error Handling
* (patricknitsch) Update Readme

### 0.1.6 (2026-02-09)

* (patricknitsch) Changed Loglevel
* (claude) Update Error Handling -> increase Try-Timeouts

### 0.1.5 (2026-02-09)

* (patricknitsch) Update Dependencies

### 0.1.4 (2026-02-09)

* (claude) Fix wrong value for Grohe Blue remainingFilter
* (claude) Update Readme

### 0.1.3 (2026-02-08)

* (claude) Fix null of Total Consumption
* (claude) Update Readme

### 0.1.2 (2026-02-07)

* (patricknitsch) Update Readme and Translations

### 0.1.1 (2026-02-07) 
* (claude) Rate limiting awareness (HTTP 403 handling)
* (claude) Immediate state readback after commands
* (claude) Optimized polling with tiered API call frequency

### 0.1.0 (2026-02-07)
* (patricknitsch) initial release
* (claude) OAuth login via Grohe Keycloak with automatic token refresh
* (claude) Support for Sense, Sense Guard, Blue Home, Blue Professional
* (claude) Encrypted refresh token storage
* (claude) Optional raw measurement data states
* (claude) i18n support (EN/DE) for admin UI

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