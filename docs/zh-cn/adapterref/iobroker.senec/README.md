---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.senec.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.senec.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/senec-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/senec-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/nobl/ioBroker.senec/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.senec.png?downloads=true
BADGE-WERO: https://img.shields.io/badge/WERO-8A2BE2
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-00457C?logo=paypal&logoColor=white
BADGE-Buy Me a Coffee: https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?logo=buymeacoffee&logoColor=black
BADGE-GitHub Sponsor: https://img.shields.io/badge/Sponsor-GitHub-181717?logo=github&logoColor=white
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.senec/README.md
title: ioBroker.senec
hash: s9lakm6cGCqVMZA40Z7IZr834pHE0NOaJf8skuXS8sA=
---
![标识](../../../de/adapterref/iobroker.senec/admin/senec.png)

# IoBroker.senec
## IoBroker 的 SENEC 适配器
该适配器最初是为 Senec Home V2.1 系统开发的。

在 Senec.Home 系统中，适配器只能修改选定的值。使用此功能需自行承担风险，并且必须事先在配置中手动激活。

Senec 目前不再提供通过 Web 界面可靠地控制削峰的方法。为此，您必须使用 mein-senec.de。

其他系统（例如 V3）是否也能与该适配器兼容，取决于它们是否也基于 lala.cgi 并提供相同的 JSON 信息。

即使集成到 Senec.Cloud 中，也不能保证数据仍然可以通过 Web 界面访问（更多信息请参阅用户报告）。

该适配器支持通过 lala.cgi 进行本地轮询，也支持通过 Web API 进行轮询。

以下列出的系统由于使用相同的接口，理论上应该可以正常工作。但是，数据点可能有所不同（缺失、新增或修改）。

* Senec Home 4.0、6.0、8.0、10.0 / 铅
* Senec Home 5.0、7.5、10.0、15.0 / 锂
* 塞内克家庭 V2 5.0、7.5、10.0
* Senec Home V2.1
* Senec.Home V3
* Senec.Home V4
* Senec Business 30.0 / Lead
* Senec Business V2 30.0 / Lead
* Senec Business 25.0 / 锂
* Senec Business V2_2ph / 锂电池
* Senec Business V2 3相/锂电池
* ADS Tec
* OEM LG
* 太阳能逆变储能 10.0/铅

即使 Senec 系统缺少本地 Web 界面，仍可通过 API 选项进行监控。欢迎就此提出任何反馈意见。

## 免责声明
**所有产品和公司名称或标识均为其各自所有者的商标™或注册商标®。使用这些名称或标识并不意味着与这些所有者或其关联公司存在任何关联或得到其认可！此个人项目系利用业余时间维护，不用于任何商业目的。

### SENEC.Home
这套系统的核心部件是锂离子电池，用于储存和释放屋顶太阳能电池板产生的电力。它的工作原理与智能手机、笔记本电脑或无绳电钻中的电池类似，本质上采用的是相同的成熟技术。如果您屋顶产生的电力超过家中所需，多余的电力不会输送到电网，而是储存到您的储能系统中。这样，在天黑或阴天导致发电量减少甚至停止发电时，您就可以使用这些电力。这使您能够在晚上使用自家的太阳能来观看电视或做饭。

## 安装前的准备工作
要将 Senec.Home 存储系统与 ioBroker 配合使用，该系统必须由合格的电工成功安装。此外，该系统必须与 ioBroker 位于同一网络中。

＃＃ 配置
### “常规设置”窗口
![主要设置](../../../de/adapterref/iobroker.senec/media/mainSettings.png "常规设置")

| 字段 | 描述 |
|:-------------|:-------------|
|SENEC 系统|在此处输入所需 Senec.Home 系统的 IP 地址。如果网络中存在可用的 DNS 服务器，也可以输入其完全限定域名 (FQDN)。|
|使用https？|如果SENEC系统已切换到https，则必须启用此选项。|
|高优先级查询间隔| 在此处输入从 Senec.Home 系统检索高优先级值的时间间隔（毫秒）。（默认值：10 秒） |

|低优先级查询间隔| 在此处输入从 Senec.Home 系统检索低优先级值的时间间隔（毫秒）。（默认值：60 分钟）<br>注意！如果对 SENEC 系统的查询过于频繁，可能会导致无法将数据传输到 SENEC 服务器！（例如，应用程序或 mein-senec.de 网站上将没有当前值）

