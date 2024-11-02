---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wireless-settings/README.md
title: ioBroker.无线设置
hash: euDLn4ru6fnpTRHbcoQY/Rf6AFzU4lqb6Kjx03Q3iG0=
---
![标识](../../../en/adapterref/iobroker.wireless-settings/admin/wireless-settings.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.telemetry.svg)
![下载](https://img.shields.io/npm/dm/iobroker.telemetry.svg)
![安装数量（最新）](http://iobroker.live/badges/wireless-settings-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/wireless-settings-stable.svg)
![依赖状态](https://img.shields.io/david/ioBroker/iobroker.wireless-settings.svg)
![已知漏洞](https://snyk.io/test/github/ioBroker/ioBroker.wireless-settings/badge.svg)
![新平台](https://nodei.co/npm/iobroker.telemetry.png?downloads=true)

# IoBroker.无线设置
## Raspberry Pi 上的 Wi-Fi 适配器和无线设置
该适配器可以设置Raspberry Pi上的无线。它可用于连接或断开无线网络。

**仅在 Raspberry Pi 5 上测试**

## 所需权限
此适配器假定`iobroker`用户可以执行以下命令：

-`/usr/bin/nmcli`

您可以通过调用以下命令添加权限：

```shell
sudo chmod +x /opt/iobroker/node_modules/iobroker.wireless-settings/wlan_rights.sh
sudo /opt/iobroker/node_modules/iobroker.wireless-settings/wlan_rights.sh
```

<!-- 下一版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### **WORK IN PROGRESS**

-   (@GermanBluefox) Small layout changes

### 1.0.2 (2024-10-04)

-   (@GermanBluefox) Updated for raspberry 5
-   (@GermanBluefox) Change name to "wireless-settings"

### 0.4.0 (2024-10-03)

-   (@GermanBluefox) Change name to "network-settings"

### 0.3.0 (2023-06-27)

-   (@GermanBluefox) Change name to "network-settings"

### 0.2.2 (2023-06-27)

-   (@GermanBluefox) Updated the GUI to the latest version

### 0.1.0 (2021-01-18)

-   (ioBroker) fixed build scripts

### 0.0.1 (2021-01-18)

-   (ioBroker) initial release

## License

MIT License

Copyright (c) 2021-2024 @GermanBluefox <dogafox@gmail.com>

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