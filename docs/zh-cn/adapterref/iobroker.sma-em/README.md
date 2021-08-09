---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sma-em/README.md
title: ioBroker.sma-em
hash: sHkyL4gjIdsp0it4l9mTtPAqsVo9KKLkpK19bf/DJ+Y=
---
![商标](../../../en/adapterref/iobroker.sma-em/admin/sma-em.png)

![安装数量](http://iobroker.live/badges/sma-em-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.sma-em.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sma-em.svg)
![测试](https://travis-ci.org/CTJaeger/ioBroker.sma-em.svg?branch=master)
![新产品管理](https://nodei.co/npm/iobroker.sma-em.png?downloads=true)

# IoBroker.sma-em
### 信息
该适配器从 SMA Energy Meter (EMETER-20) 和 Sunny Home Manager 2 (HM-20) 读取信息。
它支持 SMA-EMETER-protocol-2。因此，其他制造商的兼容电能表也可以使用。

SMA Energy Meter 和 Sunny Home Manager 2 每秒向网络发送带有能量测量数据的多播数据报。
SMA Energy Meter Adapter 接收这些多播消息并将它们存储为 iobroker 状态。
SMA Energy Meter Adapter 的单个实例可检测所有连接网络中的所有 SMA Energy Meter 和 Sunny Home Manager。

![状态](../../../en/adapterref/iobroker.sma-em/docs/en/img/overview.png)

### 处于非扩展模式的状态
- 总有功功率消耗（pregard）和有功功率馈入（psurplus）的瞬时值
- 总有功功耗（pregardcounter）和有功功率馈入（psurpluscounter）的电能表值
- SMA Time Tick 计数器，收到的最后一条消息的时间戳，
- 序列号、SUSyID、SMA Energy Meter 和 Sunny Home Manager 的软件版本
- 每个相位 L1 / L2 / L3 的详细值（可选）：
  - 每相有功功率消耗（pregard）和有功功率馈入（psurplus）的瞬时值
  - 每相有功功率消耗 (pregardcounter) 和有功功率馈入 (psurpluscounter) 的电能表值

###处于扩展模式的状态
除了非扩展模式下的状态外，以下值在扩展模式下可用

- 总无功消耗（qregard）和无功馈入（qsurplus）的瞬时值
- 总无功功率消耗（qregardcounter）和无功功率馈入（qsurpluscounter）的电能表值
- 总视在功率消耗（sregard）和视在功率馈入（ssurplus）的瞬时值
- 总视在功耗 (sregardcounter) 和视在功率馈入 (ssurpluscounter) 的电能表值
- cosphi（功率因数）
- 电网频率（仅适用于 Sunny Home Manager 2，SMA Energy Meter 目前不提供任何电网频率值）
- 每个阶段 L1 / L2 / L3 的详细信息（可选）：
  - 每相无功和视在功耗/馈入的瞬时值
  - 每相无功和视在功耗/馈入的电能表值
  - 每相电压和电流

### 配置选项
![设置](../../../en/adapterref/iobroker.sma-em/docs/en/img/adminpage.png)

- 多播 IP：默认设置为 239.12.255.254。
- 多播端口：UDP 端口的默认设置为 9522。

  （两者都不应更改，因为 SMA 设备始终使用此 IP 地址和端口）

- 详细信息 L1 - L3：这些选择选项可用于显示每个阶段的详细信息。
- 扩展模式：提供更详细的信息，如无功功率、视在功率、cosphi、电网频率、电压、安培数

  （不要同时配置详细信息 L1-L3 和扩展模式，因为这会给 ioBroker 系统带来高负载）

<!-- 下一版本的占位符（在行首）：

### __工作进行中__ -->
＃＃ 法律声明
SMA 和 Sunny Home Manager 是 SMA Solar Technology AG <https://www.sma.de/en.html> 的注册商标

所有其他商标均为其各自所有者的财产。

作者在任何情况下均不受 SMA Solar Technology AG 或其任何关联子公司、徽标或商标的认可或附属。

## Changelog
### 0.6.4 (2021-04-14)
* (TGuybrush) Bug fixes
  * Prevent warnings regarding non-existent objects upon adapter instance creation and start-up under js-controller 3.2.x
  * Improved check of SMA Energy Meter multicast messages to prevent ghost devices and warnings regarding unknown OBIS values.

### 0.6.3 (2021-03-04)
* (TGuybrush) The adapter binds now to all external IPv4 addresses.

### 0.6.1-beta.0 (2021-01-18)
* (TGuybrush) Bug fixes
  * Software Version string, last part is the revision as character (e.g. R = release)
  * Potential Warning during the first start
  * Revised units to follow the SI standardization (DIN 1301)
* (TGuybrush) Top level hierarchy object description indicates if the device is a SMA Energy Meter or a SMA Home Manager 2.
* (DutchmanNL) Released to the latest repo, fixed some typo's + news and translations

### 0.6.0
* (TGuybrush) Fixed wrong status information 
  * Complete adapter core rewritten to extract the status values by their OBIS value instead of the absolute position in the received UDP message according to the SMA documentation.
  *  Improved compatibility to future new OBIS values
* (TGuybrush) Add additional status information
  * Power grid frequency
  * Time tick counter
  * SMA SUSy ID
  * Software Version
* Add a timestamp for each received status information

### 0.5.7
* (DutchmanNL) Solved incorrect stated ID type for JS-controller 3.x

### 0.5.4
* (Andiling) Adapter compatibility extended for Node 10 and higher

### 0.5.3
* (Marcolotti) Fix units 

### 0.5.2
* (Marcolotti) support of more than one energy meter 

### 0.5.1
* (Marcolotti) Add Option for extended Mode
* (Marcolotti) Remove Option for Poll
* (Marcolotti) several fixes

### 0.5.0
* (Bluefox) Optimize Performance

### 0.0.2
* (Marcolotti) Add options for detailed View of L1, L2, L3
* (Marcolotti) Bugfixes
* (Bluefox) Optimize Performance
* (Apollon77) Clean Template

### 0.0.1
* (Marcolotti) initial release

## License
The MIT License (MIT)

Copyright (c) 2021 IoBroker-Community

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.