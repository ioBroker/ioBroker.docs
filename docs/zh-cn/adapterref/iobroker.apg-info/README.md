---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.apg-info/README.md
title: ioBroker.apg-信息
hash: fFIEBJshLTild/XRsvL+mjDspkm5nmMAICvK5lMkaVE=
---
![标识](../../../en/adapterref/iobroker.apg-info/admin/apg-info.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.apg-info.svg)
![安装数量（稳定）](http://iobroker.live/badges/apg-info-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.apg-info.svg)
![安装数量（最新）](http://iobroker.live/badges/apg-info-installed.svg)
![依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.apg-info)
![已知漏洞](https://snyk.io/test/github/HGlab01/ioBroker.apg-info/badge.svg)
![新公共管理](https://nodei.co/npm/iobroker.apg-info.png?downloads=true)

# IoBroker.apg-信息
[![FOSSA 状态](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info?ref=badge_shield) ![测试和发布](https://github.com/HGlab01/ioBroker.apg-info/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 apg-info 适配器
此适配器提供奥地利电网的峰值时段（仅限奥地利值！），避免用电高峰时段。此外，适配器还提供奥地利、瑞士和德国的 PHELIX 日前电价（EPEX 现货电价）（可在适配器设置中进行配置）。供应商费用、税费和电网成本可在配置（“计算”选项卡中选择性添加）。
`[..].marketprice.today.jsonChart` 和 `[..].marketprice.tomorrow.jsonChart` 可与 https://github.com/Scrounger/ioBroker.vis-materialdesign#json-chart 配合使用。
在标准配置下，适配器会在 00:00、13:00 和 15:00 运行。强烈建议不要移除 00:00 的运行，否则日期变更（明天 --> 今天）将无法正常工作。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-Plugin 文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！

## 要求
* Node.js 20 或更高版本
* ioBroker 主机（js-controller）5.0 或更高版本

## 瑞士市场
对于瑞士市场，需要 entsoe.eu 的令牌。请将您的令牌添加到“ENTSOE TOKEN”选项卡中的适配器配置中。请在 https://transparency.entsoe.eu/ 页面上注册，然后发送电子邮件至 transparent@entsoe.eu，申请您注册的电子邮件地址的 RESTFUL API 访问权限。<br>更多详细信息请查看https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html#_authentication_and_authorisation

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.1.17 (2025-06-03)
* (HGlab01) Add retry mechanism for Entsoe

### 0.1.16 (2025-05-18)
* (HGlab01) Optimize Entsoe (Swiss market) requests
* (HGlab01) Extend timeout for Api calls to 30 seconds 
* (HGlab01) Bump axios to 1.9.0

### 0.1.15 (2025-04-17)
* (HGlab01) fix 'Cannot read properties of undefined (reading 'price_amount')'

### 0.1.14 (2025-03-30)
* (HGlab01) Fix switch to summer time begin issue
* (HGlab01) Bump axios to 1.8.4
* (HGlab01) Fix warning "State attribute definition missing for 'item xx' 
* (HGlab01) Fix provider-fee% calculation if base price is negative ([#354](https://github.com/HGlab01/ioBroker.apg-info/issues/354))

### 0.1.13 (2025-03-12)
* (HGlab01) Bump axios to 1.8.3

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