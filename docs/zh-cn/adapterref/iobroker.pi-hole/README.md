---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.pi-hole/README.md
title: ioBroker.pi-hole ![Logo](admin/pi-hole.png)
hash: zCjt4T3wLEz5S5KXUAHye39RlUmcbDMKsxvc6X1H+v0=
---
# IoBroker.pi-hole ![标识](../../../en/adapterref/iobroker.pi-hole/admin/pi-hole.png)

![安装数量](http://iobroker.live/badges/pi-hole-stable.svg)
![构建状态](https://api.travis-ci.org/unltdnetworx/ioBroker.pi-hole.svg?branch=master)
![NPM 版本](https://img.shields.io/npm/v/iobroker.pi-hole.svg)
![下载](https://img.shields.io/npm/dm/iobroker.pi-hole.svg)
![NPM](https://nodei.co/npm/iobroker.pi-hole.png?downloads=true)

=================

该适配器用于读取正在运行的 pi-hole 的值并控制设备（启动/停止）。

[警告] 此适配器仅适用于 Pi-hole 6.0.0 以下版本。对于 Pi-hole 6 及更高版本，请使用适配器 [ioBroker.pi-hole2](https://github.com/oweitman/ioBroker.pi-hole2)。

由于 Pi-hole 5 及更早版本已停止维护，此适配器将仅获得非常有限的维护。

步骤
1. 安装适配器

2. 填写 adapter-admin 的字段。包括 Pi-hole 设备的 IP 地址、API 令牌（可从 Pi-hole 设备的管理 Web 界面获取，路径为“设置/API/获取令牌”），以及 Pi-hole 值更新的间隔（在 iobroker 中更新统计信息）。

3. 其中一些对象是 json 表格，可以在 vis 中使用。

4. 点击“激活 Pi-hole”按钮激活过滤器，更改“停用 Pi-hole”的值（0 表示永久停用，数字表示停用秒数）停用过滤器。

＃＃ 要求
* 正在运行 Pi-hole 设备

## 鸣谢
如果没有 Michael Schuster <development@unltd-networx.de> 的出色工作，这个适配器是不可能实现的，他创建了该适配器的先前版本。

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->
捐赠
Kaffee costieren/喝杯咖啡 <https://paypal.me/unltdnetworx>

## Changelog
### 2.0.0 (2025-12-04)

* (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation
* (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
* (mcm1957) Dependencies have been updated

### 1.3.6

* (unltdnetworx) support for controller v5

### 1.3.4

* (unltdnetworx) disabled "getQueryTypes" for creating lots of spam entries

### 1.3.2

* (unltdnetworx) ready for Admin 5 and NodeJS 16

### 1.3.1

* (unltdnetworx) new adapter testing and security update

## License

MIT License

Copyright (c) 2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 Michael Schuster

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