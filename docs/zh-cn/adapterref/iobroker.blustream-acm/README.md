---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.blustream-acm/README.md
title: ioBroker.blustream-acm
hash: WM9idrhDJNPp0YpPYf0WY/YaRdSPfim+FOwHpryGUws=
---
# IoBroker.blustream-acm

![NPM 版本](https://img.shields.io/npm/v/iobroker.blustream-acm.svg)
![下载](https://img.shields.io/npm/dm/iobroker.blustream-acm.svg)
![安装数量](https://iobroker.live/badges/blustream-acm-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/blustream-acm-stable.svg)
![NPM](https://nodei.co/npm/iobroker.blustream-acm.png?downloads=true)

**测试：** ![测试与发布](https://github.com/AlanSRU/ioBroker.blustream-acm/workflows/Test%20and%20Release/badge.svg)

## Blustream ACM 矩阵控制器（适用于 ioBroker）
用于控制 Blustream ACM 高级控制模块，实现 HDMI over IP 音视频分配。通过控制器的 Telnet 接口发现已连接的发射器和接收器，并显示每个设备的路由/状态。可用命令和状态取决于您在适配器配置中选择的控制器型号。

> **已从 `iobroker.blustream-acm200` 重命名。** 此适配器现在支持多种 ACM 模型，因此不再与 ACM200 名称绑定。现有的 `blustream-acm200.0` 安装必须在新命名空间 `blustream-acm.0` 下重新配置。

### 支持的硬件
- **ACM200** — [Blustream ACM200](https://www.blustream.com/product/acm200/)（路由 + 发射器音频源）
- **ACM210** — 路由、分离（IR/RS232/USB/CEC）、输出电源/静音、Dante 音频矩阵 + ARC
- **ACM500** — 路由、断开连接、输出功率/静音
- **ACM1000** — 路由、分离、输出功率/静音、Dante 音频矩阵 + ARC
- **制造商：** [Blustream](https://www.blustream.com/)

此适配器与 Blustream 无任何关联，也未获得 Blustream 的认可；所有商标均属于其各自所有者。

＃＃ 特征
- 自动发现已连接的发射器和接收器
- 模型感知功能 — 适配器仅创建所选模型支持的状态并接受所选模型支持的命令
- 视频/音频路由控制（组合式和独立式，每个流）
- IR/RS232/USB/CEC 流的分离路由（ACM210/500/1000）
- 输出功率和静音控制（ACM210/500/1000）
- Dante/模拟/HDMI音频矩阵和ARC控制（ACM210/1000）
- 发射器音频源选择（HDMI / ANA）
- “路由到所有显示器”命令（音频+视频、仅视频、仅音频）
- 对所有设备进行状态监控
- 预览图像 URL（由控制器的内置捕获端点提供）

＃＃ 安装
从 ioBroker 管理界面安装适配器（适配器 → 搜索“blustream”）。

＃＃ 配置
### 主要设置
- **控制器型号**：选择您的 ACM 控制器型号（ACM200 / ACM210 / ACM500 / ACM1000）。这将决定哪些命令和状态可用。
- **IP 地址**：您的 ACM 控制器的 IP 地址（默认值：192.168.0.225）
- **端口**：Telnet 端口（默认值：23）

＃＃＃ 高级设置
- **轮询间隔（毫秒）**：轮询状态更新的频率（默认值：30000）。必须至少为命令超时时间的两倍，以便每次轮询完成后才能开始下一次轮询——如果值过低，系统会自动提高轮询间隔，并在日志中写入警告。
- **命令超时（毫秒）**：发送到控制器的单个命令的超时时间（默认值：10000，最小值：1000）。如果大型系统在日志中报告命令超时，则应提高此值。

## 州
只有当所选控制器模型支持该功能时，才会创建标记为 _(model)_ 的状态。

＃＃＃ 系统
- `info.connection` — 与控制器的连接状态
- `system.status.connected` — 与 info.connection（旧版）相同
- `system.status.lastUpdate` — 上次状态更新的时间戳
- `system.status.nextScheduledRefresh` — 下一次夜间完整刷新运行的时间
- `system.status.lastFullRefresh` — 上次完整刷新的时间戳
- `system.status.fullRefreshRunning` — 当正在进行完全刷新时为 True
- `system.commands.routeAll` — 写入一个发射器 ID，将音频和视频路由到所有显示器
- `system.commands.routeAllVideo` — 写入一个发射器 ID，以将视频路由到所有显示器
- `system.commands.routeAllAudio` — 写入一个发射器 ID，将音频仅路由到所有显示器

#### 刷新命令
两个刷新按钮的功能不同：

- `system.commands.refresh` — 发送一条 `STATUS` 查询，与常规轮询使用的查询相同。它会在一条命令中更新所有设备的路由、名称和在线状态。此命令开销很小；建议在 ioBroker 外部进行更改后使用此命令。
- `system.commands.refreshAll` — 查询 `IN<id>` / `OUT<id>` 中所有已知设备的信息，以补充 `STATUS` 命令未报告的设备详细信息（固件版本、MAC 地址、输出模式、分离路由）。每个设备发送一条命令，因此耗时明显更长。此外，它还会在夜间 02:45 到 03:15 之间的随机时间自动运行一次，以避免多个实例同时轮询。

### 发射器（每个发射器）
- `transmitters.<id>.id` — 发射器 ID
- `transmitters.<id>.name` — 显示名称
- `transmitters.<id>.ip` — IP 地址
- `transmitters.<id>.connected` — 连接状态
- `transmitters.<id>.edid` — EDID 设置
- `transmitters.<id>.audioSource` — 音频源选择（HDMI/ANA）
- `transmitters.<id>.audioMatrixMode` — _(ACM210/1000)_ 输入端音频矩阵路径（HDMI/模拟/Dante）
- `transmitters.<id>.previewUrl` — 预览图像的 URL（如果启用预览服务）

### 接收器（每个接收器）
- `receivers.<id>.id` — 接收者 ID
- `receivers.<id>.name` — 显示名称
- `receivers.<id>.ip` — IP 地址
- `receivers.<id>.connected` — 连接状态
- `receivers.<id>.route` — 音频+视频组合路由（输入发射器 ID）
- `receivers.<id>.videoRoute` — 仅视频路由
- `receivers.<id>.audioRoute` — 仅音频路由
- `receivers.<id>.irRoute` / `.rs232Route` / `.usbRoute` / `.cecRoute` — _(ACM210/500/1000)_ 分离路由（写入发送器 ID）
- `receivers.<id>.power` — _(ACM210/500/1000)_ 输出电源开/关
- `receivers.<id>.mute` — _(ACM210/500/1000)_ 输出静音开/关
- `receivers.<id>.audioOutputMode` — _(ACM210/1000)_ 输出端音频矩阵路径
- `receivers.<id>.arcMode` — _(ACM210/1000)_ ARC 模式（关闭/HDMI/光纤）
- `receivers.<id>.resolution` — 输出分辨率
- `receivers.<id>.previewUrl` — 预览图像的 URL

## 使用示例
将发射器 2 的信号路由到接收器 1：

```javascript
setState('blustream-acm.0.receivers.001.route', '002');
```

将发射器 3 的信号路由到所有接收器：

```javascript
setState('blustream-acm.0.system.commands.routeAll', '003');
```

## 故障排除
- 如果适配器无法连接，请验证 IP 地址、端口，并确认控制器的 telnet 接口已启用。
- 确保配置的**控制器型号**与您的硬件匹配——错误的型号可能会发送您的设备无法理解的命令或隐藏它支持的状态。
- 如果启动后缺少发射器或接收器，则通过 `system.commands.refresh` 触发刷新。
- 在管理 → 实例 → 日志级别中启用调试日志记录，以查看 telnet 流量。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.3.2 (2026-08-07)
- (Alan Paris) Fixed: the adapter stopped retrying for good if the controller was unreachable at start or when a cable was pulled
- (Alan Paris) Fixed: a command timing out while queued removed the wrong queue entry
- (Alan Paris) Command Timeout now applies to all commands, not just the handshake; default raised 5000 to 10000 ms
- (Alan Paris) Routing writes are validated; a non-numeric transmitter id is rejected instead of sent to the controller
- (Alan Paris) The nightly full refresh is now spread over 02:45-03:15 instead of firing at exactly 03:00
- (Alan Paris) Polling interval is floored at twice the command timeout
- (Alan Paris) Preview URLs are only rewritten when the previewed source changes
- (Alan Paris) Clarified the refresh and refreshAll button labels; existing installs are updated on start
- (Alan Paris) Corrected the Command Timeout help text in the configuration UI
- (Alan Paris) Per-device detail parsing logs at debug level instead of flooding the info log
- (Alan Paris) Receiver mode shows Matrix or Video Wall instead of the raw MX and VW tokens
- (Alan Paris) A transient object database error during a status parse no longer stops the instance

### 0.3.1 (2026-07-17)
- (Alan Paris) Object role corrections for ioBroker repository review: per-device `connected` states now use `indicator.reachable`; transmitter/receiver `id` states use the `text` role
- (Alan Paris) Remove a stale command-timeout comment

### 0.3.0 (2026-07-17)
- (Alan Paris) Renamed adapter from `blustream-acm200` to `blustream-acm` to reflect multi-model support
- (Alan Paris) Added a Controller Model setting (ACM200 / ACM210 / ACM500 / ACM1000); states and commands are now model-aware
- (Alan Paris) Added breakaway routing (IR/RS232/USB/CEC) and output power/mute for ACM210/500/1000
- (Alan Paris) Added Dante/analogue/HDMI audio matrix and ARC control for ACM210/1000
- (Alan Paris) Preview image URLs now use the configured controller host instead of a hardcoded address

### 0.2.4 (2026-07-03)
- (Alan Paris) Remove unused username/password settings — the ACM200 telnet interface requires no login
- (Alan Paris) Transmitter/receiver name states are now read-only (they are reported by the device and cannot be set from the adapter)
- (Alan Paris) Validate and clamp polling interval and command timeout to safe ranges
- (Alan Paris) Add Blustream product/manufacturer links to the documentation

### 0.2.3 (2026-07-03)
- (Alan Paris) Resolve adapter-checker errors: use framework-managed timers, add missing config help translations, and clean up redundant devDependencies

**Older changes have been moved to [CHANGELOG_OLD.md](CHANGELOG_OLD.md)**

## License

MIT License

Copyright (c) 2026 Alan Paris <alan.paris@scottish.rugby>

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