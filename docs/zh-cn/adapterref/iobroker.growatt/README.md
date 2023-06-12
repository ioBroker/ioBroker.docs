---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.growatt/README.md
title: 无题
hash: ER+35iKj0YhtF58blC/BVn1Nibl+utaPPgDrBI9aMiA=
---
![标识](../../../en/adapterref/iobroker.growatt/admin/glogo.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.growatt.svg)
![下载](https://img.shields.io/npm/dm/iobroker.growatt.svg)
![安装数量（最新）](https://iobroker.live/badges/growatt-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/growatt-stable.svg)
![NPM](https://nodei.co/npm/iobroker.growatt.png?downloads=true)

## IoBroker.growatt
## 重要：请阅读
古瑞瓦特的云服务器非常不稳定。请求数据时有错误消息和超时。
如果您还在考虑是否要购买逆变器，最好使用好的产品。通过 modbus-ip 直接在室内传输数据的设备是最好的。
还有 [Grott项目](https://github.com/johanmeijer/grott) 从通信中拦截数据。然而，这里也会发生较旧的数据集被传输或传输被暂停，因为这只是监听并临时存储数据。

---

### IoBroker 的 growatt 适配器
ioBroker Growatt Adapter 与 Growatt Shine Server 通信。
我没有隶属关系。
通常，数据每 5 分钟从数据记录器发送到云端。
你可以改变它，见下文。

并非所有工厂类型都已实施。

目前只能读取数据，不能写入参数或更改参数。

---

## 适配器管理页面
### 主要设置
#### 用户和密码
请输入您在 Shine 应用程序或门户网站中也使用的名称和密码。

#### 使用共享密钥登录
在 Growatt 网站的能源、工厂管理、操作工具下，您可以通过电子邮件向自己发送密钥。

#### 读取植物数据
该数据记录包含存储的主数据

#### 读取上次历史数据
从数据记录器的历史记录中读取最后一条数据记录。
此功能支持数据记录器的分钟间隔。

#### 读取状态数据
这些数据并非适用于所有工厂（不是 INV/MAX/TLX）。此数据集包含实时数据。
此功能支持数据记录器的分钟间隔。

#### 读取总数据
该数据记录包含聚合数据。

#### 读取设备数据
该数据记录包含来自设备的一些数据。一些数据也可用于其他类别。

#### 读取天气
该数据集包含天气预报。

####写入逆变器设置
如果激活此功能，则可以为某些逆变器编辑某些设置。

在逆变器序列号元素下方创建对象以进行设置。为每个设置创建一个通道。

对象下方是“读”、“写”、“消息”和节点值。值下方是参数。

如果可以读取参数的值，则用 ACK=true 写入它们。使用 ack 成功读取时，“read”设置为 true。如果读取失败，则“Read”设置为 false ack=true。在没有 ACK 的情况下从“true”写入“Read”会触发读取操作。如果建立了与云的新连接，也会读取设置。

要写入设置，必须首先设置参数。然后将“write”设置为 true，ack=false。
如果数据写入成功，“write”设置为“true”ack=true，如果逆变器报错，“write”设置为“false”ack=true。另外，逆变器的返回信息写入“msg”状态。

如果写入成功，则自动触发读取。

逆变器一次只能更改一个设置，传输路径是从 ioBroker 通过云到 WLAN 适配器，然后再到逆变器。这些设置通过队列一个接一个地处理。会话时间太短会导致问题。

设置的编写是据我们所知开发的。但是，不提供任何保证

#### 超时秒数
HTTP 请求的默认超时。默认值 60 秒，与 Web 浏览器一样

#### 进程超时秒数
此超时监控从 Growatt 服务器收集数据。如果服务器没有在这段时间内处理完所有的数据，就会报错，会话结束，并启动一个新的循环定时器。默认值为 600 秒。
如果值为 0，则不执行此检查功能。

#### 保持网络会话
适配器仅登录一次，而不是从 Growatt 服务器发出的每个数据请求。默认情况下它是打开的。

#### 会话时间（分钟）
在这里您可以设置适配器何时退出服务器并再次登录。 0 表示永不注销。默认值为 0=无穷大。

#### 以秒为单位的循环时间
从服务器请求数据的时间间隔。数据查询所需的时间再从下一次中扣除。如果查询持续时间比等待时间长，则适配器只休眠 100 毫秒。默认值为 30 秒。

#### 以秒为单位的错误循环时间
如果在 Growatt 服务器上查询值时出现错误，则使用此时间而不是循环时间。默认值为 120 秒

#### 古瑞瓦特服务器
可以在此处输入另一个 URL，例如使用美国域。但它必须以“https://”开头。默认为空白，因此使用 https://server.growatt.com。

### 管理对象
您可以在此处定义逆变器拾取的每个值（对象）应该发生什么。
有很多值不属于你的逆变器。这些可以在这里删除。
因为保存时没有可以重新加载对象列表的事件。按下保存时必须使用更新按钮。

＃＃＃＃ 普通的
对象保留，值更新。

＃＃＃＃ 删除
对象被删除，变频器加载的值被丢弃。
更新后只显示ID和action，因为对象不存在了。如果选择正常，保存后会重新创建对象。

#### 没有更新
对象仍然存在，来自逆变器的值被丢弃。

### 管理记录器
该实例必须正在运行并登录到服务器。然后可以通过此选项卡中的刷新按钮调用数据记录器的设置。
不会自动请求数据，只能通过按钮进行请求。
无法更改为数据记录器显示的字段。它仅与检索到的数据有关。
为每个记录器显示按钮。可以使用 按钮编辑设置。
_使用 GROTT 时，必须启用更改 INI 中的设置。_如果出现您未预料到的值，请不要使用这些设置。
注意这是基于重新生成的。我对设备损坏概不负责。

#### 按键间隔
从数据记录器中读取以分钟为单位的当前间隔，并出现一个可以调整值的输入表格。
如果获得成功响应，则应重新启动数据记录器以激活设置。

####按钮服务器ip
记录仪上数据传输的服务器可以在这里设置。使用 Grott 或 US 时，可在此处指定本地或美国 IP。
如果获得成功响应，则应重新启动数据记录器以激活设置。

#### 按钮服务器端口
可在此处设置服务器上用于记录仪数据传输的端口。
如果获得成功响应，则应重新启动数据记录器以激活设置。

#### 按钮检查固件
系统会询问数据记录器的固件是否是最新的。
更新必须在 growatt 页面上完成。

####按钮重启数据记录器
每个靴子都很好。
接受设置。

---

## 加速数据间隔内部方法
查看管理记录器和按钮间隔

## 加速数据间隔外部应用方法
- 打开 ShinePhone 应用程序
- 点击下面的附件
- 右上角+，然后列出数据记录器
- 点击现有的数据记录器
- 配置数据记录器
- 无线热点模式
- 将摇杆置于 AP 模式
- 连接到 Wifi 热点，PW 123456789？ <- 再次检查
- 继续
- 先进的
- 时间设定
- 间隔为 1
- 输入密码 growattYYYYMMDD（例如 growatt20220209）
- 开锁
- 单击并应用更改
- 退出热点模式

## 加速数据间隔外部旧方法
在热点模式下，只能更改旧固件的间隔。
Growatt 已从固件中删除该网站。
因此，描述也被删除了。

** growatt 方面的图表没有变化。在那里您只能看到来自数据记录器的数据发生变化。**

-\*-

## Changelog

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

- (PLCHome) Apple devices cannot open the adapter's config page with Safari, all values ​​are empty

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

Copyright (c) 2020 - 2022 PLCHome

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