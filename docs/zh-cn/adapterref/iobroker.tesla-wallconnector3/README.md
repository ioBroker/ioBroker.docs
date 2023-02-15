---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.tesla-wallconnector3.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.tesla-wallconnector3.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/tesla-wallconnector3-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/tesla-wallconnector3-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/nobl/ioBroker.tesla-wallconnector3/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.tesla-wallconnector3.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tesla-wallconnector3/README.md
title: ioBroker.tesla-wallconnector3
hash: iKtO46Js4Xpf2TthwiqmqYLee95Mb2biEhaBNTJMW3E=
---
![标识](../../../de/adapterref/iobroker.tesla-wallconnector3/admin/tesla-wallconnector3.png)

# IoBroker.tesla-wallconnector3
## 用于 ioBroker 的 Tesla Wall Connector Gen 3 适配器
针对 Tesla Wall Connector Gen 3。
提供对 API 数据的只读访问（API 不支持写入）。

＃＃＃ 安装
适配器实例从 ioBroker 管理界面安装。
完成适配器实例的安装后，会自动打开一个配置窗口。

＃＃ 配置
### 主设置窗口
![主要设置](../../../de/adapterref/iobroker.tesla-wallconnector3/media/mainSettings.png "主要设置")

|领域 |说明 |
|:-------------|:-------------|
|Tesla Wall Connector Gen 3 |在此处输入所需的 Tesla Wall Connector Gen 3 的 IP 地址。如果网络中有可用的 DNS，也可以指定 FQDN。|
|查询间隔|在此处输入从 Tesla Wall Connector Gen 3 检索值的时间间隔（毫秒）。 （默认值：10 秒）|
|Request-Timeout|在此输入毫秒数，超过此请求必须由 Tesla Wall Connector Gen 3 最迟在请求被中止之前作出答复。 （默认值：5000）|
|重试|您可以在此处指定发生错误时应尝试使用 Tesla Wall Connector Gen 3 的频率。这在适配器启动时不适用 - 如果无法访问系统，适配器将停止工作。 （默认值：10）|
|轮询重试因子|此值可用于影响重试之间的间隔。以下情况适用：第 n 次重试尝试发生在间隔 *乘数* n 秒后尝试 n-1 之后。示例：使用默认值时，第一次重试发生在初始尝试后 20 秒，第二次重试发生在第一次尝试后 40 秒。成功的数据检索会重置重试计数器。|

完成配置后，使用 `SPEICHERN UND SCHLIEßEN` 退出配置对话框。
这会导致适配器重新启动。

## 实例
适配器的安装在 `Objekte` 区域中创建了 Tesla Wall Connector Gen 3 适配器的活动实例。

可以在 ioBroker 服务器上创建多个 Tesla Wall Connector Gen 3 Adapter 实例。相反，Tesla Wall Connector Gen 3 也可以与多个 ioBroker 服务器一起运行。如果一个 ioBroker 服务器要控制多个设备，则应为每个系统创建一个实例。<br/><br/>适配器是否已激活并连接到系统由实例状态字段的颜色指示。如果鼠标指针指向该符号，则会显示更多详细信息。

## 适配器的对象
在 `Objekte` 区域中，适配器通过 API 识别的所有数据点都以树形结构列出。

对象分为以下状态。
每个数据点都与其关联的数据类型和权限一起列出。
当前只能读取权限 (R)。每个数据点至少可以被读取（R）。
要搜索特定数据点，我们建议使用组合键“STRG + F”。
根据个别系统，状态可能不存在或可能出现未记录的状态。
如果某个状态没有文档，但有人知道该状态代表什么，我会请求相应的拉取请求（或打开包含相应信息的工单）。

### 已知状态
####频道：信息
* 信息.连接

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，当适配器连接到 Tesla Wall Connector Gen 3 时为真。

####频道：生命周期
* 警报计数

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示警报的数量。

* avg_startup_temp

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示平均起始温度。

* charge_starts

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *指定加载开始次数的只读字符串。*

* charging_time_s

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *以秒为单位指示 WC3 加载时间的只读数字*

* connector_cycles

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *表示连接器循环次数的只读数字（插入和拔出很可能各计为 1）。*

