---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.kodi/README.md
title: Kodi for ioBroker（JSON-RPC API）
hash: ZUy0c9iz7AxVkXOTVvExriEdabj/qUiYSFRR7DnLiS0=
---
![标识](../../../en/adapterref/iobroker.kodi/admin/kodi.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.kodi.svg)
![安装数量](http://iobroker.live/badges/kodi-installed.svg)
![下载](https://img.shields.io/npm/dm/iobroker.kodi.svg)
![捐](https://img.shields.io/badge/Donate-PayPal-green.svg)
![NPM](https://nodei.co/npm/iobroker.kodi.png?downloads=true)

# Kodi for ioBroker（JSON-RPC API）
[![测试](https://github.com/instalator/iobroker.kodi/workflows/Test%20and%20Release/badge.svg)](https://github.com/instalator/ioBroker.kodi/actions/)

[英文手册](https://github.com/instalator/ioBroker.kodi/wiki/en_EN)

您可以找到有关 JSON-RPC API 的官方 KODI 文档 [这里](http://kodi.wiki/view/JSON-RPC_API)以及所有可用命令的完整列表（适用于协议版本6）[这里]](http://kodi.wiki/view/JSON-RPC_API/v6)。

## KODI 配置
启用远程控制和Web服务器。

![启用远程控制。](../../../en/adapterref/iobroker.kodi/admin/remote.png)

JSON-RPC API 默认使用 **端口 9090**。要更改端口，需要修改 [advancedsettings.xml](http://kodi.wiki/view/AdvancedSettings.xml) 文件。

注意：默认情况下，advancedsettings.xml 文件不存在。您必须先创建它！

```xml
<jsonrpc>
    <compactoutput>true</compactoutput>
    <tcpport>9999</tcpport>
</jsonrpc>
```

## 适配器配置
在适配器设置中，指定 JSON-RPC API 的 IP 地址和端口（默认 9090），以及访问 Kodi Web 服务器的登录名/密码。

＃＃ 用法
### 显示通知：
重要提示：如果使用消息标题，则必须将其置于消息正文之前（例如：警告；漏水）。其他参数的位置并不关键。

**图像：** 信息级别

* 'info' - 0（默认值），
* '警告' - 1，
* '错误' - 2.

**displaytime:** 消息显示时间，以毫秒为单位，最小值为 1500，最大值为 30000 毫秒。

**例子：**

* 1；警告；漏水；15000
* 警告；漏水；2；10000
* 警告；漏水
* 漏水

您还可以通过 JavaScript 适配器发送消息：

```js
sendTo("kodi.0", {
    message:  'Possible water leak', // Message text
    title:    'WARNING!!!', // Message title
    image: 'https://raw.githubusercontent.com/instalator/ioBroker.kodi/master/admin/kodi.png', // Icon URL
    delay: 7000 // Message display time in milliseconds (minimum 1500, maximum 30000 ms)
});
```

### SwitchPVR：
在播放列表中按频道名称切换PVR IPTV频道。

**示例：** 可以通过频道全称或“discover”找到Discovery Science频道。

＃＃＃ YouTube：
要打开 YouTube 视频，只需将视频代码写入此状态即可。从 0.1.5 版本开始，您可以插入视频的直接链接，以及播放列表的代码或完整链接。

例如：要打开此 [视频](https://www.youtube.com/watch?v=Bvmxr24D4TA)，您需要将状态设置为 - Bvmxr24D4TA

＃＃＃ 打开：
在此处输入网络媒体内容的链接或本地媒体文件的路径。

输入内容后，KODI 播放器将开始播放。

＃＃＃ 位置：
当前播放位置。您也可以将目标位置写入此状态，KODI 将立即切换到该位置播放。

＃＃＃ 寻找：
当前播放位置值，以 0 到 100 之间的百分比表示。

＃＃＃ 重复：
重复播放，接受以下值：

* 关闭 - 禁用重复播放
* 开启 - 重复播放当前曲目
* 全部 - 重复播放整个播放列表

### 随机排序：
随机播放播放列表中的曲目。

接受的值 `true` 和 `false`

＃＃＃ 玩：
开始播放（真，假）

＃＃＃ 速度：
播放速度。固定值（-32、-16、-8、-4、-2、-1、0、1、2、4、8、16、32），以及“递增”和“递减”选项。

### 目录：
在此处输入文件夹或磁盘的路径。系统会将指定文件夹或磁盘的目录列表写入此状态。

### 激活窗口：
在播放器中激活一个窗口。支持以下列表：

```
"home", "programs", "pictures", "filemanager", "files", "settings", "music", "video", "videos", "tv", "pvr", "pvrguideinfo", "pvrrecordinginfo", "pvrtimersetting", "pvrgroupmanager", "pvrchannelmanager", "pvrguidesearch", "pvrchannelscan", "pvrupdateprogress", "pvrosdchannels", "pvrosdguide", "pvrosddirector", "pvrosdcutter", "pvrosdteletext", "systeminfo", "testpattern", "screencalibration", "guicalibration", "picturessettings", "programssettings", "weathersettings", "musicsettings", "systemsettings", "videossettings", "networksettings", "servicesettings", "appearancesettings", "pvrsettings", "tvsettings", "scripts", "videofiles", "videolibrary", "videoplaylist", "loginscreen", "profiles", "skinsettings", "addonbrowser", "yesnodialog", "progressdialog", "virtualkeyboard", "volumebar", "submenu", "favourites", "contextmenu", "infodialog", "numericinput", "gamepadinput", "shutdownmenu", "mutebug", "playercontrols", "seekbar", "musicosd", "addonsettings", "visualisationsettings", "visualisationpresetlist", "osdvideosettings", "osdaudiosettings", "videobookmarks", "filebrowser", "networksetup", "mediasource", "profilesettings", "locksettings", "contentsettings", "songinformation", "smartplaylisteditor", "smartplaylistrule", "busydialog", "pictureinfo", "accesspoints", "fullscreeninfo", "karaokeselector", "karaokelargeselector", "sliderdialog", "addoninformation", "musicplaylist", "musicfiles", "musiclibrary", "musicplaylisteditor", "teletext", "selectdialog", "musicinformation", "okdialog", "movieinformation", "textviewer", "fullscreenvideo", "fullscreenlivetv", "visualisation", "slideshow", "filestackingdialog", "karaoke", "weather", "screensaver", "videoosd", "videomenu", "videotimeseek", "musicoverlay", "videooverlay", "startwindow", "startup", "peripherals", "peripheralsettings", "extendedprogressdialog", "mediafilter".
```

### 执行操作：
您可以执行以下操作之一：

```
"left", "right", "up", "down", "pageup", "pagedown", "select", "highlight", "parentdir", "parentfolder", "back", "previousmenu", "info", "pause", "stop", "skipnext", "skipprevious", "fullscreen", "aspectratio", "stepforward", "stepback", "bigstepforward", "bigstepback", "osd", "showsubtitles", "nextsubtitle", "codecinfo", "nextpicture", "previouspicture", "zoomout", "zoomin", "playlist", "queue", "zoomnormal", "zoomlevel1", "zoomlevel2", "zoomlevel3", "zoomlevel4", "zoomlevel5", "zoomlevel6", "zoomlevel7", "zoomlevel8", "zoomlevel9", "nextcalibration", "resetcalibration", "analogmove", "rotate", "rotateccw", "close", "subtitledelayminus", "subtitledelay", "subtitledelayplus", "audiodelayminus", "audiodelay", "audiodelayplus", "subtitleshiftup", "subtitleshiftdown", "subtitlealign", "audionextlanguage", "verticalshiftup", "verticalshiftdown", "nextresolution", "audiotoggledigital", "number0", "number1", "number2", "number3", "number4", "number5", "number6", "number7", "number8", "number9", "osdleft", "osdright", "osdup", "osddown", "osdselect", "osdvalueplus", "osdvalueminus", "smallstepback", "fastforward", "rewind", "play", "playpause", "delete", "copy", "move", "mplayerosd", "hidesubmenu", "screenshot", "rename", "togglewatched", "scanitem", "reloadkeymaps", "volumeup", "volumedown", "mute", "backspace", "scrollup", "scrolldown", "analogfastforward", "analogrewind", "moveitemup", "moveitemdown", "contextmenu", "shift", "symbols", "cursorleft", "cursorright", "showtime", "analogseekforward", "analogseekback", "showpreset", "presetlist", "nextpreset", "previouspreset", "lockpreset", "randompreset", "increasevisrating", "decreasevisrating", "showvideomenu", "enter", "increaserating", "decreaserating", "togglefullscreen", "nextscene", "previousscene", "nextletter", "prevletter", "jumpsms2", "jumpsms3", "jumpsms4", "jumpsms5", "jumpsms6", "jumpsms7", "jumpsms8", "jumpsms9", "filter", "filterclear", "filtersms2", "filtersms3", "filtersms4", "filtersms5", "filtersms6", "filtersms7", "filtersms8", "filtersms9", "firstpage", "lastpage", "guiprofile", "red", "green", "yellow", "blue", "increasepar", "decreasepar", "volampup", "volampdown", "channelup", "channeldown", "previouschannelgroup", "nextchannelgroup", "leftclick", "rightclick", "middleclick", "doubleclick", "wheelup", "wheeldown", "mousedrag", "mousemove", "noop".

```

＃＃＃ 系统：
- 弹出光驱 - 弹出或关闭光驱（如有配备）
- 休眠 - 启用休眠模式
- 重启 - 重启系统
- 关闭 - 关闭系统
- 暂停 - 暂停 Kodi

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 3.1.0 (2024-04-18)
- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated

### 3.0.0 (2023-09-08)
* (agross) Fixed seeking on Kodi >= 19
* (bluefox) Supported only node.js versions >= 16

### 2.0.9 (2022-12-08)
* (Apollon77) Prevent crash if received data from Kodi are not valid UTF-8
* (Apollon77) Optimize Adapter unload

### 2.0.8
* Important: js-controller >= 2.0.0 is required at least
* (Apollon77) Update kode-ws dependency
* (Apollon77) Prevent some js-controller 3.3. errors

### 2.0.7
* (instalator) fixed error subscribeNotification Player.OnResume [issues 49](https://github.com/instalator/ioBroker.kodi/issues/49)
* (instalator) added user ratings [issues 57](https://github.com/instalator/ioBroker.kodi/issues/57)
* (instalator) fix error [issues 58](https://github.com/instalator/ioBroker.kodi/issues/58)
* (instalator) fixed error widgets

#### 2.0.5
* (instalator) changed css classes
* (instalator) fixed error

#### 2.0.4
* (instalator) fixed thumbnails widget
* (instalator) fixed info.tagline

#### 2.0.2
* (instalator) changed title in io-package.json
* (instalator) changed seek
* (instalator) fixed widgets
* (instalator) fixed for thumbnails

#### 2.0.1 (2020-04-13)
* (instalator) fixed error if not used PVR

#### 2.0.0 (2020-04-12)
* (instalator) support admin3
* (instalator) support compact mode
* (instalator) refactoring
* (instalator) fixed different error
* (instalator) added english manual
* (instalator) big change code

#### 1.0.0 (2017-11-13)
* (instalator) up to stable

#### 0.2.4 (2017-10-16)
* (instalator) fix error

#### 0.2.3 (2017-08-15)
* (instalator) fix error switchPVR
* (instalator) Added description "System" to readme

#### 0.2.2 (2017-08-14)
* (instalator) added object - System (EjectOpticalDrive, Hibernate, Reboot, Shutdown, Suspend)
* (instalator) fix playlist widget

#### 0.2.0 (2017-01-07)
* (instalator) added object - state
* (instalator) change repeat to bool


#### 0.1.9 (2017-01-05)
* (instalator) change for vis-players

#### 0.1.8 (2016-12-25)
* (instalator) change open youtube playlist

#### 0.1.6 (2016-12-23)
* (instalator) added Tests
* (instalator) added open youtube playlist and open youtube link

#### 0.1.4 (2016-07-05)
* (instalator) fix error for Open
* (instalator) fix method number

#### 0.1.3
* (bluefox) fix error milti instance

#### 0.1.2 (2016-07-05)
* (instalator) change pvr switch - add stop
* (instalator) change dependencies
* (instalator) fix change play/stop state

#### 0.1.1 (2016-05-30)
* (instalator) change admin setting
* (instalator) Fix error 'playerid' of undefined

#### 0.1.0 (2016-05-22)
* (instalator) beta

#### 0.0.6 (2016-05-08)
* (bluefox) fixed crash when the driver turned on the KODI
* (bluefox) make adapter disabled by default, because no IP set
* (instalator) Thumbnail widget
* (instalator) added GetDirectory, GetVideoLibrary
* (instalator) added Scan & Clean Library

#### 0.0.5 (2016-05-04)
* (instalator) change creating object
* (instalator) added info.connection state

#### 0.0.4 (2016-05-03)
* (instalator) fix error
* (instalator) added VIS widgets

#### 0.0.3 (2016-05-01)
* (instalator) fix error
* (instalator) added send message from JS

#### 0.0.2 (2016-04-24)
* (instalator) remote player
* (instalator) ShowNotification
* (instalator) info playing
* (instalator) GetPVRChannel

#### 0.0.1
* (instalator) initial (17.04.2016)

## License
The MIT License (MIT)

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2020-2023 ioBroker Community and instalator <vvvalt@mail.ru>

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