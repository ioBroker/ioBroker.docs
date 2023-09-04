---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mihome-vacuum/README.md
title: ioBroker mihome-真空适配器
hash: bIUbX1gdnh92hTES+t2l/YxK7HMYGxG8DIFdFNWZhbk=
---
![标识](../../../en/adapterref/iobroker.mihome-vacuum/admin/mihome-vacuum.png)

![贝宝捐款](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![安装数量](http://iobroker.live/badges/mihome-vacuum-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.mihome-vacuum.svg)
![下载](https://img.shields.io/npm/dm/iobroker.mihome-vacuum.svg)

# IoBroker mihome-vacuum 适配器
![测试与发布](https://github.com/iobroker-community-adapters/iobroker.mihome-vacuum/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/mihome-vacuum/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[德国资格](README_de.md)

该适配器可让您控制小米吸尘器。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。

＃＃ 内容
 - [已知错误](#known_errors)
    - [安装时出错（画布）](#error_at_installation)
    - [获取令牌 cookie 时发生 HTTP 错误{}](#http_error_when_getting_token_cookie{})
- [设置](#configuration)
    - [配置适配器](#adapter-configuration)
        - [通过 Alexa 控制](#control-over-alexa)
        - [第二个机器人](#second-robot)
    - [配置 Valetudo](#valetudo-config)
- [函数](#函数)
    - [S50 命令](#commands-of-the-s50)
    - [转到](#goto)
- [区域清洁](#zoneclean)
    - [房间](#房间)
    - [计时器](#计时器)
    - [自己的命令](#send-your-own-commands)
    - [sendTo 挂钩](#send-custom-commands-with-sendto)
- [小部件](#小部件)
- [错误](#错误)
- [变更日志](#变更日志)

## 支持的设备和功能
|设备|基本控制|历史|房间 |地图 |
|:------------------    |:-------------------:      |:-------------------:  |:-------------------:|:-------------------:|
| viomi.vacuum.v6 | :heavy_check_mark: | :x: |:x: | :x: |
| viomi.vacuum.v7 | :heavy_check_mark: | :x: |:x: | :x: |
| viomi.vacuum.v8 | :heavy_check_mark: | :x: |:x: | :x: |
| rockrobo.vacuum.v1 | :heavy_check_mark: | :heavy_check_mark: |:x: |:heavy_check_mark: |
| roborock.vacuum.s4 | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| roborock.vacuum.s5 | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| roborock.vacuum.s5e | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| roborock.vacuum.m1s | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| roborock.vacuum.a10 | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| roborock.vacuum.a15 | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
|梦想.真空.r2205 | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
|梦想.真空.r2216o | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
|梦想.真空.r2228o | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
|梦想.真空.p2008 | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
|梦想.真空.p2009 | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
|梦想.真空.p2027 | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
|梦想.真空.p2028 | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
|梦想.真空.p2029 | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
|梦想.真空.p2036 | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
|梦想.真空.p2041o | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
|梦想.真空.p2114a | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
|梦想.真空.p2148o | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |
|梦想.真空.p2156o | :heavy_check_mark: | :heavy_check_mark: |:x: | :x: |

## 已知错误
### 安装时出错
如果您的安装运行错误。无法安装canvas包

``npm 错误！ canvas@2.6.1 安装：node-pre-gyp install --fallback-to-build npm 错误！退出状态 1``

请使用以下命令手动安装画布和库：`` sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev ``

切换到：`cd /opt/iobroker/node_modules/iobroker.mihome-vacuum` 然后`npm install canvas`

### 获取令牌 cookie 时发生 HTTP 错误{}
有时无法连接小米云。
请打开浏览器，进入Mihome并登录。输入您通过邮件收到的代码。之后，连接应该可以工作。

### 只获取 Helo 消息超时
请确保您的机器人已与 Mihome 应用程序连接，而不是与 Roborock 应用程序连接

### 与 S7 没有连接
目前，如果机器人和 ioBroker 不使用同一子网，则会出现问题。

＃＃ 配置
目前，寻找代币是最大的问题。
提取令牌的一种选择是使用此实用程序：https://github.com/PiotrMachowski/Xiaomi-cloud-tokens-extractor

否则，请按照链接中的说明进行操作：

[代币教程](https://www.smarthomeassistent.de/token-auslesen-roborock-s6-roborock-s5-xiaomi-mi-robot-xiaowa/).

### 适配器配置
- 对于IP地址，机器人的IP地址必须以“192.168.178.XX”格式输入
- 机器人的端口默认设置为“54321”，不应更改
- 自己的端口，只能用第二个机器人更改
- 查询间隔 检索机器人状态值的时间（以毫秒为单位）（不应<10000）

#### 控制 Alexa
将为 Alexa 创建特殊控制状态`clean_home`。
它是一个开关，从吸盘 `true` 开始，在 `false` 处返回原位。
它自动成为云适配器中创建的智能设备，名称为“吸尘器”，可以在云适配器中更改。

#### 使用开始按钮恢复暂停的区域清洁
启用此选项后，如果真空吸尘器在运行区域清洁期间暂停，则在将“开始”状态设置为 true 时，真空吸尘器将恢复区域清洁。
如果禁用此选项，则当您发送启动命令时，真空吸尘器将启动新的“正常清洁”，即使它在运行区域清洁期间暂停。

- 实验：使用复选框“发送您自己的命令”创建对象，通过它您可以向机器人发送和接收您自己的命令。

#### 第二个机器人
如果要通过 ioBroker 控制两个机器人，则必须创建两个实例。对于第二个机器人，必须更改 ioBroker 自己的端口（默认值：53421），以便两个机器人都可以通过不同的端口归档 ioBroker。

## 地图配置
获取地图有两种方法。首先从云端获取地图。因此，您必须登录并从列表中选择正确的机器人

第二种方式是 valetudo 的地图（仅限本地连接）。
因此，您必须 root 并将 valetudo 安装到您的设备上。
您可以使用[Valetudo RE](https://github.com/rand256/valetudo) 或正常 [Valetudo](https://github.com/Hypfer/Valetudo)。

![配置](../../../en/adapterref/iobroker.mihome-vacuum/admin/valetudo_conf.png)

- 要使用地图，您必须在配置中选择 valetudo 或原始地图
- 请求间隔必须大于1000毫秒，这是更新html地图的间隔
- 地图间隔必须大于 5000 毫秒，此间隔更新 png 地图文件（您可以将其用于 Telegram 或 vis 或其他任何内容）
- 颜色 您可以在此处选择地图示例的颜色：

```
- #2211FF
- rbg(255,200,190)
- rgba(255,100,100,0.5) //for Transparent
- green
```

- 机器人在那里你可以为地图选择不同的机器人或其他车辆

### 地图使用
地图以 base64-raw 或 PNG 形式存储。

您可以在以下数据点中找到地图图像：

- base64: `mihome-vacuum.0.cleanmap.map64`
- PNG：`mihome-vacuum.0.cleanmap.mapURL`

您可以使用这两个图像作为您想要的 VIS 中的图像源。在 HTML 样式中，您可以通过以下方式使用图像：

`<img src="mihome-vacuum.0.cleanmap.map64">`

通过附加的样式标签，您可以调整地图样式的大小和/或格式。

要使用`jarvis`中的地图，只需使用数据点之一作为 DisplayImage-Widget 的 URL。
在那里您可以调整图像或整个小部件的大小。在贾维斯的响应式设计的情况下，地图将根据显示尺寸调整大小。

要在`ioBroker VIS`中显示地图，您可以使用普通的 html 小部件，例如：

```
[{"tpl":"tplHtml","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","refreshInterval":"0","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"html":"{mihome-vacuum.0.map.map64}"},"style":{"left":"0","top":"0","width":"100%","height":"100%"},"widgetSet":"basic"}]
```

使用base64-map速度更快，并且会实时显示附近机器人的位置。

＃＃ 功能
### S50（第二代）的命令
卡片尺寸始终为 52000mm x 52000mm，因此可以使用 0 到 51999mm 的值。
不幸的是，卡的位置和位置无法查询，这个可以从吸力改为吸力。用作基础的始终是最后一张吸卡，以及应用程序中。
如果机器人只拾取一个区域并始终以相同的方式构建地图，您就可以可靠地将其发送到某个地方或对该区域进行真空吸尘。

＃＃＃＃ 去
为了将吸尘器驱动到某个点，必须按如下方式填充“goTo”对象：

```
xVal, yval
```

这些值必须满足上述范围并指示地图上的 x 和 y 坐标。

例子：

```
24,850.26500
```

####区域清洁
要对区域进行真空吸尘，必须按如下方式填充 ZoneClean：

```
[X1, y1, x2, x2, count]
```

其中x和y是矩形区域的坐标并“计数”清洁操作。
你也可以同时让几个区域变得糟糕：

```
[X1, y1, x2, x2, count], [x3, y3, x4, x4, count2]
```

例子：

```
[24117,26005,25767,27205,1], [24320,24693,25970,25843,1]
```

#### 房间
带有最新家庭应用程序的新型真空吸尘器支持房间定义，请参阅[视频](https://www.youtube.com/watch?v=vEiUZzoXfPg)

当前地图中的每个房间都有一个索引，然后从应用程序将其分配给房间。从机器人我们只能得到带有房间号和索引的映射。适配器每次启动时都会查询这些房间，并为每个房间创建一个通道，然后该通道知道当前房间索引。使用 loadRooms 按钮手动也会发生同样的情况。然后可以将该通道分配给 ioBroker 房间。如果按下 roomClean 按钮，则会确定卡的索引并将其发送给机器人，以便它可以对这个房间进行真空吸尘。在此之前，风扇功率设置为单室吸力。如果您还无法在应用程序中命名房间，也可以通过指定地图索引来手动创建这样的通道。也可以添加区域坐标而不是mapIndex。
如果您想自发地清洁多个房间，您可以通过 multiRoomClean 来完成此操作，方法是将 ioBroker 房间分配给该数据点，然后按下按钮。

#### 计时器
一旦吸尘器支持房间功能（见上文），就可以创建计时器，然后触发相应的房间通道或确定它们的mapIndexes。
计时器可以直接通过房间和/或房间通道触发。
计时器本身是通过配置区域创建的，但随后成为数据点。在那里，每个计时器都可以激活/停用或跳过一次。直接启动也是可能的。 ioBroker计时器的优点是它们可以在VIS中显示和使用，并且您可以断开机器人与互联网的连接，因为应用程序的计时器是从中国触发的。

### 发送你自己的命令
注意：此功能仅供专家使用，错误的命令可能会损坏吸盘

机器人区分方法（methods）中的命令和用于指定方法的参数（params）。
在对象`mihome-vacuum.X.control.X_send_command`下，您可以向机器人发送自己的命令。
对象结构必须如下所示：方法； [参数]，例如``` app_segment_clean;[18,20] ```

在对象`mihome-vacuum.X.control.X_get_response`下，机器人在发送后输入响应。
如果查询参数，它们会以 JSON 格式显示在此处。如果仅发送一条命令，机器人仅响应“0”。

支持以下方法和参数：

|方法|参数|描述 |
|-----------      |-------                                                              |-------------------                                                                       |
|获取定时器| |返回设置的计时器设置抽吸时间 BSp。 5天内12点30分 |
|设置定时器| `[["TIME_IN_MS",["30 12 * * 1,2,3,4,5",["start_clean",""]]]]` |启用/禁用计时器 |
|更新定时器| `["1481997713308","开/关"]` | |
| | |拯救勿扰时代 |
|获取 dnd_timer | |删除免打扰次数|
|设置 dnd_timer | `[22,0,8,0]` | |
|设置 dnd_timer | `[22,0,8,0]` | |
|                 |                                                                     |                                                                                          |
|应用程序_rc_start | |启动远程控制 |
|应用程序_rc_移动 | `[{"seqnum":'0-1000',"velocity":VALUE1,"omega":VALUE2,"duration":VALUE3}]`|移动。序列号必须连续，VALUE1（速度）= -0.3-0.3，VALUE2（旋转）= -3.1-3.1，VALUE3（持续时间）|
|应用程序_rc_移动 | `[{"seqnum":'0-1000',"velocity":VALUE1,"omega":VALUE2,"duration":VALUE3}]`|移动。序列号必须连续，VALUE1（速度）= -0.3-0.3，VALUE2（旋转）= -3.1-3.1，VALUE3（持续时间）|
|应用程序段清理 | `[12,15]` |带有索引 12 和 15 的清洁 romm |
|应用程序段清理 | `[12,15]` |带有索引 12 和 15 的清洁 romm |

您可以在此处找到更多方法和参数 ([关联](https://github.com/MeisterTR/XiaomiRobotVacuumProtocol))。

### 使用 sendTo 发送自定义命令
您还可以使用`sendTo`从其他适配器发送这些自定义命令。与上文定义的 `method_id` 和 `params` 一起使用：

```
sendTo("mihome-vacuum.0", "sendCustomCommand",
    {method: "method_id", params: [...] /* optional*/},
    function (response) { /* do something with the result */}
);
```

`response`对象有两个属性：`error`和（如果没有错误）`result`。

还可以通过这种方式发出几个预定义命令：

```
sendTo("mihome-vacuum.0",
    commandName,
    param,
    function (response) { /* do something with the result */}
);
sendTo("mihome-vacuum.0",
    commandName,
    {param1: value1, param2: value2, ...},
    function (response) { /* do something with the result */}
);

```

如果只能使用单个参数，则只能发送字符串，否则必须使用具有预期参数的对象，例如：

```
sendTo("mihome-vacuum.0",
    "setFanSpeed",
    "105",
    function (response) { /* do something with the result */}
);
sendTo("mihome-vacuum.0",
    "setFanSpeed",
    {"fanSpeed" : 105},
    function (response) { /* do something with the result */}
);

```

支持的命令有：

|描述 | `commandName` |必需参数|备注 |
|开始清洁过程 | `startVacuuming` | - 无 - | |
|停止清洁过程 | `stopVacuuming` | - 无 - | |
|暂停清洁过程 | `pause` | - 无 - | |
|清除等待作业 | `clearQueue` | - 无 - | |
|清洁机器人周围的小区域 | `cleanSpot` | - 无 - | |
|回到基地| `charge` | - 无 - | |
|说“嗨，我在这儿！” | `findMe` | - 无 - | |
|检查耗材（刷子等）状态 | `getConsumableStatus` | - 无 - | |
|重置消耗品状态（刷子等）| `resetConsumables` | `consumable` |字符串：filter_work_time、filter_element_work_time、sensor_dirty_time、main_brush_work_time、side_brush_work_time |
|获取之前所有清洁流程的摘要 | `getCleaningSummary` | - 无 - | |
|获取之前清洁过程的详细总结 | `getCleaningRecord` | `recordId` | |
|获取地图 | `getMap` | - 无 - |未知如何处理结果 |
|获取机器人当前状态 | `getStatus` | - 无 - | |
|检索机器人的序列号 | `getSerialNumber` | - 无 - | |
|获取详细的设备信息 | `getDeviceDetails` | - 无 - | |
|检索*请勿打扰*计时器 | `getDNDTimer` | - 无 - | |
|设置新的*请勿打扰*计时器 | `setDNDTimer` | `startHour`、`startMinute`、`endHour`、`endMinute` | |
|删除*请勿打扰*计时器| `deleteDNDTimer` | - 无 - | |
|检索当前风扇速度 | `getFanSpeed` | - 无 - | |
|设置新的风扇速度 | `setFanSpeed` | `fanSpeed` | `fanSpeed` 是 1 到 100 之间的数字 |
|检索当前水箱模式 | `getWaterBoxMode` | - 无 - | |
|设置拖地模式 | `setMopMode` | `mopMode` | `mopMode` 是 300 到 303 之间的数字 |
|检索当前拖地模式 | `getMopMode` | - 无 - | |
|设置水箱模式 | `setWaterBoxMode` | `waterBoxMode`\| {waterBoxMode:`waterBoxMode`,waterBoxLevel:`waterBoxLevel`} | `waterBoxMode` 是 200 到 204 或 207 之间的数字 -> 那么您还必须证明 `waterBoxLevel` 是 1 - 30 之间的数字 |
|启动远程控制功能| `startRemoteControl` | - 无 - | |
|发出远程控制移动命令| `move` | `velocity`、`angularVelocity`、`duration`、`sequenceNumber` |序列号必须是连续的，持续时间以毫秒为单位 |
|结束远程控制功能| `stopRemoteControl` | - 无 - | |
|洁净室/房间| `cleanRooms` | `rooms` | `rooms` 是一个逗号分隔的字符串，带有 enum.rooms.XXX |
|清洁段| `cleanSegments` | `rooms` \| {房间：`rooms`，waterBoxMode：`waterBoxMode`，拖把模式：`mopMode`，风扇速度：`fanSpeed`} | `rooms`是一个数字或一个带有mapIndex的数组或带有mapIndex的逗号分隔字符串 |
|洁净区| `cleanZone` | `coordinates` \| {坐标：`coordinates`，waterBoxMode：`waterBoxMode`，mopMode：`mopMode`，fanSpeed：`fanSpeed`，重复：`iterations`} | `coordinates` 是一个带有坐标和计数的字符串，请参阅[清洁区](#zonecleaning) |
|开始除尘| `startDustCollect` | - 无 - | |
|停止集尘| `stopDustCollect` | - 无 - | |
|开始拖把清洗| `startWashMop` | - 无 - | |
|停止拖把清洗| `stopWashMop` | - 无 - | |
|停止拖把清洗| `停止WashMop` | - 无 - | |

## 小部件
![小部件](../../../en/adapterref/iobroker.mihome-vacuum/widgets/mihome-vacuum/img/previewControl.png)

## 错误
- 偶尔会断开连接，但这不是由于适配器造成的，而是主要是由于其自己的网络造成的
- 当时的小部件没有功能

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
    * () 
-->
### 4.0.0 (2023-08-15)
* (DemigodCode) inital version of dream support
* (Dirkhe) add Roborock S8 Ultra Pro

### 3.11.0 (2023-05-12)
* (TA2k) fix too much map request to prevent map rate limit in the app

### 3.10.1 (2023-04-10)
* (Dirkhe) fix waterBoxLevel 
* (Dirkhe) fix overwriting of roomStates from global

### 3.10.0 (2023-04-07)
* (Dirkhe) check also stockcommands in onMessage 
* (Dirkhe) add feature waterbox level #755

### 3.9.5 (2023-01-13)
* (Dirkhe) change type of unsupported features
* (Dirkhe) fix button/command loadRooms

### 3.9.4 (2023-01-11)
* (Dirkhe) cleanmap.mapURL typo fixed

### 3.9.3 (2023-01-11)
* (Dirkhe) fix loosing passwort in config
* (Dirkhe) move map Url to userspace instead of admin space #735
* (Dirkhe) change mapUrl to /mihome-vacuum.0.userfiles/actualMap.png

### 3.9.2 (2023-01-06)
* (Dirkhe) add function setUnsupportedFeature; if token changed, all stored unsupported Features will be cleared
* (dirkhe) fix bug from 3.9.1 for supported repeat devices

### 3.9.1 (2023-01-06)
* (Dirkhe) add step property to repeat DP
* (Dirkhe) add Queue Fallback mode for repeat
* (Dirkhe) remove wrong clearQueue button

### 3.9.0 (2023-01-04)
* (Dirkhe) add Mop washing #679
* (Dirkhe) trigger pauseResume only, if correct state is given #623
* (Dirkhe) add multiple clean iterations (repeat) #690
* (Dirkhe) housekeeping

### 3.8.8 (2022-11-30)
* (Dirkhe) fix behaviour of pauseResume #623

### 3.8.7 (2022-11-26)
* (Dirkhe) fix typo from translation for battary_live (based on viomi id) #629
* (Dirkhe) fix crash, if cloud-roomID is empty #702

### 3.8.6 (2022-11-12)
* (Dirkhe) Fix type for roomMopMode

### 3.8.5 (2022-11-10)
* (Dirkhe) move parseErrors to debug level
* (Dirkhe) avoid new instanziierung on reconnect

### 3.8.4 (2022-11-07)
* (Dirkhe) change logging for sendMessage to debug

### 3.8.3 (2022-11-01)
* (Dirkhe) change logging from timeouts
* (Dirkhe) hide parts of token in log

### 3.8.2 (2022-10-31)
* (Dirkhe) Bump canvas to 2.10.2
* (Dirkhe) disable map, if CANVAS not installed #681

### 3.8.1 (2022-10-30)
* (Dirkhe) remove deprecated node 12.x Version for workflow

### 3.8.0 (2022-10-30)
* (Dirkhe) fix missing stock command for mop_mode
* (Dirkhe) add mop mode also for cleanSegments and cleanZone
* (Dirkhe) add mop mode also for rooms
* (MeisterTR) map zooming amd show carpet

### 3.7.0 (2022-10-28)
* (Dirkhe) accept custom commands with single paramter
* (Dirkhe) optional parameter waterboxMode and fanSpeed for cleanSegments and cleanZone 
* (Dirkhe) fix crash on message send (#652)
* (Dirkhe) add mop mode (#670)
* (Dirkhe) adapt fan_power for S7 Ultra(#677)

### 3.6.0 (2022-07-07)
* (Dirkhe) add dust collecting

### 3.5.0 (2022-06-29)
* (Dirkhe) add Roborock S6 Pure model
* (Dirkhe) add/extend some Hints in readme
* (Dirkhe) add additional log info for cleanRooms
* (Dirkhe) fix error for wrong map-dp

### 3.4.2 (2022-06-24)
* (Apollon77) Update dependencies to allow better automatic rebuild

### 3.4.1 (2022-05-31)
* (Dirkhe) add missed Vacuum states
* (Dirkhe) add dock state Waste water tank full

### 3.4.0 (2022-05-28)
* (Apollon77) Fix several potential crash cases reported by Sentry

### 3.3.6 (2022-05-03)
* (Dirkhe) fix spotcleaning

### 3.3.5 (2022-02-07)
* (Dirkhe) fixed some errors
* (lasthead0) fix cyrillic issue RC4 lib#

### 3.3.3 (2022-01-20)
* (Dirkhe) fixed some errors
* (Dirkhe) add RC4

### 3.3.1 (2021-10-02)
* (MeisterTR) fix IOBROKER-MIHOME-VACUUM-Z
* (MeisterTR) fix some errors

### 3.3.0 (2021-10-01)
* (MeisterTR) fix no rooms for S5
* (MeisterTR) fix IOBROKER-MIHOME-VACUUM-4 DB closed
* (MeisterTR) fix connection error

### 3.2.2 (2021-07-16)
* (bluefox) the communication is corrected
* (bluefox) Added roles to be detected by type-detector

### 3.2.1 (2021-07-02)
* (Apollon77) Adjust several crash cases (IOBROKER-MIHOME-VACUUM-K, IOBROKER-MIHOME-VACUUM-J, IOBROKER-MIHOME-VACUUM-F, IOBROKER-MIHOME-VACUUM-7, IOBROKER-MIHOME-VACUUM-A, IOBROKER-MIHOME-VACUUM-4, IOBROKER-MIHOME-VACUUM-G, IOBROKER-MIHOME-VACUUM-C, IOBROKER-MIHOME-VACUUM-B, IOBROKER-MIHOME-VACUUM-Q, IOBROKER-MIHOME-VACUUM-M)

### 3.2.0 (02.06.2021)
* (MeisterTR) release candidate
* (MeisterTR) get consumable after reset

### 3.1.10 (23.05.2021)
* error fixed
* add sentry

### 3.1.6 (05.05.2021)
* minimize Disk write
* minimized Messages 
* changed warn Messages to debug
* extend Debuglog to find error for e2 vacuum
* added getStates when map is changed

### 3.1.5 (03.05.2021)
* try to fix the map error
* Map64 changed. now without img tags
* add Multimap support (get rooms and map when map is changed)
* select Multimaps
* fix error with zone coordinates
* add WiFi
* fix connection Problems
* fix Valetudo map
* add Mop state
* fix some objects

### 3.1.1 (18.4.2021)
 * Full rewrite
 * Fix map bug with multiple vacuums
 * fix performance Problems
 * better connection to vacuum
 * fix bug in ReloadMap button
 * Show Goto and Zone States ti find places
 * and many more...

### 2.2.5 (2021-04-02)
* added S7 Support
* bugfixes for S5 Max and others

### 2.2.4 (2020-09-15)
* (dirkhe) add config for send Pause Before Home

### 2.2.3 (2020-08-20)
* (dirkhe) room DP are not deleted, on map change

### 2.2.0 (2020-08-13)
* (MeisterTR) add test for Viomi and Dreame Api

### 2.1.1 (2020-07-10)
* (bluefox) Refactoring
* (bluefox) Support of compact mode added

### 2.0.10 (2020-07-05)
* try to start the cleaning 3 times, if robot not answers and some fixes

### 2.0.9 (2020-03-05)
* (dirkhe) add state info for room channels and change queue info from number to JSON

### 2.0.8 (2020-02-26)
* (dirkhe) decreased communication with robot

### 2.0.7 (2020-02-25)
* (dirkhe) add Resuming after pause for rooms

### 2.0.6 (2020-02-17)
* (MeisterTR) add rooms for s50 with map (cloud or Valetudo needed)

### 2.0.4 (2020-02-13)
* (MeisterTR) add cloud login to get token
* (MeisterTR) add cloud Map
* (MeisterTR) add new and old Map format
* (MeisterTR) rebuild config page

### 1.10.5 (2020-02-11)
* send Ping only if not connected, otherwise get_status
* set button states to true, if clicked
* move timer manager and room manager to own libs

### 1.10.4 (2020-02-06)
* (MeiserTR) add valetudo map support for gen3 and gen2 2XXX

### 1.10.1 (2020-01-20)
* (dirkhe) added zone as room handling
* (dirkhe) timer could room channels directly

### 1.10.0 (2020-01-17)
* (dirkhe) added room handling
* (dirkhe) added Timer 
* (dirkhe) changed feature handling

### 1.1.6 (2018-12-06)
* (JoJ123) Added fan speed for MOP (S50+).

### 1.1.5 (2018-09-02)
* (BuZZy1337) Added description for Status 16 and 17 (goTo and zone cleaning).
* (BuZZy1337) Added setting for automatic resume of paused zone cleaning.

### 1.1.4 (2018-08-24)
* (BuZZy1337) Added possibility to resume a paused zone clean (State: mihome-vacuum.X.control.resumeZoneClean)

### 1.1.3 (2018-07-11)
* (BuZZy1337) fixed zoneCleanup state not working (vacuum was only leaving the dock, saying "Finished ZoneCleanup", and returned immediately back to the dock)

### 1.1.2 (2018-07-05)
* (BuZZy1337) fixed detection of new Firmware / Second generation Vacuum

### 1.1.1 (2018-04-17)
* (MeisterTR) error caught , added states for new fw

### 1.1.0 (2018-04-10)
* (mswiege) Finished the widget

### 1.0.1 (2018-01-26)
* (MeisterTR) ready for admin3
* (MeisterTR) support SpotClean and voice level (v1)
* (MeisterTR) support second generation (S50)
* (MeisterTR) Speed up data requests

### 0.6.0 (2017-11-17)
* (MeisterTR) use 96 char token from Ios Backup
* (MeisterTR) faster connection on first use

### 0.5.9 (2017-11-03)
* (MeisterTR) fix communication error without i-net
* (AlCalzone) add selection of predefined power levels

### 0.5.7 (2017-08-17)
* (MeisterTR) compare system time and Robot time (fix no connection if system time is different)
* (MeisterTR) update values if robot start by cloud

### 0.5.6 (2017-07-23)
* (MeisterTR) add option for crate switch for Alexa control

### 0.5.5 (2017-06-30)
* (MeisterTR) add states, features, fix communication errors

### 0.3.2 (2017-06-07)
* (MeisterTR) fix no communication after softwareupdate(Vers. 3.3.9)

### 0.3.1 (2017-04-10)
* (MeisterTR) fix setting the fan power
* (bluefox) catch error if port is occupied

### 0.3.0 (2017-04-08)
* (MeisterTR) add more states

### 0.0.2 (2017-04-02)
* (steinwedel) implement better decoding of packets

### 0.0.1 (2017-01-16)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017-2022 bluefox <dogafox@gmail.com>

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