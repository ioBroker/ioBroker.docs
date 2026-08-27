---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-inventwo/README.md
title: ioBroker.vis-inventwo
hash: sotg5sV7N0Gwx0N7PPj8XiJ85MpkHvjkBkpJxsCrFk4=
---
![标识](../../../en/adapterref/iobroker.vis-inventwo/admin/inventwo.png)

![安装数量（最新）](http://iobroker.live/badges/vis-inventwo-installed.svg)
![安装数量（稳定版）](http://iobroker.live/badges/vis-inventwo-stable.svg)
![NPM 版本](https://nodei.co/npm/iobroker.vis-inventwo.svg?style=shields&data=v,u,d&color=orange)
![下载](https://img.shields.io/npm/dm/iobroker.vis-inventwo.svg)
![构建状态](https://ci.appveyor.com/api/projects/status/2hvs4fvfms7xhmnw?svg=true)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![PayPal捐赠](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-green.svg)

# IoBroker.vis-inventwo
## IoBroker.vis 适配器的组件
开关、滑块、表格、控件、复选框、单选按钮等等……<br>借助我们的组件集，您可以自由轻松地为您的智能家居创建个性化的可视化效果。

### <span style="color:red">Vis 2 的重要提示</span>
此适配器是为 VIS 1 开发和测试的。在 VIS 2 中可能会出现错误，导致您的可视化功能无法使用。

无法实现无缝兼容。您可以在此处找到适用于 VIS 2 的新适配器：https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo

**从 4.1.x 版本开始，这些控件已明确从 Vis 2 编辑器中排除，适配器将完全无法在 Vis 2 中工作。** 如果您想继续在 Vis 2 中使用此适配器，则必须使用 4.1.x 之前的版本。

## 适配器内容
用于切换、导航等的各种小部件。

![预览通用和多组件小部件](../../../en/adapterref/iobroker.vis-inventwo/img/preview_universal_widget.png)

模拟时钟 [更多信息](https://github.com/inventwo/ioBroker.vis-inventwo/wiki/Universal-%26-Multi-Widget-Inhaltstypen)

![模拟时钟预览](../../../en/adapterref/iobroker.vis-inventwo/img/preview_clocks.png)

数字时钟 [更多信息](https://github.com/inventwo/ioBroker.vis-inventwo/wiki/Universal-%26-Multi-Widget-Inhaltstypen)

![数字时钟预览](../../../en/adapterref/iobroker.vis-inventwo/img/preview_clock_digital.png)

颜色选择器 [更多信息](https://github.com/inventwo/ioBroker.vis-inventwo/wiki/Colorpicker)

![预览颜色选择器](../../../en/adapterref/iobroker.vis-inventwo/img/Preview_Colorpicker.png)

有关更多信息，请查看 [维基百科](https://github.com/inventwo/ioBroker.vis-inventwo/wiki)。

###### 2.0.0 版本及之后的所有小部件
<table><tr><td><center><b>普遍的<br></b><br><img src="widgets/vis-inventwo/img/Universal.gif"></td><td><center><b>多<br></b><br><img src="widgets/vis-inventwo/img/Multi.gif"></td><td><center><b>图像<br></b><br><img src="widgets/vis-inventwo/img/Image.png"></td><td><center><b>桌子<br></b><br><img src="widgets/vis-inventwo/img/Table.png"></td></tr><tr><td colspan=4></td></tr><tr><td><center><b>列表<br></b><br><img src="widgets/vis-inventwo/img/List.png"></td><td><center><b>帐篷<br></b><br><img src="widgets/vis-inventwo/img/Marquee.gif"></td><td><center><b>单选按钮<br></b><br><img src="widgets/vis-inventwo/img/Radio.gif"></td><td><center><b>滑块<br>垂直的</b><br><img src="widgets/vis-inventwo/img/Slider2.gif"></td></tr><tr><td colspan=4></td></tr><tr><td><center><b>滑块<br>水平的</b><br><img src="widgets/vis-inventwo/img/Slider1.gif"></td><td><center><b>颜色滑块<br>水平的</b><br><img src="widgets/vis-inventwo/img/ColorSliderHor.png"></td><td><center><b>颜色滑块<br>垂直的</b><br><img src="widgets/vis-inventwo/img/ColorSliderVert.png"></td><td><center><b>拨动开关<br></b><br><img src="widgets/vis-inventwo/img/Toggle.gif"></td></tr><tr><td colspan=4></td></tr><tr><td><center><b>基本开关<br></b><br><img src="widgets/vis-inventwo/img/Switch.gif"></td><td><center><b>复选框/<br>单选按钮</b><br><img src="widgets/vis-inventwo/img/Check.gif"></td><td><center><b>颜色选择器<br></b><br><img src="widgets/vis-inventwo/img/Colorpicker.png"></td></tr></table>

借助我们的组件，您可以实现以下项目。目前，我们的适配器仅包含纯按钮（见上图）。时钟和天气功能来自其他适配器，可能需要额外安装。

![例子](../../../en/adapterref/iobroker.vis-inventwo/img/Preview.png)

![例子](../../../en/adapterref/iobroker.vis-inventwo/img/Preview2.png)
---

＃＃ 支持
如果您喜欢我们的作品并愿意支持我们，我们感谢每一笔捐赠。

（此链接指向我们的PayPal账户，与ioBroker无关）

[![捐赠](img/spende.png)](https://www.paypal.com/donate?hosted_button_id=7W6M3TFZ4W9LW)

---

## 较早的更改
可在 [变更日志_旧版.md](CHANGELOG_OLD.md) 中找到

---

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 4.1.1 (2026-06-04)
- correct z-index layering for popups — date/time picker dropdowns now appear in front of the popup overlay instead of behind it (#583)

### 4.1.0 (2026-05-17)
- Hide widgets in vis 2 editor

### 4.0.1 (2026-05-15)
- Fixed widget gif images missing

### 4.0.0 (2026-05-15)
- (copilot) Adapter requires node.js >= 22 now
- (iobroker-bot) Adapter requires node.js >= 20 now.
- Updated dependencies
- Updated project structure to meet latest ioBroker standards
- Updated build process to use latest tools and best practices

### 3.3.5
- Fixed: [#688](https://github.com/inventwo/ioBroker.vis-inventwo/issues/688) Radio button cannot write a boolean value
- Fixed: [#736](https://github.com/inventwo/ioBroker.vis-inventwo/issues/736) Adapter checker errors in package.json and io-package.json resolved
- Fixed: [#678](https://github.com/inventwo/ioBroker.vis-inventwo/issues/678) Mode in io-package changed from daemon to once

## License

MIT License

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

---

Icons from Icons8 https://icons8.com/

Copyright (c) 2025-2026 [jkvarel](https://github.com/jkvarel) and [skvarel](https://github.com/skvarel) from [inventwo](https://github.com/inventwo)