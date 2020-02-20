---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tinker/README.md
title: ioBroker.tinker
hash: JEPSSK8ggpw+2f3PKk6ehT+Aenx/6AA5+dciOw/uXoI=
---
![商标](../../../en/adapterref/iobroker.tinker/admin/tinker.png)

![安装数量](http://iobroker.live/badges/tinker-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.tinker.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tinker.svg)
![NPM](https://nodei.co/npm/iobroker.tinker.png?downloads=true)

＃ioBroker.tinker
===================

Tinker Board Monitor适配器是ioBroker的Raspberry PI Monitor适配器和OrangePi Monitor适配器的修改版

**如果您愿意，请考虑捐赠：**

[![贝宝（https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Q4EEXQ6U96ZTQ&source=url)

###重要信息
经过测试的硬件：华硕Tinker板

选择后可以使用以下对象：
＃＃ *中央处理器*
-cpu_frequency
-负载1
-负载5
-负载15

## *内存*
-memory_available
-memory_free
-memory_total

## *网络（eth0）*
-net_received
-net_send

＃＃ *SD卡*
-sdcard_root_total
-sdcard_root_used

## *交换*
-swap_total
-swap_used

## *温度*
-soc_temp

## *正常运行时间*
-正常运行时间

## *WLAN*
-wifi_received
-wifi_send

##配置
在配置页面上，您可以选择以下模块：

- 中央处理器
-记忆
-网络
- SD卡
-交换
-温度
-正常运行时间
-无线局域网

## Changelog

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

Copyright (c) 2019 simatec <nais@gmx.net>

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