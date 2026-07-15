---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.extron/README.md
title: ioBroker.extron
hash: h1paaLh52KluYm/LgdLCe7PHvlUIE8NaYoL44gSOBzE=
---
![标识](../../../en/adapterref/iobroker.extron/admin/extron.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.extron.svg)
![下载](https://img.shields.io/npm/dm/iobroker.extron.svg)
![安装数量（最新）](http://iobroker.live/badges/extron-installed.svg)
![安装数量（稳定版）](http://iobroker.live/badges/extron-stable.svg)
![已知漏洞](https://snyk.io/test/github/Bannsaenger/ioBroker.extron/badge.svg)
![NPM](https://nodei.co/npm/iobroker.extron.png?downloads=true)

# IoBroker.extron
![测试与发布](https://github.com/bannsaenger/iobroker.extron/workflows/Test%20and%20Release/badge.svg)

＃＃ 参考
Extron®、CrossPoint®、DTP®、NetPA®、XPA® 和 XTP® 是 RGB Systems, Incorporated 的注册商标。参见 [www.extron.com](https://www.extron.com/article/termsprivacy)

该标志取自 Extron 公司的 Extron Control 应用程序。

Dante® 是 [奥迪纳特](https://www.audinate.com/) 的商标

## IoBroker 的 extron 适配器
Extron SIS适配器

用于控制 Extron 设备。

此适配器旨在通过 **S**imple Instruction Set 协议** 控制部分 Extron 音视频产品。

这些设备的功能非常强大。并非所有功能都适合通过此适配器和 iobroker 进行交互。

**请注意：**在适配器配置中选择设备类型后，以后将无法更改！

在 iobroker 安装中，可以存在多个来自此适配器的不同或相同类型的实例。对于未来的版本，您必须为每个实例在适配器配置中添加有效的许可证。

如果您是非商业组织或将其用于个人用途，则可以免费获得许可证。请联系作者。

### 支持的设备
- 8x2演示矩阵切换器（DTP2 CrossPoint 82）
- H.264 流媒体播放器和解码器 (SMD 202)
- 流媒体编码器（SME 211）
- 6x4 ProDSP 处理器，带 AEC 和 Dante（DMP 64 Plus C AT）
- 12x8 ProDSP 处理器（带 Dante 功能）（DMP 128 Plus AT）
- 12x8 ProDSP 处理器，带 AEC、VoIP 和 Dante 功能 (DMP 128 Plus C V AT)
- Dante 音频矩阵处理器，带 AEC（XMP 240 C AT）

## 待办事项
- 对话开始时会检查设备类型。但有时会失败。必须更改为更可靠的机制。
- 对使用的输入和输出进行更精细的选择，以减少 DSP 设备的数据库大小。
- 添加更多命令及其在数据库端的实现
- 改进网络重连机制

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (Bannsaenger) updated dependencies and issues from repository checker

### 0.3.0 (2025-10-28)

- (Bannsaenger) updated dependencies and issues from repository checker
- (Bannsaenger) migrate to NPM Trusted Publishing
- (Bannsaenger) updated to adapter-dev and release script
- (Bannsaenger) introducing jsonConfig
- (mschlgl) add more DSP SIS commands
- (mschlgl) enhanced network reconnect functionality, added DANTE remote commands, additional devices
- (Bannsaenger) updated dependencies and issues from repository checker

### 0.2.15 (2024-06-12)

- (mschlgl) fixed typo in io-package.json

### 0.2.14 (2024-06-10)

- (mschlgl) changed function createDatabase to use setObj()

### 0.2.13 (2024-06-06)

- (mschlgl) corrected instance.comon.titleLang to be set at startup, updated role definitions, added audiofile transfer functionality for DMPxxx

### 0.2.12

- (mschlgl) added instance.comon.title / .titleLang to be set at startup

## License

Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

Copyright (c) 2021-2026 Bannsaenger, https://github.com/bannsaenger <bannsaenger@gmx.de>

![CC BY-NC License](https://i.creativecommons.org/l/by-nc/4.0/88x31.png)

This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License
http://creativecommons.org/licenses/by-nc/4.0/

Short content:
This is a human-readable summary of (and not a substitute for) the license. Disclaimer.
You are free to:

Share — copy and redistribute the material in any medium or format
Adapt — remix, transform, and build upon the material

The licensor cannot revoke these freedoms as long as you follow the license terms.

Under the following terms:

Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

NonCommercial — You may not use the material for commercial purposes.

No additional restrictions — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.