---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.iec104/README.md
title: ioBroker IEC 60870-5-104 适配器
hash: fK8Zo/CbMZhh11PhfZTaDNakEqLayYEmb6FaLC1wt+U=
---
# IoBroker IEC 60870-5-104 适配器
用于IEC 60870-5-104主从通信的ioBroker适配器。

该适配器可作为 IEC-104 主站或从站运行。接收到的数据点按 ASDU/公共地址分组，如下所示：`ASDU-<address>`。每个 ASDU 包含单独的文件夹，分别用于存储数值、IV 质量、NT 质量、时间戳和 COT 信息。

＃＃ 特征
- 主模式，用于连接到 IEC-104 控制站。
- 从模式，用于通过 IEC-104 公开已配置的 ioBroker 状态。
- 连接后进行一般询问，并可选择进行循环询问。
- 可配置 COT、通用地址和 IOA 字段大小。
- 支持导入和导出的可配置数据点表。
- 按 ASDU/公共地址分组的状态布局。
- 为值、IV、NT、时间戳和 COT 文本分别设置不同的状态。

＃＃ 配置
首先设置连接模式：

- `主控站`：连接到远程IEC-104从站。
- `从属/受控站`：在本地监听远程IEC-104主站。

常用设置：

| 背景 | 含义 |
| --- | --- |
| `Remote host` | 远程主机用于主模式。 |
| `Bind address` | 从模式下使用的本地绑定地址。 |
| `Common address` | 已配置点的默认公共地址。 |
| `Originator address` | ASDU 中使用的发起人地址。 |
| `Read only` | 拒绝来自远程端的命令 ASDU。 |
| `只读` | 拒绝来自远程端的命令 ASDU。 |

## 数据点
配置点定义了 IEC-104 IOA 如何映射到 ioBroker 状态。该表支持监控类型、命令类型、时间戳、缩放以及可选的每点通用地址。

适配器还会将接收到的点存储在 `ASDU-<address>` 以下，以便来自不同公共地址的值保持分离。

## Changelog

### **WORK IN PROGRESS**

- Correct button-state metadata, sanitize configured state IDs and clamp all configurable timer values.
- Require Admin >= 7.8.23 and update repository maintenance configuration.

### 0.1.26

- Uses the standard npm environment token fallback and keeps `common.news` within repository limits.

### 0.1.25

- Completed translations for technical ASDU option labels.

### 0.1.24

- Completed all Admin UI translations using short-format i18n files.

### 0.1.23

- Published the point-role fix with npm provenance through the standard ioBroker release workflow.

### 0.1.22

- Assigned valid ioBroker roles to read-only and writable IEC-104 points.
- Restored the standard ioBroker test-and-release deployment workflow.

### 0.1.21

- Fixed ioBroker repochecker metadata, package checks, jsonConfig i18n handling and release automation.

### 0.1.20

- Replaced plain Node.js timers with ioBroker adapter timer helpers.

### 0.1.19

- Removed old unpublished changelog entries from `io-package.json`.
- Added responsive metadata for the data point table.

### 0.1.18

- Added repository metadata, CI release automation and adapter checker compatibility for public ioBroker publication.

### 0.1.17

- Reorganized states by ASDU with Value, IV, NT, Time and COT folders.
- Exposed NT quality and COT text states.
- Improved master reconnect handling.

Older entries are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

Copyright (c) 2026 TheBam1990

MIT License. See [LICENSE](LICENSE) for details.