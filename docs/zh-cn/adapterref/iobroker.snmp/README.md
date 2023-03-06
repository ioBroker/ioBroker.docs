---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.snmp/README.md
title: ioBroker.snmp文件
hash: 8mwbhrvuVmytWIAPN5T+kkSEqlx4n82637hr2IEP6AI=
---
![标识](../../../en/adapterref/iobroker.snmp/admin/snmp.png)

![GitHub 许可证](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.snmp)
![下载](https://img.shields.io/npm/dm/iobroker.snmp.svg)
![GitHub 存储库大小](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.snmp)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.snmp)
![GitHub 自最新版本以来提交（按日期）](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.snmp/latest)
![GitHub 最后一次提交](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.snmp)
![GitHub 问题](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.snmp)
![NPM 版本](http://img.shields.io/npm/v/iobroker.snmp.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/snmp-stable.svg)
![安装数量](https://iobroker.live/badges/snmp-installed.svg)

#ioBroker.snmp
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/snmp/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **版本：** </br> </br> **测试：** </br> [![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.snmp/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.snmp/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.snmp/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.snmp/actions/workflows/codeql.yml)

##哨兵
**此适配器使用哨兵库自动向开发人员报告异常和代码错误。**有关更多详细信息和如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

## 信息
此适配器可用于使用 SNMP 协议从打印机、网络设备等设备轮询信息。

＃＃ __工作正在进行中__
-->

### 2.4.3 (2023-03-01)
* (McM1957) 翻译和依赖项已更新。

### 2.4.2 (2023-02-25)
* (McM1957) 哨兵报告的问题已得到修复。 (#230)

### 2.4.1 (2023-02-22)
* (McM1957) 配置页面上的错误已得到纠正。 (#228)

### 2.4.0 (2023-02-21)
* (McM1957) 支持将数据写入 oids 已经实现。 (#150)
* (McM1957) 代码的主要部分已被重写，因此支持 oid 编写。
* (McM1957) 现在可以禁用包含类型信息的状态。 (#218)
* (McM1957) 添加了指示设备在线和错误状态的状态。状态“在线”已移至文件夹信息。
* (McM1957) 设备状态现在使用颜色和图标显示在对象视图中。
* (McM1957) 数据类型“自动”已添加到 oid 状态数据类型选择器。
* (McM1957) 哨兵报告的问题已得到修复。 (#224)
* (McM1957) ack 标志的错误设置已得到纠正。 (#225)
* (McM1957) 添加了对 sha224、sha256、sha384 和 sha512 消息身份验证的支持 (#210)

### 2.3.0 (2022-12-13)
* (McM1957) 添加对状态使用本机数据类型的支持。 (#143)
* (McM1957) 添加了将二进制 oid 数据存储为 json 的支持。 (#188)
* (McM1957) 写入模式的错误设置已得到修复。 (#191)
* (McM1957) 德语文档中的表格已得到修复。 (#192)
* (McM1957) 使用保留名称“在线”命名 oid 已被阻止。 (#203)
* (McM1957) 已实施一些与代码质量相关的更改。 （#201，#190）

### 2.2.1 (2022-10-18)
* (McM1957) 修复了 io-package.json 中的一个错误。
* (McM1957) 已添加乌克兰语翻译。

### 2.2.0 (2022-10-18)
* (McM1957) 兼容性标志现已弃用，并将在未来的版本中删除。如果需要，请调整配置。
* (McM1957) 添加了 SNMP V3 支持 (#71)
* (McM1957) 添加了对 IPv6 的支持 (#138)
* (McM1957) 代码已按照 eslint 的建议进行了清理
* (McM1957) 基本模块已升级到当前版本
* (McM1957) 文档已更新（en、de、ru）

### 2.1.10 (2022-09-22)
* (McM1957) 增强了 OID 和设备名称的验证，哨兵报告了崩溃 (#169)

### 2.1.9 (2022-09-13)
* (McM1957) 重新添加了对 (IPv4) 域名的支持 (#165)
* (McM1957) 没有任何活动 oid 的设备不再导致致命错误但仅记录警告 (#155)
* (McM1957) Timervalues 现在更严格地验证 (#156, #164)
* (McM1957) 哨兵报告的一些崩溃已得到修复 (#167)
* (McM1957) 外部包已由 dependabot 更新

### 2.1.8 (2022-09-08)
* (McM1957) 修补程序：从以前的版本更新到版本 v2.x.x 时，参数“community”尚未迁移。 (#163)

### 2.1.7 (2022-08-27)
* (McM1957) README.md 中的文档已更新 (#133)

### 2.1.6 (2022-08-19)
* (McM1957) 哨兵报告的一些问题已得到修复 (#151, #152)

### 2.1.5 (2022-08-11)
* (McM1957) 选项“可选”的功能已恢复。 (#147)

### 2.1.4 (2022-08-08)
* (McM1957) HOTFIX - 修复了 SNMP v1 错误导致的系统崩溃 (#145)

### 2.1.3 (2022-08-07)
* (McM1957) 添加了一个新选项来控制单个请求中的 OID 数量以避免 TOOBIG 错误 (#72)

### 2.1.2 (2022-08-02)
* (McM1957) 浮点值的转换已得到纠正 (#16)

### 2.1.1 (2022-08-01)
* (McM1957) 一些外部包已经更新

### 2.1.0 (2022-07-30)
* (McM1957) net-snmp 升级到3.8.2版本
* (McM1957) 添加了对 SNMP v2c 的支持 (#116)
* (McM1957) 状态对象的质量标记将在错误或超时的情况下使用
* (McM1957) 已实施 OID 标记“可选”。此标记会抑制并非始终可用的 OID 的错误。 (#116)
* (McM1957) 添加了对 Counter64 OID 的支持。 (#57)
* (McM1957) snmp 通信返回的数据现在将被记录更多详细信息。
* (McM1957) 紧凑模式已启用。 (#20)
* (McM1957) 已知限制：目前仅支持 SNMP V1 和 SNMP V2c。
* (McM1957) 已知限制：OID 属性可写尚未实现。

### 2.0.1 (2022-07-22)
* (McM1957) 兼容模式标志的错误处理已得到纠正 (#135)
* (McM1957) 更正了无效 OID 的错误记录（#134）

### 2.0.0 (2022-07-21)
* 重要提示：此版本将更改配置结构！

请在开始安装前备份您的配置。
安装将尝试转换旧配置 - 但不能保证在所有情况下都能成功。

* (McM1957) 代码的许多部分已被重写
* (McM1957) 适配器现在使用 admin5 接口
* (McM1957) 现在可以为每个设备设置不同的定时器值 (#105)
* (McM1957) 更改配置条目的顺序不再破坏数据 (#15)
* (McM1957) 现在可以命名设备的状态对象。旧行为可作为选项使用。
* (McM1957) 已知限制：目前仅支持 SNMP V1。
* (McM1957) 已知限制：OID 属性可选和可写尚未实现。

### 1.0.0 (2022-03-21)
* 重要提示：此版本将更改对象结构！
* (McM1957) 更新 info.connection 的延迟已减少
* (McM1957) 如果目标无法访问，过多的错误记录已被优化
* (McM1957) 在 ip base 添加了额外的在线对象来指示目标是可达的
* (McM1957) 如果 OID 为一个设备指定不同的社区，将输出警告
* (Apollon77) 添加了崩溃报告哨兵

### 0.5.0
* (Marcolotti) 添加文档 (de,en,ru)
* (Marcolotti) 添加语言 (de,en,ru)

### 0.0.3
* (Apollon77) 固定对象类型

### 0.0.2
* (Bluefox) 修复

### 0.0.1
* (Bluefox) 重构
* (Marcolotti) 初始版本

## __适配器配置__
适配器查询指定的 oid，这些 oid 被分组在 oid 组中，而 oid 组又被分配给设备。配置数据在几个选项卡中输入：

### __TAB OID-Groups__
此处指定适配器要查询的所有 oid，每行一个 oid。

|参数 |类型 |说明 |评论 |
|---------------|-------------|-----------------------------------|-------------------------------------|
|活跃|布尔 |如果设置为 true，将使用 OID |可用于禁用单个 OID |
| OID 组 |文字 | OID 组的名称 |将用于将组分配给设备 |
| OID-名称 |文字 |分配给 OID 的名称 |将用于命名数据点 |
|标识符 |文字 | oid 字符串 (1.2.3.4.) |设备供应商指定的 oid 字符串 |
|可写 |布尔 |如果 OID 是可写的，应该设置为 true |留作将来使用 |
|可选 |布尔 |如果 OID 是可选的，则应设置为 true |如果设置为 true，如果 oid 未知，则不会引发错误 |

### __TAB 设备__
您可以在此处指定应查询哪些设备。

|参数 |类型 |说明 |评论 |
|---------------|-------------|-----------------------------------|-------------------------------------|
|活跃|布尔 |如果设置为真，设备将被使用 |可用于禁用单个设备 |
|名称 |文字 |设备名称 |将用于创建数据点的名称 |
| IP地址 |文字 |带有可选端口号的 ip 地址（IPv4 或 IPv6）|注意：目前仅支持 IPv4 |
| OID 组 |文字 | OID 组在选项卡 IOD Groups | 中指定一个 OID 组可以分配给多个设备 | |
| SNMP 版本 |选择 |使用的 SNMP 版本 |注意：尚不支持 SNMPv3 |
|社区 (v1, v2c) 或 Auth-ID (v3) |文字 | SNMP v1 或 V2c 社区，SNMP v3 授权组 |注意：尚不支持 SNMPv3 |
|超时（秒） |编号 |处理超时秒数 | |
|重试（秒） |编号 |以秒为单位的重试间隔 | |
|轮询（秒） |编号 |以秒为单位的轮询间隔 | |

### __TAB授权__
此选项卡包含 SNMP V3 授权信息。请注意，SNMP V3 尚未实施。

|参数 |类型 |说明 |评论 |
|---------------|-------------|-----------------------------------|-------------------------------------|

### __TAB 选项__
在这里指定一些通用选项

|参数 |类型 |说明 |评论 |
|---------------|-------------|-----------------------------------|-------------------------------------|
|数据包大小 |整数 |单个请求中发送的最大 OID 数 |在出现 TOOBIG 错误时减少此值 |
|兼容模式 |布尔 |如果激活此选项，数据点名称基于 ip 地址 |注意：已过时 - 不要再使用。此标志不适用于 IPv6 地址。可能会在未来的版本中删除。 |

＃＃ __执照__
麻省理工学院执照 (MIT)

版权所有 (c) 2017-2023 Marcolotti <info@ct-j.de>, McM1957 <mcm57@gmx.at>, ioBroker Community Developers

特此免费授予获得本软件和相关文档文件（“软件”）副本的任何人不受限制地处理本软件的权限，包括但不限于使用、复制、修改、合并的权利、发布、分发、再许可和/或出售软件的副本，并允许获得软件的人这样做，但须满足以下条件：

上述版权声明和本许可声明应包含在本软件的所有副本或重要部分中。

本软件“按原样”提供，不提供任何明示或暗示的保证，包括但不限于对适销性、特定用途的适用性和非侵权的保证。在任何情况下，作者或版权持有人均不对任何索赔、损害或其他责任负责，无论是在合同诉讼、侵权行为还是其他方面，由软件或软件的使用或其他交易引起、由软件引起或与之相关软件。

## Changelog

<!--