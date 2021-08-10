---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.minuvis/README.md
title: ioBroker.minuvis
hash: 33enf9MUrEMU2aI4sKX5yIWdb+eiXfNlk3ys9TkkgCE=
---
![标识](../../../en/adapterref/iobroker.minuvis/admin/minuvis.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.minuvis.svg)
![下载](https://img.shields.io/npm/dm/iobroker.minuvis.svg)
![安装数量（最新）](http://iobroker.live/badges/minuvis-installed.svg)
![依赖状态](https://img.shields.io/david/minukodu/iobroker.minuvis.svg)
![已知漏洞](https://snyk.io/test/github/minukodu/ioBroker.minuvis/badge.svg)
![构建状态](https://travis-ci.org/minukodu/ioBroker.minuvis.svg?branch=master)
![新产品管理](https://nodei.co/npm/iobroker.minuvis.png?downloads=true)

# IoBroker.minuvis
## IoBroker 的 minuvis 适配器
所有设备的可视化

########################################################################
版本 2 现已推出

########################################################################
＃ 重要的 ！！！！
如果您从版本 < 1.3.0 升级，请注意：

* 首先升级到版本 v1.4 并在新位置重新保存配置文件

########################################################################
* **版本 2 中的重大变化**参见：https://minukodu.de/en/news/minuvis-20-iobroker-available
* 更新 v1 -> v2 的说明参见：https://minukodu.de/en/news/update-minuvis-v1-v2

* 如果您想保留版本 1，请使用此 Docker-Image：https://hub.docker.com/r/sepp68/minuvis-image

########################################################################
＃＃ 指示
- 像往常一样安装适配器
- 创建 minuvis 的实例（只有 1 个可能）
- 在 web-Instance 上启用 socket.io-Instance

![socket.io@web](https://minukodu.de/githubimg/web_instance_socket_io.jpg)

- 打开 miniuvis 实例

![小型可视化实例](https://minukodu.de/githubimg/minuvis_instance.jpg)

- 连接到 web 的 socket.io-Port 或您自己的 socket.io-instance

![连接](https://minukodu.de/githubimg/minuvis_connect.jpg)

- 添加新页面

![添加页面](https://minukodu.de/githubimg/minuvis_addpage.jpg)

- 添加小部件

![添加小工具](https://minukodu.de/githubimg/minuvis_addwidget.jpg)

- 编辑状态

![选择状态](https://minukodu.de/githubimg/minuvis_selectstate.jpg)

- 预览你的新应用

![预习](https://minukodu.de/githubimg/minuvis_preview.jpg)

有关更多信息，请访问 https://minukodu.de/en 或在 youtube 上观看 https://youtu.be/dtHUBOEc4js

## Changelog

### 2.1.0 (2021-07-31)
* updated app and builder to V2.1.0

### 2.0.0-rc.2 (2021-05-16)
* updated app and builder to V2.0.0-rc.2

### 2.0.0-rc.1 (2021-05-02)
* updated app and builder to V2.0.0-rc.1

### 2.0.0-beta.1 (2021-04-11)
* updated app and builder to V2.0.0-beta.1

### 2.0.0-alpha.2 (2021-04-05)
* updated app to V2.0.0-alpha.2

### 2.0.0-alpha (2021-03-08)
* updated app to V2.0.0-alpha

=======
### 1.4.0 (2021-03-07)
* updated app to V1.13.0
### 1.3.1 (2021-01-24)
* updated app to V1.12.1
### 1.3.0 (2021-01-24)
* updated builder and app to V1.12.0
* new meta-datapoint "0_userdata.0" for storing config-files
### 1.2.0 (2020-12-06)
* updated builder and app to V1.11.0
### 1.1.0 (2020-12-01)
* updated builder and app to V1.10.0
### 1.0.0 (2020-11-22)
* create version V1.0.0 
### 0.0.12 (2020-11-19)
* updated builder and app to V1.9.0
### 0.0.11 (2020-11-15)
* updated builder and app to V1.8.0
### 0.0.10 (2020-10-04)
* updated builder and app to V1.6.0
### 0.0.9 (2020-09-27)
* updated builder and app to V1.5.0
### 0.0.8 (2020-09-16)
* bugfix number of buttons for valueswitcher
### 0.0.7 (2020-09-14)
* updated builder and app to V1.4.0
### 0.0.6 (2020-09-14)
* updated builder and app to V1.3.0
### 0.0.6 (2020-06-23)
* updated builder and app to V1.2.1
### 0.0.5 (2020-05-14)
* adaptions for iobroker.repositories
### 0.0.4 (2020-05-13)
* updated README.md
### 0.0.3 (2020-05-11)
* updated builder and app to V1.0.4
### 0.0.2 (2020-05-10)
* updated builder and app to V1.0.2
### 0.0.1 (2020-05-02)
* (svallant) initial release

## License
MIT License

Copyright (c) 2021 svallant <svallant@gmx.eu>

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