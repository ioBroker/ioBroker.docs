---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.yamaha/README.md
title: <img src="https://cdn.jsdelivr.net/gh/iobroker-community-adapters/ioBroker.yamaha@master/admin/yamaha.svg" width="48" align="top" /> ioBroker.yamaha
hash: +YtGbtXS8CaTUQ5dtzvxBO6kEZY+AWsc+vnYjGT3q4I=
---
# <img src="https://cdn.jsdelivr.net/gh/iobroker-community-adapters/ioBroker.yamaha@master/admin/yamaha.svg" width="48" align="top" /> ioBroker.yamaha

![npm 版本](https://img.shields.io/npm/v/iobroker.yamaha)
![稳定的](https://iobroker.live/badges/yamaha-stable.svg)
![安装](https://iobroker.live/badges/yamaha-installed.svg)
![npm 下载](https://img.shields.io/npm/dt/iobroker.yamaha)
![节点](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![执照](https://img.shields.io/badge/license-MIT-green)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support%20me-ff5e5b?logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)

通过 ioBroker 在本地网络上控制 AV 接收器和 MusicCast 设备。它将雅马哈使用的三种协议——YNCA（联网接收器的文本控制协议）、MusicCast / Yamaha Extended Control（MusicCast 一代更丰富的 JSON 协议）以及 2010 年之前最老型号的传统 XML 协议——整合到一个对象树中。

＃＃ 特征
- **三种协议，一个适配器** — YNCA、MusicCast（雅马哈扩展控制）以及 2010 年前型号的传统 XML 协议
- **协议并行运行** — MusicCast 接收器将 YNCA 功放控制与 MusicCast 多房间功能、均衡器和媒体功能集成在一个对象树中。
- **即时更新** — MusicCast推送了更改，YNCA通过其实时连接进行了报道
- **自愈连接** — 离线接收器在应答后自动加入；单个协议可自行重新连接，而其他协议则继续运行。
- **类型化数据点** — 布尔值、下拉列表和带单位和范围的数字，而不是纯文本
- **预设和收藏夹** — 按编号调用调谐器预设和已存储的网络/USB收藏夹，逐个切换预设，并读取已存储的列表及其名称（MusicCast）；在MusicCast设备上调用最近播放的曲目
- **时钟和闹钟视图** — MusicCast 桌面音频设备会显示其时钟和闹钟设置
- **基于功能** — 状态根据每个设备报告的信息生成，没有硬编码的型号列表
- **自动发现** — 设备列表为空时，系统会在启动时查找并设置 MusicCast 设备
- **设备管理器** — 接收器作为管理卡，包含型号、地址、实时协议指示器和设备类型图标（接收器、立体声、扬声器、条形音箱、CD）

＃＃ 要求
- Node.js 版本 >= 22
- js-controller >= 7.2.2
- 管理员版本 >= 7.8.23

端口
- **UDP 41100（监听）** — MusicCast 设备将其更改事件推送到 ioBroker 主机上的此端口。
- **UDP 1900（组播，出站）** — 启动时的 SSDP 发现搜索。
- **TCP 50000（出站）** — 与每个接收器的 YNCA 控制连接。
- **TCP 80（出站）** — 向每个设备发送 MusicCast 和 XML 协议请求。

＃＃ 配置
设备在管理后台以卡片的形式进行管理。**如果列表为空**，适配器会在启动时自动查找网络上的 MusicCast 设备；或者，您也可以通过 **“+”对话框**按 IP 地址添加设备，以便仅运行这些设备。默认情况下，设备发现功能会搜索所有网络接口；可选的**网络接口**选择器可将其限制为仅搜索一个网络接口。

较老的雅马哈接收机（2010 年左右之前，使用 XML 协议）不会在网络上自动广播自身信息，必须手动添加。**XML 查询间隔** 设置了轮询接收机的频率（默认为 60 秒）。

“数据点”部分用于开启或关闭整组数据点，包括“播放”、“调谐器”、“多房间”、“HDMI”、“场景”、“声音”、“高级”和“时钟与闹钟”。关闭的数据点组会从树状结构中移除，甚至不会被查询，这也能加快启动速度；放大器核心（电源、音量、静音、输入、声音程序、睡眠）始终保持开启状态。

## 州树
每个接收器都会成为一个设备节点，并被划分为不同的主题组——这些主题组与**数据点**开关控制的组相同。系统只会创建设备报告的数据。

- **放大器核心**（始终开启）— 电源、音量、静音、输入、声音程序、睡眠，以及设备信息，包括型号、固件和连接。
- **`播放器`** — 每个播放源（Spotify、USB、服务器、网络电台、CD 等）一个通道，显示播放状态、艺术家、专辑、曲目、封面和传输按钮。
- **`调谐器`** — AM/FM 和 DAB 收音机，包括 RDS 文本和频率。
- **`多房间`** — 区域 2–4、B 区、所有区域的开关（主电源、派对模式）以及 MusicCast 设备组，位于其自己的 `multiroom.group` 文件夹中。
- **`hdmi`** — HDMI 输出和唇音同步。
- **`场景`** — 接收者的场景名称和场景回忆。
- **`声音`** — 音调和声音处理：低音/高音、DSP 模式、增强器、均衡器、……
- **`高级`** — 设置级数据点：最大/初始音量、扬声器配置、输入名称。
- **`clock`** — MusicCast 桌面音频设备的时钟和闹钟设置（只读）。

## 故障排除
### 从 0.5.x 版本升级
版本 1.0.0 为完全重建版本。更新后的首次启动时，旧数据点（`volume`、`power`、`Commands.*`、`Realtime.*` 等）将被移除，接收器将重新创建为一个设备；其 IP 地址将自动迁移。请将脚本和可视化指向新的路径——例如，指向 `yamaha.0.<device>.power` 而不是 `yamaha.0.power`。

### 未自动找到接收器
只有 MusicCast 设备会在网络上自动发现自身——旧款接收器必须通过“+”对话框手动添加。如果主机具有多个网络接口，但发现设备数量为空，请检查网络接口设置。

### 数据点缺失
请检查“数据点”设置中的组切换开关，并记住树状结构仅包含您的设备报告的数据。区域数据点位于 `multiroom` 下，而不是顶层。

### 数值更新缓慢
如果 MusicCast 的变化每隔几分钟才刷新一次，则表示另一个应用程序占用了 UDP 端口 41100，适配器已回退到轮询模式——启动日志记录了这一点。

首次启动需要一些时间
首次连接时，适配器会询问接收器支持哪些功能——每个 YNCA 设备最多需要半分钟。结果会被记住，之后启动速度更快。

＃＃ 历史
雅马哈适配器在 ioBroker 上有着悠久的历史，这个版本延续了这一传统——对于现有用户来说，这只是同一个适配器的新版本：

- **[soef](https://github.com/soef)** 于 2015 年创建了该适配器并构建了

对雅马哈 XML 网络协议的原始控制，具有实时状态更新和多区域支持。

- **[Garfonso](https://github.com/Garfonso)**, **[Sneak-L8](https://github.com/Sneak-L8)**

在接下来的几年里，**[阿波罗77](https://github.com/Apollon77)** 做出了贡献——管理员兼容性、修复和 Sentry 崩溃报告。

- **ioBroker 社区适配器](https://github.com/iobroker-community-adapters)**

团队（特别是 [foxriver76](https://github.com/foxriver76) 和 [mcm1957](https://github.com/mcm1957)）从 2020 年到 2026 年维护了该适配器，发布了最高版本 0.5.4。

自 2026 年以来，[krobi](https://github.com/krobipd) 一直在社区中维护该适配器。

组织并从头开始重建，将 YNCA、MusicCast (YXC) 和传统 XML 协议统一到一个对象树下。

＃＃ 支持
- [ioBroker 论坛](https://forum.iobroker.net/)
- [GitHub Issues](https://github.com/iobroker-community-adapters/ioBroker.yamaha/issues)

### 支持开发
这个适配器是免费开源的。如果您觉得它有用，可以考虑请我喝杯咖啡：

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.2.0 (2026-08-25)

- (krobipd) Fixed: volume writes work again — a written -38 dB reached the receiver as -3.8 dB, so most values were ignored; all numeric controls now send the proper wire format (#612)
- (krobipd) Fixed: the FM frequency datapoint now shows MHz (it was mislabelled kHz) and accepts direct frequency writes in the form the tuner expects.
- (krobipd) New: preset selection — recall tuner presets by number with up/down stepping, and recall stored network or USB favourites per source on YNCA receivers (#613)
- (krobipd) New: MusicCast selection lists — stored favourites and tuner presets with names, a recently-played list with recall by number, and the device's own allowed values as dropdowns.
- (krobipd) New: more device detail — CD track and drive info, DAB and RDS station data, and a read-only clock and alarm view with its own datapoint group switch in the admin settings.

### 1.1.1 (2026-08-22)

- (krobipd) Changed: Internal cleanup. No user-facing changes.

### 1.1.0 (2026-08-22)

- (krobipd) Fixed: a device carried over from the old adapter is no longer called by its IP — the object folder and the admin card now show the name the device reports, or its model.
- (krobipd) Improved: a device that has not reported a model yet already carries its device-class symbol instead of none.

### 1.0.1 (2026-08-22)

- (krobipd) Complete rebuild: one adapter now speaks YNCA, MusicCast and the legacy XML protocol — every protocol a device answers runs in parallel on one object tree.
- (krobipd) New object tree with typed datapoints built from what your device reports. Old datapoints are removed automatically, the address is carried over — point scripts at the new paths.
- (krobipd) Instant updates: MusicCast push events and the live YNCA connection replace polling; connections heal themselves, and one protocol's hiccup reconnects just that protocol.
- (krobipd) Auto-discovery sets up MusicCast devices by itself when the device list is empty, and the admin shows every receiver as a card with model, address and protocol indicators.
- (krobipd) Whole datapoint groups such as playback sources, tuner, multiroom or scenes can be switched off in the admin — and are then not even queried from the device.
- (krobipd) The multiroom folder tells the scope at a glance: switches that affect all zones say so in their name, and the MusicCast device group has its own `multiroom.group` folder.
- (krobipd) Every device shows a type icon — receiver, stereo receiver, speaker, soundbar or CD system, detected from the reported model — in the object tree and on its admin card; the adapter logo now stays readable in light and dark mode.
- (krobipd) Upgrading from 0.5.x shows a one-time notice explaining the new object tree before the update installs.
- (mcm1957) version has been rebuilt due to deploy problems

### 0.5.4 (2024-06-14) — stable

- (foxriver76) updated packages

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2015-2024 soef <soef@gmx.net>  
Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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