---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.rpi2/README.md
title: ioBroker.rpi2
hash: fbU6FaS3bzboHSlRMuHMlIk6qVYzKCwSWuDiRMuGnhg=
---
# IoBroker.rpi2

![NPM 版本](https://img.shields.io/npm/v/iobroker.rpi2?style=flat-square)
![下载](https://img.shields.io/npm/dm/iobroker.rpi2?label=npm%20downloads&style=flat-square)
![节点-lts](https://img.shields.io/node/v-lts/iobroker.rpi2?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.rpi2?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/iobroker-community-adapters/iobroker.rpi2?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.rpi2?logo=github&style=flat-square)
![GitHub提交活动](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.rpi2?logo=github&style=flat-square)
![GitHub 最新提交](https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.rpi2?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.rpi2?logo=github&style=flat-square)
![GitHub 工作流状态](https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.rpi2/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Beta](https://img.shields.io/npm/v/iobroker.rpi2.svg?color=red&label=beta)
![稳定的](http://iobroker.live/badges/rpi2-stable.svg)
![已安装](http://iobroker.live/badges/rpi2-installed.svg)

## 版本
适用于 ioBroker 的 RPI-Monitor 适配器

用于集成到 ioBroker 中的 RPI-Monitor 实现。它与 iobroker.rpi 的实现相同，但使用了 GPIO。

## 重要信息
**ioBroker 需要特殊权限才能控制 GPIO。** 在大多数 Linux 发行版中，可以通过将 ioBroker 用户添加到 `gpio` 组来实现这一点。

要使 GPIO 工作，您需要在安装适配器之前（见下文），在版本 `2.x` 中安装 `libgpiod`！

＃＃ 安装
安装完成后，您需要通过管理页面配置所有必需的模块。

iobroker.rpi 启动后，所有选定的模块会在 ioBroker 中以 rpi.<实例>.<模块名称> 的形式生成一个对象树，例如 `rpi.0.cpu`

请确保已安装 python 和 build-essential：

```bash
sudo apt update
sudo apt install -y build-essential python
sudo apt install -y libgpiod-dev
```

（最后一个步骤只有在您需要使用GPIO时才需要）

选中后，以下对象可用：

＃＃＃＃ **中央处理器**
- CPU频率
- 加载1
- load5
- 加载15

#### **树莓派（需要 vcgencmd）**
- CPU电压
- mem_arm
- mem_gpu

＃＃＃＃ **记忆**
- 可用内存
- 内存释放
- 内存总量

#### **网络 (eth0)**
- net_received
- 网络发送

#### **SD卡**
- sdcard_boot_total
- sdcard_boot_used
- sdcard_root_total
- sdcard_root_used

＃＃＃＃ **交换**
- swap_total
- swap_used

＃＃＃＃ **温度**
- soc_temp

#### **正常运行时间**
- 正常运行时间

#### **无线局域网**
- wifi_received
- wifi_send

＃＃ 配置
在配置页面，您可以选择以下模块：

- 中央处理器
- 覆盆子
- 记忆
- 网络
- SD卡
- 交换
- 温度
- 正常运行时间
- 无线局域网

### NVMe温度
自适配器版本 2.3.2 起，您可以读取 NVMe 温度。为此，您需要在系统上安装 `nvme-cli` 软件包。

您可以使用以下命令完成此操作：`sudo apt-get install nvme-cli`。您还需要将该命令添加到 ioBroker sudoers 文件 `/etc/sudoers.d/iobroker`。使用编辑器（例如 nano）打开该文件：`sudo nano /etc/sudoers.d/iobroker`，并在文件末尾添加以下行：`nvme smart-log /dev/nvme0`。

## GPIO
您也可以读取和控制 GPIO。

您只需在设置中配置 GPIO 选项（附加选项卡）即可。

![GPIO](../../../en/adapterref/iobroker.rpi2/img/pi3_gpio.png)

启用某些端口后，对象树中会出现以下状态：

- rpi.0.gpio.PORT.state

端口编号采用 BCM（BroadComm 芯片引脚编号）。您可以使用 ```gpio readall``` 获取编号。

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
您可以读取 DHT11、DHT22 和 AM2302 温度/湿度传感器的数据。

按照[节点-dht-sensor](https://www.npmjs.com/package/node-dht-sensor)封装页面上的说明，将此类传感器连接到GPIO引脚。如前所述，多个传感器可以连接到*多个*引脚（这不是总线系统）。

## Changelog

<!--
	PLACEHOLDER for the next version:
	### **WORK IN PROGRESS**
-->
### 3.0.2 (2025-12-01)
* (@klein0r) Check for required libgpiod-dev package version

### 3.0.1 (2025-11-28)
* (@klein0r) Updated logo, workflows and documentation
* (@klein0r) admin 7.6.17 and js-controller 6.0.11 (or later) are required

### 3.0.0 (2025-11-28)
* (@klein0r) NodeJS 20.x (or newer) is required
* (@klein0r) Updated opengpio to v2 (works on Debian trixie)

### 2.4.0 (2025-03-06)
* (Garfonso) read the current state of GPIO outputs during adapter startup.
* (Garfonso) re-read GPIO input, if set by the user (with ack=false).
* (Garfonso) add an option to invert true/false mapping to 1/0.
* (Garfonso) Allow multiple instances of this adapter per host.
* (Garfonso) tried to improve initialization of GPIO inputs.

### 2.3.2 (2025-02-06)
* (asgothian) added support for NVMe temperature (needs additional configuration, see README)
* (Garfonso) fixed inital values for outputs.

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