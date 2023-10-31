---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-2/README.md
title: ioBroker 的下一代可视化：vis-2
hash: TxiWz7uMNsggg8SFkzzqiD0C8G7r0B5Ir/szynb3Mgk=
---
![标识](../../../en/adapterref/iobroker.vis-2/admin/vis-2.png)

![安装数量](http://iobroker.live/badges/vis-2-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.vis-2.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis-2.svg)
![国家公共管理](https://nodei.co/npm/iobroker.vis-2.png?downloads=true)

# IoBroker 的下一代可视化：vis-2
ioBroker 平台的 WEB 可视化。

## 安装和文档
![演示界面](img/user0.png)![演示界面](../../../en/adapterref/iobroker.vis-2/img/user7.png)

[在线演示](https://iobroker.click/)

## 对象的绑定
通常，大多数小部件都具有 ObjectID 属性，并且该属性可以与对象 ID 的某个值绑定。
但是还有另一种选择如何将小部件的*任何*属性绑定到某个ObjectID。

只需写入属性`{object.id}`，它将绑定到该对象的值。
如果您使用特殊格式，您甚至可以用它进行一些简单的操作，例如乘法或格式化。

例如，计算三角形的斜边：

`{h:javascript.0.myCustom.height;w:javascript.0.myCustom.width;Math.max(20, Math.sqrt(h*h + w*w))}` 将被解释为函数：

```
value = await (async function () {
    var h = (await getState('javascript.0.myCustom.height')).val;
    var w = (await getState('javascript.0.myCustom.width')).val;
    return Math.max(20, Math.sqrt(h * h + w * w));
})();
```

或者

`{h:javascript.0.myCustom.height;w:javascript.0.myCustom.width;h*w}`只会将高度乘以宽度。

您可以使用*任何* javascript（浏览器）函数。参数必须用':'定义，如果没有，它将被解释为公式。

注意类型。它们全部被定义为字符串。可以肯定的是，使用 parseFloat 函数该值将被视为数字。

所以我们的斜边计算将是：

```
{h:javascript.0.myCustom.height;w:javascript.0.myCustom.width;Math.max(20, Math.sqrt(Math.pow(parseFloat(h), 2) + Math.pow(parseFloat(w), 2)))}
```

### 已弃用的格式
Patten 具有以下格式：

```
{objectID;operation1;operation2;...}
```

支持以下操作：

- `*` - 相乘。参数必须放在括号中，例如“*(4)”。在此示例中，我们将该值乘以 4。
- `+` - 添加。参数必须放在括号中，例如“+(4.5)”。在此示例中，我们添加值 4.5。
- `-` - 减法。参数必须位于括号中，例如“-(-674.5)”。在此示例中，我们从值 -674.5 中减去。
- `/` - 除法。参数必须放在括号中，例如“/(0.5)”。在此示例中，我们将该值除以 0.5。
- `%` - 模数。参数必须放在括号中，例如“%(5)”。在此示例中，我们取 5 的模。
- `round` - 对值进行四舍五入。
- `round(N)` - 将点后的值四舍五入 N 位，例如 34.678;round(1) => 34.7
- `hex` - 将值转换为十六进制值。所有字母均为小写。
- `hex2` - 将值转换为十六进制值。所有字母均为小写。如果值小于 16，则将添加前导零。
- `HEX` - 与十六进制相同，但大写。
- `HEX2` - 与 hex2 相同，但大写。
- `date` - 根据给定的格式格式化日期。格式与 [iobroker.javascript](https://github.com/iobroker/iobroker.javascript/blob/master/README.md#formatdate) 中的相同
- `min(N)` - 如果值小于 N，则取 N，否则取值
- `max(M)` - 如果值大于 M，则取 M，否则取值
- `sqrt` - 平方根
- `pow(n)` - N 的幂。
- `pow` - 2 的幂。
- `floor` - Math.floor
- `ceil` - Math.ceil
- `random(R)` - Math.random() * R，或者如果没有参数则只是 Math.random()
- `formatValue(decimals)` - 根据系统设置格式化值并使用小数
- `date(format)` - 将值格式化为日期。格式如下：“YYYY-MM-DD hh:mm:ss.sss”
- `momentDate(format, useTodayOrYesterday)` - 使用 Moment.js 将值格式化为日期。 [必须根据 moment.js 库输入批准的格式](https://momentjs.com/docs/#/displaying/format/)。使用 useTodayOrYesterday=true 时，“moment.js”格式“ddd”/“dddd”将被今天/昨天覆盖
- `array(element1,element2[,element3,element4])` - 返回索引的元素。例如： `{id.ack;array(ack 为 false,ack 为 true)}`

您可以在任何文本中使用此模式，例如

```
My calculations with {objectID1;operation1;operation2;...} are {objectID2;operation3;operation4;...}
```

或颜色计算：

```
#{objectRed;/(100);*(255);HEX2}{objectGreen;HEX2}{objectBlue;HEX2}
```

要显示对象的时间戳，请在对象 ID 末尾写入 `.ts` 或 `.lc`（用于最后更改），例如：

```
Last change: {objectRed.lc;date(hh:mm)}
```

### 特殊绑定
有许多不同的内部绑定可以在视图中提供附加信息：

* `username` - 显示登录用户
* `view` - 实际视图的名称
* `wname` - 小部件名称
* `widget` - 是一个包含小部件所有数据的对象。只能在 JS 部分使用，如 `{a:a;widget.data.name}`
* `wid` - 实际小部件的名称
* `language` - 可以是 `de`、`en` 或 `ru`。
* `instance` - 浏览器实例
* `login` - 是否需要登录（例如，显示/隐藏注销按钮）
* `local_*` - 如果状态名称从 `local_` 开始，它不会报告给 ioBroker，但会更新所有小部件，这取决于此状态。 （当前浏览器会话的局部变量）

注意：要在计算中使用“：”（例如在字符串公式中），请改用“::”。

**请记住**，样式定义将被解释为绑定，因此请使用 `{{style: value}}` 或仅使用

```
{
	style: value
}
```

为了那个原因。

## 过滤器
要在一个视图上可视化所有小部件的数量，您可以使用过滤器来减少视图上同时显示的小部件的数量。

每个小部件都有一个字段`filter`。如果您将其设置为某个值，例如`light`，因此您可以使用其他小部件`(bars - filters, filter - dropdown)`来控制哪个过滤器实际上处于活动状态。

## 控制接口
Vis 创建了 3 个变量：

- `control.instance` - 如果必须控制每个浏览器，则此处应写入浏览器实例或 `FFFFFFFF`。
- `control.data` - 命令参数。具体命令参见说明。
- `control.command` - 命令名称。写入此变量会触发命令。这意味着在写入命令之前，必须准备好“实例”和“数据”数据。

命令：

* `alert` - 在 vis-2 中显示警报窗口。 “control.data”具有以下格式“message;title;jquery-icon”。标题和 jquery-icon 是可选的。图标名称可以在[此处](http://jqueryui.com/themeroller/)找到。要显示图标“ui-icon-info”，请写入`Message;;info`。
* `changeView` - 切换到所需的视图。 “control.data”必须具有视图名称。您也可以将项目名称指定为“project/view”。默认项目是“main”。
* `refresh` - 重新加载 vis-2，例如在项目更改为在所有浏览器上重新加载之后。
* `reload` - 与刷新相同。
* `dialog` - 显示对话窗口。对话框必须存在于视图中。之一：

    - `静态 - HTML - 对话框`,
    - `静态 - 图标 - 对话框`,
    - `容器 - HTML - 在 jqui 对话框中查看`,
    - `容器 - ext cmd - 在 jqui 对话框中查看`,
    - `容器 - 图标 - 在 jqui 对话框中查看`,
    - `容器 - 按钮 - jqui 对话框中的视图`。

    `control.data`必须具有对话框小部件的ID，例如`w00056`。

* `对话框关闭`
* `popup` - 打开一个新的浏览器窗口。链接必须在“control.data”中指定，例如 http://google.com
* `playSound` - 播放声音文件。文件的链接在“control.data”中指定，例如http://www.modular-planet.de/fx/marsians/Marsiansrev.mp3。

  您可以在 vis-2 中上传您自己的文件并让它播放，例如`/vis-2.0/main/img/myFile.mp3`。

如果用户更改视图或在开始时，变量将由 vis-2 填充

- `control.instance`：浏览器实例和`ack=true`
- `control.data`：项目和视图名称，格式为`project/view`，例如`main/view` （和 `ack=true`）
- `control.command`: `changedView` 和 `ack=true`

您可以将 JSON 字符串或对象写入 `control.command` 作为`{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}`。在这种情况下，实例和数据将从 JSON 对象中获取。

JavaScript 适配器示例：

```
setState('vis-2.0.control.command', {"instance": "*", "command": "refresh", "data": ""});
```

＃＃ 默认视图
您可以为每个视图定义所需的分辨率（菜单=>工具=>分辨率）。
这只是编辑模式下的视觉边框，用于向您显示某些特定设备上的屏幕尺寸。在实时模式下，它将不可见，并且边框之外的所有小部件都将可见。

此外，您还可以定义是否必须将此视图用作此分辨率的默认视图。

因此，每次调用`index.html`（没有`#viewName`）时，都会打开最适合该分辨率的视图。
如果只有一个视图具有“默认”标志，则该视图将独立于屏幕分辨率或方向打开。

例如，您可以创建两个视图“横向-移动”和“纵向-移动”，当您更改方向或屏幕尺寸时，这两个视图将自动切换。

有一个帮助小部件“基本 - 屏幕分辨率”，它显示实际的屏幕分辨率和最适合该分辨率的默认视图。

＃＃ 设置
### 如果睡眠时间超过则重新加载
有一个规则，断线一段时间后，整个VIS页面将重新加载以同步项目。
您可以在菜单“设置...”中对其进行配置。如果将间隔设置为“从不”，则页面将永远不会重新加载。

### 重新连接间隔
设置断开连接时尝试连接的时间间隔。如果设置2秒，它将每2秒尝试建立一次连接。

### 黑暗的重新连接屏幕
有时（在晚上）需要有黑暗的加载屏幕。通过这个选项，就可以设置了。

请注意，这些设置仅对重新连接有效，对首次连接无效。

![黑暗的](../../../en/adapterref/iobroker.vis-2/img/dark_screen.png)

## SVG 和当前颜色
CSS 中的 currentColor 关键字允许元素从其父元素继承当前文本颜色。
它在 SVG（可缩放矢量图形）中特别有用，因为它允许更动态的样式并且更容易与 HTML 内容集成。

您可以使用 currentColor 关键字来代替 SVG 内接受颜色值的任何属性的特定颜色值。
下面是一个 SVG 中带有圆圈的简单示例：

```xml
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="currentColor" />
</svg>
```

在这种情况下，如果 SVG 采用父元素的颜色。
例如，如果它用在菜单中并且菜单是红色的，则圆圈将为红色。

＃＃ 去做
<!-- 下一个版本的占位符（在行的开头）：

### **正在进行中** -->

## Changelog
### 2.3.3 (2023-10-30)
* (foxriver76) fixed problem, that vis is not loading if a single widget has a script error
* (bluefox) added the editor for bindings
* (bluefox) background does not used if in iframe

### 2.3.2 (2023-10-14)
* (bluefox) Allowed showing only selected widgets in edit mode
* (bluefox) Corrected the visibility calculation for old (CanJS) widgets

### 2.3.1 (2023-10-13)
* (bluefox) Corrected vertical gap between relative widgets
* (bluefox) Better input of numbers with min/max in attribute dialog

### 2.3.0 (2023-09-28)
* (bluefox) jQui widgets (many of them) were improved

### 2.2.7 (2023-09-18)
* (bluefox) Improved icon selector: you can upload your own icon directly
* (bluefox) Optimized loading: do not load unused widget sets

### 2.2.6 (2023-09-17)
* (bluefox) Date binding corrected
* (bluefox) Optimized loading of widgeteria
* (bluefox) Horizontal navigation is fixed

### 2.2.5 (2023-09-12)
* (bluefox) Implemented horizontal navigation

### 2.2.4 (2023-09-04)
* (bluefox) Corrected license checking

### 2.2.2 (2023-08-16)
* (bluefox) Changed sentry settings

### 2.2.1 (2023-08-15)
* (bluefox) Added possibility to filter widgets in edit mode
* (bluefox) Added possibility to change the order of relative widgets with drag&drop

### 2.2.0 (2023-08-14)
* (bluefox) Release candidate 1

### 2.1.7 (2023-08-10)
* (bluefox) Optimized the rendering of the widgets

### 2.1.6 (2023-07-30)
* (bluefox) First beta release

### 2.1.4 (2023-07-19)
* (bluefox) Allowed to add widgets to widgets

### 2.0.36 (2023-06-21)
* (bluefox) Added widgeteria

### 2.0.29 (2023-05-17)
* (bluefox) Corrected errors

### 2.0.10 (2022-12-01)
* (bluefox) Added the file browser

### 2.0.8 (2022-11-26)
* (bluefox) Improved the error handling

### 2.0.0 (2022-10-21)
* (bluefox) Completely new visualization, but partly compatible with the previous version

## License
To use this adapter in `ioBroker` you need to accept the source code license of the adapter. The source code of this adapter is available under the CC BY-NC license.

Additionally, you need a license to use the adapter. The following license editions are available on https://iobroker.net/www/pricing 
* **Community-License: Free for private use!**: Get a free license by registering an account on [https://iobroker.net](https://iobroker.net). The license if checked online against the ioBroker license server when the vis-2 adapter is started, so an online connection at this time point is required!
* **Private use Offline-License**: For paying a small support fee, you can get rid of the required online license check on adapter startup. **Only for Private use!**
* **Commercial License**: When using Vis in a commercial environment or selling Vis as part of ioBroker packages to your customers, this license is for you. License check is also not requiring an online connection.

## License
 Copyright (c) 2021-2023 Denis Haev, https://github.com/GermanBluefox <dogafox@gmail.com>,
  
 Creative Common Attribution-NonCommercial (CC BY-NC)

 http://creativecommons.org/licenses/by-nc/4.0/

![CC BY-NC License](https://github.com/GermanBluefox/DashUI/raw/master/images/cc-nc-by.png)

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).