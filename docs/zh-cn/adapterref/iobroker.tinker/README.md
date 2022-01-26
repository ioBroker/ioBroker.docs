---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tinker/README.md
title: ioBroker.tinker
hash: keeAn15kWOL11iVfAuzbRm8qeiPupoUlwH36ne0B0oQ=
---
![标识](../../../en/adapterref/iobroker.tinker/admin/tinker.png)

![安装数量](http://iobroker.live/badges/tinker-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.tinker.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tinker.svg)
![已知漏洞](https://snyk.io/test/github/simatec/ioBroker.tinker/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.tinker.png?downloads=true)

# IoBroker.tinker
===================

![测试和发布](https://github.com/simatec/ioBroker.uv-protect/workflows/Test%20and%20Release/badge.svg)

Tinker Board Monitor 适配器是 ioBroker 的 Raspberry PI Monitor 适配器和 OrangePi Monitor 适配器的修改版

**如果您喜欢，请考虑捐赠：**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Q4EEXQ6U96ZTQ&source=url)

### 重要信息
测试硬件：Asus Tinker Board

###以下对象在选择后可用：
＃＃ *中央处理器*
- cpu_频率
- 加载 1
- 负载5
- 负载15

＃＃ *记忆*
- 内存可用
- memory_free
- memory_total

## *网络（eth0）*
- net_received
- 网络发送

＃＃ *SD卡*
- sdcard_root_total
- sdcard_root_used

＃＃ *交换*
- swap_total
- 交换使用

＃＃ *温度*
- soc_temp

## *正常运行时间*
- 正常运行时间

## *无线局域网*
- wifi_received
- wifi_send

＃＃ 配置
在配置页面，您可以选择以下模块：

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

Copyright (c) 2018 - 2021 simatec

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