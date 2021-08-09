---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.pixelit/README.md
title: ioBroker.pixelit
hash: m0sZpNPFijRIUS62MPeOk2ykpvSm5/5WphPyFWR41Nk=
---
![标识](../../../en/adapterref/iobroker.pixelit/admin/pixelit.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.pixelit.svg)
![下载](https://img.shields.io/npm/dm/iobroker.pixelit.svg)
![安装数量（最新）](http://iobroker.live/badges/pixelit-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/pixelit-stable.svg)
![依赖状态](https://img.shields.io/david/o0shojo0o/iobroker.pixelit.svg)
![新产品管理](https://nodei.co/npm/iobroker.pixelit.png?downloads=true)

# IoBroker.pixelit
## IoBroker 的 PixelIt 适配器
此适配器允许您从 ioBroker Screen 发送到 [像素它](https://www.bastelbunker.de/pixel-it/)。
在适配器中还实现了 [PixelIt](https://www.bastelbunker.de/pixel-it/)，以及 [Pixel Gallery 的 API](https://pixelit.bastelbunker.de/PixelGallery) 的可选传感器的数据点。
有关数据点的更多信息可以在此 [文件](https://docs.bastelbunker.de/ioBroker_pixelit/options.html) 中找到。

＃＃ 配置
创建一个新的适配器实例 填写 IP 并玩得开心 :)

## Changelog

<!--
 https://github.com/AlCalzone/release-script#usage
    npm run release minor -- --all 0.9.8 -> 0.10.0
    npm run release patch -- --all 0.9.8 -> 0.9.9
    npm run release prerelease beta -- --all v0.2.1 -> v0.2.2-beta.0
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### **WORK IN PROGRESS**

-   (o0shojo0o) added datapoints info.hostname, info.note, sensor.pressure
-   (o0shojo0o) adjustments based on the adapter review

### 0.0.6 (2021-05-01)

-   (o0shojo0o) bugfix wrong value type

### 0.0.5 (2021-04-25)

-   (o0shojo0o) fix datapoints roles

### 0.0.4 (2021-04-25)

-   (o0shojo0o) code refactoring
-   (o0shojo0o) luminance remove decimals
-   (o0shojo0o) add 'Show Clock' button

### 0.0.3 (2021-02-11)

-   (o0shojo0o) add brightness and code refactoring

### 0.0.2 (2021-02-01)

-   (o0shojo0o) code refactoring and bugfixes

### 0.0.2-alpha.0 (2020-09-16)

-   (o0shojo0o) initial release

### 0.0.1

-   (o0shojo0o) initial push

## License

MIT License

Copyright (c) 2021 Dennis Rathjen <info@bastelbunker.de>

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