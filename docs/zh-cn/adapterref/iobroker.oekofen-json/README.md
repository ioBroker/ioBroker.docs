---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.oekofen-json/README.md
title: ioBroker.oekofen-json
hash: qdFWDJPQY42LrI0UN4dsoIp5T/bhUlZo0IZyJ2RAL+8=
---
![标识](../../../en/adapterref/iobroker.oekofen-json/admin/oekofen-json.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.oekofen-json.svg)
![下载](https://img.shields.io/npm/dm/iobroker.oekofen-json.svg)
![安装数量](https://iobroker.live/badges/oekofen-json-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/oekofen-json-stable.svg)
![依赖状态](https://img.shields.io/david/chaozmc/iobroker.oekofen-json.svg)
![新公共管理](https://nodei.co/npm/iobroker.oekofen-json.png?downloads=true)

# IoBroker.oekofen-json
**测试：**![测试和发布](https://github.com/chaozmc/ioBroker.oekofen-json/workflows/Test%20and%20Release/badge.svg)

## Oekofen-json ioBroker 适配器
＃＃＃ 描述
此适配器将带有全新触摸接口（也称为[Pelletronic Touch](https://www.oekofen.com/en-gb/pelletronic-touch/)）的 OekoFEN 加热器连接到 ioBroker。由于 OekoFEN 逐步实现了 JSON 接口，且目前尚无公开文档，因此它至少应该适用于 3.10d 及更高版本。
由于市面上存在多种加热器、太阳能组件、层式储能器、斯特林发动机等的组合，此适配器会尝试从接口读取所有可用数据点，并在启动时动态创建对象。

只读数据点的创建方式如下，例如名称中以 L_ 为前缀的数据点。此外，适配器还会根据接口提供的信息（因子属性）转换数字的缩放比例。例如，加热器处理的温度格式为 XXX，因子为 0.1，适配器会在读取操作时将其转换为 XX.X，并在写入操作时将其转换回 XXX。

＃＃＃ 安装
安装后，只需输入

* IP，
* TCP 端口，
*“所谓的”密码
* 和间隔

适配器尝试提取更新。

即使没有真正的永久连接，适配器也会保持连接状态。如果设备发送错误或适配器无法连接到 OekoFEN 控制器，则会将连接状态设置为 false。例如，如果控制器上的请求过多，控制器会以 HTTP 401 响应，就可能发生这种情况。正常情况下，控制器的速率限制不应达到（请求间隔 2.5 秒）。

## 致谢
如果没有 Markus Feiler (chaozmc) <https://github.com/chaozmc> 的出色工作，这个适配器是不可能实现的，他创建了该适配器的先前版本。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.0-alpha.9 (2025-10-13)
* (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation
* (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
* (mcm1957) Dependencies have been updated

### 1.0.5 (2023-09-23)
* (chaozmc) set min node version to 18.x (merge pull request #23)

### 1.0.4 (2023-09-22)
* (chaozmc) Removed Node 16.x from Test-and-release (fix Issue #19)
* (chaozmc) updated dependencies
* (chaozmc) updated protobufjs and google-gax
* (chaozmc) updated word-wrap

### 1.0.3 (2023-05-09)
* (chaozmc) Bump version

### 1.0.2 (2023-05-09)
* (chaozmc) Added missing translations
* (chaozmc) Updated Copyright Year
* (chaozmc) Added .releaseconfig.json for release-script
* (chaozmc) changed github workflow config

### **0.0.3**
* (chaozmc) code cleanup, trigger for update & rescan

### **0.0.2**
* (chaozmc) first working release, fixed 0-value updates

### **0.0.1**
* (chaozmc) initial build phase, much try and error

## License
MIT License

Copyright (c) 2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 chaozmc <chaozmc@is-jo.org>

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