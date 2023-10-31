---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.pylontech/README.md
title: ioBroker.pylontech
hash: Q5HfJ84syyGgINL0APZig8eFJDPo/CdNQ88wrdNsRys=
---
![标识](../../../en/adapterref/iobroker.pylontech/media/logo.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.pylontech.svg)
![下载](https://img.shields.io/npm/dm/iobroker.pylontech.svg)
![安装数量](https://iobroker.live/badges/pylontech-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/pylontech-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.pylontech.png?downloads=true)

# IoBroker.pylontech
**测试：** ![测试与发布](https://github.com/PLCHome/ioBroker.pylontech/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 pylontech 适配器
通过控制台查询 pylontech 电池的电压和状态。我不隶属。

**请注意，您构建或连接的所有内容始终由您负责。该适配器的开发商对任何损坏不承担任何责任！**

＃＃ 怎么运行的
该适配器用于确定 Pylontech 阵列的健康状态和功能，该阵列可由一节或最多十五块电池组成。
该适配器不用于控制电池。这是充电和电源装置或逆变器的一部分。
电池具有提供 RS232 或 V24 接口的控制台连接。该适配器通过串行接口与其连接。
第一个电池提供所有数据并通过上行链路询问其他电池。
注意，无法直接连接 Raspberry 或 ESP。 RS232 接口没有 TTL 电平，也不设计用于 3 伏或 5 伏电压。连接时需要电平转换器。您将在下面找到施工说明。

## 连接需要什么？
连接需要电缆和串行转换器。
串行连接需要三根线 rxd、txd 和地。

Rxd 和Txd 必须交叉。以便一个发送 (Txd) 的内容可以被另一个接收 (Rxd)。需要接地才能建立电压并启动电流。

### 串行连接电缆
Pylontech 随着时间的推移更换了电池上的 RJ 插头。
一开始有一个像电话一样的RJ11插头。现在网络连接就像RJ45一样。
下图显示了电缆上的标准九针 D-SUB 母连接器。
该电缆可通过 USB 端口轻松连接到 RS232 转 USB 适配器或 RS232 转 LAN 或 WIFI 转换器。
只有阵列中的第一个电池提供所有信息。您只需要一根电缆和一个串口

您可以使用 [可配置插头](https://www.amazon.de/gp/product/B0C8JFWNR7) 自行组装此类电缆。它配有 RJ45 连接器和 D-SUB9 母插头。您只需将一根跳线连接到它即可。 **但要小心地将其余电缆绝缘好，以免它们相互接触。并非所有电池都有未使用的剩余引脚。** 原则上，您还可以将 RJ11 电缆连接到此类适配器。但我发现它很不稳定，总觉得接触不好。

![插头](../../../en/adapterref/iobroker.pylontech/media/configurablePlug.jpg)

或者在[论坛](https://forum.iobroker.net/topic/68707)中联系现成的电缆。

![卡贝尔](../../../en/adapterref/iobroker.pylontech/media/Kabel.jpg)

#### RJ45
| RJ45 |信号|数字SUB |信号|
| ---- | ------ | ---- | ------ |
| 8 |地面| 5 |地面|
| 3 |发送 | 2 |接收 |
| 6 |接收 | 3 |发送 |

![RJ45](../../../en/adapterref/iobroker.pylontech/media/8p.jpg)

#### RJ11 / RJ12
RJ11 和 RJ12 连接器尺寸相同。 RJ11 只有四个触点，RJ12 有六个触点。 RJ11的触点位于插头的中间，这就是它们计数方式不同的原因。从物理上讲，触点位于同一位置。

| RJ11 | RJ12 |信号|数字SUB |信号|
| ------ | ------ | ------ | ---- | ------ |
| 1 或 4 | 2 或 5 |地面| 5 |地面|
| 3 | 4 |发送 | 2 |接收 |
| 2 | 3 |接收 | 3 |发送 |

![RJ11/RJ12](../../../en/adapterref/iobroker.pylontech/media/4p.jpg)

Cisco 路由器有带 USB 端口的 RJ45 控制台电缆。这些没有兼容的占用。不过，只要有一点经验，就可以更换 RJ45 插头。

请注意，由于 115200 波特的 RS232 连接传输速率相对较高，因此电缆不能特别长。

|最大限度。波特率|最大限度。长度|
| ----------- | ----------- |
| 2400 | 2400 900m |
| 4800 | 300m |
| 9600 | 9600 152m |
| 19.200 | 19.200 15m |
| 57.600 | 57.600 5m|
| **115.200** | **2米** |

如果附近没有 USB 端口，您可以使用 ESP 构建一个串口转 WiFi 适配器。

这些适配器采用一种 Telnet 方式，本质上是通过 WiFi 扩展串行接口。这里重要的是安装串行接口的驱动程序模块。例如。 MAX3232。请注意电压，但大多数都是3V。

#### Raspi 与 MAX
由于Raspberry还提供了3V的TTL接口，因此您还可以在此处连接MAX3232。

![拉斯皮与 MAX](../../../en/adapterref/iobroker.pylontech/media/rpicom.jpg)

阅读更多http://www.savagehomeautomation.com/projects/raspberry-pi-rs232-serial-interface-options-revisit.html

#### 在 Linux (Debian / Raspi) 上查找端口
在 Linux 下，可以设置连接 USB 串行转换器的端口的链接。
然后可以为设备分配描述性名称。

```
$ ls -l /dev
crw-rw---- 1 root dialout 188,     0 29. Sep 21:32 ttyUSB0
lrwxrwxrwx 1 root root             7 29. Sep 21:32 ttyUSB_pylontech -> ttyUSB0
```

如果 USB 转换器有序列号，则可以确定该序列号。

```
$ udevadm info -a /dev/ttyUSB0 | grep ATTRS{serial}
      ATTRS{serial}=="thisisit"
```

如果这里没有序列号，你就输了。请确保适配设备ttyUSBx。

创建一个新的配置文件。使用您选择的编辑器，VI 也是可以的。

```
sudo nano /etc/udev/rules.d/20_pylontech.rules
```

具有以下内容

```
# File: /etc/udev/rules.d/20_pylontech.rules
# FTDI USB <-> Serial
SUBSYSTEM=="tty", \
ATTRS{serial}=="thisisit", \
SYMLINK+="ttyUSB_pylontech"
```

然后您应该重新启动 udev 并断开并重新连接设备一次。

```
sudo /etc/init.d/udev restart
```

#### Linux 上查找端口第二种方法
您可以为每个设备找到一个唯一的名称。它不会因 FTDI 或类似的东西而改变。这也可以输入到适配器中。

```
$ ls -l /dev/serial/by-id
lrwxrwxrwx 1 root root 13 10. Okt 11:37 usb-ftdi_usb_serial_converter_ftDZ0DGP-if00-port0 -> ../../ttyUSB0
```

所以设备是`/dev/serial/by-id/usb-ftdi_usb_serial_converter_ftDZ0DGP-if00-port0`

### Com 通过 TCP
而不是本地连接：

```
+--------+   comport  +----------+
| DEVICE | ~~~~~~~~~~ | ioBroker |
+--------+            +----------+
```

该适配器是否也支持网络连接：

```
+--------+   comport  +--------+       network        +----------+
| DEVICE | ~~~~~~~~~~ | SERVER |========....==========| ioBroker |
+--------+            +--------+                      +----------+
```

#### ESP 与 MAX
有几个项目将 ESP 或 ESP32 连接到 Telnet。请记住MAX。如果 MAX 变热，则可能是 5V 信号电平太高，因为您使用的是 3.3V 型号，或者您已将 3.3V 版本连接到 5V 工作电压。

![ESP-LINK](../../../en/adapterref/iobroker.pylontech/media/esp-link.jpg)

这里有些例子：

ESP-LINK：https://github.com/jeelabs/esp-link

ESP-Serial-Bridge：https://github.com/yuri-rage/ESP-Serial-Bridge

WiFi 串行端口：https://www.instructables.com/Serial-Port-Over-WiFi/

也可以使用 Tasmota：https://tasmota.github.io/docs/Serial-to-TCP-Bridge/

只有以下或者自编译的才可以作为bin，否则不包含TCP服务器：

* http://ota.tasmota.com/tasmota32/release/tasmota32-zbbrdgpro.bin
* http://ota.tasmota.com/tasmota/release/tasmota-zbbrdgpro.bin

Gipos 必须预先设置。 TCP Rx 和 TCP Tx 各一个。

```
TCPBaudRate 115200
TCPStart 23
Rule1 ON System#Boot do TCPStart 23 endon
Rule1 1
```

它之所以有效，是因为在端口 23 上提供了透明 TCP 服务器。可以选择端口，例如，只需将 23 交换为 9000。
**当然还要在 Gipos 和 RJ/DSUB 插头之间焊接 MAX2323!!!!**

#### Linux 到网络
您可以使用 ser2net 通过网络共享 PC 或迷你 Raspi 的端口。

```
sudo apt-get ser2net            #install
sudo vim /etc/ser2net.conf      #configure
ser2net                         #run service
```

与上面的 Windows 设置相对应的配置行（对于 /etc/ser2net.conf）

```
7000:telnet:0:/dev/ttyUSB0:115200 8DATABITS NONE 1STOPBIT remctl
```

RFC 以下是上述配置的设置。设备端口为7000。

- 7000 - 端口
- /dev/ttyUSB0 - 串口名称
- 115200 ... - 波特率等（实际上你可以跳过它，因为 remctl）
- remctl - 表示使用自 RFC2217 起的远程端口配置

更多信息可以在这里找到：https://gist.github.com/DraTeots/e0c669608466470baa6c

#### 准备好硬件
有现成的硬件可以通过 wifi 和/或 LAN 连接。只要它使用透明的 TCP 服务器就应该可以工作。

例子：

- Waveshare RS232/485 转 ETH（适用于欧盟）

## 不管怎样，如果您有任何需要，也可以在ioBroker论坛通过PM联系我。
另一个提示：USB 串行转换器有便宜的也有昂贵的。名称中带有 CHxxx PLxxx 和 CPxxx 的转换器没有任何识别特征。如果你连接其中两个，然后交换端口或第一次启动，你就不再知道谁是谁。因此，最好选择带有 FTDI 和序列号的好产品。还有一些不错的串行转换器，没有 FTDI 芯片，但有序列号。

### 已测试的硬件
我还处于开始阶段。
测试了什么：

#### RS232 至 ioBroker
|通讯硬件|类型 |正在工作 |评论 |
| ----------------------------------- | ------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|串口转USB |本地|是的 |适配器有多种芯片可供选择。根据型号的不同，如果适配器没有序列号并且连接了多个适配器，则可能会出现识别问题。 Windows 已为每个 USB 插头分配一个 COM 端口。 |
| LogiLink AU0034 |本地 |是的 | |
| ESP-LINK |网络|是的 |为设备分配网络中的 IP。检查传输速度 115200 8 N 1. 其他一切保持不变。记得使用像 MAX | 这样的转换器。 |
| Waveshare RS232/485 转 ETH（适用于欧盟）|网络|是的 |为设备分配网络中的 IP。检查传输速度 115200 8 N 1. 其他一切保持不变。使用 RS232 SUBD 端口。 |
| Waveshare RS232/485/422 转 POE ETH |网络|是的 |为设备分配网络中的 IP。检查传输速度 115200 8 N 1. 其他一切保持不变。使用 RS232 SUBD 端口。转换器可通过 POE 供电。如果 POE 可用，则电池附近不需要电源。 |

#### 电池
| Pylontech模型|型号|固件|正在工作 |评论 |
| ---------------- | ----- | ------------- | ---------- | ------------------------------------------ |
| 5000 美元 |美国 | V1.3 22-08-10 |很好| |
| US2000C |美国 | V2.6 21-09-26 |很好| |
| 2000 美元 (US2KBPL) |美国 | V2.8 21-04-29 |很好|温度仅增加一度 |
|力 H2 |力| V1.5 21-06-18 |很好|注意：在某些 Force 手册中，连接器描述中仅列出了 RX 和 TX 连接。接地位于 PIN 8 上，也必须连接。 |

如果您使用硬件，请在论坛或 Github 上给我写信作为问题。我们很乐意继续这份清单。

ioBroker论坛：https://forum.iobroker.net/topic/68707

＃＃＃ 联系
只有数组中的第一个 Accu 提供所有信息。如果您将此适配器连接到以下 Accu 之一，它将不再工作，因为此 Accu 无法响应所有请求。

请注意：**RS485 和 Canbus 接口不适用于此适配器。他们说不同的语言。**

![电池组](../../../en/adapterref/iobroker.pylontech/media/battery_stack.JPG)

警察局还设有一个终端。

![力量](../../../en/adapterref/iobroker.pylontech/media/H2.JPG)

## 管理界面
ioBroker 管理界面中的设置：

＃＃＃ 联系
#### 连接方式
您可以选择本地设备，即本地连接到计算机的接口，例如USB 转换器，或 TCP-IP 网络服务器作为接口。

选项：

- 本地设备
- 网络设备

### 本地设备
仅当在“连接方式”中选择“本地设备”时，才会显示以下字段。

#### 本地设备路径
如果选择“本地设备”，则必须设置路径或端口。 NodeJs在Linux中思考，所以如果没有找到指定的windows设备也会报告path not found。标准设备由适配器搜索并作为选择列表提供，但这仅在适配器运行时才有效，因为这需要与实例通信。仅提供设备，没有替代设备标识符，也没有 unicname，但可以手动输入这些设备。
请参阅本地接口部分。

####传输速度
可以在这里设置传输速度。在较新的型号上，此值设置为 115200。对于旧型号，为 1200。如果未建立连接，您可以尝试适配器是否以 1200 运行。如果是这种情况，可以使用状态“pylontech.-n- .config.set_speed”将速度设置为 115200。然后必须将适配器速度设置回 115200。

### 网络设备
仅当在“连接方式”中选择了网络设备时，才会显示以下字段。
尚无法建立加密网络连接。

#### 网络主机
在此输入 com 服务器的名称。名称开头没有 http 或类似内容。可以输入 IP 地址或名称，例如 ESP-LINK.FRITZ.BOX。对于 DHCP 设备，请注意 IP 地址可能会更改。

#### 网络端口
为了建立通信，必须指定服务器提供通信的端口。例如，对于 ESP-Link，该值为 23。

####传输速度
必须在网络设备上设置速度。

### 循环时间（分钟）
可以在此处设置循环时间。我个人认为 5 分钟足以了解电池是否工作正常。请注意，电池应主要与逆变器通信，而不是与调试器通信。

＃＃＃ 模型
您可以在此处选择型号。您目前可以在 US 和 Force 之间进行选择。你不能摧毁任何东西。因此，请随意测试您的 Pylontech 正在运行的设置。还有一些列在兼容性列表的顶部。如果不行，您可以通过ioBroker论坛联系我，我们可以看看为什么无法读取数据。

ioBroker论坛：https://forum.iobroker.net/topic/68707

### 确定为 US 模型读取哪些数据
如果由于适配器请求电池无法提供的数据而发生错误，则可以在此处停止请求。该适配器是在重新设计的基础上构建的，所以我可能需要做出改进。
如果您的对象太多，您也可以减少此处的数据。

#### 下载电池数据
仅当在此处设置时，命令“bat -n-”才会写入控制台。

#### 下载电池的健康状态
仅当在此处设置时，命令“soh -n-”才会写入控制台。

#### 下载电池信息数据
命令“info -n-”始终写入控制台。您可以在此处找到有关各个电池的序列号的信息。对象树需要它。如果关闭，信息将不会传输到 ioBroker。

#### 下载日志数据
仅当在此处设置时，命令“log”才会写入控制台。

#### 下载电池电量数据
“pwr”命令始终写入控制台。仅当在此处设置时，命令“pwr -n-”才会写入控制台。您可以在此处找到有关各个电池位置的信息。对象树需要它。如果关闭此功能，则来自“pwr”命令的信息不会传输到 ioBroker，并且不会发出“pwr -n-”命令。

#### 下载电池统计数据
仅当在此处设置时，命令“stat -n-”才会写入控制台。

#### 下载时间信息
仅当在此处设置时，命令“time”才会写入控制台。

### 确定为模型 Force 读取哪些数据
如果由于适配器请求电池无法提供的数据而发生错误，则可以在此处停止请求。该适配器是在重新设计的基础上构建的，因此我可能需要做出改进。
如果您的对象太多，您也可以减少此处的数据。

#### 下载电池数据
仅当在此处设置时，命令“bat”才会写入控制台。

#### 下载电池的健康状态
仅当在此处设置时，命令“soh”才会写入控制台。

#### 下载电池信息数据
仅当在此处设置时，命令“info”才会写入控制台。

#### 下载日志数据
仅当在此处设置时，命令“log”才会写入控制台。

#### 下载电池电量数据
仅当在此处设置时，命令“pwr”才会写入控制台。

#### 下载电池统计数据
仅当在此处设置时，命令“stat”才会写入控制台。

####下载电池系统信息数据
仅当在此处设置时，命令“sysinfo”才会写入控制台。

#### 下载单位数据
仅当在此处设置时，“命令单元”才会写入控制台。

#### 下载时间信息
仅当在此处设置时，命令“time”才会写入控制台。

## US 模型的值和操作
几乎所有测量值都以毫（千分之一）为单位存储在这里。

- 毫摄氏度
- 毫安
- 毫安小时

大多数值必须除以千才能查看。

### 通道-SN-.battery-nn-
这里存储了以下命令的信息

- 命令“所以-n-”
- 命令“bat -n-”

### 频道-SN-.info
这里存储了以下命令的信息

- 命令“信息-n-”

### 通道-SN-.power
这里存储了以下命令的信息

- 命令“pwr”
- 命令“pwr -n-”

### 通道-SN-.statistic
这里存储了以下命令的信息

- 命令“stat -n-”

## Force 模型的值和操作
去做

### 通道配置
#### 状态 set_speed
您可以将“set_speed”状态写入“true”而无需确认。在较旧的型号上，会向电池发送一条命令来纠正速度。对于较新的型号，会返回错误消息。
写入命令时，Ack 设置为 true。

### 美国频道信息
#### 状态连接
如果适配器能够建立通信则为 true

#### 状态-n-.connected
当找到电池时设置为 true。

#### 状态-n-.条形码
包含条形码（序列号），用于跟踪哪个电池安装在电池组的哪个位置。

### 频道日志
日志通道包含31个通道，包含最近31条日志信息。 neuset始终位于31，然后当有新消息时被下推。

### 频道时间
#### 状态 ds3231、rtc 或时间
从逆变器读取的时间存储在这里。在 US3000 上，它称为 RTC，在旧的 VS2000 上，它称为 ds3231。如果您写入时间，您的时间将转移到电池中，并且电池时间将被调整。

#### 状态集
如果为 true 且未写入 ack 来设置，则将当前时间发送到 Pylontech。当命令执行后，状态设置为 ack = true。

### 频道信息 力量
#### 状态连接
如果适配器能够建立通信则为 true

### 频道日志
日志通道包含31个通道，包含最近31条日志信息。 neuset始终位于31，然后当有新消息时被下推。

### 频道时间
#### 状态 ds3231、rtc 或时间
从逆变器读取的时间存储在这里。在 US3000 上，它称为 RTC，在旧的 VS2000 上，它称为 ds3231。如果您写入时间，您的时间将转移到电池中，并且电池时间将被调整。

#### 状态集
如果为 true 且未写入 ack 来设置，则将当前时间发送到 Pylontech。当命令执行后，状态设置为 ack = true。

## Changelog

### 0.0.6 (09.10.2023)

- (PLCHome) The sent command was recognized from the response. Now the command is passed to the parser.

### 0.0.5 (05.10.2023)

- (PLCHome) Implemenmt the force H2. Thanx to radi for suppoting this project!

### 0.0.4 (04.10.2023)

- (PLCHome) Removed RFC2217.
- (PLCHome) Changed interval to this.interval.
- (PLCHome) Change the connection procedure to catch the exception.

### 0.0.3

- (PLCHome) initial release

## License

MIT License

Copyright (c) 2023 PLCHome

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