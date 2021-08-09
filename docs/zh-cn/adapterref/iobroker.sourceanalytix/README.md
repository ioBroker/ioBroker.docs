---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sourceanalytix/README.md
title: 来源分析
hash: LLPnGzrlZ1I5NA2VHediHsTe4UoQfTn1ioqqIKEUK98=
---
# 来源分析

![NPM 版本](http://img.shields.io/npm/v/iobroker.sourceanalytix.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sourceanalytix.svg)
![安装数量（最新）](http://iobroker.live/badges/sourceanalytix-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/sourceanalytix-stable.svg)
![依赖状态](https://img.shields.io/david/DrozmotiX/iobroker.sourceanalytix.svg)
![新产品管理](https://nodei.co/npm/iobroker.sourceanalytix.png?downloads=true)

[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/sourceanalytix/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)![测试和发布](https://github.com/DrozmotiX/ioBroker.coronavirus-statistics/workflows/Test%20and%20Release/badge.svg)

**此适配器使用服务 [Sentry.io](https://sentry.io) 自动向作为开发人员的我报告异常和代码错误以及新设备架构。** 更多详细信息见下文！

能源、气体和液体消耗量的详细分析任何来源（千瓦时、瓦时、瓦特、升/小时或立方米）均可用于数据分析：

＃＃ 特征
#### 基本功能
|状态 |功能|说明 |
|--|--|--|
| >device<.cumulativeReading | [累积值](#cumulativereading) |计算累计值<br/>包括[转换](#valuetransformation)<br/>累积值可以通过以下[这些步骤](#cumulativereading-reset) |
| &gt;设备&lt;.&gt;年&lt;.&gt;当前年| [本年统计](#current-period) |将当前年份的统计信息存储在级别<br/>&gt;device.&gt;currentYear&lt;.&gt;选择的时间段&lt; |
| &gt;Year&lt;.&gt;currentYear.&gt;消费类型&lt; | [消费](#consumptioncalculation) |存储消费数据的根文件夹<br/>（当前值 - 先前值）。<br/>可消费或送货|
| &gt;Year&lt;.&gt;currentYear.&gt;成本类型&lt; | [费用](#costcalculation) |用于存储成本数据的根文件夹。<br/>现值*成本+基本价格<br/>可消费或送货|
| &gt;Year&lt;.&gt;currentYear.&gt;成本类型&lt; | [成本](#costcalculation) |用于存储成本数据的根文件夹。<br/>现值*成本+基本价格<br/>可消费或送货|

所有州位置均按州名称分组，并以句点和 [类别](#categories) 结构分隔。<br/>将自动处理计算并将值转换为 [价格定义](#price-definitionsprice-definitions) 中定义的适当单位。

如果您有任何问题，请先阅读**[故障排除](#troubleshooting)**！

＃＃ 如何
### 状态激活
![主要设置](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/settingKey.png)

![主要设置](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/stateSettings.png)

|配置项 |说明 |
|--|--|
|启用 | SourceAnalytix 的激活状态 |
|别名 |默认：状态名称，设备名称如 SA|
|选择类型 |强制，选择你的计算类型根据[价格定义](#price-definitions)计算|
|选择单位 |默认：自动，需要时手动选择（查看日志）|
|成本 |成本计算 |
|带（出）基本费用|包括成本计算中的基本费用|
|消费|计算消费数据|
|计数器值 |存储当前计数器值 | |抄表在<br/>x 的开头：|要处理的特定时间段的计数器的起始值<br/>计算电流 - startValue|

### 基本配置（适配器实例）
![主要设置](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/mainSettings.png)

####累积阅读
*待办事项：描述逻辑*

####消费计算
*待办事项：描述逻辑*

####成本计算
*待办事项：描述逻辑*

#### 值转换
*ToDo：文档链接到库（文档库也是！）*<br/> *待办事项：记录瓦特到千瓦时的转换*<br/> *ToDo : 文档单位转换（如瓦特，到瓦时到千瓦时）*

#### 年统计
存储年度级别的消费/价格和/或成本/收益的统计信息<br/>&gt;&gt;&gt;device.&gt;thisYear&lt;.&gt;category&lt;.&gt;selected period

此信息通常用于数据存储和历史比较。<br/>状态按指定时期分组（如 2020 年与 2021 年，矿石 2019 年 2 月与 2 月等）

&gt;#### *周*<br/> &gt;设备&lt;.&gt;年&lt;.&gt;成本/收入<br/>&gt; 消费/交付&lt;.weeks.**weekNr**&lt; &gt;#### *Months*<br/> &gt;设备&lt;.&gt;年&lt;.&gt;成本/收入<br/>&gt; 消费/交付&lt;.月.**月**&lt; &gt;#### *季度*<br/> &gt;设备&lt;.&gt;年&lt;.&gt;成本/收入<br/>&gt; 消费/交付&lt;.四分之一.**Qx**&lt;

＃＃＃＃ 现时阶段
将当前年份的统计信息存储在级别：>device.>currentYear<.>selected period

&gt;#### *周*<br/> &gt;设备&lt;.&gt;年&lt;.&gt;成本/收入<br/>&gt; 消费/交付&lt;.weeks.**weekNr**&lt; &gt;#### *Months*<br/> &gt;设备&lt;.&gt;年&lt;.&gt;成本/收入<br/>&gt; 消费/交付&lt;.月.**月**&lt; &gt;#### *季度*<br/> &gt;设备&lt;.&gt;年&lt;.&gt;成本/收益&gt;消耗/交付&lt;.季度.**Qx**&lt;

此信息通常用于每日/每周/每月计算<br/>按指定时期分组的成本/收益和/或消耗/交付

>待办事项：添加截图<

#### 类别
|类别 |类型 |说明 |
|--|--|--|
|成本|金融|计算结果*成本价+基本价|
|收益|金融|计算值*收益价格+基本价格的结果|
|消费|计算|计算值的结果作为成本 - 起始值<br/>年/月/季度等|
|交货 |计算|作为交货的计算值的结果 - 起始值<br/>年/月/季度等|

＃＃＃ 故障排除
在我们开始故障排除之前，了解源 analytix 如何初始化很重要，因为这里可能会发生错误，请参阅问题部分。
将处理以下序列：

1) 启动 SourceAnalytix 2) 列出为 SourceAnalytix 激活的所有状态 3) 启动状态，对于每个状态：

* 读取当前累计读数<br/>

      （如果存在）和来自状态的内存值

    * 检查是否可以处理单位{问题 1}
    * 检查是否选择了成本类型{问题 2}
    * 验证成本类型是否存在有效的价格定义{问题 3}
    * 检查是否先前的初始值 > 当前累积值 {问题 4}
    * 检查先前设备重置的有效已知值 > 当前累积值 {问题 5}
    * 将所有数据存储到内存中

4）为每个状态初始化状态：

    * 创建状态累积读数（用于存储计算结果，也可以仅用于 W 到 kWh）{问题 6}
    * 创建在状态配置中选择的状态{问题 7}
    * 开始计算

5) 关于状态改变/更新

    * 验证信息是否正确
    * 将值转换为适当的单位（状态单位到状态配置中选择的单位）
    * 检查值输入是否正确（当前值 **>** previousInit 值）{参见 **7 At device reset** Issue 8}
    * 计算{问题 9}
      * 对于瓦特：计算瓦特到千瓦时，计算 cumulatedReading = currentReading + cumulatedReading
      * 对于其他：计算 cumulatedReading = currentReading + previousDeviceReset（如果存在）

6) 晚上 (00.00)

    * 列出所有启用 SourceAnalytix 的状态
    * 重置开始（日/周/年/月）值

7) 在设备复位时

* 将当前值存储为 previousDeviceReset 和 previousInit 值<br/>

如果设备将再次复位（由 previousInit 值检测），<br/> currentReading + previousDeviceReset 存储为previousDeviceReset。

**问题 1** 没有为 ..... 定义单位，无法执行计算<br/>请在状态设置中选择正确的单位

**问题 2** 没有为 ..... 定义成本类型，请在状态设置时选择计算类型<br/>请选择想要的成本类型以了解应该使用多少金额来处理计算

**问题 3** 所选类型 ... 不存在于价格定义中<br/>现在找到了所选成本类型的价格定义，请验证您的价格设置（适配配置）

**问题 4** 检查 ..... 的设置！已知初始值 : ..... &gt; 已知累积值 ..... 无法继续<br/>已知初始值 &gt; 已知累积值，这可以通过在状态原始对象中删除或修改这些对象来解决

```"valueAtDeviceInit": xxxx```

**问题 5** 检查 ..... 的设置！已知值AtDeviceReset : ..... &gt; 已知累积值 ..... 无法继续<br/>已知初始值 &gt; 已知累积值，这个可以解决<br/>删除或修改状态原始对象中的这些对象

```valueAtDeviceReset": xxxx```

**问题 6** 未创建累积读取状态<br/>状态初始化失败，请参阅问题 1 到 5

**问题 7** 未创建成本读数 ae 的状态<br/>状态设置中未启用计算类型![主要设置](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/stateSettings.png)

### 价格定义
![主要设置](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/priceSettings.png)

**问题 8** 当前值 **&lt;** previousInit<br/>检测到设备复位，请参阅功能 7

**问题 9** 我的计算不正确<br/>

####cumulativeReading-Reset 1) 验证是否选择了正确的单位（未选择，SA 将尝试自动检测） 2) 验证 cumulatedReading 是否反映了您的值读数的正确总值，如果不是<br/>
        - 停止 SA
        - 转到选项卡对象

          ![主要设置](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/cumulativeReading-Reset.png)

        - 进入专家模式
        - 改变累积读数
        - 退出专家模式
        - 确保正确设置起始值
- 启动 SA<br/>

3) 确保正确设置起始值<br/>SA 通过 cumulatedReading 处理计算 - 在周期开始时已知的 cumulatedReading。<b/>这些起始值在状态设置中定义，并且应该小于 **currentReading**<br/>请确保累积读数 &gt;= DayStart &gt;= WeekStart &gt;= MonthStart &gt;= QuarterStart &gt;= YearStart ![主要设置](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/stateStartValues.png)</b>

4）验证状态原始对象中的这些值：

```valueAtDeviceReset": xxx```

```"valueAtDeviceInit": xxx```

<!-- **问题 6** 设置 - 无法停用 SourceAnalytix 的状态

我是 RAW NUR“消费”：错误的 umgestellt，gespeichert。 Das wurde behalten (wo ggf. noch nicht false, auch bei "enabled": false und bei "costs": false ) In der Objekt-Übersicht ist der Schraubenschlüssel nachwievor blau。 Dann mit dem Schraubenschlüssel in das Objekt, SA war nicht der Haken bei aktiviert drin。 Dort einmal auf aktiviert, nicht speichern, wieder auf deaktiviert, speichern。
Kontrolle im RAW, ob SA-EIntrag nun weg => jup, is nun fott -->

<!--

* 每天、每周、每月、每季度、每年跟踪消费情况
* 计算成本（当前价格可配置）
* 可用于功耗、液体和气体
* 输入值可以是 wh/kWh/Watt/m3/l

-->

由于 pix 在 2016 年 https://forum.iobroker.net/viewtopic.php?f=21&t=2262

已由 `@hadering` 改进并发布在 github https://github.com/hdering/homematic_verbrauchszaehler

＃＃ 去做
* [ ] 文档！
* [ ] 周期计算可选择但尚未实施
* [ ] 计算中尚未实施的每月成本价
* [ ] 根据仪表值重新计算（可按日期配置）
* [ ] 添加前 [x] 天、[x] 周、[x] 月、[x] 季度、[x] 年的对象状态可在适配器设置中配置

＃＃ 支持我
如果您喜欢我的作品，请考虑个人捐赠（这是 DutchmanNL 的个人捐赠链接，与 ioBroker 项目无关！）[![捐赠](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/master/admin/button.png)](http://paypal.me/DutchmanNL)

## 什么是 Sentry.io 以及向该公司的服务器报告什么？
Sentry.io 是一项服务，供开发人员了解其应用程序中的错误。而这正是在这个适配器中实现的。

当适配器崩溃或发生任何其他代码错误时，ioBroker 日志中也出现的此错误消息将提交给 Sentry。当您允许 iobroker GmbH 收集诊断数据时，您的安装 ID（这只是一个唯一 ID **没有**关于您的任何其他信息、电子邮件、姓名等）也包括在内。这允许 Sentry 对错误进行分组并显示受此类错误影响的唯一用户数量。所有这些都帮助我提供了基本上从不崩溃的无错误适配器。

<!-- 下一版本的占位符（在行首）：

### __工作进行中__ -->

## Changelog

### 0.4.9 (2021-05-31)
* (DutchmanNL) Added support for Admin 5 (Requires Admin >= 5.1.2)
* (Bluefox) Fix error in admin

### 0.4.8 (2021-01-20)
#### Breaking changes
* (DutchmanNL) Breaking!!! Move current values to currentYear [#135](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/135)
* (DutchmanNL & ToTXR4Y) MajorChange !: Replaced **Current_Reading** with **CumulativeReading** [226](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/226)

#### New Features
* (DutchmanNL) Code cleanup
* (DutchmanNL) Add back "currentYear"
* (DutchmanNL) (debug) Logging improved
* (DutchmanNL) Weekly reset of weekdays
* (DutchmanNL) Calculation for all states
* (DutchmanNL) change default log-level to info
* (DutchmanNL) Calculation for previous states [#242](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/242)
* (DutchmanNL) Optimized error reporting (Sentry)
* (DutchmanNL) Removed unneeded settings in configuration
* (DutchmanNL) Implemented new configuration for "currentYear"
* (DutchmanNL & ToTXR4Y) implement "05_currentYear" in year root folder [#280](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/280)
* (DutchmanNL) Implemented category cumulative values under year statistics
* (DutchmanNL & ToTXR4Y) implement cached memory slot for initialisation value [#226](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/226)
* (DutchmanNL & ToTXR4Y) Implement log messages if state attributes are changed
* (DutchmanNL & ToTXR4Y) Implement automatically detection of currency from admin settings [#247](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/247)

#### BugFixes
* (DutchmanNL) Bugfix : dev: 0 bug workaround
* (DutchmanNL) Do not round cumulated reading
* (DutchmanNL) Bugfix : delete states in create function
* (DutchmanNL) Bugfix : quarters.1 has no existing object
* (DutchmanNL) Bugfix : Calculations for "previous" values
* (DutchmanNL) Bugfix : Incorrect initialisation for states
* (DutchmanNL) Bugfix : Avoid NULL & 0 values at night reset
* (DutchmanNL) Bugfix : 05_currentYear has no existing object
* (DutchmanNL) Bugfix : Avoid calculation of non-Initialised states
* (DutchmanNL) Bugfix : Cannot read property 'stateDetails' of null
* (DutchmanNL) Correct error handling of "Watt" state initialisation
* (DutchmanNL) Bugfix : Ensure a proper reset and init of Watt values
* (DutchmanNL) Bugfix : Avoid loop if init value is set and > reading
* (DutchmanNL) Bugfix : Caught sentry error : Alias xxxxx has no target
* (DutchmanNL & ToTXR4Y) Bugfix : Rebuild calculation logic which solves :
  * Watt values : Ensure proper reading start (0 instead of current watt value)
    Watt values : Ensure proper reading calculation with exponent (0 instead of current watt value) [#281](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/281)
  * All calculations : correct handling  of device reset (if value is reset or 0)
* (DutchmanNL) Bugfix : Incorrect initialisation for Watt values with 0 input
* (DutchmanNL) Bugfix : Only create cumulatedXXX in year statistics if activated
* (DutchmanNL) Bugfix : Incorrect warn message if configuration for objects is changed
* (DutchmanNL) Bugfix : Error {Is not a number, cannot continue calculation} if value =  0
* (DutchmanNL) Bugfix : Throw error if value is NULL for troubleshooting instead of handling incorrect calculation
* (DutchmanNL) Bugfix : Ensure daily reset does not destroy cumulative memory value (Fixes NULL values for Watt after night reset)

### 0.4.7 (2020-09-15) Solved NULL error's & daily resets
* (DutchmanNL) Implement Sentry
* (DutchmanNL) Implement configuration for Price definitions
* (DutchmanNL) Bugfix: NULL value issue  at daily reset
* (DutchmanNL) Bugfix: Issue found in selection of category
* (DutchmanNL) Bugfix: Category issue (read value of undefined)
* (DutchmanNL) Bugfix: Issue in storing meter values by month
* (DutchmanNL) Bugfix: Wrong reading value for Watt initialisation
* (DutchmanNL) Bugfix: Warnings at object creations (js-controller 3.x)
* (DutchmanNL) Bugfix: wrong interpretation of start values at value resets
* (DutchmanNL) Bugfix: Proper error message instead of code crash if no cost type defined
* (DutchmanNL) Add device name for log messages if device value < than currently known value
* (DutchmanNL) Bugfix : Crash at adapter start if chosen Type is not present in instance configuration    

### 0.4.2 (2020-04-12) BugFixes
* (DutchmanNL) Translations updated
* (DutchmanNL) Bugfix : Values do not reset at new day start
* (DutchmanNL) Bugfix : Handle calculations when reading = 0
* (DutchmanNL) Bugfix : Handle calculations at initialisation
* (DutchmanNL) Bugfix : Pause all calculation during day-reset
* (DutchmanNL) Do not calculate values is state is update with same value as previous

### 0.4.0 (2020-04-05) Adapter completely redesigned, please test carefully
* (DutchmanNL) Complete code rebuild
* (DutchmanNL) Change data points to root by year
* (DutchmanNL) Delete unneeded states automatically
* (DutchmanNL) Calculation by quarter implemented
* (DutchmanNL) Storage of meter values implemented
* (DutchmanNL) Rebuild calculation logic to handle in memory instead of object DB (performance)

### 0.3.0   
* (DutchmanNL) m³ Implemented

### 0.2.5
* (xXBJXx) Fix wrong storage of start meter values

### 0.2.41
* (DutchmanNL) Fix wrong storage of daily reset of meter values

### 0.2.3
* (Xoroles & DutchmanNL) fix watt calculation, thank you @Xoroles !

### 0.2.29
* (DutchmanNL) implemented w to kWh calculations :) with thanks to @AlCalzone and @andiling !

### 0.2.276
* (DutchmanNL) implemented meter readings
* (DutchmanNL & @AlCalzone) code improvements & stability
* (DutchmanNL) fix issue with liquid unit reading (m3)

### 0.2.273
* (DutchmanNL) fix issue in daily reset of start values
* (DutchmanNL) Fix badges in readme
* (DutchmanNL) exclude calculations of `w` from current routines (it will be implemented in next versions)

### 0.2.272
* (DutchmanNL) change logic of initialisation
* (DutchmanNL) fix issue in calculation handling
* (DutchmanNL) extract unit definition to central function
* (DutchmanNL) removed "logging to troubleshoot", use "debug" in adapter setting

### 0.2.271
* (DutchmanNL) implement compact mode
* (DutchmanNL) fix testing issues
* (DutchmanNL) fix error "unit" or "tolowercase" is undefined
* (DutchmanNL) fixed installation issues

### 0.2.27
* (DutchmanNL) fixed issue related to multihost installations with slave as target

### 0.2.26
* (DutchmanNL) fixed issue in calculations for gas environments and liquids
* (DutchmanNL) improve logging related to issue analytics

### 0.2.25
* (DutchmanNL) add option in state setting to automatically OR manually choose the measurement unit (for cases device state does not have correct value)

### 0.2.24
* (DutchmanNL) add support for heating pumps
* (DutchmanNL) improvements in adapter configuration screen

### 0.2.2
* (DutchmanNL) fixed reset of start values
* (DutchmanNL) removed uneeded logging "Write calculations for : "
* (DutchmanNL) generic improvement of logging, to see status messages activate it in adapter settings ! Otherwise, only erros will be shown and add/del devices
* (DutchmanNL) improved complete logic of state add/delete/update config in backend which will result in better performance/error handling
* (DutchmanNL) small fixed in configuration screen to show logging options

### 0.2.1
* (DutchmanNL) fixed "current_day" missing in object tree
* (DutchmanNL) fixed log messages "removed from SourceAnalytix"
* (DutchmanNL) fixed unit issue to support upper and lower case in values
* (DutchmanNL) fixed unit issue replace strange characters
* (DutchmanNL) remove intervall setting from configuration screen (handle by state subscription now!)
* (DutchmanNL) remove start measurement from state configuration screen (not need, please use day start, week start etc !)

### 0.2.0
* (DutchmanNL) rebuild logic to calculate values (beta testing)
* (DutchmanNL) implement logic to automatically reset values by start of new day, week, month, year etc (beta testing)
* (DutchmanNL) changed logic from intervall polling to handle calculations based on state updates (beta testing, not if suitable for all situations)
* (DutchmanNL) fixed issue incorrect states are added to monitoring
* (DutchmanNL) fixed issue calculation not stopped when state removed from monitoring
* (DutchmanNL) always store all current measurements to values of categories regardless setting year etc
* (DutchmanNL) code cleanup and optimisation
* (DutchmanNL) added logging option "status notification"
* (DutchmanNL) implement new translation mechanism


### 0.1.9 
* (DutchmanNL) Adapter moved to community development tree
* (DutchmanNL) added npm version and test-status to readme
* (DutchmanNL) finalized new konfiguration screen & translations
* (DutchmanNL) adding/removing objects from analytix does not need adapter reboot anymore ! :-)
* (DutchmanNL) rebuild logic how data is handled as basic for new calculation logic (Experimental)
* (DutchmanNL) added options to year analytics to choose values (days,weeks,years etc)
* (DutchmanNL) option added for Developer logging
* (DutchmanNL) Basic price is currently not considered in cost calculations !
* (DutchmanNL) Values day start, week start etc are currently not automatically set (will be in 0.2.0)


### 0.1.8 (unuasable temporary verion )
* (DutchmanNL) konfiguration pages completely redesigned : Please do not enter values yet !
* (DutchmanNL) master konfiguration added to globally define costs
* (DutchmanNL) intervall settings moved to global setting instead of each state separated
* (DutchmanNL) instead of cost-price in each state use drop down menu to choose values from global settings
* (DutchmanNL) fixed naming and translations

### 0.1.6
* (DutchmanNL) fixed data reset for quarter values (thank you Jens !)
* (DutchmanNL) fixed usage of alias
* (DutchmanNL) fixed issue in calculation of earnings and delivery
* (DutchmanNL) logging improvement
* (DutchmanNL) fixed log messages
* (DutchmanNL) calculation for m3 values
* (DutchmanNL) calculation for l values

### 0.1.5
* (DutchmanNL) improved state write logic, only sent write commando when needed

### 0.1.3
* (DutchmanNL) add support for calculation of Wh values

### 0.1.0
* (DutchmanNL) first public beta release
* (DutchmanNL) fixed translations
* (DutchmanNL) rebuild calculation logic
* (DutchmanNL) fixed calculation of start offset
* (DutchmanNL) adjustable if state is used for consumption or delivery
* (DutchmanNL) limited possible logging to kWh only for this moment
* (DutchmanNL) only create states and channels for logging types selected

### 0.0.9
* (DutchmanNL) fixed wrong calculation of start values
* (DutchmanNL) fixed wrong calculation of quarter values
* (DutchmanNL) prepare public beta and travis testing
* (DutchmanNL) change name to SourceAnalytix
* (DutchmanNL) implemented SourceAnalytix settings at states (equal to data logging adapters)
* (DutchmanNL) configurable unit for every state, automatically from object state. Currently, only kWh supported !

### 0.0.8
* (DutchmanNL) configurable intervall for every state

### 0.0.7
* (DutchmanNL) automated reset of start values

### 0.0.6
* (DutchmanNL) fixed issue with travis build
* (DutchmanNL) fixed wrong information in package-json

### 0.0.4
* (DutchmanNL) cost calculation
* (DutchmanNL) adjustable starting point of measurement
* (DutchmanNL) support of multiple device states instead of 1
* (DutchmanNL) fixed calculation of current consumptions

### 0.0.3
* (DutchmanNL) code optimisation

### 0.0.2
* (DutchmanNL) creation of object structure
* (DutchmanNL) first values read based on test_object.js input file to read values adn write data of current period.s

### 0.0.1
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2021 DutchmanNL

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