---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.airly/README.md
title: ioBroker.airly
hash: popgyRv90eUL1n150zCAJ7SCNdSjdN37qDGQZVEbte8=
---
# IoBroker.airly
适配器读取您所在位置的空气质量数据（PM2.5、PM10、CAQI 指数），来自 [艾尔利](https://airly.org)。

＃＃ 配置
| 背景 | 含义 |
| ---------------- | --------------------------------------------------------------- |
| `apikey` | Airly API 密钥 (developer.airly.org) |
| `longitude` | 您的经度 |
| `mode` | `point` — 根据您的精确坐标插值（默认）；`nearest` — 来自最近的物理站点的数值 |
| `maxDistanceKM` | 最近站点的搜索半径（公里）；仅在 `nearest` 模式下使用 |
| `pollInterval` | 获取测量数据的频率（分钟） |
| `pollInterval` | 获取测量数据的频率（分钟） |

每次投票都会向 Airly 的 `measurements/point`（或 `measurements/nearest`）端点发出一个请求，该端点直接获取您的坐标——无需管理单独的站点查找。

Airly 将其免费公共 API 的调用次数限制为每天 **100 次**，大约每 15 分钟一次。为了确保调用次数不超过配额，请将 `pollInterval` 的调用间隔保持在 **20 分钟或更长**（约 72 次/天）。每次轮询时，剩余的每日配额都会写入调试日志。

## 州
| 状态 | 描述 |
| ----------------------- | ---------------------------------------- |
| `pm25.value` | PM2.5 浓度 (µg/m³) |
| `pm10.value` | PM10 浓度 (µg/m³) |
| `pm10.limitPercent` | PM10 占正常值的百分比 |
| `caqi.value` | CAQI 指数值 |
| `caqi.level` | CAQI 级别（例如`LOW`、`MEDIUM`）|
| `caqi.description` | 人类可读的空气质量描述 |
| `info.connection` | API 可访问 / 数据有效 |
| `info.lastUpdate` | 最后一次测量的时间戳 |
| `info.lastUpdate` | 上次测量的时间戳 |

`caqi.level` 和 `caqi.description` 是 Airly API 直接返回的文本值。它们的语言由 Airly 选择（基于请求/API 默认值，通常为英语），并且**不**由适配器翻译，因此可能与 ioBroker UI 语言不匹配。

＃＃ 安装
在 ioBroker 管理后台打开“适配器”选项卡，找到 Airly，点击“+”按钮安装并添加实例。然后打开实例设置，填写您的 Airly API 密钥和坐标。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.3.7 (2026-08-07)
* (tnowak) Review feedback: removed the incomplete Sentry plugin configuration, enforced the poll-interval minimum (5 min) in code, and documented that caqi.level/description are API-provided and not translated

### 0.3.6 (2026-07-11)
* (tnowak) Read coordinates fresh on every poll and skip the request (instead of sending NaN) when they are invalid, logging the offending value; set info.connection = false on stop

### 0.3.5 (2026-07-08)
* (tnowak) Fixed the jsonConfig schema URL in .vscode/settings.json and bumped @iobroker/adapter-dev

### 0.3.4 (2026-07-08)
* (tnowak) Addressed repochecker suggestions: short-format i18n, CHANGELOG_OLD.md, .vscode settings, Dependabot automerge + higher PR limit, and @iobroker/adapter-dev

### 0.3.3 (2026-07-08)
* (tnowak) Removed chai and mocha from devDependencies (provided by @iobroker/testing) to satisfy the repository checker

Older entries are kept in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

The MIT License (MIT)

Copyright (c) 2026 tnowak <tnowak@netventure.pl>

See [LICENSE](LICENSE) for the full text.