---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ikettle2/README.md
title: ioBroker.ikettle2
hash: wEF/M5ePNGzhc8BjCcmBgAGYj+onZzFTGBl0QaEWKA4=
---
![标识](../../../en/adapterref/iobroker.ikettle2/admin/ikettle2.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.ikettle2.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ikettle2.svg)
![安装数量（最新）](https://iobroker.live/badges/ikettle2-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/ikettle2-stable.svg)
![依赖状态](https://img.shields.io/david/jey-cee/iobroker.ikettle2.svg)
![新产品管理](https://nodei.co/npm/iobroker.ikettle2.png?downloads=true)

# IoBroker.ikettle2
**测试：** ![测试和发布](https://github.com/jey-cee/ioBroker.ikettle2/workflows/Test%20and%20Release/badge.svg)

## IoBroker ikettle2 适配器
使用 ioBroker 控制您的 Smarter iKettle 2.0。

## 加入 Discord 服务器，讨论关于 ioBroker 的一切！
<a href="https://discord.gg/HwUCwsH"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

## [赞助商](./SPONSORS.md)
如果您喜欢我的作品，请随时提供个人捐赠（这是 Jey Cee 的个人捐赠链接，与 ioBroker 项目无关！）[![捐赠](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=95YZN2LR59Q64&source=url)

---

＃＃ 手动的
### 对象描述 **on** - 打开水壶。 set_temperature 必须先设置。
**on_formula** - 打开水壶，加热并保持公式_温度以供预热时间。
必须先设置公式_温度和加温时间。

**校准** - 开始基础校准。

**on_plate** - 指示水壶是否在底板上。

**set_temperature** - 加热水的目标温度。

**formula_temperature** - 将水加热到设定温度后的目标温度。

**water_temperature** - 水的实际温度。

**water_level** - 水壶中的实际水量。注意：准确度不是那么好，可能完全是错误的，所以请用眼睛检查水壶里是否有水。

**warming_time** - 水壶在关闭前将水保持在配方奶温度的时间。
注：0 = 未使用，最短时间为 5 分钟，最长为 30 分钟。

**get_preset** - 从水壶中读取手动控制（无 APP）的预设值。

**set_preset** - 在水壶上设置手动控制的预设值（无 APP）。
必须事先设置预设文件夹中的公式温度、温度和升温时间。

---

### Calibrate 从底座取出水壶，然后将对象校准为 true。
底座发出哔哔声后，您可以将水壶放回底座并使用。
---

## Changelog

* (Jey Cee) fixes for Beta release

### 1.0.0
* (Jey Cee) initial release

## License
MIT License

Copyright (c) 2021 Jey Cee <jey-cee@live.com>

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