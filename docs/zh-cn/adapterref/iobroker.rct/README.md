---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.rct/README.md
title: ioBroker.rct
hash: tewK0Rcf3Idn2jnkGgmyQhAlO3WjL4sMO0Gbhb0UNkQ=
---
![NPM 版本](https://img.shields.io/npm/v/iobroker.rct.svg)
![下载](https://img.shields.io/npm/dm/iobroker.rct.svg)
![安装数量（最新）](https://iobroker.live/badges/rct-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/rct-stable.svg)
![GitHub repo 的 Libraries.io 依赖状态](https://img.shields.io/librariesio/release/npm/ioBroker.rct)
![新平台](https://nodei.co/npm/iobroker.rct.png?downloads=true)

[![徽标]（admin/rct.png）](https://www.rct-power.com/de)

# IoBroker.rct
**测试：**![测试与发布](https://github.com/aruttkamp/ioBroker.rct/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 RCT 适配器
请注意，这是一个私人项目，我（Andreas Ruttkamp）与 RCT 没有任何关系。
读取 RCT Power 光伏电源转换器的值。

＃＃ 评论
通过使用“RCT 元素”字段，可以选择从电源转换器读取哪些数据。
如果此处未输入任何内容，则将使用默认值：

“电池.bat_status，电池.soc，电池.soc_target，电池.soc_target_high，电池.soc_target_low，dc_conv.dc_conv_struct[0].p_dc_lp，dc_conv.dc_conv_struct[1].p_dc_lp，故障[0].flt，故障[1].flt，故障[2].flt，故障[3].flt，g_syn c.p_ac_grid_sum_lp,g_sync.p_ac_load_sum_lp,g_sync.p_ac_sum_lp,g_sync.p_acc_lp,g_sync.u_sg_avg[0],g_sync.u_sg_avg[1],io_board.s0_external_power,power_mng.is_heiphoss,power_mng.state,power_mng.u_acc_mix_lp,prim_sm.island_flag"

其他元素可在代码（文件“rct/rc_core2.js”）中找到。由于这不是自我描述的，因此使用时需自行承担风险！

对象“battery.bat_status”指示所连接电池的状态：

* 0 -> 充电/放电（正常操作）
* 1 -> 空闲 (无 CAN 连接逆变器 -> 电池)
* 3 -> 连接（逆变器 -> 电池）
* 5 -> 同步 (逆变器 -> 电池)
* 8 -> 校准 - 充电阶段 (0% --> 100%)
* 1024 -> 校准 - 放电阶段 (xx% --> 0%)
* 2048 -> 平衡

对象“inverter_state”指示逆变器的状态

* 0 -> ‘待机’
* 1 -> ‘初始化’
* 2 -> ‘待机’
* 3 -> ‘效率（开发目的的调试状态）’
* 4 -> ‘绝缘检查’
* 5 -> ‘岛屿检查（决定去哪里 - 电网连接或岛屿）’
* 6 -> ‘功率检查（决定是否有足够的能量来启动）’
* 7 -> ‘对称性 (DC-link 对齐)’
* 8 -> ‘中继测试’
* 9 -> ‘电网无源 (逆变器从电网获取电力，无需桥接时钟)’
* 10 -> ‘准备蝙蝠被动’
* 11 -> ‘电池被动（离网）’
* 12 -> ‘硬件测试’
* 13 -> ‘单数’

＃＃ 已知的问题
没有任何

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (NCIceWolf) some improvements on connect / disconnect 

### 1.2.9 (2024-05-17)
* (Andreas Ruttkamp) wrong type for next_calib_date corrected


### 1.2.8 (2024-05-16)
* (NCIceWolf) Implementation of new adminUI
* (Andreas Ruttkamp) index_m.html deleted
* (Andreas Ruttkamp) Datatype battery_stack_cycles corrected
* (NCIceWolf) style.css deleted (not needed for json admin)
* (NCIceWolf) removed tab-materialize (leftover from initial adapter creation)
* (NCIceWolf) updated minimum js-controller version to >= 5.0.0 (current: 5.0.19)
* (NCIceWolf) added minimum admin version to >= 5.0.0 (current stable : 6.13.16), could even be >= 6.0.0
* (NCIceWolf) prepared translations (further handling -> https://github.com/ioBroker/adapter-dev#manage-translations)

### 1.2.7 (2024-05-05)
* (Andreas Ruttkamp) prim_sm.state added
* (NCIceWolf) handling of type errors added
* (Andreas Ruttkamp) some Code cleaning
* (NCIceWolf) Update io-package.json

### 1.2.6 (2024-05-03)
* (Andreas Ruttkamp) unused parameter deleted

### 1.2.5 (2024-05-02)
* (Andreas Ruttkamp) misspelling in rct_core2 corrected
* (Andreas Ruttkamp) Missing ack:true added ( issue:#89)
* (Andreas Ruttkamp) datatypes corrected ( issue:#106)
* (NCIceWolf) changes to correct loosing connection ( issue:#114 )

### 1.2.4 (2024-02-09)
* (Andreas Ruttkamp) adapter not running in 1.2.3 - fixed

### 1.2.3 (2024-02-09)
* (Andreas Ruttkamp) prim_sm.state added
* (Andreas Ruttkamp) states for battery added
* (Andreas Ruttkamp) output of data points power_mng.soc_min and soc_min_island corrected

### 1.2.2 (2023-09-13)
* (Andreas Ruttkamp) data type for power_mng.bat_next_calib_date corrected
* (Andreas Ruttkamp) data type for battery.stack_cycles[x] corrected

### 1.2.1 (2023-09-13)
* (Andreas Ruttkamp) configured rct elements will now be used correctly ( in 1.2.0 only power_mng.bat_next_calib_date was read)

### 1.2.0 (2023-09-11)
* (Andreas Ruttkamp) connection state corrected when adapter is stopped
* (Andreas Ruttkamp) dependancies updated

### 1.1.7 (2023-08-30)
* (Andreas Ruttkamp) connection state corrected

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

Copyright (c) 2024 Andreas Ruttkamp <ioBroker.rct@ruttkamp.com>