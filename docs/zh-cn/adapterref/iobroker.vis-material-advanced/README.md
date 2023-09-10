---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-material-advanced/README.md
title: ioBroker.vis-材料-高级
hash: xKe23Xkj89gC/PCQFAdtUkjvEwhDFRyVl+a7nhnKC80=
---
![标识](../../../en/adapterref/iobroker.vis-material-advanced/admin/vis-material-advanced.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.vis-material-advanced.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis-material-advanced.svg)
![安装数量（最新）](http://iobroker.live/badges/vis-material-advanced-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/vis-material-advanced-stable.svg)
![依赖状态](https://img.shields.io/david/EdgarM73/iobroker.vis-material-advanced.svg)
![已知漏洞](https://snyk.io/test/github/EdgarM73/ioBroker.vis-material-advanced/badge.svg)
![国家公共管理](https://nodei.co/npm/iobroker.vis-material-advanced.png?downloads=true)

# IoBroker.vis-材料-高级
## IoBroker 的 vis-material-advanced 适配器
该适配器为 ioBroker 中的 vis 提供标准化的 Widget。许多不同的预定义小部件

该适配器的基础知识是由以下人员创建的：

* (nisio) https://github.com/iobroker-community-adapters/ioBroker.vis-material
* (pix---) https://github.com/Pix---/ioBroker.vis-material

但重写了90%

修复了几个错误并添加了许多新的小部件。

## 现在存在以下小部件
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
    -cardIcon（还没有在任何地方都有意义，例如调光器）
    - 不透明颜色（标准不透明颜色）
    - colorizeByValue（根据某些值，可以更改不透明度颜色，例如，如果太热，则将其变为红色，变为冷蓝色）
    - 下方、上方、最小值、最大值（colorizeByValue 的值）
    - 颜色-低/高、中...（边框凸起时使用的颜色）
    - 只读（某些小部件可以设置为只读模式以仅显示）
    - border-radius 启用和更改圆角
    - valueAlign 将值字段左对齐、居中或右对齐
    - value-vertical 将值字段顶部、底部或中间对齐
    - borderColor 激活时边框的颜色

＃＃＃ 入门
安装适配器并在编辑模式下启动 VIS。
在左侧，选择 vis-material-adapter，然后所有小部件都会显示在预览中。

……大量文档丢失………………

**这是 example2.png，导入它并查看它的实时状态** ![](../../../en/adapterref/iobroker.vis-material-advanced/widgets/door_example.png)

**您可以将 example.json 文件导入 vis** 感谢@sigi234

## Changelog
<!--
    Placeholder
    ### **WORK IN PROGRESS**
-->
### 1.7.4 (2023-09-07)
* (DEV2DEV-DE) Subscribe to updates of both values (temperature, humidity)

### 1.7.3 (2022-04-11)
* (bluefox) Removed erroneous chars from HTML

### 1.7.2 (2021-07-02)
* bugfix 2 Temp Humidity

### 1.7.1 (2021-07-02)
* bugfix for Temp Humidity

### 1.7.0 (2021-04-19)
* added new Widget Window3 for possibility showing open/tilted/closed [0/1/2] windows

## License
MIT License

Copyright (c) 2020-2023 EdgarM73 <edgar.miller@gmail.com>

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