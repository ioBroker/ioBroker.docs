---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.solarprognose/README.md
title: ioBroker.solarprognose
hash: Bla4RJ3Vg7Abe8uetywrFudc9uZUayziG6adyshNajQ=
---
![标识](../../../en/adapterref/iobroker.solarprognose/admin/solarprognose.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.solarprognose.svg)
![下载](https://img.shields.io/npm/dm/iobroker.solarprognose.svg)
![安装数量](https://iobroker.live/badges/solarprognose-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/solarprognose-stable.svg)
![NPM](https://nodei.co/npm/iobroker.solarprognose.png?downloads=true)

# IoBroker.solarprognose
**测试：** ![测试与发布](https://github.com/Scrounger/ioBroker.solarprognose/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 Solarprognose 适配器
基于 [solarprognose.de](https://www.solarprognose.de/) 的 API 的太阳能预测

## API 配置
1. 在“设置”->“API 概览”下创建访问令牌

2. 在“设置”->“用户个人资料”中，必须选择所有时区“UTC（UTC-00:00）”。

   ![图片](../../../en/adapterref/iobroker.solarprognose/doc/api_timezone.png)

3. 在“设置”->“用户设置”中，必须启用“在 API 中使用用户时区”选项。

   ![图片](../../../en/adapterref/iobroker.solarprognose/doc/api_use_timezone.png)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.0 (2025-10-23)

- (Scrounger) !!! breaking changes - states structure has been completely revised !!!
- (Scrounger) dependencies updated
- (Scrounger) node minimum set to 20
- (Scrounger) converted to esm
- (Scrounger) eslint 9 added

### 1.2.2 (2025-02-08)

- (Scrounger) bug fixes

### 1.2.1 (2024-10-18)

- (Scrounger) bug fixes

### 1.2.0 (2024-10-17)

- (Scrounger) calc accuracy on state changed
- (Scrounger) update energy now and energy from now every hour
- (Scrounger) optional interpolate daily energy values (energy now and energy from now)

### 1.1.0 (2024-10-15)

- (Scrounger) accuracy calculation added
- (Scrounger) energy now added
- (Scrounger) energy from now added
- (Scrounger) bug fixes

### 1.0.0 (2024-10-08)

- (Scrounger) initial release

## License

MIT License

Copyright (c) 2025 Scrounger <scrounger@gmx.net>

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