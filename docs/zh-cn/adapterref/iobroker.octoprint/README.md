---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.octoprint/README.md
title: ioBroker.octoprint
hash: F00xH70gAyof0yLDWSd7FOTi5eeNQdkUMW3SushJrYM=
---
![标识](../../../en/adapterref/iobroker.octoprint/admin/octoprint.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.octoprint.svg)
![下载](https://img.shields.io/npm/dm/iobroker.octoprint.svg)
![稳定的](http://iobroker.live/badges/octoprint-stable.svg)
![已安装](http://iobroker.live/badges/octoprint-installed.svg)
![依赖状态](https://img.shields.io/david/klein0r/iobroker.octoprint.svg)
![已知漏洞](https://snyk.io/test/github/klein0r/ioBroker.octoprint/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.octoprint.png?downloads=true)

# IoBroker.octoprint
![测试和发布](https://github.com/klein0r/ioBroker.octoprint/workflows/Test%20and%20Release/badge.svg)

将 OctoPrint 连接到 ioBroker 的适配器

**使用 [八印](https://github.com/OctoPrint/OctoPrint/releases) 1.7.2 测试**

＃＃ 安装
请使用 ioBroker 中的“适配器列表”来安装此适配器的稳定版本。您还可以使用 CLI 安装此适配器：

```
iobroker add octoprint
```

＃＃ 特征
＃＃＃ 信息
- 获取版本信息
- 获取打印机信息
- 获取当前打印作业信息
- 获取文件列表信息

＃＃＃ 工具
- 设置工具温度
- 设置床温
- 挤压/收缩

### 命令
- 打印机：连接、断开和回家
- 作业：开始、暂停、恢复、取消、重启
- SD 卡：初始化、刷新、释放
- 自定义打印机命令
- 系统命令
- 点动 X、Y 和 Z 轴
- 选择一个文件或打印它

＃＃ 重要的！
请勿使用以下代码重新启动 OctoPrint 实例（或任何其他实例）：

```javascript
var obj = getObject('system.adapter.octoprint.0');
obj.common.enabled = false;
setObject('system.adapter.octoprint.0', obj);
```

由于 `API key` 是自 1.1.0 版以来的受保护属性，因此这将删除配置的 API 密钥。原因是， `getObject` 不返回受保护的信息（因此 api 密钥不包含在返回的对象中）。当您保存对象时，您将保存一个没有密钥的对象。

请使用状态 `system.adapter.octoprint.0.alive` 来停止/启动实例。

##哨兵
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

* (klein0r) Allow to pause/resume printjob

### 2.0.5 (2021-11-18)

* (klein0r) Require new version for translated instance objects
* (klein0r) Fixed timeout issues

### 2.0.4

* (klein0r) Improved API request handling

### 2.0.3

* (klein0r) Translated all objects

### 2.0.2

* (klein0r) Extrude commands

### 2.0.1

* (klein0r) Fixed missing translations

### 2.0.0

* (klein0r) Admin 5 Support **(BREAKING CHANGE - RENAMED TEMPERATURE NAMESPACE)**

### 1.1.2

* (klein0r) Updated file refresh handling

### 1.1.1

* (klein0r) Minor fixes

### 1.1.0

* (klein0r) Encrypt sensitive information **(BREAKING CHANGE - RE-ENTER YOUR API KEY)**

### 1.0.10

* (klein0r) Fixed printjob state format issues

### 1.0.9

* (klein0r) nodejs 12 required

### 1.0.8

* (klein0r) Avoid constant refresh of file list

### 1.0.7

* (klein0r) Fixed async object creation

### 1.0.6

* (foxriver76) Avoid spamming the same error again and again

### 1.0.5

* (klein0r) Allow to select and print files using objects
* (klein0r) Fixed .toFixed exception when no job is running

### 1.0.4

* (klein0r) Fixed .toFixed exception when no job is running

### 1.0.3

* (klein0r) Fixed filament information (volume and length)

### 1.0.2

* (klein0r) Added name for OctoPrint Instance
* (klein0r) Fixed admin translation issue (syntax error)

### 1.0.1

* (klein0r) Added iobroker sentry

### 1.0.0

* (klein0r) First stable release

### 0.0.6

* (klein0r) Improved error handling

### 0.0.5

* (klein0r) Switched to axios lib (replaced request - deprecated)

### 0.0.4

* (klein0r) Added missing translations
* (klein0r) Changed default port to 80

### 0.0.3

* (klein0r) Updated depencencies

### 0.0.2

* (klein0r) fixed several issues, new class based structure

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