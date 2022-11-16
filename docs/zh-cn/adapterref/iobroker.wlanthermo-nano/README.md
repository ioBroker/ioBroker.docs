---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wlanthermo-nano/README.md
title: ioBroker.wlanthermo-nano
hash: jWLdLB/tLzY994bhB0XsoX69BINKX6GfxcsXqGA0BIo=
---
![标识](../../../en/adapterref/iobroker.wlanthermo-nano/admin/wlanthermo-nano.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.wlanthermo-nano.svg)
![下载](https://img.shields.io/npm/dm/iobroker.wlanthermo-nano.svg)
![安装数量](https://iobroker.live/badges/wlanthermo-nano-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/wlanthermo-nano-stable.svg)
![依赖状态](https://img.shields.io/david/DrozmotiX/iobroker.wlanthermo-nano.svg)
![新PM](https://nodei.co/npm/iobroker.wlanthermo-nano.png?downloads=true)

# IoBroker.wlanthermo-nano
**测试：** ![测试和发布](https://github.com/DrozmotiX/iobroker.wlanthermo-nano/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 wlanthermo-nano 适配器
[WLANThermo Nano](https://github.com/WLANThermo-nano/WLANThermo_nano_Software/wiki "WLANThermo Nano")，烧烤运动的数字优势

＃＃ 配置
适配器可以在管理界面中安装和配置。
请在实例配置中输入 IP 地址、用户名和密码。

＃＃ 去做
* [ ] 实现自动设备检测
* [ ] 优化pitmaster设置，使状态在相关模式下只能写，否则只读

## 加入 Discord 服务器，讨论有关 ioBroker-WlanThermo 集成的一切！
<a href="https://discord.gg/cNAeGjJ"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

＃＃ 支持我
如果您喜欢我的工作，请随时提供个人捐赠（这是 DutchmanNL 的个人捐赠链接，与 ioBroker 项目无关！）[![捐赠](https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog
### 0.2.1 (2022-06-08) - Initialization error for Nano V1 solved
* (DutchmanNL) Initialization error for Nano V1 solved
* (DutchmanNL) Error logging and reporting improved

### 0.2.0 (2022-06-04) - PitMaster Control & ESP32 support
* (DutchmanNL) Support multiple devices
* (DutchmanNL) Refactor code to TypeScript
* (DutchmanNL) Error/debug logging Improved
* (DutchmanNL) Added data points for features
* (DutchmanNL) Test & Release workflow updated
* (DutchmanNL) Added indicator for connection status
* (DutchmanNL) Reconnecting to offline devices improved
* (DutchmanNL) Allow alarm to be activated / disabled #6
* (DutchmanNL) Allow control of pitmaster & system settings
* (DutchmanNL) Ensure support of all WLANThermo-Nano Devices
* (DutchmanNL) Implemented dropdown menu for Pitmaster to select available profiles
* (DutchmanNL) Added data points for PID profiles including capability to change profile settings

### 0.1.2
* (DutchmanNL) Support multiple devices

### 0.1.1
* (DutchmanNL) Code optimisation
* (DutchmanNL) Implement state_attr.js to handle state options outside of source code
* (DutchmanNL) Optimised state creation in 1 function
* (DutchmanNL) Small cleanups

### 0.1.0
* (DutchmanNL) remove color settngs from pitmaster

### 0.0.9
* (DutchmanNL) optimize pid profile setting

### 0.0.8
* (DutchmanNL) fix post command for pitmaster

### 0.0.7
* (DutchmanNL) State unit fixes
* (DutchmanNL) start integration of pidmaster
* (DutchmanNL) rename  type  to modus for pitmaster

### 0.0.6
* (DutchmanNL) make type and alarm selectable with dropdown

### 0.0.5
* (DutchmanNL) add  capability to change sensors

### 0.0.4
* (DutchmanNL) Fix issue with password set
* (DutchmanNL) Implemented new states for config (reboot/update/checkupdate)
* (DutchmanNL) Change  configuration (way of ip-adress, also dyndns now supported)

### 0.0.3
* (DutchmanNL) implement secure storage of login credentials (required to enable setting changes later)

### 0.0.2
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2019 DutchmanNL <rdrozda86@gmail.com>

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