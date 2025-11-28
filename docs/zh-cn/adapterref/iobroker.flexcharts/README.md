---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.flexcharts/README.md
title: ioBroker.flexcharts
hash: B0rBGSntv+Ju2U5qKM7ggjfK+HoJx55myfnP3C/Ghc4=
---
![标识](../../../en/adapterref/iobroker.flexcharts/admin/flexcharts-icon-small.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.flexcharts.svg)
![下载](https://img.shields.io/npm/dm/iobroker.flexcharts.svg)
![安装数量](https://iobroker.live/badges/flexcharts-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/flexcharts-stable.svg)
![NPM](https://nodei.co/npm/iobroker.flexcharts.png?downloads=true)

# IoBroker.flexcharts
**测试：** ![测试与发布](https://github.com/MyHomeMyData/ioBroker.flexcharts/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 flexcharts 适配器
# 最新消息
**Apache ECharts 发布了 v6.0.0 版本，包含 12 项重大更新。** 详情请参阅 https://echarts.apache.org/handbook/en/basics/release-note/v6-feature。

Flexcharts v0.6.0 基于此新版本，并提供以下新功能：

* 全新默认主题
* 可以传递无限数量的自定义主题
* 动态主题切换，典型场景是监听系统的暗黑模式并动态调整图表主题（添加 http 参数 `&darkmode=auto` 以激活）
* 新的图表类型
* 可以传递无限数量的事件驱动函数

**备注：** 您可以通过添加 http 参数 `&themev5`（例如 `http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1&themev5`）来保留 **ECharts v5 主题**（默认和深色主题）。Apache 提供 v5 浅色主题，但没有 v5 深色主题——我已经提交了相关问题报告。目前，我基于 Apache v5.6.0 的深色主题自行创建了一个 v5 深色主题。如果您发现 v5 主题之间存在差异，请向 flexcharts 提交问题报告。

# 基本概念
ioBroker 提供了多种图表查看适配器。据我所知，它们都使用用户界面来配置图表的内容和选项。通常情况下，并非所有图形子系统的功能都能通过这种方式使用。例如，使用 eChart 适配器就无法查看功能齐全的堆叠图。

该适配器采用了一种不同的方法。它几乎包含了[将 Apache ECharts 集成到 ioBroker 中。请查看[演示图表](https://echarts.apache.org/en/index.html)。](https://echarts.apache.org/examples/en/index.html)的全部功能集。

备注：该适配器尚未在MacOS上进行测试。

**没有用于配置图表的用户界面。** 您需要自行定义图表，适配器会负责可视化。您需要提供图表的定义和内容，内容以 JSON 对象的形式提供——在 eCharts 示例中，它对应于变量 `option` 的内容。以下示例可以帮助您理解。要创建堆叠图，您需要将其定义存储在 ioBroker 状态（JSON 格式）中：

```
{ "tooltip": {"trigger": "axis","axisPointer": {"type": "shadow"}},
  "legend": {},
  "xAxis": [{"type": "category","data": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}],
  "yAxis": [{"type": "value"}],
  "dataZoom": [{"show": true,"start": 0, "end": 100}],
  "series": [
    { "name": "Grid", "type": "bar", "color": "#a30000", "stack": "Supply",
      "data": [8,19,21,50,26,0,36]},
    { "name": "PV", "type": "bar", "color": "#00a300", "stack": "Supply",
      "data": [30,32,20,8,33,21,36]},
    { "name": "Household", "type": "bar", "color": "#0000a3", "stack": "Consumption",
      "data": [16,12,11,13,14,9,12]},
    { "name": "Heat pump", "type": "bar", "color": "#0000ff", "stack": "Consumption",
      "data": [22,24,30,20,22,12,25]},
    { "name": "Wallbox", "type": "bar", "color": "#00a3a3", "stack": "Consumption",
      "data": [0,15,0,25,23,0,35]}
  ]
}
```

然后，flexchart适配器将显示此图表：

![flexcharts_stacked1](https://github.com/user-attachments/assets/7cf6dfab-ddad-4b2f-a1e1-20fa4b876b4c)

通常情况下，你会使用 Blockly 或 javascript 来创建和更新此状态的内容。

还有另一种方法可以通过 JavaScript 中的回调函数直接传递 eCharts 数据。详情请见下文。

需要明确的是：这种方法并非旨在快速创建简单的图表。

但如果您心中已有更复杂的图表构想，flexcharts 可以帮助您实现。

＃ 入门
### 使用适配器
此适配器以 Web 扩展的形式提供其功能。因此，必须安装并运行 [Web适配器](https://www.iobroker.net/#en/adapters/adapterref/iobroker.ws/README.md) (`web.0`)。本自述文件假设您使用的是 Web 适配器的标准端口 8082。

当 flexcharts 适配器处于活动状态时，您可以通过 http://localhost:8082/flexcharts/echarts.html 访问它（将 `localhost` 替换为您的 ioBroker 服务器地址）。

您可以在 vis、jarvis 或其他可视化工具的 iFrame 小部件中使用此地址。当然，您也可以直接在浏览器标签页中使用它。

要使其正常工作，您需要提供额外的参数来告知适配器数据来源。有两种选项可供选择：

* `source=state` => 您在 ioBroker 状态（json）中提供图表数据
* `source=script` => 您通过脚本（javascript 或 blockly）提供图表数据

还有其他选项，请参阅[参考部分](#reference)

要检查适配器是否正确安装，请使用内置演示图表：http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1

### 使用 ioBroker 状态作为 eChart 的数据源
示例：`http://localhost:8082/flexcharts/echarts.html?source=state&id=0_userdata.0.echarts.chart1`

<!-- Would this be better to read: Example: http://localhost:8082/flexcharts/echarts.html?<mark style="background-color: #ffff00">source=state</mark>&<mark style="background-color: #00c000">&id=0_userdata.0.echarts.chart1</mark> -->

Flexcharts 会将状态 `0_userdata.0.echarts.chart1` 作为 eChart 的数据进行评估。您可以尝试：创建一个这样的状态，并将上面示例中显示的 JSON 数据 (`{ "tooltip": { ...`) 复制到该状态作为状态内容，然后使用浏览器访问给定的地址。

状态 ID 中不允许使用以下字符：`: / ? # [ ] @ ! $ & ' ( ) * + , ; = %`

### 使用 JavaScript 作为电子图表的源代码
这种方法稍微复杂一些，但效率更高，也更灵活。您可以直接通过 JS 脚本提供图表数据，该脚本由 flexcharts 适配器动态调用。您可以通过向 http 地址添加参数（例如 `&chart=chart1`）来向脚本传递其他参数。所有 http 参数都可以在脚本对象 `httpParams` 中使用（参见下面的示例）。

最好还是用例子来解释。创建一个包含以下内容的脚本（仅支持第一个 JS 实例 (**javascript.0**)，脚本名称无关紧要）：

```
onMessage('flexcharts', (httpParams, callback) => {
    const myJsonParams  = (httpParams.myjsonparams ? JSON.parse(httpParams.myjsonparams) : {} );
    console.log(`httpParams = ${JSON.stringify(httpParams)}`);
    console.log(`myJsonParams = ${JSON.stringify(myJsonParams)}`);
    chart1(result => callback(result));
});

function chart1(callback) {
    const option = {
        tooltip: {trigger: "axis", axisPointer: {type: "shadow"}},
        legend: {},
        xAxis: [{type: "category", data: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}],
        yAxis: [{type: "value"}],
        dataZoom: [{show: true, start: 0, end: 100}],
        series: [
            { name: "Grid", type: "bar", color: "#a30000", stack: "Supply",
              data: [8,19,21,50,26,0,36]},
            { name: "PV", type: "bar", color: "#00a300", stack: "Supply",
            data: [30,32,20,8,33,21,36]},
            { name: "Household", type: "bar", color: "#0000a3", stack: "Consumption",
            data: [16,12,11,13,14,9,12]},
            { name: "Heat pump", type: "bar", color: "#0000ff", stack: "Consumption",
            data: [22,24,30,20,22,12,25]},
            { name: "Wallbox", type: "bar", color: "#00a3a3", stack: "Consumption",
            data: [0,15,0,25,23,0,35]}
        ]
    };
    callback(option);
}
```

启动脚本并在浏览器中访问此地址：`http://localhost:8082/flexcharts/echarts.html?source=script`

<!-- Would this be better to read: Start the script and access this in a browser: http://localhost:8082/flexcharts/echarts.html?<mark style="background-color: #ffff00">source=script</mark> -->

应该显示与之前示例相同的图表。

你应该会看到示例脚本的两条日志条目：

```
httpParams = {"message":"mylinechart","source":"script"}
myJsonParams = {}
```

可以将其他参数传递给脚本，这些参数将在脚本中的变量 `httpParams` 中可用。请尝试以下命令：`http://localhost:8082/flexcharts/echarts.html?source=script&chart=chart1&myjsonparams={"period":"daily"}`

日志条目现在应该如下所示：

```
httpParams = {"source":"script","chart":"chart1","myjsonparams":"{\"period\":\"daily\"}"}`
myJsonParams = {"period":"daily"}
```

请注意，**您必须使用 `onMessage()` 功能才能从适配器接收触发消息**。消息的默认值为 `flexcharts`，如上例所示。您可以通过提供附加参数来使用不同的消息，例如，要使用消息 `mycharts`，请在 HTTP 地址中添加 `&message=mycharts`：`http://localhost:8082/flexcharts/echarts.html?source=script&message=mycharts`

### 在图表定义中使用函数
遗憾的是，图表定义中的函数定义通常不起作用，因为在使用 `JSON.stringify(option)` 或 `callback(option)` 时会进行过滤。

然而，自 flexcharts V0.3.0 版本起，就可以将其应用到工作中了。不过还需要多花一些功夫：

* 将 npm 模块 `javascript-stringify` 添加到 JavaScript 适配器的第 0 个实例。为此，请在适配器的配置中将 `javascript-stringify` 添加到“附加 npm 模块”中：

![添加 npm 模块](../../../en/adapterref/iobroker.flexcharts/add_npm_modules.png)

* 在脚本开头添加 `var strify = require('javascript-stringify');`
* 当使用脚本作为数据源时：在 `onMessage()` 函数中，将 `callback(option);` 替换为 `callback(strify.stringify(option));`（假设 `option` 包含您的图表定义）。
* 然后使用状态作为数据源：创建状态时，将 `setState('my_chart_id', JSON.stringify(option), true);` 替换为 `setState('my_chart_id', strify.stringify(option), true);`
就这样。现在图表定义中的函数将正确地转发到 flexcharts。

试试用 [模板3](templates/flexchartsTemplate3.js)。函数用于显示带有两位小数的工具提示数据：`tooltip: {trigger: "axis", valueFormatter: (value) => '。 + value.toFixed(2)}`。

`flexcharts.0.info.chart2`中给出了一个通过状态定义图表的示例。这将显示与模板3相同的图表。

注意：安装 npm 模块 `javascript-stringify` 后，其功能可能被恶意代码（跨站脚本攻击）利用。因此，使用此模块时，ioBroker 不应可从互联网访问。

### 使用事件驱动函数创建动态变化的图表
Apache ECharts 支持动态图表。请看这个 [例子](https://echarts.apache.org/examples/en/editor.html?c=dataset-link)。当鼠标移动到折线图的某个数据点时，饼图也会相应更新。

以下是使用 flexcharts 操作此图表的屏幕录像：[动态变化的图表](dynamic_charts_with_flexcharts.mkv)

**重要提示**：如果您正在使用 flexcharts 的 **0.5.0** 版本，并且希望在事件驱动函数中动态更改图表选项，则必须通过名为 `jsopts` 的变量来指定选项。在 0.5.0 及更高版本中，该变量已更改为 `option`。请相应地修改函数中的变量命名，即将 `jsopts` 替换为 `option`。

要在自定义图表中使用事件驱动函数，我建议使用**脚本作为数据源**。[模板 4](templates/flexchartsTemplate4.js) 演示了实现方法。请注意以下事项：

* 要使图表动态化，您需要定义处理图表内事件的功能。这可以通过定义类似 `myChart.on("event",function(e){ ... });` 的函数来实现。
* 必须将每个函数命名为 `myChart.on()`
* 要将函数定义传递给 flexcharts，必须将其转换为**JavaScript 字符串**。这可以通过在函数内部使用引号 (`"`) 并用单引号 (`'`) 将其括起来来实现——反之亦然。您可以使用代码压缩工具，例如[这个](https://www.toptal.com/developers/javascript-minifier)，来减少所需的空间。
最后，您需要通过回调函数以**JavaScript 字符串数组**的形式提供所有部分，包括图表定义和事件函数定义。在模板 4 中，代码为 `callback([strify.stringify(option), onEvent]);`，其中 `option` 包含图表定义，`onEvent` 包含事件函数的 JavaScript 字符串定义。如果您定义了多个函数，可以将它们添加到字符串 `onEvent` 中，也可以将它们作为额外的数组元素添加，例如 `callback([strify.stringify(option), onEvent1, onEvent2, onEvent3]);`。函数定义的数量没有限制。
* 要将图表定义（`option`）字符串化，您必须使用上一章中描述的`javascript-stringify`。

注意：安装 npm 模块 `javascript-stringify` 后，其功能可能被恶意代码（跨站脚本攻击）利用。因此，使用此模块时，ioBroker 不应可从互联网访问。

也可以将此功能与**州/省/自治区**作为数据源一起使用。但是，这样做会更加复杂：

* 状态必须以**JSON字符串数组**的形式构成。该数组包含两个元素：图表定义和事件函数定义。
但现在，这两个字符串都必须是有效的**JSON字符串**。这与JavaScript字符串不同，并带来了额外的限制：
* 要将字符串括起来，必须使用引号。因此，字符串内部只允许使用撇号或转义引号（`\"`）。
* 字符串内部不允许换行。
* 最好使用 JSON 验证器来确保数组的有效性，例如[这个](https://jsonformatter.curiousconcept.com/#)。
当然，您需要对图表数据进行操作。但数据本身就是图表定义的一部分。因此，您必须使用 JavaScript 来读取和写入 JSON 字符串数组。所以我建议您使用如上所述的脚本作为数据源。
不过，flexcharts 的 info 部分提供了一个示例：`flexcharts.0.info.chart3`。要在浏览器中查看，请使用 `http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart3`

### 使用 Apache EChart 主题（v6 功能）
ECharts 提供了多种图表自定义选项。其中一种强大的方法是使用主题。默认情况下，普通模式下使用“default”主题，深色模式下使用“dark”主题。这些主题是预定义的，但可以修改。

Flexcharts 0.6.0 及更高版本支持主题定义。此外，结合事件驱动函数的定义（参见前一章），可以动态切换主题。

创建或修改主题的最佳方法是使用 Apache ECharts [主题生成器](https://echarts.apache.org/en/theme-builder.html)。

要使用**脚本作为源**将主题传递给 flexcharts，请按照以下步骤操作：

* 在网站的“主题生成器”中选择或修改主题，然后点击“下载”按钮。
* 选择“JSON 版本”选项卡，然后按“复制”按钮将内容复制到剪贴板。
* 在脚本中添加类似 `const myThemeDefault = ` 的代码，然后将剪贴板内容粘贴到脚本中。
* 使用数组将主题传递给 flexcharts，如事件驱动函数所示：`callback([JSON.stringify(option), ['default', JSON.stringify(myThemeDefault)]]);`
请注意：您必须将主题作为字符串数组 `[<主题名称>, <主题的字符串化定义>]` 传递。

[模板 5](templates/flexchartsTemplate5.js) 演示了如何为标准模式（主题“default”）和深色模式（主题“dark”）传递新主题。已启用基于系统设置的两种主题之间的动态切换。

要使用**状态作为源**来传递主题：

* 创建格式为“数组”的状态
* 将图表定义添加为数组的第一个元素
* 将主题准备为字符串化的 JSON 对象。您可以使用 JSON 格式化工具（例如 https://jsonformatter.curiousconcept.com/，模板为“compact”）将 JSON 对象压缩成字符串。
* 将主题作为第二个元素以数组形式添加到状态中（见上文）：`[<主题名称>, <主题定义>]`
* 最后，状态应该类似于 `[<图表的字符串化定义>,['default', <默认主题的字符串化定义>]]`。
* 示例可在 `flexcharts.0.info.chart4` 中找到（仅限新安装的实例）。

主题定义数量没有限制。但是，要激活名称不是“default”或“dark”的主题，您必须定义包含表达式`myChart.setTheme(<name of theme>);`的自定义功能，以及在特定条件下调用该功能的代码。

不妨一试：

* 基于[此示例](https://echarts.apache.org/examples/en/editor.html?c=area-stack)创建一个简单的图表
* 要将数据传递给 Flexcharts，请使用 `callback(JSON.stringify(option));`
* 现在对默认主题进行一些更改。将回调函数替换为以下版本：

`callback([JSON.stringify(option), ['default', '{"title":{"left":"left"},"color":["#ff715e","#ffaf51","#ffee51","#8c6ac4","#715c87"],"backgroundColor":"rgba(64,64,64,0.5)"}']]);`

* 您应该会看到左对齐的标题，以及数据和背景颜色的改变。

## 模板
某些使用场景可以使用 Javascript 模板：

* 使用历史适配器中的数据创建图表：[template1](templates/flexchartsTemplate1.js)
* 简单的热曲线图：[template2](templates/flexchartsTemplate2.js)
* 使用图表定义中的函数创建简单的堆叠条形图：[template3](templates/flexchartsTemplate3.js)
* **tibberLink 适配器** 的数据图表：请参阅[此处](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/67)和[此处](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/66)的讨论
* 威能E3系列设备（例如Vitocal 250热泵）有一个非常具体的应用案例。请参阅https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35
* 实现动态变化的图表：[template4](templates/flexchartsTemplate4.js)
* 实现标准模式和暗黑模式的自定义主题，并根据系统设置进行动态切换：[template5](templates/flexchartsTemplate5.js)
* 适配器 [tibberLink](https://github.com/hombach/ioBroker.tibberlink) 使用 flexcharts 作为数据图形化处理的选项。目前可在 ioBroker 的 Beta 版本仓库中找到。请参阅[文档](https://github.com/hombach/ioBroker.tibberlink?tab=readme-ov-file#2-using-the-flexcharts-or-fully-featured-echarts-adapter-with-json)。

＃＃ 参考
使用 **ioBroker 状态** 作为数据源：`http://localhost:8082/flexcharts/echarts.html?source=state&id=my_state_id`

使用**javascript**作为数据源：`http://localhost:8082/flexcharts/echarts.html?source=script`

### 可选参数
* `&message=my_message` - 将“my_message”发送到 JavaScript。使用 `onMessage('my_message', (httpParams, callback) => { callback(mychart); })` 提供图表数据。默认使用 `flexcharts`。
* `&darkmode[=on|off|auto]` - 指定 ECharts 的暗黑模式可视化：'off' => 永久关闭暗黑模式；'on' 或无值 => 永久开启暗黑模式；'auto' => 监听系统的暗黑模式设置。
* `&refresh=number` - 每隔“number”秒刷新一次图表。默认值为60秒。最小允许值为5秒。
* `&themev5` - 将图表的默认主题设置为 Apache ECharts 主题“v5” - 请参阅 https://echarts.apache.org/handbook/en/basics/release-note/v6-upgrade-guide/ 中的“默认主题”章节
* `&user_defined_arguments` - 根据需要添加更多参数。所有参数均可在 `httpParams` 对象中的 `onMessage()` 函数中使用。更多详情请参见上面的示例和模板。

### 在图表定义中使用函数
适用于 0.3.0 或更高版本。请参阅之前的 [章](#using-functions-within-definition-of-chart)

### 内置演示图表
内置演示图表可用：http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1

如果 flexcharts 和 web-adapter 正在运行，则应该会显示一个演示图表。

**注意：**请将`localhost`替换为您的ioBroker服务器地址。请将`8082`替换为您的Web-Adapter使用的端口号。

捐赠
<a href="https://www.paypal.com/donate/?hosted_button_id=WKY6JPYJNCCCQ"><img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.flexcharts/main/admin/bluePayPal.svg" height="40"></a>如果你喜欢这个项目——或者只是想慷慨解囊，不妨请我喝杯啤酒。干杯！🍻

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.6.1 (2025-11-01)
* (MyHomeMyData) Added support for dark mode theme of ECharts version 5.6.0 (when using paramter themev5). Based on Apache ECharts 6.

### 0.6.0 (2025-10-19)
* (MyHomeMyData) Updated Apache ECharts to version 6.0.0 using brand new default theme - please take a look to Readme! Ref. issue #125
* (MyHomeMyData) Added option to dynamically switch dark mode by listening to the system's setting. Based on Apache ECharts 6.
* (MyHomeMyData) Added possibility to add self defined themes. Based on Apache ECharts 6.
* (MyHomeMyData) Extended support for definition of onEvent functions. Now an unlimited number of functions can be defined instead of just one.
* (MyHomeMyData) Fixes for issue #132 (repository checker)

### 0.5.0 (2025-09-17)
* (MyHomeMyData) Changed internal naming of chart's options from 'jsopts' to 'option'. If you're using event driven functions within your charts, you may need to adapt the naming accordingly. Pls. refer to Readme.
* (MyHomeMyData) Migration to ESLint 9. Fixes issues #107 (Migration to ESLint 9) and #114 (findings of repository checker)

### 0.4.1 (2025-05-22)
* (MyHomeMyData) Fix for issue #96 (findings of repository checker)

### 0.4.0 (2025-03-24)
* (MyHomeMyData) Added functionality to support event driven functions within charts, ref. issue #85
* (MyHomeMyData) Added timeout for script as source
* (MyHomeMyData) Added test cases for integration testing

### 0.3.2 (2025-02-09)
* (MyHomeMyData) Added hint for use of flexcharts by adapter tibberLink

### 0.3.1 (2025-02-02)
* (MyHomeMyData) Updated Apache ECharts to version 5.6.0
* (MyHomeMyData) Added support for 3D charts using extension echarts-gl, see issue #68
* (MyHomeMyData) Added templates for tibberLink Adapter

### 0.3.0 (2025-01-08)
* (MyHomeMyData) Enhancement for usage of functions within echart definitions.
* (MyHomeMyData) Fix for issue #56 (findings of repository checker)

### 0.2.0 (2024-11-06)
* (MyHomeMyData) Updated readme. Added sections Templates and Reference.
* (MyHomeMyData) Fix for issue #41 (findings of repository checker)
* (MyHomeMyData) Updated ECharts to version 5.5.1, see issue #40
* (MyHomeMyData) Fix for issue #39 (html warnings)
* (MyHomeMyData) Added option 'refresh' to enable auto update of chart

### 0.1.6 (2024-10-19)
* (MyHomeMyData) Fix for issue #37

### 0.1.5 (2024-10-11)
* (MyHomeMyData) Fixes for issue #36

### 0.1.4 (2024-10-06)
* (MyHomeMyData) Fixes for issue #34
* (MyHomeMyData) Fixes for issue #33

### 0.1.3 (2024-10-05)
* (MyHomeMyData) Fixed issue on windows systems (handling of file path)

### 0.1.2 (2024-10-01)
* (MyHomeMyData) Adapted adapter configurations

### 0.1.1 (2024-10-01)
* (MyHomeMyData) Removed main.js from package.json since it's obsolete

### 0.1.0 (2024-10-01)
* (MyHomeMyData) Use web extension instead of creating own web server. Use http://localhost:8082/flexcharts/echarts.html instead of http://localhost:3100/echarts.html

### 0.0.4 (2024-09-13)
* (MyHomeMyData) Changed default port to 3100 to avoid conflict with camera adapter
* (MyHomeMyData) Check for conflicting port usage during start of instance
* (MyHomeMyData) Added option to select dark mode
* (MyHomeMyData) Fixed missing 404-page

### 0.0.3 (2024-08-25)
* (MyHomeMyData) Disabled sinon should interface
* (MyHomeMyData) Update of npm dependencies

### 0.0.2 (2024-08-05)
* (MyHomeMyData) initial release

## License
MIT License

Copyright (c) 2025 MyHomeMyData <juergen.bonfert@gmail.com>

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

Additional remark:
Source code of [Apache ECharts](https://echarts.apache.org/en/index.html) is used according to [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0)