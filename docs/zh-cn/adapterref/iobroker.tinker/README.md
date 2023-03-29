---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tinker/README.md
title: ioBroker.tinker
hash: AUPXL9BxNG45UFrTKkEbjPt6irP0fpPFrXNNC5pO9lk=
---
![标识](../../../en/adapterref/iobroker.tinker/admin/tinker.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.tinker.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tinker.svg)
![安装数量（最新）](http://iobroker.live/badges/tinker-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/tinker-stable.svg)
![已知漏洞](https://snyk.io/test/github/simatec/ioBroker.tinker/badge.svg)
![执照](https://img.shields.io/github/license/simatec/ioBroker.tinker?style=flat)
![捐](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.tinker
===================

![测试和发布](https://github.com/simatec/ioBroker.tinker/workflows/Test%20and%20Release/badge.svg)

Tinker Board Monitor adapter 是 Raspberry PI Monitor adapter 和 OrangePi Monitor adapter for ioBroker 的修改版本

**如果喜欢，请考虑捐款：**

[![贝宝](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

### 重要信息
测试硬件：Asus Tinker Board

### 以下对象在选择后可用：
＃＃ *中央处理器*
- cpu_frequency
- 加载 1
- 加载5
- 加载 15

＃＃ *记忆*
- 内存可用
- memory_free
- memory_total

## *网络（eth0）*
- net_received
- net_send

＃＃ *SD卡*
- sdcard_root_total
- sdcard_root_used

＃＃ *交换*
- swap_total
- swap_used

＃＃ *温度*
- 社会温度

## *正常运行时间*
- 正常运行时间

## *无线局域网*
- wifi_received
- wifi_send

＃＃ 配置
在配置页面上，您可以选择以下模块：

- 中央处理器
- 记忆
- 网络
- SD卡
- 交换
- 温度
- 正常运行时间
- 无线局域网

## Changelog
<!-- ### __WORK IN PROGRESS__ -->
### 1.2.0 (2023-03-18)
* (simatec) Dependencies updated
* (simatec) test and release updated
* (simatec) Repo updated

### 1.1.1 (2021-11-18)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 1.1.0 (2020-04-08)
* (simatec) delete sync-exec
* (simatec) Rewritten code on child_process
* (simatec) code cleaned

### 1.0.0 (2020-04-07)
* (simatec) Release 1.0.0

### 0.1.3 (2019-03-14)
* (simatec) Ready for latest

### 0.1.1 (2019-01-08)
* Fix for new iobroker Installer

### 0.1.0 (2018-07-03)
* First Beta

### 0.0.1 (2018-07-03)
* initial Version

## License

The MIT License (MIT)

Copyright (c) 2018 - 2023 simatec

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