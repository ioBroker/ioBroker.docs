---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.senec.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.senec.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/senec-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/senec-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/nobl/ioBroker.senec/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.senec.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.senec/README.md
title: ioBroker.senec
hash: FHWCaPPMI/Ky/IqWfzHUD4QxtWfoidigYE2yNSDBl9U=
---
![标识](../../../de/adapterref/iobroker.senec/admin/senec.png)

#ioBroker.senec
## IoBroker 的 SENEC 适配器
该适配器是为 Senec Home V2.1 系统开发的。
Senec.Home 系统中不能更改任何值。安全费用的整合是有意避免的。
Senec 目前不再提供通过网络界面影响调峰的可靠方式。为此，必须努力 mein-senec.de。
其他系统（例如 V3）是否也可以使用它取决于它们是否也基于 lala.cgi 并提供相同的 JSON 信息。
即使集成到 Senec.Clound 中，也不能保证仍然可以通过 Web 界面访问数据（请提供相关报告）。

因为使用相同的界面而应该工作的系统列在下面。但是，数据点可以不同（缺失、附加、更改）。

* Senec Home 4.0 / 领先
* Senec Home 6.0 Pb
* Senec Home 8.0 / 领先
* Senec Home 10.0 Pb
* Senec Home 5.0/7.5/10.0 / 锂
* Senec Home 15.0 / 锂
* Senec Home V2 5.0/7.5/10.0
* Senec Home V2 10.0 / 铅
* Senec Home V2.1 1ph / 锂
* Senec.Home V3 Hybrid
* Senec.Home V3 Hybrid duo
* Senec 业务 30.0 / 铅
* Senec Business V2 30.0 / 铅
* Senec 商业 25.0 / 锂
* Senec 业务 V2_2ph / 锂
* Senec Business V2 3ph / 锂
* ADS技术
*OEM LG
* 太阳能逆变器储能 10.0 / lead

##免责声明
**所有产品和公司名称或徽标均为其各自所有者的商标™ 或注册® 商标。他们的使用并不意味着与此或任何相关附属机构有从属关系或认可！这个个人项目是业余时间培养的，没有商业目标。

### SENEC.主页
该系统的核心是锂离子电池，可储存和释放屋顶太阳能电池阵列产生的电能。这与智能手机、笔记本电脑或无绳螺丝刀中的电池完全一样。原则上，它也包含相同的成熟技术。如果您在屋顶上产生的电力超过您在房屋中使用的电力，则电力不会流入电网，而是流入您的存储系统。您可以在天黑或乌云密布并且发电量减少或不再发电时使用它。然后你可以在晚上用自己的太阳能开电视或做饭。

## 预安装要求
使用 ioBroker 操作 Senec.Home 存储系统的先决条件是电工成功安装系统。该系统还必须与 ioBroker 位于同一网络中。

＃＃＃ 安装
适配器实例从 ioBroker 管理界面安装。
完成适配器实例的安装后，会自动打开一个配置窗口。

＃＃ 配置
### 主设置窗口
![主要设置](../../../de/adapterref/iobroker.senec/media/mainSettings.png "主要设置")

|领域 |说明 |
|:-------------|:-------------|
|SENEC 系统 |此处输入所需 Senec.Home 系统的 IP 地址。如果网络中有可用的 DNS，也可以指定 FQDN。|
|请求间隔高优先级|在此输入从 Senec.Home Systems 检索高优先级值的时间间隔（毫秒）。 （默认值：10 秒）|

|请求间隔低优先级|在此输入从 Senec.Home Systems 检索低优先级值的时间间隔（毫秒）。 （默认值：60 分钟）<br>危险！如果查询 SENEC 系统的频率太高，这可能意味着没有更多的数据可以传输到 SENEC 服务器！ （例如，应用程序或 mein-senec.de 上没有当前值）|

|Request-Timeout|在此输入毫秒数，在该毫秒数之后，Senec.Home 系统必须最迟在请求被中止之前回答该请求。 （默认值：5000）|
|重复尝试|您可以在此处指定发生错误时尝试查询 Senec 系统的频率。这在适配器启动时不适用 - 如果无法访问系统，适配器将停止工作。 （默认值：10）|
|轮询重试因子|此值可用于影响重试之间的间隔。以下情况适用：第 n 次重试尝试发生在间隔 *乘数* n 秒后尝试 n-1 之后。示例：使用默认值时，第一次重试发生在初始尝试后 20 秒，第二次重试发生在第一次尝试后 40 秒。成功的数据检索会重置重试计数器。|

