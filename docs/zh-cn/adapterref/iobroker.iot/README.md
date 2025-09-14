---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.iot/README.md
title: ioBroker 物联网适配器
hash: nHZSEspy8ae1p1z5byBu/bftY4W74lkX+nHje3yM8ks=
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
您可以定义将放置在功能和房间之间的单词。例如，将“客厅调光器”中的“in”替换为“客厅调光器”。

但不建议这样做，因为识别引擎必须多分析一个字，这可能会导致误解。

### 开关的关闭级别
有些组由混合设备组成：调光器和开关。可以使用“开启”和“关闭”命令以及百分比来控制它们。
如果命令为`Set to 30%`和`OFF level is 30%`，则开关将打开。使用“设置为 25%”命令，所有开关将关闭。

此外，如果命令为“OFF”，当实际值大于或等于“30%”时，适配器会记住当前的调光级别。
之后，当新的“ON”命令到来时，适配器将不再将调光级别切换到 100%，而是切换到内存中的级别。

例子：

- 假设_OFF 级别_为 30%。
- 虚拟设备“Light”有两个物理设备：_switch_ 和 _dimmer_。
- 命令：“将灯光亮度设置为 40%”。适配器会记住这个“调光”值，并将其设置为“调光”，然后打开“开关”。
- 命令：“关灯”。适配器会将_调光器_设置为 0%，并关闭_开关_。
- 命令：“打开灯”。_dimmer_ => 40%，_switch_ => ON。
- 命令：“将灯光设置为 20%”。_调光器_ => 20%，_开关_ => 关闭。调光器的数值不会被记住，因为它低于_关闭级别_。
- 命令：“打开灯”。_dimmer_ => 40%，_switch_ => ON。

### 由 ON
您可以选择 ON 命令对数字状态的行为。您可以选择具体值，或者使用最后一个非零值。

### 写回复至
每个命令都会生成文本响应。您可以在此处定义对象 ID，用于写入文本。例如：_sayit.0.tts.text_。

＃＃＃ 颜色
该通道需要3-5个状态，具有以下角色：

- `level.color.saturation` - 检测通道所需，
- `level.color.hue`，
- `level.dimmer`，
- `switch` - 可选，
- `level.color.temp`（可选）

```
Alexa, set the "device name" to "color"
Alexa, turn the light fuchsia
Alexa, set the bedroom light to red
Alexa, change the kitchen to the color chocolate
```

＃＃＃ 锁
为了能够锁定锁，状态必须具有角色`switch.lock`，并具有`native.LOCK_VALUE`来确定锁定状态。
如果您需要单独的值来控制锁，可以使用`native.CONTROL VALUE`。

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
- 如果状态没有直接包含在“函数”中，则必须具有角色（“state”、“switch”或“level.\*”，例如“level.dimmer”）。

有可能该通道处于`functions`，但状态本身却不在。

- 状态必须是可写的：`common.write` = true
- 状态调光器必须将“common.type”设置为“number”
- 状态加热必须具有 `common.unit` 作为 `°C`、`°F` 或 `°K` 且 `common.type` 为 `number`

如果该状态仅在“功能”中而不在任何“房间”中，则将使用状态名称。

状态名称将根据功能和房间生成。例如，_客厅_中的所有_灯_都将收集到虚拟设备_客厅灯_中。
用户无法更改此名称，因为它是自动生成的。
但是，如果枚举名称发生变化，此名称也会更改。（例如，功能“light”更改为“lights”，因此_客厅灯_将更改为_客厅灯_）

如果状态包含 common.smartName，则所有规则都将被忽略。在这种情况下，只会使用智能名称。

如果`common.smartName`是`false`，则该状态或枚举将不会包含在列表生成中。

配置对话框可让您轻松地移除单个状态并将其添加到虚拟组或单个设备。
![配置](../../../en/adapterref/iobroker.iot/img/configuration.png)

如果组只有一个状态，则可以重命名，因为重命名时将使用状态的 smartName。
如果组有多个状态，则必须通过枚举名称重命名组。

