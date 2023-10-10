---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.enocean/README.md
title: ioBroker.enocean
hash: y/viydDLxV2KiiNnj5jhcxJRBDdNfxzPs6ESoqDTG3w=
---
![标识](../../../en/adapterref/iobroker.enocean/admin/enocean.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.enocean.svg)
![下载](https://img.shields.io/npm/dm/iobroker.enocean.svg)
![安装数量（最新）](http://iobroker.live/badges/enocean-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/enocean-stable.svg)
![依赖状态](https://img.shields.io/david/jey-cee/iobroker.enocean.svg)
![国家公共管理](https://nodei.co/npm/iobroker.enocean.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/jey-cee/ioBroker.enocean/master.svg)

# IoBroker.enocean
## IoBroker 的 EnOcean 适配器
通过 USB/串行设备与 TCM300 芯片连接 EnOcean 设备

## 加入 Discord 服务器讨论有关 ioBroker-enocean 集成的一切！
<a href="https://discord.gg/4EBGwBE"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

## [赞助商](./SPONSORS.md)
如果您喜欢我的工作，请随时提供个人捐赠（这是 Jey Cee 的个人捐赠链接，与 ioBroker 项目无关！）[![捐赠](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=95YZN2LR59Q64&source=url)

## 兼容的 USB 记忆棒和模块
USB300

带 SMA 端口的 DOSMUNG USB 记忆棒

FAM-USB（ESP3 固件）

EnOcean Pi 模块 **重要提示：** 在 Pi3 和 Pi4 上，您必须禁用板载蓝牙模块，否则 EnOcean 模块将无法工作！

Eltako FGW14：**重要说明**：此网关不支持此适配器的所有功能和设备。
已知不起作用的功能：RSSI、无法读取网关信息以及在没有 FTD14 的情况下只能控制 RS485 总线设备（尚未测试）。如果没有技术原因需要使用此网关，强烈建议使用其他网关。
总线设备报告其总线地址，即以 00 00 00 01 开头。

ALL SMART EnOcean LAN 网关 - ~~[买](https://www.all-smart.net/produkt/all-smart-enocean-lan-gateway/)~~ 不再可用。

ALL SMART EnOcean 多网关 - [买](https://www.all-smart.net/produkt/all-smart-enocean-multi-gateway/)

### [支持的设备](./docs/devices.md)
## 控制设备
一般来说，有一个 cmd 对象，您可以在其中选择要执行的命令。在执行命令之前，您必须设置所有必需的属性，您可以在配置文件定义中找到此信息。

特别的：

* A5-20-xx：具有此配置文件的设备仅在发送消息后 1 秒内接受命令。他们定期发送（10 分钟？），请阅读手册。

## 示教
- 该过程通过适配器配置中的（简短）分步说明进行记录。在那里你可以选择

  您的设备和说明将会显示。跟着他们。

- 无法示教其他设备的设备（例如 Eltako 系列 12，也称为 Opus Green Net）：

它们可以通过虚拟交换机 (F6-02-02) 进行控制：打开配置并单击添加新设备。
现在选择 X_Virtual 作为制造商，选择 Switch 作为设备，使用 ID fffffff0。计算每个新虚拟交换机的最后一个符号 1-9 和 a-f。
单击添加设备并关闭配置。然后根据手册在设备上开始示教，从虚拟交换机发送命令。
现在您应该能够控制该设备。

## 示教（从设备中删除适配器绑定）
- Eltako Tipp-Funk：在 2 秒内从 ioBroker 向设备发送 3 次示教命令
- 带 UTE 的设备：启动适配器的示教并按照设备说明进行操作。
- RPS：只需删除对象
- 无：仅删除对象

＃＃ 故障排除
1. 设备对命令没有反应：
   - 教学过程不成功。根据设备的不同，会发出示教成功的信号，请注意该信号。如果没有信号，请重试。
   - 检查与 CMD 相关的所有属性是否设置正确。
   - 如果 rssi 值高于 -70 dBm，则信号可能太弱。尝试将设备移近网关。
   - 阀门执行器（恒温器）每 x 分钟发送一条消息。收到消息后，设备会在一秒钟内接受命令。要实现此目的，请使用在收到消息后发送命令的脚本。脚本中一个很好的触发器是 rssi 值。

## 配置文件定义文件
＃＃＃＃ 数据结构
***情况：*** 可以是单个元素或数组，包含一组数据字段。对于数组，元素绑定到一个条件。

***send:*** true 表示这组数据是将发送到设备的命令。

***auto_answer:*** true 表示收到设备发来的报文后将执行该命令。

***条件：*** 处理这组数据字段必须满足的条件。在大多数情况下，条件是数据包中的特定值。

***数据字段：*** 数据在数据包中的位置以及如何处理该值的信息。此外，还有 ioBroker 的对象定义。

***数据字段 -> 第二个参数：*** 用于从数据包中获取辅助信息/值。使用案例：单位的数量可能有所不同，因此设备将单位作为单独的信息发送。
要根据发送的信息更改 ioBroker 内部的单位，需要在处理该值时了解这一点。

***数据字段 -> 条件：*** 这可能是转换值的公式。这是基于 JSON-logic 的详细信息，请参阅 http://jsonlogic.com/operations.html。

例子：

```
//True or false
"==": [{"var": "value"}, 0]

//This will take the delivered value and check if it is equal to 0, if it is the state in iobroker will set to true.
```

***datafield -> value:*** 这表示返回的值，但条件是输出值。不应定义比值。

例子：

```
//Temperature conversion from received data
 "+": [{
         "*": [
              { "-": [{"var": "value"}, 0] },
              0.2
            ]}, 0]

//This is a more complex looking formula.
//It is based on this one: Device Value = Multiplier * ( rawValue - Range min) + Scale min
//The Multiplier, in this case 0.2, is calculated in this way: (Scale max - Scale min) / (Range max - Range min)
```

***datafield -> value_out:*** 这表示将发送到设备的值。仅当需要转换时才需要定义此值。

例子：

```
//Temperature conversion from ioBroker
 "/": [{
         "+": [
              { "-": [{"var": "value"}, 0] },
              0
            ]}, 0.2]

//This is a more complex looking formula.
//It is based on this one: Device Value = ( ( rawValue - Range min) + Scale min ) / Multiplier
//The Multiplier, in this case 0.2, is calculated in this way: (Scale max - Scale min) / (Range max - Range min)
```

***数据字段 -> 小数：*** 定义小数点后显示多少位。

***数据字段 -> 单位：*** 如果单位是变量，则使用此字段，否则在 iobroker 中定义它。

例子：

```
//Choose between Watt(W) and Kilowatt(kW) depending on the unit information from the device
 "unit":{
            "if": [
              {"==":[{"var": "value2"}, 3]}, "W",
              {"==":[{"var": "value2"}, 4]}, "kW"
            ]
          }

//value2 comes from secondArgument.
```

## 设备定义
设备的完整实现至少由两部分组成：“lib/devices/MANUFACTURER/MODEL/device.json”中的条目和 EEP 文件，该文件定义对象以及如何处理数据电报。
lib/definitions/devices.js 必须使用新设备进行更新。
有些设备使用多种数据电报类型进行通信，这意味着它们有更多的 EEP 文件。
在特殊情况下，如 Eltako，在定义的“packet_handler.js”中还有制造商特定的部分。

```
"Model name or type" : {
      "EEP": [                    //The EEP(s) that will be used for this device. First one has to be the one that controlls the device.
        "TF-13-07",
        "TF-13-06"
      ],
      "autocreate": false,         //false if the device needs additional steps for teachin
      "teachin_method": "none",    //filter for automated teachin telegrams
      "id_offset": true,           //not all devices checks if the telegram whether it is for them. Not applicable where teachin_method is 4BS.
      "broadcast": false,          //true if the receiver id has to be ffffffff. This is used for virtual devices like a switch.
      "help": {                    //a step by step instruction how to add the device.
        "en": {
          "1": "Enter device ID.",
          "2": "Click on 'Add Device'."
        },
        "de": {
          "1": "Geräte ID eintragen.",
          "2": "Auf 'Gerät Hinzufügen' klicken."
        }
      }
    }
```

## 用于开发
要测试电报处理，请创建一个名为development的通道，并在此通道中创建一个名为telegram的对象，输入字符串。

## Changelog

### 0.9.1 (2023-09-01)
* (Jey Cee) added support for Eltako FKD-am
* (Jey Cee) added Afriso ASD 20
* (Jey Cee) added EEP F6-05-02
* (Jey Cee) change log level for missing /dev/serial/by-id
* (Jey Cee) change log level for initial information request on gateway
* (Holger Will) update X1-01-02.json

### 0.9.0 (2023-07-27)
* added Afriso ASD 10
* fix D2-05-00 Goto top/bottom
* catch error while update objects on adapter start
* workaround for serial port selection does not display all options

### 0.8.5 (2023-02-11)
* rework TF-13-25, fixes Eltako DSZ14 (#87)
* rework TF-13-14, SP uses now temperature range 0-40°C
* remove useless object ASC from A5-20-01
* added Afriso FT & FTF
* added R-Tronic RT B (A5-10-06 + RPS)
* added Eltako F3Z14D, FWZ14, FRGBW14, FWS81
* added new teachin telegram for FUD61NPN-230V
* added remove button to device list in config
* added profile F6-05-01
* fix F6-10-00: The close state was not set, the window was always shown as open.
* fix multiple conditions in eep's
* fix Eltako FGW14-USB does not receive status updates
* fix lastID is null when using Eltako FGW14-USB
* fix TF-01-01 TT and TTT both set on incoming telegram, only TT has to be set
* fix I1-01-01 invalid telegram send by on and off
* fix device definition Oventrop mote 420
* fix missing zeros in front of sender IDs while using FGW14
* fix incomplete data while receiving type 10 messages
* fix missing device name
* code cleanup and refactoring

[Older changelog entries are moved to changelog.md](changelog.md)

## License
Attribution-NonCommercial 3.0 (CC BY-NC 3.0)

Copyright (c) 2023 Jey Cee <iobroker@all-smart.net>

http://creativecommons.org/licenses/by-nc/4.0/

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).