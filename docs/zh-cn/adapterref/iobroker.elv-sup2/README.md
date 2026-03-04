---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.elv-sup2/README.md
title: ioBroker.elv-sup2
hash: D1tL/XdUlmLnXmWIUr1eJW1S1CvM+IyKPgH5LT/yYBA=
---
![标识](../../../en/adapterref/iobroker.elv-sup2/admin/elv-sup2.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.elv-sup2.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/elv-sup2-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.elv-sup2.svg)
![安装数量](https://iobroker.live/badges/elv-sup2-installed.svg)
![NPM](https://nodei.co/npm/iobroker.elv-sup2.png?data=d,s)

# IoBroker.elv-sup2
![测试与发布](https://github.com/pdbjjens/ioBroker.elv-sup2/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 elv-sup2 适配器
此适配器通过 USB 串口将 ELV HQ-Stereo-FM-Testgenerator SUP2 连接到 ioBroker。它允许检索和设置测试生成器的某些配置参数，包括 RDS 文本、RDS 程序名称和类型。不支持 SUP2 更新。请使用 ELV 提供的 Windows 程序进行更新。

＃＃ 配置
唯一的配置参数是 SUP2 所连接的串口的串口 ID。

格式例如：在 Linux 系统上为 /dev/ttyUSBx，在 Windows 系统上的 ioBroker 安装中为 COMx。

法律声明
ELV 及其他商标均为 ELV Elektronik AG（地址：D-26787 Leer, Germany）的商标或注册商标 - <https://de.elv.com/>

所有其他商标均为其各自所有者的财产。

作者与 ELV Elektronik AG 及其任何关联子公司、标识或商标均无任何关联或合作关系。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.3 (2026-03-04) - 2026H1 maintenance release

* (pdbjjens) **Changed**: node>=20, js-controller>=7.0.7 and admin>=7.7.22 required
* (pdbjjens) **Fixed**: update release-script (#434)

### 0.2.2 (2025-12-15)

* (pdbjjens) **Fixed:** state roles corrected

### 0.2.1 (2025-11-27)

* (pdbjjens) Change: Migrate To Trusted Publishing

### 0.2.0 (2025-08-29) - 2025H2 maintenance release

* (pdbjjens) Change: node>=20, js-controller>=7.0.7 and admin>=7.6.17 required
* (pdbjjens) Change: Updated to ESLint 9 and serialport 13
* (pdbjjens) Change: Cleanup devDependencies

### 0.1.1 (2024-11-24) - 2025H1 maintenance release

* (pdbjjens) New: Tested with node.js 22
* (pdbjjens) Fix: Responsive Design tweaks
* (pdbjjens) New: Updated dependencies

## License

MIT License

Copyright (c) 2026 pdbjjens <jjensen@t-online.de>

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