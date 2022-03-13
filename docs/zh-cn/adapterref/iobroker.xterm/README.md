---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.xterm/README.md
title: ioBroker.xterm
hash: hCuILSwuMbtUJCOktc8XL5+HlsucbR19k2kGfr90IvM=
---
![商标](../../../en/adapterref/iobroker.xterm/admin/xterm.png)

![安装数量](http://iobroker.live/badges/xterm-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.xterm.svg)
![下载](https://img.shields.io/npm/dm/iobroker.xterm.svg)

# IoBroker.xterm
![测试和发布](https://github.com/ioBroker/ioBroker.xterm/workflows/Test%20and%20Release/badge.svg)[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/xterm/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

## IoBroker 的 xterm 适配器
该适配器允许在 ioBroker 主机上执行 shell 命令。它取代了 `ioBroker.terminal` 适配器。

终端服务器打开命令行界面。
请仅将其用于管理目的。

基于 xterm.js 和 node-pty 包。

如果启用了身份验证，则只有 ioBroker“admin”用户可以登录。

＃＃ 用法
适配器支持2种模式：

- 启动 cmd.exe(windows) 或 bash(linux)。在 Linux 上，bash 在 `iobroker` 用户下运行，也许您应该切换到具有更多权限的其他用户（通过 `su USER`）。
- 或使用 node.js 模拟 shell（如果第一个选项不起作用，您可以激活此选项）

注意：一些具有交互性的终端命令不起作用。例如。 `nano`和其他一些。

＃＃ 去做
- 模拟：Ctrl + R（历史）
- 模拟：更多编码页面。如果您找到适合您系统的代码页，请创建问题。可以在 [此处](https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings) 找到可能的编码页面。
- 支持多个会话（标签）

<!-- 下一个版本的占位符（在行首）：

### __工作进行中__ -->

## Changelog
### 0.3.0 (2022-03-12)
* (Apollon77) Prevent some warnings in js-controller 3+
* (Apollon77) Add Fallback to simulated shell if bash/cmd.exe is selected by node-pty was not installed correctly!
* (Apollon77) Rework info.connection status to show that server is connected also as green by using "none" to show that noone is connected
* (Apollon77) Update all dependencies
* (Apollon77) Add sentry for crash reporting

### 0.2.0 (2021-09-18)
* (bluefox) Added the real terminal (bash or cmd.exe) to simulated one

### 0.1.0 (2021-09-18)
* (bluefox) changed type of the connection state to "string"

### 0.0.3 (2021-09-16)
* (ioBroker) first working release

### 0.0.1
* (ioBroker) initial release

## License
MIT License

Copyright (c) 2021-2022 ioBroker <dogafox@gmail.com>

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