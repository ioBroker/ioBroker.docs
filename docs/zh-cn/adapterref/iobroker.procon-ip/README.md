---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.procon-ip/README.md
title: ioBroker.procon-ip
hash: aMNLji4uA9N1wUdcLx1o82psBHqm0anzKlD445qWJN0=
---
![适配器图标](../../../en/adapterref/iobroker.procon-ip/admin/procon-ip.png)

![安装数量](http://iobroker.live/badges/procon-ip-installed.svg)
![下载](https://img.shields.io/npm/dm/iobroker.procon-ip.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.procon-ip.svg)
![已知漏洞](https://snyk.io/test/github/ylabonte/ioBroker.procon-ip/badge.svg)
![给我买杯咖啡](https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg?style=flat)
![国家公共管理](https://nodei.co/npm/iobroker.procon-ip.png?downloads=true)

# IoBroker.procon-ip
[![测试和发布](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml)

## IoBroker 的 ProCon.IP 池控制适配器
ioBroker 适配器，用于 ProCon.IP 游泳池控制单元的基本支持。它旨在与您的 ioBroker 家庭自动化集成，例如。
构建涉及其他设备的逻辑或只是与您最喜欢的语音助手配对：

* 您可以使用 [_cloud_](https://github.com/ioBroker/ioBroker.cloud) 或

[_物联网_](https://github.com/ioBroker/ioBroker.iot) Alexa 适配器（我想还有 Google Home）和

* [_yahka_](https://github.com/jensweigele/ioBroker.yahka) 作为通往

  Apple HomeKit 可通过 Siri 或

* 使用 [_javascript_](https://github.com/ioBroker/ioBroker.javascript) 来

  构建您自己的自定义逻辑。

有关详细信息，请参阅[维基百科](https://github.com/ylabonte/ioBroker.procon-ip/wiki)。

### ProCon.IP 池控件是什么？
![图片来自pooldigital.de](https://www.pooldigital.de/shop/media/image/66/47/a5/ProConIP1_720x600.png)

ProCon.IP 泳池控制器是一款用于家庭泳池的低预算网络附加控制单元。借助其软件开关继电器，它可以控制多个泵（用于池过滤器和不同的剂量方面），或者根据时间表简单地计划，或者根据来自其许多输入通道之一的读数/值进行测量（例如，I/O 流量）传感器、Dallas 1-Wire 温度计、氧化还原和 pH 电极）。至少还可以选择根据需要切换这些继电器，这使得它们也适用于打开/关闭灯（或您想要的任何其他东西）。
并非所有功能都可以通过 API 访问。事实上，有一个已记录的 API 用于以 CSV 形式读取（轮询）值 (`/GetState.csv`)。在我的记忆中，还有另一种用于通过计时器打开/关闭继电器和打开继电器的功能。但我再也找不到第二个了。因此，虽然不漂亮，但功能齐全：ProCon.IP 有两个本机 Web 界面，可以对其进行分析，以对给定的功能进行某种逆向工程（例如切换继电器）。

有关更多信息，请参阅以下链接（抱歉，只有德语版本；到目前为止尚未找到英文文档/信息）：

* [pooldigital.de 网上商店](https://www.pooldigital.de/shop/poolsteuerungen/procon.ip/35/procon.ip-webbasierte-poolsteuerung-/-dosieranlage)
* [pooldigital.de 论坛](http://forum.pooldigital.de/)

**需要明确的是：我与泳池控制装置的开发、销售、营销或支持无关。我刚刚开发了一个解决方案，将其与 ioBroker 集成，让我父母的家变得更加智能。**

### 有关适配器的详细信息
该适配器使用 ProCon.IP 的`/GetState.csv` API 来轮询其值，并使用另一个（未记录的）API，该 API 通过按位命令操作来切换继电器。 ProCon.IP 的原始 Web 界面也使用第二个。因此，未来可能会有固件升级，以限制与该适配器的兼容性，或者至少限制其切换继电器的功能。

#### 兼容性
目前，该适配器已与 ProCon.IP 固件**版本 1.7.0.c** 结合进行了测试和开发。

## 路线图
计划上没有什么特别的。您可以创建一个问题来建议新特性/功能...

## 发展与参与
如果您希望参与此适配器的开发或文档编制，请随时与我联系。

该方法的有用链接将是

* [TypeScript 适配器模板](https://github.com/ioBroker/ioBroker.template/tree/master/TypeScript)

  我从 开始 和

* [适配器开发人员指南](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md)。

## Changelog
### Release v1.3.3
* Update dependencies.

### Release v1.3.2
* Update dependencies.
* Adapter Icon change.

### Release v1.3.1
* re-add read-only restrictions on `onOff` states of dosage control relays.
* Add writable numeric `dosage` states to trigger timer-based manual dosage.

### Release v1.3.0
* Remove restrictions on dosage control relays: enable manual switching.
* Add additional boolean states for dosage control information:
  `info.system.chlorineDosageEnabled`, `info.system.phPlusDosageEnabled`, 
  `info.system.phMinusDosageEnabled`, `info.system.electrolysis` (formerly 
  only available as combined bit-state/integer value 
  `info.system.dosageControl` as delivered by the GetState.csv).
* Update dependencies.

### Release v1.2.3
* Update dependencies.

### Release v1.2.2
* Update dependencies.

### Release v1.2.1
* Fix connection problem (see [related issue](https://github.com/ylabonte/ioBroker.procon-ip/issues/29))

### Release v1.2.0
* Update `procon-ip` API library package to v1.3.2  
  (should fix a bug that let the relay switching fail).
* Fix minor issues that occur with invalid controller URLs.
* Update further dependencies.

### Release v1.1.1
* Move API library sources into a [separate package](https://www.npmjs.com/package/procon-ip).
* Update `common.name` attributes when the corresponding label changes.
* Update dependencies

### Release v1.0.2
* Fine tune the polling and control requests 
  (add additional adapter settings for this).
* Wait a configurable amount of consecutive errors, before raising the log 
  level to _Warning_ for polling requests.
* Try to send control commands two more times, if an error occurs on the 
  request. 

### Release v1.0.1
* Fix Object State updates  
  For some reason the two js objects used to compare the before and after values
  of the GetState.csv calls became the same object (before was referencing the
  new values). That caused the adapter to never update the object states.

### Release v1.0.0
* Official release in ioBroker adapter repository:  
  The most exciting change with this release is, that it's available from the
  ioBroker adapter repository. Hence you can just install it, without copy/
  pasting the github repo url of this adapter!
* Fix all open [milestone issues](https://github.com/ylabonte/ioBroker.procon-ip/milestone/1)
  especially regarding the ones resulted from the [adapter review](https://github.com/ioBroker/ioBroker.repositories/pull/756#issuecomment-646988248))
* Add/Extend documentation
  (see [wiki](https://github.com/ylabonte/ioBroker.procon-ip/wiki)).  
  Now it's up to you to extend the wiki or request me using issues to extend
  the wiki or README.md regarding a specific content.

### Release v0.4.1
* Fix write actions to the appropriate states of external relays  
  _This will add auto-recognition on whether the external relays are activated
  or not and therefore decide on how to handle write actions to the
  corresponding relay state._

### Release v0.4.0
* Add encryption for configuration settings stored in ioBroker's internal db
* Improve http request/connection error handling
* Reduce logging output
* Remove the unused admin tab

### Release v0.3.1
* Update dependencies including some reported as vulnerable
* Add connection status indication for iobroker's instance tab
* Add form validation for the configuration settings

### Release v0.2.0
* Update npm dependencies
* Group admin settings input fields in rows

### Release v0.1.1
* Update vulnerable eslint-utils

### Release v0.1.0
* Fix object attributes regarding the cloud adapter
* Pre-defined `smartName` attributes for active relays and temperature
  sensors
* Recognize relays with 'light', 'licht' or 'leucht' in its name as
  `smartType` _LIGHT_ 

### Release v0.0.4
* Update `lodash` (pinning version `4.17.14`)
* Update other indirect and direct dependencies

### Release v0.0.3
* Fix missing `value` states
* Reduce logging output

### Release v0.0.2
* Fix sys info state values

### Release v0.0.1
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

Copyright (c) 2019-2023 Yannic Labonte <yannic.labonte@gmail.com>