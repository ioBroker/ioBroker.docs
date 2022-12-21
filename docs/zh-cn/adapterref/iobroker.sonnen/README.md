---
BADGE-Number of Installations: http://iobroker.live/badges/sonnen-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.sonnen.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.sonnen.svg
BADGE-NPM: https://nodei.co/npm/iobroker.sonnen.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sonnen/README.md
title: 太阳适配器
hash: zO5PfveY4rgOh9p7uA4OErQqhY9ZV/Y/TACMQFocdFw=
---
![商标](../../../de/adapterref/iobroker.sonnen/media/sonnen.png)

# 太阳适配器
sonnen 适配器可以将 sonnenBatterie 集成到 ioBroker 中。

＃＃ 概述
###太阳能电池
有了 sonnenBatterie，太阳能系统自行产生的能量可以储存起来供个人使用，并在需要时使用。这使得独立于匿名能源公司并成为自给自足的电力生产商成为可能。得益于集成能源管理器，智能高科技储能单元可确保以最佳方式为家庭供电。
这样不仅划算，而且环保！ sonnenBatterie 有多种灵活的存储模型可供选择。

### 太阳适配器
sonnen 适配器可以监视和控制网络中的 sonnenBatterie。借助发现适配器（TODO：链接），可以在网络中自动找到 sonnenBatteries。<br/>适配器以对象的形式创建用于监视和控制 sonnenBatterie 的状态。很大一部分状态只用于监控电池，同时也可以通过写一些状态来控制电池。

## 预安装要求
使用 ioBroker 操作 sonnenBatterie 的先决条件是电工成功安装电池。电池还必须与 ioBroker 在同一网络中。

＃＃＃ 安装
适配器实例从 ioBroker 管理界面安装。可以在此处找到必要安装步骤的详细说明 (TODO:LINK)。<br/><br/>完成适配器实例的安装后，会自动打开一个配置窗口。

＃＃ 配置
### 主设置窗口
![主要设置](../../../de/adapterref/iobroker.sonnen/media/mainSettings.png "主要设置")

|领域 |说明 |
|:-------------|:-------------|
|IP 地址 |应在此处输入所需 sonnenBatterie 的 IP 地址。|

|领域 |说明 |
|:-------------|:-------------|
|Auth-Token |这里要输入Auth-Token，可以在sonnen网页界面的“软件集成”下找到。如果未输入身份验证令牌，则使用非官方 API，可以随时将其关闭。|

### 高级设置窗口
![高级设置](../../../de/adapterref/iobroker.sonnen/media/advancedSettings.png "高级设置")

|领域 |说明 |
|:-------------|:-------------|
|查询间隔|可以在此处设置以毫秒为单位的替代值。 sonnenBatterie 的状态会在这个时间间隔更新。|

|领域 |说明 |
|:-------------|:-------------|
|查询在线状态|如果您想避免从电池向 sonnen 服务器查询，您可以停用在线状态查询（仅与 8080 API 相关 - 例如 eco8 和更新版本）|

完成配置后，使用 `SPEICHERN UND SCHLIEßEN` 退出配置对话框。
这会导致适配器重新启动。

## 实例
适配器的安装在 `Objekte` 部分中创建了 sonnen 适配器的活动实例。<br/><br/> ![实例](../../../de/adapterref/iobroker.sonnen/media/instance.png "实例") <span style="color:grey">*初审*</span>

可以在 ioBroker 服务器上创建多个 sonnen 适配器实例。相反，一个 sonnenBatterie 也可以与多个 ioBroker 服务器一起运行。如果 ioBroker 服务器要控制多个设备，则应为每个电池创建一个实例。<br/><br/>适配器是否已激活或是否连接到电池由实例状态字段的颜色指示。如果鼠标指针指向该符号，则会显示更多详细信息。

## 适配器的对象
在 `Objekte` 区域中，集线器中适配器检测到的所有设备和活动都以树形结构列出。此外，还通知与集线器的通信是否顺利进行。

