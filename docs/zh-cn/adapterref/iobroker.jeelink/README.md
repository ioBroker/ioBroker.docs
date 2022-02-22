---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.jeelink/README.md
title: ioBroker.jeelink
hash: rPSqnNM3m5uwBSJrk2WL56yYfLJq+MTgr07FhF649mY=
---
![标识](../../../en/adapterref/iobroker.jeelink/admin/jeelab_logo.png)

![安装数量](http://iobroker.live/badges/jeelink-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.jeelink.svg)
![下载](https://img.shields.io/npm/dm/iobroker.jeelink.svg)

# IoBroker.jeelink
**测试：** ![测试和发布](https://github.com/foxthefox/ioBroker.jeelink/workflows/Test%20and%20Release/badge.svg)

这是 ioBroker 通过 Jeelink 集成 RFM12B/RFM69 的适配器。
jeelink 可以与预装软件 (rfmdemo) 一起使用，以读取 openenergy 传感器 (emon)。
对于 LaCrosse 传感器的使用，必须更换固件（参见 iobroker 论坛）。

＃＃ 安装：
### 发布版本
```javascript
npm install iobroker.jeelink
```

在覆盆子上，它可能有助于使用：

```javascript
 npm install --unsafe-perm iobroker.jeelink
 ```

 因为串口包必须建立在不受支持的 arm-hw 上

### 来自 github 的实际开发版本（正在测试时，可能无法正常工作！）
```javascript
npm install https://github.com/foxthefox/ioBroker.jeelink/tarball/master --production
```

或者

```javascript
npm install --unsafe-perm https://github.com/foxthefox/ioBroker.jeelink/tarball/master --production
```

## 设置：
- JeelinkAdapter 的 USB 端口通常是 /dev/ttyACME
- 串行速度通常为 57600 波特

＃＃ 配置：
在管理员中完成

* USB端口的定义
* 设置波特率
- 定义在空中接收的传感器地址
- 在适配器内定义唯一的传感器地址（君越在更换电池后更改on-air地址，因此在更换电池后观察日志并调整传感器地址）
- 定义传感器的类型（见下面的例子）
- 定义房间

## 传感器
|对象|设备变体|电报示例|描述|
|--------|-------|:-:|--------|
|emonTH|emonTH|OK 19 ...|来自 openenergy.org 的传感器|
|emonWater|emonWater|OK 21 ... |带有 RFM12B 用于水计量的传感器|
|LaCrosseDTH |TX|OK 9 ... |来自 LaCrosse, technoline 的传感器|
|LaCrosseDTT |TX|OK 9 ... |来自 LaCrosse 的传感器，technoline double temp|
|HMS100TF |TXH29DTH-IT|H00 ... |传感器技术|
|LaCrosseBMP180||OK WS ... |传感器模块，superjee|
|君越WS|WS1080,TX22,WS1600|OK WS ... |气象站|
|EC3000|EC3000|OK 22 ... |电能表|
|EMT7110|EMT7110|OK EMT7110 ... |电能表|
|液位|液位|OK LS ... |液位传感器|

＃＃ 去做：
* 其他传感器类型
* 将传感器代码放在单独的文件中
* 将新传感器推送到配置，然后在管理/配置页面中可见
* HMS100TF 温度低于 0°C 和电池电量低将被实施

## Changelog
### 1.0.0
* (foxthefox) refactoring, use of classbased style,
* github actions instead of travis

### 0.1.4
* (o0shojo0o) nodejsV14 compatibility

### 0.1.3
* (atl285) added new sensor type LacCrosseDTT (double temp like TX25-IT)

### 0.1.2
* correction for weather (no data is given by value = 255)

### 0.1.1
* delete buffer function to be compatible with nodejs10
* enhanced automatic testing

### 0.1.0
* compact mode

### 0.0.7
* new level sensor (fhem)

### 0.0.6
* last version of serialport
* new sensor TXH29DTH-IT
* new weather station WS1600
* new sensor EC3000, EMT7110 not verified with life data

### 0.0.5
* adminv3 improved with values2table

### 0.0.4
* command to USB-stick for configuration
* added superjee, BMP180 sensor on jeenode
* admin v3 implementation

### 0.0.3
* abs humidity and dewpoint calculation

### 0.0.2
* definition of unique sensor ID for iobroker datapoint
* implementation of LaCrosseDTH
* definition of sensors via admin

### 0.0.1
* working with 3 sensors emon

## License

The MIT License (MIT)

Copyright (c) 2016 - 2022 foxthefox <foxthefox@wysiwis.net>