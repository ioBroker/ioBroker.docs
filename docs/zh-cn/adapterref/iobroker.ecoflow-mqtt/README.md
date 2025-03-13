---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ecoflow-mqtt/README.md
title: ioBroker.ecoflow-mqtt
hash: zdBuHyh7oPomLQxc/HTGcC5V7o02xoWkXphF/hw2E+A=
---
![标识](../../../en/adapterref/iobroker.ecoflow-mqtt/admin/ecoflow-mqtt.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.ecoflow-mqtt.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ecoflow-mqtt.svg)
![安装数量](https://iobroker.live/badges/ecoflow-mqtt-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/ecoflow-mqtt-stable.svg)
![新平台](https://nodei.co/npm/iobroker.ecoflow-mqtt.png?downloads=true)

# IoBroker.ecoflow-mqtt
**测试：**![测试与发布](https://github.com/foxthefox/ioBroker.ecoflow-mqtt/workflows/Test%20and%20Release/badge.svg)

## 用于 ioBroker 的 ecoflow-mqtt 适配器
连接到 Ecoflow 的产品（[https://www.ecoflow.com]）

＃＃ 警告
此适配器使用非官方方式与设备通信。
错误的通信或设置错误的值可能会影响设备的功能，并可能导致被排除在服务之外。

该适配器基于以下工作原理：

* 我自己的评估和研究
* https://github.com/tolwi/hassio-ecoflow-cloud
* https://haus-automatisierung.com/hardware/2023/02/13/ecoflow-river-2-usv-batteriespeicher.html
* https://forum.iobroker.net/topic/66743/ecoflow-connector-script-zur-dynamischen-leistungsanpassung
* https://konkludenz.de/en/making-ecoflow-wave2-smart-home-capable-with-node-red-and-mqtt

＃＃ 安装
该适配器位于稳定的存储库中，因此您可以通过搜索来安装它。
如果有可用更新，您应该安装它们。

如果有非常新的版本可用，可能需要从 npm/github 进行自定义安装。
在这种情况下，必须启用专家模式才能访问“octacat”图标。
![更多细节](../../../en/adapterref/iobroker.ecoflow-mqtt/doc/en/installation.md)

## EF 凭证
在管理页面（第一个选项卡）中需要插入 mqqt Broker 的 mqqt 凭证。

* 用户名 - 类似于“app-....”
* 用户 ID - 一个 19 位数字
* 用户密码 - 一个字母数字
* ClientID - 以“ANDROID_....”开头的字符串

有 3 种可能性：

1. 通过脚本 https://github.com/mmiller7/ecoflow-withoutflow/blob/main/cloud-mqtt/ecoflow_get_mqtt_login.sh
2. 通过网站 https://energychain.github.io/site_ecoflow_mqtt_credentials/
3. 通过适配器自己的算法（按下按钮），为此需要 ecoflow 用户名和密码。

mqqt Broker 设置是默认的，通常不需要修改。

!!! 如果 mqtt 服务器拒绝连接，使用选项 #2 检查该网站的输出可能会有所帮助，在某些情况下它会返回不同的 mqtt-broker 地址 !!!

## 设备设置和配置
使用“设备配置”选项卡添加您的设备。

<details><summary><i>参数化 Powerstream</i></summary><p>

* 添加新行
* 设置 Powerstream 的设备 ID，如应用程序中所示，例如“HW51....”
* 给它一个名字
* 选择版本（600W 或 800W）

</p></详情>

<details><summary><i>Powerstation 参数化</i></summary><p>

* 添加新行
* 设置 Powerstation 的设备 ID，如应用程序中所示，字符串因设备类型而异
* 给它一个名字
* 选择设备类型
* 如果连接了附加电池组，请检查其连接的端口号

</p></详情>

<details><summary><i>智能插头参数化</i></summary><p>

* 添加新行
* 设置智能插头的设备 ID，如应用程序中所示，例如“HW52....”
* 给它一个名字
* 将类型设置为“插头”

</p></详情>

<details><summary><i>参数化 Shelly</i></summary><p>

* 添加新行
* 设置 Shelly 的设备 ID，如应用程序中所示，请注意该 ID 与 Shelly 设备本身不同
* 给它一个名字
* 将类型设置为“Shelly3EM”

</p></详情>

<details><summary><i>参数化生成器</i></summary><p>

* 添加新行
* 设置发电机的设备 ID，如应用程序中所示，例如“DGEB....”
* 给它一个名字
* 将类型设置为“生成器”

</p></详情>

<details><summary><i>智能家居面板参数化</i></summary><p>

* 添加新行
* 设置发电机的设备 ID 如应用程序中所示，例如“SP10....”
* 给它一个名字
* 将类型设置为“SHP”或“SHP2”

</p></详情>

<details><summary><i>参数化电源套件和集线器</i></summary><p>

* 添加新行
* 设置电源套件的设备 ID，如应用程序中所示，例如“M10....”
* 给它一个名字
* 将类型设置为“Power Kit BP2000”或“Power Kit BP5000”
* 如果连接了第二块或第三块电池，则检查它是作为从属设备 1 还是从属设备 2

</p></详情>

<details><summary><i>参数化 Power Ocean DC 拟合</i></summary><p>

* 添加新行
* 设置发电机的设备 ID，如应用程序中所示，例如“HJ31....”
* 给它一个名字
* 将类型设置为“Power Ocean”
* 如果连接了第二块或第三块电池，则检查它是作为从属设备 1 还是从属设备 2

</p></详情>

<details><summary><i>参数化波形</i></summary><p>

* 添加新行
* 设置智能插头的设备 ID，如应用程序中所示，例如“KT21ZCH...”
* 给它一个名字
* 将类型设置为“Wave2”

</p></详情>

<details><summary><i>冰川参数化</i></summary><p>

* 添加新行
* 设置智能插头的设备 ID，如应用程序中所示，例如“BX11ZCB...”
* 给它一个名字
* 将类型设置为“冰川”

</p></详情>

<details><summary><i>参数化交流发电机</i></summary><p>

* 添加新行
* 设置智能插头的设备 ID，如应用程序中所示，例如“F371ZE...”
* 给它一个名字
* 将类型设置为“交流发电机 800W”

</p></详情>

使用“Homeassistant”选项卡设置与 HA 的 MQTT 连接

<details><summary><i>参数化 Homeassistant 连接器</i></summary><p>

* 启用服务
* 设置 HA 的 MQTT Broker 用户设置
* 设置HA的MQTT Broker连接参数
* 如果需要，选择调试设置

HA端修改：

* 适配器使用 HA 中的发现功能，不需要在 HA 中配置数据点。
* MQTT 附加组件...

</p></详情>

## 更新适配器
通常，在旧版本之上安装下一个版本就足够了。在某些情况下（例如 1.0.0），可能需要清除整个对象树。
如果数据点相关值发生变化，例如范围的最小值或最大值，则必须：

- 停止适配器
- 删除了相关数据点
- 启动适配器

此后，新的范围被接管。

## IoBroker 适配器功能
* 定义的设备通过 mqtt 连接到适配器
* 适配器过滤设备的传入消息。只有改变的值才会被内部存储
* 如果应用程序在某种条件下阻止调整，则在已知的情况下会复制（例如，当电池电量低于最低值时，逆变器会打开，您可以在日志中看到警告）
* 并非所有事情都是已知的，因此状态解释的信息可能不确定，这主要用尾随的“？”标记。

### 数据点设置更新备注（最小值、最大值、单位……）
如果在新版本的适配器中更改了数据点的设置（例如名称、单位、最大值），则更改只有在您执行以下操作后才会生效：

- 停止适配器实例
- 删除相应的数据点或适配器实例的整个对象结构
- 启动适配器实例

在启动期间会创建数据点，但如果存在则不会更改。

### 警告/错误的备注
适配器中的某些事件被标记为警告或错误，以便在日志级别处于信息模式时显示在日志中。
这不一定是故障或适配器不工作的指示，它更像是非预期行为的标志。原因可能不在适配器本身，但会引起注意。

## HA 连接器/网关
* HA 中的 MQTT 发现功能可实现优雅的信息交换方式
* 当 MQTT 代理已在 HA 中运行时，MQTT 发现功能可能无法激活，需要在重新配置 MQTT 服务时启用它
* 每次启动 iobroker 适配器时，所有发现对象都会传输到 HA（即使它们应该保留在 HA 中）
* iobroker 适配器过滤设备的传入消息。只有改变的值才会在内部存储并传输到 HA。
* 如果设备数据更新未设置某个值，则该值将在 HA 中显示为未知
* 如果设备可访问，则可用性将显示在设备连接中，这将继承到“子设备”（不可用性以相同的方式处理）

[一些提示](./doc/en/IOB_HA/navi.md)

### 功能注释
* 由于信息更新和命令传输的异步性，有时可能会出现竞争条件。因此，可以观察到命令开关及其在保持之前来回切换的过程。
* iobroker 可能无法正确识别 HA 的重启，因此需要手动重启适配器（WIP）

## 使用数据点实现设备和结构
对设备数据的一些解释

* 数字 -> 具有数值的数据点
* 级别 -> 具有数值的可调整数据点，有时也具有数字表示的选择
* 开关 -> 可调整数据点布尔值
* 诊断 -> 布尔或多状态数据点转换为文本
* 字符串 -> 数据点仅为文本
* 数组 -> 带有数组的数据点
* 值到文本的转换可能会使用未经验证的文本（欢迎反馈），这在文本末尾以“？”表示

### 发电站
[里弗马克斯](./doc/devices/rivermax.md)

[河专业](./doc/devices/riverpro.md)

[德尔塔迷你](./doc/devices/deltamini.md)

[三角洲](./doc/devices/delta.md)

[达美航空](./doc/devices/deltamax.md)

[達爾塔](./doc/devices/deltapro.md)

[河流 2 最大](./doc/devices/river2max.md)

[河流 2 临](./doc/devices/river2pro.md)

[達美航空 2](./doc/devices/delta2.md)

[达美航空 2 Max](./doc/devices/delta2max.md)

[德尔塔专业版](./doc/devices/deltaproultra.md)

[德尔塔 Pro 3](./doc/devices/deltapro3.md)

### 智能家居面板
[智能家居面板](./doc/devices/panel.md)

[智能家居面板2](./doc/devices/panel2.md)

### 电源套件和集线器
[电源套件](./doc/devices/powerkit.md)

### 动力海洋
[力洋](./doc/devices/powerocean.md)

### 生成器
[发电机](./doc/devices/generator.md)

双燃料发电机不可用，但如果有数据则可以实施。

### 电力流
[动力流](./doc/devices/pstream600.md)

还实现了 800W 版本，唯一的区别是最大功率为 800W。
供电优先级 -> 0/false = 优先电网供电；-> 1/true = 优先电池供电（充电）

### 智能插头
[智能插头](./doc/devices/plug.md)

### Shelly 设备
[Shelly3EM](./doc/devices/shelly3em.md)

### Wave 2 空调
[Wave2](./doc/devices/wave2.md)

波浪不可用，如果有数据，则可以实现。

### 冰川冰箱
[冰川](./doc/devices/glacier.md)

### 交流发电机
[交流发电机](./doc/devices/alternator.md)

### 不支持的设备
为了调试目的，创建了此部分，请选择设备（delta pro3、delta3、delta3 plus）并将序列号放在添加的行中，预计未知设备正在使用 protobuf，它会在日志中创建 [PROTOBUF unknown] 消息，它们包含原始十六进制电报

待办事项
* 检查命令中被遗忘的边界条件（抑制命令，或附加值）
* 如果需要倒车，请检查蜂鸣命令
* SlaveBattery DM，输出功率乘以 10
* 更多 SHP 值的 getCmds

## 免责声明
此开源软件与 Ecoflow 公司没有任何关联或认可。
使用该软件的风险由您自行承担，对于使用该软件可能产生的任何潜在损害或问题，我不承担任何责任。重要的是要注意，使用此开源软件不会得到 Ecoflow 公司的直接支持或保证。

## Changelog

### 1.3.0 (npm)
* (foxthefox) correction for PStream energy
* (foxthefox) new DeltaPro 3 implementation
* (foxthefox, radeonorama) enhancements alternator
* (foxthefox) major refactoring
* (foxthefox) new items to PowerOcean and HeatingRod


### 1.2.2 (npm)
* (foxthefox) some documentation for HA users
* (foxthefox) corrections in SHP2 protobuf definition
* (foxthefox) new datapoints in SHP2 ProtoTime, new telegram ProtoTimeStat mapped to ProtoTime
* (foxthefox) corrections to alternator (objects 268,269), power,wifiRssi setting, 
* (foxthefox) DeltaPro mpptTemp, outAmp new max value

### 1.2.1 (npm)
* (foxthefox) corrections for pstream objects, some changed from string to number
* (foxthefox) new SHP time task config values

### 1.2.0 (npm)
* (foxthefox) new values powerocean
* (foxthefox) new values powerstream
* (foxthefox) new values plug
* (foxthefox) enhancements on values for SHP2,DPU,alternator

### 1.1.3 (npm)
* (foxthefox) enhancements to alternator values
* (foxthefox) refactoring of protobuf handling/structure/component data

### 1.1.2 (npm)
* (bh1cqx) handle HA restart #PR193
* (foxthefox) initial state population of BPInfo2/3 to HA
* (foxthefox) jsonConfig enhancements

### 1.1.1 (npm)
* (foxthefox) changed code structure
* (foxthefox) initial state creation of BPInfo2/3 to HA

### 1.1.0 (npm)
* (foxthefox) added a preliminary version of alternator (no cmd, non final state names)
* (foxthefox) added a config possibility for unsupported devices for capturing the transmitted telegrams
* (foxthefox) #168 changed SHP2 masterIncreInfo.gridSta '0': 'Grid volt. not detected', '1': 'Grid OK'
* (foxthefox) #173 DPU added additional battery selection
* (foxthefox) #174 SHP2 added in ProtoTime the wattInfoChWatt, wattInfoAllHallWatt
* (foxthefox) #174 SHP2 added channel values of power and current in loadPower/loadCurrent including the sum of the values
* (foxthefox) #167 DELTA2/2Max pd.dsgPowerAC and pd.dsgPowerDC (type from 'power' to 'energy')

### 1.0.5 (npm)
* (foxthefox) mppt.outWatts 500 -> 600; inverter_heartbeat.invOutputWatts 800 -> 810
* (foxthefox) update of Readme (adapter now in stable)
* (foxthefox) changes for responsive design #160

### 1.0.4 (npm)
* (foxthefox) some more protobuf decoding for power ocean (ev pulse portion)
* (foxthefox) correction for powerkit telegram reception #99
* (foxthefox) corrected/imroved powerkit datapoints

### 1.0.3 (npm)
* (foxthefox) watth16/17/18 upper range 10kWh
* (foxthefox) 'Backup reserve' option added for D2M #137
* (foxthefox) preparations for DeltaPro3 decode

### 1.0.2 (npm)
* (foxthefox) correction of SHP commands (#130)

### 1.0.1 (npm)
* (foxthefox) correction to level commands (not recognized when appendix level.xxx)
* (foxthefox) "this." for timer functions
* (foxthefox) corrected some debug functions
* (foxthefox) min js-controller = 5.0.12

### 1.0.0 (npm) BREAKING
* (foxthefox) correction of state roles (requires deletion of ecoflow objecttree!)
* (foxthefox) deletion of InverterHeartbeat2 of power stream, since latest FW does not deliver this telegram anymore (most likely part of the larger inverter_heartbeat)
* (foxthefox) some multiplication and max settings for SHP and Power Ocean corrected, 


### 0.0.42 (npm)
* (foxthefox) correction SHP command
* (foxthefox) new data point power ocean, range min corrections
* (foxthefox) shelly3em model definition
* (foxthefox) IOB checker corrections

### 0.0.41 (npm)
* (foxthefox) correction in Compare function

### 0.0.40 (npm)
* (foxthefox) IOB checker corrections

### 0.0.39 (npm)
* (foxthefox) update devDeps
* (foxthefox) eslint upgrade and corrections

### 0.0.38 (npm)
* (foxthefox) additional datapoints for power ocean
* (foxthefox) corrections for upper limit on power ocean data points

### 0.0.37 (npm)
* (foxthefox) corrections for HA discovery of PowerOcean/SHP2/PowerKit

### 0.0.36 (npm)
* (foxthefox) correction bmsMaster.cellVol/cellTemp as array for DeltaPro
* (foxthefox) correction for transfer of values derived from protobuf to HA
* (foxthefox) enhanced to device specific logging

### 0.0.35 (npm)
* (foxthefox) unified detail debug settings, device specific debugging (new checkbox in device config)

### 0.0.34 (npm)
* (foxthefox) first implementation for power ocean kit
* (foxthefox) first implementation for smart home panel 2
* (foxthefox) new values watth16/17/18 for powerstream
* (foxthefox) deltapro max values mmpt.inAmp, mpptTemp
* (foxthefox) fixed updates to info.reconnects
* (foxthefox) fixed #90 cfgAcEnabled on river2max
* (foxthefox) logging enhancements

### 0.0.33 (npm)
* (foxthefox) added Power Kit
* (foxthefox) added new object ratedPower as command for powerstream 

### 0.0.32 (npm)
* (foxthefox) added Shelly3EM reporting (cloud to cloud connection to be setup in EF App)

### 0.0.31 (npm)
* (foxthefox) optimization EF MQTT reconnect
* (foxthefox) initial update slave battery to HA
* (foxthefox) online status from latestQuotas
* (foxthefox) adapter config merge all device tabs into one (to overcome the problem that on tablets the last tab is not reachable), size adjustment
* (foxthefox) correction for deltapro at xt60ChgType
* (foxthefox) correction for river2max commands

### 0.0.30 (npm)
* (foxthefox) correction for River2Pro/Max cmd dcChgCurrent
* (foxthefox) correction for Delta2 cmd dcChgCurrent/pv2DcChgCurrent
* (foxthefox) correction for slave battery transfer to HA

### 0.0.29 (npm)
* (foxthefox) new objects for wave2
* (foxthefox) device emulation
* (foxthefox) mppt max value corrections

### 0.0.28 (npm)
* (foxthefox) fix value normalization (DP,wave2,glacier)
* (foxthefox) set actions initially to false to avoid null
* (foxthefox) fix latestQuotas for glacier/wave2
* (foxthefox) enhance logging

### 0.0.27 (npm)
* (foxthefox) fixed issues with additional battery and homeassistant transfer
* (foxthefox) bmsMaster Delta Pro new points (maxVolDiff,mosState,cellSeriesNum,cellNtcNum)
* (foxthefox) fix issue with SHP heartbeat.errorCodes

### 0.0.26 (npm)
* (foxthefox) bmasMaster.amp max = 50
* (foxthefox) corrections SHP

### 0.0.25 (npm)
* (foxthefox) new datapoints for DeltaPro

### 0.0.24 (npm)
* (foxthefox) SHP incomming data processing

### 0.0.23 (npm)
* (foxthefox) correction to latestQuotas (shift from info to action)
* (foxthefox) X_Unknown_15 range max 1000
* (foxthefox) new debug button for devices with protobuf msg

### 0.0.22 (npm)
* (foxthefox) Homeassistant Connector/Gateway
* (foxthefox) added Generator (indication only, no knowledge on commands)
* (foxthefox) added Delta Pro Ultra
* (foxthefox) added Smart Home Panel
* (foxthefox) latestQuotas/getTimeTaskConfig moved from info to action
* (foxthefox) uptime no max boundary
* (foxthefox) several adjustable values which represent a mode or predefined set of settings are now using "states" definition (IOB)
* (foxthefox) changed factor for pd/usb1Watts, usb2Watts, qcUsb1Watts, qcUsb2Watts
* (foxthefox) info for offline/online status with EF cloud
* (foxthefox) correction for protobuf cmds (dataLen)
* (foxthefox) some strings are now diagnostic
* (foxthefox) X_unknown_15/17/34 are now numbers
* (foxthefox) skip telegrams where openBmsIdx=0, bqSysStatReg=0
* (foxthefox) deltapro mppt value changes (inWatts/outWatts max=1600, mult= 0.001)
* (foxthefox) deltapro new values bmsMaster.diffSoc, bmsMaster.packSn


### 0.0.21 (npm)
* (foxthefox) more debug on connection
* (foxthefox) new datapoints for wave2
* (foxthefox) deleted max on duration values
* (foxthefox) moved several datapoints from number/string to arrays (mainly wave2/glacier)
* (foxthefox) moved datapoints from string to arrays (bms*.hwVersion, bms*.hwEdition, bms*.cellVol, bms*.cellTemp, pd.bmsKitState)
* (foxthefox) plug switch "dynWattEnable" which includes plug for dynamic watts of powerstream

### 0.0.20 (npm)
* (foxthefox) first additional integration tests
* (foxthefox) corrections in data model
* (foxthefox) new datapoints for glacier
* (foxthefox) new button in config for 'debug quotas' (retrieving data for all JSON-devices and displaying it)

### 0.0.19 (npm)
* (foxthefox) better error handling of incomplete messages from pstream
* (foxthefox) added indication of time tasks
* (foxthefox) cleanup pstream/plugs creation (both are protobuf)
* (foxthefox) further refactoring of code -> devices must be again defined !
* (foxthefox) differentiation between actual energy values and historical
* (foxthefox) getAllTaskCfg for powerstations in structure info
* (foxthefox) initial lastQuotas after adapter start for powerstream and plug
* (foxthefox) interpreted unknown values have now clear names
* (foxthefox) cyclic latestQuotas call instead of forced disconnect and reconnect (reconnects value only for checking, if stays with 0/null adapter has still mqtt telegrams)
* (foxthefox) new data points for deltamax
* (foxthefox) corrected pstream value changes to 0 (numbers), pdata must be omitted

### 0.0.18 (npm)
* (foxthefox) correction of wrong version number io io-package.json

### 0.0.17
* (foxthefox) added ems objects for River2Pro
* (foxthefox) more logging to pstream decode
* (foxthefox) spelling correction for latestQuotas 

### 0.0.16
* (foxthefox) correction for array of devices, cause of "loosing" power stations

### 0.0.15
* (foxthefox) new implementation of Wave 2 Air conditioner
* (foxthefox) new implementation of Glacier refrigerator
* (foxthefox) correction of factors for delta2/delta2max/river2pro/river2max (mppt.?Vol, mppt.?Amp, mppt.?Watts)
* (foxthefox) some shifting from string to diagnostics
* (foxthefox) some updates to max values
* (foxthefox) delta2/delta2max pd.chgPowerAC and pd.chgPowerDC changed from power to energy 
* (foxthefox) correction of plug_heartbeat values, protobuf shifts from snake_case to camelCase

### 0.0.14
* (foxthefox) new implementation of River 2 Pro, River 2 Max, River Pro, River Max
* (foxthefox) new feature get "lastQuotas"
* (foxthefox) recfactoring of protobuf encoding
* (foxthefox) watth5=daily energy plug, watth6=on time plug
* (foxthefox) plug_heartbeat new values unknown16...19

### 0.0.13
* (foxthefox) correction for changing of factors for pstations
* (foxthefox) watth5 for plugs
* (foxthefox) more logging pstream/plug
* (foxthefox) optional detection of no updates from mqtt server -> reconnection

### 0.0.12
* (foxthefox) new command brightness for plugs
* (foxthefox) correction of factors for plugs
* (foxthefox) powerstream bpType with value as texts
* (foxthefox) DELTA 2 factors corrected (mppt.inVol, mppt.inAmp,mppt.carOutAmp, mppt.carOutVol)
* (foxthefox) naming of watth1...8 (except 5)

### 0.0.11
* (foxthefox) correction this.pstreamStatesDict to cope with pstream and plug

### 0.0.10
* (foxthefox) unknown pstream message debug possibility
* (foxthefox) inv.outTemp max=90°C, inverter_heartbeat.pv1/2inputWatts max=600W
* (foxthefox) new function -> smart plugs

### 0.0.9
* (foxthefox) final version of credential creation, at least 6.12.3 for admin required
* (foxthefox) pd.wattsInSum max=4000W, pd.wattsOutSum max=4000W
* (foxthefox) unknwon59 -> batChargingTime, battMin -> batDischargingTime
* (foxthefox) processing multiple messages in one datagram 

### 0.0.8
* (foxthefox) Delta2Max mppt.outVol mult=0.001 instead 0.1
* (foxthefox) handling additional battery for Delta2Max
* (foxthefox) pd.dsgPowerAC -> mult 0.001 Delta2Max
* (foxthefox) pd.chgPowerAC -> mult 0.001 Delta2Max
* (foxthefox) inv.acChgRatedPower -> max 4000W
* (foxthefox) inv.FastChgWatts -> max 2400W
* (foxthefox) chgwatts Delta 2 -> min 50W

### 0.0.7
* (foxthefox) jsonUI wrong attr for additional battery corrected

### 0.0.6
* (foxthefox) device doc
* (foxthefox) cfgDcChgCurrent/pv2DcChgCurrent changed back to start at 4A

### 0.0.5
* (foxthefox) cfgDcChgCurrent/pv2DcChgCurrent again with min=0, seems that there comes 0 at a certein telegram and causing warning
* (foxthefox) energy values (yield per day) for powerstream

### 0.0.4
* (foxthefox) new switch inverter_heartbeat.feedPriority (handling the excessive solar energy when battery is full)

### 0.0.3
* (foxthefox) requirement for admin 6.12.2 -> 6.12.0
* (foxthefox) iverter_heartbeat pv1InputCur, pv2InputCur factor corrected now 0.1
* (foxthefox) ems.chgAmp factor 0.0001 ( seemed too high by factor 10 )
* (foxthefox) bmsMaster.tagChgAmp factor 0.0001 ( seemed too high by factor 10 )
* (foxthefox) delta2max command for cfgDcChgCurrent/pv2DcChgCurrent changed
* (foxthefox) ensuring that commanded bppowerSoc value is always minimum 5% higher than the ems.minDsgSoc, also putting actual minDsgSoc into the command

### 0.0.2
* (foxthefox) pv2DcChgCurrent as level in delta2max
* (foxthefox) *pv2DcChgCurrent with range 4-8 and step 2
* (foxthefox) chgPauseFlag as switch in delta2max

### 0.0.1 (npm)
* (foxthefox) initial release

## License
MIT License

Copyright (c) 2023-2025 foxthefox <foxthefox@wysiwis.net>

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