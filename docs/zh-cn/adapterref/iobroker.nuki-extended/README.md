---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nuki-extended/README.md
title: ioBroker.nuki-扩展
hash: IVEO70qXQFzBzkaqwGTHYYQSEshHQEIvPLCGNOEHYyY=
---
![标识](../../../en/adapterref/iobroker.nuki-extended/admin/nuki-extended.png)

![安装数量](http://iobroker.live/badges/nuki-extended-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.nuki-extended.svg)
![下载](https://img.shields.io/npm/dm/iobroker.nuki-extended.svg)

# IoBroker.nuki-extended 此 ioBroker 适配器（以前称为 ioBroker.Nuki2）允许控制和监控[Nuki Smart Lock](https://nuki.io/de/smart-lock/) 和 / 或 [Nuki Opener](https://nuki.io/de/opener/)，使用 [Nuki Bridge API (v1.9.0, 06.05.2019)](https://developer.nuki.io/page/nuki-bridge-http-api-170/4/#heading--introduction) 和 [Nuki Web API (v1.2.0, 31.05.2019)](https://developer.nuki.io/page/nuki-web-api-111/3/)。
![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.nuki-extended/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/nuki-extended/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

**目录**

1. [功能](#features)
2. [安装](#安装)
   1. [Nuki Bridge API](#nuki-bridge-api)
   2. [Nuki Web API](#nuki-web-api)
3. [渠道与状态](#channels--states)
4. [使用 ioBroker.javascript 实现智能家居 / Alexa 集成](#smart-home--alexa-integration-using-iobrokerjavascript)
1. [晚上10点锁门](#晚上10点锁门)
2. [让 Alexa 通知您有关锁的变化](#let-alexa-inform-you-about-lock-changes)
3. [让 Telegram 通知您有关锁定更改的信息](#let-telegram-inform-you-about-lock-changes)
4. [让 Alexa 和 Telegram 通过 Opener 通知您有人来电](#let-telegram-and-alexa-inform-you-about-somebody-ringing-via-opener)
5. [变更日志](#changelog)
6. [致谢](#credits)
7. [许可证](#license)

＃＃ 特征
- 支持 Nuki Smartlock 和 Nuki Opener
- 支持 Nuki Bridge API 和 Nuki Web API
- ~~支持硬件桥上的散列令牌（参见https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token）~~
- 如果在 Nuki Bridge API 上应用的操作失败（例如由于桥接错误 503），则回退到 Nuki Web API（请参阅 https://developer.nuki.io/t/random-http-503-unavailable/909/85?u=zefau）
- 如果在 Nuki Bridge API 上应用的操作失败，则重试（当未使用 Nuki Web API 时）
- 选择定期同步，而不是使用 Bridge API 回调（这可能会由于硬件桥而延迟）
- 当通过 Nuki Bridge API 收到回调时刷新 Nuki Web API 的所有状态
- 检索 Nuki Smartlock 和 Nuki Opener 的授权用户（请参阅下文[频道和状态]（#general-information））
- 检索 Nuki Smartlock 和 Nuki Opener 的配置（请参阅下面的[频道和状态]（#general-config））
- 检索设置 Nuki 通知（请参阅下文 [频道和状态](#users)）
- 显示 Nuki Smartlock 和 Nuki Opener 的最近事件的 Web 界面：

  ![Nuki 扩展 Web 界面](../../../en/adapterref/iobroker.nuki-extended/img/screenshot_adapter-interface.png)

＃＃ 安装
### Nuki Bridge API
如何获取硬件桥接令牌（不适用于软件桥接）：

1. 从您网络中的任意浏览器调用 ```http://<bridge_ip>:<bridge_port>/auth```。网桥将打开其 LED。
2.在30秒内按下桥的按钮。
3. 浏览器调用的结果应该是这样的：

```
{
   "token":"token123",
   "success":true
}
```

4. 在 nuki-extended 适配器中使用生成的令牌。

### Nuki 网络 API
执行以下操作，使用 Nuki Web API：

1. 在 https://web.nuki.io/de/#/admin/web-api 获取令牌
2. 在 nuki-extended 适配器中使用此令牌
3.确保您的 nuki 设备已在 Nuki Web API 上发布（通过设置“激活 Nuki Web”使用智能手机应用程序）

## 渠道与状态
如果您成功设置了 ioBroker.nuki-extended，则会创建以下渠道和状态：

### 桥梁（使用 Nuki Bridge API）
将创建一个桥接器，其名称模式为```bridge__<name of bridge>```。每个桥接器中将创建以下通道/状态：

| 频道 | 状态 | 描述 |
|:------- |:----- |:----------- |
| - | \_connected | 指示桥接器是否连接到 Nuki 服务器的标志 |
| - | 名称 | 桥梁/服务器的名称 |
| - | bridgeId | 桥接器/服务器的 ID |
| - | bridgeIp | 桥的 IP 地址 |
| - | bridgePort | 大桥的端口 |
| - | bridgeType | 桥梁类型 |
| - | hardwareId | 硬件桥的 ID（仅限硬件桥）|
| - | 已刷新 | 上次更新的时间戳 |
| - | 正常运行时间 | 桥梁的正常运行时间（秒）|
| - | versFirmware | 桥接固件版本（仅限硬件桥接）|
| - | versWifi | WiFi 模块固件版本（仅限硬件桥接）|
| - | versApp | 桥梁应用程序的版本（仅限软件桥）|
| 回调 | - | 桥的回调 |
| 回调 | 列表 | 回调列表 |
| callbacks._callbackId_ | \_delete | 删除回调 |
|callbacks._callbackId_ |url |回调的URL|

＃＃＃ 一般信息
| 频道 | 状态 | 描述 |
|:------- |:----- |:----------- |
| - | 连接 | 适配器连接状态 |
| - | bridgeApiSync | 指示是否激活通过 Bridge API 同步 |
| - | bridgeApiLast | 最后一次 Bridge API 同步的时间戳 |
| - | webApiSync | 指示是否激活通过 Web API 同步 |
| - | webApiLast | 上次 Web API 同步的时间戳 |
| 通知 | - | 通知 |
| 通知._notificationIndex_ | - | - |
| Notifications._notificationIndex_.settings | - | 通知设置 |
| 通知._notificationIndex_.settings._settingsIndex_ | - | - |
| Notifications._notificationIndex_.settings._settingsIndex_ | authIds | 一组身份验证 ID，用于过滤向特定用户或键盘发送的推送通知。如果没有输入，则会为所有用户和键盘触发推送通知 |
| Notifications._notificationIndex_.settings._settingsIndex_ | smartlockId | 智能锁 ID，如果未设置，则帐户的所有智能锁均启用推送通知 |
| Notifications._notificationIndex_.settings._settingsIndex_ | triggerEvents | 应触发推送通知的集合：锁定、解锁、解锁、lockngo、打开、响铃、门传感器、警告、智能锁 |
| Notifications._notificationIndex_ | language | 推送消息的语言 |
| Notifications._notificationIndex_ | lastActiveDate | 最后活动日期 |
| Notifications._notificationIndex_ | notificationId | 通知的唯一 notificationId |
| Notifications._notificationIndex_ | os | 操作系统<br>`{"0": 'Android', "1": 'iOS', "2": 'Webhook'}` |
| Notifications._notificationIndex_ | pushId | webhook 的推送 ID 或 POST URL |
| Notifications._notificationIndex_ | referenceId | 参考ID，用于识别外部系统的ID |
| Notifications._notificationIndex_ | status | 当前激活状态<br>`{"0": 'INIT', "1": 'ACTIVE', "2": 'FAILED'}` |
| Notifications._notificationIndex_ | status | 当前激活状态<br>`{&quot;0&quot;:&#39;INIT&#39;, &quot;1&quot;:&#39;ACTIVE&#39;, &quot;2&quot;:&#39;FAILED&#39;}` |

### 智能锁和开启器（使用 Nuki Bridge API）
将创建一个锁作为设备，名称模式为```door__<name of door>```。每个锁中将创建以下通道/状态（使用 Nuki Bridge API 时）：

| 频道 | 状态 | 描述 |
|:------- |:----- |:----------- |
| - | \_ACTION | 触发锁上的动作 |
| - | id | Nuki 的 ID |
| - | 名称 | Nuki 的名称 |
| - | 类型 | 设备类型 |
| - | bridgeId | Nuki 的桥 ID |
| 状态 | - | 锁的当前状态 |
| 状态 | batteryCritical** | 表示电池电量严重不足 |
| 状态 | lockState** | Nuki 的当前锁定状态 |
| 状态 | 锁定** | 指示门是否已锁 |
| 状态 | 已刷新** | 上次更新的时间戳 |

_** 如果设置了回调，标记状态将在 Nuki 操作上更新_

### 智能锁和开启器（使用 Nuki Web API）
将创建一个设备锁，名称模式为```door__<name of door>```。每个锁中将创建以下通道/状态（使用 Nuki Web API 时）：

| 频道 | 状态 | 描述（可能的值）|
|:------- |:----- |:----------------------------- |
| - | \_ACTION | 触发锁上的动作 |
| - | id | Nuki 的 ID |
| - | 名称 | Nuki 的名称 |
| - | 类型 | 设备类型 |
| - | 日志 | Nuki 的日志/历史 |
| - | bridgeId | Nuki 的桥 ID |

＃＃＃＃ 信息
| 频道 | 状态 | 描述（可能的值）|
|:------- |:----- |:----------------------------- |
| 信息 | - | 附加信息 |
| 信息 | accountId | 账户ID |
| 信息 | authId | 授权ID |
| 信息 | 收藏 | 收藏标志 |
| 信息 | firmwareVersion | 固件版本 |
| 信息 | hardwareVersion | 硬件版本 |
| 信息 | operationId | 操作 ID - 如果设置，则设备将被锁定以进行另一操作 |
| 信息 | serverState | 服务器状态<br>`{"0": 'OK', "1": 'UNREGISTERED', "2": 'AUTH UUID INVALID', "3": 'AUTH INVALID', "4": 'OFFLINE'}` |
| 信息 | adminPinState | 管理员密码状态<br>`{&quot;0&quot;:&#39;OK&#39;, &quot;1&quot;:&#39;缺失&#39;, &quot;2&quot;:&#39;无效&#39;}` |
| info | virtualDevice | 指示虚拟智能锁的标志 |
| 信息 | dateCreated | 创建日期 |
| 信息 | dateUpdated | 更新日期 |

＃＃＃＃ 状态
| 频道 | 状态 | 描述（可能的值）|
|:------- |:----- |:----------------------------- |
| state | - | 锁的当前状态 |
| 状态 | batteryCritical | 表示电池电量严重不足 |
| 状态 | 关闭 | 指示门是否关闭（门状态的布尔值）|
| 状态 | 门状态 | Nuki 的当前门状态 |
| 状态 | lastAction | 最后触发的动作 |
| 状态 | 锁定状态 | Nuki 的当前锁定状态 |
| 状态 | 锁定 | 指示门是否已锁 |
| 状态 | 模式 | 智能锁模式<br>`{"0": 'UNINITIALIZED', "1": 'PAIRING', "2": 'NORMAL', "3": 'UNKNOWN', "4": 'MAINTENANCE'}` |
| 状态 | ringToOpenTimer | 剩余环打开时间 |
| 状态 | 触发器 | 状态触发器<br>`{"0": 'SYSTEM', "1": 'MANUAL', "2": 'BUTTON', "3": 'AUTOMATIC', "4": 'WEB', "5": 'APP'}` |
| 状态 | 触发器 | 状态触发器<br>`{&quot;0&quot;:&#39;系统&#39;, &quot;1&quot;:&#39;手动&#39;, &quot;2&quot;:&#39;按钮&#39;, &quot;3&quot;:&#39;自动&#39;, &quot;4&quot;:&#39;网络&#39;, &quot;5&quot;:&#39;应用程序&#39;}` |

#### 常规配置
| 频道 | 状态 | 描述（可能的值）|
|:------- |:----- |:----------------------------- |
| 配置 | - | 配置 |
| config | advertisingMode | 广告模式（省电）<br> `{"0": 'AUTOMATIC', "1": 'NORMAL', "2": 'SLOW', "3": 'SLOWEST'}` |
| 配置 | autoUnlatch | 如果门在解锁时应该解开闩锁（旋钮），则为 True |
| config | buttonEnabled | 如果智能锁上的按钮启用则为 True |
| 配置 | 功能 | 功能指示是否可以通过 App、RTO 或两者开门 |
| 配置 | fobAction1 | 按下按钮一次时的遥控器动作<br>`{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| 配置 | fobAction2 | 如果按钮被按下两次，则 fob 操作<br>`{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| 配置 | fobAction3 | 如果按钮被按下 3 次，则遥控器的操作<br>`{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| 配置 | fobAction3 | 如果按钮被按下 3 次，则遥控器的操作<br>`{&quot;0&quot;:&#39;无&#39;, &quot;1&quot;:&#39;解锁&#39;, &quot;2&quot;:&#39;锁定&#39;, &quot;3&quot;:&#39;LOCK_N_GO&#39;, &quot;4&quot;:&#39;智能&#39;}` |
| config | fobPaired | 如果遥控器与智能锁配对则为真 |
| 配置 | gpsLatitude | 纬度 |
| 配置 | homekitState | homekit 状态<br>`{"0": 'UNAVAILABLE', "1": 'DISABLED', "2": 'ENABLED', "3": 'ENABLED & PAIRED'}` |
| 配置 | homekitState | homekit 状态<br>`{&quot;0&quot;:&#39;不可用&#39;, &quot;1&quot;:&#39;已禁用&#39;, &quot;2&quot;:&#39;已启用&#39;, &quot;3&quot;:&#39;已启用且已配对&#39;}` |
| config | keypadPaired | 如果键盘与智能锁配对则为 True |
| config | ledBrightness | LED 的亮度： 0（关闭）至 5（最大）|
| config | ledEnabled | 如果智能锁上的 LED 已启用，则为 True |
| config | name | 新用户的智能锁名称 |
| config | workingMode | 开启器的操作模式 |
| config | pairingEnabled | 如果允许通过智能锁按钮配对则为 True |
| config | singleLock | 如果智能锁只应锁定一次（而不是两次），则为 True |
| 配置 | timezoneId | 时区 ID |
| config | timezoneOffset | 时区偏移（分钟）|

#### 高级配置
| 频道 | 状态 | 描述（可能的值）|
|:------- |:----- |:----------------------------- |
| advancedConfig | - | 高级配置 |
| advancedConfig | autoLockTimeout | 智能锁解锁后重新锁定的秒数。如果值为 0，则不自动重新锁定。|
| advancedConfig | automaticBatteryTypeDetection | 指示是否启用电池类型的自动检测的标志 |
| advancedConfig | batteryType | 智能锁中电池的类型<br>`{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| advancedConfig | doubleButtonPressAction | 如果按钮被按下两次，则需要执行的操作<br>`{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| advancedConfig | doubleButtonPressAction | 如果按钮被按下两次，则需要执行的操作<br>`{&quot;0&quot;:&quot;NO_ACTION&quot;, &quot;1&quot;:&quot;INTELLIGENT&quot;, &quot;2&quot;:&quot;UNLOCK&quot;, &quot;3&quot;:&quot;LOCK&quot;, &quot;4&quot;:&quot;UNLATCH&quot;, &quot;5&quot;:&quot;LOCK_N_GO&quot;, &quot;6&quot;:&quot;SHOW_STATUS&quot;}` |
| advancedConfig | lngTimeout | 锁定‘n’ 的超时时间（秒）|
| advancedConfig | singleButtonPressAction | 如果按下按钮一次，则执行所需的操作<br>`{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| advancedConfig | singleButtonPressAction | 如果按下按钮一次，则执行所需的操作<br>`{&quot;0&quot;:&quot;NO_ACTION&quot;, &quot;1&quot;:&quot;INTELLIGENT&quot;, &quot;2&quot;:&quot;UNLOCK&quot;, &quot;3&quot;:&quot;LOCK&quot;, &quot;4&quot;:&quot;UNLATCH&quot;, &quot;5&quot;:&quot;LOCK_N_GO&quot;, &quot;6&quot;:&quot;SHOW_STATUS&quot;}` |
| advancedConfig | singleLockedPositionOffsetDegrees | 改变单个锁定位置的偏移量 |
| advancedConfig | totalDegrees | 校准期间达到的绝对总位置（以度为单位）|
| advancedConfig | unlatchDuration | 保持闩锁处于解锁位置的持续时间（秒）|
| advancedConfig | unlockedPositionOffsetDegrees | 改变解锁位置的偏移 |
| advancedConfig | unlockedToLockedTransitionOffsetDegrees | 改变从解锁到锁定的转换位置的偏移量 |

#### 开启器高级配置
| 频道 | 状态 | 描述（可能的值）|
|:------- |:----- |:----------------------------- |
| openerAdvancedConfig | - | 开启器配置 |
| openerAdvancedConfig | intercomId | 连接的对讲机的数据库ID |
| openerAdvancedConfig | busModeSwitch | 在数据和模拟模式之间切换的方法<br>`{"0": 'DATA MODE', "1": 'ANALOGUE MODE'}` |
| openerAdvancedConfig | shortCircuitDuration | BUS 模式切换短路的持续时间（毫秒）|
| openerAdvancedConfig | electricStrikeDelay | 电动锁扣激活延迟（毫秒）（锁定动作 3 -电动锁扣启动-后）|
| openerAdvancedConfig | randomElectricStrikeDelay | 随机 electricStrikeDelay （范围 3000 - 7000 毫秒）以模拟内部人员启动电击 |
| openerAdvancedConfig | electricStrikeDuration | 电动锁扣启动持续时间（毫秒）（锁定动作 3 -电动锁扣启动-）|
| openerAdvancedConfig | disableRtoAfterRing | 标志以禁用振铃后的 RTO |
| openerAdvancedConfig | doorbellSuppression | 门铃抑制模式<br>`{"0": 'NEVER', "1": 'ALWAYS', "2": 'RTO', "3": 'CONTINUOUS', "4": 'CONTINUOUS + RTO'}` |
| openerAdvancedConfig | doorbellSuppression | 门铃抑制模式<br>`{&quot;0&quot;:&#39;从不&#39;, &quot;1&quot;:&#39;总是&#39;, &quot;2&quot;:&#39;RTO&#39;, &quot;3&quot;:&#39;连续&#39;, &quot;4&quot;:&#39;连续+RTO&#39;}` |
| openerAdvancedConfig | doorbellSuppressionDuration | 门铃抑制持续时间（以毫秒为单位）（仅在操作模式 2 -数字对讲- 下）|
| openerAdvancedConfig | soundRing | 铃声 |
| openerAdvancedConfig | soundOpen | 打开时的声音 |
| openerAdvancedConfig | soundRto | RTO 的声音 |
| openerAdvancedConfig | soundCm | CM 的声音 |
| openerAdvancedConfig | soundConfirmation | 声音确认 |
| openerAdvancedConfig | soundLevel | 声音级别 |
| openerAdvancedConfig | singleButtonPressAction | 如果按下按钮一次，则执行所需的操作 |
| openerAdvancedConfig | batteryType | 智能锁中电池的类型<br>`{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| openerAdvancedConfig | batteryType | 智能锁中电池的类型<br>`{&quot;0&quot;:&#39;碱&#39;, &quot;1&quot;:&#39;蓄能器&#39;, &quot;2&quot;:&#39;锂&#39;}` |
| openerAdvancedConfig | automaticBatteryTypeDetection | 指示是否启用自动检测电池类型的标志 |
| openerAdvancedConfig | operationId | 操作id - 如果设置的设备被锁定以进行另一操作|

用户
| 频道 | 状态 | 描述（可能的值）|
|:------- |:----- |:----------------------------- |
| 用户 | - | 锁的用户 |
| 用户._用户名_ | - | 用户 _用户名_ |
| users._userName_ | allowedFromDate | 允许的开始日期 |
| users._userName_ | allowedUntilDate | 允许的截止日期 |
| users._userName_ | allowedWeekDays | 允许的工作日<br>`{64: 'Monday', 32: 'Tuesday', 16: 'Wednesday', 8: 'Thursday', 4: 'Friday', 2: 'Saturday', 1: 'Sunday'}` |
| users._userName_ | allowedFromTime | 允许的开始时间（从午夜开始以分钟为单位）|
| users._userName_ | allowedUntilTime | 允许的截止时间（从午夜开始以分钟为单位）|
| users._userName_ | authId | 智能锁授权ID |
| users._userName_ | dateCreated | 创建日期 |
| users._userName_ | dateUpdated | 更新日期 |
| users._userName_ | dateLastActive | 最后活动日期 |
| users._userName_ | enabled | 如果用户已启用则为 True |
| users._userName_ | id | 用户的唯一 ID |
| users._userName_ | lockCount | 锁定计数 |
| users._userName_ | name | 用户名称 |
| users._userName_ | remoteAllowed | 如果身份验证具有远程访问权限，则为 True |
| users._userName_ | type | 授权类型<br>`{"0": 'APP', "1": 'BRIDGE', "2": 'FOB', "3": 'KEYPAD', "13": 'KEYPAD CODE', "14": 'Z-KEY', "15": 'VIRTUAL'}` |
| users._userName_ | type | 授权类型<br>`{&quot;0&quot;:&#39;APP&#39;, &quot;1&quot;:&#39;BRIDGE&#39;, &quot;2&quot;:&#39;FOB&#39;, &quot;3&quot;:&#39;KEYPAD&#39;, &quot;13&quot;:&#39;KEYPAD CODE&#39;, &quot;14&quot;:&#39;Z-KEY&#39;, &quot;15&quot;:&#39;VIRTUAL&#39;}` |

## 使用 ioBroker.javascript 集成智能家居 / Alexa
智能家居中可能集成的一些示例。

### 晚上 10 点锁门
```javascript
var states = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

schedule('0 22 * * *', function()
{
    var status = (getState('nuki-extended.0.smartlocks.home_door.state.lockState').val);
    var msg = 'Main Door door is ' + (states[status]) + '. ';

    if (status == '3')
    {
        setState('nuki-extended.0.smartlocks.home_door._ACTION', 2);
        msg += 'Locking door..'
    }
    else
        msg += 'No action taken.'

    log(msg, {m: 'Nuki', o: ['msg']});
});
```

__用你的锁的 lockState 替换 `nuki-extended.0.door__home_door.status.lockState`！__你也可以通过 `msg` 自定义消息。

### 让 Alexa 通知您锁的变化
这需要 ioBroker 适配器 ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2)。

为了使用 Alexa 的语音输出，我们定义了一个函数 ```say```。将以下函数放在 ioBroker.javascript 的“全局”文件夹中的脚本中。重要提示：将 #YOUR ALEXA ID#（也替换 #）替换为您的 Alexa ID。您可以在 ioBroker ```alexa2.0.Echo-Devices``` 的对象树中找到 Alexa ID。

```javascript
/**
 * Say something with Alexa.
 *
 * @param       {string}        message         Message to say
 * @param       {string|array}  alexas          Alexa Device to say the voice message
 * @return      void
 *
 */
function say(message, alexas = '#YOUR ALEXA ID#') // use alexas = ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'] for default voice output from multiple devices (also replace #)
{
    alexas = typeof alexas === 'string' ? [alexas] : alexas;
    alexas.forEach(function(alexa)
    {
        setState('alexa2.0.Echo-Devices.' + alexa + '.Commands.speak', message);
    });
}
```

您可以在 ioBroker.javascript 中使用此功能，使用 Alexa ```say('Hello World')``` 或 ```say('Hello World', ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'])``` 说出短语，以便从多个设备输出语音。

在 ioBroker.javascript 的“common”文件夹中创建一个脚本，并向其中添加以下监听器。重要提示：将 #LOCK STATE ID#（也替换 #）替换为保持锁定状态的状态（例如 ```nuki-extended.0.door__home_door.status.lockState```）：

```javascript
const DOOR_STATES = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

/*
 * LISTEN TO CHANGES TO LOCK STATE
 *
 */
on({id: 'nuki-extended.0.smartlocks.home_door.state.lockState', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
      say('Door is ' + DOOR_STATES[obj.state.val] + '!')
});
```

### 让 Telegram 通知您锁定变化
这需要 ioBroker 适配器 ioBroker.telegram (https://github.com/iobroker-community-adapters/ioBroker.telegram)。

为了使用 Telegram 的消息输出，我们定义了一个函数```msg``` 和 ```messenger```。将以下函数放在 ioBroker.javascript 的“global”文件夹中的脚本中：

```javascript
/**
 * Send something via telegram.
 *
 * @param       {string}        message         Message to print
 * @param       {string|array}  receiver        Users to send the message to
 * @return      void
 *
 */
function msg(message, receiver = 'ALL')
{
    if (receiver == 'ALL')
        messenger(message);

    else
    {
        receiver = typeof receiver == 'string' ? [receiver] : receiver;
        receiver.forEach(function(user)
        {
            messenger(message, user);
        });
    }
}
```

```javascript
/**
 * Sends a message / text.
 *
 * @param   {string}            content         Message to send
 * @param   {string}            user            (optional) Specific user to send the message to (defaults to all registered users)
 * @return  void
 *
 */
function messenger(content, user = '')
{
    var config = {
        text: content,
        parse_mode: 'HTML',
        reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: false
        }
    };

    sendTo('telegram', user ? Object.assign({user: user}, config) : config);
}
```

您可以在 ioBroker.javascript 中使用此功能通过```msg('Hello World')```（发送给所有用户）或```msg('Hello World', 'Zefau')```（发送给特定用户）将任何内容发送到 Telegram。

在 ioBroker.javascript 的“common”文件夹中创建一个脚本，并向其中添加以下监听器。重要提示：将 #LOCK STATE ID#（也替换 #）替换为保持锁定状态的状态（例如 ```nuki-extended.0.door__home_door.status.lockState```）：

```javascript
const DOOR_STATES = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

/*
 * LISTEN TO CHANGES TO LOCK STATE
 *
 */
on({id: 'nuki-extended.0.smartlocks.home_door.state.lockState', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
      msg('Door is ' + DOOR_STATES[obj.state.val] + '!')
});
```

注意：如果您同时使用 Alexa 和 Telegram 脚本，则您可能只能为这两个操作定义一个监听器：

```javascript
const DOOR_STATES = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

/*
 * LISTEN TO CHANGES TO LOCK STATE
 *
 */
on({id: 'nuki-extended.0.smartlocks.home_door.state.lockState', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
    {
      say('Door is ' + DOOR_STATES[obj.state.val] + '!')
      msg('Door is ' + DOOR_STATES[obj.state.val] + '!')
    }
});
```

### 让 Telegram 和 Alexa 通过 Opener 通知您有人打电话
这需要 ioBroker 适配器 ioBroker.telegram（https://github.com/iobroker-community-adapters/ioBroker.telegram）和 ioBroker 适配器 ioBroker.alexa2（https://github.com/Apollon77/ioBroker.alexa2）。

```javascript
/*
 * Alexa and Telegram to notify on Opener Ringing state
 *
 */
let phrase = 'Somebody is ringing the doorbell.'; // Es hat an der Tür geklingelt
on({id: 'nuki-extended.0.openers.opener.state.ringStateUpdate', change: "any", ack: true}, function (s) {
  let state= s && s.state;

  if (state.val === true) {
    setState("alexa2.0.Echo-Devices.#YOUR ALEXA ID#.Commands.speak"/*speak*/, phrase);
    sendTo("telegram", "send", { text: phrase });
  }
});
```

## 致谢
感谢[@Mik13](https://github.com/Mik13) 用于 [Nuki Bridge API 实现](https://github.com/Mik13/nuki-bridge-api#nuki-bridge-api)。

图标由<a href="https://www.flaticon.com/authors/smashicons" title="粉碎图标">Smashicons</a> ([Essential Set](https://www.flaticon.com/packs/essential-set-2)) 和<a href="https://www.freepik.com/" title="自由图片">Freepik</a> ([门](https://www.flaticon.com/packs/doors)) 制作，网址为<a href="https://www.flaticon.com/" title="扁平图标">www.flaticon.com，</a>已获得<a href="http://creativecommons.org/licenses/by/3.0/" title="知识共享 3.0" target="_blank">CC 3.0 BY</a>许可

## Changelog

Please see [release page](https://github.com/Zefau/ioBroker.nuki-extended/releases) for changelog and detailed information.

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.7.0 (2024-04-21)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.6.5 (2022-06-17)
* (Apollon77) Fix some crash cases reported by Sentry

### 2.6.4 (2022-06-16)
* (Apollon77) Fix some crash cases reported by Sentry

### 2.6.3 (2022-06-13)
* (theimo1221) Fix Web Api SetAction Call

### 2.6.2 (2022-06-13)
* (theimo1221) Fix Web Api Polling

### 2.6.1 (2022-06-09)
* (Apollon77) Fix Bridge functionality
* (simatec) Fix Admin display in dark mode

### 2.6.0 (2022-06-03)
* (Matze2010) Make additional refresh after callback configurable
* (theimo1221) Optimizations and fixes

### 2.5.0 (2022-05-27)
- (StrathCole) Allow web-api-only operation
- (Apollon77) Make compatible with Node.js 18.x
- (Apollon77) Add Sentry for crash reporting

### 2.4.0 (2021-12-13)
- (smaragdschlange) added support for Nuki Smart Door and Nuki Smart Lock 3.0 (Pro)

### v2.3.1 (2021-07-20)
- (Apollon77) Optimize for js-controller 3.3 and warnings prevented

### v2.3.0 (2020-08-10)
- (Zefau) added support for the door sensor of the Nuki Smartlock ([introduced with Bridge firmware 2.6.0 / 1.16.0](https://developer.nuki.io/t/bridge-beta-fw-2-6-0-1-16-0-with-door-sensor-state/6159))
- (Zefau) added support for the ring bell action of the Nuki Opener ([introduced with Bridge firmware 2.7.0 / 1.17.0](https://developer.nuki.io/t/bridge-beta-fw-2-7-0-1-17-0/6792))

### v2.2.6 (2020-07-14)
- (Zefau) fixed Web API not refreshing correctly (see [#59](https://github.com/Zefau/ioBroker.nuki-extended/issues/59))
- (Zefau) updated dependencies

### v2.2.5 (2020-03-19)
- (Zefau) fixed incorrect versioning

### v2.2.4 (2020-03-18)
- (Zefau) fixed incorrect dates of version history (see [#60](https://github.com/Zefau/ioBroker.nuki-extended/issues/60))

### v2.2.3 (2020-03-04)
- (Zefau) added refresh of configuration (via Nuki Web API) when any config item has been changed in ioBroker

### v2.2.2 (2020-03-04)
- (Zefau) fixed incorrect error message `Error triggering action via Nuki Bridge API: No Nuki Hex ID given!`
- (Zefau) added new error message if too many callbacks are already attached to Nuki Bridge (`Callback not attached because too many Callbacks attached to the Nuki Bridge already! Please delete a callback!`)

### v2.2.1 (2020-03-03)
- (Zefau) fixed incorrect state mapping of state `openerAdvancedConfig.doorbellSuppression`

  **Note:** Please delete the state `openerAdvancedConfig.doorbellSuppression` once manually and restart the adapter to take affect!
  
- (Zefau) updated dependencies

### v2.2.0 (2020-02-16)
- (Zefau) added possibility to change configuration of Nuki Smartlock or Nuki Opener (when using Web API)
- (Zefau) updated dependencies

### v2.1.0 (2020-02-03)
- (Zefau) added (optional) callback IP for Bridge API events (e.g. when ioBroker is run in docker; see [#51](https://github.com/Zefau/ioBroker.nuki-extended/issues/51))
- (Zefau) added dedicated buttons for each lock / opener action
- (Zefau) replaced `state.timestamp` with `state.lastDataUpdate` (indicates last data refresh from the APIs) and `state.lastStateUpdate` (indicates the last actual state change)

### v2.0.3 (2019-10-31)
- (Zefau) reintroduced support for hashed token on hardware bridges (see https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)

### v2.0.2 (2019-10-31)
- (Zefau) added support for newly introduced nightmode (see https://nuki.io/de/blog/nuki-news-de/nuki-update-2019-der-winter-naht-sei-vorbereitet/)
- (Zefau) fixed incorrect behavior when bridges are defined insufficiently (no name, ip or token provided)

### v2.0.1 (2019-10-26)
- (Zefau) fixed missing `bridge_name`

### v2.0.0 (2019-10-24)
- (Zefau) added support for new Nuki Opener
- (Zefau) added support for hashed token on hardware bridges (see https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)
- (Zefau) added fallback to Nuki Web API in case applied actions on Nuki Bridge API fail, e.g. due to bridge error 503 (see https://developer.nuki.io/t/random-http-503-unavailable/909/85?u=zefau)
- (Zefau) added retry in case applied actions on Nuki Bridge API fail (when Nuki Web API is not used)
- (Zefau) added option to regularly synchronise instead of using Bridge API callback
- (Zefau) added refreshing all states of Nuki Web API when callback is received via Nuki Bridge API
- (Zefau) added states for Nuki Notifications
- (Zefau) added support for multiple devices (including Nuki Opener) on adapter web interface
- (Zefau) added option to not retrieve all information (by deselecting `config` or `users`) via Nuki Web API

## License
The MIT License (MIT)

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2019-2022 Zefau <zefau@mailbox.org>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.