---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.heatingcontrol/README.md
title: ioBroker.HeatingControl
hash: XJpvhWciveYyyuOXSEWM/bmzKP5SY/p33EBWLcxfo48=
---
![标识](../../../en/adapterref/iobroker.heatingcontrol/admin/heatingcontrol.png)

![安装数量](http://iobroker.live/badges/heatingcontrol-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.heatingcontrol.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.heatingcontrol.svg)
![已知漏洞](https://snyk.io/test/github/rg-engineering/ioBroker.heatingcontrol/badge.svg)
![NPM](https://nodei.co/npm/iobroker.heatingcontrol.png?downloads=true)
![节点-lts](https://img.shields.io/node/v-lts/iobroker.heatingcontrol?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.heatingcontrol?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.heatingcontrol?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.heatingcontrol?logo=github&style=flat-square)
![GitHub提交活动](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.heatingcontrol?logo=github&style=flat-square)
![GitHub 最新提交](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.heatingcontrol?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/rg-engineering/ioBroker.heatingcontrol?logo=github&style=flat-square)

# IoBroker.HeatingControl
![GitHub Actions](https://github.com/rg-engineering/ioBroker.heatingcontrol/workflows/Test%20and%20Release/badge.svg)

[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/heatingcontrol/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

如果您喜欢，请考虑捐赠：

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

## 文档
我需要人手协助创建/更新用户文档和常见问题解答。如有兴趣，请与我联系。

＃＃ 翻译
该适配器使用 Weblate 进行翻译，Weblate 是一款基于 Web 的工具，可简化开发人员和翻译人员的翻译工作。

[参与 ioBroker 适配器项目](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[点击此处直接查看译文](https://weblate.iobroker.net/projects/adapters/heatingcontrol/)

## 用于控制供暖系统的适配器。
特征：

* 根据日程安排控制所有恒温器的设定温度水平
* 为每天和每晚配置多个加热时段
* 支持所有类型的恒温器（前提条件：必须在 ioBroker 中可用）
* Homematic 设备自动检测
* 支持多个配置文件
* 如果温控器和执行器之间没有直接连接，则可以直接从适配器中取出执行器。
* 目前，当达到设定温度时，执行器会直接关闭。一旦实际温度低于设定温度，执行器就会开启。（待办事项：实现改进的控制）
每个房间支持无限数量的温控器、执行器和传感器。
* 温控器、执行器和传感器可按房间自动检测（仅限 Homematic 设备）。此功能（例如“加热”）用于实现。
* 如果房间内装有温控器但不应受其控制，则可以在管理界面中将该房间排除在外。
* 传感器用于降低目标温度（例如，当窗户打开时）；可选择性地与 SensorDelay 配合使用。
* 与 Feiertag-Adapter 或其他类似工具连接，用于检测公共假日。公共假日可以是普通工作日，也可以是像星期日这样的节假日。（管理员设置）
* 手动调节温度，有效期为一段时间
* 预设加热期
* 接管恒温器设置（可选）
* 支持使用 Pittini 进行可视化。谢谢！
* 通过 [vis-2-widgets-weather-and-heating](https://github.com/rg-engineering/ioBroker.vis-2-widgets-weather-and-heating) 支持 Vis-2

[常问问题](doc/FAQ.md)

＃＃ 安装
＃＃ 设置
＃＃＃ 主要的
* 函数 = 用于检测每个房间的恒温器、执行器和传感器的函数。它是系统枚举类型之一。
* Feiertag-Adapter 的路径 = 如果您想使用 Feiertag-Adapter 自动检测今天的公共假日，请在此处设置路径（例如 feiertage.0）。
* 使用的传感器 = 如果您有窗户传感器，并且希望在窗户打开时降低目标温度，请启用该选项。
* 使用的执行器 = 如果您想通过适配器直接控制执行器。以防温控器和执行器之间没有直接连接。
* 若无加热期则使用执行器 = 仅适用于执行器。定义无加热期时如何设置执行器。
* 如果没有温控器，请使用执行器 = 仅适用于执行器。如果您有房间没有温控器但配备了加热执行器，您可以永久地打开或关闭它们。

＃＃＃ 轮廓
* 配置文件类型 = 支持三种不同的配置文件类型（周一至周日、周一至周五和周日或每天）。
* 配置文件数量 = 如果需要多个配置文件，请增加该值。然后您可以选择要使用的配置文件。
* 周期数 = 定义您需要多少个不同温度的每日时段。设置的值越大，生成的数据点就越多。建议使用较小的值（例如 5）。
* “公共假日（例如周日）= 如果您想在公共假日（例如周日）设置目标温度，请启用该选项。否则，公共假日的设置与平日相同。”
* HeatingPeriod = 供暖周期的开始和结束日期。用于设置“HeatingPeriodActive”。

### 设备
首先选择一个房间并启用它。
* 下方您将找到房间的所有配置。

### 房间配置
您可以在此处验证和设置恒温器、执行器和传感器的对象 ID。
您可以手动添加新的恒温器、执行器或传感器。只需按下“+”按钮，即可看到一个空白行，需要您填写信息。“编辑”按钮会打开系统中可用设备的列表。
* 温控器：

** 应设置名称、温度目标 OID 和当前温度 OID。

* 执行器

** 应设置州的名称和 OID

* 传感器

** 应设置当前状态的名称和 OID

## 数据点
| DP名称 | 描述 |
|---------------------|-----------------------------------------------------------------------------------------------------|
| HeatingPeriodActive | 如果关闭，则不会使用这些配置文件 |
| CurrentProfile | 选择当前配置文件（从 1 开始，表示配置文件 1 使用 heatingcontrol.0.Profiles.0 下的数据点） |
| LastProgramRun | 显示适配器上次运行时间 |

### 温度降低/升高
| DP名称 | 描述 | 相对降温目标温度 | 绝对降温目标温度 |
|---------------------|------------------------------------------------------------|--------------------------------------------------------------------------------|---------------------------------------------------------------|
| 客人已入住 | 提高温度，因为客人希望温度更高 | 将当前配置文件温度提高 Profiles.0.room.relative.GuestIncrease | 将目标温度设置为 Profiles.0.room.absolute.GuestIncrease |
| PartyNow | 降低温度，因为温度过高 | 将当前配置文件温度降低 Profiles.0.room.relative.PartyDecrease | 将目标温度设置为 Profiles.0.room.absolute.PartyDecrease |
| 当前 | 我们已在场，如果未在场，则降低温度 | 将当前配置文件温度降低 Profiles.0.room.relative.AbsentDecrease | 将目标温度设置为 Profiles.0.room.absolute.AbsentDecrease |
| VacationAbsent | 我们不在，所以周末也降低温度 | 将当前配置文件温度降低 Profiles.0.room.relative.VacationAbsentDecrease | 将目标温度设置为 Profiles.0.room.absolute.VacationAbsentDecrease |
| FireplaceModeActive | 由于您使用壁炉，温度将降低 | 将当前配置文件温度降低 Profiles.0.room.relative.FireplaceModeDecrease | 将目标温度设置为 Profiles.0.room.absolute.FireplaceModeDecrease |

| | 可在可调节时间自动重置

* 仅当设置了“常规配置文件设置，温度降低”时，数据点才可用
* 在这两种情况下都只使用了一种降低方式（在之前的适配器版本中可以使用多种脱脂方式）
* 仅在绝对脱脂场景下才使用不等于 0°C 的目标值。如果某个房间不需要降低温度，则将降低值保持在 0°C。

### 无供暖期
有三种选择

* 固定每个房间的温度

如果选中此选项，对象树中将为每个房间显示一个新的数据点。您可以在此处设置一个固定目标温度，该温度会在供暖期未激活时生效。

* 固定所有房间的温度

使用此选项，您可以在非供暖时段为每个房间设置一个目标温度。

* 没有什么

启用此选项后，如果没有激活的制热周期，则不会向温控器发送任何数据。目标温度将保持制热周期激活时设定的最后一个目标温度。

在这种情况下，如果您使用适配器中的执行器，则可以定义执行器的设置方式（关闭、开启或保持默认设置）。

＃＃ 其他的
* 假日礼物 / 今日公共假日

如果在管理员中启用“节假日如星期日”或“公共假日如星期日”，则当适配器获悉今天是公共假日或您在家度假时，将使用星期日的配置文件。

### 窗口打开
如果“使用传感器”处于激活状态，并且已配置房间的传感器，则

* 如果配置了相对降低，则当窗户打开时（true），通过 Profiles.0.room.WindowOpenDecrease 降低当前配置文件温度。
* 如果配置了绝对减少，则当窗口打开时（true），将目标设置为 Profiles.0.room.absolute.WindowOpenDecrease

也可以选择设置延迟。如果窗户只打开很短时间，传感器延迟可以避免窗户在很短时间内迅速减小并恢复正常。

## 医疗支持
您可以使用日历或其他任何数据点来更改适配器中的数据点。

只需在管理后台配置来自 iCal 或其他数据点的事件即可。支持以下功能：

| 数据点 | 描述 |-------------------------------------|---------------------------------------------------------------------------- |heatingcontrol.0.Present | 设置为 true（布尔值）或大于 limit 的值（数值） |heatingcontrol.0.HolidayPresent | 假期在家时设置为 true |heatingcontrol.0.VacationAbsent | 假期不在家时设置为 true |heatingcontrol.0.GuestsPresent | 设置为 true（布尔值）或大于 limit 的值（数值） |heatingcontrol.0.PartyNow | 设置为 true（布尔值）或大于 limit 的值（数值）

提示：利用数字数据点，你可以统计家里有多少人，然后决定，例如，我们人够开派对吗……

## 使用恒温器的变化
许多用户要求提供将恒温器设置同步到适配器的功能。现在已实现四种选项：

| 选项 | 描述 |--------------------------|--------------------------------------------------------------------------------------- | 否 | 忽略温控器更改 | 作为覆盖 | 温控器更改将作为覆盖；覆盖时间必须预先在 heatingcontrol.0.Rooms.RoomName.TemperaturOverrideTime 中设置 | | 如果未设置覆盖时间，则不会执行覆盖 | 作为新的配置文件设置 | 温控器更改将作为当前配置文件周期内的目标温度 | 直到下一个配置文件点 | 温控器更改将作为目标温度，直到下一个配置文件点。这是一个手动模式，因此仅使用窗户传感器。所有其他 | | 升高/降低都将被忽略。每个房间都有一个数据点，用于在到达下一个配置文件点之前禁用手动模式。

## 温度变化时扩展覆盖
标准覆盖机制的行为是，当您更改温度时，覆盖时间不会改变。例如，如果您以 25°C 开始覆盖 20 分钟，并在 15 分钟后更改为 28°C，则 28°C 仅用于最后 5 分钟。启用此选项后，每次更改覆盖温度时都会重新启动覆盖机制。

在上面的示例中，28°C 将持续使用 20 分钟，即 15 分钟 25°C，20 分钟 28°C。

## 覆盖模式
管理员后台可调节所有房间的两种模式。

* 定时器控制

这是一个众所周知的函数，它使用温度和持续时间作为参数。给定的温度用于设定持续时间，然后在自动模式下，温度目标值将重置为默认值。

* 直到下一个剖面点

这是一个新功能。在这里，我们可以使用温度覆盖功能，直到下一个曲线点。持续时间将被忽略，但必须不为零！

## 温控器处理“窗户打开”的情况
某些温控器可以自行处理“窗户打开”事件。在这种情况下，窗户传感器和温控器之间会配置直接连接，当窗户打开时，温控器会自动降低目标温度。

如果同时启用“使用来自温控器的变化”/“直到下一个配置文件点”选项，则会导致意外的手动设置状态。在这种情况下，降低后的温度会一直使用到下一个配置文件点。

但适配器可以处理这种情况。您必须启用“温控器处理‘窗户打开’”选项，并且也可以在适配器中配置窗户传感器。

当窗户打开时，适配器最多等待 3 秒钟，以接收来自温控器的新目标温度。如果在此期间接收到新的目标温度，则会将其用作降低后的绝对温度。此时状态将显示为“自动开窗”。窗户关闭后，状态将恢复为自动，温控器会将目标温度恢复到原始值。**注意**：在这种情况下，请勿使用“传感器打开延迟”功能。如果使用此功能，则“开窗”事件会在收到来自温控器的目标温度之后才会触发。最终会进入手动状态。

## 复制周期和复制配置文件
`` Heatingcontrol.0.Profiles.1.CopyProfile Heatingcontrol.0.Profiles.1.Room.CopyProfile ``

和

`` 加热控制.0.Profiles.1.Küche.Fri.CopyPeriods ``

CopyProfile 功能会将按下按钮所在配置文件中的所有内容复制到下一个配置文件。在上面的示例中，按钮位于配置文件 1 中。该按钮会将配置文件 1 中的所有内容复制到配置文件 2。

如果您只想复制某个房间的内容，请在该房间内使用该按钮。

“复制时段”功能可按天或按周一至周五的房间进行设置。此功能会将时段复制到下一部分。在上面的示例中，“复制时段”功能会将厨房房周五的所有时段复制到厨房房周六的时段。

因此，例如，您可以在“每天单独设置”的配置文件中，复制周一至周日的时段……

## 维护模式
要做

## 壁炉模式
要做

## 执行器处理
要做

线性与带滞后线性之间的切换

描述两个新的数据点：heatingcontrol.0.Rooms.TestRaum.Regulator.HysteresisOffOffset 和 heatingcontrol.0.Rooms.TestRaum.Regulator.HysteresisOnOffset

## 扩展执行器处理
检查值是否已正确设置，并且确认已设置，否则重试……

要做

## EVU Sperrzeit / PowerInterruption
当达到供电公司设定的停机时间时，所有执行器将被关闭，并在停机时间结束后重新开启。

状态变为“EVU 停机”/“电源中断”。目的：有针对性地关闭和重新开启电加热器，以最大限度地减少接触器的负载和浪涌电流。配置：EVU 停机时间的开始/结束时间，可配置多个时间段。

## 问题和功能请求
如果您在使用过程中遇到任何错误或有任何功能请求，请在[github](https://github.com/rg-engineering/ioBroker.heatingcontrol/issues)的适配器GitHub issue页面提交 issue。我们非常感谢您的反馈，这将有助于改进此适配器。

已知问题
### 带 Homematic IP Fußbodenheizungsaktor HmIP-FAL230-C10 的适配器 – 10fach，230 V
看来 HmIP-FAL230-C10 不能直接与该适配器配合使用，作为执行器。如果将 HmIP-FAL230-C10 与 Homematic 温控器一起使用，应该可以正常工作。

另请参阅 [论坛](https://forum.iobroker.net/topic/22579/test-adapter-heatingcontrol-v1-0-x/1553)

### HM恒温器的开窗功能
HM温控器有两种开窗功能：一种是通过温度下降检测，另一种是与窗户传感器联动。

此功能会在窗户打开时将适配器切换到手动模式。理想情况下，应禁用此功能，以免影响适配器的正常运行。

如果温控器使用窗户传感器信息，则应启用“温控器处理开窗”选项。

当适配器崩溃或发生其他代码错误时，除了 ioBroker 日志中出现的错误信息外，该错误信息还会提交给 Sentry。所有这些都有助于我提供几乎不会崩溃的无错误适配器。

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.0.1 (2025-12-30)
**not yet recommended for production use. beta test only**
* (René) bug fix: added missing OID configurations for public holiday and holidays at home
* (René) bug fix: 'function' for device search will be saved now
* (René) preselect 'function' and 'selected room' if nothing was selected / stored before

### 3.0.0 (2025-12-29)
**not yet recommended for production use. beta test only**
* (René) admin overworked completely with react and vite. **ATTENTION**: breaking changes in admin settings !!!
		Rooms can no longer be created manually. Only rooms that are generally configured in ioBrooker are used.
		The adapter attempts to migrate the configuration, but this cannot be guaranteed in any case.
* (René) csv-logging: path changed, one log per room now
* (arteck) always enable CopyProfile buttons
* (arteck) Refactor SetVis function to improve readability and maintainability

### 2.12.19 (2025-11-02)
* (René) csv-logging added (optionally), will be used in later enhancements

### 2.12.18 (2025-10-26)
* (René) bug fix sentry

### 2.12.17 (2025-10-26)
* (René) changes requested by adapter checker

### 2.12.16 (2025-10-04)
* (René) dependencies updated
* (René) bug fix see issue #682: HmIP-eTRV-2 not autodetected
* (René) changes requested by adapter checker

### 2.12.15 (2025-06-29)
* (René) HmIP-eTRV-B-2 R4M added to autodetect
* (René) new testing

### 2.12.14 (2025-02-27)
* (René) see issue #635: initial values (-99) not to write to object 
* (René) changes requested by adapter checker
* (René) dependencies updated

### 2.12.13 (2024-11-20)
* (René) see issue #607: minimum length of telegram user reduced to one char

### 2.12.12 (2024-11-20)
* (René) see issue #422: bug fix window open/close handling
* (René) update dependencies

### 2.12.11 (2024-10-21)
* (René) see issue #611: test with nodejs@22
* (René) see issue #617: bug fix: TemperaturOverrideRemainingTime is not correct after Override interruption

### 2.12.10 (2024-08-18)
* (René) update dependencies
* (René) adaption for new Vis-2 widgets (Weather / Heating)
* (René) bug fixes based on adapter checker recommendation

### 2.12.8 (2024-06-05)
* (René) bug fix heating period: calculation of cron job string fixed

### 2.12.7 (2024-05-28)
* (René) see issue #561: change of dependencies

### 2.12.5 (2024-03-01)
* (René) see issue #492: cron jobs recalculation is necessary after reboot if VacationAtHome and PublicHoliday is active
* (René) create cron job for PowerInterruption only if feature is active
* (René) bug fix: with cron 3.x status log of cron jobs were wrong

### 2.12.4 (2024-02-11)
* (René) dependencies updated
* (Marc-Berg) update readme "temperature decrease / increase"
* (René) in some cases undefined was sent in notification messages instead of actor name
* (René) bug fix related to cron@3.x.x: show next cron job event in log

### 2.12.3 (2024-01-12)
* (René) dependencies updated

### 2.12.2 (2023-12-16)
* (René) see issue #491: bug fix in offset calculation (NaN)

### 2.12.1 (2023-11-25)
* (René) issue #459: Show the number of objects that can be deleted in the log and indicate that they can be deleted in admin
* (René) issue #376: notification messages customizable

### 2.12.0 (2023-11-22)
* (René) dependencies updated
* (René) fix eslint reported issues
* (René) see issue #486: option to use offset calculation immediately
* (René) see issue #489: increase limit of status change list to 100

### 2.11.1 (2023-07-30)
* (René) dependencies updated

### 2.11.0 (2023-06-18)
* (René) see issue #368: units added in datapoints
* (René) see issue #361: EVU Sperrzeit / PowerInterruption (description see above)
* (René) see issue #359: support of discord added to notifications
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

Copyright (c) 2019-2025 René G. <info@rg-engineering.eu>

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