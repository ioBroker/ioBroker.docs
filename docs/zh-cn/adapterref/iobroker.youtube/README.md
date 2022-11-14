---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.youtube/README.md
title: ioBroker.youtube
hash: IOhfJ47zSLRGKRWKjC9AATMBzCvbkfs3GYWxcqohtHc=
---
![标识](../../../en/adapterref/iobroker.youtube/admin/youtube.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.youtube?style=flat-square)
![下载](https://img.shields.io/npm/dm/iobroker.youtube?label=npm%20downloads&style=flat-square)
![npm 包的 Snyk 漏洞](https://img.shields.io/snyk/vulnerabilities/npm/iobroker.youtube?label=npm%20vulnerabilities&style=flat-square)
![节点-lts](https://img.shields.io/node/v-lts/iobroker.youtube?style=flat-square)
![最新版本的 Libraries.io 依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.youtube?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/klein0r/iobroker.youtube?style=flat-square)
![GitHub 存储库大小](https://img.shields.io/github/repo-size/klein0r/iobroker.youtube?logo=github&style=flat-square)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/klein0r/iobroker.youtube?logo=github&style=flat-square)
![GitHub 上次提交](https://img.shields.io/github/last-commit/klein0r/iobroker.youtube?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/klein0r/iobroker.youtube?logo=github&style=flat-square)
![GitHub 工作流状态](https://img.shields.io/github/workflow/status/klein0r/iobroker.youtube/Test%20and%20Release?label=Test%20and%20Release&logo=github&style=flat-square)
![GitHub 存储库的 Snyk 漏洞](https://img.shields.io/snyk/vulnerabilities/github/klein0r/iobroker.youtube?label=repo%20vulnerabilities&logo=github&style=flat-square)
![贝塔](https://img.shields.io/npm/v/iobroker.youtube.svg?color=red&label=beta)
![稳定的](http://iobroker.live/badges/youtube-stable.svg)
![已安装](http://iobroker.live/badges/youtube-installed.svg)

# IoBroker.youtube
## 版本
观看次数、订阅者和视频等统计数据

＃＃ 由...赞助
[![ioBroker Master Kurs](https://haus-automatisierung.com/images/ads/ioBroker-Kurs.png)](https://haus-automatisierung.com/iobroker-kurs/?refid=iobroker-youtube)

＃＃ 安装
请使用 ioBroker 中的“适配器列表”来安装此适配器的稳定版本。您还可以使用 CLI 安装此适配器：

```
iobroker add youtube
```

＃＃ 配置
要获得 API 密钥，您必须转到 [console.developers.google.com](https://console.developers.google.com/apis/dashboard)。

1.新建项目
2. 创建新的 API 密钥
3.添加库的“YouTube Data API v3”
4. 在选项面板中使用该 API-Key
5. 使用 id 和自定义名称在频道选项卡中添加多个频道

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

* (klein0r) Dropped Admin 5 support

### 4.0.0 (2022-05-29)

NodeJS 14.x is required (NodeJS 12.x is EOL)

* (klein0r) Fixed last update time

### 3.0.1 (2022-03-17)

* (klein0r) Just perform video info request if previous request was successful
* (klein0r) Improved error handling when API key is missing
* (klein0r) Updated logging

### 3.0.0 (2022-02-12)

* (klein0r) Updated state roles
* (klein0r) Added hint for Admin 4 configuration

### 2.0.4 (2021-12-23)

* (klein0r) Translated all objects
* (klein0r) Updated dependencies

### 2.0.3 (2021-11-07)

* (klein0r) Fixed missing VIS widget

## License

The MIT License (MIT)

Copyright (c) 2022 Matthias Kleine <info@haus-automatisierung.com>

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