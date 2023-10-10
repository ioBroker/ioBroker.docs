---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.apg-info/README.md
title: ioBroker.apg-信息
hash: wTeQqpdC016MkqkxOvzgxJrsAjA1XX7nPJN0upqHLzo=
---
![标识](../../../en/adapterref/iobroker.apg-info/admin/apg-info.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.apg-info.svg)
![安装数量（稳定）](http://iobroker.live/badges/apg-info-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.apg-info.svg)
![安装数量（最新）](http://iobroker.live/badges/apg-info-installed.svg)
![依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.apg-info)
![已知漏洞](https://snyk.io/test/github/HGlab01/ioBroker.apg-info/badge.svg)
![国家公共管理](https://nodei.co/npm/iobroker.apg-info.png?downloads=true)

# IoBroker.apg-信息
[![FOSSA 状态](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info?ref=badge_shield)![测试与发布](https://github.com/HGlab01/ioBroker.apg-info/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 apg-info 适配器
该适配器为奥地利电网提供高峰时间，避免电力消耗。此外，适配器还提供奥地利和德国的 PHELIX Day-Ahead (EPEX Spot) 价格（在适配器设置中配置）。<br> `[..].marketprice.today.jsonChart` 和 `[..].marketprice.tomorrow.jsonChart` 可与 https://github.com/Scrounger/ioBroker.vis-materialdesign#json-chart 一起使用。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## 需要
* NodeJS 16 或更高版本
* ioBroker 主机（js-controller）4.0 或更高版本

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.0.7-alpha.1 (2023-10-09)
* (HGlab01) Bump json-explorer to 0.1.14
* (HGlab01) add jsonChart-json for market prices

### 0.0.6 (2023-10-04)
* (HGlab01) fix "TypeError: Cannot read properties of undefined (reading 'Warning')"

### 0.0.5 (2023-10-03)
* (HGlab01) switch data provider for prices to EXAA
* (HGlab01) support DE market prices in addiotion to AT prices

### 0.0.3 (2023-09-24)
* (HGlab01) add point in times sorted as array
* (HGlab01) add average price
* (HGlab01) fix bug IOBROKER-APG-INFO-2 notified by sentry

### 0.0.2 (2023-09-14)
* (HGlab01) add number of days below/above treshold
* (HGlab01) add states sorted by price

## License
MIT License

Copyright (c) 2023 HGlab01 <iobroker.followthesun@gmail.com>

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

#### Disclaimer apg-powermonitor
More about the security of supply & all data, facts and figures regarding the world of electricity and the energy transition can be found at www.apg-powermonitor.at.


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info?ref=badge_large)