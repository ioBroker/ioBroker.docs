---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sonnen-charger/README.md
title: ioBroker.sonnen-charger
hash: 3S9zsY2VTfXcDFiF/YYwzuECoDTkYfp1ZS5+3WIDrlY=
---
![标识](../../../en/adapterref/iobroker.sonnen-charger/admin/sonnen-charger.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.sonnen-charger.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sonnen-charger.svg)
![安装数量](https://iobroker.live/badges/sonnen-charger-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/sonnen-charger-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.sonnen-charger.png?downloads=true)

# IoBroker.sonnen-充电器
**测试：** ![测试与发布](https://github.com/ChrisWbb/ioBroker.sonnen-charger/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 sonnen 充电器适配器
该适配器将您的 sonnenCharger 集成到 ioBroker 中。有关 sonnenCharger 的其他信息可以在 [供应商网页](https://sonnen.de/ladestation-elektroauto/) 上找到。

＃＃ 配置
创建 apdater 实例后，您必须配置几个参数：

|参数名称|描述|默认值|
|:---|:---|:---|
|IP 地址|sonnenCharger 的 IP 地址|-|
|端口|sonnenCharger 的 Modbus 接口端口|502|
|请求间隔|获取数据的时间间隔（以秒为单位）（ValueRage 30 - 3600）|30|
|允许对 sonnenCharger 进行写访问|**实验**将数据写入 sonnenCharger 时要小心|false|

＃＃ 用法
### 频道：信息
|ID|描述|数据类型|单位|读/写|附加信息|
|:---|:---|:---|:---|:---|:---|
|连接|已连接的设备或服务|布尔值|-|R|-|

### 频道：chargerSettings
|ID|描述|数据类型|单位|读/写|附加信息|
|:---|:---|:---|:---|:---|:---|
|serialNumber|序列号|字符串||R||
|型号|型号|字符串||R||
|hwVersion|硬件版本|字符串||R||
|swVersion|软件版本|字符串||R||
|numberOfConnectors|连接器数量|整数||R||

### 通道：chargerSettings.connector.\<number\>
|ID|描述|数据类型|单位|读/写|附加信息|
|:---|:---|:---|:---|:---|:---|
|连接器类型|连接器类型|字符串||R||
|numberOfPhases|相数|整数||R||
|l1ConnectedToPhase|L1 连接到相|整数||R||
|l2ConnectedToPhase|L2 连接到相|整数||R||
|l3ConnectedToPhase|L3 连接到相|整数||R||
|customMaxCurrent|自定义最大电流|float|A|R||

### 通道：测量值。\<number\>
| ID |描述|数据类型|单位|读/写|附加信息|
|:---|:---|:---|:---|:---|:---|
|connectorStatus|连接器状态 ID|整数||R||
|connectorStatusLabel|连接器状态标签|字符串||R|0：未知<br>1 : 插座可用<br>2：等待车辆连接<br>3：等待车辆启动<br>4：充电<br>5 : 电动车充电暂停<br>6：Evse 充电暂停<br>7：充电结束<br>8：充电故障<br>9：取消暂停充电<br>10：不可用|
|measuredVehicleNumberOfPhases|测量的车辆相数 id|integer||R||
|measuredVehicleNumberOfPhasesLabel|测量的车辆相数标签|string||R||
|evMaxPhaseCurrent|EV 最大相电流|float|A|R||
|targetCurrentFromPowerMgm|来自电源 mgm 或 modbus 的目标电流|float|A|R||
|频率|频率|浮点数|Hz|R||
|电压L1|L-N电压(L1)|浮点|V|R||
|电压L2|L-N电压(L2)|浮点|V|R||
|电压L3|L-N电压(L3)|浮点|V|R||
|currentL1|当前 (L1)|float|A|R||
|currentL2|当前 (L2)|float|A|R||
|currentL3|当前 (L3)|float|A|R||
|activePowerL1|有功功率 (L1)|float|kW|R||
|activePowerL2|有功功率 (L2)|float|kW|R||
|activePowerL3|有功功率 (L3)|float|kW|R||
|activePowerTotal|有功功率（总计）|float|kW|R||
|功率因数|功率因数|浮点||R||
|totalImportedActiveEnergyInRunningSession|运行会话中导入的总有功电能|float|kWh|R||
|runningSessionDuration|运行会话持续时间|数量|秒|R||
|runningSessionDepartureTime|运行会话离开时间|数量|秒|R|Unix 时间（自 1970-01-01 00:00:00 UTC 以来的秒数）|
|runningSessionDepartureTimeISO|ISO UTC 格式的运行会话出发时间|字符串||R||
|runningSessionID|运行会话ID|整数||R|在充电器与中央系统通信的情况下，这是中央系统通过OCPP提供的transactionId|
|evMaxPower|EV 最大功率|float|kW|R|在当前运行的充电会话中检测到的最大功率|
|evPlannedEnergy|EV 计划能量|float|kWh|R|计划为当前运行的充电会话提供的能量总量|

### 通道：命令
| ID |描述|数据类型|单位|读/写|附加信息|
|:---|:---|:---|:---|:---|:---|
|重新启动|重新启动 sonnen-charger|按钮||W||
|setTime|设置时间 UTC"|整数|秒|W|Unix 时间（自 1970-01-01 00:00:00 UTC 以来的秒数）|

### 通道：commands.connectors\<number\>
| ID |描述|数据类型|单位|读/写|附加信息|
|:---|:---|:---|:---|:---|:---|
|停止充电|停止充电|按钮||W||
|pauseCharging|暂停充电|按钮||W||
|setDepartureTime|设置出发时间|整数|秒|W||
|setCurrentSetpoint|设置当前设定点|float|A|W||
|cancelCurrentSetpoint|取消当前设定点|按钮||W||
|setPowerSetpoint|设置功率设定点|float|kW|W||
|cancelPowerSetpoint|取消功率设定点|按钮||W||

## Changelog

### **WORK IN PROGRESS**
* (ChrisWbb) adjust state roles
* (ChrisWbb) new version of @types/node
* (ChrisWbb) tests for node 20.x


### 1.1.1 (2023-03-30)
* (ChrisWbb) fixed release problem

### 1.1.0 (2023-03-30)
* (ChrisWbb) write access to holding register
* (ChrisWbb) refactoring async calls
* (ChrisWbb) smaller changes based on suggestions from review
* (ChrisWbb) update readme

### 1.0.2 (2023-02-18)
* (ChrisWbb) fix ESLint findings

### 1.0.1 (2023-02-18)
* (ChrisWbb) preparation for release
* (ChrisWbb) small fixes from adapter check

### 1.0.0 (2023-01-02)
* (ChrisWbb) initial version

## License
MIT License

Copyright (c) 2023 ChrisWbb <development@chrweber.de>

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