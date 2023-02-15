---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.semp/README.md
title: ioBroker.semp
hash: og+ZEsvwoq2JAsLHQe6y4FAdKoJw+cO7ITxLhtSi/VI=
---
![标识](../../../en/adapterref/iobroker.semp/admin/semp.png)

![安装数量](http://iobroker.live/badges/semp-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.semp.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.semp.svg)
![已知漏洞](https://snyk.io/test/github/rg-engineering/ioBroker.semp/badge.svg)
![NPM](https://nodei.co/npm/iobroker.semp.png?downloads=true)

#ioBroker.semp
![GitHub 操作](https://github.com/rg-engineering/ioBroker.semp/workflows/Test%20and%20Release/badge.svg)

**此适配器使用哨兵库自动向开发人员报告异常和代码错误。**有关更多详细信息和如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

**如果喜欢，请考虑捐款：**

[![贝宝](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

## IoBroker 的 SMA SEMP 适配器
通过 SunnyHomeManager 和 SEMP 连接到 SMA SunnyPortal

在 SunnyPortal 中从 ioBroker 添加您的设备。
然后，SunnyPortal 可以更好地估算您的能源消耗，从而做出更好的预测和建议。但您也可以让 SunnyPortal 控制您的设备。如果太阳能充足，SunnyPortal 可以打开您的设备，如果太阳能不足，则再次关闭它们。通过这种方式，您可以优化自己的消耗，但不依赖于 SunnyPortal 支持的少数设备。通过适配器，ioBroker 的任何设备都可以集成到 SunnyPortal 中。
甚至没有必要测量单个设备的消耗。即使是估计值也足够了。

## 用户文档
见[纪录片](docu/docu_en.md)

有关协议和用法的详细信息，请查看 [SMA文档](docu/SMA/SEMP-11ZE3315-Specification-1.0.6.pdf)。

有关能源请求的一般用途的说明，请参阅 [SMA文档](docu/SMA/SSH_KANN-Zeitfenster-TI-de-10.pdf)。 （仅限德语）

＃＃ 特征
* 通过 SMA SEMP 在 SunnyPortal 中添加来自 ioBroker 的设备
* 通知 SunnyPortal 当前消耗
*让SunnyPortal控制这些设备（光伏发电充足时开启，太阳能不足时关闭）

＃＃ 要求
* 节点 v16 或更高版本

＃＃ 已知的问题
* 如果您发现错误或想要新功能，请在 [github](https://github.com/rg-engineering/ioBroker.semp/issues) 创建问题

## Changelog

### 0.1.0 (2023-01-20)
* (René) wallboxes: see issue #23: wallbox OID can be configured (DP type and set or check value)
* (René) wallboxes: minimum and maximum energy for charging is adjustable by datapoint, default: battery capacity (10% and 100%)
* (René) see issue #24: delete csv logs if older then three days

### 0.0.5 (2022-12-27)
* (René) MinPowerConsumption added
* (René) see issue #20: support of wallboxes

### 0.0.4 (2022-11-07)
* (René) see issue #15: support of more then one time periods for energy requests
* (René) some bug fixes (0.0.3)

### 0.0.2 (2022-10-16)
* (René) threshold for status detection with timer
* (René) csv logger for data to be sent to SHM (for debugging)
* (René) see issue #14: cancel request if device does not turn on
* (René) bug fix issue #19: turn off device at the end of maximum operation time


### 0.0.1 (2022-10-01)
* (René) initial release

## License
MIT License

Copyright (c) 2022-2023 rg-engineering info@rg-engineering.eu

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