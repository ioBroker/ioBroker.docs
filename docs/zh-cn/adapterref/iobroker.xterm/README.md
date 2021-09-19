---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.xterm/README.md
title: ioBroker.xterm
hash: yUz3ldjCTS+rHznLQDtBRUNUoyt13EdVQGBZ5/F0/2I=
---
![标识](../../../en/adapterref/iobroker.xterm/admin/xterm.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.xterm.svg)
![下载](https://img.shields.io/npm/dm/iobroker.xterm.svg)
![安装数量（最新）](http://iobroker.live/badges/xterm-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/xterm-stable.svg)
![依赖状态](https://img.shields.io/david/bluefox <dogafox@gmail.com>/iobroker.xterm.svg)
![已知漏洞](https://snyk.io/test/github/bluefox <dogafox@gmail.com>/ioBroker.xterm/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.xterm.png?downloads=true)

# IoBroker.xterm
## IoBroker 的 xterm 适配器
该适配器允许在 ioBroker 主机上执行 shell 命令。它取代了 `ioBroker.terminal` 适配器。

终端服务器打开命令行界面。
请仅将其用于管理目的。

基于 xterm.js 和 node-pty 包。

如果启用了身份验证，则只有 ioBroker "admin" 用户可以登录。

＃＃ 用法
适配器支持2种模式：

- 启动 cmd.exe(windows) 或 bash(linux)。在 Linux 上，bash 在 `iobroker` 用户下运行，也许你应该切换到其他具有更多权限的用户（通过 `su USER`）。
- 或者用 node.js 模拟 shell（如果第一个选项不起作用，你可以激活这个选项）

注意：某些具有交互性的终端命令不起作用。例如。 `nano` 和其他一些。

＃＃ 去做
- 模拟：Ctrl + R（历史）
- 模拟：更多编码页面。如果您找到适合您系统的代码页，请创建一个问题。可以在[此处](https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings) 找到可能的编码页面。
- 支持多个会话（选项卡）

<!-- 下一个版本的占位符（在行首）：

### __工作进行中__ -->

## Changelog
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

Copyright (c) 2021 ioBroker <dogafox@gmail.com>

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