---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sonnen-charger/README.md
title: ioBroker.sonnen-charger
hash: vATzeNQGQW8IZuSUI/bk1Aq+ygmG+6AQwEb0Fpee0Jc=
---
![标识](../../../en/adapterref/iobroker.sonnen-charger/admin/sonnen-charger.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.sonnen-charger.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sonnen-charger.svg)
![安装数量](https://iobroker.live/badges/sonnen-charger-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/sonnen-charger-stable.svg)
![新平台](https://nodei.co/npm/iobroker.sonnen-charger.png?downloads=true)

# IoBroker.sonnen-charger
**测试：**![测试与发布](https://github.com/ChrisWbb/ioBroker.sonnen-charger/workflows/Test%20and%20Release/badge.svg)

## Sonnen-charger 适配器，适用于 ioBroker
该适配器将您的 sonnenCharger 集成到 ioBroker 中。有关 sonnenCharger 的更多信息，请参阅[供应商网页](https://sonnen.de/ladestation-elektroauto/)。

＃＃ 配置
创建 apdater 实例后，您必须配置几个参数：

|参数名称|描述|默认|
|:---|:---|:---|
|IP 地址|sonnenCharger 的 IP 地址|-|
|端口|sonnenCharger 的 Modbus 接口端口|502|
|请求间隔|获取数据的间隔时间（秒）（ValueRage 30 - 3600）|30|
|允许对 sonnenCharger 进行写访问|**实验性** 将数据写入 sonnenCharger 时要小心|false|

＃＃ 用法
### 频道：信息
|ID|描述|数据类型|单位|读/写|附加信息|
|:---|:---|:---|:---|:---|:---|
|连接|已连接的设备或服务|布尔值|-|R|-|

### 频道：充电器设置
|ID|描述|数据类型|单位|读/写|附加信息|
|:---|:---|:---|:---|:---|:---|
|serialNumber|序列号|字符串||R||
|模型|模型|字符串||R||
|hwVersion|硬件版本|字符串||R||
|swVersion|软件版本|字符串||R||
|numberOfConnectors|连接器数量|整数||R||

### 频道：chargerSettings.connector.\<number\>
|ID|描述|数据类型|单位|读/写|附加信息|
|:---|:---|:---|:---|:---|:---|
|connectorType|连接器类型|字符串||R||
|numberOfPhases|阶段数|整数||R||
|l1ConnectedToPhase|L1 连接到相位|整数||R||
|l2ConnectedToPhase|L2 连接到相位|整数||R||
|l3ConnectedToPhase|L3 连接到相位|整数||R||
|customMaxCurrent|自定义最大电流|float|A|R||

### 频道：测量值。\<number\>
|ID|描述|数据类型|单位|读/写|附加信息|
|:---|:---|:---|:---|:---|:---|
|connectorStatus|连接器状态id|整数||R||
|connectorStatusLabel|连接器状态标签|字符串||R|0 ：未知<br>1：插座可用<br>2：等待车辆连接<br>3：等待车辆启动<br>4：充电<br>5：EV 暂停充电<br>6：Evse 暂停充电<br>7：充电结束<br>8：充电故障<br>9：取消暂停充电<br>10 ：不可用|
|measuredVehicleNumberOfPhases|测量的车辆相数id|integer||R||
|measuredVehicleNumberOfPhasesLabel|测量车辆相数标签|string||R||
|evMaxPhaseCurrent|EV 最大相电流|float|A|R||
|targetCurrentFromPowerMgm|来自电源 mgm 或 modbus 的目标电流|float|A|R||
|频率|频率|浮点数|Hz|R||
|voltageL1|L-N电压（L1）|float|V|R||
|voltageL2|L-N 电压 (L2)|float|V|R||
|voltageL3|L-N电压（L3）|float|V|R||
|currentL1|电流 (L1)|float|A|R||
|currentL2|当前 (L2)|float|A|R||
|currentL3|当前 (L3)|float|A|R||
|activePowerL1|有功功率（L1）|float|kW|R||
|activePowerL2|有功功率（L2）|float|kW|R||
|activePowerL3|有功功率（L3）|float|kW|R||
|activePowerTotal|有功功率（总计）|float|kW|R||
|powerFactor|功率因数|float||R||
|totalImportedActiveEnergyInRunningSession|运行会话中输入的总有功电能|float|kWh|R||
|runningSessionDuration|运行会话持续时间|数量|秒|R||
|runningSessionDepartureTime|运行会话出发时间|number|seconds|R|Unix 时间（自 1970-01-01 00:00:00 UTC 以来的秒数）|
|runningSessionDepartureTimeISO|ISO UTC 格式的运行会话出发时间|字符串||R||
|runningSessionID|运行会话 ID|整数||R|在充电器与中央系统通信的情况下，这是中央系统通过 OCPP 提供的 transactionId|
|evMaxPower|EV 最大功率|float|kW|R|当前正在运行的充电会话中检测到的最大功率|
|evPlannedEnergy|EV 计划能量|float|kWh|R|计划为当前正在运行的充电会话输送的总能量|

### 频道：命令
|ID|描述|数据类型|单位|读/写|附加信息|
|:---|:---|:---|:---|:---|:---|
|restart|重新启动 sonnen-charger|按钮||W||
|setTime|设置时间UTC"|整数|秒|W|Unix时间（自1970-01-01 00:00:00 UTC以来的秒数）|

### 频道：commands.connectors\<number\>
|ID|描述|数据类型|单位|读/写|附加信息|
|:---|:---|:---|:---|:---|:---|
|stopCharging|停止充电|按钮||W||
|pauseCharging|暂停充电|按钮||W||
|setDepartureTime|设置出发时间|整数|秒|W||
|setCurrentSetpoint|设置当前设定点|float|A|W||
|cancelCurrentSetpoint|取消当前设定点|按钮||W||
|setPowerSetpoint|设置功率设定点|float|kW|W||
|cancelPowerSetpoint|取消功率设定点|按钮||W||

## **正在进行中**
*（ChrisWbb）智能模式实现（目前未被禁用）
*（ChrisWbb）更新依赖版本

### 1.2.1（2024-05-30）
* (ChrisWbb) 修复适配器检查器的结果

### 1.2.0（2024-05-30）
*（ChrisWbb）更新依赖版本
* (ChrisWbb) 修复适配器检查器的发现
*（ChrisWbb）调整国家角色
*（ChrisWbb）@types/node 的新版本
*（ChrisWbb）针对节点 20.x 进行测试

### 1.1.1 (2023-03-30)
*（ChrisWbb）修复发布问题

### 1.1.0 (2023-03-30)
*（ChrisWbb）对保持寄存器进行写访问
*（ChrisWbb）重构异步调用
*（ChrisWbb）根据评论的建议进行了较小的修改
*（ChrisWbb）更新自述文件

### 1.0.2 (2023-02-18)
*（ChrisWbb）修复 ESLint 发现的问题

### 1.0.1 (2023-02-18)
* (ChrisWbb) 准备发布
*（ChrisWbb）适配器检查的小修复

### 1.0.0 (2023-01-02)
*（ChrisWbb）初始版本

## Changelog

## License
MIT License

Copyright (c) 2024 ChrisWbb <development@chrweber.de>

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