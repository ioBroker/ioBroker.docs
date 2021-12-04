---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sureflap/README.md
title: ioBroker.sureflap
hash: vYeV5RQS/D0Ad5A0LLu5B4PUXTUBpY4cmHGUmAYcI4o=
---
![NPM 版本](http://img.shields.io/npm/v/iobroker.sureflap.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sureflap.svg)
![安装数量（最新）](http://iobroker.live/badges/sureflap-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/sureflap-stable.svg)
![依赖状态](https://img.shields.io/david/Sickboy78/iobroker.sureflap.svg)
![已知漏洞](https://snyk.io/test/github/Sickboy78/ioBroker.sureflap/badge.svg)
![特拉维斯CI](http://img.shields.io/travis/Sickboy78/ioBroker.sureflap/master.svg)
![应用程序](https://ci.appveyor.com/api/projects/status/github/Sickboy78/ioBroker.sureflap?branch=master&svg=true)
![新产品管理](https://nodei.co/npm/iobroker.sureflap.png?downloads=true)

<p align="center"> <img src="admin/sureflap.png" /> </p>

# IoBroker.sureflap
## 适用于 SureFlap® 猫和宠物皮瓣的适配器来自 Sure Petcare®
<p align="center"> <img src="/admin/SureFlap_Pet_Door_Connect_Hub_Phone.png" /> </p>

＃＃ 配置
在适配器配置页面上从您的 Sure Petcare® 帐户添加用户名和密码。

＃＃ 描述
适配器提供有关猫襟翼或喂食器的设置和状态的信息。

它还显示您的宠物的位置。

### 可变值
以下状态可以更改并将在您的设备上生效，分别反映在您的 Sure Petcare® 应用程序中。

|状态 |说明 |允许值 |
|-------|-------------|----------------|
| home_name.hub_name.control.led_mode |设置集线器 LED 的亮度 | **0** - 关闭<br>**1** - 高<br>**4** - 变暗 |
| home_name.hub_name.flap_name.control.curfew |启用或禁用配置的宵禁<br>（宵禁必须通过应用程序配置）| **真** 或 **假** |
| home_name.hub_name.flap_name.control.lockmode |设置锁定模式 | **0** - 打开<br>**1** - 锁定<br>**2** - 锁定<br>**3** - 关闭（进出锁定）|
| home_name.hub_name.flap_name.assigned_pets.pet_name.control.type |为指定的宠物和襟翼设置宠物类型 | **2** - 户外宠物<br>**3** - 室内宠物 |
| home_name.hub_name.feeder_name.control.close_delay |设置送料器盖的关闭延迟| **0** - 快<br>**4** - 正常<br>**20** - 慢 |
| home_name.pets.pet_name.inside |设置你的宠物是否在里面| **真** 或 **假** |

＃＃＃ 结构
适配器创建以下层次结构：

适配器<br>├ 户名<br>│ ├ hub_name<br> │ │ ├ 在线<br>│ │ ├ 控制<br>│ │ │ └ led_mode<br> │ │ ├ feeder_name<br> │ │ │ ├ 电池<br>│ │ │ ├ 电池百分比<br>│ │ │ ├ 在线<br>│ │ │ ├assigned_pets<br> │ │ │ │ └ pet_name<br> │ │ │ ├ 碗<br>│ │ │ │ └ 0..1<br> │ │ │ │ ├ food_type<br> │ │ │ │ ├ 目标<br>│ │ │ │ └ 重量<br>│ │ │ └ 控制<br>│ │ │ └ close_delay<br> │ │ └ 襟翼名称<br>│ │ ├ 电池<br>│ │ ├ 电池百分比<br>│ │ ├ curfew_active<br> │ │ ├ 在线<br>│ │ ├ 控制<br>│ │ │ ├ 宵禁<br>│ │ │ └ 锁模<br>│ │ ├ 宵禁<br>│ │ │ └ 0..i<br> │ │ │ ├ 启用<br>│ │ │ ├ 锁定时间<br>│ │ │ └unlock_time<br> │ │ ├ last_curfew<br> │ │ │ └ 0..i<br> │ │ │ ├ 启用<br>│ │ │ ├ 锁定时间<br>│ │ │ └ 解锁时间<br>│ │ └assigned_pets<br> │ │ └ 宠物名称<br>│ │ └ 控制<br>│ │ └ 型<br>│ ├ 历史<br>│ │ └ 0..24<br> │ │ └ ...<br> │ └ 宠物<br>│ └ 宠物名称<br>│ ├ 里面<br>│ ├ 姓名<br>│ ├ 自从<br>│ └ 食物<br>│ ├ last_time_eaten<br> │ ├ time_spent<br> │ ├ times_eaten<br> │ └ 干..湿<br>│ └ 重量<br>└ 信息<br>├ all_devices_online<br> ├ 连接<br>└ last_update<br>

## 注释
SureFlap® 和 Sure Petcare® 是 [SureFlap 有限公司](https://www.surepetcare.com/) 的注册商标

猫瓣、集线器和智能手机应用程序的图片可从 [Sure Petcare®](https://www.surepetcare.com/en-us/press) 免费使用。

## Changelog

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

Copyright (c) 2021 Sickboy78 <asmoday_666@gmx.de>

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