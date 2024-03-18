---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nmea/README.md
title: ioBroker.nmea
hash: U06Gr9hESafFHlewxSL4RCzHxbWVW/nJ+R6atcrITFs=
---
![标识](../../../en/adapterref/iobroker.nmea/admin/nmea.png)

# IoBroker.nmea 该适配器允许将 ioBroker 连接到 NMEA-2000 游艇总线。
要使用此适配器，您需要一个可以读取 NMEA-2000 总线并将其转换为串行端口的硬件：

- Actisense NGT-1 (USB)
- 或带有 Pican-M 的 Raspberry PI

![小部件](../../../en/adapterref/iobroker.nmea/img/widgetExamples.png)

## 如何在 Raspberry PI 上使用 Pican-M
PiCAN M 是一款专为 Raspberry Pi 3/4 设计的紧凑型附加板。
它可以将 NMEA2000 和 NMEA0183 网络连接到 Raspberry Pi。
该板可通过外部 12V 电源供电。
此外，当与 PiCAN-M 板一起使用时，它还提供直接通过 NMEA2000 总线为 Raspberry Pi 供电的选项。

由于树莓派对供电的要求较高，我们建议使用外部电源为树莓派供电。
NMEA2000 和 USB 供电可以并行运行，不会出现任何问题。

＃＃＃ 安装
编辑文件`/boot/config.txt`（使用`sudo nano /boot/config.txt`）并将以下行添加到文件末尾：

```
enable_uart=1
dtparam=i2c_arm=on
dtparam=spi=on
dtoverlay=mcp2515-can0,oscillator=16000000,interrupt=25
```

禁用 UART 控制台上的输出：

- 在 CLI 中启动 `sudo raspi-config`
- 转到“3 个界面选项”
- 转到“I5串口”
- 禁用“通过串行访问外壳”和“启用串行端口硬件”
- 退出 raspi-config 并重新启动

安装can-utils

```
sudo apt-get install can-utils
```

## Actisense NGT-1
Actisense NGT-1 在 Windows 或 Linux 上可见，无需任何额外的驱动程序。它显示为串行端口“COMn”（Windows）或ttyN（在Linux上）。

＃＃ 去做
- 编码代码
- 自动识别系统
- 找出为什么从地址 100 发送数据

<!--

### **正在进行中** -->

## Changelog
### 0.0.4 (2024-03-12)
* (bluefox) Fixed CI tests

### 0.0.3 (2024-03-12)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2024 bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.