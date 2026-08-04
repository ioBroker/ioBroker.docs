---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bosesoundtouch/README.md
title: ioBroker.bosesoundtouch
hash: tRUq1CtamiFkHWUlCmVlUJHHrhkrWRQqGJrM8+mYHvU=
---
![标识](../../../en/adapterref/iobroker.bosesoundtouch/admin/bosesoundtouch.png)

![安装数量](http://iobroker.live/badges/bosesoundtouch-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.bosesoundtouch.svg)
![下载](https://img.shields.io/npm/dm/iobroker.bosesoundtouch.svg)

# IoBroker.bosesoundtouch
![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.bosesoundtouch/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/bosesoundtouch/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

适用于 ioBroker 物联网平台的 Bose SoundTouch 适配器

## 控制状态
要控制扬声器，可以编写以下对象：

| 状态 | 描述 |
| :---           | :---        |
| 密钥 | 要发送的密钥如下：<br><br>玩<br>暂停<br>停止<br>上一曲目<br>下一曲目<br>竖起大拇指<br>差评<br>收藏<br>力量<br>沉默的<br>音量增大<br>音量减小<br>PRESET_1<br> PRESET_2<br> PRESET_3<br>预设_4<br>预设_5<br> PRESET_6<br>辅助输入<br>取消<br>随机播放<br>重复关闭<br>重复一次<br>重复所有<br>播放/暂停<br>添加收藏<br>移除收藏<br>无效密钥 |
| 已静音 | 将设备静音或取消静音。 |
| 开 | 打开或关闭设备电源。 |
| playEverywhere | 将扬声器设置为区域主控，并在所有其他扬声器上播放其内容。 |
| 音量 | 将设备音量调整至 0 到 100 之间。 |
| 直播 | 直接播放 http/https 音频直播流。例如：http://liveradio.swr.de/sw282p3/swr3/play.mp3 |

## 信息状态
以下信息来自您的扬声器（只读状态）：

### 设备信息
| 状态 | 描述 |
| :---       | :---        |
| ipAddress | 设备 IP 地址，通常与您在适配器设置中配置的地址相同。 |
| macAddress | 设备 MAC 地址 |
| 名称 | 您在 SoundTouch 应用中配置的名称。 |
| 类型 | 设备类型（例如 SoundTouch 300）。 |

### 正在播放
| 状态 | 描述 |
| :---       | :---        |
| 专辑 | 当前播放的专辑。 |
| 艺术作品 | 源艺术作品的网址。 |
| 艺术家 | 当前正在播放的艺术家。 |
| 类型 | 当前播放曲目的类型。 |
| 源 | 正在播放的服务类型或名称。要确定产品是否处于待机模式，请检查源是否等于 STANDBY。 |
| 电台 | 电台或播放列表的名称。 |
| 曲目 | 当前播放的曲目。 |

### 预设
以下6种预设状态均存在：

| 状态 | 描述 |
| :---       | :---        |
| iconUrl | 源图像的 URL。 |
| 名称 | 根据来源不同，可能指专辑、电台、播放列表、歌曲、电话号码等的名称。 |
| 来源 | 服务的类型或名称。 |

### 区域
以下说明将帮助您在多房间系统中创建群组。只读字段由 SoundTouch 设备自动更新，即使您通过 SoundTouch 应用程序更改了群组，也会自动更新。

| 状态 | 描述 |
| :---       | :---        |
| masterOf | 显示扬声器的从属设备的 MAC 地址（以“;”）（只读） |
| memberOf | 显示此扬声器主控设备的 MAC 地址（只读）|
| addMasterOf| 添加要添加到此主扬声器的扬声器的 MAC 地址。也可以添加多个扬声器（用“;”) 分隔）。 |
| removeMasterOf| 添加要从此主扬声器中移除的扬声器的 MAC 地址。也可以添加多个扬声器（用“;”) 分隔）。 |

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.13.0 (2026-07-11)
- (JR-home) Control objects have been extended to suppiort playing a livestream directly
- (mcm1957) Deprecated delete state has been migrated.
- (mcm1957) Dependencies have been updated

### 0.12.0 (2026-05-09)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mcm1957) Dependencies have been updated
- (copilot) Migrated to ESLint 9 and @iobroker/eslint-config following ioBroker community standards

### 0.11.1 (2024-04-03)
* (mcm1957) Release workflow has been fixed

### 0.11.0 (2024-04-03)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Testing has been changed to support node 18 and 20
* (mcm1957) Dependencies have been updated

### 0.10.3 (2022-06-17)
* (Apollon77) Fix crash case reported by Sentry

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2019-2022 SwedishChef <swedish.chef@gmx.at>

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