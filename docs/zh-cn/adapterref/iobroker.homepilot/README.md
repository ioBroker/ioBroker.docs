---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.homepilot/README.md
title: ioBroker.homepilot
hash: 81PmsjfzGIpTyiziWe53Oh+v7eFn8S0KgYpV0NYbkz8=
---
![标识](../../../en/adapterref/iobroker.homepilot/admin/homepilot.png)

![安装数量](http://iobroker.live/badges/homepilot-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.homepilot.svg)
![下载](https://img.shields.io/npm/dm/iobroker.homepilot.svg)
![NPM](https://nodei.co/npm/iobroker.homepilot.png?downloads=true)

# IoBroker.homepilot
适配器需要 Homepilot 基站固件版本低于 v5.0（2019 年 9 月之前）。<br> _可以使用 [ioBroker.homepilot20](https://github.com/homecineplexx/ioBroker.homepilot20)_ 管理较新或更新的站点
需要 NodeJS 10 或更高版本

:de: [文献](/docs/de/doc_homepilot_de.md)

:uk: [文档](/docs/en/doc_homepilot_en.md)

:ru: [Документация](/docs/en/doc_homepilot_en.md)

:portugal: [Documentação](/docs/en/doc_homepilot_en.md)

:netherlands: [文件](/docs/en/doc_homepilot_en.md)

:fr: [文档](/docs/en/doc_homepilot_en.md)

:it: [文档](/docs/en/doc_homepilot_en.md)

:es: [文件](/docs/en/doc_homepilot_en.md)

:poland: [Dokumentacja](/docs/en/doc_homepilot_en.md)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.0 (2026-05-14)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mcm1957) Dependencies have been updated

### 1.2.3 (2024-04-19)
- (mcm1957) NPM related problems have been fixed.

### 1.2.2 (2024-04-18)
- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated

### 1.1.7 (2021-08-25)
* (pix) DeviceId should be string [#27](https://github.com/iobroker-community-adapters/ioBroker.homepilot/issues/27)

### 1.1.6 (2021-05-05)
* (pix) connectionType and dataSource added
* (pix) Travis updated
* (pix) minor fixes (logo size, update news)

[Older changelogs can be found there](CHANGELOG_OLD.md)## Roadmap
* 1.4.0 get a list of all installed duofern products in your network within the settings window
* 1.5.0 rearrange object tree to "homepilot.0.device.channel.state"
* 2.0.0 get live data from Homepilot station (zwave)
Contributions are welcome!

## License

The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2016-2022 pix

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