![对象](../../../de/adapterref/iobroker.sonnen/media/objects.png "太阳物体") <span style="color:grey">*sonnen 适配器的对象*</span>

对象分为下面的状态和按钮。由于根据电池有两种不同的 API，因此仅创建相应电池支持的状态。
每个数据点都与其关联的数据类型和权限一起列出。
权限可以是读 (R) 或写 (W)。每个数据点至少可以读取（R），而其他数据点也可以写入。要搜索特定数据点，我们建议使用组合键“STRG + F”。

＃＃＃ 状态
注意：遗留 API（端口 3480）和旧 API（端口 7979）的状态目前没有或仅部分记录

####频道：配置
使用 API v2，可以在此处查看电池在不同状态下的配置。可写状态可用于更改配置。

####频道：信息
* 信息.连接

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，如果 ioBroker 和电池之间建立了连接，则为真。*

* info.lastSync

    |数据类型|权限|
    |:---:|:---:|
    |时间戳|R|

   *每次更新数据时都会更新的只读时间戳。*

* 信息.配置

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

*只有可读的 JSON 字符串，带有 sonnenBatterie 的配置信息。* *仅在 API v1 中，v2 具有通道 `configurations`* 为此

* info.powerMeter

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

   *只读 JSON 字符串，带有 sonnenBatterie 电流测量信息。*

* info.inverter

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只有可读的数值，带有太阳能电池逆变器信息。*

* 信息.ios

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只有可读的布尔值，带有 sonnenBatterie 的“离散 IO 信息”。*

####频道：状态
* status.consumption

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数值，其中包含以瓦特为单位的房屋当前消耗量。*

* status.production

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *指示光伏系统当前产生多少瓦特的只读数值。*

* status.pacTotal

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

*只读数值表示逆变器交流功率。
如果该值大于 0，电池将放电，如果该值小于 0，将充电。*

* status.relativeSoc

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *代表当前电池电量的只读数值。*

* status.userSoc

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *代表当前电池电量的只读数值。*

* 状态.acFrequency

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *代表以赫兹为单位的交流频率的只读数值。*

* 状态.acVoltage

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *代表逆变器当前AC（交流电）电压的只读数值。*

* 状态.电池电压

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数值，代表电池当前的DC（直流）电压。*

* 状态.系统时间

    |数据类型|权限|
    |:---:|:---:|
    |日期|R|

   *只读代表电池系统时间的 ISO 日期。*

* status.system已安装

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，如果系统安装正确，则为真。*

* status.batterycharging

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值。如果 sonnenBatterie 当前正在充电，则为真。*

* status.flowConsumptionBattery

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值。如果电池当前正在放电，则为真。*

* status.flowConsumptionGrid

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，如果当前正在从电网中获取电力，则为真。*

* status.flowConsumptionProduction

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值。如果光伏系统当前直接消耗电力，则为真。 *

* 状态.flowGridBattery

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔指示器，如果电池当前正在由电网充电，则为真。*

* status.flowProductionBattery

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，如果电池当前正由光伏阵列直接充电，则为真。*

* status.flowProductionGrid

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，如果产生的电力当前正在馈入电网，则为真。*

* status.gridFeedIn

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

*只读数值，表示当前馈入或来自电网的功率瓦数。
如果该值为正，则当前正在向电网馈电，如果为负，则表示正在从电网中汲取电量。*

* status.online状态

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，sonnenBatterie在线时为真*

* 状态.系统状态

  |数据类型|权限|
  |:---:|:---:|
  |字符串|R|

  *指示电池是否连接到电网的只读字符串。*

####通道：控制
* control.charge

    |数据类型|权限|
    |:---:|:---:|
    |编号|读/写|

   *允许您以瓦特为单位指定电池最大放电量的数字值。*

*注意：如果设置了无效值，仍然会被确认。该值的确认（acknowledge）仅表示命令已传输至电池。*