要创建自己的组，用户可以安装“场景”适配器或在 JavaScript 适配器中创建“脚本”。

### 替换
您可以指定设备名称中可自动替换的字符串。例如，如果您将替换设置为：`.STATE,.LEVEL`，则所有`.STATE` 和`.LEVEL` 都将被从名称中删除。请注意空格。
如果您设置为`.STATE, .LEVEL`，则`.STATE` 和`.LEVEL` 将被替换，而不会替换`.LEVEL`。

## 辅助状态
- `smart.lastObjectID`：如果只有一个设备由家庭技能（alexa、google home）控制，则会设置此状态。
- `smart.lastFunction`：执行最后命令的函数名称（如果存在）。
- `smart.lastRoom`：执行最后命令的房间名称（如果存在）。
- `smart.lastCommand`：最后执行的命令。命令可以是：`true（开启）`、`false（关闭）`、`number(%)`、`-X（在 x 处减少）`、`+X（在 X 处增加）`
- `smart.lastResponse`：对命令的文本响应。它可以发送到某些 `text2speech` (`sayit`) 引擎。

## 切换模式
Alexa v3 支持切换模式。
这意味着，如果您说“Alexa，开灯”，而灯已经亮着，它就会被关闭。

## IFTTT
[指示](doc/ifttt.md)

谷歌主页
如果您在日志中看到以下错误消息：`[GHOME] Invalid URL Pro key. Status auto-update is disabled you can set states but receive states only manually`。
则必须重新生成 URL 密钥：

![URL 键](../../../en/adapterref/iobroker.iot/img/url_key.png)

## 服务
有可能向云适配器发送消息。
如果您调用`[POST]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>`，则将值作为有效载荷。

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
您可以在白名单中写入`text2command`，您可以向`https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>`发送POST请求将数据写入_text2command.X.text_变量。

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
- `intent` 包含查询类型。目前可能的值包括：
- v1 技能：`askDevice`、`controlDevice`、`actionStart`、`actionEnd`、`askWhen`、`askWhere`、`askWho`
- v2 技能：当捕获完整文本时使用 `queryIntent`，当仅捕获部分文本时使用 `controlDevice` 作为回退
- `deviceId` 包含一个设备 ID，用于标识发送请求的设备，由亚马逊提供，如果未提供，则为空字符串
- `deviceRoom` 包含一个映射的房间标识符，您可以在 IoT 管理 UI 中为收集的设备 ID 配置该标识符
- `sessionId` 包含技能会话的 sessionId，如果由亚马逊发出多个命令，则应该相同，如果未提供，则为空字符串
- `userId` 包含来自设备所有者（或者可能是稍后与技能交互的用户）的用户 ID，由亚马逊提供，如果未提供，则为空字符串
- `userName` 包含一个映射的用户名，您可以在 IoT 管理 UI 中为收集到的用户 ID 配置该用户名

有关如何检测单词以及 Alexa Custom Skill 区分哪些类型的查询的更多详细信息，请查看 https://forum.iobroker.net/viewtopic.php?f=37&t=17452 。

**通过smart.lastResponse状态返回结果**

响应需要在 200 毫秒内以 `smart.lastResponse` 状态发送，可以是简单的文本字符串或 JSON 对象。
如果是文本字符串，则该文本将作为对技能的响应发送。
如果文本是 JSON 对象，则可以使用以下键：

- `responseText` 需要包含返回给亚马逊的文本
- `shouldEndSession` 是一个布尔值，控制会话在说出响应后是否关闭或保持打开以接受另一个语音输入。
- `sessionId` 需要包含响应所针对的 sessionId。理想情况下，提供该 ID 以允许并发会话。如果未提供，则假定为第一个需要响应的会话。

**通过消息返回结果给物联网实例**

