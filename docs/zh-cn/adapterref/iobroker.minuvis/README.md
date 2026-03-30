---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.minuvis/README.md
title: ioBroker.minuvis
hash: sjBsvncchkYo53C+9AmXwEPSY2IK3cgv7ZYsuNZJx1U=
---
![标识](../../../en/adapterref/iobroker.minuvis/admin/minuvis.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.minuvis.svg)
![下载](https://img.shields.io/npm/dm/iobroker.minuvis.svg)
![安装数量（最新）](http://iobroker.live/badges/minuvis-installed.svg)
![已知漏洞](https://snyk.io/test/github/minukodu/ioBroker.minuvis/badge.svg)
![构建状态](https://travis-ci.org/minukodu/ioBroker.minuvis.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.minuvis.png?downloads=true)

# IoBroker.minuvis
## IoBroker 的 minuvis 适配器
所有设备的可视化

＃＃ 指示
- 按常规方式安装适配器
- 创建 minuvis 实例（只能创建 1 个）
- 在 web 实例上启用 socket.io 实例

![socket.io@web](https://minukodu.de/githubimg/web_instance_socket_io.jpg)

- 打开 minuvis 实例

![最小实例](https://minukodu.de/githubimg/minuvis_instance.jpg)

- 连接到 Web 的 socket.io 端口或您自己的 socket.io 实例

![连接](https://minukodu.de/githubimg/minuvis_connect.jpg)

- 添加新页面

![添加页面](https://minukodu.de/githubimg/minuvis_addpage.jpg)

- 添加小部件

![添加小部件](https://minukodu.de/githubimg/minuvis_addwidget.jpg)

- 编辑状态

![选择州](https://minukodu.de/githubimg/minuvis_selectstate.jpg)

- 预览您的新应用

![预览](https://minukodu.de/githubimg/minuvis_preview.jpg)

更多信息请访问 https://minukodu.de/en 或在 YouTube 上观看 https://youtu.be/dtHUBOEc4js

＃ 重要的 ！！！！
如果您是从低于 1.3.0 的版本升级，请注意：

请先升级到 v1.4 版本，然后将配置文件重新保存到新位置。

########################################################################
* **版本 2 中的重大变更**，请参阅：https://minukodu.de/en/news/minuvis-20-iobroker-available
* 从 v1 更新到 v2 的说明请参见：https://minukodu.de/en/news/update-minuvis-v1-v2

* 如果您想保留版本 1，请使用此 Docker 镜像：https://hub.docker.com/r/sepp68/minuvis-image

########################################################################

## Changelog
### 2.7.1 (2026-02-22)
* updated README
* updated app and builder to V2.7.1

### 2.7.0 (2026-02-15)
* fixing issues detected by repository checker
* updated app and builder to V2.7.0

### 2.6.6 (2026-02-11)
* updated app and builder to V2.6.6

### 2.6.5 (2026-01-26)
* updated app and builder to V2.6.5

### 2.6.4 (2026-01-19)
* updated app and builder to V2.6.4

### 2.6.3 (2026-01-18)
* updated app and builder to V2.6.3

### 2.6.2 (2026-01-06)
* updated app and builder to V2.6.2

### 2.3.4 (2024-02-09)
* updated app and builder to V2.3.4

### 2.3.3 (2023-04-04)
* updated app and builder to V2.3.3

### 2.3.2 (2023-03-18)
* remove bug in io-package.json file

### 2.3.1 (2023-03-17)
* updated app to V2.3.1

### 2.3.0 (2022-01-30)
* updated app and builder to V2.3.0

### 2.2.1 (2021-11-03)
* updated app to V2.2.1

### 2.2.0 (2021-09-19)
* updated app and builder to V2.2.0

### 2.1.0 (2021-07-31)
* updated app and builder to V2.1.0

## License
MIT License

Copyright (c) 2026 svallant <svallant@gmx.eu>

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