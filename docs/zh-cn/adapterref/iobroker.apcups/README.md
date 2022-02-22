---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.apcups/README.md
title: ioBroker.apcups
hash: PsNp0J2WZMaXgUdZhR9Qe29ydrcYuGzOxMfZjSauqWY=
---
![商标](../../../en/adapterref/iobroker.apcups/admin/ups.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.apcups.svg)
![下载](https://img.shields.io/npm/dm/iobroker.apcups.svg)
![安装数量（最新）](https://iobroker.live/badges/apcups-installed.svg)
![新PM](https://nodei.co/npm/iobroker.apcups.png?downloads=true)

# IoBroker.apcups
**测试：** [![测试和发布](https://github.com/xhunter74/ioBroker.apcups/actions/workflows/main.yml/badge.svg)](https://github.com/xhunter74/ioBroker.apcups/actions/workflows/main.yml)

## IoBroker 的 Apc UPS 适配器
ioBroker 的适配器，用于通过 apcupsd 从 APS UPS 获取信息。

apcupsd 主页：http://www.apcupsd.org/

apcupsd 是一个用于控制 APC UPS 的守护进程。使用此适配器，您可以监控 UPS 状态并根据提供的信息做出一些决定。

**在 Ubuntu 上安装 apcupsd：**

sudo apt-get -y 安装 apcupsd

有关 Ubuntu 的 apcupsd 配置的更多有用信息，您可以在 https://help.ubuntu.com/community/apcupsd 上找到

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

## Changelog

### 0.0.9 (2022-02-21)
 - Changed adapter type
### 0.0.8 (2022-02-18)
 - Fixed review issues
### 0.0.7 (2022-02-18)
 - Changed default log level to 'info'
### 0.0.6 (2022-02-17)
 - Cleanup code.
 - Sentry integration
### 0.0.5 (2022-02-16)
 - Fixed issues with uncaught exception.
### 0.0.4 (2022-01-12)
 - Fixed issue with polling interval greater than 15 sec.
### 0.0.3 (2021-10-18)
 - Fixed parse values bugs.
### 0.0.2 (2021-09-13)
 - Initial commit. Alpha Version. 

### **WORK IN PROGRESS**
* (Author) initial release

## License
MIT License

Copyright (c) 2022 Serhiy Krasovskyy xhunter74@gmail.com"

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