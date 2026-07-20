---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.cisco-checkpresence/README.md
title: ioBroker.cisco-checkpresence
hash: 6+T+2vQnd6HzYSNvcHp2+s9gjVTOJ+FL6iLzVYR1V34=
---
![标识](../../../en/adapterref/iobroker.cisco-checkpresence/admin/cisco-checkpresence.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.cisco-checkpresence.svg)
![下载](https://img.shields.io/npm/dm/iobroker.cisco-checkpresence.svg)
![安装数量](https://iobroker.live/badges/cisco-checkpresence-installed.svg)

# IoBroker.cisco-checkpresence
**测试：** ![测试与发布](https://github.com/NurPech/ioBroker.cisco-checkpresence/workflows/Test%20and%20Release/badge.svg)

## Cisco Catalyst 9800 CheckPresence 适配器（适用于 ioBroker）
通过 RESTCONF 查询 Cisco Catalyst 9800 无线控制器来检测家庭成员是否存在。该适配器不采用不可靠的 ping 检查，而是直接从 WLC 读取已认证客户端表——如果控制器显示某个设备已关联，则该设备确实存在。

＃＃ 要求
- Cisco Catalyst 9800 系列无线控制器（9800-L、9800-CL、9800-40、9800-80）
- **需要 802.1X 身份验证**。适配器通过客户端的 802.1X 用户名识别客户端。无需外部 RADIUS 服务器——WLC 上的本地 EAP 就足够了。
- 具有 RESTCONF 读取权限的 WLC 用户帐户
- ioBroker，js-controller 版本≥6.0.11，Admin 版本≥7.0.23

＃＃ 配置
在ioBroker管理后台打开适配器设置。

### 连接选项卡
| 字段 | 描述 |
|-------|-------------|
| WLC 主机/IP 地址 | Catalyst 9800 WLC 的 IP 地址或主机名 |
| 用户名 | RESTCONF 用户名（例如 `iobroker_bot`） |
| 密码 | RESTCONF 密码（加密存储） |
| 间隔（秒）| 轮询间隔，单位为秒（10–300，默认值：30）|
| 忽略自签名证书 | 如果您的无线局域网控制器 (WLC) 使用自签名 TLS 证书，请启用此选项（推荐） |

### 用户选项卡
在ioBroker中将802.1X用户名映射到州名：

| 字段 | 描述 |
|-------|-------------|
| 802.1X 用户名 | WLC 客户端表中显示的用户名 |
| 州名 | 根据 `presence.<name>` 使用的州名 |

## 州
对于每个已配置的用户，适配器会创建以下状态：

| 状态 | 类型 | 描述 |
|-------|------|-------------|
| `presence.<name>.present` | 布尔值 | `true` 如果客户端当前已关联 |
| `presence.<name>.band` | 字符串 | 无线电频段（`2.4 GHz`、`5 GHz` 或 `6 GHz`） |
| `presence.<name>.rssi` | 数值 (dBm) | 接收信号强度 |
| `presence.<name>.snr` | 数值 (dB) | 信噪比 |
| `info.connection` | 布尔值 | `true` 如果 WLC 可达 |
| `info.connection` | 布尔值 | 如果 WLC 可达，则为 `true` |

## 与 ioBroker Residents 集成
可以通过“外国存在数据点”字段将存在状态与[ioBroker 居民适配器](https://github.com/jpawlowski/ioBroker.residents)关联起来：

```
cisco-checkpresence.0.presence.leonie.present
```

## 已知局限性
- **每个用户多个设备：**如果多个设备使用相同的 802.1X 用户名进行身份验证，则使用 WLC API 返回的第一个客户端。这是使用场景的限制，并非错误。
- **需要 802.1X：** 未启用 802.1X 认证的设备（例如使用预共享密钥的物联网设备）将无法被检测到。如果没有外部 RADIUS 服务器可用，WLC 上的本地 EAP 即可满足要求。
- **仅限集中式交换：** 已使用本地模式下的集中式交换（CAPWAP）AP 进行测试。灵活/本地交换的行为可能有所不同。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.0.7 (2026-06-11)
- Fixed: Sanitise user-supplied state names to remove characters forbidden in ioBroker object IDs
- Fixed: Clamp pollInterval and absentThreshold to sane upper bounds
- Fixed: Avoid overlapping polls by self-scheduling the poll loop instead of using setInterval
- Fixed: Use translations for the admin tab labels and poll interval field
- Fixed: Corrected admin page title

### 0.0.6 (2026-06-06)
- Fixed: Fixed object structure

### 0.0.5 (2026-06-06)
- Fixed: Fixed object structure

### 0.0.4 (2026-06-06)
- Chore: Update to node 22
- Chore: Update dependencies
- Fixed: Fixed object structure

### 0.0.3 (2026-04-27)
- (M1kad0) fix npm publishing

### 0.0.2 (2026-04-26)
- (M1kad0) added absent threshold to debounce presence detection

### 0.0.1 (2026-04-26)
- Initial release
- Presence detection via RESTCONF (`common-oper-data`)
- AP name, radio band, RSSI and SNR via `traffic-stats`
- Encrypted password storage
- Dark/light mode admin UI with MUI v6

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 M1kad0 <leonie+iobroker@sgessinger.de>

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