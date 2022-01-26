---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.esphome/README.md
title: ioBroker.esphome
hash: xAXrVlj1KEjp5T55pPs4+ScYfjFy9mDtGyQ5Z/srTLE=
---
![NPM 版本](http://img.shields.io/npm/v/iobroker.esphome.svg)
![下载](https://img.shields.io/npm/dm/iobroker.esphome.svg)
![安装数量（最新）](http://iobroker.live/badges/esphome-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/esphome-stable.svg)
![依赖状态](https://img.shields.io/david/DrozmotiX/iobroker.esphome.svg)
![已知漏洞](https://snyk.io/test/github/DrozmotiX/ioBroker.esphome/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.esphome.png?downloads=true)

<img src="./admin/esphome.png" width="10%" height="10%" align="center">

# IoBroker.esphome
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/ESPHome/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**测试：** ![测试和发布](https://github.com/DrozmotiX/ioBroker.esphome/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

## 用于 ioBroker 的 ESPHome 适配器
使用由 ESPHome 创建和管理的简单而强大的配置文件来控制您的 ESP8266/ESP32。
ESPHome 托管设备（包括仪表板）通过其本机 API 进行本机集成，并确保所有数据同步（实时事件处理，无数据轮询！:)

![商标](../../../en/adapterref/iobroker.esphome/admin/img/dashboard.png)

此适配器使用 [esphome-native-api](https://github.com/Nafaya/esphome-native-api#readme) @Nafaya 与 [ESPHome API 交互]](https://esphome.io/components/api.html?highlight=api)!

## [文档](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/)
我们所有的适配器文档都可以在 [DrozmotiX 文档页面](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/) 找到

## 先决条件
    * NodeJS >= 12.x
    * Python >=3.7, <4.0
    * API 在 YAML 中激活
    * 对于管理选项卡（可选）
        * ESPHome Dashboard IP 在实例设置中提供

### 在 YAML 中激活 API
```
api:
  password: 'MyPassword'
```

### 示例配置
示例配置，更多示例见[DrozmotiX 文档页面](https://DrozmotiX.github.io) 或 [ESPHome 文档](https://esphome.io/index.html)

<details><summary>显示示例配置</summary>

esphome：名称：sensor_badkamer 平台：ESP32 开发板：esp-wrover-kit

wifi：use_address：192.168.10.122 ssid：“xxxxx” 密码：“xxxxxx”

    # 启用ESPHome API
api：密码：'我的密码'

# 激活 i2c 总线 i2c: sda: 21 scl: 22 scan: True id: bus_a
    # bh1750 的示例配置
    传感器：

      - 平台：bh1750

名称：“Hal_Illuminance” 地址：0x23measurement_time：69 update_interval：10s

    # GPIO 输出的示例配置
    输出：

      - 平台：gpio

引脚：12 倒置：真实 id：gpio_12

    # 示例配置将交换机链接到先前定义的输出
    转变：

      - 平台：输出

名称：“通用输出”输出：'gpio_12' </details>

## Tasmota / ESPEasy 迁移
从以前的 Sonoff Tasmota 或 ESPEasy 设置迁移非常容易。您只需要让 ESPHome 为您创建一个二进制文件，然后将其上传到 Web 界面中。
有关更多详细信息，请参阅我们的 [文档页面](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/06.migration.html)

.. 笔记：：

    生成的 yaml 文件存储在 ```/opt/iobroker/node_modules/iobroker.esphome/config/>device<.yaml```

＃＃ 支持我
如果您喜欢我的作品，请考虑个人捐赠（这是 DutchmanNL 的个人捐赠链接，与 ioBroker 项目无关！）[![捐赠](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/main/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### 0.2.2 (2021-06-24)
* (DutchmanNL) [!!! Breaking !!!] Make YAML file persistent, backup your configuration before updating ! solves [#57](https://github.com/DrozmotiX/ioBroker.esphome/issues/57)
* (DutchmanNL) Update ESPHome Dashboard to 1.18.0, requires  Python >=3.7 (and ensure <4.0!)
* (DutchmanNL) Bugfix : Reconnect to devices without autodiscovery / MDNS-Broadcast in network, solves [#66](https://github.com/DrozmotiX/ioBroker.esphome/issues/66)

### 0.2.1-1 (2021-03-30)
* (DutchmanNL) add cover component
* (DutchmanNL) add transitionLength for lights

### 0.2.1-0 (2021-03-30)
* (DutchmanNL) Logging improved, solves [#48](https://github.com/DrozmotiX/ioBroker.esphome/issues/48)
* (DutchmanNL) Name of states changed, solves [#49](https://github.com/DrozmotiX/ioBroker.esphome/issues/49)

### 0.2.0 (2021-03-29)
* (DutchmanNL) Translations updated
* (DutchmanNL) Configuration page updated
* (DutchmanNL) Added to sentry error reporting
* (DutchmanNL) Native integration of ESPHome Dashboard added

### 0.1.5 (2021-03-21)
* (DutchmanNL) Add Translations

### 0.1.4 (2021-03-19)
* (DutchmanNL) Implemented RGBW
* (DutchmanNL) Ensure correct encryption and storage of passwords
* (DutchmanNL) Proper value ranges for type light (255 instead 100)
* (DutchmanNL) Implemented hex color state for type light (if RGB is available)

### 0.1.2 (2021-03-02)
* (DutchmanNL) Type Fan added
* (DutchmanNL) Type Light added
* (DutchmanNL) Error messages optimized
* (DutchmanNL) Device reconnect handling improved
* (DutchmanNL) [Breaking!] Change state name to default "state" for type BinarySensor / Climate / Sensor / TextSensor & Switch  
* (DutchmanNL) Autodiscovery improved, non-ESPHome devices excluded

### 0.1.0 (2021-02-27)
* (DutchmanNL) Autodiscovery implemented
* (DutchmanNL) Type Climat added
* (DutchmanNL) Type TextSensor added
* (DutchmanNL) Solved reconnection issues
* (DutchmanNL) Optimized error messages for unknown types
* (DutchmanNL & @xXBJXx) Adapter configuration page optimized

### 0.0.1
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2021 DutchmanNL <rdrozda86@gmail.com>

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