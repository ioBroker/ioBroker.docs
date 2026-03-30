---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.chromecast/README.md
title: ioBroker.chromecast
hash: wIV2SeZmUT9IJE69VtHdhs04inO7BmdwX6XkaGqCbeY=
---
![标识](../../../en/adapterref/iobroker.chromecast/admin/home.png)

![安装数量](http://iobroker.live/badges/chromecast-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.chromecast.svg)
![下载](https://img.shields.io/npm/dm/iobroker.chromecast.svg)

# IoBroker.chromecast
![测试与发布](https://github.com/iobroker-community-adapters/iobroker.chromecast/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/chromecast/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

## 适用于 ioBroker 的 Google Home 适配器
此插件可以检测 Google Home 的视频和/或音频设备。对于检测到的每个 Home 设备，都会创建一个 ioBroker 设备。该设备会显示设备的状态，并允许向其发送新的投屏 URL。

基于以下项目进行开发：

* [ioBroker](http://www.iobroker.net)
* [node-castv2-client](https://github.com/thibauts/node-castv2-client) 作为 Home 客户端库。

＃＃ 指示
1. 将此适配器安装到 ioBroker 中
2.（可选）如果您计划流式传输本地文件，或者您的 Chromecast 设备位于不同的子网中，则需要配置适配器。
* 您需要一个 ioBroker Web 服务器实例才能流式传输本地文件
您需要手动为位于与 ioBroker 服务器不同子网中的每个设备添加信息（名称、IP 地址、端口、广告类型）。如果您希望名称与自动找到的设备名称一致，请使用 MAC 地址作为名称。您可以自定义名称，但请确保每个名称都是唯一的！为避免出现问题，名称只能包含大写字母 A-Z、小写字母 a-z、数字 0-9、-（减号）和 _（下划线）。
3. 查看日志：您应该能看到有关检测到的设备的日志。
4. 将类似 [http://edge.live.mp3.mdn.newmedia.nacamar.net/ps-dieneue_rock/livestream_hi.mp3](http://edge.live.mp3.mdn.newmedia.nacamar.net/ps-dieneue_rock/livestream_hi.mp3) 的 URL 写入 chromecast.0.`<您的 Chromecast 名称>`.player.url2play
5. 该网址应该会在您的设备上开始播放。

＃＃ 特征
* 检测具有组播DNS的设备
* （可选）在管理面板的“设备”选项卡中添加其他手动配置的设备
* 为每个找到的设备创建 ioBroker 对象
* 状态、播放器、媒体和元数据频道
* 通过适配器控制 Google Home 设备
* 设置音量
* 静音/取消静音
停止广播
  * 暂停
* 播放网址 (chromecast.0.`<您的 Google Home 名称>`.player.url2play)
* 使用 MP3 测试
* 格式完整列表[在此处](https://developers.google.com/cast/docs/media)。
* 当 URL 不以 http 开头时，则假定这是一个本地文件
* 通过 ioBroker 网络服务器导出文件
它只能播放播放列表文件（例如 .m3u 文件）中的第一个文件。
* 可视化小部件
* 注意：需要 [已修补的 vis 适配器](https://github.com/angelnu/ioBroker.vis)。
* 初步支持 Chromecast 音频组
* 注意：此功能不适用于 SSDP -> 默认情况下已在适配器设置中禁用。
* 再次播放上次播放的流：只需将 _chromecast.0.`<您的设备>`.status.playing_ 设置为 _true_

＃＃ 缺什么？
* 添加状态机以跟踪状态：检测到 -> 已连接 -> 播放器加载 -> 正在播放
* 添加重试次数：有时 Google Home 可能无法响应请求。
* 更多测试

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Logging technical deatils reduced to debug level

### 4.1.1 (2026-02-16)
- (mcm1957) Linting has been updated to @iobroker/eslint-config

### 4.1.0 (2026-02-16)
- (mcm1957) Adapetr requires node.js >= 20 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated

### 4.0.0 (2024-10-09)
* (neopholus) Release 3.4.0 added support for devices located in adifferent subnet. This introduced a problem due to changing some state-ids reported at issue #274. This problem has been fixed. This might be considered a breaking change for some people. 
* (mcm1957) Testing for node.js 22.x has been added.
* (mcm1957) Several issues reported by adapter checker have been fixed.
* (mcm1957) Dependencies have been updated

### 3.4.1 (2024-07-02)
* (foxriver76) migrated binary state to file

### 3.4.0 (2024-04-13)
* (neopholus) Support for devices located in different subnets has been added. [#154, #160]
* (mcm1957) Dependencies have been updated

## License
The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2015-2022 Vegetto <iobroker@angelnu.com>

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