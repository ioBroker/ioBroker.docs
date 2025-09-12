---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.pi-hole2/README.md
title: ioBroker.pi-hole2
hash: dC/XCoMH5f/nSE0e0yLWYEOwmiduSLjsIHPM0wcq25Q=
---
# IoBroker.pi-hole2
![标识](../../../en/adapterref/iobroker.pi-hole2/admin/pi-hole2.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.pi-hole2.svg)
![下载](https://img.shields.io/npm/dm/iobroker.pi-hole2.svg)
![安装数量](https://iobroker.live/badges/pi-hole2-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/pi-hole2-stable.svg)
![GitHub 上的 nycrc 配置](https://img.shields.io/nycrc/oweitman/iobroker.pi-hole2?preferredThreshold=functions)
![新公共管理](https://nodei.co/npm/iobroker.pi-hole2.png?downloads=true)

**测试：**![测试和发布](https://github.com/oweitman/ioBroker.pi-hole2/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 pi-hole2 适配器
管理 pi-hole 安装（版本 6 及以上）。
从 pi-hole 获取信息。
启动/停止域名拦截。
（对于 pi-hole 版本 6 及以下的版本，请使用适配器 ioBroker.pi-hole）

使用风险自负！绝对不保证任何损害赔偿等！

欢迎提供帮助或提示。

该适配器根据 Michael Schuster <development@unltd-networx.de> 的想法为 pi-hole V6 重写。

步骤
1.安装适配器

2. 填写适配器管理员的字段。pi-hole 设备的 URL、密码，以及 pi-hole 值更新间隔（iobroker 中的更新统计数据）是必填项。所有刷新字段的输入间隔应介于 1 秒到 86400 秒（24 小时）之间。

## 函数
### 启用/禁用阻止
要启用/禁用阻塞，请使用数据点阻塞中的开关。阻塞时间仅用于禁用阻塞后自动重新启用阻塞。启用阻塞会立即生效。

### 详细信息摘要
Summary 中的部分数据会被提取到 Data.Summary 中的数据点中。
此功能可在配置中启用/禁用。
启用/禁用此功能后，数据点会以绿色/红色突出显示。

### 详细信息 版本
Version 中的部分数据会被提取到 Data.Version 中的数据点中。
此功能可在配置中启用/禁用。
启用/禁用该功能后，数据点会以绿色/红色突出显示。

### 通用 SendTo 函数
sendTo 函数用于向 pi-hole 设备发送命令。
您可以在本地计算机上尝试该 API。
前往 [http://pihole/api/docs/#](http://pihole/api/docs/#)，输入您的密码，然后点击“登录”按钮。
如果域名 `pihole` 无法使用，请在仪表盘页面右上角检查您的 pi-hole 实例的主机名。

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

如果您想使用时间戳作为参数，请注意 pi-hole 使用 UNIX 时间戳。
这些时间戳计算自 1970 年 1 月 1 日以来的秒数。JavaScript 时间戳可以除以 1000：

```javascript
new Date('2025-02-01#12:34:56').getTime() / 1000;
```

## 可视化
### Vis 和 vis2 的带小部件 jsontemplate 的版本
可以通过以下文档安装 jsontemplate 小部件：<https://forum.iobroker.net/topic/31521/test-widget-json-template>

在小部件配置中输入以下数据点：

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

### 使用 jsontemplate 小部件对 vis 和 vis2 进行总结
可以通过以下文档安装 jsontemplate 小部件：<https://forum.iobroker.net/topic/31521/test-widget-json-template>

在小部件配置中输入以下数据点：

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

## Todo 现有函数
- ~~登录~~
- ~~间隔时间~~
- ~~激活/取消阻止~~
- ~~激活/停用时间间隔~~
- ~~版本~~
- ~~版本~~
- ~~总结~~
- 类型
- summaryRaw ？不知道详情
- topItems？不知道详情
- getQuerySources？不知道详情
- overTimeData10分钟？不知道详情
- getForwardDestinations？不知道详情

## Todo 新功能
- ~~sendTo 函数用于控制和获取带有参数的信息~~

## 未实现或计划的功能
- 双重身份验证
- https 协议（可能但未经测试）

故障排除
### 警告：没有可用的免费 API 席位
前往你的 pi-hole 安装目录，在“设置/Web 界面/API/当前活动会话”中删除所有带有用户代理 iobroker.pi-hole2 的会话。
你重启适配器的次数过高，而且每次都会请求新的会话。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

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

## License

MIT License

Copyright (c) 2025 oweitman <oweitman@gmx.de>

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