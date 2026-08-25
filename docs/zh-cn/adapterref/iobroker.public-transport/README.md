---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.public-transport/README.md
title: ioBroker.公共交通
hash: NIvhmX4QbnCx9cJvbfQvrfSsm74PSRtC8mAhXjEtk04=
---
![标识](../../../en/adapterref/iobroker.public-transport/admin/iconAdapter.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.public-transport.svg)
![下载](https://img.shields.io/npm/dm/iobroker.public-transport.svg)
![安装数量](https://iobroker.live/badges/public-transport-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/public-transport-stable.svg)
![NPM](https://nodei.co/npm/iobroker.public-transport.png?downloads=true)

# IoBroker.public-transport
**测试：** ![测试与发布](https://github.com/tt-tom17/ioBroker.public-transport/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的公共交通适配器
公共交通适配器可将实时公共交通时刻表信息无缝集成到您的 ioBroker 智能家居环境中。借助此适配器，您可以获取德国、奥地利和其他国家/地区各交通运营商站点的发车时间，并将其用于自动化控制。

[🇬🇧 英文文档](https://github.com/tt-tom17/ioBroker.public-transport/wiki/en-Home) [🇩🇪 德语文档](https://github.com/tt-tom17/ioBroker.public-transport/wiki)

## 数据来源
适配器本身不存储任何时刻表数据——它会查询您在设置中选择的交通网络接口。具体条款以相应运营商的规定为准。

<a href="https://www.vrr.de"><img src="admin/vrr-logo.svg" alt="莱茵-鲁尔交通联盟" height="70" align="left" hspace="12"></a>

**EFA – VRR：**莱茵-鲁尔区的时刻表数据由[莱茵-鲁尔交通协会 (VRR)](https://www.vrr.de)通过其开放服务API提供。VRR要求使用此接口的应用程序链接到www.vrr.de并显示其徽标——因此，适配器会在实例设置中显示这两项信息。

<br clear="left">

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.2.0 (2026-08-25)
* (tt-tom17) added EFA as a new backend with VRR (Rhein-Ruhr) as the first network

### 1.1.0 (2026-08-21)
* (tt-tom17) added a "Create detail data points" switch per station and journey. The switch is off by default
* (tt-tom17) fixed the departure widget hiding all multi-word products (S-Bahn, U-Bahn, RE, ICE, ...) whenever the product filter was enabled
* (tt-tom17) the widgets no longer log continuously; set `publicTransportDebug = true` in the browser console to get the diagnostics back

### 1.0.0 (2026-08-08)
* (tt-tom17) migrated the admin configuration GUI to @iobroker/gui-components 10 (React 19, MUI 9); requires admin >= 8.0.1

### 0.10.2 (2026-07-17)
* (tt-tom17) fixed journey and departure channel names showing stale labels after a connection changed
* (tt-tom17) added a "Number of transfers" dropdown per journey (-1 = backend decides, 0 = direct connections only); applies to both HAFAS and MOTIS

### 0.10.1 (2026-07-11)
* (tt-tom17) fixed departure and journey data points being cleared during slow polls (#87)

### 0.10.0 (2026-07-07)
* (tt-tom17) added a configurable time window (duration, in minutes) per station to fetch departures beyond the default 60 minutes (#85)
* (tt-tom17) disabled the "Vendo - Deutsche Bahn" client option, as the db-vendo endpoint currently returns OPS_BLOCKED (#85)
* (tt-tom17) fixed repository checker warnings (#80): translated untranslated admin i18n strings (zh-cn, es)

### 0.9.1 (2026-07-05)
* (tt-tom17) fixed stale data points not being cleared, both after a restart and during operation (#82)

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025 - 2026 tt-tom17 <tgb@kabelmail.de>

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