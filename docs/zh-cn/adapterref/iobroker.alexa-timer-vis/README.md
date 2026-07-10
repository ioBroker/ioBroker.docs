---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.alexa-timer-vis/README.md
title: ioBroker.alexa-timer-vis
hash: 4Ij+03Go4FeVDjHwOfuQyBO8lIuVcDAz5t/G/aneARI=
---
![标识](../../../en/adapterref/iobroker.alexa-timer-vis/admin/alexa-timer-vis.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.alexa-timer-vis.svg)
![下载](https://img.shields.io/npm/dm/iobroker.alexa-timer-vis.svg)
![安装数量](https://iobroker.live/badges/alexa-timer-vis-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/alexa-timer-vis-stable.svg)
![NPM](https://nodei.co/npm/iobroker.alexa-timer-vis.png?downloads=true)

# IoBroker.alexa-timer-vis
![测试与发布](https://github.com/MiRo1310/ioBroker.alexa-timer-vis/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 有关禁用错误报告的更多详细信息和说明，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

## 适用于 ioBroker 的 alexa-timer-vis 适配器
此适配器使用 Sentry 库自动向开发者报告异常和代码错误。更多详情以及如何禁用错误报告，请参阅 Sentry 插件文档！Sentry 报告功能从 js-controller 3.0 开始使用。

输出 Alexa 计时器以在可视化界面中显示

如果您喜欢，请考虑捐赠：

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=7QGL5CXJCUSCE)

这是我的可视化示例
![图片.png](../../../en/adapterref/iobroker.alexa-timer-vis/admin/timer1.png)

## 功能
通过 Alexa 语音输入创建一个或多个计时器，适配器会评估这些计时器并将其写入状态，以便在可视化界面中显示。这样，如果您同时激活了多个计时器，就能更清晰地了解它们的运行状态。

——需要 Alexa2 适配器——
- Vis 小部件尚未集成
每个定时器都有一个停止按钮。该按钮可以同时停止 Alexa 和适配器中的定时器。
- 可通过语音命令使用 Alexa 创建无限个计时器。
- 适配器启动时，将创建 4 个文件夹，其中包含所有状态。
- 通过 Alexa 的语音输入创建第 5 个及以上计时器后，将创建其他文件夹。

### 添加定时器（示例）
Alexa，定时器 5 分钟
Alexa，炸薯条，定时器9分钟
Alexa，设置一个1小时30分钟的定时器
Alexa，设置一个2小时的定时器
- Alexa，设置一个120分钟的定时器
Alexa，定时器9分钟，意大利面

### 定时器删除（示例）
Alexa，删除所有定时器
- Alexa，删除薯条计时器
- Alexa，删除5分钟计时器

如果您有任何改进建议或想要添加其他功能，请随时与我们联系。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 3.0.3 (2026-06-12)

- FIX: #295 Extend timer
- CHORE: Update dependencies

### 3.0.2 (2026-05-30)

- CHORE: Repository checker
- FIX: #288 Stop timer

### 3.0.1 (2026-05-23)

- FIX: Update connection state to true when initializing AlexaTimer

### 3.0.0 (2026-05-23)

- (copilot) Adapter requires node.js >= 22 now
- CHORE: Update dependencies
- FIX: #270 Errors has no existing object 
- FEAT: Complete refactored with new logic, it should work with all languages which are supported by Alexa2 adapter
- Chore: Alexa2 adapter version >= 3.28.1

### 2.2.2 (2025-12-12)

- FIX: Errors reported by sentry

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

Copyright (c) 2021-2026 Michael Roling <michael.roling@gmx.de>

MIT License

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