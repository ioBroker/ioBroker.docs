---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.weather-warnings/README.md
title: ioBroker.天气预警
hash: kdUC0NdFxCviFkPyUpN+Ga8bx4lretJp0xQe+P0q2wU=
---
![标识](../../../en/adapterref/iobroker.weather-warnings/admin/weather-warnings.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.weather-warnings.svg)
![下载](https://img.shields.io/npm/dm/iobroker.weather-warnings.svg)
![安装数量](https://iobroker.live/badges/weather-warnings-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/weather-warnings-stable.svg)
![NPM](https://nodei.co/npm/iobroker.weather-warnings.png?downloads=true)
![PayPal捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)

# IoBroker.weather-warnings
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/weather-warnings/287x66-grey.png)](https://weblate.iobroker.net/projects/adapters/weather-warnings/)

**测试：** [![测试和发布](https://github.com/ticaki/ioBroker.weather-warnings/actions/workflows/test-and-release.yml/badge.svg?event=push)](https://github.com/ticaki/ioBroker.weather-warnings/actions/workflows/test-and-release.yml)

## IoBroker 的天气预警适配器
[德语自述文件 (meist aktueller)](https://github.com/ticaki/ioBroker.weather-warnings/blob/main/README_DE.md)

该适配器可访问不同气象服务的天气预警信息，并将其以文本或语音消息的形式输出。此外，它还会创建按类型分组的状态，这些状态可用于对当前预警做出响应。

提供商：

- DWD
- ZAMG（奥地利）
- UWZ

推送服务

- Telegram
- WhatsApp
容易被欺负
- 电子邮件
- Alexa
- Sayit

＃＃ 安装
最低 Node.js 版本要求：v22。安装完成后，配置页面将自动打开，需要**重新加载**。重新加载后，模板将显示为已设置的语言。

＃＃ 配置
![基本配置](../../../en/adapterref/iobroker.weather-warnings/img/basic.png)

- **激活 DWD/UWZ/ZAMG：**激活这些服务提供商的数据检索。
- **激活 telegram/pushover,...:** 激活向这些已安装的适配器输出消息。
- **启用电子邮件：**将所有当前警告写入电子邮件。
- **激活历史记录：** 将历史记录（最多可容纳 500 条记录）写入状态：.history。可以是所有数据或选定数据。
- **激活 json-array：** 非常特殊，可将当前警告放入数组中，或者 - 激活后 - 将用户指定的 Json 放入数组中，供脚本使用。

- **更新间隔：**数据检索的间隔时间（以分钟为单位）（最小值：5）

- **传入警告...:** 启动适配器后，首次数据检索的警告将被视为已知警告，不会触发通知。

- **专家模式**：激活其他可选设置

- **测试 - 激活...:** 使用测试数据。适配器已离线。

- **测试-原始数据历史记录：**仅用于调试，应要求提供。

![模板](../../../en/adapterref/iobroker.weather-warnings/img/template.png)

您可以在这里创建或编辑现有消息。所有可用的“令牌”及其含义都显示在表格下方。推送通知服务使用此唯一标识符来确定哪种类型的通知应使用哪个模板。

添加或删除模板后，请保存并关闭。

具有特殊含义的标志：

- `${}` 包含会被生成信息替换的标记。模板标识符也可在此处使用。
- 服务不提供以 `_` 开头的模板标识符。
- `${[0,1,2,3,4]token}` 一个包含值的字符串，token 必须是数字标记。索引与示例中所示相同。0 是列表中的第一个值。
`${(value=token)result1#result2}` 或 `${(value=token)result1}` 等价于 JavaScript 命令：`if (value == token) result1 else result2`。可能的比较运算符为：`= < > !=`
对于 JSON 模板，右括号 `}` 必须这样写：`\}`
- 请参阅适配器中的示例。
- 或者也可以这样写：`${[0,🟢,🟡,🟠,🔴]warnlevelnumber}`

**恢复模板：** 将模板重置为当前系统语言。现有模板将被**丢失**。之后保存并关闭。建议在更改系统语言后使用此功能。

![加拿大野生动物部](../../../en/adapterref/iobroker.weather-warnings/img/DWD.png)

**DWD：** 从 10000 个地点的列表中进行选择，输入后点击另一个标签页，然后再返回，列表太大，需要更新。

**UWZ：** 使用国家标识符 DE AT（其他标识符也可能适用，需要测试）和邮政编码输入，例如 DE12345

**ZAMG：** 仅限奥地利境内。输入坐标时请注明地点在奥地利境内。

**地点名称：**用户指定的地点名称，可用于警告信息（适用于多个警告单元格）。

**筛选：**

- 过滤原始数据：在后续每次处理之前，过滤掉未来 X 小时内的所有数据。
- 类型：丢弃所有具有此类型的内容。
- 等级：低于此等级的所有内容都将被丢弃。

![电报](../../../en/adapterref/iobroker.weather-warnings/img/telegram.png) **适配器：** 如果启用了此选项且存在适配器字段，则必须选择一个有效选项。日志中的错误消息表示缺少设置。

**启用…：** 使用此服务，由该提供商发送警告。

**筛选条件：** 1) 忽略此类型的警告 2) 忽略级别相同或更低的警告

**消息：**请使用以下模板：第一列：1) 新增警告或现有警告；2) 已移除一个警告，但仍有**其他**有效警告；

3) 已移除警告，且**没有其他**有效警告。

