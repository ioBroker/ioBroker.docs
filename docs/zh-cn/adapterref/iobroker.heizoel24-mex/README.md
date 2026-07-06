---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.heizoel24-mex/README.md
title: ioBroker.heizoel24-mex
hash: m9tlHglZw1zXdc24DjansbtlpKjHplLaw4XBW6nga4o=
---
![标识](../../../en/adapterref/iobroker.heizoel24-mex/admin/heizoel24-mex.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.heizoel24-mex.svg)
![下载](https://img.shields.io/npm/dm/iobroker.heizoel24-mex.svg)
![安装数量](https://iobroker.live/badges/heizoel24-mex-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/heizoel24-mex-stable.svg)
![NPM](https://nodei.co/npm/iobroker.heizoel24-mex.png?downloads=true)

# IoBroker.heizoel24-mex
**测试：** ![测试与发布](https://github.com/ltspicer/ioBroker.heizoel24-mex/workflows/Test%20and%20Release/badge.svg)

## Heizoel24-mex ioBroker 适配器
MEX 是一种燃油液位测量装置。该适配器从 Heizoel24 服务器读取 MEX 数据。

参见：https://www.heizoel24.de/mex

＃＃ 使用：
只需输入您的 Heizoel24 帐户的登录信息（电子邮件和密码）。<br> MEX 数据存储在数据点 heizoel24-mex 中。<br>适配器默认每3小时启动一次。这完全足够，因为MEX每天只发送一次数据。<br>数据点 CalculatedRemaining/JsonForEcharts（计算剩余量）和 OilUsage/JsonForEcharts 可以直接与 eCharts 一起使用。<br>该适配器可以通过 MQTT 发送数据。<br>原版应用程序始终以 12 月 31 日为年度使用量进行计算。<br>这不切实际，因为那时正值供暖季。<br>该适配器可以根据特定月份计算年度用量。<br>

## Changelog
### 1.9.2 (2026-05-26)

- Fix: Prevent crash on network errors by safely handling axios exceptions…
- Issues E0036 & E5050 resolved

### 1.9.1 (2026-05-22)

- Fix: Prevent crash on network errors by safely handling axios exceptions & Remove unused main1.js backup file

### 1.9.0 (2026-05-03)
- (copilot) Adapter requires node.js >= 22 now

### 1.8.1 (2026-04-06)

- "Reference month for annual consumption (1–12)" edited

### 1.8.0 (2026-04-05)

- Yearly Oil usage by reference month added