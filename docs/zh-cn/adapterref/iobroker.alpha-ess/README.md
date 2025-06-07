---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.alpha-ess/README.md
title: ioBroker.alpha-ess
hash: IeYCD+EVKLA4PUNjw8fCCyH2IsGI8QFHSDrr5Do4QuU=
---
![标识](../../../en/adapterref/iobroker.alpha-ess/admin/alpha-ess.png)

![安装数量（最新）](http://iobroker.live/badges/alpha-ess-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/alpha-ess-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.alpha-ess.svg)
![下载](https://img.shields.io/npm/dm/iobroker.alpha-ess.svg)
![已知漏洞](https://snyk.io/test/github/Gaspode69/ioBroker.alpha-ess/badge.svg)

# IoBroker.alpha-ess
## IoBroker 的 alpha-ess 适配器
---

### 如需支持，请打开 GitHub 问题或访问
https://forum.iobroker.net/post/892023 https://www.storion4you.de/thread/683

---

此适配器登录[Alpha-ESS](https://www.alphaess.com/)的 Web API，并检索您的 Alpha-ESS 设备的信息。\ 根据您的 Alpha-ESS 产品，可以获取设备的实时数据和配置数据。API 返回哪些数据点取决于您的 Alpha-ESS 设备。

该适配器使用 Alpha-ESS Open API，这是 Alpha-ESS 设备的官方且有记录的 API。

每个状态的质量属性根据其状态进行设置：

| 品质 | 意义 |
|:--------|:--------------------------------------------------|
|0x00 |正常且最新 |
|0x01 |由于未知原因未更新值，请参阅调试日志|
|0x02 |此数据点的在线连接存在问题|
|0x12 |适配器已断开连接或已停止 |
|0x44 |API 返回错误或内部错误，请参阅调试日志 |

＃＃ 设置：
要使用 Alpha-ESS Open API，您必须在 https://open.alphaess.com 上注册您的 Alpha-ESS 设备。注册后，您将获得一个开发者 ID 和一个开发者密钥（称为“Secret”）。您需要这些信息才能访问 Open API。
如何查找 SN 和注册验证码，请参见：https://github.com/alphaess-developer/alphacloud_open_api

- **个人应用程序 ID**：应用程序 ID（见上文）
- **个人应用程序秘密**：应用程序秘密（见上文）
- **Alpha-ESS 系统 ID**：您的 Alpha-ESS 设备的 S/N（序列号）
- **读取实时数据的间隔**：单位：秒。
- **读取能量数据的间隔**：单位：分钟。
- **读取充电设置的间隔：**单位：分钟。
- **读取放电设置的间隔：**单位：分钟。
- **读取摘要数据的间隔**：单位：分钟。
- **读取 Wallbox 数据的间隔**：单位：分钟。注意：目前仅支持一个 Wallbox。
- **更新未改变的状态**：如果选中此选项，即使相应的值未改变，状态也会改变。

## 免责声明
**所有产品和公司名称或徽标均为其各自所有者的商标™或注册商标®。使用它们并不意味着与它们或其任何关联子公司有任何关联或认可！本个人项目由业余时间维护，不承担任何商业目的。**

## Changelog
### 3.0.1 (2024-12-22)

- (Gaspode) Optimizations of reading pseudo-realtime power data for slow systems

### 3.0.0 (2024-12-21)

- (Gaspode) **Breaking Change:** Renamed state "Charging_period 1_end" to "Charging_period_1_end"
- (Gaspode) Optimizations in configuration dialog

### 2.3.0 (2024-12-20)

- (Gaspode) Provides the ability to read pseudo-realtime power data using the API function getTodayPowerBySn. This feature is useful for systems that lack "realtime data support." When activated, data is fetched every 5 minutes and stored in the "Recent" folder.

### 2.2.0 (2024-12-16)

- (Gaspode) Provide system information data (getEssList)

### 2.1.6 (2024-12-01)

- (Gaspode) Migrated to ESLint 9

### 2.1.5 (2024-11-14)

- (Gaspode) Optimized GUI for all screen resolutions (responsive design)

### 2.1.4 (2024-08-13)

- (Gaspode) Updated some formal stuff

### 2.1.3 (2024-08-07)

- (Gaspode) Increased read timeout from 10 to 20 s

### 2.1.2 (2024-08-07)

- (Gaspode) Quality of states optimized

### 2.1.1 (2024-08-07)

- (Gaspode) Do not longer report read timeouts as error. It should be enough to set the quality of concerned states to values according the table above and to display warnings, if values were not updated for a long time. To see details, debug log level must be enabled by the user.

### 2.1.0 (2024-08-01)

- (Gaspode) Adapter requires node.js >= 18 and js-controller >= 5 now
- (Gaspode) Dependencies updated
- (Gaspode) Adapter logo updated. Alpha-ESS has kindly permitted to use the Alpha-ESS logo. This does not imply any affiliation with Alpha-ESS! Alpha-ESS is not the developer or provider of this adapter!

### 2.0.2 (2024-01-12)

- (Gaspode) Updated Copyright year

### 2.0.1 (2024-01-03)

- (Gaspode) Adapted timeout to new API restrictions

### 2.0.0 (2023-12-02)

- (Gaspode) Breaking Change: Removed support of Closed API

### 1.3.0 (2023-11-22)

- (Gaspode) Support wallbox with Open API
- (Gaspode) Start and stop charging of wallbox with Open API

### 1.2.1 (2023-11-11)

- (Gaspode) Fixed severe error in ClosedAPI

### 1.2.0 (2023-11-10)

- (Gaspode) Added additional realtime attributes for OpenAPI

### 1.1.1 (2023-11-04)

- (Gaspode) Closed API adapted to latest Alpha-ESS changes and enabled again

### 1.1.0 (2023-11-04)

- (Gaspode) Closed API disabled (temporarily?) because API has been changed by Alpha-ESS
- (Gaspode) Read back changed settings values 2 seconds after they have been changed

### 1.0.2 (2023-10-05)

- (mcm1957) Updated required node version to 16 or newer

### 1.0.1 (2023-10-03)

- (Gaspode) Adapted fetching energy values using 'Closed API' to latest API changes by Alpha-ESS

### 1.0.0 (2023-06-20)

- (Gaspode) Support also the new official OpenAPI provided by Alpha-ESS
- (Gaspode) Set state quality accordingly to status of data
- (Gaspode) Writing charging and discharging settings implemented for 'Closed API' and OpenAPI
- (Gaspode) Remove no more supported states at startup automatically

### 0.4.0 (2023-02-16)

- (Gaspode) Optimized deletion of group states
- (Gaspode) Added new Realtime state for pmeter_dc

### 0.3.0 (2023-02-11)

- (Gaspode) Read selected statistical data
- (Gaspode) Added Summary data
- (Gaspode) Refactored complete implementation
- (Gaspode) Changed the unit of settings for all intervals, except of realtime data, to minutes (Caution: settings are reset to defaults)
- (Gaspode) Remove disabled states at adapter startup
- (Gaspode) Removed no more supported value 'createtime' (state ID Realtime.Last_update).
- (Gaspode) Optimized rounding for selected values
- (Gaspode) Added states EV1_power, EV2_power, EV3_power and EV4_power to Realtime folder

### 0.1.0 (2023-01-15)

- (Gaspode) First release for Latest repository
- (Gaspode) Corrected typo in state ID Battery_SOC
- (Gaspode) Implemented improvements as suggested in code review
- (Gaspode) Slow down requests in case of permanent errors
- (Gaspode) Changed adapter type from metering to energy
- (Gaspode) Correction for NPM
- (Gaspode) Enable NPM

### 0.0.5

- (Gaspode) Use meaningful state names
- (Gaspode) Use suitable state roles
- (Gaspode) Added new state for Alpha-ESS settings parameter 'upsReserve'

### 0.0.4

- (Gaspode) use axios to perform Alpha-ESS API calls instead of deprecated request
- (Gaspode) New option "Update unchanged states" added

### 0.0.3

- (Gaspode) refactored API calls, added daily energy values

### 0.0.2

- (Gaspode) corrected api call for realtime data

### 0.0.1

- (Gaspode) initial release

## License

MIT License

Copyright (c) 2024 Gaspode <gaspode69@online.de> (**NO SUPPORT VIA EMAIL**)

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