---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.openweathermap/README.md
title: ioBroker.openweathermap
hash: eJh5/gIM69lEEeZ8iTArvSmUvI2XbbgBa7azNe6+CCE=
---
![标识](../../../en/adapterref/iobroker.openweathermap/admin/openweathermap.png)

![安装数量](http://iobroker.live/badges/openweathermap-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.openweathermap.svg)
![下载](https://img.shields.io/npm/dm/iobroker.openweathermap.svg)

# IoBroker.openweathermap
![测试和发布](https://github.com/ioBroker/ioBroker.openweathermap/workflows/Test%20and%20Release/badge.svg)[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/openweathermap/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

从[https://openweathermap.org/](openweathermap.org)获取 5 天的天气预报

您需要一个 api 密钥来访问数据。注册后可免费获得的api密钥[这里](https://home.openweathermap.org/api_keys)。

<!--

### **正在进行中** -->

## Changelog
### 0.3.3 (2022-10-24)
* (Bluefox) Updated widget for vis 2.0

### 0.3.0 (2022-07-12)
* (Bluefox) Added new widget for vis 2.0

### 0.2.5 (2022-06-12)
* (Apollon77) Make sure all forecast data are processed correctly

### 0.2.4 (2022-04-19)
* (Apollon77) Fix crash case when states have invalid metadata

### 0.2.3 (2022-03-15)
* (Apollon77) Increase timeout to read data to 10s

### 0.2.2 (2022-03-11)
* (Apollon77) Fix crash case (Sentry IOBROKER-OPENWEATHERMAP-1)

### 0.2.1 (2022-03-10)
* (Apollon77) Move schedule if default is used and adjust to once an hour to better spread the requests over time to prevent peaks; Additionally add a random delay in the start minute
* (klein0r) updated everything
* (Apollon77) updated unload/stop handling

### 0.1.0
* (bluefox) first release

## License

The MIT License (MIT)

Copyright (c) 2018-2022 bluefox <dogafox@gmail.com>

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