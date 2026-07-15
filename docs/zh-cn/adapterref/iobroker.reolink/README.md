---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.reolink/README.md
title: ioBroker.reolink
hash: xaZzmVNw6uvjy6H3TumpfbeTCTSIQHcKssShqS0fPxk=
---
![标识](../../../en/adapterref/iobroker.reolink/admin/reolink.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.reolink.svg)
![下载](https://img.shields.io/npm/dm/iobroker.reolink.svg)
![安装数量](https://iobroker.live/badges/reolink-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/reolink-stable.svg)
![依赖状态](https://img.shields.io/david/aendue/iobroker.reolink.svg)
![NPM](https://nodei.co/npm/iobroker.reolink.png?downloads=true)

# IoBroker.reolink
**测试：** ![测试与发布](https://github.com/aendue/ioBroker.reolink/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 reolink 适配器
用于 ioBroker 平台的适配器，用于获取 [Reolink 相机](https://reolink.com/) 信息。

一般来说，所有较新的Reolink摄像头都支持API命令，只是支持的命令有所不同。

关于密码的提醒。如果密码中只有一个特殊字符，请尝试使用或不使用 URI 编码。为了保证安全性，最好不要使用特殊字符，而是使用更长的密码。请使用 http://cam.ip.add.ress/api.cgi?cmd=GetDevInfo&channel=0&user=username&password=yoursecurity 来检查您的凭据是否有效。

如果您希望添加任何特定的 API 命令……请告诉我。

## 已实现的功能
＃＃＃ 放
- 云台控制/云台防护
推送通知
- 设置自动对焦

值：0,1

- 设置红外灯

值：自动、关闭

- 设置LED灯
- 设置邮件通知

值：0，1

- 播放音频警报
- 变焦对焦

可以通过更改 reolink.<实例>.设置状态来触发功能。

 ＃＃＃ 得到
- 设备信息
- PTZ 信息
- 行车信息
网络信息
- 运动检测
自动对焦
- 快照
- 红外光
- LED灯
- 邮件通知

### 推送通知设置
仅当满足以下条件时，才会向手机发送推送通知：

- 适配器中的推送通知开关已开启。
- 对于 NVR，全局开关和通道开关都已开启。
- 该手机上的 Reolink App 的推送通知已开启。

Reolink 应用中的推送通知独立于适配器设置，也独立于连接到同一摄像头的其他手机上的设置。Reolink 这样设计是为了让您可以针对每部手机单独关闭推送通知。这意味着在 iobroker 中禁用推送通知不会影响应用中的开关按钮。

### 获取图像的示例用法：
```js
sendTo("reolink.0",{action: "snap"}, function(result){
    sendTo("matrix-org.0",{file:result});
});
```

// 结果中的内容为 JSON：

```json
{ "type": "image/png","base64": "iVBORw....askldfj" }
```

对于 Telegram 来说，这行得通。

```js
sendTo("reolink.0",{action: "snap"}, function(result){
    const buffer =Buffer.from(result.base64, "base64");
    sendTo('telegram.0', {
        text: buffer,
        type: "photo",
        caption: 'the image'
    });
});
```

## 电池供电相机
电池摄像头（Argus PT、Argus 3 Pro 等）使用专有协议，并通过 **[新链接](https://github.com/QuantumEntangledAndy/neolink)** 提供支持——这是一个开源工具，首次使用时会自动下载。

### 快速设置
1. **在配置中启用：** ✅ “电池供电摄像头”
2. **输入相机 UID：** 在 Reolink 应用中查找 → 设备信息
3. **安装依赖项（Linux）：**

```bash
sudo apt install gstreamer1.0-rtsp
```

4. **启动适配器** → RTSP 流可通过 `rtsp://<服务器 IP 地址>:8554/<摄像头名称>/mainStream` 获取

服务器 IP 地址会自动检测。`<CameraName>` 是适配器配置中设置的名称。

### 省电模式
**电池在运行时耗电很快！** 该适配器采用自动禁用策略：

- **`streams.enable`**（布尔值）— 启用/禁用 RTSP 流媒体
- 默认值：`false`（关闭 = 节省电池电量）
- 30 秒后自动禁用（可配置）
- 当没有客户端连接时，流媒体会自动暂停。

- **`mqtt.enable`**（布尔值）— 启用 MQTT 集成，用于运动/电池/泛光灯/PIR 传感器。
- 用于状态更新和泛光灯/PIR 控制
- 超时后自动禁用（电池保护）
- 在适配器设置中配置代理

### 电池相机状态
| 状态 | 类型 | 读/写 | 描述 |
|---|---|---|---|
| `streams.enable` | 布尔值 | 读/写 | 启动/停止 RTSP 流 |
| `streams.subStream` | 字符串 | R | 子流的 RTSP URL |
| `mqtt.enable` | 布尔值 | 读/写 | 启动/停止 MQTT 集成 |
| `floodlight` | 布尔值 | 读/写 | 泛光灯开/关 — 状态通过 MQTT 传输，控制通过 MQTT 传输（自动启动 MQTT） |
| `pir` | 布尔值 | 读/写 | PIR传感器开/关 — 状态通过MQTT传输，控制通过MQTT传输（自动启动MQTT） |
| `snapshot` | 按钮 | W | 通过 RTSP 捕获快照 |
| `query.battery` | 按钮 | W | 通过 Neolink CLI 查询电池电量 |
| `query.preview` | 按钮 | W | 通过 RTSP 捕获快照 |
| `ptz.preset` | 数字 | 读/写 | 将相机移动到已保存的预设位置（0-9） |
| `ptz.up/down/left/right` | 布尔值 | 读/写 | 按住移动（`true`=开始，`false`=停止） |
| `ptz.speed` | 数字 | 读/写 | 云台移动速度（1-100，默认值 32） |
| `status.motion` | 布尔值 | R | 检测到运动（通过 MQTT） |
| `status.battery_level` | 数字 | R | 电池电量百分比（通过 Neolink CLI，定期显示） |
| `status.battery_level` | 数字 | R | 电池电量百分比（通过 neolink CLI，定期更新） |

| `snapshotImage` | 字符串 | R | 最新快照图像（base64，数据 URI） |
| `info.neolink_status` | 字符串 | R | neolink 进程状态：`stopped` / `running` |
| `info.neolink_status` | 字符串 | R | neolink 进程状态：`已停止` / `正在运行` |

### 云台控制
PTZ 通过 neolink CLI 实现——无需 MQTT。

**方向移动** (`ptz.up/down/left/right`):

- 设置为“true”→ 相机开始移动，5 秒后自动停止
- 设置为“false” → 相机立即停止拍摄
- 在 VIS 中：配置按钮，使其 `mousedown=true` / `mouseup=false` 以实现按住移动功能
- 使用 `ptz.speed` 调整速度（1–100）

**预设** (`ptz.preset`): 设置为预设数字 (0–9) 以移动到该已保存的位置。

＃＃＃ 特征
✅ RTSP 流（主流 + 子流） ✅ 快照捕获（需要 ffmpeg） ✅ 泛光灯控制（状态 + 通过 MQTT 控制） ✅ PIR 传感器控制（状态 + 通过 MQTT 控制） ✅ 运动检测（通过 MQTT） ✅ 电池电量（通过 neolink CLI 定期更新） ✅ 预览图像（通过 MQTT 自动更新） ✅ 云台控制 — 方向移动 + 预设位置（通过 neolink CLI） ✅ 多平台 — neolink 二进制文件自动下载（Linux x64/ARM/ARM64、macOS）

### MQTT 设置
在适配器设置中进行配置：

- **代理主机**（默认值：`127.0.0.1`）
- **代理端口**（默认值：`1883`）
- **用户名/密码**（可选）
- **自动禁用超时**（默认值：30 秒，电池保护）

MQTT 用于摄像头状态更新和控制。当 `mqtt.enable` 设置为 `true` 时，适配器会自动订阅。

状态主题（由摄像头通过 Neolink 发布）：

- `neolink/<摄像头>/状态/运动`
- `neolink/<摄像头>/status/battery_level`
- `neolink/<摄像头>/状态/泛光灯`
- `neolink/<摄像头>/状态/pir`
- `neolink/<摄像头>/状态/预览`

控制主题（由适配器发布到相机）：

- `neolink/<摄像头>/control/泛光灯`
- `neolink/<摄像头>/control/pir`

### 故障排除
| 问题 | 解决方案 |
|---|---|
| “需要相机 UID” | 从 Reolink 应用 → 设备信息中输入 UID |
| "未找到 libgstrtspserver" | `sudo apt install gstreamer1.0-rtsp` |
| 快照失败 | 安装 ffmpeg：`sudo apt install ffmpeg` |
| 快照失败 | 安装 ffmpeg：`sudo apt install ffmpeg` |
| MQTT `NotAuthorized` | 检查代理凭据；Neolink 使用 `credentials = ["user", "pass"]` 格式 |
| MQTT 未授权 | 检查代理凭据；Neolink 使用 `credentials = ["user", "pass"]` 格式 |
| 电池耗电快 | 不使用时请禁用流媒体传输；仅使用 MQTT 进行运动检测 |
| 云台无响应 | 每个云台指令需要约 2 秒（P2P 摄像机登录）——这是正常现象 |

---

## 已知可用的摄像头
### HTTP API（标准）
RLC-420-5MP、E1 Zoom、RLC-522、RLC-810A、RLC-823A、Duo 3 PoE

### 电池供电摄像头（通过 Neolink）
Reolink Argus PT，Reolink Argus 3 Pro

---

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.4.2 (2026-03-16)
* (oelison) fast fix for issue #230

### 1.4.1 (2026-03-15)
* (oelison) fix issue #187

### 1.4.0 (2026-03-13)
* (bloop16) Battery camera support via neolink
* (oelison) Adapter requires node.js >= 20 now.

### 1.3.0 (2025-12-20)
* (agross) AiCfg config
* (oelison) bump some libs #202
* (bluefox) migration to ts
* (bot) revoking classic token #204
* (oelison) state changes from info log to debug #206

### 1.2.3 (2025-06-30)
* (oelison) settings email notification #170
* (oelison) testing node.js 24 #172

### 1.2.2 (2025-05-01)
* (oelison) update readme #141 #155
* (oelison) supress errors with axios timeout #154

### 1.2.1 (2025-02-09)
* (oelison) set some errors to debug logs

### 1.2.0 (2025-02-07)
* (oelison) update disk info
* (oelison) uri enconding is switchable (helps sometimes by one special char)
* (oelison) #28 PTZ check added

### 1.1.2 (2024-09-14)
* (oelison) [#22](https://github.com/aendue/ioBroker.reolink/issues/22) password with some more special chars works now
* (oelison) adapter warnings resolved

### 1.1.1 (2024-08-03)
* (oelison) removed warnings from adapter check
* (olli) added ftp support
* (oelison) channel now distinguishing most requests
* (oelison) [#79](https://github.com/aendue/ioBroker.reolink/issues/79) error messages with more info where

### 1.1.0 (2024-05-16)
* (Nibbels) [#56](https://github.com/aendue/ioBroker.reolink/issues/56) added function to switch scheduled recording on and off
* (Nibbels) [#25](https://github.com/aendue/ioBroker.reolink/issues/25) detach led light from led light mode
* (Nibbels) added setWhiteLedMode function
* (Nibbels) read zoom and focus with POST request (works on RLC-823A v3.1)
* (oelison) removed node 16

### 1.0.3 (2024-01-21)
* (oelison) [#49](https://github.com/aendue/ioBroker.reolink/issues/49)
* (oelison) [#47](https://github.com/aendue/ioBroker.reolink/issues/47)

### 1.0.2 (2023-12-19)
* (oelison) known working cameras added
* (oelison) setIrLights accept "On" now
* (oelison) [#40](https://github.com/aendue/ioBroker.reolink/issues/40)
* (oelison) [#42](https://github.com/aendue/ioBroker.reolink/issues/42)

### 1.0.1 (2023-11-11)
* (oelison) resolve review for latest adapter addition
* (oelison) maybe the last node 16 version
* (oelison) booleans are now false/true and not 0/1

## License
MIT License

Copyright (c) 2026 Andy Grundt <andygrundt@gmail.com>

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