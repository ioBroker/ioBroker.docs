---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hikvision-alarmserver/README.md
title: ioBroker.hikvision-alarmserver
hash: z4bWsccAq81OoH3wJSHVUjcPMdJoHpYRUiVyoPw9AAA=
---
![标识](../../../en/adapterref/iobroker.hikvision-alarmserver/admin/hikvision-alarmserver.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.hikvision-alarmserver.svg)
![下载](https://img.shields.io/npm/dm/iobroker.hikvision-alarmserver.svg)
![安装数量](https://iobroker.live/badges/hikvision-alarmserver-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/hikvision-alarmserver-stable.svg)
![NPM](https://nodei.co/npm/iobroker.hikvision-alarmserver.png?downloads=true)

# IoBroker.hikvision-alarmserver
**测试：** ![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的海康威视警报服务器适配器
用于接收海康威视摄像机发送的警报/事件的适配器。

海康威视机型测试：

- DS-2CD2043G2-I
- DS-2CD2143G2-I
- DS-2DE2A404IW-DE3
- DS-2DE3A404IW-DE/W

如果您的模型不在此列表中，欢迎提交成功/失败/错误报告。

＃＃ 用法
适配器实例为报告的每个摄像机/事件类型组合创建一个布尔状态。摄像头由 MAC 地址标识（受摄像头提供的信息限制）。

似乎当这些事件仍然有效但没有发送消息来清除它们时，摄像机每秒都会重复发出事件。为此，适配器会自动清除超过 5 秒未重新报告的事件。

＃＃ 配置
### IoBroker
＃＃＃＃ 网络
在适配器配置中，选择一个空闲端口供适配器侦听（默认为 8089）。

#### 报警超时
大多数设备通过不断发送警报消息来发出警报*活动*信号。这些设备从不发送 *inactive* 消息。因此，当在给定时间段后未收到消息时，适配器假定警报已清除。在此处指定该时间段（默认 5000 毫秒）。

####频道树
一些摄像头（例如带有多个传感器）在多个通道上报告（不要与 ioBroker 通道混淆）。为了区分每个摄像机通道之间的事件，请检查相应的选项。

对于特定事件类型（例如田地检测、越线等），一些摄像机能够识别运动检测目标（例如人、车辆等）。要在每个适用的事件类型下为每个目标创建一个状态，请选中相应的选项。

＃＃＃＃ 发给
收到的一些事件类型有一个简单的布尔值开/关（持续时间、VMD 等）。对于这些简单的事件，在 ioBroker 的对象树中设置适当的状态就足够了。

但是，接收到的一些事件包括二进制数据，例如图像，将其持续存储在 ioBroker 对象树中是不切实际的。处理此类事件的一种更优雅的机制是使用 ioBroker 的内置消息系统，该系统允许消息对象在适配器之间进行通信。

虽然此功能主要针对图像设计，但也支持由简单的 XML 部分触发发送。

发送的确切消息可在 `Send to message...` 字段中配置。这些字段使用 JavaScript `Function` 对象进行评估，并有两个可用变量：`ctx`（事件上下文对象 - 见下文）并且在图像部分的情况下，原始缓冲区在 §§SSSSS_3§ 中可用§。

##### 示例 1：在通过 Telegram 收到的每个事件上发送文本警报
如果已实施 Telegram 适配器，则可以在 `XML event parts` 部分中设置以下参数：

* 发送到 XML 实例：`telegram.0`
* 发送到 XML 的命令：留空
* Send to message for XML: Note backticks are part of configured value - `` `Received ${ctx.eventType} from ${ctx.deviceName}` ``

##### 示例 2：通过 Telegram 发送图片
如果已实施 Telegram 适配器，则可以在 `Image event parts` 部分中设置以下参数：

* 发送到图片实例：`telegram.0`
*发送到图像命令：留空
* 发送图片消息：`{ text: imageBuffer, type: 'photo' }`

##### 示例 3：将图像发送到自定义 Javascript
一个更复杂的示例是将接收到的每个图像缓冲区发送到在 Javascript 适配器中运行的自定义脚本：

* 发送到实例名称：`javascript.0`
* 发送到命令：`toScript`（这不是示例 - 需要文字字符串）。
*发送消息：`{脚本：'script.js.myImageHandler'，消息：'myImageReceiver'，数据：{设备：ctx.device，图像：imageBuffer}}`

在 Javascript 适配器（实例零）中创建一个名为 `myImageHandler` 的脚本并添加以下代码：

```javascript
onMessage('myImageReceiver', (data, cb) => {
  // data.device holds mac address of device (colons stripped).
  // data.image holds raw image buffer.
  ...
  cb();
});
```

##### 事件上下文对象
`ctx` 事件上下文具有以下属性：

-`macAddress`
-`事件类型`
-`检测目标`
- `channelName`
- `device` - 去掉引号的 MAC 地址（为了与网络工具保持一致）。
- `deviceName` - 来自网络工具的主机名或 `device` 的副本（如果未找到）。
- `stateId` - 此事件触发的状态 ID。
- `eventLogged` - 指示状态已正确触发的布尔值。应该永远是真的。
- `xml` - 已解析的 XML 数据。
- `ts` - 从事件消息中的 `dateTime` 创建的 JavaScript `Date` 对象（如果不可用则接收时间事件）。
- `periodPath` - 当前保存事件部分的文件系统文件夹（每天更改）。
- `fileBase` - 当前消息中所有已保存部分的前缀。
- `files` - 保存作为当前消息处理的一部分转储的所有文件的文件名（包括完整路径）的数组。

#### 保存事件数据
如果选中的事件 XML 和/或图像数据存储在 `iobroker-data/hikvision-alarmserver.<instance>` 下的本地文件系统中。

*警告！* 这些文件当前未被清除或存档，因此请谨慎使用或为此实施外部策略。

### 在相机上
访问您的摄像机的配置页面并定义 ioBroker IP/主机和端口设置：

![报警服务器选项](../../../en/adapterref/iobroker.hikvision-alarmserver/docs/images/alarm-server-options.png)

确保在您要报告给 ioBroker 的事件中链接包括“通知监控中心”。例如：

![运动检测选项](../../../en/adapterref/iobroker.hikvision-alarmserver/docs/images/motion-detection-options.png)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.1.0 (2023-01-24)
-   (Robin Rainton) Added configuration for alarm timeout ([#16](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/16)).
-   (Robin Rainton) Fixed multipart message handling for line crossing/field detection, etc ([#18](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/18)).
-   (Robin Rainton) Optionally save XML/images & send events using `sendTo` to other adapters ([#20](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/20) & [#26](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/26)).
-   (Robin Rainton) Added info.connection state ([#22](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/22)).
-   (Robin Rainton) Handle cases where `TargetRect` is specified in decimals between zero & one ([#24](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/24)).

### 0.0.7 (2022-12-29)
-   (Robin Rainton) Add bind address option ([#9](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/9)).
-   (Robin Rainton) Try to derive device names from net-tools. Optionally use channelName from devices ([#10](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/10)).

### 0.0.6 (2022-12-13)
-   (Robin Rainton) Handle multipart message payload ([#5](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/5)).
-   (Robin Rainton) Handle payloads without XML declaration ([#7](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/7).)

### 0.0.5 (2022-12-10)
-   (Robin Rainton) Drop colons from device IDs.

### 0.0.2
-   (Robin Rainton) initial release.

## License
MIT License

Copyright (c) 2022-2023 Robin Rainton <robin@rainton.com>

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