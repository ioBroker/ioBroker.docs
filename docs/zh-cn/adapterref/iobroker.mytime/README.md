---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mytime/README.md
title: ioBroker.mytime
hash: xMMKU/tNSgObOEGe6ERoprb7/chSmR7eBPmGaK7+758=
---
![标识](../../../en/adapterref/iobroker.mytime/admin/mytime.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.mytime.svg)
![下载](https://img.shields.io/npm/dm/iobroker.mytime.svg)
![安装数量（最新）](http://iobroker.live/badges/mytime-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/mytime-stable.svg)
![依赖状态](https://img.shields.io/david/oweitman/iobroker.mytime.svg)
![已知漏洞](https://snyk.io/test/github/oweitman/ioBroker.mytime/badge.svg)
![Travis-CI](http://img.shields.io/travis/oweitman/ioBroker.mytime/master.svg)

# IoBroker.mytime
＃＃ 重要的
只有英文文档有效，因为自动翻译会翻译不应翻译的区域。

## IoBroker 的 mytime 适配器
这个适配器处理时间（例如：倒计时等）。
倒计时功能提供了可用于管理倒计时的数据点（例如在脚本中）。该适配器还包括几个小部件来可视化这些倒计时。
时间序列可用于创建触发数据点的复杂时间序列。

＃＃＃ 配置
＃＃＃＃ 倒数
在配置对话框“倒计时”选项卡中，您可以创建一个新的倒计时，例如“测试”，将计时器设置为 10 秒并导入以下小部件。
数据点是为名为 test 的倒计时预先配置的。

##### 停止行为计时器
倒计时得到信号停止后，倒计时复位到定时器设定的时间。

##### 停止行为归零 倒计时得到信号停止后，倒计时保持在 0。
＃＃＃＃ 时间序列
在配置对话框“时间序列”选项卡中，您可以使用一个或多个计时器创建一个新的时间序列。对于每个时间规则，您可以定义不同的参数每个时间序列创建一个单独的数据点，该数据点在计算的时间事件中触发。
时间事件是实时计算的。但是，使用的 rrule 库在所有参数组合中还不是完美的。
这表明，在某些组合下，页面会进入无限循环。
演示页面 http://jakubroztocil.github.io/rrule/ 也可用于实验。
除了添加时间规则，您还可以添加时间规则以排除时间事件、添加单个时间事件以及排除单个时间事件。

＃＃＃ 用法
＃＃＃＃ 时间序列
##### 可用数据点
配置新时间序列后，适配器会创建以下数据点：

|数据点 |描述 |
|-----------|---------------------------------------------------------------------------|
|行动 |时代的实际状态。可能的值为 stop,run |
|命令 |无功能自动取款机 |

##### 可用的操作状态
|行动 |说明 |
|-----------|-------------------------------------------------------------------------------------------------------|
|停止 |目前没有时间事件处于活动状态|
|运行 |触发了时间事件。在配置的持续时间之后，数据点变为停止 |

＃＃＃＃ 倒数
##### 可用数据点
配置新的倒计时后，适配器会创建以下数据点：

|数据点 |描述 |
|-----------|---------------------------------------------------------------------------|
|行动 |倒计时的实际状态。可能的值为停止、运行、暂停、结束 |
|命令 |命令的数据点。可能的命令如下所述 |
|开始 |以毫秒为单位的开始时间的数据点 |
|结束 |以毫秒为单位的结束时间的数据点 |
|计时器 |以毫秒为单位设置的总时间的数据点 |

##### 可用的操作状态
|行动 |说明 |
|-----------|-------------------------------------------------------------------------------------------------------|
|停止 |倒计时停止，开始和结束时间设置为 0 |
|运行 |倒计时运行。如果倒计时到达结束时间。动作切换到结束|
|暂停 |倒计时处于暂停模式。结束时间设置为暂停时间 |
|结束 |倒计时结束。您可以将此状态用作进一步操作（声音、弹出窗口等）的触发器 | |

##### Cmd 数据点的可用命令
|命令 |示例 |描述 |
|---------------|----------------------|----------------------------------------------------------------------------------------------|
| +价值 | +1:10 |为倒计时设置增加时间。下次启动时会考虑该设置|
| -值 | -1:2:3 |从倒计时中减去时间。下次启动时会考虑该设置|
| =价值 | =5:00 |将倒数计时器设置为这个时间。 |
| #ISO-日期 | #2020-01-01T10:00:00 |将倒数计时器设置为目标时间。时间必须格式化为 ISO-Datestring |
| $时间 | $20:15 |将倒数计时器设置为目标时间。如果时间早于当前时间。第二天已定。|
|开始 |开始 |开始倒计时 |
|停止 |停止 |停止倒计时。倒计时时间重置为设置|
|暂停 |暂停 |暂停倒计时 |
|结束 |结束 |停止倒计时。倒计时设置为 0 |
| setstop2timer | setstop2timer |将停止行为配置设置为计时器 |
| setstop2zero | setstop2zero |将停止行为配置设置为零 |
|保存 |保存 |将 datapoints 中定义的配置保存到 iobroker 配置中 |
| | | iobroker 自动保存后重启适配器 |

##### 倒数计时器设置值的格式
您可以将倒计时设置为无限时间。
该值的表示法是 [days:[hours:[minutes:[seconds]]]] 天，小时和分钟是可选的。
如果您想将计时器设置为一天，您必须设置小时、分钟和秒，并且您不必遵守正常值范围（例如小时 0-24）。你也可以设置48小时。
如果你愿意，你可以设置不规则的时间符号。时间分别总结

**例子**

|设置 |描述 |
|-----------|---------------------------------------------|
| 1:0:0:0 |设置/添加/减去 1 天到计时器 |
| 2:0:0 |设置/添加/减去 2 小时到计时器 |
| 3:0 |设置/添加/减去 3 分钟到计时器 |
| 120 |设置/添加/减去 120 秒到计时器 |
| 48:0:0 |设置/添加/减去 48 小时到计时器 |
| 48:75:120 |设置/添加/减去计时器 |

##### 模板的格式以格式化小部件中的倒计时输出
可以使用以下占位符：

|占位符 |描述 |
|-------------|-----------------------------------------------------------------|
| d |没有前导零的日子|
| dd |前导零的日子|
| H |没有前导零的小时 |
| HH |带前导零的小时 |
|米 |没有前导零的分钟|
|毫米 |带前导零的分钟 |
|小号 |没有前导零的秒 |
|不锈钢 |带前导零的秒 |
| \ |如果要在输出中使用占位符，请转义字符 |

**例子**

以下所有带有倒数计时器 1:2:3:4 的示例

|模板 |示例 |结果 |
|-----------------------|-------------------|--------------------------------------------------|
| d\d Hh m\m s\s | 1d 2h 3m 4s |带转义字符且不带前导零 |
| dd\d HHh mm\m ss\s | 01d 02h 03m 04s |带有转义字符和前导零 |
| ss\s | 93784s |只有几秒钟|
| dd\d HH\h | 01d 02h |只有几天和几小时|
|高\h 毫米\米 | 26 小时 03 分 |只有小时和分钟|

### 小部件
#### 小部件倒计时平原
用于纯文本输出的倒计时小部件

##### 小部件属性
###### Oid 倒计时数据点的计时器数据点。
###### Format 格式化定时器输出。默认为 mm:ss。详情见章节格式模板
##### 示例小部件代码
这些小部件已针对名为 test 的倒计时进行了预配置。

```
[{"tpl":"tplMyTimeCountdownPlain","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"countdown_oid":"mytime.0.Countdown.test.timer","format":"d H m s"},"style":{"left":"771px","top":"143px","width":"151px","height":"16px"},"widgetSet":"mytime"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"+10s","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"+10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"742px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"-10s","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"-10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"801px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"=10","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"=10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"864px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"start","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"start","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"742px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"pause","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"pause","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"801px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"stop","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"stop","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"864px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"}]
```

##### 倒计时的实际动作状态（cdstop、cdrun、cdpause、cdend）可作为 CSS-Class 选择器使用。
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

#### 小部件反向倒计时平原
显示从给定时间点经过的时间的小部件

##### 小部件属性
###### datetime 开始时间的 DateTime 字符串。
表达式必须可由 javascript 函数 new Date(expression) 解释。
另请参阅 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
示例：2022-01-10 23:12 2022-01-104T23:12:00.000Z

＃＃＃＃＃＃ 格式
格式化定时器输出。默认为 mm:ss。详情见章节格式模板

###### HTML-Prepend
此文本或 html 被附加到小部件的输出中

###### HTML-Append 此文本或 html 附加到小部件的输出
#### 小部件倒计时圈
环形/圆形设计中的倒计时小部件。

##### 小部件属性
###### Oid 倒计时数据点的计时器数据点。
###### Notimetext 禁用极地时钟上的时间文本
###### Format 格式化定时器输出。默认为 mm:ss。详情见章节格式模板
###### 用于增大或缩小环/圆的反向设置
###### 宽度 环或圆的宽度。
###### 环间隙 环之间的像素间隙
###### 圆环/圆端的 Caps 设置：圆形或直线
###### 背景 圆环/圆的背景色
###### Foreground 环/圆的前景色
###### Showsec 显示秒环
###### Showmin 显示分钟环
###### Showhrs 显示分钟环
###### Showday 显示天环
##### 倒计时的实际动作状态（cdstop、cdrun、cdpause、cdend）可作为 CSS-Class 选择器使用。
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

#### 小部件倒计时翻转时钟
机场翻转板样式的倒计时小部件

##### 小部件属性
###### Oid 倒计时数据点的计时器数据点。
###### Countdown_showsec 显示秒部分。两个单元之间不得有间隙。
###### Countdown_showmin 显示分钟部分。两个单元之间不得有间隙。
###### Countdown_showhrs 显示小时部分。两个单元之间不得有间隙。
###### Countdown_showday 显示当天。两个单元之间不得有间隙。
###### Countdown_color 倒数计时器的颜色
###### Countdown_background_color 倒计时的背景色
###### Countdown_dot_color 倒计时点的颜色
＃＃＃＃＃ 尖端
如果要调整倒计时翻转时钟的大小，可以在 vis 中的 css 设置下输入半尺寸：Group CSS-Common / transform "scale(0.5)"

##### 倒计时的实际动作状态（cdstop、cdrun、cdpause、cdend）可作为 CSS-Class 选择器使用。
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

#### 小部件倒计时 NixieClock
Nixie-Tube/LED 风格的倒计时小部件

##### 小部件属性
###### Oid
倒计时数据点的计时器数据点。

###### Countdown_showsec 显示秒部分。两个单元之间不得有间隙。
###### Countdown_showmin 显示分钟部分。两个单元之间不得有间隙。
###### Countdown_showhrs 显示小时部分。两个单元之间不得有间隙。
###### Countdown_showday 显示当天。两个单元之间不得有间隙。
###### Countdown_color_active 倒数计时器的颜色
###### Countdown_color_inactive 非活动数字的颜色
###### Countdown_opacity_inactive 非活动数字颜色的不透明度
###### Countdown_glowcolor 数码管周围发光的颜色
#### 小部件字时钟
一个显示带有许多选项的字时钟的小部件

##### 小部件属性
＃＃＃＃＃＃ 语
字时钟有一些不同的语言可供选择

###### 突出显示单词的字母激活颜色
###### LetterDeactivated 普通字母的颜色
###### WordclockMargin 字时钟和 LED 之间的边距
###### WithMinutes 在字时钟的角落显示分钟 LED
###### MinuteSize 分钟 LED 的像素大小
###### MinuteColor 分钟 LED 的颜色
###### WithSeconds 显示字时钟的秒 LED
###### SecondSize 秒 LED 的像素大小
###### SecondColor 秒 LED 的颜色
###### Timezone 显示所选时区的时间
＃＃＃＃＃ 尖端
如果要调整倒计时nixieclock的大小，可以在vis的css设置下输入半尺寸：Group CSS-Common / transform "scale(0.5)"

##### 倒计时的实际动作状态（cdstop、cdrun、cdpause、cdend）可作为 CSS-Class 选择器使用。
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

＃＃ 去做
* 7段显示
*滚动数字
* 可自定义的字体
* ts：排除时间规则（时间范围，单个日期）
* ~~为字时钟添加时区~~
* ~~字时钟计时器~~
* ~~定时调度器：计划单个日期/时间和像outlook这样的重复事件~~
* ~~Nixie风格~~
* ~~翻转板展示（airport-display）~~
* ~~新命令只设置没有日期的目标时间~~
* ~~倒计时圆圈小部件，带有禁用倒计时文本的选项
* ~~组分隔符'.'名义上~~
* ~~极地钟~~
* ~~循环反转~~
* ~~带圆帽的圆圈~~

## Changelog

### 0.7.12
* add html_prepend and html_append properties to the widget reverse countdown
### 0.7.10
* add widget reverse countdown
### 0.7.9
* add more wordclock tests
* fix wordclock matrix swiss
### 0.7.8
* add timezone for wordclock
### 0.7.7
* add timezone for wordclock
### 0.7.6
* add tests for wordclock * remove admin tab
### 0.7.5
* Remove comments in io-package
### 0.7.4
* fix spanish language pack
### 0.7.3
* * add turkish language for wordclock
### 0.7.2
* * add russian and espaniol language for wordclock
### 0.7.1
* add margin property for wordclock * add italiano and francais for wordclock * wordclock remove border
### 0.7.0
* New widget wordclock
### 0.6.1
* remove beta tag from widgets * m,assive reengeneering of the react classes, add functions für exclusion rules, adding single time events and exclude single time events
### 0.6.0
* Introduction of new functionality timeseries
### 0.5.2
* fix an issue and introduce a new command save to save the configuration defined in datapoints to the iobroker configuration data
### 0.5.1
* Migration of old counters
### 0.5.0
* Change settings dialog to react
### 0.4.2
* performance optimization. mytime now checks the data from internal and did not read the data allways from datapoints | update dependencies
### 0.4.1
* widget cd flipclock: remove dot labels
### 0.4.0
* New widget NixieClock
### 0.3.1
* remove mytime tile in iobroker overview
* set initial visual countdown value to 0
* prefix css classes, due css artefacts from other adapters (eg kodi and css class stop)
### 0.3.0
* new command to set only target time without date
* countdown circle widget now with option to disable countdown text
* timers are now groupable in subdirectories. you can now enter dots (.) as a groupseperater in the name of a timer
### 0.2.1
* fix timer display in configuration dialog
* fix default template of countdown plain
* add icons for countdonw plain and countdown circle widgets 
* fix startangle calculation for countdown circle if time values are 0
* remove timer intervals in editmode due to interfer with the configuration dialog and didnt save the ne values
### 0.2.0
* extend the countdown circle with more rings for days, hours and minutes
### 0.1.2
* Setting for growing or shrinking the ring/circle
* Setting for the ends of the ring/circle: round or straight
* Extend special char filtering with umlauts
* Fix state request issue in widget countdown circle 
### 0.1.1
* Add a countdown name datapoint
### 0.1.0
* Forum release
### 0.1.0
* initial release

## License
MIT License

Copyright (c) 2020 oweitman <oweitman@gmx.de>

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