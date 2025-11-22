---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.apg-info/README.md
title: ioBroker.apg-info
hash: /jy4O1qaZHoOv/kGR7OZoKXOSS2F1t7QxxflAn4JrX0=
---
![标识](../../../en/adapterref/iobroker.apg-info/admin/apg-info.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.apg-info.svg)
![安装数量（稳定版）](http://iobroker.live/badges/apg-info-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.apg-info.svg)
![安装数量（最新）](http://iobroker.live/badges/apg-info-installed.svg)
![依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.apg-info)
![已知漏洞](https://snyk.io/test/github/HGlab01/ioBroker.apg-info/badge.svg)
![NPM](https://nodei.co/npm/iobroker.apg-info.png?downloads=true)

# IoBroker.apg-info
[![FOSSA 状态](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info?ref=badge_shield) ![测试与发布](https://github.com/HGlab01/ioBroker.apg-info/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 apg-info 适配器
此适配器提供奥地利电网的用电高峰时段（仅限奥地利数据！），建议避开这些时段的用电。此外，该适配器还提供奥地利、瑞士和德国的PHELIX日前（EPEX现货）电价（可在适配器设置中配置）。供应商费用、税费和电网成本可在配置中选择性添加（在“计算”选项卡中）。

`[..].marketprice.today.jsonChart` 和 `[..].marketprice.tomorrow.jsonChart` 可与 https://github.com/Scrounger/ioBroker.vis-materialdesign#json-chart 配合使用。

标准配置下，适配器会在 00:00、13:00 和 15:00 运行。强烈建议不要移除 00:00 的运行，否则日期变更（明天到今天）将无法正常工作。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！

## 需要
* Node.js 20 或更高版本
* ioBroker 主机（js-controller）5.0 或更高版本

每刻钟市场价格
这些市场价格由 Exaa 收集，并由 Entsoe 作为备份。因此，如果配置了每刻钟一次的价格，建议*申请 Entsoe 代币*。

瑞士市场
对于瑞士市场，需要使用来自entsoe.eu的代币。请将您的代币添加到适配器配置中的“ENTSOE TOKEN”选项卡中。

如何获得 Entsoe 代币
请在 https://transparency.entsoe.eu/ 页面注册，然后发送电子邮件至 transparency@entsoe.eu，请求授予您注册的电子邮件地址 RESTFUL API 访问权限。<br>更多详情请查看 https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html#_authentication_and_authorisation

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.1.24 (2025-11-05)
* (HGlab01) Provider Entsoe is used as backup for quarter-hourly market prices. Request a token to be on the safe side
* (HGlab01) Bump axios to 1.13.1
* (HGlab01) Bump iobroker-jsonexplorer to 0.2.2

### 0.1.23 (2025-10-29)
* (HGlab01) extend to two market data providers for quarter-hourly market prices
* (HGlab01) add turn on/off quarter-hourly and hourly market prices
* (HGlab01) refactorings

### 0.1.22 (2025-10-21)
* (HGlab01) Implement retry mechanism for API calls
* (HGlab01) add turn on/off for peak hours and market prices

### 0.1.21 (2025-10-13)
* (HGlab01) Support quater-hourly tarifs
* (HGlab01) Bump iobroker-jsonexplorer to 0.2.1

### 0.1.20 (2025-10-06)
* (HGlab01) prepeare iobroker-jsonexplorer readiness for v0.2.0
* (HGlab01) Bump axios to 1.12.2

## License
MIT License

Copyright (c) 2025 HGlab01 <myiobrokeradapters@gmail.com>

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