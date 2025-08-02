---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.procon-ip/README.md
title: ioBroker.procon-ip
hash: r3v1HpHgaM6AreOp4sP/GcYQi40K77lrb7cpjns6LB0=
---
![标识](https://github.com/ylabonte/ioBroker.procon-ip/blob/master/admin/procon-ip.png?raw=true)

![安装数量](http://iobroker.live/badges/procon-ip-installed.svg)
![当前稳定版本](http://iobroker.live/badges/procon-ip-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.procon-ip.svg)
![已知漏洞](https://snyk.io/test/github/ylabonte/ioBroker.procon-ip/badge.svg)
![下载](https://img.shields.io/npm/dm/iobroker.procon-ip.svg)

# IoBroker.procon-ip
[![测试与发布]（https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml/badge.svg）](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml)

ioBroker 适配器适用于 Pool Digital ProCon.IP 游泳池控制器。
它旨在与您的 ioBroker 家庭自动化集成，例如
构建涉及其他设备的逻辑或与您最喜欢的语音助手配对：

* 您可以使用 [_cloud_](https://github.com/ioBroker/ioBroker.cloud) 或

[物联网](https://github.com/ioBroker/ioBroker.iot) Alexa 适配器（我认为还有 Google Home）和

* [_yahka_](https://github.com/jensweigele/ioBroker.yahka) 适配器作为桥梁

Apple HomeKit 可以通过 Siri 或

* 使用 [_javascript_](https://github.com/ioBroker/ioBroker.javascript)

适配器来构建您自己的自定义逻辑。

请参阅[维基百科](https://github.com/ylabonte/ioBroker.procon-ip/wiki)以了解更多信息。

## 什么是 ProCon.IP 池控制器？
ProCon.IP 泳池控制器是一款适用于家庭泳池的低成本网络附加控制单元。借助软件切换继电器，它可以控制多个泵（用于泳池过滤器和不同的剂量方面），这些泵既可以简单地按时间表进行计划，也可以根据其众多测量输入通道之一的读数/值进行控制（例如，输入/输出流量传感器、Dallas 1-Wire 温度计、氧化还原和 pH 电极）。至少还有按需切换这些继电器的选项，这使得它们也适用于打开/关闭灯（或任何其他您想要的东西）。
并非所有功能都可以通过 API 访问。事实上，有一个记录的 API 用于读取（轮询）CSV 值（`/GetState.csv`）。在我的记忆中，还有另一个 API 用于打开/关闭和打开继电器（使用计时器）。但我再也找不到第二个了。所以即使不漂亮，但功能齐全：ProCon.IP 有两个本机 Web 界面，可以对其进行分析，以某种方式对给定功能进行逆向工程（例如切换继电器）。

有关详细信息，请参阅以下链接（抱歉，只有德语；到目前为止还没有找到英文文档/信息）：

* [pooldigital.de 网上商店](https://pooldigital.de/poolsteuerungen/procon.ip/35/procon.ip-webbasierte-poolsteuerung-/-dosieranlage)
* [pooldigital.de 论坛](https://www.poolsteuerung.de/)

**需要说明的是：我与泳池控制单元的开发、销售、营销或支持无关。我只是开发了一种解决方案，将其与 ioBroker 集成，使我父母的家变得更智能。**

## 适配器的详细信息
适配器使用 ProCon.IP 的 `/GetState.csv` API 来轮询其值，并使用另一个未记录的 API，该 API 使用按位命令来切换继电器。ProCon.IP 的原始 Web 界面也使用第二个 API。因此，将来可能会有固件升级，这会破坏与此适配器的兼容性，或者至少破坏其切换继电器的功能。

＃＃＃ 兼容性
目前，该适配器已与 ProCon.IP 固件**修订版 1.7.6.a** 结合测试和开发。但它应该可以与任何先前更新/即将推出的固件版本配合使用。

## 发展与参与
如果您希望参与此适配器的开发、翻译或文档编写，请随时联系我。

有关该方法的有用链接如下

* [TypeScript 适配器模板](https://github.com/ioBroker/ioBroker.template/tree/master/TypeScript)

我已经从和

* [适配器开发人员指南](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md)。

## 捐赠
如果您想支持此适配器或表示感谢，您可以：

[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="给我买杯咖啡" style="height: 40px !important;width: 144px !important;" >](https://www.buymeacoffee.com/ylabonte)

## Changelog
### 1.6.0 (2024-09-08)
* Fix versioning according to prior changes in requirements (should have happened with v1.5.5).
  * Raise minimum required js-controller version to 5.0.19.
  * Raise minimum required node version to 20.
* Dependency updates.

### 1.5.5 (2024-08-19)
* Dependency updates.
* Raise minimum required js-controller version to 5.0.19.
* Raise minimum required node version to 18.
* Fix minor issues reported by the ioBroker adapter bot (https://github.com/ylabonte/ioBroker.procon-ip/issues/102).

### 1.5.4 (2024-02-27)
* Fix the last issues that were reported by the ioBroker adapter checker.  
  (Includes a minor optimization in implementation.) 
* Update [procon-ip package](https://github.com/ylabonte/procon-ip) to the 
  latest version.

### 1.5.3 (2024-02-27)
* Update dependencies.

### 1.5.2 (2024-02-13)
* Add newline before descriptive text in adapter config.
* Update dependencies.

### 1.5.1 (2023-09-05)
* Re-translate adapter config.
* Cleanup adapter code.
* Update dependencies.

### 1.5.0 (2023-08-31)
* Breaking backward compatibility: For older installations, this update may
  require an adapter reconfiguration.
* Require `js-controller >=3.0.0`: Remove support for obsolete credential 
  encryption mechanisms (in favor to ioBroker's native encryption mechanism).
* Require `iobroker.admin >=5.0.0`: Replace old-fashioned materialize admin 
  interface with a newer JSON defined one. 

### 1.4.0 (2023-08-21)
* Add generic relay timers
  (relays must be set to 'auto' for the timer to function).
* Update dependencies.

### 1.3.3 (2023-07-13)
* Update dependencies.

### 1.3.2 (2023-07-10)
* Update dependencies.
* Adapter Icon change.

### 1.3.1 (2023-06-12)
* re-add read-only restrictions on `onOff` states of dosage control relays.
* Add writable numeric `dosage` states to trigger timer-based manual dosage.

### 1.3.0 (2023-06-11)
* Remove restrictions on dosage control relays: enable manual switching.
* Add additional boolean states for dosage control information:
  `info.system.chlorineDosageEnabled`, `info.system.phPlusDosageEnabled`, 
  `info.system.phMinusDosageEnabled`, `info.system.electrolysis` (formerly 
  only available as combined bit-state/integer value 
  `info.system.dosageControl` as delivered by the GetState.csv).
* Update dependencies.

### 1.2.3 (2023-04-29)
* Update dependencies.

### 1.2.2 (2023-01-08)
* Update dependencies.

### 1.2.1 (2022-03-28)
* Fix connection problem (see [related issue](https://github.com/ylabonte/ioBroker.procon-ip/issues/29)).

### 1.2.0 (2022-03-07)
* Update `procon-ip` API library package to v1.3.2  
  (should fix a bug that let the relay switching fail).
* Fix minor issues that occur with invalid controller URLs.
* Update further dependencies.

### 1.1.1 (2021-09-05)
* Move API library sources into a [separate package](https://www.npmjs.com/package/procon-ip).
* Update `common.name` attributes when the corresponding label changes.
* Update dependencies.

### 1.0.2 (2020-09-05)
* Fine tune the polling and control requests 
  (add additional adapter settings for this).
* Wait a configurable amount of consecutive errors, before raising the log 
  level to _Warning_ for polling requests.
* Try to send control commands two more times, if an error occurs on the 
  request. 

### 1.0.1 (2020-08-16)
* Fix Object State updates.
  For some reason the two js objects used to compare the before and after 
  values of the GetState.csv calls became the same object (before was 
  referencing the new values). That caused the adapter to never update the
  object states.

### 1.0.0 (2020-08-15)
* Official release in ioBroker adapter repository:  
  The most exciting change with this release is, that it's available from the
  ioBroker adapter repository. Hence you can just install it, without copy/
  pasting the github repo url of this adapter!
* Fix all open [milestone issues](https://github.com/ylabonte/ioBroker.procon-ip/milestone/1)
  especially regarding the ones resulted from the [adapter review](https://github.com/ioBroker/ioBroker.repositories/pull/756#issuecomment-646988248)).
* Add/Extend documentation
  (see [wiki](https://github.com/ylabonte/ioBroker.procon-ip/wiki)).  
  Now it's up to you to extend the wiki or request me using issues to extend
  the wiki or README.md regarding a specific content.

### 0.4.1 (2020-05-29)
* Fix write actions to the appropriate states of external relays.  
  _This will add auto-recognition on whether the external relays are activated
  or not and therefore decide on how to handle write actions to the
  corresponding relay state._

### 0.4.0 (2020-05-10)
* Add encryption for configuration settings stored in ioBroker's internal db.
* Improve http request/connection error handling.
* Reduce logging output.
* Remove the unused admin tab.

### 0.3.1 (2020-05-04)
* Update dependencies including some reported as vulnerable.
* Add connection status indication for iobroker's instance tab.
* Add form validation for the configuration settings.

### 0.2.0 (2020-02-09)
* Update npm dependencies.
* Group admin settings input fields in rows.

### 0.1.1 (2019-09-12)
* Update vulnerable eslint-utils.

### 0.1.0 (2019-07-21)
* Fix object attributes regarding the cloud adapter.
* Pre-defined `smartName` attributes for active relays and temperature
  sensors.
* Recognize relays with 'light', 'licht' or 'leucht' in its name as
  `smartType` _LIGHT_.

### 0.0.4 (2019-07-17)
* Update `lodash` (pinning version `4.17.14`).
* Update other indirect and direct dependencies.

### 0.0.3 (2019-07-16)
* Fix missing `value` states.
* Reduce logging output.

### 0.0.2 (2019-07-09)
* Fix sys info state values.

### 0.0.1 (2019-07-09)
* All information from `GetState.csv` as readonly states.
* Writable states for all relays to toggle auto/manual.
* Writable states for relays not configured for dosage control to toggle 
  on/off.

## License
The MIT License (MIT)

Copyright (c) 2019-2024 ylabonte <yannic.labonte@gmail.com>