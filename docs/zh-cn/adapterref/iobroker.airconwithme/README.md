---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.airconwithme/README.md
title: ioBroker.airconwithme
hash: pGmr6pF126CYBfu02lFkOyZ8d7CgjA2FadJvlyIb1k4=
---
![标识](../../../en/adapterref/iobroker.airconwithme/admin/airconwithme.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.airconwithme.svg)
![下载](https://img.shields.io/npm/dm/iobroker.airconwithme.svg)
![安装数量（最新）](http://iobroker.live/badges/airconwithme-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/airconwithme-stable.svg)
![依赖状态](https://img.shields.io/david/weggetor/iobroker.airconwithme.svg)
![已知漏洞](https://snyk.io/test/github/weggetor/ioBroker.airconwithme/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.airconwithme.png?downloads=true)

# IoBroker.airconwithme
**测试：** ![测试和发布](https://github.com/weggetor/ioBroker.airconwithme/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 airconwithme 适配器
带有 airconwithme wlan 适配器的三菱空调适配器

＃＃ 信息
安装是使用 Github Cat Symbol / custom 完成的。输入此页面的 url（不带 README.md）并选择“安装”。

在适配器设置中，应输入空调 WLAN 适配器的 IP。 Intesis 适配器的用户名 + 密码默认为“admin”+“admin”。

大多数数据点是只读的，您可以设置以下内容：

|数据点 |价值观 |
|----------|----------|
|上 | 0：关闭； 1：开 |
|用户模式 | 0：自动； 1：热量； 2：干燥； 3：风扇； 4：酷 |
|风扇速度 | 1：速度1； 2：速度2； 3：速度3； 4：速度4 |
|位置 | 1：位置1； 2：位置2； 3：位置 3； 4：位置 4； 10：摇摆 |
|用户设置点 |温度 (°C) |
|远程禁用 | 0：使能； 1：禁用 |

## Changelog
### 0.0.3
* (weggetor) Renamed some variables to avoid possible interference with other adapters, removed not used adminTab

### 0.0.2
* (weggetor) Modifications to automatic build incl. upload to npm

### 0.0.1
* (weggetor) initial release

## License
MIT License

Copyright (c) 2021 weggetor <info@bitboxx.net>

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