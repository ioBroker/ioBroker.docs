---
local: true
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tr-064/README.md
title: ioBroker.tr-064
hash: D59HzSVYkdStJaSDx6e91FA6u2/6TTOD7QeUisJd0X0=
---
![标识](../../../en/adapterref/iobroker.tr-064/media/tr-064.png)

# IoBroker.tr-064
### 信息
此适配器从 AVM Fritz!Box 读取主要信息，如通话清单或答录机上的消息数量。
基于此[AVM 文档](https://avm.de/service/schnittstellen/)

### 简单状态和功能
- 打开/关闭 2.4GHz 和 5GHz 的 WiFi，
- 打开/关闭访客 WiFi，
- 重启 Fritz!Box，
- 启动 WPS 进程，
- 重新连接互联网
- 外部 IP 地址

### 响铃（拨号）
- 当使用内部号码（如**610）时，振铃状态将让该内部电话振铃。

例如：**610[,超时]

- 当使用外部号码时，振铃状态会将您连接至外部号码。

FritzBox 将呼叫外部号码，当被叫电话被拿起时，您的默认电话将响铃。
可以在 FritsBox 中配置默认电话：Telefonie/Anrufe/[Tab]Wahlhilfe/Wählhilfe verwenden

### 暂停状态
- 值：响铃、连接、结束
- 可用于在有来电（响铃）或拿起电话（连接）时暂停视频播放器。
- 可以根据最终值进行恢复。

＃＃＃ 在场
您可以配置要监听的设备列表。
可以由 mDNS 触发。使用 MDNS 时，无需轮询，而且速度更快

### AB - Anrufbeantwowerter（答录机）
可以打开/关闭。
可以设置状态 cbIndex，以应答机的地址#。

### 呼叫监控
呼叫监视器将为每个入站和出站呼叫创建实时状态。
如果启用了电话簿（默认），号码将解析为姓名，还有一个指示电话响铃的状态。

### 电话簿
- 如果启用，电话簿将用于获取呼叫者电话号码的姓名。
- 此外，还有三种状态来解析号码或姓名。如果可用，您还将获得联系人的图像 URL。

例如：如果您设置了状态 phonebook.number，则所有 3 个状态、姓名、号码和图像都将设置为找到的联系人。请注意，按姓名搜索将首先比较完整姓名，如果未找到，则使用部分姓名。

### 呼叫列表
输出格式：

-json
- HTML

通话清单如下：

- 所有通话
- 未接来电
- 来电
- 拨出电话

调用计数：调用计数可以设置为0，下次调用时将加1。

html 输出可以通过模板配置

### 命令和命令结果状态
使用命令状态，您可以从此[文档](https://avm.de/service/schnittstellen/)调用每个 tr-064 命令。
例如

```
command = {
    "service": "urn:dslforum-org:service:WLANConfiguration:1",
    "action": "X_AVM-DE_SetWPSConfig",
    "params": {
        "NewX_AVM-DE_WPSMode": "pbc",
        "NewX_AVM-DE_WPSClientPIN": ""
    }
};
```

命令状态应设置为上述行的 JSON。因此 { ... }（不带命令 = 和换行符）调用的回调将设置命令结果状态。

### 启用通话监控
要使用呼叫监控功能，必须先在 AVM Fritz!Box 中启用它。
要启用呼叫监控，请拨打 ```#96*5*```，TCP/IP 端口 1012 将打开。要关闭端口，请拨打 ```#96*4*```。

### 预发布版本
预发布版本可在 npm 上使用标签 dev 获取。
您可以使用以下命令从 ioBroker 根目录安装它们：

```
npm install iobroker.tr-064@dev
iobroker upload tr-064
```

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 4.3.0 (2024-04-30)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 4.2.18 (2023-01-04)
* (Apollon77) Prepare for future js-controller verisons

### 4.2.17 (2022-09-16)
* (simatec/Apollon77) Prevent duplication of entries in configuration
* (Apollon77) Make sure active status of devices in jsonDeviceList is correct

### 4.2.16 (2022-03-21)
* (Apollon77) Fix info logs on callee/caller
* (Apollon77) Add special handling for potential broken external image links in phonebook
* (Apollon77) Prevent some crash cases reported by Sentry

### 4.2.15 (2021-12-08)
* (bluefox) fix crash case (Sentry IOBROKER-TR-064-35)

## License
The MIT License (MIT)

Copyright (c) 2023-2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
Copyright (c) 2015-2023 soef <soef@gmx.net>, ioBroker-Community-Developers

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