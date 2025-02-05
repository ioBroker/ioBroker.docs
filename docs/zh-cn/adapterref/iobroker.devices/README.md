---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.devices/README.md
title: ioBroker.设备
hash: +Ck9oiC/SbmbTzLAkZe4+RMCd+bz+FKryVfovfdUNEg=
---
![标识](../../../en/adapterref/iobroker.devices/admin/devices.png)

![安装数量](http://iobroker.live/badges/devices-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.devices.svg)
![下载](https://img.shields.io/npm/dm/iobroker.devices.svg)

# IoBroker.设备
![测试与发布](https://github.com/ioBroker/iobroker.devices/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/devices/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## IoBroker 的设备适配器
管理和创建设备以便在其他适配器（如材料、物联网等）中使用它……

**重要：在管理中启用选项卡，如日志和脚本**

![屏幕](../../../en/adapterref/iobroker.devices/img/screen.png)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

待办事项
- 添加各州的描述

<!-- 下一版本的占位符（在行首）：

### **正在进行中** -->
### **正在进行中**
*（@GermanBluefox）更新软件包
*（@GermanBluefox）使用 vite
* (@GermanBluefox) 使用 ioBroker 的 eslint-config

### 1.1.5 (2023-06-06)
*（Garfonso）修复：编辑导入状态时出现的问题
*（Garfonso）已修复：警告
*（Garfonso）已修复：再次启用 iot（无需设置自定义 smartName）
*（Garfonso）已修复：1.1.3 中可能出现崩溃/打字错误。

### 1.1.4 (2023-06-06)
*（bluefox）更新的软件包

### 1.1.3 (2023-05-16)
*（bluefox）更好的类别选择行为

### 1.1.2 (2022-11-09)
* （Garfonso）纠正了光装置中的双态
*（Garfonso）添加了 CIE 颜色类型，相当于 `rgbSingle` 类型

### 1.1.1 (2022-11-03)
*（bluefox）修正删除对话框
*（bluefox）添加了乌克兰语翻译

### 1.1.0 (2022-09-27)
*（bluefox）将 GUI 迁移到 v5

### 1.0.12 (2022-06-09)
* (bluefox) 允许与反向代理后面的设备一起工作
* (bluefox) 更换了功能图标

### 1.0.11 (2022-06-08)
*（bluefox）更新了一些库

### 1.0.10 (2022-02-13)
*（bluefox）修正文件夹的编辑
*（bluefox）更新了一些库

### 1.0.9 (2021-07-11)
*（bluefox）实现窄行

### 1.0.8 (2021-07-04)
* (bluefox) 修正了设备的创建

### 1.0.7 (2021-06-30)
* (bluefox) 修正了文件夹的创建

### 1.0.6 (2021-06-27)
*（bluefox）实现了过滤器

### 1.0.5 (2021-06-26)
* (bluefox) 实现了`states`参数的编辑

### 1.0.4 (2021-06-08)
*（bluefox）修复了一些 GUI 错误

### 1.0.1 (2021-06-07)
*（bluefox）添加了哨兵

### 1.0.0 (2021-06-07)
*（bluefox）添加了新设备

### 0.3.16 (2021-03-11)
* (bluefox) 修复ID含有奇怪字符的错误

### 0.3.15（2020-12-13）
*（bluefox）更新了选择ID对话框

### 0.3.13（2020-08-17）
*（bluefox）修复可选状态的错误

### 0.3.12（2020-08-16）
* (bluefox) 添加了吸尘器

### 0.3.10（2020-08-12）
*（bluefox）添加了空调

### 0.3.6（2020-04-17）
*（Apollon77）为 Frontend/React 添加了 Sentry 错误报告

### 0.3.5（2020-04-17）
*（Apollon77）修正了拼写错误

### 0.3.4（2020-03-24）
*（bluefox）修复设备创建时的错误

### 0.3.2（2020-02-09）
*（Apollon77）优化了各种管理端口和反向代理的使用

### 0.3.1（2020-02-09）
* (Apollon77) 添加了与 Admin >4.0.0 的兼容性

### 0.2.0（2019-12-20）
*（bluefox）后端已被删除

### 0.1.8（2019-11-13）
* (bluefox) 允许克隆设备

### 0.1.7（2019-09-15）
*（bluefox）正在进行中

### 0.1.2（2019-09-04）
*（bluefox）正在进行中

### 0.1.0（2019-08-31）
*（bluefox）初始版本

## License
MIT License

Copyright (c) 2019-2025 bluefox <dogafox@gmail.com>

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