---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.snmp/README.md
title: ioBroker.snmp
hash: 5fWBjXvIrO/ZnPzJQv6aytMx8BLt5umK8be2edSHF7M=
---
![标识](../../../en/adapterref/iobroker.snmp/admin/snmp.png)

![GitHub 许可证](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.snmp)
![下载](https://img.shields.io/npm/dm/iobroker.snmp.svg)
![GitHub 存储库大小](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.snmp)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.snmp)
![GitHub 自最新版本以来提交的内容（按日期）](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.snmp/latest)
![GitHub 最后一次提交](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.snmp)
![GitHub 问题](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.snmp)
![NPM版本](http://img.shields.io/npm/v/iobroker.snmp.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/snmp-stable.svg)
![安装数量](https://iobroker.live/badges/snmp-installed.svg)

# IoBroker.snmp
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/snmp/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **版本：** </br> </br> **测试：** </br> [![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.snmp/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.snmp/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.snmp/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.snmp/actions/workflows/codeql.yml)

## 哨兵
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。

## 信息
该适配器可用于使用 SNMP 协议从打印机、网络设备等设备轮询信息。

## 适配器配置
适配器查询指定的 oid，这些 oid 被分组在 oid 组中，而 oid 组又被分配给设备。配置数据在多个选项卡中输入。该适配器支持 IPv4 和 IPv6 连接。

有关详细信息，请参阅下面引用的文档。

## 文档
[英文文档](docs/en/snmp.md)<br> [德语文献](docs/de/snmp.md)<br> [俄语文档](docs/ru/snmp.md)

＃＃ __工作正在进行中__
-->

### 2.4.11 (2023-07-13)
* (McM1957) Node-net-snmp 已更新以改进 uint32 处理 (#282)
* (McM1957) 其他几个依赖项已更新

### 2.4.10 (2023-07-08)
* (McM1957) 错误输出中的另一个拼写错误已修复

### 2.4.9 (2023-07-05)
* (McM1957) 添加了在出现错误时禁止关闭阅读器会话的选项。
* (McM1957) 启用调试日志后，错误情况下的日志记录已得到增强。

### 2.4.8 (2023-07-04)
* (McM1957) 修复：UDP 端口在错误处理期间丢失 (#282)
* (McM1957) 修复：不正确的 toString() 语法导致多个问题，即丢失错误输出 (#283)
* (McM1957) 依赖项已更新

### 2.4.7 (2023-04-12)
* (McM1957) 更改：包括 net-snmp 在内的多个外部模块已更新

### 2.4.6 (2023-03-26)
* (McM1957) 修复：SNMP 设置对于数值 0 不起作用 (#240)

### 2.4.5 (2023-03-20)
* (McM1957) 修复：使用 SHA 身份验证时 SNMPv3 崩溃 (#236)

### 2.4.4 (2023-03-03)
* (McM1957) 修复：哨兵报告的崩溃 (#235)

### 2.4.3 (2023-03-01)
* (McM1957) 翻译和依赖项已更新。

### 2.4.2 (2023-02-25)
* (McM1957) 哨兵报告的问题已修复。 （＃230）

### 2.4.1 (2023-02-22)
* (McM1957) 配置页面的错误已得到纠正。 （＃228）

### 2.4.0 (2023-02-21)
* (McM1957) 支持将数据写入oids 已实现。 （＃150）
* (McM1957) 大部分代码已被重写，因此支持 oid 编写。
* (McM1957) 现在可以禁用包含类型信息的状态。 （＃218）
* (McM1957) 添加了指示设备在线和错误状态的状态。 “在线”状态已移至文件夹信息。
* (McM1957) 设备状态现在使用颜色和图标显示在对象视图中。
* (McM1957) 数据类型“自动”已添加到 oid 状态数据类型选择器中。
* (McM1957) 哨兵报告的问题已修复。 (#224)
* (McM1957) 确认标志的错误设置已得到纠正。 （＃225）
* (McM1957) 添加了对 sha224、sha256、sha384 和 sha512 消息身份验证的支持 (#210)

### 2.3.0 (2022-12-13)
* (McM1957) 添加对使用状态的本机数据类型的支持。 （＃143）
* (McM1957) 添加了将二进制 oid 数据存储为 json 的支持。 （＃188）
* (McM1957) 写入模式的错误设置已得到修复。 （＃191）
* (McM1957) 德语文档中的表格已修复。 （＃192）
* (McM1957) 使用保留名称“online”命名 oid 已被阻止。 （＃203）
* (McM1957) 一些与代码质量相关的更改已经实施。 （＃201，＃190）

### 2.2.1 (2022-10-18)
* (McM1957) 修复了 io-package.json 中的错误。
* (McM1957) 添加了乌克兰语翻译。

### 2.2.0 (2022-10-18)
* (McM1957) 兼容性标志现已弃用，并将在未来版本中删除。如果需要，请调整配置。
* (McM1957) 已添加 SNMP V3 支持 (#71)
* (McM1957) 添加了对 IPv6 的支持 (#138)
* (McM1957) 代码已按照 eslint 的建议进行清理
* (McM1957) 基本模块已升级至当前版本
* (McM1957) 文档已更新（en、de、ru）

### 2.1.10 (2022-09-22)
* (McM1957) OID 和设备名称的验证已增强，哨兵报告了崩溃 (#169)

### 2.1.9 (2022-09-13)
* (McM1957) 已添加对 (IPv4) 域名的支持 (#165)
* (McM1957) 没有任何活动 oid 的设备不再导致致命错误，而只记录警告 (#155)
* (McM1957) 现在更严格地验证计时器值 (#156, #164)
* (McM1957) 哨兵报告的一些崩溃已修复 (#167)
* (McM1957) 外部包已由dependabot更新

### 2.1.8 (2022-09-08)
* (McM1957) HOTFIX：从以前的版本更新到版本 v2.x.x 时，参数“community”尚未迁移。 （＃163）

### 2.1.7 (2022-08-27)
* (McM1957) README.md 中的文档已更新 (#133)

### 2.1.6 (2022-08-19)
* (McM1957) 哨兵报告的一些问题已修复 (#151, #152)

### 2.1.5 (2022-08-11)
* (McM1957) 选项“可选”的功能已恢复。 (#147)

### 2.1.4 (2022-08-08)
* (McM1957) HOTFIX - SNMP v1 错误导致的系统崩溃已修复 (#145)

### 2.1.3 (2022-08-07)
* (McM1957) 添加了一个新选项来控制单个请求中的 OID 数量，以避免 TOOBIG 错误 (#72)

### 2.1.2 (2022-08-02)
* (McM1957) 浮点值的转换已得到纠正 (#16)

### 2.1.1 (2022-08-01)
* (McM1957) 一些外部包已更新

### 2.1.0 (2022-07-30)
* (McM1957) net-snmp 已升级至版本 3.8.2
* (McM1957) 添加了对 SNMP v2c 的支持 (#116)
* (McM1957) 状态对象的质量标记将在错误或超时的情况下使用
* (McM1957) OID 标记“可选”已实施。该标记可以抑制并不总是可用的 OID 的错误。 （＃116）
* (McM1957) 添加了对 Counter64 OID 的支持。 (#57)
* (McM1957) 现在将更详细地记录 snmp 通信返回的数据。
* (McM1957) 紧凑模式已启用。 (#20)
* (McM1957) 已知限制：当前仅支持 SNMP V1 和 SNMP V2c。
* (McM1957) 已知限制：OID 属性可写尚未实现。

### 2.0.1 (2022-07-22)
* (McM1957) 兼容模式标志的错误处理已得到纠正 (#135)
* (McM1957) 更正了无效 OID 的错误记录 (#134)

### 2.0.0 (2022-07-21)
* 重要提示：此版本将更改配置结构！

请在开始安装之前备份您的配置。
安装将尝试转换旧配置 - 但不保证在所有情况下都能成功。

* (McM1957) 代码的许多部分已被重写
* (McM1957) 适配器现在使用 admin5 接口
* (McM1957) 现在可以为每个设备设置不同的计时器值 (#105)
* (McM1957) 更改配置条目的顺序不再破坏数据 (#15)
* (McM1957) 现在可以命名设备的状态对象。旧行为可作为一个选项提供。
* (McM1957) 已知限制：当前仅支持 SNMP V1。
* (McM1957) 已知限制：OID 属性可选和可写尚未实现。

### 1.0.0 (2022-03-21)
* 重要提示：此版本将更改对象结构！
* (McM1957) info.connection 更新的延迟已减少
* (McM1957) 如果目标无法访问则过多的错误日志已被优化
* (McM1957) 在 ip 基础上添加了额外的在线对象，以指示目标可达
* (McM1957) 如果 OID 为一台设备指定不同的社区，则会输出警告
* (Apollon77) 添加了用于崩溃报告的哨兵

### 0.5.0
* (Marcolotti) 添加文档 (de,en,ru)
* (Marcolotti) 添加语言 (de,en,ru)

### 0.0.3
* (Apollon77) 修复对象类型

### 0.0.2
* (Bluefox) 修复

### 0.0.1
*（Bluefox）重构
* (Marcolotti) 初始版本

## Changelog

<!--

## License
The MIT License (MIT)

Copyright (c) 2017-2023 Marcolotti <info@ct-j.de>, McM1957 <mcm57@gmx.at>, ioBroker Community Developers 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.