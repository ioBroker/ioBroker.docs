---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.airquality/README.md
title: ioBroker.airquality
hash: jikrEMuqCpJ/5qloEaSpyaN0sv//2SOzIVI//ESvCo0=
---
![标识](../../../en/adapterref/iobroker.airquality/admin/airquality.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.airquality.svg)
![下载](https://img.shields.io/npm/dm/iobroker.airquality.svg)
![安装数量](https://iobroker.live/badges/airquality-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/airquality-stable.svg)
![新平台](https://nodei.co/npm/iobroker.airquality.png?downloads=true)

# IoBroker.airquality
**测试：**![测试与发布](https://github.com/raschy/ioBroker.airquality/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的空气质量适配器
从德国 UBA 获取数据

＃＃＃ 入门
在此适配器中，必须在配置中输入至少一个环境站，从中收集测量值。可以使用显示的地图在联邦环境局网站 https://www.umweltbundesamt.de/themen/luft/luftqualitaet#luftdaten 上选择站点名称（然后单击“最近的站点”）。
站点始终以“DE”开头，后跟联邦州“BW”和三位数序列号。然后必须在适配器的配置页面中输入此标识符，例如“DEBW052”（按 Enter 确认）。还可以在此处添加其他站点。

如果在 ioBroker 的主配置中维护坐标，则适配器在首次启动时会尝试自行寻找最近的站点。

＃＃ 暗示
偶尔会发生无法检索测量值的情况。这种情况通常发生在整点，因为数据可能在内部进行了压缩和处理。但即使在晚上（午夜左右），也经常无法检索数据。然后会写入日志条目“未收到数据”作为警告。这不是适配器的缺陷，而是与系统相关的。

### 免责声明
在使用公司名称或徽标时，请务必考虑版权和商标，并在 README 中添加免责声明。
您可以查看其他适配器以获取示例或在开发者社区中提问。未经许可使用公司名称或徽标可能会给您带来法律问题。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

- (raschy) Supplementary data points i18n
- (raschy) Data point type corrected 
- (raschy) @iobroker/adapter-core 3.2.3 is recommended 

### 0.1.4 (2024-12-16)

- (raschy) Instructions for use in GUI added

### 0.1.3 (2024-12-12)

- (raschy) inclusive deploy

### 0.1.2 (2024-12-12)

- (raschy) Ready for latest and tests

### 0.1.1 (2024-12-11)

- (raschy) Migration to ESLint 9 and @iobroker/eslint-config

### 0.1.0 (2024-12-03)

- (raschy) CO data retrieval added
- (raschy) Conversion as scheduled adapter

### 0.0.4 (2024-10-31)

- (raschy) Readme text expanded
- (raschy) Issue 1 [E254] and [W040] corrected

### 0.0.3 (2024-10-28)

- (raschy) Auto detection for location activated

### 0.0.2 (2024-10-28)

- (raschy) initial release

## License

MIT License

Copyright (c) 2024-2025 raschy <raschy@gmx.de>

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
SOFTWARE.# ioBroker.airquality