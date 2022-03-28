---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.growatt/README.md
title: 无题
hash: Xm0ukBwRTblVBkkTxd9cRmekT+7ujB9B440MI2hbt88=
---
![商标](../../../en/adapterref/iobroker.growatt/admin/glogo.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.growatt.svg)
![下载](https://img.shields.io/npm/dm/iobroker.growatt.svg)
![安装数量（最新）](http://iobroker.live/badges/growatt-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/growatt-stable.svg)
![依赖状态](https://img.shields.io/david/PLCHome/ioBroker.growatt.svg)
![新PM](https://nodei.co/npm/iobroker.growatt.png?downloads=true)

## IoBroker.growatt
### IoBroker 的 growatt 适配器
ioBroker Growatt 适配器与 Growatt Shine 服务器通信。
我不隶属。
通常，数据每 5 分钟从数据记录器发送到云端。
您可以更改它，请参见下文。

并非所有植物类型都已实施。

目前只能读取数据，无法写入参数或更改参数。

---

## 适配器管理页面
### 主要设置
#### 用户和密码
请输入您也在 Shine 应用程序或门户网站中使用的名称和密码。

#### 使用共享密钥登录
在 Growatt 网站的能源、工厂管理、操作工具下，您可以通过电子邮件向自己发送密钥。

#### 读取植物数据
该数据记录包含存储的主数据

#### 读取最后的历史数据
从数据记录器的历史中读取最后一条数据记录。
此功能支持数据记录器的分钟间隔。

#### 读取状态数据
这些数据不适用于所有工厂（不是 INV/MAX/TLX）。该数据集包含实时数据。
此功能支持数据记录器的分钟间隔。

#### 读取总数据
该数据记录包含聚合数据。

#### 读取设备数据
该数据记录包含来自设备的一些数据。一些数据也可用于其他类别。

#### 阅读天气
该数据集包含天气预报。

#### 超时秒数
HTTP 请求的默认超时。默认值 60 秒，与 Web 浏览器一样

#### 进程超时（以秒为单位）
此超时监视从 Growatt 服务器收集的数据。如果服务器在这段时间内没有处理完所有数据，则会报告错误，会话结束并启动新的循环计时器。默认值为 600 秒。
如果值为 0，则不执行此检查功能。

#### 保持网络会话
适配器只登录一次，而不是每次来自 Growatt 服务器的数据请求都登录。默认情况下它是打开的。

#### 会话时间（以分钟为单位）
您可以在此处设置适配器何时退出服务器并再次登录。 0 表示从不注销。默认值为 0=无穷大。

#### 循环时间以秒为单位
从服务器请求数据的时间间隔。然后从下一次中扣除数据查询所需的时间。如果查询持续时间长于等待时间，则适配器仅休眠 100 毫秒。默认值为 30 秒。

#### 错误循环时间以秒为单位
如果在 Growatt 服务器上查询值时发生错误，则使用此时间而不是循环时间。默认值为 120 秒

### 管理对象
在这里，您可以定义逆变器获取的每个值（对象）应该发生什么。
有很多值不属于你的逆变器。这些可以在这里删除。
因为在保存时没有可以重新加载对象列表的事件。按下保存时必须使用更新按钮。

＃＃＃＃ 普通的
对象保留，值被更新。

＃＃＃＃ 删除
对象被删除，逆变器加载的值被丢弃。
更新后，由于对象不再存在，仅显示 ID 和操作。如果正常选择，保存后会再次创建对象。

####没有更新
对象保留，来自逆变器的值被丢弃。

---

##加速数据间隔新方法
- 打开 ShinePhone 应用程序
- 点击下面的附件
- 右上角 +，然后列出数据记录器
- 点击现有的数据记录器
- 配置数据记录器
- 无线热点模式
- 将摇杆置于 AP 模式
- 连接到 Wifi 热点，密码 123456789 ？ <-再次检查
- 继续
- 先进的
- 时间设定
- 间隔为 1
- 输入密码growattYYYYMMDD（例如growatt20220209）
- 开锁
- 单击并应用更改
- 退出热点模式

---

##加速数据间隔旧方法
### 您可以将记录器间隔设置为 5 分钟到 1 分钟
从 ShineWiFi-S 上取下 KEY 按钮的橡胶塞，短按里面的按钮。蓝色 LED 将亮起。使用手机或电脑连接 ShineWiFi-S 模块发出的无线网络。网络名称/SSID 是 ShineWiFi-S 模块的序列号。

### 登录页面
连接成功后，打开手机或电脑的浏览器，在地址栏输入192.168.10.100。用户名为 admin，默认密码为 12345678。
![登录页面](../../../en/adapterref/iobroker.growatt/docs/login.png)

＃＃＃ 高级设置
将数据间隔时间更改为 1 分钟![高级设置](../../../en/adapterref/iobroker.growatt/docs/advancedsettings.png)

### 系统重启
在此页面重新启动您的 ShineWiFi-S 模块，单击“立即重启”以启用您刚刚所做的新设置并从您的 ShineWiFi 模块的内部网络服务器注销。
![系统重启](../../../en/adapterref/iobroker.growatt/docs/restart.png)

**成长方的图表没有变化。在那里，您只能看到数据记录器中数据的变化。**

-\*-

## Changelog

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