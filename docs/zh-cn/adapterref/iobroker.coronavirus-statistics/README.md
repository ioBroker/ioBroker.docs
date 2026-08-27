---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.coronavirus-statistics/README.md
title: ioBroker.coronavirus-statistics
hash: U5uV2yyyJwGlb2da9/J8Xe4Io2R0+bAaoL5zRRPiWlI=
---
![NPM 版本](http://img.shields.io/npm/v/iobroker.coronavirus-statistics.svg)
![下载](https://img.shields.io/npm/dm/iobroker.coronavirus-statistics.svg)
![安装数量（最新）](http://iobroker.live/badges/coronavirus-statistics-installed.svg)
![安装数量（稳定版）](http://iobroker.live/badges/coronavirus-statistics-stable.svg)
![已知漏洞](https://snyk.io/test/github/DrozmotiX/ioBroker.coronavirus-statistics/badge.svg)
![NPM](https://nodei.co/npm/iobroker.coronavirus-statistics.png?downloads=true)
![依赖状态](https://img.shields.io/david/DrozmotiX/ioBroker.coronavirus-statistics.svg)

<img src="./admin/coronavirus-statistics.png" width="50" height="50" alt="">

# IoBroker.coronavirus-statistics
![测试与发布](https://github.com/DrozmotiX/ioBroker.coronavirus-statistics/workflows/Test%20and%20Release/badge.svg) **此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

## IoBroker 的新冠病毒实时统计适配器
用于显示全球冠状病毒信息和最新报告的适配器

无需任何配置，安装后即可：

- 接收全球信息并将其写入“global_totals”
- 为每个国家创建一个文件夹，存放所有与新冠肺炎相关的信息。
- 每隔15分钟更新一次信息

以下信息可供查阅：

| 数据点 | 详情 |
|--|--|
| 活跃病例 | 当前感染人数 |
| 病例数 | 已知病例总数 |
| 百万人口病例数 | 每百万人口已知病例总数 |
| 危重 | 危重情况（住院）数量 |
| 死亡人数 | 当前已登记死亡人数 |
| 死亡人数（每百万人口）| 当前每百万公民的登记死亡人数 |
| 国旗 | 国旗，GitHub 仓库链接 |
| 已康复病例数 | 已知已康复病例总数 |
| 今日新增病例 | 今日新增病例 |
| 今日死亡人数 | 今日已知死亡总人数 |
| 检测 | 全球新冠病毒检测总数 |
| 每百万县的检测次数 | 全球每百万人进行的 COVID-19 检测总数 |

请注意，此适配器会尽可能使用最新信息，但根据各国报告情况，可能会有几个小时的延迟。

```German Federal States : https://npgeo-corona-npgeo-de.hub.arcgis.com/  s```

通用来源：https://coronavirus-19-api.herokuapp.com

＃＃ 高级设置
| 选项 | 描述 |
|--|--|
| 所有国家/地区 | 获取全球所有国家/地区的数据（默认值：false） |
| 按洲划分 | 将各洲的总金额分别列在不同的州/省份（默认值：false） |
| 删除未使用的州/省 | 取消选择国家/地区时删除数据（默认值：否） |

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (DutchmanNL) Maintenance: raise Node.js to 22, modernise CI and release tooling, update dependencies, resolve repository checker findings
* (DutchmanNL) Update axios to 1.x

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

[Older changelogs can be found there](CHANGELOG_OLD.md)

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