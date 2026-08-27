---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.pi-hole2/README.md
title: ioBroker.pi-hole2
hash: HwWYE6ADMhcIgO1IwXByzAU2KYvRt4ReBuACjCGlhbY=
---
# IoBroker.pi-hole2
![标识](../../../en/adapterref/iobroker.pi-hole2/admin/pi-hole2.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.pi-hole2.svg)
![下载](https://img.shields.io/npm/dm/iobroker.pi-hole2.svg)
![安装数量](https://iobroker.live/badges/pi-hole2-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/pi-hole2-stable.svg)
![GitHub 上的 nycrc 配置](https://img.shields.io/nycrc/oweitman/iobroker.pi-hole2?preferredThreshold=functions)
![NPM](https://nodei.co/npm/iobroker.pi-hole2.png?downloads=true)

**测试：** ![测试与发布](https://github.com/oweitman/ioBroker.pi-hole2/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的 pi-hole2 适配器
管理 Pi-hole v6 及更高版本。

获取 Pi-hole 信息。

启动/停止阻止域名。

（对于低于 v6 的 Pi-hole 版本，请使用适配器 ioBroker.pi-hole）

使用风险自负！！！对任何损坏等情况概不负责！！！

欢迎提供帮助或建议。

该适配器是根据 Michael Schuster <development@unltd-networx.de> 的想法，为 pi-hole V6 重新编写的。

步骤
1. 安装适配器

2. 填写 adapter-admin 的字段。包括 Pi-hole 设备的 URL、密码，以及 Pi-hole 值更新的间隔（在 iobroker 中更新统计信息）。所有刷新字段的输入值只能介于 1 秒到 86400 秒（24 小时）之间。

## 函数
### 启用/禁用阻止功能
要启用/禁用数据阻塞，请使用“数据点阻塞”中的开关。阻塞时间仅用于禁用阻塞后自动重新启用阻塞。启用阻塞会立即生效。

### 详细信息摘要
摘要中的部分数据会被提取到 Data.Summary 的数据点中。

此功能可在配置中启用/禁用。

启用/禁用此功能后，数据点会以绿色/红色高亮显示。

### 详细信息 版本
版本表中的部分数据会被提取到 Data.Version 表的数据点中。

此功能可在配置中启用/禁用。

启用/禁用此功能后，数据点会以绿色/红色高亮显示。

### 每位客户的当前域名数量
可选的客户端域统计信息会读取当前本地日历日的 Pi-hole 查询日志。默认情况下，统计信息每小时刷新一次。为了降低 Pi-hole 的负载，客户端请求会被分散到此刷新间隔的 10% 内。该百分比可在 0 到 90% 之间配置。适配器会根据当前客户端数量计算每个客户端的暂停时间，因此所有暂停时间的总和永远不会超过刷新间隔。

对于每个已命名的 Pi-hole 客户端，适配器都会创建两个 JSON 状态：

```text
pi-hole2.0.Clients.<clientName>.permitted
pi-hole2.0.Clients.<clientName>.blocked
pi-hole2.0.Clients.<clientName>.QueriesTotal
pi-hole2.0.Clients.<clientName>.QueriesBlocked
```

每个值都是一个 JSON 数组，例如 `[{"domain":"example.org","count":12}]`。每个域名在每个数组中仅出现一次，并且条目按计数降序排列。ioBroker 对象 ID 中不安全的字符（包括 `.` 和 `#`）将被替换为 `_`。如果两个客户端名称导致相同的 ID，则使用数字后缀来区分它们的状态。

`QueriesTotal` 包含为该客户端读取的所有查询的绝对数量，而 `QueriesBlocked` 包含被阻塞的查询的绝对数量。这些名称遵循与详细摘要数据点相同的约定。

Pi-hole 会根据查询返回的客户端信息，将客户端名称与其 IP 地址进行匹配。如果客户端拥有主机名，则其 ioBroker 对象 ID 会保留经过脱敏处理的主机名；而通道对象的显示名称则包含其 IP 地址。如果 Pi-hole 仅报告 IP 地址，则对象 ID 和显示名称均会使用经过脱敏处理的 IP 地址。

Pi-hole 的隐私级别和 Pi-hole `excludeClients`/`excludeDomains` 设置也适用于此数据。适配器仅读取查询日志；它不会修改允许列表或拒绝列表。

可选的非活动客户端清理操作会在每个本地时间 00:05 之后运行一次。它仅当客户端通道对象自上一个本地日历日开始以来未更新，且其状态为 `QueriesTotal` 且为 `0` 时，才会递归删除该客户端通道。这意味着在前一天没有发生任何写入操作。未来的时间戳不被视为活动。只有在找到至少一个针对当天的查询后，才会创建新的客户端通道。

### 通用 SendTo 函数
sendTo 函数用于向 Pi-hole 设备发送命令。

您可以在本地计算机上尝试使用 API。

访问 [http://pihole/api/docs/#](http://pihole/api/docs/#)，输入您的密码，然后点击“登录”按钮。

如果域名 `pihole` 无法访问，请检查 Pi-hole 实例的主机名，该主机名位于控制面板页面的右上角。

＃＃＃＃ 例子
```javascript
sendTo(
    'pi-hole2.0',
    'piholeapi',
    {
        method: 'GET',
        endpoint: '/history/clients',
        params: {
            N: 20,
        },
    },
    function (data) {
        console.log(data);
    },
);
```

如果您想使用时间戳作为参数，请注意 Pi-hole 使用的是 UNIX 时间戳。

这些时间戳计算的是自 1970 年 1 月 1 日以来的秒数。JavaScript 时间戳可以除以 1000：

```javascript
new Date('2025-02-01#12:34:56').getTime() / 1000;
```

## 可视化
### 适用于 vis 和 vis2 的 widget jsontemplate 版本
可以通过以下文档安装 jsontemplate 小部件：<https://forum.iobroker.net/topic/31521/test-widget-json-template>

在组件配置中输入以下数据点：

```javascript
pi-hole2.0.Version
```

以及以下模板：

```ejs
<style>
    p.pihole {
        margin: 0px;
    }
    p.pihole .name {
        display: inline-block;
        width: 100px;
    }
    p.pihole .version {
        display: inline-block;
        width: 50px;
    }
</style>
<p class="pihole"><span class="pihole name">core.local:</span><span class="pihole version"><%- data.version.core.local.version %></span></p>
<p class="pihole"><span class="pihole name">core.remote:</span><span class="pihole version"><%- data.version.core.remote.version %></span></p>
<p class="pihole"><span class="pihole name">web.local:</span><span class="pihole version"><%- data.version.web.local.version %></span></p>
<p class="pihole"><span class="pihole name">web.remote:</span><span class="pihole version"><%- data.version.web.remote.version %></span></p>
<p class="pihole"><span  class="pihole name">ftl.local:</span><span class="pihole version"><%- data.version.ftl.local.version %></span></p>
<p class="pihole"><span class="pihole name">ftl.remote:</span><span class="pihole version"><%- data.version.ftl.remote.version %></span></p>

```

### Vis 和 vis2 的组件 jsontemplate 的摘要
可以通过以下文档安装 jsontemplate 小部件：<https://forum.iobroker.net/topic/31521/test-widget-json-template>

在组件配置中输入以下数据点：

```javascript
pi-hole2.0.Summary
```

以及以下模板：

```ejs
<style>
    p.pihole {
        margin: 0px;
    }
    p.pihole .name {
        display: inline-block;
        width: 150px;
    }
    p.pihole .number {
        display: inline-block;
        width: 70px;
        text-align: right;
    }
</style>
<p class="pihole"><span class="pihole name">queries.total:</span><span class="pihole number"><%- data.queries.total %></span></p>
<p class="pihole"><span class="pihole name">queries.blocked:</span><span class="pihole number"><%- data.queries.blocked %></span></p>
<p class="pihole"><span class="pihole name">clients.active:</span><span class="pihole number"><%- data.clients.active %></span></p>
<p class="pihole"><span class="pihole name">clients.total:</span><span class="pihole number"><%- data.clients.total %></span></p>

```

## 待办事项：现有函数
登录
- ~~间隔时间~~
- ~~激活/取消激活阻塞~~
- ~~激活/停用时间间隔~~
- ~~版本~~
- ~~版本~~
总结
- 类型
- summaryRaw？不了解详情
- 热门商品？详情不详
- 获取查询源？不了解详情
- overTimeData10分钟？不知道详情
- 获取转发目的地？不知道详情

## 待办事项 新功能
- ~~sendTo 函数，用于控制和获取带参数的信息~~

## 未实现或未计划的功能
- 双因素身份验证
- https 协议（可行但未经测试）

## 故障排除
### 警告：API 席位已满
请前往您的 Pi-hole 安装目录，在“设置/Web界面/API/当前活动会话”中，删除所有用户代理为 iobroker.pi-hole2 的会话。

您重启适配器的次数过多，每次请求新会话时都会重启适配器。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.5.0 (2026-08-23)

- Optional cleanup of clients if no update took place the previous day and QueriesTotal is 0.
- Unnamed clients with IP addresses have been added. Only clients that have performed at least one DNS query
  during the day are added.

### 1.4.2 (2026-08-22)

- fix pihole session handling

### 1.4.1 (2026-08-21)

- An issue with the Pi-hole API prevented all data from being retrieved; this has been fixed.

### 1.4.0 (2026-08-21)

- Added QueriesTotal and QueriesBlocked as counts per client.
- move coverage dir to docs/coverage.
- fix setTimeout and setObject

### 1.3.0 (2026-08-20)

- Added configurable per-client daily domain statistics for permitted and blocked queries, including safe request distribution and JSON datapoints
  sorted by query count.

### 1.2.0 (2026-06-10)

- fix errors
- add test and coverage
- improve and harden error handling

### 1.1.1 (2025-07-25)

- fix translation

### 1.1.0 (2025-07-24)

- add update indicators for different pihole components in the Data/Versions datapoints

### 1.0.0 (2025-07-16)

- If the adapter was already installed, please remove all existing data points of the adapter and restart the adapter.
- first beta channel release

### 0.4.2 (2025-07-16)

- set rejectUnauthorized to false
- remove some double jsdoc blocks
- fixed comments from adapter review

    remove unload event, create datapoint "Data", adjust state roles, check and limit refresh input parameters, fix roles

### 0.4.1 (2025-06-27)

- fix repochecker issues
- update packages
- remove history datapoint
- add jsdoc
- fix Blockingtime enabling
- fix datapoint coloring

### 0.4.0 (2025-06-25)

- Make extraction of detail values ​​for version/summary deactivatable

### 0.3.0 (2025-06-25)

- add translation files
- rework refresh logic aligned with pihole
- encrypt password (Password must be entered again )
- add detailed datapoints for Summary and Version for selected data

### 0.2.3 (2025-06-25)

- small documentation bugfix
- adjust user agent and add trouble shooting info
- add visualization example for versions
- add visualization example for summary

### 0.2.2 (2025-06-24)

- fix github action file

### 0.2.1 (2025-06-24)

- enable NPM deploy

### 0.2.0 (2025-06-24)

- (oweitman) first npm release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 oweitman <oweitman@gmx.de>

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