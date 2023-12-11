---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.jablotron/README.md
title: ioBroker.jablotron
hash: JbnfGehH5+QShztwCz9DhtNyboqVjosxca34qwubi+E=
---
![标识](../../../en/adapterref/iobroker.jablotron/admin/jablotron.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.jablotron.svg)
![下载](https://img.shields.io/npm/dm/iobroker.jablotron.svg)
![安装数量](https://iobroker.live/badges/jablotron-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/jablotron-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.jablotron.png?downloads=true)

# IoBroker.jablotron
**测试：** ![测试与发布](https://github.com/DEV2DEV-DE/ioBroker.jablotron/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 Jablotron 适配器
连接到 Jablotron 云以访问您的安全系统。

目前该适配器是**只读**！

只能读取状态。稍后将实现切换！

该适配器仅连接到制造商的云。目前无法仅通过本地网络连接到中央单元，因为制造商关闭了本地 API。

### 论坛
在这里讨论您的测试体验：https://forum.iobroker.net/topic/70798/test-adapter-jablotron-v-0-0-x

＃＃ 已知的问题
* 据目前所知，传感器、开关和其他设备必须配置为“可编程门”才能读取。
* 有设备被列为“thermoDevice”，但该列表目前为空，因此尚无法进行测试。

将任何错误、问题或请求作为 GitHub 问题报告：https://github.com/DEV2DEV-DE/ioBroker.jablotron/issues

＃＃ 制造商
https://www.jablotron.com/de/katalog-produktu/alarme/jablotron-100/

＃＃ 重要的提醒
### 版本 0.0.5
实例配置中敏感数据的存储已更改。
如果您已经使用 < 0.0.5 的旧版本，则需要在实例设置中重新输入密码

＃＃ 参考
* https://github.com/ioBroker/AdapterRequests/issues/755
* https://github.com/hajekmi/myjablotron
* https://github.com/fdegier/homebridge-jablotron-alarm
* https://github.com/plaksnor/HASS-JablotronSystem
* https://github.com/kukulich/home-assistant-jablotron100

## Changelog
### 0.1.0 (2023-12-10)
* Fixed issue with restarts due to timeouts

### 0.0.7 (2023-12-08)
* Fixed wrong structure in readme

### 0.0.5 (2023-12-06)
* Fixed typo
* Encrypt sensitive data in instance config
* Add min and max for poll interval
* Removed unused code
* Do not create static states in code

### 0.0.4 (2023-12-03)
* Fixed wrong state type for data type 'object'

### 0.0.3 (2023-12-03)
* Implemented improvements mentioned in review

### 0.0.2 (2023-11-30)
* Provide an appropriate role for any state
* Readme extended
* Output 'thermoDevices' in debug log

## License
MIT License

Copyright (c) 2023 DEV2DEV-DE

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