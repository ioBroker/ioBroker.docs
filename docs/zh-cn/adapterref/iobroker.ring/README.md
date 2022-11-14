---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ring/README.md
title: 环适配器
hash: BVIA7BeS5PgjNWVxnjPjl5RqQbirM8xg7AS2/9pSL8c=
---
![标识](../../../en/adapterref/iobroker.ring/admin/ring.png)

![Travis CI 构建状态](https://travis-ci.org/iobroker-community-adapters/ioBroker.ring.svg?branch=master)
![AppVeyor 构建状态](https://ci.appveyor.com/api/projects/status/github/iobroker-community-adapters/ioBroker.ring?branch=master&svg=true)
![安装数量](http://iobroker.live/badges/ring-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.ring.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ring.svg)
![新PM](https://nodei.co/npm/iobroker.ring.png?downloads=true)

# 环适配器
需要 Admin v4 和`node 16.x`。

Ring 适配器可与 Ring Video Doorbell 和 Ring Cam 等 Ring 设备配合使用，并显示是否有人按门铃或检测到运动。如果检测到运动或门铃，则环形视频门铃或摄像头会发送视频流。

## 安装和配置
安装适配器后，您必须输入您的 [环网](https://ring.com) 帐户的电子邮件和密码以及令牌。 Ring 现在需要对所有帐户使用双重身份验证 (2fa)。要获取令牌，请在您的外壳上执行以下操作。

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

您可以为直播和快照路径和文件名使用特殊变量。这些变量将替换为计数器、时间戳、环 ID 或环类型。

* `%d`: Unix 时间戳。示例：`test_%d -> test_1588331430061`
* `%i`：你的环设备的 ID：例如：`test_%i -> test_234567890`
* `%n`: 自环实例启动以来的计数器。示例：`test_%n -> test_1`
* `%k`：你的响铃设备类型：例如：`test_%k -> test_doorbell`

＃＃＃ 常问问题
#### 我没有收到有关运动或检测到的人的事件、快照和视频
恭喜，您当前的令牌很可能被环列入黑名单，拒绝您需要的推送通知。
解决此问题的最佳方法是删除 ring 网站上任何以前的浏览器/适配器令牌并为适配器生成一个新令牌。

为了让这个适配器正确地对事件做出反应，Ring 必须将推送通知发送到使用的[环 Api 客户端](https://github.com/dgreif/ring)，以便该适配器对其做出反应。此适配器中的逻辑经过多次检查并适用于大量用户，因此如果您遇到有关丢失事件的问题，则不太可能是此适配器的故障。

### V3 重写重大更改
1. 设备名称通过它们的描述得到扩展（例如来自 `Device 1234567`

   至`Device 1234567 ("Floodlight Garden")`)

2. 快照/直播数据现在位于相应的频道中，包含其他数据点。
3. 快照/直播对象从元类型更改为文件类型状态。
4. 事件（Motion、Ding 等）现在位于各自的频道中。
5. 由于 `ring-api` 放弃了对 `v16.x` 之前的节点的支持，这个适配器需要 `node v16.x` 或 `node v18.x`
6. 活动刷新减少到每 2 小时一次，因为我们正在侦听/响应事件。

### SIP（版本 3.x 之前）
您可以将 SIP 信息用于与您的 SIP 客户端进行 SIP 视频会议。
适配器不会提供所有环设备，因为使用的 API 不包括所有环设备。

例如，您可以在 [http://icanblink.com/](http://icanblink.com/) 上使用 Blink SIP 客户端。要使视频正常工作，请进入 Blink 的首选项并在“帐户”下，将选项卡切换到“媒体”并取消选择“RTP 选项”下的“加密音频和视频”。请注意 SIP 信息会在几秒钟后过期！希望我能尽快支持视频流。遗憾的是 [环网](https://ring.com) 没有支持此功能的官方 API。
如果您按下 `livestream request` 按钮，您将获得用于建立 SIP 视频呼叫会话的新 SIP 信息。
如果您使用 [环网](https://ring.com) 云，您会在历史记录下找到指向您上次动作/门铃录制视频的 http 链接。

### `package.json`中的脚本
为方便起见，预定义了几个 npm 脚本。您可以使用`npm run <scriptname>`运行它们

|脚本名称 |说明 |
| `build:ts`|编译 TypeScript 源代码。 |
| `watch:ts`|编译 TypeScript 源代码并观察变化。 |
| `watch`| `npm run watch:ts`的快捷方式|
| `test:ts`|执行您在 `*.test.ts` 文件中定义的测试。 |
| `test:package`|确保您的 `package.json` 和 `io-package.json` 有效。 |
| `test:unit`|使用单元测试测试适配器启动（快速，但可能需要模块模拟才能工作）。 |
| `test:integration`|使用 ioBroker 的实际实例测试适配器启动。 |
| `test`|对包文件和您的测试执行最小的测试运行。 |
| `check`|对您的代码执行类型检查（不编译任何内容）。 |
| `coverage`|使用您的测试文件生成代码覆盖率。 |
| `lint`|运行 `ESLint` 以检查您的代码是否存在格式错误和潜在错误。 |
| `lint` |运行 `ESLint` 来检查您的代码是否存在格式错误和潜在错误。 |
| `release`|创建一个新版本，有关详细信息，请参阅[`@alcalzone/发布脚本`](https://github.com/AlCalzone/release-script#usage)。 |

### 编写测试
如果做得好，测试代码是无价的，因为它让您有信心更改代码，同时确切地知道是否以及何时出现问题。关于测试驱动开发主题的好读物是 https://hackernoon.com/introduction-to-test-driven-development-tdd-61a13bc92d92。
虽然在代码之前编写测试一开始可能看起来很奇怪，但它有非常明显的好处。

该模板为您提供适配器启动和包文件的基本测试。
建议您将自己的测试添加到组合中。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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

Copyright (c) 2018-2022 Thorsten <thorsten@stueben.de> / <https://github.com/schmupu>

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