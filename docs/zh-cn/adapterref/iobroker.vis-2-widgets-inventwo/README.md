---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-2-widgets-inventwo/README.md
title: inventwo Widgets for ioBroker.vis 2.0
hash: vDNwHd2FXuXhpeiuRyJe+BVugXJIGn+yVwt/ZXfCk6A=
---
![标识](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/admin/vis-2-widgets-inventwo.png)

![安装数量](http://iobroker.live/badges/vis-2-widgets-inventwo-stable.svg)
![NPM 版本](https://nodei.co/npm/iobroker.vis-2-widgets-inventwo.svg?style=shields&data=v,u,d&color=orange)
![下载](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-inventwo.svg)
![PayPal捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# 为 ioBroker.vis 2.0 开发小部件
＃＃ 关于
为 ioBroker VIS 2.0 添加开关、按钮、滑块等小部件。

＃＃ 内容
用于切换、导航等的各种小部件。

### 通用小部件
![预览通用和多组件小部件](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_universal_widget.png)

#### 各种内容类型
![预览颜色选择器](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_content_types.png)

![预览模拟时钟](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_content_type_clock_analog.png)

颜色选择器

![预览颜色选择器](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_colorpicker.png)

### 小部件 - 滑块
![预览滑块](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_sliders.png)

### 小部件 - 开关
![预览开关](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_switches.png)

### 小部件 - 复选框
![预览复选框](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_checkbox.png)

### 小部件 - 表格
![预览表](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_table.png)

＃＃＃ 设计
所有组件均提供丰富的自定义设计选项，可根据您的需求定制外观和风格。

更多信息请参见 [这里](./docs/universal-widget-design-examples.md)。

![预览自定义](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_univseral_design_examples.png)

### 后续内容敬请期待……

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- Marquee widget: new scrolling text widget with configurable speed, direction, loop count, gap and pause-on-hover

### 0.8.0 (2026-05-15)
- Slider widget: added read-only mode, gradient support for colors and an option to place steps inside the slider bar (#244)
- Dropdown widget: added conditional background color (#198), read-only mode (#201) and option to show value without text (#201)
- Table widget: added multi-column sort (#234)

### 0.7.2 (2026-04-26)
- Fix button click and hold for mobile devices (#192)

### 0.7.1 (2026-04-24)
- Fixed table widget fixed header not working

### 0.7.0 (2026-04-21)
- Table widget added fixed header option (#234)
- Table widget added conditional row color (#234)
- Table widget added column filter (#234)

### 0.6.5 (2026-04-11)
- Changed click behavior to fix click and hold for mobile devices (#192)
- Fixed dropdown border on focus visible even though border with is 0 (#200)

## License
The MIT License (MIT)

Copyright (c) 2025-2026 jkvarel <jk@inventwo.com>

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