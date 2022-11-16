---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wallpanel/README.md
title: ioBroker.wallpanel
hash: 8IZ7RZ71Bv/GJK63UmHbo/Z6E+HDKyBuHNYmO+/1duM=
---
![标识](../../../en/adapterref/iobroker.wallpanel/admin/wallpanel.png)

![GitHub 发布](https://img.shields.io/github/v/release/xXBJXx/ioBroker.wallpanel?include_prereleases&label=GitHub%20release&logo=github)
![NPM 版本](https://img.shields.io/npm/v/iobroker.wallpanel.svg?logo=npm)
![NPM 下载](https://img.shields.io/npm/dm/iobroker.wallpanel.svg?logo=npm)
![已安装](https://iobroker.live/badges/wallpanel-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/wallpanel-stable.svg)
![已知漏洞](https://snyk.io/test/github/xXBJXx/ioBroker.wallpanel/badge.svg)
![新PM](https://nodei.co/npm/iobroker.wallpanel.png?downloads=true)

# IoBroker.wallpanel
![测试和发布](https://github.com/xXBJXx/ioBroker.wallpanel/workflows/Test%20and%20Release/badge.svg)

**此适配器使用服务 Sentry.io 自动向作为开发人员的我报告异常和代码错误以及新设备架构。
更多详情见下文！ [哨兵](#sentry)**

## 适配器需要 Node.js 版本 >= 16.x
## **详细说明见[适配器文档](https://xxbjxx.github.io/wallpanel/)**
# 适配器说明
![墙板适配器](../../../en/adapterref/iobroker.wallpanel/admin/media/wallpanelAdapter.png)

使用适配器，您可以查询一些值，例如亮度和关于 MQTT，然后还可以查询电池电量和其他一些东西，<br>查询这些写在状态中的值并且可用。<br>还可以向平板电脑发送一些控制命令，例如亮度或当前 URL 更改。

适配器中可以同时设置几个平板，然后可以一个接一个地查询，当然也可以控制。

该应用程序不再在 Play 商店中可用，但您仍然可以通过 APK + 原始版本（Play 商店版本）从 GitHub 安装它⇨[旧版](https://github.com/thecowan/wallpanel-android/releases) 未进一步开发 + 目前仅在 GitHub 上的新版本⇨§ §LLLL_1§§正在进一步开发中。

### **注意，如果您从 GitHub 安装应用程序，那么您会“从未知来源”安装它，这在某些情况下可能很危险，因为任何官方来源都没有检查过该应用程序是否存在恶意软件。**
这里仍然是此适配器的论坛主题：[论坛帖子](https://forum.iobroker.net/topic/36438/test-adapter-wallpanel)

##哨兵
### Sentry.io 是什么以及向该公司的服务器报告什么？
Sentry.io 是一项服务，供开发人员从他们的应用程序中获取有关错误的概述。而这正是在这个适配器中实现的。

当适配器崩溃或发生另一个代码错误时，也会出现在 ioBroker 日志中的此错误消息将提交给 Sentry。当您允许 iobroker GmbH 收集诊断数据时，还包括您的安装 ID（这只是一个唯一 ID，没有任何关于您的其他信息、电子邮件名称等）。这允许 Sentry 对错误进行分组并显示有多少唯一用户受到此类错误的影响。
所有这些都帮助我提供了基本上不会崩溃的无错误适配器。

有关如何禁用错误报告的更多详细信息和信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)<br> Sentry Reporting 是从 js-controller 3.0 开始使用的。

## Changelog
 <!--
 Placeholder for the next version (at the beginning of the line):
 ### __WORK IN PROGRESS__ (- falls nicht benötigt löschen sonst klammern entfernen und nach dem - dein text schreiben)
 -->
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

### 0.3.6 (2022-05-30)
* (xXBJXx) preparation for release in ioBroker Repo. Adapter-Check issues processed

### 0.3.5 (2022-05-30)
* (xXBJXx) update Changelog and fixed type issues

## License
MIT License

Copyright (c) 2020-2022 xXBJXx <issi.dev.iobroker@gmail.com>

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