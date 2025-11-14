---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.cmicoe/README.md
title: ioBroker.cmicoe
hash: GgOdBJHikNsOHVmqZN1dQ/hCzXa6H+gkuRZOxCyJ3T8=
---
![标识](../../../en/adapterref/iobroker.cmicoe/admin/cmicoe.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.cmicoe.svg)
![下载](https://img.shields.io/npm/dm/iobroker.cmicoe.svg)
![安装数量](https://iobroker.live/badges/cmicoe-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/cmicoe-stable.svg)
![NPM](https://nodei.co/npm/iobroker.cmicoe.png?downloads=true)

# IoBroker.cmicoe
**测试：** ![测试与发布](https://github.com/FreDeko06/ioBroker.cmicoe/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 cmicoe 适配器
用于与 [通过 CoE 的技术替代方案 CMI](https://www.ta.co.at/x2-bedienung-schnittstellen/cmi) 通信的适配器

### 免责声明
本应用程序为独立产品，与 Technische Alternative 无任何关联，亦未获得其认可或赞助。所有商标、标识和品牌名称均为其各自所有者的财产。

本应用程序旨在与 C.M.I. 配合使用，但并非 Technische Alternative 的官方产品。我们无法保证与所有版本的设备兼容。

## 设置 CMI
### 启用 CoE V2
在 C.M.I. 网络界面上，转到“设置”>“CAN”，然后选择 `CoE V2 (4byte)` 作为 CoE 版本。

### 配置输出
在 CMI 网络界面中，转到“设置”>“输出”>“CoE”，然后添加模拟或数字输出，并进行以下设置：

#### IP
输入 iobroker 服务器 IP 地址

#### 节点编号/网络输出
输入与适配器输入设置中指定的数字相同的数字。

## 设置适配器
＃＃＃ 设置
#### 本地 IP
IP 地址 iobroker 监听 C.M.I. 的 CoE-Packages。

#### 本地端口
iobroker 端口监听 CMI 发送的 CoE 包。

默认情况下，CMI 通过 5442 端口发送所有 CoEv2 包。**此适配器仅支持 CoE V2！**

#### CMI IP 地址
IP地址，iobroker向其发送CoE包

#### CMI端口
端口 iobroker 将 CoE 包发送到

#### 发送间隔
所有输出发送到 C.M.I 的时间间隔（以秒为单位）。

#### 发送更改
如果选中此项，适配器在发生变化时也会发送输出。

## Changelog
### 1.2.3 (2025-10-25)
* migrate to npm trusted publishing

### 1.2.2 (2025-10-18)
* added export/import to config tables

### 1.2.1 (2025-10-12)
* Bump @types/node to 24.7.2
* Bump @alcalzone/release-script-plugin-license to 4.0.0
* Bump rimraf to 6.0.1
* updated other dependencies
* fixed forbidden chars in ids

### 1.2.0 (2025-10-11)
* used iobroker prettier config
* changed title
* improved state roles and attributes
* limited send interval to 1 day
* fixed deletion of empty node channels
* removed old node string config

### 1.1.3 (2025-09-23)
* used @iobroker/eslint
* changed .vscode schema
* updated adapter-core dependency

### 1.1.2 (2025-09-23)
* fixed delete unused states

### 1.1.1 (2025-09-23)
* added logo
* upgrade to node 20
* updated dependencies

### 1.1.0 (2025-08-18)
* added units from https://fci.ta.co.at/docu/developer
* removed factors, decimals are computed automatically from the unit
* fixed problems with negative numbers

### 1.0.5 (2025-08-14)
* fixed layout

### 1.0.4 (2025-08-14)
* update dependencies

### 1.0.3 (2025-08-14)
* added factors to inputs/outputs settings
* update README

### 1.0.2 (2025-08-13)
* fixed degree, cubic meter symbol

### 1.0.1 (2025-08-13)
* fixed adapter crash on first start

### 1.0.0 (2025-08-13)
* improved config ui
* added support for units
* added support for names and descriptions for inputs/outputs
* BREAKING: state names now contain names from config

### 0.3.1 (2025-02-18)
* fix: negative values crashed adapter

### 0.3.0 (2025-02-17)
* added support for multiple messages in one packet (receiving and sending)
* added error handling

### 0.2.0 (2025-02-17)
* created bind and port options

### 0.1.2 (2025-02-17)
* downgrade to node 18
* create channel/devices before states
* performance improvements

### 0.1.1 (2025-02-16)
* improved log messages
* added log message if address/ip are already in use (probably two instances started)

### 0.1.0 (2025-02-16)
* (FreDeko) initial release

## License
MIT License

Copyright (c) 2025 FreDeko <freddegenkolb@gmail.com>

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