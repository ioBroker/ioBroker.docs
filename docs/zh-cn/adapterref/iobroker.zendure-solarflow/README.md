---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: AVn5YzHd9CTBo8vIgT61hMQK4ryROLtKMXW09AeSWz4=
---
![标识](../../../en/adapterref/iobroker.zendure-solarflow/admin/zendure-solarflow.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.zendure-solarflow.svg)
![下载](https://img.shields.io/npm/dm/iobroker.zendure-solarflow.svg)
![安装数量](https://iobroker.live/badges/zendure-solarflow-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/zendure-solarflow-stable.svg)
![新平台](https://nodei.co/npm/iobroker.zendure-solarflow.png?downloads=true)
![捐](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

# IoBroker.zendure-solarflow
**测试：**![测试与发布](https://github.com/nograx/ioBroker.zendure-solarflow/workflows/Test%20and%20Release/badge.svg)

## Zendure Solarflow 适配器适用于 ioBroker
该项目是一个 ioBroker 适配器，用于从 Zendure Solarflow Cloud API 读取数据。它使用 Zendure 提供的官方 API。
您可以在此处阅读有关该 API 的更多信息：https://github.com/Zendure/developer-device-data-report

＃＃ 特征
- 获取 Solarflow 设备的所有遥测数据，包括官方应用程序中不可见的数据 - 例如电池电压
- 像在官方应用程序中一样控制您的 Solarflow HUB。大多数设置都可用。
- 控制输出限制 - 您不仅限于使用 Shelly Pro EM 来实现零馈入。您还可以通过 ioBroker 中的脚本或 blockly 设计更复杂的场景。
- 如果一块电池电压过低（电池保护），则停止输入。仅当通过适配器设置输出限制时才有效
- 同时控制多个 Solarflow！
- 获得更精确的计算！
- 适用于所有 Zendure SolarFlow 设备：HUB1200、Hyper2000、HUB2000 和 AIO！我只能在 HUB1200 上进行测试，因为我没有其他设备……

注释
1. 请停用/取消选中 Zendure App 中的所有模式，否则无法设置输出限制！

   ![Solarflow 设置窗口](https://raw.github.com/nograx/ioBroker.zendure-solarflow/master/Screenshots/ZendureSolarflowSettings.png)

2. 使用 ioBroker 适配器登录后，您将退出官方 iOS 或 Android 应用程序。这是正常现象。作为解决方法，您可以使用另一个电子邮件创建第二个 Zendure 帐户，并向该帐户授予对 Solarflow HUB 的访问权限。然后使用第二个帐户访问 ioBroker/Zendure Solarflow 适配器。

3. 如果没有太阳能输入且设备在线，适配器将显示电池使用量 +10W。这将反映设备的“待机”使用情况。

## 致谢
感谢 https://github.com/reinhard-brandstaedter/solarflow，它对 Zendure 的 MQTT 服务器知识帮助很大！谢谢！

## 捐赠
如果您发现该适配器对您有用并且想要支持我的工作，请随时通过 Paypal 捐款。谢谢！（这是 Nograx 的个人捐款链接，与 ioBroker 项目无关！）<br />

## Changelog
### 1.10.1 (2025-01-06)

- Fix input limit when hub is bundled with ace
- Fix calculation when low voltage block is activated

### 1.10.0 (2024-12-02)

- Add setting to perform a full charge if SOC from Zendure is greater than 50% when on low voltage
- Bugfixes

### 1.9.3 (2024-11-22)

- Fix for Low Voltage Block not deactivated

### 1.9.2 (2024-11-21)

- Fix some state definitions

### 1.9.1 (2024-11-21)

- Improvement for 'Low Voltage Block'.
- Changed the state "hubState" a an option value.

### 1.9.0 (2024-11-20)

- New option to force Solarflow device to go offline when "Low Voltage Block"-option is used.

## License

MIT License

Copyright (c) 2025 Peter Frommert

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