---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sunnyportal/README.md
title: ioBroker.sunnyportal
hash: N0gUYnO3uswmFbjmUP5qlRzzTLWov6A+hRKm6l7uWk8=
---
![标识](../../../en/adapterref/iobroker.sunnyportal/admin/sunnyportal.png)

![构建状态](https://travis-ci.org/marvincaspar/ioBroker.sunnyportal.svg?branch=master)
![NPM 版本](http://img.shields.io/npm/v/iobroker.sunnyportal.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sunnyportal.svg)
![安装数量（最新）](http://iobroker.live/badges/sunnyportal-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/sunnyportal-stable.svg)
![依赖状态](https://img.shields.io/david/marvincaspar/iobroker.sunnyportal.svg)
![已知漏洞](https://snyk.io/test/github/marvincaspar/ioBroker.sunnyportal/badge.svg)
![新PM](https://nodei.co/npm/iobroker.sunnyportal.png?downloads=true)

# IoBroker.sunnyportal
![测试和发布](https://github.com/marvincaspar/ioBroker.sunnyportal/workflows/Test%20and%20Release/badge.svg)

## 用于 ioBroker 的 Sunny Portal 适配器
每分钟从 Sunny Portal 获取当前数据。

### 设置
![设置](../../../en/adapterref/iobroker.sunnyportal/./docs/images/settings.png)

### 对象概述
![对象概述](../../../en/adapterref/iobroker.sunnyportal/./docs/images/object-overview.png)

## 学分
我的代码基于 mkorthuis 的[Sunnyportal-api](https://github.com/mkorthuis/sunnyportal-api/)

## Changelog

### 0.1.5
* (Marvin Caspar) Reduce update interval to 60 seconds

### 0.1.4
* (Marvin Caspar) Rewrite code to fix login issue
* (Marvin Caspar) Add units to ioBroker states

### 0.1.3
* (Marvin Caspar) Fix version

### 0.1.2
* (Marvin Caspar) Fixes for ioBroker repository

### 0.1.1
* (Marvin Caspar) Fix redirect after login
* (Marvin Caspar) Cleanup readme

### 0.1.0
* (Marvin Caspar) Login and fetch current data from sunny portal

### 0.0.1
* (Marvin Caspar) initial release

## License
MIT License

Copyright (c) 2020 Marvin Caspar <info@caspar.dev>

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