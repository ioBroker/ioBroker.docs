---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.x-touch/README.md
title: ioBroker.x-touch
hash: AAPixqUfKFCsjwx3NXQZvTocuy413K+pphI3PZIFRmw=
---
![标识](../../../en/adapterref/iobroker.x-touch/admin/x-touch.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.x-touch.svg)
![下载](https://img.shields.io/npm/dm/iobroker.x-touch.svg)
![安装数量（最新）](http://iobroker.live/badges/x-touch-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/x-touch-stable.svg)
![已知漏洞](https://snyk.io/test/github/Bannsaenger/ioBroker.x-touch/badge.svg)
![新公共管理](https://nodei.co/npm/iobroker.x-touch.png?downloads=true)

# IoBroker.x-touch
![测试和发布](https://github.com/bannsaenger/iobroker.x-touch/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 x-touch 适配器
与 Behringer X-Touch 控制界面（DAW 控制器）通信

## 待办事项
- 添加 syncGlobal 功能

## 消息框
有两个可接受的命令：

* `export` 将设备组状态中存储的实际值导出到用户数据文件夹 x-touch.0
* `import` 会从 userdata 文件夹导入最新的文件。此外，您还可以指定要恢复的 `file` 和/或 `devicegroup` 编号。如果指定了 `path`，则将使用整个文件系统，并且 `file` 名称是必填项。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.8.1 (2025-05-21)
* (Bannsaenger) node 22 in deploy script
* (Bannsaenger) do not send updates when lock feature is in blank mode

### 0.8.0 (2025-05-15)
* (Bannsaenger) updated dependencies, node 24 compatibility
* (Bannsaenger) refactored lock feature

### 0.7.1 (2025-02-25)
* (Bannsaenger) updated admin dependency

### 0.7.0 (2025-02-17)
* (Bannsaenger) fixed some minor typos
* (Bannsaenger) updated to node 18.x - 22.x
* (Bannsaenger) updated dependencies, node 22 compatibility, workflow
* (Bannsaenger) added possibility to lock the desk
* (Bannsaenger) resend data on group membership change
* (Bannsaenger) removed createBanks from config dialog (too dangerous, delete by hand if neccessary)

### 0.6.5 (2023-12-30)
* (Bannsaenger) add CHANGELOG_OLD.md

## License
MIT License

Copyright (c) 2021-2025 Bannsaenger <bannsaenger@gmx.de>

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