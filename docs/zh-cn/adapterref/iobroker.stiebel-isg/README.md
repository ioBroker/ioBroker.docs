---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.stiebel-isg/README.md
title: ioBroker.stiebel-isg
hash: 67o+aJjEudGiExjykFREHIFa7shtE8bz1qyIpNHHQq8=
---
![标识](../../../en/adapterref/iobroker.stiebel-isg/admin/stiebel-isg.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.stiebel-isg.svg)
![版本（稳定版）](https://iobroker.live/badges/stiebel-isg-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.stiebel-isg.svg)
![安装数量（最新）](https://iobroker.live/badges/stiebel-isg-installed.svg)
![NPM](https://nodei.co/npm/iobroker.stiebel-isg.svg?data=d,s)

# IoBroker.stiebel-isg
**测试：** ![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.stiebel-isg/workflows/Test%20and%20Release/badge.svg)

## 适用于 STIEBEL ELTRON/Tecalor 互联网服务网关 (ISG) 的 ioBroker 适配器
该适配器读取 STIEBEL ELTRON/Tecalor 互联网服务网关 (ISG) 网页中的值，并可发送命令来控制设备。

**注意：**此适配器仅使用旧款 ISG 设备（ISG Plus 和 ISG Web）进行过测试。是否兼容新款 ISG Connect 设备尚待确定。

**注意：**此适配器已移交至 iobroker-community-adapters 进行维护。未来只会发布重要的错误修复和依赖项更新。不过，我们始终欢迎提交包含错误修复或功能增强的 PR。

**鸣谢：**如果没有 Michael Schuster (unltdnetworx) <https://github.com/unltdnetworx> 的出色工作，这个适配器是不可能实现的，他创建了该适配器的先前版本。

## 发行说明
**注意：** 2.0.x 版本包含一些重大变更：

* 需要 node.js 版本 >= 20、js-controller 版本 >= 6.0.11 和 admin 版本 >= 7.6.17。

如果要使用此适配器，请将您的 ioBroker 升级到至少此软件版本。

* 配置界面中的密码和用户名加密

如果您是从旧版本更新此适配器，而不是全新安装，即使您的配置中的密码和用户名正确且未更改，适配器也可能无法启动。要解决此问题，只需在配置界面中再次输入相同的旧密码和用户名，然后保存并关闭配置界面以重启适配器。当然，此操作仅在更新后的首次启动后需要执行一次。

* 对象选项卡中某些对象的类型和/或名称已更改

如果您是从旧版本更新此适配器，而不是全新安装，则可能会在 ioBroker 日志中发现警告，或者对象值和/或名称未正确更新。为避免这种情况，最简单的解决方法是在 ioBroker 的“实例”选项卡中停止适配器，在“对象”选项卡中彻底删除对象树，然后重新启动适配器。但是，此操作仅在更新后需要执行一次，如果您执行的是全新安装，则无需执行此操作。

**注意：**删除对象树将清除所有用户定义的设置，例如指向其他适配器的链接（如历史记录或统计信息）。您需要手动重新创建这些设置，因此请务必记住设置的详细信息。

＃＃ 安装
1. 您需要一个配置完整且正在运行的 STIEBEL ELTRON 或 Tecalor Internet Service Gateway（ISG Web 或 ISG Plus），并且该网关与您的 ioBroker 服务器位于同一网络中。
2. 在 ioBroker 服务器上安装适配器并创建一个实例

＃＃ 配置
1. 通过输入 ISG 的 IP 地址或域名来配置实例，如果 ISG 中已配置，则还需要输入用户名和密码。
2. 其他设置和 ISG 的 URL 选项卡上的网页列表可以保留其默认值。
3. 如果您从 ISG Web GUI 的 URL 选项卡中移除任何不存在或您不感兴趣的路径，则可以提高性能并降低 ISG 的负载。您可以通过打开 ISG SERVICEWELT 网页并逐个打开各个导航选项卡来轻松识别这些 URL。相应页面的 URL 将显示在您的浏览器中，例如 <http://您的 ISG IP 地址/?s=1,0> 是指向 INFO/ANLAGE 的路径。

法律声明
STIEBEL ELTRON、TECALOR、ISG 及相关标识均为 STIEBEL ELTRON GmbH & Co KG 的商标或注册商标。

所有其他商标均为其各自所有者的财产。

作者与 STIEBEL ELTRON GmbH & Co KG 及其任何关联子公司、标志或商标均无任何关联或认可关系。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.2 (2025-11-23)

* (pdbjjens) **Fixed**: Adapter hangup on wrong credentials. (fixes #127)

### 2.0.1 (2025-11-12)

* (pdbjjens) **Fixed**: ioBroker warnings are avoided by clamping any values exceeding min/max to the min value before setting. (fixes #53 & #65)

### 2.0.0 (2025-10-27)

* (mcm1957) Change: Adapter has been migrated to iobroker-community-adapters organisation
* (mcm1957) Change: Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
* (mcm1957) Fix: Dependencies have been updated
* (pdbjjens) Change: remove .npmignore
* (pdbjjens) Change: migrate adapter configuration to jsonConfig
* (pdbjjens) Change: migrate from deprecated "request" http client to native fetch API
* (pdbjjens) Fix: min/max handling

### 1.7.7

* security- and compatibility update

### 1.7.6

* fix error with controller v5

## License

MIT License

Copyright (c) 2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2023 Michael Schuster <development@unltd-networx.de>

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