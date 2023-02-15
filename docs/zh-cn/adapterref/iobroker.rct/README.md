---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.rct/README.md
title: ioBroker.rct
hash: xIw/AFvCB/bHIJe2yR/HqTgPGVybngkeG6EmijovYps=
---
![标识](../../../en/adapterref/iobroker.rct/admin/rct.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.rct.svg)
![下载](https://img.shields.io/npm/dm/iobroker.rct.svg)
![安装数量（最新）](https://iobroker.live/badges/rct-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/rct-stable.svg)
![依赖状态](https://img.shields.io/david/lauff/iobroker.rct.svg)
![NPM](https://nodei.co/npm/iobroker.rct.png?downloads=true)

#ioBroker.rct
**测试：** ![测试和发布](https://github.com/lauff/ioBroker.rct/workflows/Test%20and%20Release/badge.svg)

## 项目不再维护
切换到 Home Assistant 后，我不再维护这个适配器。
如果您有兴趣接管它，请告诉我。

## IoBroker 的 RCT 适配器
请注意，这是一个私人项目，我（Markus Lauff）与 RCT 没有任何关系。

显示 RCT Power 光伏电源转换器的值

＃＃ 评论
### 初始生产版本
这是在先前版本已被证明稳定并满足最小可行范围之后的初始生产版本。

配置仍然有限且技术性强。使用“RCT ELemente”可以选择从电源转换器读取哪些数据。默认为“battery.bat_status,battery.soc,battery.soc_target,battery.soc_target_high,battery.soc_target_low,dc_conv.dc_conv_struct[0].enabled,dc_conv.dc_conv_struct[0].p_dc_lp,dc_conv.dc_conv_struct[1].enabled, dc_conv.dc_conv_struct[1].p_dc_lp,fault[0].flt,fault[1].flt,fault[2].flt,fault[3].flt,g_sync.p_ac_grid_sum_lp,g_sync.p_ac_load_sum_lp,g_sync.p_ac_sum_lp,g_sync .p_acc_lp,g_sync.u_sg_avg[0],g_sync.u_sg_avg[1],io_board.s0_external_power,power_mng.battery_type,power_mng.is_grid,power_mng.is_heiphoss,power_mng.state,power_mng.use_grid_power_enable,power_mng.u_acc_mix_lp.,prim_s 。状态”。其他元素可以在代码中找到（文件“rct/rc_core.js”）。但这根本不是自我描述的（甚至没有真正测试过）。

＃＃ 已知的问题
### 错误的频道/状态
新版本可能无法创建正确的 ioBroker 通道/状态。在大多数情况下，这可以通过显示为单个元素而不是文件夹的节点“电池”来识别。

如果发生这种情况，请停止适配器并手动删除节点“rct.0”。

## Changelog

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

Copyright (c) 2022 Markus Lauff <ioBroker.rct@markus.lauff.com>