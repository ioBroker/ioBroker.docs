---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.milight-smart-light/README.md
title: ioBroker.milight-smart-light
hash: oed1wpV8HlHSa4npvyOtPHQdOpAzYTYEUpNrhSZn27E=
---
![milight-smart-light 标志](../../../en/adapterref/iobroker.milight-smart-light/admin/milight-smart-light.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.milight-smart-light.svg)
![下载](https://img.shields.io/npm/dm/iobroker.milight-smart-light.svg)
![稳定的](http://iobroker.live/badges/milight-smart-light-stable.svg)
![已安装](http://iobroker.live/badges/milight-smart-light-installed.svg)
![已知漏洞](https://snyk.io/test/github/steiger04/ioBroker.milight-smart-light/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.milight-smart-light.png?downloads=true)

# IoBroker.milight-smart-light
![测试和发布](https://github.com/steiger04/ioBroker.milight-smart-light/workflows/Test%20and%20Release/badge.svg)

这个用于 ioBroker 的适配器控制 Milight LED 灯泡和 LED 灯条，并基于 mwittig 的节点模块。

mwittig / [节点-milight-promise](https://github.com/mwittig/node-milight-promise)

通过适配器，您可以同时使用：**v6 Bridge** 和 **Legacy Bridge**。

**v6 桥：**

- 桥（仅 iBox1）
- 白色的
- RGB（宽）
- 饱满的色彩
- fullColor8Zone

**传统桥：**

- 白色的
- RGB（宽）

**描述**

详细说明可以在 [这里](https://steiger04.github.io/milight-smart-light-doku/) 中找到。

### 版本
- **Node.js**：使用 v. 14.x 或更高版本
- **iobroker.admin**：使用 v. 5.1.25 或更高版本

## Changelog
### 1.2.2 (2021-10-17)
- (steiger04) Compatibility check and testing for Node.js 16 and some CSS adjustments
### 1.2.1 (2021-05-18)
- (steiger04) Compatibility with socketio v3.1.4 
### 1.2.0 (2021-01-16)
- (steiger04) compact mode added
### 1.0.5 (2021-01-10)
- (steiger04) Small bug fix
### 1.0.1 (2020-11-21)
- (steiger04) Added admin-UI based on Vue and Quasar
### 0.6.0 (2020-05-23)
- (steiger04): Added effectBrightness, effectOn, effectOff, effectOnOff for iBox1 and iBox2
### 0.5.0 (2020-05-21)
- (steiger04): Bug fix in rgb(w)

## License
The MIT License (MIT)

Copyright (c) 2017-2021 Steiger04 <steiger04@posteo.de>