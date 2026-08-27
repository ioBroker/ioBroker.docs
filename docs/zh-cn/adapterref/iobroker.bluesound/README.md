---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bluesound/README.md
title: ioBroker.bluesound
hash: Q65wKdiUPTRT8YM4q7P+jbTDA99xbudhCWw78zEzm/I=
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

启动时，预设值会从播放器读取并添加到“presets”通道。

播放器型号和名称存储在“info”通道中。

播放器播放时，标题会设置在“info”通道中。

玩家状态按 _'config.pollingtime'_ 设置的间隔进行轮询，结果存储在 _'control.state'_ 以及 _'info.\*'_ 中。

PollingTime 值最大可达 120 秒。适配器不能使用大于 300 秒的值启动。默认值为 30 秒。

超时参数由可选参数 _'config.TimeOut'_ 设置，用于设置 API 调用的超时时间。默认值为 2 秒。

已实现以下功能：

- 玩家停止（通过将 _'control.stop'_ 设置为 true 触发）
- 玩家开始（通过将 _'control.start'_ 设置为 true 触发）
- 播放器暂停（通过将“control.pause”设置为 true 触发）
- 播放预设xxx（通过将 _'.presets.preset(x).start'_ 设置为 true 触发）
- 更改音量（由更改 _'control.volume'_ 触发）
- 随机播放列表（通过将 _'control.shuffle'_ 设置为 true 来触发，切换模式）
- 播放列表快进（通过将 _'control.forward'_ 设置为 true 触发）
- 向后播放播放列表（通过将 _'control.backward'_ 设置为 true 来触发）

LocalMusic 新增了库浏览功能。动态菜单列表位于 `info.list` 中。应将此对象设置为 JSON 表格的“对象 ID”，以便可视化当前菜单。`control.command` 对象用于向播放器传递下一个命令。它通过定义为该表格的“选中 ID”进行更新。表格标题本身通过对象绑定使用 `info.listheader` 来更新，该绑定用于获取第一个标题的名称。为了获得更好的可视化效果，应仅显示第一个标题，并将其宽度设置为 100%。

所有内容都会向下展开至专辑级别（“歌曲”菜单除外，其中直接列出歌曲）。选择专辑后，其内容会立即播放，并替换当前播放列表的内容或将其添加到当前播放列表中。此行为取决于 `info.playliststate` 的值。如果该值为 true，则替换播放列表；否则，添加新内容。此对象可通过 `control.playlist`（带切换模式的按钮）进行更改。每次按下此按钮，`info.playliststate` 的值都会反转。

新增图书馆搜索功能。如果在“control.search”（通过浏览器中的输入框）中输入搜索字符串，搜索结果将显示在“info.list”中，并且可以像在图书馆浏览中一样进一步筛选。

现在还可以收听电台音乐。电台以菜单形式呈现，播放器会提供这些电台。选择电台后，音乐会立即播放。

现在可从以下来源收听流媒体：Amazon、TuneIn、Calm Radio、Deezer、Neil Young Archives、Qobuz、Radio Paradise 和 Tidal。每个服务都有不同的菜单结构，这些结构已内置于应用程序中。同样，我们使用 `info.list` 对象来可视化菜单。

当前播放列表的内容存储在对象 `info.playlist`（JSON 格式）中，可以直接通过 JSON 格式查看。它也以 HTML 表格的形式存储在 `info.playlisthtml` 中，可以直接在 HTML 小部件中查看。可以使用 CSS 修改生成的表格格式（示例如下）。

```javascript
.playlist table {
    background-color: rgba(0, 0, 0, 0.0) !important;
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
### 1.5.0 (2026-08-10)

- (Uwe Nagel) Amazon service added
- (Uwe Nagel) TuneIn service added
- (Uwe Nagel) Deezer service added
- (Uwe Nagel) NYA service added
- (Uwe Nagel) Qobuz service added
- (Uwe Nagel) RadioParadise service added
- (Uwe Nagel) Tidal service added

### 1.4.0 (2026-07-25)

- (Uwe Nagel) Fixes @types/node version
- (Uwe Nagel) Corrected translation files
- (Uwe Nagel) Bump @iobroker/adapter-core from 3.3.2 to 3.4.1
- (Uwe Nagel) Translation converted to short format
- (dependabot) Bump @iobroker/eslint-config from 2.2.0 to 2.3.4
- (dependabot) Bump axios from 1.16.0 to 1.16.1
- (dependabot) Bump @types/node from 25.6.0 to 25.9.1
- (Uwe Nagel) Radio stations added

### 1.3.1 (2026-06-05)

- (copilot) Adapter requires node.js >= 22 now
- (Uwe Nagel) Code consolidation and update @alcalzone/release-script to 5.2.1
- (Uwe Nagel) Fixed issue 184
- (Uwe Nagel) Fixed issue 152
- (Uwe Nagel) Fixed issue 162

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

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 Uwe Nagel <uwenagel@kabelmail.de>

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