* contactor_cycles

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *表示继电器状态改变次数的只读数字。*

* contactor_cycles_loaded

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *表示充电周期数的只读数字。*

* energy_wh

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字表示以 Wh 为单位提供的能量。*

* thermal_foldbacks

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *表示温度重置次数的只读数字。*

*正常运行时间

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *以秒为单位指示 WC3 正常运行时间的只读数字*

####频道：版本
* 固件版本

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

   *Tesla Wall Connector Gen 3 的固件版本*

* 零件号

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

   *Tesla Wall Connector Gen 3 部件号*

* 序列号

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

   *Tesla Wall Connector Gen 3 序列号*

####频道：生命体征
* current_alerts

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

   *包含警报详细信息的只读字符串。*

* contactor_closed

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *指示继电器是否关闭的只读布尔值。*

* grid_hz

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *表示网络频率的只读数字。*

* 配置状态

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *指示配置状态的只读数字。请帮助详细信息！*

* 当前 [A,B,C,N]_a

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *代表线路 [A、B、C、N] 电流的只读数字，单位为安培。*

* evse_state

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *代表evse状态的只读数字。到目前为止，我们似乎知道：0=正在启动，1=空闲，2=已连接但未就绪，3=？？？，4=已连接并就绪，5=？？？，6=车辆已插入并正在握手，7= ? ??，8=充电完成/暂停，9=准备充电但等待自动充电，10=减少功率充电（少于 3 相，每相 16 安培），11=全功率充电（3 相，每相 16 安培） , 12=??? *

* grid_v

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *表示电网电压的只读数字。*

* handle_temp_c

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字，以 °C 为单位指示手柄温度。*

* input_thermopile_uv

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *代表温度的只读数字。*

* mcu_temp_c

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字，表示主控单元的温度，单位为 °C。*

* pcba_temp_c

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字，以 °C 为单位指示电路板的温度。*

* pilot_high_v

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *指示先导线路高压的只读数字。*

* pilot_low_v

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字指示试验线低电压。*

* prox_v

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *代表低电压的只读数字。*

*继电器线圈_v

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *代表继电器线圈电压的只读数字。*

* session_s

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字，以秒为单位指示当前充电会话的持续时间。*

* session_energy_wh

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字，表示当前会话中提供的能量（以瓦时为单位）*

*正常运行时间

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字，以秒为单位指示 WC3 的正常运行时间。*

* vehicle_connected

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *指示车辆是否已连接的只读布尔值。*

* vehicle_current_a

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *以安培为单位表示车辆电流的只读数字。*

* 电压[A,B,C]_v

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *代表线路 [A,B,C] 电压的只读数字。*

####频道：wifi_status
* 网络

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *只读布尔值，指示 Tesla Wall Connector Gen 3 是否已连接到互联网。*

* wifi_connected

    |数据类型|权限|
    |:---:|:---:|
    |布尔值|R|

   *指示 Tesla Wall Connector Gen 3 是否连接到 WiFi 的只读布尔值。*

* wifi_infra_ip

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

   *代表 Tesla Wall Connector Gen 3 IP 的只读字符串。*

* wifi_mac

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

   *代表 Tesla Wall Connector Gen 3 MAC 地址的只读字符串。*

* wifi_rssi

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字，表示第 3 代 Tesla Wall Connector 连接到的 WiFi 网络的 RSSI。*

* wifi_signal_strength

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字，表示 Tesla Wall Connector Gen 3 所连接的 WiFi 网络的信号强度。*

* wifi_snr

    |数据类型|权限|
    |:---:|:---:|
    |编号|R|

   *只读数字，表示第 3 代 Tesla Wall Connector 连接到的 WiFi 网络的数量。*

* wifi_ssid

    |数据类型|权限|
    |:---:|:---:|
    |字符串|R|

   *Tesla Wall Connector Gen 3 连接到的 SSID。*

## Changelog
### 0.1.1 (NoBl)
* Improvements

### 0.1.0 (NoBl)
* Initial release

## License
MIT License

Copyright (c) 2022 Norbert Bluemle <github@bluemle.org>

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