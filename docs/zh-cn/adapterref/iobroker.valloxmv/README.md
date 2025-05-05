---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.valloxmv/README.md
title: ioBroker.valloxmv
hash: mrrcsVMaW9Hg/SlgVrYE+iSU8HcW8Jz3Zt/rgqC3x3c=
---
![标识](../../../en/adapterref/iobroker.valloxmv/admin/valloxmv.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.valloxmv.svg)
![下载](https://img.shields.io/npm/dm/iobroker.valloxmv.svg)
![安装数量](https://iobroker.live/badges/valloxmv-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/valloxmv-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.valloxmv.png?downloads=true)

# IoBroker.valloxmv
**测试：**![测试和发布](https://github.com/hacki11/ioBroker.valloxmv/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 ValloxMV 适配器
将您的 Vallox 空气通风系统连接到您的 ioBroker 家庭自动化。

＃＃ 用法
* 安装适配器
* 配置设备地址和轮询间隔（最小 60）
* 像平常一样读写状态

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.4.1 (2025-04-14)
* Maintenance Release
* Add support for NodeJS 18 as long as iobroker supports
* Add devcontainer for development
* Add release script

### 1.4.0
* Maintenance Release
* Bump engines to NodeJS 20 as minimum version

### 1.3.0
* Maintenance Release
* Updated dependencies (iobroker-core & node)
* Change UI to jsconConfig and fixing issues detected by repository checker
* Update translation using i18n by iobroker/adapter-dev
* Update year in license and readme

### 1.2.0
* Remove NodeJS 10.x support
* Upgrade to js-controller 3.3 and Admin 5

### 1.1.3
* Fixed wrong datatype (number instead of boolean) in profile entries *_ENABLED [#33](https://github.com/hacki11/ioBroker.valloxmv/issues/33).
* Fixed setting connection info without ack value.

### 1.1.2
* Fixed wrong datatype (string) in temperature states instead of numbers

### 1.1.1
* Fix adapter-checker issues

### 1.1.0
* A_CYC_BYPASS_LOCKED added
* A_CYC_SUPP_FAN_BALANCE_BASE added
* A_CYC_EXTR_FAN_BALANCE_BASE added
* A_CYC_IP_ADDRESS added
* A_CYC_CELL_STATE changed to read only

### 1.0.3
* Fix adapter-checker issues

### 1.0.2
* Added subscriptions of own objects to allow write values

### 1.0.1 
* Fixed resetting custom configuration of objects
* Removed subscription of own objects

### 1.0.0
* Fixed empty states
* Canged bool states to switches

### 0.1.3
* added expert settings (@williandalton, @hliebscher)
  * A_CYC_RH_BASIC_LEVEL
  * A_CYC_CO2_THRESHOLD
  * A_CYC_RH_LEVEL_MODE
  * A_CYC_SUPPLY_HEATING_ADJUST_MODE
  * A_CYC_OPT_TEMP_SENSOR_MODE

### 0.1.2
* add State 'NORMAL' to A_CYC_MODE (@williandalton)

### 0.1.1
* fix io-package.json version number

### 0.1.0
* added profile switch and editing

### 0.0.1
* (hacki11) initial release

## License
MIT License

Copyright (c) 2025 hacki11