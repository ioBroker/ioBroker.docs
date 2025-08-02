---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.adguard/README.md
title: ioBroker.adguard
hash: LjuS7ZNH3yS1ivp9ZY52sadIaODeAdRlkmzLJwwRkeU=
---
![标识](../../../en/adapterref/iobroker.adguard/admin/adguard.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.adguard.svg)
![下载](https://img.shields.io/npm/dm/iobroker.adguard.svg)
![安装数量（最新）](https://iobroker.live/badges/adguard-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/adguard-stable.svg)
![依赖状态](https://img.shields.io/david/o0shojo0o/iobroker.adguard.svg)
![新平台](https://nodei.co/npm/iobroker.adguard.png?downloads=true)

# IoBroker.adguard
**测试：**![测试与发布](https://github.com/o0shojo0o/ioBroker.adguard/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 AdGuard 适配器
AdGuard Home 是一款全网广告和跟踪器拦截 DNS 服务器，具有家长控制（成人内容拦截）功能。AdGuard 适配器允许您在 ioBroker 中控制和监控您的 AdGuard Home 实例。

## 致谢
如果没有@o0Shojo0o (https://github.com/o0Shojo0o) 的出色工作，这个适配器就不可能实现，他开发了此适配器的早期版本。

## 如何报告问题和功能请求
理想情况下，请使用 GitHub 问题来实现这一点，最佳方法是将适配器设置为调试日志模式（实例 -> 专家模式 -> 列日志级别）。然后通过“log”ioBroker 子目录从磁盘检索日志文件，**不是**从 Admin 检索，这样会切断线路。

＃＃ 配置
1. 创建适配器的新实例
2. 填写 AdGurad 服务器的 URL/IP
3.配置用户名和密码
4.保存设置
5.玩得开心:)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.1 (2024-10-26)
- (simatec) Admin-UI has been adapted for small displays.
- (mcm1957) Dependencies have been updated.

### 1.0.0 (2024-10-19)
- (mcm1957) Adapter has been moved to iobroker-community-adapter organisation.
- (mcm1957) Adapter requires js-controller 5, admin 6 and node.js 20 now.
- (mcm1957) Dependencies have been updated.

### 0.0.8 (2021-08-18)

-   (o0Shojo0o) change UI to JSONConfig

### 0.0.7 (2021-08-01)

-   (o0Shojo0o) better unload handling

### 0.0.6 (2021-08-01)

-   (o0Shojo0o) more resource-efficient handling of the States
-   (o0Shojo0o) better unload handling

## License

MIT License

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 Dennis Rathjen <info@bastelbunker.de>

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