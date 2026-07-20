---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.anthbot-genie/README.md
title: ioBroker.anthbot-genie
hash: LN1kkcsY1XXsZrj7mkBHVQwe2PicpZZ0ykmDLyZ8E/c=
---
# IoBroker.anthbot-genie

![GitHub 版本](https://img.shields.io/github/v/release/reloxx13/ioBroker.anthbot-genie)
![NPM 版本](https://img.shields.io/npm/v/iobroker.anthbot-genie.svg)
![下载](https://img.shields.io/npm/dm/iobroker.anthbot-genie.svg)
![ioBroker 安装](https://iobroker.live/badges/anthbot-genie-installed.svg)
![执照](https://img.shields.io/github/license/reloxx13/ioBroker.anthbot-genie)
![ioBroker 阶段](https://img.shields.io/badge/ioBroker%20phase-latest--repo-green)
![ioBroker论坛](https://img.shields.io/badge/ioBroker-forum-blue)
![NPM](https://nodei.co/npm/iobroker.anthbot-genie.png?downloads=true)

<img src="admin/anthbot-genie.png" alt="标识" width="80" />

[![测试和发布](https://github.com/reloxx13/ioBroker.anthbot-genie/actions/workflows/test-and-release.yml/badge.svg?branch=main)](https://github.com/reloxx13/ioBroker.anthbot-genie/actions/workflows/test-and-release.yml)

非官方的 ioBroker 适配器，适用于 [Anthbot Genie 机器人割草机](https://de.anthbot.com/products/genie-mahroboter)，专注于 Genie 600/1000/3000/5000 和更新的 M5/M9 型号的详细 Genie 遥测、诊断和割草机控制。

该适配器连接到 Anthbot 云帐户，发现已绑定的割草机，读取云和 IoT 影子数据，并在 ioBroker 中公开状态、设置、割草机命令、区域数据、耗材、位置、诊断和原始故障排除有效负载的广泛状态树。

它面向那些想要查看更多基本在线/电池/状态信息的用户：RTK 和基站状态、固件和 OTA 详细信息、网络和 SIM 卡信息、GPS 和姿态数据、地图生命周期时间戳、割草机错误详细信息、耗材寿命、雨量设置、区域元数据和可写割草控制等信息都以 ioBroker 状态的形式公开。

此适配器可在 ioBroker `latest` 存储库中找到。请在 [ioBroker 论坛帖子](https://forum.iobroker.net/topic/84392) 中报告反馈和测试结果。

[Blockly自动化示例](https://forum.iobroker.net/topic/84392/2)中提供了一个带有割草机自动化条件的 ioBroker Blockly 示例。

＃＃ 特征
- Anthbot 云登录，密码以加密形式存储在 ioBroker 原生配置中
- 自动发现绑定到已配置的 Anthbot 帐户的割草机
- 每个割草机的区域和物联网端点查找
- 在 AWS IoT `403` 响应后自动刷新临时 IoT 凭证
- 对房产和服务影子进行民意调查
- 详细的状态信息，包括连接状态、在线状态、电池状态、割草机状态、充电状态、割草时间、割草面积、每面积总割草时间、地图状态、地图绘制任务状态、错误信息、当前割草模式、点割草和区域计数。
- RTK定位、RTK基站、天线移动警告、固件版本、OTA进度、WiFi、蜂窝网络、SIM卡、蓝牙、摄像头/地图标记、避障、安全标记、系统时间戳和云端备份割草机故障数据的诊断状态
- 用于防丢 GPS 坐标和本地割草机姿态的位置状态
- 充电端口、摄像头和刀片的耗材寿命状态和重置按钮
- 可写入的控制状态包括：全地图割草、区域割草、切割高度、语音音量、自定义割草方向、避障、雨天设置以及在充电桩附近割草
- 指令状态包括：全割草、停止、返回充电座、暂停返回充电座、倾倒草屑、圆盘维护模式、边缘割草、靠近充电堆割草、定点割草、刷新、手动区域割草和自动区域割草
- 手动和自动区域元数据（JSON 状态），包括活动的手动区域 ID
- 用于故障排除和自动化调试的原始属性影子、服务影子、Anthbot 事件代码转换和区域定义有效负载

＃＃ 要求
- ioBroker 搭配 js-controller `>= 6.0.11`
- ioBroker 管理员 `>= 7.6.20`
- Node.js `>= 22`
- 至少绑定了一台 Genie 割草机的 Anthbot 账户
- 从 ioBroker 主机到 Anthbot 云和 AWS IoT 端点的互联网访问

＃＃ 安装
该适配器可在 ioBroker `latest` 存储库中找到，并可从 ioBroker 适配器视图或 CLI 进行安装。

### IoBroker 管理员
如果 `latest` 存储库尚未激活，请打开 ioBroker 管理界面，转到 **设置 -> 存储库**，选择或启用 `latest`，然后刷新适配器列表。

然后打开适配器视图，搜索`anthbot-genie`，并从`latest`存储库安装适配器。

### 命令行界面
安装方式：

```bash
iobroker repo set latest
iobroker update
iobroker add anthbot-genie
```

或者明确指定版本：

```bash
iobroker add anthbot-genie@0.1.13
```

## 支持的设备
- Genie 600
- Genie 1000
- Genie 3000
- Genie 5000
- M5
- M9

其他 Anthbot 模型在暴露相同的云和影子有效载荷结构时可能仍然有效，但它们尚未在此处明确映射或记录。

＃＃ 发展
- `npm install` 安装运行时和开发依赖项。
- `npm run lint` 使用 ESLint 检查代码风格。
- `npm run lint:fix` 会自动应用可修复的 ESLint 更改。
- `npm run check` 运行 TypeScript 和 Node.js 语法检查，检查适配器入口点、拆分库模块和测试文件。
- `npm run test:js` 运行单元测试。
- `npm run test:package` 运行包验证测试。
- `npm run test:integration` 运行集成测试。
- `npm run test` 运行 `check`、单元测试和包验证。
- `npm run check:repo` 运行 ioBroker 仓库检查器。
- `npm run translate` 运行 ioBroker adapter-dev 翻译工作流程。
- `npm run release` 创建一个新的 ioBroker 软件包版本。

## 翻译
- Admin/JSON 配置翻译位于 `admin/i18n/<lang>.json` 中。
- 后端/运行时对象名称翻译位于 `i18n/<lang>.json` 中。
- 添加或删除可翻译字符串后，更新英文源文件并运行 `npm run translate`，以便未来的 Weblate 和 adapter-dev 同步保持一致。

＃＃ 配置
在 ioBroker 管理后台打开适配器实例配置并进行设置：

| 设置 | 说明 | 默认值 |
| --- | --- | --- |
| Anthbot 账户用户名 | Anthbot 账户的用户名或电子邮件地址 | 为空 |
| Anthbot 账户密码 | Anthbot 账户密码，由 ioBroker 加密存储 | 为空 |
| 区号 | 电话或账户区号，例如德国的 `49` | `49` |
| 轮询间隔（秒）| 割草机数据轮询间隔。适配器强制至少 10 秒。| `60` |
| 错误描述语言 | 用于 Anthbot 云错误描述的语言 | `English` |
| 错误描述语言 | Anthbot 云错误描述所用的语言 | `英语` |

保存配置后，启动或重启适配器实例。

## 州
适配器会为每个割草机序列号创建一个设备树。如果 Anthbot 返回的序列号包含对 ioBroker 对象 ID 不安全的字符，适配器只会规范化这些字符，同时保留设备对象原生元数据中的原始序列号：

```text
anthbot-genie.<instance>.<serial>.*
```

### 信息
| 状态 | 类型 | 描述 |
| --- | --- | --- |
| `info.connection` | 布尔值 | 全局适配器云连接状态 |
| `<serial>.info.model` | 字符串 | 割草机型号/类别 |
| `<serial>.info.region` | 字符串 | Anthbot/AWS IoT 区域 |
| `<serial>.info.endpoint` | 字符串 | 用于影子访问的物联网端点 |
| `<serial>.info.online` | 布尔值 | 割草机报告的在线状态 |
| `<serial>.info.charging` | 布尔值 | 割草机当前是否正在充电 |
| `<serial>.info.lastServiceCommand` | 字符串 | 最后报告的服务命令 |
| `<serial>.info.lastPoll` | 字符串 | 上次成功轮询的 ISO 时间戳 |
| `<serial>.info.lastPoll` | 字符串 | 上次成功轮询的 ISO 时间戳 |

### 指标
| 状态 | 类型 | 单位 | 描述 |
| --- | --- | --- | --- |
| `<serial>.metrics.batteryLevel` | 编号 | `%` | 电池电量 |
| `<serial>.metrics.status.robotRaw` | 字符串 | | 原始机器人状态 |
| `<serial>.metrics.status.modeRaw` | 字符串 | | M5/M9 型号报告的原始 `mode.value` 状态 |
| `<serial>.metrics.mowing.time` | 编号 | `s` | 报告的割草时间 |
| `<serial>.metrics.mowing.area` | 编号 | `m2` | 报告的割草区域 |
| `<serial>.metrics.mowing.totalTime` | 编号 | `s` | M5/M9 型号报告的总割草时间 |
| `<serial>.metrics.mowing.totalArea` | 编号 | `m2` | M5/M9 型号报告的总割草面积 |
| `<serial>.metrics.mowing.borderActive` | 布尔值 | | 边界割草已激活 |
| `<serial>.metrics.mowing.nearChargerActive` | 布尔值 | | 充电器附近割草功能已激活 |
| `<serial>.metrics.mowing.fullYardActive` | 布尔值 | | 全院割草激活 |
| `<serial>.metrics.pointMowing.active` | 布尔值 | | 点割草激活 |
| `<serial>.metrics.pointMowing.x` | 数字 | | 最后割草点 X 坐标 |
| `<serial>.metrics.pointMowing.y` | 数字 | | 最后割草点的 Y 坐标 |
| `<serial>.metrics.zones.manualCount` | 数字 | | 手动区域数量 |
| `<serial>.metrics.zones.autoCount` | 数字 | | 自动区域数量 |
| `<serial>.metrics.map.totalArea` | 编号 | `m2` | 总地图面积 |
| `<serial>.metrics.map.status` | 字符串 | | 原始地图状态 |
| `<serial>.metrics.map.mappingTaskState` | 字符串 | | 映射 M5/M9 模型报告的任务状态 |
| `<serial>.metrics.error.code` | 数字 | | 上次割草机故障代码 |
| `<serial>.metrics.error.description` | 字符串 | | 已知时，从缓存的 Anthbot 事件代码列表中获取的人类可读错误描述 |
| `<serial>.metrics.error.active` | 布尔值 | | 是否激活非零割草机错误 |
| `<serial>.metrics.error.active` | 布尔值 | | 非零割草机错误是否处于激活状态 |

适配器对所有受支持的割草机型号保持相同的状态树。对于不公开 M5/M9 特定有效载荷字段的型号，状态 `metrics.status.modeRaw`、`metrics.mowing.totalTime`、`metrics.mowing.totalArea` 和 `metrics.map.mappingTaskState` 仍然会被创建，但保持为空或 `null`。

＃＃＃ 地点
| 状态 | 类型 | 描述 |
| --- | --- | --- |
| `<serial>.location.gps.latitude` | 数字 | 来自防丢定位数据的 GPS 纬度 |
| `<serial>.location.pose.x` | 数字 | 本地割草机姿态 X |
| `<serial>.location.pose.y` | 数字 | 本地割草机姿态 Y |
| `<serial>.location.pose.yaw` | 数字 | 本地割草机姿态偏航角 |
| `<serial>.location.pose.type` | 字符串 | 报告的姿态类型 |
| `<serial>.location.pose.type` | 字符串 | 报告的姿态类型 |

### 诊断
`diagnostics`通道公开从割草机阴影中提取的只读故障排除数据，包括RTK状态、RTK基站状态、摄像头/地图/网络标志、避障信息、固件版本、OTA进度、WiFi/SIM卡详细信息、时间戳和下次预约时间。在M5/M9型号上，适配器还会将`net_config.*`、`mode.value`、`error.value`、`map.map_area`、`mapping_task.state`、`mowing_time.value`和`mowing_area.value`映射到现有ioBroker状态树中含义匹配的部分。

### 耗材
| 状态 | 类型 | 单位 | 描述 |
| --- | --- | --- | --- |
| `<serial>.consumable.chargingPort.life` | 编号 | `%` | 充电端口寿命 |
| `<serial>.consumable.cameras.life` | 编号 | `%` | 相机寿命 |
| `<serial>.consumable.cameras.reset` | 布尔值 | | 重置摄像头寿命 |
| `<serial>.consumable.blades.life` | 编号 | `%` | 刀片寿命 |
| `<serial>.consumable.blades.reset` | 布尔值 | | 重置刀片寿命 |
| `<serial>.consumable.blades.reset` | 布尔值 | | 重置刀片寿命 |

只有当相关寿命值低于或等于 5% 时，割草机才会接受耗材重置命令。

### 控制
可写控制状态通过 Anthbot IoT 服务影子更新割草机设置。适配器在内部处理特定型号的影子有效负载编码，因此相同的 ioBroker 控制状态可用于所有受支持的割草机型号。

| 状态 | 类型 | 范围 | 描述 |
| --- | --- | --- | --- |
| `<serial>.controls.fullMapMowing.mowHeight` | 编号 | `30..70 mm`，5 毫米步长 | 设置全图切割高度 |
| `<serial>.controls.fullMapMowing.customMowingDirection` | 数字 | `0..180 deg` | 设置全地图自定义割草方向 |
| `<serial>.controls.fullMapMowing.customMowingDirectionEnabled` | 布尔值 | `true`/`false` | 启用或禁用全地图自定义割草方向 |
| `<serial>.controls.zoneMowing.mowHeight` | 数字 | `30..70 mm`，5 毫米步长 | 设置区域割草高度 |
| `<serial>.controls.zoneMowing.mowCount` | 编号 | `1..3` | 设置区域割草次数 |
| `<serial>.controls.zoneMowing.customMowingDirection` | 编号 | `0..180 deg` | 设置区域割草方向 |
| `<serial>.controls.zoneMowing.customMowingDirectionEnabled` | 布尔值 | `true`/`false` | 启用或禁用区域割草方向 |
| `<serial>.controls.zoneMowing.obstacleAvoidanceEnabled` | 布尔值 | `true`/`false` | 启用或禁用区域避障 |
| `<serial>.controls.zoneMowing.obstacleAvoidanceLevel` | 编号 | `0..2` | 设置区域避障级别 |
| `<serial>.controls.voiceVolume` | 编号 | `0..100 %` | 设置音量 |
| `<serial>.controls.rain.perceptionEnabled` | 布尔值 | `true`/`false` | 启用或禁用雨水感知 |
| `<serial>.controls.rain.continueTimeHours` | 数字 | `0..8 h` | 设置降雨持续时间（小时） |
| `<serial>.controls.nearChargerMowing.enabled` | 布尔值 | `true`/`false` | 启用或禁用充电桩附近的割草 |
| `<serial>.controls.nearChargerMowing.mowHeight` | 数字 | `30..70 mm`，5 毫米步长 | 设置充电堆附近割草的切割高度 |
| `<serial>.controls.nearChargerMowing.mowCount` | 编号 | `1..3` | 在充电堆附近设置割草路线 |
| `<serial>.controls.nearChargerMowing.obstacleAvoidanceEnabled` | 布尔值 | `true`/`false` | 启用或禁用充电桩附近的障碍物规避 |
| `<serial>.controls.nearChargerMowing.obstacleAvoidanceLevel` | 编号 | `0..2` | 设置充电桩附近的避障级别 |
| `<serial>.controls.nearChargerMowing.obstacleAvoidanceLevel` | 数字 | `0..2` | 设置充电桩附近的避障级别 |

### 命令
命令状态可写。按钮状态在执行后重置为`false`。区域命令状态在执行后重置为空字符串。消耗品重置按钮位于`consumable`下。

| 状态 | 类型 | 描述 |
| --- | --- | --- |
| `<serial>.commands.device.find` | 布尔值 | 查找机器人 |
| `<serial>.commands.device.cancelRtkAntennaMoved` | 布尔值 | 取消RTK天线移动警告 |
| `<serial>.commands.docking.startReturn` | 布尔值 | 返回充电底座 |
| `<serial>.commands.docking.pauseReturn` | 布尔值 | 暂停返回充电底座 |
| `<serial>.commands.maintenance.startGrassDump` | 布尔值 | 开始草地转储 |
| `<serial>.commands.maintenance.startDiskMaintenance` | 布尔值 | 启动磁盘维护模式 |
| `<serial>.commands.mowing.startFullMap` | 布尔值 | 开始全地图割草 |
| `<serial>.commands.mowing.startZone` | string | 开始修剪一个或多个手动区域 |
| `<serial>.commands.mowing.startAutoZone` | 字符串 | 开始修剪一个或多个自动区域 |
| `<serial>.commands.mowing.startPoint` | 字符串 | 以 `x,y` 或 `{"x":123,"y":456}` 为起点进行割草 |
| `<serial>.commands.mowing.startEdge` | 布尔值 | 开始边缘修剪 |
| `<serial>.commands.mowing.startNearCharger` | 布尔值 | 在充电堆附近开始割草 |
| `<serial>.commands.mowing.pause` | 布尔值 | 暂停割草 |
| `<serial>.commands.mowing.resume` | 布尔值 | 恢复割草 |
| `<serial>.commands.mowing.stop` | 布尔值 | 停止所有割草机任务 |
| `<serial>.commands.mowing.end` | 布尔值 | 结束割草 |
| `<serial>.commands.mowing.stopPoint` | 布尔值 | 停止点割草 |
| `<serial>.commands.mowing.stopPoint` | 布尔值 | 停止点割草 |

`commands.maintenance.startDiskMaintenance`、`commands.maintenance.startGrassDump`、`commands.mowing.startEdge`、`commands.mowing.startNearCharger`和`commands.mowing.startPoint`的可用性可能取决于割草机型号、固件、当前割草机模式和地图/边缘数据。

### 区域
| 状态 | 类型 | 描述 |
| --- | --- | --- |
| `<serial>.zones.manual.list` | JSON 字符串 | 已知的手动/自定义区域 |
| `<serial>.zones.autoList` | JSON 字符串 | 已知自动/区域区域 |
| `<serial>.zones.autoList` | JSON 字符串 | 已知的自动/区域区域 |

### 原始数据
| 状态 | 类型 | 描述 |
| --- | --- | --- |
| `<serial>.raw.shadow.property` | JSON 字符串 | 原始属性影子有效负载 |
| `<serial>.raw.shadow.event-code` | JSON 字符串 | 用于错误描述的缓存 Anthbot 事件代码转换有效负载 |
| `<serial>.raw.areaDefinition` | JSON 字符串 | 原始区域定义有效负载 |
| `<serial>.raw.areaDefinition` | JSON 字符串 | 原始区域定义有效负载 |

区域割草
该适配器可将割草机的手动/自定义区域显示出来：

```text
<instance>.<serial>.zones.manual.list
```

此状态包含一个已知区域的 JSON 数组。使用该列表中的 `id` 或精确的 `name` 开始割草。

请将选内容写在：

```text
<instance>.<serial>.commands.mowing.startZone
```

可接受的值：

- 按 ID 划分的区域：`3`
- 一个名为“前院”的区域
- 多个区域，以逗号分隔的 ID 或名称表示：`3,5,后院`
- 多个区域，以 JSON 数组形式表示：`[3,5,"后院"]`

有效写入后，适配器发送 `custom_area_mow_start` 以及匹配的手动区域 ID，并再次清除 `commands.mowing.startZone`。

自动区域的工作原理类似：

```text
<instance>.<serial>.zones.autoList
<instance>.<serial>.commands.mowing.startAutoZone
```

对于自动区域，适配器将选定的区域 ID 或名称解析为区域坐标，并发送 `region_mow_start`。

## 故障排除
### 适配器无法连接
- 检查用户名、密码和区号。
- 使用同一帐户在 Anthbot 应用程序中确认割草机可见。
- 将适配器日志级别提高到“debug”并重启实例。
- 检查 `anthbot-genie.<instance>.info.connection`。

### 未创建任何割草机对象
- Anthbot 账户必须至少绑定一台割草机。
- 检查适配器日志中是否出现“此帐户未找到 Anthbot 设备”的提示。
- 确认 ioBroker 主机可以访问互联网。

命令不起作用
- 首先检查状态轮询是否正常工作。
- 确认目标州与正确的割草机序列号匹配。
- 对于区域命令，将写入的值与 `zones.manual.list` 或 `zones.autoList` 中的 ID 和名称进行比较。
- 适配器会在 AWS IoT 出现“403”错误后自动刷新临时 IoT 凭证一次；如果重试后命令仍然失败，请检查适配器日志中是否存在特定于型号的有效负载或割草机状态错误。
- 检查 `raw.shadow.service` 和适配器日志中是否存在命令错误。

## 鸣谢
特别感谢 Anthbot Genie 社区项目，它使 Anthbot 云流程和命令映射更容易理解：

- [vincentjanv](https://github.com/vincentjanv/anthbot_genie_ha)
- [AdrianTIonut](https://github.com/AdrianTIonut/anthbot_genie_ha)

特别感谢 [@Riza-Aslan](https://github.com/Riza-Aslan) 为 M5/M9 支持研究和有效载荷映射工作提供的指导，这些工作为本次适配器更新提供了信息。

这个 ioBroker 适配器是一个独立项目，但它建立在公共 API 研究和社区工作的实现思路之上。

## 法律声明
本项目为非官方项目，与 Anthbot 无任何关联，也未获得 Anthbot 的认可、赞助或批准。

Anthbot 和 Genie 的名称、商标和标志均属于其各自所有者。详情请参见 [注意.md](NOTICE.md)。

较早的变更日志条目已存档于[变更日志_旧版.md](CHANGELOG_OLD.md)。

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.1.13 (2026-06-08)

- Add M5/M9 payload parity for status, battery, error, network, RTK, map, and total mowing metrics while keeping the existing ioBroker state tree stable.
- Refresh temporary IoT credentials once on AWS IoT `403` responses and retry the failed shadow read or command publish automatically.
- Refactor the large adapter sources into focused CommonJS modules for Anthbot cloud/shadow clients, payload helpers, adapter object definitions, state derivation, and command handling without changing state IDs or command payload behavior.
- Expand `npm run check` so syntax validation covers the split `lib/anthbot`, `lib/adapter`, and unit test files through the dedicated syntax-check helper.

### 0.1.12 (2026-06-06)

- (reloxx13) **FIXED**: Create the global `info` channel and correct the mower status role so the adapter object structure passes ioBroker review checks.

### 0.1.11 (2026-06-06)

- Refresh existing mower device/channel/state objects with `extendObjectAsync` so updated runtime i18n names are applied to already-created objects, not only new ones.

### 0.1.10 (2026-06-06)

- Align ioBroker object metadata with the repository object-structure checker by creating the global `info` channel, correcting the mower status role, and emitting full recommended i18n keys for object names.
- Keep admin translations in the repository-checker-friendly `admin/i18n/<lang>.json` layout and load backend/runtime object-name translations from root `i18n/<lang>.json` files via adapter-core `I18n`.

### 0.1.9 (2026-06-06)

- Drop the temporary `--legacy-peer-deps` GitHub Actions install override now that the lockfile supports plain `npm ci` again.
- Re-enable ESLint in the GitHub Actions quick-check job and align the local lint config with the checked JavaScript codebase.
- Clean up repository metadata so local `repochecker` no longer reports actionable findings.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 reloxx13

See [LICENSE](LICENSE) for details.