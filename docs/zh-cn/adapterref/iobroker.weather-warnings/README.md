---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.weather-warnings/README.md
title: ioBroker. 天气警告
hash: yiZeOXwKOfzs7/rjUOm2Cyz3R8WAocXlTrleWj6ikV4=
---
![标识](../../../en/adapterref/iobroker.weather-warnings/admin/weather-warnings.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.weather-warnings.svg)
![下载](https://img.shields.io/npm/dm/iobroker.weather-warnings.svg)
![安装数量](https://iobroker.live/badges/weather-warnings-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/weather-warnings-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.weather-warnings.png?downloads=true)
![贝宝捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)

# IoBroker.天气警告
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/weather-warnings/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**测试：** [![测试和发布](https://github.com/ticaki/ioBroker.weather-warnings/actions/workflows/test-and-release.yml/badge.svg?event=push)](https://github.com/ticaki/ioBroker.weather-warnings/actions/workflows/test-and-release.yml)

## IoBroker 的天气警告适配器
[德语自述文件](https://github.com/ticaki/ioBroker.weather-warnings/blob/main/README_DE.md)

**仍在开发中**，因此还没有好的示例模板，电子邮件也尚未准备好。如果您有任何愿望，只需提出功能请求即可。

该适配器访问不同天气服务的天气警报并将其输出为文本或语音消息。此外，它还创建按类型分组的状态，可用于对当前警告做出反应。

提供商：

- 深度WD
- ZAMG（奥地利）
- 乌兹别克斯坦

推送服务

- 电报
- Whatsapp
- 推倒
- 电子邮件
- 亚历克斯
- 萨伊特

＃＃ 安装
安装后，配置站点将自动打开，并且需要**重新加载**。这将以设置的语言显示模板。

＃＃ 配置
![基本配置](../../../en/adapterref/iobroker.weather-warnings/img/basic.png)

- **激活DWD/UWZ/ZAMG：**激活这些服务提供商的数据检索。
- **激活电报/推送，...：**激活到这些已安装适配器的消息输出。
- **激活电子邮件：** 在电子邮件中写入所有当前警告。
- **激活历史记录：** 将历史记录（最多可容纳 500 个条目）写入状态：.history。所有数据或选定的数据。
- **激活 json-array：** 非常特别，将当前警告放入数组中，或者 - 激活后 - 将用户特定的 Json 放入数组中，可供脚本使用。

- **更新间隔：** 数据检索的间隔（以分钟为单位）（最小：5）

- **传入警告...：** 启动适配器后，第一次数据检索的警告将被视为已知，并且不会触发通知。

- **专家**：激活其他可选设置

- **测试-激活...：** 使用测试数据。适配器离线。

- **测试 - 原始数据历史记录：** 用于调试，仅根据要求。

![模板](../../../en/adapterref/iobroker.weather-warnings/img/template.png)

您可以在此处创建自己的消息或编辑现有消息。所有可用的“标记”及其含义均显示在表格下方。推送通知服务使用唯一标识符来确定哪种模板用于哪种类型的通知。

添加或删除模板后保存并关闭。

具有特殊含义的标志：

- `${}` 包含被生成的信息替换的标记。模板标识符也可以在这里使用。
- 服务不提供以“_”开头的模板标识符。
- `${[0,1,2,3,4]token}` 一个带有值的字符串，token 必须是数字 token。该索引与示例中所示的相同。 0 是列表中的第一个值。
- `${(value=token)result1#result2}` 或 `${(value=token)result1}` 与 JavaScript 命令相同：`if (value == token) result1 else result2` 可能的比较：` = < > != `
- 对于 Jsons 模板，右括号“}”必须以这种方式编写“\}”
- 请参阅适配器中的示例
- 或者也可以：`${[0,🟢,🟡,🟠,🔴]warnlevelnumber}`

**恢复模板：** 将模板重置回当前系统语言。现有模板将**丢失**。然后保存并关闭。应在更改系统语言后使用。

![深度WD](../../../en/adapterref/iobroker.weather-warnings/img/DWD.png)

**DWD：** 从 10000 个地点的列表中选择，输入后单击另一个选项卡然后返回，列表太大，必须更新。

**UWZ：** 使用国家标识符 DE AT（其他可能的，必须进行测试）和邮政编码的条目，例如 DE12345

**ZAMG：** 仅适用于奥地利。输入奥地利境内的坐标。

**地名：**用户特定的地名，可用于警告（与多个警告单元一起使用）

**筛选：**

- 过滤原始数据：在每次后续处理之前过滤掉 X 小时内的所有内容。
- 类型：丢弃该类型的所有内容。
- 级别：低于该级别的所有内容都将被丢弃。

![电报](../../../en/adapterref/iobroker.weather-warnings/img/telegram.png) **适配器：** 如果激活此选项并且存在适配器字段，则必须选择有效的选项。日志中的错误消息表明缺少设置。

**激活...:** 通过此服务发送此提供商的警告。

**过滤器：** 1) 忽略此类型的警告 2) 忽略同等或更低级别的警告

**消息：**使用以下模板： 第 1 列：1) 新警告或现有警告 2) 警告已删除，并且存在 **其他** 活动警告。
3) 警告已被删除，并且**没有其他**活动警告。

