---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.rct/README.md
title: ioBroker.rct
hash: EajmOZN39ieDon/Nr5SpCsXDOTJr3WYFZc0/QNl0INo=
---
![NPM 版本](https://img.shields.io/npm/v/iobroker.rct.svg)
![下载](https://img.shields.io/npm/dm/iobroker.rct?label=npm%20downloads&style=flat-square)
![节点-lts](https://img.shields.io/node/v-lts/iobroker.rct?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.rct?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/aruttkamp/iobroker.rct?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/aruttkamp/iobroker.rct?logo=github&style=flat-square)
![GitHub提交活动](https://img.shields.io/github/commit-activity/m/aruttkamp/iobroker.rct?logo=github&style=flat-square)
![GitHub 最新提交](https://img.shields.io/github/last-commit/aruttkamp/iobroker.rct?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/aruttkamp/iobroker.rct?logo=github&style=flat-square)
![稳定的](http://iobroker.live/badges/rct-stable.svg)
![已安装](https://iobroker.live/badges/rct-installed.svg)
![NPM](https://nodei.co/npm/iobroker.rct.png?downloads=true)

[![Logo](admin/rct.png)](https://www.rct-power.com/de)

# IoBroker.rct
## 版本
## IoBroker 的 RCT 适配器
请注意，这是一个私人项目，我（Andreas Ruttkamp）与RCT公司没有任何关联。

读取RCT Power光伏功率转换器的数值。

＃＃ 评论
通过使用“RCT元件”字段，可以选择要从电源转换器读取哪些数据。

如果此处未输入任何内容，则将使用默认值：

"battery.bat_status,battery.soc,battery.soc_target,battery.soc_target_high,battery.soc_target_low,dc_conv.dc_conv_struct[0].p_dc_lp,dc_conv.dc_conv_struct[1].p_dc_lp,fault[0].flt,fault[1].flt,fault[2].flt,fault[3].flt,g_syn c.p_ac_grid_sum_lp,g_sync.p_ac_load_sum_lp,g_sync.p_ac_sum_lp,g_sync.p_acc_lp,g_sync.u_sg_avg[0],g_sync.u_sg_avg[1],io_board.s0_external_power,power_mng.is_heiphoss,power_mng.state,power_mng.u_acc_mix_lp,prim_sm.island_flag"

其他元素可以在代码（文件“rct/rc_core2.js”）中找到。由于代码不够清晰易懂，请自行承担使用风险！

对象“battery.bat_status”指示已连接电池的状态：

* 0 -> 充电/放电（正常操作）
* 1 -> 空闲（无 CAN 连接逆变器 -> 电池）
* 3 -> 连接（逆变器 -> 电池）
* 5 -> 同步（逆变器 -> 电池）
* 8 -> 校准 - 充电阶段（0% --> 100%）
* 1024 -> 校准 - 放电阶段 (xx% --> 0%)
* 2048 -> 平衡

对象“inverter_state”指示逆变器的状态。

* 0 -> '待机'
* 1 -> '初始化'
* 2 -> '待机'
* 3 -> '效率（用于开发目的的调试状态）'
* 4 -> '绝缘检查'
* 5 -> '岛屿检查（决定去哪里 - 并网还是孤岛）'
* 6 -> '功率检查（决定能量是否足够启动）'
* 7 -> '对称性（直流链路对齐）'
* 8 -> '继电器测试'
* 9 -> '电网被动式（逆变器从电网获取电力，无需桥接时钟）'
* 10 -> '准备电池被动状态'
* 11 -> '电池被动式（离网）'
* 12 -> '硬件测试'
* 13 -> '网格供料'

## 已知问题
没有任何

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
Improve Logging Consistency and Debug Handling
#320

### 1.2.27 (2026-05-19)
- (copilot) Adapter requires node.js >= 22 now
- (Andreas Ruttkamp) dependencies updated
- (Andreas Ruttkamp) minimum version for admin now 7.6.20

### 1.2.26 (2026-02-22)
* (Andreas Ruttkamp) correct handling for parameter without "." ( grid_offset / android_description ) [#262](https://github.com/aruttkamp/ioBroker.rct/issues/262)

### 1.2.25 (2025-10-16)
* (Andreas Ruttkamp) repro checker issues resolved
* (Andreas Ruttkamp) npm trusted publishing integrated

### 1.2.24 (2025-09-01)
* (Andreas Ruttkamp) dev dependencies updated
* (Andreas Ruttkamp) minimum version for admin now 7.6.17
* (Andreas Ruttkamp) minimum version for js controller now 6.0.11

### 1.2.23 (2025-08-19)
* (Andreas Ruttkamp) enhancement issue #241

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

Copyright (c) 2025-2026 Andreas Ruttkamp <ioBroker.rct@ruttkamp.com>