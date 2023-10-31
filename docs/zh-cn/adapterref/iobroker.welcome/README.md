---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.welcome/README.md
title: ioBroker.欢迎
hash: jkzi1/Siu0dakUu5BPH4ebgxGY3FGjGwTjgDSzN/9lc=
---
![标识](../../../en/adapterref/iobroker.welcome/admin/welcome.png)

![安装数量](http://iobroker.live/badges/web-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.welcome.svg)
![下载](https://img.shields.io/npm/dm/iobroker.welcome.svg)

# IoBroker.welcome
![测试与发布](https://github.com/ioBroker/ioBroker.welcome/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/web/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

该适配器在端口 80 上的一页上显示 ioBroker 的所有 Web 和管理实例（可配置）

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。

![欢迎](../../../en/adapterref/iobroker.welcome/img/screen.png)

通常，此适配器应在端口 80 或 443 上运行，并且它显示带有 Web 服务器的可用适配器。

或者，您可以提供实例，通过打开欢迎页面，实例将自动重定向到该实例。
在这种情况下，通过打开 http://IP 它将立即重定向到指定的 Web 实例。

<!-- 下一个版本的占位符（在行的开头）：

### **正在进行中** -->

## Changelog
### 0.0.5 (2023-10-16)
* (bluefox) Corrected the adapter list

### 0.0.4 (2023-10-16)
* (bluefox) First release

### 0.0.1 (2023-10-16)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2023 Denis Haev <dogafox@gmail.com>

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