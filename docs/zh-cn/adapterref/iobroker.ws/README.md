---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ws/README.md
title: ioBroker.ws
hash: INr2VSqFnWRZnzK+Xx/sJoaU6kMSZ9W3PQSbEEvxeGQ=
---
![标识](../../../en/adapterref/iobroker.ws/admin/ws.png)

![安装数量](http://iobroker.live/badges/ws-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.ws.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ws.svg)
![新平台](https://nodei.co/npm/iobroker.ws.png?downloads=true)

# IoBroker.ws
该适配器由 WEB 应用程序和适配器使用 websockets 与 ioBroker 进行通信。

它与`ioBroker.socketio`几乎相同，但不使用 socket.io 库，仅对其进行模拟。

**重要提示：自此适配器 v4.0 起，仅使用纯 Websockets！Socket.io 不再由 socket.io 库实现，而是通过纯 WebSockets 进行模拟！**

用户可以使用此适配器通过 Web 套接字将其产品连接到 ioBroker。
实际上，echarts、vis 和许多其他适配器都可以使用此适配器从 ioBroker 中提取数据。

您可以在示例[目录](https://github.com/ioBroker/ioBroker.ws/tree/master/example)中找到使用此界面显示一些数据的简单应用程序。

通过使用socket.io接口，用户应该了解系统的[基础知识和概念](https://github.com/ioBroker/ioBroker)。

阅读有关[物体的结构](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md) 的内容也很有用。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

## 概念简单描述
＃＃＃ 目的
对象是数据点或组的描述。组可以包含其他数据点，在这种情况下称为通道。如果组由其他通道组成，在这种情况下称为设备。

对象是描述数据点的元信息，可以包含以下内容：最大/最小值、单位、名称、默认值、值的类型、通信适配器的信息（如IP地址）等等。

＃＃＃ 状态
状态是数据点的实际值，以 JavaScript 对象呈现：

```json
{
    "val": VALUE,
    "ack": ACKNOWLEDGED,
    "ts": TIMESTAMP, // could be converted into time with "new Date(state.ts)" (In older version of js-controller - "new Date(state.ts * 1000)")
    "lc": TIMESTAMP of last change,
    "from": ADAPTER_NAME,
    "q": QUALITY
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

<!-- 下一版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### 3.0.19 (2025-03-04)
* (@GermanBluefox) Removed the frequent debug output

### 3.0.18 (2025-03-03)
* (@GermanBluefox) Corrected the problem with the user rights

### 3.0.17 (2025-02-28)
* (@GermanBluefox) Added OAuth2 authentication

### 3.0.5 (2025-02-11)
* (@GermanBluefox) Corrected address detection
* (@GermanBluefox) Corrected language settings

### 3.0.4 (2025-02-11)
* (@GermanBluefox) Adapter was rewritten in TypeScript

### 2.7.0 (2024-11-17)
* (@GermanBluefox) Update ws-server library

### 2.6.2 (2024-06-26)
* (@GermanBluefox) Corrected call of getObjectView with null parameter

### 2.6.1 (2024-04-22)
* (foxriver76) fixed require of webserver

### 2.6.0 (2024-04-21)
* (foxriver76) use `@iobroker/webserver`

### 2.5.11 (2024-02-22)
* (@GermanBluefox) Some packages were updated

### 2.5.10 (2023-12-17)
* (foxriver76) updated ws-server to increase the file limit to 500 MB

### 2.5.9 (2023-12-14)
* (joltcoke) Corrected the crash if authentication is enabled

### 2.5.8 (2023-10-11)
* (@GermanBluefox) Corrected adapter termination if the alias has no target

### 2.5.7 (2023-10-07)
* (foxriver76) upgraded socket-classes to fix vis problems

### 2.5.6 (2023-09-28)
* (@GermanBluefox) upgraded socket-classes to correct the error by unsubscribing on client disconnect

### 2.5.5 (2023-09-14)
* (foxriver76) upgraded socket-classes to fix crash cases

### 2.5.4 (2023-09-05)
* (mcm1957) added missing node16 requirement

### 2.5.3 (2023-08-01)
* (@GermanBluefox) Added the subscribing on the specific instance messages

### 2.4.0 (2023-07-07)
* (@GermanBluefox) extended the getObjects function with the possibility to read the list of IDs

### 2.3.6 (2023-03-03)
* (@GermanBluefox) Allowed deletion of fullcalendar objects

### 2.3.5 (2023-01-29)
* (@GermanBluefox) added `publishFileAll` method (for future use)

### 2.3.4 (2022-12-27)
* (@GermanBluefox) corrected connection string

### 2.3.3 (2022-12-22)
* (@GermanBluefox) used new socket-classes

### 2.3.1 (2022-11-27)
* (@GermanBluefox) Added `fileChange` event

## License
The MIT License (MIT)

Copyright (c) 2014-2025 @GermanBluefox <dogafox@gmail.com>