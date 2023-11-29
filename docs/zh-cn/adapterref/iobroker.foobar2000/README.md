---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.foobar2000/README.md
title: iobroker.foobar2000
hash: FHzzUUNQWfab64uspZV5k99ssaQCOnUV9MNaunZnp2s=
---
![标识](../../../en/adapterref/iobroker.foobar2000/admin/foobar2000.png)

![GitHub 许可证](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.foobar2000)
![下载](https://img.shields.io/npm/dm/iobroker.foobar2000.svg)
![GitHub 存储库大小](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.foobar2000)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.foobar2000)
![GitHub 自最新版本以来提交的内容（按日期）](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.foobar2000/latest)
![GitHub 最后一次提交](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.foobar2000)
![GitHub 问题](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.foobar2000)
![NPM版本](http://img.shields.io/npm/v/iobroker.foobar2000.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/foobar2000-stable.svg)
![安装数量](https://iobroker.live/badges/foobar2000-installed.svg)

# Iobroker.foobar2000
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/foobar2000/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **版本：** </br> </br> **测试：** </br> [![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.foobar2000/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.foobar2000/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.foobar2000/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.foobar2000/actions/workflows/codeql.yml)

<!--

## Sentry **此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。
-->
## Iobroker 的 Foobar2000 适配器
![管理设置。](../../../en/adapterref/iobroker.foobar2000/admin/admin.png)

＃＃ 使用
要控制播放器，您必须安装插件[foo_httpcontrol](https://bitbucket.org/oblikoamorale/foo_httpcontrol/downloads/)。
要将封面显示为文件链接，请在文件```c:\Users\{USER}\AppData\Roaming\foobar2000\foo_httpcontrol_data\foobar2000controller\config```中更改参数```albumart_prefer_embedded = 0```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.1.0 (2023-11-07)
* (mcm1957) Adapter requires nodejs16 or newer now.
* (mcm1957) Adapter has been moved to iobroker-community-adapters organization.
* (mcm1957) Dependencies have been updated.

### 2.0.4
* (instalator) fixed error

### 2.0.3
* (instalator) fixed admin error

### 2.0.2
* (instalator) fixed error

### 2.0.0
* (instalator) Completely rewritten

### 1.0.0
* (instalator) Up to stable

### 0.2.0
* (instalator) Change for widgets vis-players

### 0.1.2
* (instalator) del widgets folders
* (instalator) change log level
* (instalator) add news object

### 0.1.1
* (instalator) fix start, exit for local

### 0.1.0
* (instalator) beta (20.10.2016)

### 0.0.1
* (instalator) initial (12.10.2016)

## License
The MIT License (MIT)

Copyright (c) 2023 iobroker-community-adapters <mcm57@gmx.at>
Copyright (c) 2021 instalator <vvvalt@mail.ru>

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