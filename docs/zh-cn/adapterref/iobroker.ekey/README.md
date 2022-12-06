---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ekey/README.md
title: ioBroker.ekey
hash: pDp+XCtVymOpb+vidaIK19cT62rgXY/lZSFEEMYiONw=
---
![标识](../../../en/adapterref/iobroker.ekey/admin/ekey.png)

![绿卫徽章](https://badges.greenkeeper.io/ioBroker/ioBroker.ekey.svg)
![安装数量](http://iobroker.live/badges/ekey-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.ekey.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ekey.svg)
![Travis-CI](http://img.shields.io/travis/ioBroker/ioBroker.ekey/master.svg)
![应用程序供应商](https://ci.appveyor.com/api/projects/status/github/ioBroker/ioBroker.ekey?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.ekey.png?downloads=true)

# IoBroker.ekey
[![依赖状态](https://gemnasium.com/badges/github.com/ioBroker/ioBroker.ekey.svg)](https://gemnasium.com/github.com/ioBroker/ioBroker.ekey) [![代码气候](https://codeclimate.com/github/ioBroker/ioBroker.ekey/badges/gpa.svg)](https://codeclimate.com/github/ioBroker/ioBroker.ekey)

此 ioBroker 适配器连接到 ekey 连接器 UDP。

按照以下描述实施：

- https://descargas.futurasmus-knxgroup.org/doc/en/ekey/13002/operating_instructions_ekey_converter_udp_rs485_id51.pdf
- NET 协议：https://www.ekey.net/wp-content/dokumente/Operating_instructions_ekey_net_4.4_en_web_ID181_3006.pdf（第 189 页）

![图片](../../../en/adapterref/iobroker.ekey/img/ekey.png)

＃＃ 串行端口
通过串行端口连接到 ekey 的实验功能。这还没有经过测试。

您可以激活串行端口以通过 USB RS485 或 RS 232 转换器接收数据。
实际上只支持手指散列。为了帮助从设备解码更多数据，请打开您收到的数据的问题。

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 1.2.3 (2022-11-22)
* (bluefox) Added `net` protocol support
* (bluefox) Added serial port support

### 1.1.0
* (bluefox) Added compact mode
* (bluefox) Own port is now configurable

### 1.0.0
* (bluefox) Configuration dialog under firefox was corrected

### 0.2.1
* (bluefox) tests were added

### 0.1.0
* (bluefox) initial release

## License

The MIT License (MIT)

Copyright (c) 2018-2022 ioBroker <dogafox@gmail.com>

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