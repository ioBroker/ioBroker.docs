---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.meteoalarm/README.md
title: ioBroker.meteoalarm
hash: me8TkQFULVxyMbpJjYpqSYrGcAilUysqCKL2D1+NPxg=
---
![标识](../../../en/adapterref/iobroker.meteoalarm/admin/meteoalarm.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.meteoalarm.svg)
![下载](https://img.shields.io/npm/dm/iobroker.meteoalarm.svg)
![安装数量](http://iobroker.live/badges/meteoalarm-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.meteoalarm.png?downloads=true)

# IoBroker.meteoalarm
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-Plugin 文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

meteoalarm ioBroker 适配器 ------------------------------------------------------------------------------ 此适配器从 https://meteoalarm.org 提取天气警报，包括风、雪、雨、高温和低温等。此信息提供当地语言版本，并按详细地区提供。

免责声明：本网站与 www.meteoalarm.org 网站之间可能存在时间延迟，如需获取参与国家气象局发布的警报级别最新信息，请使用 https://www.meteoalarm.org。

开发人员无法保证警告能够得到及时处理或者存在错误和问题导致根本无法处理警告！

如何使用
选择您所在的国家/地区，然后选择您想要接收警报的地区。如果您不确定您所在的地区名称，请访问 https://meteoalarm.org 并尝试在地图上查找。

[英文描述](docs/en/meteoalarm.md)

[德意志通讯社](docs/de/meteoalarm.md)

## 致谢
如果没有@jack-blackson (https://github.com/jack-blackson) 的出色工作，这个适配器是不可能实现的，他创建了此适配器的 V4.x.x 之前的版本。

图标中的铃铛由 Freepik 设计，来自 www.flaticon.com

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 4.0.0 (2025-06-06)
* (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation.
* (mcm1957) Adapter requires node.js 20, js-controller 6.0.11 and admin 7.4.10 now.
* (mcm1957) @iobroker/eslint-config has been added and linter error have been fixed.
* (mcm1957) Dependencies have been updated.

### 3.0.3 (2024-08-11)
* (jack-blackson) Updated repositories
* (jack-blackson) Small adjustments in package settings

### 3.0.2 (2024-02-24)
* (jack-blackson) Bugfix for notification text - missing space
* (jack-blackson) Bugfix for notification text - fix to just show "warning level in words" in the notification if it is ticked in the setup

### 3.0.1 (2024-02-29)
* (jack-blackson) Bugfix for location names
* (jack-blackson) Removed necessity to choose country, this is now automatically detected

### 3.0.0 (2024-02-26)
* (jack-blackson) Breaking change: switch to locations instead of choosing geocodes to be able to also handle warnings coming with polygons (e.g. Switzerland)

## License
The MIT License (MIT)

Copyright (c) 2025, iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2019-2024 jack-blackson <blacksonj7@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.