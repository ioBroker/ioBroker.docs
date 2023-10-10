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
hash: lPhvRxmCZ97hIJebFR+ZOLkO2KlNPT2USj+qiRkRWE0=
---
![标识](../../../de/adapterref/iobroker.senec/admin/senec.png)

# IoBroker.senec
## IoBroker 的 SENEC 适配器
该适配器是为 Senec Home V2.1 系统开发的。
Senec.Home 系统中无法更改任何值。故意避免包含安全载荷。
Senec 目前不再提供通过 Web 界面影响调峰的可靠方法。为此，mein-senec.de 必须做出努力。
其他系统（例如V3）是否也可以使用它取决于它们是否也基于lala.cgi并提供相同的JSON信息。
即使集成到Senec.Clound中，也不能保证仍然可以通过Web界面访问数据（请参阅经验报告）。

下面列出了由于使用相同接口而可能工作的系统。然而，数据点可能不同（缺失、附加、更改）。

* Senec Home 4.0 / 领先
* Senec Home 6.0 铅
* Senec Home 8.0 / 领先
* Senec Home 10.0 铅
* Senec Home 5.0/7.5/10.0 / 锂
* Senec Home 15.0 / 锂
* Senec家庭V2 5.0/7.5/10.0
* Senec Home V2 10.0 / 领先
* Senec Home V2.1 1ph / 锂
* Senec.Home V3 混合动力
* Senec.Home V3 混合动力二重奏
* Senec 商业 30.0/铅
* Senec Business V2 30.0 / 领先
* Senec Business 25.0 / 锂
* Senec Business V2_2ph / 锂
* Senec Business V2 3ph / 锂
*ADS 技术
*OEM LG
* 太阳能逆变储能10.0/铅

## 免责声明
**所有产品和公司名称或徽标均为其各自所有者的商标™或注册®商标。他们的使用并不意味着他们或他们的附属公司有任何从属关系或认可！这个个人项目是在您的空闲时间进行的，没有商业目的。

### SENEC.Home
该系统的核心是锂离子电池，用于存储和释放屋顶太阳能系统产生的电力。其工作原理就像智能手机、笔记本电脑或无绳螺丝刀中的电池一样。原则上，它也包含相同的成熟技术。如果屋顶上产生的电力比房屋中使用的电力多，则电力不会流入电网，而是流入您的存储系统。当天黑或云层聚集并且发电量减少或不再发电时，您可以使用它。然后您可以使用自己的太阳能来操作电视或在晚上做饭。

## 安装前的先决条件
使用ioBroker操作Senec.Home存储系统的先决条件是该系统已由电工成功设置。该系统还必须与 ioBroker 位于同一网络中。

＃＃＃ 安装
适配器的实例是通过 ioBroker 管理界面安装的。
完成适配器实例的安装后，配置窗口会自动打开。

＃＃ 配置
### 常规设置窗口
![主要设置](../../../de/adapterref/iobroker.senec/media/mainSettings.png "常规设置")

|领域 |描述 |
|:-------------|:-------------|
|SENEC 系统 |所需 Senec.Home 系统的 IP 地址将在此处指定。如果网络中存在正常运行的 DNS，则还可以指定 FQDN。 |
|使用https？|如果SENEC系统已经转换为https，则必须激活此选项。|
|查询间隔高优先级|在此输入 Senec.Home 系统检索高优先级项目的时间间隔（毫秒）。 （默认：10 秒）|

|低优先级查询间隔|在此输入 Senec.Home 系统检索低优先级项目的时间间隔（毫秒）。 （默认：60 分钟）<br>危险！如果 SENEC 系统查询频率过高，则可能意味着数据无法再传输到 SENEC 服务器！ （例如，应用程序或 mein-senec.de 上没有当前值）|

|请求超时|在此输入毫秒数，在该毫秒数之后，Senec.Home 系统必须应答请求，然后请求才会被取消。 （默认：5000）|
|重试尝试次数|这指定在发生错误时应尝试查询 Senec 系统的频率。这在启动适配器时不适用 - 如果系统不可访问，适配器将停止工作。 （默认：10）|
|轮询重试因子|此值可用于影响重试之间的间隔。适用以下情况：第 n 次重复尝试发生在尝试 n-1 后的间隔 *乘数* n 秒之后。示例：使用默认值，第一次重试发生在初始尝试后 20 秒，第二次重试发生在第一次重试后 40 秒。成功的数据检索将重置重试计数器。  |

完成配置后，将退出配置对话框并显示`SPEICHERN UND SCHLIEßEN`。
然后这将重新启动适配器。

### “附加 HighPrio 轮询数据点”窗口
![轮询设置](../../../de/adapterref/iobroker.senec/media/pollingSettings.png "额外的 HighPrio 轮询数据点")

