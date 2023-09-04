---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.solarwetter/README.md
title: ioBroker.solarwetter
hash: iFiZKXxoTa8ilR4AJyMW3YZS4yNkcUfjQV+4FuxNpG8=
---
![标识](../../../en/adapterref/iobroker.solarwetter/admin/solarwetter.png)

![安装数量](http://iobroker.live/badges/solarwetter-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.solarwetter.svg)
![下载](https://img.shields.io/npm/dm/iobroker.solarwetter.svg)
![国家公共管理](https://nodei.co/npm/iobroker.solarwetter.png?downloads=true)

# IoBroker.solarwetter
## 说明/描述
:de: Dieser 适配器适用于 Solarstrom Tagesertrag für eine bestimmte Region。 [http://www.auswahl-plz-bereich.solar-wetter.com](http://solar-wetter.com) 的日期。
适配器是一种太阳能设备，也是一种能源设备。

：uk：此适配器可提供供应商[http://www.auswahl-plz-bereich.solar-wetter.com](http://solar-wetter.com) 特定区域每日太阳能电量的预测。
翻译！！！！

## 安装/配置
### 用户/密码
2022/03 是非认证的。

自2022年3月起，不再需要身份验证。

### 标准/位置
太阳能发电的本质特征整体的最佳状态

从邮政编码列表中选择您所在的地区。
输入太阳能发电厂的功率来计算能量输出。

### Solaranlage/太阳能发电厂
您可以对本征太阳能的整体管理进行研究，以了解能源的使用情况 (auch Dezimalzahlen möglich)。

输入太阳能发电厂的总功率来计算每日能源产量预测（可以使用小数分隔符）

### 4-Tage-Prognose / 4 天预测
Wählen Sie hier eine Stadt。适配器连接到 4-Tage-Prognose 图表（数据点`solarwetter.0.forecast.chart.__url__`）。

选择一个城市，让适配器建立指向 4 天预测图表的链接（数据点`solarwetter.0.forecast.chart.__url__`）。

![替代文本](../../../en/adapterref/iobroker.solarwetter/img/solarwetterSettingScreenshot.jpg "截图设置")

## 活动/时间表
适配器启动。

适配器每天启动一次。

## 数据点/数据点
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

<!-- ### **正在进行中** -->

### 1.1.5 (2023-08-15)
* (motuditli) 根据网站更改进行调整 - 删除身份验证
* (bluefox) 添加了紧凑模式和 JSON 配置

### 1.0.0 (2017-10-15)
* (pix) 测试版结束，需要 Node.js 4 或更高版本

### 0.3.0 (2017-05-28)
* (pix) 使用网站密码和用户名登录

### 0.2.0 (2017-01-05)
* (pix) 添加了 Travis CI 测试

### 0.1.2 (2016-06-21)
*（像素）城市选择固定

### 0.1.1 (2016-06-20)
*（像素）4 天预测图表

### 0.1.0 (2016-06-12)
* (pix) 在 npm 上发布

### 0.0.6 (2016-06-09)
* (pix) Adapter.stop() 已修复

### 0.0.5 (2016-05-14)
*（像素）如果已经定义，设置现在显示正确的位置

### 0.0.4 (2016-05-13)
* (pix) 设置窗口的外观

### 0.0.3 (2016-05-13)
*（像素）计算自己的太阳能发电厂的功率

### 0.0.2 (2016-05-13)
*（像素）邮政编码区域可选

### 0.0.1 (2016-05-12)
*（像素）首次发布

＃＃ 去做
* 数据点的翻译
* 设置窗口的俄语翻译

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