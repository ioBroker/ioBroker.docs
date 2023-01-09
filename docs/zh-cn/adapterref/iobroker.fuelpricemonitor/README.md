---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fuelpricemonitor/README.md
title: ioBroker.fuelpricemonitor
hash: q/gMW6l23X/eui0d7159a+Xlme9VX5Ma+RjiSz2zzMA=
---
![商标](../../../en/adapterref/iobroker.fuelpricemonitor/admin/fuelpricemonitor.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.fuelpricemonitor.svg)
![安装数量（稳定）](http://iobroker.live/badges/fuelpricemonitor-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.fuelpricemonitor.svg)
![安装数量（最新）](http://iobroker.live/badges/fuelpricemonitor-installed.svg)
![依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.fuelpricemonitor)
![已知漏洞](https://snyk.io/test/github/HGlab01/ioBroker.fuelpricemonitor/badge.svg)
![NPM](https://nodei.co/npm/iobroker.fuelpricemonitor.png?downloads=true)

# IoBroker.fuelpricemonitor
[![FOSSA 状态](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor?ref=badge_shield)![测试和发布](https://github.com/HGlab01/ioBroker.fuelpricemonitor/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 fuelpricemonitor 适配器
此适配器根据您配置的地理位置从奥地利官方数据库中检索燃料（柴油、Super95 和 CNG）价格。 API 仅提供前 5 个站点的价格。其他 5 个车站的价格不可用。可以添加其他位置。
默认计划每 20 分钟完成一次，作为实例选项卡中的 cron 作业。

**此适配器使用哨兵库自动向开发人员报告异常和代码错误。**有关更多详细信息和如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！

## 要求
* NodeJS 14.16 或更高版本
* ioBroker 主机 (js-controller) 4.0 或更高版本

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.3.3 (2022-12-22)
* (HGlab01) Cheapest station now per fuel type (#445)

### 0.3.2 (2022-12-16)
* (HGlab01) Add feature to find cheapest stations over all locations (#365)
* (HGlab01) Bump ioBroker-jsonExplorer to 0.1.10
* (HGlab01) Bump axios to 1.2.1

### 0.3.1 (2022-10-25)
* (HGlab01) Add option to exclude closed gas stations (#407)

### 0.3.0 (2022-08-30)
* (HGlab01) !Breaking change! NodeJS 14.16 or higher required
* (HGlab01) !Breaking change! ioBroker js-controller 4.0 or higher required
* (HGlab01) Bump is-online from 9.0.1 to 10.0.0

### 0.2.10 (2022-02-24)
* (HGlab01) Bump iobroker-jsonexplorer to v0.1.9
* (HGlab01) js-controller 4.0 readiness

## License
MIT License

Copyright (c) 2022 HGlab01 <iobroker.followthesun@gmail.com>

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