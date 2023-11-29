---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.emby/README.md
title: ioBroker.emby
hash: INRdcmfwjy/KRgXm0pGzm0o8bpzqAigeg04Yz3xEbbQ=
---
![标识](../../../en/adapterref/iobroker.emby/admin/emby.png)

![GitHub 许可证](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.emby)
![下载](https://img.shields.io/npm/dm/iobroker.emby.svg)
![GitHub 存储库大小](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.emby)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.emby)
![GitHub 自最新版本以来提交的内容（按日期）](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.emby/latest)
![GitHub 最后一次提交](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.emby)
![GitHub 问题](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.emby)
![NPM版本](http://img.shields.io/npm/v/iobroker.emby.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/emby-stable.svg)
![安装数量](https://iobroker.live/badges/emby-installed.svg)

# IoBroker.emby
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/emby/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **版本：** </br> </br> **测试：** </br> [![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.emby/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.emby/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.emby/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.emby/actions/workflows/codeql.yml)

<!--

## Sentry **此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。
-->
## IoBroker 的 EMBY 适配器
该适配器将允许您连接到 Emby 服务器并控制它。

## 学分
如果没有 @thewhobox <iobroker@mikegerst.de> 的伟大工作，这个适配器是不可能实现的，他编写了这个适配器的初始版本并将其交付给 iobroker-community-adapters 组织。

＃＃ 用法
请按照以下步骤操作，以确保适配器正常工作并且您可以看到所有设备。

1. 编辑设置并输入 IP、ApiKey 以及一些您想要忽略的 DeviceId。

```IP **with** Port => 192.168.0.100:8096```

2. 保存并重新启动适配器。

3. 要查看第一个项目，您必须打开 Emby 客户端来接收一些数据。

```The Adapter will not get Data if **no** client is open.```

## 对象
### 信息
|命令 |描述 |信息 |
| ------------- | ------------- | ------------- |
| x.info.设备名称 |显示设备名称 | |
| x.info.用户名 |显示登录设备的用户名 | |
| x.info.supportedCommands | x.info.supportedCommands |支持的命令列表 | |

＃＃＃ 媒体
|命令 |描述 |信息 |
| ------------- | ------------- | ------------- |
| x.media.description |所显示文件的描述。 | |
| x.media.isMated |如果媒体静音。 |并非所有设备都支持此功能，并且将为 False。 |
| x.media.state |媒体状况。 |播放、暂停、空闲 |
| x.media.title |显示文件的标题。 | |
| x.media.type |显示文件的类型。 |剧集、电影、音频、无等 |
| x.media.seasonName |季节的名称|仅当 .media.type 为 Episode 时，否则将为空。 |
| x.media.seriesName | x.media.seriesName |系列名称 |仅当 .media.type 为 Episode 时，否则将为空。 |

### 命令
|命令 |描述 |信息 |
| ------------- | ------------- | ------------- |
| x.command.dialog | x.command.dialog |在所选设备上显示一个对话框。 |例如： Header\|一些文本（如果没有给出 header，ioBroker 将是 Header）|
| x.command.go首页 |向选定的设备发送命令，该设备将返回主屏幕 | |
| x.command.message | x.command.message |在所选设备上显示消息 5 秒。 | |
| x.command.play |播放媒体 |仅当媒体暂停时 |
| x.command.pause | x.command.pause | x.command.pause暂停媒体 |仅当媒体正在播放时|
| x.command.toggleplay | x.command.toggleplay |切换播放状态 |播放/暂停 |
| x.command.mute | x.command.mute |使设备静音 | |
| x.command.unmute | x.command.unmute |取消设备静音 | |
| x.command.togglemute | x.command.togglemute |切换设备静音 | |
| x.command.volume | x.command.volume |设置所选设备的音量。 |不适用于大多数设备，因为它不控制电视音量。 |

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.1 (2023-11-20)
-   (mcm1957) Dependencies have been updated.

### 1.1.0 (2023-11-20)
-   (mcm1957) Adapter requires nodejs 16 now.
-   (mcm1957) Adapter has been moved into iobroker-community-adapters oragnization.
-   (thewhobox) An error causing multiple 'undefined' messages has been fixed. [#23]
-   (mcm1957) Dependencies have been updated.

### 1.0.3
* Added more info for playing item

### 1.0.0
* First stable public release
* Added support for Https and Http
* Added Url to Posters
* Added Datapoint for Endtime (hh:mm)

### 0.1.2
* Added more commands

### 0.1.1
* Added delay if you watch mor episodes

### 0.1.0
* Added automatic try reconnect after one minute

### 0.0.4
* added compact mode

### 0.0.3
* added new states, connection state and more improvment

### 0.0.2
* added more states
* added DisplayMessage

### 0.0.1
* Initial version

## License

MIT License

Copyright (c) 2023 iobroker-community-adapters
Copyright (c) 2020-2023 thewhobox

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