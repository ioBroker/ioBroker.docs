---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.chromecast/README.md
title: ioBroker.chromecast
hash: d/Aq7vBZic6A+uuE8QF2I3SiZMupnLSB0tjyEXjn8Vs=
---
![标识](../../../en/adapterref/iobroker.chromecast/admin/home.png)

![安装数量](http://iobroker.live/badges/chromecast-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.chromecast.svg)
![下载](https://img.shields.io/npm/dm/iobroker.chromecast.svg)
![构建状态](https://travis-ci.org/angelnu/ioBroker.chromecast.svg?branch=master)
![新产品管理](https://nodei.co/npm/iobroker.chromecast.png?downloads=true)

# IoBroker.chromecast
## IoBroker 的 Google Home 适配器
此插件允许检测视频和/或音频 Google Home 设备。对于每个检测到的 Home 设备，都会创建一个 ioBroker 设备。此设备显示设备的状态并允许向其发送新的 URL 以进行投射。

建立在以下项目之上：

  * [ioBroker](http://www.iobroker.net)
  * [node-castv2-client](https://github.com/thibauts/node-castv2-client) 作为家庭客户端库。

＃＃ 指示
1.安装到ioBroker
   1. 转到您的 ioBroker 适配器选项卡
   2.选择并安装Google Home适配器
2. 添加 Google Home 适配器的实例
   * 安装后应该会自动运行
3.（可选）如果您计划流式传输本地文件，则需要配置适配器
   * 您需要有一个 ioBroker Web 服务器实例
4. 检查您的日志：您应该看到有关检测到的设备的日志
5. 写一个 URL 如 [http://edge.live.mp3.mdn.newmedia.nacamar.net/ps-dieneue_rock/livestream_hi.mp3](http://edge.live.mp3.mdn.newmedia.nacamar .net/ps-dieneue_rock/livestream_hi.mp3) 到 chromecast.0.`<您的 chromecast 名称>`.player.url2play
6. URL 应该开始在您的设备上播放

＃＃ 特征
* 使用多播 DNS 检测设备
  * 可选择在管理面板中添加额外的手动配置设备
* 为每个找到的设备创建 ioBroker 对象
* 状态、播放器、媒体和元数据通道
* 从适配器控制 Google Home 设备
  * 设置音量
  *静音/取消静音
  * 停止广播
  * 暂停
  * 播放网址 (chromecast.0.`<你的 Google Home 名称>`.player.url2play)
    * 用 MP3 测试
      * 格式的完整列表 [此处](https://developers.google.com/cast/docs/media)。
    * 当 url 不以 http 开头时，则假定这是一个本地文件
      * 通过 ioBroker Web 服务器导出文件
    * 它只播放播放列表文件中的第一个文件，例如 .m3u
* 可见小部件
  * 注意：需要 [patched vis adapter](https://github.com/angelnu/ioBroker.vis)。
* 初步支持 Chromecast 音频组
  * 注意：这不适用于 SSDP -> 在适配器设置中默认禁用
* 再次播放上次播放的流：只需将 _chromecast.0.`<your device>`.status.playing_ 设置为 _true_

＃＃ 有什么不见了？
* 添加状态机来跟踪状态：检测到 -> 已连接 -> 播放器加载器 -> 正在播放
* 添加重试：有时 Google Home 无法响应请求
* 更多测试

## Changelog
### 3.0.0 (2021-08-25)
* (jey cee) Breaking change: Object IDs are now mac addresses instead names 


### 2.3.1 (2019-10-23)
* (angelnu) Tested compact mode works in Linux and Windows

### 2.2.3 (2019-03-19)
* news

### 2.2.2 (2019-02-01)
* Fix missing reference when mDNS update is received

### 2.2.1 (2019-01-29)
* Remove mandatory dependency on vis adapter

### 2.2.0 (2019-01-15)
* Option to configure device URLs manually (when devices are in a different subnetwork)

### 2.1.5 (2019-01-14)
* Reconnect on mDNS updates

### 2.0.2 (2019-01-06)
* (angelnu) compact mode support

### 2.0.0 (2018-07-22)
* (bluefox) refactoring and add new states for material

### 1.4.3 (2018-04-03)
* Added enabled flag so some adapters can be ignored

### 1.4.2 (2018-01-30)
* Always use volume parameter for announcements

### 1.4.1 (2018-01-06)
* Fix for languages in io-package

### 1.4.0 (2017.11.26)
* (angelnu) Support for additional languages
* (angelnu) Support for version 3 of the Admin adapter

### 1.3.4 (2017.11.26)
* (angelnu) Update to latest cast2-player - wait for announcement

### 1.3.4 (2017.11.25)
* (angelnu) Rename to Google Home

### 1.3.3 (2017.11.24)
* (bluefox) bump a version

### 1.3.2
* (Vegetto) recognize uncompleted playlist status and trigger a new getStatus

### 1.3.1
* (Vegetto) Fix updateStates to accept null values
* (Vegetto) Add playlist currentItemdId

### 1.3.0
* (Vegetto) Create playlist channel with raw playlist and repeat modes
* (Vegetto) Moved jump and repeatMode from player to plalist channel

### 1.2.2
* (Vegetto) Forgot to step up version.

### 1.2.2
* (Vegetto) Update to player 1.1.3 - support relative paths in playlists

### 1.2.1
* (Vegetto) Update to player 1.1.2 - reconnect on url2play

### 1.2.0
* (Vegetto) Mayor rework
  * Chromecast player and scanner splitted into a separated module
  * **Support for playlists**
  * Improved MIME detection - **OGG files work now**
  * Support for **announcements** - playlist resume after completing announcement
  * Support to **jump** between playlist entries

### 1.1.3
* (Vegetto) bugfix - media title was not kept to url when streamTitle not present

### 1.1.2
* (Vegetto) Update npm dependencies in package.json to latest versions

### 1.1.1
* (Vegetto) bugfix - not playing when another chromecast playing same url
* (Vegetto) added additional logs

### 1.1.0
* (Vegetto) **Added support for playlist m3u, asx and pls files - play first entry**

### 1.0.9
* (Vegetto) Do not use this in callbacks. Replaced with _that_
* (Vegetto) Fix contentId not being updated. This was breaking the _play last stream_ feature

### 1.0.8
* (Vegetto) Do not try to stop if not playing

### 1.0.7
* (Vegetto) Show MultizoneLeader as playing
* (Vegetto) Set pause state to false when modified and device is not playing

### 1.0.6
* (Vegetto) Fix widget crashing when devId is not set

### 1.0.2
* (Vegetto) Fix deprecation warning - use dns-txt instead of mdns-txt

### 1.0.1
* (Vegetto) Fix exception

### 1.0.0
* (Vegetto) **Try to play last played URL when setting playing state to true**
* (Vegetto) Fix jshint and jscs findings

### 0.2.1
* (Vegetto) Update readme
* (Vegetto) Integrated into iobroker: listed there

### 0.2.0
* (Vegetto) Add vis widget (Alpha)
* (Vegetto) Performance improvements

### 0.1.4
* (Vegetto) Stability fixes - error handling, race-condition fixes, etc
* (Vegetto) Clean getMediaInfo handler when disconnecting player
* (Vegetto) Added support to retrieve ICY metadata from https sources
* (Vegetto) Moved code for querying media info to a separate class
* (Vegetto) **Support dynamic IP/port changes (audio groups)**

### 0.1.3
* (Vegetto) Added re-connection with retries. Will try for up 42 hours.
* (Vegetto) Support for triggering a reconnection by writing to <device>.status.connected
* (Vegetto) Fixed race condition when playing local file
* (Vegetto) **Added support for playing local files**
* (Bluefox) Russian translations
* (Vegetto) Update stale metadata when not present in player status
* (Vegetto) **Initial support for audio groups**
* (Vegetto) **Retrieve media type and title from URLs that support ICY**
* (Vegetto) Added displayName, isActiveInput and isStandBy status

### 0.1.2
* (Vegetto) Merge base

### 0.1.1
* (Vegetto) Fix package syntax
* (Vegetto) Fix package dependencies

### 0.1.0
* (Vegetto) Initial release

## License
The MIT License (MIT)

Copyright (c) 2015-2021 Vegetto <iobroker@angelnu.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.