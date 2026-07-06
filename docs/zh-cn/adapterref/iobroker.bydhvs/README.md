---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.bydhvs.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.bydhvs.svg
BADGE-Number of Installations: https://iobroker.live/badges/bydhvs-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/bydhvs-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.bydhvs.png?downloads=true
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bydhvs/README.md
title: 比亚迪HVS消息的结构
hash: ivS/3Uo2lXRDo8NTqbOQ+atzevFaI9uKutZFWHsuwMA=
---
# BYD HVS消息的结构
## 消息捕获
这些信息是通过捕获Be Connect软件与硬件之间的通信而解密的。每条信息的具体位置和内容均由社区解读，可能存在误差。请仅参考比亚迪或其子公司发布的官方信息。

## 消息
TCP 连接建立后，通信需要发送命令来接收数据或执行测量。smarthomeNG 项目将其描述为类似于 ModBus，即通过 TCP 连接读写寄存器。

https://github.com/lgb-this/plugins/blob/develop/byd_bat/user_doc.rst 所有消息的前两个字节都包含头部信息。

### 消息 0 - 建立连接和基本数据
发送的消息是```010300000066c5e0```

| 字节 | 类型 | 描述 |
|:-- |:--:|:--|
| 3 至 21 | 字符串 | 这是序列号。第 2 个字符可以识别硬件类型（HVS、HVM 等） |
| 27 + 28 | 字符 | 第一个 BMU 的版本格式为 V(27).(28) |
| 29 + 30 | 字符 | 版本格式为 V(29).(30)，适用于第二个 BMU |
| 33 | 整数 | 已使用塔式 BMU |
| 36 | 2 个独立的字节整数 | 1 字节 - 塔；2 字节 - 模块（2³ => 2 个塔和 3 个模块） |
| 38 | 枚举 | 0：离网；1：并网；2：备份 |

### 消息 1 - 系统诊断
发送的消息是```01030500001984cc```

| 字节 | 类型 | 描述 |
|:-- |:--:|:--|
| 3 | int16 有符号 | 整个系统的 SOC |
| 5 | int16 有符号数 | 系统最大电压 |
| 7 | int16 有符号数 | 系统最小电压 |
| 9 | int16 有符号 | 系统 SOH |
| 11 | int16 有符号 | 系统安培 |
| 13 | int16 unsigned | 电池电压（SF 100） |
| 15 | 有符号整数16 | 最高温度 |
| 17 | 有符号整数16 | 最低温度 |
| 19 | int16 有符号整数 | 电池温度 |
| 29 | int16 有符号 | 错误编号 |
| 31 + 32 | 个字符 | 参数 T |
| 35 | int16 unsigned | 输出电压，SF 100 |
| 37 | int16 无符号 | 系统总电荷 |
| 41 | int16 无符号 | 系统总排放量 |

### 消息 2 - 系统诊断
发送命令为```010300100003040e```

| 字节 | 类型 | 描述 |
|:-- |:--:|:--|
| 3 | 枚举 | 反相器类型 |
| 5 |枚举 |电池类型：0：HVL； 1：HVM； 2：HVS |

### 消息 5 - 塔台基本信息
| 字节 | 类型 | 描述 |
|:-- |:--:|:--|
| 5 | int16 有符号 | 塔最大电压 |
| 7 | int16 已签名 | 塔最小伏特 |
| 9 | 整数 | 最大电压电池编号 |
| 10 | 整数 | 最小电压电池编号 |
| 11 | 有符号整数16 | 最高温度 |
| 13 | 16 位有符号整数 | 最低温度 |
| 15 | 整数 | 最高温度单元 |
| 16 | 整数 | 最小温度单元编号 |
| 17 - 32 | 最高有效位 (MSB)、最低有效位 (LSB) | 平衡标志 |
| 33 | int32 无符号 | 塔台总费用（含 SF 1000） |
| 37 | int32 无符号 | 塔排放总量（SF 1000） |
| 45 | int16 有符号 | 塔电池电压 SF 10 |
| 51 | int16 已签名 | 塔伏特输出 |
| 53 | int16 有符号 | SOC 百分比 |
| 55 | int16 有符号 | SOH 百分比 |
| 57 | int16 已签名 | Currentamperes |
| 59 + 60 | 十六进制 | 状态 |

## 词汇表
| 简短 | 描述 |
|:--:|:-- |
| SF | 比例因子（数值 1234 且 SF 为 100 => 实际值：12.34） |

## Changelog
### 1.5.11 (2026-04-26)
* (arteck) del deprectated setStateAsync

### 1.5.10 (2026-04-26)
* (arteck) fix Modbus Exception – fc=0x3 exCode=0x4 in State 7
* (arteck) add Max retry attempts after error into settings

### 1.5.9 (2026-04-25)
* (arteck) fix wrong package
* (arteck) fix Modbus-RTU

### 1.5.8 (2026-04-23)
* (arteck) typo

### 1.5.7 (2026-04-23)
* (arteck) fix tower count > 1

###

## License
MIT License

Copyright (c) 2026 Christian <github@familie-herrmann.de>

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