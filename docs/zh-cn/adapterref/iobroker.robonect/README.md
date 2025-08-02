---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.robonect/README.md
title: ioBroker.robonect
hash: kLYp0ODrqg0EXmEyQbeVjPGV0UV8RrpAdPPMtY779Kg=
---
# IoBroker.robonect
![标识](../../../en/adapterref/iobroker.robonect/admin/robonect.png)

![新平台](https://nodei.co/npm/iobroker.robonect.png?downloads=true)
![安装数量](http://iobroker.live/badges/robonect-stable.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.robonect.svg)

[![测试与发布](https://github.com/Grizzelbee/ioBroker.robonect/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.robonect/actions/workflows/test-and-release.yml) [![CodeQL]（https://github.com/Grizzelbee/ioBroker.robonect/actions/workflows/codeql.yml/badge.svg）](https://github.com/Grizzelbee/ioBroker.robonect/actions/workflows/codeql.yml)

这是适用于支持 Robonect HX 的割草机的 ioBroker 适配器。

* 已使用 Robonect v1.1b（带有 ZeroConf v1.4）和 Gardena R70Li 进行了测试。
* 并且它还通过 Robonect v1.3b（带有 ZeroConf v1.9）和 Gardena R40Li 进行了测试。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

＃＃ 设置
* 需要输入 Robonect 模块的 IP 地址（如 192.168.x.x）或主机名（如 robonect-D247BF）或完全限定域名（如 robonect-D247BF.fritz.box）。如果设置了用户名和密码，也需要输入。
* ioBroker.robonect 以不同的间隔轮询数据：默认情况下每 60 秒（1 分钟）轮询一次状态信息，每 900 秒（15 分钟）轮询一次其他信息。
* 可以配置两个休息时段以防止轮询，例如中午和晚上。无需唤醒割草机（并使其发出哔哔声）即可轮询的信息仍将被轮询。
* 对于每个 API 请求，可以选择轮询间隔（状态或信息）或根本不轮询。
* 推送服务：激活时选择适配器应该监听的 IP 地址和端口。

### Robonect 的密码
v1.3.0 之前的版本要求使用简单密码 - 仅包含大小写字母以及数字。
从 v1.3.0 开始，由于实施了 HTTP 基本身份验证，因此可以使用强密码。

### 推送服务
robonect 模块有一个名为“推送服务”的配置选项 - 它根据一些可配置事件推送状态信息。
激活后，如果发生其中一个事件，适配器将收到推送通知。激活此选项后，您可以使用比默认值更长的轮询间隔（例如，状态为 6-12 小时，信息为 24 小时）。
这些数据也必须在 Robonect 模块中配置。即使监听所有 IP 地址（0.0.0.0），您也需要在 robonect 中配置真实 IP 地址。要使用的 IP 格式类似于 192.168.x.x:Port

* 您可以在 Robonect 中选择 GET 或 POST - 它可以同时工作并且功能完全相同。
* 无需用户名或密码。

由于仅推送了状态信息的子集（WLAN 信号、状态、已停止、模式、持续时间、小时、距离和电池），因此仍然需要进行拉取，例如获取刀片状态。

### Push-Service 配置应如下所示
#### 管理员配置
![图像](../../../en/adapterref/iobroker.robonect/admin/Push-Service-Adapter.png)

#### Robonect 配置
![图像](../../../en/adapterref/iobroker.robonect/admin/Push-Service-Robonect.png)

＃＃ 控制
＃＃＃ 模式
可以通过更改 robonect.0.status.mode 来控制割草机的模式。可能的模式有“自动”、“回家”、“手动”、“一天结束”和“工作”（目前尚未完全实现）。

### 扩展
可以控制 Robonect 模块的扩展 GPIO 1、GPIO 2、OUT 1 和 OUT 2。要求通过 Robonect Web-UI 将扩展模式配置为“API”。例如，如果 LED 连接到 OUT1，则可以通过将 Robonect.0.extension.out1.status 设置为“true”或“false”来在晚上打开它们并在早上关闭它们。

＃＃ 已知的问题：
* 为确保 robonect 可达 - 适配器在发送任何请求之前会先 ping 设备。

如果 ioBroker 安装在容器中，此 ping 可能会失败。
这不是适配器本身的问题，但由于这种情况可能发生，而且很难找到解决方案，请尝试在 ioBroker 容器内的 shell 中执行 `sudo chmod 4755 /bin/ping`。此解决方案假定 iobroker 用户和 ping 实用程序之间存在权限问题。

## Changelog

### Work in progress

### 1.3.5 (2024-06-04)

* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Upd: Requires at least admin  v6.13.16
* (grizzelbee) Upd: Requires at least nodeJs v18.0.2
* (grizzelbee) Upd: Updated translations
* (grizzelbee) Upd: Reorganized Admin-UI
* (grizzelbee) New: Added Ping-Option to admin 

 
### 1.3.4 (2023-10-10)

* (grizzelbee) Chg: massive code refactoring 
* (grizzelbee) Fix: Fixed false error message when PushService is listening to all IPv4 or IPv6 addresses
* (grizzelbee) Chg: Forcing pollType info for pushService when enabled it's enabled in config

### 1.3.2 (2023-10-04)

* (grizzelbee) Fix: Switching of extensions works now
* (grizzelbee) Fix: Fixed false error message when switching extensions

### 1.3.1 (2023-10-02)

* (grizzelbee) Chg: removed unnecessary Info log entries 

### 1.3.0 (2023-10-02)

* (grizzelbee) Chg: [#28](https://github.com/Grizzelbee/ioBroker.robonect/issues/28) Changed authentication method from URL-Encoding to basic authentication
* (grizzelbee) Chg: [#27](https://github.com/Grizzelbee/ioBroker.robonect/issues/27) Improved error handling
* (grizzelbee) Upd: Dependencies got updated

### 1.2.0 (2023-09-22)

* (mcm1957) Fix: Adapter requires NodeJs >= 16.0.0  
* (crocri)  New: Introduced code to clear errors 
* (crocri)  Upd: Highlighted issues in functions getValueAsync() and testPushServerConfig()
* (grizzelbee) Fix: Fixed functions getValueAsync() and testPushServerConfig() 

### 1.1.5 (2023-09-08)

* (grizzelbee) Fix: Command-URL was invalid when Robonect UI wasn't protected by username and password
* (grizzelbee) Upd: minor code refactoring

### 1.1.4 (2023-09-04)

* (grizzelbee) Fix: Attempting to fix the error: Cannot read properties of null (reading 'val')

### 1.1.3 (2023-09-01)

* (grizzelbee) New: Added release script for easier publishing to stable repo

### 1.1.1 (2023-08-24)

* (grizzelbee) Fix: Fixed status.stopped for push messages.

### 1.1.0 (2023-08-23)

* (grizzelbee) Fix: [#18](https://github.com/Grizzelbee/ioBroker.robonect/issues/18) Showing values for battery with fractions (again)
* (grizzelbee) New: Added START button
* (grizzelbee) New: Added STOP button
* (grizzelbee) New: Added SERVICE button to reboot, shutdown or sleep Robonect module
* (grizzelbee) New: Push states and interval can be set
* (grizzelbee) New: Nickname of the mower can be set
* (grizzelbee) New: Timers of the mower can be set

### 1.0.5 (2023-08-22)

* (grizzelbee) Upd: Added new state #18 - Garage door is opening
* (grizzelbee) Fix: Status.stopped gets correctly updated

### 1.0.4 (2023-08-22)

* (grizzelbee) Upd: Improved error handling

### 1.0.3 (2023-08-21)

* (grizzelbee) Upd: Improved error handling
* (grizzelbee) Fix: some bug fixes
* (grizzelbee) Upd: Renamed jsonConfig.json5 to jsonConfig.json to get better compatibility

### 1.0.2 (2023-08-18)

* (grizzelbee) Fix: Updated package.json to deliver jasonConfig.json5

### 1.0.1 (2023-08-18)

* (grizzelbee) Upd: Documentation got updated

### 1.0.0 (2023-08-17)

* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Upd: Some fixes to make adapter-checker happy
* (grizzelbee) Upd: Updated git workflows
* (grizzelbee) New: Dropped request.js since it's deprecated
* (grizzelbee) New: Replaced request.js by axios.js for http requests
* (grizzelbee) New: Add Webserver for Push-Service API
* (grizzelbee) New: Add adapter-dev support
* (grizzelbee) New: Added snyk plugin
* (grizzelbee) New: Swapped Admin UI to V5

### 0.1.4

* (braindead1) changed polling log level from info to debug
* (braindead1) implemented polling of garage door status

### 0.1.3

* (braindead1) implemented JsonLogic & refactoring

### 0.1.2

* (braindead1) fixed GPS

### 0.1.1

* (braindead1) fixed typo

### 0.1.0

* (braindead1) implemented rest times

### 0.0.12

* (braindead1) improved polling

### 0.0.11

* (braindead1) implemented weather and GPS polls

### 0.0.10

* (braindead1) first stable version

### 0.0.9

* (braindead1) adapter improvements

### 0.0.8

* (braindead1) fixed some issues caused by different configurations

### 0.0.7

* (braindead1) prepared adapter for latest repository

### 0.0.6

* (braindead1) fixed minor issues

### 0.0.5

* (braindead1) updated to work with Robonect HX version 1.1b

### 0.0.4

* (braindead1) updated to work with Robonect HX version 1.0 Beta5

### 0.0.3

* (braindead1) support of Admin3

### 0.0.2

* (braindead1) updated to work with Robonect HX version 1.0 Beta2

### 0.0.1

* (StefSign) initial commit

## License

The MIT License (MIT)

Copyright (c) 2024 grizzelbee

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