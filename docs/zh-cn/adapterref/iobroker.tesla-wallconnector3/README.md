---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.tesla-wallconnector3.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.tesla-wallconnector3.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/tesla-wallconnector3-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/tesla-wallconnector3-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/nobl/ioBroker.tesla-wallconnector3/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.tesla-wallconnector3.png?downloads=true
BADGE-WERO: https://img.shields.io/badge/WERO-8A2BE2
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-00457C?logo=paypal&logoColor=white
BADGE-Buy Me a Coffee: https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?logo=buymeacoffee&logoColor=black
BADGE-GitHub Sponsor: https://img.shields.io/badge/Sponsor-GitHub-181717?logo=github&logoColor=white
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tesla-wallconnector3/README.md
title: ioBroker.tesla-wallconnector3
hash: Oex34n+ZD7iWrgCVbrI62rYt+wSRyTp+RsUzXYqUQm4=
---
![标识](../../../de/adapterref/iobroker.tesla-wallconnector3/admin/tesla-wallconnector3.png)

# IoBroker.tesla-wallconnector3
## 适用于 ioBroker 的特斯拉第三代壁挂式充电器适配器
专为特斯拉第三代壁挂式充电器设计。

提供对 API 数据的只读访问权限（API 不支持写入操作）。

＃＃ 配置
### “主要设置”窗口
![主要设置](../../../de/adapterref/iobroker.tesla-wallconnector3/media/mainSettings.png "主要设置")

| 字段 | 描述 |
|:-------------|:-------------|
|特斯拉第三代壁挂式充电桩|在此处输入所需特斯拉第三代壁挂式充电桩的IP地址。如果网络中存在可用的DNS服务器，也可以指定完全限定域名（FQDN）。|
|查询间隔| 在此处输入从特斯拉第三代壁挂式充电器检索值的时间间隔（毫秒）。（默认值：10 秒） |
|请求超时|此设置指定特斯拉第三代壁挂式充电器必须在请求响应后的最大毫秒数，超过此值请求将被中止。（默认值：5000） |
|重试次数| 此设置指定在发生错误时查询特斯拉第三代壁挂式充电器的次数。此设置不适用于适配器启动时——如果系统无法连接，适配器将终止运行。（默认值：10） |
|轮询重复因子| 此值影响重试间隔。第 n 次重试发生在第 n-1 次重试后经过间隔 *倍数* n 秒。例如：使用默认值时，第一次重试发生在首次重试后 20 秒，第二次重试发生在第一次重试后 40 秒。成功检索数据后，重试计数器将重置。  |

配置完成后，配置对话框将以 `SPEICHERN UND SCHLIEßEN` 退出。

这将导致适配器重启。

＃＃ 实例
安装适配器后，在区域 `Objekte` 中创建了一个特斯拉壁挂式充电器 Gen 3 适配器的活动实例。

单个 ioBroker 服务器可以创建多个 Tesla Wall Connector Gen 3 适配器实例。反之，单个 Tesla Wall Connector Gen 3 也可以由多个 ioBroker 服务器控制。如果要通过一个 ioBroker 服务器控制多个设备，则应为每个系统创建一个单独的实例。<br/><br/>适配器是否已激活并连接到系统由实例状态字段的颜色指示。将鼠标光标悬停在图标上可显示更多详细信息。

## 适配器对象
在 `Objekte` 部分中，适配器通过 API 识别的所有数据点都以树状结构列出。

以下对象按状态分类。

每个数据点都列出了其关联的数据类型和权限。

目前，权限仅支持只读 (R)。每个数据点至少都具有读取 (R) 权限。

要查找特定数据点，我们建议使用快捷键“Ctrl + F”。

根据系统的不同，某些状态可能不存在，或者可能存在未记录的状态。

如果某个状态没有相关文档，但有人知道该状态的含义，请提交拉取请求（或创建包含相关信息的工单）。

### 已知状态
#### 频道：信息
* 信息连接

|数据类型|授权|
    |:---:|:---:|
|布尔值|R|

*只读布尔值，当适配器连接到特斯拉第三代壁挂式充电器时为真。

#### 频道：lifetime
* 警报计数

|数据类型|授权|
    |:---:|:---:|
|数字|R|

*只读数字，表示警报数量。

* 平均启动温度

|数据类型|授权|
    |:---:|:---:|
|数字|R|

*只读数值，表示平均起始温度。

* 充电开始

|数据类型|授权|
    |:---:|:---:|
|数字|R|

*只读字符串，表示充电启动次数。*

* 充电时间

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*只读数字，表示WC3的加载时间（以秒为单位）*

* 连接器循环

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*只读数字，表示连接器循环次数（插拔操作通常都计为 1 次）。*

* 接触器循环

|数据类型|授权|
    |:---:|:---:|
|数字|R|

*只读数字，表示继电器先前状态变化的次数。*

* 接触器循环加载

|数据类型|授权|
    |:---:|:---:|
|数字|R|

*只读数字，表示充电循环次数。*

* energy_wh

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*只读数字，表示输送的能量，单位为瓦时 (Wh)。*

* 热折叠

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*只读数字，表示因温度原因导致的复位次数。*

* 正常运行时间

|数据类型|授权|
    |:---:|:---:|
|数字|R|

*只读数字，表示WC3的运行时间（以秒为单位）*

#### 频道：版本
* 固件版本

