---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.absaar/README.md
title: ioBroker.absaar
hash: ndn7UjpBug4ORIGwbtqtIdotnWs/a37N5uFUuJxzkm8=
---
# IoBroker.absaar
ioBroker适配器，适用于Absaar EMS逆变器。该适配器从Absaar EMS云API读取逆变器和电站数据，供Absaar EMS应用程序使用。

产品和制造商信息可在[AdvanSol Power 官方网站](https://www.advansol-power.com/)上找到。

该适配器不包含私有凭证、私有主机名或用户特定数据。凭证存储在受保护且加密的 ioBroker 原生配置字段中。

＃＃ 特征
- 通过 `https://mini-ems.com:8081` 进行云轮询
- 使用 Absaar EMS 应用凭据登录
- 自动令牌处理和重新认证
- 可配置的轮询间隔
- 电站每日、每月和总发电量的状态
- 其他站点数值，例如当前功率和收入/环境计数器
- 集线器状态，例如输入功率、在线状态、集线器名称和上次在线时间
- 逆变器状态（交流电、光伏、温度、电池和负载值）
- 用于故障排除的可选原始 JSON 状态
- 基于 JSON 的管理员配置

＃＃ 要求
- ioBroker js-controller `>= 6.0.11`
- ioBroker 管理员 `>= 7.8.23`
- Node.js `>= 22`
- 一个已在 Absaar EMS 应用程序中配置至少一个逆变器或站点的 Absaar EMS 帐户
- 从 ioBroker 主机到 `mini-ems.com:8081` 的网络访问

＃＃ 配置
在ioBroker管理后台打开适配器实例配置。

| 设置 | 描述 |
| --- | --- |
| 适配器已激活 | 启用或禁用轮询。 |
| Absaar 用户名 | 在 Absaar EMS 应用中使用的用户名。根据账户的不同，这可能是电子邮件地址或用户名。 |
| Absaar 密码 | Absaar EMS 应用中使用的密码。由 ioBroker 以加密和受保护的本地配置形式存储。 |
| 轮询间隔（秒）| 轮询间隔（秒），从 `30` 到 `86400`。默认值为 `120`。为避免超出云速率限制，请保持此值较低。|
| API 基本 URL | 默认值：`https://mini-ems.com:8081`。通常情况下不应更改此值。 |
| 将原始数据存储为 JSON 格式 | 将获取到的完整 JSON 数据写入状态以进行故障排除。默认情况下禁用。 |

## 州
适配器会创建以下结构下的状态：

```text
absaar.0.info.*
absaar.0.stations.<stationId>.*
absaar.0.stations.<stationId>.inverters.<inverterId>.*
```

### 信息状态
| 状态 | 类型 | 描述 |
| --- | --- | --- |
| `info.connection` | 布尔值 | `true` 如果上次轮询成功。 |
| `info.lastError` | 字符串 | 最后一条错误消息。成功轮询后为空。 |
| `info.lastError` | 字符串 | 最后一条错误信息。成功轮询后为空。 |

### 站点状态
| 状态 | 单位 | 描述 |
| --- | --- | --- |
| `dailyPowerGeneration` | 千瓦时 | Absaar API 报告的每日发电量。 |
| `totalPowerGeneration` | 千瓦时 | Absaar API 报告的总发电量。 |
| `currentPower` | W | Absaar API 报告的当前站点功率。 |
| `incomeOfTheDay` | | API 报告的每日收入计数器。 |
| `currentMonthsIncome` | | API 报告的月收入计数器。 |
| `cumulativeIncome` | | API 报告的累计收入计数器。 |
| `saveStandardCoal` | | API 报告的环境计数器。 |
| `emissionReductionCO2` | | API 报告的二氧化碳减排量。 |
| `protectTrees` | | API 报告的树木保护计数器。 |
| `inverterTotal` | | 已分配逆变器的数量。 |
| `inOnCount` | | 在线逆变器的数量。 |
| `inOnCount` | | 在线逆变器的数量。 |

### 收集器状态
收集器状态创建于 `stations.<stationId>.inverters.<inverterId>` 之下。即使单独的逆变器数据端点未返回任何行，也会创建这些状态。

| 状态 | 单位 | 描述 |
| --- | --- | --- |
| `collectorId` | | 收藏家 ID。 |
| `inverterId` | | 逆变器 ID。 |
| `inverterName` | | 逆变器名称。 |
| `communicationStatus` | | API 报告的通信状态。 |
| `onlineStatus` | | API 报告的在线状态。 |
| `networkStatus` | | 数字网络状态。 |
| `inPower` | W | 集电极列表中报告的输入功率或当前功率。 |
| `ipAddress` | | API 报告的云端 IP 地址。 |
| `onlineTime` | | 最后在线时间戳。 |
| `exhibitionTime` | | API 显示的最新数据时间戳。 |
| `collectorType` | | 收集器类型。 |
| `equipmentType` | | 设备类型。 |
| `modelReplace` | | 模型标识符。 |
| `modelReplace` | | 模型标识符。 |

### 逆变器状态
| 状态 | 单位 | 描述 |
| --- | --- | --- |
| `acPower` | W | 交流输出功率。 |
| `acFrequency` | 赫兹 | 交流频率。 |
| `acElectric` | A | 交流电流。 |
| `pv1Power` | W | 光伏输入 1 功率。 |
| `pv2Power` | W | 光伏输入功率 2。 |
| `pv1Voltage` | V | 光伏输入1电压。 |
| `pv2Voltage` | V | 光伏输入2电压。 |
| `pv1Electric` | A | 光伏输入1电流。 |
| `pv2Electric` | A | 光伏输入 2 电流。 |
| `inPower` | W | API 报告的输入功率。 |
| `temperature` | 摄氏度 | 逆变器温度。 |
| `batteryVoltage` | V | 电池电压（如果设备报告）。 |
| `batteryCurrent` | A | 电池电流（如果设备报告）。 |
| `batteryPower` | W | 电池电量（如果设备报告）。 |
| `loadPower` | W | 负载功率（如果设备报告）。 |
| `controllerTemperature` | 摄氏度 | 控制器温度（如果设备报告）。 |
| `controllerTemperature` | 摄氏度 | 控制器温度（如果设备已报告）。 |

并非所有 Absaar 设备都会报告所有字段。缺失值将保持不变，直到 API 返回有效的数值为止。

## 故障排除
1. 检查 `absaar.0.info.connection`。
2. 检查 `absaar.0.info.lastError`。
3. 验证相同的凭证在 Absaar EMS 应用中是否有效。
4. 测试时，轮询间隔保持在 120 秒或更高。
5. 仅临时启用原始 JSON，因为它可能会根据 API 响应创建大量状态。

## Changelog

### 0.1.13 (2026-07-14)

- Added complete adapter description translations and a manufacturer link.
- Enforced a safe polling interval range of 30 seconds to 24 hours.
- Enabled TLS certificate verification for cloud API requests.
- Improved state roles and avoided redundant object creation during polling.
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.1.12

- Added the release script configuration required by the repository checker.

### 0.1.11

- Added ioBroker development tooling used by common adapter maintenance workflows.
- Switched admin translations to the short i18n file format.

### 0.1.10

- Switched the CI workflow to the standard ioBroker testing actions.
- Added package and integration test scripts expected by the ioBroker checker.

### 0.1.9

- Added trusted publishing workflow configuration for signed npm releases.
- Added repository housekeeping updates requested by the ioBroker checker.

Older entries are archived in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 TheBam