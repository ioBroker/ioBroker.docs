---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.netatmo-energy.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.netatmo-energy.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/netatmo-energy-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/netatmo-energy-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/Homemade-Disaster/ioBroker.netatmo-energy/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.netatmo-energy.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.netatmo-energy/README.md
title: ioBroker.netatmo-energy
hash: 8mT7M6MKlw3+hekfF3Mlag1pYE41zAPgcKDl70Tpxlg=
---
![标识](https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/admin/netatmo-energy.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.netatmo-energy.svg)
![下载](https://img.shields.io/npm/dm/iobroker.netatmo-energy.svg)
![安装数量（最新）](http://iobroker.live/badges/netatmo-energy-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/netatmo-energy-stable.svg)
![已知漏洞](https://snyk.io/test/github/Homemade-Disaster/ioBroker.netatmo-energy/badge.svg)
![NPM](https://nodei.co/npm/iobroker.netatmo-energy.png?downloads=true)

# IoBroker.netatmo-energy
![测试和发布](https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/admin/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用哨兵库向开发人员发送崩溃和代码错误的自动报告。**有关如何禁用此功能的更多详细信息和信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始可以使用哨兵报告。

## 要求和配置
Netatmo 能源硬件（恒温器、阀门）帐户与 Netatmo 云

- 适配器适用于 admin => 3 和 nodejs >= 14
- 创建您自己的帐户 <https://auth.netatmo.com/de-de/access/signup>
- 执行 API 登录 <https://dev.netatmo.com/apidocumentation/energy>
- 通过单击您的帐户（顶部/左侧）创建您自己的应用程序，然后按“创建”按钮
  - 填写表格并保存
  - 将接收到的 client-ID 和 client-secret-ID 应用于适配器配置
  - 转到 API 文档 <https://dev.netatmo.com/apidocumentation/energy>
  - 选择“GET homesdata” - “Try it out” - “EXECUTE / HOMESDATA”
    - 您将收到一封回复，其中可以找到您的家庭 ID
    - 将它们应用于适配器配置
    - 启动 Netatmo-Energy Adapter 并使用 Netatmo API 验证自己
      - 选择新的身份验证方法 (OAuth2)
      - 确认按钮“使用 Netatmo 验证自己”
      - 如有必要，请登录您的帐户
      - 确认您的 Netatmo APP 的第三方许可
      - 关闭浏览器窗口
  - 在“API 设置”中选择所需的选项并保存适配器配置
    - 立即传输温度变化...立即将状态“SetTemp”中的温度变化传输到 API
    - 更改后立即读取 API 状态...更新 API 后立即使用 homestatus 获取 API 数据
    - 在 x 秒后更新 API 状态 ... API 数据的永久更新。 （0 = 无更新）
  - 如果需要，还可以设置通知服务以接收某些状态更改。可以接收信息消息、警告或错误消息。为此，有必要在“登录信息”中激活选项“激活/停用通知”，然后在“通知”菜单中进行设置。

详细说明可作为 wiki (<https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/wiki>)。

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/settings_login_de.png" alt="设置登录" width="70%"/>

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/settings_api_de.png" alt="设置API" width="70%"/>

## IoBroker 的 netatmo-energy 适配器
使用 Netatmo-Energy API 检索或更改当前设置。适配器使用获取请求将数据传输到 Netatmo Energy API。 API官方文档：<https://dev.netatmo.com/apidocumentation/energy>。

适配器创建自己的设备“energyAPP”，其中包含“APIRequests”和“触发器”。

### API请求
- homesdata ... 检索 Netatmo Energy 安装的整个结构（使用 NAPlug 参数）。您可以自己选择手动请求的所有其他参数。
- homestatus ...确定并传输您分配的阀门的状态和技术信息。如果您需要有关特定设备类型的信息，您可以自己选择。
- getroommeasure ... 有了这个你就可以得到你房间的历史数据。结果输入到“响应”字段中。
- getmeasure ... 这将为您提供锅炉的历史数据。结果输入到“响应”字段中。
- setthermmode_schedule ... 将 Netatmo Energy 安装的操作模式设置为“计划”（默认）
- setthermmode_hq ... 将 Netatmo Energy 安装的操作模式设置为“hq”（霜监控器）
- setthermmode_away ... 将 Netatmo Energy 安装的操作模式设置为“离开”（不在家）
- switchhomeschedule ... 设置 Netatmo Energy API 的“计划模式”。所有可能的模式都列在“switchhomeschedule”频道中。

- createnewhomeschedule ... 设置 Netatmo Energy API 的“计划模式”。所有可能的模式都列在“switchhomeschedule”频道中。

- synchomeschedule ... 设置您的 Netatmo Energy APP 的加热时间表。要更改特定的加热计划，请输入一个。否则当前设置的将被更改。请输入必要的参数并触发 synchomeschedule 请求。
- createnewhomeschedule ... 为您的 Netatmo Energy APP 创建一个新的供暖时间表。请输入必要的参数并触发 createnewhomeschedule 请求。

如果一个API请求需要参数，你可以在“参数”通道中对应的请求通道中找到。

###触发器
- applychanges ... 将所有未决的手动更改转移到您的阀门到 Netatmo Energy APP
- refresh_structure ... 依次生成请求 homedata 和 homestatus

### 更改请求
- setroomthermpoint ... 根据“设置”通道中的手动更改，更改将传输到 Netatmo Energy APP。 （瞬时或自触发 - “立即传输温度变化”）。
- set_mode_to_home ...“设置”通道中的“set_mode_to_home”按钮将阀门模式“set_mode_to_home”设置为“home”。此外，会立即触发 API 请求以传播更改。

＃＃＃ 状态
- running ... 在这里您可以查看 API 请求当前是否正在运行

### 请求结构
<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/EnergyAPP_measure.png" alt="设置登录" width="80%"/><img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/EnergyAPP.png" alt="设置登录" width="80%"/>

## 构建结构
当适配器启动时，整个 Netatmo Energy APP 的当前状态被刷新，所有阀门和恒温器的状态被传输。根据一般设置（更改后立即读取 API 状态），阀门和恒温器的状态会在 API 更改后立即再次获取（立即发送 homestatus 请求）。
适配器启动时执行初始化。

## 通知
如果您在适配器配置中激活了通知服务，则会向您发送各种消息。
提供以下服务。

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/notification_types_de.png" alt="通知" width="30%"/>

请为您选择的通知服务输入必要的连接数据。

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/notification_de.png" alt="通知" width="70%"/>

## 传感器
在表格中，您可以对每个房间的“window_open”属性做出反应。各个窗口传感器的状态发生变化时可以触发一个动作，在此输入。可以设置专用温度，也可以切换回家庭模式。因此，可以在打开或关闭窗户时设置阀门的温度。

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/sensors_de.png" alt="传感器" width="70%"/>

＃＃ 消息
您可以在此处触发特定状态更改的特定消息。你可以留下你想要的信息。

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/messages_de.png" alt="消息" width="70%"/>

## 管理选项卡
在管理选项卡上，您可以显示 netatmo 能源实例的所有恒温器、电桥和阀门。也可以更新此视图或启动完整的 API 更新。此外，您还可以选择将更改传输到云端并从可能的手动模式切换回标准模式。

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/admintab_de.png" alt="管理标签" width="70%"/>

状态图标显示在每张卡上，显示恒温器、阀门和连接器的当前状态。在恒温器的第二页上，您会找到各种 API 请求来设置恒温器模式或供暖计划。

## 小工具
VIS 的小部件，用于显示完整的恒温器。您只需输入“SetTemp”数据点。所有其他信息都是根据“房间”结构动态确定的。

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/valve_widget_de.png" alt="小部件" width="250px"/>

## Changelog

[Older changes](CHANGELOG_OLD.md)
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.4.0 (2023-03-19)

* (ioKlausi) Implement actions for window sensors

### 2.3.1 (2023-02-12)

* (ioKlausi) Redesign coding

### 2.3.0 (2023-02-12)

* (ioKlausi) Rework of signal notifications

### 2.2.2 (2023-02-12)

* (ioKlausi) Send No-Token-Error as a notification

### 2.2.1 (2023-02-12)

* (ioKlausi) Timer established for token refresh

### 2.1.0 (2023-02-05)

* (ioKlausi) Added new API request 'createnewhomeschedule'

### 2.0.3 (2023-02-04)

* (ioKlausi) Added Signal as a new message type

### 2.0.2 (2023-01-07)

* (ioKlausi) Revision of the documentation

### 2.0.1 (2023-01-06)

* (ioKlausi) Corrections for OAuth2

### 2.0.0 (2023-01-06)

* (ioKlausi) New authentication method established

### 1.3.1 (2022-04-18)

* (ioKlausi) Additional information added to admin tab cards

### 1.3.0 (2022-04-17)

* (ioKlausi) Change thermostat mode functionality added to thermostat card

## License

MIT License

Copyright (c) 2021-2023 ioKlausi <nii@gmx.at>

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