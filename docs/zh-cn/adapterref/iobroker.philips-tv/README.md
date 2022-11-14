---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.philips-tv/README.md
title: ioBroker.philips-tv
hash: 67VlpDL7OnTXlujO0BCdJiqkmEua0uGVdLXQsckpYVo=
---
![标识](../../../en/adapterref/iobroker.philips-tv/admin/philips-tv.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.philips-tv.svg)
![下载](https://img.shields.io/npm/dm/iobroker.philips-tv.svg)
![安装数量](https://iobroker.live/badges/philips-tv-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/philips-tv-stable.svg)
![新PM](https://nodei.co/npm/iobroker.philips-tv.png?downloads=true)

# IoBroker.philips-tv
**测试：** ![测试和发布](https://github.com/AlCalzone/ioBroker.philips-tv/workflows/Test%20and%20Release/badge.svg)

## 用于 ioBroker 的飞利浦电视适配器
通过网络控制飞利浦电视的适配器

## 免责声明
此模块的开发人员绝不会得到 Koninklijke Philips N.V. 或任何相关子公司、徽标或商标的认可或附属。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.5.2 (2022-10-26)
* (foxriver76) we renamed `customAmbilightCommand` to `currentAmbilightConfiguration` and update the state on polling (closes #431)
Please delete `customAmbilightCommand` manually

### 0.5.1 (2022-10-17)
* (foxriver76) fix `ESOCKETTIMEDOUT` on post requests

### 0.5.0 (2022-10-17)
* (foxriver76) added new state `hdmiInput` without relying on Google Assistant

### 0.4.5 (2022-10-06)
* (foxriver76) fixed communication with API

### 0.4.4 (2022-10-06)
* (foxriver76) fix build

### 0.4.3 (2022-10-06)
* (foxriver76) try to fix `ESOCKETTIMEDOUT`

### 0.4.0 (2022-09-17)
* (foxriver76) marked state definitions of launch commands to be read-only
* (foxriver76) we now use the real device name for the device object
* (foxriver76) workaround to switch hdmi input via Google Assistant

### 0.3.2 (2022-09-17)
* (foxriver76) corrected button `PlayPause` to lowercase `playPause`

### 0.3.1 (2022-09-16)
* (foxriver76) added admin v5 dependency

### 0.3.0 (2022-09-12)
* (foxriver76) adapter rework to support Android and JointSpace V6 API
* __BREAKING__: Please use the adapter config to configure this instance properly

### 0.2.0
* (AlCalzone) Support sending key presses

### 0.1.0
* (AlCalzone) Initial release

## License
MIT License

Copyright (c) 2022 Moritz Heusinger <moritz.heusinger@gmail.com>

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