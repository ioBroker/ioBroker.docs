---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.samsung_tizen/README.md
title: iobroker.samsung_tizen
hash: MUiT2m2HSAGAYVKuWRpogX+h3ecirwYfz+aXRZRAFyA=
---
![标识](../../../en/adapterref/iobroker.samsung_tizen/admin/samsung.png)

# Iobroker.samsung_tizen
=====================

该适配器用于控制带有 tizenOS (>=2016) 的三星电视。

1. [安装](#1-安装)
2. [配置](#2-配置)

2.1. [协议](#21-protocol)2.2。 [IP地址](#22-ip-address)2.3。 [港口](#23-port)2.4。 [代币](#24-token)2.5。 [电脑地址](#25-mac-adress)2.6。 [电视州民意调查](#26-tv-state-polling)2.7。 [命令延迟](#27-command-delay)

3. [用法](#3-用法)

3.1. [控制](#31-control) 3.2。 [应用](#32-apps)3.3。 [命令](#33-commands)

4. [许可证](#4-许可证)

## 1.安装
打开 iobroker admin 转到适配器选项卡并从自定义源安装适配器。

<details><summary>详细安装</summary><p>

1.点击github图标（从自定义URL安装）

![安装1](../../../en/adapterref/iobroker.samsung_tizen/images/install1.png)

2.输入这个github URL https://github.com/dahuby/iobroker.samsung_tizen/tarball/master
3.点击安装

![安装2](../../../en/adapterref/iobroker.samsung_tizen/images/install2.png)

4.返回适配器选项卡并搜索“Samsung Tizen”
5.点击“+”添加新实例

![安装3](../../../en/adapterref/iobroker.samsung_tizen/images/install3.png)

6.配置适配器

![安装4](../../../en/adapterref/iobroker.samsung_tizen/images/install4.png)

</p></详情>

## 2. 配置
如何配置此适配器。
首先检查您的电视设置，打开电视并转到“设置”/“常规”/“外部设备管理器”/“设备连接管理器”，其中访问通知应激活为“仅限首次”

### 2.1。协议
用于与电视进行 WebSocket 连接的协议。
可能的值为 http 或 wss，在较新的设备上使用 wss

### 2.2。 IP地址
三星电视的 IP 地址

### 2.3。港口
用于与电视进行 WebSocket 连接的端口。
8001 不安全端口 8002 安全端口

### 2.4。代币
用于安全连接到电视的令牌。
使用 token = 0 保存适配器并转到 iobroker 管理对象选项卡。
然后转到 iobroker.samsung_tizen.0.config.getToken 对象并单击按钮。
如果一切正常，新对象 iobroker.samsung_tizen.0.config.token 应该出现，id 为 iobroker.samsung_tizen.0.config.token，名称是您的令牌 - 复制名称（例如 123456789）并返回到适配器配置并将其粘贴到令牌字段中。
可以通过值“0”停用

<details><summary>如何手动获取token</summary><p>使用以下命令在运行 ioBroker 的设备上安装“wscat”：

```sh
npm install wscat
```

打开电视并通过 websocket 连接查询令牌

```sh
wscat -n -c wss://tvIp:8002/api/v2/channels/samsung.remote.control?name=aW9Ccm9rZXI=
```

您的电视上会出现一个必须接受的弹出窗口。
从返回的 json 响应中获取令牌

```json
{"name":"aW9Ccm9rZXI="},"connectTime":1575818900205,"deviceName":"aW9Ccm9rZXI=","id":"12345678-797c-45b0-b0f1-233535918548","isHost":false}],"id":"12345678-797c-45b0-b0f1-233535918548","token":"10916644"},"event":"ms.channel.connect"}
```

</p></详情>

### 2.5。 MAC地址
三星电视的 MAC 地址将用于 LAN 唤醒。
仅当您的电视通过有线而非无线连接时才有效。
如果您的电视是无线连接的，则只能通过短待机模式开机。
可以使用值“0”停用wakeOnLan

### 2.6。电视州民意调查
#### 轮询端口
获取电源状态的端口 默认：9110 已知可用端口：9110、9119、9197

#### 轮询间隔 轮询请求发送的频率默认：60 秒，可以使用值“0”停用
### 2.7。命令延迟
通过 iobroker.samsung_tizen.0.control.sendCmd 对象发送的命令之间的延迟（以毫秒为单位）。

## 3. 用法
### 3.1。控制
#### 发送单个密钥
要发送单个密钥，请单击例如下面的按钮iobroker.samsung_tizen.0.control.KEY_MUTE

#### 发送未定义按钮的键
您可以使用 iobroker.samsung_tizen.0.control.sendCmd 对象发送自定义（未定义）密钥。
输入您要发送的密钥，例如KEY_POWER。

#### 在单个命令中发送多个键
要在单个命令中发送多个密钥，请使用 iobroker.samsung_tizen.0.control.sendCmd 对象。
输入以“,”分隔的键，例如KEY_POWER、KEY_HDMI、KEY_VOLUP。

#### 为命令创建宏
转至 iobroker.samsung_tizen.0.command，您可以在此处找到示例宏，并且可以创建自己的宏。<a name="use_cmd">如何创建新宏</a>

### 3.2。应用
#### 加载已安装的应用程序
要加载已安装的应用程序，请单击 iobroker.samsung_tizen.0.apps.getInstalledApps 按钮。
之后，将为每个安装的应用程序创建一个名为 start_app_name 的单独对象。

#### 启动应用程序
您可以通过单击 iobroker.samsung_tizen.0.apps.start_app_name 对象来启动应用程序。

### 电源状态
如果您按照上述方式配置了电源状态轮询，则在 iobroker.samsung_tizen.0.powerOn 下，如果您的电视打开，则状态为 true；如果电视关闭，则状态为 false。

### 3.3。命令
命令可以通过 iobroker.samsung_tizen.0.control.sendCmd 对象手动发送（如<a name="use_ctrl">Control</a>中所述）或通过 iobroker.samsung_tizen.0.command 下自定义创建的对象发送。示例命令很少，但您也可以创建自己的宏。<details><summary>如何创建命令宏</summary><p>

1. 转到适配器并打开 iobroker.samsung_tizen.0.command
2.单击+图标创建一个新对象

![指令1](../../../en/adapterref/iobroker.samsung_tizen/images/cmd1.png)

3.检查父对象是否为iobroker.samsung_tizen.0.command
4. 为命令输入新名称，并检查类型是否为 datapoint 且 stateType = boolean。

![指令2](../../../en/adapterref/iobroker.samsung_tizen/images/cmd2.png)

5. 在名称下输入您要发送的密钥。
6.角色必须是按钮
7.然后保存

![指令3](../../../en/adapterref/iobroker.samsung_tizen/images/cmd3.png)

8.然后您可以使用新创建的对象发送命令

![命令4](../../../en/adapterref/iobroker.samsung_tizen/images/cmd4.png) </p> </详细>

## 学分
该适配器的第一代由 Stefan0875 (https://github.com/Stefan0875) 开发，并经过 HighPressure (https://github.com/HighPressure) 和最终 Dahuby (https://github.com) 进行适配和维护.com/dahuby）。非常感谢他们的工作并授予公共许可证。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.0 (2023-09-30)
- (mcm1957) An official release has been created

### 1.0.0-alpha.2 (2023-09-24)
- (mcm1957) Dependencies have been updated

### 1.0.0-alpha.1 (2023-09-24)
- (mcm1957) Adapter requires node 16 or newer now.
- (mcm1957) Adapter has been moved to iobroker-community-adapters organization.

## License

MIT License 

Copyright (c) 2023 iobroker-community-adapters <mcm57@gmx.at>
Copyright (c) 2020 dahuby

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