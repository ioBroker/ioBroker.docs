---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.webuntis/README.md
title: ioBroker.webuntis
hash: Zwco+BJoxgA1O8l9hSoW9kzalAWqPR6r0D6b8jVq5PI=
---
![标识](../../../en/adapterref/iobroker.webuntis/admin/webuntis.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.webuntis.svg)
![下载](https://img.shields.io/npm/dm/iobroker.webuntis.svg)
![安装数量](https://iobroker.live/badges/webuntis-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/webuntis-stable.svg)
![依赖状态](https://img.shields.io/david/Newan/iobroker.webuntis.svg)
![新PM](https://nodei.co/npm/iobroker.webuntis.png?downloads=true)

# IoBroker.webuntis
**测试：** ![测试和发布](https://github.com/Newan/ioBroker.webuntis/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 webuntis 适配器
适配器从 WebUntis 获取数据

Dieser Adapter bezieht Daten aus Webuntis。
Für eine deutsche Anleitung [希尔克利肯](readme/readme.de.md)

##捐款
[![]（https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=L55UBQJKJEUJL)

＃＃ 入门
在 iobroker 中安装适配器后，会自动打开配置窗口。

现在转到 https://webuntis.com 并在搜索字段中输入学校名称。

![webuntis_start](../../../en/adapterref/iobroker.webuntis/readme/img/webuntis_start.png)

现在您需要从 webuntis 的学校网站的互联网地址获取字符串：

- 基本网址
- 学校的秘密

请参阅上一个屏幕截图下方的示例：[这里](https://hepta.webuntis.com/WebUntis/?school=hbs-F%C3%BCrth#/basic/login)

- hepta.webuntis.com => schoolbase-URL
- hbs-F%C3%BCrth => 学校机密

**如果 in school-secret 是 __+__ ，则必须用空格替换此字符**

现在转到 iobroker 中的配置窗口

![webuntis_config](../../../en/adapterref/iobroker.webuntis/readme/img/webuntis_config.png)

在插入您的用户名（孩子或父母）和此帐户的密码后，您可以将学校秘密和学校-basr-Url 带到配置中。

保存，此时您将成为第二天的课程。

请随时提出推荐版本的建议。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.3.4 (2022-05-08)
* change log-level for error messages

### 0.3.3 (2022-04-03)
* Add errorhandling for timetable

### 0.3.2 (2022-03-02)
* Add errorhandling for inbox & mesage center

### 0.3.1 (2022-01-30)
* Bug fixes in timetable

### 0.3.0 (2022-01-29)
* Add Inbox peview data

### 0.2.0 (2022-01-27)
* Add anonymous login

### 0.1.0 (2022-01-25)
* Add nextDay
* Add code element

### 0.0.1 (2022-01-25)
* (Newan) initial release

## License
MIT License

Copyright (c) 2022 Newan <info@newan.de>

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