---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sbms/README.md
title: ioBroker.sbms
hash: AR1e9Yuaa4B4UTBx4REZgDYRTfmg0XKY4chdC1kyeGA=
---
![标识](../../../en/adapterref/iobroker.sbms/admin/sbms.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.sbms.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sbms.svg)
![安装数量](https://iobroker.live/badges/sbms-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/sbms-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.sbms.png?downloads=true)

# IoBroker.sbms
**测试：**![测试和发布](https://github.com/buffoletti/ioBroker.sbms/workflows/Test%20and%20Release/badge.svg)

## Electrodacus SBMS 适配器适用于 ioBroker
简单的适配器，使来自[电鲵 SBMS](https://electrodacus.com/)的数据可作为来自 MQTT、rawData html 页面或串行端口的状态。

单元和结构根据原始数据流进行了少量定制。如果启用了完整消息选项，原始数据还会被额外推送到 sbms.x.mqtt/html/serial 文件夹。

我发现，在启用 WIFI 的情况下，三种方法中，即使更新间隔为 1 秒，通常也只能每 2 秒提供一次新数据，这在 sbms.time.second 字段中可以看到，所以这是预期的最大值。为了获得一致的 1 秒更新，请使用串口，并将 SBMS 上的 USART 数据日志选项设置为 1。这样，计数器和平衡信息将无法访问。

仅在 SBMS0 上测试。

### 串口/USB 带 Wifi 扩展板
1. 在 SBMS 中检查波特率（Wifi 激活时固定为 921600）
2. 将主机连接到 SBMS USB（如果没有 Wifi 扩展板，则使用 USB 转串行适配器并直接连接）
3. 在主机上使用 `ls /dev/serial/by-id` 识别串行端口
4. 在适配器管理页面进行相应配置
5. 调整更新间隔（1秒：处理完整流）

笔记：

- SBMS 手册说波特率 921.6k 可能不可靠。
- 如果在适配器管理中配置了串行端口，则 MQTT 和 HTML 将被停用。

### MQTT
1. 设置 MQTT Broker 并连接 iobroker
2. 将 SBMS 连接到 wifi 和 MQTT 代理
3. 识别接收 SBMS JSON 的 ioBroker 状态（默认 root/sbms）
4. 在 SBMS 适配器配置名称主题中，采用 iobroker 格式，带点
5. 调整更新间隔（1s：处理主题状态的每次更新）

### RawData HTML 页面
rawData html 页面有附加信息（例如计数器和平衡）

1. 将SBMS连接到wifi
2. 识别IP并设置静态（wifi路由器）
3. 在SBMS适配器名称IP地址
4.调整更新间隔

如果启用了 MQTT 和 HTML 选项，则基本信息将从 MQTT 流更新，而来自 rawPage.balance 的电池参数和计数器不会放入通用数据结构中。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.4.1 (2025-09-28)
- fix: negative loads when using non-pv chargers

### 0.4.0 (2025-09-25)

Review add to latest:
- Breaking: Object Tree (cells.min > cells.min.voltage, cells.max.ID > cells.maxID)
- added multilanguage support
- fix connection watchdog intervals, change to adapter.intervals, safe ui intervals
- cleaning: devDependencies, object tree, eslint 9
- debug logs changed to iobroker standard


### 0.3.0 (2025-09-15)

- Support for USART Data Log Optin added

### 0.2.0 (2025-09-13)

- New object tree structure for info/parameters, flags and balancing

### 0.1.2 (2025-09-12)

- Added Serial Port

### 0.0.1 (2025-09-02)

- Initial Release

## License

MIT License

Copyright (c) 2025 buffoletti <info@buffoletti.de>

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