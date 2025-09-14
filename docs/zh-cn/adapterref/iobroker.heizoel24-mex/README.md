---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.heizoel24-mex/README.md
title: ioBroker.heizoel24-mex
hash: eiLDLxzEp5ZZdD+z7glNxntKsqg5jT+R/FB9/3wobx0=
---
![标识](../../../en/adapterref/iobroker.heizoel24-mex/admin/heizoel24-mex.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.heizoel24-mex.svg)
![下载](https://img.shields.io/npm/dm/iobroker.heizoel24-mex.svg)
![安装数量](https://iobroker.live/badges/heizoel24-mex-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/heizoel24-mex-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.heizoel24-mex.png?downloads=true)

# IoBroker.heizoel24-mex
**测试：**![测试和发布](https://github.com/ltspicer/ioBroker.heizoel24-mex/workflows/Test%20and%20Release/badge.svg)

## Heizoel24-mex ioBroker 适配器
MEX 是一款加热油位测量装置。此适配器从 Heizoel24 服务器读取 MEX 数据。

详情请见：https://www.heizoel24.de/mex

＃＃ 使用：
只需输入您的 Heizoel24 账户登录数据（邮箱和密码）。
MEX 数据存储在数据点 heizoel24-mex 中。
适配器默认每 3 小时启动一次。这完全足够，因为 MEX 每天只发送一次数据。
数据点 CalculatedRemaining/JsonForEcharts（计算剩余量）和 OilUsage/JsonForEcharts 可以直接与 eCharts 一起使用。

## Changelog
### 1.4.5 (2025-08-29)

- Depends updated

### 1.4.4 (2025-06-21)

- README.md & README-de.md corrected

### 1.4.3 (2025-06-21)

- io-package.json > admin set to >=7.4.10

### 1.4.2 (2025-06-17)

- Bug fix jsonConfig.json : xs,sm, md, ...

### 1.4.1 (2025-06-17)

- Bug fix jsonConfig.json : size removed

### 1.4.0 (2025-06-17)

- OilUsage (Oil consumption per month) added

### 1.3.5 (2024-08-08)

js-controller dependency updated

### 1.3.3 (2024-06-04)

Fix: no error if CalculatedRemaining is empty and mqtt is active

### 1.3.2 (2024-06-04)

Error intercepted for:
- RemainsUntilCombined no data found
- CalculatedRemaining is empty

### 1.3.1 (2024-03-24)

- CalculatedRemaining json data point for eCharts added

### 1.3.0 (2024-03-24)

- New README.md
- CalculatedRemaining data points removed

### 1.2.0 (2024-03-16)

- CalculatedRemaining data points renamed to "Today+XXXX Days"
- Limited to 52 data points
- Option for save CalculatedRemaining json

### 1.1.0 (2024-03-09)

- Superfluous logging function removed

### 1.0.1-alpha.0 (2024-03-08)

- Repo new triggering

### 1.0.0 (2024-03-08)

- Initial release for tests

## License
MIT License

Copyright (c) 2025 Daniel Luginbühl <webmaster@ltspiceusers.ch>

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