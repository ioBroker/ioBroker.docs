---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-material-advanced/README.md
title: ioBroker.vis-material-advanced
hash: rQGHx5wnsb7Uay3ZjyfpYEOtiL9vBKR7WN6iSDk6J40=
---
![标识](../../../en/adapterref/iobroker.vis-material-advanced/admin/vis-material-advanced.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.vis-material-advanced.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis-material-advanced.svg)
![安装数量（最新）](http://iobroker.live/badges/vis-material-advanced-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/vis-material-advanced-stable.svg)
![依赖状态](https://img.shields.io/david/EdgarM73/iobroker.vis-material-advanced.svg)
![已知漏洞](https://snyk.io/test/github/EdgarM73/ioBroker.vis-material-advanced/badge.svg)
![新PM](https://nodei.co/npm/iobroker.vis-material-advanced.png?downloads=true)

# IoBroker.vis-material-advanced
## 用于 ioBroker 的 vis-material-advanced 适配器
该适配器为 ioBroker 中的 vis 提供标准化的 Widget。许多不同的预定义小部件

该适配器的基础是由以下人员创建的：

* (nisio) https://github.com/iobroker-community-adapters/ioBroker.vis-material
* (pix---) https://github.com/Pix---/ioBroker.vis-material

但改写了 90%

添加了几个错误修正和许多新的小部件。

## 以下小部件现在存在
＃＃＃ 当前的
 - 门
 - 窗户
 - 温度
 - 湿度
 - 压力
 - 温度和湿度
 - 入住率
 - 光
 - 调光器
 - 光温
 - 快门
 - 体积
 - 恒温器
 - 布尔值
 - 数字
 - 文本
 - 阀门

＃＃＃ 进行中
尚未最终确定：

 - 车库门
 - 广播电台

 许多小部件仍在计划中

＃＃ 选项
    大多数小部件都提供以下选项：

    - 文字颜色
    - cardIcon（在任何地方都没有意义，例如 dimmer ）
    - 不透明度颜色（标准不透明度颜色）
    - colorizeByValue（根据某些值，可以更改不透明度颜色，例如，如果太热，将其变为红色，变为冷蓝色）
    - 下、上、最小值、最大值（ colorizeByValue 的值）
    - color-low/high,medium...（当边框被提升时使用的颜色）
    - 只读（某些小部件可以设置为只读模式以仅显示）
    -border-radius 启用和更改圆角
    - valueAlign 将值字段左、中或右对齐
    - value-vertical 对齐 Value 字段的顶部、底部或中间
    -borderColor 激活时边框的颜色

＃＃＃ 入门
安装适配器并在编辑模式下启动 VIS。
在左侧选择 vis-material-adapter，然后所有小部件都显示在预览中。

...... 很多文件丢失............

**这是example2.png，导入并实时查看** ![](../../../en/adapterref/iobroker.vis-material-advanced/widgets/door_example.png)

**感谢@sigi234，您可以将 example.json 文件导入 vis**

## Changelog
<!--
    Placeholder
    ### **WORK IN PROGRESS**
-->
### 1.7.3 (2022-04-11)
* (bluefox) Removed erroneous chars from HTML

### 1.7.2 (2021-07-02)
* bugfix 2 Temp Humidity

### 1.7.1 (2021-07-02)
* bugfix for Temp Humidity

### 1.7.0 (2021-04-19)
* added new Widget Window3 for possibility showing open/tilted/closed [0/1/2] windows

### 1.6.0 (2021-04-01)
* new Temperature widget with ONLY an icon from blue to red depending on temperature setting

## License
MIT License

Copyright (c) 2020-2022 EdgarM73 <edgar.miller@gmail.com>

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