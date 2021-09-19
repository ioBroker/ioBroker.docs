---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.iot/README.md
title: ioBroker 物联网适配器
hash: LTaVi0x0KvCzZYYoc99tWZACJeGmuMSi7a5o+cljcqQ=
---
![标识](../../../en/adapterref/iobroker.iot/admin/iot.png)

![安装数量](http://iobroker.live/badges/iot-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.iot.svg)
![下载](https://img.shields.io/npm/dm/iobroker.iot.svg)

# IoBroker 物联网适配器
![测试和发布](https://github.com/ioBroker/ioBroker.iot/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/iot/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

此适配器仅用于与 Amazon Alexa、Google Home 和 Nightscout 通信。
它不适用于远程访问您的 ioBroker 实例。为此使用 ioBroker.cloud 适配器。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

##设置
要使用云适配器，您应该首先在 ioBroker 云上注册 [https://iobroker.pro](https://iobroker.pro)。

[参考 google API 类型设置](https://developers.google.com/actions/smarthome/guides/)

![介绍](../../../en/adapterref/iobroker.iot/img/intro.png)

### 限制
一切都有限制，亚马逊 Alexa 也是如此。 Alexa 最多只能支持 300 台设备。

应清除 Google Cloud 和 Alisa

＃＃＃ 语
如果您选择“默认”语言，则不会翻译设备和枚举的智能名称。如果指定了某种语言，则所有已知名称都将被翻译成该语言。
为了演示目的，它可以在多种语言之间快速切换。

### 首先将函数放在名称中
更改自生成名称中函数和角色的顺序：

- 如果为假：“房间功能”，例如《客厅调光器》
- 如果为真：“多功能厅”，例如“昏暗的客厅”

### 连接单词
您可以定义将放置在功能和房间之间的词。例如。 "in" 和 from "Dimmer living room" 将是 "Dimmer in living room"。

但不建议这样做，因为识别引擎必须再分析一个词，这可能会导致误解。

### 开关的关闭电平
一些组由混合设备组成：调光器和开关。允许使用“ON”和“OFF”命令以及百分比来控制它们。
如果命令是 `Set to 30%` 和 `OFF level is 30%` 那么开关将被打开。通过命令“设置为 25%”，所有开关都将关闭。

此外，如果命令为“OFF”，那么如果实际值大于或等于“30%”，适配器将记住当前的调光级别。
稍后当新的“ON”命令到来时，适配器会将调光器切换到内存中的水平而不是 100%。

例子：

- 假设，*OFF 水平* 是 30%。
- 虚拟设备“Light”有两个物理设备：*switch* 和 *dimmer*。
- 命令：“将灯光设置为 40%”。适配器会记住 *dimmer* 的这个值，将其设置为“dimmer”，并将 *switch* 打开。
- 命令：“关灯”。适配器会将 *dimmer* 设置为 0% 并关闭 *switch*。
- 命令：“开灯”。 *调光器* => 40%，*开关* => 打开。
- 命令：“将灯光设置为 20%”。 *调光器* => 20%，*开关* => 关闭。 dimmer 的值不会被记住，因为它低于 *OFF level*。
- 命令：“开灯”。 *调光器* => 40%，*开关* => 打开。

### 由 ON
您可以选择 ON 命令的行为将出现在数字状态。可以选择特定值或使用最后一个非零值。

### 写回复
对于每个命令，都会生成文本响应。您可以在此处定义对象 ID，此文本必须写入其中。例如。 *sayit.0.tts.text*。

＃＃＃ 颜色
刚才只有英文alexa支持颜色控制。
通道必须具有以下角色的 4 个状态：

- level.color.saturation（检测通道所需），
- level.color.hue,
- level.dimmer，
- 开关（可选）

```
Alexa, set the "device name" to "color"
Alexa, turn the light fuchsia
Alexa, set the bedroom light to red
Alexa, change the kitchen to the color chocolate
```

＃＃＃ 锁
为了有可能锁定锁，状态必须具有“switch.lock”角色并具有“native.LOCK_VALUE”来确定锁定状态。如果您需要一个单独的值来控制锁定，您可以使用“native.CONTROL VALUE”。

```
Alexa, is "lock name" locked/unlocked
Alexa, lock the "lock name"
```

## 如何生成名称
适配器尝试生成用于智能家居控制的虚拟设备（例如 Amazon Alexa 或 Google Home）。

有两个重要的枚举：房间和功能。

房间如：客厅、浴室、卧室。
功能有：光、盲、加热。

必须满足以下条件才能在自动生成的列表中获取状态：

- 状态必须在一些“功能”枚举中。
- 如果不直接包含在“功能”中，则状态必须具有角色（“状态”、“开关”或“level.*”，例如 level.dimmer）。

可能是通道在“功能”中，但状态本身不在。

- 状态必须是可写的：`common.write` = true
- 状态调光器必须将 `common.type` 作为 'number'
- 州供暖必须将“common.unit”设为“°C”、“°F”或“°K”，将“common.type”设为“数字”

如果状态仅在“功能”中而不在任何“房间”中，则将使用状态名称。

状态名称将从函数和房间生成。例如。 *客厅*中的所有*灯*将被收集到虚拟设备*客厅灯*中。
用户不能更改此名称，因为它是自动生成的。
但是，如果枚举名称更改，则此名称也将更改。 （例如，函数“light”改为“lights”，所以*living room light* 将改为*living room lights*）

如果状态具有 common.smartName，则所有规则都将被忽略。在这种情况下，将只使用智能名称。

如果 *common.smartName* 为 **false**，则状态或枚举将不会包含在列表生成中。

配置对话框让您可以轻松地删除单个状态并将其添加到虚拟组或作为单个设备。
![配置](../../../en/adapterref/iobroker.iot/img/configuration.png)

如果该组只有一个状态，则可以对其进行重命名，为此将使用状态的 smartName。
如果组有多个状态，则必须通过枚举名称重命名组。

要创建自己的组，用户可以安装“场景”适配器或在 Javascript 适配器中创建“脚本”。

### 替换
您可以指定可以在设备名称中自动替换的字符串。例如。如果您将替换设置为：`.STATE,.LEVEL`，那么所有“.STATE”和“.LEVEL”都将从名称中删除。小心空格。
如果您设置 `.STATE, .LEVEL`，那么“.STATE”和“.LEVEL”将被替换，而不是“.LEVEL”。

## 辅助状态
- **smart.lastObjectID**：如果只有一台设备被家庭技能（alexa，google home）控制，则将设置此状态。
- **smart.lastFunction**：执行最后一个命令的函数名称（如果存在）。
- **smart.lastRoom**：执行最后一个命令的房间名称（如果存在）。
- **smart.lastCommand**：上次执行的命令。命令可以是：true(ON)、false(OFF)、number(%)、-X(x处减少)、+X(x处增加)
- **smart.lastResponse**：对命令的文本响应。它可以发送到一些 text2speech (sayit) 引擎。

## IFTTT
[指示](doc/ifttt.md)

## 谷歌主页
如果您在日志中看到以下错误消息：`[GHOME] Invalid URL Pro key. Status auto-update is disabled you can set states but receive states only manually`。
所以你必须重新生成 URL-Key：

![网址键](../../../en/adapterref/iobroker.iot/img/url_key.png)

＃＃ 服务
有可能将消息发送到云适配器。
如果您调用 `[POST]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>` 和值作为有效负载。

`curl --data "myString" https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>`

或者

`[GET]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>&data=myString`

如果您在设置字段“服务白名单”中设置名称*custom_test*，并使用“custom_test”作为服务名称调用，则状态**cloud.0.services.custom_test** 将设置为*myString *.

您可以在白名单中写“*”，所有服务都将被允许。

在这里您可以找到如何通过 [任务者](doc/tasker.md) 使用它的说明。

仅当设置了 IFTTT 密钥时才允许 IFTTT 服务。

保留名称为 `ifttt`、`text2command`、`simpleApi`、`swagger`。这些必须在没有 `custom_` 前缀的情况下使用。

### `text2command`
您可以在白名单中写入“text2command”，您可以向`https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>`发送POST请求以将数据写入*text2command.X.text*变量。

您也可以使用 GET 方法 `https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>&data=<MY COMMAND>`

`X` 可以通过“使用 text2command 实例”选项在设置中定义。

##自定义技能
自定义技能的答案可以通过两种方式处理：

-`text2command`
-`javascript`

### `text2command`
如果在配置对话框中定义了 `text2command` 实例，那么问题将被发送到该实例。

`text2command` 必须配置为解析预期的短语并返回答案。

### `Javascript`
有可能直接用脚本处理问题。如果没有选择 *text2command* 实例，它默认被激活。

如果定义了 `text2command` 实例，则此实例必须提供答案，而来自 *script* 的答案将被忽略。

适配器将提供具有不同细节级别的两种状态的细节

* **smart.lastCommand** 包含接收到的文本，包括查询类型（意图）的信息。示例：“askDevice Status Rasenmäher”
* **smart.lastCommandObj*** 包含一个 JSON 字符串，可以解析为包含以下信息的对象
  * **words** 在数组中包含接收到的单词
  * **intent** 包含查询的类型。当前可能的值是“askDevice”、“controlDevice”、“actionStart”、“actionEnd”、“askWhen”、“askWhere”、“askWho”
  * **deviceId** 包含一个 deviceId，用于标识请求发送到的设备，由亚马逊交付，如果未提供，将为空字符串
  * **sessionId** 包含技能会话的 sessionId，如果多个命令被说出来应该是相同的，由亚马逊交付，如果不提供则为空字符串
  * **userId** 包含来自设备所有者（或者以后可能与该技能交互的用户）的用户 ID，由亚马逊提供，如果未提供，将为空字符串

 有关如何检测单词以及 Alexa 自定义技能区分的查询类型的更多详细信息，请查看 https://forum.iobroker.net/viewtopic.php?f=37&t=17452 。

**通过 smart.lastResponse 状态返回结果**

响应需要在 200 毫秒内以“smart.lastResponse”状态发送，可以是简单的文本字符串或 JSON 对象。
如果是文本字符串，则此文本将作为对技能的响应发送。
如果文本是 JSON 对象，则可以使用以下键：

* **responseText** 需要包含返回亚马逊的文本
* **shouldEndSession** 是一个布尔值，控制会话是在响应被说出后关闭还是保持打开以接受另一个语音输入。

**通过消息将结果返回给物联网实例**

iot 实例还接受名称为“alexaCustomResponse”的消息，其中包含键“response”和一个对象，该对象可以包含键 **responseText** 和 **shouldEndSession**，如上所述。
iot 实例将不会对消息进行响应！

**使用文本的脚本示例**

```
// important, that ack=true
on({id: 'iot.0.smart.lastCommand', ack: true, change: 'any'}, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    setState('iot.0.smart.lastResponse', 'Received phrase is: ' + obj.state.val); // important, that ack=false (default)
});
```

**使用 JSON 对象的脚本示例**

```
// important, that ack=true
on({id: 'iot.0.smart.lastCommandObj', ack: true, change: 'any'}, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    const request = JSON.parse(obj.state.val);
    const response = {
        'responseText': 'Received phrase is: ' + request.words.join(' ') + '. Bye',
        'shouldEndSession': true
    };

    // Return response via state
    setState('iot.0.smart.lastResponse', JSON.stringify(response)); // important, that ack=false (default)

    // or alternatively return as message
    sendTo('iot.0', response);
});
```

### 私有云
如果您使用私有技能/动作/навык 与 `Alexa/Google Home/Алиса` 进行通信，那么您就有可能使用 IoT 实例来处理来自它的请求。

例如。对于 `yandex alice`：

```
const OBJECT_FROM_ALISA_SERVICE = {}; // object from alisa service or empty object
OBJECT_FROM_ALISA_SERVICE.alisa = '/path/v1.0/user/devices'; // called URL, 'path' could be any text, but it must be there
sendTo('iot.0', 'private', {type: 'alisa', request: OBJECT_FROM_ALISA_SERVICE}, response => {
    // Send this response back to alisa service
    console.log(JSON.stringify(response));
});
```

支持以下类型：

- `alexa` - 与 Amazon Alexa 或 Amazon Custom Skill 合作
- `ghome` - 通过 Google Home 使用 Google Actions
- `alisa` - 与 Yandex Алиса 合作
- `ifttt` - 像 IFTTT（实际上不是必需的，但用于测试目的）

## Yandex Алиса
[指示](doc/alisa.md)

<!-- 下一个版本的占位符（在行首）：

### __工作进行中__ -->

## Changelog
### 1.8.23 (2021-09-18)
* (bluefox) Fixed the response for the heating control

### 1.8.22 (2021-05-16)
* (bluefox) Make it admin4 compatible

### 1.8.21 (2021-05-16)
* (bluefox) Fixed the encryption of the password. Warning: if you see the message in the log, that password is invalid, please enter the password in configuration dialog one more time and save.

### 1.8.20 (2021-05-16)
* (foxriver76) we now write data received from custom services with acknowledge flag

### 1.8.19 (2021-05-14)
* (bluefox) Only added one debug output

### 1.8.16 (2021-03-13)
* (bluefox) fixed the blind functionality in alisa

### 1.8.15 (2021-03-12)
* (bluefox) implemented the sensor functionality in alisa

### 1.8.14 (2021-03-12)
* (bluefox) allowed the control of the blinds in alisa

### 1.8.13 (2021-02-04)
* (Apollon77) add missing object smart.lastObjectID

### 1.8.12 (2021-02-02)
* (bluefox) Fixed the dimmer issue with alisa.

### 1.8.11 (2021-01-20)
* (Morluktom) Alexa - Corrected the request for percentage values

### 1.8.10 (2021-01-20)
* (bluefox) Added the reconnection strategy if DNS address cannot be resolved

### 1.8.9 (2020-12-27)
* (bluefox) Updated configuration GUI to the latest state

### 1.8.8 (2020-12-14)
* (bluefox) Corrected the "google home" error

### 1.8.6 (2020-12-13)
* (bluefox) Try to fix google home error

### 1.8.5 (2020-11-23)
* (bluefox) Corrected the configuration table for google home

### 1.8.4 (2020-11-18)
* (bluefox) Corrected the configuration table for google home

### 1.8.3 (2020-11-16)
* (bluefox) Trying to fix the set to false at start for google home

### 1.8.2 (2020-11-15)
* (bluefox) Added the debug outputs for google home

### 1.8.1 (2020-11-13)
* (bluefox) The deletion of google home devices was corrected

### 1.8.0 (2020-11-12)
* (bluefox) The google home table was rewritten

### 1.7.15 (2020-11-05)
* (Morluktom) Corrected the request for temperature

### 1.7.14 (2020-11-05)
* (bluefox) Updated the select ID dialog.

### 1.7.12 (2020-09-25)
* (bluefox) Updated the select ID dialog.

### 1.7.9 (2020-09-17)
* (bluefox) Updated GUI for config.

### 1.7.7 (2020-09-02)
* (bluefox) Added information about changed linking process.

### 1.7.6 (2020-08-25)
* (bluefox) Some colors were changed in the dark mode.

### 1.7.5 (2020-08-21)
* (Apollon77) Crash prevented (Sentry IOBROKER-IOT-W)
* (bluefox) Values for modes will be converted to number in Alisa

### 1.7.3 (2020-08-16)
* (bluefox) Added vacuum cleaner to Alisa

### 1.7.1 (2020-08-16)
* (bluefox) Added blinds, lock and thermostat to Alisa

### 1.6.4 (2020-08-06)
* (Apollon77) crash prevented (Sentry IOBROKER-IOT-V)

### 1.6.3 (2020-08-04)
* (bluefox) Added french letters to allowed symbols

### 1.6.1 (2020-07-10)
* (bluefox) Used new SelectID Dialog in GUI

### 1.5.3 (2020-05-28)
* (bluefox) Small change for nightscout

### 1.5.2 (2020-05-21)
* (bluefox) Changed requirements for password
* (bluefox) Do not try load the "sharp" if blood sugar not enabled

### 1.4.18 (2020-05-11)
* (Apollon77) Make sure that invalid configured states or values without a timestamp do not crash adapter (Sentry IOBROKER-IOT-8)
* (Apollon77) Make sure publishes after the disconnect to not break adapter (Sentry IOBROKER-IOT-A)

### 1.4.17 (2020-05-11)
* (bluefox) Better error output is implemented

### 1.4.14 (2020-05-01)
* (bluefox) Fixed the problem if admin is not on 8081 port

### 1.4.12 (2020-04-30)
* (Apollon77) error case handled where system.config objects does not exist (Sentry IOBROKER-IOT-5)

### 1.4.11 (2020-04-26)
* (bluefox) fixed IOBROKER-IOT-REACT-F

### 1.4.10 (2020-04-24)
* (bluefox) Fixed crashes reported by sentry

### 1.4.7 (2020-04-23)
* fix iot crash when timeouts in communications to Google happens (Sentry IOBROKER-IOT-2)
* fix iot crash when google answers without customData (Sentry IOBROKER-IOT-1)

### 1.4.6 (2020-04-18)
* (Apollon77) Add the Sentry error reporting to `React Frontend`

### 1.4.4 (2020-04-14)
* (Apollon77) remove js-controller 3.0 warnings and replace `adapter.objects` access
* (Apollon77) add linux dependencies for canvas library
* (Apollon77) add sentry configuration

### 1.4.2 (2020-04-08)
* (TA2k) Fix updateState for Google Home

### 1.4.1 (2020-04-04)
* (bluefox) The blood glucose request supported now

### 1.3.4 (2020-02-26)
* (TA2k) Fixed deconz issues in Google Home

### 1.3.3 (2020-02-12)
* (Apollon77) fix alisa error with invalid smartName attributes

### 1.3.2 (2020-02-10)
* (Apollon77) usage with all kinds of admin ports and reverse proxies optimized

### 1.3.1 (2020-02-09)
* (Apollon77) Dependency updates
* (Apollon77) Make compatible with Admin > 4.0 because of updated socket.io

### 1.2.1 (2020-01-18)
* (bluefox) Fixed problem if the port of admin is not 8081

### 1.2.0 (2020-01-04)
* (TA2k) Google Home handling and visualization improved.

### 1.1.10 (2020-01-03)
* (bluefox) Now is allowed to select the temperature values as alexa states
* (bluefox) Allowed the setting type immediately after insertion of new state

### 1.1.9 (2019-11-27)
* (bluefox) Fixed: sometimes the configuration could not be loaded

### 1.1.8 (2019-09-12)
* (bluefox) Optimization of google home communication was done

### 1.1.7 (2019-09-11)
* (bluefox) The sending rate to google home is limited now

### 1.1.6 (2019-09-11)
* (TA2k) Room fix for Google Home and LinkedDevices

### 1.1.4 (2019-09-10)
* (bluefox) decreased keepalive value to fix issue with disconnect

### 1.1.3 (2019-09-09)
* (TA2k) Google Home problem fixed with LinkedDevices

### 1.1.0 (2019-09-06)
* (bluefox) Added support of aliases

### 1.0.8 (2019-09-03)
* (TA2k) Improved support for Google Home
* (TA2k) Added auto detection for RGB, RGBSingle, Hue, CT, MediaDevice, Switch, Info, Socket, Light, Dimmer, Thermostat, WindowTilt, Blinds, Slider
* (TA2k) Added support for manually adding states as devices
* (TA2k) Fix update state after Sync
* (TA2k) Added typical Google Home devices and traits/actions
* (TA2k) Fix only process update message when Alexa is checked in the options

### 1.0.4 (2019-08-01)
* (bluefox) Fixed password encoding. Please enter password anew!

### 1.0.3 (2019-07-30)
* (bluefox) Fixed language issues for google home and yandex alice

### 1.0.1 (2019-07-26)
* (bluefox) Support of private skills/actions was added.

### 1.0.0 (2019-07-14)
* (TA2k) Google Home list was added

### 0.5.0 (2019-06-29)
* (bluefox) tried to add yandex Alisa

### 0.4.3 (2019-04-14)
* (Apollon77) Change enable/disable of Amazon Alexa and of Google Home from configuration to be really "active if selected".

### 0.4.2 (2019-03-10)
* (bluefox) Allowed the enablement and disable of Amazon Alexa and of Google Home from configuration.

### 0.4.1 (2019-02-19)
* (bluefox) Add version check to google home

### 0.3.1 (2019-01-13)
* (bluefox) Blockly was fixed

### 0.3.0 (2018-12-30)
* (bluefox) Detection of google devices was fixed

### 0.2.2 (2018-12-21)
* (bluefox) Generation of new URL key was added

### 0.2.0 (2018-12-18)
* (bluefox) Change the name of adapter

### 0.1.8 (2018-10-21)
* (bluefox) Added extended diagnostics

### 0.1.7 (2018-10-14)
* (bluefox) The configuration dialog was corrected
* (bluefox) The possibility to create the answer with script for the custom skill was implemented.

### 0.1.4 (2018-09-26)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2018-2021 bluefox <dogafox@gmail.com>

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