---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sun2000-modbus/README.md
title: ioBroker.sun2000-modbus
hash: jHsNUNxgiIry6iHJJFkCUeIpzfSdFnkXT97f9CgLB78=
---
![标识](../../../en/adapterref/iobroker.sun2000-modbus/admin/sun2000-modbus.png)

![安装数量](https://iobroker.live/badges/sun2000-modbus-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/sun2000-modbus-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.sun2000-modbus.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sun2000-modbus.svg)
![国家公共管理](https://nodei.co/npm/iobroker.sun2000-modbus.png?downloads=true)

# IoBroker.sun2000-modbus
![测试与发布](https://github.com/daolis/ioBroker.sun2000-modbus/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/sun2000-modbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**\ 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!\ Sentry 报告从 js-controller 开始使用3.0。

## IoBroker 华为 SUN2000 逆变器适配器
使用Modbus TCP读取华为SUN2000逆变器和LUNA2000存储的数据。

华为产品页面：[华为太阳能网](https://solar.huawei.com/at/professionals/all-products)

＃＃ 设置
* `address`: 逆变器IP地址
* `port`：逆变器modbus端口（默认：502）
* `modbusUnitId`：Modbus 单元 ID（默认值：1）
* `updateIntervalHigh`: 快速更新间隔（默认：5秒）
* `updateIntervalLow`：较慢的更新间隔（默认值：20 秒）

## Changelog
### **WORK IN PROGRESS**

### 0.0.2 (2024-01-08)

* Added storage CurrentDayChargeCapacity and CurrentDayDischargeCapacity
* Changes from [Add sun2000-modbus to latest](https://github.com/ioBroker/ioBroker.repositories/pull/3038)

### 0.0.1 (2023-11-26)

* (daolis) initial release

## License
MIT License

Copyright (c) 2024 daolis <stephan.bechter@gmail.com>