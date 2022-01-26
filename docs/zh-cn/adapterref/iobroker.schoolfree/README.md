---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.schoolfree/README.md
title: ioBroker.schoolfree
hash: wN18juysKPSF8CRtXU2o7IO+98KeQ0F3ee1AtnacO50=
---
![商标](../../../en/adapterref/iobroker.schoolfree/admin/schoolfree.png)

![安装数量](http://iobroker.live/badges/schoolfree-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.schoolfree.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.schoolfree.svg)
![依赖状态](https://img.shields.io/david/simatec/iobroker.schoolfree.svg)
![已知漏洞](https://snyk.io/test/github/simatec/ioBroker.schoolfree/badge.svg)
![特拉维斯](http://img.shields.io/travis/simatec/ioBroker.schoolfree/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/simatec/ioBroker.schoolfree?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.schoolfree.png?downloads=true)

＃ioBroker.schoolfree
![测试与发布](https://github.com/simatec/ioBroker.schoolfree/workflows/Test%20and%20Release/badge.svg)

该适配器使用服务Sentry.io向开发人员自动向我报告异常和代码错误以及新设备架构。更多详细信息请参见下文！

##适用于ioBroker的schoolfree适配器
**如果您愿意，请考虑捐赠：**

[![贝宝（https://www.paypalobjects.com/zh_CN/DK/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Q4EEXQ6U96ZTQ&source=url)

###德意志银行（Deutsche Beschreibung）：
校内免费安装适配器。
在Datenpunkteübergeben的Schulgerien auswerten und Mit dem Adapter。
Die Datenpunktekönnensomitfürweitere Funktionen wie Heizungssteuerungen，Rolladen- and Anwesenheitssteuerungen ausgewertet and verarbeitet werden。

API的https://www.mehr-schulferien.de

德国和德国之间的友谊。

从学校到学校的日程安排：

* info.current.end：Datumfürdas Ende der aktuellen Ferien
* info.current.name：Bezeichnung der aktuellen Schulferien
* info.current.start：开始日期
* info.next.end：费恩（Fer das Ende dernächstenFerien）
*信息名称：Bezeichnung dernächstenSchulferien
* info.next.start：开始日期Ferien
*今日信息：切换到静态状态（真/假）
* info。明天：Switch forfürden aktuellen Status morgen（true / false）

*************************************************************************************************************************************

###英文说明：
Schoolfree是用于iobroker安装的适配器。
使用适配器，可以评估学校假期并将其转移到数据点。
因此，可以针对其他功能（例如加热控制，快门和存在控制）对数据点进行评估和处理。

当前的学校假期订阅是通过https://www.mehr-schulferien.de的API进行的

目前，支持德国的学校假期和放假时间。

以下数据点可用于Schoolfree的进一步处理：

* info.current.end：当前假期结束的日期
* info.current.name：当前学校假期的名称
* info.current.start：当前假期的开始日期
* info.next.end：下一个假期结束的日期
* info.next.name：下一个学校假期的名称
* info.next.start：下一个假期的开始日期
*今天的信息：今天切换为当前状态（是/否）
* info。明天：明天切换为当前状态（对/错）

###什么是Sentry.io，什么报告给该公司的服务器？
Sentry.io是一项服务，供开发人员从其应用程序中获取有关错误的概述。确切地说，这是在此适配器中实现的。

当适配器崩溃或发生其他代码错误时，此错误消息（也出现在ioBroker日志中）将提交给Sentry。当您允许iobroker GmbH收集诊断数据时，还将包括您的安装ID（这是唯一的ID，**没有**有关您的任何其他信息，电子邮件，姓名等）。这使Sentry可以对错误进行分组，并显示有多少唯一用户受此错误影响。所有这些都帮助我提供了基本上不会崩溃的无错误适配器。

*************************************************************************************************************************************

## Changelog

### 1.0.0 (06.05.2021)
* (simatec) GUI revised
* (simatec) Added support for admin5
* (simatec) code cleaned
* (simatec) dependencies updated
* (simatec) Github Test and Release added

### 0.7.0 (27.10.2020)
* (simatec) Changeover from request to axios for data retrieval
* (simatec) Conversion of the code structure
* (simatec) code cleaned
* (simatec) dependencies updated

### 0.6.4 (06.07.2020)
* (simatec) small Bugfixes

### 0.6.3 (02.07.2020)
* (simatec) Bugfix API Request error

### 0.6.2 (27.05.2020)
* (simatec) small Bugfixes at locations settings

### 0.6.1 (11.05.2020)
* (simatec) added errorhandling for sentry.io
* (simatec) added node 14 support

### 0.6.0 (04.05.2020)
* (simatec) added new features
* (simatec) Bugfix next day schoolfree
* (simatec) added sentry.io
* (simatec) added translations
* (simatec) added error handling

### 0.5.1 (25.03.2020)
* (simatec) added new features

### 0.5.0 (23.03.2020)
* (simatec) added public holidays
* (simatec) Bugfix next schoolfree for API 2.0
* (simatec) Bugfix schoolfree-name for API 2.0

### 0.4.1 (22.03.2020)
* (simatec) new query as adaptation to API v2.0
* (simatec) Adjustment of the federal state IDs"
* (simatec) Code fix for autochecker
* (simatec) update Dependencies

### 0.4.0 (21.03.2020)
* (simatec) added new api v2.0 from www.mehr-schulferien.de

### 0.3.1 (28.10.2019)
* (simatec) Fix start after install

### 0.3.0 (18.10.2019)
* (simatec) end of node 6 support
* (simatec) changed dateformat

### 0.2.2 (04.06.2019)
* (simatec)new object structure

### 0.2.1 (14.05.2019)
* (simatec) fix travis and appveyor

### 0.2.0 (13.05.2019)
* (simatec) Add Objects for next school holiday
* (simatec) cleaned code

### 0.1.0 (10.05.2019)
* (simatec) First Beta

### 0.0.1 (08.05.2019)
* (simatec) initial release

*************************************************************************************************************************************

## License
MIT License

Copyright (c) 2019 - 2021 simatec

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