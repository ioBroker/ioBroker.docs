---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.iot/README.md
title: ioBroker 物联网适配器
hash: 40UtDx2VA3JtWsZYrhVi+dAqzkP5Zq02jj7UFnUNjtU=
---
![安装数量](http://iobroker.live/badges/iot-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.iot.svg)
![下载](https://img.shields.io/npm/dm/iobroker.iot.svg)

<img src="admin/iot.svg" style="width: 100px;"/>

# IoBroker 物联网适配器
![测试和发布](https://github.com/ioBroker/ioBroker.iot/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/iot/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

此适配器仅用于与 Amazon Alexa、Google Home 和 Nightscout 通信。
它不适用于远程访问您的 ioBroker 实例。请使用 ioBroker.cloud 适配器进行远程访问。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-Plugin 文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

＃＃ 设置
要使用物联网适配器，您应该首先在 ioBroker 云[https://iobroker.pro](https://iobroker.pro) 上注册。

[参考google API类型设置](https://developers.google.com/actions/smarthome/guides/)

![简介](../../../en/adapterref/iobroker.iot/img/intro.png)

＃＃＃ 语言
如果您选择“默认”语言，设备和枚举的智能名称将不会被翻译。如果指定了某种语言，所有已知名称都将翻译成该语言。
这样做是为了在多种语言之间快速切换，以便进行演示。

### 将函数放在名称的第一位
更改自生成名称中功能和角色的顺序：

- 如果为假：“房间功能”，例如“客厅调光器”
- 如果为真：“功能室”，例如“调光客厅”

### 连接单词
您可以定义将放置在功能和房间之间的单词。例如，将“in”和“Dimmer living room”替换为“Dimmer in living room”。

但不建议这样做，因为识别引擎必须多分析一个词，这可能会导致误解。

### 开关的关闭级别
有些组包含混合设备：调光器和开关。可以使用“开启”和“关闭”命令以及百分比来控制它们。
如果命令为`Set to 30%`和`OFF level is 30%`，则开关将打开。使用“设置为 25%”命令，所有开关将关闭。

此外，如果命令为“OFF”，则当实际值大于或等于“30%”时，适配器将记住当前的调光级别。
之后，当新的“ON”命令到来时，适配器将不再将调光级别切换到 100%，而是切换到内存中的级别。

例子：

- 假设_OFF 级别_为 30%。
- 虚拟设备“Light”有两个物理设备：_switch_ 和 _dimmer_。
- 命令：“将灯光亮度设置为 40%”。适配器会记住这个“调光”值，将其设置为“调光”，然后打开“开关”。
- 命令：“关灯”。适配器会将_调光器_设置为0%，并关闭_开关_。
- 命令：“打开灯”。_dimmer_ => 40%，_switch_ => ON。
- 命令：“将灯光亮度设置为 20%”。_调光器_ => 20%，_开关_ => 关闭。调光器的亮度值不会被记录，因为它低于_关闭级别_。
- 命令：“打开灯”。_dimmer_ => 40%，_switch_ => ON。

### 由 ON
您可以选择 ON 命令对数字状态的行为。您可以选择具体值，或者使用最后一个非零值。

### 写回复至
每个命令都会生成文本响应。您可以在此处定义对象 ID，用于写入文本。例如：_sayit.0.tts.text_。

＃＃＃ 颜色
该通道需要 3-5 个状态，其角色如下：

- `level.color.saturation` - 检测通道所需，
- `level.color.hue`，
- `level.dimmer`，
- `switch` - 可选，
- `level.color.temperature`（可选）

```
Alexa, set the "device name" to "color"
Alexa, turn the light fuchsia
Alexa, set the bedroom light to red
Alexa, change the kitchen to the color chocolate
```

＃＃＃ 锁
为了能够锁定锁，状态必须具有角色`switch.lock`，并具有`native.LOCK_VALUE`来确定锁定状态。
如果您需要单独的值来控制锁，则可以使用`native.CONTROL VALUE`。

```
Alexa, is "lock name" locked/unlocked
Alexa, lock the "lock name"
```

## 如何生成名称
适配器尝试生成用于智能家居控制的虚拟设备（例如，Amazon Alexa 或 Google Home）。

有两个重要的枚举：房间和功能。

房间例如：客厅、浴室、卧室。
功能例如：灯光、窗帘、暖气。

要想获取自动生成列表中的状态，必须满足以下条件：

- 状态必须位于某个“函数”枚举中。
- 如果状态没有直接包含在“功能”中，则必须具有角色（“state”、“switch”或“level.\*”，例如“level.dimmer”）。

有可能该通道处于`functions`，但状态本身却不在。

- 状态必须是可写的：`common.write` = true
- 状态调光器必须将“common.type”设置为“number”
- 状态加热必须具有 `common.unit` 作为 `°C`、`°F` 或 `°K` 并且 `common.type` 为 `number`

如果该状态仅在“功能”中而不在任何“房间”中，则将使用状态名称。

状态名称将根据功能和房间生成。例如，_客厅_中的所有_灯_都将收集到虚拟设备_客厅灯_中。
用户无法更改此名称，因为它是自动生成的。
但是，如果枚举名称发生变化，此名称也会随之更改。（例如，功能“light”更改为“lights”，因此_客厅灯_将更改为_客厅灯_）

如果状态包含 common.smartName，则所有规则都将被忽略。在这种情况下，只会使用智能名称。

如果`common.smartName`是`false`，则该状态或枚举将不会包含在列表生成中。

配置对话框可让您轻松地删除单个状态并将其添加到虚拟组或单个设备。
![配置](../../../en/adapterref/iobroker.iot/img/configuration.png)

如果组只有一个状态，则可以重命名，因为重命名时将使用状态的 smartName。
如果组有多个状态，则必须通过枚举名称重命名组。

要创建自己的组，用户可以安装“场景”适配器或在 JavaScript 适配器中创建“脚本”。

### 替换
您可以指定设备名称中可自动替换的字符串。例如，如果您将替换设置为：`.STATE,.LEVEL`，则所有`.STATE` 和 `.LEVEL` 都会从名称中删除。请注意空格。
如果您设置为`.STATE, .LEVEL`，则`.STATE` 和 `.LEVEL` 将被替换，而不会替换`.LEVEL`。

## 辅助状态
- `smart.lastObjectID`：如果只有一个设备由家庭技能（alexa、google home）控制，则会设置此状态。
- `smart.lastFunction`：执行最后命令的函数名称（如果存在）。
- `smart.lastRoom`：执行最后命令的房间名称（如果存在）。
- `smart.lastCommand`: 最后执行的命令。命令可以是：`true(开启)`、`false(关闭)`、`number(%)`、`-X(在 x 处减少)`、`+X(在 X 处增加)`
- `smart.lastResponse`：命令的文本响应。它可以发送到某些 `text2speech` (`sayit`) 引擎。

## 切换模式
Alexa v3 支持切换模式。
这意味着，如果您说“Alexa，开灯”，并且灯已经亮着，它就会被关闭。

## IFTTT
[指示](doc/ifttt.md)

谷歌主页
如果您在日志中看到以下错误消息：`[GHOME] Invalid URL Pro key. Status auto-update is disabled you can set states but receive states only manually`。
那么您必须重新生成 URL 密钥：

![URL 键](../../../en/adapterref/iobroker.iot/img/url_key.png)

## 服务
有可能向云适配器发送消息。
如果您调用`[POST]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>` und 值作为有效负载。

`curl --data "myString" https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>`

或者

`[GET]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>&data=myString`

如果您在设置中将“服务白名单”字段的名称设置为`custom_test`，并以“custom_test”作为服务名称进行调用，则状态**cloud.0.services.custom_test**将设置为_myString_。

您可以在白名单中写入“\*”，则所有服务都将被允许。

您可以在此处找到有关如何将其与[塔斯克](doc/tasker.md)一起使用的说明。

仅当设置了 IFTTT 密钥时才允许使用 IFTTT 服务。

保留名称为`ifttt`、`text2command`、`simpleApi` 和 `swagger`。使用这些名称时，必须不使用`custom_`前缀。

您也可以通过消息询问服务的有效网址：

```js
sendTo('iot.0', 'getServiceEndpoint', { serviceName: 'custom_myService' }, result =>
    console.log(JSON.stringify(result)),
);
// Output: {"result":
//  {"url": "https://service.iobroker.in/v1/iotService?key=xxx&user=uuu&service=custom_myService",
//   "stateID":"iot.0.services.myService",
//   "warning":"Service name is not in white list"
//  }}
```

###`text2command`
您可以在白名单中写入`text2command`，您可以向`https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>`发送POST请求，将数据写入_text2command.X.text_变量。

您也可以使用 GET 方法`https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>&data=<MY COMMAND>`

`X` 可以通过“使用 text2command 实例”选项在设置中定义。

## 自定义技能
自定义技能的答案可以通过两种方式处理：

-`text2command`
-`javascript`

###`text2command`
如果在配置对话框中定义了`text2command`实例，那么问题将被发送到该实例。

必须配置`text2command`，以便解析预期的短语并返回答案。

###`Javascript`
可以直接使用脚本处理问题。如果未选择`text2command`实例，则默认激活该脚本。

如果定义了`text2command`实例，那么该实例必须提供答案，并且来自_script_的答案将被忽略。

适配器将提供两种状态下不同细节级别的细节

- `smart.lastCommand` 包含收到的文本，其中包含查询类型（意图）的信息。例如：`askDevice Status Rasenmäher`
- `smart.lastCommandObj` 包含一个 JSON 字符串，可以解析为包含以下信息的对象
- `words` 包含数组中接收到的单词
- `intent` 包含查询类型。目前可能的值有：
- v1 技能：`askDevice`、`controlDevice`、`actionStart`、`actionEnd`、`askWhen`、`askWhere`、`askWho`
- v2 技能：当捕获完整文本时使用 `queryIntent`，当仅捕获部分文本时使用 `controlDevice` 作为回退
- `deviceId` 包含一个设备 ID，用于标识发送请求的设备，由亚马逊提供，如果未提供，则为空字符串
- `deviceRoom` 包含一个映射的房间标识符，您可以在物联网管理界面中为收集的设备 ID 配置该标识符
- `sessionId` 包含技能会话的 sessionId，如果说出多个命令，则应该相同，由亚马逊提供，如果未提供，则为空字符串
- `userId` 包含来自设备所有者（或者可能是后来与技能交互的用户）的用户 ID，由亚马逊提供，如果未提供，则为空字符串
- `userName` 包含一个映射的用户名，您可以在 iot 管理 UI 中为收集到的用户 ID 配置该用户名

有关如何检测单词以及 Alexa Custom Skill 区分哪些类型的查询的更多详细信息，请查看 https://forum.iobroker.net/viewtopic.php?f=37&t=17452 。

**通过smart.lastResponse状态返回结果**

响应需要在 200 毫秒内以 `smart.lastResponse` 状态发送，可以是简单的文本字符串或 JSON 对象。
如果是文本字符串，则该文本将作为对技能的响应发送。
如果文本是 JSON 对象，则可以使用以下键：

- `responseText` 需要包含返回给亚马逊的文本
- `shouldEndSession` 是一个布尔值，控制会话在说出响应后是否关闭或保持打开以接受另一个语音输入。
- `sessionId` 需要包含响应所针对的 sessionId。理想情况下，提供该值以允许并发会话。如果未提供，则默认为第一个需要响应的会话。

**通过消息返回结果给物联网实例**

物联网实例还接受名为“alexaCustomResponse”的消息，该消息包含键“response”，其对象可以包含键`responseText`、`shouldEndSession`和`sessionId`，如上所述。
物联网实例不会对该消息做出任何响应！

**使用文本的脚本示例**

```js
// important, that ack=true
on({ id: 'iot.0.smart.lastCommand', ack: true, change: 'any' }, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    setState('iot.0.smart.lastResponse', 'Received phrase is: ' + obj.state.val); // important, that ack=false (default)
});
```

**使用 JSON 对象的脚本示例**

```js
// important, that ack=true
on({ id: 'iot.0.smart.lastCommandObj', ack: true, change: 'any' }, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    const request = JSON.parse(obj.state.val);
    const response = {
        responseText: 'Received phrase is: ' + request.words.join(' ') + '. Bye',
        shouldEndSession: true,
        sessionId: request.sessionId,
    };

    // Return response via state
    setState('iot.0.smart.lastResponse', JSON.stringify(response)); // important, that ack=false (default)

    // or alternatively return as message
    sendTo('iot.0', 'alexaCustomResponse', response);
});
```

### 私有云
如果您使用私人技能/动作/навык 与`Alexa/Google Home/Алиса` 进行通信，那么您可以使用 IoT 实例来处理来自它的请求。

例如对于`yandex alice`：

```js
const OBJECT_FROM_ALISA_SERVICE = {}; // object from alisa service or empty object
OBJECT_FROM_ALISA_SERVICE.alisa = '/path/v1.0/user/devices'; // called URL, 'path' could be any text, but it must be there
sendTo('iot.0', 'private', { type: 'alisa', request: OBJECT_FROM_ALISA_SERVICE }, response => {
    // Send this response back to alisa service
    console.log(JSON.stringify(response));
});
```

支持以下类型：

- `alexa` - 与 Amazon Alexa 或 Amazon Custom Skill 配合使用
- `ghome` - 通过 Google Home 使用 Google Actions
- “alisa” - 与 Yandex Алиса 合作
- `ifttt` - 像 IFTTT 一样工作（实际上不是必需的，但用于测试目的）

## Yandex 阿利萨
[指示](doc/alisa.md)

## 发送消息到应用程序
从 1.15.x 版本开始，您可以向 `ioBroker Visu` 应用程序 ([Android](https://play.google.com/store/apps/details?id=com.iobroker.visu) 和 [iOS](https://apps.apple.com/de/app/iobroker-visu/id1673095774)) 发送消息。
为此，您需要写入以下状态：

```js
setState('iot.0.app.expire', 60); // optional. Time in seconds
setState('iot.0.app.priority', 'normal'); // optional. Priority: 'high' or 'normal'
setState('iot.0.app.title', 'ioBroker'); // optional. Default "ioBroker"
setState('iot.0.app.message', 'Message text'); // important, that ack=false (default)

// or just one state (this also allows to use payload -> `actions`, `devices` and `link` property)
// only message is mandatory. All other are optional
// Note that, if you are using `actions`or `devices`, the app needs to handle the notification in the background before showing it
// in some scenarios, e.g. low power or spamming to many notifications the OS may decide to not show the notification at all
setState('iot.0.app.message', JSON.stringify({
  message: 'Message text',
  title: 'ioBroker',
  expire: 60,
  priority: 'normal',
  payload: {
      devices: JSON.stringify(['iPhone von Maelle', 'iPhone von Max']), // devices to send the message to, if not given send to all - requires Visu App 1.4.0
      openUrl: 'https://www.iobroker.net', // opens a link when clicking on the notification
      actions: JSON.stringify([ // actions to respond to the notification - requires Visu App 1.4.0
          { buttonTitle: 'Yes', identifier: 'home:yes' }, // The app will display the button title and on clicking the identifier will be set to the state `iot.0.app.devices.<deviceName>.actionResponse`
          { buttonTitle: 'No', identifier: 'home:no' }
      ])
  }
})); // important, that ack=false (default)
```

## 待办事项
- 智能名称必须具有更高的优先级，因为组
- 设备应按智能名称分组

<!-- 下一个版本的占位符（在行首）：

### **工作正在进行** -->

## Changelog
### 4.2.0 (2025-10-21)
- (@GermanBluefox) Added debug information
- (@GermanBluefox) Better handling of HUE devices
- (@GermanBluefox) Updated type detector

### 4.1.11 (2025-10-20)
- (@GermanBluefox) Added humidity sensor
- (@GermanBluefox) Added unreach indicator
- (@GermanBluefox) Corrected deletion of automatically detected devices

### 4.1.10 (2025-10-19)
- (@GermanBluefox) Fixed detection of blinds
- (@GermanBluefox) Fixed detection of sliders

### 4.1.7 (2025-10-19)
- (@GermanBluefox) Better handling of dimmer in alexa v3

### 4.1.5 (2025-10-18)
- (@GermanBluefox) Better handling of color temperatures

## License

The MIT License (MIT)

Copyright (c) 2018-2025 bluefox <dogafox@gmail.com>

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