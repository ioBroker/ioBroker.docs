---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.omron-fins/README.md
title: ioBroker.omron-fins
hash: OjyP1GqjUWD7mDDJKf+u6ewRxj6jiOeqQhjzxM+7nzw=
---
![标识](../../../en/adapterref/iobroker.omron-fins/admin/omron-fins.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.omron-fins.svg)

# IoBroker.omron-fins
[![测试和发布](https://github.com/TheBam1990/ioBroker.omron-fins/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/TheBam1990/ioBroker.omron-fins/actions/workflows/test-and-release.yml)

使用 UDP 或 TCP 上的 FINS 协议将欧姆龙 CP、CV、CS、CJ、NJ 和兼容的 NX PLC 连接到 ioBroker。

德语文档：[README.md](READMEde.md)

＃＃ 配置
在响应式适配器管理页面中配置 PLC IP 地址、FINS 端口（通常为 `9600`）、协议和轮询间隔。除非 PLC 网络需要显式 FINS 路由，否则目标/源节点值可以保留为 `0` 以实现自动寻址。

变量可以手动输入，并具有唯一的名称、FINS 地址和数据类型。支持的示例包括 `CIO0.00`（或旧版 `CB0:00`）、`W31.00`、`H0.01`、`A0.00`、`D100`、定时器和计数器。

除非禁用写入选项，否则每个变量都会成为可写的 ioBroker 状态。只有在 FINS 请求成功后，写入操作才会得到确认。

## CX-Programmer 符号表导入
将 CX-Programmer 中的符号表导出为 CSV 或制表符分隔文本，并将其内容粘贴到相应的配置字段中。适配器可检测英文和德文的名称/地址/数据类型标头，并自动导入符号。支持逗号、分号和制表符分隔符。手动输入的变量会覆盖同名的导入符号。

## 故障排除
- 只有在 PLC 成功响应后，`info.connection` 才为真。
- `info.lastError` 包含最近的通信或配置错误。
- 检查 UDP/TCP 端口 9600 和 PLC FINS/ETN 设置。
- 如果自动节点寻址失败，请显式配置 DA1 和 SA1。

## Changelog

### 0.1.0

- Updated for Node.js 22/24, js-controller 6 and current adapter-core
- Replaced the legacy administration page with responsive JSON Config
- Added UDP/TCP, timeout and FINS node settings
- Added automatic CX-Programmer CSV/TSV symbol table import
- Prevented overlapping polls and added reliable connection/error handling
- Updated tests, linting, release and Dependabot workflows

### 0.0.2

- Improved cyclic polling

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

Copyright (c) 2021-2026 TheBam <elektrobam@gmx.de>

MIT License. See [LICENSE](LICENSE).