完成配置后，使用 `SPEICHERN UND SCHLIEßEN` 退出配置对话框。
这会导致适配器重新启动。

## 实例
适配器的安装在 `Objekte` 部分中创建了 sonnen 适配器的活动实例。

可以在 ioBroker 服务器上创建多个 Senec 适配器实例。相反，一个 Senec.Home 系统也可以与多个 ioBroker 服务器一起运行。如果一个 ioBroker 服务器要控制多个设备，则应为每个系统创建一个实例。<br/><br/>适配器是否已激活并连接到系统由实例状态字段的颜色指示。如果鼠标指针指向该符号，则会显示更多详细信息。

## 适配器的对象
在 `Objekte` 区域中，集线器中适配器检测到的所有设备和活动都以树形结构列出。

对象分为以下状态。
每个数据点都与其关联的数据类型和权限一起列出。
当前只能读取权限 (R)。每个数据点至少可以被读取（R）。
要搜索特定数据点，我们建议使用组合键“STRG + F”。
根据个别系统，状态可能不存在或可能出现未记录的状态。
如果某个状态没有文档，但有人知道该状态代表什么，我会请求相应的拉取请求（或打开包含相应信息的工单）。

### 示例状态（可用状态取决于系统和软件版本，列表通常不完整）
####频道：信息
* 信息.连接

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，如果 ioBroker 和 Senec.Home 之间的连接已建立，则为真。*

####频道：_calc
该通道包含计算值。这些是当前特定数据点的每日/每周/每月/每年的值。

* xxx.ref日/周/月/年

    |数据类型|权限|
    |:---:|:---:|
    |编号|W|

   *可更改的数字指示数据的日期/周/月/年。*

* xxx.refValue/周/月/年

    |数据类型|权限|
    |:---:|:---:|
    |编号|W|

   *可变数字，表示计算当前值的参考值。*

* xxx.今天/周/月/年

    |数据类型|权限|
    |:---:|:---:|
    |编号|W|

   *可变数字代表相应数据点的当前日/周/月/年值。*

* xxx.yesterday/lastWeek/lastMonth/lastYear

    |数据类型|权限|
    |:---:|:---:|
    |编号|W|

   *代表相应数据点的前一天/周/月/年值的可变数字。*

