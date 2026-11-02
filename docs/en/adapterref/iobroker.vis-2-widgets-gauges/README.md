---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-gauges/README.md":{"title":{"en":"Gauge widgets for ioBroker.vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-gauges/README.md"},"en/adapterref/iobroker.vis-2-widgets-gauges/docs/en/README.md":{"title":{"en":"Gauges for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-gauges/docs/en/README.md"}}}
---
![Logo](admin/vis-2-widgets-gauges.svg)
# Gauge widgets for ioBroker.vis-2

![Number of Installations](http://iobroker.live/badges/vis-2-widgets-gauges-installed.svg) ![Number of Installations](http://iobroker.live/badges/vis-2-widgets-gauges-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.vis-2-widgets-gauges.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-gauges)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-gauges.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-gauges)

[![NPM](https://nodei.co/npm/iobroker.vis-2-widgets-gauges.png?downloads=true)](https://nodei.co/npm/iobroker.vis-2-widgets-gauges/)

Ten widgets for [ioBroker.vis-2](https://github.com/ioBroker/ioBroker.vis-2) that show a value as a gauge:

| Widget        | Id                     | For example                                                 |
|---------------|------------------------|-------------------------------------------------------------|
| Color gauge   | `tplGauge2Color`       | a half circle of colored segments with a needle             |
| Water gauge   | `tplGauge2Water`       | humidity, filling in percent                                |
| Battery gauge | `tplGauge2Battery`     | battery of a sensor, phone or car, with charging indicator  |
| Radial gauge  | `tplGauge2Radial`      | power, speed, pressure - the classic instrument             |
| Arc gauge     | `tplGauge2Arc`         | any value with a set point marker, also as LED segments     |
| Linear gauge  | `tplGauge2Linear`      | horizontal or vertical bar, e.g. grid power from -3 to 6 kW |
| Thermometer   | `tplGauge2Thermometer` | inside and outside temperature                              |
| Compass       | `tplGauge2Compass`     | wind direction and speed, heading                           |
| Tank          | `tplGauge2Tank`        | heating oil, cistern, pellets                               |
| Rings         | `tplGauge2Rings`       | up to five values at once, e.g. PV, consumption, battery    |

![All widgets](docs/img/overview.png)

The widgets are drawn as plain SVG with React, without chart or UI libraries, and follow the light and the dark theme
of vis-2.

## Documentation

Every widget with all its settings and screenshots: [English](/#/docs/adapterref/iobroker.vis-2-widgets-gauges/docs/en/README.md) | [Deutsch](https://github.com/ioBroker/ioBroker.vis-2-widgets-gauges/blob/master/docs/de/README.md)

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
## Changelog
### 3.0.0 (2026-10-16)
* (bluefox) Rewrote the color, water and battery gauge as plain SVG without react-gauge-chart, react-liquid-gauge, react-battery-gauge, d3 and MUI - the widget set works with the React 19 version of vis-2 again. Projects keep all their settings
* (bluefox) Added 7 new widgets: radial gauge, arc gauge, linear gauge, thermometer, compass, tank and rings
* (bluefox) Color gauge: the value is shown below the needle, minimum and maximum can be shown, the needle length works, `0` for corner radius, padding and margin is really 0
* (bluefox) Water gauge: digits after comma and color of the liquid; the value counts up during the rise animation
* (bluefox) Battery gauge: optional medium level, stroke width of the body, percent sign can be hidden, the text stays horizontal in a vertical battery
* (bluefox) Values that are not numbers are shown as text, a missing value as `–`
* (bluefox) All widgets follow the dark theme of vis-2
* (bluefox) Added documentation with screenshots (English and German)
* (bluefox) The adapter icon is an SVG now
* (bluefox) Updated packages and the build (vite 8, React 19 types)

### 2.0.3 (2026-06-04)
* (bluefox) Updated packages

### 2.0.2 (2025-08-26)
* (bluefox) Support for older Android devices

### 2.0.1 (2025-07-01)
* (bluefox) Rewritten with TypeScript

### 1.1.1 (2024-11-25)
* (bluefox) Allowed to define digits after comma for the color gauge

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