---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.heizungssteuerung/README.md
title: ioBroker.heizungssteuerung
hash: Ac4RcFrkpoyzU6LCqkumAkmr+ocpdLi4PMJZVZs7n/A=
---
![商标](../../../en/adapterref/iobroker.heizungssteuerung/admin/heizungssteuerung.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.heizungssteuerung.svg)
![下载](https://img.shields.io/npm/dm/iobroker.heizungssteuerung.svg)
![安装数量](https://iobroker.live/badges/heizungssteuerung-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/heizungssteuerung-stable.svg)
![依赖状态](https://img.shields.io/david/jbeenenga/iobroker.heizungssteuerung.svg)
![NPM](https://nodei.co/npm/iobroker.heizungssteuerung.png?downloads=true)

# IoBroker.heizungssteuerung
**测试：** ![测试和发布](https://github.com/jbeenenga/ioBroker.heizungssteuerung/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 Heizungssteuerung 适配器
该适配器可用于管理加热系统。您可以在冷却和加热模式之间进行选择，并为一个房间激活增强或暂停。此外，您可以覆盖一个房间的目标温度。

＃＃ 配置
要使用适配器，您必须将房间添加到房间枚举并将传感器和引擎添加到房间。
此外，您必须将功能温度、湿度和引擎添加到正确的状态。枚举将在适配器首次启动后创建。如果您没有湿度传感器，您可以将其留空。
![配置示例](../../../en/adapterref/iobroker.heizungssteuerung/img/configExample.png)

### 主要设置
*加热模式：*您可以选择冷却和加热。

*在适配器启动时将温度重置为默认值：* 如果此设置处于活动状态，所有温度状态将被默认温度和 targetUntil 覆盖。因此，下一次温度检查会将温度设置为按周期设置的配置温度。

*如果湿度高于以下值，则停止冷却：* 如果达到湿度，将停止冷却。它只有在您将湿度传感器添加到功能和房间时才有效。

*更新间隔（以秒为单位）：* 定义适配器检查温度并设置引擎的频率

*默认温度：* 定义房间没有时间匹配时要设置的温度

*Time until pause will be ended in minutes:* 定义直到暂停状态将被重置为非活动状态的时间（以分钟为单位）

* Time until boost will be ended in minutes:* 定义 time until boost state will be reset to inactive in minutes

*与目标温度的差异，直到开始或停止加热：* 定义与目标温度的差异，直到适配器开始或停止加热。例如，如果目标温度为 20°，则此设置为 0.5，如果温度低于 19.5°，发动机将关闭加热，如果温度高于 20.5°，将停止加热。

### 期间
您可以为每个房间和时间定义时段。此外，您还可以定义这段时间是用于制冷还是供暖。如果加热模式与主设置上的设置模式不匹配，则该周期将被忽略。

＃＃ 图片
Freepick 创建的主图（https://www.flaticon.com/de/kostenloses-icon/heizung_1295221）

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.6.7 (2022-12-16)
* (jbeenenga) fix date format

### 1.6.5 (2022-12-16)
* (jbeenenga) add possibility to reset temperatures on adapter start

### 1.6.4 (2022-12-16)
* (jbeenenga) add more debug outputs
* (jbeenenga) fixed incorrect period to room mapping

### 1.6.3 (2022-12-15)
* (jbeenenga) removed unnecessary debug output

### 1.6.2 (2022-12-15)
* (jbeenenga) fix for temperature calculation

### 1.5.0 (2022-09-25)
* (jbeenenga) add possibility to overwrite temperature temporarily
* (jbeenenga) add config for temperature offset
* (jbeenenga) add boost and pause function

### 1.4.6 (2022-09-12)
* (jbeenenga) small fix

### 1.4.5 (2022-09-10)
* (jbeenenga) correct type of temperatures to write into states

### 1.4.4 (2022-09-10)
* (jbeenenga) small fix for state creation

### 1.4.3 (2022-09-10)
* (jbeenenga) small fix for state creation

### 1.4.2 (2022-09-10)
* (jbeenenga) small fix for state creation

### 1.4.1 (2022-09-10)
* (jbeenenga) little logging fixes

### 1.4.0 (2022-09-10)
* (jbeenenga) add default temperature
* (jbeenenga) write current and target temperature into states

### 1.3.0 (2022-09-08)
* (jbeenenga) add possibility to define update intervall

### 1.2.4 (2022-09-08)
* (jbeenenga) small fixes

### 1.2.3 (2022-09-04)
* (jbeenenga) set engine with boolean value

### 1.2.2 (2022-09-04)
* (jbeenenga) set engine with boolean value

### 1.2.1 (2022-09-04)
* (jbeenenga) some logging issues

### 1.2.0 (2022-09-02)
* (jbeenenga) update dependencies

### 1.1.6 (2022-07-22)
* (jbeenenga) little fix

### 1.1.5 (2022-07-22)
* (jbeenenga) add some documentation
* (jbeenenga) remove connection state

### 1.1.4 (2022-07-22)
* (jbeenenga) little changes

### 1.1.3 (2022-07-22)
* (jbeenenga) changed admin dependency to minimum version 5.3.8

### 1.1.2 (2022-07-22)
* (jbeenenga) correct version problems

### 1.1.1 (2022-07-22)
* (jbeenenga) correct version problems

### 1.1.0 (2022-07-22)
* (jbeenenga) correct version problems

### 1.0.1 (2022-07-22)
* (jbeenenga) correct version problems

### 1.0.0 (2022-07-22)
* (jbeenenga) some changes

### 0.1.3 (2022-07-22)
* (jbeenenga) changed some dependency versions

### 0.1.2 (2022-07-22)
* (jbeenenga) add main logic

### 0.1.1 (2022-07-15)
* (jbeenenga) little changes

### 0.1.0 (2022-07-15)
* (jbeenenga) initial release

## License
MIT License

Copyright (c) 2022 jbeenenga <j.beenenga@gmail.com>

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