![Logo](admin/flexcharts-icon-small.png)
# ioBroker.flexcharts

[![NPM version](https://img.shields.io/npm/v/iobroker.flexcharts.svg)](https://www.npmjs.com/package/iobroker.flexcharts)
[![Downloads](https://img.shields.io/npm/dm/iobroker.flexcharts.svg)](https://www.npmjs.com/package/iobroker.flexcharts)
![Number of Installations](https://iobroker.live/badges/flexcharts-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/flexcharts-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.flexcharts.png?downloads=true)](https://nodei.co/npm/iobroker.flexcharts/)

**Tests:** ![Test and Release](https://github.com/MyHomeMyData/ioBroker.flexcharts/workflows/Test%20and%20Release/badge.svg)

## flexcharts adapter for ioBroker

Bring the full power of [Apache ECharts](https://echarts.apache.org/en/index.html) to ioBroker — without any limitations imposed by a graphical configuration UI.

> **This adapter is aimed at experienced users.** There is no UI to configure charts. You define charts entirely in code (JavaScript or Blockly) or as JSON stored in an ioBroker state.

Take a look at the [ECharts demo gallery](https://echarts.apache.org/examples/en/index.html) to get an idea of what's possible.

Remark: Adapter was not tested on MacOS, yet.

## What's new in v0.6.0

**Apache ECharts v6.0.0** is now the basis of flexcharts. Key additions:

- Brand new default theme
- Pass an unlimited number of custom themes
- Dynamic theme switching — e.g. follow the system's dark mode (`&darkmode=auto`)
- New chart types
- Pass an unlimited number of event-driven functions

> **ECharts v5 themes** are still available via the `&themev5` parameter, e.g.:
> `http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1&themev5`
>
> Apache offers a v5 light theme but no v5 dark theme — a custom v5 dark theme based on Apache's v5.6.0 dark theme is included. If you notice differences, please report an issue.

## How it works

Other ioBroker chart adapters use a UI to configure chart content and options — which typically limits what you can express. flexcharts takes a different approach:

1. You define the chart as a JSON object (the ECharts `option` variable) — either stored in an ioBroker state or returned from a JavaScript script.
2. flexcharts passes that definition to Apache ECharts in the browser and renders it.

Example — a stacked bar chart stored as a state value:

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

Result:

![flexcharts_stacked1](https://github.com/user-attachments/assets/7cf6dfab-ddad-4b2f-a1e1-20fa4b876b4c)

## Prerequisites

flexcharts runs as a web extension. The [web adapter](https://www.iobroker.net/#en/adapters/adapterref/iobroker.ws/README.md) (`web.0`) must be installed and running. The examples below assume the default port 8082.

## Getting started

### Verify installation

Open this URL in a browser (replace `localhost` with your ioBroker server address):

`http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1`

A demo chart should appear. If it does, the adapter is working correctly.

### Source option 1 — ioBroker state

`http://localhost:8082/flexcharts/echarts.html?source=state&id=0_userdata.0.echarts.chart1`

flexcharts reads the state `0_userdata.0.echarts.chart1` and renders it as an EChart. Create this state, paste the JSON example from above as its value, then open the URL.

> **Note:** These characters are not allowed in state IDs: `: / ? # [ ] @ ! $ & ' ( ) * + , ; = %`

### Source option 2 — JavaScript script

This is more flexible. flexcharts calls your script on each request and your script returns the chart definition. Additional URL parameters are forwarded to the script.

Only **javascript.0** (the first JS adapter instance) is supported.

Create a script:

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

Start the script, then open: `http://localhost:8082/flexcharts/echarts.html?source=script`

The default message name is `flexcharts`. To use a different name add `&message=mycharts` and adjust `onMessage('mycharts', ...)` accordingly.

Extra URL parameters are passed through to the script in `httpParams`:

`http://localhost:8082/flexcharts/echarts.html?source=script&chart=chart1&myjsonparams={"period":"daily"}`

## Advanced features

### JavaScript functions inside chart definitions

Standard `JSON.stringify()` strips functions from chart definitions. To include functions (e.g. custom formatters), use the npm module `javascript-stringify`:

1. Add `javascript-stringify` to "Additional npm modules" in the javascript adapter configuration:
   ![add npm modules](add_npm_modules.png)
2. In your script: `var strify = require('javascript-stringify');`
3. Replace `callback(option)` with `callback(strify.stringify(option))`
   — or for a state: `setState('my_chart_id', strify.stringify(option), true)`

See [template3](templates/flexchartsTemplate3.js) for a working example using a tooltip formatter.

> **Security note:** `javascript-stringify` enables passing arbitrary code to the browser. Do not expose ioBroker to the Internet when using this module.

### Event-driven dynamic charts

ECharts supports interactive charts that update in response to user actions. See this [ECharts example](https://echarts.apache.org/examples/en/editor.html?c=dataset-link) and a [screen recording with flexcharts](dynamic_charts_with_flexcharts.mkv).

Use a **script as source** and pass chart definition and event handlers as an array. [Template 4](templates/flexchartsTemplate4.js) demonstrates this. Key rules:

- Event handlers must use `myChart.on("event", function(e){ ... })`
- The handler must be a JavaScript string (use consistent quoting, or minify with a [JS minifier](https://www.toptal.com/developers/javascript-minifier))
- Pass everything as an array: `callback([strify.stringify(option), onEvent1, onEvent2])`

With a **state as source**, the state must be a JSON array of strings. Both the chart definition and the handler strings must be valid JSON strings (no newlines, only escaped quotes inside). Example: `flexcharts.0.info.chart3`.

> **Note for users upgrading from v0.4.x:** The chart options variable was renamed from `jsopts` to `option` in v0.5.0. Update your event handler functions accordingly.

> **Security note:** Same as above — do not expose ioBroker to the Internet when using `javascript-stringify`.

### Themes (ECharts v6)

Use the Apache ECharts [Theme Builder](https://echarts.apache.org/en/theme-builder.html) to create or modify themes.

**Using a script as source:**

1. Download theme from Theme Builder → tab "JSON version" → Copy
2. In your script: `const myThemeDefault = <paste here>`
3. Pass it as part of the callback array:
   `callback([JSON.stringify(option), ['default', JSON.stringify(myThemeDefault)]])`

[Template 5](templates/flexchartsTemplate5.js) shows full theme switching including dark mode.

**Using a state as source:**

The state value must be an array: `[<stringified chart>, ['default', <stringified theme>]]`.
See `flexcharts.0.info.chart4` for a working example.

Themes other than `default` and `dark` require explicit activation via `myChart.setTheme(<name>)` inside an event-driven function.

**Quick try:**
```
callback([JSON.stringify(option), ['default', '{"title":{"left":"left"},"color":["#ff715e","#ffaf51","#ffee51","#8c6ac4","#715c87"],"backgroundColor":"rgba(64,64,64,0.5)"}']]);
```

## Templates

| Template | Description |
|----------|-------------|
| [template1](templates/flexchartsTemplate1.js) | Chart with data from the history adapter |
| [template2](templates/flexchartsTemplate2.js) | Simple heat curve chart |
| [template3](templates/flexchartsTemplate3.js) | Stacked bar chart with function in chart definition |
| [template4](templates/flexchartsTemplate4.js) | Event-driven dynamic chart |
| [template5](templates/flexchartsTemplate5.js) | Custom themes with dynamic dark mode switching |

Further examples:
- **tibberLink adapter:** see discussions [here](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/67) and [here](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/66) — tibberLink also uses flexcharts natively, see its [documentation](https://github.com/hombach/ioBroker.tibberlink?tab=readme-ov-file#2-using-the-flexcharts-or-fully-featured-echarts-adapter-with-json)
- **Viessmann E3 series** (e.g. Vitocal 250 heat pump): [ioBroker.e3oncan discussion](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35)

## Reference

Base URL: `http://localhost:8082/flexcharts/echarts.html`

| Parameter | Values | Description |
|-----------|--------|-------------|
| `source=state` | | Read chart definition from an ioBroker state. Requires `id`. |
| `source=script` | | Call a JavaScript script via `onMessage()`. |
| `id=<state_id>` | | State ID to read (required for `source=state`). |
| `message=<name>` | default: `flexcharts` | Message name for `onMessage()` in the script. |
| `darkmode` | `on` \| `off` \| `auto` | Dark mode: `on`/no value = always dark, `off` = always light, `auto` = follow system setting. |
| `refresh=<n>` | seconds, min. 5, default 60 | Auto-reload interval. Only active when parameter is present. |
| `themev5` | | Use Apache ECharts v5 default and dark themes instead of v6 defaults. |
| `<custom>=<value>` | | Any additional parameters are forwarded to the script in `httpParams`. |

## Donate

<a href="https://www.paypal.com/donate/?hosted_button_id=WKY6JPYJNCCCQ"><img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.flexcharts/main/admin/bluePayPal.svg" height="40"></a>  
If you enjoyed this project — or just feeling generous, consider buying me a beer. Cheers! :beers:

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
