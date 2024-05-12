---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mystrom/README.md
title: ioBroker.mystrom
hash: C0fa0+X9Dn85ihw8WkIQQjMOmXkSRXHBS2mT9x8s+34=
---
![标识](../../../en/adapterref/iobroker.mystrom/admin/mystrom.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.mystrom.svg)
![下载](https://img.shields.io/npm/dm/iobroker.mystrom.svg)
![安装数量（最新）](http://iobroker.live/badges/mystrom-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/mystrom-stable.svg)
![依赖状态](https://img.shields.io/david/TA2k/iobroker.mystrom.svg)
![已知漏洞](https://snyk.io/test/github/TA2k/ioBroker.mystrom/badge.svg)
![新平台](https://nodei.co/npm/iobroker.mystrom.png?downloads=true)

# IoBroker.mystrom
**测试：**![测试与发布](https://github.com/TA2k/ioBroker.mystrom/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 mystrom 适配器
myStrom 适配器

适配器从 myStrom 应用程序读取所有数据并每 30 分钟更新一次。如果设备在线并且已通过应用程序或手动分配 IP，它还会读取设备的本地数据。为此，启动适配器时所有设备都必须在线。按钮并不总是在线，请尝试按两次然后按住 8 秒，或者按下 10 秒直到红色闪烁然后按一次进行重置。重置后，需要通过 WLAN 重新连接。按 3 次手动连接，然后手动登录 WLAN，然后按照应用程序中的路径操作。然后按钮在线并可以读出。

可以为按钮和运动检测器的相应操作输入 URL。开关也可以通过 ioBroker State 进行切换。

#### Wifi 开关
要切换设备，请使用localCommand mystrom.0.XXXXXXX.localCommands。

＃＃＃＃ 纽扣
必须使用 [简单API](https://github.com/ioBroker/ioBroker.simple-api) 来切换 ioBroker 状态。

SimpleAPI 可以通过 ioBroker web.0 实例激活。在 web.0 实例中激活“内置‘简单 API’”选项。

然后可以使用以下内容来设置状态在 Objects mystrom.0.XXX.localData.api/v1/device.XXXX.single 或 long 或 double 下设置以下状态（启动适配器时设备必须在线，按两次然后按住 8 秒。然后重新启动适配器，直到 localData 文件夹被填满）。

##### 获取://ioBrokerIP:8082/toggle/javascript.0.test
<br />

#### PIR 运动探测器
在对象 mystrom.0.XXXXX.localData.api/v1/action.pir 下设置以下状态

##### 获取://ioBrokerIP:8082/toggle/javascript.0.test
   <br />

有关如何同时改变两种状态的更多详细信息，例如[https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332](https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332)

德：

适配器包含来自 myStrom 应用程序的所有数据，并刷新这全部 30 分钟。当您上网并通过应用程序或手动 IP 访问时，则会显示设备的本地数据。所有带有适配器的设备都必须在线启动。按钮无法通过 2 次打印打开，并且在 8 秒内关闭或重置，并且在 10 秒内关闭，然后会闪烁并再次打印。重置后，将不再通过 WLAN 进行连接。通过 3 次打印手动绑定，然后在 WLAN 登录处手动绑定，然后首次在应用程序中登录。按钮在线并且可以被显示。

可以为珠宝按钮操作和活动熔接输入 URL。您还可以通过 ioBroker 建立 Switch 状态会话。

#### Wifi 开关
在设备管理器中，localCommand 使用 mystrom.0.XXXXXXX.localCommands。

＃＃＃＃ 纽扣
返回顶部 ioBroker 状态必须使用[简单API](https://github.com/ioBroker/ioBroker.simple-api)。

SimpleAPI 可以通过 ioBroker web.0 实例激活。在 web.0 实例中，选项“输入‘Simple-API’”处于活动状态。

要设置某个国家/地区，请执行以下操作 URL<br />

在以下对象下设置 mystrom.0.XXX.localData.api/v1/device.XXXX.single、long 或 double 格式（设备必须在 Adapterstart 上，双击并等待 8 秒。当 Adapter 启动后，localData 才会生效）：

##### 获取://ioBrokerIP:8082/toggle/javascript.0.test
<br />

#### PIR 动作熔化
在下列对象下设置 mystrom.0.XXXXX.localData.api/v1/action.pir

##### 获取://ioBrokerIP:8082/toggle/javascript.0.test
   <br />

更多关于 man z.B. 的详细信息两国共时提交意见：[https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332](https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332)

## Changelog
### 0.1.0 (2024-04-21)

- improve cpu usage

## License

MIT License

Copyright (c) 2020-2030 TA2k <tombox2020@gmail.com>

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