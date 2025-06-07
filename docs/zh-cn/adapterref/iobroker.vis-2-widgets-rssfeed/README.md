---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-2-widgets-rssfeed/README.md
title: 2 个 RSS Feed 小部件
hash: Dl48aeWEN8jMoLFSy6F/bgqmi4HEeZPqWlI8lWJfxs0=
---
# Vis 2 RSS Feed 小部件
![标识](../../../en/adapterref/iobroker.vis-2-widgets-rssfeed/admin/vis-2-widgets-rssfeed.png)

![安装数量](http://iobroker.live/badges/vis-2-widgets-rssfeed-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.vis-2-widgets-rssfeed.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-rssfeed.svg)
![新公共管理](https://nodei.co/npm/iobroker.vis-2-widgets-rssfeed.png?downloads=true)

此适配器仅包含适配器 rssfeed 的 vis-2 小部件。

有关小部件和功能的详细描述，请参阅适配器 rssfeed。

## Changelog

<!--
	Placeholder for next versions:
	### __WORK IN PROGRESS__
-->
### 1.2.0 (2025-06-05)

- switch build framework from CRA to vite
- Remove deprecated RSSMarquee widget. RSSMarquee5 is already available

### 1.1.2 (2025-03-20)

- add a missing build file

### 1.1.1 (2025-03-20)

- fix marqueeV5 widget
- fix build process

### 1.0.0 (2025-02-19)

- remove common.noConfig from io-package.json
- add popup as opening type for marquee widget

### 0.3.6 (2024-09-18)

- remove 0.3.4 from io-package.json

### 0.3.5 (2024-08-09)

- improve link styling in the marquee widget
- fix key and group handling
- fix issues from an adapter checker

### 0.3.3 (2024-07-25)

- fix widgeturl from debug to productive

### 0.3.2 (2024-07-25)

- introduce innerhtml component that is capable to execute raw javascript and improve links for the marquee widget
- fix translation

### 0.3.1 (2024-07-24)

- fix widget access url

### 0.3.0 (2024-07-24)

- intoroduction of the rss multi feed widget
- update icons for light and dark theme
- improved translation

### 0.2.4 (2024-06-25)

- fix github commands to non deprecated

### 0.2.3 (2024-06-25)

- switch nodeversion in github actions
- change upload to v4
- upgrade github commands to non deprecated
- adjust copy commands in gulpfile

### 0.2.2 (2024-06-25)

- remove withstyles
- translate some missing keys

### 0.2.1 (2024-06-24)

- set node to 20 in deploy task

### 0.2.0 (2024-06-24)

- fine tuning

### 0.1.3 (2024-06-22)

- add ace build files to gulp

### 0.1.2 (2024-06-22)

- move library to ace/ejs lib to dependency

### 0.1.1 (2024-06-22)

- reverte timepout in tests

### 0.1.0 (2024-06-22)

- Erstes Testrelease

## License

The MIT License (MIT)

Copyright (c) 2025 oweitman <oweitman@gmx.de>

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