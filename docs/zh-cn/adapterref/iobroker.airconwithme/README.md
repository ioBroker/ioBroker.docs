---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.airconwithme/README.md
title: ioBroker.airconwithme
hash: 8At/uj5Yzl9hmpuibkprJWHGXlAOxZ39o+m/yrb3x+M=
---
![标识](../../../en/adapterref/iobroker.airconwithme/admin/airconwithme.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.airconwithme.svg)
![下载](https://img.shields.io/npm/dm/iobroker.airconwithme.svg)
![安装数量（最新）](http://iobroker.live/badges/airconwithme-installed.svg)
![安装数量（稳定版）](http://iobroker.live/badges/airconwithme-stable.svg)
![依赖状态](https://img.shields.io/david/weggetor/iobroker.airconwithme.svg)
![已知漏洞](https://snyk.io/test/github/weggetor/ioBroker.airconwithme/badge.svg)
![NPM](https://nodei.co/npm/iobroker.airconwithme.png?downloads=true)

# IoBroker.airconwithme
**测试：** ![测试与发布](https://github.com/weggetor/ioBroker.airconwithme/workflows/Test%20and%20Release/badge.svg)

## Airconwithme ioBroker 适配器
适用于三菱空调的适配器，带 airconwithme 无线网卡

＃＃ 信息
在适配器设置中，应输入空调无线网卡的 IP 地址。Intesis 适配器的用户名和密码默认为“admin”+“admin”。

大多数数据点都是只读的，您可以进行以下设置：

| 数据点 | 值 |
|----------|----------|
| 开 | 0：关；1：开 |
| 用户模式 | 0：自动；1：制热；2：除湿；3：送风；4：制冷 |
| 风扇速度 | 1：速度 1；2：速度 2；3：速度 3；4：速度 4 |
| 位置 | 1：位置 1；2：位置 2；3：位置 3；4：位置 4；10：挥杆 |
| 用户设定温度 | 温度（摄氏度） |
| remoteDisable | 0：启用；1：禁用 |

## Changelog
### 1.0.0 (2025-11-15)
* (weggetor) **MAJOR RELEASE**: Complete adapter modernization
* (weggetor) **BREAKING**: Migrated to TypeScript with modern ES2020+ features
* (weggetor) **SECURITY**: Updated all dependencies, eliminated vulnerabilities (0 vulnerabilities!)
* (weggetor) **ENHANCEMENT**: Complete code refactoring with proper error handling and logging
* (weggetor) **ENHANCEMENT**: Improved session management with smart caching and reconnection logic
* (weggetor) **ENHANCEMENT**: Modern GitHub Actions CI/CD pipeline with automated testing
* (weggetor) **ENHANCEMENT**: Enhanced type safety with comprehensive TypeScript interfaces
* (weggetor) **ENHANCEMENT**: Modular code structure for better maintainability

### 0.0.4
* (weggetor) Bugfix sending username + password to Intesis API (formerly send admin/admin hardcoded)

### 0.0.3
* (weggetor) Renamed some variables to avoid possible interference with other adapters, removed not used adminTab

### 0.0.2
* (weggetor) Modifications to automatic build incl. upload to npm

### 0.0.1
* (weggetor) initial release

## License
MIT License

Copyright (c) 2025 Torsten Weggen <info@bitboxx.net>

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