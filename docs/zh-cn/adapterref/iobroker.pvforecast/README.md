---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.pvforecast?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.pvforecast?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.pvforecast?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.pvforecast?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/iobroker-community-adapters/iobroker.pvforecast?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.pvforecast/test-and-release.yml?branch=main&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.pvforecast.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/pvforecast-stable.svg
BADGE-Installed: http://iobroker.live/badges/pvforecast-installed.svg
chapters: {"pages":{"de/adapterref/iobroker.pvforecast/README.md":{"title":{"de":"ioBroker.pvforecast"},"content":"de/adapterref/iobroker.pvforecast/README.md"},"de/adapterref/iobroker.pvforecast/vis.md":{"title":{"de":"ioBroker.pvforecast - VIS"},"content":"de/adapterref/iobroker.pvforecast/vis.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.pvforecast/README.md
title: ioBroker.pvforecast
hash: EgyBBS1zyr5QAu9ZAleVQaCYPNzWLRNI2WG+IcTiDbw=
---
![标识](../../../de/admin/pvforecast.png)

# IoBroker.pvforecast
此适配器替换了 [io经纪商论坛](https://forum.iobroker.net/topic/26068/forecast-solar-mit-dem-systeminfo-adapter) 中的 JavaScript

适配器从 https://api.forecast.solar 获取基本数据，数据如下：

＃＃ 设置
1. 经度（-180（西）…180（东））
2. 纬度-90（南）…90（北）
3. 页面链接
4.API密钥
5、Y轴平台图
6. 数据查询计划（分钟）- 计划每 x 分钟从服务器检索数据。

![光伏预测选项](https://user-images.githubusercontent.com/76852173/155196476-8c8210d9-bdb2-456b-a0aa-1dd411efea5e.JPG)

还可以通过 API 密钥获取天气信息。

1. datetime——日期和时间
2. 天空 - 0 到 1 之间的值，表示晴空的百分比 [1 = 晴空]。
3. 温度[°C]
4. 条件-文本
5.图标-文字+数字
6.风速-[公里/小时]
7. 风角 - 北 0°[顺时针]。 （如果风速为零，则该值没有定义）
8. 风向 - 简称
9.更高的时间分辨率

## 以下设置可供系统使用
1. 倾斜（0°-90°）
2. 方位角（-180 = 北，-90 = 东，0 = 南，90 = 西，180 = 北）
3、系统输出功率（kWh）
4. 植物名称
5. 图表图例名称
9. 图表颜色
10.图表标签颜色

![光伏预测 光伏系统](https://user-images.githubusercontent.com/76852173/155196535-6828775a-8234-4a6a-b2a3-03d7fd88c80d.JPG)

需要所有这些信息来确保适配器正常运行。

如果经度和纬度已存储在系统中，系统会自动将数据输入到字段中。

## 可见光示例
在加载示例之前，请安装：[材质设计](https://github.com/Scrounger/ioBroker.vis-materialdesign)。
如果您想在 ioBroker Vis 中使用 Json 图表和表格，您可以在此处找到 [例子](./vis.md)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.9.0 (2023-10-28)
* (klein0r) Updated conversion for Solcast
* (klein0r) Store JSON state values in prettified format

### 2.8.2 (2023-10-28)
* (klein0r) Added icons in admin tabs

### 2.8.1 (2023-09-16)
* (klein0r) Fixed graph limits in summary
* (klein0r) Added options for summary graph and label color

### 2.8.0 (2023-09-16)
* (klein0r) Graphs are limited to maximum power (max)
* (klein0r) Installed power is Wp or kWp (as configured)

### 2.7.1 (2023-05-10)
* (klein0r) Summary channel should not be deleted

## License
MIT License

Copyright (c) 2021-2023 Patrick-Walther
                        Matthias Kleine <info@haus-automatisierung.com>

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