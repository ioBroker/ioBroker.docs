---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.trivum/README.md
title: ioBroker.trivum
hash: OPUUq+XSk/V6xvZboFDmtK4R9e9OgPnZxtJRc9Tor10=
---
![商标](../../../en/adapterref/iobroker.trivum/admin/trivum.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.trivum.svg)
![下载](https://img.shields.io/npm/dm/iobroker.trivum.svg)
![安装数量（最新）](http://iobroker.live/badges/trivum-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/trivum-stable.svg)
![依赖状态](https://img.shields.io/david/TheBam1990/iobroker.trivum.svg)
![已知漏洞](https://snyk.io/test/github/TheBam1990/ioBroker.trivum/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.trivum.png?downloads=true)

# IoBroker.trivum
**测试：** ![测试和发布](https://github.com/TheBam1990/ioBroker.trivum/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 trivum 适配器
Trivum 多房间系统

＃＃ 用户手册
在主设置选项卡中输入设备的 IP 地址。
然后适配器自动搜索可用区域并将它们与对象列表中的关联对象一起写入。

以下创建为通用变量（全局）：

- 关掉一切

- 活动区域（当前有多少个区域）

然后是各个区域下的相应控制元素：

-Mute（静音并重新激活）

-Defoult-Stream（使用标准网络流激活区域）

-Defoult 调谐器（使用标准调谐器激活区域）

-Volume（显示音量并改变它）

-Zone-Off（关闭区域）

- 区域状态（显示区域是打开还是关闭）

## Changelog

### 0.0.4 (2021-06-12)
* (TheBam) Paging added and info.connection fixed for admin 5

### 0.0.3 (2021-04-29)
* (TheBam) Cleaning the code

### 0.0.2
* (TheBam) Cleaning the code

### 0.0.1
* (TheBam) First version to control your Trivum Multiroom Systems

## License
MIT License

Copyright (c) 2021 TheBam <elektrobam@gmx.de>

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
SOFTWARE."# ioBroker.trivum"