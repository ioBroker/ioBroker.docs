---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bsblan/README.md
title: ioBroker.bsblan
hash: haHr0tg9u5OtGuZeXjL1ia46eC98hfCm7eWcwUdhShU=
---
![标识](../../../en/adapterref/iobroker.bsblan/admin/bsblan.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.bsblan.svg)
![下载](https://img.shields.io/npm/dm/iobroker.bsblan.svg)
![安装数量](https://iobroker.live/badges/bsblan-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/bsblan-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.bsblan.png?downloads=true)
![已知漏洞](https://snyk.io/test/github/hacki11/ioBroker.bsblan/badge.svg)

# IoBroker.bsblan
## 用于 ioBroker 的 bsb_lan 适配器
此适配器将[BSB_LAN接口](https://github.com/fredlcore/bsb_lan)连接到ioBroker。
BSB_LAN接口将BSB（锅炉系统总线）连接到LAN。此适配器将其连接到ioBroker。

[BSB_LAN 接口用户手册](https://docs.bsb-lan.de)

## 支持的设备
- BSB/LPB 兼容设备（例如 Brötje、Elco、MHG、Fujitsu）
- 详情请参阅：[支持的设备](https://docs.bsb-lan.de/supported_heating_systems.html)

＃＃ 用法
- BSB_LAN 接口已启动并正在运行
- 安装适配器
- 配置
- 知识产权
- 用户和密码（如果激活了基本身份验证）
- 轮询间隔（秒）（最小 10 秒）
- 应轮询或更改的 ID（以逗号或换行符分隔，有关可用 ID，请参阅 BSB_LAN 的 Web 界面）

## 写入值
- 激活所有或特定 ID 为可写入
* en: [只读或读/写访问权限](https://1coderookie.github.io/BSB-LPB-LAN_EN/chap05.html)
  * de: [Zugriff des Adapters auf den Regler](https://1coderookie.github.io/BSB-LPB-LAN/kap05.html)
* 对于所有：`bsb_lan_config.h: #define DEFAULT_FLAG 0`
* 编译并上传
- 添加应写入适配器实例配置的 ID（参见用法）
- 数字、枚举和 hr:min 类型现在可写（当然只有可写的 ID 才可以写）

## 致谢
- 图标由 [Freepik](https://www.freepik.com/home) 制作，来源：www.flaticon.com

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* Maintenance release
* Setup Eslint 9, Prettier and Dev Container
* Migrate to newest adapter-creator version

### 0.3.4
* Fix order of individual destinations (They need to be queried sorted by destination, starting with default destination)

### 0.3.3
* Support for individual destinations e.g. `710!7`
### 0.3.2
* Support dot-separated parameter ids like `20200.0`, `20200.1`. `.0` is omitted from object view as it is also omitted in the bsb_lan response.

### 0.3.1
* Code Quality Improvements

### 0.3.0
* Add support for BSB_LAN 2.x
* BREAKING: Names of 24h Average values changed (e.g. Außentemperatur_(8700) => 24h Durchschnittswert. Außentemperatur_(20050))

### 0.2.2
* Replace invalid characters: https://github.com/ioBroker/ioBroker.js-controller/issues/198

### 0.2.1
* Fix write issue with new bsb_lan2 firmware

### 0.2.0
* Add 24h averages (needs BSB_LAN FW 1.1)

### 0.1.2
* Support INF interface for setting external room temperatures

### 0.1.1
* Support unit micro
* Made robust against invalid or non existing IDs

### 0.1.0
* Support write access

### 0.0.3
* dynamically create states
* IDs without whitespaces
* add textarea for configuration

### 0.0.1
* (hacki11) initial release

## License
MIT License

Copyright (c) 2025 hacki11

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