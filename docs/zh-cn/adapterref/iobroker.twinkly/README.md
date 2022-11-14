---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.twinkly/README.md
title: ioBroker.twinkly
hash: NeaLj4EuJTdrK+PZyNzW0zSgaTV7E5ZftXt0jEvJWCM=
---
![标识](../../../en/adapterref/iobroker.twinkly/admin/twinkly.png)

![安装数量（最新）](http://iobroker.live/badges/twinkly-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/twinkly-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.twinkly.svg)
![下载](https://img.shields.io/npm/dm/iobroker.twinkly.svg)
![应用程序](https://ci.appveyor.com/api/projects/status/github/patrickbs96/ioBroker.twinkly?branch=master&svg=true)
![警报总数](https://img.shields.io/lgtm/alerts/g/patrickbs96/ioBroker.twinkly.svg?logo=lgtm&logoWidth=18)
![已知漏洞](https://snyk.io/test/github/patrickbs96/ioBroker.twinkly/badge.svg)

# IoBroker.twinkly
[![测试和发布](https://github.com/patrickbs96/ioBroker.twinkly/workflows/Test%20and%20Release/badge.svg)](https://github.com/patrickbs96/ioBroker.twinkly/actions?query=workflow%3A%22Test+and+Release%22++)[![CodeQL](https://github.com/patrickbs96/ioBroker.twinkly/workflows/CodeQL/badge.svg)](https://github.com/patrickbs96/ioBroker.twinkly/actions?query=workflow%3ACodeQL)

## IoBroker 的闪烁适配器
适配器与[闪烁的灯光](https://www.twinkly.com/)通信。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

## 设置
以下设置可用：![管理员设置](../../../en/adapterref/iobroker.twinkly/img/admin.png)

在表格中，您可以添加要控制的所有 Twinkly 灯。

|专栏 |说明 |
|--------------|-----------------------------------------------------------------------------------------------------------------|
| `Enabled`|应访问此连接吗？ |
| `IP Address`| Twinkly Lights的IP地址|
| `Mode On`|启用状态`on`时应激活哪个`ledMode`。<br/>颜色、效果、电影、播放列表或最后一个模式 |
| `模式开启` |启用状态“on”时应激活哪个“ledMode”。<br/>颜色、效果、电影、播放列表或最后一个模式 |

选中时会为每个设备创建以下附加状态：

* 设备信息
* MQTT
* 网络状态

以下状态可用：

|状态 |可写 |说明 |
|---------------|--------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `connected`| :x: |设备连接 |
| `firmware`| :x: |固件版本 |
| `ledBri`| :heavy_check_mark: |亮度（使用 -1 禁用控制）|
| `ledColor`| :heavy_check_mark: | LED 颜色，HSV/RGB(W)/HEX (`Color`) |
| `ledConfig`| :heavy_check_mark: | LED 配置 |
| `ledEffect`| :heavy_check_mark: |效果（`Effect`）|
| `ledLayout`| :heavy_check_mark: | LED 布局（禁用以进行进一步测试）|
| `ledMode`| :heavy_check_mark: |模式：电影、色彩、效果、播放列表、关闭、实时（尚不支持）、演示 |
| `ledMovie`| :heavy_check_mark: |活动电影，如果在播放列表功能中添加了多个电影，则可以在此处选择它们。 （`Movie`）|
| `ledPlaylist`| :heavy_check_mark: |活动播放列表条目，在电影之间切换。 （`Playlist`）|
| `ledSat`| :heavy_check_mark: |饱和度 0-100（使用 -1 停用控制）|
| `mqtt`| :heavy_check_mark: | MQTT-连接 |
| `name`| :heavy_check_mark: |姓名 |
| `network`| :x: |网络信息|
| `on`| :heavy_check_mark: |开/关开关 |
| `paused`| :heavy_check_mark: |暂停与 Twinkly 的连接，以便您可以在应用程序中进行更改。否则，您可能会在使用 App | 时断开连接 |
| `timer`| :heavy_check_mark: |更新计时器 |
| `计时器` | :heavy_check_mark: |更新计时器 |

[私有 API 信息](https://xled-docs.readthedocs.io/en/latest/) by [Pavol Babinčák](https://github.com/scrool)

＃＃ 已知的问题
* 电影名称的最大长度为 15 个字符

## 代码示例
### 上传影片
```
sendTo('twinkly.0', 'uploadMovie', {
    connection: 'Fenster',
    movie: {
        frames: [
            [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...],
            [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...],
            ...
        ],
        delay: 250
    }
});
```

### 上传模板影片
上传预定义的电影。

- 0：闪烁蓝白
- 1：闪烁圣诞绿红

```
sendTo('twinkly.0', 'uploadTemplateMovie', {
    connection: 'Fenster',
    index: 0,1
});
```

<!--

### 发送实时帧
```
sendTo('twinkly.0', 'sendrealtimeframe', {
    connection: 'Fenster',
    frame: [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...]
});
```

-->

### 生成特定颜色的框架
以一种颜色返回一个完整的帧。
通过发送属性 `colors` 中的颜色，您将获得返回的帧数组。

```
sendTo('twinkly.0', 'generateFrame', {
    connection: 'Fenster',
    color : '#dd0055' // or {r: 221, g: 0, b: 85}
}, response => {
    // [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...]
    ...
});

sendTo('twinkly.0', 'generateFrame', {
    connection: 'Fenster',
    colors : ['#dd0055', ...] // or [{r: 221, g: 0, b: 85}, ...]
}, response => {
    // [[{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...], ..]
    ...
});
```

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* Fixed polling (ledBri, ledSat)

### 1.0.5 (2022-10-16)
* Fixed error when changing active movie (#173)

### 1.0.4 (2022-10-15)
* Upload Movies
* Upload Generated Movies
* --Send Realtime Frame
* Generate Full Frame in one color (create own frames)
* Update deprecated states to fw 2.6.6
* Update twinkly API Issues from Sentry

### 1.0.3 (2022-07-31)
* Add Online-Status to object-view
* Ignore `*.uid` values, unknown in which release they are available (IOBROKER-TWINKLY-1Q)

### 1.0.2 (2022-07-07)
* Add new values `details.uid` and `details.group.uid` fw >= 2.8.4, fwFamily=G (IOBROKER-TWINKLY-1G, IOBROKER-TWINKLY-1N)

### 1.0.1 (2022-07-05)
* Remove deprecated values from mode

### 1.0.0 (2022-07-03)
* Change refresh logic after State-Change
* Added depcrecated logic to remove states when no longer filled with data from api
* Check new and deprecated values from api response to update state information

### 0.3.1 (2022-07-02)
* Update translations logic i18n

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