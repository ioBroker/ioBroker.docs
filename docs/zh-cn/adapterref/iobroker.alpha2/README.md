---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.alpha2/README.md
title: ioBroker.alpha2
hash: EQcdPK8Xi7xiAGe4tLPcIjwUhP3XNmtD4AgfK8zLFSU=
---
![标识](../../../en/adapterref/iobroker.alpha2/admin/mh-logo-schrift.png)

![安装数量](http://iobroker.live/badges/alpha2-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.alpha2.svg)
![下载](https://img.shields.io/npm/dm/iobroker.alpha2.svg)
![特拉维斯CI](https://travis-ci.org/Eisbaeeer/ioBroker.alpha2.svg?branch=master)
![新产品管理](https://nodei.co/npm/iobroker.alpha2.png?downloads=true)

# IoBroker.alpha2
该适配器允许您获取和设置 Moehlenhoff Alpha2 加热控制器的值。
适配器使用 Alpha2 的 XML-API。如果您使用多个 Alpha2 控制器，则必须安装第二个适配器实例。

＃＃ 安装
- 安装适配器
- 填写您的 Alpha2 控制器的 IP 地址或主机名
- 填写轮询间隔以获取状态

＃＃ 用法
您可以更改以下对象：

- 每个 HEATAREA（最多 8 个区域）

|说明 |对象 |价值观 |
|---------------------|-----------------|---------------------------|
|目标温度 | T_TARGET |温度。摄氏度 |
|目标温度日 | T_HEAT_DAY |温度。摄氏度 |
|目标温度晚上| T_HEAT_NIGHT |温度。摄氏度 |
|热区模式 | HEATAREA_MODE | 0=自动，1=白天，2=夜间 |
|节目平日| PROGRAM_WEEK |程序编号0-3 |
|节目周末 | PROGRAM_WEEKEND |程序编号0-3 |

- 对于每个最大的程序。每个程序 4 个班次。
- 分钟步长为 15。只允许 00,15,30,45
- 24 小时风格

|说明 |对象 |价值观 |
|---------------------|-----------------|-------------------------------|
|开始时间 |开始 |程序开始时间 [hh:mm] |
|结束时间 |完 |程序结束时间 [hh:mm] |

- 度假

|说明 |对象 |价值观 |
|-----------------------|---------------------|--------------------------|
|假期开始 |假期。START_DATE | [YYYY-MM-DD] |
|假期结束 |假期。END_DATE | [YYYY-MM-DD] |
|温度。在假期| T_HEAT_VACATION |温度。摄氏度 |

- 所有其他对象都是只读的

＃＃ 例子
###设置房间1的温度
要设置目标温度（仅对下一个程序开始或结束有效），请在相应的 Heatarea 中设置对象 T_TARGET。
适配器将使用 XML-API 来设置 heatarea 中的值。

###设置假期
要设置假期，请注意使用对象 T_HEAT_VACATION 定义假期目标 temp。您将在 DEVICE 中找到该对象。
之后，将这两个对象设置为 VACATION.START_DATE 和 VACATION.END_DATE。如果您将停用假期设置，请使用今天之前的日期设置这两个对象。
您可以检查对象 VACATION.STATE 来检查状态。如果状态显示为 true，则假期处于活动状态。

## 已知限制
- 没有虚拟房间

## Changelog

### 1.0.3
. (Eisbaeeer)
Fixed error messages in log

### 1.0.2
- (oHa510)
Fixed an issue if you don't use all 4/8/12 heataras then heatareas could get assigned to wrong heatarea object in iobroker
Expanded Heatareas and Heatctrl to the maxiumum of 12
Changed Heatarea and Heatctrl indexing to 1-12 (old 0-11 was very confusing)
Added support for locking controllers (kids mode)
Added support for locking set temperature (hotel mode)
Added some new objects and infos like IODEVICEs etc.

### 1.0.1
- (Eisbaeeer)
Fixed issues

### 1.0.0
- (Eisbaeeer)
Fixed issue #6 (HEATAREA_NAME)

### 0.0.4
- (Eisbaeeer)   
Added refresh of states after setting states

### 0.0.3
- (Eisbaeeer)   
fixed issues #2

### 0.0.2
- (Eisbaeeer)   
fixed issues #1

### 0.0.1
- (Eisbaeeer) inital version of Alpha2

## License
The MIT License (MIT)
Copyright (c) 2021 Eisbaeeer eisbaeeer@gmail.com