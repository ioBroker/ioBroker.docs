---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hue-sync-box/README.md
title: ioBroker.hue-同步框
hash: TwPvpTI0WugmeEEYQaO99mQZkBRXGcQtNFGvSp8OepI=
---
![标识](../../../en/adapterref/iobroker.hue-sync-box/admin/hueSyncBox.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.hue-sync-box.svg)
![下载](https://img.shields.io/npm/dm/iobroker.hue-sync-box.svg)
![安装数量](https://iobroker.live/badges/hue-sync-box-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/hue-sync-box-stable.svg)

# IoBroker.hue-同步框
![测试和发布](https://github.com/xXBJXx/ioBroker.hue-sync-box/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 hue-sync-box 适配器
**此适配器使用哨兵库自动向开发人员报告异常和代码错误。**有关更多详细信息和如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

## 适配器需要 Node.js 版本 >= 16.x
### 什么是飞利浦 Hue 同步盒？
飞利浦 Hue Sync Box 是一种设备，可让您将飞利浦 Hue 灯的颜色和灯光效果与计算机屏幕同步。这可以通过同步盒检测屏幕的颜色和灯光效果并将其传输到飞利浦 Hue 灯具来实现。

### 适配器可以做什么？
适配器每 15 秒轮询一次 Philips Hue Sync Box API，并相应地更新数据点。
有一些数据点可以更改同步盒的设置（例如同步开/关开关、切换 HDMI 输入等）。
对数据点的任何更改都会立即发送到飞利浦 Hue Sync Box 并触发数据点更新。
可以同时创建多个飞利浦 Hue Sync 盒子。

## 使用适配器需要什么？
- 飞利浦 Hue Sync Box IP 地址（仅限 IPv4）
- Hue Sync Box 令牌（见下文）

## 如何将飞利浦 Hue Sync Box 添加到适配器？
1. 打开适配器配置并单击“添加框”按钮。
2. 为盒子输入一个名字，名字只能是1x，因为它会被用作ID。
3. 输入盒子的IP地址。 （仅限IPv4）（小提示：输入IP地址时，每隔3个数字会自动插入一个点）

   ![name_ip_token](../../../en/adapterref/iobroker.hue-sync-box/admin/media/name_ip_token.png)

4. 单击“注册框”按钮，将打开一个新窗口，您可以在其中注册框（见下文）

   ![登记](../../../en/adapterref/iobroker.hue-sync-box/admin/media/registration.png)

5. 按下“注册”按钮后，流程开始，然后您有 30 秒的时间按下盒子上的按钮并按住

约 3 秒，直到 LED 呈绿色闪烁。 （见下文）![登记](../../../en/adapterref/iobroker.hue-sync-box/admin/media/registration_timer.png)

6. 释放设备键后，几秒钟后将显示令牌并插入到字段中。 （见下文）

![令牌](admin/media/registration_successful.png)![令牌](../../../en/adapterref/iobroker.hue-sync-box/admin/media/token.png)

7. 现在您可以点击“添加”按钮，盒子将被添加，然后您只需点击“保存”按钮来保存配置。

   ![适配器_GUI](../../../en/adapterref/iobroker.hue-sync-box/admin/media/Adapter_GUI.png)

## 从适配器中删除色调同步框
＃＃＃ 注意力！要使用选项进行删除，令牌必须是通过适配器的注册功能创建的。
1. 打开适配器配置并单击按钮“删除”垃圾桶图标。
2. 打开一个新窗口，其中有 2 个选项，选择您要使用的选项。如果没有选择任何选项，则只会从中删除该框

   配置。 （见下文）

   - `从盒子中注销` - 盒子将从适配器中删除，令牌将从盒子中删除
   - `delete object` - 框将从适配器中删除，对象将从 ioBroker 中删除

     ![删除框](../../../en/adapterref/iobroker.hue-sync-box/admin/media/delete_device.png)

您也可以同时选择这两个选项，然后从适配器中删除框，从 ioBroker 中删除对象，并从框中删除令牌。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.3.5 (2023-02-06)
* (xXBJXx) Dependency update

### 0.3.4 (2023-01-15)
* (xXBJXx) fixed Sentry error reporting

### 0.3.3 (2023-01-14)
* (xXBJXx) fixed a bug

### 0.3.2 (2023-01-13)
* (xXBJXx) update dependencies
* (xXBJXx) Log output extended and improved
* (xXBJXx) Added data point for the response JSON
* (xXBJXx) Added data point "Reachable" to check if the box is reachable

### 0.3.1 (2022-12-20)
* (xXBJXx) Fixed error message that occurs after a successful registration.

### 0.3.0 (2022-12-20)
* (xXBJXx) added delete function for objects and Token
* (xXBJXx) added funktion for sync the `execution.intensity` state

### 0.2.1 (2022-12-17)
* (xXBJXx) typo corrected in README
* (xXBJXx) Fixed a bug when sending commands to the box

### 0.2.0 (2022-12-17)
* (xXBJXx) Optimization and improvement of the registration process

### 0.1.0 (2022-12-16)
* (Issi) First release

## License
MIT License

Copyright (c) 2022-2023 Issi <issi.dev.iobroker@gmail.com>

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