---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.openmediavault/README.md
title: ioBroker.openmediavault
hash: pms8zano3DR5vTltb8NPc+e2JUtk6fX6IcmGNHGK1IY=
---
![标识](../../../en/adapterref/iobroker.openmediavault/admin/openmediavault.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.openmediavault.svg)
![下载](https://img.shields.io/npm/dm/iobroker.openmediavault.svg)
![安装数量](https://iobroker.live/badges/openmediavault-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/openmediavault-stable.svg)
![NPM](https://nodei.co/npm/iobroker.openmediavault.png?downloads=true)

# IoBroker.openmediavault
**测试：** ![测试与发布](https://github.com/Scrounger/ioBroker.openmediavault/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 OpenMediaVault 适配器
此适配器允许使用 rpc 接口从您的 OpenMediaVault 读取信息。

＃＃ 配置
您需要 OpenMediavault 服务器的 URL 和管理员帐户的密码。<br> **注意**：必须使用管理员帐户，因为 RPC 接口仅对管理员可用。

## 已知问题
该适配器可防止硬盘在循环轮询期间进入待机模式，并在被查询时将其从待机模式唤醒。<br>原因是 RPC API 的设计本身就存在这个问题。<br> [查看详情](https://github.com/openmediavault/openmediavault/issues/2063)

为防止这种情况发生，还可以使用定时任务更新数据。<br>例如，您可以将适配器查询安排在硬盘未处于待机模式的时间，例如备份期间。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.4.2 (2025-12-04)

- (Scrounger) connection timeout bug fix

### 1.4.1 (2025-12-02)

- (Scrounger) session expired bug fix

### 1.4.0 (2025-12-01)

- (Scrounger) option to update data with cron job added
- (Scrounger) connection timeout configurable
- (Scrounger) dependencies updated
- (Scrounger) disk and s.m.a.r.t using label as channel name if avaiable

### 1.3.0 (2025-11-24)

- (Scrounger) s.m.a.r.t. error indicator added
- (Scrounger) filesystem status, isOnline, hasErrors indicators added

### 1.2.0 (2025-11-23)

- (Scrounger) using disk uuid as channel id for disk and s.m.a.r.t -> Breaking Change !!!
- (Scrounger) bug fixes

### 1.1.0 (2025-11-21)

- (Scrounger) additonal s.m.a.r.t. attributes added
- (Scrounger) dependencies updated

### 1.0.4 (2025-10-19)

- (Scrounger) auto translation bug fix
- (Scrounger) bug fixes

### 1.0.3 (2025-09-30)

- (Scrounger) dependencies updated
- (Scrounger) bug fixes

### 1.0.2 (2025-09-27)

- (Scrounger) bug fixes

### 1.0.1 (2025-09-21)

- (Scrounger) dependencies updated
- (Scrounger) bug fixes

### 1.0.0 (2025-09-11)

- (Scrounger) automatic role assignment implemented
- (Scrounger) translation added

### 1.0.0-beta.2 (2025-08-31)

- (Scrounger) adapter config layout bug fixes
- (Scrounger) converted to esm project
- (Scrounger) bug fixes

### 1.0.0-beta.1 (2025-07-08)

- (Scrounger) devices blacklist / whitelist added
- (Scrounger) bug fixes

### 1.0.0-beta.0 (2025-07-07)

- (Scrounger) initial release

## License

MIT License

Copyright (c) 2025 Scrounger <scrounger@gmx.net>

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