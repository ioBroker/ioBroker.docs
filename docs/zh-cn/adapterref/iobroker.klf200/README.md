---
BADGE-Number of Installations: http://iobroker.live/badges/klf200-stable.svg
BADGE-Travis CI: https://travis-ci.org/MiSchroe/ioBroker.klf200.svg?branch=master
BADGE-Build status: https://ci.appveyor.com/api/projects/status/t28nlps5c99jy5v7/branch/master?svg=true
BADGE-GitHub issues: https://img.shields.io/github/issues/MiSchroe/ioBroker.klf200.svg
BADGE-GitHub license: https://img.shields.io/github/license/MiSchroe/ioBroker.klf200.svg
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.klf200.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.klf200.svg
BADGE-NPM: https://nodei.co/npm/iobroker.klf200.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.klf200/README.md
title: KLF-200 适配器文档
hash: Ju0Pch23b2A9SxISJePGcq8iK7w8OF/BBWi9nSZbzys=
---
# KLF-200 适配器文档
该适配器用于控制 VELUX® KLF-200 接口。该适配器不是威卢克斯官方产品，也未得到拥有威卢克斯产品的公司的认可。

该适配器的主要用途是控制电动天窗和/或电动百叶窗或百叶窗。
然而，KLF-200接口可以连接其他设备，例如灯、开关、百叶窗等。
我没有设计用于这些设备的适配器。因此这些设备也可能由该适配器控制。

该适配器与 KLF-200 接口的内部 REST API 配合使用，您无需连接输入或输出，但仍然可以并行使用它们。

---

## 准备您的 KLF-200 接口
要使用此适配器，您必须将 KLF-200 盒子设置为 **接口模式**。如果您将盒子用作中继器，它将无法工作。

> 有关以下任务的详细说明，请阅读包装盒中附带的手册。
>> 假设您已在网络浏览器中成功登录您的 Box。

### 设置产品
您想要使用此适配器控制的任何产品都必须在“我的产品”页面上注册。
您可以通过以下方式注册新产品

- 从另一个遥控器复制
- 搜索产品

注册所有产品后，您应该会看到如下列表：

![KLF-200界面“我的产品”截图](../../../de/adapterref/iobroker.klf200/img/ProductList.PNG)

### 设置场景
要录制场景，请单击按钮

![录制节目按钮](../../../de/adapterref/iobroker.klf200/img/RecordProgramButton.PNG)

这将打开*程序创建正在进行*窗口。现在使用产品附带的遥控器进行更改，例如将窗户打开到 40%。然后输入程序的名称并单击*保存程序*。

![正在录制的屏幕截图](../../../de/adapterref/iobroker.klf200/img/RecordingInProgress.PNG)

> 提示：> - 根据产品和开启程度命名您的程序，例如浴室窗户 40%。但是，适配器不使用任何命名约定。
> - 如果您的窗口是关闭的，则从 100% 的打开级别开始，然后按照每个后续程序逐渐降低，直到达到 0%。
> - 您最多可以在框中存储 32 个程序，因此请规划您的步骤数，因为窗口打开 30% 或 40% 之间没有真正的区别。

录制完节目后，您将得到如下列表：

![节目列表截图](../../../de/adapterref/iobroker.klf200/img/ProgramList.PNG)

### 设置连接
最后一步是可选的。当您不使用输入和输出线时，您可能已经注意到盒子上的小 LED 不断闪烁。为了摆脱烦人的闪烁，您需要设置至少一个连接。

您所要做的就是将其安装在盒子中，无需连接任何东西！只需选择任何内容即可。

---

## 配置适配器
![适配器配置的屏幕截图](../../../de/adapterref/iobroker.klf200/img/AdapterConfiguration.PNG)

＃＃＃主持人
KLF-200 接口的主机名。该地址与您在网络浏览器地址栏中输入的用于连接 Box 的地址相同。

＃＃＃ 密码
连接 KLF-200 接口所需的密码。它与您在网络浏览器中连接时使用的相同。

> KLF-200 的默认密码是`velux123`，但无论如何你都应该更改它！

