---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.senec.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.senec.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/senec-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/senec-stable.svg
BADGE-Dependency Status: https://img.shields.io/david/nobl/iobroker.senec.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/nobl/ioBroker.senec/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.senec.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.senec/README.md
title: ioBroker.senec
hash: eq0tEavmZQdUHsMdoA2rp6f7fOqtYmg9DjUqwQkBieA=
---
![商标](../../../de/adapterref/iobroker.senec/admin/senec.png)

＃ioBroker.senec
##用于ioBroker的SENEC适配器
该适配器是为Senec Home V2.1系统开发的。
Senec.Home系统中无法更改任何值。故意省略了担保费用的合并。
Senec当前不再提供通过Web界面影响削峰的可靠方法。为此，必须尝试mein-senec.de。
其他系统（例如V3）是否也可以使用它取决于它们是否也基于lala.cgi并提供相同的JSON信息。
即使集成到Senec.Clound中，也无法保证仍可以通过Web界面调用数据（请参考现场报告）。

下面列出了因为它们使用相同的界面而应该工作的系统。但是，数据点可以不同（丢失，增加，更改）。

* Senec Home 4.0 /领先
* Senec Home 6.0磅
* Senec Home 8.0 /领先
* Senec主页10.0 Pb
* Senec Home 5.0 / 7.5 / 10.0 /锂
* Senec Home 15.0 /锂
* Senec Home V2 5.0 / 7.5 / 10.0
* Senec Home V2 10.0 /潜在客户
* Senec Home V2.1 1ph /锂
* Senec.Home V3 Hybrid
* Senec.Home V3 Hybrid二重奏
* Senec业务30.0 /潜在客户
* Senec Business V2 30.0 /潜在客户
* Senec Business 25.0 /锂
* Senec Business V2_2ph /锂
* Senec Business V2 3ph /锂
* ADS技术
* OEM LG
* Solarinvert Storage 10.0 /铅

### SENEC.Home
它是一个系统，其核心是锂离子电池，该电池可存储和释放屋顶上太阳能系统产生的电能。它的工作原理与智能手机，笔记本电脑或无绳螺丝刀中的电池完全相同。原则上，也使用相同的久经考验的技术。如果您在屋顶上发电的电量超过了在房屋中的使用能力，则电力不会流入电网，而是流入您的存储系统。您可以在天黑或有乌云进入并且发电量减少或减少时使用它。然后，您可以在晚上使用自己的太阳能电池操作电视或烹饪食物。

##安装前的要求
使用ioBroker操作Senec.Home存储系统的前提条件是该系统已由电工成功设置。该系统还必须与ioBroker位于同一网络中。

＃＃＃ 安装
适配器的实例是通过ioBroker管理界面安装的。
适配器实例的安装完成后，配置窗口将自动打开。

＃＃ 配置
###“主要设置”窗口
![主要设定](../../../de/adapterref/iobroker.senec/media/mainSettings.png "主要设定")

|领域|说明|
|:-------------|:-------------|
| SENEC系统|在此处输入所需的Senec.Home系统的IP地址。如果网络中有可用的DNS，则还可以指定FQDN。 |
|查询间隔高优先级|在此处输入Senec.Home系统检索高优先级的时间间隔（毫秒）。 （默认：10秒）|

|查询间隔低优先级|在此输入Senec.Home系统检索低优先级的时间间隔（毫秒）。 （默认值：60分钟）<br>危险！如果以太高的频率查询SENEC系统，则可能意味着无法再将更多数据传输到SENEC服务器！ （例如应用程式或mein-senec.de中没有当前值）|

|请求超时|在此输入毫秒数，在该毫秒数之前，最晚必须由Senec.Home系统回答该请求，然后该请求才能被取消。 （默认值：5000） |
|重试尝试|在此您可以指定在发生错误时应多久尝试查询Senec系统一次。启动适配器时，此方法不适用-如果无法访问系统，则适配器将终止其工作。 （默认值：10） |
|轮询重复因子|此值可用于影响重复尝试之间的间隔。适用以下规则：第n次重复尝试发生在间隔n乘数*尝试n-1之后n秒之后。示例：使用标准值，第一次重试将在初始尝试后20秒发生，而第二次重试将在1次尝试后40秒发生。成功的数据检索将重置重复计数器。 |

完成配置后，使用`SPEICHERN UND SCHLIEßEN`退出配置对话框。
然后，这将重新启动适配器。

##个实例
适配器的安装已在`Objekte`节中创建了Sonnen适配器的活动实例。

可以在ioBroker服务器上创建多个Senec适配器实例。相反，Senec.Home系统也可以与多个ioBroker服务器一起运行。如果一台ioBroker服务器要控制多个设备，则应为每个系统创建一个实例。<br/><br/>实例的状态字段的颜色指示适配器是否已激活并已连接到系统。如果鼠标指针指向该符号，则会显示更多详细信息。

