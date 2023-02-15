---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wallpanel/README.md
title: ioBroker.wallpanel
hash: 18e3WSSDTtMe3rpocCDe+eu15UCJCzhXxBsZN6PT/y0=
---
![标识](../../../en/adapterref/iobroker.wallpanel/admin/wallpanel.png)

![GitHub 发布](https://img.shields.io/github/v/release/xXBJXx/ioBroker.wallpanel?include_prereleases&label=GitHub%20release&logo=github)
![NPM 版本](https://img.shields.io/npm/v/iobroker.wallpanel.svg?logo=npm)
![NPM 下载](https://img.shields.io/npm/dm/iobroker.wallpanel.svg?logo=npm)
![已安装](https://iobroker.live/badges/wallpanel-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/wallpanel-stable.svg)

# IoBroker.wallpanel
![测试和发布](https://github.com/xXBJXx/ioBroker.wallpanel/workflows/Test%20and%20Release/badge.svg)

### 免责声明
所有产品和公司名称或徽标均为其各自所有者的 Trademarks™ 或 Registered® 商标。他们的使用并不意味着他们或相关附属公司有任何从属关系或认可！这个个人项目是在娱乐的基础上进行的，没有商业目标。 **[墙板](https://github.com/TheTimeWalker/wallpanel-android)**。

###哨兵
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**\有关更多详细信息和如何禁用错误报告的信息，请参阅。
[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

## 适配器需要 Node.js 版本 >= 16.x
## **可以找到详细说明[适配器文档](https://xxbjxx.github.io/wallpanel/)**
# 适配器说明
![墙面板适配器](../../../en/adapterref/iobroker.wallpanel/admin/media/wallpanelAdapter.png)

使用适配器，您可以查询一些值，例如亮度和关于 MQTT，然后还有电池电量和其他一些东西，<br>查询这些写在状态中的值并且是可用的。<br>还可以向平板电脑发送一些控制命令，例如亮度或当前 URL 更改。

适配器中可以同时设置数个平板电脑，可以一个接一个查询，当然也可以控制。

### **注意，如果您从 GitHub 安装应用程序，那么您是“从未知来源”安装的，这在某些情况下可能很危险，因为该应用程序尚未经过任何官方来源的恶意软件检查。**

## Changelog
 <!--
 Placeholder for the next version (at the beginning of the line):
 ### __WORK IN PROGRESS__ (- falls nicht benötigt löschen sonst klammern entfernen und nach dem - dein text schreiben)
 -->
### 0.3.11 (2023-02-06)
* (xXBJXx) Dependencies updated

### 0.3.10 (2022-12-23)
* (xXBJXx) update dependencies
* (xXBJXx) update to new React library for UI

### 0.3.9 (2022-10-02)
* (xXBJXx) dependencies updated 
* (xXBJXx) Moved global variable to constructor

### 0.3.8 (2022-07-02)
* (xXBJXx) removed the play Store Link and added the GitHub Link to the new version and add a Warning for the Installer from GitHub.
* (xXBJXx) optimized the code
* (xXBJXx) dependencies updated
* (xXBJXx) Leave the device switched off when creating Problem solved

### 0.3.7 (2022-06-06)
* (xXBJXx) Node version support set to >= v16.x because of new features of Node.js that are needed.
* (xXBJXx) fixed mqtt topic Display Direction

## License
MIT License

Copyright (c) 2020-2023 xXBJXx <issi.dev.iobroker@gmail.com>

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