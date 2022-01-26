---
BADGE-Number of Installations: http://iobroker.live/badges/bring-installed.svg
BADGE-Stable version: http://iobroker.live/badges/bring-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.bring.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.bring.svg
BADGE-NPM: https://nodei.co/npm/iobroker.bring.png?downloads=true
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bring/README.md
title: ioBroker.bring
hash: OZhjDNOBP7gPGWiHnvQq6ZDL5FVpF0lZ7JnqtpmifNM=
---
![商标](../../../en/adapterref/iobroker.bring/admin/bring.png)

![安装数量](http://iobroker.live/badges/bring-installed.svg)
![稳定版](http://iobroker.live/badges/bring-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.bring.svg)
![下载](https://img.shields.io/npm/dm/iobroker.bring.svg)
![新产品管理](https://nodei.co/npm/iobroker.bring.png?downloads=true)

# IoBroker.bring
===========================

![构建状态](https://github.com/foxriver76/ioBroker.bring/workflows/Test%20and%20Release/badge.svg)

## 免责声明
本模块的开发者绝不是Bring! 的背书者或附属者！ Labs AG 或任何关联的子公司、徽标或商标。

＃＃ 状态
有关创建状态的说明，请参见下文。

### 频道：信息
* info.connection

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔指标。如果您的经纪人已登录，则状态为真，否则为假。*

* info.user

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

   *只读字符串。包含登录用户的名称。*

### 购物清单
对于每个购物清单，将创建一个具有以下状态的频道：

* *list*.content / *list*.contentHtml/NoHead

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

*只读格式为列表或 html 表格的 json/html 字符串。包含当前在您的购物清单上的项目。
NoHead Html 表没有表头。*

* *list*.recentContent / *list*.recentContentHtml/NoHead

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

*只读格式为列表或 html 表格的 json/html 字符串。包含最近在您的购物清单上的项目。
NoHead Html 表没有表头。*

* *列表*.removeItem

    |数据类型|权限|
    |:---:|:---:|
    |字符串|读/写|

*选择一个应该从购物清单和最近内容清单中删除的项目。
当命令被Bring 确认时，状态将被确认！ API.*

* *列表*.moveToRecentContent

    |数据类型|权限|
    |:---:|:---:|
    |字符串|读/写|

*选择应移动或添加到最近内容列表的项目。
当命令被Bring 确认时，状态将被确认！ API.*

* *列表*.saveItem

    |数据类型|权限|
    |:---:|:---:|
    |字符串|读/写|

*选择应该添加到购物清单的项目。您还可以通过以下模式设置状态来指定项目的附加信息：*

```Apple, 2.50 $, the green ones```

*请注意，逗号后面的所有内容都描述了规范。
当命令被Bring 确认时，状态将被确认！ API.*

* *list*.users / *list*.usersHtml/NoHead

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

*只读格式为列表或 html 表格的 json/html 字符串。包含属于购物清单一部分的用户，以及他们的电子邮件地址。
NoHead Html 表没有表头。*

* *列表*.count

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字，表示列表中包含的项目数。*

* *list*.messageTrigger

    |数据类型|权限|
    |:---:|:---:|
    |按钮|读/写|

*如果您按下此按钮，购物清单将被发送到配置的实例，例如。 G。 Pushover、电报或/和电子邮件。*

* *list*.enumSentence

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

*只读字符串，其中包含可朗读形式的购物清单项目的枚举。
这可以使用 e。 G。通过智能助手进行语音输出。*

* *列表*.translation

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

    *只读 json 字符串，其中包含将瑞士项目名称翻译成列表语言的字典。*

## Changelog
### 1.7.7 (2020-12-12)
* (foxriver76) fix potential crash on `pollAllLists` function

### 1.7.6 (2020-12-05)
* (foxriver76) we now use a unique name for widget rendering function to avoid conflicts
* (foxriver76) if we cannot render widget immediately we try again after one second (see #57)

### 1.7.4 (2020-12-04)
* (foxriver76) we now render the widget immediately

### 1.7.3 (2020-10-26)
* (foxriver76) bring module now returns real errors instead of strings, handle them correct

### 1.7.2 (2020-04-23)
* (foxriver76) fixed potential issue on rendering widget

### 1.7.1 (2020-02-13)
* (foxriver76) we are now using AES-256-CBC as encryption

### 1.6.8 (2019-12-31)
* (foxriver76) ensure compatibility with older browsers

### 1.6.6 (2019-11-21)
* (foxriver76) improved error handling in widget

### 1.6.5 (2019-09-22)
* (foxriver76) re-auth when bearer token is no longer valid

### 1.6.3 (2019-08-28)
* (foxriver76) fixed bug which only allowed one registered event handler
* (foxriver76) by using obj with wid instead of var because vis handles global variables of widgets global
* (foxriver76) now more bring widgets can be used in one vis project
* (foxriver76) bump version of textFit to 2.3.1 -> 2.4.0 and use minified version

### 1.6.2 (2019-08-04)
* (foxriver76) also use translations for enumSentence and notifiations (e. g. email)

### 1.6.1 (2019-07-13)
* (foxriver76) fixed bug, that prevent html states and other from being set

### 1.6.0 (2019-07-12)
* (foxriver76) get translations according to list language
* (foxriver76) translations will be stored in datapoint
* (foxriver76) use bring-node-api at least 1.2.1
* (foxriver76) widget now uses configured language
* (foxriver76) bugfixes and optimizations in front- and backend

### 1.4.0 (2019-06-07)
* (foxriver76) use textFit to fit text to one line in widget
* (foxriver76) internal reworks on widget

### 1.3.4
* (foxriver76) add possibility to use this widget multiple times on same page

### 1.3.3
* (foxriver76) also change height and div sizes according to users specification
* (foxriver76) when item is on recent list and added by text input it is now instantly removed from recent list

### 1.3.2
* (foxriver76) enable configuration of width for items in widget

### 1.3.1
* (foxriver76) api module outsourced

### 1.3.0
* (foxriver76) added widget
* (foxriver76) add possibility to move items to recentContent

### 1.2.1
* (foxriver76) uri encode login request because it can contain special character

### 1.2.0
* (foxriver76) added state which contains a speakable enumeration of each shopping list

### 1.1.0
* (foxriver76) add possibility to send messages
* (foxriver76) respect in app list renaming / recreate channel on name change

### 1.0.0
* (foxriver76) stable release
   
### 0.0.10
* (foxriver76) set info.connection state to false, when cannot get data
   
### 0.0.9
* (foxriver76) also update no head states on normal polling
* (foxriver76) fix bug where polling could grow exponentially
* (foxriver76) fix unhandled error when no internet connection

### 0.0.8
* (foxriver76) add html states w/o header
* (foxriver76) minor fixes
   
### 0.0.7
* (foxriver76) fixed a potential memory leak by setTimeout functions

### 0.0.6
* (foxriver76) add equivalent html states for json states
* (foxriver76) add counter for every list

### 0.0.4
* (foxriver76) fix when login fails

### 0.0.3
* (foxriver76) initial release

## License
The MIT License (MIT)

Copyright (c) 2019-2020 Moritz Heusinger <moritz.heusinger@gmail.com>

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