*设定点的相应值会一直保持，直到电池接收到新的充电或放电值。
如果 VPP 处于活动状态，请求将被拒绝。*

   *例子：*

```javascript
setState('sonnen.0.control.charge', 1250); // Die Batterie wird mit maximal 1250 Watt geladen
```

* 控制.放电

    |数据类型|权限|
    |:---:|:---:|
    |编号|读/写|

   *允许您以瓦特为单位设置电池最大电量的数字值。*

*注意：如果设置了无效值，仍然会被确认。该值的确认（acknowledge）仅表示命令已传输至电池。*

*设定点的相应值会一直保持，直到电池接收到新的充电或放电值。
如果 VPP 处于活动状态，请求将被拒绝。*

   *例子：*

```javascript
setState('sonnen.0.control.discharge', 1250); // Die Batterie wird maximal mit 1250 Watt entladen
```

####通道：功率计
该频道有两个子频道，例如 `4_1` 和 `4_2`，一个代表消费，另一个代表生产。
例如。 `4_1.kwh_imported` 表示自安装电池以来的总产量。

这两个通道具有相同的状态。所有状态都是只读的，类型为 `number`。

###通道：逆变器
该通道由 `number` 类型的只读状态组成，它提供有关 sonnenBatterie 逆变器的信息。

###频道：ios
该通道由 `boolean` 类型的写保护状态组成，它提供有关 sonnenBatterie 的离散 IO 状态的信息。

###频道：配置
该通道允许读取和写入太阳能电池配置值。

###频道：电池
该通道提供特定于电池的数据，例如充电周期数。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.15.6 (2022-12-18)
* (foxriver76) added two GPIOs for CHP status

### 1.15.5 (2022-12-17)
* (foxriver76) added state list for `configurations.SH_HeaterOperatingMode'`
* (foxriver76) marked some datapoints as read-only and fixed state types

