---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.unifi/README.md
title: ioBroker.unifi
hash: eGEZTGV31ZdJeK46sDXmDuTgZnm5pFhilnFcOXs19GE=
---
![商标](../../../en/adapterref/iobroker.unifi/admin/unifi.png)

![建立状态](https://travis-ci.org/iobroker-community-adapters/ioBroker.unifi.svg?branch=master)
![安装数量](http://iobroker.live/badges/unifi-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.unifi.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.unifi.svg)
![Github问题](http://githubbadges.herokuapp.com/iobroker-community-adapters/ioBroker.unifi/issues.svg)
![捐](https://img.shields.io/badge/Donate-PayPal-green.svg)
![NPM](https://nodei.co/npm/iobroker.unifi.png?downloads=true)

＃ioBroker.unifi
[![代码气候]（https://codeclimate.com/github/iobroker-community-adapters/ioBroker.unifi/badges/gpa.svg）](https://codeclimate.com/github/iobroker-community-adapters/ioBroker.unifi)[![bitHound分数]（https://www.bithound.io/github/iobroker-community-adapters/ioBroker.unifi/badges/score.svg）](https://www.bithound.io/github/iobroker-community-adapters/ioBroker.unifi)

此ioBroker适配器允许使用公共UniFi控制器Web-API控制和监视[UniFi设备](http://www.ubnt.com/)，例如UniFi WiFi接入点。

##参考
该适配器使用以下第三方nodejs模块的功能：

* [node-unifi]（https://github.com/jens-maus/node-unifi）

## Changelog

### 0.3.1
  (jens-maus) added support for multi-site environments.

### 0.3.0
  (jens-maus) added access device data query and moved the client devices to the 'clients' subtree instead

### 0.2.1
  (jens-maus) minor fixes

### 0.2.0
  (jens-maus) moved `lib/unifi.js` to dedicated node-unifi nodejs class and added it as a dependency.

### 0.1.0
  (jens-maus) implemented a first basically working version which can retrieve status information from a UniFi controller.

### 0.0.1
  (jens-maus) initial checkin of non-working development version

## License
The MIT License (MIT)

Copyright (c) 2016-2020 Jens Maus &lt;mail@jens-maus.de&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.