---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.panasonic-comfort-cloud/README.md
title: ioBroker.panasonic-comfort-cloud
hash: YSD9gQMLaMSiZsj070atapa6ZZi+VqTSk9zSREedzRc=
---
![NPM 版本](http://img.shields.io/npm/v/iobroker.panasonic-comfort-cloud.svg)
![下载](https://img.shields.io/npm/dm/iobroker.panasonic-comfort-cloud.svg)
![依赖状态](https://img.shields.io/david/marc2016/iobroker.panasonic-comfort-cloud.svg)
![已知漏洞](https://snyk.io/test/github/marc2016/ioBroker.panasonic-comfort-cloud/badge.svg)
![NPM](https://nodei.co/npm/iobroker.panasonic-comfort-cloud.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/marc2016/ioBroker.panasonic-comfort-cloud/master.svg)

| ：警告：警告|
|:---------------------------|
|适配器设置中的新应用程序版本为 1.18.0 |

![标识](../../../en/adapterref/iobroker.panasonic-comfort-cloud/admin/panasonic-comfort-cloud.png)

# IoBroker.panasonic-comfort-cloud
## IoBroker 的 panasonic-comfort-cloud 适配器
用于控制 Panasonic Comfort Cloud 中的设备的适配器。它使用从官方 Comfort Cloud 应用程序中提取的 REST 调用。
要使用适配器，您需要在配置中输入您的用户名和密码。它们用于验证对 Comfort Cloud 的访问。所有设备的信息被自动检索并作为对象插入。适配器周期性地轮询设备信息（请参阅设置中的间隔）并将命令直接发送到云端。

使用该方法，一次只能有一个客户端使用该帐户登录。
建议使用已共享设备的第二个帐户。

## Changelog

### 2.1.0
* Added app version to settings.

### 2.0.6
* panasonic-comfort-cloud-client updated to new version. (appVersion changed again)

### 2.0.5
* Translation for news added.

### 2.0.4
* New version of dependencies installed.

### 2.0.3
* panasonic-comfort-cloud-client updated to new version. (appVersion changed again)

### 2.0.2
* panasonic-comfort-cloud-client updated to new version.

### 2.0.1
* Changed the type of some states from string to number.

### 2.0.0
* Added js-controller 3 dependency.
* Added username and password to protectedNative and password to encryptedNative.
* Added connection info.
* Changed schdule to timeout for refresh.
* Fixes for async await pattern.

### 1.2.9
* Error handling for get device added.

### 1.2.8
* Fixed bug in Comfort Cloud client.

### 1.2.7
* Comfort Cloud client updated.

### 1.2.6
* Fixed bug that guid is null in device creation.

### 1.2.5
* *Comfort Cloud client updated.

### 1.2.4
* Fixed bug with undefined guid. Log messages added.

### 1.2.3
* Set parameters only for writable states.

### 1.2.2
* *Fixed error handling and added stack info.

### 1.2.1
* Fixed bug in refesh device method.

### 1.2.0
* States insideTemperature, outTemperature and Nanoe added.

## License
MIT License

Copyright (c) 2022 marc <marc@lammers.dev>

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