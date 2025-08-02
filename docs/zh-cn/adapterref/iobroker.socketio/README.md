---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.socketio/README.md
title: ioBroker socket.io
hash: ADSCIlqm9U+gK84+3fU1fEF8ZdlgfkilsN3ozaWAukA=
---
![标识](../../../en/adapterref/iobroker.socketio/admin/socketio.png)

![安装数量](http://iobroker.live/badges/socketio-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.socketio.svg)
![下载](https://img.shields.io/npm/dm/iobroker.socketio.svg)
![新平台](https://nodei.co/npm/iobroker.socketio.png?downloads=true)

# IoBroker socket.io
该适配器由 WEB 应用程序和适配器使用 websockets 和 socket.io 协议与 ioBroker 进行通信。

**重要提示：自此适配器 v4.0 起，仅使用纯 Websockets！Socket.io 不再由 socket.io 库实现，而是通过纯 WebSockets 进行模拟！**

用户可以使用此适配器通过 Web 套接字将其产品连接到 ioBroker。
实际上，echarts、vis 和许多其他适配器都可以使用此适配器从 ioBroker 中提取数据。

如果可能的话，请使用[`iobroker.ws`](https://github.com/ioBroker/ioBroker.ws)代替此适配器。

您可以在示例[目录](https://github.com/ioBroker/ioBroker.socketio/tree/master/example)中找到使用此界面显示一些数据的简单应用程序。

通过使用socket.io接口，用户应该了解系统的[基础知识和概念](https://github.com/ioBroker/ioBroker)。

阅读有关[物体的结构](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md) 的内容也很有用。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

## 概念简单描述
＃＃＃ 目的
对象是数据点或组的描述。组可以包含其他数据点，在这种情况下称为通道。
如果组由其他通道组成，在这种情况下称为设备。

对象是描述数据点的元信息，可以包含以下内容：最大/最小值、单位、名称、默认值、值的类型、通信适配器的信息（如 IP 地址）等等。

＃＃＃ 状态
状态是数据点的实际值，以 javascript 对象的形式呈现：

```
{
    val: VALUE,
    ack: ACKNOWLEDGED,
    ts: TIMESTAMP, // could be converted into time with "new Date(state.ts)" (In older version of js-controller - "new Date(state.ts * 1000)")
    lc: TIMESTAMP of last change,
    from: ADAPTER_NAME,
    q: QUALITY
}
```

与对象相比，状态本身的变化非常频繁。（通常，对象应该在创建时改变一次，仅此而已）

### 致谢
每个状态都有属性`ack`。它显示了命令的方向。

- 如果 ack=false，则意味着其他适配器想要控制（写入）该变量，以便执行该命令（例如，灯将被打开）。
- 如果 ack=true，则表示设备通知新值。（例如，手动打开灯或检测到运动）

**示例**：我们有一些家庭自动化适配器（HAA），其在地址`haa.0.lamp1`下连接了一盏灯。

- 可以使用物理开关手动打开灯，也可以在 HAA 的帮助下通过 Wi-Fi 打开灯。
- 如果 vis 想要通过 Wi-Fi 打开灯，它应该用 `{value: true, ack: false}` 设置新值。
- 当灯打开时，它通常会通知 HAA 有关新状态，并且应立即用“{value: true, ack: true}”覆盖该值。
- 如果通过物理开关手动关闭灯，它会通过“{value: false, ack: true}”通知 HAA 新状态。

＃＃＃ 质量
每个数据点都有一个属性`q` - *质量*。

＃＃ 用法
您可以找到每种支持方法的描述[这里](https://github.com/ioBroker/ioBroker.socket-classes#web-methods)。

建议使用[套接字类](https://github.com/ioBroker/socket-client)进行沟通。

## 调整 Web-Sockets
在某些 web-sockets 客户端上，通信存在性能问题。
有时，此问题是由于长轮询机制上 socket.io 通信的回退造成的。
您可以设置选项 *强制 Web-Sockets* 以强制仅使用 web-sockets 传输。

<!-- 下一版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### 7.0.8 (2025-03-04)
* (@GermanBluefox) Removed the frequent debug output

### 7.0.7 (2025-03-03)
* (@GermanBluefox) Corrected the problem with the user rights

### 7.0.6 (2025-02-28)
* (@GermanBluefox) Added OAuth2 support

### 7.0.1 (2025-02-11)
* (@GermanBluefox) Adapter was rewritten in TypeScript

### 6.7.1 (2024-06-26)
* (@GermanBluefox) Corrected call of getObjectView with null parameter

### 6.7.0 (2024-04-27)
* (foxriver76) ported to webserver

### 6.6.1 (2024-02-22)
* (@GermanBluefox) Just some packages were updated

### 6.6.0 (2023-10-13)
* (@GermanBluefox) Corrected adapter termination if the alias has no target

### 6.5.7 (2023-10-08)
* (foxriver76) upgrade socket-classes to fix error with vis subscriptions

### 6.5.6 (2023-09-28)
* (@GermanBluefox) upgraded socket-classes to correct the error by unsubscribing on client disconnect

### 6.5.5 (2023-09-14)
* (foxriver76) upgrade socket-classes to fix crash cases

### 6.5.3 (2023-09-05)
* (mcm1957) added missing node16 requirement

### 6.5.2 (2023-08-01)
* (@GermanBluefox) Added the subscribing on the specific instance messages

### 6.4.0 (2023-07-07)
(@GermanBluefox) extended the getObjects function with the possibility to read the list of IDs

### 6.3.5 (2023-03-17)
* (@GermanBluefox) Increased the max size of the message to 200MB

### 6.3.4 (2023-03-03)
* (@GermanBluefox) Allowed deletion of fullcalendar objects

### 6.3.3 (2022-12-22)
* (@GermanBluefox) used new socket-classes

### 6.3.1 (2022-11-27)
* (@GermanBluefox) Added `fileChange` event

### 6.2.0 (2022-11-08)
* (Apollon77) Prepare for future js-controller versions
* (@GermanBluefox) Function `getObjects` for web was extended by devices, channels and enums

### 6.1.10 (2022-08-24)
* (@GermanBluefox) Caught error by subscribing

### 6.1.8 (2022-07-08)
* (@GermanBluefox) Corrected getAdapterInstances method

## License

The MIT License (MIT)

Copyright (c) 2014-2025 @GermanBluefox <dogafox@gmail.com>