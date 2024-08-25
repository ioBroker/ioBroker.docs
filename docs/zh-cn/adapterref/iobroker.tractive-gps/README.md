---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tractive-gps/README.md
title: ioBroker.tractive-gps
hash: UK0rDDy+fjpro8mYDetaov7yQYXMGOmdZb5XkbGVoO8=
---
![标识](../../../en/adapterref/iobroker.tractive-gps/admin/tractive-gps.png)

![GitHub 许可证](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.tractive-gps)
![下载](https://img.shields.io/npm/dm/iobroker.tractive-gps.svg)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.tractive-gps)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.tractive-gps)
![GitHub 自最新版本以来的提交情况（按日期）](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.tractive-gps/latest)
![GitHub 上次提交](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.tractive-gps)
![GitHub 问题](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.tractive-gps)
![NPM 版本](http://img.shields.io/npm/v/iobroker.tractive-gps.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/tractive-gps-stable.svg)
![安装数量](https://iobroker.live/badges/tractive-gps-installed.svg)

# IoBroker.tractive-gps
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/tractive-gps/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br>

**版本：**

**测试：**

[![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.tractive-gps/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.tractive-gps/actions/workflows/test-and-release.yml) [![CodeQL]（https://github.com/iobroker-community-adapters/ioBroker.tractive-gps/actions/workflows/codeql.yml/badge.svg）](https://github.com/iobroker-community-adapters/ioBroker.tractive-gps/actions/workflows/codeql.yml)

## 用于 ioBroker 的 tractive-gps 适配器
### 免责声明
所有产品和公司名称或徽标均为其各自所有者的商标™ 或注册® 商标。
它们的使用并不意味着它们或相关附属机构有任何从属关系或认可！此个人项目是出于娱乐目的而进行的，没有任何商业目的。
**[牵引](https://tractive.com/de/)** 是 **Tractive GmbH** 的商标。

### 哨兵
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅。
[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

### 致谢
如果没有创建此适配器的 @xXBJXx (https://github.com/xXBJXx) 的出色工作，此适配器就不可能实现。

＃＃＃ 描述
此适配器允许您连接到 Tractive GPS 服务并检索宠物的位置。
适配器为每个宠物创建一个设备，并为每个位置创建一个状态。
适配器还为跟踪器的电池电量和 API 提供的许多其他状态创建状态。

### 先决条件
要使用此适配器，您必须拥有一个 Tractive 帐户并拥有您的宠物的追踪器（参见[牵引](https://tractive.com/de/)）（**注意**：使用 Tractive 服务的月费/年费）

＃＃＃ 安装
适配器通过 ioBroker 适配器管理器安装。
安装后，您必须使用 Tractive 帐户登录并设置轮询间隔。
然后，适配器将从 Tractive API 获取令牌并将其存储在配置中。
此令牌具有到期时间，到期后将自动更新。

＃＃＃ 配置
在适配器配置中，有两个设置选项：

* **登录**。
1. 您可以在此处使用您的 Tractive 帐户登录。
2.设置轮询间隔。
3.手动重新签发令牌。

  ![实例-tractive-gps-login.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Finstances-tractive-gps-login.png)

* **所有设备** - 此处显示适配器找到的所有设备的列表。您可以在列表中更改设备的名称。

这也将显示在对象中。
![实例-tractive-gps-allDevices-table.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Finstances-tractive-gps-allDevices-table.png) 要更改名称，请单击铅笔图标并输入新名称。
![实例-tractive-gps-allDevices-modal.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Finstances-tractive-gps-allDevices-modal.png)

### 标签
在选项卡中，所有找到的设备都显示一张地图和一些有关设备的信息。
![标签-tractive-gps.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Ftab-tractive-gps.png) 图像也可以用动物自己的图像替换。
为此，必须将带有跟踪器名称的 PNG 文件（例如，ZSDLINVD.png）放在文件夹 **iobroker-data/files/tractive-gps** 中。
或者您可以使用选项卡 **files** 上传文件。（见下图）**图像的推荐尺寸为 1920x1080 像素。**![文件-tractive-gps.png](../../../en/adapterref/iobroker.tractive-gps/admin%2Fimages%2Ffiles-tractive-gps.png)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.1 (2024-08-20)
* (bluefox) Fixing encryption of the access token

### 2.0.0 (2024-08-18)
* (bluefox) BREAKING CHANGE: You must enter your credentials again
* (bluefox) Old code has been removed and GUI has been rewritten
* (bluefox) Dependencies have been updated

### 1.2.0 (2024-04-28)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.1.0 (2023-11-05)
* (Scrounger) Bugfix: objects will be created only if necessary
* (Scrounger) Bugfix for excessive number of warnings has been added
* (Scrounger) Distance calculation between ioBroker and tracker has been added

### 1.0.0 (2023-11-04)
* (mcm1957) Adapter has been moved into iobroker-community-adapters organisation
* (mcm1957) Dependencies have been updated

## License
MIT License

Copyright (c) 2023-2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 xXBJXx <issi.dev.iobroker@gmail.com>

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