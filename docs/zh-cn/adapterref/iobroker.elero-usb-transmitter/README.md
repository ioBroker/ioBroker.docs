---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.elero-usb-transmitter/README.md
title: ioBroker.elero-usb-transmitter
hash: nf5snk6oEC95XZM7T0xavw7ntsOBYC+aaH5kk8xqxT4=
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
* `36`：通风/倾斜
* `64`: 下行
* `68`：中间位置

### 简易命令
* `74`: EASY_CHECK
* `75`：轻松确认
* `76`: EASY_SEND
* `77`: EASY_ACK
* `78`: EASY_INFO

### 状态值
`info` 状态显示设备的当前状态。常见值包括：

| 值 | 描述 |
| :--- | :--- |
| `INFO_UNKNOWN` | 未知状态 (-1)。 |
| `INFO_TOP_POSITION_STOP` | 停在顶部位置 (1)。 |
| `INFO_BOTTOM_POSITION_STOP` | 停在底部位置 (2)。 |
| `INFO_INTERMEDIATE_POSITION_STOP` | 停在中间位置 (3)。 |
| `INFO_TILT_VENTILATION_POS_STOP` | 已停止在倾斜/通风位置 (4)。 |
| `INFO_BLOCKING` | 检测到阻塞 (5)。 |
| `INFO_OVERHEATED` | 电机开销 (6)。 |
| `INFO_TIMEOUT` | 超时 (7)。 |
| `INFO_START_TO_MOVE_UP` | 开始向上移动 (8)。 |
| `INFO_START_TO_MOVE_DOWN` | 开始向下移动 (9)。 |
| `INFO_MOVING_UP` | 向上移动 (10)。 |
| `INFO_MOVING_DOWN` | 向下移动 (11)。 |
| `INFO_STOPPED_IN_UNDEFINED_POSITION` | 停止在未定义位置 (13)。 |
| `INFO_TOP_POS_STOP_WICH_TILT_POS` | 顶部位置停止，带倾斜位置 (14)。 |
| `INFO_BOTTOM_POS_STOP_WICH_INT_POS` | 底部位置止动器，中间位置 (15)。 |
| `INFO_SWITCHING_DEVICE_SWITCHED_OFF` | 正在关闭设备 (16)。 |
| `INFO_SWITCHING_DEVICE_SWITCHED_ON` | 正在开启设备 (17)。 |
| `INFO_SWITCHING_DEVICE_SWITCHED_ON` | 正在开启设备 (17)。 |

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
### 1.0.5 (2025-12-31)

-   Fixed reliability issue with fast polling (burst mode)

### 1.0.4 (2025-12-30)

-   Adjusted release configuration
-   Implemented fast polling after command execution

### 1.0.3 (2025-12-30)

- Release script configuration improved (added missing plugins)
- Bug fix: Status update handling (async + validation)
- Improvement: Connection retry logic implemented
- Improvement: All tests converted to TypeScript

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

Copyright (c) 2025-2026 marc <marc@lammers.dev>

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