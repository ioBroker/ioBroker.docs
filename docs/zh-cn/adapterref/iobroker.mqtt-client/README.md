---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mqtt-client/README.md
title: ioBroker.mqtt-客户端
hash: zW4LoHreN+gpPCnvEs3vSptN0V+v1rINjKN992x61hE=
---
![标识](../../../en/adapterref/iobroker.mqtt-client/admin/mqtt-client.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.mqtt-client?style=flat-square)
![下载](https://img.shields.io/npm/dm/iobroker.mqtt-client?label=npm%20downloads&style=flat-square)
![节点](https://img.shields.io/node/v-lts/iobroker.mqtt-client?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.mqtt-client?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/iobroker-community-adapters/iobroker.mqtt-client?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.mqtt-client?logo=github&style=flat-square)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.mqtt-client?logo=github&style=flat-square)
![GitHub 上次提交](https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.mqtt-client?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.mqtt-client?logo=github&style=flat-square)
![GitHub 工作流程状态](https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.mqtt-client/test-and-release.yml?branch=master&logo=github&style=flat-square)
![测试版](https://img.shields.io/npm/v/iobroker.mqtt-client.svg?color=red&label=beta)
![稳定的](http://iobroker.live/badges/mqtt-client-stable.svg)
![已安装](http://iobroker.live/badges/mqtt-client-installed.svg)

# IoBroker.mqtt-客户端
## 版本
发布和订阅 ioBroker 状态到 MQTT Brokers

哨兵
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

## 适配器设置
![适配器](../../../en/adapterref/iobroker.mqtt-client/img/settings.png)

### 连接主题和消息
每次客户端连接或重新连接服务器时，```on connect message``` 都会发布到```on connect topic```。

### 断开主题和消息
当适配器正常停止时，```on disconnect message``` 会发布到```on disconnect topic```。

### 遗嘱主题和信息
每次客户端连接或重新连接到服务器时，```last will message``` 都会发布到 ```last will topic```。
当客户端意外断开连接时，服务器将存储此消息并将其发送给其订阅者。

### 订阅
现有状态未涵盖的主题的逗号分隔列表。
收到的消息将转换为适配器命名空间内的状态（例如 mqtt.0）并订阅。
您可以在创建所有状态后删除主题。

### 发布前缀
发布时，此内容将被添加到所有主题的前面。
默认为空（无前缀）。

### 订阅前缀
订阅时，此内容将被添加到所有主题的前面。
默认为空（无前缀）。

## 状态设置
![状态](../../../en/adapterref/iobroker.mqtt-client/img/dialog.png)

### 已启用
启用或禁用此状态下的 mqtt-client 功能。
禁用将从此状态中删除任何 mqtt-client 设置。

＃＃＃ 话题
此状态发布到和订阅的主题。
默认值：转换为 mqtt 主题的 state-ID。

### 发布
* ```enable`` 状态将被发布
* ```changes only``` 状态仅当其值发生变化时才会发布
* ```as object``` 整个状态将作为对象发布
* ```qos``` 参见 <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
* ```retain``` 参见 <http://www.hivemq.com/blog/mqtt-essentials-part-8-retained-messages>

＃＃＃ 订阅
* ```enable``` 主题将被订阅，状态将相应更新
* ```changes only``` 状态仅当值发生改变时才会被写入
* ```as object``` 消息将被解释为对象
* ```qos``` 参见 <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
* ```ack`` 在状态更新时，ack 标志将相应设置

＃＃＃＃ 笔记
* 当 ack 设置为 true 时，它将覆盖对象 ack，请参阅 ```as object```
* 为防止消息循环，如果发布和订阅都启用，则订阅时始终启用“仅更改”

<!-- 下一版本的占位符（在行首）：

### __正在进行中__ -->

## Changelog
### __WORK IN PROGRESS__
* (@klein0r) Added missing information in configuration dialog

### 2.0.0 (2024-06-21)
* (klein0r) Password is now encrypted - you have to re-renter your password in instance settings!
* (klein0r) Use jsonConfig instead of materialize (for instance settings)

### 1.8.0 (2024-04-07)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.7.0 (2023-10-30)

* (mcm1957) Dependencies have been updated
* (mcm1957) Adapter requires nodejs 16 now

### 1.6.5 (2023-09-28)
* (foxriver76) prevent crash cases on invalid subscribe

### 1.6.4 (2023-07-26)
* (DutchmanNL) Option to allow self-signed certificates in adapter settings added.

### 1.6.3 (2022-06-16)
* (Apollon77) Prevent potential crash cases reported by Sentry

### 1.6.2 (2022-04-02)
* (Apollon77) Prevent potential crash cases reported by Sentry

### 1.6.1 (2022-02-24)
* (Pmant) fix subscriptions
* (Pmant) fix unsubscribing
* (Pmant) use prefix for LWT topic

### 1.6.0 (2022-02-19)
* (Pmant) add option to select protocol version
* (Pmant) add websocket support
* (Pmant) publish values once on enabling publishing
* (Pmant) Upgrade to MQTT version 4 (resolves many connection issues)
* (Pmant) fix LWT documentation
* (Pmant) optionally publish a message when disconnecting gracefully

### 1.5.0 (2022-01-26)
* IMPORTANT: This adapter now required at least js-controller 3.3.x
* (Apollon77) Fix crash cases

### 1.4.1 (2022-01-26)
* (bluefox) js-controller 3.3 optimizations

### 1.4.0 (2021-07-16)
* IMPORTANT: This adapter now required at least js-controller 2.0.0
* (Apollon77) js-controller 3.3 optimizations
* (AlCalzone) Unpublished expired states
* (AlCalzone) Only handle stat values if state exists

### 1.3.2 (2021-04-19)
* (bluefox) Added support of admin5

### 1.3.1 (2020-03-17)
* (bluefox) mqtt package moved back to 2.x

### 1.3.0 (2020-03-11)
* (bluefox) mqtt package was updated
* (bluefox) Fixed the error with "custom" view

### 1.2.1 (2019-10-17)
* (algar42) Fix adapter restarting
* (algar42) Fix mqtt issues

### 1.2.0 (2019-10-14)
* (bluefox) Support of js-controller 2.0 was added

### 1.1.1 (2018-01-30)
* (bluefox) small fixes

### 1.1.0 (2017-12-30)
* (bluefox) Translations
* (bluefox) Update of MQTT module

### 1.0.1 (2017-11-16)

### 1.0.0 (2017-11-16)
* (bluefox) Update io-package.json

### 0.3.2 (2016-11-18)
* (Pmant) fix initial object parsing
* (Pmant) fix objects view

### 0.3.1 (2016-11-16)
* (Pmant) fix crash

### 0.3.0 (2016-09-08)
* (Pmant) add optional publish and subscribe prefixes

### 0.2.5 (2016-09-08)
* (Pmant) reduce logging -> debug

### 0.2.0 (2016-09-08)
* (Pmant) use new custom settings

### 0.1.1 (2016-06-09)
* (Pmant) fix possible loop

### 0.1.0 (2016-06-08)
* (Pmant) initial commit

## License
The MIT License (MIT)

Copyright (c) 2024, iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2016-2023 Pmant

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