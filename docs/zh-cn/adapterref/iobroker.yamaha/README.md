---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.yamaha/README.md
title: 无题
hash: qMqwNP1m3hgyOK3FeucZu0RBOMTKytVSiWBL5QLlzvw=
---
![商标](../../../en/adapterref/iobroker.yamaha/admin/yamaha.png)

![安装数量](http://iobroker.live/badges/yamaha-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.yamaha.svg)
![测试](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.yamaha/master.svg)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

## IoBroker.yamaha
＃＃＃＃ 描述
雅马哈 AV 接收器适配器

### 初始创建
该适配器最初由 @soef 在 https://github.com/soef/ioBroker.yamaha 创建，但不再维护，因此我们将其移至 iobroker-community 以便修复错误。感谢@soef 的工作。

＃＃＃＃ 配置
目前没有自动发现，你必须输入你的接收器的 IP

＃＃＃＃ 安装
通过 ioBroker 管理员。

否则在 iobroker 根目录（例如在 /opt/iobroker 中）执行以下命令 `` npm install iobroker.yamaha iobroker upload yamaha ``

＃＃＃＃ 即时的
状态将在它们发生时被创建。 IE。使用你的 ir-remote 并改变一些东西，你会看到新的状态。
yamaha 设备只接受一个连接。

＃＃＃＃ 要求
雅马哈接收器

您必须在接收器的配置中启用“网络待机”功能

## Changelog
### 0.4.1
* (Sneak-L8) "toggleMute" now toggle mute state (instead of always muting)
### 0.4.0
* (Garfonso) added admin 3 compatibility and more meta-data stuff.
* (Garfonso) added compact mode support.
### 0.3.20
* (Garfonso) adjusted local copy of soef.js to js-controller 3.0
* (Garfonso) updated meta information (links etc) to iobroker-community-adapters
### 0.3.19
* (soef) Changelog added to readme
### 0.3.18
* (Apollon77) Update utils.js and usage, CI Testing and deps
### 0.3.17
* (Apollon77) update basic package-file testing
### 0.3.16
* (soef) node 0.12 removed from testing
### 0.3.15
* (soef) Enhance CI testing
### 0.3.14
* (soef) Possible exception in reconnect fixed
### 0.3.12
* (soef) Version incr. for npm
### 0.3.11
* (soef) reconnect overworked
### 0.3.10
* (soef) realtime Ping now configurable
### 0.3.8
* (soef) realtime states optimized
### 0.3.7
* (soef) fix typo in creating realtime states
### 0.3.6
* (soef) timeout to connect reduced

<!--

## License
The MIT License (MIT)

Copyright (c) 2015-2020 soef <soef@gmx.net>

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
-->