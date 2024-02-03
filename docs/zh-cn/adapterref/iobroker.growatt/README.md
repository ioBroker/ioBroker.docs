---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.growatt/README.md
title: 无题
hash: yeK+7qjG/tFGYwYR2fP9xAxycdFZPprsP44FK5e2mZ8=
---
![标识](../../../en/adapterref/iobroker.growatt/admin/glogo.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.growatt.svg)
![下载](https://img.shields.io/npm/dm/iobroker.growatt.svg)
![安装数量（最新）](https://iobroker.live/badges/growatt-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/growatt-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.growatt.png?downloads=true)

## IoBroker.growatt
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。

该适配器通过古瑞瓦特的云服务器工作。还有 [格罗特项目](https://github.com/johanmeijer/grott) 拦截通信中的数据。

---

### IoBroker 的 Growthatt 适配器
ioBroker Growatt 适配器，用于与 Growatt Shine 服务器通信。
我不隶属。
通常，数据每 5 分钟从数据记录器发送到云端。
您可以更改它，请参见下文。

并非所有工厂类型均已实施。

目前只能读取数据，无法写入参数或更改参数。

---

## 适配器管理页面
### 主要设置
#### 用户名和密码
请输入您在 Shine 应用程序或门户网站中也使用的名称和密码。

#### 使用共享密钥登录
在古瑞瓦特网站的能源、工厂管理、操作工具下，您可以通过电子邮件向自己发送密钥。

####读取植物数据
该数据记录包含存储的主数据

#### 读取最近的历史数据
从数据记录器的历史记录中读取最后的数据记录。
此功能支持数据记录器的分钟间隔。

####读取状态数据
这些数据并非适用于所有工厂（不适用于 INV/MAX/TLX）。该数据集包含实时数据。
此功能支持数据记录器的分钟间隔。

####读取总数据
该数据记录包含聚合数据。

####读取设备数据
该数据记录包含来自设备的一些数据。其他类别中也提供了一些数据。

#### 读取天气
该数据集包含天气预报。

#### 读取故障日志条目
读取当年故障日志中的条目并创建包含该消息的对象。仅读取包含最新报告的第一页。

#### 写入逆变器设置
如果激活此功能，则可以编辑某些逆变器的某些设置。

在逆变器序列号元素下方创建对象以进行设置。为每个设置创建一个通道。

对象下面是“read”、“write”、“msg”和节点值。值下面是参数。

如果可以读取参数值，则使用 ACK=true 写入它们。使用 ack 成功读取时，“read”设置为 true。如果读取失败，则“Read”设置为 false ack=true。在没有 ACK 的情况下从“true”写入“Read”会触发读取操作。如果建立了与云的新连接，也会读出设置。

要写入设置，必须首先设置参数。然后“write”设置为true，ack=false。
如果数据写入成功，“write”设置为“true”ack=true，如果逆变器报错，“write”设置为“false”ack=true。另外，将变频器的返回信息写入“msg”状态。

如果写入成功，会自动触发读取。

逆变器一次只能更改一项设置，传输路径是从 ioBroker 通过云端到 WLAN 适配器，然后到逆变器。这些设置通过队列一个接一个地处理。会话时间太短可能会导致问题。

据我们所知，这些设定的编写是经过深思熟虑的。但是，作者不对软件中包含的错误或因使用该软件而造成的损害承担责任。

#### 如果您的古瑞瓦特页面是黑色 C&I 页面，请选择它
如果您的 Growatt 页面是 C&I Plant 页面，并且在 Growatt Web 界面的路径中包含 indexbC 或 plantDo，请选择它。

黑色 C&I 页面（商业和工业）有通往对象的其他路径，但如果启用此复选框，它似乎可以工作。它将网络路径中的索引更改为indexbC。

#### 超时（以秒为单位）
HTTP 请求的默认超时时间。默认值 60 秒，与 Web 浏览器一样

#### 进程超时（以秒为单位）
此超时监控来自 Growatt 服务器的数据收集。如果服务器在这段时间内没有处理完所有数据，则会报告错误，会话结束并启动新的循环计时器。默认值为 600 秒。
如果值为0，则不执行该检查功能。

#### 保持网络会话
适配器仅登录一次，而不是针对古瑞瓦特服务器的每个数据请求登录。默认情况下它是打开的。

#### 会话时间（分钟）
您可以在此处设置适配器何时注销服务器并再次登录。 0 表示永不注销。默认值为 0=无穷大。

#### 循环时间（以秒为单位）
从服务器请求数据的时间间隔。然后从下一次扣除数据查询所需的时间。如果查询持续时间超过等待时间，适配器仅休眠 100ms。默认值为 30 秒。

#### 错误周期时间（以秒为单位）
如果在古瑞瓦特服务器上查询值时发生错误，则使用该时间而不是周期时间。默认值为 120 秒

####古瑞瓦特服务器
可以在此处输入另一个网址，例如使用美国域。但它必须以“https://”开头。默认值为空，因此使用 https://server.growatt.com。

### 管理对象
您可以在此处定义逆变器拾取的每个值（对象）应发生的情况。
有很多值不属于您的逆变器。这些可以在这里删除。
由于保存时没有可以重新加载对象列表的事件。按下保存时必须使用更新按钮。

＃＃＃＃ 普通的
对象保留，值更新。

＃＃＃＃ 删除
对象被删除，变频器加载的值被丢弃。
更新后，由于该对象不再存在，因此仅显示 ID 和操作。如果正常选择，保存后会重新创建对象。

#### 没有更新
对象保留，来自逆变器的值被丢弃。

### 管理记录器
该实例必须正在运行并登录到服务器。然后可以通过此选项卡中的刷新按钮调用数据记录器的设置。
不会自动请求数据，只能通过按钮发出请求。
数据记录器显示的字段无法更改。它仅与检索到的数据有关。
每个记录器都会显示按钮。可以使用 按钮编辑设置。
_使用 GROTT 时，必须启用更改 INI 中的设置。_如果出现您不期望的值，请不要使用这些设置。
注意这是基于再造的。我对设备损坏不承担任何责任。

#### 按钮间隔
从数据记录器中读取当前间隔（以分钟为单位），并出现一个输入表单，可以在其中调整该值。
如果收到成功响应，则应重新启动数据记录器以激活设置。

#### 按钮服务器ip
可以在此处设置记录仪数据传输的服务器。当使用 Grott 或 US 时，可以在此处指定本地或美国 IP。
如果收到成功响应，则应重新启动数据记录器以激活设置。

#### 按钮服务器端口
可以在此处设置服务器上用于记录仪数据传输的端口。
如果收到成功响应，则应重新启动数据记录器以激活设置。

#### 按钮检查固件
将询问数据记录器的固件是否是最新的。
更新必须在growatt页面上完成。

#### 按钮重新启动数据记录器
每只靴子都很好。
设置被接受。

---

## 脚本的 sendTo
可以通过 sendTo 向实例发送命令。然后适配器做出响应。
执行以下命令。
返回值根据参数传递而返回。如果参数作为 JSON 字符串传递，则返回 JSON。如果参数作为对象传递，则返回一个对象。

### 获取历史记录
该命令列出历史记录。例如，它可用于补充数据库中的数据。
无论时间范围如何，古瑞瓦特似乎总是返回 80 条记录。如果间隔设置为1分钟，需要超过80分钟，则必须多次执行该命令，并且从0开始的次数必须越来越多。

|参数|类型 |描述 |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------ |
|类型 |字符串|逆变器的类型可以在对象“growatt.-instance-.-nr-.devices.-sn-.growattType”中找到。 |
| SN |字符串|逆变器的序列号可以在对象路径“growatt.-instance-.-nr-.devices.-sn-”中找到。 |
|开始日期 |日期 |艺术 |
|结束日期 |日期 |结束必须比开始更美好 |
|开始 |整数| 0 是调用的起始页，最新数据在前 |

调用示例：

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
该函数没有参数。必须传递“{}”或 {}。
返回的是一个对象数组。

|参数|类型 |描述 |
| --------- | ---- | ----------- |

### GetDataLoggerIntervalRegister
它读出间隔并返回它。返回值是一个 OBJ。间隔以 msg 为单位。

|参数|类型 |描述 |
| --------- | ------ | ------------------------------------------------------------- |
| SN |字符串|记录器的序列号由 getDatalogger 返回。 |

### SetDataLoggerIntervalRegister
写入记录器发送数据的间隔。

|参数|类型 |描述 |
| --------- | ------- | ------------------------------------------------------------- |
| SN |字符串|记录器的序列号由 getDatalogger 返回。 |
|价值|整数 |以分钟为单位的新值 |

返回一个带有消息的对象。

### GetDataLoggerIpRegister
它读取记录器发送数据的 IP 并将其返回。返回值是一个 OBJ。 IP 位于消息中。

|参数|类型 |描述 |
| --------- | ------ | ------------------------------------------------------------- |
| SN |字符串|记录器的序列号由 getDatalogger 返回。 |

### SetDataLoggerIp
它写入记录器发送数据的 IP。它对于 Grott 项目很有用。返回值是一个对象，说明发生了什么。

|参数|类型 |描述 |
| --------- | ------- | ------------------------------------------------------------- |
| SN |字符串|记录器的序列号由 getDatalogger 返回。 |
|价值|整数 |以分钟为单位的新值 |

返回一个带有消息的对象。

### 获取DataLoggerPortRegister
它读取记录器发送数据的端口并将其返回。返回值是一个 OBJ。 IP 位于消息中。

|参数|类型 |描述 |
| --------- | ------ | ------------------------------------------------------------- |
| SN |字符串|记录器的序列号由 getDatalogger 返回。 |

### 设置DataLoggerPort
它写入记录器发送数据的端口。它对于 Grott 项目很有用。返回值是一个对象，说明发生了什么。

|参数|类型 |描述 |
| --------- | ------- | ------------------------------------------------------------- |
| SN |字符串|记录器的序列号由 getDatalogger 返回。 |
|价值|整数 |以分钟为单位的新值 |

返回一个带有消息的对象。

### 检查Logger固件
从记录器调用固件检查。如果需要更新，您可以在答案中看到。

|参数|类型 |描述 |
| --------- | ------ | ------------------------------------------------------------- |
| SN |字符串|记录器的序列号由 getDatalogger 返回。 |

### 重新启动数据记录器
导致数据记录器热启动。

|参数|类型 |描述 |
| --------- | ------ | ------------------------------------------------------------- |
| SN |字符串|记录器的序列号由 getDatalogger 返回。 |

---

## 加速数据区间内部方法
查看管理记录器和按钮间隔

## 加速数据间隔外部应用程序方法
- 打开ShinePhone应用程序
- 点击下面的附件
- 右上角+，然后列出数据记录器
- 单击现有数据记录器
- 配置数据记录器
- 无线热点模式
- 将摇杆置于 AP 模式
- 连接到 Wifi 热点，密码 123456789 ？ <- 再次检查
- 继续
- 先进的
- 时间设定
- 间隔为 1
- 输入密码growattYYYYMMDD（例如growatt20220209）
- 开锁
- 单击并应用更改
- 退出热点模式

## 加速数据间隔外部老方法
在热点模式下，只能更改旧固件上的间隔。
Growatt 已从固件中删除了该网站。
因此，该描述也已被删除。

**growatt 方面的图表没有变化。在那里您只能看到数据记录器中数据的变化。**

-\*-

## Changelog

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