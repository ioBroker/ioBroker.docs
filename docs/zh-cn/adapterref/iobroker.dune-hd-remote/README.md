---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.dune-hd-remote/README.md
title: ioBroker.dune-hd-remote
hash: hrNpuqf2X/dmmuNWLYcD1naPNozwZxs6BsIZSo1qtoE=
---
# IoBroker.dune-hd-remote
![标识](../../../en/adapterref/iobroker.dune-hd-remote/admin/dune-hd-remote.png)

通过 ioBroker 的 IP 网络控制 [沙丘高清版](https://dune-hd.com/) 媒体播放器。

[沙丘高清版](https://dune-hd.com/) 生产高品质网络媒体播放器，支持 4K HDR 播放、蓝光以及多种媒体格式。所有基于 Linux 的 Dune HD 播放器均支持通过 HTTP API 进行 IP 控制，此适配器利用该 API 实现来自 ioBroker 的完整远程控制功能。

＃＃ 特征
- 完全播放控制（播放、暂停、停止、快进/快退、上一曲/下一曲、快进/快退）
- 导航（方向键、确认键、返回键、菜单）
- 音量和静音控制
- 状态轮询（播放器状态、位置、持续时间、音量、比特率、音频语言、视频分辨率）
- 内置 PWA 网络遥控器 — 将您的手机用作遥控器
- 智能离线轮询——当玩家无法连接时降低轮询频率
- PWA文本输入——直接向玩家的屏幕键盘发送文本
- PWA 播放 URL — 直接从遥控器启动任意 URL 的媒体播放

支持的型号
所有支持 IP 控制的 Dune HD 媒体播放器（基于 Linux 的固件）。

测试机型：**Dune HD Pro 4K**（固件采用 XML 响应格式）。

| 型号 | 默认端口 |
|---|---|
| 基于 Linux 的版本（Pro 4K、Solo 4K 等） | 80 |
| 基于安卓/ATV | 11080 |

＃＃ 配置
### 玩家
| 字段 | 描述 |
|---|---|
| 玩家姓名 | 显示名称（仅供参考） |
| 玩家 IP 地址 | Dune HD 玩家的 IP 地址 |
| 播放器端口 | HTTP 端口（默认：80） |
| 连接超时 | 请求超时时间（毫秒）（默认值：5000） |

### 状态轮询
| 字段 | 描述 |
|---|---|
| 启用状态轮询 | 启用定期状态更新 |
| 轮询间隔 | 玩家在线时的轮询间隔（秒）（默认值：5） |
| 离线轮询间隔 | 玩家无法连接时的间隔时间（秒）（默认值：30） |

### PWA 远程控制
启用内置网络遥控器，即可通过任何浏览器或移动设备控制播放器。

| 字段 | 描述 |
|---|---|
| 启用 PWA 远程控制 | 启动内置 Web 服务器 |
| 绑定 IP 地址 | 要绑定的网络接口（0.0.0.0 = 所有接口） |
| PWA 服务器端口 | Web 远程端口（默认值：8765） |

启用后，请在浏览器中打开 `http://<iobroker-host>:8765/`。

URL 也存储在 `info.pwaUrl` 状态中。

**PWA 功能：**

- 主标签：方向键、播放控制、音量、进度条
- 主标签页：文本输入字段 — 向当前播放器键盘发送文本（`set_text` API）
- 主标签页：播放 URL 字段 — 通过任意 URL 启动媒体播放（`launch_media_url` API）
- 数字选项卡：数字键、彩色按钮（A/B/C/D）、字幕、缩放、弹出、录制
- 设置选项卡：深色/浅色主题、连接设置
- 可在 iOS 和 Android 上作为可安装的 PWA 应用使用（添加到主屏幕）

### Dune Notify 插件
在视频播放期间，**在视频上方**显示来自 ioBroker 的通知。

需要播放器上安装 **dune-notify** PHP 插件（参见 `dune-notify/` 文件夹）。

| 字段 | 描述 |
|---|---|
| 启用通知 | 启用沙丘通知集成 |
| 通知请求超时 | HTTP 请求超时时间（毫秒）（默认值：3000） |

## 州
| 状态 | 类型 | 描述 |
|---|---|---|
| `info.connection` | 布尔值 | 玩家是否可达 |
| `info.playerModel` | 字符串 | 玩家模型名称 |
| `info.firmwareVersion` | 字符串 | 固件版本 |
| `status.playerStatus` | 字符串 | 正在播放 / 已停止 / 已暂停 |
| `status.position` | 数字 | 播放位置（秒） |
| `status.duration` | 数字 | 总持续时间（秒） |
| `status.volume` | 编号 | 音量级别 |
| `status.mute` | 布尔值 | 静音状态 |
| `status.caption` | 字符串 | 当前媒体标题 |
| `status.audioLang` | 字符串 | 音频语言 |
| `status.videoWidth/Height` | 数字 | 视频分辨率 |
| `status.bitrate` | 数字 | 当前比特率（比特/秒） |
| `control.play/pause/stop` | 布尔值 | 触发播放操作 |
| `control.volume` | 数字 | 设置音量 |
| `navigation.up/down/left/right/ok/back` | 布尔值 | 导航按钮 |
| `media.playUrl` | 字符串 | 从 URL 播放媒体 |
| `media.seek` | 数字 | 定位到位置（秒） |
| `notify.send` | 字符串 | 发送通知（文本或 JSON） |
| `notify.hide` | 布尔值 | 隐藏当前通知 |
| `notify.lastResult` | 字符串 | 上次通知请求的结果 |
| `notify.lastResult` | 字符串 | 上次通知请求的结果 |

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.2.1
- Fix E8915: add dependabot cooldown (7 days) to reduce supply chain risk
- Fix deploy step: use Node.js 24 for trusted publishing compatibility
- Remove redundant `eslint` and `prettier` devDependencies (included via `@iobroker/eslint-config`)
- Add manufacturer link and device description to README
- Add CHANGELOG_OLD.md for older changelog entries

### 1.2.0
- Add dune-notify plugin integration: show notifications on screen during playback
- New states: `notify.send`, `notify.hide`, `notify.lastResult`
- New config options: `notifyEnabled`, `notifyTimeout`

### 1.1.5
- Fixed README: added missing changelog entry for 1.1.4

### 1.1.4
- Fixed README changelog (E6006), added `needs: check-and-lint` to adapter-tests job (S3014)

### 1.1.3
- Use standard workflow and testing scripts as provided by create-adapter
- Added `needs: check-and-lint` to adapter-tests job
- Restructured test directory to match ioBroker.example template

### 1.1.2
- Use `node:` prefix for all built-in Node.js modules (fs, http, path, url)

### 1.1.1
- Fixed prettier formatting errors in lib files
- Added `test:integration` script for CI/CD compatibility

For older changelog entries see [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT © 2026 sadam6752-tech

Copyright (c) 2026 sadam6752-tech <sadam6752@gmail.com>