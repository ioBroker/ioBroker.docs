---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hikvision-alarmserver/README.md
title: ioBroker.hikvision-alarmserver
hash: eyPVBWE4iO2SXGJQ9Dl1A6LlCjztLMeXh+qcxj8X2Z0=
---
![商标](../../../en/adapterref/iobroker.hikvision-alarmserver/admin/hikvision-alarmserver.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.hikvision-alarmserver.svg)
![下载](https://img.shields.io/npm/dm/iobroker.hikvision-alarmserver.svg)
![安装数量](https://iobroker.live/badges/hikvision-alarmserver-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/hikvision-alarmserver-stable.svg)
![依赖状态](https://img.shields.io/david/raintonr/iobroker.hikvision-alarmserver.svg)
![NPM](https://nodei.co/npm/iobroker.hikvision-alarmserver.png?downloads=true)

# IoBroker.hikvision-alarmserver
**测试：** ![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的海康威视警报服务器适配器
用于接收海康威视摄像机发送的警报/事件的适配器。

海康威视机型测试：

- DS-2CD2043G2-I
- DS-2CD2143G2-I
- DS-2DE2A404IW-DE3
- DS-2DE3A404IW-DE/W

如果您的模型不在此列表中，欢迎提交成功/失败/错误报告。

＃＃ 用法
适配器实例为报告的每个摄像机/事件类型组合创建一个布尔状态。摄像头由 MAC 地址标识（受摄像头提供的信息限制）。

似乎当这些事件仍然有效但没有发送消息来清除它们时，摄像机每秒都会重复发出事件。为此，适配器会自动清除超过 5 秒未重新报告的事件。

＃＃ 配置
### IoBroker
在适配器配置中，选择一个空闲端口供适配器侦听（默认为 8089）。

### 在相机上
访问您的摄像机的配置页面并定义 ioBroker IP/主机和端口设置：

![报警服务器选项](../../../en/adapterref/iobroker.hikvision-alarmserver/docs/images/alarm-server-options.png)

确保在您要报告给 ioBroker 的事件中链接包括“通知监控中心”。例如：

![运动检测选项](../../../en/adapterref/iobroker.hikvision-alarmserver/docs/images/motion-detection-options.png)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.0.7 (2022-12-29)
-   (Robin Rainton) Add bind address option ([#9](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/9)).
-   (Robin Rainton) Try to derive device names from net-tools. Optionally use channelName from devices ([#10](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/10)).

### 0.0.6 (2022-12-13)
-   (Robin Rainton) Handle multipart message payload ([#5](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/5)).
-   (Robin Rainton) Handle payloads without XML declaration ([#7](https://github.com/iobroker-community-adapters/ioBroker.hikvision-alarmserver/issues/7).)

### 0.0.5 (2022-12-10)
-   (Robin Rainton) Drop colons from device IDs.

### 0.0.2
-   (Robin Rainton) initial release.

## License
MIT License

Copyright (c) 2022 Robin Rainton <robin@rainton.com>

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