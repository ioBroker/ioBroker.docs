---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ikettle2/README.md
title: ioBroker.ikettle2
hash: cMO+RpaDdkvLmHNr84/MJCvLPK2UqsoTCBY2kHS/22s=
---
![标识](../../../en/adapterref/iobroker.ikettle2/admin/ikettle2.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.ikettle2.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ikettle2.svg)
![安装数量（最新）](https://iobroker.live/badges/ikettle2-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/ikettle2-stable.svg)
![依赖状态](https://img.shields.io/david/jey-cee/iobroker.ikettle2.svg)
![新平台](https://nodei.co/npm/iobroker.ikettle2.png?downloads=true)

# IoBroker.ikettle2
**测试：**![测试与发布](https://github.com/jey-cee/ioBroker.ikettle2/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 ikettle2 适配器
使用 ioBroker 控制您的 Smarter iKettle 2.0。

## 加入 Discord 服务器讨论有关 ioBroker 的一切！
<a href="https://discord.gg/HwUCwsH"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

如果您喜欢我的作品，请随时提供个人捐赠（这是 Jey Cee 的个人捐赠链接，与 ioBroker 项目无关！）[![捐赠]（https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=95YZN2LR59Q64&source=url)

---

＃＃ 手动的
### 对象描述 **on** - 打开水壶。必须先设置 set_temperature。
**on_formula** - 打开水壶，加热并在 warming_time 内保持 formula_temperature。
formula_temperature 和 warming_time 必须提前设置。

**校准**——开始基础校准。

**on_plate** - 指示水壶是否位于底板上。

**set_temperature**——加热水的目标温度。

**formula_temperature** - 将水加热到 set_temperature 后的目标温度。

**water_temperature**——水的实际温度。

**water_level** - 水壶中的实际水量。注意：准确度不是很好，可能完全错误，因此请用眼睛检查水壶中是否有水。

**warming_time** - 水壶在关闭前将水保持在配方温度的时间。
注意：0 = 未使用，最短时间为 5 分钟，最长时间为 30 分钟。

**get_preset** - 从水壶读取手动控制（无需 APP）的预设值。

**set_preset** - 设置水壶上的预设值，以便手动控制（无需 APP）。
预设文件夹中的 formula_temperature、temperature 和 warming_time 必须事先设置。

---

### 校准 从底座上取下水壶，然后将对象校准设置为真。
底座发出哔声后，您可以将水壶放回底座上并使用它。
---

## Changelog

### **WORK IN PROGRESS**
* (Jey Cee) Correct size of ip input on xl displays

### 1.0.2
* (Jey Cee) Add watchdog for connection to prevent adapter freeze
* (Jey Cee) Migrate config to JSON Config
* (Jey Cee) Update dependencies 
* (Jey Cee) Fix issues found by adapter checker

### 1.0.1
* (Jey Cee) fixes for Beta release

### 1.0.0
* (Jey Cee) initial release

## License
MIT License

Copyright (c) 2021-2025 Jey Cee <jey-cee@live.com>

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