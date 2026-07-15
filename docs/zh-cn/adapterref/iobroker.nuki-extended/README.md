---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nuki-extended/README.md
title: ioBroker.nuki-extended
hash: qm3x59QZ0BDz3x0aPeUn0+ZcgB2UOqcgecgKvyJcrNU=
---
![标识](../../../en/adapterref/iobroker.nuki-extended/admin/nuki-extended.png)

![安装数量](http://iobroker.live/badges/nuki-extended-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.nuki-extended.svg)
![下载](https://img.shields.io/npm/dm/iobroker.nuki-extended.svg)

# IoBroker.nuki-extended 此 ioBroker 适配器（以前称为 ioBroker.Nuki2）允许控制和监视 [您可以使用 Nuki 智能锁](https://nuki.io/de/smart-lock/) 和/或 Nuki 开锁器](https://nuki.io/de/opener/)，同时使用 [Nuki Bridge API (v1.9.0, 2019年5月6日)](https://developer.nuki.io/page/nuki-bridge-http-api-170/4/#heading--introduction) 和 [Nuki Web API (v1.2.0, 2019年5月31日)](https://developer.nuki.io/page/nuki-bridge-http-api-170/4/#heading--introduction)。](https://developer.nuki.io/page/nuki-web-api-111/3/)。
![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.nuki-extended/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/nuki-extended/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

**目录**

1. [功能](#features)
2. [安装](#installation)
   1. [Nuki Bridge API](#nuki-bridge-api)
   2. [Nuki Web API](#nuki-web-api)
3. [通道和状态](#channels--states)
4. [使用 ioBroker.javascript 实现智能家居/Alexa 集成](#smart-home--alexa-integration-using-iobrokerjavascript)
1. [晚上10点锁门](#lock-door-at-10pm-in-the-evening)
2. [让 Alexa 通知您锁具变更](#let-alexa-inform-you-about-lock-changes)
3. [让 Telegram 通知您有关锁定更改的信息](#let-telegram-inform-you-about-lock-changes)
4. [通过 Opener 让 Alexa 和 Telegram 通知您有人来电](#let-telegram-and-alexa-inform-you-about-somebody-ringing-via-opener)
5. [更新日志](#changelog)
6. [鸣谢](#credits)
7. [许可证](#license)

＃＃ 特征
- 支持 Nuki 智能锁和 Nuki 开锁器
- 同时支持 Nuki Bridge API 和 Nuki Web API
- ~~支持硬件桥接器上的哈希令牌（参见 https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token）~~
- 如果在 Nuki Bridge API 上执行的操作失败，例如由于桥接错误 503（参见 https://developer.nuki.io/t/random-http-503-unavailable/909/85?u=zefau），则回退到 Nuki Web API。
- 如果对 Nuki Bridge API 执行的操作失败（未使用 Nuki Web API 时），则重试
- 可以选择定期同步，而不是使用 Bridge API 回调（由于硬件桥接器的原因，回调可能会延迟）。
- 当通过 Nuki Bridge API 收到回调时，刷新 Nuki Web API 的所有状态
- 获取 Nuki Smartlock 和 Nuki Opener 的授权用户（请参阅下面的 [渠道和状态](#general-information)）
- 获取 Nuki Smartlock 和 Nuki Opener 的配置（参见下面的 [通道和状态](#general-config)）
- 获取已设置的 Nuki 通知（参见下方的 [频道和状态](#users)）
- 显示 Nuki 智能锁和 Nuki 开锁器近期事件的网页界面：

  ![Nuki 扩展 Web 界面](../../../en/adapterref/iobroker.nuki-extended/img/screenshot_adapter-interface.png)

＃＃ 安装
### Nuki Bridge API
如何获取硬件桥接令牌（不适用于软件桥接器）：

1. 从网络中的任何浏览器访问 ```http://<bridge_ip>:<bridge_port>/auth```。网桥的 LED 指示灯将亮起。
2. 30 秒内按下桥上的按钮。
3. 浏览器调用结果应类似于这样：

```
{
   "token":"token123",
   "success":true
}
```

4. 在 nuki-extended 适配器中使用生成的令牌。

### Nuki Web API
要使用 Nuki Web API，请执行以下操作：

1. 从 https://web.nuki.io/de/#/admin/web-api 获取令牌
2. 在 nuki-extended 适配器中使用此令牌
3. 确保您的 Nuki 设备已发布到 Nuki Web API（通过智能手机应用程序的“设置”中的“激活 Nuki Web”选项进行操作）。

## 频道和状态
如果成功设置了 ioBroker.nuki-extended，则会创建以下通道和状态：

### 桥接器（使用 Nuki Bridge API）
将创建一个网桥设备，名称模式为```bridge__<name of bridge>```。每个网桥中将创建以下通道/状态：

| 频道 | 状态 | 描述 |
|:------- |:----- |:----------- |
| - | \_connected | 指示网桥是否已连接到 Nuki 服务器的标志 |
| - | 名称 | 网桥/服务器名称 |
| - | bridgeId | 网桥/服务器的 ID |
| - | bridgeIp | 网桥的 IP 地址 |
| - | bridgePort | 桥梁港口 |
| - | bridgeType | 桥梁类型 |
| - | hardwareId | 硬件桥接器的 ID（仅限硬件桥接器） |
| - | 已刷新 | 最后更新时间戳 |
| - | 正常运行时间 | 桥接器的正常运行时间（秒） |
| - | versFirmware | 桥接器固件版本（仅限硬件桥接器） |
| - | versWifi | WiFi模块固件版本（仅限硬件桥接器） |
| - | versApp | 桥接应用程序版本（仅限软件桥接） |
| 回调 | - | 桥接回调 |
| 回调函数 | 列表 | 回调函数列表 |
| callbacks._callbackId_ | \_delete | 删除回调函数 |
| callbacks._callbackId_ | url | 回调的 URL |

＃＃＃ 一般信息
| 频道 | 状态 | 描述 |
|:------- |:----- |:----------- |
| - | 连接 | 适配器连接状态 |
| - | bridgeApiSync | 指示是否已激活通过 Bridge API 进行同步 |
| - | bridgeApiLast | 上次 Bridge API 同步的时间戳 |
| - | webApiSync | 指示是否已激活通过 Web API 进行同步 |
| - | webApiLast | 上次 Web API 同步的时间戳 |
| 通知 | - | 通知 |
| notifications._notificationIndex_ | - | - |
| notifications._notificationIndex_.settings | - | 通知设置 |
| notifications._notificationIndex_.settings._settingsIndex_ | - | - |
| notifications._notificationIndex_.settings._settingsIndex_ | authIds | 一组授权 ID，用于筛选推送通知给特定用户或键盘。如果没有输入任何内容，则会为所有用户和键盘触发推送通知。 |
| notifications._notificationIndex_.settings._settingsIndex_ | smartlockId | 智能锁 ID，如果未设置，则帐户中的所有智能锁都将启用推送通知 |
| notifications._notificationIndex_.settings._settingsIndex_ | triggerEvents | 一个用于触发推送通知的集合：lock、unlock、unlatch、lockngo、open、ring、doorsensor、warnings、smartlock |
| notifications._notificationIndex_ | language | 推送消息的语言 |
| notifications._notificationIndex_ | lastActiveDate | 最后活跃日期 |
| notifications._notificationIndex_ | notificationId | 通知的唯一通知 ID |
| notifications._notificationIndex_ | os | 操作系统<br>`{"0": 'Android', "1": 'iOS', "2": 'Webhook'}` |
| notifications._notificationIndex_ | pushId | 推送 ID 或 webhook 的 POST URL |
| notifications._notificationIndex_ | referenceId | 参考 ID，用于标识外部系统的 ID |
| notifications._notificationIndex_ | 状态 | 当前激活状态<br>`{"0": 'INIT', "1": 'ACTIVE', "2": 'FAILED'}` |
| notifications._notificationIndex_ | 状态 | 当前激活状态<br>`{&quot;0&quot;: &#39;初始化&#39;, &quot;1&quot;: &#39;激活&#39;, &quot;2&quot;: &#39;失败&#39;}` |

### 智能锁和开锁器（带 Nuki Bridge API）
将创建一个名称模式为 ```door__<name of door>``` 的设备锁。每个锁中将创建以下通道/状态（使用 Nuki Bridge API 时）：

| 频道 | 状态 | 描述 |
|:------- |:----- |:----------- |
| - | \_ACTION | 触发对锁的操作 |
| - | id | Nuki 的 ID |
| - | 名称 | 努基的名字 |
| - | 类型 | 设备类型 |
| - | bridgeId | Nuki 的桥 ID |
| 状态 | - | 锁的当前状态 |
| 状态 | 电池电量严重不足** | 表示电池电量严重不足 |
| 状态 | 锁定状态** | Nuki 的当前锁定状态 |
| 状态 | 已锁定** | 指示门是否已锁定 |
| 状态 | 已刷新** | 最后更新时间戳 |

**如果设置了回调函数，则标记的状态将在 Nuki 操作时更新。

### 智能锁和开锁器（带 Nuki Web API）
将创建一个名称模式为 ```door__<name of door>``` 的设备锁。每个锁中将创建以下通道/状态（使用 Nuki Web API 时）：

| 通道 | 状态 | 描述（可能的值） |
|:------- |:----- |:----------------------------- |
| - | \_ACTION | 触发对锁的操作 |
| - | id | Nuki 的 ID |
| - | 名称 | 努基的名字 |
| - | 类型 | 设备类型 |
| - | 日志 | Nuki 的日志/历史记录 |
| - | bridgeId | Nuki 的桥 ID |

＃＃＃＃ 信息
| 通道 | 状态 | 描述（可能的值） |
|:------- |:----- |:----------------------------- |
| 信息 | - | 附加信息 |
| 信息 | 账户 ID | 账户 ID |
| 信息 | authId | 授权 ID |
| 信息 | 收藏 | 最喜欢的旗帜 |
| 信息 | 固件版本 | 固件版本 |
| 信息 | 硬件版本 | 硬件版本 |
| 信息 | 操作 ID | 操作 ID - 如果设置，则设备将被锁定以执行其他操作 |
| 信息 | 服务器状态 | 服务器状态<br>`{"0": 'OK', "1": 'UNREGISTERED', "2": 'AUTH UUID INVALID', "3": 'AUTH INVALID', "4": 'OFFLINE'}` |
| 信息 | adminPinState | 管理员密码状态<br>`{&quot;0&quot;: &#39;OK&#39;, &quot;1&quot;: &#39;MISSING&#39;, &quot;2&quot;: &#39;INVALID&#39;}` |
| 信息 | 虚拟设备 | 指示虚拟智能锁的标志 |
| 信息 | 创建日期 | 创建日期 |
| 信息 | 更新日期 | 更新日期 |

＃＃＃＃ 状态
| 通道 | 状态 | 描述（可能的值） |
|:------- |:----- |:----------------------------- |
| 状态 | - | 锁的当前状态 |
| 状态 | batteryCritical | 电池电量严重不足 |
| 状态 | 关闭 | 指示门是否关闭（doorState 的布尔值） |
| 状态 | doorState | Nuki 的当前门状态 |
| 状态 | 最后操作 | 上次触发的操作 |
| 状态 | lockState | Nuki 的当前锁定状态 |
| 状态 | 已锁定 | 指示门是否已锁定 |
| 状态 | 模式 | 智能锁模式<br>`{"0": 'UNINITIALIZED', "1": 'PAIRING', "2": 'NORMAL', "3": 'UNKNOWN', "4": 'MAINTENANCE'}` |
| 状态 | ringToOpenTimer | 剩余开机时间 |
| 状态 | 触发器 | 状态触发器<br>`{"0": 'SYSTEM', "1": 'MANUAL', "2": 'BUTTON', "3": 'AUTOMATIC', "4": 'WEB', "5": 'APP'}` |
| 状态 | 触发器 | 状态触发器<br>`{&quot;0&quot;: &#39;系统&#39;, &quot;1&quot;: &#39;手动&#39;, &quot;2&quot;: &#39;按钮&#39;, &quot;3&quot;: &#39;自动&#39;, &quot;4&quot;: &#39;网页&#39;, &quot;5&quot;: &#39;应用程序&#39;}` |

#### 常规配置
| 通道 | 状态 | 描述（可能的值） |
|:------- |:----- |:----------------------------- |
| 配置 | - | 配置 |
| 配置 | 广告模式 | 广告模式（省电模式）<br> `{"0": 'AUTOMATIC', "1": 'NORMAL', "2": 'SLOW', "3": 'SLOWEST'}` |
| 配置 | 自动解锁 | 如果解锁（旋钮）时门应自动解锁，则为 True |
| 配置 | buttonEnabled | 如果智能锁上的按钮已启用，则为 True |
| 配置 | 功能 | 功能指示是否可以通过应用程序、远程终端或两者同时打开车门 |
| 配置 | fobAction1 | 按钮被按下一次时的遥控器操作<br>`{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| 配置 | fobAction2 | 按钮被按两次时遥控器执行的操作<br>`{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| 配置 | fobAction3 | 按钮被按下 3 次时遥控器的操作<br>`{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| 配置 | fobAction3 | 按钮被按下 3 次时遥控器的操作<br>`{&quot;0&quot;: &#39;无&#39;, &quot;1&quot;: &#39;解锁&#39;, &quot;2&quot;: &#39;锁定&#39;, &quot;3&quot;: &#39;锁定即走&#39;, &quot;4&quot;: &#39;智能&#39;}` |
| 配置 | fobPaired | 如果遥控器已与智能锁配对，则为 True |
| 配置 | GPS纬度 | 纬度 |
| 配置 | homekitState | HomeKit 状态<br>`{"0": 'UNAVAILABLE', "1": 'DISABLED', "2": 'ENABLED', "3": 'ENABLED & PAIRED'}` |
| 配置 | homekitState | HomeKit 状态<br>`{&quot;0&quot;: &#39;不可用&#39;, &quot;1&quot;: &#39;已禁用&#39;, &quot;2&quot;: &#39;已启用&#39;, &quot;3&quot;: &#39;已启用并已配对&#39;}` |
| 配置 | 键盘已配对 | 如果键盘已与智能锁配对，则为 True |
| 配置 | LED亮度 | LED亮度：0（关闭）至5（最大） |
| 配置 | ledEnabled | 如果智能锁上的 LED 灯已启用，则为 True |
| 配置 | 名称 | 新用户使用的智能锁名称 |
| 配置 | 操作模式 | 打开器的运行模式 |
| 配置 | 配对已启用 | 如果允许通过智能锁按钮进行配对，则为 True |
| 配置 | 单次锁定 | 如果智能锁只锁定一次（而不是两次），则为 True |
| 配置 | 时区 ID | 时区 ID |
| 配置 | 时区偏移量 | 时区偏移量（以分钟为单位） |

#### 高级配置
| 通道 | 状态 | 描述（可能的值） |
|:------- |:----- |:----------------------------- |
| 高级配置 | - | 高级配置 |
| advancedConfig | autoLockTimeout | 智能锁解锁后自动重新上锁的秒数。如果值为 0，则不自动重新上锁。 |
| advancedConfig | automaticBatteryTypeDetection | 指示是否启用电池类型自动检测的标志 |
| 高级配置 | 电池类型 | 智能锁中电池的类型<br>`{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| advancedConfig | doubleButtonPressAction | 按钮被按下两次时要执行的操作<br>`{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| advancedConfig | doubleButtonPressAction | 按钮被按下两次时要执行的操作<br>`{&quot;0&quot;: &quot;无操作&quot;, &quot;1&quot;: &quot;智能&quot;, &quot;2&quot;: &quot;解锁&quot;, &quot;3&quot;: &quot;锁定&quot;, &quot;4&quot;: &quot;解锁&quot;, &quot;5&quot;: &quot;锁定即走&quot;, &quot;6&quot;: &quot;显示状态&quot;}` |
| advancedConfig | lngTimeout | 锁定并执行超时时间（秒） |
| advancedConfig | singleButtonPressAction | 按钮被按下一次时所需的操作<br>`{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| advancedConfig | singleButtonPressAction | 按钮被按下一次时所需的操作<br>`{&quot;0&quot;: &quot;无操作&quot;, &quot;1&quot;: &quot;智能&quot;, &quot;2&quot;: &quot;解锁&quot;, &quot;3&quot;: &quot;锁定&quot;, &quot;4&quot;: &quot;解锁&quot;, &quot;5&quot;: &quot;锁定即走&quot;, &quot;6&quot;: &quot;显示状态&quot;}` |
| advancedConfig | singleLockedPositionOffsetDegrees | 改变单个锁定位置的偏移量 |
| advancedConfig | totalDegrees | 校准过程中达到的绝对总位置（以度为单位） |
| advancedConfig | unlatchDuration | 保持锁扣处于解锁状态的持续时间（秒） |
| advancedConfig | unlockedPositionOffsetDegrees | 改变解锁位置的偏移量 |
| advancedConfig | unlockedToLockedTransitionOffsetDegrees | 改变从解锁到锁定过渡位置的偏移量 |

#### Opener 高级配置
| 通道 | 状态 | 描述（可能的值） |
|:------- |:----- |:----------------------------- |
| openerAdvancedConfig | - | Opener 配置 |
| openerAdvancedConfig | intercomId | 已连接对讲机的数据库 ID |
| openerAdvancedConfig | busModeSwitch | 用于在数据模式和模拟模式之间切换的方法<br>`{"0": 'DATA MODE', "1": 'ANALOGUE MODE'}` |
| openerAdvancedConfig | shortCircuitDuration | 总线模式切换的短路持续时间（毫秒） |
| openerAdvancedConfig | electricStrikeDelay | 电击锁激活延迟时间（毫秒）（在锁动作 3 - 电击锁激活之后） |
| openerAdvancedConfig | randomElectricStrikeDelay | 随机电击延迟（范围 3000 - 7000 毫秒），以模拟有人在里面触发电击锁 |
| openerAdvancedConfig | electricStrikeDuration | 电击持续时间（毫秒）（锁具操作 3 - 电击动作 -） |
| openerAdvancedConfig | disableRtoAfterRing | 禁用振铃后 RTO 的标志 |
| openerAdvancedConfig | doorbellSuppression | 门铃抑制模式<br>`{"0": 'NEVER', "1": 'ALWAYS', "2": 'RTO', "3": 'CONTINUOUS', "4": 'CONTINUOUS + RTO'}` |
| openerAdvancedConfig | doorbellSuppression | 门铃抑制模式<br>`{&quot;0&quot;: &#39;从不&#39;, &quot;1&quot;: &#39;总是&#39;, &quot;2&quot;: &#39;RTO&#39;, &quot;3&quot;: &#39;持续&#39;, &quot;4&quot;: &#39;持续 + RTO&#39;}` |
| openerAdvancedConfig | doorbellSuppressionDuration | 门铃抑制持续时间（毫秒）（仅在操作模式 2 - 数字对讲 - 下） |
| openerAdvancedConfig | soundRing | 铃声 |
| openerAdvancedConfig | soundOpen | 打开时的声音 |
| openerAdvancedConfig | soundRto | RTO 的声音 |
| openerAdvancedConfig | soundCm | CM 的声音 |
| openerAdvancedConfig | soundConfirmed | 声音确认 |
| openerAdvancedConfig | soundLevel | 音量级别 |
| openerAdvancedConfig | singleButtonPressAction | 按钮被按下一次时希望执行的操作 |
| openerAdvancedConfig | batteryType | 智能锁中电池的类型<br>`{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| openerAdvancedConfig | batteryType | 智能锁中电池的类型<br>`{&quot;0&quot;: &#39;碱&#39;, &quot;1&quot;: &#39;蓄电池&#39;, &quot;2&quot;: &#39;锂&#39;}` |
| openerAdvancedConfig | automaticBatteryTypeDetection | 指示是否启用电池类型自动检测的标志 |
| openerAdvancedConfig | operationId | 操作 ID - 如果设置了此 ID，则设备将被锁定以执行其他操作 |

#### 用户
| 通道 | 状态 | 描述（可能的值） |
|:------- |:----- |:----------------------------- |
| 用户 | - | 锁的用户 |
| users._userName_ | - | 用户 _userName_ |
| users._userName_ | allowedFromDate | 允许的起始日期 |
| users._userName_ | allowedUntilDate | 允许的截止日期 |
| users._userName_ | allowedWeekDays | 允许的工作日<br>`{64: 'Monday', 32: 'Tuesday', 16: 'Wednesday', 8: 'Thursday', 4: 'Friday', 2: 'Saturday', 1: 'Sunday'}` |
| users._userName_ | allowedFromTime | 允许的起始时间（以午夜起的分钟数为单位） |
| users._userName_ | allowedUntilTime | 允许的截止时间（从午夜算起，以分钟为单位） |
| users._userName_ | authId | 智能锁授权 ID |
| users._userName_ | dateCreated | 创建日期 |
| users._userName_ | dateUpdated | 更新日期 |
| users._userName_ | dateLastActive | 最后活跃日期 |
| users._userName_ | enabled | 如果用户已启用，则为 True |
| users._userName_ | id | 用户的唯一标识符 |
| users._userName_ | lockCount | 锁定计数 |
| users._userName_ | 名称 | 用户名 |
| users._userName_ | remoteAllowed | 如果身份验证具有远程访问权限，则为 True |
| users._userName_ | type | 授权类型<br>`{"0": 'APP', "1": 'BRIDGE', "2": 'FOB', "3": 'KEYPAD', "13": 'KEYPAD CODE', "14": 'Z-KEY', "15": 'VIRTUAL'}` |
| users._userName_ | type | 授权类型<br>`{&quot;0&quot;: &#39;APP&#39;, &quot;1&quot;: &#39;BRIDGE&#39;, &quot;2&quot;: &#39;FOB&#39;, &quot;3&quot;: &#39;KEYPAD&#39;, &quot;13&quot;: &#39;KEYPAD CODE&#39;, &quot;14&quot;: &#39;Z-KEY&#39;, &quot;15&quot;: &#39;VIRTUAL&#39;}` |

## 使用 ioBroker.javascript 集成智能家居/Alexa
以下是一些可能融入您智能家居系统的示例。

晚上10点锁门
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

__将 `nuki-extended.0.door__home_door.status.lockState` 替换为您的锁的 lockState！__ 您还可以通过 `msg` 自定义消息。

### 让 Alexa 通知您锁具变更情况
这需要 ioBroker 适配器 ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2)。

为了使用 Alexa 的语音输出，我们定义了一个函数 ```say```。请将以下函数放置在 ioBroker.javascript 的“global”文件夹中的脚本中。重要提示：请将 #YOUR ALEXA ID#（以及 #）替换为您的 Alexa ID。您可以在 ioBroker ```alexa2.0.Echo-Devices``` 的对象树中找到 Alexa ID。

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

您可以在 ioBroker.javascript 中使用此函数，通过 Alexa ```say('Hello World')``` 或 ```say('Hello World', ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'])``` 说出短语，以便从多个设备进行语音输出。

在 ioBroker.javascript 的“common”文件夹中创建一个脚本，并向其中添加以下监听器。重要提示：请将 #LOCK STATE ID#（以及 #）替换为表示锁定状态的状态（例如 ```nuki-extended.0.door__home_door.status.lockState```）：

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

### 让 Telegram 通知您有关锁变更的信息
这需要 ioBroker 适配器 ioBroker.telegram (https://github.com/iobroker-community-adapters/ioBroker.telegram)。

为了使用 Telegram 的消息输出，我们定义了函数 ```msg``` 和 ```messenger```。将以下函数放在 ioBroker.javascript 的“global”文件夹中的脚本中：

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

您可以在 ioBroker.javascript 中使用此功能，通过 ```msg('Hello World')```（发送给所有用户）或 ```msg('Hello World', 'Zefau')```（发送给特定用户）向 Telegram 发送任何内容。

在 ioBroker.javascript 的“common”文件夹中创建一个脚本，并向其中添加以下监听器。重要提示：请将 #LOCK STATE ID#（以及 #）替换为表示锁定状态的状态（例如 ```nuki-extended.0.door__home_door.status.lockState```）：

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

注意：如果您同时使用 Alexa 和 Telegram 脚本，则只能为这两个操作定义一个监听器：

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

### 通过 Opener 让 Telegram 和 Alexa 通知您有人来电
这需要 ioBroker 适配器 ioBroker.telegram (https://github.com/iobroker-community-adapters/ioBroker.telegram) 和 ioBroker 适配器 ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2)。

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

## Changelog

Please see [release page](https://github.com/Zefau/ioBroker.nuki-extended/releases) for changelog and detailed information.

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.8.2 (2026-05-14)
- (mcm1957) Missing translations have been added.
- (mcm1957) Dependencies have been updated

### 2.8.1 (2026-05-13)
- (copilot) Migrated linting setup to ESLint 9 with the shared `@iobroker/eslint-config`.
- (copilot) Resolved ESLint error findings in adapter core files and aligned linting ignores for legacy frontend scripts.

### 2.8.0 (2026-05-13)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (VierlingMt) Adding Nuki Smartlock 4.X and Pro Support, "toLowerCase" error fixed
- (sbormann) Added deviceType 5 and fixed empty type variable
- (mcm1957) Dependencies have been updated

### 2.7.0 (2024-04-21)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.6.5 (2022-06-17)
* (Apollon77) Fix some crash cases reported by Sentry

## License
The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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