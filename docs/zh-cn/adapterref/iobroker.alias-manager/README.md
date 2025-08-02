---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.alias-manager/README.md
title: ioBroker.别名管理器
hash: aUc414CIMut6wnYAOryCvRI4FFgqYw9itq8ND7gTWEk=
---
![标识](../../../en/adapterref/iobroker.alias-manager/admin/alias-manager.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.alias-manager.svg)
![下载](https://img.shields.io/npm/dm/iobroker.alias-manager.svg)
![安装数量（最新）](http://iobroker.live/badges/alias-manager-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/alias-manager-stable.svg)
![依赖状态](https://img.shields.io/david/sbormann/iobroker.alias-manager.svg)
![已知漏洞](https://snyk.io/test/github/sbormann/ioBroker.alias-manager/badge.svg)
![新平台](https://nodei.co/npm/iobroker.alias-manager.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/sbormann/ioBroker.alias-manager/master.svg)

# IoBroker.alias-manager
## IoBroker 的别名管理器适配器
管理和创建别名。

## 致谢
如果没有 @sbormann (https://github.com/sbormann) 的出色工作，这个适配器就不可能实现，他开发了此适配器的早期版本。

## 如何报告问题和功能请求
理想情况下，请使用 GitHub 问题来实现这一点，最佳方法是将适配器设置为调试日志模式（实例 -> 专家模式 -> 列日志级别）。然后通过“log”ioBroker 子目录从磁盘检索日志文件，**不是**从 Admin 检索，这样会切断线路。

## 快速介绍
### 管理别名
![截屏](../../../en/adapterref/iobroker.alias-manager/img/manual_screenshot_1.png)

* (1) 点击“管理别名”
* (2) 要创建新别名，请点击“新别名”或
* (3) 选择要编辑的现有别名

![截屏](../../../en/adapterref/iobroker.alias-manager/img/manual_screenshot_2b.png)

* (1) 您将看到一个区域，其中包含此别名的常规设置，如名称或常用角色
* (2) 下面您将找到包含别名的所有数据点的列表
* (3) 您可以通过添加一个空的别名数据点或选择一个现有的 iobroker 数据点并将其设置复制到新的别名数据点来将别名数据点添加到此列表
* (4) 您可以通过点击垃圾图标删除数据点
* 每个数据点都有几个字段可以配置：
* 在灰色区域你可以设置名称或者删除数据点
* 在蓝色区域中，您可以配置角色、类型以及（可选）单位
* 在绿色区域中，您可以设置可选的最小值和最大值，并确定数据点是否应为只读（common.write 为关闭）以及是否可以访问其值（common.read 为打开 - 在大多数情况下这是正确的设置）
* 在红色区域您可以：
* (5) 配置此别名数据点所链接的原始 ioBroker 数据点。原始数据点和别名数据点将保持同步。
*（6）此外，您还可以配置读写的转换函数。
* 示例：如果将“val / 10”设置为“Read-Function”，则aias-datapoint 的值将始终是原始数据点的 10%。
* 在大多数情况下，您可能希望将“val * 10”配置为“写入函数”，以便在写入别名数据点时也保持此比率。
* 请在 https://www.iobroker.net/#en/documentation/dev/aliases.md 下的 ioBroker-documentation 中了解有关别名的更多信息

![截屏](../../../en/adapterref/iobroker.alias-manager/img/manual_screenshot_3.png)

* (1) 点击“复制别名”进行复制或
* (2) 单击“重命名别名”以重命名别名，将打开以下对话框：

![截屏](../../../en/adapterref/iobroker.alias-manager/img/manual_screenshot_4.png) \ 在这里您可以：

* (1) 设置新的 id 并
* (2) 为别名设置新的通用名称
* (3) 通过点击“添加替换”，您可以将行添加到以下列表中，您可以在其中：
* (4) 输入一个将被搜索的字符串，并替换为 (5) 此字符串
* 使用此功能，您可以快速更改原始 ioBroker 数据点，您的别名数据点链接到
	* 例子：
* 您有一个带有多个数据点的风扇，例如“SET”、“ERROR”和“UNREACH”
* 这些别名数据点链接到原始数据点，如“hm-rpc.0.JEQ0698034.1.STATE”、“hm-rpc.0.JEQ0698034.0.ERROR”和“hm-rpc.0.JEQ0698034.0.UNREACH”
* 现在，如果您的设备损坏并且必须更换新设备，其序列号将会改变，例如变为 ASDF1234
* 要一次性更新所有别名数据点中的所有链接，您可以搜索“hm-rpc.0.JEQ0698034”并将其替换为“hm-rpc.0.ASDF1234”
* 在创建与旧别名类似的新别名时，这也很有用。只需复制别名，设置新的 ID 和名称，然后使用替换功能，即可调整链接的数据点

![截屏](../../../en/adapterref/iobroker.alias-manager/img/manual_screenshot_5.png)

* 更改设置后，您可以：
* (1) 点击“保存所有更改”或
*（2）点击“保存更改”仅保存一个数据点
* (3) 最后，您可以点击“删除别名”删除整个别名

### 自动创建别名
![截屏](../../../en/adapterref/iobroker.alias-manager/img/manual_screenshot_6b.png)

* (1) 点击‘自动创建别名’

![截屏](../../../en/adapterref/iobroker.alias-manager/img/manual_screenshot_7b.png)

* (1) 首先从 ioBroker 对象树中选择一个设备的 ID
* (2) 然后点击“尝试从此设备创建别名”
* (3) 随后，您将看到已确定的别名设置和
* (4) 所选设备的所有数据点的列表
* 将检查所有自动识别的数据点（仅保存已检查的行）
* 如果自动识别，数据点将设置“目标 ID”。这将是别名的对应数据点（原始数据点将链接到这个新的别名数据点）。自动创建功能会尝试匹配标准化的数据点 ID，具体取决于识别的设备类型。但是，您可以根据需要更改设置，但每个“目标 ID”必须是唯一的。
* 最后，您可以输入目标别名数据点的名称
* 所有未自动识别的数据点均未选中。您可以手动调整设置并激活复选框。
* (5) 您也可以手动将其他数据点添加到此列表或清除整个列表
*（6）然后您可以将新别名与所有已选中的数据点一起保存（未选中的数据点将被丢弃）
* 之后，您将自动转到“管理别名”选项卡，并打开新别名，以根据需要调整其设置

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.0 (2024-10-20)
- (mcm1957) Adapter has been moved to iobroker-community-adapter organisation.
- (mcm1957) Adapter requires js-controller 5, admin 6 and node.js 20 now.
- (mcm1957) Dependencies have been updated.

### 1.2.6 (2022-03-02)
* (sbormann) Updated dependencies.
* (sbormann) Fixed saving of common.custom.

### 1.2.5 (2022-03-02)
* (sbormann) Added All and None Buttons to select Datapoint while autocreating alias.
* (sbormann) Some GUI-Enhancements and fixes for dark mode.

### 1.2.4 (2021-08-25)
* (sbormann) Fixed autocreate not working after renaming destination id.

### 1.2.3 (2021-06-05)
* (sbormann) Fixed autocreate not working after deleting or renaming alias.

## License
MIT License

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2022 Sebastian Bormann <sebastian@bormann.net>

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