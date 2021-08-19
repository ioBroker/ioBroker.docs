---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zoe2/README.md
title: iobroker.zoe2
hash: xATBsHPQs9reFoRoo/mvwZcvKKOax41Is81G+jX0Plc=
---
![标识](../../../en/adapterref/iobroker.zoe2/admin/zoe.png)

![构建状态](https://travis-ci.org/fungus75/ioBroker.zoe2.svg?branch=master)
![已知漏洞](https://snyk.io/test/github/fungus75/ioBroker.zoe2/badge.svg)
![下载](https://img.shields.io/npm/dm/iobroker.zoe2.svg)
![执照](https://img.shields.io/github/license/fungus75/ioBroker.zoe2)

# Iobroker.zoe2
=================

**测试：**

**下载**

**执照：**

**特点：** [![功能请求](https://feathub.com/fungus75/ioBroker.zoe2?format=svg)](https://feathub.com/fungus75/ioBroker.zoe2)

简单的 ioBroker-Adapter 从雷诺 ZOE 获取一些基本值并在 ioBroker 中使用它。

重要的！！！如果您从 0.2.2 之前的版本更新，则必须重新输入密码，因为从 0.2.2 开始的密码已保存加密！！！

请注意：此适配器使用与 MY RENAULT 应用程序相同的 API。但在使用此适配器之前，您必须设置我的 RENAULT 应用程序才能工作。即在 Android 上：https://play.google.com/store/apps/developer?id=RENAULT+SAS - 如果您想使用旧的 api，请使用 https://github.com/fungus75/ioBroker.zoe反而。

请注意：这是一个非常早期的发展状态，使用您自己的风险

请注意：在对适配器进行任何更新后，转到设置屏幕，更改某些内容以启用保存，将其改回并点击保存！

如果此适配器在 ioBroker-Admin-View 上不可用，请使用以下命令安装它（从 ioBroker-Server 上的命令行）：

```npm install https://github.com/fungus75/ioBroker.zoe2/tarball/master/```

或者，您可以在 Adapter-View 中使用 GitHub-Button（标记为：从自己的 URL 安装）并在“其他”-选项卡上输入此 URL。这也可用于更新到当前的适配器版本：

```https://github.com/fungus75/ioBroker.zoe2/tarball/master/```

（如果此网址不起作用，请改用 https://github.com/fungus75/ioBroker.zoe2.git）

您可以使用该方法将适配器更新到最新版本。

之后，适配器应显示在 ioBroker-Admin-View 中。

＃＃＃ 配置
- 您必须像在我的雷诺应用程序中一样设置用户名、密码和 VIN
- 此语言环境（“Laenderversionen”）目前可以正常工作：de_DE
- 也许您需要来自雷诺的 My-Z.E.Connect 或类似服务才能使用它
- 保存后大约需要 15 分钟来创建对象（zoe.0 等）

＃＃＃ 特征
- 从 Zoe 读取此参数：
   - Charge_level 百分比
   - 作为布尔值收费
   - 作为布尔值插入
   - 以公里为单位的剩余范围
   - 剩余充电时间
   - 计算的充电终点（charge_finished_at）
   - 电池温度
   - 外部温度（不是那么准确）
   - 充电功率
   - 电池容量
   - 电池可用能量
   - gpsLatitude 和 gpsLongitude，仅适用于较新的 ZOE
- 写这个参数：
   - preconNow：启动 precon/hvac（向该节点写入 true，或按下按钮）
   -chargeCancel：停止充电
   -chargeEnable：启用充电

控制充电：

通过两个按钮chargeCancel 和chargeEnable 可以控制充电功能。如果按下chargeCancel（或向该参数写入true），则禁用充电功能。如果连接了电源线，ZOE 不应充电。在我的第一代 ZOE 上这没有影响，所以也许它适用于较新的 ZOE？

一旦按下chargeEnable（或将此参数写入true），充电功能应再次工作。

这是如何完成的：chargeEnable 创建一个充电计划，该计划从您每天在设置屏幕中定义的给定时间开始并持续 15 分钟。这看起来是要设置的最短数量。当前 API（或当前 API 的已知部分）无法完全关闭充电。

某些参数仅适用于较新的 ZOE。

### Testet 与以下 ZOE：
- 佐伊第 2 阶段（感谢 Jack-RK-24）
- Zoe R210（第一代，由 fungus75 测试）
- 佐伊 R90（感谢 arturwolf）

＃＃＃ 请注意！！
与 ZOE 或 Renault-Services 的通信仅在 10 分钟的间隔时间内完成。
因此，如果您按 preconNow 或 chargeNow，它将在下一个时间间隔内将其发送到 ZOE，并且将在下一个时间间隔内恢复状态。

雷诺的新 ZOE API 似乎非常花边。这意味着它只在有重要事情时才显示新值。
据我所知，最重要的是电池电量。这意味着即如果汽车停在家中，则外部温度不会更新。只有当 i.E. ZOE 充电，外部温度将被更新。如果充电完成，仍然没有新的更新。驾驶时，电池电量会越来越低，因此应定期更新。

＃＃＃ 谢谢
https://michael-heck.net/index.php/elektromobilitaet/renault-zoe-ins-smarthome-integrieren, https://michael-heck.net/index.php/elektromobilitaet/renault-zoe-im-smarthome- neue-api-2020，https://muscatoxblog.blogspot.com/2019/07/delving-into-renaults-new-api.html，https://github.com/edent/Renault-Zoe-API，https： //github.com/jamesremuscat/pyze 和 https://github.com/hacf-fr/renault-api 为您提供出色的文档和工作。

## Changelog

### 0.2.3 (2021-07-29)
- Code Adjustments, Error-Handling


### 0.2.2 (2021-07-26)
- Store Password Encrypted (You have to reset it, if updating from older version)

### 0.2.1 (2021-07-23)
- Code optimisation 

### 0.2.0 (2021-02-12)
- Adapter supports compact mode (required if adapter should be listed in official repo)

### 0.1.5 (2021-02-09)
- bugfix gigya parameter changed https://github.com/fungus75/ioBroker.zoe2/issues/17

### 0.1.4 (2021-02-05)
- added: kamereonapikey as setup parameter because it changed by Feb. 1st
- added: stopChargeWorkaroundHour: Because the API has no feature to stop charging, the stop-charging button starts scheduled charging to a very uncommon time. Configure the hour with that parameter
- bugfix https://github.com/fungus75/ioBroker.zoe2/issues/15
- bugfix https://github.com/fungus75/ioBroker.zoe2/issues/16
- bugfix https://github.com/fungus75/ioBroker.zoe2/issues/14

### 0.1.3 (2020-11-17)
- added: setup-value useHVACApi, see https://github.com/fungus75/ioBroker.zoe2/issues/10

### 0.1.2 (2020-07-28)
- changed: call charge-start API when "pressed" chargeEnable. Hopefully it helps on older ZOEs

### 0.1.1 (2020-07-18)
- added chargeCancel and chargeEnable. See "controll charging"

### 0.1.0 (2020-07-03)
- bugfix: https://github.com/fungus75/ioBroker.zoe2/issues/6, thanks to https://github.com/damack

### 0.0.9 (2020-06-25)
- added: getLocation can be turned on/off in config (useful for older ZOEs which do not allow getLocation)

### 0.0.8 (2020-06-18)
- bugfix: https://github.com/fungus75/ioBroker.zoe2/issues/2
- bugfix: https://github.com/fungus75/ioBroker.zoe2/issues/3

### 0.0.7 (2020-06-18)
- bugfix: https://github.com/fungus75/ioBroker.zoe2/issues/2
- added: gpsLatitude
- added: gpsLongitude 

### 0.0.6 (2020-04-30)
- added: chargingPower
- added: batteryCapacity
- added: batteryAvailableEnergy
- changed: Using battery-status v2 API (supplies better values for newer ZOEs, thanks Jack-RK-24 for testing)

### 0.0.5 (2020-04-29)
- added: config-paramter ignore API error (when set, the Adapter tries to ignore some API-Errors)

### 0.0.4 (2020-04-21)
- added: preconNow => starts precon (hvac)

### 0.0.3 (2020-04-16)
- added: totalMileage

### 0.0.2 (2020-04-15)
- first working version for github
- reads out some values (as shown in the Features list)

### 0.0.1 (2020-04-06)
- nonworking version, just to create initial repo on github
- code taken 1:1 from iobroker.zoe
- small adjustments, first access to the new renault api

## License
The MIT License (MIT)

Copyright (c) 2021 RenePilz <rene@pilz.cc>

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