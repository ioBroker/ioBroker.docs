---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.asuswrt/README.md
title: ioBroker.asuswrt
hash: aI0i0gZIkf0AO68rz7yVv1U5pQCIK2uLW+ZXAiq1YL8=
---
![标识](../../../en/adapterref/iobroker.asuswrt/admin/asuswrt.png)

![安装数量](http://iobroker.live/badges/asuswrt-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.asuswrt.svg)
![下载](https://img.shields.io/npm/dm/iobroker.asuswrt.svg)
![测试](https://api.travis-ci.org/mcdhrts/ioBroker.asuswrt.svg)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![新公共管理](https://nodei.co/npm/iobroker.asuswrt.png?downloads=true)

# IoBroker.asuswrt
=================

## 用于 ioBroker 的 ASUSWRT 适配器
在运行 ASUSWRT 的华硕路由器中查找活动设备。
例如，您可以使用此功能作为手机的存在检测来追踪是否有人在家。

使用运行 ASUSWRT 3.0.0.4.384_32799 的华硕 GT-AC5300 进行测试

您可以在此处找到华硕路由器不使用 ASUSWRT 的列表：https://event.asus.com/2013/nw/ASUSWRT/

＃＃ 要求
您必须在路由器设置中激活并允许 SSH 连接

您至少需要：

* js 控制器 >= 6.0.11
* 管理员 >= 7.6.17
* Node.js >= 18.x

对于较旧的 ioBroker 版本，请安装版本 0.3.1

＃＃ 设置
* 华硕路由器 IP 地址（必填）
* 华硕路由器的 IP 地址
* 登录用户（必填）
* 华硕路由器登录的用户名
* 登录密码（如果使用私钥文件则可选）
* 用户登录的密码
* 当您使用私钥文件时，请将此字段留空。
* 私钥文件（如果使用密码则可选）
* 当您不想使用密码登录时，您可以设置 SSH 登录的私钥文件路径
* 如果不需要，请留空
* 私钥文件密码（如果私钥文件已加密，则为可选）
* 当您的密钥文件使用密码加密后，请在此处输入
* 如果不需要，请留空
* SSH 端口（必填）
* 华硕路由器 SSH 连接的端口
* 投票时间
* 检查活动设备的时间（毫秒）（最短时间为 5000 毫秒 = 5 秒）
* 时间未激活
* 设备不再处于活动状态的时间（以毫秒为单位）。
* 在我的情况下，180000毫秒 = 180秒 = 3分钟，效果很好。最小值为60000毫秒
* 监控地址
* 添加设备以使用设备的 MAC 地址监视其是否处于活动状态。
* 不要忘记设置复选框来激活监控

## Changelog

### 1.0.2 (2025-10-05)
* (mcdhrts) Fixed admin UI 404 error - renamed index_m.html to index.html
* (mcdhrts) Updated requirements documentation to reflect current dependencies (js-controller >= 6.0.11, admin >= 7.6.17, Node.js >= 18.x)
* (mcdhrts) Improved integration tests with proper test harness and configuration validation
* (mcdhrts) Removed deprecated unit tests in favor of modern integration tests
* (mcdhrts) Updated dependencies: ssh2 ^1.4.0 -> ^1.17.0, @iobroker/adapter-core ^3.3.1 -> ^3.3.2, @iobroker/testing ^5.0.4 -> ^5.1.1
* (mcdhrts) Removed deprecated devDependencies: gulp, mocha, chai (now handled by @iobroker/testing)

### 1.0.1 (2019-03-22)
* (mcdhrts) Add Support for Compact Mode

### 1.0.0 (2019-01-13)
* (mcdhrts) 
    * Add possibility to use SSH Private Key File instead of Password.
    * Minimum Polling Time down to 5 Seconds.
    * Removed Simple-SSH Support.
    * Removed Admin V2 Support.

### 0.3.1 (2019-01-03)
* (mcdhrts) Changed Test Files, no features added

### 0.3.0 (2018-12-31)
* (mcdhrts) Code Review Changes, when using SSH2 Polling Intervall is lower to now minimum 10s

### 0.2.1 (2018-12-29)
* (mcdhrts) Update Readme and add missing translations

### 0.2.0 (2018-12-17)
* (mcdhrts) Possibilty to use SSH2 which keeps the SSH Session to the Router alive

### 0.1.2 (2018-12-10)
* (mcdhrts) Update wrong dependencies

### 0.1.1 (2018-12-10)
* (mcdhrts) Update README

### 0.1.0 (2018-12-10)
* (mcdhrts) first complete checked and running beta Version

### 0.0.1 (2018-12-09)
* (mcdhrts) first official beta version

## License
The MIT License (MIT)

Copyright (c) 2019 mcdhrts <mcdhrts@outlook.com>

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