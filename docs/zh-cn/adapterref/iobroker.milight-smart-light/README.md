---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.milight-smart-light/README.md
title: ioBroker.milight-smart-light
hash: 5pIHYWxLRBx9JzitGECa91GS6s7APvK2vcMJLXLqx1Y=
---
![milight-smart-light徽标](../../../en/adapterref/iobroker.milight-smart-light/admin/milight-smart-light.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.milight-smart-light.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.milight-smart-light.svg)
![稳定的](http://iobroker.live/badges/milight-smart-light-stable.svg)
![已安装](http://iobroker.live/badges/milight-smart-light-installed.svg)
![依赖状态](https://img.shields.io/david/steiger04/iobroker.milight-smart-light.svg)
![已知漏洞](https://snyk.io/test/github/steiger04/ioBroker.milight-smart-light/badge.svg)
![NPM](https://nodei.co/npm/iobroker.milight-smart-light.png?downloads=true)

＃ioBroker.milight-smart-light
![测试与发布](https://github.com/steiger04/ioBroker.milight-smart-light/workflows/Test%20and%20Release/badge.svg)

ioBroker的此适配器基于mwittig的节点模块控制Milight LED灯泡和LED灯带。

mwittig /[Node-milight-promise](https://github.com/mwittig/node-milight-promise)

使用适配器，您可以同时使用：** v6 Bridge **和** Legacy Bridge **。

** v6桥：**

-网桥（仅iBox1）
- 白色的
-rgb（w）
- 饱满的色彩
-fullColor8Zone

**旧桥：**

- 白色的
-rgb（w）

**描述**

可以在[这里](https://steiger04.github.io/milight-smart-light-doku/)中找到详细说明。

###版本
-** Node.js **：使用10.18.1版或更高版本
-** iobroker.admin **：使用3.5.10版或更高版本

## Changelog
### 1.2.1 (2020-05-18)
- (steiger04) Compatibility with socketio v3.1.4
### 1.2.0 (2020-01-16)
- (steiger04) compact mode added
### 1.0.5 (2020-01-10)
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