---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.teslamateapi/README.md
title: ioBroker.teslamateapi
hash: soSS6WongH1psOFoLEVVCZ66r0DQCoIomBjbzTHWKbA=
---
![NPM 版本](https://img.shields.io/npm/v/iobroker.teslamateapi.svg)
![下载](https://img.shields.io/npm/dm/iobroker.teslamateapi.svg)
![安装数量](https://iobroker.live/badges/teslamateapi-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/teslamateapi-stable.svg)
![NPM](https://nodei.co/npm/iobroker.teslamateapi.png?downloads=true)

<img src="/admin/teslamate.svg" alt="标识" style="max-width: 100%;" width="100">

# IoBroker.teslamateapi
**测试：** ![测试和发布](https://github.com/virusbrain/ioBroker.teslamateapi/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 teslamateapi 适配器
通过 TeslaMateApi 控制您的汽车！

TeslaMateApi 是一个 RESTful API，用于获取自托管数据记录器 TeslaMate 在 JSON 中收集的数据。您可以在此处找到该应用程序：https://github.com/tobiasehlert/teslamateapi

此适配器将通过 TeslaMateApi 和 Telsmate 提供您汽车的状态。您也可以向您的汽车发送一些命令。目前支持以下命令：

- 醒来
- 闪光灯
- charge_port_door_open
- charge_port_door_close
- charge_start
- charge_stop
- 门锁
- door_unlock
- auto_conditioning_start
- auto_conditioning_stop

使用此适配器，您还可以设置汽车的一些设置。目前这些已实施：

- charge_limit
- charging_amps

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.0.7 (2022-11-09)
* (virusbrain) Fix automatic wake_up

### 0.0.6 (2022-11-09)
* (virusbrain) Fixed axios import

### 0.0.5 (2022-11-09)
* (virusbrain) Updated dependencies

### 0.0.4 (2022-11-09)
* (virusbrain) Fixed forced wake up.

### 0.0.3 (2022-10-11)
* (virusbrain) Second try to make intervals unload safe

### 0.0.2 (2022-09-27)
* (virusbrain) Fixed clearInterval
* (virusbrain) Fixed logo size

### 0.0.1 (2022-09-24)
* (virusbrain) Intial beta elease

## License
MIT License

Copyright (c) 2022 virusbrain <github@eideo.de>

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