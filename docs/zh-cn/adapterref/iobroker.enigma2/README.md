---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.enigma2/README.md
title: ioBroker enigma2
hash: fdyOycvPFspaROEIv+ZQbVNsc4JE0rZ4YKX5UIsZP80=
---
![标识](../../../en/adapterref/iobroker.enigma2/admin/enigma2.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.enigma2.svg)
![下载](https://img.shields.io/npm/dm/iobroker.enigma2.svg)
![新平台](https://nodei.co/npm/iobroker.enigma2.png?downloads=true)

----

# IoBroker enigma2
- ioBroker 适配器用于从 enigma2 接收器检索信息并发送命令
-（适配器仅在一台主机上运行！客户端安装目前仍然存在问题。）

- (DE) 适配器用于 ioBroker um Informationen von einem enigma2 Receiver abzufragen und Befehle zu senden
- (DE)（适配器 läuft nur auf einem Host！bei einer 客户端安装 gib 的 aktuell noch 问题。）

----

### 功能
-盒子IP
- 网络
- CHANNEL_SERVICEREFERENCE
- CHANNEL_SERVICEREFERENCE_NAME
- 渠道
- 事件描述
- 活动持续时间
- 事件持续时间_分钟
- 活动剩余
- EVENTREMAINING_MIN
- 事件进度百分比
- 事件时间开始
- 事件时间结束
- 事件时间已过
- 硬盘容量
-HDD_免费
- 消息答案
- 模型
- 静音
- 程序
- 程序信息
- 程序之后
- 程序后信息
- 支持
- 体积
- WEB_IF_版本
- 正在录制
- Timer_is_set
- MOVIE_LIST（仅限 openwebif）
- 定时器列表
- CHANNEL_PICON (Picon 路径 - 仅限 openwebif)

----

＃＃＃ 主要的
- enigma2-连接

----

＃＃＃ 命令
- 命令.CHANNEL_DOWN
- 命令.CHANNEL_UP
- 命令.DOWN
- 命令.UP
- 命令.EPG
- 命令.EXIT
- 命令.LEFT
- 命令.菜单
- 命令.MUTE_TOGGLE
- 命令。确定
- 命令暂停
- 命令.PLAY
- 命令.RADIO
- 命令.REC
- 命令.远程控制
- 命令.RIGHT
- 命令.SET_VOLUME
- 命令.STANDBY_TOGGLE
- 命令.STOP
- command.TV
- 命令.UP
- 命令.VOLUME_DOWN
- 命令.VOLUME_UP
- command.ZAP = 发送无效的服务引用

----

### 主命令
- main_command.DEEP_STANDBY = 深度待机
- main_command.REBOOT = 重启
- main_command.RESTART_GUI = 重启 Enigma2 (GUI)
- main_command.STANDBY = 待机
- main_command.WAKEUP_FROM_STANDBY = 从待机状态唤醒

----

＃＃＃ 信息
- Message.Text = 消息文本（输入 -> 发送）
- Message.Type = 从 0 到 3 的数字（0= 是/否；1= 信息；2=消息；3=注意）
- Message.Timeout = 消息超时时间（秒）。可以为空，也可以为消息应在多少秒后消失。

----

### Alexa_命令
- Alexa_Command.Mute = Alexa 命令
- Alexa_Command.Standby = Alexa 命令

----

### 发送至
在 Blockly 中
- message = 消息文本
- msgType = 从 0 到 3 的数字（0= 是/否；1= 信息；2=消息；3=注意）
- timeout = 消息超时时间（秒）。可以为空，也可以为消息消失后的秒数。

![图片文字](../../../en/adapterref/iobroker.enigma2/admin/enigma2_message2.png)

### 或 ![图片文字](../../../en/adapterref/iobroker.enigma2/admin/enigma2_message.png)
[> 至 Blockly 导入 <](admin/Blockly_Import.md)

JavaScript 中的 ####
```js
sendTo('enigma2.0', 'send', {
    message: 'Test Nachricht', /* Text of Message */
    timeout: 26,               /* timeout of Message in sec. (Can be empty or the Number of seconds the Message should disappear after.) */
    msgType: 1,                /* Number from 0 to 3 (0= Yes/No ; 1= Info ; 2=Message ; 3=Attention) */
});
```

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.2.3 (2024-12-22)
* (mcm1957) Adapter has been moigrated to @iobroker/eslint-config. [#266]

### 2.2.2 (2024-12-22)
* (mcm1957) States 'message.*' are writeable again now. [#273]
* (mcm1957) Dependencies have been updated.

### 2.2.1 (2024-11-13)
* (mcm1957) Adapter requires js-controller 5.0.19 and admin 6.17.14 now.
* (mcm1957) Message states have been added. [#229]
* (simatec) Adapter changed to meet Responsive Design rules.
* (mcm1957) Several issues reported by adapter checker have been fixed.
* (mcm1957) Dependencies have been updated.

### 2.1.1 (2024-06-09)
* (klein0r) Updated Blockly definitions

### 2.1.0 (2024-04-11)
* (mcm1957) Adapter requires node.js >=18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

## License
MIT License

Copyright (c) 2023-2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>

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