---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lcn/README.md
title: ioBroker.lcn
hash: jMVi52CECq36Yl2DLEvygCIee5DG3bFQG2W12qnTdXU=
---
![标识](../../../en/adapterref/iobroker.lcn/admin/lcn.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.lcn.svg)
![下载](https://img.shields.io/npm/dm/iobroker.lcn.svg)
![国家公共管理](https://nodei.co/npm/iobroker.lcn.png?downloads=true)

# IoBroker.lcn
该适配器允许将本地控制网络[LCN](https://www.lcn.eu/)连接到ioBroker。

## 支持的网关
- LCN-PKE

![皮克](../../../en/adapterref/iobroker.lcn/img/lcn-pke.png)

- LCN-PKU 与 LCN-PCHK

![皮克](../../../en/adapterref/iobroker.lcn/img/lcn-pku.png)

**不要忘记 ioBroker.lcn 将阻止一个 LCN 连接许可证。**

配置和模块将通过扫描自动检测，必须从配置对话框手动触发，并且可以随时重复。

## 类型
支持以下读写组：

- 模拟值（输出/输入）
- 继电器（输出）
- 传感器（输入）
- LED（输出/输入）
- 变量（输入）

## 变量
要将有效的转换函数应用于变量，变量必须具有有效的角色。支持以下角色：

- **值.温度** - 摄氏度温度
- **值.亮度** - 勒克斯（I-输入），以勒克斯为单位
- **value.speed.wind** - 风速（米/秒）
- **值.电压** - 电压（以伏特为单位）
- **值.电流** - 以安培为单位的电流
- **value.sun.azimuth** - 太阳方位角
- **value.sun.elevation** - 太阳高度角

＃＃ 展示
对于每个设备，无论是否有显示屏，您都可以激活。

## 调节器（Regler）
对于每个设备，无论是否有调节器，您都可以激活。

＃＃ 设置
- 重新连接间隔（秒）- 适配器尝试连接的频率。默认每 30 秒一次。
- 连接超时（毫秒）- 适配器等待连接响应（包括身份验证）的时间。默认 6 秒。
- 扫描响应超时（毫秒）- 适配器通过扫描模块等待答案的时间。
- 响应超时(ms) - 控制命令超时
- Ping 间隔（秒）- 适配器发送 ping 请求的频率
- Ping 响应超时（毫秒） - ping 请求超时
- 输入/输出继电器是相同的 - 如果“输出”和“输入”继电器是相同的或者这些继电器是不同的。

```
// =====================  Same relays =============================
//                                    +-------+
// ----------------- OUT -----------> |       |
//                                    | Relay |
// <----------------- IN ------------ |       |
//                                    +-------+
//
//
// ======================  Different relays =======================
//                                    +-------+
//                                    |       |
// ----------------- OUT -----------> | Relay |
//                                    |       |
//                                    +-------+
//
//                                    +--------+
//                                    | Sensor |
// <----------------- IN ------------ |   or   |
//                                    | Relay  |
//                                    +--------+
```

＃＃ 如何使用
首次启动后，必须扫描设备。可以在配置对话框中使用扫描按钮完成

![扫描](../../../en/adapterref/iobroker.lcn/img/scanButton.png)

＃＃ 去做
- 用于定义变量类型的配置对话框。

<!-- 下一个版本的占位符（在行的开头）：

### **正在进行中** -->

## Changelog
### 1.1.7 (2023-11-06)
* (bluefox) Corrected setting of undefined values

### 1.1.1 (2022-10-19)
* (bluefox) Corrected license check

### 1.1.0 (2022-10-18)
* (bluefox) Corrected issue with password

### 1.0.4 (2021-05-21)
* (bluefox) Ack will be ignored for the display commands

### 1.0.3 (2021-05-21)
* (bluefox) Changed the calculation of the temperature variables

### 1.0.2 (2020-10-11)
* (bluefox) Implemented the regulators and the display support.

### 0.6.3 (2019-12-18)
* (bluefox) General relays mode implemented

### 0.6.2 (2019-12-07)
* (bluefox) Detected delayed responses
* (bluefox) Dynamical creation of states is implemented

### 0.5.5 (2019-12-05)
* (bluefox) Relay inputs were corrected

### 0.5.4 (2019-12-04)
* (bluefox) Connection indication was corrected

### 0.5.1 (2019-11-29)
* (bluefox) Finger scanner supported
* (bluefox) Added possibility to set the analog mode
* (bluefox) Relay outputs are supported now

### 0.4.4 (2019-11-26)
* (bluefox) Fixed error by parsing of acknowledgement

### 0.4.2 (2019-06-12)
* (bluefox) Support of old measure values was added

### 0.3.2 (2018-11-19)
* (bluefox) add variables support

### 0.2.1
* (bluefox) initial release

## License
CC-BY-NC-4.0

Copyright (c) 2018-2023 Bluefox <dogafox@gmail.com>

Up to 10 devices can be connected for free. If you need more devices, you must buy a commercial license.