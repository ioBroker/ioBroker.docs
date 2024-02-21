---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.growatt/README.md
title: 无题
hash: vWjDtyP1CgPk43nFs0lzDip6hiUJB3n0/TiGkjPZNZc=
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

要写入设置，必须首先设置参数。然后将“write”设置为 true 且 ack=false。
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
|开始 |整数 | 0 是调用的起始页，最新数据在前 |

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

＃＃ **工作正在进行中**
- (PLCHome) 配置此适配器以使用发布脚本。

## 3.2.3 (2024 年 1 月 27 日)
- (PLCHome) 在多重回流中，总数据和状态数据中的对象已交换。请删除“总数据”和“状态数据”下面的对象，并在更新后重新启动适配器。

## 3.2.2 (2024 年 1 月 27 日)
- (PLCHome) 现在可以捕获故障日志消息（感谢 ZioCain 提供代码）
- (PLCHome) 设置MAX逆变器的有功功率（感谢sefina测试）

## 3.2.1 (08.09.2023)
- (PLCHome) 通过工厂列表另外查询状态信息。

## 3.2.0 (01.09.2023)
- (PLCHome) 添加了逆变器类型 singleBackflow 和 multipleBackflow

## 3.1.2 (2023 年 8 月 16 日)
- (PLCHome) sendTo 现在也可以使用对象作为消息数据
- (PLCHome) 添加消息 getHistory

## 3.1.1 (03.07.2023)
- (PLCHome) 当工厂是 C&I 工厂页面且古瑞瓦特 Web 界面路径中带有 indexbC 或 plantDo 时，添加了对古瑞瓦特页面的支持。感谢 Denn281

## 3.0.4 (03.07.2023)
- (PLCHome) 参数错误后无法检索其他参数值
- (PLCHome) MIX 上的电网优先和电池优先设置可能不起作用

## 3.0.3 (2023 年 6 月 27 日)
- 改进了 (PLCHome) tlx/tlxh 时间设置

## 3.0.2 (08.06.2023)
- (PLCHome)写入逆变器设置，可以通过配置激活

  - 混合
    - 时间
    - 网格优先
    - 电池优先
    - 逆变器开/关
    - 加载优先
    - 故障保护
    - 光伏有功功率率
    - 回流设置
      - 回流设定功率
    - 爱普生
  - TLX/TLXH
    - 时间
    - 光伏有功功率率

## 2.1.1 (2023 年 4 月 17 日)
- (PLCHome) 日历结构并不总是更改为时间戳
- (PLCHome) 改进了对象的内部处理，无需考虑其大小。

## 2.1.0 (2023 年 4 月 14 日)
- (PLCHome) 状态数据现在也来自 TLX/TLXH
- (PLCHome) TLX Hybrid 现已投入使用
- (PLCHome) 如果有不同的逆变器，现在会显示

## 2.0.0 (06.10.2022)
- (PLCHome) 可以调用和更改数据记录器设置。
- (PLCHome) 服务器 URL 可以更改。

## 1.2.1 (21.09.2022)
- (PLCHome) 为数值添加了偏移量。我的逆变器自行重置了总量。现在可以更正总数量。

## 1.1.19 (30.08.2022)
- (PLCHome) HTML 标头

## 1.1.17 (10.08.2022)
- (PLCHome) JSON Loopkiller

## 1.1.16 (10.08.2022)
- (PLCHome) https 拒绝未经授权 false

## 15 年 1 月 1 日（2022 年 4 月 28 日）
- (PLCHome) Apple 设备无法使用 Safari 打开适配器的配置页面，所有值均为空

## 14 年 1 月 1 日（2022 年 4 月 26 日）
- (PLCHome) 异常时重新启动循环

## 1.1.13 (08.04.2022)
- (PLCHome) 类型 inv 缺少总数据和历史数据

## 1.1.12 (06.04.2022)
- (PLCHome) api维护

## 11.1.1 (2022.04.02)
- (PLCHome) 修复自述文件
- (PLCHome) 固定版本

## 10 年 1 月 1 日 (2022 年 4 月 2 日)
- (PLCHome) 首次抑制警告：/error.do?errorMess=errorNoLogin

