---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lgtv/README.md
title: ioBroker.lgtv
hash: NvvMnCDXQgnMkATWxwf9jlfwGXVtvdHtYKYrptQP9D8=
---
![标识](../../../en/adapterref/iobroker.lgtv/admin/lgtv.png)

![安装数量](http://iobroker.live/badges/lgtv-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.lgtv.svg)
![下载](https://img.shields.io/npm/dm/iobroker.lgtv.svg)
![国家公共管理](https://nodei.co/npm/iobroker.lgtv.png?downloads=true)
![特拉维斯-CI](https://travis-ci.org/SebastianSchultz/ioBroker.lgtv.svg?branch=master)
![应用程序载体](https://ci.appveyor.com/api/projects/status/xx55hgsuff4fas47/branch/master?svg=true)

# IoBroker.lgtv
适用于 ioBroker 的 LG WebOS SmartTV 适配器

从[io经纪商](https://www.iobroker.net)远程控制 LG WebOS SmartTV（2013 型号及更高版本）。

---

＃＃ 用法：
通过 ioBroker 管理界面安装适配器。
在适配器配置中输入 LG WebOS 电视的 IP 地址。
首次连接时，您将在电视屏幕上收到配对提示，您应允许连接。

### 投票
有些电视在关闭时会与网络插座断开连接，并且不会正确地将其报告给适配器。然后需要进行额外的轮询。您可以在设置中定义时间。如果该值为空，适配器会尝试自动检测此情况：在适配器重新启动时，轮询（每 60 秒一次）处于活动状态，直到检测到第一个正确的电视关闭事件。

＃＃ 一些例子：
```setState('lgtv.0.states.popup', 'Some text!');```

这将显示一个带有文本“Some text!”的弹出窗口。在电视上。
您可以在文本中使用 HTML 换行符 (br)。

```setState('lgtv.0.states.turnOff', true);```

关掉电视。

```setState('lgtv.0.states.mute', true);```

将电视静音。

```setState('lgtv.0.states.mute', false);```

取消电视静音。

```setState('lgtv.0.states.volumeUp', true);```

这会增加电视的音量。

```setState('lgtv.0.states.volumeDown', true);```

降低电视的音量。

```setState('lgtv.0.states.channelUp', true);```

增加当前电视频道。

```setState('lgtv.0.states.channelDown', true);```

减少当前电视频道。

```setState('lgtv.0.states.3Dmode', true);```

激活电视上的 3D 模式

```setState('lgtv.0.states.3Dmode', false);```

停用电视上的 3D 模式。

```setState('lgtv.0.states.channel', 7);```

将直播电视切换至 7 号频道。

```setState('lgtv.0.states.launch', 'livetv');```

切换到直播电视模式。

```setState('lgtv.0.states.launch', 'smartshare');```

在电视上打开 SmartShare 应用程序。

```setState('lgtv.0.states.launch', 'tvuserguide');```

在电视上运行电视用户指南应用程序。

```setState('lgtv.0.states.launch', 'netflix');```

在电视上打开 Netflix 应用程序。

```setState('lgtv.0.states.launch', 'youtube');```

在电视上打开 Youtube 应用程序。

```setState('lgtv.0.states.launch', 'prime');```

在电视上打开 Amazon Prime 应用程序。

```setState('lgtv.0.states.launch', 'amazon');```

在某些电视上，此命令会打开 Amazon Prime 应用程序。

```setState('lgtv.0.states.openURL', 'http://www.iobroker.net');```

打开电视上的网络浏览器并导航至 www.iobroker.net。
还可以用于打开图像或视频（在浏览器中）。

```setState('lgtv.0.states.input', 'av1');```

将电视输入切换至 AV1。

```setState('lgtv.0.states.input', 'scart');```

将电视输入切换至 Scart。

```setState('lgtv.0.states.input', 'component');```

将电视的输入切换为分量输入。

```setState('lgtv.0.states.input', 'hdmi1');```

将电视输入切换至 HDMI 1。

```setState('lgtv.0.states.input', 'hdmi2');```

将电视输入切换至 HDMI 2。

```setState('lgtv.0.states.input', 'hdmi3');```

将电视输入切换至 HDMI 3。

```setState('lgtv.0.states.youtube', 'https://www.youtube.com/watch?v=AjSpMQfRmEo'); OR setState('lgtv.0.states.youtube', 'AjSpMQfRmEo');```

播放 YouTube 视频。

```setState('lgtv.0.states.raw', '{"url": "ssap://system.launcher/launch", "cmd": "{id: 'netflix'}" }');```

```setState('lgtv.0.states.raw', '{"url": "ssap://api/getServiceList", "cmd": ""}');```

发送和响应RAW命令API。

```setState('lgtv.0.remote.*KEY*', true);```

将远程 KEY 发送到电视。

```setState('lgtv.0.states.power', true/false);```

关闭电视并打开电视（打开，仅适用于 LAN，使用 WOL）。

```setState('lgtv.0.states.soundOutput', 'external_arc');```

通过 ARC (HDMI) 切换音频输出。

---

＃＃ 状态
渠道

保持当前频道

体积

保持当前音量并可以更改音量

在

电视打开时为 true，电视关闭时为 false

---

## Changelog

### 1.1.10
* (foxriver76) prepare for controller v5

### 1.1.9 (2020-07-14)
* (SebastianSchultz) re-upload for fixing NPM update issue

### 1.1.8 (2020-07-08)
* (SebastianSchultz) bugfix for "IndexOf" error

### 1.1.6 (2020-03-07)
* (dirkhe) make healthintervall configurable

### 1.1.5 (2020-02-25)
* (dirkhe) stable connection and subsciptions
* (dirkhe) add Polling for TV, which not support Power Off event 
* (dirkhe) change some states role switch to button

### 1.1.4 (2020-02-07)
* (dirkhe) changed from pull to subscribing
* (dirkhe) add livetv to launch list

### 1.1.3 (2019-12-16)
* (merdok) fixed connect() [Pull requests #62](https://github.com/SebastianSchultz/ioBroker.lgtv/pull/62) 
* (instalator) fixed [issues #64](https://github.com/SebastianSchultz/ioBroker.lgtv/issues/64) 
* (instalator) change error log to debug [issues #59](https://github.com/SebastianSchultz/ioBroker.lgtv/issues/59) 

### 1.1.1 (2019-10-26)
* (instalator) Safe keyfile to /opt/iobroker [issues #52](https://github.com/SebastianSchultz/ioBroker.lgtv/issues/52) 
* (instalator) fix error reconect
* (instalator) fix raw object
* (instalator) add mac address to admin settings

### 1.1.0 (2019-10-10)
* (instalator) adding object remote.KEY
* (instalator) fix connect to TV
* (instalator) add subscribe volume and mute state
* (instalator) translate admin to RUS
* (instalator) add Turn On, using WOL
* (instalator) adding new different objects
* (SebastianSchultz) changed roles "button" to "switch" for compatibility for iot- & cloud-adapter

### 1.0.8 (2019-03-15)
* (SebastianSchultz) general NPM update

### 1.0.7 (2019-01-28)
* (SebastianSchultz) grouping of all states/objects under a device

### 1.0.6 (2019-01-21)
* (SebastianSchultz) added compact mode

### 1.0.5 (2018-04-15)
* (SebastianSchultz) added Travis-CI and AppVeyor tests

### 1.0.4 (2018-04-07)
* (SebastianSchultz) added support for increasing (channelUp) or decreasing (channelDown) the current TV channelDown
* (SebastianSchultz) added the state "volume" which holds the current volume level

### 1.0.3 (2018-01-11)
* (SebastianSchultz) added support for launching Amazon Prime app via "amazon" (used on some TV's instead of "prime")
* (SebastianSchultz) fixed issue that state "on" was not set when in an app on TV

### 1.0.2 (2017-05-23)
* (SebastianSchultz) added support for launching Amazon Prime app

### 1.0.0 (2016-09-26)
* (SebastianSchultz) added channel polling
* (SebastianSchultz) added switching input

### 0.0.4 (2016-09-12)
* (SebastianSchultz) solved saving IP address within adapter configuration

### 0.0.3 (2016-09-05)
* (SebastianSchultz) added volumeUp true|false
* (SebastianSchultz) added volumeDown true|false
* (SebastianSchultz) added 3Dmode true|false
* (SebastianSchultz) added launch livetv|smartshare|tvuserguide|netflix|youtube|<URL>
* (SebastianSchultz) added channel <channelNumber>
* (SebastianSchultz) some code cleaned

### 0.0.2 (2016-09-02)
* (SebastianSchultz) removed reconnect function, not used
* (SebastianSchultz) improved error handling and logging

### 0.0.1 (2016-08-31)
* (SebastianSchultz) initial commit


---

## License

The MIT License (MIT)

Copyright (c) 2020 Sebastian Schultz.

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