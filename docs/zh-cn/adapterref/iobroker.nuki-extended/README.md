---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nuki-extended/README.md
title: ioBroker.nuki-扩展
hash: bMny4hisn1D6UJOEf2786z6yhzX++IURwSCeF70AwHI=
---
![标识](../../../en/adapterref/iobroker.nuki-extended/admin/nuki-extended.png)

![贝宝捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![安装数量](http://iobroker.live/badges/nuki-extended-installed.svg)
![稳定版](http://iobroker.live/badges/nuki-extended-stable.svg)
![新版本](http://img.shields.io/npm/v/iobroker.nuki-extended.svg)
![自上次发布以来的提交](https://img.shields.io/github/commits-since/Zefau/ioBroker.nuki-extended/latest.svg)
![下载](https://img.shields.io/npm/dm/iobroker.nuki-extended.svg)
![新产品管理](https://nodei.co/npm/iobroker.nuki-extended.png?downloads=true)

# IoBroker.nuki-extended 这个ioBroker 适配器（以前的ioBroker.Nuki2）允许控制和监控[Nuki Smart Lock](https://nuki.io/de/smart-lock/) 和/或 [Nuki Opener](https://nuki.io/de/opener/) 使用 [Nuki Bridge API (v1.9.0, 06.05.2019)](https://developer.nuki.io/page/nuki-bridge-http-api-170/4/#heading--introduction) 和 [Nuki Web API (v1. 2.0, 31.05.2019)](https://developer.nuki.io/page/nuki-web-api-111/3/)。
[![Travis CI](https://travis-ci.com/Zefau/ioBroker.nuki-extended.svg?branch=master)](https://travis-ci.com/Zefau/ioBroker.nuki-extended)

**目录**

1. [功能](#features)
2. [安装](#installation)
   1. [Nuki Bridge API](#nuki-bridge-api)
   2. [Nuki Web API](#nuki-web-api)
3. [频道和状态](#channels--states)
4. [使用ioBroker.javascript的智能家居/Alexa集成](#smart-home--alexa-integration-using-iobrokerjavascript)
   1. [晚上10点锁门](#lock-door-at-10pm-in-the-even)
   2. [让Alexa通知您有关锁定更改的信息](#let-alexa-inform-you-about-lock-changes)
   3. [让 Telegram 通知你锁的变化](#let-telegram-inform-you-about-lock-changes)
   4. [让 Alexa 和 Telegram 通知您有人通过 Opener 响铃](#let-telegram-and-alexa-inform-you-about-somebody-ringing-via-opener)
5. [更新日志](#changelog)
6. [学分](#credits)
7. [许可证](#license)

＃＃ 特征
- 支持 Nuki Smartlock 和 Nuki Opener
- 支持 Nuki Bridge API 和 Nuki Web API
- ~~支持硬件桥上的哈希令牌（见https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token）~~
- 如果在 Nuki Bridge API 上应用的操作失败，则回退到 Nuki Web API，例如由于桥接错误 503（参见 https://developer.nuki.io/t/random-http-503-unavailable/909/85?u=zefau）
- 在 Nuki Bridge API 上应用的操作失败时重试（未使用 Nuki Web API 时）
- 可以选择定期同步而不是使用 Bridge API 回调（可能会因硬件桥接而延迟）
- 通过 Nuki Bridge API 收到回调时刷新 Nuki Web API 的所有状态
- 检索 Nuki Smartlock 和 Nuki Opener 的授权用户（见下文 [渠道和国家](#general-information)）
- 检索 Nuki Smartlock 和 Nuki Opener 的配置（见下文 [通道和状态](#general-config)）
- 检索设置 Nuki 通知（见下文 [频道和状态](#users)）
- 显示 Nuki Smartlock 和 Nuki Opener 近期事件的 Web 界面：

  ![Nuki 扩展 Web 界面](../../../en/adapterref/iobroker.nuki-extended/img/screenshot_adapter-interface.png)

＃＃ 安装
### Nuki 桥 API
如何获取硬件桥令牌（不适用于软件桥）：

1. 从网络中的任何浏览器调用 ```http://<bridge_ip>:<bridge_port>/auth```。电桥打开其 LED。
2. 在 30 秒内按下桥接器的按钮。
3. 浏览器调用的结果应该是这样的：

```
{
   "token":"token123",
   "success":true
}
```

4. 在 nuki 扩展适配器中使用生成的令牌。

### Nuki Web API
执行以下操作，以使用 Nuki Web API：

1. 在 https://web.nuki.io/de/#/admin/web-api 检索令牌
2.在nuki-extended适配器中使用这个token
3. 确保您的 nuki 设备已发布在 Nuki Web API 上（通过设置“激活 Nuki Web”使用智能手机应用程序）

## 频道和状态
如果您成功设置 ioBroker.nuki-extended，则会创建以下通道和状态：

### 桥梁（使用 Nuki Bridge API）
网桥将创建为名称模式为 ```bridge__<name of bridge>``` 的设备。将在每个网桥中创建以下通道/状态：

|频道 |状态 |说明 |
|:------- |:----- |:----------- |
| - | \_连接|表示网桥是否连接到 Nuki 服务器的标志 |
| - |姓名 |网桥/服务器名称 |
| - |网桥ID |网桥/服务器的ID |
| - |桥接|网桥IP地址|
| - |桥接端口 |桥港|
| - |桥接类型 |桥梁类型 |
| - |硬件 ID |硬件桥的 ID（仅限硬件桥）|
| - |刷新 |上次更新的时间戳 |
| - |正常运行时间 |以秒为单位的桥梁正常运行时间 |
| - |版本固件 |桥固件版本（仅限硬件桥）|
| - | versWifi | WiFi 模块固件版本（仅限硬件桥接器）|
| - | versApp |桥接应用程序的版本（仅限软件桥接）|
|回调| - |桥接回调 |
|回调|列表 |回调列表 |
| callbacks._callbackId_ | \_删除|删除回调 |
| callbacks._callbackId_ |网址 |回调 URL |

＃＃＃ 一般信息
|频道 |状态 |说明 |
|:------- |:----- |:----------- |
| - |连接 |适配器连接状态 |
| - | bridgeApiSync |指示是否激活通过 Bridge API 同步 |
| - | bridgeApiLast |上次 Bridge API 同步的时间戳 |
| - | webApiSync |指示是否已激活通过 Web API 同步 |
| - | webApiLast |上次 Web API 同步的时间戳 |
|通知 | - |通知 |
|通知。_notificationIndex_ | - | - |
|通知._notificationIndex_.settings | - |通知设置 |
|通知._notificationIndex_.settings._settingsIndex_ | - | - |
|通知._notificationIndex_.settings._settingsIndex_ |身份验证 |一组身份验证 ID，用于过滤特定用户或键盘的推送通知。如果没有为所有用户和键盘触发输入推送通知 |
|通知._notificationIndex_.settings._settingsIndex_ |智能锁ID |智能锁ID，如果没有设置账户的所有智能锁都启用推送通知|
|通知._notificationIndex_.settings._settingsIndex_ |触发事件 |应触发推送通知的集合：锁定、解锁、解锁、lockngo、打开、响铃、门传感器、警告、智能锁 |
|通知。_notificationIndex_ |语言 |推送消息的语言 |
|通知。_notificationIndex_ |上次活动日期 |最后活动日期 |
|通知。_notificationIndex_ |通知 ID |通知的唯一通知 ID |
|通知。_notificationIndex_ |操作系统 |操作系统<br>`{"0": 'Android', "1": 'iOS', "2": 'Webhook'}` |
|通知。_notificationIndex_ |推送ID | Webhook 的推送 ID 或 POST URL |
|通知。_notificationIndex_ |参考 ID |参考ID，一个标识国外系统的ID |
|通知。_notificationIndex_ |状态 |当前激活状态<br>`{"0": 'INIT', "1": 'ACTIVE', "2": 'FAILED'}` |
|通知。_notificationIndex_ |状态 |当前激活状态<br>`{“0”：“初始化”，“1”：“活动”，“2”：“失败”}` |

### Smartlocks 和 Opener（使用 Nuki Bridge API）
锁将创建为名称模式为 ```door__<name of door>``` 的设备。将在每个锁中创建以下通道/状态（使用 Nuki Bridge API 时）：

|频道 |状态 |说明 |
|:------- |:----- |:----------- |
| - | \_动作|触发对锁的操作 |
| - |身份证 | Nuki的ID |
| - |姓名 | Nuki的名字|
| - |类型 |设备类型 |
| - |网桥ID | Nuki的桥ID |
|状态 | - |锁的当前状态|
|状态 |电池关键** |状态临界电池电量|
|状态 |锁状态** | Nuki 的当前锁定状态 |
|状态 |锁定** |指示是否门被锁定 |
|状态 |刷新** |上次更新的时间戳 |

_** 如果设置了回调，标记的状态将在 Nuki 操作上更新_

### Smartlocks 和 Opener（使用 Nuki Web API）
锁将创建为名称模式为 ```door__<name of door>``` 的设备。将在每个锁中创建以下通道/状态（使用 Nuki Web API 时）：

|频道 |状态 |描述（可能的值）|
|:------- |:----- |:----------------------------- |
| - | \_动作|触发对锁的操作 |
| - |身份证 | Nuki的ID |
| - |姓名 | Nuki的名字|
| - |类型 |设备类型 |
| - |日志|日志 / Nuki 的历史 |
| - |网桥ID | Nuki的桥ID |

＃＃＃＃ 信息
|频道 |状态 |描述（可能的值）|
|:------- |:----- |:----------------------------- |
|信息 | - |附加信息 |
|信息 |帐户 ID |帐户 ID |
|信息 |身份验证 |授权 ID |
|信息 |最爱 |最喜欢的旗帜|
|信息 |固件版本 |固件版本 |
|信息 |硬件版本 |硬件版本|
|信息 |操作编号 |操作 id - 如果设置设备被锁定为另一个操作 |
|信息 |服务器状态 |服务器状态<br>`{"0": 'OK', "1": 'UNREGISTERED', "2": 'AUTH UUID INVALID', "3": 'AUTH INVALID', "4": 'OFFLINE'}` |
|信息 | adminPinState |管理 pin 状态<br>`{&quot;0&quot;: &#39;OK&#39;, &quot;1&quot;: &#39;MISSING&#39;, &quot;2&quot;: &#39;无效&#39;}` |
|信息 |虚拟设备 |表示虚拟智能锁的标志|
|信息 |日期创建 |创建日期 |
|信息 |日期更新 |更新日期 |

＃＃＃＃ 状态
|频道 |状态 |描述（可能的值）|
|:------- |:----- |:----------------------------- |
|状态 | - |锁的当前状态|
|状态 |电池关键|状态临界电池电量|
|状态 |关闭 |指示门是否关闭（doorState 的布尔值）|
|状态 |门国| Nuki的当前门状态|
|状态 |上次行动 |最后触发的动作 |
|状态 |锁状态 | Nuki 的当前锁定状态 |
|状态 |锁定 |指示是否门被锁定 |
|状态 |模式 |智能锁模式<br>`{"0": 'UNINITIALIZED', "1": 'PAIRING', "2": 'NORMAL', "3": 'UNKNOWN', "4": 'MAINTENANCE'}` |
|状态 | ringToOpenTimer |剩余时间开放时间|
|状态 |触发|状态触发器<br>`{"0": 'SYSTEM', "1": 'MANUAL', "2": 'BUTTON', "3": 'AUTOMATIC', "4": 'WEB', "5": 'APP'}` |
|状态 |触发|状态触发器<br>`{“0”：“系统”，“1”：“手动”，“2”：“按钮”，“3”：“自动”，“4”：“WEB”，“5”：“APP”} ` |

#### 常规配置
|频道 |状态 |描述（可能的值）|
|:------- |:----- |:----------------------------- |
|配置| - |配置|
|配置|广告模式 |广告模式（省电）<br> `{"0": 'AUTOMATIC', "1": 'NORMAL', "2": 'SLOW', "3": 'SLOWEST'}` |
|配置|自动解锁 |如果门应该在解锁时解锁（旋钮），则为真 |
|配置|按钮启用 |如果智能锁上的按钮已启用，则为真 |
|配置|能力|这些功能表明是否可以通过应用程序、RTO 或两者来开门 |
|配置| fobAction1 |按下一次按钮时的 fob 动作<br>`{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
|配置| fobAction2 |按下按钮两次时的 fob 动作<br>`{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
|配置| fobAction3 |按下按钮 3 次时的 fob 动作<br>`{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
|配置| fobAction3 |按下按钮 3 次时的 fob 动作<br>`{&quot;0&quot;: &#39;NONE&#39;, &quot;1&quot;: &#39;UNLOCK&#39;, &quot;2&quot;: &#39;LOCK&#39;, &quot;3&quot;: &#39;LOCK_N_GO&#39;, &quot;4&quot;: &#39;INTELLIGENT&#39;}` |
|配置| fob配对|如果遥控器与智能锁配对，则为真 |
|配置| gps纬度|纬度 |
|配置| homekitState | Homekit 状态<br>`{"0": 'UNAVAILABLE', "1": 'DISABLED', "2": 'ENABLED', "3": 'ENABLED & PAIRED'}` |
|配置| homekitState | Homekit 状态<br>`{“0”：“不可用”，“1”：“禁用”，“2”：“启用”，“3”：“启用和配对”}` |
|配置|键盘配对 |如果键盘与智能锁配对，则为真 |
|配置| led亮度| LED 的亮度：0（关闭）到 5（最大）|
|配置|已启用 |如果智能锁上的 LED 已启用，则为真 |
|配置|姓名 |新用户的智能锁名称|
|配置|操作模式 |开瓶器的操作方式|
|配置|配对启用 |如果通过智能锁按钮允许配对，则为真 |
|配置|单锁|如果智能锁应该只锁定一次（而不是两次），则为真 |
|配置|时区 ID |时区 ID |
|配置|时区偏移|时区偏移量（以分钟为单位）|

#### 高级配置
|频道 |状态 |描述（可能的值）|
|:------- |:----- |:----------------------------- |
|高级配置 | - |高级配置 |
|高级配置 |自动锁定超时 |数秒后，智能锁在解锁后重新锁定。如果值为 0，则不会自动重新锁定。 |
|高级配置 |自动电池类型检测 |指示是否启用电池类型自动检测的标志 |
|高级配置 |电池类型 |智能锁中的电池类型<br>`{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
|高级配置 | doubleButtonPressAction |所需的操作，如果按钮被按下两次<br>`{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
|高级配置 | doubleButtonPressAction |所需的操作，如果按钮被按下两次<br>`{&quot;0&quot;: &quot;NO_ACTION&quot;, &quot;1&quot;: &quot;INTELLIGENT&quot;, &quot;2&quot;: &quot;UNLOCK&quot;, &quot;3&quot;: &quot;LOCK&quot;, &quot;4&quot;: &quot;UNLATCH&quot;, &quot;5&quot;: &quot;LOCK_N_GO&quot;, &quot;6&quot;: &quot;SHOW_STATUS&quot;}` |
|高级配置 | lng超时| lock ‘n’ go 的超时时间（以秒为单位）|
|高级配置 | singleButtonPressAction |所需的操作，如果按钮被按下一次<br>`{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
|高级配置 | singleButtonPressAction |所需的操作，如果按钮被按下一次<br>`{&quot;0&quot;: &quot;NO_ACTION&quot;, &quot;1&quot;: &quot;INTELLIGENT&quot;, &quot;2&quot;: &quot;UNLOCK&quot;, &quot;3&quot;: &quot;LOCK&quot;, &quot;4&quot;: &quot;UNLATCH&quot;, &quot;5&quot;: &quot;LOCK_N_GO&quot;, &quot;6&quot;: &quot;SHOW_STATUS&quot;}` |
|高级配置 | singleLockedPositionOffsetDegrees |改变单个锁定位置的偏移|
|高级配置 |总学位|校准过程中达到的绝对总位置（以度为单位）|
|高级配置 |解锁持续时间 |将闩锁保持在解锁位置的持续时间（以秒为单位）|
|高级配置 | unlockedPositionOffsetDegrees |改变解锁位置的偏移|
|高级配置 | unlockedToLockedTransitionOffsetDegrees |改变从解锁到锁定转换的位置的偏移|

#### Opener 高级配置
|频道 |状态 |描述（可能的值）|
|:------- |:----- |:----------------------------- |
| openerAdvancedConfig | - |开瓶器配置|
| openerAdvancedConfig |对讲机|已连接对讲机的数据库 ID |
| openerAdvancedConfig |总线模式切换 |在数据模式和模拟模式之间切换的方法<br>`{"0": 'DATA MODE', "1": 'ANALOGUE MODE'}` |
| openerAdvancedConfig | shortCircuitDuration | BUS 模式切换的短路持续时间（ms） |
| openerAdvancedConfig |电击延迟 |以毫秒为单位的电击激活延迟（锁定动作 3 后-电击致动-）|
| openerAdvancedConfig | randomElectricStrikeDelay |随机electricStrikeDelay（范围3000 - 7000 ms）以模拟内部驱动电击的人|
| openerAdvancedConfig | ElectricStrikeDuration |电击致动的持续时间（以毫秒为单位）（锁定动作 3 -电击致动-）|
| openerAdvancedConfig | disableRtoAfterRing |响铃后禁用 RTO 的标志 |
| openerAdvancedConfig |门铃抑制|门铃抑制模式<br>`{"0": 'NEVER', "1": 'ALWAYS', "2": 'RTO', "3": 'CONTINUOUS', "4": 'CONTINUOUS + RTO'}` |
| openerAdvancedConfig |门铃抑制|门铃抑制模式<br>`{&quot;0&quot;: &#39;NEVER&#39;, &quot;1&quot;: &#39;ALWAYS&#39;, &quot;2&quot;: &#39;RTO&#39;, &quot;3&quot;: &#39;CONTINUOUS&#39;, &quot;4&quot;: &#39;CONTINUOUS + RTO&#39;}` |
| openerAdvancedConfig |门铃抑制持续时间 |门铃抑制持续时间（以毫秒为单位）（仅在操作模式 2 -数字对讲机-）|
| openerAdvancedConfig |音环|戒指的声音|
| openerAdvancedConfig | soundOpen |打开的声音|
| openerAdvancedConfig | soundRto | RTO 的声音 |
| openerAdvancedConfig | soundCm | CM的声音|
| openerAdvancedConfig |声音确认 |声音确认|
| openerAdvancedConfig |声级 |声级|
| openerAdvancedConfig | singleButtonPressAction |所需的操作，如果按钮被按下一次 |
| openerAdvancedConfig |电池类型 |智能锁中的电池类型<br>`{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| openerAdvancedConfig |电池类型 |智能锁中的电池类型<br>`{&quot;0&quot;: &#39;碱&#39;, &quot;1&quot;: &#39;蓄能器&#39;, &quot;2&quot;: &#39;锂&#39;}` |
| openerAdvancedConfig |自动电池类型检测 |指示是否启用电池类型自动检测的标志 |
| openerAdvancedConfig |操作编号 |操作 id - 如果设置的设备被另一个操作锁定 |

#### 用户
|频道 |状态 |描述（可能的值）|
|:------- |:----- |:----------------------------- |
|用户 | - |用户锁|
| users._userName_ | - |用户_userName_ |
| users._userName_ |允许从日期 |允许的起始日期 |
| users._userName_ | allowedUntilDate |允许的截止日期 |
| users._userName_ | allowedWeekDays |允许的工作日<br>`{64: 'Monday', 32: 'Tuesday', 16: 'Wednesday', 8: 'Thursday', 4: 'Friday', 2: 'Saturday', 1: 'Sunday'}` |
| users._userName_ | allowedFromTime |允许的时间（从午夜开始的分钟数）|
| users._userName_ | allowedUntilTime |允许的直到时间（从午夜开始的分钟数）|
| users._userName_ |身份验证 |智能锁授权 ID |
| users._userName_ |日期创建 |创建日期 |
| users._userName_ |日期更新 |更新日期 |
| users._userName_ |日期上次活动 |最后活动日期 |
| users._userName_ |启用 |如果用户已启用，则为真 |
| users._userName_ |身份证 |用户的唯一ID |
| users._userName_ |锁计数|锁计数|
| users._userName_ |姓名 |用户名 |
| users._userName_ |远程允许 |如果身份验证具有远程访问权限，则为真 |
| users._userName_ |类型 |授权类型<br>`{"0": 'APP', "1": 'BRIDGE', "2": 'FOB', "3": 'KEYPAD', "13": 'KEYPAD CODE', "14": 'Z-KEY', "15": 'VIRTUAL'}` |
| users._userName_ |类型 |授权类型<br>`{“0”：“APP”，“1”：“桥”，“2”：“FOB”，“3”：“键盘”，“13”：“键盘代码”，“14”：“Z-” KEY&#39;, &quot;15&quot;: &#39;虚拟&#39;}` |

## 使用 ioBroker.javascript 的智能家居/Alexa 集成
智能家居中可能集成的一些示例。

###晚上10点锁门
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

### 让 Alexa 通知您有关锁定更改的信息
这需要 ioBroker 适配器 ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2)。

为了使用 Alexa 的语音输出，我们定义了一个函数 ```say```。将以下函数放在 ioBroker.javascript 的“global”文件夹中的脚本中。重要提示：将#YOUR ALEXA ID#（也替换为#）替换为您的Alexa ID。您可以在 ioBroker ```alexa2.0.Echo-Devices``` 的对象树中找到 Alexa ID。

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

您可以在 ioBroker.javascript 中使用此函数来使用 Alexa ```say('Hello World')``` 或 ```say('Hello World', ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'])``` 说出来自多个设备的语音输出的短语。

在 ioBroker.javascript 的“common”文件夹中创建一个脚本，并在其中添加以下侦听器。重要提示：将#LOCK STATE ID#（也替换#）替换为保持锁定状态的状态（例如```nuki-extended.0.door__home_door.status.lockState```）：

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

### 让 Telegram 通知您有关锁定更改的信息
这需要 ioBroker 适配器 ioBroker.telegram (https://github.com/iobroker-community-adapters/ioBroker.telegram)。

为了使用 Telegram 的消息输出，我们定义了一个函数 ```msg``` 和 ```messenger```。将以下函数放在 ioBroker.javascript 的“global”文件夹中的脚本中：

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

您可以在 ioBroker.javascript 中使用此函数通过 ```msg('Hello World')```（对所有用户）或 ```msg('Hello World', 'Zefau')```（对特定用户）向 Telegram 发送任何内容。

在 ioBroker.javascript 的“common”文件夹中创建一个脚本，并在其中添加以下侦听器。重要提示：将#LOCK STATE ID#（也替换#）替换为保持锁定状态的状态（例如```nuki-extended.0.door__home_door.status.lockState```）：

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

注意：如果您同时使用 Alexa 和 Telegram 脚本，则只能为这两个操作定义一个侦听器：

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

### 让 Telegram 和 Alexa 通知您有人通过 Opener 响铃
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

##学分
感谢 [@Mik13](https://github.com/Mik13) 用于 [Nuki Bridge API 实现](https://github.com/Mik13/nuki-bridge-api#nuki-bridge-api)。

<a href="https://www.flaticon.com/" title="平面图标">来自 www.flaticon.com</a><a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">的 Smashicons</a> ([基本套装](https://www.flaticon.com/packs/essential-set-2)) 和<a href="https://www.freepik.com/" title="免费皮克">Freepik</a> ([Doors](https://www.flaticon.com/packs/doors)) 制作的图标由<a href="http://creativecommons.org/licenses/by/3.0/" title="知识共享 3.0" target="_blank">CC 3.0 BY 授权</a>

## Changelog

Please see [release page](https://github.com/Zefau/ioBroker.nuki-extended/releases) for changelog and detailed information.
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

Copyright (c) 2019-2020 Zefau <zefau@mailbox.org>

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