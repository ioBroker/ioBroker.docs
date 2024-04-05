---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vaillant/README.md
title: ioBroker.vaillant
hash: 0S0upJibblOA6l9ZNY0BN0ASNBRryqHH3O/DxLiNUT4=
---
![标识](../../../en/adapterref/iobroker.vaillant/admin/vaillant.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.vaillant.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vaillant.svg)
![安装数量（最新）](http://iobroker.live/badges/vaillant-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/vaillant-stable.svg)
![依赖状态](https://img.shields.io/david/TA2k/iobroker.vaillant.svg)
![已知漏洞](https://snyk.io/test/github/TA2k/ioBroker.vaillant/badge.svg)
![新平台](https://nodei.co/npm/iobroker.vaillant.png?downloads=true)

# IoBroker.vaillant
## 适用于 ioBroker 的 vaillant 适配器
Vaillant multiMatic 和 myVaillant 适配器

＃＃＃ 入门
在实例选项中输入 multimatic/senso 或 myVaillant 应用程序的邮件和密码。

可以将配置写入到您指定的下一级配置中。当模式为 ON 或 MANUAL 时，将首先使用配置，而不是 AUTO 或 TIME_CONTROLLED

## **多种示例：**
**热水**：vaillant.0.serialnummer.systemcontrol/tli.dhw.hotwater.configuration.hotwater_temperature_setpoint **加热**：先使用 MANUAL vaillant.0.serialnummber.systemcontrol/tli.zones03.heating.configuration.operation_mode MANUAL 然后温度 vaillant.0.serial.systemcontrol/tli.zones03.heating.configuration.manual_mode_temperature_setpoint 结束使用 TIME_CONTROLLED 的 operation_mode

参数可以通过点参数值被设置为与对象定义中的值相等的值。

## **myVaillant 示例：**
vaillant.0.id.systemControlState.controlState.domesticHotWater01.boost 设置为 true/false 以激活或禁用 Boost vaillant.0.id.systemControlState.controlState.zones01.desiredRoomTemperatureSetpoint 以设置房间温度 vaillant.0.id.systemControlState.controlState.zones01.setBackTemperature vaillant.0.id.systemControlState.controlState.zones01.heatingOperationMode OFF MANUAL TIME_CONTROLLED vaillant.0.id.systemControlState.controlState.domesticHotWater01.operationMode OFF MANUAL TIME_CONTROLLED

远程命令
用于刷新和预定义`vaillant.0.id.remote`

自定义命令
您可以将自定义命令遥控器用于未预定义的遥控器`vaillant.0.id.remotes.customCommand`

＃＃＃ 例子：
## 该区域可以从 0 到 X 消失。 Bitte zone/0/ 或 zone/2/ testen
区域/0/xxxx

区域/1/xxxx

区域/2/xxxx

```json
{
  "url": "zone/0/heating/comfort-room-temperature",
  "data": { "comfortRoomTemperature": 10.5 }
}
```

```json
{
  "url": "zone/1/heating/comfort-room-temperature",
  "data": { "comfortRoomTemperature": 10.5 }
}
```

```json
{
  "url": "domestic-hot-water/255/operation-mode",
  "data": { "operationMode": "OFF" }
}
```

```json
{
  "url": "domestic-hot-water/255/temperature",
  "data": { "setpoint": 55 }
}
```

```json
{
  "url": "zone/1/heating/operation-mode",
  "data": { "operationMode": "DAY" }
}
```

```json
{
  "url": "zone/1/heating/set-back-temperature",
  "data": { "setBackTemperature": 20 }
}
```

```json
{
  "url": "zone/1/cooling/operation-mode",
  "data": { "operationMode": "DAY" }
}
```

```json
{
  "url": "zone/1/cooling/setpoint",
  "data": { "setpoint": 20 }
}
```

```json
{
  "url": "ventilation/0/operation-mode",
  "data": { "operationMode": "DAY" }
}
```

```json
{
  "url": "ventilation/0/operation-mode",
  "data": { "operationMode": "SET_BACK" }
}
```

```json
{
  "url": "ventilation/0/day-fan-stage",
  "data": { "maximumDayFanStage": 3 }
}
```

```json
{
  "url": "ventilation/0/night-fan-stage",
  "data": { "maximumNightFanStage": 2 }
}
```

```json
{
  "url": "zone/1/heating/quick-veto",
  "data": { "desiredRoomTemperatureSetpoint": 11, "duration": 3 },
  "method": "POST"
}
```

```json
{
  "url": "domestic-hot-water/255/boost",
  "data": {},
  "method": "POST"
}
```

```json
{
  "url": "domestic-hot-water/255/boost",
  "data": {},
  "method": "DELETE"
}
```

```json
{
  "url": "domestic-hot-water/255/circulation-pump/time-windows",
  "data": {
    "friday": [
      {
        "endTime": 540,
        "startTime": 360
      }
    ],
    "monday": [],
    "saturday": [],
    "sunday": [],
    "thursday": [],
    "tuesday": [],
    "wednesday": []
  }
}
```

```json
{
  "url": "domestic-hot-water/255/time-windows",
  "data": {
    "friday": [],
    "monday": [
      {
        "endTime": 1320,
        "startTime": 330
      }
    ],
    "saturday": [
      {
        "endTime": 1320,
        "startTime": 330
      }
    ],
    "sunday": [
      {
        "endTime": 1320,
        "startTime": 330
      }
    ],
    "thursday": [
      {
        "endTime": 1320,
        "startTime": 330
      }
    ],
    "tuesday": [
      {
        "endTime": 1320,
        "startTime": 330
      }
    ],
    "wednesday": [
      {
        "endTime": 1320,
        "startTime": 330
      }
    ]
  }
}
```

## Changelog

### 0.3.0

- add boost

### 0.1.2

- fix refresh token

### 0.1.1

- add myvaillant support and stats

### 0.0.15

- bugfixes

### 0.0.14

- add rooms support

### 0.0.13

- fix livereport order

### 0.0.11

- fix issue with js-controller 3.2

### 0.0.10

- fix issue with js-controller 3

### 0.0.8

- (TA2k) Fix Authorization problem and missing configuration states

### 0.0.6

- (TA2k) initial release

## License

MIT License

Copyright (c) 2020 TA2k <tombox2020@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.