####渠道：BMS
* BL[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示：？每个电池组。 *

* CHARGED_ENERGY[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示每个电池组已充电多少能量。单元： ？*

* CHARGE_CURRENT_LIMIT[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字，表示每个电池组的充电容量（以安培为单位）。*

* 当前 [0-3]

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示每个电池组当前有多少安培。*

* 周期[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示每个电池组有多少个充电周期。*

* DISCHARGED_ENERGY[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示电池组已输送了多少能量。单元： ？*

* DISCHARGE_CURRENT_LIMIT[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字，表示每个电池组当前具有的放电容量。*

*转发[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *指示电池组当前具有哪个固件版本的只读数字。*

* HW_EXTENSION[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字，指示相应电池组具有的硬件扩展。*

* HW_MAINBOARD[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示相应电池组的主板具有哪个硬件版本。*

* MAX_CELL_VOTAGE[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示单个电池组的最大电压。*

* MIN_CELL_VOTAGE[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示单个电池组的最小电压。*

* 序号[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示每个电池组的序列号是什么。*

* SOC[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *指示单个电池组充电状态的只读数字。*

* SOH[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *表示每个电池组健康状况的只读数字。*

*状态[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *指示每个电池组状态的只读数字。*

* TEMP_MAX[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示单个电池组的最高温度。*

* TEMP_MIN[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示单个电池组的最低温度。*

*电压[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示单个电池组的电压有多高。*

* BMS_READY_FLAG

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，如果 BMS 准备就绪则为真。*

* MODULES_CONFIGURED

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示系统中配置了多少个模块。*

* MODULE_COUNT 个

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字，表示系统中连接了多少个模块（包括未配置的模块）。*

* 开始升级

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，如果要开始更新则为真。*

* WIZARD_ABORT

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，设置过程已中断。*

*向导确认

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，设置过程已确认为真*

* WIZARD_DCCONNECT

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值是真的，设置过程？。*

* WIZARD_START

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，设置过程已经开始。*

* WIZARD_STATE

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *指示设置过程状态的只读数字。*

####频道：能源
* GUI_BAT_DATA_CURRENT

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示当前电池电流（以安培为单位）。*

* GUI_BAT_DATA_FUEL_CHARGE

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示系统的 % 级别。*

* GUI_BAT_DATA_VOLTAGE

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字指示当前电池电压（以伏特为单位）*

* GUI_BAT_DATA_POWER

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示当前有多少瓦特被放入电池或从电池中取出（负值）。*

* GUI_BOOSTING_INFO

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只有可读的布尔值，其含义尚不清楚。*

* GUI_CHARGING_INFO

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *指示电池当前是否正在充电的只读布尔值。*

* GUI_GRID_POW

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字，表示当前从电网中汲取或馈入电网的瓦数（负值）。*

* GUI_HOUSE_POW

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示房屋当前使用的瓦数。*

* GUI_INVERTER_POWER

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *指示光伏系统当前产生多少瓦特的只读数字。*

* STAT_HOURS_OF_OPERATION

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *表示系统运行时间的只读数字。*

* STAT_MAINT_REQUIRED

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *指示系统是否需要维护的只读布尔值。*

* 状态状态

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *代表系统状态的只读数字。*

* STAT_STATE_Text

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

   *只读字符串，以纯文本形式指示系统状态。不幸的是，我们只有德文的 Senec 原文。 *

#### 通道：统计
* STAT_DAY_BAT_CHARGE

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示今天电池中存储了多少千瓦时。*

* STAT_DAY_BAT_DISCHARGE

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示今天从电池中取出了多少千瓦时。*

* STAT_DAY_E_GRID_EXPORT

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示今天有多少千瓦时输入电网。*

* STAT_DAY_E_GRID_IMPORT

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示今天从电网中抽取了多少千瓦时。*

* STAT_DAY_E_HOUSE

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字，以千瓦时表示今天的家庭消费。*

* STAT_DAY_E_PV

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示今天光伏系统产生了多少千瓦时。*

####频道：SYS_UPDATE
* NPU_IMAGE_VERSION

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字，带有 Revision NPU-IMAGE 值 (*

* NPU_VER

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *与 Revision NPU-REGS 值匹配的只读数字*

*更新可用

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *仅指示更新是否可用的可读布尔值（但是，这些由 Senec 提供并自动导入）。*

####频道：向导
* APPLICATION_VERSION

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

   *只读文本，带有修订版 MCU 值。*

* CONFIG_LOADED

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *指示配置是否已加载的只读布尔值（此值不应永久为 false）。*

* 接口版本

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

   *只读文本，带有修订 GUI 值。*

* SETUP_NUMBER_WALLBOXES 个

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示系统中配置了多少个壁挂盒。*

* SETUP_WALLBOX_SERIAL[0..3]

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

   *仅可读文本，指示可能存在的任何 Wallboxes 0-3 的序列号。*

## Changelog
### 1.3.9 (Nobl)
* Added (some) Wallbox Datapoints to high-prio polling
* Added more state definitions

### 1.3.8 (NoBl)
* Removed (unnecessary) admin tab

### 1.3.7 (NoBl, noffycws, git-ZeR0)
* Updates to state translations (new values when SENEC turned off appliances)
* Added state definitions
* Added high priority datapoints: temperatures, voltages, ... to better monitor safety relevant data

### 1.3.6 (NoBl)
* Fixed log.warning error

### 1.3.5 (NoBl)
* Added more state attributes (if you have updated descriptions or anything, please open an issue!)
* Workaround in case SENEC reports bogus request data

### 1.3.4 (NoBl)
* Moved from request to axios
* Added more state attributes (if you have updated descriptions or anything, please open an issue!)

### 1.3.3 (NoBl)
* Updated to current template.

### 1.3.2 (NoBl)
* Autarky without decimal places (again). They are causing more updates than we really need.
* Autarky values won't reset to 0 at change of timeframe (day, week, ...) anymore. They are calculated based on reference values anyways.
* Ensuring that only values meant to be changeable by user are defined so (attribute changes upon the next update of value)

### 1.3.1 (NoBl) 20210513
* Added calculation of autarky for day/week/month/year

### 1.3.0 (NoBl) 20210509
* Rewrote translations handling
* Added translations for wallbox status.
* Translated status get an extra datapoint with _Text as postfix. Former translations that didn't add an extra dp will now revert to their numeric representation and add the _Text DP.
* Translations are now handled via lib/state_trans.js for all 3 languages available in the senec system (german, english, italian).
* Language used is decided by the language of the SENEC appliance.

### [Former Updates](CHANGELOG_old.md)

## License
MIT License

Copyright (c) 2022 Norbert Bluemle <github@bluemle.org>

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