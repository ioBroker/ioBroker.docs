---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vedirect/README.md
title: ioBroker.vedirect
hash: n9plhu14clwCs8sUZnRii2xdub1okHCyBtDXQBPqK/E=
---
![标识](../../../en/adapterref/iobroker.vedirect/admin/vedirect.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.vedirect.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vedirect.svg)
![依赖状态](https://img.shields.io/david/DrozmotiX/iobroker.vedirect.svg)
![已知漏洞](https://snyk.io/test/github/DrozmotiX/ioBroker.vedirect/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vedirect.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/DrozmotiX/ioBroker.vedirect/master.svg)

# IoBroker.vedirect
## IoBroker 的 vedirect 适配器
通过 USB <-> 串行连接，从带有 vedirect 连接器的 Victron 设备读取 VE.direct 数据。

＃＃＃ 配置
在适配器配置中设置正确的设备（例如 /dev/ttyUSB0）。

## 哨兵
此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (DutchmanNL) Maintenance: raise Node.js to 22, modernise CI and release tooling, update dependencies, resolve repository checker findings
* (DutchmanNL) Admin configuration page uses responsive column classes (s/m/l) for mobile devices
* (DutchmanNL) Added prettier.config.mjs matching @iobroker/eslint-config and reformatted the sources accordingly

### 0.3.3 (2024-09-10)
* (DutchmanNL) Repository checker compliance updates
* (DutchmanNL) Update dependencies for Node.js 18+ compatibility

### 0.3.1 (2023-10-29)
* (DutchmanNL) Message buffer implemented to avoid system overload

### 0.3.0 (2023-08-07) - Support Protocol Version 3.33
* (DutchmanNL) Bugfixes
* ([Andiling](https://github.com/andiling)) Update to support Protocol Version 3.33

### 0.2.0 (2023-08-06) - Implement protocol Version 3.32
* (DutchmanNL) Code optimization
* ([Andiling](https://github.com/andiling)) Add new product names of Vedirect
* ([Andiling](https://github.com/andiling)) Add option to admin for state expiration
* (DutchmanNL) Update dependencies * testing for NodeJS 18/20

### 0.1.2 (2020-10-06)
* (DutchmanNL) Fix sentry issue, error in opening USB-Port

### 0.1.1
* (DutchmanNL) Set state to NULL if no data received within 2 seconds.

### 0.1.0
* ([Andiling](https://github.com/andiling)) error in device modes corrected

### 0.0.9
* ([Andiling](https://github.com/andiling)) improve state attributes

### 0.0.8
* (DutchmanNL) set connection state to false when no data received for 10 seconds
* (DutchmanNL & Andiling) reconnect to USB when connection lost
* (DutchmanNL & Andiling) Update state attributes

### 0.0.7
* (DutchmanNL & [Andiling](https://github.com/andiling)) Alpha release

## License
MIT License

Copyright (c) 2023 DutchmanNL <oss@drozmotix.eu>

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