---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.opi/README.md
title: ioBroker.opi
hash: QqoAS/PadgUSoQ6qePLCst9ZR/TDQhwI4YF34Xz25TY=
---
![标识](../../../en/adapterref/iobroker.opi/admin/opi.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.opi.svg)
![下载](https://img.shields.io/npm/dm/iobroker.opi.svg)
![新产品管理](https://nodei.co/npm/iobroker.opi.png?downloads=true)

# IoBroker.opi
===================

用于集成到 ioBroker 的 OPI-Monitor 实现。

### 重要信息
测试硬件：OrangePi plus2 H3

###以下对象在选择后可用：
＃＃ *中央处理器*
- cpu_频率
- 加载 1
- 负载5
- 负载15

＃＃ *记忆*
- 内存可用
- memory_free
- memory_total

## *网络（eth0）*
- net_received
- 网络发送

## *eMMC*
- emmc_root_total
- emmc_root_used

＃＃ *交换*
- swap_total
- 交换使用

＃＃ *温度*
- soc_temp

## *正常运行时间*
- 正常运行时间

## *无线局域网*
- wifi_received
- wifi_send

＃＃＃ 配置
在配置页面，您可以选择以下模块：

- 中央处理器
- 记忆
- 网络
- eMMC
- 交换
- 温度
- 正常运行时间
- 无线局域网

## 0.1.2 (2021-11-06)
* (foxriver76) 我们不再使用废弃的adapter.objects

## 0.1.1 (2018-01-27)
- 更新 index_m.html。
- 更新 index.html。
- 更新代码。

## 0.1.0 (2018-01-24)
- Admin3 支持。

## 0.0.6 (2017-08-01)
- 稳定发布。

## 0.0.2 (2017-06-01)
- 初始发行。测试版。

## Changelog

## License
Modified for OrangePi by Johnny Schneider <johann.schneider1@googlemail.com>

Copyright (c) 2015-2016 husky-koglhof <husky.koglhof@icloud.com>

MIT License