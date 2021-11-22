---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis/README.md
title: 可视化
hash: kZvMm0nxMRyvPu/c82Yj+LYf+ikbthYZ/GRRZUdVZQY=
---
![标识](../../../en/adapterref/iobroker.vis/admin/vis.png)

![安装数量](http://iobroker.live/badges/vis-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.vis.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis.svg)
![新产品管理](https://nodei.co/npm/iobroker.vis.png?downloads=true)

# 可视化
ioBroker 平台的 WEB 可视化。

## 安装和文档
![演示界面](img/user0.png)![演示界面](../../../en/adapterref/iobroker.vis/img/user7.png)

[在线演示](https://iobroker.click/)

## 对象绑定
通常，大多数小部件都有 ObjectID 属性，该属性可以与某个对象 ID 值绑定。
但是还有另一种选择如何将小部件的 *any* 属性绑定到某个 ObjectID。

只需写入属性 ```{object.id}``` ，它就会被绑定（不在编辑模式下）到这个对象的值。
如果你使用特殊格式，你甚至可以用它做一些简单的操作，例如乘法或格式化。
模式具有以下格式：

```
{objectID;operation1;operation2;...}
```

支持以下操作：

- `\*` - 乘法。参数必须在方括号中，如“*(4)”。在此示例中，我们将 value 乘以 4。
- `\+` - 添加。参数必须在方括号中，例如“+(4.5)”。在此示例中，我们添加到值 4.5。
- `\-` - 减去。参数必须在方括号中，例如“-(-674.5)”。在此示例中，我们从值 -674.5 中减去。
- `/` - 分割。参数必须在方括号中，如“/(0.5)”。在此示例中，我们将值除以 0.5。
- `%` - 取模。参数必须在方括号中，例如“%(5)”。在此示例中，我们取模 5。
- `round` - 舍入值。
- `round(N)` - 在点之后用 N 个位置舍入值，例如34.678；轮（1）=> 34.7
- `hex` - 将值转换为十六进制值。所有字母都是小写的。
- `hex2` - 将值转换为十六进制值。所有字母都是小写的。如果值小于 16，则将添加前导零。
- `HEX` - 与十六进制相同，但大写。
- `HEX2` - 与 hex2 相同，但大写。
- `date` - 根据给定的格式格式化日期。格式与 [iobroker.javascript](https://github.com/iobroker/iobroker.javascript/blob/master/README.md#formatdate) 中的相同
- `min(N)` - 如果值小于 N，则取 N，否则取值
- `max(M)` - 如果值大于 M，则取 M，否则取值
- `sqrt` - 平方根
- `pow(n)` - N 的幂。
- `pow` - 2 的幂。
- `地板` - Math.floor
- `ceil` - Math.ceil
- `random(R)` - Math.random() * R，或者只是 Math.random() 如果没有参数
- `formatValue(decimals)` - 根据系统设置格式化值并使用小数
- `date(format)` - 将值格式化为日期。格式类似于：“YYYY-MM-DD hh:mm:ss.sss”
- `momentDate(format, useTodayOrYesterday)` - 使用 Moment.js 将值格式化为日期。 [批准的格式必须根据moment.js库输入](https://momentjs.com/docs/#/displaying/format/)。使用`useTodayOrYesterday=true`，momentjs 格式`ddd`/`dddd` 被今天/昨天覆盖
- `array(element1,element2[,element3,element4])` - 返回索引的元素。例如：`{id.ack;array(ack is false,ack is true)}`

您可以在任何文本中使用此模式，例如

```
My calculations with {objectID1;operation1;operation2;...} are {objectID2;operation3;operation4;...}
```

或颜色计算：

```
#{objectRed;/(100);*(255);HEX2}{objectGreen;HEX2}{objectBlue;HEX2}
```

要在对象 ID 的末尾显示对象写入 `.ts` 或 `.lc`（用于最后一次更改）的时间戳，例如：

```
Last change: {objectRed.lc;date(hh:mm)}
```

还有另一种写模式的可能性：

```
Hypotenuse of {height} and {width} = {h:height;w:width;Math.max(20, Math.sqrt(h*h + w*w))}
```

`{h:height;w:width;h*w}` 将被解释为函数：

```
value = (function () {
    var h = "10";
    var w = "20";
    return Math.max(20, Math.sqrt(h*h + w*w));
})();
```

您可以使用*任何* javascript 函数。参数必须用':'定义，否则将被解释为公式。

注意类型。所有这些都定义为字符串。可以肯定的是，该值将被视为数字使用 parseFloat 函数。

```
Hypotenuse of {height} and {width} = {h:height;w:width;Math.max(20, Math.sqrt(Math.pow(parseFloat(h), 2) + Math.pow(parseFloat(w), 2)))}
```

### 特殊绑定
有许多不同的内部绑定可以在视图中提供附加信息：

* `username` - 显示登录用户
* `view` - 实际视图的名称
* `wname` - 小部件名称
* `widget` - 是一个包含所有小部件数据的对象。只能在JS部分使用，比如`{a:a;widget.data.name}`
* `wid` - 实际小部件的名称
* `language` - 可以是 `de`、`en` 或 `ru`。
* `instance` - 浏览器实例
* `login` - 是否需要登录（例如显示/隐藏注销按钮）
* `local_*` - 如果状态名称从 `local_` 开始，它不会报告给 ioBroker，但会更新所有小部件，这取决于此状态。 （当前浏览器会话的局部变量）

注意：要在计算中使用“:”（例如在字符串公式中），请改用“::”。

**记住**，样式定义将被解释为绑定，所以使用 `{{style: value}}` 或只是

```
{
	style: value
}
```

为了那个原因。

## 过滤器
要在一个视图上可视化所有小部件，您可以使用过滤器来减少视图上同时显示的小部件数量。

每个小部件都有一个字段 `filter`。如果您将其设置为某个值，例如`light`，因此您可以使用其他小部件 `(bars - filters, filter - dropdown)` 来控制实际处于活动状态的过滤器。

##控制界面
Vis 创建了 3 个变量：

- `control.instance` - 如果每个浏览器都必须被控制，这里应该写浏览器实例或者`FFFFFFFF`。
- `control.data` - 命令参数。见具体命令说明。
- `control.command` - 命令名称。写这个变量会触发命令。这意味着在写入命令之前，“实例”和“数据”必须准备好数据。

命令：

* `alert` - 在 vis 中显示警报窗口。 “control.data”具有以下格式“message;title;jquery-icon”。标题和 jquery-icon 是可选的。图标名称可以在 [here](http://jqueryui.com/themeroller/) 中找到。显示图标“ui-icon-info”写```Message;;info```。
* `changeView` - 切换到想要的视图。 “control.data”必须具有视图名称。您也可以将项目名称指定为“项目/视图”。默认项目是“主”。
* `refresh` - 重新加载 vis，例如在项目更改为在所有浏览器上重新加载后。
* `reload` - 与刷新相同。
* `dialog` - 显示对话窗口。对话框必须存在于视图中。之一：

    - `静态 - HTML - 对话框`，
    -`静态-图标-对话框`，
    - `容器 - HTML - 在 jqui 对话框中查看`，
    - `container - ext cmd - 在 jqui 对话框中查看`，
    -`容器-图标-在jqui对话框中查看`，
    - `容器 - 按钮 - 在 jqui 对话框中查看`。

    `control.data` 必须有对话框小部件的 id，例如`w00056`。

* `对话框关闭`
* `popup` - 打开一个新的浏览器窗口。链接必须在 `control.data` 中指定，例如http://google.com
* `playSound` - 播放声音文件。文件链接在“control.data”中指定，例如http://www.modular-planet.de/fx/marsians/Marsiansrev.mp3。

  你可以在 vis 中上传你自己的文件，让它像 `/vis.0/main/img/myFile.mp3` 一样播放。

如果用户更改视图或在开始时变量将由 vis 填充

- `control.instance`：浏览器实例和 `ack=true`
- `control.data`：形式为`project/view`的项目和视图名称，例如`main/view`（和 `ack=true`）
- `control.command`: `changedView` 和 `ack=true`

您可以将 JSON 字符串或对象写入 `control.command` 作为 `{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}`。在这种情况下，实例和数据将从 JSON 对象中获取。

javascript 适配器示例：

```
setState('vis.0.control.command', {"instance": "*", "command": "refresh", "data": ""});
```

＃＃ 默认视图
您可以为每个视图定义所需的分辨率（菜单=>工具=>分辨率）。这只是编辑模式下的视觉边框，用于向您显示某些特定设备上的屏幕大小。在实时模式下，它将不可见，边界外的所有小部件都将可见。

此外，您可以定义是否必须将此视图用作此分辨率的默认值。

所以每次调用 `index.html`（没有 `#viewName`）时，都会打开最适合这个分辨率的视图。
如果只有一个视图具有 *"Default"* 标志，则此视图将独立于屏幕分辨率或方向打开。

例如。您可以创建两个视图“横向移动”和“纵向移动”，当您更改方向或屏幕大小时，这两个视图将自动切换。

有一个帮助小部件“基本 - 屏幕分辨率”，可显示实际屏幕分辨率和最适合该分辨率的默认视图。

##设置
### 如果睡眠时间超过
有一个规则，在断开连接一段时间后，整个 VIS 页面将重新加载以同步项目。
您可以在菜单“设置...”中对其进行配置。如果您将时间间隔设置为“从不”，则永远不会重新加载页面。

###重新连接间隔
如果断开连接，设置连接尝试之间的间隔。如果设置为 2 秒，它将每 2 秒尝试建立一次连接。

### 黑暗的重新连接屏幕
有时（在夜间）需要有黑暗的加载屏幕。使用此选项，您可以设置它。

请注意，这些设置仅对重新连接有效，对第一次连接无效。

![黑暗的](../../../en/adapterref/iobroker.vis/img/dark_screen.png)

<!-- 下一版本的占位符（在行首）：

### __工作进行中__ -->
### 1.4.6 (2021-11-20)
* (bluefox) 即使没有互联网也添加了许可证检查

### 1.4.5 (2021-10-08)
* (jens-maus) 向 content-security-policy 标头添加了 frame-src 规范，修复了与框架相关的内容阻塞问题（例如，使用 KioskPro iOS 应用程序）。
* (bluefox) 通过许可证检查显示扩展错误消息
* (Scrounger) 补丁可见性 oid 绑定

### 1.4.4 (2021-08-31)
* (jobe451) 允许在绑定对象 ID 中有“:”

### 1.4.3 (2021-07-11)
* (bluefox) 添加了离线检查许可证的可能性（仅特殊一次）

### 1.4.0 (2021-07-01)
* (bluefox) 更改了证书检查的路径
* (thost96) 修复了适配器检查器发现的问题

### 1.3.10 (2021-05-25)
* (bluefox) 修复了对 admin5 的支持

### 1.3.9 (2021-04-29)
* (agav99) 添加了对本地浏览器变量的支持
* (Scrounger) 修复了宽度和高度中的 null 和 NaN 值的错误
* (bluefox) 添加了对 admin5 的支持

### 1.3.8 (2021-03-03)
* (bluefox) 修复了 iOS Safari 和 android 上的播放声音
* (Scrounger) visEditInspect: 添加格式维度
* (foxriver76) 用 GitHub 操作替换 travis 和 appveyor
* (Excodibur) 允许资源作为 blob 加载
* (Excodibur ) 允许资源作为 blob 加载

### 1.3.7 (2021-01-20)
* (Scrounger) 错误修正 - 在 JSON 字符串中绑定

### 1.3.6 (2020-12-13)
* (twonky4) 更正：旧浏览器问题
* (rbaranga) 更正：在 iOS Safari 上播放声音
* (Scrounger) 添加了可选参数以支持 Material Design Widgets

### 1.3.4 (2020-10-04)
* (foxriver76) 更正了旧设备上的错误

### 1.3.3 (2020-09-21)
* (bluefox) 返回去抖动设置
* (bluefox) 更正了 {username} 绑定的错误
* (bluefox) 修复了“显示上次更改”选项

### 1.3.1 (2020-09-18)
* (bluefox) 为输入小部件添加了自动对焦选项

### 1.3.0 (2020-09-17)
* (foxriver76) 在挂起的 getStates 上，重试而不是丢弃
* (foxriver76) 修复了文件管理器的拼写错误
* (Scrounger) 为绑定添加了 momentDate

### 1.2.12 (2020-09-08)
* (foxriver76) 只解析数组和 json 对象，不解析布尔值、普通字符串等

### 1.2.11 (2020-08-25)
* (bluefox) 关于未找到图表视图的错误消息已修复。

### 1.2.10 (2020-08-23)
* (gsicilia82/fceller) JSON 字符串将在 VIS 绑定中解析

### 1.2.9 (2020-08-22)
* (bluefox) 图表现在支持

### 1.2.6 (2020-03-22)
* (bluefox) 如果无法解析许可证，则添加了更好的错误消息

### 1.2.4 (2020-02-11)
* (bluefox) 表格小部件使用选定的对象 ID 进行了扩展。

### 1.2.3 (2019-12-14)
* (bluefox) 对许可证处理进行了小幅更改

### 1.2.2 (2019-10-27)
* (bluefox) js-controller 2.0 的准备工作。检查未定义和空值。

### 1.2.1 (2019-09-10)
* (bluefox) 固定上传文件

### 1.2.0 (2019-05-07)
* (bluefox) 添加翻译

### 1.1.11 (2019-02-07)
* (bluefox) 改进 Bool HTML

### 1.1.10 (2019-01-30)
* 添加中文支持

### 1.1.8 (2018-10-29)
* (bluefox) 文件对话框已更正

### 1.1.7 (2018-07-24)
* (bluefox) view8 更正

### 1.1.6 (2018-07-18)
* (bluefox) 支持新变量（见 [特殊绑定](#special-bindings) ）
* (bluefox) 修复快速视图更改时的错误
* (bluefox) 修复“jqui - ctrl - IconState / val - Icon Bool”

### 1.1.5 (2018-06-10)
* (bluefox) 如果无法呈现小部件，则显示更多信息
* (bluefox) 修复小部件的保存（如果它们有绑定）
* (bluefox) 显示错误堆栈
* (bluefox) 修复绑定
* (Apollon77) 修复测试
* (bluefox) 修复了 iobroker.pro 和外部 socket.io 设置
* (bluefox) 一个用户变量被添加到绑定中。
* (bluefox) 固定小部件选项卡

### 1.1.4 (2018-04-23)
* (bluefox) 修复 bool SVG

### 1.1.3 (2018-04-12)
* (bluefox) 通过在触摸设备上滚动来忽略点击
* (bluefox) 移除错误状态 vis.0.command
* (bluefox) 使用 jPlot 修复错误
* (bluefox) 在编辑模式下更好的小部件行为（基本，jqui）
* 修复配置对话框

### 1.1.2 (2018-02-02)
* (bluefox) 修复项目保存问题
* (bluefox) 修复背景选择器
* (bluefox) 修复空指针问题
* (bluefox) 修复选择助手
* 更新翻译

### 1.1.1 (2018-01-07)
* (bluefox) 修复了触摸设备上视图变化的问题

### 1.0.5 (2017-11-19)
* (bluefox) 显示每个项目中的数据点数

### 1.0.4 (2017-10-22)
* (bluefox) 为视图 CSS 选项添加自动完成功能
* (bluefox) 更改视图 CSS 背景选项的编辑

### 1.0.3 (2017-10-20)
* (bluefox) 修复无效绑定的解析
* (bluefox) 添加moment.js

### 1.0.0 候选版本 (2017-10-13)
* (bluefox) 修复 iframe 和图像更新
* (bluefox) 修复字体

### 0.15.7 (2017-10-01)
* (bluefox) 允许在没有额外查询的情况下更新图像（但它仅适用于某些非常特定的情况）
* (bluefox) iframe 的缩放

### 0.15.5 (2017-07-24)
* (bluefox) 修复小部件上传

### 0.15.4 (2017-07-19)
* (bluefox) 添加滑动

### 0.15.3 (2017-07-12)
* (bluefox) 添加全屏小部件
* (bluefox) 修复时间戳小部件

### 0.15.2 (2017-07-07)
* (bluefox) 如果 OID 中有“-”，则修复绑定

### 0.15.1 (2017-06-30)
* (bluefox) 修复上下文菜单错误
* (bluefox) 允许添加类查看

### 0.15.0 (2017-05-25)
* (bluefox) 修复分组小部件的副本
* (bluefox) 修复订阅如果为空状态

### 0.14.7 (2017-05-19)
* (bluefox) 添加模板

### 0.14.6 (2017-05-16)
* (bluefox) 按组选择修复错误
* (apollon77) 修复 jqui-dialog 以自动打开

### 0.14.3 (2017-05-11)
* (bluefox) 修复分组小部件的导出/导入

### 0.14.2 (2017-04-29)
* (bluefox) 修复安装错误

### 0.14.1 (2017-04-27)
* (bluefox) 将 beta 移至 main
* (bluefox) 修复选择过滤器
* (bluefox) 如果某些视图不存在，则修复错误
* (bluefox) 修复绑定问题，例如“a:-45?0”也被检测为变量。
* (bluefox) 修复一些字体大小
* (bluefox) 修复撤销
* (bluefox) 修复主题更改
* (bluefox) 优化页面加载
* (bluefox) 检查许可证
* (bluefox) 修复基本视图 8
* (bluefox) 在对话框中打开时修复时间选择器

### 0.14.0 (2017-04-10)
* (bluefox) 添加强制许可输入

### 0.12.7 (2017-02-09)
* (bluefox) 准备测试版

### 0.12.6 (2017-01-29)
* (pmant) 修复视图副本
* (pmant) 上下文菜单的改进
* (pmant) 两个视图下拉菜单的可用性改进
* (bluefox) 拖动的小修复

### 0.12.6 (2017-01-29)
* (pmant) 向视图栏添加下拉菜单
* (pmant) 按名称排序小部件小部件选择器
* (bluefox) 修复信号和可见性中的 groupAttr

### 0.12.2 (2016-12-04)
* (bluefox) 修复分组错误

### 0.12.1 (2016-11-30)
* (bluefox) 修复容器错误

### 0.12.0 (2016-11-24)
* (bluefox) 订阅模式以加快状态加载
* (bluefox) 添加分组

### 0.10.15 (2016-11-06)
* (bluefox) 移除 weather-adapter.html
* (bluefox) 清理 config.js
* (bluefox) 删除旧的小部件
* (bluefox) 改进应用程序中的身份验证
* (bluefox) 允许从助手小部件创建实例

### 0.10.14 (2016-10-09)
* (bluefox) 修复小部件的渲染
* (bluefox) 处理相对位置。
* (bluefox) 在删除视图之前销毁小部件

### 0.10.13 (2016-09-23)
* (bluefox) 修复了 iPad 1 的错误
* (bluefox) 开始处理相对位置

### 0.10.12 (2016-09-16)
* (bluefox) 对小部件和视图的特定可见性进行分组

### 0.10.11 (2016-09-15)
* (bluefox) 修复了 iOS 10
* (bluefox) 允许禁用组以提高性能

### 0.10.10 (2016-09-14)
* (bluefox) 添加 text2speech 小部件
* (bluefox) 尝试修复 iOS 10 的问题

### 0.10.9 (2016-09-04)
* (bluefox) 支持 web-sockets force
* (bluefox) 在 30 秒后销毁未使用的视图
* (bluefox) 如果显示顶部和底部，则不显示中间引导线
* (bluefox) 让时间戳和上次更改将时间显示为间隔

### 0.10.7 (2016-07-09)
* (bluefox) 添加设置以重新加载 vis
* (bluefox) 添加黑暗的重新加载屏幕
* (bluefox) 修复重新加载间隔
* (bluefox) 导出/导入
* (bluefox) 添加全局脚本
* (bluefox) 添加“不存在”/“不包含”/“存在”以显示信号和可见性
* (bluefox) 在编辑器中修复 OID

### 0.10.5 (2016-06-15)
* (bluefox) 修复选择 ID 对话框
* (bluefox) 添加对齐帮助行
* (bluefox) 从不以非编辑模式存储数据

### 0.10.4 (2016-06-14)
* (bluefox) 修复拖动和调整大小
* (Patrick) 修复 QuoJS
* (bluefox) 在 formatDate 中支持毫秒
* (bluefox) 支持 getHistory
* (bluefox) 支持显示历史实例
*（蓝狐）网格
* (bluefox) 添加预览

### 0.10.3 (2016-05-30)
* (bluefox) 更新 canJS
* (pmant) 修复了触摸屏上的对话框错误
* (bluefox) speedUP 在 300ms 显示属性
* (bluefox) 如果信号处于活动状态，则修复点击小部件

### 0.10.2 (2016-05-24)
* (bluefox) 修复带有时间戳的小部件

### 0.10.1 (2016-05-23)
* (bluefox) 更改版本

### 0.10.0 (2016-05-23)
* (bluefox) 翻译
* (bluefox) 修复“未选择小部件”
* (bluefox) 更改小部件图标
* (bluefox) 添加信号
* (bluefox) 为cordova 添加app.css
* (bluefox) 更改图标预览
* (bluefox) 将小部件的属性显示为图标
* (bluefox) 使用外部命令修复错误
* (bluefox) 添加类型图标来预览
* (bluefox) 支持在 iPad1 上编辑
* (bluefox) 更改安全设置

## License
To use this adapter in ioBroker you need to accept the source code license of the adapter. The source code of this adapter is available under the CC BY-NC license.

Additionally, you need a license to use the adapter. The following license editions are available on https://iobroker.net/www/pricing 
* **Community-License: Free for private use!**: Get a free license by registering an account on https://iobroker.net . The license if checked online against the ioBroker license server when the vis adapter is started, so an online connection at this timepoint is required!
* **Private use Offline-License**: For paying a small support fee you can get rid of the required online license check on adapter startup. **Only for Private use!**
* **Commercial License**: When using Vis in a commercial environment or selling Vis as part of ioBroker packages to your customers this license is for you. License check is also not requiring an online connection.

## License
 Copyright (c) 2013-2021 bluefox, https://github.com/GermanBluefox <dogafox@gmail.com>,
 
 Copyright (c) 2013-2014 hobbyquaker, https://github.com/hobbyquaker <hobbyquaker@gmail.com>,
 
 Creative Common Attribution-NonCommercial (CC BY-NC)

 http://creativecommons.org/licenses/by-nc/4.0/

![CC BY-NC License](https://github.com/GermanBluefox/DashUI/raw/master/images/cc-nc-by.png)

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).