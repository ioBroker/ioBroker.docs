---
BADGE-Number of Installations: https://iobroker.live/badges/motioneye-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/motioneye-stable.svg
BADGE-NPM Version: https://nodei.co/npm/iobroker.motioneye.svg?style=shields&data=v,u,d&color=orange
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.motioneye.svg
BADGE-COMMUNITY: https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg
BADGE-MAINTAINER: https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg
BADGE-AI: https://img.shields.io/badge/ai%20assisted-cursor-blue.svg
BADGE-Paypal Donation: https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.motioneye/README.md
title: 无标题
hash: 3wNYB1rOKEVLL/JLKuXKZX/7Mspz3y+Bw4HwU3WDlBE=
---
![标识](../../../en/admin/motioneye.png)

### 适用于 MotionEye 的 ioBroker 适配器
## 文档
- [设置](settings.md)
- [相机](cameras.md)
- [相机模式](modes.md)
- [警报级别（VIS）](alert-level.md)
- [数据点](datapoints.md)
- [VIS 中的直播](vis-stream.md)
- [帮助与常见问题解答](faq.md)

#### IoBroker 要求
1. Node.js 22 或更高版本
2. js-controller 6.0.11 或更高版本
3. 管理适配器 7.6.20 或更高版本

#### MotionEye 要求
1. MotionEye，配置 API 端口为 **8765**（默认）
2. **MotionEye 0.44+：**适配器 **0.5.0** 或更高版本（会话登录）— 请参阅[常见问题解答](faq.md#motioneye-044-adapter-050)

快速入门
- 为每个 MotionEye 服务器创建一个适配器实例。
- 在**设置**中：设置 MotionEye 主机、凭据和**webhook 主机**（ioBroker IP，可从 MotionEye 访问）。
- 在**摄像头**上：添加摄像头或使用**从 MotionEye 加载摄像头**，然后保存并重新启动实例。
- 检查 `motioneye.<instance>._info.connection` — 当 MotionEye 可达时，该值应为 `true`。
- 对于 VIS 中的实时视频：绑定到 `<camera>.streamUrl` 的 HTML 小部件（请参阅 [VIS 中的实时流](vis-stream.md)）。

## Changelog

<!--
  ### **WORK IN PROGRESS**
-->

### 1.3.1 (2026-07-12)
- (skvarel) Fixed Telegram snapshot notifications ignored or text-only on some cameras: legacy saved flags (`notificationEnabled`, `notificationImageExcluded`) no longer override per-camera **On snapshot** / **Send image** = Yes
- (skvarel) Telegram snapshot images sent as photo buffer with caption (reliable delivery vs. absolute file path)

### 1.3.0 (2026-07-11)
- (skvarel) Instance `_info` disk usage from MotionEye: `diskUsedGb`, `diskTotalGb`, `diskUsedPercent` (filesystem of first online camera)

### 1.2.0 (2026-07-11)
- (skvarel) Per-camera **`alertLevel`** datapoint: one VIS dropdown for off / motion-only / motion+Telegram / motion+video / full protection; syncs `mode` and Telegram-on-motion; legacy `mode` writes still supported
- (skvarel) Fixed Telegram-on-motion image: trigger MotionEye snapshot before download when `lastsnap.jpg` is not ready yet (same path as manual snapshot button)
- (skvarel) Telegram notification timestamps use local time (`YYYY-MM-DD HH:mm:ss`) instead of UTC ISO (`…Z`)

### 1.1.0 (2026-07-11)
- (skvarel) Per-camera Telegram triggers: separate **On motion** / **On snapshot** Yes/No dropdowns in the table (no global motion/snapshot checkboxes)

### 1.0.0 (2026-07-11)
- (skvarel) Notifications tab: built-in Telegram on motion and/or snapshot — recipients with Active toggle, per-camera message template (Yes/No dropdowns), per-camera recipient filter, test message
- (skvarel) Snapshot cache: `lastsnap.jpg` in ioBroker file storage, **Snapshots** tab, datapoints `snapshots.*` for VIS/Telegram/scripts
- (skvarel) Per-camera motion detection tuning under `motiondetection.*`
- (skvarel) FAQ: snapshot storage, Telegram hints, notifications tab

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