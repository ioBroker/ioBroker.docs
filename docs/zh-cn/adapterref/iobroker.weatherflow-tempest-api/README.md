---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.weatherflow-tempest-api/README.md
title: ioBroker.weatherflow-tempest-api
hash: zAqJa262snmHOZLt4n2w5JdQ1BklYcfEmWm3kETfRvM=
---
![标识](../../../en/adapterref/iobroker.weatherflow-tempest-api/admin/weatherflow-tempest-api.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.weatherflow-tempest-api.svg)
![下载](https://img.shields.io/npm/dm/iobroker.weatherflow-tempest-api.svg)
![安装数量](https://iobroker.live/badges/weatherflow-tempest-api-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/weatherflow-tempest-api-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.weatherflow-tempest-api.png?downloads=true)

# IoBroker.weatherflow-tempest-api
**测试：**![测试和发布](https://github.com/Scrounger/ioBroker.weatherflow-tempest-api/workflows/Test%20and%20Release/badge.svg)

## Weatherflow-tempest-api ioBroker 适配器
获取您的[Tempest 气象站](https://tempest.earth/tempest-home-weather-system/) 来自 [WeatherFlow Tempest API](https://weatherflow.github.io/Tempest/api/)数据

### 集成端点
| 端点 | 类型 | 成功 |
| ------------ | :--: | :-----: |
| 观察 | 休息 | 待定 |
| 车站 | 休息 | 待定 |
| 预报 | 休息 | ✔ |

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.1.3 (2025-10-19)

- (Scrounger) dependencies updated

### 1.1.2 (2025-10-08)

- (Scrounger) weather specific roles added #21
- (Scrounger) auto translation bug fix
- (Scrounger) dependencies updated

### 1.1.1 (2025-09-30)

- (Scrounger) bug fixes

### 1.1.0 (2025-09-29)

- (Scrounger) code optimized
- (Scrounger) roles added
- (Scrounger) dependencies updated
- (Scrounger) node minimum set to 20
- (Scrounger) converted to esm
- (Scrounger) eslint 9 added

### 1.0.3 (2024-10-18)

- (Scrounger) bug fixes

### 1.0.2 (2024-09-17)

- (Scrounger) bug fixes
- (Scrounger) using cron for update interval

### 1.0.1 (2024-09-15)

- (Scrounger) bug fixes
- (Scrounger) dependencies updated

### 1.0.0 (2024-09-15)

- (Scrounger) forecast api integrated
- (Scrounger) initial release

## License

MIT License

Copyright (c) 2025 Scrounger <scrounger@gmx.net>

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