---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.stiebel-isg/README.md
title: ioBroker.stiebel-isg
hash: iyF0ZWK88/WwUlksouiJrRJoAU/ZMAs2UqiVj+jo/Co=
---
![商标](../../../en/adapterref/iobroker.stiebel-isg/admin/stiebel-isg.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.stiebel-isg.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.stiebel-isg.svg)
![安装数量（最新）](https://iobroker.live/badges/stiebel-isg-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/stiebel-isg-stable.svg)
![依赖状态](https://img.shields.io/david/unltdnetworx/iobroker.stiebel-isg.svg)
![NPM](https://nodei.co/npm/iobroker.stiebel-isg.png?downloads=true)

＃ioBroker.stiebel-isg
**测试：**![测试与发布](https://github.com/unltdnetworx/ioBroker.stiebel-isg/workflows/Test%20and%20Release/badge.svg)

##用于ioBroker的stiebel-isg适配器
该适配器可用于从stiebel-eltron / tecalor Internet服务网关（ISG）读取值并控制设备。

自行承担风险！！！绝对不为损坏提供保修，等等！！！

欢迎提供帮助或提示。

##捐赠
卡菲·比迪恩（Kaffee budieren）/提供咖啡<https://paypal.me/unltdnetworx>

＃＃ 脚步
1.安装adpater

2.从stiebel-isg。[x]对象中获取值。

＃＃ 要求
* stiebel-eltron / tecalor互联网服务网关（ISG）

## Changelog

### 1.7.0

* new adapter structure, bugfixes for new js-controller

### 1.6.0

* new values for isg-version 12 implemented

### 1.6.1

* isg-sites to read values from, can now be select by the user

### 1.5.3

* bugfix for latest_value added in statistics for database

### 1.5.2

* latest_value added in statistics for database

### 1.5.1

* new adapter testing and security update

### 1.5.0

* support for cooling values and startpage graphs

### 1.4.11

* support for further heatingtyp WPL25A

## License
MIT License

Copyright (c) 2018-2021 Michael Schuster <development@unltd-networx.de>

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