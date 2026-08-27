---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.creality/README.md
title: 适用于 CREALITY 3D 打印机的 ioBroker 适配器
hash: 03xHafKJgCX1Vnf1EUcczgmVLVNp9wRN5d/efv/usTQ=
---
![标识](../../../en/adapterref/iobroker.creality/admin/creality.png)

![安装数量](https://iobroker.live/badges/creality-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/creality-stable.svg)
![NPM 版本](https://nodei.co/npm/iobroker.creality.svg?style=shields&data=v,u,d&color=orange)
![下载](https://img.shields.io/npm/dm/iobroker.creality.svg)
![社区](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)
![维护者](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)
![人工智能](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)
![PayPal捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# 适用于 CREALITY 3D 打印机的 ioBroker 适配器
---

## 此适配器的功能
通过两个本地 API 将 Creality Klipper 打印机（主要目标：**[SPARKX i7](https://store.creality.com/products/sparkx-i7-3d-printer)**，使用 CFS lite）连接到 ioBroker：

1. **Moonraker HTTP**（默认端口 7125）— 打印统计信息、温度、风扇、CFS 耗材盒、G 代码
2. **Creality WebSocket**（默认端口 `9999`）— 工具头 LED、暂停/恢复/停止、调平/自检 UI 状态、剩余时间（`printLeftTime`）

单凭 Moonraker 不足以解决 Creality UI 状态（例如，在 Klipper 仍然报告 `standby` 时进行调平）或工具头灯光问题。

制造商：[创想](https://www.creality.com/)。其他 Creality Klipper 型号可能尽力运行；目前仅测试过 SPARKX i7。

＃＃ 配置
| 设置 | 默认值 | 说明 |
|---------|---------|-------------|
| 主机/IP地址 | — | 打印机地址（必填） |
| Moonraker HTTP 端口 | `7125` | Fluidd 反向代理通常使用 `4408` |
|轮询间隔 | `5` s | Moonraker 民意调查（最少 2 秒）|
|轮询间隔 | `5` s | Moonraker 民意调查（最少 2 秒）|
| API 密钥 |空 |可选的 Moonraker 授权 |
| 打印控制 / CFS / 风扇 | 开启 | 状态树功能切换 |

每个适配器实例可连接一台打印机。

## 数据点
在 `creality.<instance>.*` 下（示例）：

| 状态 | 描述 |
|-------|-------------|
| `state` / `stateKlipper` / `selfTestStep` | UI / Klipper 状态 |
| `info.*` | 型号、固件版本、主机名、序列号、磁盘、打印小时数/作业数、错误信息 |
| `temp.*` | 喷嘴、床、箱/腔 |
| `fans.partCooling` | 零件冷却 **UI %**（与切片软件/打印机显示匹配；Creality `fan0_min` 重新映射） |
| `fans.partCoolingPwm` | 部件冷却 **PWM %**（来自 Moonraker 的原始硬件占空比） |
| `fans.*` / `cfs.*` | 其他风扇 / CFS（可选） |
| `control.light` / `sleepMode` / `pause` / `resume` / `stop` | 控制 |
| `webcam.available` | 摄像头已启用（只读；SPARKX i7 上的本地 API 无法将其关闭） |
| `webcam.streamUrl` | VIS iframe 的 URL（Creality WebRTC 页面，默认 `http://<host>:8000`） |
| `webcam.webrtcUrl` | WebRTC 信令端点 |
| `webcam.webrtcUrl` | WebRTC 信令端点 |

**网络摄像头注意事项：** SPARKX 使用端口 `8000` 上的 WebRTC，而非传统的 MJPEG。`webcam.streamUrl` 指向 Creality 查看器页面——如果浏览器可以访问打印机 IP 地址，则可在 VIS iframe 中使用。对于 Home Assistant / go2rtc，请使用 `webcam.webrtcUrl`。

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
### 0.4.1 (2026-08-25)
- (skvarel) Fixed `currentJob.filament*` for external spool holder (`filament_rack`) when CFS is not active

### 0.4.0 (2026-08-20)
- (skvarel) Adapter requires admin >= 7.8.23 now.

### 0.3.0 (2026-08-14)
- (skvarel) Fixed button states `control.pause|resume|stop` to use `read: false`
- (skvarel) Added manufacturer / SPARKX i7 product links to README
- (skvarel) Modified CFS temperature/humidity roles to `value.temperature` / `value.humidity`
- (skvarel) Modified Moonraker poll loop to use `setTimeout` chain instead of `setInterval`
- (skvarel) Modified `currentJob.finishAt` to include local date (`YYYY-MM-DD HH:MM`)

### 0.2.0 (2026-08-08)
- (skvarel) Fixed part cooling fan % to match slicer/display (Creality fan0_min remapping)
- (skvarel) Added `fans.partCoolingPwm` for raw PWM duty cycle

### 0.1.4 (2026-08-02)
- (skvarel) Fixed string state roles for repository object check

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