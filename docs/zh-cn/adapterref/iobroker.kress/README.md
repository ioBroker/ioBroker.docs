---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.kress/README.md
title: ioBroker.kress
hash: 5xYDrlXWt4DNMGHF7cB0Qb5R6BLJ+kr8LT0KCAfbZwc=
---
![克雷斯 - 机器人](../../../en/adapterref/iobroker.kress/admin/kress-2.png)

![安装数量](http://iobroker.live/badges/kress-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.kress.svg)
![NPM](https://nodei.co/npm/iobroker.kress.png?downloads=true)
![特拉维斯-CI](https://api.travis-ci.org/MeisterTR/ioBroker.kress.svg?branch=master)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/MeisterTR/ioBroker.kress?branch=master&svg=true)
![下载](https://img.shields.io/npm/dm/iobroker.kress.svg)

＃ioBroker.kress
[Deutsche Beschreibung hier](README_de.md)

此适配器连接IoBroker与您的Kress云支持温度，割草时间，电池电量和从割草机读取的各种其他数据适配器可以控制割草机，您可以像mowtimes一样更改配置参数。

##安装
至少必须安装Node 4.X.X，此适配器不再支持Node 0.10和0.12。

##设置
 - 从Config中的worx帐户连接到割草机类型的电子邮件和密码。

##第二割草机
 - 如果要集成两台割草机，则必须安装第二个实例，在Config割草机0和第二个割草机1中选择一个，依此类推。

＃＃ 注意
Bild-Quelle：https：//www.kress-robotik.com/de/

## Changelog
### 2.5.5 (17.07.2018)
* (MeisterTR) initinal relase

## License
The MIT License (MIT)

Copyright (c) 2017 MeisterTR <meistertr.smarthome@gmail.com>

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