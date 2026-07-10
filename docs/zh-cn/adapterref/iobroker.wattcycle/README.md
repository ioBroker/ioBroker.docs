---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wattcycle/README.md
title: ioBroker.wattcycle
hash: iwXC7pbp3GozHWWzpfotm7/hKeirAJWzTUe0012QhEA=
---
<img src="admin/wattcycle.png" width="100" />

# IoBroker.wattcycle
将 WattCycle / XDZN BLE 电池（TDT 协议，特征 fff1/fff2/fffa，“HiLink”认证）读取到 ioBroker 中。

＃＃ 特征
- 通过 BLE 持续轮询可配置的电池列表。
- 每个电池的状态，包括 SoC、电压、电流、功率、容量、循环次数、MOSFET/PCB/电池温度、单个电池电压。
- 通过管理界面内置 BLE 扫描功能，可发现附近设备的 MAC 地址。
- 可配置轮询间隔，电池与蓝牙（HCI）适配器之间的间隙。

＃＃ 配置
打开管理界面，在“主要设置”选项卡中选择：

- **蓝牙适配器 (hciX)** — HCI 设备 ID (`0` = `hci0`)。
- **轮询间隔（毫秒）** — 完整轮询周期之间的间隔。
- **电池间隙（毫秒）** — 在一个周期内连续读取电池数据之间的暂停时间。
- **扫描持续时间（毫秒）** — BLE 扫描运行的时间。

在“电池”选项卡上，按“扫描 BLE 设备”，然后将电池的 MAC 地址复制到下表中，并为每个电池分配一个名称。

## 州
对于每个已配置的电池，在 `wattcycle.<instance>.batteries.<name>` 下创建以下状态：

| 状态 | 类型 | 单位 | 描述 |
|------------------------|---------|------|------------------------------------------|
| `soc` | 数量 | % | 充电状态 |
| `current` | 数值 | A | 电流（有符号，电荷为正） |
| `power` | 数量 | W | 电压 × 电流 |
| `remaining_ah` | 数量 | 安时 | 剩余容量 |
| `total_ah` | 编号 | 安时 | 总容量 |
| `design_ah` | 编号 | 安时 | 设计容量 |
| `cycles` | 编号 | | 循环计数 |
| `cell_spread_mv` | 编号 | mV | 最高/最低电压差 |
| `mos_temp` | 编号 | °C | MOSFET 温度 |
| `pcb_temp` | 数值 | °C | PCB温度 |
| `cells_v` | 字符串 | | 电池电压 (V) 的 JSON 数组 |
| `cell_temps` | 字符串 | | 电池温度（°C）的 JSON 数组 |
| `product.model_or_fw` | 字符串 | | 型号/固件字符串 |
| `product.manufacturer` | 字符串 | | 制造商字符串 |
| `product.serial` | 字符串 | | 序列号 |
| `lastUpdate` | 数字 | | 上次成功读取的时间戳 |
| `reachable` | 布尔值 | | 如果上次读取成功，则为真 |
| `lastError` | 字符串 | | 上次读取失败的错误 |
| `lastError` | 字符串 | | 上次读取失败的错误 |

此外，还创建了一个聚合设备`wattcycle.<instance>.total`（假设采用并行拓扑结构）：

| 状态 | 类型 | 单位 | 聚合 |
|-----------------------------|--------|------|-----------------|
| `soc` | 数量 | % | 平均值 |
| `soc_max` | 数字 | % | 最大值 |
| `voltage` | 数字 | V | 平均值 |
| `voltage_min` | 数量 | V | 最小值 |
| `voltage_max` | 编号 | V | 最大值 |
| `current` | 数字 | A | 总和 |
| `power` | 数字 | W | 总和 |
| `remaining_ah` | 数字 | 啊 | 总和 |
| `total_ah` | 数字 | 啊 | 总和 |
| `design_ah` | 数字 | 啊 | 总和 |
| `cycles_avg` | 数字 | | 平均值 |
| `cell_spread_mv_max` | 编号 | 毫伏 | 最大值 |
| `mos_temp_max` | 编号 | °C | 最大值 |
| `pcb_temp_max` | 编号 | °C | 最大值 |
| `count` | 数字 | | 可达计数 |
| `lastUpdate` | 数字 | | 聚合 ts |
| `lastUpdate` | 数字 | | 聚合 ts |

## 消息
```js
// Force an immediate poll cycle
sendTo('wattcycle.0', 'pollNow', null, res => console.log(res));

// Run a BLE scan
sendTo('wattcycle.0', 'scan', { duration: 8000 }, res => console.log(res.devices));
```

＃＃ 要求
- Linux 系统，并安装了 BlueZ（`apt install bluez libbluetooth-dev`）。
- 必须允许适配器访问 HCI 套接字（通常以 root 用户身份运行或使用 `setcap` 命令）。
- 蓝牙适配器必须支持蓝牙 5.0（LE 远距离）。

## Changelog
<!--
   Placeholder for the next version (at the beginning of the line):
   ### **WORK IN PROGRESS**
-->
### 1.0.0 (2026-07-01)
* (@GermanBluefox) Improved total calculations
* (@GermanBluefox) Updated packages

### 0.2.2 (2026-05-07)
* (@GermanBluefox) Managed timeouts and power off

### 0.2.1 (2026-05-06)
* (@GermanBluefox) Use MAC address as a unique identifier bluetooth adapter

### 0.1.0 (2026-05-05)

* (@GermanBluefox) Initial version.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 bluefox <dogafox@gmail.com>

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