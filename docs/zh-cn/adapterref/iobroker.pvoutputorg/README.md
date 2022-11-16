---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.pvoutputorg/README.md
title: ioBroker.pvoutputorg
hash: UNpMZ4dxO4O2ed9w5D8Dt+lCV+KvCWrvcLEo2dqbtiY=
---
![标识](../../../en/adapterref/iobroker.pvoutputorg/admin/pvoutputorg.png)

![安装数量](http://iobroker.live/badges/pvoutputorg-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.pvoutputorg.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.pvoutputorg.svg)
![已知漏洞](https://snyk.io/test/github/rg-engineering/ioBroker.pvoutputorg/badge.svg)
![新PM](https://nodei.co/npm/iobroker.pvoutputorg.png?downloads=true)

# IoBroker.pvoutputorg
![GitHub 操作](https://github.com/rg-engineering/ioBroker.pvoutputorg/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

**如果你喜欢它，请考虑捐赠：**

[![贝宝](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

适配器连接到[PvOutput.org](https://pvoutput.org)。 System-ID 和 API-key 用于建立连接。两者都需要在管理页面上配置。
当前正在读取所有已配置系统的系统、状态和统计数据并显示在数据点中。
产生的能量可以永久上传到 PvOutput.org。

有关详细信息，请查看 [pvoutput.org 帮助](https://pvoutput.org/help/overview.html)

如果您通过捐款支持 pvoutput.org，我们将为您提供其他功能。目前，适配器中尚不支持这些。

＃ 下载
适配器下载三种数据

* 系统数据
* 状态数据
* 统计数据

为了下载数据，适配器运行一个可调整的 cron 作业。下载频率可以在管理页面上通过“读取数据的间隔[分钟]”进行调整。
下载频率的典型值为 15 分钟，但不再是 59 分钟。

## 系统数据
适配器检索系统状态信息和实时输出数据。

更多关于[API 文档](https://pvoutput.org/help/api_specification.html#id25)

## 状态数据
状态数据（或实时数据）包括可用于您的系统的所有可能的系统数据。

更多关于[API 文档](https://pvoutput.org/help/api_specification.html#id16)

## 统计数据
适配器检索系统统计信息。

更多关于[API 文档](https://pvoutput.org/help/api_specification.html#id21)

# 上传
数据上传只是一种选择。如果您使用 sbfspot 等其他应用程序上传数据，则在适配器中禁用上传。

## 上传实时数据
要上传实时数据/状态数据，适配器会运行可调整的 cron 作业。上传频率可以在管理页面上通过“写入数据的间隔[分钟]”进行调整。
上传频率的典型值为 5 到 15 分钟，但不再是 59 分钟。

适配器在每个系统的“上传”文件夹中提供了大量数据点。只能使用功率或能量数据点。所有其他都是可选的。

更多关于[API 文档](https://pvoutput.org/help/api_specification.html#add-status-service)

### 功率和能量计算
功率和能量值可以相互推导出来。当系统仅发送功率值时，会自动计算相应的能量值。
同样，当仅发送能量值时，PVOutput 将计算平均功率。

更多关于[API 文档](https://pvoutput.org/help/api_specification.html#power-and-energy-calculation)

### Cumulative Energy - 系统配置中的 CumulativeFlag
以下值对累积标志有效。
1 = 能源生产和能源消耗值是生命周期能源值。消耗和发电能量在一天开始时重置为 0。
2 - 只有能源发电是终生能源价值。
3 - 只有能源消耗消耗才是终生能源价值。

默认值：1

更多关于[API 文档](https://pvoutput.org/help/api_specification.html#cumulative-energy)

### Net Data - 系统配置中的 NetDataFlag
该参数设置为 1 时将指示传递的功率值是净出口/进口，而不是总发电量/消耗量。
此选项用于无法报告总消耗数据的设备。提供的导入/导出数据与现有的生成数据合并以得出消耗。

默认：未选中

更多关于[API 文档](https://pvoutput.org/help/api_specification.html#net-data)

## 上传日终数据
在一天结束时，将执行一个单独的上传命令。可以上传很多不同的数据。这些数据可作为每个系统的上传文件夹中的数据点使用。它们都是可选的。

更多关于[API 文档](https://pvoutput.org/help/api_specification.html#add-output-service)

＃＃ 已知的问题
* 如果您发现错误或想要新功能，请在 [github](https://github.com/rg-engineering/ioBroker.pvoutputorg/issues) 创建问题

## Changelog

### 1.8.5 (2022-10-01)
* (René) bug fix wrong date

### 1.8.4 (2022-08-21)
* (René) bug fix WeatherConditions
* (René) bug fix EoD upload

### 1.8.0 (2022-08-20)
* (René) WeatherConditions can be used directly from DasWetter adapter 

### 1.7.0 (2022-07-17)
* (René) WeatherConditions for upload end of the day (EoD) data added
* (René) write-Interval selectable out of 5, 10 or 15 minutes according PVOutput.org-specification

### 1.6.1 (2022-07-06)
* (René) bug fix date string in write status and end of day data

### 1.6.0 (2022-07-01)
* (René) change back from cron to interval
* (René) end of day data are written 1 hour after sunset
* (René) read and write data only when daylight as an option 

### 1.5.0 (2022-04-21)
* (René) datapoint added to show when data uploaded to pvoutput.org

### 1.4.0 (2022-06-01)
* (René) changed to post requests

### 1.3.0 (2022-05-26)
* (René) Upload live data and end-of-day
* (René) better error handling when receiving errors from server
* (René) CumulativeFlag and NetDataFlag added for upload service

### 1.2.0 (2022-05-21)
* (René) IsActive per system added

### 1.1.0 (2022-05-20)
* (René) write data to PvOutput.org added
* (René) change to cron

### 1.0.0 (2022-04-29)
* (René) first official release

### 0.0.1 (2022-04-24)
* (René) initial release

## License
MIT License

Copyright (c) 2022 rg-engineering <info@rg-engineering.eu>

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