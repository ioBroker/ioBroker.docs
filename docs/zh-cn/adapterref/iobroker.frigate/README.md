---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.frigate/README.md
title: ioBroker.frigate
hash: TIq4HqXLvTWUXSkeAmmvZslfBw3HjbMyXxTo/QbfO9Y=
---
![标识](../../../en/adapterref/iobroker.frigate/admin/frigate.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.frigate.svg)
![下载](https://img.shields.io/npm/dm/iobroker.frigate.svg)
![安装数量](https://iobroker.live/badges/frigate-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/frigate-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.frigate.png?downloads=true)

# IoBroker.frigate
**测试：** ![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.frigate/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。

## IoBroker 的护卫舰适配器
护卫舰工具适配器[护卫舰视频](https://frigate.video/)

＃＃ 设置
- 输入护卫舰网址，例如本地主机:5000 或 192.168.178.2:5000
- 从护卫舰配置中输入 MQTT 端口：1883
- 在 frigate 配置中输入 iobroker 系统的主机或 IP

```
mqtt:
  host: ioBrokerIP
```

  启动 Frigate 和适配器后，您应该在日志中看到一个新的客户端连接

＃＃ 用法
### 统计数据
有关系统和相机的一般信息

### 遥控器
`frigate.0.remote.pauseNotifications` 所有摄像头的暂停通知

### 活动
上次事件以及之前和之后的信息

`frigate.0.events.history` 最近 X 事件的历史记录

历史事件有事件的缩略图以及快照和剪辑的 URL

### 相机名称
相机的状态和设置

Change state 更改相机设置的状态

[有关所有州的详细信息](https://docs.frigate.video/integrations/mqtt/)

`frigate.0.camera_name.motion`

camera_name 当前是否正在检测运动。预期值为 ON 和 OFF。注意：最初检测到运动后，将设置为 ON，直到在 mqtt_off_delay 秒（默认为 30 秒）内没有检测到运动。

`frigate.0.camera_name.person_snapshot`

发布检测到的对象类型的 jpeg 编码帧。当不再检测到对象时，将发布最高置信度图像或再次发布原始图像。
快照的高度和裁剪可以在配置中配置。

`frigate.0.camera_name.history`相机的事件历史记录

`frigate.0.camera_name.remote.notificationText`相机的自定义通知文本`frigate.0.camera_name.remote.notificationMinScore`相机的自定义通知最低分数`frigate.0.camera_name.remote.pauseNotifications`相机的暂停通知

`frigate.0.camera_name.remote.ptz`发送 ptz 命令 https://docs.frigate.video/integrations/mqtt/#frigatecamera_nameptz

## 通知
该适配器可以将事件和对象检测的快照和剪辑发送到 telegram、pushover 和 signal-cbm 等实例

您可以指定多个实例或用户发送快照或剪辑

在设置中激活通知以接收快照或剪辑

对于事件，可以在发送前输入最低分数。 0 = 禁用

事件结束后 5 秒（实例设置）发送剪辑。

您可以使用占位符输入自定义通知文本`{{source}} {{type}} erkannt {{status}} {{score}} {{state}}`

## 集成到vis中
您可以在 vis 中集成快照和剪辑：

快照：

添加 `String img src` 并用作对象 ID：`frigate.0.camera_name.person_snapshot`

添加 `String img src` 并用作对象 ID：`frigate.0.events.history.01.thumbnail`

剪辑：

添加 `HTML` 添加为 HTML：

```
<video width="100%" height="auto" src="{frigate.0.events.history.01.webclip}" autoplay muted>
</video>
```

人数：frigate.0.camera.person 人员事件：frigate.0.events.after.label = person

## 讨论和问题
[https://forum.iobroker.net/topic/64928/frigate-adapter-für-iobroker](https://forum.iobroker.net/topic/64928/frigate-adapter-für-iobroker)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.0 (2024-03-11)

- fix deleting of notification files
- add notification settings

### 1.0.2 (2024-01-29)

- reduce memory usage for clip notifications

### 1.0.1 (2024-01-28)

- fix frigate v12 camera fetching
- fix pushover notifications

### 1.0.0 (2024-01-26)

- New Version with new state structure. Please check you vis and scripts. The new version doesn't need the mqtt adapter and can send directly notification to telegram.

## License

MIT License

Copyright (c) 2024 TA2k <tombox2020@gmail.com>

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