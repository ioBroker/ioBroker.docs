---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-2/README.md
title: ioBroker 的下一代可视化：vis-2
hash: /LJ7Z0+VbWYKA6WbedYPK1ecLHnLys58wJKAQrnjkug=
---
![标识](../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/admin/vis-2.png)

![安装数量](http://iobroker.live/badges/vis-2-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.vis-2.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis-2.svg)
![新公共管理](https://nodei.co/npm/iobroker.vis-2.png?downloads=true)

# IoBroker 的下一代可视化：vis-2
ioBroker 平台的 WEB 可视化。

＃＃ 概述
- [许可证要求](#license-requirements)
- [安装和文档](#installation--documentation)
- [对象绑定](#bindings-of-objects)
- [过滤器](#filters)
- [控制接口](#control-interface)
- [默认视图](#default-view)
- [权限系统](#permissions-system)
- [设置](#settings)
- [SVG 和 currentColor](#svg-and-currentcolor)

## 安装和文档
![演示界面](packages/iobroker.vis-2/img/user0.png) ![演示界面](../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/img/user7.png)

[在线演示](https://iobroker.click/)

## 对象绑定
通常，大多数小部件都具有 ObjectID 属性，并且该属性可以与某个对象 ID 的值绑定。
但是，还有另一种方法可以将小部件的 *任何* 属性绑定到某个 ObjectID。

只需在属性`{object.id}`中写入（例如`{hm-rpc.0.OEQ1880105.4.ACTUAL_TEMPERATURE}`），它就会绑定到此对象的值。
如果您使用特殊格式，甚至可以对其进行一些简单的操作，例如乘法或格式化。

例如，计算三角形的斜边：

`{h:javascript.0.myCustom.height;w:javascript.0.myCustom.width;Math.max(20, Math.sqrt(h*h + w*w))}` 将被解释为函数：

```js
value = await (async function () {
    var h = (await getState('javascript.0.myCustom.height')).val;
    var w = (await getState('javascript.0.myCustom.width')).val;
    return Math.max(20, Math.sqrt(h * h + w * w));
})();
```

或者

`{h:javascript.0.myCustom.height;w:javascript.0.myCustom.width;h*w}` 将简单地将高度与宽度相乘。

您可以使用*任何* JavaScript（浏览器）函数。参数必须使用“:”定义，否则将被解释为公式。

注意类型。它们都被定义为字符串。为了确保该值会被解析为数字，请使用 parseFloat 函数。

因此我们的斜边计算如下：

```
{h:javascript.0.myCustom.height;w:javascript.0.myCustom.width;Math.max(20, Math.sqrt(Math.pow(parseFloat(h), 2) + Math.pow(parseFloat(w), 2)))}
```

### 弃用的格式
Patten 的格式如下：

```
{objectID;operation1;operation2;...}
```

支持以下操作：

- `*` - 乘法。参数必须放在括号中，例如“*(4)”。在本例中，我们将该值乘以 4。
- `+` - 添加。参数必须放在括号中，例如“+(4.5)”。在本例中，我们将值加到 4.5。
- `-` - 减法。参数必须放在括号中，例如“-(-674.5)”。在本例中，我们从值 -674.5 中减去。
- `/` - 除法。参数必须放在括号中，例如“/(0.5)”。在本例中，我们将值除以 0.5。
- `%` - 模数。参数必须放在括号中，例如“%(5)”。在本例中，我们以 5 为模。
- `round` - 对值进行四舍五入。
- `round(N)` - 将值四舍五入到小数点后 N 位，例如 34.678；round(1) => 34.7
- `hex` - 将值转换为十六进制值。所有字母均小写。
- `hex2` - 将值转换为十六进制值。所有字母均小写。如果值小于 16，则会添加前导零。
- `HEX` - 与十六进制相同，但大写。
- `HEX2` - 与 hex2 相同，但大写。
- `date` - 根据指定格式格式化日期。格式与 [iobroker.javascript](https://github.com/iobroker/iobroker.javascript/blob/master/README.md#formatdate) 中的格式相同。
- `min(N)` - 如果值小于 N，则取 N，否则取值
- `max(M)` - 如果值大于 M，则取 M，否则取值
- `sqrt` - 平方根
- `pow(n)` - N 的幂。
- `pow` - 2 的幂。
- `floor` - Math.floor
- `ceil` - Math.ceil
- `json` - 用于获取 json 或对象属性的操作。例如，`{id;json(common.name.en)}`
- `random(R)` - Math.random() * R，如果没有参数则仅使用 Math.random()
- `formatValue(decimals)` - 根据系统设置格式化值并使用小数
- `date(format)` - 将值格式化为日期。格式如下：“YYYY-MM-DD hh:mm:ss.sss”
- `momentDate(format, useTodayOrYesterday)` - 使用 Moment.js 将值格式化为日期。[必须根据 moment.js 库输入已批准的格式](https://momentjs.com/docs/#/displaying/format/)。`useTodayOrYesterday=true` 时，`moment.js` 格式 `ddd`/`dddd` 将被覆盖为今天/昨天
- `array(element1,element2[,element3,element4])` - 返回索引的元素。例如：`{id.ack;array(ack is false,ack is true)}`

您可以在任何文本中使用此模式，例如

```
My calculations with {objectID1;operation1;operation2;...} are {objectID2;operation3;operation4;...}
```

或颜色计算：

```
#{objectRed;/(100);*(255);HEX2}{objectGreen;HEX2}{objectBlue;HEX2}
```

要显示对象的时间戳，请在对象 ID 末尾写入`.ts`或`.lc`（表示最后更改），例如：

```
Last change: {objectRed.lc;date(hh:mm)}
```

### 特殊绑定
有许多不同的内部绑定可以在视图中提供附加信息：

* `username` - 显示已登录的用户
* `view` - 实际视图的名称
* `wname` - 小部件名称
* `widget` - 包含所有小部件数据的对象。只能在 JS 部分使用，例如 `{a:a;widget.data.name}`
* `widgetOid` - 使用小部件的 OID 在分配部分分配小部件的值，例如 `{t:widgetOid.val;t}`
* `wid` - 实际小部件的名称
* `language` - 可以是 `de`、`en` 或 `ru`。
* `instance` - 浏览器实例
* `login` - 是否需要登录（例如，显示/隐藏注销按钮）
* `local_*` - 如果状态名称以 `local_` 开头，则不会报告给 ioBroker，但会更新所有依赖于此状态的小部件。（当前浏览器会话的局部变量）

注意：要在计算中使用“：”（例如，在字符串公式中），请改用“::”。

**请记住**，样式定义将被解释为绑定，因此请使用`{{style: value}}`或仅

```
{
	style: value
}
```

为此。

## 过滤器
为了在一个视图上直观地显示所有小部件的数量，您可以使用过滤器来减少视图上同时显示的小部件的数量。

每个控件都有一个字段`filter`。如果您将其设置为某个值，例如`light`，那么您可以使用其他控件`(bars - filters, filter - dropdown)`来控制哪个过滤器实际处于活动状态。

## 控制接口
Vis 创建了 3 个变量：

- `control.instance` - 如果必须控制每个浏览器，则应在此处写入浏览器实例或`FFFFFFFF`。
- `control.data` - 命令参数。请参阅具体命令说明。
- `control.command` - 命令名称。写入此变量会触发命令。这意味着在写入命令之前，必须先准备好“实例”和“数据”。

命令：

* `alert` - 在 vis-2 中显示一个警告窗口。“control.data”的格式为“message;title;jquery-icon”。title 和 jquery-icon 是可选的。图标名称可在[此处](http://jqueryui.com/themeroller/) 找到。要显示图标“ui-icon-info”，请写入 `Message;;info`。
* `changeView` - 切换到所需视图。“control.data”必须包含视图名称。您也可以将项目名称指定为 `project/view`。默认项目为 `main`。
* `refresh` - 重新加载 vis-2，例如在项目更改为在所有浏览器上重新加载后。
* `reload` - 与刷新相同。
* `dialog` - 显示对话框窗口。对话框必须存在于视图中。以下之一：

- `静态 - HTML - 对话框`,
- `静态 - 图标 - 对话框`,
- `jqui 对话框中的容器 - HTML - 视图`,
- `容器 - ext cmd - jqui 对话框中的视图`,
- `容器-图标-在jqui对话框中查看`,
- `容器-按钮-在 jqui 对话框中查看`。

`control.data` 必须具有对话框小部件的 ID，例如 `w00056`。

*`对话框关闭`
* `popup` - 打开一个新的浏览器窗口。链接必须在 `control.data` 中指定，例如 http://google.com
* `playSound` - 播放声音文件。文件链接在 `control.data` 中指定，例如：http://www.modular-planet.de/fx/marsians/Marsiansrev.mp3。

您可以在 vis-2 中上传自己的文件，并使其播放，例如 `/vis-2.0/main/img/myFile.mp3`。
**重要提示** 浏览器只有在用户未点击页面一次后才能播放音频。这是浏览器安全策略。[这里](https://github.com/Hugo22O/chrome-autoplay) 您可以阅读更多内容。

如果用户在开始时更改视图，则变量将由 vis-2 填充

- `control.instance`：浏览器实例和 `ack=true`
- `control.data`：项目和视图名称，格式为 `project/view`，例如 `main/view`（并且 `ack=true`）
- `control.command`: `changedView` 和 `ack=true`

您可以将 JSON 字符串或对象写入 `control.command`，例如 `{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}`。在这种情况下，实例和数据将从 JSON 对象中获取。

JavaScript 适配器示例：

```js
setState('vis-2.0.control.command', { instance: '*', command: 'refresh', data: ''});
```

如果将 JSON 写为字符串，请确保它是可解析的，例如 `{"instance": "*", "command": "refresh", "data": ""}`，请注意 `"`。

## 默认视图
您可以为每个视图定义所需的分辨率（菜单=>工具=>分辨率）。
这只是编辑模式下的可视边框，用于显示特定设备上的屏幕尺寸。在实时模式下，边框不可见，所有边框外的小部件均可见。

此外，您可以定义是否必须将此视图用作此分辨率的默认视图。

因此，每次调用`index.html`（不带`#viewName`）时，都会打开最适合此分辨率的视图。
如果只有一个视图具有“默认”*标志，则该视图将独立于屏幕分辨率或方向打开。

例如，您可以创建两个视图“Landscape-Mobile”和“Portrait-Mobile”，当您改变方向或屏幕尺寸时，这两个视图将自动切换。

有一个辅助小部件“基本 - 屏幕分辨率”，可显示实际屏幕分辨率和最适合此分辨率的默认视图。

## 权限系统
＃＃＃ 项目
在项目管理对话框中，您可以为每个 ioBroker 用户配置`read` 和 `write` 权限。

`read` 标志表示该用户可以在运行时访问该项目。
`write` 标志表示该用户可以在编辑模式下访问该项目。

当通过 ioBroker Admin 适配器创建新用户时，它将默认拥有两种权限。

＃＃＃ 看法
您还可以指定用户在运行时和编辑模式下可以访问哪些视图。
如果在项目级别未授予其中一项访问权限，则在视图级别指定这些访问权限不会有任何效果，因为整个项目将无法访问。

请注意，每当您尝试访问当前用户没有权限的视图时，用户将看到项目选择面板。

### 小部件
如果用户没有`read`权限，则该小部件将不会在运行时渲染。如果用户没有`write`权限，则该小部件将不会在编辑模式下渲染。

＃＃ 设置
### 如果睡眠时间超过
有一条规则：在断线一段时间后，VIS 页面将重新加载整个页面以同步项目。
您可以在“设置...”菜单中进行配置。如果您将时间间隔设置为“永不”，则页面将永远不会重新加载。

### 重新连接间隔
设置断开连接时尝试连接的间隔。例如，设置为 2 秒，则每 2 秒尝试建立连接一次。

### 重新连接屏幕变暗
有时（例如在夜间）需要使用暗色加载屏幕。您可以使用此选项进行设置。

请注意，这些设置仅对重新连接有效，对第一次连接无效。

![黑暗的](../../../en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/img/dark_screen.png)

## SVG 和 currentColor
CSS 中的 currentColor 关键字允许元素从其父元素继承当前文本颜色。
它在 SVG（可缩放矢量图形）中尤其有用，因为它允许更动态的样式，并且更容易与 HTML 内容集成。

您可以使用 currentColor 关键字代替 SVG 中任何接受颜色值的属性的特定颜色值。
以下是 SVG 中一个圆圈的简单示例：

```xml
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="currentColor" />
</svg>
```

在这种情况下，如果 SVG 采用父元素的颜色。
例如，如果它在菜单中使用，并且菜单是红色的，那么圆圈也会是红色的。

## 开发和调试
为了调整 vis-2 编辑器本身、搜索错误和调试，必须执行以下步骤。

1. 通过 GitHub 的用户界面将 iobroker/iobroker.vis-2 存储库 fork 到您自己的帐户中

2. 将存储库克隆到目录中。从 GitHub 存储库复制 URL。命令如下

```shell
git clone https://github.com/<your profile name>/ioBroker.vis-2.git
```

3. 使用 IDE 打开下载的存储库

4. 要安装和下载所有必要的库，请在存储库根目录中的终端中运行以下命令

```shell
npm run install-monorepo
```

5.要在浏览器中启动编辑器，请执行以下命令。

端口 8082 上必须有一个单独运行的 iobroker 服务器实例。

```shell
npm run start
```

- 可在浏览器中进行调试，例如 chrome F12
- 如果您更改文件，则支持自动重新加载编辑器

## 待办事项
<!-- 下一个版本的占位符（在行首）：

### **工作正在进行** -->

## Changelog
### **WORK IN PROGRESS**
* (@GermanBluefox) Corrected selection of the view for resolution

### 2.12.10 (2025-05-25)
* (@GermanBluefox) Added possibility to define favicon and browser tab title

### 2.12.9 (2025-05-19)
* (@GermanBluefox) Added possibility to use value in signal text

### 2.12.8 (2025-05-03)
* (@GermanBluefox) Added new SVG icon as favicon.
* (@GermanBluefox) Added support for the TypeScript widgets
* (@GermanBluefox) Used `vite` for faster loading

### 2.11.2 (2025-01-23)
* (@GermanBluefox) Do not load vis-1 widgets if vis-2 widgets are provided

### 2.11.1 (2024-12-02)
* (@GermanBluefox) Corrected navigation menu
* (@GermanBluefox) Migrated widgets to React: basic - frame, basic - note, basic - logout 
* (@GermanBluefox) Added the HTML rebuild button to settings
* (@GermanBluefox) Backend was migrated to TypeScript

## License
To use this adapter in `ioBroker` you need to accept the source code license of the adapter. The source code of this adapter is available under the CC BY-NC license.

Additionally, you need a license to use the adapter. The following license editions are available on https://iobroker.net/www/pricing 
* **Community-License: Free for private use!**: Get a free license by registering an account on [https://iobroker.net](https://iobroker.net). The license if checked online against the ioBroker license server when the vis-2 adapter is started, so an online connection at this time point is required!
* **Private use Offline-License**: For paying a small support fee, you can get rid of the required online license check on adapter startup. **Only for Private use!**
* **Commercial License**: When using Vis in a commercial environment or selling Vis as part of ioBroker packages to your customers, this license is for you. License check is also not requiring an online connection.

## License
 Copyright (c) 2021-2025 Denis Haev, https://github.com/GermanBluefox <dogafox@gmail.com>,
  
 Creative Common Attribution-NonCommercial (CC BY-NC)

 http://creativecommons.org/licenses/by-nc/4.0/

![CC BY-NC License](https://github.com/GermanBluefox/DashUI/raw/master/images/cc-nc-by.png)

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).