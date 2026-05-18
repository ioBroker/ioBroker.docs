---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-2-widgets-inventwo/README.md
title: inventwo Widgets for ioBroker vis 2.0
hash: vc9zv0BabEWJ+aMkiFqdV38JvhSJ+yB8bWd0YNAzcVI=
---
![标识](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/admin/vis-2-widgets-inventwo.png)

![安装数量](http://iobroker.live/badges/vis-2-widgets-inventwo-stable.svg)
![NPM 版本](https://nodei.co/npm/iobroker.vis-2-widgets-inventwo.svg?style=shields&data=v,u,d&color=orange)
![下载](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-inventwo.svg)
![PayPal捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# Inventwo ioBroker vis 2.0 小部件
---

＃＃ 关于
一套高度可定制的 ioBroker vis 2.0 小部件，专为希望完全掌控仪表盘外观的用户而设计。每个小部件都提供丰富的样式选项，并与 ioBroker 数据点无缝集成。

---

## 小部件
| 小部件 | 描述 |
|---|---|
| [普遍的](#widget---universal) | 多功能小部件：开关、按钮、导航、只读显示、颜色选择器、模拟时钟等 |
| [径向滑块](#widget---radial-slider) | 具有可配置角度、轨道和滑块样式的圆弧滑块 |
| [转变](#widget---switch) | 带有自定义标签和轨道/滑块颜色的切换开关 |
| [复选框](#widget---checkbox) | 带有自定义真/假值和标签位置的复选框 |
| [桌子](#widget---table) | 具有排序、筛选和条件行颜色的动态 JSON 数据表 |
| [下拉菜单](#widget---dropdown) | 下拉选择框自动填充 ioBroker 对象状态 |
| [帐篷](#widget---marquee) | 可配置速度、方向和间距的滚动文本条 |
| [值列表](#widget---value-list) | 由文本值或数据点生成的项目符号列表 |
| [值列表](#widget---value-list) | 根据文本值或数据点生成的项目符号列表 |

---

## 小部件 - 通用
该适配器的旗舰级小部件——一个可以充当开关、按钮、导航元素、只读显示等多种功能的单一小部件。

![预览通用小部件](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_universal_widget.png)

### 交互类型
- **切换** – 在两个值之间切换数据点
- **按钮** – 按下时设置一个值；可以选择按住该值，松开后重置该值
- **导航** – 点击后导航至可视化视图
- **只读** – 显示数值，不进行任何交互。
- **在对话框中查看** – 在模态对话框中打开可视化视图
- **增加/减少值** – 增加或减少数值数据点
- **HTTP 请求/打开 URL** – 发送 HTTP 请求或打开 URL（在同一标签页或新标签页）

### 显示模式
- **单按钮** – 一个包含一个或多个状态的组件
- **独立按钮** – 每个状态都显示为一个单独的按钮（取代了传统的单选按钮列表）

### 内容类型
每个状态可自由组合多个内容元素：

![预览内容类型](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_content_types.png)

- **文本/HTML** – 静态或动态标签
- **图标** – ioBroker 图标库
- **图像** – 本地或远程图像，可配置缩放、位置和填充模式
- **在组件中查看** – 将另一个可视化视图直接嵌入到组件中
- **颜色选择器** – 功能齐全的颜色选择器（HEX、HEX8、RGB、HSL、HSV、CIE），可配置组件可见性

![预览颜色选择器](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_colorpicker.png)

- **模拟时钟** – SVG 模拟时钟，表盘设计、刻度、数字和指针均可自定义。

![预览模拟时钟](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_content_type_clock_analog.png)

### 其他功能
- 多个州，每个州可采用不同的样式
点击反馈动画
- 条件状态比较（按值或其他标准）
- 可配置的对话框选项（全屏、点击外部关闭、自动关闭定时器）

＃＃＃ 设计
该组件的每个方面都可以自定义：

![预览 CSS 自定义](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_css_customization.png) ![设计示例预览](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_univseral_design_examples.png)

有关详细设计示例，请参见[这里](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/main/docs/universal-widget-design-examples.md)。

### 多边形
小部件的形状不限于矩形。“形状”设置允许您从内置的多边形形状中进行选择，或定义完全自定义的轮廓：

| 形状 | 描述 |
|-------|-------------|
| 矩形 | 默认 — 标准矩形卡片 |
| 三角形 | 等边三角形 |
| 菱形 | 四边形旋转正方形 |
| 五边形 | 五边形 |
| 六边形 | 六边形——非常适合蜂窝状布局 |
| 七边形 | 七面体 |
| 八边形 | 八边形 |
| 星形 | 五角星 |
| **自定义** | 任意多边形 — 手动输入裁剪路径点 |

![预览形状](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_shapes.png)

**其他形状选项：**

- **旋转** (0–359°) — 将任意内置多边形旋转到任意角度
- **圆角半径** (0–30) — 使用贝塞尔曲线对所有顶点进行统一的圆角处理；适用于所有形状，包括自定义形状。
- **自定义多边形点** — 以逗号分隔的 `X% Y%` 点对，按顺时针方向排列，例如 `40% 0%, 100% 50%, 40% 100%, 0% 50%` · 在 [https://bennettfeely.com/clippy/](https://bennettfeely.com/clippy/) 上以可视化方式创建路径

所有现有功能——内/外阴影、边框、渐变背景、点击反馈——都适用于所有形状。

> **示例：** 六边形蜂窝状仪表盘 → [docs/example-views/hexagonal-view.md](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/main/docs/example-views/hexagonal-view.md) > **示例：** 矩形仪表盘 → [docs/example-views/rectangle-view.md](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/main/docs/example-views/rectangle-view.md)

---

## 小部件 - 滑块
用于控制数值数据点的水平或垂直滑块。

![预览滑块](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_sliders.png)

**主要特点：**

- 水平和垂直方向
- 可配置最小值、最大值和步长值（从数据点对象自动读取）
- 可选的最小值/最大值标签
- 步长显示（自动或自定义步长值）
- 可以在滑块栏内放置步骤
- **只读模式** – 显示数值，但不允许交互
- 支持轨道和活动轨道的渐变色（任何 CSS 颜色字符串，包括 `linear-gradient(...)`）
- 为曲目、活动曲目和缩略图设置个性化样式，包括阴影效果

---

## 小部件 - 径向滑块
圆弧滑块是经典线性滑块的优雅替代品。

![预览径向滑块](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/src-widgets/public/img/vis-widget-inventwo-radial-slider.png)

**主要特点：**

- 起始角和结束角可自由配置
- 可配置轨道宽度、轨道颜色和活动轨道颜色
- 可选择在屏幕中央显示数值，并可设置字体大小和颜色
- 值下方的可选标签
拇指尺寸和颜色
- 轨道和缩略图均有阴影效果

---

## 小部件 - 开关
用于布尔型或二态数据点的切换开关。

![预览开关](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_switches.png)

**主要特点：**

- 自定义真/假值（不限于布尔值）
每个州的单独文本标签
标签位置：顶部、底部、起始或结束
- 完全可自定义曲目和缩略图颜色（包括渐变色）
- “来自小部件”样式 – 继承另一个开关小部件的样式

---

## 小部件 - 复选框
用于布尔型或二态数据点的复选框。

![预览复选框](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_checkbox.png)

**主要特点：**

- 自定义真/假值
每个州的单独文本标签
标签位置：顶部、底部、起始或结束
- 可自定义方框和活动框的颜色和尺寸

---

## 小部件 - 表格
一个动态数据表，用于渲染来自 ioBroker 数据点的 JSON 对象。

![预览表](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_table.png)

**主要特点：**

- 可配置列：键、标题、前缀、后缀、占位符
- 列值格式：文本、数字（带小数）、日期时间、图像
- 支持单列或**多列排序**的可排序列
- **列筛选器** – 按列值筛选行
- **固定头部** – 滚动页面时头部始终可见
- 默认排序配置（列和方向）
- 最大行数限制
- **条件行颜色** – 根据列值条件高亮显示行
- 可自定义页眉和行样式（背景、高度、边框）

---

## 小部件 - 下拉菜单
一个下拉选择控件，其选项会自动从 ioBroker 对象的 `common.states` 属性中填充。

![预览下拉菜单](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/src-widgets/public/img/vis-widget-inventwo-dropdown.png)

**主要特点：**

- 选项会根据数据点的定义状态自动加载。
选项可以显示值、文本标签或两者兼有。
- 下拉菜单上方的可选标题
- **只读模式**
- **条件背景颜色** – 根据值条件更改下拉菜单背景（可选择应用于标题）
- 可自定义字体、文本颜色、背景、高亮颜色、边框（宽度、颜色、圆角）和阴影
- 自定义标题样式（字体大小、颜色、边距）

---

## 小部件 - 跑马灯
水平滚动文本条——非常适合显示长文本值或通知。

**主要特点：**

- 数据点或静态文本作为数据源
- 滚动方向：向左或向右
- 可配置的滚动速度（像素/秒）
- 可配置文本副本数量（防止短文本出现空白）
- 可配置副本之间的间距
- **悬停时暂停**
- 背景颜色支持
- 从 vis 小部件设置继承字体样式

---

## 小部件 - 值列表
根据单个文本值（可以是数据点或手动输入）渲染项目符号列表。

**主要特点：**

- 数据点或手动文本输入作为数据源
- 可自由配置分隔符——任何字符或字符串：
- 逗号: `,`
分号：`;`
- 换行符: `\n`
- Tab: `\t`
- 任何其他自定义字符串
- 修剪每项的前导/尾随空格
- 过滤空项
- 子弹类型：`•` 圆盘、`○` 圆圈、`▪` 方块、`–` 短横线、`›` 箭头、`1. 2. 3.` 数字、无、自定义字符
- 单个项目符号颜色独立于文本颜色
- 文本颜色、背景、字体大小、文本对齐方式
- 可配置项目符号与正文之间的间距
- 可配置项目之间的行间距
- 内衬

---

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.0 (2026-05-17)
- Universal Widget: Add polygon shape support (triangle, diamond, pentagon, hexagon, heptagon, octagon, star) with configurable rotation and corner radius

### 0.9.0 (2026-05-17)
- Added document with example designs for universal widget
- Marquee widget: new scrolling text widget with configurable speed, direction, loop count, gap and pause-on-hover (#5)
- Dropdown widget: optional conditional background color on title, configurable title padding (top, bottom, left, right) (#246)
- Value List widget: new widget that renders a bullet-point list from a text value (datapoint or manual), with configurable separator, bullet type, colors, spacing and padding (#2)

### 0.8.0 (2026-05-15)
- Slider widget: added read-only mode, gradient support for colors and an option to place steps inside the slider bar (#244)
- Dropdown widget: added conditional background color (#198), read-only mode (#201) and option to show value without text (#201)
- Table widget: added multi-column sort (#234)

### 0.7.2 (2026-04-26)
- Fix button click and hold for mobile devices (#192)

### 0.7.1 (2026-04-24)
- Fixed table widget fixed header not working

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