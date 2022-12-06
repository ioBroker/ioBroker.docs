---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.twinkly/README.md
title: ioBroker.twinkly
hash: muvjgdJqz/RLycKgQ8P0DO+c2lrqdMKvsGrhqZ1728g=
---
![标识](../../../en/adapterref/iobroker.twinkly/admin/twinkly.png)

![安装数量（最新）](http://iobroker.live/badges/twinkly-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/twinkly-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.twinkly.svg)
![下载](https://img.shields.io/npm/dm/iobroker.twinkly.svg)
![已知漏洞](https://snyk.io/test/github/patrickbs96/ioBroker.twinkly/badge.svg)

# IoBroker.twinkly
[![测试和发布](https://github.com/patrickbs96/ioBroker.twinkly/workflows/Test%20and%20Release/badge.svg)](https://github.com/patrickbs96/ioBroker.twinkly/actions?query=workflow%3A%22Test+and+Release%22++) [![CodeQL](https://github.com/patrickbs96/ioBroker.twinkly/workflows/CodeQL/badge.svg)](https://github.com/patrickbs96/ioBroker.twinkly/actions?query=workflow%3ACodeQL)

## IoBroker 的 twinkly 适配器
与 [闪烁的灯光](https://www.twinkly.com/) 通信的适配器。

**此适配器使用哨兵库自动向开发人员报告异常和代码错误。**有关更多详细信息和如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

## 设置
以下设置可用：![管理员设置](../../../en/adapterref/iobroker.twinkly/img/admin.png)

在表格中，您可以添加所有要控制的 Twinkly 灯。

|栏目 |说明 |
|--------------|---------------------------------------------------------------------------------------------------------------------------------|
| `Enabled` |是否应访问此连接 |
| `IP Address` | Twinkly Lights 的 IP 地址 |
| `Mode On` |启用状态 `on` 时应激活哪个 `ledMode`。<br/>颜色、效果、电影、音乐反应、播放列表或最后模式 |
| `模式开启` |启用状态“on”时应激活哪个“ledMode”。<br/>颜色、效果、电影、音乐反应、播放列表或最后模式 |

选中时会为每个设备创建以下附加状态：

* 设备信息
* MQTT
* 网络状态

以下状态可用：

|状态 |可写 |说明 |
|---------------|--------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `connected` | ：×：|设备已连接 |
| `firmware` | ：×：|固件版本 |
| `ledBri` | :heavy_check_mark: |亮度（使用 -1 停用控制）|
| `ledColor` | :heavy_check_mark: | LED 的颜色，HSV/RGB(W)/HEX (`Color`) |
| `ledConfig` | :heavy_check_mark: | LED 的配置 |
| `ledEffect` | :heavy_check_mark: |效果 (`Effect`) |
| `ledLayout` | :heavy_check_mark: | LED 布局（禁用以进行进一步测试）|
| `ledMode` | :heavy_check_mark: |模式：颜色、效果、电影、音乐反应、播放列表、关闭、实时（尚不支持）、演示 |
| `ledMovie` | :heavy_check_mark: |活动电影，如果在播放列表功能中添加了多部电影，则可以在此处选择它们。 (`Movie`) |
| `ledPlaylist` | :heavy_check_mark: |活动播放列表条目，在电影之间切换。 (`Playlist`) |
| `ledSat` | :heavy_check_mark: |饱和度 0-100（用 -1 停用控制）|
| `mqtt` | :heavy_check_mark: | MQTT-连接 |
| `name` | :heavy_check_mark: |名称 |
| `network` | ：×：|网络信息 |
| `on` | :heavy_check_mark: |开/关开关 |
| `paused` | :heavy_check_mark: |暂停与 Twinkly 的连接，以便您可以在应用程序中进行更改。否则，您可能会在使用 App | 时断开连接。 |
| `timer` | :heavy_check_mark: |更新计时器 |
| `定时器` | :heavy_check_mark: |更新计时器 |

[私有 API 信息](https://xled-docs.readthedocs.io/en/latest/) by [Pavol Babinčák](https://github.com/scrool)

＃＃ 已知的问题
* 电影名称的最大长度为 15 个字符

## 代码示例
### 上传电影
```
sendTo('twinkly.0', 'uploadMovie', {
    connection : 'Fenster',
    frames     : [
        [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...],
        [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...],
        ...
    ],
    delay : 250
});
```

### 上传模板电影
上传预定义的电影。

- 0：闪烁蓝白
- 1: 闪烁圣诞-绿-红

```
sendTo('twinkly.0', 'uploadTemplateMovie', {
    connection : 'Fenster',
    template   : 1
});

```

### 上传闪烁电影
```
sendTo('twinkly.0', 'uploadTwinkleMovie', {
    connection  : 'Fenster',
    baseColor   : '#00873f', // or {r: 0, g: 135, b: 62}
    secondColor : '#c30F15'  // or {r: 195, g: 15, b: 22}
});
```

<!--

### 发送实时帧
```
sendTo('twinkly.0', 'sendrealtimeframe', {
    connection : 'Fenster',
    frame      : [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...]
});
```

-->

### 生成特定颜色的Frame
返回一种颜色的完整帧。
通过发送属性 `colors` 中的颜色，您将获得一组返回的帧。

```
sendTo('twinkly.0', 'generateFrame', {
    connection : 'Fenster',
    color      : '#dd0055' // or {r: 221, g: 0, b: 85}
});
response => {
    // [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...]
    ...
}

sendTo('twinkly.0', 'generateFrame', {
    connection : 'Fenster',
    colors     : ['#dd0055', ...] // or [{r: 221, g: 0, b: 85}, ...]
});
response => {
    // [[{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...], ..]
    ...
}
```

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.0.10 (2022-12-05)
* Add sendTo message `uploadTwinkleMovie` to upload a twinkle movie with own colors
* Update Release Integration in Github Actions and Sentry

### 1.0.9 (2022-11-27)
* Now detects if Twinkly is in a group (firmware >= 2.8.3). If so, the group can only be controlled by the master, the states from the slave are read-only.

### 1.0.8 (2022-11-26)
* Add `musicreactive` Mode
* Add Ukrainian translation
* Rework how objects are created, objects are now created after first connect after startup and updated after a firmware update

### 1.0.7 (2022-11-19)
* Fixed deprecated messages from Sentry with api-validations
* Automatic switch mode had an error with playlists. Playlist item could never be selected.

### 1.0.6 (2022-11-19)
* Fixed polling (ledBri, ledSat)
* Added Connection-Info

### 1.0.5 (2022-10-16)
* Fixed error when changing active movie (#173)

### 1.0.4 (2022-10-15)
* Upload Movies
* Upload Generated Movies
* --Send Realtime Frame
* Generate Full Frame in one color (create own frames)
* Update deprecated states to fw 2.6.6
* Update twinkly API Issues from Sentry

## License
MIT License

Copyright (c) 2022 patrickbs96 <patrickbsimon96@gmail.com>

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