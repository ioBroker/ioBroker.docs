---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.seq/README.md
title: ioBroker.seq
hash: OKXZUVLJ36izUiwt4Xt60u0A8w2G8jTdKLFYp7Wt6W8=
---
![标识](../../../en/adapterref/iobroker.seq/admin/seq.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.seq.svg?dummy=unused)
![下载](https://img.shields.io/npm/dm/iobroker.seq.svg?dummy=unused)
![安装数量（最新）](https://iobroker.live/badges/seq-installed.svg?dummy=0.2.7)
![安装数量（稳定）](https://iobroker.live/badges/seq-stable.svg?dummy=0.2.7)
![国家公共管理](https://nodei.co/npm/iobroker.seq.png?downloads=true)

# IoBroker.seq
[![依赖状态](https://status.david-dm.org/gh/arteck/iobroker.seq.svg)](https://david-dm.org/arteck/iobroker.seq) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/seq/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## IoBroker 的 Seq 适配器
该适配器允许您将 ioBroker 日志推送到 [序列](https://datalust.co/seq) 的系统中。
还可以将过滤器应用于日志级别以及适配器。

＃＃ 配置
1. 创建适配器的新实例
2.填写[Seq](https://datalust.co/seq)实例的URL/IP和端口
3. 指定要推送到[Seq](https://datalust.co/seq)的日志事件
4. 保存设置

## Changelog

<!--
 https://github.com/AlCalzone/release-script#usage
    npm run release minor -- --all 0.9.8 -> 0.10.0
    npm run release patch -- --all 0.9.8 -> 0.9.9
    npm run release prerelease beta -- --all v0.2.1 -> v0.2.2-beta.0
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### __WORK IN PROGRESS__
- (arteck) transfer to arteck

### 0.3.0 (2023-07-25)
- (o0shojo0o) added adminTab
- (o0shojo0o) added adapter to TIER 1

### 0.2.10 (2021-04-15)

- (o0shojo0o) check log message of undefine

### 0.2.9 (2021-02-05)

- (o0shojo0o) fix 'Cannot read property common of null'

### 0.2.8 (2021-01-30)

- (o0shojo0o) fix NullPointerException

### 0.2.7 (2021-01-24)

- (o0shojo0o) added overview card

### 0.2.6 (2021-01-21)

- (bluefox) refactoring
- (bluefox) better translations

### 0.2.5 (2021-01-20)

- (o0shojo0o) no real change only the description for the admin

### 0.2.4 (2021-01-16)

- (o0shojo0o) bugfix display of the filter options
- (o0shojo0o) bugfix display of template parameters
- (o0shojo0o) added parameter logging Arch
- (o0shojo0o) added parameter logging JsController
- (o0shojo0o) added parameter logging Node
- (o0shojo0o) added parameter logging Platform
- (o0shojo0o) added parameter logging SourceVersion

### 0.2.3 (2021-01-15)

- (o0shojo0o) if the server address ends with "/", this must be removed. …

### 0.2.2 (2021-01-10)

- (o0shojo0o) handle uncomplete log message

### 0.2.1 (2020-10-01)

- (o0shojo0o) added forgetting native...

### 0.2.0 (2020-10-01)

- (o0shojo0o) optional selective logging on adapter basis

### 0.1.0 (2020-09-26)

- (o0shojo0o) API key is no longer not displayed in clear text
- (o0shojo0o) API key is now stored encrypted
  - **_Attention: The API key will be lost and must be set again!_**
- (o0shojo0o) higher dependencies of the js-controller (>=3.1.0)

### 0.0.5 (2020-09-23)

- (o0shojo0o) added param SystemName for display in Seq

### 0.0.4 (2020-09-23)

- (o0shojo0o) bugfix at the server address check

### 0.0.3 (2020-09-22)

- (o0shojo0o) fix minimum js.controller version

### 0.0.2 (2020-09-17)

- (o0shojo0o) new release for npm...

### 0.0.2-beta.0 (2020-09-16)

- (o0shojo0o) initial release

### 0.0.1

- (o0shojo0o) initial push

## License

MIT License

Copyright (c) 2024 Arthur Rupp <arteck@outlook.com>,

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