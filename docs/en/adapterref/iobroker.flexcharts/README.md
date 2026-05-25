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

## What's new in v0.7.2

**Beginner-friendly templates and step-by-step Cookbook** — making flexcharts more accessible for users new to ECharts:

- Two new beginner-friendly templates: [template6](templates/flexchartsTemplate6.js) (energy stacked bar with history adapter data) and [template7](templates/flexchartsTemplate7.js) (reactive gauge chart with SSE auto-update)
- Improved comments and STEP markers across all existing templates (1–5)
- New [Wiki with Cookbook](https://github.com/MyHomeMyData/ioBroker.flexcharts/wiki): step-by-step guides for building live charts from scratch — see [Further Examples and Resources](#further-examples-and-resources)

## What's new in v0.7.1

**SSE chart updates without page reload** — when using `&sse`, the chart now updates in place instead of reloading the full page:

- ECharts animations run smoothly on every data update
- No flickering or chart rebuild on refresh
- Works transparently for all existing `&sse` URLs — no changes needed

## What's new in v0.7.0

**Event-triggered chart refresh via SSE** — charts now update automatically when their source data changes, without any polling:

- Add `&sse` to a chart URL to activate [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- With `source=state`: the chart updates whenever the state specified by `&id=` changes
- With `source=script`: add `&triggerid=<state_id>` to specify which state triggers the update

Example: `http://localhost:8082/flexcharts/echarts.html?source=state&id=0_userdata.0.echarts.chart1&sse`

See [Event-triggered chart refresh (SSE)](#event-triggered-chart-refresh-sse) for full details.

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

### Event-triggered chart refresh (SSE)

Add `&sse` to any chart URL to enable automatic chart updates via [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events). The browser keeps a persistent connection to the server and updates the chart in place whenever the source data changes — no page reload, no polling interval needed. ECharts animations run smoothly on every update.

**With `source=state`:**

The chart updates automatically whenever the state specified by `&id=` changes.

```
http://localhost:8082/flexcharts/echarts.html?source=state&id=0_userdata.0.echarts.chart1&sse
```

**With `source=script`:**

The script controls the chart content, so flexcharts cannot know which state triggers a refresh. Specify it explicitly with `&triggerid=<state_id>`:

```
http://localhost:8082/flexcharts/echarts.html?source=script&message=mycharts&triggerid=0_userdata.0.echarts.trigger&sse
```

The chart updates whenever `0_userdata.0.echarts.trigger` changes. Your ioBroker script can update that state to push chart updates to the browser.

**Throttle and ack filter:**

By default (`&sse` without value) the chart updates at most once every 5 seconds (minimum). Pass a number to set a longer minimum interval:

```
...&sse=30    → update at most once every 30 seconds
```

For fine-grained control use a JSON object (URL-encoded):

```
...&sse={"refresh":10,"ack":true}   → update only on acknowledged state changes, at most every 10 s
...&sse={"ack":false}               → update only on unacknowledged changes (set by script), default interval
```

State changes during the throttle interval are not lost — the update is deferred to the next allowed moment.

> **Note:** `&sse` and `&refresh` can be combined — SSE triggers an in-place update on state change, `&refresh` provides a fallback periodic page reload.

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
| [template2](templates/flexchartsTemplate2.js) | Simple line chart with data from the history adapter — reactive SSE updates |
| [template3](templates/flexchartsTemplate3.js) | Stacked bar chart with function in chart definition |
| [template4](templates/flexchartsTemplate4.js) | Event-driven dynamic chart |
| [template5](templates/flexchartsTemplate5.js) | Custom themes with dynamic dark mode switching |
| [template6](templates/flexchartsTemplate6.js) | **Beginner-friendly:** Energy overview — stacked bar chart with data from history adapter |
| [template7](templates/flexchartsTemplate7.js) | **Beginner-friendly:** Gauge chart showing current state values (battery, PV, heat pump, sensors) — reactive SSE updates |

## Further Examples and Resources

### Cookbook (step-by-step guides)

New to flexcharts or ECharts? The **[flexcharts Wiki](https://github.com/MyHomeMyData/ioBroker.flexcharts/wiki)** provides step-by-step cookbook articles that guide you from a static chart to a fully live, interactive dashboard:

| Article | What you learn |
|---------|---------------|
| [A1 — Stacked Area Chart](https://github.com/MyHomeMyData/ioBroker.flexcharts/wiki/Cookbook-A1-Stacked-Area-Chart) | Build a live chart with SSE auto-update; connect real data states via a script |
| [A2 — Adding a Pie Chart](https://github.com/MyHomeMyData/ioBroker.flexcharts/wiki/Cookbook-A2-Adding-a-Pie-Chart) | Extend the chart with a pie chart showing weekly energy distribution |
| [A3 — Interactive Charts](https://github.com/MyHomeMyData/ioBroker.flexcharts/wiki/Cookbook-A3-Interactive-Charts) | Event-driven charts: pie reacts to hover; shared datasets, event handler strings |

More cookbook articles are planned.

### Third-party adapter examples

- **tibberLink adapter:** see discussions [here](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/67) and [here](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/66) — tibberLink also uses flexcharts natively, see its [documentation](https://github.com/hombach/ioBroker.tibberlink?tab=readme-ov-file#2-using-the-flexcharts-or-fully-featured-echarts-adapter-with-json)
- **sun2000 adapter:** native [integration of flexcharts](https://github.com/bolliy/ioBroker.sun2000/wiki/Statistk-(statistics)) is available
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
| `sse` | no value \| `<n>` \| `<json>` | Activate event-triggered chart updates via Server-Sent Events. No value or `&sse=5`: update at most every 5 s (minimum). `&sse=<n>`: minimum seconds between updates. `&sse={"refresh":<n>,"ack":true\|false}`: additionally filter by acknowledgement state. |
| `triggerid=<state_id>` | | State ID to watch for changes when using `source=script` with `&sse`. |
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
### 0.7.2 (2026-05-07)
* (MyHomeMyData) Added beginner-friendly templates 6 (energy stacked bar chart with history adapter) and 7 (reactive gauge chart with SSE auto-update)
* (MyHomeMyData) Improved comments and STEP markers in templates 1–5
* (MyHomeMyData) Added Wiki with Cookbook articles A1–A3 (step-by-step guides for building live charts)

### 0.7.1 (2026-05-05)
* (MyHomeMyData) Adapter requires node.js >= 22 now
* (MyHomeMyData) SSE now updates chart in place via setOption instead of reloading the page — ECharts animations work correctly on data updates

### 0.7.0 (2026-04-15)
* (MyHomeMyData) Implemented SSE (Server-Sent Events) to support event driven updating of chart

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

### Older versions

Older changelog entries are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

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