第 2 列：1) 手动触发通知 2) 用于不发出警告 1.3

3) 的模板不能包含 `${}` 标记。

**特色功能**

**邮件：**邮件头位于邮件正文之前，之后是 1、2 或 3 个字符加换行符，最后是页脚。邮件以 HTML 格式发送，因此您可以添加任何所需的 HTML 标签。（其他功能正在开发中，尚未完成）

**Alexa：**此外，必须选择一个或多个设备。音量仅在语音消息中更改，之后应重置为默认值。每条警告消息的长度限制为 250 个字符。可以添加声音，激活“专家”模式以显示选项。

**标题、页眉、页脚** 中只有 ${status} 有效。其他标记包含随机值或无值。

## 一般行为
- 同一事项不得重复发送信息。DWD对此要求非常严格。
- 如果选择“无”作为模板，则不会发送任何通知。
- .alerts 文件中的状态包含开始时间、结束时间、警告类型、当前激活状态和标题的数组，并按警告类型分组。每个组显示一条警告，并根据以下条件进行筛选：

1) 警告**现在**已激活（最高级别的警告）。

## 图标
DWD 图标：版权所有 Deutscher Wetterdienst ZAMG 图标：版权所有

其他的：

创建者：[阿德里·安夏](https://www.youtube.com/channel/UChLOv1L-ftAFc2ZizdEAKgw?view_as=subscriber)

变化：原图为蓝色，其他颜色是对原图的修改。

许可证：[CC BY 4.0 法律声明](https://creativecommons.org/licenses/by/4.0/legalcode)

图标页面：https://icon-icons.com/de/symbol/Wetter-wind-cloud-Blitz-Regen/189105

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.11.2 (2026-06-18)
- (ticaki) **FIXED**: DWD spoken/written color names (`warnlevelcolorname`) now come from an exact lookup of the official DWD CAP color palette instead of a hue heuristic; light heat violet is now distinguished from dark heat violet, and the extreme-storm, UV and preliminary-information colors are named correctly (adds the color names light violet, dark red, magenta and pink) (#220)

### 0.11.1 (2026-06-18)
- (ticaki) **FIXED**: spoken/written color name for DWD heat warnings (`warnlevelcolorname`) is now correct: the light violet DWD heat color (`#cc99ff`) was misclassified as "green" and is now named "violet", matching email/vis (#220)

### 0.11.0 (2026-06-02)
- (copilot) **BREAKING**: Adapter requires node.js >= 22 now
- (ticaki) **NEW**: added DWD warning type 86 "extreme black ice" (extremes Glatteis) (#251)
- (ticaki) **NEW**: added global aggregate states `provider.hasActiveWarning` (boolean), `provider.maxLevel` (number) and `provider.maxLevelText` (text)
- (ticaki) **FIXED**: alexa2 notification no longer crashes when a warning type has no assigned sound
- (ticaki) **FIXED**: per-provider deactivation of datapoint categories (warning/alerts/formatedKeys) is applied again on restart
- (ticaki) **FIXED**: addressed ioBroker repository checker findings (node >= 22, `source-map-support` moved to runtime dependencies, admin jsonConfig schema issues, missing translations) (#300, #112)
- (ticaki) **FIXED**: DWD color name (`warnlevelcolorname`, e.g. spoken by Alexa) now matches the actual DWD warning color shown in email/vis instead of being derived from severity (#220)

### 0.10.1 (2026-04-20)
- (ticaki) **FIXED**: Network errors (e.g. internet down, DNS failure, HTTP errors) now show a clear, readable message instead of `[object Object]` or a useless stack trace

### 0.10.0 (2025-11-13)
- (ticaki) update deps
- (ticaki) fix a problem with "remove" key
- (ticaki) support added for nspanel-lovelace-ui (>= v0.8.0)