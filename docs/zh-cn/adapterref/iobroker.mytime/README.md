---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mytime/README.md
title: ioBroker.mytime
hash: QUU9pbgKilVdxjr97HE2NFn5M5NdhJtu1J8iSWMsjFE=
---
![标识](../../../en/adapterref/iobroker.mytime/admin/mytime.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.mytime.svg)
![下载](https://img.shields.io/npm/dm/iobroker.mytime.svg)
![安装数量](https://iobroker.live/badges/mytime-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/mytime-stable.svg)
![NPM](https://nodei.co/npm/iobroker.mytime.png?downloads=true)

# IoBroker.mytime
**测试：** ![测试与发布](https://github.com/oweitman/ioBroker.mytime/workflows/Test%20and%20Release/badge.svg)

＃＃ 重要的
只有英文文档才有效，因为自动翻译会翻译不应该翻译的部分。

## IoBroker 的 mytime 适配器
此适配器处理时间数据（例如：倒计时等）。

倒计时功能提供可用于管理倒计时（例如在脚本中）的数据点。该适配器还包含多个用于可视化这些倒计时的组件。时间序列可用于创建复杂的时间序列，并在特定时间点触发数据点。

＃＃＃ 配置
#### 倒计时
在配置对话框的“倒计时”选项卡中，您可以创建一个新的倒计时，例如“测试”，将计时器设置为 10 秒，并导入以下组件。

数据点已预先配置为名为“测试”的倒计时。

##### 停止行为计时器
倒计时收到停止信号后，倒计时将重置为定时器设定的时间。

##### 停止零行为
倒计时收到停止信号后，倒计时仍停留在 0。

##### 停止行为重运行
计时器到期后，它将自动重新启动。

#### 时间序列
在配置对话框的“时间序列”选项卡中，您可以创建包含一个或多个时间规则的新时间序列。您可以为每个时间规则定义不同的参数。每个时间序列都会创建一个单独的数据点，该数据点会在计算出的时间事件发生时触发。

时间事件是实时计算的。但是，所使用的 rrule 库并非在所有参数组合下都完美无缺。

这表明，在某些组合下，页面会陷入无限循环。

您也可以使用演示页面 <http://jakubroztocil.github.io/rrule/> 进行实验。

除了添加时间规则之外，您还可以添加时间规则来排除时间事件、添加单个时间事件以及排除单个时间事件。

除了 rrule 的功能外，现在还可以动态计算各种太阳和月亮的相位时间。

此计算仅在时间间隔至少为一天（而非每小时或每分钟）时才会进行。

##### 基于太阳的时间事件
- astronomicalDawn
- amateurDawn
- nauticalDawn
- blueHourDawnStart
- civilDawn
- blueHourDawnEnd
- goldenHourDawnStart
- 日出
- 日出结束
- goldenHourDawnEnd
- 正午
- goldenHourDuskStart
- 日落开始
- 日落结束
- goldenHourDuskEnd
- blueHourDuskStart
- civilDusk
- blueHourDuskEnd
- nauticalDusk
- amateurDusk
- 天文黄昏
- 最低点

##### 基于月球的时间事件
月升
- moonhigh
月落

＃＃＃ 用法
#### 时间序列的应用
##### 时间序列的可用数据点
配置好新的时间序列后，适配器会创建以下数据点：

| 数据点 | 描述 |
| --------- | ------------------------------------------------------------ |
| 操作 | 此时间序列的实际状态。可能的值包括停止、运行 |
| cmd | 目前无功能 |

##### 可用操作状态
| 动作 | 描述 |
| ------ | --------------------------------------------------------------------------------------------- |
| 停止 | 目前没有正在运行的时间事件 |
| 运行 | 时间事件已触发。经过配置的持续时间后，数据点变为停止 |

#### 倒计时的使用
倒计时可用数据点
配置好新的倒计时后，适配器会创建以下数据点：

| 数据点 | 描述 |
| --------- | ---------------------------------------------------------------------- |
| 操作 | 倒计时的实际状态。可选值为停止、运行、暂停、结束 |
| cmd | 命令数据点。可能的命令如下所述 |
|配置 |倒计时器的配置。              |
| 开始 | 起始时间（毫秒）数据点 |
| 结束 | 结束时间（毫秒）的数据点 |
| 计时器 | 以毫秒为单位的总时间数据点 |

倒计时的可用操作状态
| 动作 | 描述 |
| ------ | ----------------------------------------------------------------------------------------------------- |
| 停止 | 倒计时已停止，开始时间和结束时间均设置为 0 |
| 运行 | 倒计时开始。如果倒计时到达结束时间，则操作切换为结束 |
| 暂停 | 倒计时已暂停。结束时间已设置为暂停时间。 |
| 结束 | 倒计时结束。您可以将此状态用作触发后续操作（声音、弹出窗口等）的触发器。 |

##### Cmd 数据点的可用命令
| 命令 | 示例 | 描述 |
| --------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `+value` | `+1:10` | 为倒计时设置增加时间。该设置将在下次启动时生效。 |
| `-value` | `-1:2:3` | 从倒计时中减去时间。此设置将在下次开始时生效。 |
| `-!value` | `-!1:2:3` | 类似 - 运算符并减少运行计时器 |
| `=value` | `=5:00` | 将倒计时设置为此时间。 |
| `=!value` | `=!5:00` | 类似 = 运算符并将运行计时器设置为给定时间 |
| `#ISO-Date` | `#2025-01-01T10:00:00` | 设置倒计时目标时间。时间必须采用 ISO 日期字符串格式。 |
| `#!ISO-Date` | `#!2025-01-01T10:00:00` | 类似 # 运算符，并将运行计时器设置为给定的目标时间 |
| `$Time` | `$20:15` | 将倒计时器设置为目标时间。如果目标时间早于当前时间，则设置为第二天。 |
| `$!Time` | `$!20:15` | 类似 $ 运算符，并将运行计时器设置为给定的目标时间 |
| `start` | `start` | 开始倒计时 |
| `stop` | `stop` | 停止倒计时。倒计时时间重置为设置值 |
| `pause` | `pause` | 暂停倒计时 |
| `end` | `end` | 停止倒计时。倒计时设置为 0 |
| `reset` | `reset` | 将定时器重置为配置状态 |
| `setstop2timer` | `setstop2timer` | 将停止行为配置设置为定时器 |
| `setstop2zero` | `setstop2zero` | 将停止行为配置设置为零 |
| `setstop2rerun` | `setstop2rerun` | 设置停止行为配置以重新运行 |
| `save` | `save` | 将数据点中定义的配置保存到 iobroker 配置中，iobroker 会在保存后自动重启适配器 |
| `save` | `save` | 将数据点中定义的配置保存到 iobroker 配置中，iobroker 会在保存后自动重启适配器 |

##### 设置倒计时计时器的值格式
您可以将倒计时设置为无限时长。

数值格式为 [天:[小时:[分钟:[秒]]]]，其中天、小时和分钟是可选的。

如果您想将倒计时设置为一天，则必须同时设置小时、分钟和秒，无需遵循常规的数值范围（例如 0-24 小时）。

您也可以设置 48 小时。

如果您愿意，还可以设置不规则的时间格式。时间将分别累加。

**示例：**

| 设置 | 描述 |
| --------- | ------------------------------------------- |
| 1:0:0:0 | 计时器加/减 1 天 |
| 2:0:0 | 设置/增加/减少计时器 2 小时 |
| 3:0 | 计时器加/减 3 分钟 |
| 120 | 向计时器添加/减少 120 秒 |
| 48:0:0 | 设置/增加/减少计时器 48 小时 |
| 48:75:120 | 设置/增加/减少计时器 |

##### 日期时间格式，用于格式化小部件中的输出
可用占位符如下：

|占位符|描述|
| ----------- | --------------------------------------------------------------- |
| YYYY | 年份（4 位数字） |
| YY | 两位数的年份 |
| w | 月份不带前导零（不与月份连写） |
| ww | 月份以零开头（不与月份连写） |
| M | 月份（不含前导零，不与周数合并） |
| MM | 月份以零开头（不与周连写） |
| d | 天数（不含前导零） |
| dd | 以零开头的天数 |
| 小时 | 不含前导零的小时数 |
| HH | 小时，前导零 |
| 米 | 分钟（不含前导零） |
| 毫米 | 分钟（含前导零） |
| 秒 | 不含前导零的秒数 |
| 秒 | 带前导零的秒 |
| \ | 如果要在输出中使用占位符，请使用转义字符 |

当取多个部分时，它们之间不能有缝隙。

例子：

有效格式：年、月、日 | 小时、分钟、秒；无效格式：年、分钟、秒

**示例：**

以下所有示例均使用倒计时 1:2:3:4

| 模板 | 示例 | 结果 |
| ------------------ | --------------- | ------------------------------------------------ |
| d\d Hh m\m s\s | 1d 2h 3m 4s | 带转义字符且不带前导零 |
| dd\d HHh mm\m ss\s | 01d 02h 03m 04s | 包含转义字符和前导零 |
| ss\s | 93784秒 | 仅秒 |
| dd\d HH\h | 01d 02h | 仅日期和小时 |
| 小时\小时 毫米\分钟 | 26 小时 03 分钟 | 仅小时和分钟 |

### 小部件
从 1.2.0 版本开始，这些小部件应该与 vis1 和 vis2 兼容。

#### 小部件倒计时
![小部件倒计时](../../../en/adapterref/iobroker.mytime/admin/mytime-plain.png)

一个用于输出纯文本的倒计时组件。

输出内容可以进行详细配置。

##### 小部件属性
| 属性 | 描述 |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `Object ID` | 倒计时器的数据点。可以使用任何数据点 |
| `HTML-Prepend` | 此文本或 HTML 代码将添加到小部件的输出前面 |
| `HTML-Append` | 此文本或 HTML 代码将附加到小部件的输出中 |
| `HTML-Append` | 此文本或 HTML 代码将附加到小部件的输出中 |

##### 示例小部件代码
这些组件已预先配置为名为“test”的倒计时。

vis1 和 vis2 各有两个不同的版本。

![例子](../../../en/adapterref/iobroker.mytime/admin/mytime-example1.png)

**VIS1：**

<details><summary>细节</summary><pre><code>[{&quot;tpl&quot;:&quot;tplMyTimeCountdownPlain&quot;,&quot;data&quot;:{&quot;g_fixed&quot;:false,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:false,&quot;g_css_background&quot;:false,&quot;g_css_shadow_padding&quot;:false,&quot;g_css_border&quot;:false,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;countdown_oid&quot;:&quot;mytime.0.Countdowns.test.timer&quot;,&quot;format&quot;:&quot;d H ms&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;771px&quot;,&quot;top&quot;:&quot;143px&quot;,&quot;width&quot;:&quot;151px&quot;,&quot;height&quot;:&quot;16px&quot;},&quot;widgetSet&quot;:&quot;mytime&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;+10s&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;+10&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;742px&quot;,&quot;top&quot;:&quot;111px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;-10s&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;-10&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;801px&quot;,&quot;top&quot;:&quot;111px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;=10&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;=10&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;864px&quot;,&quot;top&quot;:&quot;111px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;start&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;start&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;742px&quot;,&quot;top&quot;:&quot;163px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;pause&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;pause&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;801px&quot;,&quot;top&quot;:&quot;163px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;},{&quot;tpl&quot;:&quot;tplJquiButtonState&quot;,&quot;data&quot;:{&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;g_fixed&quot;:true,&quot;g_visibility&quot;:false,&quot;g_css_font_text&quot;:true,&quot;g_css_background&quot;:true,&quot;g_css_shadow_padding&quot;:true,&quot;g_css_border&quot;:true,&quot;g_gestures&quot;:false,&quot;g_signals&quot;:false,&quot;g_last_change&quot;:false,&quot;buttontext&quot;:&quot;stop&quot;,&quot;signals-cond-0&quot;:&quot;==&quot;,&quot;signals-val-0&quot;:true,&quot;signals-icon-0&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-0&quot;:0,&quot;signals-blink-0&quot;:false,&quot;signals-horz-0&quot;:0,&quot;signals-vert-0&quot;:0,&quot;signals-hide-edit-0&quot;:false,&quot;signals-cond-1&quot;:&quot;==&quot;,&quot;signals-val-1&quot;:true,&quot;signals-icon-1&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-1&quot;:0,&quot;signals-blink-1&quot;:false,&quot;signals-horz-1&quot;:0,&quot;signals-vert-1&quot;:0,&quot;signals-hide-edit-1&quot;:false,&quot;signals-cond-2&quot;:&quot;==&quot;,&quot;signals-val-2&quot;:true,&quot;signals-icon-2&quot;:&quot;/vis/signals/lowbattery.png&quot;,&quot;signals-icon-size-2&quot;:0,&quot;signals-blink-2&quot;:false,&quot;signals-horz-2&quot;:0,&quot;signals-vert-2&quot;:0,&quot;signals-hide-edit-2&quot;:false,&quot;lc-type&quot;:&quot;last-change&quot;,&quot;lc-is-interval&quot;:true,&quot;lc-is-moment&quot;:false,&quot;lc-format&quot;:&quot;&quot;,&quot;lc-position-vert&quot;:&quot;top&quot;,&quot;lc-position-horz&quot;:&quot;right&quot;,&quot;lc-offset-vert&quot;:0,&quot;lc-offset-horz&quot;:0,&quot;lc-font-size&quot;:&quot;12px&quot;,&quot;lc-font-family&quot;:&quot;&quot;,&quot;lc-font-style&quot;:&quot;&quot;,&quot;lc-bkg-color&quot;:&quot;&quot;,&quot;lc-color&quot;:&quot;&quot;,&quot;lc-border-width&quot;:&quot;0&quot;,&quot;lc-border-style&quot;:&quot;&quot;,&quot;lc-border-color&quot;:&quot;&quot;,&quot;lc-border-radius&quot;:10,&quot;lc-zindex&quot;:0,&quot;value&quot;:&quot;stop&quot;,&quot;visibility-cond&quot;:&quot;==&quot;,&quot;visibility-val&quot;:1,&quot;visibility-groups-action&quot;:&quot;hide&quot;,&quot;class&quot;:&quot;mytime&quot;},&quot;style&quot;:{&quot;left&quot;:&quot;864px&quot;,&quot;top&quot;:&quot;163px&quot;,&quot;color&quot;:&quot;white&quot;,&quot;font-weight&quot;:&quot;lighter&quot;,&quot;font-size&quot;:&quot;x-small&quot;,&quot;background&quot;:&quot;&quot;,&quot;border-width&quot;:&quot;2px&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;white&quot;,&quot;border-radius&quot;:&quot;10px&quot;,&quot;background-color&quot;:&quot;#303030 !important&quot;,&quot;box-shadow&quot;:&quot;2px 2px 3px rgba(20, 20, 20, 50)&quot;,&quot;width&quot;:&quot;55px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;}]</code></pre></details>

**VIS2：**

<details><summary>细节</summary><pre><code>[{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;pause&quot;,&quot;value&quot;:&quot;pause&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;423.0000305175781px&quot;,&quot;top&quot;:&quot;402.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000001&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;start&quot;,&quot;value&quot;:&quot;start&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;361.0000305175781px&quot;,&quot;top&quot;:&quot;402.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000002&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;stop&quot;,&quot;value&quot;:&quot;stop&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;485.0000305175781px&quot;,&quot;top&quot;:&quot;402.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000003&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;+10&quot;,&quot;value&quot;:&quot;+10&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;423.0000305175781px&quot;,&quot;top&quot;:&quot;349.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000004&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;=100&quot;,&quot;value&quot;:&quot;=100&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;361.0000305175781px&quot;,&quot;top&quot;:&quot;349.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000005&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;-10&quot;,&quot;value&quot;:&quot;-10&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;485.0000305175781px&quot;,&quot;top&quot;:&quot;349.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000006&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;+!10&quot;,&quot;value&quot;:&quot;+!10&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;423.0000305175781px&quot;,&quot;top&quot;:&quot;320.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000007&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;=!100&quot;,&quot;value&quot;:&quot;=!100&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;361.0000305175781px&quot;,&quot;top&quot;:&quot;320.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000008&quot;},{&quot;tpl&quot;:&quot;tplIconState&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;oid&quot;:&quot;mytime.0.Countdowns.test.cmd&quot;,&quot;type&quot;:&quot;value&quot;,&quot;g_common&quot;:true,&quot;step&quot;:1,&quot;minmax&quot;:1,&quot;repeat_delay&quot;:800,&quot;repeat_interval&quot;:300,&quot;min&quot;:0,&quot;max&quot;:100,&quot;variant&quot;:&quot;contained&quot;,&quot;g_style&quot;:true,&quot;text&quot;:&quot;-!10&quot;,&quot;value&quot;:&quot;-!10&quot;},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;485.0000305175781px&quot;,&quot;top&quot;:&quot;320.00001525878906px&quot;,&quot;width&quot;:&quot;59px&quot;,&quot;height&quot;:&quot;26px&quot;},&quot;widgetSet&quot;:&quot;jqui&quot;,&quot;_id&quot;:&quot;i000009&quot;},{&quot;tpl&quot;:&quot;tplMyTimeCountdownPlain&quot;,&quot;data&quot;:{&quot;bindings&quot;:[],&quot;countdown_format&quot;:&quot;dd\\d HH\\h mm\\m ss\\s&quot;,&quot;g_common&quot;:true,&quot;g_css_border&quot;:true,&quot;countdown_oid&quot;:&quot;mytime.0.Countdowns.test.timer&quot;,&quot;g_css_font_text&quot;:true},&quot;style&quot;:{&quot;bindings&quot;:[],&quot;left&quot;:&quot;361.0000305175781px&quot;,&quot;top&quot;:&quot;375.00001525878906px&quot;,&quot;width&quot;:&quot;182px&quot;,&quot;height&quot;:&quot;24px&quot;,&quot;border-width&quot;:&quot;0&quot;,&quot;border-style&quot;:&quot;solid&quot;,&quot;border-color&quot;:&quot;rgba(237,235,243,1)&quot;,&quot;text-align&quot;:&quot;center&quot;},&quot;widgetSet&quot;:&quot;mytime&quot;,&quot;_id&quot;:&quot;i000010&quot;}]</code></pre></details>

倒计时的实际操作状态（cdstop、cdrun、cdpause、cdend）可通过 CSS 类选择器获取：

```css
#w00000 .timer.cdend {
    color: red;
}
#w00000 .timer.cdrun {
    color: green;
}
```

#### 小部件反向倒计时（普通版）
![小部件反向倒计时](../../../en/adapterref/iobroker.mytime/admin/mytime-reverse.png)

一个显示从给定时间点开始经过的时间的小部件

##### 反向倒计时组件属性
| 数据点 | 描述 |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ISO datetime` | 表示开始时间的 DateTime 字符串。该表达式必须能够被 JavaScript 函数 new Date(表达式) 解释。另请参阅 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse> 示例：2022-01-10 23:12 或 2022-01-104T23:12:00.000Z |
| `HTML-Prepend` | 此文本或 HTML 代码将添加到小部件的输出前面 |
| `HTML-Append` | 此文本或 HTML 代码将附加到小部件的输出中 |
| `HTML-Append` | 此文本或 HTML 代码将附加到小部件的输出中 |

#### 小部件倒计时圆圈
![小部件倒计时圆圈](../../../en/adapterref/iobroker.mytime/admin/mytime-circle.png)

环形/圆形设计的倒计时小部件。

##### 倒计时圆圈组件属性
| 属性 | 描述 |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Object ID` | 倒计时数据点的计时器数据点。 |
| `Format` | 设置定时器输出格式。默认值为 mm:ss。详情请参见第 [日期时间格式](#format-of-the-template-to-format-the-countdown-output-in-the-widget) 章。反向设置用于增大或缩小圆环/圆圈 |
| `reverse` | 圆环或圆的宽度。 |
| `Width` | 圆环或圆的宽度。 |
| `Ring gap` | 环之间的像素间隙 |
| `Ring Caps` | 圆环/圆的末端设置：圆形或直线 |
| `background` | 圆环/圆圈的背景颜色 |
| `foreground` | 圆环/圆圈的前景色 |
| `countdown_color_second` | 第二个环/圆的前景色 |
| `countdown_color_hour` | 小时环/圆圈的前景色 |
| `countdown_color_day` | 日环/圆圈的前景色 |
| `countdown_color_week` | 本周前景色环/圆圈 |
| `countdown_color_month` | 月份环/圆圈的前景色 |
| `countdown_color_year` | 第二个环/圆的前景色 |
| `showsec` | 显示秒数环 |
| `showmin` | 显示分钟数 |
| `showhrs` | 显示分钟数 |
| `showday` | 显示日期的轮回 |
| `showmonth` | 显示月份环（不与周一起显示） |
| `showweek` | 显示周数环（不与月份一起显示） |
| `showyear` | 显示岁月的轮回 |
| `showyear` | 展示岁月的轮回 |

当选择多个部件时，部件之间不能有间隙。

例子：

有效格式：年、月、日 | 小时、分钟、秒；无效格式：年、分钟、秒

倒计时的实际操作状态（cdstop、cdrun、cdpause、cdend）可通过 CSS 类选择器获取：

```css
#w00000 .timer.cdend {
    color: red;
}
#w00000 .timer.cdrun {
    color: green;
}
```

#### 小部件倒计时翻页时钟
![小部件倒计时翻页时钟](../../../en/adapterref/iobroker.mytime/admin/mytime-flip.png)

机场翻页式倒计时小部件。

仅支持 100 天 - 1 秒的显示格式。

此处不进行单位换算。

##### 倒计时翻页时钟的小部件属性
| 属性 | 描述 |
| --------------------- | --------------------------------------------- |
| `Object ID` | 倒计时数据点的计时器数据点。 |
| `showmin` | 显示分钟部分。 |
| `showhrs` | 显示小时部分。 |
| `showday` | 显示时段。 |
| `color` | 倒计时器的颜色 |
| `background_color` | 倒计时器的背景颜色 |
| `countdown_dot_color` | 倒计时器圆点的颜色 |
| `countdown_dot_color` | 倒计时器圆点的颜色 |

当选择多个部件时，部件之间不能有间隙。

例子：

有效格式：年、月、日 | 小时、分钟、秒；无效格式：年、分钟、秒

**尖端：**

如果您想调整倒计时翻页钟的大小，可以在 vis 的 css 设置中输入以下代码以将其大小减半：Group CSS-Common / transform "scale(0.5)"

倒计时的实际操作状态（cdstop、cdrun、cdpause、cdend）可通过 CSS 类选择器获取：

```css
#w00000 .timer.cdend {
    color: red;
}
#w00000 .timer.cdrun {
    color: green;
}
```

#### 小部件倒计时 NixieClock
![小部件倒计时 NixieClock](../../../en/adapterref/iobroker.mytime/admin/mytime-nixie.png)

一款采用辉光管/LED风格的倒计时小部件

##### 倒计时 NixieClock 组件属性
| 属性 | 描述 |
| -------------------------- | ---------------------------------------------------- |
| 对象 ID | 倒计时数据点的计时器数据点。 |
| countdown_showsec | 显示秒数部分。 |
| countdown_showmin | 显示分钟部分。 |
| countdown_showhrs | 显示小时数。 |
| countdown_showday | 显示播出时段。 |
| countdown_showmonth | 显示月份部分。（不与周数一起显示） |
| countdown_showweek | 显示周数。（不与月份一起显示） |
| countdown_showyear | 显示年份部分。 |
| countdown_color_active | 倒计时器的颜色 |
| countdown_color_inactive | 不活跃数字的颜色 |
| countdown_opacity_inactive | 非活动数字的颜色透明度 |
| countdown_glowcolor | 辉光管数字周围发光的颜色 |

当选择多个部件时，部件之间不能有间隙。

例子：

有效格式：年、月、日 | 小时、分钟、秒；无效格式：年、分钟、秒

＃＃＃＃＃ 尖端
###### 上/下边距
使用的 Lato 字体略微向下倾斜，导致上下边距不均匀。可以通过调整高度和负上边距来解决这个问题。

该组件的高度为 1em。高度可以直接在组件属性中设置。

需要为负边距创建一个 CSS 类。

```css
#w00000 .cdclock {
    margin-top: -5px;
}
```

###### 版本 2 之前的组件尺寸
如果您想调整倒计时辉光管时钟的大小，可以在 vis 的 CSS 设置中输入以下代码以将其大小减半：Group CSS-Common / transform "scale(0.5)"

###### 将辉光管时钟居中
要使时钟居中，需要添加一个额外的 CSS 类，因为相应的设置无法在小部件设置中进行配置：

```css
#w00000 {
    display: flex;
    justify-content: center;
}
```

#### 小部件文字时钟
![小部件 Wordclock](../../../en/adapterref/iobroker.mytime/admin/mytime-wordclock.png)

一个用于显示字钟的小部件，提供多种选项

##### Wordclock 组件属性
| 数据点 | 描述 |
| ------------------- | -------------------------------------------------------- |
| `language` | 字钟有多种语言可供选择 |
| `letterDeactivated` | 普通字母的颜色 |
| `wordclockMargin` | 字钟与 LED 之间的边距 |
| `withMinutes` | 显示字钟角落的分钟指示灯 |
| `minuteSize` | 分钟 LED 的像素尺寸 |
| `minuteColor` | 分钟指示灯颜色 |
| `withSeconds` | 显示字钟的秒数指示灯 |
| `secondSize` | 秒数指示灯的像素尺寸 |
| `secondColor` | 秒数指示灯颜色 |
| `timezone` | 显示所选时区的时间 |
| `时区` | 显示所选时区的时间 |

倒计时的实际操作状态（cdstop、cdrun、cdpause、cdend）可通过 CSS 类选择器获取：

```css
#w00000 .timer.cdend {
    color: red;
}
#w00000 .timer.cdrun {
    color: green;
}
```

## 待办事项
- 七段数码管
滚动号码
- 可自定义字体
- ts：排除规则（时间范围、单个日期）
- ~~为世界时钟添加时区~~
- ~~字钟计时器~~
- ~~定时任务规划器：像 Outlook 一样规划单个日期/时间和重复性事件~~
- ~~Nixie风格~~
- ~~翻页式显示屏（机场显示屏）~~
- ~~新增命令，仅设置目标时间，不设置日期~~
- 带有禁用倒计时文本选项的倒计时圆圈小部件
- ~~名称中的组分隔符为“.”~~
极地时钟
- ~~圆圈反转~~
- ~~带圆帽的圆圈~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.3.0 (2025-12-03)

- remove autocomplete function in the browser
- improve documentation
- add html prepend and append to the countdown plain widget
- Revision of the algorithms for parameter takeover and verification.
- Revision of the calculation of dynamic time differences

### 2.2.1 (2025-12-01)

- add missing files

### 2.2.0 (2025-12-01)

- add calculation of astro dates to timeseries
- rework of the timeseries caluclation in the backend
- this version includes extended debug information (map-files).
  For this reason, the adapter is approximately 13MB in size instead of 2MB.

### 2.1.0 (2025-11-27)

- switch from crao to vite build system
- New option for countdown timer: rerun - when the timer expires,
  it will automatically restart.

### 2.0.1 (2025-09-08)

- major release: make nixie clock responsive. the users have to adjust the
  font-size of the widget to get the old size.
  if you want the old size try it with 100px font-size.

### 1.4.7 (2025-07-25)

- remove types/request
- improve documentation format

### 1.4.6 (2025-07-21)

- fix wrong calc of datapoints in some cases

### 1.4.5 (2025-07-21)

- fix widget reverse countdown plain

### 1.4.4 (2025-06-16)

- fix stopbeaviour
- fix state handling
- improve validator vor name and setdp in admin

### 1.4.3 (2025-06-06)

- fix validation rule for the setDP button in admin

### 1.4.2 (2025-06-01)

- revert to node 18
- cleanup files and some details
- fix server time diff calculations

### 1.4.0 (2025-01-02)

- to update the time from the configuration i added a SetDP Button

### 1.3.0 (2025-01-02)

- switch to iobroker eslint
- adjust many code to follow the new rules
- add some jsdoc
- implement servertimediff calculation and correction
- fix datapoint names for the vis1 example controls
- set nogit
- adjust year in readme and license

### 1.2.2 (2024-11-18)

- improve readme
- improve widget js
- remove word test from widgets html, sorry

### 1.2.1 (2024-11-17)

- interprete all commands in lowercase

### 1.2.0 (2024-11-15)

- widgets are now compatible with vis2

### 1.1.1 (2024-11-13)

- fix problem with start of vis2, exclude widgets for vis2

### 1.1.0 (2024-11-12)

- IMPORTANT: Changed Datapoint names and datastructure for the configuration,
  no migration you have to enter all configurations again
- add some new commands to restart the countdown time in place
- repair save command
- removed vis dependency from io-package.json

### 1.0.15 (2024-11-11)

- repair issues from repochecker

### 1.0.14 (2024-11-11)

- improve test and release process
- update github workflow
- remove eslint command from package.json
- switch back to node 18 for testing due to airbnb error
- more repair
- add package-lock.json to git
- remove unused library
- add lint and lint
- remove iobroker eslint
- general revision
- updating the configuration dialogs for countdown and timeseries
  in jsonConfig and custom react

### 0.7.12

- add html_prepend and html_append properties to the widget reverse countdown

### 0.7.10

- add widget reverse countdown

### 0.7.9

- add more wordclock tests
- fix wordclock matrix swiss

### 0.7.8

- add timezone for wordclock

### 0.7.7

- add timezone for wordclock

### 0.7.6

- add tests for wordclock \* remove admin tab

### 0.7.5

- Remove comments in io-package

### 0.7.4

- fix spanish language pack

### 0.7.3

- add turkish language for wordclock

### 0.7.2

- add russian and espaniol language for wordclock

### 0.7.1

- add margin property for wordclock
- add italiano and francais for wordclock
- wordclock remove border

### 0.7.0

- New widget wordclock

### 0.6.1

- remove beta tag from widgets \* m,assive reengeneering of the react classes,
  add functions für exclusion rules, adding single time events
  and exclude single time events

### 0.6.0

- Introduction of new functionality timeseries

### 0.5.2

- fix an issue and introduce a new command save to save the configuration
  defined in datapoints to the iobroker configuration data

### 0.5.1

- Migration of old counters

### 0.5.0

- Change settings dialog to react

### 0.4.2

- performance optimization. mytime now checks the data from internal
  and did not read the data allways from datapoints | update dependencies

### 0.4.1

- widget cd flipclock: remove dot labels

### 0.4.0

- New widget NixieClock

### 0.3.1

- remove mytime tile in iobroker overview
- set initial visual countdown value to 0
- prefix css classes, due css artefacts from other adapters
  (eg kodi and css class stop)

### 0.3.0

- new command to set only target time without date
- countdown circle widget now with option to disable countdown text
- timers are now groupable in subdirectories.
  you can now enter dots (.) as a groupseperater in the name of a timer

### 0.2.1

- fix timer display in configuration dialog
- fix default template of countdown plain
- add icons for countdonw plain and countdown circle widgets
- fix startangle calculation for countdown circle if time values are 0
- remove timer intervals in editmode due to interfer with
  the configuration dialog and didnt save the ne values

### 0.2.0

- extend the countdown circle with more rings for days, hours and minutes

### 0.1.2

- Setting for growing or shrinking the ring/circle
- Setting for the ends of the ring/circle: round or straight
- Extend special char filtering with umlauts
- Fix state request issue in widget countdown circle

### 0.1.1

- Add a countdown name datapoint

### 0.1.0

- Forum release
- initial release

## License

MIT License

Copyright (c) 2025 oweitman <oweitman@gmx.de>

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