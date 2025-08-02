---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vw-connect/README.md
title: ioBroker.vw-connect
hash: FUWYi45Z5HYY4colpKrhNV+BolMJv/MIyIn1c4N/dUU=
---
![标识](../../../en/adapterref/iobroker.vw-connect/admin/vw-connect.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.vw-connect.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vw-connect.svg)
![依赖状态](https://img.shields.io/david/ta2k/iobroker.vw-connect.svg)
![已知漏洞](https://snyk.io/test/github/ta2k/ioBroker.vw-connect/badge.svg)
![国家公共管理](https://nodei.co/npm/iobroker.vw-connect.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/ta2k/ioBroker.vw-connect/master.svg)

# IoBroker.vw-connect
## IoBroker 的 vw-connect 适配器
适用于 VW We Connect、We Connect ID、We Charge、myAudi、Skoda Connect、Seat Connect 和 We Connect Go 的适配器

请在节点 10 上更新您的系统。
<https://forum.iobroker.net/topic/22867/how-to-node-js-f%C3%BCr-iobroker-richtig-updaten>

＃＃ 用法
使用远程控制状态来远程控制您的汽车。
正常刷新是从 VAG 接收数据的轮询间隔。 强制刷新用于非电动汽车强制刷新，此数量受 VAG 限制，直到汽车再次启动。
行程数据仅适用于非电动汽车。

您可以在 .climater.settings.targetTemperature.content 中设置气候温度

## 讨论和问题
<https://forum.iobroker.net/topic/26438/test-adapter-vw-connect-für-vw-id-audi-seat-skoda>

## 状态字段说明
### 条目列表
```

```

## Changelog

### 0.0.65

- Fix Cupra login

### 0.0.63

- Fix VW/Skoda etron login

### 0.0.62

- Fix Audi etron login

### 0.0.61

- Fix ID login

### 0.0.60

- Minor improvements. WeCharge Minimum interval is now 15 minutes

### 0.0.55

- fix id status update

### 0.0.51

- fix audi etron login

### 0.0.48

- fix login, fix audi update, add limit for wallbox

### 0.0.43

- increase refresh token timeouts

### 0.0.42

- fix skoda login

### 0.0.40

- add climate v3 for newer cars. Add Powerpass and Seat Elli

### 0.0.39

- fix id login

### 0.0.36

- add Skoda Enyaq support

### 0.0.35

- add nodeJS v10 compatibility

### 0.0.34

- add auto accept of new privacy consent

### 0.0.32

- correct selection of last recent trips

### 0.0.31

- enable multiple selection of trip types

### 0.0.30

- fix mutiple car problem, add VWv2 mode at the moment there is no different between VW and VWv2

### 0.0.29

- fix skoda refreshToken, smaller improvements

### 0.0.26

- bugfixes

### 0.0.25

- add we charge

### 0.0.24

- add remote state update

### 0.0.23

- add Seat and new climatisation v2

### 0.0.22

- calculate outside temperatur in °C also for Skoda and Audi

### 0.0.21

- add remotes for id

### 0.0.20

- fix audi login, add ID login

### 0.0.19

- save status objects in state by id instead of consecutive numbers

### 0.0.18

- fix battery status for 2020 models

### 0.0.17

- add support for 2020 models

### 0.0.16

- fix js.controller 3 problems

### 0.0.11

- fix audi bug with multiple vehicles
- hide status update error if feature is not available

## License

MIT License

Copyright (c) 2019 ta2k <tombox2020@gmail.com>

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