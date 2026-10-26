---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
---
![Logo](admin/vis-2-widgets-energy.svg)
# Vis 2 Energy widgets

![Number of Installations](http://iobroker.live/badges/vis-2-widgets-energy-installed.svg) ![Number of Installations](http://iobroker.live/badges/vis-2-widgets-energy-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.vis-2-widgets-energy.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-energy)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-energy.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-energy)

[![NPM](https://nodei.co/npm/iobroker.vis-2-widgets-energy.png?downloads=true)](https://nodei.co/npm/iobroker.vis-2-widgets-energy/)

This widget set consists of the following widgets:
- Energy distribution
![Energy distribution](img/distribution.png)

- Energy consumption comparison
![Energy comparison](img/comparison.png)
 
![Pie chart](img/pie.png)

- Time selector for energy consumption
![Time selector](img/timeSelector.png)

- Energy consumption per day/week/month
![Energy consumption](img/consumption.png)

- Self-sufficiency and self-consumption as two ring gauges
![Self-sufficiency](img/selfSufficiency.png)

- Battery storage with state of charge, power and remaining time
![Battery storage](img/battery.png)

- Energy costs of the selected period, including base fee and feed-in revenue
![Energy costs](img/energyCosts.png)

- Dynamic electricity price as an hourly bar chart
![Dynamic electricity price](img/dynamicPrice.png)

## Documentation

One page per widget, with every configuration field, recipes and troubleshooting:

- [English](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md)
- [Deutsch](https://github.com/ioBroker/ioBroker.vis-2-widgets-energy/blob/master/docs/de/README.md)

## Requirements

The widget set is built with **React 19** and needs a vis-2 that runs on React 19 as well (2.20.1 and newer).
An older vis-2 still runs on React 18 and cannot render these widgets — update vis-2 together with this
adapter.

<!--
    ### **WORK IN PROGRESS**
-->

## Changelog
### 3.0.1 (2026-10-16)
* (@GermanBluefox) **BREAKING:** built with React 19 and MUI 9 - requires vis-2 2.20.1 or newer (React 19)
* (@GermanBluefox) New widgets: self-sufficiency, battery storage, energy costs and dynamic electricity price
* (@GermanBluefox) Tooltips for all configuration fields, a palette description for every widget and new documentation (docs/en, docs/de) with fresh screenshots
* (@GermanBluefox) Distribution widget: animation done by the browser (much less CPU load); new options for line width, animation and raw values; fixed font size, Wh/kWh unit and house ring segments
* (@GermanBluefox) Consumption widget: new chart types (line, area), legend, toolbox and decimals; fixed number of bars per month, missing last bar and bucket edges
* (@GermanBluefox) Comparison widget: new options for sorting, decimals, vertical bars and value labels; fixed mixed-up units
* (@GermanBluefox) Interval selector: configurable periods, "Now" button and date format
* (@GermanBluefox) Layout fixes for large widgets; all charts follow the size of their container
* (@GermanBluefox) Build: replaced adapter-react-v5 with gui-components, tasks.ts in TypeScript, federation manifest is shipped
* (hombach) Fixed missing translation of "default radius size" (#527) and addressed repository checker findings (#526)

### 2.0.1 (2026-08-13)
* (hombach) **BREAKING:** the comparison widget no longer auto-converts W→Wh / kW→kWh nor divides Wh values by 1000. It now shows the real datapoint unit and raw value; use the "factor" field for scaling (#243)
* (hombach) Comparison widget: option to disable chart animations or set their duration (#416)
* (hombach) Distribution widget: optional second value per node shown in the circle (e.g. a battery state of charge / SoC in %) (#416, #74)
* (hombach) Consumption widget: added a per-device factor and a y-axis unit label (#451)
* (hombach) Consumption widget: added a "stacked" option to preselect stacked vs grouped bars (#451)
* (hombach) Migrated the widget sources from JavaScript/JSX to TypeScript
* (hombach) Migrated the widget build from Create React App (react-scripts/craco) to Vite with module federation
* (hombach) Fixed broken `check` and `lint` scripts (added tsconfig files, repaired ESLint flat config for JSX sources)
* (hombach) Fixed duplicated "inner radius" field in the consumption comparison widget config (#393)
* (hombach) Fixed unit of the feed-back (return) value not following the power line unit in the distribution widget (#212)
* (hombach) Fixed wrong/missing Sunday data in the consumption widget (week view now starts correctly on Monday) (#270, #290)
* (hombach) The comparison widget x-axis now uses the configured/detected device unit instead of always showing "kWh" (#243)
* (hombach) Addressed repository checker findings: dependabot cooldown + @types/node major-ignore, removed self-referencing licenseInformation link, ignore .commitinfo (#512)
* (hombach) Added a check-and-lint job to the CI workflow (#512)
* (hombach) Updated echarts to v6 (#6)
* (hombach) Updated TypeScript dev dependency to v6 (v7 still blocked by typescript-eslint)
* (hombach) Updated @iobroker/adapter-react-v5 to v8 and added the @emotion/react + @emotion/styled dependencies required by MUI (#17)
* (hombach) Removed the unused legacy ESLint stack (airbnb config, deprecated eqeqeq-fix, only-warn) and the dead .eslintrc.js from src-widgets
* (hombach) Fixed copyright year (#461)
* (hombach) Removed deprecated common.noConfig from io-package.json (#499)
* (hombach) Fixed build failure by removing deprecated node-sass dependency
* (hombach) testing for node.js 24 (#383)
* (hombach) updated GitHub actions
* (hombach) updated dependencies
* (hombach) fixed repo checker warnings
* (@GermanBluefox) Refactored the code

### 1.0.2 (2024-08-06)
* (bluefox) updated packages

### 1.0.0 (2024-07-07)
* (bluefox) Removed withStyles package

### 0.3.11 (2024-02-16)
* (bluefox) show value with green color if we feed back into power line

## License
The MIT License (MIT)

Copyright (c) 2022-2026 bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.