### 1.15.4 (2022-12-16)
* (foxriver76) fixed crash if v2 configurations endpoint is not available (closes #228)

### 1.15.3 (2022-12-14)
* (foxriver76) internal optimizations (Axios port)

### 1.15.2 (2022-12-14)
* (foxriver76) internal optimization (ES6 class)

### 1.15.1 (2022-12-13)
* (foxriver76) added `battery.cyclecount` state (closes #194)

### 1.15.0 (2022-12-13)
* (foxriver76) full port to v2 API (Software Version >= 1.8.7)
* (foxriver76) brings back `ios` and `inverter` endpoints
* (foxriver76) configuration request is now handled by a single call instead of one for each attribute
* (foxriver76) we fixed a lot of state roles

### 1.14.0 (2022-12-02)
* (foxriver76) implemented new state `latestData.dcShutdownReason` (closes #213)

### 1.13.1 (2022-11-24)
* (foxriver76) minor performance optimization
* (foxriver76) `info.lastSync` and `status.systemTime` are now type number
* (foxriver76) implemented silent fail on `ios` endpoint to support both API versions

### 1.13.0 (2022-10-28)
* (foxriver76) added `latestData` endpoint providing eclipse LED status and time since last full charge

### 1.12.3 (2022-10-27)
* (foxriver76) readded widget (closes #189)

### 1.12.2 (2022-10-27)
* (foxriver76) fixed issue with data types of configuration

### 1.12.1 (2022-09-26)
* (foxriver76) we now use the V2 API for the powermeter endpoint
* (foxriver76) we have ported the code to TypeScript
* (foxriver76) added configuration for V2 API, including ability to change it via adapter

### 1.11.0 (2022-06-22)
* (foxriver76) added `status.systemStatus` to indicate if the battery is connected to the grid (closes #139)

### 1.10.0 (2022-04-18)
* (rivengh) added battery discrete io states

### 1.9.8 (2021-09-27)
* (foxriver76) make requesting online status optional for 8080 api (closes #76)

### 1.9.6 (2021-08-03)
* (foxriver76) fix for horizontal flow animations in Safari (broken with 1.9.4)

### 1.9.4 (2021-07-17)
* (foxriver76) widget: make the svg smaller by using a flexbox to center the svg correctly inside the div

### 1.9.3 (2021-07-16)
* (foxriver76) also poll the configuration instead of updating it only once at start (closes #70)

### 1.9.2 (2021-07-16)
* (foxriver76) fix for legacy API

### 1.9.1 (2021-07-16)
* (foxriver76) use legacy API if old API is not completely implemented

### 1.9.0 (2021-07-16)
* (foxriver76) we now also support the legacy API (port 3480)
* (foxriver76) switch from intervals to timeouts to avoid overlapping poll runs

### 1.8.6 (2021-07-04)
* (foxriver76) widget: we removed debug logging and unnecessary template functions
* (foxriver76) widget: we now cache the jquery selectors to improve the performance

### 1.8.5 (2021-07-02)
* (foxriver76) widget: stroke width can now be configured

### 1.8.4 (2021-07-01)
* (foxriver76) widget: we made ID names more adapter specific to avoid getting wrong translations

### 1.8.3 (2021-07-01)
* (foxriver76) widget: we now allow defining the used adapter instance

### 1.8.2 (2021-06-30)
* (foxriver76) widget: css classes now have adapter specific names to avoid conflicts

### 1.8.1 (2021-06-30)
* (foxriver76) widget now has flow directions

### 1.8.0 (2021-06-30)
* (foxriver76) added widget

### 1.7.3 (2021-05-01)
* (foxriver76) we now update objects if attributes are updated, but preserve common.name attribute

### 1.7.2 (2021-04-30)
* (foxriver76) we fixed some type issues (fixes #58)

### 1.7.1 (2021-03-19)
* (foxriver76) do not log warnings on inverter endpoint if battery does not support it (closes #55)

### 1.7.0 (2020-11-12)
* (foxriver76) new channels for powermeter and inverter

### 1.6.1 (2020-11-11)
* (foxriver76) fixed charge and discharge not working with api v2

### 1.6.0 (2020-08-09)
* (foxriver76) added support for official api, automatically used when auth token is given by user

### 1.5.3 (2020-05-18)
* (foxriver76) poll online status always again if not confirmed that there are differences in api (old solution could lead to false negative)
* (foxriver76) more specific error handling

### 1.5.2 (2020-05-16)
* (foxriver76) check if onlineStatus is supported at adapter start - else do not poll it

### 1.5.0 (2020-05-04)
* (foxriver76) added online status indicator

### 1.4.2 (2020-04-16)
* (foxriver76) added more translations
* (foxriver76) optimizations for compact mode

### 1.4.0
* (foxriver76) introducing new states with power metering and inverter information (supported on :8080 API)
* (foxriver76) only minimum support until we know what users need as states

### 1.3.0
* (foxriver76) introducing new state with configuration information (supported on :8080 API)

### 1.2.0
* (foxriver76) support of another sonnen api

### 1.1.2
* (foxriver76) bugfix for control states

### 1.1.1
* (foxriver76) add compact mode compatibility

### 1.0.2
* (foxriver76) use adapter-core module

### 1.0.1
* (foxriver76) take timezone offset into account on time states

### 1.0.0
* (foxriver76) formal version increment

### 0.0.8
* (foxriver76) Enhanced debug logging
* (foxriver76) Prevent crashing when a return code is received

### 0.0.7
* (foxriver76) Only set info.connection on change

### 0.0.6
* (foxriver76) Only set states if request was successfull --> prevents adapter crash

### 0.0.5
* (foxriver76) translations on index_m.html
* (foxriver76) use 7000 as interval if poll interval is undefined

### 0.0.3
* (foxriver76) fixed links to bugs, repo etc

### 0.0.2
* (foxriver76) bugfixes on control states
* (foxriver76) big readme update
* (foxriver76) addded more states
* (foxriver76) added advanced settings

### 0.0.1
* (foxriver76) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2021 Moritz Heusinger <moritz.heusinger@gmail.com>

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