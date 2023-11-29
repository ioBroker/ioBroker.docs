---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ring/README.md
title: 环形适配器
hash: VAuDrniQrkEeYjoiFdJ/8lkukKW3sL1I0HFmNPJmxs4=
---
![标识](../../../en/adapterref/iobroker.ring/admin/ring.png)

![Travis CI 构建状态](https://travis-ci.org/iobroker-community-adapters/ioBroker.ring.svg?branch=master)
![AppVeyor 构建状态](https://ci.appveyor.com/api/projects/status/github/iobroker-community-adapters/ioBroker.ring?branch=master&svg=true)
![安装数量](http://iobroker.live/badges/ring-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.ring.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ring.svg)
![国家公共管理](https://nodei.co/npm/iobroker.ring.png?downloads=true)

# 环形适配器
Ring 适配器可与 Ring 视频门铃和 Ring Cam 等 Ring 设备配合使用，并显示是否有人按门铃或是否检测到运动。
如果检测到运动或门铃，环形视频门铃或摄像头会发送视频流。

## 安装和配置
安装适配器后，您必须输入您的令牌。
Ring 现在要求所有帐户使用双因素身份验证 (2fa)。
要获取令牌，请在您的 shell 上执行以下操作。

```shell
npx -p ring-client-api ring-auth-cli
```

或者

```
# Unix
cd /opt/iobroker/node_modules/iobroker.ring/
npm i ring-client-api

cd /opt/iobroker/node_modules/iobroker.ring/node_modules/ring-client-api
node ring-auth-cli
```

您可以为直播和快照路径和文件名使用特殊变量。这些变量将被替换为计数器、时间戳、环 ID 或环类型。

* `%d`: Unix 时间戳。示例：`test_%d -> test_1588331430061`
* `%i`：您的戒指设备的 ID：示例：`test_%i -> test_234567890`
* `%n`：自环实例启动以来的计数器。示例：`test_%n -> test_1`
* `%k`：您的响铃设备类型：示例：`test_%k -> test_doorbell`

＃＃＃ 常问问题
#### 我没有收到有关运动或检测到的人的事件、快照和视频
恭喜，您当前的令牌很可能已被环列入黑名单，从而拒绝您需要的推送通知。
解决此问题的最佳方法是删除环网站上以前的任何浏览器/适配器令牌，并为适配器生成新令牌。

为了使该适配器能够正确地对事件做出反应，Ring 必须将推送通知发送到所使用的 [环API客户端](https://github.com/dgreif/ring)，以便该适配器对其做出反应。该适配器中的逻辑经过多次检查并且适用于大量用户，因此如果您遇到有关丢失事件的问题，则不太可能是该适配器的错误。

### V5 重大变化
1. 一些数据点被重命名为更加一致（例如`livestream_request`被简化为`request`，因为它已经

   位于频道`livestream`)。

2. 您现在可以配置是否要对事件做出反应（通过录制、快照等）。
3.二元状态被删除。

### V3 重写重大更改
1. 设备名称通过其描述进行扩展（例如，来自“设备 1234567”

   至`Device 1234567 ("Floodlight Garden")`)

2. 快照/直播数据现在位于各自的通道中，包含其他数据点。
3.快照/直播对象从meta类型更改为file类型的state。
4. 事件（运动、叮等）现在位于相应的频道中。
5. 由于“ring-api”放弃了对“v16.x”之前的节点的支持，此适配器需要“node v16.x”或“node v18.x”
6. 由于我们正在监听/响应事件，主动刷新减少到每 2 小时一次。

### SIP（版本 3.x 之前）
您可以通过 SIP 客户端使用 SIP 信息进行 SIP 视频会议。
适配器不会提供所有环设备，因为使用的 API 不包括所有环设备。

例如，您可以在 [http://icanblink.com/](http://icanblink.com/) 上使用 Blink SIP 客户端。
要使视频正常工作，请进入 Blink 的首选项，在“帐户”下，将选项卡切换到“媒体”，然后取消选择“RTP 选项”下的“加密音频和视频”。
请注意，SIP 信息将在几秒钟后过期！希望我很快就能支持视频流。
遗憾的是，[环网](https://ring.com) 没有支持此功能的官方 API。
如果您按下 `livestream request` 按钮，您将获得用于建立 SIP 视频呼叫会话的新 SIP 信息。
如果您使用[环网](https://ring.com)云，您会在历史记录下找到指向您上次运动/门铃录制视频的http链接。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 5.0.10 (2023-11-06)

* (theimo1221) #614 Enforce @homebridge/camera-utils version 2.2.4

### 5.0.8 (2023-11-05)

* (crocri) Code cleanup
* (theimo1221) #614 Add @homebridge/camera-utils as direct depency to mitigate import issue

### 5.0.7 (2023-11-02)

* (theimo1221) Updated Packages
* (theimo1221) Include missing build artifacts

### 5.0.6 (2023-10-29)

* (theimo1221) Updated Packages
* (crocri) Make event debouncing configurable

### 5.0.5 (2023-10-28)

* (theimo1221) #602 Debounce Motion Events by 25 seconds. This prevents multiple events within a short time.

### 5.0.4 (2023-10-27)

* (theimo1221) #603 Add rxjs to normal dependencies instead of dev-dependencies

### 5.0.3 (2023-10-26)

* (theimo1221) #603 Change rxjs import to resolve awkward js build result.

### 5.0.2 (2023-10-25)

* (theimo1221) Remove mixup of callback and async within same function
* (theimo1221) #603 Harden usage of "firstValueFrom"

### 5.0.1 (2023-10-20)

* (theimo1221) Updated Packages
* (theimo1221) Remove legacy states
* (theimo1221) Add stickup_cam_mini_v2

### 5.0.0 (2023-10-10)

* (bluefox) migrated the configuration to JSON
* (crocri) many changes for livestream and high-definition screenshots
* (theimo1221) Refactoring and cleanup
* (crocri) Ding event is now working again for Ring-Intercom
* (crocri) auto livestream creation takes now value from config, before fix
* (crocri) snapshot now async, because snapshot and livestream in parallel do not work
* (crocri) livestream duration now settable via tree entry will be auto reset via livestream request.
* (crocri) two new config entries auto_livestream and auto_snapshot to disable auto creation of livestream and snapshot.
* (crocri) some minor corrections to code
* (crocri) Removed binary States
* (crocri) Improvements for vis compatibility done
* (theimo1221) Refactoring and cleanup

### 4.0.0 (2023-08-22)

* (theimo1221) !!Breaking Change!! From now on Node 18 or 20 is required, Node 16 is not supported anymore
* (theimo1221) Updated Ring-Api to v12 which needs Node 18 or 20
* (theimo1221) Updated Packages

### 3.4.1 (2023-08-06)

* (theimo1221) Compliance to adapter-checker
* (theimo1221) Updated Packages
* (theimo1221) Debounce Doorbell Presses
* (theimo1221) Added Support for cocoa_doorbell_v2
* (theimo1221) Added Support for stickup_cam_longfin
* (theimo1221) Fixed compatibility and recompile

### 3.4.0 (2023-06-09)

* (theimo1221) Updated Packages (which allows node 20 now)

### 3.3.1 (2023-05-18)

* (theimo1221) Updated Packages

### 3.3.0 (2023-04-02)

* (theimo1221) Updated Packages
* (theimo1221) Device with Type stickup_cam_longfin didn't yet support #483

### 3.2.7 (2023-03-22)

* (foxriver76) prepared js-controller v5

### 3.2.6 (2023-02-18)

* (theimo1221) Improve behavior on initial Location load fail
* (theimo1221) Updated Packages

### 3.2.5 (2023-01-28)

* (theimo1221) Updated Packages

### 3.2.4 (2022-12-15)

* (theimo1221) #385 Fix for Unlock Request on intercoms

### 3.2.3 (2022-12-15)

* (theimo1221) Updated Packages
* (theimo1221) #385 Experimental Ring Intercom support

### 3.2.2 (2022-12-02)

* (theimo1221) #373 Fix event receiving for iobroker instances without a unique hostname

### 3.2.1 (2022-12-02)

* (theimo1221) Redeploy

### 3.2.0 (2022-12-02)

* (theimo1221) Updated Packages
* (theimo1221) #373 Increase logging and change recording order on Doorbell Event

### 3.1.9 (2022-11-20)

* (theimo1221) #395 Resolve Package-lock.json issues

### 3.1.8 (2022-11-20)

* (theimo1221) Updated Packages
* (theimo1221) Compliance to the newest ring api version

### 3.1.7 (2022-10-28)

* (theimo1221) Updated Packages

### 3.1.6 (2022-10-28)

* (theimo1221) Inline subscription instead of properties for Event observer

### 3.1.5 (2022-10-16)

* (theimo1221) Updated Packages

### 3.1.4 (2022-10-16)

* (theimo1221) #376 Handling when reconnect fails

### 3.1.3 (2022-10-04)

* (theimo1221) Updated Packages

### 3.1.2 (2022-09-22)

* (theimo1221) Updated Packages
* (theimo1221) Fixed an issue with floodlight control

### 3.1.1 (2022-08-11)

* (theimo1221) Improved Doorbell Event Logging

### 3.1.0 (2022-08-04)

* (bluefox) Allowed to be used with node.js 18

### 3.0.5 (2022-07-05)

* (theimo1221) Improved Log Message on failed Snapshots during event handling
* (theimo1221) Added Support for doorbell oyster

### 3.0.4 (2022-06-17)

* (theimo1221) Fixed Edge Case resulting in lamps being permanently on

### 3.0.3 (2022-06-16)

* (theimo1221) Implemented location mode

### 3.0.1 (2022-06-08)

* (bluefox) Changed the russian translations

### 3.0.0-beta.13 (2022-05-30)

* (theimo1221) Prevented missing of events, due to a socket drop within ring-api-client
* (theimo1221) Improved device logging readability

### 3.0.0-beta.12 (2022-05-28)

* (theimo1221) Fixed error in beta.11 in regard to new installations
* (theimo1221) Harden Event Handling to prevent rare permanent busy occasions
* (theimo1221) Added support for doorbell device `doorbell_graham_cracker`

### 3.0.0-beta.11 (2022-05-24)

* (theimo1221) Added processing of new token provided by ring.

### 3.0.0-beta.10 (2022-05-24)

* (theimo1221) Added `lpd_v4` Doorbell

### 3.0.0-beta.9 (2022-05-21)

* (theimo1221) For stability reasons, perform an active refresh every 2 hours.

### 3.0.0-beta.8 (2022-05-17)

* (theimo1221) Fixed writing to iobroker-data/files folder (thx to Apollon)

### 3.0.0-beta.7 (2022-05-16)

* (theimo1221) Prevent Crashes on unsupported devices

### 3.0.0-beta.6 (2022-05-16)

* (theimo1221) Record more events (without recording twice)
* (theimo1221) Improved snapshot deleting for initial snapshot after restart

### 3.0.0-beta.5 (2022-05-14)

* (theimo1221) Prevented crashes during installation by clearer enforcing of node 16

### 3.0.0-beta.4 (2022-05-14)

* (theimo1221) Changes in io-package.json for release workflow

### 3.0.0-beta.3 (2022-05-14)

* (theimo1221) Rewrote V3 (Breaking Changes listed below)
* (theimo1221) Updated packages
* (theimo1221) Fixed in GitHub release workflow

### 2.0.0-beta.3 (2022-02-08)

* (theimo1221) Fixed adapter checker issues

### 2.0.0-beta.0 (2022-02-05)

* (theimo1221) Updated packages
* (theimo1221) Added JS-Controller 4.0 dependency
* (theimo1221) On ding --> First take snapshot then livestream

### 1.2.8 (2021-10-14)

* (theimo1221) Updated packages

### 1.2.6 (2021-09-05)

* (theimo1221) Updated packages
* (theimo1221) Stopped adapter on unhandled Error
* (theimo1221) Terminated adapter on invalid ring credentials

### 1.2.4-1 (2021-08-12)

* (theimo1221) Updated packages

### 1.2.4-0 (2021-08-07)

* (theimo1221) Refactoring
* (theimo1221) Updated packages

### 1.2.3 (2021-07-30)

* (theimo1221) Updated packages
* (theimo1221) Fixed compatibility issues with new ring api

### 1.2.2 (2021-05-05)

* (theimo1221) Updated packages due to security patches

### 1.2.1 (2021-04-09)

* (theimo1221) Bumped version

### 1.2.0 (2021-04-08)

* (theimo1221) Added new device type spotlightw as doorbell
* (theimo1221) Updated dependencies (ringapi, node-schedule, etc.)

### 1.1.6-3 (2021-03-29)

* (theimo1221) Fixed typo preventing Livestream recordings after motion detection
* (theimo1221) Reduced Levels of Log Messages, to not spam iobroker Log

### 1.1.6-2 (2021-03-29)

* (theimo1221) Fixing some Issues while saving snapshots and place Snapshots within 'iobroker-data' Folder.

### 1.1.6-1 (2021-03-26)

* (theimo1221) Support for Floodlight V2
* (theimo1221) Control Floodlight by Switch

### 1.1.5 (04.11.2020)

* (Stübi) Added floodlight

### 1.1.4 (23.05.2020)

* (Stübi) Added new libraries

### 1.1.3 (06.05.2020)

* (Stübi) Fixed error of missing objects

### 1.1.2 (02.05.2020)

* (Stübi) Fixed health info like missing battery status (Issue #22, Issue #25)
* (Stübi) Change error handling
* (Stübi) Providing Stick Up Cam (BETA)
* (Stübi) Using variables in the filename of the livestream or snapshot

### 1.1.1 (02.05.2020)

* (Stübi) Bugfixing
* (Stübi) User can enable/disable external sentry logging

### 1.1.0 (01.05.2020)

* (Stübi) Node 10 is now required, Node 12 recommended. If you use Node 8 or less, the adapter will stop immediately.
* (Stübi) Tested with js-controller 3. I recommend using js-controller 3 or higher because of sentry logging and more
  features in the future
* (Stübi) Snapshot link will be shown as https or http in state (Issue #18)
* (Stübi) Livestream link added and a request button added to get new livestream
* (Stübi) Old snapshots and livestreams can be deleted on the filesystem
* (Stübi) Sentry logging added
* (Stübi) Small improvements and bugfixing
* (Stübi) Added a Two-Factor Auth (2fa) description (Issue #14, Issue #13, Issue #19)

### 1.0.7 (24.12.2019)

* (Stübi) Bugfixing

### 1.0.6 (20.12.2019)

* (Stübi) Bugfixing: Login with username and password changed
* (Stübi) New feature (BETA): Now you can make snapshots in jpg and a livestream in mp4 format. Unfortunately, the
  snapshot / livestream does not always work!

### 1.0.5 (18.04.2019)

* (Stübi) Bugfixing
* (Stübi) Using new API. With this API livestreaming and snapshots are possible (work still in progress and not
  supported in this version)
* (Stübi) Fixed an error with js-controller 2.0. You need at least this version with js-controller 2.0
* (Stübi) Added two factory authentications

### 1.0.4 (17.04.2019)

* (Stübi) Bugfixing for Ring Pro

### 1.0.3 (09.03.2019)

* (Stübi) Major change! I had to change the used ring.com API to another API. The old one did not work anymore. For this
  reason, a lot has to be redesigned.

### 1.0.2 (01.02.2019)

* (Stübi) More debug information

### 1.0.1 (05.01.2019)

* (Stübi) Support js-controller compact mode

### 1.0.0 (04.01.2018)

* (Stübi) Added a camera device. For this reason, the device name changed from doorbot to doorbell.

### 0.1.3 (20.12.2018)

* (Stübi) Update error handling

### 0.1.2 (17.12.2018)

* (Stübi) Update error handling

### 0.1.1 (15.12.2018)

* (Stübi) Improvements

### 0.1.0 (14.12.2018)

* (Stübi) First Version

## License

MIT License

Copyright (c) 2018-2023 Thorsten <thorsten@stueben.de> / <https://github.com/schmupu>

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