|领域 |描述 |
|:-------------|:-------------|
|免责声明 |为了更改适配器的轮询行为，您必须确认您了解可能的风险，并且您愿意且知情地接受这些风险。适配器的开发者不承担任何责任。 |
|不同区域的数据点|您可以在此处指定应以高优先级检索的其他数据点。仅字符 A-Z 和数字 0-9 以及 , 可以用于分隔。 |
|将数据点添加到轮询？|在此再次确认您确实想要将指定的数据点添加到高优先级的轮询中。|

危险！如果 SENEC 系统查询频率过高和/或数据点过多，可能会导致数据无法再传输到 SENEC 服务器（例如，应用程序或 mein-senec 上没有当前值） .de）！ SENEC 系统还可能无动力地重新启动和/或不再响应请求。在这种情况下，停止适配器然后更正设置会有所帮助。

完成配置后，将退出配置对话框并显示`SPEICHERN UND SCHLIEßEN`。
然后这将重新启动适配器。

## 实例
适配器的安装在`Objekte`区域中创建了Senec适配器的活动实例。

可以在 ioBroker 服务器上创建多个 Senec Adapter 实例。相反，Senec.Home 系统也可以与多个 ioBroker 服务器一起运行。如果一台ioBroker服务器要控制多台设备，则应为每个系统创建一个实例。<br/><br/>适配器是否已激活并连接到系统由实例状态字段的颜色指示。如果鼠标指针指向该符号，则会显示更多详细信息。

## 适配器的对象
在`Objekte`区域中，集线器中适配器识别的所有设备和活动都以树形结构列出。

然后对象被划分为状态。
每个数据点都列出了其关联的数据类型和权限。
目前权限只能读取 (R)。每个数据点至少可以被读取(R)。
要搜索特定数据点，我们建议使用组合键“CTRL + F”进行搜索。
根据各个系统的不同，状态可能不存在，或者可能出现未记录的状态。
如果某个状态没有文档，但有人知道该状态代表什么，请提交拉取请求（或打开包含相关信息的票证）。

### 示例状态（可用状态取决于系统和软件版本，列表通常不完整）
#### 频道：信息
* 信息.连接

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，当ioBroker和Senec.Home建立连接时为true。*

#### 频道：_calc
该通道包含计算值。不再提供，因为 STATISTIC 不再可用。

