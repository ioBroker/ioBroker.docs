---
local: true
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tr-064/README.md
title: ioBroker.tr-064
hash: rN4KkHkTgQi739/0GZDQZ274L23nvqhd+4OxJHA44Ww=
---
![标识](../../../en/adapterref/iobroker.tr-064/media/tr-064.png)

# IoBroker.tr-064
###信息
该适配器从 AVM Fritz!Box 读取主要信息，例如呼叫列表或应答机上的消息数量。
基于此[AVM 文档](https://avm.de/service/schnittstellen/)

### 简单的状态和函数
- 打开/关闭 2.4GHz 和 5GHz 的 wifi，
- 打开/关闭访客 wifi，
- 重新启动 Fritz!Box，
- 启动 WPS 进程，
- 重新连接互联网
- 外部IP地址

### 响铃（拨号）
- 当使用内部号码（如 **610）时，响铃状态将让该内部电话响铃。

例如：**610[,超时]

- 使用外部号码时，振铃状态会将您连接到外部号码。

当被叫电话被拿起时，FritzBox 将呼叫外部号码并且您的默认电话会响铃。
可以在 FritsBox 中配置默认电话：Telefonie/Anrufe/[Tab]Wahlhilfe/Wählhilfe verwenden

### ToPauseState
- 值：响铃、连接、结束
- 可用于在来电（响铃）或拿起电话（连接）时暂停视频播放器。
- 可以对最终值进行简历。

＃＃＃ 在场
您可以配置要收听的设备列表。
可由mDNS触发。使用 MDNS 时，无需轮询，速度更快

### AB - Anrufbeanworter（答录机）
可以开/关。
可以将状态 cbIndex 设置为应答机的地址 #。

### 通话监听
callmonitor 将为每个呼入和呼出创建实时状态。
如果启用电话簿（默认），号码将被解析为姓名。还有一个状态表明电话正在响铃。

＃＃＃ 电话簿
- 如果启用，电话簿将用于获取来电者电话号码的名称。
- 此外，还有三种状态可以解析数字或名称。如果可用，您还将获得联系人的图像 URL。

  例如：如果您设置状态 phonebook.number 所有 3 个状态，名称、号码和图像将设置为找到的联系人。注意，按名称搜索将首先比较完整名称，如果没有找到，则使用部分名称。

### 通话清单
输出格式：

- json
- html

通话清单是：

- 所有通话
- 未接来电
- 呼入电话
- 外拨电话

呼叫计数：呼叫计数可设置为 0。下一次呼叫将增加 1。

html输出可以通过模板配置

### 命令和命令结果状态
使用命令状态，您可以从此 [文件](https://avm.de/service/schnittstellen/) 调用每个 tr-064 命令。
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

命令状态应设置为上述行的 JSON。所以 { ... } （没有 command = 和换行符）调用的回调将设置 commandResult 状态。

### 开启通话监听
要使用呼叫监控功能，必须首先在 AVM Fritz!Box 中启用它。
要启用呼叫监控拨号```#96*5*```，TCP/IP 端口 1012 将被打开。关闭端口拨号```#96*4*```。

### 预发布版本
在 npm 上可以使用带有 dev 标签的预发布版本。
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