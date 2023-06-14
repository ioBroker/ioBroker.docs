---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.heatingcontrol/README.md
title: ioBroker.HeatingControl
hash: RFeBysZWTP8BR32lWsOhYe0RCp9j/1cB/dBhCaLN83w=
---
![标识](../../../en/adapterref/iobroker.heatingcontrol/admin/heatingcontrol.png)

![安装数量](http://iobroker.live/badges/heatingcontrol-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.heatingcontrol.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.heatingcontrol.svg)
![已知漏洞](https://snyk.io/test/github/rg-engineering/ioBroker.heatingcontrol/badge.svg)
![NPM](https://nodei.co/npm/iobroker.heatingcontrol.png?downloads=true)

# IoBroker.HeatingControl
![GitHub 操作](https://github.com/rg-engineering/ioBroker.heatingcontrol/workflows/Test%20and%20Release/badge.svg)

**此适配器使用哨兵库自动向开发人员报告异常和代码错误。**有关更多详细信息和如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

**如果喜欢，请考虑捐款：**

[![贝宝](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

## 文档
**我正在寻求创建/更新用户文档和常见问题解答方面的支持。如果有人感兴趣，请联系我...**

## 用于控制加热系统的适配器。
特征：

* 按计划控制所有恒温器的设定点温度水平
* 为每个白天和晚上配置多个供暖时段
* 支持所有类型的温控器（前提：ioBroker 必须有）
* 家庭设备自动检测
* 支持多个配置文件
* 如果温控器和执行器之间没有直接连接，执行器可以直接从适配器中切换出来
* 目前，执行器在达到设定温度时直接关闭。一旦设定点温度低于实际温度，执行器就会打开。 （要做的：实施改进的控制）
* 每个房间支持无限数量的恒温器、执行器和传感器
* 自动检测每个房间的恒温器、执行器和传感器。为此使用功能（例如“加热”）。
* 如果房间包含恒温器但不应控制，则可以在管理界面中排除房间
* 传感器用于降低目标温度（例如，如果窗户打开）；可选择使用 SensorDelay
* Feiertag-Adapter 或任何其他检测公共假期的接口。公共假期可以是普通的一天或像星期天一样。 （管理员设置）
* 手动温度覆盖一定时间
*预定义的加热期
* 接管恒温器的变化（可选）
* 支持来自 [Pittini](https://github.com/Pittini/iobroker-heatingcontrol-vis) 的可视化。谢谢你！

[常问问题](doc/FAQ.md)

＃＃ 安装
## 设置
＃＃＃ 主要的
* Function = 用于检测每个房间的恒温器、执行器和传感器的功能。这是系统枚举之一
* 时区 = 用于 cron 调整 cron 作业
* Feiertag - Adapter 的路径 = 如果您想使用 Feiertag-Adapter 自动检测今天的公共假期，请在此处设置路径（例如 feiertage.0）
* 管理员打开时删除所有设备 = 应该被禁用。仅当您需要删除所有房间、执行器和传感器设置时才启用它。适配器管理员打开时将执行设备搜索
* 使用的传感器 = 如果您有窗户传感器并且您想在窗户打开时降低目标温度，请启用该选项
* 使用的执行器 = 如果您想直接从适配器控制执行器。以防万一恒温器和执行器之间没有直接连接。
* 如果没有加热期则使用执行器 = 仅对执行器有效。定义当没有加热周期处于活动状态时如何设置执行器
* 如果没有可用的恒温器，则使用执行器 = 仅对执行器有效。如果您的房间没有恒温器但有加热执行器，您可以永久打开或关闭它们

＃＃＃ 轮廓
* 配置文件类型 = 支持三种不同的配置文件类型（周一至周日，或周一至周五和周六/周日或每天）
* 配置文件数量 = 如果您需要更多配置文件，则增加该值。然后您可以选择要使用的配置文件。
* 期间数 = 定义您需要多少个具有不同温度的每日部分。随着您设置的越多，将创建更多的数据点。最好使用较低的值（例如 5）
*“像星期天这样的公共假期=如果你想在像星期天这样的公共假期设置目标温度，启用该选项。否则公共假期设置与正常日子相同
* HeatingPeriod = 供暖期的开始和结束日期。用于设置“HeatingPeriodActive”

＃＃＃ 设备
* 所有房间的列表。您可以在此处禁用房间。
* 按右侧的编辑按钮打开该房间的恒温器、执行器和传感器的设置窗口

### 编辑房间
* 在这里您可以验证和设置恒温器、执行器和传感器的对象 ID
* 您可以手动添加新的恒温器、执行器或传感器。只需按 + 按钮。然后你得到一个需要填充的空行。编辑按钮打开系统上可用设备的列表
* 恒温器：

** 名称、温度目标OID 和当前温度OID 应设置。

*执行器

** 应设置状态的名称和 OID

*传感器

** 应设置当前状态的名称和 OID

＃＃ 数据点
| DP 名称 |说明 |
|---------------------|-----------------------------------------------------------------------------------------------------|
| HeatingPeriodActive |如果关闭，将不使用配置文件 |
|当前概况 |选择当前配置文件（基于 1，表示配置文件 1 使用 heatingcontrol.0.Profiles.0 下的数据点）|
|最后一个程序运行 |显示上次适配器运行时间 |

### 温度降低/升高
| DP 名称 |说明 |相对降低的目标温度 |绝对降低的目标温度 |
|---------------------|------------------------------------------------------------|--------------------------------------------------------------------------------|---------------------------------------------------------------|
|嘉宾出席 |提高温度，因为客人希望它更温暖|通过 Profiles.0.room.GuestIncrease | 增加当前配置文件温度将目标设置为 Profiles.0.room.absolute.GuestIncrease |
|现在派对 |降低温度，因为它变热了' |通过 Profiles.0.room.PartyDecrease 降低当前配置文件温度 |将目标设置为 Profiles.0.room.absolute.PartyDecrease |
|礼物 |我们在场，如果我们不在场，请降低温度 |将当前配置文件温度降低 Profiles.0.room.AbsentDecrease |将目标设置为 Profiles.0.room.absolute.AbsentDecrease |
|假期缺席 |我们缺席，所以周末也减少|通过 Profiles.0.room.VacationAbsentDecrease 降低当前配置文件温度 |将目标设置为 Profiles.0.room.absolute.VacationAbsentDecrease |
| FireplaceModeActive |降低温度因为你使用壁炉，将是 |通过 Profiles.0.room.FireplaceModeDecrease 降低当前配置文件温度 |将目标设置为 Profiles.0.room.absolute.FireplaceModeDecrease |

| |在可调时间自动重置

* 在两个 szenarious 中只使用了一种脱脂剂（在以前版本的适配器中可以使用不止一种脱脂剂）
* 在绝对脱脂方案中，仅使用不等于 0°C 的目标值。如果您不需要对某个房间进行任何降低，则将降低值保持在 0°C

###无采暖期
有三个选项

* 固定每个房间的温度

如果选择此选项，则每个房间的对象树中都会出现一个新数据点。您可以在此处设置一个固定目标温度，该温度在供暖期未激活时设置。

* 修复所有房间的温度

使用此选项，当供暖期未激活时，您可以为每个房间使用一个目标温度

* 没有什么

使用此选项，如果没有加热期处于活动状态，则不会向恒温器发送任何内容。当加热期仍处于活动状态时，目标温度与上次目标保持一致。
在这种情况下，如果您使用适配器中的执行器，那么您可以定义执行器的设置方式（关闭、打开或保持原样）

＃＃ 其他的
* HolidayPresent / PublicHolidyToday

如果您在管理中启用“像星期天一样的假日礼物”或“像星期天这样的公共假期”，当适配器被告知今天是公共假期或者您在家度假时，将使用星期天的配置文件。

###窗口打开
如果“使用传感器”处于活动状态并且房间的传感器已/已配置，则

* 如果配置了相对降低，则通过 Profiles.0.room.WindowOpenDecrease 打开窗口时降低当前配置文件温度（真）
* 如果配置了绝对减少，则在窗口打开时将目标设置为 Profiles.0.room.absolute.WindowOpenDecrease (true)

可以选择使用延迟。如果窗户只打开很短的时间，传感器延迟可以避免在很短的时间内减少并恢复正常。

## 支持
您可以使用您的日历或任何其他数据点来更改适配器中的数据点。
只需在管理中配置来自 ical 或其他数据点的事件。支持的有

|数据点 |描述|------------------------------------|---------- ---------------------------------------------- -------------- |heatingcontrol.0.Present |将其设置为 true（如果是布尔值）或高于 limit 的数字（如果是数字）|heatingcontrol.0.HolidayPresent |当你在家度假时将其设置为真 |heatingcontrol.0.VacationAbsent |假期不在家时设置为真 |heatingcontrol.0.GuestsPresent |将其设置为 true（如果是布尔值）或高于 limit 的数字（如果是数字）|heatingcontrol.0.PartyNow |将其设置为 true（在布尔值的情况下）或高于 limit 的数字（在数字的情况下）

提示：使用数字数据点，您可以计算房子里有多少人，然后决定，例如我们有足够的派对...

## 使用恒温器的变化
许多用户要求提供一个选项来接管从恒温器到适配器的更改。现在实施了四个选项：

|选项 |描述|------------------------|-------------------- ---------------------------------------------- -------------- |没有 |恒温器的变化被忽略 |作为覆盖 |恒温器的变化被视为覆盖； override 时间必须提前在 heatingcontrol.0.Rooms.RoomName.TemperaturOverrideTime | 中设置|如果未设置覆盖时间，则不执行覆盖 |作为新的配置文件设置 |恒温器的变化被视为当前配置文件周期的目标温度 |直到下一个配置文件点 |恒温器的变化被视为目标温度，直到下一个配置文件点。这是手动模式，因此仅使用窗口传感器。所有其他 | |增加/减少被忽略。每个房间都有一个数据点，用于在到达下一个配置文件点之前禁用手动模式。

##当温度改变时扩展覆盖
覆盖的标准行为是，当您更改温度时，覆盖时间不会改变。例如，如果您以 25°C 开始覆盖 20 分钟，然后在 15 分钟后更改为 28°C，则仅在最后 5 分钟使用 28°C。使用该选项，您可以在更改覆盖温度时重新启动覆盖。
在示例中，高于 28°C 将使用 20 分钟，从而导致 15 分钟 25°C 和 20 分钟 28°C

##覆盖模式
所有房间的管理员都有两种模式可调节。

* 定时器控制

这是众所周知的函数，它使用温度和持续时间。给定温度用于持续时间，然后温度目标将设置回自动模式下的值

* 直到下一个配置文件点

这是一个新功能。在这里我们可以使用温度覆盖直到下一个配置文件点。持续时间将被忽略，但必须是非零的！

## 恒温器处理“窗口打开”
一些恒温器可以自行处理“窗户打开”。在这些情况下，窗户传感器和恒温器之间的直接连接被配置，当窗户打开时，恒温器会自行降低目标温度。
结合选项“使用恒温器的变化”/“直到下一个配置文件点”将导致意外的手动状态。在这种情况下，将使用降低的温度直到下一个剖面点。
但是 adpater 可以处理这种行为。您必须启用选项“Thermostat handles 'Window is Open'”并且您也可以在适配器中配置窗口传感器。
当窗口打开时，适配器等待最大值。恒温器的新目标温度需要 3 秒。如果它在那段时间收到一个新的目标温度，它将被用作降低的绝对温度。然后状态将是“自动窗口打开”。一旦窗口关闭，状态就会恢复为自动，恒温器会设置回原始目标温度**注意**在这种情况下不要使用传感器打开延迟。如果你使用它，Window open 事件会在从恒温器接收到目标温度后出现。这最终处于手动状态。

## 复制周期和复制配置文件
`` heatingcontrol.0.Profiles.1.CopyProfile heatingcontrol.0.Profiles.1.Room.CopyProfile ``

和

`` heatingcontrol.0.Profiles.1.Küche.Fri.CopyPeriods ``

CopyProfile 将按下按钮的配置文件的全部内容复制到下一个配置文件。在上面的示例中，按钮位于配置文件 1 中。按钮复制从配置文件 1 到配置文件 2 的所有内容。
如果只想复制一个房间，请使用某个房间中的按钮。

CopyPeriods 每天或周一至周五每间客房提供。这会将句点复制到下一部分。在上面的示例中，CopyPeriods 复制从厨房房间的星期五到星期六在厨房房间的所有时间段。
所以你可以，例如在“每天分开”的个人资料中，复制周一至周日的时间段......

＃＃ 维护模式
去做

## 壁炉模式
去做

##执行器处理
去做

在线性和带滞后的线性之间切换

描述两个新数据点 heatingcontrol.0.Rooms.TestRaum.Regulator.HysteresisOffOffset 和 heatingcontrol.0.Rooms.TestRaum.Regulator.HysteresisOnOffset

## 扩展执行器处理
检查值是否设置正确并设置 ack，否则重试...

去做

## EVU Sperrzeit / PowerInterruption
当达到供电公司的闭锁时间时，所有执行器都会关闭，并在闭锁时间结束时再次打开。
状态进入“EVU Sperrzeit”/“PowerInterruption” 目的：关闭电加热器并以有针对性的方式再次打开它们，以最大限度地减少接触器上的负载并最大限度地减少浪涌电流 配置：EVU 阻断的开始/结束时间时间，可以配置多个时间段

## 问题和功能请求
* 如果您遇到任何错误或对此适配器有功能请求，请在适配器的 GitHub 问题部分中创建问题 [github](https://github.com/rg-engineering/ioBroker.heatingcontrol/issues ).感谢任何反馈，这将有助于改进此适配器。

＃＃ 已知的问题
### 带 Homematic IP Fußbodenheizungsaktor HmIP-FAL230-C10 的适配器 – 10fach，230 V
看来 HmIP-FAL230-C10 不能直接用作与该适配器组合的执行器。如果您将 HmIP-FAL230-C10 与 Homematic 恒温器一起使用，它应该可以工作。
另见[论坛](https://forum.iobroker.net/topic/22579/test-adapter-heatingcontrol-v1-0-x/1553)

### HM温控器的开窗功能
HM 恒温器有两种型号的开窗功能。一方面作为温度下降检测，另一方面与窗口接触有关。
此函数使适配器在窗口打开时切换到手动模式。理想情况下，应停用此功能，以免干扰适配器的功能。
如果恒温器使用来自窗口传感器的信息，则应启用“恒温器处理窗口打开”选项。

当适配器崩溃或发生其他代码错误时，此错误消息也会出现在 ioBroker 日志中，并提交给 Sentry。所有这些都有助于我提供基本上不会崩溃的无错误适配器。

## Changelog

### 2.11.0 (in progress)
* (René) see issue #368: units added in datapoints
* (René) see issue #361: EVU Sperrzeit / PowerInterruption (description see above)
* (René) see issue #359: support of discord added to notifications (not yet finished)
* (René) see issue #367: wait for set target temperature before checking actor changes

### 2.10.6 (2023-01-31)
* (René) see issue #355: reset override is now also with Button ResetManual possible

### 2.10.5 (2023-01-21)
* (René) see issue #356: create list if room list is empty
* (René) see issue #357: remove change event when loading telegram data
* (René) handling of exceptions reported by sentry in notification modul

### 2.10.4 (2022-12-21)
* (René) UTF8 conversion for some files
* (René) more space for same values in admin

### 2.10.3 (2022-12-19)
* (René) see issue #347: waiting time for target temperature update from thermostat adjustable per room
* (René) see issue #348: bug fix to avoid unnecessary error message

### 2.10.1 (2022-12-10)
* (René) update dependencies
* (René) see issue #337: bug fix in calculate profil position
* (René) see issue #336: translation of notification mesaages
* (René) see issue #347: bug room status if option "thermostat handles windows open" is enabled and window opened and closed
* (René) some minor bug fixes

### 2.9.3 (2022-10-28)
* (René) update dependencies
* (René) see issue #323: add telegram user to select box
* (René) see issue #325: autodetect for HmIP-WTH-2 changed

### 2.9.2 (2022-08-19)
* (René) update dependencies

### 2.9.1 (2022-06-10)
* (René) bug fix timer id's for extended actor handling
* (René) bug fix exception in SetRoomTemperature 

### 2.9.0 (2022-06-09)
* (René) see issue #302: adjustable info logging for temperature, aktor and window status change
* (René) see issue #306: extended handling to set actuator state and thermostat target temperature added

### 2.8.7 (2022-04-23)
* (René) see issue #312: bug fix in window is open handling if thermostat reduces temperature

### 2.8.6 (2022-03-31)
* (René) see issue #265 and #305: bg fix window handling for rooms with more then one window and sensors with regular status update 

### 2.8.5 (2022-02-12)
* (René) sentry: Cannot read property 'PARENT_TYPE' of undefined
* (René) see issue #291: inter thermostat delay added
* (René) better logging for timediff measurement with external sensors
* (René) minimum temperature check added in offset calculation

### 2.8.4 (2022-01-29)
* (René) see issue #289: round offset to 0.5°C instead 0.25°C
* (René) see issue #292: set actors when room becomes inactive like out of heating period
* (René) see issue #291: inter actuator delay added
* (René) new datapoint to show current profile target temperature

### 2.8.3 (2022-01-07)
* (René) see issue #286: Loading the configuration fixed
* (René) target temperature rounded to 0.5°C instead 0.25°C to avoid rounding on thermostat itself

### 2.8.2 (2022-01-04)
* (René) see issue #285: absent and VacationAbsent exchanged to check reduced mode
* (René) see issue #271: ack flag set only if it's in own namespace, external DP'S acks are not set anymore

### 2.8.1 (2021-12-29)
* (René) see issue #283: show internal and external temperature sensors in room status
* (René) see issue #272: extend override only if different temperature was sent
* (René) see issue #278: reset remaining override time to 0 when override is canceled
* (René) offset not to be used when room is in reduced mode (e.g. window open)
* (René) see issue #271: set ack flag for changed DP after 2 seconds, to give a chance to other adpaters to react on un-acked DP's

### 2.8.0 (2021-12-18)
* (René) see issue #266: differrent regulators for actor handling added (linear and linear with hysteresis)

### 2.7.2 (2021-11-14)
* (René) bug fix load / save profiles: check fireplace mode added
* (René) reset offset if disabled or no sensor (see issue #274)
* (René) bug fix for override in case of "use changes from thermostat as override": reset and window open handling

### 2.7.1 (2021-10-20)
* (René) see issue #268: change of override in manual mode is mssing

### 2.7.0 (2021-10-18)
* (René) see issue #259: limit for temperature offset added
* (René) see issue #227: maximum time difference between standard sensor and external sensor added
* (René) see issue #264: some changes for Pittini-vis

### 2.6.2 (2021-09-29)
* (René) see issue #260: bug fix isActive not ignored

### 2.6.1 (2021-09-25)
* (René) see issue #258: bug fix fireplace mode and vis

### 2.6.0 (2021-09-17)
* (René) maintenance mode added

### 2.5.1 (2021-08-20)
* (René) see issue #255: bug fix fireplace mode

### 2.5.0 (2021-08-20)
* (René) fireplace mode added
* (René) see issue #247: disable temp offset calculation when heating is off
* (René) see issue #223: bug fix to find correct period
* (René) see issue #194: accept float as minimum / maximum in vis settings; add warning if minumum is lower then 4.5°C

### 2.4.3 (2021-06-17)
* (René) see issue #243: bug fix for HeatingPeriod when adpater starts
* (René) see issue #245: problem with manual mode when SensorOpenDelay is used
* (René) see issue #244: bug fix for WindowOpenImg 

### 2.4.2 (2021-05-17)
* (René) logging for ActorsOn optimized

### 2.4.1 (2021-05-15)
* (René) see #233: remaining override time set also for choosen room in vis
* (René) bug fix public holiday detection

### 2.4.0 (2021-05-13)
* (René) make it ready for js-controller 3.3

### 2.3.2 (2021-04-18)
* (ericsboro) vis translation to russian
* (René) see issue #231: bug fix detect heating period

### 2.3.1 (2021-04-05)
* (René) some optimisations for vis translation

### 2.3.0 (2021-03-20)
* (René) see issue #187: show remaining override timeConverter
* (René) see issue #225: support different languages for vis
* (René) see issue #223: new overide mode "until next profile point"
* (René) bug fix to calculate average for temperatur offset

### 2.2.0 (2021-02-15)
* (René) see issue #146: different type of window sensor and also adjustable comparative value
* (René) see issue #110: optionally every room can be set to "no heating" with separate datapoint
* (René) see issue #185: maintenance function: Delete all unused datapoints (e.g. profiles) is implemented now for admin
* (René) see issue #185: maintenance function: Delete all devices related to a room, when a room is deleted is implemented now for admin
* (René) see issue #207: copy buttons for vis added
* (René) see issue #219: bug fix: DecreaseValues and ProfilName are copied in CopyProfile now

### 2.1.1 (2021-02-08)
* (René) bug fix Temperatur Offset: invert sign of TemperatureOffset 

### 2.1.0 (2021-01-31)
* (René) see issue #198: add name to profile as a datapoint, used to be shown in visualisation
* (René) see issue #194: limit and step width for increase / decrease values adjustable in admin 
* (René) see issue #182: Temperatur Offset
* (René) see issue #212: ActiveTimeSlot inkorrekt for vis

### 2.0.4 (2021-01-28)
* (René) bug fix for issue #213: Warnung "!!! Statechange not handled"

### 2.0.3 (2021-01-24)
* (René) bug fix for issue #211: endless change of temperatures

### 2.0.2 (2021-01-22)
* (René) bug fix for issue #208: exception "undefined is not a valid state value"
* (René) bug fix for issue #209: Not all open windows are recognized

### 2.0.1 (2021-01-19)
* (René) bug fix for issue #204: do not take over reduced temperature in manual mode
* (René) bug fix for issue #203: Warnings "has no existing object, this might lead to an error"
* (René) bug fix for issue #205: override start

### 2.0.0 (2021-01-16)
* (René) internal refactoring

**ATTENTION: breaking changes !!!!**
* complete internal refactoring (new source files, internal data structures, code review, ...)
* **Periods and Profils count from 1 instead 0**
* ChangesFromThermostat adjustable per room is removed
* recalculation of room temperature is performed only for the room where necessary (in previous versions all rooms were recalculated and new value transmitted)
* SensorOpenDelay / SensorCloseDelay renamed
* ResetButton to disable manual mode (and go back to auto)
* status log per room
* complete profile can be saved and loaded in admin
* copy profile (complete or for a single room) and periods (for a certain profile and room) by button supported
* datapoint selector for external datapoints added in admin
* autodectection for thermostats, sensors and actuators completely overworked
* room detection overworked
* limits and step widh for profil temperatures adjustable in admin for Pittini vis
* simple window status view (in html) for Pittini vis added
* room state as simple html table for vis added
* (optionally) extend override when temperature is changed; in standard new temperature is set, but timer is not changed
* (optionally) Thermostat handles "window is open"
* issues in github: 
	* #161 Profil springt zur angegebenen Zeit nicht um
	* #153 cron Probleme beim ändern eines Profils mittels Javascript
	* #152 Fenstererkennung im manuellen Modus
	* #148 Bei Änderung vom Thermostat bis zum nächsten Profilpunkt müssen Sensoren berücksichtigt werden


### 1.1.2 (2020-11-11)
* (René) bug fix: activate actors after temperatur change

### 1.1.0 (2020-11-01)
* (René) see issue #149: bug fix: calculate current period in case we are still in last period from yesterday

### 1.1.0 (2020-10-20)
* (René) see issue #132: timer before on and off for actuators 
* (René) see issue #143: additional checks to avoid unneccessary override 
* (René) see issue #140: use guests present and party now DP's also as counter like present (as a option); add adjustable counter limit for present, party now and guest present
* (René) see issue #145: avoid reset of target temperatur by profile settings in option "until next profil point" when set by thermostat 

### 1.0.0 (2020-10-09)
* (matida538) added better Handling of strings in HandleThermostat (convert to Number, instead of warn) (e.g. fhem connector for fht80)
* (matida538) changed Check4ValidTemperature to convert strings to Number instead of Int (else we lose information e.g. 18.5 will be 18)
* (René) some smaller code optimisations

### 0.6.0 (2020-09-15)
* (René) see issue #123: use window open / close delay only when window state changed
* (René) see issue #122: better log for different type warning
* (René) see issue #120: override from thermostat only if it's different to current settings
* (René) see issue #126: TestThermostat should not be checked for correct configuration
* (René) see issue #124: vis from Pittini: Image for open / closed window adjustabel (as an option, if nothing is configured the original will be used)
* (René) see issue #127: use value from thermostat until next profile point 
* (René) see issue #128: try to convert string data to number

### 0.5.7 (2020-07-07)
* (René) see issue #116: get MinimumTemperature for vis only if enabled

### 0.5.6 (2020-06-14)
* (René) see issue #113: re-order of rooms added
* (René) see issue #112: bug fix "Fensterübersicht"

### 0.5.4 (2020-06-04)
* (René) bug fix: HeatingControlVis avoid exceptions like "Cannot read property 'val' of null"

### 0.5.3 (2020-06-03)
* (René) bug fix: new temperatures set when current profile is changed
* (René) refactoring HeatingControlVis to avoid exceptions like "Cannot read property 'val' of null"

### 0.5.2 (2020-05-25)
* (René) bug fix: log a warning if actors are configured but UseActors are off

### 0.5.1 (2020-05-22)
* (René) log a warning if actors are configured but UseActors are off
* (René) sentry added
* (René) some hints in admin

### 0.5.0 (2020-05-03)
* (René) see issue #101: sensor close delay added (similar to already existing sensor open delay)
* (René) see issue #103: date/time format string corrected for vis
* (René) see issue #104: bug fix to take over changes from vis
* (René) see issue #102: bug fix change current time period to be shown on vis

### 0.4.0 (2020-05-02)
* (René) see issue #70: use changes from thermostat
* (René) see issue #91 bug fix: if the same sensor is configured for more than one room thermostat target temperature will be set for all configured rooms
* (René) script from Pittini integrated to support his visualization [Pittini](https://github.com/Pittini/iobroker-heatingcontrol-vis) 
* (Dutchman) some refactoring 

### 0.3.19 (2020-03-15)
* (René) create correct cron job for sunday if profile type "every day" is used
* (René) see issue #87: change type of time data points to string
* (René) see issue #87: set correct roles for data points
* (René) see issue #84: set default value for minimum temperature
* (René) see issue #86: all "float" converted to "number""

### 0.3.18 (2020-03-08)
* (René) fix issues reported by adapter checker

### 0.3.17 (2020-03-01)
* (René) check datapoint configuration: if datapoint points to itself then error messages
* (René) support of new vis see issue  #76
* (Rene) thermostat mode if no heating period

### 0.3.16 (2020-02-09)
* (René) deccrease/increase-handling also when Override is active (see issue #72)
* (René) priority handling for temperature increase / decrease overworked (use only values not equal zero)

### 0.3.15 (2020-01-18)
* (René) bug fix: avoid exception when go to override if MinTemperature-check is active

### 0.3.14 (2020-01-12)
* (René) format conversion for temperatures in string to number
* (René) ack for MinTemperature

### 0.3.13 (2019-12-28)
* (René) bugfix create cron jobs for profile type 3 (daily)

### 0.3.12 (2019-12-27)
* (René) bugfix exception in CheckTemperatureChange [ReferenceError: RoomState is not defined] 

### 0.3.11 (2019-12-27)
* (René) option: minimum temperature per room
* (René) bugfix exception in CheckTemperatureChange [ReferenceError: PublicHolidyToday is not defined] 

### 0.3.10 (2019-12-26)
* (René) see issue #54: stop override with OverrideTemperature =0
* (René) new priority for lowering reasons
* (René) handling of actuators without thermostat
* (René) see issue #66: handle lowering in time between 0:00 and first period
* (René) see issue #64: import of configuration fixed

### 0.3.9 (2019-12-14)
* (René) see issue #60: sensor delay
* (René) see issue #57: support of the same sensor for different rooms
* (René) bug fix: "AbsentDecrease not defined" for relative lowering

### 0.3.8 (2019-12-12)
* (René) see issue #59: TemperaturOverride: acceppt hh:mm and hh:mm:ss
* (René) PartyNow support by iCal 
* (René) if useActuators: show how many actuators are active (as a datapoint)

### 0.3.7 (2019-11-29)
Attention: some changes in datapoints!!
* (René) see issue  #53: moved datapoints for relative lowering into "relative"
* (René) new datapoint to show lowering decrease mode (heatingcontrol.0.TemperatureDecreaseMode)
* (René) guest present as interface to ical
* (René) see issue #52: support radar adapter
* (René) all external states checked when adapter starts

### 0.3.6 (2019-11-23)
Attention: some changes in datapoints!!
* (René) moved some datapoints from "profile" to "rooms"
* (René) see issue #50: support absolute and relative decrease of target temperature
* (René) do not check all rooms everytime: when data only for one room changed then check only one room
* (René) only one event is used to lower temperature
* (René) add interface to ical (path to vacation and path to holiday present datapoints)
* (René) support of more then one instance

### 0.3.4 (2019-11-09)
* (René) bug fix in data point name

### 0.3.3 (2019-11-08)
Attention: some changes in datapoints!!
* (René) in admin: new buttons to add search new rooms
* (René) bug fix: in profil type Mo-Fr / Sa- So period order check failed  
* (René) see issue #38: new datapoint for WindowIsOpen
* (René) change datapoint "CurrentTimePeriod" to "CurrentTimePeriodFull", "CurrentTimePeriod" and "CurrentTimePeriodTime"
* (René) bugfix datapoint name "Sa-Su"
* (René) see issue #16: new datapoint "state" per room to show reason for temperatur change 
* (René) change format of LastProgramRun date / time

### 0.3.2 (2019-11-01)
* (René) try to convert temperature to number if NaN
* (René) see issue #33: check for heating period when adapter starts
* (René) fix a problem in subscription function when room can not be found 

### 0.3.1 (2019-10-31)
* (René) see issue #42 and #44: check all sensors per room and set state when adapter starts
* (René) show message in admin when adapter is not online
* (René) pre-define devicelist; add dummy thermostat, if list is empty

### 0.3.0 (2019-10-27)
* (René) see issue #20 + #24: start and end of heating period is configurable in admin 
* (René) see issue #24: use external data point to set internal "present" data point 
* (René) see issue #15: manual temperatur override
* (René) see issue #35: delete of devices
* (René) reset DeleteAll at next admin start 

### 0.2.3 (2019-09-20)
* (René) see issue #19: handling of enums created in iobroker admin fixed
* (René) see issue #13: check order of periods; if order is wrong (next time is smaller than previous) then time si not used for cron and a warning appears in log
* (René) see issue #21: check temperatures after changing of period settings (e.g. time)
* (René) see issue #25: select OID for target and current of thermostat in admin overworked
* (René) change datapoint type from bool to boolean

### 0.2.2 (2019-09-13)
* (René) see issue #14: description of datapoint time changed ('from' instead 'until')
* (René) see issue #12: unnecessary warnings removed
* (René) see issue #17: seconds removed from time list
* (René) datepoint change handling reworked
* (René) see issue #18: take over values from external PublicHoliday-datapoint

### 0.2.1 (2019-09-08)
* (René) bug fixes in actuator handling

### 0.2.0 (2019-09-05)
* (René) path to Feiertag-Adapter can also include a complete datapoint path 

### 0.1.0 (2019-08-25)
* (René) redesign of data structure
	- more then one actuator, sensor and thermostat per room
	- three different profile types
	- manual configuration of devices (if device is not detected automatically)
	- interface to Feiertag-Adapter
	- public holiday as normal day or like sunday (setting in admin)
	- window sensor support. Reduce target temperature when window is open
	- !!ATTENTION!! data structure/objects has been changed. You need to update your visualisation settings

### 0.0.5 (2019-07-08)
* (René) support for max! thermostats

### 0.0.4 (2019-06-23)
* (René) debugging

### 0.0.3 (2019-06-02)
* (René) ready to publish

### 0.0.2 (2019-05-19)
* (René) actuator handling added

### 0.0.1 (2019-04-27)
* (René) initial release

## License
MIT License

Copyright (c) 2019-2023 rg-engineering info@rg-engineering.eu

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