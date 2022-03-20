---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.text2command/README.md
title: ioBroker.text2command
hash: HjxcicBThtHHwhyfzr6p95FmkFztTHJhPTshaNBN52I=
---
![商标](../../../en/adapterref/iobroker.text2command/admin/text2command.png)

![安装数量](http://iobroker.live/badges/text2command-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.text2command.svg)
![下载](https://img.shields.io/npm/dm/iobroker.text2command.svg)
![测试](https://travis-ci.org/ioBroker/ioBroker.text2command.svg?branch=master)
![新PM](https://nodei.co/npm/iobroker.text2command.png?downloads=true)

# IoBroker.text2command
＃＃ 描述
此适配器可以将普通句子（如 `Switch light in kitchen on`）转换为特定命令，并将状态 `adapter.0.device.kitchenLight` 设置为 `true`。

独立激活此适配器毫无意义。它应该与电报或 Android 应用程序等其他适配器一起使用**`iobroker.vis`**。

＃＃ 用法
要执行命令，请用句子写状态 **`text2command.<INSTANCE>.text`**。你总会在`text2command.<INSTANCE>.response`中得到答案。

如果你定义了**Answer to ID**，答案也会写在这个ID中。这需要例如实现语音确认。

您可以通过 `sendTo` 从 javascript 发送消息。答案将在回复的消息中出现：

```
sendTo('text2command', 'Switch light in kitchen on', function (err, response) {
    console.log('Response is: ' + response);
});
```

可以使用正则表达式，例如：`/^light\son|^lamp\son/`。正则表达式始终不区分大小写。

要使用“按功能打开/关闭”，您应该注意功能。

关键字的作用如下：

- 关键字按空格分隔
- 所有关键字必须出现在句子中才能触发规则：例如关键字：`light on` 会在 `switch light on`、`make light on all` 时触发，而不是在 `switch on`、`make light` 时触发。
- 一个关键字可以有多种形式。关键字的变体必须用“/”分隔。例如。关键字：`switch/make/do light on/true` 将触发：`do light true`，`make please light on`。
- 如果关键字可以在很多情况下出现（名词、gen、宾格、复数，...），它们都必须作为变体列出，例如：`switch light/lights on`。

以下函数将被解释为

`enum.functions`：

**`enum.functions.light`**（Licht | Свет）：

- 角色 - `level.dimmer`
- 角色 - `switch.light`

**`enum.functions.backlight`**（Beleuchtung | Подсветка）：

- 角色 - `level.backlight`
- 角色 - `switch.backlight`

**`enum.functions.blinds/shutter`** (Rollladen | Жалюзи/окна)

- 角色 - `level.blind`
- 角色 - `switch.blind`

**`enum.functions.curtain`** (Vorhänge | Шторы)

- 角色 - `level.curtain`
- 角色 - `switch.curtain`

**`enum.functions.heating`**（黑宗 | Отопление/Подогрев）

- 角色 - `level.temperature`
- 角色 - `switch.temperature`

**`enum.functions.music`**（音乐 | Музыка）

- 角色 - `button.play`
- 角色 - `button.stop` / `button.pause`

**`enum.functions.alarm/security`**（警报/警报|Охрана）

- 角色 - `switch.security`

**`enum.functions.lock`** (Schloß / Schloss | Замок)

- 角色 - `switch.open`
- 角色 - `switch.lock`

支持以下房间：

|短语中的关键词|可能的 enum.rooms 英文 |用德语| 高分辨率照片| CLIPARTO俄语| 高分辨率照片| CLIPARTO |
|-----------------------|---------------------------------|--------------------------|------------------|
|无处不在|无处不在| - | - |
|生活 |客厅|沃齐默|标题 |
|卧室 |卧室/卧室 |施拉夫齐默| спальня |
|浴| 高分辨率照片| CLIPARTO浴室/浴缸 | badezimmer/坏 | ♀️ |
|工作/办公室 |办公室 | arbeitszimmer | кабинет |
|儿童/儿童/托儿所|托儿所|幼儿园 | детская |
|客房卫生间/客人壁橱| 高分辨率照片| CLIPARTO来宾wc |餐厅 | гостевой туалет |
|厕所/壁橱 |厕所 |厕所 |回复 |
|地板/进入 |地板 | diele/gang/flur | коридор/прихожая |
|厨房| 高分辨率照片| CLIPARTO厨房| 高分辨率照片| CLIPARTO库切/库切 | кухня |
|阳台/露台/天井|露台| 高分辨率照片| CLIPARTO巴尔孔/露台| 高分辨率照片| CLIPARTO терраса/балкон |
|餐饮 |餐厅|埃斯齐默|摄影 |
|车库|车库|车库|游戏 |
|楼梯 |楼梯| 高分辨率照片| CLIPARTO特雷普/特雷彭豪斯 | лестница |
|花园| 高分辨率照片| CLIPARTO花园| 高分辨率照片| CLIPARTO花园 |追问 |
|庭院/庭院|法庭 |霍夫 | двор |
|客房|客房|加斯特兹默| гостевая |
|阁楼|阁楼|讲话 | кладовка |
|屋顶| 高分辨率照片| CLIPARTO屋顶| 高分辨率照片| CLIPARTO达赫斯图尔 | крыша |
|终端 |终端 |附属设施 |西西 |
|洗手间|洗手间|瓦施拉姆 | прачечная |
|热室|暖房|加热室/heizungsraum | 家企业котельная |
|小屋 |小屋 | schuppen/scheune |话音 |
|避暑别墅| 高分辨率照片| CLIPARTO避暑别墅| 高分辨率照片| CLIPARTO园艺 |回复 |

您可以在确认中使用模式：

- `%s`: 值
- `%u`: 单位
- `%n`: 名称（计划中！）
- `{objectId}`：这个objectID的状态会放在这里

支持以下命令：

＃＃＃ 现在是几奌？
答案：14:56（当前时间）

＃＃＃ 你叫什么名字？
答案是可定制的。默认值：`My name is Alpha`

###室外温度是多少？
用户必须指定状态 ID，读取外部温度的位置。
答案是可定制的。默认值：`Outside temperature is %s %u` **`%s`** 将被温度替换，四舍五入为整数。 **`%u`** 将被此状态的单位或系统温度单位取代。

### 内部温度是多少？
用户必须指定状态 ID，读取内部温度的位置。
答案是可定制的。默认值：`Inside temperature is %s %u` **`%s`** 将被温度替换，四舍五入为整数。 **`%u`** 将被此状态的单位或系统温度单位取代。

### 按功能开启/关闭
此命令从枚举中读取信息。它使用 **enum.functions** 来查找设备类型（例如灯光、警报、音乐），并使用 **`enum.rooms`** 来检测房间名称。

德语示例：![枚举](../../../en/adapterref/iobroker.text2command/img/enums.png)

要打开的关键字是：*打开*，例如`switch rear light in bath on`

要关闭的关键字是：*关闭*，例如`switch light in living room off`

如果需要，将自动生成答案：`Switch off %function% in %room%`，其中 `%function%` 和 `%room%` 将替换为找到的设备类型和位置。

命令也接受数值。它具有优先级，例如在命令`switch light off in living room on 15%`中，灯光将设置为 15%，而不是处于 *off* 状态。

您可以在 [] 中定义默认房间。例如。 `switch the light on[sleepingroom]`

### 打开/关闭百叶窗
此命令从枚举中读取信息。它使用 **`enum.functions.blind`** 来查找类型百叶窗或百叶窗，并使用 **`enum.rooms`** 来检测房间名称。

上移百叶窗的关键字是：*blinds up*，例如`set blinds up in sleeping room`

下移百叶窗的关键字是：*blinds down*，例如`move blinds down in office`

您可以指定百分数的确切位置，例如`move blinds to 40 percent in office`

如果需要，将自动生成答案：` in %room%`，其中 %room% 将替换为找到的设备类型和位置。

### 打开/关闭某些东西
用户必须指定必须控制的设备状态ID和必须写入的值。

您应该为每个位置创建规则（例如，为 `on` 和 `off`）。

答案是可定制的。默认值：`Switched on`

例如。：

- `停用警报`，对象 ID：`hm-rpc.0.alarm`，值：`false`，答案：`警报已停用/停用`。在这种情况下，答案将在 *Alarm is deactivated* 和 *Deactivated* 之间随机分配。
- `激活警报`，对象 ID：`hm-rpc.0.alarm`，值：`true`，答案：`警报已激活/已激活/已完成`。在这种情况下，答案将在 *Alarm isactivated*、*Activated* 和 *Done* 之间随机分配。

*Deactivate* 必须在列表的第一位，因为它更长。

您可以在控制命令中使用浮点值。如果文本中有一些数值，它将被用作控制值，并且预定义的值将被忽略。

例如。对于规则：

- `设置光照级别`，对象 ID：`hm-rpc.0.light.STATE`，值：`10`，答案：`级别设置为 %s%`。

如果命令类似于 `Set light level to 50%`，则在 `hm-rpc.0.light.STATE` 中将写入 50，而答案将是 `Level set to 50%`。

如果命令类似于 `Set light level`，则在 `hm-rpc.0.light.STATE` 中将写入 10，而答案将是 `Level set to 10%`。

### 询问一些事情
用户必须指定设备的状态 ID，该值将被读取。
该模板将回答来自某个州的信息。

例如。：

- `打开的窗口`，对象 ID：`javascript.0.countOpenedWindows`，确认：`实际打开的 %s 个窗口`
- `温度卧室`，对象 ID：`hm-rpc.0.sleepingRoomSensor.TEMPERATURE`，确认：`卧室的实际温度是 %s %u/%s %u`。在这种情况下，答案将在*卧室的实际温度为 %s %u* 和 *%s %u* 之间随机分配。

### 发送文本到状态
您可以将一些文本写入状态。用户必须指定状态 ID 才能将文本写入其中。

例如。规则：`email [to] wife`，对象 ID：`javascript.0.emailToWife`，确认：`Email sent`文本：`Send email to my wife: I will be late`。适配器从关键字中查找最后一个单词（在本例中为 `wife`），从下一个单词中提取文本（在本例中为 `I will be late`）并将该文本写入 `javascript.0.emailToWife`。
`to` 不需要触发规则，但会从文本中删除。

###你很好（只是为了好玩）
答案是可定制的。默认值：`Thank you`或`You are welcome`

###谢谢（只是为了好玩）
答案是可定制的。默认值：`No problem`或`You are welcome`

### 创建答案
您可以在确认中使用绑定 {objectId} 生成答案。用于alexa。

例如。：

- `windows 打开`，确认：`实际 {javascript.0.countOpenedWindows} 个窗口打开`
- `温度卧室`，确认：`卧室的实际温度是{t：hm-rpc.0.sleepingRoomSensor.TEMPERATURE; Math.round(t)}/{hm-rpc.0.sleepingRoomSensor.TEMPERATURE;轮（1）}度`。在这种情况下，答案将在*卧室的实际温度为 <VALUE>* 和 *<VALUE>* 之间随机分配。

您可以在此处阅读有关绑定的更多信息：（对象绑定）[https://github.com/ioBroker/ioBroker.vis#bindings-of-objects]

另外，您可以通过 `{hm-rpc.0.light.STATE.lc;dateinterval}`（2 分 12 秒）或 `{hm-rpc.0.light.STATE.lc;dateinterval(true)}`（2 分 12 秒**前**）获得到现在为止的时间

## 使用 javascript 的外部规则
可以使用 javascript 引擎来处理 text2command 中的命令。
为此，您必须在“处理器状态 ID”（高级设置）中指定某些状态，并在某些 JS 或 Blockly 脚本中监听此状态。
您可以在管理员或脚本中手动创建一些状态。处理脚本可能如下所示：

```
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

在 text2command **Processor state ID** 的设置中设置为 *`javascript.0.textProcessor`* 以让此示例正常工作。

首先，该命令将使用您的 javascript 进行处理，如果 javascript 将使用 '' 回答或在预定义的时间（默认为 1 秒）内不回答，则该命令将按规则处理。

### 选项：通过每个命令写入响应
如果被每个命令激活（无论请求是通过 state 还是 sendTo 来的），`text2command.X.response` 将被写入答案。

＃ 去做
- 在俄罗斯男性和女性的答案。

<!-- 下一个版本的占位符（在行首）：

### __工作进行中__ -->

## Changelog
### 2.2.1 (2022-02-21)
* (bluefox) Checked the existence of sayit instance before output
* (bluefox) Added the decimal places settings to temperature  
* (bluefox) Added the second object ID to user queries
* (bluefox) Added the option: "No negative answer"

### 2.1.6 (2022-02-16)
* (bluefox) Corrected GUI

### 2.1.4 (2022-02-16)
* (bluefox) Some errors will be caught at start

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

Copyright (c) 2014-2022, bluefox <dogafox@gmail.com>

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