---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.eusec/README.md
title: ioBroker.euSec
hash: xR1QPMrQ+Bv56YAF9MwrCN66MyG1x3f06l2sY8PyQP0=
---
![标识](../../../en/adapterref/iobroker.eusec/docs/_media/ioBroker.euSec.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.eusec.svg)
![下载](https://img.shields.io/npm/dm/iobroker.eusec.svg)
![总下载量](https://img.shields.io/npm/dt/iobroker.eusec.svg)
![Node 版本要求](https://img.shields.io/node/v/iobroker.eusec)
![安装数量（最新）](https://iobroker.live/badges/eusec-installed.svg)
![安装数量（稳定版）](https://iobroker.live/badges/eusec-stable.svg)
![依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.eusec)
![NPM](https://nodei.co/npm/iobroker.eusec.png?downloads=true)

# IoBroker.euSec
**测试：** ![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.eusec/workflows/Test%20and%20Release/badge.svg)

这是一个用于与 Eufy 设备通信的库。

**本项目与 Anker 和 Eufy（Eufy Security）没有任何关联。这是一个利用业余时间维护的个人项目。**

＃＃ 描述
该适配器允许通过连接到 Eufy 云服务器和本地/远程站点来控制 [Eufy 安全设备](https://us.eufylife.com/collections/security)。

您需要提供云端登录凭证。适配器会连接到您的云账户，并通过 HTTPS 协议轮询所有设备数据。现在也支持通过本地或远程 P2P 连接访问 Eufy 工作站/设备。但是，连接到 Eufy 云平台始终是前提条件。

一个适配器实例将显示来自一个 Eufy Cloud 帐户的所有设备，并允许控制它们。

## 文档
请查看文档[这里](https://iobroker-community-adapters.github.io/ioBroker.eusec/)。

## 已知可用设备
有关支持的设备的信息可在[这里](https://github.com/bropat/eufy-security-client#known-working-devices)中找到。

## 鸣谢
如果没有 Patrick Broetto (brobat) <https://github.com/bropat> 的出色工作，这个适配器是不可能实现的，他创建了该适配器的先前版本。

## 升级到 Node.js 22 时的重要信息
适配器 2.0.3 及更高版本支持 Node.js 22。之前的 Node.js 版本需要特殊的配置，而这些配置在 Node.js 22 中已失效。因此，当 Node.js 从低于 22.x.x 的任何版本升级到 Node.js 22 时，请按照以下步骤操作：

- 如果您安装的 node.js 版本低于 22 且 adapter 版本低于 2.0.0，请先更新 node.js，然后再安装 adapter 2.0.3。
如果您安装的适配器版本 >= 2.0.0，且节点版本优先级高于 22，则必须重新安装适配器。详细说明（德语）请访问我们的论坛 (https://forum.iobroker.net/topic/82651/test-adapter-eusec-v2-0-x)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.3 (2025-10-26)
- (mcm1957) Remove fix for CVE-2023-46809 for node.js 22 and newer

### 2.0.0 (2025-10-26)

- (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation
- (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated

### 1.3.3 (2024-09-28)

* (bropat) Updated version of the package eufy-security-client (3.1.1)
* (bropat) Further details can be found in the changelog of eufy-security-client (3.1.1)

### 1.3.2 (2024-09-10)

* (bropat) Fixed issue #440

### 1.3.1 (2024-09-08)

* (bropat) Fixed issue #436
* (bropat) Fixed issue #439

## License

MIT License

Copyright (c) 2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2024 bropat <patrick.broetto@gmail.com>

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