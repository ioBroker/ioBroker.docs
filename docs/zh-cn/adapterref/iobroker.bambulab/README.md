---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bambulab/README.md
title: ioBroker.bambulab
hash: xF9K+twXSSsRjQblkO/bs0evJUr4bRoAZwa4pUEwSJg=
---
![NPM版本](https://img.shields.io/npm/v/iobroker.bambulab.svg)
![下载](https://img.shields.io/npm/dm/iobroker.bambulab.svg)
![安装数量](https://iobroker.live/badges/bambulab-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/bambulab-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.bambulab.png?downloads=true)

<img src="admin/bambulab.png" alt="标识" width="200"/>

# IoBroker.bambulab
**测试：** ![测试与发布](https://github.com/DrozmotiX/ioBroker.bambulab/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的 Bambulab 3D 打印适配器
＃＃ 入门
归功于[kmxak](https://forum.iobroker.net/user/kmxak)、[djalexz](https://forum.iobroker.net/user/djalexz)，所有其他参与并受到[此论坛帖子启发]的人](https://forum.iobroker.net/topic/61585/bambu-lab-3d-drucker-mqtt-integration)，该适配器将 Bambulab 3D 打印机集成到 ioBroker 中。

请在适配器设置中提供您的打印机 IP 地址、API 令牌和序列号；这些是与打印机的本地连接（不涉及云）所必需的。
这些凭据存储在本地，不会共享给第三方。

您必须选择您的打印机型号，只有X1允许推送消息，P1x系列需要按间隔设置请求（默认每5秒一次）

## 支持的型号
|打印机型号 |状态 |
|---------------|-------------------------|
| AMS | :white_check_mark: |
| A1 | :white_check_mark: |
| P1p | :white_check_mark: |
| P1 | :white_check_mark: |
| X1 | :white_check_mark: |

## 支持的命令
|命令 | X1C | X1 |点对点 | P1S | A1 |
|--------------------|---------------------|---------------------|--------------------------|--------------------------|--------------------------|
|定制 G 代码 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|暂停 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|简历 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|停止| :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|风扇辅助| :white_check_mark: | :white_check_mark: | :interrobang: 如果存在 | :white_check_mark: | :x: 没有硬件支持 |
|风扇室| :white_check_mark: | :white_check_mark: | :interrobang: 如果存在 | :white_check_mark: | :x: 没有硬件支持 |
|风扇工具头 | :white_check_mark: | :white_check_mark: | :interrobang: 如果存在 | :white_check_mark: | :white_check_mark: |
|光室| :white_check_mark: | :white_check_mark: | :interrobang: 如果存在 | :white_check_mark: | :white_check_mark: |
|光标志| :white_check_mark: | :white_check_mark: | :x: 没有硬件支持 | :x: 没有硬件支持 | :x: 没有硬件支持 |
|温床| :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|温度喷嘴| :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|速度级别 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |

＃＃ 去做
[ ] 重构/完善控制文件夹中的当前控制状态 [ ] 优化状态属性定义

＃＃ 支持我
如果您喜欢我的工作，请考虑个人捐赠（这是 DutchmanNL 的个人捐赠链接，与 ioBroker 项目无关！）[![捐赠](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Sentry.io 是什么以及向该公司的服务器报告什么？
Sentry.io 是一项供开发人员获取应用程序错误概览的服务。这正是在这个适配器中实现的。

当适配器崩溃或发生任何其他代码错误时，也会出现在 ioBroker 日志中的此错误消息会提交给 Sentry。
当您允许 iobroker GmbH 收集诊断数据时，您的安装 ID（这只是一个唯一的 ID **没有**关于您、电子邮件、姓名等的任何其他信息）也包含在内。
这允许 Sentry 对错误进行分组并显示有多少唯一用户受到此类错误的影响。
所有这些都有助于我提供基本上不会崩溃的无错误适配器。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.3.2 (2023-11-20)
* (DutchmanNL) Show finish time as ISO string

### 0.3.1 (2023-11-20)
* (DutchmanNL) Bugfix control P & A Series
* (DutchmanNL) Show end time as a separate state, resolves #53
* (DutchmanNL) Bugfix resolves missing fan speed value, resolves #36

### 0.3.0 (2023-11-19) - Release candidate
* (DutchmanNL) Update dependencies for state handling, resolves #50
* (DutchmanNL) Adjust log level for Unknown Message from error to debug, resolves #39
* (DutchmanNL) Add missing definitions to ensure correct creation of states, resolves #39
* (DutchmanNL) Reduce selection dropdown in admin config to printer series instead of a specific printer type
* (DutchmanNL) Update adapter code to support new firmware versions released by bambulab, please ensure your printer is up-to-date! resolves #46, resolves #38, resolves #26,

### 0.2.0 (2023-10-18) - Small fixes for new firmware version
* (DutchmanNL) Button for homing added, fixes #28
* (DutchmanNL) Bugfix: Translation of HMS-Error codes
* (DutchmanNL) Several bugfixes for situations no AMS is used
* (DutchmanNL) Remove control for LED calibration head (could damage hardware)

### 0.1.5 (2023-07-29) - HMS error codes Human readable, new functionalities added
#### Several state locations have been changed, advise to completely remove adapter & reinstall to upgrade
* (DutchmanNL) State for human-readable start time added
* (DutchmanNL) Speed level control implemented solves #10
* (DutchmanNL) Capability to control all fans implemented
* (DutchmanNL) Control bed & Nozzle temperature implemented
* (DutchmanNL) HMS error status indicator states implemented
* (DutchmanNL) Translations of HMS error codes implemented solves #9
* (DutchmanNL) Correct definitions for all temperature-related states
* (DutchmanNL) Control LED for tooling head Logo and calibration unit

### 0.1.4 (2023-07-28) - Support P1-series
* (DutchmanNL) Configuration page in admin updated
* (DutchmanNL) Information messages regarding incorrect type of bed-temperatures solved
* (DutchmanNL) Implemented P1-X printer series, polling interval required for this model (only X1 handles data push)

### 0.1.3 (2023-07-27) - Add new control options
* (DutchmanNL) add control for chamber fan, tooling head light and allow custom g-code

### 0.1.1 - Minor improvements
* (DutchmanNL) Translations added
* (DutchmanNL) Debug logging improved
* (DutchmanNL) Minor code improvements
* (DutchmanNL) Control states implemented
* (DutchmanNL) Test & release workflows updated
* (DutchmanNL) Encryption of token and device serial improved

### 0.1.0 initial release
* (DutchmanNL) initial release
* During startup adapter throws warnings, these can be ignored and will be solved in =< 0.5.0
* Control start/stop/resume and light available in >= 0.1.1

## License
MIT License

Copyright (c) 2023 DutchmanNL <oss@drozmotix.eu>

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