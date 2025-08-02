---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lifx/README.md
title: ioBroker.lifx
hash: B5jRjVJrj3E1HA6OmRZ+zA1I+dPzjI2vAeSGLDjtbM4=
---
![标识](../../../en/adapterref/iobroker.lifx/admin/lifx_logo.png)

![安装数量](http://iobroker.live/badges/lifx-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.lifx.svg)
![下载](https://img.shields.io/npm/dm/iobroker.lifx.svg)

# IoBroker.lifx
**测试：**![测试与发布](https://github.com/foxthefox/ioBroker.lifx/workflows/Test%20and%20Release/badge.svg)

ioBroker 的 Lifx 适配器

## 设置/配置：
- 无需设置或配置，适配器自动检测灯

### Metro 小部件无法访问状态
- metro-widget 中无法访问状态的小图标是第一个通知对象
- object_id[0] 是 indicator.unreachable
- 不应预设“true”，而应写入“false”
- 图标应为 wifiColorRed.png
- 水平偏移 6 应该可以正常工作

可视化：
- 使用 lifx 小部件

对象
|对象|值|可设置|描述|
|--------|-------|:-:|--------|
|Bulb.state|boolean|x|true/false -> 开/关|
|Bulb.colormode|布尔值|x|颜色，白色|
|灯泡温度|值|x|色温 2500...9000 K|
|灯泡.色调|值|x|颜色 0...360|
|Bulb.sat|值|x|饱和度 0...100 %|
|Bulb.bright|值|x|亮度 0...100%|
|Bulb.online|布尔值|-|真/假|
|Bulb.label|值|-|名称/标签|
|Bulb.vendor|值|-|供应商信息|
|Bulb.product|值|-|产品信息|
|Bulb.colorLamp|值|-|colorLamp 信息|
|Bulb.infraredLamp|值|-|infraredLamp 信息|
|Bulb.multizoneLamp|值|-|multizoneLamp 信息|
|Bulb.Zone.temp|值|x|色温 2500...9000 K|
|灯泡.区域.色调|值|x|颜色 0...360|
|Bulb.Zone.sat|值|x|饱和度 0...100 %|
|Bulb.Zone.bright|值|x|亮度 0...100%|

待办事项：
- 使用所有现有设置调整颜色值（亮度调整已固定 80% 饱和度并保持之前的色调设置；饱和度调整和色调调整已固定 80% 亮度）
- 过渡时期
- 波形

## 已知问题
- 超出范围的值导致适配器崩溃

## Changelog

### 1.0.7
* (Jarves020) Reactivated Cyclic Updates (brackets were missing at function call)
* (Jarves020) reenabled Settings for lifx Cyclic Update Intervall
* (Jarves020) Changed LogLevel for "Failed Cyclic Update...." from error to debug to avoid log spamming
* (foxthefox) IOB checker corrections

### 1.0.6
* eslint upgrade and corrections

### 1.0.5
* update devDeps
* IOB checker corrections

### 1.0.4
* implementation jsonUI

### 1.0.3
* translation with adapter-dev

### 1.0.2
* some changes to loglevel
* fix crash when no label is provided

### 1.0.1
* bugfix, context of 'this' in timeout
* Null exception with B/W bulb issue#23

### 1.0.0
* refactoring, change to class based structure of the adapter
* gitub actions instead travis

### 0.2.1
- (Jarvis020) errorhandling improvements
- (Jarvis020) fade time

### 0.2.0
- lifx-lan-client library instead node-lifx
- states for vendor, product, version, product features
- multizone support
- cyclic polling

### 0.1.1
- logo quadratic

### 0.1.0
- compact mode

### 0.0.5
- adminv3
- noConfig -> no admin page anymore

### 0.0.4
- jqui widget with interactive colored slider

### 0.0.3
- metro widget
- jqui widget

### 0.0.2 
- change to node-lifx
- successful tested with 2 lamps and firmware 2.1

### 0.0.1 
- initial setup with lifx

## License

The MIT License (MIT)

Copyright (c) 2016-2024 foxthefox <foxthefox@wysiwis.net>
Copyright (c) 2024 foxthefox <foxthefox@wysiwis.net>