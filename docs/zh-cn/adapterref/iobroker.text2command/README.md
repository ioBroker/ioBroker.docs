---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.text2command/README.md
title: ioBroker.text2command
hash: l9vN/k83Zfh9akKokc1tcMMOrclUQ+qlFqKE//sCtFY=
---
![标识](../../../en/adapterref/iobroker.text2command/admin/text2command.png)

![安装数量](http://iobroker.live/badges/text2command-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.text2command.svg)
![下载](https://img.shields.io/npm/dm/iobroker.text2command.svg)
![测试](https://travis-ci.org/ioBroker/ioBroker.text2command.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.text2command.png?downloads=true)

# IoBroker.text2command
＃＃ 描述
此适配器可以将普通句子（如`Switch light in kitchen on`）转换为特定命令，并将状态`adapter.0.device.kitchenLight`设置为`true`。

单独激活此适配器没有意义。它应该与其他适配器一起使用，例如 Telegram 或 Android 应用 **`iobroker.vis`**。

＃＃ 用法
要执行命令，请将状态 **`text2command.<INSTANCE>.text`** 与句子一起写入。您始终会在 `text2command.<INSTANCE>.response` 中获得答案。

如果您定义了“答案对应 ID”，则答案也会写入此 ID 中。例如，这对于实现语音确认是必需的。

您可以从 `javascript` 向 `sendTo` 发送消息。回复消息将以消息的形式返回：

```js
sendTo('text2command', 'Switch light in kitchen on', function (err, response) {
    console.log('Response is: ' + response);
});
```

可以使用正则表达式，例如：`/^light\son|^lamp\son/`。正则表达式始终不区分大小写。

要使用“按功能开关”功能，您应该注意函数的设置。

关键词的工作原理如下：

空格分隔关键词
- 所有关键词必须出现在句子中才能触发规则：例如，关键词“light on”会在“switch light on”、“make light on everywhere”时触发，而不会在“switch on”、“make light”时触发。
- 一个关键词可以有多种形式。关键词的不同形式之间必须用“/”分隔。例如，关键词：`switch/make/do light on/true` 将触发：`do light true`、`make please light on`。
- 如果关键词可以出现在多种情况中（主格、属格、宾格、复数……），则它们都必须作为变体列出，例如：`switch light/lights on`。

以下函数将被解释为

`enum.functions`:

**`enum.functions.light`**（光 | Свет）：

- 角色 - `level.dimmer`
- 角色 - `switch.light`

**`enum.functions.backlight`**（Beleuchtung | Подсветка）：

- 角色 - `level.backlight`
- 角色 - `switch.backlight`

**`enum.functions.blinds/shutter`**（罗拉登 | Жалюзи/окна）

- 角色 - `level.blind`
- 角色 - `switch.blind`

**`enum.functions.curtain`** (Vorhänge | Шторы)

- 角色 - `level.curtain`
- 角色 - `switch.curtain`

**`enum.functions.heating`**（Heizung | Отопление/Подогрев）

- 角色 - `level.temperature`
- 角色 - `switch.temperature`

**`enum.functions.music`**（音乐 | Музыка）

- 角色 - `button.play`
- 角色 - `button.stop` / `button.pause`

**`enum.functions.alarm/security`**（警报/警报 | Охрана）

- 角色 - `switch.security`

**`enum.functions.lock`**（城堡 / 城堡 | Замок）

- 角色 - `switch.open`
- 角色 - `switch.lock`

支持以下房型：

| 短语中的关键词 | 可能的枚举房间（英文） | （德文） | （俄文） |
|-----------------------|---------------------------------|--------------------------|-------------------|
| 到处 | 到处 | - | - |
|生活 |客厅|沃齐默 | зал |
|卧室|卧室/卧室 |施拉夫齐默 | спальня |
|沐浴 |浴室/浴缸 |巴德兹梅尔/坏| ванная |
|工作/办公室 |办公室 |劳动者 | кабинет |
|儿童/儿童/托儿所|苗圃|幼儿园 |德特斯卡亚 |
|宾客卫生间/宾客衣柜|访客中心 |旅馆 | гостевой туалет |
|厕所/衣柜|厕所 |厕所 | туалет |
|楼层/进入 |地板|迪埃勒/帮/弗尔 | коридор/прихожая |
|厨房|厨房|库切/库切 | кухня |
|阳台/露台/庭院 |露台 |巴尔孔/露台 | терраса/балкон |
|餐饮 |餐厅|埃斯齐默 | столовая | 中文 |
|车库 |车库 |车库 |格拉 |
|楼梯|楼梯|特雷佩/特雷彭豪斯| лестница |
|花园 |花园 |花园 |加拿大 |
|庭院/庭院 |法庭|霍夫| двор |
|客房 |客房 |美食 |旅行 |
|阁楼|阁楼|斯派克 | кладовка |
| 屋顶 | 屋顶 | dachstuhl | крыша |
|终端|终端|合并空间 |搜索 |
|洗手间|洗手间|沃施拉姆 | прачечная |
|加热室|加热室 |供暖室/heizungsraum | котельная |
|小屋|小屋|舒彭/舍讷 |加拿大 |
|避暑别墅|凉亭 |花园屋 | теплица |

您可以在致谢中使用模式：

- `%s`：值
- `%u`：单位
- `%n`: 名称（暂定！）
- `{objectId}`：此 objectID 的状态将放置在此处。实际上，它支持的绑定与 [iobroker.vis](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects) 相同，但特殊绑定除外。

支持以下命令：

＃＃＃ 现在是几奌？
答案：14:56（当前时间）

＃＃＃ 你叫什么名字？
答案可自定义。默认值：`My name is Alpha`

### 室外温度是多少？
用户必须指定要读取室外温度的州 ID。

答案可自定义。默认值：`Outside temperature is %s %u` **`%s`** 将被替换为四舍五入到整数的温度值。**`%u`** 将被替换为该州的单位或系统温度单位。

### 室内温度是多少？
用户必须指定要读取内部温度的州 ID。

答案可自定义。默认值：`Inside temperature is %s %u` **`%s`** 将被替换为四舍五入到整数的温度值。**`%u`** 将被替换为该州的单位或系统温度单位。

### 按功能开关
此命令从枚举中读取信息。它使用 `enum.functions` 查找设备类型（例如，灯、警报器、音乐），并使用 `enum.rooms` 检测房间名称。

德语示例：![枚举](../../../en/adapterref/iobroker.text2command/img/enums.png)

要启用的关键字是：*启用*，例如 `switch rear light in bath on`

要关闭的关键词是：*关闭*，例如 `switch light in living room off`

如果需要，答案将自动生成：`Switch off %function% in %room%`，其中`%function%`和`%room%`将被找到的设备类型和位置替换。

该命令也接受数值输入。数值输入具有优先级，例如，在命令 `switch light off in living room on 15%` 中，灯光亮度将设置为 15%，而不是处于 *关闭* 状态。

您可以在 [] 中定义默认房间。例如：`switch the light on[sleepingroom]`

### 打开/关闭百叶窗
此命令从枚举中读取信息。它使用 **`enum.functions.blind`** 查找百叶窗或卷帘类型，使用 **`enum.rooms`** 检测房间名称。

将百叶窗向上移动的关键词是：*blinds up*，例如 `set blinds up in sleeping room`

将百叶窗放下的关键词是：*blinds down*，例如 `move blinds down in office`

您可以以百分比形式指定盲区的确切位置，例如 `move blinds to 40 percent in office`

如果需要，答案将自动生成：` in %room%`，其中 %room% 将被找到的设备类型和位置替换。

### 打开/关闭某个设备
用户必须指定要控制的设备的状态 ID 和要写入的值。

你应该为每个位置创建规则（例如，对于 `on` 和对于 `off`）。

答案可自定义。默认值：`Switched on`

例如。：

- `停用警报`，对象 ID：`hm-rpc.0.alarm`，值：`false`，答案：`警报已停用/已停用`。在这种情况下，答案将在“警报已停用”和“已停用”之间随机选择。
- `激活警报`，对象 ID：`hm-rpc.0.alarm`，值：`true`，答案：`警报已激活/已激活/已完成`。在这种情况下，答案将在*警报已激活*、*已激活*和*已完成*之间随机选择。

由于“停用”选项较长，因此必须将其放在列表首位。

您可以在控制命令中使用浮点值。如果文本中包含数值，则该数值将用作控制值，而预定义的值将被忽略。

例如，对于规则：

- `设置光照级别`，对象 ID：`hm-rpc.0.light.STATE`，值：`10`，答案：`级别设置为 %s%`。

如果命令类似于 `Set light level to 50%`，则在 `hm-rpc.0.light.STATE` 中写入 50，答案将是 `Level set to 50%`。

如果命令类似于 `Set light level`，那么在 `hm-rpc.0.light.STATE` 中将写入 10，答案将是 `Level set to 10%`。

### 询问一些事情
用户必须指定设备的状态 ID，系统将读取该 ID 的值。

此模板将返回来自某个状态的信息。

例如。：

- `窗口已打开`，对象 ID：`javascript.0.countOpenedWindows`，确认：`实际已打开 %s 个窗口`
- `卧室温度`，对象 ID：`hm-rpc.0.sleepingRoomSensor.TEMPERATURE`，确认信息：`卧室实际温度为 %s %u/%s %u`。在这种情况下，答案将在 *卧室实际温度为 %s %u* 和 *%s %u* 之间随机选择。

### 向州发送短信
您可以向状态中写入一些文本。用户必须指定状态 ID 才能向其中写入文本。

例如：规则：`email [to] wife`，对象 ID：`javascript.0.emailToWife`，确认：`Email sent`，文本：`Send email to my wife: I will be late`。适配器会查找关键字中的最后一个词（在本例中为 `wife`），提取下一个词（在本例中为 `I will be late`）的文本，并将该文本写入 `javascript.0.emailToWife`。

单词 `to` 不是触发规则的必要条件，但会被从文本中移除。

### 你很棒（仅供参考）
答案可自定义。默认值：`Thank you` 或 `You are welcome`

### 谢谢（纯属娱乐）
答案可自定义。默认值：`No problem` 或 `You are welcome`

### 创建答案
您可以在确认信息中使用绑定参数 {objectId} 生成答案。用于 Alexa。

例如。：

- `窗口已打开`，确认：`实际已打开 {javascript.0.countOpenedWindows} 个窗口`
- `卧室温度`，确认信息：`卧室实际温度为 {t: hm-rpc.0.sleepingRoomSensor.TEMPERATURE; Math.round(t)}/{hm-rpc.0.sleepingRoomSensor.TEMPERATURE; round(1)} 度`。在这种情况下，答案将在 *卧室实际温度为 <VALUE>* 和 *<VALUE>* 之间随机生成。

您可以在这里阅读更多关于绑定的信息：（对象绑定）[https://github.com/ioBroker/ioBroker.vis#bindings-of-objects]

此外，您还可以通过 `{hm-rpc.0.light.STATE.lc;dateinterval}`（2 分 12 秒）或 `{hm-rpc.0.light.STATE.lc;dateinterval(true)}`（2 分 12 秒前）获取当前时间。

## 外部规则，包含 `javascript`
可以使用 `javascript` 引擎来处理 `text2command` 中的命令。

为此，您必须在“处理器状态 ID”（高级设置）中指定某个状态，并在某个 JS 或 Blockly 脚本中监听该状态。

您可以在管理后台或脚本中手动创建状态。处理脚本可以如下所示：

```js
createState("textProcessor", '', function () {
    // text2command writes the value with ack=false. Change "any" is important too, to process repeated commands.
    on({id: "javascript.0.textProcessor", ack: false, change: 'any'}, function (obj) {
         var task = JSON.parse(obj.state.val);
         // value looks like
         // {
         //     "command":      "text to process", // command that was received by text2command
         //     "language":     "en",              // language in command or system language
         //     "withLanguage": false              // indicator if language was defined in command (true) or used default language (false)
         // }
         // response to text2command with ack=true
         if (task.command === 'switch light on') {
            setState("hm-rpc.0.light", true);
            setState("javascript.0.textProcessor", 'light is on', true);
         } else {
            // let it process with predefined rules
            setState("javascript.0.textProcessor", '', true);
         }
    });
});
```

在 `text2command` **处理器状态 ID** 的设置中将其设置为 *`javascript.0.textProcessor`*，以使此示例能够正常工作。

首先，该命令将由您的 `javascript` 处理；如果 `javascript` 回答为“”或在预定义的时间（默认为 1 秒）内未回答，则该命令将按规则处理。

### 选项：每个命令都写入响应
如果每个命令都这样激活（无论请求是通过状态还是 sendTo 发送的），则 `text2command.X.response` 将随答案一起写入。

#待办事项
- 用俄语回答，男性和女性都有。

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### 4.0.0 (2025-11-03)
* (bluefox) GUI was updated to vite
* (bluefox) Minimal nodejs version is 20.x

### 3.0.3 (2023-12-18)
* (bluefox) Corrected GUI

### 3.0.2 (2023-02-27)
* (bluefox) Corrected link from admin

### 3.0.1 (2023-02-21)
* (bluefox) Corrected many GUI errors

### 2.3.1 (2023-02-03)
* (bluefox) Migrated GUI to v5

### 2.2.2 (2022-06-17)
* (Apollon77) Fix crash cases reported by Sentry

### 2.2.1 (2022-02-21)
* (bluefox) Checked the existence of `sayit` instance before output
* (bluefox) Added the decimal places settings to temperature  
* (bluefox) Added the second object ID to user queries
* (bluefox) Added the option: "No negative answer"

### 2.1.6 (2022-02-16)
* (bluefox) Corrected GUI

### 2.1.4 (2022-02-16)
* (bluefox) Some errors will be caught at the start

### 2.1.2 (2022-02-13)
* (bluefox) Updated GUI.
* (bluefox) Updated releaser

### 2.1.1 (2021-06-15)
* (PeterVoronov) Corrected usage of regex

### 2.1.0 (2021-05-24)
* (bluefox) Updated GUI.

### 2.0.7 (2020-12-12)
* (Apollon77) Prevent crash case (Sentry IOBROKER-TEXT2COMMAND-J)

### 2.0.6 (2020-12-03)
* (Apollon77) Prevent crash case (Sentry IOBROKER-TEXT2COMMAND-D, IOBROKER-TEXT2COMMAND-C)

### 2.0.5 (2020-09-5)
* (bluefox) Updated the select ID dialog.

### 2.0.3 (2020-07-14)
* (bluefox) Fixed GUI errors

### 2.0.2 (2020-07-13)
* (bluefox) Fixed GUI errors

### 2.0.1 (2020-07-08)
* (bluefox) Fixed select ID dialog

### 2.0.0 (2020-07-06)
* (bluefox) New GUI

### 1.3.1 (2019-07-18)
* (unltdnetworx) changed copyright year to 2019, according to issue #41
* (unltdnetworx) additional words for blinds and functions in english and german
* (unltdnetworx) fixed typo

### 1.3.0 (2019-07-18)
* (bluefox) Using the defined language by words

### 1.2.5 (2019-02-12)
* (unltdnetworx) description in german corrected
* (unltdnetworx) added percent to true/false rules

### 1.2.4 (2018-05-05)
* (Apollon77) Fix

### 1.2.3 (2018-05-01)
* (bluefox) Support of bindings in answer {objId}

### 1.2.0 (2018-04-23)
* (bluefox) Support of Admin3 (but not materialize style)

### 1.1.7 (2018-04-04)
* (bluefox) The parsing error was fixed

### 1.1.6 (2017-10-05)
* (bluefox) Check if units are undefined

### 1.1.5 (2017-08-14)
* (bluefox) Support of iobroker.pro

### 1.1.4 (2017-03-27)
* (bluefox) translations

### 1.1.3 (2016-08-30)
* (bluefox) russian translations

### 1.1.2 (2016-08-29)
* (bluefox) fix the russian temperature text
* (bluefox) extend rule "control device" with option 0/1
* (bluefox) use by control of devices min/max values if set

### 1.1.1 (2016-08-19)
* (bluefox) add additional info for external text processor

### 1.1.0 (2016-08-16)
* (bluefox) add text processor state ID

### 1.0.2 (2016-07-22)
* (bluefox) fix error with detection of numeric values

### 1.0.1 (2016-06-01)
* (bluefox) fix: send text command

### 1.0.0 (2016-05-05)
* (bluefox) replace special chars in input text: #'"$&/\!?.,;:(){}^

### 0.1.10 (2016-03-20)
* (bluefox) fix double pronunciation of some answers

### 0.1.9 (2016-03-20)
* (bluefox) ignore spaces

### 0.1.8 (2016-03-15)
* (bluefox) fix error with enums

### 0.1.7 (2016-03-12)
* (bluefox) implement "say something"

### 0.1.6 (2016-02-24)
* (bluefox) fix temperature

### 0.1.5 (2016-02-23)
* (bluefox) fix russian outputs

### 0.1.4 (2016-02-22)
* (bluefox) fix russian outputs

### 0.1.3 (2016-02-21)

* (bluefox) round temperature in answers

### 0.1.2 (2016-02-21)
* (bluefox) implement russian time

### 0.1.1 (2016-02-19)
* (bluefox) check invalid commands

### 0.1.0 (2016-02-19)
* (bluefox) fix problem with controlling of channels
* (bluefox) enable write JSON as argument

### 0.0.3 (2016-02-14)
* (bluefox) remove unused files

### 0.0.2 (2016-02-10)
* (bluefox) extend readme

### 0.0.1 (2016-02-09)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2014-2025, bluefox <dogafox@gmail.com>

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