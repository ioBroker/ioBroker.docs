---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bluesound/README.md
title: ioBroker.bluesound
hash: hknS78Hr/PfV0WDeZ2I8DZ08YPF5FaSXOSbu+hcDn/U=
---
![标识](../../../en/adapterref/iobroker.bluesound/admin/bluesound.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.bluesound.svg)
![下载](https://img.shields.io/npm/dm/iobroker.bluesound.svg)
![安装数量](https://iobroker.live/badges/bluesound-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/bluesound-stable.svg)
![NPM](https://nodei.co/npm/iobroker.bluesound.png?downloads=true)

# IoBroker.bluesound
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/bluesound/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**测试：** ![测试与发布](https://github.com/Uwe1958/ioBroker.bluesound/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 bluesound 适配器
用于控制 Bluesound 设备的适配器

## 包含的功能
适配器使用以下格式的 API 调用：http://--playerIP--:11000/xxx

启动时，预设值会从播放器读取并添加到“预设”通道。

播放器型号和名称存储在“信息”通道中。

播放器播放时，标题会设置在“信息”通道中。

玩家状态按“config.pollingtime”设置的间隔进行轮询，结果存储在“control.state”以及“info.\*”中。

PollingTime 值最大可达 120 秒。适配器不能使用大于 300 秒的值启动。默认值为 30 秒。

超时参数由可选参数“config.TimeOut”设置，用于设置 API 调用的超时时间。默认值为 2 秒。

已实现以下功能：

- 玩家停止（通过将“control.stop”设置为 true 触发）
- 玩家开始（通过将“control.start”设置为 true 触发）
- 播放器暂停（通过将“control.pause”设置为 true 触发）
- 播放预设xxx（通过将'.presets.preset(x).start'设置为true触发）
- 更改音量（通过更改“control.volume”触发）
- 随机播放列表（通过将“control.shuffle”设置为 true 触发，切换模式）
- 播放列表快进（通过将“control.forward”设置为 true 触发）
- 倒退播放列表（通过将“control.backward”设置为 true 触发）

LocalMusic 新增了库浏览功能。动态菜单列表位于“info.list”中。应将此对象设置为 JSON 表格的“对象 ID”，以便可视化当前菜单。对象“control.command”用于向播放器传递下一个命令。它通过定义为该表格的“选中 ID”进行更新。表格标题本身通过对象绑定“info.listheader”来更新，该绑定用于获取第一个标题的名称。为了获得更好的可视化效果，应仅显示第一个标题，并将其宽度设置为 100%。

所有内容都会向下展开至专辑级别（“歌曲”菜单除外，其中直接列出歌曲）。选择专辑后，其内容会立即播放，并替换当前播放列表的内容或将其添加到当前播放列表中。此行为取决于 `info.playliststate` 的值。如果该值为 true，则替换播放列表；否则，添加新内容。可以通过 `control.playlist`（切换模式按钮）更改此对象。每次按下此按钮，`info.playliststate` 的值都会反转。

新增图书馆检索功能。如果在“control.search”（通过浏览器中的输入框）中输入搜索字符串，搜索结果将显示在“info.list”中，并且可以像在图书馆浏览中一样进一步筛选。

当前播放列表的内容存储在对象 info.playlist（JSON 格式）中，可以直接通过这种方式查看。它也以 HTML 表格的形式存储在 info.playlisthtml 中，可以直接在 HTML 小部件中查看。可以使用 CSS 修改生成的表格格式。

```javascript
.playlist table {
    background-color: #514d4d;
    width: 100%;
    border-collapse: collapse;
    display: block;
    overflow-y: auto;
    max-height: 100%;
}
.playlist img {
    margin: 10px;
    height: 50px;
    width:  50px;
}

.playlist .title {
    color: #ffffff;
    font-size: 18px;
    padding-top: 10px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.playlist .artist {
    color: #888888;
    padding-bottom: 10px;
}

.playlist .current {
    color: #2f9bde;
    font-size: 18px;
    padding-top: 10px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.playlist div {
    height: 800px;
}
```

## Changelog
### 1.3.0 (2025-12-03)

- (Uwe Nagel) Library search added
- (Uwe Nagel) Add control.search
- (Uwe Nagel) Add info.playlisthtml
- (Uwe Nagel) Add info.playliststate
- (Uwe Nagel) Function setPlaylistToggle added
- (Uwe Nagel) Add control.playlist
- (Uwe Nagel) Function readPlaylist added
- (Uwe Nagel) Add info.playlist
- (Uwe Nagel) Library browsing added

### 1.2.1 (2025-10-18)

- (Uwe Nagel) Add info.list and control.command
- (Uwe Nagel) Changes according to ioBroker Check
- (Uwe Nagel) Bump @types/node from 24.5.2 to 24.6.1
- (Uwe Nagel) Bump chai from 6.0.1 to 6.2.0
- (Uwe Nagel) Bump typescript from 5.9.2 to 5.9.3
- (Uwe Nagel) Bump mocha from 11.7.2 to 11.7.3
- (Uwe Nagel) Correct error in main.js, update package-lock.json
- (Uwe Nagel) Update io-package.json and package.json
- (Uwe Nagel) Update .vscode/jsonConfig.json and .gitignore
- (Uwe Nagel) Resolve dependency errors
- (Uwe Nagel) Bump mocha from 11.1.0 to 11.7.1
- (Uwe Nagel) Bump globals from 16.2.0 to 16.3.0
- (Uwe Nagel) Bump @types/node from 24.0.8 to 24.1.0
- (Uwe Nagel) Bump typescript from 5.7.3 to 5.9.2
- (Uwe Nagel) Bump chai from 5.2.0 to 5.2.1
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