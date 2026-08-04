---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.siku/README.md
title: ioBroker.siku
hash: CTR15LRZLi2/9Z5eGgOOGNmBlsB8297HeVnxE33zN0g=
---
![标识](../../../en/adapterref/iobroker.siku/admin/siku.svg)

![NPM 版本](https://img.shields.io/npm/v/iobroker.siku.svg)
![下载](https://img.shields.io/npm/dm/iobroker.siku.svg)
![安装数量](https://iobroker.live/badges/siku-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/siku-stable.svg)
![NPM](https://nodei.co/npm/iobroker.siku.png?downloads=true)

# IoBroker.siku
**测试：** ![测试与发布](https://github.com/ChrMaass/ioBroker.siku/workflows/Test%20and%20Release/badge.svg)

＃＃ 概述
此适配器可将 **SIKU RV V2** 家用通风设备以及 **Oxxify smart** 系列的兼容设备集成到 ioBroker 中。此表述明确包括以 **Oxxify.smart 30**、**Oxxify.smart 50** 和 **Oxxify.smart 50 K** 为品牌销售的设备。

当前存储库状态的目标是为本地网络操作提供功能完整的**公开测试版**，并支持官方 ioBroker `latest` 的接入。

＃＃ 特征
- 基于制造商文档协议的UDP通信
- 在**一个**适配器实例中支持多设备
- 本地网络中的广播发现
- 基于 JSON 配置的多设备管理页面
- 默认情况下，每 24 小时进行一次单独的 RTC 时间检查。
- 基于上次检查尝试时间戳的重启持久型 RTC 调度
仅当超过配置的漂移阈值时才进行时间同步
- 主要运行参数的基于状态的控制
- 通过 ioBroker 状态进行完整的每周日程映射，每 15 分钟读取一次数据包大小安全的数据
- 风扇速度、风扇模式和定时器模式的本地化枚举标签
- 可读的本地时间戳伴随状态，用于轮询和发现时间戳
- 每个设备的密码在其嵌套配置路径下加密，并受到保护，防止普通配置读取。
- 每个ioBroker主机使用一个适配器实例，以避免UDP端口冲突

## 支持的核心功能
- 通过广播发现主设备（`0x007C`，`0x00B9`）
- 通过稳定的设备 ID 管理多个设备
- 轮询状态、传感器和诊断值
- 通过状态写入中心参数，例如：
  - 力量
风扇速度
- 手动风扇速度
- 风扇模式
- 定时器模式
- 湿度设定点
- 传感器启用标志
- 使用一次性只写复位命令，随后进行读取操作，而不是不安全的重试。
- 每周日程安排结构，例如：
- `schedule.monday.p1.speed`
- `schedule.monday.p1.endHour`
- `schedule.monday.p1.endMinute`
- ...直至`schedule.sunday.p4.*`
- 诊断值，例如：
- 筛选倒计时
- 营业时间
- 报警级别
- 滤芯更换指示
- 上次发现/上次投票/上次时间检查

## 设备参考
该适配器专为 SIKU RV V2 系列产品（例如 **SIKU RV 50 W Pro WiFi V2**）、**Oxxify smart** 系列兼容设备以及同一协议系列的相关设备而设计。

当前兼容性措辞和搜索词明确涵盖 **Oxxify.smart 30**、**Oxxify.smart 50**、**Oxxify.smart 50 K**、**Oxxify smart**、**Oxxify smart 30**、**Oxxify smart 50**、**Oxxify smart 50 K** 以及兼容的应用程序控制分散式热回收通风装置。

- 厂商产品页面：[SIKU RV 50 W Pro WiFi V2](https://www.siku.at/SIKU-RV-50-W-Pro-WiFi-V2/50523)
- 制造商概览：[SIKU 产品](https://www.siku.at/en/products/)
- 兼容系列概述：[Oxxify分散通风](https://raumluft-shop.de/lueftung/dezentrale-lueftungsanlage-mit-waermerueckgewinnung/oxxify.html)
- 兼容产品示例：[Oxxify.smart 30](https://raumluft-shop.de/oxxify-smart-30.html) 和 [Oxxify.smart 50](https://raumluft-shop.de/oxxify-smart-50.html)
- 官方移动应用描述：[App Store 上的 SIKU RV WIFI](https://apps.apple.com/at/app/siku-rv-wifi/id1444515926)

＃＃ 发展
实用脚本：

| 脚本 | 目的 |
| -------------------- | ---------------------------------------------- |
| `npm run build` | 编译 TypeScript 源代码 |
| `npm run lint` | 运行 ESLint |
| `npm run test` | 运行单元测试和打包测试 |
| `npm run coverage` | 强制执行并报告 TypeScript 测试覆盖率 |
| `npm run dev-server` | 启动本地 ioBroker 开发环境 |
| `npm run release` | 通过发布工具创建正式版本/标签 |
| `npm run release` | 通过发布工具创建正式版本/标签 |

该适配器使用官方 ioBroker 工具生成，并用 TypeScript 开发。

## CI / CD
- 正常的拉取请求会在代码检查、类型检查和单元覆盖率检查之后运行精简的 Ubuntu 冒烟测试。
- Dependabot pull requests 在自动合并之前会运行完整的受支持操作系统/Node.js 矩阵。
- `main` 运行与发布相关的 Linux/macOS/Windows 矩阵，这是 ioBroker 存储库接收所必需的。
- 由于 ioBroker 控制器在 Windows 系统中的启动速度明显较慢，因此仍然提供单独的计划/手动 Windows 回归工作流程以进行额外的检查。
- 运行时更改可以在 `main` 成功运行后自动获得补丁版本；文档、测试、工作流和仅用于开发的依赖项更新不会创建空版本。
- 带标签的版本通过可信发布直接从 GitHub Actions 发布到 npm。
- GitHub Releases 由标准的 ioBroker 部署操作自动创建，并生成发行说明。

## 出版准备
[发布说明.md](RELEASING.md)中提供了简短的版本和存储库检查清单。

## Beta 版说明
- 发现、轮询、时间检查和计划读取功能已在多个真实设备上得到验证。
- 实时写入测试有意保持保守。
- 网络/服务功能（例如 Wi-Fi 重新配置、密码更改或恢复出厂设置）故意不作为正常的可写状态公开。

## 高级消息框 API
该适配器向脚本和集成公开以下 `sendTo` 命令：

- `discover`：运行 UDP 广播发现。如果没有显式密码，适配器将尝试默认密码和所有密码。

在最多 10 秒的接收窗口内，最多可接收 16 个已配置的设备密码。配置更新仅对从 ioBroker 管理实例路由的调用返回和应用；其他调用者将收到 `discoveryFoundNotSaved`。

- `syncTimeAll`：对所有已配置的设备运行手动 RTC 检查/同步。
- `syncTimeDevice`：通过 `deviceId` 对已配置的设备运行手动 RTC 检查/同步。
- `readDevice`：从显式提供的 IPv4/设备 ID 目标读取选定的原始协议参数以进行诊断。

诊断响应 `readDevice` 将数据包元数据和返回的参数值序列化为十六进制字符串。设备密码永远不会返回；响应仅包含 `passwordLength`。

供应商的 UDP 协议在传输过程中（包括设备发现期间）不会加密传输其简短的设备密码。请仅在受信任的、隔离的本地网络中运行适配器。上述管理员来源检查是用于配置处理的消息路由保护机制，并非针对 ioBroker 内部已运行的恶意代码的安全边界。

## Changelog

<!-- Release script placeholder for the next version. Keep this heading at the start of a line. -->
### **WORK IN PROGRESS**

### 0.2.3 (2026-07-26)

- Harden RTC scheduling, UDP shutdown/error handling, malformed response isolation, schedule write recovery and
  password/object lifecycle behavior.

### 0.2.2 (2026-07-11)

- Harden repository-checker compatibility for nested password protection, compact-mode CI scripts and release recovery.

### 0.2.1 (2026-07-10)

- Create the localized fan-speed text state object before writing its value.

### 0.2.0 (2026-07-10)

- Correct nested encryption and migration of per-device passwords from earlier beta versions.
- Harden UDP response correlation and write-only reset handling to prevent stale or repeated commands.
- Restrict fan-speed writes to protocol-defined values and expose localized enum labels.
- Persist the 24-hour RTC schedule across restarts and keep clock reads outside normal polling.
- Split weekly schedule reads into protocol-size-safe chunks and refresh them every 15 minutes.
- Extract the object factory and operation scheduler, expand tests and enforce coverage in CI.
- Modernize ioBroker dependencies, release actions and automatic patch-release classification.

### 0.1.8 (2026-06-09)

- Cleaned up unused Admin translations found during the adapter checklist review.
- Documented the advanced messagebox commands for script/integration use.
- Added a code-side upper bound for the RTC time sync drift threshold.

Older changelog entries are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 Christian Maaß <christian@maass.it>

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