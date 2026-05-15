---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.flowers/README.md
title: ioBroker.flowers
hash: NrIRdHNMqL1rfOJL/gF7gA5hLcnFhfCCU6AhtMtAuVs=
---
# IoBroker.flowers
![标识](../../../en/adapterref/iobroker.flowers/admin/flowers.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.flowers.svg)
![执照](https://img.shields.io/badge/license-MIT-blue.svg)

通过土壤湿度、温度和电池传感器监测室内植物，并接收 Telegram 通知。

此适配器可与 ioBroker 中已集成的**任何传感器**（Zigbee、Wi-Fi、蓝牙、Z-Wave 等）配合使用，无需任何特定硬件。常用兼容传感器：

- [小米米家植物生长传感器/HHCC植物传感器](https://www.mi.com/global/mi-flora) — 蓝牙土壤湿度+温度+光照
- [Zigbee土壤湿度传感器](https://www.zigbee2mqtt.io/supported-devices/#s=soil)（例如 Tuya TS0601、MOES）— 通过 ioBroker Zigbee 适配器
- ioBroker 中任何暴露湿度/温度/电池状态的传感器

通知通过 [ioBroker Telegram适配器](https://github.com/ioBroker/ioBroker.telegram) 发送。

＃＃ 特征
- 通过分配不同的传感器对多个工厂进行监控
- 内置植物配置文件（榕树、兰花、仙人掌、龟背竹、蕨类植物、多肉植物、棕榈、绿萝、芦荟、和平百合、阿拉比卡咖啡、棕竹、斑马竹、虎尾兰、定制）
- 自定义配置文件：在“配置文件”选项卡中创建您自己的植物配置文件，并设置单独的阈值。
- 每个工厂可配置阈值（覆盖配置文件默认值）
- 自动浇水：当土壤湿度低于最低值时触发浇水开关
- 可配置浇水时长（分钟）
- 通过 `sendTo('telegram.X', ...)` 发送 Telegram 通知
- 反垃圾邮件：每日消息数量上限 + 可配置的每种警报类型的冷却时间
- 夜间模式：在安静时段屏蔽通知
- 每日和每周工厂状态报告，带有手动触发按钮
- 离线传感器检测

＃＃ 配置
### 设置选项卡
| 参数 | 描述 |
|-----------|-------------|
| Telegram实例 | Telegram适配器的实例编号 |
| Telegram 用户 | 以逗号分隔的用户名（空 = 所有用户） |
| 检查间隔 | 多久检查一次传感器值 |
| 每日最多发送消息数 | 反垃圾邮件限制 |
| 离线阈值 | 传感器被视为离线前的小时数 |
| 夜间模式 | 夜间关闭通知 |
| 每日/每周报告 | 定期状态报告 |

### 植物选项卡
添加植物并为每个传感器分配 ioBroker 状态 ID。选择一个配置文件——阈值将自动应用。您可以为每株植物单独设置阈值。

对于自动浇水，请分配一个**浇水**状态 ID（例如，控制水泵或阀门的开关）。当土壤湿度低于最低阈值时，适配器会将此状态设置为 `true`，持续配置的浇水时间，然后将其设置回 `false`。

### 个人资料选项卡
内置配置文件概览及推荐阈值。您还可以在顶部表格中创建**自定义配置文件**——输入名称和阈值，然后在“植物”选项卡的“自定义配置文件”字段中使用该名称。

## 州
适配器在 `flowers.X.plants.<plant_name>` 下创建状态：

| 状态 | 描述 |
|-------|-------------|
| `humidity` | 当前土壤湿度 % |
| `battery` | 当前电池电量百分比 |
| `电池` | 当前电池电量百分比 |

在 `flowers.X` 下：

| 状态 | 描述 |
|-------|-------------|
| `info.connection` | 适配器连接状态 |
| `notifications.sendDailyReport` | 按钮：手动触发每日报告 |
| `notifications.sendWeeklyReport` | 按钮：手动触发每周报告 |
| `notifications.sendWeeklyReport` | 按钮：手动触发每周报告 |

### 自动浇水
在“植物”选项卡中指定一个**浇水**状态（例如`zigbee.0.pump.state`）。当湿度低于最低值时：

1. 适配器将浇水状态设置为“true”。
2. 等待设定的**浇水时长**（分钟）
3. 将状态重置为`false`

每株植物一次只能运行一个浇水周期。请在“设置”→“自动浇水”中配置浇水持续时间。

## Changelog

### 0.3.9 (2026-04-30)
- (sadam6752-tech) Fix button state roles: set `read=false` for `sendDailyReport` and `sendWeeklyReport` buttons (required by ioBroker role spec)

### 0.3.8 (2026-04-30)
- (sadam6752-tech) Auto-cleanup: remove ioBroker objects for plants deleted from config on adapter start

### 0.3.7 (2026-04-30)
- (sadam6752-tech) Fix E8915: add dependabot cooldown (`default-days: 7`) for npm ecosystem
- (sadam6752-tech) Update CI/CD: `check-and-lint` and `deploy` steps to Node.js 24.x
- (sadam6752-tech) Remove redundant `eslint` devDependency (included via `@iobroker/eslint-config`)
- (sadam6752-tech) Add CHANGELOG_OLD.md for older changelog entries

### 0.3.6 (2026-03-31)
- (sadam6752-tech) Fix dependabot config to track all package.json in subdirectories (W8905)
- (sadam6752-tech) Add .github/auto-merge.yml for dependabot automerge configuration (S8914)

### 0.3.5 (2026-03-31)
- (sadam6752-tech) Fix .releaseconfig.json plugins format (array instead of object)

### 0.3.4 (2026-03-31)
- (sadam6752-tech) Add unit tests for MonitorService, NotificationManager and messages (106 tests total)
- (sadam6752-tech) Update README with links to compatible devices and Telegram adapter
- (sadam6752-tech) Remove mocha from devDependencies (already included in @iobroker/testing)

### 0.3.3 (2026-03-30)
- (sadam6752-tech) Fix object hierarchy: create device/channel parent objects before states
- (sadam6752-tech) Use correct state roles: value.humidity, value.temperature, value.battery
- (sadam6752-tech) Improve unload: null timers after clearing, guard monitor null check

### 0.3.2 (2026-03-30)
- (sadam6752-tech) Custom profiles: users can create own plant profiles in Profiles tab
- (sadam6752-tech) Custom profile field in Plants table for direct profile name entry

For older changelog entries see [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License  
Copyright (c) 2025-2026 sadam6752-tech <sadam6752@gmail.com>