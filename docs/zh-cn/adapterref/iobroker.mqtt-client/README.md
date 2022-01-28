---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mqtt-client/README.md
title: ioBroker.mqtt-客户端
hash: ofz++iad9eq0lluL5KUB1IuSL9EjZGwEEsw5xWtEUxg=
---
![标识](../../../en/adapterref/iobroker.mqtt-client/admin/mqtt-client.png)

![安装数量](http://iobroker.live/badges/mqtt-client-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.mqtt-client.svg)
![下载](https://img.shields.io/npm/dm/iobroker.mqtt-client.svg)
![新PM](https://nodei.co/npm/iobroker.mqtt-client.png?downloads=true)

# IoBroker.mqtt-client
## 适配器设置
![适配器](../../../en/adapterref/iobroker.mqtt-client/img/settings.png)

###关于连接主题和消息
每次客户端连接或重新连接到服务器时，```on connect message``` 都会发布到 ```on connect topic```。

###最后将主题和消息
每次客户端连接或重新连接到服务器时，```last will message``` 都会发布到 ```last will topic```。
服务器将存储此消息并在客户端断开连接时将其发送给其订阅者。

###订阅
现有状态未涵盖的以逗号分隔的主题列表。
接收到的消息被转换为适配器命名空间中的状态（例如 mqtt.0）并被订阅。
您可以在创建所有状态后删除主题。

### 发布前缀
发布时，这将被添加到所有主题。
默认为空（无前缀）。

### 订阅前缀
订阅时，这将被添加到所有主题。
默认为空（无前缀）。

## 状态设置
![状态](../../../en/adapterref/iobroker.mqtt-client/img/dialog.png)

### 启用
启用或禁用此状态的 mqtt-client 功能。
禁用将从此状态删除任何 mqtt-client 设置。

＃＃＃ 话题
发布和订阅此状态的主题。
默认值：state-ID 转换为 mqtt 主题。

### 发布
* ```enable``` 状态将被发布
* ```changes only``` 状态只会在其值改变时发布
* ```作为对象``` 整个状态将作为对象发布
* ```qos``` 见 <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
* ```retain``` 见 <http://www.hivemq.com/blog/mqtt-essentials-part-8-retained-messages>

＃＃＃ 订阅
* ```enable``` 主题将被订阅，状态将相应更新
* ```changes only``` 状态只会在值改变时被写入
* ```as object``` 消息将被解释为对象
* ```qos``` 见 <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
* ```ack``` 在状态更新时，确认标志将被相应地设置

＃＃＃＃ 笔记
* 当 ack 设置为 true 时，它会覆盖对象 ack，参见 ```as object```
* 为了防止消息循环，如果同时启用了发布和订阅

＃＃ 去做
* 测试前缀
* 在没有干净会话的情况下连接/重新连接

<!-- 下一个版本的占位符（在行首）：

### __工作进行中__ -->

## Changelog
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

Copyright (c) 2016-2022 Pmant

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