物联网实例还接受名为“alexaCustomResponse”的消息，该消息包含键“response”，其对象可以包含键`responseText`、`shouldEndSession`和`sessionId`（如上所述）。物联网实例不会对该消息做出任何响应！

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
如果您使用私人技能/动作/навык 与 `Alexa/Google Home/Алиса` 进行通信，那么您可以使用 IoT 实例来处理来自它的请求。

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
### 4.0.3 (2025-08-27)
- (@GermanBluefox) 为自定义技能响应添加了响应 ID

### 4.0.2 (2025-08-26)
- (@GermanBluefox) 一些文件用 TypeScript 重写
- (@GermanBluefox) Alexa V3 的改进

### 3.6.0 (2025-07-02)
- (@foxriver76) 即将推出的 Visu App 1.4.0 的新功能

### 3.5.2 (2025-06-04)
- (@GermanBluefox) 修正后端错误

### 3.5.1 (2025-05-31)
- (@GermanBluefox) 使用 TypeScript 重写规则
- (@GermanBluefox) 软件包更新。SVG 徽标

### 3.5.0 (2025-02-24)
- (@foxriver76) 添加了通知管理器支持（通知将作为推送通知发送到 Visu 应用程序）

### 3.4.5 (2024-12-29)
- (@GermanBluefox) 检查了 Alexa 发现设备的最大长度

### 3.4.4 (2024-12-08)
- (@GermanBluefox) 更正了 Alexa 3 的设备名称编辑

### 3.4.3 (2024-11-05)
- (@GermanBluefox) 修正了 Alexa 设备的添加
- (@GermanBluefox) 修改了 GUI 的编译以删除已弃用的软件包

### 3.4.2 (2024-09-17)
- (@GermanBluefox) 更新了 GUI 包并删除了 `gulp`
- (@foxriver76) 不要覆盖 `sendToAdapter` 响应中的自定义 `result` 属性（Visu App - 仅与开发人员相关）

### 3.4.0 (2024-08-26)
- (@foxriver76) 为 visu 应用程序添加了新命令
-（bluefox）更新了软件包
- (bluefox) 迁移至 admin v7 的 GUI

### 3.3.0 (2024-05-09)
- (foxriver76) 修复重新连接时的错误
-（foxriver76）为新的 ioBroker Visu 应用状态准备了适配器
-（bluefox）更新了软件包

### 3.2.2 (2024-04-11)
-（foxriver76）删除一些应该只作为调试日志的警告

### 3.2.1 (2024-04-11)
- (foxriver76) 修复了只有有效的 JSON 才能通过消息状态发送到应用程序的问题

### 3.2.0 (2024-04-10)
-（foxriver76）使用 ioBroker Visu 应用实现地理围栏

### 3.1.0 (2024-02-05)
-（bluefox）更新了软件包
- (bluefox) 禁用 Alexa v3 的状态变化报告

### 3.0.0 (2023-10-24)
-（bluefox）更新了软件包
- (bluefox) 最低支持的 node.js 版本是 16

### 2.0.11 (2023-06-20)
- (bluefox) 增加了对状态切换的支持 (alexa 3)
- (bluefox) 对 Alexa 3 做了一些小改进

### 2.0.9 (2023-06-15)
- (bluefox) 致力于支持亚马逊 Alexa v3

### 2.0.2 (2023-06-05)
- (bluefox) 增加了对 amazon alexa v3 的支持
- (bluefox) 删除了对血糖指示的支持

### 1.14.6 (2023-05-12)
- (bluefox) 更正翻译

### 1.14.5 (2023-03-01)
- (bluefox) 修正 GUI 中的枚举名称

### 1.14.3 (2023-01-10)
-（kirovilya）修复 Alisa 中 CT 和 RGB 灯光处理

### 1.14.2 (2022-12-23)
- (bluefox) 更新了 GUI 包

### 1.14.1 (2022-12-22)
- (bluefox) 将 axios 版本降级至 0.27.2

### 1.14.0 (2022-12-13)
- (bluefox) 添加了 netatmo 支持

### 1.13.0 (2022-12-08)
- (Apollon77) 增加了对自定义技能 v2 的支持

### 1.12.5 (2022-11-09)
- (bluefox) 配置 GUI 上的小改动

