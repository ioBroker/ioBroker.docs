---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mihome-vacuum/README.md
title: ioBroker mihome-vacuum 适配器
hash: +C87oHkqvE+qBow9a/ahrgXJDedttowaAjxvXZ4SxWY=
---
![标识](../../../en/adapterref/iobroker.mihome-vacuum/admin/mihome-vacuum.png)

![贝宝捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![安装数量](http://iobroker.live/badges/mihome-vacuum-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.mihome-vacuum.svg)
![下载](https://img.shields.io/npm/dm/iobroker.mihome-vacuum.svg)

# IoBroker mihome-vacuum 适配器
![测试和发布](https://github.com/iobroker-community-adapters/iobroker.mihome-vacuum/workflows/Test%20and%20Release/badge.svg)[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/mihome-vacuum/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[德意志银行](README_de.md)

该适配器可让您控制小米吸尘器。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

＃＃ 内容
 - [已知错误](#known_errors)
    - [安装时出错（画布）]（#error_at_installation）
    - [获取令牌 cookie 时的 HTTP 错误{}](#http_error_when_getting_token_cookie{})
- [设置]（#配置）
    - [配置适配器](#adapter-configuration)
        - [通过 Alexa 控制](#control-over-alexa)
        - [第二个机器人](#second-robot)
    - [配置 Valetudo](#valetudo-config)
- [函数](#functions)
    - [S50 命令](#commands-of-the-s50)
    - [转到](#goto)
- [区域清洁](#zoneclean)
    - [房间](#rooms)
    - [计时器](#timer)
    - [自己的命令](#send-your-own-commands)
    - [sendTo hook](#send-custom-commands-with-sendto)
- [小部件](#widget)
- [错误]（#错误）
- [变更日志](#changelog)

## 支持的设备和功能
不支持清洁器？ [在这里投票！](https://doodle.com/poll/8m8238ridkifua99?utm_source=poll&utm_medium=link)

|设备 |基本控制 |历史 |房间 |地图 |
|:------------------    |:-------------------:      |:-------------------:  |:-------------------:|:-------------------:|
| viomi.vacuum.v6 | :heavy_check_mark: | :x: |:x:| :x: |
| viomi.vacuum.v7 | :heavy_check_mark: | :x: |:x:| :x: |
| viomi.vacuum.v8 | :heavy_check_mark: | :x: |:x:| :x: |
| rockrobo.vacuum.v1 | :heavy_check_mark: | :heavy_check_mark: |:x: |:heavy_check_mark: |
| roborock.vacuum.s4 | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| roborock.vacuum.s5 | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| roborock.vacuum.s5e | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| roborock.vacuum.m1s | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| roborock.vacuum.a10 | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| roborock.vacuum.a15 | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |

## 已知错误
### 安装时出错
如果您的安装运行出错。无法安装画布包

``npm 错误！ canvas@2.6.1 安装：node-pre-gyp install --fallback-to-build npm ERR！退出状态 1``

请使用以下命令手动安装画布和库： sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

切换到：`cd /opt/iobroker/node_modules/iobroker.mihome-vacuum`然后`sudo npm install canvas`

### 获取令牌 cookie 时出现 HTTP 错误{}
有时连不上小米云。
请打开浏览器，进入米家并登录。输入您通过邮件收到的代码。之后，连接应该可以工作。

请确保您的机器人与 Mihome 应用程序连接，而不是与 Roborock 应用程序连接

### 与 S7 无连接
目前有一个问题，如果机器人和 ioBroker 没有使用相同的子网。

＃＃ 配置
目前，找到令牌是最大的问题。
提取令牌的一种选择是使用此实用程序：https://github.com/PiotrMachowski/Xiaomi-cloud-tokens-extractor

否则请按照链接中的说明进行操作：

[代币教程](https://www.smarthomeassistent.de/token-auslesen-roborock-s6-roborock-s5-xiaomi-mi-robot-xiaowa/).

### 适配器配置
- 对于IP地址，机器人的IP地址必须以“192.168.178.XX”的格式输入
- 机器人的端口默认设置为“54321”，不应更改
- 自有端口，只能用第二个机器人更改
- 查询间隔 检索机器人状态值的时间（毫秒）（不应<10000）

#### 控制 Alexa
将为 Alexa 创建特殊控制状态`clean_home`。
它是一个开关，从 `true` 吸盘开始，在 `false` 它回家。
它自动成为云适配器中创建的名为“吸尘器”的智能设备，可以在云适配器中进行更改。

#### 使用开始按钮恢复暂停的区域清洁
启用此选项后，如果在运行区域清洁期间暂停，真空将在将“开始”状态设置为 true 时恢复区域清洁。
如果禁用此选项，则在您发送启动命令时，真空吸尘器将开始新的“正常清洁”，即使它在运行 zone-clean 期间已暂停。

- 实验性：使用复选框“发送您自己的命令”创建对象，您可以通过它向机器人发送和接收您自己的命令。

####第二个机器人
如果要通过 ioBroker 控制两个机器人，则必须创建两个实例。对于第二个机器人，ioBroker 自己的端口（默认值：53421）必须更改，以便两个机器人可以通过不同的端口归档 ioBroker。

## 地图配置
获取地图有两种方式。首先从云端获取地图。因此，您必须登录并从列表中选择正确的机器人

第二种方式是来自 valetudo 的地图（仅限本地连接）。
因此，您必须 root 并将 valetudo 安装到您的设备。
您可以使用[Valetudo RE](https://github.com/rand256/valetudo) 或普通 [Valetudo](https://github.com/Hypfer/Valetudo)。

![配置](../../../en/adapterref/iobroker.mihome-vacuum/admin/valetudo_conf.png)

- 要使用地图，您必须在配置中选择 valetudo 或原始地图
- 请求间隔必须大于 1000 毫秒这是更新 html 地图的间隔
- 地图间隔必须超过 5000 毫秒此间隔更新 png 地图文件（您可以将其用于 Telegram 或 vis 或其他任何东西）
- 颜色在那里您可以选择地图示例的颜色：

```
- #2211FF
- rbg(255,200,190)
- rgba(255,100,100,0.5) //for Transparent
- green
```

- 机器人在那里你可以为地图选择不同的机器人或其他车辆

### 地图使用
地图存储为 base64-raw 或 PNG。

您可以在以下数据点中找到地图图像：

- base64：`mihome-vacuum.0.cleanmap.map64`
- PNG：`mihome-vacuum.0.cleanmap.mapURL`

您可以在所需的 VIS 中使用这两个图像作为图像源。在 HTML 样式中，您可以通过以下方式使用图像：

`<img src="mihome-vacuum.0.cleanmap.map64">`

使用其他样式标签，您可以调整地图样式的大小和/或格式。

要在`jarvis`中使用地图，只需使用其中一个数据点作为 DisplayImage-Widget 的 URL。
在那里您可以调整图像或整个小部件的大小。在 jarvis 响应式设计的情况下，地图将根据显示大小调整大小。

要在 `ioBroker VIS` 中显示地图，您可以使用普通的 html 小部件，例如：

```
[{"tpl":"tplHtml","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","refreshInterval":"0","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"html":"{mihome-vacuum.0.map.map64}"},"style":{"left":"0","top":"0","width":"100%","height":"100%"},"widgetSet":"basic"}]
```

base64-map的使用速度更快，会实时显示附近机器人的位置。

＃＃ 功能
### S50（第二代）的命令
卡片尺寸始终为 52000 毫米 x 52000 毫米，因此可以使用 0 到 51999 毫米的值。
不幸的是，卡的位置和位置无法查询，这可以从吸力变为吸力。用作基础的始终是最后一张吸卡，以及在应用程序中。
如果机器人只拾取一个区域并且始终以相同的方式构建地图，则您可以可靠地将其发送到某个地方或对该区域进行吸尘。

＃＃＃＃ 去
为了将真空吸尘器驱动到一个点，“goTo”对象必须按如下方式填充：

```
xVal, yval
```

这些值必须满足上述范围，并在地图上标明 x 和 y 坐标。

例子：

```
24,850.26500
```

#### 区域清洁
要对某个区域进行真空吸尘，必须按如下方式填充 ZoneClean：

```
[X1, y1, x2, x2, count]
```

其中 x 和 y 是矩形区域的坐标并“计数”清洁操作。
您还可以让多个区域同时吸吮：

```
[X1, y1, x2, x2, count], [x3, y3, x4, x4, count2]
```

例子：

```
[24117,26005,25767,27205,1], [24320,24693,25970,25843,1]
```

#### 房间
带有最新 Home App 的较新吸尘器支持房间定义，请参阅[视频](https://www.youtube.com/watch?v=vEiUZzoXfPg)

当前地图中的每个房间都有一个索引，然后从应用程序将其分配给房间。从机器人我们只得到一个房间号和索引的映射。适配器每次启动时都会查询这些房间，并为每个房间创建一个通道，然后知道当前房间索引。使用按钮 loadRooms 手动发生同样的情况。然后可以将此频道分配给 ioBroker 房间。如果按下 roomClean 按钮，则确定卡片的索引并将其发送给机器人，以便它可以对该房间进行吸尘。在此之前，风扇功率设置为单间吸力。如果您还不能在应用程序中命名房间，也可以通过指定地图索引手动创建这样的频道。也可以添加区域坐标而不是 mapIndex。
如果您想自发清扫多个房间，您可以通过 multiRoomClean 将 ioBroker 房间分配给该数据点，然后按下按钮来执行此操作。

####定时器
一旦吸尘器支持房间功能（见上文），也可以创建定时器，然后触发相应的房间通道或确定它们的 mapIndexes。
计时器可以直接通过房间和/或房间频道触发。
计时器本身是通过配置区域创建的，但随后成为数据点。在那里，每个计时器可以被激活/停用或跳过一次。也可以直接启动。 ioBroker 定时器的优点是可以在 VIS 中显示和使用，并且可以断开机器人与互联网的连接，因为应用程序的定时器是从中国触发的。

### 发送你自己的命令
注意：此功能只能由专家使用，因为错误的命令可能会损坏吸盘

机器人区分方法（方法）中的命令和用于指定方法的参数（参数）。
在对象`mihome-vacuum.X.control.X_send_command`下，您可以向机器人发送您自己的命令。
对象结构必须如下所示： 方法； [参数]，例如``` app_segment_clean;[18,20] ```

在对象`mihome-vacuum.X.control.X_get_response`下，响应由机器人在发送后输入。
如果查询参数，它们会以 JSON 格式显示在此处。如果只发送了一个命令，机器人只响应“0”。

支持以下方法和参数：

|方法 |参数 |说明 |
|-----------      |-------                                                              |-------------------                                                                       |
|获取定时器 | |返回设置的计时器设置抽吸时间 BSp。 5天12点30 |
|设置定时器 | `[["TIME_IN_MS",["30 12 * * 1,2,3,4,5",["start_clean",""]]]]`|启用/禁用计时器 |
|更新定时器 | `["1481997713308","开/关"]` | |
| | |拯救请勿打扰的时代 |
| get_dnd_timer | |删除免打扰时间 |
|设置_dnd_timer | `[22,0,8,0]`| |
|设置_dnd_timer | `[22,0,8,0]` | |
|                 |                                                                     |                                                                                          |
| app_rc_start | |启动远程控制 |
| app_rc_move | `[{"seqnum":'0-1000',"velocity":VALUE1,"omega":VALUE2,"duration":VALUE3}]`|移动。序号必须是连续的，VALUE1（速度）=-0.3-0.3，VALUE2（旋转）=-3.1-3.1，VALUE3（持续时间）|
| app_rc_move | `[{"seqnum":'0-1000',"velocity":VALUE1,"omega":VALUE2,"duration":VALUE3}]`|移动。序号必须是连续的，VALUE1（速度）=-0.3-0.3，VALUE2（旋转）=-3.1-3.1，VALUE3（持续时间）|
| app_segment_clean | `[12,15]`|带有索引 12 和 15 的干净 romm |
| app_segment_clean | `[12,15]` |带有索引 12 和 15 的干净 romm |

您可以在此处找到更多方法和参数 ([关联](https://github.com/MeisterTR/XiaomiRobotVacuumProtocol))。

### 使用 sendTo 发送自定义命令
您还可以使用 `sendTo` 从其他适配器发送这些自定义命令。 `method_id`和`params`的用法如上定义：

```
sendTo("mihome-vacuum.0", "sendCustomCommand",
    {method: "method_id", params: [...] /* optional*/},
    function (response) { /* do something with the result */}
);
```

`response`对象有两个属性：`error`和（如果没有错误）`result`。

也可以通过这种方式发出几个预定义的命令：

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

如果只有一个参数是可能的，您只能发送一个字符串，否则您必须使用具有预期参数的对象，例如：

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

|说明 | `commandName`|必需参数 |备注 |
|开始清洁过程 | `startVacuuming`| - 无 - | |
|停止清洁过程 | `stopVacuuming`| - 无 - | |
|暂停清洁过程 | `pause`| - 无 - | |
|清除等待工作 | `clearQueue`| - 无 - | |
|清洁机器人周围的一小块区域 | `cleanSpot`| - 无 - | |
|回到基地 | `charge`| - 无 - | |
|说“嗨，我在这里！” | `findMe`| - 无 - | |
|检查耗材（刷子等）的状态 | `getConsumableStatus`| - 无 - | |
|耗材（刷子等）重置状态 | `resetConsumables`| `consumable`|字符串：filter_work_time、filter_element_work_time、sensor_dirty_time、main_brush_work_time、side_brush_work_time |
|获取所有先前清洁过程的摘要 | `getCleaningSummary`| - 无 - | |
|获取先前清洁过程的详细摘要 | `getCleaningRecord`| `recordId`| |
|获取地图 | `getMap`| - 无 - |未知如何处理结果 |
|获取机器人当前状态 | `getStatus`| - 无 - | |
|检索机器人的序列号 | `getSerialNumber`| - 无 - | |
|获取详细设备信息 | `getDeviceDetails`| - 无 - | |
|检索*请勿打扰*计时器 | `getDNDTimer`| - 无 - | |
|设置一个新的*请勿打扰*定时器 | `setDNDTimer`| `startHour`, `startMinute`, `endHour`, `endMinute` | |
|删除*请勿打扰*计时器 | `deleteDNDTimer`| - 无 - | |
|检索当前风扇速度 | `getFanSpeed`| - 无 - | |
|设置新的风扇速度 | `setFanSpeed`| `fanSpeed`| `fanSpeed`是一个介于 1 和 100 之间的数字 |
|检索当前水箱模式 | `getWaterBoxMode`| - 无 - | |
|设置拖地模式 | `setMopMode`| `mopMode`| `mopMode`是一个介于 300 和 303 之间的数字 |
|检索当前拖把模式 | `getMopMode`| - 无 - | |
|设置水箱模式 | `setWaterBoxMode`| `waterBoxMode`| `waterBoxMode`是一个介于 200 和 204 之间的数字 |
|启动遥控功能 | `startRemoteControl`| - 无 - | |
|发出远程控制的移动命令 | `move`| `velocity`, `angularVelocity`, `duration`, `sequenceNumber` |序列号必须是顺序的，持续时间以毫秒为单位 |
|结束遥控功能 | `stopRemoteControl`| - 无 - | |
|洁净室/房间 | `cleanRooms`| `rooms`| `rooms`是一个逗号分隔的字符串，带有 enum.rooms.XXX |
|清洁段| `cleanSegments`| `rooms` \| {rooms:`rooms`,waterBoxMode:`waterBoxMode`,mopMode:`mopMode`,fanSpeed:`fanSpeed`} | `rooms`是带有mapIndex的数字或数组或带有mapIndex的逗号分隔字符串|
|洁净区 | `cleanZone`| `coordinates` \| {坐标：`coordinates`，waterBoxMode：`waterBoxMode`，mopMode：`mopMode`，fanSpeed：`fanSpeed`} | `coordinates`是一个带有坐标和计数的字符串，见[区域清洁](#zonecleaning) |
|开始除尘| `startDustCollect`| - 无 - | |
|停止除尘| `stopDustCollect`| - 无 - | |
|停止除尘| `stopDustCollect` | - 无 - | |

## 小部件
![小部件](../../../en/adapterref/iobroker.mihome-vacuum/widgets/mihome-vacuum/img/previewControl.png)

## 错误
- 但是，偶尔会断开连接，这不是由于适配器，而是主要在其自己的网络上
- 小部件当时没有功能

<!-- 下一个版本的占位符（在行首）：

### **正在进行中** -->
### 3.8.3 (2022-11-01)
*（deher）从超时更改日志记录
* (deher) 在日志中隐藏部分令牌

### 3.8.2 (2022-10-31)
* (deher) 将画布凹凸到 2.10.2
* (deher) 禁用地图，如果未安装 CANVAS #681

### 3.8.1 (2022-10-30)
* (deher) 删除工作流的弃用节点 12.x 版本

### 3.8.0 (2022-10-30)
* (deher) 修复 mop_mode 缺少的库存命令
* (deher) 为 cleanSegments 和 cleanZone 添加拖把模式
*（deher）也为房间添加拖把模式
* (MeisterTR) 地图缩放和显示地毯

### 3.7.0 (2022-10-28)
* (deher) 接受带有单个参数的自定义命令
* (deher) cleanSegments 和 cleanZone 的可选参数 waterboxMode 和 fanSpeed
* (deher) 修复消息发送崩溃 (#652)
* (deher) 添加拖把模式 (#670)
* (deher) 为 S7 Ultra 适配 fan_power(#677)

### 3.6.0 (2022-07-07)
*（deher）添加除尘

### 3.5.0 (2022-06-29)
* (deher) 添加 Roborock S6 Pure 模型
* (deher) 在自述文件中添加/扩展一些提示
* (deher) 为 cleanRooms 添加额外的日志信息
* (deher) 修复错误 map-dp 的错误

### 3.4.2 (2022-06-24)
* (Apollon77) 更新依赖以允许更好的自动重建

### 3.4.1 (2022-05-31)
* (deher) 添加错过的真空状态
* (deher) 添加码头状态 废水箱已满

### 3.4.0 (2022-05-28)
* (Apollon77) 修复 Sentry 报告的几个潜在崩溃案例

### 3.3.6 (2022-05-03)
*（Dirkhe）修复污点清洁

### 3.3.5 (2022-02-07)
* (Dirkhe) 修复了一些错误
* (lasthead0) 修复西里尔文问题 RC4 lib#

### 3.3.3 (2022-01-20)
* (Dirkhe) 修复了一些错误
* (Dirkhe) 添加 RC4

### 3.3.1 (2021-10-02)
* (MeisterTR) 修复 IOBROKER-MIHOME-VACUUM-Z
* (MeisterTR) 修复一些错误

### 3.3.0 (2021-10-01)
* (MeisterTR) 修复 S5 没有房间
* (MeisterTR) 修复 IOBROKER-MIHOME-VACUUM-4 DB 关闭
* (MeisterTR) 修复连接错误

### 3.2.2 (2021-07-16)
* (bluefox) 通讯已更正
* (bluefox) 添加了类型检测器检测的角色

### 3.2.1 (2021-07-02)
* (Apollon77) 调整几个崩溃案例 (IOBROKER-MIHOME-VACUUM-K, IOBROKER-MIHOME-VACUUM-J, IOBROKER-MIHOME-VACUUM-F, IOBROKER-MIHOME-VACUUM-7, IOBROKER-MIHOME-VACUUM-A, IOBROKER -MIHOME-VACUUM-4、IOBROKER-MIHOME-VACUUM-G、IOBROKER-MIHOME-VACUUM-C、IOBROKER-MIHOME-VACUUM-B、IOBROKER-MIHOME-VACUUM-Q、IOBROKER-MIHOME-VACUUM-M)

### 3.2.0 (02.06.2021)
* (MeisterTR) 候选版本
* (MeisterTR) 重置后获得消耗品

### 3.1.10 (23.05.2021)
* 错误已修复
* 添加哨兵

### 3.1.6 (05.05.2021)
* 最小化磁盘写入
* 最小化消息
* 将警告消息更改为调试
* 扩展 Debuglog 以查找 e2 Vacuum 的错误
* 地图改变时添加 getStates

### 3.1.5 (03.05.2021)
* 尝试修复地图错误
* Map64 已更改。现在没有 img 标签
* 添加多地图支持（地图更改时获取房间和地图）
* 选择多图
* 修复区域坐标错误
* 添加无线网络
* 修复连接问题
* 修复 Valetudo 地图
* 添加拖把状态
* 修复一些对象

### 3.1.1 (18.4.2021)
 * 完全重写
 * 修复了多个吸尘器的地图错误
 * 修复性能问题
 *更好地连接到真空
 * 修复 ReloadMap 按钮中的错误
 * 显示 Goto 和 Zone 状态以查找地点
 * 还有很多...

### 2.2.5 (2021-04-02)
* 添加 S7 支持
* S5 Max 和其他的错误修正

### 2.2.4 (2020-09-15)
* (dirkhe) 添加配置以发送 Pause Before Home

### 2.2.3 (2020-08-20)
* (dirkhe) 房间 DP 没有被删除，在地图更改时

### 2.2.0 (2020-08-13)
* (MeisterTR) 添加对 Viomi 和 Dreame Api 的测试

### 2.1.1 (2020-07-10)
* (bluefox) 重构
* (bluefox) 添加了对紧凑模式的支持

### 2.0.10 (2020-07-05)
*尝试开始清洁3次，如果机器人没有回答和一些修复

### 2.0.9 (2020-03-05)
* (dirkhe) 为房间频道添加状态信息并将队列信息从数字更改为 JSON

### 2.0.8 (2020-02-26)
* (dirkhe) 减少与机器人的交流

### 2.0.7 (2020-02-25)
* (dirkhe) 为房间添加暂停后恢复

### 2.0.6 (2020-02-17)
* (MeisterTR) 用地图为 s50 添加房间（需要云或 Valetudo）

### 2.0.4 (2020-02-13)
* (MeisterTR) 添加云登录获取token
* (MeisterTR) 添加云地图
* (MeisterTR) 添加新旧地图格式
* (MeisterTR) 重建配置页面

### 1.10.5 (2020-02-11)
* 仅在未连接时发送 Ping，否则 get_status
* 设置按钮状态为真，如果点击
* 将计时器管理器和房间管理器移动到自己的库中

### 1.10.4 (2020-02-06)
* (MeiserTR) 添加对 gen3 和 gen2 2XXX 的 valetudo 地图支持

### 1.10.1 (2020-01-20)
* (dirkhe) 添加区域作为房间处理
*（dirkhe）定时器可以直接房间频道

### 1.10.0 (2020-01-17)
* (dirkhe) 增加了房间处理
* (dirkhe) 添加了计时器
* (dirkhe) 改变了特征处理

### 1.1.6 (2018-12-06)
* (JoJ123) 增加了 MOP (S50+) 的风扇速度。

### 1.1.5 (2018-09-02)
* (BuZZy1337) 添加了状态 16 和 17 的描述（goTo 和区域清理）。
* (BuZZy1337) 添加了自动恢复暂停区域清洁的设置。

### 1.1.4 (2018-08-24)
* (BuZZy1337) 增加了恢复暂停区域清理的可能性（状态：mihome-vacuum.X.control.resumeZoneClean）

### 1.1.3 (2018-07-11)
* (BuZZy1337) 修复 zoneCleanup 状态不工作（vacuum 只是离开码头，说“完成 ZoneCleanup”，并立即返回码头）

### 1.1.2 (2018-07-05)
* (BuZZy1337) 固定检测新固件/第二代真空

### 1.1.1 (2018-04-17)
* (MeisterTR) 错误捕获，为新固件添加状态

### 1.1.0 (2018-04-10)
* (mswiege) 完成小部件

### 1.0.1 (2018-01-26)
* (MeisterTR) 准备好管理员3
* (MeisterTR) 支持 SpotClean 和语音级别 (v1)
* (MeisterTR) 支持第二代 (S50)
* (MeisterTR) 加快数据请求

### 0.6.0 (2017-11-17)
* (MeisterTR) 使用来自 Ios Backup 的 96 字符令牌
* (MeisterTR) 首次使用时连接速度更快

### 0.5.9 (2017-11-03)
* (MeisterTR) 修复没有 i-net 的通讯错误
* (AlCalzone) 添加预定义功率级别的选择

### 0.5.7 (2017-08-17)
* (MeisterTR) 比较系统时间和机器人时间（如果系统时间不同，则修复无连接）
* (MeisterTR) 如果机器人由云启动，则更新值

### 0.5.6 (2017-07-23)
* (MeisterTR) 为 Alexa 控制添加板条箱开关选项

### 0.5.5 (2017-06-30)
* (MeisterTR) 添加状态、功能、修复通讯错误

### 0.3.2 (2017-06-07)
* (MeisterTR) 修复软件更新后没有通讯的问题(Vers. 3.3.9)

### 0.3.1 (2017-04-10)
* (MeisterTR) 修复设置风扇功率
* (bluefox) 如果端口被占用，则捕获错误

### 0.3.0 (2017-04-08)
* (MeisterTR) 添加更多状态

### 0.0.2 (2017-04-02)
* (steinwedel) 实现更好的数据包解码

### 0.0.1 (2017-01-16)
* (bluefox) 初始提交

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