##适配器的对象
在`Objekte`部分中，树状结构中列出了集线器中适配器识别的所有设备和活动。

在下文中，对象被分成状态。
列出每个数据点及其关联的数据类型及其授权。
当前只能读取权限（R）。每个数据点至少可以读取（R）。
要搜索特定的数据点，我们建议使用组合键“ CTRL + F”进行搜索。
根据各个系统的不同，状态可能不存在，也可能出现未记录的状态。
如果没有关于某个州的文档，但是有人知道该州代表什么，请给我发送请求请求（或打开包含相关信息的票证）。

###示例状态（可用状态取决于系统和软件版本）
####频道：信息
*信息连接

    |数据类型|权限|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值，如果在ioBroker和Senec.Home之间建立了连接，则为true。

####频道：_calc
该通道包含计算值。当前这些是某些数据点的每日/每周/每月/每年的值。

* xxx.ref日/周/月/年

    |数据类型|权限|
    |:---:|:---:|
    |号| W |

   *可更改的数字，指示数据适用的日期/星期/月份/年份。

* xxx.ref值/周/月/年

    |数据类型|权限|
    |:---:|:---:|
    |号| W |

   *可更改的数字，指示用于计算当前值的参考值。

* xxx.today/week/month/year

    |数据类型|权限|
    |:---:|:---:|
    |号| W |

   *可更改的数字，代表相应数据点的日/周/月/年的当前值。

* xxx。昨天/上周/上月/上年

    |数据类型|权限|
    |:---:|:---:|
    |号| W |

   *可更改的数字，代表相应数据点的日/周/月/年的先前值。

####频道：BMS
* BL [0-3]

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *注明以下内容的可读数字：每个电池组*

* CHARGED_ENERGY [0-3]

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读的数字，表示每个电池组已充电了多少能量。单元： ？*

* CHARGE_CURRENT_LIMIT [0-3]

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读数字，指示每个电池组的充电容量以安培为单位。