#### 通道：BMS
* BL[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *只读数字表示：？对于每个电池组。*

* CHARGED_ENERGY[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *仅可读数字，表示每个电池组已充电了多少能量。单元： ？*

* CHARGE_CURRENT_LIMIT[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *仅可读数字表示每个电池组的充电容量（以安培为单位）。*

* 当前[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *只读数字仅指示每个电池组当前有多少安培。*

* 周期[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *只读数字表示每个电池组有多少个充电周期。*

* DISCHARGED_ENERGY[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *仅可读数字表示电池组已消耗了多少能量。单元： ？*

* 放电电流限制[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *仅可读数字表示每个电池组当前的放电容量。*

* 固件[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *只读数字，指示电池组当前具有的固件版本。*

* HW_扩展[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *仅可读数字指示相应电池组具有哪个硬件扩展。*

* HW_主板[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *仅可读数字指示相应电池组主板的硬件版本。*

* 最大电池电压[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *只读数字，表示单个电池组的最大电压。*

* 最小电池电压[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *只读数字，表示单个电池组的最小电压。*

*序列号[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *只读数字，指示各个电池组的序列号。*

* SOC[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *只读数字，指示各个电池组的充电状态。*

* SOH[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *只读数字，指示每个电池组的健康状态。*

* 状态[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *只读数字指示每个电池组的状态。*

* 温度最大值[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *只读数字，表示每个电池组的最高温度。*

* TEMP_MIN[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *只读数字，表示单个电池组的最低温度。*

* 电压[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *只读数字仅指示单个电池组的电压有多高。*

* BMS_READY_FLAG

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，如果 BMS 准备就绪，则为 true。*

* 模块_配置

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *只读数字，表示系统中配置了多少个模块。*

* MODULE_COUNT

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *只读数字，表示系统中连接了多少个模块（包括未配置的模块）。*

* 开始升级

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，如果要开始更新则为 true。*

* 向导_中止

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，为真，设置过程被中断。*

* 向导_确认

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，为true，设置过程已确认。*

* 向导_DCCONNECT

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值哪个为真，设置过程？.*

* WIZARD_START

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，设置过程开始时为 true。*

* 向导状态

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *可读数字仅指示设置过程的状态。*

#### 频道：能源
* GUI_BAT_DATA_CURRENT

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *只读数字，表示当前电池电流（以安培为单位）。*

* GUI_BAT_DATA_FUEL_CHARGE

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *可读数字仅表示系统的百分比水平。*

* GUI_BAT_数据_电压

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *只读数字，表示当前电池电压（以伏特为单位）*

* GUI_BAT_数据_电源

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *只读数字，指示当前向电池输入或从电池取出多少瓦特（负值）。*

* GUI_BOOSTING_INFO

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *仅可读的布尔值，其含义尚不清楚。*

* GUI_CHARGING_INFO

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，指示电池当前是否正在充电。*

* GUI_GRID_POW

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *仅可读数字，指示当前从电网汲取或馈入电网的瓦数（负值）。*

* GUI_HOUSE_POW

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *仅供可读数字，表示房屋当前使用的瓦数。*

* GUI_逆变器_电源

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *只读数字仅指示光伏系统当前产生的瓦数。*

* STAT_HOURS_OF_OPERATION

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *指示系统运行时间的只读数字。*

* STAT_MAINT_REQUIRED

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，指示系统是否需要维护。*

* 状态状态

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *仅供可读数字，代表系统状态。*

* STAT_STATE_文本

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

   *只读字符串，以纯文本形式指示系统状态。不幸的是，我们只有德语版的 Senec 文本。*

#### 频道：统计
不复存在

#### 频道：SYS_UPDATE
* NPU_IMAGE_VERSION

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *只读编号，带有修订版 NPU-IMAGE 的值 (*

* NPU_版本

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *对应于修订版 NPU-REGS 值的只读数字*

* 更新可用

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *仅可读的布尔值，指示更新是否可用（但是，这些是由 Senec 提供的，并且也会自动安装）。*

#### 频道：向导
* 应用程序_版本

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

   *仅限可读文本，具有修订版 MCU 的值。*

* 配置_加载

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，指示配置是否已加载（该值不应永久为 false）。*

* 接口版本

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

   *仅限可读文本，具有修订 GUI 的值。*

* SETUP_NUMBER_WALLBOXES 个

    |数据类型|权限|
    |:---:|:---:|
    |数字|R|

   *仅可读数字，表示系统中配置了多少个墙盒。*

* 设置_WALLBOX_SERIAL[0..3]

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

   *仅可读文本指示任何壁箱 0-3 的序列号。*

## Changelog
### 1.6.7 (NoBl)
* Added option to turn off local polling.

### 1.6.6 (NoBl)
* Node 16 required
* Bugfixes
* Removed non-existing branches: _calc, Bat1Obj[2-4], Display, Statistic, File
* Added branches: CURRENT_IMBALANCE_CONTROL, BMZ_CURRENT_LIMITS, CELL_DEVIATION_ROC, SENEC_IO_OUTPUT, SENEC_IO_INPUT

### 1.6.5 (NoBl)
* Added AllTime Statistics (trigger initial calculations in adapter settings)
* https is now default for new instances

### 1.6.4 (NoBl)
* Bugfix (numbers are numbers again)

### 1.6.3 (NoBl)
* Code optimization

### 1.6.2 (NoBl)
* Added statistics values from API along with some own calculations.

### 1.6.1 (NoBl)
* Bugfixes

### 1.6.0 (NoBl)
* Added option to also poll SENEC App API. This requires user credentials for mein-senec.de
* We are starting with just some information - more to follow. But with Dashboard we at least have current values and day statistics back.

### 1.5.1 (NoBl)
* Added more datapoints. If you experience messages in log - feel free to add them yourself to state_attr on github (pull request)
* Autarky calculations will stopp working because SENEC removed STATISTICS branch.
* If you experience issues with connecting to your appliance after it got updated, please activate https connection in settings.

### 1.5.0 (NoBl)
* Added configuration section to add datapoints to high priority polling. Please be aware of the possible issues this could cause (if too many datapoints added) and use at your own risk.
* ALL Wallbox datapoints have been removed from high priority polling. Only some users even have a SENEC wallbox. Please reconfigure via the new config dialogue.
* Possible Candidate for stable. Please report any findings!

### 1.4.3 (NoBl)
* Working on https connection. Please test and report!

### 1.4.2 (NoBl)
* Added option to use https for connecting to SENEC (only activate if your appliance supports / requires this!)

### 1.4.1 (NoBl)
* Fix: Autarky calculations are working again.

### 1.4.0 (NoBl)
* Added object caching along with some minor code updates. Due to the amount of objects we deal with caching is about mandatory.

### 1.3.10 (NoBl)
* Fixed wrong Unit for STATISTIC.LIVE_WB_ENERGY
* Updated to json Admin UI
* Technical Updates
* Added more state_attr definitions

### [Former Updates](CHANGELOG_old.md)

## License
MIT License

Copyright (c) 2023 Norbert Bluemle <github@bluemle.org>

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