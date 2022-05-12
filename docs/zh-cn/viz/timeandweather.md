---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/viz/timeandweather.md
title: 时间和天气
hash: 3F5tnNInLrwz9Ic7Db40MfwRZ7qhrC1UraDW+wpkF5c=
---
# 时间和天气
该集合提供了可用于显示日期、时间和天气预报的小部件。

|小部件 |图片 |说明|
|---------------------------------|-------|-------------|

[很酷的时钟](#cool-clock)| ![001]|模拟时钟|
[翻转时钟](#flip-clock)| ![002]|复古风格数字时钟（带动画）|
[段时钟](#segment-clock)| ![004]|7 段式数字时钟|
[简单的时钟](#simple-clock)| ![005]|数字时钟|
[简单的日期](#simple-date)| ![006]|日期显示|
[SVG时钟](#svg-clock)| ![007]|非常可变的模拟风格时钟|
[HTC 天气](#htc-weather) | ![003]|带有天气信息的时间显示 --> 不再起作用|
[雅虎天气](#yahoo-weather) | ![010]|Yahoo 的天气预报 --> 停止工作|
[天气自定义](#weather-custom)| ![010]|可配置状态的天气预报|

*********************************************************

### 酷时钟
模拟时钟！[001]

属性|描述|
----|----|
主题|提供不同的显示主题|
不显示秒针|不显示秒针|
数字时钟|.|
显示上午/下午|美式时间显示|

**示例：** ![008] [:arrow_up: 回到顶部](../../de/viz/#TimeWeather) ************************************* ************************

### 翻转时钟
带有动画数字的复古风格数字时钟！[002]

[:arrow_up: 回到顶部](#TimeWeather)  
*********************************************************

### 段时钟
7 段式数字时钟，可以显示当前时间或数据点的时间。

![004]

|属性|描述|
| ----|----|
|对象 ID |不显示当前时间的数据点|
|激活时钟 ||
|秒数 |显示秒数|
|模板 ||
|段颜色开 |活动段的颜色|
|段颜色关闭 |非活动段的颜色|
|滚动文本的间隔[ms]|滚动文本显示的速度|
|段数 |每位数 7/14/16 段|
|字符角度|数字倾斜|
|字符高度 |数字高度|
|字符宽度 |数字宽度|
|字符间距 |数字间距|
|段宽|每段宽度|
|段距离|段之间的距离|
|角型|线段形状|

**示例：** ![011] [:arrow_up: 回到顶部](../../de/viz/#TimeWeather) ************************************* ************************

### 简单时钟
7 段式数字时钟显示当前时间。

![005]

属性|描述|
----|---- 不显示秒|不显示秒闪烁| ?无风格| ?

**示例：** ![012] [:arrow_up: 回到顶部](../../de/viz/#TimeWeather) ************************************* ************************

### 简单日期
当前日期的 7 段式日期显示。

![006]

属性|描述|
----|---- 星期几|显示日期前的星期几 短星期几|将工作日显示为短格式（仅在启用工作日时）短年份|仅显示年份的最后两位数字前导零|日期和月份中的前导零月份为文本|将月份写为文本短月|将月份缩写写为文本美国格式|？没有风格|？

**示例：** ![013] [:arrow_up: 回到顶部](../../de/viz/#TimeWeather) ************************************* ************************

### SVG 时钟
具有多种显示选项的模拟时钟

![007]

属性|描述|
----|---- 四分之一文本大小|四分之一小时文本大小 四分之一小时文本颜色|四分之一小时文本颜色 四分之一刻度颜色|四分之一刻度大小 分钟文本大小|分钟小时文本大小 分钟文本颜色|分钟显示文本颜色 小刻度颜色|小刻度颜色（每分钟） 显示秒数|显示秒针颜色|时针和分针颜色 指针凸块颜色|时针和分针偏移元素的颜色 秒针颜色|秒针颜色手色文字字体|数字排版

**示例：** ![015] [:arrow_up: 回到顶部](../../de/viz/#TimeWeather) ************************************* ************************

### HTC 天气
天气显示（不再起作用，因为...？）！[003]

属性|描述|
----|---- 城市|选择该城市的天气城市名称|城市名称语言|显示语言更新间隔|天气数据更新

[:arrow_up: 回到顶部](#TimeWeather)  
*********************************************************

### 雅虎天气
天气预报显示（不再可用，因为雅虎天气服务已经改变）（见 https://developer.yahoo.com/weather/）

![010]

[:arrow_up: 回到顶部](#TimeWeather)  
*********************************************************

### 天气自定义
任何天气数据源的天气预报显示。
目前建议使用来自“daswetter”适配器的数据。

![010]

属性|描述|
----|---- 城市|选择这个城市的天气城市名称|城市名称语言|显示语言

＃＃＃＃ 现在
属性|描述|
----|---- 温度ID|当前温度文本ID的数据点|天气描述文本的数据点湿度ID|湿度最低温度ID的数据点|每日低温的数据点最高温度ID|天气描述文本的数据点每日高温风速|风速风向数据点|风向图像URL数据点|带有相应天气符号URL的数据点

＃＃＃＃ 早晨
属性|描述|
----|---- 文本 ID|天气描述文本的数据点最低温度 ID|每日最低温度的数据点最高温度 ID|每日最高温度的数据点图像 URL|带有相应天气符号 URL 的数据点

这就是接下来几天的情况（取决于预测和点击耐力的需要）......

**示例：** ![016] [:arrow_up: 回到顶部](../../de/viz/#TimeWeather) ************************************* ************************

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