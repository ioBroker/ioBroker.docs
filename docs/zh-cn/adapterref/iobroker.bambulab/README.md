---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bambulab/README.md
title: ioBroker.bambulab
hash: /u7lTibuTChR3pNxT1eoPHUWSPRhIN6Jie1/3qqnl60=
---
![NPM 版本](https://img.shields.io/npm/v/iobroker.bambulab.svg)
![下载](https://img.shields.io/npm/dm/iobroker.bambulab.svg)
![安装数量](https://iobroker.live/badges/bambulab-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/bambulab-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.bambulab.png?downloads=true)

<img src="admin/bambulab.png" alt="标识" width="200"/>

# IoBroker.bambulab
**测试：**![测试和发布](https://github.com/DrozmotiX/ioBroker.bambulab/workflows/Test%20and%20Release/badge.svg)

## Bambulab ioBroker 3D 打印适配器
＃＃ 入门
感谢[kmxak](https://forum.iobroker.net/user/kmxak)、[djalexz](https://forum.iobroker.net/user/djalexz)，以及所有其他参与并受到[此论坛帖子]启发的人](https://forum.iobroker.net/topic/61585/bambu-lab-3d-drucker-mqtt-integration)，此适配器将 Bambulab 3D 打印机集成到 ioBroker 中。

请在适配器设置中提供您的打印机 IP 地址、API 令牌和序列号；这些是本地连接（不涉及云）打印机所必需的。
这些凭据存储在本地，不会与第三方共享。

## 查找 API 令牌和序列号
API 令牌和序列号的位置取决于您的打印机型号：

### A1/A1 迷你系列
1. 在打印机显示屏上导航至**设置** → **网络**
2. 启用**“仅 LAN 模式”**（nur Lan-Modus）
3. 启用后，将显示 IP 地址、访问令牌和序列号

### P1S系列
1. 在打印机显示屏上导航至**设置** → **网络**
2. 访问令牌在网络设置中直接可见（无需 LAN 模式）
3. 序列号可在同一菜单或设备信息中找到

### X1/X1C 系列
1. 在打印机显示屏上导航至**设置** → **网络**
2. 访问令牌在网络设置中直接可见
3. 序列号可在同一菜单或设备信息中找到

**注意：**您必须在适配器设置中正确选择您的打印机型号。只有 X1 系列允许推送消息，P1x 系列需要按间隔设置请求（默认每 5 秒一次）。

## 支持的型号
| 打印机型号 | 状态 |
|---------------|-------------------------|
| AMS | :白色勾号: |
| A1 | :白色复选标记: |
| P1p | :白色勾号: |
| P1s | :白色勾号: |
| X1 | :白色复选标记: |

## 支持的命令
| 命令 | X1C | X1 | P1P | P1S | A1 |
|--------------------|---------------------|---------------------|--------------------------|--------------------------|--------------------------|
| 自定义 g 代码 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| 暂停 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| 继续 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| 停止 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Fan-Aux | :white_check_mark: | :white_check_mark: | :interrobang: 如果存在 | :white_check_mark: | :x: 无硬件支持 |
| 扇形室 | :white_check_mark: | :white_check_mark: | :interrobang: 如果存在 | :white_check_mark: | :x: 无硬件支持 |
| Fan-ToolHead | :white_check_mark: | :white_check_mark: | :interrobang: 如果存在 | :white_check_mark: | :white_check_mark: |
| 光室 | :white_check_mark: | :white_check_mark: | :interrobang: 如果存在 | :white_check_mark: | :white_check_mark: |
| 灯光标志 | :white_check_mark: | :white_check_mark: | :x: 不支持硬件 | :x: 不支持硬件 | :x: 不支持硬件 |
| 温度床 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| 温度-喷嘴 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| 速度等级 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |

## 待办事项
[ ] 重构/完成控制文件夹中的当前控制状态 [ ] 优化状态属性定义

## 支持我
如果您喜欢我的作品，请考虑个人捐赠（这是 DutchmanNL 的个人捐赠链接，与 ioBroker 项目无关！）[![捐赠]（https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/master/admin/button.png）](http://paypal.me/DutchmanNL)

## Sentry.io 是什么？该公司的服务器会报告什么？
Sentry.io 是一款帮助开发者获取应用程序错误概览的服务。这个适配器正是实现了这个功能。

当适配器崩溃或发生任何其他代码错误时，ioBroker 日志中也会显示此错误消息，并将其提交给 Sentry。
如果您允许 iobroker GmbH 收集诊断数据，您的安装 ID（这只是一个唯一的 ID，不包含任何关于您的其他信息，例如电子邮件、姓名等）也会被包含在内。
这使得 Sentry 能够对错误进行分组，并显示有多少独立用户受到此类错误的影响。
所有这些都有助于我提供几乎不会崩溃的无错误适配器。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.4.2 (2025-09-16)
* (DutchmanNL) Improve error messages if printer is offline or not reachable. #xxx
* (DutchmanNL) Solve several type definition issues. #203, #202, #201, #200, #199, #198
* (DutchmanNL & Copilot) Fix type conversion errors by replacing deprecated `tonumber` with proper `TOINTEGER`/`TOFLOAT` modifiers. #197
* (DutchmanNL & Copilot) Add missing state attribute definitions for HD2 printer during printing (height, platform, tool, mapping). Fixes #194

### 0.4.1 (2025-09-13)
* (DutchmanNL & Copilot) Fix HMS error code translations timeout error handling (#183)
* (DutchmanNL & Copilot) Block dangerous G-code commands during printing for safety (#185)
* (DutchmanNL & Copilot) Fix P1S fan speed display issues - double conversion and incorrect mapping (#184)
* (DutchmanNL & Copilot) Add comprehensive API token location documentation for all Bambulab printer models (#182)

### 0.4.0 (2025-09-13)
* (DutchmanNL) Add missing state definitions to resolve adapter warnings (#181)
* (DutchmanNL) Empty finishTime and avoid time calculation when not printing (#179)
* (DutchmanNL) Fix MQTT reconnection to prevent maximum call stack size exceeded error (#177)

### 0.3.5 (2025-09-13)
* (DutchmanNL & Copilot) Fix several type mismatches #143 #139 #130
* (DutchmanNL) Updated missing definitions for full MQTT API incl H2D
* (DutchmanNL & Copilot) Fix repository checker issues and improve admin UI compatibility

### 0.3.4 (2024-10-28) - Door Indicator Fixes #115
* (DutchmanNL) Added doorOpen indicator, Fixes [#115](https://github.com/DrozmotiX/ioBroker.bambulab/issues/115)

### 0.3.3 (2024-10-27) - Bugfixes
* (DutchmanNL) update state definitions, (solves [#77](https://github.com/DrozmotiX/ioBroker.bambulab/issues/77) [#58](https://github.com/DrozmotiX/ioBroker.bambulab/issues/58))
* (DutchmanNL) update connection handling, show connection error only once (Solves #99 #78 #74)

## License
MIT License

Copyright (c) 2025 DutchmanNL <oss@drozmotix.eu>

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