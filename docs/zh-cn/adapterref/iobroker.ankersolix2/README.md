---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ankersolix2/README.md
title: ioBroker.ankersolix2
hash: SLi2rDlaXAw4B4c4s+1uBJLdCVtAMj6cKNEMD9deld0=
---
![标识](../../../en/adapterref/iobroker.ankersolix2/admin/ankersolix2.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.ankersolix2.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ankersolix2.svg)
![安装数量](https://iobroker.live/badges/ankersolix2-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/ankersolix2-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.ankersolix2.png?downloads=true)

# IoBroker.ankersolix2
**测试：**![测试和发布](https://github.com/ronny130286/ioBroker.ankersolix2/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 ankersolix2 适配器
集成 Anker Solix 2

＃＃ 描述
该项目源自 https://github.com/tomquist/solix2mqtt，并将来自 anker api 的信息直接带入 ioBroker。

## 支持的设备
我没有每个[Anker 硬件](https://www.ankersolix.com/) 可供测试。我只能列出我测试过的硬件。其他所有 [Anker 硬件](https://www.ankersolix.com/) 可能](https://www.ankersolix.com/)也兼容

| 设备 | 描述 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `Solarbank` | - A17C0：Solarbank E1600（第 1 代）<br> - A17C1：Solarbank 2 E1600 Pro<br> - A17C3：Solarbank 2 E1600 Plus<br> A17C5：Solarbank 3 E2700 Plus<br> |
| `智能电表` | - A17X7：Anker 三相 Wifi 智能电表<br>- SHEM3：Shelly 3EM智能电表<br>- SHEMP3：Shelly 3EM Pro 智能电表 |

## 重要变化
如果您从 v1.x 升级到 2.x，则必须重新输入密码！否则，您的帐户将被锁定！

## 配置
1. ~~在 anker 应用程序中创建一个家庭帐户并将其添加到您的主帐户~~自 2025 年 7 月底起，您可以在应用程序和适配器中使用同一个帐户。
2.安装适配器
3. 进入适配器设置并设置您的凭据
4. 第一次，请使用较长的轮询时间（180 秒），这样如果出现问题，您就有足够的时间停止适配器。

通常您可以在日志文件中看到您有一个 site_id 并且您收到消息：已发布。

## 使用适配器控制
1. 您需要登录您的管理员账户
2. 进入适配器设置，标签控制并激活控制
3. 选择您想要控制的站点 ID。
4. 控制选项

4.1. 选择您想要控制的数据点。它可以是由脚本设置的手动数据点，也可以是智能电表数据点。（重要提示：必须是数值）4.2. 您可以设置自定义电源计划，如果需要再次触发电源计划，您可以通过数据点 ankersolix2.x.control.SetPowerplan（设置为 true 并确认）进行控制。4.3. 您可以启用交流负载。如果已启用，您可以通过数据点 ankersolix2.x.control.ACLoading\ 进行控制（设置为 true 且确认 = activ（当前时间 + 12 小时），设置为 false 且确认 = inactiv，用户自定义电源计划将启用）。

5.单击保存并重新启动适配器

注意：适配器会覆盖应用程序中的设置。如需再次使用应用程序，必须停用适配器或控制功能。

## 帮助
如果您遇到类似 401 的错误，请检查您的凭据。
如果您再次遇到错误并且无法登录，请停止适配器并删除 iobroker-data/ankersolix2.0 下的 session.data（例如 /opt/iobroker/iobroker-data/ankersolix2/），然后重新启动适配器。

## 多库
- de: [zur 文档](docs/de/README.md)
- en: [文档](docs/en/README.md)

## 你想支持我吗？
[![“给我买杯咖啡”](https://cdn.buymeacoffee.com/buttons/v2/default-red.png)](https://www.buymeacoffee.com/ronny130286)

致谢

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.4.0 (2025-09-20)

- (ronny130286) add timeplan (schedule) and userdefine energyplan
- (ronny130286) add Powerplan and AC Loading (for AC devices)

### 2.3.0 (2025-08-16)

- (ronny130286) you can use now same account in app and adapter
- (ronny130286) now you can control the solarbank with adapter (if you use adminaccount)

### 2.2.0 (2025-06-30)

- (ronny130286) battery types and number are adjustable in the instance

### 2.1.2 (2025-05-28)

- (ronny130286) fix for Solix 3

### 2.1.1 (2025-05-15)

- (ronny130286) bugfix

### 2.1.0 (2025-04-17)

- (ronny130286) reorganized analysis option (now selectable in adminconsole)
- (ronny130286) add battery energy to solix devices
- (ronny130286) update packages

### 2.0.0 (2025-03-09)

- (ronny130286) update packages
- (ronny130286) decrypt password in adminui
- (ronny130286) add more language codes
- (ronny130286) reorganized some DP

### 1.1.0 (2025-02-08)

- (ronny130286) add analysis data for week/day
- (ronny130286) update packages

### 1.0.3 (2024-12-06)

- (ronny130286) edit refreshtimer
- (ronny130286) add to repo

### 1.0.2 (2024-12-04)

- (ronny130286) bugfix

### 1.0.1 (2024-12-01)

- (ronny130286) ESLint 9.x

### 1.0.0 (2024-11-29)

- (ronny130286) stable release
- (ronny130286) fixed backup_info object

### 0.1.0-beta.0 (2024-10-02)

- (ronny130286) beta release

### 0.0.3-alpha.0 (2024-09-25)

- (ronny130286) fix session.data
- (ronny130286) npm release

### 0.0.2-alpha.0 (2024-09-20)

- (ronny130286) initial release

## License

MIT License

Copyright (c) 2025 ronny130286 <ronnymatthei@gmx.de>

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