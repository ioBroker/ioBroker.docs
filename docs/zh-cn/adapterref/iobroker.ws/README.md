---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ws/README.md
title: ioBroker.ws
hash: cHFDPzB1oFJRb2WVniS1yyYafFjUmhajBRgWuIskwtU=
---
![标识](../../../en/adapterref/iobroker.ws/admin/ws.png)

![安装数量](http://iobroker.live/badges/ws-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.ws.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ws.svg)
![新PM](https://nodei.co/npm/iobroker.ws.png?downloads=true)

# IoBroker.ws
WEB 应用程序和适配器使用此适配器使用 websockets 与 ioBroker 进行通信。

它与`ioBroker.socketio`几乎相同，但不使用socket.io库，仅对其进行模拟。

**重要提示：由于此适配器的 v4.0 仅使用纯 Websockets！ Socket.io 不再由 socket.io 库实现，而是通过纯 WebSockets 模拟！**

用户可以使用此适配器通过网络套接字将他们的产品连接到 ioBroker。实际上这个适配器是例如Flot、Rickshaw、Vis 和 mobile 用于从 ioBroker 提取数据。

您可以在示例[目录](https://github.com/ioBroker/ioBroker.ws/tree/master/example) 中找到使用此界面显示一些数据的简单应用程序。

通过使用 socket.io 界面，用户应该了解系统的[基础和概念](https://github.com/ioBroker/ioBroker)。

阅读 [对象的结构](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md) 也很有用。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

##概念简述
＃＃＃ 目的
对象是数据点或组的描述。在这种情况下，组可以满足其他数据点，它称为通道。如果组在这种情况下由其他通道组成，则称为设备。

对象是描述数据点的元信息，可以包含：最大值/最小值、单位、名称、默认值、值类型、用于通信的适配器信息（例如 IP 地址）等。

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

与对象相比，状态本身的变化非常频繁。 （通常对象应该通过创建更改一次，仅此而已）

### 致谢
每个状态都有属性“ack”。它显示了指挥的方向。

- 如果 ack=false，则表示其他适配器想要控制（写入）该变量，以便执行该命令（例如，灯将打开）。
- 如果 ack=true，表示设备通知新值。 （例如手动打开灯或检测到运动）

**示例**：我们有一些家庭自动化适配器 (HAA)，它在地址 `haa.0.lamp1` 下连接了一个灯。

- 灯可以通过物理开关手动打开，也可以在 HAA 的帮助下通过 Wi-Fi 开启。
- 如果 vis 想通过 Wi-Fi 打开灯，它应该使用```{value: true, ack: false}```设置新值。
- 当灯打开时，通常会通知 HAA 新状态，该值应立即用 ```{value: true, ack: true}``` 覆盖。
- 如果灯是通过物理开关手动关闭的，它会通过```{value: false, ack: true}```通知HAA关于新状态。

＃＃＃ 质量
每个数据点都有一个属性`q` - *质量*。

＃＃ 用法
建议使用 example/conn.js 进行通信。

包含 conn.js 文件后，全局对象 `servConn` 可用于建立与 socketio 适配器的通信。

`servConn`对象有空心化方法：

＃＃＃ 在里面
- 函数（connOptions、connCallbacks、objectsRequired）

`connOptions` - 是可选参数：

```
connOptions = {
    name:          'name of the connection', // optional - default 'vis.0', used to distinguish connections in socket-io adapter.
    connLink:      'http://localhost:8084',  // optional - URL of the socket.io adapter. By default it is same URL where the WEB server is.
    socketSession: ''                        // optional - default 'nokey', and used by authentication
};
```

您也可以通过在调用“init”之前定义全局变量来传递这些参数：

```
var socketUrl      = 'http://localhost:8084';  // is connOptions.connLink
var socketSession  = '';                       // is connOptions.socketSession
servConn.namespace = 'myapp';                  // is connOptions.name
```

`connCallbacks` - 带有回调的对象：

```
connCallbacks = {
    onConnChange:   function (isConnected) {}, // optional - called if connection state changed.
    onObjectChange: function (id, obj)     {}, // optional - called if content of some object is changed, new object created or object was deleted (obj = null)
    onUpdate:       function (id, state)   {}, // optional - called if state of some object is changed, new state for object is created or state was deleted (state = null)
    onError:        function (error)       {}  // optional - called if some error occurs
};
```

### 设置状态
- 函数（pointId、值、回调）

设置一些数据点的新值。

例如。 ```servConn.setState('adapter.0.myvalue', true)``` 将 ```{val: true, ack: false}``` 写入 *adapter.0.myvalue*。

- `pointId` - 是状态的 ID，如 `adapter.0.myvalue`，
- `value` - 状态的新值，可以是简单值（字符串、数字、布尔值）或对象，如```{val: newValue, ack: false, q: 0}```。

如果使用简单值，“ack”将设置为“false”。

- `callback` - ```function (error) {}``` - 在将新值写入 DB 时调用（而不是在控制设备时）。

### 获取状态
- 函数（ID、回调）

获得多个状态的状态。该命令通常在连接建立后调用，以获取使用数据点的实际状态。

- `IDs` - 带有 ID 的模式或数组。可以省略以获取所有状态。模式可以有通配符，例如：'*.STATE'、'haa.0.*'
- `callback` - ```function (error, states) {}``` - *states* 是像 ``{'id1': 'state1', 'id2': 'state2', ...} ```。 *stateX* 是具有 [above](#state) 描述的结构的对象。

### Http获取
- 功能（网址，回调）

从运行 socketio 适配器的 PC 调用此 URL。

- `url` - 是要调用的地址。
- `callback` - ```function (data) {}``` - 请求的结果（html body）。

### 日志错误
- 函数（错误文本）

将错误消息写入控制器的日志。

### 获取配置
- 函数（回调）

以浮点数、日期格式读取控制器配置，如语言、温度单位、点或逗号分隔符。

- `callback` - ```function (err, config) {}``` - 配置看起来像：

```
{
  "_id": "system.config",
  "type": "config",
  "common": {
    "name":             "System configuration",
    "language":         "de",
    "tempUnit":         "°C",
    "currency":         "€",
    "dateFormat":       "DD.MM.YYYY",
    "isFloatComma":     true,
    "licenseConfirmed": true,
    "activeRepo":       "fast-online",
    "diag":             "extended",
    "defaultHistory":   ""
  }
}
```

### 获取对象
- 函数（id，回调）

从数据库中读取特定对象。使用此功能可以读取某些对象的元信息。

- `id` - 状态的 id，如“haa.0.light1”，
- `callback` - ```function (error, obj)``` - obj 看起来像：

```
{
  "_id": "haa.0.light1",
  "type": "state",
  "common": {
    "def": false,
    "type": "boolean",
    "read": false,
    "write": true,
    "role": "switch",
    "name": "light in floor"
  },
  "native": {
    "CONTROL": "BUTTON.LONG",
    "DEFAULT": false,
    "FLAGS": 1,
    "ID": "PRESS_LONG",
    "MAX": true,
    "MIN": false,
    "OPERATIONS": 6,
    "TAB_ORDER": 1,
    "TYPE": "ACTION",
    "UNIT": ""
  },
  "enums": ['enum.rooms.floor'],
  "acl": {
    "object": 1638,
    "state": 1638
  }
}
```

### 获取对象
- 函数（回调）

从数据库中读取所有对象。

- `callback` - ```function (error, objs)``` - objs 看起来像：```{'id1': 'object1', 'id2': 'object2', ...}```

### 读取目录
- 函数（目录名，回调）

读取指定目录中的文件和目录。

文件存储在 DB（或类似文件）中，通常不应直接访问。文件名由路径、文件名和文件扩展名组成，如“/mobile.0/data/fileName.txt”。

- dirName - 目录名称，如 */mobile.0/data*
- 回调 - ```函数（错误，列表）``` - 列表看起来像：

```
[
    {
        file:       'file1.txt',
        stats:      {
                      mode: 33188,
                      size: 527,
                      atime: Mon, 10 Oct 2011 23:24:11 GMT,
                      mtime: Mon, 10 Oct 2011 23:24:11 GMT,
                      ctime: Mon, 10 Oct 2011 23:24:11 GMT,
                      birthtime: Mon, 10 Oct 2011 23:24:11 GMT
                    },
        isDir:      false,
        modifiedAt: timeInMs, // new Date().getTime()
        createdAt:  timeInMs, // new Date().getTime()
    },
    {
        file:       'main',
        stats:      {
                      mode: 33188,
                      atime: Mon, 10 Oct 2011 23:24:11 GMT,
                      mtime: Mon, 10 Oct 2011 23:24:11 GMT,
                      ctime: Mon, 10 Oct 2011 23:24:11 GMT,
                      birthtime: Mon, 10 Oct 2011 23:24:11 GMT
                    },
        isDir:      true,
        modifiedAt: timeInMs, // new Date().getTime()
        createdAt:  timeInMs, // new Date().getTime()
    },
    ...
]
```

### Mkdir
- 函数（目录名，回调）

- `回调` - ```函数（错误）{}```

###取消链接
- 函数（名称，回调）

删除文件或目录。目录必须为空才能删除。

- dirName - 目录或文件的名称，如 */mobile.0/data*。
- `回调` - ```函数（错误）{}```

### 读取文件
- 函数（文件名，回调）

- `回调` - ```函数（错误，文件数据，mimeType）```

### 读取文件64
- 函数（文件名，回调）

- `callback` - ```function (error, data)``` - 数据是```{mime: mimeType, data: base64data}```

### 写入文件
- 函数（文件名、数据、模式、回调）

- `回调` - ```函数（错误）{}```

### WriteFile64
- 函数（文件名、数据、模式、回调）

- `回调` - ```函数（错误）{}```

＃＃＃ 重新命名文件
- 函数（旧名称、新名称、回调）

- `回调` - ```函数（错误）{}```

### 获取历史
- 函数（实例、选项、回调）

- `回调` - ```函数（错误，数据，步骤，sessionId）{}```

### 要求日志
- 函数（isRequire，回调）

激活/停用此套接字的日志接收。

- `回调` - ```函数（错误）{}```

### AuthEnabled
- 功能 （）

读取是否启用了身份验证以及哪个用户已登录

- `回调` - ```函数（authEnabled，currentUser）{}```

如果启用了身份验证，则返回当前登录的用户，如果禁用了身份验证，则返回默认用户“running as”。

## 调整 Web 套接字
在某些 web-sockets 客户端上，通信存在性能问题。有时这个问题是由于 socket.io 通信在长轮询机制上的后备。
您可以设置选项 *Force Web-Sockets* 以强制仅使用 web-sockets 传输。

<!-- 下一个版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### 2.0.0 (2022-05-12)
* (bluefox) Used common sockets (could be buggy)

### 1.3.0 (2022-03-27)
* (bluefox) Added `log` socket command

### 1.2.0 (2022-02-21)
* (bluefox) Made it possible to have more than one socket from one page

### 1.1.6 (2022-02-16)
* (bluefox) Added `unlink` and `rename` to web functions

### 1.1.4 (2022-02-13)
* (bluefox) Changed name `info.connection` to `info.connected`

### 1.1.2 (2022-02-13)
* (bluefox) Updated ws client file

### 1.1.1 (2022-02-02)
* (bluefox) Updated ws client file

### 1.1.0 (2022-01-31)
* (bluefox) Distributed the compatible client file together with the backen

### 1.0.1 (2022-01-30)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2014-2022 bluefox <dogafox@gmail.com>