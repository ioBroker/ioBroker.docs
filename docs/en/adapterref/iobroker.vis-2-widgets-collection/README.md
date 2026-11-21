![Logo](/admin/vis-2-widgets-collection.png)

# Collection of widgets for ioBroker.vis 2.0

![Number of Installations](http://iobroker.live/badges/vis-2-widgets-collection-installed.svg) ![Number of Installations](http://iobroker.live/badges/vis-2-widgets-collection-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.vis-2-widgets-collection.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-collection)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-collection.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-collection)

[![NPM](https://nodei.co/npm/iobroker.vis-2-widgets-collection.png?downloads=true)](https://nodei.co/npm/iobroker.vis-2-widgets-collection/)

<h2 align="center">Widgets for ioBroker.vis 2.0</h2>

📖 **[Ausführliche Dokumentation im GitHub Wiki](https://github.com/Steiger04/ioBroker.vis-2-widgets-collection/wiki)**

## Widgets

### State

<img src="/img/collection-state.png" height="150">

### ButtonGroup

<img src="/img/collection-button-group.png" height="150">

### Slider

<img src="/img/collection-slider.png" height="150">

### Input

<img src="/img/collection-input.png" height="150">

### Switch

<img src="/img/collection-switch.png" height="150">

### Checkbox

<img src="/img/collection-checkbox.png" height="150">

### Dialog

<img src="/img/collection-dialog.png" height="150">

### Select

<img src="/img/collection-select.png" height="150">

### RadioGroup

<img src="/img/collection-radio-group.png" height="150">

### Gauge

<img src="/img/collection-gauge.png" height="150">

### Light

<img src="/img/collection-light.png" height="150">

### JsonTable

<img src="/img/collection-json-table.png" height="150">

### ECharts

<img src="/img/collection-echarts.png" height="150">

---

## Notes

### AI assistant

The AI assistant of the vis-2 editor (and external MCP clients such as Claude Desktop) can build views with
collection widgets and change their theme; name the set `vis-2-widgets-collection` in your request. The collection itself brings no AI.
Access, example prompts, templates and limits: [AI assistant in the wiki](https://github.com/Steiger04/ioBroker.vis-2-widgets-collection/wiki/En-AI-Assistant)
([Deutsch](https://github.com/Steiger04/ioBroker.vis-2-widgets-collection/wiki/De-AI-Assistant)).

### ECharts: values from strings

Charts with string-valued states now correctly plot: `'23.5'`, `'23.5 °C'`, `'23,5'` and
`'true'`/`'false'` all read as numbers at the ONE intake every value source shares (Verlauf,
JSON series, table columns, bound marking lines). Text that carries no number shows as a gap
instead of a faked 0 line. One caveat for German-style input: once the string contains a dot,
it is read as dot-decimal — a thousands separator like in `'1.234,5'` will not round-trip.

**History aggregation on string states**: the server-side aggregates (`average`, `max`, …) may
not preserve string values. Until empirically verified against a live server, configure string
OIDs with the `none` or `onchange` aggregation so the raw strings reach the chart — the intake
reads them from there.

---

## Changelog

### 3.3.1 (2026-11-17)

- (steiger04) Same content as 3.3.0, whose release build failed before it reached npm

### 3.3.0 (2026-11-17)

- (steiger04) Theme Studio: the new "Widget frame" section sets the frame of all widgets at once
- (steiger04) Attribute panel: frame settings show the value they inherit from the theme
- (steiger04) Existing widgets keep their frame settings and look unchanged
- (steiger04) The vis-2 AI assistant can set the widget frame of all widgets with the theme
- (steiger04) A widget without card no longer shows a shadow

### 3.2.0 (2026-11-15)

- (steiger04) Node.js 22 or newer is required
- (steiger04) Light: new light type `dimmer` for lamps that only dim (#22)

### 3.1.0 (2026-11-15)

- (steiger04) The vis-2 AI assistant can now build pages with these widgets
- (steiger04) The vis-2 AI assistant can now also change the theme if you name the set `vis-2-widgets-collection`
- (steiger04) Every widget shows a short tooltip in the palette
- (steiger04) Grid layout: widgets keep the height of their grid rows
- (steiger04) The theme now accepts only hex, `rgb()` and `hsl()` colors
- (steiger04) An open theme studio without unsaved changes now follows theme changes made elsewhere
- (steiger04) Many fixes across all widgets

### 3.0.2 (2026-11-11)

- (steiger04) Same content as 3.0.0; the release builds of 3.0.0 and 3.0.1 failed before they reached npm

## License

The MIT License (MIT)

Copyright (c) 2026 Steiger04 <steiger04@posteo.de>

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