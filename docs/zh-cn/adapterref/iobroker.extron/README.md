---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.extron/README.md
title: ioBroker.extron
hash: gmjZSEUabprBE9/QQWdIuYgax6cnMmNaMF1Jacukr+0=
---
![标识](../../../en/adapterref/iobroker.extron/admin/extron.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.extron.svg)
![下载](https://img.shields.io/npm/dm/iobroker.extron.svg)
![安装数量（最新）](http://iobroker.live/badges/extron-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/extron-stable.svg)
![已知漏洞](https://snyk.io/test/github/Bannsaenger/ioBroker.extron/badge.svg)
![新平台](https://nodei.co/npm/iobroker.extron.png?downloads=true)

# IoBroker.extron
![测试与发布](https://github.com/bannsaenger/iobroker.extron/workflows/Test%20and%20Release/badge.svg)

＃＃ 参考
Extron®、CrossPoint®、DTP®、NetPA®、XPA®、XTP® 是 RGB Systems, Incorporated 的注册商标\ 请参阅[www.extron.com](https://www.extron.com/article/termsprivacy)

该徽标取自 Extron 的 Extron Control App

Dante® 是 [听觉](https://www.audinate.com/) 的商标

## 用于 ioBroker 的 extron 适配器
Extron SIS 适配器

控制 Extron 的设备。
此适配器旨在通过 **S**imple **I**nstruction **Set 协议控制某些 Extron 音频视频产品。
设备的功能范围非常广泛。并非所有功能都适合通过适配器和与 iobroker 的交互来支持。

**请注意：**当在适配器配置中选择设备类型时，将来无法更改！

在 iobroker 安装中，此适配器可以有多个不同或相同类型的实例。对于未来版本，您必须为每个实例向适配器配置添加有效许可证。
如果您是非商业组织或将其用于私人用途，您可以免费获得许可证。请联系作者。

### 支持的设备
- 8x2 演示矩阵切换器 (DTP2 CrossPoint 82)
- H.264 流媒体播放器和解码器 (SMD 202)
- 流媒体编码器（SME 211）
- 6x4 ProDSP 处理器，带 AEC 和 Dante (DMP 64 Plus C AT)
- 带 Dante 的 12x8 ProDSP 处理器 (DMP 128 Plus AT)
- 带有 AEC、VoIP 和 Dante 的 12x8 ProDSP 处理器 (DMP 128 Plus C V AT)
- 带 AEC 的 Dante 音频矩阵处理器 (XMP 240 C AT)

待办事项
- 对话开始时会检查设备类型。有时会失败。必须改为更可靠的机制。
- 对使用的输入和输出进行更精细的选择，以减少 DSP 设备的数据库大小
- 在数据库端添加更多命令及其实现
- 改进网络重连机制

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (Bannsaenger) updated to adapter-dev and release script
* (Bannsaenger) updated dependencies
* (Bannsaenger) introducing jsonConfig
* (mschlgl) add more DSP SIS commands
* (mschlgl) enhanced network reconnect functionality, added DANTE remote commands, additional devices

### 0.2.15 (2024-06-12)
* (mschlgl) fixed typo in io-package.json

### 0.2.14 (2024-06-10)
* (mschlgl) changed function createDatabase to use setObj()

### 0.2.13 (2024-06-06)
* (mschlgl) corrected instance.comon.titleLang to be set at startup, updated role definitions, added audiofile transfer functionality for DMPxxx

### 0.2.12
* (mschlgl) added instance.comon.title / .titleLang to be set at startup

### 0.2.11
* (mschlgl) added instance.device.name to be set at startup

### 0.2.10
* (mschlgl) corrected preset list handling on SMD202

### 0.2.9
* (mschlgl) disable subtitle command on startup added for SMD202

### 0.2.8
* (mschlgl) onStreamData command debug msg added

### 0.2.7
* (mschlgl) SMD202 preset list handling updated

### 0.2.6
* (mschlgl) added SMD202 preset list handling on startup
### 0.2.5
* (mschlgl) added SMD202 preset list handling

### 0.2.4
* (mschlgl) corrected typo in object_templates

### 0.2.3
* (mschlgl) fixed DMP128 file handling

### 0.2.2
* (mschlgl) fixed SMD202 loopmode command

### 0.2.1
* (mschlgl) updated log messages, improved group control on DMP128

### 0.2.0
* (Bannsaenger) updated dependencies

### 0.1.16
* (mschlgl) fixed group command issues, added statedelay log message on DMP128

### 0.1.15
* (mschlgl) added statedelay log message on DMP128

### 0.1.14
* (mschlgl) fixed group command issues on DMP128

### 0.1.13
* (mschlgl) fixed source code version issues

### 0.1.12
* (mschlgl) added support for channel preset selection in SMD202

### 0.1.11
* (Bannsaenger) fixed support for groups in DSP DMP128

### 0.1.10
* (mschlgl) added support for groups in DSP DMP128

### 0.1.9
* (Bannsaenger) fixed setting of info.connection in telnet mode

### 0.1.7
* (mschlgl) added plain Telnet communication

### 0.1.6
* (mschlgl) added limiter section for DMP128

### 0.1.5
* (mschlgl) fixes on device communication sme211

### 0.1.4
* (mschlgl) fixes on device communication cp82 and smd202

### 0.1.3
* (mschlgl) fixes on device communication and user flash file management

### 0.1.2
* (mschlgl) extend device/database structure to add user flash memory

### 0.1.1
* (mschlgl) extend device/database structure to add devices CP82, SME211, SMD202

### 0.1.0
* (mschlgl) extend device/database structure to cover all controllable elements

### 0.0.3
* (Bannsaenger) fix dependencies for integration test

### 0.0.2
* (Bannsaenger) prepared for checkin to iobroker.latest

### 0.0.1
* (Bannsaenger) initial release

## License
Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

Copyright (c) 2021-2024 Bannsaenger, https://github.com/bannsaenger <bannsaenger@gmx.de>

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