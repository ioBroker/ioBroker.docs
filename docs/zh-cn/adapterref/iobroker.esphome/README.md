---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.esphome/README.md
title: ioBroker.esphome
hash: rSaf2RScDzW/5dH0RUT9HYH1WyMBbA/P+j6N78/8YSE=
---
![NPM 版本](http://img.shields.io/npm/v/iobroker.esphome.svg)
![下载](https://img.shields.io/npm/dm/iobroker.esphome.svg)
![安装数量（最新）](http://iobroker.live/badges/esphome-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/esphome-stable.svg)
![依赖状态](https://img.shields.io/david/DrozmotiX/iobroker.esphome.svg)
![已知漏洞](https://snyk.io/test/github/DrozmotiX/ioBroker.esphome/badge.svg)
![新公共管理](https://nodei.co/npm/iobroker.esphome.png?downloads=true)

<img src="./admin/esphome.png" width="10%" height="10%" align="center">

# IoBroker.esphome
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/ESPHome/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**测试：**![测试和发布](https://github.com/DrozmotiX/ioBroker.esphome/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-Plugin 文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

## ESPHome ioBroker 适配器
使用 ESPHome 创建和管理的简单而强大的配置文件控制您的 ESP8266/ESP32。
ESPHome 管理设备（包括仪表盘）通过其原生 API 进行原生集成，并确保所有数据同步（实时事件处理，无需数据轮询！:)

![标识](../../../en/adapterref/iobroker.esphome/admin/img/dashboard.png)

此适配器使用[esphome-native-api](https://github.com/Nafaya/esphome-native-api#readme) 所有版权归于 @Nafaya 所有，用于与 [ESPHome API] 交互](https://esphome.io/components/api.html?highlight=api)！

## [文档](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/)

## [文档](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/)
我们所有的适配器文档都可以在[DrozmotiX 文档页面](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/) --> 找到

## 先决条件
* NodeJS >= 18.x
* API 在 YAML 中激活
* 对于管理选项卡（可选）
* ESPHome Dashboard IP 在实例设置中提供

## 使用内置的 ESPHome 仪表板
您可以使用外部安装的 ESPHome（例如 Docker），也可以激活此适配器中包含的 ESPHome Dashboard 进程。
无论如何，都可以将 Dashboard 集成到 ioBroker 管理界面，为此，您必须指定 Dashboard 运行的 IP 地址。

![标识](../../../en/adapterref/iobroker.esphome/admin/img/ESPhomeDashboardIP.png)

### 使用 HTTPS
使用 HTTPS 的一个原因是能够直接刷新到插入您电脑的设备，因为 esphome 不允许使用 http 进行此操作（可能是 WebSerial 的浏览器限制）。

![flashFromThisComputer.png](../../../en/adapterref/iobroker.esphome/admin/img/flashFromThisComputer.png)

当 iobroker 使用 https 时使用集成仪表板目前需要更多步骤：

1. 安装 - 如果您还没有安装 - Web 适配器并配置 https。有关更多信息，请参阅 Web 文档：[ioBroker.web](https://github.com/ioBroker/ioBroker.web)
2. 安装 [proxy](https://github.com/ioBroker/ioBroker.proxy) 适配器
3.在代理适配器设置中配置路径：
1. 上下文：`esphome/`
2. url: `http://localhost:6052`

![代理.png](../../../en/adapterref/iobroker.esphome/admin/img/proxy.png)

4.在esphome适配器设置-esphome仪表板的高级部分配置完整的仪表板url：
1. 例如：`https://<iobrokerIP>:<webAdapterPort>/proxy.0/esphome/`
2. 其中 `<iobrokerIP>` 是运行 iobroker 的主机的 IP（与上面相同）
3. `<webAdapterPort>` 是 Web 适配器的端口（默认为 8082）
4. 它看起来应该是这样的：

   ![ESPHomeDashboardUrl.png](../../../en/adapterref/iobroker.esphome/admin/img/ESPHomeDashboardUrl.png)

5. 如果您在外部主机上运行仪表板，您也可以在此处使用外部仪表板实例的 URL

## 如何使用此适配器
### 在 YAML 中激活 API
> [!IMPORTANT] > ioBroker ESPHome 允许通过加密密钥（推荐）或 API 密码（旧版）集成设备， > 您必须相应地指定身份验证设置， > 请参阅[ESPHome 文档](https://esphome.io/components/api.html?highlight=api) > 请仅配置加密密钥（推荐）或 API 密码（旧版）

#### 示例加密密钥配置条目
```
api:
  encryption:
    key: "DyDfEgDzmA9GlK6ZuLkj3qgFcjXiZUzUf4chnIcjQto="
```

#### 示例 API 配置条目
```
api:
  password: 'MyPassword'
```

### 添加/修改/删除 ESPHome 设备到 ioBroker
> [!IMPORTANT] > 此适配器集成了与支持 ESPHome 的设备的通信，以及（如果已激活）集成版本的 ESPHome Dashboard。
> 您必须自行配置和上传您的 ESP 配置，可以使用集成的 Dashboard 或外部替代方案（如 Docker），然后才能将它们集成到 ioBroker

设备选项卡将显示所有当前已知的设备；您可以等待设备自动检测（当前已禁用，请参阅#175）或通过提供其 IP 地址和凭据手动添加它们

![设备选项卡](../../../en/adapterref/iobroker.esphome/admin/img/deviceTabEmpty.png)

> [!NOTE] > 仅当适配器正在运行时，添加/修改/删除设备和加载设备表的按钮才可用！ > 您必须通过按“刷新设备概览”手动刷新设备表，所有设备及其连接状态将显示

请输入 IP 地址（如果已知设备，您可以从下拉列表中选择它）并选择适当的操作：

- 添加/修改设备
- 将发送 IP 地址和凭证到后端并尝试建立连接
- 当提供加密密钥时，API 密码将被忽略，请确保 YAML 配置正确！

- 删除设备
- 将向后端发送一条消息以删除此设备

> [!WARNING] > 此操作将从 ioBroker 中删除选定的设备及其所有相关状态！

> [!NOTE] > 添加设备后，将显示一条消息指示成功或错误， > 您可以刷新表格以显示当前设备及其连接状态

![设备错误](admin/img/connectionIssue.png) ![DevicesOK](../../../en/adapterref/iobroker.esphome/admin/img/connectionOK.png)

如果连接成功，设备将启动，并创建所有相关状态以控制其属性。
对 YAML 配置进行任何更改时，重新启动 ESP 将断开连接并启动新的连接。
在此过程中，不再属于 YAML 配置的状态将被自动删除。

![DevicesOK](../../../en/adapterref/iobroker.esphome/admin/img/deviceTree.png)

### 示例配置
示例配置，更多示例请参阅[DrozmotiX 文档页面](https://DrozmotiX.github.io) 或 [ESPHome 文档](https://esphome.io/index.html)

<details><summary>显示示例配置</summary>

esphome：名称：sensor_badkamer 平台：ESP32 开发板：esp-wrover-kit

wifi：使用地址：192.168.10.122 ssid：“xxxxx” 密码：“xxxxxx”

# 启用 ESPHome API
api：密码：'我的密码'

# 激活 i2c 总线 i2c: sda: 21 scl: 22 scan: True id: bus_a
# Bh1750 的示例配置
    传感器：

平台：bh1750

名称：“Hal_Illuminance” 地址：0x23 测量时间：69 更新间隔：10s

# GPIO 输出的示例配置
    输出：

平台：gpio

引脚：12 反转：真 id：gpio_12

# 将交换机链接到先前定义的输出的示例配置
    转变：

- 平台：输出

名称：“通用输出”输出：“gpio_12”</details>

## Tasmota / ESPEasy 迁移
从之前的 Sonoff Tasmota 或 ESPEasy 设置迁移非常简单。您只需让 ESPHome 为您创建一个二进制文件，然后将其上传到网页界面即可。
更多详情，请参阅我们的[文档页面](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/06.migration.html)

**_注意：_**生成的 yaml 文件存储在 ```/opt/iobroker/iobroker-data/iobroker.esphome.>instance</>device<.yaml

## 支持我
如果您喜欢我的作品，请考虑个人捐赠（这是 DutchmanNL 的个人捐赠链接，与 ioBroker 项目无关！）[![捐赠]（https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/main/admin/button.png）](http://paypal.me/DutchmanNL)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
    * (DutchmanNL) 
-->
### 0.6.1 (2025-05-24)
* (@SimonFischer04) Update esphome
* (@ticaki) Optimize admin configuration interface
* (@DutchmanNL) Optimize backend handling of device discovery
* (@DutchmanNL) Capability to select ESPHome Dashboard version added, resolves #118

### 0.5.0-beta.8 (2023-11-24)
* (DutchmanNL) Capability to automatically detect new devices added
* (DutchmanNL) Ensures a compatible pillow version is used (10.0.1)
* (SimonFischer04) Add pillow python package by default, resolves #188

### 0.5.0-beta.4 (2023-11-15)
* (DutchmanNL) Refactor memory caching of device data, resolves #189

### 0.5.0-beta.1 (2023-11-12)
* (DutchmanNL) Only show error messages once for unreachable devices

### 0.5.0-beta.0 (2023-11-12) - Rebuild Admin Interface & Connection handler
* (DutchmanNL) Admin interface redesigned to JSON-Config relates #171
* (DutchmanNL) Backend massages implemented to Add/Modify/Delete devices
* (DutchmanNL) Device connection handling and visibility of devices improved
* (DutchmanNL) Auto device discovery temporary disabled due to external bug, relates #175
* (DutchmanNL) Possibility added to exclude IP-Addresses from device discovery, relates #175
* (DutchmanNL) Allow Selection to listen on specific interface or all for device discovery resolves #67
* (DutchmanNL) State implemented to show current connection status (unreachable/disconnected/connected) to improve management of devices
* (DutchmanNL) Several bugfixes, resolves #181 resolves #

## License
MIT License

Copyright (c) 2023-2025 DutchmanNL <rdrozda86@gmail.com>

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