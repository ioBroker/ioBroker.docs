---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.winsipbrowser/README.md
title: ioBroker.winsipbrowser
hash: gn5ynf5pXo2yihnyTWneeKz+P8/EkMtH+zFR6j5LvUw=
---
![商标](../../../en/adapterref/iobroker.winsipbrowser/admin/winsipbrowser.png)

![安装数量](http://iobroker.live/badges/winsipbrowser-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.winsipbrowser.svg)
![下载](https://img.shields.io/npm/dm/iobroker.winsipbrowser.svg)
![新PM](https://nodei.co/npm/iobroker.winsipbrowser.png?downloads=true)

# IoBroker.winsipbrowser
## 信息
使用 sipclient 控制 Windows 全屏浏览器

ioBroker 适配器

这个适配器通过 tcp.socket 连接到 winsipbrowser 来控制它。

winsipbrowser 是一个带有 sipclient 的 Windows 全屏浏览器，可以通过 ioBroker 进行控制，它可以显示单个网站或可以在适配器中设置的网站幻灯片。信息也会传输到适配器：+ CPU 负载 + 可用内存 + 平板电脑或笔记本电脑上的当前电池放电 + 主机名 + IP

他还可以控制： + 屏幕开/关 + 退出应用程序 + 音量 +/- + 静音开/关 + 亮度 +/- + 使用开关运行程序，例如C:\ClickMonitorDDC\ClickMonitorDDC_7_2.exe b 100 + 短信 + 语音

＃＃ 关联
* [ioBroker 论坛适配器线程](https://forum.iobroker.net/topic/53162/neuer-adapter-winsipbrowser-f%C3%BCr-windows)
* [ioBroker 论坛程序主题](https://forum.iobroker.net/topic/53032/sprechanlagen-innenstation-browser-mit-sip-client?_=1646732403727)

## Changelog
### 0.1.1
* (bettman66) stop slideshow by touchevent

### 0.1.0
* (bettman66) tcpclient2tcpserver

### 0.0.5
* (bettman66) add messages

### 0.0.4
* (bettman66) add siphungup

### 0.0.3
* (bettman66) add sipring

### 0.0.2
* (bettman66) add sipcall

### 0.0.1
* (bettman66) first commit

## License
The MIT License (MIT)

Copyright (c) 2022 Walter Zengel <w.zengel@gmx.de>

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