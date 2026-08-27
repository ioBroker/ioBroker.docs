---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.govee-smart/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.govee-smart@main/admin/govee-smart.svg" width="48" align="top" /> ioBroker.govee-smart
hash: MmAk/+FsnENpdUXKDHJwMHjEWCcEPZ5LfKNvlaSWMh8=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.govee-smart@main/admin/govee-smart.svg" width="48" align="top" /> ioBroker.govee-smart

![npm 版本](https://img.shields.io/npm/v/iobroker.govee-smart)
![稳定的](https://iobroker.live/badges/govee-smart-stable.svg)
![安装](https://iobroker.live/badges/govee-smart-installed.svg)
![npm 下载](https://img.shields.io/npm/dt/iobroker.govee-smart)
![节点](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![执照](https://img.shields.io/badge/license-MIT-green)
![哨兵](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

通过 ioBroker 控制所有 WiFi 产品——灯具、传感器和家用电器。不支持仅支持蓝牙的设备。

该适配器使用所有可用的 Govee 通道（LAN、Cloud REST、AWS IoT MQTT、OpenAPI MQTT、App API），并为每个设备选择响应速度最快的通道。详情请参见 **[维基百科](https://github.com/krobipd/ioBroker.govee-smart/wiki)**。

---

## 文档
完整的用户文档位于 **[维基百科](https://github.com/krobipd/ioBroker.govee-smart/wiki)** 中。

| 主题 | 英语 | 德语 |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 着陆页 | [首页](https://github.com/krobipd/ioBroker.govee-smart/wiki/Home) | [首页](https://github.com/krobipd/ioBroker.govee-smart/wiki/Startseite) |
| 支持的模型、状态含义、贡献您的模型 | [设备](https://github.com/krobipd/ioBroker.govee-smart/wiki/Devices) | [杰拉特](https://github.com/krobipd/ioBroker.govee-smart/wiki/Geraete) |
| 每个数据点，它落在哪里，它的作用是什么 | [状态树](https://github.com/krobipd/ioBroker.govee-smart/wiki/State-Tree) | [数据点]](https://github.com/krobipd/ioBroker.govee-smart/wiki/Datenpunkte) |
| 温度计、加热器、水壶等 — 状态树、更新、故障排除 | [传感器和设备](https://github.com/krobipd/ioBroker.govee-smart/wiki/Sensors-and-Appliances) | [Sensoren und Appliances](https://github.com/krobipd/ioBroker.govee-smart/wiki/Sensoren-und-Appliances) |
| 灯光 — 段数计数、向导、切割灯条、批量命令 | [细分](https://github.com/krobipd/ioBroker.govee-smart/wiki/Segments) | [细分](https://github.com/krobipd/ioBroker.govee-smart/wiki/Segmente) |
| 灯光 — 场景库、速度滑块、云端快照与本地快照 | [场景和快照](https://github.com/krobipd/ioBroker.govee-smart/wiki/Scenes-and-Snapshots) | [Szenen und Snapshots](https://github.com/krobipd/ioBroker.govee-smart/wiki/Szenen-und-Snapshots) |
| 灯光 — 组扇出，能力交叉 | [群组](https://github.com/krobipd/ioBroker.govee-smart/wiki/Groups) | [群组](https://github.com/krobipd/ioBroker.govee-smart/wiki/Gruppen) |
| 文件夹命名、启动、诊断、故障排除 | [行为](https://github.com/krobipd/ioBroker.govee-smart/wiki/Behavior) | [维哈尔滕](https://github.com/krobipd/ioBroker.govee-smart/wiki/Verhalten) |
| 文件夹命名、启动、诊断、故障排除 | [行为](https://github.com/krobipd/ioBroker.govee-smart/wiki/Behavior) | [行为](https://github.com/krobipd/ioBroker.govee-smart/wiki/Verhalten) |

---

＃＃ 特征
- **功能驱动型** — 状态由 Govee API 报告的每个设备的信息生成。无需硬编码 SKU，也无需手动维护设备列表，避免信息滞后。
- **面向灯光设备的局域网优先** — 支持UDP组播发现、低于50毫秒的命令响应时间，并通过AWS IoT MQTT进行状态更新
- **云端 + MQTT 推送，支持传感器和设备** — 通过 App API 接收读数，通过 OpenAPI MQTT 代理接收事件。
- **针对具备相应功能的LED灯条，实现逐段颜色和亮度调节**，包括批量命令和可视化的分段检测向导（带有实时、可校正的灯条图），适用于切割后的灯条。
- **场景、自定义场景、音乐模式、渐变切换** — 尽可能通过 BLE over LAN 在本地激活，否则回退到云端。
- **云端和本地快照** — Govee 应用快照和 ioBroker 端快照并排显示
- **群组** — 将 Govee 群组桥接到 ioBroker，实现成员间的功能交叉
- **每个设备一个诊断导出按钮** — 一键导出 JSON 格式的错误报告
- **无需凭证即可使用** — 开箱即用时仅限局域网，每个凭证等级解锁更多功能
- **限速云使用** — 每日和每分钟预算均与 Govee 的配额保持一致

---

## 哨兵/错误报告
**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 仅当您在 ioBroker 诊断中启用错误报告功能（**系统设置 → 诊断和错误报告**）时，才会进行报告。仅传输匿名安装 ID，不包含姓名、电子邮件地址或 IP 地址。

有关详细信息以及如何禁用此功能，请参阅 [Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)。错误报告需要 js-controller 3.0 或更高版本。

---

＃＃ 要求
- Node.js 版本 >= 22
- ioBroker js-controller >= 7.2.2
- ioBroker 管理员版本 >= 8.0.1
- 一个 Govee 帐户和至少一个 Govee WiFi 设备。LAN 控制需要 Govee Home 应用程序中启用 LAN 模式的灯——请参阅 Govee 的[LAN 支持的设备列表](https://app-h5.govee.com/user-manual/wlan-guide)。

---

＃＃ 入门
该适配器仅支持局域网连接，无需任何凭证。添加 API 密钥即可解锁场景、分段和设备控制功能。添加您的 Govee 邮箱和密码后，即可获取传感器读数（通过 App API 获取温度/湿度数据）、实时状态推送和完整的群组控制功能。有关凭证级别、如何获取 API 密钥以及网络要求，请参阅 [设置页面](https://github.com/krobipd/ioBroker.govee-smart/wiki/Setup)。

---

## 设备支持
每个设备在 `diag.tier` 下显示其测试状态。[设备页面](https://github.com/krobipd/ioBroker.govee-smart/wiki/Devices) 列出了所有支持的型号及其状态含义。

---

## 故障排除
常见问题（未发现设备、场景下拉菜单为空、段颜色未更改、组命令有限、状态更新延迟）已在 Wiki [行为](https://github.com/krobipd/ioBroker.govee-smart/wiki/Behavior) / [Verhalten](https://github.com/krobipd/ioBroker.govee-smart/wiki/Verhalten) 页面上介绍。

对于其他任何情况，请在受影响的设备上将 **`diag.export`** 设置为 `true`，从 `diag.result` 复制 JSON，然后打开 [GitHub 问题](https://github.com/krobipd/ioBroker.govee-smart/issues)。

---

## 致谢
该适配器的 MQTT 认证和 BLE over LAN (ptReal) 协议实现参考了 Wez Furlong 的 [govee2mqtt](https://github.com/wez/govee2mqtt) 研究成果。他们对 Govee AWS IoT MQTT 协议和未公开 API 端点的逆向工程极具价值。

---

＃＃ 支持
- [Wiki](https://github.com/krobipd/ioBroker.govee-smart/wiki) — 用户文档（英文/德文）
- [GitHub Issues](https://github.com/krobipd/ioBroker.govee-smart/issues) — 错误报告、功能请求
- [ioBroker 论坛](https://forum.iobroker.net/) — 一般问题

### 支持开发
这个适配器是免费开源的。如果您觉得它有用，可以考虑请我喝杯咖啡：

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.24.0 (2026-08-04)

- This version needs ioBroker Admin 8. The segment detection wizard is built for Admin 8 and no longer runs on Admin 7, so this update is not offered there.

### 2.23.1 (2026-08-04)

- Test release during the move to ioBroker Admin 8.

### 2.23.0 (2026-08-04)

- Test release during the move to ioBroker Admin 8.

### 2.22.0 (2026-07-23)

- A Govee app device group of the "same mode" type no longer appears as a phantom, uncontrollable device in the object tree.
- Seven more Govee models join the catalog, from Edison bulbs to a ceiling fan. They start as experimental — enable them in the adapter settings to try them.
- Sensors that reach the cloud through a Govee gateway now show which gateway they are connected through, instead of an empty IP field.

### 2.21.0 (2026-07-12) — stable

- The segment-detection wizard for cut LED strips now has a visual admin interface: a live map of the strip that fills in as you measure each segment and can be corrected before you apply it.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

---

_Developed with assistance from Claude.ai_