*当前[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读的数字，指示每个电池组当前具有的安培数。

*循环[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读的数字，表示每个电池组有多少个充电周期。

* DISCHARGED_ENERGY [0-3]

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读的数字，表示从电池组中消耗了多少能量。单元： ？*

* DISCHARGE_CURRENT_LIMIT [0-3]

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *表示每个电池组当前放电容量的可读数字*

*固件[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读的数字，指示电池组当前具有的固件版本。

* HW_EXTENSION [0-3]

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读数字，指示相应电池组具有的硬件扩展。

* HW_MAINBOARD [0-3]

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读数字，指示相应电池组主板的硬件版本。

* MAX_CELL_VOTAGE [0-3]

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读数字，指示单个电池组的最大电压。

* MIN_CELL_VOTAGE [0-3]

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读数字，指示单个电池组的最低电压。

*序列号[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *只读数字，显示单个电池组的序列号。

* SOC [0-3]

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *指示单个电池组充电状态的可读数字。

* SOH [0-3]

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读的数字，指示单个电池组的健康状态。

*状态[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *指示单个电池组状态的可读数字*

* TEMP_MAX [0-3]

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读数字，指示单个电池组的最高温度。

* TEMP_MIN [0-3]

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读数字，指示单个电池组的最低温度。

*电压[0-3]

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读的数字，指示单个电池组的电压是多少。

* BMS_READY_FLAG

    |数据类型|权限|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值，如果BMS准备就绪，则为true。

* MODULES_CONFIGURED

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读的数字，指示系统中配置了多少个模块。

* MODULE_COUNT

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读的数字，指示系统中连接了多少个模块（包括未配置的模块）

* 开始升级

    |数据类型|权限|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值，如果要开始更新，则为true。

* WIZARD_ABORT

    |数据类型|权限|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值，如果设置过程被中断，则为true。

* WIZARD_CONFIRM

    |数据类型|权限|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值（为true），已确认设置过程。

* WIZARD_DCCONNECT

    |数据类型|权限|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值，设置过程是否正确？

* WIZARD_START

    |数据类型|权限|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值，在开始设置过程时为true。

* WIZARD_STATE

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *只读数字，指示设置过程的状态。

####频道：ENERGY
* GUI_BAT_DATA_CURRENT

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读的数字，显示当前电池电流（以安培为单位）。

* GUI_BAT_DATA_FUEL_CHARGE

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读的数字，指示系统液位的百分比。

* GUI_BAT_DATA_VOLTAGE

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *只读数字，以伏特表示当前电池电压*

* GUI_BAT_DATA_POWER

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读的数字，指示当前正在向电池供电或从电池中抽出的瓦数（负值）。

* GUI_BOOSTING_INFO

    |数据类型|权限|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值，其含义尚不清楚。

* GUI_CHARGING_INFO

    |数据类型|权限|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值，指示电池当前是否正在充电。

* GUI_GRID_POW

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读数字，指示当前从电网汲取或馈入电网的瓦数（负值）。

* GUI_HOUSE_POW

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读数字，指示房屋当前正在使用多少瓦特*

* GUI_INVERTER_POWER

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读数字，指示光伏系统当前正在产生多少瓦特。

* STAT_HOURS_OF_OPERATION

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读的数字，显示系统已运行的小时数。

* STAT_MAINT_REQUIRED

    |数据类型|权限|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值，指示系统是否需要维护。

* STAT_STATE

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *代表系统状态的可读数字。

* STAT_STATE_Text

    |数据类型|权限|
    |:---:|:---:|
    |字符串| R |

   *只读字符串，以纯文本形式指定系统的状态。不幸的是，我们只有德文的Senec原始文本。

####频道：STATISTIC
* STAT_DAY_BAT_CHARGE

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读的数字，指示今天的电池已存储了多少kWh。

* STAT_DAY_BAT_DISCHARGE

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读的数字，表示今天从电池中获取了多少千瓦时。

* STAT_DAY_E_GRID_EXPORT

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读的数字，指示今天已将多少千瓦时馈入电网。

* STAT_DAY_E_GRID_IMPORT

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读的数字，指示今天从电网抽出了多少千瓦时。

* STAT_DAY_E_HOUSE

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读的数字，以kWh为单位指示当今的房屋消耗。

* STAT_DAY_E_PV

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读的数字，表示今天的光伏系统产生了多少千瓦时。

####频道：SYS_UPDATE
* NPU_IMAGE_VERSION

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *仅可读取的数字，其值为修订版NPU-IMAGE（*

* NPU_VER

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *仅对应于修订版NPU-REGS的值的可读数字*

* UPDATE_AVAILABLE

    |数据类型|权限|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值，指示是否有更新（但是，这些值由Senec提供，并且也自动导入）。

####频道：向导
* APPLICATION_VERSION

    |数据类型|权限|
    |:---:|:---:|
    |字符串| R |

   *仅可读文本，带有修订版MCU的值。

* CONFIG_LOADED

    |数据类型|权限|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值，指示是否已加载配置（此值不应永久设置为false）。

* INTERFACE_VERSION

    |数据类型|权限|
    |:---:|:---:|
    |字符串| R |

   *仅可读文本，其值为Revision GUI。

* SETUP_NUMBER_WALLBOXES

    |数据类型|权限|
    |:---:|:---:|
    |号| R |

   *可读的数字，指示系统中配置了多少个壁箱。

* SETUP_WALLBOX_SERIAL [0..3]

    |数据类型|权限|
    |:---:|:---:|
    |字符串| R |

   *仅可读的文本，指示任何壁挂式墙0-3的序列号。

## Changelog
### 1.3.0 (NoBl) 20210509
* Rewrote translations handling
* Added translations for wallbox status.
* Translated status get an extra datapoint with _Text as postfix. Former translations that didn't add an extra dp will now revert to their numeric representation and add the _Text DP.
* Translations are now handled via lib/state_trans.js for all 3 languages available in the senec system (german, english, italian).
* Language used is decided by the language of the SENEC appliance.

### 1.2.0 (NoBl)
* Added datapoints for: PM1OBJ1, PM1OBJ2, EG_CONTROL, RTC, PM1, TEMPMEASURE, DEBUG, SOCKETS, CASC, WALLBOX, CONNX50, STECA (please report wrong / missing units).
* Adapter now calculates day/week/month/year-values for: STATISTIC.LIVE_GRID_EXPORT, STATISTIC.LIVE_GRID_IMPORT, STATISTIC.LIVE_HOUSE_CONS, STATISTIC.LIVE_PV_GEN, STATISTIC.LIVE_BAT_CHARGE_MASTER, STATISTIC.LIVE_BAT_DISCHARGE_MASTER. Calculated values can be found below the "_calc." datapoint. Information about daily values was removed from the API by SENEC in the past. So here we go again ...

### 1.1.1 (NoBl)
* Object attributes are updated to what they are expected to be: unit, description, datatype (this will break anything that still relies on datapoints being STRING that aren't meant to be string)

### 1.1.0 (NoBl)
* Updated to current adapter template
* Integrated GitHub Testing and auto npm publishing
* Some other administrative updates

### [Former Updates](CHANGELOG_old.md)

## License
MIT License

Copyright (c) 2021 Norbert Bluemle <github@bluemle.org>

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