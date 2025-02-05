---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tagesschau/README.md
title: ioBroker每日新闻
hash: 5ZK9t/CEIsWKNemo9oQJdxMkeuNf3SHfJeOLXZ6z25g=
---
![标识](../../../en/adapterref/iobroker.tagesschau/admin/tagesschau.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.tagesschau.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tagesschau.svg)
![安装数量](https://iobroker.live/badges/tagesschau-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/tagesschau-stable.svg)
![新平台](https://nodei.co/npm/iobroker.tagesschau.png?downloads=true)

# IoBroker.tagesschau
**测试：**![测试与发布](https://github.com/ticaki/ioBroker.tagesschau/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 tagesschau 适配器
[德国新闻 (aktueller)](README-GER.md)

从 Tagesschau 检索新闻和视频链接。

内容仅提供德语版本。

安装 - 在管理员中设置所需的设置 - 完成。

**根据 Tagesschau api，每小时 60 个查询是可以的。每个主题和视频都是 1 个查询。每次更新 30 分钟总是合适的。不知道他们具体是怎么做到的。**

请注意：

1. 如果未选择“启用消息”或“启用视频消息”，适配器将暂停
2. 如果选择激活消息，则仅当配置中选择了 1 个主题和 1 个联邦州时，适配器才会运行。
3. 关键字是从消息中提取的，仅在第一次运行后可用。随着时间的推移，关键字会越来越多！这些仅适用于消息。

## 免责声明
**所有产品和公司名称或徽标均为其各自所有者的商标™或注册®商标。使用它们并不意味着与它们或任何相关子公司有任何关联或认可！此个人项目是在业余时间维护的，没有商业目标。** **Tagesschau 是 ARD-aktuell 的商标。** https://www.tagesschau.de/impressum

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.5.0 (2025-01-27)
* (ticaki) States added for browsing.
* (ticaki) Another attempt to constantly sort the videos in the same way.
* (ticaki) Control states reorganised.
* (ticaki) Placeholder images for no news now work

### 0.4.3 (2025-01-25)
* (ticaki) remove some helper code to do translations

### 0.4.2 (2025-01-25)
* (ticaki) make the code fit for latest

### 0.4.1 (2025-01-17)
* (ticaki) videos always in the same order.

### 0.4.0 (2025-01-07)
* (ticaki) Command data point for defining the first news to be displayed
* (ticaki) Reduce object updates
* (ticaki) Total number of news as a data point
* (ticaki) We not in hurry, write object updates slowly.
* (ticaki) Info log messages are a bit more fun. (error and warn messages are not funny at all)

### 0.3.2 (2025-01-05)
* (ticaki) added length to videos
* (ticaki) System load reduced at startup

### 0.3.1 (2025-01-05)
* (ticaki) Back to stable admin

### 0.3.0 (2025-01-05)
* (ticaki) States are only updated when changes are made.
* (ticaki) Last update Data point added with timestamp of the last successful data access
* (ticaki) Emptying of data points improved
* (ticaki) Placeholder images inserted for no news.
* (ticaki) User-defined keywords with `*`
* (ticaki) Requires admin version 7.4.9 or higher

### 0.2.3 (2025-01-05)
* (ticaki) Fixed: Adapter deletes own states

### 0.2.1 (2025-01-05)
* (ticaki) fixed refresh interval & add axios timeouts

### 0.2.0 (2025-01-05)
* (ticaki) remove tracking from videos
* (ticaki) beautiful state name

### 0.1.4 (2025-01-04)
* (ticaki) Fixed: More as 1 region bug

### 0.1.3 (2025-01-04)
* (ticaki) Reduced size of the icon

### 0.1.2 (2025-01-04)
* (ticaki) Added: Breaking news is excluded from filtering and copied to a separate folder. 
* (ticaki) Changed: Taglist is now sorted.

### 0.1.1 (2025-01-04)
* (ticaki) fixed: The empty configuration after the first installation leaves crashed adapters

### 0.1.0 (2025-01-04)
* (ticaki) initial release

## License
MIT License

Copyright (c) 2025 ticaki <github@renopoint.de>

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