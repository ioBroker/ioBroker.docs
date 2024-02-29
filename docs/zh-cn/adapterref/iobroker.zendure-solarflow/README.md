---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: QcuyOrQ5FKmuYBqRjKELMk3WJ99VoW6xB2dgaBAKpzU=
---
![标识](../../../en/adapterref/iobroker.zendure-solarflow/admin/zendure-solarflow.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.zendure-solarflow.svg)
![下载](https://img.shields.io/npm/dm/iobroker.zendure-solarflow.svg)
![安装数量](https://iobroker.live/badges/zendure-solarflow-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/zendure-solarflow-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.zendure-solarflow.png?downloads=true)
![捐](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker.zendure-solarflow
**测试：** ![测试与发布](https://github.com/nograx/ioBroker.zendure-solarflow/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的 Zendure Solarflow 适配器
该项目是一个 ioBroker 适配器，用于从 Zendure Solarflow Cloud API 读取数据。它使用Zendure提供的官方API。
您可以在此处阅读有关 API 的更多信息：https://github.com/Zendure/developer-device-data-report

笔记：

1.你必须使用全球Zendure Server！

2. 可以通过在productId/deviceKey/control 子文件夹中创建的状态来控制输出限制。请在Zendure App中停用/取消选中所有模式，否则无法设置输出限制！

   ![Solarflow 设置窗口](https://raw.github.com/nograx/ioBroker.zendure-solarflow/master/Screenshots/ZendureSolarflowSettings.png)

3. 使用ioBroker适配器登录后，您将退出官方iOS或Android App。这是正常行为。作为解决方法，您可以使用另一封电子邮件创建第二个 Zendure 帐户，并向该帐户授予对 Solarflow HUB 的访问权限。然后使用 ioBroker/Zendure Solarflow 适配器的第二个帐户。

## 学分
感谢 https://github.com/reinhard-brandstaedter/solarflow，它对了解 Zendure 的 MQTT 服务器知识有很大帮助！谢谢！

## 捐赠
如果您发现该适配器对您有用并希望支持我的工作，请随时通过 Paypal 捐赠。谢谢你！ （这是 Nograx 的个人捐赠链接，与 ioBroker 项目无关！）<br />

## Changelog
### 1.1.4 (2024-02-28)

- Fix timeout issues

### 1.1.0 (2024-02-27)

- Switched solar input 1 und 2 to adjust the behavior like the offical app
- Added Calculations folder, remaining charge and discharge time is now available as formatted time
- Added a note in the settings that this adapter only works with the global server

### 1.0.7 (2024-01-16)

- Add control for charge and discharge limit
- Update Readme Screenshot

### 1.0.6 (2024-01-16)

- Update Readme

### 1.0.5 (2024-01-15)

- Added state for both Solarflow PV inputs

### 1.0.4 (2023-12-16)

- Added Timeout for axios

### 1.0.3 (2023-12-12)

- Password is now encrypted. NOTE: You have to re-enter the password after adapter update!

### 1.0.2 (2023-12-12)

- Adapter improvements suggested by iobroker team
- Fixed battery pack temperature (data is in kelvin, so now converting to celcius)

### 1.0.1 (2023-11-03)

- Fix translations
- Use 'extendObjectAsync' instead of 'setObjectNotExistsAsync'
- First official release version

### 0.1.0-alpha.2 (2023-10-27)

- Don't stop the adapter when no login information is provided!

### 0.1.0-alpha.1 (2023-10-27)

- Fix Typescript typos

### 0.1.0-alpha.0 (2023-10-26)

- Get battery information
- Reset states if no new data comes in (e.g. when Hub goes offline). Currently the last value still persist when Hub goes offline, so you may have 'pseudo' data in your states.

### 0.0.2 (2023-10-25)

- Initital Release, retrieving Hub data, telemetry and setting the output limit works!

### 0.0.1 (2023-10-24)

- First test

## License

MIT License

Copyright (c) 2024 Peter Frommert

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