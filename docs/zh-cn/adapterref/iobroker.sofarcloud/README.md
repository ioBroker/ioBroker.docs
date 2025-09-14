---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sofarcloud/README.md
title: ioBroker.sofarcloud
hash: ZKTq1/UeWpXsKGCR3KHvUulIzidwavQsrkLZMDbicBw=
---
![标识](../../../en/adapterref/iobroker.sofarcloud/admin/sofarcloud.jpg)

![NPM 版本](https://img.shields.io/npm/v/iobroker.sofarcloud.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sofarcloud.svg)
![安装数量](https://iobroker.live/badges/sofarcloud-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/sofarcloud-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.sofarcloud.png?downloads=true)

# IoBroker.sofarcloud
**测试：**![测试和发布](https://github.com/ltspicer/ioBroker.sofarcloud/workflows/Test%20and%20Release/badge.svg)

## Sofarcloud ioBroker 适配器
该适配器从SofarCloud服务器读取数据并将其存储在数据点sofarcloud中。

SofarCloud 服务器存储来自 Sofar 逆变器的数据。

首先，安装应用程序（https://de.sofarsolar.com/cloud.html）并注册您的Sofar逆变器。

然后，您必须在适配器中输入您的登录详细信息（电子邮件和密码）。

如果需要，可以通过 MQTT 将数据发送到另一个系统。

接收到的数据也可以保存为 JSON（sofar_realtime.json）。

## Changelog
### 3.0.1 (2025-08-29)

- Normalize values before write

### 3.0.0 (2025-08-29)

- Check whether configuration has changed
- Cleaner termination
- Passwords encrypted
- Stop after 3 failed logins

### 2.0.0 (2025-08-27)

- Type & Role set more precisely

### 1.0.2 (2025-08-18)

- Delay 0-57s added

### 1.0.1 (2025-08-15)

- Div dependencies

### 1.0.0 (2025-08-15)
- Initial release

## License
MIT License

Copyright (c) 2025 Daniel Luginbühl <dlu0@sunrise.ch>

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