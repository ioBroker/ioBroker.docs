![Logo](admin/flexcharts-icon-small.png)
# ioBroker.flexcharts

[![NPM version](https://img.shields.io/npm/v/iobroker.flexcharts.svg)](https://www.npmjs.com/package/iobroker.flexcharts)
[![Downloads](https://img.shields.io/npm/dm/iobroker.flexcharts.svg)](https://www.npmjs.com/package/iobroker.flexcharts)
![Number of Installations](https://iobroker.live/badges/flexcharts-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/flexcharts-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.flexcharts.png?downloads=true)](https://nodei.co/npm/iobroker.flexcharts/)

**Tests:** ![Test and Release](https://github.com/MyHomeMyData/ioBroker.flexcharts/workflows/Test%20and%20Release/badge.svg)

## flexcharts adapter for ioBroker

# Basic concept
There are several adapters available to view charts within ioBroker. As far as I know, all of them are using a UI to configure content and options of the charts. Typically not all features of the used graphical sub system could be used in this way. E.g. it's not possible to view fully featured stacked charts with eChart-Adapter.

This adapter uses a different approach. It brings the complete feature set of [Apache ECharts](https://echarts.apache.org/en/index.html) to ioBroker. Take a look the [demo charts](https://echarts.apache.org/examples/en/index.html).

Remark: Adapter was not tested on MacOS, yet.

**There is no UI to configure any chart.** You have to define the chart yourself, the adapter takes care about visualization. You have to provide definition and content of the chart by providing the content as a json-object - in eCharts examples it corresponds to the content of variable `option`. Here's an example to make it clear. To create a stacked chart you store it's definition in an ioBroker state (json format):

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

flexchart adapter will then show this chart:
![flexcharts_stacked1](https://github.com/user-attachments/assets/7cf6dfab-ddad-4b2f-a1e1-20fa4b876b4c)

Typically you will use Blockly or javascript to create and update content of this state.

There is another possibility to directly hand over eCharts-data via callback function within javascript. For details see below.

To be clear: This approach is not intended to be used to quickly create a simple chart.
But if you have a very specific idea in mind for a more complex chart, flexcharts offers the possibility to implement it.

# Getting started

### Using the adapter

This adapter brings it's functionality as a web extension. Therefore it is mandatory to have installed and running the [web adapter](https://www.iobroker.net/#en/adapters/adapterref/iobroker.ws/README.md) (`web.0`). It's assumed you're using the standard port 8082 for web adapter.

Wenn flexcharts adapter is active you can access it via http://localhost:8082/flexcharts/echarts.html (replace `localhost` by address of your ioBroker server).

You may use this address in iFrame widgets of vis or jarvis or other visualizations. Of course you can also use it directly in a browser tab.

To make it work, you have to provide additional parameters to tell the adapter about the source of data. Two options are availabe:
* `source=state` => You provide chart data in an ioBroker state (json)
* `source=script` => You provide chart data via a script (javascript or blockly)

There is a built-in demo chart available: http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1

To use dark mode of ECharts add `&darkmode`, e.g. http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1&darkmode

To enable a regulary refresh of chart use option `&refresh`, e.g. http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1&refresh=15 to refresh chart ervery 15 seconds. Minumum value is 5 seconds. Defaults to 60 seconds.

### Use ioBroker state as source for an echart

Example: `http://localhost:8082/flexcharts/echarts.html?source=state&id=0_userdata.0.echarts.chart1`

<!--
Would this be better to read:
Example: http://localhost:8082/flexcharts/echarts.html?<mark style="background-color: #ffff00">source=state</mark>&<mark style="background-color: #00c000">&id=0_userdata.0.echarts.chart1</mark>
-->

Flexcharts will evaluate state `0_userdata.0.echarts.chart1` as data for eChart. Try it: Create such a state and copy json data of example shown above (`{ "tooltip": { ...`) as state content, then access given address with a browser.

### Use javascript as source for an echart

This is a bit more complicated but much more efficient. You provide the charts data directly by your JS script which is dynamically called by flexcharts adapter.

Again it's best to explain using an example. Create a script with this content (only first JS instance (**javascript.0**) is supported, name of script doesn't matter):
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

Start the script and access this address in a browser: `http://localhost:8082/flexcharts/echarts.html?source=script`

<!--
Would this be better to read:
Start the script and access this in a browser: http://localhost:8082/flexcharts/echarts.html?<mark style="background-color: #ffff00">source=script</mark>
-->

Same chart should show up as in previous example.

Pls. note, **you have to use the `onMessage()` functionality to receive the trigger from the adapter**. Default vaule for the message is `flexcharts` as shown in example above. You may use different messages by providing an additional parameter, e.g. to use message `mycharts` add `&message=mycharts` to http address: `http://localhost:8082/flexcharts/echarts.html?source=script&message=mycharts`

Additional paramters can be forwarded to the script and will be available within the script in variable `data`. Try following command: `http://localhost:8082/flexcharts/echarts.html?source=script&chart=chart1&params={"period":"daily"}`

This should give a log entry in the example script: `data = {"source":"script","chart":"chart1","params":"{\"period\":\"daily\"}"}`

I'm working on more elaborated javascript templates to simplify usage of the adapter. A [first template](templates/flexchartsTemplate1.js) is available, see folder templates.
A very specific use case is available for Viessmann devices of E3 series, e.g. heat pump Vitocal 250. Refer to https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35
More to come. Stay tuned.

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