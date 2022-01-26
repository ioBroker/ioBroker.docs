---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.procon-ip/README.md
title: ioBroker.procon-ip
hash: 9ybGLS8FLg/JAIpnt3fcmyEcSxL47ASj9n1b91qt3uE=
---
![标识](../../../en/adapterref/iobroker.procon-ip/admin/iobroker-procon-ip.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.procon-ip.svg)
![下载](https://img.shields.io/npm/dm/iobroker.procon-ip.svg)
![装置](http://iobroker.live/badges/procon-ip-installed.svg)
![依赖状态](https://img.shields.io/david/ylabonte/iobroker.procon-ip.svg)
![已知漏洞](https://snyk.io/test/github/ylabonte/ioBroker.procon-ip/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.procon-ip.png?downloads=true)

# IoBroker.procon-ip
[![测试和发布](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml)

## IoBroker 的 ProCon.IP 池控制适配器
ioBroker 适配器为 ProCon.IP 游泳池控制单元提供基本支持。它旨在与您的 ioBroker 家庭自动化集成，例如。
构建涉及其他设备的逻辑或只是与您最喜欢的语音助手配对：

* 您可以使用 [_cloud_](https://github.com/ioBroker/ioBroker.cloud) 或

[_物联网_](https://github.com/ioBroker/ioBroker.iot) Alexa 适配器（我认为还有 Google Home）和

* [_yahka_](https://github.com/jensweigele/ioBroker.yahka) 作为桥梁

  Apple HomeKit 可通过 Siri 或

* 使用 [_javascript_](https://github.com/ioBroker/ioBroker.javascript) 来

  构建您自己的自定义逻辑。

有关更多信息，请参阅 [维基](https://github.com/ylabonte/ioBroker.procon-ip/wiki)。

### ProCon.IP 池控制是什么？
![图片来自 pooldigital.de](https://www.pooldigital.de/shop/media/image/66/47/a5/ProConIP1_720x600.png)

ProCon.IP 泳池控制是家庭游泳池的低预算网络连接控制单元。凭借其软件开关继电器，它可以控制多个泵（用于池过滤器和不同剂量方面），或者按照时间计划简单地计划，或者根据其多个输入通道之一的读数/值进行测量（例如 I/O 流量传感器、Dallas 1-Wire 温度计、氧化还原和 pH 电极）。至少还可以选择按需切换这些继电器，这使得它们也适用于开/关灯（或任何您想要的任何东西）。
并非所有功能都可以通过 API 访问。事实上，有一个文档化的 API 用于读取（轮询）CSV 值（`/GetState.csv`）。在我的记忆中，还有另一个用于通过计时器打开/关闭和打开继电器。但是我再也找不到第二个了。因此，甚至不漂亮，但功能强大：ProCon.IP 有两个本机 Web 界面，可以对其进行分析，以对给定的功能进行某种逆向工程（例如切换继电器）。

有关更多信息，请参阅以下链接（对不起，它只有德语；到目前为止还没有找到英文文档/信息）：

* [pooldigital.de 网店](https://www.pooldigital.de/shop/poolsteuerungen/procon.ip/35/procon.ip-webbasierte-poolsteuerung-/-dosieranlage)
* [pooldigital.de 论坛](http://forum.pooldigital.de/)

** 需要说明的是：我与泳池控制单元的开发、销售、营销或支持无关。我刚刚开发了一个解决方案，将其与 ioBroker 集成，让我父母的家变得更智能。**

### 适配器的详细信息
适配器使用 ProCon.IP 的 `/GetState.csv` API 来轮询其值和另一个 - 未记录 - API，它使用按位命令操作来切换继电器。 ProCon.IP 的原始 Web 界面也使用第二个。因此，未来可能会有固件升级，与此适配器的制动器兼容性或至少它具有切换继电器的功能。

#### 兼容性
目前，该适配器已与 ProCon.IP 固件 ** 修订版 1.7.0.c** 结合进行测试和开发。

##路线图
### 1.x.x
计划中没有什么特别之处。您可以创建一个问题来建议新特性/功能...

**路线图上但未在 1.0.0 版本中实现的要点发生了什么变化？** 好吧，文档已经得到改进。
选项卡视图对我来说似乎很有趣。如果您喜欢这样的功能，请告诉我...
缺乏关于控制器功能的自动化测试是非常令人不快的，但现在的重点显然是变得稳定，并且为所有现有代码编写好的和有用的测试将花费大量时间（关于使用该软件项目的复杂性和目标群体），并可能以进一步重构而告终。所以它将是未来的东西，但不再与 1.0.0 版本相关。

## 发展和参与
如果您希望参与此适配器的开发或文档编制，请随时与我联系。

该方法的有用链接将是

* [TypeScript 适配器模板](https://github.com/ioBroker/ioBroker.template/tree/master/TypeScript)

  我从和开始

* [适配器开发人员指南](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md)。

## Changelog

### 1.1.0
Minor release:
* Move API library sources into a [separate package](https://www.npmjs.com/package/procon-ip).
* Update `common.name` attributes when the corresponding label changes.
* Update dependencies

### 1.0.2
Minor update (was accidentally released as patch, regarding the version number):
* Fine tune the polling and control requests 
  (add additional adapter settings for this).
* Wait a configurable amount of consecutive errors, before raising the log 
  level to _Warning_ for polling requests.
* Try to send control commands two more times, if an error occurs on the 
  request. 
**All point should reduce issues regarding irregular network disruptions.**

### 1.0.1
Hotfix release:
* Fix Object State updates  
  For some reason the two js objects used to compare the before and after values
  of the GetState.csv calls became the same object (before was referencing the
  new values). That caused the adapter to never update the object states.

### 1.0.0
Official release in ioBroker adapter repository:  
The most exciting change with this release is, that it's available from the
ioBroker adapter repository. Hence you can just install it, without copy/
pasting the github repo url of this adapter!
* Fix all open [milestone issues](https://github.com/ylabonte/ioBroker.procon-ip/milestone/1)
  especially regarding the ones resulted from the [adapter review](https://github.com/ioBroker/ioBroker.repositories/pull/756#issuecomment-646988248))
* Add/Extend documentation
  (see [wiki](https://github.com/ylabonte/ioBroker.procon-ip/wiki)).  
  Now it's up to you to extend the wiki or request me using issues to extend
  the wiki or README.md regarding a specific content.

### 0.4.1
Bugfix release:
* Fix write actions to the appropriate states of external relays  
  _This will add auto-recognition on whether the external relays are activated
  or not and therefore decide on how to handle write actions to the
  corresponding relay state._

### 0.4.0
Public release version:
* Add encryption for configuration settings stored in ioBroker's internal db
* Improve http request/connection error handling
* Reduce logging output
* Remove the unused admin tab

### 0.3.1
Functional and security update:
* Update dependencies including some reported as vulnerable
* Add connection status indication for iobroker's instance tab
* Add form validation for the configuration settings

### 0.2.0
Minor update:
* Update npm dependencies
* Group admin settings input fields in rows

### 0.1.1
Security update:
* Update vulnerable eslint-utils

### 0.1.0
Functional update and minor fixes:
* Fix object attributes regarding the cloud adapter
* Optimization for the cloud adapter
    * Pre-defined `smartName` attributes for active relays and temperature
      sensors
    * Recognize relays with 'light', 'licht' or 'leucht' in its name as
      `smartType` _LIGHT_ 

### 0.0.4
Security update:
* Update `lodash` (pinning version `4.17.14`)
* Update other indirect and direct dependencies

### 0.0.3
Bugfix release:
* Fix missing `value` states
* Reduce logging output

### 0.0.2
Bugfix release:
* Fix sys info state values

### 0.0.1
Initial release with following features:
* All information from `GetState.csv` as readonly states
* Writable states for all relays to toggle auto/manual
* Writable states for relays not configured for dosage control to toggle on/off

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

Copyright (c) 2021 Yannic Labonte <yannic.labonte@gmail.com>