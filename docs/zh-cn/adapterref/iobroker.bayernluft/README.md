---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bayernluft/README.md
title: ioBroker.bayernluft
hash: +pFLTezSZnJSQN9tjHBUjPa7gBY5GeVRCrZ6S1iujGo=
---
![标识](../../../en/adapterref/iobroker.bayernluft/admin/bayernluft.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.bayernluft.svg)
![下载](https://img.shields.io/npm/dm/iobroker.bayernluft.svg)
![安装数量](https://iobroker.live/badges/bayernluft-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/bayernluft-stable.svg)
![新平台](https://nodei.co/npm/iobroker.bayernluft.png?downloads=true)

# IoBroker.bayernluft
**测试：**![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.bayernluft/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 BayernLuft 适配器
将[巴伐利亚航空](https://www.bayernluft.de/) 制造的通风设备连接至 ioBroker 系统。

## 免责声明
**所有产品和公司名称或徽标均为其各自所有者的商标™或注册®商标。使用它们并不意味着与它们或任何相关子公司有任何关联或认可！此个人项目是在业余时间维护的，没有商业目标。**

## 需要做什么？
要使用此适配器，您需要更改设备的导出模板。
**请务必遵循以下步骤**

## 如何更改模板？
1. 进入设备的 Web 界面
2. 点击“设置齿轮”，进入“设置”
3. 向下滚动，直到看到专家模式
4.从此 github 存储库上传文件“export_iobroker.txt”。
8. 完成后，在适配器实例中设置设备。设备的标准端口为 80。

很高兴知道
命令commands.setSpeedIn、commands.setSpeedOut、commands.setSpeedAntiFreeze仅在设备关闭时有效。如果设备已打开，则设备会确认这些命令，但不会发生任何事情（您可以在相应的状态states.speed_in、states.speed_out和states.speed_antifreeze中手动检查）

## 致谢
如果没有 @Marco15453 (https://github.com/Marco15453) 的出色工作，这个适配器是不可能实现的，他创建了此适配器的 V1.x.x。
同时非常感谢 Bayernluft 公司的大力支持

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 3.0.0 (2025-02-24)
* (boriswerner) **Breaking Change:** All states from the 2.alpha versions have been removed and the adapter has been completely redesigned. The Bayernlüfter devices need a new export configuration file. Please upload export_iobroker.txt to each of your devices and delete old states.
* (mcm1957) Adapter requires node.js 20, js-controller 6 and admin 7 now.
* (boriswerner) Commands have been implemnted for individual fan speeds (see  WS32240427 in https://www.bayernluft.de/de/wlan32_changelist.html):
    When device is turned off, the fans can be set individually (commands: setSpeedIn, setSpeedOut, setSpeedAntiFreeze)
* (boriswerner) States in "states"-folder have been set to read-only
* (boriswerner) Roles of states have been changed
* (boriswerner) Update interval label and set default port have been fixed
* (mcm1957) Missing values from device are set to null and qs flag is set to 0x82 now
* (mcm1957) Units have been added where appropiate
* (mcm1957) Translations have been added for all supported languages
* (mcm1957) Dependencies have been updated

### 2.0.1 (2025-01-16)
* (mcm1957) AdminUI and translations have been fixed.

### 2.0.0 (2025-01-14)
* (mcm1957) Adapter requires node.js 20, js-controller 6 and and admin 6 now.
* (boriswerner) Corrected the API calls to match the new API (rev 2.0 version WS32231301, see: https://www.bayernluft.de/de/wlan32_changelist.html)
* (boriswerner) Corrected the ACK-handling in onStateChange
* (mcm1957) Adapter has been move to iobroker-community-adapters organization
* (mcm1957) Dependencies have been updated

## License
MIT License

Copyright (c) 2024-2025, iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2022 Marco15453 <support@marco15453.xyz>

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