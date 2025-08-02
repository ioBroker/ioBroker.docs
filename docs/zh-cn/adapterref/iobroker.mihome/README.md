---
local: true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mihome/README.md
title: ioBroker 小米家用适配器
hash: GmavLxm+klUaUCFI7o/yKJ8KJqOtoyN2RmgfJUQcojY=
---
![标识](../../../de/adapterref/iobroker.mihome/media/mihome.png)

# IoBroker 米家适配器 通过米家适配器，小米控制中心（网关）被集成到 ioBroker 系统中，从而使小米的各种传感器、开关等能够与 ioBroker 进行通信。
例如，网关的灯光和扬声器可以通过ioBroker进行控制。

＃＃ 要求
* Android或iOS设备上的Mi Home应用程序并激活本地网络功能
* 连接小米家庭网关
* ioBroker系统运营

### 安装米家APP并激活本地网络功能
＃＃＃＃ 安卓
* 在Android设备上下载、安装、打开并下载[Android App](https://play.google.com/store/apps/details?id=com.xiaomi.smarthome)

同意条款和条件。

* 选择*中国大陆*作为国家
* 通过*登录*创建一个帐户
* 登录成功后通过“+”添加设备
* 在*家庭安全*下选择“MI Control Hub”并按照说明进行操作

结果

* 成功集成网关后，屏幕右上角出现3个点

然后按*关于*

* 点击文字*插件版*以下10次
* 现在开发者模式已打开，并且应该在一定时间后打开

出现另外 2 个菜单项 > 如果没有，请重试

* 选择菜单项‘无线通讯协议’
* 打开顶部的滑动开关，记下密码并按“确定”确认。

> 稍后在 ioBroker 安装过程中将需要密码。

现在可以使用 `+` 字符来训练其他设备。

#### IOS
* 在iOS设备上下载、安装、打开并下载[iOS App](https://itunes.apple.com/de/app/mi-home-xiaomi-smarthome/id957323480?mt=8)

同意隐私政策

* 通过“个人资料”/“设置”/“国家/地区设置”选择国家/地区*大陆*。
* 通过*登录*创建一个帐户
* 登录成功后通过“+”添加设备
* 在*家庭安全*下选择“MI Control Hub”并按照说明进行操作

结果

* 成功集成网关后，屏幕右上角出现3个点

按下并按下*关于*

* 重复点击底部空白区域
* 现在开发者模式已打开，并且应该在一定时间后打开

出现更多菜单项 > 如果它不能立即工作，请重复这些步骤

* 选择第四个菜单项
* 打开顶部的滑动开关，记下密码并按“确定”确认。

> 稍后在 ioBroker 安装过程中将需要密码。

现在可以使用 `+` 字符训练其他设备。

### 路由器上的设置
在 About/Hub info 下，网关使用的网关的 IP 地址可以在 _localip_ 后面的文本中找到。在使用的路由器中，该IP应永久分配给网关。
如果您不想再通过应用程序操作已训练的设备，也可以在路由器中的所有设备训练完毕后关闭网关的上网功能。

### 支持的设备
以下列表并不完整：

- 网关 - 小米RGB网关
-sensor_ht - 小米温湿度
- 天气.v1 - 小米温度/湿度/压力
- 开关 - 小米无线开关
-sensor_switch.aq2 - 小米Aqara无线开关传感器
-sensor_switch.aq3 - 小米Aqara无线开关传感器
- 插头 - 小米智能插头
- 86plug - 小米智能墙插
- 86sw2 - 小米无线双墙壁开关
- 86sw1 - 小米无线单墙开关
- natgas - 小米米家霍尼韦尔气体报警探测器
- 烟雾 - 小米米家霍尼韦尔火灾报警探测器
- ctrl_ln1 - 小米Aqara 86防火墙一键开关
- ctrl_ln1.aq1 - 小米Aqara墙壁开关 LN
- ctrl_ln2 - 小米86零防火墙墙壁开关双键
- ctrl_ln2.aq1 - 小米Aqara墙壁开关LN双键
- ctrl_neutral2 - 小米有线双墙壁开关
- ctrl_neutral1 - 小米有线单墙壁开关
- 魔方 - 小米魔方
-sensor_cube.aqgl01 -小米魔方
- 磁铁 - 小米门磁
-sensor_magnet.aq2 - 小米Aqara门磁
- 窗帘 - 小米Aqara智能窗帘
- 运动 - 小米运动传感器
-sensor_motion.aq2 -小米Aqara运动传感器
-sensor_wleak.aq1 -小米Aqara水传感器
- ctrl_ln2.aq1 - 小米Aqara墙壁开关LN（双）
-remote.b286acn01 -小米Aqara无线遥控开关（双摇杆）
-remote.b1acn01 -小米Aqara无线遥控开关
- 振动 - 小米振动传感器
- wleak1 - 小米Aqara水传感器
- lock_aq1 - 小米锁

## IoBroker 米家适配器安装
进一步的设置只能通过 ioBroker 管理界面进行。
在*适配器*区域中搜索适配器并使用`+`符号进行安装。

![标识](../../../de/adapterref/iobroker.mihome/media/Adapter.png)

然后将打开以下配置窗口：

![标识](../../../de/adapterref/iobroker.mihome/media/Adapterconfig1.PNG)

输入上面在`Default Gateway Key`下确定的密码，然后通过*保存* *并关闭*关闭窗口。然后，正在运行的适配器应在 *Instances* 下显示为绿色：

![标识](../../../de/adapterref/iobroker.mihome/media/Instanz.PNG)

网关及其经过训练的设备现在显示在*对象*下：

![标识](../../../de/adapterref/iobroker.mihome/media/Objekte.PNG)

这些说明是根据我们所知和所信编写的。

## Changelog
### 1.4.0 (2022-03-10)
* (drtsb) Added two new aqara devices and some missing icons
* (VLGorskij) fixed the error messages for some states
* (Apollon77) Catch some errors reported by Sentry and users

### 1.3.7 (2021-01-22)
* (Apollon77) Prevent crash case (Sentry IOBROKER-MIHOME-A)

### 1.3.6 (2020-09-25)
* (VLGorskij) Added new device QBKG24LM

### 1.3.5 (2020-09-17)
* (Apollon77) Fix crash cases (Sentry IOBROKER-MIHOME-1..4)

### 1.3.4 (2020-08-31)
* (Alan) Fixed the crash for non existing attributes

### 1.3.3 (2020-08-26)
* (bluefox) Sentry is activated

### 1.3.2 (2020-08-25)
* (VLGorskij) Added ac-partner.v3 support
* (bluefox) Added compact mode

### 1.3.1 (2020-08-19)
* (Diginix) Fixed calculation for sensor's battery percentage

### 1.3.0 (2020-01-16)
* (algar42) Ability to add devices with missing model by their SID ([e.g. for Aqara two-channel relay](https://github.com/algar42/ioBroker.mihome#usage))

### 1.2.9 (2019-11-15)
* (Diginix) Fixed pressure range and values of Aqara weather sensor

### 1.2.8 (2019-07-18)
* (SchumyHao) Change curtain and gateway light role that making them can be detected by type-detector

### 1.2.7 (2019-06-25)
* (SchumyHao) Add several devices support for protocol 2.0.x

### 1.2.6 (2019-03-04)
* (Diginix) Improved calculation for sensor's battery percentage

### 1.2.5 (2019-01-24)
* (Vanwards) Added long click for Aquara wall switch

### 1.2.4 (2019-01-15)
* (SchumyHao) Add Chinese support

### 1.2.3 (2018-10-23)
* (goohnie) New wall switch was added

### 1.2.0 (2018-10-12)
* (bluefox) refactoring

### 1.1.2 (2018-10-08)
* (bluefox) New button switch was added

### 1.1.1 (2018-09-23)
* (bluefox) Fixed the creation of new devices

### 1.1.0 (2018-09-13)
* (bluefox) New devices added:  sensor_switch.aq3, ctrl_ln1.aq1, ctrl_ln2.aq1, sensor_cube.aqgl01, remote.b286acn01, vibration, wleak1, lock_aq1
* (bluefox) Names will be taken from gateway

### 1.0.7 (2018-06-25)
* (bluefox) The heartbeat timeout and the re-connection interval settings were added

### 1.0.6 (2018-05-26)
* (bluefox) Added new Aqara cube sensor

### 1.0.5 (2018-03-05)
* (bluefox) Xiaomi Aqara Wall Switch LN Double was added

### 1.0.4 (2018-01-21)
* (bluefox) The alarm state was fixed.

### 1.0.3 (2018-01-21)
* (bluefox) Invalid temperature values will be ignored

### 1.0.2 (2018-01-14)
* (bluefox) Ignore unknown state of sensors

### 1.0.0 (2018-01-05)
* (bluefox) Do not overwrite the names
* (bluefox) Ready for Admin3

### 0.3.3 (2017-11-26)
* (bluefox) Allow multiple mihome gateways

### 0.2.4 (2017-11-04)
* (bluefox) Add aqara water sensor

### 0.2.3 (2017-09-22)
* (bluefox) Remove "." from id of the device

### 0.2.2 (2017-08-01)
* (bluefox) Set after 300ms doublePress to false by Temperature Sensor\nAllow control of Plug

### 0.2.1 (2017-07-29)
* (bluefox) Implement double click on temperature sensor

### 0.2.0 (2017-07-18)
* (bluefox) fix battery level

### 0.1.4 (2017-06-09)
* (bluefox) add cube
* (bluefox) remove voltage by gateway

### 0.1.1 (2017-06-06)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2017-2022 bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.