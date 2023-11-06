---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.esphome/README.md
title: ioBroker.esphome
hash: brop47b6AkIPnnPCn7pqlRZ51YIu/FdYQHtS4QKGH4g=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.esphome.svg)
![下载](https://img.shields.io/npm/dm/iobroker.esphome.svg)
![安装数量（最新）](http://iobroker.live/badges/esphome-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/esphome-stable.svg)
![依赖状态](https://img.shields.io/david/DrozmotiX/iobroker.esphome.svg)
![已知漏洞](https://snyk.io/test/github/DrozmotiX/ioBroker.esphome/badge.svg)
![国家公共管理](https://nodei.co/npm/iobroker.esphome.png?downloads=true)

<img src="./admin/esphome.png" width="10%" height="10%" align="center">

# IoBroker.esphome
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/ESPHome/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**测试：** ![测试与发布](https://github.com/DrozmotiX/ioBroker.esphome/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。

## IoBroker 的 ESPHome 适配器
使用 ESPHome 创建和管理的简单而强大的配置文件来控制您的 ESP8266/ESP32。
通过其本机 API 对 ESPHome 托管设备（包括仪表板）进行本机集成，并确保所有数据同步（实时事件处理，无数据轮询！:)

![标识](../../../en/adapterref/iobroker.esphome/admin/img/dashboard.png)

此适配器使用[esphome-native-api](https://github.com/Nafaya/esphome-native-api#readme)，所有积分均归@Nafaya 与 [ESPHome API 交互](https://esphome.io/components/api.html?highlight=api)!

## [文档](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/)
我们所有的适配器文档均可在 [DrozmotiX 文档页面](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/) 中找到

## 先决条件
    * NodeJS >= 18.x
    * API 在 YAML 中激活
    * 对于管理选项卡（可选）
        * ESPHome Dashboard IP 在实例设置中提供

### 在 YAML 中激活 API
```
api:
  password: 'MyPassword'
```

### 配置示例
示例配置，更多示例请参见[DrozmotiX 文档页面](https://DrozmotiX.github.io) 或 [ESPHome 文档](https://esphome.io/index.html)

<details><summary>显示示例配置</summary>

esphome：名称：sensor_badkamer 平台：ESP32 板：esp-wrover-kit

wifi：使用地址：192.168.10.122 ssid：“xxxxx”密码：“xxxxxx”

    # 启用 ESPHome API
api: 密码: '我的密码'

# 激活i2c总线 i2c: sda: 21 scl: 22 scan: True id:bus_a
    # bh1750 的配置示例
    传感器：

      - 平台：bh1750

名称：“Hal_Illuminance” 地址：0x23 测量时间：69 更新间隔：10s

    # GPIO 输出的配置示例
    输出：

      - 平台：GPIO

引脚：12 反转：true id：gpio_12

    # 将交换机链接到先前定义的输出的示例配置
    转变：

      - 平台：输出

名称：“通用输出”输出：'gpio_12' </details>

## Tasmota / ESPEasy 迁移
从以前的 Sonoff Tasmota 或 ESPEasy 设置迁移非常容易。您只需让 ESPHome 为您创建一个二进制文件，然后将其上传到 Web 界面即可。
有关更多详细信息，请参阅我们的[文档页面](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/06.migration.html)

**_注意：_** 生成的 yaml 文件存储在 ```/opt/iobroker/iobroker-data/iobroker.esphome.>instance</>device<.yaml

＃＃ 支持我
如果您喜欢我的工作，请考虑个人捐赠（这是 DutchmanNL 的个人捐赠链接，与 ioBroker 项目无关！）[![捐赠](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/main/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
    * (DutchmanNL) 
-->
### 0.4.1 (2023-11-05)
* (DutchmanNL) Bugfix: Password / connection issues in previous beta resolves #179
* (DutchmanNL) Bugfix: Allow individual API password or encryption keys for devices, resolves #174
* (DutchmanNL) Support ESPHome device Encryption Key (you should migrate from API password to Encryption Key ! resolves #152)

### 0.4.0 (2023-11-03)
* (DutchmanNL) Added cleanup capability for unused channels & states after initialisation of device, resolves #39
* (DutchmanNL) Added button to info channel which allows to delete all offline devices from adapter tree. resolves #39
* (DutchmanNL) [Breaking] Backup strategy changed, requires [BackitUp v2.9.1](https://github.com/simatec/ioBroker.backitup) and activate option for ESPHome, fixes #129

### 0.3.2 (2023-11-01)
* (DutchmanNL) Improved error handling if devices are not reachable/disconnected
* (DutchmanNL) Bugfix: Allow control of brightness and color for light component, resolves #173

### 0.3.1 (2023-10-31)
* (DutchmanNL) Bugfix: Show online state of ESP Device correctly, resolves #106

### 0.3.0 (2023-10-31) - Bugfixes & Improvements
* (Dutchman & SimonFischer04) Several Bugfixes
* (SimonFischer04) Support type "select device"
* (DutchmanNL) ESPHome dashboard default disabled
* (SimonFischer04) Migrate to @2colors/esphome-native-api
* (DutchmanNL) Automatically create needed directories, resolves #168
* (SimonFischer04) Migrate usage of python to new structure, should solve all ESPHome Dashboard related installation issues

## License
MIT License

Copyright (c) 2023 DutchmanNL <rdrozda86@gmail.com>

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