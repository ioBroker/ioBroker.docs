---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.smartgarden/README.md
title: ioBroker.smartgarden
hash: qrgJEiDMDViW5Z6lGxPIN0nq47USKW2owEXtVvTlcxA=
---
![标识](../../../en/adapterref/iobroker.smartgarden/admin/smartgarden.png)

![已安装](http://iobroker.live/badges/smartgarden-installed.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.smartgarden.svg)
![下载](https://img.shields.io/npm/dm/iobroker.smartgarden.svg)
![构建状态](https://travis-ci.org/jpgorganizer/ioBroker.smartgarden.svg?branch=master)
![稳定的](http://iobroker.live/badges/smartgarden-stable.svg)
![NPM](https://nodei.co/npm/iobroker.smartgarden.png?downloads=true)

# IoBroker.smartgarden
## GARDENA 智能系统的 ioBroker smartgarden 适配器
使用官方 [GARDENA 智能系统 API](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/general) 和服务的 GARDENA 智能系统适配器。

该适配器允许开发可与官方 GARDENA 应用程序并行使用的应用程序（例如，使用 VIS）。适配器及其附加功能不会影响 GARDENA 应用程序的任何基本功能，反之亦然。

该适配器不是 GARDENA 应用程序的完全替代品，而是将 GARDENA 设备集成到带有 ioBroker 的智能家居中的补充。
可以使用适配器执行最重要的操作。它还提供了实现您自己的想法的机会，而这些想法是 GARDENA 应用程序无法实现的。

## 支持的设备
  - GARDENA 智能 SILENO 机器人割草机
  - GARDENA 智能灌溉控制
  - GARDENA 智能压力泵
  - GARDENA 智能水控
  - GARDENA 智能电源适配器
  - GARDENA 智能传感器

有关设备的更多信息，请参阅 [GARDENA 德国网站](https://www.gardena.com/de/produkte/smart/smartsystem/) 和 [这里是英文](https://www.gardena.com/uk/products/smart/smart-system/)。

＃＃ 要求
要使用此适配器，您需要具备以下条件：

1.一个GARDENA智能系统账号
1. GARDENA 应用程序密钥
1. GARDENA 应用秘密

要获得这些东西，请访问位于 [https://developer.husqvarnagroup.cloud/](https://developer.husqvarnagroup.cloud/) 的 Husqvarna 开发人员门户。

如果您已经有一个帐户，请注册或登录并创建一个新的应用程序以获取您的*应用程序密钥*和*应用程序秘密*。

目前该网站看起来像以下屏幕截图。

---

![我的应用程序](../../../en/adapterref/iobroker.smartgarden/img/myapplications.png)

按下按钮**新应用程序**

---

![创建新应用程序](../../../en/adapterref/iobroker.smartgarden/img/createnewapplication.png)

使用您自己的数据编辑表单。当前未使用字段 *Redirect URLs*。这就是您目前可以输入任何值的原因。
按下按钮**创建**

---

![mysmartgarden应用程序](../../../en/adapterref/iobroker.smartgarden/img/mysmartgardenapplication.png)

在下一页，您将获得*应用程序密钥*和*应用程序秘密*。
您的适配器实例配置需要这些值。
你必须连接 API

  - 认证API ***和***
  - GARDENA 智能系统 API。

为此，按下按钮 **CONNECT NEW API** 并选择第一个 API。并重复第二个 API。

---

**笔记：**

  - 如果您已经拥有 Husqvarna Automower® Connect 或

GARDENA 智能系统帐户，您可以使用该帐户登录并继续创建应用程序以获取应用程序密钥和应用程序密码。

	---

***而且几乎可以肯定您有一个帐户。*** *请使用与注册 GARDENA 设备的 GARDENA 应用程序相同的帐户。否则您将无法访问您的设备。*

	---

  - 确保您已将应用程序连接到 API
    - 认证API ***和***
- GARDENA 智能系统 API。

当然，您需要一个正在运行的 ioBroker 安装（至少使用 admin5 UI）并且您应该拥有至少一个可用的 [GARDENA 智能设备](#supported-devices)。

＃＃ 目录
  * [用于 GARDENA 智能系统的 ioBroker smartgarden 适配器](#iobroker-smartgarden-adapter-for-gardena-smart-system)
  * [支持的设备](#supported-devices)
  * [要求](#requirements)
  * [目录](#目录)
  * [安装](#安装)
  * [设置适配器](#setup-adapter)
  * [获得支持](#getting-support)
  * [适配器的数据点](#data-points-of-the-adapter)
     * [关于数据点的一般知识](#general-things-to-know-about-data-points)
     * [对于 SERVICE_MOWER](#for-service_mower)
     * [对于 SERVICE_VALVE_SET](#for-service_valve_set)
     * [For SERVICE_VALVE](#for-service_valve)
     * [对于 SERVICE_POWER_SOCKET](#for-service_power_socket)
     * [对于 SERVICE_SENSOR](#for-service_sensor)
     * [对于 SERVICE_COMMON](#for-service_common)
  * [速率限制](#rate-limits)
  * [割草时不允许灌溉](#Irrigation-not-allowed-while-mowing)
     * [有什么问题？](#whats-the-problem)
* [正在做什么？](#what-is-being-done)
* [基本行为——警告](#basic-behaviour----warning)
  * [希望数据点](#Wishes-for-data-points)
  * [注](#note)
  * [更新日志](#changelog)
     * [2.0.0](#200)
     * [1.0.6](#106)
     * [以前的版本](#105)
  * [学分](#credits)
  * [许可证](#license)

＃＃ 安装
适配器可用

- 在 npm：使用 `npm install iobroker.smartgarden` 安装
- 在 https://github.com/jpgorganizer/ioBroker.smartgarden 下的 GitHub 上。

[这里](https://www.iobroker.net/docu/index-235.htm?page_id=5379&lang=de#3_Adapter_aus_eigener_URL_installieren)（德语）提供了如何从 GitHub 安装的说明。

## 设置适配器
1.安装适配器
2.创建适配器实例
3. 检查并完成实例配置

   **如果您更改这些设置的任何值，请重新启动您的适配器。**

3.1 在主实例配置中编辑应用程序密钥和应用程序机密和/或可选的用户名、密码

      |参数 |说明 |
      | - | - |
|***必填***||
      |应用程序密钥 |应用程序密钥（API 密钥），例如根据 [要求](#requirements) |
| *应用程序秘密*<br>或 *用户名和密码* \*) \*\*)||
      |应用秘密\*)|应用程序机密，例如在 [要求](#requirements) 下 - 仅当 *username* 和 *password* 为空时（v2.0.0 中的新功能）*|
      |应用秘密\*)|应用程序机密，例如在 [Requirements](#requirements) 下 - 仅当 *username* 和 *password* 为空时（v2.0.0 中的新功能）*|
|***不推荐***||
      |用户名 \*) \*\*)| GARDENA smart 系统的用户名 - 仅当*application secret* 为空时|
      |密码 \*) \*\*)|相应的密码 - 仅当指定了 *username* 时|

**注意：** \*)

     - 从版本 v2.0.0 **首选的登录程序是使用*应用程序密钥*和

Gardena 不再支持 *application secret*** 作为以前使用 *username* 和 *password* 的登录程序，但它仍然适用于许多用户。
因此，它在这里仍然可用，但如果出现错误，将不再提供任何支持。
所以推荐使用*application key*和*applicaton secret*！

     - *应用程序密钥*、*应用程序秘密*和*密码*被加密并存储在

     适配器并变为刚刚解密以用于 GARDENA 应用程序主机的身份验证。

   \*\*)

     - 参数已停用，未来版本可能不再可用

3.2 验证杂项设置的默认值并在实例配置中打开/关闭选项。对于大多数用户来说，默认值就可以了。

      |参数 |说明 |
      | - | - |
      |预测 |使用预测充电时间和割草机剩余时间；打开/关闭割草机的预测充电和割草时间；默认值：关闭； *（v0.5.0 中的新功能）*|
      |周期 |割草机历史周期数；您可以使用 3（最小值）中的任何数字，但 10（默认值）似乎是一个不错的值；仅当上述 *'forecast'* 开启时才相关； *（v0.5.0 中的新功能）*|
      |灌水检查|使用检查割草时是否允许灌溉；打开/关闭；默认值：关闭； *（v0.6.0 中的新功能）*|
|监控限制 |对 Gardena 智能系统 API 的速率限制使用监控；打开/关闭；默认值：关闭； *（v1.0.2 中的新功能）*|

3.3 验证系统设置的默认值并在实例配置中打开/关闭选项。 **大多数用户不必更改此选项卡上的任何内容。**

      |参数 |说明 |
      | - | - |
      |日志级别 |日志级别：0 = 没有日志条目，1 = 一些日志条目，2 = 更多日志条目，3 = 所有日志条目；默认值：0 - 无日志条目|
      |美化日志 |使日志中的状态 ID 更短；打开/关闭；默认值：开； *（v1.0.5 中的新功能）*|
      |连接重试间隔 |出现错误时重试连接到 Gardena Webservice 的时间间隔（以秒为单位）；默认值：300，最小值：60； *（v1.0.3 中的新功能）*|
      | ping 间隔 |将 Ping 发送到 Gardena Webservice 的时间间隔（以秒为单位）；默认值：150，最小值：1，最大值：300|
      |授权因素 |身份验证令牌有效性的因素；默认值：0.999 |
      |授权网址|认证主机网址；默认值：[https://api.authentication.husqvarnagroup.dev](https://api.authentication.husqvarnagroup.dev)|
      |基本网址| Web 服务基础 URL；默认值：[https://api.smart.gardena.dev](https://api.smart.gardena.dev)|

## 获得支持
要获得帮助，请仔细阅读此 [自述文件](README.md) 和 [FAQ](FAQ.md)。
如果您需要进一步的支持，请加入 [ioBroker 论坛主题](https://forum.iobroker.net/topic/31289/neuer-adapter-smartgarden-adapter-for-gardena-smart-system)。

## 适配器的数据点
该适配器旨在监视和控制 GARDENA 智能系统设备。
为此，将有一个 `LOCATION` 和一个或多个 `DEVICE`。
对于每个 `DEVICE` 都会有

  - 一个`SERVICE_COMMON_<id>`和
  - 一个或多个`SERVICE_<servicelink_type>_<id>`。

其中 `<servicelink_type>` 是设备的类型描述，例如 MOWER 或 VALVE，而 `<id>` 是 API 使用的（编码的）GARDENA 设备 ID。
请参阅 [https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger) 中的 ServiceLink 说明。

通过下表中列出的 `SERVICE_<servicelink_type>` 可以控制/监视每个设备。 `SERVICE_COMMON` 提供有关设备的一般信息。

  |设备 | SERVICE_<服务链接类型> |
  | - | - |
  |智能 SILENO 机器人割草机 | SERVICE_MOWER 和 SERVICE_COMMON |
  |智能灌溉控制 | SERVICE_VALVE_SET、SERVICE_VALVE 和 SERVICE_COMMON |
  |智能压力泵 | SERVICE_VALVE 和 SERVICE_COMMON |
  |智能控水 | SERVICE_VALVE 和 SERVICE_COMMON |
  |智能电源适配器| SERVICE_POWER_SOCKET 和 SERVICE_COMMON |
  |智能传感器 | SERVICE_SENSOR 和 SERVICE_COMMON |

如果您需要有关数据点的更多信息，请查看 [https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger)。
在那里你会找到每个数据点的描述；除了那些被标记为适配器的数据点而不是 GARDENA 智能系统 API 的数据点。

选择功能时，适配器会为各种功能/选项创建自己的数据点。取消选择特征时，不会自动删除这些数据点。如果您不再需要这些数据点，可以手动删除它们。

### 关于数据点的一般知识
适配器不会更改 GARDENA 智能系统 API 传输的任何值。
唯一要做的事情（从版本 1.0.0 开始）是检查 *timestamps* 和 *numbers* 的类型。

|检查 |说明 |
| - | - |
|时间戳 |所有时间戳均以 UTC 格式给出；如果接收到的时间戳不是有效时间戳，则使用 `01 Jan 1970 00:00:00Z`（Unix 时间零）代替。因此，如果您看到此日期/时间，请报告。 |
|数字 |如果数字不是有效数字，则使用“-1”代替。所以如果你看到这个数字，请报告。 |

一旦命令被智能网关接受，控制设备的请求就会成功。可以通过相应的状态变化观察到命令在设备本身上的成功执行。
*示例：* 发送命令以启动智能水控的 VALVE 服务将导致设备处理命令后服务的 `activity_value` 数据点发生更改。

**笔记：**

  - 当 smartgarden 适配器未关闭时，无法发送控制设备的请求

    连接到 GARDENA 智能系统 API。

  - 请检查您是否使用 `ack=false` 为命令设置了值。请参阅[适配器开发人员指南中的命令和状态章节](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#commands-and-statuses)

### 对于 SERVICE_MOWER
#### 控制
控制设备使用数据点

- `activity_control_i`：输入`string`

  *此数据点由适配器生成，由于 GARDENA 智能系统 API 而不是必需的。*

  更改此数据点以启动割草机。

  - 要开始定义的时间，请将值设置为计划的持续时间

  秒（请使用 60 的倍数；最小值为 60）；考虑数据类型`string`

  - 对于自动操作设置字符串 `START_DONT_OVERRIDE`
  - 取消当前操作并返回充电站使用

  字符串 `PARK_UNTIL_NEXT_TASK`

  - 取消当前操作，返回充电站并忽略

  计划使用字符串 `PARK_UNTIL_FURTHER_NOTICE`

  **注意：** 割草机只有在电池充满电的情况下才能启动。

#### 监控
所有其他数据点仅用于监控和信息。

特殊数据点：

- `activity_mowing_i`

  *此数据点由适配器生成，由于 GARDENA 智能系统 API 而不是必需的。*

  此数据点显示割草机的两种不同状态：

  - `true`：割草或
  - `false`：不割草。

该数据点可用于了解割草机是否安全地在草坪上很重要的进一步行动。

根据数据点 `activity_value` 的值设置此数据点。
详情请见下表。

  | `activity_value` | `activity_mowing_i` |
  |`OK_CHARGING` 割草机必须割草，但电量不足，无法充电。 |假 |
  |`PARKED_TIMER` 割草机根据计时器停放，将在配置的时间再次启动。 |假 |
  |`PARKED_PARK_SELECTED` 割草机已停放，等待另行通知。 |假 |
  |`PARKED_AUTOTIMER` 由于草高度不足，割草机跳过割草。 |假 |
  |`PAUSED` 割草机处于舱门关闭的等待状态。 |假 |
  |`OK_CUTTING` 割草机正在自动模式下切割（计划）。 |真 |
  |`OK_CUTTING_TIMER_OVERRIDDEN` 割草机正在超出计划进行切割。 |真 |
  |`OK_SEARCHING` 割草机正在寻找充电站。 |真 |
  |`OK_LEAVING` 割草机即将离开充电站。 |真 |
  |`NONE` 没有活动发生，可能是由于错误。 |真 |
  |`NONE` 没有活动发生，可能是由于错误。 |真 |
  |所有其他值|真 |

- `batteryState_chargingTime_remain_i` *（在 SERVICE_COMMON 下...）* 和<br/>

`activity_mowingTime_remain_i` *（在 SERVICE_MOWER...下）*

  *两个数据点均由适配器生成，由于 GARDENA 智能系统 API 而不是必需的。*

这些数据点显示了对割草机剩余充电和割草时间的预测（以秒为单位）。
它们仅在实例配置中选择功能时创建。

为了预测一个值，最近几个充电和割草周期的历史记录保存在两个状态 `info.saveMowingHistory` 和 `info.saveChargingHistory` 中。

可以在适配器实例配置中打开/关闭此功能以及历史上保存的充电和割草周期数。

要启用此功能，**请确保至少有一个循环的割草和充电运行没有错误（例如没有手动中断或传感器控制）。**最好至少完成三个运行没有错误。
此函数尝试识别正常情况，并最初假定下一个过程是正常情况。如果这是错误的，那么这个错误的运行被认为是正常情况，然后正常通过的运行被认为是错误情况。如果在运行过程中出现错误，请停止适配器，删除两个数据点并重新启动。

有关一般预测机制的更多信息，请参阅 [预测.md](FORECAST.md)。

  **笔记：**

    1. 只有至少一个完整的预测值才可用

充电和割草周期被保存在历史中。

    2. 历史保存在`info`下，这样如果`LOCATION`需要

被删除，例如如果将来进行更新，它不会丢失。

    3. 如果您断开割草机与 GARDENA 智能系统的连接并且

再次重新连接历史记录丢失，因为您的割草机在 GARDENA 智能系统中获得了一个新 ID。这意味着适配器无法将割草机识别为之前的割草机 - 可能是第二台割草机。
在这种情况下，建议删除这两个数据点并重新启动适配器，这样以前的（现在是旧的）历史集就不会不断地被读取和写入。然后适配器开始构建新的历史记录。

4.此功能应该适用于不止一台割草机，但它是

未测试 *（我不能那样做，因为我只有一台割草机）*。
如果您有不止一台割草机，请测试并报告错误，当然还要报告它是否按预期工作。在此先感谢您。

- `lastErrorCode_value`

请特别注意数据点 `lastErrorCode_value`。
可以在 https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger 找到可能值的描述，请参阅“MowerService - lastErrorCode”

### 对于 SERVICE_VALVE_SET
#### 控制
控制设备使用数据点

- `stop_all_valves_i`：输入`string`

  *此数据点由适配器生成，由于 GARDENA 智能系统 API 而不是必需的。*

  更改此数据点以停止所有阀门。

  - 要立即停止所有阀门，请使用字符串“STOP_UNTIL_NEXT_TASK”

**注意：**不要在您的应用程序中显示此数据点的值，因为该值大部分是未定义的。此外，此数据点不能作为您自己操作的触发器，因为它只是在命令被触发后设置为值 *null*。

#### 监控
所有其他数据点仅用于监控和信息。

### 对于 SERVICE_VALVE
#### 控制
控制设备使用数据点

- `duration_value`：输入`string`

  更改此数据点以启动阀门。

  - 要启动定义的时间，请将值设置为以秒为单位的值

  （请使用 60 的倍数；最小为 60）；考虑数据类型 `string`。

**注意：** 允许的值有一些限制。
如果您看到其他限制，请报告。

    |设备 |限制 |
    | - | - |
    |GARDENA 智能灌溉控制| 5400 秒（90 分钟） |
    |GARDENA 智能水泵 | 36000（10 小时） |
    |GARDENA 智能控水器| 36000（10 小时） |

  - 取消当前浇水并继续使用字符串

  `STOP_UNTIL_NEXT_TASK`

  - 要跳过自动操作直到指定时间，当前活动

操作可能会或可能不会被取消（取决于设备型号）使用字符串 `PAUSE_<number_of_seconds>`，例如`PAUSE_86400` 暂停 24 小时（请使用 60 的倍数；最小值为 60）

  - 如果暂停，要恢复自动操作，请使用字符串 `UNPAUSE`

- `irrigationWhileMowing_allowed_i` 和 `irrigationWhileMowing_mowerDefinition_i`

  *此数据点由适配器生成，由于 GARDENA 智能系统 API 而不是必需的。*

这些数据点可以控制*割草时不允许灌溉*。
它们仅在实例配置中选择功能时创建。
有关此功能的说明，请参阅章节 [割草时不允许灌溉](#Irrigation-not-allowed-while-mowing)。

#### 监控
所有其他数据点仅用于监控和信息。

特殊数据点：

-`duration_leftover_i`

  *此数据点由适配器生成，由于 GARDENA 智能系统 API 而不是必需的。*

该值描述了阀门关闭和浇水停止之前的分钟数。

    - 一个整数，一个 (`1`) 或更多。
    - 如果未定义则为 `null`

### 对于 SERVICE_POWER_SOCKET
#### 控制
控制设备使用数据点

- `duration_value`：输入`string`

  更改此数据点以启动电源插座。

  - 要启动定义的时间，请将值设置为以秒为单位的值

  （请使用 60 的倍数；最小为 60）；考虑数据类型`string`

  - 要永远打开设备，请使用字符串“START_OVERRIDE”。
  - 要停止设备，请使用“STOP_UNTIL_NEXT_TASK”。
  - 跳过自动操作直到指定时间。当前活跃的操作

不会被取消。使用字符串 `PAUSE_<number_of_seconds>`，例如`PAUSE_86400` 暂停 24 小时（请使用 60 的倍数；最小值为 60）

  - 如果暂停，要恢复自动操作，请使用字符串 `UNPAUSE`

#### 监控
所有其他数据点仅用于监控和信息。

特殊数据点：

-`duration_leftover_i`

  *此数据点由适配器生成，由于 GARDENA 智能系统 API 而不是必需的。*

  该值描述电源插座关闭前的分钟数。

    - 一个整数，一个 (`1`) 或更多。
    - 如果未定义则为 `null`

### 对于 SERVICE_SENSOR
#### 控制
没有可用的控制功能。

#### 监控
所有数据点仅用于监控和信息。

### 对于 SERVICE_COMMON
`SERVICE_COMMON` 提供有关设备的一般信息。
必要时将描述集成到其他 SERVICE_... 的描述中。

## 速率限制
您应该注意一些限制。
请参阅 GARDENA 智能系统 API 说明的 [*自述文件*](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/readme) 中的*速率限制*一章。

为了帮助您查看是否达到了这些速率限制，您可以使用参数 *monitoring Rate Limits* 在实例配置中打开监控。

如果您启用了监视状态，`info.RateLimitCounter` 会随着每个请求而实现。
此状态保存了一个数据结构，其中包含每月、每天、每小时以及过去 30 天和 31 天的请求数。

该结构位于 [JSON](https://en.wikipedia.org/wiki/JSON) 中，看起来像

```
{
  "2020": {                          <<< year
    "2020-08": {                     <<< month
      "count": 21,                   <<< number of requests for month
      "2020-08-27": {                <<< day
        "11": {                      <<< hour
          "count": 3                 <<< number of requests for hour
        },
        "12": {                      <<< hour
          "count": 13                <<< number of requests for hour
        },
        "count": 16                  <<< number of requests for day
      },
      "2020-08-28": {                <<< day
        "14": {                      <<< hour
          "count": 5                 <<< number of requests for hour
        },
        "count": 5                   <<< number of requests for day
      }
    }
  },
     ...
  "last30days": {
    "count": 2021                    <<< number of requests in last 30 days
  },
  "last31days": {
    "count": 2098                    <<< number of requests in last 31 days
  }
}
```

**笔记：**

  - 该小时是 UTC 时间
  - 请求的实际数量可能更高。特别是作为

  只要相应的时期没有完全被监测覆盖。

  - 这个结构变得非常大并且永远不会被删除

适配器。因此，请不时手动删除它或关闭监控 - 至少在您对速率限制没有任何问题的情况下。

## 割草时不允许灌溉
＃＃＃ 有什么问题？
如果您同时拥有割草机和带有弹出式洒水器的灌溉系统，则您的割草机有可能在灌溉运行时遇到弹出式洒水器并损坏它或造成自身损坏。

为防止这种情况，在割草机割草时应关闭灌溉系统或更好的独立阀门。

### 正在做什么？
使用此功能，可以在割草机在草坪上时停止灌溉。这可以为每个阀门单独定义。

每个阀门可以定义一个或多个割草机，割草机割草时不允许打开阀门。
基本上，割草机优先于灌溉，即如果出现割草机正在割草和阀门打开的冲突，则阀门关闭并设置相应的警告。

此外，可以定义无论割草机如何，阀门都不应打开。例如。如果阀门或其后面的管道损坏，可以使用。

整个检查可以在带有参数 *irrigation check* 的实例配置中打开或关闭。

每个 `SERVICE_VALVE` 有三个数据点可用。
它们用于配置和报告警告。

  |数据点 |可写 |数据点说明 |
  | - | - | - |
  |`irrigationWhileMowing_allowed_i`|是 |设置为 `false` 如果割草机在草坪上割草时是否允许灌溉，则设置为 §§SSSSS_1§§，否则设置为 `true` |
  |`irrigationWhileMowing_warningCode_i`|没有 |如果阀门打开，则设置警告代码。可能的警告代码见下表。如果设置了多个警告，代码将与 `+` 连接（例如 `STOPPED+UNKNOWN_MOWER`）。|
  |`irrigationWhileMowing_warningCode_i`|没有 |如果阀门打开，则设置警告代码。可能的警告代码见下表。如果设置了多个警告，代码将与 `+` 连接（例如 `STOPPED+UNKNOWN_MOWER`）。|

* ***割草机 ID 格式***

  `smartgarden.0.LOCATION_xxxxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxx.DEVICE_xxxxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxx.SERVICE_MOWER_xxxxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxxxxxxxxx`

您可以从 ioBroker 的对象选项卡中复制此割草机 ID，请参见下图中的红色箭头。

    ![割草机编号](../../../en/adapterref/iobroker.smartgarden/img/mowerid_admin5.jpg)

* ***警告代码***

  |警告代码|说明|
  | - | - |
  | `NO_WARNING` |没有警告，阀门打开|
  | `STOPPED` |阀门自动关闭，因为割草机正在割草 |
  | `FORBIDDEN` |阀门关闭，因为在数据点`irrigationWhileMowing_mowerDefinition_i`中设置了特殊代码`IRRIGATION_FORBIDDEN` |
  | `FORBIDDEN` |阀门关闭，因为在数据点`irrigationWhileMowing_mowerDefinition_i` 中设置了特殊代码`IRRIGATION_FORBIDDEN`|

每次运行此功能时

- 阀门打开或
- 割草机开始割草

当您更改上面列出的数据点中的值时，它不会运行。
这意味着：如果存在冲突情况并且您将 `irrigationWhileMowing_allowed_i` 从 `true` 更改为 `false`，则冲突不会被识别并且冲突将继续。相同的行为适用于 `irrigationWhileMowing_mowerDefinition_i` 的更改。

### 基本行为——警告
此功能无法阻止阀门在割草机割草时打开。例如。这可以通过 GARDENA 应用程序手动完成，也可以通过时间表自动完成。

该功能只能在发生冲突时尽快关闭阀门。冲突也可能无法识别。
所以可能会发生让水通过的情况。
**例如。弹出式洒水器伸出并且割草机撞到弹出式洒水器**是无法避免的，但这种情况发生的可能性已降至最低。
**所以由您的应用程序来确保永远不会发生这种冲突。**

## 希望得到数据点
此适配器将**每个值**报告为通过 GARDENA 智能系统 API 提供的数据点。如果有人需要更多值，请联系 GARDENA 并告知他们该值也将包含在 API 中。为此，请转到 [GARDENA 开发人员门户](https://developer.husqvarnagroup.cloud) 页脚中的***联系我们并留下反馈***。

＃＃ 笔记
这是一个私人项目。我与 GARDENA 或 Husqvarna 没有任何关联。

##学分
非常感谢 GARDENA/Husqvarna 提供此 [公共接口](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/general) 并特别感谢您的支持团队提供非常好的和非常快速的支持。

smartgarden 标志：http://www.freepik.com 由 Freepik 设计

## Changelog
### 2.0.0
* (jpgorganizer) 2022-Jun-13
  - support for new login procedure to Gardena webservice: using *Application secret* and *Application key* 
    instead of *username* and *password*. 
    [Issue 47](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/47)
  
    Procedure with *username* and *password* is still available, as it's still working for some users.
	
    **TODO** for all existing users: please re-enter your login data, even if you will still use *username* and *password*!
  - **support for admin4 UI removed; at least admin5 is needed!**
  - new configuration page
  - function and configuration parameter `pre-define states` removed. All Gardena data points get deleted and created again.
  - documentation has been adjusted


### 1.0.6
* (jpgorganizer) 2022-May-04
  - some minor changes in documentation, including [Issue 41](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/41)
and new limit for SERVICE_VALVE (just smart Irrigation Control)
  - bug fix in error handling
  - changes due to new Gardena API v1.1.0
  - necessary changes due to changed behavior Gardena Service [Issue 43](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/43)
  - tests against js-controller 4.x, [Issue 40](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/40)
  
### 1.0.5
* (jpgorganizer) 2021-May-13
  - necessary adjustments due to js-controller v3.3; e.g. [Issue 29](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/29)
    - nearly all data points get deleted and created again with intended role/unit
    - data types for following data points changed from `string` to `number`: 
	  - for all devices: `rfLinkLevel_value` 
      - for mower: `batteryLevel_value`, `operatingHours_value` 
      - for sensor: `batteryLevel_value`, `soilHumidity_value`, `soilTemperature_value`, `lightIntensity_value`, `ambientTemperature_value`
  - compatibility test with node.js v14 and node.js v16 and added to Travis CI test; 
    compatibility test with the upcoming Admin 5 React UI;
    e.g. [Issue 30](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/30)
  - new parameter *beautify log* in instance configuration; makes state ids a little bit shorter in log if switched on

### 1.0.4
* (jpgorganizer) 2021-Feb-22
  - necessary adjustments due to js-controller v3.2
  - option `useTestVariable` in adapter/instance configuration removed

### 1.0.3
* (jpgorganizer) 2021-Jan-26
  - improved error handling
  - new parameter `connection retry interval`
  - axios vulnerability solved, using version `>=0.21.1`
  
### 1.0.2
* (jpgorganizer) 2020-Aug-30
  - monitoring rate limits, see chapter [Rate Limits](#rate-limits) and discussion at 
  [Issue 18](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/18)


### 1.0.1
* (jpgorganizer) 2020-Aug-17
  - better reconnection to GARDENA smart system server in case of your internet connection was broken
  - textual changes in io-package.json
  - improved README and FAQ
  
### 1.0.0
* (jpgorganizer) 2020-Jun-13
  - code rework, no functional change expected
  - support `PAUSE` for SERVICE_VALVE, SERVICE_POWER_SOCKET. e.g. 
	[Issue 14](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/14)
  - internal representation for all timestamps changed from format like 
    `2020-05-26T05:03:47.613+0000` to `2020-05-26T05:03:47.613Z` to 
    support Safari browser e.g. 
	[Issue 12](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/12).
  - support forecast values for mower id's in format with suffix, 
    e.g. `d8a1faef-2ee3-421d-a3f8-f8ed577c2ad3:suffix`, e.g. 
	[Issue 12](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/12)
  - making the adapter more fault tolerant at startup, e.g. trimming 
    whitespaces from username, etc.
  - README: new chapter *Getting support*, 
  - README: chapter *Known Errors* deleted, should be resolved by GARDENA 
  - README: links to GARDENA/Husqvarna developer portal adjusted to the new address

### 0.6.0
* (jpgorganizer) 2020-May-03
  - new feature *Irrigation not allowed while mowing*, 
    for detailed description see 
	[Irrigation not allowed while mowing](#Irrigation-not-allowed-while-mowing); 
    e.g. 
	[Issue 5](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/5)
  - rework instance config dialog
  - improvement of documentation

### 0.5.1
* (jpgorganizer) 2020-Apr-26
  - some corrections (sensor, typo)
  - integration of travis-ci
  
### 0.5.0
* (jpgorganizer)  2020-Apr-25
  - MOWER: forecast for remaining charging time and remaining mowing time 
  integrated, e.g. [Issue 1](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/1)
  - **IMPORTANT CHANGE** for existing users: the id for LOCATION, all 
    DEVICE's and all SERVICE's has changed due to support of History adapter. 
	(History adapter cannot handle id's with `%` (percent) character 
	within id's, although the `%` is not forbidden in id's in ioBroker), e.g. 
	[Issue 8](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/8). 
  
    So you **must delete all states** of the adapter instance to 
    install this release and please check your application carefully for 
    necessary adjustments regarding the change of the id names.

  - devices *Water Control* and *Smart Pump* tested (many thanks to user 
    gammler2003 and xengosam at 
    [ioBroker Forum](https://forum.iobroker.net/topic/31289/neuer-adapter-smartgarden-adapter-for-gardena-smart-system/) for testing)
  - some code rework and improvement of documentation
  - dependency corrected, important for js-controller v3, e.g. 
    [Issue 7](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/7)
  - adapter now available at npm
  
### 0.4.2
* (jpgorganizer) 2020-Apr-01
  - error *missing SENSOR data* fixed (many thanks to user dslraser and 
  muckel at 
  [ioBroker Forum](https://forum.iobroker.net/topic/31289/neuer-adapter-smartgarden-adapter-for-gardena-smart-system/) for testing)

### 0.4.1
* (jpgorganizer) 2020-Mar-31
  - Dependency get's resolved now
  
### 0.4.0 
* (jpgorganizer) 2020-Mar-31
  - **NOTE:** with this version an additional dependency is necessary at runtime. 
  If it does not get installed together with the installation of this adapter, 
  please install seperately with 
  `npm install https://github.com/jpgorganizer/ioBroker.utils` or 
  `npm i @jpgorganizer/utils`
  - **NOTE:** you **must delete all states** of the adapter instance to 
  install this release and please check your application carefully for 
  necessary adjustments regarding type/role changes (see below) 
  - data types of (nearly) all data points adjusted for compliance with 
  ioBroker guidance: 
    * states now have special ioBroker type and role instead of former 
	`string`/`text` where applicable, e.g. `number`/`value.battery` for 
	`batteryLevel_value`, see 
	[Issue 3](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/3)
  - data point `activity_value_i` replaced by `activity_mowing_i` with 
    type/role `boolean`/`indicator.working`: `true` means *mowing*, `false` 
  means *not mowing*
  - possibility to pre-define states integrated, see new switch 
  `PreDefine States` in adapter/instance configuration, see 
  [Issue 2](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/2)
  - states are readonly now; except states for commands, see 
  [Issue 4](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/4)
  - input field for `useTestVariable` in adapter/instance configuration 
  switched to a *checkbox* (former: *text*); please check your settings
  - error in command  `stop_all_valves_i` in VALVE_SET fixed
  
### 0.3.0
* (jpgorganizer) 2020-Mar-25
  - create all states read/write 
  - error TypeError: Cannot read property 'val' of null with useTestVariable 
  fixed



### 0.2.0
* (jpgorganizer) 2020-Mar-24
  - **IMPORTANT** : data point for MOWER control (command) changed from  
  `duration_value` to `activity_control_i`
  - rework leftovertimer 
  - improved error handling
  - improved logging (see  loglevel in adapter configurations)

### 0.0.1 
* (jpgorganizer) 2020-Mar-01
  - initial release

## License

Copyright (c) 2020 - 2023 jpgorganizer, https://github.com/jpgorganizer 

smartgarden by jpgorganizer is licensed under a 
Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License 
[(CC-BY-NC-SA-4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/) 
Based on a work at https://github.com/jpgorganizer/ioBroker.smartgarden. 
 

<!--- SVN: $Rev: 2871 $ $Date: 2022-12-24 15:01:59 +0100 (Sa, 24 Dez 2022) $ --->