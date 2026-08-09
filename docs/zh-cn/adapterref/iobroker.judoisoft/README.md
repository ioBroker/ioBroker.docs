---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.judoisoft/README.md
title: ioBroker.judoisoft
hash: uykMwHEm5KpB3jn5G7+/9O+2lryACy7B0GdbV/Lje4Y=
---
![标识](../../../en/adapterref/iobroker.judoisoft/admin/judo.png)

![安装数量](http://iobroker.live/badges/judoisoft-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.judoisoft.svg)
![下载](https://img.shields.io/npm/dm/iobroker.judoisoft.svg)
![NPM](https://nodei.co/npm/iobroker.judoisoft.png?downloads=true)

# IoBroker.judoisoft
=================

## Judoisoft ioBroker 适配器
以下是命令选项的一小段摘录：

![可能性](https://github.com/arteck/iobroker.judoisoft/blob/master/doku/datenpunkte.png)

可用设置：

![可能性](https://github.com/arteck/iobroker.judoisoft/blob/master/doku/settings.png)

对于配备全新 JUDO 连接模块的设备，请在实例设置中启用 `REST API (connectivity module)`。

这将使用本地接口 `http://<ip>/api/rest/...`（基本身份验证）。

（默认用户名/密码为“admin”/“Connectivity”）

## Changelog

### **WORK IN PROGRESS**

- Add device selection for cloud connection - #194
- Fix issues detected by repository checker

### 1.1.3 (2026-07-18)

- (copilot) Adapter requires node.js >= 22 now
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (@SimonFischer04) support rest-api (#143). closes #32, closes #82
- (@arteck, @SimonFischer04) (dependency) bump / cleanups
- (@SimonFischer04) Migration to ESLint 9 and @iobroker/eslint-config. #114
- (@SimonFischer04) Migrate admin config to ioBroker jsonConfig. Closes #55

### 1.1.2 (2025-01-04)

- (arteck) corr some errors

### 1.1.1 (2024-09-26)

- (arteck) corr cloud connection

### 1.1.0 (2023-10-27)

- (arteck) switch to intervall

### 1.0.15 (2022-05-30)

- (arteck) new error handling

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2018-2026 Arthur Rupp arteck@outlook.com

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