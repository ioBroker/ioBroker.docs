---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis/README.md
title: 可视化
hash: tjdnVerbGCXnTiD95xeu8HV7Wjq0L5ar4B3x/y5fwNM=
---
![标识](../../../en/adapterref/iobroker.vis/admin/vis.png)

![安装数量](http://iobroker.live/badges/vis-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.vis.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis.svg)
![NPM](https://nodei.co/npm/iobroker.vis.png?downloads=true)

# 可视化
ioBroker 平台的 WEB 可视化。

## 安装和文档
![演示界面](img/user0.png)![演示界面](../../../en/adapterref/iobroker.vis/img/user7.png)

[在线演示](https://iobroker.click/)

## 对象的绑定
通常，大多数小部件都具有 ObjectID 属性，该属性可以与对象 ID 的某个值绑定。
但是对于如何将小部件的 *any* 属性绑定到某些 ObjectID，还有另一种选择。

只需写入属性 `{object.id}` ，它就会（不在编辑模式下）绑定到该对象的值。
如果你使用特殊格式，你甚至可以用它做一些简单的操作，例如乘法或格式化。
彭定康具有以下格式：

```
{objectID;operation1;operation2;...}
```

支持以下操作：

- `\*` - 相乘。参数必须放在方括号中，例如“*(4)”。在此示例中，我们将该值乘以 4。
- `\+` - 添加。参数必须放在方括号中，例如“+(4.5)”。在此示例中，我们将值添加到 4.5。
- `\-` - 减去。参数必须放在方括号中，例如“-(-674.5)”。在此示例中，我们从值 -674.5 中减去。
- `/` - 除法。参数必须放在方括号中，例如“/(0.5)”。在此示例中，我们将值除以 0.5。
- `%` - 取模。参数必须放在方括号中，例如“%(5)”。在此示例中，我们采用 5 的模数。
- `round` - 舍入值。
- `round(N)` - 在点后用 N 位舍入值，例如34.678；回合（1）=> 34.7
- `hex` - 将值转换为十六进制值。所有字母均为小写。
- `hex2` - 将值转换为十六进制值。所有字母均为小写。如果值小于 16，那么将添加前导零。
- `HEX` - 与十六进制相同，但大写。
- `HEX2` - 与 hex2 相同，但大写。
- `date` - 根据给定的格式格式化日期。格式与 [iobroker.javascript](https://github.com/iobroker/iobroker.javascript/blob/master/README.md#formatdate) 中的相同
- `min(N)` - 如果值小于 N，取 N，否则取值
- `max(M)` - 如果值大于 M，取 M，否则取值
- `sqrt` - 平方根
- `pow(n)` - N 的幂。
- `pow` - 2 的幂。
- `floor` - Math.floor
- `ceil` - Math.ceil
- `random(R)` - Math.random() * R，如果没有参数则只是 Math.random()
- `formatValue(decimals)` - 根据系统设置格式化值并使用小数
- `date(format)` - 将值格式化为日期。格式如下：“YYYY-MM-DD hh:mm:ss.sss”
- `momentDate(format, useTodayOrYesterday)` - 使用 Moment.js 将值格式化为日期。 [必须根据 moment.js 库输入批准的格式](https://momentjs.com/docs/#/displaying/format/)。使用“useTodayOrYesterday=true”时，“moment.js”格式的“ddd”/“dddd”会被今天/昨天覆盖
- `array(element1,element2[,element3,element4])` - 返回索引的元素。例如：`{id.ack;array(ack 为假，ack 为真)}`

您可以在任何文本中使用此模式，例如

```
My calculations with {objectID1;operation1;operation2;...} are {objectID2;operation3;operation4;...}
```

或颜色计算：

```
#{objectRed;/(100);*(255);HEX2}{objectGreen;HEX2}{objectBlue;HEX2}
```

要显示对象的时间戳，请在对象 ID 的末尾写入 `.ts` 或 `.lc`（用于最后更改），例如：

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

注意类型。它们都被定义为字符串。可以肯定的是，该值将被视为使用 parseFloat 函数的数字。

```
Hypotenuse of {height} and {width} = {h:height;w:width;Math.max(20, Math.sqrt(Math.pow(parseFloat(h), 2) + Math.pow(parseFloat(w), 2)))}
```

### 特殊绑定
有许多不同的内部绑定可以在视图中提供额外的信息：

* `username` - 显示登录用户
* `view` - 实际视图的名称
* `wname` - 小部件名称
* `widget` - 是一个包含小部件所有数据的对象。只能在 JS 部分使用，如`{a:a;widget.data.name}`
* `wid` - 实际小部件的名称
* `language` - 可以是 `de`、`en` 或 `ru`。
* `instance` - 浏览器实例
* `login` - 是否需要登录（例如，显示/隐藏注销按钮）
* `local_*` - 如果状态名称从 `local_` 开始，它不会报告给 ioBroker，但会更新所有小部件，这取决于该状态。 （当前浏览器会话的局部变量）

注意：要在计算中使用“:”（例如在字符串公式中），请改用“::”。

**记住**，样式定义将被解释为绑定，因此请使用 `{{style: value}}` 或仅

```
{
	style: value
}
```

为了那个原因。

## 过滤器
要在一个视图上可视化所有小部件的数量，您可以使用过滤器来减少同时显示在视图上的小部件的数量。

每个小部件都有一个字段 `filter`。如果您将其设置为某个值，例如`light`，因此您可以使用其他小部件 `(bars - filters, filter - dropdown)` 来控制哪个过滤器实际处于活动状态。

## 控制界面
Vis 创建了 3 个变量：

- `control.instance` - 如果必须控制每个浏览器，则应在此处编写浏览器实例或 `FFFFFFFF`。
- `control.data` - 命令的参数。具体见命令说明。
- `control.command` - 命令名称。写入此变量会触发命令。这意味着在写入命令之前，“实例”和“数据”必须准备好数据。

命令：

* `alert` - 在 vis 中显示一个警告窗口。 “control.data”具有以下格式“消息；标题；jquery-icon”。标题和 jquery-icon 是可选的。可以在 [此处](http://jqueryui.com/themeroller/) 找到图标名称。要显示图标“ui-icon-info”，请写“Message;;info”。
* `changeView` - 切换到所需的视图。 “control.data”必须有视图名称。您也可以将项目名称指定为“project/view”。默认项目是“main”。
* `refresh` - 重新加载 vis，例如在项目更改为在所有浏览器上重新加载之后。
* `reload` - 与刷新相同。
* `dialog` - 显示对话窗口。对话框必须存在于视图中。之一：

    -`静态-HTML-对话框`，
    -`静态-图标-对话框`，
    - `container - HTML - view in jqui Dialog`,
    - `container - ext cmd - view in jqui Dialog`,
    - `container - Icon - view in jqui Dialog`,
    - `container - Button - view in jqui Dialog`。

    `control.data` 必须有对话框小部件的 ID，例如`w00056`。

*`对话框关闭`
* `popup` - 打开一个新的浏览器窗口。链接必须在 `control.data` 中指定，例如http://google.com
* `playSound` - 播放声音文件。文件的链接在“control.data”中指定，例如http://www.modular-planet.de/fx/marsians/Marsiansrev.mp3。

  您可以在 vis 中上传自己的文件并让它播放，例如 `/vis.0/main/img/myFile.mp3`。

如果用户更改视图或在开始时，变量将由 vis 填充

- `control.instance`：浏览器实例和 `ack=true`
- `control.data`：以`project/view`形式的项目和视图名称，例如`main/view`（和 `ack=true`）
- `control.command`：`changedView` 和 `ack=true`

您可以将 JSON 字符串或对象写入 `control.command` 作为 `{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}`。在这种情况下，实例和数据将从 JSON 对象中获取。

javascript 适配器示例：

```
setState('vis.0.control.command', {"instance": "*", "command": "refresh", "data": ""});
```

＃＃ 默认视图
您可以为每个视图定义所需的分辨率（菜单=>工具=>分辨率）。
这只是编辑模式下的可视边框，用于向您显示某些特定设备上的屏幕尺寸。在实时模式下，它是不可见的，边界外的所有小部件都是可见的。

此外，您可以定义此视图是否必须用作此解决方案的默认值。

所以每次调用 `index.html`（没有 `#viewName`）时，将打开最适合该分辨率的视图。
如果只有一个视图有 *"Default"* 标志，那么这个视图将独立于屏幕分辨率或方向打开。

例如，您可以创建两个视图“Landscape-Mobile”和“Portrait-Mobile”，当您更改方向或屏幕尺寸时，这两个视图将自动切换。

有一个帮助小部件“基本 - 屏幕分辨率”，它显示实际屏幕分辨率和最适合该分辨率的默认视图。

## 设置
### 如果睡眠时间超过，则重新加载
有一个规则，在断线一段时间后，会重新加载整个VIS页面来同步项目。
您可以在菜单“设置...”中配置它。如果您将间隔设置为“从不”，那么页面将永远不会重新加载。

### 重连间隔
如果断开连接，设置连接尝试之间的间隔。如果设置为 2 秒，它将每 2 秒尝试建立连接。

### 黑暗的重新连接屏幕
有时（在晚上）需要有黑暗的加载屏幕。使用此选项，您可以设置它。

请注意，这些设置仅对重新连接有效，对第一次连接无效。

![黑暗的](../../../en/adapterref/iobroker.vis/img/dark_screen.png)

<!-- 下一个版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### 2.0.27 (2023-05-08)
* (bluefox) Corrected errors

### 2.0.10 (2022-12-01)
* (bluefox) Added the file browser

### 2.0.8 (2022-11-26)
* (bluefox) Improved the error handling

### 2.0.0 (2022-10-21)
* (bluefox) Completely new visualization, but compatible with the previous version

### 1.4.15 (2022-04-10)
* (bluefox) Better check of the offline license

### 1.4.14 (2022-03-31)
* (bluefox) Corrected GUI bug

### 1.4.13 (2022-03-22)
* (pascal-hari) The group attributes will be replaced recursively

## License
To use this adapter in `ioBroker` you need to accept the source code license of the adapter. The source code of this adapter is available under the CC BY-NC license.

Additionally, you need a license to use the adapter. The following license editions are available on https://iobroker.net/www/pricing 
* **Community-License: Free for private use!**: Get a free license by registering an account on [https://iobroker.net](https://iobroker.net). The license if checked online against the ioBroker license server when the vis adapter is started, so an online connection at this time point is required!
* **Private use Offline-License**: For paying a small support fee, you can get rid of the required online license check on adapter startup. **Only for Private use!**
* **Commercial License**: When using Vis in a commercial environment or selling Vis as part of ioBroker packages to your customers, this license is for you. License check is also not requiring an online connection.

## License
 Copyright (c) 2013-2023 bluefox, https://github.com/GermanBluefox <dogafox@gmail.com>,
 
 Copyright (c) 2013-2014 hobbyquaker, https://github.com/hobbyquaker <hobbyquaker@gmail.com>,
 
 Creative Common Attribution-NonCommercial (CC BY-NC)

 http://creativecommons.org/licenses/by-nc/4.0/

![CC BY-NC License](https://github.com/GermanBluefox/DashUI/raw/master/images/cc-nc-by.png)

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).