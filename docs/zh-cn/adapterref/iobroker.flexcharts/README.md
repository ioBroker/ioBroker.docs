---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.flexcharts/README.md
title: ioBroker.flexcharts
hash: 5tDrOqbdbO2RJI1DB8F7NZOXTFbd9ljxD4WDiniKwI0=
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
将 [Apache ECharts](https://echarts.apache.org/en/index.html) 的全部功能引入 ioBroker，而无需图形配置 UI 施加任何限制。

> **此适配器面向经验丰富的用户。** 没有用于配置图表的用户界面。您完全可以通过代码（JavaScript 或 Blockly）或存储在 ioBroker 状态中的 JSON 来定义图表。

请查看 [ECharts演示图库](https://echarts.apache.org/examples/en/index.html)，了解可能的情况。

备注：该适配器尚未在MacOS上进行测试。

## V0.6.0 版本新增内容
**Apache ECharts v6.0.0** 现已成为 flexcharts 的基础。主要新增功能：

- 全新的默认主题
- 传递无限数量的自定义主题
- 动态主题切换——例如，跟随系统的深色模式（`&darkmode=auto`）
- 新的图表类型
- 传递无限数量的事件驱动函数

> **ECharts v5 主题** 仍然可以通过 `&themev5` 参数使用，例如： > `http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1&themev5` > > Apache 提供 v5 浅色主题，但没有 v5 深色主题——我们提供了一个基于 Apache v5.6.0 深色主题的自定义 v5 深色主题。如果您发现任何差异，请提交问题报告。

## 工作原理
其他 ioBroker 图表适配器使用用户界面来配置图表内容和选项——这通常会限制您可以表达的内容。flexcharts 采用了不同的方法：

1. 您可以将图表定义为 JSON 对象（ECharts 的 `option` 变量）——该对象可以存储在 ioBroker 状态中，也可以从 JavaScript 脚本返回。
2. flexcharts 将该定义传递给浏览器中的 Apache ECharts 并进行渲染。

示例——以状态值形式存储的堆叠条形图：

```json
{ "tooltip": {"trigger": "axis","axisPointer": {"type": "shadow"}},
  "legend": {},
  "xAxis": [{"type": "category","data": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}],
  "yAxis": [{"type": "value"}],
  "dataZoom": [{"show": true,"start": 0, "end": 100}],
  "series": [
    { "name": "Grid",      "type": "bar", "color": "#a30000", "stack": "Supply",      "data": [8,19,21,50,26,0,36]},
    { "name": "PV",        "type": "bar", "color": "#00a300", "stack": "Supply",      "data": [30,32,20,8,33,21,36]},
    { "name": "Household", "type": "bar", "color": "#0000a3", "stack": "Consumption", "data": [16,12,11,13,14,9,12]},
    { "name": "Heat pump", "type": "bar", "color": "#0000ff", "stack": "Consumption", "data": [22,24,30,20,22,12,25]},
    { "name": "Wallbox",   "type": "bar", "color": "#00a3a3", "stack": "Consumption", "data": [0,15,0,25,23,0,35]}
  ]
}
```

结果：

![flexcharts_stacked1](https://github.com/user-attachments/assets/7cf6dfab-ddad-4b2f-a1e1-20fa4b876b4c)

## 先决条件
flexcharts 作为 Web 扩展程序运行。必须安装并运行 [Web适配器](https://www.iobroker.net/#en/adapters/adapterref/iobroker.ws/README.md) (`web.0`)。以下示例假设使用默认端口 8082。

＃＃ 入门
### 验证安装
在浏览器中打开此网址（将`localhost`替换为您的ioBroker服务器地址）：

`http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1`

应该会显示一个演示图表。如果显示了，则说明适配器工作正常。

### 来源选项 1 — ioBroker 状态
`http://localhost:8082/flexcharts/echarts.html?source=state&id=0_userdata.0.echarts.chart1`

flexcharts 读取状态 `0_userdata.0.echarts.chart1` 并将其渲染为 EChart。创建此状态，将上面的 JSON 示例粘贴为其值，然后打开 URL。

> **注意：** 状态 ID 中不允许使用以下字符：`: / ? # [ ] @ ! $ & ' ( ) * + , ; = %`

### 来源选项 2 — JavaScript 脚本
这种方式更加灵活。flexcharts 会在每次请求时调用您的脚本，而您的脚本会返回图表定义。其他 URL 参数也会转发给脚本。

仅支持 **javascript.0**（第一个 JS 适配器实例）。

创建脚本：

```javascript
onMessage('flexcharts', (httpParams, callback) => {
    const myJsonParams = (httpParams.myjsonparams ? JSON.parse(httpParams.myjsonparams) : {});
    console.log(`httpParams = ${JSON.stringify(httpParams)}`);
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
            {name: "Grid",      type: "bar", color: "#a30000", stack: "Supply",      data: [8,19,21,50,26,0,36]},
            {name: "PV",        type: "bar", color: "#00a300", stack: "Supply",      data: [30,32,20,8,33,21,36]},
            {name: "Household", type: "bar", color: "#0000a3", stack: "Consumption", data: [16,12,11,13,14,9,12]},
            {name: "Heat pump", type: "bar", color: "#0000ff", stack: "Consumption", data: [22,24,30,20,22,12,25]},
            {name: "Wallbox",   type: "bar", color: "#00a3a3", stack: "Consumption", data: [0,15,0,25,23,0,35]}
        ]
    };
    callback(option);
}
```

启动脚本，然后打开：`http://localhost:8082/flexcharts/echarts.html?source=script`

默认消息名称为`flexcharts`。要使用不同的名称，请添加`&message=mycharts`，并相应地调整`onMessage('mycharts', ...)`。

`httpParams`中的额外URL参数会传递给脚本：

`http://localhost:8082/flexcharts/echarts.html?source=script&chart=chart1&myjsonparams={"period":"daily"}`

## 高级功能
### 图表定义中的 JavaScript 函数
标准 `JSON.stringify()` 会从图表定义中移除函数。要包含函数（例如自定义格式化程序），请使用 npm 模块 `javascript-stringify`：

1. 在 JavaScript 适配器配置的“附加 npm 模块”中添加 `javascript-stringify`：

   ![添加 npm 模块](../../../en/adapterref/iobroker.flexcharts/add_npm_modules.png)

2. 在你的脚本中：`var strify = require('javascript-stringify');`
3. 将 `callback(option)` 替换为 `callback(strify.stringify(option))`

— 或对于一个州：`setState('my_chart_id', strify.stringify(option), true)`

有关使用工具提示格式化程序的示例，请参阅 [模板3](templates/flexchartsTemplate3.js)。

> **安全提示：** `javascript-stringify` 允许向浏览器传递任意代码。使用此模块时，请勿将 ioBroker 暴露于互联网。

### 事件驱动型动态图表
ECharts 支持可根据用户操作进行更新的交互式图表。请参阅此 [ECharts 示例](https://echarts.apache.org/examples/en/editor.html?c=dataset-link) 和 [使用 flexcharts 的屏幕录像]](dynamic_charts_with_flexcharts.mkv)。

使用**脚本作为源**，并将图表定义和事件处理程序作为数组传递。[模板 4](templates/flexchartsTemplate4.js) 对此进行了演示。关键规则：

- 事件处理程序必须使用 `myChart.on("event", function(e){ ... })`
- 处理程序必须是 JavaScript 字符串（请使用一致的引用，或使用 [JS 代码压缩器](https://www.toptal.com/developers/javascript-minifier) 进行压缩）。
- 将所有内容作为数组传递：`callback([strify.stringify(option), onEvent1, onEvent2])`

如果使用**state 作为数据源**，则 state 必须是字符串的 JSON 数组。图表定义和处理程序字符串都必须是有效的 JSON 字符串（不能有换行符，只能使用转义引号）。例如：`flexcharts.0.info.chart3`。

> **从 v0.4.x 升级的用户请注意：** v0.5.0 版本中，图表选项变量已从 `jsopts` 重命名为 `option`。请相应地更新您的事件处理函数。

> **安全提示：** 与上述相同 — 使用 `javascript-stringify` 时，请勿将 ioBroker 暴露于互联网。

### 主题（ECharts v6）
使用 Apache ECharts [主题生成器](https://echarts.apache.org/en/theme-builder.html) 创建或修改主题。

**使用脚本作为数据源：**

1. 从主题生成器下载主题 → “JSON 版本”选项卡 → 复制
2. 在你的脚本中：`const myThemeDefault = <粘贴到此处>`
3. 将其作为回调数组的一部分传递：

`callback([JSON.stringify(option), ['default', JSON.stringify(myThemeDefault)]])`

[模板 5](templates/flexchartsTemplate5.js) 显示完整的主题切换，包括深色模式。

**以州/省为数据源：**

状态值必须是一个数组：`[<stringified chart>, ['default', <stringified theme>]]`。

有关工作示例，请参见 `flexcharts.0.info.chart4`。

除了 `default` 和 `dark` 之外的主题需要通过事件驱动函数中的 `myChart.setTheme(<name>)` 进行显式激活。

快速尝试：

```
callback([JSON.stringify(option), ['default', '{"title":{"left":"left"},"color":["#ff715e","#ffaf51","#ffee51","#8c6ac4","#715c87"],"backgroundColor":"rgba(64,64,64,0.5)"}']]);
```

## 模板
| 模板 | 描述 |
|----------|-------------|
| [模板1](templates/flexchartsTemplate1.js) | 图表数据来自历史适配器 |
| [模板3](templates/flexchartsTemplate3.js) | 图表定义中包含函数的堆叠条形图 |
| [模板4](templates/flexchartsTemplate4.js) | 事件驱动型动态图表 |
| [模板5](templates/flexchartsTemplate5.js) | 具有动态深色模式切换的自定义主题 |
| [template5](templates/flexchartsTemplate5.js) | 具有动态暗黑模式切换的自定义主题 |

更多示例：

- **tibberLink 适配器：** 请参阅[此处](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/67)和[此处](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/66)的讨论 — tibberLink 也原生支持 flexcharts，请参阅其[文档](https://github.com/hombach/ioBroker.tibberlink?tab=readme-ov-file#2-using-the-flexcharts-or-fully-featured-echarts-adapter-with-json)
- **威能 E3 系列**（例如 Vitocal 250 热泵）：[ioBroker.e3oncan 讨论](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35)

＃＃ 参考
基本 URL：`http://localhost:8082/flexcharts/echarts.html`

| 参数 | 值 | 描述 |
|-----------|--------|-------------|
| `source=state` | | 从 ioBroker 状态读取图表定义。需要 `id`。 |
| `id=<state_id>` | | 要读取的州 ID（`source=state` 为必填项）。 |
| `message=<name>` | 默认值：`flexcharts` | 脚本中 `onMessage()` 的消息名称。 |
| `darkmode` | `on` \| `off` \| `auto` | 深色模式：`on`/无值 = 始终深色，`off` = 始终浅色，`auto` = 遵循系统设置。 |
| `refresh=<n>` | 秒，最小值 5，默认值 60 | 自动重新加载间隔。仅当存在此参数时才有效。 |
| `themev5` | | 请使用 Apache ECharts v5 的默认主题和深色主题，而不是 v6 的默认主题。 |
| `<custom>=<value>` | | 任何其他参数都将传递给 `httpParams` 中的脚本。 |
| `<custom>=<value>` | | 任何其他参数都会通过 `httpParams` 传递给脚本。 |

捐赠
<a href="https://www.paypal.com/donate/?hosted_button_id=WKY6JPYJNCCCQ"><img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.flexcharts/main/admin/bluePayPal.svg" height="40"></a>如果你喜欢这个项目——或者只是想慷慨解囊，不妨请我喝杯啤酒。干杯！🍻

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.6.2 (2026-04-13)
* (MyHomeMyData) Restructuring of code for better readability and improved performance.
* (MyHomeMyData) Restructuring of Readme for better readability.

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

Copyright (c) 2024-2026 MyHomeMyData <juergen.bonfert@gmail.com>

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