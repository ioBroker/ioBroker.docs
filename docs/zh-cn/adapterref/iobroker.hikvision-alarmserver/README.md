---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hikvision-alarmserver/README.md
title: ioBroker.hikvision-alarmserver
hash: AY7QhbmgeBfqcBWFAuLw+g/FAJ6YmDXQcdhlF9dTeHE=
---
![标识](../../../en/adapterref/iobroker.hikvision-alarmserver/admin/hikvision-alarmserver.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.hikvision-alarmserver.svg)
![下载](https://img.shields.io/npm/dm/iobroker.hikvision-alarmserver.svg)
![安装数量](https://iobroker.live/badges/hikvision-alarmserver-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/hikvision-alarmserver-stable.svg)
![依赖状态](https://img.shields.io/david/raintonr/iobroker.hikvision-alarmserver.svg)
![新PM](https://nodei.co/npm/iobroker.hikvision-alarmserver.png?downloads=true)

# IoBroker.hikvision-alarmserver
**测试：** ![测试和发布](https://github.com/raintonr/ioBroker.hikvision-alarmserver/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的海康威视报警服务器适配器
用于接收从海康威视摄像机发送的警报/事件的适配器。

在海康威视 DS-2CD2143G2-I 上使用基本和智能事件进行测试。欢迎提交成功/失败/错误报告。

＃＃ 用法
适配器实例为报告的每个相机/事件类型组合创建一个布尔状态。摄像机由 MAC 地址识别（受摄像机提供的信息限制）。

当这些事件仍然有效但没有发送消息来清除它们时，相机似乎每秒重复发出事件。因此，适配器会自动清除超过 5 秒未重新报告的事件。

＃＃ 配置
### IoBroker
在适配器配置中，选择一个空闲端口供适配器监听（默认为 8089）。

### 在相机上
访问您的摄像头的配置页面并定义 ioBroker IP/主机和端口设置：

![警报服务器选项](../../../en/adapterref/iobroker.hikvision-alarmserver/docs/images/alarm-server-options.png)

确保您想向 ioBroker 报告的事件中的链接包括“通知监控中心”。例如：

![运动检测选项](../../../en/adapterref/iobroker.hikvision-alarmserver/docs/images/motion-detection-options.png)

## Changelog

### 0.0.2
* (Robin Rainton) initial release.

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