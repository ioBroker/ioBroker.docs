---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zte-mc888/README.md
title: ioBroker.zte-mc888
hash: v53dMYCwOaCCfF+zXcVK9Zhql55pO/YHWip7D+jETHA=
---
# IoBroker.zte-mc888
从中兴MC888路由器读取LTE和5G信号值，并将其作为ioBroker状态公开。

## 支持的设备
[中兴MC888 5G FWA（室内路由器）](https://www.ztedevices.com/de/products/mobile-internet/5g-fwa/MC888.html) — 中兴通讯设备的产品页面。

该适配器与路由器的本地 `goform` HTTP API 通信，因此不需要云帐户和互联网连接。

## 州
所有状态均为只读。`…Dec` 状态是其旁边原始十六进制值的十进制表示（即路由器 Web 界面显示的内容）。

### `general`
| 状态 | 类型 | 单位 | 描述 |
| --- | --- | --- | --- |
| `networkType` | 字符串 | | 当前网络类型，例如 `ENDC` 或 `LTE` |
| `cellIdDec` | 数字 | | 单元格 ID（十进制数） |
| `cellIdDec` | 数字 | | 单元格 ID（十进制数） |

### `lte` — LTE 主小区
| 状态 | 类型 | 单位 | 描述 |
| --- | --- | --- | --- |
| `rsrp` | 数值 | dBm | 参考信号接收功率 |
| `sinr` | 数值 | 分贝 | 信噪比 |
| `rssi` | 数值 | dBm | 接收信号强度 |
| `band` | 字符串 | | 主载波频段，例如 `3` |
| `bandName` | 字符串 | | 小区信息中报告的频段，例如 `LTE BAND 3` |
| `arfcn` | 字符串 | | 下行 EARFCN（频道号） |
| `bandwidth` | 字符串 | | 主载波带宽 |
| `pci` | 字符串 | | 物理单元 ID（十六进制） |
| `pciDec` | 数字 | | 物理单元 ID（十进制数） |
| `carrierAggregation` | 字符串 | | 路由器报告的载波聚合状态 |
| `carrierAggregation` | 字符串 | | 路由器报告的载波聚合状态 |

### `lte.scc0` … `lte.scc3` — LTE 辅助载波
每个辅助载波单元一个通道（最多四个），每个通道的状态相同：

| 状态 | 类型 | 单位 | 描述 |
| --- | --- | --- | --- |
| `active` | 布尔值 | | `true` 当此辅助载波正在使用时 |
| `band` | 号码 | | 频段 |
| `arfcn` | 编号 | | 频道号 |
| `bandwidth` | 编号 | MHz | 带宽 |
| `rsrp` | 数值 | dBm | 参考信号接收功率 |
| `rsrq` | 数值 | dB | 参考信号接收质量 |
| `sinr` | 数值 | 分贝 | 信噪比 |
| `rssi` | 数值 | dBm | 接收信号强度 |
| `rssi` | 数值 | dBm | 接收信号强度 |

### `nr5g` — 5G NR 主小区
| 状态 | 类型 | 单位 | 描述 |
| --- | --- | --- | --- |
| `rsrp` | 数值 | dBm | 参考信号接收功率 |
| `sinr` | 数值 | 分贝 | 信噪比 |
| `rssi` | 数值 | dBm | 接收信号强度 |
| `band` | 字符串 | | 乐队，例如 `78` |
| `bandName` | 字符串 | | 单元格信息中报告的频段 |
| `arfcn` | 字符串 | | NR-ARFCN（频道号） |
| `bandwidth` | 字符串 | | 带宽 |
| `pci` | 字符串 | | 物理单元 ID（十六进制） |
| `pciDec` | 数字 | | 物理单元 ID（十进制数） |
| `pciDec` | 数字 | | 物理单元 ID（十进制数） |

### `info`
| 状态 | 类型 | 单位 | 描述 |
| --- | --- | --- | --- |
| `connection` | 布尔值 | | `true` 当上次轮询成功时 |

未登录时，路由器仅提供网络类型和主RSRP/RSSI值；所有其他状态均为空。参见[登录、会话和 Web 用户界面](#login-sessions-and-the-web-ui)。

＃＃ 配置
- **路由器 IP** — 通常为 `192.168.0.1`，某些固件使用 `192.168.254.1`。
- **轮询间隔** — 读取之间的秒数（5 到 86400）。
- **需要登录** — 如果 API 仅在身份验证后才响应，则启用此选项。
- **用户名/密码** — 路由器管理员凭据（用户名默认为 `admin`）。
- **Web UI 优先级最高**（仅限登录后）— 当路由器 Web 界面记录日志时

如果使用同一用户登录，适配器会暂停而不是重新登录并将其踢出。请参见下文。

- **网页界面登录后回退（分钟）** *(仅限登录后)* — 持续时间

Web UI 接管会话后，适配器将保持注销状态（保留最后值）。默认值为 5。设置为 `0` 可在下次轮询时重新登录。

## 登录、会话和 Web 用户界面
MC888 仅支持少数几个字段（网络类型 + 主 RSRP/RSSI）无需身份验证；RSRQ、SINR、频段、PCI、载波聚合和辅助小区需要登录。此外，该路由器**每个用户仅允许一个会话**，第二个登录操作会静默地断开第一个会话。

为了避免与路由器 Web 界面（同一用户 `admin`）发生冲突，适配器：

1. 只需登录一次，即可在多次投票中保持会话状态（完整字段集）。
2. 检测何时有另一个登录帐户（Web 用户界面）接管其会话，
3. 然后，在设定的时间内**退出**，而不是立即重新登录。

在此期间，系统会保留最后几个值，只有公共字段会继续更新，因此您的 Web UI 会话不会受到干扰。

4. 退避期结束后重新获取会话。

如果您希望始终拥有完整数据，并且不介意 Web UI 被注销，请禁用 **Web UI 具有优先级**（或将退避设置为 `0`）。

## 固件差异
路由器的原始字段名称在不同固件版本之间有所不同，因此在某些固件版本中，某些状态可能为空。如果出现这种情况，请提供调试日志（实例日志级别为 [提出问题](https://github.com/muraus/ioBroker.zte-mc888/issues)，用于记录路由器的原始响应）以及您的固件版本——这样就可以在适配器中添加对不同字段名称的支持。

## 贡献
有关构建、测试和扩展适配器的说明在[开发.md](https://github.com/muraus/ioBroker.zte-mc888/blob/main/DEVELOPMENT.md)中。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.0.5 (2026-08-13)
* (Adapterman) Adapter requires admin >= 7.8.23 now.
* (Adapterman) The poll interval is now capped at 24 h so a huge value cannot overflow the timer
* (Adapterman) The web UI back-off is now capped at 24 h and both limits are enforced in the admin config
* (Adapterman) New adapter icon, delivered only in the admin directory as in the ioBroker template
* (Adapterman) Corrected and completed the list of adapter states in the README
* (Adapterman) Removed the install section from the README and moved the development notes to DEVELOPMENT.md

### 0.0.4 (2026-07-29)
* (Adapterman) Added the supported device section with a link to the ZTE MC888 product page
* (Adapterman) Corrected the required Node.js version in the development section
* (Adapterman) Added the readme link to io-package.json so Admin can link the documentation
* (Adapterman) Completed the author information in package.json, io-package.json and LICENSE

### 0.0.3 (2026-07-25)
* (Adapterman) Added ESLint (@iobroker/eslint-config) and prettier config plus a `lint` script
* (Adapterman) Added a tsconfig.json and a `check` script to type check the JavaScript sources via JSDoc
* (Adapterman) Fixed a crash in the poll loop when the router did not answer and no login is configured
* (Adapterman) Admin config is now translated into all 11 ioBroker languages (jsonConfig i18n)
* (Adapterman) Added dependabot configuration and VS Code JSON schema settings
* (Adapterman) Lint and type checking are now enforced in CI

### 0.0.2 (2026-07-25)
* (Adapterman) Normalized the repository URL in package.json
* (Adapterman) Release is published via npm trusted publishing and signed with provenance

### 0.0.1 (2026-07-25)
* (Adapterman) Initial release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Adapterman <adapterman@proton.me>

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