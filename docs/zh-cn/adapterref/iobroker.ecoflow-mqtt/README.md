---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ecoflow-mqtt/README.md
title: ioBroker.ecoflow-mqtt
hash: AF+RI5eEFD5nF67c1zE0cBxPzygqQnbWGlpn/U2DwyE=
---
![标识](../../../en/adapterref/iobroker.ecoflow-mqtt/admin/ecoflow-mqtt.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.ecoflow-mqtt.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ecoflow-mqtt.svg)
![安装数量](https://iobroker.live/badges/ecoflow-mqtt-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/ecoflow-mqtt-stable.svg)
![NPM](https://nodei.co/npm/iobroker.ecoflow-mqtt.png?downloads=true)

# IoBroker.ecoflow-mqtt
**测试：** ![测试与发布](https://github.com/foxthefox/ioBroker.ecoflow-mqtt/workflows/Test%20and%20Release/badge.svg)

## 用于 ioBroker 的 ecoflow-mqtt 适配器
连接到 Ecoflow 的产品（[https://www.ecoflow.com]）

＃＃ 警告
此适配器使用非官方方式与设备通信。

错误的通信或错误的设置值可能会影响设备的功能，并可能导致设备被排除在服务之外。

该适配器基于以下人员的工作成果：

我自己评估和研究
- https://github.com/tolwi/hassio-ecoflow-cloud
- https://haus-automatisierung.com/hardware/2023/02/13/ecoflow-river-2-usv-batteriespeicher.html
- https://forum.iobroker.net/topic/66743/ecoflow-connector-script-zur-dynamischen-leistungsanpassung
- https://konkludenz.de/en/making-ecoflow-wave2-smart-home-capable-with-node-red-and-mqtt

＃＃ 安装
该适配器已在稳定版软件仓库中，因此您可以通过搜索安装它。

如果有可用更新，您应该安装它们。

如果有最新版本可用，可能需要从 npm/github 进行自定义安装。

在这种情况下，必须启用专家模式才能访问“octacat”图标。

![更多细节](../../../en/adapterref/iobroker.ecoflow-mqtt/doc/en/installation.md)

## EF凭证
需要在管理页面（第一个标签页）中输入 MQTT 代理的 MQTT 凭据。

- 用户名 - 类似“app-....”
- 用户ID - 一个19位数的数字
- 用户密码 - 字母数字
- ClientID - 以“ANDROID\_....”开头的字符串。

有三种可能性：

1. 通过脚本 https://github.com/mmiller7/ecoflow-withoutflow/blob/main/cloud-mqtt/ecoflow_get_mqtt_login.sh
2. 通过网站 https://energychain.github.io/site_ecoflow_mqtt_credentials/
3. 通过适配器自身的算法（按下按钮），为此需要 ecoflow 用户名和密码。

mqqt Broker 设置是默认的，通常不需要修改。

!!! 如果 MQTT 服务器拒绝连接，使用选项 2 检查该网站的输出可能会有所帮助，在某些情况下，它会返回不同的 MQTT 服务器地址 !!!

## 设备设置和配置
请使用“设备配置”选项卡添加您的设备。

<details><summary><i>Powerstream 或 STREAM 的参数化</i></summary><p>

- 添加新行
- 将 (Power)Stream 的设备 ID 设置为应用程序中显示的内容，例如“HW51..../BK...”。
给它起个名字
选择版本

</p></details>

<details><summary><i>电站参数化</i></summary><p>

- 添加新行
- 设置 Powerstation 的设备 ID，如应用程序中所示，字符串因设备类型而异。
给它起个名字
- 选择设备类型
- 如果连接了额外的电池组，请检查其连接的端口号。

</p></details>

<details><summary><i>智能插头的参数化</i></summary><p>

- 添加新行
- 将智能插头的设备 ID 设置成应用程序中显示的形式，例如“HW52...”。
给它起个名字
- 将类型设置为“插头”

</p></details>

<details><summary><i>智能电表的参数化</i></summary><p>

- 添加新行
- 根据应用程序中显示的信息设置智能电表（Shelly 或 EF）的设备 ID。如果是 Shelly 型号，请注意该 ID 与 Shelly 设备本身的 ID 不同。
给它起个名字
- 将类型设置为“Shelly3EM”或“EF智能电表”

</p></details>

<details><summary><i>生成器的参数化</i></summary><p>

- 添加新行
- 将 Generator 的设备 ID 设置为应用程序中显示的内容，例如“DGEB...”。
给它起个名字
- 将类型设置为“生成器”

</p></details>

<details><summary><i>智能家居面板参数化</i></summary><p>

- 添加新行
- 将 Generator 的设备 ID 设置为应用程序中显示的内容，例如“SP10...”。
给它起个名字
- 将类型设置为“SHP”或“SHP2”

</p></details>

<details><summary><i>电源套件和集线器的参数设置</i></summary><p>

- 添加新行
- 将电源套件的设备 ID 设置为应用程序中显示的内容，例如“M10...”。
给它起个名字
- 将类型设置为“电源套件 BP2000”或“电源套件 BP5000”
- 如果连接了第二块或第三块电池，请将其标记为 slave1 或 slave2。

</p></details>

<details><summary><i>参数化 Power Ocean DC 拟合</i></summary><p>

- 添加新行
- 将 Generator 的设备 ID 设置为应用程序中显示的内容，例如“HJ31...”。
给它起个名字
- 将类型设置为“Power Ocean”
- 如果连接了第二块或第三块电池，请将其标记为 slave1 或 slave2。

</p></details>

<details><summary><i>波的参数化</i></summary><p>

- 添加新行
- 将智能插头的设备ID设置为应用程序中显示的值，例如“KT21ZCH...”
给它起个名字
- 将类型设置为“Wave2”

</p></details>

<details><summary><i>冰川参数化</i></summary><p>

- 添加新行
- 将智能插头的设备ID设置为应用程序中显示的值，例如“BX11ZCB...”
给它起个名字
- 将类型设置为“冰川”

</p></details>

<details><summary><i>交流发电机的参数化</i></summary><p>

- 添加新行
- 将智能插头的设备ID设置为应用程序中显示的值，例如“F371ZE...”
给它起个名字
- 将类型设置为“800W交流发电机”

</p></details>

使用“Home Assistant”选项卡设置与 Home Assistant 的 MQTT 连接。

<details><summary><i>参数化 HomeAssistant 连接器</i></summary><p>

- 启用该服务
- 设置HA的MQTT代理的用户设置
- 设置HA的MQTT代理的连接参数
- 如果需要，请选择调试设置

HA侧的修饰：

- 该适配器使用 HA 中的发现功能，无需在 HA 中配置数据点。
- MQTT 插件...

</p></details>

## 更新适配器
通常情况下，只需在旧版本之上安装新版本即可。但在某些情况下（例如 1.0.0 版本），可能需要删除整个对象树。

如果数据点相关值发生更改，例如范围的最小值或最大值，则必须执行以下操作：

- 停止适配器
- 删除了相关数据点
启动适配器

此后，新的靶场将接管。

## IoBroker 适配器函数
- 定义的设备通过 MQTT 连接到适配器
适配器会对来自设备的消息进行过滤，只有更改后的值才会被内部存储。
- 如果应用程序在特定条件下阻止调整，则在已知该条件时会进行复制（例如，当电池电量低于最低值时阻止逆变器开启，您可以在日志中看到警告）。
- 并非所有信息都已知，因此状态解读可能存在不确定性，这种情况通常会在信息末尾加上“？”标记。

### 关于更新数据点设置（最小值、最大值、单位等）的备注
如果在新版本的适配器中更改了数据点的设置（例如名称、单位、最大值），则更改不会立即生效，直到您执行以下操作：

- 停止适配器实例
- 删除适配器实例的相应数据点或整个对象结构
- 启动适配器实例

启动时会创建数据点，但不会更改已存在的数据点。

### 对警告/错误的备注
当日志级别设置为信息模式时，适配器中的某些事件会被标记为警告或错误，以便在日志中显示。

这并不一定意味着适配器出现故障或无法正常工作，而更像是表明存在非预期行为。问题原因可能并非出在适配器本身，但这足以引起注意。

## HA 连接器/网关
- HA 中的 MQTT 发现功能提供了一种优雅的信息交换方式。
- 当 MQTT 代理已在 HA 环境中运行时，MQTT 发现功能可能不会激活，需要在重新配置 MQTT 服务时启用该功能。
- 每次启动 iobroker 适配器时，所有发现对象都会传输到 HA（即使它们应该保留在 HA 中）。
- iobroker适配器过滤来自设备的传入消息。只有更改的值才会存储在内部并传输到HA。
- 如果某个值未通过设备数据更新设置，则在 HA 中将显示为未知。
- 如果设备可连接，则设备连接状态将显示可用性，此状态会传递给“子设备”（不可用状态的处理方式相同）。

[HA的一些提示](./doc/en/IOB_HA/navi.md)

### 功能注释
由于信息更新和命令传输不同步，有时会出现竞争条件。因此，可以观察到，当发出命令后，开关会在最终稳定下来之前来回切换。

## 已实现的设备和结构以及数据点
对设备数据的一些解释

- 数字 -> 具有数值的数据点
- 级别 -> 具有数值的可调节数据点，有时也指具有数值表示的选择项
- 开关 -> 可调数据点布尔值
- 诊断 -> 布尔或多状态数据点转换为文本
- 字符串 -> 仅以文本形式表示的数据点
- 数组 -> 包含数组的数据点
- 值到文本的转换可能使用未经验证的文本（欢迎提供反馈），文本末尾会显示“?”。

### 发电站
[里弗·马克斯](./doc/devices/rivermax.md)

[River Pro](./doc/devices/riverpro.md)

[River 2 Max](./doc/devices/river2max.md)

[River 2 Pro](./doc/devices/river2pro.md)

[河流 3](./doc/devices/river3.md)

[River 3 Plus](./doc/devices/river3plus.md)

[Delta Mini](./doc/devices/deltamini.md)

[三角洲](./doc/devices/delta.md)

[最大差值](./doc/devices/deltamax.md)

[德尔塔2号](./doc/devices/delta2.md)

[Delta 2 Max](./doc/devices/delta2max.md)

[Delta 3](./doc/devices/delta3.md)

[Delta 3 Plus](./doc/devices/delta3plus.md)

[Delta 3 Max Plus](./doc/devices/delta3maxplus.md)

[Delta Pro](./doc/devices/deltapro.md)

[Delta Pro 3](./doc/devices/deltapro3.md)

[Delta Pro Ultra](./doc/devices/deltaproultra.md)

### 智能家居面板
[智能家居面板](./doc/devices/panel.md)

[智能家居面板 2](./doc/devices/panel2.md)

### 电源套件和集线器
[电源套件](./doc/devices/powerkit.md)

### 海洋之力
[Power Ocean DC](./doc/devices/powerocean.md)

[海洋动力+](./doc/devices/poweroceanplus.md)

[Power Ocean DC FIT](./doc/devices/poweroceanfit.md)

### 生成器
[发电机](./doc/devices/generator.md)

双燃料发电机目前尚不可用，但如果有相关数据，则可以考虑安装。

### Powerstream & Stream
[动力流](./doc/devices/pstream600.md)

[交流电](./doc/devices/stream_ac.md)

[Stream AC PRO](./doc/devices/stream_ac_pro.md)

[Stream Ultra](./doc/devices/stream_ultra.md)

[流式逆变器](./doc/devices/stream_inverter.md)

800W 版本也已实现，唯一的区别在于其最大功率为 800W。

供电优先级 -> 0/false = 优先使用电网供电；-> 1/true = 优先使用电池供电（充电）

### 智能插座
[智能插头](./doc/devices/plug.md)

### 智能电表设备
[Shelly3EM](./doc/devices/shelly3em.md)

[智能电表](./doc/devices/smartmeter.md)

### Wave 空调
[第二波](./doc/devices/wave2.md)

[Wave3](./doc/devices/wave3.md)

Wave功能目前不可用，但如果有数据的话可以实现。

### 冰川冰箱
[冰川](./doc/devices/glacier.md)

[冰川经典款 55升](./doc/devices/glacier55.md)

### 交流发电机
[交流发电机](./doc/devices/alternator.md)

### 不支持的设备
此部分用于调试目的，请选择设备（Delta Pro3、Delta3、Delta3 Plus），并在新增行中输入序列号。预计未知设备正在使用 protobuf，它会在日志中创建 [PROTOBUF unknown] 消息，这些消息包含原始十六进制电报。

## 待办事项
- 检查命令的遗漏边界条件（禁止命令，或附加值）
- 检查是否需要倒车时会发出蜂鸣声
- SlaveBattery DM，输出功率乘以 10
- 更多用于 SHP 值的 getCmds

## 免责声明
本开源软件与 Ecoflow 公司没有任何关联，也未获得其任何形式的认可。

使用本软件的风险和后果由您自行承担，本人对因使用本软件而可能产生的任何潜在损害或问题不承担任何责任。请务必注意，使用本开源软件不包含来自 Ecoflow 公司的直接支持或保证。

## Changelog

### 1.4.9 (WIP)

- (foxthefox) new datapoints Delta2max

### 1.4.8 (npm)

- (foxthefox) new device Glacier Classic 55L support
- (foxthefox) new device Delta 3 Max Plus support
- (foxthefox) new device Stream AC support
- (foxthefox) enhancements on wave3
- (foxthefox) poweroceanplus set hrPwr/fromPv/romBat/fromGrid values to 0 for non transmitted datapoints in HeatingRodEnergyStreamShow
- (foxthefox) poweroceanplus pcsActPwr max 20kW, pcsXPhase_amp max 60A
- (foxthefox) corrections in BMSHeartBeatReport for river3/river3plus
- (foxthefox) dev dependencies cleanup

### 1.4.7 (npm)

- (foxthefox) poweroceanplus, set mpptPwr/sysGridPwr/bpPwr values to 0, when the entity is not sent within the telegram
- (foxthefox) poweroceanplus, bpTargetSoc max new set to 101%, pcsBpPower max=10kW, pcsXPhase_actPwr min=-5kW

### 1.4.6 (npm)

- (foxthefox) powerocean implementation of ParallelEnergyStreamDetail which is the update to ParallelEnergyStreamReport
- (foxthefox) powerocean implementation of EnergyStreamDetail which is the update to EnergyStreamReport

### 1.4.5 (npm)

- (foxthefox) change from object to array for messages (for telegrams with multiple messages of same type i.e. powerocean)
- (foxthefox) change of cmdId/CmdFunc structure

### 1.4.4 (npm)

- (foxthefox) new datapoints for PowerOcean (HeatingRod, ParallelEnergy)
- (foxthefox) improvements tp powerocean plus
- (foxthefox) corrections for powerocean
- (foxthefox) testing JSON->buffer

### 1.4.3 (npm)

- (foxthefox) new cmd Stream to adjust output power via load task (dayResidentLoadList)
- (foxthefox) correction energyBackupand cmd for River3(Plus)
- (foxthefox) new device Stream Inverter supported
- (foxthefox) first improvements for power ocean plus (i.e. 6 batteries)
- (foxthefox) SHP time task enable switch and load level adjustment

### 1.4.2 (npm)

- (foxthefox) completion commands for River3(Plus)
- (foxthefox) correction of bool in proto of River3(Plus)

### 1.4.1 (npm)

- (foxthefox) Correction of multiplication, some float values may be incorrect now
- (foxthefox) new commands for STREAM and River3
- (foxthefox) River3 llcbusvol correction
- (foxthefox) Stream max settings for power,
- (foxthefox) separate handler for unknown devices

### 1.4.0 (npm)

- (foxthefox) new support of EF Smartmeter
- (foxthefox) new support of River3 (without cmds)
- (foxthefox) new support of Stream Series
- (foxthefox) new support of Power Ocean Plus
- (foxthefox) new Statistics for Gen3 powerstattions
- (foxthefox) new battery data for Gen3 powerstattions
- (foxthefox) new support of Power Ocean DC FIT
- (foxthefox) new support of Wave3 (without cmds!)
- (foxthefox) support of 3 extra batteries DeltaProUltra
- (foxthefox) new datapoints for stream series
- (foxthefox) new datapoints for river2max/pro in pd section
- (foxthefox) correction of river2max command chgWatts
- (foxthefox) corrections at history.. values for powerstream (not kWh, it is W)
- (foxthefox) issue #264, correction, additional bat Delta 2 has different data names than D2M
- (foxthefox) improved recognition of HA broker status and better initializing of data
- (foxthefox) telegram counter now in each device/info
- (foxthefox) major refactoring for the "JSON-devices"
- (foxthefox) min nodejs version >=20
- (foxthefox) debug button for latestQuotas, dbug button for unknown protobuf msg
- (foxthefox) iobroker/eslint-config

### 1.3.2 (npm)

- (foxthefox) improvement on HA cmds with numbers
- (foxthefox) correction on startVoltage for alternator, new cablelength

### 1.3.1 (npm)

- (foxthefox) new cmd for Delta3Plus and corrections to ranges
- (foxthefox) correction to cmd DPU,D3P,D3+,R3+ to appear correctly in HA (must be number to be adjustable)
- (foxthefox) improvement on HA cmds to devices with protobuf
- (foxthefox) delta2 settings improvement (unit, device_class)

### 1.3.0 (npm)

- (foxthefox) correction for PStream energy
- (foxthefox) new Delta Pro 3 implementation
- (foxthefox) new Delta 3 Plus implementation
- (foxthefox) new River 3 Plus implementation
- (foxthefox, radeonorama) enhancements alternator
- (foxthefox) major refactoring
- (foxthefox) new items to PowerOcean and HeatingRod

### 1.2.2 (npm)

- (foxthefox) some documentation for HA users
- (foxthefox) corrections in SHP2 protobuf definition
- (foxthefox) new datapoints in SHP2 ProtoTime, new telegram ProtoTimeStat mapped to ProtoTime
- (foxthefox) corrections to alternator (objects 268,269), power,wifiRssi setting,
- (foxthefox) DeltaPro mpptTemp, outAmp new max value

### 1.2.1 (npm)

- (foxthefox) corrections for pstream objects, some changed from string to number
- (foxthefox) new SHP time task config values

### 1.2.0 (npm)

- (foxthefox) new values powerocean
- (foxthefox) new values powerstream
- (foxthefox) new values plug
- (foxthefox) enhancements on values for SHP2,DPU,alternator

### 1.1.3 (npm)

- (foxthefox) enhancements to alternator values
- (foxthefox) refactoring of protobuf handling/structure/component data

### 1.1.2 (npm)

- (bh1cqx) handle HA restart #PR193
- (foxthefox) initial state population of BPInfo2/3 to HA
- (foxthefox) jsonConfig enhancements

### 1.1.1 (npm)

- (foxthefox) changed code structure
- (foxthefox) initial state creation of BPInfo2/3 to HA

### 1.1.0 (npm)

- (foxthefox) added a preliminary version of alternator (no cmd, non final state names)
- (foxthefox) added a config possibility for unsupported devices for capturing the transmitted telegrams
- (foxthefox) #168 changed SHP2 masterIncreInfo.gridSta '0': 'Grid volt. not detected', '1': 'Grid OK'
- (foxthefox) #173 DPU added additional battery selection
- (foxthefox) #174 SHP2 added in ProtoTime the wattInfoChWatt, wattInfoAllHallWatt
- (foxthefox) #174 SHP2 added channel values of power and current in loadPower/loadCurrent including the sum of the values
- (foxthefox) #167 DELTA2/2Max pd.dsgPowerAC and pd.dsgPowerDC (type from 'power' to 'energy')

### 1.0.5 (npm)

- (foxthefox) mppt.outWatts 500 -> 600; inverter_heartbeat.invOutputWatts 800 -> 810
- (foxthefox) update of Readme (adapter now in stable)
- (foxthefox) changes for responsive design #160

### 1.0.4 (npm)

- (foxthefox) some more protobuf decoding for power ocean (ev pulse portion)
- (foxthefox) correction for powerkit telegram reception #99
- (foxthefox) corrected/imroved powerkit datapoints

### 1.0.3 (npm)

- (foxthefox) watth16/17/18 upper range 10kWh
- (foxthefox) 'Backup reserve' option added for D2M #137
- (foxthefox) preparations for DeltaPro3 decode

### 1.0.2 (npm)

- (foxthefox) correction of SHP commands (#130)

### 1.0.1 (npm)

- (foxthefox) correction to level commands (not recognized when appendix level.xxx)
- (foxthefox) "this." for timer functions
- (foxthefox) corrected some debug functions
- (foxthefox) min js-controller = 5.0.12

### 1.0.0 (npm) BREAKING

- (foxthefox) correction of state roles (requires deletion of ecoflow objecttree!)
- (foxthefox) deletion of InverterHeartbeat2 of power stream, since latest FW does not deliver this telegram anymore (most likely part of the larger inverter_heartbeat)
- (foxthefox) some multiplication and max settings for SHP and Power Ocean corrected,

### 0.0.42 (npm)

- (foxthefox) correction SHP command
- (foxthefox) new data point power ocean, range min corrections
- (foxthefox) shelly3em model definition
- (foxthefox) IOB checker corrections

### 0.0.41 (npm)

- (foxthefox) correction in Compare function

### 0.0.40 (npm)

- (foxthefox) IOB checker corrections

### 0.0.39 (npm)

- (foxthefox) update devDeps
- (foxthefox) eslint upgrade and corrections

### 0.0.38 (npm)

- (foxthefox) additional datapoints for power ocean
- (foxthefox) corrections for upper limit on power ocean data points

### 0.0.37 (npm)

- (foxthefox) corrections for HA discovery of PowerOcean/SHP2/PowerKit

### 0.0.36 (npm)

- (foxthefox) correction bmsMaster.cellVol/cellTemp as array for DeltaPro
- (foxthefox) correction for transfer of values derived from protobuf to HA
- (foxthefox) enhanced to device specific logging

### 0.0.35 (npm)

- (foxthefox) unified detail debug settings, device specific debugging (new checkbox in device config)

### 0.0.34 (npm)

- (foxthefox) first implementation for power ocean kit
- (foxthefox) first implementation for smart home panel 2
- (foxthefox) new values watth16/17/18 for powerstream
- (foxthefox) deltapro max values mmpt.inAmp, mpptTemp
- (foxthefox) fixed updates to info.reconnects
- (foxthefox) fixed #90 cfgAcEnabled on river2max
- (foxthefox) logging enhancements

### 0.0.33 (npm)

- (foxthefox) added Power Kit
- (foxthefox) added new object ratedPower as command for powerstream

### 0.0.32 (npm)

- (foxthefox) added Shelly3EM reporting (cloud to cloud connection to be setup in EF App)

### 0.0.31 (npm)

- (foxthefox) optimization EF MQTT reconnect
- (foxthefox) initial update slave battery to HA
- (foxthefox) online status from latestQuotas
- (foxthefox) adapter config merge all device tabs into one (to overcome the problem that on tablets the last tab is not reachable), size adjustment
- (foxthefox) correction for deltapro at xt60ChgType
- (foxthefox) correction for river2max commands

### 0.0.30 (npm)

- (foxthefox) correction for River2Pro/Max cmd dcChgCurrent
- (foxthefox) correction for Delta2 cmd dcChgCurrent/pv2DcChgCurrent
- (foxthefox) correction for slave battery transfer to HA

### 0.0.29 (npm)

- (foxthefox) new objects for wave2
- (foxthefox) device emulation
- (foxthefox) mppt max value corrections

### 0.0.28 (npm)

- (foxthefox) fix value normalization (DP,wave2,glacier)
- (foxthefox) set actions initially to false to avoid null
- (foxthefox) fix latestQuotas for glacier/wave2
- (foxthefox) enhance logging

### 0.0.27 (npm)

- (foxthefox) fixed issues with additional battery and homeassistant transfer
- (foxthefox) bmsMaster Delta Pro new points (maxVolDiff,mosState,cellSeriesNum,cellNtcNum)
- (foxthefox) fix issue with SHP heartbeat.errorCodes

### 0.0.26 (npm)

- (foxthefox) bmasMaster.amp max = 50
- (foxthefox) corrections SHP

### 0.0.25 (npm)

- (foxthefox) new datapoints for DeltaPro

### 0.0.24 (npm)

- (foxthefox) SHP incomming data processing

### 0.0.23 (npm)

- (foxthefox) correction to latestQuotas (shift from info to action)
- (foxthefox) X_Unknown_15 range max 1000
- (foxthefox) new debug button for devices with protobuf msg

### 0.0.22 (npm)

- (foxthefox) Homeassistant Connector/Gateway
- (foxthefox) added Generator (indication only, no knowledge on commands)
- (foxthefox) added Delta Pro Ultra
- (foxthefox) added Smart Home Panel
- (foxthefox) latestQuotas/getTimeTaskConfig moved from info to action
- (foxthefox) uptime no max boundary
- (foxthefox) several adjustable values which represent a mode or predefined set of settings are now using "states" definition (IOB)
- (foxthefox) changed factor for pd/usb1Watts, usb2Watts, qcUsb1Watts, qcUsb2Watts
- (foxthefox) info for offline/online status with EF cloud
- (foxthefox) correction for protobuf cmds (dataLen)
- (foxthefox) some strings are now diagnostic
- (foxthefox) X_unknown_15/17/34 are now numbers
- (foxthefox) skip telegrams where openBmsIdx=0, bqSysStatReg=0
- (foxthefox) deltapro mppt value changes (inWatts/outWatts max=1600, mult= 0.001)
- (foxthefox) deltapro new values bmsMaster.diffSoc, bmsMaster.packSn

### 0.0.21 (npm)

- (foxthefox) more debug on connection
- (foxthefox) new datapoints for wave2
- (foxthefox) deleted max on duration values
- (foxthefox) moved several datapoints from number/string to arrays (mainly wave2/glacier)
- (foxthefox) moved datapoints from string to arrays (bms*.hwVersion, bms*.hwEdition, bms*.cellVol, bms*.cellTemp, pd.bmsKitState)
- (foxthefox) plug switch "dynWattEnable" which includes plug for dynamic watts of powerstream

### 0.0.20 (npm)

- (foxthefox) first additional integration tests
- (foxthefox) corrections in data model
- (foxthefox) new datapoints for glacier
- (foxthefox) new button in config for 'debug quotas' (retrieving data for all JSON-devices and displaying it)

### 0.0.19 (npm)

- (foxthefox) better error handling of incomplete messages from pstream
- (foxthefox) added indication of time tasks
- (foxthefox) cleanup pstream/plugs creation (both are protobuf)
- (foxthefox) further refactoring of code -> devices must be again defined !
- (foxthefox) differentiation between actual energy values and historical
- (foxthefox) getAllTaskCfg for powerstations in structure info
- (foxthefox) initial lastQuotas after adapter start for powerstream and plug
- (foxthefox) interpreted unknown values have now clear names
- (foxthefox) cyclic latestQuotas call instead of forced disconnect and reconnect (reconnects value only for checking, if stays with 0/null adapter has still mqtt telegrams)
- (foxthefox) new data points for deltamax
- (foxthefox) corrected pstream value changes to 0 (numbers), pdata must be omitted

### 0.0.18 (npm)

- (foxthefox) correction of wrong version number io io-package.json

### 0.0.17

- (foxthefox) added ems objects for River2Pro
- (foxthefox) more logging to pstream decode
- (foxthefox) spelling correction for latestQuotas

### 0.0.16

- (foxthefox) correction for array of devices, cause of "loosing" power stations

### 0.0.15

- (foxthefox) new implementation of Wave 2 Air conditioner
- (foxthefox) new implementation of Glacier refrigerator
- (foxthefox) correction of factors for delta2/delta2max/river2pro/river2max (mppt.?Vol, mppt.?Amp, mppt.?Watts)
- (foxthefox) some shifting from string to diagnostics
- (foxthefox) some updates to max values
- (foxthefox) delta2/delta2max pd.chgPowerAC and pd.chgPowerDC changed from power to energy
- (foxthefox) correction of plug_heartbeat values, protobuf shifts from snake_case to camelCase

### 0.0.14

- (foxthefox) new implementation of River 2 Pro, River 2 Max, River Pro, River Max
- (foxthefox) new feature get "lastQuotas"
- (foxthefox) recfactoring of protobuf encoding
- (foxthefox) watth5=daily energy plug, watth6=on time plug
- (foxthefox) plug_heartbeat new values unknown16...19

### 0.0.13

- (foxthefox) correction for changing of factors for pstations
- (foxthefox) watth5 for plugs
- (foxthefox) more logging pstream/plug
- (foxthefox) optional detection of no updates from mqtt server -> reconnection

### 0.0.12

- (foxthefox) new command brightness for plugs
- (foxthefox) correction of factors for plugs
- (foxthefox) powerstream bpType with value as texts
- (foxthefox) DELTA 2 factors corrected (mppt.inVol, mppt.inAmp,mppt.carOutAmp, mppt.carOutVol)
- (foxthefox) naming of watth1...8 (except 5)

### 0.0.11

- (foxthefox) correction this.pstreamStatesDict to cope with pstream and plug

### 0.0.10

- (foxthefox) unknown pstream message debug possibility
- (foxthefox) inv.outTemp max=90°C, inverter_heartbeat.pv1/2inputWatts max=600W
- (foxthefox) new function -> smart plugs

### 0.0.9

- (foxthefox) final version of credential creation, at least 6.12.3 for admin required
- (foxthefox) pd.wattsInSum max=4000W, pd.wattsOutSum max=4000W
- (foxthefox) unknwon59 -> batChargingTime, battMin -> batDischargingTime
- (foxthefox) processing multiple messages in one datagram

### 0.0.8

- (foxthefox) Delta2Max mppt.outVol mult=0.001 instead 0.1
- (foxthefox) handling additional battery for Delta2Max
- (foxthefox) pd.dsgPowerAC -> mult 0.001 Delta2Max
- (foxthefox) pd.chgPowerAC -> mult 0.001 Delta2Max
- (foxthefox) inv.acChgRatedPower -> max 4000W
- (foxthefox) inv.FastChgWatts -> max 2400W
- (foxthefox) chgwatts Delta 2 -> min 50W

### 0.0.7

- (foxthefox) jsonUI wrong attr for additional battery corrected

### 0.0.6

- (foxthefox) device doc
- (foxthefox) cfgDcChgCurrent/pv2DcChgCurrent changed back to start at 4A

### 0.0.5

- (foxthefox) cfgDcChgCurrent/pv2DcChgCurrent again with min=0, seems that there comes 0 at a certein telegram and causing warning
- (foxthefox) energy values (yield per day) for powerstream

### 0.0.4

- (foxthefox) new switch inverter_heartbeat.feedPriority (handling the excessive solar energy when battery is full)

### 0.0.3

- (foxthefox) requirement for admin 6.12.2 -> 6.12.0
- (foxthefox) iverter_heartbeat pv1InputCur, pv2InputCur factor corrected now 0.1
- (foxthefox) ems.chgAmp factor 0.0001 ( seemed too high by factor 10 )
- (foxthefox) bmsMaster.tagChgAmp factor 0.0001 ( seemed too high by factor 10 )
- (foxthefox) delta2max command for cfgDcChgCurrent/pv2DcChgCurrent changed
- (foxthefox) ensuring that commanded bppowerSoc value is always minimum 5% higher than the ems.minDsgSoc, also putting actual minDsgSoc into the command

### 0.0.2

- (foxthefox) pv2DcChgCurrent as level in delta2max
- (foxthefox) \*pv2DcChgCurrent with range 4-8 and step 2
- (foxthefox) chgPauseFlag as switch in delta2max

### 0.0.1 (npm)

- (foxthefox) initial release

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