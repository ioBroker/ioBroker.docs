---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fhem/README.md
title: ioBroker.fhem
hash: FHDWKGHESdm9lAi0W8esYxcqxpLqFllQPX+6m/3Kbrk=
---
![商标](../../../en/adapterref/iobroker.fhem/admin/fhem.png)

![安装数量](http://iobroker.live/badges/fhem-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.fhem.svg)
![下载](https://img.shields.io/npm/dm/iobroker.fhem.svg)

#ioBroker.fhem
![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.fhem/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/fhem/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

此适配器允许将 FHEM 连接到 ioBroker。

**此适配器使用哨兵库自动向开发人员报告异常和代码错误。**有关更多详细信息和如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

要启用连接，必须在 FHEM 中启用 telnet。要启用它（默认情况下启用），请检查 `fhem.cfg` 中的以下设置：

`define telnetPort telnet 7072 global`

完全相同的端口和 FHEM 主机的 IP 地址（如果 FHEM 和 ioBroker 在同一台 PC 上运行，则为本地主机）应该用于适配器的设置。

ioBroker 在开始时发送 `jsonlist2` 命令以从列表中获取所有 `Readings`。

## 支持的设备
通常支持所有设备。但是其中一些集成得更好。

这些问题尤其是通过控制国家来出现。
因为没有明确的属性结构，ioBroker 会尝试猜测可以使用哪些 `PossibleSets` 字段。
实际上只支持以下属性：

- RGB：如果RGB存在于`PossibleSets`和`Readings`中，它将被组合成一个可读可写的状态。 `#234567` 之类的值将自动转换为 `234567`。
- on off 状态：如果`PossibleSets` 中存在`on` 和`off`，`Readings` 中存在`state`，则将合并为名称为`state` 的开启状态。它可以用 true 和 false 来控制，命令将更改为“set DEVICE on”和“set DEVICE off”。

## 特点和用法
* 如果房间“ioBroker”存在于FHEM中，只有这个对象会被同步
* 同步后 FHEM 未使用的对象将被自动删除。
* `TYPE`、`NAME`、`PORT`、`manufacturername`、`modelid`、`swversion` 等内部信息将被同步（`role=value.xxx`）
* `room`、`alias`、`disable`、`comment` 等属性将被同步，并且可以在 ioBroker 中编辑属性。 (`role=state.xxx`)
* 同步时设置角色等
  * 带有任何 `PossibleSets` 的 `Readings xxx` 将被设置为 `role=state.xxx`
  * 没有 PossibleSets 的 `Readings xxx` 将被设置为 `role=value.xxx`
  * PossibleSets“noArg”的`Readings xxx`将被设置为`role=button.xxx`
  * `Readings xxx` 与 PossibleSets "slider" 将被设置为 `role=level.xxx, min=slider(min), max=slider(max)`
  * `Readings "desired-temp"` 将设置为 `role=level.temperature, min=5, max=35, unit=°C`。
  * `Readings "pct, brightness,dim"` 将设置为 `role=level.dimmer, min=0, max=100, unit=%`
  * `Readings "Volume, volume, GroupVolume"` 将设置为 `role=level.volume, min=0, max=100, unit=%`
  * `Readings "GroupVolume"` 将设置为 `role=level.volume.group`, `min=0`, `max=100`, `unit=%`
* Cloud Adapter 的 `SmartName` 将自动设置别名或名称（仅限 `fhem.0` 和具有 `role = level.temperature, level.dim, level.volume` 的对象）

<!-- 下一个版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### 2.0.3 (2023-01-03)
* (Apollon77/LausiD) Made sure that all objects are initialized correctly

### 2.0.2 (2022-12-23)
* (bluefox) Corrected error with `members`

### 2.0.0 (2022-12-22)
* (bluefox) Refactoring
* (bluefox) Corrected some GitHub issues
* (bluefox) Added JSON config

### 1.6.3 (2021-07-26)
* (Apollon77) fix crash case

### 1.6.2 (2021-07-16)
* (LausiD) fix crash case

### 1.6.1 (2021-06-30)
* (LausiD) fix use Controller 3.3.x
* (Apollon77) js-controller 3.3 optimizations
* (Apollon77) Add Sentry crash reporting

### 1.6.0 (2021-04-09)
* (LausiD) Several fixes and changes

### 1.5.3 (2020-06-30)
* (LausiD) Several fixes

### 1.5.2 (2020-05-15)
* (Apollon77) Fix wrong method calls

### 1.5.0 (2020-05-08)
* (LausiD) Several fixes and changes

### 1.4.3 (2020-03-21)
* (LausiD) fix compact mode

### 1.4.2 (2020-01-10)
* (bluefox) Running timers will be stopped by unload

### 1.4.1 (2019-12-12)
* (LausiD) Several fixes and changes

### 1.4.0 (2019-10-22)
* (LausiD) Optimized adapter

### 1.3.0 (2019-07-14)
* (bluefox) Compact mode was added

### 1.2.2 (2019-06-12)
* (LausiD) Several fixes and changes

### 1.2.1 (2019-03-28)
* (LausiD) Several fixes and changes

### 1.2.0 (2019-02-16)
* (LausiD) Sync readingsGroup, set states ioBroker from FHEM, add different sensors

### 1.1.1 (2018-11-08)
* (LausiD) add debug mode

### 1.1.0 (2018-10-22)
* (LausiD) Sync objects from ioBroker to FHEM is possible

### 1.0.0 (2018-10-15)
* (LausiD) Min/max were defined as number

### 0.5.6 (2018-09-09)
* (LausiD) Some roles were updated

### 0.5.5 (2018-08-22)
* (LausiD) Several fixes and changes
* (bluefox) Admin3

### 0.5.0 (2018-04-29)
* (LausiD) Several fixes and changes

### 0.4.2 (2018-04-15)
* (TonyBostonTB) Fix wordings

### 0.4.1 (2017-04-14)
* (bluefox) add link to FHEM im admin

### 0.4.0 (2017-03-12)
* (LausiD) fix some types
* (bluefox) define custom prompt

### 0.3.0 (2017-02-25)
 * (LausiD) fix some types
 * (bluefox) add password for telnet

### 0.2.2 (2016-06-17)
* (bluefox) implement On/Off state and fix RGB
* (bluefox) add debug output by control

### 0.2.1 (2016-06-12)
* (bluefox) support of RGB values for control

### 0.2.0
* (bluefox) implemented write
* (bluefox) try to read meta information if unknown event received

### 0.1.0
* (bluefox) initial release

## License
The MIT License (MIT)

Copyright (c) 2016-2023 bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.