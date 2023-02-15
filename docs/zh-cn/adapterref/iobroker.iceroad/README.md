---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.iceroad/README.md
title: ioBroker.冰路
hash: GT3Yk8VYljDheJHLZ3CbH/9itm9a7YYSffuTbSfGcCs=
---
![标识](../../../en/adapterref/iobroker.iceroad/docs/de/img/iceroad.png)

![安装数量](http://iobroker.live/badges/iceroad-installed.svg)
![稳定存储库中的当前版本](http://iobroker.live/badges/iceroad-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.iceroad.svg)
![下载](https://img.shields.io/npm/dm/iobroker.iceroad.svg)

# IoBroker.冰路
![测试和发布](https://github.com/iobroker-community-adapters/iobroker.iceroad/workflows/Test%20and%20Release/badge.svg) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.iceroad/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.iceroad/actions/workflows/codeql.yml)

## 文档
Vorhersage zur vereisten Frontscheibe</br> Bitte die API hier beantragen：https://www.eiswarnung.de/rest-api/ </br>

挡风玻璃结冰预报</br> 请在此处申请 API：https://www.eiswarnung.de/rest-api/ </br> </br> 🇩🇪 [文档化](docs/de/iceroad.md)</br> 🇬🇧 §§ LLLLL_1§§</br>

## 讨论和问题
[ioBroker 论坛](https://forum.iobroker.net/topic/50041/test-adapter-ice-road)</br>

## IoBroker 的 Ice-Road 适配器
这是一个调度适配器，通过 https://eiswarnung.de 例如轮询当前的冰情况。每隔一小时。
根据您所在位置的气候和天气数据，他们会在前一天晚上计算您所在地区第二天早上是否会出现冰窗。查询的最佳时间是提前8-10小时。如果你想在早上 8 点出门，最好使用前一天晚上 10 点到 24 点的预报。</br> </br> 如果适配器显示状态“Ice”或“Maybe ice”，则表明可能被通知。目前，有几种内置的通知服务（Telegram、Pushover、WhatsApp、Email、Jarvis、Lovelace、SynoChat）。如果状态更改为“无冰”，您还会收到通知。此外，当状态“Ice”和“Maybe ice”等待超过 X 小时时，可能会被提醒。 （可以在配置中设置）。否则，各种数据点可用于进一步处理。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.3 (2023-01-20)

-   (ciddi89) Bugfix: reminder doesn't work correctly
-   (ciddi89) Added: name and type for channel folders
-   (ciddi89) Other: Small code improvements

### 1.1.2 (2022-12-23)

-   (ciddi89) handling if no data was received added

### 1.1.1 (2022-12-18)

-   (ciddi89) changed order in table of longitude and latitude

### 1.1.0 (2022-12-18)

-   (ciddi89) added handling for wrong location data (comma to fullstop)
-   (ciddi89) added functionality for reminder notification
-   (ciddi89) updated readme

### 1.0.0 (2022-12-17)

-   (ciddi89) fixed issue messages wasn't sent
-   (ciddi89) increased timeout
-   (ciddi89) BREAKING CHANGE -> rebuild adapter complete. Please save your data and delete the instance before update
-   (ciddi89) drop support for admin 5

### 0.1.1 (2022-10-01)

-   (Apollon77) Make sure adapter stops when he is done

### 0.1.0

-   (Patrick Walther) add locations, add pushover/telegram/mail

### 0.0.1

-   (Patrick Walther) initial release

## License

The MIT License (MIT)

Copyright (c) 2023 Patrick Walther walther-patrick@gmx.net

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