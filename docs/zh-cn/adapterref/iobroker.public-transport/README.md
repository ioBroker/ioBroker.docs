---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.public-transport/README.md
title: ioBroker.公共交通
hash: EPGpmjmHPR4TbPgKXKpoUiIBVov/b3Vyu5afcVO463w=
---
![标识](../../../en/adapterref/iobroker.public-transport/admin/iconAdapter.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.public-transport.svg)
![下载](https://img.shields.io/npm/dm/iobroker.public-transport.svg)
![安装数量](https://iobroker.live/badges/public-transport-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/public-transport-stable.svg)
![NPM](https://nodei.co/npm/iobroker.public-transport.png?downloads=true)

# IoBroker.public-transport
**测试：** ![测试与发布](https://github.com/tt-tom17/ioBroker.public-transport/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的公共交通适配器
公共交通适配器可将实时公共交通时刻表信息无缝集成到您的 ioBroker 智能家居环境中。借助此适配器，您可以获取德国、奥地利和其他国家/地区各交通运营商站点的发车时间，并将其用于自动化控制。

[🇬🇧 英文文档](https://github.com/tt-tom17/ioBroker.public-transport/wiki/en-Home) [🇩🇪 德语文档](https://github.com/tt-tom17/ioBroker.public-transport/wiki)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.6.0 (2026-05-25)
* (tt-tom17) add Motis service support
* (tt-tom17) add nsPanelTimetable class for 'NSPanel-Lovelace-UI Next Level' integration
* (tt-tom17) connections widget: fix walking detail info display
* (tt-tom17) connections widget: add link styling for modal remarks

### 0.5.0 (2026-05-17)
* (tt-tom17) added productName to states
* (tt-tom17) connections widget: show remarks icons (warning/hint/status) per leg in journey detail popup
* (tt-tom17) connections widget: show remarks icons in main table (new Info column)
* (tt-tom17) connections widget: highlight delayed journeys/legs with red left border

### 0.4.0 (2026-05-06)
* (tt-tom17) fix select Products
* (tt-tom17) add Profil VBN (Bremen/Niedersachsen)

### 0.3.0 (2026-05-02)
* (tt-tom17) fix issues for latest Repo
* (tt-tom17) fix deaktivieren von Verbindungen
* (tt-tom17) Adapter requires node.js >= 22 now

### 0.2.2 (2026-04-25)
* (tt-tom17) fix countEntries for journeys

### 0.2.1 (2026-04-24)
* (tt-tom17) fix Vendo forbidden -> change dbnav to db

### 0.2.0 (2026-04-21)  
* (tt-tom17) Widget departures: add popup for hints and warnings

### 0.1.1 (2026-04-19)   
* (tt-tom17) fix App.tsx
* (tt-tom17) Fix [Bug]: Abfahrten-JSON bleibt leer oder alle gleich [#28](https://github.com/tt-tom17/ioBroker.public-transport/issues/28)

### 0.1.0 (2026-04-01)  
* (tt-tom17) begin beta-test

### 0.0.6 (2026-03-12)
* (tt-tom17) Widget for Journey
* (tt-tom17) Refactor admin UI: convert class components to functional components
* (tt-tom17) Add confirmation dialog for station and journey deletion
* (tt-tom17) Auto-save and delete ioBroker object tree on station/journey removal
* (tt-tom17) Upgrade admin dependencies

### 0.0.5 (2026-03-03)  
* (tt-tom17) Upgrade dependency

### 0.0.4 (2026-02-16)
* (tt-tom17)   optimization react pages

### 0.0.1-preAlpha.0 (2025-12-01)
* (tt-tom17) initial release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025 - 2026 tt-tom17 <tgb@kabelmail.de>

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