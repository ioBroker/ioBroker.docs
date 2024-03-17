---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-justgage/README.md
title: kein Titel
hash: GxxAty8Ge01GECR7FjOilfLBB37Y+Vn50SKmR8kc1Z4=
---
![Logo](../../../en/adapterref/iobroker.vis-justgage/admin/justgage.png) ioBroker.vis-justgage

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.vis-justgage)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-justgage.svg)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.vis-justgage)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.vis-justgage)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.vis-justgage/latest)
![GitHub letzter Commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.vis-justgage)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.vis-justgage)
![NPM-Version](http://img.shields.io/npm/v/iobroker.vis-justgage.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/vis-justgage-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/vis-justgage-installed.svg)

[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/vis-justgage/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Ausführung:**

**Tests:**

[![Test und Veröffentlichung](https://github.com/iobroker-community-adapters/ioBroker.vis-justgage/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.vis-justgage/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.vis-justgage/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.vis-justgage/actions/workflows/codeql.yml)

[justGage](http://justgage.com/) Widget für ioBroker.

![Bildschirmfoto](../../../en/adapterref/iobroker.vis-justgage/img/widgets.png)

## Zeigeroptionen
Es besteht die Möglichkeit, die Zeigeroptionen zu definieren:

```
{
  "toplength": null,
  "bottomlength": null,
  "bottomwidth": null,
  "stroke": "none",
  "stroke_width": 0,
  "stroke_linecap": "square",
  "color": "#000000"
}
```

Es muss ein gültiges JSON-Objekt sein. Einzelquoten sind nicht zulässig! Weitere Informationen zu Zeigeroptionen finden Sie hier: https://github.com/toorshia/justgage#pointer-options

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.1.7 (2024-03-07)
- (bluefox) Added message by installation or update if vis is not installed

### 2.1.6 (2024-03-04)
- (bluefox) Added the possibility to invert the value by gauge
- (bluefox) do not load scripts if the widget is not used

### 2.1.5 (2024-03-03)
- (bluefox) fixed the problem in vis-2

### 2.1.0 (2023-12-10)
- (mcm1957) 'Title' has been read
- (mcm1957) Code base has been restored to release 1.0.2 which has not been saved to GitHub
- (mcm1957) Dependencies have been updated

### 2.0.2 (2023-11-25)
- (mcm1957) Mode setting has been adapted
- (mcm1957) Adapter-core dependency has been removed

### 2.0.1 (2023-11-24)
- (mcm1957) Missing files blocking any functionality have been added to package again

### 2.0.0 (2023-10-24)
- (mcm1957) Adapter has been moved to iobroker-community-adapters organization
- (mcm1957) Dependencies have been updated

### 1.0.1 (2019-10-07)
- (bluefox) fixed min max

### 0.7.1 (2016-12-14)
- (Pmant) changed max brightness to max brightness of initial color

### 0.7.0 (2016-12-14)
- (jens-maus) added value formatting
- (jens-maus) added value multiplier

### 0.6.1 (2016-11-25)
- (bluefox) Updated justgage.js

### 0.6.0 (2016-07-31)
- (Pmant) added no-gradient-option to Justgage widget
- (Pmant) added a full brightness option to Justgage widget
- (jens-maus) added missing unit fields

### 0.5.1 (2016-07-21)
- (jens-maus) fixed auto fill max, min, unit

### 0.5.0 (2016-07-01)
- (Pmant) fixed default indicator
- (Pmant) added option to change background-color instead of text-color
- (Pmant) added option to always set full brightness colors

### 0.4.2 (2016-06-05)
- (PArns) fixed mid default value if max != 100 & min != 0

### 0.4.1 (2016-03-20)
- (bluefox) removed config

### 0.4.0 (2016-02-19)
- (Pmant) replaced pow with sliders
- (bluefox) fixed resize

### 0.3.0 (2016-02-16)
- (bluefox) fixed error with two gauges at creation
- (bluefox) fixed small errors
- (bluefox) added new widget: value & indication
- (bluefox) filled automatically max, min, unit

### 0.2.5 (2016-02-13)
- (Pmant) fixed indicator
- (bluefox) added russian translations

### 0.2.2 (2016-02-12)
- (Pmant) possible donut fix

### 0.2.0 (2016-02-11)
- (Pmant) added indicator widget

### 0.1.1 (2016-02-10)
- (Pmant) initial checkin

## License

The MIT License (MIT)

Copyright (c) 2023-2024 iobroker-community-adapters 
Copyright (c) 2015-2019 Pmant <patrickmo@gmx.de>

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