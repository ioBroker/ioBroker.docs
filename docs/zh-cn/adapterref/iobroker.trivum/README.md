---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.trivum/README.md
title: ioBroker.trivum
hash: bD8IPCX1XoUvSvVSiOAA5siHu2+WKbLK/W1qbydFlgA=
---
![标识](../../../en/adapterref/iobroker.trivum/admin/trivum.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.trivum.svg)

# IoBroker.trivum
[![测试和发布](https://github.com/TheBam1990/ioBroker.trivum/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/TheBam1990/ioBroker.trivum/actions/workflows/test-and-release.yml)

通过 ioBroker 的本地 XML API 控制 trivum 多房间音频系统。

德语文档：[README.md](READMEde.md)

＃＃ 配置
输入 trivum MusicCenter 的 IPv4 地址。区域和控件将自动发现。轮询间隔和 HTTP 超时时间可配置；现有安装将保留历史配置键 `adresse` 和 `option3`。

`Number of paging presets` 从 ID 0 开始创建全局分页按钮。

## 州
全局控制：

- `Global.ALLOFF`：关闭所有区域
- `Global.Aktive_zonen`：trivum 报告的活动区域
- `Global.PagingN`: 开始分页预设 N

每个检测到的区域提供：

- `Muten`：静音/取消静音
- `DEFAULT_STREAMING`：启动默认流
- `ZONECMD_DEFAULT_TUNER`：启动默认调谐器
- `VOLUME`：读取或设置音量，范围从 0% 到 100%
- `ZONECMD_POWER_OFF`：关闭区域
- `状态`：当前区域状态

按钮状态在请求成功后自动重置。`info.connection` 仅在收到成功的 trivum 响应后变为真，而 `info.lastError` 存储最新的通信错误。

## Changelog

### 0.1.0

- Migrated to the current ioBroker adapter template and responsive JSON Config
- Added Node.js 22/24 and js-controller 6 compatibility
- Updated adapter-core, dependencies, linting, tests and release workflows
- Reworked zone discovery, polling, connection state and error handling
- Fixed zone commands to use discovered zone IDs
- Changed volume to a numeric percentage state and prevented overlapping polls

### 0.0.5

- Updated adapter core

## License

Copyright (c) 2021-2026 TheBam <elektrobam@gmx.de>

MIT License. See [LICENSE](LICENSE).