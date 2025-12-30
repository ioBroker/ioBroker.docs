---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.gotify/README.md
title: ioBroker.gotify
hash: GiUmaVmMu9raxf+abAznflA+2Hss0fDKdR6IK1oYme0=
---
![标识](../../../en/adapterref/iobroker.gotify/admin/gotify.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.gotify.svg)
![下载](https://img.shields.io/npm/dm/iobroker.gotify.svg)
![安装数量（最新）](https://iobroker.live/badges/gotify-installed.svg)
![安装数量（稳定版）](https://iobroker.live/badges/gotify-stable.svg)
![NPM](https://nodei.co/npm/iobroker.gotify.png?downloads=true)

# IoBroker.gotify
**测试：** ![测试与发布](https://github.com/ThomasPohl/ioBroker.gotify/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 gotify 适配器
从 [ioBroker](https://iobroker.net/) 到 [Gotify](https://gotify.net/) 发送推送通知

＃＃ 安装
＃＃＃ 准备
- 使用您的 Gotify 用户名登录
- 为 ioBroker 创建一个应用程序
- 记下您的新应用程序的令牌

  ![新申请](../../../en/adapterref/iobroker.gotify/img/newApplication.png)

### 在 ioBroker 中
- 转到适配器
- 点击 github-cat-icon
- 转到“自定义”选项卡
- 输入 https://github.com/ThomasPohl/ioBroker.gotify
- 安装
- 为 gotify-adapter 创建一个新的实例
- 输入您的安装 URL
- 添加先前创建的令牌

＃＃ 用法
### Blockly
要使用 Blockly 发送消息，只需将 gotify 代码块添加到您的脚本中：![Blockly](../../../en/adapterref/iobroker.gotify/img/gotify.blockly.png)

如果您选择 Markdown 作为格式，您可以使用 [Markdown](https://guides.github.com/features/mastering-markdown/) 来格式化您的消息。

### Javascript
使用默认令牌发送一条简单消息：

```javascript
sendTo('gotify.0', 'send', {
    title: 'DG lüften',
    message: 'Luftfeuchtigkeit im DG zu hoch!',
});
```

发送带有自定义令牌的消息（覆盖已配置的默认令牌）：

```javascript
sendTo('gotify.0', 'send', {
    title: 'Custom notification',
    message: 'This message uses a different token',
    priority: 8,
    contentType: 'text/markdown',
    token: 'AaBbCcDdEeFfGg123456',
});
```

＃＃ 沟通
下图展示了ioBroker如何向您的智能手机发送推送通知。

![通信图](../../../en/adapterref/iobroker.gotify/img/iobroker.gotify-communication.png)

ioBroker 和智能手机应用都使用 REST 连接到 gotify 服务器。移动应用会与 gotify 服务器保持打开的 WebSocket 连接，以便接收新的通知。

当 ioBroker 适配器需要推送通知时，它会向 Gotify 服务器发送 POST 请求。Gotify 服务器负责将通知推送给客户端。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.5.0 (2025-12-28)

- (Thomas Pohl) Allow to overwrite token when sending messages (javascript only not for blockly)
- (Thomas Pohl) Update dependencies

### 0.4.0

- (Thomas Pohl) Support for notification-manager was added
- (Thomas Pohl) Blockly can now send messages with priority 10

### 0.3.0

- (Thomas Pohl) The token is stored now encrypted
- (Thomas Pohl) node.js 22 is supported

### 0.2.1

- (Thomas Pohl) Optimized startup behavior when adapter is not configured

### 0.2.0

- (Thomas Pohl) Add timeout for http calls
- (Thomas Pohl) Update dependency versions

## License

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Copyright (c) 2024-2025 Thomas Pohl <post@thomaspohl.net>