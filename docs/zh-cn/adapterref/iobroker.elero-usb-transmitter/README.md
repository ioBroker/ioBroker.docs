---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.elero-usb-transmitter/README.md
title: ioBroker.elero-usb-transmitter
hash: B4BFyXjQg2PIiZv5FCRU1GoOannx8Mw96nu2B4cAgdU=
---
# IoBroker.elero-usb-transmitter
![标识](../../../en/adapterref/iobroker.elero-usb-transmitter/admin/elero-usb-transmitter.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.elero-usb-transmitter.svg)
![下载](https://img.shields.io/npm/dm/iobroker.elero-usb-transmitter.svg)
![安装数量（最新）](http://iobroker.live/badges/elero-usb-transmitter-installed.svg)
![安装数量（稳定版）](http://iobroker.live/badges/elero-usb-transmitter-stable.svg)
![已知漏洞](https://snyk.io/test/github/marc2016/ioBroker.elero-usb-transmitter/badge.svg)
![NPM](https://nodei.co/npm/iobroker.elero-usb-transmitter.png?downloads=true)

## 适用于 ioBroker 的 elero-usb-transmitter 适配器
用于通过 Elero USB 发射器控制 Elero 设备的适配器。

您需要一个 USB 发射器，并将现有的卷帘门电机连接到发射器上。适配器会自动检测活动通道并添加设备。您可以在设置中设置设备名称和更新间隔。

＃＃ 配置
1. **USB 设备路径**：USB 发射器的路径（例如，`/dev/ttyUSB0` 或 `COM3`）。
2. **刷新间隔**：刷新设备状态所需的时间（分钟）。
3. **设备配置**：您可以在适配器设置中将通道号映射到自定义名称。

＃＃ 用法
适配器会为U盘上检测到的每个活动通道创建一个设备。每个设备包含以下状态：

| 状态 | 角色 | 描述 |
| :--- | :--- | :--- |
| `channel` | 文本 | 设备的通道号。 |
| `open` | 开关 | 主控开关。设置为 `true` 为打开（向上），设置为 `false` 为关闭（向下）。 |
| `controlCommand` | 状态 | 直接发送特定命令。 |
| `controlCommand` | 状态 | 直接发送特定命令。 |

### 控制命令
您可以将以下值写入 `controlCommand` 状态：

* `16`: 停止
* `32`: UP
* `36`：下行
* `64`: STEP_UP
* `68`: 降阶

## 示例
### Javascript / Blockly
打开快门（通道 1）：

```javascript
setState('elero-usb-transmitter.0.channel_1.open', true); // Moves UP
```

停止移动的快门：

```javascript
setState('elero-usb-transmitter.0.channel_1.controlCommand', 16); // STOP command
```

## Changelog
### 1.0.2 (2025-12-24)

- Replaced deprecated createState/createDevice methods with setObjectNotExistsAsync

### 1.0.1 (2025-12-24)

- Dependencies updated

### 1.0.0 (2025-12-23)

- Refactor main.ts (split into smaller modules)
- Cleanup unused code (src/lib/tools.ts)
- Admin UI migrated to jsonConfig
- Dependencies updated
- ESLint migrated to v9
- Tests validation improved
- Bug fix: Async iteration in device refresh
- TypeScript configuration updated

### 0.5.2

- Missing translation for title and description added

### 0.5.1

- Translation added

### 0.5.0

- Translations added
- Ignore state changes with ack=true in onStateChanged handler
- messages handler removed
- node-scheduler package removed

### 0.4.0

- Added channel for connection info.

### 0.3.0

- Use only open state to controle devices.

### 0.1.0

- Transmission time removed and code clean up.

### 0.0.3"

- Log messages added.

### 0.0.2

- bug fixes

### 0.0.1

- initial release

## License

MIT License

Copyright (c) 2022 marc <marc@lammers.dev>

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