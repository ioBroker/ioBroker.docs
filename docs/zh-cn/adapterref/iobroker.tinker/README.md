---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tinker/README.md
title: ioBroker.tinker
hash: FVYgJOVkaP4PpmIQU+OGbj9kvGDUNUe53IPDLmChaLI=
---
![标识](../../../en/adapterref/iobroker.tinker/admin/tinker.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.tinker.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tinker.svg)
![安装数量（最新）](http://iobroker.live/badges/tinker-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/tinker-stable.svg)
![已知漏洞](https://snyk.io/test/github/simatec/ioBroker.tinker/badge.svg)
![执照](https://img.shields.io/github/license/simatec/ioBroker.tinker?style=flat)
![捐](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.tinker
---

![测试与发布](https://github.com/simatec/ioBroker.tinker/workflows/Test%20and%20Release/badge.svg)

Tinker Board Monitor 适配器是 ioBroker 的 Raspberry PI Monitor 适配器和 OrangePi Monitor 适配器的修改版本

## 支持适配器开发
**如果您喜欢，请考虑捐赠：**

[![贝宝](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

## 重要信息
测试硬件：华硕 Tinker Board

## 选择后可以使用以下对象：
＃＃＃ 中央处理器
* cpu_频率
* 负载1
* 负载5
* 负载15

＃＃＃ 记忆
* 可用内存
* 内存空闲
* 内存总数

### 网络 (eth0)
* 网络接收
* 网络发送

＃＃＃ SD卡
* sdcard_root_total
* sdcard_root_used

＃＃＃ 交换
* 交换总数
* 交换已使用

＃＃＃ 温度
* 社会温度

### 正常运行时间
* 正常运行时间

### 无线局域网
* wifi_已接收
* 无线网络发送

---

＃＃ 配置
在配置页面上您可以选择以下模块：

* 中央处理器
* 记忆
* 网络
* SD卡
* 交换
* 温度
* 正常运行时间
* 无线局域网

---

## Changelog
<!-- ### __WORK IN PROGRESS__ -->
### __WORK IN PROGRESS__
* (simatec) Dependencies updated
* (simatec) Docu updated

### 1.3.2 (2024-02-14)
* (simatec) Design Fix
* (simatec) Source code cleaned up

### 1.3.1 (2024-02-11)
* (simatec) Dependencies updated
* (simatec) Design Fix
* (simatec) Translation added
* (simatec) jsonConfig added
* (simatec) gulp deleted
* (simatec) adapter-dev added

### 1.3.0 (2024-01-07)
* (simatec) Dependencies updated
* (simatec) many smal Fix
* (simatec) Translation added

### 1.2.1 (2023-11-20)
* (simatec) Dependencies updated

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

Copyright (c) 2018 - 2024 simatec

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