---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lg-ess-home/README.md
title: ioBroker.lg-ess-home
hash: 4GNoYej3oFgZU3Caa/hTX61SFlVk0Tli/uFXc5ZzeE4=
---
![标识](../../../en/adapterref/iobroker.lg-ess-home/admin/lg-ess-home.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.lg-ess-home.svg)
![下载](https://img.shields.io/npm/dm/iobroker.lg-ess-home.svg)
![安装数量（最新）](http://iobroker.live/badges/lg-ess-home-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/lg-ess-home-stable.svg)
![已知漏洞](https://snyk.io/test/github/Morluktom/ioBroker.lg-ess-home/badge.svg)
![NPM](https://nodei.co/npm/iobroker.lg-ess-home.png?downloads=true)

# IoBroker.lg-ess-home
**测试：** ![测试和发布](https://github.com/Morluktom/ioBroker.lg-ess-home/workflows/Test%20and%20Release/badge.svg)

## 用于 ioBroker 的 LG ESS Home 适配器
用于 LG ESS 混合逆变器的 iobroker 适配器。使用此适配器，可以读取逆变器的状态。也可以操作逆变器。

＃＃ 配置
###获取密码
1. 下载文件[LG_Ess_Password.exe](https://github.com/Morluktom/ioBroker.lg-ess-home/tree/master/tools)
1. 将电脑连接到LG_ESS系统的WLAN。 （WLAN 密码在铭牌上）
1. 启动 LG_Ess_Password.exe（至少需要 .Net Framework 4.5）
1.记下您的密码

对于那些不喜欢 exe 的人：（感谢 grex1975）\ 你可以使用任何 REST 客户端来获取密码：

1.连接到LG_ESS的WLAN
1.执行POST请求\

网址：https://192.168.23.1/v1/user/setting/read/password \ Headers: "Charset": "UTF-8", "Content-Type": "application/json"\ {Body: "key" : "lgepmsuser!@#"}

这应该给你密码和状态作为回报。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (Morluktom) Fixed warnings found by adapter checker
* (Morluktom) Added Admin 5 configuration
* (Morluktom) Added Ukrainan language

### 0.2.3 (2022-04-05)
* (Morluktom) Chart widget: Datepicker changed to jquery

### 0.2.2 (2022-04-04)
* (Morluktom) Chart widget updated

### 0.2.1 (2022-04-04)
* (Morluktom) Chart widget updated

### 0.2.0 (2022-03-14)
* (Morluktom) Chart widget added

### 0.1.1 (2022-01-07)
* (Morluktom) replaced deprecated library and login as installer only when needed

### 0.1.0 (2021-11-27)
* (Morluktom) Read chart data and data from the installer settings

### 0.0.10 (2021-05-04)
* (Morluktom) Bugfix boolean value

### 0.0.9 (2021-05-04)
* (Morluktom) Bugfix boolean value

### 0.0.8 (2021-02-06)
* (Morluktom) Code cleanup

### 0.0.7 (2021-02-01)
* (Morluktom) Code cleanup

### 0.0.6 (2020-12-23)
* (Morluktom) Data type recognition fixed

### 0.0.5 (2020-12-15)
* (Morluktom) ScalingFactor moved to nativ
* password encryption => auto encryption (Maybe you have to set the password new)

### 0.0.4
* (Morluktom) W => kW, values confirmed

### 0.0.3
* (Morluktom) Structure of the channel and states changed

### 0.0.2
* (Morluktom) Separate Intervall for Common and Home

### 0.0.1
* (Morluktom) initial release

## License
MIT License

Copyright (c) 2023 Morluktom <strassertom@gmx.de>

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