## 1.1.9 (2022 年 3 月 27 日)
- (PLCHome) 让源代码更漂亮一点
- (PLCHome) 让自述文件更漂亮
- (PLCHome) 增加测试和发布
- (PLCHome) 改进：在内循环和外循环中使用 i
- (PLCHome) 由“Sentry”问题触发的改进：未定义的对象
- (PLCHome) 改进：无需断开与“Sentry”的连接

## 1.1.8 (16.03.2022)
- (PLCHome) 由“Sentry”问题引发的改进

## 1.1.7 (13.02.2022)
- (PLCHome) 添加了“哨兵”

## 1.1.6 (12.02.2022)
- (PLCHome) 请读我

## 1.1.2 (12.02.2022)
- (PLCHome) 超时变得可维护和调整。请求超时现在像 Chrome 一样为 60 秒
- (PLCHome) 服务器请求得到改进，并进一步防止死机
- (PLCHome) 计算睡眠到下一个请求以保持周期。最短睡眠时间为 100 毫秒
- (PLCHome) 错误输出：如果密钥已过期，则将使用错误代码转发请求，该代码现在位于日志中
- (PLCHome) 改进的错误处理
- (PLCHome) 改进了调试
- (PLCHome) 更新包括

## 1.1.1 (2021 年 5 月 27 日)
- (PLCHome) 由于登录问题，网络请求超时增加

## 1.1.0 (2021 年 5 月 24 日)
- (PLCHome) 通过 Axios Session 改进连接

## 1.0.1 (05.03.2021)
- (PLCHome) 传输了重复的密钥，我尝试将它们过滤掉。

## 1.0.0 (2021 年 2 月 24 日)
- (PLCHome) 请读我
- (PLCHome) 修复：根据时间或日历结构为所有设备的最后历史数据创建日期，有时无法正常工作

## 0.0.20 (09.02.2021)
- (PLCHome) 根据时间或日历结构为所有设备的最后历史数据创建日期

## 0.0.19 (05.02.2021)
- (PLCHome) 图表中的数据被删除。这些仅在 5 分钟内提供。现在可以通过历史记录查询性能。
- (PLCHome) 未选择的数据区域的对象现在被删除。
- (PLCHome) 您可以选择要忽略或删除的对象。
- (PLCHome) 添加了指向 Growatt 页面的链接，因此适配器现在也出现在概述中。
- (PLCHome) 最近，古瑞瓦特改变了数值的拼写，字母大小写。因此，现在在内部处理对象时不区分大小写。如果更新后启动时在日志中写入警告，则必须删除这两个对象之一。如果更新后启动时在日志中写入警告，则必须删除这两个对象之一。然后重新启动适配器，以便它肯定使用剩余的对象来存储该值。

## 0.0.18 (23.01.2021)
- (PLCHome) 版本信息错误。

## 0.0.17 (21.01.2021)
- (PLCHome) 修复了逆变器历史数据的日期问题。

## 0.0.16 (20.01.2021)
- (PLCHome) npm 包版本更新
- (PLCHome) 添加所有工厂的最新历史记录。特别感谢magix提供的密钥，让我可以测试逆变器历史功能。

## 0.0.15 (04.12.2020)
- (PLCHome) npm 包版本更新

## 0.0.14 (01.12.2020)
- (PLCHome) 改进了古瑞瓦特网站未返回的对象

## 0.0.12 (27.11.2020)
- (PLCHome) 共享密钥初始化错误：字符串而不是布尔值

## 0.0.11 (27.11.2020)
- (PLCHome) 请读我

## 0.0.10 (26.11.2020)
- (PLCHome) 共享密钥登录
- (PLCHome) 如果没有实时数据，则为图表的最后一个值。
- (PLCHome) 更改轮询间隔

## 0.0.9 (05.10.2020)
- (PLCHome) 修复没有功能“ADAPTER_AUTO_DECRYPT_NATIVE”

## 0.0.8 (05.10.2020)
- (PLCHome) 修复 io 包

## 0.0.7 (05.10.2020)
- (PLCHome) with "@iobroker/adapter-core": "^2.4.0"，js-controller dep 需要 >=2.0.0！
- (PLCHome) io-package 本机定义 5 个值，管理设置 7 个值
- (PLCHome) 存储密码加密

## 0.0.6 (2020 年 8 月 31 日)
- (PLCHome) 使用 ioBroker 工具进行翻译。

## 0.0.5
- (PLCHome) 初始版本。

## 0.0.1
- (PLCHome) 初始版本。

-\*-

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

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