|请求超时|此设置指定 Senec.Home 系统必须在请求被中止前响应请求的最长时间（以毫秒为单位）。（默认值：5000） |
|重试次数| 此参数指定发生错误时向 Senec 系统查询的次数。此参数不适用于适配器启动时——如果系统无法访问，适配器将终止。（默认值：10） |
|轮询重复因子| 此值影响重试间隔。第 n 次重试发生在第 n-1 次重试后经过间隔 *倍数* n 秒。例如：使用默认值时，第一次重试发生在首次重试后 20 秒，第二次重试发生在第一次重试后 40 秒。成功检索数据后，重试计数器将重置。  |

配置完成后，配置对话框将以 `SPEICHERN UND SCHLIEßEN` 退出。

这将导致适配器重启。

### 窗口“其他高优先级轮询数据点”
![轮询设置](../../../de/adapterref/iobroker.senec/media/pollingSettings.png "其他高优先级投票数据点")

| 字段 | 描述 |
|:-------------|:-------------|
|免责声明|要更改适配器的轮询行为，您必须确认您了解潜在风险并自愿承担这些风险。适配器的开发者不承担任何责任。|
|不同区域的数据点|您可以在此处指定需要优先检索的其他数据点。仅可使用 A-Z 字符、0-9 数字以及逗号进行分隔。|
|是否添加要检索的数据点？|请在此处确认您是否确实要将指定的数据点添加到高优先级轮询中。|

注意！如果对 SENEC 系统的查询过于频繁和/或数据点过多，可能会导致无法将数据传输到 SENEC 服务器（例如，应用程序或 mein-senec.de 上没有当前值）！SENEC 系统也可能意外重启和/或停止响应请求。在这种情况下，停止适配器并重新设置即可解决问题。

配置完成后，配置对话框将以 `SPEICHERN UND SCHLIEßEN` 退出。

这将导致适配器重启。

＃＃ 实例
安装适配器后，在区域 `Objekte` 中创建了一个 Senec 适配器的活动实例。

可以在单个 ioBroker 服务器上创建多个 Senec 适配器实例。反之，Senec.Home 系统也可以在多个 ioBroker 服务器上运行。如果要通过一个 ioBroker 服务器控制多个设备，则应为每个系统创建一个单独的实例。<br/><br/>适配器是否已激活并连接到系统由实例状态字段的颜色指示。将鼠标光标悬停在图标上可显示更多详细信息。

## 适配器对象
在区域 `Objekte` 中，集线器中的适配器检测到的所有设备和活动都以树状结构列出。

以下对象按状态分类。

每个数据点都列出了其关联的数据类型和权限。

目前，权限仅支持只读 (R)。每个数据点至少都具有读取 (R) 权限。

要查找特定数据点，我们建议使用快捷键“Ctrl + F”。

根据系统的不同，某些状态可能不存在，或者可能存在未记录的状态。

如果某个状态没有相关文档，但有人知道该状态的含义，请提交拉取请求（或创建包含相关信息的工单）。

### 示例状态（可用状态取决于系统和软件版本；列表通常不完整）
#### 频道：信息
* 信息连接

|数据类型|权限|
    |:---:|:---:|
|布尔值|R|

*仅可读布尔值，当 ioBroker 和 Senec.Home 之间的连接建立时，该值为 true。*

#### 通道：_api
从 Web API 获取的值

#### 频道：BMS
* 模块配置

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*仅显示数字，表示系统中配置的模块数量。*

* 模块计数

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*仅显示可读数字，表示连接到系统的模块数量（包括未配置的模块）。*

#### 频道：能量
* GUI_BAT_DATA_CURRENT

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*仅显示数字，表示当前电池电流（单位：安培）。*

* GUI_BAT_DATA_FUEL_CHARGE

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*仅显示数字，表示系统填充率（百分比）。*

* GUI_BAT_DATA_VOLTAGE

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*仅显示可读数字，表示当前电池电压（单位：伏特）*

* GUI_BAT_DATA_POWER

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*仅显示可读数字，表示当前电池的输入功率（瓦特）或输出功率（负值为负值）。*

* GUI_CHARGING_INFO

|数据类型|权限|
    |:---:|:---:|
|布尔值|R|

*仅显示可读的布尔值，指示电池当前是否正在充电。*

* GUI_GRID_POW

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*仅显示可读数字，表示当前从电网汲取或输送至电网的功率（负值为负）。*

* GUI_HOUSE_POW

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*仅显示可读数字，表示房屋当前消耗的瓦数。*

* GUI_INVERTER_POWER

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*仅显示可读数字，表示光伏系统当前产生的功率（瓦特数）。*

* 营业时间统计

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*仅显示可读数字，指示系统运行时间。*

