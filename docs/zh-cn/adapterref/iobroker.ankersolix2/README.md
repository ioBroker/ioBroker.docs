---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ankersolix2/README.md
title: ioBroker.ankersolix2
hash: rRSfHrrOlDzK9QTnaYIIJW2Lap1bqlUAjx1nWjoC2k4=
---
![标识](../../../en/adapterref/iobroker.ankersolix2/admin/ankersolix2.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.ankersolix2.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ankersolix2.svg)
![安装数量](https://iobroker.live/badges/ankersolix2-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/ankersolix2-stable.svg)
![新平台](https://nodei.co/npm/iobroker.ankersolix2.png?downloads=true)

# IoBroker.ankersolix2
**测试：**![测试与发布](https://github.com/ronny130286/ioBroker.ankersolix2/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 ankersolix2 适配器
集成 Anker Solix 2

＃＃ 描述
该项目源自https://github.com/tomquist/solix2mqtt，并将来自anker api的信息直接带入ioBroker。

## 支持的设备
我没有每一个[Anker 硬件](https://www.ankersolix.com/) 可供测试。我只能列出我测试过的硬件。其他所有 [Anker 硬件](https://www.ankersolix.com/) 可能](https://www.ankersolix.com/)也兼容

| 设备 | 描述 |
| ------------ | ------------------------------------------------------------------------------------------------------------------ |
| `Solarbank` | - A17C0：Solarbank E1600（第 1 代）<br> - A17C1：Solarbank 2 E1600 Pro<br> - A17C3：Solarbank 2 E1600 Plus<br> |
| `智能电表` | - A17X7：Anker 3 相 Wifi 智能电表<br>- SHEM3：Shelly 3EM 智能电表<br>- SHEMP3：Shelly 3EM Pro 智能电表 |

## 重要变化
如果您从 v1.x 更新到 2.x，则必须重新输入密码！如果不这样做，您的帐户将被锁定！！！

## 配置
1. 在 Anker 应用程序中创建一个家庭账户并将其添加到您的主账户
2.安装适配器
3. 进入适配器设置并设置您的凭据
4. 首次使用时，请使用较长的轮询时间（180 秒），这样如果出现问题，您有足够的时间停止适配器。

通常您可以在日志文件中看到您有一个 site_id 并且收到消息：已发布。

## 帮助
如果您遇到 401 之类的错误，请检查您的凭据。
如果您再次遇到错误并且无法登录，请停止适配器并删除 iobroker-data/ankersolix2.0 下的 session.data（例如 /opt/iobroker/iobroker-data/ankersolix2/），然后重新启动适配器。

致谢

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 2.0.0 (2025-03-09)

- (ronny130286) update packages
- (ronny130286) decrypt password in adminui
- (ronny130286) add more language codes
- (ronny130286) reorganized some DP

### 1.1.0 (2025-02-08)

- (ronny130286) add analysis data for week/day
- (ronny130286) update packages

### 1.0.3 (2024-12-06)

- (ronny130286) edit refreshtimer
- (ronny130286) add to repo

### 1.0.2 (2024-12-04)

- (ronny130286) bugfix

### 1.0.1 (2024-12-01)

- (ronny130286) ESLint 9.x

### 1.0.0 (2024-11-29)

- (ronny130286) stable release
- (ronny130286) fixed backup_info object

### 0.1.0-beta.0 (2024-10-02)

- (ronny130286) beta release

### 0.0.3-alpha.0 (2024-09-25)

- (ronny130286) fix session.data
- (ronny130286) npm release

### 0.0.2-alpha.0 (2024-09-20)

- (ronny130286) initial release

## License

MIT License

Copyright (c) 2025 ronny130286 <ronnymatthei@gmx.de>

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