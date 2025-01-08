---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/viz/timeandweather.md
title: 时间&天气
hash: gobWIDvudg3iW1eszIOA2lKUW5A+/3y5Dr7K9GR2O4c=
---
# 时间&天气
该集提供了可用于显示日期、时间和天气预报的小部件。

|小工具|图片|描述|
|---------------------------------|-------|-------------|

[酷时钟](#cool-clock) | ![001]|模拟时钟|
[翻转时钟](#flip-clock) | ![002]|复古风格数字时钟（带动画）|
[时钟段](#segment-clock) | ![004]|7 段式数字时钟|
[简单的时钟](#simple-clock) | ![005]|数字时钟|
[简单的日期](#simple-date) | ![006]|日期显示|
[SVG时钟](#svg-clock)| ![007]|模拟风格的可变时钟|
[HTC 天气](#htc-weather)| ![003]|带有天气信息的时间显示 --> 不再有效|
[雅虎天气](#yahoo-weather)| ![010]|雅虎天气预报 --> 不再有效|
[天气定制](#weather-custom)| ![010]|具有可配置状态的天气预报|

*********************************************************

### 酷时钟
模拟时钟！[001]

属性|描述|
----|----|
主题|多种显示主题可选|
不显示秒|不带秒针的表示|
数字时钟|.|
显示上午/下午|美式时间创建|

**示例：** ![008] [:arrow_up: 回到顶部](../../de/viz/#TimeWeather) ************************************ **********************

### 翻转时钟
复古风格的数字时钟，数字动画跳跃！[002]

[:arrow_up: 回到顶部](#TimeWeather)  
*********************************************************

### 段时钟
7 段式数字时钟，可以显示当前时间或数据点的时间。

！[004]

|属性|描述|
| ----|----|
|对象 ID |如果不显示当前时间的数据点|
|激活时钟||
|秒|代表秒|
|模板||
|段颜色开启 |活动段的颜色|
|段颜色关闭 |非活动段的颜色|
|运行文本的间隔[ms]|运行文本显示的速度|
|段数 |每位数 7/14/16 段|
|字符角度|数字的倾斜度|
|字符高度|数字高度|
|字符宽度|数字宽度|
|字符间距|数字间距|
|段宽度|单个段的宽度|
|段距离|段之间的距离|
|角型|线段形状|

**示例：** ![011] [:arrow_up: 回到顶部](../../de/viz/#TimeWeather) ************************************ **********************

### 简单时钟
7 段式数字时钟显示当前时间。

！[005]

属性|描述|
----|---- 不显示秒|不显示秒闪烁| ？无款式| ？

**示例：** ![012] [:arrow_up: 回到顶部](../../de/viz/#TimeWeather) ************************************ **********************

### 简单日期
当前日期的 7 段式日期显示。

！[006]

属性|描述|
----|---- 星期几|在日期之前显示星期几 星期几短|以简短形式显示星期几（仅当激活星期几时）仅显示年份的最后两位数字 前面的零|日期和月份中的前导零 月份为文本|以文本形式写出月份 短月份|以文本形式写出月份缩写 美国格式|?没有风格|？

**示例：** ![013] [:arrow_up: 回到顶部](../../de/viz/#TimeWeather) ************************************ **********************

### SVG 时钟
具有多种显示选项的模拟时钟

！[007]

属性|描述|
----|---- 季度文本大小|刻钟显示的文本大小 季度文本颜色|刻钟显示的文本颜色 季度刻度颜色|季度刻度尺寸 分钟文本大小|分钟显示的文本大小 分钟文本颜色|分钟显示的文本颜色 小刻度颜色|小刻度（每分钟）的颜色 显示秒|显示秒针 指针颜色|时针和分针的颜色手凹颜色|与时针和薄荷针分开的元素的颜色 秒针颜色|秒针的颜色 文本字体|数字的字体集

**示例：** ![015] [:arrow_up: 回到顶部](../../de/viz/#TimeWeather) *********************************** **********************

### HTC 天气
天气显示（不再工作，因为......？）！[003]

属性|描述|
----|---- 城市|选择该城市的天气 城市名称|城市名称 语言|显示语言 更新间隔|天气数据更新

[:arrow_up: 回到顶部](#TimeWeather)  
*********************************************************

### 雅虎天气
天气预报显示（由于雅虎天气服务已更改，无法再使用）（参见 https://developer.yahoo.com/weather/）

！[010]

[:arrow_up: 回到顶部](#TimeWeather)  
*********************************************************

### 天气自定义
任何天气数据源的天气预报显示。
目前建议使用“daswetter”适配器中的数据。

！[010]

属性|描述|
----|---- 城市|选择该城市的天气 城市名称|城市名称 语言|显示语言

＃＃＃＃ 现在
属性|描述|
----|---- 温度 ID|当前温度的数据点 文本 ID|天气描述文本的数据点 湿度 ID|湿度的数据点 最低温度 ID|每日最低温度的数据点 最高温度 ID|天气描述文本的数据点每日最高温度 风速|风速数据点 风向|风向数据点 图像 URL | 包含相应天气符号 URL 的数据点

＃＃＃＃ 早晨
属性|描述|
----|---- 文本 ID|天气描述文本的数据点 最低温度 ID|每日最低温度的数据点 最高温度 ID|每日最高温度的数据点 图像 URL|包含相应天气符号 URL 的数据点

这就是接下来几天的持续情况（取决于预测需求和点击耐力）...

**示例：** ![016] [:arrow_up: 回到顶部](../../de/viz/#TimeWeather) ************************************ **********************

[001]: media/iobroker-vis-timeandweather_timeandweather_coolclock.png

[002]: media/iobroker-vis-timeandweather_timeandweather_flipclock.png

[003]: media/iobroker-vis-timeandweather_timeandweather_htcweather.png

[004]: media/iobroker-vis-timeandweather_timeandweather_segmentclock.png

[005]: media/iobroker-vis-timeandweather_timeandweather_simpleclock.png

[006]: media/iobroker-vis-timeandweather_timeandweather_simpledate.png

[007]: media/iobroker-vis-timeandweather_timeandweather_svgclock.png

[008]: media/iobroker-vis-timeandweather_timeandweather_coolclock_config.png

[009]: media/iobroker-vis-timeandweather_timeandweather_htcweather_config.png

[010]: media/iobroker-vis-timeandweather_timeandweather_yahooweather.png

[011]: media/iobroker-vis-timeandweather_timeandweather_segmentclock_config.png

[012]: media/iobroker-vis-timeandweather_timeandweather_simpleclock_config.png

[013]: media/iobroker-vis-timeandweather_timeandweather_simpledate_config.png

[014]: media/iobroker-vis-timeandweather_timeandweather_svgclock_config.png

[015]: media/iobroker-vis-timeandweather_timeandweather_explain_svgclock.gif

[016]: media/iobroker-vis-timeandweather_timeandweather_explain_CustomWeather.gif