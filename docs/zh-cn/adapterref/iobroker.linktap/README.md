---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.linktap/README.md
title: ioBroker.LinkTap
hash: d5RG11d0uKQhcdN1RHFPIwYM2B1bG4bzhh5Za/u9oqQ=
---
![标识](../../../en/adapterref/iobroker.linktap/admin/Logo_small.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.linktap.svg)
![下载](https://img.shields.io/npm/dm/iobroker.linktap.svg)
![依赖状态](https://img.shields.io/david/Smart-Gang/iobroker.linktap.svg)
![测试](https://img.shields.io/travis/Smart-Gang/ioBroker.linktap.svg)
![应用程序](https://ci.appveyor.com/api/projects/status/github/Smart-Gang/iobroker-linktap?branch=master&svg=true)
![新产品管理](https://nodei.co/npm/iobroker.linktap.png?downloads=true)

# IoBroker.LinkTap
## IoBroker.linktap
使用 LinkTap 无线水定时器制造商控制您的花园灌溉：https://www.link-tap.com/

＃＃ 安装
是在 Node.js 12 下开发的，所以建议至少使用这个版本。

##设置
使用您的 LinkTap 凭据在 https://www.link-tap.com/#!/api-for-developers 创建 Api 密钥。

请在配置中输入用户名和 API 密钥。
适配器启动后，将检索所有连接的网关和 Taplinker。制造商允许每 5 分钟轮询一次所有网关和设备。适配器每小时或每次重新启动适配器时都会自动执行检索。

浇水状态检索可以根据分钟在配置中单独设置。 LinkTap 的网络服务可能需要长达一分钟的时间来提供更新的浇水信息。

API提供的所有灌溉功能都已实现。

重要提示：使用前必须在应用程序中设置所需的时间表。然后可以通过适配器启用/禁用这些。为此，必须另外设置角色“Argument in”的相应状态。

## Changelog

### 0.2.1
* (Smart-Gang) Updated CI testing & dependencies.

### 0.2.0
* (Smart-Gang) Changed types of state 'signal' to number and of button 'StartEcoInstantMode' to boolean.

### 0.1.9
* (Smart-Gang) Community suggestion: The trigger data points (buttons) now have the status set to false by default.

### 0.1.8
* (Smart-Gang) Retrieve historical data (API update from manufacturer) and optimize data point settings.

### 0.1.7
* (Smart-Gang) First public release

## License
MIT License

Copyright (c) 2021 Author <gangrulez@gmail.com>

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