---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.kisshome-research/README.md
title: ioBroker KISSHome 研究
hash: IaoRXgWR3mdcumGVGnenL+3KWpO7G+xiW+N6GrOq0EM=
---
![标识](../../../en/adapterref/iobroker.kisshome-research/admin/kisshome-research.png)

![安装数量](http://iobroker.live/badges/kisshome-research-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.kisshome-research.svg)
![下载](https://img.shields.io/npm/dm/iobroker.kisshome-research.svg)

# IoBroker KISSHome 研究
![测试与发布](https://github.com/ioBroker/ioBroker.kisshome-research/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/kisshome-research/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

此特殊适配器是为 KISSHome 研究项目开发的。它不适用于一般用途。

要使用此适配器，您必须首先在[KISSHome 研究](https://kisshome-feldversuch.if-is.net)网站上注册并获取确认电子邮件。

要运行此适配器，您需要：

- 超过 3 个智能家居设备
- Fritz!Box 路由器。如果没有“Fritz!Box”，适配器将无法工作。
- iobroker 必须在 debian/raspbian 上运行（或者至少在 linux 上运行，其中有以下命令可用：“which”、“rsync”）

待办事项
检测来自以下来源的 IP 地址：

- [X] hm-rpc (Homematic CCU)，
- [X] loxone，
- [X] 雪莉，
- [X] mqtt
- [X] tr-064，
- [-] alexa-2 - 不可能，因为 alexa 读取不到 IP 地址
- [X] 索诺夫，
- [X] modbus，
- [X] 色调（飞利浦色调），
- [-] tuya - 不可能，它与云端通信
- [X] mqtt-客户端，
- [-] synology - 它是一个多功能设备 - 忽略它，
- [X] Sonos，
- [X] mihome-吸尘器，
- [ ] hmip（Homematic Cloud），
- [ ] 家庭连接，
- [ ] wled (ESP8266/ESP32)，
- [ ] 统一，
- [X] 和谐，
- [-] 三星（电视） - 数据太多，
- [-] onvif (网络摄像机) - 数据太多，
- [-] 摄像机（URL 或 IP 摄像机）- 数据太多，
- [-] proxmox - 不可能，因为 alexa 读取不到 IP 地址
- [ ] broadlink2，
- [-] lgtv - 数据太多，
- [ ] knx (KNX网关),
-[ ] lcn，
- [ ] homekit 控制器，
- [ ] UPNP，
- [X] openknx，
- [ ] 梅罗斯

<!-- 下一版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### 0.3.1 (2024-08-31)
* (bluefox) Added detection of some IPs

### 0.2.1 (2024-08-28)
* (bluefox) used valid URL address

### 0.1.1 (2024-08-20)
* (bluefox) Used MD5 for the file consistency check

### 0.1.0 (2024-08-19)
* (bluefox) File upload was implemented

### 0.0.3 (2024-08-14)
* (bluefox) Added the recording enabled option

### 0.0.2 (2024-07-22)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2024 Denis Haev <dogafox@gmail.com>

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