|数据类型|授权|
    |:---:|:---:|
|字符串|R|

*特斯拉第三代壁挂式充电器固件版本*

* 零件编号

|数据类型|权限|
    |:---:|:---:|
|字符串|R|

*特斯拉第三代壁挂式充电器的零件编号*

* 序列号

|数据类型|权限|
    |:---:|:---:|
|字符串|R|

*特斯拉第三代壁挂式充电器序列号*

#### 频道：生命体征
* 当前警报

|数据类型|授权|
    |:---:|:---:|
|字符串|R|

*包含警报详细信息的只读字符串。*

* 联系人已关闭

|数据类型|授权|
    |:---:|:---:|
|布尔值|R|

*只读布尔值，指示继电器是否闭合。*

* 网格频率

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*只读数字，表示网络频率。*

* 配置状态

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*只读数字，指示配置状态。请提供详细信息！*

* current[A,B,C,N]_a

|数据类型|授权|
    |:---:|:---:|
|数字|R|

*只读数值，表示线路 [A,B,C,N] 中的电流，单位为安培。*

* evse_state

|数据类型|授权|
    |:---:|:---:|
|数字|R|

*只读数字，代表电动汽车充电桩 (EVSE) 的状态。目前我们已知：0=启动中，1=空闲，2=已连接但未就绪，3=???，4=已连接并就绪，5=???，6=车辆已连接并正在握手，7=???，8=充电完成/中断，9=准备充电但等待车辆，10=降低充电功率（少于 3 相，每相 16 安培），11=完全充电（3 相，每相 16 安培），12=???

* grid_v

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*只读数值，表示网络电压。*

* handle_temp_c

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*只读数值，表示手柄温度（单位：摄氏度）。*

* 输入热电堆_UV

|数据类型|授权|
    |:---:|:---:|
|数字|R|

*只读数值，表示温度。*

* mcu_temp_c

|数据类型|授权|
    |:---:|:---:|
|数字|R|

*只读数值，表示主控单元的温度，单位为摄氏度。*

* pcba_temp_c

|数据类型|授权|
    |:---:|:---:|
|数字|R|

*只读数值，表示电路板的温度，单位为摄氏度。*

* pilot_high_v

|数据类型|授权|
    |:---:|:---:|
|数字|R|

*只读数值，表示导通线路的高压。*

* pilot_low_v

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*只读数值，表示导通线路电压过低。*

* prox_v

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*只读数值，表示低电压。*

* relay_coil_v

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*只读数值，表示继电器线圈的电压。*

* session_s

|数据类型|授权|
    |:---:|:---:|
|数字|R|

*只读数字，表示当前加载会话的持续时间（以秒为单位）。*

* session_energy_wh

|数据类型|授权|
    |:---:|:---:|
|数字|R|

*只读数值，表示当前会话提供的能量，单位为瓦时 (Wh)。*

* 正常运行时间

|数据类型|授权|
    |:---:|:---:|
|数字|R|

*只读数值，表示WC3的运行时间，单位为秒。*

* 车辆已连接

|数据类型|权限|
    |:---:|:---:|
|布尔值|R|

*只读布尔值，指示车辆是否已连接。*

* vehicle_current_a

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*只读数值，表示车辆电流（单位：安培）。*

* Voltage[A,B,C]_v

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*只读数值，表示线路[A、B、C]的电压。*

#### 频道：wifi_status
* 互联网

|数据类型|授权|
    |:---:|:---:|
|布尔值|R|

*仅显示可读的布尔值，指示特斯拉第三代壁挂式充电器是否已连接到互联网。*

* wifi已连接

|数据类型|授权|
    |:---:|:---:|
|布尔值|R|

*可读布尔值，指示特斯拉第三代壁挂式充电器是否已连接到 Wi-Fi。*

* wifi_infra_ip

|数据类型|授权|
    |:---:|:---:|
|字符串|R|

*只读字符串，表示特斯拉第三代壁挂式充电器的 IP 地址。*

* wifi_mac

|数据类型|权限|
    |:---:|:---:|
|字符串|R|

*只读字符串，表示特斯拉第三代壁挂式充电器的 MAC 地址。*

* wifi_rssi

|数据类型|权限|
    |:---:|:---:|
|数字|R|

*只读数值，表示特斯拉第三代壁挂式充电器所连接的Wi-Fi网络的RSSI值。*

* wifi信号强度

|数据类型|授权|
    |:---:|:---:|
|数字|R|

*只读数值，表示特斯拉第三代壁挂式充电器所连接的Wi-Fi网络的信号强度。*

* wifi_snr

|数据类型|授权|
    |:---:|:---:|
|数字|R|

*只读数字，表示特斯拉第三代壁挂式充电器所连接的 Wi-Fi 网络号码。*

* wifi_ssid

|数据类型|授权|
    |:---:|:---:|
|字符串|R|

*特斯拉第三代壁挂式充电器所连接的SSID。*

## Changelog
### 1.1.0 (2026-03-30)
- (iobroker-bot) Adapter requires node.js >= 20 now.
- Added state attributes (and moved notifications to debug from info)
- Code optimization
- Migration to i18n

### 1.0.6 (NoBl)
* Maintenance update (dependencies, ...)

## License
MIT License

Copyright (c) 2024-2026 Norbert Bluemle <github@bluemle.org>

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