---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.xterm/README.md
title: ioBroker.xterm
hash: KIHNdM8FMczv17rFWpZdDZLTqFOky2QAamKqcdMWbZ0=
---
![标识](../../../en/adapterref/iobroker.xterm/admin/xterm.png)

![安装数量](http://iobroker.live/badges/xterm-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.xterm.svg)
![下载](https://img.shields.io/npm/dm/iobroker.xterm.svg)

# IoBroker.xterm
![测试与发布](https://github.com/ioBroker/ioBroker.xterm/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/xterm/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告的信息，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

## IoBroker 的 xterm 适配器
此适配器允许在 ioBroker 主机上执行 shell 命令。它取代了 `ioBroker.terminal` 适配器。

终端服务器用于打开命令行界面。

请仅将其用于管理用途。

基于 xterm.js 和 node-pty 软件包。

如果启用身份验证，则只有 ioBroker“admin”用户才能登录。

＃＃ 用法
该适配器通过真正的伪终端（node-pty）启动 cmd.exe（Windows）或 bash（Linux）。

在 Linux 系统中，bash 以 `iobroker` 用户身份运行——您可以通过 `su USER` 切换到具有更高权限的其他用户。

## 键盘快捷键
| 快捷方式 | 操作 |
|------------------|-------------------------------------------------------------------------------------|
| **Ctrl+Shift+V** | 打开粘贴对话框（在无法使用剪贴板 API 的 HTTP 连接中很有用） |
| **Ctrl+Shift+F** | 在终端中搜索 |
| **右键单击** | 从剪贴板粘贴 (HTTPS) 或打开粘贴对话框 (HTTP) |
| 选择文本 | 自动复制到剪贴板（PuTTY 风格） |

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### 3.0.2 (2026-04-13)
* (bluefox) Added the icon in the GUI
* (bluefox) Added possibility to run under specified user on Linux

### 3.0.0 (2026-04-12)
* (bluefox) Migrated the adapter to Typescript
* (bluefox) Added multiple terminal sessions

### 2.0.1 (2023-09-18)
* (bluefox) xterm library updated
* (bluefox) Move Lets encrypt settings to acme adapter
* (bluefox) Minimal supported node.js version is 16

### 1.1.0 (2022-10-08)
* (Apollon77) Updated the xterm library
* (Apollon77) Prepared for future js-controller versions

### 1.0.0 (2022-08-29)
* (bluefox) Check only port of the interface and not of all interfaces

### 0.3.2 (2022-03-29)
* (Apollon77) Fix crash cases reported by Sentry

### 0.3.1 (2022-03-18)
* (Apollon77) Fix a crash case reported by Sentry

### 0.3.0 (2022-03-12)
* (Apollon77) Prevent some warnings in js-controller 3+
* (Apollon77) Add Fallback to the simulated shell if bash/cmd.exe is selected by node-pty was not installed correctly!
* (Apollon77) Rework `info.connection` status to show that server is connected also as green by using "none" to show that no one is connected
* (Apollon77) Update all dependencies
* (Apollon77) Add sentry for crash reporting

### 0.2.0 (2021-09-18)
* (bluefox) Added the real terminal (bash or cmd.exe) to the simulated one

### 0.1.0 (2021-09-18)
* (bluefox) changed the type of the connection state to "string"

### 0.0.3 (2021-09-16)
* (ioBroker) first working release

### 0.0.1
* (ioBroker) initial release

## License
MIT License

Copyright (c) 2021-2026 ioBroker <dogafox@gmail.com>

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