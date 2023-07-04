---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.easee/README.md
title: ioBroker.easee
hash: Nhtw//Pj0JtYaC4vkoXniAzHmPhI26dZny0RA6ZuJJ4=
---
![标识](../../../en/adapterref/iobroker.easee/admin/easee.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.easee.svg)
![下载](https://img.shields.io/npm/dm/iobroker.easee.svg)
![安装数量（最新）](http://iobroker.live/badges/easee-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/easee-stable.svg)
![依赖状态](https://img.shields.io/david/Newan/iobroker.easee.svg)
![已知漏洞](https://snyk.io/test/github/Newan/ioBroker.easee/badge.svg)
![国家公共管理](https://nodei.co/npm/iobroker.easee.png?downloads=true)

# IoBroker.easee
**测试：** ![测试与发布](https://github.com/Newan/ioBroker.easee/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 easye 适配器
连接 Easee Wallbox 的适配器

＃＃ 帮助
ChargerOpMode = 离线：0、已断开连接：1、正在等待开始：2、正在充电：3、已完成：4、错误：5、ReadyToCharge：6

DynamicCircuitCurrentPX -> 所有相位必须在 500ms 内设置（脚本），否则相位将设置为 0。

## 捐赠
[![](https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=L55UBQJKJEUJL)

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.0.8 (2023-07-02)
* (Newan)  small fixes

### 1.0.7
* (Newan) Changed login URL

### 1.0.6
* (Newan) Changed that smart charging is editable

### 1.0.5
* (marwin79) More Features supported and convert values to expected datatypes

### 1.0.4
* (Newan) dynamicCircuitCurrentPX writeable (set all Phases in 500ms) to limit ampere

### 1.0.3
* (Newan) Adapter crash fixed an other bugfixes

### 1.0.1
* (Newan) Add circuitMaxCurrentPX to limit current ampere

### 1.0.0
* (Newan) Stable Version with SignalR

## License
MIT License

Copyright (c) 2021 Newan <iobroker@newan.de>

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