---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.epson_ecotank_et_2750/README.md
title: ioBroker.epson_ecotank_et_2750
hash: DJUocHZJ6dK/9ez/ELJZEYxWdAE6Ooed4DI/EEFo72A=
---
![标识](../../../en/adapterref/iobroker.epson_ecotank_et_2750/admin/epson_ecotank_et_2750.png)

![安装数量](https://iobroker.live/badges/epson_ecotank_et_2750-stable.svg?dummy=unused)
![NPM 版本](https://img.shields.io/npm/v/iobroker.epson_ecotank_et_2750.svg?dummy=unused)
![下载](https://img.shields.io/npm/dm/iobroker.epson_ecotank_et_2750.svg?dummy=unused)
![新平台](https://nodei.co/npm/iobroker.epson_ecotank_et_2750.png?downloads=true)

# IoBroker.epson_ecotank_et_2750
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/epson_ecotank_et_2750/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## 适用于 ioBroker 的 EPSON EcoTank ET-2750 适配器
该适配器从[EPSON EcoTank ET-2750](https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-2750)读取油箱液位和其他信息并存储在ioBroker中。

[EPSON EcoTank ET-4750](https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-4750) 也受支持（由 [Homoran] 测试](https://forum.iobroker.net/user/homoran)) [EPSON EcoTank ET-3750](https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-3750) 也受支持（由 [christofkac](https://github.com/christofkac)) [EPSON EcoTank ET-2721](https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-2721) 也受支持（由 [mikepiko](https://github.com/mikepiko)) [EPSON WORKFORCE WF-3620DWF](https://www.epson.de/products/printers/inkjet-printers/for-home/workforce-wf-3620dwf) 也受支持（由 [HReimann](https://github.com/HReimann))

## 致谢
如果没有@o0Shojo0o (https://github.com/o0Shojo0o) 的出色工作，这个适配器就不可能实现，他开发了此适配器的早期版本。

## 如何报告问题和功能请求
理想情况下，请使用 GitHub 问题来实现这一点，最佳方法是将适配器设置为调试日志模式（实例 -> 专家模式 -> 列日志级别）。然后通过“log”ioBroker 子目录从磁盘检索日志文件，**不是**从 Admin 检索，这样会切断线路。

＃＃ 配置
1. 创建适配器的新实例
2.填写 EPSON EcoTank ET-2750 的 URL/IP 和端口
3. 配置同步时间（默认10分钟）
4.保存设置

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.1 (2024-10-26)
- (simatec) Admin-UI has been adapted for small displays.
- (mcm1957) Dependencies have been updated.

### 1.0.0 (2024-10-19)
- (mcm1957) Adapter has been moved to iobroker-community-adapter organisation.
- (mcm1957) Adapter requires js-controller 5, admin 6 and node.js 20 now.
- (mcm1957) Dependencies have been updated.

### 0.0.12 (2022-06-09)

-   (o0Shojo0o) fix ETIMEDOUT error

### 0.0.11 (2021-08-24)

-   (o0Shojo0o) fix name for Workforce 3620
-   (o0Shojo0o) fix firmware for Workforce 3620

### 0.0.10 (2021-08-19)

-   (o0Shojo0o) fix translation

## License

The MIT License (MIT)

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 Dennis Rathjen <dennis.rathjen@outlook.de>

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

---

_Dank an die Erfinder des Basisskripts zum Parsen der Daten, Idittmar und MistyReblaus aus dem [Homematic-Forum](http://homematic-forum.de/forum/viewtopic.php?f=31&t=25140)._ :+1:

\*Dank an pix und rr0v1 für die Vorlage