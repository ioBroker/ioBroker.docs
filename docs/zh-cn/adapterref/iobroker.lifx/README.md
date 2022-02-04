---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lifx/README.md
title: ioBroker.lifx
hash: kcATNN9SeK/K8naEsyUEXDNkSAzbBW+v9YSuK+9Bwos=
---
![标识](../../../en/adapterref/iobroker.lifx/admin/lifx_logo.png)

![安装数量](http://iobroker.live/badges/lifx-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.lifx.svg)
![下载](https://img.shields.io/npm/dm/iobroker.lifx.svg)

# IoBroker.lifx
**测试：** ![测试和发布](https://github.com/foxthefox/ioBroker.lifx/workflows/Test%20and%20Release/badge.svg)

用于 ioBroker 的 Lifx 适配器

＃＃ 安装：
正式发布版本

```javascript
npm install iobroker.lifx
```

来自github的实际版本：

```javascript
npm install https://github.com/foxthefox/ioBroker.lifx/tarball/master --production
```

## 设置/配置：
- 无需设置或配置，适配器自动检测灯

### Metro 小部件无法访问状态
- Metro-widget 中无法访问状态的小图标是通知的第一个对象
- object_id[0] 是指标。无法到达
- 代替预设“真”，应写“假”
- 图标应该是 wifiColorRed.png
- 6的水平偏移应该可以正常工作

## 可视化：
- 使用 lifx 小部件

## 对象
|对象|值|可设置|描述|
|--------|-------|:-:|--------|
|Bulb.state|boolean|x|true/false -> ON/OFF|
|Bulb.colormode|boolean|x|颜色，白色|
|灯泡温度|值|x|色温 2500...9000 K|
|灯泡色相|值|x|颜色 0...360|
|Bulb.sat|值|x|饱和度 0...100 %|
|灯泡亮度|值|x|亮度 0...100 %|
|Bulb.online|布尔值|-|真/假|
|灯泡标签|值|-|名称/标签|
|灯泡供应商|价值|-|供应商信息|
|灯泡产品|价值|-|产品信息|
|灯泡.colorLamp|值|-|colorLamp 信息|
|灯泡.infraredLamp|值|-|infraredLamp 信息|
|Bulb.multizoneLamp|值|-|multizoneLamp 信息|
|Bulb.Zone.temp|值|x|色温 2500...9000 K|
|Bulb.Zone.hue|值|x|颜色 0...360|
|Bulb.Zone.sat|值|x|饱和度 0...100 %|
|Bulb.Zone.bright|值|x|亮度 0...100 %|

＃＃ 去做：
- 使用所有现有设置调整颜色值（亮度调整已固定 80% 饱和度并保持先前的色调设置；饱和度调整和色调调整已固定 80% 亮度）
- 过渡时间
- 波形

＃＃ 已知的问题
- 超出范围的值导致适配器崩溃

## Changelog
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

Copyright (c) 2016-2022 foxthefox <foxthefox@wysiwis.net>