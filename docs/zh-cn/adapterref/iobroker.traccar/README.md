---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.traccar/README.md
title: ioBroker.traccar
hash: Y8YCkqBRWtiVubFXfNJkRPT+T1i3n/ZiSC5DGQcMCL4=
---
![标识](../../../en/adapterref/iobroker.traccar/admin/traccar.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.traccar.svg?dummy=unused)
![下载](https://img.shields.io/npm/dm/iobroker.traccar.svg?dummy=unused)
![安装数量（最新）](https://iobroker.live/badges/traccar-installed.svg?dummy=unused)
![安装数量（稳定）](https://iobroker.live/badges/traccar-stable.svg?dummy=unused)
![已知漏洞](https://snyk.io/test/github/arteck/ioBroker.traccar/badge.svg?dummy=unused)
![国家公共管理](https://nodei.co/npm/iobroker.traccar.png?downloads=true)

# IoBroker.traccar
[![依赖状态](https://status.david-dm.org/gh/arteck/iobroker.traccar.svg?dummy=unused)](https://david-dm.org/arteck/iobroker.traccar) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/traccar/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## IoBroker 的 Traccar 适配器
该适配器实时导入来自[特拉卡](https://www.traccar.org)的位置和扩展数据，并使它们在ioBroker中可用。

＃＃ 配置
1. 创建适配器的新实例
2. 填写 Traccar 服务器的 URL/IP 和端口
3.配置用户名和密码
4. 保存设置
5.玩得开心:)

## Changelog

<!--
 https://github.com/AlCalzone/release-script#usage
    npm run release major -- -p iobroker license --all 0.9.8 -> 1.0.0
    npm run release minor -- -p iobroker license --all 0.9.8 -> 0.10.0
    npm run release patch -- -p iobroker license --all 0.9.8 -> 0.9.9
    npm run release prerelease beta -- -p iobroker license --all v0.2.1 -> v0.2.2-beta.0
	Placeholder for the next version (at the beginning of the line):
	
-->
### **WORK IN PROGRESS**
-   (arteck) transfer to arteck

### 1.1.4 (2023-10-30)
-   (arteck) fix last_update DP

### 1.1.3 (2023-10-28)
-   (arteck) geofances fix for Server >= 5.8 (check adapter Settings)

### 1.1.2 (2023-07-16)
-   (o0shojo0o) another fix for Traccar Server >= v5.8

### 1.1.1 (2023-07-01)
-   (o0shojo0o) fix translation

### 1.1.0 (2023-07-01)
-   (o0shojo0o) support for https/wss connections
-   (o0shojo0o) fix for Traccar Server < v5.8

### 1.0.1 (2023-06-22)
-   (o0shojo0o) fix deploy workflow

### 1.0.0 (2023-06-22)
-   (o0shojo0o) fix for Traccar Server >= v5.8

### 0.0.12 (2022-07-20)

-   (o0shojo0o) fix geofenceIds now nullable
-   (o0shojo0o) add Device datapoint Status

### 0.0.11 (2021-08-19)

-   (o0shojo0o) fix translation

### 0.0.10 (2021-08-18)

-   (o0shojo0o) change UI to JSONConfig

### 0.0.9 (2021-05-19)

-   (o0shojo0o) prevent unnecessary process attributes from being interrupted
-   (o0shojo0o) optimization of the link between device and incoming message

### 0.0.8 (2021-04-30)

-   (o0shojo0o) bugfix wrong value type
-   (Weblate) german language update

### 0.0.7 (2021-03-24)

-   (o0shojo0o) bugfix special characters in password or username
-   (o0shojo0o) code refactor
-   (o0shojo0o) better handling with new device or geolocation at runtime

### 0.0.6 (2021-03-19)

-   (o0shojo0o) adjustments according to the adapter review

### 0.0.5 (2021-03-08)

-   (o0shojo0o) add [release-script](https://github.com/AlCalzone/release-script)

### 0.0.4

-   (o0shojo0o) add datapoint address (https://www.traccar.org/reverse-geocoding/)

### 0.0.3

-   (o0shojo0o) workaround for unclean geofences in the database

### 0.0.2

-   (o0shojo0o) add websocket connection
-   (o0shojo0o) add position url
-   (o0shojo0o) add dynamic datapoints for attributes

### 0.0.1

-   (braindead1) initial release

## License

MIT License

Copyright (c) 2024  Arthur Rupp <arteck@outlook.com>,

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