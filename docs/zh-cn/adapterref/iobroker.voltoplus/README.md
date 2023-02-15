---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.voltoplus/README.md
title: ioBroker.voltoplus
hash: PYDcxFBeBjqRqJEeAZ8P1dt2hnfLKBEdGgrk4xGKTkk=
---
![标识](../../../en/adapterref/iobroker.voltoplus/admin/voltoplus.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.voltoplus.svg)
![下载](https://img.shields.io/npm/dm/iobroker.voltoplus.svg)
![安装数量](https://iobroker.live/badges/voltoplus-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/voltoplus-stable.svg)
![依赖状态](https://img.shields.io/david/Jey-Cee/iobroker.voltoplus.svg)
![NPM](https://nodei.co/npm/iobroker.voltoplus.png?downloads=true)

# IoBroker.voltoplus
**测试：** ![测试和发布](https://github.com/Jey-Cee/ioBroker.voltoplus/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 VoltoPlus 适配器
从 VoltoPlus 能量计获取实际数据。

##赞助商
如果您喜欢我的作品，请随时提供个人捐赠（这是 Jey Cee 的个人捐赠链接，与 ioBroker 项目无关！）[![捐赠](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=95YZN2LR59Q64&source=url)

＃＃ 用法
只需在适配器设置中输入 VoltoPlus 电能表的 IP 地址。
适配器将每秒读取一次数据。

##免责声明
Wallner Automation GmbH 或任何相关子公司、徽标或商标绝不认可或隶属于此模块的开发人员。

## 链接
[产品](https://www.voltoplus.com/shop/voltoplus/167/voltoplus?c=44)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.1 (2022-11-17)
* some fixes for relesase

### 0.1.0 (2022-10-18)
* Changed unit of energy_purchased & energy_supplied from W to kWh
* divide value of energy_purchased & energy_supplied by 10
* Update depenendencies

### 0.0.1
* (Jey Cee) initial release

## License
MIT License

Copyright (c) 2022 Jey Cee <jey-cee@live.com>

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