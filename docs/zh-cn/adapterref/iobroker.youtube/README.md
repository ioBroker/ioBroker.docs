---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.youtube/README.md
title: ioBroker.youtube
hash: 9qsQQJOK944IIgJkWNtGJhxiuD6W0dH26yUEoXKQBxA=
---
![标识](../../../en/adapterref/iobroker.youtube/admin/youtube.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.youtube.svg)
![下载](https://img.shields.io/npm/dm/iobroker.youtube.svg)
![稳定的](http://iobroker.live/badges/youtube-stable.svg)
![已安装](http://iobroker.live/badges/youtube-installed.svg)
![依赖状态](https://img.shields.io/david/klein0r/iobroker.youtube.svg)
![已知漏洞](https://snyk.io/test/github/klein0r/ioBroker.youtube/badge.svg)
![构建状态](http://img.shields.io/travis/klein0r/ioBroker.youtube.svg)
![新产品管理](https://nodei.co/npm/iobroker.youtube.png?downloads=true)

# IoBroker.youtube
观看次数、订阅者和视频等统计数据

＃＃ 安装
请使用 ioBroker 中的“适配器列表”来安装此适配器的稳定版本。您还可以使用 CLI 安装此适配器：

```
iobroker add youtube
```

＃＃ 配置
要获得 API 密钥，您必须转到 [console.developers.google.com](https://console.developers.google.com/apis/dashboard)。

1.新建项目
2. 创建一个新的 API 密钥
3.添加库的“YouTube Data API v3”
4. 在选项面板中使用该 API-Key
5.通过使用id和自定义名称在频道选项卡中添加多个频道

## Changelog

### 1.1.1

* (klein0r) Updated dependencies

### 1.1.0

* (klein0r) Encrypt sensitive information **(BREAKING CHANGE - RE-ENTER YOUR API KEY)**

### 1.0.3

* (klein0r) Remove forbidden chars from state
* (klein0r) Fixed async object creation

### 1.0.2

* (klein0r) Delete unsed states

### 1.0.1

* (klein0r) Fixed trailing dot in channel error message

### 1.0.0

* (klein0r) First stable release

### 0.0.13

* (klein0r) Changed to new library

### 0.0.12

* (klein0r) Added json summary

### 0.0.11

* (klein0r) setTimeout found in main.js, but no clearTimeout detected

### 0.0.10

* (klein0r) Added missing translations

### 0.0.9

* (klein0r) Updated depencencies

### 0.0.8

* (klein0r) Removed link from overview

### 0.0.7

* (klein0r) Added VIS widget

### 0.0.6

* (klein0r) Collect YouTube information after configuration changes

### 0.0.5

* (klein0r) Bugfix

### 0.0.4

* (klein0r) Added more options

### 0.0.3

* (klein0r) Support for multiple channels

### 0.0.2

* (klein0r) improved error handling

### 0.0.1

* (klein0r) initial release

## License

The MIT License (MIT)

Copyright (c) 2021 Matthias Kleine <info@haus-automatisierung.com>

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