### 1.12.4 (2022-11-03)
- (bluefox) 添加乌克兰语
- (bluefox) 修正了未知语言的块

### 1.12.2 (2022-10-01)
-（Apollon77）修复崩溃问题

### 1.12.1 (2022-09-27)
- (bluefox) 修正 GUI 中密码为空的错误

### 1.12.0 (2022-09-27)
- (Apollon77) 不要通过 Alexa 的百分比请求来控制饱和度
- (bluefox) 将 GUI 迁移至 v5

### 1.11.9 (2022-07-22)
- （Apollon77）修复通过 Alexa 控制恒温器的温度

### 1.11.8 (2022-06-24)
-（Apollon77）更新依赖项以允许更好的自动重建

### 1.11.7 (2022-06-13)
- (bluefox) 尝试纠正 Google Home 的 URL 键创建

### 1.11.5 (2022-06-03)
- (kirovilya) Alisa：二进制传感器“运动”和“接触”的更新

### 1.11.4 (2022-03-29)
- （Apollon77）修复 Sentry 报告的崩溃情况

### 1.11.3 (2022-03-23)
- (bluefox) 添加了服务的 URL 密钥生成

### 1.11.2 (2022-03-20)
-（Apollon77）修复 Sentry 报告的崩溃情况（IOBROKER-IOT-3P）

### 1.11.1 (2022-03-18)
- (Apollon77) 优化使用多设备时的日志记录

### 1.11.0 (2022-03-17)
- (Apollon77) 当 RGB 状态打开/关闭时也支持“存储”
- （Apollon77）修复控制百分比值以正确遵守最小值/最大值
- (bluefox) 支持长度超过 128k 的响应消息 (zip)

### 1.10.0 (2022-03-09)
- (Apollon77) 使用 % 值计算 byOn 值时，请考虑最小值/最大值

### 1.9.7 (2022-02-20)
-（Apollon77）修复 Sentry 报告的崩溃情况（IOBROKER-IOT-3C）

### 1.9.6 (2022-02-19)
- (Apollon77) 使用存储值时，请确保不要记住关闭值
-（Apollon77）修复 Sentry 报告的崩溃情况（IOBROKER-IOT-3A）

### 1.9.5 (2022-02-08)
- (bluefox) 修复 Google Home 颜色控制错误

### 1.9.4 (2022-02-08)
- (bluefox) 修复证书获取错误

### 1.9.3 (2022-02-03)
- (bluefox) 删除了弃用的包 `request`
- (bluefox) 重构和更好的错误处理

### 1.9.2 (2022-01-26)
- (bluefox) 增加了对远程访问的实验性支持

### 1.8.25 (2021-11-18)
- (bluefox) 修正了类别的启用

### 1.8.24 (2021-09-19)
- (bluefox) 通过控制来尊重最小/最大限制

### 1.8.23 (2021-09-18)
- (bluefox) 修复了加热控制的响应

### 1.8.22 (2021-05-16)
- (bluefox) 使其兼容 admin4

### 1.8.21 (2021-05-16)
- (bluefox) 修复了密码加密问题。警告：如果您在日志中看到密码无效的消息，请在配置对话框中再次输入密码并保存。

### 1.8.20 (2021-05-16)
- (foxriver76) 我们现在使用确认标志写入从自定义服务收到的数据

### 1.8.19 (2021-05-14)
-（bluefox）仅添加了一个调试输出

### 1.8.16 (2021-03-13)
- (bluefox) 修复了 alisa 中的盲注功能

### 1.8.15 (2021-03-12)
- (bluefox) 在 alisa 中实现了传感器功能

### 1.8.14 (2021-03-12)
- (bluefox) 允许在 alisa 中控制百叶窗

### 1.8.13 (2021-02-04)
- （Apollon77）添加缺失的对象 smart.lastObjectID

### 1.8.12 (2021-02-02)
- （bluefox）修复了 alisa 的调光器问题。

### 1.8.11 (2021-01-20)
- （Morluktom）Alexa - 修正了百分比值的请求

