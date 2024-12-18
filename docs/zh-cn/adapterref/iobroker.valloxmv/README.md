---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.valloxmv/README.md
title: 无标题
hash: 3D+3x+HEJph1NJ57fT3+09oimGIcDc6gwEzlgDEdlDI=
---
![NPM 版本](http://img.shields.io/npm/v/iobroker.valloxmv.svg)
![下载](https://img.shields.io/npm/dm/iobroker.valloxmv.svg)
![依赖状态](https://img.shields.io/david/hacki11/iobroker.valloxmv.svg)
![已知漏洞](https://snyk.io/test/github/hacki11/ioBroker.valloxmv/badge.svg)
![新平台](https://nodei.co/npm/iobroker.valloxmv.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/hacki11/ioBroker.valloxmv/master.svg)

<h1><img src="admin/valloxmv.png" width="64"/>ioBroker.valloxmv</h1>

## IoBroker 的 ValloxMV 适配器
将您的 Vallox 空气通风系统连接到您的 ioBroker 家庭自动化。

＃＃ 用法
* 安装适配器
* 配置设备地址和轮询间隔（最小60）
* 像平常一样读写状态

正在进行中
* 更新依赖项（iobroker-core 和 node）
* 将 UI 更改为 jsconConfig 并修复存储库检查器检测到的问题

### 1.2.0
* 删除 NodeJS 10.x 支持
* 升级到 js-controller 3.3 和 Admin 5

### 1.1.3
* 修复了配置文件条目中的错误数据类型（数字而不是布尔值）*_ENABLED [#33](https://github.com/hacki11/ioBroker.valloxmv/issues/33)。
* 修复了设置没有确认值的连接信息的问题。

### 1.1.2
* 修复了温度状态中错误的数据类型（字符串而不是数字）

### 1.1.1
* 修复适配器检查器问题

### 1.1.0
* 添加了 A_CYC_BYPASS_LOCKED
* 添加了 A_CYC_SUPP_FAN_BALANCE_BASE
* 添加了 A_CYC_EXTR_FAN_BALANCE_BASE
* 添加了 A_CYC_IP_ADDRESS
* A_CYC_CELL_STATE 更改为只读

### 1.0.3
* 修复适配器检查器问题

### 1.0.2
* 添加了自身对象的订阅以允许写入值

### 1.0.1
* 修复了重置对象的自定义配置
* 删除了自身对象的订阅

### 1.0.0
* 修复空状态
* 将布尔状态更改为开关

### 0.1.3
* 添加专家设置 (@williandalton, @hliebscher)
* A_CYC_RH_BASIC_LEVEL
* A_CYC_CO2_阈值
* 循环相对湿度水平模式
* 循环供给加热调节模式
* 循环选项温度传感器模式

### 0.1.2
* 将状态“NORMAL”添加到 A_CYC_MODE (@williandalton)

### 0.1.1
* 修复 io-package.json 版本号

### 0.1.0
* 增加个人资料切换和编辑功能

### 0.0.1
*（hacki11）初始版本

## Changelog

## License
MIT License

Copyright (c) 2022 hacki11