---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.dwd/README.md
title: ioBroker.dwd
hash: hMqC9TzffM0CXLhIv++7Lym4DA59/buppGlYwt3rwlk=
---
![商标](../../../en/adapterref/iobroker.dwd/admin/dwd.png)

![安装数量](http://iobroker.live/badges/dwd-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.dwd.svg)
![下载](https://img.shields.io/npm/dm/iobroker.dwd.svg)

#ioBroker.dwd
![测试和发布](https://github.com/ioBroker/iobroker.dwd/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/dwd/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

版权所有 Deutscher Wetterdienst

Dieser Adapter lädt die Wetterwarnungen vom deutschen Wetterdienst über JSON 链接。

此适配器通过 JSON 链接加载来自德国气象服务的气象警告。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

<!-- 下一个版本的占位符（在行首）：

### __工作进行中__ -->

## Changelog
### 2.7.6 (2021-06-28)
* (sbormann) Added new states to `warning.severity`
* (bluefox) Removed warnings
* (bluefox) Replaces `request` packet with `axios`
* (bluefox) Breaking change: Rename state `numberofwarnings` to `numberOfWarnings`

### 2.7.5 (2021-02-09)
* (Apollon77) Update region list to the official one completely

### 2.7.4 (2021-02-04)
* (Apollon77) Fix region list entry

### 2.7.2 (2021-01-19)
* (Apollon77) Fix issue on deleting old objects

### 2.7.1 (2021-01-19)
* (Apollon77) Make sure to end process when no data could be received

### 2.7.0 (2021-01-18)
* (Apollon77) restructure code to not exit before really done with setting all states
* (Apollon77) js-controller 2.0 is now required at minimum

### 2.6.1 (2021-01-16)
* (wendy2702) correct Region "Leer"

### 2.6.0 (2021-01-11)
* (maeb3) Add datapoint for number of warnings

### 2.5.2 (2020-12-25)
* (Apollon77) fix state cleanup for warnings to prevent invalid ones to be deleted

### 2.5.1 (2020-11-17)
* (Apollon77) Crash prevented (Sentry IOBROKER-DWD-F)
* (Homoran) Add background colors for new conditions

### 2.5.0 (2020-06-21)
* (bluefox) Compact mode is supported

### 2.4.10 (2020-05-16)
* (Apollon77) Better handle errors when adapter ends (again Sentry)

### 2.4.9 (2020-05-11)
* (Apollon77) Better handle errors when adapter ends (Sentry IOBROKER-DWD-1) 

### 2.4.8 (2020-04-30)
* (Apollon77) Better handle errors when adapter ends 

### 2.4.7 (2020-04-18)
* (Apollon77) Add Sentry for error reporting with js-controller 3.0
* (Apollon77) Fix crash because of undefined lat/long 

### 2.4.6 (2020-02-24)
* (bluefox) Time format added to widget

### 2.4.5 (2020-02-23)
* (ticaki) Datetime corrected

### 2.4.3 (2018-08-05)
* (bluefox) Invalid certificate are accepted too

### 2.4.2 (2018-08-05)
* (bluefox) Update cities

### 2.4.0 (2018-07-30)
* (bluefox) Update package versions
* (bluefox) Update cities
* (bluefox) Map was added

### 2.3.0 (2018-02-05)
* (Apollon77) Added tests

### 2.2.2 (2018-02-05)
* (cernst1980) Changed sort order

### 2.2.1 (2017-08-16)
* (BuZZy1337) Updated regionNames and deleted Duplicates
* (BuZZy1337) Update Names

### 2.2.0 (2017-07-12)
* (Werner Dondl) fixes for widget display of warnings
* (DeepCoreSystem) fixed missing warning type and level from DWD JSON data

### 2.1.1 (2016-07-01)
* (jens-maus) fixed bug where cb() needs to be called with a null parameter

### 2.1.0 (2016-06-24)
* (bluefox) add widgets to adapter

### 2.0.3 (2016-03-24)
* (bluefox) full url if empty (compatibility)

### 2.0.2 (2016-03-20)
* (bluefox) autocomplete cities
* (bluefox) clear begin and end if no warnings

### 2.0.1 (2016-03-15)
* (bluefox) add tests
* (bluefox) change colors

### 2.0.0 (2016-03-03)
* (bluefox) use json file as source

### 1.0.1 (2015-11-04)
* (bluefox) check files yyyC too

### 1.0.0 (2015-11-04)
* (bluefox) adapt to new structure of DWD FTP Server

### 0.1.10 (2015-08-12)
* (bluefox) update packages
* (bluefox) change for Hessen and Rheinland-Pfalz: EM_H => OF_H

### 0.1.9 (2015-04-28)
* (bluefox) fix error with date

### 0.1.7 (2015-03-04)
* (bluefox) change the codes of regions

### 0.1.6 (2015-02-14)
* (bluefox) fix "forecast" object

### 0.1.5 (2015-01-02)
* (bluefox) fix timeout problem under windows

### 0.1.3 (2015-01-02)
* (bluefox) start adapter one time on config change or restart

### 0.1.2 (2015-01-02)
* (bluefox) enable npm install

### 0.1.1 (2014-11-22)
* (bluefox) change variables to no-"io.*"

### 0.1.0 (2014-10-25)
* (bluefox) change variables to io.*

### 0.0.4 (2014-10-23)
* (bluefox) support of timeouts

### 0.0.3 (2014-10-22)
* (bluefox) fix error if ftp problem

## License

The MIT License (MIT)

Copyright (c) 2016-2021 bluefox <dogafox@gmail.com>, hobbyquaker

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