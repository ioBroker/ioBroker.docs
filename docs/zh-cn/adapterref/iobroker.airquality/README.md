---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.airquality/README.md
title: ioBroker.airquality
hash: VESbSZ3qZ3zRFZAZWez5WMXmfqrmNJI2S98y6dEosT8=
---
![标识](../../../en/adapterref/iobroker.airquality/admin/airquality.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.airquality.svg)
![下载](https://img.shields.io/npm/dm/iobroker.airquality.svg)
![安装数量](https://iobroker.live/badges/airquality-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/airquality-stable.svg)
![NPM](https://nodei.co/npm/iobroker.airquality.png?downloads=true)

# IoBroker.airquality
**测试：** ![测试与发布](https://github.com/raschy/ioBroker.airquality/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的空气质量适配器
从德国联邦银行获取数据

＃＃＃ 入门
在此适配器中，必须至少输入一个用于收集测量值的环境监测站。监测站名称可在德国联邦环境署网站 https://www.umweltbundesamt.de/themen/luft/luftqualitaet#luftdaten 上选择（点击“最近的监测站”），并使用显示的地图进行查找。

监测站名称始终以“DE”开头，后跟联邦州“BW”和一个三位数的序列号。此标识符（例如“DEBW052”）必须输入到适配器的配置页面中（按 Enter 键确认）。您也可以在此处添加其他监测站。

空气质量数据 API 目前版本为 4 (v4)。之前的版本 (v3) 将继续并行运行一段时间。两个版本的主要区别在于，空气质量指数 (AQI) 的数据更新频率从传统的每小时更新改为更精确的每小时更新，并且指数类别也进行了新的分类。

如果 ioBroker 的主配置中保存了坐标，则适配器在首次启动时会尝试自行查找最近的站点。

＃＃ 暗示
偶尔会出现无法获取测量值的情况。这种情况通常发生在整点，因为此时数据可能已被压缩并在内部处理。但即使在夜间（大约午夜），也常常无法获取数据。此时，系统会记录一条“未收到数据”的警告日志。这并非适配器缺陷，而是系统相关问题。

### 免责声明
使用公司名称或徽标时，请务必考虑版权和商标问题，并在您的 README 文件中添加免责声明。

您可以查看其他适配器的示例，或在开发者社区中寻求帮助。未经许可使用公司名称或徽标可能会导致法律问题。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (raschy) change to version 4
- (raschy) some dependency updates

### 0.1.7 (2025-08-22)

- (raschy) Station names visible again

### 0.1.6 (2025-08-22)

- (raschy) Removal of an unused state
- (raschy) improved error messages
- (raschy) improved retrieval logic

### 0.1.5 (2025-05-03)

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

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026 raschy <raschy@gmx.de>

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