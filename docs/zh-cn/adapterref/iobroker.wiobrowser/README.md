---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wiobrowser/README.md
title: ioBroker.wiobrowser
hash: L+GWT3kskhrkMYunsdCKJiLoBaHt1OAfuQs2cphxCng=
---
![标识](../../../en/adapterref/iobroker.wiobrowser/admin/wiobrowser.png)

![安装数量](http://iobroker.live/badges/wiobrowser-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.wiobrowser.svg)
![下载](https://img.shields.io/npm/dm/iobroker.wiobrowser.svg)
![NPM](https://nodei.co/npm/iobroker.wiobrowser.png?downloads=true)

#ioBroker.wiobrowser
## 信息
使用 ioBroker 的 sip 客户端适配器控制 Windows 全屏浏览器

此适配器通过 tcp.socket 连接到 wioBrowser 以控制它。有 2 种不同的 wioBrowser 应用程序：+ wio Browser Chromium Framework + wioNoweb（没有网络和 sip 的相同功能）

wioBrowser 是一个 Windows 全屏浏览器，可以通过 ioBroker 控制，它显示单个网站或可以在适配器中设置的网站幻灯片。信息也被传输到适配器：+ CPU 负载 + 可用内存 + 平板电脑或笔记本电脑上的当前电池放电 + 主机名 + IP

他还可以控制： + sip 客户端 + 屏幕开/关 + 退出应用程序 + 音量 +/- + 静音开/关 + 亮度 +/- + 使用开关运行程序，例如C:\ClickMonitorDDC\ClickMonitorDDC_7_2.exe b 100+短信+朗读+播放音频文件

＃＃ 关联
* [ioBroker 论坛适配器线程](https://forum.iobroker.net/topic/50982/neuer-adapter-wiobrowser-f%C3%BCr-windows)
* [Tutorial über die Messages](https://forum.iobroker.net/topic/51534/tutorial-wiobrowser-windows-desktop-popup-messages) 用户 hydrotec

## Changelog
### 2.0.0
* (bettman66) add sip

### 1.1.4
* (bettman66) play audiofile

### 1.1.2
* (bettman66) translate

### 1.1.1
* (bettman66) update readme

### 1.1.0
* (bettman66) window transparency

### 1.0.0
* (bettman66) stable

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