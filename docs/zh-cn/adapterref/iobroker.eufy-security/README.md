---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.eufy-security/README.md
title: ioBroker.eufy安全性
hash: cEwbuVh0ESWcs7RKS4gY8WFx0kUKseQ91JtyK5S1GIs=
---
![商标](../../../en/adapterref/iobroker.eufy-security/admin/eufy-security.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.eufy-security.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.eufy-security.svg)
![安装数量（最新）](https://iobroker.live/badges/eufy-security-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/eufy-security-stable.svg)
![依赖状态](https://img.shields.io/david/bropat/iobroker.eufy-security.svg)
![已知漏洞](https://snyk.io/test/github/bropat/ioBroker.eufy-security/badge.svg)
![建置状态](https://travis-ci.org/bropat/ioBroker.eufy-security.svg?branch=master)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/bropat/ioBroker.eufy-security?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.eufy-security.png?downloads=true)

＃ioBroker.eufy-security
该适配器使用[安全客户](https://github.com/bropat/eufy-security-client)库与Eufy设备通信。

如果您欣赏我的工作和进步并想支持我，可以在这里进行：

[![ko-fi]（https://www.ko-fi.com/img/githubbutton_sm.svg）](https://ko-fi.com/E1E332Q6Z)

＃＃ 描述
该适配器允许通过连接到Eufy云服务器和本地/远程站来控制[Eufy安全设备](https://us.eufylife.com/collections/security)。

您需要提供您的Cloud登录凭据。适配器连接到您的云帐户，并通过HTTPS轮询所有设备数据。现在，还支持到Eufy站/设备的本地或远程P2P连接。但是，始终必须先连接到Eufy Cloud。

一个适配器实例将显示一个Eufy Cloud帐户中的所有设备，并允许对其进行控制。

＃＃ 特征
*支持与工作站的本地和远程p2p连接
*两因素认证
*实时流作为HLS流（支持所有平台，但会带来延迟）
*上次HLS实时流始终被保存以供以后查看
*在收到推送通知时下载事件视频（异步）
*拍摄直播或下载视频的jpeg缩略图
* 基站：
    * 状态：
        *配置的保护模式
        *当前保护模式
        * 名称
        * 模型
        * 序列号
        *软件版本
        *硬件版本
        * MAC地址
        *局域网IP地址
    *动作：
        *更改警卫模式
        *重新启动站
    *活动：
        *警报模式更改
* 相机：
    * 状态：
        *在线/离线等
        * 电池 ％
        *电池温度
        * 名称
        * 模型
        * 序列号
        *软件版本
        *硬件版本
        * MAC地址
        * Wifi RSSI
        *自上次充电以来过滤的错误事件
        *自上次充电以来保存/记录的事件
        *自上次充电以来的事件总数
        *自上次充电以来的已用天数
    *动作：
        *开始直播（hls；还支持本地直播）
        *停止直播（hls）
        *启用/禁用设备
        *启用/禁用自动夜视
        *启用/禁用led（仅2型摄像机产品，室内摄像机，泛光灯摄像机，单行摄像机和门铃）
        *启用/禁用防盗检测（仅摄像机2产品）
        *启用/禁用运动检测
        *启用/禁用宠物检测（仅限室内摄像头）
        *启用/禁用声音检测（仅室内摄像机）
        *启用/禁用RTSP流（仅camera2产品，室内相机和单机相机）
        *更改视频水印设置
    *活动：
        *检测到运动
        *检测到人
        *铃声（仅门铃）
        *检测到哭泣（仅室内摄像机）
        *检测到声音（仅室内摄像机）
        *检测到宠物（仅室内摄像机）
* 传感器
    *进入传感器：
        * 状态：
            *在线/离线等
            * 低电量
            * 名称
            * 模型
            * 序列号
            *软件版本
            *硬件版本
        *活动：
            * 打开关闭
    * 运动传感器：
        * 状态：
            *在线/离线等
            * 低电量
            * 名称
            * 模型
            * 序列号
            *软件版本
            *硬件版本
        *活动：
            *检测到运动
*键盘：
    * 状态：
        *在线/离线等
        * 低电量
        * 名称
        * 模型
        * 序列号
        *软件版本
        *硬件版本
* 锁：
    * 状态：
        *在线/离线等
        * 电池 ％
        *锁定状态
        * 名称
        * 模型
        * 序列号
        *软件版本
        *硬件版本
        * Wifi RSSI
    *动作：
        *锁定/解锁
*还有更多...

＃＃ 配置
参见[这里](./docs/en/README.md)

##已知的工作设备
* HomeBase（T8001）
* HomeBase E（T8002）
* HomeBase 2（T8010）
* Smart Lock Wi-Fi桥接器（T8021）
* eufyCam（T8111）
* eufyCam E（T8112）
* eufyCam 2（T8114）
* eufyCam 2C（T8113）
* eufyCam 2 Pro（T8140）
* eufyCam 2C Pro（T8141）
* Floodlight（T8420）
*有线门铃2k（T8200）
*有线门铃1080p（T8201）
*电池门铃2K（T8210）
*电池门铃1080p（T8222）
*进入传感器（T8900）
*运动传感器（T8910）
*室内Cam Pan＆Tilt 2K（T8410）
*室内凸轮2K（T8400）
*室内Cam Pan＆Tilt 1080p（T8411）
*室内摄像头1080p（T8401）
*智能锁前门（T8500）

如果有更多设备可用（或不能运行），请通过打开GitHub问题进行报告。

##如何报告问题和功能请求
请为此使用GitHub问题。

最好的方法是将适配器设置为“调试”日志模式（“实例”->“专家”模式->“列日志级别”或参见[这里](https://github.com/bropat/ioBroker.eufy-security/wiki/Howto-enable-debug)）。然后，请从磁盘中获取日志文件（ioBroker安装目录中的子目录“ log”，而不是Admin，因为Admin会删掉行）。

## Changelog

### 0.5.4 (2021-05-26)
* (bropat) Fixed issue with video corruption in p2p livestream
* (bropat) Updated versions of the package dependencies

### 0.5.3 (2021-05-14)
* (bropat) Fixed issue [#121](https://github.com/bropat/ioBroker.eufy-security/issues/121)
* (bropat) Fixed push notification for indoor and floodlight cams (issue [#130](https://github.com/bropat/ioBroker.eufy-security/issues/130))
* (bropat) Fixed refresh of properties/settings of standalone devices (issue [#130](https://github.com/bropat/ioBroker.eufy-security/issues/130))
* (bropat) Updated versions of the package dependencies

### 0.5.2 (2021-04-02)
* (bropat) Try to add support for FreeBSD - issue [#106](https://github.com/bropat/ioBroker.eufy-security/issues/106)
* (bropat) Updated package dependency ffmpeg-static for FreeBSD support

### 0.5.1 (2021-04-01)
* (bropat) Fixed issue [#105](https://github.com/bropat/ioBroker.eufy-security/issues/105)

### 0.5.0 (2021-03-30)
* (bropat) Added support for smart lock products
* (bropat) Added new P2P feature: lock/unlock smart lock products
* (bropat) Optimized speed of P2P connection establishment
* (bropat) New setting: P2P connection setup preference: local prefered, local only or quickest connection
* (bropat) Dropped support for NodeJS 10.x (min. requirement 12)
* (bropat) Updated versions of the package dependencies

### 0.4.3 (2021-03-19)
* (bropat) Code enhancements for publishing the adapter to the central repository
* (bropat) Updated versions of the package dependencies

### 0.4.2 (2021-03-14)
* (bropat) Fixed roles of states according to ioBroker documentation

### 0.4.1 (2021-03-14)
* (bropat) Removed legacy password encryption support for admin adapter (requires admin adapter >= 4.0.9)
* (bropat) Added admin adapter as global dependency
* (bropat) Updated license

### 0.4.0 (2021-03-11)
* (bropat) Added handling of adapter updates with breaking changes
* (bropat) Added new P2P feature: enable/disable pet detection for indoor cameras
* (bropat) Added new P2P feature: enable/disable sound detection for indoor cameras
* (bropat) Added new P2P feature: enable/disable led for wired doorbell
* (bropat) Unlocked state: last_event_video_url
* (bropat) Fixed parsing of push notification to download video events for battery doorbells and indoor cameras
* (bropat) Fixed enable/disable device (for wired doorbells, indoor cameras, floodlight camera and solo cameras)
* (bropat) Fixed enable/disable led (for battery doorbells, indoor cameras, floodlight camera and solo cameras)
* (bropat) Fixed enable/disable motion detection (for indoor cameras, floodlight camera and solo cameras)
* (bropat) Fixed change video watermark setting (for indoor cameras and floodlight camera)
* (bropat) Updated versions of the package dependencies

### 0.3.1 (2021-03-06)
* (bropat) Fixed regression on livestream with h265 codec

### 0.3.0 (2021-03-05)
* (bropat) Implemented feature request [#88](https://github.com/bropat/ioBroker.eufy-security/issues/88): Enable/disable motion detection for camera products
* (bropat) Implemented feature request [#81](https://github.com/bropat/ioBroker.eufy-security/issues/81): Enable/disable RTSP stream (added also RTSP stream url)
* (bropat) Implemented asynchronous download of event videos when receiving a push notification
* (bropat) Optimized ffmpeg implementation to only muxing video data to HLS
* (bropat) Optimized HLS livestream video start delay (10-15 sec.)
* (bropat) Fixed possible race condition with ffmpeg when using fallback to Eufy RTMP live stream
* (bropat) Fixed issue with livestream when p2p connection is lost
* (bropat) Updated versions of the package dependencies

### 0.2.5 (2021-02-20)
* (bropat) Fixed possible race condition that brokes sometime the livestream
* (bropat) Updated versions of the package dependencies

### 0.2.4 (2021-02-20)
* (bropat) Fixed issue [#86](https://github.com/bropat/ioBroker.eufy-security/issues/86)
* (bropat) Fixed not correctly identifying if the livestream is still active or not

### 0.2.3 (2021-02-17)
* (bropat) Fixed wired doorbell p2p livestream (should fix also indoor, floodlight and solo cameras)
* (bropat) Fixed issue that treats known push notifications as unknown
* (bropat) Fixed relative path for state last_event_pic_url
* (bropat) Updated versions of the package dependencies

### 0.2.2 (2021-02-16)
* (bropat) Fixed web extension settings for serving videos and pictures (issue [#79](https://github.com/bropat/ioBroker.eufy-security/issues/78))

### 0.2.1 (2021-02-15)
* (bropat) Fixed device_enable state
* (bropat) Fixed battery doorbell start livestream over p2p (issue [#78](https://github.com/bropat/ioBroker.eufy-security/issues/78))
* (bropat) Implemented fallback for failed P2P livestream to RTMP livestream

### 0.2.0 (2021-02-14)
* (bropat) Implemented P2P livestream over HLS
* (bropat) Last livestream is always saved and is still available later
* (bropat) Implemented device and station parameter refresh over P2P
* (bropat) Revised push notification implementation
* (bropat) Fixed issue [#71](https://github.com/bropat/ioBroker.eufy-security/issues/71) by implementing retry mechanism on HTTP error 404 (max. 5 retries with increasing delay) 
* (bropat) Fixed issue [#12](https://github.com/bropat/ioBroker.eufy-security/issues/12)
* (bropat) Eufy client library extracted as standalone library and adapters ported to new shared library: [eufy-security-client](https://www.npmjs.com/package/eufy-security-client)
* (bropat) Removed following states: last_captured_pic_url, last_captured_pic_html
* (bropat) Updated versions of the package dependencies

### 0.1.5 (2021-01-14)
* (bropat) Fixed issue [#50](https://github.com/bropat/ioBroker.eufy-security/issues/50) and [#53](https://github.com/bropat/ioBroker.eufy-security/issues/53)
* (bropat) Updated versions of the package dependencies

### 0.1.4 (2021-01-05)
* (bropat) Fixed: Accept only valid modes for station guard mode (for invalid mode, an error is logged)
* (bropat) Fixed reset of an event (motion, ringing, etc.)
* (bropat) Updated versions of the package dependencies

### 0.1.3 (2021-01-02)
* (bropat) Fixed issue [#37](https://github.com/bropat/ioBroker.eufy-security/issues/37) and [#41](https://github.com/bropat/ioBroker.eufy-security/issues/41)
* (bropat) Updated versions of the package dependencies

### 0.1.2 (2021-01-02)
* (bropat) Revised captured_pic_url state (renamed to last_captured_pic_url and added last_captured_pic_html)
* (bropat) Fixed p2p issue passing wrong user id (action_user_id instead of admin_user_id)
* (bropat) Revised push notification to properly support doorbell notifications
* (bropat) Updated versions of the package dependencies

### 0.1.1 (2020-12-29)
* (bropat) Fixed issue [#37](https://github.com/bropat/ioBroker.eufy-security/issues/37)
* (bropat) Fixed version numbering
* (bropat) Updated versions of the package dependencies

### 0.0.9 (2020-12-28)
* (bropat) Finished implementation for feature request: [#1](https://github.com/bropat/ioBroker.eufy-security/issues/1)
* (bropat) Little progress for feature request: [#5](https://github.com/bropat/ioBroker.eufy-security/issues/5)
* (bropat) Now supports also cloud P2P communication if local P2P comunication isn't possible
* (bropat) Implemented set Guard Mode with CMD_SET_PAYLOAD for certain devices
* (bropat) Added back USA ip addresses for P2P cloud discovery
* (bropat) Using the correct local time zone for communication with the Eufy Cloud
* (bropat) HUB filtering by device type 0 (station) removed
* (bropat) Added documentation for 2FA
* (bropat) Updated versions of the package dependencies

### 0.0.8 (2020-12-13)
* (bropat) Fixed issue [#16](https://github.com/bropat/ioBroker.eufy-security/issues/16)
* (bropat) P2P communication revisited
* (bropat) Added reconnect functionality for P2P communication
* (bropat) Added heartbeat for P2P communication
* (bropat) Added local caching of last event picture as image url or html image (removed old state: last_camera_url)
* (bropat) Updated versions of the package dependencies

### 0.0.7 (2020-12-08)
* (bropat) Fixed issue [#11](https://github.com/bropat/ioBroker.eufy-security/issues/11)

### 0.0.6 (2020-12-06)
* (bropat) Fixed issue [#13](https://github.com/bropat/ioBroker.eufy-security/issues/13)

### 0.0.5 (2020-12-05)
* (bropat) Added event states for camera (motion detected, person detected)
* (bropat) Added event states for entry sensor (open/closed)
* (bropat) Added event states for motion sensor (motion detected)
* (bropat) Added event states for doorbell (motion detected, person detected, ringing)
* (bropat) Added event states for indoor camera (motion detected, person detected, crying detected, sound detected, pet detected)
* (bropat) Added entry sensor state (online, offline, etc.)
* (bropat) Added entry sensor low battery
* (bropat) Added motion sensor state (online, offline, etc.)
* (bropat) Added motion sensor low battery
* (bropat) Added keypad state (online, offline, etc.)
* (bropat) Added keypad low battery

### 0.0.4 (2020-12-03)
* (bropat) Better exception handling
* (bropat) Fixed push token handling
* (bropat) Added push connection retry mechanism
* (bropat) Added camera state (online, offline, etc.)
* (bropat) Added camera wifi RSSI
* (bropat) Added camera total events since last charge
* (bropat) Added camera saved/recorded events since last charge
* (bropat) Added camera filtered false events since last charge
* (bropat) Added camera used days since last charge
* (bropat) Added camera battery temperature

### 0.0.3 (2020-11-21)
* (bropat) Fixed issue with push notification credentials initialization

### 0.0.2 (2020-11-21)
* (bropat) Added push notification support for event notification (raw notifications!)
* (bropat) Added 2FA (token renewal needs manual intervention)
* (bropat) Added P2P communication with station (event: Alarm mode change)
* (bropat) Added more device classes (sensors, locks, keypads) with no actions (at the moment! WIP!)
* (bropat) Added all eufy camera devices release to date
* (bropat) Added battery state to eufy cameras

### 0.0.1 (2020-10-04)
* (bropat) initial release

## License
MIT License

Copyright (c) 2021 bropat <patrick.broetto@gmail.com>

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