---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.jeelink/README.md
title: ioBroker.jeelink
hash: 88gD/4Nr3d9Mk+reWwFArpGsEcfHaUsYe34lLuI18FU=
---
![标识](../../../en/adapterref/iobroker.jeelink/admin/jeelab_logo.png)

![安装数量](http://iobroker.live/badges/jeelink-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.jeelink.svg)
![下载](https://img.shields.io/npm/dm/iobroker.jeelink.svg)

# IoBroker.jeelink
**测试：**![测试和发布](https://github.com/foxthefox/ioBroker.jeelink/workflows/Test%20and%20Release/badge.svg)

这是 ioBroker 的适配器，用于通过 Jeelink 集成 RFM12B/RFM69。
jeelink 可与预装的软件 (rfmdemo) 配合使用，用于读取 openenergy 传感器 (emon)。
要使用 LaCrosse 传感器，必须更换固件（请参阅 iobroker 论坛）。

＃＃ 设置：
- JeelinkAdapter 的 USB 端口通常为 /dev/ttyACME
- 串行速度通常为 57600 波特

＃＃ 配置：
在管理员中完成

- USB 端口的定义
- 设置波特率

* 定义空中接收的传感器地址
* 在适配器内定义唯一的传感器地址（LaCrosse 在更换电池后会改变广播地址，因此请观察调试日志并在更换电池后调整传感器地址）
* 定义传感器的类型（见下面的例子）
* 定义房间

传感器
| 对象 | 设备变体 | 电报示例 | 描述 |
| -------------- | ------------------ | :----------------: | --------------------------------------------- |
| emonTH | emonTH | OK 19 ... | 来自 openenergy.org 的传感器 |
| emonWater | emonWater | OK 21 ... | 带 RFM12B 的传感器用于水计量 |
| LaCrosseDTH | TX | OK 9 ... | LaCrosse 的传感器，technoline |
| LaCrosseDTT | TX | OK 9 ... | LaCrosse 传感器，technoline 双温 |
| HMS100TF | TXH29DTH-IT | H00 ... | 传感器技术 |
| LaCrosseBMP180 | | OK WS ... | 传感器模块，superjee |
| LaCrosseWS | WS1080,TX22,WS1600 | OK WS ... | 气象站 |
| EC3000 | EC3000 | OK 22 ... | 电能表 |
| EMT7110 | EMT7110 | 确定 EMT7110 ... | 电能表 |
| 液位 | 液位 | OK LS ... | 液位传感器 |
| DavisVantage | Davis Vantage | OK VALUE DAVIS ... | 气象站 |

## 待办事项：
- 其他传感器类型
- 将传感器代码放在单独的文件中
- 将新传感器推送到配置，然后在管理/配置页面中可见
- HMS100TF 温度低于 0°C 且电池电量低时实施

## Changelog

### 1.2.7 (npm)

- (foxthefox) update dependencies, comply with repo checker

### 1.2.6 (npm)

- (foxthefox) update dependencies
- (foxthefox) UI with jsonConfig

### 1.2.5 (npm)

- (foxthefox) eslint upgrade and corrections

### 1.2.4 (npm)

- (foxthefox) IOB checker corrections

### 1.2.3 (npm)

- (foxthefox) serialport 12
- (foxthefox) translation with @iobroker/adapter-dev

### 1.2.2

- (foxthefox) more datapoints for Davis Vantage

### 1.2.1

- (foxthefox) corrections for Davis Vantage

### 1.2.0

- (foxthefox) new device Davis Vantage

### 1.1.1

- (foxthefox) state change as log.debug, not as log.info
- (foxthefox) some more info at adapter startup
- (foxthefox) moved sp.write and deleted separate function

### 1.1.0

- (foxthefox) usage of newest serialport (9.x -> 10.5)
- (foxthefox) changes in github workflow

### 1.0.3

- (atl285) correction wrong type of baudRate config, causing adapter crash

### 1.0.2

- (foxthefox) upper range temperature 50->70

### 1.0.1

- (foxthefox) round -> this round
- (foxthefox) baudrate settings in admin as number

### 1.0.0

- (foxthefox) refactoring, use of classbased style,
- (foxthefox) github actions instead of travis

### 0.1.4

- (o0shojo0o) nodejsV14 compatibility

### 0.1.3

- (atl285) added new sensor type LacCrosseDTT (double temp like TX25-IT)

### 0.1.2

- correction for weather (no data is given by value = 255)

### 0.1.1

- delete buffer function to be compatible with nodejs10
- enhanced automatic testing

### 0.1.0

- compact mode

### 0.0.7

- new level sensor (fhem)

### 0.0.6

- last version of serialport
- new sensor TXH29DTH-IT
- new weather station WS1600
- new sensor EC3000, EMT7110 not verified with life data

### 0.0.5

- adminv3 improved with values2table

### 0.0.4

- command to USB-stick for configuration
- added superjee, BMP180 sensor on jeenode
- admin v3 implementation

### 0.0.3

- abs humidity and dewpoint calculation

### 0.0.2

- definition of unique sensor ID for iobroker datapoint
- implementation of LaCrosseDTH
- definition of sensors via admin

### 0.0.1

- working with 3 sensors emon

## License

The MIT License (MIT)

Copyright (c) 2016 - 2025 foxthefox <foxthefox@wysiwis.net>
Copyright (c) 2025 foxthefox <foxthefox@wysiwis.net>