### 1.8.10 (2021-01-20)
- (bluefox) 添加 DNS 地址无法解析时的重连策略

### 1.8.9 (2020-12-27)
- (bluefox) 将配置 GUI 更新至最新状态

### 1.8.8 (2020-12-14)
- (bluefox) 修正了“Google home”错误

### 1.8.6 (2020-12-13)
- (bluefox) 尝试修复 google home 错误

### 1.8.5 (2020-11-23)
- (bluefox) 修正了 Google Home 的配置表

### 1.8.4 (2020-11-18)
- (bluefox) 修正了 Google Home 的配置表

### 1.8.3 (2020-11-16)
- (bluefox) 尝试修复 Google Home 启动时设置为 false 的问题

### 1.8.2 (2020-11-15)
- (bluefox) 添加了 Google Home 的调试输出

### 1.8.1 (2020-11-13)
- (bluefox) 已更正 Google Home 设备的删除问题

### 1.8.0 (2020-11-12)
- (bluefox) Google 主页表已重写

### 1.7.15 (2020-11-05)
- (Morluktom) 修正了温度请求

### 1.7.14 (2020-11-05)
- (bluefox) 更新了选择 ID 对话框。

### 1.7.12 (2020-09-25)
- (bluefox) 更新了选择 ID 对话框。

### 1.7.9 (2020-09-17)
- （bluefox）更新了配置的 GUI。

### 1.7.7 (2020-09-02)
-（bluefox）添加了有关更改链接过程的信息。

### 1.7.6 (2020-08-25)
- （bluefox）黑暗模式下一些颜色发生了变化。

### 1.7.5 (2020-08-21)
-（Apollon77）防止崩溃（Sentry IOBROKER-IOT-W）
- (bluefox) 模式值将在 Alisa 中转换为数字

### 1.7.3 (2020-08-16)
- (bluefox) 为 Alisa 添加了吸尘器

### 1.7.1（2020-08-16）
- (bluefox) 为 Alisa 添加了百叶窗、锁和恒温器

### 1.6.4 (2020-08-06)
-（Apollon77）防止崩溃（Sentry IOBROKER-IOT-V）

### 1.6.3 (2020-08-04)
- (bluefox) 在允许的符号中添加了法语字母

### 1.6.1（2020-07-10）
- (bluefox) 在 GUI 中使用新的 SelectID 对话框

### 1.5.3 (2020-05-28)
-（bluefox）nightscout 的小变化

### 1.5.2 (2020-05-21)
- (bluefox) 更改了密码要求
- (bluefox) 如果血糖未启用，请勿尝试加载“夏普”

### 1.4.18 (2020-05-11)
- (Apollon77) 确保无效的配置状态或没有时间戳的值不会导致适配器崩溃 (Sentry IOBROKER-IOT-8)
- (Apollon77) 确保在断开连接后发布，以免损坏适配器 (Sentry IOBROKER-IOT-A)

### 1.4.17 (2020-05-11)
- (bluefox) 实现了更好的错误输出

### 1.4.14 (2020-05-01)
- (bluefox) 修复管理员不在 8081 端口时出现的问题

### 1.4.12 (2020-04-30)
-（Apollon77）处理 system.config 对象不存在的错误情况（Sentry IOBROKER-IOT-5）

### 1.4.11 (2020-04-26)
-（bluefox）修复了 IOBROKER-IOT-REACT-F

### 1.4.10 (2020-04-24)
- (bluefox) 修复哨兵报告的崩溃

### 1.4.7 (2020-04-23)
- 修复与 Google 通信超时导致的物联网崩溃问题（Sentry IOBROKER-IOT-2）
- 修复了当谷歌回答时没有自定义数据（Sentry IOBROKER-IOT-1）导致的物联网崩溃

### 1.4.6 (2020-04-18)
- (Apollon77) 将 Sentry 错误报告添加到 `React Frontend`

### 1.4.4 (2020-04-14)
-（Apollon77）删除 js-controller 3.0 警告并替换 `adapter.objects` 访问
-（Apollon77）为 Canvas 库添加 Linux 依赖项
- （Apollon77）添加哨兵配置

