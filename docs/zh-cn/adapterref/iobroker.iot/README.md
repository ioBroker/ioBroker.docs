---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.iot/README.md
title: ioBroker 物联网适配器
hash: qfPH9qXDGZeD2CgwBIQeivMVC/gqeWVRr7Ko5za6ogw=
---
![安装数量](http://iobroker.live/badges/iot-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.iot.svg)
![下载](https://img.shields.io/npm/dm/iobroker.iot.svg)

<img src="admin/iot.svg" style="width: 100px;"/>

# IoBroker 物联网适配器
![测试与发布](https://github.com/ioBroker/ioBroker.iot/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/iot/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

此适配器仅用于与 Amazon Alexa、Google Home 和 Nightscout 通信。

它不能用于远程访问您的 ioBroker 实例。如需远程访问，请使用 ioBroker.cloud 适配器。

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

＃＃ 入门
### 这个适配器是做什么用的？
这款适配器可将您的ioBroker设备连接到亚马逊Alexa和谷歌Home等语音助手。它会自动创建可通过语音命令控制的虚拟智能家居设备。

### 基本概念
枚举是ioBroker组织设备的一种方式。枚举分为两种类型：

- **房间**：例如“客厅”、“卧室”、“厨房”等位置
- **功能**：设备类型，例如“照明”、“加热”、“百叶窗”

**智能名称** 是语音助手（例如 Alexa、Google Home）用来识别您设备的名称。适配器会根据房间和功能信息自动生成这些名称（例如，“客厅灯”）。

### 工作原理：
1. 您可以使用枚举将 ioBroker 状态组织成**房间**和**函数**。
2. 该适配器可自动检测设备并创建智能名称，例如“客厅灯”或“卧室暖气”。
3. 这些虚拟设备可在 Alexa 或 Google Home 中使用。
4. 你可以通过语音命令控制它们，例如“Alexa，打开客厅灯”。

### 先决条件
要使用 iot 适配器，您应该首先在 ioBroker 云上注册 [https://iobroker.pro](https://iobroker.pro)。

注意：湿度传感器不能单独显示，必须同时显示温度传感器，因为 Alexa 和 Google Home 不支持此类设备。

[参考 Google API 类型设置](https://developers.google.com/actions/smarthome/guides/)

![引言](../../../en/adapterref/iobroker.iot/img/intro.png)

＃＃ 设置
＃＃＃ 语言
此设置控制自动生成的设备名称所使用的语言。

- **“默认”**：智能名称将使用 ioBroker 枚举（房间和功能）中的原始名称，不进行转换。
- **指定语言**（例如：英语、德语）：所有已知的房间名称和功能名称都将被翻译成所选语言。

**例子：**

- 如果您的设备名称为“Wohnzimmer”（德语，意为客厅），而您选择的语言为英语，则该设备在 Alexa/Google Home 中将显示为“客厅灯”。
- 如果您选择“默认”，则它将保持“Wohnzimmer Light”的名称。

这对于演示目的或想要快速切换语言时非常有用。

### 首先将函数放在名称中
此设置会更改自动生成的设备名称中的单词顺序。

默认情况下，适配器通过组合**房间名称**和**功能名称**来创建设备名称。

- **如果未选中（默认）**：房间优先 → “客厅调光器”
- **如果选中**：功能优先 → “客厅调光”

**为什么要更改？** 有些人觉得说“Alexa，打开客厅调光器”比说“Alexa，打开客厅调光器”更自然。选择你觉得更符合你习惯的表达方式。

### 将单词连接起来
此设置会在自动生成的设备名称中，在房间名称和功能名称之间添加连接词。

**例子：**

- **如果没有**此设置：“客厅调光器”或“客厅调光器”
- **以**“in”作为连接词：“客厅里的调光器”或“客厅在调光器里”

**重要提示：**通常**不建议**使用此功能，因为：

语音助手需要识别额外的词语，这可能会导致误解。
更简单的名称在语音命令中能更可靠地工作

除非有特殊原因需要添加连接词，否则请将此栏留空。

### 开关的关闭级别
某些组包含混合设备：调光器和开关。允许使用“ON”和“OFF”命令以及百分比来控制它们。

如果命令为 `Set to 30%` 和 `OFF level is 30%`，则开关将被打开。使用命令“设置为 25%”将关闭所有开关。

此外，如果指令为“OFF”，则适配器会记住当前调光器的亮度级别（如果实际值大于或等于“30%”）。

之后，当收到新的“ON”指令时，适配器不会将调光器调到100%，而是调到记忆中的亮度级别。

例子：

- 假设 _OFF 级别_ 为 30%。
- 虚拟设备“灯”有两个物理设备：_开关_和_调光器_。
- 命令：“将灯光亮度设置为 40%”。适配器会记住这个值，并将其设置为“调光器”，然后打开开关。
- 命令：“关灯”。适配器会将调光器设置为 0%，并关闭开关。
- 命令：“打开灯”。 _dimmer_ => 40%， _switch_ => ON。
- 命令：“将灯光亮度设置为 20%”。_dimmer_ => 20%，_switch_ => 关闭。由于调光器的值低于 _OFF 级别_，因此不会记住该值。
- 命令：“打开灯”。 _dimmer_ => 40%， _switch_ => ON。

### 由 ON
您可以选择 ON 命令针对特定数值状态的处理方式。您可以选择具体数值，也可以使用最后一个非零值。

### 写回复
每个命令都会生成文本响应。您可以在此处定义要写入此文本的对象 ID。例如：_sayit.0.tts.text_。

＃＃＃ 颜色
该频道需要 3-5 个状态，分别扮演以下角色：

- `level.color.saturation` - 用于检测通道，
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
要启用锁定功能，状态必须具有角色 `switch.lock`，并且需要 `native.LOCK_VALUE` 来确定锁定状态。

如果需要单独的值来控制锁定，可以使用 `native.CONTROL VALUE`。

```
Alexa, is "lock name" locked/unlocked
Alexa, lock the "lock name"
```

## 设备名称的生成方式
该适配器通过结合 ioBroker 设置中的信息，自动创建虚拟智能家居设备。

### 理解枚举
枚举是ioBroker内置的设备组织方式：

- **房间编号**：包含位置（客厅、浴室、卧室、厨房等）
- **功能枚举**：包含设备类型（照明、遮光、加热等）

### 自动检测的要求
要使某个州（设备）能够自动纳入智能家居控制系统，它必须满足以下条件：

1. **必须位于函数枚举中**（例如，“灯光”、“供暖”、“百叶窗”）
2. **必须具有正确的角色**：`state`、`switch` 或 `level.*`（例如 `level.dimmer`）
- 如果整个通道都在函数枚举中，则各个状态不需要特定的角色。
3. **必须可写**：`common.write` 必须为 `true`
4. **特殊要求：**
- 调光器必须将 `common.type` 设置为 `number`
- 供暖必须具有 `common.unit`，其值为 `°C`、`°F` 或 `°K`，并且 `common.type` 为 `number`。

### 名字是如何产生的
该适配器结合了房间和功能信息，以创建有意义的名称：

**例子：**

- 客厅里有灯开关
- 该状态枚举为“灯光”（功能）和“客厅”（房间）。
生成的名称将是：**“客厅灯”**

**多个同类型设备：**客厅里的所有灯都归为同一个虚拟设备“客厅灯”。当你说“Alexa，打开客厅灯”时，该房间内的所有灯都会打开。

**没有房间的设备：** 如果一个状态仅存在于函数枚举中（例如，“灯光”），但不在任何房间中，则将使用原始状态名称。

### 使用 smartName 自定义名称
您可以手动更改命名规则：

- 将 `common.smartName` 设置为您喜欢的名称 → 设备将使用此确切名称
- 将 `common.smartName` 设置为 `false` → 该设备将被排除在智能家居控制之外

### 手动配置
配置对话框允许您手动调整包含哪些状态以及它们的分组方式：![配置](../../../en/adapterref/iobroker.iot/img/configuration.png)

**重命名：**

- **单州组**：可以重命名（使用州的智能名称）
- **多状态组**：必须通过更改枚举名称来重命名。

### 创建自定义组
创建您自己的设备组：

- 使用“场景”适配器
- 在 JavaScript 适配器中创建一个“脚本”。

### 替换
您可以指定一些字符串，这些字符串会在设备名称中自动替换。例如，如果您将替换字符串设置为：`.STATE,.LEVEL`，则所有 `.STATE` 和 `.LEVEL` 都将从名称中删除。请注意空格。

如果您设置 `.STATE, .LEVEL`，则 `.STATE` 和 `.LEVEL` 将被替换，而 `.LEVEL` 不会被替换。

## 辅助状态
- `smart.lastObjectID`：如果仅有一个设备通过家庭技能（Alexa、Google Home）控制，则会设置此状态。
- `smart.lastFunction`: 执行最后一个命令的函数名称（如果存在）。
- `smart.lastRoom`: 执行最后一个命令的房间名称（如果存在）。
- `smart.lastCommand`：最后执行的命令。命令可以是：`true(开启)`、`false(关闭)`、`number(%)`、`-X(减少 x 个单位)`、`+X(增加 x 个单位)`。
- `smart.lastResponse`：收到命令后返回的文本响应。它可以发送到一些 `text2speech`（`sayit`）引擎。

## 切换模式
Alexa v3 支持切换模式。

这意味着，如果您说“Alexa，打开灯”，而灯已经亮着，它会被关闭。

## IFTTT
[指示](doc/ifttt.md)

## Google Home
如果在日志中看到以下错误信息：`[GHOME] Invalid URL Pro key. Status auto-update is disabled you can set states but receive states only manually`。

则必须重新生成 URL 密钥：

![URL密钥](../../../en/adapterref/iobroker.iot/img/url_key.png)

## 服务
可以向云适配器发送消息。

如果您调用 `[POST]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>` 并将值作为有效负载。

`curl --data "myString" https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>`

或者

`[GET]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>&data=myString`

如果在设置中将“服务白名单”字段的名称设置为`custom_test`，并以“custom_test”作为服务名称进行调用，则状态**cloud.0.services.custom_test**将被设置为_myString_。

您可以在白名单中输入“*”，这样所有服务都将被允许。

您可以在这里找到有关如何将其与 [任务者](doc/tasker.md) 一起使用的说明。

只有设置了 IFTTT 密钥，才能使用 IFTTT 服务。

保留名称为 `ifttt`、`text2command`、`simpleApi`、`swagger`。使用这些名称时，必须去掉 `custom_` 前缀。

您也可以通过消息询问该服务的有效网址：

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

### `text2command`
您可以将 `text2command` 写入白名单，然后向 `https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>` 发送 POST 请求，将数据写入 _text2command.X.text_ 变量。

您也可以使用 GET 方法 `https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>&data=<MY COMMAND>`

`X` 可通过“使用 text2command 实例”选项在设置中定义。

## 自定义技能
自定义技能的答案可以通过两种方式处理：

- `text2command`
- `javascript`

### `text2command`
如果在配置对话框中定义了 `text2command` 实例，则问题将发送到该实例。

`text2command` 必须配置为解析预期短语并返回答案。

### `Javascript`
可以直接使用脚本处理问题。如果未选择任何 `text2command` 实例，则默认情况下启用此功能。

如果定义了 `text2command` 实例，则该实例必须提供答案，而来自 _script_ 的答案将被忽略。

适配器将以两种状态提供不同详细程度的详细信息。

- `smart.lastCommand` 包含接收到的文本，其中包括查询类型（意图）信息。例如：`askDevice Status Rasenmäher`
- `smart.lastCommandObj` 包含一个 JSON 字符串，可以解析为一个包含以下信息的对象
- `words` 数组包含接收到的单词。
- `intent` 包含查询类型。目前可能的值为：
- v1 技能：`askDevice`、`controlDevice`、`actionStart`、`actionEnd`、`askWhen`、`askWhere`、`askWho`
- v2 技能：当捕获到完整文本时使用 `queryIntent`，当仅捕获到部分文本时使用 `controlDevice` 作为备选方案
- `deviceId` 包含一个设备 ID，用于标识请求发送到的设备，由亚马逊提供；如果未提供，则该 ID 为空字符串。
- `deviceRoom` 包含一个映射的房间标识符，您可以在 IoT 管理 UI 中为收集到的设备 ID 进行配置。
- `sessionId` 包含技能会话的会话 ID，如果发出多个命令，则该 ID 应相同，由亚马逊提供；如果未提供，则该 ID 为空字符串。
- `userId` 包含设备所有者（或之后与该技能交互的用户）的用户 ID，由亚马逊提供；如果未提供，则为空字符串。
- `userName` 包含一个映射的用户名，您可以在 IoT 管理界面中为收集到的用户 ID 进行配置。

有关如何检测词语以及 Alexa 自定义技能区分哪些类型的查询的更多详细信息，请查看 https://forum.iobroker.net/viewtopic.php?f=37&t=17452 。

**通过 smart.lastResponse 状态返回结果**

响应需要在 `smart.lastResponse` 状态下于 200 毫秒内发送，可以是简单的文本字符串或 JSON 对象。

如果是文本字符串，则该文本将作为响应发送给技能。

如果是 JSON 对象，则可以使用以下键：

- `responseText` 需要包含要返回给亚马逊的文本
- `shouldEndSession` 是一个布尔值，用于控制在语音输入后是否关闭会话，或者保持打开状态以接受另一个语音输入。
- `sessionId` 需要包含响应所针对的会话 ID。理想情况下，应提供此 ID 以支持并发会话。如果未提供，则默认指向第一个期望收到响应的会话。

**通过消息将结果返回给物联网实例**

物联网实例还会接收名为“alexaCustomResponse”的消息，该消息包含键“response”，并且该对象可以包含如上所述的键`responseText`、`shouldEndSession`和`sessionId`。

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
如果您使用私有技能/操作/навык 与 `Alexa/Google Home/Алиса` 进行通信，则您可以使用 IoT 实例来处理来自它的请求。

例如，对于 `yandex alice`：

```js
const OBJECT_FROM_ALISA_SERVICE = {}; // object from alisa service or empty object
OBJECT_FROM_ALISA_SERVICE.alisa = '/path/v1.0/user/devices'; // called URL, 'path' could be any text, but it must be there
sendTo('iot.0', 'private', { type: 'alisa', request: OBJECT_FROM_ALISA_SERVICE }, response => {
    // Send this response back to alisa service
    console.log(JSON.stringify(response));
});
```

支持以下类型：

- `alexa` - 使用 Amazon Alexa 或 Amazon 自定义技能
- `ghome` - 通过 Google Home 使用 Google Actions 进行操作
- “alisa” - 与 Yandex Алиса 合作
- `ifttt` - 功能类似于 IFTTT（实际上并非必需，但用于测试目的）

## Yandex Алиса
[指示](doc/alisa.md)

## 向应用发送消息
从 1.15.x 版本开始，您可以向 `ioBroker Visu` 应用程序 ([Android](https://play.google.com/store/apps/details?id=com.iobroker.visu) 和 iOS](https://apps.apple.com/de/app/iobroker-visu/id1673095774)) 发送消息。

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
- 智能名称必须比组名称具有更高的优先级
- 设备应按智能名称分组

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### **WORK IN PROGRESS**
- (@GermanBluefox) Showed last controller ID in `smart.lastObjectID`
- (@GermanBluefox) Showed subscription valid period in `info.validTill` and GUI
- (@Copilot) Implemented increasing reconnect intervall

### 5.0.7 (2025-11-03)
- (@GermanBluefox) Added possibility to group devices by type in GUI
- (@GermanBluefox) Allowed to select any type in Alexe V3
- (@GermanBluefox) Remove disabled states from auto-detection

### 5.0.6 (2025-11-01)
- (@GermanBluefox) Added logs to detect the issues with detection
- (@GermanBluefox) Added possibility to use the 0/1 state as socket
- (@GermanBluefox) Added dialog to bulk manage the smart names of one device

### 5.0.5 (2025-10-31)
- (@GermanBluefox) Changed behavior of HUE lamps

### 5.0.2 (2025-10-30)
- (@GermanBluefox) Added mireds<->kelvin conversion for color temperature
- (@GermanBluefox) It is possible to edit a type
- (@GermanBluefox) Correcting creation of complex groups
- (@GermanBluefox) Same as 4.2.11

### 4.2.9 (2025-10-28)
- (@GermanBluefox) Do not control "white" by RGBW devices
- (@GermanBluefox) Corrected GUI error
- (@GermanBluefox) Avoid double entries in auto-detection

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