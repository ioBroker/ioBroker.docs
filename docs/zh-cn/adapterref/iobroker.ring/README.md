---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ring/README.md
title: 环形适配器
hash: /by4CHU08+LjfNQu6jeMDeIHKGRDe1ilZOVm8HLEOZE=
---
![标识](../../../en/adapterref/iobroker.ring/admin/ring.png)

![Travis CI 构建状态](https://travis-ci.org/iobroker-community-adapters/ioBroker.ring.svg?branch=master)
![AppVeyor 构建状态](https://ci.appveyor.com/api/projects/status/github/iobroker-community-adapters/ioBroker.ring?branch=master&svg=true)
![安装数量](http://iobroker.live/badges/ring-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.ring.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ring.svg)
![国家公共管理](https://nodei.co/npm/iobroker.ring.png?downloads=true)

# 环形适配器
需要 Admin v4 和`node 16.x`。

Ring 适配器可与 Ring 视频门铃和 Ring Cam 等 Ring 设备配合使用，并显示是否有人按门铃或是否检测到运动。如果检测到运动或门铃，环形视频门铃或摄像头会发送视频流。

## 安装和配置
安装适配器后，您必须输入您的 [环网](https://ring.com) 帐户的电子邮件和密码以及令牌。 Ring 现在要求所有帐户使用双因素身份验证 (2fa)。要获取令牌，请在您的 shell 上执行以下操作。

```
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
恭喜，您当前的令牌很可能已被按环列入黑名单，从而拒绝您需要的推送通知。
解决此问题的最佳方法是删除环网站上任何以前的浏览器/适配器令牌，并为适配器生成新令牌。

为了使该适配器对事件做出正确反应，Ring 必须将推送通知发送到所使用的 [环API客户端](https://github.com/dgreif/ring)，以便该适配器对其做出反应。该适配器中的逻辑经过多次检查并且适用于大量用户，因此如果您遇到有关丢失事件的问题，则不太可能是该适配器的故障。

### V3 重写重大更改
1. 设备名称通过其描述进行扩展（例如来自“设备 1234567”

   至`Device 1234567 ("Floodlight Garden")`)

2. 快照/直播数据现在位于各自的通道中，包含其他数据点。
3.快照/直播对象从meta类型更改为file类型的state。
4. 事件（运动、叮等）现在位于各自的频道中。
5. 由于“ring-api”放弃了对“v16.x”之前的节点的支持，此适配器需要“node v16.x”或“node v18.x”
6. 由于我们正在监听/对事件做出反应，主动刷新减少到每 2 小时一次。

### SIP（版本 3.x 之前）
您可以通过 SIP 客户端使用 SIP 信息进行 SIP 视频会议。
适配器不会提供所有环设备，因为使用的 API 不包括所有环设备。

例如，您可以在 [http://icanblink.com/](http://icanblink.com/) 上使用 Blink SIP 客户端。要使视频正常工作，请进入 Blink 的首选项，在“帐户”下，将选项卡切换到“媒体”，然后取消选择“RTP 选项”下的“加密音频和视频”。请注意，SIP 信息会在几秒钟后过期！希望我很快就能支持视频流。遗憾的是，[环网](https://ring.com) 没有支持此功能的官方 API。
如果您按下 `livestream request` 按钮，您将获得用于建立 SIP 视频呼叫会话的新 SIP 信息。
如果您使用[环网](https://ring.com)云，您会在历史记录下找到指向您上次动作/门铃录制视频的http链接。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

* (theimo1221) Compliance to adapter-checker

### 3.4.0 (2023-06-09)

* (theimo1221) Update Packages (which allows node 20 now)

### 3.3.1 (2023-05-18)

* (theimo1221) Update Packages

### 3.3.0 (2023-04-02)

* (theimo1221) Update Packages
* (theimo1221) Device with Type stickup_cam_longfin not yet supported #483

### 3.2.7 (2023-03-22)

* (foxriver76) prepare js-controller v5

### 3.2.6 (2023-02-18)

* (theimo1221) Improve behaviour on initial Location load fail
* (theimo1221) Update Packages

### 3.2.5 (2023-01-28)

* (theimo1221) Update Packages

### 3.2.4 (2022-12-15)

* (theimo1221) #385 Fix for Unlock Request on intercoms

### 3.2.3 (2022-12-15)

* (theimo1221) Update Packages
* (theimo1221) #385 Experimental Ring Intercom support

### 3.2.2 (2022-12-02)

* (theimo1221) #373 Fix event receiving for iobroker instances without unique hostname

### 3.2.1 (2022-12-02)

* (theimo1221) Redeploy

### 3.2.0 (2022-12-02)

* (theimo1221) Update Packages
* (theimo1221) #373 Increase logging and change recording order on Doorbell Event

### 3.1.9 (2022-11-20)

* (theimo1221) #395 Resolve Package-lock.json issues

### 3.1.8 (2022-11-20)

* (theimo1221) Update Packages
* (theimo1221) Compliance to newest ring api version

### 3.1.7 (2022-10-28)

* (theimo1221) Update Packages

### 3.1.6 (2022-10-28)

* (theimo1221) Inline subscription instead of properties for Event observer

### 3.1.5 (2022-10-16)

* (theimo1221) Update Packages

### 3.1.4 (2022-10-16)

* (theimo1221) #376 Handling when reconnect fails

### 3.1.3 (2022-10-04)

* (theimo1221) Update Packages

### 3.1.2 (2022-09-22)

* (theimo1221) Update Packages
* (theimo1221) Fix an issue with floodlight control

### 3.1.1 (2022-08-11)

* (theimo1221) Improve Doorbell Event Logging

### 3.1.0 (2022-08-04)

* (bluefox) Allowed to be used with node.js 18

### 3.0.5 (2022-07-05)

* (theimo1221) Improve Log Message on failed Snapshots during event handling
* (theimo1221) Add Support for doorbell oyster

### 3.0.4 (2022-06-17)

* (theimo1221) Fix Edge Case resulting in lamps being permanently on

### 3.0.3 (2022-06-16)

* (theimo1221) Implement location mode

### 3.0.1 (2022-06-08)

* (bluefox) Changed the russian translations

### 3.0.0-beta.13 (2022-05-30)

* (theimo1221) Prevent missing of events, due to socket drop within ring-api-client
* (theimo1221) Improve device logging readability

### 3.0.0-beta.12 (2022-05-28)

* (theimo1221) Fix error in beta.11 in regard to new installations
* (theimo1221) Harden Event Handling to prevent rare permanent busy occasions
* (theimo1221) Add support for doorbell device `doorbell_graham_cracker`

### 3.0.0-beta.11 (2022-05-24)

* (theimo1221) Add processing of new token provided by ring.

### 3.0.0-beta.10 (2022-05-24)

* (theimo1221) Add `lpd_v4` Doorbell

### 3.0.0-beta.9 (2022-05-21)

* (theimo1221) For stability reasons, perform an active refresh every 2 hours.

### 3.0.0-beta.8 (2022-05-17)

* (theimo1221) Fix writing to iobroker-data/files folder (thx to Apollon)

### 3.0.0-beta.7 (2022-05-16)

* (theimo1221) Prevent Crashes on unsupported devices

### 3.0.0-beta.6 (2022-05-16)

* (theimo1221) Record more events (without recording twice)
* (theimo1221) Improve snapshot deleting for initial snapshot after restart

### 3.0.0-beta.5 (2022-05-14)

* (theimo1221) Prevent crashes during installation by clearer enforcing of node 16

### 3.0.0-beta.4 (2022-05-14)

* (theimo1221) Changes in io-package.json for release workflow

### 3.0.0-beta.3 (2022-05-14)

* (theimo1221) Rewrite V3 (Breaking Changes listed below)
* (theimo1221) Update packages
* (theimo1221) Fix in GitHub release workflow

### 2.0.0-beta.3 (2022-02-08)

* (theimo1221) Fix adapter checker issues

### 2.0.0-beta.0 (2022-02-05)

* (theimo1221) Update packages
* (theimo1221) Add JS-Controller 4.0 dependency
* (theimo1221) On ding --> First take snapshot then livestream

### 1.2.8 (2021-10-14)

* (theimo1221) Update packages

### 1.2.6 (2021-09-05)

* (theimo1221) Update packages
* (theimo1221) Stop adapter on unhandled Error
* (theimo1221) Terminate adapter on invalid ring credentials

### 1.2.4-1 (2021-08-12)

* (theimo1221) Update packages

### 1.2.4-0 (2021-08-07)

* (theimo1221) Refactoring
* (theimo1221) Update packages

### 1.2.3 (2021-07-30)

* (theimo1221) Update packages
* (theimo1221) Fix compatibility issues with new ring api

### 1.2.2 (2021-05-05)

* (theimo1221) Update packages due to security patches

### 1.2.1 (2021-04-09)

* (theimo1221) Bump version

### 1.2.0 (2021-04-08)

* (theimo1221) Add new device type spotlightw as doorbell
* (theimo1221) Update dependencies (ringapi, node-schedule, etc.)

### 1.1.6-3 (2021-03-29)

* (theimo1221) Fix typo preventing Livestream recordings after motion detection
* (theimo1221) Reduce Levels of Log Messages, to not spam iobroker Log

### 1.1.6-2 (2021-03-29)

* (theimo1221) Fixing some Issues while saving snapshots and place Snapshots within 'iobroker-data' Folder.

### 1.1.6-1 (2021-03-26)

* (theimo1221) Support for Floodlight V2
* (theimo1221) Control Floodlight by Switch

### 1.1.5 (04.11.2020)

* (Stübi) Add floodlight

### 1.1.4 (23.05.2020)

* (Stübi) Add new libraries

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
* (Stübi) Add a Two-Factor Auth (2fa) description (Issue #14, Issue #13, Issue #19)

### 1.0.7 (24.12.2019)

* (Stübi) Bugfixing

### 1.0.6 (20.12.2019)

* (Stübi) Bugfixing: Login with username and password changed
* (Stübi) New feature (BETA): Now you can make snapshots in jpg and a livestream in mp4 format. Unfortunately the
  snapshot / livestream does not work always!

### 1.0.5 (18.04.2019)

* (Stübi) Bugfixing
* (Stübi) Using new API. With this API livestreaming and snapshots are possible (work still in progress and not
  supported in this version)
* (Stübi) Fixed an error with js-controller 2.0. You need at least this version with js-controller 2.0
* (Stübi) two face authentication

### 1.0.4 (17.04.2019)

* (Stübi) Bugfixing for Ring Pro

### 1.0.3 (09.03.2019)

* (Stübi) Major change! I had to change the used ring.com API to an other API. The old one did not work anymore. For
  this reason, a lot has to be redesigned.

### 1.0.2 (01.02.2019)

* (Stübi) More debug information

### 1.0.1 (05.01.2019)

* (Stübi) Support js-controller compact mode

### 1.0.0 (04.01.2018)

* (Stübi) Add camera device. For this reason, the device name changed from doorbot to doorbell.

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