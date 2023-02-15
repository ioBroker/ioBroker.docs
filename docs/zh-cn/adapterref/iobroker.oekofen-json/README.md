---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.oekofen-json/README.md
title: ioBroker.oekofen-json
hash: DhMxRMvL6WhO/HOntnwCO2LI4UaMihgYKmRnjeQjpFE=
---
![标识](../../../en/adapterref/iobroker.oekofen-json/admin/oekofen-json.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.oekofen-json.svg)
![下载](https://img.shields.io/npm/dm/iobroker.oekofen-json.svg)
![安装数量](https://iobroker.live/badges/oekofen-json-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/oekofen-json-stable.svg)
![依赖状态](https://img.shields.io/david/chaozmc/iobroker.oekofen-json.svg)
![NPM](https://nodei.co/npm/iobroker.oekofen-json.png?downloads=true)

# IoBroker.oekofen-json
**测试：** ![测试和发布](https://github.com/chaozmc/ioBroker.oekofen-json/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 oekofen-json 适配器
＃＃＃ 描述
该适配器将带有新触摸界面（也称为 [Pelletronic 触控](https://www.oekofen.com/en-gb/pelletronic-touch/)）的 OekoFEN 加热器连接到 ioBroker。由于 OekoFEN 逐步实现了 JSON 接口并且没有公开可用的文档，它应该至少适用于版本 3.10d 和更新版本。
由于存在许多加热器、太阳能模块、层存储、斯特林引擎等的组合，此适配器尝试从接口读取所有可用数据点并在启动时动态创建对象。

只读数据点是这样创建的，例如在它们的名称中以 L_ 开头。还根据接口提供的信息（因子属性）转换适配器的数字缩放比例。例如，加热器以 XXX 格式和系数 0.1 处理温度，这将由适配器在读取操作时转换为 XX.X，在写入操作时转换回 XXX。

＃＃＃ 安装
安装后，只需输入

* 知识产权，
* TCP端口，
*“所谓的”密码
* 和间隔

适配器尝试拉取更新的位置。

适配器保持连接状态，即使没有真正的永久连接。如果设备发送错误或适配器无法联系 OekoFEN 控制器，它会将连接状态设置为假。例如，如果控制器上有太多请求，则可能会发生这种情况，然后控制器会使用 HTTP 401 进行响应。在正常情况下，不应达到控制器的速率限制（两次请求之间为 2.5 秒）。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS** 
-->

### 1.0.1 (2023-01-21)
* (chaozmc) Fixed extensive object creation when using a wrong password (fixes Issue #18)
* (chaozmc) Added counter to stop adapter after 10 unsuccessful requests
* (chaozmc) Added check if there would be more than 50 top-level-objects to be created

### 1.0.0 (2023-01-15)
* (chaozmc) Push version to v1.0.0 as the code seems to be considerable as first stable release

### 0.3.0 (2023-01-15)
* (chaozmc) Changed Adapter Type to more suitable climate-control instead of communication
* (chaozmc) Altered query URL for inital scan to use single ?-symbol instead of double

### 0.2.5 (2022-11-18) 
* (chaozmc) Removed unnecessary const

### 0.2.4 (2022-10-31) 
* (chaozmc) changed loop behaviour to use a for...of loop instead of forEach to avoid parallel creation of too many objects at startup

### **0.0.3**
* (chaozmc) code cleanup, trigger for update & rescan

### **0.0.2**
* (chaozmc) first working release, fixed 0-value updates

### **0.0.1**
* (chaozmc) initial build phase, much try and error

## License
MIT License

Copyright (c) 2022 chaozmc <chaozmc@is-jo.org>

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