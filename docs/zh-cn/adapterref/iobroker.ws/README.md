---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ws/README.md
title: ioBroker.ws
hash: O869NPKJcRTO44Sz17Hz0dXrl3LKDNy0MQbUb7arwHs=
---
![标识](../../../en/adapterref/iobroker.ws/admin/ws.png)

![安装数量](http://iobroker.live/badges/ws-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.ws.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ws.svg)
![国家公共管理](https://nodei.co/npm/iobroker.ws.png?downloads=true)

# IoBroker.ws
WEB 应用程序和适配器使用此适配器使用 websocket 与 ioBroker 进行通信。

它与`ioBroker.socketio`几乎相同，但不使用socket.io库，只是模拟它。

**重要提示：自该适配器 v4.0 起，仅使用纯 Websockets！ Socket.io不再由socket.io库实现，而是通过纯WebSockets模拟！**

用户可以使用此适配器通过网络套接字将其产品连接到 ioBroker。
实际上，echarts、vis 和许多其他适配器都可以使用此适配器从 ioBroker 提取数据。

您可以在示例[目录](https://github.com/ioBroker/ioBroker.ws/tree/master/example)中找到使用此界面显示一些数据的简单应用程序。

通过使用socket.io接口，用户应该了解系统的[基础知识和概念](https://github.com/ioBroker/ioBroker)。

阅读 [对象的结构](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md) 也很有用。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。

## 概念简要描述
＃＃＃ 目的
对象是数据点或组的描述。该组可以包含其他数据点，在这种情况下它称为通道。如果一个组由其他通道组成，则在这种情况下称为设备。

对象是描述数据点的元信息，可以包含：最大/最小值、单位、名称、默认值、值类型、用于通信的适配器的信息（例如，ip地址）等。

＃＃＃ 状态
状态是数据点的实际值，由 javascript 对象呈现：

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

与对象相比，状态本身的变化非常频繁。 （通常对象应该在创建时更改一次，仅此而已）

### 致谢
每个状态都有属性`ack`。它显示了命令的方向。

- 如果 ack=false，则意味着其他适配器想要控制（写入）此变量，以便执行该命令（例如，灯将打开）。
- 如果ack=true，则意味着设备通知新值。 （例如，手动打开灯或检测到运动）

**示例**：我们有一些家庭自动化适配器 (HAA)，它在地址 `haa.0.lamp1` 下连接了一盏灯。

- 灯可以通过物理开关手动打开，也可以在 HAA 的帮助下通过 Wi-Fi 手动打开。
- 如果 vis 想通过 Wi-Fi 打开灯，则应使用````{value: true, ack: false}``` 设置新值。
- 当灯打开时，它通常会通知 HAA 有关新状态的信息，并且应立即用````{value: true, ack: true}``` 覆盖该值。
- 如果通过物理开关手动关闭灯，它会通过 ```{value: false, ack: true}``` 通知 HAA 有关新状态的信息。

＃＃＃ 质量
每个数据点都有一个属性`q` - *质量*。

＃＃ 用法
您可以找到每个支持的方法的描述[这里](https://github.com/ioBroker/ioBroker.socket-classes#web-methods)。

建议使用[套接字类](https://github.com/ioBroker/socket-client)进行通信。

<!-- 下一个版本的占位符（在行的开头）：

### **正在进行中** -->

## Changelog
### 2.5.3 (2023-08-01)
* (bluefox) Added the subscribing on the specific instance messages

### 2.4.0 (2023-07-07)
* (bluefox) extended the getObjects function with the possibility to read the list of IDs

### 2.3.6 (2023-03-03)
* (bluefox) Allowed deletion of fullcalendar objects

### 2.3.5 (2023-01-29)
* (bluefox) added `publishFileAll` method (for future use)

### 2.3.4 (2022-12-27)
* (bluefox) corrected connection string

### 2.3.3 (2022-12-22)
* (bluefox) used new socket-classes

### 2.3.1 (2022-11-27)
* (bluefox) Added `fileChange` event

## License
The MIT License (MIT)

Copyright (c) 2014-2023 bluefox <dogafox@gmail.com>