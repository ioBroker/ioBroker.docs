---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.stiebel-isg/README.md
title: ioBroker.stiebel-isg
hash: 1ClhfUd7q9ds4+iWLWMIIZl2Kb6RRT7t1Bk67QM3dxc=
---
![标识](../../../en/adapterref/iobroker.stiebel-isg/admin/stiebel-isg.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.stiebel-isg.svg)
![下载](https://img.shields.io/npm/dm/iobroker.stiebel-isg.svg)
![安装数量（最新）](https://iobroker.live/badges/stiebel-isg-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/stiebel-isg-stable.svg)
![依赖状态](https://img.shields.io/david/unltdnetworx/iobroker.stiebel-isg.svg)
![新公共管理](https://nodei.co/npm/iobroker.stiebel-isg.png?downloads=true)

# IoBroker.stiebel-isg
**测试：**![测试和发布](https://github.com/unltdnetworx/ioBroker.stiebel-isg/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 stiebel-isg 适配器
该适配器用于从 stiebel-eltron/tecalor 互联网服务网关 (ISG) 读取值并控制设备。

步骤
1.安装适配器
2. 从 stiebel-isg.[x] 对象中获取值。

＃＃ 要求
* stiebel-eltron/tecalor 互联网服务网关 (ISG)

## 致谢
如果没有 Michael Schuster (unltdnetworx) <https://github.com/unltdnetworx> 的出色工作，这个适配器是不可能实现的，他创建了该适配器的先前版本。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.0-alpha.1 (2025-10-21)

- (mcm1957) Adapter has been migrated to iobroker-communita-adapters organisation
- (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated

### 1.7.7

* security- and compatibility update

### 1.7.6

* fix error with controller v5

### 1.7.5

* security enhancements

### 1.7.4

* security enhancements

## License
MIT License

Copyright (c) 2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2023 Michael Schuster <development@unltd-networx.de>

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