* STAT_STATE

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*仅显示可读数字，代表系统状态。*

* STAT_STATE_Text

|数据类型|权限|
    |:---:|:---:|
|字符串|R|

*仅提供可读字符串，以纯文本形式指示系统状态。遗憾的是，我们只有德语版的原始 Senec 文本。*

#### 通道：SYS_UPDATE
* NPU_IMAGE_VERSION

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*仅可读数字，其值为修订版 NPU-IMAGE (*

* NPU_VER

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*仅可读数字，对应于修订版 NPU-REGS 的值*

* 更新可用

|数据类型|权限|
    |:---:|:---:|
|布尔值|R|

*可读的布尔值，指示是否有可用更新（这些更新由 Senec 提供并自动安装）。*

#### 频道：巫师
* 应用程序版本

|数据类型|权限|
    |:---:|:---:|
|字符串|R|

*仅显示可读文本，包含MCU版本值。*

* 配置已加载

|数据类型|权限|
    |:---:|:---:|
|布尔值|R|

*只读布尔值，指示配置是否已加载（此值不应始终为 false）。*

* 接口版本

|数据类型|权限|
    |:---:|:---:|
|字符串|R|

*仅显示文本，包含修订界面的值。*

* 设置数量墙盒

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*仅显示数字，表示系统中配置的墙盒数量。*

* SETUP_WALLBOX_SERIAL[0..3]

|数据类型|权限|
    |:---:|:---:|
|字符串|R|

*仅显示可读文本，标明现有墙盒的序列号 0-3。*

### 已不再可用或已移除
* 统计数据
* 展示
* _calc（由于 STATISTIC 已被移除，因此不再相关）
* BAT1OBJ[2-4]

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.5.3 (2026-04-13)
- Clamping end-dates to current time if they are in the future to avoid issues with API
- Dependency updates
- Updated iobroker\testing-action-* versions

### 2.5.2 (2026-03-31)
- Rewrote AllTime History Rebuild: We should now be able to rebuild AllTime History even if the senec server struggles with timeouts. Warning! Rebuild will take considerable time now depending on the server. Current state of rebuild will be reported to log (info).
- You will now need to supply the installation year of your appliance upon AllTime History rebuild if you don't want empty yearly folders in the measurements path for yours you don't have data.
- More comprehensive logging on what is being polled from API.
- Better debug-logging for polling

### 2.5.1 (2026-03-31)
- Increased default API poll interval to 6 minutes. This appears to be causing less issues with the server than 5 minutes.
- You can now define different polling intervals for dashboard (frequently), details (usually hourly and daily information), heavy (for everything else that usually is done per month or year).<br>Please be careful with high frequency polling as this can and will lead to problems and the senec server will stop responding to your requests. Longer delays between polls are preferred.
- Dependency updates
- Code optimizations

### 2.5.0 (2026-03-28)
- Added control.RebootAppliance to initiate appliance reboot. Only works if local lala.cgi is available and connected. Function requires extra permission via adapter settings. Please use responsible!
- We are now revealing that an ioBroker integration is accessing the API per default (UserAgent is set to 'integration'). Please consider leaving that to 'integration' so SENEC knows there are many users using the ioBroker integration. If you don't want this or experience issues with 'integration' UserAgent, check settings and revert UserAgent to 'Browser' or define your 'custom' UserAgent.
- Fixed incremential back-off for local polling.
- Moved local appliance control settings into own tab.
- Concurrency for API requests can now be controlled via settings. Please be cautious! Senec API is fragile. Go with 1 concurrent request if you experience issues.
- You can now enable diagnostics for api-request-queue. You can log them to 'info' log or have them in _api.diagnostics.queue.*
- Reduced local polling interval for lowPrio to 5 minutes.
- UI now hides unavailable options.
- Added option to remove API log spam. If you don't need to know every few minutes we are refreshing tokens or polling the API: Deactivate it.
- Partial code rewrite (you can now safely have several instances of adapter - if you ever wanted)
- Dependency updates

### 2.4.8 (2026-03-14)
 - Connection type now is "cloud" (ioBroker internal setting) - although we still support local interaction (if possible per individual appliance)
 - Dependency updates

### 2.4.7 (2026-03-14)
- Clearly indicating that initial API login busted and adapter will turn off API polling until restart
- Certain warnings moved to debug (as they are pretty much for debug purposes only)
- Made usage of axios-cookiejar-support ESM compatible (dynamic import). Solves issues with node 22.
- RND made node22+ safe.
- Code optimizations

### 2.4.6 (2026-03-09)
- Optimizations in Token Refesh Szenarios
- Optimizations in case of authentication issues
- Persisted RefreshToken across adapter restarts (less logins)
- Reworded errors/warning messages
- Dependency updates

### 2.4.5 (2026-03-03)
- fixed typo that made today/hourly today/horly. You can safely delete the horly branch Measurements/Daily/horly
- Updated delay for token refresh (it can be up to 2 min now).

### 2.4.4 (2026-03-03)
- Exponential backoff, if all systems cannot get polled. If at least 1 system can be polled we resume normal action. Now - if all systems fail polling (like 1 if you only have 1) this would be example backoff times for a 5min base interval: 1 Failure -> 0-10 min, 2 Failure -> 0-20 min, 3 Failures -> 0-40 min, 4+ Failures -> 0-40 min. Once polling works again we will resume normal operations.

### 2.4.3 (2026-03-03)
- API uses its own backoff settings when polling. You can only configure delay between polls. Instead we are using strategy used by: AWS SDK, Google Cloud SDK, Stripe API client, Kubernetes controllers or Distributed message brokers to prevent: retry storms, thundering herd, burst collapse after outage recovery, adapter lockups or permanent dead loops. This leads to: IF (SENEC API down for 2 hours, or Token refresh fails 20 times, or 429 rate limiting kicks in, or Internet drops temporarily) ? (Never dies, never overlaps, never floods API, always recovers)
- API polling no longer honors retries-setting. It will just keep backing off exponentially if errors persist -> we keep trying until you stop the adapter.
- Using Token-Refresh strategy. No unnecessary logins anymore.
- 401 won't throw warning anymore
- ReAuth shouldn't stop polling anymore

### 2.4.2 (2026-03-03)
- AuthToken in _api is no longer used. You can safely delete it.
- Decoupled frequencies to lower API load. Every poll: Dashboard and today values; Once per day: Yesterday, Monthly, Yearly values (we reduce load by about 65% compared to polling everything every time)
- AccessToken logic centralized
- True Single Flight Token refresh (avoiding duplicate logins, duplicate login storms)
- Avoiding overlapping Polls
- exponential backoff on auth failure
- retry backoff
- proper lifecycle safety
- Automatic 401 retry

### 2.4.1 (2026-03-01)
- Fixing issues with polling from senec api when token expires
- Old entries in changelog moved to old.

### 2.4.0 (2026-02-28)
- Senec changed login procedure (again). Adapter now also works with 2-stage login where senec asks for username/email first and password second.
- Dependency updates

### 2.3.0 (2026-02-17)
- Measurements for today and yesterday are also available by the hour
- Measurements for month and previous month are also available by day
- Measurements for year are also available by month
- Unit calculation fixed if we don't know the unit yet per state_attr.js
- Added definitions for cascadeDevicesCount and mode
- Dependency update

### 2.2.2 (2026-02-06)
- Migrated to i18n
- Update handling of "new" states that are just an "extra" to an existing state like state and state.1 or state.42
- Dependency Updates

### 2.2.1 (2026-02-06)
- Fixed: History rebuild will only run once now when requested (remember: To force rebuild you need to configure this in settings)

### 2.2.0 (2026-02-05)
- Polling yearly measurements as year from API - not months (and summing them up)
- Added back AllTimeHistory with BATTERY_LEVEL_IN_PERCENT averaged and AUTARKY_IN_PERCENT calculated
- Removed selection to use https or http for lala.cgi. https is enforced now.

### 2.1.3 (2026-02-04)
- reading all previous years (up to inception of SENEC) added again (to make this happen: activate recalculation of full history via settings)
- added today / yesterday again
- optimizations for measurements handling
- less log noise

### 2.1.2 (2026-02-04)
- more silencing log messages
- housekeeping

### 2.1.1 (2026-02-04)
- fixed datatype for WIZARD.SG_READY_CURR_MODE
- less logging (moved some info to debug again)

### 2.1.0 (2026-02-04) - the API returns - finally finally hopefully finally
- Complete rewrite of the Senec API functionality. Thanks to @timfxtones for pointing me in the right direction
- No longer using the web-interface at mein-senec.de - it didn't work properly on the long run ...
- Still missing some datapoints so far. They will be implemented in the future.

### 2.0.0 (maett81, NoBl)
* Updated to use new SENEC API via mein-senec.de - Thanks to @maett81
* Some code and dependency housekeeping

### [Former Updates](CHANGELOG_old.md)

## License
MIT License

Copyright (c) 2020-2026 Norbert Bluemle <github@bluemle.org>

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