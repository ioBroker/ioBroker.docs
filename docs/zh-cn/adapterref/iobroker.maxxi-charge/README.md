---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.maxxi-charge.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.maxxi-charge.svg
BADGE-Number of Installations: https://iobroker.live/badges/maxxi-charge-installed.svg
BADGE-GitHub: https://img.shields.io/github/license/blabond/iobroker.maxxi-charge?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/blabond/iobroker.maxxi-charge?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/blabond/iobroker.maxxi-charge?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/blabond/iobroker.maxxi-charge?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/blabond/iobroker.maxxi-charge?logo=github&style=flat-square
BADGE-Donation: https://img.shields.io/badge/Paypal-Donate-blue?style=flat
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.maxxi-charge/README.md
title: ioBroker.Maxxi-Charge
hash: jZ2ev72VNPO8u1sVXU6iG2xvUyZuOce9t/G1GljuTlQ=
---
![标识](../../../en/adapterref/iobroker.maxxi-charge/admin/ms_logo_black_green.webp)

![NPM 版本](https://img.shields.io/npm/v/iobroker.maxxi-charge.svg)
![下载](https://img.shields.io/npm/dm/iobroker.maxxi-charge.svg)
![安装数量](https://iobroker.live/badges/maxxi-charge-installed.svg)
![GitHub](https://img.shields.io/github/license/blabond/iobroker.maxxi-charge?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/blabond/iobroker.maxxi-charge?logo=github&style=flat-square)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/blabond/iobroker.maxxi-charge?logo=github&style=flat-square)
![GitHub 上次提交](https://img.shields.io/github/last-commit/blabond/iobroker.maxxi-charge?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/blabond/iobroker.maxxi-charge?logo=github&style=flat-square)
![捐款](https://img.shields.io/badge/Paypal-Donate-blue?style=flat)

# IoBroker.Maxxi-Charge
![测试与发布](https://github.com/blabond/ioBroker.maxxi-charge/actions/workflows/test-and-release.yml/badge.svg)

**ioBroker.MaxxiCharge** 是 ioBroker 系统的适配器，可实现 MaxxiCharge CCU 设备的集成和控制。该适配器提供一系列功能，包括读取设备数据、调整配置和发送控制命令。

http://www.maxxisun.de

## 文档
[🇺🇸 文档](./docs/en/README.md)

[🇩🇪 文档](./docs/de/README.md)

## 版本兼容性
| 版本 | CCU V1 本地 | CCU V1 云端 | CCU V2 本地 | CCU V2 云端 |
|---------|--------------|--------------|--------------|--------------|
| 0.36 | 0.36 ❌ | ✅ |              |              |
| 0.38 | 0.38 ❌ | ✅ |              |              |
| 0.40 | 0.40 ❌ | ✅ |              |              |
| 0.41 | 0.41 ✅ | ✅ |              |              |
| 0.44 | 0.44 ✅ | ✅ |              |              |
| 0.45 | 0.45 ❓ | ❓ | ❓ | ❓ |

🔹 **图例**：✅ - 兼容 ❌ - 不兼容 ❓ - 未知

## Changelog

### 1.4.9 (2025-02-08)

- Bugfix on Battery Calibration.
- Fixes for stable release on ioBroker adapter.
- Feedback update

### 1.4.1 (2025-01-12)

- ### Please delete the `.sendcommand` folder and restart the adapter when updating from a previous version to this one.
- New: Added support for battery calibration (Expert Settings)
- Improved: Redesigned adapter settings for a better user experience

### 1.3.13 (2025-01-07)
- Fixed: Issue with the dcAlgorithm datapoint where the UI could crash due to an incorrect states definition
- Removed the info.localip datapoint. The local IP address is now directly included in the jsonConfig.
- Adjusted code to use modern methods, replacing deprecated ones like setObjectAsync.

### 1.3.0 (2024-12-15)
- **Summer/Winter mode** added:
  - Dynamic adjustment of charging parameters based on seasons.
  - Configurable with start and end dates.
- **Cloud API query interval**: Interval for CCU queries in cloud mode is now configurable via a slider between 10 and 60 seconds.

### 1.2.191 (2024-12-08)
- Release

## License
MIT License

Copyright (c) 2024-2025

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