---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.solarwetter/README.md
title: ioBroker.solarwetter
hash: N9jcCi7jpOsufYNjUhK1MpH6xfIXnNOyJE9q1vy1Amc=
---
![标识](../../../en/adapterref/iobroker.solarwetter/admin/solarwetter.png)

![安装数量](http://iobroker.live/badges/solarwetter-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.solarwetter.svg)
![下载](https://img.shields.io/npm/dm/iobroker.solarwetter.svg)
![国家公共管理](https://nodei.co/npm/iobroker.solarwetter.png?downloads=true)

# IoBroker.solarwetter
＃＃ 描述
该适配器可提供供应商[http://www.auswahl-plz-bereich.solar-wetter.com](http://solar-wetter.com) 特定区域每日太阳能电量的预测。

＃＃ 配置
### 用户/密码
自2022年3月起，不再需要身份验证。

＃＃＃ 地点
从邮政编码列表中选择您所在的地区。
输入太阳能发电厂的功率来计算能量输出。

### 太阳能发电厂
输入太阳能发电厂的总功率来计算每日能源产量预测（可以使用小数分隔符）

### 4 天预测
选择一个城市，让适配器建立指向 4 天预测图表的链接（数据点`solarwetter.0.forecast.chart.__url__`）。

![替代文本](../../../en/adapterref/iobroker.solarwetter/img/solarwetterSettingScreenshot.jpg "截图设置")

＃＃ 日程
适配器每天启动一次。

＃＃ 状态
`solarwetter.0.forecast.__clearSky__`（*值*）

`solarwetter.0.forecast.__realSky_min__`（*值*）

`solarwetter.0.forecast.__realSky_max__`（*值*）

`solarwetter.0.forecast.__Datum__`（*字符串，无时间戳*）

`solarwetter.0.forecast.__Region__`（*值*）

`solarwetter.0.forecast.home.__clearSky__`（*值*）

`solarwetter.0.forecast.home.__realSky_min__`（*值*）

`solarwetter.0.forecast.home.__realSky_max__`（*值*）

`solarwetter.0.forecast.home.__Leistung__`（*值*）

`solarwetter.0.forecast.chart.__city__`（*值*）

`solarwetter.0.forecast.chart.__url__`（*值*）

＃＃ 去做
* 数据点的翻译
* 设置窗口的俄语翻译

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 1.1.5 (2023-08-15)
* (motuditli) Adjusted for Website Changes - removal of authentication
* (bluefox) Added compact mode and JSON config

### 1.0.0 (2017-10-15)
* (pix) End of beta, Node.js 4 or higher required

### 0.3.0 (2017-05-28)
* (pix) Login with website password & username

### 0.2.0 (2017-01-05)
* (pix) Travis CI testing added

### 0.1.2 (2016-06-21)
* (pix) city selection fixed

### 0.1.1 (2016-06-20)
* (pix) 4-Day-Forecast Chart

### 0.1.0 (2016-06-12)
* (pix) publish on npm

### 0.0.6 (2016-06-09)
* (pix) Adapter.stop() fixed

### 0.0.5 (2016-05-14)
* (pix) Settings now show correct location if already defined

### 0.0.4 (2016-05-13)
* (pix) Appearance of settings window

### 0.0.3 (2016-05-13)
* (pix) Calculates power of own solar plant

### 0.0.2 (2016-05-13)
* (pix) Post code area selectable

### 0.0.1 (2016-05-12)
* (pix) first release

## License

The MIT License (MIT)

Copyright (c) 2020-2023 pix

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

---
*Logo is partly crafted by CHALLENGER* :+1: