---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bestway/README.md
title: ioBroker.bestway
hash: apGwzfF2poEGb49C0SsMpbAiTa1ZPGSNkYwhVWEIx8M=
---
![标识](../../../en/adapterref/iobroker.bestway/admin/bestway.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.bestway.svg)
![下载](https://img.shields.io/npm/dm/iobroker.bestway.svg)
![安装数量](https://iobroker.live/badges/bestway-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/bestway-stable.svg)
![依赖状态](https://img.shields.io/david/TA2k/iobroker.bestway.svg)
![NPM](https://nodei.co/npm/iobroker.bestway.png?downloads=true)

# IoBroker.bestway
**测试：** ![测试与发布](https://github.com/TA2k/ioBroker.bestway/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的 bestway 适配器
Bestway Smart Hub (V1) 和 Bestway Connect / Smart Spa (V2) 的适配器。

支持两代设备，可在适配器设置中选择：

- **V1 – Bestway Smart Hub**（旧型号，Gizwits 后端）：使用应用程序电子邮件和密码登录并选择国家/地区。
- **V2 – Bestway Connect / Smart Spa**（2025 年起的 UltraFit 型号，AWS IoT 后端）：通过二维码或 Android ID 进行配对并选择区域。

## 哨兵
此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

## 登录日志：
### V1（百适通智能中枢）
Bestway Smart Hub 应用程序邮件和密码以及土地。

### V2（Bestway Connect / Smart Spa）
“V2”一代和地区。 Dann eine der beiden Kopplungsmethoden nutzen：

- **QR 码**（iOS 和 Android）：在 Bestway Connect 应用程序中的 Geräteeinstellungen > Gerätefreigabe 中的 QR 码 anzeigen、ihn dekodieren (z.B. über https://scanqr.org/) 和文本（从 `RW_Share_` 开始）在适配器中。 Der Code ist nur wenige Minuten gültig und wird einmalig zur Kopplung verwendet。
- **Android-ID**（nur Android）：在 Profil angezeigte ID eintragen 下的 Bestway Connect 应用程序中死亡。 Damit wird das bestehende Konto samt gekoppelter Geräte direkt verwendet，ohne QR-Code。

## 施托伊恩
- V1：`bestway.0.<id>.remote.*`bzw。 `remotev2.*` 设置为 jeweiligen Befehl。
- V2：`bestway.0.<id>.remotev3.*` setzen steuert den jeweiligen Befehl（功率、热量、过滤器、喷射、波浪、温度设置、锁定）。

## 讨论和问题：
https://forum.iobroker.net/topic/48023/test-adapter-bestway-v0-0-x

## Changelog

### 0.1.0

Support for Bestway Connect / Smart Spa (V2, AWS IoT backend) with QR code or Android ID pairing and realtime WebSocket updates.

### 0.0.5

Support for v2 pump version

### 0.0.1

- (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2026 TA2k <tombox2020@gmail.com>

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