---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hue/README.md
title: ioBroker 飞利浦 Hue 桥适配器
hash: Rc6ilS4FX1PSwiEhplxS3IualIGE9rSvltuTHBEyc9w=
---
![标识](../../../en/adapterref/iobroker.hue/admin/hue.jpeg)

![安装数量](http://iobroker.live/badges/hue-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.hue.svg)
![下载](https://img.shields.io/npm/dm/iobroker.hue.svg)

# IoBroker 飞利浦 Hue 桥适配器
![测试与发布](https://github.com/iobroker-community-adapters/iobroker.hue/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/hue/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用服务[哨兵大作战](https://sentry.io)自动向我（作为开发人员）报告异常和代码错误以及新设备架构。**更多详细信息请参阅下文！

## Sentry.io 是什么以及向该公司的服务器报告什么？
Sentry.io 是一项服务，供开发人员获取有关应用程序错误的概述。这正是在该适配器中实现的。

当适配器崩溃或发生其他代码错误时，也会出现在 ioBroker 日志中的此错误消息会提交给 Sentry。
当您允许 ioBroker GmbH 收集诊断数据时，您的安装 ID（这只是一个唯一的 ID **没有**关于您、电子邮件、姓名等的任何其他信息）也包含在内。这允许 Sentry 对错误进行分组并显示有多少唯一用户受到此类错误的影响。所有这些都帮助我提供基本上不会崩溃的无错误适配器。

## 英语 :gb:
该适配器将您的飞利浦 Hue 桥与 ioBroker 连接起来，以控制飞利浦 Hue LED 灯泡、Friends of Hue LED 灯、条纹、欧司朗插头以及其他支持 SmartLink 的设备（例如 LivingWhites 和一些 LivingColors）。

＃＃＃ 设置
在 ioBroker 中安装此适配器后，请相应地创建一个适配器实例。接下来，您需要在适配器设置中将 Hue 桥连接到 ioBroker：

1. 如果您使用 v2 以外的其他网桥，请将端口配置为 80（非 https），否则应选择 443 (https)。
2. 单击“查找网桥”按钮获取网桥的 IP 地址。这将搜索您环境中的所有网桥。然后选择您要连接的网桥。 “网桥地址”字段将填充您选择的 Hue 网桥的 IP 地址。
3. 接下来，单击设置中的“创建用户”按钮，然后走到您的 Hue 桥接设备（即您的硬件）以按下其圆形按钮。您将有 30 秒的时间继续。按下按钮后，“Bridge User”字段应填充生成的字符串。
4. 修改适配器设置中的任何其他选项，然后选择“保存并关闭”。
5. 最后，您应该已准备就绪：适配器将生成所有对象来相应地控制您的 Hue 设备。

请注意：如果填充了“桥地址”字段，则适配器设置按钮“查找桥”将处于非活动状态；如果填充“桥用户”字段，则“创建用户”按钮将处于非活动状态。

＃＃＃ 设置
|名称 |描述 |
|----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| __网桥地址__ |您的 Hue 桥接器的 IP 地址，您可以尝试按 `Find Bridge` 按钮来检测它。 |
| __港口__ | Hue 桥的端口，通常为 443 (SSL) 和 80（非 SSL）。 |
| __用户__ |您的桥接用户的用户名。您可以通过按`Create User`按钮并按照屏幕说明进行创建。 |
| __用户__ |您的桥接用户的用户名。您可以通过按“创建用户”按钮并按照屏幕说明进行创建。 |
| __忽略场景__ |如果选中，场景将不会由适配器显示/控制。 |
| __“遗留”结构__ |为了支持向后兼容性，可以在 ioBroker 中保留旧的对象结构。这个旧结构是`hue.<instance_number>.<bridge_name_channel>.<light_or_group_channel>.<state>`。新结构删除了`<bridge_name_channel>`，因此需要适应旧脚本等。如果适配器检测到现有旧结构，则将使用该结构而不选中该复选框。但是，如果需要从旧结构迁移到新结构，请删除整个`hue.<instance_number>`命名空间一次。 |
| __“遗留”结构__ |为了支持向后兼容性，可以在 ioBroker 中保留旧的对象结构。这个旧结构是`hue.<instance_number>.<bridge_name_channel>.<light_or_group_channel>.<state>`。新结构删除了“<bridge_name_channel>”，因此需要适应旧脚本等。如果适配器检测到现有旧结构，则将使用该结构而不选中该复选框。但是，如果需要从旧结构迁移到新结构，请删除整个“hue.<instance_number>”命名空间一次。 |
| __同步软件传感器__ |还同步软件传感器。这些是虚拟传感器，例如由 Hue Labs 场景创建。通过控制此类传感器的`status`数据点，您可以启动/停止遵循此逻辑的场景。在大多数情况下，`0` 会关闭场景，`1` 将其打开。 |
| __与他人一起开启__ |还可以使用 ct 状态、颜色状态...设置为 `false` 并仅使用电源和亮度状态打开灯。 |
| __与他人一起开启__ |还可以使用 ct 状态、颜色状态等打开灯...设置为“false”并仅使用电源和亮度状态打开。 |
| __投票__ |如果选中，适配器将轮询状态变化，否则只能用于控制灯，而不能显示其状态。 |
| __轮询间隔__ |定义状态轮询的频率，从而在 ioBroker 中更新状态。在某些设置中，低轮询间隔可能会导致性能问题。因此，允许的最小轮询间隔为 2 秒。如果轮询间隔设置为小于 2 秒，则在运行时将设置为 2 秒。 |

### 命令
命令状态（例如`hue.0.All.command`）可用于向桥接器设置多个命令。
这允许使用例如将组或灯设置为特定状态。一个过渡时间。

```javascript
setState('hue.0.All.command', { "bri": 50, "transitiontime": 30 }, false);
```

对于包含场景的组，例如`hue.0.Wohnzimmer.scene_hell`，场景也可以通过过渡时间激活。
为此，请将场景参数传递给相应的命令。

```javascript
setState('hue.0.All.Wohnzimmer', { "scene": "hell", "transitiontime": 30 }, false);
```

＃＃＃ 附加信息
在版本 3.3.0 中，组状态 `anyOn` 和 `allOn` 变得可控，请注意，在受控制时，它们的行为就像 `on` 状态。在某些情况下，可能需要在可视化中具有可控的`anyOn`状态。

## 德语 :de:
Bindet Philips Hue / LivingColors / LivingWhites Lampen ein。
在适配器设置中，Hue Bridge 的 IP 被设置为用户名 konfiguriert werden。 Um einen User zu aktivieren, einmal auf create user drücken and dann insidehalb von 30 Sekunden den Button an der Hue Bridge drücken.用户可以自动执行此操作。

## 路线图/待办事项
* 自动桥发现
* 通过桥接按钮自动设置用户

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 3.10.0 (2023-08-29)
* (foxriver76) fixed problem on auto-deletion of groups
* (foxriver76) implemented Hue Tap Dial (closes #368, closes #416)

### 3.9.6 (2023-08-16)
* (foxriver76) do not set invalid states on unknown group updates
* (foxriver76) only use push connection if ssl is configured

### 3.9.5 (2023-07-31)
* (foxriver76) fixed crash case

### 3.9.4 (2023-07-30)
* (foxriver76) fixed the edge case crash on button updates
* (foxriver76) fixed crash case if uuids cannot be retrieved

### 3.9.3 (2023-06-14)
* (foxriver76) fixed crash cases on unknown push updates (closes #417)

### 3.9.2 (2023-06-13)
* (foxriver76) fixed sensor converting (closes #415)

### 3.9.1 (2023-06-13)
* (foxriver76) implemented more commands of the Push API (mainly buttons)

### 3.9.0 (2023-06-11)
* (foxriver76) implemented poll API (closes #227, #343)
* (foxriver76) fixed polling not working (closes #408, #410)

### 3.8.0 (2023-06-09)
* (Schmakus) Possibility to disable turn on lights with states other than `on` and `brightness` [#386]

### 3.7.1 (2022-07-12)
* (Eistee82) also update state for `CLIPGenericFlag` sensors

### 3.7.0 (2022-05-30)
* (foxriver76) support software sensor `CLIPGenericFlag` (closes #328)

### 3.6.5 (2022-01-11)
* (foxriver76) correctly identify third party switches (closes #273)

### 3.6.3 (2022-01-09)
* (foxriver76) added `info.connection` state (closes #268)

### 3.6.1 (2022-01-09)
* (foxriver76) ct values of groups can be even lower due to third party lights

### 3.6.0 (2021-12-30)
* (foxriver76) allow triggering scenes via `command` state, this allows starting a scene with `transitiontime`

### 3.5.31 (2021-11-20)
* (foxriver76) ct value fixed of #234 ported for 0 (All) group

### 3.5.30 (2021-11-14)
* (foxriver76) we fixed Sentry IOBROKER-HUE-1K, IOBROKER-HUE-A, IOBROKER-HUE-1J

### 3.5.29 (2021-11-14)
* (bluefox) Caught SENTRY error.

### 3.5.28 (2021-11-04)
* (foxriver76) another fixed for invalid ct values (fixes #234)

### 3.5.27 (2021-11-01)
* (foxriver76) we fixed missing object type of some scenes (closes #255)

### 3.5.26 (2021-10-20)
* (foxriver76) fixed an issue with the username set in Hue API (fixes 249)
* (klein0r) fixed translation of search popup (fixes #247)

### 3.5.25 (2021-09-15)
* (foxriver76) if we cannot determine the correct ct value, we won't set it (fixes #234)

### 3.5.23 (2021-08-26)
* (Pmant) fixed for third party devices delivering wrong ct values

### 3.5.22 (2021-08-12)
* (foxriver76) fixed several sentry issues (closes #217, closes #218, closes #219, closes #220)

### 3.5.20 (2021-08-10)
* (foxriver76) we now define minimum ct of groups to 2000 instead of 2179 (fixes #216)

### 3.5.19 (2021-06-02)
* (foxriver76) fixed crash case if we cannot get min/max ct values

### 3.5.18 (2021-06-01)
* (foxriver76) get the correct min/max ct values from api for lights (closes #192)

### 3.5.17 (2021-05-26)
* (foxriver76) prevent edge case crash (fixes #196)

### 3.5.16 (2021-05-07)
* (foxriver76) make buttons type `boolean` (closes #189)

### 3.5.15 (2021-05-05)
* (foxriver76) fixed some default type values, which produced warnings once

### 3.5.14 (2021-05-04)
* (foxriver76) protect the user token from access by foreign adapters
* (foxriver76) fixed types of default values on groups

### 3.5.13 (2021-05-03)
* (foxriver76) we fixed some more types

### 3.5.12 (2021-05-02)
* (foxriver76) we give skipped switches common.type 'mixed' instead of none
* (foxriver76) we have corrected the min max of color temperature (empirically found)

### 3.5.11 (2021-05-02)
* (foxriver76) we now update objects if a type has changed

### 3.5.10 (2021-04-30)
* (foxriver76) we removed the common.max from lightlevel, was 17,000 but can be much higher
* (foxriver76) we added common.type for states where the attribute was missing

### 3.5.9 (2021-04-30)
* (foxriver76) start this adapter in TIER 2

### 3.5.8 (2021-04-17)
* (foxriver76) minor changes

### 3.5.5 (2021-04-07)
* (foxriver76) fixed a bug where an error on user creation crashed the adapter instance

### 3.5.4 (2021-03-25)
* (foxriver76) fixing several edge case crashes

### 3.5.2 (2021-02-24)
* (foxriver76) fixed crashes if wrong data type or invalid value passed for ct and hue, now logging an error
* (foxriver76) fixed crashes if rgb where outside allowed range or wrong type
* (foxriver76) fixed potential crashes on bridge discovery, due to unnecessary stringify/parse logic
* (foxriver76) fixed a graphical issue with the label of bridge user when newly created, due to missing call of updateTextFields

### 3.5.1 (2021-02-20)
* (foxriver76) avoid crash cases on invalid xy, setting state for non-existing device and on failing user creation

### 3.5.0 (2021-02-18)
* (foxriver76) use official js-controller regex for replacing forbidden chars (fixes #165)
* (foxriver76) use release-script
* (foxriver76) sentry added

### 3.4.0 (2021-01-20)
* (foxriver76) we now restart the adapter automatically to add new devices if they have been added to bridge

### 3.3.11 (2021-01-12)
* (foxriver76) fixed updating `anyOn` and `allOn` if legacy structure used

### 3.3.9 (2021-01-11)
* (foxriver76) we do not set states of non-existing states anymore

### 3.3.8 (2020-10-11)
* (foxriver76) marked read-only states accordingly

### 3.3.7 (2020-10-04)
* (Apollon77) do not catch undhandeledRejections anymore, because controller can handle and report now
* (foxriver76) dependencies updated
* (foxriver76) temperature is now correctly read-only
* (foxriver76) fixed duplicate filtering on browse

### 3.3.5 (2020-06-03)
* (foxriver76) fixed issue on frontend validation of polling intervals starting with 1

### 3.3.4 (2020-06-02)
* (foxriver76) implemented fixed for problems with switches and handling id conflicts

### 3.3.3 (2020-05-31)
* (foxriver76) we now handle potential id conflicts, when adding devices from a different type with same name over time

### 3.3.2 (2020-05-15)
* (foxriver76) internal optimizations - polling after change timeout removed, was 150 ms now instant

### 3.3.0 (2020-05-14)
* (foxriver76) introduce `allOn` state for groups
* (foxriver76) `anyOn` and `allOn` are now controllable and act like the `on` state
* (foxriver76) when native turn on/off behaviour is used, the brightness change of partially turned on groups will not turn
the whole group on, like the hue app does, instead it will only change the brightness of the currently turned on lamps

### 3.2.9 (2020-05-12)
* (foxriver76) fixed issues on user creation
* (foxriver76) minor frontend (admin config) optimizations

### 3.2.8 (2020-04-26)
* (foxriver76) replace dots in light/group/sensor/.. names by underscores
* (foxriver76) fixed potential state update delay after state change on lights/groups containing blanks

### 3.2.4 (2020-04-08)
* (xXBJXx) changed role of battery to `value.battery` and made unit `%`

### 3.2.3 (2020-02-20)
* (Apollon77) minor fixed regarding handleParam called with non-existing id

### 3.2.2 (2020-02-12)
* (foxriver76) fixed potential issues when error type is not HueError

### 3.2.1 (2020-01-26)
* (foxriver76) if lights/groups/sensors are deleted during runtime, restart of adapter is no longer necessary
* (foxriver76) if controller supports recursive deletion, device will be deleted automatically

### 3.1.1 (2020-01-15)
* (foxriver76) added additional frontend validation of polling interval
* (foxriver76) if errors are hue errors, log message instead of Error

### 3.1.0 (2020-01-12)
* (foxriver76) added new indicators for entertainment groups (class and activeStream)
* (foxriver76) added possibility to enable/disable streaming of entertainment group

### 3.0.3 (2020-01-11)
* (foxriver76) fixed turning on/off switchs like Osram Plug

### 3.0.1 (2020-01-10)
* (foxriver76) removed queue, because handled by dependency now
* (foxriver76) improved error handling
* __Nodejs >= 10 required__

### 2.5.0 (2019-12-23)
* (foxriver76) implemented a mechanic to prevent regular polling of recently changed state
* (foxriver76) this prevents fluctuating of buttons on low polling intervals + possible strange triggers in scripts

### 2.4.7 (2019-12-14)
* (foxriver76) do not set default values on every adapter start
* (foxriver76) this is now done only on object creation

### 2.4.6 (2019-12-06)
* (foxriver76) log unhandeld promise rejections
* (foxriver76) fixed potential issue for negative temperature values

### 2.4.4 (2019-11-27)
* (foxriver76) only stringify huge jsons if necessary
* (foxriver76) prevent possible double polling at adapter start
* (foxriver76) use timeouts instead of interval
* (foxriver76) improved performance

### 2.4.3 (2019-11-19)
* (foxriver76) increased version of node-hue-api to fixed authentication for old bridge

### 2.4.2 (2019-11-16)
* (foxriver76) we now use nupnp + upnp to discover bridges (previously only upnp)

### 2.4.1 (2019-11-13)
* (foxriver76) added possibility to control zones and entertainment areas
* (foxriver76) log queue retires on debug instead warn
* (foxriver76) __BETA__: added possibility to control software sensors (Note: this may be handled in a more suitable fashion soon)

### 2.3.1 (2019-11-02)
* (foxriver76) fixed controlling `on` state of sensors

### 2.2.3 (2019-10-21)
* (foxriver76) migrate everything to Hue v3
* (foxriver76) add possibility to turn on/off sensor
* (foxriver76) add anyOn state for all group
* (foxriver76) different kinds of fixes for v3 (Osram Plugs, SSL connection, etc)

### 2.1.0 (2019-10-15)
* (foxriver76) usage and adaptions for node-hue-api v3
* (foxriver76) ability to turn lights on with last settings
* (foxriver76) polling interval minimum is now 2 sec

### 2.0.1 (2019-10-04)
* (foxriver76) fixed bug, that prevented some sensor states getting updated during runtime

### 2.0.0 (2019-09-23)
__ATTENTION: Remove all objects once, ids have changed__
* (foxriver76) internal optimizations
* (foxriver76) usage of iobroker testing
* (foxriver76) add possibility to sync scenes
* (foxriver76) restart adapter when room is deleted in app
* (foxriver76) fixed .hue value, user had to set 0-360° but adapter set 0-65535
* (foxriver76) fixed .color.temperature
* (foxriver76) remove unnecessary bridge channel, adapter namespace is the bridge
* (foxriver76) add "update available" indicator for light bulbs
* (foxriver76) we now poll the root endpoint instead of (|lights| + |groups| + |sensors|) endpoints every pollingInterval seconds
* (foxriver76) min poll interval now 3 seconds instead of 5 seconds
* (foxriver76) add new indicator state 'anyOn'

### 1.2.4 (2019.09.18)
* (Apollon77) Make compatible with js-controller 2.0

### 1.2.3 (2019.03.11//2019.07.07)
* (jens-maus) Refactored command queue handling to use 'bottleneck' package so that command execution are processed with minimum delay.

### 1.1.2 (2019.01.25)
* (BasGo) Added compact mode

### 1.1.1 (2018.08.17)
* (bluefox) Ignoring of groups was implemented

### 1.1.0 (2018.08.17)
* (bluefox) The command queue was optimized

### 1.0.1 (2018.08.14)
* (bluefox) Roles were adjusted
* (bluefox) temperature changed from 153-cold, 500-warm to 2200-warm, 6500-cold
* (bluefox) hue changed from 0-65535 to 0-360°

### 1.0.0 (2018.04.12)
* (arteck) Enable/Disable OSRAM check from HUE Bridge
* (arteck) polling ZLLSwitch and ZGPSwitch     
* (bluefox) admin3
* (bluefox) do not send commands ofter than 10 in 10 seconds

### 0.6.9 (2017.05.18)
* (bluefox) Enable adapter by default

### 0.6.8 (2017.04.22)
* (bluefox) Poll groups

### 0.6.7 (2017.04.21)
* (bluefox) Fix error with turn on the lamp on start
* (bluefox) configurable port

### 0.6.6 (2017.04.20)
* (bluefox) Use new version of npm library

### 0.6.0 (2016.11.30)
* (pmant) support new lamps
* (pmant) add light name to log

### 0.5.9 (2016.10.11)
* (pmant) fixed error with null values

### 0.5.8 (2016.06.05)
* (bluefox) fixed typo

### 0.5.7 (2016.06.05)
* (soef) write back known states for group/room
* (soef) Integer conversion for bri_inc command

### 0.5.6
* (Pmant) (experimental) support for power switches

### 0.5.5
* (Pmant) fixed error with xy state
* (Pmant) support level in command state

### 0.5.4
* (Pman) Lightset 0 fixed
* (Pman) support for diffent gamuts
* (Pman) support Rooms (new HUE App)

### 0.5.3
* (soef) Default Lightset 0 added

### 0.5.2
* (Pman) fixed jscs warnings
* (Pman) improve RGB conversion
* (Pman) add update rgb color

### 0.5.1
* (Pman) fixed find bridge popup

### 0.5.0
* (Pman) update to node-hue-api 1.2.x
* (Pman) add level state (bri percentage)

### 0.4.4
* (bluefox) fixed config edit

### 0.4.3
* (Pmant) fixed adapter crash

### 0.4.2
* (Pmant) add find bridge (experimental)
* (Pmant) add create user (experimental)
* (Pmant) fixed enable polling

### 0.4.1
* (Pmant) calculate and write back inc values

### 0.4.0
* (Pmant) add command state

### 0.3.2
* (Pmant) add groups as channels (write only)
* (Pmant) fixed prevent duplicate channel names

### 0.3.1
* (Pmant) fixed another bug with spaces
* (Pmant) fixed hue/sat bug
* (Pmant) fixed effect bug
* (Pmant) fixed xy colormode

### 0.3.0
* (Pmant) fixed rgb states only for color lights
* (Pmant) change set known state changes immediately
* (Pmant) change on/off sets brightness to 254/0
* (Pmant) change changing any color (hs,ct,xy) while light is off sets brightness to max
* (Pmant) fixed set brightness to zero if light is off
* (Pmant) change set bri to zero if lamp is not reachable
* (Pmant) fixed bridges and lamps with spaces in name

### 0.2.1
* (Pmant) add rgb states (write only)
* (Pmant) fixed parent/children warnings
* (Pmant) add switch light off if brightness is zero

### 0.1.4
* (bluefox) fixed some null objects

### 0.1.3
* (hobbyquaker) config UI
* (hobbyquaker) added children

### 0.1.2
* (hobbyquaker) fixes

### 0.1.1

* (hobbyquaker) fixed min/max attributes
* (hobbyquaker) added common.oper.read/write attributes

### 0.1.0

* (hobbyquaker) first release

## License

Apache 2.0

Copyright (c) 2017-2023 Bluefox <dogafox@gmail.com>
Copyright (c) 2014-2016 hobbyquaker