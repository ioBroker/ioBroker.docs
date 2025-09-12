---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bluesound/README.md
title: ioBroker.bluesound
hash: waoLcBOsb5gz0sO/1PPmjKFdIZ1WjwR/sSEfaDwQ7ww=
---
![标识](../../../en/adapterref/iobroker.bluesound/admin/bluesound.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.bluesound.svg)
![下载](https://img.shields.io/npm/dm/iobroker.bluesound.svg)
![安装数量](https://iobroker.live/badges/bluesound-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/bluesound-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.bluesound.png?downloads=true)

# IoBroker.bluesound
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/bluesound/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**测试：**![测试和发布](https://github.com/Uwe1958/ioBroker.bluesound/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 bluesound 适配器
用于控制 Bluesound 设备的适配器

## 包含的功能
适配器使用以下格式的 API 调用：http://--playerIP--:11000/xxx

启动时，预设会从播放器读取并添加到“预设”通道。
播放器型号和名称存储在“信息”通道中。
播放器播放时，标题会在“信息”通道中设置。

按照‘config.pollingtime’设置的时间间隔轮询播放器状态，并将结果存储在‘control.state’和‘info.\*’中。

PollingTime 值最多为 120 秒是合理的。适配器无法使用大于 300 秒的值启动。默认值为 30 秒。

可选参数“config.TimeOut”用于设置 API 调用的超时时间。默认值为 2 秒。

实现了以下功能：

- 玩家停止（通过将“control.stop”设置为 true 来触发）
- 玩家开始（通过将“control.start”设置为 true 来触发）
- 播放器暂停（通过将“control.pause”设置为 true 来触发）
- 播放 Presetxxx（通过将 '.presets.preset(x).start' 设置为 true 来触发）
- 改变音量（通过改变“control.volume”触发）
- 随机播放列表（通过将“control.shuffle”设置为 true 来触发，切换模式）
- 播放列表前进（通过将“control.forward”设置为 true 来触发）
- 播放列表向后播放（通过将“control.backward”设置为 true 来触发）

## Changelog

### **WORK IN PROGRESS**

- (Uwe Nagel) Further code cleaning (apiclient, getStateAsync)
- (Uwe Nagel) @types/xml2js added
- (Uwe Nagel) Move to eslint 9 and fix subsequent issues

### 1.2.0 (2025-07-24)

- (Uwe Nagel) Logic added to shift playlist forward/backward
- (Uwe Nagel) State roles updated
- (Uwe Nagel) Logic added to shuffle playlist
- (Uwe Nagel) Translated using Weblate (Dutch)
- (Uwe Nagel) Update test-and.release.yml to node 24.x
- (Uwe Nagel) Update testing to minimum node.js version 20

### 1.1.5 (2025-03-10)

- (Uwe Nagel) Create version 1.1.5
- (Uwe Nagel) Update info.connection regularly
- (Uwe Nagel) Update admin dependency to >=7.4.10
- (Uwe Nagel) Update @iobroker/adapter-dev to 1.3.0
- (Uwe Nagel) Fixing test action problems
- (Uwe Nagel) Bump mocha from 11.0.1 to 11.1.0
- (Uwe Nagel) Bump eslint-config-prettier from 9.1.0 to 10.0.1
- (Uwe Nagel) Bump chai and @types/chai
- (Uwe Nagel) Bump eslint from 9.16.0 to 9.19.0
- (Uwe Nagel) Corrected translations (de,pl)
- (Uwe Nagel) Update @iobroker/adapter-core to 3.2.3
- (Uwe Nagel) Update @iobroker/testing to 5.0.0

### 1.1.4 (2025-01-03)

- (Uwe Nagel) Correct common.news

### 1.1.3 (2025-01-03)

- (Uwe Nagel) Changed year in README
- (Uwe Nagel) Bump prettier from 3.4.1 to 3.4.2
- (Uwe Nagel) Bump mocha from 10.8.2 to 11.0.1
- (Uwe Nagel) Bump chai-as-promised and @types/chai-as-promised
- (Uwe Nagel) Bump sinon from 18.0.0 to 19.0.2
- (Uwe Nagel) Bump globals from 15.9.0 to 15.14.0

### 1.1.1 (2024-12-01)

- (Uwe Nagel) README.md cosmetics
- (Uwe Nagel) Added Weblate translation badge
- (Uwe Nagel) Bump cross-spawn from 7.0.3 to 7.0.6
- (Uwe Nagel) Switch to adapter-core3.2.2
- (Uwe Nagel) Corrected logic for remote volume changes

### 1.1.0 (2024-10-19)

- (Uwe Nagel) Potentially invalid characters are replaced before creating an object
- (Uwe Nagel) setTimeout used instead of setInterval, clearTimeout added
- (Uwe Nagel) Check values for PollingTime and TimeOut
- (Uwe Nagel) Missing sizes added
- (Uwe Nagel) State roles reevaluated
- (Uwe Nagel) subscribeState calls eliminated
- (Uwe Nagel) Instance prefixes in ObjectIds are omitted when calling setState()
- (Uwe Nagel) State change now honors ack flag
- (Uwe Nagel) PollingTime and TimeOUT changed to type number
- (Uwe Nagel) onReady() stopped when no IP is set
- (Uwe Nagel) Testing extended to node 22.x
- (Uwe Nagel) Example code removed

### 1.0.3 (2024-09-26)

- (Uwe Nagel) Parsing of /State corrected

### 1.0.2 (2024-09-19)

- (Uwe Nagel) Modified due to adapter checks

### 1.0.1 (2024-05-24)

- (Uwe Nagel) Added config descriptions
- (Uwe Nagel) Added translations for object descriptions
- (Uwe Nagel) Added role definition for all objects
- (Uwe Nagel) Added Timeout config Parameter

### 1.0.0 (2024-05-17)

- (Uwe Nagel) initial release

## License

MIT License

Copyright (c) 2025 Uwe Nagel <uwenagel@kabelmail.de>

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