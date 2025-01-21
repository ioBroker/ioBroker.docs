---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-homekittiles/README.md
title: ioBroker.vis-homekittiles
hash: /X3s0IvNZdNrT/NMxCAvFmje1BgCVt+giQKZUZrUyso=
---
# IoBroker.vis-homekittiles

![NPM 版本](https://img.shields.io/npm/v/iobroker.vis-homekittiles.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis-homekittiles.svg)
![安装数量](https://iobroker.live/badges/vis-homekittiles-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/vis-homekittiles-stable.svg)
![新平台](https://nodei.co/npm/iobroker.vis-homekittiles.png?downloads=true)

<img src="doc/img/title-pic_hkt-on-ipad.png" />

**测试：**![测试与发布](https://github.com/Standarduser/ioBroker.vis-homekittiles/workflows/Test%20and%20Release/badge.svg)

## IoBroker-VIS 的 HomeKit-Tiles
Homekit Tiles 是基于 Apple HomeKit 设计的小部件集。
小部件的特殊之处在于它们不包含任何固定样式元素，而是使用 CSS 格式化所有内容。因此，VIS 编辑器中没有针对图标、标签等的位置和/或大小的单独设置。通过更改 CSS 代码来调整设计。为此，可以使用文件 `/widgets/homekittiles/css/style.css` 中的 CSS 代码作为模板。代码插入到 VIS 编辑器中的 CSS 选项卡中，可以根据需要进行自定义。还可以通过小部件的“常规”部分中的 VIS 编辑器添加您自己的 CSS 类。

这些小部件是为 VIS 1.x 设计的。

**注意：**由于许可原因，此适配器不包含任何图标。图标的极佳来源是：

* [https://www.flaticon.com]（https://www.flaticon.com）
* [https://icons8.com]（https://icons8.com）

[🇩🇪 文档](doc/homekittiles-de.md)[🇺🇸 文档](doc/homekittiles-en.md)

要做的事情
* 创建迷你媒体播放器
* 创建选择图块
* 为 Sonos Group 创建复选框
* 日期选择器：动态日/月图标
* Tiles：添加对话框按钮

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

* All tiles: added icon for state off
* Optimized CSS for indicator

### 0.4.0 (2025-01-14)

* Added Pinpad-Dialog
* Added HTML-Dialog
* Added hkt-Config-Modal (experimental): changes the styles of modal to blur instead of background color and transparency (modal darkens the background when a dialog window is open). For this config-item you need ipadOS 18.x to work with Safari or ioBroker Visu App. Simply place the config item somewhere in your VIS where it is always called (e.g. in the menu) and configure it as desired. It is not visible at runtime.
* Made "modal" to default setting
* Section 'dialog' splitted into 'dialog settings' and 'dialog content'
* Made values of SwitchBool customizable and renamed 'SwitchBool' to 'Switch'
* Repaired notification widget
* Added Apple standard font 'SanFrancisco' to fonts (needed to be installed separatly)

### 0.3.3 (2025-01-03)

* Added new style "text only" to switch and view-in-widget-dialog tiles
* Fixed some issues from adapter checker
* Fixed some styles of view-in-widget-swipe
* Added arrow indicators to view-in-widget-swipe

### 0.3.2 (2024-12-03)

* Added option to show icons colored on tiles and radio
* Added new styles "big", "small" and "only icon" for all tiles
* JSON Table: set no fixed height (min-hight is now 32px)

### 0.3.1 (2024-07-12)

* Added submenu widget

### 0.2.7 (2024-07-10)

* repaired Thermostat dialog tile widget

### 0.2.6 (2024-07-05)

* Block operation: added ability to show widget disabled
* Added JSON Table
* Navigation-Button-Set: fixed notification arrangement
* Dynamization of some input fields

### 0.1.1 (2024-07-02)

* Added missing translations
* Added new style "indicator" for all tiles (IF YOUR TILES LOOK BROKEN AFTER UPDATE: SELECT EVERY TILE IN EDITOR - JUST CLICK ON IT. Sorry for that.)
* Radiobutton: new property "division" with selectable values
* Radiobutton: change size automatically if direction was changed
* Signal pictures: repaired comparision with number (<=nn)
* Signal pictures: checkbox for show/not show in editor
* Thermostat dialog: sort order of attributes (dialog attrs one up)

### 0.0.16 (2024-06-08)

* (Standarduser) thermostat: fixed window-sizing
* (Standarduser) date-picker: fixed block operation

### 0.0.15 (2024-05-31)

* (Standarduser) dialog: fixed positioning
* (Standarduser) thermostat: corrected symbols
* (Standarduser) thermostat: show low bat and unreach on tile
* (Standarduser) thermostat: added signal pictures

### 0.0.14 (2024-05-15)

* (Standarduser) settings-bool: corrected height of widget
* (Standarduser) thermostat: autofill + text templates + select for setpoint mode and heating profile

### 0.0.13 (2024-05-05)

* (Standarduser) made colors of datepicker window nice
* (Standarduser) removed test divs from hkt-ViewInWidget-Dialog
* (Standarduser) added thermostat widget

### 0.0.12 (2024-05-03)

* (Standarduser) added preview for label-widget
* (Standarduser) added notification bubbles for navigation button-set
* (Standarduser) removed navigation button (use navigation button-set instead)
* (Standarduser) added Settings-Widget with select value list

### 0.0.11 (2024-04-30)

* (Standarduser) added own signal pictures for all tiles widgets
* (Standarduser) Radiobutton: allow HTML in button label
* (Standarduser) Radiobutton: some css corrections
* (Standarduser) added Text field (label) with predefined css-classes

### 0.0.10 (2024-04-26)

* (Standarduser) added Object ID for Active State for View in Widget Dialog tile and Value tile
* (Standarduser) repaired Increment function
* (Standarduser) added own signal pictures

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

Copyright (c) 2025 Standarduser

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