---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.xterm/README.md
title: ioBroker.xterm
hash: GznI1502Q5gVpQW/SraGp4ufIeDsJ0012p3i7X0xSBs=
---
![标识](../../../en/adapterref/iobroker.xterm/admin/xterm.svg)

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

### 持久终端
这些 shell 程序运行在适配器中，而不是浏览器中。即使连接中断或页面重新加载，终端程序也会继续运行并恢复，包括其内容——长时间运行的命令不会中断。

如果终端被显式关闭，或者在配置的**会话超时**期间（默认为 5 分钟；`0` 会在浏览器断开连接时立即终止 shell），则终端将被终止。

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
### 4.0.1 (2026-08-07)
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
* (@GermanBluefox) Dropped support of Node.js 20
* (@GermanBluefox) Added SVG icon
* (@GermanBluefox) The terminals now run on the server: they survive a reload or a lost connection and are restored with their content
* (@GermanBluefox) Added the setting for the session timeout
* (@GermanBluefox) Fixed the HTTPS mode: the adapter did not start the web server at all if `secure` was enabled
* (@GermanBluefox) Fixed the shown client IP addresses in `info.connection`
* (@GermanBluefox) Errors of the web socket connection do not terminate the adapter anymore
* (@GermanBluefox) A shell that cannot be started is not restarted endlessly anymore
* (@GermanBluefox) All shells are terminated now if the adapter stops
* (@GermanBluefox) Fixed the double connections of the GUI after a connection timeout

### 3.1.0 (2026-06-04)
* (bluefox) Added the icon in the GUI
* (bluefox) Added possibility to run under a specified user on Linux
* (bluefox) Implemented paste on right mouse click
* (bluefox) Implemented authentication for the terminal

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

[Older changelogs can be found there](CHANGELOG_OLD.md)

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