---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sureflap/README.md
title: ioBroker.sureflap
hash: 5jIpLT/ix1AlAVGorCSvgZ1yepwQ5XC/sEgSEKZ2Vw4=
---
![稳定版](http://iobroker.live/badges/sureflap-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.sureflap.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sureflap.svg)
![安装数量（最新）](http://iobroker.live/badges/sureflap-installed.svg)
![国家公共管理](https://nodei.co/npm/iobroker.sureflap.png?downloads=true)

<p align="center"> <img src="admin/sureflap.png" /> </p>

# IoBroker.sureflap
![测试与发布](https://github.com/Sickboy78/ioBroker.sureflap/workflows/Test%20and%20Release/badge.svg)

## Sure Petcare® 智能宠物设备适配器
<p align="center"> <img src="/admin/SureFlap_Pet_Door_Connect_Hub_Phone.png" /> </p> <p align="center"> <img src="/admin/Sure_Petcare_Surefeed_Feeder_Connect.png" /> <img src="/admin/Sure_Petcare_Felaqua_Connect.png" /> </p>

＃＃ 配置
在适配器配置页面上添加 Sure Petcare® 帐户的用户名和密码。

使用 acs 时，还可以在此处调整电池满电和空电阈值。这会影响电池百分比值。

＃＃ 描述
该适配器提供有关宠物盖、猫盖、喂食器或饮水器的设置和状态的信息。

它还显示您的宠物的位置及其食物和水的消耗量（带有喂食器和/或饮水机）。

它可以让您控制襟翼的锁定模式和宵禁并设置宠物的位置。

该适配器需要 Node 18 或更高版本。

### 可变值
以下状态可以更改，并将在您的设备上生效，并分别反映在您的 Sure Petcare® 应用程序中。

|状态|描述 |允许值 |
|-------|-------------|----------------|
| | 家庭名称.集线器名称.控制.led_模式 |设置集线器 LED 的亮度 | **0** - 关闭<br>**1** - 高<br>**4** - 变暗|
|家庭名称.集线器名称.襟翼名称.控制.宵禁 |启用或禁用配置的宵禁<br>（宵禁必须通过应用程序配置）| **真**或**假** |
| | 家庭名称.集线器名称.襟翼名称.控制.lockmode |设置锁定模式 | **0** - 打开<br>**1** - 锁定<br>**2** - 锁定<br>**3** - 关闭（上锁和上锁）|
| | 家庭名称.集线器名称.襟翼名称.指定宠物.宠物名称.控制类型 |设置指定宠物和襟翼的宠物类型 | **2** - 户外宠物<br>**3** - 室内宠物|
| | 家庭名称.集线器名称.馈线名称.控制.关闭延迟|设置送料器盖关闭延迟| **0** - 快<br>**4** - 正常<br>**20** - 慢 |
|家庭名称.宠物.宠物名称.inside |设置您的宠物是否在里面 | **真**或**假** |

＃＃＃ 结构
适配器创建以下层次结构：

适配器<br>├ 家庭姓名<br>│ ├ 集线器名称<br>│ │ ├ 在线<br>│ │ ├ 序列号<br>│ │ ├ 信号<br>│ │ │ ├ device_rssi<br> │ │ │ └ hub_rssi<br> │ │ ├ 版本<br>│ │ │ ├ 固件<br>│ │ │ └ 硬件<br>│ │ ├ 控制<br>│ │ │ └ led_mode<br> │ │ ├ felaqua_name<br> │ │ │ ├ 电池<br>│ │ │ ├ 电池百分比<br>│ │ │ ├ 在线<br>│ │ │ ├ 序列号<br>│ │ │ ├ 信号<br>│ │ │ │ ├ device_rssi<br> │ │ │ │ └ hub_rssi<br> │ │ │ ├ 版本<br>│ │ │ │ ├ 固件<br>│ │ │ │ └ 硬件<br>│ │ │ ├ 分配_宠物<br>│ │ │ │ └ 宠物名<br>│ │ │ └ 水<br>│ │ │ └ 重量<br>│ │ ├ feeder_name<br> │ │ │ ├ 电池<br>│ │ │ ├ 电池百分比<br>│ │ │ ├ 在线<br>│ │ │ ├ 序列号<br>│ │ │ ├ 信号<br>│ │ │ │ ├ device_rssi<br> │ │ │ │ └ hub_rssi<br> │ │ │ ├ 版本<br>│ │ │ │ ├ 固件<br>│ │ │ │ └ 硬件<br>│ │ │ ├ 分配_宠物<br>│ │ │ │ └ 宠物名<br>│ │ │ ├ 碗<br>│ │ │ │ └ 0..1<br> │ │ │ │ ├ 食物类型<br>│ │ │ │ ├ 目标<br>│ │ │ │ └ 重量<br>│ │ │ └ 控制<br>│ │ │ └ close_delay<br> │ │ └ 襟翼名称<br>│ │ ├ 电池<br>│ │ ├ 电池百分比<br>│ │ ├ 宵禁_active<br> │ │ ├ 在线<br>│ │ ├ 序列号<br>│ │ ├ 控制<br>│ │ │ ├ 宵禁<br>│ │ │ └ 锁定模式<br>│ │ ├ 信号<br>│ │ │ ├ device_rssi<br> │ │ │ └ hub_rssi<br> │ │ ├ 版本<br>│ │ │ ├ 固件<br>│ │ │ └ 硬件<br>│ │ ├ 宵禁<br>│ │ │ └ 0..i<br> │ │ │ ├ 已启用<br>│ │ │ ├ 锁定时间<br>│ │ │ └unlock_time<br> │ │ ├ 最后宵禁<br>│ │ │ └ 0..i<br> │ │ │ ├ 已启用<br>│ │ │ ├ 锁定时间<br>│ │ │ └ 解锁时间<br>│ │ └ 分配_宠物<br>│ │ └ 宠物名<br>│ │ └ 控制<br>│ │ └ 类型<br>│ ├ 历史<br>│ │ └ 0..24<br> │ │ └ ...<br> │ └ 宠物<br>│ └ 宠物名<br>│ ├ 里面<br>│ ├ 姓名<br>│ ├ 自<br>│ ├ 食品<br>│ │ ├ 上次吃的食物<br>│ │ ├ 花费时间<br>│ │ ├ 吃过的次数<br>│ │ └ 干..湿<br>│ │ └ 重量<br>│ ├ 运动<br>│ │ ├ 最后方向<br>│ │ ├ 最后一瓣<br>│ │ ├ 最后_flap_id<br> │ │ ├ 最后时间<br>│ │ ├ time_spent_outside_<br> │ │ └ times_outside<br> │ └ 水<br>│ ├ 最后一次喝醉<br>│ ├ 花费时间<br>│ ├ 次_醉<br>│ └ 重量<br>└ 信息<br>├ 所有设备在线<br>├ 连接<br>└ 最后更新<br>

## 注释
SureFlap®、Sure Petcare® 和 Felaqua® 是 [苏尔弗拉普有限公司](https://www.surepetcare.com/) 的注册商标

SureFlap® 设备的图片可从 [确定宠物护理®](https://www.surepetcare.com/en-us/press) 开始免费使用。

## Changelog

### 2.1.1 (2024-02-25)
* (Sickboy78) bugfix for outside times not beeing shown

### 2.1.0 (2024-02-20)
* (Scrounger) option to enable history data
* (Sickboy78) added number of history entries to configuration

### 2.0.2 (2024-02-17)
* (Sickboy78) added flap id to last movement
* (Sickboy78) fixed a bug where hub was recognized as obsolete device because of same name as a device
* (Sickboy78) fixed a bug where setting lockmode or curfew was not working because of flap having same name as the hub

### 2.0.1 (2024-01-24)
* (Sickboy78) added last movement for pets
* (Sickboy78) added time spent outside today for pets
* (Sickboy78) dependency updates

### 1.2.3 (2023-12-29)
* (Sickboy78) added api host to config and set default to new api
* (Sickboy78) improved removing of obsolete objects

### 1.2.2 (2023-10-17)
* (Sickboy78) added signal strength and hardware and firmware version of devices

### 1.2.1 (2023-10-03)
* (Sickboy78) fixed get_history_since call failing because of API changes
* (Sickboy78) added workaround for removed parent object because of API changes
* (Sickboy78) removed wrongly created objects because of API changes

### 1.2.0 (2023-08-19)
* (Sickboy78) repetitive errors are now logged as debug to avoid spamming the error log
* (Sickboy78) increased timeout for surepet API from 60 to 120 seconds
* (Sickboy78) added removal of deleted or renamed pets
* (Sickboy78) security updates

### 1.1.9 (2023-07-21)
* (Sickboy78) fixed undefined serial number
* (Sickboy78) dependency updates

### 1.1.8 (2023-06-01)
* (Sickboy78) adjustments for Surepet API changes

### 1.1.7 (2023-03-13)
* (Sickboy78) fixed false login error in case pet had no photo

### 1.1.6 (2023-01-07)
* (Sickboy78) added battery voltage configuration
* (Sickboy78) added translation for adapter settings
* (Sickboy78) security updates

### 1.1.5 (2022-09-10)
* (Sickboy78) added display of serial numbers

### 1.1.4 (2022-09-07)
* (Sickboy78) added Felaqua support
* (Sickboy78) improved battery and battery percentage indicator (reduced outliers)

### 1.1.3 (2022-03-28)
* (Sickboy78) code improvements
* (Sickboy78) improved error handling if no pet has been assigned yet

### 1.1.2 (2022-03-06)
* (Sickboy78) improved error and timeout handling
* (Sickboy78) optimized subscribed states

### 1.1.1 (2022-02-20)
* (Sickboy78) removed pet type control from pet flap (is a cat flap exclusive feature)
* (Sickboy78) fixed wrong default value for info.last_update
* (Sickboy78) testing updates for js-controller 4
* (Sickboy78) security updates

### 1.1.0 (2022-01-17)
* (Sickboy78) bugfix and security updates

### 1.0.9 (2022-01-05)
* (Sickboy78) removed old encrypt/decrypt from index_m
* (Sickboy78) added adapter unloaded guard in case unload happens during data requests

### 1.0.8 (2021-11-22)
* (Sickboy78) added food type, target weight and remaining food in feeder
* (Sickboy78) added todays pet food consumption, times eaten and time spent

### 1.0.7 (2021-11-02)
* (Sickboy78) added history
* (Sickboy78) added last update time

### 1.0.6 (2021-09-12)
* (Sickboy78) added feeder support (closing delay of lid)
* (Sickboy78) added led control for hub
* (Sickboy78) added assigned pets for flap and feeder devices
* (Sickboy78) added pet type control (indoor or outdoor) for assigned pets for flap devices
* (Apollon77) update CI testing

### 1.0.5 (2021-04-25)
* (Sickboy78) fixed bug in case pets didn't have a position (e.g. no flaps, only feeder in use)

### 1.0.4 (2021-03-07)
* (Sickboy78) added state curfew_active for pet flap devices
* (Sickboy78) fixed normalization of device names
* (Sickboy78) fixed changeable values not resetting when change fails

### 1.0.3 (2021-02-28)
* (Sickboy78) code improvements from review
* (Sickboy78) fixed timezone bug

### 1.0.2 (2021-02-25)
* (Sickboy78) fixed bug setting lockmode and inside values

### 1.0.1 (2021-02-19)
* (Sickboy78) initial release

## License

MIT License

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

Copyright (c) 2024 Sickboy78 <asmoday_666@gmx.de>