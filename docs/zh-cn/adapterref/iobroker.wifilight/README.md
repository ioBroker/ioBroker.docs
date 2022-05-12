---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wifilight/README.md
title: ioBroker.wifilight
hash: 0s+GfsnvdScrPZYX+N3JjBu9Z/g9LtFF6NewlDXsDlc=
---
![标识](../../../en/adapterref/iobroker.wifilight/admin/wifilight.png)

![安装数量](http://iobroker.live/badges/wifilight-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.wifilight.svg)
![下载](https://img.shields.io/npm/dm/iobroker.wifilight.svg)

# IoBroker.wifilight
![测试和发布](https://github.com/iobroker-community-adapters/iobroker.wifilight/workflows/Test%20and%20Release/badge.svg)[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/wifilight/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

＃＃ 描述
适用于 WiFi 灯的 ioBroker 适配器

## 信息
支持 LW12、LD382 和 LD382A。
添加了对 Mi-Light/LimitlessLED RGBW 的支持。

## 初始创建
这个适配器最初是由 @soef 在 https://github.com/soef/ioBroker.wifilight 创建的，但不再维护，所以我们将它移到 iobroker-community 以便修复错误。感谢@soef 的工作。

### 如何使用命令状态：
+ 可能的标识符有：``red, r, green, g, blue, b, bri, sat, transition, on, off`` + 字符串可以是带括号或不带括号的 JSON。
+ 您还可以通过 = + 颜色范围：```0..255``` + bri 范围：``0..100``

一些例子：

```
r = 100; g = 250, b = 100
r: 0, g: 0, b = 255
red: 200, green: 0, blue: 0
{r:100, b: 200, transition: 20}
off
on
{on:0}
```

要更改颜色，您不必使用所有三个值。
例如，``` red = 0 ```，蓝色和绿色将保持不变。

### R、g、b、w 状态：
+ 值 0..255 + \#rrggbb[ww]

＃＃ 安装
使用 iobroker 中的 Adapter 面板添加实例。

如果不存在，请在 iobroker 根目录（例如 /opt/iobroker）中执行以下命令。

```
npm install iobroker.wifilight
```

### 错误修复
如果不起作用，请尝试安装 soef npm 包

```
cd /opt/iobroker/node_modules/iobroker.wifilight
sudo npm install soef
```

## Changelog
### 1.1.3 (2022-04-27)
* (Apollon77) Prevent crash case reported by sentry

### 1.1.2 (2022-04-19)
* (Apollon77) Prevent crashes when states are controlled with null as value

### 1.1.1 (2022-04-17)
* (Apollon77) Prevent error logs with js-controller 3+
* (Apollon77) Added sentry for error reporting

### 1.1.0 (2020-04-09)
* (foxriver76) compatibility for js-c 3

### 1.0.0 (2019-10-18)
* (ldittmar) first version for the community

## License
The MIT License (MIT)

Copyright (c) 2020-2022 ioBroker Community Developers, 2019-2020 soef <soef@gmx.net>, 

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