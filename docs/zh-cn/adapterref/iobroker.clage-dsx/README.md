---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.clage-dsx/README.md
title: ioBroker.clage-dsx
hash: 0mWtgdm7G91PsfZGbKfeZzP1j+D+MVMJYpqD77yZkV4=
---
# IoBroker.clage-dsx
![CLAGE DSX 标志](../../../en/adapterref/iobroker.clage-dsx/admin/clage-dsx.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.clage-dsx.svg)
![下载](https://img.shields.io/npm/dm/iobroker.clage-dsx.svg)

[![测试和发布](https://github.com/TheBam1990/ioBroker.clage-dsx/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/TheBam1990/ioBroker.clage-dsx/actions/workflows/test-and-release.yml)

[德国文献](README_DE.md)

＃＃ 描述
此适配器将 ioBroker 连接到本地 [CLAGE](https://www.clage.com/) 家庭服务器及其已注册的即热式热水器。通信使用本地网络中的 HTTPS API；无需云服务。

该实现基于所包含的[CLAGE Home Server API 规范 v1.3.4](CLAGE%20HomeServer%20API%20v1.3.4.pdf)。

＃＃ 要求
- ioBroker 需要 Node.js 22 或更高版本
- CLAGE Home 服务器可从 ioBroker 主机访问
- 主服务器 API 用户名和密码
- 通过 HTTPS 访问主服务器

＃＃ 配置
打开实例设置并输入：

1. **CLAGE 主服务器 IP 地址**，例如 `192.168.2.35`（不带 `https://`）
2. **API 用户名**，例如 `admin`
3. **API密码**，例如`geheim`

这三个字段均为必填项。用户名的历史原生配置键名为`port`；保留此键是为了与现有安装兼容。

`admin` 和 `geheim` 是 CLAGE API 文档中的示例值。请使用您在自己的主服务器上配置的 API 凭据；除非您已在主服务器上实际配置了示例密码，否则请勿使用示例密码。

家庭服务器通常使用自签名 TLS 证书。因此，适配器在直接连接到已配置的设备时会接受本地证书。

## 当前功能
对于每个已注册的 CLAGE 设备，适配器会创建以下状态：

- 身份、连接状态、RSSI、LQI、API 访问掩码和上次无线电活动
-设定点、温度限制、进/出口温度以及所有四个温度预设值
流量、流量限制、阀门位置、原始功率和计算功率、加热状态和误差
- 固件和序列号、电源单元信息和运行时间计数器
- 总消耗量加上最近一次用电周期和消耗历史记录（JSON 格式）。
- 当前错误及错误历史记录（JSON 格式）
- 家庭服务器版本、身份、无线电频道、地址和已发布的服务
所有计时器，包括全局计时器和按设备筛选的计时器。

可写状态：

- `设定点`：API 值，以摄氏度的十分之一为单位，例如 `450` = 45.0 °C
- `Themperatur`：温度，单位为摄氏度；为保持兼容性，保留其历史拼写。
- `flowMax`：流量限制，单位为每分钟十分之一升；特殊的 API 值包括 `253`（ECO）和 `254`（AUTO）
- `名称`: 设备名称
- `setup.flowMax`、`setup.loadShedding`、`setup.scaldProtection` 和 `setup.sound`
- `timers.createJson`、`timers.updateJson` 和 `timers.deleteId` 用于受控定时器管理

`info.connection` 指示主服务器是否可达并接受配置的凭据。

适配器会在写入操作前检查 API 访问掩码。设定值更改会延迟两秒进行防抖动，活动设备会更频繁地刷新，并且设备列表默认使用顺序 HTTP 长轮询。间隔、长轮询和消耗历史记录周期（默认为 30 天）都可以在适配器配置中进行调整。

## 定时器 JSON
通过向 `timers.createJson` 写入如下 JSON 数据来创建计时器：

```json
{"type":0,"weekdays":127,"start":"06:00","stop":"07:00","deviceId":"A001FF0034","setpoint":450}
```

对于更新操作，请将包含数字 `id` 到 `timers.updateJson` 的相同结构写入数据。要删除一个定时器，请将其数字 ID 写入 `timers.deleteId`。故意不公开破坏性批量操作、设备注销和无线地址更改等操作。

## 故障排除
- 确认 IP 地址不包含协议前缀或路径。
- 验证 CLAGE Home Server 配置中的 API 凭据。
- 确保 ioBroker 主机可以访问 TCP 端口 443。
- HTTP 状态码 `401` 表示凭据无效；`403` 表示 API 权限不足。
设备可能已注册但暂时不可用。API 会将此情况报告为 `404`、`410` 或否定的设备错误代码。

## Changelog

### 0.0.9

- Fixed the Home Server address input so any IPv4 address, host name or host with an explicit port can be entered.
- Updated the minimum Admin dependency to 7.8.23.

### 0.0.8

- Fixed all findings from the ioBroker latest-repository review.
- Updated energy and timestamp state roles and clarified the legacy temperature state.
- Restricted setup writes to registered API fields and added safe polling upper limits.
- Corrected all adapter description translations.

### 0.0.7

- Corrected state roles for timestamps, version information and the numeric bus ID

### 0.0.6

- Added live temperatures, presets, valve position, calculated power and radio diagnostics
- Added setup, consumption and error history data
- Added permission-checked setup writes and timer management
- Added Home Server information, adaptive polling and sequential HTTP long polling
- Added configurable polling intervals

[Older changelog entries](CHANGELOG_OLD.md)

## License

Copyright (c) 2026 TheBam <elektrobam@gmx.de>

MIT License. See [LICENSE](LICENSE).