第 2 列：1) 手动触发的通知 2) 用于无警告 1.3

3) 的模板不能包含 `${}` 令牌。

**特殊功能**

**电子邮件：** 标头放在邮件之前，然后是 1,2 或 3 + 换行符，然后是页脚。电子邮件以 html 格式发送，因此您可以添加任何您喜欢的 htmp 标签。 （其他功能正在开发中，尚未准备就绪）

**alexa：** 另外，必须选择一台或多台设备。音量仅在语音消息时发生变化，之后应重置为默认值。每个警告的消息大小限制为 250 个字符。可以发出声音，激活专家以显示选项。

**标题、页眉、页脚** 只有 ${status} 在这里起作用。其他令牌包含随机值或没有值。

## 一般行为
- 不应为同一件事发送重复的消息。 DWD对此非常讲究。
- 如果选择“none”作为模板，则不会发送任何通知。
- .alerts 中的状态包含开始、结束、警告类型、当前活动和标题的数组，按警告类型分组。每组显示一个警告，按以下条件过滤：

  1) 警告**现在**处于活动状态（级别最高的警告）。

## 图标
创建者：[阿德里·安西亚](https://www.youtube.com/channel/UChLOv1L-ftAFc2ZizdEAKgw?view_as=subscriber)

变化：原版为蓝色，其他颜色为原版的变化。

许可证：[CC BY 4.0 法律法规](https://creativecommons.org/licenses/by/4.0/legalcode)

图标页面：https://icon-icons.com/de/symbol/Wetter-wind-cloud-Blitz-Regen/189105

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.4.8 (2023-10-30)
* (ticaki) Wrong level assignment for zamg fixed
* (ticaki) better set defaults

### 0.4.7 (2023-10-29)
* (ticaki) improved admin ui
* (ticaki) improved formatedKeys for vis

### 0.4.6 (2023-10-28)
* (ticaki) fix startup crash

### 0.4.5 (2023-10-28)
* (ticaki) Quiet times with profile & control states
* (ticaki) Fixed: Jumping of the data tree
* (ticaki) Bugfixing

### 0.4.4 (2023-10-25)
* (ticaki) Added Say-It
* (ticaki) User-definable icons (path)
* (ticaki) Email works, Added title for pushover and email

### 0.4.2 (2023-10-24)
* (ticaki) optimise german 22. & 28. for alexa.
* (ticaki) Quiet times for voice notifications.
* (ticaki) bugfix: now the English translation is loaded. Alexa uses the correct day of the week with DWD heading.

### 0.4.1 (2023-10-22)
* (ticaki) update german translation for alexa

### 0.4.0 (2023-10-22)
* (ticaki) Welcome to latest.
* (ticaki) zamg date convert for alexa

### 0.3.7 (2023-10-21)
* (ticaki) Alexa Sounds for warntypes
* (ticaki) more options for pushover, telegram, alexa, email html
* (ticaki) Usable urls for icons
* (ticaki) fixed error in type filter

### 0.3.6 (2023-10-20)
* (ticaki) added: icons

### 0.3.5 (2023-10-16)
* (ticaki) added: Data points for manually triggering notifications.

### 0.3.4 (2023-10-14)
* (ticaki) add translation to common.name

### 0.3.3 (2023-10-13)
* (ticaki) fixed: repeat message dwd
* (ticaki) small bugfixes

### 0.3.2 (2023-10-10)
* add alexa volumen

### 0.3.1 (2023-10-10)
* (ticaki) added alexa

### 0.3.0 (2023-10-03)
* (ticaki) added multiple warncell
* added option to remove channels
* fixed alot bugs

### 0.2.6-alpha.0 (2023-10-02)
* (ticaki) added email, json, history
* add more template key
* add mulitple dwd warncells
* fixed alot bugs

### 0.2.5-alpha.0 (2023-09-30)
* (ticaki) added telegram, whatsapp, pushover
* added remove all
* added json/array output for all current warnings.

### 0.2.4-alpha.0 (2023-09-29)
* (ticaki) add alerts

### 0.2.3-alpha.0 (2023-09-28)
* (ticaki) more translations
* filter warn type, generic warntypes
* more prebuild tests

### 0.2.2-alpha1.0 (2023-09-26)
* (ticaki) more CustomTokens,
* translations for warntypes, warnlevelcolor,
* total active warningcountshttps://github.com/ticaki/ioBroker.weather-warnings
* remove old warnings

### 0.2.1-alpha.0 (2023-09-25)
* (ticaki) initial release

## License
MIT License

Copyright (c) 2023 ticaki <github@renopoint.de>

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