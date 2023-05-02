---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.e3dc-rscp/README.md
title: ioBroker.e3dc-rscp
hash: ocVtS7dEWuePymh8vavUv1i27b1pL+NS9aMBWtdbCjQ=
---
![标识](../../../en/adapterref/iobroker.e3dc-rscp/admin/e3dc-rscp.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.e3dc-rscp.svg)
![下载](https://img.shields.io/npm/dm/iobroker.e3dc-rscp.svg)
![安装数量（最新）](http://iobroker.live/badges/e3dc-rscp-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/e3dc-rscp-stable.svg)
![已知漏洞](https://snyk.io/test/github/git-kick/ioBroker.e3dc-rscp/badge.svg)
![捐](https://img.shields.io/badge/Donate-PayPal-blue.svg)
![NPM](https://nodei.co/npm/iobroker.e3dc-rscp.png?downloads=true)

# IoBroker.e3dc-rscp
**测试：** ![测试和发布](https://github.com/git-kick/ioBroker.e3dc-rscp/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 e3dc-rscp 适配器
使用专有的 RSCP 协议控制您的 E3/DC 电站，该协议允许读取状态值并设置控制参数，例如充电功率限制。这是 RSCP 与标准 Modbus 相比的优势，后者仅用于读取值。如果您不需要写入值，请查看（更简单的）[Modbus适配器](https://github.com/ioBroker/ioBroker.modbus)。

e3dc-rscp 适配器是为<a href="https://www.e3dc.com/produkte/s10/">E3/DC S10</a>设备开发的。人们可能会假设其他 E3/DC 设备提供等效的 RSCP 接口，但我们已经看到了例外情况。例如，一些电池模型显然没有被 E3/DC 完全集成，因此不会通过 RSCP 传播所有值。在这种情况下，适配器只传递通过 RSCP 传入的内容，有时是零值，有时是错误代码。

＃＃ 表中的内容
1. [适配器配置](#toc)
1. [接口消息的覆盖率](#cov)
1. [问题和功能请求](#iss)
1. [示例脚本](#sam)
1. [更新日志](#log)
1. [许可证](#lic)

<a name="toc"></a>

## 适配器配置 以下是创建适配器的新实例时要配置的内容。设置在选项卡中进行组织。
### 选项卡“选项”<table><tr><th>输入栏</th><th>意义</th></tr><tr><td>E3/DC 门户用户名</td><td>您在<a href="https://s10.e3dc.com/s10/">E3/DC 门户网站</a>上的用户名。在授予 RSCP 访问权限之前，E3/DC 会在那里检查您的凭据。</td></tr><tr><td> E3/DC 门户密码</td><td>您在<a href="https://s10.e3dc.com/s10/">E3/DC 门户网站</a>上的用户名。</td></tr><tr><td> E3/直流IP地址</td><td>本地网络中的地址，例如 192.168.178.107<br> <code>ioBroker.discovery</code> （自 2.8.0 起）能够使用 uPnP 检测 E3/DC 设备。<br>您还可以在 E3/DC 屏幕上查看 IP，它被称为“System-IP”：<br><img src="admin/e3dc-system-ip.png" width="600"></td></tr><tr><td> E3/直流端口</td><td>E3/DC 的 RSCP 端口，通常为 5033<br>注意：这与 Modbus 端口不同。</td></tr><tr><td>密码</td><td>RSCP 密码，在您的 E3/DC 站本地输入：<br><img src="admin/e3dc-rscp-password.png" width="600"></td></tr><td> SET_POWER 重发间隔[s]</td><td>定义 ioBroker 从 E3/DC 请求状态更新的频率。实验表明，当这个间隔超过 10 秒时，SET_POWER 可能会振荡，尽管 E3/DC 官方标签列表中的评论说每 30 秒设置一次就足够了。如果设置为 0（零），则不会发生重新发送，即您必须从外部触发重新发送，否则 E3/DC 将在 ca 后恢复正常。 10 秒。</td></tr><tr><td>元组发送延迟[s]</td><td>定义 ioBroker 在将空闲期或数据历史更改写入 E3/DC 之前将等待多长时间。目的是将多个后续更改合并到一个调用中。在一个空闲周期或一个数据历史范围内的值的每次更改时分别设置/重置专用超时；更改仅在超时结束后传输。这适用于 EMS.IDLE_PERIODS_* 和 DB.HISTORY_DATA_*</td></tr><tr><td>每个 E3/DC 命名空间的复选框</td><td>只会为选中的命名空间请求数据。</td></tr></table>
### 选项卡“轮询间隔”
<table><tr><th>输入栏</th><th>意义</th></tr><tr><td>轮询间隔短 [s]</td><td>定义 ioBroker 从 E3/DC 请求大多数动态变量的状态更新的频率。</td></tr><tr><td>轮询间隔中 [m]</td><td>定义 ioBroker 在常规情况下向 E3/DC 请求状态更新的频率。</td></tr><tr><td>轮询间隔长 [h]</td><td>定义 ioBroker 从 E3/DC 请求状态更新的频率，以获取很少或从未修改过的变量。</td></tr><tr><td>请求标签表</td><td>将单个请求标签分配给 S/M/L/N 轮询间隔。 N代表“从不”。<br>请注意，对象树中的状态与轮询间隔列表中的项目之间没有 1:1 的映射。原因多种多样：有时响应为空（对于 EMS_REQ_STORED_ERRORS 通常为真），那么对象树中不会出现任何状态。有时我们为“getter”和“setter”选择一个通用名称（例如，EMS_USER_CHARGE_LIMIT 响应被写入 EMS_MAX_CHARGE_POWER 状态）。此外，E3/DC 的响应可能包含多个标签（例如，BAT_REQ_INFO 请求将传送 BAT_RSOC、BAT_MODULE_VOLTAGE、BAT_CURRENT 等）。</td></tr></table><a name="toc"></a>

### 适配器配置重用
您可以使用实例设置中内置的“保存”/“加载”按钮将适配器设置保存在 json 文件中并从那里加载它，例如在您完成全新的 ioBroker 安装之后。

但是：在某些情况下，重用适配器配置会导致意外行为。在新适配器版本引入新参数的情况下，例如轮询间隔列表中的新行，从旧的 json 文件重新加载设置将删除这些新参数。 **这就是为什么通常建议从空白设置开始并至少为每个新的主要 (X) 或次要 (Y) 版本 (X.Y.z) 重新输入它们的原因：**

1.删除e3dc-rscp实例
2.新建一个e3dc-rscp实例
3. 手动输入设置（不要*不*从 json 文件加载设置）

## 接口消息的覆盖
### 支持的 RSCP 命名空间
RSCP 协议将*Tags*（即状态或值）分组为*Namespaces*（即标签组）。<table><tr><th>命名空间</th><th>代表</th><th>适配器支持</th></tr><tr><td>RSCP</td><td> Remote-Storage-Control-Protocol（即协议级标签）</td><td>部分支持</td></tr><tr><td>特快专递</td><td>能源管理系统</td><td>部分支持</td></tr><tr><td>元伟</td><td>光伏逆变器</td><td>支持的</td></tr><tr><td>蝙蝠</td><td>电池</td><td>支持的</td></tr><tr><td>数据中心</td><td>电池DCDC</td><td>不支持（还）</td></tr><tr><td>下午</td><td>功率计</td><td>不支持（还）</td></tr><tr><td> D B</td><td>数据库</td><td>实验性的（见 README-dev.md）</td></tr><tr><td>飞行管理系统</td><td>（车队管理系统？）</td><td>没有定义标签</td></tr><tr><td>SRV</td><td>服务器在线/用户管理</td><td>不支持（还）</td></tr><tr><td>哈</td><td>家庭自动化</td><td>不支持（还）</td></tr><tr><td>信息</td><td>信息</td><td>部分支持（REQ 标签可以，SET 标签尚未实现）</td></tr><tr><td> EP</td><td>应急电源</td><td>支持的</td></tr><tr><td>系统</td><td>系统重启/启动</td><td>支持的</td></tr><tr><td>嗯</td><td>更新管理</td><td>不支持（还）</td></tr><tr><td>世界银行</td><td>壁箱</td><td>支持的</td></tr></table>

### 可写 RSCP 标签
<table><tr><th>命名空间</th><th>标签</th><th>类型</th><th>内容</th></tr><tr><td>特快专递</td><td>MAX_CHARGE_POWER</td><td>数字</td><td>[W] 中的充电限制 - 注意：除非 POWER_LIMITS_USED 为“true”，否则无效</td></tr><tr><td>特快专递</td><td>MAX_DISCHARGE_POWER</td><td>数字</td><td>[W] 中的放电限制 - 注意：除非 POWER_LIMITS_USED 为“true”，否则会产生影响</td></tr><tr><td>特快专递</td><td>DISCHARGE_START_POWER</td><td>数字</td><td>以 [W] 为单位的最小电池放电功率 - 注意：除非 POWER_LIMITS_USED 为“true”，否则无效</td></tr><tr><td>特快专递</td><td>POWERSAVE_ENABLED</td><td>布尔值</td><td>省电模式已启用</td></tr><tr><td>特快专递</td><td>POWERLIMITS_USED</td><td>布尔值</td><td>使用功率限制</td></tr><tr><td>特快专递</td><td>WEATHER_REGULATED_CHARGE_ENABLED</td><td>布尔值</td><td>启用天气调节充电</td></tr><tr><td>特快专递</td><td>SET_POWER_MODE</td><td>状态</td><td>充电方式；通常传播到 MODE</td></tr><tr><td>特快专递</td><td>SET_POWER_VALUE</td><td>数字</td><td>充电功率[W]；通常传播到 SET_POWER</td></tr><tr><td>特快专递 (1)</td><td> IDLE_PERIOD_ACTIVE</td><td>布尔值</td><td>（去）激活空闲时间（2）</td></tr><tr><td>特快专递 (1)</td><td>开始_HOUR</td><td>数字</td><td>闲置期开始时间 (2)</td></tr><tr><td>特快专递 (1)</td><td> START_MINUTE</td><td>数字</td><td>空闲期开始分钟 (2)</td></tr><tr><td>特快专递 (1)</td><td> END_HOUR</td><td>数字</td><td>闲置期结束时间 (2)</td></tr><tr><td>特快专递 (1)</td><td> END_MINUTE</td><td>数字</td><td>空闲期结束分钟 (2)</td></tr><tr><td>数据库 (3)</td><td> TIME_START</td><td>细绳</td><td>请求数据的时间范围的开始</td></tr><tr><td>数据库 (3)</td><td>时间跨度</td><td>细绳</td><td>请求数据的时间范围长度（秒）</td></tr><tr><td>数据库 (3)</td><td>时间间隔</td><td>细绳</td><td>数据点之间的间隔</td></tr><tr><td>系统</td><td>SYSTEM_REBOOT</td><td>数字</td><td>将值更改为 1 将重新启动 E3/DC 系统。</td></tr><tr><td>系统</td><td>重新启动_APPLICATION</td><td>布尔值</td><td>将值更改为 true 将重新启动 E3/DC 应用程序。</td></tr><tr><td>世界银行</td><td>EXTERN_DATA_SUN</td><td>布尔值</td><td>设置太阳模式或混合模式。</td></tr><tr><td>世界银行</td><td>外部数据网</td><td>数字</td><td>设置墙盒电网功率。</td></tr><tr><td>世界银行</td><td>EXTERN_DATA_ALL</td><td>数字</td><td>设置墙盒总功率。</td></tr><tr><td>世界银行</td><td>EXTERN_DATA_ALG</td><td>字节数组</td><td>设置 wallbox 模式，取消充电，2 型插头锁定，功率限制。</td></tr></table>

注 (1)：完整路径为 EMS.IDLE_PERIODS_(DIS)CHARGE。<day-of-week> - 例如“EMS.IDLE_PERIODS_CHARGE.00-星期一”。更改仅在最后一次更改后发送“tuple sendig delay”。

注意 (2)：请注意，所有 IDLE_PERIOD 标签仅在 SET_IDLE_PERIOD 延迟之后写入，如配置中所定义。在一个 IDLE_PERIOD 天内每次更改都会重新开始延迟。

注 (3)：完整路径为 DB.HISTORY_DATA_{DAY,WEEK,MONTH,YEAR} - 例如“DB.HISTORY_DATA_DAY”。更改仅在最后一次更改后发送“tuple sendig delay”。

对于 DB，尚不清楚是什么造成了尺度之间的差异（DAY/WEEK/MONTH/YEAR）。结果看起来很相似。假设是：

* 特定数据保留
* 具体数据分辨率
* 具体数据聚合

需要进一步调查。

请注意，RSCP 知道 600 多个标签（代表大约 300 个参数），因此我们认为读取所有标签没有意义。
因此，我们将根据即将到来的用例向适配器添加标签。

<a name="iss"></a>

## 问题和功能请求
对于问题和功能请求，您可以用英语或德语写信。

### 错误报告
打开[错误报告表](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/new?assignees=&labels=&template=bug_report.md&title=)，输入综合信息。
大多数情况下调试需要日志文件，因此请提供调试日志：

1.停止实例
2.删除日志
3. 将实例设置为日志模式“调试”（或者甚至是“愚蠢”，取决于问题的类型）
4. 启动实例并让它为 ca 运行。 1 分钟（或更长，如果你知道错误需要更多时间才能出现）
5.将日志存储在文件中
6. 将日志文件附加到问题（请不要使用内联日志；它太长了）

### 功能请求和一般问题
打开 [空白问题](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/new)，并描述您希望适配器做什么以及为什么。
请记住：

* 适配器用于触发 RSCP 并在 ioBroker 的对象树中提供结果，仅此而已。进一步的处理或存储留给其他代码。
* **要搜索当前不支持的 RSCP 命名空间和标签，请参考 [示例应用程序](http://s10.e3dc.com/dokumentation/RscpExample.zip) 提供的官方 E3/DC 标签列表**。
* 未在 RSCP 标签列表中列出或以其他方式显示已交付的所有物品均被视为“超出范围”。

<a name="sam"></a>

## 示例脚本这是一个用于充电限制控制的示例脚本 - 它并不意味着按原样使用，只是为了演示如何使用 E3/DC 值。
// 触发器：达到降额功率，即电网功率将被限制 // 操作：将电池充电功率限制重置为最大值，如 SYS_SPECS on( { id: &#39;e3dc-rscp.0.EMS.POWER_GRID&#39;, valLe : -getState(&#39;e3dc-rscp.0.EMS.DERATE_AT_POWER_VALUE&#39;).val, change: &#39;lt&#39;, logic: &#39;and&#39; }, (obj) =&gt; { console.log(&#39;触发器：电网电源位于降低阈值 - 重置充电功率限制&#39;); setState(&#39;e3dc-rscp.0.EMS.MAX_CHARGE_POWER&#39;, getState(&#39;e3dc-rscp.0.EMS.SYS_SPECS.maxBatChargePower&#39;).val ); });<a name="log"></a>

## Changelog
### 1.2.1

__MODIFIED ADAPTER SETTINGS - do not re-use settings stored in *.json__

(git-kick)
* Added INFO namespace REQ tags (no SET tags yet) - [Issue #149](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/149)
* Fixed representation of EMS.EPTEST_NEXT_TESTSTART in object tree.
* Fixed out of range exceptions upon TCP/IP noise (i.e., if a frame has inconsistent length, then stop processing it.)
* Added two README.md sections: "Reuse of adapter configuration", "Issues and feature requests"

### 1.2.0 - DEPRECATED - DO NOT INSTALL -

### 1.1.2
(ka-vaNu)
* WB Control.* no longer updated by rscp response - [PR #144](https://github.com/git-kick/ioBroker.e3dc-rscp/pull/144)

(git-kick)
* Avoid cleartext password in silly log.

## Changelog
### 1.1.1
(ka-vaNu)
* Fixed typo which prevented creation of wallbox object - [Issue #139](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/139)

(git-kick)
* Fixed vulnerable dependency: glob-parent < 5.1.2 - [CVE-2020-28469](https://nvd.nist.gov/vuln/detail/CVE-2022-28469)
### 1.1.0
(ka-vaNu)
* Added support for wallboxes, including setter tags - [Issue #106](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/106)

(helper0815)
* Added value "N" for polling intervals, meaning "never" - [Issue #126](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/126)

(git-kick)
* Fixed vulnerable dependency: minimatch < 3.0.5 - [CVE-2022-3517](https://nvd.nist.gov/vuln/detail/CVE-2022-3517)
* Fixed vulnerable dependency: decode-uri-component < 0.2.1 - [CVE-2022-38900](https://nvd.nist.gov/vuln/detail/CVE-2022-38900)
### 1.0.8
(git-kick)
* No updates for e3dc-rscp.0.EP.PARAM_0.* - [Issue #117](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/117)
* Vulnerable dependency: glob-parent < 5.1.2 - [CVE-2020-28469](https://nvd.nist.gov/vuln/detail/CVE-2020-28469)
* Define info.connection and RSCP.AUTHENTICATION synchronously (to avoid warning in adapter log)

__Note__: DO NOT import adapter settings from a json-file created with an older version of e3dc-rscp. Instead, create a new adapter configuration from the scratch and then store it to a json-file. Reason is that importing an older json-file will delete polling interval list entries which have been added with v1.0.8 and this will invalidate the bugfix!
### 1.0.7
(git-kick)
* High CPU load on js-controller after triggering historical data - [Issue #114](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/114)
### 1.0.6
(git-kick)
* Boolean switches (e.g. EMS.WEATHER_REGULATED_CHARGE_ENABLED) did not work properly - [Issue #109](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/103)
* Fixed vulnerable dependency: minimist < 1.2.6 - [CVE-2021-44906](https://nvd.nist.gov/vuln/detail/CVE-2021-44906)
### 1.0.5
(git-kick)
* SET_POWER not effective due to delayed transmission - [Issue #103](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/103)
### 1.0.4
(git-kick)
* BAT_1 not visible after update to v1.0.3 - [Issue #96](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/96)
* Save button inactive after loading adapter configuration - [Issue #95](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/95)
### 1.0.3
(git-kick)
* Reconnect does not work after RESTART_APPLICATION - [Issue #74](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/74)
* Query of battery data does not work - [Issue #85](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/85)
* DCB_CELL_TEMPERATURE = 0 obviously means there is no value, so display "(null)" instead of "0 °C"
* Uncaught out-of-range exception when entering invalid data - [Issue #88](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/88)
* Emergency Power Level - [Issue #89](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/89)
### 1.0.2
(git-kick)
* SYS namespace, experimental support - [Issue #60](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/60)
* info.connection is true while no connection - [Issue #64](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/64)
* Compatibility check to js-controller 4.0 - [Issue #75](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/75)
* WB.PM_ACTIVE_PHASES decode values - [Issue #76](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/76)
* WB.MODE decode value 8 - [Issue #77](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/77)
* Dependabot: follow-redirects 1.14.8
### 1.0.1
(git-kick)
* [CVE-2021-23566](https://nvd.nist.gov/vuln/detail/CVE-2021-23566): require nanoid >=3.1.31 - [Issue #61](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/61)
* [CVE-2020-28469](https://nvd.nist.gov/vuln/detail/CVE-2020-28469): require glob-parent >=5.1.2
* [Sentry Event](https://sentry.io/organizations/ulrich-kick/issues/2812710513/events/0c4653a38cd24b6a8732a10d07370e06/): Type Error in sendNextFrame(), handling case this == null
### 1.0.0
(git-kick)
* Prerequisites for ioBroker repo in README.md, io-package.json, github
* CVE-2022-0155: require follow-redirects 1.14.7
* Best Practices: create info.connection state
* Best practices: set roles for all inner nodes in object tree
* Bugfix: EMS.POWER_PV was never updated due to missing line in polling intervals table
* Adapter review (PR#1589): removed tab stuff (tab_m.html)
* Adapter review (PR#1589): onUnload(), clear _all_ timers and close TCP connection
* Remove Sentry, because it was only a trial and not properly configured
### 0.0.17-beta
(git-kick)
* DB namespace - experimental implementation
* Timestamps are now aligned to ioBroker format: "2022-01-30 12:00:00.000" - using local timezone (not UTC)
* EMS.STATUS bitmap is now decoded into EMS.STATUS_[0..9] - thanks to @ArnoD for providing E3/DC specs
### 0.0.16-beta
(git-kick)
* Bugfix: Wallbox count (WB_CONNECTED_DEVICES) was not handled correctly.
* Bugfix: name for 3 SET_POWER objects is now displayed.
* Bugfix: removed needless vertical scrollbar from configuration page (index_m.html).
### 0.0.15-beta
(git-kick)
* First attempt to read wallbox data (namespace WB).
### 0.0.14-beta
(git-kick)
* Polling intervals (S/M/L) are now assignable per request tag, see second configuration tab.
* Bug fix: short and medium timers for polling intervals did not work properly.
### 0.0.13-beta
(git-kick)
* IDLE_PERIODS are now writable - note "SET_IDLE_PERIOD delay" in configuration.
* EMS.MODE was empirically re-mapped to 0 = IDLE, 1 = DISCHARGE, 2 = CHARGE.
* SET_POWER_MODE/VALUE are now acknowledged after frame was queued to E3/DC.
* Units are now trailing the values (no longer at end of name).

### 0.0.12-beta
(git-kick)
* New in configuration panel: select namespaces to query - use it to reduce CPU load (and transmitted data volume)
* Polling interval: only 11 most important parameters left in "short" class, according to [@ArnoD's analysis](https://forum.iobroker.net/post/711108)
### 0.0.11-beta
(git-kick) 
* SET_POWER_MODE=0(NORMAL) stops timer for re-sending SET_POWER_* 
* Introduced short/medium/long polling intervals to reduce amount of (mostly redundant) requests
### 0.0.10-beta
(git-kick) 
* SET_POWER is now initialized and appears after adapter setup
* Translations: EMS_ERROR_*, BAT_FCC, BAT_RC, BAT_SPECIFIED_CAPACITY
* Timestamps are displayed in ISO-8601 format
* Object names: replaced "#" by "_" to avoid interference with ioBoroker name resolution (e.g. former BAT#0 is now BAT_0)  -  **NOTE: this is likely to break <=0.0.9 based js scripts; adjust object references!**
* Solved issue setting EMS.WEATHER_REGULATED_CHARGE_ENABLED (before, failed with warning)
* Solved issue setting EMS.POWER_LIMITS_USED (before, object was defined r/o)
* SET_POWER: values set are re-sent according to a given interval (see admin panel)
* SET_POWER: introduced extra objects for entering desired values (SET_POWER_MODE, SET_POWER_VALUE)  -  **E3/DC behavior is still unclear. Feature under development.**
### 0.0.9-beta
(git-kick) 
* EMS: SET_POWER, first implementation for setting MODE and VALUE
* EP: values are in a separate device now
* ASOC / State of Health (SOH) German naming: "Alterungszustand"
* ERRORs will be decoded to short text
* WARN messages resulting from BAT and PVI probing are now filtered (will not show up anymore) 
* Refactoring: recursive parser for incoming data
### 0.0.8-beta
(git-kick) 
* Reworked INDEX handling (due to bug concerning PVI#0/#1 data assignment)
* resolved UNDEFINED names
* excluded PVI_COS_PHI (always returns ERROR tag)
### 0.0.7-beta
(git-kick) 
* Complete coverage of INV namespace, including multiple strings and phases
* started Sentry integration
### 0.0.6-beta
(git-kick) 
* Complete coverage of BAT namespace, including multiple DCBs and voltage/temperature lists
* Dynamic state creation for support of INDEXed tags
* Extended RSCP tag list using rxhan/RscpGUI
* Handle TCP fragmentation
### 0.0.5-beta
(git-kick) 
* Ready for public testing
* I18N for admin and statenames
* Catch type/range exceptions when writing values
* Reconnect after end of TCP connection
* Fixed message queue memory leak
* Reworked sample code

<a name="lic"></a>

## License
```
					GNU GENERAL PUBLIC LICENSE
					   Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.

							Preamble

  The GNU General Public License is a free, copyleft license for
software and other kinds of works.

  The licenses for most software and other practical works are designed
to take away your freedom to share and change the works.  By contrast,
the GNU General Public License is intended to guarantee your freedom to
share and change all versions of a program--to make sure it remains free
software for all its users.  We, the Free Software Foundation, use the
GNU General Public License for most of our software; it applies also to
any other work released this way by its authors.  You can apply it to
your programs, too.

  When we speak of free software, we are referring to freedom, not
price.  Our General Public Licenses are designed to make sure that you
have the freedom to distribute copies of free software (and charge for
them if you wish), that you receive source code or can get it if you
want it, that you can change the software or use pieces of it in new
free programs, and that you know you can do these things.

  To protect your rights, we need to prevent others from denying you
these rights or asking you to surrender the rights.  Therefore, you have
certain responsibilities if you distribute copies of the software, or if
you modify it: responsibilities to respect the freedom of others.

  For example, if you distribute copies of such a program, whether
gratis or for a fee, you must pass on to the recipients the same
freedoms that you received.  You must make sure that they, too, receive
or can get the source code.  And you must show them these terms so they
know their rights.

  Developers that use the GNU GPL protect your rights with two steps:
(1) assert copyright on the software, and (2) offer you this License
giving you legal permission to copy, distribute and/or modify it.

  For the developers' and authors' protection, the GPL clearly explains
that there is no warranty for this free software.  For both users' and
authors' sake, the GPL requires that modified versions be marked as
changed, so that their problems will not be attributed erroneously to
authors of previous versions.

  Some devices are designed to deny users access to install or run
modified versions of the software inside them, although the manufacturer
can do so.  This is fundamentally incompatible with the aim of
protecting users' freedom to change the software.  The systematic
pattern of such abuse occurs in the area of products for individuals to
use, which is precisely where it is most unacceptable.  Therefore, we
have designed this version of the GPL to prohibit the practice for those
products.  If such problems arise substantially in other domains, we
stand ready to extend this provision to those domains in future versions
of the GPL, as needed to protect the freedom of users.

  Finally, every program is threatened constantly by software patents.
States should not allow patents to restrict development and use of
software on general-purpose computers, but in those that do, we wish to
avoid the special danger that patents applied to a free program could
make it effectively proprietary.  To prevent this, the GPL assures that
patents cannot be used to render the program non-free.

  The precise terms and conditions for copying, distribution and
modification follow.

					   TERMS AND CONDITIONS

  0. Definitions.

  "This License" refers to version 3 of the GNU General Public License.

  "Copyright" also means copyright-like laws that apply to other kinds of
works, such as semiconductor masks.

  "The Program" refers to any copyrightable work licensed under this
License.  Each licensee is addressed as "you".  "Licensees" and
"recipients" may be individuals or organizations.

  To "modify" a work means to copy from or adapt all or part of the work
in a fashion requiring copyright permission, other than the making of an
exact copy.  The resulting work is called a "modified version" of the
earlier work or a work "based on" the earlier work.

  A "covered work" means either the unmodified Program or a work based
on the Program.

  To "propagate" a work means to do anything with it that, without
permission, would make you directly or secondarily liable for
infringement under applicable copyright law, except executing it on a
computer or modifying a private copy.  Propagation includes copying,
distribution (with or without modification), making available to the
public, and in some countries other activities as well.

  To "convey" a work means any kind of propagation that enables other
parties to make or receive copies.  Mere interaction with a user through
a computer network, with no transfer of a copy, is not conveying.

  An interactive user interface displays "Appropriate Legal Notices"
to the extent that it includes a convenient and prominently visible
feature that (1) displays an appropriate copyright notice, and (2)
tells the user that there is no warranty for the work (except to the
extent that warranties are provided), that licensees may convey the
work under this License, and how to view a copy of this License.  If
the interface presents a list of user commands or options, such as a
menu, a prominent item in the list meets this criterion.

  1. Source Code.

  The "source code" for a work means the preferred form of the work
for making modifications to it.  "Object code" means any non-source
form of a work.

  A "Standard Interface" means an interface that either is an official
standard defined by a recognized standards body, or, in the case of
interfaces specified for a particular programming language, one that
is widely used among developers working in that language.

  The "System Libraries" of an executable work include anything, other
than the work as a whole, that (a) is included in the normal form of
packaging a Major Component, but which is not part of that Major
Component, and (b) serves only to enable use of the work with that
Major Component, or to implement a Standard Interface for which an
implementation is available to the public in source code form.  A
"Major Component", in this context, means a major essential component
(kernel, window system, and so on) of the specific operating system
(if any) on which the executable work runs, or a compiler used to
produce the work, or an object code interpreter used to run it.

  The "Corresponding Source" for a work in object code form means all
the source code needed to generate, install, and (for an executable
work) run the object code and to modify the work, including scripts to
control those activities.  However, it does not include the work's
System Libraries, or general-purpose tools or generally available free
programs which are used unmodified in performing those activities but
which are not part of the work.  For example, Corresponding Source
includes interface definition files associated with source files for
the work, and the source code for shared libraries and dynamically
linked subprograms that the work is specifically designed to require,
such as by intimate data communication or control flow between those
subprograms and other parts of the work.

  The Corresponding Source need not include anything that users
can regenerate automatically from other parts of the Corresponding
Source.

  The Corresponding Source for a work in source code form is that
same work.

  2. Basic Permissions.

  All rights granted under this License are granted for the term of
copyright on the Program, and are irrevocable provided the stated
conditions are met.  This License explicitly affirms your unlimited
permission to run the unmodified Program.  The output from running a
covered work is covered by this License only if the output, given its
content, constitutes a covered work.  This License acknowledges your
rights of fair use or other equivalent, as provided by copyright law.

  You may make, run and propagate covered works that you do not
convey, without conditions so long as your license otherwise remains
in force.  You may convey covered works to others for the sole purpose
of having them make modifications exclusively for you, or provide you
with facilities for running those works, provided that you comply with
the terms of this License in conveying all material for which you do
not control copyright.  Those thus making or running the covered works
for you must do so exclusively on your behalf, under your direction
and control, on terms that prohibit them from making any copies of
your copyrighted material outside their relationship with you.

  Conveying under any other circumstances is permitted solely under
the conditions stated below.  Sublicensing is not allowed; section 10
makes it unnecessary.

  3. Protecting Users' Legal Rights From Anti-Circumvention Law.

  No covered work shall be deemed part of an effective technological
measure under any applicable law fulfilling obligations under article
11 of the WIPO copyright treaty adopted on 20 December 1996, or
similar laws prohibiting or restricting circumvention of such
measures.

  When you convey a covered work, you waive any legal power to forbid
circumvention of technological measures to the extent such circumvention
is effected by exercising rights under this License with respect to
the covered work, and you disclaim any intention to limit operation or
modification of the work as a means of enforcing, against the work's
users, your or third parties' legal rights to forbid circumvention of
technological measures.

  4. Conveying Verbatim Copies.

  You may convey verbatim copies of the Program's source code as you
receive it, in any medium, provided that you conspicuously and
appropriately publish on each copy an appropriate copyright notice;
keep intact all notices stating that this License and any
non-permissive terms added in accord with section 7 apply to the code;
keep intact all notices of the absence of any warranty; and give all
recipients a copy of this License along with the Program.

  You may charge any price or no price for each copy that you convey,
and you may offer support or warranty protection for a fee.

  5. Conveying Modified Source Versions.

  You may convey a work based on the Program, or the modifications to
produce it from the Program, in the form of source code under the
terms of section 4, provided that you also meet all of these conditions:

	a) The work must carry prominent notices stating that you modified
	it, and giving a relevant date.

	b) The work must carry prominent notices stating that it is
	released under this License and any conditions added under section 7.
	This requirement modifies the requirement in section 4 to
	"keep intact all notices".

	c) You must license the entire work, as a whole, under this
	License to anyone who comes into possession of a copy.  This
	License will therefore apply, along with any applicable section 7
	additional terms, to the whole of the work, and all its parts,
	regardless of how they are packaged.  This License gives no
	permission to license the work in any other way, but it does not
	invalidate such permission if you have separately received it.

	d) If the work has interactive user interfaces, each must display
	Appropriate Legal Notices; however, if the Program has interactive
	interfaces that do not display Appropriate Legal Notices, your
	work need not make them do so.

  A compilation of a covered work with other separate and independent
works, which are not by their nature extensions of the covered work,
and which are not combined with it such as to form a larger program,
in or on a volume of a storage or distribution medium, is called an
"aggregate" if the compilation and its resulting copyright are not
used to limit the access or legal rights of the compilation's users
beyond what the individual works permit.  Inclusion of a covered work
in an aggregate does not cause this License to apply to the other
parts of the aggregate.

  6. Conveying Non-Source Forms.

  You may convey a covered work in object code form under the terms
of sections 4 and 5, provided that you also convey the
machine-readable Corresponding Source under the terms of this License,
in one of these ways:

	a) Convey the object code in, or embodied in, a physical product
	(including a physical distribution medium), accompanied by the
	Corresponding Source fixed on a durable physical medium
	customarily used for software interchange.

	b) Convey the object code in, or embodied in, a physical product
	(including a physical distribution medium), accompanied by a
	written offer, valid for at least three years and valid for as
	long as you offer spare parts or customer support for that product
	model, to give anyone who possesses the object code either (1) a
	copy of the Corresponding Source for all the software in the
	product that is covered by this License, on a durable physical
	medium customarily used for software interchange, for a price no
	more than your reasonable cost of physically performing this
	conveying of source, or (2) access to copy the
	Corresponding Source from a network server at no charge.

	c) Convey individual copies of the object code with a copy of the
	written offer to provide the Corresponding Source.  This
	alternative is allowed only occasionally and noncommercially, and
	only if you received the object code with such an offer, in accord
	with subsection 6b.

	d) Convey the object code by offering access from a designated
	place (gratis or for a charge), and offer equivalent access to the
	Corresponding Source in the same way through the same place at no
	further charge.  You need not require recipients to copy the
	Corresponding Source along with the object code.  If the place to
	copy the object code is a network server, the Corresponding Source
	may be on a different server (operated by you or a third party)
	that supports equivalent copying facilities, provided you maintain
	clear directions next to the object code saying where to find the
	Corresponding Source.  Regardless of what server hosts the
	Corresponding Source, you remain obligated to ensure that it is
	available for as long as needed to satisfy these requirements.

	e) Convey the object code using peer-to-peer transmission, provided
	you inform other peers where the object code and Corresponding
	Source of the work are being offered to the general public at no
	charge under subsection 6d.

  A separable portion of the object code, whose source code is excluded
from the Corresponding Source as a System Library, need not be
included in conveying the object code work.

  A "User Product" is either (1) a "consumer product", which means any
tangible personal property which is normally used for personal, family,
or household purposes, or (2) anything designed or sold for incorporation
into a dwelling.  In determining whether a product is a consumer product,
doubtful cases shall be resolved in favor of coverage.  For a particular
product received by a particular user, "normally used" refers to a
typical or common use of that class of product, regardless of the status
of the particular user or of the way in which the particular user
actually uses, or expects or is expected to use, the product.  A product
is a consumer product regardless of whether the product has substantial
commercial, industrial or non-consumer uses, unless such uses represent
the only significant mode of use of the product.

  "Installation Information" for a User Product means any methods,
procedures, authorization keys, or other information required to install
and execute modified versions of a covered work in that User Product from
a modified version of its Corresponding Source.  The information must
suffice to ensure that the continued functioning of the modified object
code is in no case prevented or interfered with solely because
modification has been made.

  If you convey an object code work under this section in, or with, or
specifically for use in, a User Product, and the conveying occurs as
part of a transaction in which the right of possession and use of the
User Product is transferred to the recipient in perpetuity or for a
fixed term (regardless of how the transaction is characterized), the
Corresponding Source conveyed under this section must be accompanied
by the Installation Information.  But this requirement does not apply
if neither you nor any third party retains the ability to install
modified object code on the User Product (for example, the work has
been installed in ROM).

  The requirement to provide Installation Information does not include a
requirement to continue to provide support service, warranty, or updates
for a work that has been modified or installed by the recipient, or for
the User Product in which it has been modified or installed.  Access to a
network may be denied when the modification itself materially and
adversely affects the operation of the network or violates the rules and
protocols for communication across the network.

  Corresponding Source conveyed, and Installation Information provided,
in accord with this section must be in a format that is publicly
documented (and with an implementation available to the public in
source code form), and must require no special password or key for
unpacking, reading or copying.

  7. Additional Terms.

  "Additional permissions" are terms that supplement the terms of this
License by making exceptions from one or more of its conditions.
Additional permissions that are applicable to the entire Program shall
be treated as though they were included in this License, to the extent
that they are valid under applicable law.  If additional permissions
apply only to part of the Program, that part may be used separately
under those permissions, but the entire Program remains governed by
this License without regard to the additional permissions.

  When you convey a copy of a covered work, you may at your option
remove any additional permissions from that copy, or from any part of
it.  (Additional permissions may be written to require their own
removal in certain cases when you modify the work.)  You may place
additional permissions on material, added by you to a covered work,
for which you have or can give appropriate copyright permission.

  Notwithstanding any other provision of this License, for material you
add to a covered work, you may (if authorized by the copyright holders of
that material) supplement the terms of this License with terms:

	a) Disclaiming warranty or limiting liability differently from the
	terms of sections 15 and 16 of this License; or

	b) Requiring preservation of specified reasonable legal notices or
	author attributions in that material or in the Appropriate Legal
	Notices displayed by works containing it; or

	c) Prohibiting misrepresentation of the origin of that material, or
	requiring that modified versions of such material be marked in
	reasonable ways as different from the original version; or

	d) Limiting the use for publicity purposes of names of licensors or
	authors of the material; or

	e) Declining to grant rights under trademark law for use of some
	trade names, trademarks, or service marks; or

	f) Requiring indemnification of licensors and authors of that
	material by anyone who conveys the material (or modified versions of
	it) with contractual assumptions of liability to the recipient, for
	any liability that these contractual assumptions directly impose on
	those licensors and authors.

  All other non-permissive additional terms are considered "further
restrictions" within the meaning of section 10.  If the Program as you
received it, or any part of it, contains a notice stating that it is
governed by this License along with a term that is a further
restriction, you may remove that term.  If a license document contains
a further restriction but permits relicensing or conveying under this
License, you may add to a covered work material governed by the terms
of that license document, provided that the further restriction does
not survive such relicensing or conveying.

  If you add terms to a covered work in accord with this section, you
must place, in the relevant source files, a statement of the
additional terms that apply to those files, or a notice indicating
where to find the applicable terms.

  Additional terms, permissive or non-permissive, may be stated in the
form of a separately written license, or stated as exceptions;
the above requirements apply either way.

  8. Termination.

  You may not propagate or modify a covered work except as expressly
provided under this License.  Any attempt otherwise to propagate or
modify it is void, and will automatically terminate your rights under
this License (including any patent licenses granted under the third
paragraph of section 11).

  However, if you cease all violation of this License, then your
license from a particular copyright holder is reinstated (a)
provisionally, unless and until the copyright holder explicitly and
finally terminates your license, and (b) permanently, if the copyright
holder fails to notify you of the violation by some reasonable means
prior to 60 days after the cessation.

  Moreover, your license from a particular copyright holder is
reinstated permanently if the copyright holder notifies you of the
violation by some reasonable means, this is the first time you have
received notice of violation of this License (for any work) from that
copyright holder, and you cure the violation prior to 30 days after
your receipt of the notice.

  Termination of your rights under this section does not terminate the
licenses of parties who have received copies or rights from you under
this License.  If your rights have been terminated and not permanently
reinstated, you do not qualify to receive new licenses for the same
material under section 10.

  9. Acceptance Not Required for Having Copies.

  You are not required to accept this License in order to receive or
run a copy of the Program.  Ancillary propagation of a covered work
occurring solely as a consequence of using peer-to-peer transmission
to receive a copy likewise does not require acceptance.  However,
nothing other than this License grants you permission to propagate or
modify any covered work.  These actions infringe copyright if you do
not accept this License.  Therefore, by modifying or propagating a
covered work, you indicate your acceptance of this License to do so.

  10. Automatic Licensing of Downstream Recipients.

  Each time you convey a covered work, the recipient automatically
receives a license from the original licensors, to run, modify and
propagate that work, subject to this License.  You are not responsible
for enforcing compliance by third parties with this License.

  An "entity transaction" is a transaction transferring control of an
organization, or substantially all assets of one, or subdividing an
organization, or merging organizations.  If propagation of a covered
work results from an entity transaction, each party to that
transaction who receives a copy of the work also receives whatever
licenses to the work the party's predecessor in interest had or could
give under the previous paragraph, plus a right to possession of the
Corresponding Source of the work from the predecessor in interest, if
the predecessor has it or can get it with reasonable efforts.

  You may not impose any further restrictions on the exercise of the
rights granted or affirmed under this License.  For example, you may
not impose a license fee, royalty, or other charge for exercise of
rights granted under this License, and you may not initiate litigation
(including a cross-claim or counterclaim in a lawsuit) alleging that
any patent claim is infringed by making, using, selling, offering for
sale, or importing the Program or any portion of it.

  11. Patents.

  A "contributor" is a copyright holder who authorizes use under this
License of the Program or a work on which the Program is based.  The
work thus licensed is called the contributor's "contributor version".

  A contributor's "essential patent claims" are all patent claims
owned or controlled by the contributor, whether already acquired or
hereafter acquired, that would be infringed by some manner, permitted
by this License, of making, using, or selling its contributor version,
but do not include claims that would be infringed only as a
consequence of further modification of the contributor version.  For
purposes of this definition, "control" includes the right to grant
patent sublicenses in a manner consistent with the requirements of
this License.

  Each contributor grants you a non-exclusive, worldwide, royalty-free
patent license under the contributor's essential patent claims, to
make, use, sell, offer for sale, import and otherwise run, modify and
propagate the contents of its contributor version.

  In the following three paragraphs, a "patent license" is any express
agreement or commitment, however denominated, not to enforce a patent
(such as an express permission to practice a patent or covenant not to
sue for patent infringement).  To "grant" such a patent license to a
party means to make such an agreement or commitment not to enforce a
patent against the party.

  If you convey a covered work, knowingly relying on a patent license,
and the Corresponding Source of the work is not available for anyone
to copy, free of charge and under the terms of this License, through a
publicly available network server or other readily accessible means,
then you must either (1) cause the Corresponding Source to be so
available, or (2) arrange to deprive yourself of the benefit of the
patent license for this particular work, or (3) arrange, in a manner
consistent with the requirements of this License, to extend the patent
license to downstream recipients.  "Knowingly relying" means you have
actual knowledge that, but for the patent license, your conveying the
covered work in a country, or your recipient's use of the covered work
in a country, would infringe one or more identifiable patents in that
country that you have reason to believe are valid.

  If, pursuant to or in connection with a single transaction or
arrangement, you convey, or propagate by procuring conveyance of, a
covered work, and grant a patent license to some of the parties
receiving the covered work authorizing them to use, propagate, modify
or convey a specific copy of the covered work, then the patent license
you grant is automatically extended to all recipients of the covered
work and works based on it.

  A patent license is "discriminatory" if it does not include within
the scope of its coverage, prohibits the exercise of, or is
conditioned on the non-exercise of one or more of the rights that are
specifically granted under this License.  You may not convey a covered
work if you are a party to an arrangement with a third party that is
in the business of distributing software, under which you make payment
to the third party based on the extent of your activity of conveying
the work, and under which the third party grants, to any of the
parties who would receive the covered work from you, a discriminatory
patent license (a) in connection with copies of the covered work
conveyed by you (or copies made from those copies), or (b) primarily
for and in connection with specific products or compilations that
contain the covered work, unless you entered into that arrangement,
or that patent license was granted, prior to 28 March 2007.

  Nothing in this License shall be construed as excluding or limiting
any implied license or other defenses to infringement that may
otherwise be available to you under applicable patent law.

  12. No Surrender of Others' Freedom.

  If conditions are imposed on you (whether by court order, agreement or
otherwise) that contradict the conditions of this License, they do not
excuse you from the conditions of this License.  If you cannot convey a
covered work so as to satisfy simultaneously your obligations under this
License and any other pertinent obligations, then as a consequence you may
not convey it at all.  For example, if you agree to terms that obligate you
to collect a royalty for further conveying from those to whom you convey
the Program, the only way you could satisfy both those terms and this
License would be to refrain entirely from conveying the Program.

  13. Use with the GNU Affero General Public License.

  Notwithstanding any other provision of this License, you have
permission to link or combine any covered work with a work licensed
under version 3 of the GNU Affero General Public License into a single
combined work, and to convey the resulting work.  The terms of this
License will continue to apply to the part which is the covered work,
but the special requirements of the GNU Affero General Public License,
section 13, concerning interaction through a network will apply to the
combination as such.

  14. Revised Versions of this License.

  The Free Software Foundation may publish revised and/or new versions of
the GNU General Public License from time to time.  Such new versions will
be similar in spirit to the present version, but may differ in detail to
address new problems or concerns.

  Each version is given a distinguishing version number.  If the
Program specifies that a certain numbered version of the GNU General
Public License "or any later version" applies to it, you have the
option of following the terms and conditions either of that numbered
version or of any later version published by the Free Software
Foundation.  If the Program does not specify a version number of the
GNU General Public License, you may choose any version ever published
by the Free Software Foundation.

  If the Program specifies that a proxy can decide which future
versions of the GNU General Public License can be used, that proxy's
public statement of acceptance of a version permanently authorizes you
to choose that version for the Program.

  Later license versions may give you additional or different
permissions.  However, no additional obligations are imposed on any
author or copyright holder as a result of your choosing to follow a
later version.

  15. Disclaimer of Warranty.

  THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
APPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY
OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM
IS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF
ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

  16. Limitation of Liability.

  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS
THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY
GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE
USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF
DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD
PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),
EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF
SUCH DAMAGES.

  17. Interpretation of Sections 15 and 16.

  If the disclaimer of warranty and limitation of liability provided
above cannot be given local legal effect according to their terms,
reviewing courts shall apply local law that most closely approximates
an absolute waiver of all civil liability in connection with the
Program, unless a warranty or assumption of liability accompanies a
copy of the Program in return for a fee.

					 END OF TERMS AND CONDITIONS

			How to Apply These Terms to Your New Programs

  If you develop a new program, and you want it to be of the greatest
possible use to the public, the best way to achieve this is to make it
free software which everyone can redistribute and change under these terms.

  To do so, attach the following notices to the program.  It is safest
to attach them to the start of each source file to most effectively
state the exclusion of warranty; and each file should have at least
the "copyright" line and a pointer to where the full notice is found.

	<one line to give the program's name and a brief idea of what it does.>
	Copyright (C) <year>  <name of author>

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/>.

Also add information on how to contact you by electronic and paper mail.

  If the program does terminal interaction, make it output a short
notice like this when it starts in an interactive mode:

	<program>  Copyright (C) <year>  <name of author>
	This program comes with ABSOLUTELY NO WARRANTY; for details type `show w'.
	This is free software, and you are welcome to redistribute it
	under certain conditions; type `show c' for details.

The hypothetical commands `show w' and `show c' should show the appropriate
parts of the General Public License.  Of course, your program's commands
might be different; for a GUI interface, you would use an "about box".

  You should also get your employer (if you work as a programmer) or school,
if any, to sign a "copyright disclaimer" for the program, if necessary.
For more information on this, and how to apply and follow the GNU GPL, see
<https://www.gnu.org/licenses/>.

  The GNU General Public License does not permit incorporating your program
into proprietary programs.  If your program is a subroutine library, you
may consider it more useful to permit linking proprietary applications with
the library.  If this is what you want to do, use the GNU Lesser General
Public License instead of this License.  But first, please read
<https://www.gnu.org/licenses/why-not-lgpl.html>.
```
Copyright (c) 2023 Ulrich Kick <iobroker@kick-web.de>