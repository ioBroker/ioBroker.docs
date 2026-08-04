---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vaillant/README.md
title: ioBroker.vaillant
hash: xtCiRiPy2F+sc6R0qHkOVGNVjmBV7hz2yzhJ+Xt9u/0=
---
![标识](../../../en/adapterref/iobroker.vaillant/admin/vaillant.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.vaillant.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vaillant.svg)
![安装数量（最新）](http://iobroker.live/badges/vaillant-installed.svg)
![安装数量（稳定版）](http://iobroker.live/badges/vaillant-stable.svg)
![依赖状态](https://img.shields.io/david/TA2k/iobroker.vaillant.svg)
![已知漏洞](https://snyk.io/test/github/TA2k/ioBroker.vaillant/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vaillant.png?downloads=true)

# IoBroker.vaillant
## 适用于 ioBroker 的 Vaillant 适配器
Vaillant multiMatic 和 myVaillant 适配器

＃＃＃ 入门
在实例选项中输入 multimatic/senso 或 myVaillant 应用程序的邮箱和密码。

myVAILLANT 登录流程自动完成，包括 Vaillant 的登录保护功能——您只需提供邮箱和密码即可。会话信息会在重启后保留，因此适配器无需每次都从头开始登录。

可以通过调整配置子项来更改配置。某些配置仅在模式为“开启”或“手动”时生效，而不在“自动”或“定时控制”时生效。

## **示例多用途设备：**
**热水**：vaillant.0.serialnummer.systemcontrol/tli.dhw.hotwater.configuration.hotwater_temperature_setpoint **供暖**：首先设置为手动 vaillant.0.serialnummer.systemcontrol/tli.zones03.heating.configuration.operation_mode MANUAL 然后设置温度 vaillant.0.serial.systemcontrol/tli.zones03.heating.configuration.manual_mode_temperature_setpoint 最后将 operation_mode 设置为 TIME_CONTROLLED

可以通过 parameterValue 项调整参数。请注意定义对象中允许使用的值。

## **示例 myVaillant：**
vaillant.0.id.systemControlState.controlState.domesticHotWater01.boost 设置为 true/false 以启用或禁用增压功能；vaillant.0.id.systemControlState.controlState.zones01.desiredRoomTemperatureSetpoint 用于设置房间温度；vaillant.0.id.systemControlState.controlState.zones01.setBackTemperature；vaillant.0.id.systemControlState.controlState.zones01.heatingOperationMode OFF MANUAL TIME_CONTROLLED；vaillant.0.id.systemControlState.controlState.domesticHotWater01.operationMode OFF MANUAL TIME_CONTROLLED

远程命令
对于刷新和预定义 `vaillant.0.id.remote`

`vaillant.0.id.remote`下的预定义远程状态：

- `Refresh` / `RefreshStats` - 触发数据刷新
- `boost` - 家用热水增压（开/关）
- `quickVeto` + `duration` - 快速否决区温度（0 表示禁用）
- `ventilationBoost` - 通风增强（开/关）
- `coolingForDays` - 冷却 N 天（0 = 取消）
- `eebusEnabled` - 启用/禁用 EEBUS 接口
- `holiday` - 假期/外出模式，格式为 JSON，例如 `{"startDateTime":"2024-01-01T00:00:00.000Z","endDateTime":"2024-01-07T23:59:59.999Z","setpoint":10}`。发送空值（或 `{}`）可取消。`setpoint` 参数对于 vrc700 控制器是必需的，对于 tli 控制器则不适用。格式错误的 JSON 将被忽略（不会发送请求）。
- `ventilationOperationMode` / `ventilationFanStage` - 与 `ventilationIndex` 一起使用，用于指定通风单元。`ventilationFanStage` 还使用 `ventilationFanStageType`（白天或夜晚）。
- `customCommand` - 请参见下文

只读额外数据（从 mypyllant 移植）位于：`vaillant.0.id.troubleCodes`、`.rts`、`.mpc`、`.energyManagement`、`.eebus`

## 自定义命令
您可以为未预定义的远程命令使用自定义远程命令 `vaillant.0.id.remotes.customCommand`

### 示例：
## 该区域范围为 0 到 X。请测试 zone/0/ 或 zone/2/
zone/0/xxxx

zone/1/xxxx

zone/2/xxxx

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

```json
{
  "url": "cooling-for-days",
  "data": {"value": 7},
  "method": "POST"
}
```

```json
{
  "url": "cooling-for-days",
  "method": "DELETE"
}
```

## Changelog
### 1.0.3 (2026-07-28)
 - fix writing hot water (dhw), circuit and ventilation settings from the objects (VRC700)
 - clearer log message with a customCommand example when a value is not directly writable

### 1.0.2 (2026-07-26)
 - fix changing values like temperature and operation mode from the objects (VRC700). Zone and hot water settings now write to the correct endpoint

### 1.0.1 (2026-07-24)
 - replaced the deprecated request library with axios
 - migrated to @iobroker/eslint-config and updated dependencies
 - require Node.js 22 and various repository fixes

### 1.0.0 (2026-07-24)
 - fix myVAILLANT login. Please enter your password again
 - stay logged in after a restart
 - new settings page - please open the settings and enter your password again
 - new data: fault codes, energy and EEBUS info
 - new controls: ventilation, cooling days and holiday mode

### 0.7.5 (2025-07-09)
 - revert change to fix save issue

### 0.7.2 (2024-04-18)

- fix month stats period

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

Copyright (c) 2020-2026 TA2k <tombox2020@gmail.com>

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