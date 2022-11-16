---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.daikin/README.md
title: ioBroker.daikin
hash: 15a/Y6Geu6hlOpHJrvLlbLQ3z86g6IL579HYrY6Vpqw=
---
![标识](../../../en/adapterref/iobroker.daikin/admin/daikin.jpg)

![安装数量](http://iobroker.live/badges/daikin-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.daikin.svg)
![下载](https://img.shields.io/npm/dm/iobroker.daikin.svg)

# IoBroker.daikin
![测试和发布](https://github.com/Apollon77/iobroker.daikin/workflows/Test%20and%20Release/badge.svg)[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/daikin/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

该适配器连接到大金空调设备并允许控制设备并从中读取值。
Daikin 设备需要配备 Daikin Wifi 控制器。通常应支持 Daikin App 支持的所有 wifi 控制器。

根据大金支持文件，以下设备应该兼容（至少）：

Compatible units in combination with **BRP069A41**: FTXG20LV1BW, FTXG20LV1BS , FTXG25LV1BW, FTXG25LV1BS, FTXG35LV1BW, FTXG35LV1BS, FTXG50LV1BW, FTXG50LV1BS, FTXJ20LV1BW, FTXJ20LV1BS, FTXJ25LV1BW, FTXJ25LV1BS, FTXJ35LV1BW, FTXJ35LV1BS, FTXJ50LV1BW, FTXJ50LV1BS ,

Compatible units in combination with **BRP069A42**: FTXZ25NV1B, FTXZ35NV1B, FTXZ50NV1B, FTXS35K2V1B, FTXS35K3V1B, FTXS42K2V1B, FTXS42K3V1B, FTXS50K2V1B, FTXS50K3V1B, FTXLS25K2V1B, FTXLS35K2V1B,FTXM35K3V1B, FTXM42K3V1B, FTXM50K3V1B, , FTXS60GV1B, FTXS71GV1B, ATXS35K2V1B, ATXS35K3V1B, ATXS50K2V1B, ATXS50K3V1B, , FTX50GV1B, FTX60GV1B, FTX71GV1B, , FVXG25K2V1B, FVXG35K2V1B, FVXG50K2V1B, , FVXS25FV1B, FVXS35FV1B, FVXS50FV1B, , FLXS25BAVMB, FLXS25BVMA, FLXS25BVMB, FLXS35BAVMB, FLXS35BAVMB9, FLXS35BVMA, FLXS35BVMB, FLXS50BAVMB, FLXS50BVMA, FLXS50BVMB, FLXS60BAVMB, FLXS60BVMA, FLXS60BVMB,

Compatible units in combination with **BRP069A43 (?)**: CTXS15K2V1B, CTXS15K3V1B, FTXS20K2V1B, FTXS20K3V1B, FTXS25K2V1B, FTXS25K3V1B, CTXS35K2V1B, CTXS35K3V1B, FTXM20K3V1B, FTXM25K3V1B, , ATXS20K2V1B, ATXS20K3V1B, ATXS25K2V1B, ATXS25K3V1B, , FTX20J2V1B, FTX25J2V1B, FTX35J2V1B, FTX20J3V1B, FTX25J3V1B, FTX35J3V1B, , FTXL25J2V1B, FTXL35J2V1B, , FTX20KV1B, FTX25KV1B, FTX35KV1B, FTX20GV1B, FTX25GV1B, FTX35GV1B, , ATX20J2V1B, ATX20J3V1B, ATX25J2V1B, ATX25J3V1B, ATX35J2V1B, ATX35J3V1B, ATX20KV1B, ATX25KV1B, ATX35KV1B, , ATXL25J2V1B, ATXL35J2V1B,

与 **BRP069A44 (?)** 组合的兼容单元：FTX50KV1B、FTX60KV1B

注意：对于带有更新的 WLAN 适配器的设备，如 **BRP069C4x** 只能由 Onecta 应用程序使用，请改用 [大金云](https://github.com/Apollon77/ioBroker.daikin-cloud) 适配器。

## 免责声明
**所有产品和公司名称或徽标均为其各自所有者的商标™ 或注册® 商标。使用它们并不意味着与它们或任何相关子公司有任何关联或认可！这个个人项目是业余时间维护的，没有商业目标。** **Daikin 是 DAIKIN INDUSTRIES, LTD. 的商标。**

##参数说明
###大金IP
来自设备的 Wifi 控制器的 IP

### 轮询间隔
从设备更新数据的间隔（以秒为单位）。此外，每次更改都会更新值

## 可用实例对象/状态的描述
适配器连接到 Daikin 设备后，将创建对象结构：

* deviceInfo.* : 关于 Daikin 设备的一般信息，只读
* control.* : 来自设备的主要可控值，如目标温度、模式等，**可读写**
* controlInfo.* : 来自设备的附加控制信息，只读
* modelInfo.* : 有关设备本身和支持的功能的信息，只读
* sensorInfo.* : 来自设备的传感器数据，例如测量的室内和室外温度

＃＃ 去做
* 增强测试：状态检查和 setState 的
* 检查型号信息/支持的功能
* 网页文档
* 可见小部件

## Changelog
### 1.4.2 (2022-07-25)
* (Apollon77) Make sure polling still works after setting special mode states

### 1.4.1 (2022-06-27)
* (Apollon77) Prevent crash case reported by Sentry

### 1.4.0 (2022-06-09)
* (Apollon77) Add Connection identifier for Admin and Device
* (Apollon77) Optimize unload handling

### 1.3.3 (2021-06-24)
* (Apollon77) Prevent crash case when no temperature was read out (Sentry IOBROKER-DAIKIN-D, IOBROKER-DAIKIN-M)

### 1.3.2 (2021-06-05)
* (Apollon77) Handle modes correctly where no temperature or humidity parameters are required

### 1.3.1 (2021-05-14)
* (Apollon77) Prepare for js-controller 3.3

### 1.3.0 (2021-01-14)
* (Apollon77) Prevent warnings in js-controller 3.2
* (Apollon77) Allow overwriting the name in Daikin channel object
* (Apollon77) Require at least js-controller 2.0

### 1.2.0 (2020-12-27)
* add compact mode

### 1.1.3 (2020-11-19)
* add experimental support for lpw parameter
* crash cases prevented (Sentry IOBROKER-DAIKIN-7)

### 1.1.2 (2020-08-06)
* crash cases prevented (Sentry IOBROKER-DAIKIN-2, IOBROKER-DAIKIN-3, IOBROKER-DAIKIN-4)

### 1.1.1 (2020-08-02)
* better handle case where configuration is missing (Sentry IOBROKER-DAIKIN-1)

### 1.1.0 (2020-07-21)
* Adjust Texts and translate
* create daikin.X ads device object and add one role
* Update dependencies

### 1.0.4 (2019-06-25)
* Daikin library updated, communication error handling optimized

### 1.0.3 (2019-02-xx)
* Daikin library updated, communication errors optimized

### 1.0.2 (2018-04-29)
* Daikin library updated

### 1.0.1 (2018-04-13)
* Fix Admin

### 1.0.0 (2018-01-1x)
* Admin3 readieness
* Support older Daikin-WLAN-Firmwares with special config flag

### 0.2.3 (2017-04-01)
* Add control.lastResult to see if a change was successfull

### 0.2.2
* reduce debug logging

### 0.2.0
* first finalized version

### 0.1.x
* development and first tests

## License

The MIT License (MIT)

Copyright (c) 2017-2022 Apollon77 <ingo@fischer-ka.de>

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