### 1.4.2 (2020-04-08)
- （TA2k）修复 Google Home 的 updateState

### 1.4.1（2020-04-04）
- (bluefox) 现在支持血糖请求

### 1.3.4 (2020-02-26)
- （TA2k）修复 Google Home 中的 deconz 问题

### 1.3.3 (2020-02-12)
- (Apollon77) 修复 alisa 因无效的 smartName 属性而产生的错误

### 1.3.2 (2020-02-10)
- （Apollon77）优化了各种管理端口和反向代理的使用

### 1.3.1（2020-02-09）
-（Apollon77）依赖项更新
-（Apollon77）由于更新了 socket.io，因此与 Admin > 4.0 兼容

### 1.2.1（2020-01-18）
- (bluefox) 修复管理员端口不是 8081 时的问题

### 1.2.0（2020-01-04）
- （TA2k）Google Home 处理和可视化得到改进。

### 1.1.10 (2020-01-03)
- (bluefox) 现在允许选择 Alexa 所声明的温度值
- (bluefox) 允许在插入新状态后立即设置类型

### 1.1.9（2019-11-27）
- (bluefox) 修复：有时无法加载配置

### 1.1.8（2019-09-12）
- (bluefox) 优化了 google home 通信

### 1.1.7（2019-09-11）
- (bluefox) 发送至 google home 的速率现在受到限制

### 1.1.6（2019-09-11）
- （TA2k）修复 Google Home 和 LinkedDevices 的房间问题

### 1.1.4（2019-09-10）
- (bluefox) 降低 keepalive 值以修复断开连接问题

### 1.1.3（2019-09-09）
- （TA2k）Google Home 与 LinkedDevices 的问题已修复

### 1.1.0（2019-09-06）
- (bluefox) 增加了对别名的支持

### 1.0.8（2019-09-03）
-（TA2k）改进了对 Google Home 的支持
- (TA2k) 增加了 RGB、RGBSingle、Hue、CT、MediaDevice、Switch、Info、Socket、Light、Dimmer、Thermostat、WindowTilt、Blinds、Slider 的自动检测功能
-（TA2k）增加了手动添加状态作为设备的支持
- （TA2k）修复同步后的更新状态
- (TA2k) 添加了典型的 Google Home 设备和特征/操作
- （TA2k）修复在选项中选中 Alexa 时仅处理更新消息

### 1.0.4（2019-08-01）
- (bluefox) 已修复密码编码问题。请重新输入密码！

### 1.0.3（2019-07-30）
- (bluefox) 修复了 google home 和 yandex alice 的语言问题

### 1.0.1（2019-07-26）
- （bluefox）增加了对私人技能/行动的支持。

### 1.0.0（2019-07-14）
- （TA2k）添加了 Google Home 列表

### 0.5.0（2019-06-29）
- (bluefox) 尝试添加 yandex Alisa

### 0.4.3（2019-04-14）
- （Apollon77）将 Amazon Alexa 和 Google Home 的启用/禁用从配置更改为真正“选择时激活”。

### 0.4.2（2019-03-10）
- （bluefox）允许从配置中启用和禁用 Amazon Alexa 和 Google Home。

### 0.4.1（2019-02-19）
- (bluefox) 为 google home 添加版本检查

### 0.3.1（2019-01-13）
-（bluefox）Blockly 已修复

### 0.3.0（2018-12-30）
- (bluefox) 谷歌设备检测已修复

### 0.2.2（2018-12-21）
-（bluefox）添加了新 URL 密钥的生成

### 0.2.0（2018-12-18）
- (bluefox) 更改适配器的名称

### 0.1.8（2018-10-21）
- (bluefox) 添加了扩展诊断

### 0.1.7（2018-10-14）
- (bluefox) 配置对话框已更正
-（bluefox）实现了使用脚本为自定义技能创建答案的可能性。

### 0.1.4（2018-09-26）
-（bluefox）初始提交

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