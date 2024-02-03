---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.rct/README.md
title: ioBroker.rct
hash: Da5KGLtGkmrohfo6HCdjRifK6JBlys94A/6Du2kWsiA=
---
![NPM版本](https://img.shields.io/npm/v/iobroker.rct.svg)
![下载](https://img.shields.io/npm/dm/iobroker.rct.svg)
![安装数量（最新）](https://iobroker.live/badges/rct-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/rct-stable.svg)
![GitHub 存储库的 Libraries.io 依赖关系状态](https://img.shields.io/librariesio/github/aruttkamp/ioBroker.rct)
![国家公共管理](https://nodei.co/npm/iobroker.rct.png?downloads=true)

[![徽标](admin/rct.png)](https://www.rct-power.com/de)

# IoBroker.rct
**测试：** ![测试与发布](https://github.com/aruttkamp/ioBroker.rct/workflows/Test%20and%20Release/badge.svg)

## 所有者变更
劳夫切换到家庭助理后 - 项目将由 aruttkamp 继续

## IoBroker 的 RCT 适配器
请注意，这是一个私人项目，我 (Andreas Ruttkamp) 与 RCT 没有任何关系。

读取 RCT Power 光伏电源转换器的值。

＃＃ 评论
### 高效发布
这个富有成效的版本已被证明是稳定的。

通过使用“RCT元素”字段，可以选择应从功率转换器读取哪些数据。
如果此处未输入任何内容，将使用默认值：

"电池.bat_status,电池.soc,电池.soc_target,电池.soc_target_high,电池.soc_target_low,dc_conv.dc_conv_struct[0].p_dc_lp,dc_conv.dc_conv_struct[1].p_dc_lp,故障[0].flt,故障[1] .flt,故障[2].flt,故障[3].flt,g_sync.p_ac_grid_sum_lp,g_sync.p_ac_load_sum_lp,g_sync.p_ac_sum_lp,g_sync.p_acc_lp,g_sync.u_sg_avg[0],g_sync.u_sg_avg[1],io_board.s0_external_power ,power_mng.is_heiphoss,power_mng.state,power_mng.use_grid_power_enable,power_mng.u_acc_mix_lp,prim_sm.island_flag,prim_sm.state"

其他元素可以在代码（文件“rct/rc_core2.js”）中找到。由于这不是自我描述，因此使用风险自负！

对象“battery.bat_status”指示已连接电池的状态：

* 0 -> 充电/放电（正常操作）
* 8 -> 充电（校准）
* 1024 -> 放电（校准）
* 2048 -> 平衡

＃＃ 已知的问题
### 错误的频道/状态
新版本可能无法创建正确的 ioBroker 通道/状态。在大多数情况下，这可以通过显示为单个元素而不是文件夹的节点“电池”来识别。

如果发生这种情况，请停止适配器并手动删除节点“rct.0”。

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.2.2 (2023-09-13)
* (Andreas Ruttkamp) data type for power_mng.bat_next_calib_date corrected
* (Andreas Ruttkamp) data type for battery.stack_cycles[x] corrected

### 1.2.1 (2023-09-13)
* (Andreas Ruttkamp) configured rct elements will now correctly used. ( in 1.2.0 only power_mng.bat_next_calib_date was read)

### 1.2.0 (2023-09-11)
* (Andreas Ruttkamp) Connection state on Stop from Adapter corrected
* (Andreas Ruttkamp) dependancies updated

### 1.1.7 (2023-08-30)
* (Andreas Ruttkamp) Connection state corrected

### 1.1.6 (2023-08-23)
* (Andreas Ruttkamp) rct_core.js deleted (now rct_core2 is used)
* (Andreas Ruttkamp) parameters in default setting deleted 
* (Andreas Ruttkamp) min. Node 18

### 1.1.5 (2023-08-18)
* (Andreas Ruttkamp) Fix: crash reading UInt8 corrected
* (Andreas Ruttkamp) some cleaning actions

### 1.1.4 (2023-08-18)
* (Andreas Ruttkamp) Fix: proofments corrected.

### 1.1.3 (2023-08-18)
* (Andreas Ruttkamp) Fix: more data checks implemented

### 1.1.2 (2023-08-17)
* (Andreas Ruttkamp) Fix: adapter crashes

### 1.1.1 (2023-08-17)
* (Andreas Ruttkamp) data for g_sync.p_ac_load[0-2] / dc_conv.dc_conv_struct[0-1].u_sg_lp added
* (Andreas Ruttkamp) more parameters added 
* (Andreas Ruttkamp) date conversions fixed
* (Andreas Ruttkamp) conversions of percentages fixed
* (Andreas Ruttkamp) instance crash if data failure fixed

### 1.0.5 (2023-07-29)
* (Andreas Ruttkamp) some internal work
* (Andreas Ruttkamp) preparation for new admin
* (Andreas Ruttkamp) dependecies update

### 1.0.4 (2023-04-24)
* (Andreas Ruttkamp) Release Script added and update dev-components
* (Andreas Ruttkamp) Preparation of new backend

### 1.0.3 (2023-03-30)
* (Andreas Ruttkamp) Release Script added and update dev-components

### 1.0.1
* (Markus Lauff) fixing review comments - thanks to Apollon77

### 1.0.0
* (Markus Lauff) 0.0.6 version proved stable and fulfilling minimal functional requirements, so releasing it as version 1.0.0 for productive usage

### 0.0.6
* (Markus Lauff) adding further channels/states, major stability improvements

### 0.0.5
* (Markus Lauff) some fixes / minor improvements

### 0.0.1
* (Markus Lauff) initially bare minimum working release

## License
MIT License

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

Copyright (c) 2023 Andreas Ruttkamp <ioBroker.rct@ruttkamp.com>