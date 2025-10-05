---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hoymiles-ms/README.md
title: ioBroker.hoymiles-ms
hash: xIGHU50v07ytNPukywDhuEkgVqwXE+FtLcOfQ6vtMys=
---
![标识](../../../en/adapterref/iobroker.hoymiles-ms/admin/hoymiles-ms.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.hoymiles-ms.svg)
![下载](https://img.shields.io/npm/dm/iobroker.hoymiles-ms.svg)
![安装数量（最新）](http://iobroker.live/badges/hoymiles-ms-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/hoymiles-ms-stable.svg)
![执照](https://img.shields.io/github/license/mcm4iob/ioBroker.hoymiles-ms?style=flat)
![捐](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.hoymiles-ms
![测试和发布](https://github.com/mcm4iob/ioBroker.hoymiles-ms/workflows/Test%20and%20Release/badge.svg)

**************************************************************************************************************

## Sentry **此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-Plugin 文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。
**************************************************************************************************************

## Hoymiles-ms ioBroker 适配器
此适配器将**HOYMILES**微存储系统（目前仅支持 Hoymiles SM-A2）集成到 ioBroker。设备描述请参见[这里](https://www.hoymiles.com/de/products/micro-storage)。

请注意，此适配器与上述公司没有任何关系，并且不存在任何商业关系。

**************************************************************************************************************

## 免责声明
**所有产品和公司名称或徽标均为其各自所有者的商标™或注册商标®。使用它们并不意味着与它们或其任何关联子公司有任何关联或认可！此个人项目由业余时间维护，不用于任何商业目的。**

**************************************************************************************************************

## 文档
有关详细的设置说明、配置指南和综合参考文档：

- **[英文文档](doc/en/DOCUMENTATION_en.md)**
- **[德语文档](doc/de/DOCUMENTATION_de.md)**

＃＃ 配置
### 适配器的配置
该适配器可以配置为专用 mqtt 服务器或 mqtt 客户端（注意：客户端模式尚未实现）。

要作为 mqtt 服务器运行，必须配置以下参数：

-mqtt网络

指定要监听的网络。通常情况下，监听所有网络 (0.0.0.0) 就足够了。

-mqtt端口

指定要使用的 (tcp) 端口。由于标准 MQTT 端口 (1883) 可能已被 ioBroker.mqtt 适配器占用，并且 ioBroker.shelly 适配器默认使用端口 1882，因此本适配器默认使用端口 1881。但您可以使用任何空闲端口。

### Hoymiles MS-A2 的配置
要配置 Hoymiles MS-A2 设备，请打开 S-Miles Home App。选择配置页面（使用右上角的齿轮图标），然后向下滚动到“MQTT 服务”。启用 MQTT 服务并输入

- 服务器地址

ioBroker 系统的 IP 地址（使用 MQTT 服务器模式时）或您的 MQTT Broker 的地址

- 港口

为您的 mqtt 代理配置的端口号

- 可选择设置客户端前缀（默认为“MSA”）

此适配器目前尚不支持身份验证。因此必须禁用此功能。

＃＃ 手术
适配器启动后，会监听从 Hoymiles 设备接收的 MQTT 数据包。适配器不会以任何方式轮询 - 所有活动均由 Hoymiles 设备触发。请注意，配置数据仅在连接建立后发送一次，而实时数据每秒发送一次。系统统计信息通常每五分钟更新一次。请注意，这些间隔不可由适配器配置 - 它们由 Hoymiles-Api 定义。

**************************************************************************************************************

**如果您喜欢这个适配器，请考虑捐赠：**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mcm1957atIoBroker)

**************************************************************************************************************

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.0 (2025-08-23)
* (mcm1957) States are created dynamically now. So no states should be created if a system does not provide data for it (i.e slave micro storage).
* (mcm1957) State values are reset during startup now to prevent stale information.
* (mcm1957) Support to control power consumption and delivery has been added.
* (mcm1957) Dependencies have been updated

### 0.1.2 (2025-08-03)
* (mcm1957) Warnings raised from slave systems have been removed
* (mcm1957) Dependencies have been updated

### 0.1.1 (2025-07-27)
* (mcm1957) Handling of configuration has been corrected
* (mcm1957) Translations have been adapted

### 0.1.0 (2025-07-26)
* (mcm1957) initial release

## License
MIT License

Copyright (c) 2025 mcm1957 <mcm57@gmx.at>

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