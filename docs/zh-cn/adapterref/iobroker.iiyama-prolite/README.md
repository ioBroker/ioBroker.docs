---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.iiyama-prolite/README.md
title: ioBroker.iiyama-prolite
hash: 7p2aNZZ3K2GVKo9GOfLKshGS72R20I7QZ8XUiCDQzN4=
---
![标识](../../../en/adapterref/iobroker.iiyama-prolite/admin/iiyama-prolite.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.iiyama-prolite.svg)
![下载](https://img.shields.io/npm/dm/iobroker.iiyama-prolite.svg)
![安装数量](https://iobroker.live/badges/iiyama-prolite-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/iiyama-prolite-stable.svg)

# IoBroker.iiyama-prolite
**测试：** ![测试与发布](https://github.com/AlanSRU/ioBroker.iiyama-prolite/workflows/Test%20and%20Release/badge.svg)

## Iiyama ioBroker 适配器
控制 [iiyama ProLite 专业显示器可通过 RS232 串口或 TCP/IP (LAN) 连接，使用 iiyama 官方通信协议进行通信。iiyama 是一家显示器制造商——详情请访问 [iiyama.com]](https://iiyama.com/)。

＃＃ 特征
- **双连接支持**：可通过 RS232 串口或 TCP/IP 网络连接控制显示
- **全面控制**：电源、输入源、音量、视频和音频参数
- **实时监控**：以可配置的间隔自动轮询显示状态
- **多种显示器型号**：支持 ProLite LH 系列显示器（请参阅兼容性列表）
- **命令队列**：按顺序执行命令可防止通信错误

支持的显示型号
- ProLite LH3252HS-B1
- ProLite LH4352UHS-B1
- ProLite LH5052UHS-B1
- ProLite LH5552UHS-B1
- ProLite LH6552UHS-B1
- ProLite LH9852UHS-B2
- ProLite LH4342UHS-B1/B3
- ProLite LH5042UHS-B1/B3
- ProLite LH5542UHS-B1/B3
- ProLite LH6542UHS-B1/B3
- ProLite LH7542UHS-B1/B3
- ProLite LH8642UHS-B1/B3

＃＃ 安装
1. 从 ioBroker 适配器存储库安装适配器
2. 在适配器配置中配置连接设置

＃＃ 配置
### 连接设置
**连接类型**：选择 TCP/IP（局域网）或串口（RS232）

#### TCP/IP 连接
- **IP 地址**：显示器的 IP 地址
- **TCP端口**：通常为5000（iiyama显示器的默认端口）

#### 串口连接
- **串口**：串口设备的路径（例如，Linux 系统上的 `/dev/ttyUSB0` 或 Windows 系统上的 `COM1`）
- **波特率**：
- 大多数型号为 9600
- 仅适用于 LHxx42UHS-B1 系列的 115200

### 显示设置
- **显示器 ID**：显示器上配置的 ID（1-255）。默认值为 1。
- **轮询间隔**：更新显示状态的频率（5-300 秒）。默认值为 30 秒。
- **省电模式**：显示器上配置的省电模式（1-4）。这会影响显示器关机时的控制方式：
- **模式 1**：WOL 关闭，信号源唤醒关闭，背光关闭
- 显示器关闭时，TCP 连接断开
无法通过网络唤醒（WOL 已禁用）
- 必须使用红外遥控器或前面板按钮唤醒
- **模式 2**：WOL 关闭，开启输入源唤醒，关闭背光
- 显示器关闭时，TCP 连接断开
无法通过网络唤醒（WOL 已禁用）
- 检测到HDMI信号源时可自动唤醒
- **模式 3**：WOL 开启，源输入唤醒关闭
- 可通过网络唤醒 (Wake-on-LAN) 唤醒（需要配置 MAC 地址）
- 适配器发送一个 WOL 魔术数据包，然后发送上电命令
- **模式 4**：WOL 开启，源输入唤醒开启（**推荐用于网络控制**）
- 可通过网络唤醒 (Wake-on-LAN) 唤醒（需要配置 MAC 地址）
- 适配器发送一个 WOL 魔术数据包，然后发送上电命令
- 当检测到 HDMI 源信号时，也可以自动唤醒。
- **MAC 地址**（模式 3 和模式 4 必需）：显示器网络接口的 MAC 地址，用于网络唤醒 (Wake-on-LAN)。
- **WOL 广播地址**（可选）：WOL 数据包的子网广播地址。如果为空，则从主机 IP 派生而来（例如 `192.168.1.100` → `192.168.1.255`）。

＃＃ 用法
### 可用状态
#### 电源控制
- `power` - 打开/关闭显示屏（布尔值）

#### 输入源
- `inputSource` - 选择输入源：
- HDMI、HDMI 2、HDMI 3、HDMI 4
- DVI-D
- DisplayPort、DisplayPort 2
- VGA
- USB、USB 2

＃＃＃＃ 体积
- `volume.main` - 主扬声器音量（0-100%）
- `volume.audioOut` - 音频输出音量（0-100%）

#### 视频设置
- `video.brightness` - 亮度（0-100%）
- `video.contrast` - 对比度 (0-100%)
- `video.color` - 颜色饱和度（0-100%）
- `video.sharpness` - 清晰度 (0-100%)
- `video.tint` - 色调/色相 (0-100%)
- `video.blackLevel` - 黑电平（0-100%）
- `video.gamma` - 伽马曲线选择
- `video.colorTemperature` - 色温预设
- `video.pictureFormat` - 图片格式/宽高比

#### 音频设置
- `audio.treble` - 高音级别（0-100）
- `audio.bass` - 低音级别（0-100）

#### 信息（只读）
- `info.connection` - 连接状态
- `info.standby` - 显示器处于待机/无法访问状态，但适配器仍在运行
- `info.operatingHours` - 总营业时间
- `info.serialCode` - 显示序列号

#### 命令
- `commands.autoAdjust` - 触发 VGA 自动调整（写入 `true`）

### Blockly/JavaScript 中的用法示例
```javascript
// Turn display on
setState('iiyama-prolite.0.power', true);

// Switch to HDMI input
setState('iiyama-prolite.0.inputSource', 13); // 13 = HDMI

// Set volume to 50%
setState('iiyama-prolite.0.volume.main', 50);
setState('iiyama-prolite.0.volume.audioOut', 50);

// Adjust brightness
setState('iiyama-prolite.0.video.brightness', 75);
```

## 技术细节
### 协议实施
本适配器实现了官方应用笔记中描述的 iiyama RS232 串行接口通信协议。该协议使用：

- **数据包格式**：头部 (0xA6)、显示器 ID、类别、页码、功能码、长度、数据控制、数据、校验和
- **校验和**：除校验和之外的所有字节的异或运算
- **响应超时**：5000毫秒
- **命令延迟**：命令之间延迟 100 毫秒，以防止缓冲区溢出。

### 连接管理
- **自动重连**：最多尝试 10 次，每次延迟 5 秒
- **命令队列**：确保命令按顺序发送
- **状态轮询**：定期更新所有显示参数

## 故障排除
### 显示器无响应
1. **检查物理连接**：确保电缆已正确连接
2. **验证 IP 地址/端口**（TCP）或 **串口**（RS232）
3. **检查显示器 ID**：必须与显示器上配置的 ID 匹配
4. **串口连接问题**：
- 确认波特率（B1 系列为 9600 或 115200）
- 检查 Linux 系统上的串口权限：`sudo usermod -a -G dialout iobroker`
5. **TCP 连接问题**：
- 对于网络电源控制，请将显示器配置为节能模式 3 或模式 4。
- 模式 1 或 2：显示器关闭时 TCP 连接断开 - 无法通过网络唤醒
模式 3：需要启用网络唤醒功能 - 在适配器设置中配置 MAC 地址
模式 4：推荐 - TCP 保持激活状态，电源命令直接生效
检查防火墙设置

### 命令无法正常工作
- **等待响应**：该协议要求在命令之间等待确认。
- **检查 OSD 菜单**：只有显示器 OSD 菜单中提供的命令才能保证有效。
- **轮询过于频繁**：如果出现通信错误，请增加轮询间隔

## 免责声明
iiyama 和 ProLite 是其各自所有者的商标。此适配器为社区项目，与 iiyama 无任何关联，亦未获得 iiyama 的认可或支持。

## 商标
iiyama 和 ProLite 是 iiyama 公司的商标。本适配器是一个独立的社区项目，与 iiyama 公司没有任何关联，也未获得其认可或支持。

适配器图标使用了 iiyama 官方文字商标，该商标已发布在 [iiyama出版社资料](http://www.iiyama.com/gl_en/press-materials/) 中，属于公共领域（未达到原创性阈值）。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 0.1.6 (2026-08-19)
* (Alan Paris) Fixed `protectedNative` being placed inside `common` in io-package.json, where js-controller ignored it and the schema rejected it (repochecker E1105) - the MAC address is now genuinely protected

### 0.1.5 (2026-08-19)
* (Alan Paris) Replaced the create-adapter placeholder icon with the official iiyama wordmark
* (Alan Paris) Fixed polling stopping permanently when a Wake-on-LAN power command was not answered
* (Alan Paris) Fixed the command queue hanging forever when the connection dropped mid-command
* (Alan Paris) Status replies are now matched to the command that asked for them, so a timed-out poll can no longer write another command's value into a state
* (Alan Paris) Repeated command failures are now logged once instead of on every poll cycle, and clear `info.connection` after three consecutive failures
* (Alan Paris) Controls now snap back to the last confirmed value when a command is refused or cannot be delivered
* (Alan Paris) State metadata is now applied with `extendObject`, so corrected roles reach existing installations on upgrade and not just new ones
* (Alan Paris) Added `macAddress` to `protectedNative` so it is not readable by non-admin users
* (Alan Paris) Fixed the connection status staying `true` after a reconnect to a display that answers nothing
* (Alan Paris) Fixed overlapping reconnect attempts while a display was in standby, which could leave an unclosed socket behind
* (Alan Paris) Power Save Mode 1/2 no longer reports the display as off when it is already on and reachable
* (Alan Paris) The "display appears to be off" notice is now logged once per standby period instead of every 30 seconds
* (Alan Paris) Serial connections now retry after a failed port open, so a dongle plugged in later (or a permissions fix) no longer needs an instance restart
* (Alan Paris) Repeated connection errors are now logged once instead of on every retry

### 0.1.4 (2026-07-16)
* (Alan Paris) Removed the manufacturer protocol PDF from the repository and its git history
* (Alan Paris) Added a 10 s TCP connection timeout so an unreachable display no longer hangs the connect
* (Alan Paris) Redacted MAC addresses in log output (only the last three octets are shown)
* (Alan Paris) Changed the brightness state role to `level.dimmer`
* (Alan Paris) Poll cycles are now skipped while the previous cycle is still processing, preventing command-queue backlog
* (Alan Paris) Documented reserved protocol command/input-source codes that are not yet exposed as states

### 0.1.3 (2026-07-06)
* (Alan Paris) Updated serialport dependency to 13.0.0

### 0.1.2 (2026-07-06)
* (Alan Paris) Create channel objects for info/volume/video/audio/commands so every state has an intermediate parent object (fixes repochecker E3009)

### 0.1.1 (2026-07-05)
* (Alan Paris) Enabled automated npm publishing via GitHub Actions trusted publishing (OIDC)

### 0.1.0 (2026-07-05)
* (Alan Paris) Initial release: TCP/IP and serial (RS232) control of iiyama ProLite displays
* (Alan Paris) Power, input source, volume, video and audio control with status polling
* (Alan Paris) Wake-on-LAN support for Power Save Modes 3 and 4, with subnet-broadcast derivation
* (Alan Paris) Automatic reconnection with slow standby polling to recover when a display is powered on

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