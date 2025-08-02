---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ble/README.md
title: 无题
hash: VtCLTJIplbiAg5M+6VZox5WGQ1SG/s4ZYMNxZNe4Euw=
---
![安装数量](http://iobroker.live/badges/ble-stable.svg?break_cache=1)

<img src="admin/ble.png" height="48" />ioBroker.ble

=================

![构建状态](https://action-badges.now.sh/AlCalzone/ioBroker.tradfri)

监控蓝牙低功耗 (BLE) 信标并记录其信息。
目前，仅支持记录*公布的*服务数据。您可以使用 nRF Connect 应用程序（服务数据 UUID）监控公布的服务。
未来版本将支持连接和读/写服务特性。

＃＃ 安装
该适配器需要额外的库来编译。请参阅 https://github.com/sandeepmistry/noble#preventions 了解详细说明。
在 Raspberry Pi 和类似设备上，应该这样做：`sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev libcap2-bin`

如果适配器启动但无法连接到您的蓝牙硬件，请检查 ioBroker 中的`info.driverState`状态。如果是`unauthorized`，您需要授予`node`额外权限。对于 Linux，这很简单

```bash
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)
```

需要安装`libcap2-bin`。

＃＃ 配置
如果您的系统上有多个蓝牙设备，请从下拉列表中选择要使用的一个。
在下面的文本框中，输入您想要记录的广告服务的所有 UUID（如在 nRF Connect 应用程序中找到的）。

## 插件系统
该适配器支持通过插件进行扩展。这些定义了应该收听哪些广告服务以及如何翻译数据。插件结构在 https://github.com/AlCalzone/ioBroker.ble/blob/master/src/plugins/plugin.ts 中定义，并且此处定义了工作插件的示例 https://github.com/AlCalzone /ioBroker.ble/blob/master/src/plugins/_default.ts

如果您有任何通过广告传输特殊编码信息的设备，请随时使用新插件创建 PR。

### 支持的插件
* `“xiaomi”`：所有小米蓝牙传感器，包括
  * [花卉护理植物传感器](https://xiaomi-mi.com/sockets-and-sensors/xiaomi-huahuacaocao-flower-care-smart-monitor/)
  * [米家温湿度传感器](https://www.banggood.com/Xiaomi-Mijia-Bluetooth-Thermometer-Hygrometer-with-LCD-Screen-Magnetic-Suction-Wall-Stickers-p-1232396.html?cur_warehouse =美国）
  * [驱蚊剂](https://www.aliexpress.com/item/32883859984.html)
* `“mi-flora”`：花卉护理植物传感器的原始插件，现在别名为“xiaomi”`
* `"ruuvi-tag"`：[Ruuvi Tag](https://tag.ruuvi.com/) 多传感器，固件版本为 v1 和 v2。 **未经测试，请反馈！**
* `"bthome"`：使用 [BTHome](https://bthome.io) 协议的传感器。目前这仅限于协议的“v2”修订版，并且不支持加密数据包。

## Changelog
<!--
	Placeholder for next release:
	### __WORK IN PROGRESS__
-->
### 0.14.0 (2023-12-11)
* **BREAKING:** Dropped support for Node.js 16 and below
* Add support for the BTHome v2 protocol (unencrypted packets only)

### 0.13.4 (2023-07-06)
* Very experimental support for scanning on a remote host (#793)
* Another attempt at updating `noble`. Hopefully this version works now...

### 0.13.3 (2023-02-05)
* Updated `noble` again. This should fix the automatic rebuild after Node.js upgrades and the previous performance issues.

### 0.13.2 (2023-01-02)
* Downgraded the `noble` dependency again because of performance issues

### 0.13.1 (2022-12-19)
* Updated the `noble` dependency. This should fix the automatic rebuild after Node.js upgrades.

### 0.13.0 (2022-04-27)
* The option to allow recording new devices is now available in the config dialog. When the adapter starts, it will be disabled, and when enabled, it will be automatically disabled after 5 minutes (#730, #729)
* Fix: RSSI will now be updated, even if it was unchanged (#493)
* Dependency updates, lots of dependency updates...

### 0.12.0 (2020-10-29)
* Scanning is now done in a separate process, so uncatchable errors in `noble` no longer bring down the main process

### 0.11.8 (2020-08-25)
* The pressure value reported by Ruuvi Tags is now parsed with two decimal places

### 0.11.7 (2020-08-20)
* Added a more helpful error message if the adapter terminates with error `EAFNOSUPPORT`

### 0.11.6 (2020-05-07)
* Ignore unhandled out of range error somewhere in `noble`

### 0.11.4 (2020-04-23)
* Utilize JS-Controller's auto module rebuild if possible

### 0.11.3 (2020-04-22)
* Fixed a crash that happens when `noble` can not be loaded.

### 0.11.2 (2020-04-19)
* Avoid setting `undefined` as a state value to be compatible with JS-Controller 3.0

### 0.11.1 (2020-04-11)
* Fixed typo in Ruuvi Tag plugin: `motionCounter` -> `movementCounter`

### 0.11.0 (2020-03-25)
* Removed compact support. `noble` sometimes throws errors in callbacks that cannot be handled and would bring the whole compact group down.
* Added support for the Xiaomi Kettle
* Encrypted packets are no longer decoded (for now) to avoid creating thousands of `unknown (0xabcd)` states

### 0.10.1 (2019-10-13)
* Fixed crash in JS-Controller 2.0

### 0.10.0 (2019-09-26)
* `xiaomi` plugin: test the received data instead of relying on MAC prefixes

### 0.9.2 (2019-09-26)
* Add `e7:2e:00` as an alternative mac prefix for MiTemperature

### 0.9.1 (2019-09-22)
* Fix compact mode crashes

### 0.9.0 (2019-09-04)
* Devices without service data but with manufacturer data are no longer treated as empty
* `_default` plugin: Create states for manufacturer data
* `ruuvi-tag` plugin: Set `"Ruuvi Tag"` as the default name for the device object

### 0.8.4 (2019-09-03)
* `ruuvi-tag` plugin: Fix parsing of data format 3 and 5

### 0.8.3 (2019-08-26)
* Add `80:ea:ca` as an alternative mac prefix for FlowerCare

### 0.8.2 (2019-08-14)
* Add `3f:5b:7d` as an alternative mac prefix for the Xiaomi watch

### 0.8.1 (2019-07-26)
* Added support for the Xiaomi Mosquito Repellent (read-only!)

### 0.7.4 (2019-07-03)
* Removed dependency to admin instance on slaves
* Several dependency updates

### 0.7.3 (2019-04-05)
* Add MiTemperature watch with E-Ink display

### 0.7.2 (2019-04-05)
* Add `58:2d:34` as an alternative mac prefix for MiTemperature

### 0.7.0 (2019-02-05)
* Support MaterializeCSS (Admin v3)
* Support compact mode
* Use @iobroker/testing for tests

### 0.6.0 (2018-12-23)
* Add NodeJS 10 support
* Add an option to disallow new devices

### 0.5.5 (2018-11-29)
* Bugfix: Preserving object properties works again

### 0.5.3 (2018-11-23)
* Cache objects for a short while instead of retrieving them from ioBroker all the time
* Support negative temperatures from Xiaomi devices

### 0.5.2 (2018-03-28)
* Fixed `isHandling` for the `ruuvi-tag` plugin

### 0.5.1 (2018-03-28)
* Restored accidentally deleted `mi-flora` plugin.

### 0.5.0 (2018-03-27)
* (JonasR & AlCalzone) Added support for the Ruuvi Tag with the `ruuvi-tag` plugin

### 0.4.2 (2018-03-27)
* Fixed the parsing of temperature+humidity packets from the Xiaomi temperature sensor

### 0.4.1 (2018-03-24)
* Forgot to load legacy `mi-flora` plugin
* Fixed an error when a plugin defines no objects

### 0.4.0 (2018-03-24)
* (zuvielx9 & AlCalzone) Support for all Xiaomi bluetooth sensors using the `xiaomi` plugin
* reworked plugin system slightly

### 0.3.5 (2018-03-18)
* Bugfix: Next attempt at preserving object properties like history and name

### 0.3.4 (2018-01-01)
* Bugfix: Keep `history` settings by not overriding existing objects
* Bugfix: When plugins return `undefined`, ignore the packet

### 0.3.3 (2017-11-24)
* Enable logging of RSSI

### 0.3.2 (2017-09-27)
* Add * wildcard for "all services"

### 0.3.1 (2017-09-27)
* Bugfix: don't throw error when RSSI state doens't exist

### 0.3.0 (2017-09-27)
* Support throttling of RSSI updates

### 0.2.2 (2017-09-27)
* Bugfix: Only monitor services from _enabled_ plugins

### 0.2.1 (2017-09-27)
* Bugfix: last patch broke the service filtering

### 0.2.0 (2017-09-26)
* Modularized the adapter code into a plugin system
* Added Mi-Flora plugin

### 0.1.0 (2017-09-06)
* Support selection of bluetooth devices

### 0.0.2 (2017-09-06)
* Store more information, improved object structure.

### 0.0.1
* initial release

## License
The MIT License (MIT)

Copyright (c) 2017-2023 AlCalzone <d.griesel@gmx.net>

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