---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.husqvarna-automower-connect/README.md
title: ioBroker.husqvarna-automower-connect
hash: 4ZV+eWHMuoHVUHtr6ACeP84GiVkKc3U/b7ljE4Y3Q+Q=
---
![标识](../../../en/adapterref/iobroker.husqvarna-automower-connect/admin/husqvarna-automower-connect.svg)

![NPM 版本](https://img.shields.io/npm/v/iobroker.husqvarna-automower-connect.svg)
![下载](https://img.shields.io/npm/dm/iobroker.husqvarna-automower-connect.svg)
![安装数量](https://iobroker.live/badges/husqvarna-automower-connect-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/husqvarna-automower-connect-stable.svg)
![NPM](https://nodei.co/npm/iobroker.husqvarna-automower-connect.svg?downloads=true)
![捐](https://img.shields.io/badge/Donate-PayPal-blue.svg)
![请我喝杯咖啡](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)

# IoBroker.husqvarna-automower-connect
![测试与发布](https://github.com/bueste/ioBroker.husqvarna-automower-connect/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 husqvarna-automower-connect 适配器
此适配器从您的 Husqvarna 割草机获取数据，版本为 [通过“新的”WebSocket 连接，可与 [Automower Connect API](https://developer.husqvarnagroup.cloud) 配合使用。](https://developer.husqvarnagroup.cloud/apis/Automower+Connect+API) v1.0.0/OAS 3.0。

这是 [Ice987987/ioBroker.husqvarna-automower](https://github.com/ice987987/ioBroker.husqvarna-automower) 的一个完整且积极维护的分支。它修复了几个因请求体格式错误而被 API 拒绝的写入命令（`START`、`STARTINWORKAREA`、`PARK`、`CUTTINGHEIGHT`、`DATETIME`、`HEADLIGHT`），并全面覆盖了官方 API：错误确认、每个工作区域的切割高度/启用、禁入区启用/禁用以及错误/事件消息历史记录。感谢 ice987987 提供本项目所基于的原始适配器。

## 免责声明
所有产品和公司名称或标识均为其各自所有者的商标™或注册商标®。使用这些名称或标识并不意味着与上述所有者或其任何关联子公司有任何关联或得到其认可！此个人项目为业余时间维护，不以盈利为目的。Husqvarna Automower 是 Husqvarna 集团的商标。

安装要求
- 需要 node.js 版本 >= v22
- 需要 ioBroker.js-controller >=6.0.11 版本。
- 需要 ioBroker.admin 版本 >= v7.8.23。
- 此适配器使用 Husqvarna Automower Connect API 请求数据（通过 WebSocket）和发送命令（通过 REST API）来控制您的 Husqvarna 割草机。

请创建账户并按照 [这些说明](https://developer.husqvarnagroup.cloud/docs/get-started)通过[https://developer.husqvarnagroup.cloud](https://developer.husqvarnagroup.cloud)提供。](https://developer.husqvarnagroup.cloud/) 的步骤生成您的个人 `Application key` 和 `Application secret`。（`Redirect URLs` 也可能是 `http://localhost:8080`）

＃＃ 控制
您可以向您的 Husqvarna 割草机发送以下数值：

- `.ACTIONS.PAUSE`：暂停割草机
- `.ACTIONS.PARKUNTILLNEXTSCHEDULE`：将割草机停放在指定位置，直到下次预定运行时间。
- `.ACTIONS.PARKUNTILFURTHERNOTICE`: 将割草机停放至另行通知，优先于原定时间表
- `.ACTIONS.park.PARK`：将割草机停放一段时间 `.ACTIONS.park.parkTime`（以分钟为单位），覆盖默认设置。
- `.ACTIONS.RESUMESCHEDULE`：按计划恢复割草机运行
- `.ACTIONS.start.START`：启动割草机并切割一段时间 `.ACTIONS.start.startTime`（以分钟为单位），覆盖预设计划。
- `.ACTIONS.startInWorkArea.STARTINWORKAREA`: 启动割草机，在 ID 为 `.ACTIONS.startInWorkArea.workAreaId` 的区域内，持续 `.ACTIONS.startInWorkArea.duration` 分钟（可选，如果为零 (0) 则永久运行）进行割草。[^4]
- `.ACTIONS.CUTTINGHEIGHT`: 更新切割高度并获取当前状态[^2][^3]
- `.ACTIONS.DATETIME`：割草机自 1970 年 1 月 1 日以来的日期和时间（以秒为单位）。割草机使用此时间戳来触发计划任务。目前您无法从割草机获取时间戳。
- `.ACTIONS.HEADLIGHT`: 更新前照灯并获取当前状态[^4]
- `.ACTIONS.schedule.SET`：使用 `.ACTIONS.schedule.[i].start`（午夜后几分钟）、`.ACTIONS.schedule.[i].duration`（分钟）、`.ACTIONS.schedule.[i].monday`、`.ACTIONS.schedule.[i].tuesday`、`.ACTIONS.schedule.[i].wednesday`、`.ACTIONS.schedule.[i].thursday`、`.ACTIONS.schedule.[i].friday`、`.ACTIONS.schedule.[i].saturday`、`.ACTIONS.schedule.[i].sunday` 和 `.ACTIONS.schedule.[i].workAreaId` 更新割草机计划，并获取当前状态 [^2]
- `.ACTIONS.REFRESHSTATISTICS`：在常规配置计划之外刷新统计信息值
- `.ACTIONS.RESETCUTTINGBLADEUSAGETIME`：重置切割刀片使用时间计数器（`.statistics.cuttingBladeUsageTime`）。此功能与 Automower Connect 应用程序中的功能相同，请在更换刀片后使用。
- `.ACTIONS.CONFIRMERROR`：确认非致命割草机错误（仅当 `.capabilities.canConfirmError` 为 `true` 时可用，并且仅当 `.mower.isErrorConfirmable` 为 `true` 时才有效）
- `.ACTIONS.workAreaSettings.APPLYWORKAREASETTINGS`: 更新由 `.ACTIONS.workAreaSettings.workAreaId`[^4] 指定的工作区的 `.cuttingHeight` (0-100%) 和/或 `.enabled`
- `.ACTIONS.stayOutZoneSettings.APPLYSTAYOUTZONESETTINGS`: 更新由 `.ACTIONS.stayOutZoneSettings.zoneId` 指定的禁入区域的 `.enabled`（当 `.stayOutZones.dirty` 为 `true` 时无法执行）[^6]

    [^2]: Do not use for 550 EPOS and Ceora due to [Husqvarna's API-limitation](https://developer.husqvarnagroup.cloud/apis/Automower+Connect+API#/readme)

[^3]: not supported models: 405X, 415X and 435X AWD (you will get the error "This mower use missions and can not be updated by this endpoint")

    [^6]: only available if `.capabilities.stayOutZones` is `true`

## 可用值（只读）
您的 Husqvarna 割草机可提供以下数值：

- `.battery.batteryPercent`：有关自动割草机电池的信息。
- `.capabilities.canConfirmError`：如果自动割草机支持确认错误命令，则该错误也必须是可确认的。
- `.capabilities.headlights`：自动割草机是否支持前大灯。如果为 false，则表示没有可用的前大灯。
- `.capabilities.position`：自动割草机是否支持 GPS 定位。如果为 false，则表示没有可用的位置信息。
- `.capabilities.stayOutZones`：自动割草机是否支持禁入区域。如果为 false，则不支持禁入区域。
- `.capabilities.workAreas`：自动割草机是否支持工作区域。如果为 false，则表示没有可用的工作区域。
- `.metadata.connected`：割草机当前是否已连接到云端。割草机需要连接到云端才能向其发送命令。
- `.metadata.statusTimestamp`：自 1970 年 1 月 1 日 00:00:00 UTC 时间以来的最后一次状态更新时间戳（以毫秒为单位）。注意！此时间戳由后端生成，而非割草机本身生成。
- `.mower.mode`：有关割草机当前模式的信息。
- `.mower.activity`：有关割草机当前状态的信息。
- `.mower.inactiveReason`：非活动原因
- `.mower.state`：有关割草机当前状态的信息。
- `.mower.workAreaId`：当前工作区 ID。如果割草机支持工作区且正在某个工作区内作业，则此属性生效。如果未选择当前工作区，则此属性不设置。
- `.mower.errorCode`: 有关割草机当前错误状态的信息。
- `.mower.errorTimestamp`：自 1970 年 1 月 1 日 00:00:00 以来的最后一个错误代码的时间戳（以毫秒为单位，本地时间）。注意！此时间戳为割草机的本地时间，直接来自割草机。
- `.mower.isErrorConfirmable`：如果割草机出现错误代码，此属性会说明错误是否可以确认。
- `.planner.override`：Planner 具有覆盖功能，可用于覆盖日历决定的操作。一次只能进行一次覆盖，覆盖生效时间从现在开始，并持续一段时间。
- `.planner.nextStartTimestamp`：自 1970 年 1 月 1 日 00:00:00 以来的下一次自动启动时间戳（以毫秒为单位，本地时间）。如果割草机正在充电，则该值为割草机离开充电站的预计时间。如果该值为 0，则割草机应立即启动。注意！此时间戳为割草机所在位置的本地时间，直接来自割草机。
- `.planner.restrictedReason`: 受限原因。
- `.planner.externalReason`：外部原因由 IFTTT、Google Assistant 或 Amazon Alexa 等设置。范围：1000 至 1999：Google Assistant；2000 至 2999：Amazon Alexa；3000 至 3999：开发者门户；4000 至 4999：IFTTT，野生动物保护 - 4000，防霜防雨 - 4001，日历连接 - 4002；100000 至 199999：IFTTT 小程序；200000 至 299999：开发者门户。
- `.positions.latitude`: 位置纬度[^5]
- `.positions.longitude`: 位置经度[^5]
- `.positions.latlong`: 位置“纬度；经度”[^5]
- `.positions.positions`: Positions[^5]
- `.stayOutZones.dirty`：如果禁入区域与 Husqvarna 云同步。如果地图已更改，则无法启用或禁用禁入区域。[^4]
- `.stayOutZones.zones`：自动割草机所有禁入区域的列表。[^4]
- `.statistics.cuttingBladeUsageTime`: 自上次重置切割刀片使用计数器以来经过的秒数。[^4]
- `.statistics.numberOfChargingCycles`: 充电周期数。[^4]
- `.statistics.numberOfCollisions`：碰撞总数。[^4]
- `.statistics.totalChargingTime`: 总充电时间（秒）。[^4]
- `.statistics.totalCuttingTime`: 总切割时间（秒）。[^4]
- `.statistics.totalDriveDistance`：总行驶距离（以米为单位）。该值是根据割草机的总运行时间乘以平均速度计算得出的，具体取决于割草机型号。[^4]
- `.statistics.totalRunningTime`：总运行时间（秒）。（车轮电机已运行）[^4]
- `.statistics.totalSearchingTime`: 总搜索时间（秒）。[^4]
- `.system.id`：设备 ID
- `.system.model`：自动割草机的型号名称
- `.system.name`：用户在配对自动割草机时为其指定的名称。
- `.system.serialNumber`：自动割草机的序列号
- `.system.type`：设备类型
- `.workAreas.[workAreaId].workAreaId`: 工作区 ID[^4]
- `.workAreas.[workAreaId].name`: 工作区的名称[^4]
- `.workAreas.[workAreaId].cuttingHeight`: 切割高度（百分比）（0...100%）[^4]
- `.workAreas.[workAreaId].enabled`: 工作区是否已启用或已禁用。[^4]
- `.workAreas.[workAreaId].progress`：工作区域的进度。仅适用于 EPOS 割草机和系统化割草工作区域。[^4]
- `.workAreas.[workAreaId].lastTimeCompleted`：工作区域上次完成的时间戳（以秒为单位），自 1970 年 1 月 1 日以来。时间戳为割草机本地时间。仅适用于 EPOS 割草机和系统化割草工作区域。
- `.workAreas.[workAreaId].lastTimeAbandoned`：工作区域上次被遗弃的时间戳（以秒为单位），自 1970 年 1 月 1 日起计算。仅适用于 EPOS 割草机和系统化割草工作区域。
- `.workAreas.[workAreaId].type`: 工作区域的类型（`随机`或`系统`割草`）。
- `.workAreas.[workAreaId].useGlobalCuttingHeight`: 如果为 `true`，则使用全局切割高度设置，而不是此工作区的 `.cuttingHeight`。
- `.workAreas.[workAreaId].orientation`：配置的割草方向（以度为单位）。仅适用于系统化割草作业区。
- `.workAreas.[workAreaId].orientationShift`：配置割草作业间添加的角度偏移量（以度为单位）。仅适用于系统化割草作业区。
- `.workAreas.[workAreaId].currentOrientation`：当前割草方向（以度为单位）。仅适用于系统化割草作业区。
- `.messages.messages`: API 返回的错误/事件消息的完整列表（JSON 数组，最新在前，最多约 1000 条记录）。
- `.messages.lastTime`、`.messages.lastCode`、`.messages.lastSeverity`、`.messages.lastLatitude`、`.messages.lastLongitude`：包含最新消息的便捷状态，通过轮询和 WebSocket `message` 推送事件实时更新。

<!-- `.workAreas.[workAreaId].calendar`: 关于日历任务的信息。一台 Automower® 可以有多个任务。如果割草机支持工作区，则需要 workAreaId 属性将任务关联到工作区。[^4] -->

[^4]: If a value is missing or zero (0) the mower does not support the value

[^5]: If no GPS-Signal is available, those values are not updated

## IoBroker.vis 绑定
以下代码可用于将适配器 [使用 ioBroker.vis（https://github.com/ioBroker/ioBroker.vis#bindings-of-objects）来翻译状态描述和错误代码](https://developer.husqvarnagroup.cloud/apis/Automower+Connect+API#status%20description%20and%20error%20codes) 中的 html 绑定到文本，以便更好地可视化：

- 数据点 `husqvarna-automower-connect.0.[来自 DP.system.id 的 mowerID].mower.errorCode`：

（英文）

```
{value1:husqvarna-automower-connect.0.[mowerID from DP .system.id].mower.errorCode;value1 === "0" ? "Unexpected error" :: (value1 === "1" ? "Outside working area" :: (value1 === "2" ? "No loop signal" :: (value1 === "3" ? "Wrong loop signal" :: (value1 === "4" ? "Loop sensor problem, front" :: (value1 === "5" ? "Loop sensor problem, rear" :: (value1 === "6" ? "Loop sensor problem, left" :: (value1 === "7" ? "Loop sensor problem, right" :: (value1 === "8" ? "Wrong PIN code" :: (value1 === "9" ? "Trapped" :: (value1 === "10" ? "Upside down" :: (value1 === "11" ? "Low battery" :: (value1 === "12" ? "Empty battery" :: (value1 === "13" ? "No drive" :: (value1 === "14" ? "Mower lifted" :: (value1 === "15" ? "Lifted" :: (value1 === "16" ? "Stuck in charging station" :: (value1 === "17" ? "Charging station blocked" :: (value1 === "18" ? "Collision sensor problem, rear" :: (value1 === "19" ? "Collision sensor problem, front" :: (value1 === "20" ? "Wheel motor blocked, right" :: (value1 === "21" ? "Wheel motor blocked, left" :: (value1 === "22" ? "Wheel drive problem, right" :: (value1 === "23" ? "Wheel drive problem, left" :: (value1 === "24" ? "Cutting system blocked" :: (value1 === "25" ? "Cutting system blocked" :: (value1 === "26" ? "Invalid sub-device combination" :: (value1 === "27" ? "Settings restored" :: (value1 === "28" ? "Memory circuit problem" :: (value1 === "29" ? "Slope too steep" :: (value1 === "30" ? "Charging system problem" :: (value1 === "31" ? "STOP button problem" :: (value1 === "32" ? "Tilt sensor problem" :: (value1 === "33" ? "Mower tilted" :: (value1 === "34" ? "Cutting stopped - slope too steep" :: (value1 === "35" ? "Wheel motor overloaded, right" :: (value1 === "36" ? "Wheel motor overloaded, left" :: (value1 === "37" ? "Charging current too high" :: (value1 === "38" ? "Electronic problem" :: (value1 === "39" ? "Cutting motor problem" :: (value1 === "40" ? "Limited cutting height range" :: (value1 === "41" ? "Unexpected cutting height adj" :: (value1 === "42" ? "Limited cutting height range" :: (value1 === "43" ? "Cutting height problem, drive" :: (value1 === "44" ? "Cutting height problem, curr" :: (value1 === "45" ? "Cutting height problem, dir" :: (value1 === "46" ? "Cutting height blocked" :: (value1 === "47" ? "Cutting height problem" :: (value1 === "48" ? "No response from charger" :: (value1 === "49" ? "Ultrasonic problem" :: (value1 === "50" ? "Guide 1 not found" :: (value1 === "51" ? "Guide 2 not found" :: (value1 === "52" ? "Guide 3 not found" :: (value1 === "53" ? "GPS navigation problem" :: (value1 === "54" ? "Weak GPS signal" :: (value1 === "55" ? "Difficult finding home" :: (value1 === "56" ? "Guide calibration accomplished" :: (value1 === "57" ? "Guide calibration failed" :: (value1 === "58" ? "Temporary battery problem" :: (value1 === "59" ? "Temporary battery problem" :: (value1 === "60" ? "Temporary battery problem" :: (value1 === "61" ? "Temporary battery problem" :: (value1 === "62" ? "Temporary battery problem" :: (value1 === "63" ? "Temporary battery problem" :: (value1 === "64" ? "Temporary battery problem" :: (value1 === "65" ? "Temporary battery problem" :: (value1 === "66" ? "Battery problem" :: (value1 === "67" ? "Battery problem" :: (value1 === "68" ? "Temporary battery problem" :: (value1 === "69" ? "Alarm! Mower switched off" :: (value1 === "70" ? "Alarm! Mower stopped" :: (value1 === "71" ? "Alarm! Mower lifted" :: (value1 === "72" ? "Alarm! Mower tilted" :: (value1 === "73" ? "Alarm! Mower in motion" :: (value1 === "74" ? "Alarm! Outside geofence" :: (value1 === "75" ? "Connection changed" :: (value1 === "76" ? "Connection NOT changed" :: (value1 === "77" ? "Com board not available" :: (value1 === "78" ? "Slipped - Mower has Slipped. Situation not solved with moving pattern" :: (value1 === "79" ? "Invalid battery combination - Invalid combination of different battery types." :: (value1 === "80" ? "Cutting system imbalance --Warning--" :: (value1 === "81" ? "Safety function faulty" :: (value1 === "82" ? "Wheel motor blocked, rear right" :: (value1 === "83" ? "Wheel motor blocked, rear left" :: (value1 === "84" ? "Wheel drive problem, rear right" :: (value1 === "85" ? "Wheel drive problem, rear left" :: (value1 === "86" ? "Wheel motor overloaded, rear right" :: (value1 === "87" ? "Wheel motor overloaded, rear left" :: (value1 === "88" ? "Angular sensor problem" :: (value1 === "89" ? "Invalid system configuration" :: (value1 === "90" ? "No power in charging station" :: (value1 === "91" ? "Switch cord problem" :: (value1 === "92" ? "Work area not valid" :: (value1 === "93" ? "No accurate position from satellites" :: (value1 === "94" ? "Reference station communication problem" :: (value1 === "95" ? "Folding sensor activated" :: (value1 === "96" ? "Right brush motor overloaded" :: (value1 === "97" ? "Left brush motor overloaded" :: (value1 === "98" ? "Ultrasonic Sensor 1 defect" :: (value1 === "99" ? "Ultrasonic Sensor 2 defect" :: (value1 === "100" ? "Ultrasonic Sensor 3 defect" :: (value1 === "101" ? "Ultrasonic Sensor 4 defect" :: (value1 === "102" ? "Cutting drive motor 1 defect" :: (value1 === "103" ? "Cutting drive motor 2 defect" :: (value1 === "104" ? "Cutting drive motor 3 defect" :: (value1 === "105" ? "Lift Sensor defect" :: (value1 === "106" ? "Collision sensor defect" :: (value1 === "107" ? "Docking sensor defect" :: (value1 === "108" ? "Folding cutting deck sensor defect" :: (value1 === "109" ? "Loop sensor defect" :: (value1 === "110" ? "Collision sensor error" :: (value1 === "111" ? "No confirmed position" :: (value1 === "112" ? "Cutting system major imbalance" :: (value1 === "113" ? "Complex working area" :: (value1 === "114" ? "Too high discharge current" :: (value1 === "115" ? "Too high internal current" :: (value1 === "116" ? "High charging power loss" :: (value1 === "117" ? "High internal power loss" :: (value1 === "118" ? "Charging system problem" :: (value1 === "119" ? "Zone generator problem" :: (value1 === "120" ? "Internal voltage error" :: (value1 === "121" ? "High internal temerature" :: (value1 === "122" ? "CAN error" :: (value1 === "123" ? "Destination not reachable" :: (value1 === "124" ? "Destination blocked" :: (value1 === "125" ? "Battery needs replacement" :: (value1 === "126" ? "Battery near end of life" :: (value1 === "127" ? "Battery problem" :: (value1 === "128" ? "Multiple reference stations detected" :: (value1 === "129" ? "Auxiliary cutting means blocked" :: (value1 === "130" ? "Imbalanced auxiliary cutting disc detected" :: (value1 === "131" ? "Lifted in link arm" :: (value1 === "132" ? "EPOS accessory missing" :: (value1 === "133" ? "Bluetooth com with CS failed" :: (value1 === "134" ? "Invalid SW configuration" :: (value1 === "135" ? "Radar problem" :: (value1 === "136" ? "Work area tampered" :: (value1 === "137" ? "High temperature in cutting motor, right" :: (value1 === "138" ? "High temperature in cutting motor, center" :: (value1 === "139" ? "High temperature in cutting motor, left" :: (value1 === "141" ? "Wheel brush motor problem" :: (value1 === "143" ? "Accessory power problem" :: (value1 === "144" ? "Boundary wire problem" :: (value1 === "701" ? "Connectivity problem" :: (value1 === "702" ? "Connectivity settings restored" :: (value1 === "703" ? "Connectivity problem" :: (value1 === "704" ? "Connectivity problem" :: (value1 === "705" ? "Connectivity problem" :: (value1 === "706" ? "Poor signal quality" :: (value1 === "707" ? "SIM card requires PIN" :: (value1 === "708" ? "SIM card locked" :: (value1 === "709" ? "SIM card not found" :: (value1 === "710" ? "SIM card locked" :: (value1 === "711" ? "SIM card locked" :: (value1 === "712" ? "SIM card locked" :: (value1 === "713" ? "Geofence problem" :: (value1 === "714" ? "Geofence problem" :: (value1 === "715" ? "Connectivity problem" :: (value1 === "716" ? "Connectivity problem" :: (value1 === "717" ? "SMS could not be sent" :: (value1 === "724" ? "Communication circuit board SW must be updated" :: "errorCode #" + value1 + " unknown")))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))}
```

- 数据点 `husqvarna-automower-connect.0.[来自 DP.system.id 的 mowerID].mower.activity`：

（英文）

```
{value1:husqvarna-automower-connect.0.[mowerID from DP .system.id].mower.activity;value1 === "UNKNOWN" ? "Unknown activity" :: (value1 === "NOT_APPLICABLE" ? "Manual start required in mower." :: (value1 === "MOWING" ? "Mower is mowing lawn. If in demo mode the blades are not in operation." :: (value1 === "GOING_HOME" ? "Mower is going home to the charging station." :: (value1 === "CHARGING" ? "Mower is charging in station due to low battery." :: (value1 === "LEAVING" ? "Mower is leaving the charging station." :: (value1 === "PARKED_IN_CS" ? "Mower is parked in charging station." :: (value1 === "STOPPED_IN_GARDEN" ? "Mower has stopped. Needs manual action to resume." :: "activity #" + value1 + " unknown")))))))}
```

- 数据点 `husqvarna-automower-connect.0.[来自 DP.system.id 的 mowerID].mower.mode`：

（英文）

```
{value1:husqvarna-automower-connect.0.[mowerID from DP .system.id].mower.mode;value1 === "MAIN_AREA" ? "Mower will mow until low battery. Go home and charge. Leave and continue mowing. Week schedule is used. Schedule can be overridden with forced park or forced mowing." :: (value1 === "DEMO" ? "No blade operation - Mower will mow until low battery. Go home and charge. Leave and continue mowing. Week schedule is used. Schedule can be overridden with forced park or forced mowing." :: (value1 === "SECONDARY_AREA" ? "Mower is in secondary area. Schedule is overridden with forced park or forced mowing. Mower will mow for request time or untill the battery runs out." :: (value1 === "HOME" ? "Mower goes home and parks forever. Week schedule is not used. Cannot be overridden with forced mowing." :: (value1 === "UNKNOWN" ? "Unknown mode" :: "mode #" + value1 + " unknown"))))}
```

- 数据点 `husqvarna-automower-connect.0.[来自 DP.system.id 的 mowerID].mower.state`：

（英文）

```
{value1:husqvarna-automower-connect.0.[mowerID from DP .system.id].mower.state;value1 === "UNKNOWN" ? "Unknown state" :: (value1 === "NOT_APPLICABLE" ? "Not Applicable" :: (value1 === "PAUSED" ? "Mower has been paused by user." :: (value1 === "IN_OPERATION" ? "See value in activity for status." :: (value1 === "WAIT_UPDATING" ? "Mower is downloading new firmware." :: (value1 === "WAIT_POWER_UP" ? "Mower is performing power up tests." :: (value1 === "RESTRICTED" ? "Mower can currently not mow due to week calender, or override park." :: (value1 === "OFF" ? "Mower is turned off." :: (value1 === "STOPPED" ? "Mower is stopped, requires manual action." :: (value1 === "ERROR" ? "An error has occurred. Check errorCode. Mower requires manual action." :: (value1 === "FATAL_ERROR" ? "An fatal error has occurred. Check errorCode. Mower requires manual action." :: (value1 === "ERROR_AT_POWER_UP" ? "An error at power up has occurred. Check errorCode. Mower requires manual action." :: "state #" + value1 + " unknown")))))))))))}
```

## 统计脚本
（最初脚本由 @ArnoD15 编写，由 @ice987987 修改）

将计算以下值：

- 今日充电时间和总充电时间
- 今日割草时间和总割草时间
- 今日行驶里程和总行驶里程
割草机与充电站之间的距离
- 将日程安排的开始时间和结束时间转换为分钟和小时
- 创建/更新谷歌地图链接
- 下雨期间可将割草机停放至下次使用。
- 计算剩余刀具运行时间百分比

要使用，请将以下代码复制到新的 [Javascript](https://github.com/ioBroker/ioBroker.javascript)-Script 中，并在 `USER CONFIGURATION` 部分中填写以下变量：`instance`、`pathLevel1`、`pathLevel2`、`mowerID`、`sID_RainSensor` 和 `targetBladeCuttingTime`。

```
//***************************************************************************************************
//++++++++++++++++++++++++++++++++++++++++ USER CONFIGURATION +++++++++++++++++++++++++++++++++++++++

const instance = '0_userdata.0';                                                    // Type your instance name
const pathLevel1 = 'husqvarna';                                                     // Type your path name
const pathLevel2 = ['statistics', 'schedules', 'general', 'blades', 'actions'];     // Type your folder names
const mowerID = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';                             // Mower ID from Husqvarna automower
const sID_RainSensor = 'hm-rpc.0.12345678901234.1.RAINING';                         // Path rain sensor (true = rain)
const targetBladeCuttingTime = 180_000_000;                                         // Which time should a set of knives run in milliseconds (180_000_000ms = 50h)

//++++++++++++++++++++++++++++++++++++++ END USER CONFIGURATION +++++++++++++++++++++++++++++++++++++
//***************************************************************************************************

// create required folders and states
createState();
async function createState() {
    for (let i = 0; i < 4; i++) {
        createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[1]}.startTime_${i}`, '00:00', false, {name: `Schedule ${i} start time`, role: 'value', type: 'string', read: true, write: true, def: '00:00'});
        createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[1]}.endTime_${i}`, '00:00', false, {name: `Schedule ${i} end time`, role: 'value', type: 'string', read: true, write: true, def: '00:00'});
    };
    await createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[0]}.drivenDistanceToday`, 0, false, {name: 'Driven Distance Today', role: 'state', type: 'number', read: true, write: false, def: 0, unit: 'km'});
    await createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[0]}.drivenDistanceTotal`, 0, false, {name: 'Driven Distance Total', role: 'state', type: 'number', read: true, write: false, def: 0, unit: 'km'});
    await createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[0]}.chargingTimeToday`, 0, false, {name: 'Charging Time Today', role: 'state', type: 'number', read: true, write: false, def: 0, unit: 'ms'});
    await createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[0]}.mowingTimeToday`, 0, false, {name: 'Mowing Time Total', role: 'state', type: 'number', read: true, write: false, def: 0, unit: 'ms'});
    await createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[3]}.currentBladeCuttingTime`, 0, false, {name: 'Current Blade Cutting Time', desc: 'How many seconds was the current set of knives run', role: 'state', type: 'number', read: true, write: false, def: 0, unit: 'ms'});
    await createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[3]}.reset`, false, false, {name: 'Reset', desc: 'Restart counter after knife change', role: 'button', type: 'boolean', read: true, write: true, def: false});
    await createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[3]}.changeBlades`, false, false, {name: 'Change Blades', role: 'state', type: 'boolean', read: true, write: false, def: false});
    await createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[3]}.remainingCuttingCapacity`, 100, false, {name: 'Remaining cutting Capacity', desc: 'in percent', role: 'state', type: 'number', read: true, write: false, def: 100, max: 100, unit: '%'});
    await createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[0]}.distanceFromChargingStation`, 0, false, {name: 'Distance from charging station', role: 'state', type: 'number', read: true, write: false, def: 0, unit: 'm'});
    await createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[2]}.GoogleMapsLink`, '', false, {name: 'Google Maps Link', role: 'value', type: 'string', read: true, write: false, def: ''});
    await createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[4]}.parkAfterNextChargingCycle`, false, false, {name: 'Park after next charging cycle', role: 'state', type: 'boolean', read: true, write: true, def: false});
    log('-==== folders and states created ====-', 'debug');
};

const sID_HusqvarnaSchedules = [];
$(`state[id=husqvarna-automower-connect.0.${mowerID}.ACTIONS.schedule.*.start]`).each(function(id) {
    sID_HusqvarnaSchedules.push(id);
});
$(`state[id=husqvarna-automower-connect.0.${mowerID}.ACTIONS.schedule.*.duration]`).each(function(id) {
    sID_HusqvarnaSchedules.push(id);
});

let drivenDistanceToday = getState(`${instance}.${pathLevel1}.${pathLevel2[0]}.drivenDistanceToday`).val;
let drivenDistanceTotal = getState(`${instance}.${pathLevel1}.${pathLevel2[0]}.drivenDistanceTotal`).val;
let drivenDistance = 0;
let chargingTimeToday = getState(`${instance}.${pathLevel1}.${pathLevel2[0]}.chargingTimeToday`).val;
let chargingTime = 0;
let mowingTimeToday = getState(`${instance}.${pathLevel1}.${pathLevel2[0]}.mowingTimeToday`).val;
let mowingTime = 0;
let bladeCuttingTime = 0;
let remainingBladeCapacity = 0;
let chargingStationLatitude = 0;
let chargingStationLongitude = 0;
let distanceFromChargingStation = 0;

// reset variables "[...]Today" every midnight
schedule('0 0 * * *', function () {
    drivenDistanceToday = 0;
    setState(`${instance}.${pathLevel1}.${pathLevel2[0]}.drivenDistanceToday`, drivenDistanceToday, true);
    chargingTimeToday = 0;
    setState(`${instance}.${pathLevel1}.${pathLevel2[0]}.chargingTimeToday`, chargingTimeToday, true);
    mowingTimeToday = 0;
    setState(`${instance}.${pathLevel1}.${pathLevel2[0]}.mowingTimeToday`, mowingTimeToday, true);
});

// get chargingTimeToday and chargingTimeTotal
on({id: `husqvarna-automower-connect.0.${mowerID}.mower.activity`, oldVal: 'CHARGING'}, function (obj) {
    chargingTime = obj.state.ts - obj.oldState.ts;
    log(`chargingTime: ${chargingTime / 1000}s`, 'debug');
    chargingTimeToday = chargingTime + chargingTimeToday;
    setState(`${instance}.${pathLevel1}.${pathLevel2[0]}.chargingTimeToday`, chargingTimeToday, true);
});

// get mowingTimeToday, mowingTimeTotal, bladeCuttingTime and remainingBladeCapacity
on({id: `husqvarna-automower-connect.0.${mowerID}.mower.activity`, oldVal: 'MOWING'}, function (obj) {
    mowingTime = obj.state.ts - obj.oldState.ts;
    log(`mowingTime: ${mowingTime / 1000}s`, 'debug');
    mowingTimeToday = mowingTime + mowingTimeToday;
    setState(`${instance}.${pathLevel1}.${pathLevel2[0]}.mowingTimeToday`, mowingTimeToday, true);

    let currentBladeCuttingTime = getState(`${instance}.${pathLevel1}.${pathLevel2[3]}.currentBladeCuttingTime`).val;

    bladeCuttingTime = mowingTime + currentBladeCuttingTime;
    setState(`${instance}.${pathLevel1}.${pathLevel2[3]}.currentBladeCuttingTime`, bladeCuttingTime, true);

    remainingBladeCapacity = 100 - (currentBladeCuttingTime * 100) / targetBladeCuttingTime;
    setState(`${instance}.${pathLevel1}.${pathLevel2[3]}.remainingCuttingCapacity`, remainingBladeCapacity, true);
});

// reset values after blade change
on({id: `${instance}.${pathLevel1}.${pathLevel2[3]}.reset`, val: true, ack: false}, function () {
    setState(`${instance}.${pathLevel1}.${pathLevel2[3]}.remainingCuttingCapacity`, 100, true);
    setState(`${instance}.${pathLevel1}.${pathLevel2[3]}.changeBlades`, false, true);
    setState(`${instance}.${pathLevel1}.${pathLevel2[3]}.currentBladeCuttingTime`, 0, true);
});

// get distance from automower to charging station, drivenDistanceToday and drivenDistanceTotal
on({id: `husqvarna-automower-connect.0.${mowerID}.positions.latlong`, change: 'ne'}, async function (obj) {
    if (getState(`husqvarna-automower-connect.0.${mowerID}.mower.activity`).val === 'CHARGING' || getState(`husqvarna-automower-connect.0.${mowerID}.mower.activity`).val === 'PARKED_IN_CS') {
        if (chargingStationLatitude !== 0 && chargingStationLongitude !== 0) {
            chargingStationLatitude = (Number(obj.state.val.split(';')[0]) + Number(chargingStationLatitude)) / 2;
            chargingStationLongitude = (Number(obj.state.val.split(';')[1]) + Number(chargingStationLongitude)) / 2;
        } else {
            chargingStationLatitude = obj.state.val.split(';')[0];
            chargingStationLongitude = obj.state.val.split(';')[1];
        };
    };
    distanceFromChargingStation = 1000 * (6378.388 * Math.acos(Math.sin(obj.state.val.split(';')[0] * (Math.PI / 180)) * Math.sin(chargingStationLatitude * (Math.PI / 180)) + Math.cos(obj.state.val.split(';')[0] * (Math.PI / 180)) * Math.cos(chargingStationLatitude * (Math.PI / 180)) * Math.cos(chargingStationLongitude * (Math.PI / 180) - obj.state.val.split(';')[1] * (Math.PI / 180)))); // reference: https://www.kompf.de/gps/distcalc.html
    log(`distanceFromChargingStation: ${round(distanceFromChargingStation, 2)}m`, 'debug');
    await setStateAsync(`${instance}.${pathLevel1}.${pathLevel2[0]}.distanceFromChargingStation`, distanceFromChargingStation, true);

    if (getState(`husqvarna-automower-connect.0.${mowerID}.mower.activity`).val === 'MOWING' || getState(`husqvarna-automower-connect.0.${mowerID}.mower.activity`).val === 'GOING_HOME' || getState(`husqvarna-automower-connect.0.${mowerID}.mower.activity`).val === 'LEAVING') {
        drivenDistance = 6378.388 * Math.acos(Math.sin(obj.state.val.split(';')[0] * (Math.PI / 180)) * Math.sin(obj.oldState.val.split(';')[0] * (Math.PI / 180)) + Math.cos(obj.state.val.split(';')[0] * (Math.PI / 180)) * Math.cos(obj.oldState.val.split(';')[0] * (Math.PI / 180)) * Math.cos(obj.oldState.val.split(';')[1] * (Math.PI / 180) - obj.state.val.split(';')[1] * (Math.PI / 180))); // reference: https://www.kompf.de/gps/distcalc.html
        log(`distanceDriven: ${round(drivenDistance * 1000, 2)}m`, 'debug');
        drivenDistanceToday = drivenDistanceToday + drivenDistance;
        drivenDistanceTotal = drivenDistanceTotal + drivenDistance;
        await setStateAsync(`${instance}.${pathLevel1}.${pathLevel2[0]}.drivenDistanceToday`, round(drivenDistanceToday, 2), true);
        await setStateAsync(`${instance}.${pathLevel1}.${pathLevel2[0]}.drivenDistanceTotal`, round(drivenDistanceTotal, 2), true);
    };
});

// Convert start and end time to minutes
$(`state[id=${instance}.${pathLevel1}.${pathLevel2[1]}.*]`).on(async function (obj) {
    if (obj.id.split('.')[obj.id.split('.').length - 1].split('_')[0] === 'startTime') {
        let startTime = obj.state.val.split(':')[0] * 60 + Number(obj.state.val.split(':')[1]);
        setState(`husqvarna-automower-connect.0.${mowerID}.ACTIONS.schedule.${obj.id.split('.')[obj.id.split('.').length - 1].split('_')[1]}.start`, startTime, false);
        let endTime = (await getStateAsync(`${instance}.${pathLevel1}.${pathLevel2[1]}.endTime_${obj.id.split('.')[obj.id.split('.').length - 1].split('_')[1]}`)).val;
        let duration = endTime.split(':')[0] * 60 + Number(endTime.split(':')[1]) - startTime;
        setState(`husqvarna-automower-connect.0.${mowerID}.ACTIONS.schedule.${obj.id.split('.')[obj.id.split('.').length - 1].split('_')[1]}.duration`, duration, false);
    } else {
        let startTime = (await getStateAsync(`${instance}.${pathLevel1}.${pathLevel2[1]}.startTime_${obj.id.split('.')[obj.id.split('.').length - 1].split('_')[1]}`)).val;
        let startTimeMin = startTime.split(':')[0] * 60 + Number(startTime.split(':')[1]);
        let duration = obj.state.val.split(':')[0] * 60 + Number(obj.state.val.split(':')[1]) - startTimeMin;
        setState(`husqvarna-automower-connect.0.${mowerID}.ACTIONS.schedule.${obj.id.split('.')[obj.id.split('.').length - 1].split('_')[1]}.duration`, duration, false);
    };
});

// Convert start and end time to hh:mm
on({id: sID_HusqvarnaSchedules, change: 'ne', ack: true}, async function (obj) {
    if (obj.id.split('.')[obj.id.split('.').length - 1] === 'start') {
        let m = obj.state.val % 60;
        let h = (obj.state.val - m) / 60;
        let HHMM = `${(h < 10 ? '0' : '')}${h.toString()}:${(m < 10 ? '0' : '')}${m.toString()}`;
        await setStateAsync(`${instance}.${pathLevel1}.${pathLevel2[1]}.startTime_${obj.id.split('.')[obj.id.split('.').length - 2]}`, HHMM, true);
        let endTime = obj.state.val + (await getStateAsync(`husqvarna-automower-connect.0.${mowerID}.ACTIONS.schedule.${obj.id.split('.')[obj.id.split('.').length - 2]}.duration`)).val;
        let m1 = endTime % 60;
        let h1 = (endTime - m1) / 60;
        let HHMM1 = `${(h1 < 10 ? '0' : '')}${h1.toString()}:${(m1 < 10 ? '0' : '')}${m1.toString()}`;
        await setStateAsync(`${instance}.${pathLevel1}.${pathLevel2[1]}.endTime_${obj.id.split('.')[obj.id.split('.').length - 2]}`, HHMM1, true);
    } else {
        let startTime = (await getStateAsync(`husqvarna-automower-connect.0.${mowerID}.ACTIONS.schedule.${obj.id.split('.')[obj.id.split('.').length - 2]}.start`)).val;
        let endTime = startTime + obj.state.val;
        let m = endTime % 60;
        let h = (endTime - m) / 60;
        let HHMM = `${(h < 10 ? '0' : '')}${h.toString()}:${(m < 10 ? '0' : '')}${m.toString()}`;
        await setStateAsync(`${instance}.${pathLevel1}.${pathLevel2[1]}.endTime_${obj.id.split('.')[obj.id.split('.').length - 2]}`, HHMM, true);
    };
});

// update google maps link
on({id: `husqvarna-automower-connect.0.${mowerID}.positions.latlong`, change: 'ne'}, async function (obj) {
    let arrayLatLong = getState(obj.id).val.split(';');
    let GoogleLink = `https://www.google.com/maps/place/${arrayLatLong[0]},${arrayLatLong[1]}/@?hl=de`;
    await setStateAsync(`${instance}.${pathLevel1}.${pathLevel2[2]}.GoogleMapsLink`, GoogleLink, true);
});

// during rain, park until next schedule
on({id: sID_RainSensor, change: 'ne', val: true}, async function () {
   await setStateAsync(`husqvarna-automower-connect.0.${mowerID}.ACTIONS.PARKUNTILNEXTSCHEDULE`, true);
   log('-==== It is raining. Mower is parked. ====-', 'info');
});

// park after next charging cycle
on({id: `husqvarna-automower-connect.0.${mowerID}.mower.activity`, change: 'ne', val: 'CHARGING'}, function () {
    if (getState(`${instance}.${pathLevel1}.${pathLevel2[4]}.parkAfterNextChargingCycle`).val) {
        setState(`husqvarna-automower-connect.0.${mowerID}.ACTIONS.PARKUNTILFURTHERNOTICE`, true, true);
        setState(`${instance}.${pathLevel1}.${pathLevel2[4]}.parkAfterNextChargingCycle`, false, true);
    };
});

// round
function round(digit, digits) {
    digit = (Math.round(digit * Math.pow(10, digits)) / Math.pow(10, digits));
    return digit;
};
```

## 如何报告问题和功能请求
- 针对问题

请使用 [GitHub 问题](https://github.com/bueste/ioBroker.husqvarna-automower-connect/issues/new/choose) -> “错误报告” 并填写表格。

将适配器设置为调试日志模式（实例 -> 专家模式 -> 列日志级别）。从磁盘获取日志文件（ioBroker 安装目录下的“log”子目录，而不是 Admin 目录，因为 Admin 会截断日志行）。发布日志前，请检查其中是否包含任何个人信息。

- 用于功能请求

请使用 [GitHub 问题](https://github.com/bueste/ioBroker.husqvarna-automower-connect/issues/new/choose) -> “功能请求”并填写表格。

## Changelog

### 1.0.10 (2026-08-08)
- Fix: the button role:read=false and workAreas.<id>.enabled role fixes from 1.0.9 only applied to newly created objects (setObjectNotExistsAsync never updates existing ones). Any installation upgrading from <=1.0.8 kept the old, incorrect values forever. migrateObjectRoles() now also force-corrects these two on every startup, exactly like it already does for the pre-1.0.3 issues. Verified against a live object dump: corrects exactly the 18 affected button states, no false positives.

### 1.0.9 (2026-08-08)
- Fix all issues from the manual maintainer review (PR #6326): all 13 button states now use read:false as required by the button role spec; fixed a case-sensitivity bug (StartInWorkArea vs startInWorkArea) that made the STARTINWORKAREA command completely non-functional; added a 10s timeout to all 5 axios calls to prevent indefinite hangs on an unresponsive API; stayOutZones.zones is now JSON.stringify'd before setState as required for array-type states; workAreas.<id>.enabled now uses the correct 'indicator' role instead of the unrelated 'indicator.connected'; completed the placeholder zh-cn translation for statisticsIntervalHint; added validation (hasForbiddenChars) for the externally-sourced mower ID and workAreaId before using them in object paths - invalid values are rejected and logged rather than silently sanitized, since the mower ID is later parsed back out of the object path to address the real Husqvarna API.

<!-- ### **WORK IN PROGRESS** -->

### 1.0.8 (22.07.2026)

-   (Stefan Bühler) Documentation only: removed the e-mail address and corrected the name spelling in the README license section (the LICENSE file itself was already correct); commented out the number-of-installations badge, which cannot resolve until the adapter is available in the official ioBroker repository. No functional changes.

### 1.0.7 (22.07.2026)

-   (Stefan Bühler) Metadata only: standardized copyright/author to "Stefan Bühler" across package.json, io-package.json and LICENSE (dropped the GitHub username and email address from the copyright line; ice987987's original-author credit is unchanged). No functional changes.

### 1.0.6 (17.07.2026)

-   (Stefan Bühler) Documentation only: fixed the PayPal donate link, which previously used the wrong URL format and did not work.

### 1.0.5 (17.07.2026)

-   (Stefan Bühler) FIX: `system.serialNumber` declared type 'number', but role 'info.serial' only accepts 'string' - changed type and now writes the value as a string.
-   (Stefan Bühler) FIX: `positions.latlong` used role 'value.gps', which the store submission's object structure checker rejects for a compound 'latitude;longitude' string (despite this being the officially documented format for that role) - changed to role 'text' to satisfy the checker.
-   (Stefan Bühler) The startup migration added in 1.0.4 now also force-corrects these two, including objects that were only partially corrected by an earlier version of the migration.

### 1.0.4 (17.07.2026)

-   (Stefan Bühler) FIX: 1.0.3 corrected several wrong object roles/types (ACTIONS.HEADLIGHT, ACTIONS.schedule fields, messages.messages, system.id/type/serialNumber), but `setObjectNotExistsAsync()` never touches an object that already exists - so installations updating from before 1.0.3 kept the old, incorrect objects forever. Added a one-time startup migration that force-corrects exactly those known objects via `extendObjectAsync()`, without touching anything else.

### 1.0.3 and older

Older changelog entries can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2025 ice987987 <mathias.frei1@gmail.com>  
Copyright (c) 2026 Stefan Bühler (modifications and additions in this fork)

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