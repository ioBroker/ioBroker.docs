---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.netatmo-energy.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.netatmo-energy.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/netatmo-energy-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/netatmo-energy-stable.svg
BADGE-Dependency Status: https://img.shields.io/david/Homemade-Disaster/iobroker.netatmo-energy.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/Homemade-Disaster/ioBroker.netatmo-energy/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.netatmo-energy.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.netatmo-energy/README.md
title: ioBroker.netatmo-energy
hash: e9aZbvxE5/6muBYnfiS/kURuwjYm1lcBGgPc4i824MA=
---
![标识](https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/admin/netatmo-energy.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.netatmo-energy.svg)
![下载](https://img.shields.io/npm/dm/iobroker.netatmo-energy.svg)
![安装数量（最新）](http://iobroker.live/badges/netatmo-energy-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/netatmo-energy-stable.svg)
![依赖状态](https://img.shields.io/david/Homemade-Disaster/iobroker.netatmo-energy.svg)
![已知漏洞](https://snyk.io/test/github/Homemade-Disaster/ioBroker.netatmo-energy/badge.svg)
![新PM](https://nodei.co/npm/iobroker.netatmo-energy.png?downloads=true)

# IoBroker.netatmo-energy
**测试：** ![测试和发布](https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库向开发人员发送崩溃和程序代码错误的自动报告。**有关如何禁用此功能的更多详细信息和信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry 报告从 js-controller 3.0 开始可用。

## 要求和配置
Netatmo 能源硬件（恒温器、阀门）帐户与 Netatmo Cloud

- 适配器适用于 admin => 3 和 nodejs >= 12
- 创建您自己的帐户 https://auth.netatmo.com/de-de/access/signup
- 登录 API https://dev.netatmo.com/apidocumentation/energy
- 通过单击您的帐户（上/左）创建您自己的应用程序，然后按“创建”按钮
  - 填写表格并保存
  - 将收到的 client-ID 和 client-secret-ID 应用到适配器配置
  - 转到 API 文档 https://dev.netatmo.com/apidocumentation/energy
  - 选择“GET homedata” - “试试看” - “EXECUTE / HOMESDATA”
    - 您将收到回复，您将在其中找到您的家庭 ID
    - 将它们应用于适配器配置
  - 在适配器配置中输入您的 Netatmo Cloud 用户名和密码
  - 在“API 设置”中选择所需的选项并保存适配器配置
    - 立即传输温度变化...立即将状态“SetTemp”中的温度变化传输到 API
    - 更改后立即读取 API 状态...更新 API 后立即使用 homestatus 获取 API 数据
    - x 秒后更新 API 状态 ... API 数据的永久更新。 （0 = 无更新）
  - 如果需要，还可以设置通知服务以接收某些状态更改。可以接收信息消息、警告或错误消息。为此，必须在“登录信息”中激活“激活/停用通知”选项，然后在“通知”菜单中进行设置。

详细描述可作为 wiki (https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/wiki) 获得。

<img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/settings_login_de.png" alt="设置登录" width="70%"/>

<img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/settings_api_de.png" alt="设置API" width="70%"/>

## IoBroker 的 netatmo-energy 适配器
使用 Netatmo-Energy API 检索或更改当前设置。适配器使用获取请求将数据传输到 Netatmo Energy API。 API 官方文档：https://dev.netatmo.com/apidocumentation/energy。

适配器创建自己的设备“energyAPP”，其中包含“APIRequests”和“触发器”。

### API 请求
* homedata ... 获取 Netatmo Energy 安装的整个结构（使用 NAPlug 参数）。您可以自己为手动请求选择所有其他参数。
* homestatus ...确定并传输您分配的阀门的状态和技术信息。如果您想要有关特定类型设备的信息，您可以自己选择它。
* getroommeasure ... 有了这个，你可以得到你房间的历史数据。结果被输入到“响应”字段中。
* getmeasure ...这将为您提供锅炉的历史数据。结果被输入到“响应”字段中。
* setthermmode_schedule ... 将 Netatmo Energy 安装的运行模式设置为“Schedule”（默认）
* setthermmode_hq ... 将 Netatmo Energy 装置的运行模式设置为“hq”（防霜）
* setthermmode_away ... 将 Netatmo Energy 装置的运行模式设置为“离开”（不在家里）
* switchhomeschedule ... 设置 Netatmo Energy API 的“调度模式”。所有可能的模式都列在“switchhomeschedule”频道中。
* synchomeschedule ... 设置您的 Netatmo Energy APP 的供暖时间表。要更改特定的加热计划，请输入一个。否则当前设置的将被更改。请输入必要的参数并触发 synchomeschedule 请求。

如果 API 请求需要参数，您可以在“参数”通道中的相应请求通道中找到。

### 触发器
* applychanges ... 将所有待处理的手动更改转移到您的阀门到 Netatmo Energy APP
* refresh_structure ...依次生成请求homesdata和homestatus

### 更改请求
* setroomthermpoint ... 根据“设置”通道中的手动更改，更改将传输到 Netatmo Energy APP。 （瞬时或自触发 - “立即传输温度变化”）

＃＃＃ 状态
* running ... 在这里你可以看到一个 API 请求当前是否正在运行

### 请求结构
<img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/EnergyAPP_measure.png" alt="设置登录" width="80%"/><img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/EnergyAPP.png" alt="设置登录" width="80%"/>

## 构建结构
当适配器启动时，整个Netatmo Energy APP的当前状态被刷新并且所有阀门和恒温器的状态被传输。根据一般设置（更改后立即读取 API 状态），在 API 更改后立即再次获取阀门和恒温器的状态（立即发送 homestatus 请求）。
启动适配器时执行初始化。

## 通知
如果您在适配器配置中激活了通知服务，则会向您发送各种消息。
提供以下服务。

<img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/notification_types_de.png" alt="设置API" width="30%"/>

    请为您选择的通知服务输入必要的连接数据。

<img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/notification_de.png" alt="设置API" width="70%"/>

## 小部件
用于 VIS 的小部件，用于显示完整的恒温器。您只需输入“SetTemp”数据点。所有其他信息都是从“房间”结构中动态确定的。

<img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/valve_widget_de.png" alt="设置API" width="250px"/>

## 变更日志
<!-- 下一个版本的占位符（在行首）：

### **正在进行中** -->
＃＃＃ **工作正在进行中**
### 0.2.4 (2022-02-13)
* 添加 (ioKlausi) 发布脚本

### 0.2.3
* 添加 (ioKlausi) AbortController

### 0.2.2
* (ioKlausi) 添加翻译和测试紧凑模式

### 0.2.1
* (ioKlausi) 调整对象的创建

### 0.2.0
* (ioKlausi) js-controller 4.0 的兼容性检查

### 1/00/20
* (ioKlausi) 错误修复（哨兵错误）

### 01/01/19
* (ioKlausi) 适配器完成并创建 wiki

### 01/01/18
* (ioKlausi) 为小部件信号创建单独的图标

### 01/01/17
* (ioKlausi) 为打开的窗口调整了小部件，修复了 setroomthermpoint 的错误

### 01/01/16
* (ioKlausi) 错误修复

### 01/01/15
* (ioKlausi) 为恒温器添加了自己的小部件

### 01/01/14
* 添加（ioKlausi）通知助手

### 0.1.13
* (ioKlausi) 令牌有效性检查已修改

### 01/01/12
* (ioKlausi) 修改编码，包括哨兵，检查令牌有效性

### 01/01/11
* (ioKlausi) 适配器类型已更改

### 01/01/10
* 添加 (ioKlausi) API 请求 getmeasure 和 getroommeasure 以供手动使用

### 0.1.9
* 添加了 (ioKlausi) API Request synchomeschedule 供手动使用

### 0.1.8
* (ioKlausi) API 请求 switchhomeschedule 和所有可能的请求添加

### 0.1.7
* (ioKlausi) 修改国家的角色

### 0.1.6
* (ioKlausi) 使用计时器触发 homestates 请求并修改配置屏幕

### 0.1.5
* (ioKlausi) 添加密码加密/解密

### 0.1.4
* (ioKlausi) 创建了新的 NPM 版本

### 0.1.3
* (ioKlausi) 计划已修改

### 0.1.2
* (ioKlausi) “SpecialRequests”更改为设备“energyAPP”。

### 0.1.1
* 更改后立即触发 (ioKlausi) API homestatus

### 0.1.0
* (ioKlausi) 适配器的错误修复和发布

### 0.0.6
* (ioKlausi) 最新安装的默认值

### 0.0.5
* (ioKlausi) ACK 逻辑改变

### 0.0.4
* (ioKlausi) API 文件夹创建的更改

### 0.0.3
* (ioKlausi) 翻译和错误修复

### 0.0.2
* (ioKlausi) API 请求和结构建立

### 0.0.1
* (ioKlausi) 初始版本

适配器创建

＃＃ 执照
麻省理工学院执照

版权所有 (c) 2022 ioKlausi <nii@gmx.at>

特此免费授予任何获得本软件和相关文档文件（“软件”）副本的人，以不受限制地使用、复制、修改、合并到软件中，包括不受权利限制、发布、分发、再许可和/或出售本软件的副本，并允许为其设置本软件的人员，但须符合以下条件：

上述版权声明和本许可声明应出现在本软件的任何随附副本或大部分内容中。

本软件按“原样”提供，不提供任何形式的明示或明示、暗示的保证，包括但不限于对适销性、特定用途的适用性和非侵权性的保证。在任何情况下，作者或版权持有人均不对因本软件或本软件的使用或其他行为引起或与之相关的任何索赔、损害或其他责任承担责任，无论是合同、侵权或其他方面的责任。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.4 (2022-02-13)
* (ioKlausi) Release Script added

### 0.2.3
* (ioKlausi) AbortController added

### 0.2.2
* (ioKlausi) Übersetzungen hinzugefügt & Kompaktmodus getestet

### 0.2.1
* (ioKlausi) Creation of states adapted

### 0.2.0
* (ioKlausi) Compatibility check to js-controller 4.0

## License
MIT License

Copyright (c) 2022 ioKlausi <nii@gmx.at>

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