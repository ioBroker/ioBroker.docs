---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.rpi2/README.md
title: 无标题
hash: cWeo+oq08XAAh++hWgPAHjLTCo8IlnCkgOpYAAeWOEM=
---
![标识](../../../en/adapterref/iobroker.rpi2/admin/rpi2.png) ioBroker RPI 监控适配器

![NPM 版本](https://img.shields.io/npm/v/iobroker.rpi2.svg)
![下载](https://img.shields.io/npm/dm/iobroker.rpi2.svg)
![安装数量](https://iobroker.live/badges/rpi2-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/rpi2-stable.svg)
![新平台](https://nodei.co/npm/iobroker.rpi2.png?downloads=true)

==============

**测试：**![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.rpi2/workflows/Test%20and%20Release/badge.svg) RPI-Monitor 实现，用于集成到 ioBroker。它与 iobroker.rpi 的实现相同，但带有 GPIO。

## 重要信息
仅适用于节点 >= 18

**ioBroker 需要特殊权限来控制 GPIO。**在大多数 Linux 发行版中，可以通过将 ioBroker 用户添加到 `gpio` 组（推荐）或在 `root`（不太安全）下运行 ioBroker 来实现。

为了使 gpio 正常工作，您需要在安装适配器之前安装 libgpiod，如下所示：`sudo apt-get install -y libgpiod-dev`

＃＃ 安装
安装后，您必须通过管理页面配置所有必需的模块。

iobroker.rpi 启动后，所有选定的模块都会在 ioBroker 中的 rpi.<instance>.<modulename> 中生成一个对象树，例如 rpi.0.cpu

确保已安装 python 和 build-essential：

```
sudo apt-get update
sudo apt-get install -y build-essential python
sudo apt-get install -y libgpiod-dev
```

（如果你想使用 GPIO，最后一个才是必需的）

选择后，以下对象可用：

＃＃＃＃ **中央处理器**
-CPU频率
- 加载1
- 负载5
- 负载15

#### **Raspberry（需要 vcgencmd）**
-CPU电压
-内存臂
-内存

＃＃＃＃ **记忆**
-内存可用
-内存释放
- 内存总量

#### **网络（eth0）**
- 净接收量
- 网络发送

#### **SD卡**
- SD卡启动总数
-sdcard_boot_used
- SD卡根目录
-sdcard_root_已使用

＃＃＃＃ **交换**
-交换总数
- swap_used

＃＃＃＃ **温度**
-soc_temp

**正常运行时间**
- 正常运行时间

**无线局域网**
-wifi_received
-wifi_发送

＃＃ 配置
在配置页面上您可以选择以下模块：

- 中央处理器
- 覆盆子
- 记忆
- 网络
- SD卡
- 交换
- 温度
- 正常运行时间
无线局域网

### NVME 温度
从适配器版本 2.3.2 开始，您可以读取 NVMe 温度。为此，您需要在系统上安装 `nvme-cli` 包。
您可以使用以下命令执行此操作：`sudo apt-get install nvme-cli`。您还需要将该命令添加到 ioBroker sudoers 文件 `/etc/sudoers.d/iobroker`。使用编辑器打开它，例如 nano：`sudo nano /etc/sudoers.d/iobroker` 并在底部添加以下行：`nvme smart-log /dev/nvme0`。

GPIO
您也可以读取和控制 GPIO。
您需要做的就是在设置中配置 GPIO 选项（附加选项卡）。

![GPIO](../../../en/adapterref/iobroker.rpi2/img/pi3_gpio.png)

启用某些端口后，对象树中会出现以下状态：

-rpi.0.gpio.PORT.状态

端口编号为 BCM（芯片上的 BroadComm 引脚）。您可以使用 ```gpio readall``` 获取枚举。
例如 PI2：

```
+-----+-----+---------+------+---+---Pi 2---+---+------+---------+-----+-----+
| BCM | wPi |   Name  | Mode | V | Physical | V | Mode | Name    | wPi | BCM |
+-----+-----+---------+------+---+----++----+---+------+---------+-----+-----+
|     |     |    3.3v |      |   |  1 || 2  |   |      | 5v      |     |     |
|   2 |   8 |   SDA.1 | ALT0 | 1 |  3 || 4  |   |      | 5V      |     |     |
|   3 |   9 |   SCL.1 | ALT0 | 1 |  5 || 6  |   |      | 0v      |     |     |
|   4 |   7 | GPIO. 7 |   IN | 1 |  7 || 8  | 0 | IN   | TxD     | 15  | 14  |
|     |     |      0v |      |   |  9 || 10 | 1 | IN   | RxD     | 16  | 15  |
|  17 |   0 | GPIO. 0 |   IN | 0 | 11 || 12 | 0 | IN   | GPIO. 1 | 1   | 18  |
|  27 |   2 | GPIO. 2 |   IN | 0 | 13 || 14 |   |      | 0v      |     |     |
|  22 |   3 | GPIO. 3 |   IN | 0 | 15 || 16 | 0 | IN   | GPIO. 4 | 4   | 23  |
|     |     |    3.3v |      |   | 17 || 18 | 0 | IN   | GPIO. 5 | 5   | 24  |
|  10 |  12 |    MOSI |   IN | 0 | 19 || 20 |   |      | 0v      |     |     |
|   9 |  13 |    MISO |   IN | 0 | 21 || 22 | 1 | IN   | GPIO. 6 | 6   | 25  |
|  11 |  14 |    SCLK |   IN | 0 | 23 || 24 | 1 | IN   | CE0     | 10  | 8   |
|     |     |      0v |      |   | 25 || 26 | 1 | IN   | CE1     | 11  | 7   |
|   0 |  30 |   SDA.0 |   IN | 1 | 27 || 28 | 1 | IN   | SCL.0   | 31  | 1   |
|   5 |  21 | GPIO.21 |   IN | 1 | 29 || 30 |   |      | 0v      |     |     |
|   6 |  22 | GPIO.22 |   IN | 1 | 31 || 32 | 0 | IN   | GPIO.26 | 26  | 12  |
|  13 |  23 | GPIO.23 |   IN | 0 | 33 || 34 |   |      | 0v      |     |     |
|  19 |  24 | GPIO.24 |   IN | 0 | 35 || 36 | 0 | IN   | GPIO.27 | 27  | 16  |
|  26 |  25 | GPIO.25 |  OUT | 1 | 37 || 38 | 0 | IN   | GPIO.28 | 28  | 20  |
|     |     |      0v |      |   | 39 || 40 | 0 | IN   | GPIO.29 | 29  | 21  |
+-----+-----+---------+------+---+----++----+---+------+---------+-----+-----+
| BCM | wPi |   Name  | Mode | V | Physical | V | Mode | Name    | wPi | BCM |
+-----+-----+---------+------+---+---Pi 2---+---+------+---------+-----+-----+
```

## DHTxx/AM23xx 传感器
您可以从 DHT11、DHT22 和 AM2302 温度/湿度传感器读取。

按照 [节点-dht-传感器](https://www.npmjs.com/package/node-dht-sensor) 封装页面的说明将此类传感器连接到 GPIO 引脚。如前所述，可以将多个传感器连接到*多个*引脚（这*不是*总线系统）。

## Changelog

<!--
	PLACEHOLDER for the next version:
	### **WORK IN PROGRESS**
-->
### 2.4.0 (2025-03-06)
* (Garfonso) read the current state of GPIO outputs during adapter startup.
* (Garfonso) re-read GPIO input, if set by the user (with ack=false).
* (Garfonso) add an option to invert true/false mapping to 1/0.
* (Garfonso) Allow multiple instances of this adapter per host.
* (Garfonso) tried to improve initialization of GPIO inputs.

### 2.3.2 (2025-02-06)
* (asgothian) added support for NVMe temperature (needs additional configuration, see README)
* (Garfonso) fixed inital values for outputs.

### 2.3.1 (2025-01-06)
* (Garfonso) fixed: GPIO library failed to load after recent dependency update.

### 2.3.0 (2024-12-23)
* (Garfonso) correct interpretation of start value setting. Output with initial value 0/1 will set GPIO accordingly during startup. Output without an initial state will not set GPIO at all.

### 2.2.2 (2024-11-02)
* (simatec) responsive design for settings page added

## License
MIT License

Copyright (c) 2024-2025 Garfonso <garfonso@mobo.info>

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