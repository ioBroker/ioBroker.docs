---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fakeroku/README.md
title: <img src="https://cdn.jsdelivr.net/gh/iobroker-community-adapters/ioBroker.fakeroku@master/admin/fakeroku.svg" width="48" align="top" /> ioBroker.fakeroku
hash: PNfvfuq6BoUvvHXVSfMMQoSibS9YWdZxtbTOVyu0lIs=
---
# <img src="https://cdn.jsdelivr.net/gh/iobroker-community-adapters/ioBroker.fakeroku@master/admin/fakeroku.svg" width="48" align="top" /> ioBroker.fakeroku

![npm 版本](https://img.shields.io/npm/v/iobroker.fakeroku)
![稳定的](https://iobroker.live/badges/fakeroku-stable.svg)
![安装](https://iobroker.live/badges/fakeroku-installed.svg)
![npm 下载](https://img.shields.io/npm/dt/iobroker.fakeroku)
![节点](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![执照](https://img.shields.io/badge/license-MIT-green)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)

在您的局域网中模拟一个或多个**Roku设备**，以便ECP/SSDP遥控器（例如Logitech Harmony Hub或Sofabaton X1/X2）可以触发ioBroker中的事件。它是Logitech Harmony适配器的**输入**对应物：遥控器上的按钮会变成ioBroker中的一个数据点。

与经典的仿 Roku 不同，此版本支持完整的 Roku 控制界面，包括 `/query/device-info`，并且是**当前**版本的 Roku，因此它不仅适用于经典的 Harmony 中心。

**官方 Roku 移动应用不受支持。** 它通过 Roku 专有的、未公开的 ECP-2 WebSocket 通道驱动 Roku 设备，而此模拟器并未实现该通道。请使用 Harmony Hub 或 Sofabaton——它们支持此适配器所支持的经典 ECP 协议。

＃＃ 特征
- 在局域网上模拟一个或多个 Roku 设备——通过 HTTP 的 Roku 控制协议 (ECP) 以及端口 1900 上的 SSDP 发现。
- 完整的 Roku 控制界面，包括 `/query/device-info` 以及最新的 Roku 版本，超出了经典 Harmony 中心的需求。
- 每个设备都有干净的数据模型：一个 `command` 数据点加上固定的 `keys.<Key>` 状态，全部预先创建。
- 从单个实例模拟多个 Roku；发现绑定到选定的网络接口；命令处理限制在局域网内。

＃＃ 要求
- Node.js 版本 >= 22
- js-controller >= 7.2.2
- 管理员版本 >= 7.8.23

＃＃ 安装
从ioBroker管理后台安装适配器。

＃＃ 配置
- **网络接口** — 模拟 Roku 设备绑定并通告的网卡

开启。将其设置为“所有接口”，适配器即可开箱即用——它会自动检测可路由的 IP 地址。仅在主机配备多张网卡时才选择特定地址。

- **模拟 Roku 设备** — 作为卡片进行管理：**+ 添加** 将打开一个对话框

**名称**、**ECP端口**（`8060`是真正的Roku端口；系统会预先选择一个空闲端口，如果名称或端口已被占用，对话框将拒绝输入）和**类型**。您可以在一个实例中模拟多个Roku设备——每个设备都需要自己的端口。

- **类型** — *播放器*（默认）显示 16 个标准导航和播放键；

*TV* 还会显示音量、电源、频道和输入源按键。仅当您希望将这些额外按键作为 ioBroker 触发器时才选择 *TV*。

要将模拟的 Roku 添加到 Harmony 中心，请在 Harmony 应用中添加“Roku”设备，并将其指向 ioBroker 主机。

## 对象
对于每个模拟的 Roku (`fakeroku.0.<name>`):

| 数据点 | 类型 | 含义 |
|---|---|---|
| `.command` | 字符串，只读 | 最后一条命令的纯文本形式（`Home`、`Lit_a`、`launch:12`、`search:news`）。所有内容仅一个数据点——避免每个字符对应一个对象的冗余。 |
| `.keys.<Key>` | 布尔值，只读 | 每个遥控按键对应一个状态，该状态由设备类型决定——例如，*播放器* 有 16 个导航/播放键，*电视* 则增加了音量*、电源、频道*、HDMI/AV 输入键——所有这些都预先创建。按下按键会使其短暂变为 `true`；按下/抬起按键会保持该状态。 |
| `.keys.<Key>` | 布尔值，只读 | 每个遥控按键对应一个状态，该状态由设备类型决定——例如，*播放器* 拥有 16 个导航/播放键，*电视* 则增加了音量*、电源、频道*、HDMI/AV 输入键——所有这些按键都预先创建。按下按键会使其短暂变为“真”状态；按下/松开按键会保持该状态。 |

自由键盘输入（`Lit_x`）和应用程序启动仅显示在`.command`中——它们没有自己的对象。

> 注意：Roku 遥控器发送的播放和暂停命令是**相同的** `Play`，因此 > 在这里无法区分播放和暂停——这是协议的限制，而不是适配器的限制。

＃＃ 用法
在脚本或 Blockly 规则中，对某个键做出反应——例如，当 `fakeroku.0.<name>.keys.Play` 变为 `true` 时，或者监视 `.command` 以获取最后一个按钮的文本。

＃＃ 历史
fakeroku 在 ioBroker 上有着悠久的历史，这个版本延续了这一传统——对于现有用户来说，它只是同一个适配器的新版本：

- **[Pmant](https://github.com/Pmant)** 于 2017 年创建了 fakeroku 并构建了最初的版本

Roku 模拟：SSDP 发现、ECP 界面和多设备支持。

- **[Apollon77](https://github.com/Apollon77)** 保持了测试和构建工具的更新

在接下来的几年里。

- **ioBroker 社区适配器](https://github.com/iobroker-community-adapters)**

团队（特别是 [mcm1957](https://github.com/mcm1957) 和 [foxriver76](https://github.com/foxriver76)）从 2023 年到 2026 年维护并更新了适配器，发布了最高版本 0.5.1。

从 **0.6.0** 版本开始，[krobi](https://github.com/krobipd) 重写了适配器。

完全用 TypeScript 编写，并添加了完整的 ECP 表面，包括 `device-info`。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.0 (2026-08-05)
- (krobipd) First stable release — version 1.0.0 marks the complete rewrite as the mature, supported version of the adapter.
- (krobipd) Upgrading from an older version now shows a one-time notice that the button data points changed from text to real boolean values, so scripts and visualizations can be checked.

### 0.6.0 (2026-08-05)
- (krobipd) Complete rewrite. The adapter now answers the full Roku control surface — including device-info with a current Roku version — so Logitech Harmony and Sofabaton remotes pair and work reliably.
- (krobipd) Works out of the box: it detects the network address to advertise on its own, no manual interface picking.
- (krobipd) Manage multiple emulated Rokus from the admin UI, each as a Player or a TV.
- (krobipd) Cleaner object tree — one datapoint per remote button with the correct types, plus a last-command datapoint; leftover objects from older versions are removed on start.

### 0.5.1 (2026-08-05)
- (mcm1957) Adapter requires Node.js >= 22 now
- (mcm1957) Dependencies have been updated

### 0.5.0 (2026-07-30)
- Complete rewrite with the full Roku control surface, including `device-info` with a current Roku version — the part modern remotes check at pairing, beyond what a classic Harmony hub needs
- New clean data model: a `command` datapoint plus fixed `keys.<Key>` states, all created up front instead of appearing only after the first keypress
- Discovery binds to the chosen network interface, command handling is restricted to the local network

### 0.4.0 (2026-03-07)
- Adapter requires node.js >= 20, admin >= 7.7.22, js-controller >= 6.0.11

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2017-2023 Pmant <patrickmo@gmx.de>  
Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2026 krobi <krobi@power-dreams.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---

_Developed with assistance from Claude.ai_