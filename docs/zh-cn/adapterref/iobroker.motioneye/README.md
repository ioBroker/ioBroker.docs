---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.motioneye/README.md
title: ioBroker 适配器，适用于 MotionEye
hash: MngFxWSppDM8hsTAl4lZqY4xQ01OZrvtxHqVMzRGj9U=
---
![标识](../../../en/adapterref/iobroker.motioneye/admin/motioneye.png)

![安装数量](https://iobroker.live/badges/motioneye-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/motioneye-stable.svg)
![NPM 版本](https://nodei.co/npm/iobroker.motioneye.svg?style=shields&data=v,u,d&color=orange)
![下载](https://img.shields.io/npm/dm/iobroker.motioneye.svg)
![社区](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)
![维护者](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)
![人工智能](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)
![PayPal捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# IoBroker 适配器，适用于 MotionEye
---

## 此适配器的功能
将 MotionEye 摄像头连接到 ioBroker，实现运动检测、快照和实时流传输。通过 ioBroker 或 VIS 控制检测模式（`off` / `still` / `sharp`），并为任何支持 HTML 的小部件提供 `streamUrl` HTML——无需简单的 API 即可实现 Webhook。

## 文档
- 🇺🇸 [文档](docs/en/README.md)
- 🇩🇪 [文档](docs/de/README.md)

常见问题解答和故障排除（Docker/Unraid，`unauthorized`，VIS 流）：[EN](docs/en/faq.md) · [DE](docs/de/faq.md)

＃＃ 特征
- ioBroker 中的用户自定义相机名称（独立于 MotionEye 标签）
- `motioneye.0.<name>.*` 下的动态通道（文件夹名称全部小写）
- 内置 webhook 服务器 — 无需 simple-api 依赖
- MotionEye 配置 API 同步模式和 webhook URL
- `_info.connection` — 实例显示 MotionEye 何时无法连接
- VIS 重新渲染后重新链接同级流（多摄像头仪表盘）

## 数据点
### 每个摄像头 (`motioneye.0.<name>.*`)
频道文件夹名称为小写（例如 `innenhof_ii`、`auffahrt`）。

| 状态 | 类型 | 读取 | 写入 | 描述 |
|-------|------|------|-------|-------------|
| `mode` | 值 | 是 | 是 | `off` / `still` / `sharp` |
| `snapshot` | 按钮 | 否 | 是 | 触发快照 |
| `stream` | 开关 | 是 | 是 | 实时 MJPEG 流开/关 |
| `streamPulse` | 按钮 | 否 | 是 | 短暂开启流媒体（自动关闭） |
| `streamUrl` | 文本 | 是 | 否 | HTML `<img>` 用于 html 小部件 |
| `status` | 文本 | 是 | 否 | 上次同步状态 |
| `lastAction` | 文本 | 是 | 否 | 上次 API 操作 |
| `webhookUrl` | url | 是 | 否 | 已写入 MotionEye 的 URL |
| `motionEyeId` | 值 | 是 | 否 | MotionEye 摄像头 ID |
| `motionEyeName` | 文本 | 是 | 否 | MotionEye 中的原始名称 |
| `motionEyeName` | 文本 | 是 | 否 | MotionEye 中的原始名称 |

### 每个相机设备设置（`motioneye.0.<name>.settings.*`）
| 状态 | 类型 | 读取 | 写入 | 描述 |
|-------|------|------|-------|-------------|
| `framerate` | 级别 | 是 | 是 | 以 fps 为单位捕获帧率 |
| `availableResolutions` | 文本 | 是 | 否 | 支持的分辨率（以逗号分隔） |
| `rotation` | 级别 | 是 | 是 | 视频旋转 `0` / `90` / `180` / `270` |
| `autoBrightness` | 开关 | 是 | 是 | 自动亮度开启/关闭 |
| `privacyMask` | 开关 | 是 | 是 | 隐私遮罩开/关（遮罩区域在 MotionEye 用户界面中绘制；参见 [常问问题](docs/en/faq.md#device-settings-settings)） |
| `隐私遮罩` | 开关 | 是 | 是 | 隐私遮罩开/关（遮罩区域在 MotionEye 用户界面中绘制；请参阅[常见问题解答](docs/en/faq.md#device-settings-settings)） |

> MotionEye 中仅本地 v4l2/USB 摄像头可设置亮度/对比度/饱和度/色调，网络 (RTSP/MJPEG) 摄像头不可设置，因此它们不会作为数据点公开。

### 每个摄像头的文字叠加（`motioneye.0.<name>.overlay.*`）
| 状态 | 类型 | 读取 | 写入 | 描述 |
|-------|------|------|-------|-------------|
| `enabled` | 开关 | 是 | 是 | 文字叠加开/关 |
| `rightText` | 文本（下拉菜单） | 是 | 是 | 与 `leftText` 相同的选项 |
| `customLeftText` | 文本 | 是 | 是 | 当 `leftText = custom-text` 使用时 |
| `customRightText` | 文本 | 是 | 是 | 当 `rightText = custom-text` 使用时 |
| `textScale` | 级别 | 是 | 是 | 文本大小，`1`–`10` |
| `textScale` | 级别 | 是 | 是 | 文本大小，`1`–`10` |

> 将 `leftText`/`rightText` 设置为 `custom-text` 时，也应设置 `customLeftText`/`customRightText` — 否则 MotionEye 将显示空白文本。请参阅 [常问问题](docs/en/faq.md#text-overlay-overlay)。

> 这些数据点也可以在**叠加层**配置选项卡中为每个摄像机预设（一次配置多个摄像机时非常方便）。参见[配置](#configuration) 和 [常见问题解答]](docs/en/faq.md#text-overlay-overlay)。

### 每个摄像头的存储空间 (`motioneye.0.<name>.storage.*`)
| 状态 | 类型 | 读取 | 写入 | 描述 |
|-------|------|------|-------|-------------|
| `snapshotCount` | 值 | 是 | 否 | 已存储快照的数量 |
| `usedSpaceMb` | 值 | 是 | 否 | 已占用空间（快照 + 视频），单位为 MB |
| `lastRefresh` | 文本 | 是 | 否 | 上次成功刷新的时间戳 |
| `refresh` | 按钮 | 否 | 是 | 立即刷新 |
| `刷新` | 按钮 | 否 | 是 | 立即刷新 |

刷新操作需要 MotionEye 递归扫描并检查每个存储的文件，对于拥有大型媒体库的摄像机来说，速度可能会很慢。此操作不属于常规状态轮询的一部分——您可以通过 `refresh` 手动刷新，或者在“存储”配置选项卡中启用慢速自动刷新（`storagePollEnabled` + `storagePollIntervalSec`，默认禁用），您还可以在此处将个别摄像机从自动刷新中排除，同时保留手动刷新的 `refresh` 数据点。请参阅 [常问问题](docs/en/faq.md#storage-storage)。

### 实例 (`motioneye.0._info.*`)
| 状态 | 类型 | 描述 |
|-------|------|-------------|
| `_info.connection` | 布尔值 | MotionEye 可达 |
| `_info.lastSync` | 文本 | 上次状态轮询时间戳 |
| `_info.motionEyeVersion` | 文本 | MotionEye 服务器版本 |
| `_info.motionVersion` | 文本 | 动态守护进程版本 |
| `_info.motionVersion` | 文本 | 动态守护进程版本 |

＃＃ 安装
1. 从 ioBroker 管理界面安装适配器
2. 创建一个新实例
3. 配置**设置**：MotionEye 主机、端口、凭据（可选）、Webhook 主机
4. 在“摄像头”选项卡中添加摄像头（显示名称、MotionEye ID、可选媒体文件夹）
5. 保存并重启实例——数据点将被创建，Webhook URL 将被写入 MotionEye。

### MotionEye 版本兼容性
| MotionEye | 适配器 | 备注 |
|-----------|---------|-------|
| **0.43.x** | 0.4.x 或 **0.5.0+** | URL 签名认证 |
| **0.44+** | **0.5.0+** 要求 | 会话登录 (`POST /login`)；即使 Web 登录正常，适配器 0.4.x 也显示 `unauthorized` |
| **0.43.x** | **0.5.0+** | 安全升级 — 向下兼容 |

详情：[常见问题解答 EN](docs/en/faq.md#motioneye-044-adapter-050) · [常见问题解答 DE](docs/de/faq.md#motioneye-044-adapter-050)

### 相机模式
| 模式 | 移动侦测 | 视频录制 | Webhook |
|------|------------------|-----------------|---------|
| `off` |没有|没有|没有|
| `sharp` | 是 | 运动触发 MP4 | 是 |
| `锐化` | 是 | 运动触发 MP4 | 是 |

＃＃ 配置
| 选项 | 默认值 | 描述 |
|--------|---------|-------------|
| `motionHost` | *(空)* | MotionEye 服务器主机名或 IP 地址（必填） |
| `motionEyeUser` | `admin` | MotionEye 登录用户 |
| `motionEyePassword` | *(空)* | MotionEye 密码（明文，加密存储） |
| `webhookHost` | *(必填)* | ioBroker 主机 IP 地址或主机名，可从 MotionEye 访问（用于 webhook URL） |
| `webhookPort` | `8090` | 内置 webhook 监听端口 |
| `motionResetMs` | `15000` | webhook 后自动重置 `.motion` |
| `statusPollIntervalSec` | `300` | MotionEye 状态轮询间隔 |
| `useMotionEyeConfig` | `true` | 写入模式、webhook URL 和流开关至 MotionEye（正常使用时保持启用） |
| `useMotionEyeConfig` | `true` | 向 MotionEye 写入模式、webhook URL 和流开关（正常使用时保持启用） |

每个摄像头（摄像头选项卡）：可选的**媒体文件夹**名称，位于 `/var/lib/motioneye` 下（例如，`Bambu` 而不是默认的 `Camera8`）。启用配置同步后，在适配器启动时应用。不会重命名磁盘上已存在的文件夹。

`storagePollEnabled`（默认值 `false`）和 `storagePollIntervalSec`（默认值 `3600`）位于**存储**选项卡中，而不是此处——请参见下文。

### 叠加选项卡
一个专门的**叠加层**选项卡预设了每个摄像机的`overlay.*`数据点（启用、文本左右方向、自定义文本、文本大小），表格中每行对应一个摄像机，数据来自“摄像机”选项卡。此操作为单向操作，不会将实时数据点更改读取回表格中：

- **新相机**：首次创建时，已填写的字段将成为初始数据点值。
- **现有相机**：填写的字段仅在点击**立即应用叠加设置**后生效——无需保存/重启。
- 空字段始终表示“保持不变”。

详情请参见[常问问题](docs/en/faq.md#text-overlay-overlay)。

### 存储选项卡
专门的**存储**选项卡包含了`storage.*`的所有内容：全局自动刷新开关/间隔、一个表格（每行代表一台摄像机，带有一个**排除自动刷新**复选框（默认关闭））以及一个**立即刷新存储统计信息**按钮：

- **启用存储统计信息自动刷新**（`storagePollEnabled`，默认关闭）+ **间隔（秒）**（`storagePollIntervalSec`，默认为`3600`）：自动刷新的全局开关和频率。
- **排除自动刷新复选框**（每个摄像机，默认未选中）：选中此项可跳过媒体库较大的不重要摄像机，以便在自动刷新间隔运行时跳过它们——它们的 `storage.*` 数据点仍会随时通过 `storage.refresh` 触发器进行更新。
- **立即刷新存储统计信息**：立即刷新表格中的每个摄像头——无需保存/重启，并忽略“排除”复选框（手动单击始终会刷新所有列出的摄像头）。

详情请参见[常问问题](docs/en/faq.md#storage-storage)。

＃＃ 支持
如果您喜欢我们的作品并希望支持我们，我们非常感谢您的任何捐赠。

（此链接指向我们的PayPal账户，与ioBroker无关。）

[![捐赠](img/support.png)](https://www.paypal.com/donate?hosted_button_id=7W6M3TFZ4W9LW)

## 较早的更改
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## Changelog

<!--
  ### **WORK IN PROGRESS**
-->
### 0.10.0 (2026-07-10)
- (skvarel) Fixed `snapshot` action failing with `404 not found` on some MotionEye/Motion combinations: snapshots are now triggered via MotionEye's own authenticated `/action/{id}/snapshot` endpoint (same connection as everything else) instead of a direct, unauthenticated call to Motion's raw webcontrol port. The `motionPort` setting is no longer needed and has been removed.

### 0.9.0 (2026-07-05)
- (skvarel) Per-camera storage stats under `storage.*`: snapshot count, video count, and occupied space in MB (`storage.snapshotCount`, `storage.videoCount`, `storage.usedSpaceMb`, `storage.lastRefresh`), refreshed on demand via `storage.refresh`
- (skvarel) New **Storage** config tab: global auto-refresh on/off switch + interval (`storagePollEnabled`, `storagePollIntervalSec`, off by default), a per-camera "Exclude from auto-refresh" checkbox to skip unimportant cameras, and a button to refresh all listed cameras immediately

### 0.8.0 (2026-07-04)
- (skvarel) New **Overlay** config tab: preset `overlay.*` (enabled/leftText/rightText/customLeftText/customRightText/textScale) per camera in a table, with a button to apply the table to already-running cameras immediately; values only ever flow from the config table to the datapoints, never back, so live datapoint changes are never overwritten on a restart

### 0.7.0 (2026-07-03)
- (skvarel) Per-camera text overlay under `overlay.*`: read and control overlay on/off, left/right text mode (camera name / timestamp / custom text / disabled), custom text strings, and text size (`overlay.enabled`, `overlay.leftText`, `overlay.rightText`, `overlay.customLeftText`, `overlay.customRightText`, `overlay.textScale`); `leftText`/`rightText` and their custom text are always saved together, in any order
- (skvarel) Fixed a race condition where setting two `settings.*` datapoints for the same camera at nearly the same time could silently drop one of the changes ("lost update"); config writes per camera are now serialized

### 0.6.1 (2026-07-03)
- (skvarel) Fixed privacy mask regions not surviving adapter restarts/updates: mask lines are now persisted to the settings channel's native config instead of only in memory

## License

MIT License

Copyright (c) 2026 skvarel <skvarel@inventwo.com>

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