---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-homekittiles/README.md
title: ioBroker.vis-homekittiles
hash: uNnhx/0Ug2tl/hOGTCobHT+OrmoWIqKKS4KMkZQ9mLI=
---
# IoBroker.vis-homekittiles

![NPM版本](https://img.shields.io/npm/v/iobroker.vis-homekittiles.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis-homekittiles.svg)
![安装数量](https://iobroker.live/badges/vis-homekittiles-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/vis-homekittiles-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.vis-homekittiles.png?downloads=true)

<img src="doc/img/title-pic_hkt-on-ipad.png" />

**测试：** ![测试与发布](https://github.com/Standarduser/ioBroker.vis-homekittiles/workflows/Test%20and%20Release/badge.svg)

## IoBroker-VIS 的 HomeKit-Tiles
Homekit Tiles 是一个基于 Apple HomeKit 设计的小部件集。
这些小部件的特殊之处在于它们不包含任何固定的样式元素，但所有内容均使用 CSS 进行格式化。因此，VIS编辑器中没有单独设置图标、标签等的位置和/或大小。通过更改CSS代码来调整设计。为此，可以使用文件`/widgets/homekittiles/css/style.css`中的CSS代码作为模板。代码被插入到 VIS 编辑器的 CSS 选项卡中，并且可以根据需要进行自定义。还可以通过 VIS 编辑器在小部件的“常规”部分添加您自己的 CSS 类。

这些小部件是为 VIS 1.x 设计的。

**注意：** 出于许可原因，此适配器不包含任何图标。非常好的图标来源是：

* [https://www.flaticon.com](https://www.flaticon.com)
* [https://icons8.com](https://icons8.com)

[🇩🇪 文档](doc/homekittiles-de.md)[🇺🇸 文档](doc/homekittiles-en.md)

## 要做的事情
* 自己的瓷砖信号图片
* 迷你媒体播放器
* 恒温器
* 选择
* 子菜单按钮
* CSS：使对话框窗口的颜色变得漂亮
* CSS：使日期选择器窗口的颜色变得漂亮

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

* (Standarduser) added Object ID for Active State for View in Widget Dialog tile and Value tile
* (Standarduser) repaired Increment function

### 0.0.9 (2024-02-02)

* (Standarduser) corrected block operation. ATTENTION! You may have to delete and reinsert your widgets, if you used a different Object ID for blocking operation! Of cause only these widgets, where you used this function ;)
* (Standarduser) corrected formatValue function

### 0.0.7 (2023-12-26)

* (Standarduser) CSS adjustments
* (Standarduser) changed block operation to old variant
* (Standarduser) corrected value formatting in label groups

### 0.0.6 (2023-11-10)

* (Standarduser) just some cleanup

### 0.0.5 (2023-11-04)

* (Standarduser) fixed: adjustment of decimals in labelgroup 1 & 2
* (Standarduser) fixed: readme
* (Standarduser) not fixed: increment not working properbly

### 0.0.4 (2023-11-01)

* (Standarduser) fixed: some corrections on CSS code
* (Standarduser) fixed: widget description text
* (Standarduser) fixed: wrong placement if dialog-height had a unit (ViewInWidget-Dialog)
* (Standarduser) fixed: increment buttons on tiles were working insuficient
* (Standarduser) added: variable number of digits at value-tile
* (Standarduser) added: slider for ViewInWidget-Swipe
* (Standarduser) added: ability to manipulate values in label-groups

### 0.0.2 (2023-10-14)

* (Standarduser) initial release

## License

MIT License

Copyright (c) 2024 Standarduser

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