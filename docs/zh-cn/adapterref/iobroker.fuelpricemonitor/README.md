---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fuelpricemonitor/README.md
title: ioBroker.fuelpricemonitor
hash: OW2kXkPdM7QRdo8hr+ljEZZ/aoxPDF+3DtX3fpOLNsc=
---
![标识](../../../en/adapterref/iobroker.fuelpricemonitor/admin/fuelpricemonitor.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.fuelpricemonitor.svg)
![安装数量（稳定版）](http://iobroker.live/badges/fuelpricemonitor-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.fuelpricemonitor.svg)
![安装数量（最新）](http://iobroker.live/badges/fuelpricemonitor-installed.svg)
![依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.fuelpricemonitor)
![已知漏洞](https://snyk.io/test/github/HGlab01/ioBroker.fuelpricemonitor/badge.svg)
![NPM](https://nodei.co/npm/iobroker.fuelpricemonitor.png?downloads=true)

# IoBroker.fuelpricemonitor
[![FOSSA 状态](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor?ref=badge_shield) ![测试与发布](https://github.com/HGlab01/ioBroker.fuelpricemonitor/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 fuelpricemonitor 适配器
此适配器会根据您配置的地理位置，从奥地利官方数据库检索燃料（柴油、95号汽油和压缩天然气）价格。API 仅提供前 5 个加油站的价格。其余 5 个加油站的价格不可用。您可以添加其他位置。

默认情况下，此适配器会以 cron 任务的形式，每 20 分钟运行一次，您可以在实例选项卡中查看。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！

## 需要
* Node.js 22 或更高版本
* ioBroker 主机（js-controller）6.0.11 或更高版本

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.4.3 (2026-06-16)
* (HGlab01) some small improvements
* (HGlab01) Bump axios to 1.18.0

### 0.4.2 (2025-03-12)
* (HGlab01) Bump axios to 1.8.3

### 0.4.1 (2024-07-04)
* (HGlab01) fix "Method "deleteDevice" is deprecated" (#692)
* (HGlab01) Bump axios to 1.7.2
* (HGlab01) Bump ioBroker-jsonExplorer to 0.1.16

### 0.4.0 (2023-12-05)
* (HGlab01) Breaking changes
    - Node.js 18.0 or higher
    - ioBroker host (js-controller) 5.0 or higher
* (HGlab01) Bump axios to 1.6.2

### 0.3.6 (2023-08-10)
* (HGlab01) switch to Admin5 UI for configuration

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2021-2026 HGlab01 <myiobrokeradapters@gmail.com>

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


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor?ref=badge_large)