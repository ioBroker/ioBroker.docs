---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hausbus_de/README.md
title: iobroker.hausbus_de
hash: ZnyoDSWe3HkqtcNMEUQ6T/17g+LeOpskkJLiCNUbH5M=
---
![标识](../../../en/adapterref/iobroker.hausbus_de/admin/hausbusde.png)

# Iobroker.hausbus_de
支持所有 haus-bus.de 组件的 IO Broker Adapter。<br>有关支持的硬件和 IO Broker 集成的文档，请查看<br>www.haus-bus.de/iobroker

＃＃ 安装<a name="installation"></a>
该适配器在官方 ioBroker 目录中作为稳定版本提供。<br>建议直接从 ioBroker 内的目录安装。<br>如果您需要比官方 ioBroker 目录中提供的更新的版本，您也可以直接从 github 安装此版本。<br>如果您遇到任何问题或错误，请联系 info@haus-bus.de<br>

＃＃ 设置
HausBus.de 适配器无需进一步配置即可使用。它使用 UDP 广播请求自动搜索 haus-bus.de 组件。必须至少有一个带有网络接口的 haus-bus.de 组件（例如任何中继模块），该组件连接到与 io 代理相同的网络。任何其他组件都可以通过 RS485 连接到带有以太网网关的模块。

<br> <br> <br>

## Changelog
### 1.4.6 (2024-08-07)
* support for new 12 channel relay module

### 1.3.0 (2023-12-31) 
* support for new analog inputs (0-10V or 4-20mA)

### 1.2.12 (2023-07-21) 
* configuration recovery

### 1.2.11 (2023-05-11) 
* updated latest iobroker catalog version

### 1.2.1 (2023-03-26)
* support for new ESP32 32 IO module

### 1.1.5 (2023-01-11)
* support for GIRA multi pushbuttons

### 1.1.4 (2023-01-02)
* support for new rollo module

### 1.1.2 (2022-10-22)
* removed dynamic upd broadcast address due to problems with docker submask

### 1.0.21 (2022-09-25)
* (hausbusde) fixed error from adapter checker

### 1.0.12 (2022-08-10)
* (hausbusde) first stable release and publish in ioBroker catalog.

### 0.1.18 (2022-03-13) 
* (hausbusde) corrected data type of backlight from string to number.

### 0.1.17 (2021-12-11) 
* (hausbusde) optimized bus speed in case of many outgoing messages at the same time.

### 0.1.16 (2021-11-28) 
* (hausbusde) corrected data type to number for setting temperatur, brightness and dimmer brightness.

### 0.1.15 (2021-11-17) 
* (hausbusde) new admin function for special configurations

### 0.1.14 (2021-10-02) 
* (hausbusde) support for new variant of 230V Dimmer

### 0.1.13 (2021-08-10) 
* (hausbusde) fixed unfunctional blink method for led interface

### 0.1.12 (2021-07-19) 
* (hausbusde) support for new RGB dimmer

### 0.1.11 (2021-07-14)
* (hausbusde) added celsius as unit for temperature

### 0.1.10 (2021-07-06)
* (hausbusde) replaced all blanks in object names by underscores

### 0.1.9 (2021-07-01)
* (hausbusde) support for 8 channel shutter module

### 0.1.8 (2021-02-08)
* (hausbusde) fixed backlight bug for push buttons

### 0.1.7 (2020-11-10)
* (hausbusde) fixed adapter restart if no internet connection is available
* (hausbusde) support for new 8 channel relay module and new 230V dimmer

### 0.1.5 (2020-11-01)
* (hausbusde) just some preparations for the first official release

### 0.1.4 (2020-09-12)
* (hausbusde) fixed invalid string value for relay events

### 0.1.3 (2020-09-11)
* (hausbusde) supporting lan bridge

### 0.1.2 (2020-09-06)
* (hausbusde) first public version

## License
MIT License

Copyright (c) 2024 Hermann Hoeschen <info@haus-bus.de>

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