### 查询频率（以分钟为单位）
<span style="color: #ff0000"><strong><em>计划在未来版本中提供此选项。如果要重新加载配置，则必须重新启动适配器。</em></strong></span>

适配器从 KLF-200 接口重新加载配置之前的分钟数。

---

## 使用适配器
适配器从 KLF-200 接口读取元数据后，您将在对象树中找到以下状态：

设备|频道|状况 |数据类型|描述 --- | --- | --- | --- | --- 产品|  |  |  | KLF-200 产品列表中的每个产品都有一个子条目。
产品 |  |产品发现 |价值|列表中的产品数量。只读。
产品 | 0..n | 0..n |类别 |文字|产品类别。只读。
产品 | 0..n | 0..n |等级 |等级 |产品的当前状态 设置该值以便执行相应的场景。读/写。
产品 | 0..n | 0..n |场景数 |价值|使用产品的场景数量。只读。
场景|  |  |  | KLF-200 产品列表中的每个产品都有一个子条目。
场景|  |场景发现 |价值|列表中的场景数。只读。
场景 | 0..n | 0..n |产品数量 |价值|该场景中的产品数量。只读。
场景| 0..n | 0..n |运行|按钮.播放|指示场景是否正在运行。设置该值以使场景运行。读/写。
场景| 0..n | 0..n |沉默|指示器.静音 |指示场景是否以安静模式运行（如果场景的产品支持）。只读。

> **重要：** > > 通道中使用的 ID 是来自 KLF-200 接口的 ID。如果您更改 KLF-200 中的产品列表或程序列表，ID 可能会更改。

要运行场景，您可以将场景的状态`run`设置为`true`，或将产品的状态`level`设置为与将产品设置为该级别的场景相对应的值。

＃＃＃ 例子
假设您浴室的窗户位于频道`0`。您在频道 `10` 中有一个场景，将浴室窗户打开到 40%。

```javascript
// Variant 1: Open the bathroom window at 40% using the scenes run state:
setState('klf200.0.scenes.10.run', true);
/*
    The following will happen:
    1. Your window will start to move to 40% opening level.
    2. After your window has stopped, klf200.0.scenes.10.run will be set to 'false' again.
    3. klf200.0.products.0.level will be set to 40%.
*/

// Variant 2: Open the bathroom window at 40% using the products level state:
setState('klf200.0.products.0.level', 40);
/*
    The following will happen:
    1. Your window will start to move to 40% opening level.
    2. klf200.0.scenes.10.run will be set to true.
    3. After your window has stopped, klf200.0.scenes.10.run will be set to 'false' again.
*/

// What happens, if we don't have a scene for that level?
setState('klf200.0.products.0.level', 41);
/*
    The following will happen:
    1. Your window won't move at all!
    2. klf200.0.products.0.level will be reset to the previous value, e.g. 40
*/

```

---

## 已知限制
适配器使用盒子 Web 界面使用的内部 REST API 来控制 KLF-200。
虽然我们只使用 API 的一个子集，但还是有一些限制：

- 适配器无法读取窗户的当前开度。如果您用遥控器控制它或它因下雨而关闭，适配器不会知道它，它仍然显示最后一个已知值。
- KLF-200 接口最多可包含 32 个场景。
- 适配器不知道操作何时完成。该状态至少保持 30 秒。
- 不要一个接一个地运行场景太快。然后 KLF-200 可以报告错误。 （您可以在日志中找到错误。）

---

VELUX 和 VELUX 徽标是 VKR Holding A/S 的注册商标。

## Changelog

#### 0.9.5
* (Michael Schroeder) Bug fixes

#### 0.9.4
* (Michael Schroeder) Compatible to Admin 3, add documentation

#### 0.9.0
* (Michael Schroeder) Initial public beta release

#### 0.0.1
* (Michael Schroeder) Initial developer release

## License
The MIT License (MIT)

Copyright (c) 2018 Michael Schroeder <klf200@gmx.de>

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

------------------------------------------------------------------------------

VELUX and the VELUX logo are registered trademarks of VKR Holding A/S.