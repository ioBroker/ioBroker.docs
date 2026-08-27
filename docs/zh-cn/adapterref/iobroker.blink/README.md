---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.blink/README.md
title: ioBroker.blink
hash: 190YhbHrYbLP+3ERX1vgiGvnd/q6WJ+/ImR/p6tUi6o=
---
![标识](../../../en/adapterref/iobroker.blink/admin/blink.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.blink.svg)
![下载](https://img.shields.io/npm/dm/iobroker.blink.svg)
![安装数量](https://iobroker.live/badges/blink-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/blink-stable.svg)

# IoBroker.blink
## IoBroker 的 blink 适配器
ioBroker Blink摄像头适配器。

## 支持的设备
此适配器适用于 Blink 家庭安全摄像头和相关的 Blink 帐户设备。

制造商网站：[眨](https://blinkforhome.com/) 设备概览：[Blink产品](https://blinkforhome.com/products) 支持/设备文档：[Blink 支持](https://support.blinkforhome.com/)

此适配器与 Blink 或亚马逊没有任何关联，也并非由其维护或认可。

＃＃ 入门
通过 ioBroker 管理界面安装 ----------------------------------------------------------------------------------------- 填写您的凭据： <img width="2356" height="880" alt="图像" src="https://github.com/user-attachments/assets/cdc22784-309f-4514-bfe4-abb93625958c" /> ----------------------------------------------------------------------------------------- <img width="2364" height="1044" alt="图像" src="https://github.com/user-attachments/assets/fc9e9a79-f512-4675-b0f0-e6a998a91894" /> -----------------------------------------------------------------------------------------

＃＃ 特征
- 连接到 Blink 云
- 轮询摄像头并同步模块状态
- 支持手动快照
- 存储实时快照
- 下载最新可用的云视频
- 允许启用或禁用运动检测
- 支持电池警告状态和通知
- 支持对已分类的运动事件进行智能检测状态（仅适用于付费云服务）
- 支持通过本地服务器在 8085 端口播放云端存储的视频和 SD 卡上的本地存储视频（SyncModule 2 和 XR） - 需要 JavaScript，请参见下文！
- 该脚本需要安装 ffmpeg，如果您有很多摄像头，则需要大量资源，因此仅部分适用于树莓派（至少 4GB 内存——越多越好）。
- 初始版本支持每台摄像机的实时预览功能（需配合 JavaScript 使用） - 所需的 JavaScript 会自动安装 - 旧款 XT2 除外，因为它使用不同的视频流
- 通过 `commands.start_live` / `commands.stop_live` 实现实验性的原生 LiveView 会话（无需 JavaScript 辅助函数/ffmpeg），详见下文“真正的 LiveView 会话”。

<img width="1388" height="414" alt="图像" src="https://github.com/user-attachments/assets/f6446647-c3d5-4cc2-b7e7-1b2a3686424a" />

## Blink 适配器：数据点
自定义 ioBroker 适配器 `blink.0` 提供的所有数据点概览。

状态：已重构以支持云历史记录和本地存储回退，并在 v0.0.37/0.0.38 版本中添加了实验性的原生 LiveView 会话。

## 惯例
- `<CamID>` — 数字式相机 ID（例如 `1754227`）。也用于 MP4 文件名中。
- `<NetID>` — 同步模块/家庭网络的网络 ID（例如 `174553`）。
- `<N>` — 视频历史记录的槽位索引，**0 = 最新**片段，**9 = 最旧**片段。

所有 MP4 和快照文件都存储在配置的快照目录中（默认值：`/opt/iobroker/iobroker-data/blink/`）。

---

## 适配器全局变量
| 数据点 | 类型 | 描述 |
|---|---|---|
| `blink.0.info.connection` | 布尔值 | `true` 表示适配器是否与 Blink 云建立了有效的会话。 |
| `blink.0.info.account_id` | 字符串 | Blink 帐户 ID，供内部使用，以便可选的 LiveView 辅助脚本能够找到正确的帐户。 |

---

## 摄像头数据点
每个摄像机都有自己的通道 `blink.0.cameras.<CamID>`，具有以下子结构。

### `info` – 主数据
| 数据点 | 类型 | 描述 |
|---|---|---|
| `info.name` | 字符串 | Blink 应用中的显示名称（例如“车道”、“露台”）。 |
| `info.serial` | 字符串 | 相机序列号。 |
| `info.type` | 字符串 | 摄像头型号/Blink API 类型（`camera`、`owl`、`mini`、`doorbell`）。 |
| `info.account_id` | 字符串 | Blink 账户 ID，每个摄像头对应一个，用于 LiveView 辅助脚本。 |
| `info.account_id` | 字符串 | Blink 账户 ID，每个摄像头对应一个 ID，用于 LiveView 辅助脚本。 |

### `status` – 当前传感器状态
| 数据点 | 类型 | 描述 |
|---|---|---|
| `status.armed` | 布尔值 | 摄像头已启用（跟随网络模式）。 |
| `status.battery_raw` | 数字 | 转换前的原始传感器值。 |
| `status.battery_text` | 字符串 | 人类可读的注释，例如，对于没有电池的型号，则为 `not available`。 |
| `status.battery_volt` | 数字 | 电池电压，单位为伏特（`V`）。 |
| `status.temperature` | 数字 | 相机传感器处的温度，单位为摄氏度 (单位 `°C`)。 |
| `status.temperature_f` | 数字 | 温度（单位：华氏度，`°F`）。 |
| `status.temperature_text` | 字符串 | 温度以格式化文本形式表示，例如，对于没有传感器的型号，则显示为 `not available`。 |
| `status.wifi_strength` | 数字 | Wi-Fi 信号强度，单位为 dBm（`dBm`）。 |
| `status.motion_detect_enabled` | 布尔值 | 启用/禁用摄像头上的运动检测（只读反射；使用 `commands.motion_detect` 进行更改）。 |
| `status.last_update` | 字符串 | 上次状态刷新的时间戳（ISO 格式）。 |
| `status.last_update` | 字符串 | 上次状态刷新的时间戳（ISO 格式）。 |

#### 智能检测（仅限已激活 Blink 订阅的用户）
摘自摄像头最新的云端视频片段：

| 数据点 | 类型 | 描述 |
|---|---|---|
| `status.smart_detection` | 布尔值 | 最后一个片段中至少存在一次智能检测命中。 |
| `status.detection_type` | 字符串 | 以逗号分隔的已检测到的类型列表。 |
| `status.motion_source` | 字符串 | 片段的触发器：`pir`、`cv_motion` 等。 |
| `status.person_detected` | 布尔值 | 检测到人员。 |
| `status.vehicle_detected` | 布尔值 | 检测到车辆。 |
| `status.animal_detected` | 布尔值 | 检测到动物。 |
| `status.package_detected` | 布尔值 | 检测到包裹。 |
| `status.package_detected` | 布尔值 | 检测到软件包。 |

### `battery` – 扩展电池状态
用于避免重复通知。

| 数据点 | 类型 | 描述 |
|---|---|---|
| `battery.low` | 布尔值 | 电池电量极低。 |
| `battery.lastMessage` | 字符串 | 发送的最后一条低电量警告信息的文本（例如通过 Pushover/Telegram）。 |
| `battery.lastWarning` | 字符串 | 上次低电量警告的时间戳（ISO）。 |
| `battery.lastWarning` | 字符串 | 上次低电量警告的时间戳（ISO）。 |

### `live` – 快照和实时流
| 数据点 | 类型 | 描述 |
|---|---|---|
| `live.file` | 字符串 | 磁盘上最新快照的绝对路径。 |
| `live.mime_type` | 字符串 | 快照的 MIME 类型（例如 `image/jpeg`）。 |
| `live.timestamp` | 字符串 | 快照时间戳（ISO）。 |
| `live.stream_active` | 布尔值 | 当前正在轮询的 MJPEG 实时流（网页网格辅助程序）。 |
| `live.stream_url` | 字符串 | 当前 MJPEG 实时流的 URL（网页网格辅助工具，TTL 限制）。 |
| `live.mode` | 字符串 | 实验性原生 LiveView 会话的模式（例如 `idle`，活动模式名称）。 |
| `live.active` | 布尔值 | `true` 当原生 LiveView 会话 (`commands.start_live`) 运行时。 |
| `live.url` | 字符串 | 当前原生 LiveView 会话的播放 URL。 |
| `live.expires_at` | 字符串 | 当前原生 LiveView 会话的过期时间戳（ISO）。 |
| `live.last_error` | 字符串 | 原生 LiveView 会话的最后一个错误（如有）。 |
| `live.session_id` | 字符串 | 当前原生 LiveView 会话的 ID。 |
| `live.backend` | 字符串 | 用于服务原生 LiveView 会话的后端。 |
| `live.unsupported` | 布尔值 | `true` 如果此相机型号不支持原生实时取景会话（例如，较旧的 XT/XT2）。在这种情况下，`commands.start_live` 无效。 |
| `live.unsupported` | 布尔值 | 如果此相机型号不支持原生实时取景会话（例如，较旧的 XT/XT2），则为 `true`。在这种情况下，`commands.start_live` 无效。 |

### `video` – 当前视频
这是摄像头的最新视频。默认首选云端存储；如果需要，则回退到本地存储（同步模块 2 USB 闪存盘）。

| 数据点 | 类型 | 描述 |
|---|---|---|
| `video.file` | 字符串 | MP4 文件的绝对路径 (`<CamID>_latest.mp4`)。 |
| `video.id` | 字符串 | 来自 Blink API 的唯一剪辑 ID。 |
| `video.size` | 数字 | 文件大小（字节）。 |
| `video.ready` | 布尔值 | 文件已成功下载并可播放。 |
| `video.lastError` | 字符串 | 上次下载错误。`""` = 正常，否则显示类似 `no video available` 的消息。 |
| `video.lastError` | string | 上次下载错误。`""` = 正常，否则显示类似“无可用视频”的消息。 |

### `video.history.0` … `video.history.9` – 环形画廊
每台摄像机有**10个槽位**，分别存储最近的10个视频片段。

**槽位0 = 最新视频片段**，槽位9 = 最旧视频片段。每当上传新视频片段时，槽位都会自动轮换（最旧视频片段会被移除）。

| 数据点 | 类型 | 描述 |
|---|---|---|
| `video.history.<N>.file` | 字符串 | MP4 文件的绝对路径 (`<CamID>_history_<N>.mp4`)。每个槽位使用固定的文件名 ⇒ VIS 中的稳定 URL。 |
| `video.history.<N>.timestamp` | 字符串 | 剪辑内容的时间戳（ISO）。 |
| `video.history.<N>.source` | 字符串 | 剪辑来源：`cloud` 或 `local_storage`。如果插槽未使用，则为空。 |
| `video.history.<N>.source` | 字符串 | 视频片段的来源：`cloud` 或 `local_storage`。如果插槽未使用，则为空。 |

### `commands` – 触发数据点
设置为 `true` → 执行操作，适配器自动重置为 `false`。（`commands.motion_detect` 是唯一例外——它是一个持久的开/关开关，而不是自重置触发器。）

| 数据点 | 类型 | 操作 |
|---|---|---|
| `commands.snapshot` | 布尔值 | 请求新的快照（以 Base64 状态存储）。 |
| `commands.fetch_video` | 布尔值 | 下载最新视频。智能逻辑：优先使用云端存储，然后回退到本地存储。 |
| `commands.live_request` | 布尔值 | 打开 MJPEG 实时流（网页网格辅助程序，TTL 约 60 秒）。 |
| `commands.start_live` | 布尔值 | 启动一个实验性的原生 LiveView 会话（无需 JavaScript 辅助程序/ffmpeg）。结果显示在 `live.url` / `live.mode` / `live.session_id` 下。 |
| `commands.stop_live` | 布尔值 | 停止通过 `commands.start_live` 启动的原生 LiveView 会话。 |
| `commands.motion_detect` | 布尔值 | 切换摄像头的运动检测功能（持久开关，不会自动重置）。 |
| `commands.clear_session` | 布尔值 | 清除身份验证会话（以防登录问题）。 |
| `commands.clear_session` | 布尔值 | 清除身份验证会话（以防登录问题）。 |

---

## 同步模块/网络
每个同步模块都有自己的通道 `blink.0.sync.<NetID>`。**注意：**状态路径使用 `network_id`，而不是实际的同步模块设备 ID。

### `info` – 主数据
| 数据点 | 类型 | 描述 |
|---|---|---|
| `info.name` | 字符串 | 网络名称（例如“Home”）。 |
| `info.serial` | 字符串 | 同步模块序列号。 |

### `status` – 状态
| 数据点 | 类型 | 描述 |
|---|---|---|
| `status.armed` | 布尔值 | 网络已启用（启用所有摄像头的移动侦测功能）。 |
| `status.last_update` | 字符串 | 上次刷新的时间戳（ISO）。 |

### `commands` – 触发器
| 数据点 | 类型 | 操作 |
|---|---|---|
| `commands.armed` | 布尔值 | 设置整个网络处于布防 (`true`) 或撤防 (`false`) 状态。影响此网络中的所有摄像机。 |

---

## 快照目录中的文件布局
默认路径：`/opt/iobroker/iobroker-data/blink/`

| 文件 | 描述 |
|---|---|
| `<CamID>_latest.mp4` | 摄像机的最新视频（参见 `video.file`）。 |
| `<CamID>_snapshot.jpg` | 如果通过 `commands.snapshot_file` 保存，则为最后一张快照。 |
| `<CamID>_snapshot.jpg` | 如果是通过 `commands.snapshot_file` 保存的，则为最后一张快照。 |

文件名**每个槽位保持不变**，内容会随轮换而变化。对于网页嵌入，请在查询字符串中使用缓存清除符（`?t={timestamp}`），以便浏览器实际重新加载新文件。

---

### 可选视频存档
该适配器可以将下载的 MP4 视频片段复制到单独的存档目录，例如已挂载的 NAS 路径。存档功能是可选的，默认情况下处于禁用状态。

归档设置在适配器管理界面中配置：

* `启用视频存档`：启用将下载的 MP4 视频片段复制到存档目录。
* `归档目录`：已归档 MP4 文件的绝对路径，例如 `/opt/iobroker/iobroker-data/blink-archive`。
* `创建相机子文件夹`：为每个相机创建一个存档子文件夹。
* `网格中每个摄像机的最大存档片段数`：限制网页网格中每个摄像机显示的存档片段数。

启用归档功能后，适配器还会将当前视频状态和视频历史记录中已有的本地 MP4 文件回填到归档文件中。摄像机网格会在 `Archive` 导航按钮下方显示已归档的片段，这些片段按片段时间戳排序，并按片段 ID 去重。

在 `blink.0.archive` 下创建以下归档状态：

| 状态 | 类型 | 描述 |
| --- | --- | --- |
| `archive.enabled` | 布尔值 | 显示适配器配置中是否启用了归档。 |
| `archive.directory` | 字符串 | 显示已配置的归档目录。 |
| `archive.lastFile` | 字符串 | 上次用于归档的源 MP4 文件。 |
| `archive.lastTarget` | 字符串 | 上次成功复制的 MP4 文件的归档目标路径。 |
| `archive.lastSuccess` | 字符串 | 最后一次成功归档副本的时间戳。 |
| `archive.lastError` | 字符串 | 上次归档错误信息（如有）。 |
| `archive.lastError` | 字符串 | 上次归档错误信息（如有）。 |

归档状态是只读状态指示器。请在适配器配置中更改归档设置，而不是写入这些状态。

---

## VIS 集成技巧
在 VIS 中进行**实时预览**：

```
{cameras.1754227.video.file}      → absolute path
{cameras.1754227.video.timestamp} → use for cache-busting
{cameras.1754227.video.ready}     → if false, show a "no video" hint
{cameras.1754227.video.lastError} → if non-empty, show as error status
```

对于**历史图库**，请分别查询第 0-9 个条目：

```
{cameras.1754227.video.history.0.file}
{cameras.1754227.video.history.0.timestamp}
{cameras.1754227.video.history.0.source}
... through slot 9
```

`source = "cloud"` 表示视频片段直接来自 Blink 云端（速度快，无需通过 U 盘上传）。

`source = "local_storage"` 表示视频片段通过云端从 Sync Module 2 USB 存储设备上传。

## 注释
- 电池供电警告通过 `battery.*` 状态处理。
- 没有内置电池的设备，例如 Mini/Owl/PanTilt 等设备，不包含在电池警告范围内。
- 在这种情况下，`battery.lastMessage` 被设置为 `no built in battery`。
- 当获取快照或启用实时快照时，实时图像状态会更新。
- 仅当适配器配置中启用流媒体时，MJPEG 流状态才相关。
- 原生 LiveView 会话状态（`live.mode`、`live.active`、`live.url` 等）与 MJPEG 网络网格助手无关；在旧款相机型号上调用 `commands.start_live` 之前，请检查 `live.unsupported`。
- 当 Blink Cloud 提供分类运动元数据时，智能检测状态会更新。

## 可选的 LiveView Web 网格
适配器可以选择性地安装和更新 LiveView Web 网格的辅助脚本。

此辅助脚本创建于 ioBroker JavaScript 适配器命名空间中，如下所示：

```text
script.js.common.blink-video-url-server
```

这是有意为之，仅用于可选的网页网格/LiveView辅助功能。具有相同对象ID的现有用户脚本可能会被覆盖。如果您维护此脚本的自定义版本，请在启用或更新此功能之前创建备份。

> **注意：** 此 Web 网格辅助功能与上述原生 LiveView 会话（`commands.start_live` / `live.url`）是两个独立的功能。原生会话不需要 JavaScript 适配器或 `ffmpeg`，如果您只需要在 VIS 或其他集成中使用单个摄像头的实时 URL，则建议从原生会话开始。

＃＃＃ 要求
LiveView Web 网格需要：

* ioBroker JavaScript 适配器
* 已在主机系统上安装 `ffmpeg` 并已添加到 `PATH` 中
* 支持使用当前 IMMI/MCLV LiveView 流程的 Blink 摄像头
* 从 ioBroker 主机到 Blink 云服务的网络访问

在 Debian/Ubuntu 系统上，通常可以使用以下命令安装 `ffmpeg`：

```bash
sudo apt update
sudo apt install ffmpeg
```

### 相机兼容性
并非所有 Blink 摄像头都提供相同的实时预览流程。

使用当前 IMMI/MCLV LiveView 流的摄像机可以转换为 HLS 流以供 Web 网格使用。较旧的基于 XT/XT2/LFR 的摄像机可能无法通过此方法提供可用的流。在这种情况下，适配器会检测到不支持的 LiveView 状态，并禁用该摄像机的 LiveView 按钮，而不是启动一个损坏的流。同样的 `live.unsupported` 标志也适用于原生 LiveView 会话 (`commands.start_live`)。

### 备注
LiveView Web 网格是一项便捷功能。核心适配器功能（例如登录、设备发现、运动状态、电池状态、缩略图和视频下载）不需要 JavaScript 辅助脚本或 `ffmpeg`。

LiveView Web 网格辅助脚本仅在基于 Linux 的 ioBroker 安装中受支持。它使用 Linux 路径和进程命令，例如 `/opt/iobroker`、`/tmp`、`/usr/bin/node`、`nohup` 和 `pkill`。核心适配器功能保持平台无关性，但 LiveView Web 网格功能需要 Linux 主机。

## 免责声明
所有产品和公司名称或标识均为其各自所有者的商标™或注册商标®。使用这些名称或标识并不意味着与上述所有者或其任何关联子公司有任何关联或得到其认可！此个人项目为业余时间维护，不以盈利为目的。Blink 是 Amazon Technologies, Inc. 的商标。

## Changelog

Older entries are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.0.38 (2026-07-13)
* Added units for temperature and battery voltage states.
* Removed duplicate detail roles for Fahrenheit temperature and secondary live URL states.

### 0.0.37 (2026-07-13)
* Fixed button command states to use `read: false` as required for `role: button`.
* Fixed object hierarchy by creating `cameras`, `sync`, `video.history` and video history slots as folders where they contain child objects.
* Fixed remaining English object names for smart detection and live URL states.
* Fixed device information roles for name, serial number and camera model states.
* Added dBm unit metadata for Wi-Fi signal strength states.

### 0.0.36 (2026-07-12)
* Fixed remaining admin checker warnings for archive translations.
* Normalized admin UI translation keys for streaming settings.
* Normalized English runtime labels and debug messages.
* Documented that the LiveView web grid helper requires Linux.

### 0.0.35 (2026-07-12)
* Fixed remaining admin checker warnings for archive translations.

### 0.0.34 (2026-07-12)
* Fixed admin JSON configuration layout warnings.
* Updated archive admin translations.

## License

MIT License

Copyright (c) 2026 Pischleuder1 <pischleuder@gmx.de>

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