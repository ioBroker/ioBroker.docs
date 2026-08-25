---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sky-remote/README.md
title: ioBroker.sky-remote
hash: oDXg6KDrVpxnCmhIgYXWBDBr1bkDe3tLG7TveGy4OZE=
---
# IoBroker.sky-remote
![标识](../../../en/adapterref/iobroker.sky-remote/admin/sky-remote.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.sky-remote.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sky-remote.svg)
![安装数量](https://iobroker.live/badges/sky-remote-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/sky-remote-stable.svg)

**测试：** ![测试与发布](https://github.com/AlanSRU/ioBroker.sky-remote/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的 Sky Remote Adapter
通过网络命令控制 Sky Q 机顶盒

这款适配器允许您通过网络向 Sky Q 机顶盒发送遥控指令。它提供所有遥控按钮的状态信息，并允许您发送指令序列。

[Sky Q（https://www.sky.com/tv/boxes）是 Sky 公司推出的一款机顶盒。](https://www.sky.com/).

## 先决条件
- ioBroker 安装
- 已连接到您网络的 Sky Q 机顶盒
- 您的 Sky Q 机顶盒的 IP 地址

＃＃ 安装
1. 通过 ioBroker 管理后台安装适配器
2. 在适配器设置中配置 Sky Q 机顶盒的 IP 地址
3. 启动适配器

＃＃ 配置
在适配器设置中，您需要配置：

- 您的 Sky Q 机顶盒的 IP 地址或主机名
- 端口（通常 Sky Q 机顶盒的端口为 49160）
- 连接检查频率（毫秒）- 适配器检查 Sky 机顶盒是否在线的频率

### 连接监控
适配器会定期检查与 Sky Q 机顶盒的连接，并更新 `sky-remote.X.info.connection` 状态。此状态显示适配器是否可以成功连接到 Sky Q 机顶盒：

- `true`: Sky Q 机顶盒已上线且可访问
- `false`: Sky Q 机顶盒离线或无法连接

您可以将此状态用于可视化或脚本中，以监控 Sky Q 机顶盒的状态。

### 按钮行为
该适配器提供可作为瞬时按钮使用的按钮。这些按钮是只写式的，不携带任何可读值，因此按钮的触发完全是通过向其写入 `true` 来实现的：

1. 你将 `true` 写入 `buttons.*` 状态
2. 该指令被发送到 Sky Q 机顶盒

即使状态已经是 `true`，再次写入 `true` 也总是会重新触发该命令。这允许您连续多次按下同一个按钮，这对于输入频道号至关重要（例如，按 1、0、2 表示频道 102）。

＃＃ 用法
### 各州
适配器创建以下状态：

- `sky-remote.X.buttons.*` - 每个遥控器按钮的状态（例如，`sky-remote.0.buttons.power`、`sky-remote.0.buttons.play`）
- `sky-remote.X.sendSequence` - 发送以逗号分隔的命令序列

### 示例
- 要按下电源按钮：将 `sky-remote.0.buttons.power` 设置为 `true`
- 要导航到某个频道：将 `sky-remote.0.sendSequence` 设置为 `"1,0,6"`（对应频道 106）
- 要打开电视节目指南并进行导航：将 `sky-remote.0.sendSequence` 设置为 `"tvguide,right,right,select"`

### 可用命令
| 命令 | 描述 |
|---------|-------------|
| 电源 | 电源按钮 |
| 选择 | 选择/确定按钮 |
| 备份 | 返回按钮 |
| channelup | 频道向上 |
| 频道故障 | 频道故障 |
| 交互式 | 交互式按钮 |
| 帮助 | 帮助按钮 |
| 服务 | 服务按钮 |
| 电视指南 / 主页 | 电视指南/主页按钮 |
| i | 信息按钮 |
| 文本 | 文本按钮 |
| 向上 | 向上箭头 |
| 向下 | 向下箭头 |
| 左 | 左箭头 |
| 右 | 右箭头 |
| 红色 | 红色按钮 |
| 绿色 | 绿色按钮 |
| 黄色 | 黄色按钮 |
| 蓝色 | 蓝色按钮 |
| 0-9 | 数字按钮 |
| 播放 | 播放 |
| 暂停 | 暂停 |
| 停止 | 停止 |
| 记录 | 记录 |
| 快进 | 快进 |
| 倒带 | 倒带 |
| 票房 | 票房按钮 |
| 天空 | 天空按钮 |

以下别名也可在 `sendSequence` 中接受（它们映射到与上面的按钮相同的命令，因此不会创建单独的按钮状态）：`dismiss`（= 备份），`sidebar`（= 交互式），`search`（= 服务）。

## 与 Blockly 集成
您可以使用ioBroker中的Blockly可视化编程界面来创建命令序列：

1. 创建一个新的 Blockly 脚本
2. 使用“set state”代码块设置`sendSequence`状态
3. 添加以逗号分隔的命令序列

## 与 JavaScript 集成
发送一系列命令的示例：

```javascript
// Press Guide, then right, then select
setState('sky-remote.0.sendSequence', 'tvguide,right,select');

// Turn on the TV and navigate to channel 101
setState('sky-remote.0.sendSequence', 'power,1,0,1');
```

## 故障排除
- 请确保您的 Sky Q 机顶盒已开机并连接到您的网络
- 请确认您的 Sky Q 机顶盒的 IP 地址是否正确
- 检查端口 49160 是否已打开且可访问。
- 检查适配器日志，查看是否存在任何连接错误

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.0.6 (2026-08-19)
- (Alan Paris) Button states are now write-only (`read: false`) as required for the `button` role; existing installations are migrated on start
- (Alan Paris) Fixed info.connection latching at a stale value after a failed or successful command; all writers now share one code path
- (Alan Paris) An unknown command name in sendSequence no longer marks a reachable box as offline
- (Alan Paris) Stop writing states and drop the in-flight connection check when the instance is unloaded
- (Alan Paris) Stopped shadowing the adapter base class `host` property, which misrouted js-controller crash notifications
- (Alan Paris) A command now fails with an error instead of hanging silently when the Sky box closes the connection mid-command
- (Alan Paris) Corrected the German, Dutch and Chinese admin translations of "Port", which used the harbour sense of the word

### 1.0.5 (2026-07-05)
- (Alan Paris) Reset own button states via setState instead of setForeignState
- (Alan Paris) Validate and clamp the port and connection-check-frequency config in code (not only in the admin UI)
- (Alan Paris) Add a default value to the sendSequence state and more descriptive button names
- (Alan Paris) Document the sendSequence command aliases and add a Sky product link to the README

### 1.0.4 (2026-07-04)
- (Alan Paris) Removed the abandoned `sky-remote` third-party dependency; the Sky Q / Sky+HD control protocol is now built in and modernized (node:net, Buffer.from, promise-based, no deprecated APIs)

### 1.0.3 (2026-07-04)
- (Alan Paris) Verify automated release publishing via GitHub Actions trusted publishing (no functional changes)

### 1.0.2 (2026-07-04)
- (Alan Paris) Modernized adapter for community submission: jsonConfig admin UI, updated dependencies, CI/release tooling

### 1.0.0 (2025-05-05)
- (Alan Paris) Initial release

## License

MIT License

Copyright (c) 2026 Alan Paris <alan.paris@scottish.rugby>

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