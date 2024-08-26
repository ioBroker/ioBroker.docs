---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.squeezeboxrpc/README.md
title: 通过 JSON/RPC 协议的 ioBroker Logitech Squeezebox 适配器
hash: ApQx3ISC5vhk8iOmN++3gMfLBg2a4pNQLkFTGh1r4eI=
---
![标识](../../../en/adapterref/iobroker.squeezeboxrpc/admin/squeezeboxrpc.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.squeezeboxrpc.svg)
![下载](https://img.shields.io/npm/dm/iobroker.squeezeboxrpc.svg)
![安装数量](https://iobroker.live/badges/squeezeboxrpc-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/squeezeboxrpc-stable.svg)
![新平台](https://nodei.co/npm/iobroker.squeezeboxrpc.png?downloads=true)

# IoBroker Logitech Squeezebox 适配器通过 JSON/RPC 协议
**测试：**![测试与发布](https://github.com/oweitman/ioBroker.squeezeboxrpc/workflows/Test%20and%20Release/badge.svg)

这是一个替代适配器，它使用 JSON/RPC 协议获取数据并向 Logitech 媒体服务器 ([语言管理系统](https://de.wikipedia.org/wiki/Logitech_Media_Server)) 发送命令，以控制连接的设备，例如

- 原生 [squeezebox](https://de.wikipedia.org/wiki/Squeezebox),
- 带有附加音频模块和基于小型 Linux 固件的树莓派

像[picoreplayer](https://picoreplayer.org/) 或 [max2play](https://www.max2play.com)。

- 带有插件 chromecast、airplay 或 UPnP/DLNA 设备

LMS 服务器可以管理/提供硬盘或 NAS 上的大量音乐收藏，并连接到不同的流媒体提供商，如 Spotify、Deezer、Soundcloud、shoutcast、tunein、napster、pandora、tidal 等

为什么需要另一个 squeezebox 适配器？

现有适配器使用 telnet 访问 LMS。telnet 有一些缺点。
LMS 的实际主 Web 界面还使用 rpc/json 协议来获取所有所需信息或向服务器/播放器发送命令。

＃＃ 特征
- LMS 服务提供的大部分数据均可在适配器中使用
- 有关播放器状态、歌曲标题、艺术家的详细信息，

专辑、艺术作品、播放列表

- 许多控制功能可播放、暂停、停止、前进、后退、重复，

随机播放、播放收藏夹、跳至时间（绝对和相对）、跳至播放列表索引（绝对和相对）、电源开/关和预设按钮

- 来自服务器的所有收藏夹和所有子级别
- 包含许多用于 iobroker-vis 组件的小部件，以创建自己的

控制用户界面（选择播放器、选择收藏夹、管理同步组、播放/暂停按钮、前进、后退、重复模式和随机播放模式选择）

vis-widgets 的文档可以在 vis 或[Widget 文档/德语](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.squeezeboxrpc/blob/master/widgets/squeezeboxrpc/doc.html) 中找到

＃＃ 安装
- 安装软件包
- 创建一个实例
- 使用罗技媒体服务器的 IP 配置实例

和端口（通常为 9000）

- 启动/重新启动实例

＃＃ 更新
- 在小部件代码发生更改并更新适配器、iobroker 之后

应将 web 文件上传到内部 web 服务器。用户报告说，有时不会发生这种情况，或者只是延迟。您可以使用以下命令触发此操作

iobroker 上传 squeezeboxpc

## 提供的状态
＃＃＃ 服务器
| 状态 | 描述 |
| ---------------- | ----------------------------- |
| LastScan | 上次音乐扫描的时间戳 |
| PlayerCount | 已知玩家数量 |
| PlayerCountOther | 已知的其他玩家数量 |
| PlayerCountSN | 已知 SN 的玩家数量 |
| TotalAlbums | 所有已知专辑的数量 |
| TotalArtists | 所有已知艺术家的数量 |
| TotalDuration | 所有歌曲的播放时间总和 |
| TotalGenres | 所有已知流派的数量 |
| TotalSongs | 所有已知歌曲的数量 |
| 同步组 | 现有同步组 |
| 版本 | LMS 版本 |
| mac | 服务器的 MAC-ID |
| uuid | LMS 实例的 uuid |

额外定义一个按钮来刷新收藏夹

| 按钮 | 描述 |
| ------------ | --------------------------------- |
| getFavorites | 从服务器请求所有收藏夹 |

### 收藏
对于每个收藏夹的所有属性都是只读的

| 状态 | 描述 |
| -------- | ------------------------------------------ |
| 姓名 | 收藏夹名称 |
| hasitems | 表示这是否是一个目录 |
| id | 收藏夹的id |
| 图片 | 收藏夹中的图像/图标（如果有）|
|音频 |音频 |
| 类型 | 示例类型：链接、文本、音频、播放列表 |
| url | 曲目的 url |

收藏夹的所有子级别（子目录）均可用。

### 玩家
对于每个玩家模式显示你是否可以改变值。所采取的行动在属性中描述

| 状态 | 模式 | 描述 |
| -------------------- | ---- | ----------------------------------------------------------------------------------------------------------------------------- |
| 警报 | R/- | 该玩家所有已注册的警报（JSON 格式）|
| 专辑 | R/- | 当前专辑名称 |
| 艺术家 | R/- | 艺术家姓名 |
| 艺术品网址 | R/- | 艺术品网址 |
| 比特率 | R/- | 曲目的比特率 |
| 已连接 | R/- | 玩家的连接状态 (0/1) |
| 持续时间 | R/- | 曲目持续时间 |
| 流派 | R/- | 曲目流派 |
| IP | R/- | 玩家的IP |
| 模式 | R/- | 播放/暂停/停止 |
| 玩家名称 | R/- | 玩家姓名 |
| 玩家ID | R/- | 玩家ID |
| 播放列表 | R/- | 实际播放列表为 JSON |
| PlaylistCurrentIndex | R/W | 通过指定<br>trackindex 或使用 + 或 - 进行相对操作<br>开始。示例 10,-3,+2 |
| 播放列表重复 | R/W | 重复歌曲(1)/播放列表(2)/不重复(0) |
| 播放列表随机播放 | R/W | 随机播放列表(1)/随机播放专辑(2)/不随机播放(0) |
| 电源 | R/W | 获取/设置播放器的电源状态关闭(0)/开启(1) |
| RadioName | R/- | 电台名称 |
| 评分 | R/- | 歌曲评级 |
| 远程 | R/- | 如果是远程流 (1) |
| SyncMaster | R/- | Syncmaster 的 ID/MAC |
| SyncSlaves | R/- | 同步组中玩家的ID/Mac |
| 时间 | R/- | 歌曲已用时间 |
| 标题 | R/- | 歌曲名称 |
| 类型 | R/- | 媒体类型（例如 MP3 收音机）|
| 网址 | R/- | 曲目/流的网址 |
| 音量 | R/W | 获取/设置播放器音量 (0-100) |
| 状态 | R/W | 获取/设置播放状态：暂停（0），播放（1），停止（2）|

如果 LMS 中可用，播放列表将提供以下属性。
某些属性取决于歌曲类型（流/文件/...）所有属性均为只读

| 属性 | 描述 |
| ---------- | --------------------------------- |
| 专辑 | 当前专辑名称 |
| 艺术家 | 艺术家姓名 |
| ArtworkUrl | 艺术品网址 |
| 比特率 | 曲目的比特率 |
| 持续时间 | 曲目持续时间 |
| RadioName | 电台名称 |
| 评分 | 歌曲评级 |
| 标题 | 歌名 |
| 类型 | 媒体类型（例如 MP3 收音机）|
| url | 曲目/流的 URL |
| 索引 | 播放列表中歌曲的索引 |
| id | 歌曲的id |

额外定义的按钮：

| 按钮 | 描述 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| btnForward | 下一首歌曲 |
| btnRewind | 上一首歌曲 |
| btnPreset\_\* | 在播放器或服务器中定义的 1-6 个按钮 |
| cmdGeneral | 一个通用命令字段，用于向玩家发送命令。每个字段必须用引号括起来。参数必须用逗号分隔。例如：“play”，“1”|
| cmdPlayFavorite | 播放收藏夹设置收藏夹的 id |
| cmdPlayUrl | 播放 url，例如“<http://50.7.77.114:8101/>；”|
| cmdGoTime | 通过指定秒数跳转到绝对位置，或者在秒数开头使用 + 或 - 跳转到相对位置。例如 100,-50,+50 |

有关更多信息，请访问 CLI 文档：

<https://github.com/elParaguayo/LMS-CLI-Documentation/blob/master/LMS-CLI.md>

待办事项
- 更多测试/修复
- 减少对其他包的依赖（squeezenode）
- 更多配置可选择打开/关闭功能以提高内存和性能
- 添加播放列表小部件
- 添加浏览小部件以在 LMS 菜单中浏览
- 添加玩家控制的圆形旋钮小部件
- 如果再次按下收藏按钮则停止播放。
- 服务器的 cmdGeneral。
- ~~添加telnet通讯从服务器获取推送事件，优化轮询~~
- ~~实现命令状态，为服务器和玩家放置用户个人命令（通过 json）~~
- ~~实现更多控制功能（选择播放列表位置播放、快进、快退、跳转到歌曲中的时间位置、重复歌曲、随机歌曲）~~
- ~~将播放列表作为 json 数组添加到 playerdata~~
- ~~为收藏夹添加艺术品（电台标志/播放列表封面）~~
- ~~实现更多级别（子目录）的收藏夹~~
- ~~自动发现罗技媒体服务器~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
   ### **WORK IN PROGRESS**
-->
### 1.3.15 (2024-08-09)

-   due to a adapter checker issue i have to remove the release 1.3.13 from npm.
    but changes from 1.3.13 are included in 1.3.14

### 1.3.14 (2024-08-05)

-   fix formatting

### 1.3.13 (2024-08-05)

-   revert the fix for artist handling due to negative effect of spotify

### 1.3.12 (2024-08-05)

-   improve cmdGoto handling by kairauer, close PR #74
-   fix issues from adapter checker
-   integrate squeezenode lib

### 1.3.11 (2024-08-05)

-   update adapter structure and switch to jsonconfig

### 1.3.10

-   getalbumartist as artist if setting of TPE2/TPE3 in LMS are changed"

### 1.3.9

-   fix error with deleting favorites
-   fix wrong type for datapoint

### 1.3.8

-   fix forward button widget

### 1.3.7

-   fix object creation of states in player modul

### 1.3.6

-   fix object creation of states

### 1.3.5

-   fix object creation for favorites

### 1.3.4

-   fix object creation for favorites / \* center widgets in sidebar

### 1.3.3

-   repair imageproxy for image datapoints of favorites

### 1.3.2

-   fix for Alarm contains only enabled Alarms

### 1.3.1

-   fix problem with git dependency url

### 1.3.0

-   fix problem wit setting own icon in player widget / \* add infos about alarms to a player datapoint

### 1.2.1

-   fix small issue in last version

### 1.2.0

-   improve handling of imageproxy artwork

### 1.1.0

-   make request of favorites configurable

### 1.0.1

-   change setstate/createobject logic
-   fix role and type for Mode-state
-   update tests
-   update dependency versions
-   improve io-package.json

### 1.0.0

-   prepare for stable repository

### 0.8.32

-   the adapter function iobroker.deleteChannel didnt works as expected. it didnt delete the whole subtree of states. now i implement my own delete function

### 0.8.31

-   change behaviour of deleting favorites

### 0.8.30

-   change from the issue of the adapter checker

### 0.8.29

-   optimize handling of player state power and connected

### 0.8.28

-   add advanced signaling function with telnet and fix some more authorization issues with LMS

### 0.8.27

-   initialization for the new calctype property if empty in volumebar

### 0.8.26

-   more improvement and fixing at volumebar / remove playlist widget from master. not ready yet

### 0.8.25

-   fixing css-settings on volumebar

### 0.8.24

-   volumebar didnt get events between the segments, change clickevent and calculation

### 0.8.23

-   adjust dependencies to remove vulnerabilities in dependend packages. alos remove travis due of unresolvable build-failures for win+node10/12

### 0.8.22

-   due to iobroker.controller 2.0 a command in the api changed (socket to vis.conn.\_socket)

### 0.8.21

-   add command für playing urls

### 0.8.20

-   remove node v6 test setting

### 0.8.19

-   shorten news history

### 0.8.18 (2019-06-27)

-   last minute changes.

### 0.8.17 (2019-06-26)

-   add more widges: playtime bar, string, number, datetime, image. add button margin to player and favorite widget, improve editing of viewindex. do some refactoring.

### 0.8.16 (2019-06-24)

-   resolve a cross browser issue for firefox. the style.font attribute is empty and you have to construct the font string by yourself

### 0.8.15 (2019-06-19)

-   minor issue with not ready states

### 0.8.14 (2019-06-19)

-   add syncgroups as new server-datapoint,add syncgroup widget, change some jquery event logic

### 0.8.13 (2019-06-16)

-   rename widgetset from squeezeboxrpcwidgets to squeezeboxrpc

### 0.8.12 (2019-06-16)

-   sync version with npm

### 0.8.11 (2019-06-15)

-   try to integrate the widgets into the main adapter

### 0.8.10 (2019-05-15)

-   another try to fix the EADDRINUSE error of the server discovery

### 0.8.9 (2019-05-15)

-   try to fix the EADDRINUSE error of the server discovery

### 0.8.8 (2019-05-14)

-   make discover configurable

### 0.8.7 (2019-05-11)

-   more control features (select playlist pos to play,ffwd,frew,jump to a time position in song,repeat song,random song)

### 0.8.6 (2019-05-10)

-   move some configuration options into seperate tabs

### 0.8.5 (2019-05-08)

-   change serverdiscovery interval method, remove some double cmd lines, additional minor changes advised from eslint

### 0.8.4

-   move some files to lib directory

### 0.8.3

-   close port for discovery on unload

### 0.8.2

-   sync version with npm

### 0.8.1

-   set compact mode flag

### 0.8.0

-   implementation of compact mode, change version to represent a realistic feature completness

### 0.0.9

-   debug options are now configurable

### 0.0.8

-   More playlist attributes + remove trailing and leading spaces from source

### 0.0.7

-   Add the playlist to each player as json

### 0.0.6

-   More config options

### 0.0.5

-   All levels/subdirectories of favorites are now available in iobroker

### 0.0.4

-   added the cmdPlayFavorite for each player

### 0.0.3

-   repair the no-data symbols for buttons in vis

### 0.0.2

-   added autodiscovery

### 0.0.1

-   initial release

## License

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

Copyright (c) 2019-2024 oweitman