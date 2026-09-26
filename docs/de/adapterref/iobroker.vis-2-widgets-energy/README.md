---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-energy/README.md
title: Vis 2 Energy-Widgets
hash: 0nZWKJSzVHGJIjJUIi9AZQZOpmfILcV7Amgf+gDNXz0=
---
![Logo](../../../en/adapterref/iobroker.vis-2-widgets-energy/admin/vis-2-widgets-energy.svg)

![Anzahl der Installationen](http://iobroker.live/badges/vis-2-widgets-energy-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.vis-2-widgets-energy.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-energy.svg)
![NPM](https://nodei.co/npm/iobroker.vis-2-widgets-energy.png?downloads=true)

# Vis 2 Energy-Widgets

Dieses Widget-Set besteht aus folgenden Widgets:

- Energieverteilung![Energieverteilung](../../../en/adapterref/iobroker.vis-2-widgets-energy/img/distribution.png)

- Vergleich des Energieverbrauchs![Energievergleich](../../../en/adapterref/iobroker.vis-2-widgets-energy/img/comparison.png)

![Kreisdiagramm](../../../en/adapterref/iobroker.vis-2-widgets-energy/img/pie.png)

- Zeitauswahl für den Energieverbrauch![Zeitauswahl](../../../en/adapterref/iobroker.vis-2-widgets-energy/img/timeSelector.png)

- Energieverbrauch pro Tag/Woche/Monat![Energieverbrauch](../../../en/adapterref/iobroker.vis-2-widgets-energy/img/consumption.png)

- Selbstversorgung und Selbstverbrauch als zwei Messinstrumente![Selbstversorgung](../../../en/adapterref/iobroker.vis-2-widgets-energy/img/selfSufficiency.png)

- Batteriespeicher mit Ladezustand, Leistung und verbleibender Zeit![Batteriespeicher](../../../en/adapterref/iobroker.vis-2-widgets-energy/img/battery.png)

- Energiekosten des ausgewählten Zeitraums, einschließlich Grundgebühr und Einspeisevergütung![Energiekosten](../../../en/adapterref/iobroker.vis-2-widgets-energy/img/energyCosts.png)

- Dynamischer Strompreis als stündliches Balkendiagramm![Dynamischer Strompreis](../../../en/adapterref/iobroker.vis-2-widgets-energy/img/dynamicPrice.png)

## Dokumentation

Eine Seite pro Widget, mit allen Konfigurationsfeldern, Rezepten und Hinweisen zur Fehlerbehebung:

- [Englisch](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md)
- [Deutsch](https://github.com/ioBroker/ioBroker.vis-2-widgets-energy/blob/master/docs/de/README.md)

## Anforderungen

Das Widget-Set basiert auf **React 19** und benötigt ein vis-2, das ebenfalls unter React 19 läuft (Version 2.20.1 oder neuer). Ältere Versionen von vis-2 verwenden noch React 18 und können diese Widgets nicht darstellen – aktualisieren Sie vis-2 zusammen mit diesem Adapter.

<!--
    ### **WORK IN PROGRESS**
-->

## Changelog

### **WORK IN PROGRESS**
* (@GermanBluefox) **BREAKING:** the widget set is now built with React 19 and MUI 9, and needs a vis-2 that runs on React 19 (2.20.1 and newer). A vis-2 on React 19 refuses widget sets that were built for React 18, and this build cannot run on an older vis-2 either
* (@GermanBluefox) Replaced `@iobroker/adapter-react-v5` with `@iobroker/gui-components` and took the shared module list from `@iobroker/types-vis-2`, so `react/jsx-runtime` is shared as vis-2 requires
* (@GermanBluefox) New widget "Self-sufficiency": two ring gauges for the self-sufficiency and the self-consumption quota, calculated from production, grid and house consumption
* (@GermanBluefox) New widget "Battery storage": state of charge, charge/discharge power, estimated remaining time and stored energy
* (@GermanBluefox) New widget "Energy costs": consumption x price plus base fee minus feed-in revenue, either from the value of a data point or summed over the period from the history
* (@GermanBluefox) New widget "Dynamic electricity price": hourly exchange prices as a bar chart with the cheapest and most expensive hours highlighted, reads the JSON arrays of tibberlink, awattar, epex-spot and similar adapters
* (@GermanBluefox) Added a tooltip to every configuration field of every widget, in all 11 languages
* (@GermanBluefox) Every widget now has a description in the vis-2 palette (`visHelp`), shown in the tooltip under its preview, in all 11 languages
* (@GermanBluefox) Added documentation in docs/en and docs/de: one page per widget with all fields, recipes and troubleshooting
* (@GermanBluefox) Distribution widget: the moving dots are animated by the browser instead of a state change every 50 ms, which re-rendered the whole widget 20 times a second even when nothing changed
* (@GermanBluefox) Distribution widget: new options for the line width, for switching the animation off and for showing values without the automatic Wh to kWh conversion
* (@GermanBluefox) Distribution widget: fixed the per-circle font size, which never had any effect because the default font size won over it
* (@GermanBluefox) Distribution widget: a Wh data point no longer shows the divided value with the unit "Wh"; the unit is corrected together with the value
* (@GermanBluefox) Distribution widget: the power line is now always counted into the segments of the house ring, not only when its circle happened to be the largest one
* (@GermanBluefox) Consumption widget: fixed the number of bars of a month, which was taken from the previous month - every February was drawn with 31 bars
* (@GermanBluefox) Consumption widget: fixed the last bar of the period being dropped in "Calculate difference" mode, so the current hour/day was missing
* (@GermanBluefox) Consumption widget: new chart types (line, area), options for legend and toolbox, decimals, and a tooltip that shows the unit of each series
* (@GermanBluefox) Comparison widget: fixed the units being mixed up between the devices as soon as more than one unit was in play
* (@GermanBluefox) Comparison widget: new options for sorting, decimals, vertical bars and value labels
* (@GermanBluefox) Interval selector: new options for which periods are offered, for hiding the "Now" button and for the date format
* (@GermanBluefox) Consumption widget: fixed the bucket edges being one millisecond short, which made the hourly axis print one hour twice and never reach 23:00
* (@GermanBluefox) Battery widget: the text next to the symbol is sized by the space it actually has, so the remaining time is no longer cut off on a large widget
* (@GermanBluefox) Self-sufficiency widget: the caption under a ring no longer grows into the value table on a large widget
* (@GermanBluefox) Self-sufficiency and energy costs widgets: the names in the value table are left aligned instead of floating in the middle of their column
* (@GermanBluefox) Dynamic price widget: the label of the average line is drawn inside the chart instead of being clipped at its edge
* (@GermanBluefox) All chart widgets follow the size of their container now instead of keeping the height of their first render
* (@GermanBluefox) Replaced the screenshots in the documentation with new ones taken from a running vis-2, and added one for each of the four new widgets
* (@GermanBluefox) Ported tasks.js to TypeScript (tasks.ts, executed with tsx) and taught the zrender workaround to tell a hoisted function declaration from a real use-before-definition
* (@GermanBluefox) The federation manifest is shipped with the widget set now, so vis-2 can verify its shared modules
* (hombach) Fixed missing translation for the "default radius size" field in the distribution widget config (#527)
* (hombach) Addressed repository checker findings: added a concurrency block and a dedicated adapter-tests job to the CI workflow, dropped the custom test-command, and removed the redundant mocha/@types/mocha devDependencies (provided by @iobroker/testing) (#526)

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

### 0.3.9 (2023-11-10)
* (bluefox) update packages

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