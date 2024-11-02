---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.flexcharts/README.md
title: ioBroker.flexcharts
hash: HkappwCbGmLaXInEwFRFzBYV9Kx9Tctl60Noxmd77YM=
---
![标识](../../../en/adapterref/iobroker.flexcharts/admin/flexcharts-icon-small.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.flexcharts.svg)
![下载](https://img.shields.io/npm/dm/iobroker.flexcharts.svg)
![安装数量](https://iobroker.live/badges/flexcharts-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/flexcharts-stable.svg)
![新平台](https://nodei.co/npm/iobroker.flexcharts.png?downloads=true)

# IoBroker.flexcharts
**测试：**![测试与发布](https://github.com/MyHomeMyData/ioBroker.flexcharts/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 flexcharts 适配器
# 基本概念
ioBroker 中有多种适配器可用于查看图表。据我所知，它们都使用 UI 来配置图表的内容和选项。通常，并非所有使用的图形子系统的功能都可以以这种方式使用。例如，无法使用 eChart-Adapter 查看功能齐全的堆叠图表。

此适配器使用不同的方法。它带来了[Apache ECharts](https://echarts.apache.org/en/index.html) 到 ioBroker。查看 [演示图表](https://echarts.apache.org/examples/en/index.html)的完整功能集。

备注：适配器尚未在 MacOS 上测试。

**没有 UI 可以配置任何图表。**您必须自己定义图表，适配器负责可视化。您必须通过提供内容作为 json 对象来提供图表的定义和内容 - 在 eCharts 示例中，它对应于变量 `option` 的内容。这里有一个例子来说明。要创建堆叠图表，请将其定义存储在 ioBroker 状态（json 格式）中：

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

flexchart 适配器将显示此图表：![flexcharts_stacked1](https://github.com/user-attachments/assets/7cf6dfab-ddad-4b2f-a1e1-20fa4b876b4c)

通常您将使用 Blockly 或 javascript 来创建和更新此状态的内容。

还有另一种可能性，即通过 javascript 中的回调函数直接传递 eCharts 数据。详情见下文。

需要明确的是：这种方法不适用于快速创建简单图表。
但如果您对更复杂的图表有非常具体的想法，flexcharts 可以实现它。

＃ 入门
### 使用适配器
此适配器将其功能作为 Web 扩展。因此，必须安装并运行 [网络适配器](https://www.iobroker.net/#en/adapters/adapterref/iobroker.ws/README.md) (`web.0`)。假设您使用标准端口 8082 作为 Web 适配器。

当 flexcharts 适配器处于活动状态时，您可以通过 http://localhost:8082/flexcharts/echarts.html 访问它（将`localhost` 替换为您的 ioBroker 服务器的地址）。

您可以在 vis 或 jarvis 或其他可视化的 iFrame 小部件中使用此地址。当然，您也可以直接在浏览器选项卡中使用它。

为了使其工作，您必须提供其他参数来告知适配器数据源。有两个选项可用：

* `source=state` => 您以 ioBroker 状态 (json) 提供图表数据
* `source=script` => 您通过脚本（javascript 或 blockly）提供图表数据

有一个内置的演示图表可用：http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1

要使用 ECharts 的暗模式，请添加`&darkmode`，例如 http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1&darkmode

要启用图表的定期刷新，请使用选项`&refresh`，例如 http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1&refresh=15 每 15 秒刷新一次图表。最小值为 5 秒。默认为 60 秒。

### 使用 ioBroker 状态作为 echart 的源
例如：`http://localhost:8082/flexcharts/echarts.html?source=state&id=0_userdata.0.echarts.chart1`

<!-- Would this be better to read: Example: http://localhost:8082/flexcharts/echarts.html?<mark style="background-color: #ffff00">source=state</mark>&<mark style="background-color: #00c000">&id=0_userdata.0.echarts.chart1</mark> -->

Flexcharts 会将状态 `0_userdata.0.echarts.chart1` 评估为 eChart 的数据。尝试一下：创建这样的状态并复制上面示例的 json 数据（`{ "tooltip": { ...`）作为状态内容，然后使用浏览器访问给定的地址。

### 使用 javascript 作为 echarts 的源代码
这有点复杂，但效率更高。你可以直接通过 JS 脚本提供图表数据，该脚本由 flexcharts 适配器动态调用。

再次强调，最好使用示例进行解释。创建一个包含以下内容的脚本（仅支持第一个 JS 实例 (**javascript.0**)，脚本名称无关紧要）：

```
onMessage('flexcharts', (data, callback) => {
    console.log(`data = ${JSON.stringify(data)}`);
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

应显示与前面的示例相同的图表。

请注意，**您必须使用 `onMessage()` 功能从适配器接收触发器**。如上例所示，消息的默认值为 `flexcharts`。您可以通过提供附加参数来使用不同的消息，例如，要使用消息 `mycharts`，请将 `&message=mycharts` 添加到 http 地址：`http://localhost:8082/flexcharts/echarts.html?source=script&message=mycharts`

可以将其他参数转发到脚本，并在脚本中的变量`data`中提供。尝试以下命令：`http://localhost:8082/flexcharts/echarts.html?source=script&chart=chart1&params={"period":"daily"}`

这应该在示例脚本中给出一个日志条目：`data = {"source":"script","chart":"chart1","params":"{\"period\":\"daily\"}"}`

我正在开发更复杂的 javascript 模板，以简化适配器的使用。[第一个模板](templates/flexchartsTemplate1.js) 可用，请参阅文件夹模板。
Viessmann E3 系列设备有一个非常具体的用例，例如热泵 Vitocal 250。请参阅 https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35 即将推出更多内容。敬请期待。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
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

Copyright (c) 2024 MyHomeMyData <juergen.bonfert@gmail.com>

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