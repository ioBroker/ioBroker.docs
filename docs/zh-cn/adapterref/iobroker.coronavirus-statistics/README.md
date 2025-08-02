---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.coronavirus-statistics/README.md
title: ioBroker.冠状病毒统计
hash: bqsRHDuZ444Xh+//B61Oo5nYkZU2MtYV0jDI//VW7OM=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.coronavirus-statistics.svg)
![下载](https://img.shields.io/npm/dm/iobroker.coronavirus-statistics.svg)
![安装数量（最新）](http://iobroker.live/badges/coronavirus-statistics-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/coronavirus-statistics-stable.svg)
![已知漏洞](https://snyk.io/test/github/DrozmotiX/ioBroker.coronavirus-statistics/badge.svg)
![国家公共管理](https://nodei.co/npm/iobroker.coronavirus-statistics.png?downloads=true)
![依赖状态](https://img.shields.io/david/DrozmotiX/ioBroker.coronavirus-statistics.svg)

<img src="./admin/coronavirus-statistics.png" width="50" height="50" alt="">

# IoBroker.coronavirus-statistics
![测试与发布](https://github.com/DrozmotiX/ioBroker.coronavirus-statistics/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的冠状病毒实时统计适配器
显示全球冠状病毒信息和当前报告的适配器

无需配置，安装后将：

- 接收全球范围内的全球信息并将其写入“global_totals”
- 为每个国家/地区创建一个文件夹，其中包含有关 COVID-19 的所有相关信息
- 每15分钟更新一次信息

可获得以下信息：

|数据点|详情 |
|--|--|
|活跃 |当前感染人数|
|案例 |完全已知的案件数量 |
|每百万案例 |每百万公民的已知病例数 |
|关键|危急情况数量（住院）|
|死亡人数|当前登记的死亡人数|
|每百万人死亡 |当前每百万公民登记的死亡人数|
|旗帜|国旗，链接到 github 位置 |
|康复 |完全已知的康复病例数量 |
|今日案例 |今日新增病例 |
|今天死亡人数|今天有多少人去世了？ |
|测试|全球进行的 COVID-19 检测总数 |
|每百万个县的测试次数|全球每百万人接受的 COVID-19 检测总数 |

请注意，此适配器尽可能多地使用最新信息，但根据国家/地区的报告，可能会有几个小时的延迟。

```German Federal States : https://npgeo-corona-npgeo-de.hub.arcgis.com/  s```

通用来源：https://coronavirus-19-api.herokuapp.com

＃＃ 高级设置
|选项 |描述 |
|--|--|
|所有国家 |获取全球所有国家/地区的数据（默认值：false）|
|大陆 |按不同州的大陆对总金额进行分组（默认值： false）|
|删除未使用的状态 |取消选择国家/地区时删除数据（默认值：false） |

## Changelog

<!--
	### __WORK IN PROGRESS__
	* (DutchmanNL) 
-->
### 0.9.0 (2023-11-16) - Remove unsupported APIs
* (DutchmanNL) Remove specific data regarding germany as APIs are not available anymore
* (DutchmanNL) Data source dedicated for https://coronavirus-19-api.herokuapp.com, we are unable to support more APIs due to changes, complexity and available development capacity. But please feel free to provide PR's!

### 0.8.8-0 (2021-11-19)
* (jlssmt) added hospital index for germany and federal states of germany

### 0.8.7 (2021-11-17)
* (DutchmanNL) Bugfix: Added missing definitions
* (jlssmt) Error handling for missing state attribute definitions Optimized

### 0.8.6 (2021-11-15)
* (Simatec) Design Fix for Admin >=5.1.28 Dark/Blue Theme

### 0.8.5 (2021-10-29)
* (jlssmt) Error handling for bundesländer api implemented

## License
MIT License

Copyright (c) 2023 DrozmotiX Holding B.V. <OSS@DrozmotiX.eu>

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