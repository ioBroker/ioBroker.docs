---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.intex/README.md
title: ioBroker.intex
hash: NwQnuxNpFXZ5n4vtiRTbKM9JfyAWEb1zWbSw14lLVDU=
---
![标识](../../../en/adapterref/iobroker.intex/admin/intex.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.intex.svg)
![下载](https://img.shields.io/npm/dm/iobroker.intex.svg)
![安装数量](https://iobroker.live/badges/intex-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/intex-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.intex.png?downloads=true)

# IoBroker.intex
**测试：** ![测试与发布](https://github.com/TA2k/ioBroker.intex/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 intex 适配器
带 wifi 模块的 Intex Whirlpool 适配器

## 与矿池和云端通信的策略
### 关于云
#### 云辅助；本地池（如果可用）
在此模式下，系统尝试在本地发出控制命令和更新命令。如果本地通信出现错误，系统将切换到云操作，直到适配器再次启动。

IP地址和端口来自云端。如果IP地址相同，则必须在应用程序中重新注册池。长按连接按钮并搜索池。通常不需要从应用程序中删除它。

#### 云辅助；仅本地池
该模式下，系统在本地发出控制命令和更新命令。如果本地通信出现错误，系统不会切换到云端运行。

这里可以将间隔设置为0.5分钟。

IP地址和端口来自云端。如果IP地址相同，则必须在应用程序中重新注册池。长按连接按钮并搜索池。通常不需要从应用程序中删除它。

#### 仅云
该模式下，系统仅通过云端发送控制命令和更新命令。

＃＃＃＃＃ 登录
输入 Intex 应用程序邮件和密码。

＃＃＃ 当地的
#### 仅限本地
在本地操作中，目前还提供池不支持的功能。必须在地址下指定路由器上池的 DNS 名称或池的 IP 地址。

这里也可以将间隔设置为0.5分钟。

可以使用搜索按钮搜索池的 IP 地址。但是，如果例如，路由器可以防止这种情况发生。 B. 不允许 WLAN 设备相互通信，或者计算机的本地防火墙阻止端口或板载投射。

## 控制水疗中心的功能
“intex.0.-id-.control.-command-”设置为 true 或 false 控制池命令的状态。

## 德语讨论和提问
https://forum.iobroker.net/topic/47932/test-intext-app-v0-0-x

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (PLCHome) Configure this adapter to use the release script.

### 0.1.5

* (PLCHome) spelling mistake sanitzer to sanitizer on status control.sanitizer and control.sanitizerTime corrected.

### 0.1.4

* (PLCHome) Changing read-only objects, e.g. temperature, no longer causes a crash.

### 0.1.3

* (PLCHome) The remaining time for the filter is corrected to the disinfection time if it is longer

### 0.1.2

* (PLCHome) Fixed filter remaining time on heating from 1 to -1 for infinity

### 0.1.1

* (PLCHome) Remaining time for filter and sanitizer added under control.
* (PLCHome) Refresh added under Control.
* (PLCHome) Remote deleted because Control can do it better.

### 0.1.0

* (rbartl/PLCHome) Support local IP. Both via cloud and only locally without cloud. Thanks to Austria to Robert Bartl.
* (PLCHome) Confirm directly after switching via Control.

### 0.0.7

* (PLCHome) Switching via remote works again.
* (PLCHome) After switching via Control, the previous traffic status can be transmitted from the cloud. This can lead to a toggling of the status.

### 0.0.6

* (PLCHome) Defined setting of states
* (PLCHome) Change Fahrenheit Celsius
* (PLCHome) "control.temperature", read only, object from 0.0.5 must be deleted once.

### 0.0.5

* (PLCHome) Set temperature added, object must be deleted once.
* (PLCHome) Decoding of status information

### 0.0.1

* (TA2k) initial release

## License

MIT License

Copyright (c) 2021 - 2024 TA2k <tombox2020@gmail.com>

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