---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-2-widgets-inventwo/README.md
title: 为 ioBroker.vis 2.0 引入 inventwo 小部件
hash: 7zOWdVk5ONHUBzdmQC97Qu8Litfu07Yl94t4DgEh9Yo=
---
![标识](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/admin/vis-2-widgets-inventwo.png)

![安装数量](http://iobroker.live/badges/vis-2-widgets-inventwo-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.vis-2-widgets-inventwo.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-inventwo.svg)
![新平台](https://nodei.co/npm/iobroker.vis-2-widgets-inventwo.png?downloads=true)

# 为 ioBroker.vis 2.0 发明小部件
＃＃ 关于
添加开关、按钮、滑块等作为 ioBroker VIS 2.0 的小部件。

＃＃ 内容
用于切换、导航等的各种小部件。

![Vorschau 通用和多功能小部件](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_universal_widget.png)

各种内容类型

![预览 颜色选择器](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_content_types.png)

颜色选择器

![预览 颜色选择器](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_colorpicker.png)

滑块

![预览 颜色选择器](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_sliders.png)

开关

![预览 颜色选择器](../../../en/adapterref/iobroker.vis-2-widgets-inventwo/img/preview_switches.png)

#### 更多内容即将推出...

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.11 (2024-07-18)
* Fixed issues mentioned by eslint

### 0.1.10 (2024-07-18)
* Removed styles libraries as they are not compatible with vis 2.0
* Fixed compare by for widget type view in dialog (#24)
* Fixed text color not working in slider and added other font styles (#25)
* Fixed switch doesn't toggle without defining values (#28)

### 0.1.9 (2024-05-24)
* Fixed missing object id if a type is nav (#14)
* Fixed content color for icons not working (#22)

### 0.1.7 (2024-05-22)
* Fixed missing object id if a type is nav (#14)
* Fixed image aspect ratio (#15)
* Added options to customize dialog

### 0.1.5 (2024-04-14)
* Added optional button click feedback options
* Added widget type to send http requests and open urls

### 0.1.4 (2024-04-14)
* Fixed issue in workflow

### 0.1.3 (2024-04-14)
* Fixed issue in widget state check. Also includes #12
* Removed second unused field 'button width' (#10)
* Added widget type Increase/Decrease value (#7)
* Added more info to readme
* Removed iobroker/adapter-core dependency
* Added node 20 to test-and-release workflow

### 0.1.2 (2024-04-08)
* Fixed issue editor crashes when changing "Comparison operator" or "Compare by" on multiple states.
* Fixesd issue state settings not used if condition is true.

### 0.1.1 (2024-04-05)
* Fixed wrong default value for comparison operator

### 0.1.0 (2024-04-05)
* Added new widget: Switch
* Added comparison operator and option to check for value or view for each state in universal widget
* Added steps to slider widget
* Fixed issue states not working if type is button or readonly
* Fixed issue value is set with wrong data type

### 0.0.7 (2024-04-03)
* Bug fix

### 0.0.6 (2024-04-03)
* Bug fix

### 0.0.5 (2024-04-02)
* Bug fix

### 0.0.4 (2024-04-01)
* Bug fix
* Added new widget: Table, still work in progress
* CSS settings divided into single groups

### 0.0.3 (2024-03-14)
* Bug fix

### 0.0.2 (2024-03-14)
* Bug fix

### 0.0.1 (2024-03-11)
* (jkvarel) Init

## License
The MIT License (MIT)

Copyright (c) 2024 jkvarel <jk@inventwo.com>

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