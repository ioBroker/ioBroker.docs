---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.luftdaten/README.md
title: ioBroker.luftdaten
hash: Two5lRgxKC4WrA6dvGFNUHKtX0Yu2TKtLC7cAErlsrE=
---
![标识](../../../en/adapterref/iobroker.luftdaten/admin/luftdaten.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.luftdaten.svg)
![下载](https://img.shields.io/npm/dm/iobroker.luftdaten.svg)
![稳定的](http://iobroker.live/badges/luftdaten-stable.svg)
![已安装](http://iobroker.live/badges/luftdaten-installed.svg)
![依赖状态](https://img.shields.io/david/klein0r/iobroker.luftdaten.svg)
![已知漏洞](https://snyk.io/test/github/klein0r/ioBroker.luftdaten/badge.svg)
![构建状态](http://img.shields.io/travis/klein0r/ioBroker.luftdaten.svg)
![新产品管理](https://nodei.co/npm/iobroker.luftdaten.png?downloads=true)

# IoBroker.luftdaten
此适配器将“luftdaten.info”传感器数据添加到您的 ioBroker 安装中。
您可以决定是要通过ip添加本地传感器还是只想使用lufdaten.info的API来获取另一个传感器的数据。

＃＃ 安装
请使用 ioBroker 中的“适配器列表”来安装此适配器的稳定版本。您还可以使用 CLI 安装此适配器：

```
iobroker add luftdaten
```

＃＃ 配置
＃＃＃ 当地的
1. 构建您自己的适配器并将其添加到您的本地 wifi 网络
2. 创建一个新的适配器实例
3. 选择“本地”作为类型
4.在第二个输入中填写传感器的IP或主机名
5. 选择一个名称并保存设置

等待几分钟，直到 cronjob 首次收集数据。

*随意更改实例选项卡中的计划设置（默认为每 15 分钟一次）。*

＃＃＃ 偏僻的
1. 选择在线地图上的传感器之一：[deutschland.maps.luftdaten.info](https://deutschland.maps.luftdaten.info/)
2.点击传感器并复制ID（#XXXXX）
3. 创建一个新的适配器实例
4. 选择“远程”作为类型
5.在第二个输入中填写传感器的ID（不带#）
6. 选择一个名称并保存设置

等待几分钟，直到 cronjob 首次收集数据。

*随意更改实例选项卡中的计划设置（默认为每 15 分钟一次）。*

## 贡献者
- 克莱因0r
- 像素
- 德国蓝狐
- 阿波罗77
- 多米尼克-列内曼

## Changelog

### 2.0.3

* (klein0r) Fixed error logging

### 2.0.2

* (klein0r) Added timeout option

### 2.0.1

* (klein0r) Minor bug fixes

### 2.0.0

* (klein0r) Updated admin interface to maintain multiple sensors in one instance (BREAKING CHANGE - RE-CONFIGURE YOUR SENSORS)

### 1.0.3

* (klein0r) Remove non-numeric characters from sensor id

### 1.0.2

* (klein0r) Fixed async object creation

### 1.0.1

* (klein0r) Added iobroker sentry

### 1.0.0

* (klein0r) First stable release

### 0.0.18

* (klein0r) Added units for pressure and noise

### 0.0.17

* (klein0r) Added link to sensor map

### 0.0.16

* (klein0r) Minor bugfixes

### 0.0.15

* (klein0r) setTimeout found in main.js, but no clearTimeout detected

### 0.0.14

* (klein0r) Fixed sensor data check issue

### 0.0.13

* (klein0r) Added missing translations

### 0.0.12

* (klein0r) Minor bugfixes
* (dominik-lienemann) Added timestamp of last sensor update

### 0.0.11

* (klein0r) fixed units of states

### 0.0.10

* (klein0r) changed API url

### 0.0.9

* (klein0r) minor bugfixes

### 0.0.9

* (klein0r) improved logging

### 0.0.8

* (klein0r) added response time and units

### 0.0.7

* (klein0r) merged pull requests - thanks a lot for contribution

### 0.0.6

* (klein0r) changed type to weather

### 0.0.5

* (klein0r) fixed issues when sensor is not available
* (klein0r) added location information for remote sensors

### 0.0.4

* (pix) path is IP if sensor is local

### 0.0.3

* (pix) path and sensor name added

### 0.0.1

* (klein0r) initial release

## License

The MIT License (MIT)

Copyright (c) 2021 Matthias Kleine <info@haus-automatisierung.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.