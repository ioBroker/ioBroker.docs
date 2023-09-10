---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.synology/README.md
title: ioBroker Synology 适配器
hash: FoQkF3Tmpx06oSykWEJj+YP2pBryXB9dEXd3Y8ZLzS0=
---
![标识](../../../en/adapterref/iobroker.synology/admin/synology.png)

![安装数量](http://iobroker.live/badges/synology-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.synology.svg)
![下载](https://img.shields.io/npm/dm/iobroker.synology.svg)

# IoBroker Synology 适配器
![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.synology/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/synology/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。

＃＃ 描述
该驱动程序允许您接收数据并管理 Synology NAS 服务器。

### 2FA 设置
如果您在 DSM6/7 中使用 2FA，请参阅说明[这里](docs/en/template.md)

### 重新启动和关闭
从 v2.1.4 开始，适配器将通过 SSH 执行此操作，因此请在适配器设置中设置 SSH 端口。您可以在 Synology 设置中看到它：![绘图](https://user-images.githubusercontent.com/6681528/161436776-bd04b0c6-cfb2-47ab-9bee-7ea700575bbb.png) ![绘图](https://user-images.githubusercontent.com/6681528/161436897-174f3396-c2bb-4248-b91c-707005f7d2a8.png)

### 发送方法
您可以通过设置 sendMethod 对象来发送任何命令（方法），例如：获取 SurveillanceStation 信息是一个 getInfo 方法，没有附加参数。

```{"method": "getInfo", "params": {}}```

＃＃＃ 控制
**commands.reboot** - 重新启动 NAS

**commands.wake** - 将 LAN 唤醒发送到 NAS

**commands.shutdown** - 关闭 NAS

***SurveillanceStation.cameras.{NAMECAM}***：

* 已启用 - 当前状态和启用/禁用相机
* linkSnapshot - 快照的 URL

***SurveillanceStation.HomeMode.status_on*** - 当前状态和启用/禁用家庭模式

***SurveillanceStation.getSnapshotCamera*** - 通过摄像机编号获取快照，文件保存在目录“`...iobroker-data\synology_0\snapshotCam_2.jpg`”中

***AudioStation.players.{PLAYERID}***：

* 播放、暂停、停止、下一个、上一个 - 控制播放（按钮，仅 true）
* 重复 - 重复控制（关闭、全部、一）
* shuffle - 随机播放控制（真/假）
* 音量 - 远程播放器的音量（0-100）
* 搜索 - 控制播放搜索（0-100）
* play_folder - 将文件夹中的曲目添加到播放列表（id 文件夹，例如``dir_5816``）
* play_track - 按 id 播放曲目（例如``music_120847``）
* current_play - 当前曲目在播放列表中的编号（例如“14”）的控制和状态

***下载站***：

* activeTask - 未完成下载的数量
* listTasks - 包含不完整下载的数组
* shedule_enabled、shedule_emule_enabled - 计划或立即下载的状态和控制
* add_hash_download - 添加到哈希下载（例如``8BD3CAD02FC9ECB661A12378414FA310D3F3FE03``）
* add_url_download - 添加下载 URL 或磁力链接
* 文件夹 - 要下载的文件夹，在添加下载之前设置，否则加载到默认文件夹中
*pause_task、resume_task - 暂停下载并恢复。 （例如“dbid_170”或“170”或“all”）

### 消息框
```
sendTo('synology.0', 'getSnapshot', {camId: 2}, (res) => {
    if(res) sendTo('telegram.0', {text: res, caption: 'caption for image'});
});
```

## Changelog
<!--
     ### **WORK IN PROGRESS**
-->
### 3.0.0 (2023-09-07)
* (Standarduser) Added WOL to awake Synology NAS server
* (bluefox) Only node 16 or higher supported

### 2.1.13 (2022-11-05)
*(McM1957) Code has been prepared for upcoming js-controller release. Reference to utils.controllerDir has been removed. (#198)
*(McM1957) Several base modules have been updated.

### 2.1.12 (2022-10-26)
*(McM1957) Logging of password in clear text has been removed.

### 2.1.11 (2022-10-24)
*(McM1957) The adapter has been adapted to be compatible with node14.

### 2.1.10 (2022-10-23)
*(McM1957) Handling of passwords containing special characters (i.e. a dollar sign) has been fixed (#180)
*(McM1957) Base modules have been updated as suggested by dependabot.

### 2.1.9 (2022-07-01)
* (Apollon77) Try to prevent account locks when using 2FA on restarts of the NAS

### 2.1.8 (2022-06-12)
* (Apollon77) slow down reconnects to the DSM

### 2.1.7 (2022-04-26)
* (Apollon77) Try to prevent account locks when using 2FA on restarts of the NAS

### 2.1.6 (2022-04-04)
* (Apollon77) Fix 2FA

### 2.1.5 (2022-04-03)
* (Apollon77) fix DSM version detection

### 2.1.4 (2022-04-03)
* (arteck) workaround for shutdown and reboot(configure your ssh port in the settings)
* (Apollon77) prevent error when setting FileStation.info.items on start once

### 2.1.1 (2022-03-26)
* (Apollon77) Optimize object type determination and adjustments

### 2.1.0 (2022-03-25)
* IMPORTANT: You need to re-enter the password once after installing this version!
* (Apollon77) Camera snapshots are now also stored in ioBroker storage to be easier used in visualizations!
* (foxriver76) Hide password display in Admin when using Admin5
* (Apollon77) Fix volume description
* (Apollon77) Fix type issues since js-controller 3.3

### 2.0.1 (2021-09-17)
* (MeisterTR) Workaround JSON config Password

### 2.0.0
* (instalator) DSM7 support

### 1.1.3 (2021-08-23)
* (MeisterTR) Fixed 2FA

### 1.1.2 (2021-08-12)
* (MeisterTR) Fixed datatypes
* (MeisterTR) added new ConfigJson (if you use 2FA pleease retype in config)
* (MeisterTR) Fixed snapshot again

### 1.1.1 (2021-08-09)
* (MeisterTR) fix type of uptime
* (MeisterTR) fix broken snapshot link

### 1.1.0 (2021-08-07)
* (MeisterTR) fixes for DSM7
* (MeisterTR) added release-script
* (MeisterTR) change testing
* (MeisterTR) change syno repo to default

### 1.0.1
* (thost96) fix for wrong type number [issue 78](https://github.com/instalator/ioBroker.synology/issues/78)

### 1.0.0
* (instalator) changed name objects in hdd_info [issues 51](https://github.com/instalator/ioBroker.synology/issues/51)
* (Apollon77) BREAKING CHANGE: Please set password new in admin!
* (Apollon77) js-controller 3.0 is now needed minimum!
* (Apollon77 store password now encrypted)

### 0.1.20
* (instalator) fixed error

### 0.1.18
* (instalator) change link for album cover

### 0.1.17
* (instalator) added Sentry plugin support

### 0.1.16
* (instalator) fixed error

### 0.1.15
* (instalator) fixed error in parse Info
* (instalator) fixed api undefined

### 0.1.14
* (instalator) fixed missing [datapoints](https://github.com/instalator/ioBroker.synology/issues/43)
* (instalator) refactoring
* (instalator) Changed the logging of some errors
* (instalator) Changed format session in syno package

### 0.1.11
* (instalator) added motionDetected state
* (SpectreKr*) Adding to FS Sharing

### 0.1.10
* (instalator) fixed copy cover file
* (instalator) fix get packages for DSM 5.x
* (instalator) Added option to select services for receiving data

### 0.1.8
* (instalator) fix error addDownload
* (instalator) fixed listRadios
* (instalator) fixed get cover

### 0.1.7
* (instalator) fixed 2FA
* (instalator) Added setup guide 2FA

### 0.1.6
* (instalator) fix for 2fa
* (instalator) fix error
* (instalator) change error log
* (instalator) fix io-package
* (instalator) fix error status player

### 0.1.4
* (instalator) change for DownloadStation
* (instalator) added playlist favorite radio
* (instalator) added clearPlaylist button
* (instalator) refactoring

### 0.1.3
* (instalator) change obj for ss info fix for cover song 
* (instalator) fix for info.connection 
* (instalator) add 6.2.3 fix for player browser files 
* (instalator) fix for 2FA
* (instalator) fixed error add download 
* (instalator) added DownloadStation task list

### 0.1.2
* (instalator) fixed error

### 0.1.1
* (instalator) added messagebox for snapshot
* (instalator) update readme
* (instalator) added ss link for different streams
* (instalator) fix error
* (instalator) refactoring

### 0.1.0
* (instalator) added HomeMode switch 
* (instalator) change for audiostation 
* (instalator) change for as and ss
* (instalator) added snapshot functional 
* (instalator) fixed systemConfig 
* (instalator) fixed many error

### 0.0.4 (2018-10-07)
* (instalator) Изменен репозиторий библиотеки
* (instalator) Добавлено в конфиг время опроса

### 0.0.3 (2018-01-03)
* (instalator) initial

## License
The MIT License (MIT)

Copyright (c) 2021-2023 instalator <vvvalt@mail.ru>, ioBroker Community-Developers

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