---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.growatt/README.md
title: 无标题
hash: w/wZnVe/W6/Uotei+a1qmXod98bfZVQ1gLVMVUEz6QE=
---
![标识](../../../en/adapterref/iobroker.growatt/admin/glogo.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.growatt.svg)
![下载](https://img.shields.io/npm/dm/iobroker.growatt.svg)
![安装数量（最新）](https://iobroker.live/badges/growatt-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/growatt-stable.svg)
![新平台](https://nodei.co/npm/iobroker.growatt.png?downloads=true)

## IoBroker.growatt
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

该适配器通过 Growatt 的云服务器工作。还有一个 [格罗特项目](https://github.com/johanmeijer/grott) 可以拦截通信中的数据。

---

### Growatt ioBroker 适配器
ioBroker Growatt 适配器用于与 Growatt Shine 服务器通信。
我没有隶属关系。
通常，数据每 5 分钟从数据记录器发送到云端一次。
您可以更改它，见下文。

并非所有工厂类型均已实施。

目前只能读取数据，无法写入参数或更改参数。

### 我可以花一杯咖啡吗？
当然，如果你喜欢我的作品，可以通过 Paypal 汇款至 PLChome _at_ fontanestr _dot_ de

---

## 适配器管理页面
### 主要设置
#### 用户和密码
请输入您在 Shine 应用程序或门户网站中使用的名称和密码。

#### 使用共享密钥登录
在 Growatt 网站的能源、工厂管理、操作工具下，您可以通过电子邮件向自己发送密钥。

#### 读取植物数据
该数据记录包含存储的主数据

#### 读取最后的历史数据
从数据记录器的历史记录中读取最后的数据记录。
此功能支持数据记录器的分钟间隔。

#### 读取状态数据
这些数据不适用于所有工厂（不是 INV/MAX/TLX）。此数据集包含实时数据。
此功能支持数据记录器的分钟间隔。

#### 读取总数据
该数据记录包含聚合数据。

#### 读取设备数据
该数据记录包含来自设备的一些数据。其他类别中也有一些数据。

#### 阅读天气
该数据集包含天气预报。

#### 读取故障日志条目
读取当前年度故障日志中的条目并创建包含该消息的对象。仅读取包含最新报告的第一页。

#### 写入逆变器设置
如果激活此功能，则可以编辑某些逆变器的一些设置。

在逆变器序列号元素下创建对象以进行设置。为每个设置创建一个通道。

对象下面是“read”、“write”、“msg”和节点值。值下面是参数。

如果参数值可以读取，则写入时带 ACK=true。成功读取并收到 ack 后，“read”设置为 true。如果读取失败，则将“Read”设置为 false ack=true。从“true”写入“Read”且没有 ACK 会触发读取操作。如果建立了与云的新连接，也会读出设置。

要写入设置，必须先设置参数。然后将“write”设置为 true，ack=false。
如果数据写入成功，则“write”设置为“true”ack=true，如果逆变器报告错误，则“write”设置为“false”ack=true。此外，逆变器的返回消息将写入“msg”状态。

如果写入成功，则会自动触发读取。

逆变器一次只能更改一个设置，传输路径是从 ioBroker 通过云到 WLAN 适配器，然后到逆变器。设置通过队列逐个处理。会话时间太短可能会导致问题。

设置的编写是我们尽最大努力完成的。但是，作者不对软件中的错误或因使用该软件而造成的损失承担责任。

#### 如果您的 Growatt 页面是黑色 C&I 页面，请选择它
如果您的 Growatt 页面是 C&I Plant 页面，并且 Growatt 网页界面的路径中包含 indexbC 或 plantDo，请选择它。

黑色 C&I 页面（商业和工业）有其他对象路径，但如果选中此复选框，它似乎可以工作。它将 webpath 中的索引更改为 indexbC。

#### 超时（秒）
HTTP 请求的默认超时时间。默认值为 60 秒，与 Web 浏览器相同

#### 进程超时（秒）
此超时时间监控 Growatt 服务器的数据收集情况。如果服务器在此时间内未处理所有数据，则报告错误，会话结束并启动新的循环计时器。默认值为 600 秒。
如果值为 0，则不执行此检查函数。

#### 保持网络会话
适配器仅登录一次，而不是针对 Growatt 服务器的每次数据请求登录。默认情况下，它是开启的。

#### 会话时间（分钟）
您可以在此处设置适配器何时退出服务器并再次登录。0 表示永不退出。默认值为 0=无穷大。

#### 循环时间（秒）
从服务器请求数据的间隔。数据查询所需的时间将从下一次查询中扣除。如果查询持续时间超过等待时间，适配器只会休眠 100ms。默认值为 30 秒。

#### 错误周期时间（秒）
如果在 Growatt 服务器上查询值时出现错误，则使用此时间代替循环时间。默认值为 120 秒

#### Growatt 服务器
可以在此处输入其他 URL，例如使用美国域名。但必须以“https://”开头。默认为空白，因此使用 https://server.growatt.com。

### 管理对象
您可以在此处定义逆变器拾取的每个值（对象）应发生什么。
有很多值不属于您的逆变器。这些值可以在此处删除。
由于在保存时没有可以重新加载对象列表的事件。按下保存时必须使用更新按钮。

＃＃＃＃ 普通的
对象保留，值已更新。

＃＃＃＃ 删除
对象被删除，逆变器加载的值被丢弃。
更新后，由于对象不再存在，因此只显示ID和操作。如果正常选择，保存后将再次创建该对象。

#### 没有更新
对象保留下来，来自逆变器的值被丢弃。

### 管理记录器
实例必须正在运行并登录到服务器。然后，可以通过此选项卡中的刷新按钮调用数据记录器的设置。
数据不会自动请求，只能通过按钮进行请求。
数据记录器显示的字段无法更改。它仅与检索到的数据有关。
每个记录器都显示按钮。可以使用按钮编辑设置。
_使用 GROTT 时，必须启用 INI 中的设置更改。_如果出现您不期望的值，请不要使用这些设置。
注意这是基于重新生成。我对设备损坏不承担责任。

#### 按钮间隔
从数据记录器中读取当前间隔（以分钟为单位），并出现一个输入表单，可以在其中调整值。
如果收到成功响应，则应重新启动数据记录器以激活设置。

#### 按钮服务器ip
可以在此处设置记录器上用于数据传输的服务器。使用 Grott 或 US 时，可以在此处指定本地或美国 IP。
如果收到成功响应，则应重新启动数据记录器以激活设置。

#### 按钮服务器端口
可以在此处设置服务器上用于记录器数据传输的端口。
如果收到成功响应，则应重新启动数据记录器以激活设置。

#### 按钮检查固件
系统将询问数据记录器的固件是否是最新的。
必须在 growatt 页面上进行更新。

#### 按钮重新启动数据记录器
每次启动都很好。
设置已接受。

---

## SendTo 用于脚本
可以通过 sendTo 向实例发送命令。然后适配器会做出响应。
实现以下命令。
返回值取决于参数传递。如果参数作为 JSON 字符串传递，则返回 JSON。如果参数作为对象传递，则返回对象。

### 获取历史记录
此命令列出历史记录。例如，它可用于补充数据库中的数据。
无论时间范围如何，Growatt 似乎总是返回 80 条记录。如果间隔设置为 1 分钟，并且需要超过 80 分钟，则必须多次执行该命令，并且必须从 0 开始越来越多。

| 参数 | 类型 | 描述 |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| 类型 | 字符串 | 逆变器的类型可以在对象“growatt.-instance-.-nr-.devices.-sn-.growattType”中找到。|
| sn | 字符串 | 逆变器的序列号可以在对象路径“growatt.-instance-.-nr-.devices.-sn-”中找到。|
| 开始日期 | 日期 | 开始日期 |
| endDate | 日期 | 结束日期必须早于开始日期 |
| 开始 | 整数 | 0 是呼叫的起始页，其中最新数据优先 |

示例调用：

```
  sendTo('growatt.0','getHistory',{"type":"<your inverter type>","sn":"<your inverter serial>","startDate":new Date((new Date()).getTime()- 60*60*1000),"endDate":new Date() , "start":0},(res)=>{console.log(res)})
```

示例代码：

```
const sn = " your sn "; //your inverter sn
const inType = " your typ "; // the invertertyp
const hist = 'growatt.0. your nr .devices. your sn .historyLast.'; // the Path to history
const storeField =['accChargePower','etoGridToday']; //the fields to store
const history = "influx.0" //your History sql.0 or influx.0 or history.0 ...
const min = 10 // größer 10 min auffüllen....

on({id: hist+'calendar', change: "ne"},(obj)=>{
    if ((obj.state.val - obj.oldState.val) > min*60000) {
        console.log(obj.state.val - obj.oldState.val);
        function fillup(res) {
            res.forEach((r)=>{
                const ti = (new Date(r.calendar)).getTime();
                if (ti > obj.oldState.val && ti < obj.state.val) {
                    function store(n) {
                        sendTo(history, 'storeState', {
                            id: hist+n,
                            state: {ts: ti, val: r[n], ack: true}
                        }, result => {console.log(`added ${hist+n} ${new Date(ti)} ${r[n]}`)});
                    }
                    storeField.forEach((f) => {store(f)});
                }
            })
        }
        sendTo('growatt.0','getHistory',{"type":inType,"sn":sn,"startDate":obj.oldState.val,"endDate":obj.state.val, "start":0},fillup)
        sendTo('growatt.0','getHistory',{"type":inType,"sn":sn,"startDate":obj.oldState.val,"endDate":obj.state.val, "start":1},fillup)
        sendTo('growatt.0','getHistory',{"type":inType,"sn":sn,"startDate":obj.oldState.val,"endDate":obj.state.val, "start":2},fillup)
        sendTo('growatt.0','getHistory',{"type":inType,"sn":sn,"startDate":obj.oldState.val,"endDate":obj.state.val, "start":3},fillup)
    }
});
```

### 获取数据记录器
它为您提供有关数据记录器的信息。
此函数没有参数。必须传递“{}”或{}。
返回的是对象数组。

| 参数 | 类型 | 描述 |
| --------- | ---- | ----------- |

### GetDataLoggerIntervalRegister
它读出间隔并返回它。返回值是一个 OBJ。间隔在 msg 中。

| 参数 | 类型 | 描述 |
| --------- | ------ | ------------------------------------------------------------- |
| sn | 字符串 | 记录器的序列号由 getDatalogger 返回。|

### SetDataLoggerIntervalRegister
写入记录器发送数据的间隔。

| 参数 | 类型 | 描述 |
| --------- | ------- | ------------------------------------------------------------- |
| sn | 字符串 | 记录器的序列号由 getDatalogger 返回。|
| 值 | 整数 | 以分钟为单位的新值 |

返回一个带有消息的对象。

### 获取数据记录器接口注册
它读取记录器发送数据到的 IP 并返回。返回值是一个 OBJ。IP 在 msg 中。

| 参数 | 类型 | 描述 |
| --------- | ------ | ------------------------------------------------------------- |
| sn | 字符串 | 记录器的序列号由 getDatalogger 返回。|

### 设置数据记录器 IP
它写入记录器发送数据到的 IP。它对 Grott 项目很有用。返回值是一个说明发生了什么的对象。

| 参数 | 类型 | 描述 |
| --------- | ------- | ------------------------------------------------------------- |
| sn | 字符串 | 记录器的序列号由 getDatalogger 返回。|
| 值 | 整数 | 以分钟为单位的新值 |

返回一个带有消息的对象。

### 获取数据记录器端口寄存器
它读取记录器发送数据到的端口并返回。返回值是一个 OBJ。IP 在 msg 中。

| 参数 | 类型 | 描述 |
| --------- | ------ | ------------------------------------------------------------- |
| sn | 字符串 | 记录器的序列号由 getDatalogger 返回。|

### 设置数据记录器端口
它写入记录器发送数据的端口。它对 Grott 项目很有用。返回值是一个说明发生了什么的对象。

| 参数 | 类型 | 描述 |
| --------- | ------- | ------------------------------------------------------------- |
| sn | 字符串 | 记录器的序列号由 getDatalogger 返回。|
| 值 | 整数 | 以分钟为单位的新值 |

返回一个带有消息的对象。

### 检查记录器固件
从记录器调用固件检查。如果需要更新，您可以在答案中看到它。

| 参数 | 类型 | 描述 |
| --------- | ------ | ------------------------------------------------------------- |
| sn | 字符串 | 记录器的序列号由 getDatalogger 返回。|

### 重启数据记录器
导致数据记录器热启动。

| 参数 | 类型 | 描述 |
| --------- | ------ | ------------------------------------------------------------- |
| sn | 字符串 | 记录器的序列号由 getDatalogger 返回。|

---

## 加速数据间隔内部方法
查看管理记录器和按钮间隔

## 加速数据间隔外部应用程序方法
- 打开 ShinePhone 应用程序
- 点击下面的附件
- 右上角 +，然后列出数据记录器
- 点击现有的数据记录器
- 配置数据记录器
- 无线热点模式
- 将摇杆置于 AP 模式
- 连接到 Wifi 热点，密码 123456789 ? <- 再检查一次
- 继续
- 先进的
- 时间设置
- 间隔为 1
- 输入密码growattYYYYMMDD（例如growatt20220209）
- 解锁
- 单击并应用更改
- 退出热点模式

## 加速数据间隔外部旧方法
在热点模式下，只能在旧固件上更改间隔。
Growatt 已从固件中删除了该网站。
因此，描述也被删除了。

**growatt 方面的图表没有变化。您只能看到数据记录器数据的变化。**

-\*-

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### 3.3.1 (2024-10-26)

- (PLCHome) Added ac charge for TLXH. Thanx to olli0815!
- (PLCHome) Added time slots for TLXH. Thanks to olli0815 for debugging and support.
- (PLCHome) Added Inverter On Off for TLX und TLXH. Thanks to olli0815 for debugging and support.

### 3.3.0 (2024-10-25)

- (PLCHome) Added time slots for TLXH. Thanks to olli0815 for debugging and support.
- (PLCHome) Added Inverter On Off for TLX und TLXH. Thanks to olli0815 for debugging and support.

### 3.2.5 (2024-08-13)

- (PLCHome) Solved the problem that no inverter list but result 2 was returned in NOAH.
- (PLCHome) Added NOAH.

### 3.2.4 (2024-07-03)

- (PLCHome) Configure this adapter to use the release script.
- (PLCHome) no connection can be established password must now be transferred as MD5 hash.
- (PLCHome) cookie issue

### 3.2.3 (27.01.2024)

- (PLCHome) In Multiple Backflow the objects in Total Data and Status Data were swapped. Please delete the objects below Total Data and Status Data and restart the adapter after the update.

### 3.2.2 (27.01.2024)

- (PLCHome) Catching of the fault log messages is now possible (Thanx to ZioCain for the code)
- (PLCHome) Setting active power for MAX inverter (Thanx to sefina for testing)

### 3.2.1 (08.09.2023)

- (PLCHome) Additionally query the status information via the Plant List.

### 3.2.0 (01.09.2023)

- (PLCHome) Added inverter typ singleBackflow and multipleBackflow

### 3.1.2 (16.08.2023)

- (PLCHome) sendTo now also possible with objects as message data
- (PLCHome) Added message getHistory

### 3.1.1 (03.07.2023)

- (PLCHome) Added support for Growatt page when Plant is a C&I Plant page with indexbC or plantDo in Path of the Growatt web interface. Thanks to Denn281

### 3.0.4 (03.07.2023)

- (PLCHome) No retrieval of the other parameters value possible after parameter error
- (PLCHome) Grid first and Battery first setting on MIX may not work

### 3.0.3 (27.06.2023)

- (PLCHome) setting for tlx/tlxh time improved

### 3.0.2 (08.06.2023)

- (PLCHome) Write inverter settings, it can be activated via the config

  - mix
    - Time
    - Grid first
    - Battery first
    - Inverter On/Off
    - LoadFirst
    - Failsafe
    - PV active power rate
    - Backflow setting
      - Backflow setting power
    - EPSOn
  - tlx/tlxh
    - Time
    - PV active power rate

### 2.1.1 (17.04.2023)

- (PLCHome) Calendar structure was not always changed to timestamp
- (PLCHome) Improvement in the internal handling of objects without considering their case.

### 2.1.0 (14.04.2023)

- (PLCHome) Status data now also from TLX/TLXH
- (PLCHome) TLX Hybrid is now working
- (PLCHome) If there are different inverters, these are now shown

### 2.0.0 (06.10.2022)

- (PLCHome) Data logger settings can be called up and changed.
- (PLCHome) The server url can be changed.

### 1.2.1 (21.09.2022)

- (PLCHome) Added an offset to numeric values. My inverter reset te total quantity by itself. Now the total quantity can be corrected.

### 1.1.19 (30.08.2022)

- (PLCHome) HTML Header

### 1.1.17 (10.08.2022)

- (PLCHome) JSON Loopkiller

### 1.1.16 (10.08.2022)

- (PLCHome) https rejectUnauthorized false

### 1.1.15 (28.04.2022)

- (PLCHome) Apple devices cannot open the adapter's config page with Safari, all values are empty

### 1.1.14 (26.04.2022)

- (PLCHome) Restart loop when exception

### 1.1.13 (08.04.2022)

- (PLCHome) total data and history data missing for type inv

### 1.1.12 (06.04.2022)

- (PLCHome) api maintance

### 1.1.11 (02.04.2022)

- (PLCHome) fixed readme
- (PLCHome) fixed version

### 1.1.10 (02.04.2022)

- (PLCHome) suppressed the warning for the Firsttime: /error.do?errorMess=errorNoLogin

### 1.1.9 (27.03.2022)

- (PLCHome) Make the source a little prettier
- (PLCHome) Make the readme prettier
- (PLCHome) Added Test and Release
- (PLCHome) Improvement: used i in inner and outer loop
- (PLCHome) Improvement triggered by "Sentry" issues: undefined object
- (PLCHome) Improvement: no disconnect to "Sentry"

### 1.1.8 (16.03.2022)

- (PLCHome) Improvement triggered by "Sentry" issues

### 1.1.7 (13.02.2022)

- (PLCHome) "Sentry" was added

### 1.1.6 (12.02.2022)

- (PLCHome) Read me

### 1.1.2 (12.02.2022)

- (PLCHome) Timeouts made maintainable and adjusted. Request timout is now 60 second like chrome
- (PLCHome) Server request improved and additionally secured against dying
- (PLCHome) Calculate sleep to next request to keep cycle. Minimum sleep is 100ms
- (PLCHome) Error output: if the key has expired, requests are forwarded with an error code, which is now in the log
- (PLCHome) Improved error handling
- (PLCHome) Improved debugging
- (PLCHome) Update the includes

### 1.1.1 (27.05.2021)

- (PLCHome) The web request timeout was increased due to login issues

### 1.1.0 (24.05.2021)

- (PLCHome) Improvement of the connection via Axios Session

### 1.0.1 (05.03.2021)

- (PLCHome) Duplicate keys are transmitted, I try to filter them out.

### 1.0.0 (24.02.2021)

- (PLCHome) Read me
- (PLCHome) fix: Create a date from the time or calendar structure for last history data for all devices sometimes not working

### 0.0.20 (09.02.2021)

- (PLCHome) Create a date from the time or calendar structure for last history data for all devices

### 0.0.19 (05.02.2021)

- (PLCHome) The data from the chart is removed. These were only available in a 5-minute grid. The performance can now be queried via the history.
- (PLCHome) Objects of unselected data areas are now deleted.
- (PLCHome) You can choose objects to be ignored or deleted.
- (PLCHome) A link to the Growatt page was added, so the adapter now also appears in the overview.
- (PLCHome) Recently, Growatt has changed the spelling of values, which letters are uppercase and lowercase. For this reason, the objects are now handled internally Case Insensively. If a warning is written in the log after the update when starting, you have to delete one of the two objects. If a warning is written in the log after the update when starting, you have to delete one of the two objects. And then restart the adapter so that it definitely uses the remaining object to store the value.

### 0.0.18 (23.01.2021)

- (PLCHome) wrong version info.

### 0.0.17 (21.01.2021)

- (PLCHome) fixes a date issue on inverter history data.

### 0.0.16 (20.01.2021)

- (PLCHome) npm package version update
- (PLCHome) add last history for all plants. Special thanks to magix for the key, so i can test the inverter history function.

### 0.0.15 (04.12.2020)

- (PLCHome) npm package version update

### 0.0.14 (01.12.2020)

- (PLCHome) improvement for objects not returned from Growatt website

### 0.0.12 (27.11.2020)

- (PLCHome) wrong initialization for shared key: string instead of boolean

### 0.0.11 (27.11.2020)

- (PLCHome) Read me

### 0.0.10 (26.11.2020)

- (PLCHome) Shared key login
- (PLCHome) Last value of the graph if there are no live data.
- (PLCHome) Change of the polling interval

### 0.0.9 (05.10.2020)

- (PLCHome) fix no feature 'ADAPTER_AUTO_DECRYPT_NATIVE'

### 0.0.8 (05.10.2020)

- (PLCHome) fix io-package

### 0.0.7 (05.10.2020)

- (PLCHome) with "@iobroker/adapter-core": "^2.4.0", the js-controller dep needs to be >=2.0.0!
- (PLCHome) io-package native defined 5 values, admin sets 7
- (PLCHome) store password encrypted

### 0.0.6 (31.08.2020)

- (PLCHome) translation with ioBroker tool.

### 0.0.5

- (PLCHome) initial release.

### 0.0.1

- (PLCHome) initial release.

-\*-

## License

The MIT License (MIT)

Copyright (c) 2024 PLCHome

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