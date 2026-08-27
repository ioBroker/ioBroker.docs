---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.govee-local/README.md
title: govee-local 适配器（适用于 ioBroker）
hash: 3ibYBYJmTuzhHsl0CoLxNWhbnFCYtSGaWOnxdtg8Gmk=
---
![标识](../../../en/adapterref/iobroker.govee-local/admin/govee-local.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.govee-local.svg)
![下载](https://img.shields.io/npm/dm/iobroker.govee-local.svg)
![安装数量](https://iobroker.live/badges/govee-local-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/govee-local-stable.svg)
![NPM](https://nodei.co/npm/iobroker.govee-local.png?downloads=true)

# IoBroker 的 govee-local 适配器
**测试：** ![测试与发布](https://github.com/boergegrunicke/ioBroker.govee-local/workflows/Test%20and%20Release/badge.svg)

通过本地访问控制 Govee 设备（无需云端）

要能够本地控制 govee 设备，需要按照其 [文档](<https://app-h5.govee.com/user-manual/wlan-guide#:~:text=Supported%20Product%20Models%20(continually%20updated)> 中的描述，在 gove 应用程序设置中明确启用该功能。由于我目前只有 H6051 灯，因此这是我唯一可以用来测试的设备。

对于 **Windows** 用户：请进入设置并确保选择正确的网络接口，否则适配器将无法收到 Govee 设备的任何响应。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.4.6 (2026-05-18)

- Adapter requires node.js >= 22 now
- Fixed multiple security vulnerabilities in dev dependencies:
  - Updated `@iobroker/testing` to resolve axios, esbuild, and mocha-related CVEs
  - Added npm overrides for `mocha` subdependencies: `diff` (^8.0.3) and `serialize-javascript` (^7.0.5)
  - All npm audit checks now pass with zero vulnerabilities

- update dependencies: @types/node (25.5.0), eslint (10.1.0), @alcalzone/release-script (5.1.1), admin (7.6.20)
- update dependencies: @alcalzone/release-script (5.2.0), @alcalzone/release-script-plugin-iobroker (5.2.0), @alcalzone/release-script-plugin-license (5.2.0), @alcalzone/release-script-plugin-manual-review (5.2.0), @iobroker/eslint-config (2.3.4), @types/node (25.6.2), eslint (10.3.0), prettier (3.8.3), typescript (6.0.3)

### 0.4.5 (2025-11-16)

- fix scan mode inconsistency
  enhance log output behavior

### 0.4.4 (2025-11-13)

- add option to run auto discovery once on startup, in interval or completly disable it

### 0.4.3 (2025-11-11)

- fix responsive design in the settings
- revert forbidden characters checking
- update dependencies

### 0.4.2 (2025-11-08)

- update dependencies
- fix device name / model identifier in the objects

Older entries are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2025-2026 Børge Grunicke

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