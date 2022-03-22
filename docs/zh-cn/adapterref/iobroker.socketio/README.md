---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.socketio/README.md
title: ioBroker socket.io
hash: NixpEzORuHeSWseO0Rk2CnI94e5xGCi65Gua14wZGoM=
---
![商标](../../../en/adapterref/iobroker.socketio/admin/socketio.png)

![安装数量](http://iobroker.live/badges/socketio-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.socketio.svg)
![下载](https://img.shields.io/npm/dm/iobroker.socketio.svg)
![新PM](https://nodei.co/npm/iobroker.socketio.png?downloads=true)

# IoBroker socket.io
WEB 应用程序和适配器使用此适配器使用 websockets 和 socket.io 协议与 ioBroker 通信。

**重要提示：由于此适配器的 v4.0 仅使用纯 Websockets！ Socket.io 不再由 socket.io 库实现，而是通过纯 WebSockets 模拟！**

用户可以使用此适配器通过网络套接字将他们的产品连接到 ioBroker。实际上这个适配器是例如Flot、Rickshaw、Vis 和 mobile 用于从 ioBroker 提取数据。

您可以在示例[目录](https://github.com/ioBroker/ioBroker.socketio/tree/master/example) 中找到使用此界面显示一些数据的简单应用程序。

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
- 如果灯是通过物理开关手动关闭的，它会通过 ```{value: false, ack: true}``` 通知 HAA 新状态。

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

例如。 ```servConn.setState('adapter.0.myvalue', true)```将```{val: true, ack: false}```写入*adapter.0.myvalue*。

- `pointId` - 是状态的 ID，如 `adapter.0.myvalue`，
- `value` - 状态的新值，可以是简单值（字符串、数字、布尔值）或对象，如```{val: newValue, ack: false, q: 0}```。

如果使用简单值，“ack”将设置为“false”。

- `callback` - ```function (error) {}``` - 在将新值写入 DB 时调用（而不是在控制设备时）。

### 获取状态
- 函数（ID、回调）

获得多个状态的状态。该命令通常在建立连接后调用，以获取已使用数据点的实际状态。

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
### 4.1.5 (2022-03-20)
* (Apollon77) make sure patterns are handled as strings on subscribe/unsubscribe
* (Apollon77) when getHistory is called with instance as string correct the data into an object

### 4.1.4 (2022-02-16)
* (bluefox) Added `unlink` and `rename` to web functions

### 4.1.2 (2022-02-13)
* (bluefox) Corrected the connection indication

### 4.1.0 (2022-01-31)
* (bluefox) Update socket.io library to 2.4.1
* (bluefox) Used json config for settings

### 3.1.5 (2021-10-22)
* (foxriver76) make error logging on failed authentication more specific
* (foxriver76) "request" was replaced by "axios"

### 3.1.4 (2021-01-13)
* (Apollon77) Define instanceObject "connected" to prevent warning with js-controller 3.2

### 3.1.3 (2021-01-12)
* (Apollon77) fix socketio dependency

### 3.1.2 (2021-01-09)
* (bluefox) Support of new Let's Encrypt (only with js-controller 3.2.x)

### 3.0.13 (2020-08-21)
* (bluefox) Added getAdapterName method

### 3.0.12 (2020-07-27)
* (Apollon77) socket.io pingTimeout and pinInterval increased to prevent too fast reconnections and bigger visualizations

### 3.0.11 (2020-07-23)
* (Apollon77) make sure web adapter gets restarted on socketio adapter upgrade

### 3.0.10 (2020-07-16)
* (Apollon77) Error caught when trying to write an empty base64 value into a file (Sentry )

### 3.0.9 (2020-06-11)
* (Apollon77) optimize error handling on webserver initialization again

### 3.0.8 (2020-06-10)
* (Apollon77) Make sure adapter does not crash if getHttp is called with an invalid URL (Sentry IOBROKER-WEB-R)

### 3.0.7 (2020-05-04)
* (Apollon77) webserver initialization optimized again to prevent errors with invalid certificates

### 3.0.6 (2020-04-30)
* (bluefox) errors on webserver initialization are handled properly

### 3.0.5 (2020-04-23)
* (bluefox) Caught the web server errors

### 3.0.4 (2020-04-23)
* fix crash reason when server closes (Sentry IOBROKER-SOCKETIO-2/3/4/5)

### 3.0.3 (2020-04-16)
* (Apollon77) Remove usage of deprecated object methods; prevent js-controller 3.0 warnings
* (Apollon77) Add Sentry error reporting

### 3.0.2 (2020-03-07)
* (bluefox) Unload of adapter was corrected

### 3.0.1 (2020-02-23)
* (Apollon77) Workaround for socket.io bug #3555 added to make sure always the correct client files are delivered

### 3.0.0 (2020-01-15)
* (Apollon77) upgrade all dependencies, especially socketio to current version! This might break ipad 1/2 devices

### 2.1.2 (2019-09-28)
* (Apollon77) optimize shutdown for compact mode

### 2.1.1 (2018-06-09)
* (bluefox) Used socket.io Version 1.7.2
* (bluefox) Fix authentication problem

### 2.1.0 (2018-05-04)
* (bluefox) Used socket.io Version 1.7.4

### 2.0.1 (2018-02-28)
* (bluefox) Dropped support of old browsers. Please do not update if you have iPad 1 and so on.

### 1.9.0 (2018-01-14)
* (bluefox) Ready for admin3

### 1.8.7 (2017-11-29)
* (bluefox) Tune cloud work

### 1.8.5 (2017-10-22)
* (bluefox) Escape [] in subscriptions

### 1.8.4 (2017-10-16)
* (bluefox) Check callback validity

### 1.8.3 (2017-10-09)
* (bluefox) Allow authentication via URL

### 1.8.2 (2017-09-20)
* (bluefox) Fix cmdExec command

### 1.8.1 (2017-09-13)
* (bluefox) Fix user access rights for sendToHost

### 1.8.0 (2017-08-06)
* (bluefox) Support the access to admin via iobroker.pro

### 1.7.5 (2017-05-24)
* (bluefox) fix error if subscribe is empty

### 1.7.4 (2017-01-04)
* (bluefox) fix error with authentication

### 1.7.3 (2016-11-13)
* (bluefox) support of socket extensions

### 1.7.2 (2016-11-06)
* (bluefox) Fix unsubscribe of states

### 1.7.1 (2016-10-11)
* (bluefox) Fix authentication for app

### 1.7.0 (2016-08-30)
* (bluefox) compatible only with new admin

### 1.6.1 (2016-08-29)
* (bluefox) fix error by checking user name

### 1.6.0 (2016-08-27)
* (bluefox) support of letsencrypt certificates

### 1.5.4 (2016-08-26)
* (bluefox) fix error in socket.js

### 1.5.3 (2016-08-14)
* (bluefox) support of force only web sockets transport

### 1.5.2 (2016-07-06)
* (bluefox) support of chained certificates

### 1.5.1 (2016-06-28)
* (bluefox) add sendToHost command

### 1.5.0 (2016-06-17)
* (bluefox) preparations for cloud

### 1.4.1 (2016-05-13)
* (bluefox) change getHistory function

### 1.4.0 (2016-04-24)
* (bluefox) encode json files

### 1.3.0 (2016-03-17)
* (bluefox) rename files

### 1.2.3 (2015-12-24)
* (bluefox) support of authentication over URL

### 1.2.2 (2015-12-09)
* (bluefox) remove unused parameter "cache"

### 1.2.0 (2015-11-15)
* (bluefox) add version compatibility check

### 1.1.0 (2015-11-14)
* (Smiling_Jack) add getHistory

### 1.0.0 (2015-09-30)
* (bluefox) stop adapter before update

### 0.4.5 (2015-08-11)
* (bluefox) update packets

### 0.4.4 (2015-07-07)
* (bluefox) extend writeFile with mode

### 0.4.3 (2015-07-06)
* (bluefox) add chmodFile

### 0.4.1 (2015-06-13)
* (bluefox) add default ttl
* (bluefox) enable run from "web" and add permissions check

### 0.4.0 (2015-06-13)
* (bluefox) add permissions support

### 0.3.1 (2015-05-19)
* (bluefox) support of subscribe on objectChanged

### 0.3.0 (2015-04-23)
* (bluefox) enable security

### 0.2.3 (2015-03-07)
* (bluefox) extend getStates to support list of objects

### 0.2.2 (2015-02-14)
* (bluefox) fix error with objectChanged event

### 0.2.0 (2015-01-16)
* (bluefox) make socket usable as module

### 0.1.6 (2015-01-08)
* (bluefox) support of subscribe for different sockets. Support of socket names. Diagnostic info in socket.0.connected

### 0.1.5 (2015-01-07)
* (bluefox) fix error with update of states and objects

### 0.1.4 (2015-01-06)
* (bluefox) support of file manager in vis

### 0.1.3 (2015-01-02)
* (bluefox) enable adapter by default

### 0.1.2 (2015-01-02)
* (bluefox) add "request" module to package.json

### 0.1.1 (2015-01-02)
* (bluefox) enable npm install

### 0.1.0 (2014-12-28)
* (bluefox) support of read/write files

### 0.0.5 (2014-12-19)
* (bluefox) support of setObjects command

### 0.0.4 (2014-12-10)
* (bluefox) support of https sockets

### 0.0.3 (2014-12-05)
* (bluefox) support of https sockets

### 0.0.2 (2014-11-24)
* (bluefox) fix error by start

### 0.0.1 (2014-10-10)
* (bluefox) authentication works

## License

The MIT License (MIT)

Copyright (c) 2014-2022 bluefox <dogafox@gmail.com>